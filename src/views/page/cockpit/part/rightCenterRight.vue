<doc>
  风险实时监测
</doc>
<template>
  <div class="box">
    <p class="title">近30天风险检查清单</p>
    <div style="width: 100%;height: .208333rem;color: #fff;line-height: .208333rem;background: rgba(0, 184, 255, 0.3);display: flex;margin-top: .026042rem;font-size: .0677rem;">
      <div style="width: 44%;height: 100%;padding-left: .015625rem;box-sizing: border-box;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">地点/检查时间</div>
      <!-- <div style="width: 25%;height: 100%;padding-left: .067708rem;box-sizing: border-box;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">告警类型</div> -->
      <div style="width: 28%;height: 100%;padding-left: .067708rem;box-sizing: border-box;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">风险统计</div>
      <div style="width: 28%;height: 100%;padding-left: .1042rem;box-sizing: border-box;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">状态</div>
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
            <div class="e">
              <p style="text-align: center;" class="title2" v-text="item.riskgrade" v-bind:class="['title2',item.riskgrade=='重大风险'?'icon':(item.riskgrade=='较大风险'?'icon1':(item.riskgrade=='一般风险'?'icon2':'icon3'))]"></p>
            </div>
            <div class="e">
              <p class="title1" style="text-align: center">合格</p>
            </div>
          </div>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>
<script>
  import "../../../../utils/flexible.js";
  import vueSeamlessScroll from 'vue-seamless-scroll'
  import { risktypescore, riskinfo } from "@/api/screenInterface";
  import { riskInfo } from '@/api/bigView2'
  export default {
    components: {
      vueSeamlessScroll
    },
    data() {
      return {
        classOption: {
          step: 0.5
        },
        listData: [
        //   {
        //   risk_area: '1号矿井皮带巷',
        //   risk_time: '2017-12-16 18:23:23',
        //   risk_type: '火灾告警',
        //   risk_level: '一级'
        // }, {
        //   risk_area: '1号矿井皮带巷',
        //   risk_time: '2017-12-16 18:23:23',
        //   risk_type: '火灾告警',
        //   risk_level: '二级'
        // }, {
        //   risk_area: '1号矿井皮带巷',
        //   risk_time: '2017-12-16 18:23:23',
        //   risk_type: '火灾告警',
        //   risk_level: '三级'
        // }, {
        //   risk_area: '1号矿井皮带巷',
        //   risk_time: '2017-12-16 18:23:23',
        //   risk_type: '火灾告警',
        //   risk_level: '四级'
        // }, {
        //   risk_area: '1号矿井皮带巷',
        //   risk_time: '2017-12-16 18:23:23',
        //   risk_type: '火灾告警',
        //   risk_level: '二级'
        // }, {
        //   risk_area: '1号矿井皮带巷',
        //   risk_time: '2017-12-16 18:23:23',
        //   risk_type: '火灾告警',
        //   risk_level: '一级'
        // }, {
        //   risk_area: '1号矿井皮带巷',
        //   risk_time: '2017-12-16 18:23:23',
        //   risk_type: '火灾告警',
        //   risk_level: '三级'
        // }, {
        //   risk_area: '1号矿井皮带巷',
        //   risk_time: '2017-12-16 18:23:23',
        //   risk_type: '火灾告警',
        //   risk_level: '四级'
        // }
        ],
      }
    },
    mounted(){
      // this.riskSupervise11()
      this.riskInfo()
    },

    methods:{

      // request2
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
      riskSupervise11(){ 

        riskinfo().then(res => {
           // console.log('风险实时监测 -------> ', res)
            if (res && res.success) {
                 this.listData=res.data
                 // 数据太少 不滚动的原因  想要滚动把下面注释打开

                //  this.listData.push({
                //       risk_area: '1号矿井皮带巷',
                //       risk_time: '2017-12-16 18:23:23',
                //       risk_type: '火灾告警',
                //       risk_level: '三级'
                //     }, {
                //       risk_area: '1号矿井皮带巷',
                //       risk_time: '2017-12-16 18:23:23',
                //       risk_type: '火灾告警',
                //       risk_level: '四级'
                //     })
            }else{
               this.listData=[]
            }
        })

      }
    }



  }
</script>
<style scoped>
  .box {
    height: 100%;
    display: flex;
    flex-direction: column
  }

  .title {
    color: #00FFFF;
    font-size: .072917rem /* 14/192 */;
    line-height: .072917rem /* 14/192 */;
    font-weight: 650;
    text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;
    padding-left: .052083rem /* 10/192 */;
  }

  .content {
    margin-top: .052083rem /* 10/192 */;
    height: 100%;
  }

  .warp {
    height: 100%;
    width: 95%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: .052083rem /* 10/192 */;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;

      li,
      a {
        display: block;
        height: .15625rem /* 30/192 */;
        line-height: .15625rem /* 30/192 */;
        display: flex;
        justify-content: space-between;
        font-size: .078125rem /* 15/192 */;
      }
    }
  }

  .w {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .026042rem /* 5/192 */ 0;
    border-bottom: .005208rem /* 1/192 */ solid #07476c;
    cursor: pointer;
  }

  .q {
    width: 44%;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: .0625rem;
  }

  .e {
    display: inline-block;
    width: 28%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: .0625rem;
  }

  .title1 {
    color: #fff;
    font-size: .0625rem /* 8/192 */;
  }
 
  .date {
    font-size: .0625rem /* 8/192 */;
    color: #74899e
  }
  
  .title2 {
    color: red;
    font-size: .0625rem /* 8/192 */;
  }
  .icon{
     color: red;
  }
  .icon1{
     color: #FF6704;
  }
  .icon2{
     color: #FFCA00;
  }
  .icon3{
     color: #0086E7;
  }
</style>