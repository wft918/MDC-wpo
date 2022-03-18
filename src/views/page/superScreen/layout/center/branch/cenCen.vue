<template>
  <div style="width: 100%;height: 100%;">
    <!-- 页签 -->
    <div style="width: 100%;height: 32px;text-align: center;line-height: 32px;display: flex;">
      <div class="image" @click="leftClick">
        <img src="../../../../../../assets/img/system/left.png" alt="">
      </div>
      <div class="tab">
        <div @click="tabClick(index)" :class="{'selectTab':currentIndex == index}" v-for="(item,index) in tabList" :key="item">{{item}}</div>
      </div>
      <div class="image" @click="rightClick">
        <img src="../../../../../../assets/img/system/right.png" alt="">
      </div>
    </div>
    <!-- 视频 -->
    <div style="width: 100%;height: calc(100% - 32px);padding: 20px;padding-top: 10px;box-sizing: border-box;">
      <img style="width: 100%;height: 100%;" src="../../../../../../assets/img/superScreen/cenCen.png" alt="">
    </div>
  </div>
</template>
<script>
  import { videolist } from '@/api/monitor'
  import { handleVideo } from '@/utils/handelVideo'
  export default {
    data() {
      return {
        // tabList:['主煤流线','采煤工作面','掘金工作面','主皮带','通风','水泵房','井下中央变电所'],
        currentIndex:0, //当前选中index
        videoList:[]
      }
    },
    computed: {
      tabList:() => process.env.VUE_APP_SUPERSCREEN_VIDEO_TABLIST.split(':')
    },
    mounted() {
      this.getVideoList()
    },
    methods: {
      // 获取视频列表
      getVideoList() {
        videolist().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.videoList = handleVideo(data.data,this.currentIndex,'超大屏')
              this.$events.$emit('videoList',this.videoList)
            }
          }
        })
      },
      // 点击页签
      tabClick(index) {
        this.currentIndex = index
      },
      // 点击左边
      leftClick() {
        if(this.currentIndex) {
          this.currentIndex--
        }
      },
      // 点击右边
      rightClick() {
        if(this.currentIndex < this.tabList.length - 1) {
          this.currentIndex++
        }
      }
    },
  }
</script>
<style scoped>
  .image {
    width: 32px;
    height: 100%;
  }
  .image img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .tab {
    width: calc(100% - 64px);
    height: 100%;
    display: flex;
    font-size: 15px;
  }
  .tab > div {
    /* width: calc(100%/7); */
    width: 100%;
    height: 100%;
    border: 1px solid #0184d6;
    box-sizing: border-box;
    background-color: rgba(4, 123, 200, 0.42);
    color: #fff;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .selectTab {
    background: linear-gradient(to right,#00a5df,#0196d6,#047bc8);
  }
</style>