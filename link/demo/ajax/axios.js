(function(w, d) {
    // axios对象
    var axios = {};

    function init(config) {

    }

    init.prototype.Axios = function() {}
    init.prototype.get = function() {
        console.log(2)
    }

    init.prototype.create = function() {
        return this.Axios;
    }
    axios = init.prototype;



    w.axios = new init();

})(window, document)