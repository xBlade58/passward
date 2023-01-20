import { Injectable } from '@angular/core';
import { Password } from './create-credential/Password';


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
  
  async loadCrendentials(): Promise<Password[]>{
    const creds = await window.electronAPI.loadCredentials()
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

    return res;
  }

  async editCredential(toUpdate: any): Promise<void> {
    return await window.electronAPI.editCredential(toUpdate)
  }

  async saveCredential(newCred: any): Promise<void> {
    return await window.electronAPI.saveCredential(newCred)
  }

  async deleteCredentialById(id: string): Promise<void> {
    return await window.electronAPI.deleteCredentialById(id)
  }
}
