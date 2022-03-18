// 机电部页面--API接口
import request from '@/utils/request2'


// 生产能耗分析  月度累计耗电量耗电量
export function getele_cons_last_month() {
  return request({
    url: '/v1.0/smc/wp/production/ele_cons_last_month',
    method: 'get'
  })
}
// 生产能耗分析  年度累计耗电量耗电量
export function getele_cons_year() {
  return request({
    url: '/v1.0/smc/wp/production/ele_cons_year',
    method: 'get'
  })
}


// 上月吨煤电能分析
export function getele_per_ton_last_month() {
  return request({
    url: '/v1.0/smc/wp/production/ele_per_ton_last_month',
    method: 'get'
  })
}

// 关键设备效能分析
export function deviceOperationRate() {
  return request({
    url: '/v1.0/smc/wp/operation/device_operation_rate',
    method: 'get'
  })
}

// 关键设备维修分析
export function repairCnts() {
  return request({
    url: '/v1.0/smc/wp/device/repair_cnts',
    method: 'get'
  })
}

// 关键设备状态
export function deviceStatus() {
  return request({
    url: '/v1.0/smc/wp/device/device_status',
    method: 'get'
  })
}

// 关键设备时间
export function deviceCumTime() {
  return request({
    url: '/v1.0/smc/wp/device/device_cum_time',
    method: 'get'
  })
}