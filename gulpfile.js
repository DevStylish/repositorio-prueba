const { src, dest, series, parallel } = require("gulp");

const del = require("delete");
const sass = require("gulp-dart-scss");
const sassdoc = require("sassdoc");
const rename = require("gulp-rename");
const compresorHTML = require("gulp-htmlmin");
// const compresorCSS = require("gulp-clean-css");
const compresorCSS = require("gulp-cssmin");
const uglify = require("gulp-uglify-es").default;
// const compresorImagenes = require('gulp-imagemin');
const gulpif = require("gulp-if");


const eliminarDist = (cb)=>{
    del('./dist');
    cb();
}

const generarSass = ()=>{
    return src("./scss/ejercicio.scss").pipe(sass()).pipe(dest("./css/"));
}

const min_and_rename = ()=> {
    return src('./css/*.css')
    .pipe(compresorCSS())
    .pipe(rename({
        basename: 'styles',
        suffix: '.min'
    }))
    .pipe(dest('dist/css'));
}

var doc_options = {
    dest : 'dist/docs'
}
    

const generarSassdoc = ()=>{
    return src("./scss/ejercicio.scss").pipe(sassdoc(doc_options));
}

const moverImagenes = ()=>{
    return src("./img/*").pipe(dest("./dist/img"));
}

const moverHTML = ()=>{
    return src("./index.html").pipe(dest("./dist"));
}

exports.borrar = eliminarDist;
exports.sass = generarSass;
exports.minRen = min_and_rename;
exports.default = series(eliminarDist, generarSassdoc, parallel(generarSass, min_and_rename), moverImagenes, moverHTML);