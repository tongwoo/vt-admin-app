<!--
功能：基本布局
日期：2021-12-06
-->
<template>
    <div ref="baseLayout" class="base-layout" :class="navigatorShow ? null : 'base-layout-collapse'">
        <!--头部-->
        <base-header></base-header>
        <!--左侧导航-->
        <base-navigator></base-navigator>
        <div class="base-content" :style="paddingLeft">
            <!--路由Tab切换，不需要请删除此Div-->
            <div class="route-tab-bar">
                <route-tab-switcher></route-tab-switcher>
            </div>
            <router-view v-slot="{ Component, route }">
                <transition name="el-fade-in" mode="out-in">
                    <keep-alive :include="keepAliveComponents">
                        <component ref="viewComponent" v-if="!reload" :is="Component" :key="route.fullPath"></component>
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>
import {computed, defineAsyncComponent, nextTick, onMounted, onUnmounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import mitter from "@/common/utils/mitter.js";

import RouteTabSwitcher from "@/components/RouteTabSwitcher.vue";

//顶栏
const BaseHeader = defineAsyncComponent(() => import('./BaseHeader.vue'));
//侧边栏导航
const BaseNavigator = defineAsyncComponent(() => import('./BaseNavigator.vue'));

const store = useStore();
const route = useRoute();

//当前路由对应的组件
const viewComponent = ref(null);

/**
 * 导航菜单是否显示
 */
const navigatorShow = computed(() => {
    return !store.state.setting.navigator.collapse;
});

/**
 * 导航间距
 */
const paddingLeft = computed(() => {
    if (
        store.state.setting.navigator.width.current === null ||
        store.state.setting.navigator.collapse
    ) {
        return null;
    }
    return {
        paddingLeft: store.state.setting.navigator.width.current + 'px'
    };
});

/**
 * 要缓存的组件名称列表，前提是路由 meta 中存在 cache
 */
const keepAliveComponents = computed(() => {
    return store.state.keepalive.componentNames;
});

//检测布局大小设置菜单的显示
const baseLayout = ref(null);
let observer = null;
onMounted(() => {
    observer = new ResizeObserver(() => {
        if (baseLayout.value.clientWidth <= store.state.setting.navigator.size) {
            store.commit('setting/TOGGLE_NAVIGATOR', true);
        }
    });
    observer.observe(baseLayout.value);
});
onUnmounted(() => {
    observer.disconnect();
});

//页面刷新处理
const reload = ref(false);
onMounted(() => {
    mitter.on('page-refresh', () => {
        const matchedName = route.matched[route.matched.length - 1].components.default.__name;
        store.commit('keepalive/REMOVE', matchedName);
        reload.value = true;
        nextTick(() => {
            reload.value = false;
            if (route?.meta?.cache) {
                store.commit('keepalive/ADD', matchedName);
            }
        });
    });
});
onUnmounted(() => {
    mitter.off('page-refresh');
});
</script>

<style lang="scss" scoped>
.base-layout {
    min-height: 100vh;
    background-color: #f4f5f7;

    &.base-layout-collapse {
        .route-tab-bar {
            left: var(--base-navigator-collapse-width);
        }

        .base-content {
            padding-left: var(--base-navigator-collapse-width);
        }
    }

    .route-tab-bar {
        transition: all .3s;
    }

    .base-content {
        padding-left: var(--base-navigator-width);;
        padding-top: var(--base-header-height);
        transition: all .3s;
    }

    .water-mask {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2000;
        pointer-events: none;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;

        > ul {
            display: flex;
            gap: 120px;
            flex-wrap: wrap;

            > li {
                color: rgba(59, 34, 34, 0.1);
                font-size: 14px;
                font-weight: bold;
                transform: rotateZ(-45deg);
            }
        }
    }
}
</style>
