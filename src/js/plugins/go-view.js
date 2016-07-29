/**
 * 名称：go view.
 * 描述：让指定元素到屏幕中间，这里之所以这么设计，是为了让外部在多种条件下，都可以返回顶部
 * By：kedehua
 * Date：2016-7-26
 * Email：953133667@qq.com 
 *
 */
;(function ($) {
    var _mark = true;//请求开关, true可请求, false不可

    $.fn.goView = function (options) {
        var options = $.extend({
            "offsetY": -40, //当前元素 Y 轴偏移多少 PX
            "before": function () {},//在开始动画之前执行的函数
            "success": function () {}, //在开始动画之后执行的回调函数
            "offsetY": -40, //当前元素 Y 轴偏移多少 PX
            "speed": 800  //动画执行的时长
        }, options || {});

        //得到当前对象
        var $this = this;

        //请求开关, true可请求, false不可 防止重复执行
        if (!_mark) {
            return $this;
        }
        _mark = false;

        //执行前置函数
        options.before();

        //得到 Y 轴坐标，然后加上偏移数值
        var scrollTo = $this.offset().top + options.offsetY;

        //回调只能执行一次
        var callNum = 0;
        //开始动画 //执行回调函数
        $("html,body").animate({scrollTop: scrollTo}, options.speed, function () {
            if(callNum <1){
                options.success();
                callNum ++;
            }

            _mark = true;
        });

        return $this;
    }
})(jQuery);
