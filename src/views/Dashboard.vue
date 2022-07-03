<!--
功能：首页
日期：2022-03-04
-->
<template>
    <div class="page-container">
        <div class="page-segment">
            <div class="segment-body">
                <ul class="total-items">
                    <li class="total-item">
                        <div class="label">总用户数</div>
                        <div class="value">
                            <div class="number">3234</div>
                            <div class="flow"></div>
                            <div class="percent up">2%</div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">新用户数</div>
                        <div class="value">
                            <div class="number">56</div>
                            <div class="flow"></div>
                            <div class="percent up">8%</div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">昨日销售额</div>
                        <div class="value">
                            <div class="number">39123</div>
                            <div class="flow"></div>
                            <div class="percent up">3%</div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">今日销售额</div>
                        <div class="value">
                            <div class="number">49051</div>
                            <div class="flow"></div>
                            <div class="percent up">5%</div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">用户在线时长</div>
                        <div class="value">
                            <div class="number">39103</div>
                            <div class="flow"></div>
                            <div class="percent up">32%</div>
                        </div>
                    </li>
                    <li class="separator"></li>
                    <li class="total-item">
                        <div class="label">用户活跃程度</div>
                        <div class="value">
                            <div class="number">234</div>
                            <div class="flow"></div>
                            <div class="percent up">3%</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.total-items {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;

    .separator{
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

            .number {
                font-size: 20px;
                font-weight: bold;
                color: #65768b;
            }

            .percent {
                font-size: 14px;
                font-weight: bold;

                &.up {
                    color: #2f71eb;
                }

                &.down {
                    color: red;
                }
            }
        }
    }
}
</style>
