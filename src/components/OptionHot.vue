<script setup lang='ts'>
import http from "@/utils/http";
import { ref, defineProps } from "vue";
interface Props {
  optionHot?: string[],
  data: {
    title: string,
    hotItems: {
      name: string,
      pic: string,
      info: string,
      wrap: string
    }[]
  }
}

const { optionHot, data } = defineProps<Props>()

const tabActive = ref(0)
const activeIndex = (index: number) => {
  tabActive.value = index
}

</script>

<template>
  <div class="optionItem">
    <div class="optionHot">
      <h2>{{ data.title }} </h2>
      <div class="optionHot-item" @click="activeIndex(index)" v-for="(item, index) in optionHot" :key="index">
        <span :class="{ active: index == tabActive }">{{ item }}</span>
      </div>
    </div>
    <div class="optionHotList">
      <div class="hotitem" v-for="item in data.hotItems" :key="item.name">
        <div class="img" :data-warp="item.wrap"><img :src="item.pic" alt=""></div>
        <h4>{{ item.name }}</h4>
        <p>{{ item.info }}</p>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
h4 {
  margin: 0;
}

h2 {
  margin: 10px 0;
}

.optionItem {
  width: 90vw;
  // border: 1px solid #ccc;
  border-radius: 5px;
  // padding: 10px;
  // margin-bottom: 10px;
  // box-shadow: inset 0 0 5px #ccc;
}

.optionHot {
  display: grid;
  grid-template-columns: 150px repeat(7, 60px);
  gap: 10px;
  align-items: center;
  transition: .3s;

  .optionHot-item {
    cursor: pointer;

    .active {
      color: $themeColor
    }

    &:hover {
      color: $themeColor;
    }
  }
}

.optionHotList {
  display: flex;
  overflow-x: scroll;
  gap: 40px;

  .hotitem {
    cursor: pointer;
    width: 230px;
    // padding: 10px;
    padding-left: 0;

    .img {
      position: relative;

      img {
        width: 100%;
        box-shadow: 0 20px 20px -5px rgba(250, 125, 227, 0.25), 14px 11px 11px -11px rgba(213, 228, 72, 0.3);
        border-radius: 10px;
      }

      &::after {
        content: attr(data-warp);
        position: absolute;
        bottom: 5px;
        right: 10px;
        width: 60%;
        height: 20px;
        font-size: 0.8em;
        line-height: 20px;
        text-align: right;
        color: #fff;
        text-shadow: 0 0 5px #000;
        font-family: "dindin";
      }
    }

    p {
      margin: 0;
      font-size: 12px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }

    &:hover {
      h4 {
        color: $hoverColor;
      }
    }
  }
}
</style>
