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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EntriesView.vue'),
    props: { mode: 'positions' }
  },
  {
    path: '/transfers/:id?',
    name: 'transfers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EntriesView.vue'),
    props: { mode: 'transfers' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
