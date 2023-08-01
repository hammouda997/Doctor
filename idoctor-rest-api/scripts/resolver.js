/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
// requiring path and fs modules
// @ts-nocheck

const fs = require('fs');
const path = require('path');
const tsconfig = require('../tsconfig.json');

const directoryPath = path.join(
  __dirname,
  `../${tsconfig.compilerOptions.outDir}`,
);
const absoluteRoutes = Object.keys(tsconfig.compilerOptions.paths).map(
  (o) => `"${o.replace('/*', '')}`,
);

fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(`Unable to scan directory: ${err}`);
    return;
  }
  sortImportsInFolder(files, directoryPath, 0);
});

const sortImportsInFolder = (fileOrFolder, _path, depth) => {
  if (!Array.isArray(fileOrFolder) && !fileOrFolder.isDirectory()) {
    sortImportsInFile(fileOrFolder, _path, depth);
  } else if (Array.isArray(fileOrFolder)) {
    fileOrFolder.forEach((file) => {
      if (file.isDirectory()) {
        sortImportsInFolder(file, path.join(_path, file.name), depth);
      } else {
        sortImportsInFile(file, path.join(_path, file.name), depth);
      }
    });
  } else {
    fs.readdir(_path, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(`Unable to scan directory: ${err}`);
      }
      sortImportsInFolder(files, _path, depth + 1);
    });
  }
};
const depthToString = (depth) => {
  if (depth === 0) return '"./';
  let res = '"';
  for (let index = 0; index < depth; index++) {
    res = `${res}../`;
  }
  return res;
};
const sortImportsInFile = (file, _path, depth) => {
  const _depth = depthToString(depth);
  fs.readFile(_path, (err, data) => {
    if (err) throw err;
    let _data = data.toString();
    absoluteRoutes.forEach((route) => {
      _data = _data.replace(
        new RegExp(`(${route}(?=[/|"]))`, 'g'),
        `${_depth}${route.replace('"', '')}`,
      );
    });
    fs.writeFile(_path, _data, (error) => {
      if (error) console.log(error);
    });
  });
};
console.log('module resolved');
