# goView
###说明：这是一个页面内跳转的jquery插件
这是一个可以实现页面内跳转的jquery插件，当然也可以轻松实现返回顶部。可以定义动画和回调函数等等
#使用
***
###引入依赖：(Require)
#####你需要在页面中引入以下文件：
>`<!-- jQuery文件。务必在goview.js 之前引入 -->`
>
>`<script src="//cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>`
>
>`<!--必须的库文件-->`
>
>
>`<script src="/javascripts/ajaxpage/ajaxpage.js"></script>`
>




###参数（Options）
***
    //绑定事件
	$("#j-go-view").on("click",function () {
		$("#test").goView({
                "offsetY": -10, //当前元素 Y 轴偏移多少 px
                "speed": 800,  //动画执行的时长，单位毫秒 （ms）
                "before": function () {
                    console.log("Start");
                }, //前置函数，在该插件执行之前执行
                "success": function () {
                    console.log("OK!");
                } //回调函数，在该插件执行之后执行
    	});

	});
    


#### 实现返回顶部（Go top）
***
    //document ready
		$("html").goView({
                "offsetY": 0, //当前元素 Y 轴偏移多少 px
                "speed": 800,  //动画执行的时长，单位毫秒 （ms）
                "before": function () {
                    console.log("Start");
                }, //前置函数，在该插件执行之前执行
                "success": function () {
                    console.log("OK!");
                } //回调函数，在该插件执行之后执行
    	});
    

###代码示例（Demo）
***
* 首先，请下载这个项目，然后打开根目录下的 goViewDemo.html 文件，直接在浏览器中打开预览即可。




###鸣谢（Thanks）
***
* 如果这个项目帮助到了你，你可以点击一下star ，表达一下支持，谢谢。


