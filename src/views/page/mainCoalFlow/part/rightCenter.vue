<doc>
  成本分析
</doc>
<template>
  <div class="box">
    <p class="title">成本分析</p>
    <!-- <div class="top" style="background-color: red;">
      <span> 上月总成本 <span class="num">{{cost| numberToCurrency}}</span> 元 </span>
      <div class="content">
        <div>
          <bar-echart-two></bar-echart-two>
        </div>
        <div>
          <bar-echart-three></bar-echart-three>
        </div>
      </div>
    </div> -->
    <div style="width: 100%;height: calc(100% - .130208rem);display: flex;flex-direction: column;justify-content: space-between;">
      <div style="width: 100%;height: .130208rem;display: flex;justify-content: center;align-items: center;color: #fff;">
        <div>上月总成本</div>
        <div class="num">{{cost| numberToCurrency}}</div>
        <div>元</div>
      </div>
      <div style="width: 100%;height: calc(100% - .15625rem);display: flex;">
        <div style="width: 50%;height: 100%;">
          <bar-echart-two></bar-echart-two>
        </div>
        <div style="width: 50%;height: 100%;">
          <bar-echart-three></bar-echart-three>
        </div>
      </div>
    </div>
  </div>
 
</template>
<script>
  import '../../../../utils/flexible.js'
  import barEchartTwo from '@/views/page/mainCoalFlow/part/echarts/barEchartTwo'
  import barEchartThree from '@/views/page/mainCoalFlow/part/echarts/barEchartThree'
  import { costAnalyse,costAnalyse2 } from "@/api/output";

  export default {
    components: {
      barEchartTwo,
      barEchartThree
    },
    data(){
      return{
        cost:'--',
      }

    },
    mounted(){
      this.constAnay1()
     
    },
    methods:{
       
       constAnay1(){
           costAnalyse().then(res => {
                if (res && res.success) {
                  this.cost=res.data[0]['sum(`value`)']
                }else{
                  this.cost='--'
                }
            })
       },
   
      

    }

  }
</script>
<style scoped>
  .box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
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
    width: 100%;
    height: 100%;
    margin-top: .052083rem /* 10/192 */;
    color: #fff;
    text-align: center;
    font-size: .067708rem /* 13/192 */;
    display: flex;
    flex-direction:column
  }
  .num {
    border: .015625rem /* 3/192 */ solid #00aad1;
    font-size: .104167rem /* 20/192 */;
    padding: 0 .078125rem /* 15/192 */;
    color: #ebc601;
    font-weight: 650;
    font-family: "ysbth";
    margin: 0 .052083rem;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .content > div {
    width: 50%;
    height: 100%;
  }
</style>