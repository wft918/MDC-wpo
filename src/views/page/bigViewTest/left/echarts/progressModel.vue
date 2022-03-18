<doc>
  进度
</doc>
<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    props: ['id', 'name', 'unit','value', 'allCount', 'okCount'],
    data() {
      return {
        charts: '',
      };
    },
    watch: {
      value() {
        this.$nextTick(()=>{
          this.show(this.id)
        })
      },
      allCount() {
        this.$nextTick(() => {
          this.show(this.id)
        })
      },
      okCount() {
        this.$nextTick(() => {
          this.show(this.id)
        })
      },
    },
    mounted() {
      this.$nextTick(()=>{
        this.show(this.id)
      })
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
              radius: ['72%', '92%'],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: this.allCount - this.okCount,
                label: {
                  normal: {
                    show: false,
                  }
                }
              }, {   // 数据值
                value: this.okCount,
                // 数据项名称
                name: this.name,
                //该数据项是否被选中
                selected: false,
                // 单个扇区的标签配置
                label: {
                  // 是显示标签
                  show: true,
                  position: 'center',
                  fontSize: 14,
                  color: '#fff',
                  lineHeight: 15,
                  formatter: `{bb| {b} }\n` + `{a| `+ this.value +` }` + `\n` + `{bb| ` +this.unit+ `}`,
                  rich: {
                    a: {
                      color: '#1890ff',
                      fontSize: fontChart(20),
                      fontWeight: fontChart(600),
                      lineHeight: fontChart(25)
                    },
                    bb: {
                      fontSize: fontChart(13),
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