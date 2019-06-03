/**
 * task模块接口列表
 */
import base from './base'; // 导入接口域名列表
const basic = base.basic;
import {get,post,Delete} from '../request/http';


/*****************************************车间管理***********************************************/

/**
 * 获取车间信息
 * @returns {*|Promise<*>}
 */
export const getWorkShopList = (pageIndex, pageSize) => {
  const url = basic.concat("/workshop/queryWorkshopInfoPageList");
  const data = {
    pageIndex, pageSize
  };
  return get(url, data)
    .then(res => res.data);
};

// /**
//  * 获取车间不分页
//  * @returns {*|Promise<*>}
//  */
// export const getAllWorkshopInfo = () => {
//   const url = basic.concat("/workshop/queryWorkshopInfoList");
//   return fetchUtils.get(url, null, false)
//     .then(res => res.data);
// };

/**
 * 获取id获取车间信息
 * @returns {*|Promise<*>}
 */
export const getWorkshopInfoById = (id) => {
  const url = basic.concat(`/workshop/getWorkshopInfoById/${id}`);
  return get(url, null)
    .then(res => res.data);
};

/**
 * 新增车间信息
 * @returns {*|Promise<*>}
 */
export const addWorkShop = (data) => {
  const url = basic.concat("/workshop/addWorkshop");
  return post(url, data)
    .then(res => res);
};

/**
 * 修改车间信息
 * @returns {*|Promise<*>}
 */
export const editWorkshopInfo = (data) => {
  const url = basic.concat("/workshop/updateWorkshop");
  return post(url, data)
    .then(res => res);
};

/**
 * 删除车间信息
 * @returns {*|Promise<*>}
 */
export const delWorkShop = (id) => {
  const url = basic.concat(`/workshop/deleteWorkshopInfoById/${id}`);
  return Delete(url, id)
    .then(res => res);
};


/*****************************************车间类别***********************************************/

/**
 * 获取车间类别列表
 * @returns {*|Promise<*>}
 */
export const getWorkShopTypeList = params => {
  const url=`${basic}/workshopType/queryWorkshopTypeInfoPageList`;
  return get(url, {params:params}).then(res => res.data);
};

/**
 * 获取车间类别不分页
 * @returns {*|Promise<*>}
 */
export const getAllWorkshopType = () => {
  const url = `${basic}/workshopType/queryWorkshopTypeInfoList`;
  return get(url)
    .then(res => res.data);
};

/**
 * 根据id获取车间类别
 * @returns {*|Promise<*>}
 */
export const getWorkShopTypeById = id => {
  const url=`${basic}/workshopType/getWorkshopTypeInfoById/${id}`;
  return get(url, {params:id}).then(res => res.data);
};

/**
 * 根据id修改车间类别
 * @returns {*|Promise<*>}
 */
export const editWorkShopTypeById = params => {
  const url=`${basic}/workshopType/updateWorkshopType`;
  return post(url, params).then(res => res);
};

/**
 * 添加车间类别
 * @returns {*|Promise<*>}
 */
export const addWorkShopType = params => {
  const url=`${basic}/workshopType/addWorkshopType`;
  return post(url, params).then(res => res);
};

/**
 * 删除车间类别
 * @returns {*|Promise<*>}
 */
export const delWorkShopType = id => {
  const url=`${basic}/workshopType/deleteWorkshopTypeInfoById/${id}`;
  return Delete(url).then(res => res);
};



/*********************************  计量单位分类  ***********************************/

/**
 * 获取计量单位分类
 * @returns {*|Promise<*>}
 */
export const getUnitType = (pageIndex, pageSize) => {
  const url = basic.concat("/measureUnitType/queryMeasureUnitTypeInfoPageList");
  const data = {
    pageIndex, pageSize
  };
  return get(url, data, false)
    .then(res => res.data);
};

/**
 * 获取计量单位分类不分页
 * @returns {*|Promise<*>}
 */
export const getAllUnitType = () => {
  const url = basic.concat("/measureUnitType/queryMeasureUnitTypeInfoList");
  return get(url, null)
    .then(res => res.data);
};

/**
 * 根据id获取计量单位详情
 * @returns {*|Promise<*>}
 */
export const getUnitTypeById = (id) => {
  const url = basic.concat(`/measureUnitType/getMeasureUnitTypeInfoById/${id}`);
  return get(url, id)
    .then(res => res.data);
};

/**
 * 新增计量单位分类
 * @returns {*|Promise<*>}
 */
export const addUnitType = (name) => {
  const url = basic.concat("/measureUnitType/addMeasureUnitType");
  const data={
    name
  };
  return post(url, data)
    .then(res => res);
};

/**
 * 修改计量单位分类
 * @returns {*|Promise<*>}
 */
export const editUnitType = (id, name) => {
  const url = basic.concat("/measureUnitType/updateMeasureUnitType");
  const data = {
    id,name
  };
  return post(url, data)
    .then(res => res);
};

/**
 * 删除计量单位分类
 * @returns {*|Promise<*>}
 */
export const delUnitType = (id) => {
  const url = basic.concat(`/measureUnitType/deleteMeasureUnitTypeInfoById/${id}`);
  const data = {
    id
  };
  return Delete(url, data)
    .then(res => res);
};


 /*********************************  计量单位管理  ***********************************/

/**
 * 获取计量单位信息
 * @returns {*|Promise<*>}
 */
export const getUnitInfo = (pageIndex, pageSize) => {
  const url = basic.concat("/measureUnit/queryMeasureUnitInfoPageList");
  const data = {
    pageIndex, pageSize
  };
  return get(url, data)
    .then(res => res.data);
};
//
// /**
//  * 获取计量单位信息
//  * @returns {*|Promise<*>}
//  */
// export const getAllUnitInfo = () => {
//   const url = basic.concat("/measureUnit/queryMeasureUnitInfoList");
//   return fetchUtils.get(url, null, false)
//     .then(res => res.data);
// };
//
// /**
//  * 获取计量单位编号
//  * @returns {*|Promise<*>}
//  */
// export const getUnitInfoId = () => {
//   const url = basic.concat("/id/createId");
//   return fetchUtils.post(url, null, false)
//     .then(res => res.dataValue);
// };

/**
 * 根据id获取计量单位详情
 * @returns {*|Promise<*>}
 */
export const getUnitInfoById = (id) => {
  const url = basic.concat(`/measureUnit/getMeasureUnitInfoById/${id}`);
  const data = {
    id
  };
  return get(url, data)
    .then(res => res.data);
};

/**
 * 新增计量单位信息
 * @returns {*|Promise<*>}
 */
export const addUnitInfo = (info) => {
  const url = basic.concat("/measureUnit/addMeasureUnit");
  return post(url, info)
    .then(res => res);
};

/**
 * 修改计量单位信息
 * @returns {*|Promise<*>}
 */
export const editUnitInfo = (info) => {
  const url = basic.concat("/measureUnit/updateMeasureUnit");
  return post(url, info)
    .then(res => res);
};

/**
 * 删除计量单位信息
 * @returns {*|Promise<*>}
 */
export const delUnitInfo = (id) => {
  const url = basic.concat(`/measureUnit/deleteMeasureUnitInfoById/${id}`);
  return Delete(url, id)
    .then(res => res);
};



/*********************************  模具来源  ***********************************/

/**
 * 获取模具来源
 * @returns {*|Promise<*>}
 */
export const getModuleSource = (pageIndex, pageSize) => {
  const url = basic.concat("/mouldSource/queryMouldSourceInfoPageList");
  const data = {
    pageIndex, pageSize
  };
  return get(url, data)
    .then(res => res.data);
};

/**
 * 获取模具来源不分页
 * @returns {*|Promise<*>}
 */
export const getAllModuleSource = () => {
  const url = basic.concat("/mouldSource/queryMouldSourceInfoList");
  return get(url, null, false)
    .then(res => res.data);
};

/**
 * 根据id获取模具来源详情
 * @returns {*|Promise<*>}
 */
export const getModuleSourceById = (id) => {
  const url = basic.concat(`/mouldSource/getMouldSourceInfoById/${id}`);
  const data = {
    id
  };
  return get(url, data)
    .then(res => res.data);
};

/**
 * 新增模具来源
 * @returns {*|Promise<*>}
 */
export const addModuleSource = (mouldSourceName) => {
  const url = basic.concat("/mouldSource/addMouldSource");
  const data = {
    mouldSourceName
  };
  return post(url, data)
    .then(res => res);
};

/**
 * 修改模具来源
 * @returns {*|Promise<*>}
 */
export const editModuleSource = (data) => {
  const url = basic.concat("/mouldSource/updateMouldSource");
  return post(url, data)
    .then(res => res);
};

/**
 * 删除模具来源
 * @returns {*|Promise<*>}
 */
export const delModuleSource = (id) => {
  const url = basic.concat(`/mouldSource/deleteMouldSourceInfoById/${id}`);
  const data = {
    id
  };
  return Delete(url, data)
    .then(res => res);
};



/*********************************  模具类别  ***********************************/

/**
 * 获取模具类别
 * @returns {*|Promise<*>}
 */
export const getModuleType = (pageIndex, pageSize) => {
  const url = basic.concat("/mouldType/queryMouldTypeInfoPageList");
  const data = {
    pageIndex, pageSize
  };
  return get(url, data)
    .then(res => res.data);
};

/**
 * 获取模具类别不分页
 * @returns {*|Promise<*>}
 */
export const getAllModuleType = () => {
  const url = basic.concat("/mouldType/queryMouldTypeInfoList");
  return get(url, null)
    .then(res => res.data);
};

/**
 * 根据id获取模具类别详情
 * @returns {*|Promise<*>}
 */
export const getModuleTypeById = (id) => {
  const url = basic.concat(`/mouldType/getMouldTypeInfoById/${id}`);
  const data = {
    id
  };
  return get(url, data)
    .then(res => res.data);
};

/**
 * 新增模具类别
 * @returns {*|Promise<*>}
 */
export const addModuleType = (mouldTypeName) => {
  const url = basic.concat("/mouldType/addMouldType");
  const data = {
    mouldTypeName
  };
  return post(url, data)
    .then(res => res);
};

/**
 * 修改模具类别
 * @returns {*|Promise<*>}
 */
export const editModuleType = (id, mouldTypeName) => {
  const url = basic.concat("/mouldType/updateMouldType");
  const data = {
    id,mouldTypeName
  };
  return post(url, data)
    .then(res => res);
};

/**
 * 删除模具类别
 * @returns {*|Promise<*>}
 */
export const delModuleType = (id) => {
  const url = basic.concat(`/mouldType/deleteMouldTypeInfoById/${id}`);
  const data = {
    id
  };
  return Delete(url, data)
    .then(res => res);
};



/*********************************  模具管理  ***********************************/

/**
 * 获取模具信息
 * @returns {*|Promise<*>}
 */
export const getModuleInfo = (pageIndex, pageSize) => {
  const url = basic.concat("/mould/queryMouldInfoPageList");
  const data = {
    pageIndex, pageSize
  };
  return get(url, data)
    .then(res => res.data);
};
//
// /**
//  * 获取模具信息不分页
//  * @returns {*|Promise<*>}
//  */
// export const getAllModuleInfo = () => {
//   const url = basic.concat("/mould/queryMouldInfoList");
//   return fetchUtils.get(url, null, false)
//     .then(res => res.data);
// };

/**
 * 根据id获取模具详情
 * @returns {*|Promise<*>}
 */
export const getModuleInfoById = (id) => {
  const url = basic.concat(`/mould/getMouldInfoById/${id}`);
  return get(url, id)
    .then(res => res.data);
};

/**
 * 新增模具
 * @returns {*|Promise<*>}
 */
export const addModuleInfo = (info) => {
  const url = basic.concat("/mould/addMould");
  return post(url, info)
    .then(res => res);
};

/**
 * 修改模具
 * @returns {*|Promise<*>}
 */
export const editModuleInfo = (info) => {
  const url = basic.concat("/mould/updateMould");
  return post(url, info)
    .then(res => res);
};

/**
 * 删除模具
 * @returns {*|Promise<*>}
 */
export const delModuleInfo = (id) => {
  const url = basic.concat(`/mould/deleteMouldInfoById/${id}`);
  return Delete(url, id)
    .then(res => res);
};



 /*********************************  物料规格  ***********************************/
//
// /**
//  * 获取物料规格
//  * @returns {*|Promise<*>}
//  */
// export const getMaterielSize = (pageIndex, pageSize) => {
//   const url = basic.concat("/materielModel/queryMaterielModelInfoPageList");
//   const data = {
//     pageIndex, pageSize
//   };
//   return fetchUtils.get(url, data, false)
//     .then(res => res.data);
// };

/**
 * 获取物料规格不分页
 * @returns {*|Promise<*>}
 */
export const getAllMaterielSize = () => {
  const url = basic.concat("/materielModel/queryMaterielModelInfoList");
  return get(url, null)
    .then(res => res.data);
};
//
// /**
//  * 获取id获取物料规格
//  * @returns {*|Promise<*>}
//  */
// export const getMaterielSizeById = (id) => {
//   const url = basic.concat(`/materielModel/getMaterielModelInfoById/${id}`);
//   return fetchUtils.get(url, null, false)
//     .then(res => res.data);
// };
//
// /**
//  * 新增物料规格
//  * @returns {*|Promise<*>}
//  */
// export const addMaterielSize = (materielModelName) => {
//   const url = basic.concat("/materielModel/addMaterielModel");
//   const data = {
//     materielModelName
//   };
//   return fetchUtils.post(url, data, false)
//     .then(res => res.data);
// };
//
// /**
//  * 修改物料规格
//  * @returns {*|Promise<*>}
//  */
// export const editMaterielSize = (id, materielModelName) => {
//   const url = basic.concat("/materielModel/updateMaterielModel");
//   const data = {
//     id,materielModelName
//   };
//   return fetchUtils.post(url, data, false)
//     .then(res => res.data);
// };
//
// /**
//  * 删除物料规格
//  * @returns {*|Promise<*>}
//  */
// export const delMaterielSize = (id) => {
//   const url = basic.concat(`/materielModel/deleteMaterielModelInfoById/${id}`);
//   const data = {
//     id
//   };
//   return fetchUtils.delete(url, data, false)
//     .then(res => res.data);
// };

