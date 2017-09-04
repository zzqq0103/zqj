function shareLoad(){

}



// 为他助力 ，参数是openId
function addEnergy(openId){

}

// 点击关闭按钮，关闭tab
$("#tab-close").on("click",function () {
    $("#tab-box").hide();
})

$(".intro").on("click",function () {
    $("#tab-box").show();
})

// 为他助力
$("#btn-zhuli").on("click",function(){
    var id = localStorage.getItem("friendId");
    //调用加能量值的接口,返回一个是否 加能量 成功的标志
    var flag = addEnergy(id);
    $.toast("助力成功", "text");

})