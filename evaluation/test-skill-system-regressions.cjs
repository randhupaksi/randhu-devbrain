// Mutation checks against a workspace-contained synthetic copy, never real host homes.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),fixture=fs.mkdtempSync(path.join(root,'local/skill-system-regressions-'));
const yamlPath=path.join(root,'local/validation/node_modules/js-yaml'),yaml=require(yamlPath);
for(const name of ['devbrain.yaml','skills','runtime/task-map.md','evaluation/scenarios.yaml','evaluation/test-installer.ps1','install/install-bootstrap.ps1']){
 const dest=path.join(fixture,name);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.cpSync(path.join(root,name),dest,{recursive:true});
}
const invoke=()=>cp.spawnSync(process.execPath,[path.join(__dirname,'test-skill-system.cjs'),fixture,yamlPath],{encoding:'utf8',windowsHide:true});
assert.equal(invoke().status,0,'Clean fixture passes');let rejected=0;
function corrupt(file,mutate){const dest=path.join(fixture,file),saved=fs.readFileSync(dest,'utf8');try{fs.writeFileSync(dest,mutate(saved));assert.notEqual(invoke().status,0,'Reject '+file);rejected++}finally{fs.writeFileSync(dest,saved)}}
function ymut(t,fn){const v=yaml.load(t);fn(v);return yaml.dump(v)}
corrupt('skills/catalog.yaml',t=>ymut(t,v=>{v.skills[0].collaborates[0].skill='missing-owner'}));
corrupt('install/install-bootstrap.ps1',t=>t.replace("'api-contracts', ",''));
corrupt('runtime/task-map.md',t=>t.replaceAll('`api-contracts`','api-contracts'));
corrupt('evaluation/scenarios.yaml',t=>ymut(t,v=>{v.scenarios.find(s=>s.id==='99-observability-debugging-boundary').skills_active=['architecture-refactor']}));
corrupt('devbrain.yaml',t=>ymut(t,v=>{v.always_load.push('skills/catalog.yaml')}));
assert.equal(invoke().status,0,'Restored fixture passes');
console.log('PASS: clean/restored fixture and '+rejected+' intentional skill-system regressions rejected. Fixtures retained in local/.');
