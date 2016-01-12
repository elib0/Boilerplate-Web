var _path = require('path')
	gulp = require('gulp')
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

//Less Plugins
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({ advanced: true });

//Paths
var path = {
	css: "./public/css",
	js:	"./public/js"
};

var directory = {
	bootstrap: {
		css: "./node_modules/bootstrap/less/bootstrap.less",
		js: "./node_modules/bootstrap/js/*.js"
	}
};

// Twitter Bootstrap
gulp.task('bootstrapcss', function () {
  return gulp.src(directory.bootstrap.css)
    .pipe(less({
      plugins: [cleancss],
      paths: [ _path.join(__dirname, 'less') ],
      filename: 'bootstrap.less'
   	}))
    .pipe(gulp.dest(path.css));
});
gulp.task('bootstrapjs', function () {
  return gulp.src(directory.bootstrap.js)
    .pipe(concat('bootstrap.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.js));
});
gulp.task('bootstrap', ['bootstrapcss', 'bootstrapjs']);
// END Twitter Bootstrap

//Default actions for gulp files
gulp.task('default', ['bootstrap']);