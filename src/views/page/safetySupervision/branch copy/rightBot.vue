<template>
  <div style="width: 100%;height: 100%;background-color: #1c233a;">
    <div style="width: 100%;height: 35px;line-height: 35px;padding-left: 5px;box-sizing: border-box;position: relative;">
      <!-- <span style="color: #00c1fa;">月度隐患分析</span> -->
      <p class="title">月度隐患分析</p>
    </div>
    <div style="width: 100%;height: calc(100% - 35px);display: flex;">
      <div style="width: 50%;height: 100%;">
        <rtbt-charts :id="'charts7'" :title="'隐患等级统计'" :data="djData"></rtbt-charts>
      </div>
      <div style="width: 50%;height: 100%;">
        <rtbt-charts :id="'charts8'" :title="'隐患专业统计'" :data="zyData"></rtbt-charts>
      </div>
    </div>
  </div>
</template>
<script>
  import rtbtCharts from './echarts/rtbtCharts'
  import { gettroublelevel, gettroublespec } from '@/api/safetySupervision'
  import { gettrouble_level, gettrouble_by_category } from '@/api/safetySupervision2'
  export default {
    data() {
      return {
        djData:[],
        zyData:[]
      }
    },
    components: {
      rtbtCharts
    },
    mounted() {
      // this.gettroublelevel()//等级
      // this.gettroublespec()//专业
      this.gettrouble_level()//等级
      this.gettrouble_by_category()//专业
    },
    methods: {
      // request1
      // 等级
      gettroublelevel() {
        gettroublelevel().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.djData = data.data.map(item => {return {value:parseInt(item.value),name:item.ext_2}})
            }
          }
        })
      },
      // 专业
      gettroublespec() {
        gettroublespec().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.zyData = data.data.map(item => {return {value:parseInt(item.value),name:item.ext_3}})
            }
          }
        })
      },
      // request2
      // 等级
      gettrouble_level() {
        gettrouble_level().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              // this.djData = data.data.map(item => {return {value:parseInt(item.value),name:item.indicator_name}})
              let list1 = data.data.filter(item => item.indicator_name == '1级隐患')
              let list2 = data.data.filter(item => item.indicator_name == '2级隐患')
              let list3 = data.data.filter(item => item.indicator_name == '3级隐患')
              this.djData = [...list1,...list2,...list3].map(item => {return {value:parseInt(item.value),name:item.indicator_name}})
            }
          }
        })
      },
      // 专业
      gettrouble_by_category() {
        gettrouble_by_category().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.zyData = data.data.map(item => {return {value:parseInt(item.value),name:item.indicator_name}})
            }
          }
        })
      },
    },
  }
</script>
<style scoped>
  .title {
    color: #03b5eb;
    font-size: .078125rem /* 15/192 */;
    font-weight: 600;
    position: absolute;
    top: 0rem /* 10/192 */;
    left: .078125rem /* 15/192 */;
  }
</style>