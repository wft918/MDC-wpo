<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .208333rem;line-height: .208333rem;color: #00C5FF;padding-left: .052083rem;font-size: .072917rem;">矿井风险统计</div>
    <div style="width: 100%;height: calc(100% - .208333rem);padding: .104167rem;box-sizing: border-box;display: flex;">
      <div style="width: 50%;height: 100%;">
        <pie :id="'ltBt1'" :title="'风险等级统计'" :data="djData" :leftTitle="'50%'" :colorList="['#008eea','#fac800','#ff7d00','#f00041']" :xdistans="'15%'" :seriesCenter="['60%','50%']"></pie>
      </div>
      <div style="width: 50%;height: 100%;">
        <pie :id="'ltBt2'" :title="'风险类型统计'" :data="zyData" :leftTitle="'50%'" :colorList="['#008eea','#fac800','#ff7d00','#f00041']" :xdistans="'15%'" :seriesCenter="['60%','50%']"></pie>
      </div>
    </div>
  </div>
</template>
<script>
  import pie from './echart/pie'
  import { getrisk_by_grade_year, getrisk_type_year } from '@/api/safetySupervision2'
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
      this.getrisk_by_grade_year() //等级
      this.getrisk_type_year() //专业
    },
    methods: {
      // request2
      // 等级
      getrisk_by_grade_year() {
        getrisk_by_grade_year().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.djData = data.data.reverse().map(item => {
                let name = ''
                if(item.indicator_name == '低风险年度统计') {
                  name = '低风险'
                }else {
                  name = item.indicator_name.slice(0,4)
                }
                return {
                  value:parseFloat(item.value),
                  name:name
                }
              })
            }
          }
        })
      },
      // 风险类型
      getrisk_type_year() {
        getrisk_type_year().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.zyData = data.data.map(item => ({value:parseFloat(item.value),name:item.indicator_name}))
            }
          }
        })
      }
    },
  }
</script>
<style scoped>
  
</style>