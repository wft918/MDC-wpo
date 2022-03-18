<doc>
  系统报警统计
</doc>
<template>
  <div class="box">
    <p class="title">系统报警统计</p>
    <div class="bottom">
      <div class='echart1'>
        <div @mouseenter="ltMouseEnter" @mouseleave="ltMouseLeave"
          style="font-size: .0625rem /* 16/192 */; text-align: center;display: inline-block;cursor: pointer;">近30天异常报警次数
          <br>
          <br> <span class="num">{{secondTotal| numberToCurrency}}</span> 次
        </div>
      </div>
      <div class='echart2'>
        <pie :id="'pie2'" @pieMouseOver="pieMouseOver" @pieMouseOut="pieMouseOut" :systemAlarmsData='systemAlarmsData'
          :type="'system'"></pie>
      </div>
    </div>

    <!-- 小表格 -->
    <transition name="el-zoom-in-center">
      <div v-show="isShow" class="table">
        <div class="tableTitle">
          <div style="width: 6.25%">序号</div>
          <div>报警时间</div>
          <div>报警等级</div>
          <div>系统名称</div>
          <div>设备名称</div>
          <div>测点名称</div>
          <div>报警内容</div>
          <div>处理建议</div>
          <div style="width: 6.25%;">状态</div>
        </div>
        <div class="tableContent">
          <div v-for="(item,index) in drillingData" :key="item.time">
            <div style="width: 6.25%">{{index + 1}}</div>
            <div>{{item.time || ''}}</div>
            <div>{{'报警等级' || ''}}</div>
            <div>{{item.systemname || ''}}</div>
            <div>{{item.deviceename || ''}}</div>
            <div>{{item.sensor || ''}}</div>
            <div>{{item.content || ''}}</div>
            <div>{{'处理建议' || ''}}</div>
            <div style="width: 6.25%">{{'状态' || ''}}</div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 报警弹窗 -->
    <AlarmDialog_lc ref="AlarmDialog_lc" />
  </div>
</template>
<script>
  import "../../../../utils/flexible.js";
  import pie from '@/views/page/mainCoalFlow/part/echarts/pie'
  import AlarmDialog_lc from './Dialog/alarmDialog_lc'
  import { totalAlarms, systemAlarms, deviceAlarms, alarmDetails } from "@/api/intelligentStartStop";
  import { getsystemalarms } from '@/api/bigView'
  import { systemAlarmCnts, getSystemAlarm } from '@/api/bigView2'
  export default {
    components: {
      pie,
      AlarmDialog_lc
    },
    data() {
      return {
        count: '--',
        secondTotal: 0,//报警总数
        systemAlarmsData: [],
        deviceAlarmsData: [],
        timer: '',
        isShow: false,
        drillingDataAll: [],  //数据钻取所有数据
        drillingData: []  //数据钻取部分数据
      }
    },
    mounted() {
      // this.getTotalAlarms()
      // this.getSystemAlarms()
      // this.getsystemalarms()
      // this.getDeviceAlarms()
      // 报警弹窗
      // this.getAlarmDetails()
      // 轮询
      // this.timer = setInterval(() => {
        // this.getTotalAlarms()
        // this.getSystemAlarms()
        // this.getsystemalarms()
        // this.getDeviceAlarms()
        // this.getAlarmDetails()
      // }, 3000);


      // this.systemAlarmCnts()
      this.getSystemAlarm()  //数据钻取
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods: {


      // 王坡 request 接口
      // systemAlarmCnts() {
      //   systemAlarmCnts().then(data => {
      //     if (data && data.success) {
      //       if (data.data.length) {
      //         // 无数据
      //         this.systemAlarmsData = []
      //         if (data.data.length) {
      //           this.secondTotal = 0
      //           data.data.forEach(item => {
      //             this.secondTotal += Number(item.value)
      //             this.systemAlarmsData.push({
      //               value: item.value,
      //               name: item.ext_2
      //             })
      //           })
      //         }
      //       }
      //     }
      //   })
      // },

      // 数据钻取
      getSystemAlarm() {
        getSystemAlarm().then(data => {
          if (data && data.success) {
            this.systemAlarmsData = []
            this.secondTotal = 0
            if (data.data.length) {
              this.drillingDataAll = data.data
              this.secondTotal = data.data.length
              let names = [...new Set(data.data.map(item => item.systemname))]
              names.forEach(name => {
                let value = data.data.filter(item => item.systemname == name).length
                this.systemAlarmsData.push({ name, value })
              })
            }
          }
        })
      },

      // 鼠标移入
      ltMouseEnter() {
        this.drillingData = this.drillingDataAll
        this.isShow = true
      },
      // 鼠标移出
      ltMouseLeave() {
        this.isShow = false
      },
      // 饼图移入触发
      pieMouseOver(data) {
        this.isShow = true
        this.drillingData = this.drillingDataAll.filter(item => item.systemname == data.name) || []
      },
      // 饼图移出触发
      pieMouseOut() {
        this.isShow = false
      },

      // request1

      // getTotalAlarms() {
      //   totalAlarms().then(response => {
      //     if (response && response.success) {
      //       if (response.data.length === 0) {
      //         return
      //       }
      //       this.count = response.data[0].value
      //       // setTimeout(this.getTotalAlarms, 3000);
      //     }
      //   })
      // },


      // 系统报警次数
      getsystemalarms() {
        getsystemalarms().then(data => {
          if (data && data.success) {
            this.systemAlarmsData = []
            if (data.data.length) {
              this.secondTotal = 0
              data.data.forEach(item => {
                this.secondTotal += item.value
                this.systemAlarmsData.push({
                  value: item.value,
                  name: item.ext_1
                })
              })
            }
          }
        })
      },
      // getSystemAlarms() {
      //   systemAlarms().then(response => {
      //     if (response && response.success) {
      //       this.systemAlarmsData = response.data
      //       // setTimeout(this.getSystemAlarms, 3000);
      //     }
      //   })
      // },
      getDeviceAlarms() {
        deviceAlarms().then(response => {
          if (response && response.success) {
            this.deviceAlarmsData = response.data
            // setTimeout(this.getDeviceAlarms, 3000);
          }
        })
      },
      // 报警弹窗
      getAlarmDetails() {
        alarmDetails().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              if (data.data[0].close != 1) {
                // let types = ['启动', '停止']
                // data.data[0].systemName = data.data[0].alarm_system || ''
                // data.data[0].status = types[Math.floor(Math.random() * 2)]
                // data.data[0].time = data.data[0].alarm_time 
                this.$refs.AlarmDialog_lc.init(data.data[0])
              }
            }
          }
        })
      }
    },
  }
</script>
<style scoped>
  .box {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
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

  .echart1 {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .echart2 {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  /* 小表格 */
  .table {
    width: 4.4271rem;
    /* height: .520833rem; */
    position: absolute;
    top: 1rem;
    left: .9375rem;
    z-index: 99;
  }

  .tableTitle {
    width: 100%;
    height: .125rem;
    display: flex;
  }

  .tableTitle>div {
    width: 12.5%;
    height: 100%;
    background-color: #3b4760;
    border: .005208rem solid #000722;
    box-sizing: border-box;
    text-align: center;
    line-height: .125rem;
    font-size: .0625rem;
    color: #fff;
  }

  .tableTitle>div:nth-of-type(1) {
    /* width: 13%; */
    height: 100%;
    background-color: #3b4760;
    border: .005208rem solid #000722;
    box-sizing: border-box;
    font-size: .0625rem;
    color: #fff;
  }

  .tableContent {
    width: 100%;
    /* height: calc(100% - .125rem); */
    /* overflow-y: auto; */
  }

  .tableContent>div {
    width: 100%;
    height: .125rem;
    display: flex;
  }

  .tableContent>div>div {
    width: 12.5%;
    height: 100%;
    background-color: #242b41;
    border: .005208rem solid #000722;
    box-sizing: border-box;
    text-align: center;
    line-height: .125rem;
    font-size: .0625rem;
    color: #fff;
  }

  .tableContent>div>div:nth-of-type(1) {
    /* width: 13%; */
    height: 100%;
    background-color: #242b41;
    border: .005208rem solid #000722;
    box-sizing: border-box;
    font-size: .0625rem;
    color: #fff;
  }

  /deep/.el-dialog__wrapper {
    z-index: 1 !important;
    top: 34%;
    pointer-events: none !important;
  }
</style>