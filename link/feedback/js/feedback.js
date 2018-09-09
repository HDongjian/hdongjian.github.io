var titleName = [
    '请选择学生姓名',
    '请选择授课内容',
    '请选择课堂表现',
    '请选择课后作业',
    '上课反馈'
];

var students = [{
    name: "徐婧祎",
    en: "xujingyi",
}, {
    name: "韩子玉",
    en: "hanziyu",
}, {
    name: "岳明珊",
    en: "yuemingshan",
}, {
    name: "万相东",
    en: "wanxiangdong",
}, {
    name: "万东东",
    en: "wandongdong",
}, {
    name: "杨依彤 陈骏轻",
    en: "yangyitongchenjunqing",
}, {
    name: "赵婧妤",
    en: "zhaojingyu",
}]

var contents = {
    content: ['梳理了一下近一年的高考题里出现过的主要的作文的题材，写作的方法和一些比较出彩的句子。参考且分析了近一年的高考作文原版范文。范文的开头段，结尾段，主体段，中心句，都做了详细分析＋讲解和翻译',
        '今天还是接着上次的进度做了预习。可是本次课的预习，当中涉及了不少上学期的旧内容，主要是希望能够在预习新内容的同时，顾及一下就内容，不要把之前学过的都忘了。情况不是特别好，错误率稍微偏高一些。',
        '今天主要是把课本上前6课的重点知识点先过来一下，重点单词都做了纠音跟读练习，且把比较难写的黑体单词做了默写，到最后基本上都写会了，希望能够继续保持好状态 除此之外，讲了一些重点单词的用法，做了一部分笔记，笔记稍微有一点点凌乱，希望下次课的时候能够克制一下字体。之外，还把课本上的1-5课的课文都作了讲解和对话练习。读出来基本上都不成问题了。里面的一些重点单词都有解释。要记得及时复习',
        '首先把初一年级的一些主要语法点重点做了一下梳理复习和进一步的巩固讲解和练习。基本上重点的一些内容，代词，介词和时态语态方面都有涉及。除此之外，还做了一篇完形。把单选题里面的所有错题做了订正讲解和笔记。完形里面的所有生词和理解不太通顺的句子也做了解释，将结合笔记。',
        '今天带着佳做了一下咱们前几次课内容的一个整体复习。',
        '整体状态比较好，正确率比之前好了不少，但是他现在有点儿骄傲，一定不能一见到成果就开心过度。之所以这次成果比较好，因为有一些题是咱们之前讲过的类似的题型。所以说讲过的，只要再反复的去讲练，还是很有效果。除此之外，今天又讲了一些时态综合方面的内容，为初二正常的时态重点学习打下基础',
    ],
    performance: ['梳理了一下近一年的高考题里出现过的主要的作文的题材，写作的方法和一些比较出彩的句子。参考且分析了近一年的高考作文原版范文。范文的开头段，结尾段，主体段，中心句，都做了详细分析＋讲解和翻译',
        '尤其是一些语法单选题。说明语法这块差的还是稍微多一些。但是由于开学之后，我这块时间也比较紧，估计目前没有时间给子玉做更多的补救。希望课下认真复习咱们本次课的上课内容。尤其是一些单词的正确的读音写法和用法方面。一定要记住，千万别记错了。就时态题的时候一定要看清句子，时间状语，不要弄错了时态。',
        '课下注意复习今天的这些重点。',
        '表现良好',
        '表现欠佳',
    ],
    homework: ['记住一个句子只能有一个谓语动词，不能出现两个动词。',
        '作业是一到五课的课文和1-6课的单词，认真的读一遍课文，写一遍单词',
        '今天的作业是所有的笔记，认真复习一遍，再认真的抄写一遍。正好今天没有带笔记本，我给了他一个大本子，把所有的笔记都写到那个大本子上，以后就用那个大本子来记英语笔记。',
        '希望能够及时的把今天讲的所有题的内容在认真的复习一下，然后再认真写一遍',
        '继续努力',
    ],
}




var step = 0;
var result = {
    date: "",
    name: "",
    content: "",
    performance: "",
    homework: "",
}


// 首页逻辑

const title = $('#title')
const timeS = $('#timeS');
const datePicker = $('#datePicker');
const select = $('#select');
const studentS = $('#studentS');

function setTitle(i) {
    title.text(titleName[i]);
}

function setTimeS(time) {
    const date = $lib.formatDate(time);
    timeS.text(date);
}

function setSelect() {
    var options = "";
    students.forEach(e => {
        options += "<option value ='" + e.name + "'>" + e.name + "</option>";
    });
    select.html(options)
}

function ulTarget(e) {
    console.log(e.toElement)
}

function renderList(dom, key) {
    var lists = "";
    contents[key].forEach(e => {
        lists += '<li>' + e + '</li>';
    });
    var ul = dom.find('ul');
    ul.html(lists)
    ul.on('click', function(e) {
        console.log(e.toElement, this);
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].classList.remove('choosed')
        }
        e.toElement.classList.add('choosed')
    })
}

//初始化事件
setTitle(0);
setTimeS(new Date())
setSelect();
renderList($('#s_1'), 'content')
renderList($('#s_2'), 'performance')
renderList($('#s_3'), 'homework')


datePicker.on('change', function() {
    setTimeS(datePicker.value())
})

select.on('change', function() {
    studentS.text(select.value());
})

function pageNext(i) {
    const now = '#s_' + (i - 1);
    const next = '#s_' + i;
    $(now).toggleClass('hide');
    $(next).toggleClass('hide');
    $(next).toggleClass('showmove');

}


function renderResult() {
    for (const k in result) {
        if (result[k]) {
            $('#res-' + k).find('p').text(result[k])
        } else {
            $('#res-' + k).toggleClass('hide')
        }
    }
}

const nextB = $('#nextB ');

nextB.on('click', function() {
    console.log(step)
    if (step === 0) {
        result.date = timeS.text();
        result.name = studentS.text();
    } else if (step === 1) {
        result.content = $('.choosed').text();
    } else if (step === 2) {
        result.performance = $('.choosed').text();
    } else if (step === 3) {
        result.homework = $('.choosed').text();
        $('#footer').toggleClass('hide');
    }
    step++;
    if (step === 4) {
        title.text(result.name + titleName[step]);
        renderResult();
    } else {
        setTitle(step);
    }
    pageNext(step)
})