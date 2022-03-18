<doc>
  月计划进尺、完成进尺、完成率
</doc>
<template>
  <div class="box">
    <p class="msg">日掘进进尺：<span class="num">{{value}}</span> 米</p>
    <bar-line :id="'yjhjc'" :xValue="xValue" :yValue1="yValue1" :yValue2="yValue2" :yValue3="yValue3" :nameObj="nameObj"></bar-line>
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
          name_1: '计划进尺',
          name_2: '完成进尺'
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
          this.yValue1.push(item['计划进尺'])
          this.yValue2.push(item['完成进尺'])
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