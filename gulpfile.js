// function task( callback ) {
//     console.log('my first task');

//     callback();// Now we now that the code ends
// }

// exports.taskk = task; // if you want to execute the function
// // in the terminal: npx gulp taskk

const { src, dest, watch, parallel} = require("gulp");

//CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

// Images
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css(done){
    

    src('src/scss/**/*.scss') // Identify sass document  // with the /**/*.scss gulp will search all the docs with .scss
        .pipe(plumber())//if there is an error, the work flow won´t stop
        .pipe( sass() )// Compile
        .pipe(dest("build/css"));// Save in the disk

    done();// Callback that warns gulp when we finish
}

function images(done){
    const options ={
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache(imagemin(options)))
        .pipe(dest('build/img'))

    done();
}

function webpVersion (done){ // Transforms png and jpg to webp
    const options ={
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( webp(options) )
        .pipe(dest('build/img'));
    done();
}

function avifVersion (done){ // Transforms png and jpg to webp
    const options ={
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( avif(options) )
        .pipe(dest('build/img'));
    done();
}
function dev(done){
    watch('src/scss/**/*.scss', css) // When the file changes, the function dev call the function css
    done();
}
exports.css = css;
exports.img = images;
exports.webp = webpVersion;
exports.avif = avifVersion;
exports.dev2 = parallel(avifVersion, images, webpVersion, dev);















