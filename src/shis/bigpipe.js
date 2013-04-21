/**
 * Created with JetBrains PhpStorm.
 * User: yize
 * Date: 13-3-19
 * Time: 上午9:32
 */

KISSY.add('shis/bigpipe', function (S, his) {

    console.log(this);
    var $ = S.all;
    var container;



    var init = function () {
        //监听XHR事件
        listenXhr();
        //绑定事件
        bindEvent();
    };

    var ajaxRec = [];

    var listenXhr = function () {
        //监测所有的ajax请求
        S.io.on("start", function (ev) {
            ajaxRec.push(ev);
        });

        S.log('history.js:开始监听所有Xhr请求');
    };

    var abortXhr = function () {
        S.each(ajaxRec, function (rec) {
            if (rec && rec.xhr) {
                S.log(rec.xhr, 'abort');
                rec.xhr.abort();
            }
        });
        //请求abort掉以后,清空ajaxRec
        ajaxRec = [];
    };

    var bindEvent = function () {
        $(document.body).on('click', function (ev) {
            var target = $(ev.target);
            if (target[0].tagName.toLowerCase() === 'a' && target.attr('data-bpfilter') && S.one('#bpf_' + target.attr('data-bpfilter')) && !ev.ctrlKey && /^\//.test(target.attr('href'))) {
                ev.preventDefault();
                container = S.one('#bpf_' + target.attr('data-bpfilter'));
                his.push(target.attr('href'), handle);
            }
        });

        if (his.isSupportState) {
            $(window).on('popstate', function (ev) {
                var state = ev.originalEvent.state;
                console.log('onpopstate', state);
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

    var loadingTimer;

    var loading = function (callback) {
        loadingTimer = S.later(function () {
            container && container.addClass(LOADINGCLS);
            container && container.html(LOADINGMSG);
        }, 100);
        callback && callback.call(this);
    };

    var urlMap = {

    };

    var getCss = function(){
        if($CONFIG && $CONFIG.prevCss){

        }
        var style = S.getScript($CONFIG.prevCss.toString(),{
            timeout:3,
            success:function(){
                callback && callback();
            },error:function(){
                callback && callback();
            }
        });
        $(style).addClass('shis-ajax-css');
    };

    var removePrevCss = function(){
        $('.shis-ajax-css').remove();
    };

    var reset = function(){
        abortXhr();
        removePrevCss();
    };

    var handle = function (url) {
        reset();
        loading(function () {
            ajax(url);
        })
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
//                if(data.success){
                    loadingTimer && (function () {
                        loadingTimer.cancel();
                    })();
                    try {
                        container.removeClass(LOADINGCLS);
                        debugger;
                        container.html(data);
                    } catch (e) {
                        throw new Error('shis:没有找到容器');
                    }
//                }else{

//                }
            },
            error:function(){
                throw new Error('shis:数据加载失败,Error');
            }
        })
    };

    var shis = {
        init: init,
        setLoadingCls: setLoadingCls,
        setLoadingMsg: setLoadingMsg
    };

    return shis;

}, {requires: ['./history']});