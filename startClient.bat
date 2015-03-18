lessc src/css/style.less > src/css/style.css
grunt jshint &&
grunt concat &&
grunt uglify &&
grunt cssmin &&
python -m http.server 8000