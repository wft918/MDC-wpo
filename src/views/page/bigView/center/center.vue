<doc>
  10m 大屏 中间部分布局
</doc>
<template>
  <div class="box">
    <p class="title">矿山信息模型 <img class="side" src="../../../../assets/img/system/side.png" alt=""></p>
    <div class="content">
      <div class="top">
        <top></top>
      </div>
      <div class="bottom">
        <bottom></bottom>
      </div>
    </div>
  </div>
</template>
<script>
  import bottom from '@/views/page/bigView/center/part/bottom'
  import top from '@/views/page/bigView/center/part/top'
  export default {
    components: {
      bottom,
      top,
    }
  }
</script>
<style scoped>
  .box {
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

  .top {
    width: 100%;
    height: 60%;
  }

  .bottom {
    width: 100%;
    height: 35%;
  }

</style>