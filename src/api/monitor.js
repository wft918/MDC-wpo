// 视频接口

import request from '@/utils/request2'

// 视频树形图列表请求
export function videolist(query) {
  return request({
    url: '/v1.0/smc/wp/videolist',
    method: 'get',
    params: query
  })
}