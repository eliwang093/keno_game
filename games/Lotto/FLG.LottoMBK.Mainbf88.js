(function () {
    function Da(a, R) {
        if (void 0 != ka[R]) {
            ka[R].destroy();
            for (var O in ka[R]) ka[R][O] = null;
            ka[R] = null
        }
        $("#" + a + " canvas").remove();
        $("#" + a + " div").remove()
    }

    function Ea(a, R) {
        // Fa[R].canvasId = a;
        // ka[R] = mobileMode ? new LottoMBKAppObjMobile(Fa, R) : new Ka(Fa, R);
        // eval(function (O, k, m, q, E, M, S) {
        //     O[E] = O[E] || function () {
        //         (O[E].a = O[E].a || []).push(arguments)
        //     };
        //     O[E].l = 1 * new Date;
        //     for (M = 0; M < document.scripts.length; M++) if (document.scripts[M].src === q) return;
        //     M = k.createElement(m);
        //     S = k.getElementsByTagName(m)[0];
        //     M.async = 1;
        //     M.src =
        //         q;
        //     S.parentNode.insertBefore(M, S)
        // }(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"));
        // eval(ym(92086997, "init", {clickmap: !0, trackLinks: !0, accurateTrackBounce: !0, webvisor: !0}));
        // a = document.getElementById("metrika");
        // a || (a = document.createElement("div"), a.id = "metrika");
        // for (a.innerHTML = '<noscript><div><img src="https://mc.yandex.ru/watch/84903145" style="position:absolute; left:-9999px;" alt="" /></div></noscript>'; a.children.length;) document.body.appendChild(a.firstElementChild)
    }

    function Ka(a,
                R) {
        this.destroy = function () {
            O.mainSoundManager.destroy();
            E.destroy();
            E = null;
            M.destroy();
            M = null;
            m.destroy();
            m = null;
            q.destroy();
            q = null;
            k.destroy();
            k = null;
            for (var S in O) O[S] = null;
            O = null
        };
        var O = this;
        this.gameDir = FLGUtils.staticRootPath + "games/Lotto/resources/";
        this.gameConfig = a;
        this.configType = R;
        var k = new FLGRenderer(1920, 1080, a[R].canvasId, "center");
        this.mainRenderer = k;
        this.mainSoundManager = new SoundManager(O.gameConfig[O.configType].gameKind, O.gameConfig[O.configType].gameType, O.gameConfig[O.configType].gameVariant);
        var m = new FLGAccount(a[R].canvasId, O.mainSoundManager, O.mainRenderer);
        this.mainFLGAccount = m;
        var q = new gameManagerLottoMBK(this);
        this.mainGameManager = q;
        var E = new La(this);
        this.mainUIManager = E;
        var M;
        this.setMainGrid = function (S) {
            M = S;
            O.mainGrid = M
        }
    }

    function La(a) {
        function R(f, c, l, F, P) {
            this.destroy = function () {
                b = u = w = d = null;
                clearTimeout(J);
                clearTimeout(r);
                p = e = null;
                for (var h in x) x[h] = null;
                x = null
            };
            var x = this, d = {font: "bold 35px Arial", fill: "#000000", align: "center"}, w = 0, J, r,
                u = new PIXI.Container;
            F ? F.addChild(u) :
                a.mainRenderer.stage.addChild(u);
            var b = function (h, D, z, y, B) {
                    u.children[B] ? (u.children[B].visible = !0, u.children[B].children[0].text = y) : a.mainRenderer.createButton(u, h, D, "ball", {
                        text: y,
                        align: "center",
                        style: d
                    }).scale.set(z, z);
                    P && !u.children[B].isRotated && (u.children[B].position.x = h + 980, u.children[B].children[0].rotation = 8 * Math.PI, u.children[B].isRotated = !0, a.mainUIManager.animations()["rotation_ball" + B] && (a.mainUIManager.animations()["rotation_ball" + B].stop(), a.mainRenderer.renderManager.animationTweenDec()),
                        a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["rotation_ball" + B] = (new TWEEN.Tween({
                        rotation: u.children[B].children[0].rotation,
                        position: u.children[B].position.x
                    })).to({rotation: 0, position: h}, 990).easing(TWEEN.Easing.Cubic.Out).onUpdate(function () {
                        u.children[B].children[0].rotation = this.rotation;
                        u.children[B].position.x = this.position
                    }).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        a.mainUIManager.animations()["rotation_ball" + B] = null;
                        a.mainSoundManager.playSound("ball")
                    }).start())
                },
                e = function (h, D, z, y) {
                    function B() {
                        b(f + l * w, c, D, h[w], w);
                        w++;
                        w < h.length ? 0 == z || void 0 == z ? B() : J = setTimeout(B, z) : w = 0
                    }

                    void 0 != h && h.length && (y ? b(f + l * y, c, D, h[y], y) : B())
                };
            this.startDrawBalls = e;
            var p = function () {
                for (var h = 0; h < u.children.length; h++) P ? (u.children[h].isRotated = !1, a.mainUIManager.animations()["remove_ball" + h] && (a.mainUIManager.animations()["remove_ball" + h].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["remove_ball" +
                    h] = (new TWEEN.Tween({
                        rotation: u.children[h].children[0].rotation,
                        position: u.children[h].position.x,
                        index: h
                    })).to({
                        rotation: 6 * Math.PI,
                        position: u.children[h].position.x + 980
                    }, 990).easing(TWEEN.Easing.Cubic.In).onUpdate(function () {
                        u.children[this.index].children[0].rotation = this.rotation;
                        u.children[this.index].position.x = this.position
                    }).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        a.mainUIManager.animations()["remove_ball" + this.index] = null;
                        u.children[this.index].visible = !1
                    }).start()) :
                    u.children[h].visible = !1
            };
            this.removeBalls = p
        }

        function O(f) {
            this.destroy = function () {
                for (var r = 0; r < l.length; r++) {
                    for (var u in l[r]) l[r][u] = null;
                    l[r] = null
                }
                J = w = x = P = F = l = null;
                for (r in c) c[r] = null;
                c = null
            };
            var c = this, l = [];
            this.bets = l;
            var F = 0, P = 0;
            this.setTotalWin = function (r) {
                if (!arguments.length) return P;
                r && (P = r)
            };
            this.getTotalBet = function () {
                return F
            };
            var x = null;
            this.parentEditions = function (r) {
                if (!arguments.length) return x;
                x = r;
                w = x.betsHistoryContainer()
            };
            if (f.length) for (var d = 0; d < f.length; d++) f[d].summ && (F +=
                f[d].summ), f[d].win && (P += f[d].win), l.push({
                summ: f[d].summ,
                bet: f[d].bet,
                coef: f[d].coef,
                winBets: f[d].winBets,
                countWin: f[d].countWin,
                win: f[d].win,
                code: f[d].code,
                id: f[d].id
            });
            this.addBet = function (r, u, b) {
                u += 1;
                100 <= l.length ? (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), b && b(void 0)) : (r.length && 100 < l.length + r.length && (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), r = r.slice(0, r.length - (l.length + r.length - 100))), a.mainFLGAccount.placeBet(r,
                    u, m[q], function (e, p, h) {
                        if (void 0 == e) b && b(void 0); else {
                            if (h) {
                                h.notAll && a.mainRenderer.logService.log(mainLocalizationTable.betError);
                                for (e = 0; e < h.srvBets.length; e++) l.push({
                                    summ: h.srvBets[e].summ,
                                    bet: h.srvBets[e].bet,
                                    coef: h.srvBets[e].coef,
                                    winBets: h.srvBets[e].winBets,
                                    countWin: h.srvBets[e].countWin,
                                    win: h.srvBets[e].win,
                                    code: h.srvBets[e].code,
                                    id: h.srvBets[e].id
                                });
                                b && (b(h.srvBets), x.events.emit("EDITIONS_CHANGE"))
                            } else l.push({
                                summ: r.summ,
                                bet: r.bet,
                                coef: r.coef,
                                winBets: r.winBets,
                                countWin: r.countWin,
                                win: r.win,
                                code: e,
                                id: p
                            }), b && (b(l[l.length - 1]), x.events.emit("EDITIONS_CHANGE"));
                            F = a.mainFLGAccount.totalBet();
                            J();
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        }
                    }, m[q].gameNum))
            };
            var w, J = function () {
                var r = 0 != w.children.length;
                w.parent.children[9].children[0].children[0].text = 0 < l.length ? mainLocalizationTable.coupon.toUpperCase() + " (" + l.length + ")" : mainLocalizationTable.coupon.toUpperCase();
                if (r) w.parent.children[2].children[1].children[0].text = 0 !== F ? formatFLGNums(F, !1) : "", w.parent.children[2].children[2].children[0].text =
                    0 !== P ? formatFLGNums(P, !1) : ""; else for (r = 0; 10 > r; r++) {
                    var u = r & 1 ? "table_line_odd" : "table_line_even";
                    u = new a.mainRenderer.createButton(w, 0, 98 + 35 * r, u);
                    u.anchor.y = .5;
                    u.name = "row_" + r
                }
                var b;
                for (r = 0; w.getChildByName("row_" + r); r++) if (u = w.getChildByName("row_" + r)) {
                    for (var e = 0; u.getChildByName("rect" + r + "_" + e); e++) {
                        var p = u.getChildByName("rect" + r + "_" + e);
                        p.visible = !1;
                        p.getChildByName("sortedBet" + r + "_" + e).visible = !1
                    }
                    if (p = u.getChildByName("summ" + r)) p.visible = !1, u.getChildByName("coefMode" + r).visible = !1, u.getChildByName("coef" +
                        r).visible = !1, u.getChildByName("win" + r).visible = !1;
                    9 < r && (u.visible = !1)
                }
                if (!(0 >= l.length)) {
                    r = 0;
                    for (var h = l.length - 1; r < l.length; r++, h--) {
                        var D = l[h].bet.slice();
                        D.sort(a.mainGameManager.sortNumeric);
                        (u = w.getChildByName("row_" + r)) ? u.visible = !0 : (u = r & 1 ? "table_line_odd" : "table_line_even", u = new a.mainRenderer.createButton(w, 0, 98 + 35 * r, u), u.anchor.y = .5, u.name = "row_" + r);
                        for (e = 0; e < D.length; e++) {
                            var z = (b = -1 < l[h].winBets.indexOf(D[e])) ? 16773632 : 0;
                            (p = u.getChildByName("rect" + r + "_" + e)) ? (p.clear(), p.beginFill(z), p.drawCircle(20 +
                                29 * e, 0, 14), p.endFill(), p.visible = !0, p = p.getChildByName("sortedBet" + r + "_" + e), p.children[0].style = b ? x.tableHistoryFont : x.tableHighlightFont, p.children[0].text = D[e], p.visible = !0) : (p = new PIXI.Graphics, p.beginFill(z), p.drawCircle(20 + 29 * e, 0, 14), p.endFill(), p.name = "rect" + r + "_" + e, u.addChild(p), a.mainRenderer.createButton(p, 20 + 29 * e, 0, void 0, {
                                text: D[e],
                                align: "center",
                                style: b ? x.tableHistoryFont : x.tableHighlightFont
                            }).name = "sortedBet" + r + "_" + e)
                        }
                        b = void 0 != l[h].win ? formatFLGNums(l[h].win, !1) : "";
                        D = void 0 != l[h].countWin ?
                            a.mainGameManager.coefficients[l[h].coef - 1][l[h].countWin] / 100 : "";
                        e = void 0 != l[h].win && 0 != l[h].win ? x.tableBoldFont : x.tableBetFont;
                        (p = u.getChildByName("summ" + r)) ? (p.children[0].style = e, p.children[0].text = formatFLGNums(l[h].summ, !1), p.visible = !0, p = u.getChildByName("win" + r), p.children[0].style = e, p.children[0].text = b, p.visible = !0, b = u.getChildByName("coefMode" + r), b.children[0].style = e, b.children[0].text = l[h].coef, b.visible = !0, u = u.getChildByName("coef" + r), u.children[0].style = e, u.children[0].text = D, u.visible =
                            !0) : (a.mainRenderer.createButton(u, 342, 0, void 0, {
                            text: formatFLGNums(l[h].summ, !1),
                            align: "left",
                            style: e
                        }).name = "summ" + r, a.mainRenderer.createButton(u, 255, 0, void 0, {
                            text: l[h].coef,
                            align: "center",
                            style: e
                        }).name = "coefMode" + r, a.mainRenderer.createButton(u, 300, 0, void 0, {
                            text: D,
                            align: "center",
                            style: e
                        }).name = "coef" + r, a.mainRenderer.createButton(u, 465, 0, void 0, {
                            text: b,
                            align: "left",
                            style: e
                        }).name = "win" + r)
                    }
                }
                w.emit("updateHeight")
            };
            this.redrawCurrentBets = J;
            this.calculateWin = function (r, u) {
                for (var b, e = 0; e < l.length; e++) {
                    b =
                        l[e].bet;
                    for (var p = [], h = 0; h < b.length; h++) -1 < r.indexOf(b[h]) && p.push(b[h]);
                    b = p;
                    l[e].winBets = b;
                    l[e].countWin = b.length;
                    u && (l[e].win = l[e].summ * a.mainGameManager.coefficients[l[e].coef - 1][l[e].countWin] / 100, P += l[e].win)
                }
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }

        const {gameDir: k, gameConfig: m, configType: q} = a;
        this.destroy = function () {
            clearTimeout(Ja);
            clearTimeout(Ma);
            V = null;
            ca.destroy();
            ca = null;
            va.destroy();
            N = va = null;
            W && W.destroy();
            W = null;
            pa.destroy();
            pa = null;
            sa.destroy();
            I = ia = ra = da = H = sa = null;
            for (var f in n) {
                for (var c in n[f]) n[f][c] =
                    null;
                n[f] = null
            }
            n = null;
            clearTimeout(Na);
            za = wa = null;
            for (f in A) A[f] = null;
            Aa = ma = ta = ua = Ga = Ba = X = Y = A = null;
            a.mainRenderer.stage.off("changeLang", Ca);
            Ca = null;
            M.off("visibleChange", S);
            window.removeEventListener("keydown", oa);
            oa = S = M = null;
            xa.destroy();
            ea = xa = null;
            G.destroy();
            G = null;
            for (f in E) E[f] = null;
            E = null
        };
        var E = this, M = $("#" + m[q].canvasId).parent(), S = function (f, c) {
            a.mainRenderer.stage.visible = c == m[q].canvasId;
            a.mainRenderer.StartStopAnimation(a.mainRenderer.stage.visible)
        };
        M.on("visibleChange", S);
        var oa =
            function (f) {
                "input" !== event.srcElement.localName && a.mainRenderer.stage.visible && (13 == f.keyCode || 32 == f.keyCode) && H && (f = H.getChildByName("plus")) && f.interactive && (f.emit("mousedown"), f.emit("mouseup"))
            };
        window.addEventListener("keydown", oa);
        for (var V = clientInfoGlobal.coin7.split("-"), aa = 0; aa < V.length; aa++) V[aa] /= 100;
        var qa = 2 * parseInt(V[V.length - 1], 10);
        V.push("MAX\n" + qa);
        aa = (aa = localStorage.getItem(m[q].gameKind + m[q].gameType + "defaultBet")) && 0 <= V.indexOf(parseInt(aa)) ? JSON.parse(aa) : V[1];
        var ca = new betsControls(V[0],
            V[V.length - 1], aa, V, function (f) {
                a.mainFLGAccount.balance() < qa && (qa = a.mainFLGAccount.balance());
                a.mainRenderer.renderManager.needUpdateRender = !0;
                return qa
            });
        this.betsControls = ca;
        var va = new FLGTimer, N, W, pa = new FLGJackpot(a.mainRenderer, {tirTimeOffset: .1, updateInterval: 900}), sa,
            H = new PIXI.Container, da = new PIXI.Container, ra = new PIXI.Container, ia = new PIXI.Container,
            I = [new PIXI.Container, new PIXI.Container, new PIXI.Container, new PIXI.Container, new PIXI.Container],
            n = {
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
                    text: mainLocalizationTable.video.toUpperCase(), posX: 1160, posY: 551, onStartOpen: function () {
                        W && (W.destroy(), W = null);
                        A.scale_video && A.scale_video.stop();
                        A.scale_video_open && A.scale_video_open.stop();
                        W = new FLGVideo(54, 242, 1089, 613, m[q].canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" allowfullscreen="true" wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=0&amp;URL=' +
                            m.videoURL + ';"> <param name="allowFullScreen" value="true"> <param name="movie" value="videoplayer.swf"> </object>', '<video id="innerVideo' + m[q].canvasId + '" autoplay muted playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + m[q].videoMobileURL + '" type="application/x-mpegURL"></video>', void 0, a.mainSoundManager, !0);
                        var f = navigator.userAgent || navigator.vendor || window.opera;
                        f.match(/Android/i) || W && W.setVisible(!0);
                        A.scale_video_open = (new TWEEN.Tween({scale: 0})).to({scale: 1},
                            330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                            A.scale_video_open = null;
                            W && W.setScale(1)
                        }).onUpdate(function () {
                            W && W.setScale(this.scale)
                        }).onComplete(function () {
                            A.scale_video_open = null
                        }).start();
                        A.video_rotate && A.video_rotate.stop();
                        var c = n.video.container;
                        if (c.getChildByName("video_load")) {
                            var l = c.getChildByName("video_load");
                            l.visible = !0
                        } else l = a.mainRenderer.createButton(c, 10, 25, "video_load"), l.anchor.set(.5, .5), l.scale.set(1.75, 1.75);
                        l && (a.mainRenderer.renderManager.animationTweenInc(),
                            A.video_rotate = (new TWEEN.Tween(l)).to({rotation: 6 * Math.PI}, 3E3).easing(TWEEN.Easing.Linear.None).onStop(function () {
                                l.rotation = 0;
                                l.visible = !1;
                                a.mainRenderer.renderManager.animationTweenDec();
                                A.video_rotate = null
                            }).onComplete(function () {
                                f.match(/Android/i) && W && W.setVisible(!0);
                                l.rotation = 0;
                                l.visible = !1;
                                a.mainRenderer.renderManager.animationTweenDec();
                                A.video_rotate = null
                            }).start())
                    }, onStopOpen: void 0, onStartClose: function () {
                        W && (A.scale_video_open && A.scale_video_open.stop(), A.scale_video && A.scale_video.stop(),
                        A.video_rotate && A.video_rotate.stop(), A.scale_video = (new TWEEN.Tween({scale: 1})).to({scale: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                            A.scale_video = null;
                            W && (W.setScale(0), W.destroy(), W = null)
                        }).onUpdate(function () {
                            W && W.setScale(this.scale)
                        }).onComplete(function () {
                            W && (W.setScale(0), W.destroy(), W = null);
                            A.scale_video = null
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
            }, Na = 0, wa, za = !1, xa, ea = {needShow: !0}, G = new function () {
                this.destroy = function () {
                    for (var g = 0; g < c.length; g++) c[g].round = null, c[g].editionResult = null, c[g].betsHistory.destroy && c[g].betsHistory.destroy(), c[g].betsHistory = null, c[g] = null;
                    x = F = l = c = null;
                    P.destroy();
                    r = J = d = P = null;
                    w.destroy();
                    w = null;
                    la && (la.destroy(), la = null);
                    u = null;
                    b && (b.destroy(),
                        b = null);
                    fa = ba = Q = C = B = y = z = D = p = e = h = null;
                    f.events.removeAllListeners();
                    for (g in f) f[g] = null;
                    f = null
                };
                var f = this, c = [], l;
                this.editions = c;
                var F, P, x = new PIXI.Container, d = new PIXI.Container, w, J = new PIXI.Container, r = new PIXI.Container;
                r.name = "betCntnr";
                this.historyTable = function () {
                    return F
                };
                this.betBGContainer = function () {
                    return w.srcSprite
                };
                this.betsHistoryContainer = function () {
                    return r
                };
                var u = .653, b, e = {font: "bold 30px Arial", fill: "#313131"};
                this.tableHeaderFont = e;
                var p = {font: "22px Arial", fill: "#403f3f"}, h = {
                    font: "20px Arial Narrow",
                    fill: "#000000"
                };
                this.tableHistoryFont = h;
                var D = {font: "20px Arial Narrow", fill: "#ffffff"};
                this.tableHighlightFont = D;
                var z = {font: "bold 22px Arial", fill: "#000000"};
                this.tableBoldFont = z;
                var y = {font: "20px Arial", fill: "#000000"};
                this.tableBetFont = y;
                this.getActedOutEdition = function () {
                    for (var g = c.length - 1; 0 <= g; g--) if (void 0 == c[g].editionResult) return B(g), c[g];
                    B(c.length - 1);
                    return c[c.length - 1]
                };
                var B = function (g) {
                    0 > g || g >= c.length || (l = g, void 0 != x && 0 < x.children.length && fa(), void 0 != F && c[l].betsHistory.redrawCurrentBets(),
                        a.mainRenderer.renderManager.needUpdateRender = !0)
                }, C = function () {
                    F = a.mainRenderer.createButton(void 0, 1294, 305);
                    P = new MaskedSprite(a.mainRenderer.createButton(F, 1, 0, "table_bg"), {
                        mask: {
                            x: 1,
                            y: 0,
                            width: 579,
                            height: 116,
                            radius: 9
                        }
                    }, a.mainRenderer.renderManager);
                    a.mainRenderer.createButton(P.srcSprite, 0, 0, "table_header");
                    Q();
                    fa();
                    var g = new PIXI.Graphics;
                    g.beginFill(16777215);
                    g.drawRect(98, 46, 2, 214);
                    g.alpha = .5;
                    g.endFill;
                    P.srcSprite.addChild(g);
                    g = null;
                    g = a.mainRenderer.createButton(P.srcSprite, 0, 0, void 0, void 0,
                        function (t, v) {
                            a.mainSoundManager.playSound("buttonClick");
                            a.mainUIManager.animations().rotate_editions && (a.mainUIManager.animations().rotate_editions.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().rotate_editions = null);
                            t.pressed = !t.pressed;
                            var L = t.pressed ? Math.PI / 2 : 0;
                            a.mainRenderer.renderManager.animationTweenInc();
                            a.mainUIManager.animations().rotate_editions = (new TWEEN.Tween(t.children[0])).to({rotation: L}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec();
                                a.mainUIManager.animations().rotate_editions = null
                            }).start();
                            a.mainUIManager.animations().resize_editions && (a.mainUIManager.animations().resize_editions.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().resize_editions = null);
                            t = t.pressed ? 260 : 116;
                            a.mainRenderer.renderManager.animationTweenInc();
                            a.mainUIManager.animations().resize_editions = (new TWEEN.Tween({fHeight: P.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: t}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                P.srcSprite.mask.clear();
                                P.srcSprite.mask.beginFill(14922837);
                                P.srcSprite.mask.drawRoundedRect(1, 0, 579, this.fHeight, 9);
                                P.srcSprite.mask.endFill
                            }).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec();
                                a.mainUIManager.animations().resize_editions = null
                            }).start();
                            v && (w.srcSprite.getChildByName("exp2").emit("mousedown"), v.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                        });
                    g.hitArea = new PIXI.Rectangle(0, 0, 579, 43);
                    g.name = "exp1";
                    g = a.mainRenderer.createButton(g, 552, 21, "expand");
                    g.anchor.set(.5, .5);
                    g = null;
                    for (g = 0; g < c.length; g++) c[g].betsHistory.parentEditions(f);
                    ba();
                    c.length && c[l].betsHistory.redrawCurrentBets();
                    P.srcSprite.addChild(d);
                    P.srcSprite.addChild(x)
                };
                this.drawEditions = C;
                var Q = function () {
                    d.children[0] && d.children[1] ? (d.children[0].children[0].text = mainLocalizationTable.round, d.children[1].children[0].text = mainLocalizationTable.balls) : (a.mainRenderer.createButton(d, 19, 22, void 0, {
                        text: mainLocalizationTable.history.toUpperCase(),
                        align: "left",
                        style: e
                    }), a.mainRenderer.createButton(d, 50, 62, void 0,
                        {
                            text: mainLocalizationTable.round,
                            align: "center",
                            style: p
                        }), a.mainRenderer.createButton(d, 114, 62, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "left",
                        style: p
                    }))
                };
                this.redrawEditionHeader = Q;
                var ba = function () {
                    if (J.children[0]) J.children[0].children[0].text = mainLocalizationTable.coupon.toUpperCase(), J.children[1].children[0].text = mainLocalizationTable.balls, J.children[2].children[0].text = mainLocalizationTable.totalBet, J.children[3].children[0].text = mainLocalizationTable.win, w.srcSprite.children[2].children[0].text =
                        mainLocalizationTable.total.toUpperCase() + ":"; else {
                        w = new MaskedSprite(a.mainRenderer.createButton(F, 1, 125, "table_bg"), {
                            mask: {
                                x: 1,
                                y: 125,
                                width: 579,
                                height: 465,
                                radius: 9
                            }, needScrolling: {container: r, scrollbar: {topOffset: 85, botOffset: 38}}
                        }, a.mainRenderer.renderManager);
                        w.srcSprite.addChildAt(r, 0);
                        a.mainRenderer.createButton(w.srcSprite, -4, 425, "bet_bot");
                        a.mainRenderer.createButton(w.srcSprite.children[2], 240, 24, void 0, {
                            text: mainLocalizationTable.total.toUpperCase() + ":", align: "right", style: {
                                font: "22px Arial",
                                fill: "#000000", align: "center"
                            }
                        });
                        a.mainRenderer.createButton(w.srcSprite.children[2], 342, 24, void 0, {
                            text: "",
                            align: "left",
                            style: {font: "22px Arial", fill: "#000000", align: "center"}
                        });
                        a.mainRenderer.createButton(w.srcSprite.children[2], 458, 24, void 0, {
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
                        w.srcSprite.addChild(g);
                        g = new PIXI.Graphics;
                        g.beginFill(16777215);
                        g.drawRect(270, 46, 2, 419);
                        g.alpha = .5;
                        g.name = "modeSep";
                        g.endFill;
                        w.srcSprite.addChild(g);
                        g = new PIXI.Graphics;
                        g.beginFill(16777215);
                        g.drawRect(330, 46, 2, 419);
                        g.alpha = .5;
                        g.name = "coefSep";
                        g.endFill;
                        w.srcSprite.addChild(g);
                        g = new PIXI.Graphics;
                        g.beginFill(16777215);
                        g.drawRect(450, 46, 2, 419);
                        g.alpha = .5;
                        g.name = "winsSep";
                        g.endFill;
                        w.srcSprite.addChild(g);
                        g = null;
                        w.srcSprite.interactive = !0;
                        w.srcSprite.hitArea = new PIXI.Rectangle(0, 0, 579, 465);
                        a.mainRenderer.createButton(w.srcSprite, 0, 0, "table_header");
                        g = a.mainRenderer.createButton(w.srcSprite,
                            0, 0, void 0, void 0, function (t, v) {
                                a.mainUIManager.animations().rotate_bets && (a.mainUIManager.animations().rotate_bets.stop(), a.mainRenderer.renderManager.animationTweenDec());
                                t.pressed = !t.pressed;
                                var L = t.pressed ? 0 : Math.PI / 2;
                                a.mainRenderer.renderManager.animationTweenInc();
                                a.mainUIManager.animations().rotate_bets = (new TWEEN.Tween(t.children[0])).to({rotation: L}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                                    a.mainRenderer.renderManager.animationTweenDec();
                                    a.mainUIManager.animations().rotate_bets =
                                        null
                                }).start();
                                a.mainUIManager.animations().resize_bets && (a.mainUIManager.animations().resize_bets.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().resize_bets = null);
                                t = t.pressed ? 320 : 465;
                                a.mainRenderer.renderManager.animationTweenInc();
                                a.mainUIManager.animations().resize_bets = (new TWEEN.Tween({fHeight: w.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: t}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                    w.srcSprite.position.y = 590 - this.fHeight;
                                    w.srcSprite.children[2].position.y =
                                        425 + this.fHeight - 465;
                                    w.srcSprite.mask.clear();
                                    w.srcSprite.mask.beginFill(14922837);
                                    w.srcSprite.mask.drawRoundedRect(1, w.srcSprite.position.y, 579, this.fHeight, 9);
                                    w.srcSprite.mask.endFill;
                                    w.srcSprite.hitArea.height = this.fHeight;
                                    r.emit("updateHeight")
                                }).onComplete(function () {
                                    a.mainRenderer.renderManager.animationTweenDec();
                                    a.mainUIManager.animations().resize_bets = null
                                }).start();
                                v && (P.srcSprite.getChildByName("exp1").emit("mousedown"), v.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                            });
                        g.hitArea =
                            new PIXI.Rectangle(0, 0, 579, 43);
                        g.name = "exp2";
                        g = a.mainRenderer.createButton(g, 552, 21, "expand");
                        g.anchor.set(.5, .5);
                        g.rotation = Math.PI / 2;
                        g = null;
                        w.srcSprite.addChild(J);
                        a.mainRenderer.createButton(J, 19, 22, void 0, {
                            text: mainLocalizationTable.coupon.toUpperCase(),
                            align: "left",
                            style: e
                        });
                        a.mainRenderer.createButton(J, 19, 62, void 0, {
                            text: mainLocalizationTable.balls,
                            align: "left",
                            style: p
                        });
                        a.mainRenderer.createButton(J, 255, 62, void 0, {text: "#", align: "center", style: p});
                        a.mainRenderer.createButton(J, 300, 62, void 0,
                            {text: "X", align: "center", style: p});
                        a.mainRenderer.createButton(J, 342, 62, void 0, {
                            text: mainLocalizationTable.totalBet,
                            align: "left",
                            style: p
                        });
                        a.mainRenderer.createButton(J, 465, 62, void 0, {
                            text: mainLocalizationTable.win,
                            align: "left",
                            style: p
                        });
                        g = a.mainRenderer.createButton(w.srcSprite, 0, 0, void 0, void 0, function (t, v) {
                            a.mainSoundManager.playSound("buttonClick");
                            ea.needShow = !ea.needShow;
                            f.events.emit("GRID_STATS");
                            t.children[0].texture = a.mainRenderer.resourceLoader.resources[ea.needShow ? "eye_icon" : "eye_closed_icon"].texture;
                            da.getChildByName("menu_container").getChildByName("btn_eye").texture = a.mainRenderer.resourceLoader.resources[ea.needShow ? "btn_eye" : "btn_eye_closed"].texture;
                            da.getChildByName("menu_container").getChildByName("btn_eye").children[0].texture = a.mainRenderer.resourceLoader.resources[ea.needShow ? "btn_eye_mode_selected" : "btn_eye_closed_mode_selected"].texture;
                            v && (v.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                        });
                        g.hitArea = new PIXI.Rectangle(240, 0, 90, 43);
                        g.name = "eye_icon";
                        a.mainRenderer.createButton(g,
                            285, 21, "eye_icon").anchor.set(.5, .5);
                        g = null
                    }
                };
                this.drawBetsHeader = ba;
                var fa = function () {
                    var g = 0 !== x.children.length;
                    if (!g) for (var t = 0; 5 > t; t++) {
                        var v = new a.mainRenderer.createButton(x, 0, 98 + 36 * (6 - t - 2), t & 1 ? "table_line_odd" : "table_line_even");
                        v.anchor.y = .5
                    }
                    var L = a.mainGameManager.gameHistory();
                    for (t = 0; t < L.length; t++) {
                        var K = L[t].balls.slice();
                        K.sort(a.mainGameManager.sortNumeric);
                        v = x.children[t];
                        if (g = 0 !== v.children.length) for (v.getChildByName("round" + t).children[0].text = L[t].tir, g = 0; g < K.length; g++) v.getChildByName("result" +
                            g).children[0].text = K[g]; else {
                            a.mainRenderer.createButton(v, 50, 0, void 0, {
                                text: L[t].tir,
                                align: "center",
                                style: h
                            }).name = "round" + t;
                            var T = 70;
                            for (g = 0; g < K.length; g++) a.mainRenderer.createButton(v, T += 40, -18, "ball", {
                                text: K[g],
                                align: "center",
                                style: {font: "bold 40px Arial Narrow", fill: "#000000"}
                            }).name = "result" + g, v.getChildByName("result" + g).scale.set(.45, .45)
                        }
                    }
                };
                this.detailEditionsFont = {font: "bold 46px Arial", fill: "#ffffff"};
                this.detailEditionsHeaderFont = {font: "bold 24px Arial", fill: "#fca903"};
                this.detailEditionsRowFont =
                    {font: "bold 32px Arial", fill: "#ffffff"};
                var la, ya = new PIXI.Graphics;
                ya.beginFill(16777215, .4);
                ya.drawCircle(0, 0, 38);
                ya.endFill();
                this.rectTexture = ya.generateTexture(!1);
                ya = null;
                this.drawDetailEditionHistory = function (g, t) {
                    if (c[t].editionResult) {
                        var v = 0 != g.children.length;
                        g.editionInd = t;
                        var L = {x: 599, y: 524}, K = c[t].editionResult.slice();
                        K.sort(a.mainGameManager.sortNumeric);
                        v ? (b.removeBalls(), b.startDrawBalls(K, u, 0), g.children[0].children[0].text = "# " + c[t].round, K = g.getChildByName("totalBox"), K.getChildByName("tBet").children[0].text =
                            formatFLGNums(c[t].betsHistory.getTotalBet(), !1), K.getChildByName("tWin").children[0].text = formatFLGNums(c[t].betsHistory.setTotalWin(), !1), K = null) : (v = a.mainRenderer.createButton(g, 180 - L.x, 240 - L.y, void 0, {
                            text: "# " + c[t].round,
                            align: "center",
                            style: f.detailEditionsFont
                        }), b = new R(765 - L.x - 53 * (m[q].ballCount - 1), 214 - L.y, 53, g), b.startDrawBalls(K, u, 0), v = a.mainRenderer.createButton(g, 980 - L.x, 240 - L.y, "history_arrow_left"), a.mainRenderer.createButton(v, 0, 0, "history_arrow_left_selected", void 0, function (na, Ha) {
                            a.mainSoundManager.playSound("buttonClick");
                            g.editionInd = limit(g.editionInd - 1, 0, c.length - 2);
                            f.drawDetailEditionHistory(g, g.editionInd);
                            Ha.stopped = !0;
                            a.mainUIManager.clickAnimationFunc(na, "bet_arrow_History");
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        }, void 0, void 0, function (na) {
                            Y(na, "bet_arrow_History")
                        }, function (na) {
                            X(na, "bet_arrow_History")
                        }).alpha = 0, v.anchor.set(.5, .5), v.children[0].anchor.set(.5, .5), v = a.mainRenderer.createButton(g, 1080 - L.x, 240 - L.y, "history_arrow"), a.mainRenderer.createButton(v, 0, 0, "history_arrow_selected", void 0,
                            function (na, Ha) {
                                a.mainSoundManager.playSound("buttonClick");
                                g.editionInd = limit(g.editionInd + 1, 0, c.length - 2);
                                f.drawDetailEditionHistory(g, g.editionInd);
                                Ha.stopped = !0;
                                a.mainUIManager.clickAnimationFunc(na, "bet_arrow_History2");
                                a.mainRenderer.renderManager.needUpdateRender = !0
                            }, void 0, void 0, function (na) {
                                Y(na, "bet_arrow_History2")
                            }, function (na) {
                                X(na, "bet_arrow_History2")
                            }).alpha = 0, v.anchor.set(.5, .5), v.children[0].anchor.set(.5, .5), v = a.mainRenderer.createButton(g, 850 - L.x, 342 - L.y, void 0, {
                            text: mainLocalizationTable.coef.toUpperCase(),
                            align: "center", style: f.detailEditionsHeaderFont
                        }), v.anchor.set(.5, .5), v = a.mainRenderer.createButton(g, 120 - L.x, 342 - L.y, void 0, {
                            text: mainLocalizationTable.balls.toUpperCase(),
                            align: "center",
                            style: f.detailEditionsHeaderFont
                        }), v.anchor.set(.5, .5), v = a.mainRenderer.createButton(g, 685 - L.x, 342 - L.y, void 0, {
                            text: mainLocalizationTable.bet.toUpperCase(),
                            align: "center",
                            style: f.detailEditionsHeaderFont
                        }), v.anchor.set(.5, .5), v = a.mainRenderer.createButton(g, 1033 - L.x, 342 - L.y, void 0, {
                            text: mainLocalizationTable.win.toUpperCase(),
                            align: "center", style: f.detailEditionsHeaderFont
                        }), v.anchor.set(.5, .5), v = a.mainRenderer.createButton(g, 545 - L.x, 342 - L.y, void 0, {
                            text: "#",
                            align: "center",
                            style: f.detailEditionsHeaderFont
                        }), v.anchor.set(.5, .5), la = new MaskedSprite(a.mainRenderer.createButton(g, 0, 0), {
                            mask: {
                                x: 60 - L.x,
                                y: 364 - L.y,
                                width: 1070,
                                height: 426
                            }, needScrolling: {}
                        }, a.mainRenderer.renderManager), la.srcSprite.interactive = !0, la.srcSprite.hitArea = new PIXI.Rectangle(70 - L.x, 362 - L.y, 1061, 432), K = a.mainRenderer.createButton(g, 68 - L.x, 826 - L.y, void 0),
                            K.name = "totalBox", K.anchor.y = .5, a.mainRenderer.createButton(K, 56, 0, void 0, {
                            text: mainLocalizationTable.total.toUpperCase(),
                            align: "center",
                            style: f.detailEditionsHeaderFont
                        }), a.mainRenderer.createButton(K, 478, 0, void 0, {
                            text: mainLocalizationTable.bet.toUpperCase() + ":",
                            align: "center",
                            style: f.detailEditionsHeaderFont
                        }), v = a.mainRenderer.createButton(K, 617, 0, "tab_history_row2"), v.anchor.set(.5, .5), v.scale.x = .145, a.mainRenderer.createButton(K, 617, 0, void 0, {
                            text: formatFLGNums(c[t].betsHistory.getTotalBet(),
                                !1), align: "center", style: f.detailEditionsRowFont
                        }).name = "tBet", a.mainRenderer.createButton(K, 783, 0, void 0, {
                            text: mainLocalizationTable.win.toUpperCase() + ":",
                            align: "center",
                            style: f.detailEditionsHeaderFont
                        }), v = a.mainRenderer.createButton(K, 966, 0, "tab_history_row2"), v.anchor.set(.5, .5), v.scale.x = .18, a.mainRenderer.createButton(K, 966, 0, void 0, {
                            text: formatFLGNums(c[t].betsHistory.setTotalWin(), !1),
                            align: "center",
                            style: f.detailEditionsRowFont
                        }).name = "tWin", v = K = null);
                        K = [];
                        var T;
                        K = la.containerForScroll;
                        var Z;
                        for (v = 0; K.getChildByName("row_" + v); v++) if (T = K.getChildByName("row_" + v)) {
                            T.visible = !1;
                            for (Z = 0; T.getChildByName("rect" + v + "_" + Z); Z++) {
                                var U = T.getChildByName("rect" + v + "_" + Z);
                                U.visible = !1;
                                U.getChildByName("textBet" + v + "_" + Z).visible = !1
                            }
                            if (U = T.getChildByName("summ" + v)) U.visible = !1, T.getChildByName("win" + v).visible = !1, T.getChildByName("coef" + v).visible = !1, T.getChildByName("coefMode" + v).visible = !1
                        }
                        g.children[2].interactive = 0 !== g.editionInd;
                        g.children[2].alpha = 0 !== g.editionInd ? 1 : .3;
                        g.children[3].interactive =
                            g.editionInd !== c.length - 2;
                        g.children[3].alpha = g.editionInd !== c.length - 2 ? 1 : .3;
                        g.children[4].visible = 0 < c[t].betsHistory.bets.length;
                        g.children[5].visible = 0 < c[t].betsHistory.bets.length;
                        g.children[6].visible = 0 < c[t].betsHistory.bets.length;
                        g.children[7].visible = 0 < c[t].betsHistory.bets.length;
                        g.children[8].visible = 0 < c[t].betsHistory.bets.length;
                        if (0 >= c[t].betsHistory.bets.length) K.emit("updateHeight"); else {
                            var ha = [];
                            v = 0;
                            for (var ja = c[t].betsHistory.bets.length - 1; v < c[t].betsHistory.bets.length; v++, ja--) {
                                (T =
                                    K.getChildByName("row_" + v)) ? T.visible = !0 : (T = new a.mainRenderer.createButton(K, 68 - L.x, 391 + 61 * v - L.y, "tab_history_row"), T.anchor.y = .5, T.name = "row_" + v);
                                for (Z = 0; Z < c[t].betsHistory.bets[ja].bet.length; Z++) {
                                    ha = c[t].betsHistory.bets[ja].bet.slice();
                                    ha.sort(a.mainGameManager.sortNumeric);
                                    var Ia = -1 < c[t].betsHistory.bets[ja].winBets.indexOf(ha[Z]);
                                    (U = T.getChildByName("rect" + v + "_" + Z)) ? (U.texture = Ia ? a.mainRenderer.resourceLoader.resources.ball.texture : f.rectTexture, U.visible = !0, U = U.getChildByName("textBet" + v +
                                        "_" + Z), U.children[0].text = ha[Z], U.visible = !0) : (U = new PIXI.Sprite(Ia ? a.mainRenderer.resourceLoader.resources.ball.texture : f.rectTexture), T.addChild(U), U.position.x = 32 + 56 * Z, U.position.y = 0, U.scale.set(.65, .65), U.anchor.set(.5, .5), U.name = "rect" + v + "_" + Z, U = a.mainRenderer.createButton(U, 0, 0, void 0, {
                                        text: ha[Z],
                                        align: "center",
                                        style: {font: "bold 44px Arial Narrow", fill: "#000", align: "center"}
                                    }), U.anchor.set(.5, .5), U.name = "textBet" + v + "_" + Z);
                                    Ia = null
                                }
                                Z = void 0 != c[t].betsHistory.bets[ja].win ? formatFLGNums(c[t].betsHistory.bets[ja].win,
                                    !1) : "";
                                ha = void 0 != c[t].betsHistory.bets[ja].countWin ? a.mainGameManager.coefficients[c[t].betsHistory.bets[ja].coef - 1][c[t].betsHistory.bets[ja].countWin] / 100 : "";
                                (U = T.getChildByName("summ" + v)) ? (U.children[0].text = formatFLGNums(c[t].betsHistory.bets[ja].summ, !1), U.visible = !0, U = T.getChildByName("coef" + v), U.children[0].text = "X  " + ha, U.visible = !0, ha = T.getChildByName("coefMode" + v), ha.children[0].text = c[t].betsHistory.bets[ja].coef, ha.visible = !0, T = T.getChildByName("win" + v), T.children[0].text = Z, T.visible =
                                    !0) : (a.mainRenderer.createButton(T, 615, 0, void 0, {
                                    text: formatFLGNums(c[t].betsHistory.bets[ja].summ, !1),
                                    align: "center",
                                    style: f.detailEditionsRowFont
                                }).name = "summ" + v, a.mainRenderer.createButton(T, 780, 0, void 0, {
                                    text: "X  " + ha,
                                    align: "center",
                                    style: f.detailEditionsRowFont
                                }).name = "coef" + v, a.mainRenderer.createButton(T, 965, 0, void 0, {
                                    text: Z,
                                    align: "center",
                                    style: f.detailEditionsRowFont
                                }).name = "win" + v, a.mainRenderer.createButton(T, 478, 0, void 0, {
                                    text: c[t].betsHistory.bets[ja].coef,
                                    align: "center",
                                    style: f.detailEditionsRowFont
                                }).name =
                                    "coefMode" + v)
                            }
                            ha = [];
                            K.emit("updateHeight");
                            ha = Z = U = U = ha = U = T = U = T = K = L = null
                        }
                    }
                };
                this.cancelLastEdition = function (g) {
                    c.length && (c[c.length - 1].editionResult = g, c[c.length - 1].betsHistory.calculateWin(g), B(c.length - 1))
                };
                this.addEdition = function (g) {
                    6 <= c.length && (c[0].betsHistory.destroy && c[0].betsHistory.destroy(), c[0].betsHistory = null, c.shift());
                    c.length && !c[c.length - 1].betsHistory.bets.length ? (c[c.length - 1].round = g, c[c.length - 1].editionResult = void 0) : c.length && c[c.length - 1].round === g || (c.push({
                        round: g, editionResult: void 0,
                        betsHistory: new O([])
                    }), c[c.length - 1].betsHistory.parentEditions(f));
                    B(c.length - 1)
                };
                this.saveToStorage = async function () {
                    localStorage.setItem("curUser", JSON.stringify({
                        hall: clientInfoGlobal.hall,
                        nick: clientInfoGlobal.lgn
                    }));
                    var g = [], t;
                    for (t = 0; t < c.length; t++) g.push({
                        round: c[t].round,
                        editionResult: c[t].editionResult,
                        bets: c[t].betsHistory.bets
                    });
                    localStorage.setItem(m[q].gameKind + m[q].gameType + "editions", JSON.stringify(g))
                };
                this.loadFromStorage = function () {
                    function g(L) {
                        $.ajax({
                            type: "get", url: getUrl(),
                            data: {
                                gethistory: parseInt(m[q].serverName.slice(3, m[q].serverName.length)),
                                round: L.round + 1
                            }, dataType: "json", async: !1, success: function (K, T, Z) {
                                if (f) if (K && K.tirid0) {
                                    T = [];
                                    Z = K.tirid0;
                                    for (K = 0; K < m[q].ballCount; K++) {
                                        if (99 === Z["b" + K] || 0 === Z["b" + K]) return;
                                        T.push(Z["b" + K])
                                    }
                                    L.editionResult = T;
                                    a.mainGameManager.coefficients && L.betsHistory.calculateWin(L.editionResult, !0)
                                } else L.editionResult = []
                            }
                        })
                    }

                    if (localStorage.getItem("curUser")) {
                        var t = JSON.parse(localStorage.getItem("curUser"));
                        if (t.hall !== clientInfoGlobal.hall &&
                            t.nick !== clientInfoGlobal.lgn) return
                    }
                    t = m[q].gameKind + m[q].gameType + "editions";
                    if (localStorage.getItem(t)) {
                        var v = JSON.parse(localStorage.getItem(t));
                        for (t = 0; t < v.length; t++) c.push({
                            round: v[t].round,
                            editionResult: v[t].editionResult,
                            betsHistory: new O(v[t].bets)
                        }), (!c[t].editionResult || c[t].editionResult.length < m[q].ballCount) && g(c[t]);
                        B(c.length - 1)
                    }
                };
                B(c.length - 1);
                this.events = new PIXI.utils.EventEmitter;
                f.events.on("EDITIONS_CHANGE", function () {
                    f.saveToStorage()
                });
                f.events.on("RESULT_TIME", fa);
                f.events.on("BET_TIME",
                    fa)
            }, A = {};
        this.animations = function () {
            return A
        };
        this.clickAnimationFunc = function (f, c) {
            f && (A[c] && (A[c].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), A[c] = (new TWEEN.Tween(f)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                A[c] = null;
                a.mainRenderer.renderManager.animationTweenInc();
                A[c] = (new TWEEN.Tween(f)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    A[c] = null
                }).start()
            }).start())
        };
        var Y = function (f, c, l) {
                if (f) switch (A[c] && (A[c].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), l) {
                    case "grow":
                        A[c] = (new TWEEN.Tween(f.scale)).to({
                            x: 1.2,
                            y: 1.2
                        }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            A[c] = null
                        }).start();
                        break;
                    default:
                        A[c] = (new TWEEN.Tween(f)).to({alpha: .6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            A[c] = null
                        }).start()
                }
            }, X = function (f, c, l) {
                A[c] && (A[c].stop(), a.mainRenderer.renderManager.animationTweenDec());
                if (f && 0 != f.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(), l) {
                    case "grow":
                        A[c] = (new TWEEN.Tween(f.scale)).to({
                            x: 1,
                            y: 1
                        }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            A[c] = null
                        }).start();
                        break;
                    default:
                        A[c] = (new TWEEN.Tween(f)).to({alpha: 0}, 500).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            A[c] = null
                        }).start()
                }
            }, Ba = function (f, c, l) {
                if (f.container) {
                    A[l] && A[l].stop();
                    if (f.onStartClose) f.onStartClose();
                    a.mainRenderer.renderManager.animationTweenInc();
                    A[l] = (new TWEEN.Tween(f.container.scale)).to({y: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                        if (f.onStopClose) f.onStopClose();
                        if (c.onStopOpen) c.onStopOpen();
                        a.mainRenderer.renderManager.animationTweenDec();
                        A[l] = null;
                        f.container.scale.y = 0;
                        c.container.scale.y = 1
                    }).onComplete(function () {
                        if (f.onStopClose) f.onStopClose();
                        a.mainRenderer.renderManager.animationTweenDec();
                        A[l] = null;
                        if (c.onStartOpen) c.onStartOpen();
                        a.mainRenderer.renderManager.animationTweenInc();
                        A[l] = (new TWEEN.Tween(c.container.scale)).to({y: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                            if (f.onStopClose) f.onStopClose();
                            if (c.onStopOpen) c.onStopOpen();
                            a.mainRenderer.renderManager.animationTweenDec();
                            A[l] = null;
                            f.container.scale.y = 0;
                            c.container.scale.y = 1
                        }).onComplete(function () {
                            if (c.onStopOpen) c.onStopOpen();
                            a.mainRenderer.renderManager.animationTweenDec();
                            A[l] = null
                        }).start()
                    }).start()
                }
            },
            Ga = function (f, c, l) {
                f && (A[c] ? A[c].stop() : (a.mainRenderer.renderManager.animationTweenInc(), A[c] = (new TWEEN.Tween(f.position)).to({x: l}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    A[c] = null
                }).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    A[c] = null
                }).start()))
            };
        this.simpleFlipXFunc = function (f, c, l, F, P, x) {
            A[c] && A[c].stop();
            var d = f.scale.x;
            a.mainRenderer.renderManager.animationTweenInc();
            A[c] = (new TWEEN.Tween(f.scale)).to({x: 0},
                l).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                A[c] = null;
                f.scale.x = d
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                A[c] = null;
                P && P(f);
                a.mainRenderer.renderManager.animationTweenInc();
                A[c] = (new TWEEN.Tween(f.scale)).to({x: d}, F).onStop(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    A[c] = null;
                    f.scale.x = d;
                    x && x(f)
                }).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    A[c] = null;
                    x && x(f)
                }).start()
            }).start()
        };
        var ua = !1, ta = [["bg",
            k + "bg-mbk-" + m[q].gameType.toLowerCase() + ".jpg"], ["JP", k + "WinJP/jp-jackpot-win.png"], ["jp_only", k + "WinJP/jp-jackpot-only.png"], ["WIN", k + "WinJP/jp-bigwin.png"], ["header", k + "header.png"], ["footer", k + "footer.png"], ["jp_name", k + "jackpot/jack-pot.png"], ["jp_num_bot", k + "jackpot/num-bot.png"], ["jp_num_top", k + "jackpot/num-top.png"], ["btn_clear", k + "btn-undo.png"], ["btn_clear_mode_selected", k + "btn-undo-mode-selected.png"], ["btn_home", k + "btn-home.png"], ["btn_home_mode_selected", k + "btn-home-mode-selected.png"],
            ["btn_info", k + "btn-info.png"], ["btn_info_mode_selected", k + "btn-info-mode-selected.png"], ["btn_my_bets", k + "btn-my-bets.png"], ["btn_my_bets_mode_selected", k + "btn-my-bets-selected.png"], ["btn_rebet", k + "btn-rebet-min.png"], ["btn_rebet_mode_selected", k + "btn-rebet-mode-selected-min.png"], ["btn_rebetx2", k + "btn-rebetx2-min.png"], ["btn_rebetx2_mode_selected", k + "btn-rebetx2-mode-selected-min.png"], ["btn_rules_new", k + "help-desktop-new.png"], ["btn_rules_mode_selected_new", k + "help-desktop-mode-selected.png"],
            ["btn_eye", k + "btn-eye-min.png"], ["btn_eye_mode_selected", k + "btn-eye-mode-selected2-min.png"], ["btn_eye_closed", k + "btn-eye-closed-min.png"], ["btn_eye_closed_mode_selected", k + "btn-eye-closed-mode-selected-min.png"], ["eye_icon", k + "eye-icon-min.png"], ["eye_closed_icon", k + "eye-closed-icon-min.png"], ["bet_arrow", k + "arrow.png"], ["bet_arrow_selected", k + "arrow-selected.png"], ["history_arrow", k + "arrow-history.png"], ["history_arrow_selected", k + "arrow-history-selected2.png"], ["history_arrow_left", k + "arrow-history-l.png"],
            ["history_arrow_left_selected", k + "arrow-history-l-selected2.png"], ["autoplay", k + "autoplay.png"], ["autoplay_selected", k + "autoplay-selected.png"], ["autoplay_pressed", k + "autoplay-pressed.png"], ["plus", k + "plus_.png"], ["random", k + "random_.png"], ["random_selected", k + "random-selected_.png"], ["random_pressed", k + "random-pressed_.png"], ["tab", k + "tab.png"], ["tab_selected", k + "tab-selected.png"], ["tab_pressed", k + "tab-pressed.png"], ["tab_bg", k + "tab-bg.png"], ["bet_bot", k + "bet-bot.png"], ["table_header", k + "table-header.png"],
            ["table_bg", k + "table-bg.png"], ["table_line_odd", k + "table-odd-line.png"], ["table_line_even", k + "table-even-line.png"], ["expand", k + "expand.png"], ["tab_history_row", k + "tab-history-row-sep-min.png"], ["tab_history_row2", k + "tab-history-row.png"], ["hotcold_bg", k + "hotcold-bg.png"], ["ball", k + "ball_.png"], ["game_red_btn", k + "game-red-btn.png"], ["game_red_btn_selected", k + "game-red-btn-selected.png"], ["game_green_btn", k + "game-green-btn.png"], ["game_green_btn_selected", k + "game-green-btn-selected.png"], ["game_blue_btn",
                k + "game-blue-btn.png"], ["game_blue_btn_selected", k + "game-blue-btn-selected.png"], ["game_red_icon", k + "game-red-ico.png"], ["game_red_icon_selected", k + "game-red-ico-selected.png"], ["game_green_icon", k + "game-green-ico.png"], ["game_green_icon_selected", k + "game-green-ico-selected.png"], ["game_blue_icon", k + "game-blue-ico.png"], ["game_blue_icon_selected", k + "game-blue-ico-selected.png"], ["zone_transp", k + "zone-" + m[q].gameType + "_.png"], ["zone_hot", k + "zone-hot.png"], ["zone_cold", k + "zone-cold.png"], ["zone_selected",
                k + "zone-action-" + m[q].gameType + "_.png"], ["zone_pressed", k + "zone-win-" + m[q].gameType + "2.png"], ["zone_win", k + "zone-pressed-" + m[q].gameType + "2.png"], ["zone_lock", k + "zone-lock-" + m[q].gameType + "2.png"], ["zone_lock2", k + "zone-lock-" + m[q].gameType + "2.png"], ["grid_bg", k + "grid-" + m[q].gameType + ".png"], ["grid_bg_copy", k + "grid-" + m[q].gameType + "-copy.png"], ["coef_bg", k + "bg-coef.png"], ["coef_btns", k + "bg-coef-btns-" + m[q].gameType + "_.png"], ["coef_line_left", k + "coef-line-left.png"], ["coef_line_middle", k + "coef-line-middle.png"],
            ["coef_line_right", k + "coef-line-right.png"], ["coef_btn_selected", k + "bg-coef-btn-selected.png"], ["coef_btn", k + "bg-coef-btn-" + m[q].gameType + ".png"], ["rules_1", k + "rules_1_" + m[q].gameType + "-min.png"], ["rules_2", k + "rules_2_" + m[q].gameType + "-min.png"], ["rules_3", k + "rules_3_" + m[q].gameType + "-min.png"], ["rules_4", k + "rules_4_" + m[q].gameType + "-min.png"], ["rules_5", k + "rules_5-min.png"], ["rules_6", k + "rules_6-min.png"], ["rules_7", k + "rules_7-min.png"], ["btn_menu", k + "btn-menu2-min.png"], ["btn_menu_selected", k + "btn-menu2-selected-min.png"],
            ["btn_cross", k + "btn-cross-min.png"], ["btn_cross_selected", k + "btn-cross-selected-min.png"], ["btn_rules", k + "btn-rules.png"], ["btn_rules_selected", k + "btn-rules-selected.png"], ["video_load", k + "btn-video-load-new.png"]];
        ta = ta.concat(a.mainFLGAccount.resources);
        ta = ta.concat(pa.resources);
        a.mainRenderer.loadResources(a.mainRenderer.stage, FLGUtils.staticRootPath + "images/logo.json", ta, function (f, c, l) {
            function F(b) {
                q != b && (a.mainSoundManager.playSound("buttonClick"), mobileMode || M.css("background-image", "url(" +
                    m[b].gameBG + ")"), setTimeout(function () {
                    var e = m[q].canvasId;
                    $("#" + e).attr("gameType", b);
                    Da(e, q.toLowerCase());
                    Ea(e, b)
                }, 50))
            }

            function P(b, e, p) {
                var h = -1, D = -1, z;
                for (z in I) if (!I[z].isUsed) {
                    h = parseInt(z);
                    I[h].isLast && (D = h == I.length - 1 ? 0 : h + 1);
                    break
                }
                a.mainRenderer.renderManager.animationTweenInc();
                a.mainUIManager.animations().lottoTicket = (new TWEEN.Tween({
                    scale: 1,
                    position: ia.position.y,
                    alpha: 1
                })).to({scale: .9, position: -60, alpha: 0}, e ? 0 : 250).onUpdate(function () {
                    ia.scale.set(this.scale, this.scale);
                    ia.position.y =
                        this.position;
                    for (var y = 1 - .08 * h, B = 1 - .15 * h, C = 0; C < h; C++) I[C].position.y = -50 * (h - C) * y + this.position, I[C].scale.set(this.scale - .08 * (h - C), this.scale - .08 * (h - C)), I[C].alpha = B, y += .08, B += .15;
                    I[h].isLast && (I[D].alpha = this.alpha)
                }).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    a.mainUIManager.animations().lottoTicket = null;
                    I[h].isLast && (I[D].position.x = -1200, I[D].position.y = 0, I[D].scale.set(1, 1), I[D].isUsed = !1, I[D].isLast = !0, I[D].alpha = 1, n.game.container.removeChild(I[D]),
                        n.game.container.addChildAt(I[D], n.game.container.getChildIndex(ia) + 1), I[h].isLast = !1);
                    a.mainRenderer.renderManager.animationTweenInc();
                    a.mainUIManager.animations().lottoTicketCopy = (new TWEEN.Tween(I[h].position)).to({x: 0}, e ? 0 : 250).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        a.mainUIManager.animations().lottoTicketCopy = null;
                        I[h].isUsed = !0;
                        if (b) {
                            var y;
                            for (y in b) {
                                var B = a.mainGrid.zones[b[y] - 1];
                                B.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture;
                                B.children[0].style = {
                                    font: "50px Swiss721-CondensedBold",
                                    fill: m[q].gridNumColor,
                                    align: "center"
                                }
                            }
                        }
                        ia.scale.set(1, 1);
                        ia.position.y = 0;
                        n.game.container.removeChild(I[h]);
                        n.game.container.addChildAt(I[h], n.game.container.getChildIndex(ia));
                        I[h].scale.set(.9, .9);
                        I[h].position.y -= 60;
                        p && p()
                    }).start()
                }).start()
            }

            function x(b, e) {
                n.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + e).children[1].interactive = !1;
                n.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + e).children[1].alpha =
                    1;
                n.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + e).children[1].children[0].style = {
                    font: "bold " + J + "px Arial",
                    fill: "#000"
                };
                n.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + e).children[1].interactive = !1;
                n.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + e).children[1].alpha = 1;
                n.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + e).children[1].children[0].style = {
                    font: "bold " + J + "px Arial",
                    fill: "#000"
                };
                n.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" +
                    b).children[1].interactive = !0;
                n.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].alpha = 0;
                n.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].children[0].style = {
                    font: "bold " + J + "px Arial",
                    fill: "#444"
                };
                n.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].interactive = !0;
                n.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + b).children[1].alpha = 0;
                n.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" +
                    b).children[1].children[0].style = {font: "bold " + J + "px Arial", fill: "#444"};
                localStorage.setItem(m[q].gameKind + m[q].gameType + "coefMode", JSON.stringify(e))
            }

            a.mainRenderer.createButton(void 0, 0, 0, "bg");
            a.mainRenderer.createButton(void 0, 0, 944, "footer");
            a.mainFLGAccount.drawAccount(0, 0, m[q], !0);
            a.mainRenderer.createButton(void 0, 0, 0, "header");
            var d = new PIXI.Graphics;
            d.beginFill(0, .5);
            d.drawRect(0, 0, 136, 1052);
            d.endFill;
            d.name = "menu_container";
            da.addChild(d);
            d.position.set(-136, 28);
            da.interactive = !0;
            N = new PIXI.Graphics;
            N.beginFill(0);
            N.drawRect(0, 0, 1920, 28);
            N.endFill;
            d = a.mainRenderer.createButton(N, 960, 14, void 0, {
                text: mainLocalizationTable.placeBets.toUpperCase(),
                align: "center",
                style: {font: "18px Arial", fill: "#efefef", align: "center"}
            });
            d.anchor.set(.5, .5);
            d = a.mainRenderer.createButton(N, 1838, 14, void 0, {
                text: "00:00",
                align: "center",
                style: {font: "24px Arial", fill: "#efefef", align: "center"}
            });
            d.anchor.set(.5, .5);
            d = a.mainRenderer.createButton(N, 40, 14, void 0, {
                text: "LOTTO", align: "left", style: {
                    font: "22px Arial Narrow", fill: "#efefef",
                    align: "left"
                }
            });
            d.anchor.set(.5, .5);
            N.addChild(new PIXI.Graphics);
            N.children[3].beginFill(42577);
            N.children[3].drawRect(3, 3, 1914, 22);
            N.children[3].endFill;
            d = a.mainRenderer.createButton(N.children[3], 960, 14, void 0, {
                text: mainLocalizationTable.placeBets.toUpperCase(),
                align: "center",
                style: {font: "18px Arial", fill: "#000000", align: "center"}
            });
            d.anchor.set(.5, .5);
            d = a.mainRenderer.createButton(N.children[3], 1838, 14, void 0, {
                text: "00:00",
                align: "center",
                style: {font: "24px Arial", fill: "#000000", align: "center"}
            });
            d.anchor.set(.5, .5);
            d = a.mainRenderer.createButton(N.children[3], 40, 14, void 0, {
                text: "LOTTO",
                align: "left",
                style: {font: "22px Arial Narrow", fill: "#000000", align: "left"}
            });
            d.anchor.set(.5, .5);
            f = new PIXI.Graphics;
            f.beginFill();
            f.drawRect(3, 0, 1914, 28);
            f.endFill;
            N.children[3].mask = f;
            N.children[3].parent.addChild(f);
            f = null;
            a.mainRenderer.stage.addChild(N);
            d = a.mainRenderer.createButton(H, 43, 977, "btn_menu");
            a.mainRenderer.createButton(d, 0, 0, "btn_menu_selected", void 0, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                e.stopped = !0;
                E.clickAnimationFunc(b, "btn_menu");
                Ga(da.getChildByName("menu_container"), "menuContainer", 0);
                H.getChildByName("btn_menu").visible = !1;
                da.getChildByName("menu_container").getChildByName("btn_cross").visible = !0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                Y(b, "btn_menu")
            }, function (b) {
                X(b, "btn_menu")
            }).alpha = 0;
            d = a.mainRenderer.createButton(da.getChildByName("menu_container"), 49, 946, "btn_cross");
            a.mainRenderer.createButton(d, 0, 0, "btn_cross_selected", void 0, function (b,
                                                                                         e) {
                a.mainSoundManager.playSound("buttonClick");
                e.stopped = !0;
                E.clickAnimationFunc(b, "btn_cross");
                Ga(da.getChildByName("menu_container"), "menuContainer", -136);
                H.getChildByName("btn_menu").visible = !0;
                da.getChildByName("menu_container").getChildByName("btn_cross").visible = !1;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                Y(b, "btn_cross")
            }, function (b) {
                X(b, "btn_cross")
            }).alpha = 0;
            d = a.mainRenderer.createButton(da.getChildByName("menu_container"), 32, 830, "btn_home");
            a.mainRenderer.createButton(d,
                0, 0, "btn_home_mode_selected", void 0, function (b, e) {
                    a.mainSoundManager.playSound("buttonClick");
                    e.stopped = !0;
                    E.clickAnimationFunc(b, "btn_home");
                    a.mainFLGAccount.closeGame();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, void 0, function (b) {
                    Y(b, "btn_home")
                }, function (b) {
                    X(b, "btn_home")
                }).alpha = 0;
            APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && d && (d.visible = clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl);
            d = a.mainRenderer.createButton(da.getChildByName("menu_container"), 38, 527,
                "btn_rules");
            a.mainRenderer.createButton(d, 0, 0, "btn_rules_selected", void 0, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                e.stopped = !0;
                E.clickAnimationFunc(b, "btn_rules");
                n.rules.button.emit("mousedown");
                n.rules.button.emit("mouseup");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                Y(b, "btn_rules")
            }, function (b) {
                X(b, "btn_rules")
            }).alpha = 0;
            d = a.mainRenderer.createButton(H, 172, 962, "btn_info");
            a.mainRenderer.createButton(d, 0, 0, "btn_info_mode_selected", void 0, function (b,
                                                                                             e) {
                if (b.pressed) E.clickAnimationFunc(b, "btn_info"), n.info.lastTab.button.emit("mousedown"), b.pressed = !1; else {
                    for (var p in n) "info" !== p && n[p].button && n[p].button.pressed && (n[p].button.pressed = !1, n[p].button.texture = a.mainRenderer.resourceLoader.resources.tab.texture, n[p].button.getChildByName("texttab").style = {
                        font: "bold 34px Arial Narrow",
                        fill: "#292929"
                    }, n.info.lastTab = n[p], Ba(n[p], n.info, "flipContainer"));
                    b.alpha = .67;
                    b.pressed = !0
                }
                a.mainSoundManager.playSound("buttonClick");
                e && (e.stopped = !0);
                a.mainRenderer.renderManager.needUpdateRender =
                    !0
            }, void 0, void 0, function (b) {
                b.pressed || Y(b, "btn_info")
            }, function (b) {
                b.pressed || X(b, "btn_info")
            }).alpha = 0;
            d = a.mainRenderer.createButton(H, 292, 967, "btn_clear");
            a.mainRenderer.createButton(d, 0, 0, "btn_clear_mode_selected", void 0, function (b, e) {
                    a.mainSoundManager.playSound("clearBet");
                    a.mainGrid.removeCurrentBets();
                    a.mainFLGAccount.maxWin(0);
                    a.mainRenderer.renderManager.needUpdateRender = !0;
                    e.stopped = !0;
                    E.clickAnimationFunc(b, "btn_clear");
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, void 0,
                function (b) {
                    Y(b, "btn_clear")
                }, function (b) {
                    X(b, "btn_clear")
                }).alpha = 0;
            a.mainRenderer.createButton(H, 318, 1027, void 0, {
                text: mainLocalizationTable.undo,
                align: "center",
                style: {font: "20px Arial Narrow", fill: "#ffffff"}
            });
            d = a.mainRenderer.createButton(da.getChildByName("menu_container"), 46, 720, "btn_my_bets");
            a.mainRenderer.createButton(d, 0, 0, "btn_my_bets_mode_selected", void 0, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                FLGUtils && FLGUtils.showGamerHistory ? FLGUtils.showGamerHistory() : showCashFlowDlg();
                e.stopped = !0;
                E.clickAnimationFunc(b, "btn_my_bets");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                Y(b, "btn_my_bets")
            }, function (b) {
                X(b, "btn_my_bets")
            }).alpha = 0;
            d.visible = "DEMO" != clientInfoGlobal.hall;
            a.mainRenderer.createButton(da.getChildByName("menu_container"), 68, 790, void 0, {
                text: mainLocalizationTable.myBets,
                align: "center",
                style: {font: "20px Arial Narrow", fill: "#ffffff"}
            }).visible = "DEMO" != clientInfoGlobal.hall;
            d = a.mainRenderer.createButton(H, 1360, 957, "btn_rebet");
            a.mainRenderer.createButton(d,
                0, 0, "btn_rebet_mode_selected", void 0, function (b, e) {
                    a.mainSoundManager.playSound("buttonClick");
                    e.stopped = !0;
                    E.clickAnimationFunc(b, "btn_rebet");
                    a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet");
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, void 0, function (b) {
                    Y(b, "btn_rebet")
                }, function (b) {
                    X(b, "btn_rebet")
                }).alpha = 0;
            a.mainRenderer.createButton(H, 1386, 1027, void 0, {
                text: mainLocalizationTable.repeat,
                align: "center",
                style: {font: "20px Arial Narrow", fill: "#ffffff"}
            });
            d = a.mainRenderer.createButton(H,
                1480, 957, "btn_rebetx2");
            a.mainRenderer.createButton(d, 0, 0, "btn_rebetx2_mode_selected", void 0, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                e.stopped = !0;
                E.clickAnimationFunc(b, "btn_rebetx2");
                za = !0;
                a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                Y(b, "btn_rebetx2")
            }, function (b) {
                X(b, "btn_rebetx2")
            }).alpha = 0;
            a.mainRenderer.createButton(H, 1515, 1027, void 0, {
                text: mainLocalizationTable.repeatx2, align: "center",
                style: {font: "20px Arial Narrow", fill: "#ffffff"}
            });
            d = a.mainRenderer.createButton(H, 1780, 957, "btn_rules_new");
            a.mainRenderer.createButton(d, 0, 0, "btn_rules_mode_selected_new", void 0, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                e.stopped = !0;
                E.clickAnimationFunc(b, "btn_rules");
                n.rules.button.emit("mousedown");
                n.rules.button.emit("mouseup");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                Y(b, "btn_rules")
            }, function (b) {
                X(b, "btn_rules")
            }).alpha = 0;
            a.mainRenderer.createButton(H,
                1805, 1027, void 0, {
                    text: mainLocalizationTable.rules,
                    align: "center",
                    style: {font: "20px Arial Narrow", fill: "#ffffff"}
                });
            d = a.mainRenderer.createButton(da.getChildByName("menu_container"), 68, 653, "btn_eye");
            a.mainRenderer.createButton(d, 0, 0, "btn_eye_mode_selected", void 0, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                e.stopped = !0;
                E.clickAnimationFunc(b, "btn_eye");
                ea.needShow = !ea.needShow;
                G.events.emit("GRID_STATS");
                b.parent.texture = a.mainRenderer.resourceLoader.resources[ea.needShow ? "btn_eye" :
                    "btn_eye_closed"].texture;
                b.texture = a.mainRenderer.resourceLoader.resources[ea.needShow ? "btn_eye_mode_selected" : "btn_eye_closed_mode_selected"].texture;
                G.betBGContainer().getChildByName("eye_icon").children[0].texture = a.mainRenderer.resourceLoader.resources[ea.needShow ? "eye_icon" : "eye_closed_icon"].texture;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                Y(b, "btn_eye")
            }, function (b) {
                X(b, "btn_eye")
            }).alpha = 0;
            d.anchor.set(.5, .5);
            d.children[0].anchor.set(.5, .5);
            d = a.mainRenderer.createButton(H,
                418, 993, "bet_arrow");
            a.mainRenderer.createButton(d, 0, 0, "bet_arrow_selected", void 0, function (b, e) {
                a.mainSoundManager.playSound("chipSelector");
                ca.decrementBet();
                var p = H.getChildByName("betText").children[0];
                ca.isMaxBet() ? p.text = "MAX\n" + qa : p.text = ca.currentBet();
                localStorage.setItem(m[q].gameKind + m[q].gameType + "defaultBet", JSON.stringify(ca.currentBet()));
                a.mainUIManager.setTextScale(p);
                ma();
                a.mainUIManager.redrawCoefTable();
                e.stopped = !0;
                E.clickAnimationFunc(b, "bet_arrow");
                a.mainRenderer.renderManager.needUpdateRender =
                    !0
            }, void 0, void 0, function (b) {
                Y(b, "bet_arrow")
            }, function (b) {
                X(b, "bet_arrow")
            }).alpha = 0;
            d.anchor.set(.5, .5);
            d.children[0].anchor.set(.5, .5);
            a.mainRenderer.createButton(H, 496, 992, void 0, {
                text: ca.currentBet(),
                align: "center",
                style: {font: "40px Arial Black", fill: "#ffffff", align: "center"}
            }).name = "betText";
            a.mainUIManager.setTextScale(H.getChildByName("betText").children[0]);
            d = a.mainRenderer.createButton(H, 574, 991, "bet_arrow");
            a.mainRenderer.createButton(d, 0, 0, "bet_arrow_selected", void 0, function (b, e) {
                a.mainSoundManager.playSound("chipSelector");
                ca.incrementBet();
                var p = H.getChildByName("betText").children[0];
                ca.isMaxBet() ? p.text = "MAX\n" + qa : p.text = ca.currentBet();
                localStorage.setItem(m[q].gameKind + m[q].gameType + "defaultBet", JSON.stringify(ca.currentBet()));
                a.mainUIManager.setTextScale(p);
                ma();
                a.mainUIManager.redrawCoefTable();
                e.stopped = !0;
                E.clickAnimationFunc(b, "bet_arrow2");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                Y(b, "bet_arrow2")
            }, function (b) {
                X(b, "bet_arrow2")
            }).alpha = 0;
            d.anchor.set(.5, .5);
            d.children[0].anchor.set(.5,
                .5);
            d.rotation = Math.PI;
            a.mainRenderer.createButton(H, 496, 1027, void 0, {
                text: mainLocalizationTable.bet,
                align: "center",
                style: {font: "20px Arial Narrow", fill: "#ffffff"}
            });
            d = a.mainRenderer.createButton(H, 650, 945, "autoplay", void 0, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
                a.mainFLGAccount.autoplayManager.changeVisible();
                e.stopped = !0;
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
            d.hitArea = new PIXI.Rectangle(0, 0, 237, 100);
            a.mainRenderer.createButton(d, 129, 50, void 0, {
                text: mainLocalizationTable.autoPlay.toUpperCase(), align: "center", style: {
                    font: "bold 30px Arial Narrow",
                    fill: "#292929"
                }
            });
            d = a.mainRenderer.createButton(H, 960, 945, "random", void 0, function (b, e) {
                b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
                a.mainGrid.removeCurrentBets();
                a.mainGrid.createRandomBets();
                ma();
                (b = H.getChildByName("plus")) && b.interactive && (b.emit("mousedown"), b.emit("mouseup"));
                e.stopped = !0;
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
            d.hitArea = new PIXI.Rectangle(73, 0, 237, 100);
            a.mainRenderer.createButton(d, 180, 50, void 0, {
                text: mainLocalizationTable.random.toUpperCase(),
                align: "center",
                style: {font: "bold 30px Arial Narrow", fill: "#292929"}
            });
            d = a.mainRenderer.createButton(H,
                886, 898, "plus", {
                    text: m[q].ballCount,
                    align: "center",
                    style: {font: "bold 95px Arial", fill: "#d1d2d4", align: "center"}
                }, function (b, e) {
                    a.mainSoundManager.playSound("buttonClick");
                    if (0 < a.mainGrid.pressedZones.length) {
                        b.interactive = !1;
                        b.parent.getChildByName("random").emit("mouseout");
                        b.parent.getChildByName("random").interactive = !1;
                        var p = a.mainGrid.getIntArrayOfPressedZones();
                        G.getActedOutEdition().betsHistory.addBet({
                                summ: ca.currentBet(),
                                bet: p,
                                coef: a.mainGameManager.coefMode,
                                winBets: [],
                                countWin: 0,
                                win: void 0
                            },
                            G.getActedOutEdition().round, function (h) {
                                if (h) {
                                    a.mainFLGAccount.maxWin(0);
                                    for (var D in p) switch (h = a.mainGrid.zones[p[D] - 1], h.emit("mousedown"), h.emit("mouseup"), h.currentLayer = !1, h.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, h.isLock ? h.isLock++ : h.isLock = 1, h.isLock) {
                                        case 1:
                                            h.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                            break;
                                        default:
                                            h.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                                    }
                                    h = null;
                                    P(p, !1, function () {
                                        G.events.emit("GRID_STATS");
                                        H.getChildByName("random").interactive =
                                            !0;
                                        H.getChildByName("plus").texture = a.mainRenderer.resourceLoader.resources.plus.texture
                                    })
                                }
                                a.mainRenderer.renderManager.needUpdateRender = !0
                            })
                    }
                    e && (e.stopped = !0);
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, function (b) {
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, function (b) {
                    b.children[0].style = "+" != b.children[0].text ? {
                        font: "bold 95px Arial",
                        fill: "#d1d2d4",
                        align: "center"
                    } : {font: "150px Arial", fill: "#ffffff", align: "center"};
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, function (b) {
                    b.children[0].style =
                        "+" != b.children[0].text ? {
                            font: "bold 95px Arial",
                            fill: "#d1d2d4",
                            align: "center"
                        } : {font: "150px Arial", fill: "#d1d2d4", align: "center"};
                    a.mainRenderer.renderManager.needUpdateRender = !0
                });
            d.interactive = !1;
            sa = new R(m[q].resBallX, 40, 139, void 0, !0);
            f = new URLSearchParams(location.search);
            1 !== Number(f.get("show_gamelink") || localStorage.getItem("show_gamelink")) ? (f = m[q].gameType.toLowerCase(), d = a.mainRenderer.createButton(void 0, 1785, 105, `game_${f}_icon_selected`), a.mainRenderer.createButton(d, 0, 0).alpha = 0, d.anchor.set(.5,
                .5), d.children[0].anchor.set(.5, .5)) : (d = a.mainRenderer.createButton(void 0, 1785, 105, "game_blue_icon"), a.mainRenderer.createButton(d, 0, 0, "game_blue_icon_selected", void 0, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                e.stopped = !0;
                F("blue")
            }, void 0, void 0, function (b) {
                Y(b, "game_blue_icon")
            }, function (b) {
                X(b, "game_blue_icon")
            }).alpha = 0, d.anchor.set(.5, .5), d.children[0].anchor.set(.5, .5), d = a.mainRenderer.createButton(void 0, 1583, 105, "game_red_icon"), a.mainRenderer.createButton(d, 0, 0, "game_red_icon_selected",
                void 0, function (b, e) {
                    a.mainSoundManager.playSound("buttonClick");
                    e.stopped = !0;
                    F("red")
                }, void 0, void 0, function (b) {
                    Y(b, "game_red_icon")
                }, function (b) {
                    X(b, "game_red_icon")
                }).alpha = 0, d.anchor.set(.5, .5), d.children[0].anchor.set(.5, .5), d = a.mainRenderer.createButton(void 0, 1379, 105, "game_green_icon"), a.mainRenderer.createButton(d, 0, 0, "game_green_icon_selected", void 0, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                e.stopped = !0;
                F("green")
            }, void 0, void 0, function (b) {
                Y(b, "game_green_icon")
            }, function (b) {
                X(b,
                    "game_green_icon")
            }).alpha = 0, d.anchor.set(.5, .5), d.children[0].anchor.set(.5, .5), a.mainRenderer.stage.getChildByName("game_" + m[q].gameType.toLowerCase() + "_icon").texture = a.mainRenderer.resourceLoader.resources["game_" + m[q].gameType.toLowerCase() + "_icon_selected"].texture, a.mainRenderer.stage.getChildByName("game_" + m[q].gameType.toLowerCase() + "_icon").getChildByName("game_" + m[q].gameType.toLowerCase() + "_icon_selected").visible = !1);
            for (var w in n) {
                switch (w) {
                    case "game":
                    case "video":
                        d = a.mainRenderer.createButton(ra,
                            599, 536);
                        break;
                    case "history":
                        d = a.mainRenderer.createButton(ra, 599, 551, "tab_bg");
                        break;
                    case "stats":
                        d = a.mainRenderer.createButton(ra, 599, 551, "tab_bg");
                        break;
                    case "rules":
                        d = a.mainRenderer.createButton(ra, 599, 551, "tab_bg");
                        break;
                    case "info":
                        d = a.mainRenderer.createButton(ra, 599, 551)
                }
                d.name = w;
                d.anchor.set(.5, .5);
                d.scale.y = 0;
                n[w].container = d;
                if ("info" === w) n[w].button = H.getChildByName("btn_info").children[0]; else if ("stats" !== w && (function (b) {
                    d = a.mainRenderer.createButton(ra, n[w].posX, n[w].posY, "tab", {
                        text: n[w].text,
                        align: "center", style: {font: "bold 34px Arial Narrow", fill: "#212121"}
                    }, function (e, p) {
                        if (!e.pressed) if ("history" === b && GamerHistory) {
                            e = document.getElementById("histWrap");
                            p = localLanguage();
                            switch (p) {
                                case "es":
                                    p = "spa";
                                    break;
                                case "en":
                                    p = "eng";
                                    break;
                                case "kz":
                                    p = "kaz";
                                    break;
                                case "ru":
                                    p = "rus";
                                    break;
                                case "fr":
                                    p = "fra"
                            }
                            GamerHistory.setConfig({lg: clientInfoGlobal.lgn, lang: p});
                            e.parentNode.classList.add("seen")
                        } else {
                            e.texture = a.mainRenderer.resourceLoader.resources.tab_pressed.texture;
                            e.getChildByName("texttab").style =
                                {font: "bold 34px Arial Narrow", fill: "#ffffff"};
                            a.mainSoundManager.playSound("buttonClick");
                            for (var h in n) "info" !== h && n[h].button && n[h].button.pressed ? (n[h].button.pressed = !1, n[h].button.texture = a.mainRenderer.resourceLoader.resources.tab.texture, n[h].button.getChildByName("texttab").style = {
                                font: "bold 34px Arial Narrow",
                                fill: "#212121"
                            }, Ba(n[h], n[e.name], "flipContainer")) : "info" === h && n[h].button.pressed && (n[h].button.pressed = !1, E.clickAnimationFunc(n[h].button, "btn_info"), Ba(n[h], n[e.name], "flipContainer"));
                            e.pressed = !0;
                            p && (p.stopped = !0);
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        }
                    }, void 0, void 0, function (e) {
                        e.pressed || (e.texture = a.mainRenderer.resourceLoader.resources.tab_selected.texture, a.mainRenderer.renderManager.needUpdateRender = !0)
                    }, function (e) {
                        e.pressed || (e.texture = a.mainRenderer.resourceLoader.resources.tab.texture, a.mainRenderer.renderManager.needUpdateRender = !0)
                    })
                }(w), d.rotation = -Math.PI / 2, d.name = w, n[w].button = d, n[w].pressedDefault && (n[w].button.pressed = !0, n[w].button.texture = a.mainRenderer.resourceLoader.resources.tab_pressed.texture,
                    n[w].button.getChildByName("texttab").style = {
                        font: "bold 34px Arial Narrow",
                        fill: "#ffffff"
                    }, n[w].container.scale.y = 1, n[w].onStartOpen))) n[w].onStartOpen()
            }
            d = a.mainRenderer.createButton(n.info.container, -209, 326, "coef_btns");
            d.anchor.set(.5, .5);
            d = a.mainRenderer.createButton(n.game.container, -210, 336, "coef_btns");
            d.anchor.set(.5, .5);
            let J = 10 < mainLocalizationTable.lottoLowRisk.length ? 20 : 24;
            d = a.mainRenderer.createButton(n.game.container.getChildByName("coef_btns"), -312, -34, "coef_btn", {
                text: `#1 ${mainLocalizationTable.lottoLowRisk}`,
                align: "center", style: {font: "bold " + J + "px Arial", fill: "#b1b1b1"}
            });
            d.name = "coef_btn_1";
            a.mainRenderer.createButton(d, 0, 0, "coef_btn_selected", {
                text: `#1 ${mainLocalizationTable.lottoLowRisk}`,
                align: "center",
                style: {font: "bold " + J + "px Arial", fill: "#444"}
            }, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                e.stopped = !0;
                x(a.mainGameManager.coefMode, 1);
                a.mainGameManager.coefMode = 1;
                a.mainUIManager.redrawCoefTable();
                ma();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                Y(b,
                    "coef_btn_selected_1")
            }, function (b) {
                X(b, "coef_btn_selected_1")
            }).alpha = 0;
            d = a.mainRenderer.createButton(n.game.container.getChildByName("coef_btns"), -101, -34, "coef_btn", {
                text: `#2 ${mainLocalizationTable.lottoNormRisk}`,
                align: "center",
                style: {font: "bold " + J + "px Arial", fill: "#b1b1b1"}
            });
            d.name = "coef_btn_2";
            a.mainRenderer.createButton(d, 0, 0, "coef_btn_selected", {
                text: `#2 ${mainLocalizationTable.lottoNormRisk}`,
                align: "center",
                style: {font: "bold " + J + "px Arial", fill: "#444"}
            }, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                e.stopped = !0;
                x(a.mainGameManager.coefMode, 2);
                a.mainGameManager.coefMode = 2;
                a.mainUIManager.redrawCoefTable();
                ma();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                Y(b, "coef_btn_selected_2")
            }, function (b) {
                X(b, "coef_btn_selected_2")
            }).alpha = 0;
            d = a.mainRenderer.createButton(n.game.container.getChildByName("coef_btns"), 111, -34, "coef_btn", {
                text: `#3 ${mainLocalizationTable.lottoHighRisk}`,
                align: "center",
                style: {font: "bold " + J + "px Arial", fill: "#b1b1b1"}
            });
            d.name = "coef_btn_3";
            a.mainRenderer.createButton(d,
                0, 0, "coef_btn_selected", {
                    text: `#3 ${mainLocalizationTable.lottoHighRisk}`,
                    align: "center",
                    style: {font: "bold " + J + "px Arial", fill: "#444"}
                }, function (b, e) {
                    a.mainSoundManager.playSound("buttonClick");
                    e.stopped = !0;
                    x(a.mainGameManager.coefMode, 3);
                    a.mainGameManager.coefMode = 3;
                    a.mainUIManager.redrawCoefTable();
                    ma();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, void 0, function (b) {
                    Y(b, "coef_btn_selected_3")
                }, function (b) {
                    X(b, "coef_btn_selected_3")
                }).alpha = 0;
            n.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" +
                a.mainGameManager.coefMode).children[1].alpha = 1;
            n.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].interactive = !1;
            n.game.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].children[0].style = {
                font: "bold " + J + "px Arial",
                fill: "#000"
            };
            d = a.mainRenderer.createButton(n.info.container.getChildByName("coef_btns"), -312, -34, "coef_btn", {
                text: `#1 ${mainLocalizationTable.lottoLowRisk}`, align: "center",
                style: {font: "bold " + J + "px Arial", fill: "#b1b1b1"}
            });
            d.name = "coef_btn_1";
            a.mainRenderer.createButton(d, 0, 0, "coef_btn_selected", {
                    text: `#1 ${mainLocalizationTable.lottoLowRisk}`,
                    align: "center",
                    style: {font: "bold " + J + "px Arial", fill: "#444"}
                }, function (b, e) {
                    a.mainSoundManager.playSound("buttonClick");
                    e.stopped = !0;
                    x(a.mainGameManager.coefMode, 1);
                    a.mainGameManager.coefMode = 1;
                    a.mainUIManager.redrawCoefTable();
                    ma();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, void 0, function (b) {
                    Y(b, "coef_btn_selected_1")
                },
                function (b) {
                    X(b, "coef_btn_selected_1")
                }).alpha = 0;
            d = a.mainRenderer.createButton(n.info.container.getChildByName("coef_btns"), -101, -34, "coef_btn", {
                text: `#2 ${mainLocalizationTable.lottoNormRisk}`,
                align: "center",
                style: {font: "bold " + J + "px Arial", fill: "#b1b1b1"}
            });
            d.name = "coef_btn_2";
            a.mainRenderer.createButton(d, 0, 0, "coef_btn_selected", {
                text: `#2 ${mainLocalizationTable.lottoNormRisk}`,
                align: "center",
                style: {font: "bold " + J + "px Arial", fill: "#444"}
            }, function (b, e) {
                a.mainSoundManager.playSound("buttonClick");
                e.stopped = !0;
                x(a.mainGameManager.coefMode, 2);
                a.mainGameManager.coefMode = 2;
                a.mainUIManager.redrawCoefTable();
                ma();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                Y(b, "coef_btn_selected_2")
            }, function (b) {
                X(b, "coef_btn_selected_2")
            }).alpha = 0;
            d = a.mainRenderer.createButton(n.info.container.getChildByName("coef_btns"), 111, -34, "coef_btn", {
                text: `#3 ${mainLocalizationTable.lottoHighRisk}`,
                align: "center",
                style: {font: "bold " + J + "px Arial", fill: "#b1b1b1"}
            });
            d.name = "coef_btn_3";
            a.mainRenderer.createButton(d,
                0, 0, "coef_btn_selected", {
                    text: `#3 ${mainLocalizationTable.lottoHighRisk}`,
                    align: "center",
                    style: {font: "bold " + J + "px Arial", fill: "#444"}
                }, function (b, e) {
                    a.mainSoundManager.playSound("buttonClick");
                    e.stopped = !0;
                    x(a.mainGameManager.coefMode, 3);
                    a.mainGameManager.coefMode = 3;
                    a.mainUIManager.redrawCoefTable();
                    ma();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, void 0, function (b) {
                    Y(b, "coef_btn_selected_3")
                }, function (b) {
                    X(b, "coef_btn_selected_3")
                }).alpha = 0;
            n.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" +
                a.mainGameManager.coefMode).children[1].alpha = 1;
            n.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].interactive = !1;
            n.info.container.getChildByName("coef_btns").getChildByName("coef_btn_" + a.mainGameManager.coefMode).children[1].children[0].style = {
                font: "bold " + J + "px Arial",
                fill: "#000"
            };
            d = a.mainRenderer.createButton(n.info.container, -1, -44, "coef_bg");
            d.anchor.set(.5, .5);
            a.mainRenderer.createButton(n.info.container.getChildByName("coef_bg"),
                -301.5, -264, void 0, {
                    text: mainLocalizationTable.guessedBalls.toUpperCase(),
                    align: "center",
                    style: {font: "bold 30px Arial", fill: "#ffaa06", align: "center"}
                });
            a.mainRenderer.createButton(n.info.container.getChildByName("coef_bg"), 50, -264, void 0, {
                text: mainLocalizationTable.coefficient.toUpperCase(),
                align: "center",
                style: {font: "bold 30px Arial", fill: "#ffaa06", align: "center"}
            });
            a.mainRenderer.createButton(n.info.container.getChildByName("coef_bg"), 351.5, -264, void 0, {
                text: mainLocalizationTable.win.toUpperCase(),
                align: "center", style: {font: "bold 30px Arial", fill: "#ffaa06", align: "center"}
            });
            var r = function (b) {
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
                }["ru en es pt kz fr ku".split(" ").includes(mainLocalizator.currentLang()) ? mainLocalizator.currentLang() : "en"][b]
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
                var e = {font: "bold 24px Arial", fill: "#ffffff"}, p = {font: "bold 24px Arial", fill: "#fca903"},
                    h = {font: "bold 76px Arial", fill: "#c20317"};
                a.mainRenderer.createButton(b, -500, -280, void 0, {text: r("intro"), align: "left", style: e});
                a.mainRenderer.createButton(b,
                    -500, -190, void 0, {text: "1.", align: "left", style: p});
                a.mainRenderer.createButton(b, -465, -190, void 0, {text: r("rule1"), align: "left", style: e});
                d = a.mainRenderer.createButton(b, 0, 50, "rules_1");
                d.scale.set(.5, .5);
                d.anchor.set(.5, .5);
                a.mainRenderer.createButton(d, 465, "blue" == q ? 115 : 160, void 0, {text: "1", style: h});
                a.mainRenderer.createButton(d, 465, 290, void 0, {text: "2", style: h});
                a.mainRenderer.createButton(b, -500, 284, void 0, {text: "2.", align: "left", style: p});
                a.mainRenderer.createButton(b, -465, 299, void 0, {
                    text: r("rule2"),
                    align: "left", style: e
                });
                d = a.mainRenderer.createButton(b, 0, 569, "rules_2");
                d.scale.set(.6, .6);
                d.anchor.set(.5, .5);
                a.mainRenderer.createButton(b, -465, 813, void 0, {text: r("rule3"), align: "left", style: e});
                d = a.mainRenderer.createButton(b, 0, 1063, "rules_3");
                d.scale.set(.6, .6);
                d.anchor.set(.5, .5);
                a.mainRenderer.createButton(b, -465, 1327, void 0, {text: r("rule4"), align: "left", style: e});
                d = a.mainRenderer.createButton(b, 0, 1577, "rules_4");
                d.scale.set(.6, .6);
                d.anchor.set(.5, .5);
                a.mainRenderer.createButton(b, -500, 1826,
                    void 0, {text: "3.", align: "left", style: p});
                a.mainRenderer.createButton(b, -465, 1841, void 0, {text: r("rule5"), align: "left", style: e});
                d = a.mainRenderer.createButton(b, 0, 1957, "rules_5");
                d.scale.set(.6, .6);
                d.anchor.set(.5, .5);
                a.mainRenderer.createButton(b, -500, 2081, void 0, {text: "4.", align: "left", style: p});
                a.mainRenderer.createButton(b, -465, 2081, void 0, {text: r("rule6"), align: "left", style: e});
                d = a.mainRenderer.createButton(b, 0, 2277, "rules_6");
                d.anchor.set(.5, .5);
                d = a.mainRenderer.createButton(b, 0, 2427, "rules_7");
                d.anchor.set(.5, .5);
                b.emit("updateHeight")
            })(n.rules.container);
            d = null;
            a.mainRenderer.stage.addChild(H);
            a.mainRenderer.stage.addChild(ra);
            a.mainRenderer.stage.addChild(da);
            n.game.container.addChild(ia);
            a.mainRenderer.createButton(ia, 0, 0, "grid_bg").anchor.set(.5, .5);
            for (var u in I) n.game.container.addChild(I[u]), a.mainRenderer.createButton(I[u], 0, 0, "grid_bg_copy").anchor.set(.5, .5), I[u].position.x -= 1200, I[u].isUsed = !1, I[u].isLast = !1;
            I[I.length - 1].isLast = !0;
            a.setMainGrid(new LottoGrid(-599 + m[q].gridPos.x,
                -551 + m[q].gridPos.y, 10, m[q].zonesCount, m[q].ballCount, ia, a.mainRenderer));
            a.mainGrid.createZones(100, 100, {x: 6, y: 6}, {
                font: "50px Swiss721-CondensedBold",
                fill: m[q].gridNumColor,
                align: "center"
            }, function (b, e, p) {
                if (b.selected || !(a.mainGrid.pressedZones.length >= a.mainGrid.maxPreessedZones)) {
                    e ? b.selected || (b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture) : a.mainGrid.gridContainer.down = !0;
                    if (e && a.mainGrid.gridContainer.down || !e && !p || p && (b.name != wa || void 0 == wa)) b.selected ? (b.texture =
                        a.mainRenderer.resourceLoader.resources.zone_transp.texture, b.selected = !1, b.currentLayer = !1, a.mainGrid.pressedZones.splice(a.mainGrid.pressedZones.indexOf(b), 1)) : (b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, b.selected = !0, b.currentLayer = !0, a.mainSoundManager.playSound("firstChip"), a.mainGrid.pressedZones.push(b)), e = m[q].ballCount - a.mainGrid.pressedZones.length, H.getChildByName("plus").children[0].text = e, H.getChildByName("plus").children[0].style = {
                        font: "bold 95px Arial", fill: "#d1d2d4",
                        align: "center"
                    }, 0 == e ? (H.getChildByName("plus").interactive = !0, H.getChildByName("plus").children[0].text = "+", H.getChildByName("plus").children[0].style = {
                        font: "150px Arial",
                        fill: "#d1d2d4",
                        align: "center"
                    }) : H.getChildByName("plus").interactive = !1;
                    p && (wa = b.name);
                    a.mainGrid.gridContainer.down && ma();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }, function (b, e) {
                if (e) {
                    if (!b.selected && !a.mainGrid.gridContainer.down) if (b.isLock && b.currentLayer) switch (b.isLock) {
                        case 1:
                            b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                            break;
                        default:
                            b.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                    } else b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture
                } else a.mainGrid.gridContainer.down = !1, wa = void 0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, !0);
            a.mainGrid.setRandomBetsCount(m[q].ballCount);
            a.mainRenderer.stage.on("changeLang", Ca);
            a.mainGameManager.gameStateAsync(function (b) {
                a.mainGameManager.coefficients = b.coeftable;
                G.loadFromStorage();
                a.mainUIManager.drawCoefTable();
                var e = 0 >= b.t2 ?
                    b.tir - 1 : b.tir;
                G.editions.length && G.editions[G.editions.length - 1].round === e || G.addEdition(e);
                if (G.editions.length && G.editions[G.editions.length - 1].round === e) {
                    e = G.editions[G.editions.length - 1].betsHistory.bets;
                    for (var p = 0, h = 0; h < e.length; h++) p += e[h].summ;
                    a.mainFLGAccount.totalBet(p, !0);
                    ua = !0
                }
                G.drawEditions();
                xa = new Oa({hot: b.hot, cold: b.cold}, n.stats, function (D, z) {
                    var y = 0, B = 9;
                    if (0 === z.children.length) {
                        var C = a.mainRenderer.createButton(z, -1, -310, void 0, {
                            text: mainLocalizationTable.hotcoldRating.replace(/%s/g,
                                100).toUpperCase(),
                            align: "center",
                            style: {font: "bold 34px Arial", fill: "#ffffff", align: "center"}
                        });
                        C.anchor.set(.5, .5);
                        z = a.mainRenderer.createButton(z, -531, -284, "hotcold_bg");
                        var Q = new PIXI.Container;
                        z.addChild(Q);
                        var ba = new PIXI.Container;
                        z.addChild(ba);
                        for (var fa in D.cold) {
                            if (5 < y) break;
                            C = new PIXI.Graphics;
                            C.position.set(93 + 163 * y, 188);
                            Q.addChild(C);
                            C = new PIXI.Graphics;
                            C.position.set(93 + 163 * y, 499);
                            ba.addChild(C);
                            C = a.mainRenderer.createButton(z, 169 + 163 * y, 156, void 0, {
                                text: D.hot[y][1] + "%", align: "center",
                                style: {font: "bold 50px Arial", fill: "#fe801b", align: "center"}
                            });
                            C.anchor.set(.5, .5);
                            C = a.mainRenderer.createButton(z, 169 + 163 * y, 246, void 0, {
                                text: D.hot[y][0],
                                align: "center",
                                style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                            });
                            C.anchor.set(.5, .5);
                            C = a.mainRenderer.createButton(z, 169 + 163 * y, 472, void 0, {
                                text: D.cold[B][1] + "%",
                                align: "center",
                                style: {font: "bold 50px Arial", fill: "#9bccff", align: "center"}
                            });
                            C.anchor.set(.5, .5);
                            C = a.mainRenderer.createButton(z, 169 + 163 * y, 558, void 0, {
                                text: D.cold[B][0], align: "center",
                                style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                            });
                            C.anchor.set(.5, .5);
                            y++;
                            B--
                        }
                    } else for (fa in z = z.children[1], Q = z.children[0], ba = z.children[1], D.cold) {
                        if (5 < y) break;
                        a.mainUIManager.animations()["anim_graph_hot" + y] && a.mainUIManager.animations()["anim_graph_hot" + y].stop();
                        a.mainUIManager.animations()["anim_graph_cold" + y] && a.mainUIManager.animations()["anim_graph_cold" + y].stop();
                        Q.children[y].clear();
                        ba.children[y].clear();
                        z.children[4 * y + 2].children[0].text = "0%";
                        z.children[4 * y + 3].children[0].text =
                            D.hot[y][0];
                        z.children[4 * y + 4].children[0].text = "0%";
                        z.children[4 * y + 5].children[0].text = D.cold[B][0];
                        y++;
                        B--
                    }
                }, function (D, z) {
                    if (0 !== z.children.length) {
                        var y = z.children[1].children[0], B = z.children[1].children[1], C = 0, Q = 9, ba;
                        for (ba in D.cold) {
                            if (5 < C) break;
                            a.mainRenderer.renderManager.animationTweenInc();
                            a.mainUIManager.animations()["anim_graph_hot" + C] = (new TWEEN.Tween({
                                percentage: 0,
                                data: {
                                    rect: y.children[C],
                                    iteration: C,
                                    percentText: z.children[1].children[4 * C + 2]
                                }
                            })).to({percentage: D.hot[C][1]}, 990).easing(TWEEN.Easing.Back.Out).onStop(function () {
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
                            a.mainUIManager.animations()["anim_graph_cold" + C] = (new TWEEN.Tween({
                                percentage: 0,
                                data: {
                                    rect: B.children[C],
                                    iteration: C,
                                    percentText: z.children[1].children[4 * C + 4]
                                }
                            })).to({percentage: D.cold[Q][1]}, 990).easing(TWEEN.Easing.Back.Out).onStop(function () {
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
                            C++;
                            Q--
                        }
                    }
                });
                xa.draw();
                G.events.emit("GRID_STATS", {hot: b.hot, cold: b.cold});
                pa.drawCustomJackpot(function (D, z) {
                    if (z) {
                        var y = a.mainRenderer.stage.getChildByName("JackpotContainer"), B = utils.formatNumber(z);
                        if (y) {
                            var C = y.children[1];
                            z = y.children[2];
                            var Q = y.children[3];
                            Q.children[0].text = B
                        } else y = a.mainRenderer.createButton(void 0, 1296, 209), y.name = "JackpotContainer", a.mainRenderer.createButton(y, 0, 45, "jp_name").anchor.y = .5, C = a.mainRenderer.createButton(y, 3, 3), z = a.mainRenderer.createButton(y, 0, 75), C.visible = !1, Q = a.mainRenderer.createButton(y, 280, 45, void 0, {
                            text: B,
                            style: {font: "bold 54px Arial", fill: "#d6d6d6", align: "left"}
                        });
                        y = 0;
                        Q = C.position.x + Q.children[0].width;
                        C = .8 * Q / 10;
                        B = .2 * Q / 9;
                        for (var ba = 0; 10 > ba; ba++) {
                            Q =
                                z.children[ba];
                            switch (ba) {
                                case 0:
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                    var fa = 65280;
                                    break;
                                case 7:
                                case 8:
                                    fa = 15973429;
                                    break;
                                case 9:
                                    fa = 15352834
                            }
                            Q ? (Q.clear(), Q.beginFill(fa), Q.drawRect(y, 0, C, 4), Q.endFill) : (Q = new PIXI.Graphics, Q.beginFill(fa), Q.drawRect(y, 0, C, 4), Q.endFill, z.addChild(Q));
                            y += C + B;
                            Q.visible = ba <= parseInt(D)
                        }
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }
                });
                pa.updateJackpotData(b);
                a.mainFLGAccount.autoplayManager.updateCallback = function (D) {
                    if (!(2 > G.editions.length)) {
                        switch (D) {
                            case "repeatLastBet":
                                var z =
                                    D = -1;
                                var y = G.editions.length - 2;
                                break;
                            case "getOnlyBets":
                                z = D = void 0;
                                y = G.editions.length - 1;
                                break;
                            default:
                                D = G.editions[G.editions.length - 2].betsHistory.setTotalWin(), z = a.mainFLGAccount.balance(), y = G.editions.length - 2
                        }
                        a.mainFLGAccount.autoplayManager.update(G.editions[y].betsHistory.bets, D, z, function (B) {
                            if (a.mainGameManager) {
                                if (za) {
                                    for (var C = 0; C < B.length; C++) B[C].summ *= 2;
                                    za = !1
                                }
                                0 < B.length && (H.getChildByName("plus").interactive = !1, H.getChildByName("random").emit("mouseout"), H.getChildByName("random").interactive =
                                    !1, G.getActedOutEdition().betsHistory.addBet(B, G.getActedOutEdition().round, function (Q) {
                                    function ba(la) {
                                        P(Q[la].bet, !1, function () {
                                            la++;
                                            la <= fa && ba(la)
                                        })
                                    }

                                    G.events.emit("GRID_STATS");
                                    H.getChildByName("random").interactive = !0;
                                    H.getChildByName("plus").interactive = !0;
                                    var fa = 4 > Q.length ? Q.length - 1 : 3;
                                    ba(0)
                                }))
                            }
                        }, G.editions[y].round)
                    }
                };
                Aa(b);
                l && l()
            })
        }, function () {
            a.mainSoundManager.playRandomBackSound()
        });
        var Ca = function () {
            a.mainFLGAccount.updateAccountText();
            G.redrawEditionHeader();
            G.drawBetsHeader();
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        };
        this.onLanguageChange = Ca;
        this.setInteraction = function (f) {
            H.getChildByName("btn_clear").children[0].interactive = f;
            a.mainGrid.setZoneInteraction(f);
            f || H.getChildByName("random").emit("mouseout");
            H.getChildByName("random").interactive = f;
            H.getChildByName("plus").children[0].style = {
                font: "bold 95px Arial",
                fill: f ? "#d1d2d4" : "#595959",
                align: "center"
            };
            N.children[3].children[0].visible = f;
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        this.drawCoefTable = function () {
            var f = 0;
            5 == m[q].ballCount ? f = 72 : 6 == m[q].ballCount &&
                (f = 36);
            for (var c = 0; c < m[q].ballCount; c++) {
                var l = a.mainRenderer.createButton(n.info.container.getChildByName("coef_bg"), -301.5, -267 + f + 72 * (c + 1), "coef_line_left");
                l.anchor.set(.5, .5);
                for (var F = 1; F <= m[q].ballCount; F++) a.mainRenderer.createButton(n.info.container.getChildByName("coef_bg"), -480 + 60 * (F - 1), -267 + f + 72 * (c + 1), void 0, {
                    text: F,
                    align: "center",
                    style: {font: "bold 40px Arial", fill: "#292929", align: "center"}
                });
                l = a.mainRenderer.createButton(n.info.container.getChildByName("coef_bg"), 50, -267 + f + 72 * (c + 1), "coef_line_middle");
                l.anchor.set(.5, .5);
                var P = a.mainGameManager.coefficients[a.mainGameManager.coefMode - 1][m[q].ballCount - c] / 100;
                var x = new PIXI.Container;
                x.name = "infoBallsContainer" + c;
                n.info.container.getChildByName("coef_bg").addChild(x);
                for (F = 1; F <= m[q].ballCount - c; F++) l = a.mainRenderer.createButton(x, -480 + 60 * (F - 1), -267 + f + 72 * (c + 1), "ball"), l.anchor.set(.5, .5), l.scale.set(.75, .75);
                n.info.container.getChildByName("coef_bg").getChildByName("infoBallsContainer" + c).visible = P ? !0 : !1;
                l = a.mainRenderer.createButton(n.info.container.getChildByName("coef_bg"),
                    -58, -267 + f + 72 * (c + 1), void 0, {
                        text: P ? "X  " + formatFLGNums(P, !1) : "-",
                        align: "left",
                        style: {font: "bold 40px Arial", fill: "#ffffff", align: "left"}
                    });
                l.name = "tbl_coef" + c;
                l = a.mainRenderer.createButton(n.info.container.getChildByName("coef_bg"), 351.5, -267 + f + 72 * (c + 1), "coef_line_right");
                l.anchor.set(.5, .5);
                l = a.mainRenderer.createButton(n.info.container.getChildByName("coef_bg"), 203, -267 + f + 72 * (c + 1), void 0, {
                    text: P ? formatFLGNums(P * ca.currentBet(), !1) : "-",
                    align: "left",
                    style: {font: "bold 40px Arial", fill: "#ffffff", align: "left"}
                });
                l.name = "tbl_win" + c
            }
        };
        this.redrawCoefTable = function () {
            for (var f, c = 0; c < m[q].ballCount; c++) f = a.mainGameManager.coefficients[a.mainGameManager.coefMode - 1][m[q].ballCount - c] / 100, n.info.container.getChildByName("coef_bg").getChildByName("tbl_coef" + c).children[0].text = f ? "X  " + formatFLGNums(f, !1) : "-", n.info.container.getChildByName("coef_bg").getChildByName("tbl_win" + c).children[0].text = f ? formatFLGNums(f * ca.currentBet(), !1) : "-", n.info.container.getChildByName("coef_bg").getChildByName("infoBallsContainer" +
                c).visible = f ? !0 : !1
        };
        this.setTextScale = function (f) {
            f.text == "MAX\n" + qa ? f.scale.set(.6, .6) : f.scale.set(1, 1)
        };
        var ma = function () {
            var f = 0;
            0 == m[q].ballCount - a.mainGrid.pressedZones.length && 0 < a.mainGrid.pressedZones.length && 0 < ca.currentBet() && (f = ca.currentBet() * a.mainGameManager.coefficients[a.mainGameManager.coefMode - 1][a.mainGrid.pressedZones.length] / 100);
            a.mainFLGAccount.maxWin(f)
        }, Ja = 0, Ma = 0, Aa = function (f) {
            function c(x) {
                a.mainGameManager && (N.children[3].mask.clear(), N.children[3].mask.beginFill(), N.children[3].mask.drawRect(3,
                    0, 1914 * x, 28), N.children[3].mask.endFill, N.children[3].children[1].children[0].text = va.getTimerText(), N.children[1].children[0].text = va.getTimerText(), a.mainRenderer.renderManager.needUpdateRender = !0)
            }

            function l(x) {
                if (a.mainGameManager) {
                    N.children[3].clear();
                    N.children[3].beginFill(42577);
                    N.children[3].drawRect(3, 3, 1914, 22);
                    N.children[3].endFill;
                    if (ua) ua = !1; else {
                        a.mainFLGAccount.setWinTextVisible(!0);
                        a.mainGrid.removeSelectedBets();
                        for (var d in I) I[d].position.x = -1200, I[d].position.y = 0, I[d].scale.set(1,
                            1), I[d].isUsed = !1, I[d].isLast = !1;
                        I[I.length - 1].isLast = !0;
                        n.game.container.removeChild(ia);
                        n.game.container.addChildAt(ia, 0);
                        a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_transp.texture, {
                            font: "50px Swiss721-CondensedBold",
                            fill: m[q].gridNumColor,
                            align: "center"
                        }, void 0, a.mainGrid.getIntArrayOfZones())
                    }
                    xa.update({hot: x.hot, cold: x.cold});
                    a.mainUIManager.setInteraction(!0);
                    G.addEdition(x.tir);
                    a.mainFLGAccount.autoplayManager.updateCallback();
                    var w = [];
                    for (d = 1; d <= m[q].ballCount; d++) w.push(x["b" +
                    d]);
                    sa.startDrawBalls(w, 1.55, 0);
                    N.children[3].children[2].children[0].text = "LOTTO    # " + (x.tir - 1);
                    N.children[2].children[0].text = "LOTTO    # " + (x.tir - 1);
                    1 < G.editions.length && G.drawDetailEditionHistory(n.history.container, G.editions.length - 2);
                    va.start({
                        minutes: 0,
                        seconds: (x.time_round ? x.time_round : m[q].tirTime) - m[q].timerOffset - x.t2
                    }, {
                        minutes: 0,
                        seconds: (x.time_round ? x.time_round : m[q].tirTime) - m[q].timerOffset
                    }, c, function () {
                        a.mainGameManager && (a.mainGrid.removeCurrentBets(), a.mainGrid.removeFuckingHoverTexture(),
                            sa.removeBalls(), a.mainUIManager.setInteraction(!1), a.mainSoundManager.playSound("endBet"))
                    }, .1, Aa);
                    G.events.emit("BET_TIME", {hot: x.hot, cold: x.cold})
                }
            }

            function F(x) {
                function d() {
                    a.mainGameManager && (a.mainGameManager.gameStateAsync(w), a.mainRenderer.renderManager.needUpdateRender = !0)
                }

                function w(r) {
                    function u(z) {
                        if (a.mainGrid && a.mainGameManager) if (e >= b.length) z(); else {
                            var y = b.slice(0, e + 1), B = "resultBalls" + e, C = a.mainGrid.zones[parseInt(b[e]) - 1];
                            a.mainUIManager.simpleFlipXFunc(C, B, 300, 300, function (Q) {
                                Q.getChildByName("text" +
                                    Q.name).style = {
                                    font: "50px Swiss721-CondensedBold",
                                    fill: "#000",
                                    align: "center"
                                };
                                Q.texture = Q.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                            });
                            sa.startDrawBalls(y, 1.55, 0);
                            G.cancelLastEdition(y);
                            e += 1;
                            setTimeout(function () {
                                u(z)
                            }, 900)
                        }
                    }

                    if (a.mainGameManager) if (0 === r.b1 || 99 === r.b1) setTimeout(d, 2E3); else {
                        var b = [r.b1, r.b2, r.b3, r.b4, r.b5];
                        5 < m[q].ballCount && b.push(r.b6);
                        6 < m[q].ballCount && b.push(r.b7);
                        var e = limit(J, 0, m[q].ballCount - 1);
                        if (0 !== e) {
                            var p;
                            for (p = 0; p <= e; p++) {
                                var h = "resultBalls" + p, D = a.mainGrid.zones[parseInt(b[p]) - 1];
                                a.mainUIManager.simpleFlipXFunc(D, h, 450, 450, function (z) {
                                    z.getChildByName("text" + z.name).style = {
                                        font: "50px Swiss721-CondensedBold",
                                        fill: "#000",
                                        align: "center"
                                    };
                                    z.texture = z.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                                })
                            }
                        }
                        u(function () {
                            a.mainFLGAccount.calculateWin(G.getActedOutEdition().betsHistory.bets, m[q].appName, function () {
                                G.getActedOutEdition().betsHistory.setTotalWin(a.mainFLGAccount.totalWin());
                                G.getActedOutEdition().betsHistory.redrawCurrentBets();
                                N.children[3].clear();
                                N.children[3].beginFill(0);
                                N.children[3].drawRect(3, 3, 1914, 22);
                                N.children[3].endFill;
                                var z = m.winShowTime ? m.winShowTime : 6E3;
                                Ja = setTimeout(Aa, z);
                                r.t2 = 80;
                                pa.updateJackpotData(r);
                                pa.drawJackpotWin(2E4, {
                                    x: 602,
                                    y: 527
                                }, a.mainRenderer.resourceLoader.resources.JP.texture, a.mainFLGAccount.totalWin(), a.mainRenderer.resourceLoader.resources.jp_only.texture);
                                n.video.button.pressed ? setTimeout(function () {
                                    n.game.button.emit("mousedown");
                                    a.mainFLGAccount.winToBalanceAnimation(z - 2E3, 2E3, {
                                        x: 602,
                                        y: 527
                                    }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                        font: "bold 70px Arial",
                                        fill: "#bcbcbc",
                                        withImages: !0
                                    }, pa.jpWin())
                                }, 2E3) : a.mainFLGAccount.winToBalanceAnimation(z, 2E3, {
                                    x: 602,
                                    y: 527
                                }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                    font: "bold 70px Arial",
                                    fill: "#bcbcbc",
                                    withImages: !0
                                }, pa.jpWin())
                            }, m);
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        })
                    }
                }

                if (a.mainGameManager) {
                    G.events.emit("RESULT_TIME");
                    N.children[3].clear();
                    N.children[3].beginFill(12531501);
                    N.children[3].drawRect(3, 3, 1914, 22);
                    N.children[3].endFill;
                    1 < G.editions.length && G.drawDetailEditionHistory(n.history.container, G.editions.length - 2);
                    N.children[3].children[2].children[0].text = "LOTTO    # " + (x.tir - 1);
                    N.children[2].children[0].text = "LOTTO    # " + (x.tir - 1);
                    var J = x.time_wait - parseInt(x.t2, 10) - 1;
                    0 > J ? setTimeout(d, 1E3 * -J) : d();
                    a.mainUIManager.setInteraction(!1);
                    ua ? (x = a.mainFLGAccount.totalBet(), a.mainFLGAccount.setWinTextVisible(!1), a.mainFLGAccount.totalBet(x, !0), ua = !1) : a.mainFLGAccount.setWinTextVisible(!1)
                }
            }

            function P(x) {
                0 >= x.t2 ? F(x) : l(x)
            }

            void 0 != a.mainGameManager && (f ? P(f) : a.mainGameManager.gameStateAsync(P))
        };
        this.drawGridHotCold = function (f) {
            if (ea.prevGmState || f) {
                var c = ea.prevGmState;
                if (c) {
                    for (var l = 0, F = 9; 6 > l; l++, F--) 0 != c.hot[l][0] && 99 != c.hot[l][0] && a.mainGrid.zones[parseInt(c.hot[l][0], 10) - 1].getChildByName("zone_hot") && (a.mainGrid.zones[parseInt(c.hot[l][0], 10) - 1].getChildByName("zone_hot").visible = !1), 0 != c.cold[F][0] && 99 != c.cold[F][0] && a.mainGrid.zones[parseInt(c.cold[F][0], 10) - 1].getChildByName("zone_cold") &&
                    (a.mainGrid.zones[parseInt(c.cold[F][0], 10) - 1].getChildByName("zone_cold").visible = !1);
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
                f && (c = f, ea.prevGmState = f);
                if (ea.needShow) {
                    l = 0;
                    for (F = 9; 6 > l; l++, F--) 0 != c.hot[l][0] && 99 != c.hot[l][0] && (a.mainGrid.zones[parseInt(c.hot[l][0], 10) - 1].getChildByName("zone_hot") ? a.mainGrid.zones[parseInt(c.hot[l][0], 10) - 1].getChildByName("zone_hot").visible = !0 : (a.mainRenderer.createButton(a.mainGrid.zones[parseInt(c.hot[l][0], 10) - 1], 0, 0, "zone_hot"), a.mainGrid.zones[parseInt(c.hot[l][0],
                        10) - 1].getChildByName("zone_hot").anchor.set(.5, .5))), 0 != c.cold[F][0] && 99 != c.cold[F][0] && (a.mainGrid.zones[parseInt(c.cold[F][0], 10) - 1].getChildByName("zone_cold") ? a.mainGrid.zones[parseInt(c.cold[F][0], 10) - 1].getChildByName("zone_cold").visible = !0 : (a.mainRenderer.createButton(a.mainGrid.zones[parseInt(c.cold[F][0], 10) - 1], 0, 0, "zone_cold"), a.mainGrid.zones[parseInt(c.cold[F][0], 10) - 1].getChildByName("zone_cold").anchor.set(.5, .5)));
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }
        };
        G.events.on("GRID_STATS",
            E.drawGridHotCold);
        G.events.on("BET_TIME", E.drawGridHotCold)
    }

    function Oa(a, R, O, k) {
        this.destroy = function () {
            q = E = null;
            R.onStartOpen = null;
            R.onStopOpen = null;
            for (var M in m) m[M] = null;
            m = null
        };
        var m = this, q = function () {
            for (var M = [], S = 0; 6 > S; S++) M.push([E.hot[S][0], E.hot[S][1]]);
            M.sort(function (V, aa) {
                if (V[0] > aa[0]) return 1;
                if (V[0] < aa[0]) return -1
            });
            for (S = 0; S < M.length; S++) E.hot[S][0] = M[S][0], E.hot[S][1] = M[S][1];
            M = [];
            for (S = 9; 4 <= S; S--) M.push([E.cold[S][0], E.cold[S][1]]);
            M.sort(function (V, aa) {
                if (V[0] > aa[0]) return 1;
                if (V[0] < aa[0]) return -1
            });
            S = 0;
            for (var oa = 9; S < M.length; S++, oa--) E.cold[oa][0] = M[S][0], E.cold[oa][1] = M[S][1];
            M = null
        }, E = a;
        q();
        this.update = function (M) {
            E = M;
            q();
            m.draw();
            m.drawGraphs()
        };
        this.draw = function () {
            O && O(E, R.container)
        };
        this.drawGraphs = function () {
            k && k(E, R.container)
        };
        R.onStartOpen = m.draw;
        R.onStopOpen = m.drawGraphs
    }

    [{
        category: "keno",
        catalog: "Lotto",
        image: "games/Lotto/resources/icons/lotto-5-36-front.png",
        imageBack: "games/Lotto/resources/icons/lotto-5-36-back.png",
        caption: "Lotto Blue 5/36",
        runConfig: "LottoMBK",
        gameType: "blue",
        playInDemo: !0,
        gameBG: "images/games-bg/game-bg-red.jpg",
        sid: 23
    }, {
        category: "keno",
        catalog: "Lotto",
        image: "games/Lotto/resources/icons/lotto-6-42-front.png",
        imageBack: "games/Lotto/resources/icons/lotto-6-42-back.png",
        caption: "Lotto Red 6/42",
        runConfig: "LottoMBK",
        gameType: "red",
        playInDemo: !0,
        gameBG: "images/games-bg/game-bg-red.jpg",
        sid: 24
    }, {
        category: "keno",
        catalog: "Lotto",
        image: "games/Lotto/resources/icons/lotto-7-49-front.png",
        imageBack: "games/Lotto/resources/icons/lotto-7-49-back.png",
        caption: "Lotto Green 7/49",
        runConfig: "LottoMBK",
        gameType: "green",
        playInDemo: !0,
        gameBG: "images/games-bg/game-bg-red.jpg",
        sid: 25
    }].forEach(a => {
        registrationAppOnPlatform(a)
    });
    var Fa = {
        runconfig: "Lotto", blue: {
            serverName: "srv72",
            appName: "bets_72",
            serverNum: "s72",
            coefTable: {1: [0, 1, 3, 10, 100, 1E3], 2: [0, 0, 5, 15, 150, 3E3], 3: [0, 0, 0, 60, 300, 1E4]},
            videoURL: "rtmp://w1.flg10.bet:1935/keno&amp;Video0=stream3:150&amp",
            videoMobileURL: "https://w1.flg10.bet/LottoGamer-5-36/myStream/playlist.m3u8",
            videoPos: {x: 54, y: 220},
            gridPos: {
                x: 72,
                y: 343
            },
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
            coefTable: {
                1: [0, 1, 2,
                    5, 25, 100, 1E3], 2: [0, 0, 3, 12, 50, 250, 5E3], 3: [0, 0, 0, 25, 150, 500, 1E4]
            },
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
            gridPos: {
                x: 72,
                y: 289
            },
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
    }, ka = {green: void 0, blue: void 0, red: void 0};
    window.initLottoMBKObject = Ea;
    window.emitEventLottoMBK =
        function (a, R) {
            void 0 != ka.green && ka.green.mainRenderer.stage.emit(a, R);
            void 0 != ka.red && ka.red.mainRenderer.stage.emit(a, R);
            void 0 != ka.blue && ka.blue.mainRenderer.stage.emit(a, R)
        };
    window.removeLottoMBKObject = Da;
    window.refreshLottoMBKObject = function (a, R) {
        Da(a, R.toLowerCase());
        Ea(a, R.toLowerCase())
    };
    window.gameManagerLottoMBK = function (a) {
        this.destroy = function () {
            k = O = null;
            for (var m in R) R[m] = null;
            R = null
        };
        var R = this;
        this.coefficients;
        this.coefMode = localStorage.getItem(a.gameConfig[a.configType].gameKind +
            a.gameConfig[a.configType].gameType + "coefMode") ? JSON.parse(localStorage.getItem(a.gameConfig[a.configType].gameKind + a.gameConfig[a.configType].gameType + "coefMode")) : 1;
        var O = {};
        this.gameState = function () {
            return O
        };
        this.gameStateAsync = function (m) {
            k(m)
        };
        var k = function (m) {
            $.ajax({
                type: "get",
                url: getUrl(),
                data: {
                    oper: "getgameinfo",
                    id_srv: a.gameConfig[a.configType].serverName.slice(3, a.gameConfig[a.configType].serverName.length)
                },
                dataType: "json",
                success: function (q, E, M) {
                    try {
                        R && (O = q, setTimeout(function (S, oa,
                                                          V) {
                            R && O && (O.betsHistory = {}, void 0 != m && m(O))
                        }, 0))
                    } catch (S) {
                        a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
                    }
                },
                error: function (q, E, M) {
                    a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
                }
            })
        };
        this.gameHistory = function () {
            function m(oa, V) {
                var aa = 0;
                V && (aa = V);
                V = [];
                for (var qa = aa + a.gameConfig[a.configType].ballCount; aa < qa; aa++) V.push(oa["b" + aa]);
                return V
            }

            if (!R || !O) return console.log("History and gameState not ok."), [];
            var q = [],
                E = 5;
            0 < parseInt(O.t2, 10) && --E;
            var M = O.history;
            if (!M || M === {}) return console.log("History and gameState not ok."), [];
            for (--E; 0 <= E; E--) {
                var S = M[E + 1];
                q.push({tir: S.tir, balls: m(S)})
            }
            0 < parseInt(O.t2, 10) && q.push({tir: O.tir - 1, balls: m(O, 1)});
            return q
        };
        this.sortNumeric = function (m, q) {
            if (m > q) return 1;
            if (m < q) return -1
        }
    }
})();
