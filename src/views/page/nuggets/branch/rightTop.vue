<template>
  <div style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content: space-between;">
    <!-- 上边部分 -->
    <div style="width: 100%;height: .208333rem;background-color: #1c233a;padding-left: .026042rem;box-sizing: border-box;position: relative;">
      <el-form style="position: absolute;top:80%;transform: translateY(-50%);" :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="选择检测面">
          <el-select @change="selectChange" size="mini" v-model="searchForm.monitoringSurface" placeholder="请选择">
            <el-option v-for="item in dataList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- <div style="width: 50%;height: 100%;">
        <div style="width: 100%;height: 50%;">
          <span style="color: #1890ff;font-size: 12px;float: right;">{{totalPerson}}</span>
          <span style="color: #fff;font-size: 12px;float: right;">井下总人数</span>
          <span style="color: #1890ff;font-size: 12px;float: right;margin-right: 10px;">{{shiftPerson}}</span>
          <span style="color: #fff;font-size: 12px;float: right;">当班入井总人数</span>
        </div>
        <div style="width: 100%;height: 50%;">
          <span style="color: #1890ff;font-size: 12px;float: right;">{{leaderObj.name_4}}</span>
          <span style="color: #fff;font-size: 12px;float: right;">四点班</span>
          <span style="color: #1890ff;font-size: 12px;float: right;margin-right: 10px;">{{leaderObj.name_8}}</span>
          <span style="color: #fff;font-size: 12px;float: right;">八点班</span>
          <span style="color: #1890ff;font-size: 12px;float: right;margin-right: 10px;">{{leaderObj.name_0}}</span>
          <span style="color: #fff;font-size: 12px;float: right;">零点班</span>
          <span style="color: #fff;font-size: 12px;float: right;margin-right: 10px;">带班领导</span>
        </div>
      </div> -->
    </div>
    <!-- 下边部分 -->
    <div style="width: 100%;height: calc(100% - .260417rem);background-color: #1c233a;position: relative;">
      <div style="width: 100%;height: .182292rem;line-height: .182292rem;padding-left: .026042rem;position: relative;box-sizing: border-box;">
        <!-- <span style="color: #00c1fa;">顶板离层实时监测</span> -->
        <p class="title">顶板离层实时监测</p>
        <el-radio-group style="position: absolute;top: .026042rem;right: .078125rem;" @change="radioChange" v-model="radio"
          size="mini">
          <el-radio-button label="回顺">回顺</el-radio-button>
          <el-radio-button label="运顺">运顺</el-radio-button>
        </el-radio-group>
      </div>
      <div style="position: absolute;top: .208333rem;right: .677083rem;cursor: pointer;z-index: 99;">
        <span style="color: #8d1120;font-size: .0625rem;">--- </span>
        <span style="color: rgba(255, 255, 255, 0.8);font-size: .0625rem;font-weight: 600;">警戒值</span>
      </div>
      <div style="position: absolute;top: .208333rem;right: .260417rem;cursor: pointer;z-index: 99;">
        <span style="color: #8e5773;font-size: .0625rem;">--- </span>
        <span style="color: rgba(255, 255, 255, 0.8);font-size: .0625rem;font-weight: 600;">预警值</span>
      </div>
      <div style="width: 100%;height: calc(100% - 35px);">
        <div id="charts7" style="width: 100%;height:100%;"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  import { gettotalperson, getdownpershift, getroofwarning, getroofseparationwarning } from '@/api/productionDepartment'
  import { gettotal_person, getdown_per_shift, getmonitordata_dbalarm, getmonitordata_dblc } from '@/api/productionDepartment2'
  import { getleader } from '@/api/bigView2'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    data() {
      return {
        searchForm: {
          monitoringSurface: '3203综采面'//下拉框
        },
        dataList: [
          {
            label: '3203综采面',
            value:'3203综采面'
          },
          {
            label: '3308综采面',
            value:'3308综采面'
          }
        ], //检测面数据
        radio: '回顺',
        // totalperson: '0',//井下总人数
        // downpershift: '0',//当班入井总人数
        // leader:'0',//领导带班
        alert:0,//警戒值
        early:0,//预警值
        xValue:[],
        yValue1:[],//深层位移
        yValue2:[],//浅层位移
        chartisLoad1:false,
        chartisLoad2:false,
        leaderObj: {
          name_0:'--',
          name_4:'--',
          name_8:'--'
        },
        totalPerson:0,
        shiftPerson:0,
        charts:''
      }
    },
    props: ['parentTochild'],
    watch: {
      parentTochild(newVal) {
        // request1
        // this.getroofwarning(newVal, this.radio)//顶板离层压力实时检测（顶板离层警戒、预警值）
        // this.getroofseparationwarning(newVal, this.radio)//顶板离层压力实时检测（顶板离层压力）
        // request2
        this.getrightTopData(newVal,this.radio)
      }
    },
    mounted() {
      this.$emit('selectChange', this.searchForm.monitoringSurface)
      // request1
      // this.gettotalperson() //井下总人数
      // this.getdownpershift()//当班入井总人数
      // request2
      // this.gettotal_person() //井下总人数
      // this.getdown_per_shift()//当班入井总人数
      // this.getleader()//领导带班  
    },
    destroyed() {
      window.removeEventListener('resize',this.selfAdaption)
    },
    methods: {
      // request1
      // 获取井下总人数
      gettotalperson() {
        gettotalperson().then(data => {
          console.log(data, '井下总人数--->')
          if (data && data.success) {
            if (data.data.length) {
              if (data.data.length) {

              }
            }
          }
        })
      },
      // 获取当班入井总人数
      getdownpershift() {
        getdownpershift().then(data => {
          console.log(data, '当班入井总人数--->')
          if (data && data.success) {
            if (data.data.length) {
              if (data.data.length) {

              }
            }
          }
        })
      },
      // request2
      // 获取井下总人数
      gettotal_person() {
        gettotal_person().then(data => {
          // console.log(data, '井下总人数--->')
          if (data && data.success) {
            if (data.data.length) {
              if (data.data.length) {
                this.totalPerson = data.data[0].curinnum
              }
            }
          }
        })
      },
      // 获取当班入井总人数
      getdown_per_shift() {
        getdown_per_shift().then(data => {
          // console.log(data, '当班入井总人数--->')
          if (data && data.success) {
            if (data.data.length) {
              if (data.data.length) {
                this.shiftPerson = data.data[0].c
              }
            }
          }
        })
      },
      // request2
      // 获取领导带班
      getleader() {
        getleader().then(data => {
          // console.log(data, '领导带班总人数--->')
          if (data && data.success) {
            if (data.data.length) {
              this.leaderObj.name_0 = data.data[0]['零点班']
              this.leaderObj.name_4 = data.data[0]['四点班']
              this.leaderObj.name_8 = data.data[0]['八点班']
            }
          }
        })
      },
      // request1
      //顶板离层压力实时检测（顶板离层警戒、预警值）
      getroofwarning(option1, option2) {
        let params = {
          indicator1: option1,
          indicator2: option2
        }
        this.chartisLoad1 = false
        getroofwarning(params).then(data => {
          if(data && data.success) {
            if(data.data.length) {
              data.data.forEach(item => {
                if(item.indicator_name == '警戒值') {
                  this.alert = parseInt(item.value)
                }else if(item.indicator_name == '预警值') {
                  this.early = parseInt(item.value)
                }
              })
              this.chartisLoad1 = true
              this.chartLoad()
            }
          }
        })
      },
      //顶板离层压力实时检测（顶板离层压力）
      getroofseparationwarning(option1, option2) {
        let params = {
          indicator1: option1,
          indicator2: option2
        }
        this.chartisLoad2 = false
        getroofseparationwarning(params).then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.xValue = []
              this.yValue1 = []//深层
              this.yValue2 = []//浅层
              data.data.forEach(item => {
                if(this.xValue.indexOf(item.ext_1) < 0) {
                  this.xValue.push(item.ext_1)
                }
                if(item.indicator_name == '深层位移') {
                  this.yValue1.push(parseFloat(item.value).toFixed(1))
                }else if(item.indicator_name == '浅层位移') {
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
      getrightTopData(option1,option2) {
        let params = {
          indicator1: option1,
          indicator2: option2
        }
        let p1 = getmonitordata_dbalarm(params) //（顶板离层警戒、预警值）
        let p2 = getmonitordata_dblc(params)  //（顶板离层压力）
        Promise.all([p1,p2]).then(result => {
          this.xValue = []
          this.yValue1 = []
          this.yValue2 = []
          if(result.length === 2) {
            if(result[0] && result[0].success) {
              let list = []
              if(option1 == '3203综采面' && option2 == '回顺') {
                list = result[0].data.filter(item => item.topic == '3203' && item.area_name == '回风顺槽')
              }else if(option1 == '3203综采面' && option2 == '运顺') {
                list = result[0].data.filter(item => item.topic == '3203' && item.area_name == '运输顺槽')
              }else if(option1 == '3308综采面' && option2 == '回顺') {
                list = result[0].data.filter(item => item.topic == '3308' && item.area_name == '回风顺槽')
              }else if(option1 == '3308综采面' && option2 == '运顺') {
                list = result[0].data.filter(item => item.topic == '3308' && item.area_name == '运输顺槽')
              }
              list.forEach(item => {
                if(item.indicator_name == '警戒值') {
                  this.alert = parseInt(item.value)
                }else if(item.indicator_name == '预警值') {
                  this.early = parseInt(item.value)
                }
              })
            }
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
              list.forEach(item => {
                this.xValue.push(item.sensorlocation)
                this.yValue1.push(parseFloat(item.deepmonitor))
                this.yValue2.push(parseFloat(item.shallowmonitor))
              })
            }
            this.drawBar()
          }
        })
      },
      //切换下拉框
      selectChange() {
        this.$emit('selectChange', this.searchForm.monitoringSurface)
      },
      // 切换单选框
      radioChange(label) {
        // request1
        // this.getroofwarning(this.searchForm.monitoringSurface, this.radio)//顶板离层压力实时检测（顶板离层警戒、预警值）
        // this.getroofseparationwarning(this.searchForm.monitoringSurface, this.radio)//顶板离层压力实时检测（顶板离层压力）
        // request2
        this.getrightTopData(this.searchForm.monitoringSurface, this.radio)
      },
      drawBar() {
        this.charts = echarts.init(document.getElementById('charts7'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['深层位移', '浅层位移'],
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
            width: 'auto',
            height: 'auto',
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
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            max: 60,
            type: 'value',
            name: '(mm)',
            nameTextStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(12),
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
                color: '#0f5681',
                type: 'dotted'
              }
            },
          },
          series: [
            {
              name: '深层位移',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: '#1760bc'
              },
              label: {
                show:true,
                position: 'top',
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13)
              },
              data: this.yValue1,
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
                    name: "警戒值",
                    // type: "min",
                    // valueDim: "close",
                    yAxis: this.alert, // 标记线x轴的值  警戒线
                    itemStyle: {
                      color:'#93101f'
                    }
                  },
                  {
                    name: "预警值",
                    // type: "max",
                    // valueDim: "close",
                    yAxis: this.early, // 第二条标记线x轴的值  预警线
                    itemStyle: {
                      color:'#c36f30'
                    }
                  },
                ]
              }
            },
            {
              name: '浅层位移',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: '#02bfff',
              },
              label: {
                show:true,
                position: 'top',
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13)
              },
              data: this.yValue2
            }
          ]
        }
        this.charts.setOption(option);
        this.charts.resize()
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
  /deep/ .el-input__inner {
    background-color: transparent !important;
    border: 1px solid #0076c8 !important;
    color: #fff;
    margin-bottom: .052083rem;
    font-size: .067708rem;
    width: .78125rem!important;
    height: .145833rem;
  }

  /deep/ .el-form--inline .el-form-item__label {
    color: #9a9da7;
    font-size: .078125rem;
  }

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
</style>
<!-- <style>
  .el-scrollbar__wrap {
    background: #31bcfe;
    color: #fff;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background: #1185f7;
  }
  .el-select-dropdown__item {
    color: #fff;
  }
  .el-select-dropdown__item.selected {

  }
</style> -->