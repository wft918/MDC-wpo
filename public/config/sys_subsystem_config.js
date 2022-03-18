/**
 * 向window上挂载sys_subsystem_config属性
 * 测试来用
 */
window.sys_subsystem_config = {
  '综采工作面': [
    {
      name:'自动化主页面',
      id:'1',
      url:'http://10.200.206.92:7166/view2.html?drawingId=601f6186f6575e09a9634a6e8b450e4d',
      children:[]
    },
    {
      name:'采煤机主页面',
      id:'2',
      url:'http://10.200.206.92:7166/view2.html?drawingId=c747d3a6b0cf02034a4998aa6a566b08',
      children:[]
    },
    {
      name:'一键启停控制主页面',
      id:'3',
      url:'http://10.200.206.92:7166/view2.html?drawingId=bbf05dddfe1f0b1ed6495668e3867598',
      children:[]
    }
  ],
  '综掘工作面': [
    {
      name: '掘进机',
      id: '1',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=ce09fb4030db4b4f1fdb623aac439aa7#/',
      children: []
    },
    {
        name:'配套设备',
        id:'2',
        url:'http://10.200.206.92:7166/view2.html?drawingId=0444a8bcc1bc44ee653111a0962bb34a#/',
        children:[]
    },
    {
        name:'导航与故障报警',
        id:'3',
        url:'http://10.200.206.92:7166/view2.html?drawingId=3de40a52bec40e99abb0856fa4f34bf5#/',
        children:[]
    }
  ],
  '主煤流集控系统': [
    {
      name: '主界面',
      id: '1',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=83045f3fea3bbf00ab426b218382b02b#/',
      children: []
    },
    {
      name: '主斜井',
      id: '2',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=8b9a1ca61e33268c263e0ae78cc4d6f8#/',
      children: []
    },
    {
      name: '主运一部',
      id: '3',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=3ef201f88e3c9e457c5a5ca53f4b69f3#/',
      children: []
    },
    {
      name: '主运二部',
      id: '4',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=d6393d08633832d6083a4771342018e2#/',
      children: []
    },
    {
      name: '3308顺槽',
      id: '5',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=2cc68ae86c9d3000091c007757a20a8b#/',
      children: []
    }
  ],
  '通风系统': [
      {
      name: '主界面',
      id: '1',
      url: 'http://10.200.206.92:16384/#/autologin',
      children: []
    }
  ],
  '供电系统': [
      {
      name: '王坡开闭所',
      id: '1',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=9c336e68eb3a1de30f53e20fd9043268',
      children: []
    },
    {
      name: '天地变电站',
      id: '2',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=7003af2f4840ad32c5bfee92dc58119b',
      children: []
    },
    {
      name: '塔里变电站',
      id: '3',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=70189e700c59d89ee550a9849bb2469e',
      children: []
    },
    {
      name: '中央变电所',
      id: '4',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=d84a6e3474f16a6aa94fd5b2cb2a3c2a',
      children: []
    },
    {
      name: '二采区变电所',
      id: '5',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=a18dbe996299fb5328a054cd867a0676',
      children: []
    },
    {
      name: '三采区变电所',
      id: '6',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=f7e353f1c496711b96506d1e799aa028',
      children: []
    },
    {
      name: '胶带机头硐室',
      id: '7',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=10d05ba77c9049724c80a2ea6a9520e1',
      children: []
    }
    
  ],
  '排水系统': [
      {
      name: '中央水泵房',
      id: '1',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=594e43e5397dce3c4f1cf5a9ec096848#/',
      children: []
    },
    {
      name: '三采区泵房',
      id: '2',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=20756d18729d8b7019e935110a6062a4#/',
      children: []
    }
  ],
  '压风机房巡检机器人': [
    {
      name: '机器人展示主页面',
      id: '1',
      url: 'http://80.grf739ad.bpcdy1k0.33ca36.grapps.cn/wpagvindex_UI.html',
      children: []
    },
    {
      name: '机器人数据查询页面',
      id: '2',
      url: '',
      children: [
        {
            name: '当前巡检信息汇总',
            id: '1',
            url: 'http://80.grf739ad.bpcdy1k0.33ca36.grapps.cn/historypage_UI.html',
            children: []
        },
        {
            name: '巡检历史查询',
            id: '2',
            url: 'http://80.grf739ad.bpcdy1k0.33ca36.grapps.cn/historypage_UI_cam.html',
            children: []
        },
        {
            name: '报警历史查询',
            id: '3',
            url: 'http://80.grf739ad.bpcdy1k0.33ca36.grapps.cn/historypage_UI_warn.html',
            children: []
        }
      ]
    }
  ],
  '大型设备在线监测与故障智能诊断': [
    {
      name: '大型设备在线监测与故障智能诊断',
      id: '1',
      url: 'http://10.200.206.68:8089/tdly/index.html',
      children: []
    }
  ],
  '洗选系统': [
      {
      name: '洗选系统',
      id: '1',
      url: 'http://10.10.13.111/Dashboard/C',
      children: []
    }
  ],
  '智能污水处理': [
      {
      name: '生活污水生化系统',
      id: '1',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=ce8a886f4370a4efbf815cb16fec475e#/',
      children: []
    },
    {
      name: '生活污水深度系统',
      id: '2',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=44f9447bf36deff11c22d09e98e22295#/',
      children: []
    },
    {
      name: '矿井水净化系统',
      id: '3',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=4993e20755cc09f2290e84d3f0f39cc2#/',
      children: []
    }
  ],
  '铁路智能装车': [
      {
      name: '铁路智能装车',
      id: '1',
      url: 'http://10.200.206.92:7166/view2.html?drawingId=6247fb89d0af4f19bc301f857c2e8097#/',
      children: []
    }
  ],
  '汽车智能装运': [],
  '人员定位': [
    {
      name: '人员定位',
      id: '1',
      url: 'http://11236.gr40704b.zew639dy.33ca36.grapps.cn/login?id=admin&pwd=admin',
      children: []
    }
  ],
  '瓦斯预警': [],
  '顶板灾害预警': [],
  '安全管控': [],
  '安全监控': [
      {
      name: '安全监控',
      id: '1',
      url: 'http://10.200.206.92:16385/',
      children: []
    }
  ]
  
}