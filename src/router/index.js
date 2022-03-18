import Vue from "vue";
import VueRouter from "vue-router";
import { AuthenticationClient } from 'authing-js-sdk'
import { cleraLoginInfo } from '@/utils'
import { postAuditLogs } from '@/api/logapi'
import pageRouter from './page'
import viewsRouter from './views'
const authenticationClient = new AuthenticationClient({
  appId: process.env.VUE_APP_APP_ID,
  appHost: process.env.VUE_APP_APP_HOST,
  token: localStorage.getItem('_authing_token')
})

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [ ...pageRouter, ...viewsRouter ],
});

//解决 Vue 重复点击相同路由，出现 Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation 问题
const VueRouterReplace = VueRouter.prototype.replace
  VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)

}

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('_authing_token')
  if (!token) {
    if (to.path != '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    if(to.path == '/login') {
      const userInfo = JSON.parse(localStorage.getItem('_authing_user')) || {}
      authenticationClient.logout().then(() => {
        cleraLoginInfo()
      })
      postAuditLogs([{
        user_id: userInfo.id || '',
        staff_id: userInfo.id || '',
        ip: '192.168.78.15',
        op_type: '6',
        op_desc: `${userInfo.username || ''}登出系统`,
        log_level: '一般',
        business_system: process.env.VUE_APP_BUSINESS_SYSTEM.split(',')[0]
      }]).then(data => {}).catch(err => {})
    }
    next()
  }
})

export default router;
