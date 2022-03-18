<doc>
  配煤实时监测
</doc>
<template>
  <div class="box">
    <p class="title">配煤实时监测
      <span class="btn">进入皮带系统观测</span>
      <span class="btn" @click="scheme()">智能配煤方案</span>
    </p>
    <div class="content">
      <div class="item">
        <line-echart-two :lineData='lineData'></line-echart-two>
      </div>
      <div class="item" style="margin-top: .03125rem /* 6/192 */;">
        <line-echart-three :lineData1='lineData1' :bzx="bzx"></line-echart-three>
      </div>
    </div>
    <coal-blend-scheme ref="schemeModel"></coal-blend-scheme>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import lineEchartTwo from '@/views/page/mainCoalFlow/part/echarts/lineEchartTwo'
  import lineEchartThree from '@/views/page/mainCoalFlow/part/echarts/lineEchartThree'
  import coalBlendScheme from '@/views/page/mainCoalFlow/part/coalBlendScheme'
  import { outputByHour, heatingByHour, optimalHeating } from "@/api/coalBlend";
  export default {
    components: {
      lineEchartTwo,
      lineEchartThree,
      coalBlendScheme
    },
    data() {
      return {
        lineData: [],
        lineData1: [],
        bzx: 0,
      }
    },
    mounted() {
      this.getOutputByHour()  // 工作面煤量检测
      this.getHeatingByHour() // 上仓皮带煤质监测
      this.getBzx()
    },
    methods: {
      // 工作面煤量监测
      getOutputByHour() {
        outputByHour().then(response => {
          if (response && response.success) {
            this.lineData = this.dealWithData(response.data)
          }
        })
      },
      // 上仓皮带煤质监测
      getHeatingByHour() {
        heatingByHour().then(response => {
          if (response && response.success) {
            this.lineData1 = response.data
          }
        })
      },
      // 获取上仓标准线
      getBzx() {
        optimalHeating().then(res => {
          if (res.success && res.data && res.data.length > 0) {
            this.bzx = res.data[0].value
          }
        })
      },
      // 配煤方案
      scheme() {
        this.$refs.schemeModel.init()
      },
      // 数据分类
      dealWithData(data) {
        let c = [];
        let d = {};
        data.forEach(element => {
          if (!d[element.ext_4]) {
            c.push({
              item: element.ext_4,
              allData: [element]
            });
            d[element.ext_4] = element;
          } else {
            c.forEach(ele => {
              if (ele.item == element.ext_4) {
                ele.allData.push(element);
              }
            });
          }
        });
        return c;
      }
    },
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
    font-size: .072917rem
      /* 14/192 */
    ;
    line-height: .072917rem
      /* 14/192 */
    ;
    font-weight: 650;
    text-shadow: 0rem 0rem .052083rem
      /* 10/192 */
      #00FFFF;
    padding-left: .052083rem
      /* 10/192 */
    ;
  }

  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .item {
    margin-top: .015625rem
      /* 3/192 */
    ;
    height: 50%;
  }

  .btn {
    font-weight: 100;
    color: #00C3FF;
    text-shadow: none;
    font-size: .041667rem
      /* 8/192 */
    ;
    margin-left: .052083rem
      /* 10/192 */
    ;
    float: right;
    cursor: pointer;
  }

  .btn:hover {
    color: #00ffff;
  }
</style>