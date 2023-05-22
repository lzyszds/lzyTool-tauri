import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ParsingType, ListArrType, StoreType } from '@/types/parsingType'
import http from "@/utils/http";
import { router } from "@/utils/router";

const defindState = {
  isListShow: false,//是否显示列表
  searchShow: true,//是否显示搜索结果界面
  V_loading: false,//是否显示loading
  souritem: '腾讯',//当前选择的接口 腾讯|全网
  parsApi: "Jsonplayer",
  searchData: [] as ParsingType[],
  /* 下方是请求目录后的一些变量 */
  catalogDetails: {} as ParsingType,//视频详情数据
  catalogList: [] as ListArrType[][],//视频列表数据
  pagingTabDataList: [] as string[],//分页组数据
  pagingTabIndex: 0,//当前分页组的索引
  pagingTabData: [] as ListArrType[],//当前分页的数据
  activePlay: 0,//当前播放的索引
}
const localState = JSON.parse(localStorage.getItem("store")!) as StoreType || defindState
const useCounterStore = defineStore('counter', () => {
  const state = reactive(localState)
  const actions = {
    setListShow(val?) {
      state.isListShow = val === undefined ? !state.isListShow : val
    },
    setSearchShow(val?) {
      state.searchShow = val
    },
    setV_loading(val?) {
      state.V_loading = val
    },
    setSouritem(val?) {
      state.souritem = val
    },
    //搜索结果
    setSearchData(val: ParsingType[]) {
      state.searchData = val
    },
    /* 下方是目录需要修改变量 */
    setCatalogDetails(val) {
      state.catalogDetails = val
    },
    setCatalogList(val) {
      state.catalogList = val
    },
    setPagingTabData(val) {
      state.pagingTabData = val
    },
    setPagingTabDataList(val) {
      state.pagingTabDataList = val
    },
    setPagingTabIndex(val) {
      state.pagingTabIndex = val
    },
    setActivePlay(val) {
      state.activePlay = val
    },
    resetCatalog() {
      state.catalogDetails = {} as ParsingType
      state.catalogList = [] as ListArrType[][]
      state.pagingTabDataList = [] as string[]
      state.pagingTabIndex = 0
      state.pagingTabData = [] as ListArrType[]
    },
    // 改变标签索引
    changeTabIndex: (index?: number): void => {
      index = index ? index : state.pagingTabIndex
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
    },
    // 请求获取视频详情目录
    lookUpItem: (item: any, key: number): void => {
      console.log(`lzy  item:`, item)

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
          actions.changeTabIndex() // 切换到第一个tab
          localStorage.setItem("store", JSON.stringify(state))
        })
      } catch (e) {
        console.log(e);
      } finally {
        actions.setCatalogDetails(item)
        actions.setListShow(true)
      }
    },
    /* 返回首页,并且重置所有路由存储 */
    backHome: () => {
      router.push('/')
      actions.resetCatalog()
      actions.setListShow(false)
    }
  }
  return {
    state,
    actions,
  }
})

export default useCounterStore 
