
/*
import {API} from "../preload"


declare global {
  interface Window {electronApi: typeof API}
}*/

declare namespace electronAPI {
  function savePassword(data: string) : Promise<string>
}
