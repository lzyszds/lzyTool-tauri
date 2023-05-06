<script setup lang='ts'>
import OptionHot from "@/components/OptionHot.vue";
import useCounterStore from "@/store/store";
import { ElCarousel, ElCarouselItem } from "element-plus";
import http from "@/utils/http";
const { state, actions } = useCounterStore()

localStorage.clear()

const datas = await http({ url: `/getHotList?type=${state.souritem}`, method: "GET" }) as {}
const bannerData = await http({ url: `/getBannerList?type=${state.souritem}`, method: "GET" }) as any

console.log(`lzy  bannerData:`, bannerData)
let data = [{
  title: "重磅热播",
  hotTab: Object.keys(datas['热播']),
  hotItems: datas['热播']
}]
let index = 0
for (const key in datas) {
  if (key != '热播') {
    data[index] = {
      title: key,
      hotTab: Object.keys(datas[key]),
      hotItems: datas[key]
    }
  }
  index++
}
</script>

<template>
  <div class="suggest">
    <div class="carousel">
      <el-carousel :interval="5000" type="card" arrow="always" height="300px">
        <el-carousel-item v-for="item in bannerData" :key="item">
          <div class="carouselContent" :style="`background-image:url(${item.banner})`"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <OptionHot v-for="item in data" :key="item.title" :optionHot="item.hotTab" :data="item" />
  </div>
</template>

<style lang='scss' scoped>
.suggest {
  overflow-y: scroll;
  height: calc(100vh - 100px);

  &::-webkit-scrollbar {
    display: none;
  }
}

.carousel {
  :deep(.el-carousel__container) {
    height: 700px;

    // &:nth-child(2n) {
    //   background-color: #99a9bf;
    // }

    // &:nth-child(2n + 1) {
    //   background-color: #d3dce6;
    // }

    h3 {
      color: #475669;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
      text-align: center;
    }
  }

  .carouselContent {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
}
</style>
