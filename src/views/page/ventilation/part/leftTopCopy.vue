<doc>
  瓦斯预警实时监控
</doc>
<template>
  <div class="box">
    <div class="top">
      <div class="item">
        <p class="num">21</p>
        <p class="title">风险总数</p>
      </div>
      <div class="item">
        <p class="num red">0</p>
        <p class="title red">重大风险</p>
      </div>
      <div class="item">
        <p class="num orange">2</p>
        <p class="title orange">较大风险</p>
      </div>
      <div class="item">
        <p class="num yellow">6</p>
        <p class="title yellow">一般风险</p>
      </div>
      <div class="item">
        <p class="num blue">13</p>
        <p class="title blue">低风险</p>
      </div>
    </div>
    <div class="bottom">
      <bar-left-top></bar-left-top>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import barLeftTop from '@/views/page/ventilation/echart/barLeftTop'
  export default {
    components: {
      barLeftTop,
    }
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .top {
    width: 100%;
    height: 23%;
    margin-top: 5%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .bottom {
    width: 100%;
    height: 60%;
    margin-top: 1%;
  }

  .item {
    width: 17%;
    height: 90%;
    background: rgba(0, 93, 165, 0.2);
    border: .005208rem /* 1/192 */ solid #00629C;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .num {
    font-size: .15625rem /* 30/192 */;
    font-family: "ysbth";
  }

  .title {
    margin-top: 4%;
    font-size: .072917rem /* 14/192 */
  }

  .red {
    color: #ff0045;
  }

  .orange {
    color: #fc7c01;
  }

  .yellow {
    color: #facc14;
  }

  .blue {
    color: #009bff;
  }
</style>