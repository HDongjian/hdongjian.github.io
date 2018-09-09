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
            console.log(arguments)
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
        on: function(type, callback) {
            this.each((i) => {
                this[i].addEventListener(type, callback)
            })
        },
        /**
         * 切换class名
         */
        toggleClass: function(name) {
            console.log(this)
                // this.each((i) => {
                //     this[i].classList.toggle(name)
                // })
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
    };

    window.jQuery = window.$ = jQuery;
})(window, document)