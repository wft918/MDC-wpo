<template>
  <div class="content">
      <top></top>
      <div style="width: 100%;height: calc(100% - .286458rem);">
        <!-- Tag页签 -->
        <div class="breadcrumb">
          <el-tag
            :style="{'background-color':currentIndex == null?'#0583d7':''}"
            :closable="false">
            <router-link style="text-decoration:none;" :style="{'color':currentIndex == null?'#fff':'#888d9a'}" to="/">主页</router-link>
          </el-tag>
          <el-tag
            v-for="(mainTab,index) in mainTabs"
            :key="mainTab.path"
            :style="{'background-color':currentIndex == index?'#0583d7!important':'','color':currentIndex == index?'#fff!important':''}"
            @click="tagClick(index,mainTab)"
            @close="tagClose(index)"
            closable>
            {{mainTab.meta.title}}
          </el-tag>
        </div>
        <!-- 主体内容 -->
        <div style="width: 100%;height: calc(100% - .171875rem);">
          <router-view />
        </div>
      </div>
  </div>
</template>

<script>
  import top from '@/views/layout/top'
  import '@/utils/flexible.js'
  export default {
    name: "Home",
    data() {
      return {
        currentIndex:null //当前选中tag的index
      }
    },
    components: {
      top,   // 首页头页面
    },
    computed: {
      mainTabs: {
        get() {
          return this.$store.state.common.mainTabs
        },
        set(val) {
          this.$store.commit('common/updatemainTabs',val)
        }
      }
    },
    watch: {
      '$route': {
        handler(to,from) {
          if(to.path != '/home') {
            if(to.path == '/subsystem') {
              if(to.query.title) {
                to.meta.title = to.query.title
              }
            }
            this.mainTabs = to //存路由

            let pathList = this.mainTabs.map(item => item.path)
            let idx = pathList.indexOf(to.path)
            this.currentIndex = idx //每次路由跳转高亮对应的tag页签
          }else {
            this.currentIndex = null //首页
          }
        },
        deep:true
      },
    },
    methods: {
      // 点击tag页签
      tagClick(index,mainTab) {
        // console.log(index,'点击的index----->')
        this.$router.replace(mainTab.path)
      },
      // 关闭tag页签
      tagClose(index) {
        this.mainTabs = index //  maintabs中删除
        
        if(index == this.currentIndex) { //关闭的页签正是当前打开的页面  关闭需考虑页面跳转
          if(index == 0) { //关闭第一个
            if(this.mainTabs.length) {
              this.$router.replace(this.mainTabs[0].path)
            }else {//只有一个 mainTabs.length === 0
              this.$router.replace('/')
            }
          }else if(index == this.mainTabs.length) { //关闭最后一个
            this.$router.replace(this.mainTabs[this.mainTabs.length - 1].path)
          }else {
            this.$router.replace(this.mainTabs[index].path)
          }
        }else if(index < this.currentIndex) { //关闭的index 在当前打开页面之前 maintabs里的index将改变
          this.currentIndex--
        }
      }
    },
  };
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: antiquewhite;
    height: 100%;
    /* background: url("../assets/img/system/bg-img.png"); */
    background-color: #000723;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .breadcrumb {
    width: 100%;
    height: .166667rem;
    border-bottom: .005208rem solid #505b75;
    background-color: #1c233a;
  }

  .el-tag {
    background-color: #293249;
    border: none;
    color: #888d9a;
    font-size: .072917rem;
    height: .166667rem;
    text-align: center;
    line-height: .166667rem;
    cursor: pointer;
    margin-left: .010417rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>