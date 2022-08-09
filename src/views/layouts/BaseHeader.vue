<!--
功能：头部
日期：2021-12-14
-->
<template>
    <div class="base-header">
        <!--标题 因设计稿可能头部是独立的位置，此标题没有放在侧边栏-->
        <div class="header-title" :class="isCollapsed ? 'collapsed' : null" :style="navigatorWidth">
            <transition name="el-fade-in" mode="out-in">
                <div v-if="isCollapsed" key="image">
                    <img :src="logo" alt="">
                </div>
                <div v-else key="text" class="title-container"><img :src="logo" alt="" align="middle">{{ title }}</div>
            </transition>
        </div>
        <!--侧边栏开关按钮-->
        <div class="header-col header-col-btn" @click="toggleNavigatorBtnClick">
            <el-button type="text"><i class="bi btn-icon-text" :class="toggleNavigatorBtnClass"></i></el-button>
        </div>
        <!--面包屑-->
        <div class="header-col">
            <el-breadcrumb separator="/">
                <transition-group name="el-fade-in" mode="out-in">
                    <el-breadcrumb-item v-for="(item,i) in breadcrumbs" :key="i">{{ item.meta.title }}</el-breadcrumb-item>
                </transition-group>
            </el-breadcrumb>
        </div>
        <!--自动填充剩余空间-->
        <div class="header-flexible"></div>
        <!--去看文档-->
        <div class="header-col">
            <el-button type="primary" size="default" @click="docBtnClick"><i class="bi bi-filetype-doc el-icon--left"></i>去看文档</el-button>
        </div>
        <!--刷新-->
        <div class="header-col header-col-btn" @click="refreshPage">
            <el-tooltip content="刷新">
                <i class="bi bi-arrow-counterclockwise btn-icon-text"></i>
            </el-tooltip>
        </div>
        <!--多语言-->
        <div class="header-col header-col-btn">
            <el-dropdown @command="languageChange">
                <i class="bi bi-translate btn-icon-text"></i>
                <template v-slot:dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
                        <el-dropdown-item command="en-US">English</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!--消息未读-->
        <div class="header-col header-col-btn">
            <el-badge v-if="messageUnread>0" :value="messageUnread" class="item">
                <i class="bi bi-chat-dots btn-icon-text"></i>
            </el-badge>
            <i v-else class="bi bi-chat-dots btn-icon-text"></i>
        </div>
        <!--全屏-->
        <div class="header-col header-col-btn" @click="toggleFullScreenBtnClick">
            <el-tooltip :content="isFullScreen ? '退出全屏' : '全屏'">
                <i class="bi  btn-icon-text" :class="isFullScreen ? 'bi-fullscreen-exit' : 'bi-fullscreen'"></i>
            </el-tooltip>
        </div>
        <!--用户面板-->
        <div class="header-col header-col-btn">
            <el-dropdown @command="userDropdownCommand">
                <div class="user-panel">
                    <img :src="store.state.user.avatar" @error="avatarError"/>
                    <div class="nickname">{{ store.state.user.nickname }}</div>
                    <i class="bi bi-caret-down-fill"></i>
                </div>
                <template v-slot:dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="avatar"><i class="bi bi-image"></i>修改头像</el-dropdown-item>
                        <el-dropdown-item command="change-password"><i class="bi bi-shield-lock"></i>修改密码</el-dropdown-item>
                        <el-dropdown-item command="exit" divided><i class="bi bi-power"></i>退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!--修改密码弹框-->
        <el-dialog title="修改密码" v-model="password.dialog.show" :close-on-click-modal="false" append-to-body width="400px">
            <transition name="el-fade-in" mode="out-in">
                <change-password v-if="password.dialog.show" @close="password.dialog.show=false"></change-password>
            </transition>
        </el-dialog>
        <!--用户头像表单-->
        <el-dialog title="修改头像" v-model="avatar.dialog.show" :close-on-click-modal="false" append-to-body width="720px">
            <transition name="el-fade-in" mode="out-in">
                <avatar-setting v-if="avatar.dialog.show" :id="avatar.id" @close="avatar.dialog.show=false"></avatar-setting>
            </transition>
        </el-dialog>
    </div>
</template>
<script setup>
import {useStore} from "vuex";
import {computed, reactive, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {ElLoading, ElMessage} from "element-plus";
import http from "@/utils/http.js";
import logo from "@/assets/logo.svg";
import setting from "@/setting.js";
import ChangePassword from "@/views/ChangePassword.vue";
import AvatarSetting from "@/views/AvatarSetting.vue";
import mitter from "@/utils/mitter.js";
import defaultAvatar from "@/assets/images/icons/avatar-default.png";


const store = useStore();
const router = useRouter();
const route = useRoute();

//标题
const title = ref(setting.name);
//是否全屏
const isFullScreen = ref(false);
//菜单是否折叠
const isCollapsed = computed(() => {
    return store.state.setting.navigator.collapse;
});
//消息未读数
const messageUnread = computed(() => {
    return store.state.message.unread;
});
/**
 * 面包屑列表
 * @type {ComputedRef<*[]>}
 */
const breadcrumbs = computed(() => {
    if (route.path.indexOf('/error') === 0) {
        return [];
    }
    return route.matched.filter((item) => {
        return item.meta.hasOwnProperty('title');
    });
});

/**
 * 导航切换按钮class样式
 */
const toggleNavigatorBtnClass = computed(() => {
    return store.state.setting.navigator.collapse ? 'bi-text-indent-left' : 'bi-text-indent-right';
});

/**
 * 导航切换按钮点击
 */
const toggleNavigatorBtnClick = () => {
    store.commit('setting/TOGGLE_NAVIGATOR');
};

/**
 * 导航宽度
 */
const navigatorWidth = computed(() => {
    if (
        store.state.setting.navigator.width.current === null ||
        store.state.setting.navigator.collapse
    ) {
        return null;
    }
    return {
        flexBasis: store.state.setting.navigator.width.current + 'px',
    };
});

/**
 * 全屏按钮点击
 */
const toggleFullScreenBtnClick = () => {
    if (isFullScreen.value) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
    isFullScreen.value = !isFullScreen.value;
};

/**
 * 文档按钮点击
 */
const docBtnClick = () => {
    window.location = 'http://doc.duckpear.com/guide/index.html';
};

/**
 * 刷新页面
 */
const refreshPage = () => {
    mitter.emit('page-refresh');
};

/**
 * 用户下拉菜单点击
 * @param {string} command 菜单命令
 */
const userDropdownCommand = (command) => {
    if (command === 'change-password') {
        password.dialog.show = true;
    } else if (command === 'avatar') {
        avatar.dialog.show = true;
    } else if (command === 'exit') {
        exitSystem();
    }
};

//密码配置
const password = reactive({
    dialog: {
        show: false
    }
});

/**
 * 退出系统
 */
const exitSystem = () => {
    const loading = ElLoading.service({
        lock: true,
        text: '退出中',
    });
    //调用失败也退出
    http.post(
        '/system/logout'
    ).finally(() => {
        loading.close();
        store.commit('CLEANUP');
        router.replace('/login');
    });
};

/**
 * 头像
 */
const avatar = {
    //传递给表单的数据
    data: null,
    //弹框
    dialog: reactive({
        show: false,
        title: null
    }),
};

/**
 * 头像加载失败
 */
const avatarError = (error) => {
    console.info(error);
    error.target.src = defaultAvatar;
};

/**
 * 语言改变
 */
const languageChange = (lang) => {
    store.commit('setting/UPDATE_LANGUAGE', lang);
};
</script>
<style lang="scss" scoped>
.base-header {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    display: flex;
    overflow: hidden;
    background-color: var(--base-header-bg-color);
    height: var(--base-header-height);
    color: #666;
    z-index: 1001;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .06);
    transition: all .3s;
    font-size: 14px;

    .header-col {
        padding: 0 15px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        flex: none;

        &.header-col-btn {
            cursor: pointer;

            &:hover {
                background-color: #f4f5f7;
            }
        }
    }

    .header-flexible {
        flex: auto;
        text-align: center;
        color: #2d8cf0;
        font-size: 30px;
    }

    .header-title {
        color: #ffffff;
        flex: 0 0 var(--base-navigator-width);
        height: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        letter-spacing: 3px;
        background-color: var(--base-header-logo-bg-color);
        box-shadow: 1px 0 5px rgba(0, 0, 0, .03);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all .3s;
        user-select: none;

        &.collapsed {
            flex: 0 0 var(--base-navigator-collapse-width);
        }

        .title-container {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 16px;
        }

        img {
            height: 16px;
        }
    }

    .user-panel {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;

        img{
            width: 32px;
            height:32px;
            border-radius: 32px;
        }

        i {
            font-size: 14px;
        }
    }

    :deep(.el-button) {
        color: white;
        font-size: 12px;
        font-weight: 300;

        i {
            margin-right: 5px;
        }
    }
}

.navigator-toggle {
    cursor: pointer;
}

.btn-icon-text {
    font-size: 20px;
    color: #666;
}
</style>
