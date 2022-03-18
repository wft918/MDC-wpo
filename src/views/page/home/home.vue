<doc>
  首页
</doc>
<template>
  <div class="box">
    <div class="ltrt"></div>
    <div class="center">
      <div class="top">
        <p class="title">智能化综合应用</p>
        <img class="img" src="../../../assets/img/home/title.png" alt="">
        <div class="top-content">
          <div v-if="hasPermission('BIG_VIEW')" class="item" @click="toSystem('screen')">
            <img src="../../../assets/img/home/ddzx.png" class="logo" alt="">
            <p class="name">调度中心大屏</p>
          </div>
          <div v-if="cockpits.length" class="item" @click="toCockpit(cockpits)">
            <img src="../../../assets/img/home/gljsc.png" class="logo" alt="">
            <p class="name">管理驾驶舱</p>
          </div>
          <div v-if="hasPermission('MAINCOALFLOW_DEPARTMENT')" class="item" @click="toSystem('/index')">
            <img src="../../../assets/img/home/zml.png" class="logo" alt="">
            <p class="name">主煤流协同经济运行</p>
          </div>
          <div v-if="hasPermission('GIS')" class="item" @click="toSubsystem(18,'')">
            <img src="../../../assets/img/home/gis.png" class="logo" alt="">
            <p class="name">GIS一张图</p>
          </div>
          <div v-if="hasPermission('VIDEO_MONITOR')" class="item" @click="toSystem('/monitor')">
            <img src="../../../assets/img/home/jk.png" class="logo" alt="">
            <p class="name">视频监控</p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <p class="title">专项应用</p>
        <img class="img" src="../../../assets/img/home/title.png" alt="">
        <div class="bottom-content">
          <div class="left">
            <p class="bottom-name">
              <img class="left-img" src="../../../assets/img/home/left.png" alt="">
              生产控制类应用
              <img class="left-img" src="../../../assets/img/home/right.png" alt="">
            </p>
            <div class="bottom-part">
              <div class="bottom-part-item">
                <div v-if="hasPermission('COAL_SUBSYSTEM')" class="item" @click="toSubsystem(1,'综采工作面')">
                  <img src="../../../assets/img/home/cmgzmjk.png" class="logo" :class="{'no-use':!subsystemCoal || !subsystemCoal.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemCoal || !subsystemCoal.length}">综采工作面</p>
                </div>
                <div v-if="hasPermission('DRIVING_SUBSYSTEM')" class="item" @click="toSubsystem(2,'综掘工作面')">
                  <img src="../../../assets/img/home/jjgzmjk.png" class="logo" :class="{'no-use':!subsystemDriving || !subsystemDriving.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemDriving || !subsystemDriving.length}">综掘工作面</p>
                </div>
                <div v-if="hasPermission('MAIN_SUBSYSTEM')" class="item" @click="toSubsystem(3,'主煤流集控系统')">
                  <img src="../../../assets/img/home/zysjk.png" class="logo" :class="{'no-use':!subsystemMain || !subsystemMain.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemMain || !subsystemMain.length}">主煤流集控系统</p>
                </div>
                <div v-if="hasPermission('WIND_SUBSYSTEM')" class="item" @click="toSubsystem(4,'通风系统')">
                  <img src="../../../assets/img/home/ztfjk.png" class="logo" :class="{'no-use':!subsystemWind || !subsystemWind.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemWind || !subsystemWind.length}">通风系统</p>
                </div>
                <div v-if="hasPermission('ELECTRIC_SUBSYSTEM')" class="item" @click="toSubsystem(5,'供电系统')">
                  <img src="../../../assets/img/home/zngd.png" class="logo" :class="{'no-use':!subsystemElectric || !subsystemElectric.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemElectric || !subsystemElectric.length}">供电系统</p>
                </div>
                <div v-if="hasPermission('WATER_SUBSYSTEM')" class="item" @click="toSubsystem(6,'排水系统')">
                  <img src="../../../assets/img/home/zpsjk.png" class="logo" :class="{'no-use':!subsystemWater || !subsystemWater.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemWater || !subsystemWater.length}">排水系统</p>
                </div>
              </div>
              <div class="bottom-part-item">
                <div v-if="hasPermission('MACHINE_SUBSYSTEM')" class="item" @click="toSubsystem(7,'压风机房巡检机器人')">
                  <img src="../../../assets/img/home/yfjk.png" class="logo" :class="{'no-use':!subsystemMachine || !subsystemMachine.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemMachine || !subsystemMachine.length}">压风机房巡检机器人</p>
                </div>
                <div v-if="hasPermission('DIAGNOSIS_SUBSYSTEM')" class="item" @click="toSubsystem(8,'大型设备在线监测与故障智能诊断')">
                  <img src="../../../assets/img/home/zxjc.png" class="logo" :class="{'no-use':!subsystemDiagnosis || !subsystemDiagnosis.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemDiagnosis || !subsystemDiagnosis.length}">大型设备在线监测与故障智能诊断</p>
                </div>
                <div v-if="hasPermission('WASH_SUBSYSTEM')" class="item" @click="toSubsystem(9,'洗选系统')">
                  <img src="../../../assets/img/home/znxx.png" class="logo" :class="{'no-use':!subsystemWash || !subsystemWash.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemWash || !subsystemWash.length}">洗选系统</p>
                </div>
                <div v-if="hasPermission('SEWAGE_SUBSYSTEM')" class="item" @click="toSubsystem(10,'智能污水处理')">
                  <img src="../../../assets/img/home/wscl.png" class="logo" :class="{'no-use':!subsystemSewage || !subsystemSewage.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemSewage || !subsystemSewage.length}">智能污水处理</p>
                </div>
                <div v-if="hasPermission('VEHICLE_SUBSYSTEM')" class="item" @click="toSubsystem(11,'铁路智能装车')">
                  <img src="../../../assets/img/home/znzc.png" class="logo" :class="{'no-use':!subsystemVehicle || !subsystemVehicle.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemVehicle || !subsystemVehicle.length}">铁路智能装车</p>
                </div>
                <div v-if="hasPermission('TRANSPORT_SUBSYSTEM')" class="item" @click="toSubsystem(12,'汽车智能装运')">
                  <img src="../../../assets/img/home/znzy.png" class="logo" :class="{'no-use':!subsystemTransport || !subsystemTransport.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemTransport || !subsystemTransport.length}">汽车智能装运</p>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <p class="bottom-name">
              <img class="right-img" src="../../../assets/img/home/left.png" alt="">
              安全监测类应用
              <img class="right-img" src="../../../assets/img/home/right.png" alt="">
            </p>
            <div class="bottom-part">
              <div class="bottom-part-item">
                <div v-if="hasPermission('SAFETYMONITORING_SUBSYSTEM')" class="item" @click="toSubsystem(13,'')">
                  <img src="../../../assets/img/home/aqjk.png" class="logo" alt="">
                  <p class="name">安全监控</p>
                </div>
                <div v-if="hasPermission('LOCATION_SUBSYSTEM')" class="item" @click="toSubsystem(14,'人员定位')">
                  <img src="../../../assets/img/home/rydw.png" class="logo" :class="{'no-use':!subsystemLocation || !subsystemLocation.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemLocation || !subsystemLocation.length}">人员定位</p>
                </div>
              </div>
              <div class="bottom-part-item">
                <div v-if="hasPermission('GAS_SUBSYSTEM')" class="item" @click="toSubsystem(15,'瓦斯预警')">
                  <img src="../../../assets/img/home/wsyj.png" class="logo" :class="{'no-use':!subsystemGas || !subsystemGas.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemGas || !subsystemGas.length}">瓦斯预警</p>
                </div>
                <div v-if="hasPermission('ROOF_SUBSYSTEM')" class="item" @click="toSubsystem(16,'顶板灾害预警')">
                  <img src="../../../assets/img/home/dbzhyj.png" class="logo" :class="{'no-use':!subsystemRoof || !subsystemRoof.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemRoof || !subsystemRoof.length}">顶板灾害预警</p>
                </div>
                <div v-if="hasPermission('CONTROL_SUBSYSTEM')" class="item" @click="toSubsystem(17,'安全管控')">
                  <img src="../../../assets/img/home/aqgk.png" class="logo" :class="{'no-use':!subsystemControl || !subsystemControl.length}" alt="">
                  <p class="name" :class="{'no-use':!subsystemControl || !subsystemControl.length}">安全管控</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ltrt"></div>
  </div>
</template>
<script>
  import "../../../utils/flexible.js";
  import { subSystems } from '@/mixins/subSystems'
  export default {
    data() {
      return {
        
      }
    },
    mixins: [subSystems],
    computed: {
      cockpits() {
        let departments = [{name:'COCKPIT',path:'/cockpit'},{name:'PRODUCTION_DEPARTMENT',path:'/nuggets'},{name:'VENTILATION_DEPARTMENT',path:'/ventilation'},{name:'DISPATCH_DEPARTMENT',path:'/dispatch'},{name:'INFORMATION_CENTER_DEPARTMENT',path:'/informationCenter'},{name:'ELECTROME_DEPARTMENT',path:'/electromechanical'},{name:'SAFETYSUPERVISION_DEPARTMENT',path:'/safetySupervision'}]
        return departments.filter(item => this.hasPermission(item.name))
      }
    },
    methods: {
      // 管理驾驶舱跳转
      toCockpit(cockpits) {
        if(cockpits.length === 1) {
          this.$router.replace(cockpits[0].path)
        }else {
          this.$router.replace('/cockpit')
        }
      },
      // 专项应用
      toSubsystem(num,title) {
        let system = []
        if(num == 1) {
          system = this.subsystemCoal
        }else if(num == 2) {
          system = this.subsystemDriving
        }else if(num == 3) {
          system = this.subsystemMain
        }else if(num == 4) {
          system = this.subsystemWind
        }else if(num == 5) {
          system = this.subsystemElectric
        }else if(num == 6) {
          system = this.subsystemWater
        }else if(num == 7) {
          system = this.subsystemMachine
        }else if(num == 8) {
          system = this.subsystemDiagnosis
        }else if(num == 9) {
          system = this.subsystemWash
        }else if(num == 10) {
          system = this.subsystemSewage
        }else if(num == 11) {
          system = this.subsystemVehicle
        }else if(num == 12) {
          system = this.subsystemTransport
        }else if(num == 13) {
          // url = process.env.VUE_APP_SUBSYSTEM_MONITOR
          this.$router.replace({
            path:'/safetyMonitoring'
          })
        }else if(num == 14) {
          system = this.subsystemLocation
        }else if(num == 15) {
          system = this.subsystemGas
        }else if(num == 16) {
          system = this.subsystemRoof
        }else if(num == 17) {
          system = this.subsystemControl
        }else if(num == 18) {
          // url = process.env.VUE_APP_SUBSYSTEM_GIS
          this.$router.replace({
            path:'/gischart'
          })
        }
        if (system && system.length) {
          // window.open(url, '_parent')
          this.$router.replace({
            path:'/subsystem',
            query: {
              system:JSON.stringify(system),
              title:title,
              page:'/home'
            }
          })
        }
      },
      // 智能化综合应用
      toSystem(url) {
        if(url == 'screen') {
          let path = process.env.VUE_APP_SCREEN_URL
          this.$router.push(path)
        }else {
          this.$router.push({ path: url, query: {} });
        }
      }
    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    align-items: flex-end;
  }
  .ltrt {
    width: 6%;
    height: 92%;
    background: linear-gradient(180deg, #0F3065 0%, rgba(9, 16, 28, 0.8) 100%);
    opacity: 0.4;
  }
  .center {
    width: 88%;
    height: 92%;
  }

  .top {
    /* margin-left: 10%; */
    width: 100%;
    height: 38%;
    background: url("../../../assets/img/home/top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .bottom {
    /* margin-left: 10%; */
    width: 100%;
    height: 62%;
    background: url("../../../assets/img/home/bottom.png");
    background-size: 100% 100%;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .title {
    position: absolute;
    top: .104167rem
      /* 20/192 */
    ;
    left: .520833rem
      /* 100/192 */
    ;
    font-size: .104167rem
      /* 20/192 */
    ;
    font-family: '楷体';
    font-weight: 600;
  }

  .img {
    position: absolute;
    top: .223958rem
      /* 43/192 */
    ;
    left: .46875rem
      /* 90/192 */
    ;
    width: 1.041667rem
      /* 200/192 */
    ;
  }

  .top-content {
    width: 60%;
    height: 90%;
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    padding-top: .416667rem
      /* 80/192 */
    ;
  }

  .item {
    text-align: center;
  }

  .logo {
    width: .416667rem
      /* 80/192 */
    ;
    cursor: pointer;
  }

  .name {
    margin-top: .026042rem
      /* 5/192 */
    ;
    cursor: pointer;
    font-size: .067708rem
      /* 13/192 */
    ;
    width: .625rem
      /* 120/192 */
    ;
  }

  .bottom-content {
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .left {
    height: 100%;
    width: 60%;
  }

  .right {
    height: 100%;
    width: 30%;
  }

  .bottom-name {
    margin-top: .364583rem;
    text-align: center;
    font-size: .067708rem
      /* 13/192 */
    ;
    color: #6BE7FF;
  }

  .left-img {
    width: .572917rem
      /* 110/192 */
    ;
    margin: 0 .078125rem
      /* 15/192 */
    ;
  }

  .bottom-part {
    height: calc(100% - 0.520833rem);
  }

  .bottom-part-item {
    margin-top: .130208rem
      /* 25/192 */
    ;
    display: flex;
    justify-content: space-around;
    align-items: baseline;
  }

  .right-img {
    width: .572917rem
      /* 110/192 */
    ;
    margin: 0 .078125rem
      /* 15/192 */
    ;
  }

  .no-use {
    cursor: not-allowed;
    color: #787c7f;
  }
</style>
