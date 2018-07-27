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