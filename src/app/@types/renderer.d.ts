export interface IElectronAPI {
  saveCredential: () => Promise<void>
 }


declare global
{
  interface Window {
    electronAPI: IElectronAPI
  }
}
