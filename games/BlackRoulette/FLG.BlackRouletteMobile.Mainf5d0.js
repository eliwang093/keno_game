function BlackRouletteAppMobile(a) {
    this.destroy = function () {
        D.destroy();
        D = null;
        K.destroy();
        K = null;
        X.destroy();
        X = null;
        S.destroy();
        S = null;
        Y.destroy();
        Y = null;
        F.mainSoundManager.destroy();
        for (var U in F) F[U] = null;
        F = null
    };
    var F = this;
    this.gameDir = "games/BlackRoulette/resources/";
    this.gameDirMobile = "games/BlackRoulette/resources/mobile/";
    this.gameConfig = a;
    var Y = new FLGRenderer(1920, 1080, a.canvasId, "center");
    this.mainRenderer = Y;
    this.mainSoundManager = new SoundManager(F.gameConfig.gameKind, F.gameConfig.gameType,
        F.gameConfig.gameVariant);
    var X = new FLGAccount(null, F.mainSoundManager, F.mainRenderer);
    this.mainFLGAccount = X;
    var S = new gameManagerBlackRoulette(this);
    this.mainGameManager = S;
    var D = new UIManagerBlackRouletteMobile(this);
    this.mainUIManager = D;
    var K;
    this.setMainGrid = function (U) {
        K = U;
        F.mainGrid = K
    }
}

function UIManagerBlackRouletteMobile(a) {
    function F(b) {
        this.destroy = function () {
            for (var c = 0; c < e.length; c++) {
                for (var m in e[c]) e.length - 1 == c && e[c][m].summ && b.mainFLGAccount.totalBet(-e[c][m].summ), e[c][m] = null;
                e[c] = null
            }
            f = d = e = null;
            for (c in g) g[c] = null;
            g = null
        };
        var g = this, e = [];
        this.states = function () {
            return e
        };
        var d = [];
        this.saveGridStateInStorage = function () {
            localStorage.setItem("curUser", JSON.stringify({hall: clientInfoGlobal.hall, nick: clientInfoGlobal.nick}));
            e && localStorage.setItem("gridStatesBlack" +
                a.gameConfig.gameKind + a.gameConfig.gameType, JSON.stringify(e));
            d && localStorage.setItem("lastRoundGridStateBlack" + a.gameConfig.gameKind + a.gameConfig.gameType, JSON.stringify(d))
        };
        this.loadGridStateFromStorage = function () {
            if (localStorage.getItem("curUser")) {
                var c = JSON.parse(localStorage.getItem("curUser"));
                if (c.hall != clientInfoGlobal.hall && c.nick != clientInfoGlobal.nick) return
            }
            localStorage.getItem("gridStatesBlack" + a.gameConfig.gameKind + a.gameConfig.gameType) && (e = JSON.parse(localStorage.getItem("gridStatesBlack" +
                a.gameConfig.gameKind + a.gameConfig.gameType)));
            localStorage.getItem("lastRoundGridStateBlack" + a.gameConfig.gameKind + a.gameConfig.gameType) && (d = JSON.parse(localStorage.getItem("lastRoundGridStateBlack" + a.gameConfig.gameKind + a.gameConfig.gameType)))
        };
        this.addGridState = function (c, m) {
            m = c ? c : b.mainUIManager.getFortuneObjectsByGrid();
            if (!e.length || m.length || e[e.length - 1].length) e.push(m), g.saveGridStateInStorage(), c && f()
        };
        this.doubleCurrentBets = function () {
            var c = {betErrorCount: 0, betErrorFunc: null}, m = 0, h;
            for (h in a.mainGrid.pressedZones) if (m++, a.mainUIManager.isAllowBet({
                comb: parseInt(h),
                coef: void 0,
                summ: a.mainGrid.pressedZones[h].bet
            }, 2 * a.mainGrid.pressedZones[h].bet, c)) {
                if (-1 == a.mainFLGAccount.totalBet(parseFloat(a.mainGrid.pressedZones[h].bet))) return;
                a.mainUIManager.defineZonesForBet(a.mainGrid.pressedZones[h].zone, .35, O, parseFloat(a.mainGrid.pressedZones[h].bet).toFixed(10) * parseFloat(a.mainGrid.pressedZones[h].coef).toFixed(10));
                a.mainGrid.pressedZones[h].bet *= 2;
                a.mainGrid.pressedZones[h].spread.main *=
                    2;
                for (var r in a.mainGrid.pressedZones[h].spread.sectors) a.mainGrid.pressedZones[h].spread.sectors[r] *= 2;
                var p = a.mainGrid.pressedZones[h].bet - parseFloat(K(a.mainGrid.pressedZones[h].zone.getChildByName("smallChipText").text)).toFixed(10);
                if (40 <= a.mainGrid.pressedZones[h].zone.name && 48 >= a.mainGrid.pressedZones[h].zone.name) b.mainUIManager.createSmallChip(a.mainGrid.uiButtonsContainer.getChildByName(a.mainGrid.pressedZones[h].zone.name), p); else {
                    b.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(a.mainGrid.pressedZones[h].zone.name),
                        p);
                    if (100 <= a.mainGrid.pressedZones[h].zone.name && 136 >= a.mainGrid.pressedZones[h].zone.name || 179 == a.mainGrid.pressedZones[h].zone.name || 187 == a.mainGrid.pressedZones[h].zone.name || 1 == a.mainGrid.pressedZones[h].zone.name || 26 == a.mainGrid.pressedZones[h].zone.name) for (p = 49; 52 >= p; p++) a.mainGrid.pressedZones[h].spread.sectors[p] && 0 < a.mainGrid.pressedZones[h].spread.sectors[p] && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(p), a.mainGrid.pressedZones[h].spread.sectors[p] / 2);
                    36 >= a.mainGrid.pressedZones[h].zone.name && 0 < a.mainGrid.pressedZones[h].spread.main && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(a.mainGrid.pressedZones[h].zone.name), a.mainGrid.pressedZones[h].spread.main / 2)
                }
            }
            0 < c.betErrorCount && c.betErrorFunc();
            c.betErrorCount != m && g.addGridState();
            c.betErrorCount = null;
            c.betErrorFunc = null
        };
        this.undoGridState = function () {
            e.length && (e.pop(), g.saveGridStateInStorage(), b.mainGrid.removeCurrentBets(), a.mainFLGAccount.totalBet(-a.mainFLGAccount.totalBet()),
                f())
        };
        this.clearGridStates = function () {
            if (e && e.length) {
                if (d && d.length && e[e.length - 1].length) {
                    for (var c in d) d[c] = null;
                    d = []
                }
                e[e.length - 1].length && (d = e[e.length - 1].slice());
                for (var m = 0; m < e.length; m++) {
                    for (c in e[m]) e[m][c] = null;
                    e[m] = null
                }
                e = []
            }
            g.saveGridStateInStorage()
        };
        this.repeatLastRoundGridState = function () {
            d && d.length && g.addGridState(d.slice())
        };
        this.showWinCombinations = function (c) {
            b.mainGrid.removeCurrentBets();
            f(c, !0)
        };
        var f = function (c, m) {
            var h = c ? c : e[e.length - 1], r = void 0 != m ? m : !1, p = {
                betErrorCount: 0,
                betErrorFunc: null
            };
            h && h.length && (b.mainGrid.pressZonesByObjectArr(h, function (k) {
                if (b.mainUIManager.isAllowBet({
                    comb: parseInt(k.zone.name),
                    coef: void 0,
                    summ: k.bet
                }, b.mainGrid.pressedZones[k.zone.name] ? b.mainGrid.pressedZones[k.zone.name].bet + k.bet : k.bet, p)) {
                    if (c || r) c && c.length && (parseInt(h[0].winBet) != parseInt(k.zone.name) && (40 <= k.zone.name && 48 >= k.zone.name ? b.mainUIManager.createSmallChip(a.mainGrid.uiButtonsContainer.getChildByName(k.zone.name), k.bet) : (b.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(k.zone.name),
                        k.bet), 36 >= k.zone.name && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(k.zone.name), k.bet))), b.mainGrid.pressedZones[k.zone.name] = {
                        zone: 40 <= k.zone.name && 48 >= k.zone.name ? b.mainGrid.uiButtonsContainer.getChildByName(k.zone.name) : b.mainGrid.uiGridContainer.getChildByName(k.zone.name),
                        bet: k.bet,
                        coef: b.mainUIManager.defineCoefForBet(k.zone)
                    }, b.mainUIManager.defineZonesForBet(k.zone, .35, b.mainUIManager.showPossibleWin, parseFloat(k.bet).toFixed(10) * parseFloat(b.mainGrid.pressedZones[k.zone.name].coef).toFixed(10),
                        !1)); else {
                        if (-1 == b.mainFLGAccount.totalBet(parseFloat(k.bet))) return;
                        if (40 <= k.zone.name && 48 >= k.zone.name) b.mainUIManager.createSmallChip(a.mainGrid.uiButtonsContainer.getChildByName(k.zone.name), k.bet); else {
                            b.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(k.zone.name), k.bet);
                            if (100 <= k.zone.name && 136 >= k.zone.name || 179 == k.zone.name || 187 == k.zone.name || 1 == k.zone.name || 26 == k.zone.name) for (var q = 49; 52 >= q; q++) k.spread.sectors[q] && 0 < k.spread.sectors[q] && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(q),
                                k.spread.sectors[q]);
                            36 >= k.zone.name && 0 < k.spread.main && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(k.zone.name), k.spread.main)
                        }
                        k.zone.selected ? (b.mainGrid.pressedZones[k.zone.name].bet = 40 <= k.zone.name && 48 >= k.zone.name ? parseFloat(b.mainGrid.uiButtonsContainer.getChildByName(k.zone.name).getChildByName("smallChipText").text).toFixed(10) : parseFloat(b.mainGrid.uiGridContainer.getChildByName(k.zone.name).getChildByName("smallChipText").text).toFixed(10), b.mainGrid.pressedZones[k.zone.name].spread.main +=
                            k.spread.main, b.mainGrid.pressedZones[k.zone.name].spread.sectors[k.zone.name] = b.mainGrid.pressedZones[k.zone.name].spread.sectors[k.zone.name] ? b.mainGrid.pressedZones[k.zone.name].spread.sectors[k.zone.name] + k.spread.sectors[k.zone.name] : k.spread.sectors[k.zone.name]) : (k.zone.selected = !0, b.mainGrid.pressedZones[k.zone.name] = {
                            zone: 40 <= k.zone.name && 48 >= k.zone.name ? b.mainGrid.uiButtonsContainer.getChildByName(k.zone.name) : b.mainGrid.uiGridContainer.getChildByName(k.zone.name),
                            bet: k.bet,
                            coef: b.mainUIManager.defineCoefForBet(k.zone),
                            spread: {sectors: Object.assign({}, k.spread.sectors), main: k.spread.main}
                        });
                        b.mainUIManager.defineZonesForBet(k.zone, .35, b.mainUIManager.showPossibleWin, parseFloat(k.bet).toFixed(10) * parseFloat(b.mainGrid.pressedZones[k.zone.name].coef).toFixed(10))
                    }
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }), b.mainGrid.zonesOut(), 0 < p.betErrorCount && !r && p.betErrorFunc(), p.betErrorCount = null, p = p.betErrorFunc = null)
        };
        this.selectGridByStates = f;
        g.loadGridStateFromStorage()
    }

    function Y(b) {
        this.destroy = function () {
            e.destroy();
            m = c = f = h = d = e = null;
            for (var q = 0; q < r.length; q++) {
                for (var t in r[q]) r[q][t] = null;
                r[q] = null
            }
            k = p = r = null;
            for (q in g) g[q] = null;
            g = null
        };
        var g = this, e = new PIXI.Graphics;
        e.beginFill(16777215, 0);
        e.drawRect(0, 0, b.mainRenderer.canvasSize.width, b.mainRenderer.canvasSize.height);
        e.endFill();
        var d = new PIXI.Sprite(e.generateTexture(!1));
        d.width = d.texture.width;
        d.height = d.texture.height;
        d.interactive = !0;
        d.hitArea = new PIXI.Rectangle(0, 0, d.width, d.texture.height);
        var f = function (q) {
            h.data = q.data;
            h.dragging = !0;
            q = h.data.getLocalPosition(h.parent);
            h.position.x = q.x;
            h.position.y = q.y;
            h.visible = !0;
            b.mainGrid.gridContainer.down = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, c = function () {
            h.dragging = !1;
            h.data = null;
            h.visible = !1;
            b.mainGrid.gridContainer.down = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, m = function () {
            if (h.dragging) {
                var q = h.data.getLocalPosition(h.parent);
                h.position.x = q.x;
                h.position.y = q.y
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        d.on("mousedown", f).on("touchstart", f).on("mousemove", m).on("touchmove", m).on("mouseup",
            c).on("touchend", c).on("mouseupoutside", c).on("touchendoutside", c);
        b.mainRenderer.stage.addChildAt(d, 0);
        var h = b.mainRenderer.createButton(d, 0, 0, void 0, void 0);
        h.anchor.set(.5, .5);
        h.visible = !1;
        this.addDragSprite = function (q) {
            b.mainRenderer.stage.addChild(h)
        };
        this.setInteraction = function (q) {
            d.interactive = q;
            h.visible = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        var r = [], p = {};
        this.currentMode = function () {
            return p
        };
        var k = function (q) {
            p = q;
            h.texture = b.mainRenderer.resourceLoader.resources[p.modeSprite.name].texture;
            h.width = h.texture.width;
            h.height = h.texture.height;
            h.scale.set(.65, .65);
            q = h.getChildByName("modeDragSpriteText");
            p.modeSprite.text ? q ? (q.text = p.modeSprite.text, q.visible = !0) : (q = new PIXI.Text(p.modeSprite.text, p.modeSprite.style), q.style.align = "center", q.name = "modeDragSpriteText", h.addChild(q)) : q && (q.visible = !1);
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        this.setMode = function (q) {
            if (q && q.modeName != p.modeName) {
                for (var t = 0; t < r.length; t++) if (q.modeName == r[t].modeName) {
                    k(r[t]);
                    return
                }
                r.push(q);
                k(r[r.length -
                1])
            }
        }
    }

    function X(b) {
        this.destroy = function () {
            for (var p = 0; p < e.length; p++) e[p].round = null, e[p].editionResult = null, e[p].betsHistory.destroy && e[p].betsHistory.destroy(), e[p] = null;
            r = h = m = c = d = RoundText = e = null;
            for (p in g) g[p] = null;
            g = null
        };
        var g = this, e = [];
        this.editions = e;
        var d;
        this.historyTable = function () {
            return d
        };
        this.getActedOutEdition = function () {
            for (var p = e.length - 1; 0 <= p; p--) if (void 0 == e[p].editionResult) return c(p), e[p];
            c(e.length - 1);
            return e[e.length - 1]
        };
        for (var f = 0; f < b.length; f++) e.push({
            round: b[f].round,
            editionResult: b[f].editionResult, betsHistory: b[f].betsHistory
        }), e[f].betsHistory.setRoundResult(e[f].editionResult);
        var c = function (p) {
            0 > p || p >= e.length || (a.mainRenderer.renderManager.needUpdateRender = !0)
        };
        c(e.length - 1);
        this.drawEditions = function () {
            d = new PIXI.Container;
            H.addChild(d)
        };
        var m = function () {
        };
        this.redrawEditionHeader = m;
        new PIXI.Container;
        var h = function () {
        };
        this.drawBetsHeader = h;
        var r = function (p) {
            for (p = 22; 7 < p; p--) v.setHistoryItem(p, e[p].editionResult[0], void 0 != e[p].editionResult[0] ? a.mainUIManager.getBallColorByCode(e[p].editionResult[0]) :
                "")
        };
        this.drawEditionHistory = r;
        this.cancelLastEdition = function (p) {
            e[e.length - 1].editionResult = p;
            e[e.length - 1].betsHistory.setRoundResult(p);
            c(e.length - 1)
        };
        this.addEdition = function (p) {
            e[0].betsHistory.destroy && e[0].betsHistory.destroy();
            e[0].betsHistory = null;
            e.shift();
            e.push({round: p, editionResult: void 0, betsHistory: new S([])});
            c(e.length - 1)
        }
    }

    function S(b) {
        this.destroy = function () {
            for (var f = 0; f < e.length; f++) {
                for (var c = 0; c < e[f].fortuneBetObjArr.length; c++) e[f].fortuneBetObjArr[c].comb = null, e[f].fortuneBetObjArr[c].coef =
                    null, e[f].fortuneBetObjArr[c].summ = null, e[f].fortuneBetObjArr[c] = null;
                e[f].fortuneBetObjArr = null;
                e[f].winBet = null;
                e[f].win = null;
                e[f].code = null;
                e[f] = null
            }
            e = null;
            for (f in g) g[f] = null;
            g = null
        };
        var g = this, e = [];
        this.bets = e;
        if (b.length) for (var d = 0; d < b.length; d++) e.push({
            fortuneBetObjArr: b[d].fortuneBetObjArr.slice(),
            winBet: b[d].winBet,
            win: b[d].win,
            code: b[d].code
        });
        this.addBet = function (f, c, m) {
            a.mainFLGAccount.placeFortuneBet(f, c, a.gameConfig, function (h) {
                void 0 == h || 500 <= e.length || -1 == h ? m && m(!1) : (e.push({
                    fortuneBetObjArr: f.fortuneBetObjArr.slice(),
                    winBet: f.winBet, win: f.win, code: h
                }), m && m(!0), a.mainRenderer.renderManager.needUpdateRender = !0)
            })
        };
        this.removeLasBet = function (f) {
            e.length && a.mainFLGAccount.removeRoulette4kBet(e[e.length - 1].code, a.gameConfig, function (c) {
                void 0 == c || -1 == c ? f && f(!1) : (e.pop(), f && f(!0), a.mainRenderer.renderManager.needUpdateRender = !0)
            })
        };
        this.setRoundResult = function (f) {
            for (var c = 0; c < e.length; c++) e[c].winBet = f
        }
    }

    const {format1000toK: D, formatKto1000: K, numFormat: U} = UTILS;
    this.destroy = function () {
        clearTimeout(ya);
        clearTimeout(za);
        P.events.removeAllListeners();
        da = L = null;
        A.destroy();
        A = null;
        Z.destroy();
        Z = null;
        v.destroy();
        v = null;
        E && (a.gameConfig.needHls ? E.destroy() : a.gameConfig.needRtc && rtcVideo.destroy());
        ea = Aa = Q = Ba = w = G = B = H = Ca = E = null;
        for (var b = 0; b < I.length; b++) I[b].round = null, I[b].editionResult = null, I[b].betsHistory.destroy && I[b].betsHistory.destroy(), I[b].betsHistory = null, I[b] = null;
        Da = I = null;
        for (b in u) u[b] = null;
        fa = Ea = Fa = ha = O = Ga = oa = pa = qa = ra = sa = ta = ua = va = aa = wa = ia = ja = ba = ca = M = V = u = null;
        a.mainFLGAccount.events.off("onBet", ka);
        a.mainFLGAccount.events.off("onBalance",
            la);
        la = ka = null;
        J.destroy();
        J = null;
        x.destroy();
        x = null;
        T.destroy();
        T = null;
        for (b in P) P[b] = null;
        P = null
    };
    var P = this;
    this.events = new PIXI.utils.EventEmitter;
    for (var ea = function (b) {
        b = parseInt(b);
        if ("DEMO" == parseInt(clientInfoGlobal.hall)) return 1;
        if (36 >= b) return parseInt(clientInfoGlobal.cf36max) / 100;
        if (42 >= b) return parseInt(clientInfoGlobal.cf3max) / 100;
        if (48 >= b) return parseInt(clientInfoGlobal.cf2max) / 100;
        if (135 >= b || 172 <= b && 195 >= b) return parseInt(clientInfoGlobal.cf18max) / 100;
        if (136 == b || 137 == b || 196 <= b &&
            207 >= b) return parseInt(clientInfoGlobal.cf12max) / 100;
        if (-1 != [141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171].indexOf(b)) return parseInt(clientInfoGlobal.cf6max) / 100;
        if (250 > b) return parseInt(clientInfoGlobal.cf9max) / 100
    }, L = clientInfoGlobal.coin6.split("-"), ma = 0; ma < L.length; ma++) L[ma] /= 100;
    L.push("MAX");
    var A = new betsControls(L[0], L[L.length - 1], L[1], L, function (b) {
        b = ea(b.comb) - b.curSumm;
        a.mainFLGAccount.balance() < b && (b = doubleCurrentBets);
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return b
    });
    this.betsControls =
        A;
    var v, Z = new FLGTimer, E, Ca = new PIXI.Container, H = new PIXI.Container, B = new PIXI.Container,
        G = new PIXI.Container, w = new PIXI.Container, Ba = new PIXI.Container, Q, J, x;
    this.betManager = function () {
        return x
    };
    var T, Aa = function (b) {
            var g = [];
            if (!b) return g;
            for (var e in b) 0 != b[e].code ? g.push({
                fortuneBetObjArr: [{
                    comb: b[e].e1,
                    coef: b[e].koef,
                    summ: b[e].bet / 100
                }], win: b[e].win / 100, code: b[e].code
            }) : g[g.length - 1].fortuneBetObjArr.push({comb: b[e].e1, coef: b[e].koef, summ: b[e].bet / 100});
            return g
        }, I = [], Da = function (b, g) {
            a.mainGameManager.gameHistory(function (e) {
                for (var d,
                         f = 21; 0 <= f; f--) d = e[f + ""], I.push({
                    round: d.tir,
                    editionResult: [d.ball],
                    betsHistory: new S([])
                });
                e = I;
                d = e.push;
                f = b.tir;
                var c = [], m = b.ball;
                99 != m && c.push(m);
                d.call(e, {round: f, editionResult: c, betsHistory: new S(0 < b.t2 ? Aa(b.rulbet) : [])});
                J = new X(I);
                J.drawEditions();
                g && g()
            })
        }, u = {}, V = function (b, g, e, d, f) {
            b && (u[g] ? u[g].stop() : (a.mainRenderer.renderManager.animationTweenInc(), u[g] = (new TWEEN.Tween(b.position)).to({
                x: e,
                y: d
            }, 500).easing(TWEEN.Easing.Cubic.InOut).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                u[g] = null
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                u[g] = null;
                f && f()
            }).start()))
        }, M = function (b, g) {
            b && (u[g] && (u[g].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), u[g] = (new TWEEN.Tween(b)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                u[g] = null;
                a.mainRenderer.renderManager.animationTweenInc();
                u[g] = (new TWEEN.Tween(b)).to({alpha: 0},
                    500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    u[g] = null
                }).start()
            }).start())
        }, ca = function (b, g, e) {
            if (b) switch (u[g] && (u[g].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), e) {
                case "grow":
                    u[g] = (new TWEEN.Tween(b.scale)).to({
                        x: 1.2,
                        y: 1.2
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        u[g] = null
                    }).start();
                    break;
                default:
                    u[g] = (new TWEEN.Tween(b)).to({alpha: .6},
                        110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        u[g] = null
                    }).start()
            }
        }, ba = function (b, g, e) {
            u[g] && (u[g].stop(), a.mainRenderer.renderManager.animationTweenDec());
            if (b && 0 != b.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(), e) {
                case "grow":
                    u[g] = (new TWEEN.Tween(b.scale)).to({
                        x: .9,
                        y: .9
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        u[g] = null
                    }).start();
                    break;
                default:
                    u[g] =
                        (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            u[g] = null
                        }).start()
            }
        }, wa = function () {
            a.mainSoundManager.playSound("buttonClick");
            a.mainFLGAccount.closeGame()
        }, aa = function (b) {
            0 < B.position.x && 1920 > B.position.x || (a.mainSoundManager.playSound("buttonClick"), v.setVideoBtnsVisibility(b), a.mainUIManager.setVideoVisibility(b))
        }, ja = !1, ia = !1, ta = function () {
            a.mainSoundManager.playSound("stackChip");
            ja = !0;
            v.setRebetInteraction(!1)
        }, sa = function () {
            a.mainSoundManager.playSound("stackChip");
            ia = !0;
            v.setRebetInteraction(!1)
        }, va = function () {
            $(this).hasClass("btn_disabled") || (a.mainSoundManager.playSound("stackChip"), x.repeatLastRoundGridState(), v.setRebetInteraction(!1))
        }, ua = function () {
            $(this).hasClass("btn_disabled") || (a.mainSoundManager.playSound("stackChip"), x.repeatLastRoundGridState(), x.doubleCurrentBets(), v.setRebetInteraction(!1))
        }, ra = function () {
            $(this).hasClass("btn_disabled") || 0 == a.mainGrid.pressedZones.length || (a.mainSoundManager.playSound("stackChip"), x.doubleCurrentBets())
        },
        qa = function () {
            $(this).hasClass("btn_disabled") || 0 == a.mainGrid.pressedZones.length || (a.mainSoundManager.playSound("clearBet"), a.mainGrid.removeCurrentBets(), a.mainFLGAccount.maxWin(0), a.mainFLGAccount.totalBet(-a.mainFLGAccount.totalBet()), x.addGridState())
        }, pa = function () {
            $(this).hasClass("btn_disabled") || (a.mainSoundManager.playSound("buttonClick"), x.undoGridState())
        }, oa = function () {
            a.mainSoundManager.playSound("buttonClick");
            showCashFlowDlg()
        }, Ga = function (b, g) {
            a.mainSoundManager.playSound("chipSelector");
            b = K(b);
            A.setBet(b);
            T.setMode({modeName: b, modeSprite: {name: g}})
        }, ka, la,
        ha = [["bg", a.gameDirMobile + a.gameConfig.BG], ["WIN", a.gameDir + "WIN3.png"], ["table_bg_main", a.gameDir + "table-bg-main.png"], ["table_bg_sectors", a.gameDir + "table-bg-sectors3.png"], ["table_bg_footer", a.gameDir + "table-bg-footer.png"], ["table_disable_main", a.gameDir + "disable-table-main.png"], ["table_disable_sectors", a.gameDir + "disable-table-sectors2.png"], ["table_disable_footer", a.gameDir + "disable-table-footer.png"], ["btn_switch_sectors",
            a.gameDir + "btn-switch-sectors.png"], ["btn_switch_sectors_mode_selected", a.gameDir + "btn-switch-sectors-mode-selected.png"], ["btn_switch_grid", a.gameDir + "btn-switch-grid.png"], ["btn_switch_grid_mode_selected", a.gameDir + "btn-switch-grid-mode-selected.png"], ["btn_clear", a.gameDirMobile + "btn-clear.png"], ["btn_clear_mode_selected", a.gameDirMobile + "btn-clear-mode-selected.png"], ["btn_undo", a.gameDirMobile + "btn-undo4.png"], ["btn_undo_mode_selected", a.gameDirMobile + "btn-undo-mode-selected4.png"], ["btn_home",
            a.gameDirMobile + "btn-home.png"], ["btn_home_mode_selected", a.gameDirMobile + "btn-home-mode-selected.png"], ["btn_double", a.gameDirMobile + "btn-double.png"], ["btn_double_mode_selected", a.gameDirMobile + "btn-double-mode-selected.png"], ["btn_rebet", a.gameDirMobile + "btn-rebet-min.png"], ["btn_rebet_mode_selected", a.gameDirMobile + "btn-rebet-mode-selected-min.png"], ["btn_rebetx2", a.gameDirMobile + "btn-rebetx2-min.png"], ["btn_rebetx2_mode_selected", a.gameDirMobile + "btn-rebetx2-mode-selected-min.png"], ["btn_novideo",
            a.gameDirMobile + "btn-novideo.png"], ["btn_novideo_mode_selected", a.gameDirMobile + "btn-novideo-mode-selected.png"], ["btn_video", a.gameDirMobile + "btn-video1.png"], ["btn_video_mode_selected", a.gameDirMobile + "btn-video1-mode-selected.png"], ["btn_video_return", a.gameDirMobile + "btn-video-return-main.png"], ["btn_video_return_mode_selected", a.gameDirMobile + "btn-video-return-main-mode-selected.png"], ["btn_video_return_sectors", a.gameDirMobile + "btn-video-return-sectors.png"], ["btn_video_return_sectors_mode_selected",
            a.gameDirMobile + "btn-video-return-sectors-mode-selected.png"], ["video_img", a.gameDirMobile + "video-img3.jpg"], ["video_frame", a.gameDirMobile + "video-frame.png"], ["btn_video_load", a.gameDir + "btn-video-load.png"], ["inner_zone", a.gameDir + "inner-zone6.png"], ["inner_zone_zero", a.gameDir + "inner-zone-zero3.png"], ["inner_sector_cube", a.gameDir + "inner-sector-cube3.png"], ["inner_sector_11", a.gameDir + "inner-sector-11_3.png"], ["inner_sector_16", a.gameDir + "inner-sector-16_3.png"], ["inner_sector_30", a.gameDir + "inner-sector-30_3.png"],
            ["inner_sector_24", a.gameDir + "inner-sector-24_3.png"], ["inner_sector_8", a.gameDir + "inner-sector-8_3.png"], ["inner_sector_5", a.gameDir + "inner-sector-5_3.png"], ["inner_sector_23", a.gameDir + "inner-sector-23_3.png"], ["inner_sector_10", a.gameDir + "inner-sector-10_3.png"], ["inner_sector_15", a.gameDir + "inner-sector-15_3.png"], ["inner_sector_12", a.gameDir + "inner-sector-12_3.png"], ["inner_sector_32", a.gameDir + "inner-sector-32_3.png"], ["inner_sector_35", a.gameDir + "inner-sector-35_3.png"], ["inner_sector_0", a.gameDir +
            "inner-sector-0_3.png"], ["inner_sector_3", a.gameDir + "inner-sector-3_3.png"], ["inner_sector_26", a.gameDir + "inner-sector-26_3.png"], ["chip_1", a.gameDir + "icons_chip_1.png"], ["chip_2", a.gameDir + "icons_chip_2.png"], ["chip_3", a.gameDir + "icons_chip_3.png"], ["chip_4", a.gameDir + "icons_chip_4.png"], ["chip_5", a.gameDir + "icons_chip_5.png"], ["chip_6", a.gameDir + "icons_chip_6.png"], ["zone_win_chip", a.gameDir + "ring.png"], ["possible_win_bg", a.gameDir + "icon-possible-win.png"]],
        Fa = {
            49: {
                size: {w: 253, h: 212}, pos: {
                    zonePosX: 165,
                    zonePosY: 80
                }, hoverTexture: ""
            },
            50: {size: {w: 332, h: 212}, pos: {zonePosX: 418, zonePosY: 80}, hoverTexture: ""},
            51: {size: {w: 404, h: 212}, pos: {zonePosX: 750, zonePosY: 80}, hoverTexture: ""},
            52: {size: {w: 125, h: 212}, pos: {zonePosX: 1154, zonePosY: 80}, hoverTexture: ""}
        }, Ea = {
            10: {size: {w: 92, h: 71}, pos: {zonePosX: 9, zonePosY: 115}, hoverTexture: "inner_sector_10"},
            5: {size: {w: 108, h: 88}, pos: {zonePosX: 27, zonePosY: 50}, hoverTexture: "inner_sector_5"},
            24: {size: {w: 102, h: 92}, pos: {zonePosX: 84, zonePosY: 12}, hoverTexture: "inner_sector_24"},
            16: {
                size: {
                    w: 83,
                    h: 71
                }, pos: {zonePosX: 169, zonePosY: 8}, hoverTexture: "inner_sector_16"
            },
            33: {size: {w: 77, h: 71}, pos: {zonePosX: 254, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            1: {size: {w: 77, h: 71}, pos: {zonePosX: 347, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            20: {size: {w: 77, h: 71}, pos: {zonePosX: 427, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            14: {size: {w: 77, h: 71}, pos: {zonePosX: 506, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            31: {size: {w: 77, h: 71}, pos: {zonePosX: 586, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            9: {
                size: {
                    w: 77,
                    h: 71
                }, pos: {zonePosX: 665, zonePosY: 8}, hoverTexture: "inner_sector_cube"
            },
            22: {size: {w: 77, h: 71}, pos: {zonePosX: 758, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            18: {size: {w: 77, h: 71}, pos: {zonePosX: 838, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            29: {size: {w: 77, h: 71}, pos: {zonePosX: 917, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            7: {size: {w: 77, h: 71}, pos: {zonePosX: 997, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            28: {size: {w: 77, h: 71}, pos: {zonePosX: 1076, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            12: {
                size: {
                    w: 83,
                    h: 71
                }, pos: {zonePosX: 1162, zonePosY: 8}, hoverTexture: "inner_sector_12"
            },
            35: {size: {w: 102, h: 92}, pos: {zonePosX: 1235, zonePosY: 14}, hoverTexture: "inner_sector_35"},
            3: {size: {w: 109, h: 93}, pos: {zonePosX: 1288, zonePosY: 61}, hoverTexture: "inner_sector_3"},
            26: {size: {w: 87, h: 97}, pos: {zonePosX: 1318, zonePosY: 138}, hoverTexture: "inner_sector_26"},
            0: {size: {w: 109, h: 93}, pos: {zonePosX: 1288, zonePosY: 218}, hoverTexture: "inner_sector_0"},
            32: {size: {w: 102, h: 92}, pos: {zonePosX: 1235, zonePosY: 262}, hoverTexture: "inner_sector_32"},
            15: {
                size: {
                    w: 83,
                    h: 71
                }, pos: {zonePosX: 1162, zonePosY: 292}, hoverTexture: "inner_sector_15"
            },
            19: {size: {w: 77, h: 71}, pos: {zonePosX: 1076, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            4: {size: {w: 77, h: 71}, pos: {zonePosX: 997, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            21: {size: {w: 77, h: 71}, pos: {zonePosX: 917, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            2: {size: {w: 77, h: 71}, pos: {zonePosX: 838, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            25: {size: {w: 77, h: 71}, pos: {zonePosX: 758, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            17: {size: {w: 77, h: 71}, pos: {zonePosX: 665, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            34: {size: {w: 77, h: 71}, pos: {zonePosX: 586, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            6: {size: {w: 77, h: 71}, pos: {zonePosX: 506, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            27: {size: {w: 77, h: 71}, pos: {zonePosX: 413, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            13: {size: {w: 77, h: 71}, pos: {zonePosX: 333, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            36: {size: {w: 77, h: 71}, pos: {zonePosX: 254, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            11: {size: {w: 82, h: 73}, pos: {zonePosX: 170, zonePosY: 293}, hoverTexture: "inner_sector_11"},
            30: {size: {w: 102, h: 92}, pos: {zonePosX: 84, zonePosY: 270}, hoverTexture: "inner_sector_30"},
            8: {size: {w: 108, h: 88}, pos: {zonePosX: 27, zonePosY: 230}, hoverTexture: "inner_sector_8"},
            23: {size: {w: 92, h: 71}, pos: {zonePosX: 9, zonePosY: 188}, hoverTexture: "inner_sector_23"}
        };
    ha = ha.concat(a.mainFLGAccount.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, "images/logo.json", ha, function (b, g, e) {
        a.mainRenderer.createButton(void 0,
            0, 0, "bg");
        T = new Y(a);
        b = a.mainRenderer.createButton(B, -910, 490, "btn_video_load");
        b.anchor.set(.5, .5);
        b.scale.set(1.75, 1.75);
        b = a.mainRenderer.createButton(B, -910, 490, "video_frame");
        b.anchor.set(.5, .5);
        b.scale.set(.95, 1);
        b.visible = !1;
        a.mainRenderer.createButton(B, -1800, 350, void 0, {
            text: mainLocalizationTable.nowLive.toUpperCase(),
            align: "center",
            style: {font: "36px Arial Narrow", fill: "#fe0000", align: "center"}
        });
        b = a.mainRenderer.createButton(B, -1920, 400, "btn_video_return");
        a.mainRenderer.createButton(b, 0,
            0, "btn_video_return_mode_selected", void 0, function (d, f) {
                a.mainSoundManager.playSound("buttonClick");
                f.stopped = !0;
                M(d, "btn_video_return");
                a.mainUIManager.setVideoVisibility(!1);
                v.setVideoBtnsVisibility(!1);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (d) {
                ca(d, "btn_video_return")
            }, function (d) {
                ba(d, "btn_video_return")
            }).alpha = 0;
        b = a.mainRenderer.createButton(B, -1920, 400, "btn_video_return_sectors");
        a.mainRenderer.createButton(b, 0, 0, "btn_video_return_sectors_mode_selected", void 0,
            function (d, f) {
                a.mainSoundManager.playSound("buttonClick");
                f.stopped = !0;
                M(d, "btn_video_return");
                a.mainUIManager.setVideoVisibility(!1);
                v.setVideoBtnsVisibility(!1);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (d) {
                ca(d, "btn_video_return")
            }, function (d) {
                ba(d, "btn_video_return")
            }).alpha = 0;
        b.visible = !1;
        G.addChild(w);
        a.mainRenderer.createButton(w, 40, 178, "table_bg_main");
        w.getChildByName("table_bg_main").scale.set(1.13, 1.13);
        a.mainRenderer.createButton(w, 40, 178, "table_disable_main").visible =
            !1;
        w.getChildByName("table_disable_main").scale.set(1.13, 1.13);
        a.mainRenderer.createButton(G, 167, 610, "table_bg_footer");
        G.getChildByName("table_bg_footer").scale.set(1.13, 1.13);
        a.mainRenderer.createButton(G, 167, 610, "table_disable_footer").visible = !1;
        G.getChildByName("table_disable_footer").scale.set(1.13, 1.13);
        b = a.mainRenderer.createButton(w, 1780, 680, "btn_switch_sectors");
        a.mainRenderer.createButton(b, 0, 0, "btn_switch_sectors_mode_selected", void 0, function (d, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            M(d, "btn_switch_sectors");
            a.mainUIManager.switchGridMode(!0);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (d) {
            ca(d, "btn_switch_sectors")
        }, function (d) {
            ba(d, "btn_switch_sectors")
        }).alpha = 0;
        a.mainRenderer.createButton(w, 164, -721, "table_bg_sectors");
        a.mainRenderer.createButton(w, 460, -515, void 0, {
            text: "Serie\n5/8",
            align: "center",
            style: {font: "56px Century725", fill: "#cfaf80", align: "center"}
        }).anchor.set(.5, .5);
        a.mainRenderer.createButton(w, 840, -515, void 0, {
            text: "Orph",
            align: "center", style: {font: "56px Century725", fill: "#cfaf80", align: "center"}
        }).anchor.set(.5, .5);
        a.mainRenderer.createButton(w, 1190, -515, void 0, {
            text: "Serie\n0/2/3",
            align: "center",
            style: {font: "56px Century725", fill: "#cfaf80", align: "center"}
        }).anchor.set(.5, .5);
        b = a.mainRenderer.createButton(w, 1510, -515, void 0, {
            text: "Zero",
            align: "center",
            style: {font: "56px Century725", fill: "#cfaf80", align: "center"}
        });
        b.anchor.set(.5, .5);
        b.rotation = -Math.PI / 2;
        w.getChildByName("table_bg_sectors").scale.set(1.13, 1.13);
        a.mainRenderer.createButton(w,
            164, -721, "table_disable_sectors").visible = !1;
        w.getChildByName("table_disable_sectors").scale.set(1.13, 1.13);
        b = a.mainRenderer.createButton(w, 1780, -226, "btn_switch_grid");
        a.mainRenderer.createButton(b, 0, 0, "btn_switch_grid_mode_selected", void 0, function (d, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            M(d, "btn_switch_grid");
            a.mainUIManager.switchGridMode(!1);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (d) {
            ca(d, "btn_switch_grid")
        }, function (d) {
            ba(d, "btn_switch_grid")
        }).alpha =
            0;
        b = new PIXI.Graphics;
        b.position.set(0, 0);
        b.beginFill(0);
        b.drawRect(0, 150, 1920, 1080);
        b.endFill;
        G.mask = b;
        b = null;
        v = new function (d) {
            this.destroy = function () {
                a.mainFLGAccount.events.off("onBalance", m);
                m = null;
                c.$winRebet.unbind("click", ta);
                c.$winRebetx2.unbind("click", sa);
                c.$winDOM.off("click", ".btn-control-selected-mobile");
                for (var n in c) c[n].remove(), c[n] = null;
                c = null;
                for (n in t) t[n].remove(), t[n] = null;
                t = null;
                for (n in r) r[n].remove(), r[n] = null;
                r = null;
                for (n in k) k[n].remove(), k[n] = null;
                k = null;
                l.$btnControlsHome.unbind("click",
                    wa);
                l.$btnControlsVideo.unbind("click", aa);
                l.$btnControlsNoVideo.unbind("click", aa);
                l.$btnControlsRebet.unbind("click", va);
                l.$btnControlsRebetx2.unbind("click", ua);
                l.$btnControlsDouble.unbind("click", ra);
                l.$btnControlsClear.unbind("click", qa);
                l.$btnControlsUndo.unbind("click", pa);
                l.$btnControlsMyBets.unbind("click", oa);
                l.$btnControlsChips.off("click", ".Chip_component_2UVTI", clickChip).off("mouseenter", ".Chip_component_2UVTI", enterChip).off("mouseleave", ".Chip_component_2UVTI", leaveChip);
                l.$btnControlsDOM.off("click",
                    ".btn-control-selected-mobile");
                for (n in l) l[n].remove(), l[n] = null;
                W = Ha = y = p = q = h = l = null;
                window.removeEventListener("resize", R);
                d.unbind("parentResized", R);
                R = null;
                for (n in f) f[n] = null;
                f = null
            };
            var f = this, c = {}, m, h = function () {
                c.$winDOM = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; line-height: 1.4285em; top: 0; left: 0; width: 1920px; height: 1080px; z-index: 60000; visibility: hidden; transform-origin : 50% 0%;"></div>');
                d.append(c.$winDOM);
                c.$winBG = $('<div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-color: black;opacity: 0.65;"></div>');
                c.$winDOM.append(c.$winBG);
                c.$winBall = $('<div class="win-ball-red" style="position: absolute;display: flex; justify-content:center; align-items: center;left: 13%;top: 23%;width: 512px; height: 507px;"></div>');
                c.$winDOM.append(c.$winBall);
                c.$winBallTxt = $('<div style="position: absolute; top: 42%;font-size: 266px; color: #d9b57c; font-family: Century725 Bold;">16</div>');
                c.$winBall.append(c.$winBallTxt);
                c.$winBallWinTxt = $('<div style="position: absolute;bottom: 19%;font-size: 54px;color: #fb130d;font-family: Arial;">WIN</div>');
                c.$winBall.append(c.$winBallWinTxt);
                c.$winTicket = $('<div style="position: absolute;display: flex; justify-content:center; align-items: center;left: 55%;width: 660px; height: 499px; background: url(' + a.gameDirMobile + 'win-ticket.png) no-repeat 100% 100%;"></div>');
                c.$winDOM.append(c.$winTicket);
                c.$winDOMBet = $('<div style="position: absolute; top: 37px; font-size: 40px; color: #be9e6f; font-family: Arial Narrow;">' + mainLocalizationTable.bet.toUpperCase() + "</div>");
                c.$winTicket.append(c.$winDOMBet);
                c.$winDOMBetTxt =
                    $('<div style="position: absolute; top: 100px; font-size: 60px; color: #be9e6f; font-family: Arial Narrow;">500.00</div>');
                c.$winTicket.append(c.$winDOMBetTxt);
                c.$winDOMWinTxt = $('<div style="position: absolute; bottom: 260px; font-size: 108px; color: #e0c59d; font-family: Arial Narrow;">200.00</div>');
                c.$winTicket.append(c.$winDOMWinTxt);
                c.$winDOMWin = $('<div style="position: absolute; bottom: 175px; font-size: 40px; color: #e0c59d; font-family: Arial Narrow;">' + mainLocalizationTable.win.toUpperCase() +
                    "</div>");
                c.$winTicket.append(c.$winDOMWin);
                c.$winDOMBalanceTxt = $('<div style="position: absolute; bottom: 76px; font-size: 50px; color: #be9e6f; font-family: Arial Narrow;"></div>');
                c.$winTicket.append(c.$winDOMBalanceTxt);
                c.$winDOMBalance = $('<div style="position: absolute; bottom: 17px; font-size: 40px; color: #be9e6f; font-family: Arial Narrow;">' + mainLocalizationTable.balance + "</div>");
                c.$winTicket.append(c.$winDOMBalance);
                m = function (n) {
                    c.$winDOMBalanceTxt.text("DEMO" == clientInfoGlobal.hall ? "" :
                        formatFLGNums(n))
                };
                a.mainFLGAccount.events.on("onBalance", m);
                c.$winRebet = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; bottom: 180px; left: 895px; width: 78px; height: 69px; transform: scale(1.3);"><div style="width: 78px; height: 69px; background: url(' + a.gameDirMobile + 'btn-rebet-min.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected-mobile" style="position: absolute; width: 78px; height: 69px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' +
                    a.gameDirMobile + 'btn-rebet-mode-selected-min.png) no-repeat 100% 100%;"></div></div>');
                c.$winRebet.bind("click", ta);
                c.$winDOM.append(c.$winRebet);
                c.$winRebetDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; bottom: 115px; left: 839px; width: 200px; color: #ae9268; font-family: Arial Narrow; font-size: 40px; transform: translateZ(0);"><span>' + mainLocalizationTable.repeat + "</span></div>");
                c.$winDOM.append(c.$winRebetDesc);
                c.$winRebetx2 = $('<div id="winRebetx2" style="position: absolute; display: flex; justify-content:center; align-items: center; bottom: 180px; left: 1075px; width: 105px; height: 69px; transform: scale(1.3);"><div style="width: 105px; height: 69px; background: url(' +
                    a.gameDirMobile + 'btn-rebetx2-min.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected-mobile" style="position: absolute; width: 105px; height: 69px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDirMobile + 'btn-rebetx2-mode-selected-min.png) no-repeat 100% 100%;"></div></div>');
                c.$winRebetx2.bind("click", sa);
                c.$winDOM.append(c.$winRebetx2);
                c.$winRebetx2Desc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; bottom: 115px; left: 997px; width: 260px; color: #ae9268; font-family: Arial Narrow; font-size: 40px; transform: translateZ(0);"><span>' +
                    mainLocalizationTable.repeatx2 + "</span></div>");
                c.$winDOM.append(c.$winRebetx2Desc);
                c.$winDOM.on("click", ".btn-control-selected-mobile", function () {
                    if (!$(this).hasClass("btn-control-selected-mobile-active")) {
                        $(this).addClass("btn-control-selected-mobile-active");
                        var n = this;
                        setTimeout(function () {
                            $(n).removeClass("btn-control-selected-mobile-active")
                        }, 350)
                    }
                })
            };
            h();
            var r = {}, p = function () {
                r.$timerDOM = $('<div id="timerContainer" style="visibility: hidden; position: absolute; display: flex; justify-content: center; align-items: center; top: 0; left: 0; width: 1920px; height: 51px; z-index: 70000; background-color: black; transform-origin : 50% 0%;"><span class="timerSec timerBlack" style="color: #bcbcbc; font-size: 36px; font-family: Arial Narrow, sans-serif; margin-left: 35px; flex-basis: 20%;">00:00</span><span class="timerDesc timerBlack" style="color: #bcbcbc; font-size: 36px; font-family: Arial Narrow, sans-serif; flex: 3 1 auto; text-align: center;"></span><span class="timerBlack" style="color: #bcbcbc; font-size: 36px; font-family: Arial Narrow, sans-serif; margin-right: 35px; flex-basis: 20%; text-align: right;">Live Roulette</span><div id="timerRow" style="position: absolute; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background-color: #4da362; clip-path: inset(0px 1920px 0px 0px); -webkit-clip-path: inset(0px 1920px 0px 0px); opacity: 1;"><span class="timerSec" style="color: #000000; font-size: 36px; font-family: Arial Narrow, sans-serif; margin-left: 35px; flex-basis: 20%;">00:00</span><span class="timerDesc" style="color: #000000; font-size: 36px; font-family: Arial Narrow, sans-serif; flex: 3 1 auto; text-align: center;"></span><span style="color: #000000; font-size: 36px; font-family: Arial Narrow, sans-serif; margin-right: 35px; flex-basis: 20%; text-align: right;">Live Roulette</span></div></div>');
                d.append(r.$timerDOM)
            };
            p();
            this.timerDOM = r.$timerDOM;
            var k = {}, q = function () {
                k.$videoFrameDOM = $('<div id="videoFrameSep" style="visibility: hidden; position: absolute; background: url(' + a.gameDirMobile + "video-frame.png) no-repeat 100% 100%; background-size: contain; z-index: 10005; width:1149.3405495px;height:" + .83 * 876.15 + 'px;top:0;left:0;transform-origin : 50% 0%;"></div>');
                d.append(k.$videoFrameDOM)
            };
            q();
            var t = {}, y = function () {
                t.$historyDOM = $('<div id="historyContainer" style="visibility: hidden; position:absolute; display: flex; justify-content: center; align-items: center; top: 50px; left: 0px; width: 1920px; height: 100px; z-index: 50000; transform-origin : 51% 0%;"></div>');
                for (var n = 22; 7 < n; n--) 22 == n ? t.$historyItem22 = $('<div class="history-ball" style="flex-basis: 88px;display: flex;align-items: center;justify-content: center;width: 86px; height: 86px;"><div class="history-ball-black-mobile" id="historyBall' + n + '" style="width: 86px; height: 86px; position: absolute;"></div><div id="historyBallText' + n + '" style="font-size: 64px; font-weight: bold; font-family: Arial; color: #dfb47f; position:absolute;"></div></div>') : t["$historyItem" + n] = $('<div class="history-ball" style="flex-basis: 78px;display: flex;align-items: center;justify-content: center; width: 68px; height: 68px;"><div class="history-ball-black-mobile" id="historyBall' +
                    n + '" style="width: 68px; height: 68px; position: absolute;"></div><div id="historyBallText' + n + '" style="font-size: 49px; font-weight: bold; font-family: Arial; color: #dfb47f; position: absolute;"></div></div>'), t.$historyDOM.append(t["$historyItem" + n]);
                d.append(t.$historyDOM)
            };
            y();
            this.setHistoryItem = function (n, C, z) {
                void 0 != C ? (t["$historyItem" + n].find("#historyBallText" + n).text(C), t["$historyItem" + n].find("#historyBall" + n).attr("class", "history-ball-" + z + "-mobile"), t["$historyItem" + n].css("visibility",
                    "visible")) : t["$historyItem" + n].css("visibility", "hidden")
            };
            var l = {}, Ha = function () {
                l.$btnControlsDOM = $('<div id="btnControls" style="visibility: hidden; position: fixed; line-height: 1.4285em; bottom: 0; left: 0; width: 1920px; height: 242px; z-index: 50000; transform-origin : 50% 100%;"></div>');
                l.$btnControlsBackground = $('<div class="unselectable" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.45; background-color: black;"></div>');
                l.$btnControlsDOM.append(l.$btnControlsBackground);
                l.$btnControlsHome = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 16px; left: 15px; width: 153px; height: 130px; cursor: pointer;"><div style="width: 103px; height: 80px; background: url(' + a.gameDirMobile + 'btn-home.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected-mobile" style="position: absolute; width: 103px; height: 80px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDirMobile +
                    'btn-home-mode-selected.png) no-repeat 100% 100%;"></div></div>');
                APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && l.$btnControlsHome && l.$btnControlsHome.css("visibility", clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl ? "visible" : "hidden");
                l.$btnControlsHome.bind("click", wa);
                l.$btnControlsDOM.append(l.$btnControlsHome);
                l.$btnControlsVideo = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 27px; left: 180px; width: 140px; height: 116px; cursor: pointer;"><div style="width: 90px; height: 66px; background: url(' +
                    a.gameDirMobile + 'btn-video1.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected-mobile" style="position: absolute; width: 90px; height: 66px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDirMobile + 'btn-video1-mode-selected.png) no-repeat 100% 100%;"></div></div>');
                l.$btnControlsVideo.bind("click", function () {
                    aa(!0)
                });
                l.$btnControlsDOM.append(l.$btnControlsVideo);
                l.$btnControlsVideoDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 200px; width: 100px; color: #ae9268; font-family: Arial Narrow; font-size: 34px; transform: translateZ(0);"><span>Live</span></div>');
                l.$btnControlsDOM.append(l.$btnControlsVideoDesc);
                l.$btnControlsNoVideo = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 27px; left: 180px; width: 140px; height: 116px; cursor: pointer;visibility: hidden"><div style="width: 90px; height: 66px; background: url(' + a.gameDirMobile + 'btn-novideo.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected-mobile" style="position: absolute; width: 90px; height: 66px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' +
                    a.gameDirMobile + 'btn-novideo-mode-selected.png) no-repeat 100% 100%;"></div></div>');
                l.$btnControlsNoVideo.bind("click", function () {
                    aa(!1)
                });
                l.$btnControlsDOM.append(l.$btnControlsNoVideo);
                "DEMO" != clientInfoGlobal.hall && (l.$btnControlsMyBets = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 42px; left: 210px;/*392*/ width: 66px; height: 75px; cursor: pointer;"><div style="width: 66px; height: 75px; background: url(' + a.gameDirMobile + 'btn-my-bets.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected-mobile" style="position: absolute; width: 66px; height: 75px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' +
                    a.gameDirMobile + 'btn-my-bets-selected.png) no-repeat 100% 100%;"></div></div>'), l.$btnControlsMyBets.bind("click", oa), l.$btnControlsMyBetsDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 155px;/*342*/ width: 176px; color: #ae9268; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' + mainLocalizationTable.myBets + "</span></div>"));
                l.$btnControlsRebet = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 20px; left: 1460px; width: 128px; height: 119px; cursor: pointer;"><div style="width: 78px; height: 69px; background: url(' +
                    a.gameDirMobile + 'btn-rebet-min.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected-mobile" style="position: absolute; width: 78px; height: 69px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDirMobile + 'btn-rebet-mode-selected-min.png) no-repeat 100% 100%;"></div></div>');
                l.$btnControlsRebet.bind("click", va);
                l.$btnControlsDOM.append(l.$btnControlsRebet);
                l.$btnControlsRebetDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 1474px; width: 100px; color: #ae9268; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' +
                    mainLocalizationTable.repeat + "</span></div>");
                l.$btnControlsDOM.append(l.$btnControlsRebetDesc);
                l.$btnControlsRebetx2 = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 20px; left: 1607px; width: 155px; height: 119px; cursor: pointer;"><div style="width: 105px; height: 69px; background: url(' + a.gameDirMobile + 'btn-rebetx2-min.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected-mobile" style="position: absolute; width: 105px; height: 69px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' +
                    a.gameDirMobile + 'btn-rebetx2-mode-selected-min.png) no-repeat 100% 100%;"></div></div>');
                l.$btnControlsRebetx2.bind("click", ua);
                l.$btnControlsRebetx2Desc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 1613px; width: 142px; color: #ae9268; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' + mainLocalizationTable.repeatx2 + "</span></div>");
                l.$btnControlsDouble = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 23px; left: 1607px; width: 150px; height: 113px; cursor: pointer;"><div style="width: 100px; height: 63px; background: url(' +
                    a.gameDirMobile + 'btn-rebetx2-min.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected-mobile" style="position: absolute; width: 100px; height: 63px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDirMobile + 'btn-rebetx2-mode-selected-min.png) no-repeat 100% 100%;"></div></div>');
                l.$btnControlsDouble.bind("click", ra);
                l.$btnControlsDOM.append(l.$btnControlsDouble);
                l.$btnControlsDoubleDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 1627px; width: 110px; color: #ae9268; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' +
                    mainLocalizationTable.double + "</span></div>");
                l.$btnControlsDOM.append(l.$btnControlsDoubleDesc);
                l.$btnControlsUndo = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 25px; left: 465px; width: 132px; height: 109px; cursor: pointer;"><div style="width: 82px; height: 59px; background: url(' + a.gameDirMobile + 'btn-undo4.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected-mobile" style="position: absolute; width: 82px; height: 59px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' +
                    a.gameDirMobile + 'btn-undo-mode-selected4.png) no-repeat 100% 100%;"></div></div>');
                l.$btnControlsUndo.bind("click", pa);
                l.$btnControlsDOM.append(l.$btnControlsUndo);
                l.$btnControlsUndoDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 481px; width: 100px; color: #ae9268; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' + mainLocalizationTable.undo + "</span></div>");
                l.$btnControlsDOM.append(l.$btnControlsUndoDesc);
                l.$btnControlsClear = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 17px; left: 335px; width: 116px; height: 125px; cursor: pointer;"><div style="width: 66px; height: 75px; background: url(' + a.gameDirMobile + 'btn-clear.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected-mobile" style="position: absolute; width: 66px; height: 75px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDirMobile +
                    'btn-clear-mode-selected.png) no-repeat 100% 100%;"></div></div>');
                l.$btnControlsClear.bind("click", qa);
                l.$btnControlsDOM.append(l.$btnControlsClear);
                l.$btnControlsClearDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 343px; width: 100px; color: #ae9268; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' + mainLocalizationTable.delete + "</span></div>");
                l.$btnControlsDOM.append(l.$btnControlsClearDesc);
                l.$btnControlsChips =
                    $('<div class="ChipTray_chips_3E1bN" style="position: absolute; display: flex; justify-content:center; align-items: center; top: 40px; left: 630px; width: 800px; font-family: Book Antiqua, sans-serif;"><div style="display: flex;"><div data-automation-id="chip-yellow" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_1" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_yellow_3DAOA"><div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE"><svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m Chip_label_2--9m_MOBILE">' +
                        D(A.possibleBets[0]) + '</div></div></div></div><div data-automation-id="chip-orange" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_2" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_orange_2sdQr chip_active Chip_isSelected_1qLig"><div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE"><svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m Chip_label_2--9m_MOBILE">' +
                        D(A.possibleBets[1]) + '</div></div></div></div><div data-automation-id="chip-blue" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_3" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_grey_2sdQr"><div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE"><svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m Chip_label_2--9m_MOBILE">' +
                        D(A.possibleBets[2]) + '</div></div></div></div><div data-automation-id="chip-red" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_4" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_red_2PdQZ"><div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE"><svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m Chip_label_2--9m_MOBILE">' +
                        D(A.possibleBets[3]) + "</div></div></div></div>" + (A.possibleBets[4] ? '<div data-automation-id="chip-green" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_5" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_green_l17VV"><div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE"><svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m Chip_label_2--9m_MOBILE">' +
                            D(A.possibleBets[4]) + "</div></div></div></div>" : "") + (A.possibleBets[5] ? '<div data-automation-id="chip-purple" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_6" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_blue_2zyvu"><div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE"><svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m Chip_label_2--9m_MOBILE" style="font-size: 24px;">' +
                            A.possibleBets[5] + "</div></div></div></div>" : "") + "</div></div>");
                l.$btnControlsChips.on("click", ".Chip_component_2UVTI", function () {
                    $(this).hasClass("Chip_isDisabled_2RK_o") || $(this).hasClass("chip_active") || (clickChip(this), Ga($(this).find(".Chip_label_2--9m").text(), $(this).attr("id")))
                }).on("mouseenter", ".Chip_component_2UVTI", function () {
                    $(this).hasClass("Chip_isDisabled_2RK_o") || $(this).hasClass("chip_active") || enterChip(this)
                }).on("mouseleave", ".Chip_component_2UVTI", function () {
                    $(this).hasClass("Chip_isDisabled_2RK_o") ||
                    $(this).hasClass("chip_active") || leaveChip(this)
                });
                l.$btnControlsDOM.on("click", ".btn-control-selected-mobile", function () {
                    if (!$(this).hasClass("btn-control-selected-mobile-active")) {
                        $(this).addClass("btn-control-selected-mobile-active");
                        var n = this;
                        setTimeout(function () {
                            $(n).removeClass("btn-control-selected-mobile-active")
                        }, 130)
                    }
                });
                T.setMode({modeName: A.possibleBets[1], modeSprite: {name: "chip_2"}});
                l.$btnControlsDOM.append(l.$btnControlsChips);
                l.$btnControlsDOM.append('\n                    <div class="kEqual1000 kEqual1000-mobile">K = 1000</div>');
                d.append(l.$btnControlsDOM)
            };
            Ha();
            this.setChipsInteraction = function (n) {
                $(".Chip_component_2UVTI").each(function () {
                    n ? ($(this).removeClass("Chip_isDisabled_2RK_o"), $(this).hasClass("chip_active") && $(this).addClass("Chip_isSelected_1qLig")) : ($(this).addClass("Chip_isDisabled_2RK_o"), $(this).hasClass("chip_active") && $(this).removeClass("Chip_isSelected_1qLig"))
                })
            };
            this.setBtnControlsInteraction = function (n) {
                n ? (l.$btnControlsRebet.removeClass("btn_disabled"), l.$btnControlsRebetx2.removeClass("btn_disabled"),
                    l.$btnControlsDouble.removeClass("btn_disabled"), l.$btnControlsUndo.removeClass("btn_disabled"), l.$btnControlsClear.removeClass("btn_disabled"), c.$winRebetx2.removeClass("btn_disabled"), c.$winRebet.removeClass("btn_disabled")) : (l.$btnControlsRebet.addClass("btn_disabled"), l.$btnControlsRebetx2.addClass("btn_disabled"), l.$btnControlsDouble.addClass("btn_disabled"), l.$btnControlsUndo.addClass("btn_disabled"), l.$btnControlsClear.addClass("btn_disabled"), c.$winRebetx2.addClass("btn_disabled"), c.$winRebet.addClass("btn_disabled"))
            };
            this.setRebetInteraction = function (n) {
                n ? (l.$btnControlsRebet.removeClass("btn_disabled"), l.$btnControlsRebetx2.removeClass("btn_disabled"), c.$winRebetx2.removeClass("btn_disabled"), c.$winRebet.removeClass("btn_disabled")) : (l.$btnControlsRebet.addClass("btn_disabled"), l.$btnControlsRebetx2.addClass("btn_disabled"), c.$winRebetx2.addClass("btn_disabled"), c.$winRebet.addClass("btn_disabled"))
            };
            this.setVideoBtnsVisibility = function (n) {
                l.$btnControlsNoVideo.css("visibility", n ? "visible" : "hidden");
                l.$btnControlsVideo.css("visibility",
                    n ? "hidden" : "visible")
            };
            this.slideBtnControls = function (n) {
                l.$btnControlsDOM.attr("toBottom", n);
                R(!0)
            };
            this.setWinVisibility = function (n, C, z, N) {
                n && 0 < a.mainFLGAccount.totalWin() ? (c.$winDOMBetTxt.text(formatFLGNums(a.mainFLGAccount.totalBet())), c.$winDOMWinTxt.text(formatFLGNums(a.mainFLGAccount.totalWin())), c.$winBallTxt.text(z), c.$winBall.attr("class", "win-ball-" + N), setTimeout(function () {
                    c.$winDOM.css("visibility", "visible")
                }, C)) : c.$winDOM.css("visibility", "hidden")
            };
            this.setDOMVisibility = function (n) {
                l.$btnControlsDOM.css("visibility",
                    n ? "visible" : "hidden");
                r.$timerDOM.css("visibility", n ? "visible" : "hidden");
                t.$historyDOM.css("visibility", n ? "visible" : "hidden")
            };
            this.setVideoFrameVisibility = function (n) {
                k.$videoFrameDOM.css("visibility", n ? "visible" : "hidden")
            };
            this.slideWin = function (n) {
                c.$winDOM.attr("toBottom", n);
                R(!0)
            };
            var W = function (n) {
                n.addClass("unselectable").attr("unselectable", "on").attr("draggable", "false").on("dragstart", function (C) {
                    C.preventDefault()
                }).on("touchmove", function (C) {
                    C.preventDefault()
                });
                n.find("*").attr("draggable",
                    "false").attr("unselectable", "on")
            };
            W(c.$winDOM);
            W(l.$btnControlsDOM);
            W(r.$timerDOM);
            W(k.$videoFrameDOM);
            W(t.$historyDOM);
            var R = function (n) {
                var C = d.find("canvas"), z = C.attr("width"), N = parseFloat(C.css("width")),
                    Ia = parseFloat(C.css("height"));
                z = N / z;
                var xa = (l.$btnControlsDOM.width() - l.$btnControlsDOM.width() * z) / 2,
                    Ja = (c.$winDOM.width() - c.$winDOM.width() * z) / 2;
                C = (k.$videoFrameDOM.width() - k.$videoFrameDOM.width() * z) / 2;
                k.$videoFrameDOM.height();
                k.$videoFrameDOM.height();
                var na = (d.width() - N) / 2;
                N = (d.height() -
                    Ia) / 2;
                l.$btnControlsDOM.css({
                    left: -xa + na + "px",
                    bottom: N + ("true" == l.$btnControlsDOM.attr("toBottom") ? -1 : 0) + "px",
                    transition: 1 == n ? "bottom .2s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    "-webkit-transition": 1 == n ? "bottom .2s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    transform: "scale(" + z + ")"
                });
                r.$timerDOM.css({left: -xa + na + "px", top: N + "px", transform: "scale(" + z + ")"});
                t.$historyDOM.css({left: -xa + na + "px", top: N + 51 * z + "px", transform: "scale(" + z + ")"});
                c.$winDOM.css({
                    left: -Ja + na + "px",
                    top: N + ("true" == c.$winDOM.attr("toBottom") ?
                        195 * z : 0) + "px",
                    transition: 1 == n ? "top .5s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    "-webkit-transition": 1 == n ? "top .5s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    transform: "scale(" + z + ")"
                });
                n = 661.51 * 1.65 * z * 1.053;
                n = (d.width() - n) / 2;
                k.$videoFrameDOM.css({
                    left: -C + n - 1 + 18 + "px",
                    top: 92 * z + N + "px",
                    transform: "scale(" + z + ")"
                })
            };
            window.addEventListener("resize", R, !1);
            d.bind("parentResized", R);
            R()
        }($("#" + a.gameConfig.canvasId));
        a.mainRenderer.createButton(H, 1886, 88, void 0, {
            text: mainLocalizationTable.totalBet, align: "right",
            style: {font: "40px Arial Narrow", fill: "#cfaf80"}
        }).name = "betSprite";
        a.mainRenderer.createButton(H, 1886, 143, void 0, {
            text: formatFLGNums(a.mainFLGAccount.totalBet()),
            align: "right",
            style: {font: "50px Arial Narrow", fill: "#cfaf80"}
        }).name = "betTxt";
        ka = function (d) {
            H.getChildByName("betTxt").children[0].text = U(d)
        };
        a.mainFLGAccount.events.on("onBet", ka);
        a.mainRenderer.createButton(H, 33, 88, void 0, {
            text: mainLocalizationTable.balance,
            align: "left",
            style: {font: "40px Arial Narrow", fill: "#cfaf80"}
        }).name = "balanceSprite";
        a.mainRenderer.createButton(H, 33, 143, void 0, {
            text: "DEMO" == clientInfoGlobal.hall ? mainLocalizationTable.demo : formatFLGNums(a.mainFLGAccount.balance()),
            align: "left",
            style: {font: "50px Arial Narrow", fill: "#cfaf80"}
        }).name = "balanceTxt";
        la = function (d) {
            H.getChildByName("balanceTxt").children[0].text = "DEMO" == clientInfoGlobal.hall ? mainLocalizationTable.demo : U(d)
        };
        a.mainFLGAccount.events.on("onBalance", la);
        a.mainRenderer.stage.addChild(Ca);
        H.addChild(B);
        H.addChild(G);
        a.mainRenderer.stage.addChild(H);
        T.addDragSprite();
        a.mainRenderer.stage.addChild(Ba);
        a.setMainGrid(new FortuneGrid(170, 198, 12, 3, w, a.mainRenderer));
        b = function (d, f, c) {
            const {mainGrid: m, mainUIManager: h} = a;
            f || (m.gridContainer.down = !0);
            var r = a.mainGrid.uiButtonsContainer.getChildByName(d.name);
            const p = a.mainGrid.uiGridContainer.getChildByName(d.name);
            if (f && a.mainGrid.gridContainer.down || !f && !c || c && (d.name != Q || void 0 == Q)) {
                f = 40 <= d.name && 48 >= d.name ? r.getChildByName("smallChipText") ? parseFloat(r.getChildByName("smallChipText").text) : 0 : p.getChildByName("smallChipText") ?
                    parseFloat(p.getChildByName("smallChipText").text) : 0;
                f = parseFloat(A.currentBet({comb: d.name, curSumm: f}));
                if (!P.isAllowBet({
                    comb: parseInt(d.name),
                    coef: void 0,
                    summ: f
                }, m.pressedZones[d.name] ? m.pressedZones[d.name].bet + f : f) || 0 == f || -1 == a.mainFLGAccount.totalBet(f)) return;
                40 <= d.name && 48 >= d.name ? h.createSmallChip(r, f) : (h.createSmallChip(p, f), 36 >= d.name && h.createSmallChip(m.uiSectorsContainer.getChildByName(d.name), f));
                const k = (m.buttonsContainer.getChildByName(d.name) || {}).selected,
                    q = (m.gridContainer.getChildByName(d.name) ||
                        {}).selected;
                40 <= d.name && 48 >= d.name && k || (40 > d.name || 48 < d.name) && q ? (a.mainSoundManager.playSound("stackChip"), r = 40 <= d.name && 48 >= d.name ? r.getChildByName("smallChipText").text : p.getChildByName("smallChipText").text, a.mainGrid.pressedZones[d.name].bet = parseFloat(K(r)), a.mainGrid.pressedZones[d.name].spread.main += f) : (a.mainSoundManager.playSound("firstChip"), 40 <= d.name && 48 >= d.name ? m.buttonsContainer.getChildByName(d.name).selected = !0 : m.gridContainer.getChildByName(d.name).selected = !0, m.pressedZones[d.name] =
                    {
                        zone: 40 <= d.name && 48 >= d.name ? r : p,
                        bet: f,
                        coef: h.defineCoefForBet(d),
                        spread: {sectors: {}, main: f}
                    });
                a.mainUIManager.defineZonesForBet(d, .35, O, f * parseFloat(m.pressedZones[d.name].coef))
            }
            c && (Q = d.name);
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        g = function (d) {
            a.mainGrid.gridContainer.down && x.addGridState();
            a.mainGrid.gridContainer.down = !1;
            a.mainGrid.zonesOut();
            Q = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        a.mainGrid.createZonesRoulette4K({w: 115, h: 115}, {w: 110, h: 364}, {x: 2.6, y: 2}, b, g);
        a.mainGrid.createFooter({
            posX: 168,
            posY: 598
        }, G, {x: 2.6, y: 2}, b, g);
        a.mainGrid.createSectors({posX: 164, posY: -721}, Ea, Fa, function (d, f, c) {
            f || (a.mainGrid.gridContainer.down = !0);
            if (f && a.mainGrid.gridContainer.down || !f && !c || c && (d.name != Q || void 0 == Q)) {
                f = a.mainGrid.sectorCombinations[d.name] ? a.mainGrid.sectorCombinations[d.name] : a.mainGrid.sectorButtonCombinations[d.name].zones;
                for (var m = 0; m < f.length; m++) {
                    var h = a.mainGrid.uiGridContainer.getChildByName(f[m]).getChildByName("smallChipText") ? parseFloat(a.mainGrid.uiGridContainer.getChildByName(f[m]).getChildByName("smallChipText").text) :
                        0;
                    h = parseFloat(A.currentBet({comb: f[m], curSumm: h}));
                    if (!P.isAllowBet({
                        comb: parseInt(f[m]),
                        coef: void 0,
                        summ: h
                    }, a.mainGrid.pressedZones[f[m]] ? a.mainGrid.pressedZones[f[m]].bet + h : h) || 0 == h || -1 == a.mainFLGAccount.totalBet(h)) return;
                    a.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(f[m]), h);
                    49 <= d.name && 52 >= d.name ? a.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(d.name), h) : a.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(f[m]),
                        h);
                    if (a.mainGrid.gridContainer.getChildByName(f[m]).selected) a.mainSoundManager.playSound("stackChip"), a.mainGrid.pressedZones[f[m]].bet = parseFloat(a.mainGrid.uiGridContainer.getChildByName(f[m]).getChildByName("smallChipText").text), a.mainGrid.sectorCombinations[d.name] ? a.mainGrid.pressedZones[f[m]].spread.main += h : a.mainGrid.pressedZones[f[m]].spread.sectors[d.name] = a.mainGrid.pressedZones[f[m]].spread.sectors[d.name] ? a.mainGrid.pressedZones[f[m]].spread.sectors[d.name] + h : h; else {
                        a.mainSoundManager.playSound("firstChip");
                        a.mainGrid.gridContainer.getChildByName(f[m]).selected = !0;
                        var r = {};
                        a.mainGrid.sectorCombinations[d.name] || (r[d.name] = h);
                        a.mainGrid.pressedZones[f[m]] = {
                            zone: a.mainGrid.uiGridContainer.getChildByName(f[m]),
                            bet: h,
                            coef: a.mainUIManager.defineCoefForBet(a.mainGrid.gridContainer.getChildByName(f[m])),
                            spread: a.mainGrid.sectorCombinations[d.name] ? {sectors: r, main: h} : {
                                sectors: r,
                                main: 0
                            }
                        }
                    }
                    a.mainUIManager.defineZonesForBet(a.mainGrid.gridContainer.getChildByName(f[m]), .35, O, h * parseFloat(a.mainGrid.pressedZones[f[m]].coef))
                }
            }
            c &&
            (Q = d.name);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (d) {
            a.mainGrid.gridContainer.down && x.addGridState();
            a.mainGrid.gridContainer.down = !1;
            a.mainGrid.zonesOut();
            Q = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        a.mainGrid.gridContainer.scale.set(1.13, 1.13);
        a.mainGrid.uiGridContainer.scale.set(1.13, 1.13);
        a.mainGrid.uiSectorsContainer.scale.set(1.13, 1.13);
        a.mainGrid.sectorsContainer.scale.set(1.13, 1.13);
        a.mainGrid.buttonsContainer.scale.set(1.13, 1.13);
        a.mainGrid.uiButtonsContainer.scale.set(1.13,
            1.13);
        b = null;
        a.mainGameManager.gameStateAsync(function (d) {
            Da(d, function () {
                x = new F(a);
                J.drawEditionHistory(d);
                fa(d);
                e && e();
                a.mainRenderer.renderManager.needUpdateRender = !0
            })
        })
    }, function () {
        a.mainGrid.zonesOut();
        v.setDOMVisibility(!0)
    });
    this.createSmallChip = function (b, g) {
        function e(f) {
            var c;
            for (c = A.possibleBets.length - 1; 0 <= c; c--) if (A.possibleBets[c] <= f) return a.mainRenderer.resourceLoader.resources["chip_" + (c + 1)].texture
        }

        if (b.getChildByName("smallChip")) {
            var d = parseFloat(K(b.getChildByName("smallChipText").text));
            d + g <= ea(parseInt(b.name)) && (g = d + g, b.getChildByName("smallChipText").text = D(g), P.setTextScale(b.getChildByName("smallChipText")), b.getChildByName("smallChipText").visible = !0, b.getChildByName("smallChip").visible = !0, b.getChildByName("smallChip").texture = e(parseFloat(g)))
        } else {
            d = new PIXI.Sprite(e(g));
            g = new PIXI.Text(D(g), {
                font: "uiSectorsContainer" == b.parent.name && 36 >= b.name ? "bold 24px Book Antiqua" : "bold 30px Book Antiqua",
                fill: "#000000",
                align: "center"
            });
            g.name = "smallChipText";
            P.setTextScale(g);
            d.name =
                "smallChip";
            b.addChildAt(d, 0 == b.name ? 1 : 0);
            b.addChildAt(g, 0 == b.name ? 2 : 1);
            for (g = 0; g < b.children.length; g++) if ("smallChip" == b.children[g].name || "smallChipText" == b.children[g].name) b.children[g].anchor.x = .5, b.children[g].anchor.y = .5, b.children[g].position.y = b.height / 2, b.children[g].position.x = b.width / 2, "smallChip" == b.children[g].name ? b.children[g].scale.set("uiSectorsContainer" == b.parent.name && 36 >= b.name ? .8 : .93, "uiSectorsContainer" == b.parent.name && 36 >= b.name ? .8 : .93) : b.children[g].anchor.y = .515;
            d = g = null
        }
        b =
            null
    };
    this.setVideoVisibility = function (b, g) {
        b ? (E || (a.gameConfig.needHls ? (E = new FLGVideo(a.gameConfig.videoPos.x - 4, a.gameConfig.videoPos.y, 669.51, 531 * .83, a.gameConfig.canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=2&amp;URL=' + a.gameConfig.videoURL + ';"> <param name="movie" value="videoplayer.swf"></object>',
            '<video id="innerVideo' + a.gameConfig.canvasId + '" autoplay playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + a.gameConfig.videoMobileURL + '" type="application/x-mpegURL"></video>', {
                borderURL: void 0,
                paddings: 0,
                noVideoIcons: !0,
                videoMaxScale: 1.65,
                fullscreenPosY: 125,
                addOffsetX: 18,
                clipPath: "inset(8% 0%)"
            }, a.mainSoundManager), E.setZIndex(!1), E.setVisible(!0)) : a.gameConfig.needRtc && (E = rtcVideo.init({
            videoId: "innerVideo" + a.gameConfig.canvasId,
            parentId: a.gameConfig.canvasId,
            videoString: '<video id="innerVideo' +
                a.gameConfig.canvasId + '" autoplay playsinline preload="metadata" style="height:100%;width:100%;"></video>',
            styleObj: {
                posX: a.gameConfig.videoPos.x - 4,
                posY: a.gameConfig.videoPos.y,
                sizeW: 669.51,
                sizeH: 531 * .83,
                borderURL: void 0,
                paddings: 0,
                noVideoIcons: !0,
                videoMaxScale: 1.65,
                addOffsetX: 18,
                clipPath: "inset(8% 0%)",
                fullscreenPosY: 125
            }
        }), rtcVideo.setSrc(a.gameConfig.videoRtcUrl, a.gameConfig.videoRtcApp, a.gameConfig.videoRtcStream)), V(G, "maskGridContainer", 1920, 0), V(B, "videoContainer", 1920, 0, function () {
            a.gameConfig.needHls ?
                E.setZIndex(!0) : a.gameConfig.needRtc && rtcVideo.playFirst();
            v.setVideoFrameVisibility(!0);
            a.mainRenderer.renderManager.animationTweenInc();
            (new TWEEN.Tween(B.getChildByName("btn_video_load"))).to({rotation: 6 * Math.PI}, 3E3).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                B.getChildByName("btn_video_load").rotation = 0
            }).start()
        })), a.gameConfig.needHls ? E.setFullscreenMode(!0) : a.gameConfig.needRtc && rtcVideo.setFullscreenMode(!0)) : (v.setVideoFrameVisibility(!1),
            V(B, "videoContainer", 0, 0), V(G, "maskGridContainer", 0, 0), E && (a.gameConfig.needHls ? E.destroy() : a.gameConfig.needRtc && rtcVideo.destroy(), E = null))
    };
    this.switchGridMode = function (b) {
        V(w, "switchGridContainer", 0, b ? 902 : 0);
        B.getChildByName("btn_video_return").visible = b ? !1 : !0;
        B.getChildByName("btn_video_return_sectors").visible = b ? !0 : !1
    };
    this.getBallColorByCode = function (b) {
        return -1 != fortunaCombinations.btnComb["47"].zones.indexOf(parseInt(b)) ? "red" : -1 != fortunaCombinations.btnComb["48"].zones.indexOf(parseInt(b)) ?
            "black" : "green"
    };
    this.defineCoefForBet = function (b) {
        if (36 >= b.name) return "36";
        if (42 >= b.name) return "3";
        if (48 >= b.name) return "2";
        if (135 >= b.name || 172 <= b.name && 195 >= b.name) return "18";
        if (136 == b.name || 137 == b.name || 196 <= b.name && 207 >= b.name) return "12";
        if (-1 != [141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171].indexOf(b.name)) return "6";
        if (250 > b.name) return "9"
    };
    this.defineZonesForBet = function (b, g, e, d, f) {
        if (36 >= b.name) M(a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name), M(a.mainGrid.uiSectorsContainer.getChildByName(b.name +
            "innerZone"), b.name + "sector"), O(a.mainGrid.uiSectorsContainer.getChildByName(b.name), d), O(a.mainGrid.uiGridContainer.getChildByName(b.name), d); else {
            if (48 >= b.name) {
                var c = a.mainGrid.buttonCombinations[b.name].zones;
                M(40 <= b.name ? a.mainGrid.uiButtonsContainer.getChildByName(b.name + "innerZone") : a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name)
            } else 52 >= b.name ? c = a.mainGrid.sectorButtonCombinations[b.name].zones : 250 > b.name && (c = a.mainGrid.combinations[b.name - 100]);
            for (b = 0; b < c.length; b++) M(a.mainGrid.uiGridContainer.getChildByName(c[b] +
                "innerZone"), c[b]), M(a.mainGrid.uiSectorsContainer.getChildByName(c[b] + "innerZone"), c[b] + "sector"), O(a.mainGrid.uiSectorsContainer.getChildByName(c[b]), d, f), O(a.mainGrid.uiGridContainer.getChildByName(c[b]), d, f)
        }
    };
    var O = function (b, g, e) {
        e = void 0 != e ? e : !0;
        if (b.getChildByName("possibleWinInfo")) {
            const d = parseFloat(K(b.getChildByName("possibleWinText").text));
            g = parseFloat(g + d).toFixed(10);
            b.getChildByName("possibleWinText").text = D(g);
            b.getChildByName("possibleWinText").visible = b.getChildByName("possibleWinInfo").visible =
                0 < parseFloat(b.getChildByName("possibleWinText").text) && e
        } else if (!(0 > parseFloat(g))) for (e = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.possible_win_bg.texture), g = new PIXI.Text(D(g), {
            font: "19px Arial",
            fill: "#bdbdbd"
        }), g.name = "possibleWinText", e.name = "possibleWinInfo", b.addChildAt(g, b.children.length), b.addChildAt(e, b.children.length - 1), e = 0; e < b.children.length; e++) if ("possibleWinInfo" == b.children[e].name || "possibleWinText" == b.children[e].name) b.children[e].anchor.x = .5, b.children[e].anchor.y =
            .5, g = "possibleWinText" == b.children[e].name ? "uiSectorsContainer" == b.parent.name ? Math.ceil(b.height - b.children[e].height / 4) - 3 : Math.ceil(b.height - b.children[e].height / 2) - 6 : "uiSectorsContainer" == b.parent.name ? Math.ceil(b.height - b.children[e].height / 4) : Math.ceil(b.height - b.children[e].height / 2) - 3, b.children[e].position.y = g, b.children[e].position.x = b.width / 2
    };
    this.showPossibleWin = O;
    this.setInteraction = function (b) {
        a.mainGrid.setZoneInteraction(b);
        v.setChipsInteraction(b);
        v.setBtnControlsInteraction(b);
        T.setInteraction(b);
        w.getChildByName("table_disable_main").visible = !b;
        w.getChildByName("table_disable_sectors").visible = !b;
        G.getChildByName("table_disable_footer").visible = !b;
        for (var g = 0; 36 >= g; g++) a.mainGrid.uiGridContainer.getChildByName("textZone" + g).children[0].style = b ? {
            font: "57px Century725",
            fill: "#cfaf80",
            align: "center"
        } : {
            font: "57px Century725",
            fill: "#675740",
            align: "center"
        }, a.mainGrid.uiSectorsContainer.getChildByName("textZone" + g).children[0].style = b ? {
            font: "48px Century725",
            fill: "#cfaf80",
            align: "center"
        } : {
            font: "48px Century725",
            fill: "#675740", align: "center"
        };
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.setTextScale = function (b) {
        switch (b.text.length) {
            case 5:
                b.scale.set(.5, .5);
                break;
            case 4:
                b.scale.set(.6, .6);
                break;
            case 3:
                "MAX" == b.text ? b.scale.set(.65, .65) : b.scale.set(.75, .75);
                break;
            default:
                b.scale.set(1, 1)
        }
    };
    this.setTextHeaderScale = function (b) {
        12 < b.text.length ? b.scale.set(.65, .65) : 9 < b.text.length ? b.scale.set(.75, .75) : b.scale.set(1, 1)
    };
    this.getFortuneObjectsByGrid = function () {
        var b = [], g;
        for (g in a.mainGrid.pressedZones) b.push({
            comb: parseInt(a.mainGrid.pressedZones[g].zone.name),
            coef: parseFloat(a.mainUIManager.defineCoefForBet(a.mainGrid.pressedZones[g].zone)),
            summ: a.mainGrid.pressedZones[g].bet,
            spread: {
                sectors: Object.assign({}, a.mainGrid.pressedZones[g].spread.sectors),
                main: a.mainGrid.pressedZones[g].spread.main
            }
        });
        return b
    };
    this.getTotalSumByGrid = function () {
        var b = 0, g;
        for (g in a.mainGrid.pressedZones) b += parseFloat(a.mainGrid.pressedZones[g].bet).toFixed(10);
        return b
    };
    this.isAllowBet = function (b, g, e) {
        return parseFloat(g).toFixed(10) > ea(b.comb) ? (e ? (e.betErrorCount++, e.betErrorFunc ||
        (e.betErrorFunc = function () {
            a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet)
        })) : a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet), !1) : P.getTotalSumByGrid() + parseFloat(b.summ).toFixed(10) > clientInfoGlobal.cfstolmax / 100 ? (a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBetGame), !1) : !0
    };
    var ya = 0, za = 0, da, fa = function (b) {
        function g(c) {
            v.timerDOM.find("span.timerSec").each(function () {
                $(this)[0].textContent !== Z.getTimerText() && ($(this)[0].childNodes[0].nodeValue =
                    Z.getTimerText())
            });
            da = 1920 * (1 - c);
            v.timerDOM.find("div#timerRow").css({
                "clip-path": "inset(0px " + da + "px 0px 0px)",
                "-webkit-clip-path": "inset(0px " + da + "px 0px 0px)"
            })
        }

        function e(c) {
            a.mainGameManager && ($("#" + a.gameConfig.canvasId + " div#timerContainer span.timerDesc").each(function () {
                $(this).text(mainLocalizationTable.placeBets)
            }), $("#" + a.gameConfig.canvasId + " div#timerContainer div#timerRow").css({
                visibility: "visible",
                "background-color": "#4da362"
            }), a.mainFLGAccount.setWinTextVisible(!0), a.mainGrid.removeCurrentBets(),
                a.mainFLGAccount.totalBet(0), localStorage.getItem("lastRoundNumBlack" + a.gameConfig.gameKind + a.gameConfig.gameType) == c.tir ? x.selectGridByStates() : x.clearGridStates(), localStorage.setItem("lastRoundNumBlack" + a.gameConfig.gameKind + a.gameConfig.gameType, c.tir), a.mainUIManager.setInteraction(!0), J.addEdition(c.tir + 1), ja && x.repeatLastRoundGridState(), ia && (x.repeatLastRoundGridState(), x.doubleCurrentBets()), ia = ja = !1, Z.start({
                minutes: 0, seconds: (c.time_round ? c.time_round : a.gameConfig.tirTime) - a.gameConfig.timerOffset -
                    c.t2
            }, {
                minutes: 0,
                seconds: (c.time_round ? c.time_round : a.gameConfig.tirTime) - a.gameConfig.timerOffset
            }, g, function () {
                a.mainUIManager.setInteraction(!1);
                $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerDesc").each(function () {
                    $(this).text(mainLocalizationTable.noMoreBets)
                });
                $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerBlack").each(function () {
                    $(this).css("visibility", "hidden")
                });
                $("#" + a.gameConfig.canvasId + " div#timerContainer div#timerRow").css("animation", "changeTimerOpacity 0.5s 6 alternate linear");
                J.getActedOutEdition().betsHistory.addBet({
                    fortuneBetObjArr: a.mainUIManager.getFortuneObjectsByGrid(),
                    winBet: void 0,
                    win: void 0,
                    code: void 0
                }, J.getActedOutEdition().round, function (m) {
                    m || (a.mainGrid.removeCurrentBets(), a.mainFLGAccount.totalBet(0))
                });
                x.clearGridStates()
            }, 3, fa))
        }

        function d() {
            function c() {
                a.mainGameManager && (a.mainGameManager.gameStateAsync(m), a.mainRenderer.renderManager.needUpdateRender = !0)
            }

            function m(h) {
                a.mainGameManager && (99 != h.ball ? a.mainFLGAccount && (a.mainFLGAccount.calculateWin(J.getActedOutEdition().betsHistory.bets,
                    a.gameConfig.appName, function (r) {
                        var p = 0 <= h.t2 ? 17E3 : -17 > h.t2 ? 0 : 1E3 * (21 + h.t2) - 4E3;
                        a.mainGrid.pressedZones.length && (p = 2E3);
                        a.gameConfig.offset4Result && (p += a.gameConfig.offset4Result);
                        setTimeout(function () {
                            a.mainGrid.showWinZone(parseInt(h.ball), function (t) {
                                var y = t.getChildByName("zone_win_chip");
                                y || (y = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.zone_win_chip.texture), y.name = "zone_win_chip", "uiSectorsContainer" == t.parent.name || 0 == h.ball ? y.scale.set(.8, .8) : y.scale.set(1, 1), y.anchor.set(.5,
                                    .5), y.alpha = 0, t.addChildAt(y, 0), y.rotation = 0, t.getChildByName("textwinZone").style = {
                                    font: "uiSectorsContainer" == t.parent.name ? "54px Century725 Bold" : "64px Century725 Bold",
                                    fill: "#cfaf80",
                                    align: "center"
                                });
                                y.position.set(t.width / 2, t.height / 2);
                                t.getChildByName("smallChip") && (t.getChildByName("smallChipText").visible = !1, t.getChildByName("smallChip").visible = !1);
                                a.mainRenderer.renderManager.animationTweenInc();
                                (new TWEEN.Tween(y)).to({alpha: 1}, 500).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                    a.mainRenderer.renderManager.animationTweenDec()
                                }).start();
                                a.mainGrid[t.parent.name].getChildByName("textZone" + h.ball).visible = !1;
                                t.getChildByName("textwinZone").visible = !0;
                                a.mainRenderer.renderManager.animationTweenInc();
                                (new TWEEN.Tween(y)).to({rotation: 2 * Math.PI}, 9E3).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                                    a.mainRenderer.renderManager.animationTweenDec();
                                    y.rotation = 0
                                }).start();
                                setTimeout(function () {
                                    t.getChildByName("possibleWinInfo") && (t.getChildByName("possibleWinInfo").visible = !1, t.getChildByName("possibleWinText").visible = !1);
                                    a.mainRenderer.renderManager.animationTweenInc();
                                    (new TWEEN.Tween(y)).to({alpha: 0}, 500).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                        a.mainRenderer.renderManager.animationTweenDec()
                                    }).start();
                                    t.getChildByName("textwinZone").visible = !1;
                                    a.mainGrid[t.parent.name].getChildByName("textZone" + h.ball).visible = !0;
                                    a.mainRenderer.renderManager.animationTweenInc();
                                    (new TWEEN.Tween(y)).to({rotation: 0}, 500).onComplete(function () {
                                        a.mainRenderer.renderManager.animationTweenDec();
                                        t.visible = !1;
                                        y = null
                                    }).start()
                                }, 8500)
                            }, 9E3);
                            if (r && r.length) {
                                for (var k =
                                    [], q = 0; q < r.length; q++) k.push({
                                    comb: parseInt(r[q].nm),
                                    coef: parseFloat(r[q].cf).toFixed(10) / 100,
                                    summ: parseFloat(r[q].sm).toFixed(10) / 100,
                                    winBet: h.ball
                                });
                                x.showWinCombinations(k);
                                k = null
                            }
                            J.drawEditionHistory(h);
                            $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerBlack").each(function () {
                                $(this).css("visibility", "visible")
                            });
                            $("#" + a.gameConfig.canvasId + " div#timerContainer div#timerRow").css("visibility", "hidden");
                            $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerDesc").each(function () {
                                $(this).text(h.ball +
                                    " " + a.mainGrid.getColorByCombCode(h.ball))
                            });
                            ya = setTimeout(fa, 9E3);
                            a.mainFLGAccount.winToBalanceAnimation(9E3, 2E3, {
                                x: 4E3,
                                y: 2E3
                            }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                font: "72px Arial Narrow",
                                fill: "#e0c59d",
                                align: "customize",
                                posY: 45
                            }, void 0, {font: "44px Arial Narrow", fill: "#be9e6f"});
                            v.setWinVisibility(!0, 2500, h.ball, a.mainUIManager.getBallColorByCode(h.ball));
                            setTimeout(function () {
                                v.setWinVisibility(!1);
                                a.mainGrid.removeCurrentBets();
                                a.mainFLGAccount.totalBet(0)
                            }, 8E3)
                        }, p)
                    }, a.gameConfig),
                    J.cancelLastEdition([h.ball]), a.mainRenderer.renderManager.needUpdateRender = !0) : za = setTimeout(c, 500))
            }

            a.mainGameManager && ($("#" + a.gameConfig.canvasId + " div#timerContainer div#timerRow").css({
                animation: "",
                opacity: 1,
                "background-color": "#c0372d"
            }), a.mainUIManager.setInteraction(!1), a.mainFLGAccount.setWinTextVisible(!1), c())
        }

        function f(c) {
            0 >= c.t2 ? d() : e(c)
        }

        void 0 != a.mainGameManager && (b ? f(b) : a.mainGameManager.gameStateAsync(f))
    }
};
