// 通风部接口
import request from '@/utils/request2'

// 瓦斯预警实时监控 -- 当前预警总数量
export function getGasAlarmTotal() {
  return request({
    url:'/v1.0/smc/wp/safty/gas_alarm_total',
    method:'get'
  })
}
// 瓦斯预警实时监控 -- 当前预警各级别数量
export function getGasAlarmByGroup() {
  return request({
    url:'/v1.0/smc/wp/safty/gas_alarm_by_group',
    method:'get'
  })
}
// 瓦斯预警实时监控 -- 当前预警内容（预警时间，预警内容，预警级别，预警地点）
export function getGasAlarm() {
  return request({
    url:'/v1.0/smc/wp/safty/gas_alarm',
    method:'get'
  })
}


// 抽放打钻进尺统计 -- 月打钻计划
export function getDrillingPlan() {
  return request({
    url:'/v1.0/smc/wp/production/drilling_plan',
    method:'get'
  })
}
// 抽放打钻进尺统计 -- 月达钻累计进尺
export function getDrillingMonth() {
  return request({
    url:'/v1.0/smc/wp/production/drilling_month',
    method:'get'
  })
}
// 抽放打钻进尺统计 -- 日实际打钻进尺
export function getDrillingDay() {
  return request({
    url:'/v1.0/smc/wp/production/drilling_day',
    method:'get'
  })
}
// 抽放打钻进尺统计 -- 近七日打钻进尺
export function getDrillingWeek() {
  return request({
    url:'/v1.0/smc/wp/production/drilling_week',
    method:'get'
  })
}
// 抽放打钻进尺统计 -- 近七月各月累积打钻进尺
export function getDrillingMonths() {
  return request({
    url:'/v1.0/smc/wp/production/drilling_7months',
    method:'get'
  })
}
// 抽放打钻进尺统计 -- 年度累积打钻进尺
export function getDrillingYear() {
  return request({
    url:'/v1.0/smc/wp/production/drilling_year',
    method:'get'
  })
}



// 通风机、抽放泵启停状态分析 -- 每个通风机实时启停状态
export function getTongfengjiStatus() {
  return request({
    url:'/v1.0/smc/wp/device/tongfengji_status',
    method:'get'
  })
}
// 通风机、抽放泵启停状态分析 -- 每个通风机当前状态持续时间
export function getTongfengjiLastStausTime() {
  return request({
    url:'/v1.0/smc/wp/device/tongfengji_last_staus_time',
    method:'get'
  })
}
// 通风机、抽放泵启停状态分析 -- 每个抽放泵实时启停状态
export function getChoufangbengStaus() {
  return request({
    url:'/v1.0/smc/wp/device/choufangbeng_staus',
    method:'get'
  })
}
// 通风机、抽放泵启停状态分析 -- 每个抽放泵当前状态持续时间
export function getChoufangbengLastStatusTime() {
  return request({
    url:'/v1.0/smc/wp/device/choufangbeng_last_status_time',
    method:'get'
  })
}


// 通风机瞬时风量 -- 每个主要通风机、局部通风机瞬时风量
export function getTongfengAmount() {
  return request({
    url:'/v1.0/smc/wp/safty/tongfeng_amount',
    method:'get'
  })
}
// 通风机瞬时风量 -- 各通风机历史风量
export function getTongfengAmountHistory() {
  return request({
    url:'/v1.0/smc/wp/safty/tongfeng_amount_history',
    method:'get'
  })
}


// 通风阻力监控 -- 通风阻力
export function getTongfengZuli() {
  return request({
    url:'/v1.0/smc/wp/safty/tongfeng_zuli',
    method:'get'
  })
}
// 通风阻力监控 -- 历史风阻
export function getTongfengZuliHistory() {
  return request({
    url:'/v1.0/smc/wp/safty/tongfeng_zuli_history',
    method:'get'
  })
}


// 瓦斯抽采率 -- 每日全矿通风量、每日全矿瓦斯抽放量、每日全矿绝对瓦斯涌出量
export function getGasHistory() {
  return request({
    url:'/v1.0/smc/wp/safty/gas_history',
    method:'get'
  })
}