<doc>
  柱形图
</doc>
<template>
  <div id="barMore" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import $ from 'jquery';
  import { outputAnalyse,outputAnalyse2 } from "@/api/output";
  import { fontChart } from '@/utils/echartPxToRem'
  export default {
    data() {
      return {
        charts: '',
        mayObj:[],
        mayName:[],
        mayMonth:[],
        mayOutput:[],

        sum:[],
        sum1:[],
        sum2:[],
        sum3:[],
        xValue:[],
        yValue:[]
      };
    },
    mounted() {
    // this.output1()    
      // this.output2()
      this.getOutput()
    },
    destroyed() {
      window.removeEventListener('resize',this.selfAdaption)
    },
    methods: {
        output1(){
            outputAnalyse().then(res => {
               // console.log('本月总产量-------> ', res)
                if (res && res.success) {
                //  this.sum3.push(res.data[0]['value'])
                }else{
                 // this.sum3=[]
                }
            })
        },

        getOutput() {
          outputAnalyse2().then(data => {
            if(data && data.success) {
              this.xValue = []
              this.yValue = []
              if(data && data.success) {
                // console.log(data,'产量分析---------------->')
                data.data.forEach(item => {
                  this.xValue.push(item.ext_1)
                  this.yValue.push(item['sum(`value`)'])
                })
                this.show("barMore")
              }
            }
          })
        },

        output2(){
            outputAnalyse2().then(res => {
               // console.log('本月产量22-------> ', res)
                var month=[]
                if (res && res.success) {
                   this.mayObj=res.data
                   this.mayObj.forEach(i=>{
                      //console.log(i)
                      this.mayName.push(i.ext_2)  //图例
                      month.push(i.ext_1)
                      this.mayMonth=[...new Set(month)]   //去除重复月份  显示x轴数据
                   
                     // console.log(this.mayName,this.mayMonth)

                      if(i.ext_2==this.mayName[0]){
                         this.sum.push(i['sum(`value`)'])     // 这个数组要拿到 生产1队的所有数据
                        // console.log(this.sum)
                      }
                      if(i.ext_2==this.mayName[1]){
                         this.sum1.push(i['sum(`value`)'])     // 这个数组要拿到 生产2队的所有数据
                         //console.log(this.sum1)
                      }
                      if(i.ext_2==this.mayName[2]){
                         this.sum2.push(i['sum(`value`)'])    // 这个数组要拿到 生产3队的所有数据
                         //console.log(this.sum2)
                      }
                   }) 
                   var suv= this.sum
                   var suv1=this.sum1
                   var suv2=this.sum2
                   var obj={suv,suv1,suv2}
                   var result=[]
                   for(var key in obj){
                     //循环数组
                     $.each(obj[key],function(idx,val){
                       // console.log(idx,val)
                        if(result[idx] == null ||  result[idx] == ""){
                            result[idx] = 0 ;
                          }
                        result[idx] += val ;
                     })
                   }
                   //console.log(result)
                   this.sum3=result        //总计的值

                   this.mayName.push('总计')   //图例总计
              
                   this.show("barMore")
                }else{
                   this.mayObj=[]
                }
            }) 
        },


      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          color: ['#acff02', '#fac800', '#ff7d00', '#0fb42c'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
              type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          // legend: {
          //   show: true,
          //   top: 15,
          //   right: 0,
          //   x: 'center',
          //   y: 'top',
          //   data: this.mayName,
          //   textStyle: {
          //     color: 'rgba(255, 255, 255, 0.8)',
          //     fontSize: 12
          //   },
          //   itemWidth: 12,
          //   itemHeight: 12
          // },
          xAxis: {
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
            data:  this.xValue
          },
          yAxis: {
            name: "(万吨)",
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
            top: '25%',
            bottom: '10%',
            left: '12%',
            right: '2%'
          },
          series: [
          //   {
          //   name:  this.mayName[0],
          //   barWidth: 15,
          //   type: 'bar',
          //   stack: 'total',
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: this.sum,
          //   itemStyle: {
          //     normal: {
          //       label: {
          //         show: true, //开启显示
          //         position: 'insideRight', //在上方显示
          //         offset: [-8, 0],
          //         textStyle: { //数值样式
          //           color: '#fff',
          //           fontSize: 10
          //         }
          //       },
          //     }
          //   },
          // }, 
          
          // {
          //   name: this.mayName[1],
          //   barWidth: 15,
          //   type: 'bar',
          //   stack: 'total',
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data:this.sum1,
          //   itemStyle: {
          //     normal: {
          //       label: {
          //         show: true, //开启显示
          //         position: 'insideRight', //在上方显示
          //         offset: [-8, 0],
          //         textStyle: { //数值样式
          //           color: '#fff',
          //           fontSize: 10,
          //         }
          //       },
          //     }
          //   },
          // }, 
          
          // {
          //   name: this.mayName[2],
          //   barWidth: 15,
          //   type: 'bar',
          //   stack: 'total',
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data:this.sum2,
          //   itemStyle: {
          //     normal: {
          //       label: {
          //         show: true, //开启显示
          //         position: 'insideRight', //在上方显示
          //         offset: [-8, 0],
          //         textStyle: { //数值样式
          //           color: '#fff',
          //           fontSize: 10
          //         }
          //       },
          //     }
          //   },
          // }, 
          {
            name: '总计',
            barWidth: fontChart(15),
            type: 'bar',
            data: this.yValue,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  // position: 'insideLeft', //在上方显示
                  offset: [8, 0],
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: fontChart(12)
                  }
                },
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: "#0069F5" // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "#35C3FF" // 100% 处的颜色
                }], false)
              }
            },
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize',this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.show("barMore")
      }
    }
  }
</script>
<style scoped>

</style>