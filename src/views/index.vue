<script setup lang='ts'>
import { nextTick, onMounted, ref } from "vue";
import OptionHot from "@/components/OptionHot.vue";
import useCounterStore from "@/store/store";
import { ElCarousel, ElCarouselItem } from "element-plus";
// import config from "@/assets/style/mixin.scss";
// console.log(`lzy  export:`, config)
import http from "@/utils/http";
const { state, actions } = useCounterStore()

localStorage.clear()

const datas = await http({ url: `/getHotList?type=${state.souritem}`, method: "GET" }) as {}
const bannerData = await http({ url: `/getBannerList?type=${state.souritem}`, method: "GET" }) as any

console.log(`lzy  bannerData:`, bannerData)
const carousel = ref<HTMLDivElement>()
onMounted(() => {
  bannerData.forEach((element, index) => {
    carousel.value?.style.setProperty("--tipImg" + index, element.img)
  })
})
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
    <div class="carousel" ref="carousel">
      <el-carousel :interval="5000">
        <el-carousel-item v-for="item in bannerData" :key="item">
          <img :src="item.banner" class="carouselContent" />
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
  color: #000;

  :deep(.el-carousel__container) {
    height: 700px;

    .el-carousel__item {
      border-radius: 3px;
    }

    h3 {
      color: #475669;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
      text-align: center;
    }
  }

  .carouselContent {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  :deep(.el-carousel__indicators) {

    // background-image: url(${});
    button {
      display: none !important;
    }
  }
}
</style>
