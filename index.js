'use strict';
const isRegexp = require('is-regexp');

const flagMap = {
	global: 'g',
	ignoreCase: 'i',
	multiline: 'm',
	dotAll: 's',
	sticky: 'y',
	unicode: 'u'
};

module.exports = (regex, options = {}) => {
	if (!isRegexp(regex)) {
		throw new TypeError('Expected a RegExp instance');
	}

	const flags = Object.keys(flagMap).map(function (flag) {
		return (typeof options[flag] === 'boolean' ? options[flag] : regex[flag]) ? flagMap[flag] : '';
	}).join('');

	const clonedRegexp = new RegExp(options.source || regex.source, flags);

	clonedRegexp.lastIndex = typeof options.lastIndex === 'number' ?
		options.lastIndex :
		regex.lastIndex;

	return clonedRegexp;
};
