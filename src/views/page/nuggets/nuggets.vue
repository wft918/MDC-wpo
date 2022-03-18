<!-- 生产部-掘进面 -->
<template>
  <div class="main">
    <!-- 左 -->
    <div>
      <div>
        <leftTop></leftTop>
      </div>
      <div>
        <leftCen></leftCen>
      </div>
      <div>
        <leftBot></leftBot>
      </div>
    </div>
    <!-- 中 -->
    <div>
      <div>
        <cenTop></cenTop>
      </div>
      <div>
        <cenCen></cenCen>
      </div>
      <div>
        <cenBot></cenBot>
      </div>
    </div>
    <!-- 右 -->
    <div>
      <div :class="layoutFlag.endsWith('综采面')?'rightTop1':'rightTop2'">
        <rightTop :parentTochild='parentTochild' @selectChange="selectChange"></rightTop>
      </div>
      <div :class="layoutFlag.endsWith('综采面')?'rightCen1':'rightCen2'">
        <rightCen :parentTochild='parentTochild'></rightCen>
      </div>
      <div v-if="layoutFlag.endsWith('综采面')" class="rightBot">
        <rightBot :parentTochild='parentTochild'></rightBot>
      </div>
    </div>
  </div>
</template>
<script>
  import '@/utils/flexible'
  import leftTop from './branch/leftTop'
  import leftCen from './branch/leftCen'
  import leftBot from './branch/leftBot'
  import cenTop from './branch/cenTop'
  import cenCen from './branch/cenCen'
  import cenBot from './branch/cenBot'
  import rightTop from './branch/rightTop'
  import rightCen from './branch/rightCen'
  import rightBot from './branch/rightBot'
  export default {
    data() {
      return {
        layoutFlag:'3203综采面',
        parentTochild:''
      }
    },
    components: { leftTop, leftCen, leftBot, cenTop, cenCen, cenBot, rightTop, rightCen, rightBot },
    methods: {
      // 监听子组件下拉框改变
      selectChange(e) {
        this.layoutFlag = e
        this.$nextTick(() => {
          this.parentTochild = e
        })
      }
    },
  }
</script>
<style scoped>
  .main {
    width: 100%;
    height: 100%;
    padding: .052083rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }

  .main>div {
    width: 32.5%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .main>div:nth-of-type(1)>div,
  .main>div:nth-of-type(2)>div {
    width: 100%;
    height: 32%;
    background-color: #1c233a;
  }


  .rightTop1 {
    width: 100%;
    height: 32%;
  }
  .rightTop2 {
    width: 100%;
    height: 54%;
  }

  .rightCen1 {
    width: 100%;
    height: 32%;
    background-color: #1c233a;
  }
  .rightCen2 {
    width: 100%;
    height: 44%;
    background-color: #1c233a;
  }
  .rightBot {
    width: 100%;
    height: 32%;
    background-color: #1c233a;
  }

  /* .main>div:nth-of-type(3)>div:nth-of-type(1) {
    width: 100%;
    height: 54%;
  }

  .main>div:nth-of-type(3)>div:nth-of-type(2) {
    width: 100%;
    height: 44%;
    background-color: #1c233a;
  } */
</style>