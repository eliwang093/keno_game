registrationAppOnPlatform({
    category: "casino",
    catalog: "Black_Roulette_1_min",
    image: "games/BlackRoulette/resources/icons/BlackRoulette.png",
    imageBack: "games/BlackRoulette/resources/icons/BlackRoulette-back.png",
    caption: "Black Roulette",
    runConfig: "BlackRoulette",
    gameType: "black",
    playInDemo: !1
});
registrationAppOnPlatform({
    category: "casino",
    catalog: "Black_Roulette_1_min",
    image: "games/BlackRoulette/resources/icons/BlackRoulette.png",
    imageBack: "games/BlackRoulette/resources/icons/BlackRoulette-back.png",
    caption: "E-Table Roulette",
    runConfig: "BlackRoulette",
    gameType: "black2",
    playInDemo: !1,
    sid: 15
});
registrationAppOnPlatform({
    category: "casino",
    catalog: "Black_Roulette_1_min",
    image: "games/BlackRoulette/resources/icons/RedRoulette.png",
    imageBack: "games/BlackRoulette/resources/icons/RedRoulette-back.png",
    caption: "Red Roulette",
    runConfig: "BlackRoulette",
    gameType: "red",
    playInDemo: !1,
    gameBG: "images/games-bg/game-bg-red.jpg"
});
var configsBlackRoulette = {
    black: {
        serverName: "srv63",
        serverNum: "s63",
        appName: "bets_63",
        BG: "bg-black.png",
        videoURL: "rtmp://w1.flg10.bet:1935/Rulette1&amp;Video0=myStream:180",
        videoMobileURL: "https://w1.flg10.bet/Rulette1/smil:Roulette-Black.smil/playlist.m3u8",
        videoPos: {x: 561, y: -15},
        videoSize: {w: 797, h: 531},
        fullscreenPosY: -45,
        videoScreenshotOffsetY: 30,
        canvasId: "",
        runconfig: "BlackRouletteBlack",
        gameType: "Black",
        gameKind: "Roulette",
        gameVariant: "",
        betSeparator: "_",
        offset4Result: 2E3,
        needHls: !1,
        needRtc: !0,
        videoRtcUrl: "wss://wrtc.flg10.bet/webrtc-session.json",
        videoRtcApp: "Roulette_Black",
        videoRtcStream: "myStream_aac",
        winShowTime: 1E4,
        timerOffset: 14,
        restartHlsSec: 25
    }, red: {
        serverName: "srv53",
        serverNum: "s53",
        appName: "bets_53",
        BG: "bg-red3.jpg",
        videoURL: "rtmp://w1.flg10.bet:1935/Rulette2&amp;Video0=myStream:180",
        videoMobileURL: "https://w1.flg10.bet/Rulette2/smil:Roulette-Red.smil/playlist.m3u8",
        videoPos: {x: 639, y: 20},
        videoSize: {w: 642, h: 410},
        fullscreenPosY: -50,
        videoScreenshotOffsetY: 0,
        noVideo: !0,
        canvasId: "",
        runconfig: "BlackRouletteRed",
        gameType: "Red",
        gameKind: "Roulette",
        gameVariant: "",
        betSeparator: "_",
        offset4Result: 5E3,
        needHls: !1,
        needRtc: !0,
        videoRtcUrl: "wss://wrtc.flg10.bet/webrtc-session.json",
        videoRtcApp: "Roulette_Red",
        videoRtcStream: "myStream_aac",
        winShowTime: 1E4,
        timerOffset: 17,
        restartHlsSec: 15
    }, black2: {
        serverName: "srv78",
        serverNum: "s78",
        appName: "bets_78",
        BG: "bg-black.png",
        videoURL: "rtmp://w1.flg10.bet:1935/Rulette1&amp;Video0=myStream:180",
        videoMobileURL: "https://w1.flg10.bet/Rulette1/smil:Roulette (E-Table).smil/playlist.m3u8",
        videoPos: {x: 561, y: -15},
        videoSize: {w: 797, h: 531},
        fullscreenPosY: -45,
        videoScreenshotOffsetY: 30,
        canvasId: "",
        runconfig: "BlackRouletteBlack",
        gameType: "Black2",
        gameKind: "Roulette",
        gameVariant: "",
        betSeparator: "_",
        offset4Result: 2E3,
        needHls: !1,
        needRtc: !0,
        videoRtcUrl: "wss://wrtc.flg10.bet/webrtc-session.json",
        videoRtcApp: "Roulette (E-Table)",
        videoRtcStream: "myStream_aac",
        winShowTime: 1E4,
        timerOffset: 14,
        restartHlsSec: 25
    }
}, BlackRouletteObjectsArr = {black: void 0, red: void 0};

function emitEventBlackRoulette(a, r) {
    for (var x in BlackRouletteObjectsArr) BlackRouletteObjectsArr[x] && BlackRouletteObjectsArr[x].mainRenderer.stage.emit(a, r)
}

function removeBlackRouletteObject(a, r) {
    if (void 0 != BlackRouletteObjectsArr[r]) {
        BlackRouletteObjectsArr[r].destroy();
        for (var x in BlackRouletteObjectsArr[r]) BlackRouletteObjectsArr[r][x] = null;
        BlackRouletteObjectsArr[r] = null
    }
    $("#" + a + " canvas").remove();
    $("#" + a + " div").remove()
}

function initBlackRouletteObject(a, r) {
    configsBlackRoulette[r].canvasId = a;
    BlackRouletteObjectsArr[r] = mobileMode ? new BlackRouletteAppMobile(configsBlackRoulette[r]) : new BlackRouletteApp(configsBlackRoulette[r])
}

function refreshBlackRouletteObject(a, r) {
    removeBlackRouletteObject(a, r.toLowerCase());
    initBlackRouletteObject(a, r.toLowerCase())
}

function BlackRouletteApp(a) {
    this.destroy = function () {
        P.destroy();
        P = null;
        y.destroy();
        y = null;
        T.destroy();
        T = null;
        E.destroy();
        E = null;
        x.destroy();
        x = null;
        r.mainSoundManager.destroy();
        for (var K in r) r[K] = null;
        r = null
    };
    var r = this;
    this.gameDir = "games/BlackRoulette/resources/";
    this.gameConfig = a;
    var x = new FLGRenderer(1920, 1080, a.canvasId, "center");
    this.mainRenderer = x;
    this.mainSoundManager = new SoundManager(r.gameConfig.gameKind, r.gameConfig.gameType, r.gameConfig.gameVariant);
    var T = new FLGAccount(null, r.mainSoundManager,
        r.mainRenderer);
    this.mainFLGAccount = T;
    var E = new gameManagerBlackRoulette(this);
    this.mainGameManager = E;
    var P = new UIManagerBlackRoulette(this);
    this.mainUIManager = P;
    var y;
    this.setMainGrid = function (K) {
        y = K;
        r.mainGrid = y
    };
    localStorage.removeItem("lastRoundGridStateBlack" + a.gameKind + a.gameType)
}

function gameManagerBlackRoulette(a) {
    this.destroy = function () {
        T = x = null;
        for (var E in r) r[E] = null;
        r = null
    };
    var r = this, x = {};
    this.gameStateAsync = function (E) {
        T(E)
    };
    var T = function (E) {
        let P = getUrl(),
            y = {oper: "getgameinfo", id_srv: a.gameConfig.serverName.slice(3, a.gameConfig.serverName.length)};
        "s38" == a.gameConfig.serverNum && (P = getUrl(a.gameConfig.serverNum, gamePostfix) + "?" + clientInfoGlobal[a.gameConfig.serverName], y = null);
        $.ajax({
            type: "get", url: P, data: y, dataType: "json", success: function (K, Z, M) {
                try {
                    x = K, E && E(x)
                } catch (W) {
                    a.mainRenderer.logService.log(mainLocalizationTable.connError,
                        redirectToRootURL, "critical")
                }
            }, error: function (K, Z, M) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
            }
        })
    };
    this.gameHistory = function (E) {
        E && x && x.history && x.history !== {} && E(x.history)
    }
}

function UIManagerBlackRoulette(a) {
    function r() {
        I.getActedOutEdition().betsHistory.addBet({
            fortuneBetObjArr: a.mainUIManager.getFortuneObjectsByGrid(),
            winBet: void 0,
            win: void 0,
            code: void 0
        }, I.getActedOutEdition().round, function (b) {
            b || (a.mainGrid.removeCurrentBets(), a.mainFLGAccount.totalBet(0))
        });
        z.clearGridStates()
    }

    function x(b) {
        this.destroy = function () {
            for (var e = 0; e < d.length; e++) {
                for (var n in d[e]) d.length - 1 == e && d[e][n].summ && b.mainFLGAccount.totalBet(-d[e][n].summ), d[e][n] = null;
                d[e] = null
            }
            h = lastRoundNum =
                c = d = null;
            for (e in g) g[e] = null;
            g = null
        };
        var g = this, d = [];
        this.states = function () {
            return d
        };
        var c = [];
        this.saveGridStateInStorage = function () {
            localStorage.setItem("curUser", JSON.stringify({hall: clientInfoGlobal.hall, nick: clientInfoGlobal.nick}));
            d && localStorage.setItem("gridStatesBlack" + a.gameConfig.gameKind + a.gameConfig.gameType, JSON.stringify(d));
            c && localStorage.setItem("lastRoundGridStateBlack" + a.gameConfig.gameKind + a.gameConfig.gameType, JSON.stringify(c))
        };
        this.loadGridStateFromStorage = function () {
            if (localStorage.getItem("curUser")) {
                var e =
                    JSON.parse(localStorage.getItem("curUser"));
                if (e.hall != clientInfoGlobal.hall && e.nick != clientInfoGlobal.nick) return
            }
            localStorage.getItem("gridStatesBlack" + a.gameConfig.gameKind + a.gameConfig.gameType) && (d = JSON.parse(localStorage.getItem("gridStatesBlack" + a.gameConfig.gameKind + a.gameConfig.gameType)));
            localStorage.getItem("lastRoundGridStateBlack" + a.gameConfig.gameKind + a.gameConfig.gameType) && (c = JSON.parse(localStorage.getItem("lastRoundGridStateBlack" + a.gameConfig.gameKind + a.gameConfig.gameType)))
        };
        this.addGridState = function (e) {
            var n = e ? e : b.mainUIManager.getFortuneObjectsByGrid();
            if (!d.length || n.length || d[d.length - 1].length) d.push(n), g.saveGridStateInStorage(), e && h()
        };
        this.doubleCurrentBets = function () {
            var e = {betErrorCount: 0, betErrorFunc: null}, n = 0, k;
            for (k in a.mainGrid.pressedZones) if (n++, a.mainUIManager.isAllowBet({
                comb: parseInt(k),
                coef: void 0,
                summ: a.mainGrid.pressedZones[k].bet
            }, 2 * a.mainGrid.pressedZones[k].bet, e)) {
                if (-1 == a.mainFLGAccount.totalBet(parseFloat(a.mainGrid.pressedZones[k].bet))) return;
                a.mainUIManager.defineZonesForBet(a.mainGrid.pressedZones[k].zone, .35, S, parseFloat(a.mainGrid.pressedZones[k].bet).toFixed(10) * parseFloat(a.mainGrid.pressedZones[k].coef).toFixed(10));
                a.mainGrid.pressedZones[k].bet *= 2;
                a.mainGrid.pressedZones[k].spread.main *= 2;
                for (var q in a.mainGrid.pressedZones[k].spread.sectors) a.mainGrid.pressedZones[k].spread.sectors[q] *= 2;
                var m = a.mainGrid.pressedZones[k].bet - parseFloat(K(a.mainGrid.pressedZones[k].zone.getChildByName("smallChipText").text)).toFixed(10);
                if (40 <=
                    a.mainGrid.pressedZones[k].zone.name && 48 >= a.mainGrid.pressedZones[k].zone.name) b.mainUIManager.createSmallChip(a.mainGrid.uiButtonsContainer.getChildByName(a.mainGrid.pressedZones[k].zone.name), m); else {
                    b.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(a.mainGrid.pressedZones[k].zone.name), m);
                    if (100 <= a.mainGrid.pressedZones[k].zone.name && 136 >= a.mainGrid.pressedZones[k].zone.name || 179 == a.mainGrid.pressedZones[k].zone.name || 187 == a.mainGrid.pressedZones[k].zone.name || 1 == a.mainGrid.pressedZones[k].zone.name ||
                        26 == a.mainGrid.pressedZones[k].zone.name) for (m = 49; 52 >= m; m++) a.mainGrid.pressedZones[k].spread.sectors[m] && 0 < a.mainGrid.pressedZones[k].spread.sectors[m] && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(m), a.mainGrid.pressedZones[k].spread.sectors[m] / 2);
                    36 >= a.mainGrid.pressedZones[k].zone.name && 0 < a.mainGrid.pressedZones[k].spread.main && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(a.mainGrid.pressedZones[k].zone.name), a.mainGrid.pressedZones[k].spread.main /
                        2)
                }
            }
            0 < e.betErrorCount && e.betErrorFunc();
            e.betErrorCount != n && g.addGridState();
            e.betErrorCount = null;
            e.betErrorFunc = null
        };
        this.undoGridState = function () {
            d.length && (d.pop(), g.saveGridStateInStorage(), b.mainGrid.removeCurrentBets(), a.mainFLGAccount.totalBet(-a.mainFLGAccount.totalBet()), h())
        };
        this.clearGridStates = function () {
            if (d && d.length) {
                if (c && c.length && d[d.length - 1].length) {
                    for (var e in c) c[e] = null;
                    c = []
                }
                d[d.length - 1].length && (c = d[d.length - 1].slice());
                for (var n = 0; n < d.length; n++) {
                    for (e in d[n]) d[n][e] =
                        null;
                    d[n] = null
                }
                d = []
            }
            g.saveGridStateInStorage()
        };
        this.repeatLastRoundGridState = function () {
            c && c.length && g.addGridState(c.slice())
        };
        this.showWinCombinations = function (e) {
            b.mainGrid.removeCurrentBets();
            h(e, !0)
        };
        var h = function (e, n) {
            var k = e ? e : d[d.length - 1], q = void 0 != n ? n : !1, m = {betErrorCount: 0, betErrorFunc: null};
            k && k.length && (b.mainGrid.pressZonesByObjectArr(k, function (l) {
                if (b.mainUIManager.isAllowBet({
                    comb: parseInt(l.zone.name),
                    coef: void 0,
                    summ: l.bet
                }, b.mainGrid.pressedZones[l.zone.name] ? b.mainGrid.pressedZones[l.zone.name].bet +
                    l.bet : l.bet, m)) {
                    if (e || q) e && e.length && (parseInt(k[0].winBet) != parseInt(l.zone.name) && (40 <= l.zone.name && 48 >= l.zone.name ? b.mainUIManager.createSmallChip(a.mainGrid.uiButtonsContainer.getChildByName(l.zone.name), l.bet) : (b.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(l.zone.name), l.bet), 36 >= l.zone.name && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(l.zone.name), l.bet))), b.mainGrid.pressedZones[l.zone.name] = {
                        zone: 40 <= l.zone.name && 48 >= l.zone.name ?
                            b.mainGrid.uiButtonsContainer.getChildByName(l.zone.name) : b.mainGrid.uiGridContainer.getChildByName(l.zone.name),
                        bet: l.bet,
                        coef: b.mainUIManager.defineCoefForBet(l.zone)
                    }, b.mainUIManager.defineZonesForBet(l.zone, .35, b.mainUIManager.showPossibleWin, parseFloat(l.bet).toFixed(10) * parseFloat(b.mainGrid.pressedZones[l.zone.name].coef).toFixed(10), !1), b.mainGrid.uiGridContainer.getChildByName(parseInt(k[0].winBet)).getChildByName("possibleWinText").visible = !0, b.mainGrid.uiGridContainer.getChildByName(parseInt(k[0].winBet)).getChildByName("possibleWinInfo").visible =
                        !0); else {
                        if (-1 == b.mainFLGAccount.totalBet(parseFloat(l.bet))) return;
                        if (40 <= l.zone.name && 48 >= l.zone.name) b.mainUIManager.createSmallChip(a.mainGrid.uiButtonsContainer.getChildByName(l.zone.name), l.bet); else {
                            b.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(l.zone.name), l.bet);
                            if (100 <= l.zone.name && 136 >= l.zone.name || 179 == l.zone.name || 187 == l.zone.name || 1 == l.zone.name || 26 == l.zone.name) for (var f = 49; 52 >= f; f++) l.spread.sectors[f] && 0 < l.spread.sectors[f] && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(f),
                                l.spread.sectors[f]);
                            36 >= l.zone.name && 0 < l.spread.main && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(l.zone.name), l.spread.main)
                        }
                        l.zone.selected ? (b.mainGrid.pressedZones[l.zone.name].bet = 40 <= l.zone.name && 48 >= l.zone.name ? parseFloat(b.mainGrid.uiButtonsContainer.getChildByName(l.zone.name).getChildByName("smallChipText").text).toFixed(10) : parseFloat(b.mainGrid.uiGridContainer.getChildByName(l.zone.name).getChildByName("smallChipText").text).toFixed(10), b.mainGrid.pressedZones[l.zone.name].spread.main +=
                            l.spread.main, b.mainGrid.pressedZones[l.zone.name].spread.sectors[l.zone.name] = b.mainGrid.pressedZones[l.zone.name].spread.sectors[l.zone.name] ? b.mainGrid.pressedZones[l.zone.name].spread.sectors[l.zone.name] + l.spread.sectors[l.zone.name] : l.spread.sectors[l.zone.name]) : (l.zone.selected = !0, b.mainGrid.pressedZones[l.zone.name] = {
                            zone: 40 <= l.zone.name && 48 >= l.zone.name ? b.mainGrid.uiButtonsContainer.getChildByName(l.zone.name) : b.mainGrid.uiGridContainer.getChildByName(l.zone.name),
                            bet: l.bet,
                            coef: b.mainUIManager.defineCoefForBet(l.zone),
                            spread: {sectors: Object.assign({}, l.spread.sectors), main: l.spread.main}
                        });
                        b.mainUIManager.defineZonesForBet(l.zone, .35, b.mainUIManager.showPossibleWin, parseFloat(l.bet).toFixed(10) * parseFloat(b.mainGrid.pressedZones[l.zone.name].coef).toFixed(10))
                    }
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }), b.mainGrid.zonesOut(), 0 < m.betErrorCount && !q && m.betErrorFunc(), m.betErrorCount = null, m = m.betErrorFunc = null)
        };
        this.selectGridByStates = h;
        g.loadGridStateFromStorage()
    }

    function T(b) {
        this.destroy = function () {
            d.destroy();
            n = e = h = k = c = d = null;
            for (var f = 0; f < q.length; f++) {
                for (var u in q[f]) q[f][u] = null;
                q[f] = null
            }
            l = m = q = null;
            for (f in g) g[f] = null;
            g = null
        };
        var g = this, d = new PIXI.Graphics;
        d.beginFill(16777215, 0);
        d.drawRect(0, 0, b.mainRenderer.canvasSize.width, b.mainRenderer.canvasSize.height);
        d.endFill();
        var c = new PIXI.Sprite(d.generateTexture(!1));
        c.width = c.texture.width;
        c.height = c.texture.height;
        c.interactive = !0;
        c.hitArea = new PIXI.Rectangle(0, 0, c.width, c.texture.height);
        var h = function (f) {
            k.data = f.data;
            k.dragging = !0;
            f = k.data.getLocalPosition(k.parent);
            k.position.x = f.x;
            k.position.y = f.y;
            k.visible = !0;
            b.mainGrid.gridContainer.down = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, e = function () {
            k.dragging = !1;
            k.data = null;
            k.visible = !1;
            b.mainGrid.gridContainer.down = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, n = function () {
            if (k.dragging) {
                var f = k.data.getLocalPosition(k.parent);
                k.position.x = f.x;
                k.position.y = f.y
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        c.on("mousedown", h).on("touchstart", h).on("mousemove", n).on("touchmove", n).on("mouseup",
            e).on("touchend", e).on("mouseupoutside", e).on("touchendoutside", e);
        b.mainRenderer.stage.addChildAt(c, 0);
        var k = b.mainRenderer.createButton(c, 0, 0, void 0, void 0);
        k.anchor.set(.5, .5);
        k.visible = !1;
        this.addDragSprite = function (f) {
            b.mainRenderer.stage.addChild(k)
        };
        this.setInteraction = function (f) {
            c.interactive = f;
            k.visible = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        var q = [], m = {};
        this.currentMode = function () {
            return m
        };
        var l = function (f) {
            m = f;
            k.texture = b.mainRenderer.resourceLoader.resources[m.modeSprite.name].texture;
            k.width = k.texture.width;
            k.height = k.texture.height;
            k.scale.set(.65, .65);
            f = k.getChildByName("modeDragSpriteText");
            m.modeSprite.text ? f ? (f.text = m.modeSprite.text, f.visible = !0) : (f = new PIXI.Text(m.modeSprite.text, m.modeSprite.style), f.style.align = "center", f.name = "modeDragSpriteText", k.addChild(f)) : f && (f.visible = !1);
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        this.setMode = function (f) {
            if (f && f.modeName != m.modeName) {
                for (var u = 0; u < q.length; u++) if (f.modeName == q[u].modeName) {
                    l(q[u]);
                    return
                }
                q.push(f);
                l(q[q.length -
                1])
            }
        }
    }

    function E(b) {
        this.destroy = function () {
            for (var m = 0; m < d.length; m++) d[m].round = null, d[m].editionResult = null, d[m].betsHistory.destroy && d[m].betsHistory.destroy(), d[m] = null;
            q = k = n = e = c = RoundText = d = null;
            for (m in g) g[m] = null;
            g = null
        };
        var g = this, d = [];
        this.editions = d;
        var c;
        this.historyTable = function () {
            return c
        };
        this.getActedOutEdition = function () {
            for (var m = d.length - 1; 0 <= m; m--) if (void 0 == d[m].editionResult) return e(m), d[m];
            e(d.length - 1);
            return d[d.length - 1]
        };
        for (var h = 0; h < b.length; h++) d.push({
            round: b[h].round,
            editionResult: b[h].editionResult, betsHistory: b[h].betsHistory
        }), d[h].betsHistory.setRoundResult(d[h].editionResult);
        var e = function (m) {
            0 > m || m >= d.length || (a.mainRenderer.renderManager.needUpdateRender = !0)
        };
        e(d.length - 1);
        this.drawEditions = function () {
            c = new PIXI.Container;
            t.addChild(c)
        };
        var n = function () {
        };
        this.redrawEditionHeader = n;
        new PIXI.Container;
        var k = function () {
        };
        this.drawBetsHeader = k;
        var q = function (m) {
            for (m = 22; 0 < m; m--) A.setHistoryItem(m, d[m].editionResult[0], void 0 != d[m].editionResult[0] ? a.mainUIManager.getBallColorByCode(d[m].editionResult[0]) :
                "")
        };
        this.drawEditionHistory = q;
        this.cancelLastEdition = function (m) {
            d[d.length - 1].editionResult = m;
            d[d.length - 1].betsHistory.setRoundResult(m);
            e(d.length - 1)
        };
        this.addEdition = function (m) {
            d[0].betsHistory.destroy && d[0].betsHistory.destroy();
            d[0].betsHistory = null;
            d.shift();
            d.push({round: m, editionResult: void 0, betsHistory: new P([])});
            e(d.length - 1)
        }
    }

    function P(b) {
        this.destroy = function () {
            for (var h = 0; h < d.length; h++) {
                for (var e = 0; e < d[h].fortuneBetObjArr.length; e++) d[h].fortuneBetObjArr[e].comb = null, d[h].fortuneBetObjArr[e].coef =
                    null, d[h].fortuneBetObjArr[e].summ = null, d[h].fortuneBetObjArr[e] = null;
                d[h].fortuneBetObjArr = null;
                d[h].winBet = null;
                d[h].win = null;
                d[h].code = null;
                d[h] = null
            }
            d = null;
            for (h in g) g[h] = null;
            g = null
        };
        var g = this, d = [];
        this.bets = d;
        if (b.length) for (var c = 0; c < b.length; c++) d.push({
            fortuneBetObjArr: b[c].fortuneBetObjArr.slice(),
            winBet: b[c].winBet,
            win: b[c].win,
            code: b[c].code
        });
        this.addBet = function (h, e, n) {
            a.mainFLGAccount.placeFortuneBet(h, e, a.gameConfig, function (k) {
                void 0 == k || 500 <= d.length || -1 == k ? n && n(!1) : (d.push({
                    fortuneBetObjArr: h.fortuneBetObjArr.slice(),
                    winBet: h.winBet, win: h.win, code: k
                }), n && n(!0), a.mainRenderer.renderManager.needUpdateRender = !0)
            })
        };
        this.removeLasBet = function (h) {
            d.length && a.mainFLGAccount.removeRoulette4kBet(d[d.length - 1].code, a.gameConfig, function (e) {
                void 0 == e || -1 == e ? h && h(!1) : (d.pop(), h && h(!0), a.mainRenderer.renderManager.needUpdateRender = !0)
            })
        };
        this.setRoundResult = function (h) {
            for (var e = 0; e < d.length; e++) d[e].winBet = h
        }
    }

    const {format1000toK: y, formatKto1000: K, numFormat: Z} = UTILS;
    this.destroy = function () {
        clearTimeout(qa);
        clearTimeout(ra);
        M.events.removeAllListeners();
        aa = Q = null;
        B.destroy();
        B = null;
        X.destroy();
        X = null;
        A.destroy();
        A = null;
        J && (a.gameConfig.needHls ? J.destroy() : a.gameConfig.needRtc && rtcVideo.destroy());
        W = sa = F = ha = D = R = t = ta = J = null;
        for (var b = 0; b < N.length; b++) N[b].round = null, N[b].editionResult = null, N[b].betsHistory.destroy && N[b].betsHistory.destroy(), N[b].betsHistory = null, N[b] = null;
        ua = N = null;
        for (b in v) v[b] = null;
        ba = va = wa = ca = S = xa = ia = ja = ka = la = ma = na = oa = G = L = O = Y = v = null;
        a.mainFLGAccount.events.off("onBet", da);
        a.mainFLGAccount.events.off("onBalance",
            ea);
        ea = da = null;
        I.destroy();
        I = null;
        z.destroy();
        z = null;
        U.destroy();
        U = null;
        for (b in M) M[b] = null;
        M = null
    };
    var M = this;
    this.events = new PIXI.utils.EventEmitter;
    for (var W = function (b) {
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
    }, Q = clientInfoGlobal.coin6.split("-"), fa = 0; fa < Q.length; fa++) Q[fa] /= 100;
    Q.push("MAX");
    var B = new betsControls(Q[0], Q[Q.length - 1], Q[1], Q, function (b) {
        b = W(b.comb) - b.curSumm;
        a.mainFLGAccount.balance() < b && (b = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return b
    });
    this.betsControls = B;
    var A, X = new FLGTimer, J, ta = new PIXI.Container, t = new PIXI.Container, R = new PIXI.Container,
        D = new PIXI.Container, ha = new PIXI.Container, F, I, z;
    this.betManager = function () {
        return z
    };
    var U, sa = function (b) {
            var g = [];
            if (!b) return g;
            for (var d in b) 0 != b[d].code ? g.push({
                fortuneBetObjArr: [{
                    comb: b[d].e1,
                    coef: b[d].koef,
                    summ: b[d].bet / 100
                }], win: b[d].win / 100, code: b[d].code
            }) : g[g.length - 1].fortuneBetObjArr.push({comb: b[d].e1, coef: b[d].koef, summ: b[d].bet / 100});
            return g
        }, N = [], ua = function (b, g) {
            a.mainGameManager.gameHistory(function (d) {
                for (var c,
                         h = 21; 0 <= h; h--) c = d[h + ""], N.push({
                    round: c.tir,
                    editionResult: [c.ball],
                    betsHistory: new P([])
                });
                d = N;
                c = d.push;
                h = b.tir;
                var e = [], n = b.ball;
                99 != n && e.push(n);
                c.call(d, {round: h, editionResult: e, betsHistory: new P(0 < b.t2 ? sa(b.rulbet) : [])});
                I = new E(N);
                I.drawEditions();
                g && g()
            })
        }, v = {}, Y = function (b, g, d, c, h) {
            b && (v[g] ? v[g].stop() : (a.mainRenderer.renderManager.animationTweenInc(), v[g] = (new TWEEN.Tween(b.position)).to({
                x: d,
                y: c
            }, 500).easing(TWEEN.Easing.Cubic.InOut).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                v[g] = null
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                v[g] = null;
                h && h()
            }).start()))
        }, O = function (b, g) {
            b && (v[g] && (v[g].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), v[g] = (new TWEEN.Tween(b)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                v[g] = null;
                a.mainRenderer.renderManager.animationTweenInc();
                v[g] = (new TWEEN.Tween(b)).to({alpha: 0},
                    500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    v[g] = null
                }).start()
            }).start())
        }, L = function (b, g, d) {
            if (b && 1 != b.alpha) switch (v[g] && (v[g].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), d) {
                case "grow":
                    v[g] = (new TWEEN.Tween(b.scale)).to({
                        x: 1.2,
                        y: 1.2
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        v[g] = null
                    }).start();
                    break;
                default:
                    v[g] = (new TWEEN.Tween(b)).to({alpha: .6},
                        110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        v[g] = null
                    }).start()
            }
        }, G = function (b, g, d) {
            v[g] && (v[g].stop(), a.mainRenderer.renderManager.animationTweenDec());
            if (b && 0 != b.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(), d) {
                case "grow":
                    v[g] = (new TWEEN.Tween(b.scale)).to({
                        x: .9,
                        y: .9
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        v[g] = null
                    }).start();
                    break;
                default:
                    v[g] =
                        (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            v[g] = null
                        }).start()
            }
        }, oa = function () {
            a.mainSoundManager.playSound("buttonClick");
            r();
            a.mainFLGAccount.closeGame()
        }, na = function () {
            $(this).hasClass("btn_disabled") || 0 == a.mainGrid.pressedZones.length || (a.mainSoundManager.playSound("stackChip"), z.doubleCurrentBets())
        }, ma = function () {
            $(this).hasClass("btn_disabled") || 0 == a.mainGrid.pressedZones.length || (a.mainSoundManager.playSound("clearBet"), a.mainGrid.removeCurrentBets(),
                a.mainFLGAccount.maxWin(0), a.mainFLGAccount.totalBet(-a.mainFLGAccount.totalBet()), z.addGridState())
        }, la = function () {
            $(this).hasClass("btn_disabled") || (a.mainSoundManager.playSound("stackChip"), z.repeatLastRoundGridState(), A.setRebetInteraction(!1))
        }, ka = function () {
            $(this).hasClass("btn_disabled") || (a.mainSoundManager.playSound("stackChip"), z.repeatLastRoundGridState(), z.doubleCurrentBets(), A.setRebetInteraction(!1))
        }, ja = function () {
            $(this).hasClass("btn_disabled") || (a.mainSoundManager.playSound("buttonClick"),
                z.undoGridState())
        }, ia = function () {
            a.mainSoundManager.playSound("buttonClick");
            showCashFlowDlg()
        }, xa = function (b, g) {
            a.mainSoundManager.playSound("chipSelector");
            b = K(b);
            B.setBet(b);
            U.setMode({modeName: b, modeSprite: {name: g}})
        }, da, ea,
        ca = [["bg", a.gameDir + a.gameConfig.BG], ["WIN", a.gameDir + "WIN3.png"], ["table_bg_main", a.gameDir + "table-bg-main.png"], ["table_bg_sectors", a.gameDir + "table-bg-sectors3.png"], ["table_bg_footer", a.gameDir + "table-bg-footer.png"], ["table_disable_main", a.gameDir + "disable-table-main.png"],
            ["table_disable_sectors", a.gameDir + "disable-table-sectors2.png"], ["table_disable_footer", a.gameDir + "disable-table-footer.png"], ["btn_switch_sectors", a.gameDir + "btn-switch-sectors.png"], ["btn_switch_sectors_mode_selected", a.gameDir + "btn-switch-sectors-mode-selected.png"], ["btn_switch_grid", a.gameDir + "btn-switch-grid.png"], ["btn_switch_grid_mode_selected", a.gameDir + "btn-switch-grid-mode-selected.png"], ["btn_clear", a.gameDir + "btn-clear.png"], ["btn_clear_mode_selected", a.gameDir + "btn-clear-mode-selected.png"],
            ["btn_undo", a.gameDir + "btn-undo_.png"], ["btn_undo_mode_selected", a.gameDir + "btn-undo-mode-selected_.png"], ["btn_home", a.gameDir + "btn-home.png"], ["btn_home_mode_selected", a.gameDir + "btn-home-mode-selected.png"], ["btn_double", a.gameDir + "btn-double.png"], ["btn_double_mode_selected", a.gameDir + "btn-double-mode-selected.png"], ["btn_bets", a.gameDir + "btn-my-bets.png"], ["btn_bets_mode_selected", a.gameDir + "btn-my-bets-selected.png"], ["btn_rebet", a.gameDir + "btn-rebet-min.png"], ["btn_rebet_mode_selected", a.gameDir +
            "btn-rebet-mode-selected-min.png"], ["btn_rebetx2", a.gameDir + "btn-rebetx2.png"], ["btn_rebetx2_mode_selected", a.gameDir + "btn-rebetx2-mode-selected.png"], ["btn_video", a.gameDir + "btn-video-.png"], ["btn_video_mode_selected", a.gameDir + "btn-video--mode-selected.png"], ["btn_video_close", a.gameDir + "video-close3.png"], ["btn_video_close_mode_selected", a.gameDir + "video-close3-mode-selected.png"], ["btn_video_load", a.gameDir + "btn-video-load.png"], ["inner_zone", a.gameDir + "inner-zone6.png"], ["inner_zone_zero", a.gameDir +
            "inner-zone-zero3.png"], ["inner_sector_cube", a.gameDir + "inner-sector-cube3.png"], ["inner_sector_11", a.gameDir + "inner-sector-11_3.png"], ["inner_sector_16", a.gameDir + "inner-sector-16_3.png"], ["inner_sector_30", a.gameDir + "inner-sector-30_3.png"], ["inner_sector_24", a.gameDir + "inner-sector-24_3.png"], ["inner_sector_8", a.gameDir + "inner-sector-8_3.png"], ["inner_sector_5", a.gameDir + "inner-sector-5_3.png"], ["inner_sector_23", a.gameDir + "inner-sector-23_3.png"], ["inner_sector_10", a.gameDir + "inner-sector-10_3.png"],
            ["inner_sector_15", a.gameDir + "inner-sector-15_3.png"], ["inner_sector_12", a.gameDir + "inner-sector-12_3.png"], ["inner_sector_32", a.gameDir + "inner-sector-32_3.png"], ["inner_sector_35", a.gameDir + "inner-sector-35_3.png"], ["inner_sector_0", a.gameDir + "inner-sector-0_3.png"], ["inner_sector_3", a.gameDir + "inner-sector-3_3.png"], ["inner_sector_26", a.gameDir + "inner-sector-26_3.png"], ["chip_1", a.gameDir + "icons_chip_1.png"], ["chip_2", a.gameDir + "icons_chip_2.png"], ["chip_3", a.gameDir + "icons_chip_3.png"], ["chip_4",
                a.gameDir + "icons_chip_4.png"], ["chip_5", a.gameDir + "icons_chip_5.png"], ["chip_6", a.gameDir + "icons_chip_6.png"], ["video_img", a.gameDir + "video-img5-" + a.gameConfig.gameType.toLowerCase() + "-min.png"], ["zone_win_chip", a.gameDir + "ring.png"], ["possible_win_bg", a.gameDir + "icon-possible-win.png"]],
        wa = {
            49: {size: {w: 253, h: 212}, pos: {zonePosX: 165, zonePosY: 80}, hoverTexture: ""},
            50: {size: {w: 332, h: 212}, pos: {zonePosX: 418, zonePosY: 80}, hoverTexture: ""},
            51: {size: {w: 404, h: 212}, pos: {zonePosX: 750, zonePosY: 80}, hoverTexture: ""},
            52: {size: {w: 125, h: 212}, pos: {zonePosX: 1154, zonePosY: 80}, hoverTexture: ""}
        }, va = {
            10: {size: {w: 92, h: 71}, pos: {zonePosX: 9, zonePosY: 115}, hoverTexture: "inner_sector_10"},
            5: {size: {w: 108, h: 88}, pos: {zonePosX: 27, zonePosY: 50}, hoverTexture: "inner_sector_5"},
            24: {size: {w: 102, h: 92}, pos: {zonePosX: 84, zonePosY: 12}, hoverTexture: "inner_sector_24"},
            16: {size: {w: 83, h: 71}, pos: {zonePosX: 169, zonePosY: 8}, hoverTexture: "inner_sector_16"},
            33: {size: {w: 77, h: 71}, pos: {zonePosX: 254, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            1: {
                size: {
                    w: 77,
                    h: 71
                }, pos: {zonePosX: 347, zonePosY: 8}, hoverTexture: "inner_sector_cube"
            },
            20: {size: {w: 77, h: 71}, pos: {zonePosX: 427, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            14: {size: {w: 77, h: 71}, pos: {zonePosX: 506, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            31: {size: {w: 77, h: 71}, pos: {zonePosX: 586, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            9: {size: {w: 77, h: 71}, pos: {zonePosX: 665, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            22: {size: {w: 77, h: 71}, pos: {zonePosX: 758, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            18: {
                size: {
                    w: 77,
                    h: 71
                }, pos: {zonePosX: 838, zonePosY: 8}, hoverTexture: "inner_sector_cube"
            },
            29: {size: {w: 77, h: 71}, pos: {zonePosX: 917, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            7: {size: {w: 77, h: 71}, pos: {zonePosX: 997, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            28: {size: {w: 77, h: 71}, pos: {zonePosX: 1076, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            12: {size: {w: 83, h: 71}, pos: {zonePosX: 1162, zonePosY: 8}, hoverTexture: "inner_sector_12"},
            35: {size: {w: 102, h: 92}, pos: {zonePosX: 1235, zonePosY: 14}, hoverTexture: "inner_sector_35"},
            3: {
                size: {
                    w: 109,
                    h: 93
                }, pos: {zonePosX: 1288, zonePosY: 61}, hoverTexture: "inner_sector_3"
            },
            26: {size: {w: 87, h: 97}, pos: {zonePosX: 1318, zonePosY: 138}, hoverTexture: "inner_sector_26"},
            0: {size: {w: 109, h: 93}, pos: {zonePosX: 1288, zonePosY: 218}, hoverTexture: "inner_sector_0"},
            32: {size: {w: 102, h: 92}, pos: {zonePosX: 1235, zonePosY: 262}, hoverTexture: "inner_sector_32"},
            15: {size: {w: 83, h: 71}, pos: {zonePosX: 1162, zonePosY: 292}, hoverTexture: "inner_sector_15"},
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
    ca = ca.concat(a.mainFLGAccount.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, "images/logo.json", ca, function (b, g, d) {
        a.mainRenderer.createButton(void 0, 0, 0, "bg");
        U = new T(a);
        b = a.mainRenderer.createButton(t, 960, 225 + a.gameConfig.videoScreenshotOffsetY, "video_img");
        b.anchor.set(.5, .5);
        b = a.mainRenderer.createButton(t.getChildByName("video_img"),
            0, -(1.9 * a.gameConfig.videoScreenshotOffsetY), "btn_video_load");
        b.anchor.set(.5, .5);
        b.alpha = 0;
        b = a.mainRenderer.createButton(t.getChildByName("video_img"), 0, -(1.9 * a.gameConfig.videoScreenshotOffsetY), "btn_video");
        a.mainRenderer.createButton(b, 0, 0, "btn_video_mode_selected", void 0, function (c, h) {
                a.mainSoundManager.playSound("buttonClick");
                h.stopped = !0;
                O(c, "btn_video");
                a.mainUIManager.setVideoVisibility(!0, "part");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (c) {
                L(c, "btn_video")
            },
            function (c) {
                G(c, "btn_video")
            }).alpha = 0;
        b.anchor.set(.5, .5);
        b.children[0].anchor.set(.5, .5);
        b = a.mainRenderer.createButton(t, 1457, 205, "btn_video_close");
        a.mainRenderer.createButton(b, 0, 0, "btn_video_close_mode_selected", void 0, function (c, h) {
            a.mainSoundManager.playSound("buttonClick");
            h.stopped = !0;
            O(c, "btn_video_close");
            a.mainUIManager.setVideoVisibility(!1);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (c) {
            L(c, "btn_video_close")
        }, function (c) {
            G(c, "btn_video_close")
        }).alpha = 0;
        b.anchor.set(.5, .5);
        b.children[0].anchor.set(.5, .5);
        b.visible = !1;
        b = a.mainRenderer.createButton(t, 1360, -1260, "btn_video");
        a.mainRenderer.createButton(b, 0, 0, "btn_video_mode_selected", void 0, function (c, h) {
            a.mainSoundManager.playSound("buttonClick");
            h.stopped = !0;
            O(c, "btn_video");
            a.mainUIManager.setVideoVisibility(!0, "full");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (c) {
            L(c, "btn_video")
        }, function (c) {
            G(c, "btn_video")
        }).alpha = 0;
        b.anchor.set(.5, .5);
        b.children[0].anchor.set(.5,
            .5);
        b.visible = !1;
        R.addChild(D);
        a.mainRenderer.createButton(D, 146, 363, "table_bg_main", void 0, void 0, void 0, void 0, void 0, function () {
            a.mainGrid.zonesOut(G)
        });
        a.mainRenderer.createButton(D, 146, 363, "table_disable_main").visible = !1;
        a.mainRenderer.createButton(R, 259, 745, "table_bg_footer", void 0, void 0, void 0, void 0, void 0, function () {
            a.mainGrid.zonesOut(G)
        });
        a.mainRenderer.createButton(R, 259, 745, "table_disable_footer").visible = !1;
        b = a.mainRenderer.createButton(D, 1710, 770, "btn_switch_sectors");
        a.mainRenderer.createButton(b,
            0, 0, "btn_switch_sectors_mode_selected", void 0, function (c, h) {
                a.mainSoundManager.playSound("buttonClick");
                h.stopped = !0;
                O(c, "btn_switch_sectors");
                a.mainUIManager.switchGridMode(!0);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (c) {
                L(c, "btn_switch_sectors")
            }, function (c) {
                G(c, "btn_switch_sectors")
            }).alpha = 0;
        b.scale.set(1.17, 1.17);
        a.mainRenderer.createButton(D, 256, -907, "table_bg_sectors", void 0, void 0, void 0, void 0, void 0, function () {
            a.mainGrid.zonesOut(G)
        });
        a.mainRenderer.createButton(D,
            510, -720, void 0, {
                text: "Serie\n5/8",
                align: "center",
                style: {font: "50px Century725", fill: "#cfaf80", align: "center"}
            }).anchor.set(.5, .5);
        a.mainRenderer.createButton(D, 840, -720, void 0, {
            text: "Orph",
            align: "center",
            style: {font: "50px Century725", fill: "#cfaf80", align: "center"}
        }).anchor.set(.5, .5);
        a.mainRenderer.createButton(D, 1170, -720, void 0, {
            text: "Serie\n0/2/3",
            align: "center",
            style: {font: "50px Century725", fill: "#cfaf80", align: "center"}
        }).anchor.set(.5, .5);
        b = a.mainRenderer.createButton(D, 1460, -720, void 0, {
            text: "Zero",
            align: "center", style: {font: "50px Century725", fill: "#cfaf80", align: "center"}
        });
        b.anchor.set(.5, .5);
        b.rotation = -Math.PI / 2;
        a.mainRenderer.createButton(D, 256, -907, "table_disable_sectors").visible = !1;
        b = a.mainRenderer.createButton(D, 1710, -505, "btn_switch_grid");
        a.mainRenderer.createButton(b, 0, 0, "btn_switch_grid_mode_selected", void 0, function (c, h) {
            a.mainSoundManager.playSound("buttonClick");
            h.stopped = !0;
            O(c, "btn_switch_grid");
            a.mainUIManager.switchGridMode(!1);
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        }, void 0, void 0, function (c) {
            L(c, "btn_switch_grid")
        }, function (c) {
            G(c, "btn_switch_grid")
        }).alpha = 0;
        b.scale.set(1.17, 1.17);
        b = new PIXI.Graphics;
        b.position.set(0, 0);
        b.beginFill(0);
        b.drawRect(0, 355, 1920, 1080);
        b.endFill;
        R.mask = b;
        b = null;
        a.mainFLGAccount.drawAccount(0, 0, a.gameConfig, !0, ha);
        A = new function (c) {
            this.destroy = function () {
                for (var p in e) e[p].remove(), e[p] = null;
                e = null;
                for (p in k) k[p].remove(), k[p] = null;
                k = null;
                f.$btnControlsHome.unbind("click", oa);
                f.$btnControlsDouble.unbind("click", na);
                f.$btnControlsClear.unbind("click",
                    ma);
                f.$btnControlsRebet.unbind("click", la);
                f.$btnControlsRebetx2.unbind("click", ka);
                f.$btnControlsUndo.unbind("click", ja);
                f.$btnControlsMyBets.unbind("click", ia);
                f.$btnControlsChips.off("click", ".Chip_component_2UVTI", clickChip).off("mouseenter", ".Chip_component_2UVTI", enterChip).off("mouseleave", ".Chip_component_2UVTI", leaveChip);
                for (p in f) f[p].remove(), f[p] = null;
                u = l = q = n = f = null;
                window.removeEventListener("resize", w);
                c.unbind("parentResized", w);
                w = null;
                for (p in h) h[p] = null;
                h = null
            };
            var h = this, e = {},
                n = function () {
                    e.$winDOM = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 50px; left: 648px; width: 624px; z-index: 50000; visibility: hidden; transform-origin : 50% 0%;"><div style="width: 624px; height: 355px; background: url(' + a.gameDir + 'WIN3.png) no-repeat 100% 100%;"></div></div>');
                    c.append(e.$winDOM);
                    e.$winDOMBetTxt = $('<div style="position: absolute; top: 108px; font-size: 52px; color: #be9e6f; font-family: Arial Narrow;">100</div>');
                    e.$winDOM.append(e.$winDOMBetTxt);
                    e.$winDOMBet = $('<div style="position: absolute; top: 57px; font-size: 34px; color: #be9e6f; font-family: Arial Narrow;">' + mainLocalizationTable.bet.toUpperCase() + "</div>");
                    e.$winDOM.append(e.$winDOMBet);
                    e.$winDOMWinTxt = $('<div style="position: absolute; bottom: 120px; font-size: 86px; color: #e0c59d; font-family: Arial Narrow;">100</div>');
                    e.$winDOM.append(e.$winDOMWinTxt);
                    e.$winDOMWin = $('<div style="position: absolute; bottom: 57px; font-size: 34px; color: #e0c59d; font-family: Arial Narrow;">' +
                        mainLocalizationTable.win.toUpperCase() + "</div>");
                    e.$winDOM.append(e.$winDOMWin)
                };
            n();
            var k = {}, q = function () {
                k.$timerDOM = $('<div id="timerContainer" style="visibility: hidden; position: absolute; display: flex; justify-content: center; align-items: center; top: 0; left: 0; width: 1920px; height: 25px; z-index: 50000; background-color: black; transform-origin : 50% 0%;"><span class="timerSec timerBlack" style="color: #bcbcbc; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; margin-left: 35px; flex-basis: 20%;">00:00</span><span class="timerDesc timerBlack" style="color: #bcbcbc; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; flex: 3 1 auto; text-align: center;"></span><span class="timerBlack" style="color: #bcbcbc; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; margin-right: 35px; flex-basis: 20%;; text-align: right;">Live Roulette</span><div id="timerRow" style="position: absolute; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background-color: #4da362; clip-path: inset(0px 1920px 0px 0px); -webkit-clip-path: inset(0px 1920px 0px 0px); opacity: 1;"><span class="timerSec" style="color: #000000; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; margin-left: 35px; flex-basis: 20%;">00:00</span><span class="timerDesc" style="color: #000000; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; flex: 3 1 auto;; text-align: center;"></span><span style="color: #000000; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; margin-right: 35px; flex-basis: 20%;; text-align: right;">Live Roulette</span></div></div>');
                c.append(k.$timerDOM)
            };
            q();
            var m = {}, l = function () {
                m.$historyDOM = $('<div id="historyContainer" style="visibility: hidden; position:absolute; display: flex; justify-content: center; align-items: center; top: 418px; left: 70px; width: 1860px; height: 60px; z-index: 50000; transform-origin : 50% 0%;"></div>');
                for (var p = 22; 0 < p; p--) 22 == p ? m.$historyItem22 = $('<div class="history-ball" style="display: flex;align-items: center;justify-content: center;width: 53px; height: 53px;"><div class="history-ball-green" id="historyBall' +
                    p + '" style="width: 51px; height: 51px; position: absolute;"></div><div id="historyBallText' + p + '" style="font-size: 34px; font-weight: bold; font-family: Arial; color: #dfb47f; position:absolute;">36</div></div>') : m["$historyItem" + p] = $('<div class="history-ball" style="display: flex;align-items: center;justify-content: center; width: 38px; height: 38px;"><div class="history-ball-green" id="historyBall' + p + '" style="width: 35px; height: 35px; position: absolute;"></div><div id="historyBallText' + p + '" style="font-size: 22px; font-weight: bold; font-family: Arial; color: #dfb47f; position: absolute;">36</div></div>'),
                    m.$historyDOM.append(m["$historyItem" + p]);
                c.append(m.$historyDOM)
            };
            l();
            this.setHistoryItem = function (p, H, C) {
                void 0 != H ? (m["$historyItem" + p].find("#historyBallText" + p).text(H), m["$historyItem" + p].find("#historyBall" + p).attr("class", "history-ball-" + C), m["$historyItem" + p].css("visibility", "visible")) : m["$historyItem" + p].css("visibility", "hidden")
            };
            var f = {}, u = function () {
                f.$btnControlsDOM = $('<div id="btnControls" style="visibility: hidden; position: absolute; bottom: 33px; left: 0; width: 1920px; height: 100px; z-index: 50000; transform-origin : 50% 100%;"></div>');
                f.$btnControlsBackground = $('<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.5; background-color: black;"></div>');
                f.$btnControlsDOM.append(f.$btnControlsBackground);
                f.$btnControlsHome = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 19px; left: 45px; width: 72px; height: 56px; cursor: pointer;"><div style="width: 72px; height: 56px; background: url(' + a.gameDir + 'btn-home.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 72px; height: 56px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' +
                    a.gameDir + 'btn-home-mode-selected.png) no-repeat 100% 100%;"></div></div>');
                APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && f.$btnControlsHome && f.$btnControlsHome.css("visibility", clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl ? "visible" : "hidden");
                f.$btnControlsHome.bind("click", oa);
                f.$btnControlsDOM.append(f.$btnControlsHome);
                f.$btnControlsDouble = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 19px; left: 1454px; width: 70px; height: 44px; cursor: pointer;"><div style="width: 70px; height: 44px; background: url(' +
                    a.gameDir + 'btn-rebetx2.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 70px; height: 44px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDir + 'btn-rebetx2-mode-selected.png) no-repeat 100% 100%;"></div></div>');
                f.$btnControlsDouble.bind("click", na);
                f.$btnControlsDOM.append(f.$btnControlsDouble);
                f.$btnControlsDoubleDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 1439px; width: 100px; color: #cfaf80; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' +
                    mainLocalizationTable.double + "</span></div>");
                f.$btnControlsDOM.append(f.$btnControlsDoubleDesc);
                f.$btnControlsUndo = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 20px; left: 546px; width: 59px; height: 44px; cursor: pointer;"><div style="width: 59px; height: 44px; background: url(' + a.gameDir + 'btn-undo_.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 59px; height: 44px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' +
                    a.gameDir + 'btn-undo-mode-selected_.png) no-repeat 100% 100%;"></div></div>');
                f.$btnControlsUndo.bind("click", ja);
                f.$btnControlsDOM.append(f.$btnControlsUndo);
                f.$btnControlsUndoDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 519px; width: 110px; color: #cfaf80; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' + mainLocalizationTable.undo + "</span></div>");
                f.$btnControlsDOM.append(f.$btnControlsUndoDesc);
                f.$btnControlsRebet = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 14px; left: 1335px; width: 52px; height: 46px; cursor: pointer;"><div style="width: 52px; height: 46px; background: url(' + a.gameDir + 'btn-rebet-min.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 52px; height: 46px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDir + 'btn-rebet-mode-selected-min.png) no-repeat 100% 100%;"></div></div>');
                f.$btnControlsRebet.bind("click", la);
                f.$btnControlsDOM.append(f.$btnControlsRebet);
                f.$btnControlsRebetDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 1307px; width: 100px; color: #cfaf80; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' + mainLocalizationTable.repeat + "</span></div>");
                f.$btnControlsDOM.append(f.$btnControlsRebetDesc);
                f.$btnControlsClear = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 12px; left: 424px; width: 44px; height: 50px; cursor: pointer;"><div style="width: 44px; height: 50px; background: url(' +
                    a.gameDir + 'btn-clear.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 44px; height: 50px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDir + 'btn-clear-mode-selected.png) no-repeat 100% 100%;"></div></div>');
                f.$btnControlsClear.bind("click", ma);
                f.$btnControlsDOM.append(f.$btnControlsClear);
                f.$btnControlsClearDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 396px; width: 100px; color: #cfaf80; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' +
                    mainLocalizationTable.delete + "</span></div>");
                f.$btnControlsDOM.append(f.$btnControlsClearDesc);
                f.$btnControlsRebetx2 = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 17px; left: 1454px; width: 69px; height: 46px; cursor: pointer;"><div style="width: 69px; height: 46px; background: url(' + a.gameDir + 'btn-rebetx2.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 69px; height: 46px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' +
                    a.gameDir + 'btn-rebetx2-mode-selected.png) no-repeat 100% 100%;"></div></div>');
                f.$btnControlsRebetx2.bind("click", ka);
                f.$btnControlsRebetx2Desc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 1434px; width: 110px; color: #cfaf80; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' + mainLocalizationTable.repeatx2 + "</span></div>");
                "DEMO" != clientInfoGlobal.hall && (f.$btnControlsMyBets = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 12px; left: 172px; width: 44px; height: 50px; cursor: pointer;"><div style="width: 44px; height: 50px; background: url(' +
                    a.gameDir + 'btn-my-bets.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 44px; height: 50px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDir + 'btn-my-bets-selected.png) no-repeat 100% 100%;"></div></div>'), f.$btnControlsMyBets.bind("click", ia), f.$btnControlsDOM.append(f.$btnControlsMyBets), f.$btnControlsMyBetsDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 134px; width: 120px; color: #cfaf80; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' +
                    mainLocalizationTable.myBets + "</span></div>"), f.$btnControlsDOM.append(f.$btnControlsMyBetsDesc));
                f.$btnControlsChips = $('<div class="ChipTray_chips_3E1bN" style="position: absolute; display: flex; justify-content:center; align-items: center; top: 6px; left: 645px; width: 650px; font-family: Book Antiqua, sans-serif;"><div style="display: flex;"><div data-automation-id="chip-yellow" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_1" class="Chip_component_2UVTI Chip_yellow_3DAOA"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m">' +
                    y(B.possibleBets[0]) + '</div></div></div></div><div data-automation-id="chip-orange" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_2" class="Chip_component_2UVTI Chip_orange_2sdQr chip_active Chip_isSelected_1qLig"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m">' +
                    y(B.possibleBets[1]) + '</div></div></div></div><div data-automation-id="chip-blue" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_3" class="Chip_component_2UVTI Chip_grey_2sdQr"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m">' +
                    y(B.possibleBets[2]) + '</div></div></div></div><div data-automation-id="chip-red" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_4" class="Chip_component_2UVTI Chip_red_2PdQZ"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m">' +
                    y(B.possibleBets[3]) + "</div></div></div></div>" + (B.possibleBets[4] ? '<div data-automation-id="chip-green" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_5" class="Chip_component_2UVTI Chip_green_l17VV"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m">' +
                        y(B.possibleBets[4]) + "</div></div></div></div>" : "") + (B.possibleBets[5] ? '<div data-automation-id="chip-purple" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_6" class="Chip_component_2UVTI Chip_blue_2zyvu"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m" style="font-size: 24px;">' +
                        B.possibleBets[5] + "</div></div></div></div>" : "") + "</div></div>");
                f.$btnControlsChips.on("click", ".Chip_component_2UVTI", function () {
                    $(this).hasClass("Chip_isDisabled_2RK_o") || $(this).hasClass("chip_active") || (clickChip(this), xa($(this).find(".Chip_label_2--9m").text(), $(this).attr("id")))
                }).on("mouseenter", ".Chip_component_2UVTI", function () {
                    $(this).hasClass("Chip_isDisabled_2RK_o") || $(this).hasClass("chip_active") || enterChip(this)
                }).on("mouseleave", ".Chip_component_2UVTI", function () {
                    $(this).hasClass("Chip_isDisabled_2RK_o") ||
                    $(this).hasClass("chip_active") || leaveChip(this)
                });
                U.setMode({modeName: B.possibleBets[1], modeSprite: {name: "chip_2"}});
                f.$btnControlsDOM.append(f.$btnControlsChips);
                f.$btnControlsDOM.append(f.$btnControlsChips);
                f.$btnControlsDOM.append('\n                    <div class="kEqual1000">K = 1000</div>');
                c.append(f.$btnControlsDOM)
            };
            this.setChipsInteraction = function (p) {
                $(".Chip_component_2UVTI").each(function () {
                    p ? ($(this).removeClass("Chip_isDisabled_2RK_o"), $(this).hasClass("chip_active") && $(this).addClass("Chip_isSelected_1qLig")) :
                        ($(this).addClass("Chip_isDisabled_2RK_o"), $(this).hasClass("chip_active") && $(this).removeClass("Chip_isSelected_1qLig"))
                })
            };
            this.setBtnControlsInteraction = function (p) {
                p ? (f.$btnControlsRebet.removeClass("btn_disabled"), f.$btnControlsRebetx2.removeClass("btn_disabled"), f.$btnControlsDouble.removeClass("btn_disabled"), f.$btnControlsUndo.removeClass("btn_disabled"), f.$btnControlsClear.removeClass("btn_disabled")) : (f.$btnControlsRebet.addClass("btn_disabled"), f.$btnControlsRebetx2.addClass("btn_disabled"),
                    f.$btnControlsDouble.addClass("btn_disabled"), f.$btnControlsUndo.addClass("btn_disabled"), f.$btnControlsClear.addClass("btn_disabled"))
            };
            this.setRebetInteraction = function (p) {
                p ? (f.$btnControlsRebet.removeClass("btn_disabled"), f.$btnControlsRebetx2.removeClass("btn_disabled")) : (f.$btnControlsRebet.addClass("btn_disabled"), f.$btnControlsRebetx2.addClass("btn_disabled"))
            };
            this.slideBtnControls = function (p) {
                f.$btnControlsDOM.attr("toBottom", p);
                w(!0)
            };
            this.slideHistoryContainer = function (p) {
                m.$historyDOM.attr("toBottom",
                    p);
                w(!0)
            };
            this.setWinVisibility = function (p, H) {
                p && 0 < a.mainFLGAccount.totalWin() ? (e.$winDOMBetTxt.text(formatFLGNums(a.mainFLGAccount.totalBet())), e.$winDOMWinTxt.text(formatFLGNums(a.mainFLGAccount.totalWin())), setTimeout(function () {
                    e.$winDOM.css("visibility", "visible")
                }, H)) : e.$winDOM.css("visibility", "hidden")
            };
            this.setDOMVisibility = function (p) {
                f.$btnControlsDOM.css("visibility", p ? "visible" : "hidden");
                k.$timerDOM.css("visibility", p ? "visible" : "hidden");
                m.$historyDOM.css("visibility", p ? "visible" : "hidden")
            };
            this.slideWin = function (p) {
                e.$winDOM.attr("toBottom", p);
                w(!0)
            };
            u();
            var w = function (p) {
                var H = c.find("canvas"), C = H.attr("width"), V = parseFloat(H.css("width"));
                H = parseFloat(H.css("height"));
                C = V / C;
                var pa = (f.$btnControlsDOM.width() - f.$btnControlsDOM.width() * C) / 2,
                    ya = (e.$winDOM.width() - e.$winDOM.width() * C) / 2;
                V = (c.width() - V) / 2;
                H = (c.height() - H) / 2;
                f.$btnControlsDOM.css({
                    left: -pa + V + "px",
                    bottom: H + ("true" == f.$btnControlsDOM.attr("toBottom") ? -1 : 33 * C) + "px",
                    transition: 1 == p ? "bottom .2s cubic-bezier(0.645, 0.045, 0.355, 1)" :
                        "",
                    "-webkit-transition": 1 == p ? "bottom .2s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    transform: "scale(" + C + ")"
                });
                k.$timerDOM.css({left: -pa + V + "px", top: H + "px", transform: "scale(" + C + ")"});
                m.$historyDOM.css({
                    left: -pa + V + 60 * C + "px",
                    top: H + ("true" == m.$historyDOM.attr("toBottom") ? 483 * C : 418 * C) + "px",
                    transition: 1 == p ? "top .5s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    "-webkit-transition": 1 == p ? "top .5s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    transform: "scale(" + C + ")"
                });
                e.$winDOM.css({
                    left: -ya + V + 648 * C + "px",
                    top: H + ("true" ==
                    e.$winDOM.attr("toBottom") ? 195 * C : 50 * C) + "px",
                    transition: 1 == p ? "top .5s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    "-webkit-transition": 1 == p ? "top .5s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    transform: "scale(" + C + ")"
                })
            };
            window.addEventListener("resize", w, !1);
            c.bind("parentResized", w);
            w()
        }($("#" + a.gameConfig.canvasId));
        a.mainRenderer.createButton(t, 1605, 393, void 0, {
            text: mainLocalizationTable.totalBet,
            align: "right",
            style: {font: "26px Arial Narrow", fill: "#cfaf80"}
        }).name = "betSprite";
        a.mainRenderer.createButton(t,
            1605, 433, void 0, {
                text: formatFLGNums(a.mainFLGAccount.totalBet()),
                align: "right",
                style: {font: "bold 30px Arial Narrow", fill: "#cfaf80"}
            }).name = "betTxt";
        da = function (c) {
            t.getChildByName("betTxt").children[0].text = Z(c)
        };
        a.mainFLGAccount.events.on("onBet", da);
        a.mainRenderer.createButton(t, 349, 393, void 0, {
            text: mainLocalizationTable.balance,
            align: "left",
            style: {font: "26px Arial Narrow", fill: "#cfaf80"}
        }).name = "balanceSprite";
        a.mainRenderer.createButton(t, 349, 433, void 0, {
            text: "DEMO" == clientInfoGlobal.hall ? mainLocalizationTable.demo :
                formatFLGNums(a.mainFLGAccount.balance()),
            align: "left",
            style: {font: "bold 30px Arial Narrow", fill: "#cfaf80"}
        }).name = "balanceTxt";
        ea = function (c) {
            t.getChildByName("balanceTxt").children[0].text = "DEMO" == clientInfoGlobal.hall ? mainLocalizationTable.demo : Z(c)
        };
        a.mainFLGAccount.events.on("onBalance", ea);
        a.mainRenderer.stage.addChild(ta);
        t.addChild(R);
        a.mainRenderer.stage.addChild(t);
        U.addDragSprite();
        a.mainRenderer.stage.addChild(ha);
        a.setMainGrid(new FortuneGrid(261, 382, 12, 3, D, a.mainRenderer));
        b = function (c,
                      h, e) {
            h && (a.mainGrid.zonesOut(G), a.mainUIManager.defineZonesForBet(c, .35));
            h || (a.mainGrid.gridContainer.down = !0);
            if (h && a.mainGrid.gridContainer.down || !h && !e || e && (c.name != F || void 0 == F)) {
                h = 40 <= c.name && 48 >= c.name ? a.mainGrid.uiButtonsContainer.getChildByName(c.name).getChildByName("smallChipText") ? parseFloat(a.mainGrid.uiButtonsContainer.getChildByName(c.name).getChildByName("smallChipText").text) : 0 : a.mainGrid.uiGridContainer.getChildByName(c.name).getChildByName("smallChipText") ? parseFloat(a.mainGrid.uiGridContainer.getChildByName(c.name).getChildByName("smallChipText").text) :
                    0;
                h = parseFloat(B.currentBet({comb: c.name, curSumm: h}));
                if (!M.isAllowBet({
                    comb: parseInt(c.name),
                    coef: void 0,
                    summ: h
                }, a.mainGrid.pressedZones[c.name] ? a.mainGrid.pressedZones[c.name].bet + h : h) || 0 == h || -1 == a.mainFLGAccount.totalBet(h)) return;
                40 <= c.name && 48 >= c.name ? a.mainUIManager.createSmallChip(a.mainGrid.uiButtonsContainer.getChildByName(c.name), h) : (a.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(c.name), h), 36 >= c.name && a.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(c.name),
                    h));
                if (40 <= c.name && 48 >= c.name && a.mainGrid.buttonsContainer.getChildByName(c.name).selected || (40 > c.name || 48 < c.name) && a.mainGrid.gridContainer.getChildByName(c.name).selected) {
                    a.mainSoundManager.playSound("stackChip");
                    const n = 40 <= c.name && 48 >= c.name ? a.mainGrid.uiButtonsContainer.getChildByName(c.name).getChildByName("smallChipText").text : a.mainGrid.uiGridContainer.getChildByName(c.name).getChildByName("smallChipText").text;
                    a.mainGrid.pressedZones[c.name].bet = parseFloat(K(n));
                    a.mainGrid.pressedZones[c.name].spread.main +=
                        h
                } else a.mainSoundManager.playSound("firstChip"), 40 <= c.name && 48 >= c.name ? a.mainGrid.buttonsContainer.getChildByName(c.name).selected = !0 : a.mainGrid.gridContainer.getChildByName(c.name).selected = !0, a.mainGrid.pressedZones[c.name] = {
                    zone: 40 <= c.name && 48 >= c.name ? a.mainGrid.uiButtonsContainer.getChildByName(c.name) : a.mainGrid.uiGridContainer.getChildByName(c.name),
                    bet: h,
                    coef: a.mainUIManager.defineCoefForBet(c),
                    spread: {sectors: {}, main: h}
                };
                a.mainUIManager.defineZonesForBet(c, .35, S, h * parseFloat(a.mainGrid.pressedZones[c.name].coef))
            }
            if (e) {
                if (c.name !=
                    F || void 0 == F) void 0 != F && a.mainGrid.zonesOut(G), a.mainUIManager.defineZonesForBet(c, .35);
                F = c.name
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        g = function (c) {
            a.mainGrid.gridContainer.down && z.addGridState();
            a.mainGrid.gridContainer.down = !1;
            a.mainGrid.zonesOut(G);
            F = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        a.mainGrid.createZonesRoulette4K({w: 115, h: 115}, {w: 110, h: 364}, {x: 2.6, y: 2}, b, g);
        a.mainGrid.createFooter({posX: 261, posY: 733}, R, {x: 2.6, y: 2}, b, g);
        a.mainGrid.createSectors({posX: 256, posY: -907},
            va, wa, function (c, h, e) {
                h && (a.mainGrid.zonesOut(G), a.mainUIManager.defineZonesForBet(c, .35));
                h || (a.mainGrid.gridContainer.down = !0);
                if (h && a.mainGrid.gridContainer.down || !h && !e || e && (c.name != F || void 0 == F)) {
                    h = a.mainGrid.sectorCombinations[c.name] ? a.mainGrid.sectorCombinations[c.name] : a.mainGrid.sectorButtonCombinations[c.name].zones;
                    for (var n = 0; n < h.length; n++) {
                        var k = a.mainGrid.uiGridContainer.getChildByName(h[n]).getChildByName("smallChipText") ? parseFloat(a.mainGrid.uiGridContainer.getChildByName(h[n]).getChildByName("smallChipText").text) :
                            0;
                        k = parseFloat(B.currentBet({comb: h[n], curSumm: k}));
                        if (!M.isAllowBet({
                            comb: parseInt(h[n]),
                            coef: void 0,
                            summ: k
                        }, a.mainGrid.pressedZones[h[n]] ? a.mainGrid.pressedZones[h[n]].bet + k : k) || 0 == k || -1 == a.mainFLGAccount.totalBet(k)) return;
                        a.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(h[n]), k);
                        49 <= c.name && 52 >= c.name ? a.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(c.name), k) : a.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(h[n]),
                            k);
                        if (a.mainGrid.gridContainer.getChildByName(h[n]).selected) a.mainSoundManager.playSound("stackChip"), a.mainGrid.pressedZones[h[n]].bet = parseFloat(a.mainGrid.uiGridContainer.getChildByName(h[n]).getChildByName("smallChipText").text), a.mainGrid.sectorCombinations[c.name] ? a.mainGrid.pressedZones[h[n]].spread.main += k : a.mainGrid.pressedZones[h[n]].spread.sectors[c.name] = a.mainGrid.pressedZones[h[n]].spread.sectors[c.name] ? a.mainGrid.pressedZones[h[n]].spread.sectors[c.name] + k : k; else {
                            a.mainSoundManager.playSound("firstChip");
                            a.mainGrid.gridContainer.getChildByName(h[n]).selected = !0;
                            var q = {};
                            a.mainGrid.sectorCombinations[c.name] || (q[c.name] = k);
                            a.mainGrid.pressedZones[h[n]] = {
                                zone: a.mainGrid.uiGridContainer.getChildByName(h[n]),
                                bet: k,
                                coef: a.mainUIManager.defineCoefForBet(a.mainGrid.gridContainer.getChildByName(h[n])),
                                spread: a.mainGrid.sectorCombinations[c.name] ? {sectors: q, main: k} : {
                                    sectors: q,
                                    main: 0
                                }
                            }
                        }
                        a.mainUIManager.defineZonesForBet(a.mainGrid.gridContainer.getChildByName(h[n]), .35, S, k * parseFloat(a.mainGrid.pressedZones[h[n]].coef))
                    }
                }
                if (e) {
                    if (c.name !=
                        F || void 0 == F) void 0 != F && a.mainGrid.zonesOut(G), a.mainUIManager.defineZonesForBet(c, .35);
                    F = c.name
                }
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, function (c) {
                a.mainGrid.gridContainer.down && z.addGridState();
                a.mainGrid.gridContainer.down = !1;
                a.mainGrid.zonesOut(G);
                F = void 0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            });
        b = null;
        R.scale.set(.8, .8);
        R.position.set(192, 200);
        a.mainGameManager.gameStateAsync(function (c) {
            ua(c, function () {
                z = new x(a);
                I.drawEditionHistory(c);
                ba(c);
                d && d();
                a.mainRenderer.renderManager.needUpdateRender =
                    !0
            })
        })
    }, function () {
        a.mainGrid.zonesOut();
        A.setDOMVisibility(!0)
    });
    this.createSmallChip = function (b, g) {
        function d(h) {
            var e;
            for (e = B.possibleBets.length - 1; 0 <= e; e--) if (B.possibleBets[e] <= h) return a.mainRenderer.resourceLoader.resources["chip_" + (e + 1)].texture
        }

        if (b.getChildByName("smallChip")) {
            var c = parseFloat(K(b.getChildByName("smallChipText").text));
            c + g <= W(parseInt(b.name)) && (g = c + g, b.getChildByName("smallChipText").text = y(g), M.setTextScale(b.getChildByName("smallChipText")), b.getChildByName("smallChipText").visible =
                !0, b.getChildByName("smallChip").visible = !0, b.getChildByName("smallChip").texture = d(parseFloat(g)))
        } else {
            c = new PIXI.Sprite(d(g));
            g = new PIXI.Text(y(g), {
                font: "uiSectorsContainer" == b.parent.name && 36 >= b.name ? "bold 24px Book Antiqua" : "bold 30px Book Antiqua",
                fill: "#000000",
                align: "center"
            });
            g.name = "smallChipText";
            M.setTextScale(g);
            c.name = "smallChip";
            b.addChildAt(c, 0 == b.name ? 1 : 0);
            b.addChildAt(g, 0 == b.name ? 2 : 1);
            for (g = 0; g < b.children.length; g++) if ("smallChip" == b.children[g].name || "smallChipText" == b.children[g].name) b.children[g].anchor.x =
                .5, b.children[g].anchor.y = .5, b.children[g].position.y = b.height / 2, b.children[g].position.x = b.width / 2, "smallChip" == b.children[g].name ? b.children[g].scale.set("uiSectorsContainer" == b.parent.name && 36 >= b.name ? .8 : .93, "uiSectorsContainer" == b.parent.name && 36 >= b.name ? .8 : .93) : b.children[g].anchor.y = .515;
            c = g = null
        }
        b = null
    };
    this.setVideoVisibility = function (b, g) {
        b ? "part" == g ? J ? (rtcVideo.setFullscreenMode(!1), A.slideWin(!1), A.slideHistoryContainer(!1), Y(t, "mainGridContainer", 0, 0, function () {
            t.getChildByName("btn_video").visible =
                !0
        })) : (a.gameConfig.needHls ? (J = new FLGVideo(a.gameConfig.videoPos.x, a.gameConfig.videoPos.y, a.gameConfig.videoSize.w, a.gameConfig.videoSize.h, a.gameConfig.canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" wmode="opaque" volume="0" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=2&amp;URL=' + a.gameConfig.videoURL + ';"> <param name="movie" value="videoplayer.swf"><param name="volume" value="0" /></object>',
            '<video id="innerVideo' + a.gameConfig.canvasId + '" autoplay playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + a.gameConfig.videoMobileURL + '" type="application/x-mpegURL"></video>', {
                borderURL: void 0,
                paddings: 0,
                noVideoIcons: !0,
                videoMaxScale: 1,
                clipPath: "inset(7% 0%)",
                fullscreenPosY: -45,
                fullscreenClipPath: "inset(10% 11% 5%)"
            }, a.mainSoundManager, !0), J.setZIndex(!1), J.setVisible(!0)) : a.gameConfig.needRtc && (J = rtcVideo.init({
            videoId: "innerVideo" + a.gameConfig.canvasId,
            parentId: a.gameConfig.canvasId,
            videoString: '<video id="innerVideo' + a.gameConfig.canvasId + '" autoplay playsinline preload="metadata" style="height:100%;width:100%;"></video>',
            styleObj: {
                posX: a.gameConfig.videoPos.x,
                posY: a.gameConfig.videoPos.y,
                sizeW: a.gameConfig.videoSize.w,
                sizeH: a.gameConfig.videoSize.h,
                borderURL: void 0,
                paddings: 0,
                noVideoIcons: !0,
                videoMaxScale: 1,
                clipPath: "inset(7% 0%)",
                fullscreenPosY: -45,
                fullscreenClipPath: "inset(10% 11% 5%)"
            }
        }), rtcVideo.setSrc(a.gameConfig.videoRtcUrl, a.gameConfig.videoRtcApp, a.gameConfig.videoRtcStream)),
            t.getChildByName("video_img").getChildByName("btn_video").visible = !1, a.mainRenderer.renderManager.animationTweenInc(), (new TWEEN.Tween(t.getChildByName("video_img").getChildByName("btn_video_load"))).to({alpha: 1}, 500).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec()
        }).start(), a.mainRenderer.renderManager.animationTweenInc(), (new TWEEN.Tween(t.getChildByName("video_img").getChildByName("btn_video_load"))).to({rotation: 6 * Math.PI}, 3E3).easing(TWEEN.Easing.Linear.None).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            a.gameConfig.needHls ? J.setZIndex(!0) : a.gameConfig.needRtc && rtcVideo.playFirst();
            t.getChildByName("btn_video_close").visible = !0;
            t.getChildByName("btn_video").visible = !0;
            t.getChildByName("video_img").getChildByName("btn_video_load").rotation = 0;
            t.getChildByName("video_img").getChildByName("btn_video_load").alpha = 0;
            t.getChildByName("video_img").getChildByName("btn_video").visible = !0
        }).start()) : "full" == g && (a.gameConfig.needHls ? J.setFullscreenMode(!0) : a.gameConfig.needRtc && rtcVideo.setFullscreenMode(!0),
            A.slideWin(!0), A.slideHistoryContainer(!0), Y(t, "mainGridContainer", 0, 195, function () {
            t.getChildByName("btn_video").visible = !1
        })) : J && (t.getChildByName("btn_video_close").visible = !1, t.getChildByName("btn_video").visible = !1, a.gameConfig.needHls ? J.destroy() : a.gameConfig.needRtc && rtcVideo.destroy(), J = null, A.slideWin(!1), A.slideHistoryContainer(!1), Y(t, "mainGridContainer", 0, 0, function () {
        }))
    };
    this.switchGridMode = function (b) {
        Y(D, "switchGridContainer", 0, b ? 1273 : 0)
    };
    this.getBallColorByCode = function (b) {
        return -1 !=
        fortunaCombinations.btnComb["47"].zones.indexOf(parseInt(b)) ? "red" : -1 != fortunaCombinations.btnComb["48"].zones.indexOf(parseInt(b)) ? "black" : "green"
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
    this.defineZonesForBet = function (b,
                                       g, d, c, h) {
        if (36 >= b.name) if (void 0 != d) O(a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name), O(a.mainGrid.uiSectorsContainer.getChildByName(b.name + "innerZone"), b.name + "sector"), S(a.mainGrid.uiSectorsContainer.getChildByName(b.name), c), S(a.mainGrid.uiGridContainer.getChildByName(b.name), c); else {
            L(a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name);
            var e = a.mainGrid.sectorCombinations[b.name] ? a.mainGrid.sectorCombinations[b.name] : a.mainGrid.sectorButtonCombinations[b.name].zones;
            for (b = 0; b < e.length; b++) L(a.mainGrid.uiSectorsContainer.getChildByName(e[b] + "innerZone"), e[b] + "sector")
        } else {
            if (48 >= b.name) e = a.mainGrid.buttonCombinations[b.name].zones, void 0 != d ? O(40 <= b.name ? a.mainGrid.uiButtonsContainer.getChildByName(b.name + "innerZone") : a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name) : L(40 <= b.name ? a.mainGrid.uiButtonsContainer.getChildByName(b.name + "innerZone") : a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name); else if (52 >= b.name) for (e = a.mainGrid.sectorButtonCombinations[b.name].zones,
                                                                                                                                                                                                                                                                                                                                                                                                                                                              g = a.mainGrid.sectorButtonCombinations[b.name].zonesToHighlight, b = 0; b < g.length; b++) L(a.mainGrid.uiSectorsContainer.getChildByName(g[b] + "innerZone"), g[b] + "sector"); else 250 > b.name && (e = a.mainGrid.combinations[b.name - 100]);
            for (b = 0; b < e.length; b++) void 0 != d ? (O(a.mainGrid.uiGridContainer.getChildByName(e[b] + "innerZone"), e[b]), O(a.mainGrid.uiSectorsContainer.getChildByName(e[b] + "innerZone"), e[b] + "sector"), S(a.mainGrid.uiSectorsContainer.getChildByName(e[b]), c, h), S(a.mainGrid.uiGridContainer.getChildByName(e[b]),
                c, h)) : (L(a.mainGrid.uiGridContainer.getChildByName(e[b] + "innerZone"), e[b]), L(a.mainGrid.uiSectorsContainer.getChildByName(e[b] + "innerZone"), e[b] + "sector"))
        }
    };
    var S = function (b, g, d) {
        d = void 0 != d ? d : !0;
        if (b.getChildByName("possibleWinInfo")) {
            const c = parseFloat(K(b.getChildByName("possibleWinText").text));
            g = parseFloat(g + c).toFixed(10);
            b.getChildByName("possibleWinText").text = y(g);
            b.getChildByName("possibleWinText").visible = b.getChildByName("possibleWinInfo").visible = 0 < parseFloat(b.getChildByName("possibleWinText").text) &&
                d
        } else if (!(0 > parseFloat(g))) for (d = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.possible_win_bg.texture), g = new PIXI.Text(y(g), {
            font: "19px Arial",
            fill: "#bdbdbd"
        }), g.name = "possibleWinText", d.name = "possibleWinInfo", b.addChildAt(g, b.children.length), b.addChildAt(d, b.children.length - 1), d = 0; d < b.children.length; d++) if ("possibleWinInfo" == b.children[d].name || "possibleWinText" == b.children[d].name) b.children[d].anchor.x = .5, b.children[d].anchor.y = .5, g = "possibleWinText" == b.children[d].name ? "uiSectorsContainer" ==
        b.parent.name ? Math.ceil(b.height - b.children[d].height / 4) - 3 : Math.ceil(b.height - b.children[d].height / 2) - 6 : "uiSectorsContainer" == b.parent.name ? Math.ceil(b.height - b.children[d].height / 4) : Math.ceil(b.height - b.children[d].height / 2) - 3, b.children[d].position.y = g, b.children[d].position.x = b.width / 2
    };
    this.showPossibleWin = S;
    this.setInteraction = function (b) {
        a.mainGrid.setZoneInteraction(b);
        A.setChipsInteraction(b);
        A.setBtnControlsInteraction(b);
        U.setInteraction(b);
        D.getChildByName("table_disable_main").visible =
            !b;
        D.getChildByName("table_disable_sectors").visible = !b;
        R.getChildByName("table_disable_footer").visible = !b;
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
        } : {font: "48px Century725", fill: "#675740", align: "center"};
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
    this.isAllowBet = function (b, g, d) {
        return parseFloat(g).toFixed(10) > W(b.comb) ? (d ? (d.betErrorCount++, d.betErrorFunc ||
        (d.betErrorFunc = function () {
            a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet)
        })) : a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet), !1) : M.getTotalSumByGrid() + parseFloat(b.summ).toFixed(10) > clientInfoGlobal.cfstolmax / 100 ? (a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBetGame), !1) : !0
    };
    var qa = 0, ra = 0, aa, ba = function (b) {
        function g(e) {
            $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerSec").each(function () {
                $(this)[0].textContent !== X.getTimerText() && ($(this)[0].childNodes[0].nodeValue =
                    X.getTimerText())
            });
            aa = 1920 * (1 - e);
            $("#" + a.gameConfig.canvasId + " div#timerContainer div#timerRow").css({
                "clip-path": "inset(0px " + aa + "px 0px 0px)",
                "-webkit-clip-path": "inset(0px " + aa + "px 0px 0px)"
            })
        }

        function d(e) {
            if (a.mainGameManager) {
                if (e.t2 >= a.gameConfig.restartHlsSec) {
                    let n = 1E3 * (parseInt(e.t2) - a.gameConfig.restartHlsSec);
                    setTimeout(function () {
                        $(window).trigger("restartHls")
                    }, n)
                }
                $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerDesc").each(function () {
                    $(this).text(mainLocalizationTable.placeBets)
                });
                $("#" + a.gameConfig.canvasId + " div#timerContainer div#timerRow").css({
                    visibility: "visible",
                    "background-color": "#4da362"
                });
                a.mainFLGAccount.setWinTextVisible(!0);
                a.mainGrid.removeCurrentBets();
                a.mainFLGAccount.totalBet(0);
                localStorage.getItem("lastRoundNumBlack" + a.gameConfig.gameKind + a.gameConfig.gameType) == e.tir ? z.selectGridByStates() : z.clearGridStates();
                localStorage.setItem("lastRoundNumBlack" + a.gameConfig.gameKind + a.gameConfig.gameType, e.tir);
                a.mainUIManager.setInteraction(!0);
                I.addEdition(e.tir +
                    1);
                X.start({
                    minutes: 0,
                    seconds: (e.time_round ? e.time_round : a.gameConfig.tirTime) - a.gameConfig.timerOffset - e.t2
                }, {
                    minutes: 0,
                    seconds: (e.time_round ? e.time_round : a.gameConfig.tirTime) - a.gameConfig.timerOffset
                }, g, function () {
                    a.mainGrid.switchHover(!1);
                    a.mainUIManager.setInteraction(!1);
                    $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerDesc").each(function () {
                        $(this).text(mainLocalizationTable.noMoreBets)
                    });
                    $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerBlack").each(function () {
                        $(this).css("visibility",
                            "hidden")
                    });
                    $("#" + a.gameConfig.canvasId + " div#timerContainer div#timerRow").css("animation", "changeTimerOpacity 0.5s 6 alternate linear");
                    I.getActedOutEdition().betsHistory.addBet({
                        fortuneBetObjArr: a.mainUIManager.getFortuneObjectsByGrid(),
                        winBet: void 0,
                        win: void 0,
                        code: void 0
                    }, I.getActedOutEdition().round, function (n) {
                        n || (a.mainGrid.removeCurrentBets(), a.mainFLGAccount.totalBet(0))
                    });
                    z.clearGridStates()
                }, 3, ba)
            }
        }

        function c() {
            function e() {
                a.mainGameManager && (a.mainGameManager.gameStateAsync(n), a.mainRenderer.renderManager.needUpdateRender =
                    !0)
            }

            function n(k) {
                a.mainGameManager && (99 != k.ball ? a.mainFLGAccount && (a.mainGrid.switchHover(!0), a.mainFLGAccount.calculateWin(I.getActedOutEdition().betsHistory.bets, a.gameConfig.appName, function (q) {
                    var m = 0 <= k.t2 ? 17E3 : -17 > k.t2 ? 0 : 1E3 * (21 + k.t2) - 4E3;
                    a.mainGrid.pressedZones.length && (m = 2E3);
                    a.gameConfig.offset4Result && (m += a.gameConfig.offset4Result);
                    setTimeout(function () {
                        a.mainGrid.showWinZone(parseInt(k.ball), function (u) {
                            var w = u.getChildByName("zone_win_chip");
                            w || (w = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.zone_win_chip.texture),
                                w.name = "zone_win_chip", "uiSectorsContainer" == u.parent.name || 0 == k.ball ? w.scale.set(.8, .8) : w.scale.set(1, 1), w.anchor.set(.5, .5), w.alpha = 0, u.addChildAt(w, 0), w.rotation = 0, u.getChildByName("textwinZone").style = {
                                font: "uiSectorsContainer" == u.parent.name ? "54px Century725 Bold" : "64px Century725 Bold",
                                fill: "#cfaf80",
                                align: "center"
                            });
                            w.position.set(u.width / 2, u.height / 2);
                            u.getChildByName("smallChip") && (u.getChildByName("smallChipText").visible = !1, u.getChildByName("smallChip").visible = !1);
                            a.mainRenderer.renderManager.animationTweenInc();
                            (new TWEEN.Tween(w)).to({alpha: 1}, 500).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec()
                            }).start();
                            a.mainGrid[u.parent.name].getChildByName("textZone" + k.ball).visible = !1;
                            u.getChildByName("textwinZone").visible = !0;
                            a.mainRenderer.renderManager.animationTweenInc();
                            (new TWEEN.Tween(w)).to({rotation: 2 * Math.PI}, 9E3).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec();
                                w.rotation = 0
                            }).start();
                            setTimeout(function () {
                                u.getChildByName("possibleWinInfo") &&
                                (u.getChildByName("possibleWinInfo").visible = !1, u.getChildByName("possibleWinText").visible = !1);
                                a.mainRenderer.renderManager.animationTweenInc();
                                (new TWEEN.Tween(w)).to({alpha: 0}, 500).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                    a.mainRenderer.renderManager.animationTweenDec()
                                }).start();
                                u.getChildByName("textwinZone").visible = !1;
                                a.mainGrid[u.parent.name].getChildByName("textZone" + k.ball).visible = !0;
                                a.mainRenderer.renderManager.animationTweenInc();
                                (new TWEEN.Tween(w)).to({rotation: 0},
                                    500).onComplete(function () {
                                    a.mainRenderer.renderManager.animationTweenDec();
                                    u.visible = !1;
                                    w = null
                                }).start()
                            }, 8500)
                        }, 9E3);
                        if (q && q.length) {
                            for (var l = [], f = 0; f < q.length; f++) l.push({
                                comb: parseInt(q[f].nm),
                                coef: parseFloat(q[f].cf).toFixed(10) / 100,
                                summ: parseFloat(q[f].sm).toFixed(10) / 100,
                                winBet: k.ball
                            });
                            z.showWinCombinations(l);
                            l = null
                        }
                        I.drawEditionHistory(k);
                        $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerBlack").each(function () {
                            $(this).css("visibility", "visible")
                        });
                        $("#" + a.gameConfig.canvasId +
                            " div#timerContainer div#timerRow").css("visibility", "hidden");
                        $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerDesc").each(function () {
                            $(this).text(k.ball + " " + a.mainGrid.getColorByCombCode(k.ball))
                        });
                        qa = setTimeout(ba, 9E3);
                        a.mainFLGAccount.winToBalanceAnimation(9E3, 2E3, {
                            x: 4E3,
                            y: 2E3
                        }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                            font: "72px Arial Narrow",
                            fill: "#e0c59d",
                            align: "customize",
                            posY: 45
                        }, void 0, {font: "44px Arial Narrow", fill: "#be9e6f"});
                        A.setWinVisibility(!0, 0);
                        setTimeout(function () {
                            A.setWinVisibility(!1);
                            a.mainGrid.removeCurrentBets();
                            a.mainFLGAccount.totalBet(0)
                        }, 8E3)
                    }, m)
                }, a.gameConfig), I.cancelLastEdition([k.ball]), a.mainRenderer.renderManager.needUpdateRender = !0) : ra = setTimeout(e, 500))
            }

            a.mainGameManager && ($("#" + a.gameConfig.canvasId + " div#timerContainer div#timerRow").css({
                animation: "",
                opacity: 1,
                "background-color": "#c0372d"
            }), a.mainUIManager.setInteraction(!1), a.mainFLGAccount.setWinTextVisible(!1), e())
        }

        function h(e) {
            0 >= e.t2 ? c() : d(e)
        }

        void 0 != a.mainGameManager && (b ? h(b) : a.mainGameManager.gameStateAsync(h))
    }
}
;
