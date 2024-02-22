var cont = document.querySelector(".main");
var isWebkit = "webkitRequestAnimationFrame" in window;
var act_scale = 1;

var appWidth;
var appHeight;
var apps;


window.addEventListener("load", function () {
    resizeApp();
});

function resizeApp() {
    var winHeight, winWidth;
    var appWidth = 870;
    var appHeight = 784;

    winWidth = window.innerWidth;
    winHeight = window.innerHeight;

    console.log(winWidth, winHeight);

    var ws = winWidth / appWidth;
    var hs = winHeight / appHeight;
    act_scale = ws < hs ? ws : hs;

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
        cont.style.msTransformOrigin = "0 0";
        cont.style.msTransform = "scale(" + act_scale + ")";
        cont.style.TransformOrigin = "0 0";
        cont.style.Transform = "scale(" + act_scale + ")";
    } else {
        cont.style.webkitTransformOrigin = "0 0";
        cont.style.webkitTransform = "scale(" + act_scale + ")";
        cont.style.MozTransformOrigin = "0 0";
        cont.style.MozTransform = "scale(" + act_scale + ")";
        cont.style.msTransformOrigin = "0 0";
        cont.style.msTransform = "scale(" + act_scale + ")";
    }

    if (winWidth > winHeight) {
        cont.style.left = (winWidth - appWidth * act_scale) / 2 + "px";
    } else {
        cont.style.left = 0;
    }
    if (typeof setDragContainment == "function") {
        setDragContainment();
    }
}

function getBrowserInfo() {
    var uagent = navigator.userAgent.toLowerCase();
    var _browser = {};

    _browser.chrome =
        /webkit/.test(uagent) && /chrome/.test(uagent) && !/edge/.test(uagent);
    _browser.firefox = /mozilla/.test(uagent) && /firefox/.test(uagent);
    _browser.msie =
        /msie/.test(uagent) || /trident/.test(uagent) || /edge/.test(uagent);
    _browser.safari =
        /safari/.test(uagent) &&
        /applewebkit/.test(uagent) &&
        !/chrome/.test(uagent);
    _browser.opr =
        /mozilla/.test(uagent) &&
        /applewebkit/.test(uagent) &&
        /chrome/.test(uagent) &&
        /safari/.test(uagent) &&
        /opr/.test(uagent);

    return _browser;
}

function isMobileDevice() {
    var ua = navigator.userAgent;
    return /iPad|iPhone OS|Android|Mobi/i.test(ua);
}

window.onresize = function () {
    resizeApp();
};