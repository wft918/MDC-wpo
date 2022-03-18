<doc>
  右侧视频
</doc>
<template>
  <div class="box">
    <div style="width: 100%;height: .3125rem;background-color: #1c233a;display: flex;align-items: center;">
      <div style="padding-left: .0781rem;box-sizing: border-box;">
        <span style="font-size: .0729rem;margin-right: .0781rem;">选择检测面</span>
        <el-select @change="levelChange" size="mini" v-model="currentValue" placeholder="请选择">
          <el-option
            v-for="item in level2menuList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div style="width: 100%;height: calc(100% - .4167rem);background-color: #1c233a;display: flex;justify-content: center;align-items: center;">
      <div class="content">
        <div class="top" @click="topClick"></div>
        <div class="bottom" @click="botClick"></div>
        <!-- 视频区域 -->
        <div class="video-part">
          <div class="video" v-for="(item,index) in rendeVideoList" :key="index">
            <!-- <video-model :id="'dispath' + index" :url="item.url"></video-model> -->
            <easy-player @pullFlow="pullFlow" :url="item.url" :idx="index"></easy-player>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import { videolist } from '@/api/monitor'
  import videoModel from '@/components/videoModel/videoModel'
  import easyPlayer from '@/components/easyPlayer/easyPlayer'
  import $ from 'jquery'
  export default {
    data() {
      return {
        currentPage:1,
        level2menuList:[],//下拉框列表
        currentValue:'',//下拉框绑定的value值
        videoDataAll:[],
        videoData:[],
        rendeVideoList:[],
        // videoUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni4934e7b/c4d93960-5643-11eb-a16f-5b3e54966275.m3u8'
        interVal0:null,
        interVal1:null,
        interVal2:null
      }
    },
    components: {
      videoModel,
      easyPlayer
    },
    computed: {
      playerUrl:() => process.env.VUE_APP_PLAYER_URL
    },
    mounted() {
      this.getVideoList()
    },
    destroyed() {
      clearInterval(this.interVal0)
      clearInterval(this.interVal1)
      clearInterval(this.interVal2)
    },
    methods: {
      // 获取视频列表
      getVideoList() {
        videolist().then(data => {
          if(data && data.success) {
            this.level2menuList = []  //下拉框数据
            if(data.data.length) {
              this.videoDataAll = data.data  //所有数据
              let names = [...new Set(data.data.map(item => item.level2menu))]
              names.forEach(name => {
                this.level2menuList.push({
                  label:name,
                  value:name
                })
              })
              this.currentValue = this.level2menuList[0].value
              this.videoData = data.data.filter(item => item.level2menu == this.currentValue)
              this.rendeVideoList = this.videoData.slice(0,3)
              if(this.interVal0) clearInterval(this.interVal0)
              if(this.interVal1) clearInterval(this.interVal1)
              if(this.interVal2) clearInterval(this.interVal2)
              this.rendeVideoList.forEach((item,index) => {
                if(item.device && item.channel) {
                  this.getChannelStream(item.device,item.channel,index)
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
          if(data) {
            this.$set(this.rendeVideoList[index],'url',this.playerUrl.replace('http://','ws://') + data.EasyDarwin.Body.URL)
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
          // console.log(status,'keepAliveStatus------------------>>>>')
          // console.log(data,'keepAliveData------------------>>>>')
        })
      },
      // 播放异常或播放结束或直播断流  重新拉流
      pullFlow(index) {
        let inter = `interVal${index}`
        if(this[inter]) clearInterval(this[inter])
        const { device,channel } = this.rendeVideoList[index]
        if(device && channel) {
          this.getChannelStream(device,channel,index)
        }
      },
      // 切换下拉框
      levelChange() {
        this.videoData = this.videoDataAll.filter(item => item.level2menu == this.currentValue)
        this.rendeVideoList = this.videoData.slice(0,3)
        if(this.interVal0) clearInterval(this.interVal0)
        if(this.interVal1) clearInterval(this.interVal1)
        if(this.interVal2) clearInterval(this.interVal2)
        this.rendeVideoList.forEach((item,index) => {
          if(item.device && item.channel) {
            this.getChannelStream(item.device,item.channel,index)
          }
        })
      },
      // top-click
      topClick() {
        if(this.currentPage > 1) {
          this.currentPage--
          this.rendeVideoList = this.videoData.slice(this.currentPage * 3 - 3,this.currentPage * 3)
          if(this.interVal0) clearInterval(this.interVal0)
          if(this.interVal1) clearInterval(this.interVal1)
          if(this.interVal2) clearInterval(this.interVal2)
          this.rendeVideoList.forEach((item,index) => {
            // let inter = `interVal${index}`
            // if(this[inter]) clearInterval(this[inter])
            if(item.device && item.channel) {
              this.getChannelStream(item.device,item.channel,index)
              // this[inter] = setInterval(() => {
              //   this.getChannelStream(item.device,item.channel,index)
              // },20000)
            }
          })
        }
      },
      // bottom-click
      botClick() {
        if(this.currentPage * 3 < this.videoData.length) {
          this.currentPage++
          this.rendeVideoList = this.videoData.slice(this.currentPage * 3 - 3,this.currentPage * 3)
          if(this.interVal0) clearInterval(this.interVal0)
          if(this.interVal1) clearInterval(this.interVal1)
          if(this.interVal2) clearInterval(this.interVal2)
          this.rendeVideoList.forEach((item,index) => {
            // let inter = `interVal${index}`
            // if(this[inter]) clearInterval(this[inter])
            if(item.device && item.channel) {
              this.getChannelStream(item.device,item.channel,index)
              // this[inter] = setInterval(() => {
              //   this.getChannelStream(item.device,item.channel,index)
              // },20000)
            }
          })
        }
      }
    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .content {
    width: 80%;
    height: 90%;
    background: url("../../../../assets/img/dispatch/center.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .top {
    left: 28%;
    top: -2%;
    position: absolute;
    height: 4%;
    width: 44%;
    background-color: antiquewhite;
    background: url("../../../../assets/img/dispatch/top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .bottom {
    left: 28%;
    bottom: -2%;
    position: absolute;
    height: 4%;
    width: 44%;
    background: url("../../../../assets/img/dispatch/down.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .video-part {
    height: 93%;
    width: 90%;
    margin-left: 5%;
    margin-top: 5%;
    /* overflow-y: scroll; */
    display: flex;
    flex-direction: column;
  }

  .video {
    width: 90%;
    height: 31%;
    margin-bottom: .104167rem /* 20/192 */;
    margin-left: 5%;
  }

  /* /deep/ .video-js.vjs-fullscreen::backdrop,:not(:root):fullscreen::backdrop {
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
    top: 56%;
    left: 50%;
    width: 35%!important;
    height: 44%!important;
    transform: translateX(-50%)!important;
  }

  /deep/ .video-js.vjs-fullscreen {
    background-color: transparent!important;
  } */
</style>