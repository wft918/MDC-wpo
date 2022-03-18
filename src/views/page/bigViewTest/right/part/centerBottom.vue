<doc>
  10m 大屏 右侧中间下部
</doc>
<template>
  <div class="box">
  <p class="title">本月区域安全风险管控统计</p>
  <div class="content">
    <bar-eacherts-two :monthData="monthData"></bar-eacherts-two>
  </div>
  </div>
</template>
<script>
  import barEachertsTwo from '@/views/page/bigViewTest/right/echarts/barEachertsTwo'
  // import { riskarea } from "@/api/screenInterface";
  import { riskAreaLevel } from '@/api/bigView2'
  export default {
    components: {
      barEachertsTwo,
    },
    data() {
      return {
        monthData: [],
      }
    },
    mounted() {
      // this.getRiskarea()
      this.riskAreaLevel()
    },
    methods: {
      // request2
      // 本月风险管控按区域统计
      riskAreaLevel() {
        riskAreaLevel().then(data => {
          if (data && data.success) {
            this.monthData = data.data
          } else {
            this.monthData = []
          }
        })
      },


      // request1
      // getRiskarea() {
      //   riskarea().then( res => {
      //     if (res && res.success) {
      //       this.monthData = res.data
      //     } else {
      //       this.monthData = []
      //     }
      //   })
      // }
    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }
  
  .title {
    font-size: .083333rem /* 16/192 */;
    color: #00FFFF;
    text-align: center;
    height: .15625rem /* 30/192 */;
    line-height: .15625rem /* 30/192 */;
    font-weight: 650;
    /* text-shadow: 0rem 0rem .052083rem #00FFFF; */
    background: url("../../../../../assets/img/bigView/title-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .content {
    width: 100%;
    height: calc(100% - .15625rem);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>