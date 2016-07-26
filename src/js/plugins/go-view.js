/**
 * 名称：go view.
 * 描述：让指定元素到屏幕中间，这里之所以这么设计，是为了让外部在多种条件下，都可以返回顶部
 * By：kedehua
 * Date：2016-7-26
 * Email：953133667@qq.com     TEL：13819497938
 *
 */
;(function ($) {
    $.fn.goView = function (options) {
        var options = $.extend({
            "offsetY": -40, //当前元素 Y 轴偏移多少
            "speed": 800  //动画执行的时长
        },options || {});

        //得到 this 对象
        var $this = $(this);

        //得到 Y 轴坐标，然后加上偏移数值
        var scrollTo = $this.offset().top + options.offsetY;

        //开始动画
        $("html,body").animate({"scrollTop":scrollTo},options.speed);
    }
})(jQuery);
