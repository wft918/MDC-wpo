<!-- 左下右 -->
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
            left: 'center',
            textStyle: {
              color:'#868a96',
              fontSize:13
            }
          },
          legend: {
            top: '10%',
            textStyle: {
              color:'#868a96'
            },
          },
          color:['#008eea', '#fac800', '#ff7d00','#f00041'],
          series: [
            {
              // name: 'Nightingale Chart',
              type: 'pie',
              center: ['50%', '60%'],
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

        // 使用刚指定的配置项和数据显示图表。
        charts.setOption(option);
        window.addEventListener('resize', () => {
          charts.resize()
        })
      }
    },
  }
</script>