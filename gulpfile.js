const { src, dest, task, series, watch} = require('gulp'); //импорт пакета gulp с перечеслением используемых 
                                                            //методов при помощи деструктурирeщего присваивания


var clean  = require("gulp-clean"); //импорт пакета gulp-clean (плагин реализующий удаление)
var compileSass = require('gulp-sass'); 
 
sass.compiler = require('node-sass'); //указываем что компилятор node, т.к. sass мультиязычный

task("copy", () => { // написание через метод task выполняет экспорт по-умолчанию 
    return src("./css/*.scss").pipe(dest("dist"));
});                                                            

task("remove", () => { 
    return src("./dist/", { read: false }).pipe(clean()); //read false указывает что src
                                                        //просто обратится к файлам без чтения                                                                        
});    