export type InventoryItem = { name: string; qty: number; unit: string; location: string; soon: boolean };
export type Settings = { people: number; budget: number; days: number; store: string; diet: string; style: string; minutes: number; cravings?: string };
export type Recipe = { id: string; title: string; subtitle: string; emoji: string; image: string; minutes: number; vegetarian: boolean; ingredients: Record<string, number>; steps: string[] };
export const catalog: Record<string, {unit: string; price: number; pack: number; emoji: string; category: string}> = {
 spinach:{unit:'g',price:2.49,pack:200,emoji:'🥬',category:'Produce'},tomatoes:{unit:'each',price:2.99,pack:4,emoji:'🍅',category:'Produce'},eggs:{unit:'each',price:3.99,pack:12,emoji:'🥚',category:'Dairy & eggs'},rice:{unit:'g',price:2.99,pack:900,emoji:'🍚',category:'Pantry'},pasta:{unit:'g',price:1.49,pack:450,emoji:'🍝',category:'Pantry'},chickpeas:{unit:'g',price:1.29,pack:400,emoji:'🫘',category:'Pantry'},chicken:{unit:'g',price:6.99,pack:500,emoji:'🍗',category:'Protein'},tortillas:{unit:'each',price:2.49,pack:8,emoji:'🫓',category:'Bakery'},cheese:{unit:'g',price:3.49,pack:200,emoji:'🧀',category:'Dairy & eggs'},broccoli:{unit:'g',price:2.49,pack:350,emoji:'🥦',category:'Produce'},onion:{unit:'each',price:0.79,pack:1,emoji:'🧅',category:'Produce'},beans:{unit:'g',price:1.29,pack:400,emoji:'🫘',category:'Pantry'}
};
const photo=(id:string)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
export const recipes: Recipe[] = [
{id:'pasta',title:'Garden tomato pasta',subtitle:'A little comfort. A lot of greens.',emoji:'🍝',image:photo('photo-1473093226795-af9932fe5856'),minutes:20,vegetarian:true,ingredients:{pasta:320,tomatoes:4,spinach:150,cheese:60},steps:['Cook pasta in boiling water according to the package.','Chop tomatoes and simmer in a pan with a splash of pasta water.','Stir in spinach until wilted. Toss with pasta, top with cheese, and divide into servings.']},
{id:'bowl',title:'Golden chickpea bowls',subtitle:'Your pantry, looking its best.',emoji:'🥗',image:photo('photo-1512621776951-a57141f2eefd'),minutes:25,vegetarian:true,ingredients:{rice:280,chickpeas:400,broccoli:350,onion:1},steps:['Cook rice according to its package.','Drain chickpeas. Chop broccoli and onion.','Cook vegetables in a covered pan with a little water until tender; add chickpeas and heat through. Serve over rice.']},
{id:'eggs',title:'Spinach & tomato skillet',subtitle:'Breakfast energy. Dinner simplicity.',emoji:'🍳',image:photo('photo-1525351484163-7529414344d8'),minutes:15,vegetarian:true,ingredients:{eggs:8,spinach:200,tomatoes:4,tortillas:4},steps:['Chop tomatoes and cook in a pan until softened. Add spinach and let it wilt.','Beat eggs, add them to the pan, and cook until firm.','Warm tortillas and serve alongside the skillet.']},
{id:'tacos',title:'Weeknight black bean tacos',subtitle:'Big flavor, small shopping list.',emoji:'🌮',image:photo('photo-1551504734-5ee1c4a1479b'),minutes:20,vegetarian:true,ingredients:{beans:400,tortillas:8,tomatoes:2,cheese:100,onion:1},steps:['Drain beans and heat in a saucepan with chopped onion and a splash of water.','Dice tomatoes and warm tortillas.','Fill tortillas with beans, tomatoes, and cheese.']},
{id:'chicken',title:'Chicken & broccoli rice',subtitle:'One pan, happy household.',emoji:'🍗',image:photo('photo-1547592180-85f173990554'),minutes:30,vegetarian:false,ingredients:{chicken:500,rice:280,broccoli:350,onion:1},steps:['Cook rice according to the package.','Use separate utensils for raw chicken. Cut chicken and cook it in a pan until the center reaches 165°F / 74°C.','Add chopped onion and broccoli, cook until tender, and serve over rice.']},
{id:'friedrice',title:'Use-it-up veggie rice',subtitle:'Yesterday’s ingredients, tonight’s favorite.',emoji:'🍚',image:photo('photo-1512058564366-18510be2db19'),minutes:20,vegetarian:true,ingredients:{rice:280,eggs:4,broccoli:200,spinach:100,onion:1},steps:['Cook rice according to the package.','Chop onion and broccoli; cook until tender with a splash of water.','Add spinach. Scramble eggs in the pan until firm, then fold in cooked rice.']}
];
export const sampleInventory: InventoryItem[]=[{name:'spinach',qty:200,unit:'g',location:'Fridge',soon:true},{name:'tomatoes',qty:4,unit:'each',location:'Fridge',soon:true},{name:'eggs',qty:6,unit:'each',location:'Fridge',soon:false},{name:'rice',qty:500,unit:'g',location:'Pantry',soon:false},{name:'cheese',qty:100,unit:'g',location:'Fridge',soon:false}];
export const defaultSettings:Settings={people:2,budget:65,days:5,store:"Trader Joe’s",diet:'Any',style:'Use what I have',minutes:30,cravings:''};
export function shoppingList(plan:Recipe[],inventory:InventoryItem[],people:number){
 const demand:Record<string,number>={};
 for(const r of plan)for(const [n,q]of Object.entries(r.ingredients))demand[n]=(demand[n]||0)+(catalog[n].unit==='each'?Math.ceil(q*people/4):q*people/4);
 return Object.entries(demand).map(([name,needed])=>{const product=catalog[name];const owned=inventory.filter(i=>i.name.toLowerCase()===name&&i.unit===product.unit).reduce((s,i)=>s+i.qty,0);const missing=Math.max(0,Math.round((needed-owned)*100)/100);const packs=Math.ceil(missing/product.pack);return {name,needed,owned,missing,packs,cost:Math.round(packs*product.price*100)/100,...product};});
}
export function totalCost(plan:Recipe[],inventory:InventoryItem[],people:number){return Math.round(shoppingList(plan,inventory,people).reduce((s,i)=>s+i.cost,0)*100)/100;}
export function makePlan(settings:Settings,inventory:InventoryItem[]):Recipe[]{
 const candidates=recipes.filter(r=>(settings.diet!=='Vegetarian'||r.vegetarian)&&r.minutes<=settings.minutes);
 if(!candidates.length)return [];
 const plan:Recipe[]=[];
 for(let d=0;d<settings.days;d++){
  const sorted=[...candidates].sort((a,b)=>{
   const score=(r:Recipe)=>{const overlap=Object.keys(r.ingredients).reduce((s,n)=>s+(inventory.some(i=>i.name===n)?1:0)+(inventory.some(i=>i.name===n&&i.soon)?0.6:0),0);const repeats=plan.filter(p=>p.id===r.id).length;const mood=(settings.cravings||'').toLowerCase().split(/[,\s]+/).filter(t=>t.length>2).some(t=>r.title.toLowerCase().includes(t))?4:0;const marginal=totalCost([...plan,r],inventory,settings.people)-totalCost(plan,inventory,settings.people);return mood+overlap*(settings.style==='Use what I have'?2:0.5)-repeats*(settings.style==='More variety'?12:7)-marginal*(settings.style==='Lowest cost'?2:0.25);};return score(b)-score(a);});
  const affordable=sorted.find(r=>totalCost([...plan,r],inventory,settings.people)<=settings.budget);
  plan.push(affordable||[...sorted].sort((a,b)=>totalCost([...plan,a],inventory,settings.people)-totalCost([...plan,b],inventory,settings.people))[0]);
 }
 return plan;
}
