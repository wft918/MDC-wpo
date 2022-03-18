<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: 30px;color: #fff;text-align: center;line-height: 30px;">{{title}}</div>
    <div style="width: 100%;height: calc(100% - 30px);position: relative;">
      <img style="width: 100%;height: 100%;" src="../../../../../../assets/img/superScreen/coalBunker.png" alt="">
      <p style="width: 100%;;position: absolute;top: 2%;color: black;text-align: center;font-weight: 800;">仓量</p>
      <p style="width: 100%;;position: absolute;top: 6%;color: #1f4573;text-align: center;font-weight: 800;font-family: ysbth;font-size: 25px;">3500</p>
      <p style="width: 100%;;position: absolute;top: 15%;color: #990000;text-align: center;font-weight: 800;font-size: 12px;">吨</p>

      <div style="position: absolute;top: 35%;right: -18%;color: #dedfe2;font-weight: 800;font-size: 10px;">仓位</div>
      <div style="position: absolute;top: 41%;right: -30%;color: #009bff;font-weight: 800;font-size: 16px;font-family: ysbth;">35.12</div>
      <div style="position: absolute;top: 48%;right: -14%;color: #94979f;font-weight: 800;font-size: 10px;">米</div>
      <div style="position: absolute;top: 53%;right: -28%;color: #008fec;font-weight: 800;font-size: 10px;">-------------</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        
      }
    },
    props:['title']
  }
</script>
<style scoped>

</style>