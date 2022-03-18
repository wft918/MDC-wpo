// 机电部页面--API接口
import request from '@/utils/request1'


// 关键设备效能分析  采煤机、掘进机、主运皮带开机率
export function getdeviceoperationrate() {
  return request({
    url: '/v1.0/smc/wp/device/deviceoperationrate',
    method: 'get'
  })
}
// 关键设备效能分析  水泵、空气机、主提升机开机率
export function getoperationratefill() {
  return request({
    url: '/v1.0/smc/wp/device/operationratefill',
    method: 'get'
  })
}


// 关键设备状态分析   状态
export function getstatus() {
  return request({
    url: '/v1.0/smc/wp/device/status',
    method: 'get'
  })
}
// 关键设备状态分析   累计运行时间
export function getdevicecumtime() {
  return request({
    url: '/v1.0/smc/wp/device/devicecumtime',
    method: 'get'
  })
}


// 关键设备维修分析   采煤机 掘进机  主运皮带 维修次数
export function getrepaircntsfill() {
  return request({
    url: '/v1.0/smc/wp/device/repaircntsfill',
    method: 'get'
  })
}
// 关键设备维修分析  空压机 通风机  主斜井提升机 维修次数
export function getrepaircnts() {
  return request({
    url: '/v1.0/smc/wp/device/repaircnts',
    method: 'get'
  })
}


// 生产能耗分析  昨日耗电量
export function geteleyesterday() {
  return request({
    url: '/v1.0/smc/wp/consume/eleyesterday',
    method: 'get'
  })
}
// 生产能耗分析  月度累计耗电量耗电量
export function getelecostlastmonth() {
  return request({
    url: '/v1.0/smc/wp/consume/elecostlastmonth',
    method: 'get'
  })
}
// 生产能耗分析  年度累计耗电量耗电量
export function getelethisyear() {
  return request({
    url: '/v1.0/smc/wp/consume/elethisyear',
    method: 'get'
  })
}


// 上月吨煤电能分析
export function getelepertonlastmonth() {
  return request({
    url: '/v1.0/smc/wp/consume/elepertonlastmonth',
    method: 'get'
  })
}