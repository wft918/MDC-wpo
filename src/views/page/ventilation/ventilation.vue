<doc>
  通风部1
</doc>
<template>
  <div class="box">
    <div class="part">
      <div class="contentTop">
        <p class="title">瓦斯涌出预警实时监控</p>
        <left-top></left-top>
      </div>
      <div class="contentBot">
        <p class="title">通风阻力实时监控</p>
        <left-bottom></left-bottom>
      </div>
    </div>
    <div class="part">
      <div class="contentTop">
        <p class="title">抽放打钻进尺统计</p>
        <center-top></center-top>
      </div>
      <div class="contentBot">
        <div style="width: 100%;height: .182292rem;line-height: .182292rem;color: #00C5FF;padding-left: .052083rem;box-sizing: border-box;font-size: .078125rem;font-weight: 600;">
          <p>通风机风量统计</p>
        </div>
        <div style="width: 100%;height: calc(100% - .182292rem);">
          <center-bot></center-bot>
        </div>
      </div>
    </div>
    <div class="part">
      <div class="contentTop">
        <p class="title">瓦斯抽采率</p>
        <right-top></right-top>
      </div>
      <div class="contentBot">
        <right-bot></right-bot>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../utils/flexible.js'
  import leftTop from '@/views/page/ventilation/part/leftTop'
  import leftBottom from '@/views/page/ventilation/part/leftBottom'
  import centerTop from '@/views/page/ventilation/part/centerTop'
  import centerBot from '@/views/page/ventilation/part/centerBot'
  import rightTop from '@/views/page/ventilation/part/rightTop'
  import rightBot from '@/views/page/ventilation/part/rightBot'
  export default {
    components: {
      leftTop,
      leftBottom,
      centerTop,
      centerBot,
      rightTop,
      rightBot
    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .part {
    width: 32.5%;
    height: 99%;
    margin: 0 0.25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .contentTop {
    width: 100%;
    height: 54%;
    background-color: #1C233A;
    position: relative;
  }
  .contentBot {
    width: 100%;
    height: 44%;
    background-color: #1C233A;
    position: relative;
  }

  .title {
    position: absolute;
    top: .052083rem /* 10/192 */;
    font-size: .078125rem /* 15/192 */;
    left: .052083rem /* 10/192 */;
    font-weight: 600;
    color: #00C5FF;
  }
</style>