/**
 * 
 * @param {*} start 起始时间  2020-02-02 12:12:12 时间格式化字符串
 * @param {*} end 结束时间  2020-02-02 13:12:12 时间格式化字符串
 * @returns 相差时间（分钟）
 */

export function formatGap(start, end) {
  // let staytimeGap = new Date().getTime() - new Date(start).getTime();
  let staytimeGap = new Date(end).getTime() - new Date(start).getTime();
  let stayHour = Math.floor(staytimeGap / (3600 * 1000));
  let leave1 = staytimeGap % (3600 * 1000);
  let stayMin = Math.floor(leave1 / (60 * 1000));
  let leave2 = leave1 % (60 * 1000);
  let staySec = Math.floor(leave2 / 1000);
  return stayHour * 60 + stayMin
  // return stayHour + ":" + stayMin + ":" + staySec;
}

export function getHoursData(start, end) {
  // let staytimeGap = new Date().getTime() - new Date(start).getTime();
  let staytimeGap = new Date(end).getTime() - new Date(start).getTime();
  let stayHour = Math.floor(staytimeGap / (3600 * 1000));
  let leave1 = staytimeGap % (3600 * 1000);
  let stayMin = Math.floor(leave1 / (60 * 1000));
  let leave2 = leave1 % (60 * 1000);
  let staySec = Math.floor(leave2 / 1000);
  // return stayHour
  return  Number((stayHour * 60  + stayMin) / 60).toFixed(1) ;
}