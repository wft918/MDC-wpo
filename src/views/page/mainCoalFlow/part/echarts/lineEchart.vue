<doc>
  折线图
</doc>
<template>
  <div id="line" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    props: ['lineData'],
    data() {
      return {
        charts: '',
        label: ['智能配煤', '未配煤'],
        xValue: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        yValue: [
          [5, 20, 36, 10, 10, 20, 16],
          [15, 24, 43, 21, 14, 17, 34]
        ],
      };
    },
    watch: {
      lineData() {
        this.label = []
        this.yValue = []
        this.xValue = []
        this.lineData.forEach(element => {
          this.label.push(element.item)
          let yDatas = []
          element.allData.forEach(ele => {
            if (this.xValue.indexOf(ele.stat_time) < 0) {
              this.xValue.push(ele.stat_time)
            }
            yDatas.push(ele.value)
          })
          this.yValue.push(yDatas)
        });
        this.show("line")
      }
    },
    mounted() {
      this.show("line")
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#1890FF', '#FF7D00'],
          tooltip: {},
          legend: {
            show: true,
            top: 15,
            right: 0,
            align: 'left',
            x: 'center',
            y: 'top',
            icon: 'rect',
            itemHeight: fontChart(5),
            itemWidth: fontChart(15),
            data: this.label,
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12)
            },
          },
          xAxis: {
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#0092D5'
              }
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.8)',
              textStyle: {
                fontSize:fontChart(12)
              }
            },
            data: this.xValue
          },
          yAxis: {
            name: "(万元)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(12),
              align: 'right'
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#0092D5',
                opacity: 0.3
              }
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.8)',
              textStyle: {
                fontSize:fontChart(12)
              }
            },
          },
          grid: {
            top: '25%',
            bottom: '10%',
            left: '10%',
            right: '2%'
          },
          series: [{
            name: this.label[0],
            barWidth: fontChart(15),
            type: 'line',
            smooth: true,
            data: this.yValue[0],
          }, {
            name: this.label[1],
            barWidth: fontChart(15),
            type: 'line',
            smooth: true,
            data: this.yValue[1],
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.show("line")
      }
    }
  }
</script>
<style scoped>

</style>