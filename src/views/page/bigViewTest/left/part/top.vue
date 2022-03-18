<doc>
  10m 大屏 左上部分
</doc>
<template>
  <div class="box">
    <p class="title">生产指标</p>
    <div class="content">
      <div class="part echart-div">
        <div class="echart-item">
          <div class="echart-b">
            <progress-model :id="'echart1'" :name="'日产量'" :unit="'吨'" :value="value1" :allCount='jh1' :okCount="lj1">
            </progress-model>
          </div>
          <p class="msg">本月累计量</p>
          <p class="msg num">{{lj1}}吨</p>
          <p class="msg">完成计划</p>
          <p class="msg num">{{ Number((lj1/jh1)*100).toFixed(0) }}%</p>
        </div>
        <div class="echart-item">
          <div class="echart-b">
            <progress-model :id="'echart2'" :name="'日掘进进尺'" :unit="'米'" :value="value2" :allCount='jh2' :okCount="lj2">
            </progress-model>
          </div>
          <p class="msg">本月累计量</p>
          <p class="msg num">{{lj2}}米</p>
          <p class="msg">完成计划</p>
          <p class="msg num">{{ Number((lj2/jh2)*100).toFixed(0) }}%</p>
        </div>
        <div class="echart-item">
          <div class="echart-b">
            <progress-model :id="'echart3'" :name="'日洗煤量'" :unit="'吨'" :value="value3" :allCount='jh3' :okCount="lj3">
            </progress-model>
          </div>
          <p class="msg">本月累计量</p>
          <p class="msg num">{{lj3}}吨</p>
          <p class="msg">完成计划</p>
          <p class="msg num">{{ Number((lj3/jh3)*100).toFixed(0) }}%</p>
        </div>
        <div class="echart-item">
          <div class="echart-b">
            <progress-model :id="'echart4'" :name="'日抽放打钻进尺'" :unit="'米'" :value="value4" :allCount='jh4'
              :okCount="lj4"></progress-model>
          </div>
          <p class="msg">本月累计量</p>
          <p class="msg num">{{lj4}}米</p>
          <p class="msg">完成计划</p>
          <p class="msg num">{{ Number((lj4/jh4)*100).toFixed(0) }}%</p>
        </div>
        <div class="echart-item">
          <div class="echart-b">
            <progress-model :id="'echart5'" :name="'日销量'" :unit="'吨'" :value="value5" :allCount='jh5' :okCount="lj5">
            </progress-model>
          </div>
          <p class="msg">本月累计量</p>
          <p class="msg num">{{lj5}}吨</p>
          <p class="msg">完成计划</p>
          <p class="msg num">{{ Number((lj5/jh5)*100).toFixed(0) }}%</p>
        </div>
      </div>
      <div class="part data-div">
        <div class="part-d">
          <div class="data-item">
            <p>上月吨煤耗电成本</p>
            <p class="data-num">{{topBotObj.value1 | numberToCurrency}}</p>
            <p>元/吨</p>
          </div>
          <div class="data-item">
            <p>日人员功效</p>
            <p class="data-num">{{topBotObj.value2 | numberToCurrency}}</p>
            <p>吨/天</p>
          </div>
          <div class="data-item">
            <p>上月耗电量</p>
            <p class="data-num">{{topBotObj.value3 | numberToCurrency}}</p>
            <p>千瓦时</p>
          </div>
        </div>
        <div class="part-d">
          <div class="data-item">
            <p>日综采开机率</p>
            <p class="data-num">{{topBotObj.value4}}</p>
            <p>%</p>
          </div>
          <div class="data-item">
            <p>日综掘开机率</p>
            <p class="data-num">{{topBotObj.value5}}</p>
            <p>%</p>
          </div>
          <div class="data-item">
            <p>日主运开机率</p>
            <p class="data-num">{{topBotObj.value6}}</p>
            <p>%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import progressModel from '@/views/page/bigViewTest/left/echarts/progressModel'
  // import { getdailyreport, getmonthlyreportsummary, getmonthlycomplete, getelepertonlastmonth, getdailyoutputperman, getelecostlastmonth, getoperationrate } from '@/api/bigView'
  import { getoutput_forward_day, systemOperationRate, dailyOutputPerMan, drillingPlan, getoutput_forward_month, getoutput_forward_plan, getwashing_day, getwashing_month, getwashing_plan, getdrilling_day, getdrilling_month, getselling_day, getselling_month, getselling_plan, getele_per_ton_last_month, getele_cons_last_month, getleader } from '@/api/bigView2'
  export default {
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
    components: {
      progressModel
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
      /*
        request1
      */
      // 获取统计
      // getdailyreport() {
      //   getdailyreport().then(data => {
      //     if(data && data.success) {
      //       if(data.data.length) {
      //         this.value1 = data.data[0].d_dayoutput
      //         this.value2 = data.data[0].d_dayforward
      //         this.value3 = data.data[0].d_dayselling
      //         this.value4 = data.data[0].d_daywashing
      //         this.value5 = data.data[0].d_daydrilling
      //       }
      //     }
      //   })
      // },
      // // 累计量
      // getmonthlyreportsummary() {
      //   getmonthlyreportsummary().then(data => {
      //     if(data && data.success) {
      //       if(data.data.length) {
      //         this.lj1 = data.data[0]['sum(d_dayoutput)']
      //         this.lj2 = data.data[0]['sum(d_dayforward)']
      //         this.lj3 = data.data[0]['sum(d_dayselling)']
      //         this.lj4 = data.data[0]['sum(d_daywashing)']
      //         this.lj5 = data.data[0]['sum(d_daydrilling)']
      //       }
      //     }
      //   })
      // },
      // //完成率
      // getmonthlycomplete() {
      //   getmonthlycomplete().then(data => {
      //     if(data && data.success) {
      //       if(data.data.length) {
      //         // 无数据
      //       }
      //     }
      //   })
      // },
      //   // 耗电成本
      // getelepertonlastmonth() {
      //   getelepertonlastmonth().then(data => {
      //     if(data && data.success) {
      //       if(data.data.length) {
      //         this.topBotObj.value1 = (data.data[0].ele_per_ton).toFixed(2)
      //       }
      //     }
      //   })
      // },
      // // 人员功效
      // getdailyoutputperman() {
      //   getdailyoutputperman().then(data => {
      //     if(data && data.success) {
      //       if(data.data.length) {
      //         // 无数据
      //       }
      //     }
      //   })
      // },
      // // 耗电量
      // getelecostlastmonth() {
      //   getelecostlastmonth().then(data => {
      //     if(data && data.success) {
      //       if(data.data.length) {
      //         this.topBotObj.value3 = data.data[0].d_consume
      //       }
      //     }
      //   })
      // },
      // // 开机率
      // getoperationrate() {
      //   getoperationrate().then(data => {
      //     if(data && data.success) {
      //       if(data.data.length) {
      //         data.data.forEach(item => {
      //           if(item.indicator_name == '综采开机率') {
      //             this.topBotObj.value4 = item.value
      //           }else if(item.indicator_name == '综掘开机率') {
      //             this.topBotObj.value5 = item.value
      //           }else if(item.indicator_name == '主运开机率') {
      //             this.topBotObj.value6 = item.value
      //           }
      //         })
      //       }
      //     }
      //   })
      // },

      /*
        request2
      */
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

    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }

  .title {
    font-size: .083333rem
      /* 16/192 */
    ;
    color: #00FFFF;
    text-align: center;
    height: .15625rem
      /* 30/192 */
    ;
    line-height: .15625rem
      /* 30/192 */
    ;
    font-weight: 900;
    /* text-shadow: 0rem 0rem .026042rem #00FFFF;  */
    background: url("../../../../../assets/img/bigView/title-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .content {
    width: 100%;
    height: calc(100% - .15625rem);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .part {
    width: 100%;
    height: 49%;
  }

  .echart-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .echart-item {
    width: 19%;
    height: 100%;
  }

  .echart-b {
    width: 100%;
    height: 60%;
  }

  .msg {
    text-align: center;
    font-size: .067708rem
      /* 13/192 */
    ;
  }

  .num {
    color: #1890ff;
  }

  .data-div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .part-d {
    height: 43%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .data-item {
    width: 30%;
    height: 100%;
    border: 1px solid #00629C;
    background-color: rgba(0, 93, 165, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: .072917rem
      /* 14/192 */
    ;
  }

  .data-num {
    font-size: .104167rem
      /* 20/192 */
    ;
    font-family: 'ysbth';
    color: #1890ff;
  }
</style>