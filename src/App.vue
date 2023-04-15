<script setup lang="ts">
import { routes } from './utils/router'
import { watch, ref } from 'vue';
import { RouteRecordRaw, RouterLink, RouterView, useRoute } from 'vue-router'
const router = useRoute()
const activePath = ref<number>(0)

activePath.value = routes.findIndex((item: RouteRecordRaw) => item.path === router.path)

//监听路由变化 从而改变pathActive 从而改变样式 
watch(() => {
  return router.path
}, (newVal) => {
  //循环浏览路线以查找当前路线的索引。
  activePath.value = routes.findIndex(item => item.path === newVal)
})
</script>

<template>
  <div id="content">
    <div class="column">
      <img width="150" src="@/assets/images/logo.png" alt="">
      <div class="tool">
        <RouterLink v-for="(item, index) in routes" :key="index" :to="item.path"
          :class="activePath == index ? 'active' : ''">
          <i class="fa fa-home fa-fw"></i>
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
    <div class="content">
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </div>
</template>

<style scoped lang="scss">
#content {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 30px;
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  font-size: 1.6em;
  background-color: transparent;

  .column {
    background: #fff;
    padding: 10px;
    padding-top: 20%;
    gap: 10px;
    text-align: center;
    box-shadow: 1px 0 3px 0px #eee;

    img {
      border-radius: 10px;
      margin-bottom: 30px;
    }

    .tool {
      display: grid;
      grid-template-rows: repeat(10, 45px);
      gap: 10px;
      background-color: transparent;

      a {
        text-decoration: none;
        color: #000;
        border-radius: 10px;
        padding: 10px;
        // background-color: #fff;
        // box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;

        &:hover {
          color: $themeColor;
        }

        &.active {
          background-color: $themeColor;
          color: #fff;
        }
      }
    }

  }

  .content {
    background-color: #fff;
    // box-shadow: -1px 0 3px 0px #eee;
  }
}

@media screen and (max-width: 860px) {
  #content {
    grid-template-columns: 165px 1fr;
    gap: 0px;

    .column {
      // display: none;
      // box-shadow: 1px 0 3px 0px #999;

      box-shadow: 1px 0 3px 0px #eee;
    }
  }
}
</style>
