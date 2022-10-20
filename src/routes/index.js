import nprogress from 'nprogress'
import {createRouter, createWebHashHistory} from 'vue-router'
import setting from "@/setting.js"
import {checkAccess} from "@/utils/authorize.js"
import store from '@/store/index.js'
import baseRoutes from "@/routes/base-routes.js"
import businessRoutes from "@/routes/business-routes.js"

/**
 * 路由
 */
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...baseRoutes,
        ...businessRoutes,
    ],
})


//前置守卫 - 进度条开始
router.beforeEach(() => {
    if (setting.showProgress) {
        nprogress.start()
    }
    return true
})

//前置守卫 - 恢复本地数据
router.beforeEach(() => {
    if (store.state.synced) {
        return true
    }
    store.commit('localSync')
    return true
})

//前置守卫 - 没有找到路由
router.beforeEach((to) => {
    if (to.matched.length === 0) {
        return {
            path: '/error/not-found',
        }
    }
    return true
})

//前置守卫 - 检测是否登录和权限
router.beforeEach((to) => {
    if (!setting.auth.enable) {
        return true
    }
    const meta = to.meta
    //前往的路由明确不需要授权检查直接通过
    if (meta?.auth === false) {
        return true
    }
    //没有认证信息
    if (store.state.user.authorization === null) {
        return {
            path: '/login',
        }
    }
    //路由是否需要权限
    const permission = to.meta?.permission
    if (permission === null || permission === undefined) {
        return true
    }
    //检测路由权限，检测方式为读取路由的 meta.permission 是否在绑定的权限列表中存在
    //如果没有权限则跳转到无权限的提示页面
    if (!checkAccess(permission)) {
        return {
            path: '/error/forbidden',
        }
    }
    return true
})

//后置守卫 - 缓存组件，检查路由meta是否有cache属性，如果有且为true则进行缓存
router.afterEach((to) => {
    const cache = to?.meta?.cache
    if (cache) {
        const name = to.matched[to.matched.length - 1].components.default.__name
        if (name) {
            store.commit('keepalive/add', name)
        }
    }
    return true
})

//后置守卫 - 设置页面标题
router.afterEach((to) => {
    document.title = to.meta?.title ? to.meta.title + ' - ' + setting.name : setting.name
})

//后置守卫 - 进度条关闭
router.afterEach(() => {
    if (setting.showProgress) {
        nprogress.done()
    }
})

export default router
