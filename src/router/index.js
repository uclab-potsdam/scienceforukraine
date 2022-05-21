import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
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
    path: '/team',
    name: 'team',
    component: () => import(/* webpackChunkName: "PageView" */ '../views/PageView.vue')
  },
  // redirects to support old link schema
  {
    path: '/positions',
    redirect: { name: 'home' }
  },
  {
    path: '/positions/:id',
    redirect: { name: 'detail' }
  },
  {
    path: '/transfers',
    redirect: { name: 'home' }
  },
  {
    path: '/transfers/:id',
    redirect: { name: 'detail' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
