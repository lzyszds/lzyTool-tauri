import { createRouter, createWebHistory } from "vue-router";
import parsingIndex from "@/views/index.vue";
import parsingSearch from "@/views/SearchRes.vue";
import parsingPlay from "@/views/Play.vue";

const routes = [
  {
    path: '/',
    name: 'Content',
    component: parsingIndex,
  }, {
    path: '/search',
    name: 'Search',
    component: parsingSearch,
  }, {
    path: '/play',
    name: 'Play',
    component: parsingPlay,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    setTimeout(() => {
      document.querySelector('body')!.classList.remove('loading')
    }, 1000)
    return { top: 0 }
  },
});
//前置钩子
router.beforeEach(async (to: any) => {
  if (to.hash === '') {
    if (to.href.indexOf('userAdmin') != -1) return
    document.querySelector('.navbarContent')?.classList.remove('navbarContent100')
    document.querySelector('body')!.classList.add('loading')
  }
})


export { router, routes };

