/**
 * 功能：路由
 * 日期：2022-06-16
 */
import {http} from '@/utils/http'

/**
 * 新增路由
 * @param {Object} data 数据
 * @return {Promise<{success:boolean,message:string}>}
 */
export function createRoute(data) {
    return http.post(
        '/route/create',
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
 * 更新路由
 * @param {Object} data 数据
 * @return {Promise<{success:boolean,message:string}>}
 */
export function updateRoute(data) {
    return http.post(
        '/route/update',
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
 * 删除路由
 * @param {string|string[]|int|int[]} ids 数据ID,可为单个数值或数值数组
 * @return {Promise<{success:boolean,message:string}>}
 */
export function removeRoute(ids) {
    return http.post(
        '/route/delete',
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
 * 获取路由详情
 * @param {string|int} id 主键ID
 * @return {Promise<{success:boolean,message:string,data:Object}>}
 */
export function fetchRoute(id) {
    return http.get(
        '/route/detail?id=' + id
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
 * 获取路由列表
 * @param {Object} params 参数
 * @return {Promise<Array>}
 */
export function fetchRoutes(params = {}) {
    return http.get(
        '/route/items',
        {
            params
        }
    ).then((response) => {
        const body = response.data
        return body.data.items
    })
}

/**
 * 获取分页之后的路由列表
 * @param {Object} params 参数
 * @return {Promise<{items:Array,total:int}>}
 */
export function fetchPageRoutes(params = {}) {
    return http.get(
        '/route/page-items',
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
 * 获取路由键值对列表
 * @param {Object} params 参数
 * @return {Promise<Array<{name:string,value:string|int,origin:Object}>>}
 */
export function fetchPairRoutes(params = {}) {
    return fetchRoutes(params).then((items) => {
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
 * 清空路由
 * @return {Promise}
 */
export function truncateRoutes() {
    return http.get(
        '/route/truncate'
    ).then((response) => {
        return response.isOk
    })
}

/**
 * 生成路由
 * @return {Promise}
 */
export function generateRoutes() {
    return http.get(
        '/route/generate'
    ).then((response) => {
        return response.isOk
    })
}
