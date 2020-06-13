const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const source = 'app/assets/';

function server() {
    browserSync.init({
        server: "app/",
        host:"winlocal",
        port: 57001,
        logPrefix: "Sß.ŞEN"
    });
    watcher()
}

function reload() {
    browserSync.reload();
}

function styleSass() {
    return src(source + 'scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(dest(source + 'css'))
}

function styles() {
    styleSass();
    return src(source + 'css/core.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(source + 'css'))
}

function scripts() {
    return src(source + 'js/*.js')
    .pipe(plumber())
    .pipe(babel({
        presets: [
            ['@babel/env', {
                modules: false
            }]
        ]
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(source + 'js/min'))
}

function watcher(){
    watch([source + 'scss/*.scss'], styles);
    watch([source + 'js/*.js'], scripts);
    watch(['app/*.html'], reload);
}

exports.scripts = scripts;
exports.styles = styles;
exports.server = server;

exports.default = parallel( styles, scripts, server);