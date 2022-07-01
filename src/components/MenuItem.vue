<!--
功能：用于无限菜单的菜单项，父组件用 el-menu 包裹
日期：2021-12-16
-->
<template>
    <el-menu-item v-if="item.children === null || item.children.length === 0" :index="item.path">
        <el-icon v-if="item.icon !== null" :class="item.icon"></el-icon>
        <template #title>
            {{ item.name }}
        </template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.path">
        <template #title>
            <el-icon v-if="item.icon !== null" :class="item.icon"></el-icon>
            <span>{{ item.name }}</span>
        </template>
        <menu-item v-for="(menu) in item.children" :key="menu.name" :item="menu"></menu-item>
    </el-sub-menu>
</template>

<script setup>
const props = defineProps({
    /**
     * 菜单项，其中 name 要跟路由的name保持一致，permission 为需要的权限
     * @type {{
     *     name:string,
     *     show:boolean,
     *     icon:string|null,
     *     identify:string,
     *     permission:string|null,
     *     children:Array
     * }}
     */
    item: Object
});
</script>

<style lang="scss" scoped>

</style>
