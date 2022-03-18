<doc>热力图</doc>
<template style="height: 100%;width: 100%;">
  <div id="headmap-d" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  let charts = ""
  export default {
    props: ["rawData"],
    data() {
      return {
        xValue: [],
        yValue: [],
        data: [],
        charts:''
      }
    },
    watch: {
      rawData() {
        this.$nextTick(()=> {
          this.xValue = []
          this.yValue = []
          this.data = []
          this.rawData.forEach(element => {
            if (this.xValue.indexOf(element.time) < 0) {
              this.xValue.push(element.time)
            }
            if (this.yValue.indexOf(element.sensorlocation) < 0) {
              this.yValue.push(element.sensorlocation)
            }
            this.data.push([this.xValue.indexOf(element.time), this.yValue.indexOf(element.sensorlocation), element.monitorvalue])
          });
          this.init()
        })
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.init()
      })
    },
    destroyed() {
      window.removeEventListener('resize',this.selfAdaption)
    },
    methods: {
      async init() {
        
        this.charts = echarts.init(document.getElementById('headmap-d'))
        let option = {
          tooltip: {
            position: 'top'
          },
          grid: {
            top: '5%',
            bottom: '13%',
            right: '5%',
            left: '14%'
          },
          xAxis: {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#0092D5'
              }
            },
            axisLabel: {
              show:true,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
              }
            },
            data: this.xValue,
          },
          yAxis: {
            type: 'category',
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
              show:true,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
              }
            },
            data: this.yValue,
          },
          visualMap: {
            min: 0,
            max: 60,
            calculable: true,
            orient: 'vertical',
            right: '0',
            bottom: '10%',
            inRange: {
              color: ["#003fb2", '#2bd304', "#f72e00"]
            },
            handleIcon: 'none'
          },
          series: [
            {
              name: '',
              type: 'heatmap',
              data: this.data,
              label: {
                show: false
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        this.charts.setOption(option, true);
        window.addEventListener('resize',this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.init()
      }
    },
  }
</script>
<style scoped>

</style>