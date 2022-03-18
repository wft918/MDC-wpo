<doc>
  10m 大屏 
</doc>
<template>
  <div class="box">
    <div class="top">
      <img @click="deClick" src="../../../../../assets/img/system/left.png" class='jian' alt="">
      <div class="title">
        <p class="item" :class="{'selectTab':currentIndex == index}" @click="tabClick(index)" v-for="(item,index) in tabList" :key="item">{{item}}</p>
      </div>
      <img @click="inClick" src="../../../../../assets/img/system/right.png" class='jian' alt="">
    </div>
    <div class="content" style="margin-top: 2%;">
      <div class="video-list">
        <div class="video-item" v-for="(item,index) in videoListLeft" :key="index">
          <p class="name">{{item.name}}</p>
          <!-- <video-model :id="'bigVideoLt' + index" :url="item.url"></video-model> -->
          <easy-player @pullFlow="pullFlow" :url="item.url" :idx="index"></easy-player>
        </div>
      </div>
      <div class="video-content">
        <!-- <iframe style="width: 100%;height: 120%;margin-top: -10%;" :src="url" frameborder="0"></iframe> -->
        <iframe style="width: 100%;height: 100%;" :src="url" frameborder="0"></iframe>
      </div>
      <div class="video-list">
        <div class="video-item" v-for="(item,index) in videoListRight" :key="index">
          <p class="name">{{item.name}}</p>
          <!-- <video-model :id="'bigVideoRt' + index" :url="item.url"></video-model> -->
          <easy-player @pullFlow="pullFlow" :url="item.url" :idx="index == 0?4:index == 1?5:index == 2?6:7"></easy-player>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import videoModel from '@/components/videoModel/videoModel'
  import easyPlayer from '@/components/easyPlayer/easyPlayer'
  import { videolist } from '@/api/monitor'
  import { handleVideo } from '@/utils/handelVideo'
  import $ from 'jquery'
  export default {
    data() {
      return {
        // tabList:['主煤流线','采煤工作面','掘进工作面','主皮带','通风','水泵房','井下中央变电所'],
        currentIndex:0,
        // videoUrl: 'http://223.68.162.211:10800/hls/stream_6/stream_6_live.m3u8',
        // videoUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni4934e7b/c4d93960-5643-11eb-a16f-5b3e54966275.m3u8',
        videoList:[],
        url:'',//iframe嵌入的GIS地址
        interVal0:null,
        interVal1:null,
        interVal2:null,
        interVal3:null,
        interVal4:null,
        interVal5:null,
        interVal6:null,
        interVal7:null
      }
    },
    components: {
      videoModel,
      easyPlayer
    },
    computed: {
      tabList() {
        return process.env.VUE_APP_BIGVIEW_VIDEO_TABLIST.split(':')
      },
      playerUrl() {
        return process.env.VUE_APP_PLAYER_URL
      },
      videoListLeft() {
        return this.videoList.filter((item,i) => i % 2 == 0)
      },
      videoListRight() {
        return this.videoList.filter((item,i) => i % 2 !== 0)
      }
    },
    mounted() {
      this.url = process.env.VUE_APP_SUBSYSTEM_GIS
      this.getVideoList()
    },
    destroyed() {
      clearInterval(this.interVal0)
      clearInterval(this.interVal1)
      clearInterval(this.interVal2)
      clearInterval(this.interVal3)
      clearInterval(this.interVal4)
      clearInterval(this.interVal5)
      clearInterval(this.interVal6)
      clearInterval(this.interVal7)
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index
        this.getVideoList()
      },
      // 获取视频数据
      getVideoList() {
        videolist().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.videoList = handleVideo(data.data,this.currentIndex,'大屏').slice(0,8)
              this.videoList.forEach((item,index) => {
                let inter = `interVal${index}`
                if(this[inter]) clearInterval(this[inter])
                if(item.device && item.channel) {
                  this.getChannelStream(item.device,item.channel,index)
                  // this[inter] = setTimeout(() => {
                  //   this.getChannelStream(item.device,item.channel,index)
                  // },20000)
                }
              })
            }
          }
        })
      },
      // 视频保活
      getChannelStream(device,channel,index) {
        let resUrl = `${this.playerUrl}/api/v1/devices/channelstream?device=${device}&channel=${channel}&protocol=ws_flv`
        $.get(resUrl,(data,status) => {
          // console.log(data,'视频保活data--------------->>>')
          if(data) {
            this.$set(this.videoList[index],'url',this.playerUrl.replace('http://','ws://') + data.EasyDarwin.Body.URL)
            let inter = `interVal${index}`
            // if(this[inter]) clearInterval(this[inter])
            this[inter] = setInterval(() => {
              this.keepAlive(resUrl + '&url=' + data.EasyDarwin.Body.URL)
            },20000)
          }
        })
      },
      keepAlive(url) {
        $.get(url,(data,status) => {
          // console.log(data,'keepAliveData------------------>>>>')
        })
      },
      // 播放异常或播放结束或直播断流  重新拉流
      pullFlow(index) {
        let inter = `interVal${index}`
        if(this[inter]) clearInterval(this[inter])
        const { device,channel } = this.videoList[index]
        if(device && channel) {
          this.getChannelStream(device,channel,index)
        }
      },
      // 减
      deClick() {
        if(this.currentIndex) {
          this.currentIndex--
          this.getVideoList()
        }
      },
      // 加
      inClick() {
        if(this.currentIndex < this.tabList.length - 1) {
          this.currentIndex++
          this.getVideoList()
        }
      }
    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }

  .top {
    height: .15625rem /* 30/192 */;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .jian {
    height: .130208rem /* 25/192 */;
    cursor: pointer;
  }

  .title {
    width: 100%;
    height: 100%;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    box-sizing: border-box;
  }

  .item {
    cursor: pointer;
    height: .130208rem /* 25/192 */;
    line-height: .130208rem /* 25/192 */;
    font-size: .072917rem /* 14/192 */;
    width: 100%;
    border: .005208rem /* 1/192 */ solid #00eef8;
    text-align: center;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content {
    width: 100%;
    height: calc(100% - .208333rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .052083rem;
  }

  .video-content {
    width: 69%;
    height: 100%;
    /* background: url("../../../../../assets/img/system/kjj.png");
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    border: 1px solid #00C5FF;
    overflow: hidden;
  }

  .video-list {
    height: 100%;
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .video-item {
    width: 100%;
    height: 23.5%;
    position: relative;
    /* background: url("../../../../../assets/img/system/kjj.png");
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    border: 1px solid #00C5FF;
  }

  .name {
    font-size: .0625rem /* 12/192 */;
    padding: .015625rem /* 3/192 */;
    color: #00C5FF;
    position: absolute;
    left: .026042rem;
    z-index: 99;
    height: .078125rem /* 15/192 */;
    line-height: .078125rem /* 15/192 */;
  }

  .selectTab {
    background: linear-gradient(to right,#00a5df,#0196d6,#047bc8);
  }


  /deep/ .video-js.vjs-fullscreen::backdrop,:not(:root):fullscreen::backdrop {
    position: fixed!important;
    top: 0!important;
    left: 0!important;
    width: 50%!important;
    height: 50%!important;
    right: 50%!important;
    bottom: 50%!important;
    background-color: transparent!important;
  }


  /deep/ .video-js.vjs-fullscreen .vjs-tech {
    position: absolute;
    top: 14%;
    left: 50%;
    width: 47.5%!important;
    height: 53%!important;
    transform: translateX(-50%)!important;
  }

  /deep/ .video-js.vjs-fullscreen {
    background-color: transparent!important;
  }


  /* 设置播放器control宽度 */
  /deep/ .video-js .vjs-control {
    min-width: .0938rem!important;
    width: 15%!important;
    display: none!important;
  }
  /* 隐藏control */
  /deep/ .vjs-control-bar {
    display: none!important;
  }
</style>
