<template>
  <div style="width: 100%;height: 100%;">
    <div id="botRightBar" style="width: 100%;height:100%;"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    data() {
      return {
        
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.drawBar()
      })
    },
    methods: {
      drawBar() {
        let charts = echarts.init(document.getElementById('botRightBar'))
        let option = {
          title: {
            show:false,
            text: 'World Population'
          },
          color:['#008eea','#fac800','#ff7d00','#f00041'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            textStyle: {
              color:'#79808e'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: 14      //更改坐标轴文字大小
              }
            },
            splitLine: {
              lineStyle: {
                color:'#0f5681',
                type:'dotted'
              }
            },
          },
          yAxis: {
            type: 'category',
            data: ['掘进面', '回采面', '皮带巷', '运输巷', '中央泵房', '绞车房'],
            axisLine: {
              lineStyle: {
                color:'#0f5681'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: 14      //更改坐标轴文字大小
              }
            }
          },
          series: [
            {
              name: '低风险',
              type: 'bar',
              stack: 'Ad',
              data: [22, 12, 33, 70, 13, 63]
            },
            {
              name: '一般风险',
              type: 'bar',
              stack: 'Ad',
              data: [25, 48, 30, 12, 13, 68]
            },
            {
              name: '较大风险',
              type: 'bar',
              stack: 'Ad',
              data: [25, 38, 30, 14, 14, 60]
            },
            {
              name: '重大风险',
              type: 'bar',
              stack: 'Ad',
              data: [25, 28, 30, 14, 41, 87]
            }
          ]
        }
        charts.setOption(option);
        window.addEventListener('resize', () => {
          charts.resize()
        })
      }
    },
  }
</script>
<style scoped>

</style>