var AC = (function() {
  "use strict";
  var n = /\{[a-z]+\}/gi,
    t = function(n) {
      return [].concat.apply([], n);
    },
    r = function(n) {
      for (var r = [[]]; n.length; )
        r = t(
          n.shift().map(function(n) {
            return r.map(function(t) {
              return t.concat([n]);
            });
          })
        );
      return r;
    },
    c = {
      flex: "fx",
      background: "bg",
      min: "n",
      max: "x",
      style: "st",
      overflow: "ov",
      cursor: "cu"
    },
    o = function(n) {
      var t = n[0]
        .split("-")
        .map(function(n) {
          return c[n] || n[0];
        })
        .join("");
      return n[1].map(function(r) {
        return [
          "".concat(t).concat(
            r
              .split(" ")
              .map(function(n) {
                return n[0].toUpperCase();
              })
              .join("")
          ),
          [[n[0], r]]
        ];
      });
    },
    a = function(c) {
      var a = [].concat(
        t(
          (c.defs || []).map(function(t) {
            return (function(t, c) {
              var o = [],
                a = [];
              return (
                c[1].forEach(function(t) {
                  (o = o.concat(t[0].match(n) || [])),
                    (a = a.concat(t[1].match(n) || []));
                }),
                r(
                  o.concat(a).map(function(n) {
                    return Object.keys(t[n]).map(function(r) {
                      return [n, r, t[n][r]];
                    });
                  })
                ).map(function(n) {
                  for (
                    var t = JSON.parse(JSON.stringify(c)), r = 0;
                    t[0].includes("&");
                    r++
                  )
                    t[0] = t[0].replace("&", n[r][1]);
                  for (var o = 0; o < t[1].length; o++)
                    for (
                      var a = t[1][o];
                      n.length > 0 && a[0].includes(n[0][0]);

                    ) {
                      var u = n.shift();
                      a[0] = a[0].replace(u[0], u[2]);
                    }
                  for (var e = 0; e < t[1].length; e++)
                    for (
                      var i = t[1][e];
                      n.length > 0 && i[1].includes(n[0][0]);

                    ) {
                      var f = n.shift();
                      i[1] = i[1].replace(f[0], f[2]);
                    }
                  return t;
                })
              );
            })(c, t);
          })
        ),
        t((c.props || []).map(o)),
        c.raw || []
      );
      return t(
        r(
          (c.mods || []).map(function(n) {
            return [["", ""]].concat(n);
          })
        ).map(function(n) {
          return n.reduce(function(n, t) {
            return t[1]
              ? "@" === t[1][0]
                ? [
                    [
                      t[1],
                      n.map(function(n) {
                        return ["".concat(t[0]).concat(n[0]), n[1]];
                      })
                    ]
                  ]
                : n.map(function(n) {
                    return [
                      ""
                        .concat(t[0])
                        .concat(n[0])
                        .concat(t[1]),
                      n[1]
                    ];
                  })
              : n;
          }, a);
        })
      );
    };
  return function(n) {
    return (function n(t) {
      return t
        .map(function(t) {
          return "@" === t[0][0]
            ? "".concat(t[0], "{").concat(n(t[1]), "}")
            : ".".concat(t[0], "{").concat(
                t[1]
                  .map(function(n) {
                    return n.join(":");
                  })
                  .join(";"),
                "}"
              );
        })
        .join("");
    })(a(n));
  };
})();
