<doc>
  关键设备维修分析
</doc>
<template>
  <div class="box">
    <bar :centerLeftResult="centerLeftResult"></bar>
  </div>
</template>
<script>
  import bar from '@/views/page/electromechanical/model/bar'
  import { repairCnts } from '@/api/electromechanical2'
  export default {
    data() {
      return {
        centerLeftResult: []
      }
    },
    // props:['centerLeftResult'],
    components: {
      bar,
    },
    mounted() {
      this.repairCnts()
    },
    methods: {
      // 关键设备维修分析
      repairCnts() {
        repairCnts().then(data => {
          if (data && data.success && data.data.length) {
            for (let i in data.data[0]) {
              this.centerLeftResult.push({
                name: i,
                value: data.data[0][i]
              })
            }
          }
        })
      }
    },
  }
</script>
<style scoped>
  .box {
    height: 100%;
    width: 100%;
  }
</style>