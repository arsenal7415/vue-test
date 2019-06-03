import {taskList,productionList} from "../views/production";
import {u271,u273,u275,u276,u278,u280,u282} from '../static/operationTabs'

export default [

  {
    path: '/task/production/info',
    component: taskList,
    name: '生产任务单',
    img:u271,
  },
  {
    path: '/task/outsource/sendMateriel',
    component: taskList,
    name: '委外发料单',
    img:u273,
  },
  {
    path: '/task/production/set',
    component: taskList,
    name: '生产任务改制单',
    img:u275,
  },
  {
    path: '/task/production/change',
    component: taskList,
    name: '生产任务变更单',
    img:u276,
  },
  {
    path: '/task/production/stock',
    component: taskList,
    name: '生产投料单',
    img:u278,
  },
  {
    path: '/task/production/report',
    component: taskList,
    name: '生产汇报单',
    img:u280,
  },
  {
    path: '/task/production/scrapped',
    component: taskList,
    name: '报废、补料单',
    img:u282,
  },
  {
    path: '/task/production/back',
    component: taskList,
    name: '退料单',
    img:u271,
  },
  {
    path: '/task/production/pool',
    component: taskList,
    name: '产品计划池',
    img:u273,
  },
  {
    path: '/task/index',
    component: productionList,
    name: '看板',
    hidden:true,
  },
]
