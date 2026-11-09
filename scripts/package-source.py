"""Create a portable source ZIP and GitHub tree manifest, excluding identity/secrets."""
from pathlib import Path
import json, zipfile
root=Path(__file__).resolve().parents[1]
files=[]
for name in ['index.html','vite.pages.config.ts','README.md','CONTRIBUTING.md','package.json','package-lock.json','tsconfig.json','next.config.ts','vite.config.ts','postcss.config.mjs','eslint.config.mjs','cloudflare-env.d.ts','drizzle.config.ts','.gitignore','.npmrc','components.json']:
    p=root/name
    if p.exists(): files.append(p)
for name in ['static','app','lib','scripts','worker','db','drizzle','docs','tests','public','vendor','.github']:
    files += [p for p in (root/name).rglob('*') if p.is_file() and p.suffix not in ['.zip','.pyc'] and '__pycache__' not in p.parts]
entries=[{'path':str(p.relative_to(root)),'mode':'100644','type':'blob','content':p.read_text()} for p in sorted(set(files))]
entries.append({'path':'.openai/hosting.json','mode':'100644','type':'blob','content':json.dumps({'d1':None,'r2':None},indent=2)+'\n'})
out=root/'outputs';out.mkdir(exist_ok=True)
with zipfile.ZipFile(out/'fridgeful-source.zip','w',zipfile.ZIP_DEFLATED) as z:
    for e in entries:z.writestr('fridgeful/'+e['path'],e['content'])
(out/'github-tree.json').write_text(json.dumps(entries))
print(json.dumps({'files':len(entries),'archive':str(out/'fridgeful-source.zip'),'manifest_bytes':(out/'github-tree.json').stat().st_size}))
