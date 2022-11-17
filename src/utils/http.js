import axios from 'axios'
import store from "@/store/index.js"
import {isOk} from "@/utils/code.js"
import {API_PATH_DEFAULT} from "@/constants/api-path.js"

//axios实例
const http = axios.create({
    baseURL: API_PATH_DEFAULT,
    timeout: 30000,
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
    },
})

//请求拦截器
http.interceptors.request.use((config) => {
    //检测是否有Token，只有在有值的情况才创建 Authorization 头
    const authorization = store.state.user.authorization
    if (authorization !== undefined && authorization !== null) {
        config.headers.Authorization = authorization
    }
    return config
})

//响应拦截器
http.interceptors.response.use(
    (response) => {
        return normalize(response)
    },
    (error) => {
        //如果是非响应错误
        if (!error.hasOwnProperty('response') || error.response === undefined) {
            throw error
        }
        //页面不存在、未登录、无权限直接抛出，其他的错误转给业务层处理
        const codes = [401, 403, 404]
        if (codes.indexOf(error.response.status) !== -1) {
            throw error
        }
        return normalize(error.response)
    },
)

/**
 * 标准化响应结构
 * @param {Object} response
 * @return {Object}
 */
function normalize(response) {
    response.isOk = response.status === 200
    if (typeof response.data === 'object') {
        response.isOk = isOk(response.data?.code)
        if (response.data?.msg !== undefined) {
            response.data.message = response.data.msg
            delete response.data.msg
        }
    }
    return response
}


/**
 * 从响应头中获取附件名称
 * @param {Object[]} headers 响应头
 * @return {string}
 */
export function getAttachmentName(headers) {
    const disposition = headers['Content-Disposition'] ?? headers['content-disposition']
    if (!disposition) {
        return '未命名'
    }
    const keyword = "filename*=utf-8''"
    const offset = disposition.indexOf(keyword)
    if (offset !== -1) {
        const name = disposition.substr(offset + keyword.length)
        return decodeURI(name)
    }
    const keyword2 = 'filename="'
    const offset2 = disposition.indexOf(keyword2)
    if (offset2 !== -1) {
        const name2 = disposition.substr(offset2 + keyword2.length, disposition.length - offset2 - keyword2.length - 1)
        return decodeURI(name2)
    }
    const keyword3 = 'filename='
    const offset3 = disposition.indexOf(keyword3)
    if (offset3 !== -1) {
        const name3 = disposition.substr(offset3 + keyword3.length)
        return decodeURI(name3)
    }
    return 'unknown'
}

export {
    http,
}
