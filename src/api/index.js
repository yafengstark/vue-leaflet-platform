/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = 'http://127.0.0.1:8081/api/v1';

// 1、根据经纬度获取位置详情
export const getmark = (pageIndex, name) => ajax(BASE_URL+'/getmark', {pageIndex, name});

