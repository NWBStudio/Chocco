const { src, dest, task, series, watch, parallel} = require('gulp'); //импорт пакета gulp с перечеслением используемых 
                                                            //методов при помощи деструктурирeщего присваивания


var clean  = require("gulp-clean"); //импорт пакета gulp-clean (плагин реализующий удаление)
var compileSass = require('gulp-sass'); //компиляция sass
var ghPages = require('gulp-gh-pages'); //деплой на GH-Pages
 
compileSass.compiler = require('node-sass'); //указываем что компилятор node, т.к. sass мультиязычный

const browserSync = require('browser-sync').create(); //dev-server
const reload = browserSync.reload; 
const autoprefixer = require('gulp-autoprefixer'); 
const groupMediaQ = require('gulp-group-css-media-queries'); //группировка медиа-запросов
const cleanCSS = require('gulp-clean-css'); //минификация CSS
const sourcemaps = require('gulp-sourcemaps'); //сохраняет в итоговом файле инфу об исходных, не работает одновременно с группировкой медиа-запросов
const babel = require('gulp-babel'); //поддержка ES6 старыми браузерами
const uglify = require('gulp-uglify'); //минификация JS
const concat = require('gulp-concat'); //склейка файлов
const gulpif = require('gulp-if');//работа с условиями

const env = process.env.NODE_ENV; //переменная окружения отвечающая за статус dev/prod

const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config'); //переменные путей и либ из конфига

const styles = [ //массив склеиваемых CSS файлов
    ...STYLE_LIBS,
    "src/css/main.scss"
];

const libs = [ //все js библиотеки и файлы используемые в prod
    ...JS_LIBS,
    "src/js/main.js"
];          
                                                         
task("clean", () => { // написание через метод task выполняет экспорт по-умолчанию 
    return src(`${DIST_PATH}/*`, { read: false }).pipe(clean()); //read false указывает что src
                                                        //просто обратится к файлам без чтения                                                                        
}); 

task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`).pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('copy:img', () => {
    return src(`${SRC_PATH}/img/**/*`).pipe(dest(`${DIST_PATH}/img/`))
    .pipe(reload({ stream: true }));
});

task('copy:sprites', () => {
    return src(`${SRC_PATH}/sprites/**/*`).pipe(dest(`${DIST_PATH}/sprites/`))
    .pipe(reload({ stream: true }));
});

task('copy:fonts', () => {
    return src(`${SRC_PATH}/fonts/**/*`).pipe(dest(`${DIST_PATH}/fonts/`))
    .pipe(reload({ stream: true }));
});

task('copy:video', () => {
    return src(`${SRC_PATH}/video/**/*`).pipe(dest(`${DIST_PATH}/video/`))
    .pipe(reload({ stream: true }));
});


task("compileToCSS", () => {
    return src(styles)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(compileSass())
    .pipe(gulpif(env === 'prod', autoprefixer({
        browsers: ['last 2 versions'], 
        cascade: false //влияет только на внешний вид стилевого файла
      })))
    .pipe(gulpif(env === 'prod', groupMediaQ()))
    .pipe(gulpif(env === 'prod',cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("scripts", () => {
    return src(libs)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(gulpif(env === 'prod', babel({
        presets: ['@babel/env']
      })))
    .pipe(gulpif(env === 'prod', uglify()))      
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: true // открывать или не открывать страницу в браузере при запуске сервера
    });
});

task ("watch", () => {
    watch("./src/css/**/*.scss", series("compileToCSS"));
    watch("./src/js/main.js", series("scripts"));
    watch('./src/*.html', series("copy:html"));
    watch('./src/img/**/*', series("copy:img"));
    watch('./src/sprites/**/*', series("copy:sprites"));
    watch('./src/fonts/**/*', series("copy:fonts"));
});

task('deploy', () => {
    return src(`${DIST_PATH}/**/*`)
    .pipe(ghPages());
});



task("default", 
    series(
        "clean",
        parallel("compileToCSS", "copy:html", "copy:img", "copy:sprites", "copy:fonts", "copy:video", "scripts"),
        parallel("watch", "server")
));

task('build',
    series(
      'clean',
      parallel('copy:html', 'compileToCSS', "copy:img", "copy:sprites", "copy:fonts", 'scripts')
));    