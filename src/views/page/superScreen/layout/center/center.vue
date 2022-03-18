<template>
  <div style="width: 100%;height: 100%;">
    <!-- title -->
    <div style="width: 100%;height: .182292rem;position: relative;">
      <span style="color: #fff;text-shadow: 0rem 0rem .052083rem #00FFFF;position: absolute;bottom: 0;font-size: 14px;">矿山信息模型</span>
      <img style="position: absolute;bottom: 3px;left: 3.8%;" src="../../../../../assets/img/system/side.png" alt="">
    </div>
    <div style="width: 100%;height: calc(100% - .182292rem);display: flex;justify-content: space-between;">
      <!-- 左侧 -->
      <div style="width: 20%;height: 100%;">
        <cen-left></cen-left>
      </div>
      <!-- 中间 -->
      <div style="width: 58%;height: 100%;">
        <cen-cen></cen-cen>
      </div>
      <!-- 右侧 -->
      <div style="width: 20%;height: 100%;">
        <cen-right></cen-right>
      </div>
    </div>
  </div>
</template>
<script>
  import cenLeft from './branch/cenLeft'
  import cenCen from './branch/cenCen'
  import cenRight from './branch/cenRight'
  export default {
    data() {
      return {
        
      }
    },
    components: {
      cenLeft,
      cenCen,
      cenRight
    }
  }
</script>