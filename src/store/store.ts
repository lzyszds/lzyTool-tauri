import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ParsingType, ListArrType, StoreType } from '@/types/parsingType'

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

  }
  return {
    state,
    actions,
  }
})

export default useCounterStore 
