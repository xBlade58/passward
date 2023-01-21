import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { map, startWith } from "rxjs/operators";
import { Credential } from "../@types/Credential";
import { FileSystemService } from "../filesystem.service";

@Component({
  selector: 'edit-credential',
  styleUrls: ['edit-credential.css'],
  templateUrl: 'edit-credential.html',
})
export class EditCredential {
  hide = true;
  loading = false;
  editForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    url: new FormControl()
  })

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

  ngOnInit() {
    const data = history.state.data;
    this.currTags = data.tags;
    this.availableTags = data.avTags
    this.editForm.setValue({
      id: data.id,
      title: data.title,
      username: data.username,
      password: "",
      url: data.url
    })
  
    this.fsService.loadPasswordById(data.id).then((pd: string) => {
      this.editForm.patchValue({ password: pd });
    })


  }

  ngonDestroy() {
    console.log("Edit destroeyed")
  }

  cancel(){
    this.router.navigate([''])
  }

  async delete(){
    this.loading = true;
    var toDelteId = history.state.data.id;
    this.fsService.deleteCredentialById(toDelteId).then(()=> {
      this.loading = false;
      this.router.navigate(['']);
    })
  }

  async edit(){
    this.loading = true;
    const editedCred: Credential = {
      id: this.editForm.get('id')?.value,
      title: this.editForm.get('title')?.value,
      username: this.editForm.get('username')?.value,
      password: this.editForm.get('password')?.value,
      url: this.editForm.get('url')?.value,
      tags: this.currTags
    }
  
    this.fsService.editCredential(editedCred).then(()=> {
      this.loading = false;
      this.router.navigate([''])
    })

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

  selected(event: MatAutocompleteSelectedEvent) {
    this.currTags.push(event.option.viewValue);
    if(this.tagInput) this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null)
  }

  private _filter(value:string): string[] {
    const filterValue = value.toLowerCase()
    return this.availableTags.filter(tag => tag.toLowerCase().includes(filterValue))
  }
}


