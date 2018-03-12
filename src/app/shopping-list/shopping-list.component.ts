import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListIngredient: Observable<any>;
  private subscription: Subscription;
  /*TODO: why are we selecting the slice of the date with the key with which reducer is registered*/
  constructor(private slService: ShoppingListService, private store:Store<fromApp.GlobalAppState>) { }

  ngOnInit() {
    // this.shoppingListIngredient = this.slService.getIngredients();

    /*TODO: why are we selecting the slice of the date with the key with which reducer is registered*/
    this.shoppingListIngredient = this.store.select('shoppingList');
    this.store.select('shoppingList')
      .subscribe((data)=>{
        console.log(data);
      })
    // this.subscription = this.slService.ingredientsChanged
    //   .subscribe(
    //     (shoppingListIngredient: Ingredient[]) => {
    //       this.shoppingListIngredient = shoppingListIngredient;
    //     }
    //   );
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit({editedIngredientIndex:index}));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
