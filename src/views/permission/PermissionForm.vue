<!--
功能：权限表单
作者：tongwoo
日期：2022-06-14
-->
<template>
    <div class="form-container" v-loading="loading">
        <el-form ref="form" :model="model" :rules="rules" label-width="100px" size="default" @submit.prevent>
            <el-form-item label="父权限" prop="parentId">
                <el-tree-select node-key="id" v-model="model.parentId" :data="parents" class="el-select-long" :props="{value:'id',label:'description'}" check-strictly/>
            </el-form-item>
            <el-form-item label="权限名称" prop="name">
                <el-input v-model="model.name" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="权限描述" prop="description">
                <el-input v-model="model.description" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="规则名称" prop="ruleName">
                <el-select v-model="model.ruleName" class="el-select-long" clearable>
                    <el-option v-for="(item,i) in ruleNames" :key="i" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="model.id===null">
                <el-checkbox v-model="model.include">额外创建「增删改查」子权限</el-checkbox>
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
import {ref, reactive, onMounted} from "vue";
import {ElLoading, ElMessage as messageTip} from "element-plus";
import {cloneObject, updateObject} from "@/common/utils/object.js";
import mapper from "@/common/utils/mapper.js";
import {httpErrorHandler} from "@/common/utils/error.js";
import moment from "moment";
import {createPermission, updatePermission, fetchPermission, fetchPermissionTree} from "@/modules/Permission.js";
import {fetchRules} from "@/modules/Rbac.js";

//属性
const props = defineProps({
    //传递过来的数据
    payload: {
        type: Object
    }
});
//事件
const emits = defineEmits(['close']);
//加载中
const loading = ref(false);
//表单
const form = ref(null);
//错误信息
const errorMessage = ref(null);

//模型
const model = reactive({
    //主键
    id: null,
    //父权限
    parentId: null,
    //权限名称
    name: null,
    //权限描述
    description: null,
    //规则名称
    ruleName: null,
    //是否包含增删改查子权限
    include: false
});
//规则
const rules = {
    //父权限
    parentId: [
        {
            type: 'integer',
            required: true,
            trigger: 'blur',
            message: '父权限必须选择',
        },
    ],
    //权限名称
    name: [
        {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '权限名称必须填写',
        },
        {
            type: 'string',
            max: 32,
            trigger: 'blur',
            message: '权限名称最多32个字符',
        },
    ],
    //权限描述
    description: [
        {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '权限描述必须填写',
        },
        {
            type: 'string',
            max: 32,
            trigger: 'blur',
            message: '权限描述最多32个字符',
        },
    ],
    //规则名称
    ruleName: [
        {
            type: 'string',
            required: false,
            trigger: 'blur',
            message: '规则名称必须填写',
        },
        {
            type: 'string',
            max: 50,
            trigger: 'blur',
            message: '规则名称最多50个字符',
        },
    ],
};

//父权限列表
const parents = ref([]);

/**
 * 载入父权限列表
 */
const loadParents = async () => {
    parents.value = await fetchPermissionTree({
        root: 1
    });
};

//规则列表
const ruleNames = ref([]);

/**
 * 载入规则列表
 */
const loadRuleNames = async () => {
    ruleNames.value = await fetchRules();
};

onMounted(async () => {
    loadRuleNames();
    loadParents();
    if (props.payload?.id) {
        await loadPermission(props.payload.id);
    } else if (props.payload?.clone) {
        model.parentId = props.payload.parentId;
    }
});

/**
 * 保存按钮点击
 */
const saveBtnClick = async () => {
    errorMessage.value = null;
    const success = await form.value.validate().catch(() => false);
    if (!success) {
        return;
    }
    const data = {
        id: model.id, //ID
        parentId: model.parentId, //父权限
        name: model.name, //权限名称
        description: model.description, //权限描述
        ruleName: model.ruleName, //规则名称
        include: model.include,
    }
    //保存
    if (data?.id) {
        submitUpdate(data);
    } else {
        submitCreate(data);
    }
};

/**
 * 取消按钮点击
 */
const cancelBtnClick = () => {
    emits('close', 'cancel');
};

/**
 * 权限新增
 * @param {Object} data 新增的数据
 * @return {Promise}
 */
const submitCreate = (data) => {
    loading.value = true;
    return createPermission(data).then(({success, message}) => {
        if (!success) {
            errorMessage.value = message;
            return;
        }
        messageTip.success(message);
        emits('close', 'save');
    }).catch((err) => {
        httpErrorHandler(err);
    }).finally(() => {
        loading.value = false;
    });
};

/**
 * 权限更新
 * @param {Object} data 更新的数据
 * @return {Promise}
 */
const submitUpdate = (data) => {
    loading.value = true;
    return updatePermission(data).then(({success, message}) => {
        if (!success) {
            errorMessage.value = message;
            return;
        }
        messageTip.success(message);
        emits('close', 'save');
    }).catch((err) => {
        httpErrorHandler(err);
    }).finally(() => {
        loading.value = false;
    });
};

/**
 * 权限载入
 * @param {string|int} id 主键ID
 * @return {Promise}
 */
const loadPermission = (id) => {
    loading.value = true;
    return fetchPermission(id).then((body) => {
        if (!body.success) {
            messageTip.error(body.message);
            return;
        }
        const data = body.data;
        updateObject(model, data);
    }).catch((err) => {
        httpErrorHandler(err);
    }).finally(() => {
        loading.value = false;
    });
};

</script>
