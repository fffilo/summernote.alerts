;(function (factory) {
	// Global define
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery"], factory);
	}
	else if (typeof module === "object" && module.exports) {
		// Node/CommonJS
		module.exports = factory(require("jquery"));
	}
	else {
		// Browser globals
		factory(window.jQuery);
	}
}(function ($) {
	/**
	 * Valid alert types
	 *
	 * @type {Array}
	 */
	var valid = [ "success", "info", "warning", "danger" ];

	/**
	 * Icon of each alert type
	 *
	 * @type {Array}
	 */
	var icons = [ "check-circle", "info-circle", "exclamation-circle", "times-circle" ];

	/**
	 * Templates for each alert type
	 *
	 * @type {Array}
	 */
	var templ = [
		"<strong>Well done!</strong> You successfully read this important alert message.",
		"<strong>Heads up!</strong> This alert needs your attention, but it's not super important.",
		"<strong>Warning!</strong> Better check yourself, you're not looking too good.",
		"<strong>Oh snap!</strong> Change a few things up and try submitting again."
	];

	/**
	 * Render toolbar button
	 *
	 * @param  {Object} context
	 * @param  {Number} index
	 * @return {Void}
	 */
	var render = function(context, index) {
		var type = valid[index];
		var icon = icons[index];
		var html = templ[index];

		context.memo("button." + type, function() {
			var button = $.summernote.ui.button({
					className: "note-btn-alerts-" + type,
					contents: '<i class="fa fa-' + icon + '"></i>',
					tooltip: "Alert " + type.charAt(0).toUpperCase() + type.slice(1),
					click: function(e) {
						var $el = $("<div />")
							.addClass("alert")
							.addClass("alert-" + type)
							.html(html);

						context.invoke("editor.insertNode", $el.get(0));

						return false;
					}
				});

			return button.render();
		});
	}

	// Extends plugins for adding alert templates.
	// - plugin is external module for customizing.
	$.extend($.summernote.plugins, {
		alerts: function(context) {
			var toolbar = context.options.toolbar;

			for (var i = 0; i < toolbar.length; i++) {
				for (var j = 0; j < toolbar[i][1].length; j++) {
					var index = valid.indexOf(toolbar[i][1][j]);
					if (index != -1) {
						render(context, index);
					}
				}
			}
		}
	});
}));
