<doc>
  柱形图
</doc>
<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    props: ['id', 'startupDurationWeek'],
    data() {
      return {
        charts: '',
        yValue: [],
        xValue: [],
      };
    },
    mounted() {
      this.show(this.id)
    },
    watch: {
      startupDurationWeek() {
        this.yValue = []
        this.xValue = []
        this.startupDurationWeek.forEach(element => {
          this.xValue.push(element.stat_time)
          this.yValue.push(element.value)
        });
        this.show(this.id)
      }
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          title: {
            text: '近一周启动时长(分钟)',
            textAlign: 'left',
            x: 'center',
            y: 'top',
            top: '7%',
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 12
            }
          },
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
              show: false,
            },
            data: this.xValue,
          },
          yAxis: {
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#0092D5',
                opacity: 0.3
              }
            },
            axisLine: {
              show: true, 
              lineStyle: {
                color: '#0092D5'
              }
            },
            axisLabel: {
              show: true,
            },
          },
          grid: {
            top: '30%',
            bottom: '10%',
            left: '18%',
            right: '10%'
          },
          series: [{
            barWidth: 12,
            type: 'bar',
            data: this.yValue,
            itemStyle: {
              normal: {
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
        window.addEventListener('resize', () => {
          this.charts.resize()
        })
      }
    }
  }
</script>
<style scoped>

</style>