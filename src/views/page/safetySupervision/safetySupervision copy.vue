<!-- 安监部 -->
<template>
  <div class="safetySupervision">
    <div class="left">
      <div class="leftTop">
        <left-top></left-top>
      </div>
      <div class="leftBot">
        <div>
          <left-bot-lf></left-bot-lf>
        </div>
        <div>
          <left-bot-rt></left-bot-rt>
        </div>
      </div>
    </div>
    <div class="right">
      <div>
        <right-top></right-top>
      </div>
      <div>
        <right-cen></right-cen>
      </div>
      <div>
        <right-bot></right-bot>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../utils/flexible.js'
  import leftTop from './branch/leftTop'
  import leftBotLf from './branch/leftBotLf'
  import leftBotRt from './branch/leftBotRt'
  import rightTop from './branch/rightTop'
  import rightCen from './branch/rightCen'
  import rightBot from './branch/rightBot'
  export default {
    data() {
      return {

      }
    },
    components: {
      leftTop,
      leftBotLf,
      leftBotRt,
      rightTop,
      rightCen,
      rightBot
    },
    mounted() {
      
    },
    methods: {
      
    },
  }
</script>
<style scoped>
  .safetySupervision {
    width: 100%;
    height: 100%;
    padding: .052083rem /* 10/192 */;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }

  .left {
    width: 62%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .leftTop {
    width: 100%;
    height: 45.5%;
    background-color: #1c233a;
  }
  .leftBot {
    width: 100%;
    height: 53%;
    display: flex;
    justify-content: space-between;
  }
  .leftBot > div {
    width: 49.5%;
    height: 100%;
    background-color: #1c233a;
  }


  .right {
    width: 37%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .right > div {
    width: 100%;
    height: 32.5%;
  }

  
</style>