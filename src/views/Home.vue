<script setup lang='ts'>
import { reactive } from "vue";
import axios from "@/utils/http";
import { dayjs } from "element-plus";
interface Entrytype {
  title: string,
  updated: string,
  id: string
}
const arr: Entrytype[] = []

const data = await axios('get', '/fedApi') as string
//生成新的DOM解析器
const parser = new DOMParser();
//读取返回字符串
const _xml = parser.parseFromString(data, "text/xml");
console.log(`lzy  _xml:`, _xml)
console.log(`lzy  _xml:`, _xml.querySelector("feed>title")?.innerHTML)
console.log(`lzy  _xml:`, _xml.querySelector("feed>updated")?.innerHTML)
const entry = _xml.querySelectorAll('entry')
console.log(`lzy  _xml:`, entry)
entry.forEach(element => {
  const title: string = element.querySelector('title')!.innerHTML.replace('<![CDATA[', "").replace(']]>', "")
  const updated: string = dayjs(element.querySelector('updated')!.innerHTML).format('YYYY-MM-DD')
  const id: string = element.querySelector('id')!.innerHTML
  arr.push({ title, updated, id })
});
//获取 code 节点中内容
console.log(`lzy  arr:`, arr)


</script>

<template>
  <div class="information">
    <div class="conli" v-for="item in arr" :key="item.id">
      <div>{{ item.title }}</div>
      <div>{{ item.updated }}</div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.information {
  width: 300px;
  height: 50vh;
  overflow-y: scroll;

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
</style>
