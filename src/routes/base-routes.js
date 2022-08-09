import BaseLayout from "@/views/layouts/BaseLayout.vue"

export default [
    {
        path: '/login',
        component: () => import('@/views/UserLogin.vue'),
        meta: {
            title: '登录',
            auth: false
        }
    },
    {
        path: '/error',
        component: BaseLayout,
        meta: {
            title: '异常'
        },
        children: [
            {
                path: 'forbidden',
                component: () => import('@/views/error/Forbidden.vue'),
                meta: {
                    title: '无权限',
                    auth: false
                }
            },
            {
                path: 'not-found',
                component: () => import('@/views/error/NotFound.vue'),
                meta: {
                    title: '页面不存在',
                    auth: false
                }
            }
        ]
    }
]
