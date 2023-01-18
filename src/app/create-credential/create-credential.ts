import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Password } from './Password';
import { FileSystemService } from '../filesystem.service';

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

  @ViewChild('falseDiv')
  falseDiv!: ElementRef<HTMLElement>;

  triggerFalseClick() {
    console.log("clicking")
    let el: HTMLElement = this.falseDiv.nativeElement;
    el.click();
  }

  constructor(private router: Router, private fsService: FileSystemService){

  }

  ngOnDestroy() {
    console.log("Credential-Component destroyed")
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
    this.fsService.saveCredential(obj).then(() => {
      this.loading = false;
      this.router.navigate(['']);
    })
    this.loading = true;
  }

  cancel(){
    this.router.navigate(['']);
  }
}

