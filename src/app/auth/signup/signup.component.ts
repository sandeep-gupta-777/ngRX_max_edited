import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import {Store} from '@ngrx/store';
import {GlobalAppState} from '../../store/app.reducers';
import {TrySignUp} from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private store:Store<GlobalAppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    // this.authService.signupUser(email, password);
    this.store.dispatch(new TrySignUp({username:email, password}));
  }

}
