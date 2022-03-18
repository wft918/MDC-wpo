// 调度中心页面--API接口
import request from '@/utils/request2'


// 中间部分  月计划产量、完成产量、完成率\月计划进尺、完成进尺、完成率
export function getproduction_report_month() {
  return request({
    url: '/v1.0/smc/wp/production/production_report_month',
    method: 'get'
  })
}
// 中间部分  月度销售及运量统计
export function getselling_report_month() {
  return request({
    url: '/v1.0/smc/wp/production/selling_report_month',
    method: 'get'
  })
}



// 井下区域超远情况统计
export function getarea_person() {
  return request({
    url: '/v1.0/smc/wp/personlocation/area_person',
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
//  当班入井总人数
export function getdown_per_shift() {
  return request({
    url: '/v1.0/smc/wp/personlocation/down_per_shift',
    method: 'get'
  })
}