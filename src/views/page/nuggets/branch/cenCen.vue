<template>
  <div style="width: 100%;height: 100%;">
    <div
      style="width: 100%;height: .182292rem;line-height: .182292rem;padding-left: .026042rem;padding-right: .052083rem;box-sizing: border-box;position: relative;">
      <!-- <span style="color: #00c1fa;">月计划进尺、完成产量、完成率</span> -->
      <p class="title">月计划进尺、完成产量、完成率</p>
      <span style="float: right;">
        <span style="color: rgba(255, 255, 255, 0.8);font-size: .072917rem;">日掘进进尺：</span>
        <span style="color: #1891ff;font-size: .083333rem;margin-right: .015625rem;">{{jc}}</span>
        <span style="color: rgba(255, 255, 255, 0.8);font-size: .072917rem;">吨</span>
      </span>
    </div>
    <div style="width: 100%;height: calc(100% - .182292rem);">
      <div id="charts5" style="width: 100%;height:100%;"></div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  import { getmonthlyreport } from '@/api/productionDepartment'
  import { fontChart } from '@/utils/echartPxToRem.js'
  export default {
    data() {
      return {
        xValue: [],
        yValue1: [],//月计划进尺
        yValue2: [],//月计划完成进尺
        yValue3: [],//月计划完成率
        jc:0,
        charts:''
      }
    },
    mounted() {
      // request1
      // this.getmonthlyreport()
      // this.drawBarline()

      // request2
      this.$events.$on('tobrother',obj => {
        this.xValue = []
        this.yValue1 = []
        this.yValue2 = []
        this.yValue3 = []
        obj.data.forEach(item => {
          this.xValue.push(item['x轴'])
          this.yValue1.push(item['计划进尺'])
          this.yValue2.push(item['完成进尺'])
          this.yValue3.push(item['完成率'])
        })
        this.drawBarline()
        this.jc = obj.jc
      })
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      getmonthlyreport() {
        getmonthlyreport().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.xValue = []
              this.yValue1 = []
              this.yValue2 = []
              this.yValue3 = []
              data.data.forEach(item => {
                this.xValue.push(item.d_month.split('-').join(''))
                this.yValue1.push()
                this.yValue2.push()
                this.yValue3.push()
              })
            }
          }
        })
      },
      drawBarline() {
        this.charts = echarts.init(document.getElementById('charts5'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show: true,
            data: ['计划进尺', '完成进尺', '完成率'],
            textStyle: {
              fontSize: fontChart(13),
              color: 'rgba(255, 255, 255, 0.8)'
            },
            itemStyle: {
              // borderType:'dashed',
              // borderColor:'#0182d6',
              borderWidth: 1
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.xValue,
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#0f5681'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(13),      //更改坐标轴文字大小
              }
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '(万吨)',
              nameTextStyle: {
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13),
                align:'right'
              },
              axisLabel: {
                show: true,
                align:'right',
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                  fontSize: fontChart(13)      //更改坐标轴文字大小
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#0f5681',
                  type: 'dotted'
                }
              },
            },
            {
              type: 'value',
              name: '(%)',
              nameTextStyle: {
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13),
                align:'left'
              },
              min: 0,
              max: 200,
              interval: 20,
              // axisLabel: {
              //   formatter: '{value}'
              // },
              splitLine: {
                show:false,
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
                align:'center',
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                  fontSize: fontChart(13)      //更改坐标轴文字大小
                }
              },
            }
          ],
          series: [
            {
              name: '计划进尺',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: '#acff02'
              },
              label: {
                show: false,
                position: 'top',
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13)
              },
              data: this.yValue1
            },
            {
              name: '完成进尺',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: '#0384d8'
              },
              label: {
                show: false,
                position: 'top',
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13)
              },
              data: this.yValue2
            },
            {
              name: '完成率',
              type: 'line',
              yAxisIndex: 1,
              barWidth: '20%',
              itemStyle: {
                color: '#a35917',
              },
              smooth: 1,
              data: this.yValue3
            }
          ]
        }
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.drawBarline()
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