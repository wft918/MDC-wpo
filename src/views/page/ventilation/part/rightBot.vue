<template>
  <div style="width: 100%;height: 100%;">
    <!-- <div style="width: 100%;height: .208333rem /* 40/192 */;">
      <div style="width: 100%;height: 50%;">
        <span style="color: #1890ff;font-size: .067708rem /* 13/192 */;float: right;">234</span>
        <span style="color: #fff;font-size:  .067708rem;float: right;">井下总人数</span>
        <span style="color: #1890ff;font-size:  .067708rem;float: right;">100</span>
        <span style="color: #fff;font-size:  .067708rem;float: right;">当班入井总人数</span>
      </div>
      <div style="width: 100%;height: 50%;">
        <span style="color: #1890ff;font-size:  .067708rem;float: right;">{{leaderObj.name_4}}</span>
        <span style="color: #fff;font-size:  .067708rem;float: right;">四点班</span>
        <span style="color: #1890ff;font-size:  .067708rem;float: right;margin-right: .026042rem /* 5/192 */;">{{leaderObj.name_8}}</span>
        <span style="color: #fff;font-size:  .067708rem;float: right;">八点班</span>
        <span style="color: #1890ff;font-size:  .067708rem;float: right;margin-right: .026042rem">{{leaderObj.name_0}}</span>
        <span style="color: #fff;font-size:  .067708rem;float: right;">零点班</span>
        <span style="color: #fff;font-size:  .067708rem;float: right;margin-right: .026042rem">带班领导</span>
      </div>
    </div> -->
    <!-- <div style="width: 100%;height:.026042rem;background-color: #000723;"></div> -->
    <!-- <div style="width: 100%;height: 100%;"> -->
    <div style="width: 100%;height: .182292rem /* 35/192 */;line-height: .182292re;padding-left: .052083rem /* 10/192 */;box-sizing: border-box;font-size: .078125rem /* 15/192 */;color: #00C5FF;font-weight: 600;">
      <span style="display: inline-block;height: .182292rem /* 35/192 */;line-height: .182292rem /* 35/192 */;">通风机、抽放泵启停状态</span>
    </div>
    <div style="width: 100%;height: calc(100% - .182292rem);padding: .104167rem;box-sizing: border-box;display: flex;justify-content: space-between;overflow: auto;">
      <div class="rtl">
        <div v-for="(item,index) in ventilatorList" :key="item.label_top">
          <div style="border-bottom: .005208rem solid #0f5b99;box-sizing: border-box;display: flex;flex-direction: column;justify-content: space-around;">
            <div style="width: 100%;color: #e3e5e8;font-size: .0625rem;">{{item.label_top}}</div>
            <div style="width: 100%;">
              <span style="color: #8c92a0;font-size: .0625rem /* 14/192 */;font-weight: 600;">累计运行时间</span>
              <span style="color: #0686d6;font-size: .0625rem;font-weight: 600;margin-left: .026042rem /* 5/192 */;">{{item.date_top}}小时</span>
              <span style="float: right;font-weight: 700;font-size: .072917rem;" :style="{color: item.status_top == 0?'#97a9c1':'#04cf68'}">{{item.status_top | statusFilte}}</span>
            </div>
          </div>
          <div style="box-sizing: border-box;display: flex;flex-direction: column;justify-content: space-around;">
            <div style="width: 100%;color: #e3e5e8;font-size: .0625rem;">{{item.label_bot}}</div>
            <div style="width: 100%;">
              <span style="color: #8c92a0;font-size: .0625rem;font-weight: 600;">累计运行时间</span>
              <span style="color: #0686d6;font-size: .0625rem;font-weight: 600;margin-left: .026042rem /* 5/192 */;">{{item.date_bot}}小时</span>
              <span style="float: right;font-weight: 700;font-size: .072917rem;" :style="{color: item.status_bot == 0?'#97a9c1':'#04cf68'}">{{item.status_bot | statusFilte}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rtr">
        <div v-for="(item,index) in drainagePumpList" :key="item.label" style="padding: 0 .052083rem /* 10/192 */;box-sizing: border-box;display: flex;flex-direction: column;justify-content: space-around;">
          <div style="width: 100%;color: #e3e5e8;font-size: .067708rem;">{{item.label}}</div>
          <div style="width: 100%;">
            <span style="color: #8c92a0;font-size: .072917rem;font-weight: 600;">累计运行时间</span>
            <span style="color: #0686d6;font-size: .072917rem;font-weight: 600;margin-left: .026042rem /* 5/192 */;">{{item.date}}小时</span>
            <span style="float: right;font-weight: 700;font-size: .072917rem;" :style="{color: item.status == 0?'#97a9c1':'#04cf68'}">{{item.status | statusFilte}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  // import { getleader } from '@/api/bigView2'
  import { getTongfengjiStatus,getTongfengjiLastStausTime,getChoufangbengStaus,getChoufangbengLastStatusTime } from '@/api/ventilation'
  export default {
    data() {
      return {
        leaderObj: {
          name_0:'--',
          name_4:'--',
          name_8:'--'
        },
        ventilatorList: [
          {
            label_top:'上寺头回风井主通风机1号',
            date_top:'--',
            status_top:2,
            label_bot:'上寺头回风井主通风机2号',
            date_bot:'--',
            status_bot:2
          },
          {
            label_top:'塔里回风井主通风机1号',
            date_top:'--',
            status_top:2,
            label_bot:'塔里回风井主通风机2号',
            date_bot:'--',
            status_bot:2
          },
          {
            label_top:'3303运输顺槽掘进工作面局部通风机1号',
            date_top:'--',
            status_top:2,
            label_bot:'3303运输顺槽掘进工作面局部通风机2号',
            date_bot:'--',
            status_bot:2
          }
        ],
        drainagePumpList: [
          {
            label:'抽风泵1号',
            date:'--',
            status:2
          },
          {
            label:'抽风泵2号',
            date:'--',
            status:2
          },
          {
            label:'抽风泵3号',
            date:'--',
            status:2
          },
          {
            label:'抽风泵4号',
            date:'--',
            status:2
          }
        ]
      }
    },
    mounted() {
      // this.getleader() //领导带班  request2
      this.getTongfengjiStatus()
      this.getTongfengjiLastStausTime()
      this.getChoufangbengStaus()
      this.getChoufangbengLastStatusTime()
    },
    filters: {
      statusFilte(status) {
        const map = {
          0:'停止',
          1:'开启',
          2:'未知'
        }
        return map[status]
      }
    },
    methods: {
      // 每个通风机实时启停状态
      getTongfengjiStatus() {
        getTongfengjiStatus().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              data.data.forEach(item => {
                if(item.equipname == '上寺头回风井主通风机1号') {
                  this.$set(this.ventilatorList[0],'status_top',item.status)
                }else if(item.equipname == '上寺头回风井主通风机2号') {
                  this.$set(this.ventilatorList[0],'status_bot',item.status)
                }else if(item.equipname == '塔里回风井主通风机1号') {
                  this.$set(this.ventilatorList[1],'status_top',item.status)
                }else if(item.equipname == '塔里回风井主通风机2号') {
                  this.$set(this.ventilatorList[1],'status_bot',item.status)
                }else if(item.equipname == '3303运输顺槽掘进工作面局部通风机1号') {
                  this.$set(this.ventilatorList[2],'status_top',item.status)
                }else if(item.equipname == '3303运输顺槽掘进工作面局部通风机2号') {
                  this.$set(this.ventilatorList[2],'status_bot',item.status)
                }
              })
            }
          }
        })
      },
      //每个通风机当前状态持续时间
      getTongfengjiLastStausTime() {
        getTongfengjiLastStausTime().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              data.data.forEach(item => {
                if(item.device == '上寺头回风井主通风机1号') {
                  this.$set(this.ventilatorList[0],'date_top',item.time)
                }else if(item.device == '上寺头回风井主通风机2号') {
                  this.$set(this.ventilatorList[0],'date_bot',item.time)
                }else if(item.device == '塔里回风井主通风机1号') {
                  this.$set(this.ventilatorList[1],'date_top',item.time)
                }else if(item.device == '塔里回风井主通风机2号') {
                  this.$set(this.ventilatorList[1],'date_bot',item.time)
                }else if(item.device == '3303运输顺槽掘进工作面局部通风机1号') {
                  this.$set(this.ventilatorList[2],'date_top',item.time)
                }else if(item.device == '3303运输顺槽掘进工作面局部通风机2号') {
                  this.$set(this.ventilatorList[2],'date_bot',item.time)
                }
              })
            }
          }
        })
      },
      // 每个抽放泵实时启停状态
      getChoufangbengStaus() {
        getChoufangbengStaus().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              data.data.forEach(item => {
                if(item.equipname == '抽放泵1号') {
                  this.$set(this.drainagePumpList[0],'status',item.status)
                }else if(item.equipname == '抽放泵2号') {
                  this.$set(this.drainagePumpList[1],'status',item.status)
                }else if(item.equipname == '抽放泵3号') {
                  this.$set(this.drainagePumpList[2],'status',item.status)
                }else if(item.equipname == '抽放泵4号') {
                  this.$set(this.drainagePumpList[3],'status',item.status)
                }
              })
            }
          }
        })
      },
      // 每个抽放泵当前状态持续时间
      getChoufangbengLastStatusTime() {
        getChoufangbengLastStatusTime().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              data.data.forEach(item => {
                if(item.device == '抽放泵1号') {
                  this.$set(this.drainagePumpList[0],'date',item.time)
                }else if(item.device == '抽放泵2号') {
                  this.$set(this.drainagePumpList[1],'date',item.time)
                }else if(item.device == '抽放泵3号') {
                  this.$set(this.drainagePumpList[2],'date',item.time)
                }else if(item.device == '抽放泵4号') {
                  this.$set(this.drainagePumpList[3],'date',item.time)
                }
              })
            }
          }
        })
      }




      // getleader() {
      //   getleader().then(data => {
      //     if(data && data.success) {
      //       if(data.data.length) {
      //         this.leaderObj.name_0 = data.data[0]['零点班']
      //         this.leaderObj.name_4 = data.data[0]['四点班']
      //         this.leaderObj.name_8 = data.data[0]['八点班']
      //       }
      //     }
      //   })
      // }
    },
  }
</script>
<style scoped>
  .rtl {
    width: 49%;
    height: 100%;
  }
  .rtl > div {
    width: 100%;
    height: 32%;
    border: .005208rem /* 1/192 */ solid #079ed0;
    box-sizing: border-box;
    border-radius: .052083rem /* 10/192 */;
    margin-bottom: .052083rem /* 10/192 */;
  }
  .rtl > div > div {
    width: 96%;
    height: 50%;
    margin: 0 auto;
  }
  .rtr {
    width: 49%;
    height: 100%;
  }
  .rtr > div {
    width: 100%;
    height: 20%;
    border: .005208rem /* 1/192 */ solid #079ed0;
    box-sizing: border-box;
    border-radius: .052083rem /* 10/192 */;
    margin-bottom: .026042rem /* 5/192 */;
  }
</style>