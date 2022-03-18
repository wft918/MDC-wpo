// 智能启停部分相关API接口
import request from '@/utils/request1'

// 本月智能、手动启动次数和开机率
export function mainCoalFlowLastSttDur() {
  return request({
    url: '/v1.0/smc/smart_stt/main_coal_flow_last_stt_dur',
    method: 'get'
  })
}

// 手动、自动启动平均时长
export function startupDuration() {
  return request({
    url: '/v1.0/smc/smart_stt/avg_start_dur',
    method: 'get',
  })
}

// 手动、自动停止平均时长
export function stopupDuration() {
  return request({
    url: '/v1.0/smc/smart_stt/avg_stop_dur',
    method: 'get',
  })
}

// 子系统启动状态
export function startupStatus() {
  return request({
    url: '/v1.0/smc/smart_stt/system_status',
    method: 'get',
  })
}

// 子系统计划启动时长
export function startupDurationSon(query) {
  return request({
    url: '/v1.0/smc/smart_stt/planned_dur',
    method: 'get',
    params: query
  })
}

// 子系统近一周启动时长
export function startupDurationWeek(query) {
  return request({
    url: '/v1.0/smc/smart_stt/last_stt_dur',
    method: 'get',
    params: query
  })
}

// 获取本月总报警次数
export function totalAlarms() {
  return request({
    url: '/v1.0/smc/smart_stt/total_alarms',
    method: 'get',
  })
}

// 获取各子系统本月报警次数
export function systemAlarms() {
  return request({
    url: '/v1.0/smc/smart_stt/system_alarms',
    method: 'get',
  })
}

// 获取各子设备本月报警次数
export function deviceAlarms() {
  return request({
    url: '/v1.0/smc/smart_stt/device_alarms',
    method: 'get',
  })
}

// 子系统启动时长
export function systemStartTime(query) {
  return request({
    url: '/v1.0/smc/smart_stt/system_start_time',
    method: 'get',
    params: query
  })
}

// 主煤流系统启动时间 & 主煤流系统启动时长
export function mainCoalFlowStartTime() {
  return request({
    url: '/v1.0/smc/smart_stt/main_coal_flow_start_time',
    method: 'get',
  })
}

// 主煤流系统计划启动时长
export function mainCoalFlowPlannedDur(query) {
  return request({
    url: '/v1.0/smc/smart_stt/main_coal_flow_planned_dur',
    method: 'get',
    params: query
  })
}

// 实时启动状态细节
export function detailedStatus() {
  return request({
    url: '/v1.0/smc/smart_stt/start_detailed_status',
    method: 'get',
  })
}

// 实时停止状态细节
export function stopDetailedStatus() {
  return request({
    url: '/v1.0/smc/smart_stt/stop_detailed_status',
    method: 'get',
  })
}

// 下发指令
export function sttCommand(data) {
  return request({
    url: '/v1.0/smc/smart_stt/' + data,
    method: 'post',
  })
}

// 轮询状态查询
export function pageStatus() {
  return request({
    url: '/v1.0/smc/smart_stt/page_status',
    method: 'get',
  })
}

// 报警弹窗查询
export function alarmDetails() {
  return request({
    url: '/v1.0/smc/smart_stt/alarm_details',
    method: 'get',
  })
}

// 联系责任人
export function alarmContact() {
  return request({
    url: '/v1.0/smc/smart_stt/alarm_contact',
    method: 'post',
    data: [{ "keyType": "2" }]
  })
}

// 报警关闭
export function alarmClose() {
  return request({
    url: '/v1.0/smc/smart_stt/alarm_close',
    method: 'post',
    data: [{ "keyType": "2" }]
  })
}

// 主煤流系统启停状态、启停时间
export function mainCoalFlowStatus() {
  return request({
    url: '/v1.0/smc/smart_stt/main_coal_flow_status',
    method: 'get',
  })
}


// 智能启停监视  单独调用--视频接口

export function getsmart_stt_video() {
  return request({
    url:'/v1.0/smc/wp/smart_stt_video',
    method:'get'
  })
}
