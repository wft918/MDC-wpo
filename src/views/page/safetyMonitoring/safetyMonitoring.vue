<!-- 安全监控页面 -->
<template>
  <div class="safetyMonitoring">
    <div class="lt">
      <el-menu default-active="4-1" class="el-menu-vertical-demo" background-color="#393747" unique-opened
        text-color="#9a9da7" active-text-color="#409eff">
        <el-submenu index="1">
          <template slot="title"> <span style="color: #fff;font-size: .0729rem;">历史异常记录查询</span> </template>
          <el-menu-item index="1-1" @click="refreshList('/Monitoring/KJ90Query/AnalogAlarm')">模拟量报警记录查询</el-menu-item>
          <el-menu-item index="1-2" @click="refreshList('/Monitoring/KJ90Query/AnalogCutOff')">模拟量断电记录查询</el-menu-item>
          <el-menu-item index="1-3" @click="refreshList('/Monitoring/KJ90Query/AnalogAbnormalFeed')">模拟量馈电异常记录查询
          </el-menu-item>
          <el-menu-item index="1-4" @click="refreshList('/Monitoring/KJ90Query/SwitchAlarm')">开关量报警记录查询</el-menu-item>
          <el-menu-item index="1-5" @click="refreshList('/Monitoring/KJ90Query/SwitchCutOff')">开关量断电记录查询</el-menu-item>
          <el-menu-item index="1-6" @click="refreshList('/Monitoring/KJ90Query/SwitchAbnormalFeed')">开关量馈电异常记录查询
          </el-menu-item>
          <el-menu-item index="1-7" @click="refreshList('/Monitoring/KJ90Query/DeviceFailure')">设备故障记录查询</el-menu-item>
          <el-menu-item index="1-8" @click="refreshList('/Monitoring/KJ90Query/AllAbnormal')">所有设备异常状态查询</el-menu-item>
          <el-menu-item index="1-9" @click="refreshList('/Monitoring/KJ90Query/HisLevelAlarmReport')">分级报警记录查询
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"> <span style="color: #fff;font-size: .0729rem;">历史数据查询</span> </template>
          <el-menu-item index="2-1" @click="refreshList('/Monitoring/KJ90Query/AnalogValueChangeDetail')">模拟量密采数据查询
          </el-menu-item>
          <el-menu-item index="2-2" @click="refreshList('/Monitoring/KJ90Query/AnalogDetailRecord')">模拟量运行记录
          </el-menu-item>
          <el-menu-item index="2-3" @click="refreshList('/Monitoring/KJ90Query/AnalogStatusChange')">模拟量状态变动记录查询
          </el-menu-item>
          <el-menu-item index="2-4" @click="refreshList('/Monitoring/KJ90Query/SwitchStatusChange')">开关量状态变动记录查询
          </el-menu-item>
          <el-menu-item index="2-5" @click="refreshList('/Monitoring/Gas/FindHisAdjustmentRecord')">历史调校记录查询
          </el-menu-item>
          <el-menu-item index="2-6" @click="refreshList('/Monitoring/KJ90Sta/AnalogStatReport')">模拟量日报</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"> <span style="color: #fff;font-size: .0729rem;">设备定义信息</span> </template>
          <el-menu-item index="3-1" @click="refreshList('/Monitoring/KJ90Query/DeviceDefineInfo')">设备定义信息查询
          </el-menu-item>
          <el-menu-item index="3-2" @click="refreshList('/Monitoring/KJ90Query/StationInfoFind')">分站信息显示</el-menu-item>
          <el-menu-item index="3-3" @click="refreshList('/Monitoring/OM/SubStationPortInfoList')">分站端口占用列表
          </el-menu-item>
          <el-menu-item index="3-4" @click="refreshList('/Monitoring/KJ90Query/DeviceInfoNumSta')">设备数量统计</el-menu-item>
          <el-menu-item index="3-5" @click="refreshList('/Monitoring/KJ90Query/ControlRelationFind')">控制关系查询
          </el-menu-item>
          <el-menu-item index="3-6" @click="refreshList('/Monitoring/Gas/DeviceAdjustmentRealStatus')">设备调校情况
          </el-menu-item>
          <el-menu-item index="3-7" @click="refreshList('/Monitoring/KJ90Query/LevelAlarmDefineReport')">分级报警定义信息查询
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"> <span style="color: #fff;font-size: .0729rem;">实时数据显示</span> </template>
          <el-menu-item index="4-1" @click="refreshList('/Monitoring/Gas/RealDataMonitor?IsIndexStyle=false')">实时数据显示
          </el-menu-item>
          <el-menu-item index="4-2" @click="refreshList('/Monitoring/Gas/RealDeviceFault')">实施设备故障显示</el-menu-item>
          <el-menu-item index="4-3" @click="refreshList('/Monitoring/Gas/RealAlarmDetail')">实时报警显示</el-menu-item>
          <el-menu-item index="4-4" @click="refreshList('/Monitoring/Gas/RealCutDetail')">实时断电显示</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"> <span style="color: #fff;font-size: .0729rem;">图表</span> </template>
          <el-menu-item index="5-1" @click="refreshList('/Monitoring/Gas/AnalogHisChart')">模拟量曲线</el-menu-item>
          <el-menu-item index="5-2" @click="refreshList('/Monitoring/Gas/SwitchHisChart')">开关量状态图</el-menu-item>
          <el-menu-item index="5-3" @click="refreshList('/Monitoring/Gas/HisChartMulti')">多点曲线</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title"> <span style="color: #fff;font-size: .0729rem;">瓦斯抽放</span> </template>
          <el-menu-item index="6-1" @click="refreshList('/Monitoring/Real/GDPointRealData')">V锥实时数据监视</el-menu-item>
          <el-menu-item index="6-2" @click="refreshList('/Monitoring/Real/GDQPointRealData')">抽采计量点实时数据监视</el-menu-item>
          <el-menu-item index="6-3" @click="refreshList('/Monitoring/His/GDReport')">抽采量统计报表</el-menu-item>
          <el-menu-item index="6-4" @click="refreshList('/Monitoring/His/GDHisChart')">抽采量柱图展示</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="rt">
      <iframe id="iframe" style="width: 100%;height: 100%;" :src="currentUrl" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script>
  import '@/utils/flexible'
  import { AuthenticationClient } from 'authing-js-sdk'
  const authenticationClient = new AuthenticationClient({
    appId: process.env.VUE_APP_APP_ID,
    appHost: process.env.VUE_APP_APP_HOST,
    token: localStorage.getItem('_authing_token')
  })
  export default {
    data() {
      return {
        systemSrc: '/Monitoring/Gas/RealDataMonitor?IsIndexStyle=false',
        interVal:null
      }
    },
    computed: {
      authing_token() {
        return localStorage.getItem('_authing_token')
      },
      currentUrl() {
        let cutUrlLength = this.systemSrc.split('?').length
        if(cutUrlLength > 1) {
          return process.env.VUE_APP_SAFE_MONITOR_URL + this.systemSrc.split('?')[0] + '?access_token=' + this.authing_token + '&' + this.systemSrc.split('?')[1]
        }else {
          return process.env.VUE_APP_SAFE_MONITOR_URL + this.systemSrc.split('?')[0] + '?access_token=' + this.authing_token
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.sendUrl()
        this.receiveMessage()
        this.interVal = setInterval(this.receiveMessage,30000)
      })
      // 监听子系统发来消息，authingToken过期
      window.addEventListener("message", this.receiveMessage, false);
    },
    destroyed() {
      window.removeEventListener("message", this.receiveMessage, false);  //移除监听
      clearInterval(this.interVal)
      this.interVal = null
    },
    methods: {
      // 点击子系统列表切换iframe嵌入地址
      refreshList(url) {
        this.systemSrc = url
        this.sendUrl()
        this.receiveMessage()
        if(this.interVal) clearInterval(this.interVal)
        this.interVal = setInterval(this.receiveMessage,30000)
      },
      // 接收到子系统发来的消息  ---   authingToken  过期
      async receiveMessage(event) {
        // console.log(event,'来自子系统的消息----->>>')
        let data = await authenticationClient.refreshToken() //刷新token
        let iframe = document.getElementById('iframe')
        if(data.token) {
          iframe.contentWindow.postMessage(JSON.stringify({
            access_token: data.token
          }),'*')   //第二个参数如果是*  则表示可以传递给任意窗口
        }
      },
      // 向子系统发送url
      sendUrl() {
        let iframe = document.getElementById('iframe')
        iframe.contentWindow.postMessage(JSON.stringify({
          access_url:this.currentUrl
        }),'*')
      }
    },
  }
</script>
<style scoped>
  .safetyMonitoring {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .lt {
    width: 13%;
    height: 100%;
    background-color: #393747;
  }

  .rt {
    width: 87%;
    height: 100%;
    box-sizing: border-box;
  }

  .el-table {
    background-color: #3c4860;
  }

  /deep/ .el-submenu .el-menu-item {
    font-size: .072917rem;
  }

  /deep/.el-table .warning-row {
    background: #242b42;
    color: #fff;
    -webkit-box-shadow: 0 0 10px #070e29;
    -moz-box-shadow: 0 0 10px #070e29;
    box-shadow: 0 0 10px #070e29;
  }

  /deep/.el-table .success-row {
    background: #1c233b;
    color: #fff;
  }

  /deep/ .el-input__inner {
    background-color: transparent !important;
    border: 1px solid #0076c8 !important;
    color: #fff;
  }

  /deep/ .el-form--inline .el-form-item__label {
    color: #9a9da7;
  }

  /deep/ .el-range-editor--mini .el-range-input {
    background-color: transparent !important;
  }

  /deep/ .el-date-editor .el-range-separator {
    color: #fff !important;
  }
</style>