import type {ObjectDetection} from '@tensorflow-models/coco-ssd';
import {foodDetections} from './photo-detections.ts';

let modelPromise:Promise<ObjectDetection>|undefined;
let inferenceQueue:Promise<unknown>=Promise.resolve();
async function loadDetector(){
 if(!modelPromise)modelPromise=(async()=>{
  const tf=await import('@tensorflow/tfjs-core');
  await Promise.all([import('@tensorflow/tfjs-backend-webgl'),import('@tensorflow/tfjs-backend-cpu')]);
  try{if(!await tf.setBackend('webgl'))await tf.setBackend('cpu');}catch{await tf.setBackend('cpu');}
  await tf.ready();
  const coco=await import('@tensorflow-models/coco-ssd');
  return coco.load({base:'mobilenet_v2'});
 })().catch(error=>{modelPromise=undefined;throw error;});
 return modelPromise;
}
export async function scanPhoto(photoUrl:string,onStatus:(text:string)=>void){
 onStatus('Loading the free scanner… The first scan downloads a model; keep this tab open.');
 let timer:ReturnType<typeof setTimeout>|undefined;
 const model=await Promise.race([loadDetector(),new Promise<never>((_,reject)=>{timer=setTimeout(()=>reject(Error('Model download timed out. Please check your connection and try again.')),120_000);})]).finally(()=>clearTimeout(timer));
 const image=new Image();image.src=photoUrl;await image.decode();
 if(!image.naturalWidth||image.naturalWidth*image.naturalHeight>40_000_000)throw Error('Please choose a smaller photo, up to 40 megapixels.');
 const scale=Math.min(1,1280/Math.max(image.naturalWidth,image.naturalHeight));
 const canvas=document.createElement('canvas');canvas.width=Math.round(image.naturalWidth*scale);canvas.height=Math.round(image.naturalHeight*scale);
 const context=canvas.getContext('2d');if(!context)throw Error('Photo scanning is unavailable in this browser. Please use ingredient search.');
 context.drawImage(image,0,0,canvas.width,canvas.height);
 onStatus('Looking for visible foods in your photo…');
 // Yield so the status paints before inference, particularly with the CPU fallback.
 await new Promise(resolve=>setTimeout(resolve,30));
 const job=inferenceQueue.catch(()=>{}).then(async()=>{
  try{return await model.detect(canvas,60,0.5);}catch{
   const tf=await import('@tensorflow/tfjs-core');await tf.setBackend('cpu');await tf.ready();
   return model.detect(canvas,60,0.5);
  }
 });
 inferenceQueue=job;
 return foodDetections(await job);
}
