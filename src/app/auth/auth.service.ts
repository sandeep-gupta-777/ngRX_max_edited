import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from './store/auth.reducer';
import {LogOut, SetToken, SignIn, Signup} from './store/auth.actions';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router, private store:Store<fromAuth.State>) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user)=>{
        this.store.dispatch(new Signup());
        firebase.auth().currentUser.getToken()
          .then(

            (token: string) => {
              this.token = token;
              this.store.dispatch(new SetToken({token:token}));
            }
          )
      })
      .catch(
        error => console.log(error)
      )
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new SignIn());
          this.router.navigate(['/']);
          firebase.auth().currentUser.getToken()
            .then(

              (token: string) => {
                this.token = token;
                this.store.dispatch(new SetToken({token:token}));
              }
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    // this.token = null;
    this.store.dispatch(new LogOut());
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  // isAuthenticated() {
  //   return this.token != null;
  // }
}
