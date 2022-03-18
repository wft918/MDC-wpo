<!-- 左上  右中 -->
<template>
  <div style="width: 100%;height: 100%;">
    <div :id="id" style="width: 100%;height:100%;"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.drawBar()
    },
    props:['id','xValue','yValue'],
    watch: {
      yValue() {
        this.drawBar()
      }
    },
    methods: {
      drawBar() {
        let charts = echarts.init(document.getElementById(this.id))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show:false,
            // data: ['违章指挥'],
            textStyle: {
              // fontSize: 12,
              color: '#7e8390'
            },
            // itemStyle: {
            //   borderType: 'dashed',
            //   borderColor: '#0182d6',
            //   borderWidth: 1
            // }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.xValue,
            axisTick: {
              show:false,
              // alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color:'#0f5681'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: 14      //更改坐标轴文字大小
              },
              interval:0,  
              rotate:10
            }
          },
          yAxis: {
            type: 'value',
            name: '个',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: 14      //更改坐标轴文字大小
              }
            },
            splitLine: {
              lineStyle: {
                color:'#0f5681',
                type:'dotted'
              }
            },
          },
          series: [
            {
              // name: '违章指挥',
              type: 'bar',
              label: {
                show:true,
                position:'top'
              },
              barWidth: '40%',
              itemStyle: {
                color: '#008eea'
              },
              data: this.yValue
            }
          ]
        }
        charts.setOption(option);
        window.addEventListener('resize',() => {
          charts.resize()
        })
      }
    },
  }
</script>