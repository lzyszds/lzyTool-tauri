<script setup lang='ts'>
import LzyCard from '@/components/LzyCard.vue';
import useCounterStore from "@/store/store";
const { state, actions } = useCounterStore()


</script>

<template>
  <div class="searchRes">
    <!-- 搜索结果列表  -->
    <div class="searchResList">
      <div class="searchResItem" v-for="(item, index) in state.searchData" :key="item.title">
        <LzyCard @click="actions.lookUpItem(item, index)" :data="item"></LzyCard>
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

// @media screen and (max-width: 1700px) {
//   .searchResList {
//     grid-template-columns: repeat(6, 1fr);
//   }
// }

// @media screen and (max-width: 1500px) {
//   .searchResList {
//     grid-template-columns: repeat(5, 1fr);
//   }
// }

// @media screen and (max-width: 1250px) {
//   .searchResList {
//     grid-template-columns: repeat(4, 1fr);
//   }
// }

// @media screen and (max-width: 1050px) {
//   .searchResList {
//     grid-template-columns: repeat(3, 1fr);
//   }
// }
</style>
