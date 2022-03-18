// 3.5 * 10 大屏-------相关api接口------左侧

import request from '@/utils/request2'

// 日产量 日掘进进尺  统计量
export function getoutput_forward_day() {
  return request({
    url: '/v1.0/smc/wp/production/output_forward_day',
    method: 'get'
  })
}
// 日产量 日掘进进尺   累计量
export function getoutput_forward_month() {
  return request({
    url: '/v1.0/smc/wp/production/output_forward_month',
    method: 'get'
  })
}
// 日产量 日掘进进尺  完成率
export function getoutput_forward_plan() {
  return request({
    url: '/v1.0/smc/wp/production/output_forward_plan',
    method: 'get'
  })
}
// 洗煤量  统计量
export function getwashing_day() {
  return request({
    url: '/v1.0/smc/wp/production/washing_day',
    method: 'get'
  })
}
// 洗煤量   累计量
export function getwashing_month() {
  return request({
    url: '/v1.0/smc/wp/production/washing_month',
    method: 'get'
  })
}
// 洗煤量  完成率
export function getwashing_plan() {
  return request({
    url: '/v1.0/smc/wp/production/washing_plan',
    method: 'get'
  })
}
// 日抽放打钻进尺  统计量
export function getdrilling_day() {
  return request({
    url: '/v1.0/smc/wp/production/drilling_day',
    method: 'get'
  })
}
// 日抽放打钻进尺   累计量
export function getdrilling_month() {
  return request({
    url: '/v1.0/smc/wp/production/drilling_month',
    method: 'get'
  })
}

// 日销量  统计量
export function getselling_day() {
  return request({
    url: '/v1.0/smc/wp/production/selling_day',
    method: 'get'
  })
}
// 日销量   累计量
export function getselling_month() {
  return request({
    url: '/v1.0/smc/wp/production/selling_month',
    method: 'get'
  })
}
// 日销量   累计量
export function getselling_plan() {
  return request({
    url: '/v1.0/smc/wp/production/selling_plan',
    method: 'get'
  })
}


// 上月吨煤电耗成本
export function getele_per_ton_last_month() {
  return request({
    url: '/v1.0/smc/wp/production/ele_per_ton_last_month',
    method: 'get'
  })
}
// 上月耗电量
export function getele_cons_last_month() {
  return request({
    url: '/v1.0/smc/wp/production/ele_cons_last_month',
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

// 仓量
export function bunkerWeight() {
  return request({
    url: '/v1.0/smc/wp/bunker/bunker_weight',
    method: 'get'
  })
}

// 仓位
export function bunkerMeter() {
  return request({
    url: '/v1.0/smc/wp/bunker/bunker_meter',
    method: 'get'
  })
}

// 日抽放打钻进尺完成率
export function drillingPlan() {
  return request({
    url: '/v1.0/smc/wp/production/drilling_plan',
    method: 'get'
  })
}

// 日人员功效
export function dailyOutputPerMan() {
  return request({
    url: '/v1.0/smc/wp/production/daily_output_per_man',
    method: 'get'
  })
}

// 日综采综掘主运开机率
export function systemOperationRate() {
  return request({
    url: '/v1.0/smc/wp/operation_rate/system_operation_rate',
    method: 'get'
  })
}

// 系统报警次数
export function systemAlarmCnts() {
  return request({
    url: '/v1.0/smc/wp/alarms/system_alarm_cnts',
    method: 'get'
  })
}

// 煤质分析
export function coalMassAnalysis() {
  return request({
    url: '/v1.0/smc/wp/coal_mass/coal_mass_analysis',
    method: 'get'
  })
}

// 本月安全风险管控统计
export function systemRisk() {
  return request({
    url: '/v1.0/smc/wp/safety/system_risk',
    method: 'get'
  })
}

// 本月风险管控按类别统计
export function riskByType() {
  return request({
    url: '/v1.0/smc/wp/safety/risk_by_type',
    method: 'get'
  })
}

// 风险实时监测
export function riskInfo() {
  return request({
    url: '/v1.0/smc/wp/safety/risk_info',
    method: 'get'
  })
}

// 本月风险管控按等级统计
export function riskByGradeYear() {
  return request({
    url: '/v1.0/smc/wp/safety/risk_by_grade_year',
    method: 'get'
  })
}

// 本月风险管控按区域统计
export function riskByArea() {
  return request({
    url: '/v1.0/smc/wp/safety/risk_by_area',
    method: 'get'
  })
}

// 当班入井总人数
export function downPerShift() {
  return request({
    url: '/v1.0/smc/wp/personlocation/down_per_shift',
    method: 'get'
  })
}

// 井下总人数
export function totalPerson() {
  return request({
    url: '/v1.0/smc/wp/personlocation/total_person',
    method: 'get'
  })
}

// 井下人员区域分布
export function areaPerson() {
  return request({
    url: '/v1.0/smc/wp/personlocation/area_person',
    method: 'get'
  })
}


// 本月区域安全风险管控
export function riskAreaLevel() {
  return request({
    url: '/v1.0/smc/wp/safety/risk_area_level',
    method: 'get'
  })
}



// 数据钻取
export function getSystemAlarm() {
  return request({
    url: '/v1.0/smc/wp/device/system_alarm',
    method: 'get'
  })
}


//  实时报警接口
export function alarmRealtime() {
  return request({
    url: '/v1.0/smc/wp/device/alarm_realtime',
    method: 'get'
  })
}
//  历史报警接口
export function alarmHistory() {
  return request({
    url: '/v1.0/smc/wp/device/alarm_history',
    method: 'get'
  })
}

//  系统综合指数接口
export function faultScore() {
  return request({
    url: '/v1.0/smc/intel_score/fault_score',
    method: 'get'
  })
}