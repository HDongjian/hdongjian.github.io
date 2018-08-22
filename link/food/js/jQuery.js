(function(w) {
    //为了以后能方便借用数组的各种方法，提前存到变量中，全局都是用这一个数组，节约空间

    function jQuery(select) {
        return new jQuery.prototype.init(select)
    }

    //模拟jQuery中的Sizzle引擎，利用选择器获取元素
    function Sizzle(select) {
        return document.querySelectorAll(select);
    }

    //使用原型替换，给jq定义原型
    jQuery.prototype = {
        //定义初始化函数
        init: function(select) {
            [].splice.call(this, 0, this.length);
            [].push.apply(this, Sizzle(select));
            return this;
        },
        //循环添加
        each: function(callback) {
            for (var i = 0; i < this.length; i++) {
                callback && callback(this[i]);
            }
        },
        //模仿jq中的css方法，设置dom的样式
        css: function() {
            return this;
        },
        //为元素添加子元素
        append: function(c) {
            this.each((v) => {
                v.innerHTML += c;
            })
            return this;
        },
        html: function(i) {
            this.each((v) => {
                v.innerHTML = i;
            })
            return this;
        }

    }

    //核心操作 核心操作 核心操作  让init的原型指向 jquery的原型，这样，任何init的实例，都可以访问 jq原型中的所有方法
    jQuery.prototype.init.prototype = jQuery.prototype;
    window.jQuery = window.$ = jQuery;
})(window)