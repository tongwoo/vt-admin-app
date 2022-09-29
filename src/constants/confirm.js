/*
 * 功能：确认
 * 作者：wutong
 * 日期：2022-09-29
 */

//否
export const CONFIRM_NO = 0

//是
export const CONFIRM_YES = 1

/**
 * 确认数据项列表
 * @return {Array<{name:string,value:string|int}>}
 */
export function getConfirms() {
    return [
        {
            name: '否',
            value: CONFIRM_NO,
        },
        {
            name: '是',
            value: CONFIRM_YES,
        },
    ]
}

/**
 * 获取确认名称
 * @param {string|int} value 要获得名称的值
 * @return {string|null}
 */
export function getConfirmName(value) {
    return getConfirms().find(item => item.value === value)?.name ?? null
}

/**
 * 获取确认使用的样式
 * @param {string|int} value 值
 * @return {string|null}
 */
export function getConfirmClass(value) {
    if (value === CONFIRM_NO) {
        return 'confirm-no'
    } else if (value === CONFIRM_YES) {
        return 'confirm-yes'
    } else {
        return null
    }
}
