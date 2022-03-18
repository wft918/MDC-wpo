// import subsystemCoalList from '@/subSystemConfig/subsystemCoal'
// import subsystemDrivingList from '@/subSystemConfig/subsystemDriving'
// import subsystemMainList from '@/subSystemConfig/subsystemMain'
// import subsystemWindList from '@/subSystemConfig/subsystemWind'
// import subsystemElectricList from '@/subSystemConfig/subsystemElectric'
// import subsystemWaterList from '@/subSystemConfig/subsystemWater'
// import subsystemMachineList from '@/subSystemConfig/subsystemMachine'
// import subsystemDiagnosisList from '@/subSystemConfig/subsystemDiagnosis'
// import subsystemWashList from '@/subSystemConfig/subsystemWash'
// import subsystemSewageList from '@/subSystemConfig/subsystemSewage'
// import subsystemVehicleList from '@/subSystemConfig/subsystemVehicle'
// import subsystemTransportList from '@/subSystemConfig/subsystemTransport'
// import subsystemLocationList from '@/subSystemConfig/subsystemLocation'
// import subsystemGasList from '@/subSystemConfig/subsystemGas'
// import subsystemRoofList from '@/subSystemConfig/subsystemRoof'
// import subsystemControlList from '@/subSystemConfig/subsystemControl'
const subsystemCoalList = window.sys_subsystem_config['综采工作面'] || []
const subsystemDrivingList = window.sys_subsystem_config['综掘工作面'] || []
const subsystemMainList = window.sys_subsystem_config['主煤流集控系统'] || []
const subsystemWindList = window.sys_subsystem_config['通风系统'] || []
const subsystemElectricList = window.sys_subsystem_config['供电系统'] || []
const subsystemWaterList = window.sys_subsystem_config['排水系统'] || []
const subsystemMachineList = window.sys_subsystem_config['压风机房巡检机器人'] || []
const subsystemDiagnosisList = window.sys_subsystem_config['大型设备在线监测与故障智能诊断'] || []
const subsystemWashList = window.sys_subsystem_config['洗选系统'] || []
const subsystemSewageList = window.sys_subsystem_config['智能污水处理'] || []
const subsystemVehicleList = window.sys_subsystem_config['铁路智能装车'] || []
const subsystemTransportList = window.sys_subsystem_config['汽车智能装运'] || []
const subsystemLocationList = window.sys_subsystem_config['人员定位'] || []
const subsystemGasList = window.sys_subsystem_config['瓦斯预警'] || []
const subsystemRoofList = window.sys_subsystem_config['顶板灾害预警'] || []
const subsystemControlList = window.sys_subsystem_config['安全管控'] || []
// const menuCodes = JSON.parse(localStorage.getItem('resources') || '[]').filter(arr => arr.type == 'MENU' || arr.code == '*').map(item => item.code) || []
// let lists = []
// for(let i = 0; i < lists.length; i++) {
//   if(menuCodes.indexOf('*') >= 0) break
//   if(lists[i] && lists[i].length) {
//     handlerData(lists[i])
//   }
// }

// function handlerData(list) {
//   for(let i = list.length - 1; i >= 0; i--) {
//     if(menuCodes.indexOf(list[i].code) < 0) {
//       list.splice(i,1)
//       continue
//     }
//     if(list[i].children && list[i].children.length) {
//       handlerData(list[i].children)
//     }
//   }
// }
export const subSystems = {
  computed: {
    subsystemCoal:() => subsystemCoalList,
    subsystemDriving:() => subsystemDrivingList,
    subsystemMain:() => subsystemMainList,
    subsystemWind:() => subsystemWindList,
    subsystemElectric:() => subsystemElectricList,
    subsystemWater:() => subsystemWaterList,
    subsystemMachine:() => subsystemMachineList,
    subsystemDiagnosis:() => subsystemDiagnosisList,
    subsystemWash:() => subsystemWashList,
    subsystemSewage:() => subsystemSewageList,
    subsystemVehicle:() => subsystemVehicleList,
    subsystemTransport:() => subsystemTransportList,
    subsystemLocation:() => subsystemLocationList,
    subsystemGas:() => subsystemGasList,
    subsystemRoof:() => subsystemRoofList,
    subsystemControl:() => subsystemControlList
  }
}