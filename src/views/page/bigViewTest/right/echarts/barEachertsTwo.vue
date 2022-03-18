<doc>
  柱形图
</doc>
<template>
  <div id="barMore1" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '../../../../../utils/echartPxToRem.js'
  export default {
    props: ['monthData'],
    data() {
      return {
        charts: '',
        nameData: ['低风险', '一般风险', '较大风险', '重大风险'],
        yyData: [],

        common: [null, null, null, null, null, null, null, null, null, null],  //一般风险
        low: [null, null, null, null, null, null, null, null, null, null],     //低风险
        larger: [null, null, null, null, null, null, null, null, null, null],  //较大风险
        great: [null, null, null, null, null, null, null, null, null, null],  //重大风险
      };
    },
    watch: {
      monthData() {

        let typeData = this.dealWithData(this.monthData)
        typeData.forEach(item => {
          let sum = 0
          item.list.forEach(item => {
            sum += Number(item.value)
          })
          item.count = sum
        })
        typeData = typeData.sort((a, b) => b.count - a.count)
        let topTen = typeData.slice(1, 11)
        this.yyData = []
        topTen.forEach(item => {
          this.yyData.push(item.areaname)
          let i = this.yyData.indexOf(item.areaname)
          item.list.forEach(element => {
            switch (element.level) {
              case '重大风险':
                this.great[i] = Number(element.value)
                break;
              case '一般风险':
                this.common[i] = Number(element.value)
                break;
              case '较大风险':
                this.larger[i] = Number(element.value)
                break;
              case '低风险':
                this.low[i] = Number(element.value)
                break;
            }
          })
        })
        this.show("barMore1")

        // var data1 = []
        // var data2 = []
        // for (var i in this.monthData) {
        //   data1.push(this.monthData[i].level)
        //   data2.push(this.monthData[i].areaname)
        //   if (this.monthData[i].level == '一般风险') {
        //     this.common.push(this.monthData[i].value)
        //   }
        //   if (this.monthData[i].level == '低风险') {
        //     this.low.push(this.monthData[i].value)
        //   }
        //   if (this.monthData[i].level == '较大风险') {
        //     this.larger.push(this.monthData[i].value)
        //   }
        //   if (this.monthData[i].level == '重大风险') {
        //     this.great.push(this.monthData[i].value)
        //   }
        // }
        // this.nameData = [...new Set(data1)]   //剔除重复字段
        // this.yyData = [...new Set(data2)]
        // this.show("barMore1")
      }
    },
    mounted() {

    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {

      dealWithData(data) {
        let c = [];
        let d = {};
        data.forEach(element => {
          if (!d[element.areaname]) {  // 按照type分类
            c.push({
              areaname: element.areaname,
              list: [element]
            });
            d[element.areaname] = element;
          } else {
            c.forEach(ele => {
              if (ele.areaname == element.areaname) {
                ele.list.push(element);
              }
            });
          }
        });
        return c;
      },

      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#008eea', '#fac800', '#ff7d00', '#f00041'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
              type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {
            show: true,
            top: fontChart(8),
            right: 0,
            x: 'center',
            y: 'top',
            data: this.nameData,  //['低风险', '一般风险', '较大风险', '重大风险'],
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
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
              color: 'rgba(255, 255, 255, 1)',
              fontSize: fontChart(12),
            },
            data: this.yyData.reverse(),   //['掘进面', '回采面', '皮带巷', '运输巷', '井下中央泵房', '绞车房', '机电硐室']
          },
          xAxis: {
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
              color: 'rgba(255, 255, 255, 1)',
              fontSize: fontChart(12),
            },
          },
          grid: {
            top: '13%',
            bottom: '8%',
            left: '22%',
            right: '2%'
          },
          series: [
            {
              name: '低风险',
              barMaxWidth: fontChart(15),
              type: 'bar',
              stack: 'total',
              emphasis: {
                focus: 'series'
              },
              data: this.low.reverse(),  // [24, 24, 41, 12, 11, 10, 10],
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'inside', //在上方显示
                    textStyle: { //数值样式
                      color: '#fff',
                      fontSize: fontChart(13)
                    },
                    textBorderColor: '#000',
                    textBorderWidth: 1
                  },
                }
              },
            },
            {
              name: '一般风险',
              barMaxWidth: fontChart(15),
              type: 'bar',
              stack: 'total',
              emphasis: {
                focus: 'series'
              },
              data: this.common.reverse(),       //[19, 18, 19, 11, 10, 9, 9],
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'inside', //在上方显示
                    textStyle: { //数值样式
                      color: '#fff',
                      fontSize: fontChart(13),
                    },
                    textBorderColor: '#000',
                    textBorderWidth: 1
                  },
                }
              },
            },
            {
              name: '较大风险',
              barMaxWidth: fontChart(15),
              type: 'bar',
              stack: 'total',
              emphasis: {
                focus: 'series'
              },
              data: this.larger.reverse(),  //[21, 21, 25, 46, 10, 9, 9],
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'inside', //在上方显示
                    textStyle: { //数值样式
                      color: '#fff',
                      fontSize: fontChart(13)
                    },
                    textBorderColor: '#000',
                    textBorderWidth: 1
                  },
                }
              },
            },
            {
              name: '重大风险',
              barMaxWidth: fontChart(15),
              type: 'bar',
              stack: 'total',
              emphasis: {
                focus: 'series'
              },
              data: this.great.reverse() ,         //[39, 36, 6, 21, 21, 10, 9],
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'inside', //在上方显示
                    textStyle: { //数值样式
                      color: '#fff',
                      fontSize: fontChart(13)
                    },
                    textBorderColor: '#000',
                    textBorderWidth: 1
                  },
                }
              },
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.show('barMore1')
      }
    }
  }
</script>
<style scoped>

</style>