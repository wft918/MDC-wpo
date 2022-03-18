<template>
  <div style="width: 100%;height: 100%;" :id="id"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    data() {
      return {
        charts: '',
        pieData: []
      }
    },
    props: {
      id: {
        type: String
      },
      data: {
        type: Array,
        default: () => ([{ name: '工程建设', value: 10 }, { name: '产权交易', value: 10 }, { name: '土地交易', value: 10 }, { name: '其他交易', value: 10 }])
      }
    },
    watch: {
      data(newValue) {
        this.pieData = []
        let colorList = ['#5b9bd5','#70ad47','#49bf64','#52cab8']
        newValue.forEach((item,index) => {
          this.pieData.push({
            value: item.value || 0,
            name: item.name || '',
            itemStyle: {
              normal: {
                borderWidth: fontChart(4),
                shadowBlur: fontChart(30),
                borderColor: colorList[index],
                shadowColor: colorList[index],
                color: colorList[index],
                opacity: 0.75,
              }
            }
          }, {
            value: 1,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: true
                },
                labelLine: {
                  show: false
                },
                color: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0
              }
            }
          })
        })
        this.drawPie()
      }
    },
    mounted() {
      this.drawPie()
    },
    methods: {
      drawPie() {
        this.charts = echarts.init(document.getElementById(this.id))
        var option = {
          backgroundColor: '#04243E',
          tooltip: {
            show: false
          },
          legend: {
            show: false
          },
          toolbox: {
            show: false
          },
          series: [{
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [fontChart(100), fontChart(10)],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inner',
                  fontWeight: 'bold',
                  textStyle: {
                    fontSize:fontChart(12)
                  },
                  formatter: (params) => {
                    if (params.name !== '') {
                      return params.name.slice(0,4) + '\n' + params.name.slice(4) + '\n' + `${params.value}分钟`;
                    } else {
                      return '';
                    }
                  },
                  rich: {
                    white: {
                      color: '#fff',
                      align: 'center',
                      fontWeight: 'bold',
                      padding: [fontChart(3), 0]
                    }
                  }
                },
                labelLine: {
                  show: false,
                }
              }
            },
            data: this.pieData
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      selfAdaption() {
        if (!this.charts) return
        this.charts.resize()
        this.drawPie()
      }
    }
  }
</script>