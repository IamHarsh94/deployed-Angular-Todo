
/**
* @author: SANA SHAIKh
* @since: 6/06/2018
* @description: This is Login service which calls http services
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';


@Injectable()
export class UpdatenoteService {

  constructor(private httpserviceObj: HttpService) { }

    updateNote(note):any{
      return this.httpserviceObj.putService('notes/updatenote',note); 
    }     
}
