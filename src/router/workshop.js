import {workshop,testAlive} from "../views/basic";
import {basic} from "../components";
import {u271,u273,u275,u276,u278,u280,u282} from '../static/operationTabs'

export default [
  {
    path: '/workshop/process/plan',
    name: '工序计划单列表',
    component: basic,
    img:u271
  },
  {
    path: '/workshop/process/dispatch',
    name: '工序派工单列表',
    component: basic,
    img:u273
  },
  {
    path: '/workshop/process/report',
    name: '工序汇报、请检单列表',
    component: basic,
    img:u275
  },
  {
    path: '/workshop/process/change',
    name: '工序转移单列表',
    component: basic,
    img:u276
  },
  {
    path: '/workshop/process/alive',
    name: '测试缓存',
    component: testAlive,
    img:u276,
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/workshop/process/entry',
    name: '在制品期初录入单列表',
    component: basic,
    img:u278
  },
  {
    path: '/workshop/process/check',
    name: '车间在制品盘点单列表',
    component: basic,
    img:u280
  },
]
