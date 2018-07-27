import request from './request';
import store from 'store2';
import event, { on, once, off, trigger } from './event';
import download from 'downloadjs';

/**
 * 导出常用请求函数到全局，其它高级配置使用 '.request.xxx()' 
 * 或直接 import request from 'cmn-utils/lib/request';
 */
const requestConfig  = request.config;
const requestHeaders = request.headers;
const getform        = request.getform;
const postform       = request.postform;
const send           = request.send;
const get            = request.get;
const post           = request.post;
const head           = request.head;
const del            = request.delete;
const put            = request.put;
const jsonp          = request.jsonp;

export { request };


/**
 * default export
 */
const L = {
    // request api
    request, requestConfig, requestHeaders, getform, postform, send, get, post, head, del, put, jsonp,
    // store api
    store,
    // event api
    event, on, once, off, trigger,
    // download
    download,
    // common utils
    ...require('./utils'),
    // type api
    ...require('./type')

};

if (L.__esModule) delete L.__esModule;

export default L;