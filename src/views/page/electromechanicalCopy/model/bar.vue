<doc>
  折线图
</doc>
<template>
  <div id="line3" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    data() {
      return {
        charts: '',
        xValue:[],
        yValue:[]
      };
    },
    props: ['centerLeftResult'],
    watch: {
      centerLeftResult(newVal) {
        this.xValue = []
        this.yValue = []
        newVal.forEach(item => {
          this.xValue.push(item.name)
          this.yValue.push(item.value)
        })
        this.show('line3')
      }
    },
    mounted() {
      
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          title: {
            text: '月度关键设备维修次数',
            textAlign: 'left',
            x: 'center',
            y: 'top',
            top: 40,
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 13
            }
          },
          color: ['#1890FF', '#fac800'],
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
              color: 'rgba(255, 255, 255, 0.8)'
            },
            data: this.xValue
          },
          yAxis: {
            name: "(次)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
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
              color: 'rgba(255, 255, 255, 0.8)'
            },
          },
          grid: {
            top: '25%',
            bottom: '8%',
            left: '7%',
            right: '7%'
          },
          series: [{
            type: 'bar',
            data: this.yValue,
            barMaxWidth: 35,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: { //数值样式
                    color: "#FFFFFF",
                    fontWeight: 600
                  }
                },
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: "#0069F5" // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "#35C3FF" // 100% 处的颜色
                }], false)
              },
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