
//定时器
var clock=null;
//游戏状态，0为未开始1为运行中
var state=0;
//游戏速度，每30毫秒移动的像素
var speed=2;
//创建一个div，参数为创建div的类名
function cdiv(className){
    //document对象下的createelemengt函数
    var div = document.createElement('div');
    //给创建的div赋类名，后面一个classname是参数名
    div.className=className;
    //返回创建好的带有类名的div
    return div;
}
//创建一行，这一行里面四个div里面有1个是黑色的
function crow() {
    //调用cdiv函数，返回一个div
    var row=cdiv('row');
    //调用createSn函数，class为一个数组 其中有一个值为cell black
    var classes=createSn();
    //调用$这个函数  好像是个= =嗯。。php的东西，传递container的参数给con
    var con=$('container');
    //创建四个div，就是方块
    for(var i=0;i<4;i++){
        //创建子元素函数，并给其赋classname，
        //其中一个类名是black ？？为什么不是cellblack
       row.appendChild(cdiv(classes[i]));
    }
    //判断，因为要在最上面创建一行div
    if(con.firstChild== null){
        //firstchild值为null证明一行都没有，如果一行都没有，就创建一行
        con.appendChild(row);
    }else{
        //如果有，就在第一个子元素（firstchild）上面创建一行
        con.insertBefore(row,con.firstChild);
    }
    
}
//这是个长得像php的函数 专门用来得到一个元素的id，其实也没有方便多少。。
function $(id) {
    return document.getElementById(id);
}
//createSn函数，返回一个数组，其中有四个元素，三个为cell，一个为cell black
//不太清楚为什么是cell black而不是cell
function createSn() {
    var arr=['cell','cell','cell','cell'];
    //随机一个0到1然后×4，floor清掉小数部分
    var index=Math.floor(Math.random()*4);
    //给那个随机的数组元素赋值cell black
    arr[index]='cell black';
    //返回这个数组
    return arr;
}
//刚开始创建四行的函数
function init() {
    for(var i=0;i<4;i++){
        crow();
    }
    //在主界面main被点击时进行判断
    $('main').onclick=function judege(ev) {
        //如果正在游戏中就运行下列代码
        if(state==1){
            //点到白色的方块上
        if(ev.target.className.indexOf('black')==-1){
            //执行失败函数
            loose();
        }else{
            //点到黑色的了
        ev.target.className='cell';
        //把他变成白色的，改变类名
        ev.target.parentNode.pass=1;
        //给这行添加一个pass属性，证明这行点过了
        score();
        //+1分
        }
        }
    }
}
//失败的时候执行的函数
function loose() {
    //弹出提示 你跪了
         alert("uuuuuuuuuuuuuu loooooooooooose");
         //清除定时器 这样就会停下来
         clearInterval(clock);
         //游戏状态转为未开始
         state=0;
}
//让白块动起来
function move() {
    //传递参数
    var con= $('container');
    //得到已经计算好的container的高度值
    var top=parseInt(window.getComputedStyle(con,null)['top']);
    //整个container下落2像素
    top+=speed;
    con.style.top=top+'px';
    //当top值变为0时在最上面创建一行div
    //再将top值转为-100 container向上提
    //删掉最后哪一行
    if(top==0){
        crow();
        con.style.top='-100px';
        drow();
    }else if(top == (speed-100)){
        //当top不是0的时候 判断掉下的到底的哪一行pass属性值是否等于1，不等于则输掉
        if((con.childNodes.length==5)&&(con.childNodes[con.childNodes.length-1].pass!==1)){
           //子节点长度是算空格的，刚开始不能删除div所以要先判断是不是有5行 然后判断  倒数第二，也就是能看到的最后一行的pass值
           loose();
        }
    }
}
//开始
function start() {
    //设置clock定时器30毫秒执行一次move函数
    clock=window.setInterval('move()', 30);
}
//删除行
function drow() {
    //传递参数
   var con=$('container');
   //操作子节点，删掉最后一个，节点长度。。还不太会用
   if(con.childNodes.length==6){
     con.removeChild(con.lastChild); 
   }
}
//计算得分函数
function score() {
    //每次+1 innerHTML很暴力 parseint，转换字符串为int型数值
    $('score').innerHTML=parseInt($('score').innerHTML)+1;
}
//感觉有了这个函数start可以不存在了。。。按下start键开始执行
function button() {
    //如果没开始
    if(state==0){
        //执行开始函数，状态变为游戏中
        //上次得分清零
    start();
    state=1;
    $('score').innerHTML='0';
    }
}
//已经准备好的几行白块，感觉可以放在button函数里
init();

//解决点过的白块再点会输
//加速
//花式界面= = 