import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Parsing from "@/views/Parsing.vue";

const routes = [
  {
    path: "/",
    name: "首页",
    icon: '&#xe620;',
    component: Home, //注意，没有重定向就会出现两个一模一样的home页面
  },
  {
    path: "/about",
    name: "关于",
    icon: '&#xe63f;',
    component: About,
  },
  {
    path: "/parsing",
    name: "Tv",
    icon: '&#xe627;',
    component: Parsing,
  },
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

