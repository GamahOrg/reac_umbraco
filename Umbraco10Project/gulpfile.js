const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');

const rtlcss = require('rtlcss'); // Import RTLCSS directly


// Define the source and destination paths for your SASS files
const paths = {
    sass: './wwwroot/css/sass/**/*.scss', // All SCSS files to watch
    mainSass: './wwwroot/css/sass/style.scss', // Main SCSS file
    mainRTLSass: './wwwroot/css/sass/style-rtl.scss', // Main SCSS file
    cssOutput: './wwwroot/css/css' // Destination for compiled CSS
};

// Compile SCSS to LTR CSS
async function compileLTR() {
    return gulp
        .src(paths.mainSass) // Main SCSS file
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(paths.cssOutput));
    
}

// Generate RTL CSS from LTR CSS
async function compileRTL() {
    return gulp
        .src(paths.mainSass) // Main SCSS file
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // Compile SCSS to CSS
        .pipe(postcss([rtlcss()])) // Process the compiled CSS with RTLCSS
        .pipe(rename({ suffix: '.rtl' })) // Add .rtl suffix to the output file
        .pipe(gulp.dest(paths.cssOutput)); // Save the RTL CSS file

}

// Watch task to automatically compile SASS when files change
function watch() {
    gulp.watch(paths.sass, gulp.series(compileLTR, compileRTL));
}

// Define and export tasks
gulp.task('compileLTR', compileLTR);
gulp.task('compileRTL', compileRTL);
gulp.task('watch', watch);

// Default task
exports.default = gulp.series(compileLTR, compileRTL, watch);
