<doc>
  柱形线型图
</doc>
<template>
  <div id='barMoreEchart' style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '../../../../utils/echartPxToRem.js'
  export default {
    data() {
      return {
        charts: '',
        xValue:[],
        yValue1:[],
        yValue2:[],
        yValue3:[]
      };
    },
    props: ['data'],
    watch: {
      data(newVal) {
        this.xValue = []
        this.yValue1 = []
        this.yValue2 = []
        this.yValue3 = []
        newVal.forEach(item => {
          this.xValue.push(item.d_month)
          this.yValue1.push(item['月销售量'])
          this.yValue2.push(item['铁路运量'])
          this.yValue3.push(item['公路运量'])
        })
        this.show('barMoreEchart')
      }
    },
    mounted() {
      this.show('barMoreEchart')
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#fac800', '#1890ff', '#03ac32'],
          tooltip: {},
          legend: {
            show: true,
            top: fontChart(40),
            right: 'center',
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
              textStyle: {
                fontSize:fontChart(12)
              }
            },
            data: this.xValue
          },
          yAxis: {
            name: "(万吨)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(13),
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
              textStyle: {
                fontSize:fontChart(12)
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
            end: 50,
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
          grid: {
            top: '28%',
            bottom: '12%',
            left: '10%',
            right: '2%'
          },
          series: [{
            name: '销售量',
            barWidth: fontChart(15),
            type: 'bar',
            data: this.yValue1,
            itemStyle: {
              normal: {
                label: {
                  show: false, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: fontChart(10)
                  }
                },
              }
            },
          }, {
            name: '铁路运量',
            barWidth: fontChart(15),
            type: 'bar',
            data: this.yValue2,
            itemStyle: {
              normal: {
                label: {
                  show: false, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: fontChart(10)
                  }
                },
              }
            },
          }, {
            name: '公路运量',
            barWidth: fontChart(15),
            type: 'bar',
            data: this.yValue3,
            itemStyle: {
              normal: {
                label: {
                  show: false, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: fontChart(10)
                  }
                },
              }
            },
          },]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.show('barMoreEchart')
      }
    }
  }
</script>
<style scoped>

</style>