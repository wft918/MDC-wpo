<doc>
  10m 大屏 左中部分
</doc>
<template>
  <div class="box">
    <p class="title">系统报警统计</p>
    <div class="content">
      <div class="part left">
        <p class="msg">近30天异常报警次数</p>
        <img ref="leftImage" @mouseenter="imgMouseEnter" @mouseleave="imgMouseLeave" class="img" :class="lay_out == 'wpo'?'img1':lay_out == 'zhui'?'img2':''"
          src="../../../../../assets/img/bigView/zhuxingtu.png" alt="">
        <div class="num">
          <p style="color:#ff005c;font-size: .130208rem /* 25/192 */;font-family: 'ysbth';">{{secondTotal}} 
            <span class="unit">次</span>
          </p>
        </div>
      </div>
      <div class="part right">
        <p class="msg">各系统报警次数</p>
        <div ref="rightPie" class="echart-div">
          <!-- <pie :id="'pie1'" :data="pieData"></pie> -->
          <high-chart @pieClick="pieClick" style="height: 100%;width: 100%;margin-top: -2%;" :id="'highChart'" :data="pieData"></high-chart>
        </div>
      </div>
    </div>

    <!-- 小表格 -->
    <transition name="el-zoom-in-center">
      <div v-show="isShow" class="table">
        <div class="tableTitle">
          <div style="width: 6.25%">序号</div>
          <div>报警时间</div>
          <div>报警等级</div>
          <div>系统名称</div>
          <div>设备名称</div>
          <div>测点名称</div>
          <div>报警内容</div>
          <div>处理建议</div>
          <div style="width: 6.25%;">状态</div>
        </div>
        <div class="tableContent">
          <div v-for="(item,index) in drillingData" :key="item.time">
            <div style="width: 6.25%">{{index + 1}}</div>
            <div>{{item.time || ''}}</div>
            <div>{{'报警等级' || ''}}</div>
            <div>{{item.systemname || ''}}</div>
            <div>{{item.deviceename || ''}}</div>
            <div>{{item.sensor || ''}}</div>
            <div>{{item.content || ''}}</div>
            <div>{{'处理建议' || ''}}</div>
            <div style="width: 6.25%">{{'状态' || ''}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import pie from '@/views/page/bigView/left/echarts/pie'
  import highChart from '../highChart/pie3d'
  // import { getsystemalarms } from '@/api/bigView'
  import { systemAlarmCnts,getSystemAlarm } from '@/api/bigView2'
  export default {
    data() {
      return {
        secondTotal: 0,
        pieData: [],
        // data: [],
        isShow:false,
        drillingDataAll:[],  //数据钻取所有数据
        drillingData:[]  //数据钻取部分数据
      }
    },
    components: {
      pie,
      highChart
    },
    computed: {
      lay_out: () => process.env.VUE_APP_LAYOUT_BIGVIEW
    },
    mounted() {
      // this.getsystemalarms() //系统报警次数
      // this.systemAlarmCnts()
      this.getSystemAlarm()  //数据钻取
      this.onDocumentClick()
    },
    methods: {
      // request1 接口
      // // 系统报警次数
      // getsystemalarms() {
      //   getsystemalarms().then(data => {
      //     if(data && data.success) {
      //       this.pieData = []
      //       if(data.data.length) {
      //         this.secondTotal = 0
      //         data.data.forEach(item => {
      //           this.secondTotal += item.value
      //           this.pieData.push({
      //             value:item.value,
      //             name:item.ext_1
      //           })
      //         })
      //       }
      //     }
      //   })
      // }

      // 王坡 request 接口
      // systemAlarmCnts() {
      //   systemAlarmCnts().then(data => {
      //     if (data && data.success) {
      //       if (data.data.length) {
      //         // 无数据
      //         this.pieData = []
      //         if (data.data.length) {
      //           this.secondTotal = 0
      //           data.data.forEach(item => {
      //             this.secondTotal += Number(item.value)
      //             this.pieData.push([
      //               item.ext_2,
      //               Number(item.value)
      //             ])
      //           })
      //           this.data = this.pieData
      //         }
      //       }
      //     }
      //   })
      // },
      // 数据钻取
      getSystemAlarm() {
        getSystemAlarm().then(data => {
          if(data && data.success) {
            this.pieData = []
            this.secondTotal = 0
            if(data.data.length) {
              this.drillingDataAll = data.data
              this.secondTotal = data.data.length
              let names = [...new Set(data.data.map(item => item.systemname))]
              names.forEach(name => {
                let value = data.data.filter(item => item.systemname == name).length
                this.pieData.push([name,value])
              })
            }
          }
        })
      },
      // 鼠标移入img
      imgMouseEnter() {
        this.drillingData = this.drillingDataAll
        this.isShow = true
      },
      // 鼠标移出img
      imgMouseLeave() {
        this.isShow = false
      },
      // 点击3D饼图
      pieClick(name) {
        // console.log(name,'点击的当前name-->>')
        this.isShow = true
        this.drillingData = this.drillingDataAll.filter(item => item.systemname == name) || []
      },
      // 监听document点击
      onDocumentClick() {
        document.onclick = (e) => {
          if(this.$refs.leftImage && this.$refs.rightPie) {
            let isSelf1 = this.$refs.leftImage.contains(e.target)
            let isSelf2 = this.$refs.rightPie.contains(e.target)
            if(!isSelf1 && !isSelf2) {
              this.isShow = false
            }
          }
        }
      }
    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .title {
    font-size: .083333rem
      /* 16/192 */
    ;
    color: #00FFFF;
    text-align: center;
    height: .15625rem
      /* 30/192 */
    ;
    line-height: .15625rem
      /* 30/192 */
    ;
    font-weight: 650;
    /* text-shadow: 0rem 0rem .052083rem #00FFFF; */
    background: url("../../../../../assets/img/bigView/title-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .content {
    width: 100%;
    height: calc(100% - .15625rem);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .part {
    height: 100%;
    width: 40%;
  }

  .left {
    width: 35%;
    text-align: center;
    position: relative;
  }

  .right {
    width: 60%;
  }

  .msg {
    margin-top: 3%;
    font-size: .072917rem
      /* 14/192 */
    ;
    text-align: center;
    height: .130208rem
      /* 25/192 */
    ;
    line-height: .130208rem
      /* 25/192 */
    ;
  }

  /* 王坡 */
  .img1 {
    position: absolute;
    bottom: 12%;
    left: 5%;
    width: 90%;
    height: 50%;
    cursor: pointer;
  }

  /* 展会 */
  .img2 {
    position: absolute;
    bottom: 12%;
    left: 5%;
    width: 90%;
    height: 50%;
    cursor: pointer;
  }

  .num {
    position: absolute;
    width: 100%;
    top: 25%;
  }

  .unit {
    font-size: .067708rem /* 13/192 */; 
    color: #fff;
  }

  .echart-div {
    height: calc(100% - .130208rem);
  }


  /* 小表格 */
  .table {
    width: 4.4271rem;
    /* height: .520833rem; */
    position: absolute;
    top: 1.145833rem;
    left: 1.1458rem;
    z-index: 99;
  }

  .tableTitle {
    width: 100%;
    height: .125rem;
    display: flex;
  }
  .tableTitle > div {
    width: 12.5%;
    height: 100%;
    background-color: #3b4760;
    border: .005208rem solid #000722;
    box-sizing: border-box;
    text-align: center;
    line-height: .125rem;
    font-size: .0625rem;
    color: #fff;
  }
  .tableTitle > div:nth-of-type(1) {
    /* width: 13%; */
    height: 100%;
    background-color: #3b4760;
    border: .005208rem solid #000722;
    box-sizing: border-box;
    font-size: .0625rem;
    color: #fff;
  }

  .tableContent {
    width: 100%;
    /* height: calc(100% - .125rem); */
    /* overflow-y: auto; */
  }
  .tableContent > div {
    width: 100%;
    height: .125rem;
    display: flex;
  }
  .tableContent > div > div {
    width: 12.5%;
    height: 100%;
    background-color: #242b41;
    border: .005208rem solid #000722;
    box-sizing: border-box;
    text-align: center;
    line-height: .125rem;
    font-size: .0625rem;
    color: #fff;
  }
  .tableContent > div > div:nth-of-type(1) {
    /* width: 13%; */
    height: 100%;
    background-color: #242b41;
    border: .005208rem solid #000722;
    box-sizing: border-box;
    font-size: .0625rem;
    color: #fff;
  }
</style>