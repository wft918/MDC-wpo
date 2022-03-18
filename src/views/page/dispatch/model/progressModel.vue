<doc>
  进度
</doc>
<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '../../../../utils/echartPxToRem.js'
  export default {
    props: ['id', 'name', 'unit','value'],
    data() {
      return {
        charts: ''
      };
    },
    watch: {
      value() {
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
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#414f5b', '#1890ff'],
          series: [
            {
              name: '任务进度',
              type: 'pie',
              radius: ['75%', '100%'],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 0,
                label: {
                  normal: {
                    show: false,
                  }
                }
              }, {   // 数据值
                value: this.value,
                // 数据项名称
                name: this.name,
                //该数据项是否被选中
                selected: false,
                // 单个扇区的标签配置
                label: {
                  // 是显示标签
                  show: true,
                  position: 'center',
                  fontSize: fontChart(14),
                  color: '#fff',
                  lineHeight: fontChart(15),
                  formatter: `{b| {b} }\n\n` + `{a| {c} }` + `\n\n` + `{c| ${this.unit}}`,
                  rich: {
                    a: {
                      color: '#1890ff',
                      fontSize: fontChart(23),
                      fontWeight: 600,
                    },
                    b: {
                      fontSize: fontChart(12),
                    },
                    c: {
                      fontSize: fontChart(12),
                    }
                  }
                },
              }]
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.show(this.id)
      }
    }
  }
</script>
<style scoped>

</style>