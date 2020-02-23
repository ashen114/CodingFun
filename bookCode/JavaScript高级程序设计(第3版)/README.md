# `JavaScript` 高级程序设计（第 3 版）

## 第 1 章

### 1.1 `JavaScript` 简史

`LiveScript`(Brendan Eich) >> `JavaScript`(Netscape+Sun) >> `JavaScript1.1`(NetScape) >> `ECMAScript-262`(TC39 + ISO/IEC)

### 1.2 `JavaScript` 实现

组成部分：

- 核心（`ECMAScript`）
- 文档对象模型（`DOM`）
- 浏览器对象模型（`BOM`）

#### 1.2.1 `ECMAScript`

> `ECMAScript`本身不包括输入输出。宿主环境不仅提供基本的`ECMAScript`实现，同时也会提供该语言的扩展，以便语言与环境之间对接交互，其他宿主环境包括 Node 和 Adobe Flash。

组成部分

- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 对象

1. `ECMAScript`版本
2. 什么是`ECMAScript`兼容
3. Web 浏览器对`ECMAScript`的支持

#### 1.2.2 文档对象模型（`DOM`）

1. 为什么要使用`DOM`
2. `DOM`级别
3. 其他 DOM 标准
4. Web 浏览器对`DOM`的支持

#### 1.2.3 浏览器对象模型（`BOM`）

`BOM`只处理浏览器窗口和框架

`BOM`的`JavaScript`扩展：

- 弹出新浏览器窗口的功能
- 移动、缩放和关闭浏览器窗口的功能
- 提供浏览器详细信息的 navigator 对象
- 提供浏览器所加载页面的详细信息的 location 对象
- 提供用户显示器分辨率详细信息的 screen 对象
- 对`cookie`的支持
- 像`XMLHttpRequest`和 IE 的`ActiveXObject`这样的自定义对象

### 1.3 JavaScript 版本

### 1.4 小结

`JavaScript`是一种专为与网页交互而设计的脚本语言，由下列三个不同部分组成：

- `ECMAScript`，由`ECMA-262`定义，提供核心语言功能；
- 文档对象模型（`DOM`），提供访问和操作网页内容的方法和接口
- 浏览器对象模型（`BOM`），提供与浏览器交互的方法和接口

`JavaScript`的这三个组成部分，在当前五个主要浏览器（IE、Firefox、Chrome、Safari 和 Opera）中都得到了不同程度的支持。其中，所有的浏览器对`ECMAScript`第 3 版的支持大体上都还不错，而对`ECMAScript5`的支持程度越来越高，但对 DOM 的支持则彼此相差比较多。对已经正式纳入`HTML5`标准的`BOM`来说，尽管各浏览器都实现了某些众所周知的共同特性，但其他特性还是会因浏览器而异。

## 第 2 章

### 2.1 `<script>` 元素

`<script>` 可选属性

- `async` 立即下载脚本
- `charset` 指定 scr 属性的代码的字符集
- `defer` 延迟到页面完全加载完再执行
- `scr` 要执行代码的外部文件
- `type` 指定脚本语言内容类型（MIME 类型）

使用`script`元素

1. 页面内嵌入

   ```js
   // 正确
   <script type="text/javascript">alert("script");</script>
   ```

   ```js
   // 错误：不要在script元素内使用"</script>"
   <script type="text/javascript">
   alert("</script>");
   </script>
   ```

   ```js
   // 正确：可通过转义字符解决上述问题
   <script type="text/javascript">
   alert("<\/script>");
   </script>
   ```

2. 引入外部脚本文件

   在解析外部`JavaScript`文件时，页面的处理也会暂时停止

   ```js
   <script
     type="text/javascript"
     src="https://cdn.bootcss.com/jquery/3.4.0/jquery.js"
   ></script>
   ```

   引入外部脚本文件时，如果还包含了嵌入的代码，则只会下载并执行外部脚本文件，嵌入的代码会被忽略。只要不存在`defer`和`async`属性，浏览器会按顺序解析`<script>`元素。

#### 2.1.1 标签的位置

一般把全部`JavaScript`引入放在`<body>`元素中页面内容后面。

#### 2.1.2 延迟脚本

```js
<script
  type="text/javascript"
  defer="defer"
  src="https://cdn.bootcss.com/jquery/3.4.0/jquery.js"
></script>
```

包含了`defer`属性，脚本文件会在遇到`</html>`标签后才会被执行，引入多个`defer`外部文件时，脚本文件不一定会顺序执行，尽量最多只包含一个延迟脚本。IE4、Firefox3.5、Safari 5 和 Chrome 是最早支持 defer 属性的浏览器，其他浏览器可能会忽略
可能某些使用`defer`属性，最佳做法是将需要延迟的脚本直接放页面底部。

#### 2.1.3 异步脚本

指定`async`属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容，为此建议异步脚本不要在加载期间修改 DOM，异步脚本一定会在 load 事件前执行。

#### 2.1.4 在 XHTML 中的用法

`XHTML(Extensible HyperText Markup Language)`，可扩展超文本标记语言。
将页面的 MIME 类型指定为`"application/xhtml+xml"`模式会触发 XHTML 模式，但不是全部浏览器都兼容。

在 XHTML 中使用`script`：

```xhtml
<!-- 1 -->
<script>
  // 错误：在XHTML的script中的小于号（<）会被当作新的标签，而且解析成标签后，标签后不能带空格，因此会出现语法报错
  if (2 < 3) {
    alert("true");
  }
</script>

<!-- 2 -->
<script>
  // 正确：使用HTML实体（&lt;）替换小于号（<）
  if(2 $lt; 3){
      alert('true')
  }
</script>

<!-- 3:CDATA兼容性较差 -->
<script>
  <![CDATA[
  // 正确：除了使用HTML实体，也可以使用CData片段来声明不需要解析该代码片段
  if(2 < 3){
      alert('true')
  }
  ]]>
</script>

<!-- 4:通过hack注释来解决CDATA兼容性问题 -->
<script>
  // 正确：对于不兼容CDATA的浏览器，可以使用注释符号来解决
  // <![CDATA[
  if (2 < 3) {
    alert("true");
  }
  // ]]>
</script>
```

#### 2.1.5 不推荐使用的语法

对于不支持`script`的浏览器，可以使用

```js
<script><!--
alert('test')
//--></script>
```

所有浏览器都支持这种写法，不过所有浏览器都已经支持`script`，因此没必要加上该写法。

### 2.2 嵌入代码与外部文件

引入外部脚本文件比嵌入代码的做法要好，主要是

- 可维护性，集中管理，便于后期维护
- 可缓存，如果有两个以上的页面引用同一个文件时，因浏览器的缓存机制，这个文件只需要下载一次，以加快页面加载速度。
- 适应未来，通过外部引入的`JavaScrip`t 文件，无需使用前面提到的`XHTML`或者注释`hack`。

### 2.3 文档模式

文档模式

- 混杂模式，该模式会让 IE 的行为与 IE5 相同，所有浏览器的默认模式。
- 标准模式

### 2.4 `<noscript>`元素

用以在不支持`JavaScript`的浏览器中显示替代的内容，在以下情况下才会显示

- 浏览器不支持脚本
- 浏览器支持脚本，但脚本被禁止

```js
<noscript>
  <p>该页面需要浏览器支持(启用)JavaScript。</p>
</noscript>
```

### 2.4 小结

把`JavaScript`插入到 HTML 页面中要使用`<script>`元素。使用这个元素可以把 JavaScript 嵌入到 HTML 页面中，让脚本与标记混合在一起；也可以包含外部的 JavaScript 文件，需要注意的地方是：

- 引入外部文件时，需要使用 src 属性指向相应文件的 URL。
- 被引入的 JavaScript 文件，会按顺序被解析。在不适应 defer 和 async 的情况下。只有前面的文件被解析之后，后面的 script 元素才会开始解析。
- 一般把`<script>`元素放在主要内容后面，`<body>`标签前面。
- 使用 defer 属性可以让脚本在文档完全呈现之后再执行。延迟的脚本会按顺序加载
- 使用 async 属性可以异步加载脚本，不必等待其他脚本，不必阻塞文档呈现，不能保证脚本按顺序加载。

`<noscript>`可以在不支持 JavaScript 脚本的地方呈现内容。

## 第 3 章

### 3.1 语法

JavaScript 借鉴了 C 及其他类 C 语言（如 Java 和 perl）的语法

### 3.2 区分大小写

### 3.3 标识符

> 标识符：变量，函数，属性的名字，或者函数的参数。
> 标识符格式

- 第一个字符必须是一个字母、下划线（\_）或一个美元符号（\$）
- 其他字符可以是字母、下划线、美元符号或数字
  字母可以为 ASCII 或者 Unicode 字母，但不推荐。
  推荐写法：驼峰大小写格式，例如：`doSomethingImportant`

#### 3.1.3 注释

单行注释
`//`
多行注释

```js
/*
 * 多行注释
 *
 */
```

#### 3.1.4 严格模式

启用严格模式，在脚本顶部引入

```js
"use strict";
```

支持严格模式的浏览器：IE10+、Firefox 4+、Safari 5.1+、Opera 12+和 Chrome。

#### 3.1.5 语法

结尾推荐加分号（；），尽管不是必须。

#### 3.2 关键字和保留字

`class`，`break`...

#### 3.3 变量

```js
let a = 1; // 正确
b = 1; //有效，但不推荐
```

### 3.4 数据类型

基本数据类型

- `Undefined`
- `Null`
- `Boolean`
- `Number`
- `String`

复杂数据类型：`Object`

#### 3.4.1 `typeof`操作符

```js
"undefined"; // 未定义
"boolean"; // 布尔值，例如：typeof true
"string"; // 字符串，例如：typeof 'a'
"number"; // 数值，例如：typeof 12
"object"; // 对象或者null
"function"; // 函数
```

`null`被认为是一个空的对象引用，函数在`ECMAScript`中是对象，不是一种数据类型。

#### 3.4.2 `Undefined` 类型

对于未定义或者定义但没赋值的变量，使用 typeof 都为 undefined

#### 3.4.3 `Null` 类型

```js
typeof null; // "object"

null == undefined; // true

null === undefined; // false
```

#### 3.4.4 `Boolean` 类型

流控制语句（如 if）可以自动将条件转为 Boolean 值

```js
true == 1; // true
true === 1; // false
Boolean(1) === true; // true
true == 0; // false
Boolean(Infinity) == Boolean(-Infinity); // true

false == 0; // true
false === 0; // false
Boolean(0) === false; // true
false == 1; // false

Boolean(Infinity); /// true

Boolean(0); // false
Boolean(NaN); // false
Boolean(null); // false
Boolean(undefined); // false
```

#### 3.4.5 `Number` 类型

0. <span id="3.4.5.0">进制定义及转换</span>

   ```js
   // 十进制
   let a1 = 12; // 普通十进制

   // 八进制字面量定义：第一位必须为0，其余位必须在（0-7）范围内，超出范围则会被解析成十进制；八进制字面量定义在严格模式下无效，还会报错。
   let b1 = 070; // 八进制，得到56
   let b2 = 079; // 无效八进制，9超出了范围，被解析回十进制，得到79
   let b3 = 09; // 无效八进制，被解析回十进制，得到9
   let b3 = 08; // 无效八进制，被解析回十进制，得到8
   let b3 = 07; // 无效八进制，被解析回十进制，得到7

   // 十六进制字面量定义：第一位必须为0x，其余位必须在（0-9及A-F）范围内，字母大小写无影响，超出范围会报错
   let c1 = 0xa; // 十六进制，得到10
   let c2 = 0x1f; // 十六进制，得到31

   // 其他进制转十进制
   parseInt(num, 8); //八进制转十进制
   parseInt(num, 16); //十六进制转十进制
   // 十进制转其他进制
   parseInt(num).toString(8); //十进制转八进制
   parseInt(num).toString(16); //十进制转十六进制
   // 其他进制转其他进制
   parseInt(num, 2).toString(8); //二进制转八进制
   parseInt(num, 2).toString(16); //二进制转十六进制
   parseInt(num, 8).toString(2); //八进制转二进制
   parseInt(num, 8).toString(16); //八进制转十六进制
   parseInt(num, 16).toString(2); //十六进制转二进制
   parseInt(num, 16).toString(8); //十六进制转八进制
   ```

1. 浮点数值

   ```js
   let a = 0.1; // 正确
   let b = 0.1; // 有效，但不推荐
   ```

   - 可用 e 表示法表示数值等于 e 前面数值乘以 10 的指数幂。例如：`3.125e7 == 32150000`，实际是“3.125 乘以 10^7”

   - 也可以使用 e 表示极小数，例如：`0.00000000000000003 == 3e-17`，默认情况下，ECMAScript 会将小数点带 6 个零以上的浮点数值转换为以 e 表示法。

   - 浮点数的最高精度是 17 位小数（等于或者超过 17 位），例如：`0.0000000000000001 + 0.2 == 0.20000000000000012`,但是`0.00000000000000001 + 0.2 == 0.2`，值得注意的是

   ```js
   0.1 + 0.2; // 0.30000000000000004

   // 要解决0.1+0.2不等于0.3的问题，可以使用(a*n+b*n)/n; 其中n需要为10的n次方(n>1)
   (0.1 * 10 + 0.2 * 10) / 10; // 0.3
   ```

1. 数值范围

   查看浏览器支持的数值范围

   ```js
   Number.MIN_VALUE; // 谷歌浏览器为5e-324
   Number.MAX_VALUE; // 谷歌浏览器为1.7976931348623157e+308
   ```

   若某值超出上述的范围，会被自动转换为`Infinity`（正无穷）或者`-Infinity`（负无穷），

   ```js
   Number.NEGATIVE_INFINITY == -Infinity; // true,Number.NEGATIVE_INFINITY保存着-Infinity
   Number.POSITIVE_INFINITY == Infinity; // true,Number.POSITIVE_INFINITY保存着Infinity
   ```

   判断数值是否处于最小与最大数值之间，可以使用`isFinite(number)`,为`true`则在范围内。

1. NaN

   NaN（Not a Number），非数值。任何涉及 NaN 的操作都会返回 NaN。

   ```js
   // NaN不等于任何数值，包含自身。
   NaN == NaN; // false

   // 判断数值是否为NaN，可以使用isNaN()
   isNaN(NaN); // true
   isNaN(1); // false，可以理解为isNaN(Number(1))，其中Number('1')为1
   isNaN("a"); // true，可以理解为isNaN(Number('a'))，其中Number('a')为NaN
   isNaN("1a"); // true，可以理解为isNaN(Number('a1'))，其中Number('a1')为NaN
   isNaN(true); // false，可以理解为isNaN(Number(true)),其中Number(true) == 1
   ```

1. 数值转换

   - Number()

     ```js
     Number(true); // 1
     Number(false); // 0
     Number(null); // 0
     Number(undefined); // NaN

     Number(061); // 八进制，得到49
     Number(0xf); // 十六进制，得到15
     Number(""); // 0
     ```

     ```js
     Number({ name: "string" }); // NaN
     ```

     对于`Number(obj)`，其内部处理过程为：

     ```js
     if (isNaN(obj.valueOf())) {
       Number(obj.valueOf());
     } else {
       Number(obj.toString());
     }
     ```

   - <a href="#3.4.5.0">parseInt()</a>
     ```js
     // 即使是转换为十进制，为其带上10这个第二参数是十分必要的。
     parseInt(string, 10); // 10进制
     ```
   - <a href="#3.4.5.0">parseFloat()</a>
     - 与 parseInt()类似，只是 parseFloat()支持浮点数值。
       ```js
       // 不会报错。除了第一个小数点，其他小数点及其后面的数字会被清除。
       parseFloat("123.456.78");
       ```

#### 3.4.6 `String` 类型

1. 字符量字面量

   |  字面量  |                     含义                      |
   | :------: | :-------------------------------------------: |
   |   `\n`   |                     换行                      |
   |   `\t`   |                     制表                      |
   |   `\b`   |                     退格                      |
   |   `\r`   |                     进纸                      |
   |   `\\`   |                     斜杠                      |
   |   `\'`   |       单引号，例如：'this is \'apple\''       |
   |   `\"`   |       双引号，例如："this is \"apple\""       |
   |  `\xnn`  |        十六进制字符，例如：'\x41'=='A'        |
   | `\unnnn` | 十六进制 Unicode 字符，例如：'\u4f20' == '传' |

2. 字符串的特点
   ECMAScript 字符串一旦被创建，它的值就无法被修改，只能销毁再创建。
3. 转换为字符串

- toString()
  ```js
  (10).toString(); // 默认十进制，转字符串，得到"10"
  (10).toString(2); // 2 进制，转字符串，得到"1010"
  (10).toString(8); // 8 进制，转字符串，得到"12"
  (10).toString(10); // 10 进制，转字符串，得到"10"
  (10).toString(16); // 16 进制，转字符串，得到"a"
  ```
- String()

  ```js
  String(10); // "10"
  String(true); // "true"

  // String()可以对null或者undefined转换为对应的字符串
  String(null); // "null"
  String(undefiend); // "undefiend"
  ```

#### 3.4.7 `Object` 类型

ECMAScript 中的对象就是一组数据和功能的集合。

```js
// 可以通过new创建
let obj = new Object();

// 也可以省略(),不推荐写法
let obj2 = new Object();
```

Object 的每个实例都具有下列属性和方法。

- `constructor`：保存着用于创建当前对象的函数
  ```js
  let obj = { name: "ashen" };
  obj.constructor; // Object() { [native code] }
  ```
- `hasOwnProperty(propertyName)`：用于检查是否存在某属性
  ```js
  let obj = { name: "ashen" };
  obj.hasOwnProperty("name"); // true
  obj.hasOwnProperty("age"); // false
  ```
- `isPrototypeOf`：用于检查传入的对象是否是当前对象的原型（详见第 5 章）
  ```js
  let a = { name: "ashen" };
  let b = Object.create(a);
  a.isPrototypeOf(b); //true
  ```
- `propertyIsEnumerable(propertyName)`：用于检查对象的某属性是否能使用 `for-in` 语法来枚举，与`hasOwnProperty(propertyName)`有点类似。
  ```js
  let arr = [1, 2, 3];
  let obj = { name: "ashen" };
  arr.propertyIsEnumerable("length"); // false
  arr.propertyIsEnumerable("0"); // true
  obj.propertyIsEnumerable("name"); // true
  ```
- `toLocaleString()`：返回对象的字符串表示，与执行环境的地区对应。
  ```js
  let arr = [1, 2, 3];
  let obj = { name: "ashen" };
  let time = new Date();
  arr.toLocaleString(); // "1,2,3"
  obj.toLocaleString(); // "[object Object]"
  time.toLocaleString(); // "2019/12/25 上午10:12:21"
  ```
- `toString()`：返回对象的字符串表示。
  ```js
  let arr = [1, 2, 3];
  let obj = { name: "ashen" };
  let time = new Date();
  arr.toString(); // "1,2,3"
  obj.toString(); // "[object Object]"
  time.toString(); // "Wed Dec 25 2019 10:15:41 GMT+0800 (中国标准时间)"
  ```
- `valueOf()`：返回对象的字符串、数值或布尔值表示。通常与 toString()方法的返回值相同。
  ```js
  let arr = [1, 2, 3];
  let obj = { name: "ashen" };
  let time = new Date();
  arr.valueOf(); // [1, 2, 3]
  obj.valueOf(); // {name: "ashen"}
  time.valueOf(); //1577240141039
  ```

### 3.5 操作符

操作数据值的操作符，包括算术操作符、位操作符、关系操作符和相等操作符。

#### 3.5.1 一元操作符

1. 递增和递减操作符

   ```js
   let num = "2";
   num++; // 2
   ++num; // 4

   let a = "a";
   ++a; // NaN

   let flag = true;
   ++flag; // 2

   let fNum = "1.22";
   ++fNum; // 2.2199999999999998（浮点舍入错误所导致）

   let obj = {
     valueOf: function() {
       return -1;
     }
   };
   ++obj; // 0（对于对象，会先调用其valueOf()方法，若为NaN，还继续调用其toString()）
   ```

2. 一元加和减操作符
   类型 `Number()`的效果

   ```js
   let num = "2";
   +num; // 2

   let a = "a";
   +a; // NaN

   let flag = true;
   +flag; // 1

   let fNum = "1.22";
   +fNum; // 1.22

   let obj = {
     valueOf: function() {
       return -1;
     }
   };
   +obj; // -1
   ```

#### 3.5.2 位操作符

1. 按位非（NOT）

   符号： ~

   ```js
   -(10 + 1) == ~10; // true,原数值+1后取反，得到其原值的按位非操作后的数值
   ```

2. 按位与（AND）

   符号： &

   ```js
   (25 & 3) == 1; // true
   ```

3. 按位或（OR）

   符号： |

   ```js
   (25 | 3) == 27; // true
   ```

4. 按位异或（XOR）
   符号：^

   ```js
   (25 ^ 3) == 26; // true
   ```

5. 左移
   符号： <<
   ```js
   // 2 的二进制是10
   2 << 5; // 64，可理解为给10加5个0，得到1000000，最终得到其十进制64
   -2 << 5; // -64，// 左移不会影响符号
   ```
6. 右移
   符号： >>

   ```js
   2 >> 2; // 超出范围，为0
   -2 >> 2; // 超出范围，为-1
   ```

7. 无符号右移
   符号：>>>
   ```js
   2 >>> 2; //超出范围，为0
   -2 >> 2; // 超出范围，循环到最左变，得到1073741823
   ```

#### 3.5.3 布尔操作符

1. 逻辑非

   符号：!

   ```js
   let obj = { name: "ashen" };
   !obj; // false

   let noStr = "";
   !noStr; // true

   let hasStr = "test";
   !hasStr; // false

   !0; // true

   !1; // false
   !Infinity; // false

   !null; // true
   !NaN; // true
   !undefined; // true
   ```

2. 逻辑与

   符号：&&

   ```js
   ```
