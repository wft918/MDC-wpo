import Vue from "vue";
import vueCookie from 'vue-cookies'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dataV from '@jiaminghi/data-view'
import '@/assets/font/font.css'
import 'video.js/dist/video-js.css'
import utils from "@/utils";
import { deepClone } from '@/utils'
import { numberToCurrencyNo } from '@/utils/numberToCurrency'
import highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'

highcharts3d(highcharts)

// 配置全局过滤器，实现数字千分位格式
Vue.filter('numberToCurrency', numberToCurrencyNo)


Vue.config.productionTip = false;

Vue.use(vueCookie)
Vue.use(ElementUI);
Vue.use(dataV)


// 挂载全局
Vue.prototype.$events = new Vue()
Vue.prototype.hasPermission = utils.hasPermission  //权限方法

window.SITE_CONFIG = {}
window.SITE_CONFIG['storeState'] = deepClone(store.state)

console.log('版本号 V2.0.1')


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
