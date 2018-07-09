/**
* @author: SANA SHAIKh
* @since: 6/June/2018
* @description: This is forgot password component contains method to call forgot password api 
*/
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { ForgotPassService } from '../../services/forgotpass.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ForgotpasswordComponent implements OnInit {

  model: any = {};

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'Email ID/Username cannot be left blank' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  constructor(private forgotServiceObj: ForgotPassService) { }

  ngOnInit() {
  }


/**@method:This method is to call forgot password Api*/
forgot():void
{
  debugger;
  console.log(this.model);
  this.forgotServiceObj.forgotPassword(this.model)
                        .subscribe(response=>{
        });
}
}
