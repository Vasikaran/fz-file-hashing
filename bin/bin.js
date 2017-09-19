#!/usr/bin/env node

const fileHasing = require('../lib/index.js').default;

var args = process.argv.splice(2, process.argv.length);

var srcPath, desPath;
if(args[0] === '-s'){
    srcPath = args[1];
}else if (args[0] === '-d'){
    desPath = args[1];
}

if (args[2] === '-d'){
    desPath = args[3];
}else if (args[0] === '-s'){
    srcPath = args[3];
}

function log(info, wantNextLine){
    info += wantNextLine ? '\n' : '';
    process.stdout.write(info);
}

if (args[0] === '-h'){
    log('Options:', true);
    log('   -s        - source path       ', false);
    log('for source path', true);
    log('   -d        - designation path  ');
    log('for designation path', true);
    log('   -h, -help - help              ');
    log('for help', true);
    process.exit();
}

fileHasing(srcPath, desPath);
