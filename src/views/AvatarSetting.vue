<!--
功能：用户头像设置
日期：2022-06-16
-->
<template>
    <div class="avatar-container" v-loading="loading">
        <div class="maintain">
            <div class="editor">
                <vueCropper
                    ref="cropper"
                    :img="model.img"
                    :autoCrop="true"
                    :autoCropWidth="200"
                    :autoCropHeight="200"
                    :fixed="true"
                    :fixedBox="true"
                    @realTime="previewCallback"
                    outputType="png"
                ></vueCropper>
            </div>
            <div class="preview">
                <div>当前头像</div>
                <div class="preview-image">
                    <img :src="store.state.user.avatar">
                </div>
                <div>新头像</div>
                <div v-if="preview.style!==null && preview.data!==null" class="preview-image">
                    <div :style="preview.style">
                        <div :style="preview.data.div">
                            <img :src="preview.data.url" :style="preview.data.img">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="toolbar">
            <div class="upload-container">
                <el-button type="primary" @click="fileInput.click();"><i class="bi bi-image el-icon--left"></i>选择图片</el-button>
                <el-button type="primary" @click="saveAvatar"><i class="bi bi-upload el-icon--left"></i>保存头像</el-button>
                <input ref="fileInput" type="file" @change="chooseFile" accept="image/jpg,image/jpeg,image/png">
            </div>
        </div>
    </div>
</template>

<script setup>
import 'vue-cropper/dist/index.css'
import {VueCropper} from "vue-cropper";
import {ref, reactive, computed} from "vue";
import {useStore} from "vuex";
import {ElMessage as messageTip, ElMessageBox as messageBox} from "element-plus";
import http from "@/common/utils/http.js";
import {httpErrorHandler} from "@/common/utils/error.js";

const store = useStore();

//加载中
const loading = ref(false);

//属性
const props = defineProps({
    //用户ID
    id: Number
});

//事件
const emits = defineEmits(['close']);

//剪裁DOM
const cropper = ref(null);
//文件浏览框DOM
const fileInput = ref(null);

//模型
const model = reactive({
    img: null
});

const preview = reactive({
    data: null,
    style: null
});

/**
 * 预览
 */
const previewCallback = (data) => {
    preview.style = {
        width: data.w + "px",
        height: data.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: 200 / Math.max(data.w, data.h)
    }
    preview.data = data;
};

/**
 * 文件变更
 */
const chooseFile = (e) => {
    if (e.target.files.length === 0) {
        messageTip.error('请选择图片');
        return;
    }
    const file = e.target.files[0];
    if (file.size === 0) {
        messageTip.error('图片异常');
        return;
    }
    model.img = URL.createObjectURL(file);
};

/**
 * 保存头像
 */
const saveAvatar = () => {
    try {
        cropper.value.getCropBlob((data) => {
            const formData = new FormData();
            formData.append('file', data, '头像.png');
            loading.value = true;
            http.post(
                '/upload/avatar',
                formData
            ).then((response) => {
                if (response.isOk) {
                    store.commit('user/UPDATE', {
                        avatar: response.data.data.url
                    });
                    emits('close');
                }
            }).catch(httpErrorHandler).finally(() => {
                loading.value = false;
            });
        });
    } catch (e) {
        messageBox.alert('图片有误', '提示')
    }
};
</script>

<style lang="scss" scoped>
.avatar-container {
    .maintain {
        display: flex;
        gap: 20px;
        justify-content: center;

        .editor {
            width: 440px;
            height: 440px;
            border: 1px solid #aaa;
            box-sizing: border-box;
        }

        .preview {
            .preview-image {
                border: 1px solid #aaa;
                box-sizing: border-box;
                width: 200px;
                height: 200px;

                img{
                    width: 100%;
                }
            }
        }
    }

    .toolbar {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        gap: 20px;
    }
}

.upload-container {
    margin-left: 10px;

    input[type=file] {
        display: none;
    }
}
</style>
