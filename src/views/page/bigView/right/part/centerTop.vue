<doc>
  10m 大屏 右侧中间上部分
</doc>
<template>
  <div class="box">
    <div class="part">
      <p class="title">矿井风险管控类别评估</p>
      <div class="content">
        <div style="height: 100%;width: 100%;">
          <radar-echarts :radarData="radarData"></radar-echarts>
        </div>
      </div>
    </div>
    <div class="part">
      <p class="title">近30天风险检查清单</p>
      <div class="content">
        <div
          style="width: 100%;height: .15625rem /* 30/192 */;color: #fff;line-height: .15625rem /* 30/192 */;background: rgba(0, 184, 255, 0.3);display: flex;font-size: .0625rem;">
          <div style="width: 40%;height: 100%;padding-left: .026042rem;box-sizing: border-box;">地点/检查时间</div>
          <!-- <div style="width: 30%;height: 100%;padding-left: .078125rem;box-sizing: border-box;">告警类型</div> -->
          <div style="width: 33%;height: 100%;padding-left: .0521rem;box-sizing: border-box;text-align: center;">风险等级</div>
          <div style="width: 27%;height: 100%;padding-left: .026rem;box-sizing: border-box;text-align: center;">状态</div>
        </div>
        <vue-seamless-scroll :data="listData" class="warp" :class-option="classOption">
          <ul class="item">
            <li v-for="(item, index) in listData" :key="index">
              <div class="w">
                <div class="q">
                  <p class="title1" v-text="item.areaname"></p>
                  <p class="date" v-text="item.stat_time"></p>
                </div>
                <!-- <div class="e">
                  <p class="title1" v-text="item.risktype"></p>
                </div> -->
                <div class="e" style="width: 33%;">
                  <p class="title2" v-text="item.riskgrade"
                    v-bind:class="['title2',item.riskgrade=='重大风险'?'icon':(item.riskgrade=='较大风险'?'icon1':(item.riskgrade=='一般风险'?'icon2':'icon3'))]">
                  </p>
                </div>
                <div class="e" style="width: 27%;">
                  <!-- <p class="title1" v-text="item.risktype"></p> -->
                  <p class="title1" style="text-align: center;">合格</p>
                </div>
              </div>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>
<script>
  import radarEcharts from '@/views/page/bigView/right/echarts/radarEcharts'
  import vueSeamlessScroll from 'vue-seamless-scroll'
  // import { risktypescore, riskinfo } from "@/api/screenInterface";
  import { riskByType, riskInfo } from '@/api/bigView2'
  export default {
    components: {
      radarEcharts,
      vueSeamlessScroll
    },
    data() {
      return {
        classOption: {
          step: 0.5
        },
        listData: [],
        radarData: []
      }
    },
    mounted() {
      // this.riskSupervise()
      // this.getRisktypescore()
      this.riskByType()
      this.riskInfo()
    },
    methods: {

      // request2
      riskByType() {
        riskByType().then(data => {
          if (data && data.success) {
            if (data.data.length > 0) {
              this.radarData = data.data
            }
          }
        })
      },
      riskInfo() {
        riskInfo().then(data => {
          if (data && data.success) {
            if (data.data.length > 0) {
              this.listData = data.data
            }
          }
        })
      },




      // request1
      getRisktypescore() {
        risktypescore().then(res => {
          if (res && res.success) {
            this.radarData = res.data
          } else {
            this.monthAray = []
          }
        })
      },
      riskSupervise() {
        riskinfo().then(res => {
          if (res && res.success) {
            this.listData = res.data
          } else {
            this.listData = []
          }
        })
      }
    }
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    /* justify-content: center;
    align-items: center; */
  }

  .part {
    width: 50%;
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
    /* display: flex;
    justify-content: space-around;
    align-items: center; */
  }

  .warp {
    height: calc(100% - .208333rem);
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: .052083rem
      /* 10/192 */
    ;

    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;

      li,
      a {
        display: block;
        height: .15625rem
          /* 30/192 */
        ;
        line-height: .15625rem
          /* 30/192 */
        ;
        display: flex;
        justify-content: space-between;
        font-size: .078125rem
          /* 15/192 */
        ;
      }
    }
  }

  .w {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .026042rem
      /* 5/192 */
      0;
    border-bottom: .005208rem
      /* 1/192 */
      solid #07476c;
    cursor: pointer;
  }

  .q {
    width: 46%;
    display: inline-block;
    /* text-align: center; */
  }

  .e {
    display: inline-block;
    width: 27%;
    text-align: center;
  }

  .title1 {
    color: #fff;
    font-size: .0625rem
      /* 8/192 */
    ;
  }

  .date {
    font-size: .0625rem;
    color: #74899e
  }

  .title2 {
    color: red;
    font-size: .0625rem;
  }

  .icon {
    color: red;
  }

  .icon1 {
    color: #FF6704;
  }

  .icon2 {
    color: #FFCA00;
  }

  .icon3 {
    color: #0086E7;
  }
</style>