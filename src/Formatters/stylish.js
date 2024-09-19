import _ from 'lodash';

const makeIndentation = (depth) => {
  const indentation = '  ';
  const indentationCount = 2; // Количество пробелов для одного уровня
  const getIndentationSize = depth * indentationCount; // Общий размер отступа для текущего уровня

  const getIndentation = {
    beforeOpenBrace: indentation.repeat(getIndentationSize - 1), // Отступ перед "{"
    beforeCloseBraces: indentation.repeat(getIndentationSize - indentationCount),
    // Отступ перед "}"
  };

  return getIndentation;
};

const stringify = (obj, depth) => {
  if (!_.isObject(obj)) {
    return String(obj);
  }
  const indentation = makeIndentation(depth);

  const valueEntries = Object.entries(obj);

  const createLine = valueEntries.map(([key, value]) => {
    if (!_.isObject(value)) {
      return `${indentation.beforeOpenBrace}  ${key}: ${value}`;
    }
    return `${indentation.beforeOpenBrace}  ${key}: ${stringify(value, depth + 1)}`;
  });

  return ['{', ...createLine, `${indentation.beforeCloseBraces}}`].join('\n');
};

const stylish = (tree, depth = 1) => {
  const indentation = makeIndentation(depth);

  const items = tree.map((item) => {
    const makeValue = stringify(item.value, depth + 1);

    switch (item.type) {
      case 'added':
        return `${indentation.beforeOpenBrace}+ ${item.name}: ${makeValue}`;
      case 'deleted':
        return `${indentation.beforeOpenBrace}- ${item.name}: ${makeValue}`;
      case 'changed':
        return `${indentation.beforeOpenBrace}- ${item.name}: ${stringify(item.value1, depth + 1)}\n${indentation.beforeOpenBrace}+ ${item.name}: ${stringify(item.value2, depth + 1)}`;
      case 'unchanged':
        return `${indentation.beforeOpenBrace}  ${item.name}: ${makeValue}`;
      case 'nested':
        return `${indentation.beforeOpenBrace}  ${item.name}: ${stylish(item.children, depth + 1)}`;
      default:
        throw new Error('error');
    }
  });
  return ['{', ...items, `${indentation.beforeCloseBraces}}`].join('\n');
};

export default stylish;
