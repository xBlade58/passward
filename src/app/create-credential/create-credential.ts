import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Credential } from '../@types/Credential';
import { FileSystemService } from '../filesystem.service';

@Component({
  selector: 'create-credential',
  styleUrls: ['create-credential.css'],
  templateUrl: 'create-credential.html',
})
export class CreateCredential {
  hide=true;
  loading=false;
  currTags: string[] = []
  availableTags: string[] = []
  filteredTags: Observable<string[]>;
  tagCtrl = new FormControl('')
  readonly seperatorKeyCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private router: Router, private fsService: FileSystemService){
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag:string | null) => (tag ? this._filter(tag) : this.availableTags.slice()))
    )
  }

  ngOnDestroy() {
    console.log("Credential-Component destroyed")
    this.loading= false;
  }

  ngOnInit() {
    this.availableTags =  history.state.data.tags
    console.log("Tags: " + this.availableTags)
  }

  async save(form: NgForm){
    
    const newCred: Credential = {
      id: uuidv4(),
      title: form.value.title,
      username: form.value.username,
      password: form.value.password,
      url: form.value.url,
      tags: this.currTags
    }

    this.fsService.saveCredential(newCred).then(() => {
      this.loading = false;
      this.router.navigate(['']);
    })
    this.loading = true;
  }

  cancel(){
    this.router.navigate(['']);
  }

  addTag(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if(value) { this.currTags.push(value)}
    event.chipInput!.clear()
    this.tagCtrl.setValue(null)
  }

  removeTag(tag: string){
    const index = this.currTags.indexOf(tag);
    if(index >= 0) { this.currTags.splice(index, 1)}

  }
  /* may be inlcuded later
  editTag(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    //Remove tag if it no longer has a name
    if(!value) {
      this.removeTag(tag);
    }

    //Edit existing tag
    const index = this.currTags.indexOf(tag);
    if(index >= 0) { 
      this.currTags[index] = value
    }
  }*/
  selected(event: MatAutocompleteSelectedEvent) {
    this.currTags.push(event.option.viewValue);
    if(this.tagInput) this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null)
  }

  private _filter(value:string): string[] {
    console.log("Value to filter: " + value)
    const filterValue = value.toLowerCase()
    return this.availableTags.filter(tag => tag.toLowerCase().includes(filterValue))
  }

 
}

