<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="20%">
      <el-form :model="inputForm" ref="inputForm" v-loading="loading" size="small" label-width="0px">
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item prop="phone" :rules="[{ required: true, message: '手机号不能为空!', trigger: 'blur' }]">
              <el-input placeholder="请输入手机号" v-model="inputForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空!', trigger: 'blur' }]">
              <el-input type="password" placeholder="请输入密码" v-model="inputForm.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { AuthenticationClient, ManagementClient } from 'authing-js-sdk'
  import { postAuditLogs } from '@/api/logapi'
  const authenticationClient = new AuthenticationClient({
    appId: process.env.VUE_APP_APP_ID,
    appHost: process.env.VUE_APP_APP_HOST
  })
  const managementClient = new ManagementClient({
    userPoolId: process.env.VUE_APP_USER_POOL_ID,
    secret: process.env.VUE_APP_SECRET,
    host: process.env.VUE_APP_PUBLIC_HOST,
    publicKey: process.env.VUE_APP_PUBLIC_KEY
  })
  export default {
    data() {
      return {
        dialogVisible: false,
        loading: false,
        inputForm: {
          phone:'',
          password:''
        },
        type:'',
        title: ''
      }
    },
    computed: {
      commandRoles: () => process.env.VUE_APP_COMMAND_ROLE.split(':'),
      userId() {
        return JSON.parse(localStorage.getItem('_authing_user')).id || ''
      },
      username() {
        return JSON.parse(localStorage.getItem('_authing_user')).username || ''
      },
    },
    methods: {
      showPopup(type) {
        this.type = type
        if(type == 'start') {
          this.title = '启动验证'
        }else if(type == 'end') {
          this.title = '停止验证'
        }
        this.dialogVisible = true
        this.loading = false
        this.$nextTick(() => {
          this.$refs.inputForm.resetFields()
        })
      },
      doSubmit() {
        this.$refs['inputForm'].validate((valid) => {
          if (valid) {
            const siteToken = localStorage.getItem('_authing_token')
            const siteUser = localStorage.getItem('_authing_user')
            this.loading = true
            authenticationClient.loginByPhonePassword(this.inputForm.phone, this.inputForm.password, {
              customData: {
                source: 'google'
              },
            }).then(async info => {
              localStorage.setItem('_authing_token', siteToken)
              localStorage.setItem('_authing_user', siteUser)
              const { totalCount, list } = await managementClient.users.listRoles(info.id || '')
              let roleCodes = list.map(item => item.code)
              if(roleCodes.some(code => this.commandRoles.indexOf(code) !== -1)) {
                this.dialogVisible = false
                this.$message.success('验证成功！！！')
                this.$emit('sendCommand',this.type)
                this.logRecordSave(this.type)
              }else {
                this.$message.warning('当前用户没有下发指令权限！')
              }
              this.loading = false
            }).catch(err => {
              this.$message.error(err.message)
            })
          }
        });
      },
      // 保存下发指令日志
      logRecordSave(type) {
        //  保存 下发指令日志
        postAuditLogs([{
          user_id: this.userId || '',
          staff_id: this.userId || '',
          ip: '192.168.78.15',
          op_type: '9',
          op_desc: `验证成功!开始下发${type == 'start' ? '启动' : '停止'}指令`,
          log_level: '一般',
          business_system: process.env.VUE_APP_BUSINESS_SYSTEM.split(',')[1]
        }]).then(data => {}).catch(e => {})
      }
    },
  }
</script>
<style scoped>
  /deep/.el-dialog {
    border: .002604rem /* 0.5/192 */ solid #27C3E2;
    box-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;
    border-radius: .026042rem /* 5/192 */;
    /* margin-top: 17% !important;
    margin-left: 7%; */
    pointer-events: auto !important;
  }

  /deep/.el-dialog__header {
    /* padding-top: .041667rem; */
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

  /deep/.el-dialog__headerbtn {
    margin-top: -0.026042rem /* 5/192 */;
    color: #fff;
  }


  /deep/ .el-input__inner {
    background: linear-gradient(to right,#053c6b,#06558d,#0773b8);
    border: .002604rem /* 0.5/192 */ solid #27C3E2;
    color: #fff;
  }
</style>