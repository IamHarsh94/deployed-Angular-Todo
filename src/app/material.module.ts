/**Purpose:This is material module contains all APIS's needed to implement different
 * modules i.e. registrationForm,loginForm,toolBar,navBar
 * 
 * @author: SANA SHAIKh
 * @since: 9/April/2018
 */

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from './components/label/label.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material';

@NgModule(
    {
        imports:[
            FormsModule,
            FlexLayoutModule,
            MatButtonModule,
            MatToolbarModule,
            MatInputModule,
            MatIconModule,
            MatCardModule,
            MatFormFieldModule,
            MatStepperModule,
            MatTabsModule,
            MatMenuModule,
            MatSidenavModule,
            MatDialogModule,
            MatSelectModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatChipsModule,
            MatCheckboxModule,
            MatRadioModule,
            ReactiveFormsModule,
            MatDividerModule
        ],
            
        exports:[
            FormsModule,
            FlexLayoutModule,
            MatButtonModule,
            MatToolbarModule,
            MatCardModule,
            MatInputModule, 
            MatIconModule, 
            MatFormFieldModule,
            MatStepperModule,
            MatTabsModule,
            MatMenuModule,
            MatSidenavModule,
            MatDialogModule,
            MatSelectModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatChipsModule,
            MatCheckboxModule,
            MatRadioModule,
            ReactiveFormsModule,
            MatTooltipModule,
            MatDividerModule    
    ],
    }
)

export class MaterialModule{}
