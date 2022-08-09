<!--
功能：路由Tab切换器
日期：2022-02-23
-->
<template>
    <div class="route-tab-switcher-container">
        <transition-group name="tab-complete" tag="ul" class="tab-items">
            <li class="tab-item" :class="current!==null && item.fullPath===current.fullPath ? 'active' : null" v-for="(item,i) in routes" :key="item.fullPath" @click="tabItemClick(item)">
                <div class="item-name">{{ item.title }}</div>
                <div v-if="routes.length>1" class="item-close-btn" @click="closeBtnClick(i,$event)">
                    <i class="bi bi-x"></i>
                </div>
            </li>
        </transition-group>
    </div>
</template>

<script setup>

import {onMounted, ref, watch} from "vue"
import {useRoute, useRouter} from "vue-router"

const route = useRoute()
const router = useRouter()
const routes = ref([])
const current = ref(null)

/**
 * 观察路由，在变更的时候处理tab列表
 */
watch(route, (target) => {
    current.value = {
        title: target.meta.title,
        fullPath: target.fullPath
    }
    const index = routes.value.findIndex((item) => {
        return item.fullPath === target.fullPath
    })
    if (index === -1) {
        routes.value.push(current.value)
    }
})

/**
 * Tab点击
 * @param {RouteLocationNormalized} route 路由对象
 */
const tabItemClick = (route) => {
    router.push(route.fullPath)
}

/**
 * 关闭按钮点击
 * @param {int} index Tab索引
 * @param {PointerEvent} event 事件对象
 */
const closeBtnClick = (index, event) => {
    event.stopPropagation()
    const target = routes.value[index]
    routes.value.splice(index, 1)
    //如果删除的tab不是当前页面则直接返回不处理
    if (target.fullPath !== route.fullPath) {
        return
    }
    //如果后面还有tab则使用后面的tab
    if (routes.value.length > index) {
        current.value = routes.value[index]
        router.push(current.value.fullPath)
        return
    }
    //如果前面还有tab则使用前面的tab
    if (routes.value.length > (index - 1)) {
        current.value = routes.value[index - 1]
        router.push(current.value.fullPath)
    }
}

onMounted(() => {
    current.value = {
        title: route.meta.title,
        fullPath: route.fullPath
    }
    routes.value.push(current.value)
})


</script>
<style lang="scss" scoped>
.tab-complete-enter-from,
.tab-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.tab-complete-leave-active {
    position: absolute;
}

.route-tab-switcher-container {
    font-size: 12px;
    background: white;
    border-bottom: 1px solid #ddd;
    padding: 5px 5px 0 5px;
    position: relative;
}

.tab-items {
    list-style: none;
    display: flex;
    gap: 3px;


    .tab-item {
        flex: auto;
        min-width: 60px;
        max-width: 120px;
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: white;
        padding: 7px 10px;
        border-radius: 3px 3px 0 0;
        cursor: pointer;
        color: #777;
        border-width: 1px 1px 0 1px;
        border-style: solid;
        border-color: #efefef #efefef transparent #efefef;

        &:hover {
        }

        &.active {
            font-weight: bold;
            color: #2d8cf0;
            border-top: 1px solid #2d8cf0;
            background-image: linear-gradient(180deg, white 50%, #F4F5F7);
            position: relative;
            bottom: -1px;
            padding: 7px 10px 8px;
        }

        .item-name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: auto;
        }

        .item-close-btn {
            font-size: 12px;
            color: #ccc;

            &:hover {
                color: red;
            }
        }
    }
}
</style>
