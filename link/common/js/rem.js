(function(w, d) {
    var lib = {
        //获取浏览器高度
        getClient: function() {
            return {
                width: window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth || 0,
                height: window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight || 0
            }
        },
        //绑定事件
        addEventListener: function(element, type, fn) {
            if (typeof(element.addEventListener) != "undefined") {
                element.addEventListener(type, fn, false);
            } else if (typeof(element.attachEvent) != "undefined") {
                element.attachEvent("on" + type, fn)
            } else {
                element["on" + type] = fn;
            }
        },
        //节流
        throttle: function(fn, threshhold) {
            var timeout
            var start = new Date;
            var threshhold = threshhold || 160
            return function() {
                var context = this,
                    args = arguments,
                    curr = new Date() - 0
                clearTimeout(timeout) //总是干掉事件回调
                if (curr - start >= threshhold) {
                    fn.apply(context, args) //只执行一部分方法，这些方法是在某个时间段内执行一次
                    start = curr
                } else {
                    //让方法在脱离事件后也能执行一次
                    timeout = setTimeout(function() {
                        fn.apply(context, args)
                    }, threshhold);
                }
            }
        },
        //根据id获取元素
        id: function(id) {
            return document.getElementById(id);
        },
        //设置css样式
        css: function(d, o) {
            for (var k in o) {
                d.style[k] = o[k];
            }
        },
    }

    /**
     * 设置html属性
     */
    const winResize = function() {
            const {
                width
            } = lib.getClient()
            const {
                documentElement
            } = d;
            documentElement.style.fontSize = width / 50 + 'px';
        }
        // 首先调用函数
    winResize();
    /**
     * 为window绑定resize事件监测屏幕变化
     */
    lib.addEventListener(w, 'resize', lib.throttle(winResize, 400))
})(window, document)