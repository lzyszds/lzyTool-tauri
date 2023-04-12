// 一、配置axios
import axios from 'axios'
// import { ElMessageBox } from 'element-plus'
// import { getCookie } from './common'
const instance = axios.create({
  baseURL: window.location.origin,
  // timeout: 5000,
  withCredentials: false,//表示跨域请求时是否需要使用凭证
})
// 响应拦截器
// instance.interceptors.response.use(response => {
//   if (!getCookie('token_remderDay')) {
//     localStorage.clear()
//   }
//   if (response.status === 200) {
//     // 993登录过期
//     if (response.data.code != '10011') {
//       return Promise.resolve(response)
//     } else {
//       let timer: any = setTimeout(() => {
//         window.location.href = '/login'
//       }, 1000 * 1000)
//       localStorage.clear() // 清空本地存储
//       ElMessageBox.alert('登陆验证失败，请重新登陆！！(2秒后自动退出)', '提示', {
//         // 如果要禁用其自动对焦
//         // autofocus: false,
//         confirmButtonText: '确定',
//         callback: () => {
//           window.location.href = '/login'
//           clearTimeout(timer)
//         },
//       })
//     }
//   } else {
//     return Promise.reject(response)
//   }
// })

// 2、封装请求方式
// @param method(必须)  请求方法
// @param url(必须)  接口地址
// @param data(可选)  携带参数
// @param headers(可选) 请求头可以自己设置，也可以使用默认的（不传）
export default function (method = 'get', url = '', data = {}, headers?) {
  // 设置默认请求头  
  if (!headers) {
    headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }
  return new Promise((resolve, reject) => {
    instance({ method, url, data, headers })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
