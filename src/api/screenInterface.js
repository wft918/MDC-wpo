/**
 * 10m 大屏右侧接口
 */
import request from '@/utils/request1'

// 本月风险管控统计
export function systemrisk() {
  return request({
    url: '/v1.0/smc/wp/safety/systemrisk',
    method: 'get'
  })
}

// 本月风险管控按类别统计
export function risktypescore() {
  return request({
    url: '/v1.0/smc/wp/safety/risktypescore',
    method: 'get'
  })
}

// 风险实时监测
export function riskinfo() {
  return request({
    url: '/v1.0/smc/wp/safety/riskinfo',
    method: 'get'
  })
}

// 风险实时监测
export function riskarea() {
  return request({
    url: '/v1.0/smc/wp/safety/riskarea',
    method: 'get'
  })
}