<script setup lang='ts'>
import { reactive, nextTick } from 'vue'
import { ElSelect, ElOption, ElButton, ElAutocomplete, ElEmpty } from 'element-plus';
import { http } from "@tauri-apps/api";
import empty from "@/assets/images/empty.png";
import { ParsingType, ListArrType, GetVideoUrlType, ListItem } from '../types/parsingType';
import LzyButton from '@/components/LzyButton.vue';
import LzyCard from '@/components/LzyCard.vue';
// import { show, hide } from "@/utils/loaders";

const api = 'http://localhost:2000/tauri'

const parsing = reactive({ // 定义一个响应式的对象
  input: '无间道',//输入框
  souritem: '爱奇艺',
  sourTypes: {
    "腾讯": 'https://v.qq.com/x/cover/',
    "爱奇艺": 'https://www.iqiyi.com/',
  },
  api: 'Jsonplayer',
  options: {
    'Jsonplayer': "https://jx.jsonplayer.com/player/?url=",
    'Aidouer': 'https://jx.aidouer.net/?url=',
    '冰豆': 'https://api.qianqi.net/vip/?url=',
    '云析': 'https://jx.yparse.com/index.php?url=',
    "ckmov": "https://www.ckmov.vip/api.php?url=",
    "H8": "https://www.h8jx.com/jiexi.php?url=",
    "解析la": "https://api.jiexi.la/?url=",
    "M3U8": "https://jx.m3u8.tv/jiexi/?url=",
    "诺讯": "https://www.nxflv.com/?url=",
    "OK": "https://okjx.cc/?url=",
    "PM": "https://www.playm3u8.cn/jiexi.php?url=",
    "盘古": "https://www.pangujiexi.cc/jiexi.php?url=",
    "维多": "https://jx.ivito.cn/?url=",
    "虾米": "https://jx.xmflv.com/?url=",
    "8090": "https://www.8090g.cn/?url="
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
  searchPage: true
})
// 请求获取视频列表
const getList = (): void => {
  // show('.parsing')
  http.fetch(`${api}/getSearchList?name=${parsing.input}&type=${parsing.souritem}`, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method: 'GET',
  }).then((res: any) => {
    console.log(`lzy  res:`, res)
    parsing.searchData = res.data
  })
  parsing.isListShow = false
  parsing.searchPage = true
}

// 请求获取视频详情目录
const lookUpItem = (item: any): void => {
  parsing.loading = true
  parsing.searchPage = false
  try {
    http.fetch(`${api}/getVideoUrl?url=${item.href}&type=${parsing.souritem}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'GET',
    }).then((res: any) => {
      if (res.data.length == 0) {
        parsing.loading = false
        return
      }
      parsing.data = res.data
      parsing.changeTabData = res.data.map(_res => {
        return _res[0].title + '-' + _res[_res.length - 1].title
      })
      parsing.loading = false
      changeTabIndex(0)
    })
  } catch (e) {

  } finally {
    parsing.detail = item
    parsing.isListShow = true
  }
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
      isHerald: isHerald == true ? '预告' : ''
    }
  })
}
const toLookVideo = (item: string): void => {
  const { api, options, souritem, sourTypes } = parsing
  parsing.url = options[api] + sourTypes[souritem] + item
  parsing.isListShow = false
  parsing.searchPage = false
}
function setClass() {
  if (parsing.changeTabData.length == 1) {
    if (parsing.listArr.length > 2) {
      return 'change'
    }
  }
}

const getSearch = async (value) => {
  const { data } = await http.fetch(`${api}/getSearch?name=${value}&type=${parsing.souritem}`, { headers: { 'Content-Type': 'application/json;charset=UTF-8', }, method: 'GET', })
  return data
}
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  getSearch(queryString).then((res: any) => {
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
      <el-select v-model="parsing.souritem" placeholder="Select">
        <el-option v-for="(item, index) in parsing.sourTypes" :key="index" :label="index" :value="index" />
      </el-select>
      接口：
      <el-select v-model="parsing.api" class="m-2" placeholder="Select">
        <el-option v-for="(item, index) in parsing.options" :key="index" :label="index" :value="index" />
      </el-select>
      <el-autocomplete v-model="parsing.input" :fetch-suggestions="querySearchAsync" placeholder="" @select="handleSelect"
        :debounce='300' class="Elutocomplete" @keydown.enter="getList">
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
        <el-empty v-if="parsing.listArr.length == 0" :image="empty" description="当前源找不到内容，请切换其他源" />
        <div v-else class="listContent" :class="setClass()">
          <LzyButton v-for="item in parsing.listArr" class="listItem" :key="item.title" @click="toLookVideo(item.url)"
            :msg="item.title" height="24px" :after="item.isHerald" />
        </div>
      </div>
    </div>
  </div>
  <div class="searchRes" v-if="parsing.searchPage">
    <!-- 搜索结果列表 -->
    <div class="searchResList">
      <div class="searchResItem" v-for="item in parsing.searchData" :key="item.title">
        <LzyCard @click="lookUpItem(item)" :data="item"></LzyCard>
        <p class="title">{{ item.title }}</p>
      </div>
    </div>
  </div>
  <iframe v-else allowFullScreen='true' width="99.5%" height="88%" sandbox="allow-scripts allow-same-origin"
    :src="parsing.url" />
</template>

<style lang="scss" scoped>
iframe {
  border-radius: 10px;
  border: 1px solid #eee;
  outline: #e53935;
  box-shadow: 1px 1px 10px #00000030, -1px -1px 10px #00000030;
  margin-left: 10px;
  background-color: #000;
}

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

    :deep(.el-select) {
      width: 120px;
    }

    :deep(.Elutocomplete) {
      flex: 1;
    }
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
