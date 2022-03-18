<template>
  <el-dialog
    title="新增报警列表"
    :visible.sync="dialogVisible"
    :append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal="false"
    width="50%"
  >
    <div class="table-list">
      <div class="table-title">
        <div style="width: 18%">报警时间</div>
        <div style="width: 16%">报警描述</div>
        <div style="width: 16%">系统名称</div>
        <div style="width: 16%">设备名称</div>
        <div style="width: 16%">部件名称</div>
        <div style="width: 18%">报警传感器</div>
      </div>
      <div class="table-container">
        <div class="row" v-for="(item, index) in dataList" :key="index">
          <div style="width: 18%">{{ item.starttime }}</div>
          <div style="width: 16%">{{ item.description }}</div>
          <div style="width: 16%">{{ item.systemname }}</div>
          <div style="width: 16%">{{ item.equipname }}</div>
          <div style="width: 16%">{{ item.partname }}</div>
          <div style="width: 18%">{{ item.sensor }}</div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="info" @click="dialogVisible = false"
        >关 闭</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import "@/utils/flexible";
export default {
  data() {
    return {
      dialogVisible: false,
      dataList: []
    };
  },
  methods: {
    init(data) {
      if(!this.dialogVisible) this.dialogVisible = true;
      this.$nextTick(() => {
        this.dataList = JSON.parse(data)
        // 初始化操作
      });
    },
  },
};
</script>

<style scoped>

.table-list {
  width: 100%;
  z-index: 999;
}

.table-title {
  width: 100%;
  height: 0.1563rem;
  display: flex;
}
.table-title > div {
  height: 100%;
  text-align: center;
  line-height: 0.1563rem;
  background-color: #303e49;
  color: #fff;
  font-weight: 600;
  font-size: .0677rem;
  border-bottom: 0.0156rem solid #020924;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /* border-right: .0156rem solid #020924; */
  box-sizing: border-box;
}
.table-container {
  width: 100%;
  /* height: calc(100% - 0.1563rem);
  overflow: auto; */
}
.table-container > div {
  width: 100%;
  height: 0.1823rem;
  display: flex;
  cursor: pointer;
}
.table-container > div > div {
  height: 100%;
  text-align: center;
  line-height: .1563rem;
  background-color: #161e2d;
  color: #fff;
  font-size: 0.0625rem;
  border-bottom: 0.0156rem solid #020924;
  /* border-right: .0156rem solid #020924; */
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.row:hover .col {
  color: #009bff !important;
}
/deep/ .el-dialog {
  background: none;
}
/deep/ .el-dialog__header {
  background-color: #067cc7;
  padding: 0 0.1042rem 0 0.1042rem;
  box-sizing: border-box;
  height: 0.1823rem;
  line-height: 0.1823rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

/deep/ .el-dialog__title {
  color: #fff;
  font-size: 0.0833rem;
}

/deep/ .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}

/deep/ .el-dialog__body {
  padding: 0;
}

/deep/ .el-dialog__footer {
  background-color: #067cc7;
  padding: 0 0.1042rem 0 0.1042rem;
  box-sizing: border-box;
  height: 0.1823rem;
  line-height: 0.1823rem;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
/deep/ .el-dialog__headerbtn {
  position: absolute;
  top: 8px;
  right: .1042rem;
  font-size: .0833rem;
}
</style>