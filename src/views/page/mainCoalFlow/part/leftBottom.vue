<doc>
  系统报警统计
</doc>
<template>
  <div class="box">
    <p class="title">系统报警统计</p>
    <div class="bottom">
      <div class='echart'>
        <p style="font-size: .0625rem /* 16/192 */; text-align: center;margin-top: .3125rem /* 60/192 */;">近30天异常报警次数 <br>
          <br> <span class="num">{{secondTotal| numberToCurrency}}</span> 次 </p>
      </div>
      <div class='echart'>
        <pie :id="'pie2'" :systemAlarmsData='systemAlarmsData' :type="'system'"></pie>
      </div>
    </div>
    <alarm-pop-up ref="alarmModel"></alarm-pop-up>
  </div>
</template>
<script>
  import "../../../../utils/flexible.js";
  import pie from '@/views/page/mainCoalFlow/part/echarts/pie'
  import alarmPopUp from '@/views/page/mainCoalFlow/part/alarmPopUp'
  import { totalAlarms, systemAlarms, deviceAlarms, alarmDetails } from "@/api/intelligentStartStop";
  import { getsystemalarms } from '@/api/bigView'
  export default {
    components: {
      pie,
      alarmPopUp
    },
    data() {
      return {
        secondTotal: 0,//报警总数
        systemAlarmsData: [],
        // deviceAlarmsData: [],
        timer: ''
      }
    },
    mounted() {
      this.getTotalAlarms()  // 报警总数
      this.getSystemAlarms()  //各系统报警次数
      // this.getDeviceAlarms()
      // this.getAlarmDetails() // 报警弹窗
      this.timer = setInterval(() => {  // 轮询
        this.getTotalAlarms()  // 报警总数
        this.getSystemAlarms()  //各系统报警次数
        // this.getDeviceAlarms()
        // this.getAlarmDetails() // 报警弹窗
      }, 3000);
    },
    beforeDestroy() {
      if(this.timer) clearInterval(this.timer);
    },
    computed: {
      state() {
        return this.$store.state.startStopStatus.statu
      },
      // 32位字符串状态码
      statusCode() {
        return this.$store.state.startStopStatus.statusCode
      },
    },
    watch: {
      statusCode(newVal) {
        let alarmInfo = {
          systemName: '',
          status: '',
          time: ''
        }
        if(this.state == 0 && newVal[8] == '1') {
          alarmInfo.systemName = '综采工作面3308'
          alarmInfo.status = '启动'
          alarmInfo.time = this.get_date(0) + ' ' + new Date().toLocaleTimeString('chinese', { hour12: false })
          this.$refs.alarmModel.init(alarmInfo)
        }else if(this.state == 2 && newVal[8] == '1') {
          alarmInfo.systemName = '综采工作面3308'
          alarmInfo.status = '停止'
          alarmInfo.time = this.get_date(0) + ' ' + new Date().toLocaleTimeString('chinese', { hour12: false })
          this.$refs.alarmModel.init(alarmInfo)
        }else if(this.state == 0 && newVal[25] == '1') {
          alarmInfo.systemName = '主运输系统'
          alarmInfo.status = '启动'
          alarmInfo.time = this.get_date(0) + ' ' + new Date().toLocaleTimeString('chinese', { hour12: false })
          this.$refs.alarmModel.init(alarmInfo)
        }else if(this.state == 2 && newVal[25] == '1') {
          alarmInfo.systemName = '主运输系统'
          alarmInfo.status = '停止'
          alarmInfo.time = this.get_date(0) + ' ' + new Date().toLocaleTimeString('chinese', { hour12: false })
          this.$refs.alarmModel.init(alarmInfo)
        }
      }
    },
    methods: {
      // 报警总数
      getTotalAlarms() {
        totalAlarms().then(response => {
          if (response && response.success) {
            if (response.data.length === 0) {
              return
            }
            this.secondTotal = response.data[0].value
          }
        })
      },
      //各系统报警次数
      getSystemAlarms() {
        systemAlarms().then(response => {
          if (response && response.success) {
            this.systemAlarmsData = response.data
            // setTimeout(this.getSystemAlarms, 3000);
          }
        })
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
      // // 报警弹窗
      // getAlarmDetails() {
      //   alarmDetails().then(response => {
      //     if (response && response.data.length > 0) {
      //       if (response.data[0].close !== 1) {
      //         this.warnData = response.data[0]
      //         this.$refs.alarmModel.init(response.data[0])
      //       }
      //     }
      //   })
      // },
      // // 系统报警次数
      // getsystemalarms() {
      //   getsystemalarms().then(data => {
      //     if (data && data.success) {
      //       this.systemAlarmsData = []
      //       if (data.data.length) {
      //         this.secondTotal = 0
      //         data.data.forEach(item => {
      //           this.secondTotal += item.value
      //           this.systemAlarmsData.push({
      //             value: item.value,
      //             name: item.ext_1
      //           })
      //         })
      //       }
      //     }
      //   })
      // },
      // getDeviceAlarms() {
      //   deviceAlarms().then(response => {
      //     if (response && response.success) {
      //       this.deviceAlarmsData = response.data
      //     }
      //   })
      // },
    },
  }
</script>
<style scoped>
  .box {
    height: 100%;
    display: flex;
    flex-direction: column
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
    margin-top: .015625rem
      /* 3/192 */
    ;
    color: #fff;
    text-align: center;
    font-size: .067708rem
      /* 13/192 */
    ;
  }

  .num {
    border: .015625rem
      /* 3/192 */
      solid #00aad1;
    padding: 0rem .130208rem
      /* 25/192 */
    ;
    color: red;
    font-size: .104167rem
      /* 20/192 */
    ;
    font-weight: 650;
    font-family: "ysbth";
  }

  .bottom {
    height: 100%;
    display: flex;
    color: #fff
  }

  .echart {
    width: 50%;
  }

  /deep/.el-dialog__wrapper {
    z-index: 1 !important;
    top: 34%;
    pointer-events: none !important;
  }
</style>