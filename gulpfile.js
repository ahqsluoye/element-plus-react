/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const through = require('through2');
// const rename = require('gulp-rename');
// 获取 minify-css 模块（用于压缩 CSS）
// const babel = require('gulp-babel');
// const babelrc = require('./babel.config');
// const ts = require('gulp-typescript');
// const tsProject = ts.createProject('tsconfig.json');
const rename = require('gulp-rename');

const srcRoot = path.join(__dirname, './src');
const libRoot = path.join(__dirname, './packages/lib');
const styleRoot = path.join(__dirname, './packages/dist');
const tsSources = [`${srcRoot}/components/**/*.tsx`, `${srcRoot}/components/**/*.ts`, `${srcRoot}/config/**/*.ts`, `!${srcRoot}/**/*.d.ts`];

function clean(done) {
    del.sync([styleRoot], { force: true });
    done();
}
function cleanTemp(done) {
    del.sync([path.join(__dirname, './lib')], { force: true });
    done();
}
// function cleanES(done) {
//     del.sync([esRoot], { force: true });
//     done();
// }

// /**
//  * 编译type文件
//  * @returns
//  */
// function buildDts() {
//     return gulp
//         .src(tsSources, {
//             ignore: ['**/demos/**/*', '**/tests/**/*', '*.patch.less'],
//         })
//         .pipe(tsProject())
//         .dts.pipe(gulp.dest(libRoot));
// }

// function buildTypings() {
//     return gulp.src(`${srcRoot}/typings/**.ts`).pipe(tsProject()).dts.pipe(gulp.dest('lib/es/typings')).pipe(gulp.dest('lib/cjs/typings'));
// }

// function buildIndex() {
//     return gulp
//         .src(`${srcRoot}/components/index.ts`)
//         .pipe(babel(babelrc))
//         .pipe(
//             babel({
//                 plugins: ['./babel-transform-sass-to-css'],
//             }),
//         )
//         .pipe(gulp.dest(libRoot));
// }

// /**
//  * 编译js文件
//  * @returns
//  */
// function buildComponents() {
//     return gulp
//         .src(tsSources, {
//             ignore: ['**/demos/**/*', '**/tests/**/*', '*.patch.less'],
//         })
//         .pipe(babel(babelrc))
//         .pipe(
//             babel({
//                 plugins: ['./babel-transform-sass-to-css', './babel-plugin-module-resolver'],
//             }),
//         )
//         .pipe(gulp.dest('lib/es'));
//     // .pipe(gulp.dest(libRoot));
// }

// const buildES = gulp.parallel(/* buildIndex,  */ buildComponents);

// function buildCJS() {
//     return (
//         gulp
//             .src(['lib/es/**/*.js'])
//             .pipe(
//                 babel({
//                     plugins: ['@babel/plugin-transform-modules-commonjs'],
//                 }),
//             )
//             // .pipe(gulp.dest('lib/cjs/'));
//             .pipe(gulp.dest(libRoot))
//     );
// }

function buildComponentStyles() {
    return gulp
        .src(`${srcRoot}/theme-chalk/build.scss`)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename('index.css'))
        .pipe(gulp.dest(styleRoot));
}

function generatePackageJSON() {
    return gulp
        .src('./package.json')
        .pipe(
            through.obj((file, enc, cb) => {
                const rawJSON = file.contents.toString();
                const parsed = JSON.parse(rawJSON);
                delete parsed.scripts;
                delete parsed.peerDependencies;
                delete parsed.devDependencies;
                delete parsed.publishConfig;
                const stringified = JSON.stringify(parsed, null, 2);
                file.contents = Buffer.from(stringified);
                cb(null, file);
            }),
        )
        .pipe(gulp.dest('./packages/'));
}

function generateReadme() {
    return gulp
        .src('./README.md')
        .pipe(
            through.obj((file, enc, cb) => {
                const rawJSON = file.contents.toString();
                file.contents = Buffer.from(rawJSON);
                cb(null, file);
            }),
        )
        .pipe(gulp.dest('./packages/'));
}

/**
 * 复制json文件
 * @returns
 */
// function copyJson() {
//     return gulp.src(srcRoot + '/components/config/icons.json').pipe(gulp.dest(libRoot + '/config'));
// }

/**
 * 编译ts(x)文件
 */
// const buildJs = gulp.parallel(buildDts, buildComponents, buildComponentStyles);

// exports.build = gulp.series(clean, buildJs /* , buildCJS, cleanES */);

// exports.build = gulp.series(clean, buildES, buildCJS, gulp.parallel(gulp.series(buildDts /* , buildTypings */), buildComponentStyles, generatePackageJSON), cleanTemp);
exports.build = gulp.parallel(buildComponentStyles, generatePackageJSON, generateReadme);
exports.clean = clean;
