<doc>
  柱形图
</doc>
<template>
  <div id="barMore1" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '../../../../../utils/echartPxToRem.js'
  export default {
    data() {
      return {
        charts: '',
        xValue: [],
        yValue1: [],
        yValue2: [],
        yValue3: [],
        yValue4: [],
      };
    },
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      list(newVal) {
        this.xValue = []
        this.yValue1 = []
        this.yValue2 = []
        this.yValue3 = []
        this.yValue4 = []
        newVal.forEach(item => {
          this.xValue.push(item.name)
          this.yValue1.push(item['低风险'])
          this.yValue2.push(item['一般风险'])
          this.yValue3.push(item['较大风险'])
          this.yValue4.push(item['重大风险'])
        })
        this.show("barMore1")
      }
    },
    mounted() {

    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#008eea', '#fac800', '#ff7d00', '#f00041'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
              type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {
            show: true,
            top: fontChart(8),
            right: 0,
            x: 'center',
            y: 'top',
            // data: this.nameData,  //['低风险', '一般风险', '较大风险', '重大风险'],
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: fontChart(12)
            },
            itemWidth: fontChart(12),
            itemHeight: fontChart(12)
          },
          xAxis: {
            type: 'value',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 1)',
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
              color: 'rgba(255, 255, 255, 1)',
              fontSize: fontChart(12),
            },
          },
          yAxis: {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#0092D5'
              }
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: fontChart(12),
            },
            data: this.xValue,   //['掘进面', '回采面', '皮带巷', '运输巷', '井下中央泵房', '绞车房', '机电硐室']
          },
          grid: {
            top: '13%',
            bottom: '8%',
            left: '22%',
            right: '2%'
          },
          series: [
            {
              name: '低风险',
              barMaxWidth: fontChart(15),
              type: 'bar',
              stack: 'total',
              emphasis: {
                focus: 'series'
              },
              data: this.yValue1,  // [24, 24, 41, 12, 11, 10, 10],
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'inside', //在上方显示
                    textStyle: { //数值样式
                      color: '#fff',
                      fontSize: fontChart(13)
                    },
                    textBorderColor: '#000',
                    textBorderWidth: 1
                  },
                }
              },
            },
            {
              name: '一般风险',
              barMaxWidth: fontChart(15),
              type: 'bar',
              stack: 'total',
              emphasis: {
                focus: 'series'
              },
              data: this.yValue2,       //[19, 18, 19, 11, 10, 9, 9],
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'inside', //在上方显示
                    textStyle: { //数值样式
                      color: '#fff',
                      fontSize: fontChart(13),
                    },
                    textBorderColor: '#000',
                    textBorderWidth: 1
                  },
                }
              },
            },
            {
              name: '较大风险',
              barMaxWidth: fontChart(15),
              type: 'bar',
              stack: 'total',
              emphasis: {
                focus: 'series'
              },
              data: this.yValue3,  //[21, 21, 25, 46, 10, 9, 9],
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'inside', //在上方显示
                    textStyle: { //数值样式
                      color: '#fff',
                      fontSize: fontChart(13)
                    },
                    textBorderColor: '#000',
                    textBorderWidth: 1
                  },
                }
              },
            },
            {
              name: '重大风险',
              barMaxWidth: fontChart(15),
              type: 'bar',
              stack: 'total',
              emphasis: {
                focus: 'series'
              },
              data: this.yValue4,         //[39, 36, 6, 21, 21, 10, 9],
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'inside', //在上方显示
                    textStyle: { //数值样式
                      color: '#fff',
                      fontSize: fontChart(13)
                    },
                    textBorderColor: '#000',
                    textBorderWidth: 1
                  },
                }
              },
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.show('barMore1')
      }
    }
  }
</script>
<style scoped>

</style>