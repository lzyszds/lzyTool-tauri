<script setup lang='ts'>
import { ref } from "vue";
// import { http } from "@tauri-apps/api";
import http from "@/utils/http";
import { dayjs } from "element-plus";
interface Entrytype {
  title: string,
  updated: string,
  href: string
}
const arr: Entrytype[] = []
const titlen = ref()
const timen = ref()
try {
  const data = await http({ url: '/chanceyu', method: 'GET', responseType: 'Text' }) as string
  //生成新的DOM解析器
  const parser = new DOMParser();
  //读取返回字符串
  const _xml = parser.parseFromString(data, "text/xml");
  console.log(`lzy  _xml:`, _xml)
  const entry = _xml.querySelectorAll('entry')
  titlen.value = _xml.querySelector('feed>title')
  const time = _xml.querySelector('feed>updated')
  timen.value = dayjs(time!.innerHTML).format('YYYY-MM-DD')
  entry.forEach((element, index) => {
    // if (index > 7) return
    const title: string = element.querySelector('title')!.innerHTML.replace('<![CDATA[', "").replace(']]>', "")
    const updated: string = dayjs(element.querySelector('updated')!.innerHTML).format('YYYY-MM-DD')
    const href: string = element.querySelector('id')!.innerHTML
    arr.push({ title, updated, href })
  });
  console.log(`lzy  arr:`, arr)

} catch (e) {
  console.log(`服务器估计崩了`, e)
}

</script>

<template>
  <div class="homeApp">
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
    bottom: 20px;
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
