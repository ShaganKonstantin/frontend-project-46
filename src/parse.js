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
  throw new Error('Unknown format');
}
export default parse;
