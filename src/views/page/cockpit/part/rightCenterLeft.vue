<doc>
  本月风险类别评估
</doc>
<template>
  <div class="box">
    <p class="title">矿井风险管控类别评估</p>
    <radar-echarts></radar-echarts>
  </div>
</template>
<script>
  import "../../../../utils/flexible.js";
  import radarEcharts from '@/views/page/cockpit/part/echarts/radarEcharts'

  export default {
    components: {
      radarEcharts,
    }
  }
</script>
<style scoped>
  .box {
    width: 100%;
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
    padding-left:  .052083rem /* 10/192 */;
  }
  
</style>