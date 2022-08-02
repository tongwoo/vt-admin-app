import axios from 'axios';
import store from "@/store/Index.js";
import {isOk} from "@/common/utils/code.js";
import {API_PATH_DEFAULT} from "@/common/constants/ApiPath.js";

/**
 * 标准化响应结构
 * @param {Object} response
 * @returns {Object}
 */
function normalize(response) {
    response.isOk = false;
    response.isJson = false;
    if (response.headers.hasOwnProperty('content-type')) {
        response.isJson = response.headers['content-type'].indexOf('application/json') !== -1;
    }
    if (response.isJson) {
        response.isOk = isOk(response.data.code);
    } else {
        response.isOk = response?.status === 200;
    }
    //统一使用message作为消息，如果服务端用的msg属性的话
    if (response.isJson) {
        if (response.data?.message === undefined) {
            response.data.message = response.data?.msg ?? '未知错误';
        }
    }
    return response
}

//axios实例
const http = axios.create({
    baseURL: API_PATH_DEFAULT,
    timeout: 30000,
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
    }
});

//请求拦截器
http.interceptors.request.use((config) => {
    //检测是否有Token，只有在有值的情况才创建 Authorization 头
    const authorization = store.state.user.authorization;
    if (authorization !== undefined && authorization !== null) {
        config.headers.Authorization = authorization;
    }
    return config;
});

//响应拦截器
http.interceptors.response.use(
    (response) => {
        return normalize(response);
    },
    (error) => {
        //如果是非响应错误
        if (error.isAxiosError || !error.hasOwnProperty('response') || error.response === undefined) {
            throw error;
        }
        //页面不存在、未登录、无权限直接抛出，其他的错误转给业务层处理
        const codes = [401, 403, 404];
        if (codes.indexOf(error.response.status) !== -1) {
            throw error;
        }
        return normalize(error.response);
    }
);

export default http
