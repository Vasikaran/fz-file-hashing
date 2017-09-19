const fs = require('fs');
const path = require('path');

let build = fs.readFileSync(path.resolve(__dirname, './bin/bin.src.js')).toString();

let lines = build.split('\r');

let cleanedFile = '';

for (let line of lines){
    cleanedFile += line;
}

fs.writeFileSync(path.resolve(__dirname, './bin/bin.js'), cleanedFile);
