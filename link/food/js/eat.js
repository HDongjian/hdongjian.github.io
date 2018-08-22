(function(w, d) {
    var foodList = [{
        name: "冒菜",
    }, {
        name: "麻辣香锅",
    }, {
        name: "韩式拌饭",
    }, {
        name: "鲜焖",
    }, {
        name: "麻辣诱惑",
    }, {
        name: "水饺",
    }, {
        name: "紫菜包饭",
    }, {
        name: "局气",
    }, {
        name: "粥",
    }, {
        name: "田老师",
    }, {
        name: "海盗虾饭",
    }, {
        name: "肉夹馍",
    }, {
        name: "云海肴",
    }, {
        name: "北平食府",
    }, {
        name: "汤城小厨",
    }, {
        name: "炸鸡",
    }, {
        name: "板面",
    }, {
        name: "四世同堂",
    }, {
        name: "汉堡王",
    }, {
        name: "渝信小厨",
    }, {
        name: "紫光园",
    }, {
        name: "合利屋",
    }, {
        name: "西贝莜面村",
    }, {
        name: "南小官",
    }, {
        name: "煲仔饭",
    }, {
        name: "和合谷",
    }];

    function getRandom() {
        return parseInt(Math.random() * foodList.length);
    }
    var content = document.getElementById('content');
    var timeId = null,
        timeOut = null;
    document.onkeydown = function(e) {
        if (e.keyCode === 13) {
            if (timeId) {
                clearInterval(timeId)
                clearTimeout(timeOut)
                timeId = null
                timeOut = null;
            } else {
                timeId = setInterval(function() {
                    var text = foodList[getRandom()].name;
                    content.innerText = text;
                }, 20)
                timeOut = setTimeout(function() {
                    if (timeId) {

                        clearInterval(timeId)
                        timeId = null
                    }
                }, 10000);
            }
        }
    }

})(window, document)