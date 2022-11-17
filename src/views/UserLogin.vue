<!--
功能：用户登录
日期：2022-02-09
-->
<template>
    <div class="login-container">
        <div class="login-brand">
            <img src="@/assets/logo.svg" alt=""> {{ name }}
        </div>
        <div class="login-box">
            <!--登录界面宣传图，可以直接删除此div只显示登录框-->
            <div class="login-welcome">
                <h1>前端儿脚手架管理系统</h1>
            </div>
            <!--登录框-->
            <div class="login-panel">
                <div class="panel-header">登录系统</div>
                <div class="panel-body">
                    <el-form ref="form" :model="model" :rules="rules" :disabled="loading" label-width="80px" label-position="top" size="large" hide-required-asterisk @submit.prevent>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="model.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="登录密码" prop="password">
                            <el-input v-model="model.password" type="password" autocomplete="new-password" placeholder="请输入登录密码"></el-input>
                        </el-form-item>
                        <!--
                        <el-form-item label="验证码" prop="captcha">
                            <div class="captcha-container">
                                <el-input v-model="model.captcha"></el-input>
                                <img ref="captcha" src="" alt="" @click="refreshCaptcha">
                            </div>
                        </el-form-item>
                        -->
                        <el-collapse-transition>
                            <div class="error-container" v-if="tip!==null">
                                <el-alert type="error" title="提示" :description="tip" :closable="false" show-icon></el-alert>
                            </div>
                        </el-collapse-transition>
                        <el-button type="primary" round @click="submitLogin" native-type="submit" :loading="loading">登录</el-button>
                        <!--
                        <div class="separator"><span class="text">或者</span></div>
                        <el-button type="default" round>找回密码</el-button>
                        -->
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref, reactive, onMounted} from "vue"
import {ElLoading as loadingTip, ElMessage as messageTip} from "element-plus"
import {http} from "@/utils/http.js"
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import defaultAvatar from "@/assets/images/icons/avatar-default.png"
import {cleanAuthorization, writeAuthorization} from "@/utils/authorize.js"
import {httpErrorHandler} from "@/utils/error.js"
import setting from "@/setting.js"
import {API_PATH_DEFAULT} from "@/constants/api-path.js"
import {fetchProfile, requestLogin} from '@/modules/authorization.js'

const store = useStore()
const router = useRouter()

//系统名
const name = setting.name
//表单
const form = ref(null)
//验证码
const captcha = ref(null)
//错误信息
const tip = ref(null)
//加载中
const loading = ref(false)
//模型
const model = reactive({
    //用户名
    username: null,
    //密码
    password: null,
    //验证码
    captcha: null,
})
//规则
const rules = {
    //用户名
    username: [
        {
            type: 'string',
            required: true,
            message: '',
        },
    ],
    //密码
    password: [
        {
            type: 'string',
            required: true,
            message: '',
        },
    ],
    //验证码
    captcha: [
        {
            type: 'string',
            required: false,
            message: '验证码必须填写',
        },
        {
            type: 'string',
            len: 4,
            message: '验证码必须是4位',
        },
    ],
}

/**
 * 刷新验证码
 */
const refreshCaptcha = () => {
    captcha.value.src = API_PATH_DEFAULT + '/login/captcha?v=' + Math.random()
}

/**
 * 提交登录
 */
const submitLogin = async () => {
    tip.value = null
    //表单是否有效
    const success = await form.value.validate().catch(() => false)
    if (!success) {
        return
    }
    //登录参数
    const params = {
        username: model.username,
        password: model.password,
        captcha: model.captcha,
    }
    loading.value = true
    requestLogin(params).then(({success, message, data}) => {
        if (!success) {
            tip.value = message ?? '网络错误'
            return false
        }
        //授权数据
        const authorization = data.token
        //保存授权数据
        writeAuthorization(authorization)
        //填充用户信息
        store.commit('user/update', {
            authorization: authorization,
            nickname: data.name,
            avatar: data.avatar ?? defaultAvatar,
            permissions: data.permissions,
        })
        //加载用户数据（如果需要额外调用接口的话）
        //loadProfile();
        router.push('/').catch((err) => {
            console.error('跳转出现异常：', err)
        })
    }).catch(httpErrorHandler).finally(() => {
        loading.value = false
    })
}

/**
 * 载入用户信息
 */
const loadProfile = () => {
    const loading = loadingTip.service({
        lock: true,
        text: '初始化中',
    })
    fetchProfile().then(({success, message, data}) => {
        if (!success) {
            tip.value = message
            return false
        }
        store.commit('user/update', {
            nickname: data.name,
            avatar: defaultAvatar,
            permissions: [],
        })
        router.push('/').catch((err) => {
            console.error('跳转出现异常：', err)
        })
    }).catch(httpErrorHandler).finally(() => {
        loading.close()
    })
}

/**
 * 模拟成功登录
 */
const mockLogin = () => {
    loading.value = true
    window.setTimeout(() => {
        loading.value = false
        //授权数据
        const authorization = 'token-data'
        //保存授权数据
        writeAuthorization(authorization)
        //填充用户信息
        store.commit('user/update', {
            authorization: authorization,
            nickname: '超级管理员',
            avatar: defaultAvatar,
            permissions: [],
        })
        router.push('/').catch((err) => {
            console.error('跳转出现异常：', err)
        })
    }, 1000)
}

onMounted(() => {
    store.commit('cleanup')
    cleanAuthorization()
    //refreshCaptcha();
})
</script>

<style lang="scss" src="../assets/styles/user-login.scss" scoped></style>
