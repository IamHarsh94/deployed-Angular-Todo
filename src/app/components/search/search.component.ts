import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.searchedNotes = this.noteService.searchedNotes;

    this.subScription = this.noteService.searchChange.subscribe(res => {
      this.searchedNotes = res;
    })
  }

  searchedNotes = [];

  subScription: Subscription;


  ngOnDestroy() {
     this.subScription.unsubscribe();
   }


}
