<doc>
  折线图
</doc>
<template>
  <div id="line2" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem.js'
  export default {
    props: ['areaxValue','areayValue'],
    data() {
      return {
        charts: '',
      };
    },
    watch: {
      areayValue() {
        this.show('line2')
      }
    },
    mounted() {
      this.show('line2')
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
            name:'(区域)',
            nameTextStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              verticalAlign:'top',
              fontSize:fontChart(12)
            },
            axisTick: {
              show: false
            },
            // offset:fontChart(10),
            axisLine: {
              lineStyle: {
                color: '#0092D5'
              }
            },
            axisLabel: {
              interval:0,
              // rotate:fontChart(10),
              align:'center',
              color: 'rgba(255, 255, 255, 0.8)',
              textStyle: {
                fontSize:fontChart(12)
              }
            },
            data: this.areaxValue
            // data: ['3308综采面', '3203综采面', '3303综采面', '3206综采面', '中央变电所', '总回风岗']
          },
          yAxis: {
            name: "(人)",
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
                fontSize:fontChart(12)
              }
            },
          },
          grid: {
            top: '15%',
            bottom: '12%',
            left: '7%',
            right: '7%'
          },
          series: [{
            type: 'bar',
            data: this.areayValue,
            // data: [18, 18, 15, 13, 20, 17],
            barMaxWidth: 25,
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
        this.show('line2')
      }
    }
  }
</script>
<style scoped>

</style>