<!-- 视频监控页面 -->
<template>
  <div class="main">
    <div class="left">
      <p style="font-size: .072917rem;color: #03b5eb;font-weight: 600;">视频监控</p>
      <el-input size="mini" placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <div class="treeContent" style="width: 100%;height: calc(100% - .3125rem);overflow: auto;">
        <el-tree :data="videoTreeData" @check="play" node-key="url" :filter-node-method="filterNode"
          :default-expanded-keys="defExpKeys" ref="tree" show-checkbox :props="defaultProps">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <!-- <el-tooltip class="item" effect="dark" :open-delay="1000" :content="node.label" placement="top"> -->
              <span class="el-tree-label">{{ node.label }}</span>
            <!-- </el-tooltip> -->
          </span>
        </el-tree>
      </div>
    </div>
    <div class="right">
      <div>
        <div>
          <div v-for="(item,index) in videoList" :key="item.url">
            <!-- <video-model :id="'videoMonitor' + i" :url="url"></video-model> -->
            <easy-player :url="item.url" :idx="index" @pullFlow="pullFlow"></easy-player>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '@/utils/flexible'
  import { videolist } from '@/api/monitor'
  // import videoModel from '@/components/videoModel/videoModel'
  import easyPlayer from '@/components/easyPlayer/easyPlayer'
  import $ from 'jquery'
  let map = {}
  export default {
    data() {
      return {
        filterText: '',//筛选过滤
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        videoTreeData: [],
        videoList: [],//视频流
        defExpKeys: [], //默认展开key
        videoUrl: 'http://223.68.162.211:10800/hls/stream_6/stream_6_live.m3u8'
      }
    },
    components: {
      // videoModel,
      easyPlayer
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    computed: {
      playerUrl() {
        return process.env.VUE_APP_PLAYER_URL
      },
    },
    mounted() {
      this.getVideolist()
    },
    destroyed() {
      if(JSON.stringify(map) !== '{}') {
        for(let key in map) {
          if(map.hasOwnProperty(key)) {
            if(map[key]) {
              clearInterval(map[key])
            }
          }
        }
        map = {}
      }
    },
    methods: {
      // 查询视频列表
      getVideolist() {
        videolist().then(res => {
          let a = this.dealWithData(res.data)
          a.forEach(item => {
            item.children = this.dealWithDataTwo(item.children)
          })
          this.videoTreeData = a
          this.defExpKeys = []
          this.defExpKeys.push(this.videoTreeData[0].children[0].children[0].url)
        })
      },


      // 选中复选框触发
      play(a, b, c, d) {
        if(JSON.stringify(map) !== '{}') {
          for(let key in map) {
            if(map.hasOwnProperty(key)) {
              if(map[key]) {
                clearInterval(map[key])
              }
            }
          }
          map = {}
        }
        this.videoList = this.$refs.tree.getCheckedNodes().filter(item => item.url != undefined)
        // console.log(this.videoList)
        if(this.videoList.length) {
          this.videoList.forEach((item,index) => {
            let interVal = `interVal${index}`
            map[interVal] = null
            if( item.device && item.channel ) {
              this.getChannelStream(item.device,item.channel,index)
            }
          })
        }
      },
      // 视频保活
      getChannelStream(device,channel,index) {
        let resUrl = `${this.playerUrl}/api/v1/devices/channelstream?device=${device}&channel=${channel}&protocol=ws_flv`
        $.get(resUrl,(data,status) => {
          console.log(data,'视频保活data--------------->>>')
          if(data) {
            this.$set(this.videoList[index],'url',this.playerUrl.replace('http://','ws://') + data.EasyDarwin.Body.URL)
            let interVal = `interVal${index}`
            map[interVal] = setInterval(() => {
              this.keepAlive(resUrl + '&url=' + data.EasyDarwin.Body.URL)
            },20000)
          }
        })
      },
      keepAlive(url) {
        $.get(url,(data,status) => {
          console.log(data,'keepAliveData------------------>>>>')
        })
      },
      // 播放异常或者断流  重新拉流
      pullFlow(index) {
        const { device, channel } = this.videoList[index]
        let interVal = `interVal${index}`
        if(map[interVal]) clearInterval(map[interVal])
        this.getChannelStream(device,channel,index)
      },


      // 数据分类
      dealWithData(data) {
        let c = [];
        let d = {};
        data.forEach(element => {
          if (!d[element.level1menu]) {
            c.push({
              name: element.level1menu,
              children: [element]
            });
            d[element.level1menu] = element;
          } else {
            c.forEach(ele => {
              if (ele.name == element.level1menu) {
                ele.children.push(element);
              }
            });
          }
        });
        return c;
      },

      // 数据分类
      dealWithDataTwo(data) {
        let c = [];
        let d = {};
        data.forEach(element => {
          if (!d[element.level2menu]) {
            c.push({
              name: element.level2menu,
              children: [element]
            });
            d[element.level2menu] = element;
          } else {
            c.forEach(ele => {
              if (ele.name == element.level2menu) {
                ele.children.push(element);
              }
            });
          }
        });
        return c;
      },



      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      }
    },
  }
</script>
<style scoped>
  .main {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .left {
    width: 13%;
    height: 100%;
    background-color: #1c233a;
    padding: .026042rem;
    box-sizing: border-box;
  }

  .left p {
    color: #079aca;
    padding-left: .026042rem;
    margin-bottom: .041667rem;
    box-sizing: border-box;
  }

  .right {
    width: 87%;
    height: 100%;
    background-color: #000723;
    position: relative;
  }

  .right>div {
    width: 65%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #1c233a;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right>div>div {
    width: 95%;
    height: 95%;
    overflow: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
  }

  .right>div>div>div {
    width: 49.5%;
    height: 49%;
    margin-top: .052083rem;
  }

  /deep/ .el-tree-node__content {
    height: .135417rem;
    font-size: .072917rem;
    /* padding-left: .1875rem!important; */
  }
  .custom-tree-node {
    display: block;
    line-height: .135417rem;
    font-size: .072917rem;
  }


  .el-tree-node__content .el-tree-label {
    /* display: inline-block; */
    width: .78125rem;
    height: .135417rem;
    font-size: .072917rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }


  /deep/ .el-tree {
    background-color: transparent !important;
    color: #fff !important;
  }

  /deep/ .el-tree-node__content:hover {
    background-color: #057cd0 !important;
  }

  /deep/ .el-input__inner {
    background-color: transparent !important;
    border: .005208rem solid #0076c8 !important;
    color: #fff;
    margin-bottom: .052083rem;
    height: .145833rem;
    font-size: .072917rem;
  }
  /deep/ .el-checkbox__inner {
    width: .072917rem;
    height: .072917rem;
  }

  /* .treeContent {
    width: 100%;
    overflow-y: auto;
    overflow-X: hidden;
  } */

  /* .treeContent::-webkit-scrollbar {
    width: 5px;
  }

  .treeContent::-o-scrollbar {
    width: 0px;
  }

  .treeContent::-moz-scrollbar {
    width: 0px;
  } */

  /*兼容IE*/
  /* .treeContent {
    -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
    overflow: auto;
  } */

  /deep/ .video-js.vjs-fullscreen::backdrop,:not(:root):fullscreen::backdrop {
    position: fixed!important;
    top: 0!important;
    left: 0!important;
    width: 50%!important;
    height: 50%!important;
    right: 50%!important;
    bottom: 50%!important;
    background-color: transparent!important;
  }


  /deep/ .video-js.vjs-fullscreen .vjs-tech {
    position: absolute;
    top: 17.5%;
    left: 29%;
    width: 55%!important;
    height: 73%!important;
    /* transform: translateY(-50%)!important; */
  }

  /deep/ .video-js.vjs-fullscreen {
    background-color: transparent!important;
  }
</style>