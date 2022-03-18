<doc>
  折线图
</doc>
<template>
  <div id="barLeftTop" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    data() {
      return {
        charts: '',
      };
    },
    mounted() {
      this.show('barLeftTop')
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#f70045', '#ff7d00', '#facc14', '#1890ff'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show: true,
            top: 15,
            right: 0,
            x: 'center',
            y: 'top',
            data: ['重大风险', '较大风险', '一般风险', '低风险'],
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 12
            },
            itemWidth: 12,
            itemHeight: 12
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
              // interval: 0,
              // rotate: 12,
              // align:'center'
            },
            // offset: 10,
            data: ['2021-10-19', '2021-10-20', '2021-10-21', '2021-10-22', '2021-10-23', '2021-10-24', '2021-10-25']
          },
          yAxis: {
            name: "(个)",
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
            name: '重大风险',
            type: 'bar',
            data: [0, 0, 1, 0, 0, 0, 0],
            barMaxWidth: 10,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: { //数值样式
                    color: "#FFFFFF",
                  }
                },
              },
            },
          }, {
            name: '较大风险',
            type: 'bar',
            data: [2, 4, 3, 1, 3, 1, 5],
            barMaxWidth: 10,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: { //数值样式
                    color: "#FFFFFF",
                  }
                },
              },
            },
          }, {
            name: '一般风险',
            type: 'bar',
            data: [4, 8, 3, 11, 5, 9, 6],
            barMaxWidth: 10,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: { //数值样式
                    color: "#FFFFFF",
                  }
                },
              },
            },
          }, {
            name: '低风险',
            type: 'bar',
            data: [14, 9, 16, 22, 4, 7, 5],
            barMaxWidth: 10,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: { //数值样式
                    color: "#FFFFFF",
                  }
                },
              },
            },
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
      }
    }
  }
</script>
<style scoped>

</style>