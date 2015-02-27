/**
 * cbpHorizontalMenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

/* jshint ignore:start */
var cbpHorizontalMenu = (function() {

    var $listItems = $('#cbp-hrmenu > ul > li'),
        $menuItems = $listItems.children('a'),
        $body = $('body'),
        current = -1;

    function init() {
        $listItems = $('#cbp-hrmenu > ul > li');
        $menuItems = $listItems.children('a');
        current = -1;

        $menuItems.on('click', open);
        //$listItems.on( 'click', function( event ) { event.stopPropagation(); } );
    }

    function open(event) {
        if (current !== -1) {
            $listItems.eq(current).removeClass('cbp-hropen');
        }

        var $item = $(event.currentTarget).parent('li'),
            idx = $item.index();

        // if (current === idx) {
        //     $item.removeClass('cbp-hropen');
        //     current = -1;
        // } else {
        $item.addClass('cbp-hropen');
        current = idx;
        $body.off('click').on('click', close);
        // }

        return false;

    }

    function close(event) {
        if ($(event.target).parent().attr('id') == 'cbp-hrmenu' ||
            $(event.target).parent().parent().attr('id') == 'cbp-hrmenu' ||
            $(event.target).parent().parent().parent().attr('id') == 'cbp-hrmenu' ||
            $(event.target).parent().parent().parent().parent().attr('id') == 'cbp-hrmenu' ||
            $(event.target).parent().parent().parent().parent().parent().attr('id') == 'cbp-hrmenu' ||
            $(event.target).parent().parent().parent().parent().parent().parent().attr('id') == 'cbp-hrmenu') {

        } else {
            $listItems.eq(current).removeClass('cbp-hropen');
            current = -1;

        }
    }

    return {
        init: init
    };

})();
/* jshint ignore:end */
