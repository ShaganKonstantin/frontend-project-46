import path from "path";
import getData from "./getData.js";

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath); 

const genDiff = (filepath1, filepath2) => {
    const fullFilePath1 = getFullPath(filepath1);
    const fullFilePath2 = getFullPath(filepath2);

    // const data1 = getData(fullFilePath1);
    // const data2 = getData(fullFilePath2);

    return [fullFilePath1, fullFilePath2]
}; 

export default genDiff  