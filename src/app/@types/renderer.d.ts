export interface IElectronAPI {
  saveCredential: (data:any) => Promise<void>,
  editCredential: (toUpdate:any) => Promise<void>,
  loadCredentials: () => Promise<any>,
  loadPasswordById: (id:string) => Promise<string>
 }


declare global
{
  interface Window {
    electronAPI: IElectronAPI
  }
}
