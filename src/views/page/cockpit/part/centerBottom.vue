<doc>
  视频模块
</doc>
<template>
  <div class="box">
    <!-- 上部标签模块 -->
    <div class="top">
      <img src="../../../../assets/img/system/left.png" @click="leftClick" class='jian' alt="">
      <div class="title">
        <p class="item" :class="{'currentClass':currentIndex == i}" @click="tabClick(i)" v-for="(item,i) in tabList" :key="item">{{item}}</p>
      </div>
      <img src="../../../../assets/img/system/right.png" @click="rightClick" class='jian' alt="">
    </div>
    <!-- 下部视频模块 -->
    <div class="videoList">
      <div class="videoItem" v-for="(item,index) in videoList" :key="index">
        <!-- <video-model :id="'video' + index" :url="item.url"></video-model> -->
        <easy-player @pullFlow="pullFlow" :url="item.url" :idx="index"></easy-player>
      </div>
    </div>
  </div>
</template>
<script>
  import "../../../../utils/flexible.js";
  import videoModel from '@/components/videoModel/videoModel'
  import easyPlayer from '@/components/easyPlayer/easyPlayer'
  import { videolist } from '@/api/monitor'
  import { handleVideo } from '@/utils/handelVideo'
  import $ from 'jquery'
  export default {
    data() {
      return {
        // videoUrl:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni4934e7b/c4d93960-5643-11eb-a16f-5b3e54966275.m3u8',
        videoList:[],
        // tabList:['主煤流线','采煤工作面','掘进工作面','通风','水泵房','井下中央变电所'],
        currentIndex:0,
        interVal0:null,
        interVal1:null,
        interVal2:null,
        interVal3:null,
        interVal4:null,
        interVal5:null,
        interVal6:null,
        interVal7:null,
        interVal8:null
      }
    },
    components: {
      videoModel,
      easyPlayer
    },
    computed: {
      tabList:() => process.env.VUE_APP_COCKPIT_VIDEO_TABLIST.split(':'),
      playerUrl:() => process.env.VUE_APP_PLAYER_URL
    },
    mounted() {
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
      clearInterval(this.interVal8)
    },
    methods: {
      // 获取视频列表
      getVideoList() {
        videolist().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.videoList = handleVideo(data.data,this.currentIndex,'矿领导').slice(0,9)
              this.videoList.forEach((item,index) => {
                let inter = `interVal${index}`
                if(this[inter]) clearInterval(this[inter])
                if(item.device && item.channel) {
                  this.getChannelStream(item.device,item.channel,index)
                  // this[inter] = setInterval(() => {
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
          // console.log(status,'视频保活status--------------->>>')
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
      // tab-click
      tabClick(i) {
        this.currentIndex = i
        this.getVideoList()
      },
      
      leftClick() {
        if(this.currentIndex) {
          this.currentIndex--
          this.getVideoList()
        }
      },

      rightClick() {
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
    height: 100%;
    display: flex;
    flex-direction: column
  }

  .top {
    height: .15625rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .jian {
    height: .130208rem;
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
    height: .130208rem;
    line-height: .130208rem;
    font-size: .072917rem;
    width: 100%;
    border: .005208rem solid #00eef8;
    text-align: center;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #114372;
  }

  .currentClass {
    background: linear-gradient(to right,#00a5df,#0196d6,#047bc8)!important;
  }

  .videoList {
    margin-top: .052083rem;
    height: 100%;
    display: flex;
    align-content: space-around;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .videoItem {
    width: 32%;
    height: 32%;
    /* border: 1px solid blue; */
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
    top: 56.5%;
    left: 50%;
    width: 32%!important;
    height: 42.5%!important;
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