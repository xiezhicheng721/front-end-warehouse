//页面逻辑执行
$(function() {
	uiSearch(); //搜索
	UiTab(); //选项卡
	block_Tab();
	goTop(); //返回顶部
	$('.ui-slider').UiSlider();
	logIn()
})

//ui-search 页头搜索
function uiSearch() {
	$(".ui-search-selected").click(function() {
		$('.ui-search-select-list').show();
		return false; //用于消除冒泡，若不设置会直接触发body事件，使菜单隐藏
	})
	//2.替换文本 且隐藏
	$('.ui-search-select-list>a').click(function() {
		$('.ui-search-selected').text($(this).text());
		$('.ui-search-select-list').hide();
		return false
	})
	//3.点击body隐藏下拉菜单
	$('body').click(function() {
		$('.ui-search-select-list').hide()
	})
}

//tab选项卡
//外层
function UiTab() {
	$('.caption>.item').on('click', function() {
		var index = $(this).index(); //获取当前.caption>.item的下标
		$(this).addClass('item_focus').siblings().removeClass('item_focus'); //当前添加类，兄弟删除类
		$('.block >.item').eq(index).show().siblings().hide(); //对应下标显示
	})
}
//内层
function block_Tab() {
	$('.block-caption>a').on('click', function() {
		var index = $(this).index();
		$(this).addClass('block-caption-item_focus').siblings().removeClass('block-caption-item_focus');
		$('.block-wrap').eq(index).show().siblings().hide();
	})
}

//返回顶部
function goTop() {
	//1.监听滚动
	$(window).on('scroll', function() {
		//2.获取页面滚动距离
		var top = $('body').scrollTop() + $('html').scrollTop();
		if(top > 600) {
			$('.go-top').show();
		} else {
			$('.go-top').hide();
		};
	});
	$('.go-top').on('click', function() {
		$(window).scrollTop(0);
	});
}

//轮播图
// ui-slidder 
//	1. 左右箭头需要能控制翻页
//	2. 翻页的时候，进度点，要联动进行focus
//  3. 翻到第三页的时候，下一页需要回到 第一页，翻到第一页的时候，同理
//  4. 进度点，在点击的时候，需要切换到对应的页面
//  5. 没有（进度点点击、翻页操作）的时候需要进行自动滚动
//  6. 滚动过程中，屏蔽其他操作（自动滚动、左右翻页、进度点点击）
//	7. 无缝滚动
$.fn.UiSlider = function() {
	var ui = $(this);
	var wrap = $('.ui-slider-wrap');
	var btn_prev = $('.ui-slider-arrow .left', ui);
	var btn_next = $('.ui-slider-arrow .right', ui);
	var items = $('.ui-slider-wrap .item', ui);
	var tips = $('.ui-slider-process .item', ui);
	//	预定义
	var current = 0;
	var size = items.size();
	var width = items.eq(0).width();
	var enableAuto = true;
	//	设置自动滚动感应（如果鼠标在 wrap 中，不要自动滚动）
	ui
		.on('mouseover', function() {
			enableAuto = false;
		})
		.on('mouseout', function() {
			enableAuto = true;
		})
	//	具体操作
	wrap
		.on('move_prev', function() {
			if(current <= 0) {
				current = size;
			}
			current = current - 1;
			wrap.triggerHandler('move_to', current);
		})
		.on('move_next', function() {
			if(current >= size - 1) {
				current = -1;
			}
			current = current + 1;
			wrap.triggerHandler('move_to', current);
		})
		.on('move_to', function(evt, index) {
			wrap.css('left', index * width * -1);
			tips.removeClass('item_focus').eq(index).addClass('item_focus');
		})
		.on('auto_move', function() {
			setInterval(function() {
				enableAuto && wrap.triggerHandler('move_next');
			}, 2000);
		})
		.triggerHandler('auto_move');

	//	事件
	btn_prev.on('click', function() {
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click', function() {
		wrap.triggerHandler('move_next');
	});
	tips.on('click', function() {
		var index = $(this).index();
		wrap.triggerHandler('move_to', index);
	})
}

//登录弹出层
function logIn() {
	$('.loginLink').click(function() {
		$('.layer-mask').show();
		$('.layer-pop').show();
		submitBtn(); //判断函数
		//点击关闭按钮
		$('.layer-close').click(function() {
			$('.layer-mask').hide();
			$('.layer-pop').hide();
			$('.error-msp').html(null)
		})
	})
}
//登录判断
function submitBtn(){
	$('#submit').click(function(){
		var usrName = $('#username').val();
	    var passWorda = $('#password').val();
	    if (usrName.length<6 || usrName.length>12) {
	    	$('.error-msp').html("输入的账号错误！");
	    } else if (passWorda ==="123456") {
	    	alert("登录成功")
	    	$('.error-msp').html(null)
	    } else{
	    	$('.error-msp').html("输入的密码错误！");
	    }{
	    	
	    }
	})
}
