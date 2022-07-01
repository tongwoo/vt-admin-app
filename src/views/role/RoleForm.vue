<!--
功能：角色表单
作者：tongwoo
日期：2022-06-13
-->
<template>
    <div class="form-container" v-loading="loading">
        <el-form ref="form" :model="model" :rules="rules" label-width="100px" size="default" @submit.prevent>
            <el-form-item label="角色名称" prop="name">
                <template v-slot:label>
                    <el-tooltip content="需要英文、下划线字符">
                        <i class="bi bi-question-circle el-icon--left"></i>
                    </el-tooltip>角色名称
                </template>
                <el-input v-model="model.name" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="description">
                <el-input v-model="model.description" maxlength="32"></el-input>
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
import {updateObject} from "@/common/utils/object.js";
import mapper from "@/common/utils/mapper.js";
import {httpErrorHandler} from "@/common/utils/error.js";
import moment from "moment";
import {getConfirms} from "@/common/constants/Confirm.js";
import {createRole, updateRole, fetchRole} from "@/modules/Role.js";

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
//是否内置列表
const isBuiltIns = ref(getConfirms());

//模型
const model = reactive({
    //主键
    id: null,
    //角色名称
    name: null,
    //角色描述
    description: null,
    //规则名称
    //ruleName: null,
    //是否内置
    //isBuiltIn: null,
});
//规则
const rules = {
    //角色名称
    name: [
        {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '角色名称必须填写',
        },
        {
            type: 'string',
            max: 32,
            trigger: 'blur',
            message: '角色名称最多32个字符',
        },
    ],
    //角色描述
    description: [
        {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '角色描述必须填写',
        },
        {
            type: 'string',
            max: 32,
            trigger: 'blur',
            message: '角色描述最多32个字符',
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
    //是否内置
    isBuiltIn: [
        {
            type: 'integer',
            required: false,
            trigger: 'blur',
            message: '是否内置必须填写',
        },
        {
            type: 'integer',
            min: 0,
            max: 255,
            trigger: 'blur',
            message: '是否内置必须介于0-255之间',
        },
    ],
};

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
        name: model.name, //角色名称
        description: model.description, //角色描述
        ruleName: model.ruleName, //规则名称
        isBuiltIn: model.isBuiltIn, //是否内置
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
 * 角色新增
 * @param {Object} data 新增的数据
 * @return {Promise}
 */
const submitCreate = (data) => {
    loading.value = true;
    return createRole(data).then(({success, message}) => {
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
 * 角色更新
 * @param {Object} data 更新的数据
 * @return {Promise}
 */
const submitUpdate = (data) => {
    loading.value = true;
    return updateRole(data).then(({success, message}) => {
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
 * 角色载入
 * @param {string|int} id 主键ID
 * @return {Promise}
 */
const loadRole = (id) => {
    loading.value = true;
    return fetchRole(id).then((body) => {
        if (!body.success) {
            messageTip.error(body.message);
            return;
        }
        const data = body.data;
        updateObject(model, data);
        /*
        //更新模型
        model.id = data.id; //ID
        model.male : data.male, //男
        model.female : data.female, //女
        */
    }).catch((err) => {
        httpErrorHandler(err);
    }).finally(() => {
        loading.value = false;
    });
};

onMounted(async () => {
    if (props.payload?.id) {
        await loadRole(props.payload.id);
    }
});
</script>
