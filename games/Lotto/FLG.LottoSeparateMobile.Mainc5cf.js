var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (a) {
    var c = 0;
    return function () {
        return c < a.length ? {done: !1, value: a[c++]} : {done: !0}
    }
};
$jscomp.arrayIterator = function (a) {
    return {next: $jscomp.arrayIteratorImpl(a)}
};
$jscomp.makeIterator = function (a) {
    var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return c ? c.call(a) : $jscomp.arrayIterator(a)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, h) {
    a != Array.prototype && a != Object.prototype && (a[c] = h.value)
};
$jscomp.polyfill = function (a, c, h, t) {
    if (c) {
        h = $jscomp.global;
        a = a.split(".");
        for (t = 0; t < a.length - 1; t++) {
            var n = a[t];
            n in h || (h[n] = {});
            h = h[n]
        }
        a = a[a.length - 1];
        t = h[a];
        c = c(t);
        c != t && null != c && $jscomp.defineProperty(h, a, {configurable: !0, writable: !0, value: c})
    }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function (a) {
    function c() {
        this.batch_ = null
    }

    function h(a) {
        return a instanceof n ? a : new n(function (c, r) {
            c(a)
        })
    }

    if (a && !$jscomp.FORCE_POLYFILL_PROMISE) return a;
    c.prototype.asyncExecute = function (a) {
        if (null == this.batch_) {
            this.batch_ = [];
            var c = this;
            this.asyncExecuteFunction(function () {
                c.executeBatch_()
            })
        }
        this.batch_.push(a)
    };
    var t = $jscomp.global.setTimeout;
    c.prototype.asyncExecuteFunction = function (a) {
        t(a, 0)
    };
    c.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length;) {
            var a =
                this.batch_;
            this.batch_ = [];
            for (var c = 0; c < a.length; ++c) {
                var h = a[c];
                a[c] = null;
                try {
                    h()
                } catch (A) {
                    this.asyncThrow_(A)
                }
            }
        }
        this.batch_ = null
    };
    c.prototype.asyncThrow_ = function (a) {
        this.asyncExecuteFunction(function () {
            throw a;
        })
    };
    var n = function (a) {
        this.state_ = 0;
        this.result_ = void 0;
        this.onSettledCallbacks_ = [];
        var c = this.createResolveAndReject_();
        try {
            a(c.resolve, c.reject)
        } catch (B) {
            c.reject(B)
        }
    };
    n.prototype.createResolveAndReject_ = function () {
        function a(a) {
            return function (r) {
                h || (h = !0, a.call(c, r))
            }
        }

        var c = this, h = !1;
        return {resolve: a(this.resolveTo_), reject: a(this.reject_)}
    };
    n.prototype.resolveTo_ = function (a) {
        if (a === this) this.reject_(new TypeError("A Promise cannot resolve to itself")); else if (a instanceof n) this.settleSameAsPromise_(a); else {
            a:switch (typeof a) {
                case "object":
                    var c = null != a;
                    break a;
                case "function":
                    c = !0;
                    break a;
                default:
                    c = !1
            }
            c ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a)
        }
    };
    n.prototype.resolveToNonPromiseObj_ = function (a) {
        var c = void 0;
        try {
            c = a.then
        } catch (B) {
            this.reject_(B);
            return
        }
        "function" == typeof c ?
            this.settleSameAsThenable_(c, a) : this.fulfill_(a)
    };
    n.prototype.reject_ = function (a) {
        this.settle_(2, a)
    };
    n.prototype.fulfill_ = function (a) {
        this.settle_(1, a)
    };
    n.prototype.settle_ = function (a, c) {
        if (0 != this.state_) throw Error("Cannot settle(" + a + ", " + c + "): Promise already settled in state" + this.state_);
        this.state_ = a;
        this.result_ = c;
        this.executeOnSettledCallbacks_()
    };
    n.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
            for (var a = 0; a < this.onSettledCallbacks_.length; ++a) z.asyncExecute(this.onSettledCallbacks_[a]);
            this.onSettledCallbacks_ = null
        }
    };
    var z = new c;
    n.prototype.settleSameAsPromise_ = function (a) {
        var c = this.createResolveAndReject_();
        a.callWhenSettled_(c.resolve, c.reject)
    };
    n.prototype.settleSameAsThenable_ = function (a, c) {
        var h = this.createResolveAndReject_();
        try {
            a.call(c, h.resolve, h.reject)
        } catch (A) {
            h.reject(A)
        }
    };
    n.prototype.then = function (a, c) {
        function h(a, c) {
            return "function" == typeof a ? function (c) {
                try {
                    t(a(c))
                } catch (l) {
                    r(l)
                }
            } : c
        }

        var t, r, y = new n(function (a, c) {
            t = a;
            r = c
        });
        this.callWhenSettled_(h(a, t), h(c, r));
        return y
    };
    n.prototype.catch = function (a) {
        return this.then(void 0, a)
    };
    n.prototype.callWhenSettled_ = function (a, c) {
        function h() {
            switch (t.state_) {
                case 1:
                    a(t.result_);
                    break;
                case 2:
                    c(t.result_);
                    break;
                default:
                    throw Error("Unexpected state: " + t.state_);
            }
        }

        var t = this;
        null == this.onSettledCallbacks_ ? z.asyncExecute(h) : this.onSettledCallbacks_.push(h)
    };
    n.resolve = h;
    n.reject = function (a) {
        return new n(function (c, h) {
            h(a)
        })
    };
    n.race = function (a) {
        return new n(function (c, t) {
            for (var n = $jscomp.makeIterator(a), r = n.next(); !r.done; r = n.next()) h(r.value).callWhenSettled_(c,
                t)
        })
    };
    n.all = function (a) {
        var c = $jscomp.makeIterator(a), t = c.next();
        return t.done ? h([]) : new n(function (a, n) {
            function r(c) {
                return function (h) {
                    B[c] = h;
                    y--;
                    0 == y && a(B)
                }
            }

            var B = [], y = 0;
            do B.push(void 0), y++, h(t.value).callWhenSettled_(r(B.length - 1), n), t = c.next(); while (!t.done)
        })
    };
    return n
}, "es6", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {
    };
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function () {
    var a = 0;
    return function (c) {
        return $jscomp.SYMBOL_PREFIX + (c || "") + a++
    }
}();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        }
    });
    $jscomp.initSymbolIterator = function () {
    }
};
$jscomp.initSymbolAsyncIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.asyncIterator;
    a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function () {
    }
};
$jscomp.iteratorPrototype = function (a) {
    $jscomp.initSymbolIterator();
    a = {next: a};
    a[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return a
};
$jscomp.underscoreProtoCanBeSet = function () {
    var a = {a: !0}, c = {};
    try {
        return c.__proto__ = a, c.a
    } catch (h) {
    }
    return !1
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function (a, c) {
    a.__proto__ = c;
    if (a.__proto__ !== c) throw new TypeError(a + " is not extensible");
    return a
} : null;
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function (a) {
    if (!(a instanceof Object)) throw new TypeError("Iterator result " + a + " is not an object");
};
$jscomp.generator.Context = function () {
    this.isRunning_ = !1;
    this.yieldAllIterator_ = null;
    this.yieldResult = void 0;
    this.nextAddress = 1;
    this.finallyAddress_ = this.catchAddress_ = 0;
    this.finallyContexts_ = this.abruptCompletion_ = null
};
$jscomp.generator.Context.prototype.start_ = function () {
    if (this.isRunning_) throw new TypeError("Generator is already running");
    this.isRunning_ = !0
};
$jscomp.generator.Context.prototype.stop_ = function () {
    this.isRunning_ = !1
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function () {
    this.nextAddress = this.catchAddress_ || this.finallyAddress_
};
$jscomp.generator.Context.prototype.next_ = function (a) {
    this.yieldResult = a
};
$jscomp.generator.Context.prototype.throw_ = function (a) {
    this.abruptCompletion_ = {exception: a, isException: !0};
    this.jumpToErrorHandler_()
};
$jscomp.generator.Context.prototype.return = function (a) {
    this.abruptCompletion_ = {return: a};
    this.nextAddress = this.finallyAddress_
};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function (a) {
    this.abruptCompletion_ = {jumpTo: a};
    this.nextAddress = this.finallyAddress_
};
$jscomp.generator.Context.prototype.yield = function (a, c) {
    this.nextAddress = c;
    return {value: a}
};
$jscomp.generator.Context.prototype.yieldAll = function (a, c) {
    a = $jscomp.makeIterator(a);
    var h = a.next();
    $jscomp.generator.ensureIteratorResultIsObject_(h);
    if (h.done) this.yieldResult = h.value, this.nextAddress = c; else return this.yieldAllIterator_ = a, this.yield(h.value, c)
};
$jscomp.generator.Context.prototype.jumpTo = function (a) {
    this.nextAddress = a
};
$jscomp.generator.Context.prototype.jumpToEnd = function () {
    this.nextAddress = 0
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function (a, c) {
    this.catchAddress_ = a;
    void 0 != c && (this.finallyAddress_ = c)
};
$jscomp.generator.Context.prototype.setFinallyBlock = function (a) {
    this.catchAddress_ = 0;
    this.finallyAddress_ = a || 0
};
$jscomp.generator.Context.prototype.leaveTryBlock = function (a, c) {
    this.nextAddress = a;
    this.catchAddress_ = c || 0
};
$jscomp.generator.Context.prototype.enterCatchBlock = function (a) {
    this.catchAddress_ = a || 0;
    a = this.abruptCompletion_.exception;
    this.abruptCompletion_ = null;
    return a
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function (a, c, h) {
    h ? this.finallyContexts_[h] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
    this.catchAddress_ = a || 0;
    this.finallyAddress_ = c || 0
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function (a, c) {
    c = this.finallyContexts_.splice(c || 0)[0];
    if (c = this.abruptCompletion_ = this.abruptCompletion_ || c) {
        if (c.isException) return this.jumpToErrorHandler_();
        void 0 != c.jumpTo && this.finallyAddress_ < c.jumpTo ? (this.nextAddress = c.jumpTo, this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_
    } else this.nextAddress = a
};
$jscomp.generator.Context.prototype.forIn = function (a) {
    return new $jscomp.generator.Context.PropertyIterator(a)
};
$jscomp.generator.Context.PropertyIterator = function (a) {
    this.object_ = a;
    this.properties_ = [];
    for (var c in a) this.properties_.push(c);
    this.properties_.reverse()
};
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function () {
    for (; 0 < this.properties_.length;) {
        var a = this.properties_.pop();
        if (a in this.object_) return a
    }
    return null
};
$jscomp.generator.Engine_ = function (a) {
    this.context_ = new $jscomp.generator.Context;
    this.program_ = a
};
$jscomp.generator.Engine_.prototype.next_ = function (a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return this.yieldAllStep_(this.context_.yieldAllIterator_.next, a, this.context_.next_);
    this.context_.next_(a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.return_ = function (a) {
    this.context_.start_();
    var c = this.context_.yieldAllIterator_;
    if (c) return this.yieldAllStep_("return" in c ? c["return"] : function (a) {
        return {value: a, done: !0}
    }, a, this.context_.return);
    this.context_.return(a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.throw_ = function (a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"], a, this.context_.next_);
    this.context_.throw_(a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function (a, c, h) {
    try {
        var t = a.call(this.context_.yieldAllIterator_, c);
        $jscomp.generator.ensureIteratorResultIsObject_(t);
        if (!t.done) return this.context_.stop_(), t;
        var n = t.value
    } catch (z) {
        return this.context_.yieldAllIterator_ = null, this.context_.throw_(z), this.nextStep_()
    }
    this.context_.yieldAllIterator_ = null;
    h.call(this.context_, n);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.nextStep_ = function () {
    for (; this.context_.nextAddress;) try {
        var a = this.program_(this.context_);
        if (a) return this.context_.stop_(), {value: a.value, done: !1}
    } catch (c) {
        this.context_.yieldResult = void 0, this.context_.throw_(c)
    }
    this.context_.stop_();
    if (this.context_.abruptCompletion_) {
        a = this.context_.abruptCompletion_;
        this.context_.abruptCompletion_ = null;
        if (a.isException) throw a.exception;
        return {value: a.return, done: !0}
    }
    return {value: void 0, done: !0}
};
$jscomp.generator.Generator_ = function (a) {
    this.next = function (c) {
        return a.next_(c)
    };
    this.throw = function (c) {
        return a.throw_(c)
    };
    this.return = function (c) {
        return a.return_(c)
    };
    $jscomp.initSymbolIterator();
    this[Symbol.iterator] = function () {
        return this
    }
};
$jscomp.generator.createGenerator = function (a, c) {
    c = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(c));
    $jscomp.setPrototypeOf && $jscomp.setPrototypeOf(c, a.prototype);
    return c
};
$jscomp.asyncExecutePromiseGenerator = function (a) {
    function c(c) {
        return a.next(c)
    }

    function h(c) {
        return a.throw(c)
    }

    return new Promise(function (t, n) {
        function z(a) {
            a.done ? t(a.value) : Promise.resolve(a.value).then(c, h).then(z, n)
        }

        z(a.next())
    })
};
$jscomp.asyncExecutePromiseGeneratorFunction = function (a) {
    return $jscomp.asyncExecutePromiseGenerator(a())
};
$jscomp.asyncExecutePromiseGeneratorProgram = function (a) {
    return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)))
};
$jscomp.polyfill("Object.is", function (a) {
    return a ? a : function (a, h) {
        return a === h ? 0 !== a || 1 / a === 1 / h : a !== a && h !== h
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function (a) {
    return a ? a : function (a, h) {
        var c = this;
        c instanceof String && (c = String(c));
        var n = c.length;
        h = h || 0;
        for (0 > h && (h = Math.max(h + n, 0)); h < n; h++) {
            var z = c[h];
            if (z === a || Object.is(z, a)) return !0
        }
        return !1
    }
}, "es7", "es3");
$jscomp.checkStringArgs = function (a, c, h) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + h + " must not be null or undefined");
    if (c instanceof RegExp) throw new TypeError("First argument to String.prototype." + h + " must not be a regular expression");
    return a + ""
};
$jscomp.polyfill("String.prototype.includes", function (a) {
    return a ? a : function (a, h) {
        return -1 !== $jscomp.checkStringArgs(this, a, "includes").indexOf(a, h || 0)
    }
}, "es6", "es3");
if ("undefined" === typeof localLanguage) {
    var detectLang = function (a, c) {
        for (var h in c) if (c[h] == a) return a;
        switch (a) {
            case "az":
            case "by":
            case "kg":
            case "kz":
                return "kz";
            case "md":
            case "ru":
            case "uz":
            case "tj":
            case "ua":
                return "ru";
            case "ar":
                return "ar";
            case "ku":
                return "ku";
            case "bo":
            case "cl":
            case "co":
            case "ec":
            case "sv":
            case "gq":
            case "gt":
            case "hn":
            case "mx":
            case "ni":
            case "es":
            case "pa":
            case "py":
            case "pe":
            case "ve":
            case "uy":
                return "es";
            default:
                return "en"
        }
    };
    window.localLanguage = function () {
        if (localStorage.language) return localStorage.language;
        var a = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase();
        return detectLang(a, mainLocalizator.getLangs())
    }
}

function LottoNewAppObjMobile(a, c) {
    this.destroy = function () {
        r.destroy();
        r = null;
        y.destroy();
        y = null;
        n.destroy();
        n = null;
        z.destroy();
        z = null;
        t.destroy();
        t = null;
        h.mainSoundManager.destroy();
        for (var a in h) h[a] = null;
        h = null
    };
    var h = this;
    this.gameDir = FLGUtils.staticRootPath + "games/Lotto/resources/";
    this.gameDirMobile = FLGUtils.staticRootPath + "games/Lotto/resources/mobile/";
    this.gameConfig = a;
    this.configType = c;
    var t = new FLGRenderer(1920, 1080, a[c].canvasId, "center");
    this.mainRenderer = t;
    this.mainSoundManager = new SoundManager(h.gameConfig[h.configType].gameKind,
        h.gameConfig[h.configType].gameType, h.gameConfig[h.configType].gameVariant);
    var n = new FLGAccount(a[c].canvasId, h.mainSoundManager, h.mainRenderer);
    this.mainFLGAccount = n;
    var z = new gameManagerLottoNew(this);
    this.mainGameManager = z;
    var r = new UIManagerLottoNewMobile(this);
    this.mainUIManager = r;
    var y;
    this.setMainGrid = function (a) {
        y = a;
        h.mainGrid = y
    }
}

function UIManagerLottoNewMobile(a) {
    function c(f, d, c, g, h) {
        this.destroy = function () {
            u = e = k = b = null;
            clearTimeout(l);
            clearTimeout(ca);
            q = D = null;
            for (var a in p) p[a] = null;
            p = null
        };
        var p = this, b = {font: "bold 35px Arial", fill: "#000000", align: "center"}, k = 0, l, ca,
            e = new PIXI.Container;
        g ? g.addChild(e) : a.mainRenderer.stage.addChild(e);
        var u = function (d, f, c, u, p) {
            e.children[p] ? (e.children[p].visible = !0, e.children[p].children[0].text = u) : a.mainRenderer.createButton(e, d, f, "ball", {
                text: u,
                align: "center",
                style: b
            }).scale.set(c,
                c);
            h && !e.children[p].isRotated && (e.children[p].position.x = d + 980, e.children[p].children[0].rotation = 8 * Math.PI, e.children[p].isRotated = !0, a.mainUIManager.animations()["rotation_ball" + p] && (a.mainUIManager.animations()["rotation_ball" + p].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["rotation_ball" + p] = (new TWEEN.Tween({
                rotation: e.children[p].children[0].rotation,
                position: e.children[p].position.x
            })).to({
                rotation: 0,
                position: d
            }, 990).easing(TWEEN.Easing.Cubic.Out).onUpdate(function () {
                e.children[p].children[0].rotation = this.rotation;
                e.children[p].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["rotation_ball" + p] = null;
                a.mainSoundManager.playSound("ball")
            }).start())
        }, D = function (a, e, b, p) {
            function D() {
                u(f + c * k, d, e, a[k], k);
                k++;
                k < a.length ? 0 == b || void 0 == b ? D() : l = setTimeout(D, b) : k = 0
            }

            void 0 != a && a.length && (p ? u(f + c * p, d, e, a[p], p) : D())
        };
        this.startDrawBalls =
            D;
        var q = function () {
            for (var b = 0; b < e.children.length; b++) h ? (e.children[b].isRotated = !1, a.mainUIManager.animations()["remove_ball" + b] && (a.mainUIManager.animations()["remove_ball" + b].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["remove_ball" + b] = (new TWEEN.Tween({
                rotation: e.children[b].children[0].rotation,
                position: e.children[b].position.x,
                index: b
            })).to({
                rotation: 6 * Math.PI,
                position: e.children[b].position.x + 980
            }, 990).easing(TWEEN.Easing.Cubic.In).onUpdate(function () {
                e.children[this.index].children[0].rotation =
                    this.rotation;
                e.children[this.index].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["remove_ball" + this.index] = null;
                e.children[this.index].visible = !1
            }).start()) : e.children[b].visible = !1
        };
        this.removeBalls = q
    }

    function h(f) {
        this.destroy = function () {
            for (var a = 0; a < c.length; a++) {
                for (var e in c[a]) c[a][e] = null;
                c[a] = null
            }
            m = l = k = h = g = c = null;
            for (a in d) d[a] = null;
            d = null
        };
        var d = this, c = [];
        this.bets = c;
        var g = 0, h = 0;
        this.setTotalWin = function (a) {
            if (!arguments.length) return h;
            a && (h = a)
        };
        this.getTotalBet = function () {
            return g
        };
        var k = null;
        this.parentEditions = function (a) {
            if (!arguments.length) return k;
            k = a;
            l = k.betsHistoryContainer()
        };
        if (f.length) for (var b = 0; b < f.length; b++) f[b].summ && (g += f[b].summ), f[b].win && (h += f[b].win), c.push({
            summ: f[b].summ,
            bet: f[b].bet,
            coef: f[b].coef,
            winBets: f[b].winBets,
            countWin: f[b].countWin,
            win: f[b].win,
            code: f[b].code,
            id: f[b].id
        });
        this.addBet = function (b, e, d) {
            e += 1;
            100 <= c.length ? (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g,
                100)), d && d(void 0)) : (b.length && 100 < c.length + b.length && (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), b = b.slice(0, b.length - (c.length + b.length - 100))), a.mainFLGAccount.placeBet(b, e, a.gameConfig[a.configType], function (e, f, u) {
                if (void 0 == e) d && d(void 0); else {
                    if (u) {
                        u.notAll && a.mainRenderer.logService.log(mainLocalizationTable.betError);
                        for (e = 0; e < u.srvBets.length; e++) c.push({
                            summ: u.srvBets[e].summ,
                            bet: u.srvBets[e].bet,
                            coef: u.srvBets[e].coef,
                            winBets: u.srvBets[e].winBets,
                            countWin: u.srvBets[e].countWin,
                            win: u.srvBets[e].win,
                            code: u.srvBets[e].code,
                            id: u.srvBets[e].id
                        });
                        d && (d(u.srvBets), k.events.emit("EDITIONS_CHANGE"))
                    } else c.push({
                        summ: b.summ,
                        bet: b.bet,
                        coef: b.coef,
                        winBets: b.winBets,
                        countWin: b.countWin,
                        win: b.win,
                        code: e,
                        id: f
                    }), d && (d(c[c.length - 1]), k.events.emit("EDITIONS_CHANGE"));
                    g = a.mainFLGAccount.totalBet();
                    m();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }, a.gameConfig[a.configType].gameNum))
        };
        var l, m = function () {
            var b = 0 != l.children.length;
            l.parent.children[9].children[0].children[0].text =
                0 < c.length ? mainLocalizationTable.coupon.toUpperCase() + " (" + c.length + ")" : mainLocalizationTable.coupon.toUpperCase();
            if (b) l.parent.children[2].children[1].children[0].text = 0 !== g ? formatFLGNums(g, !1) : "", l.parent.children[2].children[2].children[0].text = 0 !== h ? formatFLGNums(h, !1) : ""; else for (b = 0; 10 > b; b++) {
                var e = b & 1 ? "atlas%Jtable-odd-line-mobile" : "atlas%Jtable-even-line-mobile";
                e = new a.mainRenderer.createButton(l, 0, 127 + 49 * b, e);
                e.anchor.y = .5;
                e.name = "row_" + b
            }
            var d;
            for (b = 0; l.getChildByName("row_" + b); b++) if (e =
                l.getChildByName("row_" + b)) {
                for (var f = 0; e.getChildByName("rect" + b + "_" + f); f++) {
                    var q = e.getChildByName("rect" + b + "_" + f);
                    q.visible = !1;
                    q.getChildByName("sortedBet" + b + "_" + f).visible = !1
                }
                if (q = e.getChildByName("summ" + b)) q.visible = !1, e.getChildByName("coefMode" + b).visible = !1, e.getChildByName("coef" + b).visible = !1, e.getChildByName("win" + b).visible = !1;
                9 < b && (e.visible = !1)
            }
            if (!(0 >= c.length)) {
                b = 0;
                for (var p = c.length - 1; b < c.length; b++, p--) {
                    var m = c[p].bet.slice();
                    m.sort(a.mainGameManager.sortNumeric);
                    (e = l.getChildByName("row_" +
                        b)) ? e.visible = !0 : (e = b & 1 ? "atlas%Jtable-odd-line-mobile" : "atlas%Jtable-even-line-mobile", e = new a.mainRenderer.createButton(l, 0, 127 + 49 * b, e), e.anchor.y = .5, e.name = "row_" + b);
                    for (f = 0; f < m.length; f++) {
                        var G = (d = -1 < c[p].winBets.indexOf(m[f])) ? 16773632 : 0;
                        (q = e.getChildByName("rect" + b + "_" + f)) ? (q.clear(), q.beginFill(G), q.drawCircle(26 + 41 * f, 0, 20), q.endFill(), q.visible = !0, q = q.getChildByName("sortedBet" + b + "_" + f), q.children[0].style = d ? k.tableHistoryFont : k.tableHighlightFont, q.children[0].text = m[f], q.visible = !0) : (q =
                            new PIXI.Graphics, q.beginFill(G), q.drawCircle(26 + 41 * f, 0, 20), q.endFill(), q.name = "rect" + b + "_" + f, e.addChild(q), a.mainRenderer.createButton(q, 26 + 41 * f, 0, void 0, {
                            text: m[f],
                            align: "center",
                            style: d ? k.tableHistoryFont : k.tableHighlightFont
                        }).name = "sortedBet" + b + "_" + f)
                    }
                    d = void 0 != c[p].win ? formatFLGNums(c[p].win, !1) : "";
                    m = void 0 != c[p].countWin ? a.mainGameManager.coefficients[c[p].coef - 1][c[p].countWin] / 100 : "";
                    f = void 0 != c[p].win && 0 != c[p].win ? k.tableBoldFont : k.tableBetFont;
                    (q = e.getChildByName("summ" + b)) ? (q.children[0].style =
                        f, q.children[0].text = formatFLGNums(c[p].summ, !1), q.visible = !0, q = e.getChildByName("win" + b), q.children[0].style = f, q.children[0].text = d, q.visible = !0, d = e.getChildByName("coefMode" + b), d.children[0].style = f, d.children[0].text = c[p].coef, d.visible = !0, e = e.getChildByName("coef" + b), e.children[0].style = f, e.children[0].text = m, e.visible = !0) : (a.mainRenderer.createButton(e, 420, 0, void 0, {
                        text: formatFLGNums(c[p].summ, !1),
                        align: "left",
                        style: f
                    }).name = "summ" + b, a.mainRenderer.createButton(e, 325, 0, void 0, {
                        text: c[p].coef,
                        align: "center", style: f
                    }).name = "coefMode" + b, a.mainRenderer.createButton(e, 380, 0, void 0, {
                        text: m,
                        align: "center",
                        style: f
                    }).name = "coef" + b, a.mainRenderer.createButton(e, 555, 0, void 0, {
                        text: d,
                        align: "left",
                        style: f
                    }).name = "win" + b)
                }
            }
            l.emit("updateHeight")
        };
        this.redrawCurrentBets = m;
        this.calculateWin = function (b, e) {
            for (var d, f = 0; f < c.length; f++) {
                d = c[f].bet;
                for (var p = [], g = 0; g < d.length; g++) -1 < b.indexOf(d[g]) && p.push(d[g]);
                d = p;
                c[f].winBets = d;
                c[f].countWin = d.length;
                e && (c[f].win = c[f].summ * a.mainGameManager.coefficients[c[f].coef -
                1][c[f].countWin] / 100, h += c[f].win)
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        }
    }

    this.destroy = function () {
        clearTimeout(Z);
        clearTimeout(da);
        B = r = null;
        A.destroy();
        A = null;
        R.destroy();
        R = null;
        x && x.destroy();
        X = x = null;
        F.destroy();
        F = null;
        L.destroy();
        m = J = C = l = L = null;
        for (var f in g) {
            for (var d in g[f]) g[f][d] = null;
            g[f] = null
        }
        g = null;
        clearTimeout(ea);
        P = null;
        for (f in k) k[f] = null;
        S = T = M = N = aa = H = I = k = null;
        a.mainFLGAccount.events.off("onBet", U);
        a.mainFLGAccount.events.off("onBalance", V);
        V = U = null;
        a.mainRenderer.stage.off("changeLang",
            W);
        W = null;
        n.off("visibleChange", z);
        z = n = null;
        Q.destroy();
        K = Q = null;
        v.destroy();
        v = null;
        for (f in t) t[f] = null;
        t = null
    };
    var t = this, n = $("#" + a.gameConfig[a.configType].canvasId).parent(), z = function (f, d) {
        a.mainRenderer.stage.visible = d == a.gameConfig[a.configType].canvasId;
        a.mainRenderer.StartStopAnimation(a.mainRenderer.stage.visible)
    };
    n.on("visibleChange", z);
    for (var r = clientInfoGlobal.coin7.split("-"), y = 0; y < r.length; y++) r[y] /= 100;
    var B = 2 * parseInt(r[r.length - 1], 10);
    r.push("MAX\n" + B);
    y = (y = localStorage.getItem(a.gameConfig[a.configType].gameKind +
        a.gameConfig[a.configType].gameType + "defaultBet")) && 0 <= r.indexOf(parseInt(y)) ? JSON.parse(y) : r[1];
    var A = new betsControls(r[0], r[r.length - 1], y, r, function (f) {
        a.mainFLGAccount.balance() < B && (B = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return B
    });
    this.betsControls = A;
    var R = new FLGTimer, x, X = .1, F = new FLGJackpot(a.mainRenderer, {tirTimeOffset: X, updateInterval: 900}), L,
        l = new PIXI.Container, C = new PIXI.Container, m = new PIXI.Container, J = new PIXI.Container,
        ba = new PIXI.Container, E =
            new PIXI.Container, w = [new PIXI.Container, new PIXI.Container, new PIXI.Container], g = {
            game: {
                text: mainLocalizationTable.game.toUpperCase(),
                posX: 385,
                posY: 561,
                pressedDefault: !0,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            rules: {
                text: mainLocalizationTable.rules.toUpperCase(),
                posX: 25,
                posY: 561,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            history: {
                text: mainLocalizationTable.history.toUpperCase(),
                posX: 385,
                posY: 295,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            stats: {
                text: mainLocalizationTable.stats.toUpperCase(),
                posX: 25,
                posY: 295,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            info: {
                text: mainLocalizationTable.coef.toUpperCase(),
                posX: 25,
                posY: 428,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            video: {
                text: mainLocalizationTable.video.toUpperCase(), posX: 385, posY: 428, onStartOpen: function () {
                    x && (x.destroy(), x = null);
                    k.scale_video && k.scale_video.stop();
                    k.scale_video_open &&
                    k.scale_video_open.stop();
                    x = new FLGVideo(47, 380, 1078, 607, a.gameConfig[a.configType].canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" allowfullscreen="true" wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=0&amp;URL=' + a.gameConfig.videoURL + ';"> <param name="allowFullScreen" value="true"> <param name="movie" value="videoplayer.swf"> </object>',
                        '<video id="innerVideo' + a.gameConfig[a.configType].canvasId + '" autoplay muted playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + a.gameConfig[a.configType].videoMobileURL + '" type="application/x-mpegURL"></video>', void 0, a.mainSoundManager);
                    var f = navigator.userAgent || navigator.vendor || window.opera;
                    f.match(/Android/i) || x && x.setVisible(!0);
                    k.scale_video_open = (new TWEEN.Tween({scale: 0})).to({scale: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                        k.scale_video_open =
                            null;
                        x && x.setScale(1)
                    }).onUpdate(function () {
                        x && x.setScale(this.scale)
                    }).onComplete(function () {
                        k.scale_video_open = null
                    }).start();
                    k.video_rotate && k.video_rotate.stop();
                    var d = g.video.container;
                    if (d.getChildByName("video_load")) {
                        var c = d.getChildByName("video_load");
                        c.visible = !0
                    } else c = a.mainRenderer.createButton(d, 20, 65, "video_load"), c.anchor.set(.5, .5), c.scale.set(1.75, 1.75);
                    c && (a.mainRenderer.renderManager.animationTweenInc(), k.video_rotate = (new TWEEN.Tween(c)).to({rotation: 6 * Math.PI}, 3E3).easing(TWEEN.Easing.Linear.None).onStop(function () {
                        c.rotation =
                            0;
                        c.visible = !1;
                        a.mainRenderer.renderManager.animationTweenDec();
                        k.video_rotate = null
                    }).onComplete(function () {
                        f.match(/Android/i) && x && x.setVisible(!0);
                        c.rotation = 0;
                        c.visible = !1;
                        a.mainRenderer.renderManager.animationTweenDec();
                        k.video_rotate = null
                    }).start())
                }, onStopOpen: void 0, onStartClose: function () {
                    x && (k.scale_video_open && k.scale_video_open.stop(), k.scale_video && k.scale_video.stop(), k.video_rotate && k.video_rotate.stop(), k.scale_video = (new TWEEN.Tween({scale: 1})).to({scale: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                        k.scale_video =
                            null;
                        x && (x.setScale(0), x.destroy(), x = null)
                    }).onUpdate(function () {
                        x && x.setScale(this.scale)
                    }).onComplete(function () {
                        x && (x.setScale(0), x.destroy(), x = null);
                        k.scale_video = null
                    }).start())
                }, onStopClose: void 0
            }
        }, ea = 0, P, Q, K = {needShow: !0}, v = new function () {
            this.destroy = function () {
                for (var a = 0; a < d.length; a++) d[a].round = null, d[a].editionResult = null, d[a].betsHistory.destroy && d[a].betsHistory.destroy(), d[a].betsHistory = null, d[a] = null;
                t = n = m = l = k = p = d = null;
                b.destroy();
                b = null;
                A && (A.destroy(), A = null);
                v = null;
                e && (e.destroy(),
                    e = null);
                z = x = y = B = w = G = Y = r = D = u = q = null;
                f.events.removeAllListeners();
                for (a in f) f[a] = null;
                f = null
            };
            var f = this, d = [], p;
            this.editions = d;
            var k, l = new PIXI.Container, m = new PIXI.Container, b, n = new PIXI.Container, t = new PIXI.Container;
            t.name = "betCntnr";
            this.historyTable = function () {
                return k
            };
            this.betBGContainer = function () {
                return b.srcSprite
            };
            this.betsHistoryContainer = function () {
                return t
            };
            var v = .85, e, u = {font: "bold 42px Arial", fill: "#313131"};
            this.tableHeaderFont = u;
            var D = {font: "34px Arial", fill: "#403f3f"}, q = {
                font: "30px Arial Narrow",
                fill: "#000000"
            };
            this.tableHistoryFont = q;
            var r = {font: "30px Arial Narrow", fill: "#ffffff"};
            this.tableHighlightFont = r;
            var Y = {font: "bold 36px Arial", fill: "#000000"};
            this.tableBoldFont = Y;
            var G = {font: "34px Arial", fill: "#000000"};
            this.tableBetFont = G;
            this.getActedOutEdition = function () {
                for (var a = d.length - 1; 0 <= a; a--) if (void 0 == d[a].editionResult) return w(a), d[a];
                w(d.length - 1);
                return d[d.length - 1]
            };
            var w = function (b) {
                0 > b || b >= d.length || (p = b, void 0 != l && 0 < l.children.length && z(), void 0 != k && d[p].betsHistory.redrawCurrentBets(),
                    a.mainRenderer.renderManager.needUpdateRender = !0)
            }, B = function () {
                k = a.mainRenderer.createButton(ba, 1174, 218);
                for (var b = 0; b < d.length; b++) d[b].betsHistory.parentEditions(f);
                x();
                d.length && d[p].betsHistory.redrawCurrentBets();
                l.position.set(0, -380);
                g.stats.container.addChildAt(l, g.stats.container.children.length);
                a.mainRenderer.createButton(g.stats.container, 0, -240, void 0, {
                    text: mainLocalizationTable.ballHist.toUpperCase(),
                    align: "center",
                    style: {font: "bold 34px Arial", fill: "#ffffff", align: "center"}
                }).anchor.set(.5,
                    .5)
            };
            this.drawEditions = B;
            var y = function () {
                m.children[0] && m.children[1] ? (m.children[0].children[0].text = mainLocalizationTable.round, m.children[1].children[0].text = mainLocalizationTable.balls) : (a.mainRenderer.createButton(m, 19, 30, void 0, {
                    text: mainLocalizationTable.history.toUpperCase(),
                    align: "left",
                    style: u
                }), a.mainRenderer.createButton(m, 64, 78, void 0, {
                    text: mainLocalizationTable.round,
                    align: "center",
                    style: D
                }), a.mainRenderer.createButton(m, 161, 78, void 0, {
                    text: mainLocalizationTable.balls, align: "left",
                    style: D
                }))
            };
            this.redrawEditionHeader = y;
            var x = function () {
                if (n.children[0]) n.children[0].children[0].text = mainLocalizationTable.coupon.toUpperCase(), n.children[1].children[0].text = mainLocalizationTable.balls, n.children[2].children[0].text = mainLocalizationTable.totalBet, n.children[3].children[0].text = mainLocalizationTable.win, b.srcSprite.children[2].children[0].text = mainLocalizationTable.total.toUpperCase() + ":"; else {
                    b = new MaskedSprite(a.mainRenderer.createButton(k, 1, 172, "atlas%Jtable-bg-mobile"), {
                        mask: {
                            x: 1,
                            y: 172, width: 722, height: 445
                        }, needScrolling: {container: t, scrollbar: {topOffset: 104, botOffset: 48}}
                    }, a.mainRenderer.renderManager);
                    b.srcSprite.addChildAt(t, 0);
                    a.mainRenderer.createButton(b.srcSprite, 0, 396, "table_footer");
                    a.mainRenderer.createButton(b.srcSprite.children[2], 290, 24, void 0, {
                        text: mainLocalizationTable.total.toUpperCase() + ":",
                        align: "right",
                        style: {font: "34px Arial", fill: "#000000", align: "center"}
                    });
                    a.mainRenderer.createButton(b.srcSprite.children[2], 420, 24, void 0, {
                        text: "", align: "left", style: {
                            font: "34px Arial",
                            fill: "#000000", align: "center"
                        }
                    });
                    a.mainRenderer.createButton(b.srcSprite.children[2], 555, 24, void 0, {
                        text: "",
                        align: "left",
                        style: {font: "34px Arial", fill: "#000000", align: "center"}
                    });
                    var e = new PIXI.Graphics;
                    e.beginFill(16777215);
                    e.drawRect(300, 56, 2, 585);
                    e.alpha = .5;
                    e.name = "ballsSep";
                    e.endFill;
                    b.srcSprite.addChild(e);
                    e = new PIXI.Graphics;
                    e.beginFill(16777215);
                    e.drawRect(350, 56, 2, 573);
                    e.alpha = .5;
                    e.name = "modeSep";
                    e.endFill;
                    b.srcSprite.addChild(e);
                    e = new PIXI.Graphics;
                    e.beginFill(16777215);
                    e.drawRect(410, 56,
                        2, 573);
                    e.alpha = .5;
                    e.name = "coefSep";
                    e.endFill;
                    b.srcSprite.addChild(e);
                    e = new PIXI.Graphics;
                    e.beginFill(16777215);
                    e.drawRect(530, 56, 2, 573);
                    e.alpha = .5;
                    e.name = "winsSep";
                    e.endFill;
                    b.srcSprite.addChild(e);
                    e = null;
                    b.srcSprite.interactive = !0;
                    b.srcSprite.hitArea = new PIXI.Rectangle(0, 0, 722, 445);
                    a.mainRenderer.createButton(b.srcSprite, 0, 0, "table_header");
                    e = a.mainRenderer.createButton(b.srcSprite, 0, 0, void 0, void 0, function (e, d) {
                        a.mainUIManager.animations().rotate_bets && (a.mainUIManager.animations().rotate_bets.stop(),
                            a.mainRenderer.renderManager.animationTweenDec());
                        e.pressed = !e.pressed;
                        var f = e.pressed ? 0 : Math.PI / 2;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().rotate_bets = (new TWEEN.Tween(e.children[0])).to({rotation: f}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().rotate_bets = null
                        }).start();
                        a.mainUIManager.animations().resize_bets && (a.mainUIManager.animations().resize_bets.stop(), a.mainRenderer.renderManager.animationTweenDec(),
                            a.mainUIManager.animations().resize_bets = null);
                        e = e.pressed ? 249 : 445;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().resize_bets = (new TWEEN.Tween({fHeight: b.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: e}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            b.srcSprite.position.y = 617 - this.fHeight;
                            b.srcSprite.children[2].position.y = 396 + this.fHeight - 445;
                            b.srcSprite.mask.clear();
                            b.srcSprite.mask.beginFill(14922837);
                            b.srcSprite.mask.drawRoundedRect(1, b.srcSprite.position.y,
                                722, this.fHeight, 9);
                            b.srcSprite.mask.endFill;
                            b.srcSprite.hitArea.height = this.fHeight;
                            t.emit("updateHeight")
                        }).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().resize_bets = null
                        }).start();
                        d && (d.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    e.name = "exp2";
                    e = a.mainRenderer.createButton(e, 695, 29, "atlas%Jexpand-mobile");
                    e.anchor.set(.5, .5);
                    e.rotation = Math.PI / 2;
                    e.visible = !1;
                    e = null;
                    b.srcSprite.addChild(n);
                    a.mainRenderer.createButton(n, 19,
                        30, void 0, {text: mainLocalizationTable.coupon.toUpperCase(), align: "left", style: u});
                    a.mainRenderer.createButton(n, 19, 78, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "left",
                        style: D
                    });
                    a.mainRenderer.createButton(n, 325, 78, void 0, {text: "#", align: "center", style: D});
                    a.mainRenderer.createButton(n, 380, 78, void 0, {text: "X", align: "center", style: D});
                    a.mainRenderer.createButton(n, 415, 78, void 0, {
                        text: mainLocalizationTable.totalBet,
                        align: "left",
                        style: D
                    });
                    a.mainRenderer.createButton(n, 550, 78, void 0, {
                        text: mainLocalizationTable.win,
                        align: "left", style: D
                    });
                    e = a.mainRenderer.createButton(b.srcSprite, 0, 0, void 0, void 0, function (e, b) {
                        a.mainSoundManager.playSound("buttonClick");
                        K.needShow = !K.needShow;
                        f.events.emit("GRID_STATS");
                        e.children[0].texture = a.mainRenderer.resourceLoader.resources[K.needShow ? "eye_icon" : "eye_closed_icon"].texture;
                        b && (b.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    e.hitArea = new PIXI.Rectangle(0, 0, 722, 60);
                    e.name = "eye_icon";
                    e = a.mainRenderer.createButton(e, 670, 30, "eye_icon");
                    e.anchor.set(.5, .5);
                    e.scale.set(1.3, 1.3);
                    e = e = null
                }
            };
            this.drawBetsHeader = x;
            var z = function () {
                var e = 0 !== l.children.length;
                if (!e) for (var b = 0; 5 > b; b++) {
                    var d = new a.mainRenderer.createButton(l, 0, 135 + 70 * (6 - b - 2), "atlas%Jtable-even-line-mobile");
                    d.anchor.set(.5, .5);
                    d.visible = 4 == b ? !1 : !0
                }
                var f = a.mainGameManager.gameHistory();
                for (b = 0; b < f.length; b++) {
                    var c = f[b].balls.slice();
                    c.sort(a.mainGameManager.sortNumeric);
                    d = l.children[b];
                    if (e = 0 !== d.children.length) for (d.getChildByName("round" + b).children[0].text = "#  " + f[b].tir, e = 0; e < c.length; e++) d.getChildByName("result" +
                        e).children[0].text = c[e]; else {
                        a.mainRenderer.createButton(d, 60, 10, void 0, {
                            text: "#  " + f[b].tir,
                            align: "center",
                            style: {font: "bold 40px Arial", fill: "#ffffff"}
                        }).name = "round" + b;
                        var u = 110;
                        for (e = 0; e < c.length; e++) a.mainRenderer.createButton(d, u += 80, -22, "ball", {
                            text: c[e],
                            align: "center",
                            style: {font: "bold 40px Arial Narrow", fill: "#000000"}
                        }).name = "result" + e, d.getChildByName("result" + e).scale.set(.85, .85)
                    }
                }
                l.position.x = -l.width / 2
            };
            this.detailEditionsFont = {font: "bold 52px Arial", fill: "#ffffff"};
            this.detailEditionsHeaderFont =
                {font: "bold 30px Arial", fill: "#fca903"};
            this.detailEditionsRowFont = {font: "bold 34px Arial", fill: "#ffffff"};
            var A, C = new PIXI.Graphics;
            C.beginFill(16777215, .4);
            C.drawCircle(0, 0, 38);
            C.endFill();
            this.rectTexture = C.generateTexture(!1);
            C = null;
            this.drawDetailEditionHistory = function (b, u) {
                var g = 0 != b.children.length;
                b.editionInd = u;
                var h = {x: 599, y: 465}, p = (d[u].editionResult || []).slice();
                p.sort(a.mainGameManager.sortNumeric);
                g ? (e.removeBalls(), e.startDrawBalls(p, v, 0), b.children[0].children[0].text = "# " + d[u].round,
                    p = b.getChildByName("totalBox"), p.getChildByName("tBet").children[0].text = formatFLGNums(d[u].betsHistory.getTotalBet(), !1), p.getChildByName("tWin").children[0].text = formatFLGNums(d[u].betsHistory.setTotalWin(), !1), p = null) : (g = a.mainRenderer.createButton(b, 180 - h.x, 240 - h.y, void 0, {
                    text: "# " + d[u].round,
                    align: "center",
                    style: f.detailEditionsFont
                }), e = new c(825 - h.x - 65 * a.gameConfig[a.configType].ballCount, 208 - h.y, 65, b), e.startDrawBalls(p, v, 0), g = a.mainRenderer.createButton(b, 980 - h.x, 240 - h.y, "history_arrow_left"),
                    a.mainRenderer.createButton(g, 0, 0, "history_arrow_left_selected", void 0, function (e, c) {
                        a.mainSoundManager.playSound("buttonClick");
                        b.editionInd = limit(b.editionInd - 1, 0, d.length - 2);
                        f.drawDetailEditionHistory(b, b.editionInd);
                        c.stopped = !0;
                        a.mainUIManager.clickAnimationFunc(e, "bet_arrow_History");
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }, void 0, void 0, function (a) {
                        I(a, "bet_arrow_History")
                    }, function (a) {
                        H(a, "bet_arrow_History")
                    }).alpha = 0, g.anchor.set(.5, .5), g.children[0].anchor.set(.5, .5), g = a.mainRenderer.createButton(b,
                    1080 - h.x, 240 - h.y, "history_arrow"), a.mainRenderer.createButton(g, 0, 0, "history_arrow_selected", void 0, function (e, c) {
                    a.mainSoundManager.playSound("buttonClick");
                    b.editionInd = limit(b.editionInd + 1, 0, d.length - 2);
                    f.drawDetailEditionHistory(b, b.editionInd);
                    c.stopped = !0;
                    a.mainUIManager.clickAnimationFunc(e, "bet_arrow_History2");
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, void 0, function (a) {
                    I(a, "bet_arrow_History2")
                }, function (a) {
                    H(a, "bet_arrow_History2")
                }).alpha = 0, g.anchor.set(.5, .5), g.children[0].anchor.set(.5,
                    .5), g = a.mainRenderer.createButton(b, 685 - h.x, 342 - h.y, void 0, {
                    text: mainLocalizationTable.coef.toUpperCase(),
                    align: "center",
                    style: f.detailEditionsHeaderFont
                }), g.anchor.set(.5, .5), g = a.mainRenderer.createButton(b, 120 - h.x, 342 - h.y, void 0, {
                    text: mainLocalizationTable.balls.toUpperCase(),
                    align: "center",
                    style: f.detailEditionsHeaderFont
                }), g.anchor.set(.5, .5), g = a.mainRenderer.createButton(b, 850 - h.x, 342 - h.y, void 0, {
                    text: mainLocalizationTable.bet.toUpperCase(),
                    align: "center",
                    style: f.detailEditionsHeaderFont
                }), g.anchor.set(.5,
                    .5), g = a.mainRenderer.createButton(b, 1033 - h.x, 342 - h.y, void 0, {
                    text: mainLocalizationTable.win.toUpperCase(),
                    align: "center",
                    style: f.detailEditionsHeaderFont
                }), g.anchor.set(.5, .5), g = a.mainRenderer.createButton(b, 545 - h.x, 342 - h.y, void 0, {
                    text: "#",
                    align: "center",
                    style: f.detailEditionsHeaderFont
                }), g.anchor.set(.5, .5), A = new MaskedSprite(a.mainRenderer.createButton(b, 0, 0), {
                    mask: {
                        x: 60 - h.x,
                        y: 364 - h.y,
                        width: 1070,
                        height: 426
                    }, needScrolling: {}
                }, a.mainRenderer.renderManager), A.srcSprite.interactive = !0, A.srcSprite.hitArea =
                    new PIXI.Rectangle(70 - h.x, 362 - h.y, 1061, 432), p = a.mainRenderer.createButton(b, 68 - h.x, 826 - h.y, void 0), p.name = "totalBox", p.anchor.y = .5, a.mainRenderer.createButton(p, 56, 0, void 0, {
                    text: mainLocalizationTable.total.toUpperCase(),
                    align: "center",
                    style: f.detailEditionsHeaderFont
                }), a.mainRenderer.createButton(p, 478, 0, void 0, {
                    text: mainLocalizationTable.bet.toUpperCase() + ":",
                    align: "center",
                    style: f.detailEditionsHeaderFont
                }), g = a.mainRenderer.createButton(p, 617, 0, "tab_history_row2"), g.anchor.set(.5, .5), g.scale.x =
                    .145, a.mainRenderer.createButton(p, 617, 0, void 0, {
                    text: formatFLGNums(d[u].betsHistory.getTotalBet(), !1),
                    align: "center",
                    style: f.detailEditionsRowFont
                }).name = "tBet", a.mainRenderer.createButton(p, 783, 0, void 0, {
                    text: mainLocalizationTable.win.toUpperCase() + ":",
                    align: "center",
                    style: f.detailEditionsHeaderFont
                }), g = a.mainRenderer.createButton(p, 966, 0, "tab_history_row2"), g.anchor.set(.5, .5), g.scale.x = .18, a.mainRenderer.createButton(p, 966, 0, void 0, {
                    text: formatFLGNums(d[u].betsHistory.setTotalWin(), !1), align: "center",
                    style: f.detailEditionsRowFont
                }).name = "tWin", g = p = null);
                p = [];
                var q;
                p = A.containerForScroll;
                var k;
                for (g = 0; p.getChildByName("row_" + g); g++) if (q = p.getChildByName("row_" + g)) {
                    q.visible = !1;
                    for (k = 0; q.getChildByName("rect" + g + "_" + k); k++) {
                        var l = q.getChildByName("rect" + g + "_" + k);
                        l.visible = !1;
                        l.getChildByName("textBet" + g + "_" + k).visible = !1
                    }
                    if (l = q.getChildByName("summ" + g)) l.visible = !1, q.getChildByName("win" + g).visible = !1, q.getChildByName("coef" + g).visible = !1, q.getChildByName("coefMode" + g).visible = !1
                }
                b.children[2].interactive =
                    0 !== b.editionInd;
                b.children[2].alpha = 0 !== b.editionInd ? 1 : .3;
                b.children[3].interactive = b.editionInd !== d.length - 2;
                b.children[3].alpha = b.editionInd !== d.length - 2 ? 1 : .3;
                b.children[4].visible = 0 < d[u].betsHistory.bets.length;
                b.children[5].visible = 0 < d[u].betsHistory.bets.length;
                b.children[6].visible = 0 < d[u].betsHistory.bets.length;
                b.children[7].visible = 0 < d[u].betsHistory.bets.length;
                b.children[8].visible = 0 < d[u].betsHistory.bets.length;
                if (0 >= d[u].betsHistory.bets.length) p.emit("updateHeight"); else {
                    var m = [];
                    g =
                        0;
                    for (var n = d[u].betsHistory.bets.length - 1; g < d[u].betsHistory.bets.length; g++, n--) {
                        (q = p.getChildByName("row_" + g)) ? q.visible = !0 : (q = new a.mainRenderer.createButton(p, 68 - h.x, 391 + 61 * g - h.y, "tab_history_row"), q.anchor.y = .5, q.name = "row_" + g);
                        for (k = 0; k < d[u].betsHistory.bets[n].bet.length; k++) {
                            m = d[u].betsHistory.bets[n].bet.slice();
                            m.sort(a.mainGameManager.sortNumeric);
                            var G = -1 < d[u].betsHistory.bets[n].winBets.indexOf(m[k]);
                            (l = q.getChildByName("rect" + g + "_" + k)) ? (l.texture = G ? a.mainRenderer.resourceLoader.resources.ball.texture :
                                f.rectTexture, l.visible = !0, l = l.getChildByName("textBet" + g + "_" + k), l.children[0].text = m[k], l.visible = !0) : (l = new PIXI.Sprite(G ? a.mainRenderer.resourceLoader.resources.ball.texture : f.rectTexture), q.addChild(l), l.position.x = 32 + 56 * k, l.position.y = 0, l.scale.set(.65, .65), l.anchor.set(.5, .5), l.name = "rect" + g + "_" + k, l = a.mainRenderer.createButton(l, 0, 0, void 0, {
                                text: m[k],
                                align: "center",
                                style: {font: "bold 44px Arial Narrow", fill: "#000", align: "center"}
                            }), l.anchor.set(.5, .5), l.name = "textBet" + g + "_" + k);
                            G = null
                        }
                        k = void 0 !=
                        d[u].betsHistory.bets[n].win ? formatFLGNums(d[u].betsHistory.bets[n].win, !1) : "";
                        m = void 0 != d[u].betsHistory.bets[n].countWin ? a.mainGameManager.coefficients[d[u].betsHistory.bets[n].coef - 1][d[u].betsHistory.bets[n].countWin] / 100 : "";
                        (l = q.getChildByName("summ" + g)) ? (l.children[0].text = formatFLGNums(d[u].betsHistory.bets[n].summ, !1), l.visible = !0, l = q.getChildByName("coef" + g), l.children[0].text = "X  " + m, l.visible = !0, m = q.getChildByName("coefMode" + g), m.children[0].text = d[u].betsHistory.bets[n].coef, m.visible =
                            !0, q = q.getChildByName("win" + g), q.children[0].text = k, q.visible = !0) : (a.mainRenderer.createButton(q, 780, 0, void 0, {
                            text: formatFLGNums(d[u].betsHistory.bets[n].summ, !1),
                            align: "center",
                            style: f.detailEditionsRowFont
                        }).name = "summ" + g, a.mainRenderer.createButton(q, 615, 0, void 0, {
                            text: "X " + m,
                            align: "center",
                            style: f.detailEditionsRowFont
                        }).name = "coef" + g, a.mainRenderer.createButton(q, 965, 0, void 0, {
                            text: k,
                            align: "center",
                            style: f.detailEditionsRowFont
                        }).name = "win" + g, a.mainRenderer.createButton(q, 478, 0, void 0, {
                            text: d[u].betsHistory.bets[n].coef,
                            align: "center", style: f.detailEditionsRowFont
                        }).name = "coefMode" + g)
                    }
                    m = [];
                    p.emit("updateHeight");
                    m = k = l = l = m = l = q = l = q = p = h = null
                }
            };
            this.cancelLastEdition = function (a) {
                d.length && (d[d.length - 1].editionResult = a, d[d.length - 1].betsHistory.calculateWin(a), w(d.length - 1))
            };
            this.addEdition = function (a) {
                6 <= d.length && (d[0].betsHistory.destroy && d[0].betsHistory.destroy(), d[0].betsHistory = null, d.shift());
                d.length && !d[d.length - 1].betsHistory.bets.length ? (d[d.length - 1].round = a, d[d.length - 1].editionResult = void 0) : d.length &&
                    d[d.length - 1].round === a || (d.push({
                        round: a,
                        editionResult: void 0,
                        betsHistory: new h([])
                    }), d[d.length - 1].betsHistory.parentEditions(f));
                w(d.length - 1)
            };
            this.saveToStorage = function () {
                var e, b;
                return $jscomp.asyncExecutePromiseGeneratorProgram(function (f) {
                    localStorage.setItem("curUser", JSON.stringify({
                        hall: clientInfoGlobal.hall,
                        nick: clientInfoGlobal.lgn
                    }));
                    e = [];
                    for (b = 0; b < d.length; b++) e.push({
                        round: d[b].round,
                        editionResult: d[b].editionResult,
                        bets: d[b].betsHistory.bets
                    });
                    localStorage.setItem(a.gameConfig[a.configType].gameKind +
                        a.gameConfig[a.configType].gameType + "editions", JSON.stringify(e));
                    f.jumpToEnd()
                })
            };
            this.loadFromStorage = function () {
                function e(b) {
                    $.ajax({
                        type: "get",
                        url: getUrl(),
                        data: {
                            gethistory: parseInt(a.gameConfig[a.configType].serverName.slice(3, a.gameConfig[a.configType].serverName.length)),
                            round: b.round + 1
                        },
                        dataType: "json",
                        async: !1,
                        success: function (e, d, c) {
                            if (f) if (e && e.tirid0) {
                                d = [];
                                c = e.tirid0;
                                for (e = 0; e < a.gameConfig[a.configType].ballCount; e++) {
                                    if (99 === c["b" + e] || 0 === c["b" + e]) return;
                                    d.push(c["b" + e])
                                }
                                b.editionResult =
                                    d;
                                a.mainGameManager.coefficients && b.betsHistory.calculateWin(b.editionResult, !0)
                            } else b.editionResult = []
                        }
                    })
                }

                if (localStorage.getItem("curUser")) {
                    var b = JSON.parse(localStorage.getItem("curUser"));
                    if (b.hall !== clientInfoGlobal.hall && b.nick !== clientInfoGlobal.lgn) return
                }
                b = a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "editions";
                if (localStorage.getItem(b)) {
                    var c = JSON.parse(localStorage.getItem(b));
                    for (b = 0; b < c.length; b++) d.push({
                        round: c[b].round, editionResult: c[b].editionResult,
                        betsHistory: new h(c[b].bets)
                    }), (!d[b].editionResult || d[b].editionResult.length < a.gameConfig[a.configType].ballCount) && e(d[b]);
                    w(d.length - 1)
                }
            };
            w(d.length - 1);
            this.events = new PIXI.utils.EventEmitter;
            f.events.on("EDITIONS_CHANGE", function () {
                f.saveToStorage()
            });
            f.events.on("RESULT_TIME", z);
            f.events.on("BET_TIME", z)
        }, k = {};
    this.animations = function () {
        return k
    };
    this.clickAnimationFunc = function (c, d) {
        c && (k[d] && (k[d].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(),
            k[d] = (new TWEEN.Tween(c)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                k[d] = null;
                a.mainRenderer.renderManager.animationTweenInc();
                k[d] = (new TWEEN.Tween(c)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[d] = null
                }).start()
            }).start())
    };
    var I = function (c, d, g) {
        if (c) switch (k[d] && (k[d].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(),
            g) {
            case "grow":
                k[d] = (new TWEEN.Tween(c.scale)).to({
                    x: 1.2,
                    y: 1.2
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[d] = null
                }).start();
                break;
            default:
                k[d] = (new TWEEN.Tween(c)).to({alpha: .6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[d] = null
                }).start()
        }
    }, H = function (c, d, g) {
        k[d] && (k[d].stop(), a.mainRenderer.renderManager.animationTweenDec());
        if (c && 0 != c.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(),
            g) {
            case "grow":
                k[d] = (new TWEEN.Tween(c.scale)).to({
                    x: 1,
                    y: 1
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[d] = null
                }).start();
                break;
            default:
                k[d] = (new TWEEN.Tween(c)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[d] = null
                }).start()
        }
    }, aa = function (c, d, g) {
        if (c.container) {
            k[g] && k[g].stop();
            if (c.onStartClose) c.onStartClose();
            a.mainRenderer.renderManager.animationTweenInc();
            k[g] = (new TWEEN.Tween(c.container.scale)).to({y: 0},
                165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                if (c.onStopClose) c.onStopClose();
                if (d.onStopOpen) d.onStopOpen();
                a.mainRenderer.renderManager.animationTweenDec();
                k[g] = null;
                c.container.scale.y = 0;
                d.container.scale.y = 1
            }).onComplete(function () {
                if (c.onStopClose) c.onStopClose();
                a.mainRenderer.renderManager.animationTweenDec();
                k[g] = null;
                if (d.onStartOpen) d.onStartOpen();
                a.mainRenderer.renderManager.animationTweenInc();
                k[g] = (new TWEEN.Tween(d.container.scale)).to({y: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                    if (c.onStopClose) c.onStopClose();
                    if (d.onStopOpen) d.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[g] = null;
                    c.container.scale.y = 0;
                    d.container.scale.y = 1
                }).onComplete(function () {
                    if (d.onStopOpen) d.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[g] = null
                }).start()
            }).start()
        }
    }, O = function (c, d, g) {
        c && (k[d] ? k[d].stop() : (a.mainRenderer.renderManager.animationTweenInc(), k[d] = (new TWEEN.Tween(c.position)).to({x: g}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            k[d] = null
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            k[d] = null
        }).start()))
    };
    this.simpleFlipXFunc = function (c, d, g, h, l, m) {
        k[d] && k[d].stop();
        var b = c.scale.x;
        a.mainRenderer.renderManager.animationTweenInc();
        k[d] = (new TWEEN.Tween(c.scale)).to({x: 0}, g).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            k[d] = null;
            c.scale.x = b
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            k[d] = null;
            l && l(c);
            a.mainRenderer.renderManager.animationTweenInc();
            k[d] = (new TWEEN.Tween(c.scale)).to({x: b}, h).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                k[d] = null;
                c.scale.x = b;
                m && m(c)
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                k[d] = null;
                m && m(c)
            }).start()
        }).start()
    };
    var U, V, N = !1,
        M = [["JP", a.gameDir + "WinJP/jp-jackpot-win.png"], ["jp_only", a.gameDir + "WinJP/jp-jackpot-only.png"], ["WIN", a.gameDir + "WinJP/jp-bigwin.png"], ["jp_name", a.gameDir + "jackpot/jack-pot.png"], ["jp_num_bot", a.gameDir + "jackpot/num-bot.png"], ["jp_num_top",
            a.gameDir + "jackpot/num-top.png"], ["bet_arrow", a.gameDir + "arrow.png"], ["bet_arrow_selected", a.gameDir + "arrow-selected.png"], ["history_arrow", a.gameDir + "arrow-history.png"], ["history_arrow_selected", a.gameDir + "arrow-history-selected2.png"], ["history_arrow_left", a.gameDir + "arrow-history-l.png"], ["history_arrow_left_selected", a.gameDir + "arrow-history-l-selected2.png"], ["tab_history_row", a.gameDir + "tab-history-row-sep-min.png"], ["tab_history_row2", a.gameDir + "tab-history-row.png"], ["hotcold_bg", a.gameDirMobile +
        "hotcold-bg-mobile.png"], ["eye_icon", a.gameDir + "eye-icon-min.png"], ["eye_closed_icon", a.gameDir + "eye-closed-icon-min.png"], ["ball", a.gameDir + "ball_.png"], ["menu_btn_middle_flat", a.gameDirMobile + "menu-btn-middle-flat.png"], ["menu_btn_middle_flat_pressed", a.gameDirMobile + "menu-btn-middle-flat-pressed.png"], ["menu_btn_large", a.gameDirMobile + "menu-btn-grand.png"], ["menu_btn_large_pressed", a.gameDirMobile + "menu-btn-grand-pressed.png"], ["autoplay", a.gameDirMobile + "btn-autoplay.png"], ["autoplay_pressed",
            a.gameDirMobile + "btn-autoplay-pressed.png"], ["btn_menu_small", a.gameDirMobile + "btn-menu-small5.png"], ["btn_menu_small_pressed", a.gameDirMobile + "btn-menu-small-pressed5.png"], ["btn_balance_small", a.gameDirMobile + "btn-balance-small3.png"], ["btn_balance_small_pressed", a.gameDirMobile + "btn-balance-small-pressed3.png"], ["bet", a.gameDirMobile + "btn-balance2.png"], ["btn_plus", a.gameDirMobile + "plus.png"], ["btn_plus_pressed", a.gameDirMobile + "plus-pressed.png"], ["tab_bg", a.gameDirMobile + "tab-bg-mobile2.png"],
            ["table_header", a.gameDirMobile + "bet-header-mobile_.png"], ["table_footer", a.gameDirMobile + "bet-footer-mobile.png"], ["bg_main", a.gameDirMobile + "bg_" + a.gameConfig[a.configType].gameType.toLowerCase() + ".jpg"], ["game_5_36", a.gameDirMobile + "5-" + a.gameConfig[a.configType].gameType.toLowerCase() + ".png"], ["game_6_42", a.gameDirMobile + "6-" + a.gameConfig[a.configType].gameType.toLowerCase() + ".png"], ["game_7_49", a.gameDirMobile + "7-" + a.gameConfig[a.configType].gameType.toLowerCase() + ".png"], ["video_skin", a.gameDirMobile +
            "video-skin-" + a.gameConfig[a.configType].gameType.toLowerCase() + ".png"], ["video_skin_off", a.gameDirMobile + "video-skin-off-" + a.gameConfig[a.configType].gameType.toLowerCase() + ".jpg"], ["zone_transp", a.gameDir + "zone-" + a.gameConfig[a.configType].gameType + "_.png"], ["zone_hot", a.gameDir + "zone-hot.png"], ["zone_cold", a.gameDir + "zone-cold.png"], ["zone_selected", a.gameDir + "zone-action-" + a.gameConfig[a.configType].gameType + "_.png"], ["zone_pressed", a.gameDir + "zone-win-" + a.gameConfig[a.configType].gameType + "2.png"],
            ["zone_win", a.gameDir + "zone-pressed-" + a.gameConfig[a.configType].gameType + "2.png"], ["zone_lock", a.gameDir + "zone-lock-" + a.gameConfig[a.configType].gameType + "2.png"], ["zone_lock2", a.gameDir + "zone-lock-" + a.gameConfig[a.configType].gameType + "2.png"], ["grid_bg", a.gameDir + "grid-" + a.gameConfig[a.configType].gameType + ".png"], ["grid_bg_copy", a.gameDir + "grid-" + a.gameConfig[a.configType].gameType + "-copy.png"], ["coef_bg", a.gameDirMobile + "bg_coef.png"], ["coef_line_left", a.gameDir + "coef-line-left.png"], ["coef_line_middle",
                a.gameDir + "coef-line-middle.png"], ["coef_line_right", a.gameDir + "coef-line-right.png"], ["rules_1", a.gameDir + "rules_1_" + a.gameConfig[a.configType].gameType + "-min.png"], ["rules_2", a.gameDir + "rules_2_" + a.gameConfig[a.configType].gameType + "-min.png?v=1"], ["rules_3", a.gameDir + "rules_3_" + a.gameConfig[a.configType].gameType + "-min.png?v=1"], ["rules_4", a.gameDir + "rules_4_" + a.gameConfig[a.configType].gameType + "-min.png?v=1"], ["rules_5", a.gameDir + "rules_5-min.png"], ["rules_6", a.gameDir + "rules_6-min.png"], ["rules_7", a.gameDir +
            "rules_7-min.png"], ["atlas", a.gameDirMobile + "sprite/lottoM.json"], ["atlas2", a.gameDirMobile + "sprite/lottoM-bg.json"], ["video_play", a.gameDirMobile + "play-on.png"], ["video_play_off", a.gameDirMobile + "play-off.png"], ["video_load", a.gameDirMobile + "btn-video-load-new.png"]];
    M = M.concat(a.mainFLGAccount.resources);
    M = M.concat(F.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, "images/logo.json", M, function (f, d, h) {
        function k(b, c, d) {
            var e = -1, f = -1, u;
            for (u in w) if (!w[u].isUsed) {
                e = parseInt(u);
                w[e].isLast &&
                (f = e == w.length - 1 ? 0 : e + 1);
                break
            }
            a.mainRenderer.renderManager.animationTweenInc();
            a.mainUIManager.animations().lottoTicket = (new TWEEN.Tween({
                scale: 1,
                position: E.position.y,
                alpha: 1
            })).to({scale: .9, position: -50, alpha: 0}, c ? 0 : 250).onUpdate(function () {
                E.scale.set(this.scale, this.scale);
                E.position.y = this.position;
                for (var a = 1 - .08 * e, b = 1 - .15 * e, c = 0; c < e; c++) w[c].position.y = -40 * (e - c) * a + this.position, w[c].scale.set(this.scale - .08 * (e - c), this.scale - .08 * (e - c)), w[c].alpha = b, a += .08, b += .15;
                w[e].isLast && (w[f].alpha = this.alpha)
            }).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations().lottoTicket = null;
                w[e].isLast && (w[f].position.x = -1200, w[f].position.y = 0, w[f].scale.set(1, 1), w[f].isUsed = !1, w[f].isLast = !0, w[f].alpha = 1, g.game.container.removeChild(w[f]), g.game.container.addChildAt(w[f], g.game.container.getChildIndex(E) + 1), w[e].isLast = !1);
                a.mainRenderer.renderManager.animationTweenInc();
                a.mainUIManager.animations().lottoTicketCopy = (new TWEEN.Tween(w[e].position)).to({x: 0}, c ? 0 : 250).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    a.mainUIManager.animations().lottoTicketCopy = null;
                    w[e].isUsed = !0;
                    if (b) {
                        var c;
                        for (c in b) {
                            var f = a.mainGrid.zones[b[c] - 1];
                            f.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture;
                            f.children[0].style = {
                                font: "50px Swiss721-CondensedBold",
                                fill: a.gameConfig[a.configType].gridNumColor,
                                align: "center"
                            }
                        }
                    }
                    E.scale.set(1, 1);
                    E.position.y = 0;
                    g.game.container.removeChild(w[e]);
                    g.game.container.addChildAt(w[e], g.game.container.getChildIndex(E));
                    w[e].scale.set(.9, .9);
                    w[e].position.y -= 50;
                    d && d()
                }).start()
            }).start()
        }

        function p(e) {
            if (a.configType != e) {
                a.mainSoundManager.playSound("buttonClick");
                var b = a.gameConfig[a.configType].canvasId;
                $("#" + b).attr("gameType", e);
                removeLottoNewObject(b, a.configType.toLowerCase());
                initLottoNewObject(b, e)
            }
        }

        function n(b, c) {
            g.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + c).children[1].interactive = !1;
            g.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + c).children[1].alpha = 1;
            g.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" +
                c).children[1].children[0].style = {font: "bold 30px Arial", fill: "#000"};
            g.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + c).children[1].interactive = !1;
            g.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + c).children[1].alpha = 1;
            g.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + c).children[1].children[0].style = {
                font: "bold 30px Arial",
                fill: "#000"
            };
            g.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].interactive =
                !0;
            g.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].alpha = 0;
            g.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].children[0].style = {
                font: "bold 30px Arial",
                fill: "#444"
            };
            g.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].interactive = !0;
            g.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].alpha = 0;
            g.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" +
                b).children[1].children[0].style = {font: "bold 30px Arial", fill: "#444"};
            localStorage.setItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "coefMode", JSON.stringify(c))
        }

        a.mainRenderer.createButton(void 0, 0, 0, "bg_main");
        C.position.set(1920, 246);
        f = new PIXI.Graphics;
        f.beginFill(a.gameConfig[a.configType].menuBgColor);
        f.drawRect(0, 142, 746, 684);
        f.endFill;
        C.addChild(f);
        f = new PIXI.Graphics;
        f.beginFill(0, .6);
        f.drawRect(0, 142, 746, 684);
        f.endFill;
        C.addChild(f);
        C.interactive = !0;
        L = new c(a.gameConfig[a.configType].resBallX +
            180, 25, 139, void 0, !0);
        var b = a.mainRenderer.createButton(void 0, 50, 60, void 0, {
            text: "00:00",
            align: "left",
            style: {font: "bold 72px Arial", fill: "#c7c7c7"}
        });
        b.anchor.set(.5, .5);
        b.name = "timer_main";
        b = a.mainRenderer.createButton(void 0, 50, 130, void 0, {
            text: "# ",
            align: "left",
            style: {font: "bold 36px Arial", fill: "#c7c7c7"}
        });
        b.anchor.set(.5, .5);
        b.name = "round_main";
        a.mainRenderer.createButton(void 0, 1440, 55, void 0, {
            text: mainLocalizationTable.totalBet.toUpperCase() + ":", align: "center", style: {
                font: "bold 34px Arial",
                fill: "#c7c7c7"
            }
        }).name = "betSprite";
        a.mainRenderer.stage.getChildByName("betSprite").alpha = 0;
        a.mainRenderer.createButton(void 0, 1440, 110, void 0, {
            text: formatFLGNums(a.mainFLGAccount.totalBet()),
            align: "center",
            style: {font: "bold 45px Arial", fill: "#e8a023"}
        }).name = "betTxt";
        a.mainRenderer.stage.getChildByName("betTxt").alpha = 0;
        U = function (b) {
            a.mainRenderer.stage.getChildByName("betTxt").children[0].text = formatFLGNums(b);
            a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("betTxt").children[0]);
            a.mainRenderer.stage.getChildByName("betSprite").alpha = 0 < b ? 1 : 0;
            a.mainRenderer.stage.getChildByName("betTxt").alpha = 0 < b ? 1 : 0;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        a.mainFLGAccount.events.on("onBet", U);
        b = a.mainRenderer.createButton(void 0, 1553, 20, "bet", {
            text: "DEMO" == clientInfoGlobal.hall ? "DEMO" : formatFLGNums(a.mainFLGAccount.balance()),
            align: "center",
            style: {font: "bold 65px Arial", fill: "#e8a023"}
        }, function () {
            var b = a.gameConfig[a.configType].canvasId, c = ["red",
                "blue", "green"][Math.floor(4 * Math.random())];
            $("#" + b).attr("gameType", c);
            removeLottoNewObject(b, a.gameConfig[a.configType].gameType.toLowerCase());
            initLottoNewObject(b, c)
        });
        b.name = "balanceTxt";
        b.children[0].anchor.y = .77;
        a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("balanceTxt").children[0]);
        a.mainRenderer.createButton(b, b.width / 2, .8 * b.height, void 0, {
            text: mainLocalizationTable.balance.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial Narrow", fill: "#323232"}
        });
        V = function (b) {
            a.mainRenderer.stage.getChildByName("balanceTxt").children[0].text =
                "DEMO" == clientInfoGlobal.hall ? "DEMO" : formatFLGNums(b);
            a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("balanceTxt").children[0])
        };
        a.mainFLGAccount.events.on("onBalance", V);
        b = a.mainRenderer.createButton(l, 1176, 849, "btn_menu_small");
        a.mainRenderer.createButton(b, 0, 0, "btn_menu_small_pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            t.clickAnimationFunc(b, "btn_menu");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, c) {
            O(C,
                "menuContainer", 1174);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
            text: mainLocalizationTable.menu.toUpperCase(),
            align: "center",
            style: {font: "bold 36px Arial Narrow", fill: "#323232"}
        });
        b = a.mainRenderer.createButton(l, 1176, 963, "btn_balance_small");
        b.name = "bet_on_autoplay";
        a.mainRenderer.createButton(b, 0, 0, "btn_balance_small_pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("chipSelector");
            A.incrementBet();
            var e = l.getChildByName("bet_on_autoplay").getChildByName("betText").children[0];
            A.isMaxBet() ? e.text = "MAX\n" + B : e.text = A.currentBet();
            localStorage.setItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "defaultBet", JSON.stringify(A.currentBet()));
            a.mainUIManager.setTextScale(e);
            T();
            c.stopped = !0;
            t.clickAnimationFunc(b, "btn_balance_small");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
            text: mainLocalizationTable.bet.toUpperCase(),
            align: "center",
            style: {font: "bold 28px Arial Narrow", fill: "#323232"}
        });
        b.children[1].children[0].anchor.set(.5, -.5);
        b = a.mainRenderer.createButton(l.getChildByName("bet_on_autoplay"), 106, 39, void 0, {
            text: A.currentBet(),
            align: "center",
            style: {font: "bold 48px Arial", fill: "#e8a023", align: "center"}
        });
        b.name = "betText";
        b.anchor.set(.5, .5);
        a.mainUIManager.setTextScale(l.getChildByName("bet_on_autoplay").getChildByName("betText").children[0]);
        b = a.mainRenderer.createButton(l, 1391, 963, "autoplay");
        b.name = "btn_autoplay";
        a.mainRenderer.createButton(b, 0, 0, "autoplay_pressed", void 0, function (b,
                                                                                   c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            t.clickAnimationFunc(b, "btn_autoplay");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, c) {
            O(m, "autoplayContainer", 1174);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
            text: mainLocalizationTable.autoPlay.toUpperCase(),
            align: "center",
            style: {font: "bold 36px Arial Narrow", fill: "#323232"}
        });
        a.mainRenderer.createButton(b, .83 * b.width, b.height / 2, void 0, {
            text: "",
            align: "center", style: {font: "bold 60px Arial Narrow", fill: "#323232"}
        }).name = "autoplay_remain_num";
        b = a.mainRenderer.createButton(l, 1391, 849, "autoplay");
        b.name = "btn_random";
        a.mainRenderer.createButton(b, 0, 0, "autoplay_pressed", void 0, function (b, c) {
            a.mainGrid.removeCurrentBets();
            a.mainGrid.createRandomBets();
            T();
            c.stopped = !0;
            t.clickAnimationFunc(b, "btn_random");
            (b = l.getChildByName("btn_plus")) && b.interactive && (b.emit("mousedown"), b.emit("mouseup"));
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha =
            0;
        a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
            text: mainLocalizationTable.random.toUpperCase(),
            align: "center",
            style: {font: "bold 36px Arial Narrow", fill: "#323232"}
        });
        b = a.mainRenderer.createButton(l, 1676, 849, "btn_plus", {
            text: a.gameConfig[a.configType].ballCount,
            align: "center",
            style: {font: "bold 110px Arial", fill: "#595959", align: "center"}
        }, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            if (0 < a.mainGrid.pressedZones.length) {
                b.interactive = !1;
                l.getChildByName("btn_random").children[0].interactive =
                    !1;
                var e = a.mainGrid.getIntArrayOfPressedZones();
                v.getActedOutEdition().betsHistory.addBet({
                    summ: A.currentBet(),
                    bet: e,
                    coef: a.mainGameManager.coefMode,
                    winBets: [],
                    countWin: 0,
                    win: void 0
                }, v.getActedOutEdition().round, function (b) {
                    if (b) {
                        a.mainFLGAccount.maxWin(0);
                        for (var c in e) switch (b = a.mainGrid.zones[e[c] - 1], b.emit("mousedown"), b.emit("mouseup"), b.currentLayer = !1, b.getChildByName("text" + b.name).style = {
                            font: "50px Swiss721-CondensedBold",
                            fill: "#000",
                            align: "center"
                        }, b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture,
                            b.isLock ? b.isLock++ : b.isLock = 1, b.isLock) {
                            case 1:
                                b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                break;
                            default:
                                b.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                        }
                        b = null;
                        k(e, !1, function () {
                            v.events.emit("GRID_STATS");
                            l.getChildByName("btn_random").children[0].interactive = !0;
                            l.getChildByName("btn_plus").interactive = !0;
                            l.getChildByName("btn_plus").texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture
                        })
                    }
                    a.mainRenderer.renderManager.needUpdateRender = !0
                })
            }
            c &&
            (c.stopped = !0);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.children[0].style = "+" != b.children[0].text ? {
                font: "bold 110px Arial",
                fill: "#595959",
                align: "center"
            } : {font: "190px Arial", fill: "#00ff24", align: "center"};
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.children[0].style = "+" != b.children[0].text ? {
                font: "bold 110px Arial",
                fill: "#595959",
                align: "center"
            } : {font: "190px Arial", fill: "#710006", align: "center"};
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        b.interactive = !1;
        f = a.mainRenderer.createButton(l, 1676, 849, "btn_plus", void 0, function (b, c) {
            b.isPlay ? (g.game.button.emit("mousedown"), b.getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture, l.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture, b.texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture, b.isPlay = !1) : (g.video.button.emit("mousedown"), b.getChildByName("video_play").texture =
                a.mainRenderer.resourceLoader.resources.video_play_off.texture, l.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin_off.texture, b.texture = a.mainRenderer.resourceLoader.resources.btn_plus_pressed.texture, b.isPlay = !0);
            c.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        f.name = "videoPlayBtn";
        b = a.mainRenderer.createButton(l, 1770, 265, "video_skin", void 0, function (b, c) {
            l.getChildByName("videoPlayBtn").isPlay ? (g.game.button.emit("mousedown"), l.getChildByName("videoPlayBtn").getChildByName("video_play").texture =
                a.mainRenderer.resourceLoader.resources.video_play.texture, b.texture = a.mainRenderer.resourceLoader.resources.video_skin.texture, l.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture, l.getChildByName("videoPlayBtn").isPlay = !1) : (g.video.button.emit("mousedown"), l.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play_off.texture, b.texture = a.mainRenderer.resourceLoader.resources.video_skin_off.texture,
                l.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus_pressed.texture, l.getChildByName("videoPlayBtn").isPlay = !0)
        });
        b.anchor.set(.5, .5);
        f.visible = !1;
        a.mainRenderer.createButton(f, f.width / 2, f.height / 2, "video_play").anchor.set(.5, .5);
        f = new PIXI.Graphics;
        f.beginFill(0);
        f.drawRect(0, 0, 746, 684);
        f.endFill;
        f.name = "autoplay-bg2";
        m.position.set(1920, 388);
        m.addChild(f);
        m.interactive = !0;
        a.mainRenderer.createButton(m.getChildByName("autoplay-bg2"), 373, 68, void 0, {
            text: mainLocalizationTable.autoPlay.toUpperCase(),
            align: "center", style: {font: "bold 90px Arial Narrow", fill: "#ffffff"}
        });
        a.mainRenderer.createButton(m.getChildByName("autoplay-bg2"), 370, 180, void 0, {
            text: mainLocalizationTable.autoplayRoundNumber,
            align: "center",
            style: {font: "40px Arial Narrow", fill: "#ffffff"}
        }).name = "autoplayDesc1";
        a.mainRenderer.createButton(m.getChildByName("autoplay-bg2"), 370, 473, void 0, {
            text: mainLocalizationTable.autoplayStart,
            align: "center",
            style: {font: "40px Arial Narrow", fill: "#ffffff"}
        }).name = "autoplayDesc2";
        a.mainRenderer.createButton(m.getChildByName("autoplay-bg2"),
            662, 38, "atlas%Jautoplay-close", void 0, function (b, c) {
                a.mainSoundManager.playSound("buttonClick");
                c.stopped = !0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (b, c) {
                O(m, "autoplayContainer", 1920);
                a.mainRenderer.renderManager.needUpdateRender = !0
            });
        for (f = 0; 3 > f; f++) {
            b = a.mainRenderer.createButton(m.getChildByName("autoplay-bg2"), 23 + 221 * f + 18 * f, 233, "atlas%Jautoplay-num");
            d = void 0;
            switch (f) {
                case 0:
                    d = "5";
                    break;
                case 1:
                    d = "10";
                    break;
                case 2:
                    d = "50"
            }
            b.name += d;
            a.mainRenderer.createButton(b, 0, 0, "atlas%Jautoplay-num-pressed",
                void 0, function (b, c) {
                    a.mainSoundManager.playSound("chipSelector");
                    c.stopped = !0;
                    t.clickAnimationFunc(b, "autoplay_num" + b.parent.position.x);
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, function (b, c) {
                    a.mainFLGAccount.autoplayManager.settings.isStarted(!0);
                    a.mainFLGAccount.autoplayManager.settings.count(parseInt(b.parent.children[1].children[0].text));
                    a.mainFLGAccount.autoplayManager.updateCallback("getOnlyBets");
                    a.mainFLGAccount.autoplayManager.settings.isStarted() && (l.getChildByName("btn_autoplay").getChildByName("autoplay_remain_num").children[0].text =
                        b.parent.children[1].children[0].text, m.getChildByName("autoplay-bg2").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRemainingNumber + ": " + b.parent.children[1].children[0].text, m.getChildByName("autoplay-bg2").getChildByName("autoplayDesc2").visible = !1, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num5").visible = !1, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num10").visible = !1, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num50").visible =
                        !1, m.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").children[0].text = b.parent.children[1].children[0].text, m.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").visible = !0, m.getChildByName("autoplay-bg2").getChildByName("autoplay-stop").visible = !0, m.getChildByName("autoplay-bg2").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"], m.getChildByName("autoplay-bg2").getChildByName("repeat").children[0].interactive =
                        !1);
                    O(m, "autoplayContainer", 1920);
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }).alpha = 0;
            a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
                text: d,
                align: "center",
                style: {font: "bold 120px Arial Narrow", fill: "#363636"}
            })
        }
        b = a.mainRenderer.createButton(m.getChildByName("autoplay-bg2"), 23, 539, "atlas%Jmenu-btn-grand2");
        b.name = "repeat";
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jautoplay-repeat-pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            t.clickAnimationFunc(b,
                "repeat");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, c) {
            b.parent.texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"];
            b.interactive = !1;
            a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet");
            O(m, "autoplayContainer", 1920);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
            text: mainLocalizationTable.autoplayRepeatLastBet, align: "center", style: {
                font: "bold 50px Arial Narrow",
                fill: "#363636"
            }
        });
        a.mainRenderer.createButton(m.getChildByName("autoplay-bg2"), 23, 233, "atlas%Jautoplay-num-pressed", {
            text: "",
            align: "center",
            style: {font: "bold 120px Arial Narrow", fill: "#363636"}
        }).name = "autoplaySelected";
        m.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").visible = !1;
        b = a.mainRenderer.createButton(m.getChildByName("autoplay-bg2"), 262, 264, "atlas%Jautoplay-stop");
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jautoplay-stop-pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            t.clickAnimationFunc(b, "autoplay_stop");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, c) {
            a.mainFLGAccount.autoplayManager.stop();
            a.mainFLGAccount.autoplayManager.settings.isStarted() || (l.getChildByName("btn_autoplay").getChildByName("autoplay_remain_num").children[0].text = "", m.getChildByName("autoplay-bg2").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRoundNumber, m.getChildByName("autoplay-bg2").getChildByName("autoplayDesc2").visible =
                !0, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num5").visible = !0, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num10").visible = !0, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num50").visible = !0, m.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").visible = !1, m.getChildByName("autoplay-bg2").getChildByName("autoplay-stop").visible = !1, a.mainFLGAccount.autoplayManager.settings.repeatRoundNum() !== v.editions[v.editions.length - 1].round && v.editions[limit(v.editions.length -
                2, 0, v.editions.length - 1)].betsHistory.bets.length && (m.getChildByName("autoplay-bg2").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand2"], m.getChildByName("autoplay-bg2").getChildByName("repeat").children[0].interactive = !0));
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
            text: mainLocalizationTable.autoplayStop,
            align: "center",
            style: {font: "bold 50px Arial Narrow", fill: "#363636"}
        });
        m.getChildByName("autoplay-bg2").getChildByName("autoplay-stop").visible = !1;
        b = a.mainRenderer.createButton(C, 25, 162, "menu_btn_middle_flat");
        a.mainRenderer.createButton(b, 0, 0, "menu_btn_middle_flat_pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            t.clickAnimationFunc(b, "btn_home");
            a.mainFLGAccount.closeGame();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, 171, 62, "atlas%Jhome-sign");
        b.getChildByName("home-sign").anchor.set(.5,
            .5);
        APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && b && (b.visible = clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl);
        b = a.mainRenderer.createButton(C, 385, 162, "menu_btn_middle_flat", void 0);
        b.name = "btn_sound_outer";
        a.mainRenderer.createButton(b, 0, 0, "menu_btn_middle_flat_pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            t.clickAnimationFunc(b, "btn_volume");
            a.mainSoundManager.muteSound(!a.mainSoundManager.isMuted());
            localStorage.setItem(a.gameConfig[a.configType].gameKind +
                "muteSound", a.mainSoundManager.isMuted());
            b.parent.getChildByName("volume-sign").texture = a.mainRenderer.resourceLoader.resources.atlas.textures[a.mainSoundManager.isMuted() ? "mute-sign" : "volume-sign"];
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, 171, 62, "atlas%Jvolume-sign");
        b.getChildByName("volume-sign").anchor.set(.5, .5);
        localStorage.getItem(a.gameConfig[a.configType].gameKind + "muteSound") && !0 === JSON.parse(localStorage.getItem(a.gameConfig[a.configType].gameKind +
            "muteSound")) && (a.mainSoundManager.muteSound(!0), C.getChildByName("btn_sound_outer").getChildByName("volume-sign").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["mute-sign"]);
        b = a.mainRenderer.createButton(C, 25, 694, "menu_btn_large", {
            text: mainLocalizationTable.returnGame.toUpperCase(),
            align: "center",
            style: {font: "bold 50px Arial", fill: "#323232"}
        }, function (b, c) {
            b.texture = a.mainRenderer.resourceLoader.resources.menu_btn_large_pressed.texture;
            b.children[0].style = {
                font: "bold 50px Arial",
                fill: "#ffffff"
            };
            c.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, c) {
            b.texture = a.mainRenderer.resourceLoader.resources.menu_btn_large.texture;
            b.children[0].style = {font: "bold 50px Arial", fill: "#323232"};
            O(C, "menuContainer", 1920);
            g.game.button.emit("mousedown");
            l.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture;
            l.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture;
            l.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture;
            l.getChildByName("videoPlayBtn").isPlay = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        b.scale.set(1, 1);
        for (var r in g) {
            switch (r) {
                case "game":
                    b = a.mainRenderer.createButton(J, 587, 628, void 0);
                    break;
                case "history":
                    b = a.mainRenderer.createButton(J, 586, 658, "tab_bg");
                    break;
                case "stats":
                    b = a.mainRenderer.createButton(J, 586, 658, "tab_bg");
                    break;
                case "rules":
                    b = a.mainRenderer.createButton(J, 586, 658, "tab_bg");
                    break;
                case "info":
                    b = a.mainRenderer.createButton(J, 586, 625, void 0);
                    break;
                case "video":
                    b = a.mainRenderer.createButton(J, 586, 625, void 0)
            }
            b.name = r;
            b.anchor.set(.5, .5);
            b.scale.y = 0;
            g[r].container = b;
            "stats" !== r && (function (c) {
                b = a.mainRenderer.createButton(C, g[r].posX, g[r].posY, "menu_btn_middle_flat", {
                    text: g[r].text,
                    align: "center",
                    style: {font: "bold 50px Arial", fill: "#323232"}
                }, function (b, e) {
                    if (!b.pressed) if ("history" === c && GamerHistory) {
                        b = document.getElementById("histWrap");
                        b || (b = document.createElement("div"),
                            b.id = "histWrap", document.body.appendChild(b));
                        e = localLanguage();
                        switch (e) {
                            case "es":
                                e = "spa";
                                break;
                            case "en":
                                e = "eng";
                                break;
                            case "kz":
                                e = "kaz";
                                break;
                            case "ru":
                                e = "rus";
                                break;
                            case "fr":
                                e = "fra"
                        }
                        GamerHistory.setConfig({lg: clientInfoGlobal.lgn, lang: e});
                        b.parentNode.classList.add("seen")
                    } else {
                        b.texture = a.mainRenderer.resourceLoader.resources.menu_btn_middle_flat_pressed.texture;
                        b.children[0].style = {font: "bold 50px Arial", fill: "#ffffff"};
                        a.mainSoundManager.playSound("buttonClick");
                        for (var d in g) g[d].button &&
                        g[d].button.pressed && (g[d].button.pressed = !1, g[d].button.texture = a.mainRenderer.resourceLoader.resources.menu_btn_middle_flat.texture, g[d].button.children[0].style = {
                            font: "bold 50px Arial",
                            fill: "#323232"
                        }, aa(g[d], g[b.name], "flipContainer"));
                        b.pressed = !0;
                        e && (e.stopped = !0);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }
                })
            }(r), b.name = r, g[r].button = b, g[r].pressedDefault && (g[r].button.pressed = !0, g[r].button.texture = a.mainRenderer.resourceLoader.resources.menu_btn_middle_flat_pressed.texture, g[r].button.children[0].style =
                {font: "bold 50px Arial", fill: "#ffffff"}, g[r].container.scale.y = 1))
        }
        d = new URLSearchParams(location.search);
        if (1 !== Number(d.get("show_gamelink") || localStorage.getItem("show_gamelink"))) {
            d = a.gameConfig[a.configType].gameType.toLowerCase();
            switch (d) {
                case "red":
                    var y = "6_42";
                    break;
                case "green":
                    y = "7_49";
                default:
                    y = "5_36"
            }
            b = a.mainRenderer.createButton(void 0, 210, 265, "game_" + y);
            b.name = "game_" + d + "_icon"
        } else b = a.mainRenderer.createButton(void 0, 960, 265, "game_5_36", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            p("blue")
        }), b.name = "game_blue_icon", b.anchor.set(.5, .5), b = a.mainRenderer.createButton(void 0, 585, 265, "game_6_42", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            p("red")
        }), b.name = "game_red_icon", b.anchor.set(.5, .5), b = a.mainRenderer.createButton(void 0, 210, 265, "game_7_49", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            p("green")
        }), b.name = "game_green_icon";
        b.anchor.set(.5, .5);
        b = a.mainRenderer.createButton(g.info.container, 2, 398,
            "atlas%Jbg-coef-btns-" + a.gameConfig[a.configType].gameType + "-mobile-min");
        b.name = "coef_btns";
        b.anchor.set(.5, .5);
        b = a.mainRenderer.createButton(g.game.container, 1, 390 - a.gameConfig[a.configType].gridOffsetY, "atlas%Jbg-coef-btns-" + a.gameConfig[a.configType].gameType + "-mobile-min");
        b.name = "coef_btns";
        b.anchor.set(.5, .5);
        b = a.mainRenderer.createButton(g.game.container.getChildByName("coef_btns"), -528, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType + "-mobile-min", {
            text: "#1 " + mainLocalizationTable.lottoLowRisk,
            align: "center", style: {font: "bold 30px Arial", fill: "#b1b1b1"}
        });
        b.name = "coef_btn_1";
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
            text: "#1 " + mainLocalizationTable.lottoLowRisk,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#444"}
        }, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            n(a.mainGameManager.coefMode, 1);
            a.mainGameManager.coefMode = 1;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            I(a,
                "coef_btn_selected_1")
        }, function (a) {
            H(a, "coef_btn_selected_1")
        }).alpha = 0;
        b = a.mainRenderer.createButton(g.game.container.getChildByName("coef_btns"), -172, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType + "-mobile-min", {
            text: "#2 " + mainLocalizationTable.lottoNormRisk,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#b1b1b1"}
        });
        b.name = "coef_btn_2";
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
            text: "#2 " + mainLocalizationTable.lottoNormRisk, align: "center", style: {
                font: "bold 30px Arial",
                fill: "#444"
            }
        }, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            n(a.mainGameManager.coefMode, 2);
            a.mainGameManager.coefMode = 2;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            I(a, "coef_btn_selected_2")
        }, function (a) {
            H(a, "coef_btn_selected_2")
        }).alpha = 0;
        b = a.mainRenderer.createButton(g.game.container.getChildByName("coef_btns"), 184, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType + "-mobile-min", {
            text: "#3 " + mainLocalizationTable.lottoHighRisk,
            align: "center", style: {font: "bold 30px Arial", fill: "#b1b1b1"}
        });
        b.name = "coef_btn_3";
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
            text: "#3 " + mainLocalizationTable.lottoHighRisk,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#444"}
        }, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            n(a.mainGameManager.coefMode, 3);
            a.mainGameManager.coefMode = 3;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            I(a,
                "coef_btn_selected_3")
        }, function (a) {
            H(a, "coef_btn_selected_3")
        }).alpha = 0;
        g.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].alpha = 1;
        g.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].interactive = !1;
        g.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].children[0].style = {
            font: "bold 30px Arial",
            fill: "#000"
        };
        b = a.mainRenderer.createButton(g.info.container.getChildByName("coef_btns"),
            -528, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType + "-mobile-min", {
                text: "#1 " + mainLocalizationTable.lottoLowRisk,
                align: "center",
                style: {font: "bold 30px Arial", fill: "#b1b1b1"}
            });
        b.name = "coef_btn_1";
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
            text: "#1 " + mainLocalizationTable.lottoLowRisk,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#444"}
        }, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            n(a.mainGameManager.coefMode, 1);
            a.mainGameManager.coefMode =
                1;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            I(a, "coef_btn_selected_1")
        }, function (a) {
            H(a, "coef_btn_selected_1")
        }).alpha = 0;
        b = a.mainRenderer.createButton(g.info.container.getChildByName("coef_btns"), -172, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType + "-mobile-min", {
            text: "#2 " + mainLocalizationTable.lottoNormRisk,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#b1b1b1"}
        });
        b.name = "coef_btn_2";
        a.mainRenderer.createButton(b,
            0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
                text: "#2 " + mainLocalizationTable.lottoNormRisk,
                align: "center",
                style: {font: "bold 30px Arial", fill: "#444"}
            }, function (b, c) {
                a.mainSoundManager.playSound("buttonClick");
                c.stopped = !0;
                n(a.mainGameManager.coefMode, 2);
                a.mainGameManager.coefMode = 2;
                a.mainUIManager.redrawCoefTable();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                I(a, "coef_btn_selected_2")
            }, function (a) {
                H(a, "coef_btn_selected_2")
            }).alpha = 0;
        b = a.mainRenderer.createButton(g.info.container.getChildByName("coef_btns"),
            184, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType + "-mobile-min", {
                text: "#3 " + mainLocalizationTable.lottoHighRisk,
                align: "center",
                style: {font: "bold 30px Arial", fill: "#b1b1b1"}
            });
        b.name = "coef_btn_3";
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
            text: "#3 " + mainLocalizationTable.lottoHighRisk,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#444"}
        }, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            n(a.mainGameManager.coefMode, 3);
            a.mainGameManager.coefMode =
                3;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            I(a, "coef_btn_selected_3")
        }, function (a) {
            H(a, "coef_btn_selected_3")
        }).alpha = 0;
        g.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].alpha = 1;
        g.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].interactive = !1;
        g.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" +
            a.mainGameManager.coefMode).children[1].children[0].style = {font: "bold 30px Arial", fill: "#000"};
        b = a.mainRenderer.createButton(g.info.container, -1, 40, "coef_bg");
        b.name = "coef_bg";
        b.anchor.set(.5, .5);
        a.mainRenderer.createButton(g.info.container.getChildByName("coef_bg"), -301.5, -255, void 0, {
            text: mainLocalizationTable.guessedBalls.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial", fill: "#ffaa06", align: "center"}
        });
        a.mainRenderer.createButton(g.info.container.getChildByName("coef_bg"), 50, -255, void 0,
            {
                text: mainLocalizationTable.coefficient.toUpperCase(),
                align: "center",
                style: {font: "bold 30px Arial", fill: "#ffaa06", align: "center"}
            });
        a.mainRenderer.createButton(g.info.container.getChildByName("coef_bg"), 351.5, -255, void 0, {
            text: mainLocalizationTable.win.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial", fill: "#ffaa06", align: "center"}
        });
        var x = function (a) {
            return {
                ru: {
                    intro: "\u0412 \u0431\u0438\u043b\u0435\u0442\u0435 2 \u041f\u043e\u043b\u044f.\n\u0412 1-\u043e\u043c \u041f\u043e\u043b\u0435 \u2014 \u0447\u0438\u0441\u043b\u0430 \u043e\u0442 1 \u0434\u043e 36, \n\u0432\u043e 2-\u043e\u043c \u041f\u043e\u043b\u0435  \u2014 \u0447\u0438\u0441\u043b\u0430 1, 2, 3.",
                    rule1: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 6 \u043d\u0435 \u043f\u043e\u0432\u0442\u043e\u0440\u044f\u044e\u0449\u0438\u0445\u0441\u044f \u0447\u0438\u0441\u0435\u043b \u0432 1-\u043e\u043c \u041f\u043e\u043b\u0435 (\u041f\u043e\u043b\u0435 1) \n\u0438 \u043e\u0434\u043d\u043e \u0447\u0438\u0441\u043b\u043e \u0432\u043e 2-\u043e\u043c \u041f\u043e\u043b\u0435 (\u041f\u043e\u043b\u0435 2).",
                    rule2: "\u041f\u043e\u043b\u0435 2 - \u0412\u044b \u0432\u044b\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u0442\u0438\u043f\u044b \u0412\u044b\u0438\u0433\u0440\u044b\u0448\u0435\u0439 \n#1 - \u0412\u044b\u0438\u0433\u0440\u044b\u0448\u0438 \u0447\u0430\u0441\u0442\u044b\u0435, \u043d\u043e \u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0438\u0435",
                    rule3: "#2 - \u0412\u044b\u0438\u0433\u0440\u044b\u0448\u0438 \u0440\u0435\u0436\u0435, \u043d\u043e \u043a\u0440\u0443\u043f\u043d\u0435\u0435 , \u0447\u0435\u043c \u0432 #1.",
                    rule4: "#3 - \u0412\u044b\u0438\u0433\u0440\u044b\u0448\u0438 \u0440\u0435\u0434\u043a\u0438\u0435, \u043d\u043e \u043e\u0447\u0435\u043d\u044c \u043a\u0440\u0443\u043f\u043d\u044b\u0435, \u0431\u043e\u043b\u044c\u0448\u0435 \u0447\u0435\u043c \u0432 #1 \u0438 #2.",
                    rule5: "\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043e\u0434\u0438\u043d \u0431\u0438\u043b\u0435\u0442 \u0438\u043b\u0438 \u0441\u0440\u0430\u0437\u0443 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e.\n\u0421 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u043d\u043e\u043f\u043a\u0438 \u201c\u0420\u0430\u043d\u0434\u043e\u043c\u201d  \u043c\u043e\u0436\u043d\u043e \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u0441\u043b\u0443\u0447\u0430\u0439\u043d\u0443\u044e \n\u043a\u043e\u043c\u0431\u0438\u043d\u0430\u0446\u0438\u044e \u0447\u0438\u0441\u0435\u043b.",
                    rule6: "\u0414\u043b\u044f \u0443\u0447\u0430\u0441\u0442\u0438\u044f \u0432 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u0440\u0430\u0443\u043d\u0434\u0430\u0445 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0410\u0432\u0442\u043e \u043f\u043e\u0432\u0442\u043e\u0440 \n\u0438 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u043e\u043b-\u0432\u043e."
                }, en: {
                    intro: "In the ticket  2 fields.\nIn 1-st field \u2014 numbers from 1 to 36,\nin 2-nd field \u2014 numbers 1, 2, 3.",
                    rule1: "You choose 6 non- repeating in 1-st field and \none number in 2-nd. Field.",
                    rule2: "Field 2 - You choose type of winning. \n#1 \u2013 Winnings are frequent but small.",
                    rule3: "#2 \u2013 Winnings less often but larger than in  #1.",
                    rule4: "#3 - Winnings are seldom but very large more then #1 and #2.",
                    rule5: "You can  fill out o one ticket or several at once.\nUsing the \u201cRandom\u201d button, you can select a random \ncombination of numbers.",
                    rule6: "To participate in multiple rounds, you select Auto Repeat \nmany rounds."
                },
                es: {
                    intro: "El boleto tiene 2 campos.\nEn el 1er campo - n\u00fameros del 1 al 36, \nen el segundo campo - n\u00famero 1, 2, 3.",
                    rule1: "En el primer campo, escoja 6 n\u00fameros que no se repitan y\n1 n\u00famero en el segundo campo (campo 2).",
                    rule2: "Campo 2: usted escoge el tipo de ganancia. \n#1: Ganancias seguidas pero peque\u00f1as.",
                    rule3: "#2: Ganancias menos frecuentes, pero m\u00e1s altas que en el #1.",
                    rule4: "#3: Ganancias poco frecuentes, pero muy altas que en el #1 y #2.",
                    rule5: "Usted puede llenar un boleto o varios a la vez.\nCon ayuda del bot\u00f3n (random) puede elegir la combinaci\u00f3n \nde n\u00fameros aleatorios.",
                    rule6: "Para participar en varias rondas elija AUTOREPETICION, \ny escoja la cantidad."
                }, pt: {
                    intro: "No bilhete, h\u00e1 2 campos.\nNo 1\u00ba campo - n\u00fameros de 1 a 36,\nno 2\u00ba campo - n\u00fameros 1, 2, 3.",
                    rule1: "Voc\u00ea escolhe 6 n\u00fameros n\u00e3o repetidos no 1\u00ba campo e\num n\u00famero no 2\u00ba campo.",
                    rule2: "Campo 2 - Voc\u00ea escolhe o tipo de pr\u00eamio.\n# 1 - Os pr\u00eamios s\u00e3o frequentes, mas pequenos.",
                    rule3: "# 2 - Os pr\u00eamios s\u00e3o menos frequentes, mas maiores do que no # 1.",
                    rule4: "# 3 - Os pr\u00eamios s\u00e3o raros, mas muito maiores do que no # 1 e # 2.",
                    rule5: "Voc\u00ea pode preencher um ou v\u00e1rios bilhetes de uma vez.\nUsando o bot\u00e3o 'Aleat\u00f3rio', voc\u00ea pode selecionar uma combina\u00e7\u00e3o \naleat\u00f3ria de n\u00fameros.",
                    rule6: "Para participar de v\u00e1rios sorteios, escolha a op\u00e7\u00e3o de 'Repeti\u00e7\u00e3o Autom\u00e1tica' \npara v\u00e1rios sorteios."
                }, fr: {
                    intro: "Dans le billet, il y a 2 champs.\nDans le 1er champ - des chiffres de 1 \u00e0 36,\ndans le 2\u00e8me champ - des chiffres 1, 2, 3.",
                    rule1: "Vous choisissez 6 num\u00e9ros non r\u00e9p\u00e9titifs dans le 1er champ et\n un num\u00e9ro dans le 2\u00e8me champ.",
                    rule2: "Champ 2 - Vous choisissez le type de gains.\n#1 - Les gains sont fr\u00e9quents mais faibles.",
                    rule3: "#2 - Les gains sont moins fr\u00e9quents mais plus importants que dans #1.",
                    rule4: "#3 - Les gains sont rares, mais tr\u00e8s importants, plus qu'en #1 et #2.',",
                    rule5: "Vous pouvez remplir un seul billet ou plusieurs \u00e0 la fois. \nEn utilisant le bouton \u201cAl\u00e9atoire\u201d, vous pouvez s\u00e9lectionner une \ncombinaison de nombres al\u00e9atoire.",
                    rule6: "Pour participer \u00e0 plusieurs tours, vous s\u00e9lectionnez\nla R\u00e9p\u00e9tition automatique pour plusieurs tours."
                }, kz: {
                    intro: "\u0411\u0438\u043b\u0435\u0442\u0442\u0435 2 \u04e9\u0440\u0456\u0441\u0442\u0456 \u0431\u0430\u0440.\n1-\u0448\u0456 \u04e9\u0440\u0456\u0441\u0442\u0442\u0435 1-\u0434\u0435\u043d 36-\u0433\u0435 \u0434\u0435\u0439\u0456\u043d \u0441\u0430\u043d\u0434\u0430\u0440,\n2-\u0448\u0456 \u04e9\u0440\u0456\u0441\u0442\u0442\u0435 1, 2, 3 \u0441\u0430\u043d\u0434\u0430\u0440\u044b.",
                    rule1: "\u0411\u0456\u0440\u0456\u043d\u0448\u0456 \u04e9\u0440\u0456\u0441\u0442\u0435 6 \u0446\u0438\u0444\u0440\u0434\u044b \u0442\u0430\u04a3\u0434\u0430\u0439\u0441\u044b\u0437, \u0435\u043a\u0456\u043d\u0448\u0456 \u04e9\u0440\u0456\u0441\u0442\u0435 \u0431\u0456\u0440 \u0441\u0430\u043d\u0434\u044b \u0442\u0430\u04a3\u0434\u0430\u0439\u0441\u044b\u0437",
                    rule2: "2-\u04e9\u0440\u0456\u0441 - \u0416\u0435\u04a3\u0456\u0441 \u0442\u04af\u0440\u043b\u0435\u0440\u0456\u043d \u0442\u0430\u04a3\u0434\u0430\u0439\u0441\u044b\u0437\n#1 - \u04b1\u0442\u044b\u0441\u0442\u0430\u0440 \u0436\u0438\u0456, \u0431\u0456\u0440\u0430\u049b \u0430\u0437",
                    rule3: "#2 - \u04b1\u0442\u044b\u0441\u0442\u0430\u0440 \u0430\u0437\u044b\u0440\u0430\u049b, \u0431\u0456\u0440\u0430\u049b \u21161-\u0433\u0435 \u049b\u0430\u0440\u0430\u0493\u0430\u043d\u0434\u0430 \u043a\u04e9\u0431\u0456\u0440\u0435\u043a.",
                    rule4: "#3 - \u04b1\u0442\u044b\u0441\u0442\u0430\u0440 \u0441\u0438\u0440\u0435\u043a, \u0431\u0456\u0440\u0430\u049b \u04e9\u0442\u0435 \u04af\u043b\u043a\u0435\u043d, \u21161 \u0436\u04d9\u043d\u0435 \u21162-\u0434\u0435\u043d \u043a\u04e9\u043f.",
                    rule5: '\u0411\u0456\u0440 \u0431\u0438\u043b\u0435\u0442\u0442\u0456 \u043d\u0435\u043c\u0435\u0441\u0435 \u0431\u0456\u0440\u043d\u0435\u0448\u0435 \u0431\u0438\u043b\u0435\u0442\u0442\u0456 \u0431\u0456\u0440\u0434\u0435\u043d \u0442\u043e\u043b\u0442\u044b\u0440\u0443\u0493\u0430 \u0431\u043e\u043b\u0430\u0434\u044b.\n"\u041a\u0435\u0437\u0434\u0435\u0439\u0441\u043e\u049b" \u0442\u04af\u0439\u043c\u0435\u0441\u0456\u043d \u043f\u0430\u0439\u0434\u0430\u043b\u0430\u043d\u044b\u043f, \u043a\u0435\u0437\u0434\u0435\u0439\u0441\u043e\u049b \n\u0441\u0430\u043d\u0434\u0430\u0440\u0434\u044b\u04a3 \u043a\u043e\u043c\u0431\u0438\u043d\u0430\u0446\u0438\u044f\u0441\u044b\u043d \u0442\u0430\u04a3\u0434\u0430\u0443\u0493\u0430 \u0431\u043e\u043b\u0430\u0434\u044b.',
                    rule6: '\u0411\u0456\u0440\u043d\u0435\u0448\u0435 \u0440\u0430\u0443\u043d\u0434\u049b\u0430 \u049b\u0430\u0442\u044b\u0441\u0443 \u04af\u0448\u0456\u043d "\u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0442\u044b" \u049b\u0430\u0439\u0442\u0430\u043b\u0430\u0443\u0434\u044b \u0442\u0430\u04a3\u0434\u0430\u04a3\u044b\u0437 \n\u0436\u04d9\u043d\u0435 \u0430\u0439\u043d\u0430\u043b\u044b\u043c\u0434\u0430\u0440 \u0441\u0430\u043d\u044b\u043d \u0442\u0430\u04a3\u0434\u0430\u04a3\u044b\u0437.'
                }, ku: {
                    intro: "\u0644\u0647\u200c \u062a\u06cc\u06a9\u0647\u200c\u062f\u0627 2 \u0641\u06cc\u0644\u062f \u0647\u0647\u200c\u06cc\u0647.\n\u0644\u0647\u200c \u06cc\u0647\u200c\u06a9\u0647\u200c\u0645\u06cc \u0641\u06cc\u0644\u062f\u062f\u0627 \u0698\u0645\u0627\u0631\u0647\u200c\u0643\u0627\u0646\u06cc 1 \u0628\u06c6 36 \u0647\u0647\u200c\u06cc\u0647\u060c\n\u0644\u0647\u200c \u06cc\u0647\u200c\u0643\u0647\u200c\u0645\u06cc \u0641\u06cc\u0644\u062f\u062f\u0627 \u0698\u0645\u0627\u0631\u0647\u200c\u0643\u0627\u0646\u06cc 1\u060c 2\u060c 3 \u0647\u0647\u200c\u06cc\u0647.",
                    rule1: "\u062a\u0648 \u0644\u0647\u200c \u06cc\u0647\u200c\u06a9\u0647\u200c\u0645\u06cc \u0641\u06cc\u0644\u062f\u062f\u0627 \u0666 \u0698\u0645\u0627\u0631\u0647\u200c\u06cc \u0647\u0647\u200c\u0631\u062f\u0648\u0648 \u0633\u0647\u200c\u0631\u0647\u200c\u0648\u0647\u200c \u062a\u06cc\u0628\u06cc\u0646\u06cc\u0628\u0648\u0648\u0647\u200c\n \u067e\u0647\u200c\u06cc\u0648\u0647\u200c\u0646\u062f\u06cc\u062a\u060c \u0648 \u06cc\u06a9 \u0698\u0645\u0627\u0631\u0647\u200c\u06cc \u0647\u0647\u200c\u0631\u062f\u0648\u0648\u06a9\u06cc \u0626\u0647\u200c\u0648\u0647\u200c\u06cc \u062f\u0648\u0648\u0647\u200c\u0645 \u0641\u06cc\u0644\u062f.",
                    rule2: "\u0641\u06cc\u0644\u062f\u06cc \u062f\u0648\u0648\u0647\u200c\u0645 - \u062a\u06cc\u067e\u06cc \u062e\u06c6\u0632\u0645\u0647\u200c\u062a\u06af\u06cc\u0631\u06a9\u0631\u062f\u0646 \u062f\u0647\u200c\u0633\u062a \u062f\u0647\u200c\u0628\u06cc\u0646\u06cc\u0646.\n#1 - \u062e\u06c6\u0632\u0645\u0647\u200c\u062a\u06af\u06cc\u0631\u06cc \u0632\u0648\u0631 \u0632\u06c6\u0631, \u0628\u06c6 \u0647\u0647\u200c\u0698\u0627\u0631\u06cc\u06a9\u0631\u062f\u0646\u06cc \u06a9\u0686\u06a9.",
                    rule3: "#2 - \u062a\u06cc\u067e\u06cc \u062e\u06c6\u0632\u0645\u0647\u200c\u062a\u06af\u06cc\u0631\u06a9\u0631\u062f\u0646 \u0626\u0627\u0633\u0627\u06cc\u06a9\u0648\u062a\u0631 \u0628\u0648\u0648\u0646\u0647\u200c\u0648\u0647\u200c \u0644\u0647\u200c\u06a9\u0627\u062a\u06cc \u0647\u0647\u200c\u0698\u0627\u0631\u06cc\u06a9\u0631\u062f\u0646\u06cc \u06a9\u0686\u06a9\u062a\u0631\u06cc #1",
                    rule4: "#3 - \u062a\u06cc\u067e\u06cc \u062e\u06c6\u0632\u0645\u0647\u200c\u062a\u06af\u06cc\u0631\u06a9\u0631\u062f\u0646 \u0628\u0643\u0648\u0648\u0646\u0647\u200c\u0648\u0647\u200c \u0648\u0647\u200c\u06a9\u0648\u0648, \u0628\u06c6\u06cc \u0628\u06c6\u0647\u0647\u200c\u0631 \u0647\u0647\u200c\u0631\u062f\u0648\u0648 #1 \u0648 #2",
                    rule5: "\u062a\u06c6 \u0641\u0642\u0637 \u06cc\u0647\u200c\u0643\u0647\u200c\u0645\u0647\u200c\u0643\u06cc \u0643\u0627\u0631\u062a\u06cc\u06cc\u0647\u200c\u0643 \u0628\u06c6 \u0647\u0647\u200c\u0631\u0648\u0647\u200c\u0647\u0627 \u064a\u0627\u0646 \u0644\u0647\u200c\u0645\u0647\u200c\u0643\u0627\u062a\u062f\u0627 \u0626\u0647\u200c\u0646\u062f\u0627\u0645\n \u0628\u0648\u0648\u0646 \u0647\u0647\u200c\u0645\u0648\u0648 \u0643\u0627\u0631\u062a\u0647\u200c\u0643\u06cc\u0627\u0646\u06ce\u062a. \u0628\u06c6 \u0626\u0647\u200c\u0648\u0647\u200c\u06cc \u0647\u0647\u200c\u0631 \u0643\u0627\u062a\u06cc \u062e\u06c6\u0645\u0647\u200c\u0646\u062f\u0627\u0646\u0647\u200c \u0626\u0647\u200c\u06a9\u0647\u200c\u06cc\u0646\u06cc\u0648\u06d5\u060c \u062f\u0648\u06af\u0645\u0647\u200c\u06cc\n \u201c\u0647\u0647\u200c\u06b5\u0628\u0698\u0627\u0631\u062f\u0646\u06cc \u0647\u0647\u200c\u06b5\u0647\u200c\u0648\u0647\u200c\u201d \u0628\u06c6 \u0647\u0647\u200c\u06b5\u0647\u200c\u0648\u0647\u200c\u0643\u0631\u062f\u0646\u06cc \u0628\u06a9\u0647\u200c\u06cc\u0646 \u0628\u0647\u200c\u0698\u0645\u0627\u0631\u0647\u200c\u0643\u0627\u0646",
                    rule6: "\u0628\u06c6 \u0626\u0647\u200c\u0646\u062f\u0627\u0645 \u0628\u0648\u0648\u0646 \u0628\u0647\u200c \u0644\u0647\u200c \u0686\u0647\u200c\u0646\u062f\u06cc\u0646 \u062f\u0648\u0631\u06ce\u062a\u06cc \u0632\u06cc\u0627\u062a\u0631 \u0647\u0647\u200c\u0644\u0628\u0698\u06ce\u0631\u06cc \u0634\u062a\u06af\u06cc\u0631\u06cc \u062e\u06c6\u06a9\u0627\u0631 \u0643\u0647"
                }
            }["ru en es pt kz fr ku".split(" ").includes(mainLocalizator.currentLang()) ? mainLocalizator.currentLang() : "en"][a]
        };
        (function (c) {
            c =
                new MaskedSprite(a.mainRenderer.createButton(c, 0, 0), {
                    mask: {
                        x: -539,
                        y: -274,
                        width: 1070,
                        height: 675
                    }, needScrolling: {}
                }, a.mainRenderer.renderManager);
            c.srcSprite.interactive = !0;
            c.srcSprite.hitArea = new PIXI.Rectangle(-529, -284, 1061, 706);
            c = c.containerForScroll;
            var d = {font: "bold 34px Arial", fill: "#ffffff"}, e = {font: "bold 34px Arial", fill: "#fca903"},
                f = {font: "bold 76px Arial", fill: "#c20317"};
            a.mainRenderer.createButton(c, -520, -215, void 0, {text: x("intro"), align: "left", style: d});
            a.mainRenderer.createButton(c, -520,
                -120, void 0, {text: "1.", align: "left", style: e});
            a.mainRenderer.createButton(c, -485, -100, void 0, {text: x("rule1"), align: "left", style: d});
            b = a.mainRenderer.createButton(c, 0, 230, "rules_1");
            b.scale.set(.75, .75);
            b.anchor.set(.5, .5);
            a.mainRenderer.createButton(b, 465, "blue" == a.configType ? 115 : 160, void 0, {text: "1", style: f});
            a.mainRenderer.createButton(b, 465, 290, void 0, {text: "2", style: f});
            a.mainRenderer.createButton(c, -520, 549, void 0, {text: "2.", align: "left", style: e});
            a.mainRenderer.createButton(c, -485, 569, void 0,
                {text: x("rule2"), align: "left", style: d});
            b = a.mainRenderer.createButton(c, 0, 939, "rules_2");
            b.scale.set(.95, .95);
            b.anchor.set(.5, .5);
            a.mainRenderer.createButton(c, -485, 1283, void 0, {text: x("rule3"), align: "left", style: d});
            b = a.mainRenderer.createButton(c, 0, 1633, "rules_3");
            b.scale.set(.95, .95);
            b.anchor.set(.5, .5);
            a.mainRenderer.createButton(c, -485, 1977, void 0, {text: x("rule4"), align: "left", style: d});
            b = a.mainRenderer.createButton(c, 0, 2327, "rules_4");
            b.scale.set(.95, .95);
            b.anchor.set(.5, .5);
            a.mainRenderer.createButton(c,
                -520, 2681, void 0, {text: "3.", align: "left", style: e});
            a.mainRenderer.createButton(c, -485, 2721, void 0, {text: x("rule5"), align: "left", style: d});
            b = a.mainRenderer.createButton(c, 0, 2857, "rules_5");
            b.scale.set(.95, .95);
            b.anchor.set(.5, .5);
            a.mainRenderer.createButton(c, -520, 2981, void 0, {text: "4.", align: "left", style: e});
            a.mainRenderer.createButton(c, -485, 3001, void 0, {text: x("rule6"), align: "left", style: d});
            b = a.mainRenderer.createButton(c, 0, 3217, "rules_6");
            b.scale.set(1.2, 1.2);
            b.anchor.set(.5, .5);
            b = a.mainRenderer.createButton(c,
                0, 3397, "rules_7");
            b.scale.set(1.2, 1.2);
            b.anchor.set(.5, .5);
            c.emit("updateHeight")
        })(g.rules.container);
        b = null;
        a.mainRenderer.stage.addChild(l);
        a.mainRenderer.stage.addChild(J);
        a.mainRenderer.stage.addChild(ba);
        a.mainRenderer.stage.addChild(C);
        a.mainRenderer.stage.addChild(m);
        g.game.container.addChild(E);
        a.mainRenderer.createButton(E, 0, 40 - a.gameConfig[a.configType].gridOffsetY, "grid_bg").anchor.set(.5, .5);
        for (f in w) g.game.container.addChild(w[f]), a.mainRenderer.createButton(w[f], 0, 40 - a.gameConfig[a.configType].gridOffsetY,
            "grid_bg_copy").anchor.set(.5, .5), w[f].position.x -= 1200, w[f].isUsed = !1, w[f].isLast = !1;
        w[w.length - 1].isLast = !0;
        a.setMainGrid(new LottoGrid(-599 + a.gameConfig[a.configType].gridPos.x, -a.gameConfig[a.configType].gridOffsetY - 551 + 40 + a.gameConfig[a.configType].gridPos.y, 10, a.gameConfig[a.configType].zonesCount, a.gameConfig[a.configType].ballCount, E, a.mainRenderer));
        a.mainGrid.createZones(100, 100, {x: 6, y: 6}, {
            font: "50px Swiss721-CondensedBold",
            fill: a.gameConfig[a.configType].gridNumColor,
            align: "center"
        }, function (b,
                     c, d) {
            if (b.selected || !(a.mainGrid.pressedZones.length >= a.mainGrid.maxPreessedZones)) {
                c ? b.selected || (b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture) : a.mainGrid.gridContainer.down = !0;
                if (c && a.mainGrid.gridContainer.down || !c && !d || d && (b.name != P || void 0 == P)) b.selected ? (b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture, b.children[0].style = {
                    font: "50px Swiss721-CondensedBold",
                    fill: a.gameConfig[a.configType].gridNumColor,
                    align: "center"
                }, b.selected = !1, b.currentLayer =
                    !1, a.mainGrid.pressedZones.splice(a.mainGrid.pressedZones.indexOf(b), 1)) : (b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, b.children[0].style = {
                    font: "50px Swiss721-CondensedBold",
                    fill: "#000000",
                    align: "center"
                }, b.selected = !0, b.currentLayer = !0, a.mainSoundManager.playSound("firstChip"), a.mainGrid.pressedZones.push(b)), c = a.gameConfig[a.configType].ballCount - a.mainGrid.pressedZones.length, l.getChildByName("btn_plus").children[0].text = c, l.getChildByName("btn_plus").children[0].style =
                    {
                        font: "bold 110px Arial",
                        fill: "#595959",
                        align: "center"
                    }, 0 == c ? (l.getChildByName("btn_plus").interactive = !0, l.getChildByName("btn_plus").children[0].text = "+", l.getChildByName("btn_plus").children[0].style = {
                    font: "190px Arial",
                    fill: "#710006",
                    align: "center"
                }) : l.getChildByName("btn_plus").interactive = !1;
                d && (P = b.name);
                a.mainGrid.gridContainer.down && T();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }, function (b, c) {
            if (c) {
                if (!b.selected && !a.mainGrid.gridContainer.down) if (b.isLock && b.currentLayer) switch (b.isLock) {
                    case 1:
                        b.texture =
                            a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                        break;
                    default:
                        b.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                } else b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture
            } else a.mainGrid.gridContainer.down = !1, P = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, !0);
        a.mainGrid.setRandomBetsCount(a.gameConfig[a.configType].ballCount);
        a.mainRenderer.stage.on("changeLang", W);
        a.mainGameManager.gameStateAsync(function (b) {
            a.mainGameManager.coefficients =
                b.coeftable;
            v.loadFromStorage();
            a.mainUIManager.drawCoefTable();
            var c = 0 >= b.t2 ? b.tir - 1 : b.tir;
            v.editions.length && v.editions[v.editions.length - 1].round === c || v.addEdition(c);
            if (v.editions.length && v.editions[v.editions.length - 1].round === c) {
                c = v.editions[v.editions.length - 1].betsHistory.bets;
                for (var d = 0, e = 0; e < c.length; e++) d += c[e].summ;
                a.mainFLGAccount.totalBet(d, !0);
                N = !0
            }
            Q = new hotcoldGraphsLottoNew({hot: b.hot, cold: b.cold}, g.stats, function (b, c) {
                var d = 0, e = 9;
                if (0 === c.children.length) {
                    var f = a.mainRenderer.createButton(c,
                        -1, 136, void 0, {
                            text: mainLocalizationTable.hotcoldRating.replace(/%s/g, 100).toUpperCase(),
                            align: "center",
                            style: {font: "bold 34px Arial", fill: "#ffffff", align: "center"}
                        });
                    f.anchor.set(.5, .5);
                    c = a.mainRenderer.createButton(c, -499, 176, "hotcold_bg");
                    var g = new PIXI.Container;
                    c.addChild(g);
                    var h = new PIXI.Container;
                    c.addChild(h);
                    for (var l in b.cold) {
                        if (5 < d) break;
                        f = new PIXI.Graphics;
                        f.position.set(93 + 153 * d, 188);
                        g.addChild(f);
                        f = new PIXI.Graphics;
                        f.position.set(93 + 153 * d, 499);
                        h.addChild(f);
                        f = a.mainRenderer.createButton(c,
                            169 + 153 * d, 156, void 0, {
                                text: "",
                                align: "center",
                                style: {font: "bold 50px Arial", fill: "#fe801b", align: "center"}
                            });
                        f.anchor.set(.5, .5);
                        f = a.mainRenderer.createButton(c, 160 + 153 * d, 48, void 0, {
                            text: b.hot[d][0],
                            align: "center",
                            style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                        });
                        f.anchor.set(.5, .5);
                        f = a.mainRenderer.createButton(c, 169 + 153 * d, 472, void 0, {
                            text: "",
                            align: "center",
                            style: {font: "bold 50px Arial", fill: "#9bccff", align: "center"}
                        });
                        f.anchor.set(.5, .5);
                        f = a.mainRenderer.createButton(c, 160 + 153 * d, 152,
                            void 0, {
                                text: b.cold[e][0],
                                align: "center",
                                style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                            });
                        f.anchor.set(.5, .5);
                        d++;
                        e--
                    }
                } else for (l in c = c.children[1], b.cold) {
                    if (5 < d) break;
                    c.children[4 * d + 2].children[0].text = "";
                    c.children[4 * d + 3].children[0].text = b.hot[d][0];
                    c.children[4 * d + 4].children[0].text = "";
                    c.children[4 * d + 5].children[0].text = b.cold[e][0];
                    d++;
                    e--
                }
            }, function (a, b) {
            });
            Q.draw();
            v.events.emit("GRID_STATS", {hot: b.hot, cold: b.cold});
            v.drawEditions();
            F.drawCustomJackpot(function (b, c) {
                if (c) {
                    var d =
                        l.getChildByName("JackpotContainer"), e = utils.formatNumber(c);
                    if (d) {
                        c = d.children[1];
                        var f = d.children[2];
                        d = d.children[3];
                        d.children[0].text = e
                    } else c = new PIXI.Graphics, c.beginFill(0, .6), c.drawRect(1174, 190, 432, 150), c.endFill, l.addChild(c), d = a.mainRenderer.createButton(l, 1244, 255), d.name = "JackpotContainer", a.mainRenderer.createButton(d, 155, -25, "jp_name").anchor.set(.5, .5), c = a.mainRenderer.createButton(d, 3, 3), f = a.mainRenderer.createButton(d, 0, 5), c.visible = !1, d = a.mainRenderer.createButton(d, 155, 45, void 0,
                        {
                            text: e,
                            style: {font: "bold 54px Arial", fill: "#d6d6d6", align: "center"}
                        }), d.anchor.set(.5, .5), d.children[0].anchor.set(.5, .5);
                    e = 0;
                    var g = c.position.x + d.children[0].width;
                    d = .8 * g / 10;
                    for (var h = .2 * g / 9, k = 0; 10 > k; k++) {
                        g = f.children[k];
                        switch (k) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                var p = 65280;
                                break;
                            case 7:
                            case 8:
                                p = 15973429;
                                break;
                            case 9:
                                p = 15352834
                        }
                        g ? (g.clear(), g.beginFill(p), g.drawRect(e, 0, d, 4), g.endFill) : (g = new PIXI.Graphics, g.beginFill(p), g.drawRect(e, 0, d, 4), g.endFill, f.addChild(g));
                        e += d + h;
                        g.visible =
                            k <= parseInt(b)
                    }
                    c.position.x += (3 - c.position.x) / 2 + 124;
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            });
            F.updateJackpotData(b);
            a.mainFLGAccount.autoplayManager.updateCallback = function (b) {
                if (!(2 > v.editions.length)) {
                    switch (b) {
                        case "repeatLastBet":
                            var c = b = -1;
                            var d = v.editions.length - 2;
                            break;
                        case "getOnlyBets":
                            c = b = void 0;
                            d = v.editions.length - 1;
                            break;
                        default:
                            b = v.editions[v.editions.length - 2].betsHistory.setTotalWin(), c = a.mainFLGAccount.balance(), d = v.editions.length - 2
                    }
                    a.mainFLGAccount.autoplayManager.update(v.editions[d].betsHistory.bets,
                        b, c, function (b) {
                            a.mainGameManager && 0 < b.length && (l.getChildByName("btn_random").children[0].interactive = !1, l.getChildByName("btn_plus").interactive = !1, v.getActedOutEdition().betsHistory.addBet(b, v.getActedOutEdition().round, function (a) {
                                function b(d) {
                                    k(a[d].bet, !1, function () {
                                        d++;
                                        d <= c && b(d)
                                    })
                                }

                                v.events.emit("GRID_STATS");
                                l.getChildByName("btn_random").children[0].interactive = !0;
                                l.getChildByName("btn_plus").interactive = !0;
                                var c = 4 > a.length ? a.length - 1 : 3;
                                b(0)
                            }))
                        }, v.editions[d].round)
                }
            };
            S(b);
            h && (h(), a.mainRenderer.renderManager.needUpdateRender =
                !0)
        })
    }, function () {
        a.mainSoundManager.playRandomBackSound()
    });
    var W = function () {
        a.mainFLGAccount.updateAccountText();
        v.redrawEditionHeader();
        v.drawBetsHeader();
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.onLanguageChange = W;
    this.setInteraction = function (c) {
        a.mainGrid.setZoneInteraction(c);
        l.getChildByName("btn_random").children[0].interactive = c;
        l.getChildByName("btn_plus").children[0].style = {
            font: "bold 110px Arial",
            fill: c ? "#595959" : "#d1d2d4",
            align: "center"
        };
        l.getChildByName("videoPlayBtn").visible =
            !1;
        l.getChildByName("videoPlayBtn").isPlay ? (l.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play_off.texture, l.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin_off.texture, l.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus_pressed.texture) : (l.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture,
            l.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture, l.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture);
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.drawCoefTable = function () {
        var c = 0;
        5 == a.gameConfig[a.configType].ballCount ? c = 72 : 6 == a.gameConfig[a.configType].ballCount && (c = 36);
        for (var d = 0; d < a.gameConfig[a.configType].ballCount; d++) {
            var h = a.mainRenderer.createButton(g.info.container.getChildByName("coef_bg"),
                -301.5, -267 + c + 72 * (d + 1), "coef_line_left");
            h.anchor.set(.5, .5);
            for (var l = 1; l <= a.gameConfig[a.configType].ballCount; l++) a.mainRenderer.createButton(g.info.container.getChildByName("coef_bg"), -480 + 60 * (l - 1), -267 + c + 72 * (d + 1), void 0, {
                text: l,
                align: "center",
                style: {font: "bold 40px Arial", fill: "#292929", align: "center"}
            });
            h = a.mainRenderer.createButton(g.info.container.getChildByName("coef_bg"), 50, -267 + c + 72 * (d + 1), "coef_line_middle");
            h.anchor.set(.5, .5);
            var k = a.mainGameManager.coefficients[a.mainGameManager.coefMode -
            1][a.gameConfig[a.configType].ballCount - d] / 100;
            var m = new PIXI.Container;
            m.name = "infoBallsContainer" + d;
            g.info.container.getChildByName("coef_bg").addChild(m);
            for (l = 1; l <= a.gameConfig[a.configType].ballCount - d; l++) h = a.mainRenderer.createButton(m, -480 + 60 * (l - 1), -267 + c + 72 * (d + 1), "ball"), h.anchor.set(.5, .5), h.scale.set(.75, .75);
            g.info.container.getChildByName("coef_bg").getChildByName("infoBallsContainer" + d).visible = k ? !0 : !1;
            h = a.mainRenderer.createButton(g.info.container.getChildByName("coef_bg"), -58, -267 +
                c + 72 * (d + 1), void 0, {
                text: k ? "X  " + formatFLGNums(k, !1) : "-",
                align: "left",
                style: {font: "bold 40px Arial", fill: "#ffffff", align: "left"}
            });
            h.name = "tbl_coef" + d;
            h = a.mainRenderer.createButton(g.info.container.getChildByName("coef_bg"), 351.5, -267 + c + 72 * (d + 1), "coef_line_right");
            h.anchor.set(.5, .5);
            h = a.mainRenderer.createButton(g.info.container.getChildByName("coef_bg"), 203, -267 + c + 72 * (d + 1), void 0, {
                text: k ? formatFLGNums(k * A.currentBet(), !1) : "-",
                align: "left",
                style: {font: "bold 40px Arial", fill: "#ffffff", align: "left"}
            });
            h.name = "tbl_win" + d
        }
    };
    this.redrawCoefTable = function () {
        for (var c, d = 0; d < a.gameConfig[a.configType].ballCount; d++) c = a.mainGameManager.coefficients[a.mainGameManager.coefMode - 1][a.gameConfig[a.configType].ballCount - d] / 100, g.info.container.getChildByName("coef_bg").getChildByName("tbl_coef" + d).children[0].text = c ? "X  " + formatFLGNums(c, !1) : "-", g.info.container.getChildByName("coef_bg").getChildByName("tbl_win" + d).children[0].text = c ? formatFLGNums(c * A.currentBet(), !1) : "-", g.info.container.getChildByName("coef_bg").getChildByName("infoBallsContainer" +
            d).visible = c ? !0 : !1
    };
    this.setTextHeaderScale = function (a) {
        12 < a.text.length ? a.scale.set(.65, .65) : 9 < a.text.length ? a.scale.set(.75, .75) : a.scale.set(1, 1)
    };
    this.setTextScale = function (a) {
        a.text == "MAX\n" + B ? a.scale.set(.5, .5) : a.scale.set(1, 1)
    };
    var T = function () {
            var c = 0;
            0 == a.gameConfig[a.configType].ballCount - a.mainGrid.pressedZones.length && 0 < a.mainGrid.pressedZones.length && 0 < A.currentBet() && (c = A.currentBet() * a.mainGameManager.coefficients[a.mainGameManager.coefMode - 1][a.mainGrid.pressedZones.length] / 100);
            a.mainFLGAccount.maxWin(c)
        },
        Z = 0, da = 0, S = function (c) {
            function d(c) {
                a.mainGameManager && (a.mainRenderer.stage.getChildByName("timer_main").children[0].text = R.getTimerText(), a.mainRenderer.renderManager.needUpdateRender = !0)
            }

            function f(c) {
                if (a.mainGameManager) {
                    if (N) N = !1; else {
                        a.mainFLGAccount.setWinTextVisible(!0);
                        a.mainGrid.removeSelectedBets();
                        for (var b in w) w[b].position.x = -1200, w[b].position.y = 0, w[b].scale.set(1, 1), w[b].isUsed = !1, w[b].isLast = !1;
                        w[w.length - 1].isLast = !0;
                        g.game.container.removeChild(E);
                        g.game.container.addChildAt(E,
                            0);
                        a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_transp.texture, {
                            font: "50px Swiss721-CondensedBold",
                            fill: a.gameConfig[a.configType].gridNumColor,
                            align: "center"
                        }, void 0, a.mainGrid.getIntArrayOfZones())
                    }
                    Q.update({hot: c.hot, cold: c.cold});
                    a.mainUIManager.setInteraction(!0);
                    v.addEdition(c.tir);
                    var f = [];
                    for (b = 1; b <= a.gameConfig[a.configType].ballCount; b++) f.push(c["b" + b]);
                    L.startDrawBalls(f, 1.55, 0);
                    1 < v.editions.length && v.drawDetailEditionHistory(g.history.container, v.editions.length -
                        2);
                    a.mainFLGAccount.autoplayManager.updateCallback();
                    a.mainFLGAccount.autoplayManager.settings.isStarted() || a.mainFLGAccount.autoplayManager.settings.repeatRoundNum() === v.editions[v.editions.length - 1].round ? (m.getChildByName("autoplay-bg2").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"], m.getChildByName("autoplay-bg2").getChildByName("repeat").children[0].interactive = !1) : (m.getChildByName("autoplay-bg2").getChildByName("repeat").texture =
                        a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand2"], m.getChildByName("autoplay-bg2").getChildByName("repeat").children[0].interactive = !0);
                    l.getChildByName("btn_autoplay").getChildByName("autoplay_remain_num").children[0].text = 0 == a.mainFLGAccount.autoplayManager.settings.count() ? "" : a.mainFLGAccount.autoplayManager.settings.count();
                    a.mainFLGAccount.autoplayManager.settings.isStarted() ? (m.getChildByName("autoplay-bg2").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRemainingNumber +
                        ": " + a.mainFLGAccount.autoplayManager.settings.count(), m.getChildByName("autoplay-bg2").getChildByName("autoplayDesc2").visible = !1, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num5").visible = !1, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num10").visible = !1, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num50").visible = !1, m.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").children[0].text = a.mainFLGAccount.autoplayManager.settings.count(), m.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").visible =
                        !0, m.getChildByName("autoplay-bg2").getChildByName("autoplay-stop").visible = !0) : (m.getChildByName("autoplay-bg2").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRoundNumber, m.getChildByName("autoplay-bg2").getChildByName("autoplayDesc2").visible = !0, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num5").visible = !0, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num10").visible = !0, m.getChildByName("autoplay-bg2").getChildByName("autoplay-num50").visible =
                        !0, m.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").visible = !1, m.getChildByName("autoplay-bg2").getChildByName("autoplay-stop").visible = !1);
                    a.mainRenderer.stage.getChildByName("round_main").children[0].text = "# " + (c.tir - 1);
                    R.start({
                        minutes: 0,
                        seconds: (c.time_round ? c.time_round : a.gameConfig[a.configType].tirTime) - a.gameConfig[a.configType].timerOffset - c.t2
                    }, {
                        minutes: 0,
                        seconds: (c.time_round ? c.time_round : a.gameConfig[a.configType].tirTime) - a.gameConfig[a.configType].timerOffset
                    }, d, function () {
                        a.mainGameManager &&
                        (a.mainGrid.removeCurrentBets(), a.mainGrid.removeFuckingHoverTexture(), L.removeBalls(), a.mainUIManager.setInteraction(!1), a.mainSoundManager.playSound("endBet"))
                    }, X, S);
                    v.events.emit("BET_TIME", {hot: c.hot, cold: c.cold})
                }
            }

            function h(c) {
                function b() {
                    a.mainGameManager && (a.mainGameManager.gameStateAsync(d), a.mainRenderer.renderManager.needUpdateRender = !0)
                }

                function d(c) {
                    function d(b) {
                        if (a.mainGrid && a.mainGameManager) if (k >= h.length) b(); else {
                            var c = h.slice(0, k + 1), e = "resultBalls" + k, f = a.mainGrid.zones[parseInt(h[k]) -
                            1];
                            a.mainUIManager.simpleFlipXFunc(f, e, 300, 300, function (b) {
                                b.getChildByName("text" + b.name).style = {
                                    font: "50px Swiss721-CondensedBold",
                                    fill: "#000",
                                    align: "center"
                                };
                                b.texture = b.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                            });
                            L.startDrawBalls(c, 1.55, 0);
                            v.cancelLastEdition(c);
                            k += 1;
                            setTimeout(function () {
                                d(b)
                            }, 900)
                        }
                    }

                    if (a.mainGameManager) if (0 === c.b1 || 99 === c.b1) setTimeout(b, 2E3); else {
                        var h = [c.b1, c.b2, c.b3, c.b4, c.b5];
                        5 < a.gameConfig[a.configType].ballCount &&
                        h.push(c.b6);
                        6 < a.gameConfig[a.configType].ballCount && h.push(c.b7);
                        var k = limit(f, 0, a.gameConfig[a.configType].ballCount - 1);
                        if (0 !== k) {
                            var m;
                            for (m = 0; m <= k; m++) {
                                var p = "resultBalls" + m, n = a.mainGrid.zones[parseInt(h[m]) - 1];
                                a.mainUIManager.simpleFlipXFunc(n, p, 450, 450, function (b) {
                                    b.getChildByName("text" + b.name).style = {
                                        font: "50px Swiss721-CondensedBold",
                                        fill: "#000",
                                        align: "center"
                                    };
                                    b.texture = b.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                                })
                            }
                        }
                        d(function () {
                            a.mainFLGAccount.calculateWin(v.getActedOutEdition().betsHistory.bets,
                                a.gameConfig[a.configType].appName, function () {
                                    v.getActedOutEdition().betsHistory.setTotalWin(a.mainFLGAccount.totalWin());
                                    v.getActedOutEdition().betsHistory.redrawCurrentBets();
                                    var b = a.gameConfig.winShowTime ? a.gameConfig.winShowTime : 6E3;
                                    Z = setTimeout(S, b);
                                    c.t2 = 80;
                                    F.updateJackpotData(c);
                                    F.drawJackpotWin(2E4, {
                                        x: 602,
                                        y: 527
                                    }, a.mainRenderer.resourceLoader.resources.JP.texture, a.mainFLGAccount.totalWin(), a.mainRenderer.resourceLoader.resources.jp_only.texture);
                                    g.video.button.pressed ? setTimeout(function () {
                                        l.getChildByName("videoPlayBtn").visible =
                                            !1;
                                        l.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture;
                                        l.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture;
                                        l.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture;
                                        l.getChildByName("videoPlayBtn").isPlay = !1;
                                        g.game.button.emit("mousedown");
                                        a.mainFLGAccount.winToBalanceAnimation(b - 2E3, 2E3, {
                                                x: 602,
                                                y: 527
                                            }, a.mainRenderer.resourceLoader.resources.WIN.texture,
                                            {
                                                font: "bold 70px Arial",
                                                fill: "#bcbcbc",
                                                scale: 1.25,
                                                withImages: !0
                                            }, F.jpWin())
                                    }, 2E3) : a.mainFLGAccount.winToBalanceAnimation(b, 2E3, {
                                        x: 602,
                                        y: 527
                                    }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                        font: "bold 70px Arial",
                                        fill: "#bcbcbc",
                                        scale: 1.25,
                                        withImages: !0
                                    }, F.jpWin())
                                }, a.gameConfig);
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        })
                    }
                }

                if (a.mainGameManager) {
                    v.events.emit("RESULT_TIME");
                    1 < v.editions.length && v.drawDetailEditionHistory(g.history.container, v.editions.length - 2);
                    a.mainRenderer.stage.getChildByName("round_main").children[0].text =
                        "# " + (c.tir - 1);
                    var f = c.time_wait - parseInt(c.t2, 10) - 1;
                    0 > f ? setTimeout(b, 1E3 * -f) : b();
                    a.mainUIManager.setInteraction(!1);
                    N ? (c = a.mainFLGAccount.totalBet(), a.mainFLGAccount.setWinTextVisible(!1), a.mainFLGAccount.totalBet(c, !0), N = !1) : a.mainFLGAccount.setWinTextVisible(!1)
                }
            }

            function k(a) {
                0 >= a.t2 ? h(a) : f(a)
            }

            void 0 != a.mainGameManager && (c ? k(c) : a.mainGameManager.gameStateAsync(k))
        };
    this.drawGridHotCold = function (c) {
        if (K.prevGmState || c) {
            var d = K.prevGmState;
            if (d) {
                for (var f = 0, g = 9; 6 > f; f++, g--) 0 != d.hot[f][0] && 99 != d.hot[f][0] &&
                a.mainGrid.zones[parseInt(d.hot[f][0], 10) - 1].getChildByName("zone_hot") && (a.mainGrid.zones[parseInt(d.hot[f][0], 10) - 1].getChildByName("zone_hot").visible = !1), 0 != d.cold[g][0] && 99 != d.cold[g][0] && a.mainGrid.zones[parseInt(d.cold[g][0], 10) - 1].getChildByName("zone_cold") && (a.mainGrid.zones[parseInt(d.cold[g][0], 10) - 1].getChildByName("zone_cold").visible = !1);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
            c && (d = c, K.prevGmState = c);
            if (K.needShow) {
                f = 0;
                for (g = 9; 6 > f; f++, g--) 0 != d.hot[f][0] && 99 != d.hot[f][0] &&
                (a.mainGrid.zones[parseInt(d.hot[f][0], 10) - 1].getChildByName("zone_hot") ? a.mainGrid.zones[parseInt(d.hot[f][0], 10) - 1].getChildByName("zone_hot").visible = !0 : (a.mainRenderer.createButton(a.mainGrid.zones[parseInt(d.hot[f][0], 10) - 1], 0, 0, "zone_hot"), a.mainGrid.zones[parseInt(d.hot[f][0], 10) - 1].getChildByName("zone_hot").anchor.set(.5, .5))), 0 != d.cold[g][0] && 99 != d.cold[g][0] && (a.mainGrid.zones[parseInt(d.cold[g][0], 10) - 1].getChildByName("zone_cold") ? a.mainGrid.zones[parseInt(d.cold[g][0], 10) - 1].getChildByName("zone_cold").visible =
                    !0 : (a.mainRenderer.createButton(a.mainGrid.zones[parseInt(d.cold[g][0], 10) - 1], 0, 0, "zone_cold"), a.mainGrid.zones[parseInt(d.cold[g][0], 10) - 1].getChildByName("zone_cold").anchor.set(.5, .5)));
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }
    };
    v.events.on("GRID_STATS", t.drawGridHotCold);
    v.events.on("BET_TIME", t.drawGridHotCold)
}

function hotcoldGraphsLottoNew(a, c, h, t) {
    this.destroy = function () {
        z = r = null;
        c.onStartOpen = null;
        c.onStopOpen = null;
        for (var a in n) n[a] = null;
        n = null
    };
    var n = this, z = function () {
        for (var a = [], c = 0; 6 > c; c++) a.push([r.hot[c][0], r.hot[c][1]]);
        a.sort(function (a, c) {
            if (a[0] > c[0]) return 1;
            if (a[0] < c[0]) return -1
        });
        for (c = 0; c < a.length; c++) r.hot[c][0] = a[c][0], r.hot[c][1] = a[c][1];
        a = [];
        for (c = 9; 4 <= c; c--) a.push([r.cold[c][0], r.cold[c][1]]);
        a.sort(function (a, c) {
            if (a[0] > c[0]) return 1;
            if (a[0] < c[0]) return -1
        });
        c = 0;
        for (var h = 9; c < a.length; c++,
            h--) r.cold[h][0] = a[c][0], r.cold[h][1] = a[c][1];
        a = null
    }, r = a;
    z();
    this.update = function (a) {
        r = a;
        z();
        n.draw();
        n.drawGraphs()
    };
    this.draw = function () {
        h && h(r, c.container)
    };
    this.drawGraphs = function () {
        t && t(r, c.container)
    };
    c.onStartOpen = n.draw;
    c.onStopOpen = n.drawGraphs
};
