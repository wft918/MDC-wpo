<template>
  <div class="container">
    <div :id="id" style="height: 100%; width: 100%"></div>
  </div>
</template>
<script>
import HighCharts from "highcharts";
import { fontChart } from "@/utils/echartPxToRem";
export default {
  props: ["id", "data"],
  watch: {
    data() {
      this.$nextTick(() => {
        this.initOption().series[0].data = this.data;
        HighCharts.chart(this.id, this.initOption());
      });
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      HighCharts.chart(this.id, this.initOption());
    });
    window.addEventListener("resize", this.resetTypeface);
  },
  destroyed() {
    window.removeEventListener("resize", this.resetTypeface);
  },
  methods: {
    resetTypeface() {
      //重置字体
      this.$nextTick(() => {
        this.initOption().series[0].data = this.data;
        HighCharts.chart(this.id, this.initOption());
      });
    },
    pieClick(params) {
      // console.log(params,'pei3D参数params------>>>>')
      this.$emit("pieClick", params.point.name);
    },
    initOption() {
      return {
        chart: {
          backgroundColor: "none",
          type: "pie", //饼图
          margin: [0, 0, 0, 100],
          options3d: {
            enabled: true, //使用3d功能
            alpha: fontChart(8), //延y轴向内的倾斜角度
            beta: fontChart(0),
          },
        },
        title: {
          text: "", //图表的标题文字
        },
        plotOptions: {
          pie: {
            allowPointSelect: true, //每个扇块能否选中
            cursor: "pointer", //鼠标指针
            depth: fontChart(155), //饼图的厚度
            showInLegend: true, // 是否显示图例
            // center: ['30%', '60%'],
            size: "78%",
            dataLabels: {
              enabled: true, //是否显示饼图的线形tip
              distance: -fontChart(35),
              align: "center",
              // position:'center',
              format: "<b>{point.y}</b>",
              style: {
                fontSize: fontChart(13),
              },
            },
            events: {
              //点击事件
              click: this.pieClick,
            },
          },
        },
        colors: [
          "#59678c",
          "#1760bc",
          "#1890ff",
          "#06c8cd",
          "#03ac32",
          "#acff02",
        ],
        legend: {
          align: "left", //水平方向位置
          verticalAlign: "top", //垂直方向位置
          layout: "vertical",
          x: fontChart(20),
          symbolWidth: fontChart(10),
          symbolHeight: fontChart(10),
          symbolRadius: 0,
          itemMarginBottom: fontChart(4),
          itemStyle: {
            color: "#f4f4f6",
            fontSize: fontChart(14),
          },
        },
        credits: {
          enabled: false, // 禁用版权信息
        },
        series: [
          {
            type: "pie",
            name: "", //统一的前置词,非必须
            data: [
              ["综采", 3], //模块名和所占比，也可以{name: '测试1',y: 12}
              ["综掘", 6],
              ["胶带运输", 4],
              ["排水", 3],
              ["通风", 3],
              ["压风", 4],
            ],
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
/* 容器 */
.container {
  width: 100%;
  height: 100px;
}
</style>