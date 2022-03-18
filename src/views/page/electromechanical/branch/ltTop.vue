<template>
  <div style="width: 100%;height: 100%;">
    <div
      style="width: 100%;height: .208333rem;line-height: .208333rem;padding-left: .052083rem;box-sizing: border-box;color: #03b5eb;font-size: .078125rem;">
      大型设备状态监控</div>
    <div
      style="width: 100%;height: calc(100% - .208333rem);padding: 0 .078125rem;box-sizing: border-box;display: flex;justify-content: space-around;align-items: center;">

      <div class="sqe">
        <transition name="el-zoom-in-top">
          <div class="txt-top" v-show="isShow1">{{dataObj1.equipname}}</div>
        </transition>
        <transition name="el-zoom-in-top">
          <p v-show="isShow1" style="text-align: center;position: absolute;top: .546875rem;width: 100%;">
            <span>运行状态：</span>
            <span>{{dataObj1.status | statusFilte}}</span>
          </p>
        </transition>
        <transition name="el-zoom-in-top">
          <p v-show="isShow1" style="text-align: center;position: absolute;top: .770833rem;width: 100%;">
            <span>使用状态：</span>
            <span>{{dataObj1.useStatus}}</span>
          </p>
        </transition>
      </div>

      <div class="sqe">
        <transition name="el-zoom-in-top">
          <div class="txt-top" v-show="isShow2">{{dataObj2.equipname}}</div>
        </transition>
        <transition name="el-zoom-in-top">
          <p v-show="isShow2" style="text-align: center;position: absolute;top: .546875rem;width: 100%;">
            <span>运行状态：</span>
            <span>{{dataObj2.status | statusFilte}}</span>
          </p>
        </transition>
        <transition name="el-zoom-in-top">
          <p v-show="isShow2" style="text-align: center;position: absolute;top: .770833rem;width: 100%;">
            <span>使用状态：</span>
            <span>{{dataObj2.useStatus}}</span>
          </p>
        </transition>
      </div>

      <div class="sqe">
        <transition name="el-zoom-in-top">
          <div class="txt-top" v-show="isShow3">{{dataObj3.equipname}}</div>
        </transition>
        <transition name="el-zoom-in-top">
          <p v-show="isShow3" style="text-align: center;position: absolute;top: .546875rem;width: 100%;">
            <span>运行状态：</span>
            <span>{{dataObj3.status | statusFilte}}</span>
          </p>
        </transition>
        <transition name="el-zoom-in-top">
          <p v-show="isShow3" style="text-align: center;position: absolute;top: .770833rem;width: 100%;">
            <span>使用状态：</span>
            <span>{{dataObj3.useStatus}}</span>
          </p>
        </transition>
      </div>

      <div class="sqe">
        <transition name="el-zoom-in-top">
          <div class="txt-top" v-show="isShow4">{{dataObj4.equipname}}</div>
        </transition>
        <transition name="el-zoom-in-top">
          <p v-show="isShow4" style="text-align: center;position: absolute;top: .546875rem;width: 100%;">
            <span>运行状态：</span>
            <span>{{dataObj4.status | statusFilte}}</span>
          </p>
        </transition>
        <transition name="el-zoom-in-top">
          <p v-show="isShow4" style="text-align: center;position: absolute;top: .770833rem;width: 100%;">
            <span>使用状态：</span>
            <span>{{dataObj4.useStatus}}</span>
          </p>
        </transition>
      </div>

      <div class="sqe">
        <transition name="el-zoom-in-top">
          <div class="txt-top" v-show="isShow5">{{dataObj5.equipname}}</div>
        </transition>
        <transition name="el-zoom-in-top">
          <p v-show="isShow5" style="text-align: center;position: absolute;top: .546875rem;width: 100%;">
            <span>运行状态：</span>
            <span>{{dataObj5.status | statusFilte}}</span>
          </p>
        </transition>
        <transition name="el-zoom-in-top">
          <p v-show="isShow5" style="text-align: center;position: absolute;top: .770833rem;width: 100%;">
            <span>使用状态：</span>
            <span>{{dataObj5.useStatus}}</span>
          </p>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import { getRunStatus, getDeviceState } from '@/api/electromechanical3'
  export default {
    data() {
      return {
        dataObj1: {
          equipname:'未知',
          status:2,
          useStatus:'未知'
        },
        dataObj2: {
          equipname:'未知',
          status:2,
          useStatus:'未知'
        },
        dataObj3: {
          equipname:'未知',
          status:2,
          useStatus:'未知'
        },
        dataObj4: {
          equipname:'未知',
          status:2,
          useStatus:'未知'
        },
        dataObj5: {
          equipname:'未知',
          status:2,
          useStatus:'未知'
        },
        dataList1: [],
        dataList2: [],
        dataList3: [],
        dataList4: [],
        dataList5: [],
        isShow1: true,
        isShow2: true,
        isShow3: true,
        isShow4: true,
        isShow5: true,
        interval_1: null,
        interval_2: null,
        interval_3: null,
        interval_4: null,
        interval_5: null,
        index_1: 0,
        index_2: 0,
        index_3: 0,
        index_4: 0,
        index_5: 0,
      }
    },
    destroyed() {
      clearInterval(this.interval_1)
      clearInterval(this.interval_2)
      clearInterval(this.interval_3)
      clearInterval(this.interval_4)
      clearInterval(this.interval_5)
    },
    mounted() {
      this.getData()
    },
    filters: {
      statusFilte(status) {
        if(typeof status != 'number') return
        let map = {
          0:'异常',
          1:'正常',
          2:'未知'
        }
        return map[status]
      }
    },
    methods: {
      getData() {
        let p1 = getRunStatus()
        let p2 = getDeviceState()
        Promise.all([p1, p2]).then(result => {
          this.handlerData(result)
        })
      },
      handlerData(result) {
        let data1 = result[0]
        let data2 = result[1]
        if (data1 && data1.code == 200) {
          let _data1 = data1.data.filter(item => item.equipname.indexOf('皮带') >= 0)
          let _data2 = data1.data.filter(item => item.equipname.indexOf('主绞车') >= 0)
          let _data3 = data1.data.filter(item => item.equipname.indexOf('抽放泵') >= 0) //水泵
          let _data4 = data1.data.filter(item => item.equipname.indexOf('通风机') >= 0)
          let _data5 = data1.data.filter(item => item.equipname.indexOf('空压机') >= 0)
          if (_data1.length) {
            _data1.forEach(item => {
              let uList = data2.data.filter(arr => arr.d_device_name == item.equipname)
              if (uList.length) {
                item.useStatus = uList[0].d_name
              } else {
                item.useStatus = '未知'
              }
            })
          }
          if (_data2.length) {
            _data2.forEach(item => {
              let uList = data2.data.filter(arr => arr.d_device_name == item.equipname)
              if (uList.length) {
                item.useStatus = uList[0].d_name
              } else {
                item.useStatus = '未知'
              }
            })
          }
          if (_data3.length) {
            _data3.forEach(item => {
              let uList = data2.data.filter(arr => arr.d_device_name == item.equipname)
              if (uList.length) {
                item.useStatus = uList[0].d_name
              } else {
                item.useStatus = '未知'
              }
            })
          }
          if (_data4.length) {
            _data4.forEach(item => {
              let uList = data2.data.filter(arr => arr.d_device_name == item.equipname)
              if (uList.length) {
                item.useStatus = uList[0].d_name
              } else {
                item.useStatus = '未知'
              }
            })
          }
          if (_data5.length) {
            _data5.forEach(item => {
              let uList = data2.data.filter(arr => arr.d_device_name == item.equipname)
              if (uList.length) {
                item.useStatus = uList[0].d_name
              } else {
                item.useStatus = '未知'
              }
            })
          }
          this.dataList1 = _data1
          this.dataList2 = _data2
          this.dataList3 = _data3
          this.dataList4 = _data4
          this.dataList5 = _data5

          if(this.dataList1.length) {
            this.dataObj1 = this.dataList1[0]
            if(this.dataList1.length > 1) {
              this.interval_1 = setInterval(() => {
                this.isShow1 = false
                this.index_1++
                if(this.index_1 >= this.dataList1.length) {
                  this.index_1 = 0
                }
                this.dataObj1 = this.dataList1[this.index_1]
                setTimeout(() => {
                  this.isShow1 = true
                },400)
              },3000)
            }
          }

          if(this.dataList2.length) {
            this.dataObj2 = this.dataList2[0]
            if(this.dataList2.length > 1) {
              this.interval_2 = setInterval(() => {
                this.isShow2 = false
                this.index_2++
                if(this.index_2 >= this.dataList2.length) {
                  this.index_2 = 0
                }
                this.dataObj2 = this.dataList2[this.index_2]
                setTimeout(() => {
                  this.isShow2 = true
                },400)
              },3000)
            }
          }

          if(this.dataList3.length) {
            this.dataObj3 = this.dataList3[0]
            if(this.dataList3.length > 1) {
              this.interval_3 = setInterval(() => {
                this.isShow3 = false
                this.index_3++
                if(this.index_3 >= this.dataList3.length) {
                  this.index_3 = 0
                }
                this.dataObj3 = this.dataList3[this.index_3]
                setTimeout(() => {
                  this.isShow3 = true
                },400)
              },3000)
            }
          }

          if(this.dataList4.length) {
            this.dataObj4 = this.dataList4[0]
            if(this.dataList4.length > 1) {
              this.interval_4 = setInterval(() => {
                this.isShow4 = false
                this.index_4++
                if(this.index_4 >= this.dataList4.length) {
                  this.index_4 = 0
                }
                this.dataObj4 = this.dataList4[this.index_4]
                setTimeout(() => {
                  this.isShow4 = true
                },400)
              },3000)
            }
          }

          if(this.dataList5.length) {
            this.dataObj5 = this.dataList5[0]
            if(this.dataList5.length > 1) {
              this.interval_5 = setInterval(() => {
                this.isShow5 = false
                this.index_5++
                if(this.index_5 >= this.dataList5.length) {
                  this.index_5 = 0
                }
                this.dataObj5 = this.dataList5[this.index_5]
                setTimeout(() => {
                  this.isShow5 = true
                },400)
              },3000)
            }
          }
        }
      }
    },
  }
</script>
<style scoped>
  .sqe {
    width: 18%;
    height: 85%;
    /* background: linear-gradient(360deg, #3E4C6A 0%, #2F3B53 100%); */
    border: .005208rem solid #00C5FF;
    box-shadow: #0b557b 0px 0px 5px 5px inset;
    padding-top: .104167rem;
    box-sizing: border-box;
    position: relative;
  }

  .txt-top {
    width: 60%;
    margin: 0 auto;
    color: #fff;
    font-size: .09375rem;
    text-align: center;
    /* text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; */
    margin-bottom: .3125rem;
  }

  .sqe p {
    color: #9cdcfe;
    font-size: .09375rem;
  }
</style>