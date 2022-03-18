<doc>
  本月区域安全风险统计
</doc>
<template>
  <div class="box">
    <p class="title">矿井区域安全风险管控统计</p>
    <bar-eacherts-two :list="list"></bar-eacherts-two>
  </div>
</template>
<script>
  import barEachertsTwo from '@/views/page/bigView/right/echarts/barEachertsTwo'
  import { riskAreaLevel } from '@/api/bigView2'
  export default {
    components: {
      barEachertsTwo,
    },
    data() {
      return {
        list: []
      }
    },
    mounted() {
      this.riskAreaLevel()
    },
    methods: {
      riskAreaLevel() {
        riskAreaLevel().then(data => {
          if(data && data.success) {
            this.list = []
            let result = []
            if(data.data.length) {
              const names = [...new Set(data.data.map(item => item.areaname))]
              names.forEach(name => {
                const map = {
                  name,
                  '低风险': null,
                  '一般风险': null,
                  '较大风险': null,
                  '重大风险': null,
                  total: 0
                }
                let currentData = data.data.filter(item => item.areaname == name)
                currentData.forEach(arr => {
                  if(arr.level == '低风险') map['低风险'] = parseFloat(arr.value)
                  if(arr.level == '一般风险') map['一般风险'] = parseFloat(arr.value)
                  if(arr.level == '较大风险') map['较大风险'] = parseFloat(arr.value)
                  if(arr.level == '重大风险') map['重大风险'] = parseFloat(arr.value)
                })
                map.total = map['低风险'] + map['一般风险'] + map['较大风险'] + map['重大风险']
                result.push(map)
              })
              this.list = result.sort((a, b) => b.total - a.total).slice(0,10).sort((a, b) => a.total - b.total)
            }
          }
        })
      },
    },
  }
</script>
<style scoped>
  .box {
    height: 100%;
    display: flex;
    flex-direction: column
  }

  .title {
    color: #00FFFF;
    font-size: .072917rem /* 14/192 */;
    line-height: .072917rem /* 14/192 */;
    font-weight: 650;
    text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;
    padding-left: .052083rem /* 10/192 */;
  }
</style>