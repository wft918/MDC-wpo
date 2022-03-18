<doc>
  折线图
</doc>
<template>
  <div id="line3" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '../../../../../utils/echartPxToRem.js'
  export default {
    props: ['areaData'],
    data() {
      return {
        charts: '',
        xValue: [],
        yValue: []
      };
    },
    watch: {
      areaData() {
        this.xValue= [],
        this.yValue= []
        this.areaData.forEach(element => {
          this.xValue.push(element.区域)
          this.yValue.push(element.人数)
        });
        this.$nextTick(() => {
          this.show('line3')
        })
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.show('line3')
      })
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#1890FF', '#fac800'],
          tooltip: {},
          xAxis: {
            name: "(区域)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 1)',
              align: 'left',
              fontSize:fontChart(12)
            },
            offset:fontChart(15),
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#0092D5'
              }
            },
            axisLabel: {
              // color: 'rgba(255, 255, 255, 1)',
              interval: 0,
              rotate: 12,
              align:'center',
              textStyle: {
                color: '#fff',  //更改坐标轴文字颜色
                fontSize: fontChart(12)      //更改坐标轴文字大小
              }
            },
             offset: fontChart(6.5),
            // data: ['3308综采面', '3203综采面', '3303掘进面', '3206掘进面', '中央变电所', '总回风岗']
            data: this.xValue
          },
          yAxis: {
            name: "(人)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 1)',
              align: 'right',
              fontSize:fontChart(12)
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
              // color: 'rgba(255, 255, 255, 1)',
              textStyle: {
                color: '#fff',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
              }
            },
          },
          grid: {
            top: '25%',
            bottom: '17%',
            left: '7%',
            right: '7%'
          },
          series: [{
            type: 'bar',
            data: this.yValue,
            barMaxWidth: fontChart(20),
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: { //数值样式
                    color: "#FFFFFF",
                    fontSize:fontChart(12),
                    fontWeight: fontChart(600)
                  }
                }
              }
            },
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
        this.show('line3')
      }
    }
  }
</script>
<style scoped>

</style>