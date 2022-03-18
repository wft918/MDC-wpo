// 效能分析 相关API接口
import request from '@/utils/request1'


// 产量分析
export function outputAnalyse(query) {
  return request({
    url: '/v1/smc/efficiency_analysis/this_month_output',
    method: 'get',
    params: query
  })
}

export function outputAnalyse2(query) {
  return request({
    url: '/v1/smc/efficiency_analysis/teamoutput',
    method: 'get',
    params: query
  })
}

//成本分析
export function costAnalyse(query) {
  return request({
    url: '/v1/smc/efficiency_analysis/this_month_cost',
    method: 'get',
    params: query
  })
}



export function costAnalyse2(query) {
  return request({
    url: '/v1/smc/efficiency_analysis/factor_cost',
    method: 'get',
    params: query
  })
}

//万吨煤成本
export function costAnalyse3(query) {
  return request({
    url: '/v1/smc/efficiency_analysis/monthly_cost',
    method: 'get',
    params: query
  })
}

//配煤实时 监测 monitor

//万吨煤时实 监测
export function Allmonitor(query) {
  return request({
    url: '/v1/smc/efficiency_analysis/time_per_ten_thousan_ton',
    method: 'get',
    params: query
  })
}

//平均人员功效
export function monitorPerson(query) {
  return request({
    url: '/v1/smc/efficiency_analysis/person_efficiency',
    method: 'get',
    params: query
  })
}

//时长
export function monitorTime(query) {
  return request({
    url: '/v1/smc/efficiency_analysis/team_efficiency',
    method: 'get',
    params: query
  })
}