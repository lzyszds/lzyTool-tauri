# Tauri + Vue3 + Vite + TypeScript

本文介绍如何使用 Tauri + Vue3 + Vite + TypeScript 搭建一个现代化的桌面应用程序。 看看更新没有

这个模板应该有助于您开始在Vite中使用Vue 3和TypeScript进行开发。该模板使用Vue 3＜script setup＞SFC，请查看脚本设置文档以了解更多信息。

### 1.Tauri

> Tauri 是一个构建现代跨平台桌面应用程序的工具，它使用 Rust 和 Web 技术构建桌面应用程序。Tauri 可以让你使用你最喜欢的 Web 技术来构建桌面应用程序，同时还能够访问本地操作系统功能。

### 2.Vue3

>Vue3 是一个流行的 JavaScript 框架，它提供了响应式的数据绑定和组件化的开发模式。Vue3 还引入了一些新特性，如 Composition API 和 Teleport，使得开发更加高效和便捷。

### 3.Vite

>Vite 是一个基于 Rollup 的构建工具，它使用 ES 模块语法，在开发环境下使用快速的热重载和零配置的特性来提高开发效率。Vite 的目标是让开发者在开发过程中更加高效和快速。

### 4.TypeScript

>TypeScript 是一个 JavaScript 的超集，它增加了静态类型检查和强类型支持。TypeScript 能够帮助开发者在编译期间捕获错误，提供更好的开发体验和可维护性。

## 使用方法
  >
  >使用tauri需要先在电脑中安装好Rust和Node.js，具体安装方法请自行百度。
  >不安装Rust的话,会出现问题，具体问题看下方的Tauri踩坑1。

  ```node.js
  # 安装依赖
  pnpm install
  # 开发 
  pnpm tauri dev 
  # 打包
  pnpm tauri build

  ```

## Tauri踩坑

<div style="background:#30344c;color:#fff;padding:10px;font-size:12px">
 1. 运行 npm run tauri dev 报错,解决办法：安装Rust
</div>  

  ```
> app@0.0.0 tauri
> tauri dev

thread '<unnamed>' panicked at 'called `Result::unwrap()` on an `Err` value: Os { code: 2, kind: NotFound, message: "No such file or directory" }', src/interface/rust.rs:762:69
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
  ```

<div style="background:#30344c;color:#fff;padding:10px;font-size:12px">
 2.(当前项目已修改) 运行 npm run tauri build 报错，解决办法：修改tauri.conf.json中的bundle.identifier, 把com.tauri.dev改成com.tauri.build
</div>  

```
> lzyTool@0.0.0 tauri G:\Tauri\lzyTool-tauri
> tauri "build"

Error You must change the bundle identifier in `tauri.conf.json > tauri > bundle > identifier`. The default value `com.tauri.dev` is not allowed as it must be unique across applications

```

<div style="background:#30344c;color:#fff;padding:10px;font-size:12px">
 3.打包的途中会下载一些东西，如果下载不下来，可以手动下载，然后放到对应的目录下
 <p>我们就单独去下载这个包，就是在图中的Downloading网址，去下载下来</p>
 <p> (注意AppData文件默认隐藏)(如果找不到tauri和WixTools文件，就自己创建)</p>
  <p>然后放在路径C盘/用户/当前账户/AppData/Local/tauri/WixTools</p>
  <p>把刚才下载的压缩包解压到WixTools里面</p>

</p>
</div>  
