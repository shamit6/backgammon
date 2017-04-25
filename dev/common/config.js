import defaultConfig from './defaultConfig.json';

// TODO check why process.env[name]  undifined in client in prod
const getParameter = (name) => process.env[name] || defaultConfig[name];

export default {getParameter}