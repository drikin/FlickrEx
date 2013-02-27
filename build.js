#!/usr/local/bin/node
var cc = require('closure-compiler')
var fs = require('fs')

var options = {};

function afterdir(err, files) {
    if (err) throw err;
    var pat = /^\w*\.ts$/;
    files.forEach(function(file) {
        if (pat.exec(file) !== null) {
            var srcname = file.substring(0, file.length - 2);
            cc.compile(fs.readFileSync('src/' + srcname + 'js'), options, function(err, stdout, stderr) {
                if (err) throw err;
                var fd = fs.openSync(srcname + 'min.js', 'w', 0666);
                fs.writeSync(fd, stdout);
                fs.closeSync(fd);
            });
        }
    });
}

fs.readdir('src', afterdir);
