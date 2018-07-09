/**
* @author: SANA SHAIKh
* @since: 6/June/2018
* @description: This is registration component contains register method  
*/
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Validators} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  model: any = {};
  error: any;
  public field;

  public response;
 crossSvg  = '/assets/icons/cross.svg';

 name = new FormControl('', [Validators.required]);
 getErrorMessage1() {
   return this.name.hasError('required') ? 'Username cannot be left blank' :
       this.name.hasError('name') ? 'Not a valid email' :
           '';
 }

 email = new FormControl('', [Validators.required, Validators.email]);
 getErrorMessage2() {
   return this.email.hasError('required') ? 'Email Id cannot be left blank' :
       this.email.hasError('email') ? 'Not a valid email' :
           '';
 }

 password = new FormControl('', [Validators.required]);
 getErrorMessage3() {
   return this.password.hasError('required') ? 'Password cannot be blank' :
       this.password.hasError('password') ? 'Not a valid password' :
           '';
 }

 mobileNumber = new FormControl('', [Validators.required]);
 getErrorMessage4() {
   return this.mobileNumber.hasError('required') ? 'Mobile number cannot be blank' :
       this.mobileNumber.hasError('mobileNumber') ? 'Not a valid Number' :
           '';
 }

  constructor(private router: Router,
                private registerSericeObj: RegisterService) 
                  { }

  ngOnInit() {
  }

  
 /**@method:This method is to call register Api */
 register():void{
    
  console.log(this.model);
  this.registerSericeObj.register(this.model)
    .subscribe(response =>
    {
      this.response = response;
      if (this.response.status == "200") {

        this.signIn();
      }
      else
      {
        this.router.navigate(['/signup']);
      }
    }, err => {
      
      this.response = err;
      console.log("Error is :", this.response.error.responseMessage);
      console.log("Error Data is :", this.response.error);
      console.log("Field is :", this.response.error.errors[0].field);
      for (var i = 0; i < this.response.error.errors.length; i++)
      {
        this.field = this.response.error.errors[i].field
        this.error = this.response.error.errors[i].defaultMessage
        console.log("Error is :", this.response.error.errors[i].defaultMessage);
      } 
    });
 }

  signIn(){
    this.router.navigate(['/login']);
  }

  
/**@method:This method is to upload a image 
 */
handleFileInput(event) {

  this.model.event= event;
  console.log("Note image->>", event)
  
  this.registerSericeObj.uploadImage(this.model)
                      .subscribe(response=>{
                       console.log("Image uploaded successfully..");
  });
}

cross(){
  this.model=null;
}
}
