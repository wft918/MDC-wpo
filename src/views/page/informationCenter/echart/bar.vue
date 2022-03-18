<doc>
  折线图
</doc>
<template>
  <div id="line3" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem.js'
  export default {
    props: ['xValue','yValue'],
    watch: {
      yValue() {
        this.show('line3')
      }
    },
    data() {
      return {
        charts: '',
      };
    },
    mounted() {
      // this.show('line3')
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
            name:'(类型)',
            nameTextStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              verticalAlign:'top',
              fontSize:fontChart(12)
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
              color: 'rgba(255, 255, 255, 0.8)',
              interval:0,  
              rotate:fontChart(20),
              align:'center',
              textStyle: {
                fontSize:fontChart(12)
              }
            },
            data: this.xValue
          },
          yAxis: {
            name: "(个)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              align: 'right',
              fontSize:fontChart(12)
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
            top: '25%',
            bottom: '10%',
            left: '7%',
            right: '10%'
          },
          series: [{
            type: 'bar',
            data: this.yValue,
            barMaxWidth: 15,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: { //数值样式
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize:fontChart(13)
                  }
                },
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: "#0069F5" // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "#35C3FF" // 100% 处的颜色
                }], false)
              },
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