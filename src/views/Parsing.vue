<script setup lang='ts'>
import Header from "./parsings/Header.vue";
import Catalog from "./parsings/Catalog.vue";
import { router } from "@/utils/router";
if (router.currentRoute.value.path === '/parsing') {
  router.push("/parsing/index")
}

// ui参考
// https://dribbble.com/shots/16916297-Zush-Dark-Mode-Animation
</script>
<template>
  <div class="parsing">
    <Header />
    <Catalog />
  </div>
  <router-view class="router-view"> </router-view>
</template>

<style lang="scss" scoped>
.iframe {
  height: 88%;
  border-radius: 10px;
  outline: #e53935;
  box-shadow: 1px 1px 10px #00000030, -1px -1px 10px #00000030;
  margin: 0 1%;
  background-color: #fff;
  border: 10px solid #000;
  position: relative;

  & .iconfont {
    position: absolute;
    font-size: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
  }
}

.parsing {
  padding-bottom: 0;
  background-color: #ffffff30;
  backdrop-filter: blur(40px);
  position: relative;
  z-index: 1;
}
</style>
