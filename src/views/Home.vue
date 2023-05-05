<script setup lang='ts'>
import { ref } from "vue";
// import { http } from "@tauri-apps/api";
import http from "@/utils/http";
interface Entrytype {
  title: string,
  updated: string,
  href: string
}
let arr: Entrytype[] = []
const iframeURL = ref('')
try {
  const data = await http({ url: '/chanceyu', method: 'GET', responseType: 'JSON' })
  arr = data as Entrytype[]
  console.log(`lzy  arr:`, arr)
} catch (e) {
  console.log(`服务器估计崩了`, e)
}
</script>

<template>
  <div class="homeApp">
    <div>
      <iframe :src="iframeURL" allowFullScreen='true' width="100%" height="100%"
        sandbox="allow-scripts allow-same-origin"></iframe>
    </div>
    <div class="information">
      <h2> 前端技术文章 </h2>
      <div class="infoContent">
        <a class="conli" v-for="(item, index) in arr" :href="item.href" :key="index">
          <span>{{ item.title }}</span>
          <span>{{ item.updated }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.homeApp {

  .information {
    width: 330px;
    height: 95vh;
    overflow: hidden;
    background: #fff;
    border: 3px solid $themeColor;
    border-radius: 0;
    box-shadow: 0px 0px 10px 1px #999;
    position: absolute;
    bottom: 1rem;
    right: 20px;
    border-radius: 10px;

    h2 {
      font-size: 16px;
      font-weight: 600;
      margin: 10px;
      margin-bottom: 25px;
      text-align: center;
      box-shadow: 0px 0px 10px 1px #999;
      border-radius: 10px;
      padding: 5px;
      background: $themeColor;
      color: #fff;
      text-shadow: 0px 0px 2px #000;
      font-family: 'dindin';
    }

    .infoContent {
      height: 90%;
      overflow-y: scroll;
      padding: 0 20px;

      .conli {
        display: grid;
        // grid-template-columns: 4fr 1fr;
        gap: 3px;
        padding: 5px;
        padding-right: 10px;
        border-bottom: 1px solid #ccc;
        font-size: 12px;

        span:nth-child(2) {
          text-align: right;
        }
      }
    }

  }
}
</style>
