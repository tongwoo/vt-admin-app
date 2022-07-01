<!--
功能：缩放容器
日期：2022-05-20
说明：放入此组件
-->
<template>
    <div class="scale-container" ref="container">
        <slot></slot>
    </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from "vue";

//容器
const container = ref(null);

//监听器
let observer = null;

//属性
const props = defineProps({
    //内容宽度
    width: Number,
    //内容高度
    height: Number,
    //缩放到多少，默认为1，即缩放到容器尺寸的100%
    percent: {
        type: Number,
        default: 1
    }
});

onMounted(() => {
    const parent = container.value.parentElement;
    observer = new ResizeObserver(() => {
        const width = parent.offsetWidth / props.width;
        const height = parent.offsetHeight / props.height;
        const scale = Math.min(width, height) * props.percent;
        container.value.style.transform = `scale(${scale})`;
    });
    observer.observe(parent);
});

onUnmounted(() => {
    observer.disconnect();
});
</script>

<style lang="scss" scoped>
.scale-container {
    transition: all .3s;
    transform-origin: center center;
}
</style>
