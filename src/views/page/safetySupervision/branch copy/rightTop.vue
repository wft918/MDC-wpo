<template>
  <div style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content: space-between;">
    <!-- 上边部分 -->
    <div style="width: 100%;height: 40px;background-color: #1c233a;display: flex;">
      <div style="width: 50%;height: 100%;padding-left: 5px;box-sizing: border-box;">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="顶板压力监测区域">
            <el-select @change="selectChange" size="mini" v-model="searchForm.monitoringSurface" placeholder="请选择">
              <el-option v-for="item in dataList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div style="width: 50%;height: 100%;">
        <!-- <div style="width: 100%;height: 50%;">
          <span style="color: #1890ff;font-size: 12px;float: right;">{{totalPerson}}</span>
          <span style="color: #fff;font-size: 12px;float: right;">井下总人数</span>
          <span style="color: #1890ff;font-size: 12px;float: right;margin-right: 10px;">{{shiftPerson}}</span>
          <span style="color: #fff;font-size: 12px;float: right;">当前入井总人数</span>
        </div>
        <div style="width: 100%;height: 50%;">
          <span style="color: #1890ff;font-size: 12px;float: right;">{{leaderObj.name_4}}</span>
          <span style="color: #fff;font-size: 12px;float: right;">四点班</span>
          <span style="color: #1890ff;font-size: 12px;float: right;margin-right: 10px;">{{leaderObj.name_8}}</span>
          <span style="color: #fff;font-size: 12px;float: right;">八点班</span>
          <span style="color: #1890ff;font-size: 12px;float: right;margin-right: 10px;">{{leaderObj.name_0}}</span>
          <span style="color: #fff;font-size: 12px;float: right;">零点班</span>
          <span style="color: #fff;font-size: 12px;float: right;margin-right: 10px;">带班领导</span>
        </div> -->
      </div>
    </div>
    <!-- 下边部分 -->
    <div style="width: 100%;height: calc(100% - 45px);background-color: #1c233a;">
      <div style="width: 100%;height: 35px;line-height: 35px;padding-left: 5px;position: relative;">
        <!-- <span style="color: #00c1fa;">顶板离层实时监测</span> -->
        <p class="title">顶板离层实时监测</p>
        <el-radio-group style="position: absolute;top: 5px;right: 15px;" @change="radioChange" v-model="radio" size="mini">
          <el-radio-button label="回顺">回顺</el-radio-button>
          <el-radio-button label="运顺">运顺</el-radio-button>
        </el-radio-group>
      </div>
      <div style="width: 100%;height: calc(100% - 35px);">
        <div id="charts6" style="width: 100%;height:100%;"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  // import { getroofwarning, getroofseparationwarning } from '@/api/safetySupervision'
  import { getmonitordata_dbalarm, getmonitordata_dblc } from '@/api/safetySupervision2'
  // import { gettotalperson, getdownpershift } from '@/api/dispatch'
  import { gettotal_person,getdown_per_shift } from '@/api/dispatch2'
  import { getleader } from '@/api/productionDepartment2'
  export default {
    data() {
      return {
        searchForm: {
          monitoringSurface:'综采面'//监测面
        },
        dataList:[
          {
            label:'3203综采面',
            value:'综采面'
          },
          {
            label:'掘进面',
            value:'掘进面'
          }
        ], //检测面数据
        radio:'回顺',
        alert:0,//警戒值
        early:0,//预警值
        xValue:[],
        yValue1:[],
        yValue2:[],
        leaderObj: {
          name_0:0,
          name_4:0,
          name_8:0,
        },
        totalPerson:0,
        shiftPerson:0
      }
    },
    mounted() {
      // this.getData(this.searchForm.monitoringSurface,this.radio)
      this.getData2(this.searchForm.monitoringSurface,this.radio)
      // this.gettotal_person() //井下总人数
      // this.getdown_per_shift()//当班入井总人数
      // this.getleader()//领导带班  request2
      // this.drawBar()
    },
    methods: {
      // request1
      getData(option1,option2) {
        let params = {
          indicator1:option1,
          indicator2:option2
        }
        let p1 = getroofwarning(params) //顶板离层压力实时检测（顶板离层警戒、预警值）
        let p2 = getroofseparationwarning(params) //顶板离层压力实时检测（顶板离层压力）
        Promise.all([p1,p2]).then(result => {
          if(result.length == 2) {
            result[0].data.forEach(item => {
              if(item.indicator_name == '警戒值') {
                this.alert = parseInt(item.value)
              }else if(item.indicator_name == '预警值') {
                this.early = parseInt(item.value)
              }
            })
            this.xValue = []
            this.yValue1 = []
            this.yValue2 = []
            result[1].data.forEach(item => {
              if(this.xValue.indexOf(item.ext_1) < 0) {
                this.xValue.push(item.ext_1)
              }
              if(item.indicator_name == '深层位移') {
                this.yValue1.push(parseFloat(item.value))
              }else if(item.indicator_name == '浅层位移') {
                this.yValue2.push(parseFloat(item.value))
              }
            })
            this.drawBar()
          }
        })
      },
      // 井下总人数
      gettotalperson() {
        gettotalperson().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              // 无数据
            }
          }
        })
      },
      // 当班入井总人数
      getdownpershift() {
        getdownpershift().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              // 无数据
            }
          }
        })
      },
      /*
        request2
      */
      // 领导带班
      getleader() {
        getleader().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              // 无数据
              this.leaderObj.name_0 = data.data[0]['零点班']
              this.leaderObj.name_4 = data.data[0]['四点班']
              this.leaderObj.name_8 = data.data[0]['八点班']
            }
          }
        })
      },
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
      // 当班入井总人数
      getdown_per_shift() {
        getdown_per_shift().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.shiftPerson = data.data[0].c
            }
          }
        })
      },
      getData2(option1,option2) {
        let params = {
          indicator1:option1,
          indicator2:option2
        }
        let p1 = getmonitordata_dbalarm(params) //顶板离层压力实时检测（顶板离层警戒、预警值）
        let p2 = getmonitordata_dblc(params) //顶板离层压力实时检测（顶板离层压力）
        Promise.all([p1,p2]).then(result => {
          this.xValue = []
          this.yValue1 = []
          this.yValue2 = []
          if(result.length == 2) {
            if(result[0] && result[0].success) {
              let list = []
              if(option1 == '综采面' && option2 == '回顺') {
                list = result[0].data.filter(item => item.topic == '3203' && item.area_name == '回风顺槽')
              }else if(option1 == '综采面' && option2 == '运顺') {
                list = result[0].data.filter(item => item.topic == '3203' && item.area_name == '运输顺槽')
              }else if(option1 == '掘进面' && option2 == '回顺') {
                list = result[0].data.filter(item => item.topic == '3308' && item.area_name == '回风顺槽')
              }else if(option1 == '掘进面' && option2 == '运顺') {
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
              if(option1 == '综采面' && option2 == '回顺') {
                list = result[1].data.filter(item => item.topic == '3203' && item.area_name == '回风顺槽')
              }else if(option1 == '综采面' && option2 == '运顺') {
                list = result[1].data.filter(item => item.topic == '3203' && item.area_name == '运输顺槽')
              }else if(option1 == '掘进面' && option2 == '回顺') {
                list = result[1].data.filter(item => item.topic == '3308' && item.area_name == '回风顺槽')
              }else if(option1 == '掘进面' && option2 == '运顺') {
                list = result[1].data.filter(item => item.topic == '3308' && item.area_name == '运输顺槽')
              }
              list.forEach(item => {
                this.xValue.push(item.sensorlocation)
                this.yValue1.push(parseInt(item.deepmonitor))
                this.yValue2.push(parseInt(item.shallowmonitor))
              })
            }
            this.drawBar()
          }
        })
      },


      //切换下拉框
      selectChange() {
        // this.getData(this.searchForm.monitoringSurface,this.radio)
        this.getData2(this.searchForm.monitoringSurface,this.radio)
      },
      // 切换单选框
      radioChange() {
        // this.getData(this.searchForm.monitoringSurface,this.radio)
        this.getData2(this.searchForm.monitoringSurface,this.radio)
      },
      drawBar() {
        let charts = echarts.init(document.getElementById('charts6'))
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
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: 14      //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            type: 'value',
            name: 'mm',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: 14      //更改坐标轴文字大小
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
              name: '深层位移',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: '#1760bc'
              },
              label: {
                show:true,
                position:'top'
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
              label: {
                show:true,
                position:'top'
              },
              itemStyle: {
                color: '#02bfff',
              },
              data: this.yValue2
            }
          ]
        }
        charts.setOption(option);
        window.addEventListener('resize',() => {
          charts.resize()
        })
      }
    },
  }
</script>
<style scoped>
  /deep/ .el-input__inner {
    background-color: transparent!important;
    border: .005208rem solid #0076c8!important;
    color: #fff;
    margin-bottom: .052083rem;
    width: .78125rem;
    height: .145833rem;
    font-size: .0625rem;
  }
  /deep/ .el-form--inline .el-form-item__label {
    color: #9a9da7;
  }
  /deep/ .el-radio-button__inner {
    background-color: #00406e;
    border: none;
    color: #fff;
  }


   /deep/ .el-select-dropdown {
    background-color: #057cd0!important;
  }
  /deep/ .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #0496fd!important;
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