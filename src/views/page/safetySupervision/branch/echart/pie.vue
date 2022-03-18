<!-- 右下 -->
<template>
  <div style="width: 100%;height: 100%;">
    <div :id="id" style="width: 100%;height:100%;"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem.js'
  export default {
    data() {
      return {
        charts:''
      }
    },
    props:['id','title','colorList','data','xdistans','seriesCenter','leftTitle'],
    watch: {
      data() {
        this.drawPie()
      }
    },
    mounted() {
      // this.drawPie()
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      drawPie() {
        this.charts = echarts.init(document.getElementById(this.id));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: this.title,
            left: this.leftTitle,
            textStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(15)
            }
          },
          legend: {
            textStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(15)
            },
            x : this.xdistans,
            y : 'center',
            itemHeight: fontChart(15),
            itemWidth: fontChart(25),
            orient : 'vertical',
          },
          color:this.colorList,
          series: [
            {
              // name: 'Nightingale Chart',
              type: 'pie',
              center: this.seriesCenter,
              label: {
                normal: {
                  show: true,
                  position:'inner',
                  formatter: '{c}',
                  color:'rgba(255, 255, 255, 0.8)',
                  fontSize:fontChart(16)
                },
              },
              data: this.data
            }
          ]
        };
        // if(this.title == '隐患等级统计') {
        //   option.legend.x = '5%'
        //   option.series[0].center[0] = '60%'
        //   option.color = ['#f00041','#fac800','#008eea']
        // }else if(this.title == '隐患专业统计') {
        //   option.legend.x = '1%'
        //   option.series[0].center[0] = '73%'
        //   option.title.left = '60%'
        //   option.color = ['#008eea','#acff02','#fac800','#ff8a2d','#06c8cd','#03ac32','#1760bc','#7584ac','#b1ac70','#02bfff','#5ba1ff','#7ed321','#98aac2']
        // }
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.drawPie()
      }
    },
  }
</script>