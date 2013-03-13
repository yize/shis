;
(function (S) {
    var $ = S.all;
    var Event = S.Event;

    var isSupportedState = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/(iPod|iPhone|iPad|WebApps\/.+CFNetwork)/);

    var filter = function (id) {
        return $('#bpf_' + id);
    };

    KISSY.config({
        packages:[
            {
                name:"shis", //包名
                tag:"20110323", //时间戳, 添加在动态脚本路径后面, 用于更新包内模块代码
                path:"../src/" //包对应路径, 相对路径指相对于当前页面路径
            }
        ]
    });

    KISSY.use('shis/history', function (S, shis) {

        shis.init();
//        $('body').all('a').on('click', function (ev) {
//
//            var target = $(ev.currentTarget);
//            var fid = target.attr('bpfilter');
//            var link = target.attr('href');
//            var container = filter(fid);
//            if (/^\//.test(link) && container.length && !ev.ctrlKey && !ev.shiftKey) {
//                S.log("shis: 点击行为拦截成功，使用Bigpipe模式加载");
//
//                Event.fire(window, 'pageletstart', {url:link, bpfilter:fid});
//                container.html('<div class="loading"><p>加载中，请稍候……</p></div>');
//                KISSY.ajax({
//                    url:link,
//                    success:function (d) {
//                        history.pushState(null, null, link);
//                        Event.fire(window, 'pageletbeforehtml', {url:link, bpfilter:fid});
//                        container.html(d);
//                        Event.fire(window, 'pageletfinish', {url:link, bpfilter:fid});
//                    }
//                });
//                ev.preventDefault();
//            }
//        });

//        Event.on(window, 'pageletstart', function (ev) {
//            var url = ev.url;
//        });
//
//        Event.on(window, 'popstate', function (ev) {
//            var state = ev.originalEvent.state;
//            if (state && state.url) {
//                console.log(state.url);
//            }
//        });

    });


})(KISSY);
