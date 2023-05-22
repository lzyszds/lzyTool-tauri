<script setup lang='ts'>
import http from "@/utils/http";
import { ref, defineProps } from "vue";
import useCounterStore from "@/store/store";
const { actions } = useCounterStore()
interface PropsHotType {
  optionHot?: string[],
  data: {
    title: string,
    hotTab: string[],
    hotItems: {
      title: string,
      pic: string,
      href: string,
      info: string,
      desc: string
    }[]
  }
}
const { optionHot, data } = defineProps<PropsHotType>()
const tabActive = ref(optionHot![0])
const activeIndex = (key: string) => {
  tabActive.value = key
}
</script>

<template>
  <div class="optionItem">
    <div class="optionHot">
      <h2>{{ data.title }} </h2>
      <div class="optionHot-item" @click="activeIndex(item)" v-for="(item, index) in optionHot" :key="index">
        <span :class="{ active: item == tabActive }">{{ item }}</span>
      </div>
    </div>
    <div class="optionHotList">
      <div class="hotitem" v-for="item in  data.hotItems[tabActive] " @click="actions.lookUpItem(item, item.title)"
        :key="item.title">
        <div class="img" :data-warp="item.info">
          <img v-lazy="500" :src="item.pic" alt="">
        </div>
        <h4>{{ item.title }}</h4>
        <!-- <p>{{ item.desc }}</p> -->
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
h4 {
  margin: 0;
  text-align: center;
}

h2 {
  margin: 10px 0;
}

.optionItem {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.optionHot {
  display: grid;
  grid-template-columns: 150px repeat(10, 90px);
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
  justify-content: space-around;
  overflow-x: scroll;
  gap: 40px;
  padding: 10px;
  width: 99%;

  .hotitem {
    cursor: pointer;
    width: 120rem;
    // padding: 10px;
    padding-left: 0;

    .img {
      position: relative;

      img {
        width: 100%;
        height: 201px;
        box-shadow: 0 20px 20px -5px rgba(250, 125, 227, 0.25), 14px 11px 11px -11px rgba(213, 228, 72, 0.3);
        border-radius: 10px;
        border: 1px solid $black;
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
        color: --hoverColor;
      }
    }
  }
}
</style>
