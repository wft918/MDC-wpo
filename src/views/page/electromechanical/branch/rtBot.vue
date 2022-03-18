<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .208333rem;line-height: .208333rem;padding-left: .052083rem;box-sizing: border-box;color: #03b5eb;font-size: .078125rem;">上月区域耗电量</div>
    <div style="width: 100%;height: calc(100% - .208333rem);padding: 0 .078125rem;box-sizing: border-box;">
      <rt-bot-bar :id="'rtBotBar'" :xValue="xValue" :yValue="yValue"></rt-bot-bar>
    </div>
  </div>
</template>
<script>
  import rtBotBar from './echart/rtBotBar'
  import { getEleconsEachZone } from '@/api/electromechanical3' 
  export default {
    data() {
      return {
        xValue:[],
        yValue:[]
      }
    },
    components: {
      rtBotBar
    },
    mounted() {
      this.getEleconsEachZone()
    },
    methods: {
      // 上月区域耗电量
      getEleconsEachZone() {
        getEleconsEachZone().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.xValue = []
              this.yValue = []
              data.data.forEach(item => {
                this.xValue.push(item.d_name)
                this.yValue.push(parseFloat(item.consume))
              })
            }
          }
        })
      }
    },
  }
</script>
<style scoped>

</style>