<doc>
  配煤效益分析
</doc>
<template>
  <div class="box">
    <p class="title">配煤效益分析</p>
    <div class="top">
      <div>
        <span> 昨日效益 <span class="num">{{toDayMoney | numberToCurrency}}</span> 元 </span>
        <span style="margin-left: .15625rem /* 30/192 */;"> 自动配煤增加效益 <span class="num">{{zhineng| numberToCurrency}}</span> 元 </span>
      </div>
      <div style="height: 100%;">
        <line-echart :lineData='lineData'></line-echart>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  // 引入线形图组件
  import lineEchart from '@/views/page/mainCoalFlow/part/echarts/lineEchart'
  // API引入
  import { todayBenefits, profitsComparison } from "@/api/coalBlend";
  export default {
    components: {
      lineEchart,
    },
    data() {
      return {
        lineData: [],
        toDayMoney: '--',
        zhineng: '--',
      }
    },
    mounted() {
      this.getTodayBenefitss() // 获取当日效益指标
      this.getCoalBlend() // 智能配煤增加效益
      this.getProfitsComparison() // 智能配煤效益对比
    },
    methods: {
      // 获取当日效益指标
      getTodayBenefitss() {
        todayBenefits({ indicator: 'actual_profit' }).then(response => {
          if (response && response.success) {
            if (response.data.length === 0) {
              return
            }
            this.toDayMoney = response.data[0].value
          }
        })
      },
      // 智能配煤增加效益
      getCoalBlend() {
        todayBenefits({ indicator: 'increased_profit' }).then(response => {
          if (response && response.success) {
            if (response.data.length === 0) {
              return
            }
            this.zhineng = response.data[0].value
          }
        })
      },
      // 智能配煤效益对比
      getProfitsComparison() {
        profitsComparison().then(response => {
          if (response && response.success) {
            this.lineData = this.dealWithData(response.data)
          }
        })
      },
      // 智能配煤效益对比数据分类
      dealWithData(data) {
        let c = [];
        let d = {};
        data.forEach(element => {
          if (!d[element.indicator_name]) {
            c.push({
              item: element.indicator_name,
              allData: [element]
            });
            d[element.indicator_name] = element;
          } else {
            c.forEach(ele => {
              if (ele.item == element.indicator_name) {
                ele.allData.push(element);
              }
            });
          }
        });
        return c;
      }
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
    font-size: .072917rem /* 14/192 */;
    line-height: .072917rem /* 14/192 */;
    font-weight: 650;
    text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;
    padding-left: .052083rem /* 10/192 */;
  }

  .top {
    margin-top: .052083rem /* 10/192 */;
    color: #fff;
    text-align: center;
    font-size: .067708rem /* 13/192 */;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .num {
    border: .015625rem /* 3/192 */ solid #00aad1;
    font-size: .104167rem /* 20/192 */;
    padding: 0rem .078125rem /* 15/192 */;
    color: #ebc601;
    font-weight: 650;
    font-family: "ysbth";
  }
</style>