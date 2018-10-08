// 默认列表数据
var defaultList = [{
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

// 全局变量
var randomFoods = [], //当前列表
    homeTimeId = null, //随机更换计时器菜单
    homeTimeOut = null, //倒计时停止更换餐品
    canRotate = true, //校验是否可以开始旋转
    xCount = 0; // 目前main在X轴旋转角度

/**
 * 初始化数据设置列表
 */
var setRandomFoods = function() {
    if (!localStorage.getItem('foodList')) {
        localStorage.setItem('foodList', JSON.stringify(defaultList))
        randomFoods = defaultList;
    } else {
        randomFoods = JSON.parse(localStorage.getItem('foodList'));
    }
}

/**
 * 渲染列表数据
 * @param {渲染列表} foods 
 */
const renderOptions = function(foods) {
    let list = '';
    foods.forEach((e, i) => {
        list += "<li index='" + i + "'>" + e.name + "</li>";
    });
    $('#options-list').html(list);
}

setRandomFoods();
renderOptions(randomFoods);

// 800,600

// var list = $('#options-list').find('li');
// console.log(list)

// for (var i = 0; i < list.length; i++) {
//     // var top = parseInt(Math.random() * 600);
//     // var left = parseInt(Math.random() * 800);
//     // console.log(parseInt(Math.random() * 600))
//     list[i].style.left = parseInt(Math.random() * 600) + 'px';
//     list[i].style.top = parseInt(Math.random() * 400) + 'px';
// }

/**
 * 根据列表长度获取随机值
 */
function getRandom() {
    return parseInt(Math.random() * randomFoods.length);
}

/**
 * 首页开始与结束
 */
var homeControl = function() {
    // 如果不是当前页面不开始
    if (xCount !== 0) return;
    if (homeTimeId) {
        clearInterval(homeTimeId)
        clearTimeout(homeTimeOut)
        homeTimeId = null
        homeTimeOut = null;
    } else {
        homeTimeId = setInterval(function() {
            var text = randomFoods[getRandom()].name;
            $('#content').text(text);
        }, 20)
        homeTimeOut = setTimeout(function() {
            if (homeTimeId) {
                clearInterval(homeTimeId)
                homeTimeId = null
            }
        }, 10000);
    }
}


/*
 *控制方块主体转动
 */
var mainRotate = function() {
    $('.main').css('transform', 'rotateY(' + xCount * 90 + 'deg)')
    canRotate = false;
    if (Math.abs(xCount) > 3) {
        xCount = 0;
    }
    if (xCount == 0) {
        setRandomFoods();
    }
}

// 控制台
$('document').on('keydown', function(e) {
    if (e.keyCode === 13) {
        homeControl();
    } else if (e.keyCode === 39 && canRotate) {
        xCount--;
        mainRotate();
    } else if (e.keyCode === 37 && canRotate) {
        xCount++;
        mainRotate();
    }
})

// 移动端控制台
$('#content').on('click', function() {
    homeControl();
})

var touch, startX, endX;

$('document').on('touchstart', function(ev) {
    //获取手指信息
    touch = ev.targetTouches[0];
    //获取x坐标
    startX = touch.clientX;
})

$('document').on('touchmove', function(ev) {
    //获取手指信息；
    // touch = ev.changedTouches[0];
    // // 离开屏幕时X坐标
    // endX = touch.clientX;
})

$('document').on('touchend', function(ev) {
    ev.stopImmediatePropagation();
    //获取手指信息；
    touch = ev.changedTouches[0];
    // 离开屏幕时X坐标
    endX = touch.clientX;
    // 判断方向
    if (endX > startX + 10 && canRotate) {
        xCount++;
        mainRotate();
    } else if (startX > endX + 10 && canRotate) {
        xCount--;
        mainRotate();
    }
})


/**
 * 检测动画结束
 */
$('.main').on('webkitTransitionEnd', function() {
    canRotate = true;
    if (xCount == 0) {
        $('.main').toggleClass('trans')
        $('.main').css('transform', 'rotateY(0deg)')
        setTimeout(() => {
            $('.main').toggleClass('trans')
        }, 20);
    }
})



//增加选项点击事件
$('#button-add').on('click', function(e) {
    const addValue = $('#input-add').value();
    e.stopPropagation();
    if (addValue) {
        randomFoods.push({
            name: addValue
        })
        $('#input-add').value('');
        renderOptions(randomFoods);
        localStorage.setItem('foodList', JSON.stringify(randomFoods))
    }
})

//增加删除事件

$('#options-list').on('click', 'li', function(e) {
    var index = e.attr('index')[0];
    randomFoods.splice(index, 1);
    renderOptions(randomFoods)
    localStorage.setItem('foodList', JSON.stringify(randomFoods))
})