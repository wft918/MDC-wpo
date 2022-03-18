<doc>
  驾驶舱 - 展示主体区域
</doc>
<template>
  <div class="main">
    <!-- 左侧 -->
    <div class="main-part">
      <!-- 标题 -->
      <p class="title">生产 <img class="side" src="../../../assets/img/system/side.png" alt=""></p>
      <div class="top top1">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <left-top></left-top>
      </div>
      <div class="top top2">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <left-center></left-center>
      </div>
      <div class="top top3">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <left-bottom></left-bottom>
      </div>
    </div>
    <!-- 中间 -->
    <div class="main-part">
      <!-- 标题 -->
      <p class="title">矿山信息模型 <img class="side" src="../../../assets/img/system/side.png" alt=""></p>
      <div class="top center three">
        <!-- <img src="../../../assets/img/system/fj.png" alt="" style="width: 100%;height: 100%;"> -->
        <!-- <iframe style="width: 100%;height: 120%;margin-top: -12.5%;" :src="url" frameborder="0"></iframe> -->
        <iframe style="width: 100%;height: 100%;" :src="url" frameborder="0"></iframe>
      </div>
      <div class="top center">
        <center-bottom></center-bottom>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="main-part" style="position: relative;">
      <!-- 标题 -->
      <p class="title">安全 <img class="side" src="../../../assets/img/system/side.png" alt=""></p>
      <!-- <div style="position: absolute;top: .015625rem;right: 0;color: #fff;">
        <span>当班入井总人数</span>
        <span style="color: #1890ff;">{{num1}}</span>&nbsp;&nbsp;
        <span>井下总人数</span>
        <span style="color: #1890ff;">{{num2}}</span>
      </div>
      <div style="position: absolute;top: .114583rem;right: 0;color: #fff;">
        <span>带班领导</span>&nbsp;&nbsp;
        <span>零点班</span>
        <span style="color: #1890ff;">{{person1}}</span>&nbsp;&nbsp;
        <span>八点班</span>
        <span style="color: #1890ff;">{{person3}}</span>&nbsp;&nbsp;
        <span>四点班</span>
        <span style="color: #1890ff;">{{person2}}</span>
      </div> -->
      <div class="top right1">
        <img class="q" src="../../../assets/img/system/3d.png" alt="">
        <img class="light" src="../../../assets/img/system/light.png" alt="">
        <right-top></right-top>
      </div>
      <div class="right right2">
        <div class="right-r" style="margin-right: .052083rem /* 10/192 */">
          <img class="q" src="../../../assets/img/system/3d.png" alt="">
          <img class="light" src="../../../assets/img/system/light.png" alt="">
          <right-center-left></right-center-left>
        </div>
        <div class="right-r" style="margin-left: .052083rem /* 10/192 */;">
          <img class="q" src="../../../assets/img/system/3d.png" alt="">
          <img class="light" src="../../../assets/img/system/light.png" alt="">
          <right-center-right></right-center-right>
        </div> 
      </div>
      <div class="top right3">
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
  import leftTop from '@/views/page/cockpit/part/leftTop'
  import leftCenter from '@/views/page/cockpit/part/leftCenter'
  import leftBottom from '@/views/page/cockpit/part/leftBottom'
  import rightTop from '@/views/page/cockpit/part/rightTop'
  import rightCenterLeft from '@/views/page/cockpit/part/rightCenterLeft'
  import rightBottom from '@/views/page/cockpit/part/rightBottom'
  import rightCenterRight from '@/views/page/cockpit/part/rightCenterRight'
  import centerBottom from '@/views/page/cockpit/part/centerBottom'
  
  import { getleader, downPerShift, totalPerson } from '@/api/bigView2'
  
  export default {
    components: {
      leftTop,
      leftCenter,
      leftBottom,
      rightTop,
      rightCenterLeft,
      rightBottom,
      rightCenterRight,
      centerBottom,
    },
    data() {
      return {
        person1: '--',
        person2: '--',
        person3: '--',
        num1: '--',
        num2: '--',
        url:''
      }
    },
    computed: {
    },
    mounted() {
      this.url = process.env.VUE_APP_SUBSYSTEM_GIS
      // this.getleader()
      // this.downPerShift()
      // this.totalPerson()
    },
    methods: {
      // 领导带班
      getleader() {
        getleader().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.person1 = data.data[0].零点班
              this.person2 = data.data[0].四点班
              this.person3 = data.data[0].八点班
            }
          }
        })
      },
      // 当班入井总人数
      downPerShift() {
        downPerShift().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.num1 = data.data[0].c
            }
          }
        })
      },

      // 井下总人数
      totalPerson() {
        totalPerson().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.num2 = data.data[0].curinnum
            }
          }
        })
      }

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
    box-sizing: border-box;
    box-shadow: #0b557b 0rem /* 0/192 */ 0rem /* 0/192 */ .052083rem /* 10/192 */ .026042rem /* 5/192 */ inset;
    background-color: rgba(0, 93, 165, 0.2);
    padding: .052083rem /* 10/192 */;
    position: relative;
  }

  .right {
    margin: .041667rem /* 8/192 */ .052083rem /* 10/192 */;
    box-sizing: border-box;
    display: flex;
  }

  .right-r {
    border: .010417rem /* 2/192 */ solid #00C3FF;
    margin: 0rem /* 0/192 */ 0rem;
    width: 100%;
    box-sizing: border-box;
    box-shadow: #0b557b 0rem /* 0/192 */ 0rem .052083rem /* 10/192 */ .026042rem /* 5/192 */ inset;
    background-color: rgba(0, 93, 165, 0.2);
    padding: .052083rem /* 10/192 */;
    position: relative;
  }

  .top1 {
    height: 60%;
  }

  .top2 {
    height: 35%;
  }

  .top3 {
    height: 30%;
  }

  .center {
    height: 50%;

  }

  .three {
    padding: 0;
    overflow: hidden;
  }

  .right1 {
    height: 20%;
  }

  .right2 {
    height: 35%;
  }

  .right3 {
    height: 45%;
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
