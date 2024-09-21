import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : String(value);
};

const plain = (tree) => {
  const iter = (value, parent) => {
    const makeLine = value
      .filter(({ type }) => type !== 'unchanged')
      .map((item) => {
        const keys = [...parent, item.name];
        const property = keys.join('.');

        switch (item.type) {
          case 'added':
            return `Property '${property}' was added with value: ${stringify(item.value)}`;
          case 'deleted':
            return `Property '${property}' was removed`;
          case 'changed':
            return `Property '${property}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
          case 'nested':
            return iter(item.children, keys);
          default:
            throw new Error('Unknown type');
        }
      });
    return makeLine.join('\n');
  };
  return iter(tree, []);
};
export default plain;
