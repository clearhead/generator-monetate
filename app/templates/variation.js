
document.documentElement.className += ' exp<%=idx%>';

(function poll() {
  var $ = window.jQuery;
  if ($ === undefined) return setTimeout(poll, 50);
  /*--------------------------------------------
   *
   *  test name: <%=name%>
   *  test platform: monetate
<%if(plan){%>   *  test plan: <%=plan%><%}%>
   *  author: <%=author%>
   *  notes:
   *    - valid for: {{urls}}
   *    - assumes {{tbd}}
   *
   * ------------------------------------------*/
  var self = window['exp<%=idx%>'] = {};

  log('init');

  $('html').addClass('exp<%=idx%>');

  var headline = 'New Headline';

  $('h1').before(html(function() {
    /*
      <div id="exp<%=idx%>">
        {{text}}
      </div>
    */
  }, {
    text: headline
  })());

  $('h2').each(function moveUp() {
    log('moved up');
    var $h1 = $('h1');
    if ($h1.length) {
      $(this).insertBefore($h1);
    } else {
      report('h1 not found');
    }
  });

  /*jshint latedef:false*/
  /*jshint ignore:start*/
  // log(string) ==> logs to console
  function log() {
    try {
      window.console.log.apply(window.console, [].concat.apply(["exp<%=idx%>:"], arguments)), /chdebug/
        .test(location.href)
    } catch (a) {}
  };
  // report(error||string) ==> event to ga
  function report(a) {
    var b = "http://www.google-analytics.com/collect?",
      d = (new Date).getTime();
    try {
      d = /mt\.v=([^;]+)/.exec(
        document.cookie)[1]
    } catch (a) {}(new Image).src = b + $.map({
        v: 1,
        tid: "UA-33947856-2",
        cid: d,
        t: "event",
        ec: location.hostname,
        ea: "exp<%=idx%>",
        el: a.toString(),
        z: (new Date).getTime()
      },
      function(a, b) {
        return b + "=" + encodeURIComponent(a)
      }).join("&")
  };
  // htmlHereDoc(fn) ==> returns string from multiline comment function
  function html(fn) {
    return fn.toString().replace(/[^]+\/\*|[^\S]+\*\/[^]+|\s+(?=<)|\n|\t|\r/g, '').replace(/>\s+/g, '>');
  };
  // tmpl ==> handlebarsish / https://github.com/premasagar/tim
  function tmpl() {
    var a = /{{\s*([a-z0-9_][\\.a-z0-9_]*)\s*}}/gi;
    return function(b, c) {
      return b.replace(a, function(a, b) {
        for (var d = b.split("."), e = d.length,
            f = c, g = 0; e > g; g++) {
          if (f = f[d[g]], void 0 === f) throw "tim: '" + d[g] +
            "' not found in " + a;
          if (g === e - 1) return f
        }
      })
    }
  }();
  /*jshint ignore:end*/
})();
