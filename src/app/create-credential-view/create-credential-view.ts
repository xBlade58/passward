import {Component} from '@angular/core';
import { NgForm,  } from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
//import { FileSystemService } from '../filesystem.service'
const electron = (<any>window).require('electron');

@Component({
  selector: 'create-credential-view',
  styleUrls: ['create-credential-view.css'],
  templateUrl: 'create-credential-view.html',
})
export class CreateCredentialView {
  hide =true;
  /*
  constructor(private fs_service: FileSystemService){

  }*/

  save(form: NgForm){
    const title = form.value.title;
    const username = form.value.username;
    const password = form.value.password;
    const url = form.value.url;
    const tag = form.value.tag;

    var obj = {
      id: uuidv4(),
      title: title,
      username: username,
      password: password,
      url: url,
      tag: tag
    }
    electron.ipcRenderer.send('savePassword', obj);
  }


}
