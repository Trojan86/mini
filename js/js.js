var srcImg = ["img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png","img/8.png","img/9.png","img/10.png"];
var counter = 0;
var cardSrc = "#cards";
var opId = "";
var opImg = "";
var foundImg = 0;
setTimeout(function(){
    $("#main").fadeIn();
},500);
$(function(){
for (var i = 1; i < 3 ; i++){
    $.each(srcImg, function(j, k) {
        $(cardSrc).append("<div id=card" + i + j + "><img src=" + k + " />");
    });
}
    $(cardSrc + " div").click(playMemo);
    setImagesOnCard();
});   
function setImagesOnCard(){
    var allImg = $(cardSrc).children();
    var currImg = $(cardSrc + " div:first-child");
    var arrImg = new Array();
    for (var i = 0; i < allImg.length; i++){
        arrImg[i] = $("#" + currImg.attr("id") + " img").attr("src");
        currImg = currImg.next();
    }  
    currImg = $(cardSrc + " div:first-child");
    for (var z = 0; z < allImg.length; z++){
        var numRand = funRand(0, arrImg.length - 1);
        $("#" + currImg.attr("id") + " img").attr("src", arrImg[numRand]);
        arrImg.splice(numRand, 1);
        currImg = currImg.next();
    }
}
function playMemo() {
    var id = $(this).attr("id");
    if ($("#" + id + " img").is(":hidden")) {
        $(cardSrc + " div").unbind("click", playMemo);
        $("#" + id + " img").slideDown('slow');    
        if (opImg == ""){
            opId = id;
            opImg = $("#" + id + " img").attr("src");
            setTimeout(function() {
                $(cardSrc + " div").bind("click", playMemo)
            }, 300);
        }else{
            currentOpen = $("#" + id + " img").attr("src");
            if (opImg != currentOpen) {
                setTimeout(function() {
                    $("#" + id + " img").slideUp('200'); 
                    $("#" + opId + " img").slideUp('200'); 
                    opId = "";
                    opImg = "";
                }, 400);
            } else {
                foundImg++;
                opId = "";
                opImg = "";
            }
            setTimeout(function() {
                $(cardSrc + " div").bind("click", playMemo)
            }, 400);
        }
        counter++;
        $("#counter").html("" + counter);

        if (foundImg == srcImg.length) {
            $("#counter").prepend('<span id=win">Total </span>');
           setTimeout(function(){
                player.setVolume(100);
                player.playVideo();
                 },100);
                setTimeout(function(){
                $("#gc").fadeIn(50);
                 },1200);
             setTimeout(function(){
                  player.stopVideo();
                $("#gc").fadeOut();
            },5000);
        }
    }
}
function nGame(){
    setImagesOnCard();
    $(cardSrc + " div img").hide();
    $(cardSrc + " div").css("visibility", "visible");
    counter = 0;
    $("win").remove();
    $("#counter").html("" + counter);
    opId = "";
    opImg = "";
    foundImg = 0;
    return false;
}
function funRand(mxv, mnv) {
        return Math.round(Math.random() * (mxv - mnv) + mnv);
}
    


var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoMusic', {
        events: {
                'onReady': onPlayerReady,
                onStateChange: 
        function(e){
            if (e.data === YT.PlayerState.ENDED) {
                player.playVideo(); 
            }
        }
                }
    });
}
    
function onPlayerReady(event) {
    event.target.setVolume(100);
    event.target.pauseVideo();
        
    $(document).ready(function() {
        $('#cards').on('click', function () {
            player.pauseVideo();
           
        });
    });        

}
