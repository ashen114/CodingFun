// 策略模式
const complieUtil = {
    text(node, expr, vm) {
        // const value = vm.$data[expr]; // expre：对象 vm.$data[expr]：值
        let value;
        // 若为插槽
        if (/\{\{(.+?)\}\}/.test(expr)) {
            // 匹配{{}}，替换其为空，并取出对象
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                // 使用trim去除{{}}内的空格
                return this.getVal(args[1].trim(), vm);
            })
        } else {
            // 若为指令
            value = this.getVal(expr, vm);
        }
        this.updater.textUpdater(node, value);
    },
    html(node, expr, vm) {
        const value = this.getVal(expr, vm);
        this.updater.htmlUpdater(node, value);
    },
    model(node, expr, vm) {
        const value = this.getVal(expr, vm);
        this.updater.modelUpdater(node, value);
    },
    on(node, expr, vm, eventName) {
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName, fn.bind(vm), false);
    },
    bind(node, expr, vm, attrName) {
        const value = this.getVal(expr, vm);
        node.setAttribute(attrName, value)
    },
    getVal(expr, vm) {
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal]; // person.name 则第一轮为 vm.$data[person]（data = vm.$data） 第二轮为 vm.$data[person][name]（data = vm.$data[person]）
        }, vm.$data); // 将vm.$data传入data中作为初始值，每一轮为data[currentVal]
    },
    // 数据更新的函数
    updater: {
        modelUpdater(node, value) {
            node.value = value;
        },
        textUpdater(node, value) {
            node.textContent = value
        },
        htmlUpdater(node, value) {
            node.innerHTML = value;
        }
    }
}

class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        /**
         * 文档碎片：https://www.cnblogs.com/suihang/p/9491359.html
         */
        // 1. 获取文档碎片对象，放入内存中会减少页面的回流和重绘
        const fragment = this.nodeFragment(this.el);

        // 2. 编译模板
        this.compile(fragment);

        // 3. 追加子元素到根元素，一次性插入
        this.el.appendChild(fragment);

    }
    compile(fragment) {
        // 1. 获取子节点
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                // 若是元素节点，则编译元素节点
                this.compileElement(child);
            } else {
                // 若是文本节点，则编译文本节点
                this.compileText(child)
            }

            // 若当前节点还有子节点，则进行递归编译子节点
            if (child.childNodes && child.childNodes.length) {
                this.compile(child);
            }
        })
    }
    isDirective(attrName) {
        // 判断是否为指令类型
        return attrName.startsWith('v-') || attrName.startsWith(':');
    }
    isEventName(eventName) {
        // 判断事件是否为@
        return eventName.startsWith('@')
    }
    compileElement(node) {
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
            const { name, value } = attr;
            if (this.isDirective(name)) {
                console.log('name:', name);
                // 若是指令，则v-xx，例如：v-text，v-model，v-on:click...
                const directive = name.split('-').pop();
                const [directiveName, eventName] = directive.split(':'); // 针对v-on:click等类型，去掉：
                // 更新数据，数据驱动视图
                complieUtil[directiveName || 'bind'](node, value, this.vm, eventName);
                // 删除有指令的标签上的属性
                node.removeAttribute('v-' + directive); // 因为进行了isDirective，所以也可以node.removeAttribute(name);
            } else if (this.isEventName(name)) {
                // 若为事件，例如：@click
                const [, eventName] = name.split('@');
                complieUtil['on'](node, value, this.vm, eventName);
            }
        })
    }
    compileText(node) {
        const content = node.textContent;

        if (/\{\{(.+?)\}\}/.test(content)) {
            console.log('content:', content);
            complieUtil['text'](node, content, this.vm);
        }
    }
    nodeFragment(el) {
        // 1. 创建文档碎片
        const f = document.createDocumentFragment();
        let firstChild;
        // 2. 循环子节点
        while (firstChild = el.firstChild) {
            // 每次获取el的第一节点赋给firstChild并叠加到文档碎片上
            f.appendChild(firstChild);
        }
        return f;
    }
    isElementNode(node) {
        /**
         * 节点类型：https://www.cnblogs.com/xiaoleidiv/p/3347483.html
         * nodeType 属性返回以数字值返回指定节点的节点类型。
         * 如果节点是元素节点，则 nodeType 属性将返回 1。
         * 如果节点是属性节点，则 nodeType 属性将返回 2。
         */
        return node.nodeType === 1;
    }
}

class MVue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if (this.$el) {
            // 1. 实现一个数据的观察者

            // 2. 实现一个指令解析器
            new Compile(this.$el, this);
        }
    }
}