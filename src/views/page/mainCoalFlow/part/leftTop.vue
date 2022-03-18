<doc>
  系统启停控制
</doc>
<template>
  <div class="box">
    <p class="title">系统启停控制</p>
    <div style="width: 100%;height: calc(100% - .078125rem);display: flex;">
      <div style="width: 70%;height: 100%;padding-top: .052083rem;box-sizing: border-box;">
        <lt-top-pie :id="'ltTopPie'" :data="barData"></lt-top-pie>
      </div>
      <div
        style="width: 30%;height: 100%;display: flex;flex-direction: column;justify-content: space-around;align-items: center;">
        <!-- <div :class="{ btn : state === 0 || state === 2 , btndo : state === 1 || state === 3 || (state === 0 && firstTothree != '0000') || (state === 0 && sixteenTonineteen != '0000') }" @click="stateChange()">
          <span style="font-size: .078125rem /* 15/192 */;">{{title}}</span>
        </div> -->
        <div class="btn" @click="btnClick('start')">
          <span style="font-size: .078125rem /* 15/192 */;">智能启动</span>
        </div>
        <div class="btn bot" @click="btnClick('end')">
          <span style="font-size: .078125rem /* 15/192 */;">智能停止</span>
        </div>
      </div>
    </div>
    <!-- 验证弹窗 -->
    <command-auth-dialog ref="commandAuthDialog" @sendCommand="sendCommand"></command-auth-dialog>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import capsule from '@/views/page/mainCoalFlow/part/echarts/capsule'
  import barEchart from '@/views/page/mainCoalFlow/part/echarts/barEchart'
  import ltTopPie from './echarts/ltTopPie'
  import mqtt from 'mqtt'   // 引入 mqtt 库
  // API引入
  import { mainCoalFlowLastSttDur, startupDuration, stopupDuration, sttCommand, pageStatus } from "@/api/intelligentStartStop";
  import commandAuthDialog from './commandAuthDialog'
  import { postAuditLogs } from '@/api/logapi'

  function getSixRandomStr() {
    let str = ''
    for(let i = 0; i < 6; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return str
  }

  // 配置mqtt
  var client = null
  const options = {
    connectTimeout: 40000,
    clientId: process.env.VUE_APP_CLIENT_ID + getSixRandomStr(),
    username: process.env.VUE_APP_MQTT_UESRNAME,
    password: process.env.VUE_APP_MQTT_PASSWORD,
    clean: true
  }

  //  是否下发下一条指令
  const sendOut = {
    acceptResultFilst: false,
    acceptResultSecond: false,
    ctrlProcId: ''
  }
  let isTimer = null

  export default {
    components: {
      capsule,
      barEchart,
      commandAuthDialog,
      ltTopPie
    },
    computed: {
      // 状态 0-1-2-3
      state: {
        get() {
          return this.$store.state.startStopStatus.statu
        },
        set(val) {
          this.$store.commit('startStopStatus/updateStatus', val)
        }
      },
      // 32位状态码
      statusCode: {
        get() {
          return this.$store.state.startStopStatus.statusCode
        },
        set(val) {
          this.$store.commit('startStopStatus/updateStatusCode', val)
        }
      },
      // 0-3位
      firstTothree() {
        return this.statusCode.slice(0, 4)
      },
      // 16-19位
      sixteenTonineteen() {
        return this.statusCode.slice(16, 20)
      },
      title() {
        let title = '智能启动'
        switch (this.state) {
          case 0:
            title = '智能启动'  // 等待中
            break;
          case 1:
            title = '智能启动'  // 启动中
            break;
          case 2:
            title = '智能停止'  // 正常运行
            break;
          case 3:
            title = '智能停止'  // 停止中
            break;
        }
        return title
      },
      // mqtt连接地址
      mqttUrl() {
        return process.env.VUE_APP_MQTT_URL
      },
      socketUrl() {
        return process.env.VUE_APP_WEBSOCKET_URL
      },
      topic() {
        return process.env.VUE_APP_TOPIC
      },
      currentDate() {
        return this.getDate(0)
      },
      userId() {
        return JSON.parse(localStorage.getItem('_authing_user')).id || ''
      },
      username() {
        return JSON.parse(localStorage.getItem('_authing_user')).username || ''
      },
    },
    data() {
      return {
        barData: [{ indicator_name: '上次智能启动时长', value: 0 }, { indicator_name: '上次智能停止时长', value: 0 }, { indicator_name: '上次人工停止时长', value: 0 }, { indicator_name: '上次人工启动时长', value: 0 }],
        ws: null
      }
    },
    mounted() {
      this.getMainCoalFlowLastSttDur()  //左上环形图数据
      this.mqttMsg()
      this.connectSocket()
    },
    destroyed() {
      if (client) {
        client.end()
        client = null
      }
      if (this.ws) {
        this.ws.close()
        this.ws = null
      }
      if(isTimer) clearInterval(isTimer)
    },
    methods: {
      // 随机生成六位数
      getRandomSixNum() {
        let RandomSixStr = ''
        for (let i = 0; i < 6; i++) {
          RandomSixStr += String(Math.floor(Math.random() * 10))
        }
        return RandomSixStr
      },
      // 补零
      zeroFilling(length) {
        let str_0 = ''
        for (let i = 0; i < length; i++) {
          str_0 += '0'
        }
        return str_0
      },

      // 连接mqtt
      mqttMsg() {
        let connectFlag = false
        if (!client) {
          console.log(options,'MQTT配置-->>>>')
          console.log(this.mqttUrl, '发起连接-------mqtt连接地址----->>>')
          // client = mqtt.connect('ws://121.196.104.126:8083/mqtt', options)
          client = mqtt.connect(this.mqttUrl, options)
        }
        client.on('connect', (e) => {
          if(connectFlag) return
          connectFlag = true
          console.log(e, "MQTT连接成功！！！")
          client.subscribe(this.topic, { qos: 2 }, (error) => {
            if (!error) {
              console.log('消息订阅成功')
            } else {
              console.log('消息订阅失败')
            }
          })
        })
        // 接收消息处理
        client.on('message', (topic, message) => {
          let msg = JSON.parse(message)
          console.log(msg,'接受Mqtt消息----->')
          if(msg.msgType == 'CTRL_REQ_ACK' && msg.result == 'success' && msg.ctrlProcId == sendOut.ctrlProcId) {
            sendOut.acceptResultFilst = true
            console.log('msgType == CTRL_REQ_ACK', 'result == success')
          }
          if(msg.msgType == 'CTRL_RESP' && msg.result == 'success' && msg.ctrlProcId == sendOut.ctrlProcId) {
            sendOut.acceptResultSecond = true
            console.log('msgType == CTRL_RESP', 'result == success')
          }
        })
      },
      // 连接websocket
      connectSocket() {
        // 打开一个 web socket
        this.ws = new WebSocket(this.socketUrl);

        this.ws.onopen = () => {
          console.log('Socket已连接--------->>>>')
          let sendObj = { type: '1', sleep: 1000, data: [{ "orgNo": "", "deviceid": "ZNQT", "fieldnames": "{eip_samples:100.1000.1}.1" }] }
          this.ws.send(JSON.stringify(sendObj));
        };
        this.ws.onmessage = (msg) => {
          console.log(JSON.parse(msg.data), 'socket接受消息--------->>>>>')
          let codeNum = JSON.parse(msg.data)['data']['ZNQT']['{eip_samples:100.1000.1}.1']
          let twoBinary = codeNum.toString(2)
          let disparityLength = 32 - twoBinary.length   //相差的位数
          let statusCode = ''   //32字符串，0-15位表示综采工作面，16-31位表示主运输系统
          if (disparityLength > 0) {
            statusCode = (this.zeroFilling(disparityLength) + twoBinary).split('').reverse().join('')
          } else {
            statusCode = twoBinary.split('').reverse().join('')
          }
          this.statusCode = statusCode  //存
          let firstTothree = statusCode.slice(0, 4)   //第零位-第三位
          let sixteenTonineteen = statusCode.slice(16, 20) //第十六位-第十九位
          if (firstTothree == '1000' || sixteenTonineteen == '1000') { //启动中
            this.state = 1
          } else if (firstTothree == '0100' || sixteenTonineteen == '0100') { //停止中
            this.state = 3
          } else if (firstTothree == '0010' && sixteenTonineteen == '0010') { //正常运行
            // if(this.state == 1) {
            //   this.logRecordSave('start')
            // }
            this.state = 2
          } else {  //准备启动
            // if(this.state == 3) {
            //   this.logRecordSave('stop')
            // }
            this.state = 0
          }
        };
        this.ws.onclose = () => {
          console.log('Socket关闭---------------->>>>>')
        };
      },
      // // 启动状态变换
      // stateChange() {
      //   if (this.state === 1 || this.state === 3) {
      //     return
      //   } else if ((this.state === 0 && this.firstTothree == '0000' && this.sixteenTonineteen == '0000') || this.state === 2) {  //等待启动 -- 正常运行
      //     this.$refs.commandAuthDialog.showPopup(this.state)
      //   }
      // },
      // 点击智能启动或智能停止
      btnClick(type) {
        this.$refs.commandAuthDialog.showPopup(type)
      },
      // 发送指令
      sendCommand(type) {
        if (type == 'start') { //智能启动
          this.sendStartFilstCommand()
        } else if (type == 'end') { //智能停止
          this.sendStopFilstCommand()
        }
      },
      // 本月智能、手动启动次数和开机率
      getMainCoalFlowLastSttDur() {
        mainCoalFlowLastSttDur().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.barData = []
              let list = []
              data.data.forEach(item => {
                if (item.indicator_code == 'main_coal_flow.manual_start_dur') {
                  list.push({
                    name: '上次人工启动时长',
                    value: parseFloat(item.value) || 0,
                    num: 4
                  })
                } else if (item.indicator_code == 'main_coal_flow.manual_stop_dur') {
                  list.push({
                    name: '上次人工停止时长',
                    value: parseFloat(item.value) || 0,
                    num: 3
                  })
                } else if (item.indicator_code == 'main_coal_flow.smart_start_dur') {
                  list.push({
                    name: '上次智能启动时长',
                    value: parseFloat(item.value) || 0,
                    num: 1
                  })
                } else if (item.indicator_code == 'main_coal_flow.smart_stop_dur') {
                  list.push({
                    name: '上次智能停止时长',
                    value: parseFloat(item.value) || 0,
                    num: 2
                  })
                }
              })
              this.barData = list.sort((a, b) => a.num - b.num).map(item => ({ name: item.name, value: item.value }))
            }
          }
        })
      },
      getDate(num) {
        var date1 = new Date();
        //今天时间
        var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + num);
        //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
        var time2 = this.addZero(date2.getFullYear()) + "-" + this.addZero((date2.getMonth() + 1)) + "-" + this.addZero(date2.getDate());
        return time2;
      },
      addZero(num) {//补0方法
        if (parseInt(num) < 10) {
          num = '0' + num;
        }
        return num;
      },
      //  发送第一条启动命令
      sendStartFilstCommand() {
        if(isTimer) clearInterval(isTimer)
        sendOut.acceptResultFilst = false
        sendOut.acceptResultSecond = false
        let randomSixNum_0 = this.getRandomSixNum()
        let startCommand_0 = {
          ctrlProcId:`WEB_SMC_${new Date().getTime()}_${randomSixNum_0}`,
          msgType:"CTRL_REQ",
          time: new Date().getTime(),
          msgFrom:"WEB_SMC",
          protocol:"EIP",
          ctrlPnt:"{eip_samples:3.785.1}.6",
          targetValue:0,
          isTest: process.env.VUE_APP_START_FIRST_ISTEST == '0' ? false : true
        }
        sendOut.ctrlProcId = startCommand_0.ctrlProcId
        console.log('开始发送第一条启动命令')
        client.publish(this.topic, JSON.stringify(startCommand_0), 2, error => {
          if (!error) {
            console.log('第一次发送启动命令成功-->>')
            isTimer = setInterval(() => {
              if(sendOut.acceptResultFilst && sendOut.acceptResultSecond) {
                clearInterval(isTimer)
                this.sendStartSecondCommand()
              }
            }, 500)
          }else {
            console.error(error,'开始发送第一条启动命令出错')
            // this.logRecordSave('start', false)
          }
        })
      },
      //  发送第二条启动命令
      sendStartSecondCommand() {
        sendOut.acceptResultFilst = false
        sendOut.acceptResultSecond = false
        let randomSixNum_1 = this.getRandomSixNum()
        let startCommand_1 = {
          ctrlProcId:`WEB_SMC_${new Date().getTime()}_${randomSixNum_1}`,
          msgType:"CTRL_REQ",
          time: new Date().getTime(),
          msgFrom:"WEB_SMC",
          protocol:"EIP",
          ctrlPnt:"{eip_samples:3.785.1}.6",
          targetValue: 1,
          isTest: process.env.VUE_APP_START_SECOND_ISTEST == '0' ? false : true
        }
        sendOut.ctrlProcId = startCommand_1.ctrlProcId
        console.log('开始发送第二条启动命令')
        client.publish(this.topic, JSON.stringify(startCommand_1), 2, error => {
          if (!error) {
            console.log('第二次发送启动命令成功-->>')
            isTimer = setInterval(() => {
              if(sendOut.acceptResultFilst && sendOut.acceptResultSecond && this.statusCode[4] == '1') {
                clearInterval(isTimer)
                this.sendStartThirdCommand()
              }
            }, 500)
          }else {
            console.error(error,'开始发送第2条启动命令出错')
            // this.logRecordSave('start', false)
          }
        })
      },
      //  发送第三条启动命令
      sendStartThirdCommand() {
        sendOut.acceptResultFilst = false
        sendOut.acceptResultSecond = false
        let randomSixNum_2 = this.getRandomSixNum()
        let startCommand_2 = {
          ctrlProcId:`WEB_SMC_${new Date().getTime()}_${randomSixNum_2}`,
          msgType:"CTRL_REQ",
          time: new Date().getTime(),
          msgFrom:"WEB_SMC",
          protocol:"EIP",
          ctrlPnt:"{eip_samples:1.817.6}.152",
          targetValue: 1,
          isTest: process.env.VUE_APP_START_THIRD_ISTEST == '0' ? false : true
        }
        sendOut.ctrlProcId = startCommand_2.ctrlProcId
        console.log('开始发送第三条启动命令')
        client.publish(this.topic, JSON.stringify(startCommand_2), 2, error => {
          if (!error) {
            console.log('第三次发送启动命令成功-->>')
            isTimer = setInterval(() => {
              if(sendOut.acceptResultFilst && sendOut.acceptResultSecond && this.statusCode[5] == '1') {
                clearInterval(isTimer)
                this.sendStartFourthCommand()
              }
            }, 500)
          }else {
            console.error(error,'开始发送第3条启动命令出错')
            // this.logRecordSave('start', false)
          }
        })
      },
      //  发送第四条启动命令
      sendStartFourthCommand() {
        sendOut.acceptResultFilst = false
        sendOut.acceptResultSecond = false
        let randomSixNum_3 = this.getRandomSixNum()
        let startCommand_3 = {
          ctrlProcId:`WEB_SMC_${new Date().getTime()}_${randomSixNum_3}`,
          msgType:"CTRL_REQ",
          time: new Date().getTime(),
          msgFrom:"WEB_SMC",
          protocol:"EIP",
          ctrlPnt:"{eip_samples:1.816.1}.62",
          targetValue: 1,
          isTest: process.env.VUE_APP_START_FOURTH_ISTEST == '0' ? false : true
        }
        sendOut.ctrlProcId = startCommand_3.ctrlProcId
        console.log('开始发送第四条启动命令')
        client.publish(this.topic, JSON.stringify(startCommand_3), 2, error => {
          if (!error) {
            console.log('第四次发送启动命令成功-->>')
            isTimer = setInterval(() => {
              if(sendOut.acceptResultFilst && sendOut.acceptResultSecond) {
                clearInterval(isTimer)
                this.sendStartFifthCommand()
              }
            }, 500)
          }else {
            console.error(error,'开始发送第4条启动命令出错')
            // this.logRecordSave('start', false)
          }
        })
      },
      //  发送第五条启动命令
      sendStartFifthCommand() {
        sendOut.acceptResultFilst = false
        sendOut.acceptResultSecond = false
        let randomSixNum_4 = this.getRandomSixNum()
        let startCommand_4 = {
          ctrlProcId:`WEB_SMC_${new Date().getTime()}_${randomSixNum_4}`,
          msgType:"CTRL_REQ",
          time: new Date().getTime(),
          msgFrom:"WEB_SMC",
          protocol:"EIP",
          ctrlPnt:"{eip_samples:1.816.1}.33",
          targetValue: 2,
          isTest: process.env.VUE_APP_START_FIFTH_ISTEST == '0' ? false : true
        }
        sendOut.ctrlProcId = startCommand_4.ctrlProcId
        console.log('开始发送第五条启动命令')
        client.publish(this.topic, JSON.stringify(startCommand_4), 2, error => {
          if (!error) {
            console.log('第五次发送启动命令成功-->>')
            isTimer = setInterval(() => {
              if(sendOut.acceptResultFilst && sendOut.acceptResultSecond && this.statusCode[20] == '1') {
                clearInterval(isTimer)
                this.sendStartSixthCommand()
              }
            }, 500)
          }else {
            console.error(error,'开始发送第5条启动命令出错')
            // this.logRecordSave('start', false)
          }
        })
      },
      //  发送第六条启动命令
      sendStartSixthCommand() {
        sendOut.acceptResultFilst = false
        sendOut.acceptResultSecond = false
        let randomSixNum_5 = this.getRandomSixNum()
        let startCommand_5 = {
          ctrlProcId:`WEB_SMC_${new Date().getTime()}_${randomSixNum_5}`,
          msgType:"CTRL_REQ",
          time: new Date().getTime(),
          msgFrom:"WEB_SMC",
          protocol:"EIP",
          ctrlPnt:"{eip_samples:1.817.6}.152",
          targetValue: 0,
          isTest: process.env.VUE_APP_START_SIXTH_ISTEST == '0' ? false : true
        }
        sendOut.ctrlProcId = startCommand_5.ctrlProcId
        console.log('开始发送第六条启动命令')
        client.publish(this.topic, JSON.stringify(startCommand_5), 2, error => {
          if (!error) {
            console.log('第六次发送启动命令成功-->>')
            if(isTimer) clearInterval(isTimer)
            sendOut.acceptResultFilst = false
            sendOut.acceptResultSecond = false
          }else {
            console.error(error,'开始发送第6条启动命令出错')
            // this.logRecordSave('start', false)
          }
        })
      },
      //  发送第一条停止命令
      sendStopFilstCommand() {
        if(isTimer) clearInterval(isTimer)
        sendOut.acceptResultFilst = false
        sendOut.acceptResultSecond = false
        let randomSixNum_0 = this.getRandomSixNum()
        let stopCommand_0 = {
          ctrlProcId: `WEB_SMC_${new Date().getTime()}_${randomSixNum_0}`,
          msgType: "CTRL_REQ",
          time: new Date().getTime(),
          msgFrom: "WEB_SMC",
          protocol: "EIP",
          ctrlPnt: "{eip_samples:3.785.1}.7",
          targetValue: 0,
          isTest: process.env.VUE_APP_END_FIRST_ISTEST == '0' ? false : true
        }
        sendOut.ctrlProcId = stopCommand_0.ctrlProcId
        console.log('开始发送第一条停止命令')
        client.publish(this.topic, JSON.stringify(stopCommand_0), 2, error => {
          if (!error) {
            console.log('第一次发送停止命令成功-->>')
            isTimer = setInterval(() => {
              if(sendOut.acceptResultFilst && sendOut.acceptResultSecond) {
                clearInterval(isTimer)
                this.sendStopSecondCommand()
              }
            }, 500)
          }else {
            console.error(error,'发送第1条停止命令出错')
            // this.logRecordSave('stop', false)
          }
        })
      },
      //  发送第二条停止命令
      sendStopSecondCommand() {
        sendOut.acceptResultFilst = false
        sendOut.acceptResultSecond = false
        let randomSixNum_1 = this.getRandomSixNum()
        let stopCommand_1 = {
          ctrlProcId: `WEB_SMC_${new Date().getTime()}_${randomSixNum_1}`,
          msgType: "CTRL_REQ",
          time: new Date().getTime(),
          msgFrom: "WEB_SMC",
          protocol: "EIP",
          ctrlPnt: "{eip_samples:3.785.1}.7",
          targetValue: 1,
          isTest: process.env.VUE_APP_END_SECOND_ISTEST == '0' ? false : true
        }
        sendOut.ctrlProcId = stopCommand_1.ctrlProcId
        console.log('开始发送第二条停止命令')
        client.publish(this.topic, JSON.stringify(stopCommand_1), 2, error => {
          if (!error) {
            console.log('第二次发送停止命令成功-->>')
            isTimer = setInterval(() => {
              if(sendOut.acceptResultFilst && sendOut.acceptResultSecond && this.statusCode[5] == '0') {
                clearInterval(isTimer)
                this.sendStopThirdCommand()
              }
            }, 500)
          }else {
            console.error(error,'发送第2条停止命令出错')
            // this.logRecordSave('stop', false)
          }
        })
      },
      //  发送第三条停止命令
      sendStopThirdCommand() {
        sendOut.acceptResultFilst = false
        sendOut.acceptResultSecond = false
        let randomSixNum_2 = this.getRandomSixNum()
        let stopCommand_2 = {
          ctrlProcId: `WEB_SMC_${new Date().getTime()}_${randomSixNum_2}`,
          msgType: "CTRL_REQ",
          time: new Date().getTime(),
          msgFrom: "WEB_SMC",
          protocol: "EIP",
          ctrlPnt: "{eip_samples:1.816.1}.33",
          targetValue: 7,
          isTest: process.env.VUE_APP_END_THIRD_ISTEST == '0' ? false : true
        }
        sendOut.ctrlProcId = stopCommand_2.ctrlProcId
        console.log('开始发送第三条停止命令')
        client.publish(this.topic, JSON.stringify(stopCommand_2), 2, error => {
          if (!error) {
            console.log('第三次发送停止命令成功-->>')
            if(isTimer) clearInterval(isTimer)
            sendOut.acceptResultFilst = false
            sendOut.acceptResultSecond = false
          }else {
            console.error(error,'发送第3条停止命令出错')
            // this.logRecordSave('stop', false)
          }
        })
      },
      // 保存下发指令日志
      logRecordSave(type, status = true) {
        //  保存 下发指令日志
        postAuditLogs([{
          user_id: this.userId || '',
          staff_id: this.userId || '',
          ip: '192.168.78.15',
          op_type: '9',
          op_desc: `${this.username || ''}下发指令,${type == 'start' ? '启动' : '停止'}主煤流${status ? '成功' : '失败'}`,
          log_level: '一般',
          business_system: process.env.VUE_APP_BUSINESS_SYSTEM.split(',')[1]
        }]).then(data => {}).catch(e => {})
      }
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
    font-size: .072917rem
      /* 14/192 */
    ;
    line-height: .072917rem
      /* 14/192 */
    ;
    font-weight: 650;
    text-shadow: 0rem 0rem .052083rem
      /* 10/192 */
      #00FFFF;
    padding-left: .052083rem
      /* 10/192 */
    ;
  }

  .btn {
    display: flex;
    width: .4167rem
      /* 75/192 */
    ;
    height: .4167rem
      /* 75/192 */
    ;
    border: .041667rem
      /* 8/192 */
      solid #00ffff;
    border-radius: 50%
      /* 50/192 */
    ;
    background-color: #026d9c;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 650;
    margin-right: .104167rem
      /* 20/192 */
    ;
    cursor: pointer;
  }

  .bot {
    background: linear-gradient(to bottom left, #0479c1, #016685)
  }

  .btndo {
    display: flex;
    width: .390625rem
      /* 75/192 */
    ;
    height: .390625rem
      /* 75/192 */
    ;
    border: .041667rem
      /* 8/192 */
      solid #92abac;
    border-radius: 50%
      /* 50/192 */
    ;
    background-color: #667884;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 650;
    margin-right: .104167rem
      /* 20/192 */
    ;
    cursor: not-allowed;
  }

  .m-title {
    color: #fff;
    font-size: .067708rem
      /* 13/192 */
    ;
    margin: .026042rem
      /* 5/192 */
      0;
    margin-left: .104167rem
      /* 20/192 */
    ;
  }

  /* 进度条 */
  /deep/ .el-progress-bar__outer {
    background: none !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  /deep/ .el-progress-bar__inner {
    background: linear-gradient(270deg, #26f9c9 0%, rgba(4, 123, 200, 0) 100%) !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
</style>