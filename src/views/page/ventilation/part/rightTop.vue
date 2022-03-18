<template>
  <div
    style="width: 100%;height: 100%;padding: .104167rem /* 20/192 */;padding-top: .15625rem /* 30/192 */;box-sizing: border-box;">
    <right-bot-stack :xValue="xValue" :yValue1="yValue1" :yValue2="yValue2" :yValue3="yValue3" :yValue4="yValue4"
      :yValue5="yValue5" :yValue6="yValue6"></right-bot-stack>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import rightBotStack from '../echart/rightBotStack'
  import { getGasHistory } from '@/api/ventilation'
  export default {
    data() {
      return {
        xValue: [],
        yValue1: [],
        yValue2: [],
        yValue3: [],
        yValue4: [],
        yValue5: [],
        yValue6: []
      }
    },
    mounted() {
      this.getGasHistory()
    },
    components: {
      rightBotStack
    },
    methods: {
      getGasHistory() {
        getGasHistory().then(data => {
          if (data && data.success) {
            this.xValue = []
            this.yValue1 = []
            this.yValue2 = []
            this.yValue3 = []
            this.yValue4 = []
            this.yValue5 = []
            this.yValue6 = []
            if (data.data.length) {
              data.data.forEach(item => {
                let dateTime = this.formData(item['date_sub(curdate() , interval 7 day)']).split(' ')[0]
                if (this.xValue.indexOf(dateTime) < 0) {
                  this.xValue.push(dateTime)
                }
                if (item.location == '上寺头' && item.method == '风排') {
                  this.yValue1.push(parseFloat(item.amount))
                } else if (item.location == '塔里' && item.method == '风排') {
                  this.yValue2.push(parseFloat(item.amount))
                } else if (item.location == '上寺头' && item.method == '抽放') {
                  this.yValue3.push(parseFloat(item.amount))
                } else if (item.location == '塔里' && item.method == '抽放') {
                  this.yValue4.push(parseFloat(item.amount))
                }
              })
              this.xValue.forEach((item, index) => {
                this.yValue5.push(this.yValue1[index] + this.yValue2[index] + this.yValue3[index] + this.yValue4[index])  //求和
                this.yValue6.push(parseInt(((this.yValue3[index] + this.yValue4[index]) / (this.yValue1[index] + this.yValue2[index])) * 100)) // 百分比--抽放/风排
              })
            }
          }
        })
      },

      formData(date) {
        let s = new Date(date)
        let y = s.getFullYear()
        let m = (s.getMonth() + 1) < 10 ? '0' + (s.getMonth() + 1) : (s.getMonth() + 1)
        let dd = s.getDate() < 10 ? '0' + s.getDate() : s.getDate()
        let hh = s.getHours() < 10 ? '0' + s.getHours() : s.getHours()
        let mm = s.getMinutes() < 10 ? '0' + s.getMinutes() : s.getMinutes()
        let ss = s.getSeconds() < 10 ? '0' + s.getSeconds() : s.getSeconds()
        let enddate = y + '-' + m + '-' + dd + ' ' + hh + ':' + mm + ":" + ss
        return enddate
      }
    },
  }
</script>
<style scoped>

</style>