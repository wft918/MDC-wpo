/**
 * 向window上挂载setSubSystemData、getSubSystemData方法
 * 不可修改
 */
Object.defineProperties(window, {
  setSubSystemData: {
    get() {
      return function(key, value) {
        localStorage.setItem(key, value)
      }
    },
    set(val) {
      console.log(val,'触发了set')
    }
  },
  getSubSystemData: {
    get() {
      return function(key) {
        return localStorage.getItem(key)
      }
    },
    set(val) {
      console.log(val,'触发了set')
    }
  }
})