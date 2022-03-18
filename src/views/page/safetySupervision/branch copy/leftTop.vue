<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .182292rem /* 35/192 */;line-height: .182292rem /* 35/192 */;padding-left: .026042rem /* 5/192 */;position: relative;">
      <p class="title">安全监测</p>
      <!-- <span style="color: #00c1fa;float: left;">安全监测</span> -->
      <el-form style="float: left;margin-left: .520833rem /* 100/192 */" :inline="true" :model="inputForm" ref="inputForm"
        class="demo-form-inline">
        <el-form-item style="transform: translateY(-0.010417rem);" label="选择日期" prop="date">
          <el-date-picker @change="pickerChange" value-format="yyyy-MM-dd" size="mini" v-model="inputForm.date"
            type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 100%;height: calc(100% - .208333rem);display: flex;justify-content: space-between;padding: 0 .208333rem /* 40/192 */;box-sizing: border-box;">
      <!-- 轮播表 -->
      <div style="width: 30%;height: 100%;">
        <p style="color: #828692;text-align: center;font-size: .072917rem /* 14/192 */;margin-bottom: .026042rem /* 5/192 */;">传感器数量</p>
        <div style="width: 100%;height: 40px;;display: flex;justify-content: space-between;line-height: 40px;text-align: center;color: #e7e9ec;background-color: #3c4860;">
          <div style="width: 33.3%;height: 100%;">序号</div>
          <div style="width: 33.3%;height: 100%;">传感器分类</div>
          <div style="width: 33.3%;height: 100%;">数量</div>
        </div>
        <div style="width: 100%;height: calc(90% - 40px);overflow: auto;">
          <div :class="(index + 1) % 2 == 0?'osh':'jsh'" @click="tableClick(index)" v-for="(item,index) in tabelList" :key="index" style="width: 100%;height: 40px;;display: flex;justify-content: space-between;text-align: center;cursor: pointer;">
            <div style="width: 33.3%;height: 100%;color: #e7e9ec;line-height: 40px;">
              {{index + 1}}
            </div>
            <div style="width: 33.3%;height: 100%;color: #e7e9ec;line-height: 40px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;" :style="{'color':currentIndex == index?'#0293f1':'#e7e9ec'}">
              {{item.indicator_name}}
            </div>
            <div style="width: 33.3%;height: 100%;color: #e7e9ec;line-height: 40px;">
              {{item.value}}
            </div>
          </div>
        </div>
      </div>
      <!-- echarts -->
      <div style="width: 65%;height: 100%;">
        <ltrc-charts :id="'charts1'" :xValue="xValue" :yValue="yValue"></ltrc-charts>
      </div>
    </div>
  </div>
</template>
<script>
  import ltrcCharts from './echarts/ltrcCharts'
  // import { getsensorcnts, getsensorstatus } from '@/api/safetySupervision'
  import { getsensor_number, getsensor_status } from '@/api/safetySupervision2'
  export default {
    data() {
      return {
        inputForm: {
          date: ''
        },
        currentIndex:null,
        tabelList:[], //表格数据
        xValue:[],
        yValue:[]
      }
    },
    components: {
      ltrcCharts
    },
    mounted() {
      this.inputForm.date = this.get_date(0) //当天日期
      // this.getsensorcnts() // 安全监控  传感器各种类数量统计
      // this.getsensorstatus() // 安全监控  传感器各种类状态统计
      this.getsensor_number() // 安全监控  传感器各种类数量统计
      this.getsensor_status() // 安全监控  传感器各种类状态统计
    },
    methods: {
      /*
        request1
      */
      // 安全监控  传感器各种类数量统计
      getsensorcnts() {
        getsensorcnts().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.tabelList = data.data
            }
          }
        })
      },
      // 安全监控  传感器各种类状态统计
      getsensorstatus(option) {
        option = option || ''
        let params = {}
        if(option) {
          params.sensortype = option
        }
        getsensorstatus(params).then(data => {
          if(data && data.success) {
            this.xValue = []
            this.yValue = []
            if(data.data.length) {
              data.data.forEach(item => {
                this.xValue.push(item.mark)
                this.yValue.push(parseFloat(item['count(*)']))
              })
            }
          }
        })
      },
      /*
        request2
      */
      // 安全监控  传感器各种类数量统计
      getsensor_number() {
        getsensor_number().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.tabelList = data.data
            }
          }
        })
      },
      // 安全监控  传感器各种类状态统计
      getsensor_status(option) {
        option = option || ''
        let params = {}
        if(option) {
          params.sensortype = option
        }
        getsensor_status(params).then(data => {
          if(data && data.success) {
            this.xValue = []
            this.yValue = []
            if(data.data.length) {
              data.data.forEach(item => {
                this.xValue.push(item.indicator_name)
                this.yValue.push(parseFloat(item['value']))
              })
            }
          }
        })
      },

      // 点击table行
      tableClick(index) {
        this.currentIndex = index
        let sensortype = this.tabelList[index].value
        this.getsensor_status(sensortype)
      },



      //  轮播表 点击所在行回调
      rowClick(row) {
        console.log(row,'row--->')
      },
      // 切换日期选择框
      pickerChange(a) {
        // console.log(this.inputForm.date === a,'切换日期框--->') //true
      },
      addZero(num) {//补0
        if (parseInt(num) < 10) {
          num = '0' + num;
        }
        return num;
      },
      /**
       * 获取指定时间的日期
       * @params 正是今天之后的日期、负是今天前的日期
       * @return 2020-08-22
       * */
      get_date(num) {
        var date1 = new Date();
        //今天时间
        var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + num);
        //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
        var time2 = this.addZero(date2.getFullYear()) + "-" + this.addZero((date2.getMonth() + 1)) + "-" + this.addZero(date2.getDate());
        return time2;
      }
    },
  }
</script>
<style scoped>
  .osh {
    background-color: #242b42;
    -webkit-box-shadow:0 0 10px #070e29;
    -moz-box-shadow:0 0 10px #070e29;
    box-shadow:0 0 10px #070e29;
  }
  .jsh {
    background-color: #1c233b;
  }
  /deep/ .el-input__inner {
    background-color: transparent !important;
    /* border: 1px solid #0076c8!important; */
    color: #fff;
    margin-bottom: 0;
  }

  /deep/ .el-form-item {
    margin-bottom: 0;
  }
  
  .title {
    color: #03b5eb;
    font-size: .078125rem /* 15/192 */;
    font-weight: 600;
    position: absolute;
    top: 0rem /* 10/192 */;
    left: .078125rem /* 15/192 */;
  }
</style>