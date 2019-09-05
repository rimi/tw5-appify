/*\
title: $:/plugins/rimi/appify/widgets/toggle-content-based-on-state-tiddler
type: application/javascript
module-type: widget

Reveal widget

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var RimirTogglerWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
RimirTogglerWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
RimirTogglerWidget.prototype.render = function(parent,nextSibling) {
	console.log("enter render")
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	var domNode = this.document.createElement("span");
	parent.insertBefore(domNode,nextSibling);
	this.renderChildren(domNode,null);
	if(!this.isOpen) {
		domNode.setAttribute("hidden","true");
	}
	this.domNodes.push(domNode);
};

/*
Compute the internal state of the widget
*/
RimirTogglerWidget.prototype.execute = function() {
	console.log("enter execute")
	// Get our parameters
	this.readState();
	// Construct the child widgets
	var childNodes = this.isOpen ? this.parseTreeNode.children : [];
	this.hasChildNodes = this.isOpen;
	this.makeChildWidgets(childNodes);
};

/*
Read the state tiddler
*/
RimirTogglerWidget.prototype.readState = function() {
	console.log("enter readState")
	// Read the information from the state tiddler
	var stateTitleTiddler = this.wiki.getTiddler(this.state);
	console.log("Tiddler:" + JSON.stringify(stateTitleTiddler));
	if(!stateTitleTiddler){
		this.isOpen = false;
	}else{
		if("on" == stateTitleTiddler.fields.text){
			this.isOpen = true;
		}else{
			this.isOpen = false;
		}
	}
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
RimirTogglerWidget.prototype.refresh = function(changedTiddlers) {
	console.log("enter refresh")
	var currentlyOpen = this.isOpen;
	this.readState();
	if(this.isOpen !== currentlyOpen) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

exports.rimir_toggler = RimirTogglerWidget;

})();
