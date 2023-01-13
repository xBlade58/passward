import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailView } from './detail-view/detail-view';
import { TablePassword } from './table-passwords/table-passwords';
import {CreateCredentialView} from './create-credential-view/create-credential-view';

const routes: Routes = [
  {path: '', component: TablePassword},
  {path: 'detail-view', component: DetailView},
  {path: 'create-credential-view', component: CreateCredentialView}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
