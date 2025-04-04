/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const through = require('through2');
const rename = require('gulp-rename');
const fs = require('fs');

const srcRoot = path.join(__dirname, './src');
const styleRoot = path.join(__dirname, './packages/dist/');

function clean(done) {
    del.sync([styleRoot], { force: true });
    done();
}

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
                // delete parsed.peerDependencies;
                delete parsed.devDependencies;
                delete parsed.publishConfig;
                delete parsed.commitlint;
                delete parsed['lint-staged'];
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

function copyFiles(srcPath, destPath) {
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
    }
    const files = fs.readdirSync(srcPath);
    files.forEach(item => {
        const stat = fs.statSync(srcPath + item);
        if (stat.isDirectory()) {
            //递归读取文件
            copyFiles(srcPath + item + '/', destPath + item + '/');
        } else {
            fs.copyFile(srcPath + item, destPath + item, function (err) {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log('something wrong was happened');
                }
            });
        }
    });
}

function generateFonts() {
    copyFiles(`${srcRoot}/theme-chalk/fonts/`, path.join(__dirname, './packages/dist/fonts/'));
    copyFiles(`${srcRoot}/theme-chalk/`, path.join(__dirname, './packages/theme-chalk/'));
    return gulp.src('./empty', { allowEmpty: true }).pipe(gulp.dest('./packages/dist/fonts/'));
}

exports.build = gulp.series(gulp.parallel(buildComponentStyles, generatePackageJSON, generateReadme, generateReadme), generateFonts);
exports.clean = clean;
