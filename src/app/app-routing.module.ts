import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewCredentials } from './overview-credentials/overview-credentials';
import {CreateCredential} from './create-credential/create-credential';
import { EditCredential } from './edit-credential/edit-credential';

const routes: Routes = [
  {path: '', component: OverviewCredentials},
  {path: 'create-credential', component: CreateCredential},
  {path: 'edit-credential', component: EditCredential}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
