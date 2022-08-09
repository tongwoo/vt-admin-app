/**
 * 功能：权限
 * 日期：2022-06-14
 */
import http from '@/utils/http'

/**
 * 新增权限
 * @param {Object} data 数据
 * @return {Promise<{success:boolean,message:string}>}
 */
function createPermission(data) {
    return http.post(
        '/permission/create',
        data
    ).then((response) => {
        const body = response.data
        return {
            success: response.isOk,
            message: body.message
        }
    })
}

/**
 * 更新权限
 * @param {Object} data 数据
 * @return {Promise<{success:boolean,message:string}>}
 */
function updatePermission(data) {
    return http.post(
        '/permission/update',
        data
    ).then((response) => {
        const body = response.data
        return {
            success: response.isOk,
            message: body.message
        }
    })
}

/**
 * 删除权限
 * @param {string|string[]|int|int[]} ids 数据ID,可为单个数值或数值数组
 * @return {Promise<{success:boolean,message:string}>}
 */
function removePermission(ids) {
    return http.post(
        '/permission/delete',
        {
            ids
        }
    ).then((response) => {
        const body = response.data
        return {
            success: response.isOk,
            message: body.message
        }
    })
}

/**
 * 获取权限详情
 * @param {string|int} id 主键ID
 * @return {Promise<{success:boolean,message:string,data:Object}>}
 */
function fetchPermission(id) {
    return http.get(
        '/permission/detail?id=' + id
    ).then((response) => {
        const body = response.data
        return {
            success: response.isOk,
            message: body.message,
            data: response.isOk ? body.data.item : null
        }
    })
}

/**
 * 获取权限列表
 * @param {Object} params 参数
 * @return {Promise<Array>}
 */
function fetchPermissions(params = {}) {
    return http.get(
        '/permission/items',
        {
            params
        }
    ).then((response) => {
        const body = response.data
        return body.data.items
    })
}

/**
 * 获取分页之后的权限列表
 * @param {Object} params 参数
 * @return {Promise<{items:Array,total:int}>}
 */
function fetchPagePermissions(params = {}) {
    return http.get(
        '/permission/page-items',
        {
            params
        }
    ).then((response) => {
        const body = response.data
        const data = {
            items: [],
            total: 0
        }
        if (response.isOk) {
            data.items = body.data.items
            data.total = body.data.total
        }
        return data
    })
}

/**
 * 获取权限键值对列表
 * @param {Object} params 参数
 * @return {Promise<Array<{name:string,value:string|int,origin:Object}>>}
 */
function fetchPairPermissions(params = {}) {
    return fetchPermissions(params).then((items) => {
        return items.map((item) => {
            return {
                name: item.name,
                value: item.id,
                origin: item
            }
        })
    })
}

/**
 * 获取权限数
 * @return {Promise<Array>}
 */
function fetchPermissionTree(params = {}) {
    return http.get(
        '/permission/tree',
        {
            params
        }
    ).then((response) => {
        if (!response.isOk) {
            return []
        }
        return response.data.data.items
    })
}

export {
    createPermission,
    updatePermission,
    removePermission,
    fetchPermission,
    fetchPermissions,
    fetchPagePermissions,
    fetchPairPermissions,
    fetchPermissionTree
}
