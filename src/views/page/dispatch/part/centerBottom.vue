<doc>
  月度销售及运量统计
</doc>
<template>
  <div class="box">
    <p class="msg">日销售：<span class="num">{{value}}</span> 吨</p>
    <bar-more :data="data"></bar-more>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import barMore from '@/views/page/dispatch/model/barMore'
  export default {
    data() {
      return {

      }
    },
    components: {
      barMore,
    },
    props: ['data','value']
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