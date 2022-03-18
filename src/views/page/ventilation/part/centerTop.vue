<template>
  <div style="width: 100%;height: 100%;padding: .104167rem /* 20/192 */;padding-top: .208333rem /* 40/192 */;box-sizing: border-box;display: flex;flex-direction: column;justify-content: space-between;">
    <div class="branchtb">
      <div>
        <div>
          <cen-top-pie :id="'ctpie1'" :text="'日抽放'" :totalNum="monthLj" :value="dayValue"></cen-top-pie>
        </div>
        <div>
          <p style="color: #c9cad0;font-size: .067708rem;text-align: center;">本月累积量</p>
          <p style="color: #048bde;font-size: .067708rem;text-align: center;">{{monthLj}}米</p>
          <p style="color: #c9cad0;font-size: .067708rem;text-align: center;">完成计划</p>
          <p style="color: #048bde;font-size: .067708rem /* 13/192 */;text-align: center;">{{topPlan}}</p>
        </div>
      </div>
      <div>
        <cen-top-line :id="'ctline1'" :average="average_day" :tooltipName="'日抽放打钻进尺'" :title="'日抽放打钻进尺'" :xValue="xValueWeek" :yValue="yValueWeek"></cen-top-line>
      </div>
    </div>
    <div class="branchtb">
      <div>
        <div>
          <cen-top-pie :id="'ctpie2'" :text="'月抽放'" :totalNum="yearLj" :value="monthValue"></cen-top-pie>
        </div>
        <div>
          <p style="color: #c9cad0;font-size: .067708rem;text-align: center;">本年累积量</p>
          <p style="color: #048bde;font-size: .067708rem;text-align: center;">{{yearLj}}米</p>
          <p style="color: #c9cad0;font-size: .067708rem;text-align: center;">完成计划</p>
          <p style="color: #048bde;font-size: .067708rem;text-align: center;">{{botPlan}}</p>
        </div>
      </div>
      <div>
        <cen-top-line :id="'ctlin2'" :average="average_month" :tooltipName="'月抽放打钻进尺'" :title="'月抽放打钻进尺'" :xValue="xValueMonth" :yValue="yValueMonth"></cen-top-line>
      </div>
    </div>
  </div>
</template>
<script>
  import cenTopPie from '../echart/cenTopPie'
  import cenTopLine from '../echart/cenTopLine'
  import { getDrillingPlan,getDrillingMonth,getDrillingDay,getDrillingWeek,getDrillingMonths,getDrillingYear } from '@/api/ventilation'
  export default {  
    data() {
      return {
        dayValue:0,
        monthLj:0,
        topPlan:'0',

        monthValue:0,
        yearLj:0,
        botPlan:'0',
        xValueWeek:[],
        yValueWeek:[],
        average_day:0,
        xValueMonth:[],
        yValueMonth:[],
        average_month:0,
      }
    },
    components: {
      cenTopLine,
      cenTopPie
    },
    mounted() {
      this.getTopData()
      this.getBotData()
      this.getDrillingWeek()
      this.getDrillingMonths()
    },
    methods: {
      getTopData() {
        let p1 = getDrillingDay()
        let p2 = getDrillingMonth()
        Promise.all([p1,p2]).then(result => {
          if(result.length) {
            if(result[0] && result[0].success) {
              if(result[0].data.length) {
                this.dayValue = parseInt(result[0].data[0]['日抽放打钻进尺'])
              }
            }
            if(result[1] && result[1].success) {
              if(result[1].data.length) {
                this.monthLj = parseInt(result[1].data[0]['月累计抽放打钻进尺'])
              }
            }
            if(result[0].success && result[1].success) {
              if(result[0].data.length && result[1].data.length) {
                this.topPlan = ((this.dayValue / this.monthLj) * 100).toFixed(0) + '%'
              }
            }
          }
        })
      },
      getBotData() {
        let p1 = getDrillingPlan()
        let p2 = getDrillingYear()
        Promise.all([p1,p2]).then(result => {
          if(result.length) {
            if(result[0] && result[0].success) {
              if(result[0].data.length) {
                this.monthValue = parseInt(result[0].data[0]['月计划抽放打钻进尺'])
              }
            }
            if(result[1] && result[1].success) {
              if(result[1].data.length) {
                this.yearLj = parseInt(result[1].data[0]['sum(d_drilling)'])
              }
            }
            if(result[0].success && result[1].success) {
              if(result[0].data.length && result[1].data.length) {
                this.botPlan = parseInt((this.monthValue / this.yearLj) * 100).toFixed(0) + '%'
              }
            }
          }
        })
      },
      // 近七日打钻进尺
      getDrillingWeek() {
        getDrillingWeek().then(data => {
          if(data && data.success) {
            this.xValueWeek = []
            this.yValueWeek = []
            if(data.data.length) {
              let totalNum = 0
              data.data.forEach(item => {
                totalNum += item.d_drilling?item.d_drilling:0
                this.xValueWeek.push(item.d_datetime.split(' ')[0])
                this.yValueWeek.push(item.d_drilling?item.d_drilling:0)
              })
              this.average_day = parseInt(totalNum / data.data.length)
            }
          }
        })
      },
      // 近七月各月累积打钻进尺
      getDrillingMonths() {
        getDrillingMonths().then(data => {
          if(data && data.success) {
            this.xValueMonth = []
            this.yValueMonth = []
            if(data.data.length) {
              let totalNum = 0
              data.data.forEach(item => {
                totalNum += item.drilling?item.drilling:0
                this.xValueMonth.push(item.month)
                this.yValueMonth.push(item.drilling?item.drilling:0)
              })
              this.average_month = parseInt(totalNum / data.data.length)
            }
          }
        })
      },
    },
  }
</script>
<style scoped>
  .branchtb {
    width: 100%;
    height: 48%;
    display: flex;
  }
  .branchtb > div:nth-of-type(1) {
    width: 30%;
    height: 100%;
  }
  .branchtb > div:nth-of-type(1)>div:nth-of-type(1) {
    width: 100%;
    height: 64%;
  }
  .branchtb > div:nth-of-type(1)>div:nth-of-type(2) {
    width: 100%;
    height: 36%;
  }
  .branchtb > div:nth-of-type(2) {
    width: 70%;
    height: 100%;
  }
</style>