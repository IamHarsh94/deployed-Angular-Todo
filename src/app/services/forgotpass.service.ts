/**
* @author: SANA SHAIKh
* @since: 6/06/2018
* @description: This is Forgot password service which calls http service
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ForgotPassService {

  constructor(private httpserviceObj: HttpService) { }

  forgotPassword(model): Observable<any>{
    let par = new HttpParams().set('email', model.email);
    return this.httpserviceObj.forgotPassword('user/forgotpassword', par);
  }
}