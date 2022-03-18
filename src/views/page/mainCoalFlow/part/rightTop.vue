<doc>
  产量分析
</doc>
<template>
  <div class="box">
    <p class="title">产量分析</p>
    <div class="top">
      <span> 本月总产量 <span class="num">{{aggregate| numberToCurrency}}</span> 吨 </span>
      <bar-echarts></bar-echarts>
    </div>
  </div>
  
</template>
<script>
  import '../../../../utils/flexible.js'
  import barEcharts from '@/views/page/mainCoalFlow/part/echarts/barEcharts'
  import { outputAnalyse,outputAnalyse2 } from "@/api/output";

  export default {

    components: {
      barEcharts
    },
    data(){
      return{
        aggregate:'--',
      }

    },
    mounted(){
       this.output1()    
      
    },
    methods:{
        output1(){
            outputAnalyse().then(res => {
               // console.log('本月总产量-------> ', res)
                if (res && res.success) {
                  this.aggregate=res.data[0]['value']
                }else{
                  this.aggregate= '--'
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
    text-shadow: 0 0 .052083rem /* 10/192 */ #00FFFF;
    padding-left: .052083rem /* 10/192 */;
  }

  .top {
    margin-top: .052083rem /* 10/192 */;
    color: #fff;
    text-align: center;
    font-size: .067708rem /* 13/192 */;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .num {
    border: .015625rem /* 3/192 */ solid #00aad1;
    font-size: .104167rem /* 20/192 */;
    padding: 0 .078125rem /* 15/192 */;
    color: #0093f1;
    font-weight: 650;
    font-family: "ysbth";
  }
</style>