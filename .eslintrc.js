module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    globals: {
        defineExpose: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineOptions: 'readonly',
        defineModel: 'readonly'
    },
    plugins: ['vue', '@typescript-eslint'],

    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
      'vue/no-deprecated-v-on-native-modifier':'off',
      'no-prototype-builtins':'off',
      'vue/no-mutating-props':'off',
        'no-unused-vars': [
            1,
            {
                vars: 'all',
                args: 'none'
            }
        ],
        'vue/html-self-closing': [
            1,
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        eqeqeq: 'warn',
        'prefer-const': 1,
        'prefer-arrow-callback': 0, //要求回调函数使用箭头函数
        camelcase: 0, // 双峰驼命名格式
        strict: 2, //使用严格模式
        'no-extra-label:': 0, // 禁用不必要的标签
        'prefer-spread': 0, //首选展开运算
        'id-match': 0, //命名检测
        'no-var': 'error', // 要求或禁止 var 声明中的初始化
        'no-extra-boolean-cast': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-unused-expressions': 'off',
        'no-shadow': 0,
        'no-console': process.env.VITE_NODE_ENV === 'production' ? 'warn' : 'off',
        // Vue: Recommended rules to be closed or modify
        'vue/require-default-prop': 0,
        'vue/singleline-html-element-content-newline': 0,
        'vue/max-attributes-per-line': 0,
        // Vue: Add extra rules
        //'vue/custom-event-name-casing': [2, 'camelCase'],
        'vue/no-v-text': 1,
        'vue/padding-line-between-blocks': 1,
        'vue/require-direct-export': 1,
        'vue/multi-word-component-names': 0,
        // Allow @ts-ignore comment
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'no-debugger': process.env.VITE_NODE_ENV === 'production' ? 2 : 0,
        'no-param-reassign': 0,
        'prefer-regex-literals': 0,
        'no-empty': 'warn',
        'import/no-extraneous-dependencies': 0,
        '@typescript-eslint/ban-types': 0
    }
};
