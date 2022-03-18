<doc>
  配煤方案弹窗
</doc>
<template>
  <el-dialog custom-class='formModel' title="配煤方案" :visible.sync="dialogVisible" width="26%"
    :modal-append-to-body='false'>
    <p>通过控制给煤机的给煤量，使两个煤仓的原煤按照不同的比例给煤；</p>
    <p>调整皮带速度，达到两翼瞬时煤量控制，形成最优煤质发热量配比。</p>
    <p class="top">
      最优配煤发热量 <span class="s">{{optimalHeatData}} kcal</span>
    </p>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="12">
        <span class="s1">左翼煤发热量：{{leftHeatData}} kcal <br> 左翼煤量 </span>
      </el-col>
      <el-col :span="12">
        <span class="s1">右翼煤发热量：{{rightHeat}} kcal <br> 右翼煤量</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="center" style="margin-top: .104167rem /* 20/192 */;">
      <el-col :span="12">
        <span class="s1">{{optimalRatioData}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="center" style="margin-top: .104167rem /* 20/192 */;">
      <el-col :span="12">
        <span class="m">左翼瞬时煤量</span>
        <span class="s1">{{zyssml}} 吨/秒</span>
      </el-col>
      <el-col :span="12">
        <span class="m">右翼瞬时煤量</span>
        <span class="s1">{{yyssml}} 吨/秒</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="center" style="margin-top: .052083rem /* 10/192 */">
      <el-col :span="12">
        <span class="m g">1#给煤机给煤量</span>
        <span class="s1">{{jmj1}} 吨/秒</span>
      </el-col>
      <el-col :span="12">
        <span class="m g">2#给煤机给煤量</span>
        <span class="s1">{{jmj2}} 吨/秒</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="center" style="margin-top: .052083rem /* 10/192 */">
      <el-col :span="12">
        <span class="m g">大巷皮带S3-1速度</span>
        <span class="s1">{{dxpdssd}} 米/秒</span>
      </el-col>
      <el-col :span="12">
        <span class="m g">大巷皮带N3-1速度</span>
        <span class="s1">{{dxpdnsd}} 米/秒</span>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button class="btn" size="small" @click="dialogVisible = false">进入皮带系统观测</el-button>
      <el-button class="btn" size="small" type="primary" @click="dialogVisible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import '../../../../utils/flexible.js'
  import { optimalHeat, optimalRatio, optimalPlan, leftRightHeat } from "@/api/coalBlend";
  export default {
    data() {
      return {
        dialogVisible: false,
        optimalHeatData: 0,
        optimalRatioData: 0,
        optimalPlanData: [],
        dxpdnsd: 0,
        dxpdssd: 0,
        yyssml: 0,
        zyssml: 0,
        jmj1: 0,
        jmj2: 0,
        leftHeatData: 0,
        rightHeat: 0,
      }
    },
    methods: {
      init() {
        this.resetData()
        this.dialogVisible = true
        this.getOptimalHeat()
        this.getOptimalRatio()
        this.getOptimalPlan()
        this.getLeftHeat()
        this.getRightHeat()
      },
      // 最优配煤发热量
      getOptimalHeat() {
        optimalHeat().then(response => {
          if (response && response.success) {
            this.optimalHeatData = response.data[0].value
          }
        })
      },
      // 左翼与右翼煤量配比
      getOptimalRatio() {
        optimalRatio().then(response => {
          if (response && response.success) {
            this.optimalRatioData = response.data[0].value
          }
        })
      },
      // 智能配煤方案
      getOptimalPlan() {
        optimalPlan().then(response => {
          if (response && response.success) {
            this.optimalPlanData = response.data
            for (let i = 0; i < this.optimalPlanData.length; i++) {
              switch (this.optimalPlanData[i].indicator_name) {
                case '大巷皮带N3-1速度':
                  this.dxpdnsd = this.optimalPlanData[i].value
                  break;
                case '大巷皮带S3-1速度':
                  this.dxpdssd = this.optimalPlanData[i].value
                  break;
                case '右翼瞬时煤量':
                  this.yyssml = this.optimalPlanData[i].value
                  break;
                case '左翼瞬时煤量':
                  this.zyssml = this.optimalPlanData[i].value
                  break;
                case '给煤机1给煤量':
                  this.jmj1 = this.optimalPlanData[i].value
                  break;
                case '给煤机2给煤量':
                  this.jmj2 = this.optimalPlanData[i].value
                  break;
              }
            }
          }
        })
      },
      // 左翼煤发热量
      getLeftHeat() {
        leftRightHeat({ indicator: 'left_heating_value' }).then(response => {
          if (response && response.success) {
            this.leftHeatData = response.data[0].value
          }
        })
      },
      // 右翼煤发热量
      getRightHeat() {
        leftRightHeat({ indicator: 'right_heating_value' }).then(response => {
          if (response && response.success) {
            this.rightHeat = response.data[0].value
          }
        })
      },
      // 初始化数据
      resetData() {
        this.optimalHeatData = 0
        this.optimalRatioData = 0
        this.optimalPlanData = []
        this.dxpdnsd = 0
        this.dxpdssd = 0
        this.yyssml = 0
        this.zyssml = 0
        this.jmj1 = 0
        this.jmj2 = 0
        this.leftHeatData = 0
        this.rightHeat = 0
      }
    },
  }
</script>
<style scoped>
  /deep/.el-dialog {
    border: .002604rem /* 0.5/192 */ solid #27C3E2;
    box-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;
    border-radius: .026042rem /* 5/192 */;
  }

  /deep/.el-dialog__header {
    padding-top: .041667rem /* 8/192 */;
    border: .002604rem /* 0.5/192 */ solid #27C3E2;
    border-top-left-radius: .026042rem /* 5/192 */;
    border-top-right-radius: .026042rem /* 5/192 */;
    background-image: linear-gradient(#042a52, #077dc5);
  }

  /deep/.el-dialog__footer {
    padding-bottom: .041667rem /* 8/192 */;
    border: .002604rem /* 0.5/192 */ solid #27C3E2;
    border-bottom-left-radius: .026042rem /* 5/192 */;
    border-bottom-right-radius: .026042rem /* 5/192 */;
    background-image: linear-gradient(#077dc5, #042a52);
  }

  /deep/.el-dialog__title {
    color: #fff;
  }

  /deep/.el-dialog__body {
    background-color: #071738;
    color: #fff;
    padding: .104167rem /* 20/192 */;
  }

  .btn {
    border: .010417rem /* 2/192 */ solid #02aac3;
    background-color: #045895;
    border-radius: .03125rem /* 6/192 */;
    color: #fff;
  }

  .btn:hover {
    background-color: #0779c0;
  }

  /deep/.el-dialog__headerbtn {
    margin-top: -0.026042rem /* 5/192 */;
    color: #fff;
  }

  .top {
    margin: .104167rem /* 20/192 */ 0;
    text-align: center;
  }

  .s {
    margin-left: .052083rem /* 10/192 */;
    display: inline-block;
    padding: .026042rem /* 5/192 */;
    width: 40%;
    border: .000521rem /* 0.1/192 */ solid #046fb7;
    border-radius: .026042rem /* 5/192 */;
    background-color: #062947;
  }

  .s1 {
    text-align: center;
    margin-left: .130208rem /* 25/192 */;
    display: inline-block;
    padding: .026042rem /* 5/192 */;
    width: 80%;
    border: .000521rem /* 0.1/192 */ solid #046fb7;
    border-radius: .026042rem /* 5/192 */;
    background-color: #062947;
  }

  .m {
    display: inline-block;
    padding: .026042rem /* 5/192 */ .130208rem /* 25/192 */;
  }

  .g {
    color: #77b413;
  }
</style>