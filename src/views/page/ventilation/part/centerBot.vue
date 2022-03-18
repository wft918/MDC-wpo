<doc>
  通风机风量统计
</doc>
<template>
  <div class="box">
    <el-table :height="'1.71875rem'" :row-class-name="tableRowClassName" :data="tableData"
      style="width: 100%;margin: 2%;">
      <el-table-column show-overflow-tooltip align='center' label="序号">
        <template slot-scope="scope">
          {{scope.$index + 1 < 10?`0${scope.$index + 1}`:scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="通风机名称"></el-table-column>
      <el-table-column align='center' label="当日风量趋势">
        <template slot-scope="scope">
          <div class="echart-div">
            <trend :id="scope.row.name + scope.$index" :xValue="scope.row.xValue" :yValue="scope.row.yValue"></trend>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="value" align='center' label="实时风量(m³/min)"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  import trend from '@/views/page/ventilation/echart/trend'
  import { getTongfengAmount,getTongfengAmountHistory } from '@/api/ventilation'
  export default {
    components: {
      trend
    },
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let p1 = getTongfengAmount()  //每个通风实时风量
        let p2 = getTongfengAmountHistory()  //各通风机历史风量
        Promise.all([p1,p2]).then(result => {
          this.tableData = this.handlerData(result)
        })
      },
      handlerData(result) {
        const tableData = []
        if(result[1] && result[1].success) {
          if(result[1].data.length) {
            result[1].data.forEach(item => {
              if(tableData.every(arr => arr.name != item.ext_1)) {
                let xValue = result[1].data.filter(arr => arr.ext_1 == item.ext_1).map(item => item.stat_time)
                let yValue = result[1].data.filter(arr => arr.ext_1 == item.ext_1).map(item => parseFloat(item.value))
                let value = ''
                if(result[0] && result[0].success) {
                  if(result[0].data.length) {
                    value = result[0].data.filter(arr => arr.l == item.ext_1)[0].v
                  }
                }
                tableData.push({
                  name:item.ext_1,
                  xValue:xValue,
                  yValue:yValue,
                  value:value
                })
              }
            })
          }
        }
        return tableData
      },
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

  /deep/.is-leaf {
    background-color: #3c4860 !important;
    color: #fff;
  }

  /deep/ .el-table {
    background-color: #1c233a;
  }
  
  /deep/ .el-table thead {
    height: .244792rem;
  }

  /deep/.el-table .warning-row {
    background: #1c233b;
    color: #fff;
    -webkit-box-shadow:0 0 20px #09102b;
    -moz-box-shadow:0 0 20px #09102b;
    box-shadow:0 0 20px #09102b;
    height: .286458rem!important;
    line-height: .286458rem!important;
  }

  /deep/.el-table .success-row {
    background: #242b42;
    color: #fff;
    height: .286458rem!important;
    line-height: .286458rem!important;
  }

  /deep/.el-table td,
  /deep/.el-table th.is-leaf {
    border: none;
  }

  /deep/.el-table tbody tr:hover>td {
    background-color: rgba(60, 72, 96, .3) !important;
    color: #008eea;
    cursor: pointer;
  }

  /deep/.el-table::before {
    height: 0 !important;
  }

  /deep/ .el-table .cell {
    font-size: .072917rem;
  }

  .echart-div {
    display: inline-block;
    width: .520833rem /* 100/192 */;
    height: .15625rem /* 30/192 */;
  }
</style>