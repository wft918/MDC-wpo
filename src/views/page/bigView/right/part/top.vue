<doc>
  10m 大屏 右上
</doc>
<template>
  <div class="box">
    <p class="title">矿井安全风险管控统计</p>
    <div class="content">
      <div class="part">
        <p class="num">{{riskAll| numberToCurrency}}</p>
        <p class="text">风险总数</p>
      </div>
      <div class="part zd">
        <p class="num">{{greatRisk| numberToCurrency}}</p>
        <p class="text">重大风险</p>
      </div>
      <div class="part jd">
        <p class="num">{{largerRisk| numberToCurrency}}</p>
        <p class="text">较大风险</p>
      </div>
      <div class="part yb">
        <p class="num">{{ordinaryRisk| numberToCurrency}}</p>
        <p class="text">一般风险</p>
      </div>
      <div class="part dfx">
        <p class="num">{{lowRisk| numberToCurrency}}</p>
        <p class="text">低风险</p>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  // import { systemrisk } from "@/api/screenInterface";
  import { systemRisk, riskByGradeYear } from '@/api/bigView2'
  export default {
    data() {
      return {
        riskAray: [],
        riskAll: '0',
        greatRisk: '0',
        largerRisk: '0',
        ordinaryRisk: '0',
        lowRisk: '0',
      }
    },
    mounted() {
      // this.getSystemrisk()
      this.systemRisk()
      // this.riskByGradeYear()
    },
    methods: {

      // request2
      systemRisk() {
        systemRisk().then(data => {
          if (data && data.success) {
            // this.riskAll = data.data[0].value
            if(data.data.length) {
              data.data.forEach(item => {
                if(item.indicator_name == '风险总数') {
                  this.riskAll = item.value
                }else if(item.indicator_name == '重大风险') {
                  this.greatRisk = item.value
                }else if(item.indicator_name == '较大风险') {
                  this.largerRisk = item.value
                }else if(item.indicator_name == '一般风险') {
                  this.ordinaryRisk = item.value
                }else if(item.indicator_name == '低风险') {
                  this.lowRisk = item.value
                }
              })
            }
          }
        })
      },

      // riskByGradeYear() {
      //   riskByGradeYear().then(data => {
      //     if (data && data.success) {
      //       this.riskAray = data.data
      //       for (var i in this.riskAray) {
      //         if (this.riskAray[i].indicator_name == '重大风险年度统计') {
      //           this.greatRisk = Number(this.riskAray[i].value)
      //         }
      //         if (this.riskAray[i].indicator_name == '较大风险年度统计') {
      //           this.largerRisk = Number(this.riskAray[i].value)
      //         }
      //         if (this.riskAray[i].indicator_name == '一般风险年度统计') {
      //           this.ordinaryRisk = Number(this.riskAray[i].value)
      //         }
      //         if (this.riskAray[i].indicator_name == '低风险年度统计') {
      //           this.lowRisk = Number(this.riskAray[i].value)
      //         }
      //       }
      //     }
      //   })
      // },


      // request1
      getSystemrisk() {
        systemrisk().then(res => {
          if (res && res.success) {
            this.riskAray = res.data
            for (var i in this.riskAray) {
              // console.log(this.riskAray[i])
              if (this.riskAray[i].ext_1 == '风险总数') {
                this.riskAll = this.riskAray[i].value
              }
              if (this.riskAray[i].ext_1 == '重大风险') {
                this.greatRisk = this.riskAray[i].value
              }
              if (this.riskAray[i].ext_1 == '较大风险') {
                this.largerRisk = this.riskAray[i].value
              }
              if (this.riskAray[i].ext_1 == '一般风险') {
                this.ordinaryRisk = this.riskAray[i].value
              }
              if (this.riskAray[i].ext_1 == '低风险') {
                this.lowRisk = this.riskAray[i].value
              }
            }
            this.riskAll = this.greatRisk + this.largerRisk + this.ordinaryRisk + this.lowRisk
          } else {
            this.riskAray = []
          }
        })
      }
    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }

  .title {
    font-size: .083333rem /* 16/192 */;
    color: #00FFFF;
    text-align: center;
    height: .15625rem /* 30/192 */;
    line-height: .15625rem /* 30/192 */;
    font-weight: 650;
    /* text-shadow: 0rem 0rem .052083rem #00FFFF; */
    background: url("../../../../../assets/img/bigView/title-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .content {
    width: 100%;
    height: calc(100% - .15625rem);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .part{
    height: 70%;
    width: 18%;
    background-color: rgba(0, 93, 165, 0.2);
    border: 1px solid #00629C;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .num {
    font-family: "ysbth";
    font-size: .15625rem /* 30/192 */;
  }

  .text {
    font-size: .067708rem /* 13/192 */;
  }

  .zd {
    color: #e20445;
  }

  .jd {
    color: #fd7c01;
  }

  .yb {
    color: #facc14;
  }

  .dfx {
    color: #009bff;
  }
</style>