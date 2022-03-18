<doc>
  登陆界面
</doc>
<template>
  <div class="box">
    <div class="content">
      <img src="../../../assets/img/login/img.png" alt="" />
      <div class="from">
        <div class="login">
          <div class="title">
            <img
              src="../../../assets/img/system/logo.png"
              style="height: 35px; margin-right: 10px"
            />
            <p>中煤科工集团</p>
          </div>
          <div class="model">
            <p class="name">
              <span style="color: #00fbfc">王坡煤矿</span>智能一体化管控平台
            </p>
            <el-form
              style="padding: 0 50px"
              :model="inputForm"
              ref="inputForm"
              size="small"
              label-width="0px"
            >
              <el-form-item
                prop="phone"
                :rules="[
                  { required: true, message: '请输入用户名或手机号', trigger: 'blur' },
                ]"
              >
                <el-input
                  placeholder="请输入用户名或手机号"
                  v-model="inputForm.phone"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="password"
                :rules="[
                  { required: true, message: '请输入密码', trigger: 'blur' },
                ]"
              >
                <el-input
                  type="password"
                  placeholder="请输入密码"
                  v-model="inputForm.password"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="code"
                :rules="[{ validator: validateCode, trigger: 'blur' }]"
              >
                <el-row>
                  <el-col :span="14">
                    <el-input
                      placeholder="请输入验证码"
                      v-model="inputForm.code"
                    ></el-input>
                  </el-col>
                  <el-col :span="10">
                    <div
                      @click="changeCode()"
                      style="transform: translateY(1px); cursor: pointer"
                    >
                      <sidentify :identifyCode="identifyCode"></sidentify>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  @change="rememberPasswordChange"
                  v-model="checked"
                  style="color: #fff"
                  >记住密码</el-checkbox
                >
              </el-form-item>
              <el-button
                style="width: 100%"
                @click="login()"
                type="primary"
                size="small"
                >登 录</el-button
              >
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="load" v-if="loadShow">
      <p class="msg">正在登陆，请稍后. . .</p>
      <p
        style="
          display: inline-block;
          width: 30%;
          border-radius: 10px;
          margin-top: 20px;
        "
      >
        <el-progress
          :show-text="false"
          :stroke-width="10"
          :percentage="percentageNum"
        ></el-progress>
      </p>
    </div>
    <!-- RHXD.京ICP备19037117号 -->
    <p class="copy">中煤科工集团 Copyright ©2021</p>
  </div>
</template>
<script>
  import { AuthenticationClient,ManagementClient } from 'authing-js-sdk'
  import request from '@/utils/request2'
  const authenticationClient = new AuthenticationClient({
    appId: process.env.VUE_APP_APP_ID,
    appHost: process.env.VUE_APP_APP_HOST,
    // secret:process.env.VUE_APP_OIDC_CLIENT_SECRET,
    // protocol:'oidc'
  })
  const managementClient = new ManagementClient({
    userPoolId: process.env.VUE_APP_USER_POOL_ID,
    secret: process.env.VUE_APP_SECRET,
    host: process.env.VUE_APP_PUBLIC_HOST,
    publicKey: process.env.VUE_APP_PUBLIC_KEY
  })
  import sidentify from '@/components/sidentify/sidentify' //--引入验证码组件--
  import { postAuditLogs } from '@/api/logapi'
  export default {
    data() {
      return {
        // 验证码校验
        validateCode: (rule, value, callback) => {
          if (this.identifyCode !== value) {
            this.inputForm.code = ''
            this.changeCode()
            callback(new Error('请输入正确的验证码'))
          } else {
            callback()
          }
        },
        checked: false, //是否记住密码
        inputForm: {
          phone: '',//手机号
          password: '',//密码
          code: '' //验证码
        },
        percentageNum: 0,//进度条
        loadShow: false, //加载
        interVal: null,

        // 验证码初始值
        identifyCode: 'm6a8',// 这个就是随机生成的验证码
        // 验证码的随机取值范围
        identifyCodes: '123456789abcdefghjkmnpqrstuvwxyz',
      };
    },
    components: {
      sidentify
    },
    mounted() {
      this.init()
      this.isRememberPassword()
      this.keyDown()
      // 刷新页面就生成随机验证码
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    methods: {
      init() {
        this.percentageNum = 0
        this.loadShow = false
        this.interVal = null
      },
      // 监听回车
      keyDown() {
        document.onkeydown = (e) => {   //按下回车提交
          let key = window.event.keyCode;
          //事件中keycode=13为回车事件
          // console.log(key,'key--->')
          if (key == 13) {
            this.login()
          }
        };
      },
      // 是否记住密码
      isRememberPassword() {
        this.$refs.inputForm.resetFields()
        let phone = this.$cookies.get('phone')
        let passWord = this.$cookies.get('password')
        if (phone) {
          this.inputForm.phone = phone
        }
        if (passWord) {
          this.inputForm.password = passWord
          this.checked = true
        } else {
          this.checked = false
        }
      },
      // 点击验证码刷新验证码
      changeCode() {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
      randomNum(min, max) {
        max = max + 1
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 随机生成验证码字符串
      makeCode(data, len) {
        for (let i = 0; i < len; i++) {
          this.identifyCode += data[this.randomNum(0, data.length - 1)]
        }
      },
      // 记住密码change事件
      rememberPasswordChange() {

      },
      // 登录
      login() {
        // this.getOidcAuthentication()
        // return
        this.$refs['inputForm'].validate( async (valid) => {
          if (valid) {
            this.loadShow = true //加载中
            this.interVal = setInterval(() => {
              this.percentageNum += 5
            }, 500)
            // authenticationClient.loginByUsername(this.inputForm.phone, this.inputForm.password, {
            try {
              const info = await authenticationClient.loginByPhonePassword(this.inputForm.phone, this.inputForm.password, {
                customData: {
                  source: 'google'
                },
              })
              this.resolveLogin(info)
            } catch(err) {
              try {
                const info = await authenticationClient.loginByUsername(this.inputForm.phone, this.inputForm.password, {
                  customData: {
                    source: 'google'
                  },
                })
                this.resolveLogin(info)
              } catch(e) {
                console.log(e)
                this.rejectLogin(e)
              }
            }
          }
        });
      },

      async resolveLogin(info) {
        if (info) {
          this.getRole(info.id)   // 获取角色
          const { total, list:groupList } = await managementClient.acl.listNamespaces(1,9999)  //所有分组
          console.log(groupList,'所有分组------------------>>>>>>>>>>>>>>>>')
          let ps = []
          groupList.forEach(item => {
            ps.push(managementClient.users.listAuthorizedResources(info.id, item.code, {
              // resourceType: 'MENU',
            }))
          })
          let result = await Promise.all(ps)  //获取所有的资源列表
          console.log(result,'资源授权信息------------------------>>>>>>>>>>>>>>>')
          // console.log(result)
          let resources = []  //所有资源列表
          if(result && result.length) {
            result.forEach(item => {
              if(item.list && item.list.length) {
                resources.push(...item.list)
              }
            })
            resources = [...new Set(resources.map(item => JSON.stringify(item)))].map(item => JSON.parse(item))
          }
          localStorage.setItem('resources',JSON.stringify(resources))
          this.$cookies.set('phone', this.inputForm.phone) //手机号
          if (this.checked) {
            this.$cookies.set('password', this.inputForm.password)
          } else {
            this.$cookies.remove('password')
          }
          clearInterval(this.interVal)
          setTimeout(() => {
            this.percentageNum = 100
            setTimeout(() => {
              this.$router.replace('/')
            }, 400)
          }, 200)
          // 保存登入日志
          postAuditLogs([{
            user_id: info.id,
            staff_id: info.id,
            ip: '192.168.78.15',
            op_type: '5',
            op_desc: `${info.username}登入系统`,
            log_level: '一般',
            business_system: process.env.VUE_APP_BUSINESS_SYSTEM.split(',')[0]
          }]).then(data => {}).catch(err => {})
        }
      },

      rejectLogin(error) {
        this.loadShow = false
        clearInterval(this.interVal)
        this.percentageNum = 0
        this.$message.error(error.message)
        // 保存登入异常日志
        postAuditLogs([{
          user_id: '0',
          staff_id: '0',
          ip: '192.168.78.15',
          op_type: '5',
          op_desc: `登入系统出错`,
          log_level: '一般',
          business_system: process.env.VUE_APP_BUSINESS_SYSTEM.split(',')[0]
        }]).then(data => {}).catch(err => {})
      },

      // 获取角色
      async getRole(userId) {
        const { totalCount, list } = await managementClient.users.listRoles(userId)
        console.log(list,'角色-------->>')
        // localStorage.setItem('identityName',list.length?list[0].description || '' : '')
        let permissions = list.map(item => item.code) || []
        if(permissions && permissions.length) {
          localStorage.setItem('permissions',JSON.stringify(permissions))
        }else {
          localStorage.setItem('permissions','[]')
        }
      },

      // OIDC认证
      async getOidcAuthentication() {
        // let res = await authenticationClient.getAccessTokenByCode()
        // console.log(res,'--------------------->')
        let oidcIssuer = process.env.VUE_APP_OIDC_ISSUER
        request({
          url: oidcIssuer + '/.well-known/openid-configuration',
          method: 'get'
        }).then(data => {
          console.log(data, 'oidc----test------------------->')
          if (data) {
            let currentTime = new Date().toLocaleTimeString('chinese', { hour12: false })
            let nonce = Date.parse(new Date(this.get_date(0) + ' ' + currentTime)) + '000'
            let callbackUrl = process.env.VUE_APP_LOGIN_CALLBACK_URL
            this.getCodeAuthentication(data.authorization_endpoint,nonce,data.scopes_supported.join('+'),process.env.VUE_APP_OIDC_CLIENT_ID,callbackUrl,'code')
          }
        })
      },
      getCodeAuthentication(url, nonce, scope, client_id, redirect_uri, response_type) {
        console.log(url + '?nonce=' + nonce + '&scope=' + scope + '&client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=' + response_type,'拼接----->')
        // request({
        //   url:url + '?nonce=' + nonce + '&scope=' + scope + '&client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=' + response_type,
        //   method:'get'
        // }).then(data => {
        //   console.log(data,'oidcUrl拼接------------------------>')
        // }).catch(e => {
        //   console.log(e,'catch-------------------------------->')
        // })
      },




      addZero(num) {//补0
        if (parseInt(num) < 10) {
          num = '0' + num;
        }
        return num;
      },
      /**
       * 获取指定时间的日期
       * @params 正是今天之后的日期、负是今天前的日期
       * @return 2020-08-22
       * */
      get_date(num) {
        var date1 = new Date();
        //今天时间
        var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + num);
        //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
        var time2 = this.addZero(date2.getFullYear()) + "-" + this.addZero((date2.getMonth() + 1)) + "-" + this.addZero(date2.getDate());
        return time2;
      },
    },
  }
</script>
<style scoped>
.box {
  height: 100%;
  background: url("../../../assets/img/login/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.content {
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.from {
  width: 450px;
  height: 450px;
  margin-left: 8%;
}

.login {
  margin: 30px;
  height: 390px;
}

.title {
  font-weight: 500;
  color: #fff;
  font-size: 23px;
  text-align: center;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}

.model {
  width: 100%;
  height: 100%;
  height: calc(100% - 40px);
  background: url("../../../assets/img/login/loginModel.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.name {
  text-align: center;
  color: #fff;
  line-height: 80px;
  height: 80px;
}

/deep/.el-input__inner {
  border: 2px solid #00bdd7;
  border-radius: 0px;
  background: rgba(0, 77, 136, 0.1);
  color: #fff;
}

.copy {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 10px;
  font-size: 8px;
  color: #74a5cf;
}

.load {
  position: absolute;
  bottom: 80px;
  width: 100%;
  height: 80px;
  text-align: center;
}

.msg {
  color: #fff;
  font-size: 15px;
  text-shadow: #000 2px 2px 2px;
}
</style>