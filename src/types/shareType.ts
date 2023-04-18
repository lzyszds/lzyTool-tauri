import { HttpVerb } from "@tauri-apps/api/http";

export interface IParams {
  url: string,
  method: HttpVerb,
  data?: any,
  responseType?: 'JSON' | 'Text' | 'Binary'
}
