;
(function($, window, document, undefined) {
    "use strict";
    var pluginName = "prom",
        defaults = {
            doNotRunOn: '',
            isCookieSet: false
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function() {
            if ( !this.detectCurrentUrl() || !this.detectRecommendation()) {
                this.checkCookies();
                this.timeOut();
                this._scroll_detect();
            }
        },

        checkCookies: function() {
            // check cookies
            if (Cookies.get('promocookie') === undefined) {
                var cval = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                // set cookie expiration time in 3 days
                Cookies.set('promocookie', cval, {
                    expires: 3,
                    path: '/'
                });
            } else {
                this.settings.isCookieSet = true;
            }
        },

        _scroll_detect: function() {
            var id = this.element.id;
            var cookie = this.settings.isCookieSet;
            $(window).on("scroll", function() {
                var scrollHeight = $(document).height();
                var scrollPosition = $(window).height() + $(window).scrollTop();
                if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
                    if (cookie === false) {
                        $('#' + id).modal({
                            fadeDuration: 250
                        });
                        this.settings.isCookieSet = true;
                    }
                }
            });
        },

        timeOut: function() {
            var id = this.element.id;
            var cookie = this.settings.isCookieSet;
            if (cookie === false ) {
                window.setTimeout(function() {
                    $('#' + id).modal({
                        fadeDuration: 250
                    });
                }, 4000);
            }
            this.settings.isCookieSet = true;
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
