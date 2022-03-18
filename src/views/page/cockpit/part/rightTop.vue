<doc>
  本月安全风险统计
</doc>
<template>
  <div class="box">
    <p class="title">矿井安全风险管控统计</p>
    <div class="content">
      <div class="item">
        <p class="num color1">{{riskAll| numberToCurrency}}</p>
        <p class="text color1">风险总数</p>
      </div>
      <div class="item">
        <p class="num color2">{{greatRisk| numberToCurrency}}</p>
        <p class="text color2">重大风险</p>
      </div>
      <div class="item">
        <p class="num color3">{{largerRisk| numberToCurrency}}</p>
        <p class="text color3">较大风险</p>
      </div>
      <div class="item">
        <p class="num color4">{{ordinaryRisk| numberToCurrency}}</p>
        <p class="text color4">一般风险</p>
      </div>
      <div class="item">
        <p class="num color5">{{lowRisk| numberToCurrency}}</p>
        <p class="text color5">低风险</p>
      </div>
    </div>
  </div>
</template>
<script>
  import "../../../../utils/flexible.js";
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
        lowRisk: '0'
      }
    },
    mounted() {
      // this.safety1()
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
      safety1() {
        systemrisk().then(res => {
          //  console.log('本月安全风险统计-------> ', res)
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
      },
    }



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

  .content {
    margin-top: .104167rem
      /* 20/192 */
    ;
    height: .520833rem
      /* 100/192 */
    ;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .item {
    width: 18%;
    height: 90%;
    border: .005208rem
      /* 1/192 */
      solid #1890ff;
    background-color: rgba(0, 98, 156, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .num {
    text-align: center;
    font-size: .166667rem
      /* 32/192 */
    ;
    font-family: "ysbth";
  }

  .text {
    text-align: center;
    font-size: .078125rem
      /* 15/192 */
    ;
  }

  .color1 {
    color: #fff;
  }

  .color2 {
    color: #ff0045;
  }

  .color3 {
    color: #ff7d00;
  }

  .color4 {
    color: #f9cb14;
  }

  .color5 {
    color: #009bff;
  }
</style>