<doc>
  10m 大屏 左中部分
</doc>
<template>
  <div class="box">
    <p class="title">系统报警统计</p>
    <div class="content">
      <div class="part left">
        <p class="msg">近30天异常报警次数</p>
        <img class="img" :class="lay_out == 'wpo'?'img1':lay_out == 'zhui'?'img2':''"
          src="../../../../../assets/img/bigView/zhuxingtu.png" alt="">
        <div class="num">
          <p style="color:#ff005c;font-size: .130208rem /* 25/192 */;font-family: 'ysbth';">{{secondTotal}} 
            <span class="unit">次</span>
          </p>
        </div>
      </div>
      <div class="part right">
        <p class="msg">各系统报警次数</p>
        <div class="echart-div">
          <!-- <pie :id="'pie1'" :data="pieData"></pie> -->
          <high-chart style="height: 100%;width: 100%;margin-top: -2%;" :id="id" :data="data"></high-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import pie from '@/views/page/bigViewTest/left/echarts/pie'
  import highChart from '../highChart/pie3d'
  // import { getsystemalarms } from '@/api/bigView'
  import { systemAlarmCnts } from '@/api/bigView2'
  export default {
    data() {
      return {
        secondTotal: 0,
        pieData: [],
        lay_out: '',
        id: 'test',
        data: [],
      }
    },
    components: {
      pie,
      highChart
    },
    mounted() {
      this.lay_out = process.env.VUE_APP_LAYOUT_BIGVIEW
      // this.getsystemalarms() //系统报警次数
      this.systemAlarmCnts()
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
      systemAlarmCnts() {
        systemAlarmCnts().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              // 无数据
              this.pieData = []
              if (data.data.length) {
                this.secondTotal = 0
                data.data.forEach(item => {
                  this.secondTotal += Number(item.value)
                  this.pieData.push([
                    item.ext_2,
                    Number(item.value)
                  ])
                })
                this.data = this.pieData
              }
            }
          }
        })
      }

    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
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
  }

  /* 展会 */
  .img2 {
    position: absolute;
    bottom: 12%;
    left: 5%;
    width: 90%;
    height: 50%;
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
</style>