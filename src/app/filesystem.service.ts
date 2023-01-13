import { Injectable } from '@angular/core';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(){
    electron.ipcRenderer.on('openFileResponse', (event:string, data:string) => {
      console.log("got something back!")
      console.log(data);
    })
  }

  openFile(){
    electron.ipcRenderer.send('openFile')
  }
}
