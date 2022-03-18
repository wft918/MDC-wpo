//  日志相关接口
import request from '@/utils/request1'

// 获取 日志 列表
export function getAuditLogs(params) {
  return request({
    url: '/v1.0/smc/logs/audit_logs',
    method: 'get',
    params
  })
}

//  保存审计日志记录
export function postAuditLogs(data) {
  return request({
    url: '/v1.0/smc/logs/audit_logs',
    method: 'post',
    headers: {
      "Content-Type": "application/json; charset=utf-8'",
    },
    data: JSON.stringify(data)
  })
}