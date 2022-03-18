<doc>
  折线图
</doc>
<template>
  <div id="line2" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    props: ['lineData'],
    data() {
      return {
        charts: '',
        label: [],
        yValue: [],
        xValue: []
      };
    },
    mounted() {
      this.show('line2')
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
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
              yDatas.push(ele.value)
            } else {
              yDatas[this.xValue.indexOf(ele.stat_time)] = ele.value
            }
          })
          this.yValue.push(yDatas)
        });
        this.show('line2')
      }
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        let option = {
          color:['#1890ff','#fac800'],
          title: {
            text: '工作面煤量监测',
            textAlign: 'left',
            x: 'center',
            y: 'top',
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(14)
            }
          },
          legend: {
            data: this.label,
            show: true,
            top: 5,
            right: 0,
            align: 'left',
            icon: 'rect',
            itemHeight: fontChart(11),
            itemWidth: fontChart(11),
            // data: this.label,
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12)
            },
          },
          grid: {
            top: '29%',
            bottom: '17%',
            left: '7%',
            right: '2%'
          },
          tooltip: {},
          xAxis: {
            data: this.xValue,
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
              fontSize:fontChart(12)
            },
          },
          yAxis: {
            name: "(吨)",
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
              fontSize:fontChart(12)
            },
          },
          series: [
            {
              name: this.label[0],
              type: 'bar',
              data: this.yValue[0],
              emphasis: {
                focus: 'series'
              },
              // barGap: '-50%',
              z: 3,
              animationDelay: (idx) => {
                return idx * 10;
              }
            },
            {
              name: this.label[1],
              type: 'bar',
              data: this.yValue[1],
              emphasis: {
                focus: 'series'
              },
              animationDelay: (idx) => {
                return idx * 10 + 100;
              }
            }
          ],
          // animationEasing: 'elasticOut',
          animationDelayUpdate: (idx) => {
            return idx * 5;
          }
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.show('line2')
      }
    }
  }
</script>
<style scoped>

</style>