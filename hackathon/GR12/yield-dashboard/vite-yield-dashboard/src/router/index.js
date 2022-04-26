import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/pages/Home.vue'),
    meta: {
      layout: 'content',
    },
  },

  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/pages/About.vue'),
    meta: {
      layout: 'content',
    },
  },

  // {
  //   path: '/SBP-Rewards',
  //   name: 'sbp-rewards',
  //   component: () => import('@/views/test/TestSBPVotes.vue'),
  //   meta: {
  //     layout: 'content',
  //   },
  // },

  // {
  //   path: '/Staking-Vite-Rewards',
  //   name: 'staking-vite-rewards',
  //   component: () => import('@/views/test/TestStakingVite.vue'),
  //   meta: {
  //     layout: 'content',
  //   },
  // },

  // {
  //   path: '/Staking-VX-Rewards',
  //   name: 'staking-vx-rewards',
  //   component: () => import('@/views/test/TestStakingVX.vue'),
  //   meta: {
  //     layout: 'content',
  //   },
  // },

  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/pages/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },

  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
