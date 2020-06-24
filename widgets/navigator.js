/*\
title: $:/lvr/widgets/navigator
type: application/javascript
module-type: widget

LimeViperReader-Navigator widget

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var IMPORT_TITLE = "$:/Import";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var NavigatorWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
	this.addEventListeners([
		{type: "lvr-reset-view", handler: "handleResetViewEvent"}
	]);
};

/*
Inherit from the base widget class
*/
NavigatorWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
NavigatorWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	this.renderChildren(parent,nextSibling);
};

/*
Compute the internal state of the widget
*/
NavigatorWidget.prototype.execute = function() {
	// Get our parameters
	this.storyTitle = this.getAttribute("story");
	this.historyTitle = this.getAttribute("history");
	this.setVariable("tv-story-list",this.storyTitle);
	this.setVariable("tv-history-list",this.historyTitle);
	// Construct the child widgets
	this.makeChildWidgets();
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
NavigatorWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes.story || changedAttributes.history) {
		this.refreshSelf();
		return true;
	} else {
		return this.refreshChildren(changedTiddlers);
	}
};
	
NavigatorWidget.prototype.handleResetViewEvent = function(event) {
	console.log("LVR-NAV: RESET!");
};
	
exports["appify-navigator"] = NavigatorWidget;

})();