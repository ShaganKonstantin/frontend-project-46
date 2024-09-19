import stylish from './stylish.js';

const formatters = (tree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(tree);
  }
};
export default formatters;
