registrationAppOnPlatform({
    category: "casino",
    catalog: "Rulette_1.5_min",
    image: "games/RedLottery/resources/icons/bingo-37.png",
    imageBack: "games/RedLottery/resources/icons/bingo-37-back2.png",
    caption: "Bingo 37",
    runConfig: "RedLottery",
    gameType: "red",
    playInDemo: !1,
    gameBG: "images/games-bg/game-bg-red.jpg"
});
var configsRedLottery = {
    red: {
        serverName: "srv67",
        serverNum: "s67",
        tirTime: 83,
        appName: "rulem2",
        resources: "",
        gridTextStyle: {font: "85px Baltica", fill: "#8b0005", align: "center"},
        balls: {xPos: 1660, yPos: 119, textStyle: {font: "120px Arial Bold", fill: "#ffffff", align: "center"}},
        videoURL: "rtmp://w1.flg10.bet:1935/fortuna-fast-live&amp;Video0=stream3:180&amp",
        videoMobileURL: "https://w1.flg10.bet/Fortuna_2min/_definst_/myStream/playlist.m3u8",
        videoPos: {x: 1448, y: 87},
        videoSize: {w: 448, h: 273},
        canvasId: "",
        runconfig: "RedLottery",
        gameType: "Red",
        gameKind: "RedLottery",
        gameVariant: "",
        betSeparator: "_",
        winShowTime: 7E3,
        caption: "Bingo 37",
        rTime: 20
    }
}, RedLotteryObjectsArr = {red: void 0};

function emitEventRedLottery(a, f) {
    void 0 != RedLotteryObjectsArr.red && RedLotteryObjectsArr.red.mainRenderer.stage.emit(a, f)
}

function removeRedLotteryObject(a, f) {
    if (void 0 != RedLotteryObjectsArr[f]) {
        RedLotteryObjectsArr[f].destroy();
        for (var u in RedLotteryObjectsArr[f]) RedLotteryObjectsArr[f][u] = null;
        RedLotteryObjectsArr[f] = null
    }
    $("#" + a + " canvas").remove();
    $("#" + a + " div").remove()
}

function initRedLotteryObject(a, f) {
    switch (f) {
        case "red":
            configsRedLottery.red.canvasId = a, RedLotteryObjectsArr.red = new RedLotteryApp(configsRedLottery.red)
    }
}

function refreshRedLotteryObject(a, f) {
    removeRedLotteryObject(a, f.toLowerCase());
    initRedLotteryObject(a, f.toLowerCase())
}

function RedLotteryApp(a) {
    this.destroy = function () {
        q.destroy();
        q = null;
        r.destroy();
        r = null;
        B.destroy();
        B = null;
        v.destroy();
        v = null;
        u.destroy();
        u = null;
        f.mainSoundManager.destroy();
        for (var a in f) f[a] = null;
        f = null
    };
    var f = this;
    this.gameDir = "games/RedLottery/resources/";
    this.gameConfig = a;
    var u = new FLGRenderer(1920, 1080, a.canvasId, "center");
    this.mainRenderer = u;
    this.mainSoundManager = new SoundManager(f.gameConfig.gameKind, f.gameConfig.gameType, f.gameConfig.gameVariant);
    var B = new FLGAccount(null, f.mainSoundManager,
        f.mainRenderer);
    this.mainFLGAccount = B;
    var v = new gameManagerRedLottery(this);
    this.mainGameManager = v;
    var q = new UIManagerRedLottery(this);
    this.mainUIManager = q;
    var r = new FortuneGrid(98, 460, 12, 3, void 0, u);
    this.mainGrid = r
}

function gameManagerRedLottery(a) {
    this.destroy = function () {
        v = B = u = null;
        for (var a in f) f[a] = null;
        f = null
    };
    var f = this, u = {};
    this.gameStateAsync = function (a) {
        B(a)
    };
    var B = function (f) {
        $.ajax({
            type: "get",
            url: getUrl(),
            data: {oper: "getgameinfo", id_srv: a.gameConfig.serverName.slice(3, a.gameConfig.serverName.length)},
            dataType: "json",
            success: function (r, m, q) {
                try {
                    u = r, f && f(u)
                } catch (w) {
                    console.log(w), a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
                }
            },
            error: function (f, m, q) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError,
                    redirectToRootURL, "critical")
            }
        })
    }, v = {};
    this.gameHistory = function (q) {
        q && $.ajax({
            type: "get",
            url: getUrl(),
            data: {oper: "getgameinfo", id_srv: a.gameConfig.serverName.slice(3, a.gameConfig.serverName.length)},
            dataType: "json",
            success: function (r, m, u) {
                try {
                    f && r && r.history && (v = r.history, v != {} && q(v))
                } catch (w) {
                    console.log(w), a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
                }
            },
            error: function (f, m, q) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL,
                    "critical")
            }
        })
    }
}

function UIManagerRedLottery(a) {
    function f(b) {
        this.destroy = function () {
            for (var a = 0; a < c.length; a++) {
                for (var p in c[a]) c.length - 1 == a && c[a][p].summ && b.mainFLGAccount.totalBet(-c[a][p].summ), c[a][p] = null;
                c[a] = null
            }
            l = d = c = null;
            for (a in e) e[a] = null;
            e = null
        };
        var e = this, c = [];
        this.states = function () {
            return c
        };
        var d = [];
        this.saveGridStateInStorage = function () {
            localStorage.setItem("curUser", JSON.stringify({hall: clientInfoGlobal.hall, nick: clientInfoGlobal.nick}));
            c && localStorage.setItem("gridStates", JSON.stringify(c));
            d && localStorage.setItem("lastRoundGridState", JSON.stringify(d))
        };
        this.loadGridStateFromStorage = function () {
            if (localStorage.getItem("curUser")) {
                var a = JSON.parse(localStorage.getItem("curUser"));
                if (a.hall != clientInfoGlobal.hall && a.nick != clientInfoGlobal.nick) return
            }
            localStorage.getItem("gridStates") && (c = JSON.parse(localStorage.getItem("gridStates")));
            localStorage.getItem("lastRoundGridState") && (d = JSON.parse(localStorage.getItem("lastRoundGridState")))
        };
        this.addGridState = function () {
            var a = b.mainUIManager.getFortuneObjectsByGrid();
            if (!c.length || a.length || c[c.length - 1].length) c.push(a), e.saveGridStateInStorage()
        };
        this.doubleCurrentBets = function () {
            var b = {betErrorCount: 0, betErrorFunc: null}, c = 0, d;
            for (d in a.mainGrid.pressedZones) if (c++, a.mainUIManager.isAllowBet({
                comb: parseInt(d),
                coef: void 0,
                summ: a.mainGrid.pressedZones[d].bet
            }, 2 * a.mainGrid.pressedZones[d].bet, b)) {
                if (-1 == a.mainFLGAccount.totalBet(parseFloat(a.mainGrid.pressedZones[d].bet))) return;
                a.mainUIManager.defineZonesForBet(a.mainGrid.pressedZones[d].zone, .35, D, parseFloat(a.mainGrid.pressedZones[d].bet).toFixed(10) *
                    parseFloat(a.mainGrid.pressedZones[d].coef).toFixed(10));
                a.mainGrid.pressedZones[d].bet *= 2;
                a.mainGrid.pressedZones[d].zone.getChildByName("smallChipText").text = parseFloat(a.mainGrid.pressedZones[d].bet)
            }
            0 < b.betErrorCount && b.betErrorFunc();
            b.betErrorCount != c && e.addGridState();
            b.betErrorCount = null;
            b.betErrorFunc = null
        };
        this.undoGridState = function () {
            c.length && (c.pop(), e.saveGridStateInStorage(), b.mainGrid.removeCurrentBets(), a.mainFLGAccount.totalBet(-a.mainFLGAccount.totalBet()), l())
        };
        this.clearGridStates =
            function () {
                if (d && d.length) {
                    for (var a in d) d[a] = null;
                    d = []
                }
                if (c && c.length) {
                    d = c[c.length - 1].slice();
                    for (var b = 0; b < c.length; b++) {
                        for (a in c[b]) c[b][a] = null;
                        c[b] = null
                    }
                    c = []
                }
                e.saveGridStateInStorage()
            };
        this.repeatLastRoundGridState = function () {
            d && d.length && (c.push(d.slice()), e.saveGridStateInStorage(), l())
        };
        this.showWinCombinations = function (a) {
            b.mainGrid.removeCurrentBets();
            l(a, !0)
        };
        var l = function (h, d) {
            var e = h ? h : c[c.length - 1], p = void 0 != d ? d : !1, l = {betErrorCount: 0, betErrorFunc: null};
            e && e.length && (b.mainGrid.pressZonesByObjectArr(e,
                function (c) {
                    if (b.mainUIManager.isAllowBet({
                        comb: parseInt(c.zone.name),
                        coef: void 0,
                        summ: c.bet
                    }, b.mainGrid.pressedZones[c.zone.name] ? b.mainGrid.pressedZones[c.zone.name].bet + c.bet : c.bet, l)) {
                        if (h || p) h && h.length && (parseInt(e[0].winBet) != parseInt(c.zone.name) && b.mainUIManager.createSmallChip(c.zone, c.bet), b.mainGrid.pressedZones[c.zone.name] = {
                            zone: b.mainGrid.uiGridContainer.getChildByName(c.zone.name),
                            bet: c.bet,
                            coef: b.mainUIManager.defineCoefForBet(c.zone)
                        }, b.mainUIManager.defineZonesForBet(c.zone, .35,
                            b.mainUIManager.showPossibleWin, parseFloat(c.bet).toFixed(10) * parseFloat(b.mainGrid.pressedZones[c.zone.name].coef).toFixed(10), !1), b.mainGrid.uiGridContainer.getChildByName(parseInt(e[0].winBet)).getChildByName("possibleWinText").visible = !0, b.mainGrid.uiGridContainer.getChildByName(parseInt(e[0].winBet)).getChildByName("possibleWinInfo").visible = !0); else {
                            if (-1 == b.mainFLGAccount.totalBet(parseFloat(c.bet))) return;
                            b.mainUIManager.createSmallChip(c.zone, c.bet);
                            c.zone.selected ? b.mainGrid.pressedZones[c.zone.name].bet =
                                parseFloat(b.mainGrid.uiGridContainer.getChildByName(c.zone.name).getChildByName("smallChipText").text).toFixed(10) : (c.zone.selected = !0, b.mainGrid.pressedZones[c.zone.name] = {
                                zone: b.mainGrid.uiGridContainer.getChildByName(c.zone.name),
                                bet: c.bet,
                                coef: b.mainUIManager.defineCoefForBet(c.zone)
                            });
                            b.mainUIManager.defineZonesForBet(c.zone, .35, b.mainUIManager.showPossibleWin, parseFloat(c.bet).toFixed(10) * parseFloat(b.mainGrid.pressedZones[c.zone.name].coef).toFixed(10))
                        }
                        a.mainRenderer.renderManager.needUpdateRender =
                            !0
                    }
                }), b.mainGrid.zonesOut(), 0 < l.betErrorCount && l.betErrorFunc(), l.betErrorCount = null, l = l.betErrorFunc = null)
        };
        this.selectGridByStates = l;
        e.loadGridStateFromStorage()
    }

    function u(b) {
        this.destroy = function () {
            c.destroy();
            p = h = l = k = d = c = null;
            for (var a = 0; a < f.length; a++) {
                for (var b in f[a]) f[a][b] = null;
                f[a] = null
            }
            E = g = f = null;
            for (a in e) e[a] = null;
            e = null
        };
        var e = this, c = new PIXI.Graphics;
        c.beginFill(16777215, 0);
        c.drawRect(0, 0, b.mainRenderer.canvasSize.width, b.mainRenderer.canvasSize.height);
        c.endFill();
        var d = new PIXI.Sprite(c.generateTexture(!1));
        d.width = d.texture.width;
        d.height = d.texture.height;
        d.interactive = !0;
        d.hitArea = new PIXI.Rectangle(0, 0, d.width, d.texture.height);
        var l = function (c) {
            k.data = c.data;
            k.dragging = !0;
            c = k.data.getLocalPosition(k.parent);
            k.position.x = c.x;
            k.position.y = c.y;
            k.visible = !0;
            b.mainGrid.gridContainer.down = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, h = function () {
            k.dragging = !1;
            k.data = null;
            k.visible = !1;
            b.mainGrid.gridContainer.down = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, p = function () {
            if (k.dragging) {
                var b =
                    k.data.getLocalPosition(k.parent);
                k.position.x = b.x;
                k.position.y = b.y
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        d.on("mousedown", l).on("touchstart", l).on("mousemove", p).on("touchmove", p).on("mouseup", h).on("touchend", h).on("mouseupoutside", h).on("touchendoutside", h);
        b.mainRenderer.stage.addChildAt(d, 0);
        var k = b.mainRenderer.createButton(d, 0, 0, void 0, void 0);
        k.anchor.set(.5, .5);
        k.visible = !1;
        this.addDragSprite = function () {
            b.mainRenderer.stage.addChild(k)
        };
        this.setInteraction = function (b) {
            d.interactive =
                b;
            k.visible = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        var f = [], g = {};
        this.currentMode = function () {
            return g
        };
        var E = function (c) {
            g = c;
            k.texture = b.mainRenderer.resourceLoader.resources[g.modeSprite.name].texture;
            k.width = k.texture.width;
            k.height = k.texture.height;
            k.scale.set(.8, .8);
            c = k.getChildByName("modeDragSpriteText");
            g.modeSprite.children[0] ? c ? (c.text = g.modeSprite.children[0].text, c.visible = !0) : (c = new PIXI.Text(g.modeSprite.children[0].text, g.modeSprite.children[0].style), c.style.align = "center",
                c.anchor.x = .5, c.anchor.y = .5, c.name = "modeDragSpriteText", k.addChild(c)) : c && (c.visible = !1);
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        this.setMode = function (a) {
            if (a && a.modeName != g.modeName) {
                for (var b = 0; b < f.length; b++) if (a.modeName == f[b].modeName) {
                    E(f[b]);
                    return
                }
                f.push(a);
                E(f[f.length - 1])
            }
        }
    }

    function B(b) {
        this.destroy = function () {
            for (var a = 0; a < c.length; a++) c[a].round = null, c[a].editionResult = null, c[a].betsHistory.destroy && c[a].betsHistory.destroy(), c[a] = null;
            n = E = m = g = p = h = l = d = c = null;
            for (a in e) e[a] =
                null;
            e = null
        };
        var e = this, c = [], d;
        this.editions = c;
        var l, h, p = new PIXI.Container;
        this.historyTable = function () {
            return h
        };
        this.getActedOutEdition = function () {
            for (var a = c.length - 1; 0 <= a; a--) if (void 0 == c[a].editionResult) return g(a), c[a];
            g(c.length - 1);
            return c[c.length - 1]
        };
        for (var f = 0; f < b.length; f++) c.push({
            round: b[f].round,
            editionResult: b[f].editionResult,
            betsHistory: b[f].betsHistory
        }), c[f].betsHistory.setRoundResult(c[f].editionResult);
        var g = function (b) {
            0 > b || b >= c.length || (d = b, void 0 != l && (l.getChildByName("text" +
                l.name).text = c[d].round), 0 < p.children.length && n(), a.mainRenderer.renderManager.needUpdateRender = !0)
        };
        g(c.length - 1);
        this.drawEditions = function () {
            l = a.mainRenderer.createButton(void 0, 344, 122, void 0, {
                text: c[d].round,
                align: "center",
                style: {font: "bold 36px Arial", fill: "#b9b8b8"}
            });
            h = new PIXI.Container;
            a.mainRenderer.stage.addChild(h);
            m();
            n();
            h.addChild(p)
        };
        var m = function () {
        };
        this.redrawEditionHeader = m;
        new PIXI.Container;
        var E = function () {
        };
        this.drawBetsHeader = E;
        var n = function () {
            for (var b = 510, h = 0 != p.children.length,
                     d = 0; d < c.length - 1; d++) if (c[d].editionResult) if (h) {
                var e = p.children[d];
                e.getChildByName("result").children[0].text = c[d].editionResult
            } else e = new PIXI.Container, d == c.length - 2 ? a.mainRenderer.createButton(e, b += 82, 90, "history_red", {
                text: c[d].editionResult,
                align: "center",
                style: {font: "60px Baltica", fill: "#ffffff", stroke: "#fff000", strokeThickness: 4}
            }).name = "result" : a.mainRenderer.createButton(e, b += 82, 90, "history_grey", {
                text: c[d].editionResult,
                align: "center",
                style: {font: "60px Baltica", fill: "#8b0005"}
            }).name =
                "result", p.addChild(e)
        };
        this.cancelLastEdition = function (a) {
            c[c.length - 1].editionResult = a;
            c[c.length - 1].betsHistory.setRoundResult(a);
            g(c.length - 1)
        };
        this.addEdition = function (a) {
            c[0].betsHistory.destroy && c[0].betsHistory.destroy();
            c[0].betsHistory = null;
            c.shift();
            c.push({round: a, editionResult: void 0, betsHistory: new v([])});
            g(c.length - 1)
        }
    }

    function v(b) {
        this.destroy = function () {
            for (var a = 0; a < c.length; a++) {
                for (var b = 0; b < c[a].fortuneBetObjArr.length; b++) c[a].fortuneBetObjArr[b].comb = null, c[a].fortuneBetObjArr[b].coef =
                    null, c[a].fortuneBetObjArr[b].summ = null, c[a].fortuneBetObjArr[b] = null;
                c[a].fortuneBetObjArr = null;
                c[a].winBet = null;
                c[a].win = null;
                c[a].code = null;
                c[a] = null
            }
            c = null;
            for (a in e) e[a] = null;
            e = null
        };
        var e = this, c = [];
        this.bets = c;
        if (b.length) for (var d = 0; d < b.length; d++) c.push({
            fortuneBetObjArr: b[d].fortuneBetObjArr.slice(),
            winBet: b[d].winBet,
            win: b[d].win,
            code: b[d].code
        });
        this.addBet = function (b, h, d) {
            a.mainFLGAccount.placeFortuneBet(b, h, a.gameConfig, function (h) {
                void 0 == h || 500 <= c.length || -1 == h ? d && d(!1) : (c.push({
                    fortuneBetObjArr: b.fortuneBetObjArr.slice(),
                    winBet: b.winBet, win: b.win, code: h
                }), d && d(!0), a.mainRenderer.renderManager.needUpdateRender = !0)
            })
        };
        this.setRoundResult = function (a) {
            for (var b = 0; b < c.length; b++) c[b].winBet = a
        }
    }

    this.destroy = function () {
        clearTimeout(O);
        clearTimeout(Q);
        m = null;
        w.destroy();
        w = null;
        I.destroy();
        F = J = y = K = I = null;
        P.destroy();
        r = R = C = g = n = P = null;
        for (var b = 0; b < x.length; b++) x[b].round = null, x[b].editionResult = null, x[b].betsHistory.destroy && x[b].betsHistory.destroy(), x[b].betsHistory = null, x[b] = null;
        G = L = S = x = null;
        a.mainRenderer.stage.off("changeLang",
            M);
        M = null;
        z.destroy();
        z = null;
        t.destroy();
        t = null;
        A.destroy();
        A = null;
        for (b in q) q[b] = null;
        q = null
    };
    var q = this, r = function (a) {
        a = parseInt(a);
        if ("DEMO" == parseInt(clientInfoGlobal.hall)) return 1;
        if (36 >= a) return parseInt(clientInfoGlobal.cf36max) / 100;
        if (42 >= a) return parseInt(clientInfoGlobal.cf3max) / 100;
        if (48 >= a) return parseInt(clientInfoGlobal.cf2max) / 100;
        if (135 >= a || 172 <= a && 195 >= a) return parseInt(clientInfoGlobal.cf18max) / 100;
        if (136 == a || 137 == a || 196 <= a && 207 >= a) return parseInt(clientInfoGlobal.cf12max) / 100;
        if (-1 != [141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171].indexOf(a)) return parseInt(clientInfoGlobal.cf6max) / 100;
        if (250 > a) return parseInt(clientInfoGlobal.cf9max) / 100
    }, m = clientInfoGlobal.coin6.split("-");
    5 < m.length && (m = m.slice(0, 5));
    for (var H = 0; H < m.length; H++) m[H] /= 100;
    m.push("MAX");
    var w = new betsControls(m[0], m[m.length - 1], m[1], m, function (b) {
        b = r(b.comb) - b.curSumm;
        a.mainFLGAccount.balance() < b && (b = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return b
    });
    this.betsControls =
        w;
    var I = new FLGTimer, K, y, J, F,
        P = new FLGVideo(a.gameConfig.videoPos.x, a.gameConfig.videoPos.y, a.gameConfig.videoSize.w, a.gameConfig.videoSize.h, a.gameConfig.canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" allowfullscreen="true" wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=0&amp;URL=' + a.gameConfig.videoURL +
            ';"> <param name="allowFullScreen" value="true"> <param name="movie" value="videoplayer.swf"></object>', '<video id="innerVideo' + a.gameConfig.canvasId + '" autoplay muted playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + a.gameConfig.videoMobileURL + '" type="application/x-mpegURL"></video>', void 0, a.mainSoundManager, !isMobile.any),
        n = new PIXI.Container, g = new PIXI.Container, C, N = !1, z, t;
    this.betManager = function () {
        return t
    };
    var A, R = function (a) {
            var b = [];
            if (!a) return b;
            for (var c in a) 0 !=
            a[c].code ? b.push({
                fortuneBetObjArr: [{comb: a[c].e1, coef: a[c].koef, summ: a[c].bet / 100}],
                win: a[c].win / 100,
                code: a[c].code
            }) : b[b.length - 1].fortuneBetObjArr.push({comb: a[c].e1, coef: a[c].koef, summ: a[c].bet / 100});
            return b
        }, x = [], S = function (b, e) {
            function c(a) {
                var b = [];
                a = a.ball;
                99 != a && b.push(a);
                return b
            }

            a.mainGameManager.gameHistory(function (a) {
                for (var d = 8; 0 <= d; d--) x.push({
                    round: b.tir - 1 - d,
                    editionResult: [a[d].ball],
                    betsHistory: new v([])
                });
                x.push({
                    round: b.tir, editionResult: c(b), betsHistory: new v(0 < b.t2 ? R(b.rulbet) :
                        [])
                });
                z = new B(x);
                z.drawEditions();
                e && e()
            })
        },
        L = [["BG", a.gameDir + "BG.jpg"], ["frame_video", a.gameDir + "frame-video.png"], ["timeline_circle", a.gameDir + "timeline-bg.png"], ["timeline_json", a.gameDir + "timer.json"], ["history_red", a.gameDir + "history-red.png"], ["history_grey", a.gameDir + "history-grey.png"], ["WIN", a.gameDir + "WinJP/Win-" + a.gameConfig.gameType + "-min.png"], ["delete", a.gameDir + "button-delete1.png"], ["delete_pressed", a.gameDir + "button-delete2.png"], ["auto", a.gameDir + "button-auto1.png"], ["auto_pressed",
            a.gameDir + "button-auto2.png"], ["double", a.gameDir + "button-double1.png"], ["double_pressed", a.gameDir + "button-double2.png"], ["repeat", a.gameDir + "button-repeat1.png"], ["repeat_pressed", a.gameDir + "button-repeat2.png"], ["undo", a.gameDir + "button-undo1.png"], ["undo_pressed", a.gameDir + "button-undo2.png"], ["info", a.gameDir + "button-info1.png"], ["info_pressed", a.gameDir + "button-info2.png"], ["eraser", a.gameDir + "eraser1.png"], ["eraser_pressed", a.gameDir + "eraser2.png"], ["zone_pressed", a.gameDir + "icon-table-pressed-small.jpg"],
            ["zone_win", a.gameDir + "icon-table-win-small.jpg"], ["zone_pressed_big", a.gameDir + "icon-table-pressed-big.jpg"], ["zone_win_big", a.gameDir + "icon-table-win-big.jpg"], ["zone_win_star", a.gameDir + "STAR.png"], ["chip_disabled", a.gameDir + "chip1.png"], ["chip", a.gameDir + "chip2.png"], ["possible_win_bg", a.gameDir + "icon-possible-win.png"], ["bingo_en", a.gameDir + "BingoEn.png"], ["bingo_ru", a.gameDir + "BingoRu.png"], ["ticket_1_en", a.gameDir + "Ticket1En.png"], ["ticket_1_ru", a.gameDir + "Ticket1Ru.png"], ["ticket_2_en", a.gameDir +
            "Ticket2En.png"], ["ticket_2_ru", a.gameDir + "Ticket2Ru.png"], ["ticket_3_en", a.gameDir + "Ticket3En.png"], ["ticket_3_ru", a.gameDir + "Ticket3Ru.png"]];
    L = L.concat(a.mainFLGAccount.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, "images/logo.json", L, function (b, e, c) {
        a.mainRenderer.createButton(void 0, 0, 0, "BG");
        a.mainFLGAccount.drawAccount(0, 0, a.gameConfig);
        A = new u(a);
        a.mainRenderer.createButton(void 0, 1441, 79, "frame_video");
        b = "ru" == mainLocalizator.currentLang() ? 417 : 411;
        var d = "ru" == mainLocalizator.currentLang() ?
            "ru" : "en";
        a.mainRenderer.createButton(void 0, 354, b, "ticket_1_" + d).anchor.set(.5, .5);
        a.mainRenderer.createButton(void 0, 959, b, "ticket_2_" + d).anchor.set(.5, .5);
        a.mainRenderer.createButton(void 0, 1560, b, "ticket_3_" + d).anchor.set(.5, .5);
        a.mainRenderer.createButton(n, 200, 0, "double", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            t.doubleCurrentBets();
            c.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        a.mainRenderer.createButton(n, 340, 0, "undo", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            c.stopped = !0;
            t.undoGridState();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        });
        a.mainRenderer.createButton(n, 480, 0, "repeat", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            c.stopped = !0;
            b.interactive && t.repeatLastRoundGridState();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
            b.interactive = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        a.mainRenderer.createButton(n, 620, 0, "delete", void 0,
            function (b, c) {
                a.mainSoundManager.playSound("clearBet");
                b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
                c.stopped = !0;
                a.mainGrid.removeCurrentBets();
                a.mainFLGAccount.totalBet(-a.mainFLGAccount.totalBet());
                t.addGridState();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (b) {
                b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
                a.mainRenderer.renderManager.needUpdateRender = !0
            });
        a.mainRenderer.createButton(n, 760, 0, "auto", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            N = !N;
            b.texture = N ? a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture : a.mainRenderer.resourceLoader.resources[b.name].texture;
            c.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        F = a.mainRenderer.createButton(n, a.mainRenderer.canvasSize.width / 2 + 28, 58, "eraser", void 0, function (b) {
            a.mainSoundManager.playSound("buttonClick");
            A.setMode({modeName: "eraser", modeSprite: b});
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            b.scale.set(1.2, 1.2);
            for (b = 0; b < g.children.length; b++) g.children[b].texture =
                a.mainRenderer.resourceLoader.resources.chip_disabled.texture, g.children[b].getChildByName("text" + g.children[b].name).style = {
                font: "bold 40px Arial Narrow",
                fill: "#85deff"
            };
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        F.anchor.set(.5, .5);
        n.addChild(g);
        d = 1100;
        for (b = 0; b < w.possibleBets.length; b++) a.mainRenderer.createButton(g, d, 3, "chip_disabled", {
            text: w.possibleBets[b],
            align: "center",
            style: {font: "bold 40px Arial Narrow", fill: "#85deff"}
        }, function (b) {
            a.mainSoundManager.playSound("chipSelector");
            for (var c =
                0; c < g.children.length; c++) g.children[c].texture = a.mainRenderer.resourceLoader.resources.chip_disabled.texture, g.children[c].getChildByName("text" + g.children[c].name).style = {
                font: "bold 40px Arial Narrow",
                fill: "#85deff"
            };
            F.texture = a.mainRenderer.resourceLoader.resources[F.name].texture;
            F.scale.set(1, 1);
            A.setMode({modeName: b.getChildByName("text" + b.name).text, modeSprite: b});
            b.texture = a.mainRenderer.resourceLoader.resources.chip.texture;
            b.getChildByName("text" + b.name).style = {
                font: "bold 60px Arial Narrow",
                fill: "#ffffff"
            };
            w.setBet(b.getChildByName("text" + b.name).text);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }), d += 128;
        d = !1;
        for (b = 0; b < g.children.length; b++) a.mainUIManager.setTextScale(g.children[b].children[0]), d || g.children[b].getChildByName("textchip_disabled").text != w.currentBet() || (A.setMode({
            modeName: g.children[b].getChildByName("text" + g.children[b].name).text,
            modeSprite: g.children[b]
        }), g.children[b].texture = a.mainRenderer.resourceLoader.resources.chip.texture, g.children[b].getChildByName("textchip_disabled").style =
            {font: "bold 60px Arial Narrow", fill: "#ffffff"}, d = !0);
        n.position.y = 1084;
        a.mainRenderer.stage.addChild(n);
        K = a.mainRenderer.createButton(void 0, 260, 150, "timeline_circle");
        b = [];
        for (var l in e.timeline_json.textures) b.push(e.timeline_json.textures[l]);
        y = new PIXI.extras.MovieClip(b);
        y.loop = !1;
        y.gotoAndStop(y.totalFrames - 1);
        K.addChild(y);
        b = null;
        J = a.mainRenderer.createButton(K, 84, 94, void 0, {
            text: "0",
            align: "center",
            style: {font: "bold 60px Myriad Pro", fill: "#b9b8b8"}
        });
        a.mainGrid.createZonesRedLottery({
            w: 130,
            h: 130
        }, {w: 520, h: 89}, {x: 0, y: 0}, a.gameConfig.gridTextStyle, void 0, void 0, function (b, c, d) {
            c && (a.mainGrid.zonesOut(), a.mainUIManager.defineZonesForBet(b, .35));
            c || (a.mainGrid.gridContainer.down = !0);
            if (c && a.mainGrid.gridContainer.down || !c && !d || d && (b.name != C || void 0 == C)) if ("eraser" == A.currentMode().modeName) a.mainSoundManager.playSound("clearBet"), a.mainGrid.pressedZones[b.name] && (a.mainFLGAccount.totalBet(-parseFloat(a.mainGrid.pressedZones[b.name].bet)), a.mainUIManager.defineZonesForBet(b, .35, D, -parseFloat(a.mainGrid.pressedZones[b.name].bet) *
                parseFloat(a.mainGrid.pressedZones[b.name].coef)), a.mainGrid.removeCurrentBets([parseInt(b.name)])); else {
                c = a.mainGrid.uiGridContainer.getChildByName(b.name).getChildByName("smallChipText") ? parseFloat(a.mainGrid.uiGridContainer.getChildByName(b.name).getChildByName("smallChipText").text) : 0;
                c = parseFloat(w.currentBet({comb: b.name, curSumm: c}));
                if (!q.isAllowBet({
                    comb: parseInt(b.name),
                    coef: void 0,
                    summ: c
                }, a.mainGrid.pressedZones[b.name] ? a.mainGrid.pressedZones[b.name].bet + c : c) || 0 == c || -1 == a.mainFLGAccount.totalBet(c)) return;
                a.mainUIManager.createSmallChip(b, c);
                b.selected ? (a.mainSoundManager.playSound("stackChip"), a.mainGrid.pressedZones[b.name].bet = parseFloat(a.mainGrid.uiGridContainer.getChildByName(b.name).getChildByName("smallChipText").text)) : (a.mainSoundManager.playSound("firstChip"), b.selected = !0, a.mainGrid.pressedZones[b.name] = {
                    zone: a.mainGrid.uiGridContainer.getChildByName(b.name),
                    bet: c,
                    coef: a.mainUIManager.defineCoefForBet(b)
                });
                a.mainUIManager.defineZonesForBet(b, .35, D, c * parseFloat(a.mainGrid.pressedZones[b.name].coef))
            }
            if (d) {
                if (b.name !=
                    C || void 0 == C) void 0 != C && a.mainGrid.zonesOut(), a.mainUIManager.defineZonesForBet(b, .35);
                C = b.name
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            a.mainGrid.gridContainer.down && t.addGridState();
            a.mainGrid.gridContainer.down = !1;
            a.mainGrid.zonesOut();
            C = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        A.addDragSprite();
        a.mainRenderer.stage.on("changeLang", M);
        a.mainGameManager.gameStateAsync(function (b) {
            S(b, function () {
                t = new f(a);
                G(b);
                c && c();
                P.setVisible(!0)
            })
        })
    }, function () {
        a.mainSoundManager.playRandomBackSound()
    });
    var M = function () {
        a.mainFLGAccount.updateAccountText();
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.onLanguageChange = M;
    this.createSmallChip = function (b, e) {
        var c = a.mainGrid.uiGridContainer.getChildByName(b.name);
        if (c.getChildByName("smallChip")) parseFloat(c.getChildByName("smallChipText").text) + e <= r(parseInt(b.name)) && (c.getChildByName("smallChipText").text = parseFloat(c.getChildByName("smallChipText").text) + e, c.getChildByName("smallChipText").text = +parseFloat(c.getChildByName("smallChipText").text).toFixed(10),
            c.getChildByName("smallChipText").visible = !0, c.getChildByName("smallChip").visible = !0); else {
            var d = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.chip_disabled.texture);
            e = new PIXI.Text(e, {font: "bold 28px Arial Narrow", fill: "#85deff"});
            e.name = "smallChipText";
            d.name = "smallChip";
            c.addChildAt(d, 0 == b.name ? 1 : 0);
            c.addChildAt(e, 0 == b.name ? 2 : 1);
            for (d = 0; d < c.children.length; d++) if ("smallChip" == c.children[d].name || "smallChipText" == c.children[d].name) c.children[d].anchor.x = .5, c.children[d].anchor.y = .5,
                c.children[d].position.y = b.height / 2, c.children[d].position.x = b.width / 2, "smallChip" == c.children[d].name && c.children[d].scale.set(.65, .65)
        }
    };
    this.defineCoefForBet = function (a) {
        if (36 >= a.name) return "36";
        if (42 >= a.name) return "3";
        if (48 >= a.name) return "2";
        if (135 >= a.name || 172 <= a.name && 195 >= a.name) return "18";
        if (136 == a.name || 137 == a.name || 196 <= a.name && 207 >= a.name) return "12";
        if (-1 != [141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171].indexOf(a.name)) return "6";
        if (250 > a.name) return "9"
    };
    this.defineZonesForBet = function (b,
                                       e, c, d, f) {
        var h;
        if (36 >= b.name) a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone").alpha = e, void 0 != c && D(a.mainGrid.uiGridContainer.getChildByName(b.name), d); else for (48 >= b.name ? h = a.mainGrid.buttonCombinations[b.name].zones : 250 > b.name && (h = a.mainGrid.combinations[b.name - 100]), b = 0; b < h.length; b++) a.mainGrid.uiGridContainer.getChildByName(h[b] + "innerZone").alpha = e, void 0 != c && D(a.mainGrid.uiGridContainer.getChildByName(h[b]), d, f)
    };
    var D = function (b, e, c) {
        c = void 0 != c ? c : !0;
        if (b.getChildByName("possibleWinInfo")) b.getChildByName("possibleWinText").text =
            e + parseFloat(b.getChildByName("possibleWinText").text), b.getChildByName("possibleWinText").text = +parseFloat(b.getChildByName("possibleWinText").text).toFixed(10), b.getChildByName("possibleWinText").visible = 0 < parseFloat(b.getChildByName("possibleWinText").text) && c, b.getChildByName("possibleWinInfo").visible = 0 < parseFloat(b.getChildByName("possibleWinText").text) && c; else if (!(0 > parseFloat(e))) for (c = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.possible_win_bg.texture), e = new PIXI.Text(+e.toFixed(10),
            {
                font: "bold 30px Arial Narrow",
                fill: "#ffffff"
            }), e.name = "possibleWinText", c.name = "possibleWinInfo", b.addChildAt(e, b.children.length), b.addChildAt(c, b.children.length - 1), e = 0; e < b.children.length; e++) if ("possibleWinInfo" == b.children[e].name || "possibleWinText" == b.children[e].name) b.children[e].anchor.x = .5, b.children[e].anchor.y = .5, b.children[e].position.y = b.height - b.children[e].height / 2, b.children[e].position.x = b.width / 2
    };
    this.showPossibleWin = D;
    this.setInteraction = function (b) {
        a.mainGrid.setZoneInteraction(b);
        A.setInteraction(b);
        n.getChildByName("delete").interactive = b;
        n.getChildByName("undo").interactive = b;
        n.getChildByName("auto").interactive = b;
        n.getChildByName("double").interactive = b;
        n.getChildByName("repeat").interactive = b;
        for (var e = 0; e < g.children.length; e++) g.children[e].interactive = b;
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.setTextScale = function (a) {
        switch (a.text.length) {
            case 4:
                a.scale.set(.65, .65);
                break;
            case 3:
                "MAX" == a.text ? a.scale.set(.7, .7) : a.scale.set(.8, .8);
                break;
            default:
                a.scale.set(1,
                    1)
        }
    };
    this.getFortuneObjectsByGrid = function () {
        var b = [], e;
        for (e in a.mainGrid.pressedZones) b.push({
            comb: parseInt(a.mainGrid.pressedZones[e].zone.name),
            coef: parseFloat(a.mainUIManager.defineCoefForBet(a.mainGrid.pressedZones[e].zone)),
            summ: a.mainGrid.pressedZones[e].bet
        });
        return b
    };
    this.getTotalSumByGrid = function () {
        var b = 0, e;
        for (e in a.mainGrid.pressedZones) b += parseFloat(a.mainGrid.pressedZones[e].bet).toFixed(10);
        return b
    };
    this.isAllowBet = function (b, e, c) {
        return parseFloat(e).toFixed(10) > r(b.comb) ? (c ?
            (c.betErrorCount++, c.betErrorFunc || (c.betErrorFunc = function () {
                a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet)
            })) : a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet), !1) : q.getTotalSumByGrid() + parseFloat(b.summ).toFixed(10) > clientInfoGlobal.cfstolmax / 100 ? (a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBetGame), !1) : !0
    };
    var O = 0, Q = 0, G = function (b) {
        function e(b) {
            a.mainGameManager && (y.playing || y.gotoAndStop(Math.ceil(b * (y.totalFrames - 1))), J.getChildByName("text" +
                J.name).text = I.getLastSeconds(), a.mainRenderer.renderManager.needUpdateRender = !0)
        }

        function c(b) {
            a.mainGameManager && ($(window).trigger("restartHls"), a.mainRenderer.renderManager.animationTweenInc(), (new TWEEN.Tween(n.position)).to({y: 955}, 900).easing(TWEEN.Easing.Back.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec()
            }).start(), a.mainFLGAccount.setWinTextVisible(!0), a.mainGrid.removeCurrentBets(), t.selectGridByStates(), a.mainUIManager.setInteraction(!0), z.addEdition(b.tir +
                1), N && t.repeatLastRoundGridState(), I.start({
                minutes: 0,
                seconds: a.gameConfig.tirTime - b.t2
            }, {minutes: 0, seconds: a.gameConfig.tirTime}, e, function () {
                z.getActedOutEdition().betsHistory.addBet({
                    fortuneBetObjArr: a.mainUIManager.getFortuneObjectsByGrid(),
                    winBet: void 0,
                    win: void 0,
                    code: void 0
                }, z.getActedOutEdition().round, function (b) {
                    b || (a.mainGrid.removeCurrentBets(), a.mainFLGAccount.totalBet(-a.mainFLGAccount.totalBet()))
                });
                t.clearGridStates();
                a.mainUIManager.setInteraction(!1);
                a.mainSoundManager.playSound("endBet");
                a.mainRenderer.renderManager.animationTweenInc();
                (new TWEEN.Tween(n.position)).to({y: 1084}, 900).easing(TWEEN.Easing.Back.In).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec()
                }).start()
            }, 10, G))
        }

        function d(b) {
            function c() {
                a.mainGameManager && (a.mainGameManager.gameStateAsync(d), a.mainRenderer.renderManager.needUpdateRender = !0)
            }

            function d(b) {
                a.mainGameManager && (99 != b.ball ? (setTimeout(function () {
                    if (a.mainFLGAccount) {
                        var c = setTimeout(function () {
                            t.showWinCombinations([]);
                            var c = a.gameConfig.winShowTime ?
                                a.gameConfig.winShowTime : 15E3;
                            a.mainGrid.showWinZone(parseInt(b.ball), function (c) {
                                a.mainSoundManager.playSound("winZone");
                                a.mainRenderer.renderManager.animationTweenInc();
                                0 === parseInt(b.ball) ? c.texture = a.mainRenderer.resourceLoader.resources.zone_win_big.texture : c.texture = a.mainRenderer.resourceLoader.resources.zone_win.texture;
                                var d = c.getChildByName("star");
                                d || (d = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.zone_win_star.texture), d.name = "star", d.anchor.set(.5, .5), c.addChildAt(d, 0));
                                d.position.set(c.width /
                                    2, c.height / 2);
                                d.rotation = 0;
                                (new TWEEN.Tween(d)).to({rotation: 2 * Math.PI}, a.gameConfig.winShowTime).start();
                                d = null;
                                d = c.getChildByName("textwinZone");
                                d.style = {
                                    font: "bold 60px Baltica",
                                    fill: "#ffffff",
                                    stroke: "#fff000",
                                    strokeThickness: 4
                                };
                                d.scale.set(1, 1);
                                var e = (new TWEEN.Tween(d.scale)).to({x: 2, y: 2}, a.gameConfig.winShowTime / 16),
                                    f = (new TWEEN.Tween(d.scale)).to({x: 1, y: 1}, a.gameConfig.winShowTime / 16);
                                e.chain(f);
                                f.chain(e);
                                e.start();
                                setTimeout(function () {
                                    e.stop();
                                    f.stop();
                                    f = e = null;
                                    a.mainRenderer.renderManager.animationTweenDec();
                                    c.visible = !1
                                }, a.gameConfig.winShowTime);
                                d = null
                            }, a.gameConfig.winShowTime);
                            O = setTimeout(G, c)
                        }, 5E3);
                        a.mainFLGAccount.calculateWin(z.getActedOutEdition().betsHistory.bets, a.gameConfig.appName, function (d) {
                            c && clearTimeout(c);
                            if (d && d.length) {
                                for (var e = [], f = 0; f < d.length; f++) e.push({
                                    comb: parseInt(d[f].nm),
                                    coef: parseFloat(d[f].cf).toFixed(10) / 100,
                                    summ: parseFloat(d[f].sm).toFixed(10) / 100,
                                    winBet: b.ball
                                });
                                t.showWinCombinations(e);
                                e = null
                            }
                            a.mainGrid.showWinZone(parseInt(b.ball), function (c) {
                                a.mainSoundManager.playSound("winZone");
                                a.mainRenderer.renderManager.animationTweenInc();
                                0 == parseInt(b.ball) ? c.texture = a.mainRenderer.resourceLoader.resources.zone_win_big.texture : c.texture = a.mainRenderer.resourceLoader.resources.zone_win.texture;
                                var d = c.getChildByName("star");
                                d || (d = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.zone_win_star.texture), d.name = "star", d.anchor.set(.5, .5), c.addChildAt(d, 0));
                                d.position.set(c.width / 2, c.height / 2);
                                d.rotation = 0;
                                (new TWEEN.Tween(d)).to({rotation: 2 * Math.PI}, a.gameConfig.winShowTime).start();
                                d = null;
                                d = c.getChildByName("textwinZone");
                                d.style = {
                                    font: "bold 60px Baltica",
                                    fill: "#ffffff",
                                    stroke: "#fff000",
                                    strokeThickness: 4
                                };
                                d.scale.set(1, 1);
                                var e = (new TWEEN.Tween(d.scale)).to({x: 2, y: 2}, a.gameConfig.winShowTime / 16),
                                    f = (new TWEEN.Tween(d.scale)).to({x: 1, y: 1}, a.gameConfig.winShowTime / 16);
                                e.chain(f);
                                f.chain(e);
                                e.start();
                                setTimeout(function () {
                                    e.stop();
                                    f.stop();
                                    f = e = null;
                                    a.mainRenderer.renderManager.animationTweenDec();
                                    c.visible = !1
                                }, a.gameConfig.winShowTime);
                                d = null
                            }, a.gameConfig.winShowTime);
                            d = a.gameConfig.winShowTime ?
                                a.gameConfig.winShowTime : 15E3;
                            O = setTimeout(G, d);
                            a.mainFLGAccount.winToBalanceAnimation(d, 2E3, {
                                x: 972,
                                y: 324
                            }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                font: "bold 70px Arial",
                                fill: "#bcbcbc"
                            })
                        }, a.gameConfig);
                        z.cancelLastEdition([b.ball]);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }
                }, 500), a.mainRenderer.renderManager.needUpdateRender = !0) : Q = setTimeout(c, 500))
            }

            a.mainGameManager && (b = a.gameConfig.rTime - Math.abs(parseInt(b.t2, 10)) + 1, setTimeout(c, 1E3 * b), a.mainUIManager.setInteraction(!1), a.mainFLGAccount.setWinTextVisible(!1))
        }

        function f(a) {
            0 >= a.t2 ? d(a) : c(a)
        }

        void 0 != a.mainGameManager && (b ? f(b) : a.mainGameManager.gameStateAsync(f))
    }
};
