import Vue from "vue";
import Vuex from "vuex";
import startStopStatus from './modules/startStopStatus'
import common from './modules/common'
import { deepClone } from '@/utils'


Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {
    // 重置Vuex状态
    resetStore(state) {
      Object.keys(state).forEach(key => {
        state[key] = deepClone(window.SITE_CONFIG['storeState'][key])
      })
    }
  },
  modules: {
    startStopStatus,
    common,
  },
});
