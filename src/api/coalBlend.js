// 智能配煤部分相关API接口
import request from '@/utils/request1'

// 智能配煤增加效益
export function todayBenefits(query) {
  return request({
    url: '/v1.0/smc/coal_blending/profits',
    method: 'get',
    params: query
  })
}

// 智能配煤效益对比 
export function profitsComparison() {
  return request({
    url: '/v1.0/smc/coal_blending/profits_comparison',
    method: 'get',
  })
}

// 工作面煤量监测
export function outputByHour() {
  return request({
    url: '/v1.0/smc/coal_blending/output_by_hour',
    method: 'get',
  })
}

// 上仓皮带煤质监测
export function heatingByHour() {
  return request({
    url: '/v1.0/smc/coal_blending/heating_by_hour',
    method: 'get',
  })
}

// 工作面煤量统计
export function outputByDay() {
  return request({
    url: '/v1.0/smc/coal_blending/output_by_day',
    method: 'get',
  })
}

// 最优配煤发热量
export function optimalHeat() {
  return request({
    url: '/v1.0/smc/coal_blending/optimal_heating',
    method: 'get',
  })
}

// 左翼与右翼煤量配比
export function optimalRatio() {
  return request({
    url: '/v1.0/smc/coal_blending/optimal_ratio',
    method: 'get',
  })
}

// 智能配煤方案
export function optimalPlan() {
  return request({
    url: '/v1.0/smc/coal_blending/optimal_plan',
    method: 'get',
  })
}

// 左右翼煤发热量
export function leftRightHeat(param) {
  return request({
    url: '/v1.0/smc/coal_blending/left_right_heating',
    method: 'get',
    params: param
  })
}

// 上仓标准线
export function optimalHeating() {
  return request({
    url: '/v1.0/smc/coal_blending/optimal_heating',
    method: 'get',
  })
}
