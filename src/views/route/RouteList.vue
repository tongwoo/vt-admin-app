<!--
功能：路由
作者：tongwoo
日期：2022-06-16
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
                            <el-form-item label="名称">
                                <el-input v-model="query.name" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="路径">
                                <el-input v-model="query.path" clearable></el-input>
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
                    <div class="header-title">路由列表</div>
                    <div class="header-flexible"></div>
                    <div class="header-buttons">
                        <el-button type="primary" size="default" @click="createBtnClick"><i class="bi bi-plus-lg el-icon--left"></i>新增</el-button>
                        <el-button type="primary" size="default" @click="generateBtnClick"><i class="bi bi-plus-lg el-icon--left"></i>内置生成</el-button>
                        <el-button type="danger" size="default" @click="batchRemoveBtnClick"><i class="bi bi-trash el-icon--left"></i>删除</el-button>
                        <el-button type="danger" size="default" @click="truncateBtnClick"><i class="bi bi-trash el-icon--left"></i>清空</el-button>
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
                            <el-table-column type="selection" fixed="left" align="center"></el-table-column>
                            <el-table-column type="index" fixed="left" label="序号" align="center"></el-table-column>
                            <el-table-column prop="name" label="名称" align="left" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="path" label="路径" align="left" min-width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="permissionDescription" label="权限" align="left" min-width="100" show-overflow-tooltip></el-table-column>
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
                <route-form v-if="maintain.dialog.show" :payload="maintain.data" @close="maintainDialogClose"></route-form>
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
import {fetchPermissions} from "@/modules/permission.js"
import {removeRoute, fetchPageRoutes, truncateRoutes, generateRoutes} from "@/modules/route.js"

//路由表单
const RouteForm = defineAsyncComponent(() => import('@/views/route/RouteForm.vue'))

const store = useStore()
const router = useRouter()
const route = useRoute()

/**
 * 查询参数
 */
const query = reactive({
    //页码
    page: 1,
    //权限
    permissionId: null,
    //名称
    name: null,
    //路径
    path: null
})

onMounted(() => {
    //载入路由
    loadRoutes()
})

/**
 * 提交查询
 */
const submitQuery = () => {
    query.page = 1
    loadRoutes()
}

/**
 * 重置
 */
const resetQuery = () => {
    Object.keys(query).forEach((key) => {
        query[key] = null
    })
    query.page = 1
    loadRoutes()
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
        //权限
        permissionId: query.permissionId,
        //名称
        name: query.name,
        //路径
        path: query.path
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
        loadRoutes()
    }
}

/**
 * 新增按钮点击
 */
const createBtnClick = () => {
    maintain.data = null
    maintain.dialog.show = true
    maintain.dialog.title = '新增路由'
}

/**
 * 编辑按钮点击
 * @param {Object} row 当前行数据
 */
const modifyBtnClick = (row) => {
    maintain.data = cloneObject(row)
    maintain.dialog.show = true
    maintain.dialog.title = '编辑路由'
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
 * 清空路由按钮点击
 */
const truncateBtnClick = () => {
    messageBox.confirm('确定清空吗？', '提示', {
        type: 'warning'
    }).then(() => {
        truncateRoutes().then(() => {
            loadRoutes()
        }).catch(() => {
            messageTip.error('清空失败')
        })
    }).catch(() => {
        //...
    })
}

/**
 * 生成路由按钮点击
 */
const generateBtnClick = () => {
    messageBox.confirm('确定生成所有路由吗？已经生成的则忽略', '提示', {
        type: 'warning'
    }).then(() => {
        generateRoutes().then(() => {
            query.page = 1
            loadRoutes()
        }).catch(() => {
            messageTip.error('生成失败')
        })
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
    return removeRoute(ids).then(({success, message}) => {
        if (!success) {
            messageTip.error(message)
        } else {
            messageTip.success(message)
            recordset.selected = []
            loadRoutes()
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
    loadRoutes()
}

/**
 * 加载路由列表
 * @return {Promise}
 */
const loadRoutes = () => {
    const params = buildQuery()
    recordset.loading = true
    return fetchPageRoutes(params).then((data) => {
        if (data.items.length === 0 && query.page > 1) {
            query.page -= 1
            loadRoutes()
            return
        }
        recordset.total = data.total
        recordset.items = data.items
    }).catch((err) => {
        httpErrorHandler(err)
    }).finally(() => {
        recordset.loading = false
    })
}
</script>
<style lang="scss" scope>
</style>
