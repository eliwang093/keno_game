var $jscomp = {
    scope: {}, checkStringArgs: function (a, c, b) {
        if (null == a) throw new TypeError("The 'this' value for String.prototype." + b + " must not be null or undefined");
        if (c instanceof RegExp) throw new TypeError("First argument to String.prototype." + b + " must not be a regular expression");
        return a + ""
    }
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, b) {
    if (b.get || b.set) throw new TypeError("ES3 does not support getters and setters.");
    a != Array.prototype && a != Object.prototype && (a[c] = b.value)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, c, b, d) {
    if (c) {
        b = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in b || (b[e] = {});
            b = b[e]
        }
        a = a[a.length - 1];
        d = b[a];
        c = c(d);
        c != d && null != c && $jscomp.defineProperty(b, a, {configurable: !0, writable: !0, value: c})
    }
};
$jscomp.polyfill("String.prototype.repeat", function (a) {
    return a ? a : function (a) {
        var b = $jscomp.checkStringArgs(this, null, "repeat");
        if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value");
        a |= 0;
        for (var c = ""; a;) if (a & 1 && (c += b), a >>>= 1) b += b;
        return c
    }
}, "es6-impl", "es3");
var TWEEN = TWEEN || function () {
    var a = [];
    return {
        getAll: function () {
            return a
        }, removeAll: function () {
            a = []
        }, add: function (c) {
            a.push(c)
        }, remove: function (c) {
            c = a.indexOf(c);
            -1 !== c && a.splice(c, 1)
        }, update: function (c, b) {
            if (0 === a.length) return !1;
            var d = 0;
            for (c = void 0 !== c ? c : TWEEN.now(); d < a.length;) a[d].update(c) || b ? d++ : a.splice(d, 1);
            return !0
        }
    }
}();
TWEEN.now = "undefined" === typeof window && "undefined" !== typeof process ? function () {
    var a = process.hrtime();
    return 1E3 * a[0] + a[1] / 1E6
} : "undefined" !== typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now.bind(window.performance) : void 0 !== Date.now ? Date.now : function () {
    return (new Date).getTime()
};
TWEEN.Tween = function (a) {
    var c = {}, b = {}, d = {}, e = 1E3, g = 0, h, z = !1, n = !1, t = 0, p = null, A = TWEEN.Easing.Linear.None,
        B = TWEEN.Interpolation.Linear, q = [], u = null, v = !1, w = null, x = null, y = null;
    this.to = function (a, c) {
        b = a;
        void 0 !== c && (e = c);
        return this
    };
    this.start = function (e) {
        TWEEN.add(this);
        n = !0;
        v = !1;
        p = void 0 !== e ? e : TWEEN.now();
        p += t;
        for (var f in b) {
            if (b[f] instanceof Array) {
                if (0 === b[f].length) continue;
                b[f] = [a[f]].concat(b[f])
            }
            void 0 !== a[f] && (c[f] = a[f], !1 === c[f] instanceof Array && (c[f] *= 1), d[f] = c[f] || 0)
        }
        return this
    };
    this.stop =
        function () {
            if (!n) return this;
            TWEEN.remove(this);
            n = !1;
            null !== y && y.call(a, a);
            this.stopChainedTweens();
            return this
        };
    this.end = function () {
        this.update(p + e);
        return this
    };
    this.stopChainedTweens = function () {
        for (var a = 0, b = q.length; a < b; a++) q[a].stop()
    };
    this.delay = function (a) {
        t = a;
        return this
    };
    this.repeat = function (a) {
        g = a;
        return this
    };
    this.repeatDelay = function (a) {
        h = a;
        return this
    };
    this.yoyo = function (a) {
        z = a;
        return this
    };
    this.easing = function (a) {
        A = a;
        return this
    };
    this.interpolation = function (a) {
        B = a;
        return this
    };
    this.chain =
        function () {
            q = arguments;
            return this
        };
    this.onStart = function (a) {
        u = a;
        return this
    };
    this.onUpdate = function (a) {
        w = a;
        return this
    };
    this.onComplete = function (a) {
        x = a;
        return this
    };
    this.onStop = function (a) {
        y = a;
        return this
    };
    this.update = function (l) {
        var f, m, r;
        if (l < p) return !0;
        !1 === v && (null !== u && u.call(a, a), v = !0);
        m = (l - p) / e;
        m = 1 < m ? 1 : m;
        r = A(m);
        for (f in b) if (void 0 !== c[f]) {
            var n = c[f] || 0, k = b[f];
            k instanceof Array ? a[f] = B(k, r) : ("string" === typeof k && (k = "+" === k.charAt(0) || "-" === k.charAt(0) ? n + parseFloat(k) : parseFloat(k)), "number" ===
            typeof k && (a[f] = n + (k - n) * r))
        }
        null !== w && w.call(a, r);
        if (1 === m) if (0 < g) {
            isFinite(g) && g--;
            for (f in d) "string" === typeof b[f] && (d[f] += parseFloat(b[f])), z && (m = d[f], d[f] = b[f], b[f] = m), c[f] = d[f];
            p = void 0 !== h ? l + h : l + t
        } else {
            null !== x && x.call(a, a);
            l = 0;
            for (f = q.length; l < f; l++) q[l].start(p + e);
            return !1
        }
        return !0
    }
};
TWEEN.Easing = {
    Linear: {
        None: function (a) {
            return a
        }
    }, Quadratic: {
        In: function (a) {
            return a * a
        }, Out: function (a) {
            return a * (2 - a)
        }, InOut: function (a) {
            return 1 > (a *= 2) ? .5 * a * a : -.5 * (--a * (a - 2) - 1)
        }
    }, Cubic: {
        In: function (a) {
            return a * a * a
        }, Out: function (a) {
            return --a * a * a + 1
        }, InOut: function (a) {
            return 1 > (a *= 2) ? .5 * a * a * a : .5 * ((a -= 2) * a * a + 2)
        }
    }, Quartic: {
        In: function (a) {
            return a * a * a * a
        }, Out: function (a) {
            return 1 - --a * a * a * a
        }, InOut: function (a) {
            return 1 > (a *= 2) ? .5 * a * a * a * a : -.5 * ((a -= 2) * a * a * a - 2)
        }
    }, Quintic: {
        In: function (a) {
            return a * a * a * a * a
        }, Out: function (a) {
            return --a *
                a * a * a * a + 1
        }, InOut: function (a) {
            return 1 > (a *= 2) ? .5 * a * a * a * a * a : .5 * ((a -= 2) * a * a * a * a + 2)
        }
    }, Sinusoidal: {
        In: function (a) {
            return 1 - Math.cos(a * Math.PI / 2)
        }, Out: function (a) {
            return Math.sin(a * Math.PI / 2)
        }, InOut: function (a) {
            return .5 * (1 - Math.cos(Math.PI * a))
        }
    }, Exponential: {
        In: function (a) {
            return 0 === a ? 0 : Math.pow(1024, a - 1)
        }, Out: function (a) {
            return 1 === a ? 1 : 1 - Math.pow(2, -10 * a)
        }, InOut: function (a) {
            return 0 === a ? 0 : 1 === a ? 1 : 1 > (a *= 2) ? .5 * Math.pow(1024, a - 1) : .5 * (-Math.pow(2, -10 * (a - 1)) + 2)
        }
    }, Circular: {
        In: function (a) {
            return 1 - Math.sqrt(1 -
                a * a)
        }, Out: function (a) {
            return Math.sqrt(1 - --a * a)
        }, InOut: function (a) {
            return 1 > (a *= 2) ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        }
    }, Elastic: {
        In: function (a) {
            return 0 === a ? 0 : 1 === a ? 1 : -Math.pow(2, 10 * (a - 1)) * Math.sin(5 * (a - 1.1) * Math.PI)
        }, Out: function (a) {
            return 0 === a ? 0 : 1 === a ? 1 : Math.pow(2, -10 * a) * Math.sin(5 * (a - .1) * Math.PI) + 1
        }, InOut: function (a) {
            if (0 === a) return 0;
            if (1 === a) return 1;
            a *= 2;
            return 1 > a ? -.5 * Math.pow(2, 10 * (a - 1)) * Math.sin(5 * (a - 1.1) * Math.PI) : .5 * Math.pow(2, -10 * (a - 1)) * Math.sin(5 * (a - 1.1) * Math.PI) +
                1
        }
    }, Back: {
        In: function (a) {
            return a * a * (2.70158 * a - 1.70158)
        }, Out: function (a) {
            return --a * a * (2.70158 * a + 1.70158) + 1
        }, InOut: function (a) {
            return 1 > (a *= 2) ? .5 * a * a * (3.5949095 * a - 2.5949095) : .5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2)
        }
    }, Bounce: {
        In: function (a) {
            return 1 - TWEEN.Easing.Bounce.Out(1 - a)
        }, Out: function (a) {
            return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
        }, InOut: function (a) {
            return .5 > a ? .5 * TWEEN.Easing.Bounce.In(2 * a) : .5 * TWEEN.Easing.Bounce.Out(2 *
                a - 1) + .5
        }
    }
};
TWEEN.Interpolation = {
    Linear: function (a, c) {
        var b = a.length - 1, d = b * c, e = Math.floor(d), g = TWEEN.Interpolation.Utils.Linear;
        return 0 > c ? g(a[0], a[1], d) : 1 < c ? g(a[b], a[b - 1], b - d) : g(a[e], a[e + 1 > b ? b : e + 1], d - e)
    }, Bezier: function (a, c) {
        for (var b = 0, d = a.length - 1, e = Math.pow, g = TWEEN.Interpolation.Utils.Bernstein, h = 0; h <= d; h++) b += e(1 - c, d - h) * e(c, h) * a[h] * g(d, h);
        return b
    }, CatmullRom: function (a, c) {
        var b = a.length - 1, d = b * c, e = Math.floor(d), g = TWEEN.Interpolation.Utils.CatmullRom;
        return a[0] === a[b] ? (0 > c && (e = Math.floor(d = b * (1 + c))), g(a[(e -
            1 + b) % b], a[e], a[(e + 1) % b], a[(e + 2) % b], d - e)) : 0 > c ? a[0] - (g(a[0], a[0], a[1], a[1], -d) - a[0]) : 1 < c ? a[b] - (g(a[b], a[b], a[b - 1], a[b - 1], d - b) - a[b]) : g(a[e ? e - 1 : 0], a[e], a[b < e + 1 ? b : e + 1], a[b < e + 2 ? b : e + 2], d - e)
    }, Utils: {
        Linear: function (a, c, b) {
            return (c - a) * b + a
        }, Bernstein: function (a, c) {
            var b = TWEEN.Interpolation.Utils.Factorial;
            return b(a) / b(c) / b(a - c)
        }, Factorial: function () {
            var a = [1];
            return function (c) {
                var b = 1;
                if (a[c]) return a[c];
                for (var d = c; 1 < d; d--) b *= d;
                return a[c] = b
            }
        }(), CatmullRom: function (a, c, b, d, e) {
            a = .5 * (b - a);
            d = .5 * (d - c);
            var g =
                e * e;
            return (2 * c - 2 * b + a + d) * e * g + (-3 * c + 3 * b - 2 * a - d) * g + a * e + c
        }
    }
};
(function (a) {
    "function" === typeof define && define.amd ? define([], function () {
        return TWEEN
    }) : "undefined" !== typeof module && "object" === typeof exports ? module.exports = TWEEN : void 0 !== a && (a.TWEEN = TWEEN)
})(this);
