<template>
  <div style="width: 100%;height: 100%;padding: .104167rem /* 20/192 */;padding-top: .260417rem;box-sizing: border-box;">
    <div style="width: 80%;height: .234375rem;margin: 0 auto;display: flex;line-height: .234375rem;color: #fff;font-size: .072917rem;">
      <div style="width: 50%;height: 100%;">
        <span>实时上寺头通风阻力</span>
         <span style="color: #3187ff;">{{sstStr}} Pa</span>
      </div>
      <div style="width: 50%;height: 100%;padding-right: .052083rem;"><span style="float: right;"><span>实时塔里通风阻力</span> <span style="color: #3187ff;">{{tlStr}} Pa</span></span></div>
    </div>
    <div style="width: 100%;height: calc(100% - .234375rem);">
      <ltbt-line :id="'ltbtLine'" :xValue="xValue" :yValue1="yValue1" :yValue2="yValue2"></ltbt-line>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import ltbtLine from '../echart/leftBotLine'
  import { getTongfengZuli,getTongfengZuliHistory } from '@/api/ventilation'
  export default {
    data() {
      return {
        sstStr:'--',
        tlStr:'--',
        xValue:[],
        yValue1:[],
        yValue2:[]
      }
    },
    components: {
      ltbtLine
    },
    mounted() {
      this.getTongfengZuli()
      this.getTongfengZuliHistory()
    },
    methods: {
      // 通风阻力
      getTongfengZuli() {
        getTongfengZuli().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              data.data.forEach(item => {
                if(item.l == '上寺头') {
                  this.sstStr = item.v
                }else if(item.l == '塔里') {
                  this.tlStr = item.v
                }
              })
            }
          }
        })
      },
      // 历史风阻
      getTongfengZuliHistory() {
        getTongfengZuliHistory().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              data.data.forEach(item => {
                let statTime = item.stat_time.split(' ')[1].split(':').slice(0,2).join(':')
                if(this.xValue.indexOf(statTime) < 0) {
                  this.xValue.push(statTime)
                }
                if(item.ext_1 == '上寺头') {
                  this.yValue2.push(parseFloat(item.value))
                }else if(item.ext_1 == '塔里') {
                  this.yValue1.push(parseFloat(item.value))
                }
              })
            }
          }
        })
      }
    },
  }
</script>