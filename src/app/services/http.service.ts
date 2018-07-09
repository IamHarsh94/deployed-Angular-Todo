
/**
* @author: SANA SHAIKh
* @since: 6/06/2018
* @description: This is User service i.e. common Http services contains methods to get,put,post,delete requests 
*/
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserResponse } from '../model/userresponse';
import { NoteModel } from "../model/notemodel";
import { Subject } from 'rxjs';
import { log } from "util";

@Injectable()
export class HttpService {

  private URL = environment.base_url;
  private localhost_url = environment.base_url;
  private LoginURL = environment.login_url;

  private subject = new Subject<any>();
  private subject1 = new Subject<any>();
  //token: string;

  public note: Array<any> = [
    { id: 1, title: "demo", description: "demo", colorcode: "rgb(255, 138, 128)", isPin: 1, isArchive: 1, isTrash: 1 },
    { id: 2, title: "demo1", description: "demo1", colorcode: "rgb(255, 209, 128)", isPin: 0, isArchive: 1, isTrash: 1 },
    { id: 3, title: "demo2", description: "demo2", colorcode: "rgb(255, 255, 141)", isPin: 1, isArchive: 0, isTrash: 0 },
    { id: 4, title: "demo3", description: "demo3", colorcode: "rgb(204, 255, 144)", isPin: 0, isArchive: 1, isTrash: 1 },
    { id: 5, title: "demo4", description: "demo4", colorcode: "rgb(167, 255, 235)", isPin: 0, isArchive: 0, isTrash: 0 }
  ];

  public label: Array<any> = [
    { id: 1, label: "Java" },
    { id: 2, label: ".Net" },
    { id: 3, label: ".Net Core" },
    { id: 4, label: "Angular JS" },
    { id: 5, label: "Angular 5" },
  ];



  httpOptions = {
    
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };




  httpLoginOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ZnVuZG9vbm90ZTpZbjJramliZGRGQVd0blBKMkFGbEw4V1htb2hKTUN2aWdRZ2dhRXlwYTVF'
    })
  };




  password: string = "password";

  constructor(private http: HttpClient) {

    //this.token = localStorage.getItem('Authorization');
  }

  httpHomeOptions = {

    headers: new HttpHeaders({
      //'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
    })
  };

  // httpArchivesOptions = {

  //   headers: new HttpHeaders({
  //     'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
  //   })
  // };

  registerService(url, model): Observable<any> {
    var urlpath = this.URL.concat(url);
    return this.http.post<any>(urlpath, model, this.httpOptions);
  }

addCollab(par) : any{

  var urlpath = this.URL.concat('notes/collaborate');
  let httpOptions2 = {
    
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
    }),
   params : par
  };
  return this.http.post<any>(urlpath, {}, httpOptions2);

}

postNoteService(url, model): Observable<any> {
  console.log(url, model);
  var urlpath = this.URL.concat(url);
  console.log(urlpath, model);

  // let data = {
  //   note: {
  //     title: 'demo',
  //     body:'desc'
  //   },
  //   notePreferences:
  //     {
  //       color:'red'
  //     }
  // };
  // let newdata = model[0];
  return this.http.post<any>(urlpath, model, this.httpHomeOptions);
}

  postService(token, model): Observable<any> {

    var path = token.split("=");
   
    var urlpath = this.URL.concat('user/changepassword/'+ path[1]);
    console.log(urlpath, model);
    return this.http.post<any>(urlpath,model);
  }

  forgotPassword(url,par:HttpParams){
    var urlpath = this.URL.concat(url);
    return this.http.post<any>(urlpath,par);
  }

  postLoginService(url, model): Observable<any> {
    console.log(url, model);

    let modeldata = {

      username: model.email,
      password: model.password,
      grant_type: "password"
    }
    let obj = new URLSearchParams();
    obj.set("username", modeldata.username);
    obj.set("password", modeldata.password);
    obj.set("grant_type", modeldata.grant_type);

    var urlpath = this.URL.concat(url);
    return this.http.post<any>(urlpath, obj.toString(), this.httpLoginOptions);
  }

  putService(url, model) {
    console.log('testinggg', url, model);
    var urlpath = this.URL.concat(url);
    console.log(urlpath);
    return this.http.put(urlpath, model, this.httpHomeOptions);
  }

  putServiceArchives(url, prefId, status) {
    var urlpath = this.URL.concat(url);
    console.log(urlpath);
    let par = new HttpParams().set('notePrefId', prefId).set('status', status);
    let httpArchivesOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }),
      params: par
    };


    return this.http.put(urlpath, '', httpArchivesOptions);
  }

  putServiceTrash(url, noteId, status) {
    var urlpath = this.URL.concat(url);
    console.log(urlpath);
    let par = new HttpParams().set('noteId', noteId).set('noteStatus', status);
    let httpTrashOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }),
      params: par
    };


    return this.http.put(urlpath, '', httpTrashOptions);
  }

  getService(url: string, model?: any): Observable<any> {

    let urlpath = this.URL.concat(url);
    return this.http.get<any>(urlpath, this.httpOptions);
}

getUserByEs(par: HttpParams):any{
  
  var urlpath = this.URL.concat('es/search');
 
  let httpOptions2 = {
    
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
    }),
   params : par
  };

  console.log(urlpath);
  return this.http.get<any>(urlpath, httpOptions2);
}


removeCollaborator(url,par:HttpParams) : any{
  
  var urlpath = this.URL.concat(url);
  
   let httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
    }),
    params : par
  };
  return this.http.delete<any>(urlpath, httpOptions2);
}

 getUser(url): Observable < UserResponse > {
   let urlpath = this.URL.concat(url);
   return this.http.get<UserResponse>(urlpath, this.httpOptions);
 }

getUserById(url,par:HttpParams):any {
  var urlpath = this.URL.concat(url);
  let httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
    }),
   params : par
  };
  return this.http.get<any>(urlpath, httpOptions2)
}

 getLoggedUser(url):any{
  var urlpath = this.URL.concat(url);
  let httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
    })
  };
   return this.http.get<UserResponse>(urlpath,httpOptions2);   
 }   

  deleteNoteService(url) {
    var urlpath = this.URL.concat(url);
    return this.http.delete(urlpath, this.httpHomeOptions);
  }

  deleteImage(url, noteId){
    var urlpath = this.URL.concat(url);

    let par = new HttpParams().set('noteId', noteId);
    let httpImageOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }),
      params: par
    };

    return this.http.delete<any>(urlpath, httpImageOptions);
  }


  fetchNoteService(url) {
    let path = this.URL.concat(url);
    console.log("complete url", path);
    return this.http.get(path, this.httpHomeOptions);

    // this.subject.next({ data: this.note });
    // return this.subject.asObservable();
  }

  fetchNoteServiceByStatus(url, status) {
    let path = this.URL.concat(url);
    console.log("complete url", path);
    let par = new HttpParams().set('noteStatus', status);
    let httpNoteOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }),
      params: par
    };



    return this.http.get(path, httpNoteOptions);

    // this.subject.next({ data: this.note });
    // return this.subject.asObservable();
  }

  setColor(selectedColor, noteId) {
    this.note[noteId - 1].colorcode = selectedColor;
    console.log(this.note);
  }


  updateNoteData(note) {
    console.log("Notes response on note service is:", [note]);

    this.note[note.id - 1].isPin = note.isPin;
    this.note[note.id - 1].isArchive = note.isArchive;
    this.note[note.id - 1].isTrash = note.isTrash;

    console.log("Notes response on note service is:", [note]);

  }

  addLabel(url, model) {
    var urlpath = this.URL.concat(url);
    console.log(urlpath);
    return this.http.post(urlpath, model, this.httpHomeOptions);
  }

  renameLabel(url, model) {
    var urlpath = this.URL.concat(url);
    console.log(urlpath);
    return this.http.put(urlpath, model, this.httpHomeOptions);
  }


  getLabel(url) {
    let path = this.URL.concat(url);
    return this.http.get<any>(path, this.httpHomeOptions);


    //setTimeout(() => {
    //  this.subject1.next({ data: this.label });
    //}, 100);

    //return this.subject1.asObservable();
    //return this.label;
  }

  addOrRemoveLabel(url, noteId, labelId): Observable<any> {
    var urlpath = this.URL.concat(url);

    let par = new HttpParams().set('noteId', noteId).set('labelId', labelId);
    let httpLabelOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }),
      params: par
    };

    return this.http.post<any>(urlpath, '', httpLabelOptions);

  }

  imgaeUpload(url, noteId, file) {
    var urlpath = this.URL.concat(url);
    let par = new HttpParams().set('noteId', noteId);

    let httpLabelOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }),
      params: par
    };

    var fd = new FormData();
    fd.append('image', file);

    return this.http.post<any>(urlpath, fd, httpLabelOptions);
  }

  searchNotes(url, text, index) {
    var urlpath = this.URL.concat(url);
    let par = new HttpParams().set('text', text).set('index', index);

    let httpSearchOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }),
      params: par
    };


    return this.http.get<any>(urlpath, httpSearchOptions);
  }

  searchByParams(url, obj, index) {
    var urlpath = this.URL.concat(url);
    let par = new HttpParams().set('index', index);

    let httpSearchOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }),
      params: par
    };


    return this.http.post<any>(urlpath, obj, httpSearchOptions);
  }

  userImageUpload(url,file) {
    var urlpath = this.URL.concat(url);
    var fd = new FormData();
    fd.append('file', file);
    
    let httpLabelOptions = {

      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }) 
    };
    return this.http.post<any>(urlpath,fd,httpLabelOptions);
  }
}
