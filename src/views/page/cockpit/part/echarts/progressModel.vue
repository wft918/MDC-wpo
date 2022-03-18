<doc>
  进度
</doc>
<template>
  <div :id="id" style="width: 100%;height:75%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    props: ['id', 'title', 'dw', 'value', 'allCount', 'okCount'],
    data() {
      return {
        charts: '',
        yValue: [],
        xValue: [],
      };
    },
    watch: {
      value() {
        this.show(this.id)
      },
      allCount() {
        this.show(this.id)
      },
      okCount() {
        this.show(this.id)
      },
    },
    mounted() {
      this.show(this.id)
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#414f5b', '#1890ff'],
          series: [
            {
              // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
              name: '任务进度',
              type: 'pie',
              // 饼图的半径，数组的第一项是内半径，第二项是外半径
              radius: ['80%', '95%'],
              // 是否启用防止标签重叠策略，默认开启
              avoidLabelOverlap: false,
              hoverAnimation: false,
              // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
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
                // name: this.title,
                //该数据项是否被选中
                selected: false,
                // 单个扇区的标签配置
                label: {
                  normal: {
                    // 是显示标签
                    show: true,
                    position: 'center',
                    fontSize: fontChart(11),
                    color: '#fff',
                    lineHeight: fontChart(10),
                    // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                    formatter: `{b| ${this.title}}` + '\n\n' + `{c| ${this.value}}` + '\n\n' + `{a| ${this.dw} }`,
                    rich: {
                      a: {
                        color: '#fff',
                        fontSize: fontChart(12),
                        fontWeight: 600,
                      },
                      b: {
                        color: '#fff',
                        fontSize: fontChart(12),
                        fontWeight: 600,
                      },
                      c: {
                        color: '#1890ff',
                        fontSize: fontChart(15),
                        fontWeight: 600,
                      }
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