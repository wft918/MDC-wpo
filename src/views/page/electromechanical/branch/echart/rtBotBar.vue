<template>
  <div :id="id" style="width: 100%;height: 100%;"></div>
</template>
<script>
  import * as echarts from 'echarts';
  import { fontChart } from '@/utils/echartPxToRem.js'
  export default {
    data() {
      return {
        charts:''
      }
    },
    props: {
      id: {
        type: String
      },
      xValue: {
        type:Array,
        default:() => ['二部胶带机头XX', '二部胶带机头XX', '三采区变电所', '二采区变电所', '中央变电所']
      },
      yValue: {
        type:Array,
        default:() => [18203, 23489, 29034, 104970, 131744]
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
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      drawBar() {
        this.charts = echarts.init(document.getElementById(this.id));
        let option = {
          title: {
            show:false,
            text: 'World Population'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show:false
          },
          grid: {
            left: '3%',
            right: '8%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            name:"(kw)",
            nameTextStyle: {
              color:'#fff',
              fontSize:fontChart(12),
              align:'left',
              // verticalAlign:'top'
            },
            boundaryGap: [0, 0.01],
            splitLine: {
              lineStyle: {
                color:'#0f5681',
                type:'dotted'
              }
            },
            axisLabel: {
              textStyle: {
                color:'#fff',
                fontSize:fontChart(12)
              }
            },
          },
          yAxis: {
            type: 'category',
            name:'(区域)',
            nameTextStyle: {
              color:'#fff',
              fontSize:fontChart(12),
              align:'right',
              // verticalAlign:'top'
            },
            data: this.xValue,
            axisLabel: {
              textStyle: {
                color:'#fff',
                align:'right', //默认
                fontSize:fontChart(12)
              }
            },
            axisLine: {
              lineStyle: {
                color: '#0092D5'
              }
            },
            axisTick: {
              show:false
            }
          },
          series: [
            {
              name: '2011',
              type: 'bar',
              data: this.yValue,
              itemStyle: {
                color:'#4992ff'
              }
            },
          ]
        };
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.drawBar()
      }
    },
  }
</script>