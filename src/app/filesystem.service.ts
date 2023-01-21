import { Injectable } from '@angular/core';
import { Credential } from './@types/Credential';


@Injectable({
  providedIn: 'root'
})
export class FileSystemService {


  constructor(){

  }

  async loadPasswordById(id: string): Promise<string> {
    return await window.electronAPI.loadPasswordById(id)
      .then((password:any) => {
        return password;
      });
  }
  
  async loadCrendentials(): Promise<Credential[]>{
    const creds = await window.electronAPI.loadCredentials()
    let res: Credential[] = [];
    if(creds && creds.length > 0){
      creds.forEach((cred:any) => {
        const cTags:string[] = (cred.tags ? cred.tags : [])
        const pCred: Credential = {
          id: cred.id,
          title: cred.title,
          username: cred.username,
          password: cred.password,
          url: cred.url,
          tags: cTags
        }
        res.push(pCred);
      })
    }

    return res;
  }

  async editCredential(toUpdate: Credential): Promise<void> {
    return await window.electronAPI.editCredential(toUpdate)
  }

  async saveCredential(newCred: Credential): Promise<void> {
    return await window.electronAPI.saveCredential(newCred)
  }

  async deleteCredentialById(id: string): Promise<void> {
    return await window.electronAPI.deleteCredentialById(id)
  }
}
