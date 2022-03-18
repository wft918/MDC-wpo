// 生产部页面--API接口
import request from '@/utils/request1'


// 未闭合隐患及月度隐患统计   月度未闭合隐患统计
export function getsystem_trouble_on() {
  return request({
    url: '/v1.0/smc/wp/safety/system_trouble_on',
    method: 'get'
  })
}
// 未闭合隐患及月度隐患统计   月度隐患统计
export function getsystem_trouble() {
  return request({
    url: '/v1.0/smc/wp/safety/system_trouble',
    method: 'get'
  })
}


// 月度三违统计
export function getsystem_violation() {
  return request({
    url: '/v1.0/smc/wp/safety/system_violation',
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



// 月计划产量、完成产量、完成率    月计划进尺、完成进尺、完成率
export function getmonthlyreport() {
  return request({
    url: '/v1.0/smc/wp/production/monthlyreport',
    method: 'get'
  })
}



// 主设备开机率（周）
export function getweekly_operation_rate() {
  return request({
    url: '/v1.0/smc/wp/device/weekly_operation_rate',
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


// 锚杆锚索受力实时监测（锚杆锚索低报高报）
export function getalarmrange(params) {
  return request({
    url: '/v1.0/smc/wp/pressure/alarmrange',
    method: 'get',
    params:params
  })
}
// 锚杆锚索受力实时监测（受力）
export function getforce(params) {
  return request({
    url: '/v1.0/smc/wp/pressure/force',
    method: 'get',
    params:params
  })
}


// 综采立柱压力实时监测
export function getsupportpressure() {
  return request({
    url: '/v1.0/smc/wp/pressure/supportpressure',
    method: 'get'
  })
}