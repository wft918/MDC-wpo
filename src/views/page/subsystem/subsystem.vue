<doc>
  子系统嵌入页面
</doc>
<template>
  <div style="width: 100%;height: 100%;">
    <!-- 有多个url嵌入，导航菜单展示  水平 -->
    <div v-if="isShow && mode == 'horizontal'" style="width: 100%;height: 100%;">
      <div style="width: 100%;height: .317708rem;background-color: #1c233a;">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" mode="horizontal" background-color="#393747" unique-opened text-color="#fff" active-text-color="#409eff">
          <sub-menu @embed="embed" v-for="system in subSystems" :key="system.id" :system="system"></sub-menu>
        </el-menu>
      </div>
      <div style="width: 100%;height: calc(100% - .317708rem);">
        <iframe id="iframe" style="width: 100%;height: 100%;z-index: 99;" :src="currentSystemUrl"
          frameborder="0"></iframe>
      </div>
    </div>
    <!-- 有多个url嵌入，导航菜单左侧展示  垂直 -->
    <div v-if="isShow && mode == 'vertical'" style="width: 100%;height: 100%;display: flex;">
      <div style="width: 10%;height: 100%;background-color: #393747;overflow: auto;">
        <div style="height: 100%;display: inline-block;">
          <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" mode="vertical" background-color="#393747" unique-opened text-color="#fff" active-text-color="#409eff">
            <sub-menu @embed="embed" v-for="system in subSystems" :key="system.id" :system="system"></sub-menu>
          </el-menu>
        </div>
      </div>
      <div style="width: 90%;height: 100%;">
        <iframe id="iframe" style="width: 100%;height: 100%;z-index: 99;" :src="currentSystemUrl"
          frameborder="0"></iframe>
      </div>
    </div>
    <!-- 只有一个url嵌入 -->
    <div v-if="!isShow" style="width: 100%;height: 100%;">
      <iframe id="iframe" style="width: 100%;height: 100%;z-index: 99;" :src="currentSystemUrl" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script>
  import '@/utils/flexible'
  import subMenu from './subMenu'
  import { AuthenticationClient } from 'authing-js-sdk'
  const authenticationClient = new AuthenticationClient({
    appId: process.env.VUE_APP_APP_ID,
    appHost: process.env.VUE_APP_APP_HOST,
    token: localStorage.getItem('_authing_token')
  })
  export default {
    data() {
      return {
        subSystems: [],
        interVal: null, //定时向子系统发送accesstoken
        currentSystemUrl: '',
        isShow:true,
        defaultActive:'' //菜单默认激活
      }
    },
    components: {
      subMenu
    },
    mounted() {
      if (this.$route.query.system) {
        let subSystems = JSON.parse(this.$route.query.system)
        this.handlerData(subSystems)
        sessionStorage.setItem('subSystems', JSON.stringify(subSystems))
      }
      this.subSystems = JSON.parse(sessionStorage.getItem('subSystems') || '[]')
      console.log(this.subSystems, 'subSystems--->>>>')
      this.judgeData(this.subSystems)
      this.getFirstUrl(this.subSystems)
      this.sendUrl()
      this.receiveMessage()
      this.interVal = setInterval(this.receiveMessage, 30000) // 每30秒更新token 向子系统发送
      // 监听子系统发来消息，authingToken过期
      window.addEventListener("message", this.receiveMessage, false);
    },
    watch: {
      '$route': {
        handler(to, from) {
          if (to.query.system) {
            let subSystems = JSON.parse(to.query.system)
            this.handlerData(subSystems)
            sessionStorage.setItem('subSystems', JSON.stringify(subSystems))
            this.subSystems = JSON.parse(sessionStorage.getItem('subSystems') || '[]')
            console.log(this.subSystems,'渲染的数组---->>>')
            this.judgeData(this.subSystems)
            this.getFirstUrl(this.subSystems)
            // 有新的子系统嵌入先刷新token并发送 然后每30秒更新token 向子系统发送
            this.sendUrl()
            this.receiveMessage()
            if (this.interVal) clearInterval(this.interVal)
            this.interVal = setInterval(this.receiveMessage, 30000)
          }
        },
        deep: true
        // ---第一次不需要监听到---
        // immediate:true
      }
    },
    computed: {
      authing_token: () => localStorage.getItem('_authing_token'),
      mode: () => process.env.VUE_APP_SUBSYSTEM_ORIENT
    },
    destroyed() {
      window.removeEventListener("message", this.receiveMessage, false);  //移除监听
      clearInterval(this.interVal)
      this.interVal = null
    },
    methods: {
      // 子系统的链接拼接access_token
      handlerData(data) {
        for(let i = 0;i < data.length;i++) {
          if(!data[i].children || !data[i].children.length) {
            if(data[i].url) {
              let currentUrlLength = data[i].url.split('?').length
              if(currentUrlLength > 1) {
                data[i].url = data[i].url.split('?')[0] + '?access_token=' + this.authing_token + '&' + data[i].url.split('?')[1]
              }else {
                data[i].url = data[i].url.split('?')[0] + '?access_token=' + this.authing_token
                console.log('else')
              }
            }
          }else {
            this.handlerData(data[i].children)
          }
        }
      },
      // 判断最后是否只有一个url 来控制页面展示
      judgeData(data) {
        if(data.length == 1) {
          if(data[0].children && data[0].children.length) {
            this.judgeData(data[0].children)
          }else {
            this.isShow = false
          }
        }else {
          this.isShow = true
        }
      },
      // 进来取第一个url嵌入
      getFirstUrl(data) {
        if(data[0].children && data[0].children.length) {
          this.getFirstUrl(data[0].children)
        }else {
          this.currentSystemUrl = data[0].url
          this.defaultActive = data[0].id
        }
      },

      // 点击嵌入
      embed(url) {
        url = url || ''
        this.currentSystemUrl = url
        this.sendUrl()
      },
      // 接收到子系统发来的消息  ---   authingToken  过期
      async receiveMessage(event) {
        // console.log(event,'来自子系统的消息----->>>')
        let data = await authenticationClient.refreshToken() //刷新token
        let iframe = document.getElementById('iframe')
        if (data.token) {
          iframe.contentWindow.postMessage(JSON.stringify({
            access_token: data.token
          }), '*')   //第二个参数如果是*  则表示可以传递给任意窗口
        }
        // authenticationClient.logout()
        // this.$router.replace('/login')
      },
      // 发送url
      sendUrl() {
        let iframe = document.getElementById('iframe')
        iframe.contentWindow.postMessage(JSON.stringify({
          access_url:this.currentSystemUrl
        }),'*')
      }
    },
  }
</script>
<style scoped>
  /* iframe { pointer-events:none!important; } */

  /deep/ .el-menu {
    border: none!important;
  }

  /deep/ .el-submenu__title {
    font-size: .072917rem;
    height: .291667rem;
    box-sizing: border-box;
  }
  /deep/ .el-submenu .el-menu-item {
    font-size: .072917rem;
    height: .260417rem;
    box-sizing: border-box;
  }
  /deep/ .el-menu-item {
    font-size: .072917rem;
    height: .291667rem;
    box-sizing: border-box;
  }

  /* 箭头 */
  /deep/ .el-submenu__icon-arrow {
    right:0;
  }
</style>