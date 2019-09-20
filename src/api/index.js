/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = 'http://127.0.0.1:8081/api/v1';

// 1、获取标注
export const getmark = ( pageIndex, name) => ajax(BASE_URL+'/getmark', {pageIndex, name});

// 获取标注详情
export const getmarkDetail = (markId) => ajax(BASE_URL+'/getmarkdetail', {markId});

// 删除标注
export const  removeMark = (markId) => ajax(BASE_URL+'/removeMark', {markId});

//  获取标注评论

export const getMarkComments = (markId) => ajax(BASE_URL+'/getMarkComments', {markId});

export const postComment = (token, markId, content) =>  ajax(BASE_URL+'/addMarkCom?markId='+markId , {content}, token, 'POST');

// 2、登录
export const login = (identity, password) => ajax(BASE_URL+'/login', {identity, password}, '', 'POST');

// 获取当前用户
export const getCurrentUser =  (token) => ajax(BASE_URL+'/user/currentUser', {}, token);

// 获取用户部门统计数据
export const getUserDepartments =  (token) => ajax(BASE_URL+'/user/getUserDepartments', {}, token);

// 新建模标注
export const createMark = (target) => ajax(BASE_URL+'/addmark', target, 'POST');

//  分类码
export const getClazzCode = () => ajax(BASE_URL+'/getClazzCode');