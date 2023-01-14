import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';

import { TablePassword } from './table-passwords/table-passwords';
import { FormsModule } from '@angular/forms';
import { EditCredential } from './edit-credential/edit-credential';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatSortModule} from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule }  from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon'
import { CreateCredentialView } from './create-credential/create-credential';

@NgModule({
  declarations: [
    AppComponent, TablePassword, CreateCredentialView, EditCredential
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
