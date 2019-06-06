(function(e, f) {
  var b = {};
  var g = function(a) {
    if (b[a]) {
      f.clearInterval(b[a]);
      b[a] = null;
    }
  };

  e.fn.waitUntilExists = function(s, h, o, c) {
    if (o == null || o == undefined) o = 0;
    var d = e(s);
    var k = d.not(function() {
      return e(this).data("waitUntilExists.found");
    });

    if (h === "remove") {
      g(s);
    } else {
      k.each(h).data("waitUntilExists.found", !0);
      if (o && d.length) {
        g(s);
      } else if (!c) {
        b[s] = f.setInterval(function() {
          console.log(s + " handler is running");
          d.waitUntilExists(s, h, o, !0);
        }, 500);
      }
    }
    return d;
  };
})(jQuery, window);
