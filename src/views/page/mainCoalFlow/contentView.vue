<doc>
  主煤流布局 - 展示主体区域
</doc>
<template>
  <div class="main">
    <!-- 左侧 -->
    <div class="main-part">
      <!-- 标题 -->
      <p class="title">智能启停 <img class="side" src="../../../assets/img/system/side.png" alt=""></p>
      <div class="top">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <left-top></left-top>
      </div>
      <div class="top" v-if="state===0">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <left-center></left-center>
      </div>
      <div class="top-d" v-if="state===1||state===3">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <start-and-stop></start-and-stop>
      </div>
      <div class="top" v-if="state===2">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <normal-operation></normal-operation>
      </div>
      <div class="top" v-if="state===0||state===2">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <left-bottom></left-bottom>
      </div>
    </div>
    <!-- 中间 -->
    <div class="main-part">
      <!-- 标题 -->
      <p class="title">智能配煤 <img class="side" src="../../../assets/img/system/side.png" alt=""></p>
      <div class="top">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <center-top></center-top>
      </div>
      <div class="top">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <center-center></center-center>
      </div>
      <div class="top">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <center-bottom></center-bottom>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="main-part">
      <!-- 标题 -->
      <p class="title">效能分析 <img class="side" src="../../../assets/img/system/side.png" alt=""></p>
      <div class="top">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <right-top></right-top>
      </div>
      <div class="top">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <right-center></right-center>
      </div>
      <div class="top">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <right-bottom></right-bottom>
      </div>
    </div>
  </div>
</template>
<script>
  import "../../../utils/flexible.js";
  // 组件引入
  import leftTop from '@/views/page/mainCoalFlow/part/leftTop'
  import leftCenter from '@/views/page/mainCoalFlow/part/leftCenter'
  import leftBottom from '@/views/page/mainCoalFlow/part/leftBottom'
  import centerTop from '@/views/page/mainCoalFlow/part/centerTop'
  import centerCenter from '@/views/page/mainCoalFlow/part/centerCenter'
  import centerBottom from '@/views/page/mainCoalFlow/part/centerBottom'
  import rightTop from '@/views/page/mainCoalFlow/part/rightTop'
  import rightCenter from '@/views/page/mainCoalFlow/part/rightCenter'
  import rightBottom from '@/views/page/mainCoalFlow/part/rightBottom'
  import startAndStop from '@/views/page/mainCoalFlow/part/startAndStop'
  import normalOperation from '@/views/page/mainCoalFlow/part/normalOperation'

  export default {
    components: {
      leftTop,
      leftCenter,
      leftBottom,
      centerTop,
      centerCenter,
      centerBottom,
      rightTop,
      rightCenter,
      rightBottom,
      startAndStop,
      normalOperation,
    },
    data() {
      return {}
    },
    computed: {
      state: {
        get() {
          return this.$store.state.startStopStatus.statu
        },
      },
    },
    mounted() {

    },
    methods: {

    },
  }
</script>
<style scoped>
  .main {
    height: 100%;
    display: flex;
  }

  .main-part {
    width: 33.33%;
    display: flex;
    flex-direction: column;
  }

  .title {
    height: .114583rem /* 22/192 */;
    font-size: .078125rem /* 15/192 */;
    font-weight: 600;
    color: #FFFFFF;
    line-height: .114583rem /* 22/192 */;
    margin: .052083rem /* 10/192 */ .130208rem /* 25/192 */ .015625rem /* 3/192 */ .130208rem /* 25/192 */;
    font-weight: 650;
  }

  .top {
    border: .010417rem /* 2/192 */ solid #00C3FF;
    margin: .041667rem /* 8/192 */ .052083rem /* 10/192 */;
    height: 33%;
    box-sizing: border-box;
    box-shadow: #0b557b 0rem 0rem .052083rem /* 10/192 */ .026042rem /* 5/192 */ inset;
    background-color: rgba(0, 93, 165, 0.2);
    padding: .052083rem /* 10/192 */;
    position: relative;
  }

   .top-d {
    border: .010417rem /* 2/192 */ solid #00C3FF;
    margin: .041667rem /* 8/192 */ .052083rem /* 10/192 */;
    height: 68%;
    box-sizing: border-box;
    box-shadow: #0b557b 0rem 0rem .052083rem /* 10/192 */ .026042rem /* 5/192 */ inset;
    background-color: rgba(0, 93, 165, 0.2);
    padding: .052083rem /* 10/192 */;
    position: relative;
  }

  .q {
    height: .130208rem /* 25/192 */;
    position: absolute;
    top: -0.052083rem /* 10/192 */;
    left: -0.052083rem /* 10/192 */;
  }

  .light {
    position: absolute;
    height: .03125rem /* 6/192 */;
    width: 50%;
    opacity: 1;
    top: -0.010417rem /* 2/192 */;
    left: 40%;
  }

  .side {
    height: .052083rem /* 10/192 */;
    margin-left: .078125rem /* 15/192 */;
  }
</style>