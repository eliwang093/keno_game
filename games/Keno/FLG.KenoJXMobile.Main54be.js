var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (a) {
    var d = 0;
    return function () {
        return d < a.length ? {done: !1, value: a[d++]} : {done: !0}
    }
};
$jscomp.arrayIterator = function (a) {
    return {next: $jscomp.arrayIteratorImpl(a)}
};
$jscomp.makeIterator = function (a) {
    var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return d ? d.call(a) : $jscomp.arrayIterator(a)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, d, e) {
    a != Array.prototype && a != Object.prototype && (a[d] = e.value)
};
$jscomp.polyfill = function (a, d, e, k) {
    if (d) {
        e = $jscomp.global;
        a = a.split(".");
        for (k = 0; k < a.length - 1; k++) {
            var l = a[k];
            l in e || (e[l] = {});
            e = e[l]
        }
        a = a[a.length - 1];
        k = e[a];
        d = d(k);
        d != k && null != d && $jscomp.defineProperty(e, a, {configurable: !0, writable: !0, value: d})
    }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function (a) {
    function d() {
        this.batch_ = null
    }

    function e(a) {
        return a instanceof l ? a : new l(function (d, t) {
            d(a)
        })
    }

    if (a && !$jscomp.FORCE_POLYFILL_PROMISE) return a;
    d.prototype.asyncExecute = function (a) {
        if (null == this.batch_) {
            this.batch_ = [];
            var d = this;
            this.asyncExecuteFunction(function () {
                d.executeBatch_()
            })
        }
        this.batch_.push(a)
    };
    var k = $jscomp.global.setTimeout;
    d.prototype.asyncExecuteFunction = function (a) {
        k(a, 0)
    };
    d.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length;) {
            var a =
                this.batch_;
            this.batch_ = [];
            for (var d = 0; d < a.length; ++d) {
                var k = a[d];
                a[d] = null;
                try {
                    k()
                } catch (y) {
                    this.asyncThrow_(y)
                }
            }
        }
        this.batch_ = null
    };
    d.prototype.asyncThrow_ = function (a) {
        this.asyncExecuteFunction(function () {
            throw a;
        })
    };
    var l = function (a) {
        this.state_ = 0;
        this.result_ = void 0;
        this.onSettledCallbacks_ = [];
        var d = this.createResolveAndReject_();
        try {
            a(d.resolve, d.reject)
        } catch (E) {
            d.reject(E)
        }
    };
    l.prototype.createResolveAndReject_ = function () {
        function a(a) {
            return function (t) {
                k || (k = !0, a.call(d, t))
            }
        }

        var d = this, k = !1;
        return {resolve: a(this.resolveTo_), reject: a(this.reject_)}
    };
    l.prototype.resolveTo_ = function (a) {
        if (a === this) this.reject_(new TypeError("A Promise cannot resolve to itself")); else if (a instanceof l) this.settleSameAsPromise_(a); else {
            a:switch (typeof a) {
                case "object":
                    var d = null != a;
                    break a;
                case "function":
                    d = !0;
                    break a;
                default:
                    d = !1
            }
            d ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a)
        }
    };
    l.prototype.resolveToNonPromiseObj_ = function (a) {
        var d = void 0;
        try {
            d = a.then
        } catch (E) {
            this.reject_(E);
            return
        }
        "function" == typeof d ?
            this.settleSameAsThenable_(d, a) : this.fulfill_(a)
    };
    l.prototype.reject_ = function (a) {
        this.settle_(2, a)
    };
    l.prototype.fulfill_ = function (a) {
        this.settle_(1, a)
    };
    l.prototype.settle_ = function (a, d) {
        if (0 != this.state_) throw Error("Cannot settle(" + a + ", " + d + "): Promise already settled in state" + this.state_);
        this.state_ = a;
        this.result_ = d;
        this.executeOnSettledCallbacks_()
    };
    l.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
            for (var a = 0; a < this.onSettledCallbacks_.length; ++a) w.asyncExecute(this.onSettledCallbacks_[a]);
            this.onSettledCallbacks_ = null
        }
    };
    var w = new d;
    l.prototype.settleSameAsPromise_ = function (a) {
        var d = this.createResolveAndReject_();
        a.callWhenSettled_(d.resolve, d.reject)
    };
    l.prototype.settleSameAsThenable_ = function (a, d) {
        var k = this.createResolveAndReject_();
        try {
            a.call(d, k.resolve, k.reject)
        } catch (y) {
            k.reject(y)
        }
    };
    l.prototype.then = function (a, d) {
        function k(a, d) {
            return "function" == typeof a ? function (d) {
                try {
                    e(a(d))
                } catch (G) {
                    t(G)
                }
            } : d
        }

        var e, t, p = new l(function (a, d) {
            e = a;
            t = d
        });
        this.callWhenSettled_(k(a, e), k(d, t));
        return p
    };
    l.prototype.catch = function (a) {
        return this.then(void 0, a)
    };
    l.prototype.callWhenSettled_ = function (a, d) {
        function k() {
            switch (e.state_) {
                case 1:
                    a(e.result_);
                    break;
                case 2:
                    d(e.result_);
                    break;
                default:
                    throw Error("Unexpected state: " + e.state_);
            }
        }

        var e = this;
        null == this.onSettledCallbacks_ ? w.asyncExecute(k) : this.onSettledCallbacks_.push(k)
    };
    l.resolve = e;
    l.reject = function (a) {
        return new l(function (d, k) {
            k(a)
        })
    };
    l.race = function (a) {
        return new l(function (d, k) {
            for (var l = $jscomp.makeIterator(a), t = l.next(); !t.done; t = l.next()) e(t.value).callWhenSettled_(d,
                k)
        })
    };
    l.all = function (a) {
        var d = $jscomp.makeIterator(a), k = d.next();
        return k.done ? e([]) : new l(function (a, l) {
            function p(d) {
                return function (k) {
                    t[d] = k;
                    y--;
                    0 == y && a(t)
                }
            }

            var t = [], y = 0;
            do t.push(void 0), y++, e(k.value).callWhenSettled_(p(t.length - 1), l), k = d.next(); while (!k.done)
        })
    };
    return l
}, "es6", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {
    };
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function () {
    var a = 0;
    return function (d) {
        return $jscomp.SYMBOL_PREFIX + (d || "") + a++
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
    var a = {a: !0}, d = {};
    try {
        return d.__proto__ = a, d.a
    } catch (e) {
    }
    return !1
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function (a, d) {
    a.__proto__ = d;
    if (a.__proto__ !== d) throw new TypeError(a + " is not extensible");
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
$jscomp.generator.Context.prototype.yield = function (a, d) {
    this.nextAddress = d;
    return {value: a}
};
$jscomp.generator.Context.prototype.yieldAll = function (a, d) {
    a = $jscomp.makeIterator(a);
    var e = a.next();
    $jscomp.generator.ensureIteratorResultIsObject_(e);
    if (e.done) this.yieldResult = e.value, this.nextAddress = d; else return this.yieldAllIterator_ = a, this.yield(e.value, d)
};
$jscomp.generator.Context.prototype.jumpTo = function (a) {
    this.nextAddress = a
};
$jscomp.generator.Context.prototype.jumpToEnd = function () {
    this.nextAddress = 0
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function (a, d) {
    this.catchAddress_ = a;
    void 0 != d && (this.finallyAddress_ = d)
};
$jscomp.generator.Context.prototype.setFinallyBlock = function (a) {
    this.catchAddress_ = 0;
    this.finallyAddress_ = a || 0
};
$jscomp.generator.Context.prototype.leaveTryBlock = function (a, d) {
    this.nextAddress = a;
    this.catchAddress_ = d || 0
};
$jscomp.generator.Context.prototype.enterCatchBlock = function (a) {
    this.catchAddress_ = a || 0;
    a = this.abruptCompletion_.exception;
    this.abruptCompletion_ = null;
    return a
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function (a, d, e) {
    e ? this.finallyContexts_[e] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
    this.catchAddress_ = a || 0;
    this.finallyAddress_ = d || 0
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function (a, d) {
    d = this.finallyContexts_.splice(d || 0)[0];
    if (d = this.abruptCompletion_ = this.abruptCompletion_ || d) {
        if (d.isException) return this.jumpToErrorHandler_();
        void 0 != d.jumpTo && this.finallyAddress_ < d.jumpTo ? (this.nextAddress = d.jumpTo, this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_
    } else this.nextAddress = a
};
$jscomp.generator.Context.prototype.forIn = function (a) {
    return new $jscomp.generator.Context.PropertyIterator(a)
};
$jscomp.generator.Context.PropertyIterator = function (a) {
    this.object_ = a;
    this.properties_ = [];
    for (var d in a) this.properties_.push(d);
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
    var d = this.context_.yieldAllIterator_;
    if (d) return this.yieldAllStep_("return" in d ? d["return"] : function (a) {
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
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function (a, d, e) {
    try {
        var k = a.call(this.context_.yieldAllIterator_, d);
        $jscomp.generator.ensureIteratorResultIsObject_(k);
        if (!k.done) return this.context_.stop_(), k;
        var l = k.value
    } catch (w) {
        return this.context_.yieldAllIterator_ = null, this.context_.throw_(w), this.nextStep_()
    }
    this.context_.yieldAllIterator_ = null;
    e.call(this.context_, l);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.nextStep_ = function () {
    for (; this.context_.nextAddress;) try {
        var a = this.program_(this.context_);
        if (a) return this.context_.stop_(), {value: a.value, done: !1}
    } catch (d) {
        this.context_.yieldResult = void 0, this.context_.throw_(d)
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
    this.next = function (d) {
        return a.next_(d)
    };
    this.throw = function (d) {
        return a.throw_(d)
    };
    this.return = function (d) {
        return a.return_(d)
    };
    $jscomp.initSymbolIterator();
    this[Symbol.iterator] = function () {
        return this
    }
};
$jscomp.generator.createGenerator = function (a, d) {
    d = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(d));
    $jscomp.setPrototypeOf && $jscomp.setPrototypeOf(d, a.prototype);
    return d
};
$jscomp.asyncExecutePromiseGenerator = function (a) {
    function d(d) {
        return a.next(d)
    }

    function e(d) {
        return a.throw(d)
    }

    return new Promise(function (k, l) {
        function w(a) {
            a.done ? k(a.value) : Promise.resolve(a.value).then(d, e).then(w, l)
        }

        w(a.next())
    })
};
$jscomp.asyncExecutePromiseGeneratorFunction = function (a) {
    return $jscomp.asyncExecutePromiseGenerator(a())
};
$jscomp.asyncExecutePromiseGeneratorProgram = function (a) {
    return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)))
};
$jscomp.polyfill("Array.prototype.fill", function (a) {
    return a ? a : function (a, e, k) {
        var d = this.length || 0;
        0 > e && (e = Math.max(0, d + e));
        if (null == k || k > d) k = d;
        k = Number(k);
        0 > k && (k = Math.max(0, d + k));
        for (e = Number(e || 0); e < k; e++) this[e] = a;
        return this
    }
}, "es6", "es3");

function KenoAppObjJXMobile(a) {
    this.destroy = function () {
        w.destroy();
        w = null;
        t.destroy();
        t = null;
        k.destroy();
        k = null;
        l.destroy();
        l = null;
        e.destroy();
        e = null;
        d.mainSoundManager.destroy();
        for (var a in d) d[a] = null;
        d = null
    };
    var d = this;
    this.gameDir = "games/Keno/resources/";
    "COP" === clientInfoGlobal.name_en + "" && "Green" === a.gameType && (a.serverName = "srv19", a.appName = "bets_19");
    this.kenoConfig = a;
    var e = new FLGRenderer(1920, 1080, a.canvasId, "center");
    this.mainRenderer = e;
    this.mainSoundManager = new SoundManager("Keno", d.kenoConfig.gameType,
        "NG");
    var k = new FLGAccount(a.canvasId, d.mainSoundManager, d.mainRenderer);
    this.mainFLGAccount = k;
    var l = new gameManagerJX(this);
    this.mainGameManager = l;
    var w = new UIManagerJXMobile(this);
    this.mainUIManager = w;
    var t;
    this.setMainGrid = function (a) {
        t = a;
        d.mainGrid = t
    }
}

function UIManagerJXMobile(a) {
    function d(b, c, d, k, f) {
        this.destroy = function () {
            r = q = n = g = null;
            clearTimeout(e);
            clearTimeout(v);
            m = h = null;
            for (var a in Z) Z[a] = null;
            Z = null
        };
        var Z = this, g = {font: "bold 35px Arial", fill: "#000000", align: "center"}, n = 0, e, v,
            q = new PIXI.Container;
        k ? k.addChild(q) : a.mainRenderer.stage.addChild(q);
        var r = function (b, c, d, r, h) {
            q.children[h] ? (q.children[h].visible = !0, q.children[h].children[0].text = r) : a.mainRenderer.createButton(q, b, c, "atlas%Jball", {
                text: r,
                align: "center",
                style: g
            }).scale.set(d,
                d);
            f && !q.children[h].isRotated && (q.children[h].position.x = b + 1714, q.children[h].children[0].rotation = 14 * Math.PI, q.children[h].isRotated = !0, a.mainUIManager.animations()["rotation_ball" + h] && (a.mainUIManager.animations()["rotation_ball" + h].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["rotation_ball" + h] = (new TWEEN.Tween({
                rotation: q.children[h].children[0].rotation,
                position: q.children[h].position.x
            })).to({
                rotation: 0,
                position: b
            }, 445).easing(TWEEN.Easing.Cubic.Out).onUpdate(function () {
                q.children[h].children[0].rotation = this.rotation;
                q.children[h].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["rotation_ball" + h] = null;
                a.mainSoundManager.playSound("ball")
            }).start())
        }, h = function (a, q, h, v) {
            function k() {
                r(b + d * n, c, q, a[n], n);
                n++;
                n < a.length ? 0 == h || void 0 == h ? k() : e = setTimeout(k, h) : n = 0
            }

            void 0 != a && a.length && (v ? r(b + d * v, c, q, a[v], v) : k())
        };
        this.startDrawBalls =
            h;
        var m = function () {
            for (var b = 0; b < q.children.length; b++) f ? (q.children[b].isRotated = !1, a.mainUIManager.animations()["remove_ball" + b] && (a.mainUIManager.animations()["remove_ball" + b].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["remove_ball" + b] = (new TWEEN.Tween({
                rotation: q.children[b].children[0].rotation,
                position: q.children[b].position.x,
                index: b
            })).to({rotation: 14 * Math.PI, position: q.children[b].position.x + 1714},
                990).easing(TWEEN.Easing.Cubic.In).onUpdate(function () {
                q.children[this.index].children[0].rotation = this.rotation;
                q.children[this.index].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["remove_ball" + this.index] = null;
                q.children[this.index].visible = !1
            }).start()) : q.children[b].visible = !1
        };
        this.removeBalls = m
    }

    function e(b) {
        this.destroy = function () {
            for (var a = 0; a < d.length; a++) {
                for (var b in d[a]) d[a][b] = null;
                d[a] = null
            }
            m = n = g = f = k =
                d = null;
            for (a in c) c[a] = null;
            c = null
        };
        var c = this, d = [];
        this.bets = d;
        var k = 0, f = 0;
        this.setTotalWin = function (a) {
            if (!arguments.length) return f;
            a && (f = a)
        };
        this.getTotalBet = function () {
            return k
        };
        var g = null;
        this.parentEditions = function (a) {
            if (!arguments.length) return g;
            g = a;
            n = g.betsHistoryContainer()
        };
        if (b.length) for (var e = 0; e < b.length; e++) b[e].summ && (k += b[e].summ), b[e].win && (f += b[e].win), d.push({
            summ: b[e].summ,
            bet: b[e].bet,
            winBets: b[e].winBets,
            countWin: b[e].countWin,
            win: b[e].win,
            code: b[e].code,
            id: b[e].id
        });
        this.addBet =
            function (b, c, r) {
                100 <= d.length ? (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), r && r(void 0)) : (b.length && 100 < d.length + b.length && (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), b = b.slice(0, b.length - (d.length + b.length - 100))), a.mainFLGAccount.placeBet(b, c, a.kenoConfig, function (c, q, v) {
                    if (void 0 == c) r && r(void 0); else {
                        if (v) {
                            v.notAll && a.mainRenderer.logService.log(mainLocalizationTable.betError);
                            for (c = 0; c < v.srvBets.length; c++) d.push({
                                summ: v.srvBets[c].summ,
                                bet: v.srvBets[c].bet,
                                winBets: v.srvBets[c].winBets,
                                countWin: v.srvBets[c].countWin,
                                code: v.srvBets[c].code,
                                id: v.srvBets[c].id
                            });
                            r && (r(v.srvBets), g.events.emit("EDITIONS_CHANGE"))
                        } else d.push({
                            summ: b.summ,
                            bet: b.bet,
                            winBets: b.winBets,
                            countWin: b.countWin,
                            win: b.win,
                            code: c,
                            id: q
                        }), r && (r(d[d.length - 1]), g.events.emit("EDITIONS_CHANGE"));
                        k = a.mainFLGAccount.totalBet();
                        m();
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }
                }))
            };
        var n, m = function () {
            var b = 0 != n.children.length;
            n.parent.children[7].children[0].children[0].text =
                0 < d.length ? mainLocalizationTable.coupon.toUpperCase() + " (" + d.length + ")" : mainLocalizationTable.coupon.toUpperCase();
            if (b) n.parent.children[2].children[1].children[0].text = 0 !== k ? formatFLGNums(k, !1) : "", n.parent.children[2].children[2].children[0].text = 0 !== f ? formatFLGNums(f, !1) : ""; else for (b = 0; 10 > b; b++) {
                var c = b & 1 ? "atlas%Jtable-odd-line" : "atlas%Jtable-even-line";
                c = new a.mainRenderer.createButton(n, 0, 127 + 49 * b, c);
                c.anchor.y = .5;
                c.name = "row_" + b
            }
            for (b = 0; n.getChildByName("row_" + b); b++) if (c = n.getChildByName("row_" +
                b)) {
                for (var r = 0; c.getChildByName("rect" + b + "_" + r); r++) {
                    var h = c.getChildByName("rect" + b + "_" + r);
                    h.visible = !1;
                    h.getChildByName("sortedBet" + b + "_" + r).visible = !1
                }
                if (h = c.getChildByName("summ" + b)) h.visible = !1, c.getChildByName("win" + b).visible = !1, c.getChildByName("coef" + b).visible = !1;
                9 < b && (c.visible = !1)
            }
            if (!(0 >= d.length)) {
                b = 0;
                for (var e = d.length - 1; b < d.length; b++, e--) {
                    var m = d[e].bet.slice();
                    m.sort(a.mainGameManager.sortNumeric);
                    (c = n.getChildByName("row_" + b)) ? c.visible = !0 : (c = b & 1 ? "atlas%Jtable-odd-line" : "atlas%Jtable-even-line",
                        c = new a.mainRenderer.createButton(n, 0, 127 + 49 * b, c), c.anchor.y = .5, c.name = "row_" + b);
                    for (r = 0; r < m.length; r++) {
                        var l = -1 < d[e].winBets.indexOf(m[r]), p = l ? 16773632 : 0;
                        (h = c.getChildByName("rect" + b + "_" + r)) ? (h.clear(), h.beginFill(p), h.drawRoundedRect(4 + 38 * r, -17, 34, 34, 4), h.endFill(), h.visible = !0, h = h.getChildByName("sortedBet" + b + "_" + r), h.children[0].style = l ? g.tableHistoryFontBig : g.tableHighlightFont, h.children[0].text = m[r], h.visible = !0) : (h = new PIXI.Graphics, h.beginFill(p), h.drawRoundedRect(4 + 38 * r, -17, 34, 34, 4), h.endFill(),
                            h.name = "rect" + b + "_" + r, c.addChild(h), a.mainRenderer.createButton(h, 21 + 38 * r, 0, void 0, {
                            text: m[r],
                            align: "center",
                            style: l ? g.tableHistoryFontBig : g.tableHighlightFont
                        }).name = "sortedBet" + b + "_" + r)
                    }
                    m = void 0 != d[e].win ? formatFLGNums(d[e].win, !1) : "";
                    r = void 0 != d[e].win && 0 != d[e].win ? g.tableBoldFont : g.tableBetFont;
                    h = c.getChildByName("summ" + b);
                    l = a.mainGameManager.coefficients[d[e].countWin][d[e].bet.length - 1];
                    l = 0 != l ? l : "";
                    h ? (h.children[0].style = r, h.children[0].text = formatFLGNums(d[e].summ, !1), h.visible = !0, h = c.getChildByName("win" +
                        b), h.children[0].style = r, h.children[0].text = m, h.visible = !0, h = c.getChildByName("coef" + b), h.children[0].style = r, h.children[0].text = l, h.visible = !0) : (a.mainRenderer.createButton(c, 394, 0, void 0, {
                        text: formatFLGNums(d[e].summ, !1),
                        align: "left",
                        style: r
                    }).name = "summ" + b, a.mainRenderer.createButton(c, 573, 0, void 0, {
                        text: m,
                        align: "left",
                        style: r
                    }).name = "win" + b, a.mainRenderer.createButton(c, 533, 0, void 0, {
                        text: l,
                        align: "center",
                        style: {font: r.font, fill: r.fill, align: "center"}
                    }).name = "coef" + b)
                }
            }
            n.emit("updateHeight")
        };
        this.redrawCurrentBets = m;
        this.calculateWin = function (b, c) {
            for (var q, h = 0; h < d.length; h++) {
                q = d[h].bet;
                for (var k = [], e = 0; e < q.length; e++) -1 < b.indexOf(q[e]) && k.push(q[e]);
                q = k;
                d[h].winBets = q;
                d[h].countWin = q.length;
                c && (d[h].win = d[h].summ * a.mainGameManager.coefficients[d[h].countWin][d[h].bet.length - 1], f += d[h].win)
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        }
    }

    this.destroy = function () {
        clearTimeout(ia);
        clearTimeout(ka);
        E = t = null;
        y.destroy();
        y = null;
        N.destroy();
        p = N = null;
        A && A.destroy();
        Y = A = null;
        F.destroy();
        F =
            null;
        G.destroy();
        aa = g = C = I = x = G = null;
        for (var b in u) {
            for (var c in u[b]) u[b][c] = null;
            u[b] = null
        }
        u = null;
        clearTimeout(la);
        O = null;
        for (b in f) f[b] = null;
        R = S = L = M = P = ba = ja = ca = da = f = null;
        a.mainFLGAccount.events.off("onBet", T);
        a.mainFLGAccount.events.off("onBalance", U);
        U = T = null;
        a.mainRenderer.stage.off("changeLang", V);
        V = null;
        l.off("visibleChange", w);
        w = l = null;
        W.destroy();
        H = W = null;
        m.destroy();
        m = null;
        for (b in k) k[b] = null;
        k = null
    };
    var k = this, l = $("#" + a.kenoConfig.canvasId).parent(), w = function (b, c) {
        a.mainRenderer.stage.visible =
            c == a.kenoConfig.canvasId;
        a.mainRenderer.StartStopAnimation(a.mainRenderer.stage.visible)
    };
    l.on("visibleChange", w);
    for (var t = clientInfoGlobal.coin7.split("-"), Q = 0; Q < t.length; Q++) t[Q] /= 100;
    var E = 2 * parseInt(t[t.length - 1], 10);
    t.push("MAX\n" + E);
    var y = new betsControls(t[0], t[t.length - 1], t[1], t, function (b) {
        a.mainFLGAccount.balance() < E && (E = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return E
    });
    this.betsControls = y;
    var N = new FLGTimer, p, A, Y = .1, F = new FLGJackpot(a.mainRenderer,
            {tirTimeOffset: Y, updateInterval: 900}), G, x = new PIXI.Container, I = new PIXI.Container,
        C = new PIXI.Container, g = new PIXI.Container, aa = new PIXI.Container, u = {
            game: {
                text: mainLocalizationTable.game.toUpperCase(),
                posX: 22,
                posY: 577,
                pressedDefault: !0,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            video: {
                text: mainLocalizationTable.video.toUpperCase(), posX: 22, posY: 439, onStartOpen: function () {
                    f.scale_video && f.scale_video.stop();
                    A = new FLGVideo(27, 288, 1120, 683, a.kenoConfig.canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" allowfullscreen="true" wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=0&amp;URL=' +
                        a.kenoConfig.videoURL + ';"> <param name="allowFullScreen" value="true"> <param name="movie" value="videoplayer.swf"> </object>', '<video id="innerVideo' + a.kenoConfig.canvasId + '" autoplay muted playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + a.kenoConfig.videoMobileURL + '" type="application/x-mpegURL"></video>', void 0, a.mainSoundManager);
                    A.setVisible(!0);
                    f.scale_video = (new TWEEN.Tween({scale: 0})).to({scale: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                        f.scale_video =
                            null;
                        A.setScale(1)
                    }).onUpdate(function () {
                        A.setScale(this.scale)
                    }).onComplete(function () {
                        f.scale_video = null
                    }).start()
                }, onStopOpen: void 0, onStartClose: function () {
                    A && (f.scale_video && f.scale_video.stop(), f.scale_video = (new TWEEN.Tween({scale: 1})).to({scale: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                        f.scale_video = null;
                        A.setScale(0)
                    }).onUpdate(function () {
                        A.setScale(this.scale)
                    }).onComplete(function () {
                        A.destroy();
                        A = null;
                        f.scale_video = null
                    }).start())
                }, onStopClose: void 0
            },
            history: {
                text: mainLocalizationTable.history.toUpperCase(),
                posX: 379, posY: 439, onStartOpen: void 0, onStopOpen: void 0, onStartClose: void 0, onStopClose: void 0
            },
            stats: {
                text: mainLocalizationTable.stats.toUpperCase(),
                posX: 22,
                posY: 301,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            info: {
                text: mainLocalizationTable.info.toUpperCase(),
                posX: 379,
                posY: 301,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            }
        }, la = 0, O, W, H = {needShow: !0}, m = new function () {
            this.destroy = function () {
                for (var a = 0; a < c.length; a++) c[a].round = null, c[a].editionResult =
                    null, c[a].betsHistory.destroy && c[a].betsHistory.destroy(), c[a].betsHistory = null, c[a] = null;
                m = f = k = c = null;
                g.destroy();
                v = p = l = g = null;
                n.destroy();
                n = null;
                J && (J.destroy(), J = null);
                q = null;
                r && (r.destroy(), r = null);
                X = z = ea = K = ha = fa = x = u = h = t = null;
                b.events.removeAllListeners();
                for (a in b) b[a] = null;
                b = null
            };
            var b = this, c = [], k;
            this.editions = c;
            var f, g, m = new PIXI.Container, l = new PIXI.Container, n, p = new PIXI.Container, v = new PIXI.Container;
            v.name = "betCntnr";
            this.historyTable = function () {
                return f
            };
            this.betBGContainer = function () {
                return n.srcSprite
            };
            this.betsHistoryContainer = function () {
                return v
            };
            var q = .653, r, h = {font: "bold 42px Arial", fill: "#313131"};
            this.tableHeaderFont = h;
            var u = {font: "34px Arial", fill: "#403f3f"}, t = {font: "26px Arial Narrow", fill: "#000000"};
            this.tableHistoryFont = t;
            this.tableHistoryFontBig = {font: "30px Arial Narrow", fill: "#000000"};
            var x = {font: "30px Arial Narrow", fill: "#ffffff"};
            this.tableHighlightFont = x;
            var fa = {font: "bold 34px Arial", fill: "#000000"};
            this.tableBoldFont = fa;
            var ha = {font: "34px Arial", fill: "#000000"};
            this.tableBetFont =
                ha;
            this.getActedOutEdition = function () {
                for (var a = c.length - 1; 0 <= a; a--) if (void 0 == c[a].editionResult) return K(a), c[a];
                K(c.length - 1);
                return c[c.length - 1]
            };
            var K = function (b) {
                0 > b || b >= c.length || (k = b, void 0 != f && c[k].betsHistory.redrawCurrentBets(), a.mainRenderer.renderManager.needUpdateRender = !0)
            };
            this.drawEditions = function () {
                f = a.mainRenderer.createButton(aa, 1174, 195);
                g = new MaskedSprite(a.mainRenderer.createButton(f, 1, 0, "table_bg"), {
                    mask: {
                        x: 1,
                        y: 0,
                        width: 722,
                        height: 151,
                        radius: 9
                    }
                }, a.mainRenderer.renderManager);
                a.mainRenderer.createButton(g.srcSprite, 0, 0, "atlas%Jtable-header");
                ea();
                X();
                var d = new PIXI.Graphics;
                d.beginFill(16777215);
                d.drawRect(127, 56, 2, 291);
                d.alpha = .5;
                d.endFill;
                g.srcSprite.addChild(d);
                d = null;
                d = a.mainRenderer.createButton(g.srcSprite, 0, 0, void 0, void 0, function (b, c) {
                    a.mainSoundManager.playSound("buttonClick");
                    a.mainUIManager.animations().rotate_editions && (a.mainUIManager.animations().rotate_editions.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().rotate_editions =
                        null);
                    b.pressed = !b.pressed;
                    var d = b.pressed ? Math.PI / 2 : 0;
                    a.mainRenderer.renderManager.animationTweenInc();
                    a.mainUIManager.animations().rotate_editions = (new TWEEN.Tween(b.children[0])).to({rotation: d}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        a.mainUIManager.animations().rotate_editions = null
                    }).start();
                    a.mainUIManager.animations().resize_editions && (a.mainUIManager.animations().resize_editions.stop(), a.mainRenderer.renderManager.animationTweenDec(),
                        a.mainUIManager.animations().resize_editions = null);
                    b = b.pressed ? 347 : 151;
                    a.mainRenderer.renderManager.animationTweenInc();
                    a.mainUIManager.animations().resize_editions = (new TWEEN.Tween({fHeight: g.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: b}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                        g.srcSprite.mask.clear();
                        g.srcSprite.mask.beginFill(14922837);
                        g.srcSprite.mask.drawRoundedRect(1, 0, 722, this.fHeight, 9);
                        g.srcSprite.mask.endFill
                    }).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        a.mainUIManager.animations().resize_editions = null
                    }).start();
                    c && (n.srcSprite.getChildByName("exp2").emit("mousedown"), c.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                });
                d.hitArea = new PIXI.Rectangle(0, 0, 722, 53);
                d.name = "exp1";
                d = a.mainRenderer.createButton(d, 695, 29, "atlas%Jexpand");
                d.anchor.set(.5, .5);
                d = null;
                for (d = 0; d < c.length; d++) c[d].betsHistory.parentEditions(b);
                z();
                c.length && c[k].betsHistory.redrawCurrentBets();
                g.srcSprite.addChild(l);
                g.srcSprite.addChild(m)
            };
            var ea = function () {
                l.children[0] &&
                l.children[1] ? (l.children[0].children[0].text = "#", l.children[1].children[0].text = mainLocalizationTable.balls) : (a.mainRenderer.createButton(l, 14, 30, void 0, {
                    text: mainLocalizationTable.history.toUpperCase(),
                    align: "left",
                    style: h
                }), a.mainRenderer.createButton(l, 64, 78, void 0, {
                    text: "#",
                    align: "center",
                    style: u
                }), a.mainRenderer.createButton(l, 141, 78, void 0, {
                    text: mainLocalizationTable.balls,
                    align: "left",
                    style: u
                }))
            };
            this.redrawEditionHeader = ea;
            var z = function () {
                if (p.children[0]) p.children[0].children[0].text =
                    mainLocalizationTable.coupon.toUpperCase(), p.children[1].children[0].text = mainLocalizationTable.balls, p.children[2].children[0].text = mainLocalizationTable.totalBet, p.children[3].children[0].text = mainLocalizationTable.win, n.srcSprite.children[2].children[0].text = mainLocalizationTable.total.toUpperCase() + ":"; else {
                    n = new MaskedSprite(a.mainRenderer.createButton(f, 1, 172, "table_bg"), {
                        mask: {
                            x: 1,
                            y: 172,
                            width: 722,
                            height: 445,
                            radius: 9
                        }, needScrolling: {container: v, scrollbar: {topOffset: 104, botOffset: 48}}
                    }, a.mainRenderer.renderManager);
                    n.srcSprite.addChildAt(v, 0);
                    a.mainRenderer.createButton(n.srcSprite, 0, 396, "atlas%Jbet-bot");
                    a.mainRenderer.createButton(n.srcSprite.children[2], 354, 24, void 0, {
                        text: mainLocalizationTable.total.toUpperCase() + ":",
                        align: "right",
                        style: u
                    });
                    a.mainRenderer.createButton(n.srcSprite.children[2], 394, 24, void 0, {
                        text: "",
                        align: "left",
                        style: u
                    });
                    a.mainRenderer.createButton(n.srcSprite.children[2], 573, 24, void 0, {
                        text: "",
                        align: "left",
                        style: u
                    });
                    var c = new PIXI.Graphics;
                    c.beginFill(16777215);
                    c.drawRect(385, 56, 2, 585);
                    c.alpha = .5;
                    c.name = "ballsSep";
                    c.endFill;
                    n.srcSprite.addChild(c);
                    c = new PIXI.Graphics;
                    c.beginFill(16777215);
                    c.drawRect(560, 56, 2, 573);
                    c.alpha = .5;
                    c.name = "winsSep";
                    c.endFill;
                    n.srcSprite.addChild(c);
                    n.srcSprite.interactive = !0;
                    n.srcSprite.hitArea = new PIXI.Rectangle(0, 0, 722, 445);
                    a.mainRenderer.createButton(n.srcSprite, 0, 0, "atlas%Jtable-header");
                    c = a.mainRenderer.createButton(n.srcSprite, 0, 0, void 0, void 0, function (b, c) {
                        a.mainUIManager.animations().rotate_bets && (a.mainUIManager.animations().rotate_bets.stop(),
                            a.mainRenderer.renderManager.animationTweenDec());
                        b.pressed = !b.pressed;
                        var d = b.pressed ? 0 : Math.PI / 2;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().rotate_bets = (new TWEEN.Tween(b.children[0])).to({rotation: d}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().rotate_bets = null
                        }).start();
                        a.mainUIManager.animations().resize_bets && (a.mainUIManager.animations().resize_bets.stop(), a.mainRenderer.renderManager.animationTweenDec(),
                            a.mainUIManager.animations().resize_bets = null);
                        b = b.pressed ? 249 : 445;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().resize_bets = (new TWEEN.Tween({fHeight: n.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: b}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            n.srcSprite.position.y = 617 - this.fHeight;
                            n.srcSprite.children[2].position.y = 396 + this.fHeight - 445;
                            n.srcSprite.mask.clear();
                            n.srcSprite.mask.beginFill(14922837);
                            n.srcSprite.mask.drawRoundedRect(1, n.srcSprite.position.y,
                                722, this.fHeight, 9);
                            n.srcSprite.mask.endFill;
                            n.srcSprite.hitArea.height = this.fHeight;
                            v.emit("updateHeight")
                        }).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().resize_bets = null
                        }).start();
                        c && (g.srcSprite.getChildByName("exp1").emit("mousedown"), c.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    c.hitArea = new PIXI.Rectangle(0, 0, 722, 53);
                    c.name = "exp2";
                    c = a.mainRenderer.createButton(c, 695, 29, "atlas%Jexpand");
                    c.anchor.set(.5, .5);
                    c.rotation =
                        Math.PI / 2;
                    c = null;
                    n.srcSprite.addChild(p);
                    a.mainRenderer.createButton(p, 14, 30, void 0, {
                        text: mainLocalizationTable.coupon.toUpperCase(),
                        align: "left",
                        style: h
                    });
                    a.mainRenderer.createButton(p, 14, 78, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "left",
                        style: u
                    });
                    a.mainRenderer.createButton(p, 445, 78, void 0, {
                        text: mainLocalizationTable.totalBet,
                        align: "center",
                        style: {font: u.font, fill: u.fill, align: "center"}
                    });
                    a.mainRenderer.createButton(p, 641, 78, void 0, {
                        text: mainLocalizationTable.win, align: "center", style: {
                            font: u.font,
                            fill: u.fill, align: "center"
                        }
                    });
                    a.mainRenderer.createButton(p, 533, 78, void 0, {
                        text: "X",
                        align: "center",
                        style: {font: u.font, fill: u.fill, align: "center"}
                    });
                    c = new PIXI.Graphics;
                    c.beginFill(16777215);
                    c.drawRect(505, 56, 2, 573);
                    c.alpha = .5;
                    c.name = "xSep";
                    c.endFill;
                    n.srcSprite.addChild(c);
                    c = null;
                    c = a.mainRenderer.createButton(n.srcSprite, 0, 0, void 0, void 0, function (c, d) {
                        a.mainSoundManager.playSound("buttonClick");
                        H.needShow = !H.needShow;
                        b.events.emit("GRID_STATS");
                        c.children[0].texture = a.mainRenderer.resourceLoader.resources[H.needShow ?
                            "eye_icon" : "eye_closed_icon"].texture;
                        d && (d.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    c.hitArea = new PIXI.Rectangle(385, 0, 120, 53);
                    c.name = "eye_icon";
                    c = a.mainRenderer.createButton(c, 445, 26, "eye_icon");
                    c.anchor.set(.5, .5);
                    c.scale.set(1.3, 1.3);
                    c = c = null
                }
            };
            this.drawBetsHeader = z;
            var X = function () {
                var b = 0 != m.children.length;
                if (!b) for (var c = 0; 5 > c; c++) {
                    var d = new a.mainRenderer.createButton(m, 0, 127 + 49 * c, c & 1 ? "atlas%Jtable-odd-line" : "atlas%Jtable-even-line");
                    d.anchor.y = .5
                }
                var q = a.mainGameManager.gameHistory();
                for (c = 0; c < q.length; c++) {
                    var h = q[c].balls.slice();
                    h.sort(a.mainGameManager.sortNumeric);
                    d = m.children[c];
                    if (b = 0 !== d.children.length) for (d.getChildByName("round" + c).children[0].text = q[c].tir, b = 0; b < h.length; b++) d.getChildByName("result" + b).children[0].text = h[b]; else {
                        a.mainRenderer.createButton(d, 60, 0, void 0, {
                            text: q[c].tir,
                            align: "center",
                            style: t
                        }).name = "round" + c;
                        var r = 115;
                        for (b = 0; b < h.length; b++) a.mainRenderer.createButton(d, r += 29, 0, void 0, {
                            text: h[b],
                            align: "center",
                            style: t
                        }).name = "result" + b
                    }
                }
            };
            this.detailEditionsFont =
                {font: "bold 50px Arial", fill: "#ffffff"};
            this.detailEditionsHeaderFont = {font: "34px Arial", fill: "#b1b1b1"};
            this.detailEditionsRowFont = {font: "34px Arial", fill: "#ffffff"};
            var J;
            this.drawDetailEditionHistory = function (h, k) {
                if (c[k].editionResult) {
                    var e = 0 != h.children.length;
                    h.editionInd = k;
                    var g = {x: 599, y: 524}, f = c[k].editionResult.slice();
                    f.sort(a.mainGameManager.sortNumeric);
                    e ? (r.removeBalls(), r.startDrawBalls(f, q, 0), h.children[0].children[0].text = "# " + c[k].round, f = h.getChildByName("totalBox"), f.getChildByName("tBet").children[0].text =
                        formatFLGNums(c[k].betsHistory.getTotalBet(), !1), f.getChildByName("tWin").children[0].text = formatFLGNums(c[k].betsHistory.setTotalWin(), !1), f = null) : (e = a.mainRenderer.createButton(h, 598 - g.x, 150 - g.y, void 0, {
                        text: "# " + c[k].round,
                        align: "center",
                        style: b.detailEditionsFont
                    }), r = new d(69 - g.x, 215 - g.y - 8, 53, h), r.startDrawBalls(f, q, 0), e = a.mainRenderer.createButton(h, 340 - g.x, 150 - g.y, "atlas%Jarrow"), a.mainRenderer.createButton(e, 0, 0, "atlas%Jarrow-selected", void 0, function (d, q) {
                        a.mainSoundManager.playSound("buttonClick");
                        h.editionInd = limit(h.editionInd - 1, 0, c.length - 2);
                        b.drawDetailEditionHistory(h, h.editionInd);
                        q.stopped = !0;
                        a.mainUIManager.clickAnimationFunc(d, "bet_arrow_History");
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }, void 0, void 0, function (a) {
                        da(a, "bet_arrow_History")
                    }, function (a) {
                        ca(a, "bet_arrow_History")
                    }).alpha = 0, e.anchor.set(.5, .5), e.scale.set(2, 2), e.children[0].anchor.set(.5, .5), e = a.mainRenderer.createButton(h, 858 - g.x, 148 - g.y, "atlas%Jarrow"), a.mainRenderer.createButton(e, 0, 0, "atlas%Jarrow-selected",
                        void 0, function (d, q) {
                            a.mainSoundManager.playSound("buttonClick");
                            h.editionInd = limit(h.editionInd + 1, 0, c.length - 2);
                            b.drawDetailEditionHistory(h, h.editionInd);
                            q.stopped = !0;
                            a.mainUIManager.clickAnimationFunc(d, "bet_arrow_History2");
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        }, void 0, void 0, function (a) {
                            da(a, "bet_arrow_History2")
                        }, function (a) {
                            ca(a, "bet_arrow_History2")
                        }).alpha = 0, e.anchor.set(.5, .5), e.scale.set(2, 2), e.children[0].anchor.set(.5, .5), e.rotation = Math.PI, e = a.mainRenderer.createButton(h,
                        742 - g.x, 342 - g.y - 48, void 0, {
                            text: mainLocalizationTable.bet,
                            align: "center",
                            style: b.detailEditionsHeaderFont
                        }), e.anchor.set(.5, .5), e = a.mainRenderer.createButton(h, 350 - g.x, 342 - g.y - 48, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "center",
                        style: b.detailEditionsHeaderFont
                    }), e.anchor.set(.5, .5), e = a.mainRenderer.createButton(h, 886 - g.x, 342 - g.y - 48, void 0, {
                        text: mainLocalizationTable.coef,
                        align: "center",
                        style: b.detailEditionsHeaderFont
                    }), e.anchor.set(.5, .5), e = a.mainRenderer.createButton(h, 1027 - g.x, 342 - g.y - 48,
                        void 0, {
                            text: mainLocalizationTable.win,
                            align: "center",
                            style: b.detailEditionsHeaderFont
                        }), e.anchor.set(.5, .5), f = a.mainRenderer.createButton(h, 68 - g.x, 908 - g.y, void 0), f.name = "totalBox", f.anchor.y = .5, a.mainRenderer.createButton(f, 56, 0, void 0, {
                        text: mainLocalizationTable.total.toUpperCase(),
                        align: "center",
                        style: b.detailEditionsHeaderFont
                    }), a.mainRenderer.createButton(f, 368, 0, void 0, {
                        text: mainLocalizationTable.bet + ":",
                        align: "center",
                        style: b.detailEditionsHeaderFont
                    }), e = a.mainRenderer.createButton(f, 540,
                        0, "atlas%Jhistory-row"), e.anchor.set(.5, .5), e.scale.x = .17, a.mainRenderer.createButton(f, 540, 0, void 0, {
                        text: formatFLGNums(c[k].betsHistory.getTotalBet(), !1),
                        align: "center",
                        style: b.detailEditionsRowFont
                    }).name = "tBet", a.mainRenderer.createButton(f, 768, 0, void 0, {
                        text: mainLocalizationTable.win + ":",
                        align: "center",
                        style: b.detailEditionsHeaderFont
                    }), e = a.mainRenderer.createButton(f, 960, 0, "atlas%Jhistory-row"), e.anchor.set(.5, .5), e.scale.x = .17, a.mainRenderer.createButton(f, 960, 0, void 0, {
                        text: formatFLGNums(c[k].betsHistory.setTotalWin(),
                            !1), align: "center", style: b.detailEditionsRowFont
                    }).name = "tWin", e = f = null, J = new MaskedSprite(a.mainRenderer.createButton(h, 0, 0), {
                        mask: {
                            x: 60 - g.x,
                            y: 364 - g.y - 38,
                            width: 1070,
                            height: 540
                        }, needScrolling: {}
                    }, a.mainRenderer.renderManager), J.srcSprite.interactive = !0, J.srcSprite.hitArea = new PIXI.Rectangle(70 - g.x, 362 - g.y - 38, 1061, 546));
                    f = [];
                    var m;
                    f = J.containerForScroll;
                    var D, l;
                    for (e = 0; f.getChildByName("row_" + e); e++) if (m = f.getChildByName("row_" + e)) {
                        m.visible = !1;
                        for (l = 0; m.getChildByName("rect" + e + "_" + l); l++) {
                            var n = m.getChildByName("rect" +
                                e + "_" + l);
                            n.visible = !1;
                            n.getChildByName("textBet" + e + "_" + l).visible = !1
                        }
                        if (D = m.getChildByName("summ" + e)) D.visible = !1, m.getChildByName("win" + e).visible = !1, m.getChildByName("coef" + e).visible = !1
                    }
                    h.children[2].visible = 0 !== h.editionInd;
                    h.children[3].visible = h.editionInd !== c.length - 2;
                    h.children[4].visible = 0 < c[k].betsHistory.bets.length;
                    h.children[5].visible = 0 < c[k].betsHistory.bets.length;
                    h.children[6].visible = 0 < c[k].betsHistory.bets.length;
                    h.children[7].visible = 0 < c[k].betsHistory.bets.length;
                    if (0 >= c[k].betsHistory.bets.length) f.emit("updateHeight");
                    else {
                        var p = [];
                        e = 0;
                        for (var z = c[k].betsHistory.bets.length - 1; e < c[k].betsHistory.bets.length; e++, z--) {
                            (m = f.getChildByName("row_" + e)) ? m.visible = !0 : (m = new a.mainRenderer.createButton(f, 68 - g.x, 353 + 61 * e - g.y, "atlas%Jhistory-row"), m.anchor.y = .5, m.name = "row_" + e);
                            for (l = 0; l < c[k].betsHistory.bets[z].bet.length; l++) p = c[k].betsHistory.bets[z].bet.slice(), p.sort(a.mainGameManager.sortNumeric), D = -1 < c[k].betsHistory.bets[z].winBets.indexOf(p[l]) ? "zone_pressed" : "zone_transp", (n = m.getChildByName("rect" + e + "_" + l)) ? (n.texture =
                                a.mainRenderer.resourceLoader.resources[D].texture, n.visible = !0, n = n.getChildByName("textBet" + e + "_" + l), n.children[0].text = p[l], n.visible = !0) : (n = a.mainRenderer.createButton(m, 32 + 56 * l, 0, D), n.scale.set(.465, .465), n.anchor.set(.5, .5), n.name = "rect" + e + "_" + l, n = a.mainRenderer.createButton(n, 0, 0, void 0, {
                                text: p[l],
                                align: "center",
                                style: {
                                    font: "bold 80px Arial Narrow",
                                    fill: "#e0e0e0",
                                    stroke: "#000000",
                                    strokeThickness: 4,
                                    align: "center"
                                }
                            }), n.anchor.set(.5, .5), n.name = "textBet" + e + "_" + l);
                            l = void 0 != c[k].betsHistory.bets[z].win ?
                                formatFLGNums(c[k].betsHistory.bets[z].win, !1) : "";
                            n = c[k].betsHistory.bets[z].summ;
                            p = a.mainGameManager.coefficients[c[k].betsHistory.bets[z].countWin][c[k].betsHistory.bets[z].bet.length - 1];
                            D = formatFLGNums(n * p, !1);
                            0 != l && l != D && (l = D, c[k].betsHistory.bets[z].win = n * p, a.mainRenderer.logService.setStats("\u0420\u0430\u0437\u0441\u0438\u043d\u0445\u0440\u043e\u043d \u043f\u043e \u0438\u0441\u0442\u043e\u0440\u0438\u0438 \u0441\u0442\u0430\u0432\u043e\u043a, \u0437\u0430\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e",
                                a.kenoConfig.gameKind.caption));
                            (D = m.getChildByName("summ" + e)) ? (D.children[0].text = formatFLGNums(n, !1), D.visible = !0, n = m.getChildByName("coef" + e), n.children[0].text = "X " + p, n.visible = !0, m = m.getChildByName("win" + e), m.children[0].text = l, m.visible = !0) : (a.mainRenderer.createButton(m, 676, 0, void 0, {
                                text: formatFLGNums(n, !1),
                                align: "center",
                                style: b.detailEditionsRowFont
                            }).name = "summ" + e, a.mainRenderer.createButton(m, 821, 0, void 0, {
                                text: "X " + p,
                                align: "center",
                                style: b.detailEditionsRowFont
                            }).name = "coef" + e, a.mainRenderer.createButton(m,
                                960, 0, void 0, {
                                    text: l,
                                    align: "center",
                                    style: b.detailEditionsRowFont
                                }).name = "win" + e)
                        }
                        p = [];
                        f.emit("updateHeight");
                        l = n = n = n = m = D = m = f = g = null
                    }
                }
            };
            this.cancelLastEdition = function (a) {
                c.length && (c[c.length - 1].editionResult = a, c[c.length - 1].betsHistory.calculateWin(a), K(c.length - 1))
            };
            this.addEdition = function (a) {
                6 <= c.length && (c[0].betsHistory.destroy && c[0].betsHistory.destroy(), c[0].betsHistory = null, c.shift());
                c.length && !c[c.length - 1].betsHistory.bets.length ? (c[c.length - 1].round = a, c[c.length - 1].editionResult = void 0) :
                    c.length && c[c.length - 1].round === a || (c.push({
                        round: a,
                        editionResult: void 0,
                        betsHistory: new e([])
                    }), c[c.length - 1].betsHistory.parentEditions(b));
                K(c.length - 1)
            };
            this.saveToStorage = function () {
                var b, d;
                return $jscomp.asyncExecutePromiseGeneratorProgram(function (h) {
                    localStorage.setItem("curUser", JSON.stringify({
                        hall: clientInfoGlobal.hall,
                        nick: clientInfoGlobal.lgn
                    }));
                    b = [];
                    for (d = 0; d < c.length; d++) b.push({
                        round: c[d].round,
                        editionResult: c[d].editionResult,
                        bets: c[d].betsHistory.bets
                    });
                    localStorage.setItem(a.kenoConfig.gameKind +
                        a.kenoConfig.gameType + a.kenoConfig.gameVariant + "editions", JSON.stringify(b));
                    h.jumpToEnd()
                })
            };
            this.loadFromStorage = function () {
                function d(c) {
                    $.ajax({
                        type: "get",
                        url: getUrl(),
                        data: {
                            gethistory: parseInt(a.kenoConfig.serverName.slice(3, a.kenoConfig.serverName.length)),
                            round: c.round
                        },
                        dataType: "json",
                        async: !1,
                        success: function (a, d, h) {
                            if (b && a && a.tirid0) {
                                d = [];
                                h = a.tirid0;
                                for (a = 0; 20 > a; a++) {
                                    if (99 === h["b" + a]) return;
                                    d.push(h["b" + a])
                                }
                                c.editionResult = d;
                                c.betsHistory.calculateWin(c.editionResult, !0)
                            }
                        }
                    })
                }

                if (localStorage.getItem("curUser")) {
                    var h =
                        JSON.parse(localStorage.getItem("curUser"));
                    if (h.hall !== clientInfoGlobal.hall && h.nick !== clientInfoGlobal.lgn) return
                }
                h = a.kenoConfig.gameKind + a.kenoConfig.gameType + a.kenoConfig.gameVariant + "editions";
                if (localStorage.getItem(h)) {
                    var q = JSON.parse(localStorage.getItem(h));
                    for (h = 0; h < q.length; h++) c.push({
                        round: q[h].round,
                        editionResult: q[h].editionResult,
                        betsHistory: new e(q[h].bets)
                    }), (!c[h].editionResult || 20 > c[h].editionResult.length) && d(c[h])
                }
            };
            b.loadFromStorage();
            K(c.length - 1);
            this.events = new PIXI.utils.EventEmitter;
            b.events.on("EDITIONS_CHANGE", function () {
                b.saveToStorage()
            });
            b.events.on("RESULT_TIME", X);
            b.events.on("BET_TIME", X)
        }, f = {};
    this.animations = function () {
        return f
    };
    this.clickAnimationFunc = function (b, c) {
        b && (f[c] && (f[c].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), f[c] = (new TWEEN.Tween(b)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            f[c] = null;
            a.mainRenderer.renderManager.animationTweenInc();
            f[c] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                f[c] = null
            }).start()
        }).start())
    };
    var da = function (b, c, d) {
        if (b) switch (f[c] && (f[c].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), d) {
            case "grow":
                f[c] = (new TWEEN.Tween(b.scale)).to({
                    x: 1.2,
                    y: 1.2
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    f[c] = null
                }).start();
                break;
            default:
                f[c] = (new TWEEN.Tween(b)).to({alpha: .6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    f[c] = null
                }).start()
        }
    }, ca = function (b, c, d) {
        f[c] && (f[c].stop(), a.mainRenderer.renderManager.animationTweenDec());
        if (b && 0 != b.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(), d) {
            case "grow":
                f[c] = (new TWEEN.Tween(b.scale)).to({
                    x: 1,
                    y: 1
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    f[c] = null
                }).start();
                break;
            default:
                f[c] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    f[c] = null
                }).start()
        }
    }, ja = function (b, c, d) {
        if (b.container) {
            f[d] && f[d].stop();
            if (b.onStartClose) b.onStartClose();
            a.mainRenderer.renderManager.animationTweenInc();
            f[d] = (new TWEEN.Tween(b.container.scale)).to({y: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                if (b.onStopClose) b.onStopClose();
                if (c.onStopOpen) c.onStopOpen();
                a.mainRenderer.renderManager.animationTweenDec();
                f[d] = null;
                b.container.scale.y = 0;
                c.container.scale.y = 1
            }).onComplete(function () {
                if (b.onStopClose) b.onStopClose();
                a.mainRenderer.renderManager.animationTweenDec();
                f[d] = null;
                if (c.onStartOpen) c.onStartOpen();
                a.mainRenderer.renderManager.animationTweenInc();
                f[d] = (new TWEEN.Tween(c.container.scale)).to({y: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                    if (b.onStopClose) b.onStopClose();
                    if (c.onStopOpen) c.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    f[d] = null;
                    b.container.scale.y =
                        0;
                    c.container.scale.y = 1
                }).onComplete(function () {
                    if (c.onStopOpen) c.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    f[d] = null
                }).start()
            }).start()
        }
    }, ba = function (b, c, d) {
        b && (d ? (f[c].stop(), f[c + "chain"] && (TWEEN.remove(f[c + "chain"]), a.mainRenderer.renderManager.animationTweenDec(), f[c + "chain"] = null)) : (a.mainRenderer.renderManager.animationTweenInc(), f[c] = (new TWEEN.Tween(b)).to({rotation: Math.PI / 24}, 330).easing(TWEEN.Easing.Linear.None).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            f[c] = null;
            b.rotation = 0
        }), a.mainRenderer.renderManager.animationTweenInc(), f[c + "chain"] = (new TWEEN.Tween(b)).to({rotation: -Math.PI / 24}, 330).easing(TWEEN.Easing.Linear.None).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            f[c + "chain"] = null;
            b.rotation = 0
        }), f[c].chain(f[c + "chain"]), f[c + "chain"].chain(f[c]), f[c].start()))
    }, P = function (b, c, d) {
        b && (f[c] ? f[c].stop() : (a.mainRenderer.renderManager.animationTweenInc(), f[c] = (new TWEEN.Tween(b.position)).to({x: d}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            f[c] = null
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            f[c] = null
        }).start()))
    };
    this.simpleFlipXFunc = function (b, c, d, e, k, g) {
        f[c] && f[c].stop();
        var m = b.scale.x;
        a.mainRenderer.renderManager.animationTweenInc();
        f[c] = (new TWEEN.Tween(b.scale)).to({x: 0}, d).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            f[c] = null;
            b.scale.x = m
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            f[c] = null;
            k && k(b);
            a.mainRenderer.renderManager.animationTweenInc();
            f[c] = (new TWEEN.Tween(b.scale)).to({x: m}, e).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                f[c] = null;
                b.scale.x = m;
                g && g(b)
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                f[c] = null;
                g && g(b)
            }).start()
        }).start()
    };
    var T, U, M = !1,
        L = [["gmName", a.gameDir + "JX/logo-min.png"], [a.kenoConfig.BG, a.gameDir + "JX/mobile/" + a.kenoConfig.BG + ".jpg"], ["JP", a.gameDir + "WinJP/Jackpot-" + a.kenoConfig.gameType + "-min.png"], ["WIN", a.gameDir + "WinJP/Win-" + a.kenoConfig.gameType + "-min.png"],
            ["table_coef", a.gameDir + "table_coefficients_" + a.kenoConfig.gameType.toLowerCase() + ".png"], ["btn_menu_small", a.gameDir + "NG/mobile/btn-menu-small5.png"], ["btn_menu_small_pressed", a.gameDir + "NG/mobile/btn-menu-small-pressed5.png"], ["btn_balance_small", a.gameDir + "NG/mobile/btn-balance-small3.png"], ["btn_balance_small_pressed", a.gameDir + "NG/mobile/btn-balance-small-pressed3.png"], ["autoplay_bg", a.gameDir + "NG/mobile/autoplay-bg2.png"], ["tab_bg", a.gameDir + "NG/mobile/video-bg.png"], ["menu_bg", a.gameDir + "NG/mobile/menu-bg2.png"],
            ["zone_transp", a.gameDir + "NG/mobile/zone.png"], ["zone_selected", a.gameDir + "JX/mobile/zone-selected-min.png"], ["zone_pressed", a.gameDir + "NG/mobile/zone-action.png"], ["zone_win", a.gameDir + "NG/mobile/zone-win.png"], ["zone_lock", a.gameDir + "NG/mobile/zone-lock.png"], ["zone_lock2", a.gameDir + "NG/mobile/zone-lock2.png"], ["table_bg", a.gameDir + "NG/mobile/table-bg.png"], ["hotcold_bg", a.gameDir + "NG/hotcold-bg.png"], ["eye_icon", a.gameDir + "NG/eye-icon-min.png"], ["eye_closed_icon", a.gameDir + "NG/eye-closed-icon-min.png"],
            ["atlas", a.gameDir + "NG/mobile/sprite/kenoM-min.json"]];
    L = L.concat(a.mainFLGAccount.resources);
    L = L.concat(F.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, "images/logo.json", L, function (b, c, e) {
        a.mainRenderer.createButton(void 0, 0, 0, a.kenoConfig.BG);
        a.mainRenderer.createButton(void 0, 1, 75, "atlas%Jballs-bg");
        b = new PIXI.Graphics;
        b.beginFill();
        b.drawRect(1, 75, 1491, 80);
        b.endFill;
        a.mainRenderer.stage.getChildByName("balls-bg").mask = b;
        b = null;
        a.mainRenderer.createButton(void 0, 0, 0, "gmName");
        p =
            new PIXI.Graphics;
        p.position.x = 269;
        p.position.y = 21;
        p.beginFill(0);
        p.drawRoundedRect(0, 0, 392, 40, 11);
        p.endFill;
        b = a.mainRenderer.createButton(p, 275, 20, void 0, {
            text: "00:00",
            align: "left",
            style: {font: "bold 40px Arial", fill: "#e8a023"}
        });
        b.anchor.set(.5, .5);
        b = a.mainRenderer.createButton(p, 15, 20, void 0, {
            text: "#",
            align: "left",
            style: {font: "24px Arial", fill: "#e8a023"}
        });
        b.anchor.set(.5, .5);
        p.addChild(new PIXI.Graphics);
        p.children[2].beginFill(42577);
        p.children[2].drawRoundedRect(3, 3, 386, 34, 9);
        p.children[2].endFill;
        b = a.mainRenderer.createButton(p.children[2], 275, 20, void 0, {
            text: "00:00",
            align: "left",
            style: {font: "bold 40px Arial", fill: "#000000"}
        });
        b.anchor.set(.5, .5);
        b = a.mainRenderer.createButton(p.children[2], 15, 20, void 0, {
            text: "#",
            align: "left",
            style: {font: "24px Arial", fill: "#000000"}
        });
        b.anchor.set(.5, .5);
        b = new PIXI.Graphics;
        b.beginFill();
        b.drawRoundedRect(3, 3, 386, 34, 9);
        b.endFill;
        p.children[2].mask = b;
        p.children[2].parent.addChild(b);
        b = null;
        a.mainRenderer.stage.addChild(p);
        a.mainRenderer.createButton(void 0,
            1020, 41, void 0, {
                text: mainLocalizationTable.totalBet.toUpperCase() + ":",
                align: "right",
                style: {font: "bold 26px Arial", fill: "#c7c7c7"}
            });
        a.mainRenderer.createButton(void 0, 1040, 41, void 0, {
            text: formatFLGNums(a.mainFLGAccount.totalBet()),
            align: "left",
            style: {font: "bold 44px Arial", fill: "#e8a023"}
        }).name = "betTxt";
        T = function (b) {
            a.mainRenderer.stage.getChildByName("betTxt").children[0].text = formatFLGNums(b);
            a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("betTxt").children[0])
        };
        a.mainFLGAccount.events.on("onBet",
            T);
        b = a.mainRenderer.createButton(x, 1174, 837, "btn_menu_small");
        c = a.mainRenderer.createButton(b, 0, 0, "btn_menu_small_pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            k.clickAnimationFunc(b, "btn_menu");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, c) {
            P(C.getChildByName("menu_bg"), "menuContainer", 1174);
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        c.alpha = 0;
        c = null;
        a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
            text: mainLocalizationTable.menu.toUpperCase(),
            align: "center", style: {font: "bold 36px Arial Narrow", fill: "#323232"}
        });
        b = a.mainRenderer.createButton(x, 1395, 951, "atlas%Jbtn-autoplay");
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jbtn-autoplay-pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            k.clickAnimationFunc(b, "btn-autoplay");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, c) {
            P(g.getChildByName("autoplay_bg"), "autoplayContainer", 1174);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha =
            0;
        a.mainRenderer.createButton(b, b.width / 2.5, b.height / 2, void 0, {
            text: mainLocalizationTable.autoPlay.toUpperCase(),
            align: "center",
            style: {font: "bold 36px Arial Narrow", fill: "#323232"}
        });
        a.mainRenderer.createButton(b, .83 * b.width, b.height / 2, void 0, {
            text: "",
            align: "center",
            style: {font: "bold 60px Arial Narrow", fill: "#323232"}
        }).name = "autoplay_remain_num";
        b = a.mainRenderer.createButton(x, 1395, 837, "atlas%Jbtn-random");
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jbtn-random-pressed", void 0, function (b, c) {
            a.mainGrid.removeCurrentBets();
            a.mainGrid.createRandomBets();
            var d = x.getChildByName("btn-plus3").children[0];
            d && d.interactive && (d.emit("mousedown"), d.emit("mouseup"));
            S();
            c.stopped = !0;
            k.clickAnimationFunc(b, "btn-random");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
            text: mainLocalizationTable.random.toUpperCase(),
            align: "center",
            style: {font: "bold 36px Arial Narrow", fill: "#323232"}
        });
        b = a.mainRenderer.createButton(x, 1581, 837, "atlas%Jbtn-random-num", {
            text: "1",
            align: "center", style: {font: "bold 60px Arial Narrow", fill: "#323232"}
        });
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jbtn-random-num-pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            b.parent.children[0].text = b.parent.children[2].children[0].text = a.mainGrid.incrementRandomCount(parseInt(b.parent.children[0].text));
            c.stopped = !0;
            k.clickAnimationFunc(b, "btn-random-num");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0,
            {text: "1", align: "center", style: {font: "bold 60px Arial Narrow", fill: "#323232"}});
        b = a.mainRenderer.createButton(x, 1684, 837, "atlas%Jbtn-plus3");
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jbtn-plus-pressed3", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            if (0 < a.mainGrid.pressedZones.length) {
                b.interactive = !1;
                x.getChildByName("btn-random").children[0].interactive = !1;
                var d = a.mainGrid.getIntArrayOfPressedZones(), e = function () {
                    m.getActedOutEdition().betsHistory.addBet({
                        summ: y.currentBet(), bet: d,
                        winBets: [], countWin: 0, win: void 0
                    }, m.getActedOutEdition().round, function (c) {
                        if (c) {
                            a.mainFLGAccount.maxWin(0);
                            for (var h in d) switch (c = a.mainGrid.zones[d[h] - 1], c.emit("mousedown"), c.emit("mouseup"), c.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, c.isLock ? c.isLock++ : c.isLock = 1, c.isLock) {
                                case 1:
                                    c.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                    break;
                                default:
                                    c.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                            }
                        }
                        b.interactive = !0;
                        x.getChildByName("btn-random").children[0].interactive =
                            !0;
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    })
                };
                y.isMaxBet() ? showAgreeDlg(e, function () {
                    b.interactive = !0;
                    x.getChildByName("btn-random").children[0].interactive = !0;
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }) : e()
            }
            c && (c.stopped = !0);
            k.clickAnimationFunc(b, "btn-plus3");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(g, 1920, 367, "autoplay_bg");
        g.interactive = !0;
        a.mainRenderer.createButton(g.getChildByName("autoplay_bg"), 373, 68, void 0, {
            text: mainLocalizationTable.autoPlay.toUpperCase(),
            align: "center", style: {font: "bold 90px Arial Narrow", fill: "#ffffff"}
        });
        a.mainRenderer.createButton(g.getChildByName("autoplay_bg"), 370, 180, void 0, {
            text: "Number of rounds",
            align: "center",
            style: {font: "40px Arial Narrow", fill: "#ffffff"}
        }).name = "autoplayDesc1";
        a.mainRenderer.createButton(g.getChildByName("autoplay_bg"), 370, 473, void 0, {
            text: mainLocalizationTable.autoplayStart,
            align: "center",
            style: {font: "40px Arial Narrow", fill: "#ffffff"}
        }).name = "autoplayDesc2";
        a.mainRenderer.createButton(g.getChildByName("autoplay_bg"),
            662, 38, "atlas%Jautoplay-close", void 0, function (b, c) {
                a.mainSoundManager.playSound("buttonClick");
                c.stopped = !0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (b, c) {
                P(g.getChildByName("autoplay_bg"), "autoplayContainer", 1920);
                a.mainRenderer.renderManager.needUpdateRender = !0
            });
        for (c = 0; 3 > c; c++) b = a.mainRenderer.createButton(g.getChildByName("autoplay_bg"), 23 + 221 * c + 18 * c, 233, "atlas%Jautoplay-num"), b.name += 0 >= 5 * c ? 1 : 5 * c, a.mainRenderer.createButton(b, 0, 0, "atlas%Jautoplay-num-pressed", void 0,
            function (b, c) {
                a.mainSoundManager.playSound("chipSelector");
                c.stopped = !0;
                k.clickAnimationFunc(b, "autoplay-num" + b.parent.position.x);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (b, c) {
                a.mainFLGAccount.autoplayManager.settings.isStarted(!0);
                a.mainFLGAccount.autoplayManager.settings.count(parseInt(b.parent.children[1].children[0].text));
                a.mainFLGAccount.autoplayManager.updateCallback("getOnlyBets");
                a.mainFLGAccount.autoplayManager.settings.isStarted() && (x.getChildByName("btn-autoplay").getChildByName("autoplay_remain_num").children[0].text =
                    b.parent.children[1].children[0].text, g.getChildByName("autoplay_bg").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRemainingNumber + ": " + b.parent.children[1].children[0].text, g.getChildByName("autoplay_bg").getChildByName("autoplayDesc2").visible = !1, g.getChildByName("autoplay_bg").getChildByName("autoplay-num1").visible = !1, g.getChildByName("autoplay_bg").getChildByName("autoplay-num5").visible = !1, g.getChildByName("autoplay_bg").getChildByName("autoplay-num10").visible =
                    !1, g.getChildByName("autoplay_bg").getChildByName("autoplaySelected").children[0].text = b.parent.children[1].children[0].text, g.getChildByName("autoplay_bg").getChildByName("autoplaySelected").visible = !0, g.getChildByName("autoplay_bg").getChildByName("autoplay-stop").visible = !0, g.getChildByName("autoplay_bg").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"], g.getChildByName("autoplay_bg").getChildByName("repeat").children[0].interactive =
                    !1);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }).alpha = 0, a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
            text: 0 >= 5 * c ? 1 : 5 * c,
            align: "center",
            style: {font: "bold 120px Arial Narrow", fill: "#363636"}
        });
        b = a.mainRenderer.createButton(g.getChildByName("autoplay_bg"), 23, 539, "atlas%Jmenu-btn-grand2");
        b.name = "repeat";
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jautoplay-repeat-pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            k.clickAnimationFunc(b, "repeat");
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        }, void 0, function (b, c) {
            b.parent.texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"];
            b.interactive = !1;
            a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet")
        }).alpha = 0;
        a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
            text: mainLocalizationTable.autoplayRepeatLastBet,
            align: "center",
            style: {font: "bold 50px Arial Narrow", fill: "#363636"}
        });
        a.mainRenderer.createButton(g.getChildByName("autoplay_bg"), 23, 233, "atlas%Jautoplay-num-pressed", {
            text: "", align: "center",
            style: {font: "bold 120px Arial Narrow", fill: "#363636"}
        }).name = "autoplaySelected";
        g.getChildByName("autoplay_bg").getChildByName("autoplaySelected").visible = !1;
        b = a.mainRenderer.createButton(g.getChildByName("autoplay_bg"), 262, 264, "atlas%Jautoplay-stop");
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jautoplay-stop-pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            k.clickAnimationFunc(b, "autoplay-stop");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b,
                             c) {
            a.mainFLGAccount.autoplayManager.stop();
            a.mainFLGAccount.autoplayManager.settings.isStarted() || (x.getChildByName("btn-autoplay").getChildByName("autoplay_remain_num").children[0].text = "", g.getChildByName("autoplay_bg").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRoundNumber, g.getChildByName("autoplay_bg").getChildByName("autoplayDesc2").visible = !0, g.getChildByName("autoplay_bg").getChildByName("autoplay-num1").visible = !0, g.getChildByName("autoplay_bg").getChildByName("autoplay-num5").visible =
                !0, g.getChildByName("autoplay_bg").getChildByName("autoplay-num10").visible = !0, g.getChildByName("autoplay_bg").getChildByName("autoplaySelected").visible = !1, g.getChildByName("autoplay_bg").getChildByName("autoplay-stop").visible = !1, a.mainFLGAccount.autoplayManager.settings.repeatRoundNum() !== m.editions[m.editions.length - 1].round && m.editions[m.editions.length - 2].betsHistory.bets.length && (g.getChildByName("autoplay_bg").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand2"],
                g.getChildByName("autoplay_bg").getChildByName("repeat").children[0].interactive = !0));
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, b.width / 2, b.height / 2, void 0, {
            text: mainLocalizationTable.autoplayStop,
            align: "center",
            style: {font: "bold 50px Arial Narrow", fill: "#363636"}
        });
        g.getChildByName("autoplay_bg").getChildByName("autoplay-stop").visible = !1;
        a.mainRenderer.createButton(C, 1920, 195, "menu_bg");
        C.interactive = !0;
        b = a.mainRenderer.createButton(x, 1174, 951, "btn_balance_small");
        b.name = "bet_on_autoplay";
        a.mainRenderer.createButton(b, 0, 0, "btn_balance_small_pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("chipSelector");
            y.incrementBet();
            var d = x.getChildByName("bet_on_autoplay").getChildByName("betText").children[0];
            y.isMaxBet() ? d.text = "MAX\n" + E : d.text = y.currentBet();
            a.mainUIManager.setTextScale(d);
            S();
            c.stopped = !0;
            k.clickAnimationFunc(b, "btn_balance_small");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, b.width / 2, b.height /
            2, void 0, {
            text: mainLocalizationTable.bet.toUpperCase(),
            align: "center",
            style: {font: "bold 28px Arial Narrow", fill: "#323232"}
        });
        b.children[1].children[0].anchor.set(.5, -.5);
        b = a.mainRenderer.createButton(x.getChildByName("bet_on_autoplay"), 106, 39, void 0, {
            text: y.currentBet(),
            align: "center",
            style: {font: "bold 48px Arial", fill: "#e8a023", align: "center"}
        });
        b.name = "betText";
        b.anchor.set(.5, .5);
        a.mainUIManager.setTextScale(x.getChildByName("bet_on_autoplay").getChildByName("betText").children[0]);
        b = a.mainRenderer.createButton(C.getChildByName("menu_bg"),
            22, 163, "atlas%Jmenu-btn-middle");
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jmenu-btn-middle-pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            k.clickAnimationFunc(b, "btn_home");
            a.mainFLGAccount.closeGame();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, 171, 62, "atlas%Jhome-sign");
        b.getChildByName("home-sign").anchor.set(.5, .5);
        APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && b && (b.visible = clientInfoGlobal.backurl &&
            "" != clientInfoGlobal.backurl);
        b = a.mainRenderer.createButton(C.getChildByName("menu_bg"), 379, 163, "atlas%Jmenu-btn-middle", void 0);
        a.mainRenderer.createButton(b, 0, 0, "atlas%Jmenu-btn-middle-pressed", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            k.clickAnimationFunc(b, "btn_volume");
            a.mainSoundManager.muteSound(!a.mainSoundManager.isMuted());
            b.parent.getChildByName("volume-sign").texture = a.mainRenderer.resourceLoader.resources.atlas.textures[a.mainSoundManager.isMuted() ?
                "mute-sign" : "volume-sign"];
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(b, 171, 62, "atlas%Jvolume-sign");
        b.getChildByName("volume-sign").anchor.set(.5, .5);
        b = a.mainRenderer.createButton(C.getChildByName("menu_bg"), 22, 715, "atlas%Jmenu-btn-grand2", {
            text: mainLocalizationTable.close.toUpperCase(),
            align: "center",
            style: {font: "bold 66px Arial Narrow", fill: "#323232"}
        }, function (b, c) {
            b.texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"];
            b.children[0].style = {font: "bold 66px Arial Narrow", fill: "#ffffff"};
            c.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, c) {
            b.texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand2"];
            b.children[0].style = {font: "bold 66px Arial Narrow", fill: "#323232"};
            P(C.getChildByName("menu_bg"), "menuContainer", 1920);
            u.game.button.emit("mousedown");
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        for (var f in u) {
            switch (f) {
                case "game":
                    b = a.mainRenderer.createButton(I,
                        587, 628, void 0);
                    break;
                case "history":
                    b = a.mainRenderer.createButton(I, 586, 625, "tab_bg");
                    break;
                case "stats":
                    b = a.mainRenderer.createButton(I, 586, 625, "tab_bg");
                    break;
                case "video":
                    b = a.mainRenderer.createButton(I, 586, 625, void 0);
                    break;
                case "info":
                    b = a.mainRenderer.createButton(I, 586, 625, "tab_bg"), a.mainRenderer.createButton(b, 550, 396, void 0, {
                        text: "v1.0",
                        align: "right",
                        style: {font: "bold 40px Arial Narrow", fill: "#ffffff"}
                    }).alpha = .25
            }
            b.name = f;
            b.anchor.set(.5, .5);
            b.scale.y = 0;
            u[f].container = b;
            b = a.mainRenderer.createButton(C.getChildByName("menu_bg"),
                u[f].posX, u[f].posY, "game" == f ? "atlas%Jmenu-btn-grand2" : "atlas%Jmenu-btn-middle", {
                    text: u[f].text,
                    align: "center",
                    style: {font: "bold 66px Arial Narrow", fill: "#323232"}
                }, function (b, c) {
                    if (!b.pressed) {
                        b.texture = a.mainRenderer.resourceLoader.resources.atlas.textures["game" == b.name ? "menu-btn-grand-pressed2" : "menu-btn-middle-pressed"];
                        b.children[0].style = {font: "bold 66px Arial Narrow", fill: "#ffffff"};
                        a.mainSoundManager.playSound("buttonClick");
                        for (var d in u) u[d].button.pressed && (u[d].button.pressed = !1, u[d].button.texture =
                            a.mainRenderer.resourceLoader.resources.atlas.textures["game" == d ? "menu-btn-grand2" : "menu-btn-middle"], u[d].button.children[0].style = {
                            font: "bold 66px Arial Narrow",
                            fill: "#323232"
                        }, ja(u[d], u[b.name], "flipContainer"));
                        b.pressed = !0;
                        c && (c.stopped = !0);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }
                });
            b.name = f;
            u[f].button = b;
            u[f].pressedDefault && (u[f].button.pressed = !0, u[f].button.texture = a.mainRenderer.resourceLoader.resources.atlas.textures["game" == f ? "menu-btn-grand-pressed2" : "menu-btn-middle-pressed"],
                u[f].button.children[0].style = {
                    font: "bold 66px Arial Narrow",
                    fill: "#ffffff"
                }, u[f].container.scale.y = 1)
        }
        u.video.button.interactive = !1;
        u.video.button.children[0].text = "";
        b = {x: 599, y: 524};
        b = a.mainRenderer.createButton(u.info.container, 598 - b.x, 214 - b.y + 10, void 0, {
            text: mainLocalizationTable.coefHeader.toUpperCase(),
            align: "center",
            style: {font: "bold 34px Arial", fill: "#ffffff", align: "center"}
        });
        b.anchor.set(.5, .5);
        b = a.mainRenderer.createButton(u.info.container, -518, -263, "table_coef");
        b.scale.set(1, 1);
        var l =
            {font: "bold 30px Arial", fill: "#313131"};
        c = new PIXI.Text(mainLocalizationTable.selectedBalls.toUpperCase(), l);
        c.position.set(571, 23);
        c.anchor.set(.5, .5);
        b.addChild(c);
        f = 3;
        var t = 108, w = 70;
        for (c = 1; 11 > c; c++) {
            var n = 9 < c ? 134 : 7 < c ? 105 : 7 == c ? 106 : 3 < c ? 90 : 60;
            t += n;
            var B = new PIXI.Text(c, l);
            B.position.set(t - Math.round(n / 2), w);
            B.anchor.set(.5, .5);
            b.addChild(B);
            t += f
        }
        c = new PIXI.Text(mainLocalizationTable.guessedBalls.toUpperCase(), l);
        c.position.set(22, 335);
        c.anchor.set(.5, .5);
        c.rotation = -Math.PI / 2;
        b.addChild(c);
        t = 76;
        w = 115;
        n = 41;
        for (c = 0; 11 > c; c++) B = new PIXI.Text(c, l), B.position.set(t, w), B.anchor.set(.5, .5), b.addChild(B), w += n + f;
        l = {font: "bold 30px Arial", fill: "#dbdbdb"};
        var v;
        t = 109;
        w = 94;
        f = 4;
        for (c = 0; c < a.mainGameManager.coefficients.length; c++) {
            w += 40;
            for (v = 0; v < a.mainGameManager.coefficients[c].length; v++) n = 8 < v ? 133 : 6 == v ? 103 : 5 < v ? 105 : 2 < v ? 89 : 0 == v ? 58 : 59, t += n, 0 != a.mainGameManager.coefficients[c][v] && (B = new PIXI.Text(a.mainGameManager.coefficients[c][v], l), B.position.set(t - Math.round(n / 2), w - 20), B.anchor.set(.5, .5), b.addChild(B)),
                t += f;
            t = 110;
            w += f
        }
        b = B = c = l = l = null;
        G = new d(5, 3, 73, a.mainRenderer.stage.getChildByName("balls-bg"), !0);
        b = a.mainRenderer.createButton(void 0, 1553, 20, "atlas%Jbtn-balance2", {
            text: "DEMO" == clientInfoGlobal.hall ? "DEMO" : formatFLGNums(a.mainFLGAccount.balance()),
            align: "center",
            style: {font: "bold 65px Arial", fill: "#e8a023"}
        });
        b.name = "balanceTxt";
        b.children[0].anchor.y = .77;
        a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("balanceTxt").children[0]);
        a.mainRenderer.createButton(b, b.width / 2, .8 *
            b.height, void 0, {
            text: mainLocalizationTable.balance.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial Narrow", fill: "#323232"}
        });
        U = function (b) {
            a.mainRenderer.stage.getChildByName("balanceTxt").children[0].text = "DEMO" == clientInfoGlobal.hall ? "DEMO" : formatFLGNums(b);
            a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("balanceTxt").children[0])
        };
        a.mainFLGAccount.events.on("onBalance", U);
        b = null;
        a.mainRenderer.stage.addChild(x);
        a.mainRenderer.stage.addChild(I);
        a.mainRenderer.stage.addChild(aa);
        a.mainRenderer.stage.addChild(C);
        a.mainRenderer.stage.addChild(g);
        a.setMainGrid(new Grid(-562, -436, 10, 8, 10, u.game.container, a.mainRenderer));
        a.mainGrid.createZones(108, 104, {x: 5, y: 5}, {
            font: "bold 65px Arial Narrow",
            fill: "#e0e0e0",
            stroke: "#000000",
            strokeThickness: 4,
            align: "center"
        }, function (b, c, d) {
            if (b.selected || !(a.mainGrid.pressedZones.length >= a.mainGrid.maxPreessedZones)) {
                c ? b.selected || (b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture) : a.mainGrid.gridContainer.down = !0;
                if (c &&
                    a.mainGrid.gridContainer.down || !c && !d || d && (b.name != O || void 0 == O)) if (b.selected) {
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
                    ba(b, "rotate" + b.children[0].text, !0)
                } else b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture, ba(b, "rotate" + b.children[0].text), b.selected = !0, a.mainSoundManager.playSound("firstChip"), a.mainGrid.pressedZones.push(b);
                d && (O = b.name);
                a.mainGrid.gridContainer.down && S();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }, function (b, c) {
            if (c) {
                if (!b.selected && !a.mainGrid.gridContainer.down) if (b.isLock) switch (b.isLock) {
                    case 1:
                        b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                        break;
                    default:
                        b.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                } else b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture
            } else a.mainGrid.gridContainer.down = !1, O = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, !0);
        a.mainRenderer.stage.on("changeLang", V);
        a.mainGameManager.gameStateAsync(function (b) {
            var c = 0 >= b.t2 ? b.tir : b.tir + 1;
            m.editions.length && m.editions[m.editions.length - 1].round === c || m.addEdition(c);
            if (m.editions.length && m.editions[m.editions.length -
            1].round === c) {
                c = m.editions[m.editions.length - 1].betsHistory.bets;
                for (var d, f = 0, k = 0; k < c.length; k++) {
                    f += c[k].summ;
                    for (var g = 0; g < c[k].bet.length; g++) switch (d = a.mainGrid.zones[c[k].bet[g] - 1], d.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, d.isLock ? d.isLock++ : d.isLock = 1, d.isLock) {
                        case 1:
                            d.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                            break;
                        default:
                            d.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                    }
                    d = null
                }
                a.mainFLGAccount.totalBet(f, !0);
                M = !0
            }
            m.drawEditions();
            W = new hotcoldGraphsKenoJX(b, u.stats, function (b, c) {
                var d = 0, e = 9;
                if (0 === c.children.length) {
                    var h = new PIXI.Container;
                    var f = [];
                    45 < mainLocalizationTable.hotcoldRating.length && (f = mainLocalizationTable.hotcoldRating.replace(/%s/g, 100).toUpperCase().split(" "));
                    var k = a.mainRenderer.createButton(h, -1, -374, void 0, {
                        text: f.length ? f[0] + " " + f[1] + " " + f[2] : mainLocalizationTable.hotcoldRating.replace(/%s/g, 100).toUpperCase(),
                        align: "center",
                        style: {font: "bold 50px Arial", fill: "#ffffff", align: "center"}
                    });
                    k.anchor.set(.5,
                        .5);
                    f.length && (k = a.mainRenderer.createButton(h, -1, -324, void 0, {
                        text: f[3] + " " + f[4] + " " + f[5] + " " + f[6],
                        align: "center",
                        style: {font: "bold 50px Arial", fill: "#ffffff", align: "center"}
                    }), k.anchor.set(.5, .5));
                    c.addChild(h);
                    c = a.mainRenderer.createButton(c, -531, -284, "hotcold_bg");
                    h = new PIXI.Container;
                    c.addChild(h);
                    f = new PIXI.Container;
                    c.addChild(f);
                    for (var g in b.cold) {
                        if (5 < d) break;
                        k = new PIXI.Graphics;
                        k.position.set(93 + 163 * d, 188);
                        h.addChild(k);
                        k = new PIXI.Graphics;
                        k.position.set(93 + 163 * d, 499);
                        f.addChild(k);
                        k =
                            a.mainRenderer.createButton(c, 169 + 163 * d, 156, void 0, {
                                text: b.hot[d][1] + "%",
                                align: "center",
                                style: {font: "bold 50px Arial", fill: "#fe801b", align: "center"}
                            });
                        k.anchor.set(.5, .5);
                        k = a.mainRenderer.createButton(c, 169 + 163 * d, 246, void 0, {
                            text: b.hot[d][0],
                            align: "center",
                            style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                        });
                        k.anchor.set(.5, .5);
                        k = a.mainRenderer.createButton(c, 169 + 163 * d, 472, void 0, {
                            text: b.cold[e][1] + "%",
                            align: "center",
                            style: {font: "bold 50px Arial", fill: "#9bccff", align: "center"}
                        });
                        k.anchor.set(.5,
                            .5);
                        k = a.mainRenderer.createButton(c, 169 + 163 * d, 558, void 0, {
                            text: b.cold[e][0],
                            align: "center",
                            style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                        });
                        k.anchor.set(.5, .5);
                        d++;
                        e--
                    }
                } else for (g in c = c.children[1], h = c.children[0], f = c.children[1], b.cold) {
                    if (5 < d) break;
                    a.mainUIManager.animations()["anim_graph_hot" + d] && a.mainUIManager.animations()["anim_graph_hot" + d].stop();
                    a.mainUIManager.animations()["anim_graph_cold" + d] && a.mainUIManager.animations()["anim_graph_cold" + d].stop();
                    h.children[d].clear();
                    f.children[d].clear();
                    c.children[4 * d + 2].children[0].text = "0%";
                    c.children[4 * d + 3].children[0].text = b.hot[d][0];
                    c.children[4 * d + 4].children[0].text = "0%";
                    c.children[4 * d + 5].children[0].text = b.cold[e][0];
                    d++;
                    e--
                }
            }, function (b, c) {
                if (0 !== c.children.length) {
                    var d = c.children[1].children[0], e = c.children[1].children[1], f = 0, h = 9, k;
                    for (k in b.cold) {
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
                            data: {rect: e.children[f], iteration: f, percentText: c.children[1].children[4 * f + 4]}
                        })).to({percentage: b.cold[h][1]}, 990).easing(TWEEN.Easing.Back.Out).onStop(function () {
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
                        h--
                    }
                    e = d = null
                }
            });
            W.draw();
            m.events.emit("GRID_STATS",
                b);
            F.drawCustomJackpot(function (b, c) {
                var d = C.getChildByName("menu_bg").getChildByName("JackpotContainer"),
                    f = formatFLGNums(c.toFixed(2), !0);
                d ? (c = d.children[1], d = d.children[2]) : (d = a.mainRenderer.createButton(C.getChildByName("menu_bg"), 220, 73), d.name = "JackpotContainer", a.mainRenderer.createButton(d, 155, -25, "atlas%JJackPot").anchor.set(.5, .5), c = a.mainRenderer.createButton(d, 3, 3), d = a.mainRenderer.createButton(d, 0, 68));
                for (var e = 0; e < c.children.length; e++) c.children[e].visible = !1;
                var h = 0;
                e = f.length - 1;
                for (var k =
                    0; 0 <= e; e--, k++) {
                    var g = c.children[k];
                    var m = "." !== f[e] && " " !== f[e];
                    if (g) g.visible = !0, g.position.x = h, m || (g.position.x = g.position.x + c.children[0].width - 1), m && g.children[0].children[0].text !== f[e] && (g.children[0].children[1].text = f[e], a.mainRenderer.renderManager.animationTweenInc(), (new TWEEN.Tween({
                        firstPosY: g.children[0].children[0].position.y,
                        secondPosY: g.children[0].children[1].position.y,
                        numberSprite: c.children[k]
                    })).to({
                        firstPosY: g.children[0].children[0].position.y - g.height,
                        secondPosY: g.children[0].children[1].position.y -
                            g.height
                    }, 865).onUpdate(function () {
                        this.numberSprite.children[0].children[0].position.y = this.firstPosY;
                        this.numberSprite.children[0].children[1].position.y = this.secondPosY
                    }).onComplete(function () {
                        this.numberSprite.children[0].children[0].text = this.numberSprite.children[0].children[1].text;
                        this.numberSprite.children[0].children[0].position.y = 0;
                        this.numberSprite.children[0].children[1].position.y = this.numberSprite.height;
                        a.mainRenderer.renderManager.animationTweenDec()
                    }).start()); else if (m) {
                        g = a.mainRenderer.createButton(c,
                            h, 0, "atlas%Jnum-bot");
                        m = a.mainRenderer.createButton(g, g.width / 2, g.height / 2);
                        m.anchor.set(.5, .5);
                        var l = new PIXI.Text(f[e], {font: "bold 38px Arial", fill: "#000000", align: "center"});
                        l.anchor.set(.5, .5);
                        m.addChild(l);
                        l = new PIXI.Text(f[e], {font: "bold 38px Arial", fill: "#000000", align: "center"});
                        l.position.y = g.height;
                        l.anchor.set(.5, .5);
                        m.addChild(l);
                        l = new PIXI.Graphics;
                        l.beginFill();
                        l.drawRect(0, 0, g.width, g.height);
                        l.endFill;
                        m.mask = l;
                        m.parent.addChild(l);
                        l = null;
                        a.mainRenderer.createButton(g, 0, 0, "atlas%Jnum-top");
                        l = m = null
                    } else g = a.mainRenderer.createButton(c, h + c.children[0].width - 1, 36, void 0, {
                        text: " " === f[e] ? "," : f[e],
                        align: "center",
                        style: {font: "bold 38px Arial", fill: "#fefefe", align: "center"}
                    });
                    k !== f.length - 1 && (h -= g.width, h -= 6, c.position.x = -h)
                }
                h = 0;
                e = c.position.x + c.children[0].width;
                f = .8 * e / 10;
                k = .2 * e / 9;
                for (e = 0; 10 > e; e++) {
                    g = d.children[e];
                    switch (e) {
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
                    g ? (g.clear(), g.beginFill(n), g.drawRect(h, 0, f, 4), g.endFill) :
                        (g = new PIXI.Graphics, g.beginFill(n), g.drawRect(h, 0, f, 4), g.endFill, d.addChild(g));
                    h += f + k;
                    g.visible = e <= parseInt(b)
                }
                g = null;
                c.position.x += (3 - c.position.x) / 2 + 124;
                a.mainRenderer.renderManager.needUpdateRender = !0;
                d = d = null
            });
            F.updateJackpotData(b);
            a.mainFLGAccount.autoplayManager.updateCallback = function (b) {
                if (!(2 > m.editions.length)) {
                    switch (b) {
                        case "repeatLastBet":
                            var c = b = -1;
                            var d = m.editions.length - 2;
                            break;
                        case "getOnlyBets":
                            c = b = void 0;
                            d = m.editions.length - 1;
                            break;
                        default:
                            b = m.editions[m.editions.length - 2].betsHistory.setTotalWin(),
                                c = a.mainFLGAccount.balance(), d = m.editions.length - 2
                    }
                    a.mainFLGAccount.autoplayManager.update(m.editions[d].betsHistory.bets, b, c, function (b) {
                        a.mainGameManager && 0 < b.length && m.getActedOutEdition().betsHistory.addBet(b, m.getActedOutEdition().round, function (b) {
                            if (b && b.length) {
                                var c;
                                for (c = 0; c < b.length; c++) for (var d = 0; d < b[c].bet.length; d++) {
                                    var e = a.mainGrid.zones[b[c].bet[d] - 1];
                                    e.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                    e.isLock ? e.isLock++ : e.isLock = 1;
                                    switch (e.isLock) {
                                        case 1:
                                            e.texture =
                                                a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                            break;
                                        default:
                                            e.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                                    }
                                }
                            } else if (b) for (d = 0; d < b.bet.length; d++) switch (e = a.mainGrid.zones[b.bet[d] - 1], e.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, e.isLock ? e.isLock++ : e.isLock = 1, e.isLock) {
                                case 1:
                                    e.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                    break;
                                default:
                                    e.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                            }
                        })
                    }, m.editions[d].round)
                }
            };
            R(b);
            e && e()
        })
    }, function () {
        a.mainSoundManager.playRandomBackSound()
    });
    var V = function () {
        a.mainFLGAccount.updateAccountText();
        m.redrawEditionHeader();
        m.drawBetsHeader();
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.onLanguageChange = V;
    this.setInteraction = function (b) {
        a.mainGrid.setZoneInteraction(b);
        x.getChildByName("btn-random").children[0].interactive = b;
        x.getChildByName("btn-plus3").children[0].interactive = b;
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.setTextHeaderScale = function (a) {
        12 <
        a.text.length ? a.scale.set(.65, .65) : 9 < a.text.length ? a.scale.set(.75, .75) : a.scale.set(1, 1)
    };
    this.setTextScale = function (a) {
        a.text == "MAX\n" + E ? a.scale.set(.5, .5) : a.scale.set(1, 1)
    };
    var S = function () {
        var b = 0;
        0 < a.mainGrid.pressedZones.length && 0 < y.currentBet() && (b = y.currentBet() * a.mainGameManager.coefficients[a.mainGrid.pressedZones.length][a.mainGrid.pressedZones.length - 1]);
        a.mainFLGAccount.maxWin(b)
    }, ia = 0, ka = 0, R = function (b) {
        function c(b) {
            a.mainGameManager && (p.children[2].mask.clear(), p.children[2].mask.beginFill(),
                p.children[2].mask.drawRoundedRect(3, 3, 386 * b, 34, 9), p.children[2].mask.endFill, p.children[2].children[0].children[0].text = N.getTimerText(), p.children[0].children[0].text = N.getTimerText(), a.mainRenderer.renderManager.needUpdateRender = !0)
        }

        function d(b) {
            if (a.mainGameManager) {
                p.children[2].clear();
                p.children[2].beginFill(42577);
                p.children[2].drawRoundedRect(3, 3, 386, 34, 9);
                p.children[2].endFill;
                F.updateJackpotData(b);
                M ? M = !1 : (a.mainFLGAccount.setWinTextVisible(!0), a.mainGrid.removeSelectedBets(), a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_transp.texture,
                    {
                        font: "bold 65px Arial Narrow",
                        fill: "#e0e0e0",
                        stroke: "#000000",
                        strokeThickness: 4,
                        align: "center"
                    }, void 0, a.mainGrid.getIntArrayOfZones()));
                a.mainUIManager.setInteraction(!0);
                m.addEdition(b.tir + 1);
                var d = [], e;
                for (e = 1; 21 > e; e++) d.push(b["b" + e]);
                G.startDrawBalls(d, 1, 0);
                1 < m.editions.length && m.drawDetailEditionHistory(u.history.container, m.editions.length - 2);
                a.mainFLGAccount.autoplayManager.updateCallback();
                a.mainFLGAccount.autoplayManager.settings.isStarted() || a.mainFLGAccount.autoplayManager.settings.repeatRoundNum() ===
                m.editions[m.editions.length - 1].round ? (g.getChildByName("autoplay_bg").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"], g.getChildByName("autoplay_bg").getChildByName("repeat").children[0].interactive = !1) : (g.getChildByName("autoplay_bg").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand2"], g.getChildByName("autoplay_bg").getChildByName("repeat").children[0].interactive = !0);
                x.getChildByName("btn-autoplay").getChildByName("autoplay_remain_num").children[0].text =
                    0 == a.mainFLGAccount.autoplayManager.settings.count() ? "" : a.mainFLGAccount.autoplayManager.settings.count();
                a.mainFLGAccount.autoplayManager.settings.isStarted() ? (g.getChildByName("autoplay_bg").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRemainingNumber + ": " + a.mainFLGAccount.autoplayManager.settings.count(), g.getChildByName("autoplay_bg").getChildByName("autoplayDesc2").visible = !1, g.getChildByName("autoplay_bg").getChildByName("autoplay-num1").visible = !1, g.getChildByName("autoplay_bg").getChildByName("autoplay-num5").visible =
                    !1, g.getChildByName("autoplay_bg").getChildByName("autoplay-num10").visible = !1, g.getChildByName("autoplay_bg").getChildByName("autoplaySelected").children[0].text = a.mainFLGAccount.autoplayManager.settings.count(), g.getChildByName("autoplay_bg").getChildByName("autoplaySelected").visible = !0, g.getChildByName("autoplay_bg").getChildByName("autoplay-stop").visible = !0) : (g.getChildByName("autoplay_bg").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRoundNumber, g.getChildByName("autoplay_bg").getChildByName("autoplayDesc2").visible =
                    !0, g.getChildByName("autoplay_bg").getChildByName("autoplay-num1").visible = !0, g.getChildByName("autoplay_bg").getChildByName("autoplay-num5").visible = !0, g.getChildByName("autoplay_bg").getChildByName("autoplay-num10").visible = !0, g.getChildByName("autoplay_bg").getChildByName("autoplaySelected").visible = !1, g.getChildByName("autoplay_bg").getChildByName("autoplay-stop").visible = !1);
                p.children[2].children[1].children[0].text = "#" + b.tir;
                p.children[1].children[0].text = "#" + b.tir;
                N.start({
                    minutes: 0, seconds: (b.time_round ?
                        b.time_round : a.kenoConfig.tirTime) - a.kenoConfig.timerOffset - b.t2
                }, {
                    minutes: 0,
                    seconds: (b.time_round ? b.time_round : a.kenoConfig.tirTime) - a.kenoConfig.timerOffset
                }, c, function () {
                    a.mainGameManager && (a.mainGrid.removeCurrentBets(), a.mainGrid.removeFuckingHoverTexture(), G.removeBalls(), a.mainUIManager.setInteraction(!1), a.mainSoundManager.playSound("endBet"))
                }, Y, R);
                m.events.emit("BET_TIME")
            }
        }

        function e(b) {
            function c() {
                a.mainGameManager && (a.mainGameManager.gameStateAsync(d), a.mainRenderer.renderManager.needUpdateRender =
                    !0)
            }

            function d(b) {
                function d(b) {
                    if (a.mainGrid && a.mainGameManager) if (h >= f.length) b(); else {
                        var c = f.slice(0, h + 1), e = "resultBalls" + h, g = a.mainGrid.zones[parseInt(f[h]) - 1];
                        a.mainUIManager.simpleFlipXFunc(g, e, 225, 225, function (b) {
                            b.texture = b.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                        });
                        G.startDrawBalls(c, 1, 0);
                        m.cancelLastEdition(c);
                        h += 1;
                        setTimeout(function () {
                            d(b)
                        }, 450)
                    }
                }

                if (a.mainGameManager) if (99 === b.b1) setTimeout(c, 2E3); else {
                    var f =
                            [b.b1, b.b2, b.b3, b.b4, b.b5, b.b6, b.b7, b.b8, b.b9, b.b10, b.b11, b.b12, b.b13, b.b14, b.b15, b.b16, b.b17, b.b18, b.b19, b.b20],
                        h = limit(e, 0, 19);
                    if (0 !== h) {
                        var g;
                        for (g = 0; g <= h; g++) {
                            var k = "resultBalls" + g, l = a.mainGrid.zones[parseInt(f[g]) - 1];
                            a.mainUIManager.simpleFlipXFunc(l, k, 225, 225, function (b) {
                                b.texture = b.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                            })
                        }
                    }
                    d(function () {
                        a.mainFLGAccount.calculateWin(m.getActedOutEdition().betsHistory.bets,
                            a.kenoConfig.appName, function () {
                                m.getActedOutEdition().betsHistory.setTotalWin(a.mainFLGAccount.totalWin());
                                m.getActedOutEdition().betsHistory.redrawCurrentBets();
                                p.children[2].clear();
                                p.children[2].beginFill(0);
                                p.children[2].drawRoundedRect(3, 3, 386, 34, 9);
                                p.children[2].endFill;
                                var c = a.kenoConfig.winShowTime ? a.kenoConfig.winShowTime : 8E3;
                                ia = setTimeout(R, c);
                                F.updateJackpotData(b);
                                F.drawJackpotWin(2E4, {
                                    x: 1584,
                                    y: 700
                                }, a.mainRenderer.resourceLoader.resources.JP.texture);
                                u.video.button.pressed ? setTimeout(function () {
                                    u.game.button.emit("mousedown");
                                    a.mainFLGAccount.winToBalanceAnimation(c - 2E3, 2E3, {
                                        x: 594,
                                        y: 628
                                    }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                        font: "bold 70px Arial",
                                        fill: "#bcbcbc",
                                        scale: 1.25
                                    }, F.jpWin())
                                }, 2E3) : a.mainFLGAccount.winToBalanceAnimation(c, 2E3, {
                                    x: 594,
                                    y: 628
                                }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                    font: "bold 70px Arial",
                                    fill: "#bcbcbc",
                                    scale: 1.25
                                }, F.jpWin())
                            }, a.kenoConfig);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    })
                }
            }

            if (a.mainGameManager) {
                m.events.emit("RESULT_TIME");
                p.children[2].clear();
                p.children[2].beginFill(12531501);
                p.children[2].drawRoundedRect(3, 3, 386, 34, 9);
                p.children[2].endFill;
                1 < m.editions.length && m.drawDetailEditionHistory(u.history.container, m.editions.length - 2);
                p.children[2].children[1].children[0].text = "#" + b.tir;
                p.children[1].children[0].text = "#" + b.tir;
                var e = a.kenoConfig.rTime - parseInt(b.tOrig, 10) - 1;
                0 > e ? setTimeout(c, 1E3 * -e) : c();
                a.mainUIManager.setInteraction(!1);
                M ? (b = a.mainFLGAccount.totalBet(), a.mainFLGAccount.setWinTextVisible(!1), a.mainFLGAccount.totalBet(b, !0), M = !1) : a.mainFLGAccount.setWinTextVisible(!1)
            }
        }

        function f(a) {
            0 >= a.t2 ? e(a) : d(a)
        }

        void 0 != a.mainGameManager && (b ? f(b) : a.mainGameManager.gameStateAsync(f))
    };
    this.drawGridHotCold = function (b) {
        if (H.prevGmState || b) {
            var c = H.prevGmState;
            b && (c = b, H.prevGmState = b);
            var d = {
                font: "bold 65px Arial Narrow",
                fill: "#e0e0e0",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center"
            };
            b = 0;
            for (var e = 9; 6 > b; b++, e--) a.mainGrid.zones[parseInt(c.hot[b][0], 10) - 1].children[0].style = d, a.mainGrid.zones[parseInt(c.cold[e][0], 10) - 1].children[0].style = d;
            a.mainRenderer.renderManager.needUpdateRender =
                !0;
            if (H.needShow) {
                d = {
                    font: "bold 65px Arial Narrow",
                    fill: "#41a0ff",
                    stroke: "#000000",
                    strokeThickness: 4,
                    align: "center"
                };
                var f = {
                    font: "bold 65px Arial Narrow",
                    fill: "#ff5050",
                    stroke: "#000000",
                    strokeThickness: 4,
                    align: "center"
                };
                b = 0;
                for (e = 9; 6 > b; b++, e--) a.mainGrid.zones[parseInt(c.hot[b][0], 10) - 1].children[0].style = f, a.mainGrid.zones[parseInt(c.cold[e][0], 10) - 1].children[0].style = d;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }
    };
    m.events.on("GRID_STATS", k.drawGridHotCold);
    m.events.on("BET_TIME", k.drawGridHotCold)
}
;
