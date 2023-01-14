import {Component, Output, EventEmitter, ChangeDetectorRef, ElementRef, ViewChild} from '@angular/core';
import { NgForm,  } from '@angular/forms';
import { Router } from '@angular/router';
import {v4 as uuidv4} from 'uuid';
import { Password } from './Password';

//import { FileSystemService } from '../filesystem.service'
const electron =(<any>window).require('electron');

@Component({
  selector: 'create-credential',
  styleUrls: ['create-credential.css'],
  templateUrl: 'create-credential.html',
})
export class CreateCredential {
  hide=true;
  loading=false;

  @Output() newPasswordEvent = new EventEmitter<Password>();
  @Output() navToMainEvent = new EventEmitter();

  @ViewChild('falseDiv')
  falseDiv!: ElementRef<HTMLElement>;

  triggerFalseClick() {
    console.log("clicking")
    let el: HTMLElement = this.falseDiv.nativeElement;
    el.click();
  }

  constructor(private router: Router){
    this.registerListener()
  }

  ngOnDestroy() {
    console.log("I destroyed")
    this.loading= false;
  }

  ngOnInit() {
    console.log("I init")
  }

  async save(form: NgForm){
    const title = form.value.title;
    const username = form.value.username;
    const password = form.value.password;
    const url = form.value.url;
    const tag = form.value.tag;
    const id = uuidv4();

    const data: Password = {
      id: id,
      title: title,
      username: username,
      password: password,
      url: url,
      tag: tag
    }

    var obj = {
      id: id,
      title: title,
      username: username,
      password: password,
      url: url,
      tag: tag
    }
    console.log('Saving...')
    electron.ipcRenderer.send('storage:savePassword', obj);
    this.loading = true;
  }

  cancel(){
    this.router.navigate(['']);
  }

  registerListener(){

    electron.ipcRenderer.on('storage:passwordSaved', () => {
      this.loading = false;
      this.router.navigate([''])
    })
  }

}

