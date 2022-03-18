<doc>
  折线图
</doc>
<template>
  <div id="line3" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    props: ['lineData1', 'bzx'],
    data() {
      return {
        charts: '',
        label: [],
        yValue: [],
        xValue: []
      };
    },
    mounted() {
      this.show('line3')
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    watch: {
      lineData1() {
        this.label = []
        this.yValue = []
        this.xValue = []
        this.lineData1.forEach(element => {
          if (this.xValue.indexOf(element.stat_time) < 0) {
            this.xValue.push(element.stat_time)
            this.yValue.push(element.value)
          } else {
            this.yValue[this.xValue.indexOf(element.stat_time)] = element.value
          }
        });
        this.show('line3')
      },
      bzx() {
        this.show('line3')
      }
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          title: {
            text: '上仓皮带煤质检测',
            textAlign: 'left',
            x: 'center',
            y: 'top',
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(14)
            }
          },
          color: ['#1890FF', '#fac800'],
          tooltip: {},
          legend: {
            show: false,
            top: 5,
            right: 0,
            align: 'left',
            icon: 'rect',
            itemHeight: 11,
            itemWidth: 11,
            data: [],
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12)
            },
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
              fontSize: fontChart(12)
            },
            data: this.xValue
          },
          yAxis: {
            name: "(千卡)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12),
              align: 'right'
            },
            splitNumber:4,
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
            top: '29%',
            bottom: '17%',
            left: '7%',
            right: '2%'
          },
          series: [{
            name: '',
            type: 'line',
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
                    formatter: '最优配比煤质'+this.bzx+'千卡',
                    textStyle: {
                      color:'rgba(255, 255, 255, 0.8)',
                      fontSize: fontChart(12)
                    },
                    position: "insideEndTop", // 文字显示的位置
                  },
                },
              },
              data: [
                {
                  name: "最优煤质配比",
                  // type: "min",
                  // valueDim: "close",
                  yAxis: this.bzx, // 标记线x轴的值  警戒线
                  itemStyle: {
                    color: '#ff2b00'
                  }
                }
              ]
            }
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
        this.show("line3")
      }
    }
  }
</script>
<style scoped>

</style>