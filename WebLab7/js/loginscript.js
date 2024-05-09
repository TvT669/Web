 window.onload = function() {
	 /* localStorage.clear(); */
	        /* 17、调用随机码生成函数创建随机码 */
             createVerifCode();

			/*18、查找标签名为'li'的元素赋值给myLi变量*/
            var myLi = document.getElementsByTagName('li');

			/*19、查找id为'userarea'的元素赋值给fUser变量*/
            var fUser = document.getElementById('userarea');

			/*20、fUser变量关联的元素下查找标签名为'div'的元素赋值给myUser变量*/
            var myUser = fUser.getElementsByTagName('div');

			for (var i = 0; i < myLi.length; i++) {
		        myLi[i].index = i;
				/*21、将myLi[i]所关联的元素与鼠标按下（onmousedown）事件动态绑定，
				并在指定的事件处理函数中调用show函数，且传递参数当前对象的index值，
				*/
                myLi[i].onmousedown = function () { show(this.index);}


		    }			
		    function show(index) {
		        		       
		        for (var j = 0; j < myLi.length; j++) {
		           /*22、如果j==index，则myUser[j]所关联元素样式的zIndex属性值修改为1,
					否则修改为0。
				   */ 
                    if (j == index) {
                        myUser[j].style.zIndex = 1;
                    }
                    else {
                        myUser[j].style.zIndex = 0;
                    }
		        }						 
							
		    }
		}
function createVerifCode(){
	var chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var randcode="";
	for(var i=0;i<5;i++){//5位随机码
		/*23、将产生的[0,chars.length)之间的整数赋值给randpos变量*/
        var randpos = Math.floor(Math.random() * chars.length);

		randcode+= chars[randpos];
	}
	/*24、将产生的随机码赋值给验证码显示区域的内容*/
    document.getElementById("verifCode").innerHTML = randcode;

}
var user =new Object();
user.name="";
user.pass="";

function login(){
	/*25、获取用户名文本框中输入的值赋值给userName变量*/
    var userName = document.getElementById("loginUserName").value;


	/*26、获取密码文本框中输入的值赋值给userPass变量*/
	var userPass= document.getElementById("loginUserPass").value;

	var num = localStorage.length;	
	for (var i = 0; i < num; i++) {				
	   var name = localStorage.key(i);
	   var storageuser= JSON.parse(localStorage.getItem(name));
	  /*27、在循环如果存在获取的文本框中的用户名和密码
	  与存储用户的用户名和密码都相等则结束循环*/		
        if (storageuser.name == userName && storageuser.pass == userPass) {
             break;
        }

	}
	if(i==num){
	    alert("用户名不存在或密码不正确！");
	} 
	 else{
		 /*28、获取验证码显示区域的内容赋值给code变量*/
		 var code=document.getElementById("verifCode").innerHTML;
		 
		 /*29、获取验证码文本框中输入的值赋值给usercode变量*/
		 var usercode=document.getElementById("userverifCode").value;

		 
		 /*30、如果code与usercode变量的值相等，会弹出警告框，框中的信息为"登录成功"
		       否则会弹出警告框，框中的信息为"验证码不正确"
		 */
        if (code == usercode) {
            alert("登录成功");
        }
        else {
            alert("验证码不正确");
        }

	 }
	document.getElementById("loginUserName").value="";
	document.getElementById("loginUserPass").value="";
	document.getElementById("userrandcode").value="";
	createRandCode();
}


function regist(){		
	var sName=document.getElementById("registUserName").value;
	var sPass=document.getElementById("registUserPass").value;
	var cPass=document.getElementById("conformPass").value;
	if(sPass==cPass){
		user.name=sName;
		user.pass=sPass;
		var num = localStorage.length;
		var n=num+1;
		if(num==0){
			localStorage.setItem(n,JSON.stringify(user));
			alert("已经注册成功！");
		}
		else{			
			for (var i = 0; i < num; i++) {				
			   var name = localStorage.key(i);
			   var storageuser= JSON.parse(localStorage.getItem(name));
			   if(storageuser.name==user.name){
			     alert("该用户名已经存在，请重新输入");
				break;
			   }
			}
			if(i==num){
			  localStorage.setItem(n,JSON.stringify(user));
			   alert("已经注册成功！");
			}  
		}	
	}
	else
	   alert("确认密码不一致！");
	document.getElementById("registUserName").value="";
	document.getElementById("registUserPass").value="";
	document.getElementById("conformPass").value="";
	
}