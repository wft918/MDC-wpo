<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .182292rem;line-height: .182292rem;padding-left: .026042rem;position: relative;">
      <p class="title">月度三违统计</p>
      <!-- <span style="color: #00c1fa;">月度三违统计</span> -->
    </div>
    <div style="width: 100%;height: calc(100% - .182292rem);">
      <div id="charts2" style="width: 100%;height:100%;"></div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  import { getsystem_violation } from '@/api/productionDepartment'
  import { gettrouble_all } from '@/api/productionDepartment2'
  import { fontChart } from '@/utils/echartPxToRem.js'
  export default {
    data() {
      return {
        xValue:[],
        yValue:[],
        charts:''
      }
    },
    mounted() {
      // this.getsystem_violation()//月度三围统计  request1

      this.gettrouble_all() //月度三围统计  request2
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      // 月度三围统计
      getsystem_violation() {
        getsystem_violation().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.xValue = []
              this.yValue = []
              data.data.forEach(item => {
                this.xValue.push(item.indicator_name)
                this.yValue.push(item.value)
              })
              this.drawBar()
            }
          }
        })
      },
      // 月度三围统计
      gettrouble_all() {
        gettrouble_all().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.xValue = []
              this.yValue = []
              data.data.forEach(item => {
                this.xValue.push(item.indicator_name)
                this.yValue.push(parseInt(item.value))
              })
              this.drawBar()
            }
          }
        })
      },
      drawBar() {
        this.charts = echarts.init(document.getElementById('charts2'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show:false,
            // data: ['违章指挥'],
            textStyle: {
              fontSize: fontChart(13),
              color: 'rgba(255, 255, 255, 0.8)'
            },
            // itemStyle: {
            //   borderType: 'dashed',
            //   borderColor: '#0182d6',
            //   borderWidth: 1
            // }
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            name:'(类型)',
            nameTextStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(13),
              verticalAlign:'top'
            },
            data: this.xValue,
            axisTick: {
              show:false,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color:'#0f5681'
              }
            },
            axisLabel: {
              show: true,
              align:'center',
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            type: 'value',
            name: '(个)',
            nameTextStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(12),
              align:'right',
              verticalAlign:'bottom'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
              }
            },
            splitLine: {
              lineStyle: {
                color:'#0f5681',
                type:'dotted'
              }
            },
          },
          series: [
            {
              // name: '违章指挥',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: '#0384d8'
              },
              label: {
                show:true,
                position: 'top',
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13)
              },
              data: this.yValue
            },
          ]
        }
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.drawBar()
      }
    },
  }
</script>
<style scoped>
  .title {
    color: #03b5eb;
    font-size: .078125rem /* 15/192 */;
    font-weight: 600;
    position: absolute;
    top: 0rem /* 10/192 */;
    left: .078125rem /* 15/192 */;
  }
</style>