// 安监部 相关API接口
import request from '@/utils/request1'


// 安全监控  传感器各种类数量统计
export function getsensorcnts() {
  return request({
    url: '/v1.0/smc/wp/safety/sensorcnts',
    method: 'get'
  })
}
// 安全监控  传感器各种类状态统计
export function getsensorstatus(params) {
  return request({
    url: '/v1.0/smc/wp/safety/sensorstatus',
    method: 'get',
    params:params
  })
}


// 月度三违统计
export function getsystemviolation() {
  return request({
    url: '/v1.0/smc/wp/personlocation/systemviolation',
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
// 人员下井情况  每日早、中、晚班下井人数
export function getdownpershift() {
  return request({
    url: '/v1.0/smc/wp/personlocation/downpershift',
    method: 'get'
  })
}
// 人员下井情况  每日下井总人数
export function gettotaldown() {
  return request({
    url: '/v1.0/smc/wp/personlocation/totaldown',
    method: 'get'
  })
}
// 井下人员区域分布
export function getareaperson() {
  return request({
    url: '/v1.0/smc/wp/personlocation/areaperson',
    method: 'get'
  })
}


// 年度风险分析  等级
export function getannualrisk() {
  return request({
    url: '/v1.0/smc/wp/safety/annualrisk',
    method: 'get'
  })
}
// 年度风险分析  专业
export function getannualriskspec() {
  return request({
    url: '/v1.0/smc/wp/safety/annualriskspec',
    method: 'get'
  })
}


// 月度隐患分析  等级
export function gettroublelevel() {
  return request({
    url: '/v1.0/smc/wp/personlocation/troublelevel',
    method: 'get'
  })
}
// 月度隐患分析  专业
export function gettroublespec() {
  return request({
    url: '/v1.0/smc/wp/personlocation/troublespec',
    method: 'get'
  })
}


// 顶板离层压力实时检测（顶板离层警戒、预警值）
export function getroofwarning(params) {
  return request({
    url: '/v1.0/smc/wp/pressure/roofwarning',
    method: 'get',
    params:params
  })
}
// 顶板离层压力实时检测（顶板离层压力）
export function getroofseparationwarning(params) {
  return request({
    url: '/v1.0/smc/wp/pressure/roofseparationwarning',
    method: 'get',
    params:params
  })
}