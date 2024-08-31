import yaml from "js-yaml";

const parse = (data, format) => {
    if(format === 'json') {
        return JSON.parse(data)
    } else if (format === 'yaml') {
        return yaml.load(data)
    } else if (format === 'yml') {
        return yaml.load(data)
    }
}

// const parse = (data, format) => {
//     const parsers = {
//         json: JSON.parse,
//         yaml: yaml.load,
//         yml: yaml.load
//     };
// }

// export default (data, format) => parsers[format](data)

export default parse