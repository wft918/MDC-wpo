<template>
  <div style="width: 100%;height: 100%;">
    <div
      style="width: 100%;height: .182292rem;line-height: .182292rem;padding-left: .026042rem;padding-right: .052083rem;box-sizing: border-box;position: relative;">
      <!-- <span style="color: #00c1fa;">月计划产量、完成产量、完成率</span> -->
      <p class="title">月计划产量、完成产量、完成率</p>
      <span style="float: right;">
        <span style="color: rgba(255, 255, 255, 0.8);font-size: .072917rem;">日产量：</span>
        <span style="color: #1891ff;font-size: .083333rem;margin-right: .015625rem;">{{rcl}}</span>
        <span style="color: rgba(255, 255, 255, 0.8);font-size: .072917rem;">吨</span>
      </span>
    </div>
    <div style="width: 100%;height: calc(100% - .182292rem);">
      <div id="charts4" style="width: 100%;height:100%;"></div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  import { getmonthlyreport } from '@/api/productionDepartment'
  import { getproduction_report_month } from '@/api/productionDepartment2'
  import { getoutput_forward_day } from '@/api/bigView2'
  import { fontChart } from '@/utils/echartPxToRem.js'
  export default {
    data() {
      return {
        xValue: [],
        yValue1: [],//月计划产量
        yValue2: [],//月计划完成产量
        yValue3: [],//月计划完成率
        rcl:0,
        charts:''
      }
    },
    mounted() {
      // request1
      // this.getmonthlyreport()

      // request2
      // this.getproduction_report_month()
      this.getData()

      // this.drawBarline()
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      /*
        request1
      */
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
      /*
        request2
      */

      getData() {
        let p1 = getproduction_report_month()
        let p2 = getoutput_forward_day()
        Promise.all([p1,p2]).then(result => {
          if(result.length === 2) {
            let brotherData = []
            let brotherJc = 0
            this.xValue = []
            this.yValue1 = []
            this.yValue2 = []
            this.yValue3 = []
            if (result[0].data.length) {
              let currentYear = new Date().getFullYear()
              result[0].data.forEach(item => {
                this.xValue.push(currentYear + item.d_month)
                this.yValue1.push(item['计划产量'])
                this.yValue2.push(item['完成产量'])
                this.yValue3.push(parseFloat(item['完成产量'] / item['计划产量']).toFixed(2) * 100)
                brotherData.push({
                  'x轴':currentYear + item.d_month,
                  '计划进尺':item['计划进尺'],
                  '完成进尺':item['完成进尺'],
                  '完成率':parseFloat(item['完成进尺'] / item['计划进尺']).toFixed(2) * 100
                })
              })
              this.drawBarline()
            }
            if(result[1].data.length) {
              console.log(result[1].data)
              this.rcl = result[1].data[0]['日产量']
              brotherJc = result[1].data[0]['日掘进进尺']
            }
            let obj = {
              data:brotherData,
              jc:brotherJc
            }
            this.$events.$emit('tobrother',obj)
          }
        })
      },
      getproduction_report_month() {
        getproduction_report_month().then(data => {
          if (data && data.success) {
            console.log('success--->')
            this.xValue = []
            this.yValue1 = []
            this.yValue2 = []
            this.yValue3 = []
            if (data.data.length) {
              // console.log('data.data.length---->')
              let brotherData = []
              let currentYear = new Date().getFullYear()
              data.data.forEach(item => {
                this.xValue.push(currentYear + item.d_month)
                this.yValue1.push(item['计划产量'])
                this.yValue2.push(item['完成产量'])
                this.yValue3.push(parseFloat(item['完成产量'] / item['计划产量']).toFixed(2) * 100)
                brotherData.push({
                  'x轴':currentYear + item.d_month,
                  '计划进尺':item['计划进尺'],
                  '完成进尺':item['完成进尺'],
                  '完成率':parseFloat(item['完成进尺'] / item['计划进尺']).toFixed(2) * 100
                })
              })
              this.$events.$emit('tobrother',brotherData)
              this.drawBarline()
            }
          }
        })
      },
      drawBarline() {
        this.charts = echarts.init(document.getElementById('charts4'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['计划产量', '完成量', '完成率'],
            textStyle: {
              fontSize: fontChart(13),
              color: 'rgba(255, 255, 255, 0.8)'
            },
            itemStyle: {
              // borderType:'dashed',
              // borderColor:'#0182d6',
              // borderWidth:1
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
                fontSize: fontChart(13)      //更改坐标轴文字大小
              }
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '(万吨)',
              nameTextStyle: {
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(12),
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
                fontSize:fontChart(12),
                align:'left'
              },
              min: 0,
              max: 200,
              interval: 20,
              axisLabel: {
                formatter: '{value}',
                align:'center',
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                  fontSize: fontChart(13)      //更改坐标轴文字大小
                }
              },
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
            }
          ],
          series: [
            {
              name: '计划产量',
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
              name: '完成量',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#32befe' },
                      { offset: 1, color: '#016cf4' }
                    ]
                  )
                }
              },
              label: {
                show: false,
                position: 'top',
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13)
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#32befe' },
                    { offset: 1, color: '#016cf4' }
                  ]
                )
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