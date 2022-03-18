<!-- 安监部 -->
<template>
  <div class="safetySupervision">
    <div class="left">
      <div class="ltTop">
        <lt-top></lt-top>
      </div>
      <div class="ltBot">
        <lt-bot></lt-bot>
      </div>
    </div>
    <div class="right">
      <div class="rtTop">
        <rt-top></rt-top>
      </div>
      <div class="rtBot">
        <rt-bot></rt-bot>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../utils/flexible.js'
  import ltTop from './branch/ltTop'
  import ltBot from './branch/ltBot'
  import rtTop from './branch/rtTop'
  import rtBot from './branch/rtBot'
  export default {
    data() {
      return {

      }
    },
    components: {
      ltTop,
      ltBot,
      rtTop,
      rtBot
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
    width: 63%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .right {
    width: 36%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .ltTop {
    width: 100%;
    height: 43%;
    background-color: #1C233A;
  }
  .ltBot {
    width: 100%;
    height: 55%;
    background-color: #1C233A;
  }

  .rtTop {
    width: 100%;
    height: 43%;
  }
  .rtBot {
    width: 100%;
    height: 55%;
    background-color: #1c233a;
  }

  

  
</style>