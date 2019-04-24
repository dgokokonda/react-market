module.exports = {
    extends: ['eslint:recommended', 'google'],
    parser: "babel-eslint",
    plugins: [
        'jquery',
    ],
    env: {
        "browser": true,
        "node": true
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-debug': process.env.NODE_ENV === 'production' ? 2 : 0,
        'require-jsdoc': 0,
        'no-invalid-this': 0,
        'linebreak-style': 0,
        'max-len': [2, {"code": 85}]
    }
}
