<template>
  <div style="width: 100%;height: 100%;">
    <div id="cenbotbar" style="width: 100%;height:100%;"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.drawLine()
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let charts = echarts.init(document.getElementById('cenbotbar'));

        // 指定图表的配置项和数据
        var option = {
          title: {
            show: false,
            text: '',
            left: 'center',
            textStyle: {
              color: '#868a96',
              fontSize: 13
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show: false,
            data: ['锚杆受力'],
            textStyle: {
              // fontSize: 12,
              color: '#7e8390'
            },
            // itemStyle: {
            //   borderType: 'dashed',
            //   borderColor: '#0182d6',
            //   borderWidth: 1
            // }
          },
          grid: {
            left: '3%',
            right: '5%',
            bottom: '3%',
            width: 'auto',
            height: 'auto',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['202103', '202104', '202104', '202104', '202104', '202104', '202104'],
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
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: 14      //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            type: 'value',
            name: '吨',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: 14      //更改坐标轴文字大小
              }
            },
            splitLine: {
              lineStyle: {
                color: '#0f5681',
                type: 'dotted'
              }
            },
          },
          series: [
            {
              name: '抽放量',
              type: 'bar',
              itemStyle: {
                color: '#0783d7'
              },
              barWidth: '30%',
              data: [10, 52, 200, 334, 390, 330, 220],
              markLine: {// 平均值水平线或垂直线
                symbol: "arrow",
                data: [
                  {
                    type: 'average',
                    name: '平均值',
                    lineStyle: { color: '#72a718' },
                  }
                ]
              },
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
                    },
                  },
                },
                data: [
                  {
                    name: "警戒值",
                    // type: "min",
                    // valueDim: "close",
                    yAxis: 250, // 标记线x轴的值  警戒线
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
        charts.setOption(option);
        window.addEventListener('resize', () => {
          charts.resize()
        })
      }
    },
  }
</script>