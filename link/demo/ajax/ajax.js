    // 合并对象
    const myAssign = function() {
        const argu = arguments;
        var newObj = {};
        for (var i = 0; i < argu.length; i++) {
            if (typeof argu[i] === 'object') {
                for (const k in argu[i]) {
                    newObj[k] = argu[i][k];
                }
            }
        }
        return newObj;
    }
    const postApplicat = function(params) {
        var data = ''
        for (var i in params) {
            if (params[i]) {
                data += encodeURIComponent(i) + '=' + encodeURIComponent(params[i]) + '&'
            }
        }
        data = data.slice(0, -1)
        return data;
    }

    const postFormData = (param, obj) => {
        var data = new FormData();

        for (var i in param) {
            if (param[i]) {
                data.append(i, param[i])
            }
        }
        return data;
    }

    // 首先模拟axios的get和post方法
    const axios2 = {
            default: {
                type: 'get',
                url: '/',
                baseUrl: "",
                param: {},
                isAsync: true,
            },
            Axios: function(options) {
                this.default = myAssign(this.default, options)
                let { type, url, param, isAsync } = this.default;
                var promise = new Promise(function(resolve, reject) {
                    var xhr = null,
                        data;
                    if (window.XMLHttpRequest) {
                        xhr = new XMLHttpRequest();
                    } else {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    }
                    if (type == 'get') {
                        url += '?'
                        for (const k in param) {
                            url += k + '=' + param[k] + '&'
                        }
                        url = url.substr(0, url.length - 1);
                        data = null;
                        xhr.open(type, url, isAsync);
                    } else if (type == 'post') {
                        xhr.open(type, url, isAsync);
                        //如果是post提交，需要将参数传给send；
                        // data = new FormData();
                        // for (var i in param) {
                        //     if (param[i]) {
                        //         data.append(i, param[i])
                        //     }
                        // }
                        // data = postApplicat(param);
                        // data = postFormData(param)
                        data = JSON.stringify(param);
                        //设置请求头
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        // xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundaryQd4C4sgvhQhkdMw0');
                        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    }
                    console.log(data)
                    xhr.send(data);
                    //处理响应
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState !== 4) {
                            return;
                        }
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText))
                        } else {
                            reject(new Error(xhr.statusText));
                        }
                    };

                });
                return promise;
            },
            get: function(url, param) {
                this.default.type = 'get';
                this.default.param = param;
                this.default.url = url;
                return this.Axios();
            },
            post: function(url, param) {
                this.default.type = 'post';
                this.default.param = param;
                this.default.url = url;
                return this.Axios();
            }
        }
        // axios2.Axios({
        //     type: 'get',
        //     url: "http://localhost:3002/login"
        // }).then((data) => {
        //     console.log(data)
        // });

    axios2.post("http://localhost:3002/login", { username: 123 }).then((data) => {
        console.log(data)
    })