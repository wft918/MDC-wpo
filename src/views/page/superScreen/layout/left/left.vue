<!-- 左边部分 -->
<template>
  <div style="width: 100%;height: 100%;">
    <div class="title">
      <span>生产</span>
      <img style="margin-left: .026042rem;transform: translateY(.010417rem);"
        src="../../../../../assets/img/system/side.png" alt="">
    </div>
    <div style="width: 98%;height: calc(100% - .182292rem);margin: 0 auto;display: flex;flex-direction: column;">
      <!-- 上 -->
      <div style="width: 100%;height: 30%;">
        <!-- 生产指标title -->
        <div class="sczb" style="width: 100%;height: .15625rem;margin: 0 auto;line-height: .15625rem;text-align: center;color: #fff;font-weight: 600;text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;font-size: 15px;">生产指标</div>
        <div style="width: 100%;height: calc(100% - .15625rem);display: flex;">
          <!-- 左 -->
          <div style="width: 52%;height: 100%;display: flex;justify-content: space-between;">
            <div style="width: 19%;height: 100%;">
              <div style="width: 100%;height: 60%;">
                <!-- pie -->
                <left-top-pie :id="'pie1'" :name="'日产量'" :val="'0.95'" :unit="'万吨'"></left-top-pie>
              </div>
              <div style="width: 100%;height: 40%;text-align: center;">
                <p style="color: #fff;">本月累计量</p>
                <p style="color: #015796;font-weight: 600;">25万吨</p>
                <p style="color: #fff;">完成计划</p>
                <p style="color: #015796;font-weight: 600;">78%</p>
              </div>
            </div>
            <div style="width: 19%;height: 100%;">
              <div style="width: 100%;height: 60%;">
                <!-- pie -->
                <left-top-pie :id="'pie2'" :name="'日掘进进尺'" :val="'1'" :unit="'米'"></left-top-pie>
              </div>
              <div style="width: 100%;height: 40%;text-align: center;">
                <p style="color: #fff;">本月累计量</p>
                <p style="color: #015796;font-weight: 600;">25万吨</p>
                <p style="color: #fff;">完成计划</p>
                <p style="color: #015796;font-weight: 600;">78%</p>
              </div>
            </div>
            <div style="width: 19%;height: 100%;">
              <div style="width: 100%;height: 60%;">
                <!-- pie -->
                <left-top-pie :id="'pie3'" :name="'日洗煤量'" :val="'1.1'" :unit="'万吨'"></left-top-pie>
              </div>
              <div style="width: 100%;height: 40%;text-align: center;">
                <p style="color: #fff;">本月累计量</p>
                <p style="color: #015796;font-weight: 600;">25万吨</p>
                <p style="color: #fff;">完成计划</p>
                <p style="color: #015796;font-weight: 600;">78%</p>
              </div>
            </div>
            <div style="width: 19%;height: 100%;">
              <div style="width: 100%;height: 60%;">
                <!-- pie -->
                <left-top-pie :id="'pie4'" :name="'日抽放打钻进尺'" :val="'50'" :unit="'日销量'"></left-top-pie>
              </div>
              <div style="width: 100%;height: 40%;text-align: center;">
                <p style="color: #fff;">本月累计量</p>
                <p style="color: #015796;font-weight: 600;">25万吨</p>
                <p style="color: #fff;">完成计划</p>
                <p style="color: #015796;font-weight: 600;">78%</p>
              </div>
            </div>
            <div style="width: 19%;height: 100%;">
              <div style="width: 100%;height: 60%;">
                <!-- pie -->
                <left-top-pie :id="'pie5'" :name="'日产量'" :val="'0.95'" :unit="'万吨'"></left-top-pie>
              </div>
              <div style="width: 100%;height: 40%;text-align: center;">
                <p style="color: #fff;">本月累计量</p>
                <p style="color: #015796;font-weight: 600;">25万吨</p>
                <p style="color: #fff;">完成计划</p>
                <p style="color: #015796;font-weight: 600;">78%</p>
              </div>
            </div>
          </div>
          <!-- 右 -->
          <div style="width: 48%;height: 100%;padding: 20px;box-sizing: border-box;display: flex;justify-content: space-between;">
            <div v-for="item in topRightData" :key="item.name1" style="width: 32%;height: 100%;display: flex;flex-direction: column;justify-content: space-between;">
              <div style="width: 100%;height: 48.5%;border: 1px solid #025389;box-sizing: border-box;background-color: rgba(2, 83, 137, .3);text-align: center;display: flex;justify-content: center;align-items: center;">
                <div>
                  <p style="color: #fefefe;font-size: 14px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">{{item.name1}}</p>
                  <p style="color: #0099fd;font-family: ysbth;font-size: 25px;">{{item.value1}}</p>
                  <p style="color: #8793a2;">{{item.unit1}}</p>
                </div>
              </div>
              <div style="width: 100%;height: 48.5%;border: 1px solid #025389;box-sizing: border-box;background-color: rgba(2, 83, 137, .3);text-align: center;display: flex;justify-content: center;align-items: center;">
                <div>
                  <p style="color: #fefefe;font-size: 14px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">{{item.name2}}</p>
                  <p style="color: #0099fd;font-family: ysbth;font-size: 25px;">{{item.value2}}</p>
                  <p style="color: #8793a2;">{{item.unit2}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 中 -->
      <div style="width: 100%;height: 30%;display: flex;justify-content: space-between;">
        <!-- 左 -->
        <div style="width: 49%;height: 100%;">
          <div class="sczb" style="width: 100%;height: .15625rem;margin: 0 auto;line-height: .15625rem;text-align: center;color: #fff;font-weight: 600;text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;font-size: 15px;">系统报警统计</div>
          <div style="width: 100%;height: calc(100% - .15625rem);padding: 0 30px;box-sizing: border-box;display: flex;">
            <!-- 左 -->
            <div style="width: 35%;height: 100%;">
              <div style="width: 100%;height: 20px;line-height: 20px;text-align: center;color: #868a96;font-size: 12px;font-weight: 800;">近30天异常报警次数</div>
              <div style="width: 100%;height: calc(100% - 20px);display: flex;justify-content: center;align-items: center;position: relative;">
                <!-- <cen-ltlt-pie></cen-ltlt-pie> -->
                <img style="width: 80%;display: block;" src="../../../../../assets/img/bigView/yuan.png" alt="">
                <div style="position: absolute;top: 50%;transform: translateY(-50%);color: #fff;text-align: center;">
                  <p style="color: #ff005c;font-family: ysbth;font-size: 24px;">50</p>
                  <p>次</p>
                </div>
              </div>
            </div>
            <!-- 右 -->
            <div style="width: 65%;height: 100%;">
              <cen-ltrt-pie></cen-ltrt-pie>
            </div>
          </div>
        </div>
        <!-- 右 -->
        <div style="width: 49%;height: 100%;">
          <div class="sczb" style="width: 100%;height: .15625rem;margin: 0 auto;line-height: .15625rem;text-align: center;color: #fff;font-weight: 600;text-shadow: 0rem 0rem .052083rem /* 10/192 */ #00FFFF;font-size: 15px;">媒质分析</div>
          <div style="width: 100%;height: calc(100% - .208333rem);margin-top: 8px;">
              <!-- <el-form :model="searchForm" ref="searchForm" class="demo-form-inline">
                <el-row style="height: 40px;">
                  <el-col :span="7" style="margin-left: 20px;height: 40px;">
                    <el-form-item label="">
                      <el-date-picker
                        style="width: 100%;"
                        size="mini"
                        v-model="searchForm.date"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" style="margin-left: 20px;height: 40px;">
                    <el-form-item label="" style="margin-left: 20px;">
                      <el-select style="width: 100%;" size="mini" v-model="searchForm.shift" placeholder="选择班次">
                        <el-option v-for="item in dataList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" style="margin-left: 20px;text-align: center;color: #dadce1;height: 40px;">
                    <el-form-item label="">
                      <span>报告人：</span>
                      <span>宋欣</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form> -->
              <!-- <div style="width: 100%;height: calc(100% - 45px);"> -->
                <!-- 轮播表 -->
                <dv-scroll-board :config="config" style="width:100%;height:100%" />
              <!-- </div> -->
          </div>
        </div>
      </div>
      <!-- 下 -->
      <div style="width: 100%;height: 40%;display: flex;justify-content: space-between;position: relative;">
        <div style="width: 13%;height: 100%;">
          <bottom :title="'籽煤仓'"></bottom>
        </div>
        <div style="width: 13%;height: 100%;">
          <bottom :title="'末精煤棚'"></bottom>
        </div>
        <div style="width: 13%;height: 100%;">
          <bottom :title="'末原煤棚'"></bottom>
        </div>
        <div style="width: 13%;height: 100%;">
          <bottom :title="'煤泥棚'"></bottom>
        </div>
        <div style="width: 13%;height: 100%;">
          <bottom :title="'小块仓'"></bottom>
        </div>
        <div style="width: 13%;height: 100%;">
          <bottom :title="'中块仓'"></bottom>
        </div>
        <img style="width: 104%;position: absolute;bottom: 0;left: -2%;" src="../../../../../assets/img/bigView/lg.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import leftTopPie from './chart/leftTopPie'
  import cenLtltPie from './chart/cenLtltPie'
  import cenLtrtPie from './chart/cenLtrtPie'
  import bottom from './chart/bottom'
  export default {
    data() {
      return {
        topRightData:[
          {
            name1:'日吨煤耗电成本',
            value1:15,
            unit1:'元/吨',
            name2:'日综采开机率',
            value2:88,
            unit2:'%',
          },
          {
            name1:'日人员功效',
            value1:7,
            unit1:'吨/天',
            name2:'日综掘开机率',
            value2:89,
            unit2:'%',
          },
          {
            name1:'日耗电量',
            value1:1123,
            unit1:'千瓦时',
            name2:'日主运开机率',
            value2:88,
            unit2:'%',
          }
        ],
        searchForm: {
          date:'',//日期
          shift:'',//班次
        },
        dataList:[//下拉框数据
          {
            label:'班次1',
            value:'1'
          },
          {
            label:'班次2',
            value:'2'
          },
        ],
        config: {
          header: ['品种', '灰分(Aad)%', '全水分(Mt)%','挥发分(Vad)%','全硫(St)%','发热量(cal/g)'],
          headerBGC:'rgba(10, 75, 117,1)', //表头颜色
          oddRowBGC:'rgba(10, 75, 117,.3)',//奇数行背景色
          evenRowBGC:'rgba(1, 83, 120,.5)',//偶数行背景色
          headerHeight:20,//表头高度
          align: ['left'], //列对齐方式
          data: [
            ['洗中块', '11.4', '4.83','6.89','0.38','7074.90'],
            ['洗小块', '11.4', '4.83','6.89','0.38','7074.90'],
            ['洗中块', '11.4', '4.83','6.89','0.38','7074.90'],
            ['好煤', '11.4', '4.83','6.89','0.38','7074.90'],
            ['未精煤', '11.4', '4.83','6.89','0.38','7074.90'],
            ['洗中块', '11.4', '4.83','6.89','0.38','7074.90'],
            ['洗中块', '11.4', '4.83','6.89','0.38','7074.90'],
            ['洗中块', '11.4', '4.83','6.89','0.38','7074.90'],
            ['洗中块', '11.4', '4.83','6.89','0.38','7074.90'],
            ['洗中块', '11.4', '4.83','6.89','0.38','7074.90'],
          ]
        }
      }
    },
    components: {
      leftTopPie,
      cenLtltPie,
      cenLtrtPie,
      bottom
    },
    mounted() {
      
    },
    methods: {
      
    },
  }
</script>
<style scoped>
  .title {
    width: 100%;
    height: .182292rem;
    /* line-height: .182292rem; */
    color: #fff;
    text-shadow: 0rem 0rem .052083rem #00FFFF;
  }
  .sczb {
    background-image: url(../../../../../assets/img/superScreen/titleBg1.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  /* .seamless-warp{
    width: 100%;
    height: 100%;
    overflow: hidden;
  } */


  /deep/ .el-input__inner {
    background-color: transparent !important;
    border: 1px solid #0076c8 !important;
    color: #fff;
    margin-bottom: 10px;
  }

  /deep/ .el-form--inline .el-form-item__label {
    color: #9a9da7;
  }

  /deep/ .el-radio-button__inner {
    background-color: #00406e;
    border: none;
    color: #fff;
  }
</style>