<!--
功能: 公用导入表单
日期: 2021-11-25
-->
<template>
    <div class="form-container" v-loading="loading" element-loading-text="导入中">
        <el-form ref="form" :model="model" :rules="rules" label-width="60px" label-suffix=":" size="default" @submit.prevent>
            <el-form-item label="文件" prop="fileName">
                <div class="import-container">
                    <el-input v-model="model.fileName" disabled></el-input>
                    <div class="upload-container">
                        <el-button type="primary" @click="chooseFile"><i class="bi bi-upload el-icon--left"></i>选择文件</el-button>
                        <input type="file" ref="fileInput" @change="fileChange" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                    </div>
                </div>
            </el-form-item>
            <div class="error-container" v-if="error.show">
                <el-alert type="error" :description="error.message" :closable="false" show-icon></el-alert>
            </div>
            <div class="footer-container">
                <el-button type="default" @click="cancelBtnClick"><i class="bi bi-x-circle-fill el-icon--left"></i>取消</el-button>
                <el-button type="primary" @click="importBtnClick" native-type="submit"><i class="bi bi-check-circle-fill el-icon--left"></i>导入</el-button>
            </div>
            <div class="upload-template" v-if="templatePath!==null">
                <a :href="templatePath" :download="templateName">请点击此处下载模板</a>
            </div>
        </el-form>
    </div>
</template>
<script setup>
import {httpErrorHandler} from "@/common/utils/error.js";
import {computed, reactive, ref} from "vue";
import http from "@/common/utils/http.js";
import {ElMessage} from "element-plus";

//相关属性
const props = defineProps({
    //提交地址
    url: {
        type: String,
        default: '/common/upload',
    },
    //模板路径
    templatePath: {
        type: String,
        default: null
    },
    //上传表单名
    inputName: {
        type: String,
        default: 'file'
    },
});
//相关事件
const emits = defineEmits(['close']);
//模板名称
const templateName = computed(() => {
    if (props.templatePath == null) {
        return null;
    }
    const segments = props.templatePath.split('/');
    return segments[segments.length - 1];
});
//是否加载中
const loading = ref(false);
//表单DOM
const form = ref(null);
//上传框DOM
const fileInput = ref(null);
//错误
const error = reactive({
    show: false,
    message: null
});
//表单数据
const formData = new FormData();
//模型
const model = reactive({
    fileName: null
});
//规则
const rules = {
    fileName: [
        {
            type: 'string',
            required: true,
            message: '请选择文件'
        }
    ]
};

/**
 * 选择文件
 */
const chooseFile = () => {
    fileInput.value.click();
};

/**
 * 导入按钮点击
 */
const importBtnClick = async () => {
    error.show = false;
    error.message = null;
    const success = await form.value.validate().catch(() => false);
    if (!success) {
        return;
    }
    submitImport();
};

/**
 * 取消按钮点击
 */
const cancelBtnClick = () => {
    emits('close', 'cancel');
};

/**
 * 选择的文件改变
 * @param {Event} event 事件
 */
const fileChange = (event) => {
    error.show = false;
    error.message = null;
    const files = event.target.files;
    if (files.length === 0) {
        return;
    }
    const file = files[0];
    if (file.size === 0) {
        error.show = true;
        error.message = '文件大小不能为0';
        return;
    }
    //最大10M
    if (file.size > 1024 * 1024 * 10) {
        error.show = true;
        error.message = '文件体积过大';
        return;
    }
    formData.set(props.inputName, file, file.name);
    model.fileName = file.name;
};

/**
 * 提交导入
 */
const submitImport = () => {
    loading.value = true;
    http.post(
        props.url,
        formData
    ).then((response) => {
        if (!response.isOk) {
            error.show = true;
            error.message = response.data.message;
        } else {
            ElMessage.success(response.data.message);
            emits('close');
        }
    }).catch((err) => {
        error.show = true;
        error.message = err.toString();
    }).finally(() => {
        loading.value = false;
    });
};
</script>
<style lang="scss" scoped>
//导入框容器
.import-container {
    display: flex;
    align-items: center;
    flex: auto;

    :deep(.el-input) {
        flex: auto;
    }

    .upload-container {
        margin-left: 10px;

        input[type=file] {
            display: none;
        }
    }
}

.upload-template {
    text-align: center;
    padding-top: 10px;

    a {
        color: #1e4eb8;
        text-decoration: underline;
    }
}
</style>
