<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .208333rem;line-height: .208333rem;color: #00C5FF;padding-left: .052083rem;font-size: .072917rem;">井下实时总人数</div>
    <div style="width: 100%;height: calc(100% - .208333rem);padding: .052083rem;">
      <div style="width: 1.005208rem;height: .192708rem;background: linear-gradient(360deg, #3E4C6A 0%, #2F3B53 100%);margin: 0 auto;display: flex;justify-content: center;align-items: center;">
        <div style="font-size: .072917rem;color: #fff;">井下实时总人数&nbsp;&nbsp;</div>
        <div style="font-family: ysbth;font-size: .130208rem;color: #009BFF;">{{totalPerson}}</div>
        <div style="font-size: .072917rem;color: #fff;">人</div>
      </div>
      <div style="width: 100%;height: calc(100% - .192708rem);display: flex;">
        <div style="width: 70%;height: 100%;">
          <bar :id="'ltTopId'" :xValue="xValue" :yValue="yValue" :yname="'人'" :rotate="10" :offsetX="10"></bar>
        </div>
        <div style="width: 30%;height: 100%;display: flex;justify-content: center;align-items: center;">
          <div>
            <div style="width: 1.005208rem;height: .192708rem;margin: 0 auto;text-align: center;line-height: .192708rem;color: #fff;font-size: .0625rem;">昨日人员下井情况</div>
            <div style="width: 1.005208rem;height: .192708rem;background: linear-gradient(360deg, #3E4C6A 0%, #2F3B53 100%);margin: 0 auto;display: flex;justify-content: center;align-items: center;margin-bottom: .052083rem;">
              <div style="font-size: .072917rem;color: #fff;">昨日下井总人数&nbsp;&nbsp;</div>
              <div style="font-family: ysbth;font-size: .130208rem;color: #009BFF;">{{totaldown}}</div>
              <div style="font-size: .072917rem;color: #fff;">人</div>
            </div>
            <div style="width: 1.005208rem;height: .192708rem;background: linear-gradient(360deg, #3E4C6A 0%, #2F3B53 100%);margin: 0 auto;display: flex;justify-content: center;align-items: center;margin-bottom: .052083rem;">
              <div style="font-size: .072917rem;color: #fff;">零点班&nbsp;&nbsp;</div>
              <div style="font-family: ysbth;font-size: .130208rem;color: #009BFF;">{{leaderObj.name_0}}</div>
              <div style="font-size: .072917rem;color: #fff;">人</div>
            </div>
            <div style="width: 1.005208rem;height: .192708rem;background: linear-gradient(360deg, #3E4C6A 0%, #2F3B53 100%);margin: 0 auto;display: flex;justify-content: center;align-items: center;margin-bottom: .052083rem;">
              <div style="font-size: .072917rem;color: #fff;">八点班&nbsp;&nbsp;</div>
              <div style="font-family: ysbth;font-size: .130208rem;color: #009BFF;">{{leaderObj.name_8}}</div>
              <div style="font-size: .072917rem;color: #fff;">人</div>
            </div>
            <div style="width: 1.005208rem;height: .192708rem;background: linear-gradient(360deg, #3E4C6A 0%, #2F3B53 100%);margin: 0 auto;display: flex;justify-content: center;align-items: center;margin-bottom: .052083rem;">
              <div style="font-size: .072917rem;color: #fff;">十六点班&nbsp;&nbsp;</div>
              <div style="font-family: ysbth;font-size: .130208rem;color: #009BFF;">{{leaderObj.name_4}}</div>
              <div style="font-size: .072917rem;color: #fff;">人</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import bar from './echart/bar'
  import { gettotal_person, getlast_day_down_per_shift, getlast_day_total_down, getarea_person } from '@/api/safetySupervision2'
  export default {
    data() {
      return {
        xValue:[],
        yValue:[],
        totaldown:0, //每日下井总人数
        totalPerson:0,//井下实时总人数
        leaderObj: {
          name_0:'0',
          name_4:'0',
          name_8:'0'
        }
      }
    },
    components: {
      bar
    },
    mounted() {
      this.getarea_person() //井下人员区域分布
      this.gettotal_person()
      this.getlast_day_down_per_shift() // 人员下井情况  昨日各班下井人数
      this.getlast_day_total_down() // 人员下井情况  昨日下井总人数
    },
    methods: {
      // 井下人员区域分布
      getarea_person() {
        getarea_person().then(data => {
          if(data && data.success) {
            this.xValue = []
            this.yValue = []
            if(data.data.length) {
              data.data.forEach(item => {
                this.xValue.push(item['区域'])
                this.yValue.push(parseFloat(item['人数']))
              })
            }
          }
        })
      },
      // 井下总人数
      gettotal_person() {
        gettotal_person().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.totalPerson = data.data[0].curinnum
            }
          }
        })
      },
      // 人员下井情况  每日早、中、晚班下井人数
      getlast_day_down_per_shift() {
        getlast_day_down_per_shift().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              data.data.forEach(item => {
                if(item.ext_1 == '0点班') {
                  this.leaderObj.name_0 = item.value
                }else if(item.ext_1 == '8点班') {
                  this.leaderObj.name_8 = item.value
                }else if(item.ext_1 == '4点班') {
                  this.leaderObj.name_4 = item.value
                }
              })
            }
          }
        })
      },
      // 人员下井情况  每日下井总人数
      getlast_day_total_down() {
        getlast_day_total_down().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.totaldown = data.data[0]['sum(`value`)']
            }
          }
        })
      },
    },
  }
</script>
<style scoped>

</style>