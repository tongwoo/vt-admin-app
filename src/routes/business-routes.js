import BaseLayout from "@/views/layouts/BaseLayout.vue"
import * as Permission from "@/constants/permission.js"

export default [
    {
        path: '/',
        component: BaseLayout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/Dashboard.vue'),
                meta: {
                    title: '仪表盘',
                    cache: true
                }
            }
        ]
    },
    {
        path: '/example',
        component: BaseLayout,
        meta: {
            title: '示例'
        },
        children: [
            {
                path: 'i18n',
                component: () => import('@/views/example/I18n.vue'),
                meta: {
                    title: '多语言'
                }
            },
            {
                path: 'chart',
                component: () => import('@/views/example/ChartGuide.vue'),
                meta: {
                    title: '图表示例',
                    cache: true
                }
            }
        ]
    },
    {
        path: '/setting',
        component: BaseLayout,
        redirect: '/setting/user',
        meta: {
            title: '系统设置'
        },
        children: [
            {
                path: 'user',
                component: () => import('@/views/user/UserList.vue'),
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: 'role',
                component: () => import('@/views/role/RoleList.vue'),
                meta: {
                    title: '角色管理'
                }
            },
            {
                path: 'permission',
                component: () => import('@/views/permission/PermissionList.vue'),
                meta: {
                    title: '权限管理'
                }
            },
            {
                path: 'route',
                component: () => import('@/views/route/RouteList.vue'),
                meta: {
                    title: '后台路由'
                }
            }
        ]
    }
]
