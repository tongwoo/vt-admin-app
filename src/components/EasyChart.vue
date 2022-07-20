<!--
功能：图表组件
日期：2022-03-09
变更：
     2022-04-17 模块切换图表消失问题、配置参数不使用合并行为
     2022-05-08 增加显示表格、下载图片功能
     2022-07-20 修复在使用其他类型series无法重置尺寸的问题
-->
<template>
    <div v-show="showTable===false" class="chart-container" ref="dom" :style="style"></div>
    <div v-show="showTable" class="chart-table" :style="style">
        <el-table border :size="table.size" row-key="id" :data="table.rows" :max-height="table.height">
            <el-table-column v-for="(column,i) in table.columns" :key="column+'-'+i" :label="column" :fixed="i===0" align="center" show-overflow-tooltip>
                <template v-slot="{row}">{{ row[i] }}</template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted, watch, onUnmounted, nextTick, computed} from "vue";
import * as echarts from "echarts";

//图表实例
let instance = null;
//图表父容器元素
let container = null;
//父容器观察器
let observer = null;
//图表挂载的DOM
const dom = ref(null);

//属性
const props = defineProps({
    //echarts配置对象
    option: {
        type: Object,
        default() {
            return {};
        },
    },
    //是否显示表格
    showTable: {
        type: Boolean,
        default: false,
    },
});

//样式
const style = computed(() => {
    return {
        top: position.top + 'px',
        right: position.right + 'px',
        bottom: position.bottom + 'px',
        left: position.left + 'px',
    }
});

//位置
const position = reactive({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
});

//表格
const table = reactive({
    size: 'small',
    columns: [],
    rows: [],
    height: null,
});

//在图表选项变化的时候更新图表
watch(
    () => props.option,
    (v) => {
        if (instance !== null) {
            renderChart();
        }
    },
    {
        deep: true,
    },
);

//显示表格监测
watch(
    () => props.showTable,
    (v) => {
        nextTick(() => {
            if (props.showTable) {
                updateTable();
            } else {
                instance.resize();
            }
        });
    },
);

/**
 * 渲染图表
 */
const renderChart = () => {
    instance.setOption(props.option, true);
    updateTable();
};

/**
 * 更新表格
 */
const updateTable = () => {
    table.height = container.clientHeight - position.top - position.bottom + 'px';
    //组装表格数据
    const option = instance.getOption();
    if (option.hasOwnProperty('xAxis') && option.xAxis[0]?.data) {
        table.columns = ['类型', ...option.xAxis[0].data];
    }
    table.rows.splice(0);
    option.series.forEach((item) => {
        if (item.type === 'pie') {
            table.columns = ['类型', '值'];
            table.rows = item.data.map((i) => {
                return [i.name, i.value];
            });
        } else if (item.type === 'line' || item.type === 'bar') {
            table.rows.push([item.name, ...item.data]);
        }
    });
};

/**
 * 下载为图片
 * @param {string} name 文件名
 */
const downloadAsImage = (name = '图表') => {
    const dataUrl = instance.getDataURL({
        type: 'png',
        excludeComponents: ['toolbox'],
    });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = name + '.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

defineExpose({
    instance,
    container,
    downloadAsImage,
});

onMounted(() => {
    container = dom.value.parentElement;
    if (!container) {
        throw new Error('没有找到父元素');
    }
    const style = window.getComputedStyle(container);
    //为了简单化，设置图表容器为绝对定位
    if (style.position === 'static') {
        container.style.position = 'relative';
    }
    //检查父元素有没有间距，有的话则修改定位
    position.top = parseInt(style.paddingTop);
    position.right = parseInt(style.paddingRight);
    position.bottom = parseInt(style.paddingBottom);
    position.left = parseInt(style.paddingLeft);
    nextTick(() => {
        //初始化图表
        instance = echarts.init(dom.value);
        renderChart();
        //尺寸自动处理
        observer = new ResizeObserver(() => {
            const option = {
                animation: {
                    duration: 1000,
                },
            };
            if (props.showTable) {
                updateTable();
            } else {
                instance.resize(option);
            }
        });
        observer.observe(container);
    });
});

onUnmounted(() => {
    observer.unobserve(container);
});
</script>

<style lang="scss" scoped>
.chart-container {
    position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.chart-table {
    position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>
