

/*a state which will bundle all of other state*/
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface GlobalAppState{
  shoppingList:fromShoppingList.State;
  auth:fromAuth.State;
}

export const reducers:ActionReducerMap<GlobalAppState> = {
  shoppingList:fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
