<doc>
  月计划产量、完成产量、完成率 
</doc>
<template>
  <div class="box">
    <p class="msg">日产量：<span class="num">{{value}}</span> 吨</p>
    <bar-line :id="'yjhcl'" :xValue="xValue" :yValue1="yValue1" :yValue2="yValue2" :yValue3="yValue3" :nameObj="nameObj"></bar-line>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import barLine from '@/views/page/dispatch/model/barLine'
  export default {
    data() {
      return {
        xValue:[],
        yValue1:[],
        yValue2:[],
        yValue3:[],
        nameObj: {
          name_1: '计划产量',
          name_2: '完成量'
        }
      }
    },
    components: {
      barLine
    },
    props:['data','value'],
    watch: {
      data(newVal) {
        this.xValue = []
        this.yValue1 = []
        this.yValue2 = []
        this.yValue3 = []
        newVal.forEach(item => {
          this.xValue.push(item['x轴'])
          this.yValue1.push(item['计划产量'])
          this.yValue2.push(item['完成量'])
          this.yValue3.push(item['完成率'])
        })
      }
    }
  }
</script>
<style scoped>
  .box {
    height: 100%;
    position: relative;
  }
  .msg {
    position: absolute;
    top: .0625rem /* 12/192 */;
    right: .104167rem /* 20/192 */;
    font-size: .072917rem /* 14/192 */;
  }
  .num {
    color: #1890ff;
    font-weight: 600;
  }
</style>