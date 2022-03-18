<template>
  <div style="width: 100%;height: 100%;">
    <div id="charts9" style="width: 100%;height:100%;"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    data() {
      return {

      }
    },
    props:['rawData','labels','xValue'],
    watch: {
      rawData() {
        this.drawHeat()
        console.log(this.xValue)
      }
    },
    mounted() {
      // this.drawHeat()
    },
    methods: {
      drawHeat() {
        let charts = echarts.init(document.getElementById('charts9'))
        let rawData = this.rawData
        let labels = this.labels
        let xValue = this.xValue
        let data = [];
        for (let i = 0; i < rawData.length; i++) {
          for (let j = 0; j < rawData[i].length; j++) {
            let label = labels[i];
            data.push([j, rawData[i][j], label]);
          }
        }
        let option = {
          backgroundColor:'#003eb1',
          singleAxis: {
            max: 'dataMax',
            bottom:'10%'
          },
          axisTick: {
            show:false,
          },
          color:['#c8fd01','#c8fd01','#c8fd01','#fa3300'],
          series: [
            {
              type: 'themeRiver',
              // itemStyle:{
              //   color:'red'
              // },
              data: data,
              label: {
                show: false
              }
            }
          ]
        }
        charts.setOption(option);
      }
    },
  }
</script>