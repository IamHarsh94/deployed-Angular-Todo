import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpService } from './http.service';
import { NoteModel } from '../model/notemodel';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material"
import { UpdatenoteComponent } from '../components/updatenote/updatenote.component';
import { UserService } from './user.service';
//import { CollaboratorComponent } from '../components/collaborator/collaborator.component';

@Injectable()
export class NoteService {

  status:boolean = true;  
  private viewSubject = new Subject<any>();
  private noteSubject = new Subject<any>();

  public notes = [];
  public isPin :boolean = false;
  public searchedNotes = [];


  constructor( 
      private httpService: HttpService, private userService: UserService
    ) { }

  /**@method: This method is to fetch notes */
  reloadNotes():void{
    var path = "getnotes";
    //debugger;
    this.httpService.getService(path)
                        .toPromise()
                          .then((res)=>{
                            
                            this.noteSubject.next(res);
                          
                            console.log("Notes fetched successfully");
                          });
   }

  changeView(){
    this.status = !this.status;
    this.viewSubject.next(this.status);
  }

  getStatus(){
    return this.viewSubject.asObservable();
  }

  // imageUpload(note, file){
  //   return this.httpService.imgaeUpload('notes/saveimage', note.note.noteId, file);
  // }

  // OpenUpdateComponent(note, allLabels){
  //   var obj = {'note': note, 'labels': allLabels};

  //   this.dialog.open(UpdatenoteComponent, {
  //     data: obj,
  //     width: '600px',
  //   panelClass: 'custom-dialog-container'
  //   });
  // }


  //  OpenDailogComponent(note){
  //    this.dialog.open(CollaboratorComponent, {
  //     data: note,
  //      width: '600px'
  //    });
  //  }

   /**@method: This method is to create notes */
  createNotes(note) :Observable<any>{
    return this.httpService.postNoteService("notes/save", note);
  }

   /**@method: This method is to update notes */
  updateNotes(note):Observable<any>{
    return this.httpService.putService('updatenote',note);
  }

   /**@method: This method is to delete notes */
  deleteNote(noteId): Observable<any>{
    return this.httpService.deleteNoteService('notes/deletenote'+'/' + noteId);
  }

/**
 * @method: This method will fetch the notes
 */
  fetchNotes(): any
  {
    return this.httpService.fetchNoteService("notes/getnotes");
  }

  fetchNotesByStatus(status){
    return this.httpService.fetchNoteServiceByStatus("notes/getnotebystatus", status);
  }

  /**
   * @method: This method will set color on notes
   * @param selectedColor
   * @param noteId
   */
  setColor(selectedColor,noteId)
  {
    this.httpService.setColor(selectedColor, noteId);
  }

  /**
   * @method: This method will update notes status
   * @param note
   */
  updateNoteData(note) {
    this.httpService.updateNoteData(note);
  }

  updateNotePref(notePreferences) {
      this.httpService.putService('notes/updatenotepref', notePreferences).subscribe(res => {
        console.log(res);
      });

  }

  updateArchiveStatus(prefId, status){
    this.httpService.putServiceArchives('notes/archiveorunarchive', prefId, status).subscribe(res => {
      console.log(res);
    });
  }

  updateTrashStatus(noteId, status){
    this.httpService.putServiceTrash('notes/trashorrestore', noteId, status).subscribe(res => {
      console.log(res);
    });
  }

  addLabelToNote(labelId, noteId){
    this.httpService.addOrRemoveLabel('notes/label/addorremovelabelfromnote', noteId, labelId).subscribe(res => {
      console.log(res);
    });
  }

  /**
   * @method: This method will add labels
   * @param model
   */
  addLabel(model)
  {
    
  }

  imageUpload(note, file){
    return this.httpService.imgaeUpload('notes/saveimage', note.note.noteId, file);
  }

  deleteImage(note) {
    return this.httpService.deleteImage('notes/deleteimage', note.note.noteId);
  }

  search(text){
    text = text.trim();
if(text.length > 0){
  this.httpService.searchNotes('es/search', text, 'note').subscribe(res => {
    this.searchedNotes = [];
    if(res.length == 0) {
      this.searchChange.next(this.searchedNotes);
    } else {
      res.forEach(item => {
        var obj = item;
        if(obj.userId == this.userService.user.userId) {
          this.httpService.searchByParams('es/getbyparams', {'noteId': obj.noteId}, 'esnotepreferences').subscribe(res2 => {
            var pref = res2[0];
            this.searchedNotes.push({'note': obj, 'notePreferences': pref});
            this.searchChange.next(this.searchedNotes);
            console.log(this.searchedNotes)
          })
        }

        
      });
    }
  });
}
  }


  searchChange: Subject<any> = new Subject<any>();

}
