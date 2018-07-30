$(function () {
    var main_owl_settings = {
        loop: true,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        navSpeed: 1000,
        dotsSpeed: 1000,
        responsive: {
            0: {
                nav: false
            },
            1200: {
                nav: true
            }
        }
    };

    $(".owl-carousel--top").owlCarousel($.extend(true, {}, main_owl_settings ,{
        items: 1
    }));
    $(".owl-carousel--hot").owlCarousel($.extend(true, {}, main_owl_settings ,{
        items: 3
    }));
    $(".itemOverlay--hot>.itemOverlay__text").each(function () {
        var text = $(this).text();
        var textLength = 70;
        if(text.length > textLength){
            text = text.substr(0, textLength);
            text += '...';
            $(this).text(text);
        }
    });


});