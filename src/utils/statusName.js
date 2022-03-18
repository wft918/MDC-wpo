/**
 * 
 * @param {*} item  数据实体
 * @returns 状态名称
 */
export function showSystemStute(state, item) {
  if (state === 0) {
    // 等待启动
    if (item.start_begin_time === undefined && item.start_end_time === undefined && item.stop_begin_time === undefined && item.stop_end_time === undefined) {
      return '等待启动'
    }
  } else if (state === 1) {
    // 启动中
    if (item.start_begin_time === undefined && item.start_end_time === undefined && item.stop_begin_time === undefined && item.stop_end_time === undefined) {
      return '等待启动'
    } else if (item.start_begin_time !== undefined && item.start_end_time === undefined && item.stop_begin_time === undefined && item.stop_end_time === undefined) {
      return '启动中'
    } else if (item.start_begin_time !== undefined && item.start_end_time !== undefined && item.stop_begin_time === undefined && item.stop_end_time === undefined) {
      return '启动完成'
    }
  } else if (state === 3) {
    // 停止中
    if (item.start_begin_time === undefined && item.start_end_time === undefined && item.stop_begin_time === undefined && item.stop_end_time === undefined) {
      return '检修中'
    } else if (item.start_begin_time !== undefined && item.start_end_time !== undefined && item.stop_begin_time === undefined && item.stop_end_time === undefined) {
      return '等待停止'
    } else if (item.start_begin_time !== undefined && item.start_end_time !== undefined && item.stop_begin_time !== undefined && item.stop_end_time === undefined) {
      return '停止中'
    } else if (item.start_begin_time !== undefined && item.start_end_time !== undefined && item.stop_begin_time !== undefined && item.stop_end_time !== undefined) {
      return '停止完成'
    }
  } else if (state === 2) {
    if (item.start_begin_time === undefined && item.start_end_time === undefined && item.stop_begin_time === undefined && item.stop_end_time === undefined) {
      return '检修中'
    } else if (item.start_begin_time !== undefined && item.start_end_time !== undefined && item.stop_begin_time === undefined && item.stop_end_time === undefined) {
      return '生产中'
    }
  }
}