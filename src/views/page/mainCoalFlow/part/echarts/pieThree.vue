<doc>
  柱形图
</doc>
<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    props: ['id', 'type', 'data', 'unit', 'startedTime'],
    data() {
      return {
        charts: '',
      };
    },
    mounted() {
      this.show(this.id)
    },
    watch: {
      data() {
        this.$nextTick(()=> {
          this.show(this.id)
        })
      },
      startedTime() {
        this.$nextTick(() => {
          this.show(this.id)
        })
      },
      unit() {
        this.$nextTick(() => {
          this.show(this.id)
        })
      }
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          tooltip: {},
          grid: {
            top: '10%',
            bottom: '10%',
            left: '10%',
            right: '10%'
          },
          color: this.type ? ['#3e505b', '#e6003b'] : ['#3e505b', '#00d166'],
          series: [{
            name: '',
            type: 'pie',
            radius: [30, 45],
            center: ['50%', '50%'],
            itemStyle: {
              borderRadius: 2
            },
            label: {
              show: false,
            },
            data: [
              { value: ( Number(this.data) - Number(this.startedTime)), name: '未完成' },
              {
                value: Number(this.startedTime), name: '完成', label: {
                  normal: {
                    // 是显示标签
                    show: true,
                    position: 'center',
                    fontSize: 11,
                    color: '#fff',
                    lineHeight: 15,
                    // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                    formatter: '计划' + this.data + this.unit + `\n `+ this.startedTime +`小时`
                  }
                },
              },
            ]
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