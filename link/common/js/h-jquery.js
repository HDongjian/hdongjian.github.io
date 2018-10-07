(function(w, d) {
    var push = [].push;
    var splice = [].splice;

    /**
     * 模拟jQuery中的Sizzle引擎，利用选择器获取元素
     * @param {选择器} select 
     */
    function Sizzle(select) {
        if (select === 'document') {
            return [document]
        } else {
            return document.querySelectorAll(select);
        }
    }

    /**
     * 初始化jquery方法
     * @param {选择器} seletor 
     */
    function jQuery(seletor) {
        return new init(seletor);
    }


    function init(seletor) {
        splice.call(this, 0, this.length);
        push.apply(this, Sizzle(seletor))
    }
    init.prototype = {
        each: function(callback) {
            for (var i = 0; i < this.length; i++) {
                callback(i)
            }
        },
        /**
         * css方法
         */
        css: function() {
            if (arguments.length > 1) {
                this.each((i) => {
                    this[i].style[arguments[0]] = arguments[1]
                })
            } else {
                this.each((i) => {
                    for (var k in arguments[0]) {
                        this[i].style[k] = arguments[0][k]
                    }
                })
            }
            return this
        },

        /**
         * text
         */
        text: function() {
            if (arguments.length > 0) {
                this.each((i) => {
                    this[i].innerText = arguments[0]
                })
                return this
            } else {
                var allText = ""
                this.each((i) => {
                    allText += this[i].innerText
                })
                return allText

            }
        },
        /**
         * html
         */
        html: function() {
            if (arguments.length > 0) {
                this.each((i) => {
                    this[i].innerHTML = arguments[0]
                })
                return this
            } else {
                var allText = ""
                this.each((i) => {
                    allText += this[i].innerHTML
                })
                return allText

            }
        },
        /**
         * 点击事件
         */
        click: function(callback) {
            this.each((i) => {
                this[i].onclick = callback;
            })
        },

        /**
         * 绑定点击事件
         */
        on: function() {
            if (arguments.length == 2) {
                this.each((i) => {
                    this[i].addEventListener(arguments[0], arguments[1])
                })
            } else if (arguments.length == 3) {
                var argu = arguments
                var _this = this;
                this.each((i) => {
                    this[i].addEventListener(arguments[0], function(e) {
                        var tagName = argu[1].toLowerCase();
                        if (e.target.tagName.toLowerCase() == tagName) {
                            splice.call(_this, 0, _this.length);
                            push.call(_this, e.target)
                            argu[2](_this)
                        }
                    })
                })
            }

        },
        /**
         * 解除事件
         */
        off: function(type, callback) {
            this.each((i) => {
                this[i].removeEventListener(type, callback)
            })
        },
        /**
         * 切换class名
         */
        toggleClass: function(name) {
            this.each((i) => {
                this[i].classList.toggle(name)
            })
        },
        /**
         * 查找元素方法
         */
        find: function(seletor) {
            var arr = [];
            this.each((i) => {
                push.apply(arr, this[i].querySelectorAll(seletor));
            })
            splice.call(this, 0, this.length);
            push.apply(this, arr)
            return this;
        },
        /**
         * 获取元素内容
         */
        value: function() {
            if (arguments.length === 0) {
                return this[0].value;
            } else {
                this.each((i) => {
                    this[i].value = arguments[0]
                })
            }
        },
        /**
         * 获取自定义属性
         */
        attr: function() {
            var argu = arguments;
            var attrArr = [];
            this.each((i) => {
                attrArr.push(this[i].getAttribute(argu[0]));
            })
            return attrArr;
        }
    };

    window.jQuery = window.$ = jQuery;
})(window, document)