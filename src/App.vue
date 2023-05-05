<script setup lang="ts">
import { routes } from './utils/router'
import { ref } from 'vue';
import { RouteRecordRaw, RouterView, useRouter } from 'vue-router'
const router = useRouter()
const activePath = ref<number>(0)

activePath.value = routes.findIndex((item: RouteRecordRaw) => {
  if (window.location.pathname === '/') return true
  return window.location.pathname.indexOf(item.path) === 0 && item.path !== '/'
})



//监听路由变化 从而改变pathActive 从而改变样式 
// watch(() => {
//   return route.path
// }, (newVal) => {
//   //循环浏览路线以查找当前路线的索引。
//   activePath.value = routes.findIndex(item => item.path === newVal)
// })
const toLink = (item, index) => {
  activePath.value = index
  if (item.path === '/parsing') {
    router.push("/parsing/index")
    return
  }
  router.push(item.path)
}
</script>

<template>
  <!-- <TauriTab /> -->
  <div id="content">
    <div class="column">
      <div class="tool">
        <div class="link" v-for="(item, index) in routes" :key="index" @click="toLink(item, index)"
          :class="activePath == index ? 'active' : ''">
          <i class="iconfont" v-html="item.icon"></i>
          <!-- <span class="tooltip">{{ item.name }}</span> -->
        </div>
      </div>
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
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 30px;
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  font-size: 1.6em;
  background-color: #fff;

  .column {
    display: flex;
    grid-template-rows: 1fr 300px 1fr;
    background: #fff;
    gap: 10px;
    text-align: center;
    box-shadow: 1px 0 3px 0px #eee;
    z-index: 9;

    img {
      border-radius: 10px;
      margin-bottom: 30px;
    }

    .tool {
      width: 100%;
      display: grid;
      grid-template-rows: repeat(5, 60px);
      grid-row-start: 2;
      gap: 10px;
      background-color: transparent;
      align-items: center;
      margin-top: 300px;

      div.link {
        cursor: pointer;
        text-decoration: none;
        color: #000;
        padding: 10px;
        position: relative;
        padding-left: 0px;

        .iconfont {
          font-size: 1.6em;
        }

        &:hover {
          color: $themeColor;

          .tooltip {
            left: 120%;
            transform: translate();
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }
        }

        &.active {
          &:after {
            content: '';
            position: absolute;
            top: 0;
            height: 100%;
            border-radius: 0 10px 10px 0;
            left: 0;
            color: $themeColor;
            border-left: 4px solid $themeColor;
          }
        }

        .tooltip {
          position: absolute;
          top: 50%;
          left: 110%;
          width: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
          color: #ffffff;
          background: $themeColor;
          padding: 5px 8px;
          border-radius: 5px;
          box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      }
    }

  }

  .item_content {
    padding: 20px;
    background-color: #fff;
    // box-shadow: 0px 0 3px 0px #99999930;
  }
}

@media screen and (max-width: 860px) {
  #content {
    grid-template-columns: 80px 1fr;
    gap: 0px;

    .column {
      box-shadow: 1px 0 3px 0px #eee;
    }
  }
}
</style>
