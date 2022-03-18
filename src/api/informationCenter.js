// 信息中心-------相关API接口
import request from '@/utils/request1'


// 安全监控   传感器各种类数量统计
export function getsensorcnts() {
  return request({
    url: '/v1.0/smc/wp/safety/sensorcnts',
    method: 'get'
  })
}
// 安全监控   传感器各种类状态统计
export function getsensorstatus(params) {
  return request({
    url: '/v1.0/smc/wp/safety/sensorstatus',
    method: 'get',
    params:params
  })
}


// 人员车辆   井下总人数
export function gettotalperson() {
  return request({
    url: '/v1.0/smc/wp/personlocation/totalperson',
    method: 'get'
  })
}
// 人员车辆   领导带班
export function getleader() {
  return request({
    url: '/v1.0/smc/wp/personlocation/leader',
    method: 'get'
  })
}
// 人员车辆   特殊工种(各类人员统计)
export function getcountbyworktype() {
  return request({
    url: '/v1.0/smc/wp/personlocation/countbyworktype',
    method: 'get'
  })
}
// 人员车辆   区域人数统计
export function getareaperson() {
  return request({
    url: '/v1.0/smc/wp/personlocation/areaperson',
    method: 'get'
  })
}