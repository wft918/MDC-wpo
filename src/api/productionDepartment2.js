// 生产部页面--API接口
import request from '@/utils/request2'




// 未闭合隐患及月度隐患统计   月度未闭合隐患统计
export function gettrouble_still_on() {
  return request({
    url: '/v1.0/smc/wp/safety/trouble_still_on',
    method: 'get'
  })
}
// 未闭合隐患及月度隐患统计   月度隐患统计
export function gettrouble_count() {
  return request({
    url: '/v1.0/smc/wp/safety/trouble_count',
    method: 'get'
  })
}


// 月度三违统计
export function gettrouble_all() {
  return request({
    url: '/v1.0/smc/wp/safety/trouble_all',
    method: 'get'
  })
}

// 井下人员区域分布
export function getarea_person() {
  return request({
    url: '/v1.0/smc/wp/personlocation/area_person',
    method: 'get'
  })
}


// 月计划产量、完成产量、完成率    月计划进尺、完成进尺、完成率
export function getproduction_report_month() {
  return request({
    url: '/v1.0/smc/wp/production/production_report_month',
    method: 'get'
  })
}


// 主设备开机率
export function getweekly_operation_rate() {
  return request({
    url: '/v1.0/smc/wp/operation_rate/weekly_operation_rate',
    method: 'get'
  })
}


// 井下总人数
export function gettotal_person() {
  return request({
    url: '/v1.0/smc/wp/personlocation/total_person',
    method: 'get'
  })
}
// 当班入井总人数
export function getdown_per_shift() {
  return request({
    url: '/v1.0/smc/wp/personlocation/down_per_shift',
    method: 'get'
  })
}
// 领导带班
export function getleader() {
  return request({
    url: '/v1.0/smc/wp/production/leader',
    method: 'get'
  })
}


// 顶板离层压力实时检测（顶板离层警戒、预警值）
export function getmonitordata_dbalarm(params) {
  return request({
    url: '/v1.0/smc/wp/monitordata/monitordata_dbalarm',
    method: 'get',
    params:params
  })
}
// 顶板离层压力实时检测（顶板离层压力）
export function getmonitordata_dblc(params) {
  return request({
    url: '/v1.0/smc/wp/monitordata/monitordata_dblc',
    method: 'get',
    params:params
  })
}


// 锚杆锚索受力实时监测（锚杆锚索低报高报）
export function getmg_alarm(params) {
  return request({
    url: '/v1.0/smc/wp/monitordata/mg_alarm',
    method: 'get',
    params:params
  })
}
// 锚杆受力实时监测（受力）
export function getmonitordata_mgyl(params) {
  return request({
    url: '/v1.0/smc/wp/monitordata/monitordata_mgyl',
    method: 'get',
    params:params
  })
}
// 锚索受力实时监测（受力）
export function getms(params) {
  return request({
    url: '/v1.0/smc/wp/monitordata/ms',
    method: 'get',
    params:params
  })
}


// 综采立柱压力实时监测
export function getmonitordata_zjzl() {
  return request({
    url: '/v1.0/smc/wp/monitordata/monitordata_zjzl',
    method: 'get'
  })
}