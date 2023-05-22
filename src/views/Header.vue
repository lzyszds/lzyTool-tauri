<script setup lang='ts'>
import { analysis_Port } from "@/assets/data/parsings";
import { ref, nextTick } from 'vue'
import { ElSelect, ElOption, ElButton, ElAutocomplete } from 'element-plus';
import ToBtn from "@/components/ToBtn.vue";
import http from "@/utils/http";
import { ParsingType } from '@/types/parsingType';
import { IParams } from "@/types/shareType";
import useCounterStore from "@/store/store";
import { router } from "@/utils/router";
const { state, actions } = useCounterStore()

const options = analysis_Port //解析接口列表  
const sourTypes = ["腾讯", "全网"]
const input = ref('') //输入框

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  actions.setListShow(false)
  getSearch(queryString).then((res: any) => {
    cb(res)
  })
}
const handleSelect = (item) => {
  input.value = item.docname
  getList()
}

// 请求获取视频列表
const getList = (): void => {
  if (!input.value) return
  router.push('/search')
  // show('.parsing')
  const config: IParams = {
    url: `/getSearchList?name=${input.value}&type=${state.souritem}`,
    method: 'GET',
  }
  http(config).then((res: ParsingType[]) => {
    actions.setSearchData(res)
  })
  actions.setListShow(false)
  actions.setSearchShow(false)
}
const getSearch = async (value) => {
  const data = await http({ url: `/getSearch?name=${value}&type=${state.souritem}`, method: 'GET', })
  return data
}
nextTick(() => { getList() })
</script>

<template>
  <div class="header">
    <el-select v-model="state.souritem" placeholder="Select">
      <el-option v-for="(item, index) in sourTypes" :key="index" :label="item" :value="item" />
    </el-select>
    接口：
    <el-select v-model="state.parsApi" class="m-2" placeholder="Select">
      <el-option v-for="(item, index) in options" :key="index" :label="index" :value="index" />
    </el-select>
    <el-autocomplete v-model="input" :fetch-suggestions="querySearchAsync" placeholder="" @select="handleSelect"
      :debounce='300' class="Elutocomplete" @keydown.enter="getList">
      <template #default="{ item }">
        <div class="docname">{{ item.docname }}</div>
      </template>
    </el-autocomplete>
    <ElButton @click="getList" type="primary" style="margin: 0;">
      <i class="fa fa-search"></i>
    </ElButton>
    <ElButton @click="actions.setListShow()" type="primary" style="margin: 0;">
      <i class="fa fa-th-list"></i>
    </ElButton>
    <ElButton @click="actions.backHome" type="primary" style="margin: 0;">
      <i class="fa fa-home"></i>
    </ElButton>
  </div>
</template>

<style lang='scss' scoped>
.header {
  display: grid;
  grid-template-columns: 100px 50px 150px 1fr repeat(3, 60px);
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  padding-left: 0;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
