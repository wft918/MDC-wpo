<doc>
  大屏展示
  10m * 4m
</doc>
<template>
  <div id="box" :style="{ width:lay_out == 'zhui'?maxWidth:lay_out == 'wpo'?'100%':maxWidth}">
  <!-- <div id="box" style="width: 100%;"> -->
    <div class="top">
      <div @click="toHome" class="header">
        <img style="height: .177083rem /* 34/192 */" src="../../../assets/img/system/logo.png" alt="">
        <p class="title">智能一体化管控平台</p>
      </div>
      <div class="date-div">
        <p class="date">{{time}}</p>
        <div class="date time">
          <p>{{date}}</p>
          <p>{{weekTime}}</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="part">
        <left></left>
      </div>
      <div class="parts">
        <center></center>
      </div>
      <div class="part">
        <right></right>
      </div>
    </div>
  </div>
</template>
<script>
  import "../../../utils/flexible.js";
  import left from '@/views/page/bigViewTest/left/left'
  import center from '@/views/page/bigViewTest/center/center'
  import right from '@/views/page/bigViewTest/right/right'
  export default {
    components: {
      left,
      center,
      right,
    },
    data() {
      return {
        maxWidth: '',
        time: '',
        date: '',
        weekTime: '',
        week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        lay_out:''
      }
    },
    mounted() {
      let height = document.getElementById('box').clientHeight;
      this.maxWidth = height * 2.8 + 'px'
      this.lay_out = process.env.VUE_APP_LAYOUT_BIGVIEW   //决定大屏宽度
      setInterval(() => {
        this.updateTime()
      }, 1000)
      this.updateTime()
    },
    methods: {
      updateTime() {
        var cd = new Date()
        this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
        this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2)
        this.weekTime = this.week[cd.getDay()]
      },
      zeroPadding(num, digit) {
        var zero = ''
        for (var i = 0; i < digit; i++) {
          zero += '0'
        }
        return (zero + num).slice(-digit)
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },

      toHome() {
        this.$router.replace({
          path:'/home'
        })
      }
    },
  }
</script>
<style scoped>
  #box {
    height: 100vh;
    background-color: antiquewhite;
    background: url("../../../assets/img/bigView/bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #fff;
  }

  .top {
    width: 100%;
    height: .364583rem /* 70/192 */;
    background: url("../../../assets/img/bigView/top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .date-div {
    position: absolute;
    right: 0;
    width: 9%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .date {
    width: 50%;
    text-align: center;
    font-size: .104167rem
      /* 20/192 */
    ;
    color: #00ffff;
  }

  .time {
    font-size: .078125rem
      /* 15/192 */
    ;
  }

  .header {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .title {
    font-size: .15625rem /* 30/192 */;
    font-size: 600;
    margin-left: .125rem
      /* 24/192 */
    ;
  }

  .content {
    width: 100%;
    height: calc(100% - .364583rem);
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .parts {
    width: 47%;
    height: 98%;
  }

  .part {
    width: 24.5%;
    height: 98%;
  }
</style>