// 机电部页面--API接口
import request from '@/utils/request2'


// 大型设备状态监控   运行状态
export function getRunStatus() {
  return request({
    url: '/v1/smc/wp/device/run_status',
    method: 'get'
  })
}
// 大型设备状态监控   使用状态
export function getDeviceState() {
  return request({
    url: '/v1/smc/wp/device/state',
    method: 'get'
  })
}

// 工作面关键设备台账
export function getDeviceMetadata() {
  return request({
    url: '/v1/smc/wp/device/metadata',
    method: 'get'
  })
}

// 生产能耗分析   上月吨煤耗电量
export function getElepertonLastMonth() {
  return request({
    url: '/v1.0/smc/wp/production/ele_per_ton_last_month',
    method: 'get'
  })
}
// 生产能耗分析   上个月耗电量
export function getEleconsLastMonth() {
  return request({
    url: '/v1.0/smc/wp/production/ele_cons_last_month',
    method: 'get'
  })
}
// 生产能耗分析   年度累计耗电量
export function getEleconsYear() {
  return request({
    url: '/v1.0/smc/wp/production/ele_cons_year',
    method: 'get'
  })
}

// 上月区域耗电量
export function getEleconsEachZone() {
  return request({
    url: '/v1/smc/wp/production/ele_cons_each_zone',
    method: 'get'
  })
}