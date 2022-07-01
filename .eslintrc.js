module.exports = {
    root: true,
    env: {
        browser: true
    },
    extends: [
        'plugin:vue/vue3-essential'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        "object-curly-spacing": 0,
        "indent": 0,
        "no-debugger": 0,
        "no-prototype-builtins": 0,
        "camelcase": 1,
        "no-tabs": 1,
        "no-inline-comments": 0,
        "no-empty": 0,
        "no-unreachable": 0,
        "no-console": 0,
        "no-undef": 0,
        "no-unused-vars": 0,
        "newline-per-chained-call": 0,
        "vue/no-unused-components": 0,
        "vue/no-unused-vars": 0,
        "vue/no-parsing-error": [
            2,
            {
                "x-invalid-end-tag": false
            }
        ]
    }
}
