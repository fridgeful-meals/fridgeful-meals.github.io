import type {InventoryItem} from './planner.ts';

export type FoodDetection = {name:string; score:number; visibleCount:number; qty:number; unit:string; location:string; selected:boolean};
export type ObjectPrediction = {class:string; score:number};
// COCO-SSD's complete set of food labels. Never infer a bottle's contents.
const foods:Record<string,{name:string;unit:string}> = {
 banana:{name:'bananas',unit:'each'}, apple:{name:'apples',unit:'each'}, orange:{name:'oranges',unit:'each'},
 broccoli:{name:'broccoli',unit:'g'}, carrot:{name:'carrots',unit:'g'},
 sandwich:{name:'sandwich',unit:'each'}, 'hot dog':{name:'hot dogs',unit:'each'},
 pizza:{name:'pizza',unit:'each'}, donut:{name:'donut',unit:'each'}, cake:{name:'cake',unit:'each'},
};
export function foodDetections(predictions:ObjectPrediction[]):FoodDetection[]{
 const grouped=new Map<string,FoodDetection>();
 for(const p of predictions){
  const food=Object.hasOwn(foods,p.class)?foods[p.class]:undefined;
  if(!food||!Number.isFinite(p.score)||p.score<0.5||p.score>1)continue;
  const old=grouped.get(food.name);
  if(old){old.visibleCount++;old.score=Math.max(old.score,p.score);if(old.unit==='each')old.qty=old.visibleCount;}
  else grouped.set(food.name,{...food,score:p.score,visibleCount:1,qty:food.unit==='each'?1:200,location:'Fridge',selected:true});
 }
 return [...grouped.values()].sort((a,b)=>b.score-a.score);
}
// A scan describes what is present now, so confirmed quantities replace matching
// rows rather than increasing them on every repeat scan. Other inventory is kept.
export function mergeScannedItems(inventory:InventoryItem[],detected:FoodDetection[]):InventoryItem[]{
 const next=inventory.map(i=>({...i}));
 for(const d of detected.filter(i=>i.selected)){
  if(!d.name.trim()||d.name.length>80||!Number.isFinite(d.qty)||d.qty<=0||d.qty>100000||!['g','each'].includes(d.unit)||!['Fridge','Pantry','Freezer'].includes(d.location))throw Error('Check the quantities and locations before saving.');
  const found=next.findIndex(i=>i.name===d.name&&i.unit===d.unit&&i.location===d.location);
  if(found>=0)next[found]={...next[found],qty:d.qty};
  else next.push({name:d.name,qty:d.qty,unit:d.unit,location:d.location,soon:false});
 }
 if(next.length>200)throw Error('Your kitchen can hold up to 200 ingredients. Remove a few before adding more.');
 return next;
}
