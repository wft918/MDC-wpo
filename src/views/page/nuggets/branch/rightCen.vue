<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .182292rem;line-height: .182292rem;padding-left: .026042rem;position: relative;">
      <!-- <span style="color: #00c1fa;">锚杆锚索受力实时监测</span> -->
      <p class="title">锚杆锚索受力实时监测</p>
      <el-radio-group style="position: absolute;top: .026042rem;right: .078125rem;" @change="radioChange" v-model="radio" size="mini">
        <el-radio-button label="回顺">回顺</el-radio-button>
        <el-radio-button label="运顺">运顺</el-radio-button>
      </el-radio-group>
    </div>
    <div style="width: 100%;height: calc(100% - .182292rem);position: relative;">
      <div style="width: 100%;height: .130208rem;">
        <div style="height: 100%;float: right;color: #aaacb5;font-size: .072917rem;display: flex;line-height: .130208rem;">
          <div @click="mClick(0)" :class="{'currentClass':currentIndex == 0}" style="height: 100%;margin-right: .026042rem;cursor: pointer;">锚杆受力</div>
          <div @click="mClick(1)" :class="{'currentClass':currentIndex == 1}" style="height: 100%;margin-right: .026042rem;cursor: pointer;">锚索受力</div>
        </div>
      </div>
      <div style="position: absolute;top: .208333rem;right: .677083rem;cursor: pointer;z-index: 99;">
        <span style="color: #8d1120;font-size: .0625rem;">--- </span>
        <span style="color: rgba(255, 255, 255, 0.8);font-size: .0625rem;font-weight: 600;">{{currentIndex == 0?'锚杆高报':'锚索高报'}}</span>
      </div>
      <div style="position: absolute;top: .208333rem;right: .260417rem;cursor: pointer;z-index: 99;">
        <span style="color: #8e5773;font-size: .0625rem;">--- </span>
        <span style="color: rgba(255, 255, 255, 0.8);font-size: .0625rem;font-weight: 600;">{{currentIndex == 0?'锚杆低报':'锚索低报'}}</span>
      </div>
      <div style="width: 100%;height: calc(100% - .130208rem);">
        <div id="charts8" style="width: 100%;height:100%;"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  import { getalarmrange, getforce } from '@/api/productionDepartment'
  import { getmg_alarm, getmonitordata_mgyl, getms } from '@/api/productionDepartment2'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    data() {
      return {
        radio:'回顺',
        mggb:0,//锚杆高报
        mgdb:0,//锚杆低报
        // msgb:0,//锚索高报
        // msdb:0,//锚索低报
        xValue:[],
        yValue:[],//锚杆受力  锚索受力
        chartisLoad1:false,
        chartisLoad2:false,
        currentIndex:0,
        name:'',
        charts:''
      }
    },
    props:['parentTochild'],
    watch: {
      parentTochild(newVal) {
        // request1
        // this.getalarmrange(newVal,this.radio) //锚杆锚索受力实时监测（锚杆锚索低报高报）
        // this.getforce(newVal,this.radio)// 锚杆锚索受力实时监测（受力）

        // request2
        this.getrightCenData(newVal,this.radio,this.currentIndex)
      }
    },
    mounted() {
    },
    destroyed() {
      window.removeEventListener('resize',this.selfAdaption)
    },
    methods: {
      // request1
      //锚杆锚索受力实时监测（锚杆锚索低报高报）
      getalarmrange(option1,option2) {
        let params = {
          indicator1: option1,
          indicator2: option2
        }
        this.chartisLoad1 = false
        getalarmrange(params).then(data => {
          if(data && data.success) {
            if(data.data.length) {
              data.data.forEach(item => {
                if(item.indicator_name == '锚杆高报') {
                  this.mggb = parseInt(item.value)
                }else if(item.indicator_name == '锚杆低报') {
                  this.mgdb = parseInt(item.value)
                }else if(item.indicator_name == '锚索高报') {
                  this.msgb = parseInt(item.value)
                }else if(item.indicator_name == '锚索低报') {
                  this.msdb = parseInt(item.value)
                }
              })
              this.chartisLoad1 = true
              this.chartLoad()
            }
          }
        })
      },
      // 锚杆锚索受力实时监测（受力）
      getforce(option1,option2) {
        let params = {
          indicator1: option1,
          indicator2: option2
        }
        this.chartisLoad2 = false
        getforce(params).then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.xValue = []
              this.yValue1 = []//锚杆受力
              this.yValue2 = []//锚索受力
              data.data.forEach(item => {
                if(this.xValue.every(arr => arr != item.ext_1)) {
                  this.xValue.push(item.ext_1)
                }
                if(item.indicator_name == '锚杆受力') {
                  this.yValue1.push(parseFloat(item.value).toFixed(1))
                }else if(item.indicator_name == '锚索受力') {
                  this.yValue2.push(parseFloat(item.value).toFixed(1))
                }
              })
              this.chartisLoad2 = true
              this.chartLoad()
            }
          }
        })
      },
      // 加载charts
      chartLoad() {
        if(this.chartisLoad1 && this.chartisLoad2) {
          this.drawBar()
        }
      },

      // request2
      getrightCenData(option1,option2,index) {
        let params = {
          indicator1: option1,
          indicator2: option2
        }
        let p1 = getmg_alarm(params)
        let p2 = getmonitordata_mgyl(params)
        let p3 = getms(params)
        Promise.all([p1,p2,p3]).then(result => {
          this.xValue = []
          this.yValue = []
          if(result.length == 3) {
            if(result[0] && result[0].success) {
              let list = []
              if(option1 == '3203综采面' && option2 == '回顺' && index == 0) {
                list = result[0].data.filter(item => item.topic == '3203' && item.area_name == '回风顺槽' && item.indicator_name.startsWith('锚杆'))
              }else if(option1 == '3203综采面' && option2 == '回顺' && index == 1) {
                list = result[0].data.filter(item => item.topic == '3203' && item.area_name == '回风顺槽' && item.indicator_name.startsWith('锚索'))
              }else if(option1 == '3203综采面' && option2 == '运顺' && index == 0) {
                list = result[0].data.filter(item => item.topic == '3203' && item.area_name == '运输顺槽' && item.indicator_name.startsWith('锚杆'))
              }else if(option1 == '3203综采面' && option2 == '运顺' && index == 1) {
                list = result[0].data.filter(item => item.topic == '3203' && item.area_name == '运输顺槽' && item.indicator_name.startsWith('锚索'))
              }else if(option1 == '3308综采面' && option2 == '回顺' && index == 0) {
                list = result[0].data.filter(item => item.topic == '3308' && item.area_name == '回风顺槽' && item.indicator_name.startsWith('锚杆'))
              }else if(option1 == '3308综采面' && option2 == '回顺' && index == 1) {
                list = result[0].data.filter(item => item.topic == '3308' && item.area_name == '回风顺槽' && item.indicator_name.startsWith('锚索'))
              }else if(option1 == '3308综采面' && option2 == '运顺' && index == 0) {
                list = result[0].data.filter(item => item.topic == '3308' && item.area_name == '运输顺槽' && item.indicator_name.startsWith('锚杆'))
              }else if(option1 == '3308综采面' && option2 == '运顺' && index == 1) {
                list = result[0].data.filter(item => item.topic == '3308' && item.area_name == '运输顺槽' && item.indicator_name.startsWith('锚索'))
              }
              // console.log(list,'警戒值预警值----->')
              list.forEach(item => {
                if(item.indicator_name.endsWith('高报')) {
                  this.mggb = parseInt(item.value)
                }else if(item.indicator_name.endsWith('低报')) {
                  this.mgdb = parseInt(item.value)
                }
              })
            }
            if(index == 0) {
              this.name = '锚杆受力'
              if(result[1] && result[1].success) {
                let list = []
                if(option1 == '3203综采面' && option2 == '回顺') {
                  list = result[1].data.filter(item => item.topic == '3203' && item.area_name == '回风顺槽')
                }else if(option1 == '3203综采面' && option2 == '运顺') {
                  list = result[1].data.filter(item => item.topic == '3203' && item.area_name == '运输顺槽')
                }else if(option1 == '3308综采面' && option2 == '回顺') {
                  list = result[1].data.filter(item => item.topic == '3308' && item.area_name == '回风顺槽')
                }else if(option1 == '3308综采面' && option2 == '运顺') {
                  list = result[1].data.filter(item => item.topic == '3308' && item.area_name == '运输顺槽')
                }
                // console.log(list,'锚杆----->')
                list.forEach(item => {
                  this.xValue.push(item.sensorlocation)
                  this.yValue.push(parseInt(item.monitorvalue))
                })
              }
            }
            if(index == 1) {
              this.name = '锚索受力'
              if(result[2] && result[2].success) {
                let list = []
                if(option1 == '3203综采面' && option2 == '回顺') {
                  list = result[2].data.filter(item => item.topic == '3203' && item.area_name == '回风顺槽')
                }else if(option1 == '3203综采面' && option2 == '运顺') {
                  list = result[2].data.filter(item => item.topic == '3203' && item.area_name == '运输顺槽')
                }else if(option1 == '3308综采面' && option2 == '回顺') {
                  list = result[2].data.filter(item => item.topic == '3308' && item.area_name == '回风顺槽')
                }else if(option1 == '3308综采面' && option2 == '运顺') {
                  list = result[2].data.filter(item => item.topic == '3308' && item.area_name == '运输顺槽')
                }
                // console.log(list,'锚索----->')
                list.forEach(item => {
                  this.xValue.push(item.sensorlocation)
                  this.yValue.push(parseInt(item.monitorvalue))
                })
              }
            }
            this.drawBar()
          }
        })
      },

      // 点击锚杆受力  锚索受力
      mClick(index) {
        this.currentIndex = index
        this.getrightCenData(this.parentTochild,this.radio,this.currentIndex)
      },
      
      // 切换单选框
      radioChange() {
        // request1
        // this.getalarmrange(this.parentTochild,this.radio) //锚杆锚索受力实时监测（锚杆锚索低报高报）
        // this.getforce(this.parentTochild,this.radio)// 锚杆锚索受力实时监测（受力）

        // request2
        this.getrightCenData(this.parentTochild,this.radio,this.currentIndex)
      },
      drawBar() {
        this.charts = echarts.init(document.getElementById('charts8'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show:true,
            data: this.currentIndex == 0?['锚杆受力']:['锚索受力'],
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
            right: '4%',
            bottom: '3%',
            width:'auto',
            height:'auto',
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
            name: '(mm)',
            nameTextStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(13),
              align:'right'
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
              name: this.name,
              type: 'bar',
              barWidth: '60%',
              itemStyle: {
                // color: '#acff02'
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
              data: this.yValue,
              markLine: {
                symbol: ["none", "none"], //去掉箭头,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      type: "dashed", //线条样式
                    },
                    label: {
                      show: true,
                      position: "end", // 文字显示的位置
                      color:'rgba(255, 255, 255, 0.8)',
                      fontSize:fontChart(13)
                    },
                  },
                },
                data: [
                  {
                    name: "min line on close",
                    type: "min",
                    valueDim: "close",
                    yAxis: this.mggb, // 标记线x轴的值  锚杆高报
                    itemStyle: {
                      color:'#8d1120'
                    }
                  },
                  {
                    name: "max line on close",
                    type: "max",
                    valueDim: "close",
                    yAxis: this.mgdb, // 第二条标记线x轴的值  锚杆低报
                    itemStyle: {
                      color:'#8e5733'
                    }
                  }
                  // {
                  //   name: "max line on close",
                  //   type: "max",
                  //   valueDim: "close",
                  //   yAxis: this.msgb, // 第三条标记线x轴的值  锚索高报
                  //   itemStyle: {
                  //     color:'#8d1120'
                  //   }
                  // },
                  // {
                  //   name: "max line on close",
                  //   type: "max",
                  //   valueDim: "close",
                  //   yAxis: this.msdb, // 第四条标记线x轴的值  锚索低报
                  //   itemStyle: {
                  //     color:'#8d5634'
                  //   }
                  // },
                ]
              }
            },
            // {
            //   name: '锚索受力',
            //   type: 'bar',
            //   barWidth: '20%',
            //   itemStyle: {
            //     color: '#03ac32',
            //   },
            //   label: {
            //     show:true,
            //     position: 'top'
            //   },
            //   data: this.yValue2
            // }
          ]
        }
        this.charts.setOption(option);
        this.charts.resize()
        window.addEventListener('resize',this.selfAdaption)
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
  /deep/ .el-radio-button__inner {
    background-color: #00406e;
    border: none;
    color: #fff;
    width: .286458rem;
    height: .135417rem;
    font-size: .0625rem;
  }
  .title {
    color: #03b5eb;
    font-size: .078125rem /* 15/192 */;
    font-weight: 600;
    position: absolute;
    top: 0rem /* 10/192 */;
    left: .078125rem /* 15/192 */;
  }


  .currentClass {
    color: #02baf2;
    border-bottom: .010417rem solid #00c5ff;
  }
</style>