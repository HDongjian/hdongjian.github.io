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
    // console.log(e.toElement)
}

function renderList(dom, key) {
    var lists = "";
    contents[key].forEach(e => {
        lists += '<li>' + e + '</li>';
    });
    var ul = dom.find('ul');
    ul.html(lists)
    ul.on('click', function(e) {
        // console.log(e.toElement, this);
        // for (var i = 0; i < this.children.length; i++) {
        //     this.children[i].classList.remove('choosed')
        // }
        $('.choosed').toggleClass('choosed')
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
    // console.log(step)
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
    // console.log(result)
    pageNext(step)
})