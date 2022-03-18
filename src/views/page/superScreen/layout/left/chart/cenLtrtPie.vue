<!-- 右下 -->
<template>
  <div style="width: 100%;height: 100%;">
    <div id="cenLtrtpie" style="width: 100%;height:100%;"></div>
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
      this.$nextTick(() => {
        this.drawPie()
      })
    },
    methods: {
      drawPie() {
        let charts = echarts.init(document.getElementById('cenLtrtpie'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '各系统报警次数',
            left: '47%',
            top:'1%',
            textStyle: {
              color:'#868a96',
              fontSize:12,
              // fontWeight:10
            }
          },
          grid: {
            top: '25%',
            bottom: '8%',
            left: '15%',
            right: '7%'
          },
          legend: {
            textStyle: {
              color:'#868a96'
            },
            x : '20%',
            y : '30%',
            orient : 'vertical',
          },
          color:['#008eea', '#fac800', '#ff7d00','#f00041'],
          series: [
            {
              // name: 'Nightingale Chart',
              type: 'pie',
              center: ['70%', '55%'],
              radius: [20, 60],
              label: {
                // position: 'inner',
                // fontSize: 10,
                normal: {
                  position: 'inner',
                  show: true,
                  formatter: '{c}'
                  // formatter: '{c} ({d}%)'
                },
              },
              data: [
                {value: 60, name: '低风险', },
                { value: 28, name: '一般风险' },
                { value: 12, name: '较大风险' },
                { value: 20, name: '重大风险' },
              ]
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