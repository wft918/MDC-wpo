

export function handleVideo(data,index,type) {
  let rendeList = [{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''},{name:'',url:''}]
  let titleList_1 = process.env.VUE_APP_BIGVIEW_VIDEO_TABLIST.split(':').map(item => `大屏@${item}`)
  let titleList_2 = process.env.VUE_APP_COCKPIT_VIDEO_TABLIST.split(':').map(item => `矿领导管理驾驶舱@${item}`)
  let titleList_3 = process.env.VUE_APP_SUPERSCREEN_VIDEO_TABLIST.split(':').map(item => `超大屏@${item}`)
  if(type == '大屏') {
    for(let i = 0; i < data.length; i++) {
      if(data[i].tag) {
        let tagList = data[i].tag.split(';').filter(item => item.startsWith('大屏')) || []
        if(tagList.length) {
          for(let j = 0; j < tagList.length; j++) {
            let dpList = tagList[j].split(',')
            if(dpList[0] == titleList_1[index] && parseInt(dpList[1]) > 0 && parseInt(dpList[1]) < 9) {
              rendeList[parseInt(dpList[1]) - 1] = data[i]
            }
          }
        }
      }
    }
  }else if(type == '矿领导') {
    for(let i = 0; i < data.length; i++) {
      if(data[i].tag) {
        let tagList = data[i].tag.split(';').filter(item => item.startsWith('矿领导')) || []
        if(tagList.length) {
          for(let j = 0; j < tagList.length; j++) {
            let dpList = tagList[j].split(',')
            if(dpList[0] == titleList_2[index] && parseInt(dpList[1]) > 0 && parseInt(dpList[1]) < 10) {
              rendeList[parseInt(dpList[1]) - 1] = data[i]
            }
          }
        }
      }
    }
  }else if(type == '超大屏') {
    for(let i = 0; i < data.length; i++) {
      if(data[i].tag) {
        let tagList = data[i].tag.split(';').filter(item => item.startsWith('超大屏')) || []
        if(tagList.length) {
          for(let j = 0; j < tagList.length; j++) {
            let dpList = tagList[j].split(',')
            if(dpList[0] == titleList_3[index] && parseInt(dpList[1]) > 0 && parseInt(dpList[1]) < 17) {
              rendeList[parseInt(dpList[1]) - 1] = data[i]
            }
          }
        }
      }
    }
  }

  
  return rendeList
}