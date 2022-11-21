<!--用户-->
<template>
    <div class="page-container">
        <div class="page-segment">
            <div class="segment-header with-bordered">
                <div class="header-title">查询</div>
            </div>
            <div class="segment-body">
                <div class="query-container">
                    <div class="form-container margin-none">
                        <el-form size="default" inline @submit.prevent>
                            <el-form-item label="用户名">
                                <el-input v-model="query.username" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="登录密码">
                                <el-input v-model="query.password" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <el-input v-model="query.name" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="头像">
                                <el-input v-model="query.avatar" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-select v-model="query.state" class="el-select-long">
                                    <el-option v-for="(item,i) in states" :key="i" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="上次登录时间">
                                <el-input v-model="query.loginTime" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitQuery" native-type="submit"><i class="bi bi-search el-icon--left"></i>查询</el-button>
                                <el-button type="default" @click="resetQuery"><i class="bi bi-arrow-clockwise el-icon--left"></i>重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-segment">
            <div class="segment-header with-bordered">
                <div class="header-flex">
                    <div class="header-title">用户列表</div>
                    <div class="header-flexible"></div>
                    <div class="header-buttons">
                        <el-button type="primary" size="default" @click="createBtnClick"><i class="bi bi-plus-lg el-icon--left"></i>新增</el-button>
                        <el-button type="danger" size="default" @click="batchRemoveBtnClick"><i class="bi bi-trash el-icon--left"></i>删除</el-button>
                    </div>
                </div>
            </div>
            <div class="segment-body">
                <!--数据列表-->
                <div class="data-container">
                    <div class="data-table">
                        <el-table border stripe size="small" row-key="id" :ref="record.table" :data="record.items" v-loading="record.loading" @selection-change="selectionChange">
                            <el-table-column type="selection" fixed="left" align="center"></el-table-column>
                            <el-table-column type="index" fixed="left" label="序号" align="center"></el-table-column>
                            <el-table-column prop="username" label="用户名" align="center" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="password" label="登录密码" align="center" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="name" label="姓名" align="center" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="avatar" label="头像" align="center" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="stateName" label="状态" align="center" min-width="100" show-overflow-tooltip>
                                <template v-slot="{row}">
                                    <div  :class="row.stateClass">{{ row.stateName }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="loginTime" label="上次登录时间" align="center" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column fixed="right" label="操作" width="140" align="center">
                                <template v-slot="{row}">
                                    <div class="table-operation">
                                        <el-button type="primary" size="small" text bg @click="modifyBtnClick(row)">修改</el-button>
                                        <el-button type="danger" size="small" text bg @click="removeBtnClick(row)">删除</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!--数据分页-->
                <div class="pagination-container">
                    <el-pagination v-model:page-size="record.size" v-model:current-page="query.page" :total="record.total" @current-change="pageChange" background></el-pagination>
                </div>
            </div>
        </div>
        <!--维护表单弹框-->
        <!--
        <el-dialog :title="maintain.dialog.title" v-model="maintain.dialog.show" :close-on-click-modal="false" @close="maintainDialogClose" append-to-body width="500px">
            <transition name="el-fade-in" mode="out-in">
                <user-form v-if="maintain.dialog.show" :payload="maintain.data" @close="maintainDialogClose"></user-form>
            </transition>
        </el-dialog>
        -->
    </div>
</template>
<script setup>
import {ref, reactive,computed, onMounted, defineAsyncComponent} from "vue";
import {useStore} from "vuex";
import {useRouter, useRoute} from "vue-router";
import {ElLoading as loadingTip,ElMessage as messageTip,ElMessageBox as messageBox} from "element-plus";
import {updateObject,cloneObject} from "@/utils/object.js";
import {httpErrorHandler} from "@/utils/error.js";
import setting from "@/setting.js";
import {removeUser,fetchPageUsers} from "@/modules/user.js";
import {getUserStates} from '@/constants/user-state.js'
import moment from 'moment'

//用户表单
//const UserForm = defineAsyncComponent(() => import('@/views/user/UserForm.vue'));

//状态列表
const states = ref(getUserStates());

onMounted(() => {
    //载入用户
    loadUsers();
});

/**
 * 查询参数
 */
const query = reactive({
    //页码
    page: 1,
    //用户名
    username: null,
    //登录密码
    password: null,
    //姓名
    name: null,
    //头像
    avatar: null,
    //状态
    state: null,
    //上次登录时间
    loginTime: null,
});

/**
 * 构建查询参数
 * @return {Object}
 */
const buildQuery = () => {
    const params = {
        //当前页码
        page: query.page,
        //每页记录数
        pageSize: record.size,
        //用户名
        username: query.username,
        //登录密码
        password: query.password,
        //姓名
        name: query.name,
        //头像
        avatar: query.avatar,
        //状态
        state: query.state,
        //上次登录时间
        loginTime: null,
    };
    //上次登录时间
    if(moment(query.loginTime).isValid()){
        params.loginTime = moment(query.loginTime).format('YYYY-MM-DD');
    }
    return params;
};

/**
 * 提交查询
 */
const submitQuery = () => {
    query.page = 1;
    loadUsers();
};

/**
 * 重置
 */
const resetQuery = () => {
    Object.keys(query).forEach((key)=>{
        query[key] = null;
    });
    query.page = 1;
    loadUsers();
};

/**
 * 记录集
 */
const record = reactive({
    //总数
    total: 0,
    //是否加载中
    loading: false,
    //每页记录数
    size: setting.pagination.size,
    //记录集列表
    items: [],
    //表格DOM
    table: null,
    //已选中的项目列表
    selected: [],
});

/**
 * 表格复选框选中状态变更
 * @param {Object[]} records 已选中的复选框数据
 */
const selectionChange = (records) => {
    record.selected = records;
};

/**
 * 分页变更
 * @param {number} page 改变后的页码
 */
const pageChange = (page) => {
    query.page = page;
    loadUsers();
};

/**
 * 加载用户列表
 * @return {Promise}
 */
const loadUsers = () => {
    const params = buildQuery();
    record.loading = true;
    return fetchPageUsers(params).then((data) => {
        if (data.items.length === 0 && query.page > 1) {
            query.page -= 1;
            loadUsers();
            return;
        }
        record.total = data.total;
        record.items = data.items;
        /*
        record.items = data.items.map((item) => {
            return {
                ...item,
                username: item.username, //用户名
                password: item.password, //登录密码
                name: item.name, //姓名
                avatar: item.avatar, //头像
                stateName: item.state, //状态
                stateName: getStateName(item.state), //状态名称
                stateClass: getStateClass(item.state), //状态样式Class
                loginTime: item.loginTime, //上次登录时间
            };
        });
        */
    }).catch(httpErrorHandler).finally(() => {
        record.loading = false;
    });
};

/**
 * 加载模拟用户列表
 * @return {Promise}
 */
const loadMockUsers = () => {
    record.total = 100;
    record.items = [...new Array(setting.pagination.size)].map((i) => {
        const item = {
            username: Math.floor(Math.random()*(700-100)+100),
            password: Math.floor(Math.random()*(700-100)+100),
            name: Math.floor(Math.random()*(700-100)+100),
            avatar: Math.floor(Math.random()*(700-100)+100),
            state: Math.floor(Math.random()*(700-100)+100),
            loginTime: Math.floor(Math.random()*(700-100)+100),
        }
        return {
            ...item,
            stateName: getStateName(item.state), //状态名称
            stateClass: getStateClass(item.state), //状态样式Class
        };
    });
};

/**
 * 维护
 */
const maintain = {
    //传递给表单的数据
    data: null,
    //弹框
    dialog: reactive({
        show: false,
        title: null
    }),
};

/**
 * 弹框关闭
 * @param {string|number|null} payload 返回的数据
 */
const maintainDialogClose = (payload) => {
    maintain.dialog.show = false;
    if (payload === 'save') {
        loadUsers();
    }
};

/**
 * 新增按钮点击
 */
const createBtnClick = () => {
    maintain.data = null;
    maintain.dialog.show = true;
    maintain.dialog.title = '新增用户';
};

/**
 * 编辑按钮点击
 * @param {Object} row 当前行数据
 */
const modifyBtnClick = (row) => {
    maintain.data = cloneObject(row);
    maintain.dialog.show = true;
    maintain.dialog.title = '编辑用户';
};

/**
 * 单个删除按钮点击
 * @param {Object} row 当前行数据
 */
const removeBtnClick = (row) => {
    messageBox.confirm('确定删除吗？删除后无法恢复', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(() => {
        submitRemove(row.id);
    }).catch(() => {
        //...
    });
};

/**
 * 批量删除按钮点击
 */
const batchRemoveBtnClick = () => {
    if (record.selected.length === 0) {
        messageTip.error('请选择要删除的数据');
        return;
    }
    messageBox.confirm('确定删除吗？删除后无法恢复', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(() => {
        const ids = record.selected.map((item) => {
            return item.id;
        }).join(',');
        submitRemove(ids);
    }).catch(() => {
        //...
    });
};

/**
 * 提交删除
 * @param {int|string|int[]|string[]} ids 要删除的ID
 */
const submitRemove = (ids) => {
    const loading = loadingTip.service({
        lock: true,
        text: '删除中',
    });
    return removeUser(ids).then(({success, message}) => {
        if (!success) {
            messageTip.error(message);
        } else {
            messageTip.success(message);
            record.selected = [];
            loadUsers();
        }
    }).catch(httpErrorHandler).finally(() => {
        loading.close();
    });
};

</script>
<style lang="scss" scoped>
/**
 * 状态
 */
.state-enabled{
    color: #409EFF;
}
.state-disabled{
    color: #F56C6C;
}

</style>
