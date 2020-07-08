import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  visible: string = "eye-off";
  passwordV: string = "password";
  constructor() { }

  ngOnInit() {
  }

  passwordVisible() {
    if(this.visible == "eye") {
      this.visible = "eye-off";
      this.passwordV = "password";
    } else {
      this.visible = "eye";
      this.passwordV = "text";
    }
  }
}
