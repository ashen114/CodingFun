# JavaScript 代码片段

### all

```js
/**
 * @description 如果数组所有元素满足函数条件，则返回true。调用时，如果省略第二个参数，则默认传递布尔值。
 */
const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
```

### allEqual

```js
/**
 * @description 判断数组中的元素是否都相等
 */
const allEqual = arr => arr.every(val => val === arr[0]);

allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```

### approximatelyEqual

```js
/**
 * @description 此代码示例检查两个数字是否近似相等，差异值可以通过传参的形式进行设置
 */
const approximatelyEqual = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon;

approximatelyEqual(Math.PI / 2.0, 1.5708); // true
```

### arrayToCSV

```js
/**
 * @description 此段代码将没有逗号或双引号的元素转换成带有逗号分隔符的字符串即CSV格式识别的形式。
 */
const arrayToCSV = (arr, delimiter = ',') =>
  arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n');
  
arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // '"a";"b"\n"c";"d"'
```

### arrayToHtmlList

```js
/**
 * @description 此段代码将数组元素转换成<li>标记，并将此元素添加至给定的ID元素标记内。
 */
const arrayToHtmlList = (arr, listID) =>
  (el => (
    (el = document.querySelector('#' + listID)),
    (el.innerHTML += arr.map(item => `<li>${item}</li>`).join(''))
  ))();
  
arrayToHtmlList(['item 1', 'item 2'], 'myListID');
```

### attempt

```js
/**
 * @description 此段代码执行一个函数，将剩余的参数传回函数当参数，返回相应的结果，并能捕获异常。
 */
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
};

var elements = attempt(function(selector) {
  return document.querySelectorAll(selector);
}, '>_>');
if (elements instanceof Error) elements = []; // elements = []
```

### average

```js
/**
 * @description 此段代码返回两个或多个数的平均数。
 */
const average = (...nums) => nums.reduce((acc, val) => acc + val, 0) / nums.length;

average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2
```

### averageBy

```js
/**
 * @description 一个 map()函数和 reduce()函数结合的例子，此函数先通过 map() 函数将对象转换成数组，然后在调用reduce()函数进行累加，然后根据数组长度返回平均值。
 */
const averageBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0) /
  arr.length;
  
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 5
```

### bifurcate

```js
/**
 * @description 此函数包含两个参数，类型都为数组，依据第二个参数的真假条件，将一个参数的数组进行分组，条件为真的放入第一个数组，其它的放入第二个数组。这里运用了Array.prototype.reduce() 和 Array.prototype.push() 相结合的形式。
 */
const bifurcate = (arr, filter) =>
  arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [[], []]);

bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]); // [ ['beep', 'boop', 'bar'], ['foo'] ]
```

### bifurcateBy

```js
/**
 * @description 此段代码将数组按照指定的函数逻辑进行分组，满足函数条件的逻辑为真，放入第一个数组中，其它不满足的放入第二个数组 。这里运用了Array.prototype.reduce() 和 Array.prototype.push() 相结合的形式，基于函数过滤逻辑，通过 Array.prototype.push() 函数将其添加到数组中。
 */
const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []]);
  
bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b');  // [ ['beep', 'boop', 'bar'], ['foo'] ]
```

### bottomVisible

```js
/**
 * @description 用于检测页面是否滚动到页面底部。
 */
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);

bottomVisible(); // true
```

### byteSize

```js
/**
 * @description 此代码返回字符串的字节长度。这里用到了Blob对象，Blob（Binary Large Object）对象代表了一段二进制数据，提供了一系列操作接口。其他操作二进制数据的API（比如File对象），都是建立在Blob对象基础上的，继承了它的属性和方法。生成Blob对象有两种方法：一种是使用Blob构造函数，另一种是对现有的Blob对象使用slice方法切出一部分。
 */
const byteSize = str => new Blob([str]).size;

byteSize('😀'); // 4
byteSize('Hello World'); // 11
```

### capitalize

```js
/**
 * @description 将字符串的首字母转成大写,这里主要运用到了ES6的展开语法在数组中的运用。
 */
const capitalize = ([first, ...rest]) =>
  first.toUpperCase() + rest.join('');
  
capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'FooBar'
```

### capitalizeEveryWord

```js
/**
 * @description 将一个句子中每个单词首字母转换成大写字母，这里中要运用了正则表达式进行替换。
 */
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

capitalizeEveryWord('hello world!'); // 'Hello World!'
```

### castArray

```js
/**
 * @description 此段代码将非数值的值转换成数组对象。
 */
const castArray = val => (Array.isArray(val) ? val : [val]);

castArray('foo'); // ['foo']
castArray([1]); // [1]
```

### compact

```js
/**
 * @description 将数组中移除值为 false 的内容。
 */
const compact = arr => arr.filter(Boolean);

compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]
```

### countOccurrences

```js
/**
 * @description 统计数组中某个值出现的次数
 */
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```

### Create Directory

```js
/**
 * @description 此代码段使用 existSync() 检查目录是否存在，然后使用 mkdirSync() 创建目录（如果不存在）。
 */
const fs = require('fs');
const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);

createDirIfNotExists('test');
```

### currentURL

```js
/**
 * @description  返回当前访问的 URL 地址。
 */
const currentURL = () => window.location.href;

currentURL(); // 'https://medium.com/@fatosmorina'
```

### dayOfYear

```js
/**
 * @description 返回当前是今年的第几天
 */
const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

dayOfYear(new Date()); // 272
```

### deCapitalize

```js
/**
 * @description 将字符串的首字母转换成小写字母
 */
const deCapitalize = ([first, ...rest]) =>
  first.toLowerCase() + rest.join('')

deCapitalize('FooBar'); // 'fooBar'
```

### specificOrder

```js
/**
 * @description 按照特定的顺序排序
 * @param order 指定的规则
 * @param key 排序的键
 * @param arr 待排序的数组
 */
const specificOrder = (order, key, arr) => {
  if(!Array.isArray(arr)) return arr;
  return arr.sort((a, b) => {
    return order.indexOf(a[key]) - order.indexOf(b[key])
  })
}

let arr = [
  {
    id: 1,
    value: 'A'
  },
  {
    id: 2,
    value: 'B'
  },
  {
    id: 3,
    value: 'C'
  },
]
arr = specificOrder([2,3,1], 'id', arr);
```