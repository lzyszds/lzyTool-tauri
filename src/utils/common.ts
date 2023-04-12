import http from './http'
import { ElNotification, dayjs } from 'element-plus'
// 此函数获取一个数组并将其拆分为更小的块
export function splitArray(array: any, size) {
  // 创建一个空数组以容纳较小的块
  let data: any[] = [];
  // 在原始阵列上循环
  for (let i = 0; i < array.length; i += size) {
    // 对于每个迭代，向新数组添加一个新块
    data.push(array.slice(i, i + size))
  }
  // return 一个新数组
  return data
}

//时间格式化为字符串 比如说前天 几天前，几小时前
export function timeAgo(time: number): string {
  const t = dayjs().unix() - time // Y-m-d H:i:s
  let i = 60
  let h = i * 60
  let d = h * 24
  let m = d * 30
  let y = m * 12
  const mp: any = new Map([
    //n是时间戳（key），t是当前时间戳 ,>>0 是向下取整
    [(n: any) => n < i, () => '一分钟'],
    [(n: any) => n < h, (n: any) => (n / i >> 0) + '分钟'],
    [(n: any) => n < d, (n: any) => (n / h >> 0) + '小时'],
    [(n: any) => n < m, (n: any) => (n / d >> 0) + '天'],
    [(n: any) => n < y, (n: any) => (n / m >> 0) + '月'],
    [() => true, (n: any) => (n / y >> 0) + '年'],
  ])
  return ([...mp].find(([n]) => n(t)).pop())(t) + '前'
}

interface ipGetType {
  data: [],
  status: string
}

//获取当前ip以及天气
export function getIpWeather(): Promise<ipGetType> {
  let headers = {
    'Content-Type': 'multipart/form-data',
    'X-User-Token': 'iwKIaV2WP/9pLVldKr7qSFoeqAvBCO/n'
  }
  return new Promise((resolve, reject) => {
    http('get', '/getIp/info', headers).then((res: any) => {
      if (res.status = 'success') {
        resolve(res.data)
      } else {
        reject(res.status)
      }
    }).catch((err) => {
      reject(err);
    })
  });
}

export function base64toBlob(dataurl: string): Blob {
  // base64 转 二进制流(blob)
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}
// 二进制流转换为base64 格式。
export function getBase64(data: BlobPart[], type: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!data || !type) {
      // 如果参数为空，则返回错误信息。
      reject(new Error('Invalid parameters'));
    } else {
      try {
        // 创建一个Blob 对象。
        const blob = new Blob(data, { type: type });
        // 创建一个FileReader 对象。
        const reader = new FileReader();
        // 读取Blob 对象。
        reader.readAsDataURL(blob);
        // 读取成功后，返回数据。
        reader.onload = () => resolve(reader.result as string);
        // 读取失败后，返回错误信息。
        reader.onerror = (error: ProgressEvent<FileReader>) => reject(error);
      } catch (error) {
        reject(error);
      }
    }
  });
}



//上传图片，图片太大，如何在前端实现图片压缩后上传
export function compressPic(file: any, quality: any) {
  return new Promise((resolve, reject) => {
    getBase64(file, file.type)
      .then((res: string) => {
        // 这里quality的范围是（0-1）
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        const img: HTMLImageElement = new Image();
        img.src = res;
        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          // 转换成base64格式 quality为图片压缩质量 0-1之间  值越小压缩的越大 图片质量越差
          const base64 = canvas.toDataURL(file.type, quality);
          const fileCompress = base64toBlob(base64);
          resolve({ base64, fileCompress });
        };
        img.onerror = function (err) {
          reject(err);
        };
      })
      .catch(err => {
        reject(err);
      });
  });
}

//提示弹窗
export const LNotification = (val: string, time: number = 2000, postion: any = 'bottom-right') => {
  if (val) {
    ElNotification.closeAll()
    ElNotification({
      dangerouslyUseHTMLString: true,
      message: val,
      position: postion,
      duration: time,
      customClass: 'copy-success',
    })
  }
}

// 复制内容提示版权信息
import { useEventListener } from "@vueuse/core";

export const copyTip = () => {
  useEventListener(window, 'keydown', e => {
    if (e.ctrlKey && e.key === 'c') {
      LNotification(`<i class="fa fa-copy"></i> 复制成功,转载请声明来源！`)
    }
  })
}

//获取cookie
export const getCookie = (name: string) => {
  let cookie = document.cookie.split('; ').map((item) => {
    return item.split('=')
  })
  cookie = Object.fromEntries(cookie)
  return cookie[name]
}

//设置cookie
export const setCookie = (name: string, value: string, time: number) => {
  let date = dayjs()
  date = date.add(time, 'day')
  document.cookie = `${name}=${value};expires=${date}`
}




export const allFunction = {
  splitArray,//把一个数组拆分成几个数组
  timeAgo,//时间转换
  getIpWeather,//获取当前ip以及天气
  base64toBlob,//base64转二进制流
  getBase64,//二进制流转换为base64 格式。
  compressPic,//上传图片，图片太大，如何在前端实现图片压缩后上传
  copyTip,//复制内容提示版权信息
  LNotification,//提示弹窗
  getCookie,//获取cookie
  setCookie,//设置cookie
}
