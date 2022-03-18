<doc>
  柱形图
</doc>
<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    props: ['id','data'],
    watch: {
      data() {
        this.$nextTick(() => {
          this.show(this.id)
        })
      }
    },
    data() {
      return {
        charts: '',
      };
    },
    mounted() {
      this.$nextTick(()=>{
        this.show(this.id)
      })
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#59678c','#1760bc','#1890ff','#06c8cd','#00d068','#acff02'],
          tooltip: {},
          legend: {
            orient: 'vertical',
            top: '10%',
            left: '15%',
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 12
            },
            itemWidth: 12,
            itemHeight: 12
          },
          grid: {
            top: '10%',
            bottom: '20%',
            left: '10%',
            right: '10%'
          },
          series: [{
            name: '报警次数',
            type: 'pie',
            radius: [15, 70],
            center: ['70%', '52%'],
            // roseType: 'area',
            itemStyle: {
              borderRadius: 2
            },
            label: {
              position: 'inside',
              formatter: '{c}',
              fontWeight: 600,
              color: '#fff'
            },
            data: this.data
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', () => {
          this.charts.resize()
        })
      }
    }
  }
</script>
<style scoped>

</style>