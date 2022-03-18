<template>
  <div style="width: 100%;height: 100%;background-color: #1c233a;">
    <div style="width: 100%;height: 35px;line-height: 35px;padding-left: 5px;position: relative;">
      <!-- <span style="color: #00c1fa;">月度三围统计</span> -->
      <p class="title">月度三违统计</p>
    </div>
    <div style="width: 100%;height: calc(100% - 35px);">
      <ltrc-charts :id="'charts2'" :xValue="xValue" :yValue="yValue"></ltrc-charts>
    </div>
  </div>
</template>
<script>
  import ltrcCharts from './echarts/ltrcCharts'
  // import { getsystemviolation } from '@/api/safetySupervision'
  import { gettrouble_all } from '@/api/safetySupervision2'
  export default {
    data() {
      return {
        xValue:[],
        yValue:[]
      }
    },
    components: {
      ltrcCharts
    },
    mounted() {
      // this.getsystemviolation()
      this.gettrouble_all()
    },
    methods: {
      // 月度三围统计
      getsystemviolation() {
        getsystemviolation().then(data => {
          if(data && data.success) {
            this.xValue = []
            this.yValue = []
            if(data.data.length) {
              data.data.forEach(item => {
                this.xValue.push(item.indicator_name)
                this.yValue.push(parseFloat(item.value))
              })
            }
          }
        })
      },
      // 月度三围统计
      gettrouble_all() {
        gettrouble_all().then(data => {
          if(data && data.success) {
            this.xValue = []
            this.yValue = []
            if(data.data.length) {
              data.data.forEach(item => {
                this.xValue.push(item.indicator_name)
                this.yValue.push(parseFloat(item.value))
              })
            }
          }
        })
      }
    },
  }
</script>
<style scoped>
  .title {
    color: #03b5eb;
    font-size: .078125rem /* 15/192 */;
    font-weight: 600;
    position: absolute;
    top: 0rem /* 10/192 */;
    left: .078125rem /* 15/192 */;
  }
</style>