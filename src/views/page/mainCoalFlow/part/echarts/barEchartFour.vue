<doc>
  柱形图
</doc>
<template>
  <div id="barFour" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  import { Allmonitor, monitorPerson, monitorTime } from "@/api/output";

  export default {
    data() {
      return {
        charts: '',
        allObj: [],
        allTime: [],
        allNum: [],
      };
    },
    mounted() {
      this.allmonitor()
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {

      allmonitor() {
        Allmonitor().then(res => {
          var month = []
          if (res && res.success) {
            this.allObj = res.data
            this.allObj.forEach(i => {
              //console.log(i) 
              month.push(i.ext_1)
              this.allTime = [...new Set(month)]   //去除重复月份
              let nub = Number(i['value']).toFixed(2)
              this.allNum.push(nub)
            })
            this.show("barFour")
          } else {
            this.allObj = []
          }
        })
      },


      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          title: {
            text: '万吨生产时间',
            textAlign: 'left',
            x: 'center',
            y: 'top',
            top: 15,
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
              fontSize: fontChart(12)
            },
            data: this.allTime
          },
          yAxis: {
            name: "(小时)",
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
              fontSize: fontChart(12)
            },
          },
          grid: {
            top: '25%',
            bottom: '10%',
            left: '12%',
            right: '10%'
          },
          series: [{
            name: '智能启动',
            barWidth: fontChart(15),
            type: 'bar',
            data: this.allNum,
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
        this.show("barFour")
      }
    }
  }
</script>
<style scoped>

</style>