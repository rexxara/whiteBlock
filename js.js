//创建div
var clock=null;
var state=0;
var speed=2;
function cdiv(className){
    var div = document.createElement('div');
    div.className=className;
    return div;
}
function speed() {
    
}

function crow() {
    var row=cdiv('row');
    var classes=createSn();
    var con=$('container');
    for(var i=0;i<4;i++){
       row.appendChild(cdiv(classes[i]));
    }
    if(con.firstChild== null){
        con.appendChild(row);
    }else{
        con.insertBefore(row,con.firstChild);
    }
    
}
function $(id) {
    return document.getElementById(id);
}
function createSn() {
    var arr=['cell','cell','cell','cell'];
    var index=Math.floor(Math.random()*4);
    arr[index]='cell black';
    return arr;
}

function init() {
    for(var i=0;i<4;i++){
        crow();
    }
    $('main').onclick=function judege(ev) {
        if(state==1){
        if(ev.target.className.indexOf('black')==-1){
            loose();
        }else{
        ev.target.className='cell';
        ev.target.parentNode.pass=1;
        score();
        }
        }
    }
}
function loose() {
         alert("uuuuuuuuuuuuuu loooooooooooose");
         clearInterval(clock);
         state=0;
}
function move() {
    var con= $('container');
    var top=parseInt(window.getComputedStyle(con,null)['top']);
    top+=speed;
    
    con.style.top=top+'px';
    if(top==0){
        crow();
        con.style.top='-100px';
        drow();
    }else if(top == (speed-100)){
        if((con.childNodes.length==5)&&(con.childNodes[con.childNodes.length-1].pass!==1)){
           loose();
        }
    }
}
function start() {
    clock=window.setInterval('move()', 30);
}
function drow() {
   var con=$('container');
   if(con.childNodes.length==6){
     con.removeChild(con.lastChild); 
   }
}
function score() {
    $('score').innerHTML=parseInt($('score').innerHTML)+1;
}
function button() {
    if(state==0){
    start();
    state=1;
    $('score').innerHTML='0';
    }
}
init();