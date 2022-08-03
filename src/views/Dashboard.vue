<!--
功能：首页
日期：2022-03-04
-->
<template>
    <div class="page-container">
        <div class="page-segment summary-head mb-0">
            <div class="segment-body">
                <ul class="total-items">
                    <li class="total-item">
                        <div class="label">总用户数</div>
                        <div class="value up">
                            <div class="number">
                                <count-up :model-value="15434"></count-up>
                            </div>
                            <div class="flow">
                                <i class="bi bi-graph-up-arrow"></i>
                            </div>
                            <div class="percent">2%</div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">新用户数</div>
                        <div class="value up">
                            <div class="number">
                                <count-up :model-value="34"></count-up>
                            </div>
                            <div class="flow">
                                <i class="bi bi-graph-up-arrow"></i>
                            </div>
                            <div class="percent">8%</div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">昨日销售额</div>
                        <div class="value">
                            <div class="number">
                                <count-up :model-value="12324"></count-up>
                            </div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">今日销售额</div>
                        <div class="value down">
                            <div class="number">
                                <count-up :model-value="35343"></count-up>
                            </div>
                            <div class="flow">
                                <i class="bi bi-graph-down-arrow"></i>
                            </div>
                            <div class="percent">5%</div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">用户在线时长</div>
                        <div class="value up">
                            <div class="number">
                                <count-up :model-value="23434"></count-up>
                            </div>
                            <div class="flow">
                                <i class="bi bi-graph-down-arrow"></i>
                            </div>
                            <div class="percent">32%</div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">用户活跃程度</div>
                        <div class="value">
                            <div class="number">
                                <count-up :model-value="3214"></count-up>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="page-segment">
            <div class="segment-body">
                <ul class="total-items">
                    <li class="total-item">
                        <div class="label">昨日销售额</div>
                        <div class="value">
                            <div class="number">
                                <count-up :model-value="23124"></count-up>
                            </div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">今日销售额</div>
                        <div class="value down">
                            <div class="number">
                                <count-up :model-value="13124"></count-up>
                            </div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">用户在线时长</div>
                        <div class="value up">
                            <div class="number">
                                <count-up :model-value="3434"></count-up>
                            </div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">用户活跃程度</div>
                        <div class="value">
                            <div class="number">
                                <count-up :model-value="23234"></count-up>
                            </div>
                        </div>
                    </li>
                </ul>
                <div style="height: 250px">
                    <easy-chart :option="DashboardUserLine"></easy-chart>
                </div>
            </div>
        </div>
        <div class="page-segment">
            <div class="segment-body">
                <ul class="total-items">
                    <li class="total-item">
                        <div class="label">昨日销售额</div>
                        <div class="value">
                            <div class="number">39123</div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">今日销售额</div>
                        <div class="value down">
                            <div class="number">49051</div>
                        </div>
                    </li>
                </ul>
                <div style="height: 250px">
                    <easy-chart :option="DashboardSeasonLine"></easy-chart>
                </div>
            </div>
        </div>
        <div class="page-segment">
            <div class="segment-header with-bordered">
                <div class="header-title">用户进度</div>
            </div>
            <div class="segment-body">
                <ul class="user-items">
                    <li class="user-item">
                        <div class="info">
                            <div class="name">冯诺依曼</div>
                            <div class="percent">99%</div>
                        </div>
                        <div class="progress">
                            <el-progress :percentage="99" :format="percentFormat"></el-progress>
                        </div>
                    </li>
                    <li class="user-item">
                        <div class="info">
                            <div class="name">图灵</div>
                            <div class="percent">88%</div>
                        </div>
                        <div class="progress">
                            <el-progress :percentage="88" :format="percentFormat"></el-progress>
                        </div>
                    </li>
                    <li class="user-item">
                        <div class="info">
                            <div class="name">爱因斯坦</div>
                            <div class="percent">78%</div>
                        </div>
                        <div class="progress">
                            <el-progress :percentage="78" :format="percentFormat"></el-progress>
                        </div>
                    </li>
                    <li class="user-item">
                        <div class="info">
                            <div class="name">福尔摩斯</div>
                            <div class="percent">55%</div>
                        </div>
                        <div class="progress">
                            <el-progress :percentage="55" :format="percentFormat"></el-progress>
                        </div>
                    </li>
                    <li class="user-item">
                        <div class="info">
                            <div class="name">张麻子</div>
                            <div class="percent">75%</div>
                        </div>
                        <div class="progress">
                            <el-progress :percentage="75" :format="percentFormat"></el-progress>
                        </div>
                    </li>
                    <li class="user-item">
                        <div class="info">
                            <div class="name">黄四郎</div>
                            <div class="percent">33%</div>
                        </div>
                        <div class="progress">
                            <el-progress :percentage="33" :format="percentFormat"></el-progress>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="page-segment order-latest">
            <div class="segment-header with-bordered">
                <div class="header-flex">
                    <div class="header-title">订单记录</div>
                    <div class="header-flexible"></div>
                    <div class="header-buttons">
                        <el-button type="primary" size="small">查看更多</el-button>
                    </div>
                </div>
            </div>
            <div class="segment-body">
                <div class="data-container">
                    <div class="data-table">
                        <el-table border size="small" row-key="id" :data="orders">
                            <el-table-column prop="no" label="订单号" align="center" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="user" label="用户" align="center" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="name" label="商品名称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="price" label="单价" align="center" min-width="100" show-overflow-tooltip>
                                <template v-slot="{row}">
                                    <span class="amount">{{ row.price }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="number" label="数量" align="center" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="time" label="下单时间" align="center" min-width="160" show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-segment user-where">
            <div class="segment-header with-bordered">
                <div class="header-flex">
                    <div class="header-title">用户分布</div>
                    <div class="header-flexible"></div>
                    <div class="header-buttons">
                        <el-button type="primary" size="small">查看更多</el-button>
                    </div>
                </div>
            </div>
            <div class="segment-body">
                <div style="height: 330px">
                    <easy-chart :option="DashboardUserWherePie"></easy-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import EasyChart from "@/components/EasyChart";
import DashboardUserLine from "@/charts/examples/DashboardUserLine";
import DashboardSeasonLine from "@/charts/examples/DashboardSeasonLine";
import DashboardUserWherePie from "../charts/examples/DashboardUserWherePie";
import moment from "moment";
import OptionalText from '@/components/OptionalText.vue';
import {ref} from 'vue';
import CountUp from '@/components/CountUp.vue';

const testNumber = ref(3333);

/**
 * 百分比格式化
 */
const percentFormat = () => {
    return '';
};

//订单
const orders = [...new Array(8)].map((item) => {
    return {
        no: moment().format('YYYYMMDD') + Math.ceil(Math.random() * 100000),
        user: '东哥',
        name: 'PlayStation 5 耳机套装',
        price: (Math.random() * 1000).toFixed(2),
        number: Math.ceil(Math.random() * 10),
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
})
</script>

<style lang="scss" scoped>
.page-container {
    display: grid;
    grid-template-columns: 3fr 3fr 2fr;
    grid-template-rows: auto auto auto;
    grid-gap: 10px;

    .page-segment {
        margin-bottom: 0;
    }

    .summary-head {
        grid-column: 1/4;
    }

    .order-latest {
        grid-column: 1/3;
    }

    .user-where {
        grid-column: 3/4;
    }
}

.total-items {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;

    .separator {
        border-right: 1px solid #eee;
    }

    .total-item {

        &:last-child {
            border-right: 0 none;
        }

        .label {
            color: #a4acc4;
            font-size: 12px;
            margin-bottom: 10px;
        }

        .value {
            display: flex;
            gap: 20px;
            align-items: center;


            &.up {
                color: #12b252;
            }

            &.down {
                color: red;
            }

            .number {
                font-family: din;
                font-size: 20px;
                font-weight: bold;
                color: #2f3a47;
            }

            .flow {
                font-size: 12px;
            }

            .percent {
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
}

.user-items {
    margin: 0;
    padding: 10px;

    .user-item {
        margin-bottom: 15px;

        &:last-child {
            margin-bottom: 0;
        }

        .info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: #5F6364;
        }

        .progress {
            margin-top: 8px;

            :deep(.el-progress__text) {
                flex: none;
                min-width: auto;
            }
        }
    }
}

.amount {
    font-family: din;
    font-weight: bold
}
</style>
