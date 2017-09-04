/**
 * Created by 张强 on 2017-09-02.
 * 中秋节项目页面 内容页js内容
 */

// 进度条的初始化
 $(function() {
    $('#jqmeter-container').jQMeter({
        goal:'1,000',
        raised:'200',
        orientation:'vertical',
        width:'36px',
        height:'150px',
        barColor: 'rgb(255, 26, 26)',
        displayTotal: true
    });
 })

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
        // 用户确认分享后执行的回调函数
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
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});

// 分享到QQ
wx.onMenuShareQQ({
    title: '', // 分享标
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});

// 分享到QQ微博
wx.onMenuShareWeibo({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
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
    var url = location.href();
}

// 立即签到
function addEnergy(){

}

// 获取用户信息
function getUserInfo() {
    
}


// 中奖查询
function queryPrize(){

}

// 中奖人手机号码的存储 和 修改
function phoneSave() {
    
}


