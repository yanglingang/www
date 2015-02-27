'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp').controller('MainCtrl', ['$anchorScroll', '$location', '$scope', '$timeout', 'MenuService',
    function($anchorScroll, $location, $scope, $timeout, MenuService) {

        $scope.$watch('menu', function() {
            //DOM渲染后加载
            $timeout(function() {
                cbpHorizontalMenu.init();
            }, 0, false);
        });

        $scope.loadOuterMenu = function() {
            MenuService.getOuterMenu().then(function(data) {
                $scope.menu = data;
                //alert(JSON.stringify($scope.menu));
            });
        };

        $scope.loadInnerMenu = function() {
            MenuService.getInnerMenu().then(function(data) {
                $scope.menu = data;
            });
        };

        $anchorScroll.yOffset = 1;

        // $scope.gotoAnchor = function(x) {
        //     $anchorScroll.yOffset = 1;
        //     var newHash = 'section' + x;
        //     if ($location.hash() !== newHash) {
        //         // set the $location.hash to `newHash` and
        //         // $anchorScroll will automatically scroll to it
        //         $location.hash('section' + x);
        //     } else {
        //         // call $anchorScroll() explicitly,
        //         // since $location.hash hasn't changed
        //         $anchorScroll();
        //     }
        // };
        $scope.init = function() {
            $scope.loadOuterMenu();

            $(".status").fadeOut();
            $(".preloader").delay(1000).fadeOut("slow");


            /*---------------------------------------*/
            /*  WOW FOR ANIMATION ON SCROLL
            /*---------------------------------------*/
            /*global WOW:true*/
            var wow = new WOW({
                mobile: false
            });
            wow.init();


            /*---------------------------------------*/
            /*  CONTACT FORM
            /*---------------------------------------*/

            $("#contact-form").submit(function(e) {
                e.preventDefault();
                var name = $("#cf-name").val();
                var email = $("#cf-email").val();
                var subject = $("#cf-subject").val();
                var message = $("#cf-message").val();
                var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

                function isValidEmail(emailAddress) {
                    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                    return pattern.test(emailAddress);
                }
                if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {
                    $.ajax({
                        type: "POST",
                        url: "sendmail.php",
                        data: dataString,
                        success: function() {
                            $('.email-success').fadeIn(1000);
                            $('.email-error').fadeOut(500);
                        }
                    });
                } else {
                    $('.email-error').fadeIn(1000);
                    $('.email-success').fadeOut(500);
                }
                return false;
            });



            /*---------------------------------------*/
            /*  SMOOTH SCROLL FRO INTERNAL #HASH LINKS
            /*---------------------------------------*/


            /*---------------------------------------*/
            /*  NAVIGATION AND NAVIGATION VISIBLE ON SCROLL
            /*---------------------------------------*/

            function mainNav() {
                var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                if (top > 600) {
                    $('.appear-on-scroll').stop().animate({
                        "top": '-70',
                        "opacity": '0'
                    });

                    $("#stickUpBar").css("position", "absolute");
                    $("#stickUpBar").css("top", top);
                } else {
                    $('.appear-on-scroll').stop().animate({
                        "opacity": '1',
                        "top": '0'
                    });
                    $("#stickUpBar").css("position", "");
                }

                if (top > 0) {
                    $('footer').removeClass('navbar-fixed-bottom');
                } else {
                    $('footer').addClass('navbar-fixed-bottom');
                }

                /* if (top > 95) {
                        $('.js-login').fadeOut(20);
                        }
                        else {
                        $('.js-login').fadeIn(200);
                            
                        }
                    
                        if (top > 200) {
                        $('.js-register').fadeIn(200);
                        }
                        else {
                        $('.js-register').fadeOut(200);
                            
                        } */
            }


            $(window).scroll(function() {
                mainNav();
            });
            /*---------------------------------------*/
            /*  SCREENSHOT CAROUSEL
            /*---------------------------------------*/
            setTimeout(function() {
                $("#screenshots").owlCarousel({
                    navigation: false,
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    singleItem: true
                });

                $('#screenshots a').nivoLightbox({
                    effect: 'fadeScale',
                });
            }, 1000);


            /*---------------------------------------*/
            /*  PLACEHOLDER FIX
            /*---------------------------------------*/
            //CREATE PLACEHOLDER FUNCTIONALITY IN IE
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() === input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() === '' || input.val() === input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur();

            //ENSURE PLACEHOLDER TEEXT IS NOT SUBMITTED AS POST
            $('[placeholder]').parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() === input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });

            /*---------------------------------------*/
            /*  BOOTSTRAP FIXES
            /*---------------------------------------*/

            var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
            $.fn.modal.Constructor.prototype.setScrollbar = function() {
                oldSSB.apply(this);
                if (this.scrollbarWidth) {
                    $('.navbar-fixed-top').css('padding-right', this.scrollbarWidth);
                }
            };

            var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
            $.fn.modal.Constructor.prototype.resetScrollbar = function() {
                oldRSB.apply(this);
                $('.navbar-fixed-top').css('padding-right', '');
            };

            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement('style');
                msViewportStyle.appendChild(
                    document.createTextNode(
                        '@-ms-viewport{width:auto!important}'
                    )
                );
                document.querySelector('head').appendChild(msViewportStyle);
            }



            /*---------------------------------------*/
            /*  TIMELINE SLIDER
                /*---------------------------------------*/


            var x = 0,
                init,
                container = $('.timeline-section'),
                /* TIMELINE SELECTOR */
                items = container.find('li'),
                containerHeight = 0,
                numberVisible = 4,
                /* NUMBER OF <li> TO SHOW IN SCROLLER */
                intervalSec = 4000; /* INTERVAL TIME */

            if (!container.find('li:first').hasClass("first")) {
                container.find('li:first').addClass("first");
            }

            items.each(function() {
                if (x < numberVisible) {
                    containerHeight = containerHeight + $(this).outerHeight();
                    x = x + 1;
                }
            });

            container.css({
                height: containerHeight,
                overflow: "hidden"
            });

            function vertCycle() {
                var firstItem = container.find('li.first').html();

                container.append('<li>' + firstItem + '</li>');
                firstItem = '';
                container.find('li.first').animate({
                    marginTop: "-105px",
                    opacity: "0"
                }, 600, function() {
                    $(this).remove();
                    container.find('li:first').addClass("first");
                });
            }

            if (intervalSec < 700) {
                intervalSec = 700;
            }

            init = setInterval(function() {
                vertCycle();
            }, intervalSec);

            container.hover(function() {
                clearInterval(init);
            }, function() {
                init = setInterval(function() {
                    vertCycle();
                }, intervalSec);
            });
        };
    }
]);

angular.module('wwwApp')
    .controller('JoinCtrl', function($scope) {
        $scope.title = "";
    });
