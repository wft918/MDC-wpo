<template>
  <div style="width: 100%;height: 100%;">
    <div id="rtbtstack" style="width: 100%;height: 100%;"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem.js'
  export default {
    data() {
      return {
        charts:''
      }
    },
    props: {
      colorList: {
        type:Array,
        default:() => ['#1760bc', '#029bff', '#fac800', '#a7f901', '#06c8cd', '#ee7604']
      },
      xValue: {
        type:Array,
        default:() => ['2021-09-15', '2021-09-16', '2021-09-17', '2021-09-18', '2021-09-19', '2021-09-20', '2021-09-21']
      },
      yValue1: {
        type:Array,
        default:() => [320, 332, 301, 334, 390, 330, 320]
      },
      yValue2: {
        type:Array,
        default:() => [120, 132, 101, 134, 90, 230, 210]
      },
      yValue3: {
        type:Array,
        default:() => [220, 182, 191, 234, 290, 330, 310]
      },
      yValue4: {
        type:Array,
        default:() => [150, 232, 201, 154, 190, 330, 410]
      },
      yValue5: {
        type:Array,
        default:() => [862, 1018, 964, 1026, 1679, 1600, 1570]
      },
      yValue6: {
        type:Array,
        default:() => [30, 50, 40, 60, 80, 70, 40]
      },
    },
    watch: {
      yValue4() {
        this.drawStack()
      }
    },
    mounted() {
      this.drawStack()
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      drawStack() {
        this.charts = echarts.init(document.getElementById('rtbtstack'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          color: this.colorList,
          legend: {
            textStyle: {
              color: '#fff',
              fontSize:fontChart(13)
            }
          },
          grid: {
            left: '5%',
            right: '4%',
            bottom: '5%',
            top:'22%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // name:'(日期)',
            // nameTextStyle: {
            //   color:'#fff',
            //   fontSize:fontChart(12)
            // },
            data: this.xValue,
            axisLabel: {
              textStyle: {
                color:'#fff',
                fontSize:fontChart(13)
              }
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '(m³/min)',
              nameTextStyle: {
                color:'#fff',
                fontSize:fontChart(13),
                align:'right'
              },
              axisLabel: {
                show: true,
                align:'center',
                textStyle: {
                  color: '#fff',  //更改坐标轴文字颜色
                  fontSize: fontChart(14)      //更改坐标轴文字大小
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#0f5681',
                  type: 'dotted'
                }
              },
            },
            {
              type: 'value',
              name: '(%)',
              nameTextStyle: {
                color:'#fff',
                fontSize:fontChart(13),
                align:"left",
              },
              min: 0,
              max: 100,
              axisLabel: {
                show: true,
                align:'center',
                textStyle: {
                  color: '#fff',  //更改坐标轴文字颜色
                  fontSize: fontChart(14)      //更改坐标轴文字大小
                }
              },
              splitLine: {
                show:false,
                lineStyle: {
                  color: '#0f5681',
                  type: 'dotted'
                }
              },
            }
          ],
          dataZoom: {
            show: true,
            realtime: true,
            // y: 'bottom',
            bottom:10,
            height: 5,
            start: 0,
            end: 80,
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
              name: '塔里风排瓦斯量',
              type: 'bar',
              stack: 'Ad',
              emphasis: {
                focus: 'series'
              },
              data: this.yValue1
            },
            {
              name: '上寺头风排瓦斯量',
              type: 'bar',
              stack: 'Ad',
              emphasis: {
                focus: 'series'
              },
              data: this.yValue2
            },
            {
              name: '塔里瓦斯抽放量',
              type: 'bar',
              stack: 'ws',
              emphasis: {
                focus: 'series'
              },
              data: this.yValue3
            },
            {
              name: '上寺头瓦斯抽放量',
              type: 'bar',
              stack: 'ws',
              emphasis: {
                focus: 'series'
              },
              data: this.yValue4
            },
            {
              name: '全矿绝对瓦斯涌出量',
              type: 'bar',
              data: this.yValue5,
              emphasis: {
                focus: 'series'
              },
              // markLine: {
              //   lineStyle: {
              //     type: 'dashed'
              //   },
              //   data: [[{ type: 'min' }, { type: 'max' }]]
              // }
            },
            {
              name: '抽采率',
              type: 'line',
              yAxisIndex:1,
              emphasis: {
                focus: 'series'
              },
              data: this.yValue6
            },
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.drawStack()
      }
    },
  }
</script>