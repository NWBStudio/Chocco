const { src, dest, task, series, watch} = require('gulp'); //импорт пакета gulp с перечеслением используемых 
                                                            //методов при помощи деструктурирeщего присваивания


var clean  = require("gulp-clean"); //импорт пакета gulp-clean (плагин реализующий удаление)
var compileSass = require('gulp-sass'); //компиляция sass
 
compileSass.compiler = require('node-sass'); //указываем что компилятор node, т.к. sass мультиязычный

const autoprefixer = require('gulp-autoprefixer'); 
const groupMediaQ = require('gulp-group-css-media-queries'); //группировка медиа-запросов
const cleanCSS = require('gulp-clean-css'); //минификация CSS
const sourcemaps = require('gulp-sourcemaps'); //сохраняет в итоговом файле инфу об исходных, не работает одновременно с группировкой медиа-запросов
const concat = require('gulp-concat'); //склейка файлов
const styles = [ //массив склеиваемых файлов
    "./node_modules/normalize.css/normalize.css",
    "./css/main.scss"
];

task("copy", () => { // написание через метод task выполняет экспорт по-умолчанию 
    return src("./css/*.scss").pipe(dest("dist"));
});                                                            

task("clean", () => { 
    return src("./dist/**/*", { read: false }).pipe(clean()); //read false указывает что src
                                                        //просто обратится к файлам без чтения                                                                        
}); 

task("compileToCSS", () => {
    return src(styles)
    .pipe(concat('main.scss'))
    .pipe(compileSass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'], 
        cascade: false //влияет только на внешний вид стилевого файла
      }))
    .pipe(groupMediaQ())
    .pipe(cleanCSS())
    // .pipe(sourcemaps.write())
    .pipe(dest("./dist/"));
});


watch("./css/**/*.scss", series("compileToCSS"));

task("default", series("clean", "compileToCSS"));