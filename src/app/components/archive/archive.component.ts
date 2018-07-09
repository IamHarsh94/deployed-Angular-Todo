import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  public res;
  public notes;
  public view;
  directioin: string = "row";
  wrap: string = "wrap";
  layout: string = this.directioin + " " + this.wrap;
  archive = { isArchive: 1 };



  constructor(private noteServiceObj: NoteService, private viewServiceObj: ViewService) {

    this.viewServiceObj.getView()
      .subscribe(res =>
      {
        this.view = res;
        this.directioin = this.view.data;
        this.layout = this.directioin + " " + this.wrap;
      });
  }

  ngOnInit() {

    if(this.noteServiceObj.notes.length == 0){
      this.noteServiceObj.fetchNotes()
      .subscribe(res => {
        this.res = res;
        this.notes = this.res;
        this.noteServiceObj.notes = res;
      },
      err => {
        console.log("Error is :", [err]);
      }
      );
    } else {
      this.notes = this.noteServiceObj.notes;
    }

  }




}
