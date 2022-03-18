<doc>
  柱形图
</doc>
<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    props: ['id', 'systemAlarmsData', 'type'],
    data() {
      return {
        charts: '',
        // data: [],
      };
    },
    watch: {
      systemAlarmsData() {
        // this.data = []
        // this.systemAlarmsData.forEach(element => {
        //   this.data.push({
        //     name: element.name,
        //     value: element.value
        //   })
        // });
        this.show(this.id)
      }
    },
    mounted() {
      this.show(this.id)
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      show(id) {
        let name = this.type === 'system' ? '系统' : '设备'
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          title: {
            text: '各' + name + '报警次数',
            textAlign: 'left',
            x: 'center',
            y: 'top',
            top: '7%',
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12)
            }
          },
          tooltip: {},
          legend: {
            orient: 'vertical',
            top: '25%',
            left: '15%',
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12)
            },
            itemWidth: fontChart(12),
            itemHeight: fontChart(12)
          },
          grid: {
            top: '20%',
            bottom: '10%',
            left: '10%',
            right: '10%'
          },
          series: [{
            name: '报警次数',
            type: 'pie',
            radius: [fontChart(15), fontChart(70)],
            center: ['68%', '60%'],
            // roseType: 'area',
            itemStyle: {
              borderRadius: fontChart(2)
            },
            label: {
              position: 'inside',
              formatter: '{c}',
              fontWeight: 600,
              color: '#fff',
              fontSize:fontChart(14)
            },
            data: this.systemAlarmsData
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        this.charts.on('mouseover',this.pieMouseOver)
        this.charts.on('mouseout',this.pieMouseOut)
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.show(this.id)
      },
      pieMouseOver(params) {
        this.$emit('pieMouseOver',params.data)
      },
      pieMouseOut() {
        this.$emit('pieMouseOut')
      }
    }
  }
</script>
<style scoped>

</style>