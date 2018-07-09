import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { ViewService } from '../../services/view.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-labelnotes',
  templateUrl: './labelnotes.component.html',
  styleUrls: ['./labelnotes.component.css']
})
export class LabelnotesComponent implements OnInit {

  public res;
  public notes;
  public view;

  public labelName;

  wrap: string = "wrap"
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;

  trash = { isTrash: 1 };


  constructor(private noteServiceObj: NoteService, private viewServiceObj: ViewService, private route: ActivatedRoute) {
    this.viewServiceObj.getView()
      .subscribe(res => {
        this.view = res;
        this.direction = this.view.data;
        this.layout = this.direction + " " + this.wrap;
      });
      this.route.params.subscribe(params => {
        console.log(params);
        this.labelName = params.labelName;
      })

}

  ngOnInit() {
    if(this.noteServiceObj.notes.length == 0){
      this.noteServiceObj.fetchNotes()
      .subscribe(res => {
        this.res = res;
        this.notes = this.res;
        this.noteServiceObj.notes = this.notes;
      });
    } else {
      this.notes = this.noteServiceObj.notes;
    }
    
  }

}
