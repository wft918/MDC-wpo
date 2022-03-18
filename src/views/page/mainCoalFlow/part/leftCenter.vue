<doc>
  系统启停监视
</doc>
<template>
  <div class="box">
    <p class="title">系统启停监视
      <span class="btn" @click="goOther(1,'')">主运输监视</span>
      <span class="btn" @click="goOther(2,'')">采煤工作面监视</span>
    </p>
    <div class="top">
      <div class="part">
        <div class="part-d part-d-top" style="width: 100%;height: 100%;">
          <div class="msg msg1" style="font-size: .09375rem;">综采工作面3308</div>
          <!-- <div class="msg msg2" style="font-size: .109375rem;">{{showSystemStute(startupStatu[0])}}</div> -->
          <div class="msg msg2" style="font-size: .109375rem;" v-if="firstTothree == '0000'">等待启动</div>
          <div class="msg msg2" style="font-size: .109375rem;" v-if="firstTothree == '0010'">启动完成</div>
          <div class="msg msg2" style="font-size: .109375rem;" v-if="firstTothree == '0001'">其他手动状态</div>
          <div class="msg msg3" style="font-size: .083333rem;">计划启动时长： <span style="color: #ae7b42;">{{startupDuration[0]}}</span>分钟</div>
        </div>
        <!-- <div class="part-d part-d-bottom">
          <bar-easy :id="'easy1'" :startupDurationWeek='startupDurationWeek[0]'></bar-easy>
        </div> -->
      </div>
      <!-- <div class="part">
        <div class="part-d part-d-top">
          <div class="msg msg1">综采工作面3203</div>
          <div class="msg msg2">{{showSystemStute(startupStatu[1])}}</div>
          <div class="msg msg3">计划启动时长：<span style="color: #ae7b42;">{{startupDuration[1]}}</span> 分钟</div>
        </div>
        <div class="part-d part-d-bottom">
          <bar-easy :id="'easy2'" :startupDurationWeek='startupDurationWeek[1]'></bar-easy>
        </div>
      </div> -->
      <div class="part">
        <div class="part-d part-d-top" style="width: 100%;height: 100%;">
          <div class="msg msg1" style="font-size: .09375rem;">主运输系统</div>
          <!-- <div class="msg msg2" style="font-size: .109375rem;">{{showSystemStute(startupStatu[2])}}</div> -->
          <div class="msg msg2" style="font-size: .109375rem;" v-if="sixteenTonineteen == '0000'">等待启动</div>
          <div class="msg msg2" style="font-size: .109375rem;" v-if="sixteenTonineteen == '0010'">启动完成</div>
          <div class="msg msg2" style="font-size: .109375rem;" v-if="sixteenTonineteen == '0001'">其他手动状态</div>
          <div class="msg msg3" style="font-size: .083333rem;">计划启动时长：<span style="color: #ae7b42;">{{startupDuration[2]}}</span>分钟</div>
        </div>
        <!-- <div class="part-d part-d-bottom">
          <bar-easy :id="'easy3'" :startupDurationWeek='startupDurationWeek[2]'></bar-easy>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import barEasy from '@/views/page/mainCoalFlow/part/echarts/barEasy'
  import { startupStatus, startupDurationSon, startupDurationWeek } from "@/api/intelligentStartStop";
  import { showSystemStute } from "@/utils/statusName"
  export default {
    components: {
      barEasy,
    },
    data() {
      return {
        // startupStatu: [{
        //   id: -1,
        // }, {
        //   id: -1,
        // }, {
        //   id: -1,
        // }],
        startupDuration: [0, 0, 0],
        startupDurationWeek: [[], [], []],
        timer: '', // 查询状态定时器
      }
    },
    computed: {
      state() {
        return this.$store.state.startStopStatus.statu
      },
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
    },
    mounted() {
      // 子系统状态数据获取
      // this.getStartupStatus()
      // this.timer = setInterval(this.getStartupStatus, 3000); // 子系统状态数据获取
      this.getStartupDuration('working_face_001')  // 获取计划启动时间
      this.getStartupDuration('working_face_002')  // 获取计划启动时间
      this.getStartupDuration('main_transportation')  // 获取计划启动时间
      this.getStartupDurationWeek('working_face_001')  // 获取近一周启动时间
      this.getStartupDurationWeek('working_face_002')  // 获取近一周启动时间
      this.getStartupDurationWeek('main_transportation')  // 获取近一周启动时间
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods: {
      // // 子系统状态数据获取
      // getStartupStatus() {
      //   startupStatus().then(response => {
      //     if (response.data && response.data.length > 0) {
      //       response.data.forEach(element => {
      //         switch (element.system_id) {
      //           case 1:
      //             if (element.id >= this.startupStatu[0].id) {
      //               this.startupStatu[0] = element
      //             }
      //             break;
      //           case 2:
      //             if (element.id >= this.startupStatu[1].id) {
      //               this.startupStatu[1] = element
      //             }
      //             break;
      //           case 3:
      //             if (element.id >= this.startupStatu[2].id) {
      //               this.startupStatu[2] = element
      //             }
      //             break;
      //         }
      //       });
      //       // setTimeout(this.getStartupStatus, 3000);
      //     }
      //   })
      // },
      // 子系统计划启动时长
      getStartupDuration(name) {
        startupDurationSon({ indicator1: 'planned_start_dur', indicator2: name }).then(response => {
          if (response && response.success) {
            if (response.data.length == 0) {
              return
            }
            switch (name) {
              case 'working_face_001':
                this.$set(this.startupDuration, 0, response.data[0].value)
                break;
              case 'working_face_002':
                this.$set(this.startupDuration, 1, response.data[0].value)
                break;
              case 'main_transportation':
                this.$set(this.startupDuration, 2, response.data[0].value)
                break;
            }
          }
        })
      },
      // 子系统近一周启动时长
      getStartupDurationWeek(name) {
        startupDurationWeek({ indicator1: 'last_start_dur', indicator2: name }).then(response => {
          if (response && response.success) {
            switch (name) {
              case 'working_face_001':
                this.$set(this.startupDurationWeek, 0, response.data)
                break;
              case 'working_face_002':
                this.$set(this.startupDurationWeek, 1, response.data)
                break;
              case 'main_transportation':
                this.$set(this.startupDurationWeek, 2, response.data)
                break;
            }
          }
        })
      },
      // 子系统状态展示
      showSystemStute(item) {
        return showSystemStute(this.state, item)
      },
      // 跳转
      goOther(num,title) {
        // window.open(url, '_parent')
        let url = ''
        if(num == 1) {
          // url = process.env.VUE_APP_SUBSYSTEM_MAIN_MONITOR
          url = process.env.VUE_APP_SUBSYSTEM_MAIN
        }else if(num == 2) {
          url = process.env.VUE_APP_SUBSYSTEM_COAL_MONITOR
        }
        this.$router.replace({
          path:'/subsystem',
          query: {
            url:url,
            title:title,
            page:'/index'
          }
        })
      },
    },
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
    font-size: .072917rem /* 14/192 */;
    line-height: .072917rem /* 14/192 */;
    font-weight: 650;
    text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;
    padding-left: .052083rem /* 10/192 */;
  }

  .top {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .part {
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
  }

  .part-d {
    border: .005208rem /* 1/192 */ solid #00609a;
  }

  .part-d-top {
    background-color: rgba(11, 47, 88, 0.5);
    display: flex;
    flex-direction: column;
    align-content: stretch;
    padding: 0 .078125rem /* 15/192 */;
    height: 45%;
  }

  .msg {
    height: 33.33%;
    padding-top: .052083rem /* 10/192 */;
    font-weight: 650;
  }

  .msg1 {
    color: #fff;
    font-size: .072917rem /* 14/192 */;
  }

  .msg2 {
    color: #da740f;
    font-size: .083333rem /* 16/192 */;
    text-align: center;
  }

  .msg3 {
    color: #8993a1;
    font-size: .057292rem /* 11/192 */;
    margin-bottom: .026042rem /* 5/192 */;
  }

  .part-d-bottom {
    background-color: #001945;
    height: 55%;
  }
  
  .btn {
    font-weight: 100;
    color: #00C3FF;
    text-shadow: none;
    font-size: .0625rem /* 8/192 */;
    margin-left: .052083rem /* 10/192 */;
    float: right;
    cursor: pointer;
  }
  .btn:hover {
    color: #00ffff;
  }
</style>