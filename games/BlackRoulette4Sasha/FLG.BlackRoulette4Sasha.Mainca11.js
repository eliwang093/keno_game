var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (a, g, l) {
    a instanceof String && (a = String(a));
    for (var p = a.length, r = 0; r < p; r++) {
        var w = a[r];
        if (g.call(l, w, r, a)) return {i: r, v: w}
    }
    return {i: -1, v: void 0}
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, g, l) {
    a != Array.prototype && a != Object.prototype && (a[g] = l.value)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, g, l, p) {
    if (g) {
        l = $jscomp.global;
        a = a.split(".");
        for (p = 0; p < a.length - 1; p++) {
            var r = a[p];
            r in l || (l[r] = {});
            l = l[r]
        }
        a = a[a.length - 1];
        p = l[a];
        g = g(p);
        g != p && null != g && $jscomp.defineProperty(l, a, {configurable: !0, writable: !0, value: g})
    }
};
$jscomp.polyfill("Array.prototype.find", function (a) {
    return a ? a : function (a, l) {
        return $jscomp.findInternal(this, a, l).v
    }
}, "es6", "es3");
$jscomp.checkStringArgs = function (a, g, l) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + l + " must not be null or undefined");
    if (g instanceof RegExp) throw new TypeError("First argument to String.prototype." + l + " must not be a regular expression");
    return a + ""
};
$jscomp.polyfill("String.prototype.repeat", function (a) {
    return a ? a : function (a) {
        var g = $jscomp.checkStringArgs(this, null, "repeat");
        if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value");
        a |= 0;
        for (var p = ""; a;) if (a & 1 && (p += g), a >>>= 1) g += g;
        return p
    }
}, "es6", "es3");
$jscomp.owns = function (a, g) {
    return Object.prototype.hasOwnProperty.call(a, g)
};
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function (a, g) {
    for (var l = 1; l < arguments.length; l++) {
        var p = arguments[l];
        if (p) for (var r in p) $jscomp.owns(p, r) && (a[r] = p[r])
    }
    return a
};
$jscomp.polyfill("Object.assign", function (a) {
    return a || $jscomp.assign
}, "es6", "es3");
registrationAppOnPlatform({
    category: "casino",
    catalog: "Black_Roulette_1_min",
    image: "games/BlackRoulette4Sasha/resources/icons/BlackRoulette-red.png",
    imageBack: "games/BlackRoulette4Sasha/resources/icons/BlackRoulette-red-back.png",
    caption: "Roulette Lotto",
    runConfig: "BlackRoulette4Sasha",
    gameType: "red",
    playInDemo: !1,
    gameBG: "images/games-bg/roulette-air-bg-red.jpg"
});
registrationAppOnPlatform({
    category: "casino",
    catalog: "Black_Roulette_1_min",
    image: "games/BlackRoulette4Sasha/resources/icons/BlackRoulette-green.png",
    imageBack: "games/BlackRoulette4Sasha/resources/icons/BlackRoulette-green-back.png",
    caption: "Roulette Green",
    runConfig: "BlackRoulette4Sasha",
    gameType: "green",
    playInDemo: !1,
    gameBG: "images/games-bg/roulette-air-bg-green.jpg"
});
var configsBlackRoulette4Sasha = {
    red: {
        serverName: "srv54",
        serverNum: "s54",
        tirTime: 50,
        appName: "bets_54",
        BG: "bg",
        videoURL: "rtmp://w1.flg10.bet:1935/lotto_rulette&amp;Video0=myStream:180",
        videoMobileURL: "https://w1.flg10.bet/lotto_rulette/smil:Roulette-Lotto.smil/playlist.m3u8",
        videoPos: {x: 561, y: -15},
        videoSize: {w: 797, h: 531},
        canvasId: "",
        runconfig: "BlackRoulette4SashaRed",
        gameType: "Red",
        gameKind: "Roulette4Sasha",
        gameVariant: "",
        betSeparator: "_",
        offset4Result: 1E3,
        needHls: !1,
        needRtc: !0,
        videoRtcUrl: "wss://wrtc.flg10.bet/webrtc-session.json",
        videoRtcApp: "Roulette_Lotto",
        videoRtcStream: "myStream_aac",
        caption: "Roulette lotto",
        winShowTime: 1E4,
        timerOffset: 14,
        restartHlsSec: 25
    }, green: {
        serverName: "srv57",
        serverNum: "s57",
        tirTime: 50,
        appName: "bets_57",
        BG: "bg",
        videoURL: "rtmp://w1.flg10.bet:1935/Rulette-Green&amp;Video0=myStream:180",
        videoMobileURL: "https://w1.flg10.bet/Rulette-Green/smil:Rulette-Green.smil/playlist.m3u8",
        videoPos: {x: 561, y: -15},
        videoSize: {w: 797, h: 531},
        canvasId: "",
        runconfig: "BlackRoulette4SashaGreen",
        gameType: "Green",
        gameKind: "Roulette4Sasha",
        gameVariant: "",
        betSeparator: "_",
        offset4Result: 5E3,
        caption: "Roulette green",
        videoRtcUrl: "wss://wrtc.flg10.bet/webrtc-session.json",
        needHls: !1,
        needRtc: !0,
        videoRtcApp: "Roulette_Green",
        videoRtcStream: "myStream_aac",
        winShowTime: 1E4,
        timerOffset: 16,
        restartHlsSec: 15
    }
}, BlackRoulette4SashaObjectsArr = {black: void 0};

function emitEventBlackRoulette4Sasha(a, g) {
    for (var l in BlackRoulette4SashaObjectsArr) BlackRoulette4SashaObjectsArr[l] && BlackRoulette4SashaObjectsArr[l].mainRenderer.stage.emit(a, g)
}

function removeBlackRoulette4SashaObject(a, g) {
    if (void 0 != BlackRoulette4SashaObjectsArr[g]) {
        BlackRoulette4SashaObjectsArr[g].destroy();
        for (var l in BlackRoulette4SashaObjectsArr[g]) BlackRoulette4SashaObjectsArr[g][l] = null;
        BlackRoulette4SashaObjectsArr[g] = null
    }
    $("#" + a + " canvas").remove();
    $("#" + a + " div").remove()
}

function initBlackRoulette4SashaObject(a, g) {
    configsBlackRoulette4Sasha[g].canvasId = a;
    BlackRoulette4SashaObjectsArr[g] = mobileMode ? new BlackRoulette4SashaAppMobile(configsBlackRoulette4Sasha[g]) : new BlackRoulette4SashaApp(configsBlackRoulette4Sasha[g])
}

function refreshBlackRoulette4SashaObject(a, g) {
    removeBlackRoulette4SashaObject(a, g.toLowerCase());
    initBlackRoulette4SashaObject(a, g.toLowerCase())
}

function BlackRoulette4SashaApp(a) {
    this.destroy = function () {
        w.destroy();
        w = null;
        I.destroy();
        I = null;
        p.destroy();
        p = null;
        r.destroy();
        r = null;
        l.destroy();
        l = null;
        g.mainSoundManager.destroy();
        for (var a in g) g[a] = null;
        g = null
    };
    var g = this;
    this.gameDir = "games/BlackRoulette4Sasha/resources/";
    this.gameConfig = a;
    var l = new FLGRenderer(1920, 1080, a.canvasId, "center");
    this.mainRenderer = l;
    this.mainSoundManager = new SoundManager(g.gameConfig.gameKind, g.gameConfig.gameType, g.gameConfig.gameVariant);
    var p = new FLGAccount(null,
        g.mainSoundManager, g.mainRenderer);
    this.mainFLGAccount = p;
    var r = new gameManagerBlackRoulette4Sasha(this);
    this.mainGameManager = r;
    var w = new UIManagerBlackRoulette4Sasha(this);
    this.mainUIManager = w;
    var I;
    this.setMainGrid = function (a) {
        I = a;
        g.mainGrid = I
    }
}

function gameManagerBlackRoulette4Sasha(a) {
    this.destroy = function () {
        p = l = null;
        for (var a in g) g[a] = null;
        g = null
    };
    var g = this, l = {};
    this.gameStateAsync = function (a) {
        p(a)
    };
    var p = function (g) {
        $.ajax({
            type: "get",
            url: getUrl(),
            data: {oper: "getgameinfo", id_srv: a.gameConfig.serverName.slice(3, a.gameConfig.serverName.length)},
            dataType: "json",
            success: function (p, r, E) {
                try {
                    l = p, g && g(l)
                } catch (L) {
                    console.log(L), a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
                }
            },
            error: function (g,
                             l, p) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
            }
        })
    };
    this.gameHistory = function (a) {
        g && l && l.history ? a(l.history) : console.log("History and gameState not ok.")
    };
    try {
        localStorage.removeItem("lastRoundGridState" + a.gameConfig.gameKind + a.gameConfig.gameType)
    } catch (r) {
        console.log(r.message)
    }
}

function UIManagerBlackRoulette4Sasha(a) {
    function g(b) {
        this.destroy = function () {
            for (var a = 0; a < d.length; a++) {
                for (var T in d[a]) d.length - 1 == a && d[a][T].summ && b.mainFLGAccount.totalBet(-d[a][T].summ), d[a][T] = null;
                d[a] = null
            }
            c = f = d = null;
            for (a in e) e[a] = null;
            e = null
        };
        var e = this, d = [];
        this.states = function () {
            return d
        };
        var f = [];
        this.saveGridStateInStorage = function () {
            localStorage.setItem("curUser", JSON.stringify({hall: clientInfoGlobal.hall, nick: clientInfoGlobal.nick}));
            d && localStorage.setItem("gridStates" + a.gameConfig.gameKind +
                a.gameConfig.gameType, JSON.stringify(d));
            f && localStorage.setItem("lastRoundGridState" + a.gameConfig.gameKind + a.gameConfig.gameType, JSON.stringify(f))
        };
        this.loadGridStateFromStorage = function () {
            if (localStorage.getItem("curUser")) {
                var b = JSON.parse(localStorage.getItem("curUser"));
                if (b.hall != clientInfoGlobal.hall && b.nick != clientInfoGlobal.nick) return
            }
            localStorage.getItem("gridStates" + a.gameConfig.gameKind + a.gameConfig.gameType) && (d = JSON.parse(localStorage.getItem("gridStates" + a.gameConfig.gameKind + a.gameConfig.gameType)));
            localStorage.getItem("lastRoundGridState" + a.gameConfig.gameKind + a.gameConfig.gameType) && (f = JSON.parse(localStorage.getItem("lastRoundGridState" + a.gameConfig.gameKind + a.gameConfig.gameType)))
        };
        this.addGridState = function (a) {
            var f = a ? a : b.mainUIManager.getFortuneObjectsByGrid();
            if (!d.length || f.length || d[d.length - 1].length) d.push(f), e.saveGridStateInStorage(), a && c()
        };
        this.doubleCurrentBets = function () {
            var f = {betErrorCount: 0, betErrorFunc: null}, d = 0, c;
            for (c in a.mainGrid.pressedZones) if (d++, a.mainUIManager.isAllowBet({
                comb: parseInt(c),
                coef: void 0, summ: a.mainGrid.pressedZones[c].bet
            }, 2 * a.mainGrid.pressedZones[c].bet, f)) {
                if (-1 == a.mainFLGAccount.totalBet(parseFloat(a.mainGrid.pressedZones[c].bet))) return;
                a.mainUIManager.defineZonesForBet(a.mainGrid.pressedZones[c].zone, .35, J, parseFloat(a.mainGrid.pressedZones[c].bet).toFixed(10) * parseFloat(a.mainGrid.pressedZones[c].coef).toFixed(10));
                a.mainGrid.pressedZones[c].bet *= 2;
                a.mainGrid.pressedZones[c].spread.main *= 2;
                for (var g in a.mainGrid.pressedZones[c].spread.sectors) a.mainGrid.pressedZones[c].spread.sectors[g] *=
                    2;
                var q = a.mainGrid.pressedZones[c].bet - parseFloat(a.mainGrid.pressedZones[c].zone.getChildByName("smallChipText").text).toFixed(10);
                if (40 <= a.mainGrid.pressedZones[c].zone.name && 48 >= a.mainGrid.pressedZones[c].zone.name) b.mainUIManager.createSmallChip(a.mainGrid.uiButtonsContainer.getChildByName(a.mainGrid.pressedZones[c].zone.name), q); else {
                    b.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(a.mainGrid.pressedZones[c].zone.name), q);
                    if (100 <= a.mainGrid.pressedZones[c].zone.name &&
                        136 >= a.mainGrid.pressedZones[c].zone.name || 179 == a.mainGrid.pressedZones[c].zone.name || 187 == a.mainGrid.pressedZones[c].zone.name || 1 == a.mainGrid.pressedZones[c].zone.name || 26 == a.mainGrid.pressedZones[c].zone.name) for (q = 49; 52 >= q; q++) a.mainGrid.pressedZones[c].spread.sectors[q] && 0 < a.mainGrid.pressedZones[c].spread.sectors[q] && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(q), a.mainGrid.pressedZones[c].spread.sectors[q] / 2);
                    36 >= a.mainGrid.pressedZones[c].zone.name && 0 < a.mainGrid.pressedZones[c].spread.main &&
                    b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(a.mainGrid.pressedZones[c].zone.name), a.mainGrid.pressedZones[c].spread.main / 2)
                }
            }
            0 < f.betErrorCount && f.betErrorFunc();
            f.betErrorCount != d && e.addGridState();
            f.betErrorCount = null;
            f.betErrorFunc = null
        };
        this.undoGridState = function () {
            d.length && (d.pop(), e.saveGridStateInStorage(), b.mainGrid.removeCurrentBets(), a.mainFLGAccount.totalBet(-a.mainFLGAccount.totalBet()), c())
        };
        this.clearGridStates = function () {
            if (d && d.length) {
                if (f && f.length &&
                    d[d.length - 1].length) {
                    for (var a in f) f[a] = null;
                    f = []
                }
                d[d.length - 1].length && (f = d[d.length - 1].slice());
                for (var b = 0; b < d.length; b++) {
                    for (a in d[b]) d[b][a] = null;
                    d[b] = null
                }
                d = []
            }
            e.saveGridStateInStorage()
        };
        this.repeatLastRoundGridState = function () {
            f && f.length && e.addGridState(f.slice())
        };
        this.showWinCombinations = function (a) {
            b.mainGrid.removeCurrentBets();
            c(a, !0)
        };
        var c = function (f, c) {
            var e = f ? f : d[d.length - 1], u = void 0 != c ? c : !1, q = {betErrorCount: 0, betErrorFunc: null};
            e && e.length && (b.mainGrid.pressZonesByObjectArr(e,
                function (c) {
                    if (b.mainUIManager.isAllowBet({
                        comb: parseInt(c.zone.name),
                        coef: void 0,
                        summ: c.bet
                    }, b.mainGrid.pressedZones[c.zone.name] ? b.mainGrid.pressedZones[c.zone.name].bet + c.bet : c.bet, q)) {
                        if (f || u) f && f.length && (parseInt(e[0].winBet) != parseInt(c.zone.name) && (40 <= c.zone.name && 48 >= c.zone.name ? b.mainUIManager.createSmallChip(a.mainGrid.uiButtonsContainer.getChildByName(c.zone.name), c.bet) : (b.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(c.zone.name), c.bet), 36 >= c.zone.name && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(c.zone.name),
                            c.bet))), b.mainGrid.pressedZones[c.zone.name] = {
                            zone: 40 <= c.zone.name && 48 >= c.zone.name ? b.mainGrid.uiButtonsContainer.getChildByName(c.zone.name) : b.mainGrid.uiGridContainer.getChildByName(c.zone.name),
                            bet: c.bet,
                            coef: b.mainUIManager.defineCoefForBet(c.zone)
                        }, b.mainUIManager.defineZonesForBet(c.zone, .35, b.mainUIManager.showPossibleWin, parseFloat(c.bet).toFixed(10) * parseFloat(b.mainGrid.pressedZones[c.zone.name].coef).toFixed(10), !1), b.mainGrid.uiGridContainer.getChildByName(parseInt(e[0].winBet)).getChildByName("possibleWinText").visible =
                            !0, b.mainGrid.uiGridContainer.getChildByName(parseInt(e[0].winBet)).getChildByName("possibleWinInfo").visible = !0); else {
                            if (-1 == b.mainFLGAccount.totalBet(parseFloat(c.bet))) return;
                            if (40 <= c.zone.name && 48 >= c.zone.name) b.mainUIManager.createSmallChip(a.mainGrid.uiButtonsContainer.getChildByName(c.zone.name), c.bet); else {
                                b.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(c.zone.name), c.bet);
                                if (100 <= c.zone.name && 136 >= c.zone.name || 179 == c.zone.name || 187 == c.zone.name || 1 == c.zone.name ||
                                    26 == c.zone.name) for (var d = 49; 52 >= d; d++) c.spread.sectors[d] && 0 < c.spread.sectors[d] && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(d), c.spread.sectors[d]);
                                36 >= c.zone.name && 0 < c.spread.main && b.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(c.zone.name), c.spread.main)
                            }
                            c.zone.selected ? (b.mainGrid.pressedZones[c.zone.name].bet = 40 <= c.zone.name && 48 >= c.zone.name ? parseFloat(b.mainGrid.uiButtonsContainer.getChildByName(c.zone.name).getChildByName("smallChipText").text).toFixed(10) :
                                parseFloat(b.mainGrid.uiGridContainer.getChildByName(c.zone.name).getChildByName("smallChipText").text).toFixed(10), b.mainGrid.pressedZones[c.zone.name].spread.main += c.spread.main, b.mainGrid.pressedZones[c.zone.name].spread.sectors[c.zone.name] = b.mainGrid.pressedZones[c.zone.name].spread.sectors[c.zone.name] ? b.mainGrid.pressedZones[c.zone.name].spread.sectors[c.zone.name] + c.spread.sectors[c.zone.name] : c.spread.sectors[c.zone.name]) : (c.zone.selected = !0, b.mainGrid.pressedZones[c.zone.name] = {
                                zone: 40 <=
                                c.zone.name && 48 >= c.zone.name ? b.mainGrid.uiButtonsContainer.getChildByName(c.zone.name) : b.mainGrid.uiGridContainer.getChildByName(c.zone.name),
                                bet: c.bet,
                                coef: b.mainUIManager.defineCoefForBet(c.zone),
                                spread: {sectors: Object.assign({}, c.spread.sectors), main: c.spread.main}
                            });
                            b.mainUIManager.defineZonesForBet(c.zone, .35, b.mainUIManager.showPossibleWin, parseFloat(c.bet).toFixed(10) * parseFloat(b.mainGrid.pressedZones[c.zone.name].coef).toFixed(10))
                        }
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }
                }), b.mainGrid.zonesOut(),
            0 < q.betErrorCount && !u && q.betErrorFunc(), q.betErrorCount = null, q = q.betErrorFunc = null)
        };
        this.selectGridByStates = c;
        e.loadGridStateFromStorage()
    }

    function l(b) {
        this.destroy = function () {
            d.destroy();
            g = u = c = n = f = d = null;
            for (var a = 0; a < k.length; a++) {
                for (var b in k[a]) k[a][b] = null;
                k[a] = null
            }
            l = q = k = null;
            for (a in e) e[a] = null;
            e = null
        };
        var e = this, d = new PIXI.Graphics;
        d.beginFill(16777215, 0);
        d.drawRect(0, 0, b.mainRenderer.canvasSize.width, b.mainRenderer.canvasSize.height);
        d.endFill();
        var f = new PIXI.Sprite(d.generateTexture(!1));
        f.width = f.texture.width;
        f.height = f.texture.height;
        f.interactive = !0;
        f.hitArea = new PIXI.Rectangle(0, 0, f.width, f.texture.height);
        var c = function (c) {
            n.data = c.data;
            n.dragging = !0;
            c = n.data.getLocalPosition(n.parent);
            n.position.x = c.x;
            n.position.y = c.y;
            n.visible = !0;
            b.mainGrid.gridContainer.down = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, u = function () {
            n.dragging = !1;
            n.data = null;
            n.visible = !1;
            b.mainGrid.gridContainer.down = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, g = function () {
            if (n.dragging) {
                var b =
                    n.data.getLocalPosition(n.parent);
                n.position.x = b.x;
                n.position.y = b.y
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        f.on("mousedown", c).on("touchstart", c).on("mousemove", g).on("touchmove", g).on("mouseup", u).on("touchend", u).on("mouseupoutside", u).on("touchendoutside", u);
        b.mainRenderer.stage.addChildAt(f, 0);
        var n = b.mainRenderer.createButton(f, 0, 0, void 0, void 0);
        n.anchor.set(.5, .5);
        n.visible = !1;
        this.addDragSprite = function (a) {
            b.mainRenderer.stage.addChild(n)
        };
        this.setInteraction = function (b) {
            f.interactive =
                b;
            n.visible = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        var k = [], q = {};
        this.currentMode = function () {
            return q
        };
        var l = function (c) {
            q = c;
            n.texture = b.mainRenderer.resourceLoader.resources[q.modeSprite.name].texture;
            n.width = n.texture.width;
            n.height = n.texture.height;
            n.scale.set(.65, .65);
            c = n.getChildByName("modeDragSpriteText");
            q.modeSprite.text ? c ? (c.text = q.modeSprite.text, c.visible = !0) : (c = new PIXI.Text(q.modeSprite.text, q.modeSprite.style), c.style.align = "center", c.name = "modeDragSpriteText", n.addChild(c)) :
                c && (c.visible = !1);
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        this.setMode = function (a) {
            if (a && a.modeName != q.modeName) {
                for (var b = 0; b < k.length; b++) if (a.modeName == k[b].modeName) {
                    l(k[b]);
                    return
                }
                k.push(a);
                l(k[k.length - 1])
            }
        }
    }

    function p(b) {
        this.destroy = function () {
            for (var a = 0; a < d.length; a++) d[a].round = null, d[a].editionResult = null, d[a].betsHistory.destroy && d[a].betsHistory.destroy(), d[a] = null;
            l = n = g = u = f = RoundText = d = null;
            for (a in e) e[a] = null;
            e = null
        };
        var e = this, d = [];
        this.editions = d;
        var f;
        this.historyTable =
            function () {
                return f
            };
        this.getActedOutEdition = function () {
            for (var a = d.length - 1; 0 <= a; a--) if (void 0 == d[a].editionResult) return u(a), d[a];
            u(d.length - 1);
            return d[d.length - 1]
        };
        for (var c = 0; c < b.length; c++) d.push({
            round: b[c].round,
            editionResult: b[c].editionResult,
            betsHistory: b[c].betsHistory
        }), d[c].betsHistory.setRoundResult(d[c].editionResult);
        var u = function (b) {
            0 > b || b >= d.length || (a.mainRenderer.renderManager.needUpdateRender = !0)
        };
        u(d.length - 1);
        this.drawEditions = function () {
            f = new PIXI.Container;
            k.addChild(f)
        };
        var g = function () {
        };
        this.redrawEditionHeader = g;
        new PIXI.Container;
        var n = function () {
        };
        this.drawBetsHeader = n;
        var l = function (b) {
            for (b = 22; 0 < b; b--) t.setHistoryItem(b, d[b].editionResult[0], void 0 != d[b].editionResult[0] ? a.mainUIManager.getBallColorByCode(d[b].editionResult[0]) : "")
        };
        this.drawEditionHistory = l;
        this.cancelLastEdition = function (a) {
            d[d.length - 1].editionResult = a;
            d[d.length - 1].betsHistory.setRoundResult(a);
            u(d.length - 1)
        };
        this.addEdition = function (a) {
            d[0].betsHistory.destroy && d[0].betsHistory.destroy();
            d[0].betsHistory = null;
            d.shift();
            d.push({round: a, editionResult: void 0, betsHistory: new r([])});
            u(d.length - 1)
        }
    }

    function r(b) {
        this.destroy = function () {
            for (var a = 0; a < d.length; a++) {
                for (var b = 0; b < d[a].fortuneBetObjArr.length; b++) d[a].fortuneBetObjArr[b].comb = null, d[a].fortuneBetObjArr[b].coef = null, d[a].fortuneBetObjArr[b].summ = null, d[a].fortuneBetObjArr[b] = null;
                d[a].fortuneBetObjArr = null;
                d[a].winBet = null;
                d[a].win = null;
                d[a].code = null;
                d[a] = null
            }
            d = null;
            for (a in e) e[a] = null;
            e = null
        };
        var e = this, d = [];
        this.bets =
            d;
        if (b.length) for (var f = 0; f < b.length; f++) d.push({
            fortuneBetObjArr: b[f].fortuneBetObjArr.slice(),
            winBet: b[f].winBet,
            win: b[f].win,
            code: b[f].code
        });
        this.addBet = function (b, f, e) {
            a.mainFLGAccount.placeFortuneBet(b, f, a.gameConfig, function (c) {
                void 0 == c || 500 <= d.length || -1 == c ? e && e(!1) : (d.push({
                    fortuneBetObjArr: b.fortuneBetObjArr.slice(),
                    winBet: b.winBet,
                    win: b.win,
                    code: c
                }), e && e(!0), a.mainRenderer.renderManager.needUpdateRender = !0)
            })
        };
        this.removeLasBet = function (b) {
            d.length && a.mainFLGAccount.removeRoulette4kBet(d[d.length -
            1].code, a.gameConfig, function (c) {
                void 0 == c || -1 == c ? b && b(!1) : (d.pop(), b && b(!0), a.mainRenderer.renderManager.needUpdateRender = !0)
            })
        };
        this.setRoundResult = function (a) {
            for (var b = 0; b < d.length; b++) d[b].winBet = a
        }
    }

    this.destroy = function () {
        clearTimeout(ca);
        clearTimeout(da);
        w.events.removeAllListeners();
        O = E = null;
        v.destroy();
        v = null;
        M.destroy();
        M = null;
        t.destroy();
        t = null;
        y && (a.gameConfig.needHls ? y.destroy() : a.gameConfig.needRtc && rtcVideo.destroy());
        I = ea = z = U = C = H = k = fa = y = null;
        for (var b = 0; b < F.length; b++) F[b].round = null,
            F[b].editionResult = null, F[b].betsHistory.destroy && F[b].betsHistory.destroy(), F[b].betsHistory = null, F[b] = null;
        ha = F = null;
        for (b in m) m[b] = null;
        P = ia = ja = Q = J = ka = V = W = X = Y = Z = aa = ba = x = B = D = N = m = null;
        a.mainFLGAccount.events.off("onBet", R);
        a.mainFLGAccount.events.off("onBalance", S);
        S = R = null;
        G.destroy();
        G = null;
        A.destroy();
        A = null;
        K.destroy();
        K = null;
        for (b in w) w[b] = null;
        w = null
    };
    var w = this;
    this.events = new PIXI.utils.EventEmitter;
    for (var I = function (a) {
            a = parseInt(a);
            if ("DEMO" == parseInt(clientInfoGlobal.hall)) return 1;
            if (36 >= a) return parseInt(clientInfoGlobal.cf36max) / 100;
            if (42 >= a) return parseInt(clientInfoGlobal.cf3max) / 100;
            if (48 >= a) return parseInt(clientInfoGlobal.cf2max) / 100;
            if (135 >= a || 172 <= a && 195 >= a) return parseInt(clientInfoGlobal.cf18max) / 100;
            if (136 == a || 137 == a || 196 <= a && 207 >= a) return parseInt(clientInfoGlobal.cf12max) / 100;
            if (-1 != [141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171].indexOf(a)) return parseInt(clientInfoGlobal.cf6max) / 100;
            if (250 > a) return parseInt(clientInfoGlobal.cf9max) / 100
        }, E = clientInfoGlobal.coin6.split("-"),
             L = 0; L < E.length; L++) E[L] /= 100;
    E.push("MAX");
    var v = new betsControls(E[0], E[E.length - 1], E[1], E, function (b) {
        b = I(b.comb) - b.curSumm;
        a.mainFLGAccount.balance() < b && (b = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return b
    });
    this.betsControls = v;
    var t, M = new FLGTimer, y, fa = new PIXI.Container, k = new PIXI.Container, H = new PIXI.Container,
        C = new PIXI.Container, U = new PIXI.Container, z, G, A;
    this.betManager = function () {
        return A
    };
    var K, ea = function (a) {
            var b = [];
            if (!a) return b;
            for (var d in a) 0 !=
            a[d].code ? b.push({
                fortuneBetObjArr: [{comb: a[d].e1, coef: a[d].koef, summ: a[d].bet / 100}],
                win: a[d].win / 100,
                code: a[d].code
            }) : b[b.length - 1].fortuneBetObjArr.push({comb: a[d].e1, coef: a[d].koef, summ: a[d].bet / 100});
            return b
        }, F = [], ha = function (b, e) {
            function d(a) {
                var b = [];
                a = a.ball;
                99 != a && b.push(a);
                return b
            }

            a.mainGameManager.gameHistory(function (a) {
                for (var c = 21; 0 <= c; c--) F.push({
                    round: a["" + c].tir,
                    editionResult: [a["" + c].ball],
                    betsHistory: new r([])
                });
                F.push({
                    round: b.tir, editionResult: d(b), betsHistory: new r(0 < b.t2 ?
                        ea(b.rulbet) : [])
                });
                G = new p(F);
                G.drawEditions();
                e && e()
            })
        }, m = {}, N = function (b, e, d, f, c) {
            b && (m[e] ? m[e].stop() : (a.mainRenderer.renderManager.animationTweenInc(), m[e] = (new TWEEN.Tween(b.position)).to({
                x: d,
                y: f
            }, 500).easing(TWEEN.Easing.Cubic.InOut).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                m[e] = null
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                m[e] = null;
                c && c()
            }).start()))
        }, D = function (b, e) {
            b && (m[e] && (m[e].stop(), a.mainRenderer.renderManager.animationTweenDec()),
                a.mainRenderer.renderManager.animationTweenInc(), m[e] = (new TWEEN.Tween(b)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                m[e] = null;
                a.mainRenderer.renderManager.animationTweenInc();
                m[e] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    m[e] = null
                }).start()
            }).start())
        }, B = function (b, e, d) {
            if (b && 1 != b.alpha) switch (m[e] && (m[e].stop(), a.mainRenderer.renderManager.animationTweenDec()),
                a.mainRenderer.renderManager.animationTweenInc(), d) {
                case "grow":
                    m[e] = (new TWEEN.Tween(b.scale)).to({
                        x: 1.2,
                        y: 1.2
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        m[e] = null
                    }).start();
                    break;
                default:
                    m[e] = (new TWEEN.Tween(b)).to({alpha: .6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        m[e] = null
                    }).start()
            }
        }, x = function (b, e, d) {
            m[e] && (m[e].stop(), a.mainRenderer.renderManager.animationTweenDec());
            if (b && 0 != b.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(), d) {
                case "grow":
                    m[e] = (new TWEEN.Tween(b.scale)).to({
                        x: .9,
                        y: .9
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        m[e] = null
                    }).start();
                    break;
                default:
                    m[e] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        m[e] = null
                    }).start()
            }
        }, ba = function () {
            a.mainSoundManager.playSound("buttonClick");
            a.mainFLGAccount.closeGame()
        },
        aa = function () {
            $(this).hasClass("btn_disabled") || 0 == a.mainGrid.pressedZones.length || (a.mainSoundManager.playSound("stackChip"), A.doubleCurrentBets())
        }, Z = function () {
            $(this).hasClass("btn_disabled") || 0 == a.mainGrid.pressedZones.length || (a.mainSoundManager.playSound("clearBet"), a.mainGrid.removeCurrentBets(), a.mainFLGAccount.maxWin(0), a.mainFLGAccount.totalBet(-a.mainFLGAccount.totalBet()), A.addGridState())
        }, Y = function () {
            $(this).hasClass("btn_disabled") || (a.mainSoundManager.playSound("stackChip"), A.repeatLastRoundGridState(),
                t.setRebetInteraction(!1))
        }, X = function () {
            $(this).hasClass("btn_disabled") || (a.mainSoundManager.playSound("stackChip"), A.repeatLastRoundGridState(), A.doubleCurrentBets(), t.setRebetInteraction(!1))
        }, W = function () {
            $(this).hasClass("btn_disabled") || (a.mainSoundManager.playSound("buttonClick"), A.undoGridState())
        }, V = function () {
            a.mainSoundManager.playSound("buttonClick");
            showCashFlowDlg()
        }, ka = function (b, e) {
            a.mainSoundManager.playSound("chipSelector");
            v.setBet(b);
            K.setMode({modeName: b, modeSprite: {name: e}})
        },
        R, S,
        Q = [[a.gameConfig.BG, a.gameDir + a.gameConfig.BG + "-mid-" + a.gameConfig.gameType.toLowerCase() + ".png"], ["WIN", a.gameDir + "WIN2.png"], ["table_bg_main", a.gameDir + "table-bg-main.png"], ["table_bg_sectors", a.gameDir + "table-bg-sectors.png"], ["table_bg_footer", a.gameDir + "table-bg-footer.png"], ["table_disable_main", a.gameDir + "disable-table-main.png"], ["table_disable_sectors", a.gameDir + "disable-table-sectors.png"], ["table_disable_footer", a.gameDir + "disable-table-footer.png"], ["btn_switch_sectors", a.gameDir +
        "btn-switch-sectors.png"], ["btn_switch_sectors_mode_selected", a.gameDir + "btn-switch-sectors-mode-selected.png"], ["btn_switch_grid", a.gameDir + "btn-switch-grid.png"], ["btn_switch_grid_mode_selected", a.gameDir + "btn-switch-grid-mode-selected.png"], ["btn_clear", a.gameDir + "btn-clear.png"], ["btn_clear_mode_selected", a.gameDir + "btn-clear-mode-selected.png"], ["btn_undo", a.gameDir + "btn-undo_.png"], ["btn_undo_mode_selected", a.gameDir + "btn-undo-mode-selected_.png"], ["btn_home", a.gameDir + "btn-home.png"], ["btn_home_mode_selected",
            a.gameDir + "btn-home-mode-selected.png"], ["btn_info", a.gameDir + "btn-info.png"], ["btn_info_mode_selected", a.gameDir + "btn-info-mode-selected.png"], ["btn_double", a.gameDir + "btn-double.png"], ["btn_double_mode_selected", a.gameDir + "btn-double-mode-selected.png"], ["btn_bets", a.gameDir + "btn-my-bets.png"], ["btn_bets_mode_selected", a.gameDir + "btn-my-bets-selected.png"], ["btn_rebet", a.gameDir + "btn-rebet.png"], ["btn_rebet_mode_selected", a.gameDir + "btn-rebet-mode-selected.png"], ["btn_video", a.gameDir + "btn-video-.png"],
            ["btn_video_mode_selected", a.gameDir + "btn-video--mode-selected.png"], ["btn_video_collapse", a.gameDir + "btn-video-collapse.png"], ["btn_video_collapse_mode_selected", a.gameDir + "btn-video-collapse-mode-selected.png"], ["btn_video_close", a.gameDir + "video-close3.png"], ["btn_video_close_mode_selected", a.gameDir + "video-close3-mode-selected.png"], ["btn_video_load", a.gameDir + "btn-video-load.png"], ["volume_sign", a.gameDir + "volume-sign.png"], ["mute_sign", a.gameDir + "mute-sign.png"], ["inner_zone", a.gameDir + "inner-zone6.png"],
            ["inner_zone_zero", a.gameDir + "inner-zone-zero3.png"], ["inner_sector_cube", a.gameDir + "inner-sector-cube3.png"], ["inner_sector_11", a.gameDir + "inner-sector-11_3.png"], ["inner_sector_16", a.gameDir + "inner-sector-16_3.png"], ["inner_sector_30", a.gameDir + "inner-sector-30_3.png"], ["inner_sector_24", a.gameDir + "inner-sector-24_3.png"], ["inner_sector_8", a.gameDir + "inner-sector-8_3.png"], ["inner_sector_5", a.gameDir + "inner-sector-5_3.png"], ["inner_sector_23", a.gameDir + "inner-sector-23_3.png"], ["inner_sector_10",
                a.gameDir + "inner-sector-10_3.png"], ["inner_sector_15", a.gameDir + "inner-sector-15_3.png"], ["inner_sector_12", a.gameDir + "inner-sector-12_3.png"], ["inner_sector_32", a.gameDir + "inner-sector-32_3.png"], ["inner_sector_35", a.gameDir + "inner-sector-35_3.png"], ["inner_sector_0", a.gameDir + "inner-sector-0_3.png"], ["inner_sector_3", a.gameDir + "inner-sector-3_3.png"], ["inner_sector_26", a.gameDir + "inner-sector-26_3.png"], ["chip_1", a.gameDir + "icons_chip_1.png"], ["chip_2", a.gameDir + "icons_chip_2.png"], ["chip_3", a.gameDir +
            "icons_chip_3.png"], ["chip_4", a.gameDir + "icons_chip_4.png"], ["chip_5", a.gameDir + "icons_chip_5.png"], ["chip_6", a.gameDir + "icons_chip_6.png"], ["history_B", a.gameDir + "history_B.png"], ["history_G", a.gameDir + "history_G.png"], ["history_R", a.gameDir + "history_R.png"], ["video_img", a.gameDir + "video-img-" + a.gameConfig.gameType.toLowerCase() + "-min.png"], ["zone_win_chip", a.gameDir + "ring.png"], ["possible_win_bg", a.gameDir + "icon-possible-win.png"]],
        ja = {
            49: {size: {w: 253, h: 212}, pos: {zonePosX: 165, zonePosY: 80}, hoverTexture: ""},
            50: {size: {w: 332, h: 212}, pos: {zonePosX: 418, zonePosY: 80}, hoverTexture: ""},
            51: {size: {w: 404, h: 212}, pos: {zonePosX: 750, zonePosY: 80}, hoverTexture: ""},
            52: {size: {w: 125, h: 212}, pos: {zonePosX: 1154, zonePosY: 80}, hoverTexture: ""}
        }, ia = {
            10: {size: {w: 92, h: 71}, pos: {zonePosX: 9, zonePosY: 115}, hoverTexture: "inner_sector_10"},
            5: {size: {w: 108, h: 88}, pos: {zonePosX: 27, zonePosY: 50}, hoverTexture: "inner_sector_5"},
            24: {size: {w: 102, h: 92}, pos: {zonePosX: 84, zonePosY: 12}, hoverTexture: "inner_sector_24"},
            16: {
                size: {w: 83, h: 71}, pos: {
                    zonePosX: 169,
                    zonePosY: 8
                }, hoverTexture: "inner_sector_16"
            },
            33: {size: {w: 77, h: 71}, pos: {zonePosX: 254, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            1: {size: {w: 77, h: 71}, pos: {zonePosX: 347, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            20: {size: {w: 77, h: 71}, pos: {zonePosX: 427, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            14: {size: {w: 77, h: 71}, pos: {zonePosX: 506, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            31: {size: {w: 77, h: 71}, pos: {zonePosX: 586, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            9: {
                size: {w: 77, h: 71}, pos: {
                    zonePosX: 665,
                    zonePosY: 8
                }, hoverTexture: "inner_sector_cube"
            },
            22: {size: {w: 77, h: 71}, pos: {zonePosX: 758, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            18: {size: {w: 77, h: 71}, pos: {zonePosX: 838, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            29: {size: {w: 77, h: 71}, pos: {zonePosX: 917, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            7: {size: {w: 77, h: 71}, pos: {zonePosX: 997, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            28: {size: {w: 77, h: 71}, pos: {zonePosX: 1076, zonePosY: 8}, hoverTexture: "inner_sector_cube"},
            12: {
                size: {w: 83, h: 71}, pos: {
                    zonePosX: 1162,
                    zonePosY: 8
                }, hoverTexture: "inner_sector_12"
            },
            35: {size: {w: 102, h: 92}, pos: {zonePosX: 1235, zonePosY: 14}, hoverTexture: "inner_sector_35"},
            3: {size: {w: 109, h: 93}, pos: {zonePosX: 1288, zonePosY: 61}, hoverTexture: "inner_sector_3"},
            26: {size: {w: 87, h: 97}, pos: {zonePosX: 1318, zonePosY: 138}, hoverTexture: "inner_sector_26"},
            0: {size: {w: 109, h: 93}, pos: {zonePosX: 1288, zonePosY: 218}, hoverTexture: "inner_sector_0"},
            32: {size: {w: 102, h: 92}, pos: {zonePosX: 1235, zonePosY: 262}, hoverTexture: "inner_sector_32"},
            15: {
                size: {w: 83, h: 71}, pos: {
                    zonePosX: 1162,
                    zonePosY: 292
                }, hoverTexture: "inner_sector_15"
            },
            19: {size: {w: 77, h: 71}, pos: {zonePosX: 1076, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            4: {size: {w: 77, h: 71}, pos: {zonePosX: 997, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            21: {size: {w: 77, h: 71}, pos: {zonePosX: 917, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            2: {size: {w: 77, h: 71}, pos: {zonePosX: 838, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            25: {size: {w: 77, h: 71}, pos: {zonePosX: 758, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            17: {
                size: {w: 77, h: 71},
                pos: {zonePosX: 665, zonePosY: 295}, hoverTexture: "inner_sector_cube"
            },
            34: {size: {w: 77, h: 71}, pos: {zonePosX: 586, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            6: {size: {w: 77, h: 71}, pos: {zonePosX: 506, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            27: {size: {w: 77, h: 71}, pos: {zonePosX: 413, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            13: {size: {w: 77, h: 71}, pos: {zonePosX: 333, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            36: {size: {w: 77, h: 71}, pos: {zonePosX: 254, zonePosY: 295}, hoverTexture: "inner_sector_cube"},
            11: {
                size: {
                    w: 82,
                    h: 73
                }, pos: {zonePosX: 170, zonePosY: 293}, hoverTexture: "inner_sector_11"
            },
            30: {size: {w: 102, h: 92}, pos: {zonePosX: 84, zonePosY: 270}, hoverTexture: "inner_sector_30"},
            8: {size: {w: 108, h: 88}, pos: {zonePosX: 27, zonePosY: 230}, hoverTexture: "inner_sector_8"},
            23: {size: {w: 92, h: 71}, pos: {zonePosX: 9, zonePosY: 188}, hoverTexture: "inner_sector_23"}
        };
    Q = Q.concat(a.mainFLGAccount.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, "images/logo.json", Q, function (b, e, d) {
        a.mainRenderer.createButton(void 0, 0, 0, a.gameConfig.BG);
        K = new l(a);
        a.mainRenderer.createButton(k, 505, 25, "video_img");
        b = a.mainRenderer.createButton(k.getChildByName("video_img"), 456, 176, "btn_video_load");
        b.anchor.set(.5, .5);
        b.alpha = 0;
        b = a.mainRenderer.createButton(k.getChildByName("video_img"), 456, 176, "btn_video");
        a.mainRenderer.createButton(b, 0, 0, "btn_video_mode_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            D(b, "btn_video");
            a.mainUIManager.setVideoVisibility(!0, "part");
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        }, void 0, void 0, function (a) {
            B(a, "btn_video")
        }, function (a) {
            x(a, "btn_video")
        }).alpha = 0;
        b.anchor.set(.5, .5);
        b.children[0].anchor.set(.5, .5);
        b = a.mainRenderer.createButton(k, 1455, -1110, "volume_sign", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            k.getChildByName("volume_sign").texture = a.mainRenderer.resourceLoader.resources[y.muteAudio(!0) ? "mute_sign" : "volume_sign"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        b.anchor.set(.5, .5);
        b.visible = !1;
        b = a.mainRenderer.createButton(k,
            1457, 205, "btn_video_close");
        a.mainRenderer.createButton(b, 0, 0, "btn_video_close_mode_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            D(b, "btn_video_close");
            a.mainUIManager.setVideoVisibility(!1);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            B(a, "btn_video_close")
        }, function (a) {
            x(a, "btn_video_close")
        }).alpha = 0;
        b.anchor.set(.5, .5);
        b.children[0].anchor.set(.5, .5);
        b.visible = !1;
        b = a.mainRenderer.createButton(k, 1360, -1260, "btn_video");
        a.mainRenderer.createButton(b,
            0, 0, "btn_video_mode_selected", void 0, function (b, c) {
                a.mainSoundManager.playSound("buttonClick");
                c.stopped = !0;
                D(b, "btn_video");
                a.mainUIManager.setVideoVisibility(!0, "full");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                B(a, "btn_video")
            }, function (a) {
                x(a, "btn_video")
            }).alpha = 0;
        b.anchor.set(.5, .5);
        b.children[0].anchor.set(.5, .5);
        b.visible = !1;
        b = a.mainRenderer.createButton(k, 1360, -1260, "btn_video_collapse");
        a.mainRenderer.createButton(b, 0, 0, "btn_video_collapse_mode_selected",
            void 0, function (b, c) {
                a.mainSoundManager.playSound("buttonClick");
                c.stopped = !0;
                D(b, "btn_video_collapse");
                a.mainUIManager.setVideoVisibility(!0, "part");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                B(a, "btn_video_collapse")
            }, function (a) {
                x(a, "btn_video_collapse")
            }).alpha = 0;
        b.anchor.set(.5, .5);
        b.children[0].anchor.set(.5, .5);
        b.visible = !1;
        H.addChild(C);
        a.mainRenderer.createButton(C, 146, 363, "table_bg_main", void 0, void 0, void 0, void 0, void 0, function () {
            a.mainGrid.zonesOut(x)
        });
        a.mainRenderer.createButton(C, 146, 363, "table_disable_main").visible = !1;
        a.mainRenderer.createButton(H, 259, 745, "table_bg_footer", void 0, void 0, void 0, void 0, void 0, function () {
            a.mainGrid.zonesOut(x)
        });
        a.mainRenderer.createButton(H, 259, 745, "table_disable_footer").visible = !1;
        b = a.mainRenderer.createButton(C, 1710, 770, "btn_switch_sectors");
        a.mainRenderer.createButton(b, 0, 0, "btn_switch_sectors_mode_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            D(b, "btn_switch_sectors");
            a.mainUIManager.switchGridMode(!0);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            B(a, "btn_switch_sectors")
        }, function (a) {
            x(a, "btn_switch_sectors")
        }).alpha = 0;
        b.scale.set(1.17, 1.17);
        a.mainRenderer.createButton(C, 256, -907, "table_bg_sectors", void 0, void 0, void 0, void 0, void 0, function () {
            a.mainGrid.zonesOut(x)
        });
        a.mainRenderer.createButton(C, 256, -907, "table_disable_sectors").visible = !1;
        b = a.mainRenderer.createButton(C, 1710, -505, "btn_switch_grid");
        a.mainRenderer.createButton(b,
            0, 0, "btn_switch_grid_mode_selected", void 0, function (b, c) {
                a.mainSoundManager.playSound("buttonClick");
                c.stopped = !0;
                D(b, "btn_switch_grid");
                a.mainUIManager.switchGridMode(!1);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                B(a, "btn_switch_grid")
            }, function (a) {
                x(a, "btn_switch_grid")
            }).alpha = 0;
        b.scale.set(1.17, 1.17);
        b = new PIXI.Graphics;
        b.position.set(0, 0);
        b.beginFill(0);
        b.drawRect(0, 355, 1920, 1080);
        b.endFill;
        H.mask = b;
        b = null;
        a.mainFLGAccount.drawAccount(0, 0, a.gameConfig, !0, U);
        t = new function (b) {
            this.destroy = function () {
                for (var a in d) d[a].remove(), d[a] = null;
                d = null;
                for (a in e) e[a].remove(), e[a] = null;
                e = null;
                h.$btnControlsHome.unbind("click", ba);
                h.$btnControlsDouble.unbind("click", aa);
                h.$btnControlsClear.unbind("click", Z);
                h.$btnControlsRebet.unbind("click", Y);
                h.$btnControlsRebetx2.unbind("click", X);
                h.$btnControlsUndo.unbind("click", W);
                h.$btnControlsMyBets.unbind("click", V);
                h.$btnControlsChips.off("click", ".Chip_component_2UVTI", clickChip).off("mouseenter", ".Chip_component_2UVTI",
                    enterChip).off("mouseleave", ".Chip_component_2UVTI", leaveChip);
                for (a in h) h[a].remove(), h[a] = null;
                p = l = g = f = h = null;
                window.removeEventListener("resize", m);
                b.unbind("parentResized", m);
                m = null;
                for (a in c) c[a] = null;
                c = null
            };
            var c = this, d = {}, f = function () {
                d.$winDOM = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 50px; left: 648px; width: 624px; z-index: 50000; visibility: hidden; transform-origin : 50% 0%;"><div style="width: 624px; height: 355px; background: url(' +
                    a.gameDir + 'WIN3.png) no-repeat 100% 100%;"></div></div>');
                b.append(d.$winDOM);
                d.$winDOMBetTxt = $('<div style="position: absolute; top: 108px; font-size: 52px; color: #9e9e9e; font-family: Arial Narrow;">100</div>');
                d.$winDOM.append(d.$winDOMBetTxt);
                d.$winDOMBet = $('<div style="position: absolute; top: 57px; font-size: 34px; color: #9e9e9e; font-family: Arial Narrow;">' + mainLocalizationTable.bet.toUpperCase() + "</div>");
                d.$winDOM.append(d.$winDOMBet);
                d.$winDOMWinTxt = $('<div style="position: absolute; bottom: 120px; font-size: 86px; color: #c4c3c1; font-family: Arial Narrow;">100</div>');
                d.$winDOM.append(d.$winDOMWinTxt);
                d.$winDOMWin = $('<div style="position: absolute; bottom: 57px; font-size: 34px; color: #c4c3c1; font-family: Arial Narrow;">' + mainLocalizationTable.win.toUpperCase() + "</div>");
                d.$winDOM.append(d.$winDOMWin)
            };
            f();
            var e = {}, g = function () {
                e.$timerDOM = $('<div id="timerContainer" style="visibility: hidden; position: absolute; display: flex; justify-content: center; align-items: center; top: 0; left: 0; width: 1920px; height: 25px; z-index: 50000; background-color: black; transform-origin : 50% 0%;"><span class="timerSec timerBlack" style="color: #bcbcbc; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; margin-left: 35px; flex-basis: 20%;">00:00</span><span class="timerDesc timerBlack" style="color: #bcbcbc; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; flex: 3 1 auto; text-align: center;"></span><span class="timerBlack" style="color: #bcbcbc; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; margin-right: 35px; flex-basis: 20%;; text-align: right;">Live Roulette</span><div id="timerRow" style="position: absolute; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background-color: #4da362; clip-path: inset(0px 1920px 0px 0px); -webkit-clip-path: inset(0px 1920px 0px 0px); opacity: 1;"><span class="timerSec" style="color: #000000; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; margin-left: 35px; flex-basis: 20%;">00:00</span><span class="timerDesc" style="color: #000000; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; flex: 3 1 auto;; text-align: center;"></span><span style="color: #000000; font-size: 22px; font-family: Arial, sans-serif; font-weight: 600; margin-right: 35px; flex-basis: 20%;; text-align: right;">Live Roulette</span></div></div>');
                b.append(e.$timerDOM)
            };
            g();
            this.timerDOM = e.$timerDOM;
            var k = {}, l = function () {
                k.$historyDOM = $('<div id="historyContainer" style="visibility: hidden; position:absolute; display: flex; justify-content: center; align-items: center; top: 418px; left: 0px; width: 1920px; height: 60px; z-index: 50000; transform-origin : 50% 0%;"></div>');
                for (var a = 22; 0 < a; a--) 22 == a ? k.$historyItem22 = $('<div style="flex-basis: 53px;display: flex;align-items: center;justify-content: center;width: 53px; height: 53px;"><div class="shistory-ball-green" id="historyBall' +
                    a + '" style="transform: scale(1.23); width: 43px; height: 43px; position: absolute;"></div><div id="historyBallText' + a + '" style="font-size: 36px; font-weight: bold; font-family: Avenir Next Medium; color: #ffffff; position:absolute;">36</div></div>') : k["$historyItem" + a] = $('<div style="flex-basis: 38px;display: flex;align-items: center;justify-content: center; width: 38px; height: 38px;"><div class="shistory-ball-green" id="historyBall' + a + '" style="transform: scale(0.88); width: 43px; height: 43px; position: absolute;"></div><div id="historyBallText' +
                    a + '" style="font-size: 24px; font-weight: bold; font-family: Avenir Next Medium; color: #ffffff; position: absolute;">36</div></div>'), k.$historyDOM.append(k["$historyItem" + a]);
                b.append(k.$historyDOM)
            };
            l();
            this.setHistoryItem = function (a, b, c) {
                void 0 != b ? (k["$historyItem" + a].find("#historyBallText" + a).text(b), k["$historyItem" + a].find("#historyBall" + a).attr("class", "shistory-ball-" + c), k["$historyItem" + a].css("visibility", "visible")) : k["$historyItem" + a].css("visibility", "hidden")
            };
            var h = {}, p = function () {
                h.$btnControlsDOM =
                    $('<div id="btnControls" style="visibility: hidden; position: absolute; bottom: 33px; left: 0; width: 1920px; height: 100px; z-index: 50000; background-color: black; transform-origin : 50% 100%;"></div>');
                h.$btnControlsHome = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 19px; left: 45px; width: 72px; height: 56px; cursor: pointer;"><div style="width: 72px; height: 56px; background: url(' + a.gameDir + 'btn-home.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 72px; height: 56px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' +
                    a.gameDir + 'btn-home-mode-selected.png) no-repeat 100% 100%;"></div></div>');
                APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && h.$btnControlsHome && h.$btnControlsHome.css("visibility", clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl ? "visible" : "hidden");
                h.$btnControlsHome.bind("click", ba);
                h.$btnControlsDOM.append(h.$btnControlsHome);
                h.$btnControlsDouble = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 19px; left: 1454px; width: 70px; height: 44px; cursor: pointer;"><div style="width: 70px; height: 44px; background: url(' +
                    a.gameDir + 'btn-rebetx22-min.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 70px; height: 44px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDir + 'btn-rebetx2-mode-selected-min.png) no-repeat 100% 100%;"></div></div>');
                h.$btnControlsDouble.bind("click", aa);
                h.$btnControlsDOM.append(h.$btnControlsDouble);
                h.$btnControlsDoubleDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 1439px; width: 100px; color: #73787c; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' +
                    mainLocalizationTable.double + "</span></div>");
                h.$btnControlsDOM.append(h.$btnControlsDoubleDesc);
                h.$btnControlsUndo = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 20px; left: 546px; width: 59px; height: 44px; cursor: pointer;"><div style="width: 59px; height: 44px; background: url(' + a.gameDir + 'btn-undo_.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 59px; height: 44px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' +
                    a.gameDir + 'btn-undo-mode-selected_.png) no-repeat 100% 100%;"></div></div>');
                h.$btnControlsUndo.bind("click", W);
                h.$btnControlsDOM.append(h.$btnControlsUndo);
                h.$btnControlsUndoDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 519px; width: 110px; color: #73787c; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' + mainLocalizationTable.undo + "</span></div>");
                h.$btnControlsDOM.append(h.$btnControlsUndoDesc);
                h.$btnControlsRebet = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 14px; left: 1335px; width: 52px; height: 46px; cursor: pointer;"><div style="width: 52px; height: 46px; background: url(' + a.gameDir + 'btn-rebet.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 52px; height: 46px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDir + 'btn-rebet-mode-selected.png) no-repeat 100% 100%;"></div></div>');
                h.$btnControlsRebet.bind("click", Y);
                h.$btnControlsDOM.append(h.$btnControlsRebet);
                h.$btnControlsRebetDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 1307px; width: 100px; color: #73787c; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' + mainLocalizationTable.repeat + "</span></div>");
                h.$btnControlsDOM.append(h.$btnControlsRebetDesc);
                h.$btnControlsClear = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 12px; left: 424px; width: 44px; height: 50px; cursor: pointer;"><div style="width: 44px; height: 50px; background: url(' +
                    a.gameDir + 'btn-clear.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 44px; height: 50px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDir + 'btn-clear-mode-selected.png) no-repeat 100% 100%;"></div></div>');
                h.$btnControlsClear.bind("click", Z);
                h.$btnControlsDOM.append(h.$btnControlsClear);
                h.$btnControlsClearDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 396px; width: 100px; color: #73787c; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' +
                    mainLocalizationTable.delete + "</span></div>");
                h.$btnControlsDOM.append(h.$btnControlsClearDesc);
                h.$btnControlsRebetx2 = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 17px; left: 1454px; width: 69px; height: 46px; cursor: pointer;"><div style="width: 69px; height: 46px; background: url(' + a.gameDir + 'btn-rebetx22-min.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 69px; height: 46px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' +
                    a.gameDir + 'btn-rebetx2-mode-selected-min.png) no-repeat 100% 100%;"></div></div>');
                h.$btnControlsRebetx2.bind("click", X);
                h.$btnControlsRebetx2Desc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 1434px; width: 110px; color: #73787c; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' + mainLocalizationTable.repeatx2 + "</span></div>");
                "DEMO" != clientInfoGlobal.hall && (h.$btnControlsMyBets = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 12px; left: 172px; width: 44px; height: 50px; cursor: pointer;"><div style="width: 44px; height: 50px; background: url(' +
                    a.gameDir + 'btn-my-bets.png) no-repeat 100% 100%; transform: translateZ(0);"></div><div class="btn-control-selected" style="position: absolute; width: 44px; height: 50px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + a.gameDir + 'btn-my-bets-selected.png) no-repeat 100% 100%;"></div></div>'), h.$btnControlsMyBets.bind("click", V), h.$btnControlsDOM.append(h.$btnControlsMyBets), h.$btnControlsMyBetsDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 71px; left: 134px; width: 120px; color: #73787c; font-family: Arial Narrow; font-size: 20px; transform: translateZ(0);"><span>' +
                    mainLocalizationTable.myBets + "</span></div>"), h.$btnControlsDOM.append(h.$btnControlsMyBetsDesc));
                h.$btnControlsChips = $('<div class="ChipTray_chips_3E1bN" style="position: absolute; display: flex; justify-content:center; align-items: center; top: 6px; left: 645px; width: 650px; font-family: Book Antiqua, sans-serif;"><div style="display: flex;"><div data-automation-id="chip-yellow" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_1" class="Chip_component_2UVTI Chip_yellow_3DAOA"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m">' +
                    v.possibleBets[0] + '</div></div></div></div><div data-automation-id="chip-orange" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_2" class="Chip_component_2UVTI Chip_orange_2sdQr chip_active Chip_isSelected_1qLig"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m">' +
                    v.possibleBets[1] + '</div></div></div></div><div data-automation-id="chip-blue" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_3" class="Chip_component_2UVTI Chip_grey_2sdQr"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m">' +
                    v.possibleBets[2] + '</div></div></div></div><div data-automation-id="chip-red" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_4" class="Chip_component_2UVTI Chip_red_2PdQZ"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m">' +
                    v.possibleBets[3] + "</div></div></div></div>" + (v.possibleBets[4] ? '<div data-automation-id="chip-green" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_5" class="Chip_component_2UVTI Chip_green_l17VV"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m">' +
                        v.possibleBets[4] + "</div></div></div></div>" : "") + (v.possibleBets[5] ? '<div data-automation-id="chip-purple" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div id="chip_6" class="Chip_component_2UVTI Chip_blue_2zyvu"><div class="Chip_contents_32dLH"><svg class="Chip_background_1hZNb" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg><svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg><div class="Chip_label_2--9m" style="font-size: 24px;">' +
                        v.possibleBets[5] + "</div></div></div></div>" : "") + "</div></div>");
                h.$btnControlsChips.on("click", ".Chip_component_2UVTI", function () {
                    $(this).hasClass("Chip_isDisabled_2RK_o") || $(this).hasClass("chip_active") || (clickChip(this), ka($(this).find(".Chip_label_2--9m").text(), $(this).attr("id")))
                }).on("mouseenter", ".Chip_component_2UVTI", function () {
                    $(this).hasClass("Chip_isDisabled_2RK_o") || $(this).hasClass("chip_active") || enterChip(this)
                }).on("mouseleave", ".Chip_component_2UVTI", function () {
                    $(this).hasClass("Chip_isDisabled_2RK_o") ||
                    $(this).hasClass("chip_active") || leaveChip(this)
                });
                K.setMode({modeName: v.possibleBets[1], modeSprite: {name: "chip_2"}});
                h.$btnControlsDOM.append(h.$btnControlsChips);
                b.append(h.$btnControlsDOM)
            };
            this.setChipsInteraction = function (a) {
                $(".Chip_component_2UVTI").each(function () {
                    a ? ($(this).removeClass("Chip_isDisabled_2RK_o"), $(this).hasClass("chip_active") && $(this).addClass("Chip_isSelected_1qLig")) : ($(this).addClass("Chip_isDisabled_2RK_o"), $(this).hasClass("chip_active") && $(this).removeClass("Chip_isSelected_1qLig"))
                })
            };
            this.setBtnControlsInteraction = function (a) {
                a ? (h.$btnControlsRebet.removeClass("btn_disabled"), h.$btnControlsRebetx2.removeClass("btn_disabled"), h.$btnControlsDouble.removeClass("btn_disabled"), h.$btnControlsUndo.removeClass("btn_disabled"), h.$btnControlsClear.removeClass("btn_disabled")) : (h.$btnControlsRebet.addClass("btn_disabled"), h.$btnControlsRebetx2.addClass("btn_disabled"), h.$btnControlsDouble.addClass("btn_disabled"), h.$btnControlsUndo.addClass("btn_disabled"), h.$btnControlsClear.addClass("btn_disabled"))
            };
            this.setRebetInteraction = function (a) {
                a ? (h.$btnControlsRebet.removeClass("btn_disabled"), h.$btnControlsRebetx2.removeClass("btn_disabled")) : (h.$btnControlsRebet.addClass("btn_disabled"), h.$btnControlsRebetx2.addClass("btn_disabled"))
            };
            this.slideBtnControls = function (a) {
                h.$btnControlsDOM.attr("toBottom", a);
                m(!0)
            };
            this.slideHistoryContainer = function (a) {
                k.$historyDOM.attr("toBottom", a);
                m(!0)
            };
            this.setWinVisibility = function (b, c) {
                b && 0 < a.mainFLGAccount.totalWin() ? (d.$winDOMBetTxt.text(a.mainFLGAccount.totalBet()),
                    d.$winDOMWinTxt.text(a.mainFLGAccount.totalWin()), setTimeout(function () {
                    d.$winDOM.css("visibility", "visible")
                }, c)) : d.$winDOM.css("visibility", "hidden")
            };
            this.setDOMVisibility = function (a) {
                h.$btnControlsDOM.css("visibility", a ? "visible" : "hidden");
                e.$timerDOM.css("visibility", a ? "visible" : "hidden");
                k.$historyDOM.css("visibility", a ? "visible" : "hidden")
            };
            this.slideWin = function (a) {
                d.$winDOM.attr("toBottom", a);
                m(!0)
            };
            p();
            var m = function (a) {
                var c = b.find("canvas"), f = c.attr("width"), g = parseFloat(c.css("width"));
                c = parseFloat(c.css("height"));
                f = g / f;
                var n = (h.$btnControlsDOM.width() - h.$btnControlsDOM.width() * f) / 2,
                    u = (d.$winDOM.width() - d.$winDOM.width() * f) / 2;
                g = (b.width() - g) / 2;
                c = (b.height() - c) / 2;
                h.$btnControlsDOM.css({
                    left: -n + g + "px",
                    bottom: c + ("true" == h.$btnControlsDOM.attr("toBottom") ? -1 : 33 * f) + "px",
                    transition: 1 == a ? "bottom .2s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    "-webkit-transition": 1 == a ? "bottom .2s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    transform: "scale(" + f + ")"
                });
                e.$timerDOM.css({
                    left: -n + g + "px", top: c + "px",
                    transform: "scale(" + f + ")"
                });
                k.$historyDOM.css({
                    left: -n + g + "px",
                    top: c + ("true" == k.$historyDOM.attr("toBottom") ? 483 * f : 418 * f) + "px",
                    transition: 1 == a ? "top .5s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    "-webkit-transition": 1 == a ? "top .5s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    transform: "scale(" + f + ")"
                });
                d.$winDOM.css({
                    left: -u + g + 648 * f + "px",
                    top: c + ("true" == d.$winDOM.attr("toBottom") ? 195 * f : 50 * f) + "px",
                    transition: 1 == a ? "top .5s cubic-bezier(0.645, 0.045, 0.355, 1)" : "",
                    "-webkit-transition": 1 == a ? "top .5s cubic-bezier(0.645, 0.045, 0.355, 1)" :
                        "",
                    transform: "scale(" + f + ")"
                })
            };
            window.addEventListener("resize", m, !1);
            b.bind("parentResized", m);
            m()
        }($("#" + a.gameConfig.canvasId));
        a.mainRenderer.createButton(k, 1605, 393, void 0, {
            text: mainLocalizationTable.totalBet,
            align: "right",
            style: {
                font: "26px Avenir Next Medium",
                fill: "#b0a49b",
                dropShadow: !0,
                dropShadowAlpha: .3,
                dropShadowAngle: Math.PI / 2,
                dropShadowBlur: 2
            }
        }).name = "betSprite";
        a.mainRenderer.createButton(k, 1605, 433, void 0, {
            text: formatFLGNums(a.mainFLGAccount.totalBet()), align: "right", style: {
                font: "30px Avenir Next Medium",
                fill: "#b0a49b", dropShadow: !0, dropShadowAlpha: .3, dropShadowAngle: Math.PI / 2, dropShadowBlur: 2
            }
        }).name = "betTxt";
        R = function (a) {
            k.getChildByName("betTxt").children[0].text = formatFLGNums(a)
        };
        a.mainFLGAccount.events.on("onBet", R);
        a.mainRenderer.createButton(k, 349, 393, void 0, {
            text: mainLocalizationTable.balance,
            align: "left",
            style: {
                font: "26px Avenir Next Medium",
                fill: "#b0a49b",
                dropShadow: !0,
                dropShadowAlpha: .3,
                dropShadowAngle: Math.PI / 2,
                dropShadowBlur: 2
            }
        }).name = "balanceSprite";
        a.mainRenderer.createButton(k, 349,
            433, void 0, {
                text: "DEMO" == clientInfoGlobal.hall ? mainLocalizationTable.demo : formatFLGNums(a.mainFLGAccount.balance()),
                align: "left",
                style: {
                    font: "30px Avenir Next Medium",
                    fill: "#b0a49b",
                    dropShadow: !0,
                    dropShadowAlpha: .3,
                    dropShadowAngle: Math.PI / 2,
                    dropShadowBlur: 2
                }
            }).name = "balanceTxt";
        S = function (a) {
            k.getChildByName("balanceTxt").children[0].text = "DEMO" == clientInfoGlobal.hall ? mainLocalizationTable.demo : formatFLGNums(a)
        };
        a.mainFLGAccount.events.on("onBalance", S);
        a.mainRenderer.stage.addChild(fa);
        k.addChild(H);
        a.mainRenderer.stage.addChild(k);
        K.addDragSprite();
        a.mainRenderer.stage.addChild(U);
        a.setMainGrid(new FortuneGrid(261, 382, 12, 3, C, a.mainRenderer));
        b = function (b, c, d) {
            c && (a.mainGrid.zonesOut(x), a.mainUIManager.defineZonesForBet(b, .35));
            c || (a.mainGrid.gridContainer.down = !0);
            if (c && a.mainGrid.gridContainer.down || !c && !d || d && (b.name != z || void 0 == z)) {
                c = 40 <= b.name && 48 >= b.name ? a.mainGrid.uiButtonsContainer.getChildByName(b.name).getChildByName("smallChipText") ? parseFloat(a.mainGrid.uiButtonsContainer.getChildByName(b.name).getChildByName("smallChipText").text) :
                    0 : a.mainGrid.uiGridContainer.getChildByName(b.name).getChildByName("smallChipText") ? parseFloat(a.mainGrid.uiGridContainer.getChildByName(b.name).getChildByName("smallChipText").text) : 0;
                c = parseFloat(v.currentBet({comb: b.name, curSumm: c}));
                if (!w.isAllowBet({
                    comb: parseInt(b.name),
                    coef: void 0,
                    summ: c
                }, a.mainGrid.pressedZones[b.name] ? a.mainGrid.pressedZones[b.name].bet + c : c) || 0 == c || -1 == a.mainFLGAccount.totalBet(c)) return;
                40 <= b.name && 48 >= b.name ? a.mainUIManager.createSmallChip(a.mainGrid.uiButtonsContainer.getChildByName(b.name),
                    c) : (a.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(b.name), c), 36 >= b.name && a.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(b.name), c));
                40 <= b.name && 48 >= b.name && a.mainGrid.buttonsContainer.getChildByName(b.name).selected || (40 > b.name || 48 < b.name) && a.mainGrid.gridContainer.getChildByName(b.name).selected ? (a.mainSoundManager.playSound("stackChip"), a.mainGrid.pressedZones[b.name].bet = 40 <= b.name && 48 >= b.name ? parseFloat(a.mainGrid.uiButtonsContainer.getChildByName(b.name).getChildByName("smallChipText").text) :
                    parseFloat(a.mainGrid.uiGridContainer.getChildByName(b.name).getChildByName("smallChipText").text), a.mainGrid.pressedZones[b.name].spread.main += c) : (a.mainSoundManager.playSound("firstChip"), 40 <= b.name && 48 >= b.name ? a.mainGrid.buttonsContainer.getChildByName(b.name).selected = !0 : a.mainGrid.gridContainer.getChildByName(b.name).selected = !0, a.mainGrid.pressedZones[b.name] = {
                    zone: 40 <= b.name && 48 >= b.name ? a.mainGrid.uiButtonsContainer.getChildByName(b.name) : a.mainGrid.uiGridContainer.getChildByName(b.name),
                    bet: c,
                    coef: a.mainUIManager.defineCoefForBet(b),
                    spread: {sectors: {}, main: c}
                });
                a.mainUIManager.defineZonesForBet(b, .35, J, c * parseFloat(a.mainGrid.pressedZones[b.name].coef))
            }
            if (d) {
                if (b.name != z || void 0 == z) void 0 != z && a.mainGrid.zonesOut(x), a.mainUIManager.defineZonesForBet(b, .35);
                z = b.name
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        e = function (b) {
            a.mainGrid.gridContainer.down && A.addGridState();
            a.mainGrid.gridContainer.down = !1;
            a.mainGrid.zonesOut(x);
            z = void 0;
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        };
        a.mainGrid.createZonesRoulette4K({w: 115, h: 115}, {w: 110, h: 364}, {
            x: 2.6,
            y: 2
        }, b, e, {font: "52px Avenir Next Demi", fill: "#ffffff", align: "center"});
        a.mainGrid.createFooter({posX: 261, posY: 733}, H, {x: 2.6, y: 2}, b, e);
        a.mainGrid.createSectors({posX: 256, posY: -907}, ia, ja, function (b, c, d) {
            c && (a.mainGrid.zonesOut(x), a.mainUIManager.defineZonesForBet(b, .35));
            c || (a.mainGrid.gridContainer.down = !0);
            if (c && a.mainGrid.gridContainer.down || !c && !d || d && (b.name != z || void 0 == z)) {
                c = a.mainGrid.sectorCombinations[b.name] ? a.mainGrid.sectorCombinations[b.name] :
                    a.mainGrid.sectorButtonCombinations[b.name].zones;
                for (var e = 0; e < c.length; e++) {
                    var f = a.mainGrid.uiGridContainer.getChildByName(c[e]).getChildByName("smallChipText") ? parseFloat(a.mainGrid.uiGridContainer.getChildByName(c[e]).getChildByName("smallChipText").text) : 0;
                    f = parseFloat(v.currentBet({comb: c[e], curSumm: f}));
                    if (!w.isAllowBet({
                        comb: parseInt(c[e]),
                        coef: void 0,
                        summ: f
                    }, a.mainGrid.pressedZones[c[e]] ? a.mainGrid.pressedZones[c[e]].bet + f : f) || 0 == f || -1 == a.mainFLGAccount.totalBet(f)) return;
                    a.mainUIManager.createSmallChip(a.mainGrid.uiGridContainer.getChildByName(c[e]),
                        f);
                    49 <= b.name && 52 >= b.name ? a.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(b.name), f) : a.mainUIManager.createSmallChip(a.mainGrid.uiSectorsContainer.getChildByName(c[e]), f);
                    if (a.mainGrid.gridContainer.getChildByName(c[e]).selected) a.mainSoundManager.playSound("stackChip"), a.mainGrid.pressedZones[c[e]].bet = parseFloat(a.mainGrid.uiGridContainer.getChildByName(c[e]).getChildByName("smallChipText").text), a.mainGrid.sectorCombinations[b.name] ? a.mainGrid.pressedZones[c[e]].spread.main +=
                        f : a.mainGrid.pressedZones[c[e]].spread.sectors[b.name] = a.mainGrid.pressedZones[c[e]].spread.sectors[b.name] ? a.mainGrid.pressedZones[c[e]].spread.sectors[b.name] + f : f; else {
                        a.mainSoundManager.playSound("firstChip");
                        a.mainGrid.gridContainer.getChildByName(c[e]).selected = !0;
                        var g = {};
                        a.mainGrid.sectorCombinations[b.name] || (g[b.name] = f);
                        a.mainGrid.pressedZones[c[e]] = {
                            zone: a.mainGrid.uiGridContainer.getChildByName(c[e]),
                            bet: f,
                            coef: a.mainUIManager.defineCoefForBet(a.mainGrid.gridContainer.getChildByName(c[e])),
                            spread: a.mainGrid.sectorCombinations[b.name] ? {sectors: g, main: f} : {
                                sectors: g,
                                main: 0
                            }
                        }
                    }
                    a.mainUIManager.defineZonesForBet(a.mainGrid.gridContainer.getChildByName(c[e]), .35, J, f * parseFloat(a.mainGrid.pressedZones[c[e]].coef))
                }
            }
            if (d) {
                if (b.name != z || void 0 == z) void 0 != z && a.mainGrid.zonesOut(x), a.mainUIManager.defineZonesForBet(b, .35);
                z = b.name
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            a.mainGrid.gridContainer.down && A.addGridState();
            a.mainGrid.gridContainer.down = !1;
            a.mainGrid.zonesOut(x);
            z = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        b = null;
        H.scale.set(.8, .8);
        H.position.set(192, 200);
        a.mainGameManager.gameStateAsync(function (b) {
            ha(b, function () {
                A = new g(a);
                G.drawEditionHistory(b);
                P(b);
                d && d();
                a.mainRenderer.renderManager.needUpdateRender = !0
            })
        })
    }, function () {
        a.mainGrid.zonesOut();
        t.setDOMVisibility(!0);
        a.mainUIManager.setVideoVisibility(!0, "part")
    });
    this.createSmallChip = function (b, e) {
        function d(b) {
            var c;
            for (c = v.possibleBets.length - 1; 0 <= c; c--) if (v.possibleBets[c] <= b) return a.mainRenderer.resourceLoader.resources["chip_" +
            (c + 1)].texture
        }

        if (b.getChildByName("smallChip")) parseFloat(b.getChildByName("smallChipText").text) + e <= I(parseInt(b.name)) && (b.getChildByName("smallChipText").text = parseFloat(b.getChildByName("smallChipText").text) + e, b.getChildByName("smallChipText").text = +parseFloat(b.getChildByName("smallChipText").text).toFixed(10), w.setTextScale(b.getChildByName("smallChipText")), b.getChildByName("smallChipText").visible = !0, b.getChildByName("smallChip").visible = !0, b.getChildByName("smallChip").texture = d(parseFloat(b.getChildByName("smallChipText").text)));
        else {
            var f = new PIXI.Sprite(d(e));
            e = new PIXI.Text(e, {
                font: "uiSectorsContainer" == b.parent.name && 36 >= b.name ? "bold 24px Book Antiqua" : "bold 30px Book Antiqua",
                fill: "#000000",
                align: "center"
            });
            e.name = "smallChipText";
            w.setTextScale(e);
            f.name = "smallChip";
            b.addChildAt(f, 0 == b.name ? 1 : 0);
            b.addChildAt(e, 0 == b.name ? 2 : 1);
            for (f = 0; f < b.children.length; f++) if ("smallChip" == b.children[f].name || "smallChipText" == b.children[f].name) b.children[f].anchor.x = .5, b.children[f].anchor.y = .5, b.children[f].position.y = b.height / 2, b.children[f].position.x =
                b.width / 2, "smallChip" == b.children[f].name ? b.children[f].scale.set("uiSectorsContainer" == b.parent.name && 36 >= b.name ? .8 : .93, "uiSectorsContainer" == b.parent.name && 36 >= b.name ? .8 : .93) : b.children[f].anchor.y = .515;
            f = e = null
        }
        b = null
    };
    this.setVideoVisibility = function (b, e) {
        b ? "part" == e ? y ? (a.gameConfig.needHls ? y.setFullscreenMode(!1) : a.gameConfig.needRtc && rtcVideo.setFullscreenMode(!1), t.slideWin(!1), t.slideHistoryContainer(!1), N(k, "mainGridContainer", 0, 0, function () {
            k.getChildByName("btn_video_collapse").visible =
                !1;
            k.getChildByName("btn_video").visible = !0
        })) : (a.gameConfig.needHls ? (y = new FLGVideo(a.gameConfig.videoPos.x + 80 - 28, a.gameConfig.videoPos.y + 25, .8 * a.gameConfig.videoSize.w + 56, .8 * a.gameConfig.videoSize.h, a.gameConfig.canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" wmode="opaque" volume="0" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=2&amp;URL=' +
            a.gameConfig.videoURL + ';"> <param name="movie" value="videoplayer.swf"><param name="volume" value="0" /></object>', '<video id="innerVideo' + a.gameConfig.canvasId + '" autoplay playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + a.gameConfig.videoMobileURL + '" type="application/x-mpegURL"></video>', {
            borderURL: void 0,
            paddings: 0,
            noVideoIcons: !0,
            videoMaxScale: 1,
            clipPath: "inset(8% 0%)",
            fullscreenPosY: -47,
            fullscreenClipPath: "inset(10% 11% 5%)"
        }, a.mainSoundManager, !0), y.setZIndex(!1),
            y.setVisible(!0)) : a.gameConfig.needRtc && (y = rtcVideo.init({
            videoId: "innerVideo" + a.gameConfig.canvasId,
            parentId: a.gameConfig.canvasId,
            videoString: '<video id="innerVideo' + a.gameConfig.canvasId + '" autoplay playsinline preload="metadata" style="height:100%;width:100%;"></video>',
            styleObj: {
                posX: a.gameConfig.videoPos.x + 80 - 28,
                posY: a.gameConfig.videoPos.y + 25,
                sizeW: .8 * a.gameConfig.videoSize.w + 56,
                sizeH: .8 * a.gameConfig.videoSize.h,
                borderURL: void 0,
                paddings: 0,
                noVideoIcons: !0,
                videoMaxScale: 1,
                clipPath: "inset(8% 0%)",
                fullscreenPosY: -47,
                fullscreenClipPath: "inset(10% 11% 5%)"
            }
        }), rtcVideo.setSrc(a.gameConfig.videoRtcUrl, a.gameConfig.videoRtcApp, a.gameConfig.videoRtcStream)), k.getChildByName("video_img").getChildByName("btn_video").visible = !1, a.mainRenderer.renderManager.animationTweenInc(), (new TWEEN.Tween(k.getChildByName("video_img").getChildByName("btn_video_load"))).to({alpha: 1}, 500).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec()
        }).start(), a.mainRenderer.renderManager.animationTweenInc(),
            (new TWEEN.Tween(k.getChildByName("video_img").getChildByName("btn_video_load"))).to({rotation: 6 * Math.PI}, 3E3).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.gameConfig.needHls ? y.setZIndex(!0) : a.gameConfig.needRtc && rtcVideo.playFirst();
                k.getChildByName("volume_sign").visible = !0;
                k.getChildByName("btn_video_close").visible = !0;
                k.getChildByName("btn_video").visible = !0;
                k.getChildByName("video_img").getChildByName("btn_video_load").rotation = 0;
                k.getChildByName("video_img").getChildByName("btn_video_load").alpha =
                    0;
                k.getChildByName("video_img").getChildByName("btn_video").visible = !0
            }).start()) : "full" == e && (k.getChildByName("video_img").visible = !1, a.gameConfig.needHls ? y.setFullscreenMode(!0) : a.gameConfig.needRtc && rtcVideo.setFullscreenMode(!0), t.slideWin(!0), t.slideHistoryContainer(!0), N(k, "mainGridContainer", 0, 195, function () {
            k.getChildByName("btn_video").visible = !1;
            k.getChildByName("btn_video_collapse").visible = !0
        })) : y && (k.getChildByName("volume_sign").visible = !1, k.getChildByName("btn_video_close").visible =
            !1, k.getChildByName("btn_video").visible = !1, k.getChildByName("btn_video_collapse").visible = !1, k.getChildByName("video_img").visible = !0, a.gameConfig.needHls ? y.destroy() : a.gameConfig.needRtc && rtcVideo.destroy(), y = null, t.slideWin(!1), t.slideHistoryContainer(!1), N(k, "mainGridContainer", 0, 0, function () {
        }))
    };
    this.switchGridMode = function (a) {
        N(C, "switchGridContainer", 0, a ? 1273 : 0)
    };
    this.getBallColorByCode = function (a) {
        return -1 != fortunaCombinations.btnComb["47"].zones.indexOf(parseInt(a)) ? "red" : -1 != fortunaCombinations.btnComb["48"].zones.indexOf(parseInt(a)) ?
            "black" : "green"
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
    this.defineZonesForBet = function (b, e, d, f, c) {
        if (36 >= b.name) if (void 0 != d) D(a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name), D(a.mainGrid.uiSectorsContainer.getChildByName(b.name +
            "innerZone"), b.name + "sector"), J(a.mainGrid.uiSectorsContainer.getChildByName(b.name), f), J(a.mainGrid.uiGridContainer.getChildByName(b.name), f); else {
            B(a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name);
            var g = a.mainGrid.sectorCombinations[b.name] ? a.mainGrid.sectorCombinations[b.name] : a.mainGrid.sectorButtonCombinations[b.name].zones;
            for (b = 0; b < g.length; b++) B(a.mainGrid.uiSectorsContainer.getChildByName(g[b] + "innerZone"), g[b] + "sector")
        } else {
            if (48 >= b.name) g = a.mainGrid.buttonCombinations[b.name].zones,
                void 0 != d ? D(40 <= b.name ? a.mainGrid.uiButtonsContainer.getChildByName(b.name + "innerZone") : a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name) : B(40 <= b.name ? a.mainGrid.uiButtonsContainer.getChildByName(b.name + "innerZone") : a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name); else if (52 >= b.name) for (g = a.mainGrid.sectorButtonCombinations[b.name].zones, e = a.mainGrid.sectorButtonCombinations[b.name].zonesToHighlight, b = 0; b < e.length; b++) B(a.mainGrid.uiSectorsContainer.getChildByName(e[b] +
                "innerZone"), e[b] + "sector"); else 250 > b.name && (g = a.mainGrid.combinations[b.name - 100]);
            for (b = 0; b < g.length; b++) void 0 != d ? (D(a.mainGrid.uiGridContainer.getChildByName(g[b] + "innerZone"), g[b]), D(a.mainGrid.uiSectorsContainer.getChildByName(g[b] + "innerZone"), g[b] + "sector"), J(a.mainGrid.uiSectorsContainer.getChildByName(g[b]), f, c), J(a.mainGrid.uiGridContainer.getChildByName(g[b]), f, c)) : (B(a.mainGrid.uiGridContainer.getChildByName(g[b] + "innerZone"), g[b]), B(a.mainGrid.uiSectorsContainer.getChildByName(g[b] +
                "innerZone"), g[b] + "sector"))
        }
    };
    var J = function (b, e, d) {
        d = void 0 != d ? d : !0;
        if (b.getChildByName("possibleWinInfo")) b.getChildByName("possibleWinText").text = e + parseFloat(b.getChildByName("possibleWinText").text), b.getChildByName("possibleWinText").text = +parseFloat(b.getChildByName("possibleWinText").text).toFixed(10), b.getChildByName("possibleWinText").visible = 0 < parseFloat(b.getChildByName("possibleWinText").text) && d, b.getChildByName("possibleWinInfo").visible = 0 < parseFloat(b.getChildByName("possibleWinText").text) &&
            d; else if (!(0 > parseFloat(e))) for (d = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.possible_win_bg.texture), e = new PIXI.Text(+e.toFixed(10), {
            font: "19px Arial",
            fill: "#bdbdbd"
        }), e.name = "possibleWinText", d.name = "possibleWinInfo", b.addChildAt(e, b.children.length), b.addChildAt(d, b.children.length - 1), d = 0; d < b.children.length; d++) if ("possibleWinInfo" == b.children[d].name || "possibleWinText" == b.children[d].name) b.children[d].anchor.x = .5, b.children[d].anchor.y = .5, e = "possibleWinText" == b.children[d].name ?
            "uiSectorsContainer" == b.parent.name ? Math.ceil(b.height - b.children[d].height / 4) - 3 : Math.ceil(b.height - b.children[d].height / 2) - 6 : "uiSectorsContainer" == b.parent.name ? Math.ceil(b.height - b.children[d].height / 4) : Math.ceil(b.height - b.children[d].height / 2) - 3, b.children[d].position.y = e, b.children[d].position.x = b.width / 2
    };
    this.showPossibleWin = J;
    this.setInteraction = function (b) {
        a.mainGrid.setZoneInteraction(b);
        t.setChipsInteraction(b);
        t.setBtnControlsInteraction(b);
        K.setInteraction(b);
        C.getChildByName("table_disable_main").visible =
            !b;
        C.getChildByName("table_disable_sectors").visible = !b;
        H.getChildByName("table_disable_footer").visible = !b;
        for (var e = 0; 36 >= e; e++) a.mainGrid.uiGridContainer.getChildByName("textZone" + e).children[0].style = b ? {
            font: "52px Avenir Next Demi",
            fill: "#ffffff",
            align: "center"
        } : {
            font: "52px Avenir Next Demi",
            fill: "#6b7579",
            align: "center"
        }, a.mainGrid.uiSectorsContainer.getChildByName("textZone" + e).children[0].style = b ? {
            font: "42px Avenir Next Demi",
            fill: "#ffffff",
            align: "center"
        } : {
            font: "42px Avenir Next Demi", fill: "#6b7579",
            align: "center"
        };
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.setTextScale = function (a) {
        switch (a.text.length) {
            case 5:
                a.scale.set(.5, .5);
                break;
            case 4:
                a.scale.set(.6, .6);
                break;
            case 3:
                "MAX" == a.text ? a.scale.set(.65, .65) : a.scale.set(.75, .75);
                break;
            default:
                a.scale.set(1, 1)
        }
    };
    this.setTextHeaderScale = function (a) {
        12 < a.text.length ? a.scale.set(.65, .65) : 9 < a.text.length ? a.scale.set(.75, .75) : a.scale.set(1, 1)
    };
    this.getFortuneObjectsByGrid = function () {
        var b = [], e;
        for (e in a.mainGrid.pressedZones) b.push({
            comb: parseInt(a.mainGrid.pressedZones[e].zone.name),
            coef: parseFloat(a.mainUIManager.defineCoefForBet(a.mainGrid.pressedZones[e].zone)),
            summ: a.mainGrid.pressedZones[e].bet,
            spread: {
                sectors: Object.assign({}, a.mainGrid.pressedZones[e].spread.sectors),
                main: a.mainGrid.pressedZones[e].spread.main
            }
        });
        return b
    };
    this.getTotalSumByGrid = function () {
        var b = 0, e;
        for (e in a.mainGrid.pressedZones) b += parseFloat(a.mainGrid.pressedZones[e].bet).toFixed(10);
        return b
    };
    this.isAllowBet = function (b, e, d) {
        return parseFloat(e).toFixed(10) > I(b.comb) ? (d ? (d.betErrorCount++, d.betErrorFunc ||
        (d.betErrorFunc = function () {
            a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet)
        })) : a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet), !1) : w.getTotalSumByGrid() + parseFloat(b.summ).toFixed(10) > clientInfoGlobal.cfstolmax / 100 ? (a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBetGame), !1) : !0
    };
    var ca = 0, da = 0, O, P = function (b) {
        function e(a) {
            t.timerDOM.find("span.timerSec").each(function () {
                $(this)[0].textContent !== M.getTimerText() && ($(this)[0].childNodes[0].nodeValue =
                    M.getTimerText())
            });
            O = 1920 * (1 - a);
            t.timerDOM.find("div#timerRow").css({
                "clip-path": "inset(0px " + O + "px 0px 0px)",
                "-webkit-clip-path": "inset(0px " + O + "px 0px 0px)"
            })
        }

        function d(b) {
            a.mainGameManager && ($("#" + a.gameConfig.canvasId + " div#timerContainer span.timerDesc").each(function () {
                $(this).text(mainLocalizationTable.placeBets)
            }), $("#" + a.gameConfig.canvasId + " div#timerContainer div#timerRow").css({
                visibility: "visible",
                "background-color": "#4da362"
            }), a.mainFLGAccount.setWinTextVisible(!0), a.mainGrid.removeCurrentBets(),
                a.mainFLGAccount.totalBet(0), A.selectGridByStates(), a.mainUIManager.setInteraction(!0), G.addEdition(b.tir + 1), M.start({
                minutes: 0,
                seconds: b.time_round - 13 - b.t2
            }, {minutes: 0, seconds: b.time_round - 13}, e, function () {
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
                G.getActedOutEdition().betsHistory.addBet({
                    fortuneBetObjArr: a.mainUIManager.getFortuneObjectsByGrid(),
                    winBet: void 0,
                    win: void 0,
                    code: void 0
                }, G.getActedOutEdition().round, function (b) {
                    b || (a.mainGrid.removeCurrentBets(), a.mainFLGAccount.totalBet(0))
                });
                A.clearGridStates()
            }, 3, P))
        }

        function f() {
            function b() {
                a.mainGameManager && (a.mainGameManager.gameStateAsync(c), a.mainRenderer.renderManager.needUpdateRender =
                    !0)
            }

            function c(c) {
                a.mainGameManager && (99 != c.ball ? a.mainFLGAccount && (console.log("animateresult"), a.mainGrid.switchHover(!0), a.mainFLGAccount.calculateWin(G.getActedOutEdition().betsHistory.bets, a.gameConfig.appName, function (b) {
                    var d = 0 <= c.t2 ? 17E3 : -17 > c.t2 ? 0 : 1E3 * (21 + c.t2) - 4E3;
                    b && b.length && (d = 2E3);
                    a.gameConfig.offset4Result && (d += a.gameConfig.offset4Result);
                    setTimeout(function () {
                        a.mainGrid.showWinZone(parseInt(c.ball), function (b) {
                            var d = b.getChildByName("zone_win_chip");
                            d || (d = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.zone_win_chip.texture),
                                d.name = "zone_win_chip", "uiSectorsContainer" == b.parent.name || 0 == c.ball ? d.scale.set(.8, .8) : d.scale.set(1, 1), d.anchor.set(.5, .5), d.alpha = 0, b.addChildAt(d, 0), d.rotation = 0, b.getChildByName("textwinZone").style = {
                                font: "uiSectorsContainer" == b.parent.name ? "48px Avenir Next Demi" : "58px Avenir Next Demi",
                                fill: "#ffffff",
                                align: "center"
                            });
                            d.position.set(b.width / 2, b.height / 2);
                            b.getChildByName("smallChip") && (b.getChildByName("smallChipText").visible = !1, b.getChildByName("smallChip").visible = !1);
                            a.mainRenderer.renderManager.animationTweenInc();
                            (new TWEEN.Tween(d)).to({alpha: 1}, 500).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec()
                            }).start();
                            a.mainGrid[b.parent.name].getChildByName("textZone" + c.ball).visible = !1;
                            b.getChildByName("textwinZone").visible = !0;
                            a.mainRenderer.renderManager.animationTweenInc();
                            (new TWEEN.Tween(d)).to({rotation: 2 * Math.PI}, 9E3).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec();
                                d.rotation = 0
                            }).start();
                            setTimeout(function () {
                                b.getChildByName("possibleWinInfo") &&
                                (console.log(b.parent.name), b.getChildByName("possibleWinInfo").visible = !1, b.getChildByName("possibleWinText").visible = !1);
                                a.mainRenderer.renderManager.animationTweenInc();
                                (new TWEEN.Tween(d)).to({alpha: 0}, 500).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                    a.mainRenderer.renderManager.animationTweenDec()
                                }).start();
                                b.getChildByName("textwinZone").visible = !1;
                                a.mainGrid[b.parent.name].getChildByName("textZone" + c.ball).visible = !0;
                                a.mainRenderer.renderManager.animationTweenInc();
                                (new TWEEN.Tween(d)).to({rotation: 0},
                                    500).onComplete(function () {
                                    a.mainRenderer.renderManager.animationTweenDec();
                                    b.visible = !1;
                                    d = null
                                }).start()
                            }, 8500)
                        }, 9E3);
                        if (b && b.length) {
                            for (var d = [], e = 0; e < b.length; e++) d.push({
                                comb: parseInt(b[e].nm),
                                coef: parseFloat(b[e].cf).toFixed(10) / 100,
                                summ: parseFloat(b[e].sm).toFixed(10) / 100,
                                winBet: c.ball
                            });
                            A.showWinCombinations(d);
                            d = null
                        }
                        G.drawEditionHistory(c);
                        $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerBlack").each(function () {
                            $(this).css("visibility", "visible")
                        });
                        $("#" + a.gameConfig.canvasId +
                            " div#timerContainer div#timerRow").css("visibility", "hidden");
                        $("#" + a.gameConfig.canvasId + " div#timerContainer span.timerDesc").each(function () {
                            $(this).text(c.ball + " " + a.mainGrid.getColorByCombCode(c.ball))
                        });
                        ca = setTimeout(P, 9E3);
                        a.mainFLGAccount.winToBalanceAnimation(9E3, 2E3, {
                            x: 4E3,
                            y: 2E3
                        }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                            font: "72px Arial Narrow",
                            fill: "#e0c59d",
                            align: "customize",
                            posY: 45
                        }, void 0, {font: "44px Arial Narrow", fill: "#be9e6f"});
                        t.setWinVisibility(!0, 0);
                        setTimeout(function () {
                            t.setWinVisibility(!1);
                            a.mainGrid.removeCurrentBets();
                            a.mainFLGAccount.totalBet(0)
                        }, 8E3)
                    }, d)
                }, a.gameConfig), G.cancelLastEdition([c.ball]), a.mainRenderer.renderManager.needUpdateRender = !0) : da = setTimeout(b, 500))
            }

            a.mainGameManager && ($("#" + a.gameConfig.canvasId + " div#timerContainer div#timerRow").css({
                animation: "",
                opacity: 1,
                "background-color": "#c0372d"
            }), a.mainUIManager.setInteraction(!1), a.mainFLGAccount.setWinTextVisible(!1), b())
        }

        function c(a) {
            0 >= a.t2 ? f() : d(a)
        }

        void 0 != a.mainGameManager && (b ? c(b) : a.mainGameManager.gameStateAsync(c))
    }
}
;
