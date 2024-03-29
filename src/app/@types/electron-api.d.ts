import { Credential } from "./Credential"

export interface IElectronAPI {
  deleteCredentialById: (id:string) => Promise<void>,
  saveCredential: (data:Credential) => Promise<void>,
  editCredential: (toUpdate:Credential) => Promise<void>,
  loadCredentials: () => Promise<any>,
  loadPasswordById: (id:string) => Promise<string>
 }


declare global
{
  interface Window {
    electronAPI: IElectronAPI
  }
}
