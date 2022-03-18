<doc>
  柱形图
</doc>
<template>
  <div id="barThree" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem'
  import { costAnalyse, costAnalyse2 } from "@/api/output";
  export default {
    data() {
      return {
        charts: '',
        costObj: [],
        costName: [],
        // costY:[],

        // costData1:[], //人力·
        // costData2:[], //材料
        // costData3:[], //耗电

        xValue: [],
        yValue1: [],
        yValue2: [],
        yValue3: []

      };
    },
    mounted() {
      // this.constAnay2()
      this.getConstAnay2()
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      getConstAnay2() {
        costAnalyse2().then(data => {
          if (data && data.success) {
            this.xValue = []
            this.yValue1 = []
            this.yValue2 = []
            this.yValue3 = []
            if (data.data.length) {
              data.data.forEach(item => {
                if (this.xValue.indexOf(item.ext_2) < 0) {
                  this.xValue.push(item.ext_2)
                }
                if(item.ext_3 == '人力')  {
                  this.yValue1.push(item['sum(`value`)'])
                }else if(item.ext_3 == '耗电') {
                  this.yValue2.push(item['sum(`value`)'])
                }else if(item.ext_3 == '材料') {
                  this.yValue3.push(item['sum(`value`)'])
                }
              })

              this.show("barThree")
            }
          }
        })
      },
      constAnay2() {
        costAnalyse2().then(res => {
          if (res && res.success) {
            this.costObj = res.data
            var obj = []
            var obj1 = []
            this.costObj.forEach(i => {
              //console.log(i)   

              obj.push(i.ext_3)
              this.costName = [...new Set(obj)]   // 图例

              obj1.push(i.ext_2)            //y轴数据
              this.costY = [...new Set(obj1)]  //去除y轴重复数据
              // console.log(this.costName,this.costY)

              if (i.ext_3 == this.costName[0]) {
                this.costData1.push(i['sum(`value`)'])
              }
              if (i.ext_3 == this.costName[1]) {
                this.costData2.push(i['sum(`value`)'])
              }
              if (i.ext_3 == this.costName[2]) {
                this.costData3.push(i['sum(`value`)'])
              }
            })
            // console.log(this.costData1)
            this.show("barThree")

          } else {
            this.costObj = []
          }
        })
      },

      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#008eea', '#fac800', '#ff7d00'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
              type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          title: {
            text: '万吨煤耗电成本',
            textAlign: 'left',
            x: 'center',
            y: 'top',
            top: 5,
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12)
            }
          },
          legend: {
            show: false,
            top: 25,
            right: 0,
            x: 'center',
            y: 'top',
            data: ['人力', '耗电', '材料'], //['人力', '耗电', '材料'],
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12)
            },
            itemWidth: fontChart(12),
            itemHeight: fontChart(12)
          },
          yAxis: {
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
            data: this.xValue,         //["主运", "输运", "综采", "综掘", "变电所", "泵站房"]
          },
          xAxis: {
            name: "(万元)",
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
          grid: {
            top: '20%',
            bottom: '10%',
            left: '25%',
            right: '10%'
          },
          series: [
              {
              name: '人力',
              type: 'bar',
              stack: 'total',
              barMaxWidth: fontChart(15),
              emphasis: {
                focus: 'series'
              },
              data:this.yValue1,// [5, 20, 36, 10, 10, 20],
            }, 
            {
              name: '耗电',
              type: 'bar',
              barMaxWidth: fontChart(15),
              stack: 'total',
              emphasis: {
                focus: 'series'
              },
              data: this.yValue2, // [5, 20, 36, 10, 10, 20],
            },
            {
              name: '材料',
              type: 'bar',
              barMaxWidth: fontChart(15),
              stack: 'total',
              emphasis: {
                focus: 'series'
              },
              data:this.yValue3  // [5, 20, 36, 10, 10, 20],
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.show("barThree")
      }
    }
  }
</script>
<style scoped>

</style>