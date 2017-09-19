'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var originPath = '';
var endPath = '';

function log(info) {
    process.stdout.write(info + '\n');
}

function updateHashFile(srcPath, targetPath) {
    var src = _fs2.default.readFileSync(srcPath).toString();
    var hash = (0, _md2.default)(src);
    hash = hash.substring(0, 20);

    var _path$parse = _path2.default.parse(targetPath),
        dir = _path$parse.dir,
        name = _path$parse.name,
        ext = _path$parse.ext;

    targetPath = _path2.default.join(dir, name + '.' + hash + ext);
    _fs2.default.writeFileSync(targetPath, src);
    return true;
}

function iterateDirectory(contentPath, targetPath, dirName) {
    dirName = dirName ? dirName : '';
    _fs2.default.readdirSync(contentPath).forEach(function (fileOrDir) {
        var fromPath = _path2.default.join(contentPath, fileOrDir);
        var toPath = _path2.default.join(targetPath, fileOrDir);
        if (_fs2.default.statSync(fromPath).isDirectory()) {
            if (!_fs2.default.existsSync(toPath)) {
                _fs2.default.mkdirSync(toPath);
            }
            iterateDirectory(fromPath, toPath, dirName + '/' + fileOrDir);
        } else {
            var _path$parse2 = _path2.default.parse(fileOrDir),
                name = _path$parse2.name,
                ext = _path$parse2.ext;

            if (updateHashFile(fromPath, toPath)) {
                log(_path2.default.join(originPath, dirName, name + ext) + ' -> ' + _path2.default.join(endPath, dirName, name + ext));
            }
        }
    });
}

var fileHasing = function fileHasing(srcPath, desPath) {
    originPath = srcPath;
    endPath = desPath;
    var appPath = _fs2.default.realpathSync(process.cwd());
    if (srcPath) {
        srcPath = _path2.default.resolve(appPath, srcPath);
    }

    if (_fs2.default.existsSync(srcPath) && desPath) {
        desPath = _path2.default.resolve(appPath, desPath);
        if (!_fs2.default.existsSync(desPath)) {
            _fs2.default.mkdirSync(desPath);
        }
        iterateDirectory(srcPath, desPath);
    } else {
        if (srcPath) {
            throw 'source path invalid';
        } else if (!desPath) {
            throw 'designation path of undefind';
        } else {
            throw 'source path of undefind';
        }
    }
};

exports.default = fileHasing;