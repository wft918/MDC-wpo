<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .208333rem;line-height: .208333rem;padding-left: .052083rem;box-sizing: border-box;color: #03b5eb;font-size: .078125rem;">工作面关键设备台账</div>
    <div style="width: 100%;height: calc(100% - .208333rem);padding: 0 .078125rem;box-sizing: border-box;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="3203工作面" name="1">
          <lt-bot-table :tableData="tableData"></lt-bot-table>
        </el-tab-pane>
        <el-tab-pane label="3314工作面" name="2">
          <lt-bot-table :tableData="tableData"></lt-bot-table>
        </el-tab-pane>
        <el-tab-pane label="3308工作面" name="3">
          <lt-bot-table :tableData="tableData"></lt-bot-table>
        </el-tab-pane>
        <el-tab-pane label="3206运输顺槽" name="4">
          <lt-bot-table :tableData="tableData"></lt-bot-table>
        </el-tab-pane>
        <el-tab-pane label="3306回风顺槽" name="5">
          <lt-bot-table :tableData="tableData"></lt-bot-table>
        </el-tab-pane>
        <el-tab-pane label="3304运输顺槽" name="6">
          <lt-bot-table :tableData="tableData"></lt-bot-table>
        </el-tab-pane>
        <el-tab-pane label="3206高抽巷" name="7">
          <lt-bot-table :tableData="tableData"></lt-bot-table>
        </el-tab-pane>
        <el-tab-pane label="3303运输顺槽" name="8">
          <lt-bot-table :tableData="tableData"></lt-bot-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import { getDeviceMetadata } from '@/api/electromechanical3' 
  import ltBotTable from './table/ltBotTable'
  export default {
    data() {
      return {
        activeName:'1',
        tableDataTotal:[],
        tableData:[]
      }
    },
    components: {
      ltBotTable
    },
    mounted() {
      this.getDeviceMetadata()
    },
    methods: {
      // 切换标签页
      handleClick() {
        switch(this.activeName) {
          case '1':
            this.tableData = this.tableDataTotal.filter(item => item.d_zone == '3203工作面')
            break;
          case '2':
            this.tableData = this.tableDataTotal.filter(item => item.d_zone == '3314工作面')
            break;
          case '3':
            this.tableData = this.tableDataTotal.filter(item => item.d_zone == '3308工作面')
            break;
          case '4':
            this.tableData = this.tableDataTotal.filter(item => item.d_zone == '3206运输顺槽')
            break;
          case '5':
            this.tableData = this.tableDataTotal.filter(item => item.d_zone == '3306回风顺槽')
            break;
          case '6':
            this.tableData = this.tableDataTotal.filter(item => item.d_zone == '3304运输顺槽')
            break;
          case '7':
            this.tableData = this.tableDataTotal.filter(item => item.d_zone == '3206高抽巷')
            break;
          case '8':
            this.tableData = this.tableDataTotal.filter(item => item.d_zone == '3303运输顺槽')
            break;
        }
      },
      // 工作面关键设备台账
      getDeviceMetadata() {
        getDeviceMetadata().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.tableDataTotal = data.data
              this.tableData = data.data.filter(item => item.d_zone == '3203工作面')
              // this.tableDataTotal = this.handlerData(data.data)
            }
          }
        })
      },
      handlerData(data) {
        if(data.constructor !== Array || !data.length) return
        let dataList = []
        let titleList = [...new Set(data.map(item => item.d_zone))]
        titleList.forEach((item,index) => {
          dataList.push({
            tabName:item,
            name:String(index + 1),
            children:[]
          })
          let currentNameData = data.filter(arr => arr.d_zone == item)
          if(currentNameData.length) {
            dataList[index].children.push(...currentNameData)
          }
        })
        return dataList
      }
    },
  }
</script>
<style scoped>
  /* 
   *tabs
   */
  /deep/ .el-tabs__nav {
    /* background-color: #082551!important; */
    color: #3aafe2!important;
    height: .208333rem;
  }
  /deep/ .el-tabs__nav-wrap::after {
    background-color: #082551!important;
  }
  /deep/ .el-tabs__item {
    /* color: #38b4db!important; */
    color: rgba(255, 255, 255, 0.8)!important;
    font-size: .083333rem;
    font-weight: 600;
  }

  /deep/ .is-active {
    color: #3d89f2!important;
  }
  /deep/ .el-tabs__header {
    margin: .026042rem;
  }

  /* /deep/ .el-table__body {
    height: 90%;
  } */
</style>