<!--
功能：路由表单
作者：tongwoo
日期：2022-06-16
-->
<template>
    <div class="form-container" v-loading="loading">
        <el-form ref="form" :model="model" :rules="rules" label-width="70px" size="default" @submit.prevent>
            <el-form-item label="名称" prop="name">
                <el-input v-model="model.name" maxlength="128"></el-input>
            </el-form-item>
            <el-form-item label="路径" prop="path">
                <el-input v-model="model.path" maxlength="256"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="permissionId">
                <el-tree-select node-key="id" v-model="model.permissionId" :data="permissions" class="el-select-long" :props="{value:'id',label:'description'}" check-strictly clearable/>
            </el-form-item>
            <div class="error-container" v-if="errorMessage!==null">
                <el-alert type="error" :description="errorMessage" :closable="false" show-icon></el-alert>
            </div>
            <div class="footer-container">
                <el-button type="default" @click="cancelBtnClick"><i class="bi bi-x-circle-fill el-icon--left"></i>取消</el-button>
                <el-button type="primary" @click="saveBtnClick" native-type="submit"><i class="bi bi-check-circle-fill el-icon--left"></i>保存</el-button>
            </div>
        </el-form>
    </div>
</template>
<script setup>
import {ref, reactive, onMounted, nextTick} from "vue"
import {ElLoading, ElMessage as messageTip} from "element-plus"
import {cloneObject, updateObject} from "@/utils/object.js"
import mapper from "@/utils/mapper.js"
import {httpErrorHandler} from "@/utils/error.js"
import moment from "moment"
import {createRoute, updateRoute, fetchRoute} from "@/modules/route.js"
import {fetchPermissionTree} from "@/modules/permission.js"

//属性
const props = defineProps({
    //传递过来的数据
    payload: {
        type: Object
    }
})
//事件
const emits = defineEmits(['close'])
//加载中
const loading = ref(false)
//表单
const form = ref(null)
//权限树
const tree = ref(null)
//错误信息
const errorMessage = ref(null)
//权限列表
const permissions = ref([])

/**
 * 载入权限列表
 */
const loadPermissions = () => {
    return fetchPermissionTree().then((items) => {
        permissions.value = items
    })
}
onMounted(() => {
    //权限列表
    loadPermissions()
})

//模型
const model = reactive({
    //主键
    id: null,
    //权限
    permissionId: null,
    //名称
    name: null,
    //路径
    path: null
})
//规则
const rules = {
    //名称
    name: [
        {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '名称必须填写'
        },
        {
            type: 'string',
            max: 128,
            trigger: 'blur',
            message: '名称最多128个字符'
        }
    ],
    //路径
    path: [
        {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '路径必须填写'
        },
        {
            type: 'string',
            max: 256,
            trigger: 'blur',
            message: '路径最多256个字符'
        }
    ]
}

/**
 * 保存按钮点击
 */
const saveBtnClick = async () => {
    errorMessage.value = null
    const success = await form.value.validate().catch(() => false)
    if (!success) {
        return
    }
    const data = {
        id: model.id, //ID
        permissionId: model.permissionId, //权限
        name: model.name, //名称
        path: model.path //路径
    }
    //保存
    if (data?.id) {
        submitUpdate(data)
    } else {
        submitCreate(data)
    }
}

/**
 * 取消按钮点击
 */
const cancelBtnClick = () => {
    emits('close', 'cancel')
}

/**
 * 路由新增
 * @param {Object} data 新增的数据
 * @return {Promise}
 */
const submitCreate = (data) => {
    loading.value = true
    return createRoute(data).then(({success, message}) => {
        if (!success) {
            errorMessage.value = message
            return
        }
        messageTip.success(message)
        emits('close', 'save')
    }).catch((err) => {
        httpErrorHandler(err)
    }).finally(() => {
        loading.value = false
    })
}

/**
 * 路由更新
 * @param {Object} data 更新的数据
 * @return {Promise}
 */
const submitUpdate = (data) => {
    loading.value = true
    return updateRoute(data).then(({success, message}) => {
        if (!success) {
            errorMessage.value = message
            return
        }
        messageTip.success(message)
        emits('close', 'save')
    }).catch((err) => {
        httpErrorHandler(err)
    }).finally(() => {
        loading.value = false
    })
}

/**
 * 路由载入
 * @param {string|int} id 主键ID
 * @return {Promise}
 */
const loadRoute = (id) => {
    loading.value = true
    return fetchRoute(id).then((body) => {
        if (!body.success) {
            messageTip.error(body.message)
            return
        }
        const data = body.data
        updateObject(model, data)
    }).catch((err) => {
        httpErrorHandler(err)
    }).finally(() => {
        loading.value = false
    })
}

onMounted(async () => {
    if (props.payload?.id) {
        await loadRoute(props.payload.id)
    }
})
</script>
