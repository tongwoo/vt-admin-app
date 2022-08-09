import {AUTH_STORAGE_LOCAL} from '@/constants/auth-storage.js'

export default {
    //系统名称
    name: 'VT-ADMIN',
    //认证&授权相关
    auth: {
        //启用认证
        enable: true,
        //授权存储方式 本地存储=localstorage Cookie存储=cookie
        storageMethod: AUTH_STORAGE_LOCAL
    },
    //分页相关
    pagination: {
        //每页记录数
        size: 10
    }
}
