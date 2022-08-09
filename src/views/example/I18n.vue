<!--
功能：多语言实例
日期：2022-06-23
-->
<template>
    <div class="page-container">
        <div class="page-segment">
            <div class="segment-header with-bordered">
                <div class="header-title">{{ $i18n.t('example.example') }}</div>
            </div>
            <div class="segment-body">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form label-width="100px" label-suffix=":">
                            <el-form-item :label="$t('example.select_language')">
                                {{ $t('example.select_language_tip') }}
                            </el-form-item>
                            <el-form-item :label="$t('example.real_name')">
                                <el-input v-model="model.name"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('example.gender')">
                                <el-radio-group>
                                    <el-radio label="1">{{ $t('example.male') }}</el-radio>
                                    <el-radio label="0">{{ $t('example.female') }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item :label="$t('example.region')">
                                <el-select class="mr-10"></el-select>
                                <el-select></el-select>
                            </el-form-item>
                            <el-form-item :label="$t('example.id_number')">
                                <el-input v-model.number="model.idNumber" :maxlength="18"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('example.birthday')">
                                <el-date-picker v-model="model.birthday"></el-date-picker>
                            </el-form-item>
                            <el-form-item :label="$t('example.address')">
                                <el-input :placeholder="$t('example.address_placeholder')"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('example.profile')">
                                <el-input type="textarea" :rows="5"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" round><i class="bi bi-check-circle el-icon--left"></i>{{ $t('example.submit') }}</el-button>
                                <el-button type="default" round><i class="bi bi-x-circle el-icon--left"></i>{{ $t('example.cancel') }}</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <el-calendar v-model="model.calendar"/>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive} from "vue"
import {useStore} from "vuex"

const store = useStore()

const model = reactive({
    name: null,
    idNumber: null,
    birthday: null,
    calendar: null
})

/**
 * 语言改变
 */
const languageChange = (lang) => {
    store.commit('setting/UPDATE_LANGUAGE', {
        language: lang
    })
}
</script>

<style lang="scss" scoped>

</style>
