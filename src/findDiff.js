/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const file1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const file2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const findDiff = (obj1, obj2) => {
  let result = '{\n';

  const processObjects = (parentKey, parentObject1, parentObject2) => {
    const keys1 = Object.keys(parentObject1);
    const keys2 = Object.keys(parentObject2);
    const allKeys = _.union(keys1, keys2).sort();

    allKeys.forEach((key) => {
      const val1 = parentObject1[key];
      const val2 = parentObject2[key];

      if (!(key in parentObject2)) {
        result += `  - ${key}: ${val1}\n`;
      } else if (!(key in parentObject1)) {
        result += `  + ${key}: ${val2}\n`;
      } else if (!_.isEqual(val1, val2)) {
        if (typeof val1 === 'object' && val1 !== null && !Array.isArray(val1)
            && typeof val2 === 'object' && val2 !== null && !Array.isArray(val2)) {
          result += `    ${key}: {\n`;
          processObjects(`${parentKey}.${key}`, val1, val2);
          result += '    }\n';
        } else {
          result += `  - ${key}: ${val1}\n`;
          result += `  + ${key}: ${val2}\n`;
        }
      } else {
        result += `    ${key}: ${val2}\n`;
      }
    });
  };

  // Process the main objects
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();
  const allMainKeys = _.union(keys1, keys2).sort();

  allMainKeys.forEach((key) => {
    if (!(key in obj2)) {
      result += `  - ${key}: {\n`;
      processObjects(key, obj1[key], {});
      result += '  }\n';
    } else if (!(key in obj1)) {
      result += `  + ${key}: {\n`;
      processObjects(key, {}, obj2[key]);
      result += '  }\n';
    } else {
      result += `    ${key}: {\n`;
      processObjects(key, obj1[key], obj2[key]);
      result += '    }\n';
    }
  });

  result += '\n}';
  return result;
};

console.log(findDiff(file1, file2));
// const findDiff = (obj1, obj2) => {
//   let result = '{\n';

//   const obj1Keys = Object.keys(obj1);
//   const obj2Keys = Object.keys(obj2);

//   const sortedKeys1 = _.sortBy(obj1Keys);
//   const sortedKeys2 = _.sortBy(obj2Keys);

//   for (const key of sortedKeys1) {
//     if (!(key in obj2)) {
//       result += `  - ${key}: ${obj1[key]}\n`;
//     } else if (obj1[key] !== obj2[key]) {
//       result += `  - ${key}: ${obj1[key]}\n`;
//       result += `  + ${key}: ${obj2[key]}\n`;
//     } else if (obj1[key] === obj2[key]) {
//       result += `    ${key}: ${obj2[key]}\n`;
//     }
//   }

//   for (const key of sortedKeys2) {
//     if (!(key in obj1)) {
//       result += `  + ${key}: ${obj2[key]}`;
//     }
//   }
//   result += '\n}';

//   return result;
// };

// export default findDiff;
