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

  constructor(private router: Router, private fsService: FileSystemService,){

  }

  ngOnInit() {
    const data = history.state.data;
    this.editForm.setValue({
      id: data.id,
      title: data.title,
      username: data.username,
      password: "ffffffffffffffffffffffffffffffffffffffff",
      url: data.url,
      tag: data.tag
    })

    this.fsService.loadPasswordById(data.id).then((pd: string) => {
      console.log("Password loaded")
      this.editForm.patchValue({ password: pd });
    })


  }

  ngonDestroy() {
    console.log("Edit destroeyed")
  }

  cancel(){
    this.router.navigate([''])
  }

  edit(){
    this.loading = true;
    this.fsService.editCredentialById(this.editForm.value).then(()=> {
      console.log("Navigating back to main")
      this.loading = false;
      this.router.navigate([''])

    })

  }

}
