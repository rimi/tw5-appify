/*\
title: $:/plugins/techpad/widgets/mode-guards/dev-guard
type: application/javascript
module-type: widget

Reveal widget

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var RimirTogglerWidget = require("$:/plugins/rimi/appify/widgets/toggle-content-based-on-state-tiddler").rimir_toggler;

var DevGuardWidget = function(parseTreeNode,options) {
	this.state = "$:/state/rimi/dev-mode";
	this.initialise(parseTreeNode,options);
};
	
DevGuardWidget.prototype = new RimirTogglerWidget();

exports["dev-guard"] = DevGuardWidget;

})();
