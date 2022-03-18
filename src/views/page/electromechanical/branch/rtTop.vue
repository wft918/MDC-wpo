<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .208333rem;line-height: .208333rem;padding-left: .052083rem;box-sizing: border-box;color: #03b5eb;font-size: .078125rem;">生产能耗分析</div>
    <div style="width: 100%;height: calc(100% - .208333rem);padding: 0 .078125rem .052083rem .078125rem;box-sizing: border-box;display: flex;flex-direction: column;justify-content: space-around;align-items: center;">
      <div class="dat">
        <span>上月吨煤耗电量：</span>
        <span style="font-family: ysbth;font-size: .15625rem;color: #1890ff;">  {{electricQuantityNum_1}}</span>
        <span>千瓦时</span>
      </div>
      <div class="dat">
        <span>上月累计耗电量：</span>
        <span style="font-family: ysbth;font-size: .15625rem;color: #1890ff;">  {{electricQuantityNum_2}}</span>
        <span>千瓦时</span>
      </div>
      <div class="dat">
        <span>年度累计耗电量：</span>
        <span style="font-family: ysbth;font-size: .15625rem;color: #1890ff;">  {{electricQuantityNum_3}}</span>
        <span>千瓦时</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { getElepertonLastMonth,getEleconsLastMonth,getEleconsYear } from '@/api/electromechanical3' 
  export default {
    data() {
      return {
        electricQuantityNum_1:0,
        electricQuantityNum_2:0,
        electricQuantityNum_3:0
      }
    },
    mounted() {
      this.getElepertonLastMonth()
      this.getEleconsLastMonth()
      this.getEleconsYear()
    },
    methods: {
      // 上月吨煤耗电量
      getElepertonLastMonth() {
        getElepertonLastMonth().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.electricQuantityNum_1 = data.data[0]['月吨煤耗电成本'].toFixed(0)
            }
          }
        })
      },
      // 上月累计耗电量
      getEleconsLastMonth() {
        getEleconsLastMonth().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.electricQuantityNum_2 = data.data[0]['月耗电量'].toFixed(0)
            }
          }
        })
      },
      // 年度累计
      getEleconsYear() {
        getEleconsYear().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.electricQuantityNum_3 = data.data[0]['年耗电量'].toFixed(0)
            }
          }
        })
      }
    },
  }
</script>
<style scoped>
  .dat {  
    width: 95%;
    height: 30%;
    border: 1px solid #00C5FF;
    box-shadow: #0b557b 0px 0px 5px 5px inset;
    box-sizing: border-box;
    text-align: center;
    line-height: .395833rem;
    color: #fff;
    font-size: .109375rem;
  }
</style>