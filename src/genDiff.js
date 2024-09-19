import path from 'path';
import fs from 'fs';
import parse from './parse.js';
import buildAst from './buildAst.js';
import formatters from './Formatters/formatters.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const extractFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), extractFormat(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fullFilePath1 = getFullPath(filepath1);
  const fullFilePath2 = getFullPath(filepath2);

  const data1 = getData(fullFilePath1);
  const data2 = getData(fullFilePath2);

  const tree = buildAst(data1, data2);

  return formatters(tree, formatName);
};
export default genDiff;
