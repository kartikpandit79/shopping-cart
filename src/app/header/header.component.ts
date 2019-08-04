import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated =  false;
  sub: Subscription;

  constructor(private dataStorage: DataStorageService,
     private authService: AuthService,
     private router: Router ) { }

  ngOnInit() {
    this.sub = this.authService.user.subscribe(
      userData => {
        // this.isAuthenticated = userData ? true : false;
        this.isAuthenticated = !!userData;
        // console.log(this.isAuthenticated);
        // console.log( '-1-' + !!userData);
        // console.log( '--2--' + !userData);
      }
    );
  }

  onSaveData() {
    this.dataStorage.storeRecipe();
  }

  onFetchData() {
    this.dataStorage.onDataFetch().subscribe();
  }

  onLogout() {
    this.authService.onLogout();
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // lect 156
  // @Output() selectedValue = new EventEmitter<string>();
  // onSelect(data) {
  //   this.selectedValue.emit(data);
  // }

}
