/**
 * 将服务器的数据字段值经过映射后转为本地字段
 * @param {Object} mapFields 原始字段映射，键为本地字段，值为服务器字段
 * @param {Object} payload 数据对象
 * @param {boolean} only 是否只保留mapFields出现的字段
 * @return {Object}
 */
function assemble(mapFields, payload, only = false) {
    if (typeof payload != 'object') {
        throw new Error('payload must is a plain object')
    }
    payload = JSON.parse(JSON.stringify(payload))
    if (only) {
        let values = Object.values(mapFields)
        Object.keys(payload).forEach((key) => {
            if (values.indexOf(key) === -1) {
                delete payload[key]
            }
        })
    }
    for (let field in mapFields) {
        let property = mapFields[field]
        if (payload.hasOwnProperty(property)) {
            if (field === property) {
                continue
            }
            payload[field] = payload[property]
            delete payload[property]
        }
    }
    return payload
}

/**
 * @see assemble
 * @param {Object} mapFields 原始字段映射
 * @param {Object[]} payloads 数据对象列表
 * @param {boolean} only 是否只保留mapFields出现的字段
 * @return {Object}
 */
function batchAssemble(mapFields, payloads, only = false) {
    return payloads.map((payload) => {
        return assemble(mapFields, payload, only)
    })
}

/**
 * 将本地字段经过映射后转成服务器的数据字段
 * @param {Object} mapFields 原始字段映射，键为本地字段，值为服务器字段
 * @param {Object} payload 数据对象
 * @param {boolean} only 是否只保留mapFields出现的字段
 * @return {Object}
 */
function revert(mapFields, payload, only = false) {
    if (typeof payload != 'object') {
        throw new Error('payload must is a plain object')
    }
    payload = JSON.parse(JSON.stringify(payload))
    if (only) {
        Object.keys(payload).forEach((key) => {
            if (!mapFields.hasOwnProperty(key)) {
                delete payload[key]
            }
        })
    }
    for (let field in mapFields) {
        if (payload.hasOwnProperty(field)) {
            if (field === mapFields[field]) {
                continue
            }
            payload[mapFields[field]] = payload[field]
            delete payload[field]
        }
    }
    return payload
}

export default {
    assemble,
    batchAssemble,
    revert
}
