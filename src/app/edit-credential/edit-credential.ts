import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
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
    url: new FormControl(),
    tag: new FormControl()
  })

  constructor(private router: Router, private fsService: FileSystemService){

  }

  ngOnInit() {
    const data = history.state.data;
    this.editForm.setValue({
      id: data.id,
      title: data.title,
      username: data.username,
      password: "",
      url: data.url,
      tag: data.tag
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

  async edit(){
    this.loading = true;
    var obj = {
      id: this.editForm.get('id')?.value,
      title: this.editForm.get('title')?.value,
      username: this.editForm.get('username')?.value,
      password: this.editForm.get('password')?.value,
      url: this.editForm.get('url')?.value,
      tag: this.editForm.get('tag')?.value
    }
    console.log(JSON.stringify(obj))
  
    this.fsService.editCredential(obj).then(()=> {
      this.loading = false;
      this.router.navigate([''])
    })

  }
}


