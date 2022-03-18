<doc>
  调度中心页面
</doc>
<template>
  <div class="box">
    <div class="part">
      <div class="left">
        <p class="title">生产指标</p>
        <div class="left-part">
          <progress-model :id='"id1"' :name="'日产量'" :unit="'吨'" :value="value1"></progress-model>
          <progress-model :id='"id2"' :name="'日掘进进尺'" :unit="'米'" :value="value2"></progress-model>
          <progress-model :id='"id3"' :name="'日销量'" :unit="'吨'" :value="value3"></progress-model>
        </div>
        <div class="left-part left-part-bottom">
          <progress-model :id='"id4"' :name="'日洗煤量'" :unit="'吨'" :value="value4"></progress-model>
          <progress-model :id='"id5"' :name="'日抽放打钻进尺'" :unit="'米'" :value="value5"></progress-model>
        </div>
      </div>
      <div class="left">
        <p class="title">井下人员区域分布</p>
        <bar :xValue="leftBotxValue" :yValue="leftBotyValue"></bar>
      </div>
    </div>
    <div class="part">
      <div class="center">
        <p class="title">月计划产量、完成产量、完成率</p>
        <center-top :data="centopData" :value="value1"></center-top>
      </div>
      <div class="center">
        <p class="title">月计划进尺、完成进尺、完成率</p>
        <center-center :data="cencenData" :value="value2"></center-center>
      </div>
      <div class="center">
        <p class="title">月度销售及运量统计</p>
        <center-bottom :data="cenbotData" :value="value3"></center-bottom>
      </div>
    </div>
    <div class="part-right">
      <right></right>
    </div>
  </div>
</template>
<script>
  import "../../../utils/flexible.js";
  import bar from '@/views/page/dispatch/model/bar'
  import progressModel from '@/views/page/dispatch/model/progressModel'
  import centerTop from '@/views/page/dispatch/part/centerTop'
  import centerCenter from '@/views/page/dispatch/part/centerCenter'
  import centerBottom from '@/views/page/dispatch/part/centerBottom'
  import right from '@/views/page/dispatch/part/right'
  import {getdailyreport,getareaperson,getmonthlyreport,gettotalperson,getdownpershift} from '@/api/dispatch'
  import { getoutput_forward_day, getoutput_forward_month, getoutput_forward_plan, getwashing_day, getwashing_month, getwashing_plan, getdrilling_day, getdrilling_month, getselling_day, getselling_month, getselling_plan, getleader } from '@/api/bigView2'
  import { getproduction_report_month, getselling_report_month, getarea_person,gettotal_person,getdown_per_shift } from '@/api/dispatch2'
  export default {
    components: {
      progressModel,
      bar,
      centerTop,
      centerCenter,
      centerBottom,
      right,
    },
    data() {
      return {
        value: '综采面',
        value1:0,//日产量
        // value_1:0,
        value2:0,//掘金尺
        // value_2:0,
        value3:0,//日销量
        // value_3:0,
        value4:0,//洗煤
        // value_4:0,
        value5:0,//打钻进尺
        // value_5:0,
        leftBotxValue:[],
        leftBotyValue:[],
        centopData:[],
        cencenData:[],
        cenbotData:[],
        leader_0:'--',
        leader_4:'--',
        leader_8:'--',
        totalPerson:0,
        shiftPerson:0,
        selectData:[  //下拉框
          {
            label:'3203综采面',
            value:'综采面'
          },
          {
            label:'掘进面',
            value:'掘进面'
          }
        ]
      }
    },
    mounted() {
      // request1
      // this.getdailyreport()//生产指标
      // this.getareaperson()//井下区域超员情况统计
      // this.getmonthlyreport() //中间部分
      // this.gettotalperson()//井下总人数
      // this.getdownpershift()//当班入井总人数
      
      // request2
      this.getOtData() //1,2数据
      this.getTrData() //3数据
      this.getFoData() //4数据
      this.getFiData() //5数据
      this.getproduction_report_month() // 月计划产量、完成产量、完成率\月计划进尺、完成进尺、完成率
      this.getselling_report_month() //月度销售及运量统计
      // this.getleader()//领导带班
      this.getarea_person() //井下区域超远总人数 
      // this.gettotal_person() //井下总人数
      // this.getdown_per_shift()//当班入井总人数
    },
    methods: {
      /*
        request1
      */
      // 生产指标
      getdailyreport() {
        getdailyreport().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.value1 = data.data[0].d_dayoutput
              this.value2 = data.data[0].d_dayforward
              this.value3 = data.data[0].d_dayselling
              this.value4 = data.data[0].d_daywashing
              this.value5 = data.data[0].d_daydrilling
            }
          }
        })
      },
      // 井下区域超员情况统计
      getareaperson() {
        getareaperson().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.leftBotxValue = []
              this.leftBotyValue = []
              data.data.forEach(item => {
                this.leftBotxValue.push()
                this.leftBotyValue.push(item.curinregionnum)
              })
            }
          }
        })
      },
      // 中间部分
      getmonthlyreport() {
        getmonthlyreport().then(data => {
          if(data && data.success) {
            if(data.data.length) {

            }
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
      // 获取日产量  进尺
      getOtData() {
        let p1 = getoutput_forward_day()
        // let p2 = getoutput_forward_month()
        // let p3 = getoutput_forward_plan()
        Promise.all([p1]).then(result => {
          if(result.length) {
            this.value1 = result[0].data[0]['日产量']
            this.value2 = result[0].data[0]['日掘进进尺']
            // this.value_1 = parseInt(this.value1 / (result[1].data[0]['月累计产量']/result[2].data[0]['月计划产量']))  //总数
            // this.value_2 = parseInt(this.value2 / (result[1].data[0]['月累计掘进进尺']/result[2].data[0]['月计划掘进进尺']))
          }
        })
      },
      // 日销量
      getTrData() {
        let p1 = getselling_day()
        // let p2 = getselling_month()
        // let p3 = getselling_plan()
        Promise.all([p1]).then(result => {
          if(result.length) {
            this.value3 = result[0].data[0]['日销量']
            // this.value_3 = parseInt(this.value3 / (result[1].data[0]['月累计销量'] / result[2].data[0]['月计划销量']))
          }
        })
      },
      // 洗煤量
      getFoData() {
        let p1 = getwashing_day()
        // let p2 = getwashing_month()
        // let p3 = getwashing_plan()
        Promise.all([p1]).then(result => {
          if(result.length) {
            this.value4 = result[0].data[0]['日洗煤量']
            // this.value_4 = parseInt(this.value4 / (result[1].data[0]['月累计洗煤量'] / result[2].data[0]['月计划洗煤量']))
          }
        })
      },
      // 日抽放打钻进尺
      getFiData() {
        let p1 = getdrilling_day()
        // let p2 = getdrilling_month()
        // let p3 = getdrilling_plan()
        Promise.all([p1]).then(result => {
          if(result.length) {
            this.value5 = result[0].data[0]['日抽放打钻进尺']
            // this.value_4 = parseInt(this.value4 / (result[1].data[0]['月累计洗煤量'] / result[2].data[0]['月计划洗煤量']))
          }
        })
      },
      
      //  月计划产量、完成产量、完成率\月计划进尺、完成进尺、完成率
      getproduction_report_month() {
        getproduction_report_month().then(data => {
          if(data && data.success) {
            this.centopData = []
            this.cencenData = []
            if(data.data.length) {
              let currentYear = new Date().getFullYear()
              data.data.forEach(item => {
                this.centopData.push({
                  'x轴':currentYear + item['d_month'],
                  '完成量': item['完成产量'],
                  '计划产量': item['计划产量'],
                  '完成率': parseFloat(item['完成产量']/item['计划产量']).toFixed(2) * 100
                })
                this.cencenData.push({
                  'x轴':currentYear + item['d_month'],
                  '完成进尺': item['完成进尺'],
                  '计划进尺': item['计划进尺'],
                  '完成率': parseFloat(item['完成进尺']/item['计划进尺']).toFixed(2) * 100
                })
              })
              // console.log(this.centopData,'上面数据--->')
              // console.log(this.cencenData,'中间数据--->')
            }
          }
        })
      },
      // 月度销售及运量统计
      getselling_report_month() {
        getselling_report_month().then(data => {
          if(data && data.success) {
            this.cenbotData = []
            if(data.data.length) {
              let currentYear = new Date().getFullYear()
              data.data.forEach(item => {
                item.d_month = currentYear + item.d_month
              })
              this.cenbotData = data.data
            }
          }
        })
      },
      // 井下区域超远总人数
      getarea_person() {
        getarea_person().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.leftBotxValue = []
              this.leftBotyValue = []
              data.data.forEach(item => {
                this.leftBotxValue.push(item['区域'])
                this.leftBotyValue.push(parseFloat(item['人数']))
              })
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
      // 领导带班
      getleader() {
        getleader().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.leader_0 = data.data[0]['零点班']
              this.leader_4 = data.data[0]['四点班']
              this.leader_8 = data.data[0]['八点班']
            }
          }
        })
      }
    },
  }
</script>
<style scoped>
  .box {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
  }

  .part {
    width: 32.5%;
    height: 98%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .part-right {
    width: 32.5%;
    height: 99%;
  }

  .left {
    background-color: #1c233a;
    height: 49.3%;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .center {
    background-color: #1c233a;
    height: 32.5%;
    position: relative;
  }

  .top {
    height: .364583rem /* 70/192 */;
    background-color: #1c233a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bottom {
    margin-top: .052083rem /* 10/192 */;
    height: calc(100% - .416667rem);
    background-color: #1c233a;
  }

  .title {
    color: #03b5eb;
    font-size: .078125rem /* 15/192 */;
    font-weight: 600;
    position: absolute;
    top: .052083rem /* 10/192 */;
    left: .078125rem /* 15/192 */;
  }

  /deep/.el-input__inner {
    background-color: #000723;
    color: #fff;
    font-size: .067708rem;
    /* width: .677083rem;
    height: .145833rem; */
  }

  .msg {
    font-size: .072917rem /* 14/192 */;
    padding: .015625rem /* 3/192 */ 0;
    text-align: right;
  }

  .blue {
    color: #03b5eb;
    font-weight: 600;
  }

  .left-part {
    width: 100%;
    height: 33%;
    margin-top: .052083rem /* 10/192 */;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-part-bottom {
    width: 75%;
  }
</style>