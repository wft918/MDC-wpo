<template>
  <div style="width: 100%;height: 100%;color: #fff;padding-top: 40px;box-sizing: border-box;display: flex;justify-content: space-between;flex-wrap: wrap;align-content: flex-start;">
    <div v-for="(item,index) in rendeLtVideo" :key="index" style="width: 49%;height: 25%;">
      <div style="width: 100%;height: .15625rem;color: #00bff8;font-weight: 700;font-size: 14px;">摄像头#00{{index + 1}}</div>
      <div style="width: 100%;height: calc(85% - .15625rem);margin-top: 3px;border: 1px solid #0299cc;">
        <!-- <img style="width: 100%;height: 100%;" src="../../../../../../assets/img/superScreen/leftOright.png" alt=""> -->
        <easy-player :url="item.url"></easy-player>
      </div>
    </div>
  </div>
</template>
<script>
  import easyPlayer from '@/components/easyPlayer/easyPlayer'
  export default {
    data() {
      return {
        videoUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni4934e7b/c4d93960-5643-11eb-a16f-5b3e54966275.m3u8',
        rendeLtVideo:[]
      }
    },
    components: {
      easyPlayer
    },
    mounted() {
      this.$events.$on('videoList',(videoList) => {
        this.rendeLtVideo = videoList.slice(0,8)
      })
    },
  }
</script>
<style scoped>

</style>