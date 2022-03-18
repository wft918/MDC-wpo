// 调度中心页面--API接口
import request from '@/utils/request1'


// 生产指标
export function getdailyreport() {
  return request({
    url: '/v1.0/smc/wp/production/dailyreport',
    method: 'get'
  })
}


// 井下区域超员情况统计
export function getareaperson() {
  return request({
    url: '/v1.0/smc/wp/personlocation/areaperson',
    method: 'get'
  })
}


// 中间部分
export function getmonthlyreport() {
  return request({
    url: '/v1.0/smc/wp/production/monthlyreport',
    method: 'get'
  })
}



// 井下总人数
export function gettotalperson() {
  return request({
    url: '/v1.0/smc/wp/personlocation/totalperson',
    method: 'get'
  })
}
// 当班入井总人数
export function getdownpershift() {
  return request({
    url: '/v1.0/smc/wp/personlocation/downpershift',
    method: 'get'
  })
}
// 领导带班
export function getleader() {
  return request({
    url: '/v1.0/smc/wp/personlocation/leader',
    method: 'get'
  })
}