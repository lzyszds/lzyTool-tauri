<script setup lang='ts'>
import { nextTick, onMounted, ref } from "vue";
import OptionHot from "@/components/OptionHot.vue";
import useCounterStore from "@/store/store";
import { ElCarousel, ElCarouselItem } from "element-plus";
import http from "@/utils/http";
const { state, actions } = useCounterStore()

localStorage.clear()

const datas = await http({ url: `/getHotList?type=${state.souritem}`, method: "GET" }) as {}

/* 递归获取banner，
   直到获取到数据 ，
   防止banner加载不出来，
   导致轮播图不显示，或者显示空白
*/
const queryBanner = async () => {
  const data = await http({ url: `/getBannerList?type=${state.souritem}`, method: "GET" }) as any
  if (data.length > 0) {
    return data
  } else {
    return await queryBanner()
  }
}
const bannerData = await queryBanner()

console.log(`lzy  bannerData:`, bannerData)
const carousel = ref<HTMLDivElement>()
onMounted(() => {
  nextTick(() => {
    const lis = document.querySelectorAll('.el-carousel__indicators li') as NodeList
    lis.forEach((li: HTMLLIElement, index) => {
      li.style.backgroundImage = `url(${bannerData[index].img})`
      li.setAttribute('title', bannerData[index].title)
    });
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
          <img @click="actions.lookUpItem(item, item.title)" :src="item.banner" class="carouselContent" />
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
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
    position: absolute;
    height: 120px;
    overflow: hidden;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), #141414);

    li {
      height: 70px;
      width: 50px;
      background-size: cover;
      border-radius: 7px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 7px;
        background-color: rgba($color: #141414, $alpha: 0.5);
      }

      &::before {
        content: attr(title);
        color: #fff;
        font-size: 3px;
        font-weight: 600;
        font-family: 'dindin';
        white-space: nowrap;
        position: absolute;
        bottom: -20px;
        transform: scale(0.7);
        transform-origin: left
      }

      &.is-active {
        &::after {
          background-color: rgba($color: #141414, $alpha: 0);
        }
      }
    }

    // background-image: url(${});
    button {
      display: none !important;
    }
  }
}
</style>
