<doc>
  首页标题
</doc>
<template>
  <div class="top">
    <!-- 左 -->
    <div class="top-item left">
      <img class="logo" src="../../assets/img/system/logo.png"></img>
      <h3 class="title">王坡煤矿智能一体化管控平台</h3>
    </div>
    <!-- 中 -->
    <!-- <p class="tag">{{selectedPathName}}</p> -->
    <div class="top-item center">
      <router-link v-if="hasPermission('HOME')" :to="{path:'/home',query:{}}" style="text-decoration:none;">
        <div style="height: .286458rem;display: flex;align-items: center;">
          <div class="tab" :class='{tab1: selectedTab === "/home"}'>
            <span>主页</span>
          </div>
        </div>
      </router-link>
      <router-link v-if="hasPermission('BIG_VIEW')" :to="{path:screenPath,query:{}}" style="text-decoration:none;">
        <div style="height: .286458rem;display: flex;align-items: center;">
          <div class="tab">
            <span>调度中心大屏</span>
          </div>
        </div>
      </router-link>
      <router-link v-if="cockpits.length > 1" @click.native="dropdownisShow3 = !dropdownisShow3" :to="{path:'',query:{}}" style="text-decoration:none;">
        <div ref="cockpitTop" style="height: .286458rem;display: flex;align-items: center;">
          <div class="tab ">
            <span>管理驾驶舱</span>
          </div>
        </div>
      </router-link>
      <div v-if="cockpits.length === 1" class="tab" :class='{tab1: selectedTab === cockpits[0].path }' @click="toCockpit(cockpits[0].path)">
        <span>管理驾驶舱</span>
      </div>
      <router-link v-if="hasPermission('MAINCOALFLOW_DEPARTMENT')" :to="{path:'/index',query:{}}" style="text-decoration:none;">
        <div style="height: .286458rem;display: flex;align-items: center;">
          <div class="tab " :class='{tab1: selectedTab === "/index"}'>
            <span>主煤流协同经济运行</span>
          </div>
        </div>
      </router-link>
      <router-link v-if="productionCodes.length" @click.native="dropdownisShow1 = !dropdownisShow1" :to="{path:'',query:{}}"
        style="text-decoration:none;display: block;">
        <div ref="productionControl" style="height: .286458rem;display: flex;align-items: center;">
          <div class="tab">
            <span>生产控制</span>
          </div>
        </div>
      </router-link>
      <router-link v-if="securityCodes.length" @click.native="dropdownisShow2 = !dropdownisShow2" :to="{path:'',query:{}}"
        style="text-decoration:none;">
        <div ref="securityControl" style="height: .286458rem;display: flex;align-items: center;">
          <div class="tab ">
            <span>安全监测</span>
          </div>
        </div>
      </router-link>
      <router-link v-if="hasPermission('GIS')" :to="{path:'/gischart',query:{}}" style="text-decoration:none;">
        <div class="tab" :class="{'tab1': selectedTab === '/gischart'}">
          <span>GIS一张图</span>
        </div>
      </router-link>
      <router-link v-if="hasPermission('VIDEO_MONITOR')" :to="{path:'/monitor',query:{}}" style="text-decoration:none;">
        <div class="tab" :class="{'tab1':selectedTab == '/monitor'}">
          <span>视频监控</span>
        </div>
      </router-link>
      <router-link v-if="hasPermission('LOG_RECORD')" :to="{path:'/logRecord',query:{}}" style="text-decoration:none;">
        <div class="tab" :class="{'tab1':selectedTab == '/logRecord'}">
          <span>日志记录</span>
        </div>
      </router-link>

      <!--生产控制下拉 -->
      <transition name="el-zoom-in-top">
        <div ref="dropdownSc" v-show="dropdownisShow1" class="dropdownSc">
          <div style="width: 22%;height: 100%;">
            <div
              style="width: 100%;height: .1563rem;line-height: .1563rem;border-bottom: .0052rem solid #0070bd;text-shadow:0.5px 0.5px 1px #fff;color: #fff;font-size: .0625rem;">
              生产</div>
            <div
              style="width: 100%;height: calc(100% - .1615rem);color: #bdcbd8;font-size: .067708rem;padding-top: .026rem;box-sizing: border-box;">
              <div v-if="hasPermission('COAL_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 1,'no-use':!subsystemCoal || !subsystemCoal.length}" @click="dropdownClick(1,'综采工作面')">
                综采工作面</div>
              <div v-if="hasPermission('DRIVING_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 2,'no-use':!subsystemDriving || !subsystemDriving.length}" @click="dropdownClick(2,'综掘工作面')">
                综掘工作面</div>
              <div v-if="hasPermission('MAIN_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 3,'no-use':!subsystemMain || !subsystemMain.length}" @click="dropdownClick(3,'主煤流集控系统')">
                主煤流集控系统</div>
            </div>
          </div>
          <div style="width: 45%;height: 100%;">
            <div
              style="width: 100%;height: .1563rem;line-height: .1563rem;border-bottom: .0052rem solid #0070bd;text-shadow:0.5px 0.5px 1px #fff;color: #fff;font-size: .0625rem;">
              保障</div>
            <div
              style="width: 100%;height: calc(100% - .1615rem);color: #bdcbd8;font-size: .067708rem;padding-top: .026rem;box-sizing: border-box;">
              <div v-if="hasPermission('WIND_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 4,'no-use':!subsystemWind || !subsystemWind.length}" @click="dropdownClick(4,'通风系统')">通风系统</div>
              <div v-if="hasPermission('ELECTRIC_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 5,'no-use':!subsystemElectric || !subsystemElectric.length}" @click="dropdownClick(5,'供电系统')">供电系统
              </div>
              <div v-if="hasPermission('WATER_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 6,'no-use':!subsystemWater || !subsystemWater.length}" @click="dropdownClick(6,'排水系统')">排水系统</div>
              <div v-if="hasPermission('MACHINE_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 7,'no-use':!subsystemMachine || !subsystemMachine.length}" @click="dropdownClick(7,'压风机房巡检机器人')">
                压风机房巡检机器人</div>
              <div v-if="hasPermission('DIAGNOSIS_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 8,'no-use':!subsystemDiagnosis || !subsystemDiagnosis.length}" @click="dropdownClick(8,'大型设备在线监测与故障智能诊断')">大型设备在线监测与故障智能诊断
              </div>
            </div>
          </div>
          <div style="width: 22%;height: 100%;">
            <div
              style="width: 100%;height: .1563rem;line-height: .1563rem;border-bottom: .0052rem solid #0070bd;text-shadow:0.5px 0.5px 1px #fff;color: #fff;font-size: .0625rem;">
              洗选</div>
            <div
              style="width: 100%;height: calc(100% - .1615rem);color: #bdcbd8;font-size: .067708rem;padding-top: .026rem;box-sizing: border-box;">
              <div v-if="hasPermission('WASH_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 9,'no-use':!subsystemWash || !subsystemWash.length}" @click="dropdownClick(9,'洗选系统')">洗选系统
              </div>
              <div v-if="hasPermission('SEWAGE_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 10,'no-use':!subsystemSewage || !subsystemSewage.length}" @click="dropdownClick(10,'智能污水处理')">智能污水处理
              </div>
              <div v-if="hasPermission('VEHICLE_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 11,'no-use':!subsystemVehicle || !subsystemVehicle.length}" @click="dropdownClick(11,'铁路智能装车')">铁路智能装车
              </div>
              <div v-if="hasPermission('TRANSPORT_SUBSYSTEM')" class="txt" :class="{'currentClass':currentIndex == 12,'no-use':!subsystemTransport || !subsystemTransport.length}" @click="dropdownClick(12,'汽车智能装运')">汽车智能装运
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!--安全监测下拉 -->
      <transition name="el-zoom-in-top">
        <div ref="dropdownAq" v-show="dropdownisShow2" class="dropdownAq">
          <div>
            <p v-if="hasPermission('SAFETYMONITORING_SUBSYSTEM')" :class="{'currentClass':currentIndex == 13}" @click="dropdownClick(13, '')">安全监控</p>
            <p v-if="hasPermission('LOCATION_SUBSYSTEM')" :class="{'currentClass':currentIndex == 14,'no-use':!subsystemLocation || !subsystemLocation.length}" @click="dropdownClick(14,'人员定位')">
              人员定位</p>
          </div>
          <div>
            <p v-if="hasPermission('GAS_SUBSYSTEM')" :class="{'currentClass':currentIndex == 15,'no-use':!subsystemGas || !subsystemGas.length}" @click="dropdownClick(15,'瓦斯预警')">瓦斯预警</p>
            <p v-if="hasPermission('ROOF_SUBSYSTEM')" :class="{'currentClass':currentIndex == 16,'no-use':!subsystemRoof || !subsystemRoof.length}" @click="dropdownClick(16,'顶板灾害预警')">顶板灾害预警</p>
          </div>
          <div>
            <p v-if="hasPermission('CONTROL_SUBSYSTEM')" :class="{'currentClass':currentIndex == 17,'no-use':!subsystemControl || !subsystemControl.length}" @click="dropdownClick(17, '安全管控')">安全管控</p>
          </div>
        </div>
      </transition>
      <!--管理驾驶舱下拉 -->
      <transition name="el-zoom-in-top">
        <div ref="cockpit" v-show="dropdownisShow3" class="cockpit">
          <div style="width: 33%;height: 100%;">
            <p v-if="hasPermission('COCKPIT')" @click="dropdownCommand('/cockpit')" :class="{'currentClass':selectedTab == '/cockpit'}">矿领导</p>
            <p v-if="hasPermission('PRODUCTION_DEPARTMENT')" @click="dropdownCommand('/nuggets')" :class="{'currentClass':selectedTab == '/nuggets'}">生产部</p>
            <p v-if="hasPermission('VENTILATION_DEPARTMENT')" @click="dropdownCommand('/ventilation')" :class="{'currentClass':selectedTab == '/ventilation'}">通风部</p>
          </div>
          <div style="width: 33%;height: 100%;">
            <p v-if="hasPermission('DISPATCH_DEPARTMENT')" @click="dropdownCommand('/dispatch')" :class="{'currentClass':selectedTab == '/dispatch'}">调度中心</p>
            <p v-if="hasPermission('INFORMATION_CENTER_DEPARTMENT')" @click="dropdownCommand('/informationCenter')" :class="{'currentClass':selectedTab == '/informationCenter'}">信息中心</p>
          </div>
          <div style="width: 33%;height: 100%;">
            <p v-if="hasPermission('ELECTROME_DEPARTMENT')" @click="dropdownCommand('/electromechanical')" :class="{'currentClass':selectedTab == '/electromechanical'}">机电部</p>
            <p v-if="hasPermission('SAFETYSUPERVISION_DEPARTMENT')" @click="dropdownCommand('/safetySupervision')" :class="{'currentClass':selectedTab == '/safetySupervision'}">安监部</p>
          </div>
        </div>
      </transition>
    </div>
    <div class="msgg" v-show="showMsg">
      <div
        style="margin-right: .125rem /* 10/192 */;position: absolute;right: .052083rem /* 10/192 */;top: .026042rem /* 5/192 */;">
        <p class="msg">
          <!-- 当班入井总人数 <span class="bluee">{{num2}}</span> &nbsp;&nbsp;  -->
          井下实时人数 <span class="bluee">{{num1}}</span>
        </p>
        <p class="msg">带班领导 &nbsp;&nbsp; 零点班 <span class="bluee">{{leaderObj.name_0}}</span> &nbsp;&nbsp; 八点班 <span
            class="bluee">{{leaderObj.name_8}}</span>
          &nbsp;&nbsp; 十六点班 <span class="bluee">{{leaderObj.name_4}}</span></p>
      </div>
    </div>
    <!-- 右 -->
    <div class="top-item right">
      <span class="name">你好，{{ username }}</span>
      <img class="set" src="../../assets/img/system/set.png">
      <img class="set" src="../../assets/img/system/login.png" @click="logoutHandle()">
    </div>
  </div>
</template>
<script>
  import '../../utils/flexible.js'
  import { AuthenticationClient } from 'authing-js-sdk'
  import { totalPerson, leader } from '@/api/informationCenter2'
  import { downPerShift } from '@/api/bigView2'
  import { subSystems } from '@/mixins/subSystems'
  import { cleraLoginInfo } from '@/utils'
  import { postAuditLogs } from '@/api/logapi'
  const authenticationClient = new AuthenticationClient({
    appId: process.env.VUE_APP_APP_ID,
    appHost: process.env.VUE_APP_APP_HOST,
    token: localStorage.getItem('_authing_token')
  })
  export default {
    data() {
      return {
        dropdownisShow1: false, //生产控制下拉显隐
        dropdownisShow2: false,//安全监测下拉显隐
        dropdownisShow3: false,//管理驾驶舱下拉显隐
        currentIndex: '',
        currTab: '',
        leaderObj: {
          name_0: '--',
          name_4: '--',
          name_8: '--',
        },
        num1: '--',
        num2: '--',
        showMsg: false,
        urls: ['/cockpit','/dispatch','/nuggets','/electromechanical','/informationCenter','/safetySupervision', '/ventilation'],
      }
    },
    mixins:[subSystems],
    watch: {
      $route: {
        handler(val, oldval) {
          if(this.urls.indexOf(val.path) >= 0) {
            this.showMsg = true
          } else {
            this.showMsg = false
          }
        },
        // 深度观察监听
        deep: true
      },
    },
    computed: {
      selectedTab() {
        return this.$route.path
      },
      selectedPathName() {
        return this.$route.meta.title
      },
      username() {
        return JSON.parse(localStorage.getItem('_authing_user')).username || ''
      },
      userId() {
        return JSON.parse(localStorage.getItem('_authing_user')).id || ''
      },
      // 调度中心大屏跳转路径
      screenPath() {
        return process.env.VUE_APP_SCREEN_URL
      },
      cockpits() {
        let departments = [{name:'COCKPIT',path:'/cockpit'},{name:'PRODUCTION_DEPARTMENT',path:'/nuggets'},{name:'VENTILATION_DEPARTMENT',path:'/ventilation'},{name:'DISPATCH_DEPARTMENT',path:'/dispatch'},{name:'INFORMATION_CENTER_DEPARTMENT',path:'/informationCenter'},{name:'ELECTROME_DEPARTMENT',path:'/electromechanical'},{name:'SAFETYSUPERVISION_DEPARTMENT',path:'/safetySupervision'}]
        return departments.filter(item => this.hasPermission(item.name))
      },
      productionCodes() {
        let codes = ['COAL_SUBSYSTEM','DRIVING_SUBSYSTEM','MAIN_SUBSYSTEM','WIND_SUBSYSTEM','ELECTRIC_SUBSYSTEM','WATER_SUBSYSTEM','MACHINE_SUBSYSTEM','DIAGNOSIS_SUBSYSTEM','WASH_SUBSYSTEM','SEWAGE_SUBSYSTEM','VEHICLE_SUBSYSTEM','TRANSPORT_SUBSYSTEM']
        return codes.filter(code => this.hasPermission(code))
      },
      securityCodes() {
        let codes = ['SAFETYMONITORING_SUBSYSTEM','LOCATION_SUBSYSTEM','GAS_SUBSYSTEM','ROOF_SUBSYSTEM','CONTROL_SUBSYSTEM']
        return codes.filter(code => this.hasPermission(code))
      }
    },
    mounted() {
      this.documentClick() //监听document点击
      this.twoMenuPosition()
      if(this.urls.indexOf(this.$route.path) >= 0) {
        this.showMsg = true
      }
      this.totalPerson()
      this.leader()
      this.downPerShift()
    },
    methods: {

      // 下拉二级菜单位置
      twoMenuPosition() {
        let r1 = ['HOME','BIG_VIEW'].filter(code => this.hasPermission(code))  //管理驾驶舱
        if(r1.length == 0) this.$refs.cockpit.style.left = '-5%'
        if(r1.length == 1) this.$refs.cockpit.style.left = '0'
        let r2 = ['HOME','BIG_VIEW',this.cockpits,'MAINCOALFLOW_DEPARTMENT'].filter(item => {  //生产控制
          if(typeof item === 'string') {
            return this.hasPermission(item)
          }else if(typeof item === 'object') {
            return item.length ? true : false
          }
        })
        if(r2.length == 0) this.$refs.dropdownSc.style.left = '-5%'
        if(r2.length == 1) this.$refs.dropdownSc.style.left = '0'
        if(r2.length == 2) this.$refs.dropdownSc.style.left = '8%'
        if(r2.length == 3) this.$refs.dropdownSc.style.left = '18%'
        let r3 = ['HOME','BIG_VIEW',this.cockpits,'MAINCOALFLOW_DEPARTMENT',this.productionCodes].filter(item => {  //安全监测
          if(typeof item === 'string') {
            return this.hasPermission(item)
          }else if(typeof item === 'object') {
            return item.length ? true : false
          }
        })
        if(r3.length == 0) this.$refs.dropdownAq.style.left = '-5%'
        if(r3.length == 1) this.$refs.dropdownAq.style.left = '0'
        if(r3.length == 2) this.$refs.dropdownAq.style.left = '8%'
        if(r3.length == 3) this.$refs.dropdownAq.style.left = '18%'
        if(r3.length == 4) this.$refs.dropdownAq.style.left = '30%'
      },

      // request2
      // 井下总人数
      totalPerson() {
        totalPerson().then(data => {
          if (data && data.success && data.data.length) {
            this.num1 = data.data[0].curinnum
          }
        })
      },

      leader() {
        leader().then(data => {
          if (data && data.success && data.data.length) {
            this.leaderObj.name_0 = data.data[0]['零点班']
            this.leaderObj.name_4 = data.data[0]['四点班']
            this.leaderObj.name_8 = data.data[0]['八点班']
          }
        })
      },

      // 当班入井总人数
      downPerShift() {
        downPerShift().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.num2 = data.data[0].c
            }
          }
        })
      },
      // 管理驾驶舱下拉菜单
      dropdownCommand(path) {
        this.$router.replace(path)
      },
      // 管理驾驶舱只有一个部门
      toCockpit(path) {
        this.$router.replace(path)
      },

      // 点击document 控制下拉框收起
      documentClick() {
        document.onmousemove = (e) => {
          // 生产控制
          if (this.$refs.dropdownSc && this.$refs.productionControl) {
            let isSelf1 = this.$refs.dropdownSc.contains(e.target)
            let isSelf2 = this.$refs.productionControl.contains(e.target)
            if (!isSelf1 && !isSelf2) {
              this.dropdownisShow1 = false
              // console.log('没在生产控制里面------->>>>')
            }
          }
          // 安全监测
          if (this.$refs.dropdownAq && this.$refs.securityControl) {
            let isSelf1 = this.$refs.dropdownAq.contains(e.target)
            let isSelf2 = this.$refs.securityControl.contains(e.target)
            if (!isSelf1 && !isSelf2) {
              this.dropdownisShow2 = false
              // console.log('没在安全检测里面------->>>>')
            }
          }
          // 管理驾驶舱
          if (this.$refs.cockpit && this.$refs.cockpitTop) {
            let isSelf1 = this.$refs.cockpit.contains(e.target)
            let isSelf2 = this.$refs.cockpitTop.contains(e.target)
            if (!isSelf1 && !isSelf2) {
              this.dropdownisShow3 = false
              // console.log('没在管理驾驶舱里面------->>>>')
            }
          }
        }
      },
      // 生产控制 安全监测  模块下拉菜单
      dropdownClick(index, title) {
        this.currentIndex = index
        let system = []
        if (index == 1) {
          system = this.subsystemCoal
        } else if (index == 2) {
          system = this.subsystemDriving
        } else if (index == 3) {
          system = this.subsystemMain
        } else if (index == 4) {
          system = this.subsystemWind
        } else if (index == 5) {
          system = this.subsystemElectric
        } else if (index == 6) {
          system = this.subsystemWater
        } else if (index == 7) {
          system = this.subsystemMachine
        } else if (index == 8) {//大型设备在线监测与故障诊断
          system = this.subsystemDiagnosis
        } else if (index == 9) {
          system = this.subsystemWash
        } else if (index == 10) {
          system = this.subsystemSewage
        } else if (index == 11) {
          system = this.subsystemVehicle
        } else if (index == 12) {
          system = this.subsystemTransport
        } else if (index == 13) {
          // url = process.env.VUE_APP_SUBSYSTEM_MONITOR
          this.$router.replace({
            path: '/safetyMonitoring'
          })
        } else if (index == 14) { //人员定位
          system = this.subsystemLocation
        } else if (index == 15) {
          system = this.subsystemGas
        } else if (index == 16) {
          system = this.subsystemRoof
        } else if (index == 17) {
          system = this.subsystemControl
        }
        if (system && system.length) {
          // window.open(url, '_parent')
          this.$router.replace({
            path: '/subsystem',
            query: {
              system: JSON.stringify(system),
              title: title,
              page: '/home'
            }
          })
        }
      },
      // 退出登录
      logoutHandle() {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.replace('/login')
          // 保存登出日志
            // postAuditLogs([{
            //   user_id: this.userId,
            //   staff_id: this.userId,
            //   ip: '192.168.78.15',
            //   op_type: '6',
            //   op_desc: `${this.username}登出系统`,
            //   log_level: '一般',
            //   business_system: 'xxx'
            // }]).then(data => {
            //   if(data && data.code === 200) {
            //     authenticationClient.logout().then(() => {
            //       cleraLoginInfo()
            //       this.$router.replace('/login')
            //     })
            //   }
            // })
        })
      }
    },
  }
</script>
<style scoped>
  .top {
    position: relative;
    width: 100%;
    height: .286458rem
      /* 55/192 */
    ;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: url("../../assets/img/system/top-bj.png");
    background-position: left;
    background-repeat: no-repeat;
    background-size: 90% 100%;
  }

  .top-item {
    display: flex;
    align-items: center;
  }

  .logo {
    height: .182292rem
      /* 35/192 */
    ;
    margin-left: .0625rem
      /* 12/192 */
    ;
  }

  .title {
    color: #fff;
    margin-left: .052083rem
      /* 10/192 */
    ;
    display: inline-block;
    font-size: .104167rem
      /* 20/192 */
  }

  .tag {
    position: absolute;
    transform: translate3d(-50%, 0%, 0);
    top: 0;
    left: 50%;
    background: #520f21;
    color: #fff;
    margin: 0;
    padding: .015625rem
      /* 3/192 */
    ;
  }

  .left {
    width: 20%;
  }

  .center {
    padding-left: .052083rem
      /* 10/192 */
    ;
    position: relative;
    width: 63%;
  }

  .right {
    margin-right: .09375rem
      /* 18/192 */
    ;
    text-align: right;
    justify-content: flex-end;
    width: 15%;
  }

  .name {
    font-size: .072917rem
      /* 14/192 */
    ;
    color: #fff;
  }

  .set {
    height: .09375rem
      /* 18/192 */
    ;
    margin-left: .104167rem
      /* 20/192 */
    ;
    cursor: pointer;
  }

  .tab1 {
    border-bottom: .026042rem
      /* 5/192 */
      solid #0496fd;
  }

  .tab1S {}

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: .072917rem
      /* 14/192 */
    ;
    height: .135417rem
      /* 26/192 */
    ;
    background-position: left;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    margin-right: .15625rem
      /* 30/192 */
    ;
  }

  /* 生产控制下拉开始 */
  .dropdownSc {
    width: 2.3958rem
      /* 430/192 */
    ;
    height: 1.09375rem
      /* 210/192 */
    ;
    border: .005208rem
      /* 1/192 */
      solid #0273bf;
    padding: .052083rem
      /* 10/192 */
    ;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: .28125rem
      /* 45/192 */
    ;
    left: 30%;
    z-index: 99;
    border-radius: .026042rem
      /* 5/192 */
    ;
    background: linear-gradient(to bottom, #002953, #003d70, #005a9a);
  }

  .dropdownSc>div>div:nth-of-type(2)>div {
    margin-top: .041667rem
      /* 8/192 */
    ;
    cursor: pointer;
  }

  .dropdownSc>div>div:nth-of-type(2)>div:hover {
    color: #1890ff;
  }

  .currentClass {
    color: #1890ff !important;
  }

  .txt {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  /* 生产控制下拉结束 */

  /* 安全监测下拉开始 */
  .dropdownAq {
    width: 2.0625rem
      /* 396/192 */
    ;
    height: .604167rem
      /* 116/192 */
    ;
    border: .005208rem
      /* 1/192 */
      solid #0273bf;
    padding: .104167rem
      /* 20/192 */
    ;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: .28125rem
      /* 45/192 */
    ;
    left: 35%;
    z-index: 99;
    border-radius: .026042rem
      /* 5/192 */
    ;
    background: linear-gradient(to bottom, #002953, #003d70, #005a9a);
  }

  .dropdownAq>div {
    width: 30%;
    height: 100%;
  }

  .dropdownAq>div>p {
    text-align: center;
    color: #bdcbd8;
    font-size: .067708rem
      /* 13/192 */
    ;
    cursor: pointer;
    margin-top: .0625rem
      /* 12/192 */
    ;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .dropdownAq>div>p:hover {
    color: #1890ff;
  }

  /* 安全监测下拉结束 */
  /* 管理驾驶舱下拉 */
  .cockpit {
    width: 1.770833rem
      /* 396/192 */
    ;
    height: .75rem
      /* 116/192 */
    ;
    border: .005208rem
      /* 1/192 */
      solid #0273bf;
    padding: .104167rem
      /* 20/192 */
    ;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: .28125rem
      /* 55/192 */
    ;
    left: 10%;
    z-index: 99;
    border-radius: .026042rem
      /* 5/192 */
    ;
    background: linear-gradient(to bottom, #002953, #003d70, #005a9a);
  }

  .cockpit>div>p {
    text-align: center;
    color: #bdcbd8;
    font-size: .067708rem
      /* 13/192 */
    ;
    cursor: pointer;
    margin-top: .0625rem
      /* 12/192 */
    ;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .cockpit>div>p:hover {
    color: #1890ff;
  }





  /deep/.el-dropdown-menu,
  .el-popper {
    background-color: #057cd0;
    color: #fff;
    border: none;
    border-radius: 0;
    width: .78125rem
      /* 150/192 */
    ;
  }

  /deep/.el-dropdown-menu__item {
    color: #fff;
  }

  /deep/.el-dropdown-menu__item:hover {
    background-color: #0496fd;
    color: #fff;
  }

  /deep/.popper__arrow {
    display: none;
  }

  .no-use {
    cursor: not-allowed !important;
    color: #787c7f !important;
  }

  .msgg {
    color: #fff;
    position: absolute;
    width: 2.083333rem
      /* 400/192 */
    ;
    height: .260417rem
      /* 50/192 */
    ;
    /* background-color: rgba(0, 9, 37, 0.5); */
    right: 1.041667rem
      /* 200/192 */
    ;
  }

  .msg {
    font-size: .067708rem
      /* 13/192 */
    ;
    padding: .010417rem
      /* 2/192 */
      0;
    text-align: right;
  }

  .bluee {
    color: #03b5eb;
    font-weight: 600;
  }
</style>