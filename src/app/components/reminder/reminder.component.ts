import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  public notes;
  public view;

  wrap: string = "wrap"
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;

  reminder = { reminder: 1 };


  constructor(private noteServiceObj: NoteService, private viewServiceObj: ViewService) {
    this.viewServiceObj.getView()
      .subscribe(res => {
        this.view = res;
        this.direction = this.view.data;
        this.layout = this.direction + " " + this.wrap;
      });


}

  ngOnInit() {
    if(this.noteServiceObj.notes.length == 0){
      this.noteServiceObj.fetchNotes()
      .subscribe(res => {
        this.notes = res;
        this.noteServiceObj.notes = this.notes;
      });
    } else {
      this.notes = this.noteServiceObj.notes;
    }
    
  }
}
