import md5 from 'md5';
import path from 'path';
import fs from 'fs';

let originPath = '';
let endPath = '';

function log(info){
    process.stdout.write(info + '\n');
}

function updateHashFile(srcPath, targetPath){
    let src = fs.readFileSync(srcPath).toString();
    let hash = md5(src);
    hash = hash.substring(0, 20);
    let { dir, name, ext } = path.parse(targetPath);
    targetPath = path.join(dir, name + '.' + hash + ext);
    fs.writeFileSync(targetPath, src);
    return true;
}

function iterateDirectory(contentPath, targetPath, dirName){
    dirName = dirName ? dirName : '';
    fs.readdirSync(contentPath).forEach((fileOrDir)=>{
        let fromPath = path.join(contentPath, fileOrDir);
        let toPath = path.join(targetPath, fileOrDir);
        if(fs.statSync(fromPath).isDirectory()){
            if (!fs.existsSync(toPath)){
                fs.mkdirSync(toPath);
            }
            iterateDirectory(fromPath, toPath, dirName + '/' + fileOrDir);
        }else{
            let { name, ext } = path.parse(fileOrDir);
            if(updateHashFile(fromPath, toPath)){
                log(path.join(originPath, dirName, name + ext) + ' -> ' + path.join(endPath, dirName, name + ext));
            }
        }
    })
}


let fileHasing = (srcPath, desPath)=>{
    originPath = srcPath;
    endPath = desPath;
    let appPath = fs.realpathSync(process.cwd());
    if (srcPath){
        srcPath = path.resolve(appPath, srcPath);
    }

    if (fs.existsSync(srcPath) && desPath){
        desPath = path.resolve(appPath, desPath);
        if (!fs.existsSync(desPath)){
            fs.mkdirSync(desPath);
        }
        iterateDirectory(srcPath, desPath);
    }else{
        if (srcPath){
            throw 'source path invalid';
        }else if(!desPath){
            throw 'designation path of undefind';
        }else{
            throw 'source path of undefind';
        }
    }
}

export default fileHasing;
