// 管理驾驶舱   右侧 安全模块 相关API接口
import request from '@/utils/request1'


//  本月安全风险统计
export function safetyAll(query) {
  return request({
    url: '/v1.0/smc/safety/risk_cnts',
    method: 'get',
    params: query
  })
}

//本月风险类评估 
export function monthRisk(query) {
  return request({
    url: '/v1.0/smc/safety/risk_scores',
    method: 'get',
    params: query
  })
}

//风险实时监测
export function riskSupervise(query) {
  return request({
    url: '/v1.0/smc/safety/risk_detials',
    method: 'get',
    params: query
  })
}


//本月区域安全风险统计
export function monthStatistics(query) {
  return request({
    url: '/v1.0/smc/safety/area_risk_cnts',
    method: 'get',
    params: query
  })
}



