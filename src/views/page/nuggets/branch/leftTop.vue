<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .182292rem;line-height: .182292rem;padding-left: .026042rem;position: relative;">
      <!-- <span style="color: #00c1fa;">未闭合隐患及月度隐患统计</span> -->
      <p class="title">月度隐患统计</p>
    </div>
    <div style="width: 100%;height: calc(100% - .182292rem);">
      <div id="charts1" style="width: 100%;height:100%;"></div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  import { getsystem_trouble_on, getsystem_trouble } from '@/api/productionDepartment'
  import { gettrouble_still_on, gettrouble_count } from '@/api/productionDepartment2'
  import { fontChart } from '@/utils/echartPxToRem.js'
  export default {
    data() {
      return {
        xValue: [],
        yValue1: [],
        yValue2: [],
        charts: ''
      }
    },
    mounted() {
      this.getLefttopData_2() //request2
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      // request1
      getLefttopData() {
        let p1 = getsystem_trouble()  //月度隐患
        let p2 = getsystem_trouble_on()  //未闭合隐患
        Promise.all([p1, p2]).then(result => {
          if (result.length == 2) {
            this.xValue = result[0].data.map(item => item.stat_time.split('-').join(''))
            this.yValue1 = result[0].data.map(item => item.value) //月度隐患
            this.yValue2 = result[1].data.map(item => item.value) //未闭合隐患
            this.drawBar()
          }
        })
      },
      // request2
      getLefttopData_2() {
        this.xValue = []
        this.yValue1 = []
        this.yValue2 = []
        let p1 = gettrouble_count()  //月度隐患
        // let p2 = gettrouble_still_on()  //未闭合隐患
        Promise.all([p1]).then(result => {
          this.xValue = []
          this.yValue1 = []
          if (result.length) {
            if (result[0].data && result[0].data.length) {
              let l1 = []  //去年
              let l2 = []  //今年
              result[0].data.forEach(item => {
                if (parseInt(item.indicator_name) >= new Date().getMonth() + 1) {  //去年
                  l1.push({
                    indicator_name: item.indicator_name,
                    value: item.value,
                    num: parseInt(item.indicator_name)
                  })
                } else {
                  l2.push({
                    indicator_name: item.indicator_name,
                    value: item.value,
                    num: parseInt(item.indicator_name)
                  })
                }
              })
              let list = [...l1.sort((a, b) => a.num - b.num), ...l2.sort((a, b) => a.num - b.num)]
              list.forEach(item => {
                this.xValue.push(item.indicator_name)
                this.yValue1.push(parseFloat(item.value))
              })
              // if (new Date().getMonth() >= 6) {
              //   result[0].data.forEach(item => {
              //     this.xValue.push(item.indicator_name)
              //     this.yValue1.push(parseFloat(item.value))
              //   })
              // }else {
              //   let l1 = []  //上一年的
              //   let l2 = []  //当前年的
              //   result[0].data.forEach(item => {
              //     if(parseInt(item.indicator_name) > 6) {
              //       l1.push({
              //         indicator_name: item.indicator_name,
              //         value: item.value,
              //         num: parseInt(indicator_name)
              //       })
              //     }else {
              //       l2.push({
              //         indicator_name: item.indicator_name,
              //         value: item.value,
              //         num: parseInt(indicator_name)
              //       })
              //     }
              //   })
              //   let list = [...l1.sort((a, b) => a.num - b.num), ...l2.sort((a, b) => a.num - b.num)]
              //   list.forEach(item => {
              //     this.xValue.push(item.indicator_name)
              //     this.yValue1.push(parseFloat(item.value))
              //   })
              // }
            }
            // this.xValue = result[0].data.map(item => item.indicator_name)
            // this.yValue1 = result[0].data.map(item => item.value) //月度隐患
            // result[1].data.forEach(element => {
            //   if (this.xValue.indexOf(element.indicator_name) < 0) {
            //     this.xValue.push(element.indicator_name)
            //     this.yValue1[this.xValue.indexOf(element.indicator_name)] = element.value
            //   } else {
            //     this.yValue1[this.xValue.indexOf(element.indicator_name)] = element.value
            //   }
            // });
            this.drawBar()
          }
        })
      },
      drawBar() {
        this.charts = echarts.init(document.getElementById('charts1'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show: false,
            data: ['月度隐患', '未闭合隐患'],
            textStyle: {
              fontSize: fontChart(13),
              color: 'rgba(255, 255, 255, 0.8)'
            },
            itemStyle: {
              borderType: 'dashed',
              borderColor: '#0182d6',
              borderWidth: 1
            }
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '6%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            name: '(月份)',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(13),
              verticalAlign: 'top'
            },
            data: this.xValue,
            // offset: fontChart(10),
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
              interval: 0,
              align: 'center',
              // rotate: 12,
              align: 'center',
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(13),      //更改坐标轴文字大小
              },
            }
          },
          yAxis: {
            type: 'value',
            name: '(个)',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12),
              align: 'right',
              verticalAlign: 'middle'
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
                color: '#0f5681',
                type: 'dotted'
              }
            },
          },
          series: [
            {
              name: '月度隐患',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: '#0384d8'
              },
              label: {
                show: true,
                position: 'top',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: fontChart(13)
              },
              data: this.yValue1
            },
            // {
            //   name: '未闭合隐患',
            //   type: 'bar',
            //   barWidth: '20%',
            //   itemStyle: {
            //     color: 'transparent',
            //     borderType: 'dashed',
            //     borderColor: '#0182d6'
            //   },
            //   label: {
            //     show: true,
            //     position: 'top',
            //     color:'rgba(255, 255, 255, 0.8)',
            //     fontSize:fontChart(13)
            //   },
            //   data: this.yValue2
            // }
          ]
        }
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if (!this.charts) return
        this.charts.resize()
        this.drawBar()
      }
    },
  }
</script>
<style scoped>
  .title {
    color: #03b5eb;
    font-size: .078125rem
      /* 15/192 */
    ;
    font-weight: 600;
    position: absolute;
    top: 0rem
      /* 10/192 */
    ;
    left: .078125rem
      /* 15/192 */
    ;
  }
</style>