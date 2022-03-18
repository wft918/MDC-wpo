<doc>
  关键设备能效分析
</doc>
<template>
  <div class="box">
    <div class="content">
      <div class="item">
        <progress-model :id="'e1'" :name="'采煤机开机率'" :val="value1" :unit="'%'"></progress-model>
      </div>
      <div class="item">
        <progress-model :id="'e2'" :name="'掘进机开机率'" :val="value2" :unit="'%'"></progress-model>
      </div>
      <div class="item">
        <progress-model :id="'e3'" :name="'主运皮带开机率'" :val="value3" :unit="'%'"></progress-model>
      </div>
      <div class="item">
        <progress-model :id="'e4'" :name="'水泵开机率'" :val="value4" :unit="'%'"></progress-model>
      </div>
      <div class="item">
        <progress-model :id="'e5'" :name="'空压机开机率'" :val="value5" :unit="'%'"></progress-model>
      </div>
      <div class="item">
        <progress-model :id="'e6'" :name="'主提升机开机率'" :val="value6" :unit="'%'"></progress-model>
      </div>
    </div>
  </div>
</template>
<script>
  import progressModel from '@/views/page/electromechanical/model/progressModel'
  import { deviceOperationRate } from '@/api/electromechanical2'
  export default {
    data() {
      return {
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        value5: 0,
        value6: 0,
      }
    },
    // props:['leftTopResult'],
    // watch: {
    //   leftTopResult(newVal) {
    //     if(newVal[0].success) {
    //       this.obj1 = newVal[0].data[0]
    //       this.obj2 = newVal[0].data[1]
    //       this.obj3 = newVal[0].data[2]
    //     }
    //     if(newVal[1].success) {
    //       this.value1 = newVal[1].data[0].d_water_pump_oper_rate //水泵
    //       this.value2 = newVal[1].data[0].d_air_compressor_oper_rate //空压机
    //       this.value3 = newVal[1].data[0].d_main_hoist_oper_rate //主提升机
    //     }
    //   }
    // },
    components: {
      progressModel,
    },
    mounted() {
      this.deviceOperationRate()
    },
    methods: {
      // request2
      // 关键设备效能分析
      deviceOperationRate() {
        deviceOperationRate().then(data => {
          if (data && data.success) {
            data.data.forEach(element => {
              switch (element.indicator_name) {
                case '采煤机开机率':
                  this.value1 = element["round(`value`)"]
                  break;
                case '掘进机开机率':
                  this.value2 = element["round(`value`)"]
                  break;
                case '主运皮带开机率':
                  this.value3 = element["round(`value`)"]
                  break;
                case '水泵开机率':
                  this.value4 = element["round(`value`)"]
                  break;
                case '空压机开机率':
                  this.value5 = element["round(`value`)"]
                  break;
                case '主提升机开机率':
                  this.value6 = element["round(`value`)"]
                  break;
              }
            });
          }
        })
      }
    },
  }
</script>
<style scoped>
  .box {
    height: 100%;
    color: #fff;
  }

  .content {
    height: 65%;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .item {
    width: 15%;
    height: 100%;
  }
</style>