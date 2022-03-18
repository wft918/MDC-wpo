<doc>
  进度
</doc>
<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    props: ['id', 'name','val', 'unit'],
    data() {
      return {
        charts: '',
        yValue: [],
        xValue: [],
      };
    },
    watch: {
      val(newVal) {
        this.$nextTick(()=> {
          this.show(this.id)
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.show(this.id)
      })
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
                value: parseInt(100 - this.val),
                label: {
                  normal: {
                    show: false,
                  }
                }
              }, {   // 数据值
                value: parseInt(this.val),
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
                  formatter: '\n{b}\n\n ' + `{a| {c} }` + '\n\n' + this.unit,
                  rich: {
                    a: {
                      color: '#1890ff',
                      fontSize: 30,
                      fontWeight: 600,
                    }
                  }
                },
              }]
            }
          ]
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