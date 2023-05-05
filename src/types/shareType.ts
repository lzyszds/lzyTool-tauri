import { HttpVerb } from "@tauri-apps/api/http";

export interface IParams {
  url: string,
  /* 大写GEt */
  method: HttpVerb,
  data?: any,
  responseType?: 'JSON' | 'Text' | 'Binary',
  /* 是否需要默认api  /tauri */
  isDefind?: boolean
}
