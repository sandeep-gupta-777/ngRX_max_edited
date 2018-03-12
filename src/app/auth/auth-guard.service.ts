import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import {State} from './store/auth.reducer';
import {Store} from '@ngrx/store';
import {GlobalAppState} from '../store/app.reducers';
import * as fromAuth from './store/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private store: Store<GlobalAppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /*TODO: As an alternate: can we directly select authenticated?*/
    return this.store.select('auth').map((authState:State)=>{
        return authState.authenticated;
    } )  ;
  }
}
