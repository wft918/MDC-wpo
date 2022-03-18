// 启停状态管理

/*
 * 启动状态
 */
export default {
  namespaced: true,
  state: {
    // 启停状态 0-等待启动；1-启动中；2-正常运行；3-停止中
    statu: 0,
    //32字符串状态码，0-15位表示综采工作面，16-31位表示主运输系统
    statusCode:''
  },
  mutations: {
    updateStatus(state, statu) {
      state.statu = statu
    },
    updateStatusCode(state,code) {
      state.statusCode = code
    }
  }
}
