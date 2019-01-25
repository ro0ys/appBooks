import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth : boolean;
  userConnected : string;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.userConnected = this.authService.userConnected;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
