// Structural contracts for the skill system; this never launches a model.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const yaml=require(process.argv[3]||path.join(root,'local/validation/node_modules/js-yaml'));
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=yaml.load(read('devbrain.yaml')),catalog=yaml.load(read('skills/catalog.yaml'));
const scenarios=yaml.load(read('evaluation/scenarios.yaml')).scenarios;
let checks=0;const check=(ok,msg)=>{assert.ok(ok,msg);checks++};
const actual=fs.readdirSync(path.join(root,'skills'),{withFileTypes:true}).filter(e=>e.isDirectory()&&fs.existsSync(path.join(root,'skills',e.name,'SKILL.md'))).map(e=>e.name).sort();
check(JSON.stringify([...manifest.skills].sort())===JSON.stringify(actual),'Manifest matches source directories');
check(JSON.stringify(catalog.skills.map(s=>s.id).sort())===JSON.stringify(actual),'Catalog owns every installed source skill exactly once');
check(new Set(manifest.skills).size===manifest.skills.length,'Manifest has no duplicate skills');
check(catalog.skills.filter(s=>s.positive&&s.negative).length===21,'Twenty-one additions have positive and boundary use cases');
for(const file of ['install/install-bootstrap.ps1','evaluation/test-installer.ps1']){
 const line=read(file).match(/\$names = @\(([^\n]+)\)/)?.[1];
 const names=[...(line||'').matchAll(/'([^']+)'/g)].map(m=>m[1]).sort();
 check(JSON.stringify(names)===JSON.stringify(actual),file+' packages the exact manifest set');
}
for(const s of catalog.skills){
 check(typeof s.owns==='string'&&s.owns.length>20,s.id+' has a concrete owner');
 check(s.inputs.length>20&&s.outputs.length>20,s.id+' defines incoming/outgoing artifacts');
 check(read('runtime/task-map.md').includes('`'+s.id+'`'),s.id+' is reachable through selective routing');
 const meta=yaml.load(read('skills/'+s.id+'/agents/openai.yaml'));
 check(meta.policy.allow_implicit_invocation===true,s.id+' remains discoverable');
 check(meta.interface.default_prompt.includes('$'+s.id),s.id+' UI invocation selects itself');
 for(const r of s.collaborates){
  check(actual.includes(r.skill)&&r.skill!==s.id,s.id+' handoff has a distinct available owner');
  check(r.handoff.length>15,s.id+' handoff specifies an artifact');
 }
 if(s.positive){
  check(scenarios.some(c=>c.skills_active.includes(s.id)&&c.prompt===s.positive.prompt),s.id+' positive is in executable evaluation inventory');
  check(scenarios.some(c=>c.skills_unnecessary.includes(s.id)&&c.prompt===s.negative.prompt),s.id+' boundary is covered');
 }
}
const simple=scenarios.find(s=>s.id==='99-observability-debugging-boundary');
const git=scenarios.find(s=>s.id==='101-ci-cd-release-engineering-boundary');
check(simple.skills_active.length===0,'Routine syntax repair does not invoke architecture refactoring');
check(git.skills_active.length===0&&git.context_to_read.includes('workflows/git-command-listing.md'),'Git listing uses text-only workflow without a skill');
check(JSON.stringify(manifest.always_load)==='["runtime/session-baseline.md"]','Expanded catalog is not added to startup');
console.log('PASS: '+checks+' skill-system contract checks for '+actual.length+' skills. Native behavior is not established by these checks.');
