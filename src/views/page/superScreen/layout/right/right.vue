<template>
  <div style="width: 100%;height: 100%;">
    <!-- 安全title -->
    <div style="width: 100%;height: .182292rem;position: relative;">
      <span style="color: #fff;text-shadow: 0rem 0rem .052083rem #00FFFF;position: absolute;top: 10px;font-size: 14px;">安全</span>
      <img style="position: absolute;top: 13px;left: 3%;" src="../../../../../assets/img/system/side.png" alt="">
      <div style="position: absolute;top: 0;right: 0;">
        <span style="color: #fff;">当班入井总人数</span>
        <span style="color: #1890ff;">100</span>
        <span style="color: #fff;margin-left: .052083rem;">井下总人数</span>
        <span style="color: #1890ff;">234</span>
      </div>
      <div style="position: absolute;bottom: 2px;right: 0;">
        <span style="color: #fff;">带班领导</span>
        <span style="color: #fff;margin-left: .052083rem;">零点班</span>
        <span style="color: #1890ff;">李丽</span>
        <span style="color: #fff;margin-left: .052083rem;">四点班</span>
        <span style="color: #1890ff;">王东升</span>
        <span style="color: #fff;margin-left: .052083rem;">八点班</span>
        <span style="color: #1890ff;">陈琳</span>
      </div>
    </div>
    <!-- conten -->
    <div style="width: 98%;height: calc(100% - .182292rem);margin: 0 auto;">
      <!-- 上 -->
      <div style="width: 100%;height: 20%;">
        <!-- 生产指标title -->
        <div class="sczb" style="width: 100%;height: .15625rem;line-height: .15625rem;text-align: center;color: #fff;font-weight: 600;text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;font-size: 15px;">本月安全风险管控统计</div>
        <div style="width: 100%;height: calc(100% - .15625rem);display: flex;justify-content: space-around;align-items: center;">
          <div style="width: 18%;height: 80%;border: 1px solid #025389;box-sizing: border-box;background-color: rgba(2, 83, 137, .3);text-align: center;display: flex;justify-content: center;align-items: center;">
            <div>
              <p style="color: #fff;font-family: ysbth;font-size: 35px;">244</p>
              <p style="color: #fff;font-size: 14px;">风险总数</p>
            </div>
          </div>
          <div style="width: 18%;height: 80%;border: 1px solid #025389;box-sizing: border-box;background-color: rgba(2, 83, 137, .3);text-align: center;display: flex;justify-content: center;align-items: center;">
            <div>
              <p style="color: #fb0045;font-family: ysbth;font-size: 35px;">75</p>
              <p style="color: #fb0045;font-size: 14px;">重大风险</p>
            </div>
          </div>
          <div style="width: 18%;height: 80%;border: 1px solid #025389;box-sizing: border-box;background-color: rgba(2, 83, 137, .3);text-align: center;display: flex;justify-content: center;align-items: center;">
            <div>
              <p style="color: #ff7d00;font-family: ysbth;font-size: 35px;">62</p>
              <p style="color: #ff7d00;font-size: 14px;">较大风险</p>
            </div>
          </div>
          <div style="width: 18%;height: 80%;border: 1px solid #025389;box-sizing: border-box;background-color: rgba(2, 83, 137, .3);text-align: center;display: flex;justify-content: center;align-items: center;">
            <div>
              <p style="color: #facc14;font-family: ysbth;font-size: 35px;">83</p>
              <p style="color: #facc14;font-size: 14px;">一般风险</p>
            </div>
          </div>
          <div style="width: 18%;height: 80%;border: 1px solid #025389;box-sizing: border-box;background-color: rgba(2, 83, 137, .3);text-align: center;display: flex;justify-content: center;align-items: center;">
            <div>
              <p style="color: #0099fc;font-family: ysbth;font-size: 35px;">24</p>
              <p style="color: #0099fc;font-size: 14px;">低风险</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 中 -->
      <div style="width: 100%;height: 35%;display: flex;justify-content: space-between;">
        <!-- 左侧 -->
        <div style="width: 35%;height: 100%;">
          <!-- 生产指标title -->
          <div class="sczb" style="width: 100%;height: .15625rem;line-height: .15625rem;text-align: center;color: #fff;font-weight: 600;text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;font-size: 15px;">本月风险管控类别评估</div>
          <div style="width: 100%;height: calc(100% - .15625rem);display: flex;justify-content: space-around;align-items: center;">
            <cen-left-radar></cen-left-radar>
          </div>
        </div>
        <!-- 右侧 -->
        <div style="width: 63%;height: 100%;">
          <!-- 生产指标title -->
          <div class="sczb" style="width: 100%;height: .15625rem;line-height: .15625rem;text-align: center;color: #fff;font-weight: 600;text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;font-size: 15px;">风险实时监测</div>
          <div style="width: 100%;height: calc(100% - .15625rem);padding: 10px 0;box-sizing: border-box;">
            <!-- 表格 -->
            <div style="width: 100%;height: 40px;;display: flex;justify-content: space-between;line-height: 40px;text-align: center;color: #95b5d5;background-color: rgba(0, 184, 255, 0.3);">
              <div style="width: 33.3%;height: 100%;">设备区域/时间</div>
              <div style="width: 33.3%;height: 100%;">告警类型</div>
              <div style="width: 33.3%;height: 100%;">告警等级</div>
            </div>
            <div style="width: 100%;height: calc(100% - 40px);overflow: auto;">
              <div :class="{'tableContent':currentIndex == index}" @mouseenter="tableEnter(index)" @mouseleave="tableLeave" v-for="(item,index) in tabelList" :key="index" style="width: 100%;height: 40px;;display: flex;justify-content: space-between;text-align: center;background-color: rgba(0, 184, 255, 0.1);border-bottom: 1px solid #04395f;">
                <div style="width: 33.3%;height: 100%;">
                  <p style="color: #74889c;margin-top: 3px;">{{item.name}}</p>
                  <p style="color: #74889c;">{{item.date}}</p>
                </div>
                <div style="width: 33.3%;height: 100%;color: #fff;font-family: ysbth;line-height: 40px;font-size: 16px;">
                  {{item.type}}
                </div>
                <div style="width: 33.3%;height: 100%;line-height: 40px;font-family: ysbth;font-size: 16px;" :style="{'color':item.dj == '一级'?'#c50743':item.dj == '二级'?'#ea7504':item.dj == '三级'?'#bfa00e':'#0088e0'}">
                  {{item.dj}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 下 -->
      <div style="width: 100%;height: 45%;display: flex;justify-content: space-between;">
        <!-- 左侧 -->
        <div style="width: 35%;height: 100%;">
          <!-- 生产指标title -->
          <div class="sczb" style="width: 100%;height: .15625rem;line-height: .15625rem;text-align: center;color: #fff;font-weight: 600;text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;font-size: 15px;">井下人员区域分布</div>
          <div style="width: 100%;height: calc(100% - .15625rem);display: flex;justify-content: space-around;align-items: center;">
            <bot-left-bar></bot-left-bar>
          </div>
        </div>
        <!-- 右侧 -->
        <div style="width: 63%;height: 100%;">
          <!-- 生产指标title -->
          <div class="sczb" style="width: 100%;height: .15625rem;line-height: .15625rem;text-align: center;color: #fff;font-weight: 600;text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;font-size: 15px;">本月区域安全风险管控统计</div>
          <div style="width: 100%;height: calc(100% - .15625rem);padding: 10px 0;box-sizing: border-box;">
            <bot-right-bar></bot-right-bar>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>
<script>
  // import '@/utils/flexible.js'
  import cenLeftRadar from './chart/cenLeftRadar'
  import botLeftBar from './chart/botLeftBar'
  import botRightBar from './chart/botRightBar'
  export default {
    data() {
      return {
        currentIndex:null,
        tabelList:[
          {
            date:'2020-02-12 18:00:00',
            name:'1号矿井皮带巷',
            type:'告警类型',
            dj:'一级'
          },
          {
            date:'2020-02-12 18:00:00',
            name:'1号矿井皮带巷',
            type:'告警类型',
            dj:'二级'
          },
          {
            date:'2020-02-12 18:00:00',
            name:'1号矿井皮带巷',
            type:'告警类型',
            dj:'三级'
          },
          {
            date:'2020-02-12 18:00:00',
            name:'1号矿井皮带巷',
            type:'告警类型',
            dj:'四级'
          },
        ]
      }
    },
    components: {
      cenLeftRadar,
      botLeftBar,
      botRightBar
    },
    methods: {
      tableEnter(index) {
        this.currentIndex = index
      },
      tableLeave() {
        this.currentIndex = null
      }
    },
  }
</script>
<style scoped>
  .sczb {
    background-image: url(../../../../../assets/img/superScreen/titleBg1.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .tableContent {
    background-color: #015e95!important;
  }
</style>