/*！
 * 文件用途说明：
 *    利用canvas 进行绘图的模块
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
     *   绘制一个圆形
     * @param percent
     */
    $.fn.circle = function (percent) {
        var canvas = $(this)[0];
        var ctx = canvas.getContext('2d');

        var start = 0,
            end = percent2N2X(percent); //百分比转 数字 X2
        var animal = setInterval(function () {
            ctx.beginPath();
            //当前动画对应的num
            start += 0.02;
            ctx.arc(175, 175, 150, 0, start * Math.PI);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 10;
            ctx.stroke();
            ctx.closePath();

            //如果动画运行到当前传递的参数位置了 ，就结束掉
            if(start >= end){
                clearInterval(animal);
            }

        }, 2);


    };

    /**
     *  描述：
     *    百分比转数字，然后把结果乘以二
     * @param percent
     */
    function percent2N2X(percent) {
        //必须是数字，否则抛错误
        if (typeof percent !== 'number') {
            throw new error("arguments are not numbers");
        }
        var num = percent / 100 * 2;
        //最大只能返回2
        if (num > 2) {
            num = 2;
        }
        return num;
    }

    //测试一下 percent2N2X
    exports.percent2N2X = function (percent) {
        console.log(percent2N2X(percent));
    };

});
