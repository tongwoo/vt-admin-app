<!--
功能：权限
作者：tongwoo
日期：2022-06-14
-->
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
                            <el-form-item label="权限名称">
                                <el-input v-model="query.name" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="权限描述">
                                <el-input v-model="query.description" clearable></el-input>
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
                    <div class="header-title">权限列表</div>
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
                        <el-table
                            border
                            stripe
                            size="small"
                            row-key="id"
                            :ref="recordset.table"
                            header-row-class-name="table-header-row"
                            header-cell-class-name="table-header-cell"
                            cell-class-name="table-cell"
                            row-class-name="table-row"
                            :data="recordset.items"
                            v-loading="recordset.loading"
                            @selection-change="selectionChange"
                        >
                            <!--<el-table-column type="selection" fixed="left" align="center"></el-table-column>-->
                            <!--<el-table-column type="index" fixed="left" label="序号" align="center"></el-table-column>-->
                            <el-table-column prop="description" label="权限描述" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="name" label="权限名称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="ruleName" label="规则名称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column fixed="right" label="操作" width="240" align="center">
                                <template v-slot="{row}">
                                    <div class="table-operation">
                                        <el-button type="primary" size="small" text bg @click="newBtnClick(row)">新增子权限</el-button>
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
                    <el-pagination
                        v-model:page-size="recordset.size"
                        v-model:current-page="query.page"
                        :total="recordset.total"
                        @current-change="pageChange"
                        layout="total, prev, pager, next, jumper"
                        background
                    ></el-pagination>
                </div>
            </div>
        </div>
        <!--维护表单弹框-->
        <el-dialog :title="maintain.dialog.title" v-model="maintain.dialog.show" :close-on-click-modal="false" @close="maintainDialogClose" append-to-body width="500px">
            <transition name="el-fade-in" mode="out-in">
                <permission-form v-if="maintain.dialog.show" :payload="maintain.data" @close="maintainDialogClose"></permission-form>
            </transition>
        </el-dialog>
    </div>
</template>
<script setup>
import {ref, reactive, computed, onMounted, defineAsyncComponent} from "vue"
import {useStore} from "vuex"
import {useRouter, useRoute} from "vue-router"
import {ElLoading, ElMessage as messageTip, ElMessageBox as messageBox} from "element-plus"
import {updateObject, cloneObject} from "@/utils/object.js"
import {httpErrorHandler} from "@/utils/error.js"
import setting from "@/setting.js"
import {removePermission, fetchPagePermissions, fetchPermissionTree} from "@/modules/permission.js"

//权限表单
const PermissionForm = defineAsyncComponent(() => import('@/views/permission/PermissionForm.vue'))

const store = useStore()
const router = useRouter()
const route = useRoute()

/**
 * 查询参数
 */
const query = reactive({
    //页码
    page: 1,
    //父权限
    parentId: null,
    //权限名称
    name: null,
    //权限描述
    description: null,
    //规则名称
    ruleName: null
})

onMounted(() => {
    //载入权限
    loadPermissions()
})

/**
 * 提交查询
 */
const submitQuery = () => {
    query.page = 1
    loadPermissions()
}

/**
 * 重置
 */
const resetQuery = () => {
    Object.keys(query).forEach((key) => {
        query[key] = null
    })
    query.page = 1
    loadPermissions()
}

/**
 * 构建查询参数
 * @return {Object}
 */
const buildQuery = () => {
    const params = {
        //当前页码
        page: query.page,
        //每页记录数
        pageSize: recordset.size,
        //父权限
        parentId: query.parentId,
        //权限名称
        name: query.name,
        //权限描述
        description: query.description,
        //规则名称
        ruleName: query.ruleName
    }
    return params
}

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
    })
}

/**
 * 弹框关闭
 * @param {string|number|null} payload 返回的数据
 */
const maintainDialogClose = (payload) => {
    maintain.dialog.show = false
    if (payload === 'save') {
        loadPermissions()
    }
}

/**
 * 新增按钮点击
 */
const createBtnClick = () => {
    maintain.data = null
    maintain.dialog.show = true
    maintain.dialog.title = '新增权限'
}

/**
 * 编辑按钮点击
 * @param {Object} row 当前行数据
 */
const modifyBtnClick = (row) => {
    maintain.data = cloneObject(row)
    maintain.dialog.show = true
    maintain.dialog.title = '编辑权限'
}

const newBtnClick = (row) => {
    maintain.data = {
        clone: true,
        parentId: row.id
    }
    maintain.dialog.show = true
    maintain.dialog.title = '新增权限'
}

/**
 * 单个删除按钮点击
 * @param {Object} row 当前行数据
 */
const removeBtnClick = (row) => {
    messageBox.confirm('确定删除吗？删除后无法恢复', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(() => {
        submitRemove(row.id)
    }).catch(() => {
        //...
    })
}

/**
 * 批量删除按钮点击
 */
const batchRemoveBtnClick = () => {
    if (recordset.selected.length === 0) {
        messageTip.error('请选择要删除的数据')
        return
    }
    messageBox.confirm('确定删除吗？删除后无法恢复', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(() => {
        const ids = recordset.selected.map((item) => {
            return item.id
        }).join(',')
        submitRemove(ids)
    }).catch(() => {
        //...
    })
}

/**
 * 提交删除
 * @param {int|string|int[]|string[]} ids 要删除的ID
 */
const submitRemove = (ids) => {
    const loading = ElLoading.service({
        lock: true,
        text: '删除中'
    })
    return removePermission(ids).then(({success, message}) => {
        if (!success) {
            messageTip.error(message)
        } else {
            messageTip.success(message)
            recordset.selected = []
            loadPermissions()
        }
    }).catch((err) => {
        httpErrorHandler(err)
    }).finally(() => {
        loading.close()
    })
}


/**
 * 记录集
 */
const recordset = reactive({
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
    selected: []
})

/**
 * 表格复选框选中状态变更
 * @param {Object[]} records 已选中的复选框数据
 */
const selectionChange = (records) => {
    recordset.selected = records
}

/**
 * 分页变更
 * @param {number} page 改变后的页码
 */
const pageChange = (page) => {
    query.page = page
    loadPermissions()
}

/**
 * 加载权限列表
 * @return {Promise}
 */
const loadPermissions = () => {
    const params = buildQuery()
    recordset.loading = true
    return fetchPermissionTree(params).then((items) => {
        recordset.items = items
    }).catch((err) => {
        httpErrorHandler(err)
    }).finally(() => {
        recordset.loading = false
    })
}

/**
 * 加载模拟权限列表
 * @return {Promise}
 */
const loadMockPermissions = () => {
    recordset.total = 15
    recordset.items = [...new Array(15)].map((item, i) => {
        return {
            id: i,
            parentId: 'parentId', //父权限
            name: 'name', //权限名称
            description: 'description', //权限描述
            ruleName: 'ruleName' //规则名称
        }
    })
}

</script>
<style lang="scss" scope>
</style>
