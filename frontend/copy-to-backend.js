const fs = require('fs-extra');
const path = require('path');

const buildPath = path.resolve(__dirname, 'build');
const staticPath = path.resolve('C:/vsspring/recipe/src/main/resources/static');

fs.ensureDirSync(staticPath);
fs.emptyDirSync(staticPath);

// build 폴더 전체 복사 (index.html + static/js, static/css + images)
fs.copySync(buildPath, staticPath, { overwrite: true });

console.log('✅ React build and public assets copied safely to Spring Boot static folder');