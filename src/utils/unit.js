/**
 * 文件大小（小数保留2位且不进行四舍五入）
 * @param bytes 字节数
 */
function size(bytes) {
    const description = {
        size: bytes.toString(),
        unit: 'B',
        content: ''
    }
    if (bytes >= 1024 && bytes <= 1048576 - 1) {
        description.size = (bytes / 1024).toFixed(3)
        description.unit = 'KB'
    } else if (bytes >= 1048576 && bytes <= 1073741824 - 1) {
        description.size = (bytes / 1048576).toFixed(3)
        description.unit = 'MB'
    } else if (bytes >= 1073741824 && bytes <= 1099511627776 - 1) {
        description.size = (bytes / 1073741824).toFixed(3)
        description.unit = 'GB'
    } else if (bytes >= 1099511627776 && bytes <= 1125899906842624 - 1) {
        description.size = (bytes / 1099511627776).toFixed(3)
        description.unit = 'TB'
    } else if (bytes >= 1125899906842624) {
        description.size = (bytes / 1125899906842624).toFixed(3)
        description.unit = 'PB'
    }
    let pointIndex = description.size.indexOf('.')
    description.size = description.size.substring(0, pointIndex + 3)
    description.content = description.size + description.unit
    return description
}

export default {
    size
}
