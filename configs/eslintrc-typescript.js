module.exports = {
    extends: ['./eslintrc-base.js', 'plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint', 'prettier'],
    parser: '@typescript-eslint/parser',
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-var-requires': ['off'],
    },
};
