<template>
  <div style="width: 100%;height: 100%;" :id="id"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    data() {
      return {
        charts: ''
      }
    },
    props: {
      id: {
        type: String
      },
      xValue: {
        type: Array,
        default: () => ['类别1', '类别2', '类别3', '类别4']
      },
      yValue: {
        type: Array,
        default: () => [2, 4, 3, 5]
      }
    },
    watch: {
      yValue() {
        this.drawBar()
      }
    },
    mounted() {
      this.drawBar()
    },
    methods: {
      drawBar() {
        this.charts = echarts.init(document.getElementById(this.id))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show:false,
            data: ['锚杆受力', '锚索受力'],
            textStyle: {
              fontSize: fontChart(13),
              color: 'rgba(255, 255, 255, 0.8)'
            },
            // itemStyle: {
            //   borderType: 'dashed',
            //   borderColor: '#0182d6',
            //   borderWidth: 1
            // }
          },
          grid: {
            top:'15%',
            left: '6%',
            right: '4%',
            bottom: '3%',
            width:'auto',
            height:'auto',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.xValue,
            axisTick: {
              show:false,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color:'#0f5681'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            type: 'value',
            name: '(立柱压力/MPa)',
            nameTextStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(13),
              align:'center'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
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
              // name: this.name,
              type: 'bar',
              barWidth: '60%',
              itemStyle: {
                color: '#5b9bd5'
              },
              label: {
                show:true,
                position: 'top',
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13)
              },
              data: this.yValue,
            },
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if (!this.charts) return
        this.charts.resize()
        this.drawBar()
      }
    },
  }
</script>