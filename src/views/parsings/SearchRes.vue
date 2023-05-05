<script setup lang='ts'>
import http from "@/utils/http";
import LzyCard from '@/components/LzyCard.vue';
import useCounterStore from "@/store/store";
const { state, actions } = useCounterStore()


// 请求获取视频详情目录
const lookUpItem = (item: any, key: number): void => {
  actions.setV_loading(true)

  try {
    actions.resetCatalog() // 重置所有目录数据
    // 更新详情数据
    http({
      url: `/getVideoUrl?url=${item.href}&type=${state.souritem}`,
      method: 'GET',
    }).then((res: any) => {
      if (res.length == 0) {
        return actions.setV_loading(false)
      }
      actions.setCatalogList(res)
      const changeTabData = res.map(_res => {
        return _res[0].title + '-' + _res[_res.length - 1].title
      })
      actions.setPagingTabDataList(changeTabData)
      actions.setV_loading(false)
      changeTabIndex(0)
      localStorage.setItem("store", JSON.stringify(state))
      actions.setListShow(true)
    })
  } catch (e) {
    console.log(e);
  } finally {
    actions.setCatalogDetails(item)
  }
}
// 改变标签索引
const changeTabIndex = (index: number): void => {
  // 设置当前指数
  actions.setPagingTabIndex(index)
  // 设置当前列表数据
  const activeList = state.catalogList[index].map((item: any) => {
    const isHerald = item.isNoStoreWatchHistory
    return {
      title: item.title,
      href: item.href,
      isNoStoreWatchHistory: isHerald == true ? '预告' : ''
    }
  })
  actions.setPagingTabData(activeList)
}
</script>

<template>
  <div class="searchRes">
    <!-- 搜索结果列表  -->
    <div class="searchResList">
      <div class="searchResItem" v-for="(item, index) in state.searchData" :key="item.title">
        <LzyCard @click="lookUpItem(item, index)" :data="item"></LzyCard>
        <p class="title">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
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
