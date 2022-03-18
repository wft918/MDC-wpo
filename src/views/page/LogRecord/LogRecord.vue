<template>
  <div class="log-record">
    <div>
      <el-form
        :inline="true"
        class="query-form"
        ref="searchForm"
        style="margin-left: 0.0781rem"
        :model="searchForm"
        @keyup.enter.native="refreshList()"
        @submit.native.prevent
      >
        <el-form-item prop="query" label="操作描述">
          <el-input
            size="small"
            v-model="searchForm.query"
            placeholder="请输入操作描述"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="" label="日期">
          <el-date-picker
            v-model="dates"
            size="small"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="transform: translateY(0.0052rem)"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="refreshList()" size="mini"
            >查询</el-button
          >
          <el-button @click="resetSearch()" size="mini">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataList"
        size="medium"
        :height="'3.1146rem'"
        :row-class-name="tableRowClassName"
        border
        v-loading="loading"
        class="table"
      >
        <el-table-column
          prop="create_time"
          show-overflow-tooltip
          align="center"
          label="创建时间"
        >
          <template slot-scope="scope">
            {{ dateFormat(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          show-overflow-tooltip
          align="center"
          label="IP"
        >
        </el-table-column>
        <el-table-column
          prop="log_level"
          show-overflow-tooltip
          align="center"
          label="日志等级"
        >
        </el-table-column>
        <el-table-column
          prop="op_name"
          show-overflow-tooltip
          align="center"
          label="操作名称"
        >
        </el-table-column>
        <el-table-column
          prop="op_desc"
          show-overflow-tooltip
          align="center"
          label="操作描述"
        >
        </el-table-column>
        <el-table-column
          prop="business_system"
          show-overflow-tooltip
          align="center"
          label="所属业务系统"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getAuditLogs } from "@/api/logapi";
export default {
  data() {
    return {
      dates: [],
      searchForm: {
        query: "",
        startTime: "",
        endTime: "",
      },
      page: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      dataList: [],
    };
  },
  mounted() {
    this.refreshList();
  },
  computed: {},
  methods: {
    // 获取数据列表
    refreshList(page = 1, flag = true) {
      if(flag) this.page = 1
      this.loading = true
      if (this.dates) {
        if (this.dates.length) {
          this.searchForm.startTime = this.dates[0] + " " + "00:00:00";
          this.searchForm.endTime = this.dates[1] + " " + "23:59:59";
        } else {
          this.searchForm.startTime = "";
          this.searchForm.endTime = "";
        }
      } else {
        this.searchForm.startTime = "";
        this.searchForm.endTime = "";
      }
      getAuditLogs({
        page: page,
        pageSize: this.pageSize,
        ...this.searchForm,
      }).then((data) => {
        this.dataList = [];
        try {
          if (data && data.logs.length) {
            this.dataList = data.logs;
          }
        } catch (e) {}
        this.total = data.totalCount;
        this.loading = false
        // this.page = 1;
      });
    },
    // 重置
    resetSearch() {
      this.$refs.searchForm.resetFields();
      this.dates = [];
      this.refreshList();
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.page = 1;
      this.refreshList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.page = val;
      this.refreshList(this.page, false);
    },
    // // 多选
    // selectionChangeHandle(val) {
    //   this.dataListSelections = val;
    // },
    dateFormat(value) {
      let d = new Date(value);
      let month =
        d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      let date = d.getFullYear() + "-" + month + "-" + d.getDate();
      let hour = d.getHours() > 9 ? d.getHours() : "0" + d.getHours();
      let minute = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
      let time = date + " " + hour + ":" + minute + ":00";
      return time;
    },
    tableRowClassName({ row, rowIndex }) {
      return "warning-row";
      // if (rowIndex % 2 === 0) {
      //   return 'warning-row';
      // } else {
      //   return 'success-row';
      // }
    },
  },
};
</script>
<style scoped>
.log-record {
  width: 100%;
  padding-top: 0.1042rem;
  box-sizing: border-box;
}
.log-record > div {
  width: 99%;
  margin: 0 auto;
}
/deep/ .el-input__inner {
  background-color: transparent !important;
  border: 1px solid #0076c8 !important;
  color: #fff;
  margin-bottom: 0.052083rem;
  font-size: 0.067708rem;
  /* width: 1.8229rem!important; */
  height: 0.145833rem;
  padding: 0 0.0781rem;
  line-height: 0.2083rem;
}

/deep/ .el-date-editor .el-range-input {
  background: transparent !important;
}

/deep/ .el-form-item__content {
  line-height: 0.2083rem;
}

/deep/ .el-date-editor .el-range__icon {
  font-size: 0.0729rem;
  margin-left: -0.026rem;
  line-height: 0.125rem;
}

/deep/ .el-date-editor .el-range-separator {
  color: #c0c4cc;
}

/deep/ .el-input__icon {
  width: 0.1302rem;
}

/deep/ .el-range-editor--small .el-range-input {
  font-size: 0.0677rem;
}
/deep/ .el-range-editor--small .el-range-separator {
  line-height: 0.125rem;
  font-size: 0.0677rem;
}
/deep/ .el-form--inline .el-form-item__label {
  color: #c0c4cc;
  font-size: 0.078125rem;
  line-height: 0.2083rem;
}

/deep/ .el-range-editor.el-input__inner {
  padding: 0.0104rem 0.0521rem;
}

/deep/ .el-form-item {
  margin-bottom: 0.1146rem;
}

/deep/ .el-button--mini,
.el-button--small {
  font-size: 0.0625rem;
}

/deep/ .el-date-table {
  font-size: 0.0625rem !important;
}

/deep/.is-leaf {
  background-color: #3c4860 !important;
  color: #fff;
}

/deep/ .el-table {
  background-color: transparent;
}

/deep/ .el-table thead {
  height: 0.244792rem;
}

/deep/.el-table .warning-row {
  background: #1c233b;
  color: #fff;
  /* -webkit-box-shadow:0 0 20px #09102b;
    -moz-box-shadow:0 0 20px #09102b;
    box-shadow:0 0 20px #09102b; */
  height: 0.286458rem !important;
  line-height: 0.286458rem !important;
}

/deep/.el-table .success-row {
  background: #242b42;
  color: #fff;
  height: 0.286458rem !important;
  line-height: 0.286458rem !important;
}

/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border-bottom: 0.0052rem solid #0076c8;
  border-right: none;
}

/deep/.el-table tbody tr:hover > td {
  background-color: rgba(60, 72, 96, 0.3) !important;
  color: #008eea;
  cursor: pointer;
}

/deep/.el-table::before {
  height: 0 !important;
}

/deep/ .el-table .cell {
  font-size: 0.072917rem;
}

/deep/ .el-table--border,
.el-table--group {
  /* border: .0052rem solid #0076c8; */
  border: none;
}

/deep/ .el-pagination {
  padding: 0.0104rem 0.026rem;
  margin-top: 0.1042rem;
}

/deep/ .el-pagination span:not([class*="suffix"]) {
  font-size: 0.0677rem;
  color: #c0c4cc !important;
  min-width: 0.1849rem;
  height: 0.1458rem;
  line-height: 0.1458rem;
}

/deep/ .el-pagination__sizes .el-input .el-input__inner {
  font-size: 0.0677rem;
  padding-left: 0.0417rem;
}

/deep/ .el-input--mini .el-input__icon {
  line-height: 0.2448rem;
}

/deep/ .el-pager li {
  padding: 0 0.0208rem;
  font-size: 0.0677rem;
  min-width: 0.1849rem;
  height: 0.1458rem;
  line-height: 0.1458rem;
  box-sizing: border-box;
  text-align: center;
}
/deep/ .el-pagination.is-background .btn-next {
  min-width: 0.1563rem;
  height: 0.1458rem;
  line-height: 0.1458rem;
  border-radius: 0.0104rem;
}
/deep/ .el-pagination.is-background .btn-prev {
  min-width: 0.1563rem;
  height: 0.1458rem;
  line-height: 0.1458rem;
  border-radius: 0.0104rem;
}


/*  右边的白线  */
/deep/ .el-table--border::after {
  background-color: transparent!important;
}
</style>
