import http from '@/utils/http.js'

/**
 * 提交登录
 * @param {Object} model 登录模型
 * @returns {Promise<{success:boolean,message:string,data:Object}>}
 */
export function requestLogin(model) {
    return http.post(
        '/login',
        model,
    ).then((response) => {
        const body = response.data
        return {
            success: response.isOk,
            message: body.message,
            data: body.data,
        }
    })
}

/**
 * 获取用户信息
 * @returns {Promise<{success:boolean,message:string,data:Object}>}
 */
export function fetchProfile() {
    return http.post(
        '/user/info',
        model,
    ).then((response) => {
        const body = response.data
        return {
            success: response.isOk,
            message: body.message,
            data: body.data,
        }
    })
}
