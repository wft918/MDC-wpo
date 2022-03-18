<doc>
  柱形图
</doc>
<template>
  <div id="barTwo" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  import { costAnalyse3 } from "@/api/output";
  export default {
    data() {
      return {
        charts: '',
        arr: [],
        costDay: [],
        costArray: [],
      };
    },
    mounted() {
      this.constAnay3()
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      constAnay3() {
        costAnalyse3().then(res => {
          var month = []
          if (res && res.success) {
            this.arr = res.data
            this.arr.forEach(i => {
              month.push(i.month)
              this.costDay = [...new Set(month)]   //去除重复月份
              let nub = Number(i.cost).toFixed(2)
              this.costArray.push(nub)
            })
            this.show("barTwo")
          } else {
            this.arr = []
          }
        })
      },
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          title: {
            text: '万吨煤成本',
            textAlign: 'left',
            x: 'center',
            y: 'top',
            top: 5,
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12)
            }
          },
          color: ['#0d81f7', '#0fb42c'],
          tooltip: {},
          xAxis: {
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
              textStyle: {
                fontSize:fontChart(12)
              }
            },
            data: this.costDay,//["1月", "2月", "3月", "4月", "5月", "6月", "7月"]
          },
          yAxis: {
            name: "(万元)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12),
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
              textStyle: {
                fontSize:fontChart(12)
              }
            },
          },
          grid: {
            top: '20%',
            bottom: '10%',
            left: '15%',
            right: '8%'
          },
          series: [{
            name: '成本分析',
            barWidth: fontChart(15),
            type: 'bar',
            data: this.costArray,  // [5, 20, 36, 10, 10, 20, 16],
            itemStyle: {
              normal: {
                // label: {
                //   show: true, //开启显示
                //   position: 'top', //在上方显示
                //   textStyle: { //数值样式
                //     color: '#fff',
                //     fontSize: 10
                //   }
                // }, 
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: "#0069F5" // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "#35C3FF" // 100% 处的颜色
                }], false)
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
        this.show("barTwo")
      }
    }
  }
</script>
<style scoped>

</style>