<doc>
  关键设备状态分析
</doc>
<template>
  <div class="box">
    <div class="content">
      <div class="item" :class="{'abnormal':status_1 == '0'}">
        <div class="part">
          <p class="name">采煤机</p>
          <p class="state" :class="{'abnormaltext':status_1 == '0'}">{{status_1}}</p>
        </div>
        <div class="part">
          <p class="time">累计运行时间</p>
          <p class="value">{{time_1}}小时</p>
        </div>
      </div>
      <div class="item" :class="{'abnormal':status_2 == '0'}">
        <div class="part">
          <p class="name">掘进机</p>
          <p class="state" :class="{'abnormaltext':status_2 == '0'}">{{status_2}}</p>
        </div>
        <div class="part">
          <p class="time">累计运行时间</p>
          <p class="value">{{time_2}}小时</p>
        </div>
      </div>
      <div class="item" :class="{'abnormal':status_3 == '0'}">
        <div class="part">
          <p class="name">主运皮带</p>
          <p class="state" :class="{'abnormaltext':status_3 == '0'}">{{status_3}}</p>
        </div>
        <div class="part">
          <p class="time">累计运行时间</p>
          <p class="value">{{time_3}}小时</p>
        </div>
      </div>
      <div class="item" :class="{'abnormal':status_4 == '0'}">
        <div class="part">
          <p class="name">空压机</p>
          <p class="state" :class="{'abnormaltext':status_4 == '0'}">{{status_4}}</p>
        </div>
        <div class="part">
          <p class="time">累计运行时间</p>
          <p class="value">{{time_4}}小时</p>
        </div>
      </div>
      <div class="item" :class="{'abnormal':status_5 == '0'}">
        <div class="part">
          <p class="name">通风机</p>
          <p class="state" :class="{'abnormaltext':status_5 == '0'}">{{status_5}}</p>
        </div>
        <div class="part">
          <p class="time">累计运行时间</p>
          <p class="value">{{time_5}}小时</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { deviceStatus, deviceCumTime } from '@/api/electromechanical2'
  export default {
    data() {
      return {
        status_1: '--',
        status_2: '--',
        status_3: '--',
        status_4: '--',
        status_5: '--',
        time_1: '--',
        time_2: '--',
        time_3: '--',
        time_4: '--',
        time_5: '--',
      }
    },
    mounted() {
      this.deviceStatus()
      this.deviceCumTime()
    },
    methods: {
      // 状态
      deviceStatus() {
        deviceStatus().then(data => {
          if (data && data.success && data.data.length) {
            data.data.forEach(element => {
              switch (element.indicator_name) {
                case '采煤机状态':
                  this.status_1 = element.value
                  break;
                case '掘进机状态':
                  this.status_2 = element.value
                  break;
                case '主运皮带状态':
                  this.status_3 = element.value
                  break;
                case '空压机状态':
                  this.status_4 = element.value
                  break;
                case '通风机状态':
                  this.status_5 = element.value
                  break;
              }
            });
          }
        })
      },
      // 时间
      deviceCumTime() {
        deviceCumTime().then(data => {
          if (data && data.success && data.data.length) {
            data.data.forEach(element => {
              switch (element.indicator_name) {
                case '采煤机累计运行时间':
                  this.time_1 = element.value
                  break;
                case '掘进机累计运行时间':
                  this.time_2 = element.value
                  break;
                case '主运皮带累计运行时间':
                  this.time_3 = element.value
                  break;
                case '空压机累计运行时间':
                  this.time_4 = element.value
                  break;
                case '通风机累计运行时间':
                  this.time_5 = element.value
                  break;
              }
            });
          }
        })
      }
    },


    // props:['statusData','devieceTimeData'],
    // watch: {
    //   statusData(newVal) {
    //     newVal.forEach(item => {
    //       if(item.indicator_name == '采煤机状态') {
    //         this.status_1 = item.value
    //       }else if(item.indicator_name == '掘进机状态') {
    //         this.status_2 = item.value
    //       }else if(item.indicator_name == '主运皮带状态') {
    //         this.status_3 = item.value
    //       }else if(item.indicator_name == '空压机状态') {
    //         this.status_4 = item.value
    //       }else if(item.indicator_name == '通风机状态') {
    //         this.status_5 = item.value
    //       }
    //     })
    //   },
    //   devieceTimeData(newVal) {
    //     newVal.forEach(item => {
    //       if(item.indicator_name == '采煤机累计运行时间') {
    //         this.time_1 = parseInt(item.value)
    //       }else if(item.indicator_name == '掘进机累计运行时间') {
    //         this.time_2 = parseInt(item.value)
    //       }else if(item.indicator_name == '主运皮带累计运行时间') {
    //         this.time_3 = parseInt(item.value)
    //       }else if(item.indicator_name == '空压机累计运行时间') {
    //         this.time_4 = parseInt(item.value)
    //       }else if(item.indicator_name == '通风机累计运行时间') {
    //         this.time_5 = parseInt(item.value)
    //       }
    //     })
    //   }
    // }
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }

  .content {
    height: 50%;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .item {
    width: 18%;
    height: 100%;
    border: 1px solid #00C5FF;
    box-shadow: #0b557b 0px 0px 10px 5px inset;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .abnormal {
    border: 1px solid #FF3365 !important;
    box-shadow: #892142 0px 0px 10px 5px inset !important;
  }

  .abnormaltext {
    color: #FF3365 !important;
  }

  .part {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .name {
    font-size: 20px;
    font-weight: 600;
  }

  .state {
    font-size: 25px;
    font-weight: 600;
    font-family: "ysbth";
  }

  .time {
    font-size: 14px;
  }

  .value {
    font-size: 14px;
    color: #1890ff;
  }
</style>