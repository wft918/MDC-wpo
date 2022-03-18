<template>
  <div style="width: 100%;height: 100%;">
    <div style="position: relative; width: 100%;height: .182292rem /* 35/192 */;line-height: .182292rem /* 35/192 */;padding-left: .026042rem /* 5/192 */;box-sizing: border-box;">
      <!-- <span style="color: #00c1fa;">井下实时总人数</span> -->
      <p class="title">井下实时总人数</p>
    </div>
    <div style="width: 100%;height: calc(100% - .182292rem);padding: .130208rem;box-sizing: border-box;">
      <!-- title -->
      <div
        style="width: 40%;height: 12%;margin: 0 auto;background: linear-gradient(to bottom, #313d56, #3d4c69);text-align: center;display: flex;justify-content: center;align-items: center;">

        <div style="color: #f8f8f9;font-size: .067708rem /* 13/192 */;">井下实时总人数</div>
        <div style="color: #0297f8;font-size: .130208rem /* 25/192 */;font-weight: 600;margin-left: .052083rem;font-family: ysbth;">{{totalPerson}}</div>
        <div style="color: #f8f8f9;font-size: .067708rem /* 13/192 */;margin-left: .026042rem /* 5/192 */;">人</div>
      </div>
      <!-- charts -->
      <div style="width: 100%;height: 55%;">
        <div id="charts3" style="width: 100%;height:100%;"></div>
      </div>
      <!-- 下井情况  -->
      <p style="color:#dfe1e4;font-size: .067708rem /* 13/192 */;text-align: center;margin-top: .052083rem /* 10/192 */;">昨日下井总情况</p>
      <div
        style="width: 80%;height: 12%;margin: 0 auto;background: linear-gradient(to bottom, #313d56, #3d4c69);margin-top: .052083rem /* 10/192 */;text-align: center;display: flex;justify-content: center;align-items: center;">
        <div style="color: #f8f8f9;font-size: .067708rem /* 13/192 */;">昨日下井总人数</div>
        <div style="color: #0297f8;font-size: .114583rem /* 22/192 */;font-weight: 600;margin-left: .052083rem /* 10/192 */;font-family: ysbth;">{{totaldown}}</div>
        <div style="color: #f8f8f9;font-size: .067708rem /* 13/192 */;margin-left: .026042rem /* 5/192 */;">人</div>
      </div>
      <div
        style="width: 80%;height: 12%;margin: 0 auto;margin-top: .052083rem /* 10/192 */;display: flex;justify-content: space-between;text-align: center;">
        <div
          style="width: 32%;height: 100%;background: linear-gradient(to bottom, #313d56, #3d4c69);line-height: .21875rem /* 42/192 */;display: flex;justify-content: space-around;">
          <div style="color: #f8f8f9;font-size: .067708rem /* 13/192 */;">零点班</div>
          <div style="color: #0297f8;font-size: .114583rem /* 22/192 */;font-weight: 600;font-family: ysbth;">&nbsp;&nbsp;{{leaderObj.name_0}}</div>
          <div style="color: #f8f8f9;font-size: .067708rem /* 13/192 */;">人</div>
        </div>
        <div
          style="width: 32%;height: 100%;background: linear-gradient(to bottom, #313d56, #3d4c69);line-height: .21875rem /* 42/192 */;display: flex;justify-content: space-around;">
          <div style="color: #f8f8f9;font-size: .067708rem /* 13/192 */;">八点班</div>
          <div style="color: #0297f8;font-size: .114583rem /* 22/192 */;font-weight: 600;font-family: ysbth;">&nbsp;&nbsp;{{leaderObj.name_8}}</div>
          <div style="color: #f8f8f9;font-size: .067708rem /* 13/192 */;">人</div>
        </div>
        <div
          style="width: 32%;height: 100%;background: linear-gradient(to bottom, #313d56, #3d4c69);line-height: .21875rem /* 42/192 */;display: flex;justify-content: space-around;">
          <div style="color: #f8f8f9;font-size: .067708rem /* 13/192 */;">四点班</div>
          <div style="color: #0297f8;font-size: .114583rem /* 22/192 */;font-weight: 600;font-family: ysbth;">&nbsp;&nbsp;{{leaderObj.name_4}}</div>
          <div style="color: #f8f8f9;font-size: .067708rem /* 13/192 */;">人</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import * as echarts from 'echarts'
  // import { gettotalperson, getdownpershift, gettotaldown, getareaperson } from '@/api/safetySupervision'
  import { gettotal_person, getlast_day_down_per_shift, getlast_day_total_down, getarea_person } from '@/api/safetySupervision2'
  export default {
    data() {
      return {
        totalPerson:0,//井下实时总人数
        xValue:[],
        yValue:[],
        totaldown:0, //每日下井总人数
        leaderObj: {
          name_0:'--',
          name_4:'--',
          name_8:'--'
        }
      }
    },
    mounted() {
      // request1
      // this.gettotalperson()//井下总人数
      // this.getdownpershift() // 人员下井情况  每日早、中、晚班下井人数
      // this.gettotaldown() // 人员下井情况  每日下井总人数
      // this.getareaperson() //井下人员区域分布
      // request2
      this.gettotal_person()
      this.getlast_day_down_per_shift() // 人员下井情况  昨日各班下井人数
      this.getlast_day_total_down() // 人员下井情况  昨日下井总人数
      this.getarea_person() //井下人员区域分布
    },
    methods: {
      // request1
      // 井下总人数
      gettotalperson() {
        gettotalperson().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              // 无数据
              // this.totalPerson = 
            }
          }
        })
      },
      // 人员下井情况  每日早、中、晚班下井人数
      getdownpershift() {
        getdownpershift().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              // 无数据
            }
          }
        })
      },
      // 人员下井情况  每日下井总人数
      gettotaldown() {
        gettotaldown().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.totaldown = data.data[0]['count(distinct senderid)']
            }
          }
        })
      },
      // 井下人员区域分布
      getareaperson() {
        getareaperson().then(data => {
          if(data && data.success) {
            this.xValue = []
            this.yValue = []
            if(data.data.length) {
              // data.data.forEach(item => {
              //   this.xValue.push(item.)
              //   this.xValue.push(parseFloat(item.curinregionnum))
              // })
              // this.drawBar()
            }
          }
        })
      },
      // request2
      // 井下总人数
      gettotal_person() {
        gettotal_person().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.totalPerson = data.data[0].curinnum
            }
          }
        })
      },
      // 人员下井情况  每日早、中、晚班下井人数
      getlast_day_down_per_shift() {
        getlast_day_down_per_shift().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              data.data.forEach(item => {
                if(item.ext_1 == '0点班') {
                  this.leaderObj.name_0 = item.value
                }else if(item.ext_1 == '8点班') {
                  this.leaderObj.name_8 = item.value
                }else if(item.ext_1 == '4点班') {
                  this.leaderObj.name_4 = item.value
                }
              })
            }
          }
        })
      },
      // 人员下井情况  每日下井总人数
      getlast_day_total_down() {
        getlast_day_total_down().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.totaldown = data.data[0]['sum(`value`)']
            }
          }
        })
      },
      // 井下人员区域分布
      getarea_person() {
        getarea_person().then(data => {
          if(data && data.success) {
            this.xValue = []
            this.yValue = []
            if(data.data.length) {
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
        let charts = echarts.init(document.getElementById('charts3'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show: false,
            data: ['违章指挥'],
            textStyle: {
              // fontSize: 12,
              color: '#7e8390'
            },
            // itemStyle: {
            //   borderType: 'dashed',
            //   borderColor: '#0182d6',
            //   borderWidth: 1
            // }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'10%',
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
                color: '#0f5681'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: 14      //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            type: 'value',
            name: '人',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: 14      //更改坐标轴文字大小
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
              // name: '违章指挥',
              type: 'bar',
              barWidth: '30%',
              label: {
                show:true,
                position: 'top'
              },
              itemStyle: {
                normal: {
                  label: {
                    show: true,//是否显示 
                    position: 'top',//显示位置 
                    formatter: (params) => {//核心部分 formatter 可以为字符串也可以是回调 
                      if (params.value) {//如果当前值存在则拼接
                        // console.log(params,'echarts---->')
                        // return params.value + '/' //拼接上限
                        return params.value //拼接上限
                      } else {//否则返回个空
                        return '';
                      }
                    }
                  },
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#32befe' },
                      { offset: 1, color: '#016cf4' }
                    ]
                  )
                },
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
        charts.setOption(option);
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