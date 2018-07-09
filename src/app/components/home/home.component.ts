import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { UserResponse } from '../../model/userresponse';
import { NoteService } from '../../services/note.service';
import { LabelComponent } from '../label/label.component';
import { ViewService } from '../../services/view.service';
import { LabelService } from '../../services/label.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ViewService]
})
export class HomeComponent implements OnInit, AfterViewInit {

  labelarray: any = [];
  labels: any;
  grid: boolean = false;
  list: boolean = true;
  search: boolean = false;
  searchicon: boolean = true;
  searchcolor: boolean = false;
appMenu:boolean=false;



  public res;
  
  text: string;

  screenWidth: number;
  labeldata: any[];
  model: any = {};
  name: string;
  email: string;
  user: UserResponse[];
  searchForm: FormGroup;
  inputFormControl: FormControl;
  logedUser : any={};
 
  reminder = '/assets/icons/remind.png';
  crossSvg = '/assets/icons/cross.svg';
  title = "Google Keep";
  titlesmall = "Keep";
  public headerTitle : any={};
  constructor(private dialog: MatDialog,
    private activatedroute: ActivatedRoute,
    private httpServiceObject: HttpService,
    private router: Router,
    private noteServiceObj: NoteService,
    private viewServiceObj: ViewService,
    private builder: FormBuilder,
    private labelService: LabelService,
    private elementRef: ElementRef, private userService: UserService) {
     

    this.inputFormControl = new FormControl();
    this.searchForm = this.builder.group({
      inputFormControl: this.inputFormControl
    });


    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    }
  }

  ngOnInit() {
    var token = localStorage.getItem('Authorization');
    if (token == null || token == undefined) {
      this.router.navigate(['/login']);
    } else {
      this.getLabel();
    }
    this.loggedUser();
  }

  clearSearchText(){
    this.text = '';
  }
  dynamicName() : string{
    var headerTitle ="";
    if(this.router.url=='/home'){
            headerTitle = 'Fundoo Notes';    
    }
    if(this.router.url=='/home/trash'){
        headerTitle = 'Trash';
    }
    if(this.router.url=='/home/archive'){
      headerTitle = 'Archive';
    }
    if(this.router.url=='/home/reminder'){
      headerTitle = 'Reminder';
    }
    return headerTitle;
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgba(232,232,232,1)';
 }

  /**@method: This method is for getting the logged user */
   loggedUser() {
     this.userService.getLoggedUser().subscribe(response => {
       this.logedUser =  response;
       this.userService.user = response;
     });
   }

  /**@method: This method is for logout */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  notify(): void {
    alert("No notification");
  };


  changeView() {
    if (this.list == true) {

      this.grid = true;
      this.list = false;
    }
    else {
      this.list = true;
      this.grid = false;
    }

    this.viewServiceObj.gridview()


  }

  viewgrid() {
    //this.noteServiceObj.changeView();
    this.grid = true;
    this.list = false;
  }

  viewsearch() {

    this.search = true;
    this.searchicon = false;
  }

  searchtext() {
    if (this.searchcolor)
      this.searchcolor = false;
    else
      this.searchcolor = true;
  }

  searchNotes() {
    console.log('text: ', this.text)
    this.noteServiceObj.search(this.text);
  }

  addLabel() {

    let dialog = this.dialog.open(LabelComponent,
      {
        data: this.labels
      });

    dialog.afterClosed()
      .subscribe(res => {
        this.labeldata = res;
        this.getLabel();
      });

  }

  getLabel() {
    this.labelService.getLabel("notes/label/getlabels")
      .subscribe(res => {
        this.res = res;
        this.labels = this.res;
        this.labelService.allLabels = this.labels;
      },
        err => {
          console.log("Labels error is :", err);
        });
  }

  triggerImageUpload() {
    document.getElementById('image-upload-button').click();
  }

  profileImageUpload($event) {
    this.userService.imageUpload($event.target.files[0]).subscribe(res => {
    });
  }



  showProfile()
  {
    this.appMenu=true;
  }






}
