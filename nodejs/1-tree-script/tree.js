const fs = require ('fs').promises;
const path = require('path');
const folderPath = process.argv.slice(2).toString();

let result = {
  dirs: [],
  files: [],
};

const getFileTree = async(dir) => {
  let files = await fs.readdir(dir);

  await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      result.dirs.push(filePath)
      return getFileTree(filePath);
    } else if(stats.isFile()) {
      result.files.push(filePath)
      return filePath;
    }
  }));

  return result
}


getFileTree(folderPath).then(res => console.log('res', res))
