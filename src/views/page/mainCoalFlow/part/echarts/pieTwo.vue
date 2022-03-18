<doc>
  柱形图
</doc>
<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { Allmonitor,monitorPerson,monitorTime } from "@/api/output";
  export default {
    props: ['id'],
    data() {
      return {
        charts: '',
        monObj:[],
        monData:[]
      };
    },
    mounted() {
      this.monitortime()
      
    },
    methods: {

       monitortime(){
           monitorTime().then(res => {
                if (res && res.success) {
                  this.monObj=res.data
                  this.monObj.forEach(i=>{
                      //console.log(i)            
                      let nub=i['sum(`value`)*count(ext_3)/sum(ext_3)'].toFixed(2)
                      this.monData.push({
                        value:nub,
                        name:i.ext_2
                      })

                  }) 
                  this.show(this.id)
                }else{
                  this.monObj=[]
                }
            })
       },


      show(id) {
        this.charts = echarts.init(document.getElementById(id))
        var option = {
          title: {
            text: '各生产队工效',
            textAlign: 'left',
            x: 'center',
            y: 'top',
            top: '7%',
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 12
            }
          },
          tooltip: {},
          legend: {
             orient: 'vertical',
             top: '50%',
             left: '15%',
             textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 12
            },
            itemWidth: 12,
            itemHeight: 12
          },
          grid: {
            top: '20%',
            bottom: '10%',
            left: '10%',
            right: '10%'
          },
          series: [{
            name: '功效',
            type: 'pie',
            radius: [15, 70],
            center: ['68%', '60%'],
            // roseType: 'area',
            itemStyle: {
              borderRadius: 2
            },
            label: {
              position: 'inside',
              formatter: '{c}吨/人天',
              fontWeight: 600,
              color: '#fff'
            },
            data: this.monData
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', () => {
          this.charts.resize()
        })
      }
    }
  }
</script>
<style scoped>

</style>