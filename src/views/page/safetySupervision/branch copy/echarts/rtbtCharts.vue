<!-- 右下 -->
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
    props:['id','title','data'],
    watch: {
      data() {
        this.drawPie()
      }
    },
    mounted() {
      // this.drawPie()
    },
    methods: {
      drawPie() {
        let charts = echarts.init(document.getElementById(this.id));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: this.title,
            left: '47%',
            textStyle: {
              color:'#868a96',
              fontSize:13
            }
          },
          legend: {
            textStyle: {
              color:'#868a96'
            },
            x : '5%',
            y : 'center',
            orient : 'vertical',
          },
          color:['#008eea', '#fac800', '#ff7d00','#f00041'],
          series: [
            {
              // name: 'Nightingale Chart',
              type: 'pie',
              center: ['60%', '50%'],
              label: {
                normal: {
                  show: true,
                  position:'inner',
                  formatter: '{c}'
                },
              },
              data: this.data
            }
          ]
        };
        if(this.title == '隐患等级统计') {
          option.legend.x = '5%'
          option.series[0].center[0] = '60%'
          option.color = ['#f00041','#fac800','#008eea']
        }else if(this.title == '隐患专业统计') {
          option.legend.x = '1%'
          option.series[0].center[0] = '73%'
          option.title.left = '60%'
          option.color = ['#008eea','#acff02','#fac800','#ff8a2d','#06c8cd','#03ac32','#1760bc','#7584ac','#b1ac70','#02bfff','#5ba1ff','#7ed321','#98aac2']
        }
        // 使用刚指定的配置项和数据显示图表。
        charts.setOption(option);
        window.addEventListener('resize', () => {
          charts.resize()
        })
      }
    },
  }
</script>