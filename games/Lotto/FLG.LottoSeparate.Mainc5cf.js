var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (a) {
    var b = 0;
    return function () {
        return b < a.length ? {done: !1, value: a[b++]} : {done: !0}
    }
};
$jscomp.arrayIterator = function (a) {
    return {next: $jscomp.arrayIteratorImpl(a)}
};
$jscomp.makeIterator = function (a) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : $jscomp.arrayIterator(a)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, e) {
    a != Array.prototype && a != Object.prototype && (a[b] = e.value)
};
$jscomp.polyfill = function (a, b, e, k) {
    if (b) {
        e = $jscomp.global;
        a = a.split(".");
        for (k = 0; k < a.length - 1; k++) {
            var h = a[k];
            h in e || (e[h] = {});
            e = e[h]
        }
        a = a[a.length - 1];
        k = e[a];
        b = b(k);
        b != k && null != b && $jscomp.defineProperty(e, a, {configurable: !0, writable: !0, value: b})
    }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function (a) {
    function b() {
        this.batch_ = null
    }

    function e(a) {
        return a instanceof h ? a : new h(function (b, e) {
            b(a)
        })
    }

    if (a && !$jscomp.FORCE_POLYFILL_PROMISE) return a;
    b.prototype.asyncExecute = function (a) {
        if (null == this.batch_) {
            this.batch_ = [];
            var b = this;
            this.asyncExecuteFunction(function () {
                b.executeBatch_()
            })
        }
        this.batch_.push(a)
    };
    var k = $jscomp.global.setTimeout;
    b.prototype.asyncExecuteFunction = function (a) {
        k(a, 0)
    };
    b.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length;) {
            var a =
                this.batch_;
            this.batch_ = [];
            for (var b = 0; b < a.length; ++b) {
                var e = a[b];
                a[b] = null;
                try {
                    e()
                } catch (G) {
                    this.asyncThrow_(G)
                }
            }
        }
        this.batch_ = null
    };
    b.prototype.asyncThrow_ = function (a) {
        this.asyncExecuteFunction(function () {
            throw a;
        })
    };
    var h = function (a) {
        this.state_ = 0;
        this.result_ = void 0;
        this.onSettledCallbacks_ = [];
        var b = this.createResolveAndReject_();
        try {
            a(b.resolve, b.reject)
        } catch (t) {
            b.reject(t)
        }
    };
    h.prototype.createResolveAndReject_ = function () {
        function a(a) {
            return function (p) {
                e || (e = !0, a.call(b, p))
            }
        }

        var b = this, e = !1;
        return {resolve: a(this.resolveTo_), reject: a(this.reject_)}
    };
    h.prototype.resolveTo_ = function (a) {
        if (a === this) this.reject_(new TypeError("A Promise cannot resolve to itself")); else if (a instanceof h) this.settleSameAsPromise_(a); else {
            a:switch (typeof a) {
                case "object":
                    var b = null != a;
                    break a;
                case "function":
                    b = !0;
                    break a;
                default:
                    b = !1
            }
            b ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a)
        }
    };
    h.prototype.resolveToNonPromiseObj_ = function (a) {
        var b = void 0;
        try {
            b = a.then
        } catch (t) {
            this.reject_(t);
            return
        }
        "function" == typeof b ?
            this.settleSameAsThenable_(b, a) : this.fulfill_(a)
    };
    h.prototype.reject_ = function (a) {
        this.settle_(2, a)
    };
    h.prototype.fulfill_ = function (a) {
        this.settle_(1, a)
    };
    h.prototype.settle_ = function (a, b) {
        if (0 != this.state_) throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.state_);
        this.state_ = a;
        this.result_ = b;
        this.executeOnSettledCallbacks_()
    };
    h.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
            for (var a = 0; a < this.onSettledCallbacks_.length; ++a) y.asyncExecute(this.onSettledCallbacks_[a]);
            this.onSettledCallbacks_ = null
        }
    };
    var y = new b;
    h.prototype.settleSameAsPromise_ = function (a) {
        var b = this.createResolveAndReject_();
        a.callWhenSettled_(b.resolve, b.reject)
    };
    h.prototype.settleSameAsThenable_ = function (a, b) {
        var e = this.createResolveAndReject_();
        try {
            a.call(b, e.resolve, e.reject)
        } catch (G) {
            e.reject(G)
        }
    };
    h.prototype.then = function (a, b) {
        function e(a, b) {
            return "function" == typeof a ? function (b) {
                try {
                    k(a(b))
                } catch (M) {
                    m(M)
                }
            } : b
        }

        var k, m, p = new h(function (a, b) {
            k = a;
            m = b
        });
        this.callWhenSettled_(e(a, k), e(b, m));
        return p
    };
    h.prototype.catch = function (a) {
        return this.then(void 0, a)
    };
    h.prototype.callWhenSettled_ = function (a, b) {
        function e() {
            switch (h.state_) {
                case 1:
                    a(h.result_);
                    break;
                case 2:
                    b(h.result_);
                    break;
                default:
                    throw Error("Unexpected state: " + h.state_);
            }
        }

        var h = this;
        null == this.onSettledCallbacks_ ? y.asyncExecute(e) : this.onSettledCallbacks_.push(e)
    };
    h.resolve = e;
    h.reject = function (a) {
        return new h(function (b, e) {
            e(a)
        })
    };
    h.race = function (a) {
        return new h(function (b, h) {
            for (var k = $jscomp.makeIterator(a), m = k.next(); !m.done; m = k.next()) e(m.value).callWhenSettled_(b,
                h)
        })
    };
    h.all = function (a) {
        var b = $jscomp.makeIterator(a), k = b.next();
        return k.done ? e([]) : new h(function (a, h) {
            function m(b) {
                return function (e) {
                    t[b] = e;
                    p--;
                    0 == p && a(t)
                }
            }

            var t = [], p = 0;
            do t.push(void 0), p++, e(k.value).callWhenSettled_(m(t.length - 1), h), k = b.next(); while (!k.done)
        })
    };
    return h
}, "es6", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {
    };
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function () {
    var a = 0;
    return function (b) {
        return $jscomp.SYMBOL_PREFIX + (b || "") + a++
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
    var a = {a: !0}, b = {};
    try {
        return b.__proto__ = a, b.a
    } catch (e) {
    }
    return !1
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function (a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
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
$jscomp.generator.Context.prototype.yield = function (a, b) {
    this.nextAddress = b;
    return {value: a}
};
$jscomp.generator.Context.prototype.yieldAll = function (a, b) {
    a = $jscomp.makeIterator(a);
    var e = a.next();
    $jscomp.generator.ensureIteratorResultIsObject_(e);
    if (e.done) this.yieldResult = e.value, this.nextAddress = b; else return this.yieldAllIterator_ = a, this.yield(e.value, b)
};
$jscomp.generator.Context.prototype.jumpTo = function (a) {
    this.nextAddress = a
};
$jscomp.generator.Context.prototype.jumpToEnd = function () {
    this.nextAddress = 0
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function (a, b) {
    this.catchAddress_ = a;
    void 0 != b && (this.finallyAddress_ = b)
};
$jscomp.generator.Context.prototype.setFinallyBlock = function (a) {
    this.catchAddress_ = 0;
    this.finallyAddress_ = a || 0
};
$jscomp.generator.Context.prototype.leaveTryBlock = function (a, b) {
    this.nextAddress = a;
    this.catchAddress_ = b || 0
};
$jscomp.generator.Context.prototype.enterCatchBlock = function (a) {
    this.catchAddress_ = a || 0;
    a = this.abruptCompletion_.exception;
    this.abruptCompletion_ = null;
    return a
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function (a, b, e) {
    e ? this.finallyContexts_[e] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
    this.catchAddress_ = a || 0;
    this.finallyAddress_ = b || 0
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function (a, b) {
    b = this.finallyContexts_.splice(b || 0)[0];
    if (b = this.abruptCompletion_ = this.abruptCompletion_ || b) {
        if (b.isException) return this.jumpToErrorHandler_();
        void 0 != b.jumpTo && this.finallyAddress_ < b.jumpTo ? (this.nextAddress = b.jumpTo, this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_
    } else this.nextAddress = a
};
$jscomp.generator.Context.prototype.forIn = function (a) {
    return new $jscomp.generator.Context.PropertyIterator(a)
};
$jscomp.generator.Context.PropertyIterator = function (a) {
    this.object_ = a;
    this.properties_ = [];
    for (var b in a) this.properties_.push(b);
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
    var b = this.context_.yieldAllIterator_;
    if (b) return this.yieldAllStep_("return" in b ? b["return"] : function (a) {
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
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function (a, b, e) {
    try {
        var k = a.call(this.context_.yieldAllIterator_, b);
        $jscomp.generator.ensureIteratorResultIsObject_(k);
        if (!k.done) return this.context_.stop_(), k;
        var h = k.value
    } catch (y) {
        return this.context_.yieldAllIterator_ = null, this.context_.throw_(y), this.nextStep_()
    }
    this.context_.yieldAllIterator_ = null;
    e.call(this.context_, h);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.nextStep_ = function () {
    for (; this.context_.nextAddress;) try {
        var a = this.program_(this.context_);
        if (a) return this.context_.stop_(), {value: a.value, done: !1}
    } catch (b) {
        this.context_.yieldResult = void 0, this.context_.throw_(b)
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
    this.next = function (b) {
        return a.next_(b)
    };
    this.throw = function (b) {
        return a.throw_(b)
    };
    this.return = function (b) {
        return a.return_(b)
    };
    $jscomp.initSymbolIterator();
    this[Symbol.iterator] = function () {
        return this
    }
};
$jscomp.generator.createGenerator = function (a, b) {
    b = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));
    $jscomp.setPrototypeOf && $jscomp.setPrototypeOf(b, a.prototype);
    return b
};
$jscomp.asyncExecutePromiseGenerator = function (a) {
    function b(b) {
        return a.next(b)
    }

    function e(b) {
        return a.throw(b)
    }

    return new Promise(function (k, h) {
        function y(a) {
            a.done ? k(a.value) : Promise.resolve(a.value).then(b, e).then(y, h)
        }

        y(a.next())
    })
};
$jscomp.asyncExecutePromiseGeneratorFunction = function (a) {
    return $jscomp.asyncExecutePromiseGenerator(a())
};
$jscomp.asyncExecutePromiseGeneratorProgram = function (a) {
    return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)))
};
$jscomp.checkStringArgs = function (a, b, e) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + e + " must not be null or undefined");
    if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + e + " must not be a regular expression");
    return a + ""
};
$jscomp.polyfill("String.prototype.repeat", function (a) {
    return a ? a : function (a) {
        var b = $jscomp.checkStringArgs(this, null, "repeat");
        if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value");
        a |= 0;
        for (var k = ""; a;) if (a & 1 && (k += b), a >>>= 1) b += b;
        return k
    }
}, "es6", "es3");
$jscomp.polyfill("Object.is", function (a) {
    return a ? a : function (a, e) {
        return a === e ? 0 !== a || 1 / a === 1 / e : a !== a && e !== e
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function (a) {
    return a ? a : function (a, e) {
        var b = this;
        b instanceof String && (b = String(b));
        var h = b.length;
        e = e || 0;
        for (0 > e && (e = Math.max(e + h, 0)); e < h; e++) {
            var y = b[e];
            if (y === a || Object.is(y, a)) return !0
        }
        return !1
    }
}, "es7", "es3");
$jscomp.polyfill("String.prototype.includes", function (a) {
    return a ? a : function (a, e) {
        return -1 !== $jscomp.checkStringArgs(this, a, "includes").indexOf(a, e || 0)
    }
}, "es6", "es3");
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_2_min",
    image: "games/Lotto/resources/icons/lotto-5-36-front.png",
    imageBack: "games/Lotto/resources/icons/lotto-5-36-back.png",
    caption: "Lotto Blue 5/36",
    runConfig: "LottoNew",
    gameType: "blue",
    playInDemo: !0,
    gameBG: "images/games-bg/game-bg-red.jpg"
});
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_2_min",
    image: "games/Lotto/resources/icons/lotto-6-42-front.png",
    imageBack: "games/Lotto/resources/icons/lotto-6-42-back.png",
    caption: "Lotto Red 6/42",
    runConfig: "LottoNew",
    gameType: "red",
    playInDemo: !0,
    gameBG: "images/games-bg/game-bg-red.jpg"
});
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_2_min",
    image: "games/Lotto/resources/icons/lotto-7-49-front.png",
    imageBack: "games/Lotto/resources/icons/lotto-7-49-back.png",
    caption: "Lotto Green 7/49",
    runConfig: "LottoNew",
    gameType: "green",
    playInDemo: !0,
    gameBG: "images/games-bg/game-bg-red.jpg"
});
var configsLottoNew = {
    runconfig: "Lotto", blue: {
        serverName: "srv72",
        appName: "bets_72",
        serverNum: "s72",
        coefTable: {1: [0, 1, 3, 10, 100, 1E3], 2: [0, 0, 5, 15, 150, 3E3], 3: [0, 0, 0, 60, 300, 1E4]},
        videoURL: "rtmp://w1.flg10.bet:1935/keno&amp;Video0=stream3:150&amp",
        videoMobileURL: "https://w1.flg10.bet/LottoGamer-5-36/myStream/playlist.m3u8",
        videoPos: {x: 54, y: 220},
        gridPos: {x: 72, y: 343},
        gridNumColor: "#75a2c3",
        gridNumColorSelected: "#4393ce",
        menuBgColor: "0x1d59c7",
        gridOffsetY: 55,
        videoSize: {w: 1089, h: 663},
        ballCount: 5,
        resBallX: 263,
        zonesCount: 36,
        histPrefix: "game_5_36",
        tirTime: 80,
        timerOffset: 12,
        canvasId: "",
        runconfig: "LottoBlue",
        gameType: "Blue",
        gameKind: "LottoSeparate",
        gameVariant: "",
        gameNum: 1,
        resultBallsNum: 0,
        gameBG: "images/games-bg/game-bg-blue.jpg",
        caption: "Lotto_5/36",
        startIndDetailHist: 0,
        rTime: -15
    }, red: {
        serverName: "srv73",
        appName: "bets_73",
        serverNum: "s73",
        coefTable: {1: [0, 1, 2, 5, 25, 100, 1E3], 2: [0, 0, 3, 12, 50, 250, 5E3], 3: [0, 0, 0, 25, 150, 500, 1E4]},
        videoURL: "rtmp://w2.flg10.bet:1935/keno-fast&amp;Video0=stream3:150&amp",
        videoMobileURL: "https://w1.flg10.bet/LottoGamer-6-42/myStream/playlist.m3u8",
        videoPos: {x: 54, y: 220},
        gridPos: {x: 72, y: 289},
        gridNumColor: "#c28d76",
        gridNumColorSelected: "#ca6236",
        menuBgColor: "0xaf0f17",
        gridOffsetY: 0,
        videoSize: {w: 1089, h: 663},
        ballCount: 6,
        resBallX: 193,
        zonesCount: 42,
        histPrefix: "game_6_42",
        tirTime: 80,
        timerOffset: 15,
        canvasId: "",
        runconfig: "LottoRed",
        gameType: "Red",
        gameKind: "LottoSeparate",
        gameVariant: "",
        gameNum: 2,
        resultBallsNum: 1,
        gameBG: "images/games-bg/game-bg-red.jpg",
        caption: "Lotto_6/42",
        startIndDetailHist: 5,
        rTime: -16
    }, green: {
        serverName: "srv74",
        appName: "bets_74",
        serverNum: "s74",
        coefTable: {
            1: [0, 1, 2, 3, 4, 5, 100, 1E3],
            2: [0, 0, 2, 9, 20, 100, 1E3, 1E4],
            3: [0, 0, 0, 15, 50, 200, 2E3, 2E4]
        },
        videoURL: "rtmp://w2.flg10.bet:1935/keno-fast1min&amp;Video0=stream:150&amp",
        videoMobileURL: "https://w1.flg10.bet/LottoGamer-7-49/myStream/playlist.m3u8",
        videoPos: {x: 54, y: 220},
        gridPos: {x: 72, y: 289},
        gridNumColor: "#86b385",
        gridNumColorSelected: "#4fac4c",
        menuBgColor: "0x2aaf30",
        gridOffsetY: 0,
        videoSize: {w: 1089, h: 663},
        ballCount: 7,
        resBallX: 120,
        zonesCount: 49,
        histPrefix: "game_7_49",
        tirTime: 80,
        timerOffset: 13,
        canvasId: "",
        runconfig: "LottoGreen",
        gameType: "Green",
        gameKind: "LottoSeparate",
        gameVariant: "",
        gameNum: 3,
        resultBallsNum: 2,
        gameBG: "images/games-bg/game-bg-green.jpg",
        caption: "Lotto_7/49",
        startIndDetailHist: 11,
        rTime: -14
    }
}, LottoNewObjectsArr = {green: void 0, blue: void 0, red: void 0};

function emitEventLottoNew(a, b) {
    void 0 != LottoNewObjectsArr.green && LottoNewObjectsArr.green.mainRenderer.stage.emit(a, b);
    void 0 != LottoNewObjectsArr.red && LottoNewObjectsArr.red.mainRenderer.stage.emit(a, b);
    void 0 != LottoNewObjectsArr.blue && LottoNewObjectsArr.blue.mainRenderer.stage.emit(a, b)
}

function removeLottoNewObject(a, b) {
    if (void 0 != LottoNewObjectsArr[b]) {
        LottoNewObjectsArr[b].destroy();
        for (var e in LottoNewObjectsArr[b]) LottoNewObjectsArr[b][e] = null;
        LottoNewObjectsArr[b] = null
    }
    $("#" + a + " canvas").remove();
    $("#" + a + " div").remove()
}

function initLottoNewObject(a, b) {
    configsLottoNew[b].canvasId = a;
    LottoNewObjectsArr[b] = mobileMode ? new LottoNewAppObjMobile(configsLottoNew, b) : new LottoNewAppObj(configsLottoNew, b);
    eval(function (a, b, h, y, p, m, t) {
        a[p] = a[p] || function () {
            (a[p].a = a[p].a || []).push(arguments)
        };
        a[p].l = 1 * new Date;
        for (m = 0; m < document.scripts.length; m++) if (document.scripts[m].src === y) return;
        m = b.createElement(h);
        t = b.getElementsByTagName(h)[0];
        m.async = 1;
        m.src = y;
        t.parentNode.insertBefore(m, t)
    }(window, document, "script", "https://mc.yandex.ru/metrika/tag.js",
        "ym"));
    eval(ym(92086997, "init", {clickmap: !0, trackLinks: !0, accurateTrackBounce: !0, webvisor: !0}));
    a = document.getElementById("metrika");
    a || (a = document.createElement("div"), a.id = "metrika");
    for (a.innerHTML = '<noscript><div><img src="https://mc.yandex.ru/watch/84903145" style="position:absolute; left:-9999px;" alt="" /></div></noscript>'; a.children.length;) document.body.appendChild(a.firstElementChild)
}

function refreshLottoNewObject(a, b) {
    removeLottoNewObject(a, b.toLowerCase());
    initLottoNewObject(a, b.toLowerCase())
}

function gameManagerLottoNew(a) {
    this.destroy = function () {
        k = e = null;
        for (var a in b) b[a] = null;
        b = null
    };
    var b = this;
    this.coefficients;
    this.coefMode = localStorage.getItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "coefMode") ? JSON.parse(localStorage.getItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "coefMode")) : 1;
    var e = {};
    this.gameState = function () {
        return e
    };
    this.gameStateAsync = function (a) {
        k(a)
    };
    var k = function (h) {
        $.ajax({
            type: "get", url: getUrl(), data: {
                oper: "getgameinfo",
                id_srv: a.gameConfig[a.configType].serverName.slice(3, a.gameConfig[a.configType].serverName.length)
            }, dataType: "json", success: function (k, p, m) {
                try {
                    b && (e = k, setTimeout(function (a, k, m) {
                        b && e && (e.betsHistory = {}, void 0 != h && h(e))
                    }, 0))
                } catch (t) {
                    a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
                }
            }, error: function (b, e, h) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
            }
        })
    };
    this.gameHistory = function () {
        function h(b, e) {
            var h = 0;
            e &&
            (h = e);
            e = [];
            for (var k = h + a.gameConfig[a.configType].ballCount; h < k; h++) e.push(b["b" + h]);
            return e
        }

        if (!b || !e) return console.log("History and gameState not ok."), [];
        var k = [], p = 5;
        0 < parseInt(e.t2, 10) && --p;
        var m = e.history;
        if (!m || m === {}) return console.log("History and gameState not ok."), [];
        for (--p; 0 <= p; p--) {
            var t = m[p + 1];
            k.push({tir: t.tir, balls: h(t)})
        }
        0 < parseInt(e.t2, 10) && k.push({tir: e.tir - 1, balls: h(e, 1)});
        return k
    };
    this.sortNumeric = function (a, b) {
        if (a > b) return 1;
        if (a < b) return -1
    }
}

function LottoNewAppObj(a, b) {
    this.destroy = function () {
        e.mainSoundManager.destroy();
        p.destroy();
        p = null;
        m.destroy();
        m = null;
        h.destroy();
        h = null;
        y.destroy();
        y = null;
        k.destroy();
        k = null;
        for (var a in e) e[a] = null;
        e = null
    };
    var e = this;
    this.gameDir = FLGUtils.staticRootPath + "games/Lotto/resources/";
    this.gameConfig = a;
    this.configType = b;
    var k = new FLGRenderer(1920, 1080, a[b].canvasId, "center");
    this.mainRenderer = k;
    this.mainSoundManager = new SoundManager(e.gameConfig[e.configType].gameKind, e.gameConfig[e.configType].gameType,
        e.gameConfig[e.configType].gameVariant);
    var h = new FLGAccount(a[b].canvasId, e.mainSoundManager, e.mainRenderer);
    this.mainFLGAccount = h;
    var y = new gameManagerLottoNew(this);
    this.mainGameManager = y;
    var p = new UIManagerLottoNew(this);
    this.mainUIManager = p;
    var m;
    this.setMainGrid = function (a) {
        m = a;
        e.mainGrid = m
    }
}

function UIManagerLottoNew(a) {
    function b(b, c, C, e, f) {
        this.destroy = function () {
            g = A = h = d = null;
            clearTimeout(k);
            clearTimeout(ca);
            q = w = null;
            for (var a in l) l[a] = null;
            l = null
        };
        var l = this, d = {font: "bold 35px Arial", fill: "#000000", align: "center"}, h = 0, k, ca,
            A = new PIXI.Container;
        e ? e.addChild(A) : a.mainRenderer.stage.addChild(A);
        var g = function (g, c, b, w, l) {
            A.children[l] ? (A.children[l].visible = !0, A.children[l].children[0].text = w) : a.mainRenderer.createButton(A, g, c, "ball", {
                text: w,
                align: "center",
                style: d
            }).scale.set(b, b);
            f &&
            !A.children[l].isRotated && (A.children[l].position.x = g + 980, A.children[l].children[0].rotation = 8 * Math.PI, A.children[l].isRotated = !0, a.mainUIManager.animations()["rotation_ball" + l] && (a.mainUIManager.animations()["rotation_ball" + l].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["rotation_ball" + l] = (new TWEEN.Tween({
                rotation: A.children[l].children[0].rotation,
                position: A.children[l].position.x
            })).to({rotation: 0, position: g},
                990).easing(TWEEN.Easing.Cubic.Out).onUpdate(function () {
                A.children[l].children[0].rotation = this.rotation;
                A.children[l].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["rotation_ball" + l] = null;
                a.mainSoundManager.playSound("ball")
            }).start())
        }, w = function (a, d, w, l) {
            function e() {
                g(b + C * h, c, d, a[h], h);
                h++;
                h < a.length ? 0 == w || void 0 == w ? e() : k = setTimeout(e, w) : h = 0
            }

            void 0 != a && a.length && (l ? g(b + C * l, c, d, a[l], l) : e())
        };
        this.startDrawBalls = w;
        var q = function () {
            for (var g = 0; g < A.children.length; g++) f ? (A.children[g].isRotated = !1, a.mainUIManager.animations()["remove_ball" + g] && (a.mainUIManager.animations()["remove_ball" + g].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["remove_ball" + g] = (new TWEEN.Tween({
                rotation: A.children[g].children[0].rotation,
                position: A.children[g].position.x,
                index: g
            })).to({
                rotation: 6 * Math.PI,
                position: A.children[g].position.x + 980
            }, 990).easing(TWEEN.Easing.Cubic.In).onUpdate(function () {
                A.children[this.index].children[0].rotation =
                    this.rotation;
                A.children[this.index].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["remove_ball" + this.index] = null;
                A.children[this.index].visible = !1
            }).start()) : A.children[g].visible = !1
        };
        this.removeBalls = q
    }

    function e(b) {
        this.destroy = function () {
            for (var a = 0; a < l.length; a++) {
                for (var b in l[a]) l[a][b] = null;
                l[a] = null
            }
            n = k = h = f = e = l = null;
            for (a in c) c[a] = null;
            c = null
        };
        var c = this, l = [];
        this.bets = l;
        var e = 0, f = 0;
        this.setTotalWin = function (a) {
            if (!arguments.length) return f;
            a && (f = a)
        };
        this.getTotalBet = function () {
            return e
        };
        var h = null;
        this.parentEditions = function (a) {
            if (!arguments.length) return h;
            h = a;
            k = h.betsHistoryContainer()
        };
        if (b.length) for (var d = 0; d < b.length; d++) b[d].summ && (e += b[d].summ), b[d].win && (f += b[d].win), l.push({
            summ: b[d].summ,
            bet: b[d].bet,
            coef: b[d].coef,
            winBets: b[d].winBets,
            countWin: b[d].countWin,
            win: b[d].win,
            code: b[d].code,
            id: b[d].id
        });
        this.addBet = function (b, c, g) {
            c += 1;
            100 <= l.length ? (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g,
                100)), g && g(void 0)) : (b.length && 100 < l.length + b.length && (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), b = b.slice(0, b.length - (l.length + b.length - 100))), a.mainFLGAccount.placeBet(b, c, a.gameConfig[a.configType], function (c, d, f) {
                if (void 0 == c) g && g(void 0); else {
                    if (f) {
                        f.notAll && a.mainRenderer.logService.log(mainLocalizationTable.betError);
                        for (c = 0; c < f.srvBets.length; c++) l.push({
                            summ: f.srvBets[c].summ,
                            bet: f.srvBets[c].bet,
                            coef: f.srvBets[c].coef,
                            winBets: f.srvBets[c].winBets,
                            countWin: f.srvBets[c].countWin,
                            win: f.srvBets[c].win,
                            code: f.srvBets[c].code,
                            id: f.srvBets[c].id
                        });
                        g && (g(f.srvBets), h.events.emit("EDITIONS_CHANGE"))
                    } else l.push({
                        summ: b.summ,
                        bet: b.bet,
                        coef: b.coef,
                        winBets: b.winBets,
                        countWin: b.countWin,
                        win: b.win,
                        code: c,
                        id: d
                    }), g && (g(l[l.length - 1]), h.events.emit("EDITIONS_CHANGE"));
                    e = a.mainFLGAccount.totalBet();
                    n();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }, a.gameConfig[a.configType].gameNum))
        };
        var k, n = function () {
            var b = 0 != k.children.length;
            k.parent.children[9].children[0].children[0].text =
                0 < l.length ? mainLocalizationTable.coupon.toUpperCase() + " (" + l.length + ")" : mainLocalizationTable.coupon.toUpperCase();
            if (b) k.parent.children[2].children[1].children[0].text = 0 !== e ? formatFLGNums(e, !1) : "", k.parent.children[2].children[2].children[0].text = 0 !== f ? formatFLGNums(f, !1) : ""; else for (b = 0; 10 > b; b++) {
                var c = b & 1 ? "table_line_odd" : "table_line_even";
                c = new a.mainRenderer.createButton(k, 0, 98 + 35 * b, c);
                c.anchor.y = .5;
                c.name = "row_" + b
            }
            var g;
            for (b = 0; k.getChildByName("row_" + b); b++) if (c = k.getChildByName("row_" + b)) {
                for (var d =
                    0; c.getChildByName("rect" + b + "_" + d); d++) {
                    var q = c.getChildByName("rect" + b + "_" + d);
                    q.visible = !1;
                    q.getChildByName("sortedBet" + b + "_" + d).visible = !1
                }
                if (q = c.getChildByName("summ" + b)) q.visible = !1, c.getChildByName("coefMode" + b).visible = !1, c.getChildByName("coef" + b).visible = !1, c.getChildByName("win" + b).visible = !1;
                9 < b && (c.visible = !1)
            }
            if (!(0 >= l.length)) {
                b = 0;
                for (var z = l.length - 1; b < l.length; b++, z--) {
                    var C = l[z].bet.slice();
                    C.sort(a.mainGameManager.sortNumeric);
                    (c = k.getChildByName("row_" + b)) ? c.visible = !0 : (c = b & 1 ? "table_line_odd" :
                        "table_line_even", c = new a.mainRenderer.createButton(k, 0, 98 + 35 * b, c), c.anchor.y = .5, c.name = "row_" + b);
                    for (d = 0; d < C.length; d++) {
                        var n = (g = -1 < l[z].winBets.indexOf(C[d])) ? 16773632 : 0;
                        (q = c.getChildByName("rect" + b + "_" + d)) ? (q.clear(), q.beginFill(n), q.drawCircle(20 + 29 * d, 0, 14), q.endFill(), q.visible = !0, q = q.getChildByName("sortedBet" + b + "_" + d), q.children[0].style = g ? h.tableHistoryFont : h.tableHighlightFont, q.children[0].text = C[d], q.visible = !0) : (q = new PIXI.Graphics, q.beginFill(n), q.drawCircle(20 + 29 * d, 0, 14), q.endFill(),
                            q.name = "rect" + b + "_" + d, c.addChild(q), a.mainRenderer.createButton(q, 20 + 29 * d, 0, void 0, {
                            text: C[d],
                            align: "center",
                            style: g ? h.tableHistoryFont : h.tableHighlightFont
                        }).name = "sortedBet" + b + "_" + d)
                    }
                    g = void 0 != l[z].win ? formatFLGNums(l[z].win, !1) : "";
                    C = void 0 != l[z].countWin ? a.mainGameManager.coefficients[l[z].coef - 1][l[z].countWin] / 100 : "";
                    d = void 0 != l[z].win && 0 != l[z].win ? h.tableBoldFont : h.tableBetFont;
                    (q = c.getChildByName("summ" + b)) ? (q.children[0].style = d, q.children[0].text = formatFLGNums(l[z].summ, !1), q.visible = !0,
                        q = c.getChildByName("win" + b), q.children[0].style = d, q.children[0].text = g, q.visible = !0, g = c.getChildByName("coefMode" + b), g.children[0].style = d, g.children[0].text = l[z].coef, g.visible = !0, c = c.getChildByName("coef" + b), c.children[0].style = d, c.children[0].text = C, c.visible = !0) : (a.mainRenderer.createButton(c, 342, 0, void 0, {
                        text: formatFLGNums(l[z].summ, !1),
                        align: "left",
                        style: d
                    }).name = "summ" + b, a.mainRenderer.createButton(c, 255, 0, void 0, {
                        text: l[z].coef,
                        align: "center",
                        style: d
                    }).name = "coefMode" + b, a.mainRenderer.createButton(c,
                        300, 0, void 0, {
                            text: C,
                            align: "center",
                            style: d
                        }).name = "coef" + b, a.mainRenderer.createButton(c, 465, 0, void 0, {
                        text: g,
                        align: "left",
                        style: d
                    }).name = "win" + b)
                }
            }
            k.emit("updateHeight")
        };
        this.redrawCurrentBets = n;
        this.calculateWin = function (b, c) {
            for (var g, d = 0; d < l.length; d++) {
                g = l[d].bet;
                for (var e = [], h = 0; h < g.length; h++) -1 < b.indexOf(g[h]) && e.push(g[h]);
                g = e;
                l[d].winBets = g;
                l[d].countWin = g.length;
                c && (l[d].win = l[d].summ * a.mainGameManager.coefficients[l[d].coef - 1][l[d].countWin] / 100, f += l[d].win)
            }
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        }
    }

    this.destroy = function () {
        clearTimeout(aa);
        clearTimeout(da);
        m = null;
        D.destroy();
        D = null;
        Q.destroy();
        x = Q = null;
        B && B.destroy();
        B = null;
        L.destroy();
        L = null;
        M.destroy();
        v = J = N = H = u = M = null;
        for (var b in f) {
            for (var c in f[b]) f[b][c] = null;
            f[b] = null
        }
        f = null;
        clearTimeout(ea);
        T = R = null;
        for (b in n) n[b] = null;
        U = K = O = P = X = V = E = F = n = null;
        a.mainRenderer.stage.off("changeLang", W);
        W = null;
        h.off("visibleChange", y);
        window.removeEventListener("keydown", p);
        p = y = h = null;
        S.destroy();
        I = S = null;
        r.destroy();
        r = null;
        for (b in k) k[b] = null;
        k = null
    };
    var k = this, h = $("#" + a.gameConfig[a.configType].canvasId).parent(), y = function (b, c) {
        a.mainRenderer.stage.visible = c == a.gameConfig[a.configType].canvasId;
        a.mainRenderer.StartStopAnimation(a.mainRenderer.stage.visible)
    };
    h.on("visibleChange", y);
    var p = function (b) {
        "input" !== event.srcElement.localName && a.mainRenderer.stage.visible && (13 == b.keyCode || 32 == b.keyCode) && u && (b = u.getChildByName("plus")) && b.interactive && (b.emit("mousedown"), b.emit("mouseup"))
    };
    window.addEventListener("keydown", p);
    for (var m = clientInfoGlobal.coin7.split("-"),
             t = 0; t < m.length; t++) m[t] /= 100;
    var G = 2 * parseInt(m[m.length - 1], 10);
    m.push("MAX\n" + G);
    t = (t = localStorage.getItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "defaultBet")) && 0 <= m.indexOf(parseInt(t)) ? JSON.parse(t) : m[1];
    var D = new betsControls(m[0], m[m.length - 1], t, m, function (b) {
        a.mainFLGAccount.balance() < G && (G = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return G
    });
    this.betsControls = D;
    var Q = new FLGTimer, x, B, L = new FLGJackpot(a.mainRenderer, {
            tirTimeOffset: .1,
            updateInterval: 900
        }), M, u = new PIXI.Container, H = new PIXI.Container, N = new PIXI.Container, J = new PIXI.Container,
        v = [new PIXI.Container, new PIXI.Container, new PIXI.Container, new PIXI.Container, new PIXI.Container], f = {
            game: {
                text: mainLocalizationTable.game.toUpperCase(),
                posX: 1160,
                posY: 377,
                pressedDefault: !0,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            rules: {
                text: "",
                posX: -500,
                posY: -500,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            video: {
                text: mainLocalizationTable.video.toUpperCase(),
                posX: 1160, posY: 551, onStartOpen: function () {
                    B && (B.destroy(), B = null);
                    n.scale_video && n.scale_video.stop();
                    n.scale_video_open && n.scale_video_open.stop();
                    B = new FLGVideo(54, 242, 1089, 613, a.gameConfig[a.configType].canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" allowfullscreen="true" wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=0&amp;URL=' +
                        a.gameConfig.videoURL + ';"> <param name="allowFullScreen" value="true"> <param name="movie" value="videoplayer.swf"> </object>', '<video id="innerVideo' + a.gameConfig[a.configType].canvasId + '" autoplay muted playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + a.gameConfig[a.configType].videoMobileURL + '" type="application/x-mpegURL"></video>', void 0, a.mainSoundManager, !0);
                    var b = navigator.userAgent || navigator.vendor || window.opera;
                    b.match(/Android/i) || B && B.setVisible(!0);
                    n.scale_video_open =
                        (new TWEEN.Tween({scale: 0})).to({scale: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                            n.scale_video_open = null;
                            B && B.setScale(1)
                        }).onUpdate(function () {
                            B && B.setScale(this.scale)
                        }).onComplete(function () {
                            n.scale_video_open = null
                        }).start();
                    n.video_rotate && n.video_rotate.stop();
                    var c = f.video.container;
                    if (c.getChildByName("video_load")) {
                        var e = c.getChildByName("video_load");
                        e.visible = !0
                    } else e = a.mainRenderer.createButton(c, 10, 25, "video_load"), e.anchor.set(.5, .5), e.scale.set(1.75, 1.75);
                    e && (a.mainRenderer.renderManager.animationTweenInc(),
                        n.video_rotate = (new TWEEN.Tween(e)).to({rotation: 6 * Math.PI}, 3E3).easing(TWEEN.Easing.Linear.None).onStop(function () {
                            e.rotation = 0;
                            e.visible = !1;
                            a.mainRenderer.renderManager.animationTweenDec();
                            n.video_rotate = null
                        }).onComplete(function () {
                            b.match(/Android/i) && B && B.setVisible(!0);
                            e.rotation = 0;
                            e.visible = !1;
                            a.mainRenderer.renderManager.animationTweenDec();
                            n.video_rotate = null
                        }).start())
                }, onStopOpen: void 0, onStartClose: function () {
                    B && (n.scale_video_open && n.scale_video_open.stop(), n.scale_video && n.scale_video.stop(),
                    n.video_rotate && n.video_rotate.stop(), n.scale_video = (new TWEEN.Tween({scale: 1})).to({scale: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                        n.scale_video = null;
                        B && (B.setScale(0), B.destroy(), B = null)
                    }).onUpdate(function () {
                        B && B.setScale(this.scale)
                    }).onComplete(function () {
                        B && (B.setScale(0), B.destroy(), B = null);
                        n.scale_video = null
                    }).start())
                }, onStopClose: void 0
            },
            history: {
                text: mainLocalizationTable.history.toUpperCase(),
                posX: 1160,
                posY: 725,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            stats: {
                text: mainLocalizationTable.stats.toUpperCase(),
                posX: 1160,
                posY: 899,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            info: {}
        }, ea = 0, R, T = !1, S, I = {needShow: !0}, r = new function () {
            this.destroy = function () {
                for (var a = 0; a < c.length; a++) c[a].round = null, c[a].editionResult = null, c[a].betsHistory.destroy && c[a].betsHistory.destroy(), c[a].betsHistory = null, c[a] = null;
                n = h = f = c = null;
                k.destroy();
                r = t = d = k = null;
                m.destroy();
                m = null;
                D && (D.destroy(), D = null);
                u = null;
                g && (g.destroy(),
                    g = null);
                y = B = x = ba = p = Z = Y = v = q = w = z = null;
                l.events.removeAllListeners();
                for (a in l) l[a] = null;
                l = null
            };
            var l = this, c = [], f;
            this.editions = c;
            var h, k, n = new PIXI.Container, d = new PIXI.Container, m, t = new PIXI.Container, r = new PIXI.Container;
            r.name = "betCntnr";
            this.historyTable = function () {
                return h
            };
            this.betBGContainer = function () {
                return m.srcSprite
            };
            this.betsHistoryContainer = function () {
                return r
            };
            var u = .653, g, w = {font: "bold 30px Arial", fill: "#313131"};
            this.tableHeaderFont = w;
            var q = {font: "22px Arial", fill: "#403f3f"}, z = {
                font: "20px Arial Narrow",
                fill: "#000000"
            };
            this.tableHistoryFont = z;
            var v = {font: "20px Arial Narrow", fill: "#ffffff"};
            this.tableHighlightFont = v;
            var Y = {font: "bold 22px Arial", fill: "#000000"};
            this.tableBoldFont = Y;
            var Z = {font: "20px Arial", fill: "#000000"};
            this.tableBetFont = Z;
            this.getActedOutEdition = function () {
                for (var a = c.length - 1; 0 <= a; a--) if (void 0 == c[a].editionResult) return p(a), c[a];
                p(c.length - 1);
                return c[c.length - 1]
            };
            var p = function (g) {
                0 > g || g >= c.length || (f = g, void 0 != n && 0 < n.children.length && y(), void 0 != h && c[f].betsHistory.redrawCurrentBets(),
                    a.mainRenderer.renderManager.needUpdateRender = !0)
            }, ba = function () {
                h = a.mainRenderer.createButton(void 0, 1294, 305);
                k = new MaskedSprite(a.mainRenderer.createButton(h, 1, 0, "table_bg"), {
                    mask: {
                        x: 1,
                        y: 0,
                        width: 579,
                        height: 116,
                        radius: 9
                    }
                }, a.mainRenderer.renderManager);
                a.mainRenderer.createButton(k.srcSprite, 0, 0, "table_header");
                x();
                y();
                var g = new PIXI.Graphics;
                g.beginFill(16777215);
                g.drawRect(98, 46, 2, 214);
                g.alpha = .5;
                g.endFill;
                k.srcSprite.addChild(g);
                g = null;
                g = a.mainRenderer.createButton(k.srcSprite, 0, 0, void 0, void 0,
                    function (g, b) {
                        a.mainSoundManager.playSound("buttonClick");
                        a.mainUIManager.animations().rotate_editions && (a.mainUIManager.animations().rotate_editions.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().rotate_editions = null);
                        g.pressed = !g.pressed;
                        var c = g.pressed ? Math.PI / 2 : 0;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().rotate_editions = (new TWEEN.Tween(g.children[0])).to({rotation: c}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().rotate_editions = null
                        }).start();
                        a.mainUIManager.animations().resize_editions && (a.mainUIManager.animations().resize_editions.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().resize_editions = null);
                        g = g.pressed ? 260 : 116;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().resize_editions = (new TWEEN.Tween({fHeight: k.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: g}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            k.srcSprite.mask.clear();
                            k.srcSprite.mask.beginFill(14922837);
                            k.srcSprite.mask.drawRoundedRect(1, 0, 579, this.fHeight, 9);
                            k.srcSprite.mask.endFill
                        }).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().resize_editions = null
                        }).start();
                        b && (m.srcSprite.getChildByName("exp2").emit("mousedown"), b.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                g.hitArea = new PIXI.Rectangle(0, 0, 579, 43);
                g.name = "exp1";
                g = a.mainRenderer.createButton(g, 552, 21, "expand");
                g.anchor.set(.5, .5);
                g = null;
                for (g = 0; g < c.length; g++) c[g].betsHistory.parentEditions(l);
                B();
                c.length && c[f].betsHistory.redrawCurrentBets();
                k.srcSprite.addChild(d);
                k.srcSprite.addChild(n)
            };
            this.drawEditions = ba;
            var x = function () {
                d.children[0] && d.children[1] ? (d.children[0].children[0].text = mainLocalizationTable.round, d.children[1].children[0].text = mainLocalizationTable.balls) : (a.mainRenderer.createButton(d, 19, 22, void 0, {
                    text: mainLocalizationTable.history.toUpperCase(),
                    align: "left",
                    style: w
                }), a.mainRenderer.createButton(d, 50, 62, void 0,
                    {
                        text: mainLocalizationTable.round,
                        align: "center",
                        style: q
                    }), a.mainRenderer.createButton(d, 114, 62, void 0, {
                    text: mainLocalizationTable.balls,
                    align: "left",
                    style: q
                }))
            };
            this.redrawEditionHeader = x;
            var B = function () {
                if (t.children[0]) t.children[0].children[0].text = mainLocalizationTable.coupon.toUpperCase(), t.children[1].children[0].text = mainLocalizationTable.balls, t.children[2].children[0].text = mainLocalizationTable.totalBet, t.children[3].children[0].text = mainLocalizationTable.win, m.srcSprite.children[2].children[0].text =
                    mainLocalizationTable.total.toUpperCase() + ":"; else {
                    m = new MaskedSprite(a.mainRenderer.createButton(h, 1, 125, "table_bg"), {
                        mask: {
                            x: 1,
                            y: 125,
                            width: 579,
                            height: 465,
                            radius: 9
                        }, needScrolling: {container: r, scrollbar: {topOffset: 85, botOffset: 38}}
                    }, a.mainRenderer.renderManager);
                    m.srcSprite.addChildAt(r, 0);
                    a.mainRenderer.createButton(m.srcSprite, -4, 425, "bet_bot");
                    a.mainRenderer.createButton(m.srcSprite.children[2], 240, 24, void 0, {
                        text: mainLocalizationTable.total.toUpperCase() + ":", align: "right", style: {
                            font: "22px Arial",
                            fill: "#000000", align: "center"
                        }
                    });
                    a.mainRenderer.createButton(m.srcSprite.children[2], 342, 24, void 0, {
                        text: "",
                        align: "left",
                        style: {font: "22px Arial", fill: "#000000", align: "center"}
                    });
                    a.mainRenderer.createButton(m.srcSprite.children[2], 458, 24, void 0, {
                        text: "",
                        align: "left",
                        style: {font: "22px Arial", fill: "#000000", align: "center"}
                    });
                    var g = new PIXI.Graphics;
                    g.beginFill(16777215);
                    g.drawRect(240, 46, 2, 419);
                    g.alpha = .5;
                    g.name = "ballsSep";
                    g.endFill;
                    m.srcSprite.addChild(g);
                    g = new PIXI.Graphics;
                    g.beginFill(16777215);
                    g.drawRect(270, 46, 2, 419);
                    g.alpha = .5;
                    g.name = "modeSep";
                    g.endFill;
                    m.srcSprite.addChild(g);
                    g = new PIXI.Graphics;
                    g.beginFill(16777215);
                    g.drawRect(330, 46, 2, 419);
                    g.alpha = .5;
                    g.name = "coefSep";
                    g.endFill;
                    m.srcSprite.addChild(g);
                    g = new PIXI.Graphics;
                    g.beginFill(16777215);
                    g.drawRect(450, 46, 2, 419);
                    g.alpha = .5;
                    g.name = "winsSep";
                    g.endFill;
                    m.srcSprite.addChild(g);
                    g = null;
                    m.srcSprite.interactive = !0;
                    m.srcSprite.hitArea = new PIXI.Rectangle(0, 0, 579, 465);
                    a.mainRenderer.createButton(m.srcSprite, 0, 0, "table_header");
                    g = a.mainRenderer.createButton(m.srcSprite,
                        0, 0, void 0, void 0, function (g, b) {
                            a.mainUIManager.animations().rotate_bets && (a.mainUIManager.animations().rotate_bets.stop(), a.mainRenderer.renderManager.animationTweenDec());
                            g.pressed = !g.pressed;
                            var c = g.pressed ? 0 : Math.PI / 2;
                            a.mainRenderer.renderManager.animationTweenInc();
                            a.mainUIManager.animations().rotate_bets = (new TWEEN.Tween(g.children[0])).to({rotation: c}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec();
                                a.mainUIManager.animations().rotate_bets =
                                    null
                            }).start();
                            a.mainUIManager.animations().resize_bets && (a.mainUIManager.animations().resize_bets.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().resize_bets = null);
                            g = g.pressed ? 320 : 465;
                            a.mainRenderer.renderManager.animationTweenInc();
                            a.mainUIManager.animations().resize_bets = (new TWEEN.Tween({fHeight: m.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: g}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                m.srcSprite.position.y = 590 - this.fHeight;
                                m.srcSprite.children[2].position.y =
                                    425 + this.fHeight - 465;
                                m.srcSprite.mask.clear();
                                m.srcSprite.mask.beginFill(14922837);
                                m.srcSprite.mask.drawRoundedRect(1, m.srcSprite.position.y, 579, this.fHeight, 9);
                                m.srcSprite.mask.endFill;
                                m.srcSprite.hitArea.height = this.fHeight;
                                r.emit("updateHeight")
                            }).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec();
                                a.mainUIManager.animations().resize_bets = null
                            }).start();
                            b && (k.srcSprite.getChildByName("exp1").emit("mousedown"), b.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                        });
                    g.hitArea =
                        new PIXI.Rectangle(0, 0, 579, 43);
                    g.name = "exp2";
                    g = a.mainRenderer.createButton(g, 552, 21, "expand");
                    g.anchor.set(.5, .5);
                    g.rotation = Math.PI / 2;
                    g = null;
                    m.srcSprite.addChild(t);
                    a.mainRenderer.createButton(t, 19, 22, void 0, {
                        text: mainLocalizationTable.coupon.toUpperCase(),
                        align: "left",
                        style: w
                    });
                    a.mainRenderer.createButton(t, 19, 62, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "left",
                        style: q
                    });
                    a.mainRenderer.createButton(t, 255, 62, void 0, {text: "#", align: "center", style: q});
                    a.mainRenderer.createButton(t, 300, 62, void 0,
                        {text: "X", align: "center", style: q});
                    a.mainRenderer.createButton(t, 342, 62, void 0, {
                        text: mainLocalizationTable.totalBet,
                        align: "left",
                        style: q
                    });
                    a.mainRenderer.createButton(t, 465, 62, void 0, {
                        text: mainLocalizationTable.win,
                        align: "left",
                        style: q
                    });
                    g = a.mainRenderer.createButton(m.srcSprite, 0, 0, void 0, void 0, function (g, b) {
                        a.mainSoundManager.playSound("buttonClick");
                        I.needShow = !I.needShow;
                        l.events.emit("GRID_STATS");
                        g.children[0].texture = a.mainRenderer.resourceLoader.resources[I.needShow ? "eye_icon" : "eye_closed_icon"].texture;
                        H.getChildByName("menu_container").getChildByName("btn_eye").texture = a.mainRenderer.resourceLoader.resources[I.needShow ? "btn_eye" : "btn_eye_closed"].texture;
                        H.getChildByName("menu_container").getChildByName("btn_eye").children[0].texture = a.mainRenderer.resourceLoader.resources[I.needShow ? "btn_eye_mode_selected" : "btn_eye_closed_mode_selected"].texture;
                        b && (b.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    g.hitArea = new PIXI.Rectangle(240, 0, 90, 43);
                    g.name = "eye_icon";
                    a.mainRenderer.createButton(g,
                        285, 21, "eye_icon").anchor.set(.5, .5);
                    g = null
                }
            };
            this.drawBetsHeader = B;
            var y = function () {
                var g = 0 !== n.children.length;
                if (!g) for (var b = 0; 5 > b; b++) {
                    var c = new a.mainRenderer.createButton(n, 0, 98 + 36 * (6 - b - 2), b & 1 ? "table_line_odd" : "table_line_even");
                    c.anchor.y = .5
                }
                var d = a.mainGameManager.gameHistory();
                for (b = 0; b < d.length; b++) {
                    var l = d[b].balls.slice();
                    l.sort(a.mainGameManager.sortNumeric);
                    c = n.children[b];
                    if (g = 0 !== c.children.length) for (c.getChildByName("round" + b).children[0].text = d[b].tir, g = 0; g < l.length; g++) c.getChildByName("result" +
                        g).children[0].text = l[g]; else {
                        a.mainRenderer.createButton(c, 50, 0, void 0, {
                            text: d[b].tir,
                            align: "center",
                            style: z
                        }).name = "round" + b;
                        var e = 70;
                        for (g = 0; g < l.length; g++) a.mainRenderer.createButton(c, e += 40, -18, "ball", {
                            text: l[g],
                            align: "center",
                            style: {font: "bold 40px Arial Narrow", fill: "#000000"}
                        }).name = "result" + g, c.getChildByName("result" + g).scale.set(.45, .45)
                    }
                }
            };
            this.detailEditionsFont = {font: "bold 46px Arial", fill: "#ffffff"};
            this.detailEditionsHeaderFont = {font: "bold 24px Arial", fill: "#fca903"};
            this.detailEditionsRowFont =
                {font: "bold 32px Arial", fill: "#ffffff"};
            var D, G = new PIXI.Graphics;
            G.beginFill(16777215, .4);
            G.drawCircle(0, 0, 38);
            G.endFill();
            this.rectTexture = G.generateTexture(!1);
            G = null;
            this.drawDetailEditionHistory = function (d, e) {
                if (c[e].editionResult) {
                    var f = 0 != d.children.length;
                    d.editionInd = e;
                    var w = {x: 599, y: 524}, h = c[e].editionResult.slice();
                    h.sort(a.mainGameManager.sortNumeric);
                    f ? (g.removeBalls(), g.startDrawBalls(h, u, 0), d.children[0].children[0].text = "# " + c[e].round, h = d.getChildByName("totalBox"), h.getChildByName("tBet").children[0].text =
                        formatFLGNums(c[e].betsHistory.getTotalBet(), !1), h.getChildByName("tWin").children[0].text = formatFLGNums(c[e].betsHistory.setTotalWin(), !1), h = null) : (f = a.mainRenderer.createButton(d, 180 - w.x, 240 - w.y, void 0, {
                        text: "# " + c[e].round,
                        align: "center",
                        style: l.detailEditionsFont
                    }), g = new b(765 - w.x - 53 * (a.gameConfig[a.configType].ballCount - 1), 214 - w.y, 53, d), g.startDrawBalls(h, u, 0), f = a.mainRenderer.createButton(d, 980 - w.x, 240 - w.y, "history_arrow_left"), a.mainRenderer.createButton(f, 0, 0, "history_arrow_left_selected",
                        void 0, function (g, b) {
                            a.mainSoundManager.playSound("buttonClick");
                            d.editionInd = limit(d.editionInd - 1, 0, c.length - 2);
                            l.drawDetailEditionHistory(d, d.editionInd);
                            b.stopped = !0;
                            a.mainUIManager.clickAnimationFunc(g, "bet_arrow_History");
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        }, void 0, void 0, function (a) {
                            F(a, "bet_arrow_History")
                        }, function (a) {
                            E(a, "bet_arrow_History")
                        }).alpha = 0, f.anchor.set(.5, .5), f.children[0].anchor.set(.5, .5), f = a.mainRenderer.createButton(d, 1080 - w.x, 240 - w.y, "history_arrow"), a.mainRenderer.createButton(f,
                        0, 0, "history_arrow_selected", void 0, function (g, b) {
                            a.mainSoundManager.playSound("buttonClick");
                            d.editionInd = limit(d.editionInd + 1, 0, c.length - 2);
                            l.drawDetailEditionHistory(d, d.editionInd);
                            b.stopped = !0;
                            a.mainUIManager.clickAnimationFunc(g, "bet_arrow_History2");
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        }, void 0, void 0, function (a) {
                            F(a, "bet_arrow_History2")
                        }, function (a) {
                            E(a, "bet_arrow_History2")
                        }).alpha = 0, f.anchor.set(.5, .5), f.children[0].anchor.set(.5, .5), f = a.mainRenderer.createButton(d, 850 - w.x, 342 -
                        w.y, void 0, {
                        text: mainLocalizationTable.coef.toUpperCase(),
                        align: "center",
                        style: l.detailEditionsHeaderFont
                    }), f.anchor.set(.5, .5), f = a.mainRenderer.createButton(d, 120 - w.x, 342 - w.y, void 0, {
                        text: mainLocalizationTable.balls.toUpperCase(),
                        align: "center",
                        style: l.detailEditionsHeaderFont
                    }), f.anchor.set(.5, .5), f = a.mainRenderer.createButton(d, 685 - w.x, 342 - w.y, void 0, {
                        text: mainLocalizationTable.bet.toUpperCase(),
                        align: "center",
                        style: l.detailEditionsHeaderFont
                    }), f.anchor.set(.5, .5), f = a.mainRenderer.createButton(d,
                        1033 - w.x, 342 - w.y, void 0, {
                            text: mainLocalizationTable.win.toUpperCase(),
                            align: "center",
                            style: l.detailEditionsHeaderFont
                        }), f.anchor.set(.5, .5), f = a.mainRenderer.createButton(d, 545 - w.x, 342 - w.y, void 0, {
                        text: "#",
                        align: "center",
                        style: l.detailEditionsHeaderFont
                    }), f.anchor.set(.5, .5), D = new MaskedSprite(a.mainRenderer.createButton(d, 0, 0), {
                        mask: {
                            x: 60 - w.x,
                            y: 364 - w.y,
                            width: 1070,
                            height: 426
                        }, needScrolling: {}
                    }, a.mainRenderer.renderManager), D.srcSprite.interactive = !0, D.srcSprite.hitArea = new PIXI.Rectangle(70 - w.x, 362 -
                        w.y, 1061, 432), h = a.mainRenderer.createButton(d, 68 - w.x, 826 - w.y, void 0), h.name = "totalBox", h.anchor.y = .5, a.mainRenderer.createButton(h, 56, 0, void 0, {
                        text: mainLocalizationTable.total.toUpperCase(),
                        align: "center",
                        style: l.detailEditionsHeaderFont
                    }), a.mainRenderer.createButton(h, 478, 0, void 0, {
                        text: mainLocalizationTable.bet.toUpperCase() + ":",
                        align: "center",
                        style: l.detailEditionsHeaderFont
                    }), f = a.mainRenderer.createButton(h, 617, 0, "tab_history_row2"), f.anchor.set(.5, .5), f.scale.x = .145, a.mainRenderer.createButton(h,
                        617, 0, void 0, {
                            text: formatFLGNums(c[e].betsHistory.getTotalBet(), !1),
                            align: "center",
                            style: l.detailEditionsRowFont
                        }).name = "tBet", a.mainRenderer.createButton(h, 783, 0, void 0, {
                        text: mainLocalizationTable.win.toUpperCase() + ":",
                        align: "center",
                        style: l.detailEditionsHeaderFont
                    }), f = a.mainRenderer.createButton(h, 966, 0, "tab_history_row2"), f.anchor.set(.5, .5), f.scale.x = .18, a.mainRenderer.createButton(h, 966, 0, void 0, {
                        text: formatFLGNums(c[e].betsHistory.setTotalWin(), !1),
                        align: "center",
                        style: l.detailEditionsRowFont
                    }).name =
                        "tWin", f = h = null);
                    h = [];
                    var k;
                    h = D.containerForScroll;
                    var q;
                    for (f = 0; h.getChildByName("row_" + f); f++) if (k = h.getChildByName("row_" + f)) {
                        k.visible = !1;
                        for (q = 0; k.getChildByName("rect" + f + "_" + q); q++) {
                            var m = k.getChildByName("rect" + f + "_" + q);
                            m.visible = !1;
                            m.getChildByName("textBet" + f + "_" + q).visible = !1
                        }
                        if (m = k.getChildByName("summ" + f)) m.visible = !1, k.getChildByName("win" + f).visible = !1, k.getChildByName("coef" + f).visible = !1, k.getChildByName("coefMode" + f).visible = !1
                    }
                    d.children[2].interactive = 0 !== d.editionInd;
                    d.children[2].alpha =
                        0 !== d.editionInd ? 1 : .3;
                    d.children[3].interactive = d.editionInd !== c.length - 2;
                    d.children[3].alpha = d.editionInd !== c.length - 2 ? 1 : .3;
                    d.children[4].visible = 0 < c[e].betsHistory.bets.length;
                    d.children[5].visible = 0 < c[e].betsHistory.bets.length;
                    d.children[6].visible = 0 < c[e].betsHistory.bets.length;
                    d.children[7].visible = 0 < c[e].betsHistory.bets.length;
                    d.children[8].visible = 0 < c[e].betsHistory.bets.length;
                    if (0 >= c[e].betsHistory.bets.length) h.emit("updateHeight"); else {
                        var n = [];
                        f = 0;
                        for (var z = c[e].betsHistory.bets.length -
                            1; f < c[e].betsHistory.bets.length; f++, z--) {
                            (k = h.getChildByName("row_" + f)) ? k.visible = !0 : (k = new a.mainRenderer.createButton(h, 68 - w.x, 391 + 61 * f - w.y, "tab_history_row"), k.anchor.y = .5, k.name = "row_" + f);
                            for (q = 0; q < c[e].betsHistory.bets[z].bet.length; q++) {
                                n = c[e].betsHistory.bets[z].bet.slice();
                                n.sort(a.mainGameManager.sortNumeric);
                                var t = -1 < c[e].betsHistory.bets[z].winBets.indexOf(n[q]);
                                (m = k.getChildByName("rect" + f + "_" + q)) ? (m.texture = t ? a.mainRenderer.resourceLoader.resources.ball.texture : l.rectTexture, m.visible =
                                    !0, m = m.getChildByName("textBet" + f + "_" + q), m.children[0].text = n[q], m.visible = !0) : (m = new PIXI.Sprite(t ? a.mainRenderer.resourceLoader.resources.ball.texture : l.rectTexture), k.addChild(m), m.position.x = 32 + 56 * q, m.position.y = 0, m.scale.set(.65, .65), m.anchor.set(.5, .5), m.name = "rect" + f + "_" + q, m = a.mainRenderer.createButton(m, 0, 0, void 0, {
                                    text: n[q],
                                    align: "center",
                                    style: {font: "bold 44px Arial Narrow", fill: "#000", align: "center"}
                                }), m.anchor.set(.5, .5), m.name = "textBet" + f + "_" + q);
                                t = null
                            }
                            q = void 0 != c[e].betsHistory.bets[z].win ?
                                formatFLGNums(c[e].betsHistory.bets[z].win, !1) : "";
                            n = void 0 != c[e].betsHistory.bets[z].countWin ? a.mainGameManager.coefficients[c[e].betsHistory.bets[z].coef - 1][c[e].betsHistory.bets[z].countWin] / 100 : "";
                            (m = k.getChildByName("summ" + f)) ? (m.children[0].text = formatFLGNums(c[e].betsHistory.bets[z].summ, !1), m.visible = !0, m = k.getChildByName("coef" + f), m.children[0].text = "X  " + n, m.visible = !0, n = k.getChildByName("coefMode" + f), n.children[0].text = c[e].betsHistory.bets[z].coef, n.visible = !0, k = k.getChildByName("win" +
                                f), k.children[0].text = q, k.visible = !0) : (a.mainRenderer.createButton(k, 615, 0, void 0, {
                                text: formatFLGNums(c[e].betsHistory.bets[z].summ, !1),
                                align: "center",
                                style: l.detailEditionsRowFont
                            }).name = "summ" + f, a.mainRenderer.createButton(k, 780, 0, void 0, {
                                text: "X  " + n,
                                align: "center",
                                style: l.detailEditionsRowFont
                            }).name = "coef" + f, a.mainRenderer.createButton(k, 965, 0, void 0, {
                                text: q,
                                align: "center",
                                style: l.detailEditionsRowFont
                            }).name = "win" + f, a.mainRenderer.createButton(k, 478, 0, void 0, {
                                text: c[e].betsHistory.bets[z].coef,
                                align: "center", style: l.detailEditionsRowFont
                            }).name = "coefMode" + f)
                        }
                        n = [];
                        h.emit("updateHeight");
                        n = q = m = m = n = m = k = m = k = h = w = null
                    }
                }
            };
            this.cancelLastEdition = function (a) {
                c.length && (c[c.length - 1].editionResult = a, c[c.length - 1].betsHistory.calculateWin(a), p(c.length - 1))
            };
            this.addEdition = function (a) {
                6 <= c.length && (c[0].betsHistory.destroy && c[0].betsHistory.destroy(), c[0].betsHistory = null, c.shift());
                c.length && !c[c.length - 1].betsHistory.bets.length ? (c[c.length - 1].round = a, c[c.length - 1].editionResult = void 0) : c.length &&
                    c[c.length - 1].round === a || (c.push({
                        round: a,
                        editionResult: void 0,
                        betsHistory: new e([])
                    }), c[c.length - 1].betsHistory.parentEditions(l));
                p(c.length - 1)
            };
            this.saveToStorage = function () {
                var g, b;
                return $jscomp.asyncExecutePromiseGeneratorProgram(function (d) {
                    localStorage.setItem("curUser", JSON.stringify({
                        hall: clientInfoGlobal.hall,
                        nick: clientInfoGlobal.lgn
                    }));
                    g = [];
                    for (b = 0; b < c.length; b++) g.push({
                        round: c[b].round,
                        editionResult: c[b].editionResult,
                        bets: c[b].betsHistory.bets
                    });
                    localStorage.setItem(a.gameConfig[a.configType].gameKind +
                        a.gameConfig[a.configType].gameType + "editions", JSON.stringify(g));
                    d.jumpToEnd()
                })
            };
            this.loadFromStorage = function () {
                function g(g) {
                    $.ajax({
                        type: "get",
                        url: getUrl(),
                        data: {
                            gethistory: parseInt(a.gameConfig[a.configType].serverName.slice(3, a.gameConfig[a.configType].serverName.length)),
                            round: g.round + 1
                        },
                        dataType: "json",
                        async: !1,
                        success: function (b, d, c) {
                            if (l) if (b && b.tirid0) {
                                d = [];
                                c = b.tirid0;
                                for (b = 0; b < a.gameConfig[a.configType].ballCount; b++) {
                                    if (99 === c["b" + b] || 0 === c["b" + b]) return;
                                    d.push(c["b" + b])
                                }
                                g.editionResult =
                                    d;
                                a.mainGameManager.coefficients && g.betsHistory.calculateWin(g.editionResult, !0)
                            } else g.editionResult = []
                        }
                    })
                }

                if (localStorage.getItem("curUser")) {
                    var b = JSON.parse(localStorage.getItem("curUser"));
                    if (b.hall !== clientInfoGlobal.hall && b.nick !== clientInfoGlobal.lgn) return
                }
                b = a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "editions";
                if (localStorage.getItem(b)) {
                    var d = JSON.parse(localStorage.getItem(b));
                    for (b = 0; b < d.length; b++) c.push({
                        round: d[b].round, editionResult: d[b].editionResult,
                        betsHistory: new e(d[b].bets)
                    }), (!c[b].editionResult || c[b].editionResult.length < a.gameConfig[a.configType].ballCount) && g(c[b]);
                    p(c.length - 1)
                }
            };
            p(c.length - 1);
            this.events = new PIXI.utils.EventEmitter;
            l.events.on("EDITIONS_CHANGE", function () {
                l.saveToStorage()
            });
            l.events.on("RESULT_TIME", y);
            l.events.on("BET_TIME", y)
        }, n = {};
    this.animations = function () {
        return n
    };
    this.clickAnimationFunc = function (b, c) {
        b && (n[c] && (n[c].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(),
            n[c] = (new TWEEN.Tween(b)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                n[c] = null;
                a.mainRenderer.renderManager.animationTweenInc();
                n[c] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    n[c] = null
                }).start()
            }).start())
    };
    var F = function (b, c, f) {
        if (b) switch (n[c] && (n[c].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(),
            f) {
            case "grow":
                n[c] = (new TWEEN.Tween(b.scale)).to({
                    x: 1.2,
                    y: 1.2
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    n[c] = null
                }).start();
                break;
            default:
                n[c] = (new TWEEN.Tween(b)).to({alpha: .6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    n[c] = null
                }).start()
        }
    }, E = function (b, c, f) {
        n[c] && (n[c].stop(), a.mainRenderer.renderManager.animationTweenDec());
        if (b && 0 != b.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(),
            f) {
            case "grow":
                n[c] = (new TWEEN.Tween(b.scale)).to({
                    x: 1,
                    y: 1
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    n[c] = null
                }).start();
                break;
            default:
                n[c] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    n[c] = null
                }).start()
        }
    }, V = function (b, c, f) {
        if (b.container) {
            n[f] && n[f].stop();
            if (b.onStartClose) b.onStartClose();
            a.mainRenderer.renderManager.animationTweenInc();
            n[f] = (new TWEEN.Tween(b.container.scale)).to({y: 0},
                165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                if (b.onStopClose) b.onStopClose();
                if (c.onStopOpen) c.onStopOpen();
                a.mainRenderer.renderManager.animationTweenDec();
                n[f] = null;
                b.container.scale.y = 0;
                c.container.scale.y = 1
            }).onComplete(function () {
                if (b.onStopClose) b.onStopClose();
                a.mainRenderer.renderManager.animationTweenDec();
                n[f] = null;
                if (c.onStartOpen) c.onStartOpen();
                a.mainRenderer.renderManager.animationTweenInc();
                n[f] = (new TWEEN.Tween(c.container.scale)).to({y: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                    if (b.onStopClose) b.onStopClose();
                    if (c.onStopOpen) c.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    n[f] = null;
                    b.container.scale.y = 0;
                    c.container.scale.y = 1
                }).onComplete(function () {
                    if (c.onStopOpen) c.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    n[f] = null
                }).start()
            }).start()
        }
    }, X = function (b, c, f) {
        b && (n[c] ? n[c].stop() : (a.mainRenderer.renderManager.animationTweenInc(), n[c] = (new TWEEN.Tween(b.position)).to({x: f}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            n[c] = null
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            n[c] = null
        }).start()))
    };
    this.simpleFlipXFunc = function (b, c, f, e, h, k) {
        n[c] && n[c].stop();
        var d = b.scale.x;
        a.mainRenderer.renderManager.animationTweenInc();
        n[c] = (new TWEEN.Tween(b.scale)).to({x: 0}, f).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            n[c] = null;
            b.scale.x = d
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            n[c] = null;
            h && h(b);
            a.mainRenderer.renderManager.animationTweenInc();
            n[c] = (new TWEEN.Tween(b.scale)).to({x: d}, e).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                n[c] = null;
                b.scale.x = d;
                k && k(b)
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                n[c] = null;
                k && k(b)
            }).start()
        }).start()
    };
    var P = !1,
        O = [["bg", a.gameDir + "bg-" + a.gameConfig[a.configType].gameType + ".jpg"], ["JP", a.gameDir + "WinJP/jp-jackpot-win.png"], ["jp_only", a.gameDir + "WinJP/jp-jackpot-only.png"], ["WIN", a.gameDir + "WinJP/jp-bigwin.png"], ["header", a.gameDir + "header.png"], ["footer",
            a.gameDir + "footer.png"], ["jp_name", a.gameDir + "jackpot/jack-pot.png"], ["jp_num_bot", a.gameDir + "jackpot/num-bot.png"], ["jp_num_top", a.gameDir + "jackpot/num-top.png"], ["btn_clear", a.gameDir + "btn-undo.png"], ["btn_clear_mode_selected", a.gameDir + "btn-undo-mode-selected.png"], ["btn_home", a.gameDir + "btn-home.png"], ["btn_home_mode_selected", a.gameDir + "btn-home-mode-selected.png"], ["btn_info", a.gameDir + "btn-info.png"], ["btn_info_mode_selected", a.gameDir + "btn-info-mode-selected.png"], ["btn_my_bets", a.gameDir +
        "btn-my-bets.png"], ["btn_my_bets_mode_selected", a.gameDir + "btn-my-bets-selected.png"], ["btn_rebet", a.gameDir + "btn-rebet-min.png"], ["btn_rebet_mode_selected", a.gameDir + "btn-rebet-mode-selected-min.png"], ["btn_rebetx2", a.gameDir + "btn-rebetx2-min.png"], ["btn_rebetx2_mode_selected", a.gameDir + "btn-rebetx2-mode-selected-min.png"], ["btn_rules_new", a.gameDir + "help-desktop-new.png"], ["btn_rules_mode_selected_new", a.gameDir + "help-desktop-mode-selected.png"], ["btn_eye", a.gameDir + "btn-eye-min.png"], ["btn_eye_mode_selected",
            a.gameDir + "btn-eye-mode-selected2-min.png"], ["btn_eye_closed", a.gameDir + "btn-eye-closed-min.png"], ["btn_eye_closed_mode_selected", a.gameDir + "btn-eye-closed-mode-selected-min.png"], ["eye_icon", a.gameDir + "eye-icon-min.png"], ["eye_closed_icon", a.gameDir + "eye-closed-icon-min.png"], ["bet_arrow", a.gameDir + "arrow.png"], ["bet_arrow_selected", a.gameDir + "arrow-selected.png"], ["history_arrow", a.gameDir + "arrow-history.png"], ["history_arrow_selected", a.gameDir + "arrow-history-selected2.png"], ["history_arrow_left",
            a.gameDir + "arrow-history-l.png"], ["history_arrow_left_selected", a.gameDir + "arrow-history-l-selected2.png"], ["autoplay", a.gameDir + "autoplay.png"], ["autoplay_selected", a.gameDir + "autoplay-selected.png"], ["autoplay_pressed", a.gameDir + "autoplay-pressed.png"], ["plus", a.gameDir + "plus_.png"], ["random", a.gameDir + "random_.png"], ["random_selected", a.gameDir + "random-selected_.png"], ["random_pressed", a.gameDir + "random-pressed_.png"], ["tab", a.gameDir + "tab.png"], ["tab_selected", a.gameDir + "tab-selected.png"], ["tab_pressed",
            a.gameDir + "tab-pressed.png"], ["tab_bg", a.gameDir + "tab-bg.png"], ["bet_bot", a.gameDir + "bet-bot.png"], ["table_header", a.gameDir + "table-header.png"], ["table_bg", a.gameDir + "table-bg.png"], ["table_line_odd", a.gameDir + "table-odd-line.png"], ["table_line_even", a.gameDir + "table-even-line.png"], ["expand", a.gameDir + "expand.png"], ["tab_history_row", a.gameDir + "tab-history-row-sep-min.png"], ["tab_history_row2", a.gameDir + "tab-history-row.png"], ["hotcold_bg", a.gameDir + "hotcold-bg.png"], ["ball", a.gameDir + "ball_.png"],
            ["game_red_btn", a.gameDir + "game-red-btn.png"], ["game_red_btn_selected", a.gameDir + "game-red-btn-selected.png"], ["game_green_btn", a.gameDir + "game-green-btn.png"], ["game_green_btn_selected", a.gameDir + "game-green-btn-selected.png"], ["game_blue_btn", a.gameDir + "game-blue-btn.png"], ["game_blue_btn_selected", a.gameDir + "game-blue-btn-selected.png"], ["game_red_icon", a.gameDir + "game-red-ico.png"], ["game_red_icon_selected", a.gameDir + "game-red-ico-selected.png"], ["game_green_icon", a.gameDir + "game-green-ico.png"],
            ["game_green_icon_selected", a.gameDir + "game-green-ico-selected.png"], ["game_blue_icon", a.gameDir + "game-blue-ico.png"], ["game_blue_icon_selected", a.gameDir + "game-blue-ico-selected.png"], ["zone_transp", a.gameDir + "zone-" + a.gameConfig[a.configType].gameType + "_.png"], ["zone_hot", a.gameDir + "zone-hot.png"], ["zone_cold", a.gameDir + "zone-cold.png"], ["zone_selected", a.gameDir + "zone-action-" + a.gameConfig[a.configType].gameType + "_.png"], ["zone_pressed", a.gameDir + "zone-win-" + a.gameConfig[a.configType].gameType +
            "2.png"], ["zone_win", a.gameDir + "zone-pressed-" + a.gameConfig[a.configType].gameType + "2.png"], ["zone_lock", a.gameDir + "zone-lock-" + a.gameConfig[a.configType].gameType + "2.png"], ["zone_lock2", a.gameDir + "zone-lock-" + a.gameConfig[a.configType].gameType + "2.png"], ["grid_bg", a.gameDir + "grid-" + a.gameConfig[a.configType].gameType + ".png"], ["grid_bg_copy", a.gameDir + "grid-" + a.gameConfig[a.configType].gameType + "-copy.png"], ["coef_bg", a.gameDir + "bg-coef.png"], ["coef_btns", a.gameDir + "bg-coef-btns-" + a.gameConfig[a.configType].gameType +
            "_.png"], ["coef_line_left", a.gameDir + "coef-line-left.png"], ["coef_line_middle", a.gameDir + "coef-line-middle.png"], ["coef_line_right", a.gameDir + "coef-line-right.png"], ["coef_btn_selected", a.gameDir + "bg-coef-btn-selected.png"], ["coef_btn", a.gameDir + "bg-coef-btn-" + a.gameConfig[a.configType].gameType + ".png"], ["rules_1", a.gameDir + "rules_1_" + a.gameConfig[a.configType].gameType + "-min.png"], ["rules_2", a.gameDir + "rules_2_" + a.gameConfig[a.configType].gameType + "-min.png?v=1"], ["rules_3", a.gameDir + "rules_3_" + a.gameConfig[a.configType].gameType +
            "-min.png?v=1"], ["rules_4", a.gameDir + "rules_4_" + a.gameConfig[a.configType].gameType + "-min.png?v=1"], ["rules_5", a.gameDir + "rules_5-min.png"], ["rules_6", a.gameDir + "rules_6-min.png"], ["rules_7", a.gameDir + "rules_7-min.png"], ["btn_menu", a.gameDir + "btn-menu2-min.png"], ["btn_menu_selected", a.gameDir + "btn-menu2-selected-min.png"], ["btn_cross", a.gameDir + "btn-cross-min.png"], ["btn_cross_selected", a.gameDir + "btn-cross-selected-min.png"], ["btn_rules", a.gameDir + "btn-rules.png"], ["btn_rules_selected", a.gameDir + "btn-rules-selected.png"],
            ["video_load", a.gameDir + "btn-video-load-new.png"]];
    O = O.concat(a.mainFLGAccount.resources);
    O = O.concat(L.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, "images/logo.json", O, function (e, c, m) {
        function l(g) {
            a.configType != g && (a.mainSoundManager.playSound("buttonClick"), mobileMode || h.css("background-image", "url(" + a.gameConfig[g].gameBG + ")"), setTimeout(function () {
                var b = a.gameConfig[a.configType].canvasId;
                $("#" + b).attr("gameType", g);
                removeLottoNewObject(b, a.configType.toLowerCase());
                initLottoNewObject(b,
                    g)
            }, 50))
        }

        function n(g, b, d) {
            var c = -1, e = -1, w;
            for (w in v) if (!v[w].isUsed) {
                c = parseInt(w);
                v[c].isLast && (e = c == v.length - 1 ? 0 : c + 1);
                break
            }
            a.mainRenderer.renderManager.animationTweenInc();
            a.mainUIManager.animations().lottoTicket = (new TWEEN.Tween({
                scale: 1,
                position: J.position.y,
                alpha: 1
            })).to({scale: .9, position: -60, alpha: 0}, b ? 0 : 250).onUpdate(function () {
                J.scale.set(this.scale, this.scale);
                J.position.y = this.position;
                for (var a = 1 - .08 * c, g = 1 - .15 * c, b = 0; b < c; b++) v[b].position.y = -50 * (c - b) * a + this.position, v[b].scale.set(this.scale -
                    .08 * (c - b), this.scale - .08 * (c - b)), v[b].alpha = g, a += .08, g += .15;
                v[c].isLast && (v[e].alpha = this.alpha)
            }).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations().lottoTicket = null;
                v[c].isLast && (v[e].position.x = -1200, v[e].position.y = 0, v[e].scale.set(1, 1), v[e].isUsed = !1, v[e].isLast = !0, v[e].alpha = 1, f.game.container.removeChild(v[e]), f.game.container.addChildAt(v[e], f.game.container.getChildIndex(J) + 1), v[c].isLast = !1);
                a.mainRenderer.renderManager.animationTweenInc();
                a.mainUIManager.animations().lottoTicketCopy = (new TWEEN.Tween(v[c].position)).to({x: 0}, b ? 0 : 250).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    a.mainUIManager.animations().lottoTicketCopy = null;
                    v[c].isUsed = !0;
                    if (g) {
                        var b;
                        for (b in g) {
                            var e = a.mainGrid.zones[g[b] - 1];
                            e.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture;
                            e.children[0].style = {
                                font: "50px Swiss721-CondensedBold",
                                fill: a.gameConfig[a.configType].gridNumColor,
                                align: "center"
                            }
                        }
                    }
                    J.scale.set(1,
                        1);
                    J.position.y = 0;
                    f.game.container.removeChild(v[c]);
                    f.game.container.addChildAt(v[c], f.game.container.getChildIndex(J));
                    v[c].scale.set(.9, .9);
                    v[c].position.y -= 60;
                    d && d()
                }).start()
            }).start()
        }

        function t(g, b) {
            f.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].interactive = !1;
            f.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].alpha = 1;
            f.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].children[0].style =
                {font: "bold " + C + "px Arial", fill: "#000"};
            f.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].interactive = !1;
            f.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].alpha = 1;
            f.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].children[0].style = {
                font: "bold " + C + "px Arial",
                fill: "#000"
            };
            f.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + g).children[1].interactive = !0;
            f.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" +
                g).children[1].alpha = 0;
            f.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + g).children[1].children[0].style = {
                font: "bold " + C + "px Arial",
                fill: "#444"
            };
            f.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + g).children[1].interactive = !0;
            f.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + g).children[1].alpha = 0;
            f.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + g).children[1].children[0].style = {
                font: "bold " + C + "px Arial",
                fill: "#444"
            };
            localStorage.setItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "coefMode", JSON.stringify(b))
        }

        a.mainRenderer.createButton(void 0, 0, 0, "bg");
        a.mainRenderer.createButton(void 0, 0, 944, "footer");
        a.mainFLGAccount.drawAccount(0, 0, a.gameConfig[a.configType], !0);
        a.mainRenderer.createButton(void 0, 0, 0, "header");
        var d = new PIXI.Graphics;
        d.beginFill(0, .5);
        d.drawRect(0, 0, 136, 1052);
        d.endFill;
        d.name = "menu_container";
        H.addChild(d);
        d.position.set(-136, 28);
        H.interactive = !0;
        x = new PIXI.Graphics;
        x.beginFill(0);
        x.drawRect(0, 0, 1920, 28);
        x.endFill;
        d = a.mainRenderer.createButton(x, 960, 14, void 0, {
            text: mainLocalizationTable.placeBets.toUpperCase(),
            align: "center",
            style: {font: "18px Arial", fill: "#efefef", align: "center"}
        });
        d.anchor.set(.5, .5);
        d = a.mainRenderer.createButton(x, 1838, 14, void 0, {
            text: "00:00",
            align: "center",
            style: {font: "24px Arial", fill: "#efefef", align: "center"}
        });
        d.anchor.set(.5, .5);
        d = a.mainRenderer.createButton(x, 40, 14, void 0, {
            text: "LOTTO", align: "left", style: {
                font: "22px Arial Narrow", fill: "#efefef",
                align: "left"
            }
        });
        d.anchor.set(.5, .5);
        x.addChild(new PIXI.Graphics);
        x.children[3].beginFill(42577);
        x.children[3].drawRect(3, 3, 1914, 22);
        x.children[3].endFill;
        d = a.mainRenderer.createButton(x.children[3], 960, 14, void 0, {
            text: mainLocalizationTable.placeBets.toUpperCase(),
            align: "center",
            style: {font: "18px Arial", fill: "#000000", align: "center"}
        });
        d.anchor.set(.5, .5);
        d = a.mainRenderer.createButton(x.children[3], 1838, 14, void 0, {
            text: "00:00",
            align: "center",
            style: {font: "24px Arial", fill: "#000000", align: "center"}
        });
        d.anchor.set(.5, .5);
        d = a.mainRenderer.createButton(x.children[3], 40, 14, void 0, {
            text: "LOTTO",
            align: "left",
            style: {font: "22px Arial Narrow", fill: "#000000", align: "left"}
        });
        d.anchor.set(.5, .5);
        e = new PIXI.Graphics;
        e.beginFill();
        e.drawRect(3, 0, 1914, 28);
        e.endFill;
        x.children[3].mask = e;
        x.children[3].parent.addChild(e);
        e = null;
        a.mainRenderer.stage.addChild(x);
        d = a.mainRenderer.createButton(u, 43, 977, "btn_menu");
        a.mainRenderer.createButton(d, 0, 0, "btn_menu_selected", void 0, function (g, b) {
            a.mainSoundManager.playSound("buttonClick");
            b.stopped = !0;
            k.clickAnimationFunc(g, "btn_menu");
            X(H.getChildByName("menu_container"), "menuContainer", 0);
            u.getChildByName("btn_menu").visible = !1;
            H.getChildByName("menu_container").getChildByName("btn_cross").visible = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "btn_menu")
        }, function (a) {
            E(a, "btn_menu")
        }).alpha = 0;
        d = a.mainRenderer.createButton(H.getChildByName("menu_container"), 49, 946, "btn_cross");
        a.mainRenderer.createButton(d, 0, 0, "btn_cross_selected", void 0, function (g,
                                                                                     b) {
            a.mainSoundManager.playSound("buttonClick");
            b.stopped = !0;
            k.clickAnimationFunc(g, "btn_cross");
            X(H.getChildByName("menu_container"), "menuContainer", -136);
            u.getChildByName("btn_menu").visible = !0;
            H.getChildByName("menu_container").getChildByName("btn_cross").visible = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "btn_cross")
        }, function (a) {
            E(a, "btn_cross")
        }).alpha = 0;
        d = a.mainRenderer.createButton(H.getChildByName("menu_container"), 32, 830, "btn_home");
        a.mainRenderer.createButton(d,
            0, 0, "btn_home_mode_selected", void 0, function (g, b) {
                a.mainSoundManager.playSound("buttonClick");
                b.stopped = !0;
                k.clickAnimationFunc(g, "btn_home");
                a.mainFLGAccount.closeGame();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                F(a, "btn_home")
            }, function (a) {
                E(a, "btn_home")
            }).alpha = 0;
        APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && d && (d.visible = clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl);
        d = a.mainRenderer.createButton(H.getChildByName("menu_container"), 38, 527,
            "btn_rules");
        a.mainRenderer.createButton(d, 0, 0, "btn_rules_selected", void 0, function (g, b) {
            a.mainSoundManager.playSound("buttonClick");
            b.stopped = !0;
            k.clickAnimationFunc(g, "btn_rules");
            f.rules.button.emit("mousedown");
            f.rules.button.emit("mouseup");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "btn_rules")
        }, function (a) {
            E(a, "btn_rules")
        }).alpha = 0;
        d = a.mainRenderer.createButton(u, 172, 962, "btn_info");
        a.mainRenderer.createButton(d, 0, 0, "btn_info_mode_selected", void 0, function (b,
                                                                                         c) {
            if (b.pressed) k.clickAnimationFunc(b, "btn_info"), f.info.lastTab.button.emit("mousedown"), b.pressed = !1; else {
                for (var g in f) "info" !== g && f[g].button && f[g].button.pressed && (f[g].button.pressed = !1, f[g].button.texture = a.mainRenderer.resourceLoader.resources.tab.texture, f[g].button.getChildByName("texttab").style = {
                    font: "bold 34px Arial Narrow",
                    fill: "#292929"
                }, f.info.lastTab = f[g], V(f[g], f.info, "flipContainer"));
                b.alpha = .67;
                b.pressed = !0
            }
            a.mainSoundManager.playSound("buttonClick");
            c && (c.stopped = !0);
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        }, void 0, void 0, function (a) {
            a.pressed || F(a, "btn_info")
        }, function (a) {
            a.pressed || E(a, "btn_info")
        }).alpha = 0;
        d = a.mainRenderer.createButton(u, 292, 967, "btn_clear");
        a.mainRenderer.createButton(d, 0, 0, "btn_clear_mode_selected", void 0, function (b, c) {
                a.mainSoundManager.playSound("clearBet");
                a.mainGrid.removeCurrentBets();
                a.mainFLGAccount.maxWin(0);
                a.mainRenderer.renderManager.needUpdateRender = !0;
                c.stopped = !0;
                k.clickAnimationFunc(b, "btn_clear");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0,
            function (a) {
                F(a, "btn_clear")
            }, function (a) {
                E(a, "btn_clear")
            }).alpha = 0;
        a.mainRenderer.createButton(u, 318, 1027, void 0, {
            text: mainLocalizationTable.undo,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        });
        d = a.mainRenderer.createButton(H.getChildByName("menu_container"), 46, 720, "btn_my_bets");
        a.mainRenderer.createButton(d, 0, 0, "btn_my_bets_mode_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            FLGUtils && FLGUtils.showGamerHistory ? FLGUtils.showGamerHistory() : showCashFlowDlg();
            c.stopped = !0;
            k.clickAnimationFunc(b, "btn_my_bets");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "btn_my_bets")
        }, function (a) {
            E(a, "btn_my_bets")
        }).alpha = 0;
        d.visible = "DEMO" != clientInfoGlobal.hall;
        a.mainRenderer.createButton(H.getChildByName("menu_container"), 68, 790, void 0, {
            text: mainLocalizationTable.myBets,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        }).visible = "DEMO" != clientInfoGlobal.hall;
        d = a.mainRenderer.createButton(u, 1360, 957, "btn_rebet");
        a.mainRenderer.createButton(d,
            0, 0, "btn_rebet_mode_selected", void 0, function (b, c) {
                a.mainSoundManager.playSound("buttonClick");
                c.stopped = !0;
                k.clickAnimationFunc(b, "btn_rebet");
                a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                F(a, "btn_rebet")
            }, function (a) {
                E(a, "btn_rebet")
            }).alpha = 0;
        a.mainRenderer.createButton(u, 1386, 1027, void 0, {
            text: mainLocalizationTable.repeat,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        });
        d = a.mainRenderer.createButton(u,
            1480, 957, "btn_rebetx2");
        a.mainRenderer.createButton(d, 0, 0, "btn_rebetx2_mode_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            k.clickAnimationFunc(b, "btn_rebetx2");
            T = !0;
            a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "btn_rebetx2")
        }, function (a) {
            E(a, "btn_rebetx2")
        }).alpha = 0;
        a.mainRenderer.createButton(u, 1515, 1027, void 0, {
            text: mainLocalizationTable.repeatx2, align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        });
        d = a.mainRenderer.createButton(u, 1780, 957, "btn_rules_new");
        a.mainRenderer.createButton(d, 0, 0, "btn_rules_mode_selected_new", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            k.clickAnimationFunc(b, "btn_rules");
            f.rules.button.emit("mousedown");
            f.rules.button.emit("mouseup");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "btn_rules")
        }, function (a) {
            E(a, "btn_rules")
        }).alpha = 0;
        a.mainRenderer.createButton(u,
            1805, 1027, void 0, {
                text: mainLocalizationTable.rules,
                align: "center",
                style: {font: "20px Arial Narrow", fill: "#ffffff"}
            });
        d = a.mainRenderer.createButton(H.getChildByName("menu_container"), 68, 653, "btn_eye");
        a.mainRenderer.createButton(d, 0, 0, "btn_eye_mode_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            k.clickAnimationFunc(b, "btn_eye");
            I.needShow = !I.needShow;
            r.events.emit("GRID_STATS");
            b.parent.texture = a.mainRenderer.resourceLoader.resources[I.needShow ? "btn_eye" : "btn_eye_closed"].texture;
            b.texture = a.mainRenderer.resourceLoader.resources[I.needShow ? "btn_eye_mode_selected" : "btn_eye_closed_mode_selected"].texture;
            r.betBGContainer().getChildByName("eye_icon").children[0].texture = a.mainRenderer.resourceLoader.resources[I.needShow ? "eye_icon" : "eye_closed_icon"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "btn_eye")
        }, function (a) {
            E(a, "btn_eye")
        }).alpha = 0;
        d.anchor.set(.5, .5);
        d.children[0].anchor.set(.5, .5);
        d = a.mainRenderer.createButton(u, 418, 993,
            "bet_arrow");
        a.mainRenderer.createButton(d, 0, 0, "bet_arrow_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("chipSelector");
            D.decrementBet();
            var g = u.getChildByName("betText").children[0];
            D.isMaxBet() ? g.text = "MAX\n" + G : g.text = D.currentBet();
            localStorage.setItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "defaultBet", JSON.stringify(D.currentBet()));
            a.mainUIManager.setTextScale(g);
            K();
            a.mainUIManager.redrawCoefTable();
            c.stopped = !0;
            k.clickAnimationFunc(b, "bet_arrow");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "bet_arrow")
        }, function (a) {
            E(a, "bet_arrow")
        }).alpha = 0;
        d.anchor.set(.5, .5);
        d.children[0].anchor.set(.5, .5);
        a.mainRenderer.createButton(u, 496, 992, void 0, {
            text: D.currentBet(),
            align: "center",
            style: {font: "40px Arial Black", fill: "#ffffff", align: "center"}
        }).name = "betText";
        a.mainUIManager.setTextScale(u.getChildByName("betText").children[0]);
        d = a.mainRenderer.createButton(u, 574, 991, "bet_arrow");
        a.mainRenderer.createButton(d, 0, 0,
            "bet_arrow_selected", void 0, function (b, c) {
                a.mainSoundManager.playSound("chipSelector");
                D.incrementBet();
                var g = u.getChildByName("betText").children[0];
                D.isMaxBet() ? g.text = "MAX\n" + G : g.text = D.currentBet();
                localStorage.setItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "defaultBet", JSON.stringify(D.currentBet()));
                a.mainUIManager.setTextScale(g);
                K();
                a.mainUIManager.redrawCoefTable();
                c.stopped = !0;
                k.clickAnimationFunc(b, "bet_arrow2");
                a.mainRenderer.renderManager.needUpdateRender =
                    !0
            }, void 0, void 0, function (a) {
                F(a, "bet_arrow2")
            }, function (a) {
                E(a, "bet_arrow2")
            }).alpha = 0;
        d.anchor.set(.5, .5);
        d.children[0].anchor.set(.5, .5);
        d.rotation = Math.PI;
        a.mainRenderer.createButton(u, 496, 1027, void 0, {
            text: mainLocalizationTable.bet,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        });
        d = a.mainRenderer.createButton(u, 650, 945, "autoplay", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            a.mainFLGAccount.autoplayManager.changeVisible();
            c.stopped = !0;
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
        d.hitArea = new PIXI.Rectangle(0,
            0, 237, 100);
        a.mainRenderer.createButton(d, 129, 50, void 0, {
            text: mainLocalizationTable.autoPlay.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial Narrow", fill: "#292929"}
        });
        d = a.mainRenderer.createButton(u, 960, 945, "random", void 0, function (b, c) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            a.mainGrid.removeCurrentBets();
            a.mainGrid.createRandomBets();
            K();
            (b = u.getChildByName("plus")) && b.interactive && (b.emit("mousedown"), b.emit("mouseup"));
            c.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender =
                !0
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
        d.hitArea = new PIXI.Rectangle(73, 0, 237, 100);
        a.mainRenderer.createButton(d, 180, 50, void 0,
            {
                text: mainLocalizationTable.random.toUpperCase(),
                align: "center",
                style: {font: "bold 30px Arial Narrow", fill: "#292929"}
            });
        d = a.mainRenderer.createButton(u, 886, 898, "plus", {
            text: a.gameConfig[a.configType].ballCount,
            align: "center",
            style: {font: "bold 95px Arial", fill: "#d1d2d4", align: "center"}
        }, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            if (0 < a.mainGrid.pressedZones.length) {
                b.interactive = !1;
                b.parent.getChildByName("random").emit("mouseout");
                b.parent.getChildByName("random").interactive = !1;
                var g =
                    a.mainGrid.getIntArrayOfPressedZones();
                r.getActedOutEdition().betsHistory.addBet({
                    summ: D.currentBet(),
                    bet: g,
                    coef: a.mainGameManager.coefMode,
                    winBets: [],
                    countWin: 0,
                    win: void 0
                }, r.getActedOutEdition().round, function (b) {
                    if (b) {
                        a.mainFLGAccount.maxWin(0);
                        for (var c in g) switch (b = a.mainGrid.zones[g[c] - 1], b.emit("mousedown"), b.emit("mouseup"), b.currentLayer = !1, b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, b.isLock ? b.isLock++ : b.isLock = 1, b.isLock) {
                            case 1:
                                b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                break;
                            default:
                                b.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                        }
                        b = null;
                        n(g, !1, function () {
                            r.events.emit("GRID_STATS");
                            u.getChildByName("random").interactive = !0;
                            u.getChildByName("plus").texture = a.mainRenderer.resourceLoader.resources.plus.texture
                        })
                    }
                    a.mainRenderer.renderManager.needUpdateRender = !0
                })
            }
            c && (c.stopped = !0);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.children[0].style = "+" != b.children[0].text ?
                {font: "bold 95px Arial", fill: "#d1d2d4", align: "center"} : {
                    font: "150px Arial",
                    fill: "#ffffff",
                    align: "center"
                };
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.children[0].style = "+" != b.children[0].text ? {
                font: "bold 95px Arial",
                fill: "#d1d2d4",
                align: "center"
            } : {font: "150px Arial", fill: "#d1d2d4", align: "center"};
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        d.interactive = !1;
        M = new b(a.gameConfig[a.configType].resBallX, 40, 139, void 0, !0);
        e = new URLSearchParams(location.search);
        1 !== Number(e.get("show_gamelink") ||
            localStorage.getItem("show_gamelink")) ? (e = a.gameConfig[a.configType].gameType.toLowerCase(), d = a.mainRenderer.createButton(void 0, 1785, 105, "game_" + e + "_icon_selected"), a.mainRenderer.createButton(d, 0, 0).alpha = 0, d.anchor.set(.5, .5), d.children[0].anchor.set(.5, .5)) : (d = a.mainRenderer.createButton(void 0, 1785, 105, "game_blue_icon"), a.mainRenderer.createButton(d, 0, 0, "game_blue_icon_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            l("blue")
        }, void 0, void 0, function (a) {
            F(a,
                "game_blue_icon")
        }, function (a) {
            E(a, "game_blue_icon")
        }).alpha = 0, d.anchor.set(.5, .5), d.children[0].anchor.set(.5, .5), d = a.mainRenderer.createButton(void 0, 1583, 105, "game_red_icon"), a.mainRenderer.createButton(d, 0, 0, "game_red_icon_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            l("red")
        }, void 0, void 0, function (a) {
            F(a, "game_red_icon")
        }, function (a) {
            E(a, "game_red_icon")
        }).alpha = 0, d.anchor.set(.5, .5), d.children[0].anchor.set(.5, .5), d = a.mainRenderer.createButton(void 0,
            1379, 105, "game_green_icon"), a.mainRenderer.createButton(d, 0, 0, "game_green_icon_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            l("green")
        }, void 0, void 0, function (a) {
            F(a, "game_green_icon")
        }, function (a) {
            E(a, "game_green_icon")
        }).alpha = 0, d.anchor.set(.5, .5), d.children[0].anchor.set(.5, .5), a.mainRenderer.stage.getChildByName("game_" + a.gameConfig[a.configType].gameType.toLowerCase() + "_icon").texture = a.mainRenderer.resourceLoader.resources["game_" + a.gameConfig[a.configType].gameType.toLowerCase() +
        "_icon_selected"].texture, a.mainRenderer.stage.getChildByName("game_" + a.gameConfig[a.configType].gameType.toLowerCase() + "_icon").getChildByName("game_" + a.gameConfig[a.configType].gameType.toLowerCase() + "_icon_selected").visible = !1);
        for (var p in f) {
            switch (p) {
                case "game":
                case "video":
                    d = a.mainRenderer.createButton(N, 599, 536);
                    break;
                case "history":
                    d = a.mainRenderer.createButton(N, 599, 551, "tab_bg");
                    break;
                case "stats":
                    d = a.mainRenderer.createButton(N, 599, 551, "tab_bg");
                    break;
                case "rules":
                    d = a.mainRenderer.createButton(N,
                        599, 551, "tab_bg");
                    break;
                case "info":
                    d = a.mainRenderer.createButton(N, 599, 551)
            }
            d.name = p;
            d.anchor.set(.5, .5);
            d.scale.y = 0;
            f[p].container = d;
            if ("info" === p) f[p].button = u.getChildByName("btn_info").children[0]; else if ("stats" !== p && (function (b) {
                d = a.mainRenderer.createButton(N, f[p].posX, f[p].posY, "tab", {
                        text: f[p].text,
                        align: "center",
                        style: {font: "bold 34px Arial Narrow", fill: "#212121"}
                    }, function (c, g) {
                        if (!c.pressed) if ("history" === b && GamerHistory) {
                            c = document.getElementById("histWrap");
                            g = localLanguage();
                            switch (g) {
                                case "es":
                                    g =
                                        "spa";
                                    break;
                                case "en":
                                    g = "eng";
                                    break;
                                case "kz":
                                    g = "kaz";
                                    break;
                                case "ru":
                                    g = "rus";
                                    break;
                                case "fr":
                                    g = "fra"
                            }
                            GamerHistory.setConfig({lg: clientInfoGlobal.lgn, lang: g});
                            c.parentNode.classList.add("seen")
                        } else {
                            c.texture = a.mainRenderer.resourceLoader.resources.tab_pressed.texture;
                            c.getChildByName("texttab").style = {font: "bold 34px Arial Narrow", fill: "#ffffff"};
                            a.mainSoundManager.playSound("buttonClick");
                            for (var d in f) "info" !== d && f[d].button && f[d].button.pressed ? (f[d].button.pressed = !1, f[d].button.texture = a.mainRenderer.resourceLoader.resources.tab.texture,
                                f[d].button.getChildByName("texttab").style = {
                                    font: "bold 34px Arial Narrow",
                                    fill: "#212121"
                                }, V(f[d], f[c.name], "flipContainer")) : "info" === d && f[d].button.pressed && (f[d].button.pressed = !1, k.clickAnimationFunc(f[d].button, "btn_info"), V(f[d], f[c.name], "flipContainer"));
                            c.pressed = !0;
                            g && (g.stopped = !0);
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        }
                    }, void 0, void 0, function (b) {
                        b.pressed || (b.texture = a.mainRenderer.resourceLoader.resources.tab_selected.texture, a.mainRenderer.renderManager.needUpdateRender = !0)
                    },
                    function (b) {
                        b.pressed || (b.texture = a.mainRenderer.resourceLoader.resources.tab.texture, a.mainRenderer.renderManager.needUpdateRender = !0)
                    })
            }(p), d.rotation = -Math.PI / 2, d.name = p, f[p].button = d, f[p].pressedDefault && (f[p].button.pressed = !0, f[p].button.texture = a.mainRenderer.resourceLoader.resources.tab_pressed.texture, f[p].button.getChildByName("texttab").style = {
                font: "bold 34px Arial Narrow",
                fill: "#ffffff"
            }, f[p].container.scale.y = 1, f[p].onStartOpen))) f[p].onStartOpen()
        }
        d = a.mainRenderer.createButton(f.info.container,
            -209, 326, "coef_btns");
        d.anchor.set(.5, .5);
        d = a.mainRenderer.createButton(f.game.container, -210, 336, "coef_btns");
        d.anchor.set(.5, .5);
        var C = 10 < mainLocalizationTable.lottoLowRisk.length ? 20 : 24;
        d = a.mainRenderer.createButton(f.game.container.getChildByName("coef_btns"), -312, -34, "coef_btn", {
            text: "#1 " + mainLocalizationTable.lottoLowRisk,
            align: "center",
            style: {font: "bold " + C + "px Arial", fill: "#b1b1b1"}
        });
        d.name = "coef_btn_1";
        a.mainRenderer.createButton(d, 0, 0, "coef_btn_selected", {
            text: "#1 " + mainLocalizationTable.lottoLowRisk,
            align: "center", style: {font: "bold " + C + "px Arial", fill: "#444"}
        }, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            t(a.mainGameManager.coefMode, 1);
            a.mainGameManager.coefMode = 1;
            a.mainUIManager.redrawCoefTable();
            K();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "coef_btn_selected_1")
        }, function (a) {
            E(a, "coef_btn_selected_1")
        }).alpha = 0;
        d = a.mainRenderer.createButton(f.game.container.getChildByName("coef_btns"), -101, -34, "coef_btn", {
            text: "#2 " + mainLocalizationTable.lottoNormRisk,
            align: "center", style: {font: "bold " + C + "px Arial", fill: "#b1b1b1"}
        });
        d.name = "coef_btn_2";
        a.mainRenderer.createButton(d, 0, 0, "coef_btn_selected", {
                text: "#2 " + mainLocalizationTable.lottoNormRisk,
                align: "center",
                style: {font: "bold " + C + "px Arial", fill: "#444"}
            }, function (b, c) {
                a.mainSoundManager.playSound("buttonClick");
                c.stopped = !0;
                t(a.mainGameManager.coefMode, 2);
                a.mainGameManager.coefMode = 2;
                a.mainUIManager.redrawCoefTable();
                K();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                F(a, "coef_btn_selected_2")
            },
            function (a) {
                E(a, "coef_btn_selected_2")
            }).alpha = 0;
        d = a.mainRenderer.createButton(f.game.container.getChildByName("coef_btns"), 111, -34, "coef_btn", {
            text: "#3 " + mainLocalizationTable.lottoHighRisk,
            align: "center",
            style: {font: "bold " + C + "px Arial", fill: "#b1b1b1"}
        });
        d.name = "coef_btn_3";
        a.mainRenderer.createButton(d, 0, 0, "coef_btn_selected", {
            text: "#3 " + mainLocalizationTable.lottoHighRisk,
            align: "center",
            style: {font: "bold " + C + "px Arial", fill: "#444"}
        }, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped =
                !0;
            t(a.mainGameManager.coefMode, 3);
            a.mainGameManager.coefMode = 3;
            a.mainUIManager.redrawCoefTable();
            K();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "coef_btn_selected_3")
        }, function (a) {
            E(a, "coef_btn_selected_3")
        }).alpha = 0;
        f.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].alpha = 1;
        f.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].interactive = !1;
        f.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].children[0].style = {
            font: "bold " + C + "px Arial",
            fill: "#000"
        };
        d = a.mainRenderer.createButton(f.info.container.getChildByName("coef_btns"), -312, -34, "coef_btn", {
            text: "#1 " + mainLocalizationTable.lottoLowRisk,
            align: "center",
            style: {font: "bold " + C + "px Arial", fill: "#b1b1b1"}
        });
        d.name = "coef_btn_1";
        a.mainRenderer.createButton(d, 0, 0, "coef_btn_selected", {
            text: "#1 " + mainLocalizationTable.lottoLowRisk, align: "center",
            style: {font: "bold " + C + "px Arial", fill: "#444"}
        }, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            t(a.mainGameManager.coefMode, 1);
            a.mainGameManager.coefMode = 1;
            a.mainUIManager.redrawCoefTable();
            K();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "coef_btn_selected_1")
        }, function (a) {
            E(a, "coef_btn_selected_1")
        }).alpha = 0;
        d = a.mainRenderer.createButton(f.info.container.getChildByName("coef_btns"), -101, -34, "coef_btn", {
            text: "#2 " + mainLocalizationTable.lottoNormRisk,
            align: "center", style: {font: "bold " + C + "px Arial", fill: "#b1b1b1"}
        });
        d.name = "coef_btn_2";
        a.mainRenderer.createButton(d, 0, 0, "coef_btn_selected", {
                text: "#2 " + mainLocalizationTable.lottoNormRisk,
                align: "center",
                style: {font: "bold " + C + "px Arial", fill: "#444"}
            }, function (b, c) {
                a.mainSoundManager.playSound("buttonClick");
                c.stopped = !0;
                t(a.mainGameManager.coefMode, 2);
                a.mainGameManager.coefMode = 2;
                a.mainUIManager.redrawCoefTable();
                K();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                F(a, "coef_btn_selected_2")
            },
            function (a) {
                E(a, "coef_btn_selected_2")
            }).alpha = 0;
        d = a.mainRenderer.createButton(f.info.container.getChildByName("coef_btns"), 111, -34, "coef_btn", {
            text: "#3 " + mainLocalizationTable.lottoHighRisk,
            align: "center",
            style: {font: "bold " + C + "px Arial", fill: "#b1b1b1"}
        });
        d.name = "coef_btn_3";
        a.mainRenderer.createButton(d, 0, 0, "coef_btn_selected", {
            text: "#3 " + mainLocalizationTable.lottoHighRisk,
            align: "center",
            style: {font: "bold " + C + "px Arial", fill: "#444"}
        }, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped =
                !0;
            t(a.mainGameManager.coefMode, 3);
            a.mainGameManager.coefMode = 3;
            a.mainUIManager.redrawCoefTable();
            K();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            F(a, "coef_btn_selected_3")
        }, function (a) {
            E(a, "coef_btn_selected_3")
        }).alpha = 0;
        f.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].alpha = 1;
        f.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].interactive = !1;
        f.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].children[0].style = {
            font: "bold " + C + "px Arial",
            fill: "#000"
        };
        d = a.mainRenderer.createButton(f.info.container, -1, -44, "coef_bg");
        d.anchor.set(.5, .5);
        a.mainRenderer.createButton(f.info.container.getChildByName("coef_bg"), -301.5, -264, void 0, {
            text: mainLocalizationTable.guessedBalls.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial", fill: "#ffaa06", align: "center"}
        });
        a.mainRenderer.createButton(f.info.container.getChildByName("coef_bg"),
            50, -264, void 0, {
                text: mainLocalizationTable.coefficient.toUpperCase(),
                align: "center",
                style: {font: "bold 30px Arial", fill: "#ffaa06", align: "center"}
            });
        a.mainRenderer.createButton(f.info.container.getChildByName("coef_bg"), 351.5, -264, void 0, {
            text: mainLocalizationTable.win.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial", fill: "#ffaa06", align: "center"}
        });
        var y = function (a) {
            return {
                ru: {
                    intro: "\u0412 \u0431\u0438\u043b\u0435\u0442\u0435 2 \u041f\u043e\u043b\u044f.\n\u0412 1-\u043e\u043c \u041f\u043e\u043b\u0435 \u2014 \u0447\u0438\u0441\u043b\u0430 \u043e\u0442 1 \u0434\u043e 36, \u0432\u043e 2-\u043e\u043c \u041f\u043e\u043b\u0435  \u2014 \u0447\u0438\u0441\u043b\u0430 1, 2, 3.",
                    rule1: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 6 \u043d\u0435 \u043f\u043e\u0432\u0442\u043e\u0440\u044f\u044e\u0449\u0438\u0445\u0441\u044f \u0447\u0438\u0441\u0435\u043b \u0432 1-\u043e\u043c \u041f\u043e\u043b\u0435 (\u041f\u043e\u043b\u0435 1) \u0438 \u043e\u0434\u043d\u043e \u0447\u0438\u0441\u043b\u043e \u0432\u043e 2-\u043e\u043c \u041f\u043e\u043b\u0435 (\u041f\u043e\u043b\u0435 2).",
                    rule2: "\u041f\u043e\u043b\u0435 2 - \u0412\u044b \u0432\u044b\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u0442\u0438\u043f\u044b \u0412\u044b\u0438\u0433\u0440\u044b\u0448\u0435\u0439 \n#1 - \u0412\u044b\u0438\u0433\u0440\u044b\u0448\u0438 \u0447\u0430\u0441\u0442\u044b\u0435, \u043d\u043e \u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0438\u0435",
                    rule3: "#2 - \u0412\u044b\u0438\u0433\u0440\u044b\u0448\u0438 \u0440\u0435\u0436\u0435, \u043d\u043e \u043a\u0440\u0443\u043f\u043d\u0435\u0435 , \u0447\u0435\u043c \u0432 #1.",
                    rule4: "#3 - \u0412\u044b\u0438\u0433\u0440\u044b\u0448\u0438 \u0440\u0435\u0434\u043a\u0438\u0435, \u043d\u043e \u043e\u0447\u0435\u043d\u044c \u043a\u0440\u0443\u043f\u043d\u044b\u0435 , \u0431\u043e\u043b\u044c\u0448\u0435 \u0447\u0435\u043c \u0432 #1 \u0438 #2.",
                    rule5: "\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043e\u0434\u0438\u043d \u0431\u0438\u043b\u0435\u0442 \u0438\u043b\u0438 \u0441\u0440\u0430\u0437\u0443 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e.\n\u0421 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u043d\u043e\u043f\u043a\u0438 \u201c\u0420\u0430\u043d\u0434\u043e\u043c\u201d  \u043c\u043e\u0436\u043d\u043e \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u0441\u043b\u0443\u0447\u0430\u0439\u043d\u0443\u044e \u043a\u043e\u043c\u0431\u0438\u043d\u0430\u0446\u0438\u044e \u0447\u0438\u0441\u0435\u043b.",
                    rule6: "\u0414\u043b\u044f \u0443\u0447\u0430\u0441\u0442\u0438\u044f \u0432 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u0440\u0430\u0443\u043d\u0434\u0430\u0445 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0410\u0432\u0442\u043e \u043f\u043e\u0432\u0442\u043e\u0440 \u0438 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u043e\u043b-\u0432\u043e."
                }, en: {
                    intro: "In the ticket  2 fields.\nIn 1-st Field \u2014 numbers from 1 to 36, in 2-nd Field \u2014 numbers 1, 2, 3.",
                    rule1: "You choose 6 non- repeating in 1-st. Field and one number in 2-nd. Field.",
                    rule2: "Field 2 - You choose type of winning. \n#1 \u2013 Winnings are frequent but small.",
                    rule3: "#2 \u2013 Winnings less often but larger than in  #1.",
                    rule4: "#3 - Winnings are seldom but very large more then #1 and #2.",
                    rule5: "You can  fill out o one ticket or several at once.\nUsing the \u201cRandom\u201d button, you can select a random combination of numbers.",
                    rule6: "To participate in multiple rounds, you select Auto Repeat many rounds."
                },
                es: {
                    intro: "El boleto tiene 2 campos.\nEn el 1er campo - n\u00fameros del 1 al 36, en el segundo campo - n\u00famero 1, 2, 3.",
                    rule1: "En el primer campo, escoja 6 n\u00fameros que no se repitan y 1 n\u00famero en el segundo campo (campo 2).",
                    rule2: "Campo 2: usted escoge el tipo de ganancia. \n#1: Ganancias seguidas pero peque\u00f1as.",
                    rule3: "#2: Ganancias menos frecuentes, pero m\u00e1s altas que en el #1.",
                    rule4: "#3: Ganancias poco frecuentes, pero muy altas que en el #1 y #2.",
                    rule5: "Usted puede llenar un boleto o varios a la vez.\nCon ayuda del bot\u00f3n (random) puede elegir la combinaci\u00f3n de n\u00fameros aleatorios.",
                    rule6: "Para participar en varias rondas elija AUTOREPETICION, y escoja la cantidad."
                }, fr: {
                    intro: "Dans le billet, il y a 2 champs.\nDans le 1er champ - des chiffres de 1 \u00e0 36, dans le 2\u00e8me champ - les chiffres 1, 2, 3.",
                    rule1: "Vous choisissez 6 num\u00e9ros non r\u00e9p\u00e9t\u00e9s dans le 1er champ et un num\u00e9ro dans le 2\u00e8me champ.",
                    rule2: "Champ 2 - Vous choisissez le type de gain. \n#1 - Les gains sont fr\u00e9quents mais faibles.",
                    rule3: "#2 - Les gains sont moins fr\u00e9quents mais plus importants que dans le #1.",
                    rule4: "#3 - Les gains sont rares mais tr\u00e8s importants, plus que #1 et #2.",
                    rule5: "Vous pouvez remplir un ou plusieurs billets \u00e0 la fois.\nEn utilisant le bouton \u00abAl\u00e9atoire\u00bb, vous pouvez s\u00e9lectionner une combinaison de num\u00e9ros al\u00e9atoire.",
                    rule6: "Pour participer \u00e0 plusieurs tours, vous s\u00e9lectionnez la R\u00e9p\u00e9tition automatique pour plusieurs tours."
                }, pt: {
                    intro: "No bilhete h\u00e1 2 campos.\nNo 1\u00ba campo - n\u00fameros de 1 a 36, no 2\u00ba campo - n\u00fameros 1, 2, 3.",
                    rule1: "Voc\u00ea escolhe 6 n\u00fameros n\u00e3o repetidos no 1\u00ba campo e um n\u00famero no 2\u00ba campo.",
                    rule2: "Campo 2 - Voc\u00ea escolhe o tipo de pr\u00eamio. \n# 1 - Os pr\u00eamios s\u00e3o frequentes, mas pequenos.",
                    rule3: "# 2 - Os pr\u00eamios s\u00e3o menos frequentes, mas maiores do que no # 1.",
                    rule4: "# 3 - Os pr\u00eamios s\u00e3o raros, mas muito grandes, mais do que # 1 e # 2.",
                    rule5: 'Voc\u00ea pode preencher um ou v\u00e1rios bilhetes de uma vez.\nUsando o bot\u00e3o "Aleat\u00f3rio", voc\u00ea pode selecionar uma combina\u00e7\u00e3o aleat\u00f3ria de n\u00fameros.',
                    rule6: "Para participar de v\u00e1rias rodadas, voc\u00ea seleciona Repeti\u00e7\u00e3o Autom\u00e1tica v\u00e1rias rodadas."
                }, kz: {
                    intro: "1 \u0431\u0438\u043b\u0435\u0442\u0442\u0435\u0433\u0456 2 \u0436\u043e\u043b \u0431\u0430\u0440.\n \u0411\u0456\u0440\u0456\u043d\u0448\u0456 \u0436\u043e\u043b\u0434\u0430\u043d 1-\u0434\u0435\u043d 36-\u0493\u0430 \u0434\u0435\u0439\u0456\u043d\u0433\u0456 \u0441\u0430\u043d\u0434\u0430\u0440, \u0435\u043a\u0456\u043d\u0448\u0456 \u0436\u043e\u043b\u0434\u0430 1, 2, 3 \u0441\u0430\u043d\u0434\u0430\u0440\u044b \u0431\u0430\u0440.",
                    rule1: "1-\u0448\u0456 \u0436\u043e\u043b\u0434\u0430 \u0442\u0435\u0437 \u043a\u0435\u043b\u043c\u0435\u0439\u0442\u0456\u043d 6 \u0441\u0430\u043d\u0434\u044b \u0442\u0430\u04a3\u0434\u0430\u04a3\u044b\u0437 (\u0416\u043e\u043b 1) \u0436\u04d9\u043d\u0435 \u0435\u043a\u0456\u043d\u0448\u0456 \u0436\u043e\u043b\u0493\u0430 (\u0416\u043e\u043b 2) \u0431\u0456\u0440 \u0441\u0430\u043d \u0442\u0430\u04a3\u0434\u0430\u04a3\u044b\u0437.",
                    rule2: "\u0416\u043e\u043b 2 - \u0421\u0456\u0437 \u0416\u0435\u04a3\u0456\u0441\u0442\u0435\u0440 \u0442\u0438\u043f\u0442\u0435\u0440\u0456\u043d \u0442\u0430\u04a3\u0434\u0430\u04a3\u044b\u0437. #1 - \u0416\u0435\u04a3\u0456\u0441\u0442\u0435\u0440 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d\u044b \u043a\u0435\u043c, \u0431\u0456\u0440\u0430\u049b \u0447\u0430\u0441\u0442\u043e.",
                    rule3: "#2 - #1-\u0433\u0435 \u043d\u0438\u0441\u043f\u0435\u0442\u0435\u043d \u0434\u0435 \u043a\u0435\u043c, \u0431\u0456\u0440\u0430\u049b \u043a\u04e9\u043f, \u0436\u044b\u043b\u044b\u049b\u043f\u0435\u043d (\u043a\u0435\u043c \u0434\u0435\u0433\u0435\u043d\u0434\u0435) \u0436\u0435\u04a3\u0456\u0441.",
                    rule4: "#3 - #1 \u0436\u04d9\u043d\u0435 #2-\u0434\u0435\u043d \u043a\u04e9\u043f, \u0431\u0456\u0440\u0430\u049b \u04e9\u0442\u0435 \u043a\u04e9\u043f, \u0448\u044b\u043d\u0436\u044b\u0440\u043b\u044b (\u043a\u0435\u043c \u0434\u0435\u0433\u0435\u043d\u0434\u0435) \u0436\u0435\u04a3\u0456\u0441.",
                    rule5: '\u0421\u0456\u0437 \u0431\u0456\u0440 \u0436\u0430\u0437\u0431\u0430\u043d\u044b \u043d\u0435\u043c\u0435\u0441\u0435 \u0431\u0456\u0440\u043d\u0435\u0448\u0435 \u0436\u0430\u0437\u0431\u0430\u043d\u044b \u0442\u043e\u043b\u0442\u044b\u0440\u0443\u0493\u0430 \u0431\u043e\u043b\u0430\u0434\u044b. \n"Random" \u0442\u04af\u0439\u043c\u0435\u0441\u0456 \u0430\u0440\u049b\u044b\u043b\u044b \u0442\u0430\u04a3\u0434\u0430\u0443\u0448\u044b \u0441\u0430\u043d\u0434\u0430\u0440\u0434\u044b\u04a3 \u043a\u0435\u0437\u0434\u0435\u0441\u0435\u0434\u0456 \u0436\u0438\u043d\u0430\u049b\u044b\n \u043a\u043e\u043c\u0431\u0438\u043d\u0430\u0446\u0438\u044f\u0441\u044b\u043d \u0442\u0430\u04a3\u0434\u0430\u0443\u0493\u0430 \u0431\u043e\u043b\u0430\u0434\u044b.',
                    rule6: "\u0411\u0456\u0440\u043d\u0435\u0448\u0435 \u043e\u0439\u044b\u043d\u0434\u0430\u0440\u0493\u0430 \u049b\u0430\u0442\u044b\u0441\u0443 \u04af\u0448\u0456\u043d \u00ab\u0410\u0432\u0442\u043e \u049b\u0430\u0439\u0442\u0430\u043b\u0430\u0443\u00bb \u0442\u0430\u04a3\u0434\u0430\u0443\u0448\u044b\n \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u0456\u043d \u0442\u0430\u04a3\u0434\u0430\u04a3\u044b\u0437 \u0436\u04d9\u043d\u0435 \u0441\u0430\u043d\u044b\u043d \u0442\u0430\u04a3\u0434\u0430\u04a3\u044b\u0437."
                },
                ku: {
                    intro: "\u0644\u06d5 \u0628\u0648\u0627\u0631\u06cc \u0628\u0644\u06cc\u062a \u0662.\n \u0644\u06d5 \u067e\u0644\u06d5\u06cc \u06cc\u06d5\u06a9\u06d5\u0645. \u0645\u06d5\u06cc\u062f\u0627\u0646 \u2014 \u0698\u0645\u0627\u0631\u06d5\u06a9\u0627\u0646 \u0644\u06d5 1 \u062a\u0627 36\u060c \u0644\u06d5 2. \u0645\u06d5\u06cc\u062f\u0627\u0646 \u2014 \u0698\u0645\u0627\u0631\u06d5\u06a9\u0627\u0646\u06cc 1\u060c 2\u060c 3",
                    rule1: "\u062a\u0627\u0633\u0648 \u0628\u0627\u06cc\u062f \u0685\u0648 \u0628\u06cc\u0627 \u0628\u06cc\u0627 \u0631\u0646\u06ab\u0648\u0646\u0647 \u067e\u0647 \u0644\u0648\u0645\u0693\u06cc \u0681\u0627\u06cc \u06a9\u0693\u06cc \u0627\u0648 \u06cc\u0648\u0647 \u0634\u0645\u06cc\u0631\u0647 \u067e\u0647 \u0646\u06cc\u0645\u0647 \u0681\u0627\u06cc \u06a9\u0693\u06cc.",
                    rule2: "\u062f \u0681\u0627\u06cc\u0647 \u062f\u0648\u0647 - \u062a\u0627\u0633\u0648 \u0644\u0627\u0633\u0631\u0633\u06cc \u062f \u0646\u06cc\u067c\u0647 \u0645\u0634\u06a9\u0648\u06a9 \u06a9\u0693\u06cc. \n#1 - \u062c\u06a9\u067e\u0627\u062a\u0627\u0646\u0648 \u0689\u06cc\u0631\u0647 \u0648\u0644\u06cc\u0696\u0644 \u0634\u0648\u06cc.",
                    rule3: "#2 - \u062c\u06a9\u067e\u0627\u062a\u0627\u0646\u0648 \u0689\u06cc\u0631\u0647 \u06a9\u0645\u0632\u0648\u0631\u0647 \u0648\u0644\u06cc\u0696\u0644 \u0634\u0648\u06cc \u062f #1 \u067e\u0647 \u0645\u0642\u0627\u0628\u0644.",
                    rule4: "#3 - \u062c\u06a9\u067e\u0627\u062a\u0627\u0646\u0648 \u0646\u062f\u0631\u062a \u0648\u0644\u06cc\u0696\u0644 \u0634\u0648\u06cc\u060c \u0644\u0648\u06cc \u062f #1 \u0627\u0648 #2 \u0644\u0696 \u067c\u0648\u0644.",
                    rule5: '\u062a\u0627\u0633\u0648 \u06a9\u0648\u0644\u0627\u06cc \u0634\u064a \u062f \u0628\u0647\u0631\u0646\u06cc \u06cc\u0648\u0647 \u0628\u06cc\u0644\u067c\u0647 \u06cc\u0627 \u0647\u0645 \u067e\u0647 \u06cc\u0648\u0647 \u0648\u0642\u062a \u06a9\u062a\u0644 \u0634\u064a.\n\u0628\u0627 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0627\u0632 \u062f\u06a9\u0645\u0647 "\u062a\u0635\u0627\u062f\u0641\u06cc" \u060c \u0645\u06cc\u062a\u0648\u0627\u0646\u06cc\u062f \u06cc\u06a9 \u062a\u0631\u06a9\u06cc\u0628 \u062a\u0635\u0627\u062f\u0641\u06cc \u0627\u0632 \u0634\u0645\u0627\u0631\u0647 \u0647\u0627 \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f.',
                    rule6: "\u062f \u0685\u0648 \u062e\u0644\u0647 \u0645\u0631\u062d\u0644\u0647 \u062a\u0647 \u0634\u0631\u06a9\u062a \u06a9\u0648\u0644\u0648 \u0644\u067e\u0627\u0631\u0647 \u060c \u062a\u0627\u0633\u0648 \u062e\u067e\u0644\u0647 \u062e\u0648\u062f\u06a9\u0627\u0631 \u062f\u0648\u0628\u0627\u0631\u06d0 \u0648\u0631\u0681\u06cc \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0693\u0626."
                }
            }["ru en es pt kz fr ku".split(" ").includes(mainLocalizator.currentLang()) ? mainLocalizator.currentLang() : "en"][a]
        };
        (function (b) {
            b = new MaskedSprite(a.mainRenderer.createButton(b, 0, 0), {
                mask: {
                    x: -539,
                    y: -327,
                    width: 1070,
                    height: 655
                }, needScrolling: {}
            }, a.mainRenderer.renderManager);
            b.srcSprite.interactive = !0;
            b.srcSprite.hitArea = new PIXI.Rectangle(-529, -329, 1061, 661);
            b = b.containerForScroll;
            var c = {font: "bold 24px Arial", fill: "#ffffff"}, g = {font: "bold 24px Arial", fill: "#fca903"},
                f = {font: "bold 76px Arial", fill: "#c20317"};
            a.mainRenderer.createButton(b, -500, -280, void 0, {text: y("intro"), align: "left", style: c});
            a.mainRenderer.createButton(b,
                -500, -190, void 0, {text: "1.", align: "left", style: g});
            a.mainRenderer.createButton(b, -465, -190, void 0, {text: y("rule1"), align: "left", style: c});
            d = a.mainRenderer.createButton(b, 0, 50, "rules_1");
            d.scale.set(.5, .5);
            d.anchor.set(.5, .5);
            a.mainRenderer.createButton(d, 465, "blue" == a.configType ? 115 : 160, void 0, {text: "1", style: f});
            a.mainRenderer.createButton(d, 465, 290, void 0, {text: "2", style: f});
            a.mainRenderer.createButton(b, -500, 284, void 0, {text: "2.", align: "left", style: g});
            a.mainRenderer.createButton(b, -465, 299, void 0,
                {text: y("rule2"), align: "left", style: c});
            d = a.mainRenderer.createButton(b, 0, 569, "rules_2");
            d.scale.set(.6, .6);
            d.anchor.set(.5, .5);
            a.mainRenderer.createButton(b, -465, 813, void 0, {text: y("rule3"), align: "left", style: c});
            d = a.mainRenderer.createButton(b, 0, 1063, "rules_3");
            d.scale.set(.6, .6);
            d.anchor.set(.5, .5);
            a.mainRenderer.createButton(b, -465, 1327, void 0, {text: y("rule4"), align: "left", style: c});
            d = a.mainRenderer.createButton(b, 0, 1577, "rules_4");
            d.scale.set(.6, .6);
            d.anchor.set(.5, .5);
            a.mainRenderer.createButton(b,
                -500, 1826, void 0, {text: "3.", align: "left", style: g});
            a.mainRenderer.createButton(b, -465, 1841, void 0, {text: y("rule5"), align: "left", style: c});
            d = a.mainRenderer.createButton(b, 0, 1957, "rules_5");
            d.scale.set(.6, .6);
            d.anchor.set(.5, .5);
            a.mainRenderer.createButton(b, -500, 2081, void 0, {text: "4.", align: "left", style: g});
            a.mainRenderer.createButton(b, -465, 2081, void 0, {text: y("rule6"), align: "left", style: c});
            d = a.mainRenderer.createButton(b, 0, 2277, "rules_6");
            d.anchor.set(.5, .5);
            d = a.mainRenderer.createButton(b, 0, 2427,
                "rules_7");
            d.anchor.set(.5, .5);
            b.emit("updateHeight")
        })(f.rules.container);
        d = null;
        a.mainRenderer.stage.addChild(u);
        a.mainRenderer.stage.addChild(N);
        a.mainRenderer.stage.addChild(H);
        f.game.container.addChild(J);
        a.mainRenderer.createButton(J, 0, 0, "grid_bg").anchor.set(.5, .5);
        for (var A in v) f.game.container.addChild(v[A]), a.mainRenderer.createButton(v[A], 0, 0, "grid_bg_copy").anchor.set(.5, .5), v[A].position.x -= 1200, v[A].isUsed = !1, v[A].isLast = !1;
        v[v.length - 1].isLast = !0;
        a.setMainGrid(new LottoGrid(-599 + a.gameConfig[a.configType].gridPos.x,
            -551 + a.gameConfig[a.configType].gridPos.y, 10, a.gameConfig[a.configType].zonesCount, a.gameConfig[a.configType].ballCount, J, a.mainRenderer));
        a.mainGrid.createZones(100, 100, {x: 6, y: 6}, {
            font: "50px Swiss721-CondensedBold",
            fill: a.gameConfig[a.configType].gridNumColor,
            align: "center"
        }, function (b, c, d) {
            if (b.selected || !(a.mainGrid.pressedZones.length >= a.mainGrid.maxPreessedZones)) {
                c ? b.selected || (b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture) : a.mainGrid.gridContainer.down = !0;
                if (c && a.mainGrid.gridContainer.down ||
                    !c && !d || d && (b.name != R || void 0 == R)) b.selected ? (b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture, b.selected = !1, b.currentLayer = !1, a.mainGrid.pressedZones.splice(a.mainGrid.pressedZones.indexOf(b), 1)) : (b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, b.selected = !0, b.currentLayer = !0, a.mainSoundManager.playSound("firstChip"), a.mainGrid.pressedZones.push(b)), c = a.gameConfig[a.configType].ballCount - a.mainGrid.pressedZones.length, u.getChildByName("plus").children[0].text =
                    c, u.getChildByName("plus").children[0].style = {
                    font: "bold 95px Arial",
                    fill: "#d1d2d4",
                    align: "center"
                }, 0 == c ? (u.getChildByName("plus").interactive = !0, u.getChildByName("plus").children[0].text = "+", u.getChildByName("plus").children[0].style = {
                    font: "150px Arial",
                    fill: "#d1d2d4",
                    align: "center"
                }) : u.getChildByName("plus").interactive = !1;
                d && (R = b.name);
                a.mainGrid.gridContainer.down && K();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }, function (b, c) {
            if (c) {
                if (!b.selected && !a.mainGrid.gridContainer.down) if (b.isLock &&
                    b.currentLayer) switch (b.isLock) {
                    case 1:
                        b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                        break;
                    default:
                        b.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                } else b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture
            } else a.mainGrid.gridContainer.down = !1, R = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, !0);
        a.mainGrid.setRandomBetsCount(a.gameConfig[a.configType].ballCount);
        a.mainRenderer.stage.on("changeLang", W);
        a.mainGameManager.gameStateAsync(function (b) {
            a.mainGameManager.coefficients =
                b.coeftable;
            r.loadFromStorage();
            a.mainUIManager.drawCoefTable();
            var c = 0 >= b.t2 ? b.tir - 1 : b.tir;
            r.editions.length && r.editions[r.editions.length - 1].round === c || r.addEdition(c);
            if (r.editions.length && r.editions[r.editions.length - 1].round === c) {
                c = r.editions[r.editions.length - 1].betsHistory.bets;
                for (var d = 0, g = 0; g < c.length; g++) d += c[g].summ;
                a.mainFLGAccount.totalBet(d, !0);
                P = !0
            }
            r.drawEditions();
            S = new hotcoldGraphsLottoNew({hot: b.hot, cold: b.cold}, f.stats, function (b, c) {
                var d = 0, g = 9;
                if (0 === c.children.length) {
                    var f =
                        a.mainRenderer.createButton(c, -1, -310, void 0, {
                            text: mainLocalizationTable.hotcoldRating.replace(/%s/g, 100).toUpperCase(),
                            align: "center",
                            style: {font: "bold 34px Arial", fill: "#ffffff", align: "center"}
                        });
                    f.anchor.set(.5, .5);
                    c = a.mainRenderer.createButton(c, -531, -284, "hotcold_bg");
                    var e = new PIXI.Container;
                    c.addChild(e);
                    var l = new PIXI.Container;
                    c.addChild(l);
                    for (var h in b.cold) {
                        if (5 < d) break;
                        f = new PIXI.Graphics;
                        f.position.set(93 + 163 * d, 188);
                        e.addChild(f);
                        f = new PIXI.Graphics;
                        f.position.set(93 + 163 * d, 499);
                        l.addChild(f);
                        f = a.mainRenderer.createButton(c, 169 + 163 * d, 156, void 0, {
                            text: b.hot[d][1] + "%",
                            align: "center",
                            style: {font: "bold 50px Arial", fill: "#fe801b", align: "center"}
                        });
                        f.anchor.set(.5, .5);
                        f = a.mainRenderer.createButton(c, 169 + 163 * d, 246, void 0, {
                            text: b.hot[d][0],
                            align: "center",
                            style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                        });
                        f.anchor.set(.5, .5);
                        f = a.mainRenderer.createButton(c, 169 + 163 * d, 472, void 0, {
                            text: b.cold[g][1] + "%",
                            align: "center",
                            style: {font: "bold 50px Arial", fill: "#9bccff", align: "center"}
                        });
                        f.anchor.set(.5,
                            .5);
                        f = a.mainRenderer.createButton(c, 169 + 163 * d, 558, void 0, {
                            text: b.cold[g][0],
                            align: "center",
                            style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                        });
                        f.anchor.set(.5, .5);
                        d++;
                        g--
                    }
                } else for (h in c = c.children[1], e = c.children[0], l = c.children[1], b.cold) {
                    if (5 < d) break;
                    a.mainUIManager.animations()["anim_graph_hot" + d] && a.mainUIManager.animations()["anim_graph_hot" + d].stop();
                    a.mainUIManager.animations()["anim_graph_cold" + d] && a.mainUIManager.animations()["anim_graph_cold" + d].stop();
                    e.children[d].clear();
                    l.children[d].clear();
                    c.children[4 * d + 2].children[0].text = "0%";
                    c.children[4 * d + 3].children[0].text = b.hot[d][0];
                    c.children[4 * d + 4].children[0].text = "0%";
                    c.children[4 * d + 5].children[0].text = b.cold[g][0];
                    d++;
                    g--
                }
            }, function (b, c) {
                if (0 !== c.children.length) {
                    var d = c.children[1].children[0], g = c.children[1].children[1], f = 0, e = 9, l;
                    for (l in b.cold) {
                        if (5 < f) break;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations()["anim_graph_hot" + f] = (new TWEEN.Tween({
                            percentage: 0, data: {
                                rect: d.children[f],
                                iteration: f, percentText: c.children[1].children[4 * f + 2]
                            }
                        })).to({percentage: b.hot[f][1]}, 990).easing(TWEEN.Easing.Back.Out).onStop(function () {
                            this.data.rect.clear();
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations()["anim_graph_hot" + this.data.iteration] = null
                        }).onUpdate(function () {
                            this.data.rect.clear();
                            this.data.rect.beginFill(247660544);
                            this.data.rect.drawRect(0, 0, 153, -188 * this.percentage / 100);
                            this.data.rect.endFill;
                            this.data.percentText.children[0].text = this.percentage.toFixed(0) +
                                "%"
                        }).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations()["anim_graph_hot" + this.data.iteration] = null
                        }).start();
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations()["anim_graph_cold" + f] = (new TWEEN.Tween({
                            percentage: 0,
                            data: {rect: g.children[f], iteration: f, percentText: c.children[1].children[4 * f + 4]}
                        })).to({percentage: b.cold[e][1]}, 990).easing(TWEEN.Easing.Back.Out).onStop(function () {
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
                        f++;
                        e--
                    }
                }
            });
            S.draw();
            r.events.emit("GRID_STATS",
                {hot: b.hot, cold: b.cold});
            L.drawCustomJackpot(function (b, c) {
                if (c) {
                    var d = a.mainRenderer.stage.getChildByName("JackpotContainer"), g = utils.formatNumber(c);
                    if (d) {
                        var f = d.children[1];
                        c = d.children[2];
                        var e = d.children[3];
                        e.children[0].text = g
                    } else d = a.mainRenderer.createButton(void 0, 1296, 209), d.name = "JackpotContainer", a.mainRenderer.createButton(d, 0, 45, "jp_name").anchor.y = .5, f = a.mainRenderer.createButton(d, 3, 3), c = a.mainRenderer.createButton(d, 0, 75), f.visible = !1, e = a.mainRenderer.createButton(d, 280, 45, void 0,
                        {text: g, style: {font: "bold 54px Arial", fill: "#d6d6d6", align: "left"}});
                    d = 0;
                    e = f.position.x + e.children[0].width;
                    f = .8 * e / 10;
                    g = .2 * e / 9;
                    for (var l = 0; 10 > l; l++) {
                        e = c.children[l];
                        switch (l) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                var h = 65280;
                                break;
                            case 7:
                            case 8:
                                h = 15973429;
                                break;
                            case 9:
                                h = 15352834
                        }
                        e ? (e.clear(), e.beginFill(h), e.drawRect(d, 0, f, 4), e.endFill) : (e = new PIXI.Graphics, e.beginFill(h), e.drawRect(d, 0, f, 4), e.endFill, c.addChild(e));
                        d += f + g;
                        e.visible = l <= parseInt(b)
                    }
                    a.mainRenderer.renderManager.needUpdateRender =
                        !0
                }
            });
            L.updateJackpotData(b);
            a.mainFLGAccount.autoplayManager.updateCallback = function (b) {
                if (!(2 > r.editions.length)) {
                    switch (b) {
                        case "repeatLastBet":
                            var c = b = -1;
                            var d = r.editions.length - 2;
                            break;
                        case "getOnlyBets":
                            c = b = void 0;
                            d = r.editions.length - 1;
                            break;
                        default:
                            b = r.editions[r.editions.length - 2].betsHistory.setTotalWin(), c = a.mainFLGAccount.balance(), d = r.editions.length - 2
                    }
                    a.mainFLGAccount.autoplayManager.update(r.editions[d].betsHistory.bets, b, c, function (b) {
                        if (a.mainGameManager) {
                            if (T) {
                                for (var c = 0; c < b.length; c++) b[c].summ *=
                                    2;
                                T = !1
                            }
                            0 < b.length && (u.getChildByName("plus").interactive = !1, u.getChildByName("random").emit("mouseout"), u.getChildByName("random").interactive = !1, r.getActedOutEdition().betsHistory.addBet(b, r.getActedOutEdition().round, function (a) {
                                function b(d) {
                                    n(a[d].bet, !1, function () {
                                        d++;
                                        d <= c && b(d)
                                    })
                                }

                                r.events.emit("GRID_STATS");
                                u.getChildByName("random").interactive = !0;
                                u.getChildByName("plus").interactive = !0;
                                var c = 4 > a.length ? a.length - 1 : 3;
                                b(0)
                            }))
                        }
                    }, r.editions[d].round)
                }
            };
            U(b);
            m && m()
        })
    }, function () {
        a.mainSoundManager.playRandomBackSound()
    });
    var W = function () {
        a.mainFLGAccount.updateAccountText();
        r.redrawEditionHeader();
        r.drawBetsHeader();
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.onLanguageChange = W;
    this.setInteraction = function (b) {
        u.getChildByName("btn_clear").children[0].interactive = b;
        a.mainGrid.setZoneInteraction(b);
        b || u.getChildByName("random").emit("mouseout");
        u.getChildByName("random").interactive = b;
        u.getChildByName("plus").children[0].style = {
            font: "bold 95px Arial",
            fill: b ? "#d1d2d4" : "#595959",
            align: "center"
        };
        x.children[3].children[0].visible =
            b;
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.drawCoefTable = function () {
        var b = 0;
        5 == a.gameConfig[a.configType].ballCount ? b = 72 : 6 == a.gameConfig[a.configType].ballCount && (b = 36);
        for (var c = 0; c < a.gameConfig[a.configType].ballCount; c++) {
            var e = a.mainRenderer.createButton(f.info.container.getChildByName("coef_bg"), -301.5, -267 + b + 72 * (c + 1), "coef_line_left");
            e.anchor.set(.5, .5);
            for (var h = 1; h <= a.gameConfig[a.configType].ballCount; h++) a.mainRenderer.createButton(f.info.container.getChildByName("coef_bg"),
                -480 + 60 * (h - 1), -267 + b + 72 * (c + 1), void 0, {
                    text: h,
                    align: "center",
                    style: {font: "bold 40px Arial", fill: "#292929", align: "center"}
                });
            e = a.mainRenderer.createButton(f.info.container.getChildByName("coef_bg"), 50, -267 + b + 72 * (c + 1), "coef_line_middle");
            e.anchor.set(.5, .5);
            var k = a.mainGameManager.coefficients[a.mainGameManager.coefMode - 1][a.gameConfig[a.configType].ballCount - c] / 100;
            var m = new PIXI.Container;
            m.name = "infoBallsContainer" + c;
            f.info.container.getChildByName("coef_bg").addChild(m);
            for (h = 1; h <= a.gameConfig[a.configType].ballCount -
            c; h++) e = a.mainRenderer.createButton(m, -480 + 60 * (h - 1), -267 + b + 72 * (c + 1), "ball"), e.anchor.set(.5, .5), e.scale.set(.75, .75);
            f.info.container.getChildByName("coef_bg").getChildByName("infoBallsContainer" + c).visible = k ? !0 : !1;
            e = a.mainRenderer.createButton(f.info.container.getChildByName("coef_bg"), -58, -267 + b + 72 * (c + 1), void 0, {
                text: k ? "X  " + formatFLGNums(k, !1) : "-",
                align: "left",
                style: {font: "bold 40px Arial", fill: "#ffffff", align: "left"}
            });
            e.name = "tbl_coef" + c;
            e = a.mainRenderer.createButton(f.info.container.getChildByName("coef_bg"),
                351.5, -267 + b + 72 * (c + 1), "coef_line_right");
            e.anchor.set(.5, .5);
            e = a.mainRenderer.createButton(f.info.container.getChildByName("coef_bg"), 203, -267 + b + 72 * (c + 1), void 0, {
                text: k ? formatFLGNums(k * D.currentBet(), !1) : "-",
                align: "left",
                style: {font: "bold 40px Arial", fill: "#ffffff", align: "left"}
            });
            e.name = "tbl_win" + c
        }
    };
    this.redrawCoefTable = function () {
        for (var b, c = 0; c < a.gameConfig[a.configType].ballCount; c++) b = a.mainGameManager.coefficients[a.mainGameManager.coefMode - 1][a.gameConfig[a.configType].ballCount - c] / 100, f.info.container.getChildByName("coef_bg").getChildByName("tbl_coef" +
            c).children[0].text = b ? "X  " + formatFLGNums(b, !1) : "-", f.info.container.getChildByName("coef_bg").getChildByName("tbl_win" + c).children[0].text = b ? formatFLGNums(b * D.currentBet(), !1) : "-", f.info.container.getChildByName("coef_bg").getChildByName("infoBallsContainer" + c).visible = b ? !0 : !1
    };
    this.setTextScale = function (a) {
        a.text == "MAX\n" + G ? a.scale.set(.6, .6) : a.scale.set(1, 1)
    };
    var K = function () {
        var b = 0;
        0 == a.gameConfig[a.configType].ballCount - a.mainGrid.pressedZones.length && 0 < a.mainGrid.pressedZones.length && 0 < D.currentBet() &&
        (b = D.currentBet() * a.mainGameManager.coefficients[a.mainGameManager.coefMode - 1][a.mainGrid.pressedZones.length] / 100);
        a.mainFLGAccount.maxWin(b)
    }, aa = 0, da = 0, U = function (b) {
        function c(b) {
            a.mainGameManager && (x.children[3].mask.clear(), x.children[3].mask.beginFill(), x.children[3].mask.drawRect(3, 0, 1914 * b, 28), x.children[3].mask.endFill, x.children[3].children[1].children[0].text = Q.getTimerText(), x.children[1].children[0].text = Q.getTimerText(), a.mainRenderer.renderManager.needUpdateRender = !0)
        }

        function e(b) {
            if (a.mainGameManager) {
                x.children[3].clear();
                x.children[3].beginFill(42577);
                x.children[3].drawRect(3, 3, 1914, 22);
                x.children[3].endFill;
                if (P) P = !1; else {
                    a.mainFLGAccount.setWinTextVisible(!0);
                    a.mainGrid.removeSelectedBets();
                    for (var d in v) v[d].position.x = -1200, v[d].position.y = 0, v[d].scale.set(1, 1), v[d].isUsed = !1, v[d].isLast = !1;
                    v[v.length - 1].isLast = !0;
                    f.game.container.removeChild(J);
                    f.game.container.addChildAt(J, 0);
                    a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_transp.texture, {
                        font: "50px Swiss721-CondensedBold", fill: a.gameConfig[a.configType].gridNumColor,
                        align: "center"
                    }, void 0, a.mainGrid.getIntArrayOfZones())
                }
                S.update({hot: b.hot, cold: b.cold});
                a.mainUIManager.setInteraction(!0);
                r.addEdition(b.tir);
                a.mainFLGAccount.autoplayManager.updateCallback();
                var e = [];
                for (d = 1; d <= a.gameConfig[a.configType].ballCount; d++) e.push(b["b" + d]);
                M.startDrawBalls(e, 1.55, 0);
                x.children[3].children[2].children[0].text = "LOTTO    # " + (b.tir - 1);
                x.children[2].children[0].text = "LOTTO    # " + (b.tir - 1);
                1 < r.editions.length && r.drawDetailEditionHistory(f.history.container, r.editions.length -
                    2);
                Q.start({
                    minutes: 0,
                    seconds: (b.time_round ? b.time_round : a.gameConfig[a.configType].tirTime) - a.gameConfig[a.configType].timerOffset - b.t2
                }, {
                    minutes: 0,
                    seconds: (b.time_round ? b.time_round : a.gameConfig[a.configType].tirTime) - a.gameConfig[a.configType].timerOffset
                }, c, function () {
                    a.mainGameManager && (a.mainGrid.removeCurrentBets(), a.mainGrid.removeFuckingHoverTexture(), M.removeBalls(), a.mainUIManager.setInteraction(!1), a.mainSoundManager.playSound("endBet"))
                }, .1, U);
                r.events.emit("BET_TIME", {hot: b.hot, cold: b.cold})
            }
        }

        function h(b) {
            function c() {
                a.mainGameManager && (a.mainGameManager.gameStateAsync(e), a.mainRenderer.renderManager.needUpdateRender = !0)
            }

            function e(b) {
                function d(b) {
                    if (a.mainGrid && a.mainGameManager) if (e >= g.length) b(); else {
                        var c = g.slice(0, e + 1), f = "resultBalls" + e, h = a.mainGrid.zones[parseInt(g[e]) - 1];
                        a.mainUIManager.simpleFlipXFunc(h, f, 300, 300, function (b) {
                            b.getChildByName("text" + b.name).style = {
                                font: "50px Swiss721-CondensedBold",
                                fill: "#000",
                                align: "center"
                            };
                            b.texture = b.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture :
                                a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                        });
                        M.startDrawBalls(c, 1.55, 0);
                        r.cancelLastEdition(c);
                        e += 1;
                        setTimeout(function () {
                            d(b)
                        }, 900)
                    }
                }

                if (a.mainGameManager) if (0 === b.b1 || 99 === b.b1) setTimeout(c, 2E3); else {
                    var g = [b.b1, b.b2, b.b3, b.b4, b.b5];
                    5 < a.gameConfig[a.configType].ballCount && g.push(b.b6);
                    6 < a.gameConfig[a.configType].ballCount && g.push(b.b7);
                    var e = limit(h, 0, a.gameConfig[a.configType].ballCount - 1);
                    if (0 !== e) {
                        var k;
                        for (k = 0; k <= e; k++) {
                            var m = "resultBalls" + k, l = a.mainGrid.zones[parseInt(g[k]) -
                            1];
                            a.mainUIManager.simpleFlipXFunc(l, m, 450, 450, function (b) {
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
                        a.mainFLGAccount.calculateWin(r.getActedOutEdition().betsHistory.bets, a.gameConfig[a.configType].appName, function () {
                            r.getActedOutEdition().betsHistory.setTotalWin(a.mainFLGAccount.totalWin());
                            r.getActedOutEdition().betsHistory.redrawCurrentBets();
                            x.children[3].clear();
                            x.children[3].beginFill(0);
                            x.children[3].drawRect(3, 3, 1914, 22);
                            x.children[3].endFill;
                            var c = a.gameConfig.winShowTime ? a.gameConfig.winShowTime : 6E3;
                            aa = setTimeout(U, c);
                            b.t2 = 80;
                            L.updateJackpotData(b);
                            L.drawJackpotWin(2E4, {
                                x: 602,
                                y: 527
                            }, a.mainRenderer.resourceLoader.resources.JP.texture, a.mainFLGAccount.totalWin(), a.mainRenderer.resourceLoader.resources.jp_only.texture);
                            f.video.button.pressed ? setTimeout(function () {
                                f.game.button.emit("mousedown");
                                a.mainFLGAccount.winToBalanceAnimation(c - 2E3, 2E3, {
                                    x: 602,
                                    y: 527
                                }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                    font: "bold 70px Arial",
                                    fill: "#bcbcbc",
                                    withImages: !0
                                }, L.jpWin())
                            }, 2E3) : a.mainFLGAccount.winToBalanceAnimation(c, 2E3, {
                                x: 602,
                                y: 527
                            }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                font: "bold 70px Arial",
                                fill: "#bcbcbc",
                                withImages: !0
                            }, L.jpWin())
                        }, a.gameConfig);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    })
                }
            }

            if (a.mainGameManager) {
                r.events.emit("RESULT_TIME");
                x.children[3].clear();
                x.children[3].beginFill(12531501);
                x.children[3].drawRect(3, 3, 1914, 22);
                x.children[3].endFill;
                1 < r.editions.length && r.drawDetailEditionHistory(f.history.container, r.editions.length - 2);
                x.children[3].children[2].children[0].text = "LOTTO    # " + (b.tir - 1);
                x.children[2].children[0].text = "LOTTO    # " + (b.tir - 1);
                var h = b.time_wait - parseInt(b.t2, 10) - 1;
                0 > h ? setTimeout(c, 1E3 * -h) : c();
                a.mainUIManager.setInteraction(!1);
                P ? (b = a.mainFLGAccount.totalBet(), a.mainFLGAccount.setWinTextVisible(!1), a.mainFLGAccount.totalBet(b,
                    !0), P = !1) : a.mainFLGAccount.setWinTextVisible(!1)
            }
        }

        function k(a) {
            0 >= a.t2 ? h(a) : e(a)
        }

        void 0 != a.mainGameManager && (b ? k(b) : a.mainGameManager.gameStateAsync(k))
    };
    this.drawGridHotCold = function (b) {
        if (I.prevGmState || b) {
            var c = I.prevGmState;
            if (c) {
                for (var e = 0, f = 9; 6 > e; e++, f--) 0 != c.hot[e][0] && 99 != c.hot[e][0] && a.mainGrid.zones[parseInt(c.hot[e][0], 10) - 1].getChildByName("zone_hot") && (a.mainGrid.zones[parseInt(c.hot[e][0], 10) - 1].getChildByName("zone_hot").visible = !1), 0 != c.cold[f][0] && 99 != c.cold[f][0] && a.mainGrid.zones[parseInt(c.cold[f][0],
                    10) - 1].getChildByName("zone_cold") && (a.mainGrid.zones[parseInt(c.cold[f][0], 10) - 1].getChildByName("zone_cold").visible = !1);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
            b && (c = b, I.prevGmState = b);
            if (I.needShow) {
                e = 0;
                for (f = 9; 6 > e; e++, f--) 0 != c.hot[e][0] && 99 != c.hot[e][0] && (a.mainGrid.zones[parseInt(c.hot[e][0], 10) - 1].getChildByName("zone_hot") ? a.mainGrid.zones[parseInt(c.hot[e][0], 10) - 1].getChildByName("zone_hot").visible = !0 : (a.mainRenderer.createButton(a.mainGrid.zones[parseInt(c.hot[e][0], 10) - 1], 0,
                    0, "zone_hot"), a.mainGrid.zones[parseInt(c.hot[e][0], 10) - 1].getChildByName("zone_hot").anchor.set(.5, .5))), 0 != c.cold[f][0] && 99 != c.cold[f][0] && (a.mainGrid.zones[parseInt(c.cold[f][0], 10) - 1].getChildByName("zone_cold") ? a.mainGrid.zones[parseInt(c.cold[f][0], 10) - 1].getChildByName("zone_cold").visible = !0 : (a.mainRenderer.createButton(a.mainGrid.zones[parseInt(c.cold[f][0], 10) - 1], 0, 0, "zone_cold"), a.mainGrid.zones[parseInt(c.cold[f][0], 10) - 1].getChildByName("zone_cold").anchor.set(.5, .5)));
                a.mainRenderer.renderManager.needUpdateRender =
                    !0
            }
        }
    };
    r.events.on("GRID_STATS", k.drawGridHotCold);
    r.events.on("BET_TIME", k.drawGridHotCold)
}

function hotcoldGraphsLottoNew(a, b, e, k) {
    this.destroy = function () {
        y = p = null;
        b.onStartOpen = null;
        b.onStopOpen = null;
        for (var a in h) h[a] = null;
        h = null
    };
    var h = this, y = function () {
        for (var a = [], b = 0; 6 > b; b++) a.push([p.hot[b][0], p.hot[b][1]]);
        a.sort(function (a, b) {
            if (a[0] > b[0]) return 1;
            if (a[0] < b[0]) return -1
        });
        for (b = 0; b < a.length; b++) p.hot[b][0] = a[b][0], p.hot[b][1] = a[b][1];
        a = [];
        for (b = 9; 4 <= b; b--) a.push([p.cold[b][0], p.cold[b][1]]);
        a.sort(function (a, b) {
            if (a[0] > b[0]) return 1;
            if (a[0] < b[0]) return -1
        });
        b = 0;
        for (var e = 9; b < a.length; b++,
            e--) p.cold[e][0] = a[b][0], p.cold[e][1] = a[b][1];
        a = null
    }, p = a;
    y();
    this.update = function (a) {
        p = a;
        y();
        h.draw();
        h.drawGraphs()
    };
    this.draw = function () {
        e && e(p, b.container)
    };
    this.drawGraphs = function () {
        k && k(p, b.container)
    };
    b.onStartOpen = h.draw;
    b.onStopOpen = h.drawGraphs
};
