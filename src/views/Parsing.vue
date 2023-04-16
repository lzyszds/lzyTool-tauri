<script setup lang='ts'>
import { reactive, nextTick } from 'vue'
import { ElSelect, ElOption, ElButton, ElAutocomplete } from 'element-plus';
import http from '../utils/http';
import { ParsingType, ListArrType, GetVideoUrlType, ListItem } from '../types/parsingType';
import LzyButton from '@/components/LzyButton.vue';
import LzyCard from '@/components/LzyCard.vue';
// import { show, hide } from "@/utils/loaders";

const inputs = 'https://v.qq.com/x/cover/'


const parsing = reactive({ // 定义一个响应式的对象
  input: '柯南',//输入框
  api: 'http://localhost:2048/jx_parsApi?url=',//解析接口地址
  options: {
    'Jsonplayer': "http://localhost:2048/jx_parsApi?url=",
  },//解析接口列表  
  searchData: [] as ParsingType[], //解析数据
  data: [] as GetVideoUrlType[][], //解析数据
  listArr: [] as ListArrType[], //目录分组
  listActive: 0,  //目录选择组
  isListShow: false,  //是否显示列表
  url: '', //解析后的视频地址 可以直接放到iframe中
  detail: {} as ParsingType, //视频详情
  changeTabData: [] as any[], //目录切换数据
  loading: false,
})
// 请求获取视频列表
const getList = (): void => {
  // show('.parsing')
  http('get', `/api/getSearchList?name=` + parsing.input).then((res: any) => {
    parsing.searchData = res
  })
  parsing.isListShow = false
}

// 请求获取视频详情目录
const lookUpItem = (item: any): void => {
  parsing.loading = true
  http('get', `/api/getVideoUrl?url=` + item.href).then((res: any) => {
    parsing.data = res
    parsing.changeTabData = res.map(_res => {
      return _res[0].title + '-' + _res[_res.length - 1].title
    })
    parsing.loading = false
    changeTabIndex(0)
  })
  parsing.detail = item
  parsing.isListShow = true
}
nextTick(() => { getList() })
// 改变标签索引
const changeTabIndex = (index: number): void => {
  // 设置当前指数
  parsing.listActive = index
  console.log(`lzy  parsing.data:`, parsing.data)
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
function setClass() {
  if (parsing.changeTabData.length == 1) {
    if (parsing.listArr.length > 2) {
      return 'change'
    }
  }
}

const getSearch = async (value) => {
  return await http('get', `/api/getSearch?name=` + value) as ListItem[]
}
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  getSearch(queryString).then((res: ListItem[]) => {
    cb(res)
  })
}
const handleSelect = (item) => {
  parsing.input = item.docname
  getList()
}
</script>

<template>
  <div class="parsing">
    <div class="header">
      <el-select v-model="parsing.api" class="m-2" placeholder="Select">
        <el-option v-for="(item, index) in parsing.options" :key="index" :label="index" :value="item" />
      </el-select>
      <el-autocomplete v-model="parsing.input" :fetch-suggestions="querySearchAsync" placeholder="" @select="handleSelect"
        :debounce='300'>
        <template #default="{ item }">
          <div class="docname">{{ item.docname }}</div>
        </template>
      </el-autocomplete>
      <ElButton @click="getList" type="primary">搜 索</ElButton>
      <ElButton @click="parsing.isListShow = !parsing.isListShow" type="primary" style="margin: 0;">目 录</ElButton>
    </div>
    <div class="parsingCon" :class="{ shake: parsing.isListShow }">
      <!-- 视频介绍详情 -->
      <div class="details">
        <LzyCard :data="parsing.detail"></LzyCard>
      </div>
      <div class="listings" v-loading="parsing.loading">
        <div class="changeTab" v-if="parsing.changeTabData.length > 1">

          <p v-for="(item, index) in parsing.changeTabData" :key="index" @click="changeTabIndex(index)"
            :class="{ 'active': parsing.listActive === index }">
            {{ item }}
          </p>
        </div>
        <div class="listContent" :class="setClass()">
          <LzyButton v-for="item in parsing.listArr" class="listItem" :key="item.title" @click="toLookVideo(item.url)"
            :msg="item.title" height="24px" :after="item.isHerald" />
        </div>
      </div>
    </div>
  </div>
  <div class="searchRes">
    <!-- 搜索结果列表 -->
    <div class="searchResList">
      <div class="searchResItem" v-for="item in parsing.searchData" :key="item.title">
        <LzyCard @click="lookUpItem(item)" :data="item"></LzyCard>
        <p class="title">{{ item.title }}</p>
      </div>
    </div>
  </div>
  <iframe allowFullScreen='true' width="100%" height="93%" sandbox="allow-scripts allow-same-origin" :src="parsing.url" />
</template>

<style lang="scss" scoped>
.parsing {
  padding: 10px;
  background-color: #ffffff30;
  backdrop-filter: blur(40px);
  position: relative;
  z-index: 1;

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
    display: grid;
    grid-template-columns: 230px 1fr;
    gap: 20px;
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 1px 1px 10px #00000030;
    transition: .3s ease;
    z-index: -1;
    transform: translate3d(10px, 0, 0);
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
        background-color: #eee;
        margin: 10px 10px 0 0;
        height: 50px;
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
}

.searchResList {

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px 10px;
  background-color: #ffffff30;
  backdrop-filter: blur(40px);
  margin-bottom: 10px;
  padding: 20px;
  overflow: scroll;
  justify-items: center;
  height: calc(100vh - 120px);

  .searchResItem {
    .title {
      font-size: fit-content;
      padding: 5px 5px;
      margin-bottom: 0;
      width: 190px;
      font-family: 'dindin';
    }
  }
}

@media screen and (max-width: 1700px) {
  .searchResList {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media screen and (max-width: 1500px) {
  .searchResList {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (max-width: 1250px) {
  .searchResList {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 1050px) {
  .searchResList {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
