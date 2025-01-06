registrationAppOnPlatform({
    category: "casino",
    catalog: "Roulette_1.5_min",
    image: "games/Roulette/resources/icons/Roulette.png",
    imageBack: "games/Roulette/resources/icons/Roulette-back.png",
    caption: "Fortuna 1.5 min",
    runConfig: "Roulette",
    gameType: "red",
    playInDemo: !1,
    gameBG: "images/games-bg/game-bg-red.jpg"
});
var configsRoulette = {
    red: {
        serverName: "srv67",
        serverNum: "s67",
        tirTime: 83,
        appName: "bets_67",
        resources: "",
        srvParams: function () {
            return clientInfoGlobal.srv13
        },
        gridTextStyle: {font: "85px Baltica", fill: "#8b0005", align: "center"},
        balls: {xPos: 1660, yPos: 119, textStyle: {font: "120px Arial Bold", fill: "#ffffff", align: "center"}},
        videoURL: "rtmp://w1.flg10.bet:1935/fortuna-fast-live&amp;Video0=stream3:180&amp",
        videoMobileURL: "https://w1.flg10.bet/Fortuna_2min/_definst_/myStream/playlist.m3u8",
        videoPos: {x: 150, y: 82},
        videoSize: {
            w: 433,
            h: 280
        },
        videoBorderPaddings: 22.5,
        canvasId: "",
        runconfig: "Roulette",
        gameType: "Red",
        gameKind: "Roulette",
        gameVariant: "",
        betSeparator: "_",
        winShowTime: 7E3,
        caption: "Fortuna 1.5 min",
        rTime: 21
    }, green: {
        serverName: "srv39",
        serverNum: "s39",
        tirTime: 83,
        appName: "bets_39",
        resources: "",
        srvParams: function () {
            return clientInfoGlobal.srv13
        },
        gridTextStyle: {font: "85px Baltica", fill: "#8b0005", align: "center"},
        balls: {xPos: 1660, yPos: 119, textStyle: {font: "120px Arial Bold", fill: "#ffffff", align: "center"}},
        videoURL: "rtmp://w1.flg10.bet:1935/loto37&amp;&Video0=myStream&amp;",
        videoMobileURL: "",
        videoPos: {x: 150, y: 76},
        videoSize: {w: 373, h: 286},
        videoBorderPaddings: 24.5,
        canvasId: "",
        runconfig: "Roulette",
        gameType: "Green",
        gameKind: "Roulette",
        gameVariant: "",
        betSeparator: "_",
        winShowTime: 7E3,
        caption: "Lotto 37",
        rTime: 20
    }
}, RouletteObjectsArr = {red: void 0, green: void 0};

function emitEventRoulette(a, f) {
    void 0 != RouletteObjectsArr.red && RouletteObjectsArr.red.mainRenderer.stage.emit(a, f);
    void 0 != RouletteObjectsArr.green && RouletteObjectsArr.green.mainRenderer.stage.emit(a, f)
}

function removeRouletteObject(a, f) {
    if (void 0 != RouletteObjectsArr[f]) {
        RouletteObjectsArr[f].destroy();
        for (var u in RouletteObjectsArr[f]) RouletteObjectsArr[f][u] = null;
        RouletteObjectsArr[f] = null
    }
    $("#" + a + " canvas").remove();
    $("#" + a + " div").remove()
}

function initRouletteObject(a, f) {
    switch (f) {
        case "red":
            configsRoulette.red.canvasId = a;
            RouletteObjectsArr.red = new RouletteApp(configsRoulette.red);
            break;
        case "green":
            configsRoulette.green.canvasId = a, RouletteObjectsArr.green = new RouletteApp(configsRoulette.green)
    }
}

function refreshRouletteObject(a, f) {
    removeRouletteObject(a, f.toLowerCase());
    initRouletteObject(a, f.toLowerCase())
}

function RouletteApp(a) {
    this.destroy = function () {
        n.destroy();
        n = null;
        t.destroy();
        t = null;
        A.destroy();
        A = null;
        q.destroy();
        q = null;
        u.destroy();
        u = null;
        f.mainSoundManager.destroy();
        for (var a in f) f[a] = null;
        f = null
    };
    var f = this;
    this.gameDir = "games/Roulette/resources/";
    this.gameConfig = a;
    var u = new FLGRenderer(1920, 1080, a.canvasId, "center");
    this.mainRenderer = u;
    this.mainSoundManager = new SoundManager(f.gameConfig.gameKind, f.gameConfig.gameType, f.gameConfig.gameVariant);
    var A = new FLGAccount(null, f.mainSoundManager,
        f.mainRenderer);
    this.mainFLGAccount = A;
    var q = new gameManagerRoulette(this);
    this.mainGameManager = q;
    var n = new UIManagerRoulette(this);
    this.mainUIManager = n;
    var t = new FortuneGrid(284, 470, 12, 3, void 0, u);
    this.mainGrid = t
}

function gameManagerRoulette(a) {
    this.destroy = function () {
        q = A = u = null;
        for (var a in f) f[a] = null;
        f = null
    };
    var f = this, u = {};
    this.gameStateAsync = function (a) {
        A(a)
    };
    var A = function (f) {
        $.ajax({
            type: "get",
            url: getUrl(),
            data: {oper: "getgameinfo", id_srv: a.gameConfig.serverName.slice(3, a.gameConfig.serverName.length)},
            dataType: "json",
            success: function (t, n, q) {
                try {
                    u = t, f && f(u)
                } catch (w) {
                    a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
                }
            },
            error: function (f, n, q) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError,
                    redirectToRootURL, "critical")
            }
        })
    }, q = {};
    this.gameHistory = function (n) {
        n && $.ajax({
            type: "get",
            url: getUrl(),
            data: {oper: "getgameinfo", id_srv: a.gameConfig.serverName.slice(3, a.gameConfig.serverName.length)},
            dataType: "json",
            success: function (t, u, A) {
                try {
                    f && t && t.history && (q = t.history, q != {} && n(q))
                } catch (w) {
                    a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
                }
            },
            error: function (f, n, q) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
            }
        })
    }
}

function UIManagerRoulette(a) {
    function f(b) {
        this.destroy = function () {
            for (var a = 0; a < c.length; a++) {
                for (var G in c[a]) c.length - 1 == a && c[a][G].summ && b.mainFLGAccount.totalBet(-c[a][G].summ), c[a][G] = null;
                c[a] = null
            }
            h = d = c = null;
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
            c && localStorage.setItem("gridStates" + a.gameConfig.gameKind +
                a.gameConfig.gameType, JSON.stringify(c));
            d && localStorage.setItem("lastRoundGridState" + a.gameConfig.gameKind + a.gameConfig.gameType, JSON.stringify(d))
        };
        this.loadGridStateFromStorage = function () {
            if (localStorage.getItem("curUser")) {
                var b = JSON.parse(localStorage.getItem("curUser"));
                if (b.hall != clientInfoGlobal.hall && b.nick != clientInfoGlobal.nick) return
            }
            localStorage.getItem("gridStates" + a.gameConfig.gameKind + a.gameConfig.gameType) && (c = JSON.parse(localStorage.getItem("gridStates" + a.gameConfig.gameKind + a.gameConfig.gameType)));
            localStorage.getItem("lastRoundGridState" + a.gameConfig.gameKind + a.gameConfig.gameType) && (d = JSON.parse(localStorage.getItem("lastRoundGridState" + a.gameConfig.gameKind + a.gameConfig.gameType)))
        };
        this.addGridState = function () {
            var a = b.mainUIManager.getFortuneObjectsByGrid();
            if (!c.length || a.length || c[c.length - 1].length) c.push(a), e.saveGridStateInStorage()
        };
        this.doubleCurrentBets = function () {
            var c = {betErrorCount: 0, betErrorFunc: null}, d = 0, g;
            for (g in a.mainGrid.pressedZones) if (d++, a.mainUIManager.isAllowBet({
                comb: parseInt(g),
                coef: void 0, summ: a.mainGrid.pressedZones[g].bet
            }, 2 * a.mainGrid.pressedZones[g].bet, c)) {
                if (-1 == a.mainFLGAccount.totalBet(parseFloat(a.mainGrid.pressedZones[g].bet))) return;
                a.mainUIManager.defineZonesForBet(a.mainGrid.pressedZones[g].zone, .35, J, parseFloat(a.mainGrid.pressedZones[g].bet).toFixed(10) * parseFloat(a.mainGrid.pressedZones[g].coef).toFixed(10));
                a.mainGrid.pressedZones[g].bet *= 2;
                b.mainUIManager.createSmallChip(a.mainGrid.pressedZones[g].zone, a.mainGrid.pressedZones[g].bet - parseFloat(a.mainGrid.pressedZones[g].zone.getChildByName("smallChipText").text))
            }
            0 <
            c.betErrorCount && c.betErrorFunc();
            c.betErrorCount != d && e.addGridState();
            c.betErrorCount = null;
            c.betErrorFunc = null
        };
        this.undoGridState = function () {
            c.length && (c.pop(), e.saveGridStateInStorage(), b.mainGrid.removeCurrentBets(), a.mainFLGAccount.totalBet(-a.mainFLGAccount.totalBet()), h())
        };
        this.clearGridStates = function () {
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
        this.repeatLastRoundGridState =
            function () {
                d && d.length && (c.push(d.slice()), e.saveGridStateInStorage(), h())
            };
        this.showWinCombinations = function (a) {
            b.mainGrid.removeCurrentBets();
            h(a, !0)
        };
        var h = function (e, d) {
            var g = e ? e : c[c.length - 1], h = void 0 != d ? d : !1, l = {betErrorCount: 0, betErrorFunc: null};
            g && g.length && (b.mainGrid.pressZonesByObjectArr(g, function (c) {
                if (b.mainUIManager.isAllowBet({
                    comb: parseInt(c.zone.name),
                    coef: void 0,
                    summ: c.bet
                }, b.mainGrid.pressedZones[c.zone.name] ? b.mainGrid.pressedZones[c.zone.name].bet + c.bet : c.bet, l)) {
                    if (e || h) e && e.length &&
                    (parseInt(g[0].winBet) != parseInt(c.zone.name) && b.mainUIManager.createSmallChip(c.zone, c.bet), b.mainGrid.pressedZones[c.zone.name] = {
                        zone: b.mainGrid.uiGridContainer.getChildByName(c.zone.name),
                        bet: c.bet,
                        coef: b.mainUIManager.defineCoefForBet(c.zone)
                    }, b.mainUIManager.defineZonesForBet(c.zone, .35, b.mainUIManager.showPossibleWin, parseFloat(c.bet).toFixed(10) * parseFloat(b.mainGrid.pressedZones[c.zone.name].coef).toFixed(10), !1), b.mainGrid.uiGridContainer.getChildByName(parseFloat(g[0].winBet)).getChildByName("possibleWinText").visible =
                        !0, b.mainGrid.uiGridContainer.getChildByName(parseFloat(g[0].winBet)).getChildByName("possibleWinInfo").visible = !0); else {
                        if (-1 == b.mainFLGAccount.totalBet(parseFloat(c.bet))) return;
                        b.mainUIManager.createSmallChip(c.zone, c.bet);
                        c.zone.selected ? b.mainGrid.pressedZones[c.zone.name].bet = parseFloat(b.mainGrid.uiGridContainer.getChildByName(c.zone.name).getChildByName("smallChipText").text).toFixed(10) : (c.zone.selected = !0, b.mainGrid.pressedZones[c.zone.name] = {
                            zone: b.mainGrid.uiGridContainer.getChildByName(c.zone.name),
                            bet: c.bet, coef: b.mainUIManager.defineCoefForBet(c.zone)
                        });
                        b.mainUIManager.defineZonesForBet(c.zone, .35, b.mainUIManager.showPossibleWin, parseFloat(c.bet).toFixed(10) * parseFloat(b.mainGrid.pressedZones[c.zone.name].coef).toFixed(10))
                    }
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }), b.mainGrid.zonesOut(v), 0 < l.betErrorCount && l.betErrorFunc(), l.betErrorCount = null, l = l.betErrorFunc = null)
        };
        this.selectGridByStates = h;
        e.loadGridStateFromStorage()
    }

    function u(b) {
        this.destroy = function () {
            c.destroy();
            G = l = h = g =
                d = c = null;
            for (var a = 0; a < m.length; a++) {
                for (var b in m[a]) m[a][b] = null;
                m[a] = null
            }
            k = f = m = null;
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
        var h = function (c) {
            g.data = c.data;
            g.dragging = !0;
            c = g.data.getLocalPosition(g.parent);
            g.position.x = c.x;
            g.position.y = c.y;
            g.visible = !0;
            b.mainGrid.gridContainer.down = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, l = function () {
            g.dragging = !1;
            g.data = null;
            g.visible = !1;
            b.mainGrid.gridContainer.down = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, G = function () {
            if (g.dragging) {
                var b = g.data.getLocalPosition(g.parent);
                g.position.x = b.x;
                g.position.y = b.y
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        d.on("mousedown", h).on("touchstart", h).on("mousemove", G).on("touchmove", G).on("mouseup",
            l).on("touchend", l).on("mouseupoutside", l).on("touchendoutside", l);
        b.mainRenderer.stage.addChildAt(d, 0);
        var g = b.mainRenderer.createButton(d, 0, 0, void 0, void 0);
        g.anchor.set(.5, .5);
        g.visible = !1;
        this.addDragSprite = function () {
            b.mainRenderer.stage.addChild(g)
        };
        this.setInteraction = function (b) {
            d.interactive = b;
            g.visible = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        var m = [], f = {};
        this.currentMode = function () {
            return f
        };
        var k = function (c) {
            f = c;
            g.texture = b.mainRenderer.resourceLoader.resources[f.modeSprite.name].texture;
            g.width = g.texture.width;
            g.height = g.texture.height;
            g.scale.set(.8, .8);
            c = g.getChildByName("modeDragSpriteText");
            f.modeSprite.children[0] ? (c ? (c.text = f.modeSprite.children[0].text, c.visible = !0) : (c = new PIXI.Text(f.modeSprite.children[0].text, f.modeSprite.children[0].style), c.style.align = "center", c.name = "modeDragSpriteText", g.addChild(c)), c.anchor.set(f.modeSprite.children[0].anchor.x, f.modeSprite.children[0].anchor.y), c.scale.set(f.modeSprite.children[0].scale.x, f.modeSprite.children[0].scale.y)) : c && (c.visible =
                !1);
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        this.setMode = function (a) {
            if (a && a.modeName != f.modeName) {
                for (var b = 0; b < m.length; b++) if (a.modeName == m[b].modeName) {
                    k(m[b]);
                    return
                }
                m.push(a);
                k(m[m.length - 1])
            }
        }
    }

    function A(b) {
        this.destroy = function () {
            for (var a = 0; a < c.length; a++) c[a].round = null, c[a].editionResult = null, c[a].betsHistory.destroy && c[a].betsHistory.destroy(), c[a] = null;
            n = k = m = g = l = h = d = c = null;
            for (a in e) e[a] = null;
            e = null
        };
        var e = this, c = [], d;
        this.editions = c;
        var h, l;
        this.historyTable = function () {
            return l
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
            0 > b || b >= c.length || (d = b, void 0 != h && (h.getChildByName("text" + h.name).text = c[d].round), l && 0 < l.children.length && n(), a.mainRenderer.renderManager.needUpdateRender = !0)
        };
        g(c.length -
            1);
        this.drawEditions = function () {
            h = a.mainRenderer.createButton(void 0, 1347, 100, void 0, {
                text: c[d].round,
                align: "center",
                style: {font: "bold 36px Myriad Pro", fill: "#b9b8b8"}
            });
            l = new PIXI.Container;
            a.mainRenderer.stage.addChild(l);
            m();
            n()
        };
        var m = function () {
        };
        this.redrawEditionHeader = m;
        new PIXI.Container;
        var k = function () {
        };
        this.drawBetsHeader = k;
        var n = function () {
            function b(b, c) {
                -1 != fortunaCombinations.btnComb["47"].zones.indexOf(parseInt(b.children[0].text)) ? (b.texture = a.mainRenderer.resourceLoader.resources.history_R.texture,
                c && (b.position.y = 33)) : -1 != fortunaCombinations.btnComb["48"].zones.indexOf(parseInt(b.children[0].text)) ? (b.texture = a.mainRenderer.resourceLoader.resources.history_B.texture, c && (b.position.y = 22)) : (b.texture = a.mainRenderer.resourceLoader.resources.history_G.texture, c && (b.position.y = 27.5))
            }

            var g, e = l.getChildByName("history_bg");
            if (e) for (g = 21; 0 <= g; g--) {
                var d = e.getChildByName(parseInt(g + 1) + "");
                d.children[0].text = c[g].editionResult[0];
                b(d, 21 != g);
                var h = e.getChildByName("Round" + parseInt(g + 1));
                h.text = c[g].round
            } else {
                e =
                    a.mainRenderer.createButton(l, a.mainRenderer.canvasSize.width / 2, 1002, "history_bg", void 0, function (a, b) {
                        b.stopped = !0
                    });
                e.position.x -= e.width / 2;
                g = new PIXI.Graphics;
                g.beginFill(16777215, 0);
                g.drawRect(0, 0, 101, 165);
                g.endFill();
                var f = new PIXI.Sprite(g.generateTexture(!1));
                f.on("mousedown", function () {
                    setTimeout(function () {
                        f.isDown ? (f.parent.position.y += 91, f.children[0].texture = a.mainRenderer.resourceLoader.resources.history_up.texture, f.isDown = !1) : (f.parent.position.y -= 91, f.children[0].texture = a.mainRenderer.resourceLoader.resources.history_down.texture,
                            f.isDown = !0);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }, 20)
                }).on("touchstart", function () {
                    setTimeout(function () {
                        f.isDown ? (f.parent.position.y += 91, f.children[0].texture = a.mainRenderer.resourceLoader.resources.history_up.texture, f.isDown = !1) : (f.parent.position.y -= 91, f.children[0].texture = a.mainRenderer.resourceLoader.resources.history_down.texture, f.isDown = !0);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }, 20)
                });
                f.position.set(969, 5);
                f.interactive = !0;
                a.mainRenderer.createButton(f, 50.5, 31, "history_up").anchor.set(.5,
                    .5);
                e.addChild(f);
                var m = 25;
                d = a.mainRenderer.createButton(e, m, 22, "history_R", {
                    text: c[22].editionResult[0] ? c[22].editionResult[0] : "",
                    align: "center",
                    style: {font: "bold 32px Myriad Pro", fill: "#ffffff", align: "center"}
                });
                h = new PIXI.Text(c[22].round, {font: "bold 23px Arial", fill: "#ffffff", align: "center"});
                h.anchor.set(.5, .5);
                h.rotation = 3 * Math.PI / 2;
                h.position.set(m + d.width / 2, 122);
                h.name = "Round22";
                e.addChild(h);
                b(d);
                d.getChildByName("text" + d.name).anchor.y = .455;
                d.name = "22";
                m += 28 + d.width;
                for (g = 21; 11 < g; g--) d =
                    a.mainRenderer.createButton(e, m, 22, "history_R", {
                        text: c[g].editionResult[0],
                        align: "center",
                        style: {font: "bold 32px Myriad Pro", fill: "#ffffff", align: "center"}
                    }), d.getChildByName("text" + d.name).anchor.y = .455, d.scale.set(.75, .75), b(d, !0), h = new PIXI.Text(c[g].round, {
                    font: "20px Arial",
                    fill: "#878787",
                    align: "center"
                }), h.anchor.set(.5, .5), h.rotation = 3 * Math.PI / 2, h.position.set(m + d.width / 2, 118), h.name = "Round" + g, e.addChild(h), d.name = g + "", m += 4 + d.width;
                m += 40;
                for (g = 11; 1 < g; g--) d = a.mainRenderer.createButton(e, m, 22,
                    "history_R", {
                        text: c[g].editionResult[0],
                        align: "center",
                        style: {font: "bold 32px Myriad Pro", fill: "#ffffff", align: "center"}
                    }), d.getChildByName("text" + d.name).anchor.y = .455, d.scale.set(.75, .75), b(d, !0), h = new PIXI.Text(c[g].round, {
                    font: "20px Arial",
                    fill: "#878787",
                    align: "center"
                }), h.anchor.set(.5, .5), h.rotation = 3 * Math.PI / 2, h.position.set(m + d.width / 2, 118), h.name = "Round" + g, e.addChild(h), d.name = g + "", m += 4 + d.width;
                m += 40;
                d = a.mainRenderer.createButton(e, m, 22, "history_R", {
                    text: c[1].editionResult[0], align: "center",
                    style: {font: "bold 32px Myriad Pro", fill: "#ffffff", align: "center"}
                });
                d.getChildByName("text" + d.name).anchor.y = .455;
                d.scale.set(.75, .75);
                b(d, !0);
                h = new PIXI.Text(c[g].round, {font: "20px Arial", fill: "#878787", align: "center"});
                h.anchor.set(.5, .5);
                h.rotation = 3 * Math.PI / 2;
                h.position.set(m + d.width / 2, 118);
                h.name = "Round" + g;
                e.addChild(h);
                d.name = g + ""
            }
            e = d = h = null
        };
        this.cancelLastEdition = function (a) {
            c[c.length - 1].editionResult = a;
            c[c.length - 1].betsHistory.setRoundResult(a);
            g(c.length - 1)
        };
        this.addEdition = function (a) {
            c[0].betsHistory.destroy &&
            c[0].betsHistory.destroy();
            c[0].betsHistory = null;
            c.shift();
            c.push({round: a, editionResult: void 0, betsHistory: new q([])});
            g(c.length - 1)
        }
    }

    function q(b) {
        this.destroy = function () {
            for (var a = 0; a < c.length; a++) {
                for (var b = 0; b < c[a].fortuneBetObjArr.length; b++) c[a].fortuneBetObjArr[b].comb = null, c[a].fortuneBetObjArr[b].coef = null, c[a].fortuneBetObjArr[b].summ = null, c[a].fortuneBetObjArr[b] = null;
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
        this.addBet = function (b, d, e) {
            a.mainFLGAccount.placeFortuneBet(b, d, a.gameConfig, function (g) {
                void 0 == g || 500 <= c.length || -1 == g ? e && e(!1) : (c.push({
                    fortuneBetObjArr: b.fortuneBetObjArr.slice(),
                    winBet: b.winBet,
                    win: b.win,
                    code: g
                }), e && e(!0), a.mainRenderer.renderManager.needUpdateRender = !0)
            })
        };
        this.setRoundResult = function (a) {
            for (var b = 0; b < c.length; b++) c[b].winBet =
                a
        }
    }

    this.destroy = function () {
        clearTimeout(T);
        clearTimeout(U);
        z = null;
        w.destroy();
        w = null;
        L.destroy();
        H = M = B = N = L = null;
        R.destroy();
        t = V = F = r = S = p = R = null;
        for (var b = 0; b < x.length; b++) x[b].round = null, x[b].editionResult = null, x[b].betsHistory.destroy && x[b].betsHistory.destroy(), x[b].betsHistory = null, x[b] = null;
        W = x = null;
        for (b in k) k[b] = null;
        O = P = v = C = I = k = null;
        a.mainRenderer.stage.off("changeLang", Q);
        Q = null;
        D.destroy();
        D = null;
        y.destroy();
        y = null;
        E.destroy();
        E = null;
        for (b in n) n[b] = null;
        n = null
    };
    for (var n = this, t = function (a) {
        a =
            parseInt(a);
        if ("DEMO" == parseInt(clientInfoGlobal.hall)) return 1;
        if (36 >= a) return parseInt(clientInfoGlobal.cf36max) / 100;
        if (42 >= a) return parseInt(clientInfoGlobal.cf3max) / 100;
        if (48 >= a) return parseInt(clientInfoGlobal.cf2max) / 100;
        if (135 >= a || 172 <= a && 195 >= a) return parseInt(clientInfoGlobal.cf18max) / 100;
        if (136 == a || 137 == a || 196 <= a && 207 >= a) return parseInt(clientInfoGlobal.cf12max) / 100;
        if (-1 != [141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171].indexOf(a)) return parseInt(clientInfoGlobal.cf6max) / 100;
        if (250 > a) return parseInt(clientInfoGlobal.cf9max) /
            100
    }, z = clientInfoGlobal.coin6.split("-"), K = 0; K < z.length; K++) z[K] /= 100;
    z.push("MAX");
    var w = new betsControls(z[0], z[z.length - 1], z[1], z, function (b) {
        b = t(b.comb) - b.curSumm;
        a.mainFLGAccount.balance() < b && (b = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return b
    });
    this.betsControls = w;
    var L = new FLGTimer, N, B, M, H,
        R = new FLGVideo(a.gameConfig.videoPos.x, a.gameConfig.videoPos.y, a.gameConfig.videoSize.w, a.gameConfig.videoSize.h, a.gameConfig.canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" allowfullscreen="true" wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=0&amp;URL=' +
            a.gameConfig.videoURL + '"> <param name="allowFullScreen" value="true"> <param name="movie" value="videoplayer.swf"></object>', '<video id="innerVideo' + a.gameConfig.canvasId + '" autoplay muted playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + a.gameConfig.videoMobileURL + '" type="application/x-mpegURL"></video>', {
            borderURL: a.gameDir + "video-frame-" + a.gameConfig.gameType + ".png",
            videoMaxScale: 3,
            paddings: a.gameConfig.videoBorderPaddings
        }, a.mainSoundManager, !isMobile.any), p = new PIXI.Container,
        S = new PIXI.Container, r = new PIXI.Container, F, D, y;
    this.betManager = function () {
        return y
    };
    var E, V = function (a) {
            var b = [];
            if (!a) return b;
            for (var c in a) 0 != a[c].code ? b.push({
                fortuneBetObjArr: [{
                    comb: a[c].e1,
                    coef: a[c].koef,
                    summ: a[c].bet / 100
                }], win: a[c].win / 100, code: a[c].code
            }) : b[b.length - 1].fortuneBetObjArr.push({comb: a[c].e1, coef: a[c].koef, summ: a[c].bet / 100});
            return b
        }, x = [], W = function (b, e) {
            function c(a) {
                var b = [];
                a = a.ball;
                99 != a && b.push(a);
                return b
            }

            a.mainGameManager.gameHistory(function (a) {
                for (var d = 21; 0 <= d; d--) x.push({
                    round: b.tir -
                        1 - d, editionResult: [a[d].ball], betsHistory: new q([])
                });
                x.push({round: b.tir, editionResult: c(b), betsHistory: new q(0 < b.t2 ? V(b.rulbet) : [])});
                D = new A(x);
                D.drawEditions();
                e && e()
            })
        }, k = {}, I = function (b, e) {
            b && (k[e] && (k[e].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), k[e] = (new TWEEN.Tween(b)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                k[e] = null;
                a.mainRenderer.renderManager.animationTweenInc();
                k[e] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    k[e] = null
                }).start()
            }).start())
        }, C = function (b, e, c) {
            if (b) switch (k[e] && (k[e].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), c) {
                case "grow":
                    k[e] = (new TWEEN.Tween(b.scale)).to({
                        x: 1.2,
                        y: 1.2
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        k[e] = null
                    }).start();
                    break;
                default:
                    k[e] =
                        (new TWEEN.Tween(b)).to({alpha: .6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            k[e] = null
                        }).start()
            }
        }, v = function (b, e, c) {
            k[e] && (k[e].stop(), a.mainRenderer.renderManager.animationTweenDec());
            if (b && 0 != b.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(), c) {
                case "grow":
                    k[e] = (new TWEEN.Tween(b.scale)).to({
                        x: 1,
                        y: 1
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        k[e] = null
                    }).start();
                    break;
                default:
                    k[e] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        k[e] = null
                    }).start()
            }
        },
        P = [["BG", a.gameDir + "BG-" + a.gameConfig.gameType + ".jpg"], ["video_frame", a.gameDir + "video-frame-" + a.gameConfig.gameType + ".png"], ["max_min", a.gameDir + "max-min-bg.png"], ["timeline_circle", a.gameDir + "timeline-bg.png"], ["timeline_json", a.gameDir + "timer.json"], ["WIN", a.gameDir + "WinJP/Win-" + a.gameConfig.gameType + "-min.png"], ["table_bg", a.gameDir +
        "table-bg.png"], ["history_bg", a.gameDir + "history-bg.png"], ["history_B", a.gameDir + "history-number-B.png"], ["history_G", a.gameDir + "history-number-G.png"], ["history_R", a.gameDir + "history-number-R.png"], ["history_down", a.gameDir + "history-down.png"], ["history_up", a.gameDir + "history-up.png"], ["mode_selected", a.gameDir + "icons-mode-selected.png"], ["mode_clear", a.gameDir + "icons-mode-clear.png"], ["mode_double", a.gameDir + "icons-mode-double.png"], ["mode_repeat", a.gameDir + "icons-mode-repeat.png"], ["eraser", a.gameDir +
        "eraser1.png"], ["eraser_pressed", a.gameDir + "eraser2.png"], ["chip_selected", a.gameDir + "icons-chip-selected.png"], ["chip_1", a.gameDir + "icons-chip-1.png"], ["chip_2", a.gameDir + "icons-chip-2.png"], ["chip_3", a.gameDir + "icons-chip-3.png"], ["chip_4", a.gameDir + "icons-chip-4.png"], ["chip_5", a.gameDir + "icons-chip-5.png"], ["chip_6", a.gameDir + "icons-chip-6.png"], ["zone_pressed", a.gameDir + "icon-table-pressed-small.png"], ["zone_pressed_big", a.gameDir + "icon-table-pressed-largest.png"], ["zone_pressed_medium", a.gameDir +
        "icon-table-pressed-medium.png"], ["zone_pressed_large", a.gameDir + "icon-table-pressed-large.png"], ["zone_win_chip", a.gameDir + "win-chip.png"], ["possible_win_bg", a.gameDir + "icon-possible-win.png"]];
    P = P.concat(a.mainFLGAccount.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, "images/logo.json", P, function (b, e, c) {
        a.mainRenderer.createButton(void 0, 0, 0, "BG");
        a.mainFLGAccount.drawAccount(0, 0, a.gameConfig);
        E = new u(a);
        a.mainRenderer.createButton(S, 149, 365, "table_bg", void 0, void 0, void 0, void 0,
            void 0, function () {
                a.mainGrid.zonesOut(v)
            });
        b = a.mainRenderer.createButton(p, 182, 927, "mode_clear");
        a.mainRenderer.createButton(b, 0, 0, "mode_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            c.stopped = !0;
            I(b, "mode_clear");
            y.undoGridState();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (a) {
            C(a, "mode_clear")
        }, function (a) {
            v(a, "mode_clear")
        }).alpha = 0;
        b = a.mainRenderer.createButton(p, 1342, 927, "mode_double");
        a.mainRenderer.createButton(b, 0, 0, "mode_selected",
            void 0, function (b, c) {
                a.mainSoundManager.playSound("buttonClick");
                I(b, "mode_double");
                y.doubleCurrentBets();
                c.stopped = !0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                C(a, "mode_double")
            }, function (a) {
                v(a, "mode_double")
            }).alpha = 0;
        b = a.mainRenderer.createButton(p, 1549, 927, "mode_repeat");
        a.mainRenderer.createButton(b, 0, 0, "mode_selected", void 0, function (b, c) {
            a.mainSoundManager.playSound("buttonClick");
            I(b, "mode_repeat");
            c.stopped = !0;
            b.interactive && y.repeatLastRoundGridState();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (a) {
            a.interactive = !1
        }, function (a) {
            a.interactive && C(a, "mode_repeat")
        }, function (a) {
            a.interactive && v(a, "mode_repeat")
        }).alpha = 0;
        b = null;
        H = a.mainRenderer.createButton(p, 504, 960.5, "eraser", void 0, function (b) {
            a.mainSoundManager.playSound("buttonClick");
            E.setMode({modeName: "eraser", modeSprite: b});
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            b.scale.set(1.201, 1.201);
            for (b = 0; b < r.children.length; b++) r.children[b].getChildByName("chip_selected").alpha =
                0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            b.texture != a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture && C(b, b.name, "grow")
        }, function (b) {
            b.texture != a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture && v(b, b.name, "grow")
        });
        H.anchor.set(.5, .5);
        p.addChild(r);
        var d = 629;
        for (b = 0; 6 > b; b++) {
            var h = a.mainRenderer.createButton(r, 0, 0);
            h.name = "parentChip";
            var l = a.mainRenderer.createButton(h, d + 46, 958, "chip_selected", void 0, function (b) {
                a.mainSoundManager.playSound("chipSelector");
                for (var c = 0; c < r.children.length; c++) r.children[c].getChildByName("chip_selected").alpha = 0;
                H.texture = a.mainRenderer.resourceLoader.resources[H.name].texture;
                v(H, H.name, "grow");
                c = b.parent.children[1].getChildByName("text" + b.parent.children[1].name).text;
                E.setMode({modeName: c, modeSprite: b.parent.children[1]});
                b.alpha = 1;
                v(b.parent.children[1], b.parent.children[1].name, "grow");
                w.setBet(c);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (a) {
                1 != a.alpha && C(a.parent.children[1], a.parent.children[1].name,
                    "grow")
            }, function (a) {
                1 != a.alpha && v(a.parent.children[1], a.parent.children[1].name, "grow")
            });
            l.anchor.set(.5, .5);
            l.alpha = 0;
            l = a.mainRenderer.createButton(h, d, 911, "chip_" + (b + 1), {
                text: w.possibleBets[b],
                align: "center",
                style: {font: "bold 40px Myriad Pro", fill: "#444343", align: "center"}
            });
            l.position.set(l.position.x + l.width / 2, l.position.y + l.height / 2);
            l.anchor.set(.5, .5);
            h = l.getChildByName("text" + l.name);
            h.position.set(h.position.x - l.width / 2, h.position.y - l.height / 2);
            h.anchor.y = .555;
            h = null;
            d += 114
        }
        l = l = h = null;
        d = !1;
        for (b = 0; b < r.children.length; b++) a.mainUIManager.setTextScale(r.children[b].children[1].children[0]), h = r.children[b].children[1].getChildByName("text" + r.children[b].children[1].name).text, d || h != w.currentBet() || (E.setMode({
            modeName: h,
            modeSprite: r.children[b].children[1]
        }), r.children[b].getChildByName("chip_selected").alpha = 1, d = !0);
        p.position.y = 60;
        p.alpha = 0;
        a.mainRenderer.stage.addChild(p);
        a.mainRenderer.stage.addChild(S);
        N = a.mainRenderer.createButton(void 0, 1263, 125, "timeline_circle");
        b = [];
        for (var k in e.timeline_json.textures) b.push(e.timeline_json.textures[k]);
        B = new PIXI.extras.MovieClip(b);
        B.loop = !1;
        B.gotoAndStop(B.totalFrames - 1);
        N.addChild(B);
        b = null;
        M = a.mainRenderer.createButton(N, 84, 94, void 0, {
            text: "0",
            align: "center",
            style: {font: "bold 60px Myriad Pro", fill: "#b9b8b8"}
        });
        e = a.mainRenderer.createButton(void 0, 1480, 125, "max_min");
        e.name = "max_min";
        k = parseFloat(clientInfoGlobal.cfstolmin) / 100;
        e.addChild(a.mainRenderer.createButton(e, 161, 55, void 0, {
            text: mainLocalizationTable.minBet + ": " + numberFormat(k, {
                thousands_sep: " ",
                decimals: (k ^ 0) === k ? 0 : 2
            }), align: "center",
            style: {font: "26px Myriad Pro", fill: "#9b9a9a"}
        }));
        k = parseFloat(clientInfoGlobal.cfstolmax) / 100;
        e.addChild(a.mainRenderer.createButton(e, 161, 119, void 0, {
            text: mainLocalizationTable.maxBet + ": " + numberFormat(k, {
                thousands_sep: " ",
                decimals: (k ^ 0) === k ? 0 : 2
            }), align: "center", style: {font: "26px Myriad Pro", fill: "#9b9a9a"}
        }));
        e = null;
        a.mainGrid.createZonesRoulette({w: 110, h: 107}, {w: 110, h: 329}, {
            x: 3,
            y: 3
        }, void 0, void 0, void 0, function (b, c, d) {
            c && (a.mainGrid.zonesOut(v), a.mainUIManager.defineZonesForBet(b, .35));
            c || (a.mainGrid.gridContainer.down =
                !0);
            if (c && a.mainGrid.gridContainer.down || !c && !d || d && (b.name != F || void 0 == F)) if ("eraser" == E.currentMode().modeName) a.mainSoundManager.playSound("clearBet"), a.mainGrid.pressedZones[b.name] && (a.mainFLGAccount.totalBet(-parseFloat(a.mainGrid.pressedZones[b.name].bet)), a.mainUIManager.defineZonesForBet(b, .35, J, -parseFloat(a.mainGrid.pressedZones[b.name].bet) * parseFloat(a.mainGrid.pressedZones[b.name].coef)), a.mainGrid.removeCurrentBets([parseInt(b.name)])); else {
                c = a.mainGrid.uiGridContainer.getChildByName(b.name).getChildByName("smallChipText") ?
                    parseFloat(a.mainGrid.uiGridContainer.getChildByName(b.name).getChildByName("smallChipText").text) : 0;
                c = parseFloat(w.currentBet({comb: b.name, curSumm: c}));
                if (!n.isAllowBet({
                    comb: parseInt(b.name),
                    coef: void 0,
                    summ: c
                }, a.mainGrid.pressedZones[b.name] ? a.mainGrid.pressedZones[b.name].bet + c : c) || 0 == c || -1 == a.mainFLGAccount.totalBet(c)) return;
                a.mainUIManager.createSmallChip(b, c);
                b.selected ? (a.mainSoundManager.playSound("stackChip"), a.mainGrid.pressedZones[b.name].bet = parseFloat(a.mainGrid.uiGridContainer.getChildByName(b.name).getChildByName("smallChipText").text)) :
                    (a.mainSoundManager.playSound("firstChip"), b.selected = !0, a.mainGrid.pressedZones[b.name] = {
                        zone: a.mainGrid.uiGridContainer.getChildByName(b.name),
                        bet: c,
                        coef: a.mainUIManager.defineCoefForBet(b)
                    });
                a.mainUIManager.defineZonesForBet(b, .35, J, c * parseFloat(a.mainGrid.pressedZones[b.name].coef))
            }
            if (d) {
                if (b.name != F || void 0 == F) void 0 != F && a.mainGrid.zonesOut(v), a.mainUIManager.defineZonesForBet(b, .35);
                F = b.name
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            a.mainGrid.gridContainer.down && y.addGridState();
            a.mainGrid.gridContainer.down = !1;
            a.mainGrid.zonesOut(v);
            F = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        a.mainRenderer.stage.on("changeLang", Q);
        a.mainGameManager.gameStateAsync(function (b) {
            W(b, function () {
                E.addDragSprite();
                y = new f(a);
                O(b);
                c && c();
                R.setVisible(!0)
            })
        })
    }, function () {
        a.mainSoundManager.playRandomBackSound()
    });
    var Q = function () {
        a.mainFLGAccount.updateAccountText();
        a.mainRenderer.stage.getChildByName("max_min").children[0].text = mainLocalizationTable.minBet + ": " + numberFormat(parseFloat(clientInfoGlobal.cfstolmin) /
            100, {thousands_sep: " ", decimals: 0});
        a.mainRenderer.stage.getChildByName("max_min").children[1].text = mainLocalizationTable.maxBet + ": " + numberFormat(parseFloat(clientInfoGlobal.cfstolmax) / 100, {
            thousands_sep: " ",
            decimals: 0
        });
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.onLanguageChange = Q;
    this.createSmallChip = function (b, e) {
        function c(b) {
            var c;
            for (c = w.possibleBets.length - 1; 0 <= c; c--) if (w.possibleBets[c] <= b) return a.mainRenderer.resourceLoader.resources["chip_" + (c + 1)].texture
        }

        var d = a.mainGrid.uiGridContainer.getChildByName(b.name);
        if (d.getChildByName("smallChip")) parseFloat(d.getChildByName("smallChipText").text) + e <= t(parseInt(b.name)) && (d.getChildByName("smallChipText").text = parseFloat(d.getChildByName("smallChipText").text) + e, d.getChildByName("smallChipText").text = +parseFloat(d.getChildByName("smallChipText").text).toFixed(10), n.setTextScale(d.getChildByName("smallChipText")), d.getChildByName("smallChipText").visible = !0, d.getChildByName("smallChip").visible = !0, d.getChildByName("smallChip").texture = c(parseFloat(d.getChildByName("smallChipText").text)));
        else {
            var f = new PIXI.Sprite(c(e));
            e = new PIXI.Text(e, {font: "bold 22px Myriad Pro", fill: "#444343"});
            e.name = "smallChipText";
            n.setTextScale(e);
            f.name = "smallChip";
            d.addChildAt(f, 0 == b.name ? 1 : 0);
            d.addChildAt(e, 0 == b.name ? 2 : 1);
            for (f = 0; f < d.children.length; f++) if ("smallChip" == d.children[f].name || "smallChipText" == d.children[f].name) d.children[f].anchor.x = .5, d.children[f].anchor.y = .5, d.children[f].position.y = b.height / 2, d.children[f].position.x = b.width / 2, "smallChip" == d.children[f].name ? d.children[f].scale.set(.55,
                .55) : d.children[f].anchor.y = .555;
            f = e = null
        }
        d = null
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
    this.defineZonesForBet = function (b, e, c, d, f) {
        if (36 >= b.name) void 0 != c ? (I(a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"),
            b.name), J(a.mainGrid.uiGridContainer.getChildByName(b.name), d)) : C(a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name); else {
            if (48 >= b.name) {
                var h = a.mainGrid.buttonCombinations[b.name].zones;
                void 0 != c ? I(a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name) : C(a.mainGrid.uiGridContainer.getChildByName(b.name + "innerZone"), b.name)
            } else 250 > b.name && (h = a.mainGrid.combinations[b.name - 100]);
            for (b = 0; b < h.length; b++) void 0 != c ? (I(a.mainGrid.uiGridContainer.getChildByName(h[b] + "innerZone"),
                h[b]), J(a.mainGrid.uiGridContainer.getChildByName(h[b]), d, f)) : C(a.mainGrid.uiGridContainer.getChildByName(h[b] + "innerZone"), h[b])
        }
    };
    var J = function (b, e, c) {
        c = void 0 != c ? c : !0;
        if (b.getChildByName("possibleWinInfo")) b.getChildByName("possibleWinText").text = e + parseFloat(b.getChildByName("possibleWinText").text), b.getChildByName("possibleWinText").text = +parseFloat(b.getChildByName("possibleWinText").text).toFixed(10), b.getChildByName("possibleWinText").visible = 0 < parseFloat(b.getChildByName("possibleWinText").text) &&
            c, b.getChildByName("possibleWinInfo").visible = 0 < parseFloat(b.getChildByName("possibleWinText").text) && c; else if (!(0 > parseFloat(e))) for (c = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.possible_win_bg.texture), e = new PIXI.Text(+e.toFixed(10), {
            font: "19px Arial",
            fill: "#bdbdbd"
        }), e.name = "possibleWinText", c.name = "possibleWinInfo", b.addChildAt(e, b.children.length), b.addChildAt(c, b.children.length - 1), c = 0; c < b.children.length; c++) if ("possibleWinInfo" == b.children[c].name || "possibleWinText" == b.children[c].name) b.children[c].anchor.x =
            .5, b.children[c].anchor.y = .5, e = "possibleWinText" == b.children[c].name ? Math.ceil(b.height - b.children[c].height / 2) - 3 : Math.ceil(b.height - b.children[c].height / 2), b.children[c].position.y = e, b.children[c].position.x = b.width / 2
    };
    this.showPossibleWin = J;
    this.setInteraction = function (b) {
        a.mainGrid.setZoneInteraction(b);
        E.setInteraction(b);
        p.getChildByName("mode_clear").getChildByName("mode_selected").interactive = b;
        p.getChildByName("mode_double").getChildByName("mode_selected").interactive = b;
        p.getChildByName("mode_repeat").getChildByName("mode_selected").interactive =
            b;
        p.getChildByName("eraser").interactive = b;
        for (var e = 0; e < r.children.length; e++) r.children[e].interactive = b;
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
        return parseFloat(e).toFixed(10) > t(b.comb) ? (c ? (c.betErrorCount++, c.betErrorFunc || (c.betErrorFunc = function () {
            a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet)
        })) : a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet),
            !1) : n.getTotalSumByGrid() + parseFloat(b.summ).toFixed(10) > clientInfoGlobal.cfstolmax / 100 ? (a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBetGame), !1) : !0
    };
    var T = 0, U = 0, O = function (b) {
        function e(b) {
            a.mainGameManager && (B.playing || B.gotoAndStop(Math.ceil(b * (B.totalFrames - 1))), M.getChildByName("text" + M.name).text = L.getLastSeconds(), a.mainRenderer.renderManager.needUpdateRender = !0)
        }

        function c(b) {
            a.mainGameManager && ($(window).trigger("restartHls"), a.mainRenderer.renderManager.animationTweenInc(),
                (new TWEEN.Tween(p.position)).to({y: 0}, 900).easing(TWEEN.Easing.Cubic.InOut).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec()
                }).start(), a.mainRenderer.renderManager.animationTweenInc(), (new TWEEN.Tween(p)).to({alpha: 1}, 900).easing(TWEEN.Easing.Exponential.InOut).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec()
            }).start(), a.mainFLGAccount.setWinTextVisible(!0), a.mainGrid.removeCurrentBets(), y.selectGridByStates(), a.mainUIManager.setInteraction(!0), D.addEdition(b.tir +
                1), L.start({minutes: 0, seconds: a.gameConfig.tirTime - b.t2}, {
                minutes: 0,
                seconds: a.gameConfig.tirTime
            }, e, function () {
                D.getActedOutEdition().betsHistory.addBet({
                    fortuneBetObjArr: a.mainUIManager.getFortuneObjectsByGrid(),
                    winBet: void 0,
                    win: void 0,
                    code: void 0
                }, D.getActedOutEdition().round, function (b) {
                    b || (a.mainGrid.removeCurrentBets(), a.mainFLGAccount.totalBet(-a.mainFLGAccount.totalBet()))
                });
                y.clearGridStates();
                a.mainUIManager.setInteraction(!1);
                a.mainSoundManager.playSound("endBet");
                (new TWEEN.Tween(p.position)).to({y: 60},
                    900).easing(TWEEN.Easing.Cubic.InOut).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec()
                }).start();
                a.mainRenderer.renderManager.animationTweenInc();
                (new TWEEN.Tween(p)).to({alpha: 0}, 900).easing(TWEEN.Easing.Exponential.InOut).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec()
                }).start()
            }, 10, O))
        }

        function d(b) {
            function c() {
                a.mainGameManager && (a.mainGameManager.gameStateAsync(d), a.mainRenderer.renderManager.needUpdateRender = !0)
            }

            function d(b) {
                a.mainGameManager &&
                (99 != b.ball ? setTimeout(function () {
                    a.mainFLGAccount && (a.mainFLGAccount.calculateWin(D.getActedOutEdition().betsHistory.bets, a.gameConfig.appName, function (c) {
                        if (c && c.length) {
                            for (var d = [], e = 0; e < c.length; e++) d.push({
                                comb: parseInt(c[e].nm),
                                coef: parseFloat(c[e].cf).toFixed(10) / 100,
                                summ: parseFloat(c[e].sm).toFixed(10) / 100,
                                winBet: b.ball
                            });
                            y.showWinCombinations(d);
                            d = null
                        }
                        a.mainGrid.showWinZone(parseInt(b.ball), function (b) {
                            a.mainSoundManager.playSound("winZone");
                            var c = b.getChildByName("zone_win_chip");
                            c || (c =
                                new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.zone_win_chip.texture), c.name = "zone_win_chip", c.anchor.set(.5, .5), c.scale.set(.9, .9), c.alpha = 0, c.position.set(b.width / 2, b.height / 2 - 28 - 100), b.addChildAt(c, 0));
                            b.getChildByName("smallChip") && (b.getChildByName("smallChipText").visible = !1, b.getChildByName("smallChip").visible = !1);
                            a.mainRenderer.renderManager.animationTweenInc();
                            (new TWEEN.Tween(c)).to({alpha: 1}, 600).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec()
                            }).start();
                            a.mainRenderer.renderManager.animationTweenInc();
                            (new TWEEN.Tween(c.position)).to({y: b.height / 2 - 28}, 600).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                a.mainRenderer.renderManager.animationTweenDec()
                            }).start();
                            setTimeout(function () {
                                a.mainRenderer.renderManager.animationTweenInc();
                                (new TWEEN.Tween(c)).to({alpha: 0}, 600).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                    a.mainRenderer.renderManager.animationTweenDec()
                                }).start();
                                a.mainRenderer.renderManager.animationTweenInc();
                                (new TWEEN.Tween(c.position)).to({
                                    y: b.height /
                                        2 - 28 - 100
                                }, 600).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                    a.mainRenderer.renderManager.animationTweenDec();
                                    b.visible = !1;
                                    c = null
                                }).start()
                            }, a.gameConfig.winShowTime)
                        }, a.gameConfig.winShowTime);
                        c = a.gameConfig.winShowTime ? a.gameConfig.winShowTime : 15E3;
                        T = setTimeout(O, c);
                        a.mainFLGAccount.winToBalanceAnimation(c, 2E3, {
                            x: 972,
                            y: 324
                        }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                            font: "bold 70px Arial",
                            fill: "#bcbcbc"
                        })
                    }, a.gameConfig), D.cancelLastEdition([b.ball]), a.mainRenderer.renderManager.needUpdateRender =
                        !0)
                }, 500) : U = setTimeout(c, 500))
            }

            a.mainGameManager && (b = a.gameConfig.rTime - Math.abs(parseInt(b.t2, 10)) + 1, setTimeout(c, 1E3 * b), a.mainUIManager.setInteraction(!1), a.mainFLGAccount.setWinTextVisible(!1))
        }

        function f(a) {
            0 >= a.t2 ? d(a) : c(a)
        }

        void 0 != a.mainGameManager && (b ? f(b) : a.mainGameManager.gameStateAsync(f))
    }
};
