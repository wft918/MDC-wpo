<doc>
  进度条组件
</doc>
<template>
  <div id="bar" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    props: ['barData'],
    data() {
      return {
        charts: '',
        xValue: [],
        yValue: [],
      }
    },
    mounted() {
      this.show('bar')
    },
    watch: {
      barData() {
        this.show('bar')
      }
    },
    methods: {
      show(id) {
        this.yValue = []
        this.xValue = []
        this.barData.forEach(element => {
          this.xValue.push(`本月${element.indicator_name}`)
          this.yValue.push(element.value)
        });
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          animation: false,
          xAxis: {
            type: 'value',
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
            }
          },
          grid: {
            top: '10%',
            bottom: '10%',
            left: '30%',
            right: '0%'
          },
          yAxis: {
            type: 'category',
            data: this.xValue,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: { //  改变y轴颜色
              show: false,
            },
            axisLabel: { //  改变y轴字体颜色和大小
              textStyle: {
                color: "#fff",
              }
            }
          },
          series: [{
            type: 'bar',
            name: "产出",
            barMaxWidth: 15,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "insideRight", //在上方显示
                  textStyle: { //数值样式
                    color: "#FFFFFF",
                    fontWeight: 600
                  }
                },
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                  offset: 0,
                  color: 'rgba(24,144,255,1)'
                }, {
                  offset: 1,
                  color: 'rgba(24,144,255,0)'
                }]),
                barBorderRadius: 15
              }
            },
            data: this.yValue
          }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', () => {
          this.charts.resize()
        })
      }
    },
  }
</script>
<style scoped>

</style>