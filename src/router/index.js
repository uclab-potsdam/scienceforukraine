import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    // redirect: 'transfers'
    // component: HomeView
    component: () => import(/* webpackChunkName: "positions" */ '../views/HomeView.vue')
  },
  {
    path: '/listings',
    name: 'listings',
    // redirect: 'transfers'
    // component: HomeView
    component: () => import(/* webpackChunkName: "positions" */ '../views/ListingsView.vue')
  },
  {
    path: '/d/:id',
    name: 'detail',
    component: () => import(/* webpackChunkName: "positions" */ '../views/DetailView.vue')
  },
  // info pages
  {
    path: '/help',
    name: 'help',
    component: () => import(/* webpackChunkName: "PageView" */ '../views/PageView.vue')
  },
  {
    path: '/support',
    name: 'support',
    component: () => import(/* webpackChunkName: "PageView" */ '../views/PageView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "PageView" */ '../views/PageView.vue')
  },
  {
    path: '/press',
    name: 'press',
    component: () => import(/* webpackChunkName: "PageView" */ '../views/PageView.vue')
  },
  {
    path: '/partners',
    name: 'partners',
    component: () => import(/* webpackChunkName: "PageView" */ '../views/PageView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "PageView" */ '../views/PageView.vue')
  },
  // redirects to support old link schema
  {
    path: '/positions',
    redirect: { name: 'listings' }
  },
  {
    path: '/positions/:id',
    redirect: { name: 'detail' }
  },
  {
    path: '/transfers',
    redirect: { name: 'listings' }
  },
  {
    path: '/transfers/:id',
    redirect: { name: 'detail' }
  },
  // external redirects
  {
    path: '/calendar',
    beforeEnter () { location.href = 'https://calendar.google.com/calendar/u/0/embed?src=info@scienceforukraine.eu&ctz=Europe/Warsaw' }
  },
  {
    path: '/submit',
    beforeEnter () { location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSdcyWM6L1ee-lI5ByMUDx6RBDskCLxvKDQ_yRqOr344wKAR9g/viewform' }
  },
  {
    path: '/UK-info',
    beforeEnter () { location.href = 'https://docs.google.com/document/d/1kSmhnTMkB_6-9byoevmHXN_XmDagi0513-RwHmSZRhc/edit' }
  },
  {
    path: '/uk-mentorship-programme',
    beforeEnter () { location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSflXx7XC1GGQE_AnEp1-rAYNFLnF9QzOOHVbrls89ejwlgMYQ/viewform' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.fullPath.substring(0, 2) === '/#') {
    const path = to.fullPath.substring(2)
    next(path)
    return
  }
  if (from.name != null && /\/[^#]+#/.test(to.fullPath)) {
    return
  }
  next()
})

export default router
