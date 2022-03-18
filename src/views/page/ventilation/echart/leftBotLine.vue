<template>
  <div style="width: 100%;height: 100%;">
    <div :id="id" style="width: 100%;height:100%;"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
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
        default: () => ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30']
      },
      yValue1: {
        type:Array,
        default:() => [2, 5, 4, 5, 7, 3, 4]
      },
      yValue2: {
        type:Array,
        default:() => [3, 7, 5, 7, 8, 4, 4]
      }
    },
    watch: {
      yValue2(newValue) {
        this.drawLine()
      }
    },
    mounted() {
      this.drawLine()
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        this.charts = echarts.init(document.getElementById(this.id));

        // 指定图表的配置项和数据
        var option = {
          title: {
            show: false,
            text: 'Stacked Area Chart'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize:fontChart(13)
            }
            // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
          },
          grid: {
            left: '3%',
            right: '8%',
            bottom: '6%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name:'(时间)',
              nameTextStyle: {
                color:'#fff',
                fontSize:fontChart(12),
                verticalAlign:'top'
              },
              boundaryGap: false,
              data: this.xValue,
              axisTick: {
                show:false,
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#0f5681'
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff',  //更改坐标轴文字颜色
                  fontSize: fontChart(12)     //更改坐标轴文字大小
                }
              }
            },
          ],
          yAxis: {
            type: 'value',
            name: '(Pa)',
            nameTextStyle: {
              color:'#fff',
              fontSize:fontChart(12),
              align:'right'
            },
            splitLine: {
              lineStyle: {
                color: '#0f5681',
                type: 'dotted'
              },
            },
            axisLabel: {
              show: true,
              align:'center',
              textStyle: {
                color: '#fff',  //更改坐标轴文字颜色
                fontSize: fontChart(12)      //更改坐标轴文字大小
              }
            },
          },
          dataZoom: {
            show: true,
            realtime: true,
            // y: 'bottom',
            bottom:10,
            height: 5,
            start: 0,
            end: 60,
            backgroundColor:'#383f52',
            // handleSize:0,
            handleStyle: {
                borderColor: "#cacaca",
                borderWidth: "1",
                shadowBlur: 2,
                background: "#7f8390",
                shadowColor: "#7f8390",
            },
          },
          series: [
            {
              name: '塔里通风阻力',
              type: 'line',
              stack: 'Total',
              areaStyle: {
                color:'rgba(0, 208, 104, .5)'
              },
              lineStyle: {
                color:'#00D068'
              },
              emphasis: {
                focus: 'series'
              },
              data: this.yValue1
            },
            {
              name: '上寺头通风阻力',
              type: 'line',
              stack: 'Total',
              areaStyle: {
                color:'rgba(48, 131, 255, .5)'
              },
              lineStyle: {
                color:'#3083FF'
              },
              emphasis: {
                focus: 'series'
              },
              data: this.yValue2
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.drawLine()
      }
    },
  }
</script>