<doc>
  大屏左侧部分布局代码
</doc>
<template>
  <div class="box">
    <p class="title">生产 <img class="side" src="../../../../assets/img/system/side.png" alt=""></p>
    <div class="content">
      <div class="part top" style="height: 44%;">
        <top></top>
      </div>
      <div class="part bottom" style="height: 29%;">
        <center></center>
      </div>
      <div class="part bottom" style="height: 24%;">
        <bottom></bottom>
      </div>
    </div>
  </div>
</template>
<script>
  import top from '@/views/page/bigViewTest/left/part/top'
  import center from '@/views/page/bigViewTest/left/part/center'
  import bottom from '@/views/page/bigViewTest/left/part/bottom'
  export default {
    components: {
      top,
      center,
      bottom
    }
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
    color: #FFFFFF;
  }

  .title {
    height: .114583rem /* 22/192 */;
    font-size: .083333rem /* 16/192 */;
    font-weight: 600;
    color: #FFFFFF;
    line-height: .114583rem /* 22/192 */;
    font-weight: 650;
  }

  .side {
    height: .0625rem /* 12/192 */;
    margin-left: .078125rem /* 15/192 */;
  }

  .content {
    width: 100%;
    margin-top: .026042rem /* 5/192 */;
    height: calc(100% - .140625rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .part{
    width: 100%;
    height: 30%;
  }

  .top {
    height:45%;
  }

  .bottom {
    height: 27%;
  }


</style>