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
      <!-- <img width="150" src="@/assets/images/logo.png" alt=""> -->
      <div class="tool">
        <RouterLink v-for="(item, index) in routes" :key="index" :to="item.path"
          :class="activePath == index ? 'active' : ''">
          <i class="iconfont" v-html="item.icon"></i>
          <span class="tooltip">{{ item.name }}</span>
          <!-- {{ item.name }} -->
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
  grid-template-columns: 100px 1fr;
  gap: 30px;
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  font-size: 1.6em;
  background-color: transparent;

  .column {
    background: #fff;
    padding-top: 20%;
    gap: 10px;
    text-align: center;
    box-shadow: 1px 0 3px 0px #eee;
    z-index: 9;

    img {
      border-radius: 10px;
      margin-bottom: 30px;
    }

    .tool {
      display: grid;
      grid-template-rows: repeat(10, 60px);
      gap: 10px;
      background-color: transparent;
      align-items: center;

      a {
        text-decoration: none;
        color: #000;
        padding: 10px;
        position: relative;

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

        // .tooltip::before {
        //   position: absolute;
        //   content: "";
        //   height: 8px;
        //   width: 8px;
        //   background: $themeColor;
        //   bottom: -3px;
        //   left: 0;
        //   top: 50%;
        //   transform: translate(-50%, -50%) rotate(45deg);
        //   transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        // }
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
