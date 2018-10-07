const http = require("http")
const url = require("url")
const queryString = require("querystring")



const server = http.createServer((req, res) => {
    //req.url 请求的URL
    // GET QUERY params
    res.setHeader("Access-Control-Allow-Origin", "*");
    let methods = req.method;
    console.log("当前的访问方式是:" + methods);
    if (methods == "GET") {
        let params = url.parse(req.url, true, true);
        console.log(params)
            //req.method
        console.log(req.method)
        res.setHeader("content-type", "text/html;charset=UTF-8")
        res.end("hello server! 当前需要查询的id:" + params.query.id)

    } else {
        let datas = "";
        req.on("data", (chunk) => {
            datas += chunk;
            console.log(datas)

        })

        req.on("end", () => {
            //  如果是ajax post请求这里换成JSON.parse
            let postData = queryString.parse(datas.toString())
            console.log(postData)

        })

        res.setHeader("content-type", "text/html;charset=UTF-8")
        res.end("当前请求方式为post")
    }

})


server.listen(3000, () => {
    console.log("server is ready on port 3000")
})