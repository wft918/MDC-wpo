<doc>
  工业视频
</doc>
<template>
  <div class="box">
    <div style="margin-left: .052083rem /* 10/192 */;position: absolute;top: .041667rem /* 8/192 */;left: .520833rem /* 100/192 */;font-size: .067708rem /* 13/192 */;">
      <span style="margin-right: .0521rem;">视频监控区域</span>
      <el-select @change="levelChange" size="mini" v-model="currentValue" placeholder="请选择">
        <el-option
          v-for="item in level2menuList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="content">
      <div class="left" @click="leftClick"></div>
      <div class="right" @click="rightClick"></div>
      <div class="videoList">
        <div class="item"  v-for="(item,index) in rendeVideoList" :key="index">
          <easy-player @pullFlow="pullFlow" :url="item.url" :idx="index"></easy-player>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import { videolist } from '@/api/monitor'
  // import videoModel from '@/components/videoModel/videoModel'
  import easyPlayer from '@/components/easyPlayer/easyPlayer'
  import $ from 'jquery'
  export default {
    data() {
      return {
        value: '3203综采面',
        currentPage:1, //当前页
        level2menuList:[],//下拉框列表
        currentValue:'',//下拉框绑定的value值
        videoDataAll:[],//所有数据
        videoData:[],
        rendeVideoList:[],
        interVal0:null,
        interVal1:null,
      }
    },
    components: {
      // videoModel,
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
    },
    methods: {
      // 获取视频列表
      getVideoList() {
        videolist().then(data => {
          if(data && data.success) {
            this.level2menuList = []
            if(data.data.length) {
              this.videoDataAll = data.data
              let names = [...new Set(data.data.map(item => item.level2menu))]
              names.forEach(name => {
                this.level2menuList.push({
                  label:name,
                  value:name
                })
              })
              this.currentValue = this.level2menuList[0].value
              this.videoData = data.data.filter(item => item.level2menu == this.currentValue)
              this.rendeVideoList = this.videoData.slice(0,2)
              if(this.interVal0) clearInterval(this.interVal0)
              if(this.interVal1) clearInterval(this.interVal1)
              this.rendeVideoList.forEach((item,index) => {
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
        this.rendeVideoList = this.videoData.slice(0,2)
        if(this.interVal0) clearInterval(this.interVal0)
        if(this.interVal1) clearInterval(this.interVal1)
        this.rendeVideoList.forEach((item,index) => {
          if(item.device && item.channel) {
            this.getChannelStream(item.device,item.channel,index)
            // this[inter] = setInterval(() => {
            //   this.getChannelStream(item.device,item.channel,index)
            // },20000)
          }
        })
      },

      leftClick() {
        if(this.currentPage > 1) {
          this.currentPage--
          this.rendeVideoList = this.videoData.slice(this.currentPage * 2 - 2,this.currentPage * 2)
          if(this.interVal0) clearInterval(this.interVal0)
          if(this.interVal1) clearInterval(this.interVal1)
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
      rightClick() {
        if(this.currentPage * 2 < this.videoData.length) {
          this.currentPage++
          this.rendeVideoList = this.videoData.slice(this.currentPage * 2 - 2,this.currentPage * 2)
          if(this.interVal0) clearInterval(this.interVal0)
          if(this.interVal1) clearInterval(this.interVal1)
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /deep/.el-input__inner {
    background-color: #000723;
    color: #fff;
    font-size: .067708rem;
    /* width: .677083rem;
    height: .145833rem; */
  }

  .content {
    margin-top: 5%;
    width: 85%;
    height: 70%;
    background: url("../../../../assets/img/informationCenter/bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left {
    width: 4%;
    height: 70%;
    position: absolute;
    background: url("../../../../assets/img/informationCenter/left.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    top: 15%;
    left: -2%;
    cursor: pointer;
  }

  .right {
    width: 4%;
    height: 70%;
    position: absolute;
    background: url("../../../../assets/img/informationCenter/right.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    top: 15%;
    right: -2%;
    cursor: pointer;
  }

  .videoList {
    height: 85%;
    width: 95%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow-x: scroll;
  }

  .item {
    width: 48% /* 350/192 */;
    height: 100%;
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