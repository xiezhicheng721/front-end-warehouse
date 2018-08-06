//第一步：封装一个代替document.getElementById()的方法
function byId(id){
   return typeof(id) === "string"?document.getElementById(id):id;
}
//第二步：获取ID和定义全局变量
var main = byId("main");
var index = 0;
var timer = null; //定于定时器与清除定时器
var pics = byId("banner").getElementsByTagName("div");//找到所有图片
var len = pics.length;
var dots = byId("dots").getElementsByTagName("span") //找到所有圆点
var next = byId("next");//按钮下一张
var prev = byId('prev');//按钮上一张
var menu= byId("menu-content") //获取主菜单ID
var menuTlem = menu.getElementsByClassName("menu-tiem");//获取主菜单的所有class为menu-tiem的每一项
//第三步: 定义执行函数
function slideImg(){
//第四步：鼠标移出时 执行播放效果
	main.onmouseout = function(){   //鼠标移出时 执行播放效果
		timer = setInterval(function(){
			index++
			if(index >= len){  //len的长度为3  下标为0 1 2
				index = 0
			}
			changeImg()  //调用切换图片的函数
		},2000)
	}
//第四步：鼠标移入时停止播放效果
	main.onmouseover = function(){  
		clearInterval(timer)  
	}
//第六步：进去就触发事件使它不用划过也可以自动播放
	main.onmouseout()//脚本自上往下执行,放上面因没有函数可调用会报错	
//第七步：点击圆点切换图片
	for(var j=0; j<len; j++){
		dots[j].id = j;
		dots[j].onclick=function(){
			index = this.id;//index等于当前点击的id显示
			changeImg()
		}
	}
//第八步：点击按钮上下一张
	next.onclick = function(){
		index++
		if(index>=len){    //len为装图片的div个数3
			index = 0;
		}
		changeImg()
	}
//第九步：点击上一张 
	prev.onclick = function(){
		index--
		if(index<0){
			index = 2
		}
		changeImg()
	}
	//第十步：主菜单
	
}
//中途：封装一个切换图片的函数
function changeImg(){
	//遍历banner下所有的div与圆点使它们隐藏和清空
	for(var i=0; i<len; i++){
		pics[i].style.display = "none";
		dots[i].className = "";
	}
	pics[index].style.display = "block"; //index为下标
	dots[index].className = "active"; //class=active设置了白色
}
//第十步：调用函数
slideImg();