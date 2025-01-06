if ("undefined" === typeof localLanguage) {
    function a(T, S) {
        for (var R in S) if (S[R] == T) return T;
        switch (T) {
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
    }

    window.localLanguage = function () {
        if (localStorage.language) return localStorage.language;
        var T = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase();
        return a(T, mainLocalizator.getLangs())
    }
}

function LottoMBKAppObjMobile(a, T) {
    this.destroy = function () {
        O.destroy();
        O = null;
        N.destroy();
        N = null;
        W.destroy();
        W = null;
        da.destroy();
        da = null;
        R.destroy();
        R = null;
        S.mainSoundManager.destroy();
        for (var J in S) S[J] = null;
        S = null
    };
    var S = this;
    this.gameDir = FLGUtils.staticRootPath + "games/Lotto/resources/";
    this.gameDirMobile = FLGUtils.staticRootPath + "games/Lotto/resources/mobile/";
    this.gameConfig = a;
    this.configType = T;
    var R = new FLGRenderer(1920, 1080, a[T].canvasId, "center");
    this.mainRenderer = R;
    this.mainSoundManager = new SoundManager(S.gameConfig[S.configType].gameKind,
        S.gameConfig[S.configType].gameType, S.gameConfig[S.configType].gameVariant);
    var W = new FLGAccount(a[T].canvasId, S.mainSoundManager, S.mainRenderer);
    this.mainFLGAccount = W;
    var da = new gameManagerLottoMBK(this);
    this.mainGameManager = da;
    var O = new UIManagerLottoMBKMobile(this);
    this.mainUIManager = O;
    var N;
    this.setMainGrid = function (J) {
        N = J;
        S.mainGrid = N
    }
}

function UIManagerLottoMBKMobile(a) {
    function T(e, d, h, C, H) {
        this.destroy = function () {
            f = b = B = c = null;
            clearTimeout(K);
            clearTimeout(m);
            l = k = null;
            for (var n in u) u[n] = null;
            u = null
        };
        var u = this, c = {font: "bold 35px Arial", fill: "#000000", align: "center"}, B = 0, K, m,
            b = new PIXI.Container;
        C ? C.addChild(b) : a.mainRenderer.stage.addChild(b);
        var f = function (n, x, t, G, y) {
            b.children[y] ? (b.children[y].visible = !0, b.children[y].children[0].text = G) : a.mainRenderer.createButton(b, n, x, "ball", {
                text: G,
                align: "center",
                style: c
            }).scale.set(t,
                t);
            H && !b.children[y].isRotated && (b.children[y].position.x = n + 980, b.children[y].children[0].rotation = 8 * Math.PI, b.children[y].isRotated = !0, a.mainUIManager.animations()["rotation_ball" + y] && (a.mainUIManager.animations()["rotation_ball" + y].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["rotation_ball" + y] = (new TWEEN.Tween({
                rotation: b.children[y].children[0].rotation,
                position: b.children[y].position.x
            })).to({
                rotation: 0,
                position: n
            }, 990).easing(TWEEN.Easing.Cubic.Out).onUpdate(function () {
                b.children[y].children[0].rotation = this.rotation;
                b.children[y].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["rotation_ball" + y] = null;
                a.mainSoundManager.playSound("ball")
            }).start())
        }, k = function (n, x, t, G) {
            function y() {
                f(e + h * B, d, x, n[B], B);
                B++;
                B < n.length ? 0 == t || void 0 == t ? y() : K = setTimeout(y, t) : B = 0
            }

            void 0 != n && n.length && (G ? f(e + h * G, d, x, n[G], G) : y())
        };
        this.startDrawBalls =
            k;
        var l = function () {
            for (var n = 0; n < b.children.length; n++) H ? (b.children[n].isRotated = !1, a.mainUIManager.animations()["remove_ball" + n] && (a.mainUIManager.animations()["remove_ball" + n].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["remove_ball" + n] = (new TWEEN.Tween({
                rotation: b.children[n].children[0].rotation,
                position: b.children[n].position.x,
                index: n
            })).to({
                rotation: 6 * Math.PI,
                position: b.children[n].position.x + 980
            }, 990).easing(TWEEN.Easing.Cubic.In).onUpdate(function () {
                b.children[this.index].children[0].rotation =
                    this.rotation;
                b.children[this.index].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["remove_ball" + this.index] = null;
                b.children[this.index].visible = !1
            }).start()) : b.children[n].visible = !1
        };
        this.removeBalls = l
    }

    function S(e) {
        this.destroy = function () {
            for (var m = 0; m < h.length; m++) {
                for (var b in h[m]) h[m][b] = null;
                h[m] = null
            }
            K = B = u = H = C = h = null;
            for (m in d) d[m] = null;
            d = null
        };
        var d = this, h = [];
        this.bets = h;
        var C = 0, H = 0;
        this.setTotalWin = function (m) {
            if (!arguments.length) return H;
            m && (H = m)
        };
        this.getTotalBet = function () {
            return C
        };
        var u = null;
        this.parentEditions = function (m) {
            if (!arguments.length) return u;
            u = m;
            B = u.betsHistoryContainer()
        };
        if (e.length) for (var c = 0; c < e.length; c++) e[c].summ && (C += e[c].summ), e[c].win && (H += e[c].win), h.push({
            summ: e[c].summ,
            bet: e[c].bet,
            coef: e[c].coef,
            winBets: e[c].winBets,
            countWin: e[c].countWin,
            win: e[c].win,
            code: e[c].code,
            id: e[c].id
        });
        this.addBet = function (m, b, f) {
            b += 1;
            100 <= h.length ? (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g,
                100)), f && f(void 0)) : (m.length && 100 < h.length + m.length && (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), m = m.slice(0, m.length - (h.length + m.length - 100))), a.mainFLGAccount.placeBet(m, b, a.gameConfig[a.configType], function (k, l, n) {
                if (void 0 == k) f && f(void 0); else {
                    if (n) {
                        n.notAll && a.mainRenderer.logService.log(mainLocalizationTable.betError);
                        for (k = 0; k < n.srvBets.length; k++) h.push({
                            summ: n.srvBets[k].summ,
                            bet: n.srvBets[k].bet,
                            coef: n.srvBets[k].coef,
                            winBets: n.srvBets[k].winBets,
                            countWin: n.srvBets[k].countWin,
                            win: n.srvBets[k].win,
                            code: n.srvBets[k].code,
                            id: n.srvBets[k].id
                        });
                        f && (f(n.srvBets), u.events.emit("EDITIONS_CHANGE"))
                    } else h.push({
                        summ: m.summ,
                        bet: m.bet,
                        coef: m.coef,
                        winBets: m.winBets,
                        countWin: m.countWin,
                        win: m.win,
                        code: k,
                        id: l
                    }), f && (f(h[h.length - 1]), u.events.emit("EDITIONS_CHANGE"));
                    C = a.mainFLGAccount.totalBet();
                    K();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }, a.gameConfig[a.configType].gameNum))
        };
        var B, K = function () {
            var m = 0 != B.children.length;
            B.parent.children[9].children[0].children[0].text =
                0 < h.length ? mainLocalizationTable.coupon.toUpperCase() + " (" + h.length + ")" : mainLocalizationTable.coupon.toUpperCase();
            if (m) B.parent.children[2].children[1].children[0].text = 0 !== C ? formatFLGNums(C, !1) : "", B.parent.children[2].children[2].children[0].text = 0 !== H ? formatFLGNums(H, !1) : ""; else for (m = 0; 10 > m; m++) {
                var b = m & 1 ? "atlas%Jtable-odd-line-mobile" : "atlas%Jtable-even-line-mobile";
                b = new a.mainRenderer.createButton(B, 0, 127 + 49 * m, b);
                b.anchor.y = .5;
                b.name = "row_" + m
            }
            var f;
            for (m = 0; B.getChildByName("row_" + m); m++) if (b =
                B.getChildByName("row_" + m)) {
                for (var k = 0; b.getChildByName("rect" + m + "_" + k); k++) {
                    var l = b.getChildByName("rect" + m + "_" + k);
                    l.visible = !1;
                    l.getChildByName("sortedBet" + m + "_" + k).visible = !1
                }
                if (l = b.getChildByName("summ" + m)) l.visible = !1, b.getChildByName("coefMode" + m).visible = !1, b.getChildByName("coef" + m).visible = !1, b.getChildByName("win" + m).visible = !1;
                9 < m && (b.visible = !1)
            }
            if (!(0 >= h.length)) {
                m = 0;
                for (var n = h.length - 1; m < h.length; m++, n--) {
                    var x = h[n].bet.slice();
                    x.sort(a.mainGameManager.sortNumeric);
                    (b = B.getChildByName("row_" +
                        m)) ? b.visible = !0 : (b = m & 1 ? "atlas%Jtable-odd-line-mobile" : "atlas%Jtable-even-line-mobile", b = new a.mainRenderer.createButton(B, 0, 127 + 49 * m, b), b.anchor.y = .5, b.name = "row_" + m);
                    for (k = 0; k < x.length; k++) {
                        var t = (f = -1 < h[n].winBets.indexOf(x[k])) ? 16773632 : 0;
                        (l = b.getChildByName("rect" + m + "_" + k)) ? (l.clear(), l.beginFill(t), l.drawCircle(26 + 41 * k, 0, 20), l.endFill(), l.visible = !0, l = l.getChildByName("sortedBet" + m + "_" + k), l.children[0].style = f ? u.tableHistoryFont : u.tableHighlightFont, l.children[0].text = x[k], l.visible = !0) : (l =
                            new PIXI.Graphics, l.beginFill(t), l.drawCircle(26 + 41 * k, 0, 20), l.endFill(), l.name = "rect" + m + "_" + k, b.addChild(l), a.mainRenderer.createButton(l, 26 + 41 * k, 0, void 0, {
                            text: x[k],
                            align: "center",
                            style: f ? u.tableHistoryFont : u.tableHighlightFont
                        }).name = "sortedBet" + m + "_" + k)
                    }
                    f = void 0 != h[n].win ? formatFLGNums(h[n].win, !1) : "";
                    x = void 0 != h[n].countWin ? a.mainGameManager.coefficients[h[n].coef - 1][h[n].countWin] / 100 : "";
                    k = void 0 != h[n].win && 0 != h[n].win ? u.tableBoldFont : u.tableBetFont;
                    (l = b.getChildByName("summ" + m)) ? (l.children[0].style =
                        k, l.children[0].text = formatFLGNums(h[n].summ, !1), l.visible = !0, l = b.getChildByName("win" + m), l.children[0].style = k, l.children[0].text = f, l.visible = !0, f = b.getChildByName("coefMode" + m), f.children[0].style = k, f.children[0].text = h[n].coef, f.visible = !0, b = b.getChildByName("coef" + m), b.children[0].style = k, b.children[0].text = x, b.visible = !0) : (a.mainRenderer.createButton(b, 420, 0, void 0, {
                        text: formatFLGNums(h[n].summ, !1),
                        align: "left",
                        style: k
                    }).name = "summ" + m, a.mainRenderer.createButton(b, 325, 0, void 0, {
                        text: h[n].coef,
                        align: "center", style: k
                    }).name = "coefMode" + m, a.mainRenderer.createButton(b, 380, 0, void 0, {
                        text: x,
                        align: "center",
                        style: k
                    }).name = "coef" + m, a.mainRenderer.createButton(b, 555, 0, void 0, {
                        text: f,
                        align: "left",
                        style: k
                    }).name = "win" + m)
                }
            }
            B.emit("updateHeight")
        };
        this.redrawCurrentBets = K;
        this.calculateWin = function (m, b) {
            for (var f, k = 0; k < h.length; k++) {
                f = h[k].bet;
                for (var l = [], n = 0; n < f.length; n++) -1 < m.indexOf(f[n]) && l.push(f[n]);
                f = l;
                h[k].winBets = f;
                h[k].countWin = f.length;
                b && (h[k].win = h[k].summ * a.mainGameManager.coefficients[h[k].coef -
                1][h[k].countWin] / 100, H += h[k].win)
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        }
    }

    this.destroy = function () {
        clearTimeout(Ba);
        clearTimeout(Ea);
        J = O = null;
        U.destroy();
        U = null;
        fa.destroy();
        fa = null;
        L && L.destroy();
        ya = L = null;
        ha.destroy();
        ha = null;
        ma.destroy();
        z = ka = Z = w = ma = null;
        for (var e in p) {
            for (var d in p[e]) p[e][d] = null;
            p[e] = null
        }
        p = null;
        clearTimeout(Fa);
        qa = null;
        for (e in v) v[e] = null;
        ta = ua = na = oa = Ca = ia = ja = v = null;
        a.mainFLGAccount.events.off("onBet", va);
        a.mainFLGAccount.events.off("onBalance", wa);
        wa = va = null;
        a.mainRenderer.stage.off("changeLang", xa);
        xa = null;
        W.off("visibleChange", da);
        da = W = null;
        ra.destroy();
        la = ra = null;
        A.destroy();
        A = null;
        for (e in R) R[e] = null;
        R = null
    };
    var R = this, W = $("#" + a.gameConfig[a.configType].canvasId).parent(), da = function (e, d) {
        a.mainRenderer.stage.visible = d == a.gameConfig[a.configType].canvasId;
        a.mainRenderer.StartStopAnimation(a.mainRenderer.stage.visible)
    };
    W.on("visibleChange", da);
    for (var O = clientInfoGlobal.coin7.split("-"), N = 0; N < O.length; N++) O[N] /= 100;
    var J = 2 * parseInt(O[O.length - 1],
        10);
    O.push("MAX\n" + J);
    N = (N = localStorage.getItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "defaultBet")) && 0 <= O.indexOf(parseInt(N)) ? JSON.parse(N) : O[1];
    var U = new betsControls(O[0], O[O.length - 1], N, O, function (e) {
        a.mainFLGAccount.balance() < J && (J = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return J
    });
    this.betsControls = U;
    var fa = new FLGTimer, L, ya = .1, ha = new FLGJackpot(a.mainRenderer, {tirTimeOffset: ya, updateInterval: 900}),
        ma, w = new PIXI.Container,
        Z = new PIXI.Container, z = new PIXI.Container, ka = new PIXI.Container, Da = new PIXI.Container,
        ba = new PIXI.Container, D = [new PIXI.Container, new PIXI.Container, new PIXI.Container], p = {
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
                posX: 385, posY: 295, onStartOpen: void 0, onStopOpen: void 0, onStartClose: void 0, onStopClose: void 0
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
                    L && (L.destroy(), L =
                        null);
                    v.scale_video && v.scale_video.stop();
                    v.scale_video_open && v.scale_video_open.stop();
                    L = new FLGVideo(47, 380, 1078, 607, a.gameConfig[a.configType].canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" allowfullscreen="true" wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=0&amp;URL=' + a.gameConfig.videoURL + ';"> <param name="allowFullScreen" value="true"> <param name="movie" value="videoplayer.swf"> </object>',
                        '<video id="innerVideo' + a.gameConfig[a.configType].canvasId + '" autoplay muted playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + a.gameConfig[a.configType].videoMobileURL + '" type="application/x-mpegURL"></video>', void 0, a.mainSoundManager);
                    var e = navigator.userAgent || navigator.vendor || window.opera;
                    e.match(/Android/i) || L && L.setVisible(!0);
                    v.scale_video_open = (new TWEEN.Tween({scale: 0})).to({scale: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                        v.scale_video_open =
                            null;
                        L && L.setScale(1)
                    }).onUpdate(function () {
                        L && L.setScale(this.scale)
                    }).onComplete(function () {
                        v.scale_video_open = null
                    }).start();
                    v.video_rotate && v.video_rotate.stop();
                    var d = p.video.container;
                    if (d.getChildByName("video_load")) {
                        var h = d.getChildByName("video_load");
                        h.visible = !0
                    } else h = a.mainRenderer.createButton(d, 20, 65, "video_load"), h.anchor.set(.5, .5), h.scale.set(1.75, 1.75);
                    h && (a.mainRenderer.renderManager.animationTweenInc(), v.video_rotate = (new TWEEN.Tween(h)).to({rotation: 6 * Math.PI}, 3E3).easing(TWEEN.Easing.Linear.None).onStop(function () {
                        h.rotation =
                            0;
                        h.visible = !1;
                        a.mainRenderer.renderManager.animationTweenDec();
                        v.video_rotate = null
                    }).onComplete(function () {
                        e.match(/Android/i) && L && L.setVisible(!0);
                        h.rotation = 0;
                        h.visible = !1;
                        a.mainRenderer.renderManager.animationTweenDec();
                        v.video_rotate = null
                    }).start())
                }, onStopOpen: void 0, onStartClose: function () {
                    L && (v.scale_video_open && v.scale_video_open.stop(), v.scale_video && v.scale_video.stop(), v.video_rotate && v.video_rotate.stop(), v.scale_video = (new TWEEN.Tween({scale: 1})).to({scale: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                        v.scale_video =
                            null;
                        L && (L.setScale(0), L.destroy(), L = null)
                    }).onUpdate(function () {
                        L && L.setScale(this.scale)
                    }).onComplete(function () {
                        L && (L.setScale(0), L.destroy(), L = null);
                        v.scale_video = null
                    }).start())
                }, onStopClose: void 0
            }
        }, Fa = 0, qa, ra, la = {needShow: !0}, A = new function () {
            this.destroy = function () {
                for (var g = 0; g < d.length; g++) d[g].round = null, d[g].editionResult = null, d[g].betsHistory.destroy && d[g].betsHistory.destroy(), d[g].betsHistory = null, d[g] = null;
                K = B = u = H = C = h = d = null;
                c.destroy();
                c = null;
                ca && (ca.destroy(), ca = null);
                m = null;
                b &&
                (b.destroy(), b = null);
                V = X = P = y = G = t = x = n = k = f = l = null;
                e.events.removeAllListeners();
                for (g in e) e[g] = null;
                e = null
            };
            var e = this, d = [], h;
            this.editions = d;
            var C, H = new PIXI.Container, u = new PIXI.Container, c, B = new PIXI.Container, K = new PIXI.Container;
            K.name = "betCntnr";
            this.historyTable = function () {
                return C
            };
            this.betBGContainer = function () {
                return c.srcSprite
            };
            this.betsHistoryContainer = function () {
                return K
            };
            var m = .85, b, f = {font: "bold 42px Arial", fill: "#313131"};
            this.tableHeaderFont = f;
            var k = {font: "34px Arial", fill: "#403f3f"},
                l = {font: "30px Arial Narrow", fill: "#000000"};
            this.tableHistoryFont = l;
            var n = {font: "30px Arial Narrow", fill: "#ffffff"};
            this.tableHighlightFont = n;
            var x = {font: "bold 36px Arial", fill: "#000000"};
            this.tableBoldFont = x;
            var t = {font: "34px Arial", fill: "#000000"};
            this.tableBetFont = t;
            this.getActedOutEdition = function () {
                for (var g = d.length - 1; 0 <= g; g--) if (void 0 == d[g].editionResult) return G(g), d[g];
                G(d.length - 1);
                return d[d.length - 1]
            };
            var G = function (g) {
                0 > g || g >= d.length || (h = g, void 0 != H && 0 < H.children.length && V(), void 0 !=
                C && d[h].betsHistory.redrawCurrentBets(), a.mainRenderer.renderManager.needUpdateRender = !0)
            }, y = function () {
                C = a.mainRenderer.createButton(Da, 1174, 218);
                for (var g = 0; g < d.length; g++) d[g].betsHistory.parentEditions(e);
                X();
                d.length && d[h].betsHistory.redrawCurrentBets();
                H.position.set(0, -380);
                p.stats.container.addChildAt(H, p.stats.container.children.length);
                a.mainRenderer.createButton(p.stats.container, 0, -240, void 0, {
                    text: mainLocalizationTable.ballHist.toUpperCase(), align: "center", style: {
                        font: "bold 34px Arial",
                        fill: "#ffffff", align: "center"
                    }
                }).anchor.set(.5, .5)
            };
            this.drawEditions = y;
            var P = function () {
                u.children[0] && u.children[1] ? (u.children[0].children[0].text = mainLocalizationTable.round, u.children[1].children[0].text = mainLocalizationTable.balls) : (a.mainRenderer.createButton(u, 19, 30, void 0, {
                    text: mainLocalizationTable.history.toUpperCase(),
                    align: "left",
                    style: f
                }), a.mainRenderer.createButton(u, 64, 78, void 0, {
                    text: mainLocalizationTable.round,
                    align: "center",
                    style: k
                }), a.mainRenderer.createButton(u, 161, 78, void 0,
                    {text: mainLocalizationTable.balls, align: "left", style: k}))
            };
            this.redrawEditionHeader = P;
            var X = function () {
                if (B.children[0]) B.children[0].children[0].text = mainLocalizationTable.coupon.toUpperCase(), B.children[1].children[0].text = mainLocalizationTable.balls, B.children[2].children[0].text = mainLocalizationTable.totalBet, B.children[3].children[0].text = mainLocalizationTable.win, c.srcSprite.children[2].children[0].text = mainLocalizationTable.total.toUpperCase() + ":"; else {
                    c = new MaskedSprite(a.mainRenderer.createButton(C,
                        1, 172, "atlas%Jtable-bg-mobile"), {
                        mask: {x: 1, y: 172, width: 722, height: 445},
                        needScrolling: {container: K, scrollbar: {topOffset: 104, botOffset: 48}}
                    }, a.mainRenderer.renderManager);
                    c.srcSprite.addChildAt(K, 0);
                    a.mainRenderer.createButton(c.srcSprite, 0, 396, "table_footer");
                    a.mainRenderer.createButton(c.srcSprite.children[2], 290, 24, void 0, {
                        text: mainLocalizationTable.total.toUpperCase() + ":",
                        align: "right",
                        style: {font: "34px Arial", fill: "#000000", align: "center"}
                    });
                    a.mainRenderer.createButton(c.srcSprite.children[2],
                        420, 24, void 0, {
                            text: "",
                            align: "left",
                            style: {font: "34px Arial", fill: "#000000", align: "center"}
                        });
                    a.mainRenderer.createButton(c.srcSprite.children[2], 555, 24, void 0, {
                        text: "",
                        align: "left",
                        style: {font: "34px Arial", fill: "#000000", align: "center"}
                    });
                    var g = new PIXI.Graphics;
                    g.beginFill(16777215);
                    g.drawRect(300, 56, 2, 585);
                    g.alpha = .5;
                    g.name = "ballsSep";
                    g.endFill;
                    c.srcSprite.addChild(g);
                    g = new PIXI.Graphics;
                    g.beginFill(16777215);
                    g.drawRect(350, 56, 2, 573);
                    g.alpha = .5;
                    g.name = "modeSep";
                    g.endFill;
                    c.srcSprite.addChild(g);
                    g = new PIXI.Graphics;
                    g.beginFill(16777215);
                    g.drawRect(410, 56, 2, 573);
                    g.alpha = .5;
                    g.name = "coefSep";
                    g.endFill;
                    c.srcSprite.addChild(g);
                    g = new PIXI.Graphics;
                    g.beginFill(16777215);
                    g.drawRect(530, 56, 2, 573);
                    g.alpha = .5;
                    g.name = "winsSep";
                    g.endFill;
                    c.srcSprite.addChild(g);
                    g = null;
                    c.srcSprite.interactive = !0;
                    c.srcSprite.hitArea = new PIXI.Rectangle(0, 0, 722, 445);
                    a.mainRenderer.createButton(c.srcSprite, 0, 0, "table_header");
                    g = a.mainRenderer.createButton(c.srcSprite, 0, 0, void 0, void 0, function (r, q) {
                        a.mainUIManager.animations().rotate_bets &&
                        (a.mainUIManager.animations().rotate_bets.stop(), a.mainRenderer.renderManager.animationTweenDec());
                        r.pressed = !r.pressed;
                        var F = r.pressed ? 0 : Math.PI / 2;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().rotate_bets = (new TWEEN.Tween(r.children[0])).to({rotation: F}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().rotate_bets = null
                        }).start();
                        a.mainUIManager.animations().resize_bets && (a.mainUIManager.animations().resize_bets.stop(),
                            a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().resize_bets = null);
                        r = r.pressed ? 249 : 445;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().resize_bets = (new TWEEN.Tween({fHeight: c.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: r}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            c.srcSprite.position.y = 617 - this.fHeight;
                            c.srcSprite.children[2].position.y = 396 + this.fHeight - 445;
                            c.srcSprite.mask.clear();
                            c.srcSprite.mask.beginFill(14922837);
                            c.srcSprite.mask.drawRoundedRect(1, c.srcSprite.position.y, 722, this.fHeight, 9);
                            c.srcSprite.mask.endFill;
                            c.srcSprite.hitArea.height = this.fHeight;
                            K.emit("updateHeight")
                        }).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().resize_bets = null
                        }).start();
                        q && (q.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    g.name = "exp2";
                    g = a.mainRenderer.createButton(g, 695, 29, "atlas%Jexpand-mobile");
                    g.anchor.set(.5, .5);
                    g.rotation = Math.PI / 2;
                    g.visible = !1;
                    g = null;
                    c.srcSprite.addChild(B);
                    a.mainRenderer.createButton(B, 19, 30, void 0, {
                        text: mainLocalizationTable.coupon.toUpperCase(),
                        align: "left",
                        style: f
                    });
                    a.mainRenderer.createButton(B, 19, 78, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "left",
                        style: k
                    });
                    a.mainRenderer.createButton(B, 325, 78, void 0, {text: "#", align: "center", style: k});
                    a.mainRenderer.createButton(B, 380, 78, void 0, {text: "X", align: "center", style: k});
                    a.mainRenderer.createButton(B, 415, 78, void 0, {
                        text: mainLocalizationTable.totalBet,
                        align: "left",
                        style: k
                    });
                    a.mainRenderer.createButton(B, 550, 78, void 0, {
                        text: mainLocalizationTable.win,
                        align: "left",
                        style: k
                    });
                    g = a.mainRenderer.createButton(c.srcSprite, 0, 0, void 0, void 0, function (r, q) {
                        a.mainSoundManager.playSound("buttonClick");
                        la.needShow = !la.needShow;
                        e.events.emit("GRID_STATS");
                        r.children[0].texture = a.mainRenderer.resourceLoader.resources[la.needShow ? "eye_icon" : "eye_closed_icon"].texture;
                        q && (q.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    g.hitArea = new PIXI.Rectangle(0, 0, 722, 60);
                    g.name = "eye_icon";
                    g = a.mainRenderer.createButton(g, 670, 30, "eye_icon");
                    g.anchor.set(.5, .5);
                    g.scale.set(1.3, 1.3);
                    g = g = null
                }
            };
            this.drawBetsHeader = X;
            var V = function () {
                var g = 0 !== H.children.length;
                if (!g) for (var r = 0; 5 > r; r++) {
                    var q = new a.mainRenderer.createButton(H, 0, 135 + 70 * (6 - r - 2), "atlas%Jtable-even-line-mobile");
                    q.anchor.set(.5, .5);
                    q.visible = 4 == r ? !1 : !0
                }
                var F = a.mainGameManager.gameHistory();
                for (r = 0; r < F.length; r++) {
                    var E = F[r].balls.slice();
                    E.sort(a.mainGameManager.sortNumeric);
                    q = H.children[r];
                    if (g = 0 !== q.children.length) for (q.getChildByName("round" +
                        r).children[0].text = "#  " + F[r].tir, g = 0; g < E.length; g++) q.getChildByName("result" + g).children[0].text = E[g]; else {
                        a.mainRenderer.createButton(q, 60, 10, void 0, {
                            text: "#  " + F[r].tir,
                            align: "center",
                            style: {font: "bold 40px Arial", fill: "#ffffff"}
                        }).name = "round" + r;
                        var I = 110;
                        for (g = 0; g < E.length; g++) a.mainRenderer.createButton(q, I += 80, -22, "ball", {
                            text: E[g],
                            align: "center",
                            style: {font: "bold 40px Arial Narrow", fill: "#000000"}
                        }).name = "result" + g, q.getChildByName("result" + g).scale.set(.85, .85)
                    }
                }
                H.position.x = -H.width / 2
            };
            this.detailEditionsFont = {font: "bold 52px Arial", fill: "#ffffff"};
            this.detailEditionsHeaderFont = {font: "bold 30px Arial", fill: "#fca903"};
            this.detailEditionsRowFont = {font: "bold 34px Arial", fill: "#ffffff"};
            var ca, sa = new PIXI.Graphics;
            sa.beginFill(16777215, .4);
            sa.drawCircle(0, 0, 38);
            sa.endFill();
            this.rectTexture = sa.generateTexture(!1);
            sa = null;
            this.drawDetailEditionHistory = function (g, r) {
                var q = 0 != g.children.length;
                g.editionInd = r;
                var F = {x: 599, y: 465}, E = (d[r].editionResult || []).slice();
                E.sort(a.mainGameManager.sortNumeric);
                q ? (b.removeBalls(), b.startDrawBalls(E, m, 0), g.children[0].children[0].text = "# " + d[r].round, E = g.getChildByName("totalBox"), E.getChildByName("tBet").children[0].text = formatFLGNums(d[r].betsHistory.getTotalBet(), !1), E.getChildByName("tWin").children[0].text = formatFLGNums(d[r].betsHistory.setTotalWin(), !1), E = null) : (q = a.mainRenderer.createButton(g, 180 - F.x, 240 - F.y, void 0, {
                    text: "# " + d[r].round,
                    align: "center",
                    style: e.detailEditionsFont
                }), b = new T(825 - F.x - 65 * a.gameConfig[a.configType].ballCount, 208 - F.y, 65, g),
                    b.startDrawBalls(E, m, 0), q = a.mainRenderer.createButton(g, 980 - F.x, 240 - F.y, "history_arrow_left"), a.mainRenderer.createButton(q, 0, 0, "history_arrow_left_selected", void 0, function (ea, za) {
                    a.mainSoundManager.playSound("buttonClick");
                    g.editionInd = limit(g.editionInd - 1, 0, d.length - 2);
                    e.drawDetailEditionHistory(g, g.editionInd);
                    za.stopped = !0;
                    a.mainUIManager.clickAnimationFunc(ea, "bet_arrow_History");
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, void 0, function (ea) {
                    ja(ea, "bet_arrow_History")
                }, function (ea) {
                    ia(ea,
                        "bet_arrow_History")
                }).alpha = 0, q.anchor.set(.5, .5), q.children[0].anchor.set(.5, .5), q = a.mainRenderer.createButton(g, 1080 - F.x, 240 - F.y, "history_arrow"), a.mainRenderer.createButton(q, 0, 0, "history_arrow_selected", void 0, function (ea, za) {
                        a.mainSoundManager.playSound("buttonClick");
                        g.editionInd = limit(g.editionInd + 1, 0, d.length - 2);
                        e.drawDetailEditionHistory(g, g.editionInd);
                        za.stopped = !0;
                        a.mainUIManager.clickAnimationFunc(ea, "bet_arrow_History2");
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }, void 0, void 0,
                    function (ea) {
                        ja(ea, "bet_arrow_History2")
                    }, function (ea) {
                        ia(ea, "bet_arrow_History2")
                    }).alpha = 0, q.anchor.set(.5, .5), q.children[0].anchor.set(.5, .5), q = a.mainRenderer.createButton(g, 685 - F.x, 342 - F.y, void 0, {
                    text: mainLocalizationTable.coef.toUpperCase(),
                    align: "center",
                    style: e.detailEditionsHeaderFont
                }), q.anchor.set(.5, .5), q = a.mainRenderer.createButton(g, 120 - F.x, 342 - F.y, void 0, {
                    text: mainLocalizationTable.balls.toUpperCase(),
                    align: "center",
                    style: e.detailEditionsHeaderFont
                }), q.anchor.set(.5, .5), q = a.mainRenderer.createButton(g,
                    850 - F.x, 342 - F.y, void 0, {
                        text: mainLocalizationTable.bet.toUpperCase(),
                        align: "center",
                        style: e.detailEditionsHeaderFont
                    }), q.anchor.set(.5, .5), q = a.mainRenderer.createButton(g, 1033 - F.x, 342 - F.y, void 0, {
                    text: mainLocalizationTable.win.toUpperCase(),
                    align: "center",
                    style: e.detailEditionsHeaderFont
                }), q.anchor.set(.5, .5), q = a.mainRenderer.createButton(g, 545 - F.x, 342 - F.y, void 0, {
                    text: "#",
                    align: "center",
                    style: e.detailEditionsHeaderFont
                }), q.anchor.set(.5, .5), ca = new MaskedSprite(a.mainRenderer.createButton(g, 0, 0),
                    {
                        mask: {x: 60 - F.x, y: 364 - F.y, width: 1070, height: 426},
                        needScrolling: {}
                    }, a.mainRenderer.renderManager), ca.srcSprite.interactive = !0, ca.srcSprite.hitArea = new PIXI.Rectangle(70 - F.x, 362 - F.y, 1061, 432), E = a.mainRenderer.createButton(g, 68 - F.x, 826 - F.y, void 0), E.name = "totalBox", E.anchor.y = .5, a.mainRenderer.createButton(E, 56, 0, void 0, {
                    text: mainLocalizationTable.total.toUpperCase(),
                    align: "center",
                    style: e.detailEditionsHeaderFont
                }), a.mainRenderer.createButton(E, 478, 0, void 0, {
                    text: mainLocalizationTable.bet.toUpperCase() +
                        ":", align: "center", style: e.detailEditionsHeaderFont
                }), q = a.mainRenderer.createButton(E, 617, 0, "tab_history_row2"), q.anchor.set(.5, .5), q.scale.x = .145, a.mainRenderer.createButton(E, 617, 0, void 0, {
                    text: formatFLGNums(d[r].betsHistory.getTotalBet(), !1),
                    align: "center",
                    style: e.detailEditionsRowFont
                }).name = "tBet", a.mainRenderer.createButton(E, 783, 0, void 0, {
                    text: mainLocalizationTable.win.toUpperCase() + ":",
                    align: "center",
                    style: e.detailEditionsHeaderFont
                }), q = a.mainRenderer.createButton(E, 966, 0, "tab_history_row2"),
                    q.anchor.set(.5, .5), q.scale.x = .18, a.mainRenderer.createButton(E, 966, 0, void 0, {
                    text: formatFLGNums(d[r].betsHistory.setTotalWin(), !1),
                    align: "center",
                    style: e.detailEditionsRowFont
                }).name = "tWin", q = E = null);
                E = [];
                var I;
                E = ca.containerForScroll;
                var Q;
                for (q = 0; E.getChildByName("row_" + q); q++) if (I = E.getChildByName("row_" + q)) {
                    I.visible = !1;
                    for (Q = 0; I.getChildByName("rect" + q + "_" + Q); Q++) {
                        var M = I.getChildByName("rect" + q + "_" + Q);
                        M.visible = !1;
                        M.getChildByName("textBet" + q + "_" + Q).visible = !1
                    }
                    if (M = I.getChildByName("summ" +
                        q)) M.visible = !1, I.getChildByName("win" + q).visible = !1, I.getChildByName("coef" + q).visible = !1, I.getChildByName("coefMode" + q).visible = !1
                }
                g.children[2].interactive = 0 !== g.editionInd;
                g.children[2].alpha = 0 !== g.editionInd ? 1 : .3;
                g.children[3].interactive = g.editionInd !== d.length - 2;
                g.children[3].alpha = g.editionInd !== d.length - 2 ? 1 : .3;
                g.children[4].visible = 0 < d[r].betsHistory.bets.length;
                g.children[5].visible = 0 < d[r].betsHistory.bets.length;
                g.children[6].visible = 0 < d[r].betsHistory.bets.length;
                g.children[7].visible =
                    0 < d[r].betsHistory.bets.length;
                g.children[8].visible = 0 < d[r].betsHistory.bets.length;
                if (0 >= d[r].betsHistory.bets.length) E.emit("updateHeight"); else {
                    var Y = [];
                    q = 0;
                    for (var aa = d[r].betsHistory.bets.length - 1; q < d[r].betsHistory.bets.length; q++, aa--) {
                        (I = E.getChildByName("row_" + q)) ? I.visible = !0 : (I = new a.mainRenderer.createButton(E, 68 - F.x, 391 + 61 * q - F.y, "tab_history_row"), I.anchor.y = .5, I.name = "row_" + q);
                        for (Q = 0; Q < d[r].betsHistory.bets[aa].bet.length; Q++) {
                            Y = d[r].betsHistory.bets[aa].bet.slice();
                            Y.sort(a.mainGameManager.sortNumeric);
                            var Aa = -1 < d[r].betsHistory.bets[aa].winBets.indexOf(Y[Q]);
                            (M = I.getChildByName("rect" + q + "_" + Q)) ? (M.texture = Aa ? a.mainRenderer.resourceLoader.resources.ball.texture : e.rectTexture, M.visible = !0, M = M.getChildByName("textBet" + q + "_" + Q), M.children[0].text = Y[Q], M.visible = !0) : (M = new PIXI.Sprite(Aa ? a.mainRenderer.resourceLoader.resources.ball.texture : e.rectTexture), I.addChild(M), M.position.x = 32 + 56 * Q, M.position.y = 0, M.scale.set(.65, .65), M.anchor.set(.5, .5), M.name = "rect" + q + "_" + Q, M = a.mainRenderer.createButton(M, 0,
                                0, void 0, {
                                    text: Y[Q],
                                    align: "center",
                                    style: {font: "bold 44px Arial Narrow", fill: "#000", align: "center"}
                                }), M.anchor.set(.5, .5), M.name = "textBet" + q + "_" + Q);
                            Aa = null
                        }
                        Q = void 0 != d[r].betsHistory.bets[aa].win ? formatFLGNums(d[r].betsHistory.bets[aa].win, !1) : "";
                        Y = void 0 != d[r].betsHistory.bets[aa].countWin ? a.mainGameManager.coefficients[d[r].betsHistory.bets[aa].coef - 1][d[r].betsHistory.bets[aa].countWin] / 100 : "";
                        (M = I.getChildByName("summ" + q)) ? (M.children[0].text = formatFLGNums(d[r].betsHistory.bets[aa].summ, !1), M.visible =
                            !0, M = I.getChildByName("coef" + q), M.children[0].text = "X  " + Y, M.visible = !0, Y = I.getChildByName("coefMode" + q), Y.children[0].text = d[r].betsHistory.bets[aa].coef, Y.visible = !0, I = I.getChildByName("win" + q), I.children[0].text = Q, I.visible = !0) : (a.mainRenderer.createButton(I, 780, 0, void 0, {
                            text: formatFLGNums(d[r].betsHistory.bets[aa].summ, !1),
                            align: "center",
                            style: e.detailEditionsRowFont
                        }).name = "summ" + q, a.mainRenderer.createButton(I, 615, 0, void 0, {
                            text: "X " + Y,
                            align: "center",
                            style: e.detailEditionsRowFont
                        }).name = "coef" +
                            q, a.mainRenderer.createButton(I, 965, 0, void 0, {
                            text: Q,
                            align: "center",
                            style: e.detailEditionsRowFont
                        }).name = "win" + q, a.mainRenderer.createButton(I, 478, 0, void 0, {
                            text: d[r].betsHistory.bets[aa].coef,
                            align: "center",
                            style: e.detailEditionsRowFont
                        }).name = "coefMode" + q)
                    }
                    Y = [];
                    E.emit("updateHeight");
                    Y = Q = M = M = Y = M = I = M = I = E = F = null
                }
            };
            this.cancelLastEdition = function (g) {
                d.length && (d[d.length - 1].editionResult = g, d[d.length - 1].betsHistory.calculateWin(g), G(d.length - 1))
            };
            this.addEdition = function (g) {
                6 <= d.length && (d[0].betsHistory.destroy &&
                d[0].betsHistory.destroy(), d[0].betsHistory = null, d.shift());
                d.length && !d[d.length - 1].betsHistory.bets.length ? (d[d.length - 1].round = g, d[d.length - 1].editionResult = void 0) : d.length && d[d.length - 1].round === g || (d.push({
                    round: g,
                    editionResult: void 0,
                    betsHistory: new S([])
                }), d[d.length - 1].betsHistory.parentEditions(e));
                G(d.length - 1)
            };
            this.saveToStorage = async function () {
                localStorage.setItem("curUser", JSON.stringify({hall: clientInfoGlobal.hall, nick: clientInfoGlobal.lgn}));
                var g = [], r;
                for (r = 0; r < d.length; r++) g.push({
                    round: d[r].round,
                    editionResult: d[r].editionResult, bets: d[r].betsHistory.bets
                });
                localStorage.setItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "editions", JSON.stringify(g))
            };
            this.loadFromStorage = function () {
                function g(F) {
                    $.ajax({
                        type: "get",
                        url: getUrl(),
                        data: {
                            gethistory: parseInt(a.gameConfig[a.configType].serverName.slice(3, a.gameConfig[a.configType].serverName.length)),
                            round: F.round + 1
                        },
                        dataType: "json",
                        async: !1,
                        success: function (E, I, Q) {
                            if (e) if (E && E.tirid0) {
                                I = [];
                                Q = E.tirid0;
                                for (E = 0; E < a.gameConfig[a.configType].ballCount; E++) {
                                    if (99 ===
                                        Q["b" + E] || 0 === Q["b" + E]) return;
                                    I.push(Q["b" + E])
                                }
                                F.editionResult = I;
                                a.mainGameManager.coefficients && F.betsHistory.calculateWin(F.editionResult, !0)
                            } else F.editionResult = []
                        }
                    })
                }

                if (localStorage.getItem("curUser")) {
                    var r = JSON.parse(localStorage.getItem("curUser"));
                    if (r.hall !== clientInfoGlobal.hall && r.nick !== clientInfoGlobal.lgn) return
                }
                r = a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "editions";
                if (localStorage.getItem(r)) {
                    var q = JSON.parse(localStorage.getItem(r));
                    for (r = 0; r < q.length; r++) d.push({
                        round: q[r].round,
                        editionResult: q[r].editionResult, betsHistory: new S(q[r].bets)
                    }), (!d[r].editionResult || d[r].editionResult.length < a.gameConfig[a.configType].ballCount) && g(d[r]);
                    G(d.length - 1)
                }
            };
            G(d.length - 1);
            this.events = new PIXI.utils.EventEmitter;
            e.events.on("EDITIONS_CHANGE", function () {
                e.saveToStorage()
            });
            e.events.on("RESULT_TIME", V);
            e.events.on("BET_TIME", V)
        }, v = {};
    this.animations = function () {
        return v
    };
    this.clickAnimationFunc = function (e, d) {
        e && (v[d] && (v[d].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(),
            v[d] = (new TWEEN.Tween(e)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                v[d] = null;
                a.mainRenderer.renderManager.animationTweenInc();
                v[d] = (new TWEEN.Tween(e)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    v[d] = null
                }).start()
            }).start())
    };
    var ja = function (e, d, h) {
        if (e) switch (v[d] && (v[d].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(),
            h) {
            case "grow":
                v[d] = (new TWEEN.Tween(e.scale)).to({
                    x: 1.2,
                    y: 1.2
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    v[d] = null
                }).start();
                break;
            default:
                v[d] = (new TWEEN.Tween(e)).to({alpha: .6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    v[d] = null
                }).start()
        }
    }, ia = function (e, d, h) {
        v[d] && (v[d].stop(), a.mainRenderer.renderManager.animationTweenDec());
        if (e && 0 != e.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(),
            h) {
            case "grow":
                v[d] = (new TWEEN.Tween(e.scale)).to({
                    x: 1,
                    y: 1
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    v[d] = null
                }).start();
                break;
            default:
                v[d] = (new TWEEN.Tween(e)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    v[d] = null
                }).start()
        }
    }, Ca = function (e, d, h) {
        if (e.container) {
            v[h] && v[h].stop();
            if (e.onStartClose) e.onStartClose();
            a.mainRenderer.renderManager.animationTweenInc();
            v[h] = (new TWEEN.Tween(e.container.scale)).to({y: 0},
                165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                if (e.onStopClose) e.onStopClose();
                if (d.onStopOpen) d.onStopOpen();
                a.mainRenderer.renderManager.animationTweenDec();
                v[h] = null;
                e.container.scale.y = 0;
                d.container.scale.y = 1
            }).onComplete(function () {
                if (e.onStopClose) e.onStopClose();
                a.mainRenderer.renderManager.animationTweenDec();
                v[h] = null;
                if (d.onStartOpen) d.onStartOpen();
                a.mainRenderer.renderManager.animationTweenInc();
                v[h] = (new TWEEN.Tween(d.container.scale)).to({y: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                    if (e.onStopClose) e.onStopClose();
                    if (d.onStopOpen) d.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    v[h] = null;
                    e.container.scale.y = 0;
                    d.container.scale.y = 1
                }).onComplete(function () {
                    if (d.onStopOpen) d.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    v[h] = null
                }).start()
            }).start()
        }
    }, pa = function (e, d, h) {
        e && (v[d] ? v[d].stop() : (a.mainRenderer.renderManager.animationTweenInc(), v[d] = (new TWEEN.Tween(e.position)).to({x: h}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            v[d] = null
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            v[d] = null
        }).start()))
    };
    this.simpleFlipXFunc = function (e, d, h, C, H, u) {
        v[d] && v[d].stop();
        var c = e.scale.x;
        a.mainRenderer.renderManager.animationTweenInc();
        v[d] = (new TWEEN.Tween(e.scale)).to({x: 0}, h).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            v[d] = null;
            e.scale.x = c
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            v[d] = null;
            H && H(e);
            a.mainRenderer.renderManager.animationTweenInc();
            v[d] = (new TWEEN.Tween(e.scale)).to({x: c}, C).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                v[d] = null;
                e.scale.x = c;
                u && u(e)
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                v[d] = null;
                u && u(e)
            }).start()
        }).start()
    };
    var va, wa, oa = !1,
        na = [["JP", a.gameDir + "WinJP/jp-jackpot-win.png"], ["jp_only", a.gameDir + "WinJP/jp-jackpot-only.png"], ["WIN", a.gameDir + "WinJP/jp-bigwin.png"], ["jp_name", a.gameDir + "jackpot/jack-pot.png"], ["jp_num_bot", a.gameDir + "jackpot/num-bot.png"], ["jp_num_top",
            a.gameDir + "jackpot/num-top.png"], ["bet_arrow", a.gameDir + "arrow.png"], ["bet_arrow_selected", a.gameDir + "arrow-selected.png"], ["history_arrow", a.gameDir + "arrow-history.png"], ["history_arrow_selected", a.gameDir + "arrow-history-selected2.png"], ["history_arrow_left", a.gameDir + "arrow-history-l.png"], ["history_arrow_left_selected", a.gameDir + "arrow-history-l-selected2.png"], ["tab_history_row", a.gameDir + "tab-history-row-sep-min.png"], ["tab_history_row2", a.gameDir + "tab-history-row.png"], ["hotcold_bg", a.gameDirMobile +
        "hotcold-bg-mobile.png"], ["eye_icon", a.gameDir + "eye-icon-min.png"], ["eye_closed_icon", a.gameDir + "eye-closed-icon-min.png"], ["ball", a.gameDir + "ball_.png"], ["menu_btn_middle_flat", a.gameDirMobile + "menu-btn-middle-flat.png"], ["menu_btn_middle_flat_pressed", a.gameDirMobile + "menu-btn-middle-flat-pressed.png"], ["menu_btn_large", a.gameDirMobile + "menu-btn-grand.png"], ["menu_btn_large_pressed", a.gameDirMobile + "menu-btn-grand-pressed.png"], ["autoplay", a.gameDirMobile + "btn-autoplay.png"], ["autoplay_pressed",
            a.gameDirMobile + "btn-autoplay-pressed.png"], ["btn_menu_small", a.gameDirMobile + "btn-menu-small5.png"], ["btn_menu_small_pressed", a.gameDirMobile + "btn-menu-small-pressed5.png"], ["btn_balance_small", a.gameDirMobile + "btn-balance-small3.png"], ["btn_balance_small_pressed", a.gameDirMobile + "btn-balance-small-pressed3.png"], ["bet", a.gameDirMobile + "btn-balance2.png"], ["btn_plus", a.gameDirMobile + "plus.png"], ["btn_plus_pressed", a.gameDirMobile + "plus-pressed.png"], ["tab_bg", a.gameDirMobile + "tab-bg-mobile2.png"],
            ["table_header", a.gameDirMobile + "bet-header-mobile_.png"], ["table_footer", a.gameDirMobile + "bet-footer-mobile.png"], ["bg_main", a.gameDirMobile + "bg_" + a.gameConfig[a.configType].gameType.toLowerCase() + ".jpg"], ["game_5_36", a.gameDirMobile + "5-" + a.gameConfig[a.configType].gameType.toLowerCase() + ".png"], ["game_6_42", a.gameDirMobile + "6-" + a.gameConfig[a.configType].gameType.toLowerCase() + ".png"], ["game_7_49", a.gameDirMobile + "7-" + a.gameConfig[a.configType].gameType.toLowerCase() + ".png"], ["video_skin", a.gameDirMobile +
            "video-skin-" + a.gameConfig[a.configType].gameType.toLowerCase() + ".png"], ["video_skin_off", a.gameDirMobile + "video-skin-off-" + a.gameConfig[a.configType].gameType.toLowerCase() + ".jpg"], ["zone_transp", a.gameDir + "zone-" + a.gameConfig[a.configType].gameType + "_.png"], ["zone_hot", a.gameDir + "zone-hot.png"], ["zone_cold", a.gameDir + "zone-cold.png"], ["zone_selected", a.gameDir + "zone-action-" + a.gameConfig[a.configType].gameType + "_.png"], ["zone_pressed", a.gameDir + "zone-win-" + a.gameConfig[a.configType].gameType + "2.png"],
            ["zone_win", a.gameDir + "zone-pressed-" + a.gameConfig[a.configType].gameType + "2.png"], ["zone_lock", a.gameDir + "zone-lock-" + a.gameConfig[a.configType].gameType + "2.png"], ["zone_lock2", a.gameDir + "zone-lock-" + a.gameConfig[a.configType].gameType + "2.png"], ["grid_bg", a.gameDir + "grid-" + a.gameConfig[a.configType].gameType + ".png"], ["grid_bg_copy", a.gameDir + "grid-" + a.gameConfig[a.configType].gameType + "-copy.png"], ["coef_bg", a.gameDirMobile + "bg_coef.png"], ["coef_line_left", a.gameDir + "coef-line-left.png"], ["coef_line_middle",
                a.gameDir + "coef-line-middle.png"], ["coef_line_right", a.gameDir + "coef-line-right.png"], ["rules_1", a.gameDir + "rules_1_" + a.gameConfig[a.configType].gameType + "-min.png"], ["rules_2", a.gameDir + "rules_2_" + a.gameConfig[a.configType].gameType + "-min.png"], ["rules_3", a.gameDir + "rules_3_" + a.gameConfig[a.configType].gameType + "-min.png"], ["rules_4", a.gameDir + "rules_4_" + a.gameConfig[a.configType].gameType + "-min.png"], ["rules_5", a.gameDir + "rules_5-min.png"], ["rules_6", a.gameDir + "rules_6-min.png"], ["rules_7", a.gameDir +
            "rules_7-min.png"], ["atlas", a.gameDirMobile + "sprite/lottoM.json"], ["atlas2", a.gameDirMobile + "sprite/lottoM-bg.json"], ["video_play", a.gameDirMobile + "play-on.png"], ["video_play_off", a.gameDirMobile + "play-off.png"], ["video_load", a.gameDirMobile + "btn-video-load-new.png"]];
    na = na.concat(a.mainFLGAccount.resources);
    na = na.concat(ha.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, FLGUtils.staticRootPath + "images/logo.json", na, function (e, d, h) {
        function C(b, f, k) {
            var l = -1, n = -1, x;
            for (x in D) if (!D[x].isUsed) {
                l =
                    parseInt(x);
                D[l].isLast && (n = l == D.length - 1 ? 0 : l + 1);
                break
            }
            a.mainRenderer.renderManager.animationTweenInc();
            a.mainUIManager.animations().lottoTicket = (new TWEEN.Tween({
                scale: 1,
                position: ba.position.y,
                alpha: 1
            })).to({scale: .9, position: -50, alpha: 0}, f ? 0 : 250).onUpdate(function () {
                ba.scale.set(this.scale, this.scale);
                ba.position.y = this.position;
                for (var t = 1 - .08 * l, G = 1 - .15 * l, y = 0; y < l; y++) D[y].position.y = -40 * (l - y) * t + this.position, D[y].scale.set(this.scale - .08 * (l - y), this.scale - .08 * (l - y)), D[y].alpha = G, t += .08, G += .15;
                D[l].isLast &&
                (D[n].alpha = this.alpha)
            }).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations().lottoTicket = null;
                D[l].isLast && (D[n].position.x = -1200, D[n].position.y = 0, D[n].scale.set(1, 1), D[n].isUsed = !1, D[n].isLast = !0, D[n].alpha = 1, p.game.container.removeChild(D[n]), p.game.container.addChildAt(D[n], p.game.container.getChildIndex(ba) + 1), D[l].isLast = !1);
                a.mainRenderer.renderManager.animationTweenInc();
                a.mainUIManager.animations().lottoTicketCopy =
                    (new TWEEN.Tween(D[l].position)).to({x: 0}, f ? 0 : 250).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        a.mainUIManager.animations().lottoTicketCopy = null;
                        D[l].isUsed = !0;
                        if (b) {
                            var t;
                            for (t in b) {
                                var G = a.mainGrid.zones[b[t] - 1];
                                G.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture;
                                G.children[0].style = {
                                    font: "50px Swiss721-CondensedBold",
                                    fill: a.gameConfig[a.configType].gridNumColor,
                                    align: "center"
                                }
                            }
                        }
                        ba.scale.set(1, 1);
                        ba.position.y = 0;
                        p.game.container.removeChild(D[l]);
                        p.game.container.addChildAt(D[l], p.game.container.getChildIndex(ba));
                        D[l].scale.set(.9, .9);
                        D[l].position.y -= 50;
                        k && k()
                    }).start()
            }).start()
        }

        function H(b) {
            if (a.configType != b) {
                a.mainSoundManager.playSound("buttonClick");
                var f = a.gameConfig[a.configType].canvasId;
                $("#" + f).attr("gameType", b);
                removeLottoMBKObject(f, a.configType.toLowerCase());
                initLottoMBKObject(f, b)
            }
        }

        function u(b, f) {
            p.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + f).children[1].interactive =
                !1;
            p.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + f).children[1].alpha = 1;
            p.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + f).children[1].children[0].style = {
                font: "bold 30px Arial",
                fill: "#000"
            };
            p.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + f).children[1].interactive = !1;
            p.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + f).children[1].alpha = 1;
            p.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" +
                f).children[1].children[0].style = {font: "bold 30px Arial", fill: "#000"};
            p.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].interactive = !0;
            p.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].alpha = 0;
            p.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].children[0].style = {
                font: "bold 30px Arial",
                fill: "#444"
            };
            p.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].interactive =
                !0;
            p.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].alpha = 0;
            p.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].children[0].style = {
                font: "bold 30px Arial",
                fill: "#444"
            };
            localStorage.setItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "coefMode", JSON.stringify(f))
        }

        a.mainRenderer.createButton(void 0, 0, 0, "bg_main");
        Z.position.set(1920, 246);
        e = new PIXI.Graphics;
        e.beginFill(a.gameConfig[a.configType].menuBgColor);
        e.drawRect(0, 142, 746, 684);
        e.endFill;
        Z.addChild(e);
        e = new PIXI.Graphics;
        e.beginFill(0, .6);
        e.drawRect(0, 142, 746, 684);
        e.endFill;
        Z.addChild(e);
        Z.interactive = !0;
        ma = new T(a.gameConfig[a.configType].resBallX + 180, 25, 139, void 0, !0);
        var c = a.mainRenderer.createButton(void 0, 50, 60, void 0, {
            text: "00:00",
            align: "left",
            style: {font: "bold 72px Arial", fill: "#c7c7c7"}
        });
        c.anchor.set(.5, .5);
        c.name = "timer_main";
        c = a.mainRenderer.createButton(void 0, 50, 130, void 0, {
            text: "# ",
            align: "left",
            style: {font: "bold 36px Arial", fill: "#c7c7c7"}
        });
        c.anchor.set(.5, .5);
        c.name = "round_main";
        a.mainRenderer.createButton(void 0, 1440, 55, void 0, {
            text: mainLocalizationTable.totalBet.toUpperCase() + ":",
            align: "center",
            style: {font: "bold 34px Arial", fill: "#c7c7c7"}
        }).name = "betSprite";
        a.mainRenderer.stage.getChildByName("betSprite").alpha = 0;
        a.mainRenderer.createButton(void 0, 1440, 110, void 0, {
            text: formatFLGNums(a.mainFLGAccount.totalBet()),
            align: "center",
            style: {font: "bold 45px Arial", fill: "#e8a023"}
        }).name = "betTxt";
        a.mainRenderer.stage.getChildByName("betTxt").alpha =
            0;
        va = function (b) {
            a.mainRenderer.stage.getChildByName("betTxt").children[0].text = formatFLGNums(b);
            a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("betTxt").children[0]);
            a.mainRenderer.stage.getChildByName("betSprite").alpha = 0 < b ? 1 : 0;
            a.mainRenderer.stage.getChildByName("betTxt").alpha = 0 < b ? 1 : 0;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        a.mainFLGAccount.events.on("onBet", va);
        c = a.mainRenderer.createButton(void 0, 1553, 20, "bet", {
            text: "DEMO" ==
            clientInfoGlobal.hall ? "DEMO" : formatFLGNums(a.mainFLGAccount.balance()),
            align: "center",
            style: {font: "bold 65px Arial", fill: "#e8a023"}
        }, function () {
            var b = a.gameConfig[a.configType].canvasId, f = ["red", "blue", "green"][Math.floor(4 * Math.random())];
            $("#" + b).attr("gameType", f);
            removeLottoMBKObject(b, a.gameConfig[a.configType].gameType.toLowerCase());
            initLottoMBKObject(b, f)
        });
        c.name = "balanceTxt";
        c.children[0].anchor.y = .77;
        a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("balanceTxt").children[0]);
        a.mainRenderer.createButton(c, c.width / 2, .8 * c.height, void 0, {
            text: mainLocalizationTable.balance.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial Narrow", fill: "#323232"}
        });
        wa = function (b) {
            a.mainRenderer.stage.getChildByName("balanceTxt").children[0].text = "DEMO" == clientInfoGlobal.hall ? "DEMO" : formatFLGNums(b);
            a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("balanceTxt").children[0])
        };
        a.mainFLGAccount.events.on("onBalance", wa);
        c = a.mainRenderer.createButton(w, 1176, 849, "btn_menu_small");
        a.mainRenderer.createButton(c, 0, 0, "btn_menu_small_pressed", void 0, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            R.clickAnimationFunc(b, "btn_menu");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, f) {
            pa(Z, "menuContainer", 1174);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(c, c.width / 2, c.height / 2, void 0, {
            text: mainLocalizationTable.menu.toUpperCase(),
            align: "center",
            style: {font: "bold 36px Arial Narrow", fill: "#323232"}
        });
        c = a.mainRenderer.createButton(w, 1176, 963, "btn_balance_small");
        c.name = "bet_on_autoplay";
        a.mainRenderer.createButton(c, 0, 0, "btn_balance_small_pressed", void 0, function (b, f) {
            a.mainSoundManager.playSound("chipSelector");
            U.incrementBet();
            var k = w.getChildByName("bet_on_autoplay").getChildByName("betText").children[0];
            U.isMaxBet() ? k.text = "MAX\n" + J : k.text = U.currentBet();
            localStorage.setItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "defaultBet", JSON.stringify(U.currentBet()));
            a.mainUIManager.setTextScale(k);
            ua();
            f.stopped = !0;
            R.clickAnimationFunc(b, "btn_balance_small");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(c, c.width / 2, c.height / 2, void 0, {
            text: mainLocalizationTable.bet.toUpperCase(),
            align: "center",
            style: {font: "bold 28px Arial Narrow", fill: "#323232"}
        });
        c.children[1].children[0].anchor.set(.5, -.5);
        c = a.mainRenderer.createButton(w.getChildByName("bet_on_autoplay"), 106, 39, void 0, {
            text: U.currentBet(), align: "center", style: {
                font: "bold 48px Arial",
                fill: "#e8a023", align: "center"
            }
        });
        c.name = "betText";
        c.anchor.set(.5, .5);
        a.mainUIManager.setTextScale(w.getChildByName("bet_on_autoplay").getChildByName("betText").children[0]);
        c = a.mainRenderer.createButton(w, 1391, 963, "autoplay");
        c.name = "btn_autoplay";
        a.mainRenderer.createButton(c, 0, 0, "autoplay_pressed", void 0, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            R.clickAnimationFunc(b, "btn_autoplay");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, f) {
            pa(z, "autoplayContainer",
                1174);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(c, c.width / 2, c.height / 2, void 0, {
            text: mainLocalizationTable.autoPlay.toUpperCase(),
            align: "center",
            style: {font: "bold 36px Arial Narrow", fill: "#323232"}
        });
        a.mainRenderer.createButton(c, .83 * c.width, c.height / 2, void 0, {
            text: "",
            align: "center",
            style: {font: "bold 60px Arial Narrow", fill: "#323232"}
        }).name = "autoplay_remain_num";
        c = a.mainRenderer.createButton(w, 1391, 849, "autoplay");
        c.name = "btn_random";
        a.mainRenderer.createButton(c,
            0, 0, "autoplay_pressed", void 0, function (b, f) {
                a.mainGrid.removeCurrentBets();
                a.mainGrid.createRandomBets();
                ua();
                f.stopped = !0;
                R.clickAnimationFunc(b, "btn_random");
                (b = w.getChildByName("btn_plus")) && b.interactive && (b.emit("mousedown"), b.emit("mouseup"));
                a.mainRenderer.renderManager.needUpdateRender = !0
            }).alpha = 0;
        a.mainRenderer.createButton(c, c.width / 2, c.height / 2, void 0, {
            text: mainLocalizationTable.random.toUpperCase(),
            align: "center",
            style: {font: "bold 36px Arial Narrow", fill: "#323232"}
        });
        c = a.mainRenderer.createButton(w,
            1676, 849, "btn_plus", {
                text: a.gameConfig[a.configType].ballCount,
                align: "center",
                style: {font: "bold 110px Arial", fill: "#595959", align: "center"}
            }, function (b, f) {
                a.mainSoundManager.playSound("buttonClick");
                if (0 < a.mainGrid.pressedZones.length) {
                    b.interactive = !1;
                    w.getChildByName("btn_random").children[0].interactive = !1;
                    var k = a.mainGrid.getIntArrayOfPressedZones();
                    A.getActedOutEdition().betsHistory.addBet({
                            summ: U.currentBet(),
                            bet: k,
                            coef: a.mainGameManager.coefMode,
                            winBets: [],
                            countWin: 0,
                            win: void 0
                        }, A.getActedOutEdition().round,
                        function (l) {
                            if (l) {
                                a.mainFLGAccount.maxWin(0);
                                for (var n in k) switch (l = a.mainGrid.zones[k[n] - 1], l.emit("mousedown"), l.emit("mouseup"), l.currentLayer = !1, l.getChildByName("text" + l.name).style = {
                                    font: "50px Swiss721-CondensedBold",
                                    fill: "#000",
                                    align: "center"
                                }, l.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, l.isLock ? l.isLock++ : l.isLock = 1, l.isLock) {
                                    case 1:
                                        l.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                        break;
                                    default:
                                        l.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                                }
                                l =
                                    null;
                                C(k, !1, function () {
                                    A.events.emit("GRID_STATS");
                                    w.getChildByName("btn_random").children[0].interactive = !0;
                                    w.getChildByName("btn_plus").interactive = !0;
                                    w.getChildByName("btn_plus").texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture
                                })
                            }
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        })
                }
                f && (f.stopped = !0);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (b) {
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, function (b) {
                b.children[0].style = "+" != b.children[0].text ? {
                    font: "bold 110px Arial",
                    fill: "#595959", align: "center"
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
        c.interactive = !1;
        e = a.mainRenderer.createButton(w, 1676, 849, "btn_plus", void 0, function (b, f) {
            b.isPlay ? (p.game.button.emit("mousedown"), b.getChildByName("video_play").texture =
                a.mainRenderer.resourceLoader.resources.video_play.texture, w.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture, b.texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture, b.isPlay = !1) : (p.video.button.emit("mousedown"), b.getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play_off.texture, w.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin_off.texture, b.texture = a.mainRenderer.resourceLoader.resources.btn_plus_pressed.texture,
                b.isPlay = !0);
            f.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        e.name = "videoPlayBtn";
        c = a.mainRenderer.createButton(w, 1770, 265, "video_skin", void 0, function (b, f) {
            w.getChildByName("videoPlayBtn").isPlay ? (p.game.button.emit("mousedown"), w.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture, b.texture = a.mainRenderer.resourceLoader.resources.video_skin.texture, w.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture,
                w.getChildByName("videoPlayBtn").isPlay = !1) : (p.video.button.emit("mousedown"), w.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play_off.texture, b.texture = a.mainRenderer.resourceLoader.resources.video_skin_off.texture, w.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus_pressed.texture, w.getChildByName("videoPlayBtn").isPlay = !0)
        });
        c.anchor.set(.5, .5);
        e.visible = !1;
        a.mainRenderer.createButton(e, e.width /
            2, e.height / 2, "video_play").anchor.set(.5, .5);
        e = new PIXI.Graphics;
        e.beginFill(0);
        e.drawRect(0, 0, 746, 684);
        e.endFill;
        e.name = "autoplay-bg2";
        z.position.set(1920, 388);
        z.addChild(e);
        z.interactive = !0;
        a.mainRenderer.createButton(z.getChildByName("autoplay-bg2"), 373, 68, void 0, {
            text: mainLocalizationTable.autoPlay.toUpperCase(),
            align: "center",
            style: {font: "bold 90px Arial Narrow", fill: "#ffffff"}
        });
        a.mainRenderer.createButton(z.getChildByName("autoplay-bg2"), 370, 180, void 0, {
            text: mainLocalizationTable.autoplayRoundNumber,
            align: "center", style: {font: "40px Arial Narrow", fill: "#ffffff"}
        }).name = "autoplayDesc1";
        a.mainRenderer.createButton(z.getChildByName("autoplay-bg2"), 370, 473, void 0, {
            text: mainLocalizationTable.autoplayStart,
            align: "center",
            style: {font: "40px Arial Narrow", fill: "#ffffff"}
        }).name = "autoplayDesc2";
        a.mainRenderer.createButton(z.getChildByName("autoplay-bg2"), 662, 38, "atlas%Jautoplay-close", void 0, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        }, void 0, function (b, f) {
            pa(z, "autoplayContainer", 1920);
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        for (e = 0; 3 > e; e++) {
            c = a.mainRenderer.createButton(z.getChildByName("autoplay-bg2"), 23 + 221 * e + 18 * e, 233, "atlas%Jautoplay-num");
            var B = void 0;
            switch (e) {
                case 0:
                    B = "5";
                    break;
                case 1:
                    B = "10";
                    break;
                case 2:
                    B = "50"
            }
            c.name += B;
            a.mainRenderer.createButton(c, 0, 0, "atlas%Jautoplay-num-pressed", void 0, function (b, f) {
                a.mainSoundManager.playSound("chipSelector");
                f.stopped = !0;
                R.clickAnimationFunc(b, "autoplay_num" + b.parent.position.x);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (b, f) {
                a.mainFLGAccount.autoplayManager.settings.isStarted(!0);
                a.mainFLGAccount.autoplayManager.settings.count(parseInt(b.parent.children[1].children[0].text));
                a.mainFLGAccount.autoplayManager.updateCallback("getOnlyBets");
                a.mainFLGAccount.autoplayManager.settings.isStarted() && (w.getChildByName("btn_autoplay").getChildByName("autoplay_remain_num").children[0].text = b.parent.children[1].children[0].text, z.getChildByName("autoplay-bg2").getChildByName("autoplayDesc1").children[0].text =
                    mainLocalizationTable.autoplayRemainingNumber + ": " + b.parent.children[1].children[0].text, z.getChildByName("autoplay-bg2").getChildByName("autoplayDesc2").visible = !1, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num5").visible = !1, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num10").visible = !1, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num50").visible = !1, z.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").children[0].text = b.parent.children[1].children[0].text,
                    z.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").visible = !0, z.getChildByName("autoplay-bg2").getChildByName("autoplay-stop").visible = !0, z.getChildByName("autoplay-bg2").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"], z.getChildByName("autoplay-bg2").getChildByName("repeat").children[0].interactive = !1);
                pa(z, "autoplayContainer", 1920);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }).alpha = 0;
            a.mainRenderer.createButton(c,
                c.width / 2, c.height / 2, void 0, {
                    text: B,
                    align: "center",
                    style: {font: "bold 120px Arial Narrow", fill: "#363636"}
                })
        }
        c = a.mainRenderer.createButton(z.getChildByName("autoplay-bg2"), 23, 539, "atlas%Jmenu-btn-grand2");
        c.name = "repeat";
        a.mainRenderer.createButton(c, 0, 0, "atlas%Jautoplay-repeat-pressed", void 0, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            R.clickAnimationFunc(b, "repeat");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, f) {
            b.parent.texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"];
            b.interactive = !1;
            a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet");
            pa(z, "autoplayContainer", 1920);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(c, c.width / 2, c.height / 2, void 0, {
            text: mainLocalizationTable.autoplayRepeatLastBet,
            align: "center",
            style: {font: "bold 50px Arial Narrow", fill: "#363636"}
        });
        a.mainRenderer.createButton(z.getChildByName("autoplay-bg2"), 23, 233, "atlas%Jautoplay-num-pressed", {
            text: "", align: "center", style: {
                font: "bold 120px Arial Narrow",
                fill: "#363636"
            }
        }).name = "autoplaySelected";
        z.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").visible = !1;
        c = a.mainRenderer.createButton(z.getChildByName("autoplay-bg2"), 262, 264, "atlas%Jautoplay-stop");
        a.mainRenderer.createButton(c, 0, 0, "atlas%Jautoplay-stop-pressed", void 0, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            R.clickAnimationFunc(b, "autoplay_stop");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, f) {
            a.mainFLGAccount.autoplayManager.stop();
            a.mainFLGAccount.autoplayManager.settings.isStarted() || (w.getChildByName("btn_autoplay").getChildByName("autoplay_remain_num").children[0].text = "", z.getChildByName("autoplay-bg2").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRoundNumber, z.getChildByName("autoplay-bg2").getChildByName("autoplayDesc2").visible = !0, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num5").visible = !0, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num10").visible = !0, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num50").visible =
                !0, z.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").visible = !1, z.getChildByName("autoplay-bg2").getChildByName("autoplay-stop").visible = !1, a.mainFLGAccount.autoplayManager.settings.repeatRoundNum() !== A.editions[A.editions.length - 1].round && A.editions[limit(A.editions.length - 2, 0, A.editions.length - 1)].betsHistory.bets.length && (z.getChildByName("autoplay-bg2").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand2"], z.getChildByName("autoplay-bg2").getChildByName("repeat").children[0].interactive =
                !0));
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(c, c.width / 2, c.height / 2, void 0, {
            text: mainLocalizationTable.autoplayStop,
            align: "center",
            style: {font: "bold 50px Arial Narrow", fill: "#363636"}
        });
        z.getChildByName("autoplay-bg2").getChildByName("autoplay-stop").visible = !1;
        c = a.mainRenderer.createButton(Z, 25, 162, "menu_btn_middle_flat");
        a.mainRenderer.createButton(c, 0, 0, "menu_btn_middle_flat_pressed", void 0, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            R.clickAnimationFunc(b, "btn_home");
            a.mainFLGAccount.closeGame();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).alpha = 0;
        a.mainRenderer.createButton(c, 171, 62, "atlas%Jhome-sign");
        c.getChildByName("home-sign").anchor.set(.5, .5);
        APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && c && (c.visible = clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl);
        c = a.mainRenderer.createButton(Z, 385, 162, "menu_btn_middle_flat", void 0);
        c.name = "btn_sound_outer";
        a.mainRenderer.createButton(c, 0, 0, "menu_btn_middle_flat_pressed",
            void 0, function (b, f) {
                a.mainSoundManager.playSound("buttonClick");
                f.stopped = !0;
                R.clickAnimationFunc(b, "btn_volume");
                a.mainSoundManager.muteSound(!a.mainSoundManager.isMuted());
                localStorage.setItem(a.gameConfig[a.configType].gameKind + "muteSound", a.mainSoundManager.isMuted());
                b.parent.getChildByName("volume-sign").texture = a.mainRenderer.resourceLoader.resources.atlas.textures[a.mainSoundManager.isMuted() ? "mute-sign" : "volume-sign"];
                a.mainRenderer.renderManager.needUpdateRender = !0
            }).alpha = 0;
        a.mainRenderer.createButton(c,
            171, 62, "atlas%Jvolume-sign");
        c.getChildByName("volume-sign").anchor.set(.5, .5);
        localStorage.getItem(a.gameConfig[a.configType].gameKind + "muteSound") && !0 === JSON.parse(localStorage.getItem(a.gameConfig[a.configType].gameKind + "muteSound")) && (a.mainSoundManager.muteSound(!0), Z.getChildByName("btn_sound_outer").getChildByName("volume-sign").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["mute-sign"]);
        c = a.mainRenderer.createButton(Z, 25, 694, "menu_btn_large", {
            text: mainLocalizationTable.returnGame.toUpperCase(),
            align: "center", style: {font: "bold 50px Arial", fill: "#323232"}
        }, function (b, f) {
            b.texture = a.mainRenderer.resourceLoader.resources.menu_btn_large_pressed.texture;
            b.children[0].style = {font: "bold 50px Arial", fill: "#ffffff"};
            f.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b, f) {
            b.texture = a.mainRenderer.resourceLoader.resources.menu_btn_large.texture;
            b.children[0].style = {font: "bold 50px Arial", fill: "#323232"};
            pa(Z, "menuContainer", 1920);
            p.game.button.emit("mousedown");
            w.getChildByName("videoPlayBtn").getChildByName("video_play").texture =
                a.mainRenderer.resourceLoader.resources.video_play.texture;
            w.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture;
            w.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture;
            w.getChildByName("videoPlayBtn").isPlay = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        c.scale.set(1, 1);
        for (var K in p) {
            switch (K) {
                case "game":
                    c = a.mainRenderer.createButton(ka, 587, 628, void 0);
                    break;
                case "history":
                    c = a.mainRenderer.createButton(ka,
                        586, 658, "tab_bg");
                    break;
                case "stats":
                    c = a.mainRenderer.createButton(ka, 586, 658, "tab_bg");
                    break;
                case "rules":
                    c = a.mainRenderer.createButton(ka, 586, 658, "tab_bg");
                    break;
                case "info":
                    c = a.mainRenderer.createButton(ka, 586, 625, void 0);
                    break;
                case "video":
                    c = a.mainRenderer.createButton(ka, 586, 625, void 0)
            }
            c.name = K;
            c.anchor.set(.5, .5);
            c.scale.y = 0;
            p[K].container = c;
            "stats" !== K && (function (b) {
                c = a.mainRenderer.createButton(Z, p[K].posX, p[K].posY, "menu_btn_middle_flat", {
                    text: p[K].text, align: "center", style: {
                        font: "bold 50px Arial",
                        fill: "#323232"
                    }
                }, function (f, k) {
                    if (!f.pressed) if ("history" === b && GamerHistory) {
                        f = document.getElementById("histWrap");
                        f || (f = document.createElement("div"), f.id = "histWrap", document.body.appendChild(f));
                        k = localLanguage();
                        switch (k) {
                            case "es":
                                k = "spa";
                                break;
                            case "en":
                                k = "eng";
                                break;
                            case "kz":
                                k = "kaz";
                                break;
                            case "ru":
                                k = "rus";
                                break;
                            case "fr":
                                k = "fra"
                        }
                        GamerHistory.setConfig({lg: clientInfoGlobal.lgn, lang: k});
                        f.parentNode.classList.add("seen")
                    } else {
                        f.texture = a.mainRenderer.resourceLoader.resources.menu_btn_middle_flat_pressed.texture;
                        f.children[0].style = {font: "bold 50px Arial", fill: "#ffffff"};
                        a.mainSoundManager.playSound("buttonClick");
                        for (var l in p) p[l].button && p[l].button.pressed && (p[l].button.pressed = !1, p[l].button.texture = a.mainRenderer.resourceLoader.resources.menu_btn_middle_flat.texture, p[l].button.children[0].style = {
                            font: "bold 50px Arial",
                            fill: "#323232"
                        }, Ca(p[l], p[f.name], "flipContainer"));
                        f.pressed = !0;
                        k && (k.stopped = !0);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }
                })
            }(K), c.name = K, p[K].button = c, p[K].pressedDefault &&
            (p[K].button.pressed = !0, p[K].button.texture = a.mainRenderer.resourceLoader.resources.menu_btn_middle_flat_pressed.texture, p[K].button.children[0].style = {
                font: "bold 50px Arial",
                fill: "#ffffff"
            }, p[K].container.scale.y = 1))
        }
        B = new URLSearchParams(location.search);
        if (1 !== Number(B.get("show_gamelink") || localStorage.getItem("show_gamelink"))) {
            B = a.gameConfig[a.configType].gameType.toLowerCase();
            switch (B) {
                case "red":
                    d = "6_42";
                    break;
                case "green":
                    d = "7_49";
                default:
                    d = "5_36"
            }
            c = a.mainRenderer.createButton(void 0, 210,
                265, `game_${d}`);
            c.name = `game_${B}_icon`
        } else c = a.mainRenderer.createButton(void 0, 960, 265, "game_5_36", void 0, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            H("blue")
        }), c.name = "game_blue_icon", c.anchor.set(.5, .5), c = a.mainRenderer.createButton(void 0, 585, 265, "game_6_42", void 0, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            H("red")
        }), c.name = "game_red_icon", c.anchor.set(.5, .5), c = a.mainRenderer.createButton(void 0, 210, 265, "game_7_49", void 0, function (b,
                                                                                                                                             f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            H("green")
        }), c.name = "game_green_icon";
        c.anchor.set(.5, .5);
        c = a.mainRenderer.createButton(p.info.container, 2, 398, "atlas%Jbg-coef-btns-" + a.gameConfig[a.configType].gameType + "-mobile-min");
        c.name = "coef_btns";
        c.anchor.set(.5, .5);
        c = a.mainRenderer.createButton(p.game.container, 1, 390 - a.gameConfig[a.configType].gridOffsetY, "atlas%Jbg-coef-btns-" + a.gameConfig[a.configType].gameType + "-mobile-min");
        c.name = "coef_btns";
        c.anchor.set(.5, .5);
        c = a.mainRenderer.createButton(p.game.container.getChildByName("coef_btns"),
            -528, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType + "-mobile-min", {
                text: `#1 ${mainLocalizationTable.lottoLowRisk}`,
                align: "center",
                style: {font: "bold 30px Arial", fill: "#b1b1b1"}
            });
        c.name = "coef_btn_1";
        a.mainRenderer.createButton(c, 0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
            text: `#1 ${mainLocalizationTable.lottoLowRisk}`,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#444"}
        }, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            u(a.mainGameManager.coefMode, 1);
            a.mainGameManager.coefMode =
                1;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            ja(b, "coef_btn_selected_1")
        }, function (b) {
            ia(b, "coef_btn_selected_1")
        }).alpha = 0;
        c = a.mainRenderer.createButton(p.game.container.getChildByName("coef_btns"), -172, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType + "-mobile-min", {
            text: `#2 ${mainLocalizationTable.lottoNormRisk}`,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#b1b1b1"}
        });
        c.name = "coef_btn_2";
        a.mainRenderer.createButton(c,
            0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
                text: `#2 ${mainLocalizationTable.lottoNormRisk}`,
                align: "center",
                style: {font: "bold 30px Arial", fill: "#444"}
            }, function (b, f) {
                a.mainSoundManager.playSound("buttonClick");
                f.stopped = !0;
                u(a.mainGameManager.coefMode, 2);
                a.mainGameManager.coefMode = 2;
                a.mainUIManager.redrawCoefTable();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                ja(b, "coef_btn_selected_2")
            }, function (b) {
                ia(b, "coef_btn_selected_2")
            }).alpha = 0;
        c = a.mainRenderer.createButton(p.game.container.getChildByName("coef_btns"),
            184, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType + "-mobile-min", {
                text: `#3 ${mainLocalizationTable.lottoHighRisk}`,
                align: "center",
                style: {font: "bold 30px Arial", fill: "#b1b1b1"}
            });
        c.name = "coef_btn_3";
        a.mainRenderer.createButton(c, 0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
            text: `#3 ${mainLocalizationTable.lottoHighRisk}`,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#444"}
        }, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            u(a.mainGameManager.coefMode, 3);
            a.mainGameManager.coefMode =
                3;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            ja(b, "coef_btn_selected_3")
        }, function (b) {
            ia(b, "coef_btn_selected_3")
        }).alpha = 0;
        p.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].alpha = 1;
        p.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].interactive = !1;
        p.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" +
            a.mainGameManager.coefMode).children[1].children[0].style = {font: "bold 30px Arial", fill: "#000"};
        c = a.mainRenderer.createButton(p.info.container.getChildByName("coef_btns"), -528, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType + "-mobile-min", {
            text: `#1 ${mainLocalizationTable.lottoLowRisk}`,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#b1b1b1"}
        });
        c.name = "coef_btn_1";
        a.mainRenderer.createButton(c, 0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
            text: `#1 ${mainLocalizationTable.lottoLowRisk}`,
            align: "center", style: {font: "bold 30px Arial", fill: "#444"}
        }, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            u(a.mainGameManager.coefMode, 1);
            a.mainGameManager.coefMode = 1;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            ja(b, "coef_btn_selected_1")
        }, function (b) {
            ia(b, "coef_btn_selected_1")
        }).alpha = 0;
        c = a.mainRenderer.createButton(p.info.container.getChildByName("coef_btns"), -172, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType +
            "-mobile-min", {
            text: `#2 ${mainLocalizationTable.lottoNormRisk}`,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#b1b1b1"}
        });
        c.name = "coef_btn_2";
        a.mainRenderer.createButton(c, 0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
            text: `#2 ${mainLocalizationTable.lottoNormRisk}`,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#444"}
        }, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            u(a.mainGameManager.coefMode, 2);
            a.mainGameManager.coefMode = 2;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        }, void 0, void 0, function (b) {
            ja(b, "coef_btn_selected_2")
        }, function (b) {
            ia(b, "coef_btn_selected_2")
        }).alpha = 0;
        c = a.mainRenderer.createButton(p.info.container.getChildByName("coef_btns"), 184, -34, "atlas%Jbg-coef-btn-" + a.gameConfig[a.configType].gameType + "-mobile-min", {
            text: `#3 ${mainLocalizationTable.lottoHighRisk}`,
            align: "center",
            style: {font: "bold 30px Arial", fill: "#b1b1b1"}
        });
        c.name = "coef_btn_3";
        a.mainRenderer.createButton(c, 0, 0, "atlas%Jbg-coef-btn-selected-mobile-min", {
            text: `#3 ${mainLocalizationTable.lottoHighRisk}`,
            align: "center", style: {font: "bold 30px Arial", fill: "#444"}
        }, function (b, f) {
            a.mainSoundManager.playSound("buttonClick");
            f.stopped = !0;
            u(a.mainGameManager.coefMode, 3);
            a.mainGameManager.coefMode = 3;
            a.mainUIManager.redrawCoefTable();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            ja(b, "coef_btn_selected_3")
        }, function (b) {
            ia(b, "coef_btn_selected_3")
        }).alpha = 0;
        p.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].alpha = 1;
        p.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" +
            a.mainGameManager.coefMode).children[1].interactive = !1;
        p.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].children[0].style = {
            font: "bold 30px Arial",
            fill: "#000"
        };
        c = a.mainRenderer.createButton(p.info.container, -1, 40, "coef_bg");
        c.name = "coef_bg";
        c.anchor.set(.5, .5);
        a.mainRenderer.createButton(p.info.container.getChildByName("coef_bg"), -301.5, -255, void 0, {
            text: mainLocalizationTable.guessedBalls.toUpperCase(), align: "center", style: {
                font: "bold 30px Arial",
                fill: "#ffaa06", align: "center"
            }
        });
        a.mainRenderer.createButton(p.info.container.getChildByName("coef_bg"), 50, -255, void 0, {
            text: mainLocalizationTable.coefficient.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial", fill: "#ffaa06", align: "center"}
        });
        a.mainRenderer.createButton(p.info.container.getChildByName("coef_bg"), 351.5, -255, void 0, {
            text: mainLocalizationTable.win.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial", fill: "#ffaa06", align: "center"}
        });
        var m = function (b) {
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
            }["ru en es pt kz fr ku".split(" ").includes(mainLocalizator.currentLang()) ? mainLocalizator.currentLang() : "en"][b]
        };
        (function (b) {
            b =
                new MaskedSprite(a.mainRenderer.createButton(b, 0, 0), {
                    mask: {
                        x: -539,
                        y: -274,
                        width: 1070,
                        height: 675
                    }, needScrolling: {}
                }, a.mainRenderer.renderManager);
            b.srcSprite.interactive = !0;
            b.srcSprite.hitArea = new PIXI.Rectangle(-529, -284, 1061, 706);
            b = b.containerForScroll;
            var f = {font: "bold 34px Arial", fill: "#ffffff"}, k = {font: "bold 34px Arial", fill: "#fca903"},
                l = {font: "bold 76px Arial", fill: "#c20317"};
            a.mainRenderer.createButton(b, -520, -215, void 0, {text: m("intro"), align: "left", style: f});
            a.mainRenderer.createButton(b, -520,
                -120, void 0, {text: "1.", align: "left", style: k});
            a.mainRenderer.createButton(b, -485, -100, void 0, {text: m("rule1"), align: "left", style: f});
            c = a.mainRenderer.createButton(b, 0, 230, "rules_1");
            c.scale.set(.75, .75);
            c.anchor.set(.5, .5);
            a.mainRenderer.createButton(c, 465, "blue" == a.configType ? 115 : 160, void 0, {text: "1", style: l});
            a.mainRenderer.createButton(c, 465, 290, void 0, {text: "2", style: l});
            a.mainRenderer.createButton(b, -520, 549, void 0, {text: "2.", align: "left", style: k});
            a.mainRenderer.createButton(b, -485, 569, void 0,
                {text: m("rule2"), align: "left", style: f});
            c = a.mainRenderer.createButton(b, 0, 939, "rules_2");
            c.scale.set(.95, .95);
            c.anchor.set(.5, .5);
            a.mainRenderer.createButton(b, -485, 1283, void 0, {text: m("rule3"), align: "left", style: f});
            c = a.mainRenderer.createButton(b, 0, 1633, "rules_3");
            c.scale.set(.95, .95);
            c.anchor.set(.5, .5);
            a.mainRenderer.createButton(b, -485, 1977, void 0, {text: m("rule4"), align: "left", style: f});
            c = a.mainRenderer.createButton(b, 0, 2327, "rules_4");
            c.scale.set(.95, .95);
            c.anchor.set(.5, .5);
            a.mainRenderer.createButton(b,
                -520, 2681, void 0, {text: "3.", align: "left", style: k});
            a.mainRenderer.createButton(b, -485, 2721, void 0, {text: m("rule5"), align: "left", style: f});
            c = a.mainRenderer.createButton(b, 0, 2857, "rules_5");
            c.scale.set(.95, .95);
            c.anchor.set(.5, .5);
            a.mainRenderer.createButton(b, -520, 2981, void 0, {text: "4.", align: "left", style: k});
            a.mainRenderer.createButton(b, -485, 3001, void 0, {text: m("rule6"), align: "left", style: f});
            c = a.mainRenderer.createButton(b, 0, 3217, "rules_6");
            c.scale.set(1.2, 1.2);
            c.anchor.set(.5, .5);
            c = a.mainRenderer.createButton(b,
                0, 3397, "rules_7");
            c.scale.set(1.2, 1.2);
            c.anchor.set(.5, .5);
            b.emit("updateHeight")
        })(p.rules.container);
        c = null;
        a.mainRenderer.stage.addChild(w);
        a.mainRenderer.stage.addChild(ka);
        a.mainRenderer.stage.addChild(Da);
        a.mainRenderer.stage.addChild(Z);
        a.mainRenderer.stage.addChild(z);
        p.game.container.addChild(ba);
        a.mainRenderer.createButton(ba, 0, 40 - a.gameConfig[a.configType].gridOffsetY, "grid_bg").anchor.set(.5, .5);
        for (e in D) p.game.container.addChild(D[e]), a.mainRenderer.createButton(D[e], 0, 40 - a.gameConfig[a.configType].gridOffsetY,
            "grid_bg_copy").anchor.set(.5, .5), D[e].position.x -= 1200, D[e].isUsed = !1, D[e].isLast = !1;
        D[D.length - 1].isLast = !0;
        a.setMainGrid(new LottoGrid(-599 + a.gameConfig[a.configType].gridPos.x, -a.gameConfig[a.configType].gridOffsetY - 551 + 40 + a.gameConfig[a.configType].gridPos.y, 10, a.gameConfig[a.configType].zonesCount, a.gameConfig[a.configType].ballCount, ba, a.mainRenderer));
        a.mainGrid.createZones(100, 100, {x: 6, y: 6}, {
            font: "50px Swiss721-CondensedBold",
            fill: a.gameConfig[a.configType].gridNumColor,
            align: "center"
        }, function (b,
                     f, k) {
            if (b.selected || !(a.mainGrid.pressedZones.length >= a.mainGrid.maxPreessedZones)) {
                f ? b.selected || (b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture) : a.mainGrid.gridContainer.down = !0;
                if (f && a.mainGrid.gridContainer.down || !f && !k || k && (b.name != qa || void 0 == qa)) b.selected ? (b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture, b.children[0].style = {
                    font: "50px Swiss721-CondensedBold",
                    fill: a.gameConfig[a.configType].gridNumColor,
                    align: "center"
                }, b.selected = !1, b.currentLayer =
                    !1, a.mainGrid.pressedZones.splice(a.mainGrid.pressedZones.indexOf(b), 1)) : (b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, b.children[0].style = {
                    font: "50px Swiss721-CondensedBold",
                    fill: "#000000",
                    align: "center"
                }, b.selected = !0, b.currentLayer = !0, a.mainSoundManager.playSound("firstChip"), a.mainGrid.pressedZones.push(b)), f = a.gameConfig[a.configType].ballCount - a.mainGrid.pressedZones.length, w.getChildByName("btn_plus").children[0].text = f, w.getChildByName("btn_plus").children[0].style =
                    {
                        font: "bold 110px Arial",
                        fill: "#595959",
                        align: "center"
                    }, 0 == f ? (w.getChildByName("btn_plus").interactive = !0, w.getChildByName("btn_plus").children[0].text = "+", w.getChildByName("btn_plus").children[0].style = {
                    font: "190px Arial",
                    fill: "#710006",
                    align: "center"
                }) : w.getChildByName("btn_plus").interactive = !1;
                k && (qa = b.name);
                a.mainGrid.gridContainer.down && ua();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }, function (b, f) {
            if (f) {
                if (!b.selected && !a.mainGrid.gridContainer.down) if (b.isLock && b.currentLayer) switch (b.isLock) {
                    case 1:
                        b.texture =
                            a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                        break;
                    default:
                        b.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                } else b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture
            } else a.mainGrid.gridContainer.down = !1, qa = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, !0);
        a.mainGrid.setRandomBetsCount(a.gameConfig[a.configType].ballCount);
        a.mainRenderer.stage.on("changeLang", xa);
        a.mainGameManager.gameStateAsync(function (b) {
            a.mainGameManager.coefficients =
                b.coeftable;
            A.loadFromStorage();
            a.mainUIManager.drawCoefTable();
            var f = 0 >= b.t2 ? b.tir - 1 : b.tir;
            A.editions.length && A.editions[A.editions.length - 1].round === f || A.addEdition(f);
            if (A.editions.length && A.editions[A.editions.length - 1].round === f) {
                f = A.editions[A.editions.length - 1].betsHistory.bets;
                for (var k = 0, l = 0; l < f.length; l++) k += f[l].summ;
                a.mainFLGAccount.totalBet(k, !0);
                oa = !0
            }
            ra = new hotcoldGraphsLottoMBK({hot: b.hot, cold: b.cold}, p.stats, function (n, x) {
                var t = 0, G = 9;
                if (0 === x.children.length) {
                    var y = a.mainRenderer.createButton(x,
                        -1, 136, void 0, {
                            text: mainLocalizationTable.hotcoldRating.replace(/%s/g, 100).toUpperCase(),
                            align: "center",
                            style: {font: "bold 34px Arial", fill: "#ffffff", align: "center"}
                        });
                    y.anchor.set(.5, .5);
                    x = a.mainRenderer.createButton(x, -499, 176, "hotcold_bg");
                    var P = new PIXI.Container;
                    x.addChild(P);
                    var X = new PIXI.Container;
                    x.addChild(X);
                    for (var V in n.cold) {
                        if (5 < t) break;
                        y = new PIXI.Graphics;
                        y.position.set(93 + 153 * t, 188);
                        P.addChild(y);
                        y = new PIXI.Graphics;
                        y.position.set(93 + 153 * t, 499);
                        X.addChild(y);
                        y = a.mainRenderer.createButton(x,
                            169 + 153 * t, 156, void 0, {
                                text: "",
                                align: "center",
                                style: {font: "bold 50px Arial", fill: "#fe801b", align: "center"}
                            });
                        y.anchor.set(.5, .5);
                        y = a.mainRenderer.createButton(x, 160 + 153 * t, 48, void 0, {
                            text: n.hot[t][0],
                            align: "center",
                            style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                        });
                        y.anchor.set(.5, .5);
                        y = a.mainRenderer.createButton(x, 169 + 153 * t, 472, void 0, {
                            text: "",
                            align: "center",
                            style: {font: "bold 50px Arial", fill: "#9bccff", align: "center"}
                        });
                        y.anchor.set(.5, .5);
                        y = a.mainRenderer.createButton(x, 160 + 153 * t, 152,
                            void 0, {
                                text: n.cold[G][0],
                                align: "center",
                                style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                            });
                        y.anchor.set(.5, .5);
                        t++;
                        G--
                    }
                } else for (V in x = x.children[1], n.cold) {
                    if (5 < t) break;
                    x.children[4 * t + 2].children[0].text = "";
                    x.children[4 * t + 3].children[0].text = n.hot[t][0];
                    x.children[4 * t + 4].children[0].text = "";
                    x.children[4 * t + 5].children[0].text = n.cold[G][0];
                    t++;
                    G--
                }
            }, function (n, x) {
            });
            ra.draw();
            A.events.emit("GRID_STATS", {hot: b.hot, cold: b.cold});
            A.drawEditions();
            ha.drawCustomJackpot(function (n, x) {
                if (x) {
                    var t =
                        w.getChildByName("JackpotContainer"), G = utils.formatNumber(x);
                    if (t) {
                        x = t.children[1];
                        var y = t.children[2];
                        t = t.children[3];
                        t.children[0].text = G
                    } else x = new PIXI.Graphics, x.beginFill(0, .6), x.drawRect(1174, 190, 432, 150), x.endFill, w.addChild(x), t = a.mainRenderer.createButton(w, 1244, 255), t.name = "JackpotContainer", a.mainRenderer.createButton(t, 155, -25, "jp_name").anchor.set(.5, .5), x = a.mainRenderer.createButton(t, 3, 3), y = a.mainRenderer.createButton(t, 0, 5), x.visible = !1, t = a.mainRenderer.createButton(t, 155, 45, void 0,
                        {
                            text: G,
                            style: {font: "bold 54px Arial", fill: "#d6d6d6", align: "center"}
                        }), t.anchor.set(.5, .5), t.children[0].anchor.set(.5, .5);
                    G = 0;
                    var P = x.position.x + t.children[0].width;
                    t = .8 * P / 10;
                    for (var X = .2 * P / 9, V = 0; 10 > V; V++) {
                        P = y.children[V];
                        switch (V) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                var ca = 65280;
                                break;
                            case 7:
                            case 8:
                                ca = 15973429;
                                break;
                            case 9:
                                ca = 15352834
                        }
                        P ? (P.clear(), P.beginFill(ca), P.drawRect(G, 0, t, 4), P.endFill) : (P = new PIXI.Graphics, P.beginFill(ca), P.drawRect(G, 0, t, 4), P.endFill, y.addChild(P));
                        G += t + X;
                        P.visible = V <= parseInt(n)
                    }
                    x.position.x += (3 - x.position.x) / 2 + 124;
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            });
            ha.updateJackpotData(b);
            a.mainFLGAccount.autoplayManager.updateCallback = function (n) {
                if (!(2 > A.editions.length)) {
                    switch (n) {
                        case "repeatLastBet":
                            var x = n = -1;
                            var t = A.editions.length - 2;
                            break;
                        case "getOnlyBets":
                            x = n = void 0;
                            t = A.editions.length - 1;
                            break;
                        default:
                            n = A.editions[A.editions.length - 2].betsHistory.setTotalWin(), x = a.mainFLGAccount.balance(), t = A.editions.length - 2
                    }
                    a.mainFLGAccount.autoplayManager.update(A.editions[t].betsHistory.bets,
                        n, x, function (G) {
                            a.mainGameManager && 0 < G.length && (w.getChildByName("btn_random").children[0].interactive = !1, w.getChildByName("btn_plus").interactive = !1, A.getActedOutEdition().betsHistory.addBet(G, A.getActedOutEdition().round, function (y) {
                                function P(V) {
                                    C(y[V].bet, !1, function () {
                                        V++;
                                        V <= X && P(V)
                                    })
                                }

                                A.events.emit("GRID_STATS");
                                w.getChildByName("btn_random").children[0].interactive = !0;
                                w.getChildByName("btn_plus").interactive = !0;
                                var X = 4 > y.length ? y.length - 1 : 3;
                                P(0)
                            }))
                        }, A.editions[t].round)
                }
            };
            ta(b);
            h && (h(), a.mainRenderer.renderManager.needUpdateRender =
                !0)
        })
    }, function () {
        a.mainSoundManager.playRandomBackSound()
    });
    var xa = function () {
        a.mainFLGAccount.updateAccountText();
        A.redrawEditionHeader();
        A.drawBetsHeader();
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.onLanguageChange = xa;
    this.setInteraction = function (e) {
        a.mainGrid.setZoneInteraction(e);
        w.getChildByName("btn_random").children[0].interactive = e;
        w.getChildByName("btn_plus").children[0].style = {
            font: "bold 110px Arial",
            fill: e ? "#595959" : "#d1d2d4",
            align: "center"
        };
        w.getChildByName("videoPlayBtn").visible =
            !1;
        w.getChildByName("videoPlayBtn").isPlay ? (w.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play_off.texture, w.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin_off.texture, w.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus_pressed.texture) : (w.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture,
            w.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture, w.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture);
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.drawCoefTable = function () {
        var e = 0;
        5 == a.gameConfig[a.configType].ballCount ? e = 72 : 6 == a.gameConfig[a.configType].ballCount && (e = 36);
        for (var d = 0; d < a.gameConfig[a.configType].ballCount; d++) {
            var h = a.mainRenderer.createButton(p.info.container.getChildByName("coef_bg"),
                -301.5, -267 + e + 72 * (d + 1), "coef_line_left");
            h.anchor.set(.5, .5);
            for (var C = 1; C <= a.gameConfig[a.configType].ballCount; C++) a.mainRenderer.createButton(p.info.container.getChildByName("coef_bg"), -480 + 60 * (C - 1), -267 + e + 72 * (d + 1), void 0, {
                text: C,
                align: "center",
                style: {font: "bold 40px Arial", fill: "#292929", align: "center"}
            });
            h = a.mainRenderer.createButton(p.info.container.getChildByName("coef_bg"), 50, -267 + e + 72 * (d + 1), "coef_line_middle");
            h.anchor.set(.5, .5);
            var H = a.mainGameManager.coefficients[a.mainGameManager.coefMode -
            1][a.gameConfig[a.configType].ballCount - d] / 100;
            var u = new PIXI.Container;
            u.name = "infoBallsContainer" + d;
            p.info.container.getChildByName("coef_bg").addChild(u);
            for (C = 1; C <= a.gameConfig[a.configType].ballCount - d; C++) h = a.mainRenderer.createButton(u, -480 + 60 * (C - 1), -267 + e + 72 * (d + 1), "ball"), h.anchor.set(.5, .5), h.scale.set(.75, .75);
            p.info.container.getChildByName("coef_bg").getChildByName("infoBallsContainer" + d).visible = H ? !0 : !1;
            h = a.mainRenderer.createButton(p.info.container.getChildByName("coef_bg"), -58, -267 +
                e + 72 * (d + 1), void 0, {
                text: H ? "X  " + formatFLGNums(H, !1) : "-",
                align: "left",
                style: {font: "bold 40px Arial", fill: "#ffffff", align: "left"}
            });
            h.name = "tbl_coef" + d;
            h = a.mainRenderer.createButton(p.info.container.getChildByName("coef_bg"), 351.5, -267 + e + 72 * (d + 1), "coef_line_right");
            h.anchor.set(.5, .5);
            h = a.mainRenderer.createButton(p.info.container.getChildByName("coef_bg"), 203, -267 + e + 72 * (d + 1), void 0, {
                text: H ? formatFLGNums(H * U.currentBet(), !1) : "-",
                align: "left",
                style: {font: "bold 40px Arial", fill: "#ffffff", align: "left"}
            });
            h.name = "tbl_win" + d
        }
    };
    this.redrawCoefTable = function () {
        for (var e, d = 0; d < a.gameConfig[a.configType].ballCount; d++) e = a.mainGameManager.coefficients[a.mainGameManager.coefMode - 1][a.gameConfig[a.configType].ballCount - d] / 100, p.info.container.getChildByName("coef_bg").getChildByName("tbl_coef" + d).children[0].text = e ? "X  " + formatFLGNums(e, !1) : "-", p.info.container.getChildByName("coef_bg").getChildByName("tbl_win" + d).children[0].text = e ? formatFLGNums(e * U.currentBet(), !1) : "-", p.info.container.getChildByName("coef_bg").getChildByName("infoBallsContainer" +
            d).visible = e ? !0 : !1
    };
    this.setTextHeaderScale = function (e) {
        12 < e.text.length ? e.scale.set(.65, .65) : 9 < e.text.length ? e.scale.set(.75, .75) : e.scale.set(1, 1)
    };
    this.setTextScale = function (e) {
        e.text == "MAX\n" + J ? e.scale.set(.5, .5) : e.scale.set(1, 1)
    };
    var ua = function () {
            var e = 0;
            0 == a.gameConfig[a.configType].ballCount - a.mainGrid.pressedZones.length && 0 < a.mainGrid.pressedZones.length && 0 < U.currentBet() && (e = U.currentBet() * a.mainGameManager.coefficients[a.mainGameManager.coefMode - 1][a.mainGrid.pressedZones.length] / 100);
            a.mainFLGAccount.maxWin(e)
        },
        Ba = 0, Ea = 0, ta = function (e) {
            function d(u) {
                a.mainGameManager && (a.mainRenderer.stage.getChildByName("timer_main").children[0].text = fa.getTimerText(), a.mainRenderer.renderManager.needUpdateRender = !0)
            }

            function h(u) {
                if (a.mainGameManager) {
                    if (oa) oa = !1; else {
                        a.mainFLGAccount.setWinTextVisible(!0);
                        a.mainGrid.removeSelectedBets();
                        for (var c in D) D[c].position.x = -1200, D[c].position.y = 0, D[c].scale.set(1, 1), D[c].isUsed = !1, D[c].isLast = !1;
                        D[D.length - 1].isLast = !0;
                        p.game.container.removeChild(ba);
                        p.game.container.addChildAt(ba,
                            0);
                        a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_transp.texture, {
                            font: "50px Swiss721-CondensedBold",
                            fill: a.gameConfig[a.configType].gridNumColor,
                            align: "center"
                        }, void 0, a.mainGrid.getIntArrayOfZones())
                    }
                    ra.update({hot: u.hot, cold: u.cold});
                    a.mainUIManager.setInteraction(!0);
                    A.addEdition(u.tir);
                    var B = [];
                    for (c = 1; c <= a.gameConfig[a.configType].ballCount; c++) B.push(u["b" + c]);
                    ma.startDrawBalls(B, 1.55, 0);
                    1 < A.editions.length && A.drawDetailEditionHistory(p.history.container, A.editions.length -
                        2);
                    a.mainFLGAccount.autoplayManager.updateCallback();
                    a.mainFLGAccount.autoplayManager.settings.isStarted() || a.mainFLGAccount.autoplayManager.settings.repeatRoundNum() === A.editions[A.editions.length - 1].round ? (z.getChildByName("autoplay-bg2").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"], z.getChildByName("autoplay-bg2").getChildByName("repeat").children[0].interactive = !1) : (z.getChildByName("autoplay-bg2").getChildByName("repeat").texture =
                        a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand2"], z.getChildByName("autoplay-bg2").getChildByName("repeat").children[0].interactive = !0);
                    w.getChildByName("btn_autoplay").getChildByName("autoplay_remain_num").children[0].text = 0 == a.mainFLGAccount.autoplayManager.settings.count() ? "" : a.mainFLGAccount.autoplayManager.settings.count();
                    a.mainFLGAccount.autoplayManager.settings.isStarted() ? (z.getChildByName("autoplay-bg2").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRemainingNumber +
                        ": " + a.mainFLGAccount.autoplayManager.settings.count(), z.getChildByName("autoplay-bg2").getChildByName("autoplayDesc2").visible = !1, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num5").visible = !1, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num10").visible = !1, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num50").visible = !1, z.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").children[0].text = a.mainFLGAccount.autoplayManager.settings.count(), z.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").visible =
                        !0, z.getChildByName("autoplay-bg2").getChildByName("autoplay-stop").visible = !0) : (z.getChildByName("autoplay-bg2").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRoundNumber, z.getChildByName("autoplay-bg2").getChildByName("autoplayDesc2").visible = !0, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num5").visible = !0, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num10").visible = !0, z.getChildByName("autoplay-bg2").getChildByName("autoplay-num50").visible =
                        !0, z.getChildByName("autoplay-bg2").getChildByName("autoplaySelected").visible = !1, z.getChildByName("autoplay-bg2").getChildByName("autoplay-stop").visible = !1);
                    a.mainRenderer.stage.getChildByName("round_main").children[0].text = "# " + (u.tir - 1);
                    fa.start({
                            minutes: 0,
                            seconds: (u.time_round ? u.time_round : a.gameConfig[a.configType].tirTime) - a.gameConfig[a.configType].timerOffset - u.t2
                        }, {
                            minutes: 0,
                            seconds: (u.time_round ? u.time_round : a.gameConfig[a.configType].tirTime) - a.gameConfig[a.configType].timerOffset
                        }, d,
                        function () {
                            a.mainGameManager && (a.mainGrid.removeCurrentBets(), a.mainGrid.removeFuckingHoverTexture(), ma.removeBalls(), a.mainUIManager.setInteraction(!1), a.mainSoundManager.playSound("endBet"))
                        }, ya, ta);
                    A.events.emit("BET_TIME", {hot: u.hot, cold: u.cold})
                }
            }

            function C(u) {
                function c() {
                    a.mainGameManager && (a.mainGameManager.gameStateAsync(B), a.mainRenderer.renderManager.needUpdateRender = !0)
                }

                function B(m) {
                    function b(t) {
                        if (a.mainGrid && a.mainGameManager) if (k >= f.length) t(); else {
                            var G = f.slice(0, k + 1), y = "resultBalls" +
                                k, P = a.mainGrid.zones[parseInt(f[k]) - 1];
                            a.mainUIManager.simpleFlipXFunc(P, y, 300, 300, function (X) {
                                X.getChildByName("text" + X.name).style = {
                                    font: "50px Swiss721-CondensedBold",
                                    fill: "#000",
                                    align: "center"
                                };
                                X.texture = X.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                            });
                            ma.startDrawBalls(G, 1.55, 0);
                            A.cancelLastEdition(G);
                            k += 1;
                            setTimeout(function () {
                                b(t)
                            }, 900)
                        }
                    }

                    if (a.mainGameManager) if (0 === m.b1 || 99 === m.b1) setTimeout(c, 2E3); else {
                        var f = [m.b1,
                            m.b2, m.b3, m.b4, m.b5];
                        5 < a.gameConfig[a.configType].ballCount && f.push(m.b6);
                        6 < a.gameConfig[a.configType].ballCount && f.push(m.b7);
                        var k = limit(K, 0, a.gameConfig[a.configType].ballCount - 1);
                        if (0 !== k) {
                            var l;
                            for (l = 0; l <= k; l++) {
                                var n = "resultBalls" + l, x = a.mainGrid.zones[parseInt(f[l]) - 1];
                                a.mainUIManager.simpleFlipXFunc(x, n, 450, 450, function (t) {
                                    t.getChildByName("text" + t.name).style = {
                                        font: "50px Swiss721-CondensedBold",
                                        fill: "#000",
                                        align: "center"
                                    };
                                    t.texture = t.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture :
                                        a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                                })
                            }
                        }
                        b(function () {
                            a.mainFLGAccount.calculateWin(A.getActedOutEdition().betsHistory.bets, a.gameConfig[a.configType].appName, function () {
                                A.getActedOutEdition().betsHistory.setTotalWin(a.mainFLGAccount.totalWin());
                                A.getActedOutEdition().betsHistory.redrawCurrentBets();
                                var t = a.gameConfig.winShowTime ? a.gameConfig.winShowTime : 6E3;
                                Ba = setTimeout(ta, t);
                                m.t2 = 80;
                                ha.updateJackpotData(m);
                                ha.drawJackpotWin(2E4, {x: 602, y: 527}, a.mainRenderer.resourceLoader.resources.JP.texture,
                                    a.mainFLGAccount.totalWin(), a.mainRenderer.resourceLoader.resources.jp_only.texture);
                                p.video.button.pressed ? setTimeout(function () {
                                    w.getChildByName("videoPlayBtn").visible = !1;
                                    w.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture;
                                    w.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture;
                                    w.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture;
                                    w.getChildByName("videoPlayBtn").isPlay =
                                        !1;
                                    p.game.button.emit("mousedown");
                                    a.mainFLGAccount.winToBalanceAnimation(t - 2E3, 2E3, {
                                        x: 602,
                                        y: 527
                                    }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                        font: "bold 70px Arial",
                                        fill: "#bcbcbc",
                                        scale: 1.25,
                                        withImages: !0
                                    }, ha.jpWin())
                                }, 2E3) : a.mainFLGAccount.winToBalanceAnimation(t, 2E3, {
                                    x: 602,
                                    y: 527
                                }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                    font: "bold 70px Arial",
                                    fill: "#bcbcbc",
                                    scale: 1.25,
                                    withImages: !0
                                }, ha.jpWin())
                            }, a.gameConfig);
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        })
                    }
                }

                if (a.mainGameManager) {
                    A.events.emit("RESULT_TIME");
                    1 < A.editions.length && A.drawDetailEditionHistory(p.history.container, A.editions.length - 2);
                    a.mainRenderer.stage.getChildByName("round_main").children[0].text = "# " + (u.tir - 1);
                    var K = u.time_wait - parseInt(u.t2, 10) - 1;
                    0 > K ? setTimeout(c, 1E3 * -K) : c();
                    a.mainUIManager.setInteraction(!1);
                    oa ? (u = a.mainFLGAccount.totalBet(), a.mainFLGAccount.setWinTextVisible(!1), a.mainFLGAccount.totalBet(u, !0), oa = !1) : a.mainFLGAccount.setWinTextVisible(!1)
                }
            }

            function H(u) {
                0 >= u.t2 ? C(u) : h(u)
            }

            void 0 != a.mainGameManager && (e ? H(e) : a.mainGameManager.gameStateAsync(H))
        };
    this.drawGridHotCold = function (e) {
        if (la.prevGmState || e) {
            var d = la.prevGmState;
            if (d) {
                for (var h = 0, C = 9; 6 > h; h++, C--) 0 != d.hot[h][0] && 99 != d.hot[h][0] && a.mainGrid.zones[parseInt(d.hot[h][0], 10) - 1].getChildByName("zone_hot") && (a.mainGrid.zones[parseInt(d.hot[h][0], 10) - 1].getChildByName("zone_hot").visible = !1), 0 != d.cold[C][0] && 99 != d.cold[C][0] && a.mainGrid.zones[parseInt(d.cold[C][0], 10) - 1].getChildByName("zone_cold") && (a.mainGrid.zones[parseInt(d.cold[C][0], 10) - 1].getChildByName("zone_cold").visible = !1);
                a.mainRenderer.renderManager.needUpdateRender =
                    !0
            }
            e && (d = e, la.prevGmState = e);
            if (la.needShow) {
                h = 0;
                for (C = 9; 6 > h; h++, C--) 0 != d.hot[h][0] && 99 != d.hot[h][0] && (a.mainGrid.zones[parseInt(d.hot[h][0], 10) - 1].getChildByName("zone_hot") ? a.mainGrid.zones[parseInt(d.hot[h][0], 10) - 1].getChildByName("zone_hot").visible = !0 : (a.mainRenderer.createButton(a.mainGrid.zones[parseInt(d.hot[h][0], 10) - 1], 0, 0, "zone_hot"), a.mainGrid.zones[parseInt(d.hot[h][0], 10) - 1].getChildByName("zone_hot").anchor.set(.5, .5))), 0 != d.cold[C][0] && 99 != d.cold[C][0] && (a.mainGrid.zones[parseInt(d.cold[C][0],
                    10) - 1].getChildByName("zone_cold") ? a.mainGrid.zones[parseInt(d.cold[C][0], 10) - 1].getChildByName("zone_cold").visible = !0 : (a.mainRenderer.createButton(a.mainGrid.zones[parseInt(d.cold[C][0], 10) - 1], 0, 0, "zone_cold"), a.mainGrid.zones[parseInt(d.cold[C][0], 10) - 1].getChildByName("zone_cold").anchor.set(.5, .5)));
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }
    };
    A.events.on("GRID_STATS", R.drawGridHotCold);
    A.events.on("BET_TIME", R.drawGridHotCold)
}

function hotcoldGraphsLottoMBK(a, T, S, R) {
    this.destroy = function () {
        da = O = null;
        T.onStartOpen = null;
        T.onStopOpen = null;
        for (var N in W) W[N] = null;
        W = null
    };
    var W = this, da = function () {
        for (var N = [], J = 0; 6 > J; J++) N.push([O.hot[J][0], O.hot[J][1]]);
        N.sort(function (fa, L) {
            if (fa[0] > L[0]) return 1;
            if (fa[0] < L[0]) return -1
        });
        for (J = 0; J < N.length; J++) O.hot[J][0] = N[J][0], O.hot[J][1] = N[J][1];
        N = [];
        for (J = 9; 4 <= J; J--) N.push([O.cold[J][0], O.cold[J][1]]);
        N.sort(function (fa, L) {
            if (fa[0] > L[0]) return 1;
            if (fa[0] < L[0]) return -1
        });
        J = 0;
        for (var U =
            9; J < N.length; J++, U--) O.cold[U][0] = N[J][0], O.cold[U][1] = N[J][1];
        N = null
    }, O = a;
    da();
    this.update = function (N) {
        O = N;
        da();
        W.draw();
        W.drawGraphs()
    };
    this.draw = function () {
        S && S(O, T.container)
    };
    this.drawGraphs = function () {
        R && R(O, T.container)
    };
    T.onStartOpen = W.draw;
    T.onStopOpen = W.drawGraphs
};
