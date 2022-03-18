<doc>
  机电部页面
</doc>
<template>
  <div class="box">
    <div class="top">
      <div class="left">
        <p class="title">关键设备能效分析</p>
        <left-top :leftTopResult="leftTopResult"></left-top>
      </div>
      <div class="right">
        <p class="title">生产能耗分析</p>
        <div style="margin-right: 10px;">
          <p class="msg" style="visibility: hidden;">当班入井总人数 <span class="blue">{{num1}}</span> &nbsp;&nbsp; 井下总人数 <span class="blue">{{num2}}</span></p>
          <p class="msg" style="visibility: hidden;">带班领导 &nbsp;&nbsp; 零点班 <span class="blue">{{leaderObj.name_0}}</span> &nbsp;&nbsp; 八点班 <span
              class="blue">{{leaderObj.name_8}}</span>
            &nbsp;&nbsp; 四点班 <span class="blue">{{leaderObj.name_4}}</span></p>
        </div>
        <div class="top-right-content">
          <!-- <div class="item">
            <img class="img" src="../../../assets/img/electromechanical/sd.png" alt="">
            <p class="name">昨日耗电量</p>
            <p class="value">{{consumePowerDay}}</p>
            <p class="unit">千瓦时</p>
          </div> -->
          <div class="item">
            <img class="img" src="../../../assets/img/electromechanical/sd.png" alt="">
            <p class="name">月度累计耗电量</p>
            <p class="value">{{consumePowerMonth}}</p>
            <p class="unit">千瓦时</p>
          </div>
          <div class="item">
            <img class="img" src="../../../assets/img/electromechanical/sd.png" alt="">
            <p class="name">年度累计耗电量</p>
            <p class="value">{{consumePowerYear}}</p>
            <p class="unit">千瓦时</p>
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="left">
        <p class="title">关键设备维修分析</p>
        <left-center :centerLeftResult="centerLeftResult"></left-center>
      </div>
      <div class="right" style="position: relative;">
        <p class="title">上月吨煤耗电成本</p>
        <img style="width: 2.635417rem /* 506/192 */;height: .994792rem /* 191/192 */;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);" src="../../../assets/img/home/electricEnergy.png" alt="">
        <div style="width: 100%;height: 40px;position: absolute;top: 38.5%;padding-left: 40%;padding-right: 19%;box-sizing: border-box;line-height: 40px;">
          <span style="float: left;font-family: ysbth;color: #fff;font-size: .130208rem /* 25/192 */;">{{electricEnergy}}</span>
          <span style="float: right;color: #a2a6b3;font-size: .067708rem /* 13/192 */">千瓦时</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p class="title">关键设备状态分析</p>
      <bottom :statusData="statusData" :devieceTimeData="devieceTimeData"></bottom>
    </div>
  </div>
</template>
<script>
  import leftTop from '@/views/page/electromechanical/part/leftTop'
  import leftCenter from '@/views/page/electromechanical/part/leftCenter'
  import bottom from '@/views/page/electromechanical/part/bottom'
  import { getdeviceoperationrate, getoperationratefill, getstatus, getdevicecumtime, getrepaircntsfill, getrepaircnts,geteleyesterday,getelecostlastmonth,getelethisyear,getelepertonlastmonth } from '@/api/electromechanical'
  import { getele_cons_last_month, getele_cons_year, getele_per_ton_last_month } from '@/api/electromechanical2'
  import { gettotalperson, getdownpershift } from '@/api/dispatch'
  import { getleader } from '@/api/productionDepartment2'
  import { downPerShift, totalPerson } from '@/api/bigView2'
  export default {
    data() {
      return {
        leftTopResult: [], //关键设备能效分析
        statusData: [],//关键设备状态
        devieceTimeData:[],//关键设备累计运行时间
        centerLeftResult: [],//关键设备维修分析
        // consumePowerDay:0.00,//昨日耗电量
        consumePowerMonth:0.00,//月度累计耗电量
        consumePowerYear:0.00,//年度累计耗电量
        electricEnergy:0.00,//上月吨煤电能分析
        leaderObj: {
          name_0:'--',
          name_4:'--',
          name_8:'--'
        },
        num1: '--',
        num2: '--',
      }
    },
    components: {
      leftTop,
      leftCenter,
      bottom,
    },
    mounted() {
      // request1
      // this.getTopleftData()  //topleft所有数据
      // this.getstatus() //关键设备状态分析
      // this.getdevicecumtime()//累计运行时间
      // this.getCenterLeftData() // 关键设备维修分析
      // this.geteleyesterday()//生产能耗 日 
      // this.getelecostlastmonth()//生产能耗 月
      // this.getelethisyear()//生产能耗 年
      // this.getelepertonlastmonth()//上月吨煤电能分析
      // this.gettotalperson()//井下总人数
      // this.getdownpershift()//当班入井总人数
      
      // request2
      // this.getleader()//领导带班
      this.getele_cons_last_month()//生产能耗 月
      this.getele_cons_year()//生产能耗 年
      this.getele_per_ton_last_month()//上月吨煤电能分析
      
      // this.downPerShift()
      // this.totalPerson()
    },
    methods: {

      /*
        request1
      */
      // 获取关键设备能效分析数据
      getTopleftData() {
        let p1 = getdeviceoperationrate()
        let p2 = getoperationratefill()
        Promise.all([p1, p2]).then(result => {
          if (result.length == 2) {
            this.leftTopResult = result
          }
        })
      },
      // 关键设备状态分析  正常 异常
      getstatus() {
        getstatus().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.statusData = data.data
            }
          }
        })
      },
      // 关键设备状态分析   累计运行时间
      getdevicecumtime() {
        getdevicecumtime().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.devieceTimeData = data.data
            }
          }
        })
      },
      // 关键设备维修分析
      getCenterLeftData() {
        let p1 = getrepaircntsfill()
        let p2 = getrepaircnts()
        Promise.all([p1, p2]).then(result => {
          if (result.length == 2) {
            this.centerLeftResult = []
            let nameList = ['采煤机', '掘进机', '主运皮带']
            let valueList = [result[0].data[0].d_coalcutter_repair_cnts, result[0].data[0].d_heading_machine_repair_cnts, result[0].data[0].d_main_belt_repair_cnts]
            for (let i = 0; i < 3; i++) {
              this.centerLeftResult.push({
                name: nameList[i],
                value: parseInt(valueList[i])
              })
            }
            result[1].data.forEach(item => {
              if (item.indicator_name == '主斜井提升机维修次数') {
                this.centerLeftResult.push({
                  name: '主斜井提升机',
                  value: parseInt(item.value)
                })
              }
              if (item.indicator_name == '空压机维修次数') {
                this.centerLeftResult.push({
                  name: '空压机',
                  value: parseInt(item.value)
                })
              }
              if (item.indicator_name == '通风机维修次数') {
                this.centerLeftResult.push({
                  name: '通风机',
                  value: parseInt(item.value)
                })
              }
            })
          }
        })
      },
      // 能耗分析 日
      geteleyesterday() {
        geteleyesterday().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.consumePowerDay = parseFloat(data.data[0]['d_consume']).toFixed(2)
            }
          }
        })
      },
      // 能耗分析 月
      getelecostlastmonth() {
        getelecostlastmonth().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.consumePowerMonth = parseFloat(data.data[0].d_consume).toFixed(2)
            }
          }
        })
      },
      // 能耗分析 年
      getelethisyear() {
        getelethisyear().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.consumePowerYear = parseFloat(data.data[0]['sum(d_consume)']).toFixed(2)
            }
          }
        })
      },
      // 上月吨煤电能分析
      getelepertonlastmonth() {
        getelepertonlastmonth().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.electricEnergy = parseFloat(data.data[0].ele_per_ton).toFixed(3)
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

      // 领导带班
      getleader() {
        getleader().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.leaderObj.name_0 = data.data[0]['零点班']
              this.leaderObj.name_4 = data.data[0]['四点班']
              this.leaderObj.name_8 = data.data[0]['八点班']
            }
          }
        })
      },

      // 当班入井总人数
      downPerShift() {
        downPerShift().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.num1 = data.data[0].c
            }
          }
        })
      },

      // 井下总人数
      totalPerson() {
        totalPerson().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.num2 = data.data[0].curinnum
            }
          }
        })
      },

      // 能耗分析 月
      getele_cons_last_month() {
        getele_cons_last_month().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.consumePowerMonth = parseFloat(data.data[0]['月耗电量']).toFixed(2)
            }
          }
        })
      },
      // 能耗分析 年
      getele_cons_year() {
        getele_cons_year().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.consumePowerYear = parseFloat(data.data[0]['年耗电量']).toFixed(2)
            }
          }
        })
      },
      // 上月吨煤电能分析
      getele_per_ton_last_month() {
        getele_per_ton_last_month().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.electricEnergy = parseFloat(data.data[0]['月吨煤耗电成本']).toFixed(3)
            }
          }
        })
      },

      

    },
  }
</script>
<style scoped>
  .box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .top {
    height: 30%;
    width: 98%;
    display: flex;
    justify-content: space-between;
  }

  .center {
    height: 40%;
    width: 98%;
    margin-top: 1%;
    display: flex;
    justify-content: space-between;
  }

  .bottom {
    height: 20%;
    width: 98%;
    background-color: #1c233a;
    margin-top: 1%;
    position: relative;
  }

  .left {
    width: 69%;
    height: 100%;
    background-color: #1c233a;
    position: relative;
  }

  .right {
    width: 30%;
    height: 100%;
    background-color: #1c233a;
    position: relative;
  }

  .title {
    color: #03b5eb;
    font-size: 15px;
    font-weight: 600;
    position: absolute;
    top: 10px;
    left: 15px;
  }

  .msg {
    font-size: 12px;
    padding: 3px 0;
    text-align: right;
  }

  .blue {
    color: #03b5eb;
    font-weight: 600;
  }

  .top-right-content {
    height: 63%;
    margin-top: 4%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .item {
    width: 40%;
    height: 100%;
    margin: 0 2%;
    background: linear-gradient(360deg, #3E4C6A 0%, #2F3B53 100%);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .img {
    width: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .name {
    text-align: center;
  }

  .value {
    text-align: center;
    margin: 10px 0px;
    font-family: "ysbth";
    font-size: 25px;
    color: #00a0ff;
  }

  .unit {
    text-align: center;
    font-size: 13px;
  }
</style>