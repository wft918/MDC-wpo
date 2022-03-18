<doc>
  产量分析
</doc>
<template>
  <div class="box">
    <p class="title">煤质分析</p>
    <!-- <p class="search">
      日期
      <el-date-picker size="mini" v-model="value1" style="width: .677083rem /* 130/192 */;" type="date" placeholder="选择日期">
      </el-date-picker>
      &nbsp;&nbsp;
      班次
      <el-select size="mini" style="width: .625rem /* 120/192 */;" v-model="value" placeholder="请选择">
        <el-option label="零班次" value="零班次"></el-option>
      </el-select>
      &nbsp;&nbsp;报告人：宋新
    </p> -->
    <div class="top">
      <div> 
        <p class="header">品种</p>
        <p class="header">灰分(Aad)%</p>
        <p class="header">全水分(Mt)%</p>
        <p class="header">挥发分(Vad)%</p>
        <p class="header">全硫(St)%</p>
        <p class="header">发热量(cal/g)</p>
      </div>
      <!-- <vue-seamless-scroll style="height: .677083rem /* 130/192 */;overflow: hidden;"  :class-option="classOption" :data="listData" ref="seamlessScroll"> -->
      <div style="height: .677083rem /* 130/192 */;overflow-y: auto;"  :class-option="classOption" :data="listData" ref="seamlessScroll">
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
</template>
<script>
  import "../../../../utils/flexible.js";
  import barEcharts from '@/views/page/cockpit/part/echarts/barEcharts'
  import { getcoalqualityanalysis } from '@/api/bigView'
  import { coalMassAnalysis } from '@/api/bigView2'
  import vueSeamlessScroll from 'vue-seamless-scroll'
  export default {
    components: {
      barEcharts,
      vueSeamlessScroll
    },
    data() {
      return {
        classOption: {
          step: 0.5
        },
        listData: {},
      }
    },
    mounted() {
      // this.getcoalqualityanalysis() //媒质分析
      this.coalMassAnalysis()  // 煤质分析-王坡
    },
    methods: {
      // request2
      coalMassAnalysis() {
        coalMassAnalysis().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.listData = data.data
            }
          }
        })
      },

      // request1
      //媒质分析
      getcoalqualityanalysis() {
        getcoalqualityanalysis().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.listData = data.data[0]
              // for(let i in data.data[0]) {
              //   data.data[0][i]['品种'] = i
              // }
              // console.log(data.data[0])


              // let keyList = Object.keys(data.data[0])
              // let valueList = Object.values(data.data[0])
              // valueList.forEach((item,index) => {
              //   item['品种'] = keyList[index]
              // })
              // this.listData = valueList
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
    flex-direction: column;
    position: relative;
    color: #fff;
  }

  .title {
    color: #00FFFF;
    font-size: .072917rem /* 14/192 */;
    line-height: .072917rem /* 14/192 */;
    font-weight: 650;
    text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;
    padding-left: .052083rem /* 10/192 */;
  }

  .search {
    position: absolute;
    top: 0;
    right: 0;
    font-size: .072917rem /* 14/192 */;
  }

  /deep/.el-input__inner {
    background-color: #000623;
    color: #fff;
  }

  .top {
    margin-top: .052083rem /* 20/192 */;
    color: #fff;
    font-size: .067708rem /* 13/192 */;
    height: 100%;
    position: relative;
  }

  .header {
    display: inline-block;
    width: 16.6%;
    text-align: center;
    line-height: .104167rem /* 20/192 */;
    background-color: #115481;
  }

  .con {
    display: inline-block;
    width: 16.6%;
    text-align: center;
    line-height: .104167rem /* 20/192 */;
    border-bottom: .005208rem /* 1/192 */ solid #07476c;
    margin-bottom: .026042rem;
  }

  .num {
    border: .015625rem /* 3/192 */ solid #00aad1;
    padding: 0rem .130208rem /* 25/192 */;
    color: #009bff;
    font-size: .104167rem /* 20/192 */;
    font-weight: 650;
    font-family: "ysbth";
  }

  ::-webkit-scrollbar {
    width: .015625rem /* 3/192 */;
    height: .015625rem /* 3/192 */;
  }

  /* 滚动条有滑块的轨道部分 */
  ::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: .026042rem /* 5/192 */;
  }

  /* 滚动条滑块(竖向:vertical 横向:horizontal) */
  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color: #f2f2f2;
    border-radius: .026042rem /* 5/192 */;
  }

  /* 滚动条滑块hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #999999;
  }

  /* 同时有垂直和水平滚动条时交汇的部分 */
  ::-webkit-scrollbar-corner {
    display: block;
    /* 修复交汇时出现的白块 */
  }
</style>