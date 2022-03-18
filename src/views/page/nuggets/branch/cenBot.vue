<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .182292rem;line-height: .182292rem;padding-left: .026042rem;position: relative;">
      <!-- <span style="color: #00c1fa;">主设备开机率 (周)</span> -->
      <p class="title">主设备开机率 (周)</p>
    </div>
    <div style="width: 100%;height: calc(100% - .182292rem);">
      <div id="charts6" style="width: 100%;height:100%;"></div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  // import { getweekly_operation_rate } from '@/api/productionDepartment'
  import { getweekly_operation_rate } from '@/api/productionDepartment2'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    data() {
      return {
        xValue:[],
        yValue1:[],//采煤机
        yValue2:[],//掘进机
        yValue3:[],//主运皮带
        yValue4:[],//水泵
        yValue5:[],//空压机
        yValue6:[],//主提升机
        charts:''
      }
    },
    mounted() {
      this.getweekly_operation_rate()
      this.drawLine()
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      // request1
      // getweekly_operation_rate() {
      //   getweekly_operation_rate().then(data => {
      //     if(data && data.success) {
      //       this.xValue = []
      //       this.yValue1 = []
      //       this.yValue2 = []
      //       this.yValue3 = []
      //       this.yValue4 = []
      //       this.yValue5 = []
      //       this.yValue6 = []
      //       if(data.data.length) {
      //         // 暂无数据
      //         data.data.forEach(item => {
      //           if(this.xValue.indexOf(item.stat_time.split(' ')[0].split('-').join('')) < 0) {
      //             this.xValue.push(item.stat_time.split(' ')[0].split('-').join(''))
      //           }
      //           if(item.indicator_name == '采煤机开机率') {
      //             this.yValue1.push(parseInt(item.value))
      //           }else if(item.indicator_name == '掘进机开机率') {
      //             this.yValue2.push(parseInt(item.value))
      //           }else if(item.indicator_name == '主运皮带开机率') {
      //             this.yValue3.push(parseInt(item.value))
      //           }else if(item.indicator_name == '水泵开机率') {
      //             this.yValue4.push(parseInt(item.value))
      //           }else if(item.indicator_name == '空压机开机率') {
      //             this.yValue5.push(parseInt(item.value))
      //           }else if(item.indicator_name == '主提升机开机率') {
      //             this.yValue6.push(parseInt(item.value))
      //           }
      //         })
      //         this.drawLine()
      //       }
      //     }
      //   })
      // },
      // request2
      getweekly_operation_rate() {
        getweekly_operation_rate().then(data => {
          if(data && data.success) {
            this.xValue = []
            this.yValue1 = []
            this.yValue2 = []
            this.yValue3 = []
            this.yValue4 = []
            this.yValue5 = []
            this.yValue6 = []
            if(data.data.length) {
              data.data.forEach(item => {
                if(this.xValue.indexOf(item.stat_time.split('-').join('')) < 0) {
                  this.xValue.push(item.stat_time.split('-').join(''))
                }
                if(item.indicator_name == '采煤机开机率') {
                  this.yValue1.push(parseInt(item['round(`value`)']))
                }else if(item.indicator_name == '掘进机开机率') {
                  this.yValue2.push(parseInt(item['round(`value`)']))
                }else if(item.indicator_name == '主运皮带开机率') {
                  this.yValue3.push(parseInt(item['round(`value`)']))
                }else if(item.indicator_name == '水泵开机率') {
                  this.yValue4.push(parseInt(item['round(`value`)']))
                }else if(item.indicator_name == '空压机开机率') {
                  this.yValue5.push(parseInt(item['round(`value`)']))
                }else if(item.indicator_name == '主提升机开机率') {
                  this.yValue6.push(parseInt(item['round(`value`)']))
                }
              })
              this.drawLine()
            }
          }
        })
      },
      drawLine() {
        this.charts = echarts.init(document.getElementById('charts6'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['采煤机', '掘进机','主运皮带','水泵','空压机','主提升机'],
            textStyle: {
              fontSize: fontChart(13),
              color: 'rgba(255, 255, 255, 0.8)'
            },
            itemStyle: {
              borderType:'dashed',
              borderColor:'#0182d6',
              borderWidth:1
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
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            type: 'value',
            name:'(单位)',
            nameTextStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(12),
              align:'right'
            },
            min:50,
            max:150,
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
              name: '采煤机',
              type: 'line',
              barWidth: '20%',
              lineStyle: {
                color:'#1882e6'
              },
              data: this.yValue1
            },
            {
              name: '掘进机',
              type: 'line',
              barWidth: '20%',
              lineStyle: {
                color:'#9ae309'
              },
              data: this.yValue2
            },
            {
              name: '主运皮带',
              type: 'line',
              barWidth: '20%',
              lineStyle: {
                color:'#deb307'
              },
              smooth:1,
              data: this.yValue3
            },
            {
              name: '水泵',
              type: 'line',
              barWidth: '20%',
              lineStyle: {
                color:'#e27207'
              },
              smooth:1,
              data: this.yValue4
            },
            {
              name: '空压机',
              type: 'line',
              lineStyle: {
                color:'#0e8a95'
              },
              smooth:1,
              data: this.yValue5
            },
            {
              name: '主提升机',
              type: 'line',
              barWidth: '20%',
              itemStyle: {
                color: '#0c9251',
              },
              lineStyle: {
                color:'#0c9251'
              },
              smooth:1,
              data: this.yValue6
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
        this.drawLine()
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