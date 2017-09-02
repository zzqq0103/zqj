// 用户的唯一表示 openId，用userId字段进行存储下来
var userId;
$(function (){
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    $(".container").css("width", screenWidth);
    $(".container").css("height", screenHeight);
    console.log(`宽：${screenWidth}，高：${screenWidth}`);
    var code = findCodePara();
    // 微信重定向返回同页面的时刻，需要进行一下url后面带有的search字段的处理。
    if(code){
        Accesscode();
        getUserData();
        // 加载数据格式
        load();
    }
    if(!(type(localStorage.getItem("zqj_openId")) === 'string')){
        // 如果用户清空了微信的所有保持数据，则重新拉取网页授，获取用户信息
        getwechatcode();
    }else{
        load();
    }
})


function load() {
    var zqj_userdata = JSON.parse(localStorage.getItem('zqj_userdata'));
    //  对数据的一些的操作。


}

function findCodePara() {
    if(location.search){
        var searchCode = location.url.split("?")[1].split("&")[0].split("=")[0];
        if(searchCode == 'code'){
            if(location.url.split("?")[1].split("&")[0].split("=")[1]){
                return true;
            }
        }else{
            return false;
        }
    }else{
        return false;
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
            timestamp: configData.timestamp, // 必填，生成签名的时间戳
            nonceStr: configData.nonceStr, // 必填，生成签名的随机串
            signature: configData.signature,// 必填，签名，见附录1
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
    title: '', // 分享标题
    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
    success: function () {
        // 用户确认分享后对在数据库中的用户的OpenID进行计数，参数是openId（用户的唯一凭证）
        addCount(userId)
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});


// 分享到朋友
wx.onMenuShareAppMessage({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
        // 用户确认分享后对在数据库中的用户的OpenID进行计数，参数是openId（用户的唯一凭证）
        addCount(userId)
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});


// 分享到QQ
wx.onMenuShareQQ({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    success: function () {
        // 用户确认分享后对在数据库中的用户的OpenID进行计数，参数是openId（用户的唯一凭证）
        addCount(userId)
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});


//获取微信code
function getwechatcode() {
    // 公众号的唯一APPID
    var appid = "";
    var regPageURL = encodeURI(window.location.href);
    console.log("regPageURL:" + regPageURL);
    //设置 guard 为0，意味已经和微信交互过，登录过。
    location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +appid+"&redirect_uri="+regPageURL+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
}


// 截取微信回传的重定向地址，处理其URL的数据，获取到 code 的信息
// 将 code 参数传到后台，后台通过 code 访问微信官方的接口，获取网页授权access_Token（与普通的access_Token 不同），之后
// 用网页授权的access_Token 和 openId 访问微信提供的接口，获取用户信息，回传用户信息的json对象结构数据
function getUserData() {
    // console.log("此时应该是点击完微信登录界面之后，返回的URL里头，对这个URL进行code的截取的");
    var weixinCode = ""; //存取 微信返回 的 code码
    var regPageURL = window.location.href; //当前的URL地址，包含code 和 state 状态的返回码
    console.log("截取code 中 regPageURL:" + regPageURL);
    weixinCode = regPageURL.split("?")[1].split("&")[0].split("=")[1];
    console.log("weixincode:" + weixinCode +", typeof(weixincode):" + typeof(weixinCode));
    $.ajax({
        method: "POST",
        // async: false, // 设置为同步模式，默认是为true，也就是异步操作
        url: "",
        data: {
            code: code
        },
        dataType: "json",
    }).done(function(data) {
        //  后端返回的用户信息数据对象 data,对象里有头像、openId 等属性数据 ，首先要对对象进行JSON.parse()解析操作，获取原生javascript对象结构数据
        //  渲染页面
        localStorage.setItem('zqj_userdata','data');

    }).fail(function(){
        console.log("获取用户信息失败");
    })
}


function addCount(userId){
    //调用后台的为用户的能量加值
    $.ajax({
        method: "POST",
        url: "",
        data: {
            userId: userId
        },
        dataType:"json"
    }).done(function (data) {
        //  调用成功之后，进行页面的渲染，对页面的树叶图片、能量值进行加值
        if(data.status === 1){ // status =1 表示分享成功，或者是签到成功。
            setEnergy();
        } else{
            //    分享失败 或者 签到失败 的弹框
            showFail();
        }
    }).fail(function(){
        console.log("签到失败")
    })
}

// 点击签到的按钮触发函数
function checkIn(){
    // 如果清空了localStorage，处理函数
    if(type(userid) === "undefined"){

    }
    $.ajax({
        method: "POST",
        url: "",
        data: {
            userId: userId
        },
        dataType:"json"
    }).done(function (data) {
        //  调用成功之后，进行页面的渲染，对页面的树叶图片、能量值进行加值
        if(data.status === 1){ // status =1 表示分享成功，或者是签到成功。
            setEnergy();
        } else{
            //    分享失败 或者 签到失败 的弹框
            showFail();
        }
    }).fail(function(){
        alert("签到失败");
    })
}
