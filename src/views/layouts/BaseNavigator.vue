<!--
功能：左侧菜单导航
作者：tongwoo
日期：2021-12-14
-->
<template>
    <div class="base-navigator" :class="isCollapsed ? 'base-navigator-collapse' : null" :style="navigatorWidth">
        <virtual-drag v-if="!isCollapsed" :keep="false" class="navigator-drag" @drag-start="dragStart" @drag-move="dragMove" @drag-stop="dragStop"></virtual-drag>
        <!--用户面板-->
        <div class="user-panel">
            <div class="user-logo">
                <img :src="store.state.user.avatar" @error="avatarError">
            </div>
            <div class="user-name" v-show="!isCollapsed">
                {{ store.state.user.nickname }}
            </div>
        </div>
        <!--菜单-->
        <el-scrollbar>
            <el-menu :router="true" :unique-opened="true" :collapse="isCollapsed" :collapse-transition="false" :default-active="route.path">
                <menu-item v-for="(menu,i) in menus" :key="menu.name" :item="menu"></menu-item>
            </el-menu>
        </el-scrollbar>
        <!--折叠-->
        <div class="collapse-button" @click="toggleNavigatorBtnClick">
            <transition name="el-fade-in" mode="out-in">
                <span v-if="isCollapsed"><i class="bi bi-chevron-double-right"></i></span>
                <span v-else><i class="bi bi-chevron-double-left"></i>收起侧边栏</span>
            </transition>
        </div>
    </div>
</template>

<script setup>
import {computed, reactive, ref} from "vue"
import {useStore} from "vuex"
import {fetchMenus, fetchNavigateMenus} from '@/data/navigate-menu.js'
import MenuItem from '@/components/MenuItem.vue'
import {useRoute} from "vue-router"
import VirtualDrag from "@/components/VirtualDrag.vue"
import defaultAvatar from "@/assets/images/icons/avatar-default.png"

const store = useStore()
const route = useRoute()

//菜单列表
const menus = fetchMenus(fetchNavigateMenus())

//菜单是否折叠
const isCollapsed = computed(() => {
    return store.state.setting.navigator.collapse
})

/**
 * 头像加载失败
 */
const avatarError = (error) => {
    error.target.src = defaultAvatar
}

/**
 * 导航切换按钮点击
 */
const toggleNavigatorBtnClick = () => {
    store.commit('setting/toggleNavigator')
}

/**
 * 导航宽度
 */
const navigatorWidth = computed(() => {
    if (
        store.state.setting.navigator.width.current === null ||
        store.state.setting.navigator.collapse
    ) {
        return null
    }
    return {
        width: store.state.setting.navigator.width.current + 'px'
    }
})

//导航尺寸
const navigatorSize = ref(0)

/**
 * 拖动开始
 */
const dragStart = () => {
    const wrapper = document.querySelector('.base-navigator')
    wrapper.style.transition = 'none'
    document.querySelector('.header-title').style.transition = 'none'
    navigatorSize.value = wrapper.offsetWidth
}


/**
 * 拖动中
 * @param {x:number,y:number} offset 偏移位置
 */
const dragMove = (offset) => {
    let newWidth = navigatorSize.value + offset.x
    if (newWidth >= store.state.setting.navigator.width.max) {
        newWidth = store.state.setting.navigator.width.max
    } else if (newWidth <= store.state.setting.navigator.width.min) {
        newWidth = store.state.setting.navigator.width.min
    }
    store.commit('setting/updateWidth', newWidth)
}

/**
 * 拖动结束
 */
const dragStop = () => {
    document.querySelector('.base-navigator').style.removeProperty('transition')
    document.querySelector('.header-title').style.removeProperty('transition')
}
</script>

<style lang="scss" scoped>
.base-navigator {
    position: fixed;
    top: var(--base-header-height);
    left: 0;
    bottom: 0;
    width: var(--base-navigator-width);
    background-color: var(--base-navigator-bg-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all .3s;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, .06);
    z-index: 1001;
    user-select: none;

    &.base-navigator-collapse {
        width: var(--base-navigator-collapse-width);

        :deep(.el-menu) {
            --el-menu-base-level-padding: 20px;
        }
    }

    .collapse-bar {
        text-align: center;
    }

    :deep(.el-menu) {
        --el-menu-base-level-padding: 35px;
        border-right: 0 none;

        .is-active {
            //background-color: black;
        }
    }

    :deep(.el-menu) {
        --el-menu-bg-color: 'white'
    }

    .navigator-drag {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 5px;
        z-index: 1100;
        cursor: ew-resize;
    }

    .collapse-button {
        cursor: pointer;
        user-select: none;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding: 15px 20px;
        color: rgba(255, 255, 255, 0.78);
        font-size: 14px;
        white-space: nowrap;

        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .bi {
            margin-right: 5px;
        }
    }
}

.user-panel {
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .user-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .3s;

        img {
            max-width: 70px;
            border-radius: 50%;
            width: 100%;
            border: 1px solid rgba(0, 0, 0, 0.5);
            box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.5);
            box-sizing: border-box;
        }

        &.user-logo-collapse {
            img {
                width: 0;
            }
        }
    }

    .user-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        color: #5198F8;
        margin-top: 20px;
    }

}
</style>
