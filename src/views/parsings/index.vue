<script setup lang='ts'>
import OptionHot from "@/components/OptionHot.vue";
import { PropsHotType } from "@/types/parsingType";
import useCounterStore from "@/store/store";
import http from "@/utils/http";
const { state, actions } = useCounterStore()

localStorage.clear()
const optionHot = ["全部", "电视剧", "综艺", "电影", "动漫", "少儿", "纪录片"]
const data = {
  title: "重磅热播",
  hotItems: [
    {
      name: '你给我的喜欢',
      pic: 'https://puui.qpic.cn/vcover_hz_pic/0/mzc00200s5ujcp11667453296853/0',
      info: '故事讲述了女主角闵慧阴差阳错与男主角辛旗相知相爱，却因一场误会两人不欢而散。多年后，闵慧与辛旗重逢，发现心动只是爱情的开始，两个人在职场上、生活中上演了一幕幕甜虐情深。',
      wrap: '更新至12集 ',
    },
  ]
}
http({ url: `/getHotList?type=${state.souritem}`, method: "GET" }).then(res => {
  console.log(res)
})
</script>

<template>
  <div class="suggest">
    <OptionHot :optionHot="optionHot" :data="data" />
    <OptionHot :data="data" />
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
</style>
