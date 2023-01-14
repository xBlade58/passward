import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

const electron =(<any>window).require('electron');


@Component({
  selector: 'edit-credential',
  styleUrls: ['edit-credential.css'],
  templateUrl: 'edit-credential.html',
})
export class EditCredential {
  hide = true;
  loading = false;

  @Input() passId = ''
  @Input() passTitle = ''
  @Output() navToMainEvent = new EventEmitter();


  navToMain(){
    this.navToMainEvent.emit();
  }

  edit(form: NgForm){

  }

  registerListener(){

    electron.ipcRenderer.on('storage:passwordEdited', () => {
      this.navToMain()
    })
  }

}
