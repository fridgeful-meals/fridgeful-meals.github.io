import {test} from 'node:test';
import assert from 'node:assert/strict';
import {foodDetections,mergeScannedItems} from '../lib/photo-detections.ts';
test('scanner accepts food matches only and never guesses bottle contents',()=>{
 const results=foodDetections([{class:'bottle',score:.99},{class:'refrigerator',score:.9},{class:'apple',score:.8},{class:'banana',score:.3},{class:'carrot',score:NaN},{class:'cake',score:2},{class:'toString',score:.9}]);
 assert.deepEqual(results.map(i=>i.name),['apples']);
});
test('multiple visible objects group by food and weights remain starter values',()=>{
 const results=foodDetections([{class:'apple',score:.8},{class:'apple',score:.9},{class:'broccoli',score:.7},{class:'broccoli',score:.6}]);
 assert.equal(results[0].qty,2);assert.equal(results[0].score,.9);assert.equal(results[1].qty,200);assert.equal(results[1].unit,'g');assert.equal(results[1].visibleCount,2);
});
test('confirming a repeat scan updates rather than doubles inventory and preserves other foods',()=>{
 const inventory=[{name:'apples',qty:5,unit:'each',location:'Fridge',soon:true},{name:'milk',qty:300,unit:'g',location:'Fridge',soon:false}];
 const results=foodDetections([{class:'apple',score:.9},{class:'carrot',score:.8}]);results[1].selected=false;
 const updated=mergeScannedItems(inventory,results);
 assert.equal(updated.length,2);assert.equal(updated[0].qty,1);assert.equal(updated[0].soon,true);assert.equal(updated[1].qty,300);assert.equal(inventory[0].qty,5);
 assert.deepEqual(mergeScannedItems(updated,results),updated);
});
test('invalid quantities cannot corrupt saved inventory',()=>{
 for(const qty of [0,-1,NaN,Infinity,100001]){const rows=foodDetections([{class:'apple',score:.9}]);rows[0].qty=qty;assert.throws(()=>mergeScannedItems([],rows));}
 const rows=foodDetections([{class:'apple',score:.9}]);rows[0].location='Freezer';assert.equal(mergeScannedItems([],rows)[0].location,'Freezer');
});
