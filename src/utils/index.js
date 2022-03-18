import store from '@/store'
/**
 * 权限方法
 * 是否有该菜单的权限
 * @param {*} key
 */
export function hasPermission_test(key) {
  let rules = window.ruleList[key] || []
  let permissions = JSON.parse(localStorage.getItem('permissions') || '[]')
  if (permissions && permissions.length) {
    for (let i = 0; i < permissions.length; i++) {
      if (rules.indexOf(permissions[i]) !== -1) {
        return true
      }
    }
    return false
  } else {
    return false
  }
}

/**
 * 权限方法
 * 是否拥有该菜单的权限
 * @param {*} code  资源名称
 */
export function hasPermission(code) {
  let menuCodes = JSON.parse(localStorage.getItem('resources') || '[]').filter(arr => arr.type == 'MENU' || arr.code == '*').map(item => item.code) || []
  if (menuCodes.indexOf('*') !== -1) return true
  return menuCodes.indexOf(code) !== -1 || false
}

/**
 * 深拷贝（引用类型）
 */
export function deepClone(source) {
  const targetObj = source.constructor === Array ? [] : {}
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object') {
        targetObj[key] = deepClone(source[key])
      } else {
        targetObj[key] = source[key]
      }
    }
  }
  return targetObj
}

/**
 * 清除登录信息
 */
export function cleraLoginInfo() {
  localStorage.removeItem('resources')
  localStorage.removeItem('permissions')
  store.commit('resetStore')
}

export default { hasPermission_test, hasPermission, deepClone }