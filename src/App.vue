<script setup lang="ts">
import { routes } from '@/utils/router'
import { ref } from 'vue';
import { RouteRecordRaw, RouterView, useRouter } from 'vue-router'
import Header from "@/views/Header.vue";
import Catalog from "@/views/Catalog.vue";
const activePath = ref<number>(0)

activePath.value = routes.findIndex((item: RouteRecordRaw) => {
  if (window.location.pathname === '/') return true
  return window.location.pathname.indexOf(item.path) === 0 && item.path !== '/'
})

</script>

<template>
  <!-- <TauriTab /> -->
  <div id="content">
    <div class="parsing">
      <Header />
      <Catalog />
    </div>
    <div class="item_content">
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </div>
</template>

<style scoped lang="scss">
#content {
  width: calc(100vw - 40px);
  overflow: hidden;
  height: calc(100vh - 40px);
  font-size: 1.6em;
  background-color: #fff;
  padding: 20px;

  .item_content {
    padding: 20px;
    padding-top: 0;
    background-color: #fff;
    // box-shadow: 0px 0 3px 0px #99999930;
  }
}
</style>
