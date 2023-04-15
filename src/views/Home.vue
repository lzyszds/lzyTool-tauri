<script setup lang='ts'>
import { ref } from "vue";
import axios from "@/utils/http";
import { dayjs } from "element-plus";
interface Entrytype {
  title: string,
  updated: string,
  id: string
}
const arr: Entrytype[] = []
const titlen = ref()
const timen = ref()
try {
  const data = await axios('get', '/fedApi') as string
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
    if (index > 7) return
    const title: string = element.querySelector('title')!.innerHTML.replace('<![CDATA[', "").replace(']]>', "")
    const updated: string = dayjs(element.querySelector('updated')!.innerHTML).format('YYYY-MM-DD')
    const id: string = element.querySelector('id')!.innerHTML
    arr.push({ title, updated, id })
  });
} catch (e) {
  console.log(`服务器估计崩了`, e)
}
//获取 code 节点中内容


</script>

<template>
  <div class="homeApp">
    <div class="information">
      <div>
        <h2> 前端技术文章 </h2>
        <div class="conli" v-for="item in arr" :key="item.id">
          <div>{{ item.title }}</div>
          <div>{{ item.updated }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.homeApp {

  .information {
    width: 300px;
    height: 95vh;
    overflow-y: scroll;
    background: #fff;
    border: 3px solid $themeColor;
    border-radius: 0;
    box-shadow: 0px 0px 10px 1px #999;
    position: absolute;
    bottom: 20px;
    right: 20px;
    border-radius: 10px;
    padding: 0 20px;

    h2 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
      text-align: center;
    }

    .conli {
      display: grid;
      // grid-template-columns: 4fr 1fr;
      gap: 3px;
      padding: 5px;
      padding-right: 10px;
      border-bottom: 1px solid #ccc;
      font-size: 12px;

      div:nth-child(2) {
        text-align: right;
      }
    }
  }
}
</style>
