import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '../components/MainPage.vue';
import GamePage from '../components/GamePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/game',
    name: 'GamePage',
    component: GamePage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
