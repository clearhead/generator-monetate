
document.documentElement.className += ' exp<%=idx%>';

(function poll() {
  var $ = window.jQuery;
  if (!$) return setTimeout(poll, 50);
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

  $('h1').before(timpl(function() {
    /*
      <div id="exp<%=idx%>">
        {{text}}
      </div>
    */
  }, {
    text: headline
  }));

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
  function timpl() {
    'use strict';

    var reCommentContents = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)[ \t]*\*\//;
    var start = '{{',
      end = '}}',
      path = '[a-z0-9_$][\\.a-z0-9_]*', // e.g. config.person.name
      pattern = new RegExp(start + '\\s*(' + path + ')\\s*' + end, 'gi'),
      undef;

    function multiline(fn) {
      var match = reCommentContents.exec(fn.toString());
      if (!match) {
        throw new TypeError('Multiline comment missing.');
      }
      return match[1];
    }

    function tim(template, data) {
      // Merge data into the template string
      return template.replace(pattern, function(tag, token) {
        var path = token.split('.'),
          len = path.length,
          lookup = data,
          i = 0;

        for (; i < len; i++) {
          lookup = lookup[path[i]];

          // Property not found
          if (lookup === undef) {
            throw 'tim: "' + path[i] + '" not found in ' + tag;
          }

          // Return the required value
          if (i === len - 1) {
            return lookup;
          }
        }
      });
    }

    return tim(
      input.call ? multiline(input) : input,
      data || {}
    ).replace(/^\s+|\s+$/g,''); // trim

  }
  /*jshint ignore:end*/
})();
