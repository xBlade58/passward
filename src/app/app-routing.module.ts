import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePassword } from './table-passwords/table-passwords';
import {CreateCredential} from './create-credential/create-credential';
import { EditCredential } from './edit-credential/edit-credential';

const routes: Routes = [
  {path: '', component: TablePassword},
  {path: 'create-credential', component: CreateCredential},
  {path: 'edit-credential', component: EditCredential}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
