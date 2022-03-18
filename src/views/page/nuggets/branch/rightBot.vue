<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .182292rem;line-height: .182292rem;padding-left: .026042rem;padding-right: .052083rem;box-sizing: border-box;position: relative;">
      <!-- <span style="color: #00c1fa;">综采支架压力云图</span> -->
      <p class="title">综采支架压力图</p>
    </div>
    <div style="width: 100%;height: calc(100% - .182292rem);">
      <!-- <heat-charts :rawData="rawData" :labels="labels" :xValue="xValue"></heat-charts> -->
      <!-- <heatmap :rawData="rawData"></heatmap> -->
      <rt-bot-bar :id="'rtBotBar'" :xValue="xValue" :yValue="yValue"></rt-bot-bar>
    </div>
  </div>
</template>
<script>
  import heatCharts from './echart/heatCharts'
  import heatmap from '@/views/page/nuggets/branch/echart/heatmap'
  import rtBotBar from './echart/rtBotBar'
  import { getsupportpressure } from '@/api/productionDepartment'
  import { getmonitordata_zjzl } from '@/api/productionDepartment2'
  export default {
    data() {
      return {
        // rawData:[],
        // labels:[],
        xValue:[],
        yValue:[]
      }
    },
    components: {
      heatCharts,
      heatmap,
      rtBotBar
    },
    props:['parentTochild'],
    watch: {
      parentTochild(newVal) {
        // this.drawHeat()
        // this.getsupportpressure() // 综采立柱压力实时监测   request1
        this.getmonitordata_zjzl() // 综采立柱压力实时监测   request2
      }
    },
    mounted() {
      
    },
    methods: {

      
      // 综采立柱压力实时监测  request2
      getmonitordata_zjzl() {
        getmonitordata_zjzl().then(data => {
          if (data && data.success) {
            this.xValue = []
            this.yValue = []
            if (data.data.length) {
              // this.rawData = data.data
              let _data = []
              if(this.parentTochild == '3203综采面') {
                _data = data.data.filter(item => item.areaname == '3203')
              }else if(this.parentTochild == '3308综采面') {
                _data = data.data.filter(item => item.areaname == '3308')
              }
              _data.forEach(item => {
                if(this.xValue.indexOf(item.sensorlocation) < 0) {
                  this.xValue.push(item.sensorlocation)
                  this.yValue.push(parseFloat(item.monitorvalue))
                }
              })
            }
          }
        })
      },


      // request1


      // 综采立柱压力实时监测
      getsupportpressure() {
        getsupportpressure().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.rawData = []
              this.labels = []
              this.xValue = []
              for(let i = 0;i < data.data.length; i++) {
                if(this.labels.indexOf(data.data[i].indicator_name) < 0) {
                  this.labels.push(data.data[i].indicator_name)
                }
              }
              for(let i = 0; i < this.labels.length; i++) {
                this.rawData[i] = []
                let valueList = data.data.filter(item => item.indicator_name == this.labels[i])
                for(let j = 0; j < valueList.length; j++) {
                  this.rawData[i].push(parseInt(valueList[j].value))
                  if(j == 0) {
                    this.xValue.push(parseFloat(valueList[j].stat_time.split(' ')[0].split('-').join('')))
                  }
                }
              }
            }
          }
        })
      },
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