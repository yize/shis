KISSY.add('shis/history', function (S, surl) {

    var $ = S.all;

    var isSupportState = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/(iPod|iPhone|iPad|WebApps\/.+CFNetwork)/);
//    var isSupportState = false;

    var init = function () {
        bindEvent();
        listenXhr();
    };

    var container;

    var isSame = surl.isSame;

    var push = function (url) {
        var l = surl.getUrl().pathname;
        if (isSupportState) {
            if (!isSame(url1, url)){
                history.pushState({url: url}, null, url);
            }
            handle(url);
        } else {
            if (!isSame(l, url)){
                location.hash = '#!' + url;
            }else{
                handle(url);
            }
        }
    };

    var bindEvent = function () {
        $(document.body).on('click', function (ev) {
            var target = $(ev.target);
            if (target[0].tagName.toLowerCase() === 'a' && target.attr('data-bpfilter') && S.one('#bpf_' + target.attr('data-bpfilter')) && !ev.ctrlKey && /^\//.test(target.attr('href'))) {
                ev.preventDefault();
                container = S.one('#bpf_' + target.attr('data-bpfilter'));
                push(target.attr('href'));
            }
        });

        if (isSupportState) {
            $(window).on('popstate', function (ev) {
                var state = ev.originalEvent.state;
                if (state && state.url) {
                    handle(state.url);
                }
            });
        } else {
            $(window).on('hashchange', function () {
                if (/^#!\//.test(location.hash)) {
                    var url = location.hash.substr(2);
                    handle(url);
                }
            })
        }
    };

    var LOADINGCLS = 'ks-loading';
    var LOADINGMSG = '<p>正在加载中，请稍候...</p>';

    var setLoadingCls = function (cls) {
        LOADINGCLS = cls;
    };

    var setLoadingMsg = function (msg) {
        LOADINGMSG = msg;
    };

    var timer;

    var loading = function (callback) {
        timer = S.later(function(){
            container.addClass(LOADINGCLS);
            container.html(LOADINGMSG);
        },100);
        callback && callback.call(this);
    };

    var ajaxRec = [];

    var listenXhr = function () {
        //监测所有的ajax请求
        S.io.on("start", function (ev) {
            ajaxRec.push(ev);
        });

        console.log('history.js:开始监听所有Xhr请求');
    };

    var abortXhr = function () {
        S.each(ajaxRec, function (rec) {
            if (rec && rec.xhr) {
                console.log(rec.xhr, 'abort');
                rec.xhr.abort();
            }
        });
        ajaxRec = [];
    };

    var findAjaxUrl = function (url) {
        return url;
    };

    var ajax = function (url) {
        var url = findAjaxUrl(url);
        SNS.ajax({
            url: url,
            data: {
                isAjax: 1
            },
            type: 'get',
            datatype: 'html',
            success: function (data) {
                timer && (function(){
                    timer.cancel();
                })();
                S.log(data);
                container.removeClass('ks-loading');
                container.html(data);
            }

        })
    };

    var handle = function (url) {
        abortXhr();
        loading(function () {
            ajax(url);
        })
    };

    var shis = {
        init: init
    };

    return shis;
}, {requires: ['./url']});