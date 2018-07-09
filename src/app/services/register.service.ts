/**
* @author: SANA SHAIKh
* @since: 6/06/2018
* @description: This is Register service which calls http services
*/

import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class RegisterService {

  constructor(private httpServiceObj: HttpService) { }

  register(model){
    return this.httpServiceObj.registerService('user/save', model);
  }

  uploadImage(model){
    return this.httpServiceObj.postService('uploadprofile', model)
  }
}
