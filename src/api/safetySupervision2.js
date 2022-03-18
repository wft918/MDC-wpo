// 安监部 相关API接口 request2
import request from '@/utils/request2'


// 安全监控  传感器各种类数量统计1
export function getsensor_number() {
  return request({
    url: '/v1.0/smc/wp/safety/sensor_number',
    method: 'get'
  })
}
// 安全监控  传感器各种类状态统计1
export function getsensor_status(params) {
  return request({
    url: '/v1.0/smc/wp/safety/sensor_status',
    method: 'get',
    params:params
  })
}


// 月度三违统计1
export function gettrouble_all() {
  return request({
    url: '/v1.0/smc/wp/safety/trouble_all',
    method: 'get'
  })
}


// 井下总人数1
export function gettotal_person() {
  return request({
    url: '/v1.0/smc/wp/personlocation/total_person',
    method: 'get'
  })
}
// 人员下井情况  昨日各班下井人数1
export function getlast_day_down_per_shift() {
  return request({
    url: '/v1.0/smc/wp/personlocation/last_day_down_per_shift',
    method: 'get'
  })
}
// 人员下井情况  昨日下井总人数1
export function getlast_day_total_down() {
  return request({
    url: '/v1.0/smc/wp/personlocation/last_day_total_down',
    method: 'get'
  })
}
// 井下人员区域分布1
export function getarea_person() {
  return request({
    url: '/v1.0/smc/wp/personlocation/area_person',
    method: 'get'
  })
}


// 年度风险分析  等级1
export function getrisk_by_grade_year() {
  return request({
    url: '/v1.0/smc/wp/safety/risk_by_grade_year',
    method: 'get'
  })
}
// 年度风险分析  专业1
export function getrisk_type_year() {
  return request({
    url: '/v1.0/smc/wp/safety/risk_type_year',
    method: 'get'
  })
}


// 月度隐患分析  等级
export function gettrouble_level() {
  return request({
    url: '/v1.0/smc/wp/safety/trouble_level ',
    method: 'get'
  })
}
// 月度隐患分析  专业
export function gettrouble_by_category() {
  return request({
    url: '/v1.0/smc/wp/safety/trouble_by_category',
    method: 'get'
  })
}


// 顶板离层压力实时检测（顶板离层警戒、预警值）1
export function getmonitordata_dbalarm(params) {
  return request({
    url: '/v1.0/smc/wp/monitordata/monitordata_dbalarm',
    method: 'get',
    params:params
  })
}
// 顶板离层压力实时检测（顶板离层压力）1
export function getmonitordata_dblc(params) {
  return request({
    url: '/v1.0/smc/wp/monitordata/monitordata_dblc',
    method: 'get',
    params:params
  })
}