/**
* @author: SANA SHAIKh
* @since: 6/June/2018
* @description: This is reset password component contains method to call reset password api   
*/
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResetpasswordComponent implements OnInit {

  model : any= {};

  password = new FormControl('', [Validators.required]);
  getErrorMessage1() {
    return this.password.hasError('required') ? 'Password cannot be blank' :
        this.password.hasError('password') ? 'Not a valid password' :
            '';
  }

  constructor(
      private resetSerObject: HttpService,
      private router: Router) { }

  ngOnInit() {
    console.log(window.location.search);
  }

  /**@method: This method is set new password */
  reset(){
    
    console.log(this.model);
    var token = window.location.search;

    this.resetSerObject.postService(token,this.model)
                        .subscribe(data=>{
                          if(data.status==200){
                            this.router.navigate(['login/']);
                          }
                          console.log(data)});
  }
}
