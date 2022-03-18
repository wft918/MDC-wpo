import { number } from "echarts"

export default {
  namespaced: true,
  state: {
    mainTabs: [],  // 路由tag页签
  },
  mutations: {
    updatemainTabs(state, val) {
      // console.log(val,'val---->') //路由对象 或者 删除当前路由对象的索引
      if(val.constructor == Object) { //存路由对象
        if(state.mainTabs.every(item => item.path != val.path)) {
          if(state.mainTabs.length < 14) {
            state.mainTabs.push(val)
          }else {
            state.mainTabs.splice(0,1)
            state.mainTabs.push(val)
          }
        }
      }else { //删除路由对象
        state.mainTabs.splice(val,1)
      }
    },
  }
}
