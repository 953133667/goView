/*！
 * 文件用途说明：
 *    全局公用js模块 dialog，包含了一些整站公用的弹窗 dialog alert confirm toast 等等
 * 作者姓名：
 *    柯德华
 * 联系方式：
 *    TEL:13819497938   Email:953133667@qq.com
 * 制作日期：
 *    2016.5.24
 **/
define(function (require, exports, module) {
    var $ = require('jquery');

    /**
     * 描述：
     *        当document ready 时间被触发时，会调用这个初始化方法，用来初始化一些东西，
     *    比如全局ajax 的配置等等，这个初始化是全局的，也就是说可以把需要全局初始化的
     *    内容写在这里。
     *
     */
    function initGlobal() {
        initAjaxSetings(); //初始化 ajax 配置
    }

    /**
     *  描述：
     *    全局对外的 rootPath 路径，一般用来访问静态资源
     *  @return String localhostPath + projectName;
     */
    var rootPath = (function () {
        // 获取当前网址，如： http://localhost:8083/uimcardprj/share/menu.jsp
        var curWwwPath = window.document.location.href;
        // 获取主机地址之后的目录，如： uimcardprj/share/menu.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        // 获取主机地址，如： http://localhost:8083
        var localhostPath = curWwwPath.substring(0, pos);
        // 获取带"/"的项目名，如：/uimcardprj
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        // 一个临时解决方案，通过.com 或者 .cn  来判断是不是生产环境，来决定是否加入项目名前缀
        if (localhostPath.indexOf(".com") !== -1 || localhostPath.indexOf(".cn") !== -1) {
            projectName = "";
        }
        return localhostPath + projectName;
    })();


    /**
     *  描述：
     *    初始化ajax 的默认配置
     */
    function initAjaxSetings() {
        $.ajaxSetup({
            timeout: 30000, //超时时间设置，单位毫秒
            global: false,
            beforeSend: function () {
                //显示加载窗口
                console.log("正在加载...");
            },
            complete: function (XMLHttpRequest, status) {
                //关闭加载窗口
                DL.dialog.closeLoading();

                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    //globalAjax.abort();
                    DL.dialog.toast("服务器响应超时");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case(500):
                        DL.dialog.toast("服务器系统内部错误");
                        break;
                    case(401):
                        DL.dialog.toast("未登录");
                        break;
                    case(403):
                        DL.dialog.toast("无权限执行此操作");
                        break;
                    case(408):
                        DL.dialog.toast("请求超时");
                        break;
                    default:
                        DL.dialog.toast("未知错误");
                }
            },
            success: function () {
                DL.dialog.toast("操作成功");
            }
        });
    }

    /**
     * 描述：
     *   document ready 事件
     * @param percent
     */
    $(function () {
        initGlobal();
    });

    /**
     * 描述：
     *   对外开放接口
     * @param percent
     */
    module.exports = {
        "rootPath": rootPath
    }

});
