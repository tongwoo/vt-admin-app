<!--
功能：编辑器示例
日期：2022-06-17
-->
<template>
    <div class="page-container">
        <div class="page-segment">
            <div class="segment-header with-bordered">
                <div class="header-title">内容编辑器示例</div>
            </div>
            <div class="segment-body">
                <ckeditor ref="ddd" :editor="model.editor" v-model="model.content" :config="model.config"></ckeditor>
            </div>
        </div>
        <div class="page-segment">
            <div class="segment-header with-bordered">
                <div class="header-title">内容源代码</div>
            </div>
            <div class="segment-body">
                <pre class="content-code">{{ model.content }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue";
import classicEditor from 'ckeditor5-custom-build/build/ckeditor.js';
import {API_PATH_DEFAULT} from "@/common/constants/ApiPath.js";
import {useStore} from "vuex";

const store = useStore();
const model = reactive({
    dom: ref(null),
    editor: classicEditor,
    content: `
        <h2>天气情况</h2>
        <p>
        今天的天气很不错
        </p>
    `,
    config: {
        plugins: classicEditor.builtinPlugins.filter((plugin) => {
            //不使用Title插件和Markdown
            return plugin.pluginName !== 'Title' && plugin.pluginName !== 'Markdown';
        }),
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'fontFamily',
                'fontSize',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'bold',
                'italic',
                'strikethrough',
                'underline',
                'link',
                'removeFormat',
                'bulletedList',
                'numberedList',
                'todoList',
                '|',
                'alignment',
                'outdent',
                'indent',
                'imageUpload',
                'blockQuote',
                'insertTable',
                'sourceEditing',
            ],
            shouldNotGroupWhenFull: true
        },
        //文件上传
        simpleUpload: {
            uploadUrl: API_PATH_DEFAULT + '/upload/editor',
            withCredentials: true,
            headers: {
                Authorization: store.state.user.authorization
            }
        }
    }
});
</script>

<style lang="scss" scoped>
.page-container {
    display: flex;
    gap: 10px;

    .page-segment {
        flex: 1;
        margin-bottom: 0;

        &:first-child {
            flex: none;
            width: 700px;
        }
    }
}

:deep(.ck.ck-content:not(.ck-comment__input *)) {
    height: calc(100vh - 280px);
    overflow-y: auto;
}

.content-code {
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 20px;
    white-space: pre-line;
    background-color: #fafafa;
    box-sizing: border-box;
}
</style>
