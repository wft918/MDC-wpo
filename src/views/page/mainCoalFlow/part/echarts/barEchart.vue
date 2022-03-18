<doc>
  柱形图
</doc>
<template>
  <div id="main" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    props: ['barData1'],
    data() {
      return {
        charts: '',
        yValue: [],
        xValue: [],
        label: [],
      };
    },
    watch: {
      barData1() {
        this.yValue = []
        this.xValue = []
        this.label = []
        this.barData1.forEach(element => {
          this.label.push(element.item)
          let yData = []
          element.allData.forEach(ele => {
            if (this.xValue.indexOf(ele.stat_time) < 0) {
              this.xValue.push(ele.stat_time)
              yData.push(ele.value)
            } else {
              yData[this.xValue.indexOf(ele.stat_time)] = ele.value
            }
          })
          this.yValue.push(yData)
        });
        this.show('main')
      }
    },
    computed: {
      state: {
        get() {
          return this.$store.state.startStopStatus.statu
        },
      },
      title() {
        let title = '启动'
        switch (this.state) {
          case 0:
            title = '启动'
            break;
          case 1:
            title = '启动'
            break;
          case 2:
            title = '停止'
            break;
          case 3:
            title = '停止'
            break;
        }
        return title
      },
    },
    mounted() {
      this.show("main")
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          animation: false,
          title: {
            // text: '本周主煤流系统' + this.title + '平均时长',
            text: `月度系统${this.title}时长对比`,
            textAlign: 'left',
            x: 'center',
            y: 'top',
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 14
            }
          },
          color: ['#0d81f7', '#0fb42c'],
          tooltip: {},
          legend: {
            show: true,
            top: 18,
            right: 0,
            data: this.label,
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 10
            },
            itemWidth: 10,
            itemHeight: 10
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
              color: 'rgba(255, 255, 255, 0.8)'
            },
            data: this.xValue,
          },
          yAxis: {
            name: "(分钟)",
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
            top: '35%',
            bottom: '20%',
            left: '7%',
            right: '2%'
          },
          series: [{
            name: this.label[0],
            barWidth: 15,
            type: 'bar',
            data: this.yValue[0],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'insideLeft', //在上方显示
                  offset: [-8, 0],
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: 10
                  }
                },
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: "#0069F5" // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "#35C3FF" // 100% 处的颜色
                }], false)
              }
            },
          }, {
            name: this.label[1],
            barWidth: 15,
            type: 'bar',
            data: this.yValue[1],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'insideRight', //在上方显示
                  offset: [8, 0],
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: 10
                  }
                },
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: "#03AC32" // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "#69EF00" // 100% 处的颜色
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
      },
    }
  }
</script>
<style scoped>

</style>