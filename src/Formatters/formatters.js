import stylish from './stylish.js';

const formatters = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error('No such format');
  }
};
export default formatters;
