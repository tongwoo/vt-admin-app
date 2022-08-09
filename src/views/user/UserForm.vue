<!--
功能：用户表单
作者：tongwoo
日期：2022-06-14
-->
<template>
    <div class="form-container" v-loading="loading">
        <el-form ref="form" :model="model" :rules="rules" label-width="70px" size="default" @submit.prevent>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="model.name" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleIds">
                <el-select v-model="model.roleIds" class="el-select-long" multiple>
                    <el-option v-for="(item,i) in roles" :key="i" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="model.username" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" v-if="model.id===null">
                <el-input v-model="model.password" maxlength="64" type="password" autocomplete="new-password" show-password></el-input>
            </el-form-item>
            <!--
            <el-form-item label="状态" prop="state">
                <el-select v-model="model.state" class="el-select-long">
                    <el-option v-for="(item,i) in states" :key="i" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            -->
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
import {ref, reactive, onMounted, onBeforeMount} from "vue";
import {ElLoading, ElMessage as messageTip} from "element-plus";
import {cloneObject, updateObject} from "@/utils/object.js";
import mapper from "@/utils/mapper.js";
import {httpErrorHandler} from "@/utils/error.js";
import moment from "moment";
import {getUserStates} from "@/constants/user-state.js";
import {createUser, updateUser, fetchUser} from "@/modules/User.js";
import {fetchPairRoles} from "@/modules/Role.js";

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
//状态列表
const states = ref(getUserStates());
//角色列表
const roles = ref([]);

/**
 * 载入角色列表
 */
const loadRoles = async () => {
    roles.value = await fetchPairRoles();
};

onMounted(() => {
    loadRoles();
});

//模型
const model = reactive({
    //主键
    id: null,
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
    //角色ID列表
    roleIds: [],
});
//规则
const rules = {
    //用户名
    username: [
        {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '用户名必须填写',
        },
        {
            type: 'string',
            max: 32,
            trigger: 'blur',
            message: '用户名最多32个字符',
        },
    ],
    //登录密码
    password: [
        {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '登录密码必须填写',
        },
        {
            type: 'string',
            max: 64,
            trigger: 'blur',
            message: '登录密码最多64个字符',
        },
    ],
    //姓名
    name: [
        {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '姓名必须填写',
        },
        {
            type: 'string',
            max: 32,
            trigger: 'blur',
            message: '姓名最多32个字符',
        },
    ],
    //状态
    state: [
        {
            type: 'integer',
            required: false,
            trigger: 'blur',
            message: '状态必须填写',
        },
        {
            type: 'integer',
            min: 0,
            max: 255,
            trigger: 'blur',
            message: '状态必须介于0-255之间',
        },
    ],
    //角色
    roleIds: [
        {
            type: 'array',
            required: true,
            trigger: 'blur',
            message: '角色必须选择',
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
        username: model.username, //用户名
        password: model.password, //登录密码
        name: model.name, //姓名
        roleIds: model.roleIds, //角色
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
 * 用户新增
 * @param {Object} data 新增的数据
 * @return {Promise}
 */
const submitCreate = (data) => {
    loading.value = true;
    return createUser(data).then(({success, message}) => {
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
 * 用户更新
 * @param {Object} data 更新的数据
 * @return {Promise}
 */
const submitUpdate = (data) => {
    loading.value = true;
    return updateUser(data).then(({success, message}) => {
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
 * 用户载入
 * @param {string|int} id 主键ID
 * @return {Promise}
 */
const loadUser = (id) => {
    loading.value = true;
    return fetchUser(id).then((body) => {
        if (!body.success) {
            messageTip.error(body.message);
            return;
        }
        const data = body.data;
        updateObject(model, data);
        model.roleIds = data.roles.map(item => item.id);
    }).catch((err) => {
        httpErrorHandler(err);
    }).finally(() => {
        loading.value = false;
    });
};

onMounted(async () => {
    if (props.payload?.id) {
        await loadUser(props.payload.id);
    }
});
</script>
