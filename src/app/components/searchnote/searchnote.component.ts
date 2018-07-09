import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { LabelService } from '../../services/label.service';
import { NoteTemplateService } from '../../services/note-template.service';
import { MatDialog } from '@angular/material';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-searchnote',
  templateUrl: './searchnote.component.html',
  styleUrls: ['./searchnote.component.css']
})
export class SearchnoteComponent implements OnInit {

 
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
    this.labels = this.labelService.allLabels;

    console.log("Note Template Layout :", this.layout);

    if (this.note.isPin) {
      this.pin = "/assets/icons/unpin.svg";

    }
    else {
      this.pin = "/assets/icons/pin.svg";
    }


  }
  showform1() {
    this.form1 = true;
    this.form2 = false;
  }
  showform2() {
    this.form1 = false;
    this.form2 = true;
  }
  hideAll() {
    this.form1 = false;
    this.form2 = false;
  }

  removeReminder($event, note) {
    console.log(note)
    note.notePreferences.remainder = undefined;
    this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  setColor(note, color) {
    console.log("Selected color and noteid:", [color, note]);
    this.selectedcolor = color;
    note.notePreferences.color = color;
    this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  pinNote(note) {
    note.notePreferences.pin = !note.notePreferences.pin;
    this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  archive(note) {
    if (note.notePreferences.status == 'ARCHIVE') {
      note.notePreferences.status = 'NONE'
      this.noteServiceObj.updateArchiveStatus(note.notePreferences.notePreId, "NONE");
    } else {
      note.notePreferences.status = 'ARCHIVE'
      this.noteServiceObj.updateArchiveStatus(note.notePreferences.notePreId, "ARCHIVE");
    }

    //this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  trash(note) {
    this.noteServiceObj.updateTrashStatus(note.note.noteId, "TRASH");
  }
  openCollab(note) {
    this.dialog.open(CollaboratorComponent, {
      data: note,
      width: '600px'
    });
    //this.noteServiceObj.OpenDailogComponent(note);
  }

  setToday(note) {
    console.log("Today", note.notePreferences.remainder);
    var today = new Date();
    today.setHours(20);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
    //console.log("note.notePreferences",note.notePreferences);
    this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  setTomorrow(note) {
    console.log("Tomorrow", note);

    var today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
    this.noteServiceObj.updateNotePref(note.notePreferences);
  }

  setNextweek(note) {
    console.log("Next week", note);

    var today = new Date();
    today.setDate(today.getDate() + 6);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
    this.noteServiceObj.updateNotePref(note.notePreferences)
  }

  pickDateTime(note) {
    console.log("note", note);
    this.noteServiceObj.updateNotePref(note.notePreferences)
    this.form1 = false;
    this.form2 = false;
  }

  OpenUpdateComponent(note) {
    console.log("update", note);
    var obj = { 'note': note, 'labels': this.labelService.allLabels };

    this.dialog.open(UpdatenoteComponent, {
      data: obj,
      width: '600px',
      panelClass: 'custom-dialog-container'
    });
    //this.noteServiceObj.OpenUpdateComponent(note, this.labelService.allLabels);

  }

  addOrRemoveLabel($event, note, label) {
    console.log($event.checked)
    if ($event.checked) {
      note.notePreferences.labels.push(label);
    } else {
      note.notePreferences.labels.splice(this.note.notePreferences.labels.indexOf(label), 1);
      //note.notePreferences.labels.remove(label);
    }

    this.noteServiceObj.addLabelToNote(label.labelId, note.note.noteId);
  }

  copy(note) {
    note.note.noteId = 0;
    note.notePreferences.notePreId = 0;
    this.noteServiceObj.createNotes(note).subscribe(res => {
      console.log(res);
    });
  }

  imageUpload($event, note) {
    this.noteServiceObj.imageUpload(note, $event.target.files[0]).subscribe(res => {
      note.note.imageUrl = res.responseMessage;
    });

  }

  triggerUpload(note) {
    document.getElementById('note-' + note.note.noteId).click();
  }


}
export class DatepickerMinMaxExample {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
}