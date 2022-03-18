<doc>
  煤仓组件
</doc>
<template>
  <div class="content">
    <div class="message">
      <p class="cl">仓量</p>
      <p class="sz">{{weight}}</p>
      <p class="dw">吨</p>
    </div>
    <div class="ty" :style="{bottom: calCapacity + '%'}">
      <div class="msg">
        <p class="num">{{ currCapacity.toFixed(2) }}</p>
        <p class="unit">米</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['weight', 'title', 'currCapacity'],
    data() {
      return {
        totalCapacity: 50, // 煤仓总容量 50m
        calCapacity: 0,
        meter: 0
      }
    },
    watch: {
      currCapacity() {
        this.js()
      }
    },
    mounted() {
      this.js()
    },
    methods: {
      js() {
        if(this.title == '末原煤棚' || this.title == '煤泥棚') {
          const map = {
            '末原煤棚': 19,
            '煤泥棚': 10
          }
          this.calCapacity = parseInt((this.currCapacity / map[this.title]) * 100)
          // if(this.currCapacity < 0) {
          //   this.meter = 0
          // } else {
          //   this.meter = this.currCapacity
          // }
          // this.calCapacity = (this.meter * 77) / this.totalCapacity
        }else {
          const map = {
            '籽煤仓': 5500,
            '末精煤仓': 5500,
            '小块仓': 6800,
            '中块仓': 6200
          }
          this.calCapacity = parseInt((this.weight / map[this.title]) * 100 - 10 >= 0 ? (this.weight / map[this.title]) * 100 - 10 : 0)
        }
      }
    },
  }
</script>
<style scoped>
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    background: url("../../../../../assets/img/bigView/mc.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .ty {
    width: 100%;
    height: 14%;
    background: url("../../../../../assets/img/bigView/ty.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
  }

  .message {
    position: absolute;
    top: 0;
    width: 100%;
    height: 22%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .cl {
    font-size: .072917rem /* 14/192 */;
    font-weight: 600;
    color: #000;
  }

  .sz {
    font-family: "ysbth";
    font-size: .09375rem /* 18/192 */;
    color: #1f4573;
  }

  .dw {
    color: #1f4573
  }

  .msg {
    position: absolute;
    border-bottom: 3px dashed #0099fd;
    width: 75%;
    height: 100%;
    bottom: 1%;
    right: -25%;
    text-align: right;
    z-index: 2;
  }

  .num {
    font-family: "ysbth";
    font-size: .104167rem;
    color: #fff;
  }

  .unit {
    font-size: .078125rem;
  }
</style>