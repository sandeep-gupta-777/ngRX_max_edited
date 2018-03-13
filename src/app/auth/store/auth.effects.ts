import {Actions, Effect} from '@ngrx/effects';
import * as authActions from './auth.actions';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

/*IMPORTANT POINT TO KEEP IN MIND THAT WE NEVER CHANGE APP STATE IN ANY OF EFFECTS*/
@Injectable()
export class AuthEffects{
  constructor(
    private action$:Actions,
    private router:Router
  ){}
  /*One effect for each action*/
  @Effect()/*AT THE END OF THE EFFECTS WE MUST EMIT A NEW EFFECTS or ADD {dispatch:false}*/
  authSignup = this.action$
    .ofType(authActions.TRY_SIGN_UP)
    .map((action:authActions.TrySignUp)=>{
      return action.payload;
    })
    .switchMap((authData:{ username: string, password: string })=>{
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username,authData.password));
    })
    .switchMap(()=>{
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token:string)=>{
      this.router.navigate(['/']);
      return [
        {
          type:authActions.SIGN_UP,
        },
        {
          type:authActions.SET_TOKEN,
          payload:{token:token}
        },

      ]
    })

  @Effect()/*AT THE END OF THE EFFECTS WE MUST EMIT A NEW EFFECTS or ADD {dispatch:false}*/
  authSignin = this.action$
    .ofType(authActions.TRY_SIGN_IN)
    .map((action:authActions.TrySignUp)=>{
      return action.payload;
    })
    .switchMap((authData:{ username: string, password: string })=>{
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username,authData.password));
    })
    .switchMap(()=>{
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token:string)=>{
      this.router.navigate(['/']);
      return [
        {
          type:authActions.SIGN_IN,
        },
        {
          type:authActions.SET_TOKEN,
          payload:{token:token}
        },

      ]
    })

  @Effect()
  authLogout = this.action$
    .ofType(authActions.LOG_OUT)
    .do(()=>{
      this.router.navigate(['/']);
    })

}
