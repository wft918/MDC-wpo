<doc>
  10m 大屏 右侧布局
</doc>
<template>
  <div class="box">
    <p class="title">安全 <img class="side" src="../../../../assets/img/system/side.png" alt=""></p>
    <div class="msg-data">
      <p class="person-num" style="margin-top: .026042rem;">当班入井总人数 <span class="p-num">{{num1}}</span> 井下总人数 <span
          class="p-num">{{num2}}</span></p>
      <p class="person-num">带班领导 零点班<span class="p-num">{{person1}}</span> 八点班<span class="p-num">{{person3}}</span> 四点班<span
          class="p-num">{{person2}}</span></p>
    </div>
    <div class="content">
      <div class="part top">
        <top></top>
      </div>
      <div class="part center">
        <center-top></center-top>
      </div>
      <div class="part center">
        <center-bottom></center-bottom>
      </div>
      <div class="part bottom">
        <bottom></bottom>
      </div>
    </div>
  </div>
</template>
<script>
  import top from '@/views/page/bigViewTest/right/part/top'
  import centerTop from '@/views/page/bigViewTest/right/part/centerTop'
  import centerBottom from '@/views/page/bigViewTest/right/part/centerBottom'
  import bottom from '@/views/page/bigViewTest/right/part/bottom'

  import { getleader, downPerShift, totalPerson } from '@/api/bigView2'

  export default {
    components: {
      top,
      centerTop,
      centerBottom,
      bottom
    },
    data() {
      return {
        person1: '--',
        person2: '--',
        person3: '--',
        num1: '--',
        num2: '--',
      }
    },
    mounted() {
      this.getleader()
      this.downPerShift()
      this.totalPerson()
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
  .box {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .msg-data {
    top: -1.3%;
    width: 100%;
    height: 4%;
    position: absolute;
  }

  .person-num {
    text-align: right;
    color: #fff;
    font-size: .0625rem;
  }

  .p-num {
    color: #1890ff;
    font-size: .0625rem;
  }

  .title {
    height: .114583rem
      /* 22/192 */
    ;
    font-size: .083333rem
      /* 16/192 */
    ;
    font-weight: 600;
    color: #FFFFFF;
    line-height: .114583rem
      /* 22/192 */
    ;
    font-weight: 650;
  }

  .side {
    height: .0625rem
      /* 12/192 */
    ;
    margin-left: .078125rem
      /* 15/192 */
    ;
  }

  .content {
    width: 100%;
    margin-top: .026042rem
      /* 5/192 */
    ;
    height: calc(100% - .140625rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .part {
    width: 100%;
    height: 25%;
  }

  .top {
    height: 15%;
  }

  .center {
    height: 29%;
  }

  .bottom {
    height: 26%;
  }
</style>