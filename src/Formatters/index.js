import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error('No such format');
  }
};
export default formatters;
