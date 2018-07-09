import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdatenoteService } from '../../services/updatenote.service';
import { NoteService } from '../../services/note.service';
import { HttpService } from '../../services/http.service';
import { LabelService } from '../../services/label.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.css']
})
export class UpdatenoteComponent implements OnInit {

  public note;
  public colors: string[][];

  public selectedcolor: string;


  form1: boolean;
  form2: boolean;

  archived: String;

  labels = [];

  constructor(
    private UpdatenoteService: UpdatenoteService,
    private labelService: LabelService,
    private httpService: HttpService,
    private noteService: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public MatRef: MatDialogRef<UpdatenoteComponent>
  ) {
    this.note = data.note;
    this.labels = data.labels;
    console.log(this.note)
    console.log('labels: ', this.labels)
    this.selectedcolor = this.note.notePreferences.color;
  }

  ngOnInit() {

    this.colors = this.labelService.colors;
    this.selectedcolor = this.labelService.selectedcolor;
    document.getElementById('update-title').innerHTML = this.note.note.title;
    document.getElementById('update-description').innerHTML = this.note.note.body;

    if (this.note.notePreferences.status == 'ARCHIVE') {
      this.archived = 'unarchive';
    } else {
      this.archived = 'archive';
    }

  }

  updateNote() {
    this.note.note.title = document.getElementById("update-title").innerHTML;
    this.note.note.body = document.getElementById("update-description").innerHTML;

    console.log("des", this.note.note);

    this.UpdatenoteService.updateNote(this.note.note).subscribe(res => {
      console.log("Update note res", res);
    });

    this.MatRef.close();

  }

  removeReminder($event, note){
    console.log(note)
    note.notePreferences.remainder = undefined;
    this.noteService.updateNotePref(note.notePreferences);
  }


  pinNote(note) {
    note.notePreferences.pin = !note.notePreferences.pin;
    this.noteService.updateNotePref(note.notePreferences);
  }

  copy(note) {
    note.note.noteId = 0;
    note.notePreferences.notePreId = 0;
    this.noteService.createNotes(note).subscribe(res => {
      console.log(res);
    });
  }

  showform1() {
    this.form1 = true;
    this.form2 = false;
  }
  showform2() {
    this.form1 = false;
    this.form2 = true;
  }

  setColor(note, color) {
    console.log("Selected color and noteid:", [color, note]);
    this.selectedcolor = color;
    note.notePreferences.color = color;
    this.noteService.updateNotePref(note.notePreferences);
  }

  archive(note) {
    if (note.notePreferences.status == "ARCHIVE") {
      note.notePreferences.status = "NONE";
      this.archived = 'archive';
      this.noteService.updateArchiveStatus(note.notePreferences.notePreId, "NONE");
    } else {
      note.notePreferences.status = "ARCHIVE";
      this.archived = 'unarchive';
      this.noteService.updateArchiveStatus(note.notePreferences.notePreId, "ARCHIVE");
    }
  }

  trash(note) {
    this.noteService.updateTrashStatus(note.note.noteId, "TRASH");
  }

  checkLabel(note, label) {
    var isLabeled = false;
    note.notePreferences.labels.forEach(noteLabel => {
      if (noteLabel.name == label.name) {
        isLabeled = true;
      }
    });
    return isLabeled;
  }

  addOrRemoveLabel($event, note, label) {
    console.log($event.checked)
    if ($event.checked) {
      note.notePreferences.labels.push(label);
    } else {
      note.notePreferences.labels.splice(this.note.notePreferences.labels.indexOf(label), 1);
      //note.notePreferences.labels.remove(label);
    }

    this.noteService.addLabelToNote(label.labelId, note.note.noteId);
  }


  setToday(note) {
    console.log("Today", note.notePreferences.remainder);
    var today = new Date();
    today.setHours(20);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
    //console.log("note.notePreferences",note.notePreferences);
    this.noteService.updateNotePref(note.notePreferences);
  }

  setTomorrow(note) {
    console.log("Tomorrow", note);
    var today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
    this.noteService.updateNotePref(note.notePreferences);
  }

  setNextweek(note) {
    console.log("Next week", note);
    var today = new Date();
    today.setDate(today.getDate() + 6);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.notePreferences.remainder = today;
    this.noteService.updateNotePref(note.notePreferences)
  }

  pickDateTime(note) {
    console.log("note", note);
    this.noteService.updateNotePref(note.notePreferences)
    this.form1 = false;
    this.form2 = false;
  }

  imageUpload($event, note) {
    this.noteService.imageUpload(note, $event.target.files[0]).subscribe(res => {
      note.note.imageUrl = res.responseMessage;
    });
  }

  triggerUpload(note) {
    document.getElementById('update-image').click();
  }

  deleteImage(note) {
    this.noteService.deleteImage(note).subscribe(res => {
      console.log(res);
      
    });
    note.note.imageUrl = undefined;
  }


  // updateNotePref(notePreferences) {
  //   this.httpService.putService('notes/updatenotepref', notePreferences).subscribe(res => {
  //     console.log(res);
  //   });
  // }

  // updateArchiveStatus(prefId, status) {
  //   this.httpService.putServiceArchives('notes/archiveorunarchive', prefId, status).subscribe(res => {
  //     console.log(res);
  //   });
  // }

  // updateTrashStatus(noteId, status) {
  //   this.httpService.putServiceTrash('notes/trashorrestore', noteId, status).subscribe(res => {
  //     console.log(res);
  //   });
  // }

  // addLabelToNote(labelId, noteId) {
  //   this.httpService.addOrRemoveLabel('notes/label/addorremovelabelfromnote', noteId, labelId).subscribe(res => {
  //     console.log(res);
  //   });
  // }

  // createNotes(note): Observable<any> {
  //   return this.httpService.postService("notes/save", note);
  // }


}
