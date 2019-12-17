; (function ($) {
    'use strict';

    var DH = {
        init: function () {
            var self = this;
            var stickySize = 50;
            var defaultSize = 50;
            //$(document.documentElement).addClass(self.enableAnimation() ? 'dh-enable-animation':'dh-disable-animation');

            //Navbar collapse
            $('.primary-navbar-collapse').on('hide.bs.collapse', function () {
                $(this).closest('.header-container').find('.navbar-toggle').removeClass('x');
            });
            $('.primary-navbar-collapse').on('show.bs.collapse', function () {
                $(this).closest('.header-container').find('.navbar-toggle').addClass('x');

            });


            //Footer Social Tooltip
            $('.share-links a,.author-social a').tooltip({ html: true, container: $('body') });

            //Timeline shorcode hover
            $(document).on("mouseenter", ".timeline-align-left .hentry-wrap,.timeline-align-right .hentry-wrap", function () {
                $(this).parent().addClass('timeline-hover');
            });
            $(document).on("mouseleave", ".timeline-align-left .hentry-wrap,.timeline-align-right .hentry-wrap", function () {
                $(this).parent().removeClass('timeline-hover');
            });

            //Row Parallax Background
            $('[data-parallax="1"]').each(function () {
                var $this = $(this);
                var speed = $this.data('parallax-speed');
                $this.parallax('50%', speed, true);
            });
            //el-appear
            var __popover_timeout;
            var elAppear = function () {
                if (self.getViewport().width > "992") {
                    $('.el-appear').each(function () {
                        $(this).appear(function () {
                            $(this).addClass('animate-appear');
                            if ($(this).hasClass('show-first')) {
                                var __popover = $(this);
                                clearTimeout(__popover_timeout);
                                __popover_timeout = setTimeout(function () {
                                    __popover.popover('show');
                                }, 1000)

                            }
                        });
                    });
                }
            }
            elAppear();
            $(window).resize(function () {
                elAppear();
            });
            //svg-appear
            var svgAppear = function () {
                if (self.getViewport().width > "992") {
                    $('.svg-appear').each(function () {
                        $(this).appear(function () {
                            $(this).addClass('svg-animate-appear');
                        });
                    });
                }
            }
            svgAppear();
            $(window).resize(function () {
                svgAppear();
            });
            //Go to top
            $(window).scroll(function () {
                if ($(this).scrollTop() > 500) {
                    $('.go-to-top').addClass('on');
                }
                else {
                    $('.go-to-top').removeClass('on');
                }
            });
            $('body').on('click', '.go-to-top', function () {
                $("html, body").animate({
                    scrollTop: 0
                }, 800);
                return false;
            });


            //Fixed Main Nav
            var $window = $(window);
            var $body = $('body');

            var adminbarHeight = 0;
            if ($('#wpadminbar').length) {
                adminbarHeight = parseInt($('#wpadminbar').outerHeight());
            }

            $(window).on('resize', function () {
                if ($('#wpadminbar').length) {
                    adminbarHeight = parseInt($('#wpadminbar').outerHeight());
                }
            });
            var nt;
            var navTop = $('.header-container').hasClass('header-fixed') ? ($('.topbar').length ? $('.topbar').height() : 0) : $('.navbar').offset().top;
            var navTimeout;
            var hHeight = $('.header-container').outerHeight();
            var hOffset = $('.header-container').offset().top + hHeight + 10;
            var navScrollListener = function ($this, isResize) {
                if (isResize) {
                    if ($body.hasClass('admin-bar')) {
                        adminbarHeight = $('#wpadminbar').height();
                    }
                }
                var $navbar = $('.navbar');
                clearTimeout(nt);
                if ($('.wide-wrap .header-container').hasClass('header-absolute') && self.getViewport().width > "992") {
                    $('.header-container').css({ 'top': adminbarHeight + 'px' });
                } else {
                    $('.header-container').css({ 'top': '' });
                }



                if (($('.header-container').hasClass('header-fixed') || $navbar.hasClass('navbar-scroll-fixed')) && self.getViewport().width > "992") {

                    var scrollTop = parseInt($this.scrollTop(), 10),
                        navHeight = 0,
                        topbarOffset = 0;


                    if (scrollTop > "1") {
                        $('#ig_icon').attr('src', '/images/ig_black.png');
                        $('#fb_icon').attr('src', '/images/fb_black.png');
                    } else {
                        $('#ig_icon').attr('src', '/images/ig-icon.png');
                        $('#fb_icon').attr('src', '/images/fb-icon.png');
                    }


                    if ($('.header-container').hasClass('header-fixed')) {
                        $('.header-container').css({ 'top': adminbarHeight + 'px' });
                        if ($('.topbar').length) {

                            if (scrollTop > 0) {



                                if (scrollTop < $('.topbar').height()) {
                                    topbarOffset = - scrollTop;

                                    $('.header-container').css({ 'top': topbarOffset + 'px' });
                                } else {
                                    $('.header-container').css({ 'top': - $('.topbar').height() + 'px' });
                                }
                            } else {
                                $('.header-container').css({ 'top': adminbarHeight + 'px' });
                            }
                        }
                    }
                    var navTopScroll = navTop;
                    if ($('.header-container').hasClass('header-fixed') || $('.header-container').hasClass('header-absolute'))
                        navTopScroll += adminbarHeight;

                    if ($('.header-container').hasClass('header-animate-fixed')) {
                        navTopScroll = hOffset
                    }
                    if (($this.scrollTop() + adminbarHeight) > navTopScroll) {
                        if (!$('.navbar-default').hasClass('navbar-fixed-top')) {
                            if ($('.header-container').hasClass('header-animate-fixed')) {
                                if (($this.scrollTop() + adminbarHeight) > hOffset) {
                                    $('.navbar-default').addClass('navbar-to-fixed');
                                    clearTimeout(navTimeout);
                                    navTimeout = setTimeout(function () {
                                        $navbar.css({ 'top': adminbarHeight + 'px' });
                                        $('.navbar-default').addClass('navbar-fixed-top');
                                    }, 10);
                                }
                            } else {
                                $('.navbar-default').addClass('navbar-fixed-top');
                                $navbar.css({ 'top': adminbarHeight + 'px' });
                            }
                        }
                        if ($('.header-container').hasClass('header-navbar-classic')) {
                            if ($('.header-container').hasClass('header-navbar-below')) {
                                navHeight = stickySize;
                            } else {
                                navHeight = Math.max(Math.round(defaultSize - ($this.scrollTop() + adminbarHeight) + navTop), stickySize);
                            }
                            $('.navbar-container').css({ 'height': navHeight + 'px' });
                            $navbar.css({ 'min-height': navHeight + 'px' });
                            $navbar.find('.primary-nav > li > a').css({ 'line-height': navHeight + 'px' });
                            $navbar.find('.navbar-brand img.logo-fixed').css({ 'max-height': navHeight + 'px' });
                        }
                        if ($('.header-container').hasClass('header-type-default')) {
                            if (!$('.header-container').hasClass('header-transparent')) {
                                $('.header-container').next().addClass('has-top-margin');
                            }
                            nt = setTimeout(function () {
                                $('.navbar-default').addClass('animate-children');
                            }, 10);
                        }
                    } else {
                        if ($('.navbar-default').hasClass('navbar-to-fixed'))
                            $('.navbar-default').removeClass('navbar-to-fixed');

                        if ($('.navbar-default').hasClass('navbar-fixed-top')) {
                            $('.navbar-default').removeClass('navbar-fixed-top');
                        }
                        $navbar.css({ 'top': '' });
                        if ($('.header-container').hasClass('header-type-default')) {
                            $('.header-container').next().removeClass('has-top-margin');
                            nt = setTimeout(function () {
                                $('.navbar-default').removeClass('animate-children');
                            }, 50);
                        }
                        if ($('.header-container').hasClass('header-navbar-classic')) {
                            $('.navbar-container').css({ 'height': '' });
                            $navbar.css({ 'min-height': '' });
                            $navbar.find('.primary-nav > li > a').css({ 'line-height': '' });
                            $navbar.find('.navbar-brand img.logo-fixed').css({ 'max-height': '' });
                        }
                    }
                } else {



                    if ($('.navbar-default').hasClass('navbar-to-fixed'))
                        $('.navbar-default').removeClass('navbar-to-fixed');
                    if ($('.navbar-default').hasClass('navbar-fixed-top')) {
                        $('.navbar-default').removeClass('navbar-fixed-top');
                    }
                    $navbar.css({ 'top': '' });
                    if ($('.header-container').hasClass('header-type-default')) {
                        $('.header-container').next().removeClass('has-top-margin');
                        nt = setTimeout(function () {
                            $('.navbar-default').removeClass('animate-children');
                        }, 50);
                    }
                    if ($('.header-container').hasClass('header-navbar-classic')) {
                        $('.navbar-container').css({ 'height': '' });
                        $navbar.css({ 'min-height': '' });
                        $navbar.find('.primary-nav > li > a').css({ 'line-height': '' });
                        $navbar.find('.navbar-brand img.logo-fixed').css({ 'max-height': '' });
                    }
                }
            }

            navScrollListener($window);
            $window.resize(function () {
                navScrollListener($(this), true);
            });
            $window.scroll(function () {
                var $this = $(this);
                navScrollListener($this, false);
            });
            //Scrollspy
            $('body').scrollspy({
                target: '.primary-navbar-collapse',
                offset: (adminbarHeight + 170)
            });
            $('body').on('activate.bs.scrollspy', function () {
                var scrollspy = $(this).data('bs.scrollspy');
                if (scrollspy) {
                    $(scrollspy.selector)
                        .parents('.current-menu-item')
                        .removeClass('current-menu-item');
                    var selector = scrollspy.selector +
                        '[data-target="' + scrollspy.activeTarget + '"],' +
                        scrollspy.selector + '[href="' + scrollspy.activeTarget + '"]'

                    var active = $(selector)
                        .parents('li')
                        .addClass('current-menu-item');

                    if (active.parent('.dropdown-menu').length) {
                        active = active
                            .closest('li.dh-megamenu-menu')
                            .addClass('current-menu-item');
                    }
                }
            });
            $(window).on('resize', function () {
                $('[data-spy="scroll"]').each(function () {
                    var $spy = $(this).scrollspy('refresh');
                });
            });
            $('.primary-nav a:not([href=#], .megamenu-sidebar a, .navbar-search-button, .search-form-wrap a, .minicart a, .minicart-link), .top-menu .topbar-nav a:not([href=#])').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
                    if (this.hash) {
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        if (target.length && this.hash.slice(1) != '') {
                            $('.primary-nav li').removeClass('current-menu-item');
                            $('html, body').animate({
                                scrollTop: (target.offset().top - 150)
                            }, 850, 'easeInOutExpo');
                            return false;
                        }
                    }
                }
            });
            if ($('.header-type-toggle').length) {
                var navbarToggleFixed = function () {
                    $('.navbar-nav > li > a').each(function (i) {
                        $(this).css('-webkit-transition-delay', (i * 0.1) + 's')
                            .css('-moz-transition-delay', (i * 0.1) + 's')
                            .css('-ms-transition-delay', (i * 0.1) + 's')
                            .css('-o-transition-delay', (i * 0.1) + 's')
                            .css('transition-delay', (i * 0.1) + 's');
                    });
                    $('.navbar-toggle-fixed-btn').on('click', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        if ($('#header').hasClass('in-active')) {
                            $('#header').removeClass('in-active').addClass('active');
                        } else {
                            $('#header').removeClass('active').addClass('in-active');
                        }

                    });
                }
                navbarToggleFixed();
            }
            //header off canvas
            if ($('.header-type-toggle-offcanvas').length) {
                $('.navbar-toggle-fixed-btn,.navbar-toggle').on('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if ($('body').hasClass('open-offcanvas')) {
                        $('body').removeClass('open-offcanvas').addClass('close-offcanvas');
                    } else {
                        $('body').removeClass('close-offcanvas').addClass('open-offcanvas');
                    }

                });
                $(document).on('click', '.offcanvas-close-btn', function () {
                    $('body').removeClass('open-offcanvas').addClass('close-offcanvas');
                });
                $('body').on('mousedown', $.proxy(function (e) {
                    var element = $(e.target);
                    if ($('.offcanvas').length && $('body').hasClass('open-offcanvas')) {
                        if (!element.is('.offcanvas') && element.parents('.offcanvas').length === 0) {
                            $('body').removeClass('open-offcanvas');
                        }
                    }
                }, this));

                $('.offcanvas-nav .dropdown-hover .caret,.offcanvas-nav .dropdown-submenu > a > .caret,.offcanvas-nav .megamenu-title .caret').off('click').on('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var dropdown = $(this).closest(".dropdown, .dropdown-submenu");
                    if (dropdown.hasClass("open")) {
                        dropdown.removeClass("open");
                    } else {
                        dropdown.addClass("open");
                    }
                });
            }
            //end header off canvas
            //Media element player
            this.mediaelementplayerInit();
            //DH Slider
            this.dhSliderInit();

            //Animate Box
            this.animateBoxInit();
            $(window).resize(function () {
                self.animateBoxInit();
            });

            //Nav Dropdown
            this.navDropdown();
            $(window).resize(function () {
                self.navDropdown();
            })
            //Heading Parallax
            this.headingInit();

            //PopUp
            this.magnificpopupInit();

            //Carousel
            this.carouselInit();

            //Responsive embed iframe
            this.responsiveEmbedIframe();
            $(window).resize(function () {
                self.responsiveEmbedIframe();
            });
            //shop
            if ($(".single-product").length > 0)
                this.shopInit();
            //isotope
            $(window).resize(function () {
                self.isotopeLayout();
            });
            this.isotopeInit();

            //portfolio 
            this.portfolioInit();

            //Ajax Search
            this.ajaxSearchInit();

            //Shortcodes
            this.shortcode.init(self);

            //Typed
            if ($.fn.typed) {
                $(".heading-typed .nth-typed").each(function () {
                    var _this = $(this),
                        string = _this.closest('.heading-typed').data('typed-string');
                    _this.appear(function () {
                        _this.typed({
                            strings: [string],
                            typeSpeed: 111
                        });
                    });
                });
            }

            /* contentPopup */
            contentPopup(CallBackPopup);

            function CallBackPopup() {
                PopupCenter();
            }

            function contentPopup(callback) {

                $('.content-ajax').click(function (event) {
                    var $this = $(this),
                        link_href = $this.attr('href');

                    $('body').addClass('content-overflow');
                    $('#content-popup-overlay, #content-popup-wrap').addClass('in');

                    getContentAjax(link_href, '#content-popup-wrap .content-popup-content', callback);

                    return false;
                });

                $(document).on('click', '#content-popup-overlay, #content-popup-close, #content-popup-wrap', function (event) {
                    event.preventDefault();
                    $('#content-popup-wrap, #content-popup-overlay').removeClass('in');
                    $('body').removeClass('content-overflow');
                    $('#content-popup-wrap .content-popup-content').html('');
                    return false;
                });

                $(document).on('click', '#content-popup-wrap .content-popup-content', function (event) {
                    event.stopPropagation();
                });
            }

            function PopupCenter() {
                if ($('#content-popup-wrap').hasClass('in')) {

                    var $this = $('#content-popup-wrap .content-popup-content'),
                        window_h = $(window).innerHeight(),
                        height_e = $this.innerHeight(),
                        height_part = (window_h - height_e) / 2;

                    if (height_e < window_h && height_e > 0) {

                        $this.parent().css({
                            'padding-top': height_part + 'px',
                            'padding-bottom': '0'
                        });

                    } else {

                        $this.parent().css({
                            'padding-top': '10px',
                            'padding-bottom': '10px'
                        });
                    }
                }
            }

            function getContentAjax(url, id, callback, beforesend) {
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    beforeSend: function () {
                        if (beforesend) {
                            beforesend();
                        }
                    }
                })
                    .done(function (data) {

                        $(id).html(data);

                        // Apply callback
                        if (callback) {
                            callback();
                        }
                    })
                    .fail(function () {
                        console.log("error");
                    })
                    .always(function () {
                        //console.log("complete");
                    });
            }
        },
        shortcode: {
            init: function (dh) {
                var self = this;
                this.DH = dh;
                //this.listsInit();
                this.progressInit();
                this.tabInit();
                this.accordionInit();
                this.btnInit();
                this.counterInit();
                this.gmapInit();
                this.iconboxInit();
                this.modalInit();
                this.piechartInit();

                // Tooltip
                $('[data-toggle="popover"]').popover({ html: true });

                $('[data-toggle="popover"]').on('show.bs.popover', function () {
                    $(this).closest('.column').find('[data-toggle="popover"]').not($(this)).popover('hide');
                });
                $('[data-toggle="tooltip"]').tooltip({ html: true });
            },
            progressInit: function () {
                var self = this;
                $('.progress-bars .progress').each(function () {
                    var $this = $(this),
                        progress = $this.find('.progress-bar');

                    progress.appear(function () {
                        var valuenow = parseInt($(this).data('valuenow'));
                        $(this).closest('.progress').addClass('run').find('.progress-label').css({ 'left': 0 + '%' }).animate({
                            'left': valuenow + '%'
                        }, 1600);
                        $(this).css({ 'width': 0 + '%' }).animate({
                            'width': valuenow + '%'
                        }, 1600);

                        $(this).closest('.progress').find('.progress-label > span').countTo({
                            from: 0,
                            to: valuenow,
                            speed: 1100,
                            refreshInterval: 30
                        });
                    });
                });
            },
            tabInit: function () {
                var self = this;
                $('[data-toggle="tab"], [data-toggle="pill"]').each(function (e) {
                    var $this = $(this);
                    $this.on('shown.bs.tab', function (e) {
                        var selector = $(this).attr('href') && $(this).attr('href').replace(/.*(?=#[^\s]*$)/, '');
                        self.DH.isotopeInit();
                        $(selector).find('.caroufredsel').find('ul').trigger('updateSizes').trigger('resize');;
                        $('[data-spy="scroll"]').each(function () {
                            var $spy = $(this).scrollspy('refresh');
                        });
                    })
                });
            },
            accordionInit: function () {
                var self = this;
                $('.accordion').each(function () {
                    var $this = $(this),
                        active_tab = $this.data('active-tab');

                    $this.find('.panel-collapse.in').prev('.panel-heading').addClass('active');
                    $this.find('.panel-group').on('show.bs.collapse', function (e) {
                        $(e.target).prev('.panel-heading').addClass('active');
                        self.DH.isotopeInit();
                        $('.caroufredsel').find('ul').trigger('updateSizes').trigger('resize');;
                        $('[data-spy="scroll"]').each(function () {
                            var $spy = $(this).scrollspy('refresh');
                        });
                    });
                    $this.find('.panel-group').on('hide.bs.collapse', function (e) {
                        $(e.target).prev('.panel-heading').removeClass('active');
                        self.DH.isotopeInit();
                        $('.caroufredsel').find('ul').trigger('updateSizes').trigger('resize');;
                        $('[data-spy="scroll"]').each(function () {
                            var $spy = $(this).scrollspy('refresh');
                        });
                    });
                });
            },
            btnInit: function () {
                $('.btn.btn-custom-color').each(function () {
                    var $this = $(this);
                    //hover background color
                    if (typeof $this.data('hover-background-color') !== 'undefined' && $this.data('hover-background-color') !== false && $this.data('hover-background-color') != '') {
                        var hover_background_color = $this.data('hover-background-color');
                        var initial_background_color = $this.css('background-color');
                        $this.hover(
                            function () {
                                $this.css('background-color', hover_background_color);
                            },
                            function () {
                                $this.css('background-color', initial_background_color);
                            });
                    }
                    //hover border color
                    if (typeof $this.data('hover-border-color') !== 'undefined' && $this.data('hover-border-color') !== false && $this.data('hover-border-color') != '') {
                        var hover_border_color = $this.data('hover-border-color');
                        var initial_border_color = $this.css('border-top-color');
                        $this.hover(
                            function () {
                                $this.css('border-color', hover_border_color);
                            },
                            function () {
                                $this.css('border-color', initial_border_color);
                            });
                    }
                    //hover color
                    if (typeof $this.data('hover-color') !== 'undefined' && $this.data('hover-color') !== false && $this.data('hover-color') != '') {
                        var hover_color = $this.data('hover-color');
                        var initial_color = $this.css('color');
                        $this.hover(
                            function () {
                                $this.css('color', hover_color);
                            },
                            function () {
                                $this.css('color', initial_color);
                            });
                    }
                });
            },
            counterInit: function () {
                $('.counter').each(function () {
                    var $this = $(this);
                    $this.appear(function () {
                        var counter_number = $this.find('.counter-number');
                        counter_number.countTo({
                            from: 0,
                            to: counter_number.data('to'),
                            speed: counter_number.data('speed'),
                            decimals: counter_number.data('num-decimals'),
                            decimal: counter_number.data('decimal-sep'),
                            thousand: counter_number.data('thousand-sep'),
                            refreshInterval: 30,
                            formatter: function (value, options) {
                                value = value.toFixed(options.decimals);
                                value += '';
                                var x, x1, x2, rgx;
                                x = value.split('.');
                                x1 = x[0];
                                x2 = x.length > 1 ? options.decimal + x[1] : '';
                                rgx = /(\d+)(\d{3})/;
                                if (typeof (options.thousand) === 'string' && options.thousand != '') {
                                    while (rgx.test(x1)) {
                                        x1 = x1.replace(rgx, '$1' + options.thousand + '$2');
                                    }
                                }
                                return x1 + x2;
                            }
                        });
                    });
                });
            },
            iconboxInit: function () {
                var posRightAbsolute = function () {
                    $('.iconbox-pos-right').each(function () {
                        if ($(this).find('.iconbox-icon').css('position') == 'absolute') {
                            $(this).find('.iconbox-content').css('padding-top', $(this).find('.iconbox-icon').outerHeight());
                        } else {
                            $(this).find('.iconbox-content').css({ 'padding-top': '' });
                        }
                    });
                };
                posRightAbsolute();
                $(window).resize(function () {
                    posRightAbsolute();
                });
                $('[data-toggle="iconbox"]').each(function () {
                    var $this = $(this);
                    //hover background color
                    if (typeof $this.data('hover-background-color') !== 'undefined' && $this.data('hover-background-color') !== false && $this.data('hover-background-color') != '') {
                        var hover_background_color = $this.data('hover-background-color');
                        var initial_background_color = $this.css('background-color');
                        $this.closest('.iconbox').hover(
                            function () {
                                $this.css('background-color', hover_background_color);
                            },
                            function () {
                                $this.css('background-color', initial_background_color);
                            });
                    }
                    //hover border color
                    if (typeof $this.data('hover-border-color') !== 'undefined' && $this.data('hover-border-color') !== false && $this.data('hover-border-color') != '') {
                        var hover_border_color = $this.data('hover-border-color');
                        var initial_border_color = $this.css('border-top-color');
                        $this.closest('.iconbox').hover(
                            function () {
                                $this.css('border-color', hover_border_color);
                            },
                            function () {
                                $this.css('border-color', initial_border_color);
                            });
                    }
                    //hover color
                    if (typeof $this.data('hover-color') !== 'undefined' && $this.data('hover-color') !== false && $this.data('hover-color') != '') {
                        var hover_color = $this.data('hover-color');
                        var initial_color = $this.css('color');
                        $this.closest('.iconbox').hover(
                            function () {
                                $this.css('color', hover_color);
                            },
                            function () {
                                $this.css('color', initial_color);
                            });
                    }
                });
            },
            modalInit: function () {
                var self = this;
                function adjustModalMaxHeightAndPosition() {
                    $('.modal').each(function () {
                        if ($(this).find('.modal-dialog').hasClass('modal-dialog-center')) {
                            if ($(this).hasClass('in') === false) {
                                $(this).show(); /* Need this to get modal dimensions */
                            };
                            var contentHeight = self.DH.getViewport().height - 60;
                            var headerHeight = $(this).find('.modal-dialog-center .modal-header').outerHeight() || 2;
                            var footerHeight = $(this).find('.modal-dialog-center .modal-footer').outerHeight() || 2;

                            $(this).find('.modal-dialog-center .modal-content').css({
                                'max-height': function () {
                                    return contentHeight;
                                }
                            });

                            $(this).find('.modal-dialog-center .modal-body').css({
                                'max-height': function () {
                                    return (contentHeight - (headerHeight + footerHeight));
                                }
                            });

                            $(this).find('.modal-dialog-center').css({
                                'margin-top': function () {
                                    return -($(this).outerHeight() / 2);
                                },
                                'margin-left': function () {
                                    return -($(this).outerWidth() / 2);
                                }
                            });
                            if ($(this).hasClass('in') === false) {
                                $(this).hide(); /* Hide modal */
                            };
                        }
                    });
                }
                if (this.DH.getViewport().height >= 320) {
                    $(window).resize(adjustModalMaxHeightAndPosition).trigger("resize");
                }
            },
            piechartInit: function () {
                var self = this;
                $('.piechart').each(function () {
                    $(this).appear(function () {
                        var $this = $(this),
                            redraw = false,
                            animated = false,
                            size = $this.data('size'),
                            canvas_wrap = $this.find('.pichart-canvas'),
                            canvas = $this.find('canvas'),
                            label = $this.find('.pichart-canvas-value'),
                            back = $this.find('.pichart-canvas-back'),
                            value = $this.data('value') / 100,
                            label_value = $this.data('value'),
                            units = $this.data('units'),
                            _progress_v = 0,
                            circle,
                            outlined = $this.hasClass('piechart-style-outlined'),
                            color = '#f7f7f7',
                            fillColor,
                            border_color,
                            text_color,
                            background_color,
                            custom = false;

                        color = canvas_wrap.css('backgroundColor');
                        if (canvas_wrap.hasClass('pichart-custom')) {
                            custom = true;
                            if (custom && typeof canvas_wrap.data('border-color') !== 'undefined' && canvas_wrap.data('border-color') !== false && canvas_wrap.data('border-color') != '') {
                                color = canvas_wrap.data('border-color');
                            }
                        }
                        fillColor = color;
                        var setProgress = function () {
                            if (_progress_v >= value) {
                                circle.stop();
                                label.text(label_value + units);
                                return _progress_v;
                            }
                            _progress_v += 0.008;
                            var _label_value = _progress_v / value * label_value;
                            var val = Math.round(_label_value) + units;
                            label.text(val);
                            return _progress_v;
                        }
                        var draw = function (redraw) {
                            var w = size,
                                border_w = $this.data('border-size'),
                                radius = w / 2 - border_w - 1,
                                w2 = w + 8,
                                h2 = w + 8;
                            canvas_wrap.css({ "width": w2 + "px", "height": h2 + "px" });

                            label.css({ "width": w2, "height": h2, "line-height": h2 + "px" });
                            back.css({ "width": w, "height": w, 'border-width': (border_w + 2) + 'px', 'border-color': color });
                            canvas.attr({ "width": w + "px", "height": w + "px" });
                            if (radius < 0) return false;
                            circle = new ProgressCircle({
                                canvas: canvas.get(0),
                                minRadius: radius,
                                arcWidth: border_w
                            });
                            label.css({ 'color': color });
                            canvas_wrap.css({ "background-color": 'rgba(0, 0, 0, 0)' });
                            if (!outlined) {
                                canvas_wrap.css({ "background-color": color });
                                back.css({ 'border-color': 'rgba(0, 0, 0, 0)' });
                                label.css({ 'color': '#fff' });
                                fillColor = '#fff';

                            }
                            if (custom && typeof canvas_wrap.data('background-color') !== 'undefined' && canvas_wrap.data('background-color') !== false && canvas_wrap.data('background-color') != '') {
                                canvas_wrap.css({ "background-color": canvas_wrap.data('background-color') });
                            }
                            if (custom && typeof canvas_wrap.data('text-color') !== 'undefined' && canvas_wrap.data('text-color') !== false && canvas_wrap.data('text-color') != '') {
                                label.css({ "color": canvas_wrap.data('text-color') });
                            }
                            if (redraw === true && animated === true) {
                                _progress_v = value;
                                circle.addEntry({
                                    fillColor: fillColor,
                                    progressListener: $.proxy(setProgress, this)
                                }).start();
                            }
                        }


                        draw();

                        if (!outlined) {
                            fillColor = '#fff';
                        }

                        if (animated !== true) {
                            animated = true;
                            circle.addEntry({
                                fillColor: fillColor,
                                progressListener: $.proxy(setProgress, this)
                            }).start(5);
                        }
                    });
                });

            },
            gmapInit: function () {
                var self = this;
                if ($('[data-toggle="gmap"]').length) {
                    window.gmapCallback = function () {
                        $('[data-toggle="gmap"]').each(function (i) {
                            var mapBox = $(this).find('.gmap'),
                                latitude = mapBox.data('center-latitude'),
                                longitude = mapBox.data('center-longitude'),
                                icon = mapBox.data('marker-icon'),
                                markers = mapBox.data('markers'),
                                zoom = mapBox.data('zoom'),
                                enable_zoom = mapBox.data('enable-zoom'),
                                greyscale = mapBox.data('greyscale'),
                                greyscale_style;
                            if (greyscale) {
                                greyscale_style = [{ stylers: [{ hue: '#000000' }, { saturation: '-100' }, { lightness: '-10' }] }];
                            } else {
                                greyscale_style = [];
                            }
                            var LatLng = new google.maps.LatLng(latitude, longitude);
                            var map = new google.maps.Map(mapBox.get(0), {
                                flat: false,
                                noClear: false,
                                zoom: zoom,
                                zoomControl: enable_zoom,
                                scrollwheel: false,
                                draggable: (self.DH.isTouch() ? false : true),
                                center: LatLng,
                                streetViewControl: false,
                                mapTypeControl: false,
                                scaleControl: false,
                                disableDefaultUI: true,
                                mapTypeId: google.maps.MapTypeId.ROADMAP,
                                styles: greyscale_style
                            });

                            google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
                                $.each(markers, function (index, marker) {
                                    var gmarker = new google.maps.Marker({
                                        icon: icon,
                                        position: new google.maps.LatLng(marker.latitude, marker.longitude),
                                        map: map,
                                        animation: google.maps.Animation.DROP
                                    });
                                    if (marker.info != '') {
                                        var infowindow = new google.maps.InfoWindow({
                                            content: marker.info,
                                            maxWidth: 300
                                        });
                                        google.maps.event.addListener(gmarker, 'click', function () {
                                            infowindow.open(map, this);
                                        });
                                    }
                                });
                            });
                        });
                    };
                    if (typeof google == 'undefined') {
                        $.getScript('http://maps.google.com/maps/api/js?v=3&sensor=false&callback=gmapCallback');
                    }
                }
            }
        },
        ajaxSearchInit: function () {
            $(document).on('click', '.morphsearch-close', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var morphSearch = $('#morphsearch');
                if (morphSearch.hasClass('open')) {
                    morphSearch.removeClass('open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                        $('body').stop(true, true).css('overflow', '');
                    });
                }
            });
            $(document).on('click', '.navbar-search-button', function (e) {
                e.stopPropagation();
                e.preventDefault();
                if ($('#morphsearch').length) {
                    var morphSearch = $('#morphsearch');
                    if (!morphSearch.hasClass('open')) {
                        morphSearch.addClass('open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                            $('body').stop(true, true).css('overflow', 'hidden');
                            $('.morphsearch-input').focus();
                        });
                    }
                } else if ($('.header-search-overlay').length) {
                    $('.header-search-overlay').stop(true, true).removeClass('hide').css('opacity', 0).animate({ 'opacity': 1 }, 600, 'easeOutExpo', function () {
                        $(this).find('.searchinput').focus();
                    });
                } else if ($('.search-form-wrap').length) {
                    if ($('.search-form-wrap').hasClass('hide')) {
                        $('.search-form-wrap').removeClass('hide').addClass('show');
                        $('.search-form-wrap .searchinput').focus();
                    }
                }

            });
            $(document).on('click', '.header-search-overlay .close', function () {
                $('.header-search-overlay').stop(true, true).animate({ 'opacity': 0 }, 600, 'easeOutExpo', function () {
                    $(this).addClass('hide');
                });
            });
        },
        portfolio: {
            initVideoPopup: function () {
                $("a[data-rel='magnific-portfolio-video']").each(function () {
                    $(this).magnificPopup({
                        type: 'inline',
                        mainClass: 'dh-mfp-popup',
                        callbacks: {
                            open: function () {
                                //$(this.content).find(".video-embed.video-embed-popup,.audio-embed.audio-embed-popup").dh_mediaelementplayer();
                                $(this.content).find('iframe:visible').each(function () {
                                    if (typeof $(this).attr('src') != 'undefined') {
                                        if ($(this).attr('src').toLowerCase().indexOf("youtube") >= 0 || $(this).attr('src').toLowerCase().indexOf("vimeo") >= 0 || $(this).attr('src').toLowerCase().indexOf("twitch.tv") >= 0 || $(this).attr('src').toLowerCase().indexOf("kickstarter") >= 0 || $(this).attr('src').toLowerCase().indexOf("dailymotion") >= 0) {
                                            $(this).attr('data-aspectRatio', this.height / this.width).removeAttr('height').removeAttr('width');
                                            if ($(this).attr('src').indexOf('wmode=transparent') == -1) {
                                                if ($(this).attr('src').indexOf('?') == -1) {
                                                    $(this).attr('src', $(this).attr('src') + '?wmode=transparent');
                                                } else {
                                                    $(this).attr('src', $(this).attr('src') + '&wmode=transparent');
                                                }
                                            }
                                        }
                                    }
                                });
                                $(this.content).find('iframe[data-aspectRatio]').each(function () {
                                    var newWidth = $(this).parent().width();
                                    var $this = $(this);
                                    $this.width(newWidth).height(newWidth * $this.attr('data-aspectRatio'));

                                });
                            },
                            close: function () {
                                $(this.st.el).closest('.portfolio-item').find('.video-embed-wrap').html($(this.st.el).data('video-inline'));
                            }
                        }
                    });
                });
                $('.portfolio').find('.portfolio-item').each(function () {
                    $(this).find('.gallery-featured').closest('.portfolio-featured-wrap').find('.zoom-action').on('click', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        $(this).closest('.portfolio-featured-wrap').find('.gallery-featured').find('.caroufredsel-items li').first().find('a').trigger('click');
                    });
                });
            },
            styleOneInit: function () {
                $('.portfolio.portfolio-style-one').find('.portfolio-item').each(function () {
                    var $this = $(this);
                    var captionHeight = $this.find('.portfolio-caption').outerHeight();
                    captionHeight = captionHeight - 1;

                    if ($(this).get(0).hasAttribute('data-accent-color')) {
                        $(this).find('.portfolio-caption').css('background-color', $(this).data('accent-color'));
                    }


                    $this.find('.portfolio-action').css({ 'margin-top': (captionHeight / 2) + 'px' });

                    $this.find('.portfolio-item-wrap').hover(function () {
                        $(this).find('.portfolio-featured-wrap').css({
                            "bottom": captionHeight + "px"
                        });
                    }, function () {
                        var b = 0;
                        $(this).find('.portfolio-featured-wrap').css({
                            "bottom": b + "px"
                        });
                    });
                });
            },
            styleTwoInit: function (self) {
                $('.portfolio.portfolio-style-two').find('.portfolio-item').each(function () {
                    if ($(this).get(0).hasAttribute('data-accent-color')) {
                        $(this).find('.portfolio-overlay').css('background-color', self.hex2rgba($(this).data('accent-color'), 0.5));
                    }
                });
            },
            styleThreeInit: function (self) {
                $('.portfolio.portfolio-style-three').find('.portfolio-item').each(function () {
                    $(this).find('.portfolio-caption').css({ 'margin-top': - ($(this).find('.portfolio-caption').outerHeight() / 2) + 'px' });
                    if ($(this).get(0).hasAttribute('data-accent-color')) {
                        $(this).find('.portfolio-overlay').css('background-color', self.hex2rgba($(this).data('accent-color'), 0.9));
                    }
                });
            }
        },
        portfolioInit: function () {
            var self = this;
            self.portfolio.initVideoPopup();
            self.portfolio.styleOneInit();
            self.portfolio.styleTwoInit(self);
            self.portfolio.styleThreeInit(self);
            $(window).resize(function () {
                self.portfolio.styleOneInit();
                self.portfolio.styleThreeInit(self);
            });
        },
        mediaelementplayerInit: function () {
            if ($().mediaelementplayer) {
                $(".video-embed:not(.video-embed-popup),.audio-embed:not(.audio-embed-popup)").dh_mediaelementplayer();
            }
        },
        carouselInit: function () {
            var self = this;
            //related post carousel
            $('.caroufredsel').each(function () {
                var $this = $(this),
                    $visible = 3,
                    $height = 'auto',
                    $circular = false,
                    $auto_play = false,
                    $scroll_fx = 'scroll',
                    $duration = 2000,
                    $items_height = 'variable',
                    $auto_pauseOnHover = 'resume',
                    $items_width = '100%',
                    $infinite = false,
                    $responsive = false,
                    $scroll_item = 1,
                    $easing = 'swing';

                if ($this.hasClass('product-slider')) {
                    $visible = {
                        min: $(this).data('visible-min'),
                        max: $(this).find('ul.products').data('columns')
                    };
                } else {
                    if ($(this).data('visible-min') && $(this).data('visible-max')) {
                        $visible = {
                            min: $(this).data('visible-min'),
                            max: $(this).data('visible-max')
                        };
                    }
                }
                if ($(this).data('visible')) {
                    $visible = $(this).data('visible');
                }
                if ($(this).data('height')) {
                    $height = $(this).data('height');
                }
                if ($(this).data("speed")) {
                    $duration = parseInt($(this).data("speed"));
                }
                if ($(this).data("scroll-fx")) {
                    $scroll_fx = $(this).data("scroll-fx");
                }
                if ($(this).data("circular")) {
                    $circular = true;
                }
                if ($(this).data("infinite")) {
                    $infinite = true;
                }
                if ($(this).data("responsive")) {
                    $responsive = true;
                }
                if ($(this).data("autoplay")) {
                    $auto_play = true;
                }
                if ($(this).data('scroll-item')) {
                    $scroll_item = parseInt($(this).data('scroll-item'));
                }
                if ($(this).data('easing')) {
                    $easing = $(this).data('easing');
                }
                var carousel = $(this).children('.caroufredsel-wrap').children('ul.caroufredsel-items').length ? $(this).children('.caroufredsel-wrap').children('ul.caroufredsel-items') : $(this).children('.caroufredsel-wrap').find('ul');
                var carouselOptions = {
                    responsive: $responsive,
                    circular: $circular,
                    infinite: $infinite,
                    width: '100%',
                    height: $height,
                    auto: {
                        play: $auto_play,
                        pauseOnHover: $auto_pauseOnHover
                    },
                    swipe: {
                        onMouse: true,
                        onTouch: true
                    },
                    scroll: {
                        duration: 600,
                        fx: $scroll_fx,
                        timeoutDuration: $duration,
                        easing: $easing,
                        wipe: true
                    },
                    items: {
                        height: $items_height,
                        visible: $visible
                    }
                };

                if ($this.children('.caroufredsel-pagination').length) {
                    carouselOptions.pagination = { container: $this.children('.caroufredsel-pagination') };
                }
                if ($(this).children('.caroufredsel-wrap').children('.caroufredsel-prev').length && $(this).children('.caroufredsel-wrap').children('.caroufredsel-next').length) {
                    carouselOptions.prev = $(this).children('.caroufredsel-wrap').children('.caroufredsel-prev');
                    carouselOptions.next = $(this).children('.caroufredsel-wrap').children('.caroufredsel-next');
                }
                carousel.carouFredSel(carouselOptions);
                var $element = $this;
                if ($this.find('img').length == 0) $element = $('body');

                imagesLoaded($element, function () {
                    carousel.trigger("destroy").carouFredSel(carouselOptions);
                    $('[data-spy="scroll"]').each(function () {
                        var $spy = $(this).scrollspy('refresh');
                    });
                });

                $(window).resize(function () {
                    carousel.trigger("destroy").carouFredSel(carouselOptions);
                });
                //Single product image
                $(document).on('click', '.single-portfolio-gallery-caroufredsel-thumbs li > a', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $(this).closest('.single-portfolio-gallery-caroufredsel-thumbs').find('.selected').removeClass('selected');
                    $(this).closest('li').addClass('selected');
                    var rel = $(this).data('rel');
                    $('.single-portfolio-gallery-caroufredsel-main').find('ul').trigger('slideTo', rel);
                });
            });
        },
        responsiveEmbedIframe: function () {
            $('iframe:visible').each(function () {
                if (typeof $(this).attr('src') != 'undefined') {

                    if ($(this).attr('src').toLowerCase().indexOf("youtube") >= 0 || $(this).attr('src').toLowerCase().indexOf("vimeo") >= 0 || $(this).attr('src').toLowerCase().indexOf("twitch.tv") >= 0 || $(this).attr('src').toLowerCase().indexOf("kickstarter") >= 0 || $(this).attr('src').toLowerCase().indexOf("dailymotion") >= 0) {
                        $(this).attr('data-aspectRatio', this.height / this.width).removeAttr('height').removeAttr('width');
                        if ($(this).attr('src').indexOf('wmode=transparent') == -1) {
                            if ($(this).attr('src').indexOf('?') == -1) {
                                $(this).attr('src', $(this).attr('src') + '?wmode=transparent');
                            } else {
                                $(this).attr('src', $(this).attr('src') + '&wmode=transparent');
                            }
                        }
                    }
                }
            });
            $('iframe[data-aspectRatio]').each(function () {
                var newWidth = $(this).parent().width();
                var $this = $(this);
                $this.width(newWidth).height(newWidth * $this.attr('data-aspectRatio'));

            });
        },
        isotopeLayout: function () {
            var self = this;
            if ($('.sidebar-wrap').length > 0) {

            } else {
                $('[data-layout="masonry"]').each(function () {
                    var $this = $(this),
                        container = $this.find('.masonry-wrap'),
                        itemColumn = $this.data('masonry-column'),
                        itemWidth,
                        container_width = container.width();
                    //if(itemColumn == 4){
                    if (self.getViewport().width > 992) {
                        itemWidth = container_width / itemColumn;
                    } else if (self.getViewport().width <= 992 && self.getViewport().width >= 768) {
                        itemWidth = container_width / 2;
                    } else {
                        itemWidth = container_width / 1;
                    }
                    imagesLoaded($this, function () {
                        container.isotope({
                            layoutMode: 'masonry',
                            itemSelector: '.masonry-item',
                            transitionDuration: '0.8s',
                            getSortData: {
                                title: function (el) {
                                    return $(el).data('title');
                                },
                                date: function (el) {
                                    return parseInt($(el).data('date'));
                                }
                            },
                            masonry: {
                                gutter: 0,
                                columnWidth: itemWidth
                            }
                        }).isotope('layout');
                    });
                });
            }
        },
        isotopeInit: function () {
            var self = this;
            $('[data-layout="masonry"]').each(function () {
                var $this = $(this),
                    container = $this.find('.masonry-wrap'),
                    itemColumn = $this.data('masonry-column'),
                    itemWidth;

                if (self.getViewport().width > 992) {
                    itemWidth = container.width() / itemColumn;
                } else if (self.getViewport().width <= 992 && self.getViewport().width >= 768) {
                    itemWidth = container.width() / 2;
                } else {
                    itemWidth = container.width() / 1;
                }

                container.isotope({
                    layoutMode: 'masonry',
                    itemSelector: '.masonry-item',
                    transitionDuration: '0.8s',
                    getSortData: {
                        title: function (el) {
                            return $(el).data('title');
                        },
                        date: function (el) {
                            return parseInt($(el).data('date'));
                        }
                    }
                }).isotope('layout');

                var filter = $this.find('.portfolio-filter ul a');
                filter.click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    var $this = jQuery(this);
                    // don't proceed if already selected
                    if ($this.hasClass('selected')) {
                        return false;
                    }

                    var filters = $this.closest('ul');
                    filters.find('.selected').removeClass('selected');
                    $this.addClass('selected');
                    $this.closest('.portfolio-filter').find('.filter-heaeding h3').text($this.text());
                    var options = {
                        layoutMode: 'masonry',
                        transitionDuration: '0.8s',
                        getSortData: {
                            title: function (el) {
                                return $(el).data('title');
                            },
                            date: function (el) {
                                return parseInt($(el).data('date'));
                            }
                        }
                    },
                        key = filters.attr('data-filter-key'),
                        value = $this.attr('data-filter-value');

                    value = value === 'false' ? false : value;
                    options[key] = value;
                    container.isotope(options);
                    var wrap = $this.closest('[data-layout="masonry"]');
                    if (wrap.hasClass('portfolio-style-three')) {
                        self.portfolio.styleThreeInit(self);
                    }
                    if (wrap.hasClass('portfolio-style-two')) {
                        self.portfolio.styleTwoInit(self);
                    }
                    $('[data-spy="scroll"]').each(function () {
                        var $spy = $(this).scrollspy('refresh');
                    });
                });
                $this.find('.filter-btn').click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if ($(this).hasClass('current')) {
                        $(this).removeClass('current');
                        $(this).closest('.filter-action').find('ul li').hide('slow');
                    } else {
                        $(this).addClass('current');
                        $(this).closest('.filter-action').find('ul li').show('slow');
                    }
                });
                $this.find('.sort-btn').click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var $this = $(this),
                        sortBy = $this.data('sort'),
                        sortAscending = (sortBy === 'title') ? true : false,
                        current = ($this.hasClass('current')) ? true : false,
                        reversed = ($this.hasClass('reversed')) ? true : false;

                    if ($(this).closest('.filter-action').find('.filter-btn').hasClass('current')) {
                        $(this).closest('.filter-action').find('.filter-btn').removeClass('current');
                        $(this).closest('.filter-action').find('ul li').hide('slow');
                    }


                    if (current) {
                        if (reversed) {
                            $this.removeClass('reversed');
                            $this.find('i').removeClass('fa-sort').removeClass('sort-angle-up').addClass('sort-angle-down');
                            sortAscending = true;
                        } else {
                            $this.addClass('reversed');
                            $this.find('i').removeClass('fa-sort').removeClass('sort-angle-down').addClass('sort-angle-up');
                            sortAscending = false;
                        }
                    } else {
                        $this.parent().find('.sort-btn.current').removeClass('current');
                        $this.parent().find('.sort-btn.reversed').removeClass('reversed');
                        $this.parent().find('.sort-btn').find('i').removeClass('fa-sort').removeClass('sort-angle-up').addClass('sort-angle-down');
                        if (sortBy === 'title') {
                            $this.addClass('current');
                            $this.find('i').removeClass('fa-sort').removeClass('sort-angle-up').addClass('sort-angle-down');
                        } else {
                            $this.addClass('current reversed');
                            $this.find('i').removeClass('fa-sort').removeClass('sort-angle-down').addClass('sort-angle-up');
                        }
                    }

                    container.isotope({
                        sortBy: sortBy,
                        sortAscending: sortAscending
                    });
                    var wrap = $this.closest('[data-layout="masonry"]');
                    if (wrap.hasClass('portfolio-style-three')) {
                        self.portfolio.styleThreeInit(self);
                    }
                    if (wrap.hasClass('portfolio-style-two')) {
                        self.portfolio.styleTwoInit(self);
                    }
                });
            });

            self.isotopeLayout();
        },
        shopInit: function () {
            var self = this;
            //Shop mini cart
            $(document).on("mouseenter", ".navbar-minicart", function () {
                window.clearTimeout($(this).data('timeout'));
                $('.navbar-minicart .minicart').fadeIn(50);
            });
            $(document).on("mouseleave", ".navbar-minicart", function () {
                var t = setTimeout(function () {
                    $('.navbar-minicart .minicart').fadeOut(50);
                }, 400);
                $(this).data('timeout', t);
            });

            //Single product image
            $(document).on('click', '.product-thumbnails-slider .thumb > a', function (e) {
                e.stopPropagation();
                e.preventDefault();
                $(this).closest('.product-thumbnails-slider').find('.selected').removeClass('selected');
                $(this).closest('.thumb').addClass('selected');
                var rel = $(this).data('rel');
                $('.product-images-slider').find('ul').trigger('slideTo', rel);
            });
        },
        animateBoxInit: function () {
            var self = this;
            $('.column[data-fade="1"]').each(function () {
                if (self.getViewport().width > "992") {
                    $(this).appear(function () {
                        $(this).data("fade-animation") === "in-from-top" ? $(this).animate({ opacity: "1", top: "0" }, 1000, "swing") :
                            $(this).data("fade-animation") === "in-from-left" ? $(this).animate({ opacity: "1", left: "0" }, 1000, "swing") :
                                $(this).data("fade-animation") === "in-from-right" ? $(this).animate({ opacity: "1", right: "0" }, 1000, "swing") :
                                    $(this).data("fade-animation") === "in-from-bottom" ? $(this).animate({ opacity: "1", bottom: "0" }, 1000, "swing") :
                                        $(this).animate({ opacity: "1" }, 1000, "swing");
                    });
                } else {
                    $(this).css({ 'left': '', 'right': '', 'bottom': '', 'top': '' });
                }
            });
            $('.animate-box[data-animate="1"]').each(function () {
                var $this = $(this);
                if (self.getViewport().width > "992") {
                    $this.appear(function () {
                        $this.addClass('go');
                    });
                } else {
                    $this.css('visibility', 'visible');
                }
            });

        },
        magnificpopupInit: function () {
            if ($().magnificPopup) {
                $("a[data-rel='magnific-popup']").magnificPopup({
                    type: 'image',
                    mainClass: 'dh-mfp-popup',
                    gallery: {
                        enabled: true
                    }
                });

                $("a[data-rel='magnific-single-popup']").magnificPopup({
                    type: 'image',
                    mainClass: 'dh-mfp-popup',
                    gallery: {
                        enabled: false
                    }
                });
            }
        },
        navDropdown: function () {
            if (this.getViewport().width > "992") {
                $('.topbar-nav').superfish({
                    anchorClass: '.dropdown',      // selector within menu context to define the submenu element to be revealed
                    hoverClass: 'open',          // the class applied to hovered list items
                    pathClass: 'overideThisToUse', // the class you have applied to list items that lead to the current page
                    pathLevels: 1,                  // the number of levels of submenus that remain open or are restored using pathClass
                    delay: 650,                // the delay in milliseconds that the mouse can remain outside a submenu without it closing
                    animation: { opacity: 'show' },   // an object equivalent to first parameter of jQuery’s .animate() method. Used to animate the submenu open
                    animationOut: { opacity: 'hide' },   // an object equivalent to first parameter of jQuery’s .animate() method Used to animate the submenu closed
                    speed: 'fast',           // speed of the opening animation. Equivalent to second parameter of jQuery’s .animate() method
                    speedOut: 'fast',             // speed of the closing animation. Equivalent to second parameter of jQuery’s .animate() method
                    cssArrows: true,               // set to false if you want to remove the CSS-based arrow triangles
                    disableHI: false,              // set to true to disable hoverIntent detection
                });
                $('.primary-nav').superfish({
                    anchorClass: '.dropdown',      // selector within menu context to define the submenu element to be revealed
                    hoverClass: 'open',          // the class applied to hovered list items
                    pathClass: 'overideThisToUse', // the class you have applied to list items that lead to the current page
                    pathLevels: 1,                  // the number of levels of submenus that remain open or are restored using pathClass
                    delay: 650,                // the delay in milliseconds that the mouse can remain outside a submenu without it closing
                    animation: { opacity: 'show' },   // an object equivalent to first parameter of jQuery’s .animate() method. Used to animate the submenu open
                    animationOut: { opacity: 'hide' },   // an object equivalent to first parameter of jQuery’s .animate() method Used to animate the submenu closed
                    speed: 'fast',           // speed of the opening animation. Equivalent to second parameter of jQuery’s .animate() method
                    speedOut: 'fast',             // speed of the closing animation. Equivalent to second parameter of jQuery’s .animate() method
                    cssArrows: true,               // set to false if you want to remove the CSS-based arrow triangles
                    disableHI: false,              // set to true to disable hoverIntent detection
                });
            }
            $('.primary-nav .dropdown-hover .caret,.primary-nav .dropdown-submenu > a > .caret,.primary-nav .megamenu-title .caret').off('click').on('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var dropdown = $(this).closest(".dropdown, .dropdown-submenu");
                if (dropdown.hasClass("open")) {
                    dropdown.removeClass("open");
                } else {
                    dropdown.addClass("open");
                }
            });
        },
        headingInit: function () {
            var self = this;
            var headingPadding = function () {
                if ($('.header-container').length && $('.header-container').hasClass('header-fixed')) {
                    $('.heading-container > div').css({ 'padding-top': $('.header-container').height() + 'px' });
                }
            }
            headingPadding();
            $(window).resize(function () {
                headingPadding();
            });
            var headingHeight = $('.heading-container').height();
            var headingBgPadding = function () {
                if (self.getViewport().width > "992") {
                    if ($('.heading-background').closest('body').find('.header-container').hasClass('header-transparent')) {
                        $('.heading-background').css({ 'padding-top': $('.heading-background').closest('body').find('.header-container').height() + 'px' })
                    }
                } else {
                    $('.heading-background').css({ 'padding-top': '' });
                }
            }
            headingBgPadding();
            if ($('.heading-background').closest('body').find('.header-container').hasClass('header-transparent')) {
                imagesLoaded($('.heading-container'), function () {
                    headingBgPadding();
                });
            }
            $(window).resize(function () {
                headingBgPadding();
            });
        },
        dhSliderInit: function () {
            var self = this;
            $('.dhslider').each(function () {
                var $this = $(this),
                    isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent),
                    or_height = $this.height(),
                    min_height = 250,
                    startwidth = $this.width(),
                    startheight = $this.data('height');


                var dynamicHeight = function () {
                    var slider_height = startheight,
                        slider_width = startwidth;

                    if (!$this.hasClass('dhslider-fullscreen')) {
                        if ($this.width() > self.getViewport().width) {
                            $this.css('width', '100%');
                        }
                    }

                    if ($this.hasClass('dhslider-fullscreen') && self.getViewport().width > "992") {
                        slider_width = self.getViewport().width;
                        slider_height = self.getViewport().height;
                    } else {
                        var scale_slider = $(window).width() / 1600;
                        //min height
                        if (self.getViewport().width <= "992") {
                            if (startheight * scale_slider <= min_height) {
                                slider_height = min_height;
                            } else {
                                slider_height = Math.round(startheight * scale_slider);
                            }
                        }
                    }

                    var heading_height = 0;

                    if ($('body').find('.header-container').hasClass('header-transparent') && self.getViewport().width > "992") {
                        heading_height = $('body').find('.header-container').height();
                    }
                    $this.css({ 'height': slider_height + 'px' });
                    $this.find('.item').css({ 'height': slider_height + 'px' });

                    var slider_width = $this.width(),
                        slider_height = $this.height(),
                        scale_h = slider_width / 1280,
                        scale_v = (slider_height - $('.header-container').height()) / 720,
                        scale = scale_h > scale_v ? scale_h : scale_v,
                        min_w = 1280 / 720 * (slider_height + 20);

                    if (scale * 1280 < min_w) {
                        scale = min_w / 1280;
                    }
                    $this.find('.video-embed-wrap').css('width', ($this.width() + 2)).css('height', ($this.height() + 2));
                    $this.find('.slider-video').width(Math.ceil(scale * 1280 + 2));
                    $this.find('.slider-video').height(Math.ceil(scale * 720 + 2));

                    var active_cation = $this.find('.active .slider-caption');
                }

                dynamicHeight();
                $(window).resize(function () {
                    dynamicHeight();
                });
                if ($this.data('autorun') == 'yes') {
                    $this.carousel({
                        interval: parseInt($this.data('duration')),
                        pause: false
                    });
                } else {
                    $this.carousel({
                        interval: 0,
                        pause: false
                    });
                }

                $this.on('slide.bs.carousel', function () {
                    $this.find('.active .slider-caption').fadeTo(800, 0);
                });
                $this.on('slid.bs.carousel', function () {
                    $this.find('.active .slider-caption').fadeTo(0, 1);
                });

                imagesLoaded($this, function () {
                    $this.find('.dhslider-loader').fadeOut(500);
                });
            });
        },
        getViewport: function () {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return { width: e[a + 'Width'], height: e[a + 'Height'] };
        },
        hex2rgba: function (hex, opacity) {
            hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
            var rgb = {
                r: hex >> 16,
                g: (hex & 0x00FF00) >> 8,
                b: (hex & 0x0000FF)
            };
            if (!rgb) return null;
            if (opacity === undefined) opacity = 1;
            return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + parseFloat(opacity) + ')';
        },
        isTouch: function () {
            return !!('ontouchstart' in window) || (!!('onmsgesturechange' in window) && !!window.navigator.maxTouchPoints);
        }
    };
    $(document).ready(function () {
        DH.init();
        $(window).load(function () {
            $('body').append('<div class="content-popup-overlay" id="content-popup-overlay"></div><div class="content-popup-wrap" id="content-popup-wrap"><div class="content-popup-content shop"></div><span class="content-popup-close" id="content-popup-close"></div>');
        });
    });
    $(document).bind('dh-change-layout', function () {
        setTimeout(function () {
            DH.init();
        }, 500);
    });
})(jQuery);
