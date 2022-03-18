<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .182292rem;line-height: .182292rem;padding-left: .026042rem;position: relative;">
      <!-- <span style="color: #00c1fa;">井下人员区域分布</span> -->
      <p class="title">井下人员区域分布</p>
    </div>
    <div style="width: 100%;height: calc(100% - .182292rem);">
      <div id="charts3" style="width: 100%;height:100%;"></div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  // import { getareaperson } from '@/api/productionDepartment'
  import { getarea_person } from '@/api/productionDepartment2'
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
      // request1
      // this.getareaperson()
      // request2
      this.getarea_person()
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      // 井下人员区域分布
      getareaperson() {
        getareaperson().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.xValue = []
              this.yValue = []
              data.data.forEach(item => {
                this.xValue.push(item.updatetime)
                this.yValue.push(item.curinregionnum)
              })
              this.drawBar()
            }
          }
        })
      },
      // 井下人员区域分布
      getarea_person() {
        getarea_person().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.xValue = []
              this.yValue = []
              data.data.forEach(item => {
                this.xValue.push(item['区域'])
                this.yValue.push(parseFloat(item['人数']))
              })
              this.drawBar()
            }
          }
        })
      },
      drawBar() {
        this.charts = echarts.init(document.getElementById('charts3'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show:false,
            data: ['违章指挥'],
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
            left: '5%',
            right: '10%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            name: '(区域)',
            nameTextStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(13),
              verticalAlign:'top'
            },
            offset: fontChart(10),
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
                fontSize: fontChart(12),      //更改坐标轴文字大小
                align:'center'
              },
              interval:0,  
              rotate:10
            }
          },
          yAxis: {
            type: 'value',
            name: '(人)',
            nameTextStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(12),
              align:'right', //水平对齐方式
              verticalAlign:'bottom'  //垂直对齐方式
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
                show:true,
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