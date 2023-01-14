import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Password } from './create-credential/Password';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(){

  }

  loadCrendentials(): Observable<Password[]>{
    const creds = electron.ipcRenderer.sendSync('storage:fetchAll')
    let res: Password[] = [];

    creds.forEach((cred:any) => {
      const pCred: Password = {
        id: cred.id,
        title: cred.title,
        username: cred.username,
        password: cred.password,
        url: cred.url,
        tag: cred.tag
      }
      res.push(pCred);
    })

    return of(res);
  }
}
