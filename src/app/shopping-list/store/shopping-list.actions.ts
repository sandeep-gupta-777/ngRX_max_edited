import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

/*action types for comparing in switch*/
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action{
  readonly type: string = ADD_INGREDIENT;
  /*payload is mostly required but not necessary by Action interface*/
  constructor(public payload:Ingredient){}
}
export class AddIngredients implements Action{
  readonly type: string = ADD_INGREDIENTS;
  /*payload is mostly required but not necessary by Action interface*/
  constructor(public payload:Ingredient[]){}
}
export class UpdateIngredient implements Action{
  readonly type: string = UPDATE_INGREDIENTS;
  /*payload is mostly required but not necessary by Action interface*/
  constructor(public payload:{ingredient:Ingredient}){}
}
export class DeleteIngredient implements Action{
  readonly type: string = DELETE_INGREDIENTS;
  /*payload is mostly required but not necessary by Action interface*/
  constructor(){}
}
export class StartEdit implements Action{
  readonly type: string = START_EDIT;
  /*payload is mostly required but not necessary by Action interface*/
  constructor(public payload:{editedIngredientIndex:number}){}
}
export class StopEdit implements Action{
  readonly type: string = STOP_EDIT;
  /*payload is mostly required but not necessary by Action interface*/
  constructor(){}
}

export type ShoppingListActions =
  AddIngredient  |
  AddIngredients |
  UpdateIngredient|
  DeleteIngredient|
  StartEdit|
  StopEdit
  ;

