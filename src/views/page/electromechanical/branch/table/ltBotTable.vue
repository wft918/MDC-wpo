<template>
  <div style="width: 100%;height: 100%;">
    <el-table :header-cell-style="tableHeaderColor" :data="tableData" style="background-color: red;" size="medium" :height="'2.291667rem'"  class="table">
      <!-- <el-table-column type="index" width="50">
      </el-table-column> -->
      <el-table-column align="center" prop="" show-overflow-tooltip label="序号">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="d_device_name" align="center" show-overflow-tooltip label="设备名称">
      </el-table-column>
      <el-table-column prop="d_device_type" align="center" show-overflow-tooltip label="规格型号">
      </el-table-column>
      <el-table-column prop="d_voltage_level" align="center" show-overflow-tooltip label="电压等级">
      </el-table-column>
      <el-table-column prop="d_power" align="center" show-overflow-tooltip label="功率">
      </el-table-column>
      <el-table-column prop="d_insulation" align="center" show-overflow-tooltip label="绝缘等级">
      </el-table-column>
      <el-table-column prop="d_intensity" align="center" show-overflow-tooltip label="额定电流">
      </el-table-column>
      <el-table-column prop="d_in_time" align="center" show-overflow-tooltip label="入井时间">
        <template slot-scope="scope">
          {{scope.row.d_in_time.split(' ')[0]}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    props: {
      tableData: {
        type:Array,
        default:() => []
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      // 表头背景色
      tableHeaderColor() {
        // return 'background-color: #08304a;color: #a8b9c8;fontSize:0.072917rem;height: .223958rem;'
        return 'background-color: #08304a;color: rgba(255, 255, 255, 0.8);fontSize:0.072917rem;height: .223958rem;'
      },
    },
  }
</script>
<style scoped>
  /deep/ .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
    border: .005208rem solid #1c487a!important;
  }
  /deep/ .el-table th.el-table__cell.is-leaf {
    border-bottom: transparent!important;
  }
  /deep/  .el-table, .el-table__expanded-cell {
    background-color: transparent!important;
    border: transparent!important;
  }
  /deep/ .el-table.el-table--medium td{
    background-color: #082551;
    color: #fff;
    height: .234375rem;
    
  }
  /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #44b0e5;
  }
  /deep/ .el-table::before {
    height: 0px;
  }

  /deep/ .el-table .cell.el-tooltip {
    font-size: .072917rem!important;
  }
</style>