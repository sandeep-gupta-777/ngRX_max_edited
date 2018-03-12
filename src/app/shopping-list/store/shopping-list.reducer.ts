
import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import {DeleteIngredient, StopEdit, UpdateIngredient} from './shopping-list.actions';

// /*action types for comparing in switch*/
// export const ADD_INGREDIENT = 'ADD_INGREDIENT';
// export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';


export interface State{
  ingredients:Ingredient[],
  editedIngredient:Ingredient,
  editedIngredientIndex:number

}
const initialState:State = {
    ingredients:[
      new Ingredient('Apple', 5),
      new Ingredient('Orange', 10)
    ],
  editedIngredient:null,
  editedIngredientIndex:-1
};
/*writing arrow function will not work here*/
export function shoppingListReducer(state = initialState, action:ShoppingListActions.ShoppingListActions){
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients:[...state.ingredients, (<ShoppingListActions.AddIngredient>action).payload]
      };
      case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients:[...state.ingredients, ...(<ShoppingListActions.AddIngredients>action).payload]
      };
      case ShoppingListActions.UPDATE_INGREDIENTS:
        let updateAction = (<UpdateIngredient>action);
        let indexToBeUpdated  = state.editedIngredientIndex;
        let newIngredient  = updateAction.payload.ingredient;
        let ingredients = state.ingredients;
        ingredients[indexToBeUpdated] = newIngredient;
      return {
        ...state,
        ingredients
      };
    case ShoppingListActions.DELETE_INGREDIENTS:
      let deleteAction = (<DeleteIngredient>action);
      let oldIngredient = state.ingredients;
      oldIngredient.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        oldIngredient
      };

    case ShoppingListActions.START_EDIT:
      let tempEditedIngredientIndex = (<ShoppingListActions.StartEdit>action).payload.editedIngredientIndex;
      console.log(state);
      return{
        ...state,
        editedIngredient:state.ingredients[tempEditedIngredientIndex],
        editedIngredientIndex:tempEditedIngredientIndex
      };
    case ShoppingListActions.STOP_EDIT:
      return{
        ...state,
        editedIngredient:null,
        editedIngredientIndex:-1
      };
    default:
      return state;
  }
}
