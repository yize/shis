KISSY.add('shis/url',function(S){

    var parse = function (url) {
        var reg = /^(?:([A-Za-z]+:)\/{0,3})?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:(\/[^?#]*))?(?:(\?[^#]*))?(?:(#.*))?$/,
            arr = ["href", "protocol", "hostname", "port", "pathname", "search", "hash"],
            execUrl = reg.exec(url),
            purl = {};
        var i = execUrl.length;
        while (i--) {
            purl[arr[i]] = execUrl[i] || "";
        }
        purl["host"] = purl["hostname"] ? purl["hostname"] + (purl["port"] ? ":" + purl["port"] : "") : "";
        return purl;
    };

    var safe = function () {
        return decodeURIComponent(window.location.toString());
    };

    var removeHash = function (url) {
        return url.replace(/#.*$/, "");
    };

    var isSame = function (url1, url2) {
        return removeHash(url1) == removeHash(url2);
    };

    var toSting = function(purl){
        var url = purl?purl.href:parse(safe()).href;
        return url;
    };

    var getUrl = function (url) {
        var purl = parse(url || safe());
        if(/^#!\//.test(purl.hash)){
            var hash = purl.hash.substr(2);
            var furl = purl.host +hash;
            purl = parse(furl);
        }
        return purl;
    };

    var setPlainHash = function(){

    };

    var setQuery = function (query){
        var pquery = KISSY.unparam(query);
        var oldquery = getUrl().search?getUrl().search.substr(1):'';
    };



    var url = {
        parse:parse,
        safe:safe,
        removeHash:removeHash,
        isSame:isSame,
        getUrl:getUrl
    };

    S.url = url;
    console.log(KISSY.url.getUrl());
    return url;

});
