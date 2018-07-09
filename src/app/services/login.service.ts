
/**
* @author: SANA SHAIKh
* @since: 6/06/2018
* @description: This is Login service which calls http services
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';


@Injectable()
export class LoginService {

  constructor(private httpserviceObj: HttpService) { }

  login(model): Observable<any>{
    return this.httpserviceObj.postLoginService('user/oauth/token', model);
  }
}
