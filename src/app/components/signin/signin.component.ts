/**
* @author: SANA SHAIKh
* @since: 6/June/2018
* @description: This is login component contains login method  
*/
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { LoginService } from '../../services/login.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

  model: any = {};

  public response;

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'Email ID/Username cannot be left blank' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  password = new FormControl('', [Validators.required]);
  getErrorMessage1() {
    return this.password.hasError('required') ? 'Password cannot be blank' :
      this.password.hasError('password') ? 'Not a valid password' :
        '';
  }

  constructor(private loginServiceObj: LoginService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
  }

  /**@method:This method is to call login APi */
  login(): void {
    console.log("loginForm", this.model);
    this.loginServiceObj.login(this.model)
      .subscribe(response => {
        this.response = response;
        console.log("Responses is ", [this.response.access_token]);
        localStorage.setItem('Authorization', this.response.access_token);
        this.router.navigate(['home/']);
      },
        err => {
          console.log("Error is :", [err]);
        }
      );
  }



signUp(){
  this.router.navigate(['/signup']);
}

/*forgot(){
  this.router.navigate(['/forgotpassword']);
}*/


/**@method:This method is to open forgot password dialog */
OpenforgotDialog(){
  this.dialog.open(ForgotpasswordComponent, {

    width: '550px',
    height: '350px'
  });
};

}
