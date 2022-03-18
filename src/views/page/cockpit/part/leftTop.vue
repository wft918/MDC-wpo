<doc>
  生产指标
</doc>
<template>
  <div class="box">
    <p class="title">生产指标</p>
    <div class="top">
      <div class="top-t">
        <progress-model :id='"progressModel1"' :title="'日产量'" :dw="'吨'" :value='value1' :allCount='jh1' :okCount="lj1">
        </progress-model>
        <p style="text-align: center;color: #fff;font-size: .0625rem /* 10/192 */;margin-top: 0rem;">
          本月累计量：<span style="color: #1890ff;">{{(Number(lj1)).toFixed(0)}}</span></p>
        <p
          style="text-align: center;color: #fff;font-size: .0625rem /* 10/192 */;margin-top: .015625rem /* 3/192 */;">
          完成计划：<span style="color: #1890ff;">{{ Number((lj1/jh1)*100).toFixed(0) }}%</span></p>
      </div>
      <div class="top-t">
        <progress-model :id='"progressModel2"' :title="'日掘进进尺'" :dw="'米'" :value='value2' :allCount='jh2'
          :okCount="lj2">
        </progress-model>
        <p style="text-align: center;color: #fff;font-size: .0625rem;margin-top: 0rem;">
          本月累计量：<span style="color: #1890ff;">{{(Number(lj2)).toFixed(0)}}</span></p>
        <p style="text-align: center;color: #fff;font-size: .0625rem;margin-top: .015625rem /* 3/192 */;">
          完成计划：<span style="color: #1890ff;">{{ Number((lj2/jh2)*100).toFixed(0) }}%</span></p>
      </div>
      <div class="top-t">
        <progress-model :id='"progressModel3"' :title="'日洗煤量'" :dw="'吨'" :value='value3' :allCount='jh3' :okCount="lj3">
        </progress-model>
        <p style="text-align: center;color: #fff;font-size: .0625rem;margin-top: 0rem;">
          本月累计量：<span style="color: #1890ff;">{{(Number(lj3)).toFixed(0)}}</span></p>
        <p style="text-align: center;color: #fff;font-size: .0625rem;margin-top: .015625rem;">
          完成计划：<span style="color: #1890ff;">{{ Number((lj3/jh3)*100).toFixed(0) }}%</span></p>
      </div>
      <div class="top-t">
        <progress-model :id='"progressModel4"' :title="'日抽放打钻进尺'" :dw="'米'" :value='value4' :allCount='jh4'
          :okCount="lj4">
        </progress-model>
        <p style="text-align: center;color: #fff;font-size: .0625rem;margin-top: 0rem;">
          本月累计量：<span style="color: #1890ff;">{{(Number(lj4)).toFixed(0)}}</span></p>
        <p style="text-align: center;color: #fff;font-size: .0625rem;margin-top: .005208rem /* 1/192 */;">
          完成计划：<span style="color: #1890ff;">{{ Number((lj4/jh4)*100).toFixed(0) }}%</span></p>
      </div>
      <div class="top-t">
        <progress-model :id='"progressModel5"' :title="'日销售'" :dw="'吨'" :value='value5' :allCount='jh5' :okCount="lj5">
        </progress-model>
        <p style="text-align: center;color: #fff;font-size: .0625rem;margin-top: 0rem;">
          本月累计量：<span style="color: #1890ff;">{{(Number(lj5)).toFixed(0)}}</span></p>
        <p style="text-align: center;color: #fff;font-size: .0625rem;margin-top: .005208rem /* 1/192 */;">
          完成计划：<span style="color: #1890ff;">{{ Number((lj5/jh5)*100).toFixed(0) }}%</span></p>
      </div>
    </div>
    <div class="bottom">
      <div class="b-b">
        <div class="part">
          <p class="p-title">上月吨煤耗电成本</p>
          <p class="num">{{topBotObj.value1 | numberToCurrency}}</p>
          <p class="msg">元/吨</p>
          <!-- <p class="bl">
            <i v-if="momRatio[0]>=0" class="el-icon-caret-top" style="color:#03ac32"></i>
            <i v-else class="el-icon-caret-bottom" style="color:#e6a23c"></i>
            {{momRatio[0]}}%
          </p> -->
        </div>
        <div class="part">
          <p class="p-title">日人员工效</p>
          <p class="num">{{topBotObj.value2 | numberToCurrency}}</p>
          <p class="msg">吨/天</p>
          <!-- <p class="bl">
            <i v-if="momRatio[1]>=0" class="el-icon-caret-top" style="color:#03ac32"></i>
            <i v-else class="el-icon-caret-bottom" style="color:#e6a23c"></i>
            {{momRatio[1]}}%
          </p> -->
        </div>
        <div class="part">
          <p class="p-title">上月耗电量</p>
          <p class="num">{{topBotObj.value3 | numberToCurrency}}</p>
          <p class="msg">千瓦时</p>
          <!-- <p class="bl">
            <i v-if="momRatio[2]>=0" class="el-icon-caret-top" style="color:#03ac32"></i>
            <i v-else class="el-icon-caret-bottom" style="color:#e6a23c"></i>
            {{momRatio[2]}}%
          </p> -->
        </div>
      </div>
      <div class="b-b">
        <div class="part">
          <p class="p-title">日综采开机率</p>
          <p class="num">{{topBotObj.value4 | numberToCurrency}}</p>
          <p class="msg">%</p>
          <!-- <p class="bl">
            <i v-if="momRatio[3]>=0" class="el-icon-caret-top" style="color:#03ac32"></i>
            <i v-else class="el-icon-caret-bottom" style="color:#e6a23c"></i>
            {{momRatio[3]}}%
          </p> -->
        </div>
        <div class="part">
          <p class="p-title">日综掘开机率</p>
          <p class="num">{{topBotObj.value5 | numberToCurrency}}</p>
          <p class="msg">%</p>
          <!-- <p class="bl">
            <i v-if="momRatio[4]>=0" class="el-icon-caret-top" style="color:#03ac32"></i>
            <i v-else class="el-icon-caret-bottom" style="color:#e6a23c"></i>
            {{momRatio[4]}}%
          </p> -->
        </div>
        <div class="part">
          <p class="p-title">日主运开机率</p>
          <p class="num">{{topBotObj.value6 | numberToCurrency}}</p>
          <p class="msg">%</p>
          <!-- <p class="bl">
            <i v-if="momRatio[5]>=0" class="el-icon-caret-top" style="color:#03ac32"></i>
            <i v-else class="el-icon-caret-bottom" style="color:#e6a23c"></i>
            {{momRatio[5]}}%
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import "../../../../utils/flexible.js";
  import progressModel from '@/views/page/cockpit/part/echarts/progressModel'
  // import { getdailyreport, getmonthlyreportsummary, getmonthlycomplete, getelepertonlastmonth, getdailyoutputperman, getelecostlastmonth, getoperationrate } from '@/api/bigView'
  import { getoutput_forward_day, systemOperationRate, dailyOutputPerMan, drillingPlan, getoutput_forward_month, getoutput_forward_plan, getwashing_day, getwashing_month, getwashing_plan, getdrilling_day, getdrilling_month, getselling_day, getselling_month, getselling_plan, getele_per_ton_last_month, getele_cons_last_month, getleader } from '@/api/bigView2'

  export default {
    components: {
      progressModel
    },
    data() {
      return {
        value1: 0,//日产量
        value2: 0,//掘金尺
        value3: 0,//日销量
        value4: 0,//洗煤
        value5: 0,//打钻进尺
        lj1: 0,//日产量
        lj2: 0,//掘金尺
        lj3: 0,//日销量
        lj4: 0,//洗煤
        lj5: 0,//打钻进尺
        jh1: 0,
        jh2: 0,
        jh3: 0,
        jh4: 0,
        jh5: 0,
        topBotObj: {
          value1: 0,
          value2: 0,
          value3: 0,
          value4: 0,
          value5: 0,
          value6: 0,
        }
      }
    },
    mounted() {
      // request1
      // this.getdailyreport() //统计
      // this.getmonthlyreportsummary() //累计
      // this.getmonthlycomplete() //完成率
      // this.getelepertonlastmonth() //耗电成本
      // this.getdailyoutputperman() //功效
      // this.getelecostlastmonth() //耗电量
      // this.getoperationrate() //开机率

      // request2
      this.getoutput_forward_day() //统计  日产量 日掘进进尺 
      this.getoutput_forward_month() //累计  日产量 日掘进进尺 
      this.getoutput_forward_plan() //完成率  日产量 日掘进进尺

      this.getwashing_day() //统计  洗煤量
      this.getwashing_month() //累计  洗煤量
      this.getwashing_plan() //完成率  洗煤量

      this.getdrilling_day() //统计  进尺
      this.getdrilling_month() //累计  进尺

      this.getselling_day() //统计  日销量
      this.getselling_month() //累计  日销量
      this.getselling_plan() //完成率  日销量

      this.getele_per_ton_last_month() //上月吨煤耗电成本
      this.getele_cons_last_month() //上月耗电量

      this.drillingPlan()  // 日抽放钻井进尺完成率
      this.dailyOutputPerMan()  // 日人员功效

      this.systemOperationRate() // 日综采综掘主运开机率



    },
    methods: {
      // 日人员功效
      dailyOutputPerMan() {
        dailyOutputPerMan().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.topBotObj.value2 = data.data[0].value
            }
          }
        })
      },

      // 日综采综掘主运开机率
      systemOperationRate() {
        systemOperationRate().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              data.data.forEach(element => {
                switch (element.indicator_name) {
                  case '主运开机率':
                    this.topBotObj.value6 = element["round(`value`)"]
                    break;
                  case '综采开机率':
                    this.topBotObj.value4 = element["round(`value`)"]
                    break;
                  case '综掘开机率':
                    this.topBotObj.value5 = element["round(`value`)"]
                    break;
                }
              })
            }
          }
        })
      },

      // 日抽放钻井完成率
      drillingPlan() {
        drillingPlan().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.jh4 = data.data[0].月计划抽放打钻进尺
            }
          }
        })
      },
      // 获取统计 日产量 日掘进进尺 
      getoutput_forward_day() {
        getoutput_forward_day().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.value1 = data.data[0].日产量
              this.value2 = data.data[0].日掘进进尺
            }
          }
        })
      },
      // 累计量 日产量 日掘进进尺 
      getoutput_forward_month() {
        getoutput_forward_month().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.lj1 = data.data[0].月累计产量
              this.lj2 = data.data[0].月累计掘进进尺
            }
          }
        })
      },
      //完成率 日产量 日掘进进尺 
      getoutput_forward_plan() {
        getoutput_forward_plan().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              // 无数据
              this.jh1 = data.data[0].月计划产量
              this.jh2 = data.data[0].月计划掘进进尺
            }
          }
        })
      },
      // 洗煤  统计
      getwashing_day() {
        getwashing_day().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.value3 = data.data[0].日洗煤量
            }
          }
        })
      },
      // 洗煤  累计
      getwashing_month() {
        getwashing_month().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.lj3 = data.data[0].月累计洗煤量
            }
          }
        })
      },
      // 洗煤  完成率
      getwashing_plan() {
        getwashing_plan().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.jh3 = data.data[0].月计划洗煤量
            }
          }
        })
      },

      // 进尺  统计
      getdrilling_day() {
        getdrilling_day().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.value4 = data.data[0].日抽放打钻进尺
            }
          }
        })
      },
      // 进尺  累计
      getdrilling_month() {
        getdrilling_month().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.lj4 = data.data[0].月累计抽放打钻进尺
            }
          }
        })
      },

      // 日销量  统计
      getselling_day() {
        getselling_day().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.value5 = data.data[0].日销量
            }
          }
        })
      },
      // 日销量  累计
      getselling_month() {
        getselling_month().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.lj5 = data.data[0].月累计销量
            }
          }
        })
      },
      // 日销量  完成率
      getselling_plan() {
        getselling_plan().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.jh5 = data.data[0].月计划销量
            }
          }
        })
      },
      // 上月吨煤耗电成本
      getele_per_ton_last_month() {
        getele_per_ton_last_month().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.topBotObj.value1 = data.data[0].月吨煤耗电成本
            }
          }
        })
      },
      // 上月耗电量
      getele_cons_last_month() {
        getele_cons_last_month().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.topBotObj.value3 = data.data[0].月耗电量
            }
          }
        })
      },

      // 下面是request1请求的方法

      // 获取统计
      getdailyreport() {
        getdailyreport().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.value1 = data.data[0].d_dayoutput
              this.value2 = data.data[0].d_dayforward
              this.value3 = data.data[0].d_dayselling
              this.value4 = data.data[0].d_daywashing
              this.value5 = data.data[0].d_daydrilling
            }
          }
        })
      },
      // 累计量
      getmonthlyreportsummary() {
        getmonthlyreportsummary().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.lj1 = data.data[0]['sum(d_dayoutput)']
              this.lj2 = data.data[0]['sum(d_dayforward)']
              this.lj3 = data.data[0]['sum(d_dayselling)']
              this.lj4 = data.data[0]['sum(d_daywashing)']
              this.lj5 = data.data[0]['sum(d_daydrilling)']
            }
          }
        })
      },
      //完成率
      getmonthlycomplete() {
        getmonthlycomplete().then(data => {
          console.log('日打井完成率---------->>> ', data)
          if (data && data.success) {
            if (data.data.length) {
              // 无数据
            }
          }
        })
      },
      // 耗电成本
      getelepertonlastmonth() {
        getelepertonlastmonth().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.topBotObj.value1 = (data.data[0].ele_per_ton).toFixed(2)
            }
          }
        })
      },
      // 人员功效
      getdailyoutputperman() {
        getdailyoutputperman().then(data => {
          console.log('人员功效---> ', data)
          if (data && data.success) {
            if (data.data.length) {
              // 无数据
            }
          }
        })
      },
      // 耗电量
      getelecostlastmonth() {
        getelecostlastmonth().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.topBotObj.value3 = data.data[0].d_consume
            }
          }
        })
      },
      // 开机率
      getoperationrate() {
        getoperationrate().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              data.data.forEach(item => {
                if (item.indicator_name == '综采开机率') {
                  this.topBotObj.value4 = item.value
                } else if (item.indicator_name == '综掘开机率') {
                  this.topBotObj.value5 = item.value
                } else if (item.indicator_name == '主运开机率') {
                  this.topBotObj.value6 = item.value
                }
              })
            }
          }
        })
      },
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
    text-shadow: 0rem 0rem 10rem #00FFFF;
    padding-left: .0625rem
      /* 10/192 */
    ;
  }

  .top {
    flex-grow: 5;
    height: .520833rem
      /* 100/192 */
    ;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .top-t {
    width: 25%;
    height: 100%;
  }

  .bottom {
    flex-grow: 5;
    display: flex;
    flex-direction: column;
    padding-top: .0625rem
      /* 10/192 */
    ;
  }

  .b-b {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .part {
    border: .005208rem
      /* 1/192 */
      solid #1890ff;
    height: 90%;
    width: 30%;
    background-color: rgba(0, 98, 156, 0.2);
    padding: .010417rem
      /* 2/192 */
    ;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .p-title {
    color: #fff;
    font-size: .078125rem
      /* 15/192 */
    ;
    text-align: center;
    font-weight: 600;
  }

  .num {
    font-size: .140625rem
      /* 27/192 */
    ;
    color: #009bff;
    text-align: center;
    font-family: "ysbth";

  }

  .msg {
    font-size: .0625rem
      /* 5/192 */
    ;
    color: #97a7b7;
    text-align: center;
  }

  .bl {
    font-size: .067708rem
      /* 13/192 */
    ;
    color: #fff;
    text-align: center;
  }
</style>