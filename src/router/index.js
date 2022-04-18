import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'transfers'
    // component: HomeView
  },
  {
    path: '/positions/:id?',
    name: 'positions',
    component: () => import(/* webpackChunkName: "positions" */ '../views/EntriesView.vue'),
    props: { mode: 'positions' }
  },
  {
    path: '/transfers/:id?',
    name: 'transfers',
    component: () => import(/* webpackChunkName: "transfers" */ '../views/EntriesView.vue'),
    props: { mode: 'transfers' }
  },
  {
    path: '/help',
    name: 'help',
    component: () => import(/* webpackChunkName: "help" */ '../views/PageView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
