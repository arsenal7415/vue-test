/**
 * task模块接口列表
 */
import base from './base'; // 导入接口域名列表
const task = base.task;
import {get,post,Delete} from '../request/http';


/************************************生产任务单*********************************************************/
/**
 * 获取生产任务单列表
 * @returns {*|Promise<*>}
 */
export const getTaskList = params => {
  const url=`${task}/productionTask/queryProductionTaskInfoFromBomPageList`;
  const data = {
    params
  };
  return get(url,data).then(res => res.data);
};

/**
 * 更改审核状态
 * @returns {*|Promise<*>}
 */
export const changeAudit = (ids,auditStatus) => {
  const url = task.concat('/productionTask/updateAuditStatus');
  const data = {
    ids,auditStatus
  };
  return post(url, data)
    .then(res => res);
};

/**
 * 取消计划
 * @returns {*|Promise<*>}
 */
export const changePlan = (id) => {
  const url = task.concat('/productionTask/updatePlanStatus');
  const data = {
    id
  };
  return post(url, data)
    .then(res => res);
};

