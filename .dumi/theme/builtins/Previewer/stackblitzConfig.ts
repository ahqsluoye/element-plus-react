import type { Project, ProjectFiles } from '@stackblitz/sdk';
import { IPreviewerProps } from 'dumi';

interface StackblitzConfigOptions {
    title?: string;
    dependencies: Record<PropertyKey, string>;
    devDependencies: Record<PropertyKey, string>;
    props: IPreviewerProps;
}

const getStackblitzConfig = (options: StackblitzConfigOptions) => {
    const { title = '', dependencies, devDependencies, props } = options;
    const packageJSON = {
        name: 'vite-react-typescript-starter',
        private: true,
        version: '0.0.0',
        type: 'module',
        scripts: {
            dev: 'vite',
            build: 'tsc -b && vite build',
            lint: 'eslint .',
            preview: 'vite preview',
        },
        dependencies,
        devDependencies: {
            '@eslint/js': '^9.32.0',
            '@types/node': '^24.0.0',
            '@types/react': '^19.1.9',
            '@types/react-dom': '^19.1.7',
            '@vitejs/plugin-react': '^4.7.0',
            eslint: '^10.7.0',
            'eslint-plugin-react': '^7.37.5',
            'eslint-plugin-react-hooks': '^7.1.1',
            globals: '^17.7.0',
            sass: '^1.101.0',
            'sass-loader': '^17.0.0',
            typescript: '~5.8.3',
            'typescript-eslint': '^8.64.0',
            vite: '^7.0.6',
            ...devDependencies,
        },
    };

    const tsconfigAppJSON = {
        compilerOptions: {
            tsBuildInfoFile: './node_modules/.tmp/tsconfig.app.tsbuildinfo',
            target: 'ES2022',
            useDefineForClassFields: true,
            lib: ['ES2022', 'DOM', 'DOM.Iterable'],
            module: 'ESNext',
            skipLibCheck: true,

            /* Bundler mode */
            moduleResolution: 'bundler',
            allowImportingTsExtensions: true,
            verbatimModuleSyntax: true,
            moduleDetection: 'force',
            noEmit: true,
            jsx: 'react-jsx',

            /* Linting */
            strict: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            erasableSyntaxOnly: true,
            noFallthroughCasesInSwitch: true,
            noUncheckedSideEffectImports: true,
        },
        include: ['src'],
    };
    const tsconfigNodeJSON = {
        compilerOptions: {
            tsBuildInfoFile: './node_modules/.tmp/tsconfig.node.tsbuildinfo',
            target: 'ES2023',
            lib: ['ES2023'],
            module: 'ESNext',
            skipLibCheck: true,

            /* Bundler mode */
            moduleResolution: 'bundler',
            allowImportingTsExtensions: true,
            verbatimModuleSyntax: true,
            moduleDetection: 'force',
            noEmit: true,

            /* Linting */
            strict: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            erasableSyntaxOnly: true,
            noFallthroughCasesInSwitch: true,
            noUncheckedSideEffectImports: true,
        },
        include: ['vite.config.ts'],
    };

    const tsconfigJSON = {
        files: [],
        references: [{ path: './tsconfig.app.json' }, { path: './tsconfig.node.json' }],
    };

    let files: ProjectFiles = {
        // demo.tsx
        [`src/demo.tsx`]: props.asset.dependencies['index.tsx'].value,
        'src/index.scss': `.m-0 {
    margin: 0rem;
}

.m-1 {
    margin: 0.25rem;
}

.m-2,
[m~='\\32 '] {
    margin: 0.5rem;
}

.m-4,
[m~='\\34 '] {
    margin: 1rem;
}

.m-auto,
[m~='auto'] {
    margin: auto;
}

[m~='-\\32 '] {
    margin: -0.5rem;
}

.mx-1 {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
}

.mx-4 {
    margin-left: 1rem;
    margin-right: 1rem;
}

.my,
.my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.my-2 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

[m~='y-12'] {
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.m-b-2px {
    margin-bottom: 2px;
}

.m-r-8px {
    margin-right: 8px;
}

.m-t-16px {
    margin-top: 16px;
}

.m-t-2px,
.mt-2px {
    margin-top: 2px;
}

.mb-1,
[mb-1=''] {
    margin-bottom: 0.25rem;
}

.mb-2,
[m~='b-2'],
[mb-2=''] {
    margin-bottom: 0.5rem;
}

.mb-3 {
    margin-bottom: 0.75rem;
}

.mb-4 {
    margin-bottom: 1rem;
}

.me {
    margin-inline-end: 1rem;
}

.ml-1 {
    margin-left: 0.25rem;
}

.ml-2 {
    margin-left: 0.5rem;
}

.ml-3 {
    margin-left: 0.75rem;
}

.ml-4 {
    margin-left: 1rem;
}

.mr-1 {
    margin-right: 0.25rem;
}

.mr-2 {
    margin-right: 0.5rem;
}

.mr-3 {
    margin-right: 0.75rem;
}

.mr-4 {
    margin-right: 1rem;
}

.mt-1 {
    margin-top: 0.25rem;
}`,
        // package.json
        'package.json': JSON.stringify(packageJSON, null, 4),
        // index.html
        'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width">
  </head>
  <body>
    <div id="container" style="padding: 24px" />
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
        // main.tsx
        [`src/main.tsx`]: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@qsxy/element-plus-react/dist/index.css';
import './index.scss';
import Demo from './demo';

createRoot(document.getElementById('container')!).render(
  <StrictMode>
    <Demo />
  </StrictMode>
);`,
        // vite.config.ts
        'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})`,
        // .stackblitzrc
        '.stackblitzrc': `{
  "installDependencies": false,
  "startCommand": "pnpm i & pnpm dev",
  "env": {
    "NODE_ENV": "development"
  }
}`,
        // .gitignore
        '.gitignore': `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local`,
        // eslint.config.js
        'eslint.config.js': `import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
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
            react: reactPlugin,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,

            '@typescript-eslint/explicit-module-boundary-types': 0,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/ban-types': 0,
            '@typescript-eslint/ban-ts-comment': 0,

            // React specific rules
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/display-name': 'off',
            'react/jsx-uses-react': 'off',
            'react/self-closing-comp': 'warn',
            'react/jsx-no-target-blank': 'error',
            'react/no-unescaped-entities': 'off',

            // React Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

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
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    // extends: [
    //   js.configs.recommended,
    //   tseslint.configs.recommended,
    //   reactHooks.configs['recommended-latest'],
    //   reactRefresh.configs.vite,
    // ],
    // languageOptions: {
    //   ecmaVersion: 2020,
    //   globals: globals.browser,
    // },
  },
])
`,
        'tsconfig.json': JSON.stringify(tsconfigJSON, null, 4),
        'tsconfig.app.json': JSON.stringify(tsconfigAppJSON, null, 4),
        'tsconfig.node.json': JSON.stringify(tsconfigNodeJSON, null, 4),
        '.npmrc': `registry=https://registry.npmmirror.com/`,
        ...Object.keys(props.asset.dependencies).reduce((prev, item) => {
            const file = props.asset.dependencies[item];
            if (file.type === 'FILE' && item !== 'index.tsx') {
                const fileName = item.split('/').pop();
                prev[`src/${fileName}`] = file.value;
            }
            return prev;
        }, {}),
    };

    // if (indexCssContent) {
    //     files = { ...files, 'src/index.css': indexCssContent };
    // }

    const project: Project = { title, description: '', template: 'node', files };
    return project;
};

export default getStackblitzConfig;
