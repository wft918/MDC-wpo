<doc>
  10m 大屏 右下
</doc>
<template>
  <div class="box">
    <p class="title">井下人员区域分布</p>
    <div class="content">
      <bar :areaData='areaData'></bar>
    </div>
  </div>
</template>
<script>
  import bar from '@/views/page/bigViewTest/right/echarts/bar'
  // import { getareaperson } from '@/api/safetySupervision'
  import { areaPerson } from '@/api/bigView2'
  export default {
    components: {
      bar
    },
    data() {
      return {
        areaData: []
      }
    },
    mounted() {
      // this.getareaperson()
      this.areaPerson()
    },
    methods: {
      // request2
      // 井下人员区域分布
      areaPerson() {
        areaPerson().then(data => {
          if (data && data.success) {
            if (data.data.length > 0) {
              this.areaData = data.data
            }
          }
        })
      }

      // request1
      // 井下人员区域分布
      // getareaperson() {
      //   getareaperson().then(data => {
      //     if (data && data.success) {
      //       this.areaData = data.data
      //     }
      //   })
      // },
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