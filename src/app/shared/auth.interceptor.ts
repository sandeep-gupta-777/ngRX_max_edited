import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import {State} from '../auth/store/auth.reducer';
import {Store} from '@ngrx/store';
import {GlobalAppState} from '../store/app.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private store:Store<GlobalAppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    // const copiedReq = req.clone({headers: req.headers.set('', '')});
    return this.store.select('auth')
      .take(1)/* everytime HTTP is fired a new subscription is made. we just want a subscription to unsubscribe after firring once*/
      .switchMap((authState:State)=>{
        const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
        return next.handle(copiedReq);

      });
    // return null;
  }
}
