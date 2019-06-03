import {get,post} from '../request/http';
import base from './base'; // 导入接口域名列表
import qs from 'qs'
const user = base.user;


export const Login = params => {
  const url=`${user}/user/backend/login`;
  return post(url, params).then(res => res);
};
