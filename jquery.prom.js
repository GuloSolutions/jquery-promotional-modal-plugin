;( function( $, window, document, undefined ) {

	"use strict";

		var pluginName = "prom",
			defaults = {
				doNotRunOn: '',
				scrolledDown: false,
				isCookieSet: false
			};

		function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		if (sessionStorage.getItem("_prom") === undefined) {
            var m_trigger = 0;
        } else {
            var m_trigger = sessionStorage.getItem("_prom");
        }

		$.extend( Plugin.prototype, {
			init: function() {
				this.checkCookies();
				this.detectRecommendation();

				if (!this.detectCurrentUrl() || !this.detectRecommendation()) {
					this.timeOut();
					this._scroll_detect();
				}
			},

			checkCookies: function( ) {
                // check cookies
                if (Cookies.get('promcookie') === undefined) {
                    var cval = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    // set cookie expiration time in 3 days
                    Cookies.set('promcookie', cval);
                } else {
                    this.settings.isCookieSet = true;
                }
            },

			_scroll_detect: function() {

				var id = this.element.id;
				var pcookie = parseInt(sessionStorage.getItem('_prom'));

				if (this.settings.scrolledDown === false){
					$(window).on("scroll", function() {
						var scrollHeight = $(document).height();
						var scrollPosition = $(window).height() + $(window).scrollTop();
						if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
						    alert('scroll');
						    this.settings.scrolledDown = true;
						    sessionStorage.setItem('_prom', pcookie++);
						}
					});
				}
			},

			timeOut: function() {
                var id = this.element.id;

                if (this.settings.isCookieSet === false )
                    window.setTimeout(function(){
                        $('#'+id).modal();
                    }, 3000);
                    this.settings.isCookieSet = true;
                },

            detectCurrentUrl: function() {
            	var doNotRunOn = this.settings.doNotRunOn;
            	if ( doNotRunOn.length !== 0 &&  window.location.href.indexOf(doNotRunOn) > -1) {
            		alert('found');
				    return true;
				}
				return false;
            },

            detectRecommendation: function() {
            	var doNotRunOn = this.settings.doNotRunOn;
            	var recAttr = $('.recommended').data('recommended-product');
            	if (recAttr !== null && recAttr.indexOf(doNotRunOn) > -1){
            		console.log('found');
            		return true;
            	}
            	return false;
            },

		});

		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
