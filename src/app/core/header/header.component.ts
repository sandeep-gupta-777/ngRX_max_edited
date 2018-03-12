import {Component, OnInit} from '@angular/core';
// import { HttpEvent, HttpEventType } from '@angular/common/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromAppState from '../../store/app.reducers';
import {Observable} from 'rxjs/Observable';
import * as fromAuth from '../../auth/store/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  authState: Observable<fromAuth.State>;
  constructor(private dataStorageService: DataStorageService,
              private store:Store<fromAppState.GlobalAppState>,
              private authService: AuthService) { }
  ngOnInit(){
    this.authState = this.store.select('auth');
  }
  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
