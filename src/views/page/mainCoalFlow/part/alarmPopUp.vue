<doc>
  报警弹出窗口 - 报警信息
</doc>
<template>
  <el-dialog title="报警信息" :visible.sync="dialogVisible" width="20%" :modal-append-to-body='false' :modal='false'>
    <p style="margin: .026042rem /* 5/192 */ 0;">
      <i class="el-icon-warning" style="color: #ff3365;margin-right: .026042rem /* 5/192 */;"></i>
      报警原因：{{alarmInfo.systemName}}&nbsp;{{alarmInfo.status}}异常
    </p>
    <p class="msg">报警时间：{{alarmInfo.time}}</p>
    <!-- <p class="msg">报警系统：{{warnData.alarm_system}}</p> -->
    <!-- <p class="msg">报警设备：{{warnData.alarm_device}}</p> -->
    <span slot="footer" class="dialog-footer">
      <el-button class="btn" @click="getAlarmContact()" size="mini">联系责任人</el-button>
      <el-button class="btn" type="primary" @click="getAlarmClose()" size="mini">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import '../../../../utils/flexible.js'
  import { alarmContact, alarmClose } from "@/api/intelligentStartStop";
  export default {
    data() {
      return {
        dialogVisible: false,
        alarmInfo: {},
      };
    },
    methods: {
      init(alarmInfo) {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.alarmInfo = alarmInfo
        })
      },
      // 联系责任人
      getAlarmContact() {
        alarmContact().then((response) => {
          if (response && response.success) {
            this.$message({
              message: response.msg,
              type: 'success'
            });
          }
        })
      },
      // 关闭报警按钮
      getAlarmClose() {
        alarmClose().then(response => {
          if (response && response.success) {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.dialogVisible = false
          }
        })
      }
    }
  };
</script>
<style scoped>
  /deep/.el-dialog {
    border: .002604rem /* 0.5/192 */ solid #27C3E2;
    box-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;
    border-radius: .026042rem /* 5/192 */;
    margin-top: 7% !important;
    margin-left: 7%;
    pointer-events: auto !important;
  }

  /deep/.el-dialog__header {
    padding-top: .041667rem /* 8/192 */;
    border: .002604rem /* 0.5/192 */ solid #27C3E2;
    border-top-left-radius: .026042rem /* 5/192 */;
    border-top-right-radius: .026042rem /* 5/192 */;
    background-image: linear-gradient(#042a52, #077dc5);
  }

  /deep/.el-dialog__footer {
    padding-bottom: .041667rem /* 8/192 */;
    border: .002604rem /* 0.5/192 */ solid #27C3E2;
    border-bottom-left-radius: .026042rem /* 5/192 */;
    border-bottom-right-radius: .026042rem /* 5/192 */;
    background-image: linear-gradient(#077dc5, #042a52);
  }

  /deep/.el-dialog__title {
    color: #fff;
  }

  /deep/.el-dialog__body {
    background-color: #071738;
    color: #fff;
    padding: .104167rem /* 20/192 */;
  }

  .btn {
    border: .010417rem /* 2/192 */ solid #02aac3;
    background-color: #045895;
    border-radius: .03125rem /* 6/192 */;
    color: #fff;
  }

  .btn:hover {
    background-color: #0779c0;
  }

  /deep/.el-dialog__headerbtn {
    margin-top: -0.026042rem /* 5/192 */;
    color: #fff;
  }

  .msg {
    color: #cfd8de;
    margin: .026042rem /* 5/192 */ 0;
    padding: .010417rem /* 2/192 */ .052083rem /* 10/192 */;
    padding-left: .119792rem;
    display: inline-block;
    background-color: #033c5b;
    border-radius: .026042rem /* 5/192 */;
    width: 70%;
  }
</style>