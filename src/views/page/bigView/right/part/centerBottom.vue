<doc>
  10m 大屏 右侧中间下部
</doc>
<template>
  <div class="box">
  <p class="title">矿井区域安全风险管控统计</p>
  <div class="content">
    <bar-eacherts-two :list="list"></bar-eacherts-two>
  </div>
  </div>
</template>
<script>
  import barEachertsTwo from '@/views/page/bigView/right/echarts/barEachertsTwo'
  // import { riskarea } from "@/api/screenInterface";
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
      // this.getRiskarea()
      this.riskAreaLevel()
    },
    methods: {
      // request2
      // 本月风险管控按区域统计
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


      // request1
      // getRiskarea() {
      //   riskarea().then( res => {
      //     if (res && res.success) {
      //       this.monthData = res.data
      //     } else {
      //       this.monthData = []
      //     }
      //   })
      // }
    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }
  
  .title {
    font-size: .083333rem /* 16/192 */;
    color: #00FFFF;
    text-align: center;
    height: .15625rem /* 30/192 */;
    line-height: .15625rem /* 30/192 */;
    font-weight: 650;
    /* text-shadow: 0rem 0rem .052083rem #00FFFF; */
    background: url("../../../../../assets/img/bigView/title-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .content {
    width: 100%;
    height: calc(100% - .15625rem);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>