<script setup lang='ts'>
//目录
import { analysis_Port } from "@/assets/data/parsings";
import { reactive, defineEmits } from 'vue'
import { ElEmpty } from 'element-plus';
import empty from "@/assets/images/empty.png";
import { ParsingType, ListArrType, GetVideoUrlType } from '@/types/parsingType';
import LzyButton from '@/components/LzyButton.vue';
import LzyCard from '@/components/LzyCard.vue';
import useCounterStore from "@/store/store";
const { state, actions } = useCounterStore()

import { useRouter } from "vue-router";
const router = useRouter()

// // 改变标签索引
// const changeTabIndex = (index: number): void => {
//   // 设置当前指数
//   parsing.listActive = index
//   // 设置当前列表数据
//   parsing.listArr = parsing.data[index].map((item: any) => {
//     const isHerald = item.isNoStoreWatchHistory
//     return {
//       title: item.title,
//       url: item.href,
//       isHerald: isHerald == true ? '预告' : ''
//     }
//   })
// }
const toLookVideo = (item, index): void => {
  state.activePlay = index
  const api = state.parsApi
  router.push({ path: '/parsing/play', query: { url: analysis_Port[api] + item } })
  actions.setListShow(false)
  actions.setSearchShow(false)
  localStorage.setItem("store", JSON.stringify(state))
}
function setClass() {
  if (state.pagingTabDataList.length == 1) {
    return 'change'
  }
}
</script>

<template>
  <div class="parsingCon" :class="{ shake: state.isListShow }">
    <!-- 视频介绍目录等详情 -->
    <div class="details">
      <LzyCard :data="state.catalogDetails"></LzyCard>
    </div>
    <div class="listings" v-loading="state.V_loading">
      <!-- 目录分组选项 -->
      <div class="changeTab">
        <p v-for="(item, index) in state.pagingTabDataList" :key="index"
          :class="{ 'active': state.pagingTabIndex === index }">
          {{ item }}
        </p>
      </div>
      <el-empty v-if="state.pagingTabData.length == 0" :image="empty" description="当前源找不到内容，请切换其他源" />
      <div v-else class="listContent" :class="setClass()">
        <LzyButton v-for="(item, index) in  state.pagingTabData " class="listItem"
          :class="state.activePlay === index ? 'bgRed' : ''" :key="item.title" @click="toLookVideo(item.href, index)"
          :msg="item.title" height="24px" :after="item.isNoStoreWatchHistory" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.parsingCon {
  width: 97.5%;
  height: 320px;
  position: absolute;
  display: grid;
  grid-template-columns: 230px 1fr;
  gap: 20px;
  padding: 5px 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 10px #00000030;
  transition: .3s;
  z-index: -1;
  transform: translate3d(0, -10px, 0);
  opacity: 0;
  pointer-events: none;

  &.shake {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    pointer-events: all;
  }

  .details {
    padding-top: 15px;
    margin: 0 auto;
    justify-content: center;
    display: flex;
    align-items: center;
  }

  .listings {
    height: 100%;
    width: 100%;
    text-align: center;

    .changeTab {
      background-color: #fff;
      box-shadow: 4px 4px var(--main-color);
      border: 2px solid var(--main-color);
      margin: 10px 10px 0 0;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 0 10px;
      overflow: hidden;
      position: absolute;
      z-index: 99;

      &:hover {
        height: auto;
      }

      p {
        margin: 0;
        cursor: pointer;
        font-family: 'dindin';
        width: 100px;

        &.active {
          color: $themeColor;
        }

        &:hover {
          color: #409EFF;
        }
      }
    }

    .listContent {

      height: calc(100% - 80px);
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(6, 1fr);
      gap: 10px;
      padding: 0 10px 10px 0;
      padding-top: 0;
      margin-top: 70px;
      overflow-y: scroll;

      &.change {
        grid-template-columns: 1fr;
        grid-template-rows: none;
        height: 210px;
      }


      .listItem {
        position: relative;
        font-size: clamp(12px, 2vw, 16px);
        font-family: 'dindin';

        &.bgRed {
          :deep(button) {
            color: #e53935;
          }
        }

        :deep(button) {
          width: 100%;
          font-size: clamp(12px, 1vw, 16px);
          justify-content: space-between;

          &::after {
            content: attr(data-after);
            font-size: 12px;
            position: absolute;
            top: -2px;
            right: 50%;
            transform: translate(50%, 1px) scale(0.677);
            color: red;
            font-family: 'almama';
            text-shadow: none;
          }

          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        &:hover :deep(button) {
          transition: none;
          font-size: 20px;
          font-weight: 600;
          color: #e53935;
        }
      }
    }
  }

}
</style>
