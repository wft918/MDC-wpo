<doc>
  工效分析
</doc>
<template>
  <div class="box">
    <p class="title">工效分析</p>
    <div class="content">
      <div class="right">
        <bar-echart-four></bar-echart-four>
      </div>
      <div class="right">
        <span>上月平均人员工效 <span class="num">{{parseFloat(person).toFixed(2)}}</span> 吨/人天 </span>
        <!-- <pie-two :id="'pieThree'"></pie-two> -->
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import barEchartFour from '@/views/page/mainCoalFlow/part/echarts/barEchartFour'
  import pieTwo from '@/views/page/mainCoalFlow/part/echarts/pieTwo'
    import { Allmonitor,monitorPerson,monitorTime } from "@/api/output";
  export default {
    components: {
      barEchartFour,
      pieTwo
    },
    data(){
      return{
        person:'--'
      }
    },
    mounted(){
        
          this.monitorPer()
    },
    methods:{
   
       monitorPer(){
           monitorPerson().then(res => {
                if (res && res.success) {
                  this.person=res.data[0]['o/p']
                }else{
                   this.person= '--'
                }
            })
       },

     

    }
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

  .content {
    height: 100%;
    display: flex;
  }

  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: .067708rem /* 13/192 */;
  }

  .num {
    border: .015625rem /* 3/192 */ solid #00aad1;
    padding: 0 .026042rem /* 5/192 */;
    color: #03ac32;
    font-size: .104167rem /* 20/192 */;
    font-weight: 650;
    font-family: "ysbth";
  }
</style>