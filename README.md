# Lutils

[![NPM version](https://img.shields.io/npm/v/l-utils.svg?style=flat)](https://npmjs.org/package/l-utils)
[![NPM downloads](http://img.shields.io/npm/dm/l-utils.svg?style=flat)](https://npmjs.org/package/l-utils)
[![Dependencies](https://david-dm.org/sorrycc/l-utils/status.svg)](https://david-dm.org/sorrycc/l-utils)

# 目录

* [Request](#request) [详细](https://github.com/giscrazier/l-utils/tree/master/src/request)
* [Store](#store) [详细](https://www.npmjs.com/package/store2)
* [Event](#event)
* [Download](#download) [详细](https://www.npmjs.com/package/downloadjs)

# Request
简单保障的 Fetch

## API
- requestConfig 配置所有默认选项
- requestHeaders 设置headers, 支持 object | key-value | function 类型参数
- send 发送请求
- getform, postform, get, post, head, del, put 发送请求(这些都是简化的send)
- 支持jsonp
- 下面为不在$$中的方法
- create 返回新实例
- config 同 requestConfig
- headers 同 requestHeaders
- prefix 设置请求前缀，可在config中设置
- beforeRequest 请求前hook
- afterResponse 响应后hook
- contentType 设置content-type

## 使用
```javascript
import $$ from 'Lutils';

// 发送请求
$$.send('/send');
$$.get('/get/1');
$$.post('/post');
$$.put('/put');
$$.del('/put/1');
$$.jsonp('abc.jsonp').then(resp => resp.json());
```
# 默认选项
```javascript
{
    method: 'POST',         // default 'POST'
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    responseType: 'json',   // text or blob or formData https://fetch.spec.whatwg.org/
    prefix: '',             // request prefix
    beforeRequest: null,    // before request check, return false or a rejected Promise will stop request
    afterResponse: null,    // after request hook
  }
```
## 基本使用
### 简化写法
```javascript
// 原始fetch 写法
fetch('http://httpbin.org/post', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    name: 'weiq',
  })
})
.then(function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }
  throw new Error(response.statusText)
})
.then(function(json) {
  // ...
});

// 等价于，直接使用send方法
$$.send('http://httpbin.org/post', {
    method: 'POST',
    data: {name: 'weiq'}
  }).then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })

// 等价于，使用提供的post方法
$$.post('http://httpbin.org/post', {name: 'weiq'})
  .then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })
```
### 提交form表单
```javascript
// 提交form表单
$$.getform('/form', {name: 'weiq'}) // 将拼接到url后面
  //.postform('/form', {name: 'weiq'}) // 将做为Form Data发送
  .then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })
```
### 全局配置, 将会覆盖默认参数, 一般全局配置一次
```javascript
// 全局配置, 将会覆盖默认参数, 一般全局配置一次
$$.requestConfig('method', 'GET')
  .requestConfig({
    headers: {'content-type': 'application/json'},
    prefix: '/api'
  })
// 配置请求头
$$.requestHeaders('Accept', 'application/json')  // key-value
  .requestHeaders({ Accept: 'application/json' }) // json

// 用函数反回头
$$.requestHeaders(_ => ({
    random: Math.random()
  }))
```
### 临时改变配置项
```javascript
$$.post('http://httpbin.org/post', {name: 'weiq'}, {
    headers: {
      'content-type': 'application/json'
    },
    responseType: 'json',
  })
  .then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })
```
# Store
直接使用store2，未对其进行修改。
## 示例
```javascript
import $$ from 'Lutils';
$$.store(key, data);
```

# event
让组件可以发射、监听自定义事件, 有时我们可能需要让两个没有太大关系的组件间建立联系，比如增加商品到购物车这个场景，一般会在页面头部（Header组件）放置购物车的图标，商品列表（Goods组件）中有一个添加到购物车的图标，我们想点击这个图标时，让头部购物车图标显示+1的效果，有几种方案，其一是在头部定义一个changeCardNumber方法，然后把这个方法层层传递到商品列表（Goods）中，进行调用，这很容易出错，其二是点击商品列表中商品时，通过dispatch发出一个类型是changeCardNumber的action，这种方法我们不得不把Header包装一下才可以让它处理dispatch的能力, 最后如果我们用自定义事件可以更容易实现这个效果，即在Header中订阅一个changeCardNumber这个事件，在其它任何地方只有触发trigger这个事件就可以了，只需要注意不用的事件要及时移除。

## API
- on 注册事件监听
- off 移除事件监听
- once 注册一次事件监听，只能触发一次trigger触发后即自动从监听中移除
- trigger 触发事件

## 示例
```javascript
$$.on('eventName', function(value) {
  console.log(value)
});

$$.trigger('eventName');

$$.off('eventName');

$$.once('eventName', function(value) {
  console.log(value)
});
```
# Download
下载文件 download(data, strFileName, strMimeType);
## 示例
```javascript
download("hello world", "dlText.txt", "text/plain");

download("data:text/plain,hello%20world", "dlDataUrlText.txt", "text/plain");

download(new Blob(["hello world"]), "dlTextBlob.txt", "text/plain");

download("/robots.txt");

var str= "hello world",	arr= new Uint8Array(str.length);
str.split("").forEach(function(a,b){
  arr[b]=a.charCodeAt();
});
download( arr, "textUInt8Array.txt", "text/plain" );

download("/diff6.png");

var x=new XMLHttpRequest();
x.open( "GET", "/diff6.png" , true);
x.responseType="blob";
x.onload= function(e){download(e.target.response, "awesomesauce.png", "image/png");};
x.send();
```