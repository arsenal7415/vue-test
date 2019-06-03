import Login from '../views/login.vue'
// import NotFound from './views/404.vue'
import {basicLayout} from '../components/index'
import basic from './basic'
import task from './task'
import workshop from './workshop'
import {echarts} from '../views/production'

let routes = [
  {
    path: '/login',
    component: Login,
    name: '登陆',
    hidden: true
  },
  // {
  //     path: '/404',
  //     component: NotFound,
  //     name: '',
  //     hidden: true
  // },
  //{ path: '/main', component: Main },
  {
    path: '/',
    component: basicLayout,
    name: '首页',
  },
  {
    path: '/task',
    component: basicLayout,
    name: '生产任务管理',
    iconCls: 'fa fa-id-card-o',
    redirect: '/task/index',
    children: [
      ...task,
    ]
  },
  {
    path: '/workshop',
    component: basicLayout,
    name: '车间作业管理',
    iconCls: 'fa fa-address-card',
    children:[
      ...workshop
    ]
  },
  {
    path: '/test3',
    component: basicLayout,
    name: '生产看板',
    iconCls: 'fa fa-address-card',
  },
  {
    path: '/test4',
    component: basicLayout,
    name: '报表分析',
    iconCls: 'fa fa-address-card',
    redirect: '/test4/echarts',
    children:[
      {
        path: '/test4/echarts',
        component: echarts,
        name: '报表可视化',
        hidden:true
      }

    ]
  },
  {
    path: '/basic',
    component: basicLayout,
    name: '基础数据',
    children: [
      ...basic
    ]
  },
  {
      path: '*',
      hidden: true,
      redirect: { path: '/login' }
  }
];

export default routes;
