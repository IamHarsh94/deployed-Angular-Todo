import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { LabelService } from '../../services/label.service';
import { NoteTemplateService } from '../../services/note-template.service';
import { MatDialog } from '@angular/material';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-deletenote',
  templateUrl: './deletenote.component.html',
  styleUrls: ['./deletenote.component.css']
})
export class DeletenoteComponent implements OnInit {

  @Input() note;
  @Input() layout;

  pin: string;
  form1: boolean;
  form2: boolean;
  clock = "assets/icons/clock.svg";
  backarrow = "assets/icons/back.svg";

  labels = [];
  //model : 
  public colors: string[][] = [["white", "rgb(255, 138, 128)", "rgb(255, 209, 128)", "rgb(255, 255, 141)"],
  ["rgb(204, 255, 144)", "rgb(167, 255, 235)", "rgb(128, 216, 255)", "rgb(130, 177, 255)"],
  ["rgb(179, 136, 255)", "rgb(248, 187, 208)", "rgb(215, 204, 200)", "rgb(207, 216, 220)"]];

  public selectedcolor: string = "white";


  constructor(private dialog: MatDialog, private noteServiceObj: NoteService, private labelService: LabelService, private notetemplateService: NoteTemplateService) { }

  ngOnInit() {
    console.log(this.note);
    this.labels = this.labelService.allLabels;
  }


  restore(note) {
    note.notePreferences.status = 'NONE';
    this.noteServiceObj.updateTrashStatus(note.note.noteId, "NONE");
  }

  deleteForever(note) {
    this.noteServiceObj.deleteNote(note.note.noteId).subscribe(res => {
      this.noteServiceObj.notes.splice(this.noteServiceObj.notes.indexOf(note), 1);
    });
  }

}
export class DatepickerMinMaxExample {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
}