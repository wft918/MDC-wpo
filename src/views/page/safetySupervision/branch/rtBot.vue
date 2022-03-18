<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .208333rem;line-height: .208333rem;color: #00C5FF;padding-left: .052083rem;font-size: .072917rem;">近30天隐患分析</div>
    <div style="width: 100%;height: calc(100% - .208333rem);">
      <div style="width: 100%;height: 45%;padding-left: 0 15%;padding-left: 7.5%;box-sizing: border-box;">
        <pie :id="'rtBt1'" :title="'隐患等级统计'" :data="djData" :seriesCenter="['55%','50%']" :leftTitle="'48%'" :colorList="['#f00041','#fac800','#008eea']" :xdistans="'5%'"></pie>
      </div>
      <div style="width: 100%;height: 55%;padding-right: 15%;padding-left: 5%;box-sizing: border-box;">
        <pie :id="'rtBt2'" :title="'隐患专业统计'" :data="zyData" :seriesCenter="['68%','50%']" :leftTitle="'59%'" :colorList="['#008eea','#acff02','#fac800','#ff8a2d','#06c8cd','#03ac32','#1760bc','#7584ac','#b1ac70','#02bfff','#5ba1ff','#7ed321','#98aac2']" :xdistans="'5%'"></pie>
      </div>
    </div>
  </div>
</template>
<script>
  import pie from './echart/pie'
  import { gettrouble_level, gettrouble_by_category } from '@/api/safetySupervision2'
  export default {
    data() {
      return {
        djData:[],
        zyData:[]
      }
    },
    components: {
      pie
    },
    mounted() {
      this.gettrouble_level()//等级
      this.gettrouble_by_category()//专业
    },
    methods: {
      // request2
      // 等级
      gettrouble_level() {
        gettrouble_level().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              // this.djData = data.data.map(item => {return {value:parseInt(item.value),name:item.indicator_name}})
              // let list1 = data.data.filter(item => item.indicator_name == '1级隐患')
              // let list2 = data.data.filter(item => item.indicator_name == '2级隐患')
              // let list3 = data.data.filter(item => item.indicator_name == '3级隐患')
              // this.djData = [...list1,...list2,...list3].map(item => {return {value:parseInt(item.value),name:item.indicator_name}})
              data.data.forEach(item => {
                if(item.indicator_name == 'I级隐患' || item.indicator_name == '1级隐患') {
                  item.order = 1
                }else if(item.indicator_name == 'II级隐患' || item.indicator_name == '2级隐患') {
                  item.order = 2
                }else if(item.indicator_name == 'III级隐患' || item.indicator_name == '3级隐患') {
                  item.order = 3
                }
              })
              this.djData = data.data.sort((a, b) => a.order - b.order).map(item => ({value: parseFloat(item.value), name: item.indicator_name}))
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
  
</style>