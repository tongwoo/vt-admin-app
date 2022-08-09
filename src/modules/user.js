/**
 * 功能：用户
 * 日期：2022-06-14
 */
import http from '@/utils/http';

/**
 * 新增用户
 * @param {Object} data 数据
 * @return {Promise<{success:boolean,message:string}>}
 */
function createUser(data) {
    return http.post(
        '/user/create',
        data
    ).then((response) => {
        const body = response.data;
        return {
            success: response.isOk,
            message: body.message
        };
    });
}

/**
 * 更新用户
 * @param {Object} data 数据
 * @return {Promise<{success:boolean,message:string}>}
 */
function updateUser(data) {
    return http.post(
        '/user/update',
        data
    ).then((response) => {
        const body = response.data;
        return {
            success: response.isOk,
            message: body.message
        };
    });
}

/**
 * 删除用户
 * @param {string|string[]|int|int[]} ids 数据ID,可为单个数值或数值数组
 * @return {Promise<{success:boolean,message:string}>}
 */
function removeUser(ids) {
    return http.post(
        '/user/delete',
        {
            ids
        }
    ).then((response) => {
        const body = response.data;
        return {
            success: response.isOk,
            message: body.message
        };
    });
}

/**
 * 获取用户详情
 * @param {string|int} id 主键ID
 * @return {Promise<{success:boolean,message:string,data:Object}>}
 */
function fetchUser(id) {
    return http.get(
        '/user/detail?id=' + id,
    ).then((response) => {
        const body = response.data;
        return {
            success: response.isOk,
            message: body.message,
            data: response.isOk ? body.data.item : null
        };
    });
}

/**
 * 获取用户列表
 * @param {Object} params 参数
 * @return {Promise<Array>}
 */
function fetchUsers(params = {}) {
    return http.get(
        '/user/items',
        {
            params
        }
    ).then((response) => {
        const body = response.data;
        return body.data.items;
    });
}

/**
 * 获取分页之后的用户列表
 * @param {Object} params 参数
 * @return {Promise<{items:Array,total:int}>}
 */
function fetchPageUsers(params = {}) {
    return http.get(
        '/user/page-items',
        {
            params
        }
    ).then((response) => {
        const body = response.data;
        const data = {
            items: [],
            total: 0
        };
        if (response.isOk) {
            data.items = body.data.items;
            data.total = body.data.total;
        }
        return data;
    });
}

/**
 * 获取用户键值对列表
 * @param {Object} params 参数
 * @return {Promise<Array<{name:string,value:string|int,origin:Object}>>}
 */
function fetchPairUsers(params = {}) {
    return fetchUsers(params).then((items) => {
        return items.map((item) => {
            return {
                name: item.name,
                value: item.id,
                origin: item
            };
        });
    });
}


export {
    createUser,
    updateUser,
    removeUser,
    fetchUser,
    fetchUsers,
    fetchPageUsers,
    fetchPairUsers,
}
