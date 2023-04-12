<script setup lang='ts'>
import { reactive, nextTick } from 'vue'
import { ElInput, ElSelect, ElOption, ElButton } from 'element-plus';
import http from '../utils/http';
import { ParsingType, ListArrType, DetailArrType } from '../types/parsingType';
import LzyButton from '@/components/LzyButton.vue';
import LzyCard from '@/components/LzyCard.vue';
import { show, hide } from "@/utils/loaders";

const inputs = 'https://v.qq.com/x/cover/'


const parsing = reactive({ // 定义一个响应式的对象
  input: '斗罗大陆',//输入框
  api: 'http://localhost:2048/jx_parsApi?url=',//解析接口地址
  options: {
    'Jsonplayer': "http://localhost:2048/jx_parsApi?url=",
  },//解析接口列表  
  data: [] as ParsingType[][], //解析数据
  listArr: [] as ListArrType[], //目录分组
  listActive: 0,  //目录选择组
  isListShow: false,  //是否显示列表
  url: '', //解析后的视频地址 可以直接放到iframe中
  detail: {} as DetailArrType, //视频详情
  changeTabData: [] as any[], //目录切换数据
})
// 请求获取目录
const getList = (): void => {
  // show('.parsing')
  http('get', `/parsApi/${0}/${parsing.input}`).then((res: any) => {
    const data = res
      .replaceAll('undefined', 'null')
      .replaceAll('Array.prototype.slice.call(', '')
      .replaceAll(')', '')
      .replaceAll("'", "\"")
      .replaceAll("None", "\"None\"")
      .replaceAll("False", "\"false\"")
      .replaceAll("True", "\"true\"")
      .replaceAll('"{', "{")
      .replaceAll('}"', "}")
    // 解析数据
    const dataPro = JSON.parse(data)
    console.log(`lzy  dataPro:`, dataPro)

    parsing.detail = dataPro.detailedData
    parsing.data = dataPro.listData.map((item: any) => {
      return Object.values(item)
    })
    parsing.changeTabData = []
    parsing.data.forEach((item: ParsingType[], index) => {
      if (index % 12 == 0) {
        parsing.changeTabData.push([])
      }
      parsing.changeTabData[parsing.changeTabData.length - 1].push(item[0].title + '-' + item[parsing.data[index].length - 1].title)
    })
    changeTabIndex(0)
    // hide('.parsing')
  })
}
nextTick(() => { getList() })
// 改变标签索引
const changeTabIndex = (index: number): void => {
  // 设置当前指数
  parsing.listActive = index
  // 设置当前列表数据
  parsing.listArr = parsing.data[index].map((item: any) => {
    const isHerald = item.isNoStoreWatchHistory
    return {
      title: item.title,
      url: `${item.cid}/${item.vid}.html`,
      isHerald: isHerald == 'true' ? '预告' : ''
    }
  })
}
const toLookVideo = (item: string): void => {
  parsing.url = parsing.api + inputs + item
}
</script>

<template>
  <div class="parsing">
    <div class="header">
      <el-select v-model="parsing.api" class="m-2" placeholder="Select">
        <el-option v-for="(item, index) in parsing.options" :key="index" :label="index" :value="item" />
      </el-select>
      <el-input v-model="parsing.input" @keydown.enter="getList" placeholder="Please input" clearable />
      <ElButton @click="getList" type="primary">搜 索</ElButton>
      <ElButton @click="parsing.isListShow = !parsing.isListShow" type="primary" style="margin: 0;">目 录</ElButton>
    </div>
    <div class="parsingCon" v-show="parsing.isListShow">
      <!-- 视频介绍详情 -->
      <div class="details">
        <LzyCard :data="parsing.detail"></LzyCard>
      </div>
      <div class="listings">
        <div class="changeTab">
          <div v-for="(_item, _index) in parsing.changeTabData" :key="_index">
            <p v-for="(item, index) in _item" :key="index" @click="changeTabIndex(index)"
              :class="{ 'active': parsing.listActive === index }">
              {{ item }}
            </p>
          </div>
        </div>
        <div class="listContent">
          <LzyButton v-for="item in parsing.listArr" class="listItem" :key="item.title" @click="toLookVideo(item.url)"
            :msg="item.title" height="24px" :after="item.isHerald" />
        </div>
      </div>
    </div>
    <iframe allowFullScreen='true' width="100%" height="93%" sandbox="allow-scripts allow-same-origin"
      :src="parsing.url" />

  </div>
</template>

<style lang="scss" scoped>
.parsing {
  padding: 10px;
  background-color: #fff;

  .header {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .parsingCon {
    width: calc(100vw - 248px);
    height: 320px;
    position: absolute;
    display: flex;
    gap: 20px;
    align-items: center;
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 10px;

    .listings {
      height: 100%;
      width: 83%;
      text-align: center;

      .changeTab {
        background-color: #eee;
        margin: 10px 10px 0 0;
        height: 50px;
        border-radius: 10px;

        div {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 10px;

          p {
            cursor: pointer;
            font-family: 'dindin';

            &.active {
              color: $themeColor;
            }

            &:hover {
              color: #409EFF;
            }
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
        margin-top: 10px;

        .listItem {
          position: relative;
          font-size: clamp(12px, 2vw, 16px);
          font-family: 'dindin';

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

          &:hover {
            color: $themeColor;
          }
        }
      }
    }

  }
}
</style>
