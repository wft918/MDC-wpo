<doc>
  系统启停监视
</doc>
<template>
  <div class="box" style="position: relative;">
    <p class="title">系统启停监视</p>
    <div class="rt">
      <span @click="open(2,'')" style="margin-right: .052083rem;">采煤工作面监视</span>
      <span
        @click="open(1,'')">主运输监视</span>
    </div>
    <div class="top-top">
      <div class="top">
        <div class="part">
          <div class="part-d part-d-top">
            <div class="msg msg1">综采工作面3308</div>
            <div>
              <p class="msg" style="color: #FF7D00;font-size: .088542rem;text-align: center;" v-if="state == 1 && firstTothree == '0000'">等待启动</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 1 && firstTothree == '1000'">启动中</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 1 && firstTothree == '0010'">启动完成</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 1 && firstTothree == '0001'">手动启动中</p>

              <p class="msg" style="color: #FF7D00;font-size: .088542rem;text-align: center;" v-if="state == 3 && firstTothree == '0010'">等待停止</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 3 && firstTothree == '0100'">停止中</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 3 && firstTothree == '0000'">停止完成</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 3 && firstTothree == '0001'">手动停止中</p>
            </div>
            <div class="msg msg3">计划{{state===1?'启动':'停止'}}时长:<span
                style="color: #ae7b42;">{{systemStartTime[0]}}</span>分钟</div>
          </div>
        </div>
        <div class="part">
          <div class="part-d part-d-top">
            <div class="msg msg1">主运输系统</div>
            <div>
              <p class="msg" style="color: #FF7D00;font-size: .088542rem;text-align: center;" v-if="state == 1 && sixteenTonineteen == '0000'">等待启动</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 1 && sixteenTonineteen == '1000'">启动中</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 1 && sixteenTonineteen == '0010'">启动完成</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 1 && sixteenTonineteen == '0001'">手动启动中</p>

              <p class="msg" style="color: #FF7D00;font-size: .088542rem;text-align: center;" v-if="state == 3 && sixteenTonineteen == '0010'">等待停止</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 3 && sixteenTonineteen == '0100'">停止中</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 3 && sixteenTonineteen == '0000'">停止完成</p>
              <p class="msg" style="color: #009BFF;font-size: .088542rem;text-align: center;" v-if="state == 3 && sixteenTonineteen == '0001'">手动停止中</p>
            </div>
            <div class="msg msg3">计划{{state===1?'启动':'停止'}}时长:<span style="color: #ae7b42;">{{systemStartTime[2]}}</span>分钟</div>
          </div>
        </div>
      </div>
      <p class="tag">
        <span>主煤流开始{{state===1?'启动':'停止'}}时间：</span>
        <span style="color: #235ba6;font-weight: 600;">{{startDateTime}}</span>
        <span style="margin-left: 4%;">{{state===1?'启动':'停止'}}时长：</span>
        <span style="color: #235ba6;font-weight: 600;">{{duration}}</span> 分
        <span style="margin-left: 4%;">计划时长：</span>
        <span style="color: #235ba6;font-weight: 600;">{{hour}}</span> 分钟
      </p>
    </div>
    <div class="bottom">
      <div class="bottom-bottom">
        <div style="display: flex;flex-direction: column;">
          <p class="message" v-for="item in deviceStatusList" :key="item">
            <i class="el-icon-success logo"></i>
            {{item}}
          </p>
        </div>
      </div>
      <div class="bottom-bottom">
          <easy-player @pullFlow="pullFlow" :url="videoUrl" :idx="0"></easy-player>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import { startupStatus, startupDurationSon, systemStartTime, detailedStatus, stopDetailedStatus, mainCoalFlowStatus, mainCoalFlowPlannedDur,getsmart_stt_video } from "@/api/intelligentStartStop";
  import { formatGap } from "@/utils/time"
  import { showSystemStute } from "@/utils/statusName"
  import easyPlayer from '@/components/easyPlayer/easyPlayer'
  export default {
    data() {
      return {
        timer: '', // 查询状态定时器
        startupStatu: [{
          id: -1,
        }, {
          id: -1,
        }, {
          id: -1,
        }],
        systemStartTime: [0, 0, 0],
        hour: 0,
        startDateTime:'',//主煤流开始/停止时间
        duration:0,//启动时长
        videoUrl:'',
        interVal:null,
        timeInterVal:null,
        deviceStatusListAll:[]   //左下方设备状态
      }
    },
    components: {
      easyPlayer
    },
    computed: {
      state() {
        return this.$store.state.startStopStatus.statu
      },
      // 32位字符串状态码
      statusCode() {
        return this.$store.state.startStopStatus.statusCode
      },
      // 0-3位
      firstTothree() {
        return this.statusCode.slice(0,4)
      },
      // 16-19位
      sixteenTonineteen() {
        return this.statusCode.slice(16,20)
      },
      playerUrl() {
        return process.env.VUE_APP_PLAYER_URL
      },
      deviceStatusList() {
        let list = []
        if(this.deviceStatusListAll.length) {
          if(this.state == 1) {
            list = this.deviceStatusListAll.filter(item => item.indexOf('启动') !== -1)
          }else if(this.state == 3) {
            list = this.deviceStatusListAll.filter(item => item.indexOf('停止') !== -1)
          }
        }
        return list
      }
    },
    watch: {
      'state': {
        handler(newStatus) {
          this.startDateTime = this.get_date(0) + ' ' + new Date().toLocaleTimeString('chinese', { hour12: false })  //主煤流开始/停止时间
          if(newStatus == 1) {
            this.duration = 0  //启动/停止时长
          }else if(newStatus == 3) {
            this.duration = 0  //启动/停止时长
          }
          if(this.timeInterVal) clearInterval(this.timeInterVal)
          this.timeInterVal = setInterval(() => {
            this.duration = parseInt((Date.parse(new Date()) - Date.parse(new Date(this.startDateTime))) / 60000)  //启动/停止时长
          },60000)
        },
        deep: true,
        immediate:true
      },
      'statusCode': {
        handler() {
          this.handleLtBotData('1000', '0100', '1', '0')
        },
        deep: true,
        immediate: true
      }
    },
    beforeDestroy() {
      if(this.interVal) clearInterval(this.interVal);
      if(this.timeInterVal) clearInterval(this.timeInterVal);
    },
    mounted() {
      this.getMainCoalFlowPlannedDur()  // 主煤流计划启动时长
      this.getStartupDurationSon('working_face_001')  // 子系统计划启动时长
      this.getStartupDurationSon('working_face_002')  // 子系统计划启动时长
      this.getStartupDurationSon('main_transportation')  // 子系统计划启动时长
      this.getsmart_stt_video()  //视频接口
    },
    methods: {
      // 获取视频接口
      getsmart_stt_video() {
        getsmart_stt_video().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.videoUrl = data.data[0].url
              if(this.interVal) clearInterval(this.interVal)
              const { device,channel } = data.data[0]
              if(device && channel) {
                this.getChannelStream(device,channel)
              }
            }
          }
        })
      },
      getChannelStream(device,channel) {
        let resUrl = `${this.playerUrl}/api/v1/devices/channelstream?device=${device}&channel=${channel}&protocol=ws_flv`
        fetch(resUrl).then(response => {
          if(response.ok) {
            return response.json()
          }
        }).then(data => {
          this.videoUrl = this.playerUrl.replace('http://','ws://') + data.EasyDarwin.Body.URL
          this.interVal = setInterval(() => {
            this.keepAlive(resUrl + '&url=' + data.EasyDarwin.Body.URL)
          },20000)
        })
      },
      keepAlive(url) {
        fetch(url).then(res => {
          return res.json();
        }).then(function (data) {
          console.log("data", data)
        })
      },
      // 播放异常或播放结束或直播断流  重新拉流
      pullFlow(index) {
        // const { device,channel } = this.videoList[index]
        // if(device && channel) {
        //   this.getChannelStream(device,channel,index)
        // }
      },

      // 采煤工作面监视和主运输监视url链接
      open(num, title) {
        let url = ''
        if(num == 1) {
          url = process.env.VUE_APP_SUBSYSTEM_MAIN_MONITOR
        }else if(num == 2) {
          url = process.env.VUE_APP_SUBSYSTEM_COAL_MONITOR
        }
        if (url) {
          // window.open(url, '_parent')
          this.$router.replace({
            path: '/subsystem',
            query: {
              url: url,
              title: title,
              page: '/index'
            }
          })
        }
      },

      // 子系统计划启动时长
      getStartupDurationSon(name) {
        startupDurationSon({
          indicator1: 'planned_start_dur',
          indicator2: name
        }).then(response => {
          if (response && response.data.length > 0) {
            switch (name) {
              case 'working_face_001':
                this.$set(this.systemStartTime, 0, response.data[0].value)
                break;
              case 'working_face_002':
                this.$set(this.systemStartTime, 1, response.data[0].value)
                break;
              case 'main_transportation':
                this.$set(this.systemStartTime, 2, response.data[0].value)
                break;
            }
          }
        })
      },
      // 主煤流计划启动时长
      getMainCoalFlowPlannedDur() {
        mainCoalFlowPlannedDur({
          indicator: 'main_coal_flow.planned_start_dur'
        }).then(response => {
          if (response && response.data.length > 0) {
            this.hour = response.data[0].value
          }
        })
      },

      // 子系统状态展示
      showSystemStute(item) {
        return showSystemStute(this.state, item)
      },

      // 跳转
      goOther(url) {
        window.open(url, '_parent')
      },
      get_date(num) {
        var date1 = new Date();
        //今天时间
        var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + num);
        //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
        var time2 = this.addZero(date2.getFullYear()) + "-" + this.addZero((date2.getMonth() + 1)) + "-" + this.addZero(date2.getDate());
        return time2;
      },
      addZero(num){//补0
        if(parseInt(num) < 10){
          num = '0'+num;
        }
        return num;
      },
      // 根据状态改变渲染左下方的数据
      handleLtBotData(...states) {
        if(this.state == 1) {
          if(this.firstTothree == states[0]) {
            if(this.deviceStatusListAll.indexOf('综采工作面一键启动准备') < 0) {
              this.deviceStatusListAll.push('综采工作面一键启动准备')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('综采工作面一键启动准备') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('综采工作面一键启动准备'), 1)
            }
          }
          if(this.statusCode[4] == states[2]) {
            if(this.deviceStatusListAll.indexOf('液态泵组启动成功') < 0) {
              this.deviceStatusListAll.push('液态泵组启动成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('液态泵组启动成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('液态泵组启动成功'), 1)
            }
          }
          if(this.statusCode[5] == states[2]) {
            if(this.deviceStatusListAll.indexOf('皮带组启动成功') < 0) {
              this.deviceStatusListAll.push('皮带组启动成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('皮带组启动成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('皮带组启动成功'), 1)
            }
          }
          if(this.statusCode[7] == states[2]) {
            if(this.deviceStatusListAll.indexOf('跟机组启动成功') < 0) {
              this.deviceStatusListAll.push('跟机组启动成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('跟机组启动成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('跟机组启动成功'), 1)
            }
          }
          if(this.statusCode[6] == states[2]) {
            if(this.deviceStatusListAll.indexOf('三机组启动成功') < 0) {
              this.deviceStatusListAll.push('三机组启动成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('三机组启动成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('三机组启动成功'), 1)
            }
          }
          if(this.sixteenTonineteen == states[0]) {
            if(this.deviceStatusListAll.indexOf('主运输一键启动准备') < 0) {
              this.deviceStatusListAll.push('主运输一键启动准备')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('主运输一键启动准备') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('主运输一键启动准备'), 1)
            }
          }
          if(this.statusCode[20] == states[2]) {
            if(this.deviceStatusListAll.indexOf('主运二部启动成功') < 0) {
              this.deviceStatusListAll.push('主运二部启动成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('主运二部启动成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('主运二部启动成功'), 1)
            }
          }
          if(this.statusCode[21] == states[2]) {
            if(this.deviceStatusListAll.indexOf('主运一部启动成功') < 0) {
              this.deviceStatusListAll.push('主运一部启动成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('主运一部启动成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('主运一部启动成功'), 1)
            }
          }
          if(this.statusCode[22] == states[2]) {
            if(this.deviceStatusListAll.indexOf('主井胶带机启动成功') < 0) {
              this.deviceStatusListAll.push('主井胶带机启动成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('主井胶带机启动成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('主井胶带机启动成功'), 1)
            }
          }
          if(this.statusCode[23] == states[2]) {
            if(this.deviceStatusListAll.indexOf('101胶带机启动成功') < 0) {
              this.deviceStatusListAll.push('101胶带机启动成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('101胶带机启动成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('101胶带机启动成功'), 1)
            }
          }
          if(this.statusCode[24] == states[2]) {
            if(this.deviceStatusListAll.indexOf('102可逆胶带机启动成功') < 0) {
              this.deviceStatusListAll.push('102可逆胶带机启动成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('102可逆胶带机启动成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('102可逆胶带机启动成功'), 1)
            }
          }
        }else if(this.state == 3) {
          if(this.firstTothree == states[1]) {
            if(this.deviceStatusListAll.indexOf('综采工作面一键停止准备') < 0) {
              this.deviceStatusListAll.push('综采工作面一键停止准备')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('综采工作面一键停止准备') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('综采工作面一键停止准备'), 1)
            }
          }
          if(this.statusCode[4] == states[3]) {
            if(this.deviceStatusListAll.indexOf('液态泵组停止成功') < 0) {
              this.deviceStatusListAll.push('液态泵组停止成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('液态泵组停止成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('液态泵组停止成功'), 1)
            }
          }
          if(this.statusCode[5] == states[3]) {
            if(this.deviceStatusListAll.indexOf('皮带组停止成功') < 0) {
              this.deviceStatusListAll.push('皮带组停止成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('皮带组停止成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('皮带组停止成功'), 1)
            }
          }
          if(this.statusCode[7] == states[3]) {
            if(this.deviceStatusListAll.indexOf('跟机组停止成功') < 0) {
              this.deviceStatusListAll.push('跟机组停止成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('跟机组停止成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('跟机组停止成功'), 1)
            }
          }
          if(this.statusCode[6] == states[3]) {
            if(this.deviceStatusListAll.indexOf('三机组停止成功') < 0) {
              this.deviceStatusListAll.push('三机组停止成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('三机组停止成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('三机组停止成功'), 1)
            }
          }
          if(this.sixteenTonineteen == states[1]) {
            if(this.deviceStatusListAll.indexOf('主运输一键停止准备') < 0) {
              this.deviceStatusListAll.push('主运输一键停止准备')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('主运输一键停止准备') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('主运输一键停止准备'), 1)
            }
          }
          if(this.statusCode[20] == states[3]) {
            if(this.deviceStatusListAll.indexOf('主运二部停止成功') < 0) {
              this.deviceStatusListAll.push('主运二部停止成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('主运二部停止成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('主运二部停止成功'), 1)
            }
          }
          if(this.statusCode[21] == states[3]) {
            if(this.deviceStatusListAll.indexOf('主运一部停止成功') < 0) {
              this.deviceStatusListAll.push('主运一部停止成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('主运一部停止成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('主运一部停止成功'), 1)
            }
          }
          if(this.statusCode[22] == states[3]) {
            if(this.deviceStatusListAll.indexOf('主井胶带机停止成功') < 0) {
              this.deviceStatusListAll.push('主井胶带机停止成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('主井胶带机停止成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('主井胶带机停止成功'), 1)
            }
          }
          if(this.statusCode[23] == states[3]) {
            if(this.deviceStatusListAll.indexOf('101胶带机停止成功') < 0) {
              this.deviceStatusListAll.push('101胶带机停止成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('101胶带机停止成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('101胶带机停止成功'), 1)
            }
          }
          if(this.statusCode[24] == states[3]) {
            if(this.deviceStatusListAll.indexOf('102可逆胶带机停止成功') < 0) {
              this.deviceStatusListAll.push('102可逆胶带机停止成功')
            }
          }else {
            if(this.deviceStatusListAll.indexOf('102可逆胶带机停止成功') >= 0) {
              this.deviceStatusListAll.splice(this.deviceStatusListAll.indexOf('102可逆胶带机停止成功'), 1)
            }
          }
        }
      },
    }
  }
</script>
<style scoped>
  .box {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .title {
    color: #00FFFF;
    font-size: .072917rem
      /* 14/192 */
    ;
    line-height: .072917rem
      /* 14/192 */
    ;
    font-weight: 650;
    text-shadow: 0 0 .052083rem
      /* 10/192 */
      #00FFFF;
    padding-left: .052083rem
      /* 10/192 */
    ;
  }

  .rt {
    position: absolute;
    top: 0;
    right: 0;
    color: #00C3FF;
    font-size: .0625rem;
    cursor: pointer;
  }

  .rt>span:hover {
    color: #00FFFF;
  }

  .top {
    height: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: .026042rem;
    /* flex-wrap: wrap; */
  }

  .top-top {
    height: 35%;
    display: flex;
    flex-direction: column;
  }


  .part {
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
  }

  .part-d {
    border: .005208rem
      /* 1/192 */
      solid #00609a;
  }

  .part-d-top {
    background-color: rgba(11, 47, 88, 0.5);
    display: flex;
    flex-direction: column;
    align-content: stretch;
    padding: 0 .078125rem
      /* 15/192 */
    ;
    height: 100%;
  }

  .msg {
    height: 33.33%;
    padding-top: .052083rem
      /* 10/192 */
    ;
    font-weight: 650;
  }

  .msg1 {
    color: #fff;
    font-size: .072917rem
      /* 14/192 */
    ;
  }

  .msg2 {
    color: #da740f;
    font-size: .083333rem
      /* 16/192 */
    ;
    text-align: center;
  }

  .msg3 {
    color: #8993a1;
    font-size: .0625rem
      /* 11/192 */
    ;
    margin-bottom: .026042rem
      /* 5/192 */
    ;
  }

  .tag {
    color: #fff;
    border: .005208rem
      /* 1/192 */
      solid #22557d;
    line-height: .208333rem
      /* 40/192 */
    ;
    height: .208333rem
      /* 40/192 */
    ;
    font-size: .0625rem
      /* 10/192 */
    ;
    margin: .052083rem
      /* 10/192 */
    ;
    padding: 0 .104167rem
      /* 20/192 */
    ;
    background-color: #001846;
  }

  .bottom {
    width: 100%;
    height: 65%;
    display: flex;
  }

  .bottom-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: .104167rem;
      /* 20/192 */
    ;
  }

  .message {
    color: #fff;
    font-size: .072917rem
      /* 14/192 */
    ;
    margin: .020833rem
      /* 4/192 */
      0;
  }

  .logo {
    color: #01d075;
    margin-right: .036458rem
      /* 7/192 */
    ;
  }

  .logo-n {
    color: #e6a23c;
    margin-right: .036458rem
      /* 7/192 */
    ;
  }

  .jx {
    color: #e6003b;
  }

  .wc {
    color: #1890ff;
  }

  .btn {
    font-weight: 100;
    color: #00C3FF;
    text-shadow: none;
    font-size: .041667rem
      /* 8/192 */
    ;
    margin-left: .052083rem
      /* 10/192 */
    ;
    float: right;
    cursor: pointer;
  }

  .btn:hover {
    color: #00ffff;
  }
</style>