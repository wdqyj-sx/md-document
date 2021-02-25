const fs = window.require('fs').promises;

const fileHelper = {
    readFiles : (path)=>{
        return fs.readFile(path,{encoding:'utf8'})
    },
    writeFiles : (path,content) => {
        return fs.writeFile(path,content,{encoding:'utf8'})
    },
    renameFiles : (oldPath,newPath) => {
        return fs.rename(oldPath,newPath);
    },
    deleteFiles : (path) => {
        return fs.unlink(path);
    }
}

export default fileHelper;