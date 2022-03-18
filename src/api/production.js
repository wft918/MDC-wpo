/**
 * 矿领导 - 生产部分API接口
 */
import request from '@/utils/request1'

// 本日采煤量 进尺 装车数 销售量
export function dailyStats(query) {
  return request({
    url: '/v1.0/smc/production/daily_stats',
    method: 'get',
    params: query
  })
}

// 本日采煤量 进尺 装车数 销售量
export function plannedStats(query) {
  return request({
    url: '/v1.0/smc/production/planned_stats',
    method: 'get',
    params: query
  })
}

// 主煤流吨煤运输成本
export function unitCost() {
  return request({
    url: '/v1.0/smc/production/unit_cost',
    method: 'get',
  })
}

// 主煤流人员工效
export function peopleEfficiency() {
  return request({
    url: '/v1.0/smc/production/people_efficiency',
    method: 'get',
  })
}

// 本月耗电量
export function energyCost() {
  return request({
    url: '/v1.0/smc/production/energy_cost',
    method: 'get',
  })
}

// 综采 挖掘 主运开机率
export function operationRate(query) {
  return request({
    url: '/v1.0/smc/production/operation_rate',
    method: 'get',
    params: query
  })
}

// 环比
export function momRatio(query) {
  return request({
    url: '/v1.0/smc/production/mom_ratio',
    method: 'get',
    params: query
  })
}

// 本月总产量
export function monthOutput() {
  return request({
    url: '/v1/smc/efficiency_analysis/this_month_output',
    method: 'get',
  })
}

// 各生产队产煤量
export function teamoutput() {
  return request({
    url: '/v1/smc/efficiency_analysis/teamoutput',
    method: 'get',
  })
}
