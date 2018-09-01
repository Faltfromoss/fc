$(document).ready(function () {
    svg4everybody({});

// owlCarousel start
    var main_owl_settings = {
        loop: true,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        navSpeed: 1000,
        dotsSpeed: 1000,
        responsiveClass: true,
        responsive: {
            0: {
                nav: false
            },
            992: {
                nav: true
            }
        }
    };

    $(".owl-carousel--top").owlCarousel($.extend(true, {}, main_owl_settings, {
        items: 1
    }));
    $(".owl-carousel--hot").owlCarousel($.extend(true, {}, main_owl_settings, {
        items: 3,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    }));
    $(".itemOverlay--hot>.itemOverlay__text").each(function () {
        var text = $(this).text();
        var textLength = 70;
        if (text.length > textLength) {
            text = text.substr(0, textLength);
            text += '...';
            $(this).text(text);
        }
    });

// owlCarousel end

// jQuery mmenu start

    var icon = $('.hamburger');

    icon.click(function () {
        $(this).toggleClass('is-active')
    });

    var mobileMenu = $('.mobileMenu');

    mobileMenu.mmenu({
        "extensions": [
            "pagedim-black",
            "shadow-page",
            "theme-dark"
        ],
        "navbar": {
            title: "Меню"
        }
    }, {
        //configuration
        offCanvas: {
            pageSelector: ".page"
        },
        classNames: {
            selected: 'mobileMenu__item--active'
        }
    });

    var API = mobileMenu.data('mmenu');

    icon.on("click", function () {
        API.open();
    });

    API.bind("open:finish", function () {
        setTimeout(function () {
            icon.addClass("is-active");
        }, 100);
    });
    API.bind("close:finish", function () {
        setTimeout(function () {
            icon.removeClass("is-active");
        }, 100);
    });
// jQuery mmenu end


    $('.foodItem').each(function (index, item) {
        var height = $(item).height();
        $(item).parent().height(height + 40);
    })
        .hover(function () {
            $(this).css('z-index', '1');
            $(this).find('.foodDescription').slideDown(200);
        }, function () {
            $(this).find('.foodDescription').slideUp(200);
            $(this).css('z-index', '0');
        });

    $('input[type=radio]:checked').each(function (index, element) {
        var value = $(element).val();
        $(element).parent().next().find('.foodDescription__cost').text(value + ' грн');
    });
    $('input[type=radio]').click(function (e) {
        var value = $(this).val();
        $(this).parent().next().find('.foodDescription__cost').text(value + ' грн');
    })
});