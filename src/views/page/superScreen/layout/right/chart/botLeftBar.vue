<template>
  <div style="width: 100%;height: 100%;">
    <div id="botLeftBar" style="width: 100%;height:100%;"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    data() {
      return {
        xValue:['3308掘进面','3203综采面','3303掘进面','3206掘进面','中央变电所','总回风巷'],
        yValue:[18,18,15,13,20,17]
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.drawBar()
      })
    },
    methods: {
      drawBar() {
        let charts = echarts.init(document.getElementById('botLeftBar'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show:false,
            data: ['违章指挥'],
            textStyle: {
              // fontSize: 12,
              color: '#7e8390'
            },
            // itemStyle: {
            //   borderType: 'dashed',
            //   borderColor: '#0182d6',
            //   borderWidth: 1
            // }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.xValue,
            axisTick: {
              alignWithLabel: true
            },
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
          yAxis: {
            type: 'value',
            name: '人',
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
          series: [
            {
              // name: '违章指挥',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#32befe' },
                      { offset: 1, color: '#016cf4' }
                    ]
                  )
                }
              },
              label: {
                show:true,
                position: 'top'
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#32befe' },
                    { offset: 1, color: '#016cf4' }
                  ]
                )
              },
              data: this.yValue
            },
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