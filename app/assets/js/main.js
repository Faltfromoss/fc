$(document).ready(function () {
    svg4everybody({});
    let foodMenu = $('.foodMenu--mobile'),
        menuBtn = $('.menuButton');

// owlCarousel start
    let main_owl_settings = {
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
        let text = $(this).text();
        let textLength = 70;
        if (text.length > textLength) {
            text = text.substr(0, textLength);
            text += '...';
            $(this).text(text);
        }
    });

// owlCarousel end

// jQuery mmenu start

    let icon = $('.hamburger');

    icon.click(function () {
        $(this).toggleClass('is-active')
    });

    let mobileMenu = $('.mobileMenu');

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

    let API = mobileMenu.data('mmenu');

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

    $('.foodItem').hover(function () {
        if ($(window).width() > 768) {
            $(this).css('z-index', '1');
            $(this).find('.foodDescription').slideDown(200);
        }
    }, function () {
        if ($(window).width() > 768) {
            $(this).find('.foodDescription').slideUp(200);
            $(this).css('z-index', '0');
        }
    });

    let foodMenuPositionTop = 0;
    init();

    let isMenuActive = false;
    menuBtn.click(function () {
        if (!isMenuActive) {
            calcFoodMenuPosition();
            foodMenu.css({
                top: foodMenuPositionTop,
                right: 0
            });
            isMenuActive = !isMenuActive;
            menuBtn.addClass('menuButton--hide');
        }
    });

    let isMenuBtnActive = false;
    let isMenuBtnFixed = true;
    $(window).scroll(function () {
        if($('#pills-menu').hasClass('active')){
            let topContainerOffset = $('.menuButton__container').offset().top;
            let scrollTop = $(document).scrollTop();
            let topWayPoint = topContainerOffset - $('.topLine').outerHeight();
            let footerScroll = $('footer').offset().top - $.windowHeight();
            if (!isMenuBtnActive && scrollTop >= topWayPoint && !isMenuActive) {
                menuBtn.removeClass('menuButton--hide');
                isMenuBtnActive = !isMenuBtnActive;
            }
            else if (isMenuBtnActive && scrollTop <= topWayPoint) {
                menuBtn.addClass('menuButton--hide');
                isMenuBtnActive = !isMenuBtnActive;
            }
            if (isMenuBtnFixed && scrollTop >= footerScroll) {
                menuBtn.removeClass('menuButton--fixed');
                isMenuBtnFixed = !isMenuBtnFixed;
            } else if (!isMenuBtnFixed && scrollTop <= footerScroll) {
                menuBtn.addClass('menuButton--fixed');
                isMenuBtnFixed = !isMenuBtnFixed;
            }
        }
    });

    $(document).mouseup(function (e) {
        if($('#pills-menu').hasClass('active')){
            if (menuBtn.is(e.target) || menuBtn.has(e.target).length > 0)
                return;
            if (!foodMenu.is(e.target) && foodMenu.has(e.target).length === 0 && isMenuActive !== false) {
                foodMenu.css('right', -300);
                isMenuActive = !isMenuActive;
                menuBtn.removeClass('menuButton--hide');
            }
        }
    });

    $(window).resize(function () {
        menuItemHeightInit();
    });

    $('input[type=radio]:checked').each(function (index, element) {
        let value = $(element).val();
        $(element).parent().next().find('.foodDescription__cost').text(value + ' грн');
    });
    $('input[type=radio]').click(function () {
        let value = $(this).val();
        $(this).parent().next().find('.foodDescription__cost').text(value + ' грн');
    });

    function init() {
        menuItemHeightInit();
    }

    function calcFoodMenuPosition() {
        foodMenuPositionTop = ($.windowHeight() - foodMenu.outerHeight()) / 2;
    }

    function menuItemHeightInit() {
        $('.foodItem').each(function (index, item) {
            let h = $(item).height();
            $(item).parent().height(h + 40);
        });
    }
});