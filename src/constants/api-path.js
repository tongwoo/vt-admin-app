//API反向代理路径前缀，在需要对接不同接口地址的的情况下有用

//默认
const API_PATH_DEFAULT = process.env.VUE_APP_BASE_API

//天气
const API_PATH_WEATHER = '/weather'

export {
    API_PATH_DEFAULT,
    API_PATH_WEATHER
}
