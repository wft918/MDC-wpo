<template>
  <div style="width: 100%;height: 100%;">
    <div :id="id" style="width: 100%;height:100%;"></div>
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
    props:{
      id: {
        type:String,
        default:() => 'line'
      },
      title: {
        type:String
      },
      xValue: {
        type:Array,
        default:() => ['2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09']
      },
      yValue: {
        type:Array,
        default:() => [10, 52, 200, 334, 390, 330, 220]
      },
      average: {
        type:Number,
        default:250
      },
      tooltipName: {
        type:String,
        default:''
      }
    },
    watch: {
      yValue() {
        this.drawLine()
      }
    },
    mounted() {
      this.drawLine()
    },
    destroyed() {
      window.removeEventListener('resize',this.selfAdaption)
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        this.charts = echarts.init(document.getElementById(this.id));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: this.title,
            left: 'center',
            textStyle: {
              color:'#e2d8db',
              fontSize:fontChart(13)
            }
          },
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
              // fontSize: 12,
              color: '#e2d8db'
            },
            // itemStyle: {
            //   borderType: 'dashed',
            //   borderColor: '#0182d6',
            //   borderWidth: 1
            // }
          },
          grid: {
            left: '3%',
            right: '12%',
            bottom: '8%',
            width: 'auto',
            height: 'auto',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.xValue,
            name:'(日期)',
            nameTextStyle: {
              color:'#fff',
              fontSize:fontChart(12)
            },
            axisTick: {
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
                fontSize: fontChart(14)      //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            type: 'value',
            name: '(m)',
            nameTextStyle: {
              color:'#fff',
              fontSize:fontChart(12)
            },
            axisLabel: {
              show: true,
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
              name: this.tooltipName,
              type: 'line',
              itemStyle: {
                color: '#0783d7'
              },
              data: this.yValue,
              markLine: {
                symbol: ["none", "none"], //去掉箭头,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      type: "dashed", //线条样式
                    },
                    label: {
                      show: true,
                      position: "end", // 文字显示的位置
                      fontSize:fontChart(12)
                    },
                  },
                },
                data: [
                  {
                    name: "警戒值",
                    // type: "min",
                    // valueDim: "close",
                    yAxis: this.average, // 标记线x轴的值  警戒线
                    itemStyle: {
                      color:'#85b243'
                    }
                  }
                ]
              }
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