<!--
功能：拖动
作者：tongwoo
日期：2022-06-07
变更：
    2022-06-07 增加边界处理
-->
<template>
    <div ref="dom" @mousedown="mouseDown">
        <slot></slot>
    </div>
</template>

<script setup>
import {reactive, ref, onMounted, onUnmounted} from "vue";

//DOM
const dom = ref(null);
//事件
const emits = defineEmits(['drag-start', 'drag-move', 'drag-stop']);
//属性
const props = defineProps({
    //是否按住空格键才能拖动
    holdSpace: {
        type: Boolean,
        default: false
    },
    //是否保持拖动的位置
    //true=持久化保存拖动的总距离，
    //false=每次移动都是新的距离，需要自行实现元素的绝对位置方法
    keep: {
        type: Boolean,
        default: true
    },
    //不能小于此属性的x方向最小位置
    xmin: {
        type: Number
    },
    //不能大于此属性的x方向最大位置
    xmax: {
        type: Number
    },
    //不能小于此属性的y方向最小位置
    ymin: {
        type: Number
    },
    //不能大于此属性的y方向最大位置
    ymax: {
        type: Number
    },
    //点击事件是否冒泡
    clickBubbles: {
        type: Boolean,
        default: true
    }
});

//位置
const position = reactive({
    x: 0,
    y: 0
});

//拖动距离
const distance = reactive({
    x: 0,
    y: 0
});

//是否正在按住空格
const holding = ref(false);

defineExpose({
    position
});

/**
 * 键盘按下
 */
const documentKeyDown = (e) => {
    holding.value = e.keyCode === 32;
};

/**
 * 键盘弹起
 */
const documentKeyUp = () => {
    holding.value = false;
};

onMounted(() => {
    document.addEventListener('keydown', documentKeyDown);
    document.addEventListener('keyup', documentKeyUp);
});

onUnmounted(() => {
    document.removeEventListener('keydown', documentKeyDown);
    document.removeEventListener('keyup', documentKeyUp);
});

/**
 * 鼠标按下
 * @param {MouseEvent} e 事件
 */
const mouseDown = (e) => {
    e.stopPropagation();
    if (props.keep) {
        distance.x = e.pageX - position.x;
        distance.y = e.pageY - position.y;
    } else {
        distance.x = e.pageX;
        distance.y = e.pageY;
    }
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', documentMouseMove);
    document.addEventListener('mouseup', documentMouseUp);
    emits('drag-start', distance);
};

/**
 * 鼠标移动
 * @param {MouseEvent} e 事件
 */
const documentMouseMove = (e) => {
    e.stopPropagation();
    if (props.holdSpace) {
        if (!holding.value) {
            return;
        }
    }
    let x, y;
    if (props.keep) {
        x = position.x = e.pageX - distance.x;
        y = position.y = e.pageY - distance.y;
        //限制仅在keep下生效
        if (props.xmin !== undefined && x < props.xmin) {
            x = props.xmin
        }
        if (props.xmax !== undefined && x > props.xmax - dom.value.offsetWidth) {
            x = props.xmax - dom.value.offsetWidth
        }
        if (props.ymin !== undefined && y < props.ymin) {
            y = props.ymin
        }
        if (props.ymax !== undefined && y > props.ymax - dom.value.offsetHeight) {
            y = props.ymax - dom.value.offsetHeight
        }
    } else {
        x = e.pageX - distance.x;
        y = e.pageY - distance.y;
    }
    emits('drag-move', {
        x,
        y
    });
};

/**
 * 鼠标松开
 * @param {MouseEvent} e 事件
 */
const documentMouseUp = (e) => {
    e.stopPropagation();
    document.body.style.removeProperty('user-select');
    document.removeEventListener('mousemove', documentMouseMove);
    document.removeEventListener('mouseup', documentMouseUp);
    emits('drag-stop');
};
</script>
