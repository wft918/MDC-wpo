<template>
  <div id="radar" style="width: 100%;height:100%;margin-top: 10px;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  // import { risktypescore, riskinfo } from "@/api/screenInterface";
  import { riskByType, riskInfo } from '@/api/bigView2'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    props: [],
    data() {
      return {
        charts: '',
        // nameAray: ['人员', '环境', '设备', '管理'],
        nameAray: [
          { name: '人员' , max: 36 },
          { name: '环境' , max: 36},
          { name: '设备' , max: 36},
          { name: '管理' , max: 36}],
        valAray: [],  // 月度
        valAray1: [], // 年度
      };
    },
    mounted() {
      this.monthRisk11()

    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {

      monthRisk11() {
        riskByType().then(res => {
          if (res && res.success) {
            // console.log('本月风险管控类别评估--------->  ', res.data)
            this.monthAray = res.data
            this.monthAray.forEach(element => {
              switch (element.indicator_name) {
                case '环':
                  this.valAray[1] = Number(element.value)
                  this.nameAray[1].max = Number(element.maxvalue)
                  break;
                case '管':
                  this.valAray[3] = Number(element.value)
                  this.nameAray[3].max = Number(element.maxvalue)
                  break;
                case '机':
                  this.valAray[2] = Number(element.value)
                  this.nameAray[2].max = Number(element.maxvalue)
                  break;
                case '人':
                  this.valAray[0] = Number(element.value)
                  this.nameAray[0].max = Number(element.maxvalue)
                  break;
                // case '年度环风险':
                //   this.valAray1[1] = Number(element.value)
                //   this.nameAray[1].max = Number(element.maxvalue)
                //   break;
                // case '年度管风险':
                //   this.valAray1[3] = Number(element.value)
                //   this.nameAray[3].max = Number(element.maxvalue)
                //   break;
                // case '年度机风险':
                //   this.valAray1[2] = Number(element.value)
                //   this.nameAray[2].max = Number(element.maxvalue)
                //   break;
                // case '年度人风险':
                //   this.valAray1[0] = Number(element.value)
                //   this.nameAray[0].max = Number(element.maxvalue)
                //   break;
              }
            });
            this.show("radar")
          } else {
            this.monthAray = []
          }
        })
      },


      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#fa0145', '#02f8f9'],
          tooltip: {
            show: true
          },
          // grid: {
          //   top:'100'
          // },
          radar: {
            axisLine: {
              lineStyle: {
                color: '#0781c0',
                type: 'dashed'
              }
            },
            name: {
              color: '#fff',
              fontSize:fontChart(12),
              verticalAlign:'center',
              align:'center'
            },
            splitLine: {
              lineStyle: {
                color: '#0781c0',
                type: 'dashed'
              }
            },
            splitArea: {
              show: false,
              areaStyle: {
                color: 'rgba(255,0,0,0)', // 图表背景的颜色
              },
            },
            indicator: this.nameAray
          },
          series: [{
            name: '',
            type: 'radar',
            data: [
              {
                value: this.valAray, //[4200, 3000, 20000, 35000],
                name: '月度',
                areaStyle: {
                  color: '#fa0145',
                  opacity: 0.1,
                },
                itemStyle: { // 折线拐点标志的样式。
                  normal: { // 普通状态时的样式
                    lineStyle: {
                      width: 1
                    },
                    opacity: 0.2
                  },
                  emphasis: { // 高亮时的样式
                    lineStyle: {
                      width: 5
                    },
                    opacity: 1
                  }
                },
              },
              {
                value: this.valAray1, //[6200, 2000, 30000, 25000],
                name: '年度',
                areaStyle: {
                  color: '#02f8f9',
                  opacity: 0.1,
                },
                itemStyle: { // 折线拐点标志的样式。
                  normal: { // 普通状态时的样式
                    lineStyle: {
                      width: 1
                    },
                    opacity: 0.2
                  },
                  emphasis: { // 高亮时的样式
                    lineStyle: {
                      width: 5
                    },
                    opacity: 1
                  }
                },
              }
            ]
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
        this.show('radar')
      }
    }
  }
</script>
<style scoped>

</style>