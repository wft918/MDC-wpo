<!-- GIS一张图页面 -->
<template>
  <div style="width: 100%;height: 100%;overflow: hidden;">
    <!-- <iframe style="width: 100%;height: 120%;margin-top: -8.5%" :src="url" frameborder="0"></iframe> -->
    <iframe style="width: 100%;height: 100%;" :src="url" frameborder="0"></iframe>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        url:''
      }
    },
    mounted() {
      this.url = process.env.VUE_APP_SUBSYSTEM_GIS
    },
    methods: {
      
    },
  }
</script>
<style scoped>

</style>
