<doc>
  瓦斯预警实时监控
</doc>
<template>
  <div class="ltTop">
    <div class="cai">
      <div>
        <div>
          <p style="font-size: .15625rem;font-family: ysbth;">{{alarmTotal}}</p>
          <p style="font-size: .0625rem;">预警总数</p>
        </div>
      </div>
      <div>
        <div>
          <div style="color: #ff0045;">
            <p style="font-size: .145833rem;font-family: ysbth;">{{trendRed}}</p>
            <p style="font-size: .0625rem;">红色趋势</p>
          </div>
        </div>
        <div>
          <div style="color: #ff7d00;">
            <p style="font-size: .145833rem;font-family: ysbth;">{{trendOrange}}</p>
            <p style="font-size: .0625rem;">橙色趋势</p>
          </div>
        </div>
        <div>
          <div style="color: #00d068;">
            <p style="font-size: .145833rem;font-family: ysbth;">{{trendGreen}}</p>
            <p style="font-size: .0625rem;">绿色趋势</p>
          </div>
        </div>
        <div>
          <div style="color: #f6c917;">
            <p style="font-size: .145833rem;font-family: ysbth;">{{danger}}</p>
            <p style="font-size: .0625rem;">危险</p>
          </div>
        </div>
        <div>
          <div style="color: #957bff;">
            <p style="font-size: .145833rem;font-family: ysbth;">{{threaten}}</p>
            <p style="font-size: .0625rem;">威胁</p>
          </div>
        </div>
        <div>
          <div style="color: #2a99ff;">
            <p style="font-size: .145833rem;font-family: ysbth;">{{normal}}</p>
            <p style="font-size: .0625rem;">正常</p>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <div class="tableTitle" style="background-color: #3c4860;">
        <div style="width: 30%;">预警时间</div>
        <div style="width: 25%;">工作面</div>
        <div style="width: 15%;">班次</div>
        <div style="width: 15%;">状态</div>
        <div style="width: 15%;">趋势</div>
      </div>
      <div class="tableContent">
        <div v-for="(item,index) in tableData" :key="item.num" class="tableRow" :class="{'jClass':index % 2 == 0,'oClass':index % 2 != 0}">
          <div style="width: 30%;">{{index + 1 < 10?'0' + (index + 1):index + 1 || ''}}</div>
          <div style="width: 25%;">{{item.location || ''}}</div>
          <div style="width: 15%;">{{item.shift || ''}}</div>
          <div style="width: 15%;">
            <span :style="{color:item.state == '正常'?'#00d068':item.state == '危险'?'#f9cc16':'#9279fa'}" style="font-weight: 1000;">· </span>
            <span>{{item.state || ''}}</span>
          </div>
          <div style="width: 15%;">
            <span :style="{color:item.trend == '橙色趋势'?'#ff7d00':item.trend == '红色趋势'?'#ff0045':'#fff'}" style="font-weight: 1000;">· </span>
            <span>{{item.trend || ''}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../../utils/flexible.js'
  import { getGasAlarmTotal,getGasAlarmByGroup,getGasAlarm } from '@/api/ventilation'
  export default {
    data() {
      return {
        tableData:[],
        alarmTotal:0,
        trendRed:0,
        trendOrange:0,
        trendGreen:0,
        danger:0,
        threaten:0,
        normal:0
      }
    },
    mounted() {
      this.getGasAlarmTotal()
      this.getGasAlarmByGroup()
      this.getGasAlarm()
    },
    methods: {
      // 当前预警总数量
      getGasAlarmTotal() {
        getGasAlarmTotal().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.alarmTotal = data.data[0].total
            }
          }
        })
      },
      // 当前预警各级别数量
      getGasAlarmByGroup() {
        getGasAlarmByGroup().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              data.data.forEach(item => {
                if(item.key == '正常') {
                  this.normal = item.total
                }else if(item.key == '危险') {
                  this.danger = item.total
                }else if(item.key == '威胁') {
                  this.threaten = item.total
                }else if(item.key == '橙色趋势') {
                  this.trendOrange = item.total
                }else if(item.key == '绿色趋势') {
                  this.trendGreen = item.total
                }else if(item.key == '红色趋势') {
                  this.trendRed = item.total
                }
              })
            }
          }
        })
      },
      // 当前预警内容（预警时间，预警内容，预警级别，预警地点）
      getGasAlarm() {
        getGasAlarm().then(data => {
          if(data && data.success) {
            if(data.data.length) {
              this.tableData = data.data
            }
          }
        })
      }
    },
  }
</script>
<style scoped>
  .ltTop {
    width: 100%;
    height: 100%;
    padding: .208333rem .104167rem .104167rem .104167rem;
    box-sizing: border-box;
  }

  .cai {
    width: 100%;
    height: .65625rem;
    display: flex;
    justify-content: space-between;
  }
  .cai > div:nth-of-type(1) {
    width: .75rem;
    height: 100%;
    background-color: #162f4f;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    border: .005208rem solid #065386;
    box-sizing: border-box;
  }
  .cai > div:nth-of-type(2) {
    width: calc(100% - .807292rem);
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-between;
  }
  .cai > div:nth-of-type(2) > div {
    background-color: #162f4f;
    border: .005208rem solid #065386;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 32%;
    height: 48%;
  }
  .table {
    width: 100%;
    height: calc(100% - .760417rem);
    padding: .104167rem 0 0 0;
    box-sizing: border-box;
  }
  .tableTitle {
    width: 100%;
    height: .208333rem;
    display: flex;
  }
  .tableContent {
    width: 100%;
    height: calc(100% - .208333rem);
    overflow: auto;
  }
  .tableContent>div {
    width: 100%;
    height: .208333rem;
    display: flex;
  }
  .tableTitle > div {
    height: 100%;
    text-align: center;
    line-height: .208333rem;
    color: #fff;
    font-size: .072917rem;
  }
  .tableContent > div > div {
    height: 100%;
    text-align: center;
    line-height: .208333rem;
    color: #fff;
    font-size: .072917rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .tableRow {
    cursor: pointer;
  }
  .tableRow:hover {
    background-color: rgba(60, 72, 96, .3);
  }

  .oClass {
    background-color: #242b42;
    -webkit-box-shadow:0 0 10px #070e29;
    -moz-box-shadow:0 0 10px #070e29;
    box-shadow:0 0 10px #070e29;
  }
  .jClass {
    background-color: #1c233b;
  }
</style>