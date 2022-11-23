module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    extends: ['prettier', 'eslint:recommended'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',

        // codestyle
        'arrow-spacing': ['error'],
        'prefer-const': ['error'],
        camelcase: ['error'],
        'eol-last': ['error'],
        'key-spacing': ['error'],
        'handle-callback-err': ['error'],
        'max-len': 'off',
        'no-console': ['error'],
        'no-duplicate-imports': ['error'],

        // disable to work with prettier
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        indent: 'off',
        quotes: 'off',
        semi: 'off',
        'no-trailing-spaces': 'off',
        'object-curly-spacing': 'off',
        'comma-dangle': 'off',
    },
};
