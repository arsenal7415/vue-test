import {workshop, workshopType,moduleType,module,moduleSource,unit,unitType} from "../views/basic";
import {basic} from "../components";

export default [
  {
    path: '/basic/workshop',
    name: '车间模块',
    component: basic,
    children:[
      {
        path: '/basic/workshop/manage',
        component: workshop,
        name: '车间管理',
      },
      {
        path: '/basic/workshop/type',
        component: workshopType,
        name: '车间类别',
      },
    ]
  },
  {
    path: '/basic/module',
    name: '模具',
    component: basic,
    children:[
      {
        path: '/basic/module/manage',
        component: module,
        name: '模具管理',
      },
      {
        path: '/basic/module/type',
        component: moduleType,
        name: '模具类别',
      },
      {
        path: '/basic/module/source',
        component: moduleSource,
        name: '模具来源',
      },
    ]
  },
  {
    path: '/basic/unit',
    name: '计量单位',
    component: basic,
    children:[
      {
        path: '/basic/unit/manage',
        component: unit,
        name: '单位管理',
      },
      {
        path: '/basic/unit/type',
        component: unitType,
        name: '单位类型',
      },
    ]
  },
]
