<doc>
  10m 大屏 左下
</doc>
<template>
  <div class="box">
    <p class="title">煤质分析</p>
    <div class="content">
      <!-- <div class="search">
        <span>日期</span> 
        <el-date-picker size="mini" style="width: 20%;margin: 0 10px;" v-model="value1" type="date" placeholder="选择日期">
        </el-date-picker>
        <span>班次</span>
        <el-select v-model="value" style="width: 20%;margin: 0 10px;" size="mini" placeholder="请选择">
          <el-option label="零点班" value="零点班"></el-option>
        </el-select>
        <span>报告人：</span>
        <span>宋新</span>
      </div> -->
      <div class="list-data">
        <div>
          <p class="header" style="width: 15.5%;">品种</p>
          <p class="header">灰分</p>
          <p class="header">全水分</p>
          <p class="header" style="width: 18%;">挥发分</p>
          <p class="header">全硫</p>
          <p class="header">发热量</p>
        </div>
        <div>
          <p class="header" style="width: 15.5%;">名称</p>
          <p class="header">(Aad)%</p>
          <p class="header">(Mt)%</p>
          <p class="header" style="width: 18%;">(Vad)%</p>
          <p class="header">(St)%</p>
          <p class="header">(cal/g)</p>
        </div>
        <!-- <vue-seamless-scroll style="height: calc(100% - .15625rem);overflow: hidden;" :class-option="classOption" -->
        <div style="height: calc(100% - .208333rem);overflow-y: auto;" :class-option="classOption"
          :data="listData" ref="seamlessScroll">
          <ul>
            <li v-for="(value, key) in listData" :key="key">
              <p class="con">{{value.coal}}</p>
              <p class="con">{{Number(value.aad).toFixed(2)}}</p>
              <p class="con">{{Number(value.mt).toFixed(2)}}</p>
              <p class="con">{{Number(value.vad).toFixed(2)}}</p>
              <p class="con">{{Number(value.std).toFixed(2)}}</p>
              <p class="con">{{Number(value.qnet).toFixed(2)}}</p>
            </li>
          </ul>
        </div>
        <!-- </vue-seamless-scroll> -->
      </div>
    </div>
  </div>
</template>
<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'
  // import { getcoalqualityanalysis } from '@/api/bigView'
  import { coalMassAnalysis } from '@/api/bigView2'
  export default {
    components: {
      vueSeamlessScroll
    },
    data() {
      return {
        classOption: {
          step: 0.5
        },
        // value: '',
        // value1: '',
        listData: [],
      }
    },
    mounted() {
      // this.getcoalqualityanalysis() //媒质分析
      this.coalMassAnalysis()  // 煤质分析-王坡
    },
    methods: {
      // request1
      // getcoalqualityanalysis() {
      //   getcoalqualityanalysis().then(data => {
      //     if(data && data.success) {
      //       if(data.data.length) {
      //         this.listData = data.data[0]
      //         // for(let i in data.data[0]) {
      //         //   data.data[0][i]['品种'] = i
      //         // }
      //         // console.log(data.data[0])


      //         // let keyList = Object.keys(data.data[0])
      //         // let valueList = Object.values(data.data[0])
      //         // valueList.forEach((item,index) => {
      //         //   item['品种'] = keyList[index]
      //         // })
      //         // this.listData = valueList
      //       }
      //     }
      //   })
      // }


      // request2

      coalMassAnalysis() {
        coalMassAnalysis().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.listData = data.data
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
  }
  .title {
    font-size: .083333rem /* 16/192 */;
    color: #00FFFF;
    text-align: center;
    height: .15625rem /* 30/192 */;
    line-height: .15625rem /* 30/192 */;
    font-weight: 650;
    /* text-shadow: 0rem 0rem .052083rem #00FFFF; */
    background: url("../../../../../assets/img/bigView/title-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .content {
    width: 100%;
    height: calc(100% - .15625rem);
  }
  .search {
    width: 100%;
    height: .208333rem /* 40/192 */;
    text-align: center;
    font-size: .078125rem /* 15/192 */;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .010417rem /* 2/192 */;
  }

  /deep/.el-input__inner {
    background-color: #000623;
    color: #fff;
  }

  .list-data {
    width: 96%;
    margin-left: 3%;
    /* height: calc(100% - .208333rem); */
    height: 99%;
    /* margin-top: .026042rem; */
    background-color: rgba(0, 184, 255, 0.1);
  }

  .header {
    display: inline-block;
    width: 16.6%;
    text-align: center;
    font-size: .072917rem;
    line-height: .104167rem /* 20/192 */;
    background-color: rgba(0, 184, 255, 0.3);
  }

  .con {
    display: inline-block;
    width: 16.6%;
    text-align: center;
    font-size: .072917rem;
    background-color: rgba(0, 184, 255, 0.1);
    line-height: .104167rem /* 20/192 */;
    border-bottom: .015625rem /* 1/192 */ solid #07476c;
    margin-bottom: .015625rem;
  }
</style>