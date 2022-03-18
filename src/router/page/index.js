export default [
  {
    path: '/login',
    component: () => import('@/views/page/login/login.vue'),
    name: 'login',
    meta: { title: '系统登陆' },
  },
  {
    path: '/superScreen',
    component: () => import('@/views/page/superScreen/superScreen'),
    name: 'superScreen',
    meta: { title: '大屏' },
  },
  {
    path: '/bigView',
    component: () => import('@/views/page/bigView/bigView.vue'),
    name: 'bigView',
    meta: { title: '大屏' },
  },
  {
    path: '/bigViewTest',
    component: () => import('@/views/page/bigViewTest/bigView.vue'),
    name: 'bigViewTest',
    meta: { title: '大屏' },
  }
]