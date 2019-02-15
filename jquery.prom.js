;
(function($, window, document, undefined) {
    "use strict";

    var pluginName = "prom",
        defaults = {
            doNotRunOn: '',
            isCookieSet: false,
            fadeDuration: 250,
            fadeDelay: 0
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    // remove cookies for single page
    // these are necessary for not triggering another modal
    Cookies.remove('modalpageopened');

    $.extend(Plugin.prototype, {
        init: function() {
            if ( !this.detectCurrentUrl() || !this.detectRecommendation()) {
                this.timeOut(this.settings.fadeDelay, this.settings.fadeDuration);
                this._scroll_detect(this.settings.fadeDuration, this.settings.fadeDelay);
            }
        },

        _scroll_detect: function(fadeDuration, fadeDelay) {
            var id = this.element.id;
            var cookie = this.settings.isCookieSet;
            $(window).on("scroll", function() {
                var activated = $('#coupon-cards');
                var promoCookie = Cookies.get('promocookie');
                var beforeCookie = Cookies.get('modalpageopened');
                var scrollHeight = $(document).height();
                var scrollPosition = $(window).height() + $(window).scrollTop();
                if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
                    if (promoCookie === undefined && beforeCookie === undefined && (activated.length = 0 || activated.css('display') ==  'none')) {
                        $('#' + id).modal({
                            fadeDuration: fadeDuration,
                            fadeDelay:fadeDelay
                        });
                    }
                }
            });
        },

        timeOut: function(fadeDuration, fadeDelay) {
            var id = this.element.id;
            var cookie = Cookies.get('promocookie');
            var current = $('.close-modal');
            var beforeCookie = Cookies.get('modalpageopened');
            var beforeModal = parseInt(sessionStorage.getItem("popped"));
            var activated = $('#coupon-cards');

            window.setTimeout(function() {
                var beforeCookie = Cookies.get('modalpageopened');
                var promoCookie = Cookies.get('promocookie');
                    if ( beforeCookie === undefined) {
                        if (promoCookie === undefined  && (activated.length == 0 || activated.css('display') ==  'none')) {
                    $('#' + id).modal({
                        fadeDuration: fadeDuration,
                        fadeDelay: fadeDelay
                    });

                    if ( cookie == undefined ){
                        checkCookies();
                    }
                }
            }
            }, 4000);

            var checkCookies = function() {
                if (Cookies.get('promocookie') === undefined) {
                    var cval = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    // set cookie expiration time in 3 days
                    Cookies.set('promocookie', cval, {
                        expires: 3,
                        path: '/'
                    });
                }
            };
        },

        detectCurrentUrl: function() {
            var doNotRunOn = this.settings.doNotRunOn;
            if (doNotRunOn.length && window.location.href.indexOf(doNotRunOn) > -1) {
                return true;
            }
            return false;
        },

        detectRecommendation: function() {
            var doNotRunOn = this.settings.doNotRunOn;
            var recAttr = $('.recommended').data('recommended-product');
            if (recAttr !== null && recAttr.indexOf(doNotRunOn) > -1) {
                return true;
            }
            return false;
        },
    });

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
