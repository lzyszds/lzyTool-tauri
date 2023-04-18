import { fetch, Body, ResponseType, } from "@tauri-apps/api/http";
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 引入样式
import { IParams } from "@/types/shareType";
// 简单配置
NProgress.inc(0.4)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: true })

const api = 'http://localhost:2000/tauri'


// 2、封装请求方式
// @param method(必须)  请求方法
// @param url(必须)  接口地址
// @param data(可选)  携带参数
// @param headers(可选) 请求头可以自己设置，也可以使用默认的（不传）
export default function ({ url, method, responseType }: IParams) {
  NProgress.done()
  // 进度条开始
  NProgress.start()

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
      .finally(() => {
        // 进度条结束
        NProgress.done()
      })
  })
}
