<doc>
  柱形图
</doc>
<template>
  <div id="barMore" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    props: ['data'],
    data() {
      return {
        charts: '',
        legend: [],
        xValue: [],
        yValue1: [],
        yValue2: [],
        yValue3: [],
        yValue4: [],
      };
    },
    watch: {
      data() {
        this.legend = []
        this.xValue = []
        this.yValue1 = []
        this.yValue2 = []
        this.yValue3 = []
        this.yValue4 = []
        this.data.forEach((element, index) => {
          this.legend.push(element.item)
          element.allData.forEach(item => {
            let i = this.xValue.indexOf(item.ext_1)
            if (i < 0) {
              this.xValue.push(item.ext_1)
            }
            switch (index) {
              case 0:
                if (i < 0) {
                  this.yValue1.push(item['sum(`value`)'])
                } else {
                  this.yValue1[i] = item['sum(`value`)']
                }
                break;
              case 1:
                if (i < 0) {
                  this.yValue2.push(item['sum(`value`)'])
                } else {
                  this.yValue2[i] = item['sum(`value`)']
                }
                break;
              case 2:
                if (i < 0) {
                  this.yValue3.push(item['sum(`value`)'])
                } else {
                  this.yValue3[i] = item['sum(`value`)']
                }
                break;
            }
          })
        });
        this.legend.push('总计')
        this.xValue.forEach((item, index) => {
          this.yValue4.push(this.yValue1[index] + this.yValue2[index] + this.yValue3[index])
        })
        this.show("barMore")
      }
    },
    mounted() {
      this.show("barMore")
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#acff02', '#fac800', '#ff7d00', '#0fb42c'],
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
            data: this.legend,
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
              color: 'rgba(255, 255, 255, 0.8)'
            },
            data: this.xValue
          },
          yAxis: {
            name: "(吨)",
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
            bottom: '13%',
            left: '10%',
            right: '2%'
          },
          series: [{
            name: this.legend[0],
            barWidth: 15,
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: this.yValue1,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'insideRight', //在上方显示
                  offset: [-8, 0],
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: 10
                  }
                },
              }
            },
          },
          {
            name: this.legend[1],
            barWidth: 15,
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: this.yValue2,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'insideRight', //在上方显示
                  offset: [-8, 0],
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: 10,
                  }
                },
              }
            },
          },
          {
            name: this.legend[3],
            barWidth: 15,
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: this.yValue3,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'insideRight', //在上方显示
                  offset: [-8, 0],
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: 10
                  }
                },
              }
            },
          }, {
            name: this.legend[3],
            barWidth: 15,
            type: 'bar',
            data: this.yValue4,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'insideLeft', //在上方显示
                  offset: [8, 0],
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