/**
 * 菜单
 */
import {checkAccess} from "@/common/utils/authorize.js";

/**
 * 获取左侧导航菜单
 * @return {Array<{name:string,path:string,icon:string,show:boolean,permission:string|null,children:Array}>}
 */
function fetchNavigateMenus() {
    return [
        {
            name: '首页',
            path: '/dashboard',
            icon: 'bi bi-house-fill',
            show: true,
        },
        {
            name: '编辑器示例',
            path: '/example/editor',
            icon: 'bi bi-pencil',
            show: true,
            permission: null,
            children: [],
        },
        {
            name: '多语言示例',
            path: '/example/i18n',
            icon: 'bi bi-translate',
            show: true,
            permission: null,
            children: [],
        },
        {
            name: '图表示例',
            path: '/example/chart',
            icon: 'bi bi-bar-chart',
            show: true,
            permission: null,
            children: [],
        },
        {
            name: '系统管理',
            path: '/settlement',
            icon: 'bi bi-gear-fill',
            show: true,
            permission: null,
            children: [
                {
                    name: '用户管理',
                    path: '/setting/user',
                    icon: 'bi bi-people-fill',
                    show: true,
                    permission: null,
                    children: [],
                },
                {
                    name: '角色管理',
                    path: '/setting/role',
                    icon: 'bi bi-person-check-fill',
                    show: true,
                    permission: null,
                    children: [],
                },
                {
                    name: '权限管理',
                    path: '/setting/permission',
                    icon: 'bi bi-card-list',
                    show: true,
                    permission: null,
                    children: [],
                },
                {
                    name: '后台路由',
                    path: '/setting/route',
                    icon: 'bi bi-diagram-3',
                    show: true,
                    permission: null,
                    children: [],
                },
            ],
        },
    ];
}

/**
 * 提取已授权的菜单列表
 * @param {Array} menus 菜单列表
 * @return {Array}
 */
function fetchMenus(menus) {
    const items = [];
    for (let menu of menus) {
        let item = null;
        if (menu.hasOwnProperty('permission') && menu.permission !== null) {
            if (checkAccess(menu.permission)) {
                item = menu;
            }
        } else {
            item = menu;
        }
        if (item !== null) {
            if (menu.hasOwnProperty('children') && menu.children.length > 0) {
                item.children = fetchMenus(menu.children);
            } else {
                item.children = [];
            }
            items.push(item);
        }
    }
    return items;
}

export {
    fetchNavigateMenus,
    fetchMenus,
}
