<template>
  <div style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content: space-between;background-color: #1c233a;">
    <!-- 上边部分 -->
    <!-- <div style="width: 100%;height: .208333rem;background-color: #1c233a;display: flex;">
      <div style="width: 80%;height: 100%;padding-left: .026042rem;box-sizing: border-box;position: relative;">
        <el-form style="position: absolute;top: 3%;" :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="顶板压力监测区域">
            <el-select @change="selectChange" size="mini" v-model="searchForm.monitoringSurface" placeholder="请选择">
              <el-option v-for="item in dataList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div> -->
    <!-- <div style="width: 100%;height: calc(100% - .234375rem);background-color: #1c233a;"> -->
      <div style="width: 100%;height: .208333rem;line-height: .208333rem;color: #00C5FF;padding-left: .052083rem;font-size: .072917rem;">近30天各专业违章情况</div>
      <div style="width: 100%;height: calc(100% - .208333rem);">
        <bar :id="'rtTopBarId'" :xValue="xValue" :yValue="yValue" :yname="'个'"></bar>
      </div>
    <!-- </div> -->
  </div>
</template>
<script>
  import { gettrouble_all } from '@/api/safetySupervision2'
  import bar from './echart/bar'
  export default {
    data() {
      return {
        searchForm: {
          monitoringSurface:'综采面'//监测面
        },
        dataList:[
          {
            label:'3203综采面',
            value:'综采面'
          },
          {
            label:'掘进面',
            value:'掘进面'
          }
        ], //检测面数据
        xValue:[],
        yValue:[]
      }
    },
    components: {
      bar
    },
    mounted() {
      this.gettrouble_all()
    },
    methods: {
      // 切换下拉框
      selectChange() {

      },
      // 月度三违统计
      gettrouble_all() {
        gettrouble_all().then(data => {
          if(data && data.success) {
            this.xValue = []
            this.yValue = []
            if(data.data.length) {
              data.data.forEach(item => {
                this.xValue.push(item.indicator_name)
                this.yValue.push(parseFloat(item.value))
              })
            }
          }
        })
      }
    },
  }
</script>
<style scoped>
  /deep/ .el-input__inner {
    background-color: transparent!important;
    border: .005208rem solid #0076c8!important;
    color: #fff;
    margin-bottom: .052083rem;
    width: .78125rem;
    height: .145833rem;
    font-size: .0625rem;
  }
  /deep/ .el-form--inline .el-form-item__label {
    color: #9a9da7;
  }
  /deep/ .el-radio-button__inner {
    background-color: #00406e;
    border: none;
    color: #fff;
  }


   /deep/ .el-select-dropdown {
    background-color: #057cd0!important;
  }
  /deep/ .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #0496fd!important;
  }

  /deep/ .el-form--inline .el-form-item__label {
    font-size: .072917rem!important;
  }
</style>