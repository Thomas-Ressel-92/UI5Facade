/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object"],function(q,B){"use strict";var _=[];var a=[];var b=function(i){var e=sap.ui.getCore().byId(i.context.id),d="";if(i.context.id==="WEBPAGE"){d="sap.ui.core";}else if(e){d=e.getMetadata().getName();}return{severity:i.severity,name:i.rule.title,description:i.rule.description,resolution:i.rule.resolution,resolutionUrls:i.rule.resolutionurls,audiences:i.rule.audiences,categories:i.rule.categories,details:i.details,ruleLibName:i.rule.libName,ruleId:i.rule.id,context:{className:d,id:i.context.id}};};var I={addIssue:function(i){_.push(i);},walkIssues:function(C){_.forEach(C);},clearIssues:function(){if(!_.length){return;}a.push({issues:_.slice()});_=[];},getHistory:function(){this.clearIssues();return a.slice();},getConvertedHistory:function(){var t=this,i=t.getHistory(),d=[],e=null;i.forEach(function(r){e=t.groupIssues(t.convertToViewModel(r.issues));d.push({issues:e});});return d;},getIssuesViewModel:function(){var v=[];this.walkIssues(function(i){v.push(b(i));});return v;},getRulesViewModel:function(r,s,i){var d={},e=0,g={},l={},f={},h=q.extend(true,{},r),j=q.extend(true,{},i);for(g in h){d[g]=q.extend(true,{},h[g].ruleset._mRules);l=d[g];Object.defineProperty(l,'selected',{enumerable:false,configurable:true,writable:true,value:false});Object.defineProperty(l,'issueCount',{enumerable:false,configurable:true,writable:true,value:0});for(f in h[g].ruleset._mRules){l[f]=q.extend(true,[],l[f]);Object.defineProperty(l[f],'selected',{enumerable:false,configurable:true,writable:true,value:false});Object.defineProperty(l[f],'issueCount',{enumerable:false,configurable:true,writable:true,value:0});if(s[f]){l[f].selected=true;l.selected=true;}if(j[g]&&j[g][f]){l[f].push.apply(l[f],j[g][f]);e=j[g][f].length;l[f].issueCount=e;l.issueCount+=e;}}}return d;},clearHistory:function(){a=[];},convertToViewModel:function(d){var v=[];for(var i=0;i<d.length;i++){v.push(b(d[i]));}return v;},groupIssues:function(d){var g={},e={};for(var i=0;i<d.length;i++){e=d[i];if(!g[e.ruleLibName]){g[e.ruleLibName]={};}if(!g[e.ruleLibName][e.ruleId]){g[e.ruleLibName][e.ruleId]=[];}g[e.ruleLibName][e.ruleId].push(e);}return g;},createIssueManagerFacade:function(r){return new c(r);}};var c=function(r){this.oRule=r;};c.prototype.addIssue=function(i){i.rule=this.oRule;if(!sap.ui.support.Severity[i.severity]){throw"The issue from rule "+this.oRule.title+" does not have proper severity defined. Allowed values can be found"+"in sap.ui.support.Severity";}if(!i.context||!i.context.id){throw"The issue from rule '"+this.oRule.title+"' should provide a context id.";}if(!i.details){throw"The issue from rule '"+this.oRule.title+"' should provide details for the generated issue.";}I.addIssue(i);};return I;},true);