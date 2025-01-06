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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, e) {
    a != Array.prototype && a != Object.prototype && (a[c] = e.value)
};
$jscomp.polyfill = function (a, c, e, h) {
    if (c) {
        e = $jscomp.global;
        a = a.split(".");
        for (h = 0; h < a.length - 1; h++) {
            var g = a[h];
            g in e || (e[g] = {});
            e = e[g]
        }
        a = a[a.length - 1];
        h = e[a];
        c = c(h);
        c != h && null != c && $jscomp.defineProperty(e, a, {configurable: !0, writable: !0, value: c})
    }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function (a) {
    function c() {
        this.batch_ = null
    }

    function e(a) {
        return a instanceof g ? a : new g(function (c, t) {
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
    var h = $jscomp.global.setTimeout;
    c.prototype.asyncExecuteFunction = function (a) {
        h(a, 0)
    };
    c.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length;) {
            var a =
                this.batch_;
            this.batch_ = [];
            for (var c = 0; c < a.length; ++c) {
                var e = a[c];
                a[c] = null;
                try {
                    e()
                } catch (z) {
                    this.asyncThrow_(z)
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
    var g = function (a) {
        this.state_ = 0;
        this.result_ = void 0;
        this.onSettledCallbacks_ = [];
        var c = this.createResolveAndReject_();
        try {
            a(c.resolve, c.reject)
        } catch (w) {
            c.reject(w)
        }
    };
    g.prototype.createResolveAndReject_ = function () {
        function a(a) {
            return function (t) {
                e || (e = !0, a.call(c, t))
            }
        }

        var c = this, e = !1;
        return {resolve: a(this.resolveTo_), reject: a(this.reject_)}
    };
    g.prototype.resolveTo_ = function (a) {
        if (a === this) this.reject_(new TypeError("A Promise cannot resolve to itself")); else if (a instanceof g) this.settleSameAsPromise_(a); else {
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
    g.prototype.resolveToNonPromiseObj_ = function (a) {
        var c = void 0;
        try {
            c = a.then
        } catch (w) {
            this.reject_(w);
            return
        }
        "function" == typeof c ?
            this.settleSameAsThenable_(c, a) : this.fulfill_(a)
    };
    g.prototype.reject_ = function (a) {
        this.settle_(2, a)
    };
    g.prototype.fulfill_ = function (a) {
        this.settle_(1, a)
    };
    g.prototype.settle_ = function (a, c) {
        if (0 != this.state_) throw Error("Cannot settle(" + a + ", " + c + "): Promise already settled in state" + this.state_);
        this.state_ = a;
        this.result_ = c;
        this.executeOnSettledCallbacks_()
    };
    g.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
            for (var a = 0; a < this.onSettledCallbacks_.length; ++a) v.asyncExecute(this.onSettledCallbacks_[a]);
            this.onSettledCallbacks_ = null
        }
    };
    var v = new c;
    g.prototype.settleSameAsPromise_ = function (a) {
        var c = this.createResolveAndReject_();
        a.callWhenSettled_(c.resolve, c.reject)
    };
    g.prototype.settleSameAsThenable_ = function (a, c) {
        var e = this.createResolveAndReject_();
        try {
            a.call(c, e.resolve, e.reject)
        } catch (z) {
            e.reject(z)
        }
    };
    g.prototype.then = function (a, c) {
        function e(a, c) {
            return "function" == typeof a ? function (c) {
                try {
                    h(a(c))
                } catch (G) {
                    r(G)
                }
            } : c
        }

        var h, r, u = new g(function (a, c) {
            h = a;
            r = c
        });
        this.callWhenSettled_(e(a, h), e(c, r));
        return u
    };
    g.prototype.catch = function (a) {
        return this.then(void 0, a)
    };
    g.prototype.callWhenSettled_ = function (a, c) {
        function e() {
            switch (h.state_) {
                case 1:
                    a(h.result_);
                    break;
                case 2:
                    c(h.result_);
                    break;
                default:
                    throw Error("Unexpected state: " + h.state_);
            }
        }

        var h = this;
        null == this.onSettledCallbacks_ ? v.asyncExecute(e) : this.onSettledCallbacks_.push(e)
    };
    g.resolve = e;
    g.reject = function (a) {
        return new g(function (c, e) {
            e(a)
        })
    };
    g.race = function (a) {
        return new g(function (c, h) {
            for (var g = $jscomp.makeIterator(a), r = g.next(); !r.done; r = g.next()) e(r.value).callWhenSettled_(c,
                h)
        })
    };
    g.all = function (a) {
        var c = $jscomp.makeIterator(a), h = c.next();
        return h.done ? e([]) : new g(function (a, g) {
            function r(c) {
                return function (e) {
                    p[c] = e;
                    u--;
                    0 == u && a(p)
                }
            }

            var p = [], u = 0;
            do p.push(void 0), u++, e(h.value).callWhenSettled_(r(p.length - 1), g), h = c.next(); while (!h.done)
        })
    };
    return g
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
    } catch (e) {
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
    var e = a.next();
    $jscomp.generator.ensureIteratorResultIsObject_(e);
    if (e.done) this.yieldResult = e.value, this.nextAddress = c; else return this.yieldAllIterator_ = a, this.yield(e.value, c)
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
$jscomp.generator.Context.prototype.enterFinallyBlock = function (a, c, e) {
    e ? this.finallyContexts_[e] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
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
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function (a, c, e) {
    try {
        var h = a.call(this.context_.yieldAllIterator_, c);
        $jscomp.generator.ensureIteratorResultIsObject_(h);
        if (!h.done) return this.context_.stop_(), h;
        var g = h.value
    } catch (v) {
        return this.context_.yieldAllIterator_ = null, this.context_.throw_(v), this.nextStep_()
    }
    this.context_.yieldAllIterator_ = null;
    e.call(this.context_, g);
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

    function e(c) {
        return a.throw(c)
    }

    return new Promise(function (h, g) {
        function v(a) {
            a.done ? h(a.value) : Promise.resolve(a.value).then(c, e).then(v, g)
        }

        v(a.next())
    })
};
$jscomp.asyncExecutePromiseGeneratorFunction = function (a) {
    return $jscomp.asyncExecutePromiseGenerator(a())
};
$jscomp.asyncExecutePromiseGeneratorProgram = function (a) {
    return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)))
};
$jscomp.checkStringArgs = function (a, c, e) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + e + " must not be null or undefined");
    if (c instanceof RegExp) throw new TypeError("First argument to String.prototype." + e + " must not be a regular expression");
    return a + ""
};
$jscomp.polyfill("String.prototype.repeat", function (a) {
    return a ? a : function (a) {
        var c = $jscomp.checkStringArgs(this, null, "repeat");
        if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value");
        a |= 0;
        for (var h = ""; a;) if (a & 1 && (h += c), a >>>= 1) c += c;
        return h
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.fill", function (a) {
    return a ? a : function (a, e, h) {
        var c = this.length || 0;
        0 > e && (e = Math.max(0, c + e));
        if (null == h || h > c) h = c;
        h = Number(h);
        0 > h && (h = Math.max(0, c + h));
        for (e = Number(e || 0); e < h; e++) this[e] = a;
        return this
    }
}, "es6", "es3");
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_4_min",
    image: "games/Keno/resources/JX/icons/keno-JX-min.png",
    imageBack: "games/Keno/resources/JX/icons/keno-JX-back-min.png",
    caption: "Keno JX",
    runConfig: "KenoJX",
    gameType: "green",
    playInDemo: !0,
    gameBG: "images/games-bg/keno-jx-bg.jpg"
});
var configsJX = {
    green: {
        serverName: "srv19",
        appName: "bets_19",
        nameImage: ["K", "E", "N", "O", "4min"],
        BG: "bg-green",
        coefTable: [[0, 0, 0, 0, 0, 0, 1, 1, 2, 2], [3.5, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 15, 2, 1, 1, 0, 0, 0, 0, 0], [0, 0, 60, 10, 3, 2, 2, 0, 0, 0], [0, 0, 0, 100, 30, 15, 4, 5, 2, 0], [0, 0, 0, 0, 150, 60, 20, 15, 10, 5], [0, 0, 0, 0, 0, 500, 80, 50, 25, 30], [0, 0, 0, 0, 0, 0, 1E3, 200, 125, 100], [0, 0, 0, 0, 0, 0, 0, 2E3, 1E3, 300], [0, 0, 0, 0, 0, 0, 0, 0, 5E3, 2E3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1E4]],
        videoURL: "",
        videoMobileURL: "",
        videoPos: {x: 54, y: 192},
        videoSize: {w: 1089, h: 663},
        tirTime: 120,
        canvasId: "",
        runconfig: "KenoJXGreen",
        gameType: "Green",
        gameKind: "Keno",
        gameVariant: "JX",
        caption: "KenoJX",
        rTime: -4,
        timerOffset: 8
    }
}, kenoJXObjectsArr = {green: void 0};

function emitEventKenoJX(a, c) {
    void 0 != kenoJXObjectsArr.green && kenoJXObjectsArr.green.mainRenderer.stage.emit(a, c)
}

function removeKenoJXObject(a, c) {
    if (void 0 != kenoJXObjectsArr[c]) {
        kenoJXObjectsArr[c].destroy();
        for (var e in kenoJXObjectsArr[c]) kenoJXObjectsArr[c][e] = null;
        kenoJXObjectsArr[c] = null
    }
    $("#" + a + " canvas").remove();
    $("#" + a + " div").remove()
}

function initKenoJXObject(a, c) {
    switch (c) {
        case "green":
            configsJX.green.canvasId = a, kenoJXObjectsArr.green = mobileMode ? new KenoAppObjJXMobile(configsJX.green) : new KenoAppObjJX(configsJX.green)
    }
}

function refreshKenoJXObject(a, c) {
    removeKenoJXObject(a, c.toLowerCase());
    initKenoJXObject(a, c.toLowerCase())
}

function gameManagerJX(a) {
    this.destroy = function () {
        h = e = null;
        for (var a in c) c[a] = null;
        c = null
    };
    var c = this;
    this.coefficients = a.kenoConfig.coefTable;
    var e = {};
    this.gameState = function () {
        return e
    };
    this.gameStateAsync = function (a) {
        h(a)
    };
    var h = function (h) {
        $.ajax({
            type: "get",
            url: getUrl(),
            data: {oper: "getgameinfo", id_srv: a.kenoConfig.serverName.slice(3, a.kenoConfig.serverName.length)},
            dataType: "json",
            success: function (g, t, u) {
                try {
                    c && (e = g, e.tOrig = e.t2, void 0 != h && h(e))
                } catch (w) {
                    console.log(w), a.mainRenderer.logService.log(mainLocalizationTable.connError,
                        redirectToRootURL, "critical")
                }
            },
            error: function (c, e, h) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
            }
        })
    };
    this.gameHistory = function () {
        function a(a, c) {
            var e = 0;
            c && (e = c);
            c = [];
            for (var h = e + 20; e < h; e++) c.push(a["b" + e]);
            return c
        }

        if (c && e) {
            var h = [], t = 5;
            0 < parseInt(e.tOrig, 10) && (h.push({tir: e.tir, balls: a(e, 1)}), --t);
            var u;
            for (u = 0; u < t; u++) {
                var w = e.history["tirid" + u];
                h.push({tir: w.tirnum, balls: a(w)})
            }
            return h
        }
        console.log("History and gameState not ok.")
    };
    this.sortNumeric =
        function (a, c) {
            if (a > c) return 1;
            if (a < c) return -1
        }
}

function KenoAppObjJX(a) {
    this.destroy = function () {
        v.destroy();
        v = null;
        t.destroy();
        t = null;
        h.destroy();
        h = null;
        g.destroy();
        g = null;
        e.destroy();
        e = null;
        c.mainSoundManager.destroy();
        for (var a in c) c[a] = null;
        c = null
    };
    var c = this;
    this.gameDir = "games/Keno/resources/";
    "COP" === clientInfoGlobal.name_en + "" && "Green" === a.gameType && (a.serverName = "srv19", a.appName = "bets_19");
    this.kenoConfig = a;
    var e = new FLGRenderer(1920, 1080, a.canvasId, "center");
    this.mainRenderer = e;
    this.mainSoundManager = new SoundManager("Keno", c.kenoConfig.gameType,
        "NG");
    var h = new FLGAccount(a.canvasId, c.mainSoundManager, c.mainRenderer);
    this.mainFLGAccount = h;
    var g = new gameManagerJX(this);
    this.mainGameManager = g;
    var v = new UIManagerJX(this);
    this.mainUIManager = v;
    var t;
    this.setMainGrid = function (a) {
        t = a;
        c.mainGrid = t
    }
}

function UIManagerJX(a) {
    function c(b, d, c, e, h) {
        this.destroy = function () {
            y = f = g = k = null;
            clearTimeout(m);
            clearTimeout(N);
            l = q = null;
            for (var a in Y) Y[a] = null;
            Y = null
        };
        var Y = this, k = {font: "bold 35px Arial", fill: "#000000", align: "center"}, g = 0, m, N,
            f = new PIXI.Container;
        e ? e.addChild(f) : a.mainRenderer.stage.addChild(f);
        var y = function (b, d, c, q, y) {
            f.children[y] ? (f.children[y].visible = !0, f.children[y].children[0].text = q) : a.mainRenderer.createButton(f, b, d, "ball", {
                text: q,
                align: "center",
                style: k
            }).scale.set(c, c);
            h && !f.children[y].isRotated &&
            (f.children[y].position.x = b + 1714, f.children[y].children[0].rotation = 14 * Math.PI, f.children[y].isRotated = !0, a.mainUIManager.animations()["rotation_ball" + y] && (a.mainUIManager.animations()["rotation_ball" + y].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["rotation_ball" + y] = (new TWEEN.Tween({
                rotation: f.children[y].children[0].rotation,
                position: f.children[y].position.x
            })).to({rotation: 0, position: b}, 445).easing(TWEEN.Easing.Cubic.Out).onUpdate(function () {
                f.children[y].children[0].rotation =
                    this.rotation;
                f.children[y].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["rotation_ball" + y] = null;
                a.mainSoundManager.playSound("ball")
            }).start())
        }, q = function (a, f, q, e) {
            function N() {
                y(b + c * g, d, f, a[g], g);
                g++;
                g < a.length ? 0 == q || void 0 == q ? N() : m = setTimeout(N, q) : g = 0
            }

            void 0 != a && a.length && (e ? y(b + c * e, d, f, a[e], e) : N())
        };
        this.startDrawBalls = q;
        var l = function () {
            for (var b = 0; b < f.children.length; b++) h ? (f.children[b].isRotated = !1, a.mainUIManager.animations()["remove_ball" +
            b] && (a.mainUIManager.animations()["remove_ball" + b].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["remove_ball" + b] = (new TWEEN.Tween({
                rotation: f.children[b].children[0].rotation,
                position: f.children[b].position.x,
                index: b
            })).to({
                rotation: 14 * Math.PI,
                position: f.children[b].position.x + 1714
            }, 990).easing(TWEEN.Easing.Cubic.In).onUpdate(function () {
                f.children[this.index].children[0].rotation = this.rotation;
                f.children[this.index].position.x =
                    this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["remove_ball" + this.index] = null;
                f.children[this.index].visible = !1
            }).start()) : f.children[b].visible = !1
        };
        this.removeBalls = l
    }

    function e(b) {
        this.destroy = function () {
            for (var a = 0; a < c.length; a++) {
                for (var f in c[a]) c[a][f] = null;
                c[a] = null
            }
            m = l = k = h = e = c = null;
            for (a in d) d[a] = null;
            d = null
        };
        var d = this, c = [];
        this.bets = c;
        var e = 0, h = 0;
        this.setTotalWin = function (a) {
            if (!arguments.length) return h;
            a && (h = a)
        };
        this.getTotalBet =
            function () {
                return e
            };
        var k = null;
        this.parentEditions = function (a) {
            if (!arguments.length) return k;
            k = a;
            l = k.betsHistoryContainer()
        };
        if (b.length) for (var g = 0; g < b.length; g++) b[g].summ && (e += b[g].summ), b[g].win && (h += b[g].win), c.push({
            summ: b[g].summ,
            bet: b[g].bet,
            winBets: b[g].winBets,
            countWin: b[g].countWin,
            win: b[g].win,
            code: b[g].code,
            id: b[g].id
        });
        this.addBet = function (b, f, d) {
            100 <= c.length ? (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), d && d(void 0)) : (b.length && 100 < c.length +
            b.length && (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), b = b.slice(0, b.length - (c.length + b.length - 100))), a.mainFLGAccount.placeBet(b, f, a.kenoConfig, function (f, y, h) {
                if (void 0 == f) d && d(void 0); else {
                    if (h) {
                        h.notAll && a.mainRenderer.logService.log(mainLocalizationTable.betError);
                        for (f = 0; f < h.srvBets.length; f++) c.push({
                            summ: h.srvBets[f].summ,
                            bet: h.srvBets[f].bet,
                            winBets: h.srvBets[f].winBets,
                            countWin: h.srvBets[f].countWin,
                            code: h.srvBets[f].code,
                            id: h.srvBets[f].id
                        });
                        d &&
                        (d(h.srvBets), k.events.emit("EDITIONS_CHANGE"))
                    } else c.push({
                        summ: b.summ,
                        bet: b.bet,
                        winBets: b.winBets,
                        countWin: b.countWin,
                        win: b.win,
                        code: f,
                        id: y
                    }), d && (d(c[c.length - 1]), k.events.emit("EDITIONS_CHANGE"));
                    e = a.mainFLGAccount.totalBet();
                    m();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }))
        };
        var l, m = function () {
            var b = 0 != l.children.length;
            l.parent.children[7].children[0].children[0].text = 0 < c.length ? mainLocalizationTable.coupon.toUpperCase() + " (" + c.length + ")" : mainLocalizationTable.coupon.toUpperCase();
            if (b) l.parent.children[2].children[1].children[0].text =
                0 !== e ? formatFLGNums(e, !1) : "", l.parent.children[2].children[2].children[0].text = 0 !== h ? formatFLGNums(h, !1) : ""; else for (b = 0; 10 > b; b++) {
                var f = b & 1 ? "table_line_odd" : "table_line_even";
                f = new a.mainRenderer.createButton(l, 0, 98 + 35 * b, f);
                f.anchor.y = .5;
                f.name = "row_" + b
            }
            for (b = 0; l.getChildByName("row_" + b); b++) if (f = l.getChildByName("row_" + b)) {
                for (var d = 0; f.getChildByName("rect" + b + "_" + d); d++) {
                    var q = f.getChildByName("rect" + b + "_" + d);
                    q.visible = !1;
                    q.getChildByName("sortedBet" + b + "_" + d).visible = !1
                }
                if (q = f.getChildByName("summ" +
                    b)) q.visible = !1, f.getChildByName("win" + b).visible = !1, f.getChildByName("coef" + b).visible = !1;
                9 < b && (f.visible = !1)
            }
            if (!(0 >= c.length)) {
                b = 0;
                for (var g = c.length - 1; b < c.length; b++, g--) {
                    var H = c[g].bet.slice();
                    H.sort(a.mainGameManager.sortNumeric);
                    (f = l.getChildByName("row_" + b)) ? f.visible = !0 : (f = b & 1 ? "table_line_odd" : "table_line_even", f = new a.mainRenderer.createButton(l, 0, 98 + 35 * b, f), f.anchor.y = .5, f.name = "row_" + b);
                    for (d = 0; d < H.length; d++) {
                        var m = -1 < c[g].winBets.indexOf(H[d]), r = m ? 16773632 : 0;
                        (q = f.getChildByName("rect" +
                            b + "_" + d)) ? (q.clear(), q.beginFill(r), q.drawRoundedRect(6 + 29 * d, -12, 25, 25, 4), q.endFill(), q.visible = !0, q = q.getChildByName("sortedBet" + b + "_" + d), q.children[0].style = m ? k.tableHistoryFont : k.tableHighlightFont, q.children[0].text = H[d], q.visible = !0) : (q = new PIXI.Graphics, q.beginFill(r), q.drawRoundedRect(6 + 29 * d, -12, 25, 25, 4), q.endFill(), q.name = "rect" + b + "_" + d, f.addChild(q), a.mainRenderer.createButton(q, 18.5 + 29 * d, 0, void 0, {
                            text: H[d],
                            align: "center",
                            style: m ? k.tableHistoryFont : k.tableHighlightFont
                        }).name = "sortedBet" +
                            b + "_" + d)
                    }
                    H = void 0 != c[g].win ? formatFLGNums(c[g].win, !1) : "";
                    d = void 0 != c[g].win && 0 != c[g].win ? k.tableBoldFont : k.tableBetFont;
                    q = f.getChildByName("summ" + b);
                    m = a.mainGameManager.coefficients[c[g].countWin][c[g].bet.length - 1];
                    m = 0 != m ? m : "";
                    q ? (q.children[0].style = d, q.children[0].text = formatFLGNums(c[g].summ, !1), q.visible = !0, q = f.getChildByName("win" + b), q.children[0].style = d, q.children[0].text = H, q.visible = !0, q = f.getChildByName("coef" + b), q.children[0].style = d, q.children[0].text = m, q.visible = !0) : (a.mainRenderer.createButton(f,
                        312, 0, void 0, {
                            text: formatFLGNums(c[g].summ, !1),
                            align: "left",
                            style: d
                        }).name = "summ" + b, a.mainRenderer.createButton(f, 465, 0, void 0, {
                        text: H,
                        align: "left",
                        style: d
                    }).name = "win" + b, a.mainRenderer.createButton(f, 420, 0, void 0, {
                        text: m,
                        align: "center",
                        style: {font: d.font, fill: d.fill, align: "center"}
                    }).name = "coef" + b)
                }
            }
            l.emit("updateHeight")
        };
        this.redrawCurrentBets = m;
        this.calculateWin = function (b, f) {
            for (var d, q = 0; q < c.length; q++) {
                d = c[q].bet;
                for (var e = [], g = 0; g < d.length; g++) -1 < b.indexOf(d[g]) && e.push(d[g]);
                d = e;
                c[q].winBets =
                    d;
                c[q].countWin = d.length;
                f && (c[q].win = c[q].summ * a.mainGameManager.coefficients[c[q].countWin][c[q].bet.length - 1], h += c[q].win)
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        }
    }

    this.destroy = function () {
        clearTimeout(fa);
        clearTimeout(ia);
        u = null;
        r.destroy();
        r = null;
        M.destroy();
        p = M = null;
        E && E.destroy();
        E = null;
        F.destroy();
        F = null;
        G.destroy();
        I = D = x = G = null;
        for (var b in l) {
            for (var d in l[b]) l[b][d] = null;
            l[b] = null
        }
        l = null;
        clearTimeout(ja);
        T = P = null;
        for (b in k) k[b] = null;
        U = Q = K = Z = aa = V = B = C = k = null;
        a.mainRenderer.stage.off("changeLang",
            W);
        W = null;
        g.off("visibleChange", v);
        window.removeEventListener("keydown", t);
        t = v = g = null;
        R.destroy();
        A = R = null;
        n.destroy();
        n = null;
        ba && (ba.destroy(), ba = null);
        for (b in h) h[b] = null;
        h = null
    };
    var h = this, g = $("#" + a.kenoConfig.canvasId).parent(), v = function (b, d) {
        a.mainRenderer.stage.visible = d == a.kenoConfig.canvasId;
        a.mainRenderer.StartStopAnimation(a.mainRenderer.stage.visible)
    };
    g.on("visibleChange", v);
    var t = function (b) {
        "input" !== event.srcElement.localName && a.mainRenderer.stage.visible && (13 == b.keyCode || 32 == b.keyCode) &&
        x && (b = x.getChildByName("plus")) && b.interactive && (b.emit("mousedown"), b.emit("mouseup"))
    };
    window.addEventListener("keydown", t);
    for (var u = clientInfoGlobal.coin7.split("-"), w = 0; w < u.length; w++) u[w] /= 100;
    var z = 2 * parseInt(u[u.length - 1], 10);
    u.push("MAX\n" + z);
    var r = new betsControls(u[0], u[u.length - 1], u[1], u, function (b) {
        a.mainFLGAccount.balance() < z && (z = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return z
    });
    this.betsControls = r;
    var M = new FLGTimer, p, E, F = new FLGJackpot(a.mainRenderer,
            {tirTimeOffset: .1, updateInterval: 900}), G, x = new PIXI.Container, D = new PIXI.Container,
        I = new PIXI.Container, l = {
            game: {
                text: mainLocalizationTable.game.toUpperCase(),
                posX: 1160,
                posY: 347,
                pressedDefault: !0,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            video: {
                text: mainLocalizationTable.video.toUpperCase(), posX: 1160, posY: 521, onStartOpen: function () {
                    k.scale_video && k.scale_video.stop();
                    E = new FLGVideo(a.kenoConfig.videoPos.x, a.kenoConfig.videoPos.y, a.kenoConfig.videoSize.w, a.kenoConfig.videoSize.h,
                        a.kenoConfig.canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" allowfullscreen="true" wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=0&amp;URL=' + a.kenoConfig.videoURL + ';"> <param name="allowFullScreen" value="true"> <param name="movie" value="videoplayer.swf"> </object>', '<video id="innerVideo' + a.kenoConfig.canvasId +
                        '" autoplay muted playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + a.kenoConfig.videoMobileURL + '" type="application/x-mpegURL"></video>', void 0, a.mainSoundManager);
                    E.setVisible(!0);
                    k.scale_video = (new TWEEN.Tween({scale: 0})).to({scale: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                        k.scale_video = null;
                        E.setScale(1)
                    }).onUpdate(function () {
                        E.setScale(this.scale)
                    }).onComplete(function () {
                        k.scale_video = null
                    }).start()
                }, onStopOpen: void 0, onStartClose: function () {
                    E &&
                    (k.scale_video && k.scale_video.stop(), k.scale_video = (new TWEEN.Tween({scale: 1})).to({scale: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                        k.scale_video = null;
                        E.setScale(0)
                    }).onUpdate(function () {
                        E.setScale(this.scale)
                    }).onComplete(function () {
                        E.destroy();
                        E = null;
                        k.scale_video = null
                    }).start())
                }, onStopClose: void 0
            },
            history: {
                text: mainLocalizationTable.history.toUpperCase(),
                posX: 1160,
                posY: 695,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            stats: {
                text: mainLocalizationTable.stats.toUpperCase(),
                posX: 1160, posY: 869, onStartOpen: void 0, onStopOpen: void 0, onStartClose: void 0, onStopClose: void 0
            },
            info: {}
        }, ja = 0, P, T = !1, R, A = {needShow: !0}, n = new function () {
            this.destroy = function () {
                for (var a = 0; a < d.length; a++) d[a].round = null, d[a].editionResult = null, d[a].betsHistory.destroy && d[a].betsHistory.destroy(), d[a].betsHistory = null, d[a] = null;
                r = k = g = h = d = null;
                l.destroy();
                f = n = p = l = null;
                m.destroy();
                m = null;
                J && (J.destroy(), J = null);
                y = null;
                q && (q.destroy(), q = null);
                X = ca = da = ha = L = ea = O = v = w = u = t = null;
                b.events.removeAllListeners();
                for (a in b) b[a] = null;
                b = null
            };
            var b = this, d = [], h;
            this.editions = d;
            var g, k, l, r = new PIXI.Container, p = new PIXI.Container, m, n = new PIXI.Container, f = new PIXI.Container;
            f.name = "betCntnr";
            this.historyTable = function () {
                return k
            };
            this.betBGContainer = function () {
                return m.srcSprite
            };
            this.betsHistoryContainer = function () {
                return f
            };
            var y = .653, q, u = {font: "bold 30px Arial", fill: "#313131"};
            this.tableHeaderFont = u;
            var w = {font: "22px Arial", fill: "#403f3f"}, t = {font: "20px Arial Narrow", fill: "#000000"};
            this.tableHistoryFont = t;
            var v = {font: "20px Arial Narrow", fill: "#ffffff"};
            this.tableHighlightFont = v;
            var O = {font: "bold 22px Arial", fill: "#000000"};
            this.tableBoldFont = O;
            var ea = {font: "20px Arial", fill: "#000000"};
            this.tableBetFont = ea;
            this.getActedOutEdition = function () {
                for (var a = d.length - 1; 0 <= a; a--) if (void 0 == d[a].editionResult) return L(a), d[a];
                L(d.length - 1);
                return d[d.length - 1]
            };
            var L = function (b) {
                0 > b || b >= d.length || (h = b, void 0 != g && (g.children[0].text = "#" + d[d.length - 1].round), void 0 != k && d[h].betsHistory.redrawCurrentBets(), a.mainRenderer.renderManager.needUpdateRender =
                    !0)
            }, ha = function () {
                g = a.mainRenderer.createButton(void 0, 123, 92, void 0, {
                    text: "",
                    align: "center",
                    style: {font: "bold 46px Arial", fill: "#fa9a00"}
                });
                g.anchor.set(.5, .5);
                g.scale.set(.6, .6);
                g.name = "roundText";
                k = a.mainRenderer.createButton(void 0, 1294, 275);
                l = new MaskedSprite(a.mainRenderer.createButton(k, 1, 0, "table_bg"), {
                    mask: {
                        x: 1,
                        y: 0,
                        width: 579,
                        height: 116,
                        radius: 9
                    }
                }, a.mainRenderer.renderManager);
                a.mainRenderer.createButton(l.srcSprite, 0, 0, "table_header");
                da();
                X();
                var f = new PIXI.Graphics;
                f.beginFill(16777215);
                f.drawRect(98, 46, 2, 214);
                f.alpha = .5;
                f.endFill;
                l.srcSprite.addChild(f);
                f = null;
                f = a.mainRenderer.createButton(l.srcSprite, 0, 0, void 0, void 0, function (f, b) {
                    a.mainSoundManager.playSound("buttonClick");
                    a.mainUIManager.animations().rotate_editions && (a.mainUIManager.animations().rotate_editions.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().rotate_editions = null);
                    f.pressed = !f.pressed;
                    var d = f.pressed ? Math.PI / 2 : 0;
                    a.mainRenderer.renderManager.animationTweenInc();
                    a.mainUIManager.animations().rotate_editions =
                        (new TWEEN.Tween(f.children[0])).to({rotation: d}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().rotate_editions = null
                        }).start();
                    a.mainUIManager.animations().resize_editions && (a.mainUIManager.animations().resize_editions.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().resize_editions = null);
                    f = f.pressed ? 260 : 116;
                    a.mainRenderer.renderManager.animationTweenInc();
                    a.mainUIManager.animations().resize_editions =
                        (new TWEEN.Tween({fHeight: l.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: f}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            l.srcSprite.mask.clear();
                            l.srcSprite.mask.beginFill(14922837);
                            l.srcSprite.mask.drawRoundedRect(1, 0, 579, this.fHeight, 9);
                            l.srcSprite.mask.endFill
                        }).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().resize_editions = null
                        }).start();
                    b && (m.srcSprite.getChildByName("exp2").emit("mousedown"), b.stopped = !0, a.mainRenderer.renderManager.needUpdateRender =
                        !0)
                });
                f.hitArea = new PIXI.Rectangle(0, 0, 579, 43);
                f.name = "exp1";
                f = a.mainRenderer.createButton(f, 552, 21, "expand");
                f.anchor.set(.5, .5);
                f = null;
                for (f = 0; f < d.length; f++) d[f].betsHistory.parentEditions(b);
                ca();
                d.length && d[h].betsHistory.redrawCurrentBets();
                l.srcSprite.addChild(p);
                l.srcSprite.addChild(r)
            };
            this.drawEditions = ha;
            var da = function () {
                p.children[0] && p.children[1] ? (p.children[0].children[0].text = "#", p.children[1].children[0].text = mainLocalizationTable.balls) : (a.mainRenderer.createButton(p, 19, 22, void 0,
                    {
                        text: mainLocalizationTable.history.toUpperCase(),
                        align: "left",
                        style: u
                    }), a.mainRenderer.createButton(p, 50, 62, void 0, {
                    text: "#",
                    align: "center",
                    style: w
                }), a.mainRenderer.createButton(p, 114, 62, void 0, {
                    text: mainLocalizationTable.balls,
                    align: "left",
                    style: w
                }))
            };
            this.redrawEditionHeader = da;
            var ca = function () {
                if (n.children[0]) n.children[0].children[0].text = mainLocalizationTable.coupon.toUpperCase(), n.children[1].children[0].text = mainLocalizationTable.balls, n.children[2].children[0].text = mainLocalizationTable.totalBet,
                    n.children[3].children[0].text = mainLocalizationTable.win, m.srcSprite.children[2].children[0].text = mainLocalizationTable.total.toUpperCase() + ":"; else {
                    m = new MaskedSprite(a.mainRenderer.createButton(k, 1, 125, "table_bg"), {
                        mask: {
                            x: 1,
                            y: 125,
                            width: 579,
                            height: 465,
                            radius: 9
                        }, needScrolling: {container: f, scrollbar: {topOffset: 85, botOffset: 38}}
                    }, a.mainRenderer.renderManager);
                    m.srcSprite.addChildAt(f, 0);
                    a.mainRenderer.createButton(m.srcSprite, -4, 425, "bet_bot");
                    a.mainRenderer.createButton(m.srcSprite.children[2], 291,
                        24, void 0, {
                            text: mainLocalizationTable.total.toUpperCase() + ":",
                            align: "right",
                            style: {font: "22px Arial", fill: "#000000", align: "center"}
                        });
                    a.mainRenderer.createButton(m.srcSprite.children[2], 312, 24, void 0, {
                        text: "",
                        align: "left",
                        style: {font: "22px Arial", fill: "#000000", align: "center"}
                    });
                    a.mainRenderer.createButton(m.srcSprite.children[2], 458, 24, void 0, {
                        text: "",
                        align: "left",
                        style: {font: "22px Arial", fill: "#000000", align: "center"}
                    });
                    var d = new PIXI.Graphics;
                    d.beginFill(16777215);
                    d.drawRect(299, 46, 2, 419);
                    d.alpha =
                        .5;
                    d.name = "ballsSep";
                    d.endFill;
                    m.srcSprite.addChild(d);
                    d = new PIXI.Graphics;
                    d.beginFill(16777215);
                    d.drawRect(445, 46, 2, 419);
                    d.alpha = .5;
                    d.name = "winsSep";
                    d.endFill;
                    m.srcSprite.addChild(d);
                    m.srcSprite.interactive = !0;
                    m.srcSprite.hitArea = new PIXI.Rectangle(0, 0, 579, 465);
                    a.mainRenderer.createButton(m.srcSprite, 0, 0, "table_header");
                    d = a.mainRenderer.createButton(m.srcSprite, 0, 0, void 0, void 0, function (b, d) {
                        a.mainUIManager.animations().rotate_bets && (a.mainUIManager.animations().rotate_bets.stop(), a.mainRenderer.renderManager.animationTweenDec());
                        b.pressed = !b.pressed;
                        var c = b.pressed ? 0 : Math.PI / 2;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().rotate_bets = (new TWEEN.Tween(b.children[0])).to({rotation: c}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().rotate_bets = null
                        }).start();
                        a.mainUIManager.animations().resize_bets && (a.mainUIManager.animations().resize_bets.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().resize_bets =
                            null);
                        b = b.pressed ? 320 : 465;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().resize_bets = (new TWEEN.Tween({fHeight: m.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: b}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            m.srcSprite.position.y = 590 - this.fHeight;
                            m.srcSprite.children[2].position.y = 425 + this.fHeight - 465;
                            m.srcSprite.mask.clear();
                            m.srcSprite.mask.beginFill(14922837);
                            m.srcSprite.mask.drawRoundedRect(1, m.srcSprite.position.y, 579, this.fHeight, 9);
                            m.srcSprite.mask.endFill;
                            m.srcSprite.hitArea.height = this.fHeight;
                            f.emit("updateHeight")
                        }).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().resize_bets = null
                        }).start();
                        d && (l.srcSprite.getChildByName("exp1").emit("mousedown"), d.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    d.hitArea = new PIXI.Rectangle(0, 0, 579, 43);
                    d.name = "exp2";
                    d = a.mainRenderer.createButton(d, 552, 21, "expand");
                    d.anchor.set(.5, .5);
                    d.rotation = Math.PI / 2;
                    d = null;
                    m.srcSprite.addChild(n);
                    a.mainRenderer.createButton(n,
                        19, 22, void 0, {text: mainLocalizationTable.coupon.toUpperCase(), align: "left", style: u});
                    a.mainRenderer.createButton(n, 19, 62, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "left",
                        style: w
                    });
                    a.mainRenderer.createButton(n, 312, 62, void 0, {
                        text: mainLocalizationTable.totalBet,
                        align: "left",
                        style: w
                    });
                    a.mainRenderer.createButton(n, 465, 62, void 0, {
                        text: mainLocalizationTable.win,
                        align: "left",
                        style: w
                    });
                    a.mainRenderer.createButton(n, 420, 62, void 0, {
                        text: "X",
                        align: "center",
                        style: {font: w.font, fill: w.fill, align: "center"}
                    });
                    d = new PIXI.Graphics;
                    d.beginFill(16777215);
                    d.drawRect(394, 46, 2, 419);
                    d.alpha = .5;
                    d.name = "xSep";
                    d.endFill;
                    m.srcSprite.addChild(d);
                    d = null;
                    d = a.mainRenderer.createButton(m.srcSprite, 0, 0, void 0, void 0, function (f, d) {
                        a.mainSoundManager.playSound("buttonClick");
                        A.needShow = !A.needShow;
                        b.events.emit("GRID_STATS");
                        f.children[0].texture = a.mainRenderer.resourceLoader.resources[A.needShow ? "eye_icon" : "eye_closed_icon"].texture;
                        x.getChildByName("btn_eye").texture = a.mainRenderer.resourceLoader.resources[A.needShow ? "btn_eye" :
                            "btn_eye_closed"].texture;
                        x.getChildByName("btn_eye").children[0].texture = a.mainRenderer.resourceLoader.resources[A.needShow ? "btn_eye_mode_selected" : "btn_eye_closed_mode_selected"].texture;
                        d && (d.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    d.hitArea = new PIXI.Rectangle(299, 0, 95, 43);
                    d.name = "eye_icon";
                    a.mainRenderer.createButton(d, 347, 21, "eye_icon").anchor.set(.5, .5);
                    d = null
                }
            };
            this.drawBetsHeader = ca;
            var X = function () {
                var f = 0 !== r.children.length;
                if (!f) for (var b = 0; 5 > b; b++) {
                    var d = new a.mainRenderer.createButton(r,
                        0, 98 + 36 * b, b & 1 ? "table_line_odd" : "table_line_even");
                    d.anchor.y = .5
                }
                var c = a.mainGameManager.gameHistory();
                for (b = 0; b < c.length; b++) {
                    var h = c[b].balls.slice();
                    h.sort(a.mainGameManager.sortNumeric);
                    d = r.children[b];
                    if (f = 0 !== d.children.length) for (d.getChildByName("round" + b).children[0].text = c[b].tir, f = 0; f < h.length; f++) d.getChildByName("result" + f).children[0].text = h[f]; else {
                        a.mainRenderer.createButton(d, 50, 0, void 0, {
                            text: c[b].tir,
                            align: "center",
                            style: t
                        }).name = "round" + b;
                        var q = 96;
                        for (f = 0; f < h.length; f++) a.mainRenderer.createButton(d,
                            q += 23, 0, void 0, {text: h[f], align: "center", style: t}).name = "result" + f
                    }
                }
            };
            this.detailEditionsFont = {font: "40px Arial", fill: "#ffffff"};
            this.detailEditionsHeaderFont = {font: "26px Arial", fill: "#b1b1b1"};
            this.detailEditionsRowFont = {font: "26px Arial", fill: "#ffffff"};
            var J;
            this.drawDetailEditionHistory = function (f, h) {
                if (d[h].editionResult) {
                    var e = 0 != f.children.length;
                    f.editionInd = h;
                    var g = {x: 599, y: 524}, k = d[h].editionResult.slice();
                    k.sort(a.mainGameManager.sortNumeric);
                    e ? (q.removeBalls(), q.startDrawBalls(k, y, 0),
                        f.children[0].children[0].text = "# " + d[h].round, k = f.getChildByName("totalBox"), k.getChildByName("tBet").children[0].text = formatFLGNums(d[h].betsHistory.getTotalBet(), !1), k.getChildByName("tWin").children[0].text = formatFLGNums(d[h].betsHistory.setTotalWin(), !1), k = null) : (e = a.mainRenderer.createButton(f, 598 - g.x, 226 - g.y, void 0, {
                        text: "# " + d[h].round,
                        align: "center",
                        style: b.detailEditionsFont
                    }), q = new c(69 - g.x, 262 - g.y, 53, f), q.startDrawBalls(k, y, 0), e = a.mainRenderer.createButton(f, 408 - g.x, 226 - g.y, "bet_arrow"),
                        a.mainRenderer.createButton(e, 0, 0, "bet_arrow_selected", void 0, function (c, e) {
                            a.mainSoundManager.playSound("buttonClick");
                            f.editionInd = limit(f.editionInd - 1, 0, d.length - 2);
                            b.drawDetailEditionHistory(f, f.editionInd);
                            e.stopped = !0;
                            a.mainUIManager.clickAnimationFunc(c, "bet_arrow_History");
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        }, void 0, void 0, function (a) {
                            C(a, "bet_arrow_History")
                        }, function (a) {
                            B(a, "bet_arrow_History")
                        }).alpha = 0, e.anchor.set(.5, .5), e.children[0].anchor.set(.5, .5), e = a.mainRenderer.createButton(f,
                        781 - g.x, 224 - g.y, "bet_arrow"), a.mainRenderer.createButton(e, 0, 0, "bet_arrow_selected", void 0, function (c, e) {
                        a.mainSoundManager.playSound("buttonClick");
                        f.editionInd = limit(f.editionInd + 1, 0, d.length - 2);
                        b.drawDetailEditionHistory(f, f.editionInd);
                        e.stopped = !0;
                        a.mainUIManager.clickAnimationFunc(c, "bet_arrow_History2");
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }, void 0, void 0, function (a) {
                        C(a, "bet_arrow_History2")
                    }, function (a) {
                        B(a, "bet_arrow_History2")
                    }).alpha = 0, e.anchor.set(.5, .5), e.children[0].anchor.set(.5,
                        .5), e.rotation = Math.PI, e = a.mainRenderer.createButton(f, 742 - g.x, 342 - g.y, void 0, {
                        text: mainLocalizationTable.bet,
                        align: "center",
                        style: b.detailEditionsHeaderFont
                    }), e.anchor.set(.5, .5), e = a.mainRenderer.createButton(f, 350 - g.x, 342 - g.y, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "center",
                        style: b.detailEditionsHeaderFont
                    }), e.anchor.set(.5, .5), e = a.mainRenderer.createButton(f, 886 - g.x, 342 - g.y, void 0, {
                        text: mainLocalizationTable.coef,
                        align: "center",
                        style: b.detailEditionsHeaderFont
                    }), e.anchor.set(.5, .5), e = a.mainRenderer.createButton(f,
                        1027 - g.x, 342 - g.y, void 0, {
                            text: mainLocalizationTable.win,
                            align: "center",
                            style: b.detailEditionsHeaderFont
                        }), e.anchor.set(.5, .5), J = new MaskedSprite(a.mainRenderer.createButton(f, 0, 0), {
                        mask: {
                            x: 60 - g.x,
                            y: 364 - g.y,
                            width: 1070,
                            height: 426
                        }, needScrolling: {}
                    }, a.mainRenderer.renderManager), J.srcSprite.interactive = !0, J.srcSprite.hitArea = new PIXI.Rectangle(70 - g.x, 362 - g.y, 1061, 432), k = a.mainRenderer.createButton(f, 68 - g.x, 826 - g.y, void 0), k.name = "totalBox", k.anchor.y = .5, a.mainRenderer.createButton(k, 56, 0, void 0, {
                        text: mainLocalizationTable.total.toUpperCase(),
                        align: "center", style: b.detailEditionsHeaderFont
                    }), a.mainRenderer.createButton(k, 368, 0, void 0, {
                        text: mainLocalizationTable.bet + ":",
                        align: "center",
                        style: b.detailEditionsHeaderFont
                    }), e = a.mainRenderer.createButton(k, 540, 0, "tab_history_row"), e.anchor.set(.5, .5), e.scale.x = .17, a.mainRenderer.createButton(k, 540, 0, void 0, {
                        text: formatFLGNums(d[h].betsHistory.getTotalBet(), !1),
                        align: "center",
                        style: b.detailEditionsRowFont
                    }).name = "tBet", a.mainRenderer.createButton(k, 768, 0, void 0, {
                        text: mainLocalizationTable.win +
                            ":", align: "center", style: b.detailEditionsHeaderFont
                    }), e = a.mainRenderer.createButton(k, 960, 0, "tab_history_row"), e.anchor.set(.5, .5), e.scale.x = .17, a.mainRenderer.createButton(k, 960, 0, void 0, {
                        text: formatFLGNums(d[h].betsHistory.setTotalWin(), !1),
                        align: "center",
                        style: b.detailEditionsRowFont
                    }).name = "tWin", e = k = null);
                    k = [];
                    var l;
                    k = J.containerForScroll;
                    var m, n;
                    for (e = 0; k.getChildByName("row_" + e); e++) if (l = k.getChildByName("row_" + e)) {
                        l.visible = !1;
                        for (n = 0; l.getChildByName("rect" + e + "_" + n); n++) {
                            var r = l.getChildByName("rect" +
                                e + "_" + n);
                            r.visible = !1;
                            r.getChildByName("textBet" + e + "_" + n).visible = !1
                        }
                        if (m = l.getChildByName("summ" + e)) m.visible = !1, l.getChildByName("win" + e).visible = !1, l.getChildByName("coef" + e).visible = !1
                    }
                    f.children[2].visible = 0 !== f.editionInd;
                    f.children[3].visible = f.editionInd !== d.length - 2;
                    f.children[4].visible = 0 < d[h].betsHistory.bets.length;
                    f.children[5].visible = 0 < d[h].betsHistory.bets.length;
                    f.children[6].visible = 0 < d[h].betsHistory.bets.length;
                    f.children[7].visible = 0 < d[h].betsHistory.bets.length;
                    if (0 >= d[h].betsHistory.bets.length) k.emit("updateHeight");
                    else {
                        m = [];
                        e = 0;
                        for (var p = d[h].betsHistory.bets.length - 1; e < d[h].betsHistory.bets.length; e++, p--) {
                            (l = k.getChildByName("row_" + e)) ? l.visible = !0 : (l = new a.mainRenderer.createButton(k, 68 - g.x, 391 + 61 * e - g.y, "tab_history_row"), l.anchor.y = .5, l.name = "row_" + e);
                            for (n = 0; n < d[h].betsHistory.bets[p].bet.length; n++) {
                                m = d[h].betsHistory.bets[p].bet.slice();
                                m.sort(a.mainGameManager.sortNumeric);
                                var O = -1 < d[h].betsHistory.bets[p].winBets.indexOf(m[n]) ? "zone_pressed" : "zone_transp";
                                (r = l.getChildByName("rect" + e + "_" + n)) ? (r.texture =
                                    a.mainRenderer.resourceLoader.resources[O].texture, r.visible = !0, r = r.getChildByName("textBet" + e + "_" + n), r.children[0].text = m[n], r.visible = !0) : (r = a.mainRenderer.createButton(l, 32 + 56 * n, 0, O), r.scale.set(.465, .465), r.anchor.set(.5, .5), r.name = "rect" + e + "_" + n, r = a.mainRenderer.createButton(r, 0, 0, void 0, {
                                    text: m[n],
                                    align: "center",
                                    style: {
                                        font: "bold 45px Arial Narrow",
                                        fill: "#e0e0e0",
                                        stroke: "#000000",
                                        strokeThickness: 4,
                                        align: "center"
                                    }
                                }), r.anchor.set(.5, .5), r.name = "textBet" + e + "_" + n)
                            }
                            n = void 0 != d[h].betsHistory.bets[p].win ?
                                formatFLGNums(d[h].betsHistory.bets[p].win, !1) : "";
                            (m = l.getChildByName("summ" + e)) ? (m.children[0].text = formatFLGNums(d[h].betsHistory.bets[p].summ, !1), m.visible = !0, m = l.getChildByName("coef" + e), m.children[0].text = "X " + a.mainGameManager.coefficients[d[h].betsHistory.bets[p].countWin][d[h].betsHistory.bets[p].bet.length - 1], m.visible = !0, l = l.getChildByName("win" + e), l.children[0].text = n, l.visible = !0) : (a.mainRenderer.createButton(l, 676, 0, void 0, {
                                text: formatFLGNums(d[h].betsHistory.bets[p].summ, !1), align: "center",
                                style: b.detailEditionsRowFont
                            }).name = "summ" + e, a.mainRenderer.createButton(l, 821, 0, void 0, {
                                text: "X " + a.mainGameManager.coefficients[d[h].betsHistory.bets[p].countWin][d[h].betsHistory.bets[p].bet.length - 1],
                                align: "center",
                                style: b.detailEditionsRowFont
                            }).name = "coef" + e, a.mainRenderer.createButton(l, 960, 0, void 0, {
                                text: n,
                                align: "center",
                                style: b.detailEditionsRowFont
                            }).name = "win" + e)
                        }
                        m = [];
                        k.emit("updateHeight");
                        n = r = r = m = l = m = l = k = g = null
                    }
                }
            };
            this.cancelLastEdition = function (a) {
                d.length && (d[d.length - 1].editionResult =
                    a, d[d.length - 1].betsHistory.calculateWin(a), L(d.length - 1))
            };
            this.addEdition = function (a) {
                6 <= d.length && (d[0].betsHistory.destroy && d[0].betsHistory.destroy(), d[0].betsHistory = null, d.shift());
                d.length && !d[d.length - 1].betsHistory.bets.length ? (d[d.length - 1].round = a, d[d.length - 1].editionResult = void 0) : d.length && d[d.length - 1].round === a || (d.push({
                    round: a,
                    editionResult: void 0,
                    betsHistory: new e([])
                }), d[d.length - 1].betsHistory.parentEditions(b));
                L(d.length - 1)
            };
            this.saveToStorage = function () {
                var f, b;
                return $jscomp.asyncExecutePromiseGeneratorProgram(function (c) {
                    localStorage.setItem("curUser",
                        JSON.stringify({hall: clientInfoGlobal.hall, nick: clientInfoGlobal.lgn}));
                    f = [];
                    for (b = 0; b < d.length; b++) f.push({
                        round: d[b].round,
                        editionResult: d[b].editionResult,
                        bets: d[b].betsHistory.bets
                    });
                    localStorage.setItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + a.kenoConfig.gameVariant + "editions", JSON.stringify(f));
                    c.jumpToEnd()
                })
            };
            this.loadFromStorage = function () {
                function f(f) {
                    $.ajax({
                        type: "get",
                        url: getUrl(),
                        data: {
                            gethistory: parseInt(a.kenoConfig.serverName.slice(3, a.kenoConfig.serverName.length)),
                            round: f.round
                        },
                        dataType: "json",
                        async: !1,
                        success: function (a, d, c) {
                            if (b && a && a.tirid0) {
                                d = [];
                                c = a.tirid0;
                                for (a = 0; 20 > a; a++) {
                                    if (99 === c["b" + a]) return;
                                    d.push(c["b" + a])
                                }
                                f.editionResult = d;
                                f.betsHistory.calculateWin(f.editionResult, !0)
                            }
                        }
                    })
                }

                if (localStorage.getItem("curUser")) {
                    var c = JSON.parse(localStorage.getItem("curUser"));
                    if (c.hall !== clientInfoGlobal.hall && c.nick !== clientInfoGlobal.lgn) return
                }
                c = a.kenoConfig.gameKind + a.kenoConfig.gameType + a.kenoConfig.gameVariant + "editions";
                if (localStorage.getItem(c)) {
                    var h = JSON.parse(localStorage.getItem(c));
                    for (c = 0; c < h.length; c++) d.push({
                        round: h[c].round,
                        editionResult: h[c].editionResult,
                        betsHistory: new e(h[c].bets)
                    }), (!d[c].editionResult || 20 > d[c].editionResult.length) && f(d[c])
                }
            };
            b.loadFromStorage();
            L(d.length - 1);
            this.events = new PIXI.utils.EventEmitter;
            b.events.on("EDITIONS_CHANGE", function () {
                b.saveToStorage()
            });
            b.events.on("RESULT_TIME", X);
            b.events.on("BET_TIME", X)
        }, ba, k = {};
    this.animations = function () {
        return k
    };
    this.clickAnimationFunc = function (b, d) {
        b && (k[d] && (k[d].stop(), a.mainRenderer.renderManager.animationTweenDec()),
            a.mainRenderer.renderManager.animationTweenInc(), k[d] = (new TWEEN.Tween(b)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            k[d] = null;
            a.mainRenderer.renderManager.animationTweenInc();
            k[d] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                k[d] = null
            }).start()
        }).start())
    };
    var C = function (b, d, c) {
        if (b) switch (k[d] && (k[d].stop(), a.mainRenderer.renderManager.animationTweenDec()),
            a.mainRenderer.renderManager.animationTweenInc(), c) {
            case "grow":
                k[d] = (new TWEEN.Tween(b.scale)).to({
                    x: 1.2,
                    y: 1.2
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[d] = null
                }).start();
                break;
            default:
                k[d] = (new TWEEN.Tween(b)).to({alpha: .6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[d] = null
                }).start()
        }
    }, B = function (b, d, c) {
        k[d] && (k[d].stop(), a.mainRenderer.renderManager.animationTweenDec());
        if (b && 0 != b.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(), c) {
            case "grow":
                k[d] = (new TWEEN.Tween(b.scale)).to({
                    x: 1,
                    y: 1
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[d] = null
                }).start();
                break;
            default:
                k[d] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[d] = null
                }).start()
        }
    }, V = function (b, d, c) {
        if (b.container) {
            k[c] && k[c].stop();
            if (b.onStartClose) b.onStartClose();
            a.mainRenderer.renderManager.animationTweenInc();
            k[c] = (new TWEEN.Tween(b.container.scale)).to({y: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                if (b.onStopClose) b.onStopClose();
                if (d.onStopOpen) d.onStopOpen();
                a.mainRenderer.renderManager.animationTweenDec();
                k[c] = null;
                b.container.scale.y = 0;
                d.container.scale.y = 1
            }).onComplete(function () {
                if (b.onStopClose) b.onStopClose();
                a.mainRenderer.renderManager.animationTweenDec();
                k[c] = null;
                if (d.onStartOpen) d.onStartOpen();
                a.mainRenderer.renderManager.animationTweenInc();
                k[c] = (new TWEEN.Tween(d.container.scale)).to({y: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                    if (b.onStopClose) b.onStopClose();
                    if (d.onStopOpen) d.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[c] = null;
                    b.container.scale.y = 0;
                    d.container.scale.y = 1
                }).onComplete(function () {
                    if (d.onStopOpen) d.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[c] = null
                }).start()
            }).start()
        }
    }, Z = function (b, d, c) {
        b && (k[d] ? k[d].stop() : (a.mainRenderer.renderManager.animationTweenInc(),
            k[d] = (new TWEEN.Tween(b.position)).to({x: c}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                k[d] = null
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                k[d] = null
            }).start()))
    }, aa = function (b, d, c) {
        b && (c ? (k[d].stop(), k[d + "chain"] && (TWEEN.remove(k[d + "chain"]), a.mainRenderer.renderManager.animationTweenDec(), k[d + "chain"] = null)) : (a.mainRenderer.renderManager.animationTweenInc(), k[d] = (new TWEEN.Tween(b)).to({
            rotation: Math.PI /
                24
        }, 330).easing(TWEEN.Easing.Linear.None).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            k[d] = null;
            b.rotation = 0
        }), a.mainRenderer.renderManager.animationTweenInc(), k[d + "chain"] = (new TWEEN.Tween(b)).to({rotation: -Math.PI / 24}, 330).easing(TWEEN.Easing.Linear.None).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            k[d + "chain"] = null;
            b.rotation = 0
        }), k[d].chain(k[d + "chain"]), k[d + "chain"].chain(k[d]), k[d].start()))
    };
    this.simpleFlipXFunc = function (b, d, c, e, h, g) {
        k[d] && k[d].stop();
        var l = b.scale.x;
        a.mainRenderer.renderManager.animationTweenInc();
        k[d] = (new TWEEN.Tween(b.scale)).to({x: 0}, c).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            k[d] = null;
            b.scale.x = l
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            k[d] = null;
            h && h(b);
            a.mainRenderer.renderManager.animationTweenInc();
            k[d] = (new TWEEN.Tween(b.scale)).to({x: l}, e).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                k[d] = null;
                b.scale.x = l;
                g && g(b)
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                k[d] = null;
                g && g(b)
            }).start()
        }).start()
    };
    this.growCircleAnimationFunc = function (b, d) {
        if (b) {
            k[d] && k[d].stop();
            var c = {x: b.scale.x, y: b.scale.y};
            a.mainRenderer.renderManager.animationTweenInc();
            k[d] = (new TWEEN.Tween(b.scale)).to({
                x: c.x,
                y: c.y
            }, 2E3).easing(TWEEN.Easing.Elastic.OutStr).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                k[d] = null;
                b.scale = c
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                k[d] = null
            }).start()
        }
    };
    var S = !1, K = [["gmName", a.gameDir + "JX/logo-min.png"],
        [a.kenoConfig.BG, a.gameDir + "JX/" + a.kenoConfig.BG + ".jpg"], ["JP", a.gameDir + "WinJP/Jackpot-" + a.kenoConfig.gameType + "-min.png"], ["WIN", a.gameDir + "WinJP/Win-" + a.kenoConfig.gameType + "-min.png"], ["header", a.gameDir + "NG/header.png"], ["footer", a.gameDir + "NG/footer.png"], ["jp_name", a.gameDir + "NG/jackpotNG/JackPot.png"], ["jp_num_bot", a.gameDir + "NG/jackpotNG/num-bot.png"], ["jp_num_top", a.gameDir + "NG/jackpotNG/num-top.png"], ["table_coef", a.gameDir + "table_coefficients_" + a.kenoConfig.gameType.toLowerCase() + ".png"],
        ["btn_clear", a.gameDir + "NG/btn-undo.png"], ["btn_clear_mode_selected", a.gameDir + "NG/btn-undo-mode-selected.png"], ["btn_home", a.gameDir + "NG/btn-home.png"], ["btn_home_mode_selected", a.gameDir + "NG/btn-home-mode-selected.png"], ["btn_info", a.gameDir + "NG/btn-info.png"], ["btn_info_mode_selected", a.gameDir + "NG/btn-info-mode-selected.png"], ["btn_my_bets", a.gameDir + "NG/btn-my-bets.png"], ["btn_my_bets_mode_selected", a.gameDir + "NG/btn-my-bets-selected.png"], ["btn_rebet", a.gameDir + "NG/btn-rebet-min.png"], ["btn_rebet_mode_selected",
            a.gameDir + "NG/btn-rebet-mode-selected-min.png"], ["btn_rebetx2", a.gameDir + "NG/btn-rebetx2-min.png"], ["btn_rebetx2_mode_selected", a.gameDir + "NG/btn-rebetx2-mode-selected-min.png"], ["btn_eye", a.gameDir + "NG/btn-eye-min.png"], ["btn_eye_mode_selected", a.gameDir + "NG/btn-eye-mode-selected2-min.png"], ["btn_eye_closed", a.gameDir + "NG/btn-eye-closed-min.png"], ["btn_eye_closed_mode_selected", a.gameDir + "NG/btn-eye-closed-mode-selected-min.png"], ["eye_icon", a.gameDir + "NG/eye-icon-min.png"], ["eye_closed_icon", a.gameDir +
        "NG/eye-closed-icon-min.png"], ["bet_arrow", a.gameDir + "NG/arrow.png"], ["bet_arrow_selected", a.gameDir + "NG/arrow-selected.png"], ["autoplay", a.gameDir + "NG/autoplay.png"], ["autoplay_selected", a.gameDir + "NG/autoplay-selected.png"], ["autoplay_pressed", a.gameDir + "NG/autoplay-pressed.png"], ["plus", a.gameDir + "NG/plus.png"], ["plus_selected", a.gameDir + "NG/plus-selected.png"], ["plus_pressed", a.gameDir + "NG/plus-pressed.png"], ["random", a.gameDir + "NG/random.png"], ["random_selected", a.gameDir + "NG/random-selected.png"],
        ["random_pressed", a.gameDir + "NG/random-pressed.png"], ["random_num", a.gameDir + "NG/random-num.png"], ["random_num_selected", a.gameDir + "NG/random-num-selected.png"], ["random_num_pressed", a.gameDir + "NG/random-num-pressed.png"], ["tab", a.gameDir + "NG/tab.png"], ["tab_selected", a.gameDir + "NG/tab-selected.png"], ["tab_pressed", a.gameDir + "NG/tab-pressed.png"], ["tab_bg", a.gameDir + "NG/tab-bg.png"], ["bet_bot", a.gameDir + "NG/bet-bot.png"], ["zone_transp", a.gameDir + "NG/zone.png"], ["zone_selected", a.gameDir + "JX/zone-selected-min.png"],
        ["zone_pressed", a.gameDir + "NG/zone-action.png"], ["zone_win", a.gameDir + "NG/zone-win.png"], ["zone_lock", a.gameDir + "NG/zone-lock.png"], ["zone_lock2", a.gameDir + "NG/zone-lock2.png"], ["table_header", a.gameDir + "NG/table-header.png"], ["table_bg", a.gameDir + "NG/table-bg.png"], ["table_line_odd", a.gameDir + "NG/table-odd-line.png"], ["table_line_even", a.gameDir + "NG/table-even-line.png"], ["expand", a.gameDir + "NG/expand.png"], ["tab_history_row", a.gameDir + "NG/tab-history-row.png"], ["hotcold_bg", a.gameDir + "NG/hotcold-bg.png"],
        ["ball", a.gameDir + "NG/ball.png"], ["btn_menu", a.gameDir + "NG/btn-menu2-min.png"], ["btn_menu_selected", a.gameDir + "NG/btn-menu2-selected-min.png"], ["btn_cross", a.gameDir + "NG/btn-cross-min.png"], ["btn_cross_selected", a.gameDir + "NG/btn-cross-selected-min.png"]];
    K = K.concat(a.mainFLGAccount.resources);
    K = K.concat(F.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, "images/logo.json", K, function (b, d, e) {
        a.mainRenderer.createButton(void 0, 0, 0, a.kenoConfig.BG);
        a.mainRenderer.createButton(void 0, 0, 944,
            "footer");
        a.mainFLGAccount.drawAccount(0, 0, a.kenoConfig, !0);
        a.mainRenderer.createButton(void 0, 0, 0, "header");
        a.mainRenderer.createButton(void 0, 0, 5, "gmName");
        b = new PIXI.Graphics;
        b.beginFill(0, .5);
        b.drawRect(0, 0, 136, 932);
        b.endFill;
        b.name = "menu_container";
        D.addChild(b);
        b.position.set(-136, 148);
        D.interactive = !0;
        p = new PIXI.Graphics;
        p.position.y = 120;
        p.beginFill(0);
        p.drawRect(0, 0, 1920, 28);
        p.endFill;
        b = a.mainRenderer.createButton(p, 960, 14, void 0, {
            text: mainLocalizationTable.placeBets.toUpperCase(), align: "center",
            style: {font: "18px Arial", fill: "#efefef", align: "center"}
        });
        b.anchor.set(.5, .5);
        b = a.mainRenderer.createButton(p, 1838, 14, void 0, {
            text: "00:00",
            align: "center",
            style: {font: "24px Arial", fill: "#efefef", align: "center"}
        });
        b.anchor.set(.5, .5);
        p.addChild(new PIXI.Graphics);
        p.children[2].beginFill(42577);
        p.children[2].drawRect(3, 3, 1914, 22);
        p.children[2].endFill;
        b = a.mainRenderer.createButton(p.children[2], 960, 14, void 0, {
            text: mainLocalizationTable.placeBets.toUpperCase(), align: "center", style: {
                font: "18px Arial",
                fill: "#000000", align: "center"
            }
        });
        b.anchor.set(.5, .5);
        b = a.mainRenderer.createButton(p.children[2], 1838, 14, void 0, {
            text: "00:00",
            align: "center",
            style: {font: "24px Arial", fill: "#000000", align: "center"}
        });
        b.anchor.set(.5, .5);
        b = new PIXI.Graphics;
        b.beginFill();
        b.drawRect(3, 0, 1914, 28);
        b.endFill;
        p.children[2].mask = b;
        p.children[2].parent.addChild(b);
        b = null;
        a.mainRenderer.stage.addChild(p);
        b = a.mainRenderer.createButton(x, 43, 977, "btn_menu");
        a.mainRenderer.createButton(b, 0, 0, "btn_menu_selected", void 0, function (f,
                                                                                    b) {
            a.mainSoundManager.playSound("buttonClick");
            b.stopped = !0;
            h.clickAnimationFunc(f, "btn_menu");
            Z(D.getChildByName("menu_container"), "menuContainer", 0);
            x.getChildByName("btn_menu").visible = !1;
            D.getChildByName("menu_container").getChildByName("btn_cross").visible = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            C(a, "btn_menu")
        }, function (a) {
            B(a, "btn_menu")
        }).alpha = 0;
        b = a.mainRenderer.createButton(D.getChildByName("menu_container"), 49, 826, "btn_cross");
        a.mainRenderer.createButton(b,
            0, 0, "btn_cross_selected", void 0, function (f, b) {
                a.mainSoundManager.playSound("buttonClick");
                b.stopped = !0;
                h.clickAnimationFunc(f, "btn_cross");
                Z(D.getChildByName("menu_container"), "menuContainer", -136);
                x.getChildByName("btn_menu").visible = !0;
                D.getChildByName("menu_container").getChildByName("btn_cross").visible = !1;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                C(a, "btn_cross")
            }, function (a) {
                B(a, "btn_cross")
            }).alpha = 0;
        b = a.mainRenderer.createButton(D.getChildByName("menu_container"),
            32, 710, "btn_home");
        a.mainRenderer.createButton(b, 0, 0, "btn_home_mode_selected", void 0, function (f, b) {
            a.mainSoundManager.playSound("buttonClick");
            b.stopped = !0;
            h.clickAnimationFunc(f, "btn_home");
            a.mainFLGAccount.closeGame();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            C(a, "btn_home")
        }, function (a) {
            B(a, "btn_home")
        }).alpha = 0;
        APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && b && (b.visible = clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl);
        b = a.mainRenderer.createButton(x,
            172, 962, "btn_info");
        a.mainRenderer.createButton(b, 0, 0, "btn_info_mode_selected", void 0, function (f, b) {
            if (f.pressed) h.clickAnimationFunc(f, "btn_info"), l.info.lastTab.button.emit("mousedown"), f.pressed = !1; else {
                for (var d in l) "info" !== d && l[d].button.pressed && (l[d].button.pressed = !1, l[d].button.texture = a.mainRenderer.resourceLoader.resources.tab.texture, l[d].button.getChildByName("texttab").style = {
                    font: "bold 30px Arial Narrow",
                    fill: "#292929"
                }, l.info.lastTab = l[d], V(l[d], l.info, "flipContainer"));
                f.alpha =
                    .67;
                f.pressed = !0
            }
            a.mainSoundManager.playSound("buttonClick");
            b && (b.stopped = !0);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            a.pressed || C(a, "btn_info")
        }, function (a) {
            a.pressed || B(a, "btn_info")
        }).alpha = 0;
        b = a.mainRenderer.createButton(x, 292, 967, "btn_clear");
        a.mainRenderer.createButton(b, 0, 0, "btn_clear_mode_selected", void 0, function (f, b) {
            a.mainSoundManager.playSound("clearBet");
            a.mainGrid.removeCurrentBets();
            a.mainFLGAccount.maxWin(0);
            a.mainRenderer.renderManager.needUpdateRender =
                !0;
            b.stopped = !0;
            h.clickAnimationFunc(f, "btn_clear");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            C(a, "btn_clear")
        }, function (a) {
            B(a, "btn_clear")
        }).alpha = 0;
        a.mainRenderer.createButton(x, 318, 1027, void 0, {
            text: mainLocalizationTable.undo,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        });
        b = a.mainRenderer.createButton(x, 1360, 957, "btn_rebet");
        a.mainRenderer.createButton(b, 0, 0, "btn_rebet_mode_selected", void 0, function (f, b) {
            a.mainSoundManager.playSound("buttonClick");
            b.stopped = !0;
            h.clickAnimationFunc(f, "btn_rebet");
            a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            C(a, "btn_rebet")
        }, function (a) {
            B(a, "btn_rebet")
        }).alpha = 0;
        a.mainRenderer.createButton(x, 1386, 1027, void 0, {
            text: mainLocalizationTable.repeat,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        });
        b = a.mainRenderer.createButton(x, 1480, 957, "btn_rebetx2");
        a.mainRenderer.createButton(b, 0, 0, "btn_rebetx2_mode_selected",
            void 0, function (f, b) {
                a.mainSoundManager.playSound("buttonClick");
                b.stopped = !0;
                h.clickAnimationFunc(f, "btn_rebetx2");
                T = !0;
                a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                C(a, "btn_rebetx2")
            }, function (a) {
                B(a, "btn_rebetx2")
            }).alpha = 0;
        a.mainRenderer.createButton(x, 1515, 1027, void 0, {
            text: mainLocalizationTable.repeatx2,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        });
        b = a.mainRenderer.createButton(D.getChildByName("menu_container"),
            68, 533, "btn_eye");
        a.mainRenderer.createButton(b, 0, 0, "btn_eye_mode_selected", void 0, function (b, d) {
            a.mainSoundManager.playSound("buttonClick");
            d.stopped = !0;
            h.clickAnimationFunc(b, "btn_eye");
            A.needShow = !A.needShow;
            n.events.emit("GRID_STATS");
            b.parent.texture = a.mainRenderer.resourceLoader.resources[A.needShow ? "btn_eye" : "btn_eye_closed"].texture;
            b.texture = a.mainRenderer.resourceLoader.resources[A.needShow ? "btn_eye_mode_selected" : "btn_eye_closed_mode_selected"].texture;
            n.betBGContainer().getChildByName("eye_icon").children[0].texture =
                a.mainRenderer.resourceLoader.resources[A.needShow ? "eye_icon" : "eye_closed_icon"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            C(a, "btn_eye")
        }, function (a) {
            B(a, "btn_eye")
        }).alpha = 0;
        b.anchor.set(.5, .5);
        b.children[0].anchor.set(.5, .5);
        b = a.mainRenderer.createButton(D.getChildByName("menu_container"), 46, 600, "btn_my_bets");
        a.mainRenderer.createButton(b, 0, 0, "btn_my_bets_mode_selected", void 0, function (b, d) {
            a.mainSoundManager.playSound("buttonClick");
            showCashFlowDlg();
            d.stopped = !0;
            h.clickAnimationFunc(b, "btn_my_bets");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            C(a, "btn_my_bets")
        }, function (a) {
            B(a, "btn_my_bets")
        }).alpha = 0;
        b.visible = "DEMO" != clientInfoGlobal.hall;
        a.mainRenderer.createButton(D.getChildByName("menu_container"), 68, 670, void 0, {
            text: mainLocalizationTable.myBets,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        }).visible = "DEMO" != clientInfoGlobal.hall;
        b = a.mainRenderer.createButton(x, 418, 993, "bet_arrow");
        a.mainRenderer.createButton(b,
            0, 0, "bet_arrow_selected", void 0, function (b, d) {
                a.mainSoundManager.playSound("chipSelector");
                r.decrementBet();
                var f = x.getChildByName("betText").children[0];
                r.isMaxBet() ? f.text = "MAX\n" + z : f.text = r.currentBet();
                a.mainUIManager.setTextScale(f);
                Q();
                d.stopped = !0;
                h.clickAnimationFunc(b, "bet_arrow");
                b.parent.visible = 0 !== r.possibleBets.indexOf(r.currentBet());
                b.parent.parent.getChildByName("bet_arrow2").visible = !r.isMaxBet();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                C(a, "bet_arrow")
            },
            function (a) {
                B(a, "bet_arrow")
            }).alpha = 0;
        b.anchor.set(.5, .5);
        b.children[0].anchor.set(.5, .5);
        a.mainRenderer.createButton(x, 496, 992, void 0, {
            text: r.currentBet(),
            align: "center",
            style: {font: "40px Arial Black", fill: "#ffffff", align: "center"}
        }).name = "betText";
        a.mainUIManager.setTextScale(x.getChildByName("betText").children[0]);
        b = a.mainRenderer.createButton(x, 574, 991, "bet_arrow");
        a.mainRenderer.createButton(b, 0, 0, "bet_arrow_selected", void 0, function (b, d) {
            a.mainSoundManager.playSound("chipSelector");
            r.incrementBet();
            var f = x.getChildByName("betText").children[0];
            r.isMaxBet() ? f.text = "MAX\n" + z : f.text = r.currentBet();
            a.mainUIManager.setTextScale(f);
            Q();
            d.stopped = !0;
            h.clickAnimationFunc(b, "bet_arrow2");
            b.parent.visible = !r.isMaxBet();
            b.parent.parent.getChildByName("bet_arrow").visible = 0 !== r.possibleBets.indexOf(r.currentBet());
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            C(a, "bet_arrow2")
        }, function (a) {
            B(a, "bet_arrow2")
        }).alpha = 0;
        b.anchor.set(.5, .5);
        b.children[0].anchor.set(.5, .5);
        b.rotation =
            Math.PI;
        b.name += "2";
        a.mainRenderer.createButton(x, 496, 1027, void 0, {
            text: mainLocalizationTable.bet,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        });
        b = a.mainRenderer.createButton(x, 650, 945, "autoplay", void 0, function (b, d) {
            a.mainSoundManager.playSound("buttonClick");
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            a.mainFLGAccount.autoplayManager.changeVisible();
            d.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name +
            "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        b.hitArea = new PIXI.Rectangle(0, 0, 237, 100);
        a.mainRenderer.createButton(b, 129, 50, void 0, {
            text: mainLocalizationTable.autoPlay.toUpperCase(), align: "center", style: {
                font: "bold 30px Arial Narrow",
                fill: "#292929"
            }
        });
        b = a.mainRenderer.createButton(x, 960, 945, "random", void 0, function (b, d) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            a.mainGrid.removeCurrentBets();
            a.mainGrid.createRandomBets();
            (b = x.getChildByName("plus")) && b.interactive && (b.emit("mousedown"), b.emit("mouseup"));
            Q();
            d.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        b.hitArea = new PIXI.Rectangle(73, 0, 237, 100);
        a.mainRenderer.createButton(b, 164, 50, void 0, {
            text: mainLocalizationTable.random.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial Narrow", fill: "#292929"}
        });
        a.mainRenderer.createButton(x,
            1206, 945, "random_num", {
                text: "1",
                align: "center",
                style: {font: "bold 30px Arial Narrow", fill: "#292929"}
            }, function (b, d) {
                b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
                a.mainSoundManager.playSound("buttonClick");
                b.getChildByName("text" + b.name).text = a.mainGrid.incrementRandomCount(parseInt(b.getChildByName("text" + b.name).text));
                d.stopped = !0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (b) {
                b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, function (b) {
                b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, function (b) {
                b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
                a.mainRenderer.renderManager.needUpdateRender = !0
            });
        b = a.mainRenderer.createButton(x, 960, 972, "plus", void 0, function (b, d) {
            a.mainSoundManager.playSound("buttonClick");
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            if (0 < a.mainGrid.pressedZones.length) {
                b.interactive = !1;
                b.parent.getChildByName("random").interactive = !1;
                var c = a.mainGrid.getIntArrayOfPressedZones(), f = function () {
                    n.getActedOutEdition().betsHistory.addBet({
                        summ: r.currentBet(),
                        bet: c,
                        winBets: [],
                        countWin: 0,
                        win: void 0
                    }, n.getActedOutEdition().round, function (d) {
                        if (d) {
                            a.mainFLGAccount.maxWin(0);
                            for (var f in c) switch (d = a.mainGrid.zones[c[f] - 1], d.emit("mousedown"), d.emit("mouseup"), d.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, d.isLock ?
                                d.isLock++ : d.isLock = 1, d.isLock) {
                                case 1:
                                    d.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                    break;
                                default:
                                    d.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                            }
                        }
                        b.interactive = !0;
                        b.parent.getChildByName("random").interactive = !0;
                        b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    })
                };
                r.isMaxBet() ? showAgreeDlg(f, function () {
                    b.interactive = !0;
                    b.parent.getChildByName("random").interactive = !0;
                    b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }) : f()
            }
            d && (d.stopped = !0);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        });
        b.anchor.set(.5, .5);
        for (var g in l) {
            switch (g) {
                case "game":
                    b = a.mainRenderer.createButton(I, 599, 524, void 0);
                    break;
                case "history":
                    b = a.mainRenderer.createButton(I, 599, 524, "tab_bg");
                    break;
                case "stats":
                    b = a.mainRenderer.createButton(I, 599, 524, "tab_bg");
                    break;
                case "video":
                    b = a.mainRenderer.createButton(I, 599, 524);
                    break;
                case "info":
                    b = a.mainRenderer.createButton(I, 599, 524, "tab_bg");
                    b.name = g;
                    b.anchor.set(.5, .5);
                    b.scale.y = 0;
                    l[g].container = b;
                    l[g].button = x.getChildByName("btn_info").children[0];
                    continue
            }
            b.name =
                g;
            b.anchor.set(.5, .5);
            b.scale.y = 0;
            l[g].container = b;
            b = a.mainRenderer.createButton(I, l[g].posX, l[g].posY, "tab", {
                text: l[g].text,
                align: "center",
                style: {font: "bold 30px Arial Narrow", fill: "#292929"}
            }, function (b, d) {
                if (!b.pressed) {
                    b.texture = a.mainRenderer.resourceLoader.resources.tab_pressed.texture;
                    b.getChildByName("texttab").style = {font: "bold 30px Arial Narrow", fill: "#ffffff"};
                    a.mainSoundManager.playSound("buttonClick");
                    for (var c in l) "info" !== c && l[c].button.pressed ? (l[c].button.pressed = !1, l[c].button.texture =
                        a.mainRenderer.resourceLoader.resources.tab.texture, l[c].button.getChildByName("texttab").style = {
                        font: "bold 30px Arial Narrow",
                        fill: "#292929"
                    }, V(l[c], l[b.name], "flipContainer")) : "info" === c && l[c].button.pressed && (l[c].button.pressed = !1, h.clickAnimationFunc(l[c].button, "btn_info"), V(l[c], l[b.name], "flipContainer"));
                    b.pressed = !0;
                    d && (d.stopped = !0);
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }, void 0, void 0, function (b) {
                b.pressed || (b.texture = a.mainRenderer.resourceLoader.resources.tab_selected.texture,
                    a.mainRenderer.renderManager.needUpdateRender = !0)
            }, function (b) {
                b.pressed || (b.texture = a.mainRenderer.resourceLoader.resources.tab.texture, a.mainRenderer.renderManager.needUpdateRender = !0)
            });
            b.rotation = -Math.PI / 2;
            b.name = g;
            l[g].button = b;
            l[g].pressedDefault && (l[g].button.pressed = !0, l[g].button.texture = a.mainRenderer.resourceLoader.resources.tab_pressed.texture, l[g].button.getChildByName("texttab").style = {
                font: "bold 30px Arial Narrow",
                fill: "#ffffff"
            }, l[g].container.scale.y = 1)
        }
        l.video.button.interactive =
            !1;
        l.video.button.getChildByName("texttab").text = "";
        b = {x: 599, y: 524};
        b = a.mainRenderer.createButton(l.info.container, 598 - b.x, 214 - b.y + 10, void 0, {
            text: mainLocalizationTable.coefHeader.toUpperCase(),
            align: "center",
            style: {font: "bold 34px Arial", fill: "#ffffff", align: "center"}
        });
        b.anchor.set(.5, .5);
        b = a.mainRenderer.createButton(l.info.container, -518, -263, "table_coef");
        b.scale.set(1, 1);
        var k = {font: "bold 30px Arial", fill: "#313131"};
        d = new PIXI.Text(mainLocalizationTable.selectedBalls.toUpperCase(), k);
        d.position.set(571,
            23);
        d.anchor.set(.5, .5);
        b.addChild(d);
        g = 3;
        var u = 108, w = 70;
        for (d = 1; 11 > d; d++) {
            var t = 9 < d ? 134 : 7 < d ? 105 : 7 == d ? 106 : 3 < d ? 90 : 60;
            u += t;
            var m = new PIXI.Text(d, k);
            m.position.set(u - Math.round(t / 2), w);
            m.anchor.set(.5, .5);
            b.addChild(m);
            u += g
        }
        d = new PIXI.Text(mainLocalizationTable.guessedBalls.toUpperCase(), k);
        d.position.set(22, 335);
        d.anchor.set(.5, .5);
        d.rotation = -Math.PI / 2;
        b.addChild(d);
        u = 76;
        w = 115;
        t = 41;
        for (d = 0; 11 > d; d++) m = new PIXI.Text(d, k), m.position.set(u, w), m.anchor.set(.5, .5), b.addChild(m), w += t + g;
        k = {
            font: "bold 30px Arial",
            fill: "#dbdbdb"
        };
        var v;
        u = 109;
        w = 94;
        g = 4;
        for (d = 0; d < a.mainGameManager.coefficients.length; d++) {
            w += 40;
            for (v = 0; v < a.mainGameManager.coefficients[d].length; v++) t = 8 < v ? 133 : 6 == v ? 103 : 5 < v ? 105 : 2 < v ? 89 : 0 == v ? 58 : 59, u += t, 0 != a.mainGameManager.coefficients[d][v] && (m = new PIXI.Text(a.mainGameManager.coefficients[d][v], k), m.position.set(u - Math.round(t / 2), w - 20), m.anchor.set(.5, .5), b.addChild(m)), u += g;
            u = 110;
            w += g
        }
        b = b = m = d = k = k = null;
        G = new c(265, 24, 82, void 0, !0);
        a.mainRenderer.stage.addChild(x);
        a.mainRenderer.stage.addChild(I);
        a.mainRenderer.stage.addChild(D);
        a.setMainGrid(new Grid(-549, -345, 10, 8, 10, l.game.container, a.mainRenderer));
        a.mainGrid.createZones(110, 86, {x: 0, y: 0}, {
            font: "bold 45px Arial Narrow",
            fill: "#e0e0e0",
            stroke: "#000000",
            strokeThickness: 4,
            align: "center"
        }, function (b, d, c) {
            if (b.selected || !(a.mainGrid.pressedZones.length >= a.mainGrid.maxPreessedZones)) {
                d ? b.selected || (b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture) : a.mainGrid.gridContainer.down = !0;
                if (d && a.mainGrid.gridContainer.down || !d &&
                    !c || c && (b.name != P || void 0 == P)) if (b.selected) {
                    if (-1 != a.mainGrid.selectedZones.indexOf(b)) if (b.isLock) switch (b.isLock) {
                        case 1:
                            b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                            break;
                        default:
                            b.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                    } else b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture; else b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture;
                    b.selected = !1;
                    a.mainGrid.pressedZones.splice(a.mainGrid.pressedZones.indexOf(b),
                        1);
                    aa(b, "rotate" + b.children[0].text, !0)
                } else b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture, aa(b, "rotate" + b.children[0].text), b.selected = !0, a.mainSoundManager.playSound("firstChip"), a.mainGrid.pressedZones.push(b);
                c && (P = b.name);
                a.mainGrid.gridContainer.down && Q();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }, function (b, d) {
            if (d) {
                if (!b.selected && !a.mainGrid.gridContainer.down) if (b.isLock) switch (b.isLock) {
                    case 1:
                        b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                        break;
                    default:
                        b.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                } else b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture
            } else a.mainGrid.gridContainer.down = !1, P = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, !0);
        a.mainRenderer.stage.on("changeLang", W);
        a.mainGameManager.gameStateAsync(function (b) {
            var d = 0 >= b.t2 ? b.tir : b.tir + 1;
            n.editions.length && n.editions[n.editions.length - 1].round === d || n.addEdition(d);
            if (n.editions.length && n.editions[n.editions.length -
            1].round === d) {
                d = n.editions[n.editions.length - 1].betsHistory.bets;
                for (var c, f = 0, g = 0; g < d.length; g++) {
                    f += d[g].summ;
                    for (var h = 0; h < d[g].bet.length; h++) switch (c = a.mainGrid.zones[d[g].bet[h] - 1], c.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, c.isLock ? c.isLock++ : c.isLock = 1, c.isLock) {
                        case 1:
                            c.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                            break;
                        default:
                            c.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                    }
                    c = null
                }
                a.mainFLGAccount.totalBet(f, !0);
                S = !0
            }
            n.drawEditions();
            R = new hotcoldGraphsKenoJX(b, l.stats, function (b, d) {
                var c = 0, f = 9;
                if (0 === d.children.length) {
                    var e = a.mainRenderer.createButton(d, -1, -310, void 0, {
                        text: mainLocalizationTable.hotcoldRating.replace(/%s/g, 100).toUpperCase(),
                        align: "center",
                        style: {font: "bold 34px Arial", fill: "#ffffff", align: "center"}
                    });
                    e.anchor.set(.5, .5);
                    d = a.mainRenderer.createButton(d, -531, -284, "hotcold_bg");
                    var g = new PIXI.Container;
                    d.addChild(g);
                    var h = new PIXI.Container;
                    d.addChild(h);
                    for (var k in b.cold) {
                        if (5 < c) break;
                        e = new PIXI.Graphics;
                        e.position.set(93 +
                            163 * c, 188);
                        g.addChild(e);
                        e = new PIXI.Graphics;
                        e.position.set(93 + 163 * c, 499);
                        h.addChild(e);
                        e = a.mainRenderer.createButton(d, 169 + 163 * c, 156, void 0, {
                            text: b.hot[c][1] + "%",
                            align: "center",
                            style: {font: "bold 50px Arial", fill: "#fe801b", align: "center"}
                        });
                        e.anchor.set(.5, .5);
                        e = a.mainRenderer.createButton(d, 169 + 163 * c, 246, void 0, {
                            text: b.hot[c][0],
                            align: "center",
                            style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                        });
                        e.anchor.set(.5, .5);
                        e = a.mainRenderer.createButton(d, 169 + 163 * c, 472, void 0, {
                            text: b.cold[f][1] +
                                "%", align: "center", style: {font: "bold 50px Arial", fill: "#9bccff", align: "center"}
                        });
                        e.anchor.set(.5, .5);
                        e = a.mainRenderer.createButton(d, 169 + 163 * c, 558, void 0, {
                            text: b.cold[f][0],
                            align: "center",
                            style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                        });
                        e.anchor.set(.5, .5);
                        c++;
                        f--
                    }
                } else for (k in d = d.children[1], g = d.children[0], h = d.children[1], b.cold) {
                    if (5 < c) break;
                    a.mainUIManager.animations()["anim_graph_hot" + c] && a.mainUIManager.animations()["anim_graph_hot" + c].stop();
                    a.mainUIManager.animations()["anim_graph_cold" +
                    c] && a.mainUIManager.animations()["anim_graph_cold" + c].stop();
                    g.children[c].clear();
                    h.children[c].clear();
                    d.children[4 * c + 2].children[0].text = "0%";
                    d.children[4 * c + 3].children[0].text = b.hot[c][0];
                    d.children[4 * c + 4].children[0].text = "0%";
                    d.children[4 * c + 5].children[0].text = b.cold[f][0];
                    c++;
                    f--
                }
            }, function (b, d) {
                if (0 !== d.children.length) {
                    var c = d.children[1].children[0], f = d.children[1].children[1], e = 0, g = 9, h;
                    for (h in b.cold) {
                        if (5 < e) break;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations()["anim_graph_hot" +
                        e] = (new TWEEN.Tween({
                            percentage: 0,
                            data: {rect: c.children[e], iteration: e, percentText: d.children[1].children[4 * e + 2]}
                        })).to({percentage: b.hot[e][1]}, 990).easing(TWEEN.Easing.Back.Out).onStop(function () {
                            this.data.rect.clear();
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations()["anim_graph_hot" + this.data.iteration] = null
                        }).onUpdate(function () {
                            this.data.rect.clear();
                            this.data.rect.beginFill(247660544);
                            this.data.rect.drawRect(0, 0, 153, -188 * this.percentage / 100);
                            this.data.rect.endFill;
                            this.data.percentText.children[0].text = this.percentage.toFixed(0) + "%"
                        }).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations()["anim_graph_hot" + this.data.iteration] = null
                        }).start();
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations()["anim_graph_cold" + e] = (new TWEEN.Tween({
                            percentage: 0,
                            data: {rect: f.children[e], iteration: e, percentText: d.children[1].children[4 * e + 4]}
                        })).to({percentage: b.cold[g][1]}, 990).easing(TWEEN.Easing.Back.Out).onStop(function () {
                            this.data.rect.clear();
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations()["anim_graph_hot" + this.data.iteration] = null
                        }).onUpdate(function () {
                            this.data.rect.clear();
                            this.data.rect.beginFill(2781141);
                            this.data.rect.drawRect(0, 0, 153, -188 * this.percentage / 100);
                            this.data.rect.endFill;
                            this.data.percentText.children[0].text = this.percentage.toFixed(0) + "%"
                        }).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations()["anim_graph_cold" + this.data.iteration] = null
                        }).start();
                        e++;
                        g--
                    }
                }
            });
            R.draw();
            n.events.emit("GRID_STATS", b);
            F.drawCustomJackpot(function (b, d) {
                var c = a.mainRenderer.stage.getChildByName("JackpotContainer"), f = formatFLGNums(d.toFixed(2), !0);
                if (c) {
                    var e = c.children[1];
                    c = c.children[2]
                } else c = a.mainRenderer.createButton(void 0, 1296, 179), c.name = "JackpotContainer", a.mainRenderer.createButton(c, 485, 36, "jp_name").anchor.set(.5, .5), e = a.mainRenderer.createButton(c, 3, 3), c = a.mainRenderer.createButton(c, 0, 68);
                for (var g = 0; g < e.children.length; g++) e.children[g].visible = !1;
                d = 0;
                g = f.length - 1;
                for (var h = 0; 0 <= g; g--, h++) {
                    var k = e.children[h];
                    var l = "." !== f[g] && " " !== f[g];
                    if (k) k.visible = !0, k.position.x = d, l || (k.position.x = k.position.x + e.children[0].width - 1), l && k.children[0].children[0].text !== f[g] && (k.children[0].children[1].text = f[g], a.mainRenderer.renderManager.animationTweenInc(), (new TWEEN.Tween({
                        firstPosY: k.children[0].children[0].position.y,
                        secondPosY: k.children[0].children[1].position.y,
                        numberSprite: e.children[h]
                    })).to({
                        firstPosY: k.children[0].children[0].position.y - k.height,
                        secondPosY: k.children[0].children[1].position.y - k.height
                    }, 865).onUpdate(function () {
                        this.numberSprite.children[0].children[0].position.y = this.firstPosY;
                        this.numberSprite.children[0].children[1].position.y = this.secondPosY
                    }).onComplete(function () {
                        this.numberSprite.children[0].children[0].text = this.numberSprite.children[0].children[1].text;
                        this.numberSprite.children[0].children[0].position.y = 0;
                        this.numberSprite.children[0].children[1].position.y = this.numberSprite.height;
                        a.mainRenderer.renderManager.animationTweenDec()
                    }).start());
                    else if (l) {
                        k = a.mainRenderer.createButton(e, d, 0, "jp_num_bot");
                        l = a.mainRenderer.createButton(k, k.width / 2, k.height / 2);
                        l.anchor.set(.5, .5);
                        var m = new PIXI.Text(f[g], {font: "bold 38px Arial", fill: "#000000", align: "center"});
                        m.anchor.set(.5, .5);
                        l.addChild(m);
                        m = new PIXI.Text(f[g], {font: "bold 38px Arial", fill: "#000000", align: "center"});
                        m.position.y = k.height;
                        m.anchor.set(.5, .5);
                        l.addChild(m);
                        m = new PIXI.Graphics;
                        m.beginFill();
                        m.drawRect(0, 0, k.width, k.height);
                        m.endFill;
                        l.mask = m;
                        l.parent.addChild(m);
                        m = null;
                        a.mainRenderer.createButton(k,
                            0, 0, "jp_num_top");
                        m = l = null
                    } else k = a.mainRenderer.createButton(e, d + e.children[0].width - 1, 36, void 0, {
                        text: " " === f[g] ? "," : f[g],
                        align: "center",
                        style: {font: "bold 38px Arial", fill: "#fefefe", align: "center"}
                    });
                    h !== f.length - 1 && (d -= k.width, d -= 6, e.position.x = -d)
                }
                d = 0;
                g = e.position.x + e.children[0].width;
                e = .8 * g / 10;
                f = .2 * g / 9;
                for (g = 0; 10 > g; g++) {
                    k = c.children[g];
                    switch (g) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            var n = 65280;
                            break;
                        case 7:
                        case 8:
                            n = 15973429;
                            break;
                        case 9:
                            n = 15352834
                    }
                    k ? (k.clear(), k.beginFill(n), k.drawRect(d,
                        0, e, 4), k.endFill) : (k = new PIXI.Graphics, k.beginFill(n), k.drawRect(d, 0, e, 4), k.endFill, c.addChild(k));
                    d += e + f;
                    k.visible = g <= parseInt(b)
                }
                k = null;
                a.mainRenderer.renderManager.needUpdateRender = !0;
                c = c = null
            });
            F.updateJackpotData(b);
            a.mainFLGAccount.autoplayManager.updateCallback = function (b) {
                if (!(2 > n.editions.length)) {
                    switch (b) {
                        case "repeatLastBet":
                            var d = b = -1;
                            var c = n.editions.length - 2;
                            break;
                        case "getOnlyBets":
                            d = b = void 0;
                            c = n.editions.length - 1;
                            break;
                        default:
                            b = n.editions[n.editions.length - 2].betsHistory.setTotalWin(),
                                d = a.mainFLGAccount.balance(), c = n.editions.length - 2
                    }
                    a.mainFLGAccount.autoplayManager.update(n.editions[c].betsHistory.bets, b, d, function (b) {
                            if (a.mainGameManager) {
                                if (T) {
                                    for (var d = 0; d < b.length; d++) b[d].summ *= 2;
                                    T = !1
                                }
                                0 < b.length && n.getActedOutEdition().betsHistory.addBet(b, n.getActedOutEdition().round, function (b) {
                                    if (b && b.length) {
                                        var d;
                                        for (d = 0; d < b.length; d++) for (var c = 0; c < b[d].bet.length; c++) {
                                            var f = a.mainGrid.zones[b[d].bet[c] - 1];
                                            f.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                            f.isLock ?
                                                f.isLock++ : f.isLock = 1;
                                            switch (f.isLock) {
                                                case 1:
                                                    f.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                                    break;
                                                default:
                                                    f.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                                            }
                                        }
                                    } else if (b) for (c = 0; c < b.bet.length; c++) switch (f = a.mainGrid.zones[b.bet[c] - 1], f.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, f.isLock ? f.isLock++ : f.isLock = 1, f.isLock) {
                                        case 1:
                                            f.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                            break;
                                        default:
                                            f.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                                    }
                                })
                            }
                        },
                        n.editions[c].round)
                }
            };
            U(b);
            e && e()
        })
    }, function () {
        a.mainSoundManager.playRandomBackSound()
    });
    var W = function () {
        a.mainFLGAccount.updateAccountText();
        n.redrawEditionHeader();
        n.drawBetsHeader();
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.onLanguageChange = W;
    this.setInteraction = function (b) {
        x.getChildByName("btn_clear").children[0].interactive = b;
        a.mainGrid.setZoneInteraction(b);
        x.getChildByName("random").interactive = b;
        x.getChildByName("plus").interactive = b;
        p.children[2].children[0].visible = b;
        a.mainRenderer.renderManager.needUpdateRender =
            !0
    };
    this.setTextScale = function (a) {
        a.text == "MAX\n" + z ? a.scale.set(.6, .6) : a.scale.set(1, 1)
    };
    var Q = function () {
        var b = 0;
        0 < a.mainGrid.pressedZones.length && 0 < r.currentBet() && (b = r.currentBet() * a.mainGameManager.coefficients[a.mainGrid.pressedZones.length][a.mainGrid.pressedZones.length - 1]);
        a.mainFLGAccount.maxWin(b)
    }, fa = 0, ia = 0, U = function (b) {
        function d(b) {
            a.mainGameManager && (p.children[2].mask.clear(), p.children[2].mask.beginFill(), p.children[2].mask.drawRect(3, 0, 1914 * b, 28), p.children[2].mask.endFill, p.children[2].children[1].children[0].text =
                M.getTimerText(), p.children[1].children[0].text = M.getTimerText(), a.mainRenderer.renderManager.needUpdateRender = !0)
        }

        function c(b) {
            if (a.mainGameManager) {
                p.children[2].clear();
                p.children[2].beginFill(42577);
                p.children[2].drawRect(3, 3, 1914, 22);
                p.children[2].endFill;
                S ? S = !1 : (a.mainFLGAccount.setWinTextVisible(!0), a.mainGrid.removeSelectedBets(), a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_transp.texture, {
                    font: "bold 45px Arial Narrow", fill: "#e0e0e0", stroke: "#000000", strokeThickness: 4,
                    align: "center"
                }, void 0, a.mainGrid.getIntArrayOfZones()));
                R.update(b);
                a.mainUIManager.setInteraction(!0);
                n.addEdition(b.tir + 1);
                a.mainFLGAccount.autoplayManager.updateCallback();
                F.updateJackpotData(b);
                var c = [], e;
                for (e = 1; 21 > e; e++) c.push(b["b" + e]);
                G.startDrawBalls(c, 1, 0);
                c = a.mainRenderer.stage.getChildByName("roundText").children[0];
                c.text = "#" + b.tir;
                c = null;
                1 < n.editions.length && n.drawDetailEditionHistory(l.history.container, n.editions.length - 2);
                M.start({
                    minutes: 0, seconds: (b.time_round ? b.time_round : a.kenoConfig.tirTime) -
                        a.kenoConfig.timerOffset - b.t2
                }, {
                    minutes: 0,
                    seconds: (b.time_round ? b.time_round : a.kenoConfig.tirTime) - a.kenoConfig.timerOffset
                }, d, function () {
                    a.mainGameManager && (a.mainGrid.removeCurrentBets(), a.mainGrid.removeFuckingHoverTexture(), G.removeBalls(), a.mainRenderer.stage.getChildByName("roundText").children[0].text = "#" + n.editions[n.editions.length - 1].round, a.mainUIManager.setInteraction(!1), a.mainSoundManager.playSound("endBet"))
                }, .1, U);
                n.events.emit("BET_TIME", b)
            }
        }

        function e(b) {
            function d() {
                a.mainGameManager &&
                (a.mainGameManager.gameStateAsync(c), a.mainRenderer.renderManager.needUpdateRender = !0)
            }

            function c(b) {
                function c(b) {
                    if (a.mainGrid && a.mainGameManager) if (e >= f.length) b(); else {
                        var d = f.slice(0, e + 1), g = "resultBalls" + e, h = a.mainGrid.zones[parseInt(f[e]) - 1];
                        a.mainUIManager.simpleFlipXFunc(h, g, 225, 225, function (b) {
                            b.texture = b.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                        });
                        G.startDrawBalls(d, 1, 0);
                        n.cancelLastEdition(d);
                        e += 1;
                        setTimeout(function () {
                                c(b)
                            },
                            450)
                    }
                }

                if (a.mainGameManager) if (99 === b.b1) setTimeout(d, 2E3); else {
                    var f = [b.b1, b.b2, b.b3, b.b4, b.b5, b.b6, b.b7, b.b8, b.b9, b.b10, b.b11, b.b12, b.b13, b.b14, b.b15, b.b16, b.b17, b.b18, b.b19, b.b20],
                        e = limit(g, 0, 19);
                    if (0 !== e) {
                        var h;
                        for (h = 0; h <= e; h++) {
                            var k = "resultBalls" + h, m = a.mainGrid.zones[parseInt(f[h]) - 1];
                            a.mainUIManager.simpleFlipXFunc(m, k, 225, 225, function (b) {
                                b.texture = b.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                            })
                        }
                    }
                    c(function () {
                        a.mainFLGAccount.calculateWin(n.getActedOutEdition().betsHistory.bets,
                            a.kenoConfig.appName, function () {
                                n.getActedOutEdition().betsHistory.setTotalWin(a.mainFLGAccount.totalWin());
                                n.getActedOutEdition().betsHistory.redrawCurrentBets();
                                p.children[2].clear();
                                p.children[2].beginFill(0);
                                p.children[2].drawRect(3, 3, 1914, 22);
                                p.children[2].endFill;
                                var d = a.kenoConfig.winShowTime ? a.kenoConfig.winShowTime : 8E3;
                                fa = setTimeout(U, d);
                                F.updateJackpotData(b);
                                F.drawJackpotWin(2E4, {
                                    x: 1584,
                                    y: 700
                                }, a.mainRenderer.resourceLoader.resources.JP.texture);
                                l.video.button.pressed ? setTimeout(function () {
                                    l.game.button.emit("mousedown");
                                    a.mainFLGAccount.winToBalanceAnimation(d - 2E3, 2E3, {
                                        x: 602,
                                        y: 527
                                    }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                        font: "bold 70px Arial",
                                        fill: "#bcbcbc"
                                    }, F.jpWin())
                                }, 2E3) : a.mainFLGAccount.winToBalanceAnimation(d, 2E3, {
                                    x: 602,
                                    y: 527
                                }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                    font: "bold 70px Arial",
                                    fill: "#bcbcbc"
                                }, F.jpWin())
                            }, a.kenoConfig);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    })
                }
            }

            if (a.mainGameManager) {
                n.events.emit("RESULT_TIME");
                p.children[2].clear();
                p.children[2].beginFill(12531501);
                p.children[2].drawRect(3, 3, 1914, 22);
                p.children[2].endFill;
                1 < n.editions.length && n.drawDetailEditionHistory(l.history.container, n.editions.length - 2);
                var e = a.mainRenderer.stage.getChildByName("roundText").children[0];
                e.text = "#" + b.tir;
                e = null;
                var g = a.kenoConfig.rTime - parseInt(b.tOrig, 10) - 1;
                0 > g ? setTimeout(d, 1E3 * -g) : d();
                a.mainUIManager.setInteraction(!1);
                S ? (b = a.mainFLGAccount.totalBet(), a.mainFLGAccount.setWinTextVisible(!1), a.mainFLGAccount.totalBet(b, !0), S = !1) : a.mainFLGAccount.setWinTextVisible(!1)
            }
        }

        function g(a) {
            0 >=
            a.t2 ? e(a) : c(a)
        }

        void 0 != a.mainGameManager && (b ? g(b) : a.mainGameManager.gameStateAsync(g))
    };
    this.drawGridHotCold = function (b) {
        if (A.prevGmState || b) {
            var d = A.prevGmState;
            b && (d = b, A.prevGmState = b);
            var c = {
                font: "bold 45px Arial Narrow",
                fill: "#e0e0e0",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center"
            };
            b = 0;
            for (var e = 9; 6 > b; b++, e--) a.mainGrid.zones[parseInt(d.hot[b][0], 10) - 1].children[0].style = c, a.mainGrid.zones[parseInt(d.cold[e][0], 10) - 1].children[0].style = c;
            a.mainRenderer.renderManager.needUpdateRender = !0;
            if (A.needShow) {
                c =
                    {
                        font: "bold 45px Arial Narrow",
                        fill: "#41a0ff",
                        stroke: "#000000",
                        strokeThickness: 4,
                        align: "center"
                    };
                var g = {
                    font: "bold 45px Arial Narrow",
                    fill: "#ff5050",
                    stroke: "#000000",
                    strokeThickness: 4,
                    align: "center"
                };
                b = 0;
                for (e = 9; 6 > b; b++, e--) a.mainGrid.zones[parseInt(d.hot[b][0], 10) - 1].children[0].style = g, a.mainGrid.zones[parseInt(d.cold[e][0], 10) - 1].children[0].style = c;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }
    };
    n.events.on("GRID_STATS", h.drawGridHotCold);
    n.events.on("BET_TIME", h.drawGridHotCold)
}

function hotcoldGraphsKenoJX(a, c, e, h) {
    this.destroy = function () {
        v = t = null;
        c.onStartOpen = null;
        c.onStopOpen = null;
        for (var a in g) g[a] = null;
        g = null
    };
    var g = this, v = function () {
        if (t.hot && t.cold) {
            for (var a = [], c = 0; 6 > c; c++) a.push([t.hot[c][0], t.hot[c][1]]);
            a.sort(function (a, c) {
                if (a[0] > c[0]) return 1;
                if (a[0] < c[0]) return -1
            });
            for (c = 0; c < a.length; c++) t.hot[c][0] = a[c][0], t.hot[c][1] = a[c][1];
            a = [];
            for (c = 9; 4 <= c; c--) a.push([t.cold[c][0], t.cold[c][1]]);
            a.sort(function (a, c) {
                if (a[0] > c[0]) return 1;
                if (a[0] < c[0]) return -1
            });
            c = 0;
            for (var e = 9; c < a.length; c++, e--) t.cold[e][0] = a[c][0], t.cold[e][1] = a[c][1];
            a = null
        }
    }, t = a;
    v();
    this.update = function (a) {
        t = a;
        v();
        g.draw();
        g.drawGraphs()
    };
    this.draw = function () {
        e && e(t, c.container)
    };
    this.drawGraphs = function () {
        h && h(t, c.container)
    };
    c.onStartOpen = g.draw;
    c.onStopOpen = g.drawGraphs
}

function StatisticsManager(a, c) {
    this.destroy = function () {
        clearTimeout(z);
        v = t = u = g = h = null;
        for (var a in e) e[a] = null;
        e = null
    };
    var e = this, h = {}, g = function (c) {
        for (c = 0; c < a; c++) h[c + ""] = Math.floor(4 * Math.random())
    }, v, t = function () {
        var c = 100 * (1 - v.curCount / v.totalCount);
        c = Math.round(c) / 100;
        for (var e = {}, g, t = 0; t < a; t++) g = Math.round(h[t + ""] * c), v.prevStats && v.prevStats[t + ""] === g || (e[t + ""] = g);
        return v.prevStats = e
    }, u = function () {
        c(t());
        --v.curCount;
        0 > v.curCount || (z = setTimeout(u, w))
    }, w = 5E3, z = 0;
    this.update = function (a, e, p) {
        clearTimeout(z);
        g(parseInt(a, 1));
        p < 2 * w ? c(h, !0) : (v = {curCount: Math.floor(p / w), totalCount: Math.floor(e / w)}, u())
    }
};
