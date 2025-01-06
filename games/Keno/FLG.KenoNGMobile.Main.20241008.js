function KenoAppObjNGMobile(a) {
    this.destroy = function () {
        ba.destroy();
        ba = null;
        ha.destroy();
        ha = null;
        ca.destroy();
        ca = null;
        y.destroy();
        y = null;
        pa.destroy();
        pa = null;
        V.mainSoundManager.destroy();
        for (var da in V) V[da] = null;
        V = null;
        this.metrika && document.body.removeChild(this.metrika)
    };
    var V = this;
    this.gameDir = FLGUtils.staticRootPath + "games/Keno/resources/";
    this.kenoConfig = a;
    // if ("s11" === a.serverNum) {
    //     eval(function (ia, wa, xa, Ea, ja, O, ma) {
    //         ia[ja] = ia[ja] || function () {
    //             (ia[ja].a = ia[ja].a || []).push(arguments)
    //         };
    //         ia[ja].l =
    //             1 * new Date;
    //         O = wa.createElement(xa);
    //         ma = wa.getElementsByTagName(xa)[0];
    //         O.async = 1;
    //         O.src = Ea;
    //         ma.parentNode.insertBefore(O, ma)
    //     }(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"));
    //     eval(ym(84903145, "init", {clickmap: !0, trackLinks: !0, accurateTrackBounce: !0, webvisor: !0}));
    //     let da = document.createElement("div");
    //     for (da.innerHTML = '<noscript><div><img src="https://mc.yandex.ru/watch/84903145" style="position:absolute; left:-9999px;" alt="" /></div></noscript>'; da.children.length;) document.body.appendChild(da.firstElementChild)
    // }
    var pa =
        new FLGRenderer(1920, 1080, a.canvasId, "center");
    this.mainRenderer = pa;
    this.mainSoundManager = new SoundManager(V.kenoConfig.gameKind, V.kenoConfig.gameType, V.kenoConfig.gameVariant);
    var ca = new FLGAccount(a.canvasId, V.mainSoundManager, V.mainRenderer);
    this.mainFLGAccount = ca;
    var y = new gameManagerNG(this);
    this.mainGameManager = y;
    var ba = new UIManagerNGMobile(this);
    this.mainUIManager = ba;
    var ha;
    this.setMainGrid = function (da) {
        ha = da;
        V.mainGrid = ha
    }
}

function UIManagerNGMobile(a) {
    function V(d, b, m, f, w) {
        this.destroy = function () {
            t = p = A = u = null;
            clearTimeout(N);
            clearTimeout(k);
            l = c = null;
            for (var n in r) r[n] = null;
            r = null
        };
        var r = this, u = {font: "bold 35px Arial", fill: "#000000", align: "center"}, A = 0, N, k,
            p = new PIXI.Container;
        f ? f.addChild(p) : a.mainRenderer.stage.addChild(p);
        var t = function (n, K, E, P, H) {
            p.children[H] ? (p.children[H].visible = !0, p.children[H].children[0].text = P) : a.mainRenderer.createButton(p, n, K, "atlas%Jball", {
                text: P,
                align: "center",
                style: u
            }).scale.set(E,
                E);
            w && !p.children[H].isRotated && (p.children[H].position.x = n + 1714, p.children[H].children[0].rotation = 14 * Math.PI, p.children[H].isRotated = !0, a.mainUIManager.animations()["rotation_ball" + H] && (a.mainUIManager.animations()["rotation_ball" + H].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["rotation_ball" + H] = (new TWEEN.Tween({
                rotation: p.children[H].children[0].rotation,
                position: p.children[H].position.x
            })).to({
                rotation: 0,
                position: n
            }, 990).easing(TWEEN.Easing.Cubic.Out).onUpdate(function () {
                p.children[H].children[0].rotation = this.rotation;
                p.children[H].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["rotation_ball" + H] = null;
                a.mainSoundManager.playSound("ball")
            }).start())
        }, c = function (n, K, E, P) {
            function H() {
                t(d + m * A, b, K, n[A], A);
                A++;
                A < n.length ? 0 == E || void 0 == E ? H() : N = setTimeout(H, E) : A = 0
            }

            void 0 != n && n.length && (P ? t(d + m * P, b, K, n[P], P) : H())
        };
        this.startDrawBalls =
            c;
        var l = function () {
            for (var n = 0; n < p.children.length; n++) w ? (p.children[n].isRotated = !1, a.mainUIManager.animations()["remove_ball" + n] && (a.mainUIManager.animations()["remove_ball" + n].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["remove_ball" + n] = (new TWEEN.Tween({
                rotation: p.children[n].children[0].rotation,
                position: p.children[n].position.x,
                index: n
            })).to({rotation: 14 * Math.PI, position: p.children[n].position.x + 1714},
                990).easing(TWEEN.Easing.Cubic.In).onUpdate(function () {
                p.children[this.index].children[0].rotation = this.rotation;
                p.children[this.index].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["remove_ball" + this.index] = null;
                p.children[this.index].visible = !1
            }).start()) : p.children[n].visible = !1
        };
        this.removeBalls = l
    }

    function pa(d) {
        this.destroy = function () {
            for (var k = 0; k < m.length; k++) {
                for (var p in m[k]) m[k][p] = null;
                m[k] = null
            }
            N = A = r = w = f =
                m = null;
            for (k in b) b[k] = null;
            b = null
        };
        var b = this, m = [];
        this.bets = m;
        var f = 0, w = 0;
        this.setTotalWin = function (k) {
            if (!arguments.length) return w;
            k && (w = k)
        };
        this.getTotalBet = function () {
            return f
        };
        var r = null;
        this.parentEditions = function (k) {
            if (!arguments.length) return r;
            r = k;
            A = r.betsHistoryContainer()
        };
        if (d.length) for (var u = 0; u < d.length; u++) d[u].summ && (f += d[u].summ), d[u].win && (w += d[u].win), m.push({
            summ: d[u].summ,
            bet: d[u].bet,
            winBets: d[u].winBets,
            countWin: d[u].countWin,
            win: d[u].win,
            code: d[u].code,
            id: d[u].id
        });
        this.addBet =
            function (k, p, t) {
                100 <= m.length ? (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), t && t(void 0)) : (k.length && 100 < m.length + k.length && (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), k = k.slice(0, k.length - (m.length + k.length - 100))), a.mainFLGAccount.placeBet(k, p, a.kenoConfig, function (c, l, n) {
                    if (void 0 == c) t && t(void 0); else {
                        if (n) {
                            n.notAll && a.mainRenderer.logService.log(mainLocalizationTable.betError);
                            for (c = 0; c < n.srvBets.length; c++) m.push({
                                summ: n.srvBets[c].summ,
                                bet: n.srvBets[c].bet,
                                winBets: n.srvBets[c].winBets,
                                countWin: n.srvBets[c].countWin,
                                code: n.srvBets[c].code,
                                id: n.srvBets[c].id
                            });
                            t && (t(n.srvBets), r.events.emit("EDITIONS_CHANGE"))
                        } else m.push({
                            summ: k.summ,
                            bet: k.bet,
                            winBets: k.winBets,
                            countWin: k.countWin,
                            win: k.win,
                            code: c,
                            id: l
                        }), t && (t(m[m.length - 1]), r.events.emit("EDITIONS_CHANGE"));
                        f = a.mainFLGAccount.totalBet();
                        N();
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }
                }))
            };
        var A, N = function () {
            var k = 0 != A.children.length;
            A.parent.children[7].children[0].children[0].text =
                0 < m.length ? mainLocalizationTable.coupon.toUpperCase() + " (" + m.length + ")" : mainLocalizationTable.coupon.toUpperCase();
            if (k) A.parent.children[2].children[1].children[0].text = 0 !== f ? formatFLGNums(f, !1) : "", A.parent.children[2].children[2].children[0].text = 0 !== w ? formatFLGNums(w, !1) : ""; else for (k = 0; 10 > k; k++) {
                var p = k & 1 ? "atlas%Jtable-odd-line" : "atlas%Jtable-even-line";
                p = new a.mainRenderer.createButton(A, 0, 127 + 49 * k, p);
                p.anchor.y = .5;
                p.name = "row_" + k
            }
            for (k = 0; A.getChildByName("row_" + k); k++) if (p = A.getChildByName("row_" +
                k)) {
                for (var t = 0; p.getChildByName("rect" + k + "_" + t); t++) {
                    var c = p.getChildByName("rect" + k + "_" + t);
                    c.visible = !1;
                    c.getChildByName("sortedBet" + k + "_" + t).visible = !1
                }
                if (c = p.getChildByName("summ" + k)) c.visible = !1, p.getChildByName("win" + k).visible = !1, p.getChildByName("coef" + k).visible = !1;
                9 < k && (p.visible = !1)
            }
            if (!(0 >= m.length)) {
                k = 0;
                for (var l = m.length - 1; k < m.length; k++, l--) {
                    var n = m[l].bet.slice();
                    n.sort(a.mainGameManager.sortNumeric);
                    (p = A.getChildByName("row_" + k)) ? p.visible = !0 : (p = k & 1 ? "atlas%Jtable-odd-line" : "atlas%Jtable-even-line",
                        p = new a.mainRenderer.createButton(A, 0, 127 + 49 * k, p), p.anchor.y = .5, p.name = "row_" + k);
                    for (t = 0; t < n.length; t++) {
                        var K = -1 < m[l].winBets.indexOf(n[t]), E = K ? 16773632 : 0;
                        (c = p.getChildByName("rect" + k + "_" + t)) ? (c.clear(), c.beginFill(E), c.drawRoundedRect(4 + 38 * t, -17, 34, 34, 4), c.endFill(), c.visible = !0, c = c.getChildByName("sortedBet" + k + "_" + t), c.children[0].style = K ? r.tableHistoryFontBig : r.tableHighlightFont, c.children[0].text = n[t], c.visible = !0) : (c = new PIXI.Graphics, c.beginFill(E), c.drawRoundedRect(4 + 38 * t, -17, 34, 34, 4), c.endFill(),
                            c.name = "rect" + k + "_" + t, p.addChild(c), a.mainRenderer.createButton(c, 21 + 38 * t, 0, void 0, {
                            text: n[t],
                            align: "center",
                            style: K ? r.tableHistoryFontBig : r.tableHighlightFont
                        }).name = "sortedBet" + k + "_" + t)
                    }
                    n = void 0 != m[l].win ? formatFLGNums(m[l].win, !1) : "";
                    t = void 0 != m[l].win && 0 != m[l].win ? r.tableBoldFont : r.tableBetFont;
                    c = p.getChildByName("summ" + k);
                    K = a.mainGameManager.coefficients[m[l].countWin][m[l].bet.length - 1];
                    K = 0 != K ? K : "";
                    c ? (c.children[0].style = t, c.children[0].text = formatFLGNums(m[l].summ, !1), c.visible = !0, c = p.getChildByName("win" +
                        k), c.children[0].style = t, c.children[0].text = n, c.visible = !0, c = p.getChildByName("coef" + k), c.children[0].style = t, c.children[0].text = K, c.visible = !0) : (a.mainRenderer.createButton(p, 394, 0, void 0, {
                        text: formatFLGNums(m[l].summ, !1),
                        align: "left",
                        style: t
                    }).name = "summ" + k, a.mainRenderer.createButton(p, 573, 0, void 0, {
                        text: n,
                        align: "left",
                        style: t
                    }).name = "win" + k, a.mainRenderer.createButton(p, 533, 0, void 0, {
                        text: K,
                        align: "center",
                        style: {font: t.font, fill: t.fill, align: "center"}
                    }).name = "coef" + k)
                }
            }
            A.emit("updateHeight")
        };
        this.redrawCurrentBets = N;
        this.calculateWin = function (k, p) {
            for (var t, c = 0; c < m.length; c++) {
                t = m[c].bet;
                for (var l = [], n = 0; n < t.length; n++) -1 < k.indexOf(t[n]) && l.push(t[n]);
                t = l;
                m[c].winBets = t;
                m[c].countWin = t.length;
                p && (m[c].win = m[c].summ * a.mainGameManager.coefficients[m[c].countWin][m[c].bet.length - 1], w += m[c].win)
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        }
    }

    const {kenoConfig: ca, gameDir: y} = a, {
        canvasId: ba,
        needRtc: ha,
        videoPos: da,
        videoSize: ia,
        videoRtcUrl: wa,
        videoRtcApp: xa,
        videoRtcStream: Ea,
        gameType: ja
    } = ca;
    this.destroy = function () {
        clearTimeout(Ma);
        clearTimeout(Qa);
        na = W = null;
        U.destroy();
        U = null;
        ta.destroy();
        I = ta = null;
        J && J.destroy && J.destroy();
        Fa = J = null;
        ea.destroy();
        ea = null;
        qa.destroy();
        Ga = x = X = ka = z = qa = null;
        for (var d in G) {
            for (var b in G[d]) G[d][b] = null;
            G[d] = null
        }
        Q = G = null;
        clearTimeout(Na);
        ua = Oa = null;
        for (d in q) q[d] = null;
        ya = za = ra = sa = oa = Ha = Pa = Ia = Ja = q = null;
        a.mainFLGAccount.events.off("onBet", Aa);
        a.mainFLGAccount.events.off("onBalance", Ba);
        Ba = Aa = null;
        a.mainRenderer.stage.off("changeLang", Ca);
        Ca = null;
        ma.off("visibleChange",
            Ka);
        Ka = ma = null;
        va.destroy();
        la = va = null;
        B.destroy();
        B = null;
        for (d in O) O[d] = null;
        O = null
    };
    var O = this, ma = $("#" + ba).parent(), Ka = function (d, b) {
        a.mainRenderer.stage.visible = b == ba;
        a.mainRenderer.StartStopAnimation(a.mainRenderer.stage.visible)
    };
    ma.on("visibleChange", Ka);
    for (var W = clientInfoGlobal.coin7.split("-"), Y = 0; Y < W.length; Y++) W[Y] /= 100;
    var na = 2 * parseInt(W[W.length - 1], 10);
    W.push("MAX\n" + na);
    Y = (Y = localStorage.getItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "defaultBet")) && 0 <= W.indexOf(parseInt(Y)) ?
        JSON.parse(Y) : W[1];
    var U = new betsControls(W[0], W[W.length - 1], Y, W, function (d) {
        a.mainFLGAccount.balance() < na && (na = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return na
    });
    this.betsControls = U;
    var ta = new FLGTimer, I, J, Fa = .1, ea = new FLGJackpot(a.mainRenderer, {tirTimeOffset: Fa, updateInterval: 900}),
        qa, z = new PIXI.Container, ka = new PIXI.Container, X = new PIXI.Container, x = new PIXI.Container,
        Ga = new PIXI.Container, G = {
            game: {
                text: mainLocalizationTable.game.toUpperCase(), posX: 25, posY: 570,
                pressedDefault: !0, onStartOpen: void 0, onStopOpen: void 0, onStartClose: void 0, onStopClose: void 0
            },
            video: {
                text: mainLocalizationTable.video.toUpperCase(), posX: 25, posY: 435, onStartOpen: function () {
                    J && (J.destroy && J.destroy(), J = null);
                    q.scale_video && q.scale_video.stop();
                    q.scale_video_open && q.scale_video_open.stop();
                    if (ha) rtcVideo.prepareVideo({
                        videoRtcUrl: wa,
                        videoRtcApp: xa,
                        videoRtcStream: Ea,
                        videoId: "innerVideo" + ba,
                        parentId: ba,
                        styleObj: {
                            posX: da.x,
                            posY: da.y,
                            sizeW: ia.w,
                            sizeH: ia.h,
                            borderURL: void 0,
                            paddings: 0,
                            noVideoIcons: !0,
                            videoMaxScale: 1,
                            clipPath: "none",
                            fullscreenPosY: -45
                        },
                        onReady() {
                            q.video_rotate && q.video_rotate.stop();
                            rtcVideo.showVideo()
                        }
                    }); else {
                        var d = "vip1001.de" === location.host || "test.flg.bet" === location.host ? "cover-video " + a.kenoConfig.gameType.toLowerCase() : void 0;
                        J = new FLGVideo(27, 288, 1120, 683, ba, null, '<video id="innerVideo' + ba + '" autoplay muted playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + a.kenoConfig.videoMobileURL + '" type="application/x-mpegURL"></video>', void 0, a.mainSoundManager,
                            !0, d)
                    }
                    var b = navigator.userAgent || navigator.vendor || window.opera;
                    b.match(/Android/i) || J && J.setVisible && J.setVisible(!0);
                    q.scale_video_open = (new TWEEN.Tween({scale: 0})).to({scale: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                        q.scale_video_open = null;
                        J && J.setScale && J.setScale(1)
                    }).onUpdate(function () {
                        J && J.setScale && J.setScale(this.scale)
                    }).onComplete(function () {
                        q.scale_video_open = null
                    }).start();
                    q.video_rotate && q.video_rotate.stop();
                    d = ka.getChildByName("video");
                    if (d.children.length) {
                        var m =
                            d.children[0];
                        m.visible = !0
                    } else m = a.mainRenderer.createButton(d, 0, 0, "btn_video_load"), m.anchor.set(.5, .5), m.scale.set(1.75, 1.75);
                    m && (a.mainRenderer.renderManager.animationTweenInc(), q.video_rotate = (new TWEEN.Tween(m)).to({rotation: 6 * Math.PI}, 3E3).easing(TWEEN.Easing.Linear.None).onStop(function () {
                        m.rotation = 0;
                        m.visible = !1;
                        a.mainRenderer.renderManager.animationTweenDec();
                        q.video_rotate = null
                    }).onComplete(function () {
                        b.match(/Android/i) && J && J.setVisible && J.setVisible(!0);
                        m.rotation = 0;
                        m.visible = !1;
                        a.mainRenderer.renderManager.animationTweenDec();
                        q.video_rotate = null
                    }).start())
                }, onStopOpen: void 0, onStartClose: function () {
                    ha && rtcVideo.hideVideo();
                    J && (q.scale_video_open && q.scale_video_open.stop(), q.scale_video && q.scale_video.stop(), q.video_rotate && q.video_rotate.stop(), q.scale_video = (new TWEEN.Tween({scale: 1})).to({scale: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                        q.scale_video = null;
                        J && (J.setScale && J.setScale(0), J.destroy && J.destroy(), J = null)
                    }).onUpdate(function () {
                        J && J.setScale && J.setScale(this.scale)
                    }).onComplete(function () {
                        J &&
                        (J.setScale && J.setScale(0), J.destroy && J.destroy(), J = null, ha && rtcVideo.destroy && rtcVideo.destroy());
                        q.scale_video = null
                    }).start())
                }, onStopClose: void 0
            },
            history: {
                text: mainLocalizationTable.history.toUpperCase(),
                posX: 387,
                posY: 435,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            stats: {
                text: mainLocalizationTable.stats.toUpperCase(),
                posX: 387,
                posY: 300,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            info: {
                text: mainLocalizationTable.info.toUpperCase(),
                posX: 25, posY: 300, onStartOpen: void 0, onStopOpen: void 0, onStartClose: void 0, onStopClose: void 0
            }
        }, Q, Na = 0, Oa = function () {
            void 0 !== a.mainGameManager && O.simpleFlipXFunc(Q.children[0], "charRotate0", 130, 130, void 0, function () {
                O.simpleFlipXFunc(Q.children[1], "charRotate1", 130, 130, void 0, function () {
                    O.simpleFlipXFunc(Q.children[2], "charRotate2", 130, 130, void 0, function () {
                        O.simpleFlipXFunc(Q.children[3], "charRotate3", 130, 130, void 0, function () {
                            O.simpleFlipXFunc(Q.children[4], "charRotate4", 130, 130)
                        })
                    })
                })
            })
        }, ua, va,
        la = {needShow: !0}, B = new function () {
            this.destroy = function () {
                for (var e = 0; e < b.length; e++) b[e].round = null, b[e].editionResult = null, b[e].betsHistory.destroy && b[e].betsHistory.destroy(), b[e].betsHistory = null, b[e] = null;
                N = A = r = w = f = m = b = null;
                u.destroy();
                u = null;
                S && (S.destroy(), S = null);
                k = null;
                p && (p.destroy(), p = null);
                D = F = H = P = E = K = n = c = t = l = null;
                d.events.removeAllListeners();
                for (e in d) d[e] = null;
                d = null
            };
            var d = this, b = [], m;
            this.editions = b;
            var f, w = new PIXI.Container, r = new PIXI.Container, u, A = new PIXI.Container, N = new PIXI.Container;
            N.name = "betCntnr";
            this.historyTable = function () {
                return f
            };
            this.betBGContainer = function () {
                return u.srcSprite
            };
            this.betsHistoryContainer = function () {
                return N
            };
            var k = .653, p, t = {font: "bold 42px Arial", fill: "#313131"};
            this.tableHeaderFont = t;
            var c = {font: "34px Arial", fill: "#403f3f"}, l = {font: "bold 40px Arial Narrow", fill: "#000000"};
            this.tableHistoryFont = l;
            this.tableHistoryFontBig = {font: "30px Arial Narrow", fill: "#000000"};
            var n = {font: "30px Arial Narrow", fill: "#ffffff"};
            this.tableHighlightFont = n;
            var K = {
                font: "bold 34px Arial",
                fill: "#000000"
            };
            this.tableBoldFont = K;
            var E = {font: "34px Arial", fill: "#000000"};
            this.tableBetFont = E;
            this.getActedOutEdition = function () {
                for (var e = b.length - 1; 0 <= e; e--) if (void 0 == b[e].editionResult) return P(e), b[e];
                P(b.length - 1);
                return b[b.length - 1]
            };
            var P = function (e) {
                0 > e || e >= b.length || (m = e, void 0 != f && b[m].betsHistory.redrawCurrentBets(), a.mainRenderer.renderManager.needUpdateRender = !0)
            };
            this.drawEditions = function () {
                f = a.mainRenderer.createButton(Ga, 1174, 195);
                for (var e = 0; e < b.length; e++) b[e].betsHistory.parentEditions(d);
                F();
                b.length && b[m].betsHistory.redrawCurrentBets();
                w.position.set(0, -400);
                G.stats.container.addChildAt(w, G.stats.container.children.length);
                a.mainRenderer.createButton(G.stats.container, 0, -385, void 0, {
                    text: mainLocalizationTable.ballHist.toUpperCase(),
                    align: "center",
                    style: {font: "bold 50px Arial", fill: "#ffffff", align: "center"}
                }).anchor.set(.5, .5)
            };
            var H = function () {
                r.children[0] && r.children[1] ? (r.children[0].children[0].text = "#", r.children[1].children[0].text = mainLocalizationTable.balls) : (a.mainRenderer.createButton(r,
                    14, 30, void 0, {
                        text: mainLocalizationTable.history.toUpperCase(),
                        align: "left",
                        style: t
                    }), a.mainRenderer.createButton(r, 64, 78, void 0, {
                    text: "#",
                    align: "center",
                    style: c
                }), a.mainRenderer.createButton(r, 141, 78, void 0, {
                    text: mainLocalizationTable.balls,
                    align: "left",
                    style: c
                }))
            };
            this.redrawEditionHeader = H;
            var F = function () {
                if (A.children[0]) A.children[0].children[0].text = mainLocalizationTable.coupon.toUpperCase(), A.children[1].children[0].text = mainLocalizationTable.balls, A.children[2].children[0].text = mainLocalizationTable.totalBet,
                    A.children[3].children[0].text = mainLocalizationTable.win, u.srcSprite.children[2].children[0].text = mainLocalizationTable.total.toUpperCase() + ":"; else {
                    u = new MaskedSprite(a.mainRenderer.createButton(f, 1, 172, "table_bg"), {
                        mask: {
                            x: 1,
                            y: 172,
                            width: 722,
                            height: 445
                        }, needScrolling: {container: N, scrollbar: {topOffset: 104, botOffset: 48}}
                    }, a.mainRenderer.renderManager);
                    u.srcSprite.addChildAt(N, 0);
                    a.mainRenderer.createButton(u.srcSprite, 0, 396, "table_footer");
                    a.mainRenderer.createButton(u.srcSprite.children[2], 354, 24,
                        void 0, {text: mainLocalizationTable.total.toUpperCase() + ":", align: "right", style: c});
                    a.mainRenderer.createButton(u.srcSprite.children[2], 394, 24, void 0, {
                        text: "",
                        align: "left",
                        style: c
                    });
                    a.mainRenderer.createButton(u.srcSprite.children[2], 573, 24, void 0, {
                        text: "",
                        align: "left",
                        style: c
                    });
                    var e = new PIXI.Graphics;
                    e.beginFill(16777215);
                    e.drawRect(385, 56, 2, 585);
                    e.alpha = .5;
                    e.name = "ballsSep";
                    e.endFill;
                    u.srcSprite.addChild(e);
                    e = new PIXI.Graphics;
                    e.beginFill(16777215);
                    e.drawRect(560, 56, 2, 573);
                    e.alpha = .5;
                    e.name = "winsSep";
                    e.endFill;
                    u.srcSprite.addChild(e);
                    u.srcSprite.interactive = !0;
                    u.srcSprite.hitArea = new PIXI.Rectangle(0, 0, 722, 445);
                    a.mainRenderer.createButton(u.srcSprite, 0, 0, "table_header");
                    e = a.mainRenderer.createButton(u.srcSprite, 0, 0, void 0, void 0, function (g, h) {
                        a.mainUIManager.animations().rotate_bets && (a.mainUIManager.animations().rotate_bets.stop(), a.mainRenderer.renderManager.animationTweenDec());
                        g.pressed = !g.pressed;
                        var v = g.pressed ? 0 : Math.PI / 2;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().rotate_bets =
                            (new TWEEN.Tween(g.children[0])).to({rotation: v}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec();
                                a.mainUIManager.animations().rotate_bets = null
                            }).start();
                        a.mainUIManager.animations().resize_bets && (a.mainUIManager.animations().resize_bets.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().resize_bets = null);
                        g = g.pressed ? 249 : 445;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().resize_bets =
                            (new TWEEN.Tween({fHeight: u.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: g}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                                u.srcSprite.position.y = 617 - this.fHeight;
                                u.srcSprite.children[2].position.y = 396 + this.fHeight - 445;
                                u.srcSprite.mask.clear();
                                u.srcSprite.mask.beginFill(14922837);
                                u.srcSprite.mask.drawRoundedRect(1, u.srcSprite.position.y, 722, this.fHeight, 9);
                                u.srcSprite.mask.endFill;
                                u.srcSprite.hitArea.height = this.fHeight;
                                N.emit("updateHeight")
                            }).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec();
                                a.mainUIManager.animations().resize_bets = null
                            }).start();
                        h && (h.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    e.name = "exp2";
                    e = a.mainRenderer.createButton(e, 695, 29, "atlas%Jexpand");
                    e.anchor.set(.5, .5);
                    e.rotation = Math.PI / 2;
                    e.visible = !1;
                    e = null;
                    u.srcSprite.addChild(A);
                    a.mainRenderer.createButton(A, 14, 30, void 0, {
                        text: mainLocalizationTable.coupon.toUpperCase(),
                        align: "left",
                        style: t
                    });
                    a.mainRenderer.createButton(A, 14, 78, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "left",
                        style: c
                    });
                    a.mainRenderer.createButton(A,
                        445, 78, void 0, {
                            text: mainLocalizationTable.totalBet,
                            align: "center",
                            style: {font: c.font, fill: c.fill, align: "center"}
                        });
                    a.mainRenderer.createButton(A, 641, 78, void 0, {
                        text: mainLocalizationTable.win,
                        align: "center",
                        style: {font: c.font, fill: c.fill, align: "center"}
                    });
                    a.mainRenderer.createButton(A, 533, 78, void 0, {
                        text: "X",
                        align: "center",
                        style: {font: c.font, fill: c.fill, align: "center"}
                    });
                    e = new PIXI.Graphics;
                    e.beginFill(16777215);
                    e.drawRect(505, 56, 2, 573);
                    e.alpha = .5;
                    e.name = "xSep";
                    e.endFill;
                    u.srcSprite.addChild(e);
                    e =
                        null;
                    e = a.mainRenderer.createButton(u.srcSprite, 0, 0, void 0, void 0, function (g, h) {
                        a.mainSoundManager.playSound("buttonClick");
                        la.needShow = !la.needShow;
                        d.events.emit("GRID_STATS");
                        g.children[0].texture = a.mainRenderer.resourceLoader.resources[la.needShow ? "eye_icon" : "eye_closed_icon"].texture;
                        h && (h.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    e.hitArea = new PIXI.Rectangle(0, 0, 722, 60);
                    e.name = "eye_icon";
                    e = a.mainRenderer.createButton(e, 670, 30, "eye_icon");
                    e.anchor.set(.5, .5);
                    e.scale.set(1.3,
                        1.3);
                    e = e = null
                }
            };
            this.drawBetsHeader = F;
            var D = function () {
                var e = 0 != w.children.length;
                if (!e) for (var g = 0; 5 > g; g++) {
                    var h = new a.mainRenderer.createButton(w, 0, 70 + 130 * g, "atlas%Jtable-even-line");
                    h.anchor.y = .5;
                    h.visible = 4 == g || 3 == g ? !1 : !0
                }
                var v = a.mainGameManager.gameHistory();
                for (g = 0; g < v.length; g++) {
                    var C = v[g].balls.slice();
                    C.sort(a.mainGameManager.sortNumeric);
                    h = w.children[g];
                    if (e = 0 !== h.children.length) for (h.getChildByName("round" + g).children[0].text = "#  " + v[g].tir, e = 0; e < C.length; e++) h.getChildByName("result" +
                        e).children[0].text = C[e]; else {
                        a.mainRenderer.createButton(h, 150, 0, void 0, {
                            text: "#  " + v[g].tir,
                            align: "center",
                            style: {font: "bold 40px Arial", fill: "#ffffff"}
                        }).name = "round" + g;
                        var L = -54;
                        for (e = 0; e < C.length; e++) a.mainRenderer.createButton(h, L += 56, 30, "atlas%Jball", {
                            text: C[e],
                            align: "center",
                            style: l
                        }).name = "result" + e, h.getChildByName("result" + e).scale.set(.74, .74)
                    }
                }
                w.position.x = -w.width / 2
            };
            this.detailEditionsFont = {font: "bold 50px Arial", fill: "#ffffff"};
            this.detailEditionsHeaderFont = {font: "34px Arial", fill: "#b1b1b1"};
            this.detailEditionsRowFont = {font: "34px Arial", fill: "#ffffff"};
            var S;
            this.drawDetailEditionHistory = function (e, g) {
                if (b[g].editionResult) {
                    var h = 0 != e.children.length;
                    e.editionInd = g;
                    var v = {x: 599, y: 524}, C = b[g].editionResult.slice();
                    C.sort(a.mainGameManager.sortNumeric);
                    h ? (p.removeBalls(), p.startDrawBalls(C, k, 0), e.children[0].children[0].text = "# " + b[g].round, C = e.getChildByName("totalBox"), C.getChildByName("tBet").children[0].text = formatFLGNums(b[g].betsHistory.getTotalBet(), !1), C.getChildByName("tWin").children[0].text =
                        formatFLGNums(b[g].betsHistory.setTotalWin(), !1), C = null) : (h = a.mainRenderer.createButton(e, 598 - v.x, 150 - v.y, void 0, {
                        text: "# " + b[g].round,
                        align: "center",
                        style: d.detailEditionsFont
                    }), p = new V(69 - v.x, 215 - v.y - 8, 53, e), p.startDrawBalls(C, k, 0), h = a.mainRenderer.createButton(e, 340 - v.x, 150 - v.y, "atlas%Jarrow"), a.mainRenderer.createButton(h, 0, 0, "atlas%Jarrow-selected", void 0, function (Z, La) {
                        a.mainSoundManager.playSound("buttonClick");
                        e.editionInd = limit(e.editionInd - 1, 0, b.length - 2);
                        d.drawDetailEditionHistory(e, e.editionInd);
                        La.stopped = !0;
                        a.mainUIManager.clickAnimationFunc(Z, "bet_arrow_History");
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }, void 0, void 0, function (Z) {
                        Ja(Z, "bet_arrow_History")
                    }, function (Z) {
                        Ia(Z, "bet_arrow_History")
                    }).alpha = 0, h.anchor.set(.5, .5), h.scale.set(2, 2), h.children[0].anchor.set(.5, .5), h = a.mainRenderer.createButton(e, 858 - v.x, 148 - v.y, "atlas%Jarrow"), a.mainRenderer.createButton(h, 0, 0, "atlas%Jarrow-selected", void 0, function (Z, La) {
                        a.mainSoundManager.playSound("buttonClick");
                        e.editionInd = limit(e.editionInd +
                            1, 0, b.length - 2);
                        d.drawDetailEditionHistory(e, e.editionInd);
                        La.stopped = !0;
                        a.mainUIManager.clickAnimationFunc(Z, "bet_arrow_History2");
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }, void 0, void 0, function (Z) {
                        Ja(Z, "bet_arrow_History2")
                    }, function (Z) {
                        Ia(Z, "bet_arrow_History2")
                    }).alpha = 0, h.anchor.set(.5, .5), h.scale.set(2, 2), h.children[0].anchor.set(.5, .5), h.rotation = Math.PI, h = a.mainRenderer.createButton(e, 742 - v.x, 342 - v.y - 48, void 0, {
                        text: mainLocalizationTable.bet,
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }),
                        h.anchor.set(.5, .5), h = a.mainRenderer.createButton(e, 350 - v.x, 342 - v.y - 48, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), h.anchor.set(.5, .5), h = a.mainRenderer.createButton(e, 886 - v.x, 342 - v.y - 48, void 0, {
                        text: mainLocalizationTable.coef,
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), h.anchor.set(.5, .5), h = a.mainRenderer.createButton(e, 1027 - v.x, 342 - v.y - 48, void 0, {
                        text: mainLocalizationTable.win,
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), h.anchor.set(.5, .5),
                        C = a.mainRenderer.createButton(e, 68 - v.x, 908 - v.y, void 0), C.name = "totalBox", C.anchor.y = .5, a.mainRenderer.createButton(C, 56, 0, void 0, {
                        text: mainLocalizationTable.total.toUpperCase(),
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), a.mainRenderer.createButton(C, 368, 0, void 0, {
                        text: mainLocalizationTable.bet + ":",
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), h = a.mainRenderer.createButton(C, 540, 0, "atlas%Jhistory-row"), h.anchor.set(.5, .5), h.scale.x = .17, a.mainRenderer.createButton(C, 540, 0, void 0, {
                        text: formatFLGNums(b[g].betsHistory.getTotalBet(),
                            !1), align: "center", style: d.detailEditionsRowFont
                    }).name = "tBet", a.mainRenderer.createButton(C, 768, 0, void 0, {
                        text: mainLocalizationTable.win + ":",
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), h = a.mainRenderer.createButton(C, 960, 0, "atlas%Jhistory-row"), h.anchor.set(.5, .5), h.scale.x = .17, a.mainRenderer.createButton(C, 960, 0, void 0, {
                        text: formatFLGNums(b[g].betsHistory.setTotalWin(), !1),
                        align: "center",
                        style: d.detailEditionsRowFont
                    }).name = "tWin", h = C = null, S = new MaskedSprite(a.mainRenderer.createButton(e,
                        0, 0), {
                        mask: {x: 60 - v.x, y: 364 - v.y - 38, width: 1070, height: 540},
                        needScrolling: {}
                    }, a.mainRenderer.renderManager), S.srcSprite.interactive = !0, S.srcSprite.hitArea = new PIXI.Rectangle(70 - v.x, 362 - v.y - 38, 1061, 546));
                    C = [];
                    var L;
                    C = S.containerForScroll;
                    var T, R;
                    for (h = 0; C.getChildByName("row_" + h); h++) if (L = C.getChildByName("row_" + h)) {
                        L.visible = !1;
                        for (R = 0; L.getChildByName("rect" + h + "_" + R); R++) {
                            var M = L.getChildByName("rect" + h + "_" + R);
                            M.visible = !1;
                            M.getChildByName("textBet" + h + "_" + R).visible = !1
                        }
                        if (T = L.getChildByName("summ" +
                            h)) T.visible = !1, L.getChildByName("win" + h).visible = !1, L.getChildByName("coef" + h).visible = !1
                    }
                    e.children[2].visible = 0 !== e.editionInd;
                    e.children[3].visible = e.editionInd !== b.length - 2;
                    e.children[4].visible = 0 < b[g].betsHistory.bets.length;
                    e.children[5].visible = 0 < b[g].betsHistory.bets.length;
                    e.children[6].visible = 0 < b[g].betsHistory.bets.length;
                    e.children[7].visible = 0 < b[g].betsHistory.bets.length;
                    if (0 >= b[g].betsHistory.bets.length) C.emit("updateHeight"); else {
                        var aa = [];
                        h = 0;
                        for (var fa = b[g].betsHistory.bets.length -
                            1; h < b[g].betsHistory.bets.length; h++, fa--) {
                            (L = C.getChildByName("row_" + h)) ? L.visible = !0 : (L = new a.mainRenderer.createButton(C, 68 - v.x, 353 + 61 * h - v.y, "atlas%Jhistory-row"), L.anchor.y = .5, L.name = "row_" + h);
                            for (R = 0; R < b[g].betsHistory.bets[fa].bet.length; R++) aa = b[g].betsHistory.bets[fa].bet.slice(), aa.sort(a.mainGameManager.sortNumeric), T = -1 < b[g].betsHistory.bets[fa].winBets.indexOf(aa[R]) ? "zone_pressed" : "zone_transp", (M = L.getChildByName("rect" + h + "_" + R)) ? (M.texture = a.mainRenderer.resourceLoader.resources[T].texture,
                                M.visible = !0, M = M.getChildByName("textBet" + h + "_" + R), M.children[0].text = aa[R], M.visible = !0) : (M = a.mainRenderer.createButton(L, 32 + 56 * R, 0, T), M.scale.set(.465, .465), M.anchor.set(.5, .5), M.name = "rect" + h + "_" + R, M = a.mainRenderer.createButton(M, 0, 0, void 0, {
                                text: aa[R],
                                align: "center",
                                style: {
                                    font: "bold 80px Arial Narrow",
                                    fill: "#e0e0e0",
                                    stroke: "#000000",
                                    strokeThickness: 4,
                                    align: "center"
                                }
                            }), M.anchor.set(.5, .5), M.name = "textBet" + h + "_" + R);
                            R = void 0 != b[g].betsHistory.bets[fa].win ? formatFLGNums(b[g].betsHistory.bets[fa].win,
                                !1) : "";
                            M = b[g].betsHistory.bets[fa].summ;
                            aa = a.mainGameManager.coefficients[b[g].betsHistory.bets[fa].countWin][b[g].betsHistory.bets[fa].bet.length - 1];
                            T = formatFLGNums(M * aa, !1);
                            0 != R && R != T && (R = T, b[g].betsHistory.bets[fa].win = M * aa, a.mainRenderer.logService.setStats("\u0420\u0430\u0437\u0441\u0438\u043d\u0445\u0440\u043e\u043d \u043f\u043e \u0438\u0441\u0442\u043e\u0440\u0438\u0438 \u0441\u0442\u0430\u0432\u043e\u043a, \u0437\u0430\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e",
                                a.kenoConfig.gameKind.caption));
                            (T = L.getChildByName("summ" + h)) ? (T.children[0].text = formatFLGNums(M, !1), T.visible = !0, M = L.getChildByName("coef" + h), M.children[0].text = "X " + aa, M.visible = !0, L = L.getChildByName("win" + h), L.children[0].text = R, L.visible = !0) : (a.mainRenderer.createButton(L, 676, 0, void 0, {
                                text: formatFLGNums(M, !1),
                                align: "center",
                                style: d.detailEditionsRowFont
                            }).name = "summ" + h, a.mainRenderer.createButton(L, 821, 0, void 0, {
                                text: "X " + aa,
                                align: "center",
                                style: d.detailEditionsRowFont
                            }).name = "coef" + h, a.mainRenderer.createButton(L,
                                960, 0, void 0, {
                                    text: R,
                                    align: "center",
                                    style: d.detailEditionsRowFont
                                }).name = "win" + h)
                        }
                        aa = [];
                        C.emit("updateHeight");
                        R = M = M = M = L = T = L = C = v = null
                    }
                }
            };
            this.cancelLastEdition = function (e) {
                b.length && (b[b.length - 1].editionResult = e, b[b.length - 1].betsHistory.calculateWin(e), P(b.length - 1))
            };
            this.addEdition = function (e) {
                0 < b.length && b.find(g => void 0 === g.editionResult) && (b = b.filter(g => void 0 !== g.editionResult));
                6 <= b.length && (b[0].betsHistory.destroy && b[0].betsHistory.destroy(), b[0].betsHistory = null, b.shift());
                b.length && !b[b.length -
                1].betsHistory.bets.length ? (b[b.length - 1].round = e, b[b.length - 1].editionResult = void 0) : b.length && b[b.length - 1].round === e || (b.push({
                    round: e,
                    editionResult: void 0,
                    betsHistory: new pa([])
                }), b[b.length - 1].betsHistory.parentEditions(d));
                P(b.length - 1)
            };
            this.saveToStorage = async function () {
                localStorage.setItem("curUser", JSON.stringify({hall: clientInfoGlobal.hall, nick: clientInfoGlobal.lgn}));
                var e = [], g;
                for (g = 0; g < b.length; g++) e.push({
                    round: b[g].round,
                    editionResult: b[g].editionResult,
                    bets: b[g].betsHistory.bets
                });
                localStorage.setItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "editions", JSON.stringify(e))
            };
            this.loadFromStorage = function () {
                function e(v) {
                    $.ajax({
                        type: "get",
                        url: getUrl(),
                        data: {
                            gethistory: parseInt(a.kenoConfig.serverName.slice(3, a.kenoConfig.serverName.length)),
                            round: v.round
                        },
                        dataType: "json",
                        async: !1,
                        success: function (C, L, T) {
                            if (d && C && C.tirid0) {
                                L = [];
                                T = C.tirid0;
                                for (C = 0; 20 > C; C++) {
                                    if (99 === T["b" + C]) return;
                                    L.push(T["b" + C])
                                }
                                v.editionResult = L;
                                v.betsHistory.calculateWin(v.editionResult, !0)
                            }
                        }
                    })
                }

                if (localStorage.getItem("curUser")) {
                    var g =
                        JSON.parse(localStorage.getItem("curUser"));
                    if (g.hall !== clientInfoGlobal.hall && g.nick !== clientInfoGlobal.lgn) return
                }
                g = a.kenoConfig.gameKind + a.kenoConfig.gameType + "editions";
                if (localStorage.getItem(g)) {
                    var h = JSON.parse(localStorage.getItem(g));
                    for (g = 0; g < h.length; g++) b.push({
                        round: h[g].round,
                        editionResult: h[g].editionResult,
                        betsHistory: new pa(h[g].bets)
                    }), (!b[g].editionResult || 20 > b[g].editionResult.length) && e(b[g])
                }
            };
            d.loadFromStorage();
            P(b.length - 1);
            this.events = new PIXI.utils.EventEmitter;
            d.events.on("EDITIONS_CHANGE",
                function () {
                    d.saveToStorage()
                });
            d.events.on("RESULT_TIME", D);
            d.events.on("BET_TIME", D)
        }, q = {};
    this.animations = function () {
        return q
    };
    this.clickAnimationFunc = function (d, b) {
        d && (q[b] && (q[b].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), q[b] = (new TWEEN.Tween(d)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            q[b] = null;
            a.mainRenderer.renderManager.animationTweenInc();
            q[b] =
                (new TWEEN.Tween(d)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    q[b] = null
                }).start()
        }).start())
    };
    var Ja = function (d, b, m) {
        if (d) switch (q[b] && (q[b].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), m) {
            case "grow":
                q[b] = (new TWEEN.Tween(d.scale)).to({
                    x: 1.2,
                    y: 1.2
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    q[b] = null
                }).start();
                break;
            default:
                q[b] =
                    (new TWEEN.Tween(d)).to({alpha: .6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        q[b] = null
                    }).start()
        }
    }, Ia = function (d, b, m) {
        q[b] && (q[b].stop(), a.mainRenderer.renderManager.animationTweenDec());
        if (d && 0 != d.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(), m) {
            case "grow":
                q[b] = (new TWEEN.Tween(d.scale)).to({
                    x: 1,
                    y: 1
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    q[b] = null
                }).start();
                break;
            default:
                q[b] = (new TWEEN.Tween(d)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    q[b] = null
                }).start()
        }
    }, Pa = function (d, b, m) {
        if (d.container) {
            q[m] && q[m].stop();
            if (d.onStartClose) d.onStartClose();
            a.mainRenderer.renderManager.animationTweenInc();
            q[m] = (new TWEEN.Tween(d.container.scale)).to({y: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                if (d.onStopClose) d.onStopClose();
                if (b.onStopOpen) b.onStopOpen();
                a.mainRenderer.renderManager.animationTweenDec();
                q[m] = null;
                d.container.scale.y = 0;
                b.container.scale.y = 1
            }).onComplete(function () {
                if (d.onStopClose) d.onStopClose();
                a.mainRenderer.renderManager.animationTweenDec();
                q[m] = null;
                if (b.onStartOpen) b.onStartOpen();
                a.mainRenderer.renderManager.animationTweenInc();
                q[m] = (new TWEEN.Tween(b.container.scale)).to({y: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                    if (d.onStopClose) d.onStopClose();
                    if (b.onStopOpen) b.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    q[m] = null;
                    d.container.scale.y =
                        0;
                    b.container.scale.y = 1
                }).onComplete(function () {
                    if (b.onStopOpen) b.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    q[m] = null
                }).start()
            }).start()
        }
    }, Ha = function (d, b, m) {
        d && (m ? (q[b].stop(), q[b + "chain"] && (TWEEN.remove(q[b + "chain"]), a.mainRenderer.renderManager.animationTweenDec(), q[b + "chain"] = null)) : (a.mainRenderer.renderManager.animationTweenInc(), q[b] = (new TWEEN.Tween(d)).to({rotation: Math.PI / 24}, 330).easing(TWEEN.Easing.Linear.None).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            q[b] = null;
            d.rotation = 0
        }), a.mainRenderer.renderManager.animationTweenInc(), q[b + "chain"] = (new TWEEN.Tween(d)).to({rotation: -Math.PI / 24}, 330).easing(TWEEN.Easing.Linear.None).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            q[b + "chain"] = null;
            d.rotation = 0
        }), q[b].chain(q[b + "chain"]), q[b + "chain"].chain(q[b]), q[b].start()))
    }, oa = function (d, b, m) {
        d && (q[b] ? q[b].stop() : (a.mainRenderer.renderManager.animationTweenInc(), q[b] = (new TWEEN.Tween(d.position)).to({x: m}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            q[b] = null
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            q[b] = null
        }).start()))
    };
    this.simpleFlipXFunc = function (d, b, m, f, w, r) {
        q[b] && q[b].stop();
        var u = d.scale.x;
        a.mainRenderer.renderManager.animationTweenInc();
        q[b] = (new TWEEN.Tween(d.scale)).to({x: 0}, m).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            q[b] = null;
            d.scale.x = u
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            q[b] = null;
            w && w(d);
            a.mainRenderer.renderManager.animationTweenInc();
            q[b] = (new TWEEN.Tween(d.scale)).to({x: u}, f).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                q[b] = null;
                d.scale.x = u;
                r && r(d)
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                q[b] = null;
                r && r(d)
            }).start()
        }).start()
    };
    var Aa, Ba, sa = !1, Da = function (d, b = !1) {
        b && "v" === d && "es" === localLanguage() && (d = "v_es");
        switch (d) {
            case "blue":
            case "x1":
                return "blue";
            case "red":
            case "x2":
                return "red";
            case "v_es":
                return "kenov_sp";
            default:
                return d
        }
    };
    Y = Da(ja.toLowerCase());
    Da = Da(ja.toLowerCase(),
        !0);
    var ra = [["gmName_K", y + "NG/gmNames/" + ca.nameImage[0] + ".png"], ["gmName_E", y + "NG/gmNames/" + ca.nameImage[1] + ".png"], ["gmName_N", y + "NG/gmNames/" + ca.nameImage[2] + ".png"], ["gmName_O", y + "NG/gmNames/" + ca.nameImage[3] + ".png"], ["gmName_min", y + "NG/gmNames/" + ca.nameImage[4] + ".png"], ["JP", y + "WinJP/jp-jackpot-win.png"], ["jp_only", y + "WinJP/jp-jackpot-only.png"], ["WIN", y + "WinJP/jp-bigwin.png"], ["table_coef", y + "table_coefficients_" + Da + ".png"], ["autoplay_bg", y + "NG/mobile/autoplay-bg2.png"], ["tab_bg", y + "NG/mobile/video-bg.png"],
        ["menu_bg", y + "NG/mobile/menu-bg2.png"], ["zone_transp", y + "NG/mobile/zone.png"], ["zone_selected", y + "NG/mobile/zone-selected.png"], ["zone_pressed", y + "NG/mobile/zone-action.png"], ["zone_win", y + "NG/mobile/zone-win.png"], ["zone_lock", y + "NG/mobile/zone-lock.png"], ["zone_lock2", y + "NG/mobile/zone-lock2.png"], ["table_bg", y + "NG/mobile/table-bg.png"], ["hotcold_bg", y + "NG/mobile/hotcold-bg-mobile.png"], ["eye_icon", y + "NG/eye-icon-min.png"], ["eye_closed_icon", y + "NG/eye-closed-icon-min.png"], ["btn_video_load", y + "NG/mobile/btn-video-load.png"],
        ["atlas", y + "NG/mobile/sprite/kenoM-min.json"], ["atlas2", y + "NG/mobile/sprite/kenoM-bg.json"], ["menu_btn_middle_flat", y + "NG/mobile/menu-btn-middle-flat.png"], ["menu_btn_middle_flat_pressed", y + "NG/mobile/menu-btn-middle-flat-pressed.png"], ["menu_btn_large", y + "NG/mobile/menu-btn-grand.png"], ["menu_btn_large_pressed", y + "NG/mobile/menu-btn-grand-pressed.png"], ["table_header", y + "NG/mobile/bet-header-mobile_.png"], ["table_footer", y + "NG/mobile/bet-footer-mobile.png"], ["video_skin", y + "NG/mobile/video-skin-" +
        Y + "_.jpg"], ["video_skin_off", y + "NG/mobile/video-skin-off-" + Y + "_.jpg"], ["video_play", y + "NG/mobile/play-on.png"], ["video_play_off", y + "NG/mobile/play-off.png"], ["btn_plus", y + "NG/mobile/plus_.png"], ["btn_plus_pressed", y + "NG/mobile/plus-pressed_.png"], ["btn_square", y + "NG/mobile/plus.png"], ["btn_square_pressed", y + "NG/mobile/plus-pressed.png"], ["autoplay", y + "NG/mobile/btn-autoplay.png"], ["autoplay_pressed", y + "NG/mobile/btn-autoplay-pressed.png"], ["random", y + "NG/mobile/random_.png"], ["random_pressed", y + "NG/mobile/random_pressed_.png"],
        ["random_num", y + "NG/mobile/random_num_.png"], ["random_num_pressed", y + "NG/mobile/random_num_pressed_.png"], ["btn_menu_small", y + "NG/mobile/btn-menu-small.png"], ["btn_menu_small_pressed", y + "NG/mobile/btn-menu-small-pressed.png"], ["btn_balance_small", y + "NG/mobile/btn-balance-small.png"], ["btn_balance_small_pressed", y + "NG/mobile/btn-balance-small-pressed.png"], ["bet", y + "NG/mobile/btn-balance2.png"]];
    ra = ra.concat(a.mainFLGAccount.resources);
    ra = ra.concat(ea.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage,
        FLGUtils.staticRootPath + "images/logo.json", ra, function (d, b, m) {
            a.mainRenderer.createButton(void 0, 0, 0, "atlas2%J" + a.kenoConfig.BG);
            Q = a.mainRenderer.createButton(void 0, 123, 42);
            Q.anchor.set(.5, .5);
            a.mainRenderer.createButton(Q, -87.75, 0, "gmName_K");
            Q.children[0].anchor.set(.5, .5);
            Q.children[0].scale.set(.65, .65);
            a.mainRenderer.createButton(Q, -82 * .65, 0, "gmName_E");
            Q.children[1].anchor.set(.5, .5);
            Q.children[1].scale.set(.65, .65);
            a.mainRenderer.createButton(Q, -18.2, 0, "gmName_N");
            Q.children[2].anchor.set(.5,
                .5);
            Q.children[2].scale.set(.65, .65);
            a.mainRenderer.createButton(Q, 24.7, 0, "gmName_O");
            Q.children[3].anchor.set(.5, .5);
            Q.children[3].scale.set(.65, .65);
            a.mainRenderer.createButton(Q, 82.55, 0, "gmName_min");
            Q.children[4].anchor.set(.5, .5);
            Q.children[4].scale.set(.65, .65);
            Na = setInterval(Oa, 1E4);
            I = new PIXI.Graphics;
            I.position.x = 249;
            I.position.y = 21;
            I.beginFill(0);
            I.drawRoundedRect(0, 0, 392, 40, 11);
            I.endFill;
            var f = a.mainRenderer.createButton(I, 275, 20, void 0, {
                text: "00:00", align: "left", style: {
                    font: "bold 40px Arial",
                    fill: "#e8a023"
                }
            });
            f.anchor.set(.5, .5);
            f = a.mainRenderer.createButton(I, 15, 20, void 0, {
                text: "#",
                align: "left",
                style: {font: "24px Arial", fill: "#e8a023"}
            });
            f.anchor.set(.5, .5);
            I.addChild(new PIXI.Graphics);
            I.children[2].beginFill(42577);
            I.children[2].drawRoundedRect(3, 3, 386, 34, 9);
            I.children[2].endFill;
            f = a.mainRenderer.createButton(I.children[2], 275, 20, void 0, {
                text: "00:00",
                align: "left",
                style: {font: "bold 40px Arial", fill: "#000000"}
            });
            f.anchor.set(.5, .5);
            f = a.mainRenderer.createButton(I.children[2], 15, 20, void 0,
                {text: "#", align: "left", style: {font: "24px Arial", fill: "#000000"}});
            f.anchor.set(.5, .5);
            d = new PIXI.Graphics;
            d.beginFill();
            d.drawRoundedRect(3, 3, 386, 34, 9);
            d.endFill;
            I.children[2].mask = d;
            I.children[2].parent.addChild(d);
            d = null;
            a.mainRenderer.stage.addChild(I);
            a.mainRenderer.createButton(void 0, 1020, 41, void 0, {
                text: mainLocalizationTable.totalBet.toUpperCase() + ":",
                align: "right",
                style: {font: "bold 26px Arial", fill: "#c7c7c7"}
            });
            a.mainRenderer.createButton(void 0, 1040, 41, void 0, {
                text: formatFLGNums(a.mainFLGAccount.totalBet()),
                align: "left", style: {font: "bold 44px Arial", fill: "#e8a023"}
            }).name = "betTxt";
            Aa = function (c) {
                a.mainRenderer.stage.getChildByName("betTxt").children[0].text = formatFLGNums(c);
                a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("betTxt").children[0])
            };
            a.mainFLGAccount.events.on("onBet", Aa);
            f = a.mainRenderer.createButton(z, 1176, 837, "btn_menu_small");
            d = a.mainRenderer.createButton(f, 0, 0, "btn_menu_small_pressed", void 0, function (c, l) {
                a.mainSoundManager.playSound("buttonClick");
                l.stopped = !0;
                O.clickAnimationFunc(c, "btn_menu");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (c, l) {
                oa(X, "menuContainer", 1174);
                a.mainRenderer.renderManager.needUpdateRender = !0
            });
            d.alpha = 0;
            d = null;
            a.mainRenderer.createButton(f, f.width / 2, f.height / 2, void 0, {
                text: mainLocalizationTable.menu.toUpperCase(),
                align: "center",
                style: {font: "bold 36px Arial Narrow", fill: "#323232"}
            });
            "srv58" !== a.kenoConfig.serverName && (f = a.mainRenderer.createButton(z, 1391, 951, "autoplay"), a.mainRenderer.createButton(f, 0, 0, "autoplay_pressed",
                void 0, function (c, l) {
                    a.mainSoundManager.playSound("buttonClick");
                    l.stopped = !0;
                    O.clickAnimationFunc(c, "autoplay");
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, function (c, l) {
                    oa(x.getChildByName("autoplay_bg"), "autoplayContainer", 1174);
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }).alpha = 0, a.mainRenderer.createButton(f, f.width / 2, f.height / 2, void 0, {
                text: mainLocalizationTable.autoPlay.toUpperCase(),
                align: "center",
                style: {font: "bold 36px Arial Narrow", fill: "#323232"}
            }).name = "autoplay_btn_title",
                a.mainRenderer.createButton(f, .83 * f.width, f.height / 2, void 0, {
                    text: "",
                    align: "center",
                    style: {font: "bold 60px Arial Narrow", fill: "#323232"}
                }).name = "autoplay_remain_num");
            f = a.mainRenderer.createButton(z, 1391, 837, "random");
            a.mainRenderer.createButton(f, 0, 0, "random_pressed", void 0, function (c, l) {
                a.mainGrid.removeCurrentBets();
                a.mainGrid.createRandomBets();
                var n = z.getChildByName("btn_plus");
                n && n.interactive && (n.emit("mousedown"), n.emit("mouseup"));
                za();
                l.stopped = !0;
                O.clickAnimationFunc(c, "random");
                a.mainRenderer.renderManager.needUpdateRender =
                    !0
            }).alpha = 0;
            a.mainRenderer.createButton(f, f.width / 2, f.height / 2, void 0, {
                text: mainLocalizationTable.random.toUpperCase(),
                align: "center",
                style: {font: "bold 32px Arial Narrow", fill: "#323232"}
            });
            d = localStorage.getItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "randomCount") ? JSON.parse(localStorage.getItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "randomCount")) : 1;
            f = a.mainRenderer.createButton(z, 1583, 837, "random_num", {
                text: d,
                align: "center",
                style: {font: "bold 60px Arial Narrow", fill: "#323232"}
            });
            a.mainRenderer.createButton(f,
                0, 0, "random_num_pressed", void 0, function (c, l) {
                    a.mainSoundManager.playSound("buttonClick");
                    c.parent.children[0].text = c.parent.children[2].children[0].text = a.mainGrid.incrementRandomCount(parseInt(c.parent.children[0].text));
                    localStorage.setItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "randomCount", JSON.stringify(parseInt(c.parent.children[0].text)));
                    l.stopped = !0;
                    O.clickAnimationFunc(c, "random_num");
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }).alpha = 0;
            a.mainRenderer.createButton(f, f.width /
                2, f.height / 2, void 0, {
                text: d,
                align: "center",
                style: {font: "bold 60px Arial Narrow", fill: "#323232"}
            });
            f = a.mainRenderer.createButton(z, 1676, 837, "btn_plus", void 0, function (c, l) {
                a.mainSoundManager.playSound("buttonClick");
                if (0 < a.mainGrid.pressedZones.length) {
                    c.interactive = !1;
                    z.getChildByName("random").children[0].interactive = !1;
                    var n = a.mainGrid.getIntArrayOfPressedZones(), K = function () {
                        B.getActedOutEdition().betsHistory.addBet({
                                summ: U.currentBet(),
                                bet: n,
                                winBets: [],
                                countWin: 0,
                                win: void 0
                            }, B.getActedOutEdition().round,
                            function (E) {
                                if (E) {
                                    a.mainFLGAccount.maxWin(0);
                                    for (var P in n) switch (E = a.mainGrid.zones[n[P] - 1], E.emit("mousedown"), E.emit("mouseup"), E.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, E.isLock ? E.isLock++ : E.isLock = 1, E.isLock) {
                                        case 1:
                                            E.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                            break;
                                        default:
                                            E.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                                    }
                                }
                                c.interactive = !0;
                                z.getChildByName("random").children[0].interactive = !0;
                                z.getChildByName("btn_plus").texture =
                                    a.mainRenderer.resourceLoader.resources.btn_plus.texture;
                                a.mainRenderer.renderManager.needUpdateRender = !0
                            })
                    };
                    U.isMaxBet() ? showAgreeDlg(K, function () {
                        c.interactive = !0;
                        z.getChildByName("random").children[0].interactive = !0;
                        z.getChildByName("btn_plus").texture = a.mainRenderer.resourceLoader.resources.btn_plus.texture;
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }) : K()
                }
                l && (l.stopped = !0);
                a.mainRenderer.renderManager.needUpdateRender = !0
            });
            b = a.mainRenderer.createButton(z, 1676, 837, "btn_square", void 0, function (c,
                                                                                          l) {
                c.isPlay ? (G.game.button.emit("mousedown"), c.getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture, z.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture, c.texture = a.mainRenderer.resourceLoader.resources.btn_square.texture, c.isPlay = !1) : (G.video.button.emit("mousedown"), c.getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play_off.texture, z.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin_off.texture,
                    c.texture = a.mainRenderer.resourceLoader.resources.btn_square_pressed.texture, c.isPlay = !0);
                l.stopped = !0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            });
            b.name = "videoPlayBtn";
            b.visible = !1;
            a.mainRenderer.createButton(b, b.width / 2, b.height / 2, "video_play").anchor.set(.5, .5);
            f = a.mainRenderer.createButton(z, 1770, 265, "video_skin", void 0, function (c, l) {
                z.getChildByName("videoPlayBtn").isPlay ? (G.game.button.emit("mousedown"), z.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture,
                    c.texture = a.mainRenderer.resourceLoader.resources.video_skin.texture, z.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_square.texture, z.getChildByName("videoPlayBtn").isPlay = !1) : (G.video.button.emit("mousedown"), z.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play_off.texture, c.texture = a.mainRenderer.resourceLoader.resources.video_skin_off.texture, z.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_square_pressed.texture,
                    z.getChildByName("videoPlayBtn").isPlay = !0)
            });
            f.anchor.set(.5, .5);
            a.mainRenderer.createButton(x, 1920, 367, "autoplay_bg");
            x.interactive = !0;
            a.mainRenderer.createButton(x.getChildByName("autoplay_bg"), 373, 68, void 0, {
                text: mainLocalizationTable.autoPlay.toUpperCase(),
                align: "center",
                style: {font: "bold 90px Arial Narrow", fill: "#ffffff"}
            });
            a.mainRenderer.createButton(x.getChildByName("autoplay_bg"), 370, 180, void 0, {
                text: mainLocalizationTable.autoplayRoundNumber, align: "center", style: {
                    font: "40px Arial Narrow",
                    fill: "#ffffff"
                }
            }).name = "autoplayDesc1";
            a.mainRenderer.createButton(x.getChildByName("autoplay_bg"), 370, 473, void 0, {
                text: mainLocalizationTable.autoplayStart,
                align: "center",
                style: {font: "40px Arial Narrow", fill: "#ffffff"}
            }).name = "autoplayDesc2";
            a.mainRenderer.createButton(x.getChildByName("autoplay_bg"), 662, 38, "atlas%Jautoplay-close", void 0, function (c, l) {
                a.mainSoundManager.playSound("buttonClick");
                l.stopped = !0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (c, l) {
                oa(x.getChildByName("autoplay_bg"),
                    "autoplayContainer", 1920);
                a.mainRenderer.renderManager.needUpdateRender = !0
            });
            if ("srv58" !== a.kenoConfig.serverName) for (b = 0; 3 > b; b++) {
                f = a.mainRenderer.createButton(x.getChildByName("autoplay_bg"), 23 + 221 * b + 18 * b, 233, "atlas%Jautoplay-num");
                var w = void 0;
                switch (b) {
                    case 0:
                        w = "5";
                        break;
                    case 1:
                        w = "10";
                        break;
                    case 2:
                        w = "50"
                }
                f.name += w;
                a.mainRenderer.createButton(f, 0, 0, "atlas%Jautoplay-num-pressed", void 0, function (c, l) {
                    a.mainSoundManager.playSound("chipSelector");
                    l.stopped = !0;
                    O.clickAnimationFunc(c, "autoplay-num" +
                        c.parent.position.x);
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, function (c, l) {
                    a.mainFLGAccount.autoplayManager.settings.isStarted(!0);
                    a.mainFLGAccount.autoplayManager.settings.count(parseInt(c.parent.children[1].children[0].text));
                    a.mainFLGAccount.autoplayManager.updateCallback("getOnlyBets");
                    a.mainFLGAccount.autoplayManager.settings.isStarted() && (z.getChildByName("autoplay").getChildByName("autoplay_remain_num").children[0].text = c.parent.children[1].children[0].text, z.getChildByName("autoplay").getChildByName("autoplay_btn_title").children[0].text =
                        mainLocalizationTable.autoPlay.toUpperCase() + "        ", x.getChildByName("autoplay_bg").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRemainingNumber + ": " + c.parent.children[1].children[0].text, x.getChildByName("autoplay_bg").getChildByName("autoplayDesc2").visible = !1, x.getChildByName("autoplay_bg").getChildByName("autoplay-num5").visible = !1, x.getChildByName("autoplay_bg").getChildByName("autoplay-num10").visible = !1, x.getChildByName("autoplay_bg").getChildByName("autoplay-num50").visible =
                        !1, x.getChildByName("autoplay_bg").getChildByName("autoplaySelected").children[0].text = c.parent.children[1].children[0].text, x.getChildByName("autoplay_bg").getChildByName("autoplaySelected").visible = !0, x.getChildByName("autoplay_bg").getChildByName("autoplay-stop").visible = !0, x.getChildByName("autoplay_bg").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.menu_btn_large_pressed.texture, x.getChildByName("autoplay_bg").getChildByName("repeat").children[0].interactive = !1);
                    oa(x.getChildByName("autoplay_bg"),
                        "autoplayContainer", 1920);
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }).alpha = 0;
                a.mainRenderer.createButton(f, f.width / 2, f.height / 2, void 0, {
                    text: w,
                    align: "center",
                    style: {font: "bold 120px Arial Narrow", fill: "#363636"}
                })
            }
            f = a.mainRenderer.createButton(x.getChildByName("autoplay_bg"), 23, 539, "atlas%Jmenu-btn-grand2");
            f.name = "repeat";
            a.mainRenderer.createButton(f, 0, 0, "atlas%Jautoplay-repeat-pressed", void 0, function (c, l) {
                a.mainSoundManager.playSound("buttonClick");
                l.stopped = !0;
                O.clickAnimationFunc(c,
                    "repeat");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (c, l) {
                c.parent.texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"];
                c.interactive = !1;
                a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet");
                oa(x.getChildByName("autoplay_bg"), "autoplayContainer", 1920);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }).alpha = 0;
            a.mainRenderer.createButton(f, f.width / 2, f.height / 2, void 0, {
                text: mainLocalizationTable.autoplayRepeatLastBet.toUpperCase(),
                align: "center", style: {font: "bold 50px Arial Narrow", fill: "#363636"}
            });
            a.mainRenderer.createButton(x.getChildByName("autoplay_bg"), 23, 233, "atlas%Jautoplay-num-pressed", {
                text: "",
                align: "center",
                style: {font: "bold 120px Arial Narrow", fill: "#363636"}
            }).name = "autoplaySelected";
            x.getChildByName("autoplay_bg").getChildByName("autoplaySelected").visible = !1;
            f = a.mainRenderer.createButton(x.getChildByName("autoplay_bg"), 262, 264, "atlas%Jautoplay-stop");
            a.mainRenderer.createButton(f, 0, 0, "atlas%Jautoplay-stop-pressed",
                void 0, function (c, l) {
                    a.mainSoundManager.playSound("buttonClick");
                    l.stopped = !0;
                    O.clickAnimationFunc(c, "autoplay-stop");
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, function (c, l) {
                    a.mainFLGAccount.autoplayManager.stop();
                    a.mainFLGAccount.autoplayManager.settings.isStarted() || (z.getChildByName("autoplay").getChildByName("autoplay_remain_num").children[0].text = "", z.getChildByName("autoplay").getChildByName("autoplay_btn_title").children[0].text = mainLocalizationTable.autoPlay.toUpperCase(), x.getChildByName("autoplay_bg").getChildByName("autoplayDesc1").children[0].text =
                        mainLocalizationTable.autoplayRoundNumber, x.getChildByName("autoplay_bg").getChildByName("autoplayDesc2").visible = !0, x.getChildByName("autoplay_bg").getChildByName("autoplay-num5").visible = !0, x.getChildByName("autoplay_bg").getChildByName("autoplay-num10").visible = !0, x.getChildByName("autoplay_bg").getChildByName("autoplay-num50").visible = !0, x.getChildByName("autoplay_bg").getChildByName("autoplaySelected").visible = !1, x.getChildByName("autoplay_bg").getChildByName("autoplay-stop").visible = !1, a.mainFLGAccount.autoplayManager.settings.repeatRoundNum() !==
                    B.editions[B.editions.length - 1].round && 1 < B.editions.length && B.editions[B.editions.length - 2].betsHistory.bets.length && (x.getChildByName("autoplay_bg").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand2"], x.getChildByName("autoplay_bg").getChildByName("repeat").children[0].interactive = !0));
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }).alpha = 0;
            a.mainRenderer.createButton(f, f.width / 2, f.height / 2, void 0, {
                text: mainLocalizationTable.autoplayStop,
                align: "center", style: {font: "bold 50px Arial Narrow", fill: "#363636"}
            });
            x.getChildByName("autoplay_bg").getChildByName("autoplay-stop").visible = !1;
            X.position.set(1920, 218);
            w = new PIXI.Graphics;
            w.beginFill(a.kenoConfig.menuBgColor);
            w.drawRect(0, 142, 746, 698);
            w.endFill;
            X.addChild(w);
            w = new PIXI.Graphics;
            w.beginFill(0, .6);
            w.drawRect(0, 142, 746, 698);
            w.endFill;
            X.addChild(w);
            X.interactive = !0;
            f = a.mainRenderer.createButton(z, 1176, 951, "btn_balance_small");
            f.name = "bet_on_autoplay";
            a.mainRenderer.createButton(f, 0,
                0, "btn_balance_small_pressed", void 0, function (c, l) {
                    a.mainSoundManager.playSound("chipSelector");
                    U.incrementBet();
                    var n = z.getChildByName("bet_on_autoplay").getChildByName("betText").children[0];
                    "srv58" === a.kenoConfig.serverName && U.isMaxBet() && U.incrementBet();
                    U.isMaxBet() ? n.text = "MAX\n" + na : n.text = U.currentBet();
                    localStorage.setItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "defaultBet", JSON.stringify(U.currentBet()));
                    a.mainUIManager.setTextScale(n);
                    za();
                    l.stopped = !0;
                    O.clickAnimationFunc(c, "btn_balance_small");
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }).alpha = 0;
            a.mainRenderer.createButton(f, f.width / 2, f.height / 2, void 0, {
                text: mainLocalizationTable.bet.toUpperCase(),
                align: "center",
                style: {font: "bold 28px Arial Narrow", fill: "#323232"}
            });
            f.children[1].children[0].anchor.set(.5, -.5);
            f = a.mainRenderer.createButton(z.getChildByName("bet_on_autoplay"), 106, 39, void 0, {
                text: U.currentBet(),
                align: "center",
                style: {font: "bold 48px Arial", fill: "#e8a023", align: "center"}
            });
            f.name = "betText";
            f.anchor.set(.5, .5);
            a.mainUIManager.setTextScale(z.getChildByName("bet_on_autoplay").getChildByName("betText").children[0]);
            f = a.mainRenderer.createButton(X, 25, 165, "menu_btn_middle_flat");
            a.mainRenderer.createButton(f, 0, 0, "menu_btn_middle_flat_pressed", void 0, function (c, l) {
                a.mainSoundManager.playSound("buttonClick");
                l.stopped = !0;
                O.clickAnimationFunc(c, "btn_home");
                a.mainFLGAccount.closeGame();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }).alpha = 0;
            a.mainRenderer.createButton(f, 171, 62, "atlas%Jhome-sign");
            f.getChildByName("home-sign").anchor.set(.5, .5);
            APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && f && (f.visible =
                clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl);
            f = a.mainRenderer.createButton(X, 387, 165, "menu_btn_middle_flat", void 0);
            f.name = "btn_sound_outer";
            a.mainRenderer.createButton(f, 0, 0, "menu_btn_middle_flat_pressed", void 0, function (c, l) {
                a.mainSoundManager.playSound("buttonClick");
                l.stopped = !0;
                O.clickAnimationFunc(c, "btn_volume");
                a.mainSoundManager.muteSound(!a.mainSoundManager.isMuted());
                localStorage.setItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "muteSound", a.mainSoundManager.isMuted());
                c.parent.getChildByName("volume-sign").texture =
                    a.mainRenderer.resourceLoader.resources.atlas.textures[a.mainSoundManager.isMuted() ? "mute-sign" : "volume-sign"];
                a.mainRenderer.renderManager.needUpdateRender = !0
            }).alpha = 0;
            a.mainRenderer.createButton(f, 171, 62, "atlas%Jvolume-sign");
            f.getChildByName("volume-sign").anchor.set(.5, .5);
            localStorage.getItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "muteSound") && !0 === JSON.parse(localStorage.getItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "muteSound")) && (a.mainSoundManager.muteSound(!0), X.getChildByName("btn_sound_outer").getChildByName("volume-sign").texture =
                a.mainRenderer.resourceLoader.resources.atlas.textures["mute-sign"]);
            f = a.mainRenderer.createButton(X, 22, 705, "menu_btn_large", {
                text: mainLocalizationTable.close.toUpperCase(),
                align: "center",
                style: {font: "bold 50px Arial", fill: "#323232"}
            }, function (c, l) {
                c.texture = a.mainRenderer.resourceLoader.resources.menu_btn_large_pressed.texture;
                c.children[0].style = {font: "bold 50px Arial", fill: "#ffffff"};
                l.stopped = !0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (c, l) {
                c.texture = a.mainRenderer.resourceLoader.resources.menu_btn_large.texture;
                c.children[0].style = {font: "bold 50px Arial", fill: "#323232"};
                oa(X, "menuContainer", 1920);
                G.game.button.emit("mousedown");
                z.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture;
                z.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture;
                z.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_square.texture;
                z.getChildByName("videoPlayBtn").isPlay = !1;
                a.mainRenderer.renderManager.needUpdateRender =
                    !0
            });
            for (var r in G) {
                switch (r) {
                    case "game":
                        f = a.mainRenderer.createButton(ka, 586, 628, void 0);
                        break;
                    case "history":
                        f = a.mainRenderer.createButton(ka, 586, 625, "tab_bg");
                        break;
                    case "stats":
                        f = a.mainRenderer.createButton(ka, 586, 625, "tab_bg");
                        break;
                    case "video":
                        f = a.mainRenderer.createButton(ka, 586, 625, void 0);
                        break;
                    case "info":
                        f = a.mainRenderer.createButton(ka, 586, 625, void 0), a.mainRenderer.createButton(f, 550, 396, void 0, {
                            text: "v1.35",
                            align: "right",
                            style: {font: "bold 30px Arial Narrow", fill: "#ffffff"}
                        }).alpha =
                            .25
                }
                f.name = r;
                f.anchor.set(.5, .5);
                f.scale.y = 0;
                G[r].container = f;
                if ("V" !== a.kenoConfig.gameType || "stats" !== r) (function (c) {
                    f = a.mainRenderer.createButton(X, G[r].posX, G[r].posY, "game" == r ? "menu_btn_large" : "menu_btn_middle_flat", {
                        text: G[r].text,
                        align: "center",
                        style: {font: "bold 50px Arial", fill: "#323232"}
                    }, function (l, n) {
                        if (!l.pressed) if ("history" === c && FLGUtils && FLGUtils.showGamerHistory) FLGUtils.showGamerHistory(); else {
                            l.texture = a.mainRenderer.resourceLoader.resources["game" == l.name ? "menu_btn_large_pressed" :
                                "menu_btn_middle_flat_pressed"].texture;
                            l.children[0].style = {font: "bold 50px Arial", fill: "#ffffff"};
                            a.mainSoundManager.playSound("buttonClick");
                            for (var K in G) G[K].button && G[K].button.pressed && (G[K].button.pressed = !1, G[K].button.texture = a.mainRenderer.resourceLoader.resources["game" == K ? "menu_btn_large" : "menu_btn_middle_flat"].texture, G[K].button.children[0].style = {
                                font: "bold 50px Arial",
                                fill: "#323232"
                            }, Pa(G[K], G[l.name], "flipContainer"));
                            l.pressed = !0;
                            n && (n.stopped = !0);
                            a.mainRenderer.renderManager.needUpdateRender =
                                !0
                        }
                    })
                })(r), f.name = r, G[r].button = f, G[r].pressedDefault && (G[r].button.pressed = !0, G[r].button.texture = a.mainRenderer.resourceLoader.resources["game" == r ? "menu_btn_large_pressed" : "menu_btn_middle_flat_pressed"].texture, G[r].button.children[0].style = {
                    font: "bold 50px Arial",
                    fill: "#ffffff"
                }, G[r].container.scale.y = 1)
            }
            w = {x: 599, y: 524};
            "srv58" === a.kenoConfig.serverName && "es" === utils.getCurrentLang() ? (w = new MaskedSprite(a.mainRenderer.createButton(G.info.container, 0, 0), {
                mask: {
                    x: 60 - w.x, y: -450, width: 1070, height: 800,
                    color: 16777215
                }, needScrolling: {}
            }, a.mainRenderer.renderManager), w.srcSprite.interactive = !0, w = w.containerForScroll, f = a.mainRenderer.createButton(w, 0, -450, "table_coef"), f.anchor.set(.5, 0), w.emit("updateHeight")) : (f = a.mainRenderer.createButton(G.info.container, 598 - w.x, 214 - w.y + 10, void 0, {
                text: mainLocalizationTable.coefHeader.toUpperCase(),
                align: "center",
                style: {font: "bold 34px Arial", fill: "#ffffff", align: "center"}
            }), f.anchor.set(.5, .5), f = a.mainRenderer.createButton(G.info.container, -518, -263, "table_coef"));
            f.scale.set(1, 1);
            if ("srv58" !== a.kenoConfig.serverName || "es" !== utils.getCurrentLang()) {
                var u = {font: "bold 30px Arial", fill: "#313131"};
                b = new PIXI.Text(mainLocalizationTable.selectedBalls.toUpperCase(), u);
                b.position.set(571, 23);
                b.anchor.set(.5, .5);
                f.addChild(b);
                w = 3;
                var A = 108, N = 70;
                for (b = 1; 11 > b; b++) {
                    var k = 9 < b ? 134 : 7 < b ? 105 : 7 == b ? 106 : 3 < b ? 90 : 60;
                    A += k;
                    var p = new PIXI.Text(b, u);
                    p.position.set(A - Math.round(k / 2), N);
                    p.anchor.set(.5, .5);
                    f.addChild(p);
                    A += w
                }
                b = new PIXI.Text(mainLocalizationTable.guessedBalls.toUpperCase(),
                    u);
                b.position.set(22, 335);
                b.anchor.set(.5, .5);
                b.rotation = -Math.PI / 2;
                f.addChild(b);
                A = 76;
                N = 115;
                k = 41;
                for (b = 0; 11 > b; b++) p = new PIXI.Text(b, u), p.position.set(A, N), p.anchor.set(.5, .5), f.addChild(p), N += k + w;
                u = {font: "bold 30px Arial", fill: "#dbdbdb"};
                var t;
                A = 109;
                N = 94;
                w = 4;
                for (b = 0; b < a.mainGameManager.coefficients.length; b++) {
                    N += 40;
                    for (t = 0; t < a.mainGameManager.coefficients[b].length; t++) k = 8 < t ? 133 : 6 == t ? 103 : 5 < t ? 105 : 2 < t ? 89 : 0 == t ? 58 : 59, A += k, 0 != a.mainGameManager.coefficients[b][t] && (p = new PIXI.Text(a.mainGameManager.coefficients[b][t],
                        u), p.position.set(A - Math.round(k / 2), N - 20), p.anchor.set(.5, .5), f.addChild(p)), A += w;
                    A = 110;
                    N += w
                }
            }
            w = p = b = u = u = null;
            qa = new V(6, 78, 73, a.mainRenderer.stage, !0);
            f = a.mainRenderer.createButton(void 0, 1553, 20, "bet", {
                text: "DEMO" == clientInfoGlobal.hall ? "DEMO" : formatFLGNums(a.mainFLGAccount.balance()),
                align: "center",
                style: {font: "bold 65px Arial", fill: "#e8a023"}
            }, function () {
            });
            f.name = "balanceTxt";
            f.children[0].anchor.y = .77;
            a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("balanceTxt").children[0]);
            a.mainRenderer.createButton(f, f.width / 2, .8 * f.height, void 0, {
                text: mainLocalizationTable.balance.toUpperCase(),
                align: "center",
                style: {font: "bold 30px Arial Narrow", fill: "#323232"}
            });
            Ba = function (c) {
                a.mainRenderer.stage.getChildByName("balanceTxt").children[0].text = "DEMO" == clientInfoGlobal.hall ? "DEMO" : formatFLGNums(c);
                a.mainUIManager.setTextHeaderScale(a.mainRenderer.stage.getChildByName("balanceTxt").children[0])
            };
            a.mainFLGAccount.events.on("onBalance", Ba);
            f = null;
            a.mainRenderer.stage.addChild(z);
            a.mainRenderer.stage.addChild(ka);
            a.mainRenderer.stage.addChild(Ga);
            a.mainRenderer.stage.addChild(X);
            a.mainRenderer.stage.addChild(x);
            a.setMainGrid(new Grid(-562, -436, 10, 8, 10, G.game.container, a.mainRenderer));
            a.mainGrid.setRandomBetsCount(parseInt(d));
            a.mainGrid.createZones(108, 104, {x: 5, y: 5}, {
                font: "bold 65px Arial Narrow",
                fill: "#e0e0e0",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center"
            }, function (c, l, n) {
                if (c.selected || !(a.mainGrid.pressedZones.length >= a.mainGrid.maxPreessedZones)) {
                    l ? c.selected || (c.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture) :
                        a.mainGrid.gridContainer.down = !0;
                    if (l && a.mainGrid.gridContainer.down || !l && !n || n && (c.name != ua || void 0 == ua)) if (c.selected) {
                        if (-1 != a.mainGrid.selectedZones.indexOf(c)) if (c.isLock) switch (c.isLock) {
                            case 1:
                                c.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                break;
                            default:
                                c.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                        } else c.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture; else c.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture;
                        c.selected =
                            !1;
                        a.mainGrid.pressedZones.splice(a.mainGrid.pressedZones.indexOf(c), 1);
                        Ha(c, "rotate" + c.children[0].text, !0)
                    } else c.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture, Ha(c, "rotate" + c.children[0].text), c.selected = !0, a.mainSoundManager.playSound("firstChip"), a.mainGrid.pressedZones.push(c);
                    n && (ua = c.name);
                    a.mainGrid.gridContainer.down && za();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }, function (c, l) {
                if (l) {
                    if (!c.selected && !a.mainGrid.gridContainer.down) if (c.isLock) switch (c.isLock) {
                        case 1:
                            c.texture =
                                a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                            break;
                        default:
                            c.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                    } else c.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture
                } else a.mainGrid.gridContainer.down = !1, ua = void 0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, !0);
            a.mainRenderer.stage.on("changeLang", Ca);
            a.mainGameManager.gameStateAsync(function (c) {
                var l = 0 >= c.t2 ? c.tir : c.tir + 1;
                B.editions.length && B.editions[B.editions.length - 1].round === l || B.addEdition(l);
                if (B.editions.length && B.editions[B.editions.length - 1].round === l) {
                    l = B.editions[B.editions.length - 1].betsHistory.bets;
                    for (var n, K = 0, E = 0; E < l.length; E++) {
                        K += l[E].summ;
                        for (var P = 0; P < l[E].bet.length; P++) switch (n = a.mainGrid.zones[l[E].bet[P] - 1], n.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, n.isLock ? n.isLock++ : n.isLock = 1, n.isLock) {
                            case 1:
                                n.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                break;
                            default:
                                n.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                        }
                        n =
                            null
                    }
                    a.mainFLGAccount.totalBet(K, !0);
                    sa = !0
                }
                va = new hotcoldGraphsKeno(c, G.stats, function (H, F) {
                    var D = 0, S = 9;
                    if (0 === F.children.length) {
                        var e = new PIXI.Container;
                        var g = [];
                        45 < mainLocalizationTable.hotcoldRating.length && (g = mainLocalizationTable.hotcoldRating.replace(/%s/g, 100).toUpperCase().split(" "));
                        var h = a.mainRenderer.createButton(e, -1, 76, void 0, {
                            text: g.length ? g[0] + " " + g[1] + " " + g[2] : mainLocalizationTable.hotcoldRating.replace(/%s/g, 100).toUpperCase(),
                            align: "center",
                            style: {
                                font: "bold 50px Arial", fill: "#ffffff",
                                align: "center"
                            }
                        });
                        h.anchor.set(.5, .5);
                        g.length && (h = a.mainRenderer.createButton(e, -1, 136, void 0, {
                            text: g[3] + " " + g[4] + " " + g[5] + " " + g[6],
                            align: "center",
                            style: {font: "bold 50px Arial", fill: "#ffffff", align: "center"}
                        }), h.anchor.set(.5, .5));
                        F.addChild(e);
                        F = a.mainRenderer.createButton(F, -501, 176, "hotcold_bg");
                        e = new PIXI.Container;
                        F.addChild(e);
                        g = new PIXI.Container;
                        F.addChild(g);
                        for (var v in H.cold) {
                            if (5 < D) break;
                            h = new PIXI.Graphics;
                            h.position.set(93 + 153 * D, 188);
                            e.addChild(h);
                            h = new PIXI.Graphics;
                            h.position.set(93 +
                                153 * D, 499);
                            g.addChild(h);
                            h = a.mainRenderer.createButton(F, 169 + 153 * D, 156, void 0, {
                                text: "",
                                align: "center",
                                style: {font: "bold 50px Arial", fill: "#fe801b", align: "center"}
                            });
                            h.anchor.set(.5, .5);
                            h = a.mainRenderer.createButton(F, 160 + 153 * D, 48, void 0, {
                                text: H.hot[D][0],
                                align: "center",
                                style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                            });
                            h.anchor.set(.5, .5);
                            h = a.mainRenderer.createButton(F, 169 + 153 * D, 472, void 0, {
                                text: "",
                                align: "center",
                                style: {font: "bold 50px Arial", fill: "#9bccff", align: "center"}
                            });
                            h.anchor.set(.5,
                                .5);
                            h = a.mainRenderer.createButton(F, 160 + 153 * D, 152, void 0, {
                                text: H.cold[S][0],
                                align: "center",
                                style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                            });
                            h.anchor.set(.5, .5);
                            D++;
                            S--
                        }
                    } else if ((F = F.children[1]) && F.children.length) for (v in H.cold) {
                        if (5 < D) break;
                        F.children[4 * D + 2].children[0].text = "";
                        F.children[4 * D + 3].children[0].text = H.hot[D][0];
                        F.children[4 * D + 4].children[0].text = "";
                        F.children[4 * D + 5].children[0].text = H.cold[S][0];
                        D++;
                        S--
                    }
                }, function (H, F) {
                });
                va.draw();
                B.events.emit("GRID_STATS", c);
                B.drawEditions();
                ea.drawCustomJackpot(function (H, F) {
                    if (F) {
                        var D = z.getChildByName("JackpotContainer"), S = utils.formatNumber(F);
                        if (D) {
                            F = D.children[1];
                            var e = D.children[2];
                            var g = D.children[3];
                            g.children[0].text = S
                        } else F = new PIXI.Graphics, F.beginFill(0, .6), F.drawRect(1174, 192, 432, 150), F.endFill, z.addChild(F), D = a.mainRenderer.createButton(z, 1244, 257), D.name = "JackpotContainer", a.mainRenderer.createButton(D, 155, -25, "atlas%JJackPot").anchor.set(.5, .5), D.children[0].scale.set(1.4, 1.4), F = a.mainRenderer.createButton(D, 3, 3), e =
                            a.mainRenderer.createButton(D, 0, 5), F.visible = !1, g = a.mainRenderer.createButton(D, 155, 45, void 0, {
                            text: S,
                            style: {font: "bold 54px Arial", fill: "#d6d6d6", align: "center"}
                        }), g.anchor.set(.5, .5), g.children[0].anchor.set(.5, .5);
                        S = 0;
                        g = D.children[0].width;
                        D = .8 * g / 10;
                        for (var h = .2 * g / 9, v = 0; 10 > v; v++) {
                            g = e.children[v];
                            switch (v) {
                                case 0:
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                    var C = 65280;
                                    break;
                                case 7:
                                case 8:
                                    C = 15973429;
                                    break;
                                case 9:
                                    C = 15352834
                            }
                            g ? (g.clear(), g.beginFill(C), g.drawRect(S, 0, D, 4), g.endFill) : (g = new PIXI.Graphics,
                                g.beginFill(C), g.drawRect(S, 0, D, 4), g.endFill, e.addChild(g));
                            S += D + h;
                            g.visible = v <= parseInt(H)
                        }
                        F.position.x += (3 - F.position.x) / 2 + 124;
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }
                });
                ea.updateJackpotData(c);
                a.mainFLGAccount.autoplayManager.updateCallback = function (H) {
                    if (!(2 > B.editions.length)) {
                        switch (H) {
                            case "repeatLastBet":
                                var F = H = -1;
                                var D = B.editions.length - 2;
                                break;
                            case "getOnlyBets":
                                F = H = void 0;
                                D = B.editions.length - 1;
                                break;
                            default:
                                H = B.editions[B.editions.length - 2].betsHistory.setTotalWin(), F = a.mainFLGAccount.balance(),
                                    D = B.editions.length - 2
                        }
                        a.mainFLGAccount.autoplayManager.update(B.editions[D].betsHistory.bets, H, F, function (S) {
                            a.mainGameManager && 0 < S.length && B.getActedOutEdition().betsHistory.addBet(S, B.getActedOutEdition().round, function (e) {
                                if (e && e.length) {
                                    var g;
                                    for (g = 0; g < e.length; g++) for (var h = 0; h < e[g].bet.length; h++) {
                                        var v = a.mainGrid.zones[e[g].bet[h] - 1];
                                        v.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                        v.isLock ? v.isLock++ : v.isLock = 1;
                                        switch (v.isLock) {
                                            case 1:
                                                v.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                                break;
                                            default:
                                                v.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                                        }
                                    }
                                } else if (e) for (h = 0; h < e.bet.length; h++) switch (v = a.mainGrid.zones[e.bet[h] - 1], v.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, v.isLock ? v.isLock++ : v.isLock = 1, v.isLock) {
                                    case 1:
                                        v.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                        break;
                                    default:
                                        v.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                                }
                            })
                        }, B.editions[D].round)
                    }
                };
                ya(c);
                m && m()
            })
        }, function () {
            a.mainSoundManager.playRandomBackSound()
        });
    var Ca = function () {
        a.mainFLGAccount.updateAccountText();
        B.redrawEditionHeader();
        B.drawBetsHeader();
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.onLanguageChange = Ca;
    this.setInteraction = function (d) {
        a.mainGrid.setZoneInteraction(d);
        z.getChildByName("random").children[0].interactive = d;
        z.getChildByName("videoPlayBtn").visible = !1;
        z.getChildByName("videoPlayBtn").isPlay ? (z.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play_off.texture,
            z.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin_off.texture, z.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_square_pressed.texture) : (z.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture, z.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture, z.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_square.texture);
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.setTextHeaderScale = function (d) {
        12 < d.text.length ? d.scale.set(.65, .65) : 9 < d.text.length ? d.scale.set(.75, .75) : d.scale.set(1, 1)
    };
    this.setTextScale = function (d) {
        d.text == "MAX\n" + na ? d.scale.set(.5, .5) : d.scale.set(1, 1)
    };
    var za = function () {
        var d = 0;
        0 < a.mainGrid.pressedZones.length && 0 < U.currentBet() && (d = U.currentBet() * a.mainGameManager.coefficients[a.mainGrid.pressedZones.length][a.mainGrid.pressedZones.length - 1]);
        a.mainFLGAccount.maxWin(d)
    }, Ma = 0, Qa = 0, ya = function (d) {
        function b(r) {
            a.mainGameManager &&
            (I.children[2].mask.clear(), I.children[2].mask.beginFill(), I.children[2].mask.drawRoundedRect(3, 3, 386 * r, 34, 9), I.children[2].mask.endFill, I.children[2].children[0].children[0].text = ta.getTimerText(), I.children[0].children[0].text = ta.getTimerText(), a.mainRenderer.renderManager.needUpdateRender = !0)
        }

        function m(r) {
            if (a.mainGameManager) {
                I.children[2].clear();
                I.children[2].beginFill(42577);
                I.children[2].drawRoundedRect(3, 3, 386, 34, 9);
                I.children[2].endFill;
                ea.updateJackpotData(r);
                sa ? sa = !1 : (a.mainFLGAccount.setWinTextVisible(!0),
                    a.mainGrid.removeSelectedBets(), a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_transp.texture, {
                    font: "bold 65px Arial Narrow",
                    fill: "#e0e0e0",
                    stroke: "#000000",
                    strokeThickness: 4,
                    align: "center"
                }, void 0, a.mainGrid.getIntArrayOfZones()));
                va.update(r);
                a.mainUIManager.setInteraction(!0);
                B.addEdition(r.tir + 1);
                var u = [], A;
                for (A = 1; 21 > A; A++) u.push(r["b" + A]);
                qa.startDrawBalls(u, 1, 0);
                1 < B.editions.length && B.drawDetailEditionHistory(G.history.container, B.editions.length - 2);
                "srv58" !== a.kenoConfig.serverName &&
                (a.mainFLGAccount.autoplayManager.updateCallback(), a.mainFLGAccount.autoplayManager.settings.isStarted() || a.mainFLGAccount.autoplayManager.settings.repeatRoundNum() === B.editions[B.editions.length - 1].round ? (x.getChildByName("autoplay_bg").getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand-pressed2"], x.getChildByName("autoplay_bg").getChildByName("repeat").children[0].interactive = !1) : (x.getChildByName("autoplay_bg").getChildByName("repeat").texture =
                    a.mainRenderer.resourceLoader.resources.atlas.textures["menu-btn-grand2"], x.getChildByName("autoplay_bg").getChildByName("repeat").children[0].interactive = !0), z.getChildByName("autoplay").getChildByName("autoplay_remain_num").children[0].text = 0 == a.mainFLGAccount.autoplayManager.settings.count() ? "" : a.mainFLGAccount.autoplayManager.settings.count(), a.mainFLGAccount.autoplayManager.settings.isStarted() ? (x.getChildByName("autoplay_bg").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRemainingNumber +
                    ": " + a.mainFLGAccount.autoplayManager.settings.count(), x.getChildByName("autoplay_bg").getChildByName("autoplayDesc2").visible = !1, x.getChildByName("autoplay_bg").getChildByName("autoplay-num5").visible = !1, x.getChildByName("autoplay_bg").getChildByName("autoplay-num10").visible = !1, x.getChildByName("autoplay_bg").getChildByName("autoplay-num50").visible = !1, x.getChildByName("autoplay_bg").getChildByName("autoplaySelected").children[0].text = a.mainFLGAccount.autoplayManager.settings.count(), x.getChildByName("autoplay_bg").getChildByName("autoplaySelected").visible =
                    !0, x.getChildByName("autoplay_bg").getChildByName("autoplay-stop").visible = !0) : (x.getChildByName("autoplay_bg").getChildByName("autoplayDesc1").children[0].text = mainLocalizationTable.autoplayRoundNumber, x.getChildByName("autoplay_bg").getChildByName("autoplayDesc2").visible = !0, x.getChildByName("autoplay_bg").getChildByName("autoplay-num5").visible = !0, x.getChildByName("autoplay_bg").getChildByName("autoplay-num10").visible = !0, x.getChildByName("autoplay_bg").getChildByName("autoplay-num50").visible =
                    !0, x.getChildByName("autoplay_bg").getChildByName("autoplaySelected").visible = !1, x.getChildByName("autoplay_bg").getChildByName("autoplay-stop").visible = !1));
                I.children[2].children[1].children[0].text = "#" + r.tir;
                I.children[1].children[0].text = "#" + r.tir;
                ta.start({
                    minutes: 0,
                    seconds: (r.time_round ? r.time_round : a.kenoConfig.tirTime) - a.kenoConfig.timerOffset - r.t2
                }, {
                    minutes: 0,
                    seconds: (r.time_round ? r.time_round : a.kenoConfig.tirTime) - a.kenoConfig.timerOffset
                }, b, function () {
                    a.mainGameManager && (a.mainGrid.removeCurrentBets(),
                        a.mainGrid.removeFuckingHoverTexture(), qa.removeBalls(), a.mainUIManager.setInteraction(!1), a.mainSoundManager.playSound("endBet"))
                }, Fa, ya);
                B.events.emit("BET_TIME")
            }
        }

        function f(r) {
            function u() {
                a.mainGameManager && (a.mainGameManager.gameStateAsync(A), a.mainRenderer.renderManager.needUpdateRender = !0)
            }

            function A(k) {
                function p(E) {
                    if (a.mainGrid && a.mainGameManager) if (c >= t.length) E(); else {
                        var P = t.slice(0, c + 1), H = "resultBalls" + c, F = a.mainGrid.zones[parseInt(t[c]) - 1];
                        a.mainUIManager.simpleFlipXFunc(F, H, 450, 450,
                            function (D) {
                                D.texture = D.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                            });
                        qa.startDrawBalls(P, 1, 0);
                        B.cancelLastEdition(P);
                        c += 1;
                        setTimeout(function () {
                            p(E)
                        }, 900)
                    }
                }

                if (a.mainGameManager) if (99 === k.b1) setTimeout(u, 2E3); else {
                    var t = [k.b1, k.b2, k.b3, k.b4, k.b5, k.b6, k.b7, k.b8, k.b9, k.b10, k.b11, k.b12, k.b13, k.b14, k.b15, k.b16, k.b17, k.b18, k.b19, k.b20],
                        c = limit(N, 0, 19);
                    if (0 !== c) {
                        var l;
                        for (l = 0; l <= c; l++) {
                            var n = "resultBalls" + l, K = a.mainGrid.zones[parseInt(t[l]) -
                            1];
                            a.mainUIManager.simpleFlipXFunc(K, n, 450, 450, function (E) {
                                E.texture = E.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                            })
                        }
                    }
                    p(function () {
                        a.mainFLGAccount.calculateWin(B.getActedOutEdition().betsHistory.bets, a.kenoConfig.appName, function () {
                            B.getActedOutEdition().betsHistory.setTotalWin(a.mainFLGAccount.totalWin());
                            B.getActedOutEdition().betsHistory.redrawCurrentBets();
                            I.children[2].clear();
                            I.children[2].beginFill(0);
                            I.children[2].drawRoundedRect(3,
                                3, 386, 34, 9);
                            I.children[2].endFill;
                            var E = a.kenoConfig.winShowTime ? a.kenoConfig.winShowTime : 8E3;
                            Ma = setTimeout(ya, E);
                            ea.updateJackpotData(k);
                            ea.drawJackpotWin(2E4, {
                                x: 594,
                                y: 628
                            }, a.mainRenderer.resourceLoader.resources.JP.texture, a.mainFLGAccount.totalWin(), a.mainRenderer.resourceLoader.resources.jp_only.texture);
                            G.video.button.pressed ? setTimeout(function () {
                                z.getChildByName("videoPlayBtn").visible = !1;
                                z.getChildByName("videoPlayBtn").getChildByName("video_play").texture = a.mainRenderer.resourceLoader.resources.video_play.texture;
                                z.getChildByName("video_skin").texture = a.mainRenderer.resourceLoader.resources.video_skin.texture;
                                z.getChildByName("videoPlayBtn").texture = a.mainRenderer.resourceLoader.resources.btn_square.texture;
                                z.getChildByName("videoPlayBtn").isPlay = !1;
                                G.game.button.emit("mousedown");
                                a.mainFLGAccount.winToBalanceAnimation(E - 2E3, 2E3, {
                                    x: 594,
                                    y: 628
                                }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                    font: "bold 70px Arial",
                                    fill: "#bcbcbc",
                                    scale: 1.25,
                                    withImages: !0
                                }, ea.jpWin())
                            }, 2E3) : a.mainFLGAccount.winToBalanceAnimation(E,
                                2E3, {
                                    x: 594,
                                    y: 628
                                }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                    font: "bold 70px Arial",
                                    fill: "#bcbcbc",
                                    scale: 1.25,
                                    withImages: !0
                                }, ea.jpWin())
                        }, a.kenoConfig);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    });
                    (function () {
                        if ("bets_11" == a.kenoConfig.appName) {
                            var E = "Login: " + clientInfoGlobal.lgn + " || Club: " + clientInfoGlobal.hallid;
                            E += " || Jackpot: " + (1 == k.myjp ? "YES" : "NO") + " || GameInfo: " + JSON.stringify(k);
                            a.mainRenderer.logService.setStats(E, a.kenoConfig.appName)
                        }
                    })()
                }
            }

            if (a.mainGameManager) {
                B.events.emit("RESULT_TIME");
                I.children[2].clear();
                I.children[2].beginFill(12531501);
                I.children[2].drawRoundedRect(3, 3, 386, 34, 9);
                I.children[2].endFill;
                1 < B.editions.length && B.drawDetailEditionHistory(G.history.container, B.editions.length - 2);
                I.children[2].children[1].children[0].text = "#" + r.tir;
                I.children[1].children[0].text = "#" + r.tir;
                var N = r.time_wait - parseInt(r.tOrig, 10) - 1;
                0 > N ? (ha && (N += 7), setTimeout(u, 1E3 * -N)) : u();
                a.mainUIManager.setInteraction(!1);
                sa ? (r = a.mainFLGAccount.totalBet(), a.mainFLGAccount.setWinTextVisible(!1), a.mainFLGAccount.totalBet(r,
                    !0), sa = !1) : a.mainFLGAccount.setWinTextVisible(!1)
            }
        }

        function w(r) {
            0 >= r.t2 ? f(r) : m(r)
        }

        void 0 != a.mainGameManager && (d ? w(d) : a.mainGameManager.gameStateAsync(w))
    };
    this.drawGridHotCold = function (d) {
        if (la.prevGmState || d) {
            var b = la.prevGmState;
            d && (b = d, la.prevGmState = d);
            var m = {
                font: "bold 65px Arial Narrow",
                fill: "#e0e0e0",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center"
            };
            d = 0;
            for (var f = 9; 6 > d; d++, f--) a.mainGrid.zones[parseInt(b.hot[d][0], 10) - 1].children[0].style = m, a.mainGrid.zones[parseInt(b.cold[f][0], 10) - 1].children[0].style =
                m;
            a.mainRenderer.renderManager.needUpdateRender = !0;
            if (la.needShow) {
                m = {
                    font: "bold 65px Arial Narrow",
                    fill: "#41a0ff",
                    stroke: "#000000",
                    strokeThickness: 4,
                    align: "center"
                };
                var w = {
                    font: "bold 65px Arial Narrow",
                    fill: "#ff5050",
                    stroke: "#000000",
                    strokeThickness: 4,
                    align: "center"
                };
                d = 0;
                for (f = 9; 6 > d; d++, f--) a.mainGrid.zones[parseInt(b.hot[d][0], 10) - 1].children[0].style = w, a.mainGrid.zones[parseInt(b.cold[f][0], 10) - 1].children[0].style = m;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }
    };
    B.events.on("GRID_STATS",
        O.drawGridHotCold);
    B.events.on("BET_TIME", O.drawGridHotCold)
};
