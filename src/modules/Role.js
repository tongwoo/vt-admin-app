/**
 * 功能：角色
 * 作者：tongwoo
 * 日期：2022-03-17
 */
import http from '@/common/utils/http';

/**
 * 新增角色
 * @param {Object} data 数据
 * @return {Promise<{success:boolean,message:string}>}
 */
function createRole(data) {
    return http.post(
        '/role/create',
        data
    ).then((body) => {
        return {
            success: body.isOk,
            message: body.data.message
        };
    });
}

/**
 * 更新角色
 * @param {Object} data 数据
 * @return {Promise<{success:boolean,message:string}>}
 */
function updateRole(data) {
    return http.post(
        '/role/update',
        data
    ).then((body) => {
        return {
            success: body.isOk,
            message: body.data.message
        };
    });
}

/**
 * 删除角色
 * @param {string|string[]|int|int[]} ids 数据ID,可为单个数值或数值数组
 * @return {Promise<{success:boolean,message:string}>}
 */
function removeRole(ids) {
    return http.post(
        '/role/delete',
        {
            ids
        }
    ).then((body) => {
        return {
            success: body.isOk,
            message: body.data.message
        };
    });
}

/**
 * 获取角色详情
 * @param {string|int} id 主键ID
 * @return {Promise<{success:boolean,message:string,data:Object}>}
 */
function fetchRole(id) {
    return http.get(
        '/role/detail?id=' + id,
    ).then((body) => {
        return {
            success: body.isOk,
            message: body.data.message,
            data: body.data.data.item
        };
    });
}

/**
 * 获取角色列表
 * @param {Object} params 参数
 * @return {Promise<Array>}
 */
function fetchRoles(params = {}) {
    return http.get(
        '/role/items',
        {
            params
        }
    ).then((body) => {
        return body.data.data.items;
    });
}

/**
 * 获取分页之后的角色列表
 * @param {Object} params 参数
 * @return {Promise<{records:Array,total:int}>}
 */
function fetchPageRoles(params = {}) {
    return http.get(
        '/role/page-items',
        {
            params
        }
    ).then((body) => {
        const data = {
            items: [],
            total: 0
        };
        if (body.isOk) {
            data.items = body.data.data.items;
            data.total = body.data.data.total;
        }
        return data;
    });
}

/**
 * 获取角色键值对列表
 * @param {Object} params 参数
 * @return {Promise<Array<{name:string,value:string|int,origin:Object}>>}
 */
function fetchPairRoles(params = {}) {
    return fetchRoles(params).then((items) => {
        return items.map((item) => {
            return {
                name: item.description,
                value: item.id,
                origin: item
            };
        });
    });
}

/**
 * 角色权限列表
 * @param {int} roleId 角色ID
 * @returns {Promise<Array>}
 */
function fetchRolePermissions(roleId) {
    return http.get(
        '/role/permissions?id=' + roleId
    ).then((response) => {
        if (!response.isOk) {
            return [];
        }
        return response.data.data.items;
    });
}

export {
    createRole,
    updateRole,
    removeRole,
    fetchRole,
    fetchRoles,
    fetchPageRoles,
    fetchPairRoles,
    fetchRolePermissions,
}
