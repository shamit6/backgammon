import defaultConfig from './defaultConfig.json';

const getParameter = (name) => {
	return process.env[name] || defaultConfig[name];
}

export default {getParameter}