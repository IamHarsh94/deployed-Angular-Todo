
/**
* @author: SANA SHAIKh
* @since: 6/06/2018
* @description: This is Login service which calls http services
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { NoteService } from './note.service';
import { Subject } from 'rxjs';


@Injectable()
export class LabelService {

    public allLabels = [];

    public labelsEmmiter = new Subject<any>();

    public colors: string[][] = [["white", "rgb(255, 138, 128)", "rgb(255, 209, 128)", "rgb(255, 255, 141)"],
    ["rgb(204, 255, 144)", "rgb(167, 255, 235)", "rgb(128, 216, 255)", "rgb(130, 177, 255)"],
    ["rgb(179, 136, 255)", "rgb(248, 187, 208)", "rgb(215, 204, 200)", "rgb(207, 216, 220)"]];
    
    public selectedcolor: string = "white";

  constructor(
      private httpserviceObj: HttpService,
       private noteservice : NoteService   
    ) { }

    addLabel(label):any{
        return this.httpserviceObj.addLabel('notes/label/save',label); 
    }

    editLabel(label):any{
        return this.httpserviceObj.renameLabel('notes/label/renamelabel',label); 
    }

    deleteLabel(label):any{
        return this.httpserviceObj.deleteNoteService('notes/label/deletelabel/'+label.labelId);
    }

    getLabel(url)
    {
      return this.httpserviceObj.getLabel(url);
    }
}
