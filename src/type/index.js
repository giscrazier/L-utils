/**
 * 对数据类型的操作
 * Created by yyl on 2017/12/8.
 */
const class2type = {};
// Save a reference to some core methods
const core_toString = class2type.toString;

// Populate the class2type map
("Boolean Number String Function Array Date RegExp Object Error".split(" ")).forEach(function (name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

export function getType( obj ) {
	if ( obj == null ) {
		return String( obj );
	}
	// Support: Safari <= 5.1 (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ core_toString.call(obj) ] || "object" :
		typeof obj;
}

export function isFunction(obj) {
    return getType(obj) === 'function';
}

export function isBoolean(obj) {
    return getType(obj) === 'boolean';
}

export function isNumber(obj) {
    return getType(obj) === 'number';
}

export function isString(obj) {
    return getType(obj) === 'string';
}

export function isArray(obj) {
    return getType(obj) === 'array';
}

export function isDate(obj) {
    return getType(obj) === 'date';
}

export function isRegExp(obj) {
    return getType(obj) === 'regExp';
}

export function isObject(obj) {
    return getType(obj) === 'object';
}