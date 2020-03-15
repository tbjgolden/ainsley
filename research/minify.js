var AC = (function() {
  "use strict";
  function r(r, t) {
    return (
      (function(r) {
        if (Array.isArray(r)) return r;
      })(r) ||
      (function(r, t) {
        if (
          !(
            Symbol.iterator in Object(r) ||
            "[object Arguments]" === Object.prototype.toString.call(r)
          )
        )
          return;
        var n = [],
          a = !0,
          e = !1,
          o = void 0;
        try {
          for (
            var c, u = r[Symbol.iterator]();
            !(a = (c = u.next()).done) &&
            (n.push(c.value), !t || n.length !== t);
            a = !0
          );
        } catch (r) {
          (e = !0), (o = r);
        } finally {
          try {
            a || null == u.return || u.return();
          } finally {
            if (e) throw o;
          }
        }
        return n;
      })(r, t) ||
      (function() {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      })()
    );
  }
  function t(r) {
    return (
      (function(r) {
        if (Array.isArray(r)) {
          for (var t = 0, n = new Array(r.length); t < r.length; t++)
            n[t] = r[t];
          return n;
        }
      })(r) ||
      (function(r) {
        if (
          Symbol.iterator in Object(r) ||
          "[object Arguments]" === Object.prototype.toString.call(r)
        )
          return Array.from(r);
      })(r) ||
      (function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      })()
    );
  }
  var n = /\{[a-z]+\}/gi,
    a = function(r) {
      for (var n = [[]]; r.length; )
        n = r.shift().flatMap(function(r) {
          return n.map(function(n) {
            return [].concat(t(n), [r]);
          });
        });
      return n;
    },
    e = {
      flex: "fx",
      background: "bg",
      min: "n",
      max: "x",
      style: "st",
      overflow: "ov",
      cursor: "cu"
    },
    o = function(t) {
      var n = r(t, 2),
        a = n[0],
        o = n[1],
        c = a
          .split("-")
          .map(function(r) {
            return e[r] || r[0];
          })
          .join("");
      return o.map(function(r) {
        return [
          "".concat(c).concat(
            r
              .split(" ")
              .map(function(r) {
                return r[0].toUpperCase();
              })
              .join("")
          ),
          [[a, r]]
        ];
      });
    },
    c = function(e) {
      var c = [].concat(
        t(
          (e.defs || []).flatMap(function(o) {
            return (function(e, o) {
              var c = r(o, 2),
                u = c[0],
                i = c[1],
                f = [[], []],
                l = !0,
                p = !1,
                v = void 0;
              try {
                for (
                  var y, m = i[Symbol.iterator]();
                  !(l = (y = m.next()).done);
                  l = !0
                ) {
                  var s,
                    h,
                    d = r(y.value, 2),
                    b = d[0],
                    g = d[1],
                    j = b.match(n);
                  j && (s = f[0]).push.apply(s, t(j));
                  var w = g.match(n);
                  w && (h = f[1]).push.apply(h, t(w));
                }
              } catch (r) {
                (p = !0), (v = r);
              } finally {
                try {
                  l || null == m.return || m.return();
                } finally {
                  if (p) throw v;
                }
              }
              return a(
                f.flat().map(function(t) {
                  return Object.entries(e[t]).map(function(n) {
                    var a = r(n, 2),
                      e = a[0],
                      o = a[1];
                    return [t, e, o];
                  });
                })
              ).map(function(n) {
                for (
                  var a = [
                      u,
                      i.map(function(r) {
                        return t(r);
                      })
                    ],
                    e = 0;
                  a[0].includes("&");
                  e++
                )
                  a[0] = a[0].replace("&", n[e][1]);
                var o = !0,
                  c = !1,
                  f = void 0;
                try {
                  for (
                    var l, p = a[1][Symbol.iterator]();
                    !(o = (l = p.next()).done);
                    o = !0
                  )
                    for (
                      var v = l.value;
                      n.length > 0 && v[0].includes(n[0][0]);

                    ) {
                      var y = r(n.shift(), 3),
                        m = y[0],
                        s = y[2];
                      v[0] = v[0].replace(m, s);
                    }
                } catch (r) {
                  (c = !0), (f = r);
                } finally {
                  try {
                    o || null == p.return || p.return();
                  } finally {
                    if (c) throw f;
                  }
                }
                var h = !0,
                  d = !1,
                  b = void 0;
                try {
                  for (
                    var g, j = a[1][Symbol.iterator]();
                    !(h = (g = j.next()).done);
                    h = !0
                  )
                    for (
                      var w = g.value;
                      n.length > 0 && w[1].includes(n[0][0]);

                    ) {
                      var A = r(n.shift(), 3),
                        x = A[0],
                        S = A[2];
                      w[1] = w[1].replace(x, S);
                    }
                } catch (r) {
                  (d = !0), (b = r);
                } finally {
                  try {
                    h || null == j.return || j.return();
                  } finally {
                    if (d) throw b;
                  }
                }
                return a;
              });
            })(e, o);
          })
        ),
        t((e.props || []).flatMap(o)),
        t(e.raw || [])
      );
      return a(
        (e.mods || []).map(function(r) {
          return [["", ""]].concat(t(r));
        })
      ).flatMap(function(t) {
        return t.reduce(function(t, n) {
          var a = r(n, 2),
            e = a[0],
            o = a[1];
          return o
            ? "@" === o[0]
              ? [
                  [
                    o,
                    t.map(function(t) {
                      var n = r(t, 2),
                        a = n[0],
                        o = n[1];
                      return ["".concat(e).concat(a), o];
                    })
                  ]
                ]
              : t.map(function(t) {
                  var n = r(t, 2),
                    a = n[0],
                    c = n[1];
                  return [
                    ""
                      .concat(e)
                      .concat(a)
                      .concat(o),
                    c
                  ];
                })
            : t;
        }, c);
      });
    };
  return function(t) {
    return (function t(n) {
      return n
        .map(function(n) {
          var a = r(n, 2),
            e = a[0],
            o = a[1];
          return "@" === e[0]
            ? "".concat(e, "{").concat(t(o), "}")
            : ".".concat(e, "{").concat(
                o
                  .map(function(t) {
                    var n = r(t, 2),
                      a = n[0],
                      e = n[1];
                    return "".concat(a, ":").concat(e);
                  })
                  .join(";"),
                "}"
              );
        })
        .join("");
    })(c(t));
  };
})();
