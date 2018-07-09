import { AppComponent } from './app.component';
import { AppRoutingModule }from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPassService } from './services/forgotpass.service';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { LoginService } from './services/login.service';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { NoteService } from './services/note.service';
import { RouterModule } from '@angular/router';
import { RegisterService } from './services/register.service';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { NoteComponent } from './components/note/note.component';
import { LabelComponent } from './components/label/label.component';
import { NotetemplateComponent } from './components/notetemplate/notetemplate.component';
import { FilterPipe } from './pipes/filtter.pipe';
import { ArchiveComponent } from './components/archive/archive.component';
import { ArchivePipe } from './pipes/archive.pipe';
import { TrashComponent } from './components/trash/trash.component';
import { TrashPipe } from './pipes/trash.pipe';
import {OwlDateTimeModule , OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { UpdatenoteComponent } from './components/updatenote/updatenote.component'; 
import { UpdatenoteService } from './services/updatenote.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LabelService } from './services/label.service';
import { NoteTemplateService } from './services/note-template.service';
import { ReminderComponent } from './components/reminder/reminder.component';
import { LabelnotesComponent } from './components/labelnotes/labelnotes.component'
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import {UserService} from './services/user.service';
import { SearchComponent } from './components/search/search.component';
import { SearchnoteComponent } from './components/searchnote/searchnote.component';
import { DeletenoteComponent } from './components/deletenote/deletenote.component';
import { ColorToolsDirective } from './components/color-tools.directive'
import { ClickOutsideModule } from 'ng4-click-outside';
import { DatePipe } from '@angular/common';
import { DatefilterPipe } from './pipes/datefilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    NoteComponent,
    LabelComponent,
    NotetemplateComponent,
    FilterPipe,
    ArchiveComponent,
    ArchivePipe,
    TrashComponent,
    TrashPipe,
    UpdatenoteComponent,
    ReminderComponent,
    LabelnotesComponent,
    CollaboratorComponent,
    SearchComponent,
    SearchnoteComponent,
    DeletenoteComponent,
    ColorToolsDirective,
    DatefilterPipe
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    
  ],

  providers: [ForgotPassService,
                HttpService,
                  LoginService,
                  DatePipe,
                  ClickOutsideModule,
                    NoteService,
                    UserService,
                    LabelService,
                      RegisterService,
                      UpdatenoteService,
                      NoteTemplateService,
                    {provide:MAT_DIALOG_DATA,useValue:{}}],
  
  bootstrap: [AppComponent],
  entryComponents: [LabelComponent,UpdatenoteComponent,CollaboratorComponent],
  
})
export class AppModule { }
