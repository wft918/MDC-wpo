<doc>
  右侧
</doc>
<template>
  <div class="box">
    <div class="part">
      <div class="rightLeft">
        <barTwo :xValue="xValue" :yValue="yValue"></barTwo>
      </div>
      <div class="rightRight">
        <p class="title">人员定位卡低电量报警数</p>
        <p class="num">报警卡数 <span
            style="font-size: .104167rem /* 20/192 */; font-family: ysbth;color: #f2a524;">{{count}}</span> 张</p>
        <div class="names">
          <div style="font-size: .078125rem;">无异常数据</div>
          <!-- <p class="name">卢桂英</p>
          <p class="name">吴杰</p>
          <p class="name">韩涛</p>
          <p class="name">尚尚</p>
          <p class="name">方涛</p> -->
        </div>
      </div>
    </div>
    <div class="part">
      <bat-three :areaxValue="areaxValue" :areayValue="areayValue"></bat-three>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import barTwo from '@/views/page/informationCenter/echart/barTwo'
  import batThree from '@/views/page/informationCenter/echart/batThree'
  import { getcountbyworktype, getareaperson } from '@/api/informationCenter'
  import { countByWorktype, lowBattery , areaPerson } from '@/api/informationCenter2'
  export default {
    data() {
      return {
        areaxValue: [], //区域统计 X
        areayValue: [], //区域统计 Y
        xValue: [],
        yValue: [],
        count: '--'
      }
    },
    components: {
      barTwo,
      batThree
    },
    mounted() {
      // request1
      // this.getcountbyworktype()
      // this.getareaperson()

      // request2
      this.countByWorktype()
      this.lowBattery()
      this.areaPerson()
    },
    methods: {

      // request2
      // 特殊工种
      countByWorktype() {
        countByWorktype().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              data.data.forEach(element => {
                this.xValue.push(element.工种)
                this.yValue.push(element.人数)
              })
            }
          }
        })
      },

      // 人员定位卡低电量报警(加接收接口)
      lowBattery() {
        lowBattery().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.count = data.data[0]["count(senderid)"]
            }
          }
        })
      },

      areaPerson() {
        areaPerson().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              data.data.forEach(item => {
                this.areaxValue.push(item.区域)
                this.areayValue.push(parseInt(item.人数))
              })
            }
          }
        })
      },




      /*
        request1
      */
      // 人员车辆   特殊工种(各类人员统计)
      getcountbyworktype() {
        getcountbyworktype().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              // 无数据
            }
          }
        })
      },
      // 人员车辆   区域人数统计
      getareaperson() {
        getareaperson().then(data => {
          if (data && data.success) {
            this.areaxValue = []
            this.areayValue = []
            if (data.data.length) {
              data.data.forEach(item => {
                this.areaxValue.push(item.updatetime)
                this.areayValue.push(parseInt(item.curinregionnum))
              })
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .part {
    height: 49%;
    width: 100%;
    margin: 0.25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rightLeft {
    width: 65%;
    height: 100%;
  }

  .rightRight {
    width: 34%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .names {
    width: 70%;
    height: 50%;
    background-color: #242b42;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
    overflow-y: scroll;
  }

  .title {
    margin-top: 15%;
    font-size: .067708rem
      /* 13/192 */
    ;
  }

  .num {
    margin: .052083rem
      /* 10/192 */
    ;
    line-height: .208333rem
      /* 40/192 */
    ;
    height: .208333rem
      /* 40/192 */
    ;
    font-weight: 600;
    padding: 0 .15625rem
      /* 30/192 */
    ;
    background: linear-gradient(360deg, #3E4C6A 0%, #2F3B53 100%);
    font-size: .072917rem;
  }

  .name {
    width: 33.33%;
    text-align: center;
    margin: .026042rem
      /* 5/192 */
      0;
    font-size: .067708rem
      /* 13/192 */
    ;
  }
</style>