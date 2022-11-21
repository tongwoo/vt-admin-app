<!--用户-->
<template>
    <div class="form-container" v-loading="loading">
        <el-form ref="form" :model="model" :rules="rules" label-width="100px" size="default" @submit.prevent>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="model.username" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input v-model="model.password" maxlength="64"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="model.name" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-input v-model="model.avatar" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state">
                <el-select v-model="model.state" class="el-select-long">
                    <el-option v-for="(item,i) in states" :key="i" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上次登录时间" prop="loginTime">
                <el-date-picker v-model="model.loginTime" type="date" class="el-date-long"></el-date-picker>
            </el-form-item>
            <div class="error-container" v-if="tip">
                <el-alert type="error" :description="tip" :closable="false" show-icon></el-alert>
            </div>
            <div class="footer-container">
                <el-button type="default" @click="cancelBtnClick">取消</el-button>
                <el-button type="primary" @click="saveBtnClick" native-type="submit">保存</el-button>
            </div>
        </el-form>
    </div>
</template>
<script setup>
import {ref, reactive, onMounted} from "vue";
import {ElLoading as loadingTip,ElMessage as messageTip} from "element-plus";
import {cloneObject,updateObject} from "@/utils/object.js";
import {httpErrorHandler} from "@/utils/error.js";
import moment from "moment";
import {getUserStates} from "@/constants/user-state.js";
import {createUser,updateUser,fetchUser} from "@/modules/user.js";

//属性
const props = defineProps({
    //传递过来的数据
    payload: {
        type: Object
    }
});

//状态列表
const states = ref(getUserStates());

//事件
const emits = defineEmits(['close']);
//加载中
const loading = ref(false);
//表单
const form = ref(null);
//错误提示
const tip = ref(null);

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
});
//规则
const rules = {
    //用户名
    username: [
        {
            type: 'string',
            required: false,
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
            required: false,
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
            required: false,
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
    //头像
    avatar: [
        {
            type: 'string',
            required: false,
            trigger: 'blur',
            message: '头像必须填写',
        },
        {
            type: 'string',
            max: 100,
            trigger: 'blur',
            message: '头像最多100个字符',
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
            max: 9,
            trigger: 'blur',
            message: '状态必须介于0-9之间',
        },
    ],
    //上次登录时间
    loginTime: [
        {
            type: 'string',
            required: false,
            trigger: 'blur',
            message: '上次登录时间必须填写',
        },
    ],
};

/**
 * 保存按钮点击
 */
const saveBtnClick = async () => {
    tip.value = null;
    const success = await form.value.validate().catch(() => false);
    if (!success) {
        return;
    }
    const data = {
        id : model.id, //ID
        username : model.username, //用户名
        password : model.password, //登录密码
        name : model.name, //姓名
        avatar : model.avatar, //头像
        state : model.state, //状态
        loginTime : moment(model.loginTime).isValid() ? moment(model.loginTime).format('YYYY-MM-DD') : null, //上次登录时间
    }
    //保存
    if(data?.id){
        submitUpdate(data);
    }else{
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
    return createUser(data).then(({success,message}) => {
        if (!success) {
            tip.value = message;
            return;
        }
        messageTip.success(message);
        emits('close', 'save');
    }).catch(httpErrorHandler).finally(() => {
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
    return updateUser(data).then(({success,message}) => {
        if (!success) {
            tip.value = message;
            return;
        }
        messageTip.success(message);
        emits('close', 'save');
    }).catch(httpErrorHandler).finally(() => {
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
    return fetchUser(id).then((body)=>{
        if (!body.success) {
            messageTip.error(body.message);
            return;
        }
        const data = body.data;
        updateObject(model, data);
        /*
        //更新模型
        model.id = data.id; //ID
        model.username : data.username, //用户名
        model.password : data.password, //登录密码
        model.name : data.name, //姓名
        model.avatar : data.avatar, //头像
        model.state : data.state, //状态
        model.loginTime : data.loginTime, //上次登录时间
        */
    }).catch(httpErrorHandler).finally(() => {
        loading.value = false;
    });
};

onMounted(async () => {
    if(props.payload?.id) {
        await loadUser(props.payload.id);
    }
});
</script>
