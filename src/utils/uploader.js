import http from "./http.js";
import {readAuthorization} from "./authorize.js";
import {API_PATH_DEFAULT} from "@/constants/api-path.js";

/**
 * 上传组件绑定的属性(用于elementui上传组件)
 * 其他选项参考：https://element.eleme.cn/#/zh-CN/component/upload
 * @return {Object}
 */
function attributes() {
    let headers = {
        Authorization: readAuthorization()
    };
    return {
        //上传的地址
        action: API_PATH_DEFAULT + '/upload/common',
        //上传的请求头部
        headers: headers,
        //是否支持多选文件
        multiple: false,
        //上传时附带的额外参数
        data: {},
        //上传的文件字段名
        name: 'file',
        //是否显示已上传文件列表
        'show-file-list': false,
        //自动上传
        'auto-upload': false,
        //是否启用拖拽上传
        drag: false,
        //接受上传的文件类型 e.g: image/png,image/jpeg
        accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        //是否禁用
        disabled: false,
        //最大允许上传个数
        limit: 1,
    }
}

/**
 * 上传文件
 * @param {File} file File对象
 * @param {Object} params 上传参数，参考 defaults
 * @return {Promise}
 */
function upload(file, params = {}) {
    let defaults = {
        /**
         * 上传的地址
         */
        action: '',

        /**
         * 上传时附带的额外参数
         */
        data: {},

        /**
         * 上传的文件字段名
         */
        name: 'file',

        /**
         * 上传的请求头部
         */
        headers: {},

        /**
         * 上传处理进度事件
         */
        onProgress: function () {
        },
    };
    let options = {...defaults, ...params};
    let form = new FormData();
    Object.keys(options.data).forEach((key) => {
        form.append(key, options.data[key]);
    });
    form.append(options.name, file, file.name)
    return http.post(
        options.action,
        form,
        {
            headers: options.headers,
            onUploadProgress: options.onProgress,
            timeout: 3600000
        }
    );
}

/**
 * 分片上传
 * @param {File} file File对象
 * @param {Object} params 上传参数，参考 下方的 defaults 和 upload.defaults
 * @return {Promise}
 */
async function chunkUpload(file, params = {}) {
    let defaults = {

        /**
         * 分片大小 单位：字节，默认为 1 MB
         */
        chunkSize: 1024 * 1024,

        /**
         * 分片是否成功上传的验证函数
         * @param {Object} response 服务器返回的response
         * @return {{success: boolean, response: *, message: string}}
         */
        validate: function (response) {
            return {
                success: false,
                message: '上传分片失败',
                response: response,
            };
        },

        /**
         * 分片上传失败，代表此次分片上传服务器返回了错误
         */
        onChunkFailed: function () {

        },

        /**
         * 上传出现错误，代表此次分片上传中出现了异常
         */
        onChunkError: function () {
        },

        /**
         * 上传所有分片成功，代表这个file对象已经上传完毕
         */
        onSuccess: function () {
        }
    };
    let options = {...defaults, ...params};
    //共计上传多少次
    let chunkTotal = Math.ceil(file.size / options.chunkSize);
    //分片上传返回的响应数据
    let response = null;
    //循环上传分片内容
    for (let i = 0; i < chunkTotal; i++) {
        //此次分片内容
        let chunkFile = file.slice(i * options.chunkSize, (i + 1) * options.chunkSize);
        chunkFile.name = file.name;
        //分片上传是否成功
        let result = await upload(chunkFile, options).then((res) => {
            response = res;
            return options.validate(res);
        }).catch((err) => {
            options.onChunkError(err);
        });
        if (!result?.success) {
            options.onChunkFailed(result);
            break;
        }
        if (i === chunkTotal - 1) {
            options.onSuccess(response);
        }
    }
}

export default {
    attributes,
    upload,
    chunkUpload,
}
