<doc>
  柱状图
</doc>
<template>
  <div id="line3" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '../../../../utils/echartPxToRem.js'
  export default {
    props: ['xValue','yValue'],
    data() {
      return {
        charts: '',
      };
    },
    watch: {
      yValue() {
        this.show('line3')
      }
    },
    mounted() {
      this.show('line3')
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#1890FF', '#fac800'],
          tooltip: {},
          xAxis: {
            name: "(区域)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(13),
              align: 'left',
              verticalAlign: 'top'
            },
            offset:fontChart(10),
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#0092D5'
              }
            },
            axisLabel: {
              interval: 0,
              rotate: fontChart(10),
              align:'center',
              color: 'rgba(255, 255, 255, 0.8)',
              textStyle: {
                fontSize:fontChart(12)
              }
            },
            data: this.xValue
          },
          yAxis: {
            name: "(人)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(13),
              align: 'right'
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#0092D5',
                opacity: 0.3
              }
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.8)',
              align:'center',
              textStyle: {
                fontSize:fontChart(13)
              }
            },
          },
          grid: {
            top: '19%',
            bottom: '8%',
            left: '9%',
            right: '10%'
          },
          series: [{
            type: 'bar',
            data: this.yValue,
            barMaxWidth: fontChart(20),
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: { //数值样式
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize:fontChart(12)
                  }
                }
              }
            },
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.show('line3')
      }
    }
  }
</script>
<style scoped>

</style>