var foodList = [{
    name: "味当家（小碗菜）",
}, {
    name: "米多面多",
}, {
    name: "韩式拌饭",
}, {
    name: "鲜焖",
}, {
    name: "拼吾饭",
}, {
    name: "香锅儿里辣",
}, {
    name: "田老师",
}, {
    name: "渝鱼家",
}, {
    name: "三年二班麻辣拌",
}, {
    name: "太太好粥",
}, {
    name: "酸辣粉",
}, {
    name: "小嘿冒菜",
}];

var randomFoods = [];
var setRandomFoods = function() {
    if (!localStorage.getItem('foodList')) {
        localStorage.setItem('foodList', JSON.stringify(foodList))
        randomFoods = foodList;
    } else {
        randomFoods = JSON.parse(localStorage.getItem('foodList'));
    }
}

setRandomFoods();

function getRandom() {
    return parseInt(Math.random() * randomFoods.length);
}
var content = $('#content');
var timeId = null,
    timeOut = null;
$('document').on('keydown', function(e) {
    if (e.keyCode === 13) {
        if (timeId) {
            clearInterval(timeId)
            clearTimeout(timeOut)
            timeId = null
            timeOut = null;
        } else {
            timeId = setInterval(function() {
                var text = randomFoods[getRandom()].name;
                content.text(text);
            }, 20)
            timeOut = setTimeout(function() {
                if (timeId) {
                    clearInterval(timeId)
                    timeId = null
                }
            }, 10000);
        }
    }
})