const fs = require('fs-extra');
const childProcess = require('child_process');

try {
  // Remove current build
  fs.removeSync('/dist');

  // Copy front-end files
  fs.copySync('./src/public', './dist/public');

  // Transpile the typescript files
  childProcess.exec('node scripts/resolver.js && tsc --build tsconfig.json');
} catch (err) {
  console.log(err);
}
