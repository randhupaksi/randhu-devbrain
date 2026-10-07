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
if(manifest){
 check(manifest.version==='2.2.0','Manifest version');
 check(JSON.stringify(manifest.always_load)==='["runtime/session-baseline.md"]','Canonical always_load');
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
for(const m of(docs.get('runtime/task-map.md')||'').matchAll(/\x60((?:core|workflows|safety|prompts)\/[^\x60]+)\x60/g))check(fs.existsSync(path.join(root,m[1])),'Route '+m[1]);
check(docs.get('adapters/codex/AGENTS.global.template.md')===docs.get('adapters/claude-code/CLAUDE.global.template.md'),'Bootstrap parity');
const suite=parsed.get('evaluation/scenarios.yaml');
if(suite){
 check(suite.scenarios.length>=21,'Minimum scenarios');const ids=new Set();
 for(const s of suite.scenarios){
  for(const f of ['id','prompt','context_to_read','skills_active','skills_unnecessary','expected_autonomy','expected_approval','expected_files_touched','expected_validation','forbidden_behavior'])check(s[f]!==undefined&&(Array.isArray(s[f])||String(s[f]).length>0),'Scenario field '+s.id+': '+f);
  check(!ids.has(s.id),'Duplicate ID '+s.id);ids.add(s.id);
  check(!s.skills_active.some(n=>s.skills_unnecessary.includes(n)),'Conflicting routing '+s.id);
  for(const n of [...s.skills_active,...s.skills_unnecessary])check(manifest.skills.includes(n),'Unknown skill '+s.id);
  for(const ref of s.context_to_read.filter(x=>/^(runtime|core|safety|workflows)\//.test(x)))check(fs.existsSync(path.join(root,ref)),'Scenario context '+ref);
 }
}
const paras=new Map();
for(const[f,t]of docs)if(f.endsWith('.md')&&!/^(docs|evaluation|adapters)\//.test(f))for(const p of t.split(/\r?\n\s*\r?\n/).map(x=>x.trim()).filter(x=>x.length>=200)){if(!paras.has(p))paras.set(p,new Set());paras.get(p).add(f)}
function metrics(t){return{bytes:Buffer.byteLength(t),characters:t.length,words:(t.match(/\S+/g)||[]).length,estimated_tokens:Math.ceil(t.length/4)}}
console.log(JSON.stringify({checks,files_scanned:files.length,yaml_files:parsed.size,scenarios:suite?.scenarios?.length,runtime_comparison_basis:'HEAD baseline versus working-tree baseline',runtime_before:metrics(git(['show','HEAD:runtime/session-baseline.md'])),runtime_after:metrics(docs.get('runtime/session-baseline.md')),duplicate_candidates:[...paras.values()].filter(s=>s.size>1).map(s=>[...s]),errors},null,2));
if(errors.length)process.exit(1);
