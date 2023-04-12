import { createApp } from 'vue' //引入vue
import './assets/style/style.scss' //引入全局样式
import './assets/style/elementLzy.scss' //引入element-plus自定义样式
import './assets/font/font.css' //引入字体图标
import App from './App.vue' //引入入口组件
//导入element-plus
import 'element-plus/dist/index.css'

import { router } from "./utils/router"; //引入路由
const app = createApp(App) //创建vue实例

app.use(router) //使用路由
app.mount('#app') //挂载vue实例
