var _path = require('path')
    gulp = require('gulp')
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
    rename = require("gulp-rename");

//Less Plugins
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({ advanced: true });

//Directorio Publico
var path = {
	css: "./public/css",
	js:	"./public/js"
};

//Directorio de fuentes
var directory = {
  bootstrap: {
    css: "./node_modules/bootstrap/less/bootstrap.less",
    js: "./node_modules/bootstrap/js/*.js"
  },
  sources:{
    css: "./sources/less/"
  }
};

// Twitter Bootstrap
gulp.task('bootstrapcss', function () {
  return gulp.src(directory.bootstrap.css)
    .pipe(less({
      plugins: [cleancss],
      paths: [ _path.join(__dirname, 'less') ]

    }))
    .pipe(rename('bootstrap.css'))
    .pipe(gulp.dest(path.css));
});
gulp.task('bootstrapjs', function () {
  return gulp.src(directory.bootstrap.js)
    .pipe(concat('bootstrap.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.js));
});
gulp.task('bootstrap', ['bootstrapcss', 'bootstrapjs']);
// FIN Twitter Bootstrap

//Css Propios
gulp.task('css', function(){
  return gulp.src(directory.sources.css+'myddoc.less')
    .pipe(less({
      plugins: [cleancss]
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(path.css));
});
// FIN Css Propios

//Ver archivos
/*var watcher = gulp.watch(directory.sources.css+'*.less', ['css']);
watcher.on('change', function(event) {
  console.log('Archivo ' + event.path + ' fue ' + event.type + ', Corriendo Tarea...');
});*/

//Accion por defecto
gulp.task('default', ['bootstrap', 'css']);