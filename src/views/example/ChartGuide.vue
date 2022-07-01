<!--
功能：图表示例
作者：tongwoo
日期：2022-02-22
-->
<template>
    <div class="page-container">
        <div class="page-segment">
            <div class="segment-header with-bordered">
                <div class="header-flex">
                    <div class="header-title">图表示例</div>
                    <div class="header-flexible"></div>
                    <div class="header-buttons">
                        <el-button type="primary" size="small" @click="show=!show"><i class="bi bi-table el-icon--left"></i>{{ show ? '隐藏表格' : '显示表格' }}</el-button>
                    </div>
                </div>
            </div>
            <div class="segment-body">
                <ul class="chart-items">
                    <li class="chart-item">
                        <easy-chart :option="BaseLine" :show-table="show"></easy-chart>
                    </li>
                    <li class="chart-item">
                        <easy-chart :option="BaseBar" :show-table="show"></easy-chart>
                    </li>
                    <li class="chart-item">
                        <easy-chart :option="BasePie" :show-table="show"></easy-chart>
                    </li>
                    <li class="chart-item">
                        <easy-chart :option="BaseRadar"></easy-chart>
                    </li>
                    <li class="chart-item">
                        <easy-chart :option="BaseLinearBar" :show-table="show"></easy-chart>
                    </li>
                    <li class="chart-item">
                        <easy-chart :option="BaseComplexPie" :show-table="show"></easy-chart>
                    </li>
                    <li class="chart-item">
                        <easy-chart :option="BaseScatter"></easy-chart>
                    </li>
                    <li class="chart-item">
                        <easy-chart :option="BaseComplexLine" :show-table="show"></easy-chart>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import EasyChart from "@/components/EasyChart.vue";
import BaseLine from "@/charts/examples/BaseLine.js";
import BaseBar from "@/charts/examples/BaseBar.js";
import BasePie from "@/charts/examples/BasePie.js";
import BaseLinearBar from "@/charts/examples/BaseLinearBar.js";
import BaseComplexPie from "@/charts/examples/BaseComplexPie.js";
import BaseRadar from "@/charts/examples/BaseRadar.js";
import BaseScatter from "@/charts/examples/BaseScatter.js";
import BaseComplexLine from "@/charts/examples/BaseComplexLine.js";
import {ref} from "vue";

const show = ref(false);
</script>
<style lang="scss" scoped>
.chart-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 10px;
    height: calc(100vh - 200px);
    list-style: none;
    margin: 0;
    padding: 0;

    .chart-item {
        border: 1px solid #eee;
        padding: 5px;

        &:last-child {
            grid-column: 2/4;
        }
    }
}
</style>
