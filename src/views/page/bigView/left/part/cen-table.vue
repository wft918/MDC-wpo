<template>
  <div style="width: 100%; height: 100%">
    <div class="tb-title">
      <span>系统报警统计</span>
    </div>
    <div class="tb-content">
      <div class="sub-title">系统当日报警列表</div>
      <div class="table-list">
        <div class="table-title">
          <div style="width: 15%">报警时间</div>
          <div style="width: 13%">报警描述</div>
          <div style="width: 13%">系统名称</div>
          <div style="width: 13%">设备名称</div>
          <div style="width: 13%">部件名称</div>
          <div style="width: 14%">报警传感器</div>
          <div style="width: 10%">状态</div>
          <div style="width: 9%">详情</div>
        </div>
        <div class="table-container">
          <div class="row" v-for="(item, index) in data" :key="index">
            <div style="width: 15%" class="col">{{ item.datetime }}</div>
            <div style="width: 13%" class="no-wap">{{ item.description || '' }}</div>
            <div style="width: 13%" class="no-wap">{{ item.systemname }}</div>
            <div style="width: 13%" class="no-wap">{{ item.equipname }}</div>
            <div style="width: 13%" class="no-wap">{{ item.partname }}</div>
            <div style="width: 14%" class="no-wap">{{ item.alarmsensor }}</div>
            <div style="width: 10%" class="no-wap">{{ item.state }}</div>
            <div style="width: 9%" class="no-wap">
              <el-button @click="tomky(item.url)" type="text" style="transform: translateY(-0.0104rem)">
                <i class="el-icon-view"></i>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    //  查看详情
    tomky(url) {
      window.open(url, '_blank')
    },
  },
};
</script>
<style scoped>
.tb-title {
  width: 100%;
  height: 0.1563rem;
  line-height: 0.1563rem;
  text-align: center;
  font-size: 0.0833rem;
  font-weight: 650;
  background: url("../../../../../assets/img/bigView/title-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.tb-content {
  width: 100%;
  height: calc(100% - 0.1563rem);
  padding: 0.026rem;
  box-sizing: border-box;
}

.sub-title {
  width: 100%;
  height: 0.1563rem;
  line-height: 0.1563rem;
  color: #fff;
  font-size: 0.0677rem;
  font-weight: 600;
}

.table-list {
  width: 100%;
  height: calc(100% - 0.1563rem);
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
  font-size: 0.0625rem;
  border-bottom: 0.0156rem solid #020924;
  /* border-right: .0156rem solid #020924; */
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.table-container {
  width: 100%;
  height: calc(100% - 0.1563rem);
  overflow: auto;
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
  /* line-height: .1563rem; */
  background-color: #161e2d;
  color: #fff;
  font-size: 0.0625rem;
  border-bottom: 0.0156rem solid #020924;
  /* border-right: .0156rem solid #020924; */
  box-sizing: border-box;
}
.no-wap {
  line-height: 0.1823rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.row:hover .no-wap {
  color: #009bff !important;
}
.row:hover .col {
  color: #009bff !important;
}

.el-button--text {
  font-size: 0.0729rem;
}
</style>