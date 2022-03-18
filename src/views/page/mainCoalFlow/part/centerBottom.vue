<doc>
  工作面煤量
</doc>
<template>
  <div class="box">
    <p class="title">工作面煤量</p>
    <bar-and-line :outputByDayData='outputByDayData'></bar-and-line>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import barAndLine from '@/views/page/mainCoalFlow/part/echarts/barAndLine'
  import { outputByDay } from "@/api/coalBlend";
  export default {
    components: {
      barAndLine
    },
    data() {
      return {
        outputByDayData: [],
      }
    },
    mounted() {
      this.getOutputByDay() // 工作面煤量统计
    },
    methods: {
      // 工作面煤量统计
      getOutputByDay() {
        outputByDay().then(response => {
          if (response && response.success) {
            if(response.data.length) {
              this.outputByDayData = this.dealWithDataForOutputByDay(response.data)
            }
          }
        })
      },
      // 工作面煤量统计数据分类
      dealWithDataForOutputByDay(data) {
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
      },
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
    font-size: .072917rem /* 14/192 */;
    line-height: .072917rem /* 14/192 */;
    font-weight: 650;
    text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;
    padding-left: .052083rem /* 10/192 */;
  }
</style>