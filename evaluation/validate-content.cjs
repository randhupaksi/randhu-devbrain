// Maintenance checks only; does not execute an agent or mutate files.
const fs=require('fs'),path=require('path'),cp=require('child_process'),root=path.resolve(__dirname,'..');
let yaml;
try{yaml=require(path.resolve(process.argv[2]||path.join(root,'local/validation/node_modules/js-yaml')))}
catch{console.error('YAML parser missing; see evaluation/README.md');process.exit(2)}
const errors=[];let checks=0;
function check(ok,msg){checks++;if(!ok)errors.push(msg)}
const git=args=>cp.execFileSync('git',['-C',root,...args],{encoding:'utf8',maxBuffer:16*1024*1024});
const files=[...new Set(git(['ls-files','--cached','--others','--exclude-standard','-z']).split('\0').filter(Boolean))].filter(f=>fs.existsSync(path.join(root,f)));
const docs=new Map(),parsed=new Map();
const machineUser=(root.match(/[\\/]Users[\\/]([^\\/]+)/i)||[])[1];
for(const f of files)if(/\.(md|yaml|yml|ps1|cjs)$/.test(f)||f==='.gitignore')docs.set(f,fs.readFileSync(path.join(root,f),'utf8').replace(/^\uFEFF/,''));
for(const[f,t]of docs){
 if(/\.ya?ml$/.test(f)){try{parsed.set(f,yaml.load(t));checks++}catch(e){errors.push('Invalid YAML '+f+': '+e.reason+' line '+(e.mark?.line+1))}}
 if(f.endsWith('/SKILL.md')){
  const m=t.match(/^---\r?\n([\s\S]*?)\r?\n---/);check(!!m,'Missing frontmatter '+f);
  if(m)try{
   const v=yaml.load(m[1]);check(v.name===path.basename(path.dirname(f))&&/^[a-z0-9-]{1,64}$/.test(v.name),'Skill name '+f);
   check(typeof v.description==='string'&&v.description.length>40&&v.description.length<1024,'Skill description '+f);
   check(!/\b(TODO|TBD|FIXME)\b|<DEVBRAIN_ROOT>|<USER_HOME>/.test(t),'Skill scaffold '+f);
  }catch(e){errors.push('Invalid frontmatter '+f+': '+e.reason)}
 }
 check(!/(?<![A-Za-z0-9])[A-Za-z]:[\\/]|(?:\/Users\/|\/home\/)[A-Za-z0-9_-]+/.test(t),'Machine-specific path '+f);
 if(machineUser)check(!t.includes(machineUser),'Current machine username '+f);
 if(f.endsWith('.md'))for(const m of t.matchAll(/\[[^\]\n]+\]\(([^)\n]+)\)/g)){
  const ref=m[1].replace(/^<|>$/g,'').split('#')[0];if(!ref||/^(https?:|mailto:)/.test(ref))continue;
  check(fs.existsSync(path.resolve(root,path.dirname(f),ref)),'Broken link '+f+' -> '+ref);
 }
 check(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|sk-[A-Za-z0-9]{24,}|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[A-Z0-9]{16}/.test(t),'Secret-like content '+f);
}
for(const f of files)check(!/(^|\/)(?:\.env(?:\..+)?|credentials\.json|id_rsa|[^/]+\.(?:pem|pfx|p12|key|dump|sql))$/i.test(f)||f.endsWith('.env.example'),'Secret/data-like file '+f);
const manifest=parsed.get('devbrain.yaml');
check(docs.get('runtime/session-baseline.md')?.includes('An explicitly requested handoff or DevBrain workflow command still selects its task-map module, even for a small task.'),'Explicit workflow routing survives small-task shortcut');
check(docs.get('workflows/ui-task.md')?.includes('do not move them to external TEMP directories'),'Denied UI cleanup preserves workspace boundary');
if(manifest){
 check(manifest.version==='2.7.0-rc.1'&&manifest.status==='native_validation_pending','Manifest version/status');
 check(JSON.stringify(manifest.always_load)==='["runtime/session-baseline.md"]','Canonical always_load');
 check(JSON.stringify(manifest.bootstrap.supported_interfaces)==='["codex_cli","claude_code_cli"]','CLI host interface coverage');
 check(manifest.evaluation.cli_host_matrix==='evaluation/cli-host-matrix.yaml','CLI host matrix manifest reference');
 for(const ref of [manifest.task_router,...manifest.always_load,...Object.values(manifest.evaluation),manifest.bootstrap.installer,manifest.bootstrap.updater,manifest.bootstrap.codex_template,manifest.bootstrap.claude_template,manifest.source_specification.file])check(fs.existsSync(path.join(root,ref)),'Missing manifest ref '+ref);
 for(const n of manifest.skills){
  const m=parsed.get('skills/'+n+'/agents/openai.yaml');check(!!m?.interface?.display_name,'Display metadata '+n);
  check(typeof m?.interface?.short_description==='string'&&m.interface.short_description.length<=64,'Short metadata '+n);
  check(m?.interface?.default_prompt?.includes('$'+n),'Default prompt '+n);
  check(m?.policy?.allow_implicit_invocation===true,'Invocation policy '+n);
 }
}
for(const[n,c]of Object.entries(parsed.get('prompts/commands.yaml')?.commands||{})){
 check(typeof c.intent==='string'&&typeof c.mode==='string','Command '+n);
 for(const ref of c.modules||[])check(fs.existsSync(path.join(root,ref)),'Command module '+ref);
}
const contextWorkflow=docs.get('workflows/context-reconciliation.md')||'';
const commands=parsed.get('prompts/commands.yaml')?.commands||{};
check(!!docs.get('workflows/session-continuity.md'),'Session continuity workflow exists');
check((docs.get('runtime/task-map.md')||'').includes('workflows/session-continuity.md'),'Session continuity task route');
check(commands.handoff?.mode==='read_only'&&commands.handoff?.approval==='none'&&JSON.stringify(commands.handoff?.modules)==='["workflows/session-continuity.md"]','Handoff remains read-only and selective');
check(commands['resume-task']?.mode==='reconcile_then_continue_authorized_task'&&commands['resume-task']?.approval==='high_risk_boundary_only'&&JSON.stringify(commands['resume-task']?.modules)==='["workflows/session-continuity.md"]','Resume preserves task authorization and selective routing');
check(contextWorkflow.length>0,'Context reconciliation workflow exists');
check((docs.get('runtime/task-map.md')||'').includes('workflows/context-reconciliation.md'),'Context reconciliation task route');
const contextCommand=parsed.get('prompts/commands.yaml')?.commands?.['context-check'];
check(contextCommand?.mode==='read_only'&&contextCommand?.approval==='none'&&JSON.stringify(contextCommand?.modules)==='["workflows/context-reconciliation.md"]','Context reconciliation command');
for(const m of(docs.get('runtime/task-map.md')||'').matchAll(/\x60((?:core|workflows|safety|prompts)\/[^\x60]+)\x60/g))check(fs.existsSync(path.join(root,m[1])),'Route '+m[1]);
check(docs.get('adapters/codex/AGENTS.global.template.md')===docs.get('adapters/claude-code/CLAUDE.global.template.md'),'Bootstrap parity');
const suite=parsed.get('evaluation/scenarios.yaml');
if(suite){
 check(suite.scenarios.length>=54,'Minimum v2.4 scenarios');const ids=new Set();
 for(const s of suite.scenarios){
  for(const f of ['id','prompt','context_to_read','skills_active','skills_unnecessary','expected_autonomy','expected_approval','expected_files_touched','expected_validation','forbidden_behavior'])check(s[f]!==undefined&&(Array.isArray(s[f])||String(s[f]).length>0),'Scenario field '+s.id+': '+f);
  check(!ids.has(s.id),'Duplicate ID '+s.id);ids.add(s.id);
  check(!s.skills_active.some(n=>s.skills_unnecessary.includes(n)),'Conflicting routing '+s.id);
  for(const n of [...s.skills_active,...s.skills_unnecessary])check(manifest.skills.includes(n),'Unknown skill '+s.id);
  for(const ref of s.context_to_read.filter(x=>/^(runtime|core|safety|workflows)\//.test(x)))check(fs.existsSync(path.join(root,ref)),'Scenario context '+ref);
 }
 for(const id of ['39-context-command-conflict','40-context-ui-source-conflict','42-context-api-contract-conflict','43-context-high-risk-ambiguity','44-context-equal-scope-conflict','45-context-authorized-repair','46-context-untrusted-evidence']){
  const scenario=suite.scenarios.find(s=>s.id===id);
  check(scenario?.context_to_read?.includes('workflows/context-reconciliation.md'),'Context reconciliation scenario routing '+id);
 }
 const resolvedChoice=suite.scenarios.find(s=>s.id==='41-context-latest-user-decision');
 check(!!resolvedChoice&&!resolvedChoice.context_to_read.includes('workflows/context-reconciliation.md'),'Resolved user choice uses baseline precedence directly');
 for(const id of ['47-handoff-read-only','48-resume-authorized-task','49-resume-stale-state','50-resume-latest-intent','51-resume-unsupported-approval','52-handoff-validation-honesty','54-resume-missing-goal']){
  check(suite.scenarios.find(s=>s.id===id)?.context_to_read?.includes('workflows/session-continuity.md'),'Session continuity scenario routing '+id);
 }
 const smallTask=suite.scenarios.find(s=>s.id==='53-model-switch-small-task');
 check(!!smallTask&&!smallTask.context_to_read.includes('workflows/session-continuity.md'),'Model switch with sufficient context stays minimal');
}
const cliMatrix=parsed.get('evaluation/cli-host-matrix.yaml');
check(cliMatrix?.schema==='devbrain-cli-host-compatibility'&&cliMatrix?.version===1&&cliMatrix?.release===manifest?.version,'CLI host matrix schema/release');
check(JSON.stringify(cliMatrix?.hosts?.map(h=>h.id))==='["codex_cli","claude_code_cli"]','CLI host matrix coverage');
if(Array.isArray(cliMatrix?.hosts))for(const host of cliMatrix.hosts){
 check(Array.isArray(host.session_modes)&&host.session_modes.length>=2,'CLI session modes '+host.id);
 check(typeof host.instruction_entry==='string'&&typeof host.user_skill_location==='string','CLI host paths '+host.id);
 check(['available','unavailable','not_resolved','unknown'].includes(host.availability_observed),'CLI host availability '+host.id);
 check(['not_run','blocked','partial','complete'].includes(host.native_status),'CLI native status '+host.id);
}
if(Array.isArray(cliMatrix?.cases)){
 const cliIds=new Set();
 for(const c of cliMatrix.cases){
  check(typeof c.id==='string'&&/^[a-z0-9-]+$/.test(c.id),'CLI case ID');
  check(!cliIds.has(c.id),'Duplicate CLI case '+c.id);cliIds.add(c.id);
  check(['codex_cli','claude_code_cli','both'].includes(c.host),'CLI case host '+c.id);
  check(typeof c.mode==='string'&&typeof c.expected==='string','CLI case contract '+c.id);
  check(Array.isArray(c.required_evidence)&&c.required_evidence.length>0,'CLI case evidence '+c.id);
  check(Array.isArray(c.forbidden)&&c.forbidden.length>0,'CLI case forbidden behavior '+c.id);
 }
 for(const id of ['codex-fresh-bootstrap','codex-one-shot-bootstrap','claude-fresh-bootstrap','claude-one-shot-and-resume','claude-instruction-family','cross-host-skill-disclosure','claude-memory-precedence','cross-host-permission-boundary'])check(cliIds.has(id),'Required CLI case '+id);
}
const paras=new Map();
const smoke=parsed.get('evaluation/smoke-suite.yaml'),resultContract=parsed.get('evaluation/scorecard-contract.yaml');
check(smoke?.schema==='devbrain-smoke-suite'&&smoke?.version===1&&smoke?.release===manifest?.version,'Smoke suite schema/release');
check(JSON.stringify(smoke?.hosts)==='["codex","claude"]','Smoke host targets');
check(Array.isArray(smoke?.cases)&&smoke.cases.length===12,'Twelve core smoke cases');
if(Array.isArray(smoke?.cases)){
 const smokeIds=new Set();
 for(const item of smoke.cases){
  check(!smokeIds.has(item.scenario_id),'Duplicate smoke scenario');smokeIds.add(item.scenario_id);
  check(suite?.scenarios?.some(s=>s.id===item.scenario_id),'Smoke scenario reference: '+item.scenario_id);
  check(typeof item.fixture==='string'&&/^[a-z0-9-]+$/.test(item.fixture)&&fs.existsSync(path.join(root,'evaluation/fixtures',item.fixture,'PROJECT.md')),'Smoke fixture source');
  check(typeof item.supplement==='string'&&item.supplement.length>20&&Array.isArray(item.coverage)&&item.coverage.length>0,'Smoke fixture facts/coverage');
 }
}
check(resultContract?.schema==='devbrain-scorecard-contract'&&resultContract?.version===2,'Scorecard contract schema');
check(JSON.stringify(resultContract?.dimensions)==='["routing_context","intent_precedence","worktree_preservation","authorization","completion","validation_honesty"]','Canonical scoring dimensions');
check(JSON.stringify(resultContract?.statuses)==='["PASS","FAIL","BLOCKED","NOT_RUN"]','Explicit behavioral result statuses');
check(JSON.stringify(resultContract?.execution_stages)==='["unattempted","preflight","session"]','Explicit evaluation execution stages');
const taxonomy=parsed.get('evaluation/failure-taxonomy.yaml');
check(taxonomy?.schema==='devbrain-failure-taxonomy'&&JSON.stringify(Object.keys(taxonomy.categories||{}))===JSON.stringify(resultContract?.failure_categories),'Failure taxonomy parity');
check(taxonomy?.calibration?.require_observed_behavior===true&&taxonomy?.calibration?.require_repeated_pattern_for_global_change===true&&taxonomy?.calibration?.preflight_block_is_not_model_failure===true,'Evidence-driven calibration');
for(const[f,t]of docs)if(f.endsWith('.md')&&!/^(docs|evaluation|adapters)\//.test(f))for(const p of t.split(/\r?\n\s*\r?\n/).map(x=>x.trim()).filter(x=>x.length>=200)){if(!paras.has(p))paras.set(p,new Set());paras.get(p).add(f)}
function metrics(t){return{bytes:Buffer.byteLength(t),characters:t.length,words:(t.match(/\S+/g)||[]).length,estimated_tokens:Math.ceil(t.length/4)}}
console.log(JSON.stringify({checks,files_scanned:files.length,yaml_files:parsed.size,scenarios:suite?.scenarios?.length,runtime_comparison_basis:'HEAD baseline versus working-tree baseline',runtime_before:metrics(git(['show','HEAD:runtime/session-baseline.md'])),runtime_after:metrics(docs.get('runtime/session-baseline.md')),duplicate_candidates:[...paras.values()].filter(s=>s.size>1).map(s=>[...s]),errors},null,2));
if(errors.length)process.exit(1);
