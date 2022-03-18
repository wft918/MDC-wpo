<doc>
  柱形线型图
</doc>
<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '../../../../utils/echartPxToRem.js'
  export default {
    props: ['id','xValue','yValue1','yValue2','yValue3','nameObj'],
    data() {
      return {
        charts: '',
      };
    },
    watch: {
      yValue3(a) {
        this.show(this.id)
      }
    },
    mounted() {
      this.show(this.id)
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#acff02', '#1d99f7', '#e97405'],
          tooltip: {},
          legend: {
            show: true,
            top: fontChart(40),
            right: 'center',
            data: this.label,
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12)
            },
            itemWidth: fontChart(12),
            itemHeight: fontChart(12)
          },
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
            data: this.xValue
          },
          yAxis: [
            {
              name: "(万吨)",
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
                // align:'center',
                textStyle: {
                  fontSize:fontChart(12)
                }
              },
            },
            {
              type: 'value',
              name: '(%)',
              nameTextStyle: {
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13),
                align: 'left'
              },
              min: 0,
              max: 200,
              interval: 20,
              axisLabel: {
                formatter: '{value}',
                align:'center',
                // textStyle: {
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize:fontChart(12)
                // }
              },
              splitLine: {
                show:false,
                lineStyle: {
                  type: 'dashed',
                  color: '#0092D5',
                  opacity: 0.3
                }
              },
              axisLine: {
                show: false,
              },
            }
          ],
          grid: {
            top: '28%',
            bottom: '12%',
            left: '10%',
            right: '10%'
          },
          series: [{
            name: this.nameObj.name_1,
            barWidth: fontChart(15),
            type: 'bar',
            data: this.yValue1,
            itemStyle: {
              normal: {
                label: {
                  show: false, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: fontChart(10)
                  }
                },
              }
            },
          }, {
            name: this.nameObj.name_2,
            barWidth: fontChart(15),
            type: 'bar',
            data: this.yValue2,
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: true, //开启显示
            //       position: 'top', //在上方显示
            //       textStyle: { //数值样式
            //         color: '#fff',
            //         fontSize: fontChart(10)
            //       }
            //     },
            //   }
            // },
          }, {
            name: '完成率',
            smooth: true,
            type: 'line',
            yAxisIndex: 1,
            color: '#f67a03',
            data: this.yValue3,
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
        this.show(this.id)
      }
    }
  }
</script>
<style scoped>

</style>