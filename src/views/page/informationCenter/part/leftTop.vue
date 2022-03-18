<doc>
  安全监测
</doc>
<template>
  <div class="box">
    <div class="content">
      <div class="topLeft">
        <p class="title">传感器数量</p>
        <el-table :data="tableData" style="width: 100%" @row-click="tableRowClick" :height="'1.640625rem'"
          :row-class-name="tableRowClassName">
          <el-table-column align='center' label="序号">
            <template slot-scope="scope">
              {{scope.$index + 1 < 10? '0' + (scope.$index + 1) : scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="indicator_name" align='center' label="传感器分类">
          </el-table-column>
          <el-table-column prop="value" align='center' label="数量">
          </el-table-column>
        </el-table>
      </div>
      <div class="topRight">
        <bar :xValue="xValue" :yValue="yValue"></bar>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import bar from '@/views/page/informationCenter/echart/bar'
  // import {getsensorcnts,getsensorstatus} from '@/api/informationCenter'
  import { sensorNumber, sensorStatus } from '@/api/informationCenter2'
  export default {
    components: {
      bar,
    },
    data() {
      return {
        tableData: [],
        xValue: [],
        yValue: []
      }
    },
    mounted() {
      // request1
      // this.getsensorcnts() //传感器各种类数量统计
      // this.getsensorstatus() //传感器各种类状态统计

      // request2
      this.sensorNumber()
    },
    methods: {
      // request2
      // 传感器各种类数量统计
      sensorNumber() {
        sensorNumber().then(data => {
          if (data && data.success) {
            this.tableData = data.data
            if(this.tableData.length > 0) {
              this.sensorStatus(this.tableData[0].indicator_name)
            }
          }
        })
      },

      // 传感器各种类状态统计
      sensorStatus(sensortype) {
        sensorStatus(sensortype).then(data => {
          if (data && data.success) {
            this.xValue = []
            this.yValue = []
            if (data.data.length) {
              data.data.forEach(item => {
                this.xValue.push(item.indicator_name)
                this.yValue.push(parseFloat(item['value']))
              })
            }
          }
        })
      },

      // 点击row table
      tableRowClick(row) {
        this.sensorStatus(row.indicator_name)
      },

      // request1
      //传感器各种类数量统计
      getsensorcnts() {
        getsensorcnts().then(data => {
          if (data && data.success) {
            if (data.data.length) {
              this.tableData = data.data
            }
          }
        })
      },
      //传感器各种类状态统计
      getsensorstatus(option) {
        option = option || ''
        let params = {}
        if (option) {
          params.sensortype = option
        }
        getsensorstatus(params).then(data => {
          if (data && data.success) {
            this.xValue = []
            this.yValue = []
            if (data.data.length) {
              data.data.forEach(item => {
                this.xValue.push(item.mark)
                this.yValue.push(parseFloat(item['count(*)']))
              })
            }
          }
        })
      },

      // 点击row table
      // tableRowClick(row) {
      //   this.getsensorstatus(row.sensortype)
      // },


      tableRowClassName({ row, rowIndex }) {
        if (rowIndex % 2 === 0) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
      },
    },
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }

  .content {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .topLeft {
    width: 35%;
    height: 100%;
  }

  .topRight {
    margin-left: 5%;
    width: 50%;
    height: 100%;
  }

  .title {
    text-align: center;
    font-size: .072917rem
      /* 14/192 */
    ;
    margin-bottom: .052083rem
      /* 10/192 */
    ;
  }

  /deep/.is-leaf {
    background-color: #3c4860 !important;
    color: #fff;
  }

  /deep/ .el-table {
    background-color: #1c233a;
  }

  /deep/.el-table .warning-row {
    background: #1c233b!important;
    color: #fff;
  }

  /deep/.el-table .success-row {
    background: #242b42!important;
    color: #fff;
  }

  /deep/.el-table td,
  /deep/.el-table th.is-leaf {
    border: none;
  }

  /deep/.el-table tbody tr:hover>td {
    background-color: #242b42 !important;
    color: #008eea;
    cursor: pointer;
  }

  /deep/.el-table::before {
    height: 0px !important;
  }

  /deep/.el-table__expanded-cell {
    background-color: #1c233a !important;
  }
  /deep/ .el-table .cell {
    font-size: .072917rem;
  }
</style>