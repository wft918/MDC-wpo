<!-- 机电部 -->
<template>
  <div style="width: 100%;height: 100%;padding: .026042rem .104167rem .026042rem .104167rem;display: flex;justify-content: space-between;box-sizing: border-box;">
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
  import '@/utils/flexible.js'
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
  .left {
    width: 68%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .right {
    width: 31%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .ltTop,.rtTop {
    width: 100%;
    height: 35%;
    background-color: #1c233a;
  }
  .ltBot,.rtBot {
    width: 100%;
    height: 63%;
    background-color: #1c233a;
  }
</style>