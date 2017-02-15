const gulp              = require('gulp'),
    sass                = require('gulp-sass'),
    uglify              = require('gulp-uglify'),
    cssnano             = require('gulp-cssnano'),
    sourcemaps          = require('gulp-sourcemaps'),
    imagemin            = require('imagemin'),
    autoprefixer 		= require('gulp-autoprefixer'),
    htmlmin				= require('gulp-htmlmin'),
    browserSync         = require('browser-sync').create();


// Evento para automatizar el browser
gulp.task('default', ['css'], function() {

    browserSync.init({
        server: "./app"
    });

    // gulp.watch('file', ['tarea1', 'tarea2', 'tarea3'] ]);
    gulp.watch('./app/js/*.js', ['comprimir']);
    gulp.watch("scss/*.scss", ['css']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
	gulp.watch("./dev/*.html", ['htmlmin']);
});

// Convertir a Sass
gulp.task('css', function() {
    gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./app/css/'))
        .pipe(browserSync.stream());
});

// Autoprefixerr
gulp.task('autoprefijar', function(){ 
    gulp.src('scss/*.scss')
        .pipe(autoprefixer({
        	browsers: ['last 3 versions'],
        	cascade: false
        }))
        .pipe(gulp.dest('app/css/'))
});

// Minificar archivos js
gulp.task('comprimir', function(){
        gulp.src('app/js/*'),
        .pipe(uglify())
        .pipe(gulp.dest('app/js/dist'));
});

// Minificar HTML
gulp.task('htmlmin', function(){
	gulp.src('./dev/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./app'));
});


// Evento para optimizar Imágenes
gulp.task('optimizar', function(){
    gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/img/'));
});

