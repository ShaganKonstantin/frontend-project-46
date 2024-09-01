import path from "path";
import parse from "./parse.js";
import fs from "fs"

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath); 

const extractFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), extractFormat(filepath));

const genDiff = (filepath1, filepath2) => {
    const fullFilePath1 = getFullPath(filepath1);
    const fullFilePath2 = getFullPath(filepath2);

    const data1 = getData(fullFilePath1);
    const data2 = getData(fullFilePath2);


return ([data1, data2]) 
}; 

export default genDiff  