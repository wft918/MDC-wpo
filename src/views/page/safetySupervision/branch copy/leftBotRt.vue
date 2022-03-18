<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: 35px;line-height: 35px;padding-left: 5px;box-sizing: border-box;position: relative;">
      <!-- <span style="color: #00c1fa;">年度风险分析</span> -->
      <p class="title">年度风险分析</p>
    </div>
    <div style="width: 100%;height: calc(100% - 35px);padding: 40px;box-sizing: border-box;display: flex;justify-content: space-between;">
      <div style="width: 49%;height: 100%;">
        <lfbtrt-charts :id="'charts4'" :title="'风险等级统计'" :data="djData"></lfbtrt-charts>
      </div>
      <div style="width: 49%;height: 100%;">
        <lfbtrt-charts :id="'charts5'" :title="'风险专业统计'" :data="zyData"></lfbtrt-charts>
      </div>
    </div>
  </div>
</template>
<script>
  import lfbtrtCharts from './echarts/lfbtrtCharts'
  import { getannualrisk, getannualriskspec } from '@/api/safetySupervision'
  import { getrisk_by_grade_year, getrisk_type_year } from '@/api/safetySupervision2'
  export default {
    data() {
      return {
        djData:[],
        zyData:[]
      }
    },
    components: {
      lfbtrtCharts
    },
    mounted() {
      // this.getannualrisk() //等级
      // this.getannualriskspec() //专业
      this.getrisk_by_grade_year() //等级
      this.getrisk_type_year() //专业
    },
    methods: {
      // request1
      // 等级
      getannualrisk() {
        getannualrisk().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.djData = data.data.map(item => {
                return {
                  value:item.number,
                  name:item.risk_level
                }
              })
            }
          }
        })
      },
      // 专业
      getannualriskspec() {
        getannualriskspec().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.zyData = data.data.map(item => {return {value:item.number,name:item.risk_speciality}})
            }
          }
        })
      },
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
      // 专业
      getrisk_type_year() {
        getrisk_type_year().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.zyData = data.data.map(item => {return {value:parseFloat(item.value),name:item.indicator_name}})
            }
          }
        })
      }
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