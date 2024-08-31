import parse from "./parse.js";
import fs from "fs"


const extractFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), extractFormat(filepath));

export default getData