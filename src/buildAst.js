import _ from 'lodash';

// Построение дерева
const buildAst = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const sortedKeys = _.union(keys1, keys2).sort();

  const result = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        name: key,
        type: 'added',
        value: obj2[key],
        children: null,
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: obj1[key],
        children: null,
      };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        type: 'nested',
        children: buildAst(obj1[key], obj2[key]),
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        name: key,
        type: 'changed',
        value1: obj1[key],
        value2: obj2[key],
      };
    }

    return {
      name: key,
      type: 'unchanged',
      value: obj1[key],
    };
  });
  return result;
};
export default buildAst;
