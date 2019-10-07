import fs from 'fs';
import zlib from 'zlib';

class lab03 {

  syncFileRead(fileoname) {
return fs.readFileSync(fileName).toString();

  }

  asyncFileRead(filenname, callback){
    /* Implement function here */
    fs.readFile(filename, (err, data)=> {
    if(err){
      console.error(err);
    } else{
      return callback(data.toStrong());
      }
    });
    }


  compressFileStream(input, output) {

    let writeStream = fs.createWriteStream(output);
    fs.createReadStream(input)
      .pipe(zlib.createGzip())
      .pipe(writeStream);
      return writeStream;
      }

decompressFileStream(inputFile, outputFile) {
let writeStream = fs.createWriteStream(outputFile);
fs.createReadStream(inputFile)
.pipe(zlib.createGunzip())
.pipe(writeStream);
return writeStream;
}




listDirectoryContents(directoryLocation, callback) {
fs.readdir(directoryLocation, (err, files) => {
if(err) {
return console.error(err);
}
return callback(files);
});
}
}

export {lab03};


