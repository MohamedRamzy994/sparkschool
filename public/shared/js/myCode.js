/*global $, alert, console, jQuery, Facebook*/


$(window).on('load', window, function () {
  
    "use strict";
    
    $("#fakeLoader").fakeLoader({
        
        timeToHide: 2000,
        zIndex: 9999,
        spinner: "spinner4",
        bgColor: "#118BB4"
                
    });
    
    
    
}); 

function topFunction() {
    $("html, body").animate({ scrollTop: 0 }, "slow");

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

$(document).ready(function () {

    "use strict";
  
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }
    
    // When the user clicks on the button, scroll to the top of the document
   
        
    $("html").niceScroll({styler:"fb",cursorcolor:"#f1f4f1", cursorwidth: '4', cursorborderradius: '10px', background: '#f1f4f1', spacebarenabled:false, cursorborder: '0',  zindex: '1000'});
    
    
    // $("li.drop-down").click(function () {
    //     $(this).next('div').slideToggle();
    // });
    
    $(".navbar li.drop-down").click(function () {
        
        
        $(this).next('.xx').slideToggle(600);
        
        $('.navbar ul .xx').not($(this).next('.xx')).hide();
        
        
        /*
        $(this).next('.dropcontainer1').slideToggle(600);
        
        $('.navbar ul .dropcontainer1').not($(this).next('.dropcontainer1')).hide();
        
        
        $(this).next('div.simple-drop').slideToggle(600);
        
        $('.navbar ul .simple-drop').not($(this).next('.simple-drop')).hide();
        */
    });
    
    $('#myTabs a').click(function (e) {
        e.preventDefault();
        
        alert("hello");
        $(this).tab('show');
    });
    
    
    $(".jop .First-content .myClick").click(function () {
        
        $(this).nextAll('ul').slideToggle();
        $(this).find('span').toggle();
    });
    
    
    /* ************************************************************* */
    
    $(".jop .First-content .country li.MyShow").click(function () {
        
        $('.jop .First-content .country .MyShow').toggle();
        $(this).nextAll('.jop .First-content .country li').toggle();
        
    });
    
    $(".jop .First-content .country li.MyHide").click(function () {
        
        $('.jop .First-content .country .MyHide').toggle();
        $(this).prevAll('.jop .First-content .country .mynewHide').toggle();
        
    });
    
    
    /* ************************************************************* */
    
    $(".jop .First-content .city li.MyShow").click(function () {
        
        $('.jop .First-content .city .MyShow').toggle();
        $(this).nextAll('.jop .First-content .city li').toggle();
        
    });
    
    $(".jop .First-content .city li.MyHide").click(function () {
        
        $('.jop .First-content .city .MyHide').toggle();
        $(this).prevAll('.jop .First-content .city .mynewHide').toggle();
        
    });
    
     /* ************************************************************* */
    
    $(".jop .First-content .area li.MyShow").click(function () {
        
        $('.jop .First-content .area .MyShow').toggle();
        $(this).nextAll('.jop .First-content .area li').toggle();
        
    });
    
    $(".jop .First-content .area li.MyHide").click(function () {
        
        $('.jop .First-content .area .MyHide').toggle();
        $(this).prevAll('.jop .First-content .area .mynewHide').toggle();
        
    });
    
    /* ************************************************************* */
    
    var CheckedLi = $('.jop .First-content label').siblings('input.checkbox:checked');
    
    $('.jop .First-content label , CheckedLi').click(function () {
        
        $(this).parent('li').toggleClass('colored');
    });
    
    
   
   
});