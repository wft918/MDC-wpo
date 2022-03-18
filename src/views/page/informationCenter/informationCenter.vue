<doc>
  信息中心
</doc>
<template>
  <div class="box">
    <div class="part part-left">
      <div class="left">
        <p class="title">安全监测</p>
        <left-top></left-top>
      </div>
      <div class="left">
        <p class="title">工业视频</p>
        <left-bottom></left-bottom>
      </div>
    </div>
    <div class="part">
      <div class="part-right">
        <p class="title">人员车辆</p>
        <!-- <div style="margin-right: .052083rem /* 10/192 */;position: absolute;right: .052083rem /* 10/192 */;top: .026042rem /* 5/192 */;">
          <p class="msg">当班入井总人数 <span class="blue">{{num2}}</span> &nbsp;&nbsp; 井下总人数 <span class="blue">{{num1}}</span></p>
          <p class="msg">带班领导 &nbsp;&nbsp; 零点班 <span class="blue">{{leaderObj.name_0}}</span> &nbsp;&nbsp; 八点班 <span
              class="blue">{{leaderObj.name_8}}</span>
            &nbsp;&nbsp; 四点班 <span class="blue">{{leaderObj.name_4}}</span></p>
        </div> -->
        <right></right>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../utils/flexible.js'
  import leftTop from '@/views/page/informationCenter/part/leftTop'
  import right from '@/views/page/informationCenter/part/right'
  import leftBottom from '@/views/page/informationCenter/part/leftBottom'
  import {gettotalperson} from '@/api/informationCenter'
  import { getleader } from '@/api/productionDepartment2'
  import { downPerShift } from '@/api/bigView2'
  import { totalPerson, leader } from '@/api/informationCenter2'
  export default {
    data() {
      return {
        leaderObj: {
          name_0:'--',
          name_4:'--',
          name_8:'--',
        },
        num1: '--',
        num2: '--',
      }
    },
    mounted() {
      // this.gettotalperson()
      // this.getleader()
      this.totalPerson()
      this.leader()
      this.downPerShift()
    },
    methods: {
      // request2
      // 井下总人数
      totalPerson() {
        totalPerson().then(data => {
          if (data && data.success && data.data.length) {
            this.num1 = data.data[0].curinnum
          }
        })
      },

      leader() {
        leader().then(data => {
          if (data && data.success && data.data.length) {
            this.leaderObj.name_0 = data.data[0]['零点班']
            this.leaderObj.name_4 = data.data[0]['四点班']
            this.leaderObj.name_8 = data.data[0]['八点班']
          }
        })
      },

      // 当班入井总人数
      downPerShift() {
        downPerShift().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.num2 = data.data[0].c
            }
          }
        })
      },



      // request1
      //入井总人数
      gettotalperson() {
        gettotalperson().then(data => {
          if(data && data.success) {
            if(data.data.length) {

            }
          }
        })
      },
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
      }
    },
    components: {
      leftTop,
      right,
      leftBottom
    }
  }
</script>
<style scoped>
  .box {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .part {
    margin: 0 0.5%;
    width: 49%;
    height: 97%;
  }

  .left {
    width: 100%;
    height: 49%;
    background-color: #1c233a;
    position: relative;
  }

  .part-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .part-right {
    width: 100%;
    height: 100%;
    background-color: #1c233a;
    position: relative;
  }

  .title {
    color: #03b5eb;
    font-size: .078125rem /* 15/192 */;
    font-weight: 600;
    position: absolute;
    top: .052083rem /* 10/192 */;
    left: .078125rem /* 15/192 */;
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
</style>