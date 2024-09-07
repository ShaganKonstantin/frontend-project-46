/* eslint-disable consistent-return */
import yaml from 'js-yaml';

function parse(data, format) {
  if (format === 'json') {
    return JSON.parse(data);
  } if (format === 'yaml') {
    return yaml.load(data);
  } if (format === 'yml') {
    return yaml.load(data);
  }
}
export default parse;
// const parse = (data, format) => {
//   const parser = {
//     json: JSON.parse,
//     yaml: yaml.load,
//     yml: yaml.load,
//   };
// };

// export default (data, format) => parse[format](data);
