<doc>
  柱形图
</doc>
<template>
  <div id="barAndLine" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    props: ['outputByDayData'],
    data() {
      return {
        charts: '',
        label: ['3煤', '4煤', '混合后总计'],
        xValue: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        yValue: [
          [5, 20, 36, 10, 10, 20, 16],
          [15, 24, 43, 21, 14, 17, 34],
          [45, 34, 54, 47, 36, 44, 50]
        ]
      };
    },
    watch: {
      outputByDayData() {
        this.label = []
        this.yValue = []
        this.xValue = []
        this.outputByDayData.forEach(element => {
          this.label.push(element.item)
          let yDatas = []
          element.allData.forEach(ele => {
            if (this.xValue.indexOf(ele.stat_time) < 0) {
              this.xValue.push(ele.stat_time)
            }
            yDatas.push(ele.value)
          })
          this.yValue.push(yDatas)
        });
        this.yValue[2] === undefined ? this.yValue[2] = [] : this.yValue[2] = this.yValue[2]
        this.label[2] = ''
        this.yValue[0].forEach((item, index) => {
          if (this.yValue[1][index]) {
            this.yValue[2].push(item + this.yValue[1][index])
          } else {
            this.yValue[2].push(item)
          }
        })
        this.show("barAndLine")
      }
    },
    mounted() {
      this.show("barAndLine")
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          title: {
            text: '近一周全矿井产量',
            textAlign: 'left',
            x: 'center',
            y: 'top',
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(14)
            }
          },
          color: ['#0d81f7', '#0fb42c', '#e97507'],
          tooltip: {},
          legend: {
            show: true,
            top: 3,
            right: 0,
            data: this.label,
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12)
            },
            itemWidth: fontChart(12),
            itemHeight: fontChart(12)
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
              fontSize:fontChart(12)
            },
            data: this.xValue
          },
          yAxis: {
            name: "(吨)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(12),
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
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(12)
            },
          },
          grid: {
            top: '20%',
            bottom: '10%',
            left: '10%',
            right: '2%'
          },
          series: [{
            name: this.label[0],
            barWidth: fontChart(15),
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
                    fontSize: fontChart(10)
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
            barWidth: fontChart(15),
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
                    fontSize: fontChart(10)
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
          }, {
            name: this.label[2],
            barWidth: 15,
            type: 'line',
            color: '#f67a03',
            data: this.yValue[2],
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
        this.show("barAndLine")
      }
    }
  }
</script>
<style scoped>

</style>