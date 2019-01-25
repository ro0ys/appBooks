import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appBook';

  constructor() {
      const config = {
      apiKey: "AIzaSyA4T_abQcnv1T-nbvJpe83IXUpaPSMXRM8",
      authDomain: "appbook-7364.firebaseapp.com",
      databaseURL: "https://appbook-7364.firebaseio.com",
      projectId: "appbook-7364",
      storageBucket: "appbook-7364.appspot.com",
      messagingSenderId: "605214408476"
    };
    firebase.initializeApp(config);
  }
}
