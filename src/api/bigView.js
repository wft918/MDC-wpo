// 3.5 * 10 大屏-------相关api接口------左侧

import request from '@/utils/request1'

// 日产量 日掘进进尺 日洗煤量 日抽放打钻进尺 日销量  统计量
export function getdailyreport() {
  return request({
    url: '/v1.0/smc/wp/production/dailyreport',
    method: 'get'
  })
}
// 日产量 日掘进进尺 日洗煤量 日抽放打钻进尺 日销量   累计量
export function getmonthlyreportsummary() {
  return request({
    url: '/v1.0/smc/wp/production/monthlyreportsummary',
    method: 'get'
  })
}
// 日产量 日掘进进尺 日洗煤量 日抽放打钻进尺 日销量  完成率
export function getmonthlycomplete() {
  return request({
    url: '/v1.0/smc/wp/production/monthlycomplete',
    method: 'get'
  })
}

// 上月吨煤电耗成本
export function getelepertonlastmonth() {
  return request({
    url: '/v1.0/smc/wp/consume/elepertonlastmonth',
    method: 'get'
  })
}
// 日人员工效
export function getdailyoutputperman() {
  return request({
    url: '/v1.0/smc/wp/production/dailyoutputperman',
    method: 'get'
  })
}
// 上月耗电量
export function getelecostlastmonth() {
  return request({
    url: '/v1.0/smc/wp/consume/elecostlastmonth',
    method: 'get'
  })
}
// 开机率
export function getoperationrate() {
  return request({
    url: '/v1.0/smc/wp/device/operationrate',
    method: 'get'
  })
}


// 系统报警次数
export function getsystemalarms() {
  return request({
    url: '/v1.0/smc/wp/alarms/systemalarms',
    method: 'get'
  })
}


// 媒质分析
export function getcoalqualityanalysis() {
  return request({
    url: '/v1.0/smc/wp/production/coalqualityanalysis',
    method: 'get'
  })
}