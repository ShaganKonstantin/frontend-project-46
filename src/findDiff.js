import _ from 'lodash';

const findDiff = (obj1, obj2) => {
    const result = {};

    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    const sortedKeys1 = _.sortBy(obj1Keys);
    const sortedKeys2 = _.sortBy(obj2Keys);

    for (let key of sortedKeys1) {
        if (!(key in obj2)) {
            result[`- ${key}`] = obj1[key]
        } else if (obj1[key] !== obj2[key]) {
            result[`- ${key}`] = obj1[key];
            result[`+ ${key}`] = obj2[key];
        } else if (obj1[key] === obj2[key]) {
            result[key] = obj2[key]
        }
    }

    for (let key of sortedKeys2) {
        if (!(key in obj1)) {
            result[`+ ${key}`] = obj2[key]
        }
    }
      
    return result
}

