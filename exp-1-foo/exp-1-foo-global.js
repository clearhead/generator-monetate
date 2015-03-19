/* _optimizely_evaluate=force */ /*global $*/
/*--------------------------------------------
 *
 *  test name: exp-1-foo
 *  test platform: optimizely

 *  author: tom@clearhead.me
 *  notes:
 *    - valid for: {{urls}}
 *    - assumes {{tbd}}
 *
 * ------------------------------------------*/
$['exp1'] = { id: 0123456789, cv: 0 };

// boilerplate templating, error reporting,
// log(string) ==> logs to console
// report(error||string) ==> event to ga
// htmlHereDoc(fn) ==> returns string from multiline comment function
// tmpl ==> handlebarsish / https://github.com/premasagar/tim
/*jshint ignore:start*/
$.extend($.exp1,{log:function(){try{window.console.log.apply(window.console,[].concat.apply(["exp1:"],arguments)),/chdebug/.test(location.href)}catch(e){}},report:function(e){var t="http://www.google-analytics.com/collect?",n=(new Date).getTime();try{n=/optimizelyEndUserId=([^;]+)/.exec(document.cookie)[1]}catch(e){}(new Image).src=t+$.map({v:1,tid:"UA-33947856-2",cid:n,t:"event",ec:location.hostname,ea:"exp1",el:e.toString(),z:(new Date).getTime()},function(e,t){return t+"="+encodeURIComponent(e)}).join("&")},html:function(e){return e.toString().replace(/[^]+\/\*|[^\S]+\*\/[^]+|\s+(?=<)|\n|\t|\r/g,"").replace(/>\s+/g,">")},tmpl:function(){var e=/{{\s*([a-z0-9_][\\.a-z0-9_]*)\s*}}/gi;return function(t,n){return t.replace(e,function(e,t){for(var o=t.split("."),c=o.length,i=n,r=0;c>r;r++){if(i=i[o[r]],void 0===i)throw"tim: '"+o[r]+"' not found in "+e;if(r===c-1)return i}})}}()}); // jshint ignore:line

/* _optimizely_evaluate=safe */
