// 信息中心-------相关API接口
import request from '@/utils/request2'


// 传感器各种类数量统计
export function sensorNumber() {
  return request({
    url: '/v1.0/smc/wp/safety/sensor_number',
    method: 'get'
  })
}

// 传感器各种类状态统计
export function sensorStatus(query) {
  return request({
    url: '/v1.0/smc/wp/safety/sensor_status?sensortype=' + query,
    method: 'get',
  })
}

// 井下总人数
export function totalPerson() {
  return request({
    url: '/v1.0/smc/wp/personlocation/total_person',
    method: 'get'
  })
}

// 领导带班
export function leader() {
  return request({
    url: '/v1.0/smc/wp/production/leader',
    method: 'get'
  })
}

// 特殊工种
export function countByWorktype() {
  return request({
    url: '/v1.0/smc/wp/personlocation/count_by_worktype',
    method: 'get'
  })
}

// 人员定位卡低电量报警(加接收接口)
export function lowBattery() {
  return request({
    url: '/v1.0/smc/wp/personlocation/low_battery',
    method: 'get'
  })
}

// 区域人数统计
export function areaPerson() {
  return request({
    url: '/v1.0/smc/wp/personlocation/area_person',
    method: 'get'
  })
}