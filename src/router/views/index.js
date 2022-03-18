export default [
  {
    path: "/",
    name: "Home",
    component: () => import('@/views/Home.vue'),
    redirect: { name: 'home' },
    meta: { title: '首页' },
    children: [
      {
        path: 'home',
        component: () => import('@/views/page/home/home.vue'),
        name: 'home',
        meta: { title: '首页' },
      },
      {
        path: 'index',
        component: () => import('@/views/page/mainCoalFlow/contentView.vue'),
        name: 'index',
        meta: { title: '主煤流协同经济运行' },
      },
      {
        path: 'cockpit',
        component: () => import('@/views/page/cockpit/mainPage.vue'),
        name: 'cockpit',
        meta: { title: '管理驾驶舱' },
      },
      {
        path: 'monitor',
        component: () => import('@/views/page/monitor/monitor'),
        name: 'monitor',
        meta: { title: '视频监控' },
      },
      {
        path: 'dispatch',
        component: () => import('@/views/page/dispatch/dispatch'),
        name: 'dispatch',
        meta: { title: '调度中心' },
      },
      {
        path: 'nuggets',
        component: () => import('@/views/page/nuggets/nuggets'),
        name: 'nuggets',
        meta: { title: '生产部' },
      },
      {
        path: 'electromechanical',
        component: () => import('@/views/page/electromechanical/electromechanical'),
        name: 'electromechanical',
        meta: { title: '机电部' },
      },
      {
        path: 'informationCenter',
        component: () => import('@/views/page/informationCenter/informationCenter'),
        name: 'informationCenter',
        meta: { title: '信息中心' },
      },
      {
        path: 'safetySupervision',
        component: () => import('@/views/page/safetySupervision/safetySupervision'),
        name: 'safetySupervision',
        meta: { title: '安监部' },
      },
      {
        path: 'ventilation',
        component: () => import('@/views/page/ventilation/ventilation'),
        name: 'ventilation',
        meta: { title: '通风部' },
      },
      {
        path: 'gischart',
        component: () => import('@/views/page/gisChart/gisChart'),
        name: 'gischart',
        meta: { title: 'GIS一张图' },
      },
      {
        path: 'safetyMonitoring',
        component: () => import('@/views/page/safetyMonitoring/safetyMonitoring'),
        name: 'safetyMonitoring',
        meta: { title: '安全监控' },
      },
      {
        path: 'subsystem',
        component: () => import('@/views/page/subsystem/subsystem'),
        name: 'Subsystem',
        meta: { title: '子系统' },
      },
      {
        path: 'logRecord',
        component: () => import('@/views/page/LogRecord/LogRecord'),
        name: 'logRecord',
        meta: { title: '日志记录' },
      }
    ]
  }
]