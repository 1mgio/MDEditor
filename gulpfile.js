var path     = require('path');
var gulp     = require('gulp');
var gutil    = require('gulp-util');
var concat   = require('gulp-concat');
var uglify   = require('gulp-uglify');
var rename   = require('gulp-rename');
var filesize = require('gulp-filesize');
// var changed  = require('gulp-changed');
// var watch    = require('gulp-watch');

var preserveFirstComment = function() {
  var set = false;

  return function() {
     if (set) return false;
     set = true;
     return true;
  };
};

gulp.task('js', function() {
  return gulp.src([
      './src/mdeditor.js',
      './vendor/codemirror/lib/codemirror.js',
      './vendor/codemirror/mode/xml/xml.js',
      './vendor/codemirror/addon/display/placeholder.js',
      './vendor/codemirror/addon/selection/active-line.js',
      './vendor/codemirror/addon/fold/xml-fold.js',
      './vendor/codemirror/addon/edit/closetag.js',
      './vendor/codemirror/addon/edit/matchtags.js',
      './vendor/codemirror/addon/mode/overlay.js',
      './vendor/spell-checker/spell-checker.js',
      './vendor/typo/typo.js',
      './vendor/marked/marked.js',
      './vendor/markdown.js',
      './vendor/gfm.js',
      './vendor/continuelist.js',
      './src/editor.js'
    ])
    .pipe(concat('editor.js'))
    .pipe(gulp.dest('.'))
    .pipe(filesize())
    .pipe(uglify({preserveComments: preserveFirstComment()}))
    .pipe(rename('editor.min.js'))
    .pipe(gulp.dest('.'))
    .pipe(filesize())
    .on('error', gutil.log);
});
gulp.task('default', ['js']);
