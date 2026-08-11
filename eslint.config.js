import eslint from '@eslint/js';
// import reactPlugin from 'eslint-plugin-react';
import eslintReact from '@eslint-react/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    // Global ignores
    {
        ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.ts', '.husky/**', 'backup/**', 'docs/**', 'docs-dist/**', 'packages/**', 'scripts/**', 'webpack/**'],
    },

    // Base JavaScript configuration
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2025,
            },
        },
        rules: {
            ...eslint.configs.recommended.rules,
            'no-console': 'warn',
            'no-debugger': 'warn',
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'no-var': 'error',
            'prefer-const': 'error',
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always'],
            quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
            semi: ['error', 'always'],
            'comma-dangle': ['error', 'always-multiline'],
            'brace-style': ['error', '1tbs'],
            curly: ['error', 'all'],
        },
    },

    // TypeScript configuration
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2025,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'react-hooks': reactHooksPlugin,
            // react: reactPlugin,
            '@eslint-react': eslintReact,
            // 'jsx-a11y': jsxA11yPlugin,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            // ...reactPlugin.configs.recommended.rules,
            ...eslintReact.configs.recommended.rules,
            // ...jsxA11yPlugin.configs.recommended.rules,

            // 'jsx-a11y/click-events-have-key-events': 'off',
            // 'jsx-a11y/no-noninteractive-element-interactions': 'off',

            '@typescript-eslint/explicit-module-boundary-types': 0,
            '@typescript-eslint/no-explicit-any': 0,
            // '@typescript-eslint/member-delimiter-style': [
            //     1,
            //     {
            //         multiline: {
            //             delimiter: 'semi',
            //             requireLast: true,
            //         },
            //         singleline: {
            //             delimiter: 'semi',
            //             requireLast: false,
            //         },
            //     },
            // ],
            '@typescript-eslint/ban-types': 0,
            '@typescript-eslint/ban-ts-comment': 0,

            // TypeScript specific rules
            // '@typescript-eslint/no-unused-vars': [
            //     'error',
            //     {
            //         argsIgnorePattern: '^_',
            //         varsIgnorePattern: '^_',
            //     },
            // ],
            // '@typescript-eslint/no-explicit-any': 'warn',
            // '@typescript-eslint/explicit-function-return-type': 'off',
            // '@typescript-eslint/explicit-module-boundary-types': 'off',
            // '@typescript-eslint/no-non-null-assertion': 'warn',
            // '@typescript-eslint/prefer-as-const': 'error',
            // '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

            // React specific rules
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/display-name': 'off',
            'react/jsx-uses-react': 'off',
            // 'react/self-closing-comp': 'warn',
            // 'react/jsx-no-target-blank': 'error',
            'react/no-unescaped-entities': 'off',

            // React Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'off',

            '@eslint-react/no-clone-element': 'off',
            '@eslint-react/no-set-state-in-component-did-mount': 'off',
            '@eslint-react/set-state-in-effect': 'off',
            '@eslint-react/no-children-to-array': 'off',
            '@eslint-react/no-children-for-each': 'off',
            '@eslint-react/naming-convention-ref-name': 'off',
            '@eslint-react/no-array-index-key': 'off',
            '@eslint-react/no-children-count': 'off',
            '@eslint-react/no-children-map': 'off',
            '@eslint-react/use-state': 'off',

            // 要求使用 === 和 !==
            eqeqeq: 0,
            // 要求或禁止使用分号代替 ASI
            semi: [1, 'always'],
            // 强制使用一致的反勾号、双引号或单引号
            quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
            // 要求或禁止末尾逗号
            'comma-dangle': [1, 'always-multiline'],
            // 强制在逗号前后使用一致的空格
            'comma-spacing': [
                1,
                {
                    before: false,
                    after: true,
                },
            ],
            // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
            'no-undef': 1,
            // 禁止数字字面量中使用前导和末尾小数点
            'no-floating-decimal': 2,
            // 禁止使用类似 eval() 的方法
            'no-implied-eval': 2,
            // 禁用 eval()
            'no-eval': 2,
            // 禁用标签语句
            'no-labels': 2,
            // 禁止在循环语句中出现包含不安全引用的函数声明
            'no-loop-func': 0,
            // 禁止使用多个空格
            'no-multi-spaces': 1,
            // 禁止使用多行字符串
            'no-multi-str': 1,
            // 禁止抛出异常字面量
            'no-throw-literal': 2,
            // 禁止在变量定义之前使用它们
            'no-use-before-define': 0,
            // 禁止或强制在代码块中开括号前和闭括号后有空格
            'block-spacing': 1,
            // 强制使用骆驼拼写法命名约定
            camelcase: 0,
            // 强制使用一致的逗号风格
            'comma-style': [1, 'last'],
            // 强制在计算的属性的方括号中使用一致的空格
            'computed-property-spacing': [1, 'never'],
            // 要求或禁止在函数标识符和其调用之间有空格
            'func-call-spacing': [1, 'never'],
            // 强制在对象字面量的属性中键和值之间使用一致的间距
            'key-spacing': 1,
            // 强制在关键字前后使用一致的空格
            'keyword-spacing': 1,
            // 禁止混合使用不同的操作符
            'no-mixed-operators': [
                2,
                {
                    groups: [
                        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                        ['&&', '||'],
                        ['in', 'instanceof'],
                    ],
                    allowSamePrecedence: true,
                },
            ],
            // 禁止出现多行空行
            'no-multiple-empty-lines': [
                1,
                {
                    max: 2,
                    maxEOF: 1,
                    maxBOF: 0,
                },
            ],
            // 禁用嵌套的三元表达式
            'no-nested-ternary': 2,
            // 禁止可以在有更简单的可替代的表达式时使用三元操作符
            'no-unneeded-ternary': 0,
            // 禁止属性前有空白
            'no-whitespace-before-property': 1,
            // 强制在 function的左括号之前使用一致的空格
            'space-before-function-paren': [
                1,
                {
                    anonymous: 'always',
                    named: 'never',
                    asyncArrow: 'always',
                },
            ],
            // 要求操作符周围有空格
            'space-infix-ops': 1,
            // 强制在一元操作符前后使用一致的空格
            'space-unary-ops': 1,
            // 强制分号之前和之后使用一致的空格
            'semi-spacing': 1,
            // 强制在块之前使用一致的空格
            'space-before-blocks': 1,
            // 强制箭头函数的箭头前后使用一致的空格
            'arrow-spacing': 1,
            // 禁止重复模块导入
            'no-duplicate-imports': 0,
            // 要求使用 let 或 const 而不是 var
            'no-var': 1,
            // 禁止不必要的分号
            'no-extra-semi': 2,
            // 禁止出现未使用过的变量
            'no-unused-vars': 0,
            // 禁止空格和 tab 的混合缩进
            'no-mixed-spaces-and-tabs': 2,
            // 强制所有控制语句使用一致的括号风格
            curly: 1,
            // 强制在大括号中使用一致的空格
            'object-curly-spacing': [1, 'always'],
            // 强制大括号内换行符的一致性
            'object-curly-newline': [
                1,
                {
                    consistent: true,
                },
            ],
            // 禁用 console
            'no-console': ['error', { allow: ['warn', 'error'] }],
            // 禁用行尾空格
            'no-trailing-spaces': [
                1,
                {
                    skipBlankLines: true,
                    ignoreComments: true,
                },
            ],
            // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
            'no-unreachable': 2,
            // 禁用 alert、confirm 和 prompt
            'no-alert': 1,
            // 禁用不必要的转义字符
            'no-useless-escape': 1,
            // 禁止使用空解构模式
            'no-empty-pattern': 2,
            // 禁止变量声明与外层作用域的变量同名
            'no-shadow': 0,
            '@typescript-eslint/no-shadow': [
                1,
                {
                    builtinGlobals: false,
                },
            ],
            // 要求使用 const 声明那些声明后不再被修改的变量
            'prefer-const': [
                1,
                {
                    destructuring: 'any',
                    ignoreReadBeforeAssign: true,
                },
            ],
            // 要求一致的 This
            'consistent-this': 2,
            // // General JavaScript rules (override for TS files)
            // 'no-unused-vars': 'off',
            // 'no-console': 'warn',
            // 'no-debugger': 'warn',
            // 'prefer-const': 'error',
            // 'no-var': 'error',
            // quotes: ['error', 'single', { avoidEscape: true }],
            // semi: ['error', 'always'],
            // 'comma-dangle': ['error', 'always-multiline'],
            // 'eol-last': ['error', 'always'],
            // curly: ['error', 'all'],
        },
        settings: {
            react: {
                version: '19',
            },
        },
    },

    // Test files configuration
    {
        files: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'no-console': 'off',
        },
    },
);
