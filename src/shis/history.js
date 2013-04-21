KISSY.add('shis/history', function (S, surl) {

//    var $ = S.all;

    var isSupportState = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/(iPod|iPhone|iPad|WebApps\/.+CFNetwork)/);
//    var isSupportState = false;

    var isSame = surl.isSame;

    /**
     * 写入history保存
     * @param url(页面地址)
     * @param callback(写入以后的回调)
     */
    var push = function (url,callback) {
        var l = surl.getUrl().pathname;
        if (isSupportState) {
            //如果链接没有发生改变的话,不再重复记入state
            if (!isSame(l, url)) {
                history.pushState({url: url}, null, url);
            }
            callback && callback(url);
        } else {
            if (!isSame(l, url)) {
                //hashchange的监听会触发handle()事件
                location.hash = '#!' + url;
            } else {
                //如果链接还是跟当前一样,直接执行handle事件,不记入历史记录
                callback &&  callback(url);
            }
        }
    };



    var shis = {
        isSupportState:isSupportState,
        push:push
    };

    return shis;
}, {requires: ['./url']});