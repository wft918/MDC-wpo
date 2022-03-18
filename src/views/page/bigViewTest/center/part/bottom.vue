<doc>
  10m 大屏 中下
</doc>
<template>
  <div class="box">
    <div class="lg"></div>
    <div class="item">
      <p class="title">籽煤仓</p>
      <div class="mc">
        <coal-bunker :weight="totalCapacity1" :currCapacity="currCapacity1"></coal-bunker>
      </div>
    </div>
    <div class="item">
      <p class="title">末精煤仓</p>
      <div class="mc">
        <coal-bunker :weight="totalCapacity2" :currCapacity="currCapacity2"></coal-bunker>
      </div>
    </div>
    <div class="item">
      <p class="title">末原煤棚</p>
      <div class="mc">
        <coal-bunker :weight="totalCapacity3" :currCapacity="currCapacity3"></coal-bunker>
      </div>
    </div>
    <div class="item">
      <p class="title">煤泥棚</p>
      <div class="mc">
        <coal-bunker :weight="totalCapacity4" :currCapacity="currCapacity4"></coal-bunker>
      </div>
    </div>
    <div class="item">
      <p class="title">小块仓</p>
      <div class="mc">
        <coal-bunker :weight="totalCapacity5" :currCapacity="currCapacity5"></coal-bunker>
      </div>
    </div>
    <div class="item">
      <p class="title">中块仓</p>
      <div class="mc">
        <coal-bunker :weight="totalCapacity6" :currCapacity="currCapacity6"></coal-bunker>
      </div>
    </div>
  </div>
</template>
<script>
  import coalBunker from '@/views/page/bigViewTest/center/components/coalBunker'
  import { bunkerWeight, bunkerMeter } from '@/api/bigView2'

  export default {
    components: {
      coalBunker,
    },
    data() {
      return {
        currCapacity1: 0,
        totalCapacity1: 0,
        currCapacity2: 0,
        totalCapacity2: 0,
        currCapacity3: 0,
        totalCapacity3: 0,
        currCapacity4: 0,
        totalCapacity4: 0,
        currCapacity5: 0,
        totalCapacity5: 0,
        currCapacity6: 0,
        totalCapacity6: 0,
      }
    },
    mounted() {
      this.getBunkerWeight()
      this.bunkerMeter()
    },
    methods: {
      // 获取仓量
      getBunkerWeight() {
        bunkerWeight().then(data => {
          if (data && data.success) {
            if (data.data.length > 0) {
              data.data.forEach(element => {
                switch (element.bunker_name) {
                  case '末精煤仓':
                    this.totalCapacity2 = element.weight
                    break;
                  case '小块仓':
                    this.totalCapacity5 = element.weight
                    break;
                  case '中块仓':
                    this.totalCapacity6 = element.weight
                    break;
                  case '籽煤仓':
                    this.totalCapacity1 = element.weight
                    break;
                  case '末原煤棚':
                    this.totalCapacity3 = element.weight
                    break;
                  default:
                    this.totalCapacity4 = element.weight
                    break;
                }
              });
            }
          }
        })
      },

      // 获取仓位
      bunkerMeter() {
        bunkerMeter().then(data => {
          if (data && data.success) {
            if (data.data.length > 0) {
              data.data.forEach(element => {
                switch (element.bunker_name) {
                  case '末精煤仓':
                    this.currCapacity2 = element.meter
                    break;
                  case '小块仓':
                    this.currCapacity5 = element.meter
                    break;
                  case '中块仓':
                    this.currCapacity6 = element.meter
                    break;
                  case '籽煤仓':
                    this.currCapacity1 = element.meter
                    break;
                  case '末原煤棚':
                    this.currCapacity3 = element.meter
                    break;
                  default:
                    this.currCapacity4 = element.meter
                    break;
                }
              })
            }
          }
        })
      }
    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .item {
    width: 16%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .mc {
    width: 75%;
    height: 85%;
  }

  .title {
    top: 0;
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: .078125rem
      /* 15/192 */
    ;
  }

  .lg {
    position: absolute;
    width: 100%;
    height: 20%;
    background-color: aliceblue;
    z-index: 2;
    bottom: 1%;
    background: url("../../../../../assets/img/bigView/lg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>