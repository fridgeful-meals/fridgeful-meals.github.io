'use client';
import {useEffect,useRef,useState} from 'react';
import {Camera,Upload,X,Sparkles,Plus,Check} from 'lucide-react';
import {ingredientEmoji} from '../lib/ingredients';
import type {FoodDetection} from '../lib/photo-detections';
import type {InventoryItem} from '../lib/planner';

export default function PhotoScanner({inventory,onSave,onSample,onManual}:{inventory:InventoryItem[];onSave:(items:FoodDetection[])=>void;onSample:()=>void;onManual:()=>void}){
 const [photo,setPhoto]=useState(''),[busy,setBusy]=useState(false),[status,setStatus]=useState(''),[error,setError]=useState(''),[results,setResults]=useState<FoodDetection[]|null>(null);
 const input=useRef<HTMLInputElement>(null),run=useRef(0),photoRef=useRef('');
 useEffect(()=>()=>{run.current++;if(photoRef.current)URL.revokeObjectURL(photoRef.current);},[]);
 function clearPhoto(){run.current++;if(photoRef.current)URL.revokeObjectURL(photoRef.current);photoRef.current='';setPhoto('');setResults(null);setError('');setStatus('');setBusy(false);}
 async function upload(file?:File){
  if(!file)return;
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>8*1024*1024){setError('Choose a JPG, PNG or WebP photo smaller than 8 MB.');return;}
  clearPhoto();const id=run.current;const url=URL.createObjectURL(file);
  try{const image=new Image();image.src=url;await image.decode();if(!image.naturalWidth||image.naturalWidth*image.naturalHeight>40_000_000)throw Error();}
  catch{URL.revokeObjectURL(url);if(run.current===id)setError('This photo could not be opened. Try another image, up to 40 megapixels.');return;}
  if(run.current!==id){URL.revokeObjectURL(url);return;}
  photoRef.current=url;setPhoto(url);
 }
 async function scan(){
  if(!photo||busy)return;const id=++run.current;setBusy(true);setError('');setResults(null);
  try{const {scanPhoto}=await import('../lib/browser-scanner');const detected=await scanPhoto(photo,text=>{if(run.current===id)setStatus(text);});if(run.current===id){setResults(detected);setStatus(detected.length?'Scan complete. Review every match before saving.':'Scan complete. No supported foods were confidently identified.');}}
  catch(e){if(run.current===id){setStatus('');setError(e instanceof Error&&/smaller photo|unavailable in this browser/.test(e.message)?e.message:'The scanner could not finish. Check your internet connection for the model download, then try again. Ingredient search is still available.');}}
  finally{if(run.current===id)setBusy(false);}
 }
 function update(index:number,patch:Partial<FoodDetection>){setResults(rows=>rows?.map((row,i)=>i===index?{...row,...patch}:row)||null);}
 function save(e:React.FormEvent){e.preventDefault();if(!results)return;try{onSave(results);setResults(null);setStatus('Confirmed ingredients saved to your kitchen.');}catch(e){setError(e instanceof Error?e.message:'Please check your selections.');}}
 return <section className="panel upload-panel"><div className="section-heading compact"><h2>Your fridge, in focus</h2><span className="pill">FREE BASIC SCAN</span></div>
  <input ref={input} hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{void upload(e.target.files?.[0]);e.target.value='';}}/>
  {photo?<><div className="photo-preview"><img src={photo} alt="Your uploaded food photo"/><button className="icon-btn" aria-label="Remove photo" onClick={clearPhoto}><X/></button></div><button className="text-link photo-change" disabled={busy} onClick={()=>input.current?.click()}><Upload size={15}/>Choose a different photo</button></>:<button className="upload-drop" onClick={()=>input.current?.click()}><span className="upload-icon"><Camera size={36}/></span><h3>What’s in your fridge?</h3><p>Choose a clear food photo, then scan and review.</p><span className="button secondary"><Upload size={16}/>Choose a photo</span><small>JPG, PNG or WebP · Up to 8 MB</small></button>}
  <div className="notice"><Sparkles size={18}/><p><b>Real detection, with a small food vocabulary.</b> Best for clearly visible apples, bananas, oranges, broccoli and carrots. Crowded shelves and packaged ingredients may be missed.</p></div>
  <details className="scanner-details"><summary>What can this free scanner recognize?</summary><p>Apples, bananas, oranges, broccoli, carrots, sandwiches, hot dogs, pizza, donuts and cake. It cannot identify milk, eggs, ground beef, labels or hidden food. Use ingredient search for everything else.</p><p>Your photo is processed on this device and is not uploaded. The first scan downloads a free model and may take a little longer. Internet is needed to load it. No account or paid API is used.</p></details>
  <button className="button primary full" disabled={!photo||busy} onClick={()=>void scan()}><Sparkles size={17}/>{busy?'Scanning your photo…':results?'Scan photo again':'Scan this photo'}</button>
  <p className="small muted scan-status" role="status" aria-live="polite">{status||(!photo?'Choose a photo to enable scanning.':'Ready to scan. Only confirmed results will be saved.')}</p>
  {error&&<p className="scan-error" role="alert">{error}</p>}
  {results!==null&&(results.length?<form className="scan-review" onSubmit={save}><h3>Does this look right?</h3><p className="small muted">Select foods to keep and check every quantity. Counts are estimates; weights start at 200 g and are not measured from the photo. Matching items update your existing quantity.</p>
   {results.map((row,index)=>{const exists=inventory.some(i=>i.name===row.name&&i.unit===row.unit&&i.location===row.location);return <div className="scan-result" key={row.name}>
    <label className="scan-result-name"><input type="checkbox" checked={row.selected} onChange={e=>update(index,{selected:e.target.checked})}/><span>{ingredientEmoji(row.name)}</span><b>{row.name}</b></label>
    <small className="muted">{Math.round(row.score*100)}% model score · {row.visibleCount} possible object{row.visibleCount!==1?'s':''}{exists?' · updates existing item':''}</small>
    <div className="scan-fields"><label>Quantity<input disabled={!row.selected} aria-label={`Scanned quantity of ${row.name}`} required type="number" min="0.1" max="100000" step="0.1" value={row.qty} onChange={e=>update(index,{qty:Number(e.target.value)})}/></label><label>Unit<select disabled={!row.selected} value={row.unit} onChange={e=>update(index,{unit:e.target.value})}><option value="g">Grams (g)</option><option value="each">Each</option></select></label><label>Location<select disabled={!row.selected} value={row.location} onChange={e=>update(index,{location:e.target.value})}><option>Fridge</option><option>Pantry</option><option>Freezer</option></select></label></div>
   </div>;})}
   <button className="button primary full" disabled={!results.some(i=>i.selected)}><Check size={17}/>Save confirmed ingredients</button><button type="button" className="text-link" onClick={()=>{setResults(null);setStatus('Results discarded. Your kitchen has not changed.');}}>Discard results</button>
  </form>:<div className="scan-empty"><h3>No supported food matches.</h3><p>This does not mean your fridge is empty. Try a closer, well-lit photo of the supported foods, or add ingredients with search.</p><button className="button secondary" onClick={onManual}><Plus size={16}/>Add an ingredient manually</button></div>)}
  <div className="scanner-sample"><p className="small muted">Just exploring the planner? Load the fixed demo kitchen instead. This replaces your ingredient list and does not analyze your photo.</p><button className="button secondary full" disabled={busy} onClick={()=>{onSample();setResults(null);setStatus('Fixed demo kitchen loaded. These foods were not detected from your photo.');}}>Load demo kitchen</button></div>
 </section>;
}
