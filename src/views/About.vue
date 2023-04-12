<script setup  lang="ts">
import { reactive, computed } from "vue";
const react = reactive({
  itemHeight: 60, // 每个列表项的高度，请勿更改
  length: 10, // 列表项可视范围内的个数，请勿更改
  buffer: 5, // 列表项可视范围外，防止出现白屏的 buffer 个数，上方 5 个，下方 5 个，可作为优化项实现
  list: [] as number[],
  totalHeight: 0,
  scrollTop: 0,
  start: 0,
})
const initList = () => {
  for (let i = 1; i <= 10000; i++) {
    react.list.push(i)
  }
  react.totalHeight = react.list.length * react.itemHeight
}
initList()
const showingList = computed(() => {
  return react.list.slice(react.start, react.start + react.length + react.buffer)
})
const handleCreate = (e) => {
  react.scrollTop = e.target.scrollTop
  react.start = Math.floor(react.scrollTop / react.itemHeight)
}
</script>

<template>
  <div id="virtual-list" class="virtual-list" @scroll="handleCreate">
    <div id="scroll-container" :style="{ height: react.totalHeight + 'px' }"></div>
    <ul id="list" class="list" :style="`transform:translate3d(0px,${react.start * react.itemHeight}px,0px)`">
      <li v-for="item in showingList" :key="item"
        :style="{ height: react.itemHeight + 'px', lineHeight: react.itemHeight + 'px' }">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.virtual-list {
  position: relative;
  width: 360px;
  height: 600px;
  border: 1px solid;
  overflow-y: auto;
  border-radius: 2px;
  display: inline-block;
}

.list {
  position: absolute;
  list-style: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
}

.list li {
  padding: 0 10px;
  background-color: #cde3cb;
}

.list li:not(:last-of-type) {
  border-bottom: 2px solid #768b74;
}
</style>

