import {ElMessage as message, ElMessageBox as messageBox} from "element-plus"
import router from "@/routes/index.js"

/**
 * HTTP错误处理
 * @param error axios错误对象
 */
function httpErrorHandler(error) {
    if (error.hasOwnProperty('response') && error.response !== undefined) {
        if (error.response.status === 500) {
            message.error('服务器异常')
        } else if (error.response.status === 404) {
            message.error('页面不存在')
        } else if (error.response.status === 403) {
            if (document.querySelector('.is-message-box') !== null) {
                return
            }
            messageBox.confirm('没有权限，是否重新登录？', '提示', {
                type: 'warning',
                confirmButtonText: '重新登录',
                cancelButtonText: '否'
            }).then(() => {
                router.replace('/login')
            }).catch(() => {
                //...
            })
        } else if (error.response.status === 401) {
            if (document.querySelector('.is-message-box') !== null) {
                return
            }
            messageBox.confirm('登录凭证已经过期，是否重新登录？', '提示', {
                type: 'warning',
                confirmButtonText: '重新登录',
                cancelButtonText: '否'
            }).then(() => {
                router.replace('/login')
            }).catch(() => {
                //...
            })
        }
    } else if (error.hasOwnProperty('message') && error.message !== undefined) {
        message.error(error.message)
    } else {
        message.error('网络繁忙，请稍后重试')
    }
}

export {
    httpErrorHandler
}
