import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePassword } from './table-passwords/table-passwords';
import {CreateCredentialView} from './create-credential/create-credential';

const routes: Routes = [
  {path: '', component: TablePassword},
  {path: 'create-credential-view', component: CreateCredentialView}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
