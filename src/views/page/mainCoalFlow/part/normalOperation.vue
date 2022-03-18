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
      <!-- <div class="part">
        <div class="part-d part-d-top">
          <div class="msg msg1">综采工作面3308</div>
          <div
            :class="{msg: true, msg2: true, jx: showSystemStute(startupStatu[0])==='检修中', sc: showSystemStute(startupStatu[0])==='生产中'}">
            {{showSystemStute(startupStatu[0])}}</div>
          <div class="msg" style="color: #babcbe;">开始生产时间：</div>
          <div class="msg msg3">{{startupStatu[0].start_end_time}}</div>
        </div>
        <div class="part-d part-d-bottom">
          <pie-three :id="'peie1'" :data='systemStartTime[0]' :unit="unit[0]"
            :startedTime="getStartHouse(startupStatu[0].start_end_time)"
            :type="showSystemStute(startupStatu[0])==='检修中'" style="height: 85%;"></pie-three>
          <p style="text-align: center;color: #fff;font-size: .052083rem /* 10/192 */;">完成计划
            {{Number(getStartHouse(startupStatu[0].start_end_time)/systemStartTime[0] *
            100 ).toFixed(1)}}%</p>
        </div>
      </div>
      <div class="part">
        <div class="part-d part-d-top">
          <div class="msg msg1">综采工作面3203</div>
          <div
            :class="{msg: true, msg2: true, jx: showSystemStute(startupStatu[1])==='检修中', sc: showSystemStute(startupStatu[1])==='生产中'}">
            {{showSystemStute(startupStatu[1])}}</div>
          <div class="msg" style="color: #babcbe;">开始生产时间：</div>
          <div class="msg msg3">{{startupStatu[1].start_end_time}}</div>
        </div>
        <div class="part-d part-d-bottom">
          <pie-three :id="'peie2'" :data='systemStartTime[1]' :unit="unit[1]"
            :startedTime="getStartHouse(startupStatu[1].start_end_time)"
            :type="showSystemStute(startupStatu[1])==='检修中'" style="height: 85%;"></pie-three>
          <p style="text-align: center;color: #fff;font-size: .052083rem /* 10/192 */;">完成计划
            {{Number(getStartHouse(startupStatu[1].start_end_time)/systemStartTime[1] *
            100).toFixed(1)}}%</p>
        </div>
      </div>
      <div class="part">
        <div class="part-d part-d-top">
          <div class="msg msg1">主运输系统</div>
          <div
            :class="{msg: true, msg2: true, jx: showSystemStute(startupStatu[2])==='检修中', sc: showSystemStute(startupStatu[2])==='生产中'}">
            {{showSystemStute(startupStatu[2])}}</div>
          <div class="msg" style="color: #babcbe;">开始生产时间：</div>
          <div class="msg msg3">{{startupStatu[2].start_end_time}}</div>
        </div>
        <div class="part-d part-d-bottom">
          <pie-three :id="'peie3'" :data='systemStartTime[2]' :unit="unit[2]"
            :startedTime="getStartHouse(startupStatu[2].start_end_time)"
            :type="showSystemStute(startupStatu[2])==='检修中'" style="height: 85%;"></pie-three>
          <p style="text-align: center;color: #fff;font-size: .052083rem /* 10/192 */;">完成计划
            {{Number(getStartHouse(startupStatu[2].start_end_time)/systemStartTime[2] *
            100).toFixed(1)}}%</p>
        </div>
      </div> -->
      <div style="width: 30%;height: 85%;display: flex;flex-direction: column;justify-content: space-around;text-align: center;font-size: .09375rem;border: .020833rem solid #1276d2;box-sizing: border-box;">
        <p style="color: #fff;">日综采开机率</p>
        <p style="font-family: ysbth;font-size: .166667rem;color: #00a0ff;">{{topBotObj.value1}}</p>
        <p style="color: #597f96;">%</p>
      </div>
      <div style="width: 30%;height: 85%;display: flex;flex-direction: column;justify-content: space-around;text-align: center;font-size: .09375rem;border: .020833rem solid #1276d2;box-sizing: border-box;">
        <p style="color: #fff;">日综掘开机率</p>
        <p style="font-family: ysbth;font-size: .166667rem;color: #00a0ff;">{{topBotObj.value2}}</p>
        <p style="color: #597f96;">%</p>
      </div>
      <div style="width: 30%;height: 85%;display: flex;flex-direction: column;justify-content: space-around;text-align: center;font-size: .09375rem;border: .020833rem solid #1276d2;box-sizing: border-box;">
        <p style="color: #fff;">日主运开机率</p>
        <p style="font-family: ysbth;font-size: .166667rem;color: #00a0ff;">{{topBotObj.value3}}</p>
        <p style="color: #597f96;">%</p>
      </div>
    </div>
  </div>
</template>
<script>
  // import moment from 'moment'
  // import { getHoursData } from "@/utils/time"
  import '../../../../utils/flexible.js'
  // import pieThree from '@/views/page/mainCoalFlow/part/echarts/pieThree'
  // import { startupStatus, startupDurationSon } from "@/api/intelligentStartStop";
  // import { showSystemStute } from "@/utils/statusName"
  import { systemOperationRate } from '@/api/bigView2'
  export default {
    // components: {
    //   pieThree,
    // },
    data() {
      return {
        // systemStartTime: [0, 0, 0],
        // unit: ['--', '--', '--'],
        // startHouse: [0, 0, 0],
        // startupStatu: [{
        //   id: -1,
        // }, {
        //   id: -1,
        // }, {
        //   id: -1,
        // }],
        // timer: '', // 查询状态定时器
        topBotObj: {
          value1: 0,
          value2: 0,
          value3: 0,
        }
      }
    },
    // computed: {
    //   state: {
    //     get() {
    //       return this.$store.state.startStopStatus.statu
    //     },
    //   },
    // },
    mounted() {
      // this.getStartupStatus()
      // this.timer = setInterval(this.getStartupStatus, 3000);
      // this.getStartupDurationSon('working_face_001')  // 子系统计划启动时长
      // this.getStartupDurationSon('working_face_002')  // 子系统计划启动时长
      // this.getStartupDurationSon('main_transportation')  // 子系统计划启动时长
      this.systemOperationRate()
    },
    // beforeDestroy() {
    //   clearInterval(this.timer);
    // },
    methods: {
      // 日综采综掘主运开机率
      systemOperationRate() {
        systemOperationRate().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              data.data.forEach(element => {
                switch (element.indicator_name) {
                  case '主运开机率':
                    this.topBotObj.value3 = element["round(`value`)"]
                    break;
                  case '综采开机率':
                    this.topBotObj.value1 = element["round(`value`)"]
                    break;
                  case '综掘开机率':
                    this.topBotObj.value2 = element["round(`value`)"]
                    break;
                }
              })
            }
          }
        })
      },
      // 跳转
      goOther(num, title) {
        // window.open(url, '_parent')
        let url = ''
        if (num == 1) {
          url = process.env.VUE_APP_SUBSYSTEM_MAIN_MONITOR
        } else if (num == 2) {
          url = process.env.VUE_APP_SUBSYSTEM_COAL_MONITOR
        }
        this.$router.replace({
          path: '/subsystem',
          query: {
            url: url,
            title: title,
            page: '/index'
          }
        })
      },
      // // 获取启动的时长
      // getStartHouse(startEndTime) {
      //   if (startEndTime == null || startEndTime == undefined || startEndTime == '') {
      //     return 0
      //   }
      //   let endTime = moment().format("YYYY-MM-DD HH:mm:ss");
      //   let hours = getHoursData(startEndTime, endTime)
      //   return hours
      // },
      // // 子系统计划启动时长
      // getStartupDurationSon(name) {
      //   startupDurationSon({
      //     indicator1: 'planned_production_dur',
      //     indicator2: name
      //   }).then(response => {
      //     if (response && response.data.length > 0) {
      //       switch (name) {
      //         case 'working_face_001':
      //           this.$set(this.systemStartTime, 0, response.data[0].value)
      //           this.$set(this.unit, 0, response.data[0].unit)
      //           break;
      //         case 'working_face_002':
      //           this.$set(this.systemStartTime, 1, response.data[0].value)
      //           this.$set(this.unit, 1, response.data[0].unit)
      //           break;
      //         case 'main_transportation':
      //           this.$set(this.systemStartTime, 2, response.data[0].value)
      //           this.$set(this.unit, 2, response.data[0].unit)
      //           break;
      //       }
      //     }
      //   })
      // },
      // // 子系统状态展示
      // showSystemStute(item) {
      //   return showSystemStute(this.state, item)
      // },
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
    font-size: .072917rem
      /* 14/192 */
    ;
    line-height: .072917rem
      /* 14/192 */
    ;
    font-weight: 650;
    text-shadow: 0rem 0rem .052083rem
      /* 10/192 */
      #00FFFF;
    padding-left: .052083rem
      /* 10/192 */
    ;
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
    border: .005208rem
      /* 1/192 */
      solid #00609a;
  }

  .part-d-top {
    background-color: rgba(11, 47, 88, 0.5);
    display: flex;
    flex-direction: column;
    align-content: stretch;
    padding: .026042rem
      /* 5/192 */
    ;
    height: 45%;
  }

  .msg {
    height: 30%;
    padding-top: 0;
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
    margin: .026042rem
      /* 5/192 */
      0;
  }

  .msg3 {
    color: #0184dc;
    font-size: .0625rem
      /* 8/192 */
    ;
    text-align: center;
    ;
  }

  .part-d-bottom {
    background-color: #001945;
    height: 55%;
  }

  .jx {
    color: #e6003b;
  }

  .sc {
    color: #00cf76;
  }

  .btn {
    font-weight: 100;
    color: #00C3FF;
    text-shadow: none;
    font-size: .0625rem
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