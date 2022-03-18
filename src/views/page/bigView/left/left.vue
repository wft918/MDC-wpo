<doc>
  大屏左侧部分布局代码
</doc>
<template>
  <div class="box">
    <div class="title">
      <span>生产</span>
      <img class="side" src="../../../../assets/img/system/side.png" alt="" />
    </div>
    <!--  系统综合指数 -->
    <div class="prodc-right" @mouseenter="proedMouseEnter">
      <div class="txt">系统综合指数</div>
      <div>
        <div class="num">{{ score }}</div>
        <div class="txt">分</div>
      </div>
    </div>
    <div class="content">
      <!-- 上面内容 -->
      <div class="part top" style="height: 44%">
        <top></top>
      </div>
      <!-- 中间内容 -->
      <div class="part bottom" style="height: 29%">
        <div style="width: 100%" :style="{ height: isShow ? 'calc(100% - .0781rem)' : '100%' }">
          <component :is="currentComponent" :alarmHistoryList="alarmHistoryList"></component>
        </div>
        <!-- 圆点切换 -->
        <div v-if="isShow" style="width: 100%;height: 0.0781rem;display: flex;justify-content: center;align-items: center;">
          <div @click="dotChange('cenChart')" :class="{ dynamiClass: currentComponent == 'cenChart' }" style="width: 0.0625rem;height: 0.0625rem;border-radius: 50%;background-color: #fff;margin-right: 0.026rem;cursor: pointer;"></div>
          <div @click="dotChange('cenTable')" :class="{ dynamiClass: currentComponent == 'cenTable' }" style="width: 0.0625rem;height: 0.0625rem;border-radius: 50%;background-color: #fff;cursor: pointer;"></div>
        </div>
      </div>
      <!-- 底部内容 -->
      <div class="part bottom" style="height: 24%">
        <bottom></bottom>
      </div>
    </div>

    <!-- 系统综合指数弹框表格 -->
    <transition name="el-zoom-in-center">
      <div v-show="prodcShow" class="table" ref="prodcDialog">
        <div class="tableTitle">
          <div style="width: 15%">报警时间</div>
          <div style="width: 13%">系统名称</div>
          <div style="width: 13%">设备名称</div>
          <div style="width: 13%">部件名称</div>
          <div style="width: 13%">报警传感器</div>
          <div style="width: 14%">报警描述</div>
          <div style="width: 10%">状态</div>
          <div style="width: 9%">详情</div>
        </div>
        <div class="tableContent">
          <div class="row" v-for="(item, index) in alarmHistoryList" :key="index">
            <div class="col" style="width: 15%">{{ item.datetime }}</div>
            <div class="col" style="width: 13%; line-height: 0.1823rem">
              {{ item.systemname }}
            </div>
            <div class="col" style="width: 13%; line-height: 0.1823rem">
              {{ item.equipname }}
            </div>
            <div class="col" style="width: 13%; line-height: 0.1823rem">
              {{ item.partname }}
            </div>
            <div class="col" style="width: 13%; line-height: 0.1823rem">
              {{ item.alarmsensor }}
            </div>
            <div class="col" style="width: 14%; line-height: 0.1823rem">
              {{ item.description || '' }}
            </div>
            <div class="col" style="width: 10%; line-height: 0.1823rem">
              {{ item.state }}
            </div>
            <div class="col" style="width: 9%; line-height: 0.1823rem">
              <el-button @click="tomky(item.url)" type="text" style="transform: translateY(-0.0104rem)">
                <i class="el-icon-view"></i>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import top from "@/views/page/bigView/left/part/top";
import cenChart from "@/views/page/bigView/left/part/cen-chart";
import cenTable from "@/views/page/bigView/left/part/cen-table";
import bottom from "@/views/page/bigView/left/part/bottom";
import { alarmRealtime, faultScore, alarmHistory } from "@/api/bigView2";
export default {
  data() {
    return {
      currentComponent: "cenChart",
      isShow: false,
      timer: null,
      prodcShow: false,
      score: 0,
      alarmHistoryList: [],  // 历史告警
      realTimeAlarmjsonList: []  //  实时告警
    };
  },
  components: {
    top,
    cenChart,
    cenTable,
    bottom,
  },
  mounted() {
    this.getFaultScore();  //  系统综合指数
    this.getAlarmHistory()  //  历史告警
    this.getAlarmRealtime()  // 实时告警
    this.timer = setInterval(this.getAlarmRealtime, 3000);
    this.documClick();
  },
  destroyed() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    // 圆点切换
    dotChange(comp) {
      if (comp !== this.currentComponent) {
        this.currentComponent = comp;
      }
    },
    //  鼠标移入系统综合指数
    proedMouseEnter() {
      if (!this.prodcShow) this.prodcShow = true;
    },
    //  点击document 关闭综合指数
    documClick() {
      document.onclick = (e) => {
        if (this.$refs.prodcDialog) {
          let isSelf = this.$refs.prodcDialog.contains(e.target);
          if (!isSelf) {
            if (this.prodcShow) this.prodcShow = false;
          }
        }
      };
    },
    //  实时告警
    getAlarmRealtime() {
      alarmRealtime().then((data) => {
        if (data && data.success) {
          if (data.data.length) {
            if (!this.isShow) this.isShow = true;
            let flag = false
            for(let i = 0; i < data.data.length; i++) {
              if(this.realTimeAlarmjsonList.indexOf(JSON.stringify(data.data[i])) < 0) {
                if(!flag) flag = true
                break
              }
            }
            if(flag) {
              this.getAlarmHistory()
              if(this.currentComponent !== 'cenTable') this.currentComponent = 'cenTable'
              this.$emit("showDialog", JSON.stringify(data.data));
              this.realTimeAlarmjsonList = data.data.map(item => JSON.stringify(item))
            }
          }
        }
      });
    },
    //  历史告警
    getAlarmHistory() {
      alarmHistory().then(data => {
        if(data && data.success) {
          if(data.data.length) {
            this.alarmHistoryList = data.data
          }
        }
      })
    },
    //  查看详情
    tomky(url) {
      window.open(url, '_blank')
    },
    //  系统综合指数
    getFaultScore() {
      faultScore().then((data) => {
        if (data && data.success) {
          if (data.data.length) {
            this.score = data.data[0].score;
          }
        }
      });
    },
    getDate(num) {
      var date1 = new Date();
      //今天时间
      var time1 =
        date1.getFullYear() +
        "-" +
        (date1.getMonth() + 1) +
        "-" +
        date1.getDate();
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() + num);
      //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
      var time2 =
        this.addZero(date2.getFullYear()) +
        "-" +
        this.addZero(date2.getMonth() + 1) +
        "-" +
        this.addZero(date2.getDate());
      return time2;
    },

    addZero(num) {
      //补0方法
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    }
  },
};
</script>
<style scoped>
.box {
  width: 100%;
  height: 100%;
  color: #ffffff;
  position: relative;
}

.prodc-right {
  position: absolute;
  top: 0;
  right: 0;
  height: 0.1406rem;
  width: 34%;
  background-image: url("../../../../assets/img/bigView/prodcImage.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  padding: 0 0.0521rem 0 0.0521rem;
  box-sizing: border-box;
  cursor: pointer;
}
.prodc-right > div:nth-of-type(1) {
  width: 60%;
  height: 100%;
  line-height: 0.1406rem;
}
.prodc-right > div:nth-of-type(2) {
  width: 40%;
  height: 100%;
  line-height: 0.1406rem;
  display: flex;
  justify-content: space-between;
}
.prodc-right .txt {
  color: #f3f3f3;
  font-size: 0.0625rem;
}
.prodc-right .num {
  font-size: 0.1042rem;
  color: #ffffff;
  font-family: "ysbth";
}

.title {
  width: 100%;
  height: 0.125rem /* 22/192 */;
  font-size: 0.083333rem /* 16/192 */;
  font-weight: 600;
  color: #ffffff;
  line-height: 0.114583rem /* 22/192 */;
  font-weight: 650;
}

.side {
  height: 0.0625rem /* 12/192 */;
  margin-left: 0.0521rem /* 15/192 */;
}

.content {
  width: 100%;
  margin-top: 0.026042rem /* 5/192 */;
  height: calc(100% - 0.140625rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.part {
  width: 100%;
  height: 30%;
}

.top {
  height: 45%;
}

.bottom {
  height: 27%;
}

.dynamiClass {
  background-color: #057cb5 !important;
}

/* 小表格 */
.table {
  width: 3.125rem;
  /* height: .520833rem; */
  position: absolute;
  top: 0.2604rem;
  left: 2.2396rem;
  z-index: 9999;
}

.tableTitle {
  width: 100%;
  height: 0.125rem;
  display: flex;
}
.tableTitle > div {
  height: 100%;
  background-color: #303e49;
  border: 0.005208rem solid #000722;
  box-sizing: border-box;
  text-align: center;
  line-height: 0.125rem;
  font-size: 0.0625rem;
  color: #fff;
}
.tableTitle > div:nth-of-type(1) {
  /* width: 13%; */
  height: 100%;
  background-color: #303e49;
  border: 0.005208rem solid #000722;
  box-sizing: border-box;
  font-size: 0.0625rem;
  color: #fff;
}

.tableContent {
  width: 100%;
  /* height: calc(100% - .125rem); */
  /* overflow-y: auto; */
}
.tableContent > div {
  width: 100%;
  height: 0.1823rem;
  display: flex;
  cursor: pointer;
}
.row:hover .col {
  color: #009bff !important;
}
.tableContent > div > div {
  width: 12.5%;
  height: 100%;
  background-color: #161e2d;
  border: 0.005208rem solid #000722;
  box-sizing: border-box;
  text-align: center;
  font-size: 0.0625rem;
  color: #fff;
}
.tableContent > div > div:nth-of-type(1) {
  /* width: 13%; */
  height: 100%;
  background-color: #161e2d;
  border: 0.005208rem solid #000722;
  box-sizing: border-box;
  font-size: 0.0625rem;
  color: #fff;
}

.el-button--text {
  font-size: 0.0729rem;
}
</style>