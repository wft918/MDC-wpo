<doc>
  通风机风量统计 列表趋势
</doc>
<template>
  <div :id="id" style="width: 150%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    data() {
      return {
        charts:''
      }
    },
    props: ['id','xValue','yValue'],
    watch: {
      yValue() {
        this.init(this.id)
      }
    },
    mounted() {
      this.init(this.id)
    },
    destroyed() {
      window.removeEventListener('resize',this.selfAdaption)
    },
    methods: {
      init(id) {
        this.charts = echarts.init(document.getElementById(id));
        let option = {
          grid: {
            bottom: 0,
            left: 0,
            top: 0,
            right: 0,
          },
          tooltip: {
            show:false,
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            data: this.xValue,
            show: false
          },
          yAxis: {
            show: false
          },
          series: [{
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#1890ff'
              }
            },
            data: this.yValue,
            // smooth: true,
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: '#1890ff' // 0% 处的颜色
                  }, {
                    offset: 0.7,
                    color: '#134776' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }]
        }
        this.charts.setOption(option);
        window.addEventListener('resize',this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
      }
    },
  }
</script>
<style scoped>

</style>