/**
 * Created by 张强 on 2017-09-02.
 * 中秋节项目页面 内容页js内容
 */

var appId = 'wx0033267d6d347c18';
var share_url = '';
// var open_id = JSON.parse(localStorage.getItem("userinfo")).openid?JSON.parse(localStorage.getItem("userinfo")).openid:'';
var open_id = '123';
// var headerImg = JSON.parse(localStorage.getItem("userinfo")).headimg?JSON.parse(localStorage.getItem("userinfo")).headimg:'';
var headerImg = '1234';
var energy = 0;
// 播放图标的函数设定
!function () {
    var e = document.getElementsByClassName("audio")[0], a = function (e, a) {
        var t = new RegExp("(^| )" + a + "( |$)");
        t.test(e.className) || (e.className = e.className.trim() + " " + a)
    }, t = function (e, a) {
        if (!e || 1 != e.nodeType)throw new Error("第一参数ele需要是一个DOM元素对象");
        if ("string" != typeof a)throw new Error("第二参数必须为string类型");
        var t = new RegExp("(?:^| )" + a + "(?: |$)", "g");
        e.className = e.className.replace(t, "").trim()
    };
    e.onclick = function () {
        var n = document.getElementById("media");
        null !== n && (n.paused ? (n.play(), a(e, "rotate")) : (n.pause(), t(e, "rotate")))
    }
}();

// 进度条的初始化
 $(function() {
     // energy = getEnergy();
     var screenwidth = document.documentElement.clientWidth; ;
     var screenheight = document.documentElement.clientHeight;
     if(screenheight < 510 || screenwidth <= 320){
         $('#jqmeter-container').jQMeter({
             goal:'1,000',
             raised:''+energe*10+'',
             orientation:'vertical',
             width:'20px',
             height:'120px',
             barColor: 'rgb(255, 26, 26)',
             displayTotal: false
         });
     }else{
         $('#jqmeter-container').jQMeter({
             goal:'1,000',
             raised:''+energe*10+'',
             orientation:'vertical',
             width:'25px',
             height:'160px',
             barColor: 'rgb(255, 26, 26)',
             displayTotal: false
         });
     }
 })

function setjindutioa(energy){
     var allEnergy = energy*10;
    var screenwidth = document.documentElement.clientWidth; ;
    var screenheight = document.documentElement.clientHeight;
    if(screenheight < 510 || screenwidth <= 320){
        $('#jqmeter-container').jQMeter({
            goal:'$1,000',
            raised:'%'+allEnergy+'',
            orientation:'vertical',
            width:'20px',
            height:'120px',
            barColor: 'rgb(255, 26, 26)',
            displayTotal: false,
            animationSpeed: 500
        });
    }else{
        $('#jqmeter-container').jQMeter({
            goal:'1,000',
            raised:''+allEnergy+'',
            orientation:'vertical',
            width:'25px',
            height:'160px',
            barColor: 'rgb(255, 26, 26)',
            displayTotal: false,
            animationSpeed: 500
        });
    }
}

// 配置微信的JDK接口调用，返回值为对象，时间戳信息等等
function config_wechatJDK(){
    // 获取后端返回的签名signature字段
    var config;
    $.ajax({
        async:false, //由于需要返回操作成功之后的数据值，等待ajax请求处理完，同步操作
        method:"GET",
        url:"", //服务端提供的接口
        dataType:"json"
    }).done(function (data) {
        config = data;
    })
    return config;
}

$(function(){
    var configData = config_wechatJDK();
    // configData 可能需要做一个JSON.parse调用，转成javascript 对象结构
    // var configData = JSON.parse(config_wechatJDK());
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        // timestamp: configData.timestamp, // 必填，生成签名的时间戳
        // nonceStr: configData.nonceStr, // 必填，生成签名的随机串
        // signature: configData.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    // 通过ready接口处理成功验证
    wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
    }
)

// 分享到朋友圈
wx.onMenuShareTimeline({
    title: '中秋节快乐！', // 分享标题
    link: share_url+'?'+'userId='+userId+"&headImg="+headerImg, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});

// 分享到朋友
wx.onMenuShareAppMessage({
    title: '中秋节快乐！', // 分享标题
    desc: '为他助力', // 分享描述
    link: share_url+'?'+'userId='+userId+"&headImg="+headerImg, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});

// 存储用户的openId 
var userId;
function  load() {
    // setTree(energy);
    // var code = checkCode();
}

// 立即签到
function addEnergy(){
    // $.ajax({
    //     method:"POST",
    //     url:"",
    //     data:{
    //         params:{
    //             openId:open_id
    //         }
    //     },
    //     dataType:'json'
    // }).done(function(data){
    //     if(data.detail.flag){
    //         $("#energy_num").innerText(''+data.detail.energy+'');
    //         setjindutioa(data.detail.energy);
    //         checkTree(data.detail.energy);
    //     }else{
    //         showMsg('签到失败','center');
    //     }
    // })
    energy = energy + 1;
    if(energy >100){
        showMsg('您已经完成任务！','center');
    }else{
        $("#energy_num").text(''+energy+'');
        checkTree(energy);
        setjindutioa(energy);
    }
}


function checkTree(x) {
    console.log(x);
    if(x<25){
        $("#tree_image").attr("src","img/tree-1.png");
    }else if(25 < x < 45){
        $("#tree_image").attr("src","img/tree-2.png");
        console.log('2');
    }else if(45 <= x < 70){
        $("#tree_image").attr("src","img/tree-3.png");
        console.log('3');
    }else if(70 <= x < 95){
        $("#tree_image").attr("src","img/tree-4.png");
        console.log('4');
    }else {
        $("#tree_image").attr("src","img/tree-5.png");
        console.log('5');
    }
}

// 获取用户信息
function getUserInfo() {

}


// 中奖查询
function queryPrize(){
    $.ajax({
        method:"POST",
        url:"",
        data:{
            params:{
                openId:open_id
            }
        },
        dataType:'json'
    }).done(function(data){
        if(data.detail.flag){
            className = $("#btn-start").attr('id');
            $('#dialogBg').fadeIn(300);
            $('#dialog').removeAttr('class').addClass('animated '+className+'').fadeIn();
        }else{
            showMsg('很抱歉，您未能中奖！','center');
        }
    })
}
//
// $("#tree").on("click",function(){
//         $("#tree img").attr("src","img/tree-2.png");
//     }
// );

$("#btn-zhuli").on("click",function () {
    addEnergy();
})

// 点击关闭按钮，关闭tab
$("#tab-close").on("click",function () {
    $("#tab-box").hide();
})

$(".intro").on("click",function () {
    $("#tab-box").css("display","block");
    $("#tab-box").show();
})

$("#btn-start").on("click",function () {
    // queryPrize(open_id);
    className = $("#btn-start").attr('id');
    $('#dialogBg').fadeIn(300);
    $('#dialog').removeAttr('class').addClass('animated '+className+'').fadeIn();
})

//关闭弹窗
$('.claseDialogBtn').click(function(){
    $('#dialogBg').fadeOut(300,function(){
        $('#dialog').addClass('bounceOutUp').fadeOut();
    });
});

$(".submitBtn").on("click",function () {
    var name = $("#username").value;
    var phone = $("#phone").value;
    if(!name || !phone ){
        showMsg('请填写全部信息','center');
        return;
    }else{
        localStorage.setItem("userPhone",phone);
        localStorage.setItem("userName",name);
        // 将 名称 姓名 电话 传给后台。
        $.ajax({
            method:"POST",
            url:"",
            data:{
                params:{
                    openid:open_id,
                    phone:phone,
                    name:name
                }
            },
            dataType:'json'
        }).done(function(data){
            console.log("返回");
        })
    }
})





