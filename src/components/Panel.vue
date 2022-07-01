<!--
功能：面板
日期：2022-04-19
-->
<template>
    <div class="sn-panel" :class="panelClass">
        <div v-if="props.title!==null" class="sn-panel-header" :class="headerClass">
            <div class="header-title" :class="props.type+'-header-title'">{{ title }}</div>
            <div class="header-content" :class="props.type+'-header-content'">
                <slot name="header"></slot>
            </div>
        </div>
        <div class="sn-panel-body" :class="bodyClass">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, computed} from "vue";

//属性
const props = defineProps({
    //面板类型
    type: {
        type: String,
        default: 'default',
        validator(value) {
            //可选面板类型
            const types = [
                //默认
                'default',
                //暗黑
                'dark',
            ];
            return types.indexOf(value) !== -1;
        }
    },
    //标题
    title: {
        type: String,
        default: null
    },
    //body是否自动撑满
    stretch: {
        type: Boolean,
        default: false
    },
    //头部区域垂直对齐方式
    headerAlign: {
        type: Boolean,
        default: false
    }
});

/**
 * 面板Class
 * @type {string}
 */
const panelClass = computed(() => {
    const className = [];
    className.push(props.type + '-panel');
    return className.join(' ');
});

/**
 * 头部Class
 * @type {string}
 */
const headerClass = computed(() => {
    const className = [];
    className.push(props.type + '-header');
    console.info(props.headerAlign)
    if (props.headerAlign) {
        className.push('header-center');
    }
    return className.join(' ');
});

/**
 * 内容部分Class
 * @type {string}
 */
const bodyClass = computed(() => {
    const className = [];
    className.push(props.type + '-body');
    if (props.stretch) {
        className.push('with-stretch');
    }
    return className.join(' ');
});
</script>

<style lang="scss" scoped>
.sn-panel {
    display: flex;
    flex-direction: column;

    .sn-panel-header {
        display: flex;
        flex: none;
        gap: 10px;

        &.header-center {
            align-items: center;
        }

        .header-title {
            flex: none;
        }

        .header-content {
            display: flex;
            align-items: center;
            justify-content: right;
            flex: auto;
        }
    }

    .sn-panel-body {
        flex: auto;

        &.body-stretch {
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
        }
    }
}

.default-panel {
    padding: 15px;
    background-color: white;

    .default-header {
        padding: 0 0 10px 0;
        margin-bottom: 10px;
        border-bottom: 1px solid #eee;

        .default-header-title {
            font-weight: bold;
            font-size: 14px;
            color: #333;

            &:before {
                content: '';
                width: 3px;
                height: 14px;
                background-color: #0b64ad;
                display: inline-block;
                margin-right: 5px;
                position: relative;
                top: 2px;
            }

        }
    }

    .default-body {

    }
}
</style>
