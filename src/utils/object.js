/**
 * 克隆一个对象，这个对象必须是 plain object
 * @param target 待克隆的对象
 * @returns {Object}
 */
export function cloneObject(target) {
    return JSON.parse(JSON.stringify(target))
}

/**
 * 递归更新 target 的所有属性值到 source 对象同名属性，如果不同名则不更新，只支持 plain object
 * @param source 将被新属性值覆盖的源对象
 * @param target 待拷贝属性的对象
 * @returns {*}
 */
export function updateObject(source, target) {
    Object.keys(target).forEach((key) => {
        if (source.hasOwnProperty(key)) {
            //如果是 object 且不是数组，则继续更新
            if ((source[key] instanceof Object) && source[key].constructor.name === 'Object' && !Array.isArray(source[key])) {
                updateObject(source[key], target[key])
            } else {
                source[key] = target[key]
            }
        }
    })
}
