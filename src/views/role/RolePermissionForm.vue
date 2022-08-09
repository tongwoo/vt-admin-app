<template>
    <div class="form-container" v-loading="loading">
        <el-tree class="permission-box" v-if="permissions.length>0" ref="tree" :props="treeProps" node-key="id" :data="permissions" show-checkbox accordion></el-tree>
        <el-empty v-else></el-empty>
        <div class="error-container" v-if="errorMessage!==null">
            <el-alert type="error" :description="errorMessage" :closable="false" show-icon></el-alert>
        </div>
        <div class="footer-container" v-if="permissions.length>0">
            <el-button type="default" @click="cancelBtnClick"><i class="bi bi-x-circle-fill el-icon--left"></i>取消</el-button>
            <el-button type="primary" @click="saveBtnClick" native-type="submit"><i class="bi bi-check-circle-fill el-icon--left"></i>保存</el-button>
        </div>
    </div>
</template>

<script setup>
import {nextTick, onMounted, reactive, ref} from "vue";
import http from "@/utils/http.js";
import {ElMessage as messageTip} from "element-plus";
import {httpErrorHandler} from "@/utils/error.js";
import {fetchPermissionTree} from "@/modules/permission.js";
import {fetchRolePermissions} from "@/modules/role.js";

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
//权限树
const tree = ref(null);
//错误
const errorMessage = ref(null);
//权限集合
const permissions = ref([]);
//权限树选项
const treeProps = {
    value: 'id',
    label: 'description',
    children: 'children'
};
//模型
const model = reactive({
    //主键
    id: null,
    //名称
    name: null,
    //描述
    description: null,
});

/**
 * 初始化
 */
onMounted(async () => {
    loading.value = true;
    Promise.all([
        //载入所有权限（嵌套结构）
        await loadPermissions(),
        //载入此角色拥有的权限列表（平级结构）
        await loadRolePermissions()
    ]).catch(httpErrorHandler).finally(() => {
        loading.value = false;
    });
});

/**
 * 加载所有权限列表
 */
const loadPermissions = () => {
    return fetchPermissionTree().then((items) => {
        permissions.value = items;
    });
};

/**
 * 加载角色拥有的权限列表
 */
const loadRolePermissions = () => {
    return fetchRolePermissions(props.payload.id).then((items) => {
        nextTick(() => {
            //需要循环调用设置每个复选框的选中情况
            items.forEach((item) => {
                tree.value.setChecked(item.id, true, false);
            });
        });
    });
};

/**
 * 提交保存
 */
const submitSave = (data) => {
    errorMessage.value = null;
    loading.value = true;
    return http.post(
        '/role/bind',
        data
    ).then((response) => {
        if (!response.isOk) {
            errorMessage.value = response.data.message;
        } else {
            messageTip.success(response.data.message);
            emits('close');
        }
    }).finally(() => {
        loading.value = false;
    });
};

/**
 * 保存按钮点击
 */
const saveBtnClick = () => {
    //选中的
    const keys = tree.value.getCheckedKeys();
    //半选中的（服务端如不要则移除）
    const halfKeys = tree.value.getHalfCheckedKeys();
    //两者合并
    const permissionIds = [...keys, ...halfKeys];
    //提交保存
    submitSave({
        id: props.payload.id,
        permissions: permissionIds
    });
};

/**
 * 取消保存按钮点击
 */
const cancelBtnClick = () => {
    emits('close');
};
</script>

<style lang="scss" scoped>
.permission-box {
    border: 1px solid #eee;
    margin-bottom: 10px;
    max-height: 300px;
    overflow: auto
}
</style>
