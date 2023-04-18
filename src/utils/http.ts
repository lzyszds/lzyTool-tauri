import { fetch, Body, ResponseType, HttpVerb } from "@tauri-apps/api/http";

const api = 'http://localhost:2000/tauri'
interface IParams {
  url: string,
  method: HttpVerb,
  data?: any,
  responseType?: 'JSON' | 'Text' | 'Binary'
}

// 2、封装请求方式
// @param method(必须)  请求方法
// @param url(必须)  接口地址
// @param data(可选)  携带参数
// @param headers(可选) 请求头可以自己设置，也可以使用默认的（不传）
export default function ({ url, method, responseType }: IParams) {
  // if (header) headers.responseType = ResponseType[header]
  const response = ResponseType[responseType!] || ResponseType.JSON
  return new Promise((resolve, reject) => {
    fetch(api + url, { method, responseType: response })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
