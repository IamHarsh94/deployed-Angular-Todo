/**
* @author: SANA SHAIKh
* @since: 6/06/2018
* @description: This is Routing file contains all the routes
*/

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { NoteComponent } from './components/note/note.component';
import { LabelComponent } from './components/label/label.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { LabelnotesComponent } from './components/labelnotes/labelnotes.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: NoteComponent },
      // { path: 'addlabel', component: LabelComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'trash', component: TrashComponent },
      { path: 'reminder', component: ReminderComponent },
      { path: 'label/:labelName', component: LabelnotesComponent },
      { path: 'search', component: SearchComponent}
    ]
  },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: SigninComponent},
  { path: 'forgotpassword', component: ForgotpasswordComponent},
  { path: 'resetpassword', component: ResetpasswordComponent }
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],

  declarations: []
})
export class AppRoutingModule { }
