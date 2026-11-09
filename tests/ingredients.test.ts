import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ingredientChoices,searchIngredients} from '../lib/ingredients.ts';
import {catalog} from '../lib/planner.ts';
test('extended search covers recipe ingredients and valid inventory units',()=>{assert.ok(ingredientChoices.length>=400);assert.equal(new Set(ingredientChoices.map(i=>i.name)).size,ingredientChoices.length);for(const name of Object.keys(catalog))assert.ok(ingredientChoices.some(i=>i.name===name));assert.ok(ingredientChoices.every(i=>['g','each'].includes(i.unit)&&['Fridge','Pantry','Freezer'].includes(i.location)&&i.qty>0));});
test('common aliases resolve to canonical ingredients',()=>{assert.equal(searchIngredients('minced beef')[0]?.name,'ground beef');assert.equal(searchIngredients('tomato')[0]?.name,'tomatoes');assert.equal(searchIngredients('garbanzo beans')[0]?.name,'chickpeas');assert.equal(searchIngredients('jalapeno')[0]?.name,'jalapeños');});
test('specific ingredients rank ahead of broader matches',()=>{assert.equal(searchIngredients('chicken breast')[0]?.name,'chicken breast');assert.equal(searchIngredients('ground beef')[0]?.name,'ground beef');assert.equal(searchIngredients('beef ground')[0]?.name,'ground beef');});
test('category filters and unknown names remain distinct',()=>{assert.equal(searchIngredients('ground beef','Fruit').length,0);assert.ok(searchIngredients('','Seafood').every(i=>i.category==='Seafood'));assert.equal(searchIngredients('not-a-real-ingredient-xyz').length,0);});
