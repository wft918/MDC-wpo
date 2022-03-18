<!-- 4 * 20 超大屏 -->
<template>
  <div id="superScreen" :style="screenObj">
    <!-- 顶部title -->
    <div class="titletop">
      <!-- 中间logo -->
      <img @click="toHome" style="cursor: pointer;" src="../../../assets/img/superScreen/topLogo.png" alt="">
      <!-- 右侧时间 -->
      <div style="position: absolute;right: 0.5%;height: 100%;display: flex;">
        <div style="height: 100%;font-size: .145833rem;color: #00ffff;line-height: 61px;margin-right: 15px;">
          <span>{{currentTime}}</span>
        </div>
        <div style="height: 100%;color: #00e2e4;display: flex;flex-direction: column;justify-content: center;font-size: .083333rem;">
          <div>{{currentDate}}</div>
          <div style="text-align: center;margin-top: 5px;">{{currentWeek}}</div>
        </div>
      </div>
    </div>
    <!-- 主体内容 -->
    <div style="width: 100%;height: calc(100% - 61px);display: flex;justify-content: space-between;">
      <div class="ltrt">
        <left></left>
      </div>
      <div class="center">
        <cen></cen>
      </div>
      <div class="ltrt">
        <right></right>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../utils/flexible.js'
  import left from './layout/left/left'
  import cen from './layout/center/center'
  import right from './layout/right/right'
  export default {
    data() {
      return {
        screenObj: {
          width: ''
        },
        currentTime:'', //当前时间
        interVal:null
      }
    },
    components: {
      left,
      cen,
      right
    },
    computed: {
      currentDate() {
        return this.get_date(0)
      },
      currentWeek() {
        return this.get_week(this.currentDate)
      }
    },
    mounted() {
      this.getHeight()
      this.getTime()
    },
    destroyed() {
      clearInterval(this.interVal)
    },
    methods: {
      getHeight() {
        let superScreen = document.getElementById('superScreen')
        let currentHeight = superScreen.getBoundingClientRect().height
        this.screenObj.width = (17280 * currentHeight) / 3240 + 'px'
        // window.addEventListener('resize', () => {
        //   this.screenObj.height = (3240 * parseInt(this.screenObj.width.slice(0,-2))) / 17280 + 'px'
        //   console.log(this.screenObj.height)
        // })
      },
      // 获取当前时间
      getTime() {
        this.interVal = setInterval(() => {
          this.currentTime = new Date().toLocaleTimeString('chinese',{hour12:false})
        })
      },
      toHome() {
        this.$router.replace({
          path:'/home'
        })
      },


      /**
       * 获取指定时间的日期
       * @params 正是今天之后的日期、负是今天前的日期
       * @return 2020-08-22
       * */
      get_date(num) {
        var date1 = new Date();
        //今天时间
        var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + num);
        //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
        var time2 = this.addZero(date2.getFullYear()) + "-" + this.addZero((date2.getMonth() + 1)) + "-" + this.addZero(date2.getDate());
        return time2;
      },
      addZero(num) {//补0
        if (parseInt(num) < 10) {
          num = '0' + num;
        }
        return num;
      },
      /**
       * 根据指定时间的日期-获取
       * @params 2020-8-22
       * @return 周六
       * */
      get_week(datestr) {
        var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
        var week = weekArray[new Date(datestr).getDay()];
        console.log(week);
        return week;
      },
    },
  }
</script>
<style scoped>
  #superScreen {
    height: 100vh;
    /* width: 100vw; */
    background-image: url(../../../assets/img/superScreen/superBg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .titletop {
    width: 100%;
    height: 61px;
    background-image: url(../../../assets/img/superScreen/topBg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .titletop>img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .ltrt {
    width: 25%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
  }

  .center {
    width: 48%;
    height: 100%;
  }
</style>