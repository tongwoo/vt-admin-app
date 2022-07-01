import store from "@/store/Index.js";
import setting from "@/setting.js";
import jsCookie from "js-cookie";

/**
 * 授权名称，根据设置存储到cookie或者localStorage中的字段名称
 * @type {string}
 */
const AUTHORIZATION_NAME = 'authorization';

/**
 * 在嵌套路由集合中检测指定的路由是否存在
 * @param {Array} routes 路由集合，遍历规则为 节点->子孙节点 - 节点N->子孙节点
 * @param {Object} route 要检测的路由对象，或至少包含fullPath属性的对象
 * @param {Object} parent 父路由
 * @return {boolean}
 */
function routeExists(routes, route, parent = null) {
    for (const item of routes) {
        const fullPath = parent ? parent.path + '/' + item.path : item.path;
        if (fullPath === route.fullPath) {
            return true;
        }
        if (item?.children?.length > 0) {
            const exists = routeExists(item.children, route, item);
            if (exists) {
                return true;
            }
        }
    }
    return false;
}

/**
 * 检测访问权限
 * @param {string|int} permission 待检测的权限
 * @return {boolean} 有权限=true 无权限=false
 */
function checkAccess(permission = '') {
    if (permission === '') {
        return true;
    }
    //本地保存的权限
    const permissions = store.state.user.permissions;
    //如果本地没有则返回无权限
    if (permissions === null || permissions === undefined || permissions.length === 0) {
        return false;
    }
    //是否存在此权限
    const exists = permissions.find((item) => {
        return item === permission
    });
    return exists !== undefined;
}

/**
 * 从客户端获取授权信息
 * @return {null|string}
 */
function readAuthorization() {
    let authorization = null;
    if (setting.auth.storageMethod === 'localstorage') {
        authorization = window.localStorage.getItem(AUTHORIZATION_NAME);
    } else if (setting.auth.storageMethod === 'cookie') {
        authorization = jsCookie.get(AUTHORIZATION_NAME);
    }
    return authorization ?? null;
}

/**
 * 设置授权信息到客户端存储
 * @param {string} authorization 授权数据
 */
function writeAuthorization(authorization) {
    //根据配置将授权数据存放到不同的位置
    if (setting.auth.storageMethod === 'localstorage') {
        window.localStorage.setItem(AUTHORIZATION_NAME, authorization);
    } else if (setting.auth.storageMethod === 'cookie') {
        jsCookie.set(AUTHORIZATION_NAME, authorization, {
            path: '/'
        });
    }
}

/**
 * 清空授权信息
 */
function cleanAuthorization() {
    window.localStorage.removeItem(AUTHORIZATION_NAME);
    jsCookie.remove(AUTHORIZATION_NAME, {
        path: '/'
    });
}

export {
    routeExists,
    checkAccess,
    readAuthorization,
    writeAuthorization,
    cleanAuthorization,
}
