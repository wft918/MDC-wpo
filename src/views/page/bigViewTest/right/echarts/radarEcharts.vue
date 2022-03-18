<template>
  <div id="radar" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '../../../../../utils/echartPxToRem.js'
  export default {
    props: ['radarData'],
    watch: {
      radarData() {
        // for (var i in this.radarData) {
        //   this.nameAray.push({ name: this.radarData[i].ext_1 })
        //   this.valAray.push(this.radarData[i].value)
        // }
        this.radarData.forEach(element => {
          switch (element.indicator_name) {
            case '月度环风险':
              this.valAray[1] = Number(element.value)
              this.nameAray[1].max = Number(element.maxvalue)
              break;
            case '月度管风险':
              this.valAray[3] = Number(element.value)
              this.nameAray[3].max = Number(element.maxvalue)
              break;
            case '月度机风险':
              this.valAray[2] = Number(element.value)
              this.nameAray[2].max = Number(element.maxvalue)
              break;
            case '月度人风险':
              this.valAray[0] = Number(element.value)
              this.nameAray[0].max = Number(element.maxvalue)
              break;
            case '年度环风险':
              this.valAray1[1] = Number(element.value)
              this.nameAray[1].max = Number(element.maxvalue)
              break;
            case '年度管风险':
              this.valAray1[3] = Number(element.value)
              this.nameAray[3].max = Number(element.maxvalue)
              break;
            case '年度机风险':
              this.valAray1[2] = Number(element.value)
              this.nameAray[2].max = Number(element.maxvalue)
              break;
            case '年度人风险':
              this.valAray1[0] = Number(element.value)
              this.nameAray[0].max = Number(element.maxvalue)
              break;
          }
        });
        this.$nextTick(() => {
          this.show("radar")
        })
      }
    },
    data() {
      return {
        charts: '',
        // nameAray: ['人员', '环境', '设备', '管理'],
        nameAray: [
          { name: '人员', max: 36 },
          { name: '环境', max: 36 },
          { name: '设备', max: 36 },
          { name: '管理', max: 36 }],
        valAray: [],  // 月度
        valAray1: [], // 年度
      };
    },
    mounted() {

    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {

          color: ['#fa0145', '#02f8f9'],
          tooltip: {
            show: true
          },
          grid: {
            // top: '25%',
            // bottom: '17%',
            left: '7%',
            right: '7%'
          },
          radar: {
            nameGap: fontChart(7),
            axisLine: {
              lineStyle: {
                color: '#0781c0',
                type: 'dashed'
              }
            },
            name: {
              color: '#fff',
              fontSize:fontChart(12)
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
            type: 'radar',
            data: [
              {
                // value: [4200, 3000, 20000, 35000],
                value: this.valAray,
                name: '月度',
                areaStyle: {
                  color: '#fa0145',
                  opacity: fontChart(0.1),
                },
                itemStyle: { // 折线拐点标志的样式。
                  normal: { // 普通状态时的样式
                    lineStyle: {
                      width: fontChart(1)
                    },
                    opacity: fontChart(0.2)
                  },
                  emphasis: { // 高亮时的样式
                    lineStyle: {
                      width: fontChart(5)
                    },
                    opacity: fontChart(1)
                  }
                },
              },
              {
                value: this.valAray1,
                name: '年度',
                areaStyle: {
                  color: '#02f8f9',
                  opacity: fontChart(0.1),
                },
                itemStyle: { // 折线拐点标志的样式。
                  normal: { // 普通状态时的样式
                    lineStyle: {
                      width: fontChart(1)
                    },
                    opacity: fontChart(0.2)
                  },
                  emphasis: { // 高亮时的样式
                    lineStyle: {
                      width: fontChart(5)
                    },
                    opacity: fontChart(1)
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
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.show("radar")
      }
    }
  }
</script>
<style scoped>

</style>