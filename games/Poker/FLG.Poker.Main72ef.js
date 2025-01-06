registrationAppOnPlatform({
    category: "casino",
    catalog: "Poker",
    image: "games/Poker/resources/icons/poker.png",
    imageBack: "games/Poker/resources/icons/poker-back.png",
    caption: "Poker",
    runConfig: "Poker",
    gameType: "blue",
    playInDemo: !0
});
var configsPoker = {
    serverName: "srv18",
    appName: "poker",
    serverNum: "s18",
    combinationsGridPos: {x: 24, y: -26, cols: 3, rows: 3},
    suitesGridPos: {x: 24, y: -271, cols: 3, rows: 2},
    betSeparator: "_",
    runconfig: "Poker",
    caption: "Poker",
    red: {
        editionsHistory: "history_stol_1",
        serverResp: "on",
        tirTimeSt12: 60,
        tirTimeSt13: 60,
        tirTimeSt14: 60,
        tirTimeSt5: 30,
        emptyP: {0: {k: 0, c: "55 55"}, 1: {k: 0, c: "55 55"}, 2: {k: 0, c: "55 55"}, 3: {k: 0, c: "55 55"}},
        resources: "",
        canvasId: "",
        runconfig: "PokerRed",
        gameType: "Red",
        gameKind: "Poker",
        tableNum: 1,
        gameVariant: "",
        numColor: "#e11b22",
        roundTxtColor: "#ed1c24"
    },
    green: {
        editionsHistory: "history_stol_2",
        serverResp: "tw",
        tirTimeSt12: 60,
        tirTimeSt13: 60,
        tirTimeSt14: 60,
        tirTimeSt5: 30,
        emptyP: {
            0: {k: 0, c: "55 55"},
            1: {k: 0, c: "55 55"},
            2: {k: 0, c: "55 55"},
            3: {k: 0, c: "55 55"},
            4: {k: 0, c: "55 55"},
            5: {k: 0, c: "55 55"}
        },
        resources: "",
        canvasId: "",
        runconfig: "PokerGreen",
        gameType: "Green",
        gameKind: "Poker",
        tableNum: 2,
        gameVariant: "",
        numColor: "#12a500",
        roundTxtColor: "#39b54a"
    },
    blue: {
        editionsHistory: "history_stol_3",
        serverResp: "th",
        tirTimeSt12: 60,
        tirTimeSt13: 60,
        tirTimeSt14: 60,
        tirTimeSt5: 30,
        emptyP: {
            0: {k: 0, c: "55 55"},
            1: {k: 0, c: "55 55"},
            2: {k: 0, c: "55 55"},
            3: {k: 0, c: "55 55"},
            4: {k: 0, c: "55 55"},
            5: {k: 0, c: "55 55"},
            6: {k: 0, c: "55 55"},
            7: {k: 0, c: "55 55"}
        },
        resources: "",
        canvasId: "",
        runconfig: "PokerBlue",
        gameType: "Blue",
        gameKind: "Poker",
        tableNum: 3,
        gameVariant: "",
        numColor: "#1d5fff",
        roundTxtColor: "#3a8ae6"
    }
}, PokerObjectsArr = {blue: void 0, green: void 0, red: void 0};

function emitEventPoker(a, F) {
    void 0 != PokerObjectsArr.blue && PokerObjectsArr.blue.mainRenderer.stage.emit(a, F);
    void 0 != PokerObjectsArr.green && PokerObjectsArr.green.mainRenderer.stage.emit(a, F);
    void 0 != PokerObjectsArr.red && PokerObjectsArr.red.mainRenderer.stage.emit(a, F)
}

function removePokerObject(a, F) {
    if (void 0 != PokerObjectsArr[F]) {
        PokerObjectsArr[F].destroy();
        for (var K in PokerObjectsArr[F]) PokerObjectsArr[F][K] = null;
        PokerObjectsArr[F] = null
    }
    $("#" + a + " canvas").remove();
    $("#" + a + " div").remove();
    mobileMode = !1
}

function initPokerObject(a, F) {
    configsPoker[F].canvasId = a;
    PokerObjectsArr[F] = mobileMode ? new PokerAppMobile(configsPoker, F) : new PokerApp(configsPoker, F)
}

function refreshPokerObject(a, F) {
    removePokerObject(a, F.toLowerCase());
    initPokerObject(a, F.toLowerCase())
}

function PokerApp(a, F) {
    this.destroy = function () {
        U.destroy();
        U = null;
        R.destroy();
        R = null;
        N.destroy();
        N = null;
        J.destroy();
        J = null;
        Y.destroy();
        Y = null;
        K.mainSoundManager.destroy();
        for (var W in K) K[W] = null;
        K = null
    };
    var K = this;
    this.gameDir = "games/Poker/resources/";
    this.gameConfig = a;
    this.configType = F;
    var Y = new FLGRenderer(1920, 1080, a[F].canvasId, "center");
    this.mainRenderer = Y;
    this.mainSoundManager = new SoundManager(K.gameConfig[K.configType].gameKind, K.gameConfig[K.configType].gameType, K.gameConfig[K.configType].gameVariant);
    var N = new FLGAccount(void 0, K.mainSoundManager, K.mainRenderer);
    this.mainFLGAccount = N;
    var J = new gameManagerPoker(this);
    this.mainGameManager = J;
    var U = new UIManagerPoker(this);
    this.mainUIManager = U;
    var R;
    this.setMainGrid = function (W) {
        R = W;
        K.mainGrid = R
    }
}

function gameManagerPoker(a) {
    this.destroy = function () {
        N = Y = K = null;
        for (var J in F) F[J] = null;
        F = null
    };
    var F = this, K = {};
    this.gameStateAsync = function (J) {
        Y(J)
    };
    var Y = function (J) {
        $.ajax({
            type: "get",
            url: getUrl(a.gameConfig.serverNum, gamePostfix) + "?" + clientInfoGlobal[a.gameConfig.serverName],
            dataType: "json",
            success: function (U, R, W) {
                try {
                    F && (K = U, setTimeout(function (O, fa, A) {
                        F && K && (K.betsHistory = {}, void 0 != J && J(K))
                    }, 0))
                } catch (O) {
                    a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
                }
            },
            error: function (U, R, W) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
            }
        })
    }, N = {};
    this.gameHistory = function (J) {
        J && $.ajax({
            type: "get",
            url: getUrl(a.gameConfig.serverNum, gamePostfix) + "?" + clientInfoGlobal[a.gameConfig.serverName],
            dataType: "json",
            success: function (U, R, W) {
                try {
                    if (F) {
                        function fa() {
                            var A = O;
                            setTimeout(function (ha, x, za) {
                                F && (N["history_stol_" + a.gameConfig[a.configType].tableNum][A].betsHistory = {}, O--, 0 >= A ? J(N) : fa())
                            }, 0)
                        }

                        N = U;
                        if (N != {}) {
                            var O = 9;
                            fa()
                        }
                    }
                } catch (fa) {
                    a.mainRenderer.logService.log(mainLocalizationTable.connError,
                        redirectToRootURL, "critical")
                }
            },
            error: function (U, R, W) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
            }
        })
    }
}

function UIManagerPoker(a) {
    function F(b) {
        this.destroy = function () {
            for (var u = 0; u < d.length; u++) {
                for (var r in d[u]) d.length - 1 == u && d[u][r].summ && b.mainFLGAccount.totalBet(-d[u][r].summ), d[u][r] = null;
                d[u] = null
            }
            k = m = d = null;
            for (u in c) c[u] = null;
            c = null
        };
        var c = this, d = [];
        this.states = function () {
            return d
        };
        var m = [];
        this.saveGridStateInStorage = function () {
        };
        this.loadGridStateFromStorage = function () {
        };
        this.addGridState = function () {
            var u = b.mainUIManager.getFortuneObjectsByGrid(!1);
            if (!d.length || u.length || d[d.length - 1].length) d.push(u),
                c.saveGridStateInStorage()
        };
        this.doubleCurrentBets = function () {
            var u = {betErrorCount: 0, betErrorFunc: null}, r = 0, f;
            for (f in a.mainGrid.pressedZones) r++, a.mainUIManager.isAllowBet({
                comb: a.mainGrid.pressedZones[f].servN,
                coef: a.mainGrid.pressedZones[f].coef,
                summ: a.mainGrid.pressedZones[f].bet
            }, 2 * a.mainGrid.pressedZones[f].bet, u) && (b.mainUIManager.createSmallChip(a.mainGrid.pressedZones[f].zone, a.mainGrid.pressedZones[f].bet), a.mainGrid.pressedZones[f].bet *= 2);
            0 < u.betErrorCount && u.betErrorFunc();
            u.betErrorCount !=
            r && c.addGridState();
            u.betErrorCount = null;
            u.betErrorFunc = null
        };
        this.undoGridState = function () {
            d.length && (d.pop(), c.saveGridStateInStorage(), b.mainGrid.removeCurrentBets(!1), k())
        };
        this.clearGridStates = function () {
            if (m && m.length) {
                for (var u in m) m[u] = null;
                m = []
            }
            if (d && d.length) {
                m = d[d.length - 1].slice();
                for (var r = 0; r < d.length; r++) {
                    for (u in d[r]) d[r][u] = null;
                    d[r] = null
                }
                d = []
            }
            c.saveGridStateInStorage()
        };
        var k = function (u, r) {
            var f = u ? u : d[d.length - 1], n = void 0 != r ? r : !1, C = {betErrorCount: 0, betErrorFunc: null};
            f && f.length &&
            (b.mainGrid.pressZonesByObjectArr(f, function (q) {
                if (b.mainUIManager.isAllowBet({
                    comb: q.zone.name,
                    coef: q.coef,
                    summ: q.bet
                }, b.mainGrid.pressedZones[q.zone.name] ? b.mainGrid.pressedZones[q.zone.name].bet + q.bet : q.bet, C)) {
                    if (u || n) u && u.length && (parseInt(f[0].winBet) != parseInt(q.zone.name) && b.mainUIManager.createSmallChip(q.zone, q.bet), b.mainGrid.pressedZones[q.zone.name] = {
                        zone: b.mainGrid[q.zone.name.substr(1)].getChildByName(q.zone.name),
                        bet: q.bet,
                        coef: q.coef,
                        servN: q.servN
                    }); else {
                        var y = b.mainUIManager.createSmallChip(q.zone,
                            q.bet);
                        q.zone.selected ? b.mainGrid.pressedZones[q.zone.name].bet = y : (q.zone.selected = !0, b.mainGrid.pressedZones[q.zone.name] = {
                            zone: b.mainGrid[q.zone.name.substr(1)].getChildByName(q.zone.name),
                            bet: q.bet,
                            coef: q.coef,
                            servN: q.servN
                        })
                    }
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }), 0 < C.betErrorCount && C.betErrorFunc(), C.betErrorCount = null, C = C.betErrorFunc = null)
        };
        this.selectGridByStates = k
    }

    function K(b) {
        this.destroy = function () {
            for (var g in d) {
                for (var h = 0; h < d[g].length; h++) d[g][h].round = null, d[g][h].editionResult =
                    null, d[g][h].betsHistory.destroy && d[g][h].betsHistory.destroy(), d[g][h] = null;
                d[g] = null
            }
            r = u = k = m = d = null;
            v.destroy();
            e = y = q = C = v = null;
            for (g in c) c[g] = null;
            c = null
        };
        var c = this, d = {red: [], green: [], blue: []}, m;
        this.editions = d;
        var k, u, r;
        this.historyTable = function () {
            return u
        };
        this.betsTable = function () {
            return r
        };
        this.setHistoryVisibility = function (g) {
            u.visible = g
        };
        this.setDetailedHistoryVisibility = function (g) {
            r.visible = g
        };
        this.getActedOutEdition = function (g) {
            for (var h = d[g].length - 1; 0 <= h; h--) if (void 0 == d[g][h].editionResult) return C(h),
                d[g][h];
            C(d[g].length - 1);
            return d[g][d[g].length - 1]
        };
        for (var f in b) for (var n = b[f].length - 1; 0 <= n; n--) d[f].push({
            round: b[f][n].round,
            editionResult: {
                combination: b[f][n].editionResult.combination,
                suite: b[f][n].editionResult.suite,
                color: b[f][n].editionResult.color,
                winners: b[f][n].editionResult.winners
            },
            betsHistory: b[f][n].betsHistory
        });
        var C = function (g) {
            0 > g || g >= d[a.configType].length || (m = g, void 0 != k && (k.children[0].text = "#" + d[a.configType][m].round), u && 0 < u.children.length && e(), a.mainRenderer.renderManager.needUpdateRender =
                !0)
        };
        C(d[a.configType].length - 1);
        this.drawEditions = function () {
            k = a.mainRenderer.createButton(w.game.container.getChildByName("roundline"), 95, 25, void 0, {
                text: "#" + d[a.configType][m].round,
                align: "center",
                style: {font: "bold 36px Arial", fill: "#fbcc00"}
            });
            k.name = "roundText";
            r = new PIXI.Container;
            r.position.set(0, -486);
            w.bets.container.addChild(r);
            u = new PIXI.Container;
            u.position.set(0, -486);
            w.info.container.addChild(u);
            for (var g in d) for (var h = 0; h < d[g].length; h++) d[g][h].betsHistory.parentEditions(c[g]);
            q();
            e();
            c.drawDetailEditionHistoryFunc(this.betsTable(), d[a.configType].length - 1)
        };
        var q = function () {
        };
        this.redrawEditionHeader = q;
        var y = function () {
        };
        this.drawBetsHeader = y;
        var e = function () {
            var g = u.getChildByName("historyLine0");
            var h = [mainLocalizationTable.round, mainLocalizationTable.winners, "red", "green", "blue"];
            if (g) for (l = 9; 0 <= l; l--) {
                if (g = u.getChildByName("historyLine" + l), d.red[l].editionResult.combination) {
                    var t = d.red[l].editionResult.winners.concat(d.green[l].editionResult.winners.concat(d.blue[l].editionResult.winners));
                    g.children[0].children[0].text = d[a.configType][l].round;
                    g.children[1].children[0].text = t.join(" ");
                    g.children[2].children[0].text = P[P.length - 1 - d.red[l].editionResult.combination].text || "";
                    g.children[3].texture = a.mainRenderer.resourceLoader.resources[ia[d.red[l].editionResult.suite - 9].texture + "_history"].texture;
                    g.children[4].children[0].text = P[P.length - 1 - d.green[l].editionResult.combination].text || "";
                    g.children[5].texture = a.mainRenderer.resourceLoader.resources[ia[d.green[l].editionResult.suite - 9].texture +
                    "_history"].texture;
                    g.children[6].children[0].text = P[P.length - 1 - d.blue[l].editionResult.combination].text || "";
                    g.children[7].texture = a.mainRenderer.resourceLoader.resources[ia[d.blue[l].editionResult.suite - 9].texture + "_history"].texture
                }
            } else {
                g = 130;
                for (l = 0; 5 > l; l++) a.mainRenderer.createButton(u, 550 + g, 155, null, {
                    text: 2 > l ? h[l] : a.gameConfig[h[l]].tableNum,
                    align: "center",
                    style: 2 > l ? {
                        font: "bold 40px Arial",
                        fill: "#ffffff",
                        align: "center"
                    } : {font: "bold 48px Arial", fill: a.gameConfig[h[l]].numColor, align: "center"}
                }),
                    g += 260;
                h = 61;
                for (var l = 9; 0 <= l; l--) g = a.mainRenderer.createButton(u, 550, 136 + h, "tab_history_row_short"), g.name = "historyLine" + l, d.red[l].editionResult.combination && (t = d.red[l].editionResult.winners.concat(d.green[l].editionResult.winners.concat(d.blue[l].editionResult.winners)), a.mainRenderer.createButton(g, 130, 27, null, {
                    text: d[a.configType][l].round,
                    align: "center",
                    style: {font: "38px Arial Narrow", fill: "#ffffff", align: "center"}
                }), a.mainRenderer.createButton(g, 390, 27, null, {
                    text: t.join(" "), align: "center",
                    style: {
                        font: "38px Arial Narrow",
                        fill: "#ffffff",
                        align: "center",
                        wordWrap: !0,
                        wordWrapWidth: 260,
                        lineHeight: 39
                    }
                }), a.mainRenderer.createButton(g, 615, 27, null, {
                    text: P[P.length - 1 - d.red[l].editionResult.combination].text || "",
                    align: "center",
                    style: {font: "38px Arial Narrow", fill: "#ffffff", align: "center"}
                }), t = a.mainRenderer.createButton(g, 685, 27, ia[d.red[l].editionResult.suite - 9].texture + "_history"), t.anchor.set(.5, .5), t.scale.set(.65, .65), a.mainRenderer.createButton(g, 875, 27, null, {
                    text: P[P.length - 1 - d.green[l].editionResult.combination].text ||
                        "", align: "center", style: {font: "38px Arial Narrow", fill: "#ffffff", align: "center"}
                }), t = a.mainRenderer.createButton(g, 945, 27, ia[d.green[l].editionResult.suite - 9].texture + "_history"), t.anchor.set(.65, .65), t.scale.set(.65, .65), a.mainRenderer.createButton(g, 1135, 27, null, {
                    text: P[P.length - 1 - d.blue[l].editionResult.combination].text || "",
                    align: "center",
                    style: {font: "38px Arial Narrow", fill: "#ffffff", align: "center"}
                }), t = a.mainRenderer.createButton(g, 1205, 27, ia[d.blue[l].editionResult.suite - 9].texture + "_history"),
                    t.anchor.set(.5, .5), t.scale.set(.65, .65)), h += 61;
                a.mainRenderer.createButton(u, 960, 90, null, {
                    text: mainLocalizationTable.history.toUpperCase(),
                    align: "center",
                    style: {font: "bold 46px Arial", fill: "#e8a023", align: "top-center"}
                });
                g = a.mainRenderer.createButton(u, 1830, 90, "btn_close");
                a.mainRenderer.createButton(g, 0, 0, "btn_close_selected", void 0, function (D, z) {
                    a.mainSoundManager.playSound("buttonClick");
                    w.game.button.emit("mousedown");
                    z.stopped = !0;
                    a.mainUIManager.clickAnimationFunc(D, "btn_close_info");
                    a.mainRenderer.renderManager.needUpdateRender =
                        !0
                }, void 0, void 0, function (D) {
                    G(D, "btn_close_info")
                }, function (D) {
                    H(D, "btn_close_info")
                }).alpha = 0;
                g.anchor.set(.5, .5);
                g.children[0].anchor.set(.5, .5);
                g.scale.set(.7, .7)
            }
            t = h = h = g = g = null
        };
        this.detailEditionsFont = {font: "40px Arial", fill: "#ffffff"};
        this.detailEditionsHeaderFont = {font: "26px Arial", fill: "#b1b1b1"};
        this.detailEditionsRowFont = {font: "33px Arial", fill: "#ffffff"};
        var v;
        this.drawDetailEditionHistoryFunc = function (g, h) {
            var t = 0 != g.children.length;
            g.editionInd = h;
            t ? g.children[1].children[0].text = d[a.configType][h].round :
                (a.mainRenderer.createButton(g, 192, 35, "tab_bg"), a.mainRenderer.createButton(g, 960, 90, void 0, {
                    text: d[a.configType][h].round,
                    align: "center",
                    style: {font: "bold 50px Arial", fill: "#e8a023", align: "top-center"}
                }), t = a.mainRenderer.createButton(g, 773, 90, "bet_arrow"), a.mainRenderer.createButton(t, 0, 0, "bet_arrow_selected", void 0, function (L, ra) {
                    a.mainSoundManager.playSound("buttonClick");
                    g.editionInd = limit(g.editionInd - 1, 0, d[a.configType].length - 1);
                    c.drawDetailEditionHistoryFunc(g, g.editionInd);
                    ra.stopped = !0;
                    a.mainUIManager.clickAnimationFunc(L, "bet_arrow_History");
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, void 0, function (L) {
                    G(L, "bet_arrow_History")
                }, function (L) {
                    H(L, "bet_arrow_History")
                }).alpha = 0, t.scale.set(1.5, 1.5), t.anchor.set(.5, .5), t.children[0].anchor.set(.5, .5), t = a.mainRenderer.createButton(g, 1146, 88, "bet_arrow"), a.mainRenderer.createButton(t, 0, 0, "bet_arrow_selected", void 0, function (L, ra) {
                    a.mainSoundManager.playSound("buttonClick");
                    g.editionInd = limit(g.editionInd + 1, 0, d[a.configType].length -
                        1);
                    c.drawDetailEditionHistoryFunc(g, g.editionInd);
                    ra.stopped = !0;
                    a.mainUIManager.clickAnimationFunc(L, "bet_arrow_History2");
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, void 0, function (L) {
                    G(L, "bet_arrow_History2")
                }, function (L) {
                    H(L, "bet_arrow_History2")
                }).alpha = 0, t.scale.set(1.5, 1.5), t.anchor.set(.5, .5), t.children[0].anchor.set(.5, .5), t.rotation = Math.PI, t = a.mainRenderer.createButton(g, 335, 155, void 0, {
                    text: mainLocalizationTable.table, align: "center", style: {
                        font: "bold 40px Arial", fill: "#ffffff",
                        align: "center"
                    }
                }), t.anchor.set(.5, .5), t = a.mainRenderer.createButton(g, 585, 155, void 0, {
                    text: mainLocalizationTable.combination,
                    align: "center",
                    style: {font: "bold 40px Arial", fill: "#ffffff", align: "center"}
                }), t.anchor.set(.5, .5), t = a.mainRenderer.createButton(g, 835, 155, void 0, {
                    text: mainLocalizationTable.phase,
                    align: "center",
                    style: {font: "bold 40px Arial", fill: "#ffffff", align: "center"}
                }), t.anchor.set(.5, .5), t = a.mainRenderer.createButton(g, 1085, 155, void 0, {
                    text: mainLocalizationTable.sum, align: "center", style: {
                        font: "bold 40px Arial",
                        fill: "#ffffff", align: "center"
                    }
                }), t.anchor.set(.5, .5), t = a.mainRenderer.createButton(g, 1335, 155, void 0, {
                    text: mainLocalizationTable.coef,
                    align: "center",
                    style: {font: "bold 40px Arial", fill: "#ffffff", align: "center"}
                }), t.anchor.set(.5, .5), t = a.mainRenderer.createButton(g, 1585, 155, void 0, {
                    text: mainLocalizationTable.win,
                    align: "center",
                    style: {font: "bold 40px Arial", fill: "#ffffff", align: "center"}
                }), t.anchor.set(.5, .5), t = a.mainRenderer.createButton(g, 1675, 90, "btn_close"), a.mainRenderer.createButton(t, 0, 0, "btn_close_selected",
                    void 0, function (L, ra) {
                        a.mainSoundManager.playSound("buttonClick");
                        w.game.button.emit("mousedown");
                        ra.stopped = !0;
                        a.mainUIManager.clickAnimationFunc(L, "btn_close_bets");
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }, void 0, void 0, function (L) {
                        G(L, "btn_close_bets")
                    }, function (L) {
                        H(L, "btn_close_bets")
                    }).alpha = 0, t.anchor.set(.5, .5), t.children[0].anchor.set(.5, .5), t.scale.set(.7, .7), t = null, t = new PIXI.Container, v = new MaskedSprite(a.mainRenderer.createButton(g, 0, 190), {
                    mask: {x: 210, y: 190, width: 1500, height: 671},
                    needScrolling: {container: t}
                }, a.mainRenderer.renderManager), v.srcSprite.addChildAt(t, 0), v.srcSprite.interactive = !0, v.srcSprite.hitArea = new PIXI.Rectangle(220, 188, 1491, 677));
            t = null;
            var l;
            t = v.containerForScroll;
            for (var D, z, ja, p = 0; t.getChildByName("row_" + p); p++) if (l = t.getChildByName("row_" + p)) if (l.visible = !1, z = l.getChildByName("rect" + p), z.visible = !1, z.getChildByName("textBet" + p).visible = !1, l.getChildByName("icon" + p) && (l.getChildByName("icon" + p).visible = !1), l.getChildByName("combTxt" + p) && (l.getChildByName("combTxt" +
                p).visible = !1), D = l.getChildByName("summ" + p)) D.visible = !1, l.getChildByName("win" + p).visible = !1, l.getChildByName("coef" + p).visible = !1, l.getChildByName("phase" + p).visible = !1, l.getChildByName("tblNum" + p).visible = !1;
            g.children[2].visible = 0 !== g.editionInd;
            g.children[3].visible = g.editionInd !== d[a.configType].length - 1;
            h = d.blue[h].betsHistory.bets.concat(d.green[h].betsHistory.bets.concat(d.red[h].betsHistory.bets));
            g.children[8].visible = 0 < h.length;
            g.children[9].visible = 0 < h.length;
            g.children[4].visible = 0 <
                h.length;
            g.children[5].visible = 0 < h.length;
            g.children[6].visible = 0 < h.length;
            g.children[7].visible = 0 < h.length;
            if (0 >= h.length) t.emit("updateHeight"); else {
                p = 0;
                for (var E = h.length - 1; p < h.length; p++, E--) {
                    (l = t.getChildByName("row_" + p)) ? l.visible = !0 : (l = new a.mainRenderer.createButton(t, 218, 27 + 61 * p, "tab_history_row"), l.anchor.y = .5, l.name = "row_" + p);
                    (z = l.getChildByName("rect" + p)) ? (z.visible = !0, z = z.getChildByName("textBet" + p), z.text = 15 <= parseInt(h[E].comb.toString().substr(1)) ? mainLocalizationTable.player + " " +
                        h[E].comb.toString().substr(0, 1) + S[parseInt(h[E].comb.toString().substr(1))].info : S[parseInt(h[E].comb.toString().substr(1))].info, z.visible = !0) : (z = a.mainRenderer.createButton(l, 320, 0, void 0, {
                        text: 15 <= parseInt(h[E].comb.toString().substr(1)) ? mainLocalizationTable.player + " " + h[E].comb.toString().substr(0, 1) + S[parseInt(h[E].comb.toString().substr(1))].info : S[parseInt(h[E].comb.toString().substr(1))].info,
                        align: "left",
                        style: {font: "33px Arial", fill: "#ffffff", align: "left"}
                    }), z.anchor.set(.5, .5), z.name =
                        "rect" + p, z.children[0].name = "textBet" + p);
                    S[parseInt(h[E].comb.toString().substr(1))].texture && (l.getChildByName("icon" + p) ? (l.getChildByName("icon" + p).texture = a.mainRenderer.resourceLoader.resources[S[parseInt(h[E].comb.toString().substr(1))].texture].texture, l.getChildByName("icon" + p).visible = !0) : (a.mainRenderer.createButton(l, 280, 0, S[parseInt(h[E].comb.toString().substr(1))].texture).name = "icon" + p, l.getChildByName("icon" + p).anchor.set(.5, .5), l.getChildByName("icon" + p).scale.set(.65, .65)));
                    S[parseInt(h[E].comb.toString().substr(1))].text &&
                    (l.getChildByName("combTxt" + p) ? (l.getChildByName("combTxt" + p).children[0].text = S[parseInt(h[E].comb.toString().substr(1))].text, l.getChildByName("combTxt" + p).visible = !0) : a.mainRenderer.createButton(l, 280, 0, void 0, {
                        text: S[parseInt(h[E].comb.toString().substr(1))].text,
                        align: "center",
                        style: {font: "bold 38px Arial Narrow", fill: "#e8a023", align: "center"}
                    }).name = "combTxt" + p);
                    z = void 0 != h[E].win ? formatFLGNums(h[E].win, !1) : "";
                    D = l.getChildByName("summ" + p);
                    for (var Q in PokerObjectsArr) if (a.gameConfig[Q].tableNum ==
                        h[E].comb.toString().substr(0, 1)) {
                        ja = a.gameConfig[Q].numColor;
                        break
                    }
                    D ? (D.children[0].text = formatFLGNums(h[E].summ, !1), D.visible = !0, D = l.getChildByName("coef" + p), D.children[0].text = "X " + formatFLGNums(h[E].coef), D.visible = !0, D = l.getChildByName("win" + p), D.children[0].text = z, D.visible = !0, z = l.getChildByName("phase" + p), z.children[0].text = Aa[h[E].phase], z.visible = !0, l = l.getChildByName("tblNum" + p), l.children[0].text = h[E].comb.toString().substr(0, 1), l.children[0].style = {
                        font: "bold 38px Arial",
                        fill: ja
                    }, l.visible =
                        !0) : (a.mainRenderer.createButton(l, 125, 0, void 0, {
                        text: h[E].comb.toString().substr(0, 1),
                        align: "center",
                        style: {font: "bold 38px Arial", fill: ja}
                    }).name = "tblNum" + p, a.mainRenderer.createButton(l, 625, 0, void 0, {
                        text: Aa[h[E].phase],
                        align: "center",
                        style: c.detailEditionsRowFont
                    }).name = "phase" + p, a.mainRenderer.createButton(l, 875, 0, void 0, {
                        text: formatFLGNums(h[E].summ, !1),
                        align: "center",
                        style: c.detailEditionsRowFont
                    }).name = "summ" + p, a.mainRenderer.createButton(l, 1125, 0, void 0, {
                        text: "X " + formatFLGNums(h[E].coef),
                        align: "center", style: c.detailEditionsRowFont
                    }).name = "coef" + p, a.mainRenderer.createButton(l, 1375, 0, void 0, {
                        text: z,
                        align: "center",
                        style: c.detailEditionsRowFont
                    }).name = "win" + p)
                }
                t.emit("updateHeight");
                h = z = z = z = ja = l = z = D = D = D = l = t = null
            }
        };
        this.cancelLastEdition = function (g) {
            for (var h in PokerObjectsArr) d[h][d[h].length - 1].editionResult = g[h], d[h][d[h].length - 1].betsHistory.setRoundResult(g[h])
        };
        this.calculateWinBets = function (g) {
            for (var h in PokerObjectsArr) d[h][d[h].length - 1].betsHistory.calculateWin(g[h])
        };
        this.highlightWinBets = function (g) {
            for (var h in PokerObjectsArr) d[h][d[h].length - 1].betsHistory.highlightWin(g)
        };
        this.addEdition = function (g) {
            for (var h in PokerObjectsArr) d[h][d[h].length - 1].round != g && (d[h][0].betsHistory.destroy && d[h][0].betsHistory.destroy(), d[h][0].betsHistory = null, d[h].shift(), d[h].push({
                round: g,
                editionResult: {combination: void 0, suite: void 0, color: void 0, winners: []},
                betsHistory: new Y([])
            }));
            C(d[a.configType].length - 1)
        }
    }

    function Y(b) {
        this.destroy = function () {
            for (var f = 0; f < d.length; f++) d[f].comb =
                null, d[f].coef = null, d[f].summ = null, d[f].win = null, d[f].code = null, d[f].state = null, d[f].phase = null, d[f].nm = null, d[f].winBets = null, d[f] = null;
            r = k = m = d = null;
            for (f in c) c[f] = null;
            c = null
        };
        var c = this, d = [];
        this.bets = d;
        var m = 0;
        this.setTotalWin = function (f) {
            if (!arguments.length) return m;
            f && (m = f)
        };
        var k = null;
        this.parentEditions = function (f) {
            if (!arguments.length) return k;
            k = f
        };
        if (b.length) for (var u = 0; u < b.length; u++) d.push({
            comb: b[u].comb,
            coef: b[u].coef,
            summ: b[u].summ,
            win: b[u].win,
            code: b[u].code,
            state: b[u].state,
            phase: b[u].phase,
            nm: b[u].nm
        });
        this.addBet = function (f, n, C) {
            a.mainFLGAccount.placePokerBet(f, n, a.gameConfig, function (q, y) {
                if (void 0 == q || 500 <= d.length || -1 == q) C && C(!1); else {
                    for (var e in f.fortuneBetObjArr) d.push({
                        comb: f.fortuneBetObjArr[e].comb,
                        coef: f.fortuneBetObjArr[e].coef,
                        summ: f.fortuneBetObjArr[e].summ,
                        win: void 0,
                        code: q,
                        state: void 0,
                        nm: "p" + parseInt(f.fortuneBetObjArr[e].comb.toString().substr(1)).toString(),
                        phase: void 0 != y ? y.substr(0, 2) : 0
                    });
                    C && C(!0);
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            })
        };
        this.setRoundResult =
            function (f) {
                for (f = 0; f < d.length; f++) ;
            };
        var r = function () {
        };
        this.redrawCurrentBets = r;
        this.highlightWin = function (f) {
            for (var n = 0; n < d.length; n++) for (var C in d[n].winBets) {
                var q = a.mainUIManager.getZoneNameByCombinationCode(d[n].winBets[C].comb);
                a.mainGrid[q.substr(1)].getChildByName(q).getChildByName("winLightSprite").alpha = f
            }
        };
        this.calculateWin = function (f) {
            for (var n = 0; n < d.length; n++) {
                var C = d[n], q = d[n], y = [], e = parseInt(q.comb.toString().substr(1));
                15 <= e ? 0 <= f.winners.indexOf(q.comb.toString().substr(0, 1).concat(S[e].gridNumber)) &&
                    y.push(q) : 13 <= e ? parseInt(f.color) == e && y.push(q) : 9 <= e ? parseInt(f.suite) == e && y.push(q) : parseInt(f.combination) == e && y.push(q);
                C.winBets = y
            }
        }
    }

    this.destroy = function () {
        clearTimeout(sa);
        clearTimeout(Ea);
        clearTimeout(Fa);
        clearTimeout(Ga);
        R = W = J = null;
        O.destroy();
        O = null;
        fa.destroy();
        A = fa = null;
        ha.destroy();
        na = za = x = ha = null;
        for (var b in w) {
            for (var c in w[b]) w[b][c] = null;
            w[b] = null
        }
        Ha = Z = oa = aa = ba = ca = X = M = ta = w = null;
        for (b in V) {
            for (c = 0; c < V[b].length; c++) V[b][c].round = null, V[b][c].editionResult = null, V[b][c].betsHistory.destroy &&
            V[b][c].betsHistory.destroy(), V[b][c].betsHistory = null;
            V[b] = null
        }
        Ia = V = null;
        for (b in B) B[b] = null;
        la = ua = S = Aa = Ja = ia = P = ma = Ka = T = ka = La = Ba = va = pa = qa = Ma = da = H = G = Ca = B = null;
        a.mainRenderer.stage.off("changeLang", wa);
        wa = null;
        window.removeEventListener("keydown", Da);
        Da = null;
        I.destroy();
        I = null;
        ea.destroy();
        ea = null;
        for (b in N) N[b] = null;
        N = null
    };
    for (var N = this, J = clientInfoGlobal.coin234.split("-"), U = 0; U < J.length; U++) J[U] /= 100;
    var R = 2 * parseInt(J[J.length - 1], 10), W = R;
    J.push("MAX\n" + R);
    var O = new betsControls(J[0], J[J.length -
    1], J[1], J, function () {
        a.mainFLGAccount.balance() < R && 0 < a.mainFLGAccount.balance() && (R = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return R
    });
    this.betsControls = O;
    var fa = new FLGTimer, A, ha = new FLGJackpot(a.mainRenderer, {tirTimeOffset: .1, updateInterval: 900}),
        x = new PIXI.Container, za = new PIXI.Container, na = new PIXI.Container, xa = new PIXI.Container, w = {
            info: {text: "", posX: 192, posY: 992},
            bets: {text: "", posX: 1402, posY: 987},
            game: {text: "", posX: -100, posY: -100, pressedDefault: !0}
        }, M;
    new PIXI.Container;
    var ta, I, ea;
    this.betManager = function () {
        return ea
    };
    var Ha = function (b, c) {
        var d = 0, m = [];
        if (!b || !c) return m;
        for (; void 0 != b[parseInt(d)];) {
            var k = b[parseInt(d)];
            k.e1.toString().substr(0, 1) == c && m.push({
                comb: k.e1,
                coef: k.koef / 100,
                summ: k.bet / 100,
                win: k.win / 100,
                code: k.code,
                state: k.state,
                phase: k.e2,
                nm: "p" + parseInt(k.e1.toString().substr(1)).toString()
            });
            d++
        }
        return m
    }, V = {red: [], green: [], blue: []}, Ia = function (b, c) {
        a.mainGameManager.gameHistory(function (d) {
            for (var m in PokerObjectsArr) for (var k in b[a.gameConfig[m].editionsHistory]) V[m].push({
                round: b[a.gameConfig[m].editionsHistory][k].tir,
                editionResult: {
                    combination: b[a.gameConfig[m].editionsHistory][k].comb,
                    suite: b[a.gameConfig[m].editionsHistory][k].mast,
                    color: b[a.gameConfig[m].editionsHistory][k].col,
                    winners: b[a.gameConfig[m].editionsHistory][k].wpl.trim().split(" ")
                },
                betsHistory: new Y(Ha(d["history_stol_" + a.gameConfig[a.configType].tableNum][k].betsHistory, a.gameConfig[m].tableNum) || [])
            });
            if (1 != b[a.gameConfig[a.configType].serverResp].bt || 5 != b[a.gameConfig[a.configType].serverResp].st) for (m in PokerObjectsArr) V[m].unshift({
                round: b[a.gameConfig[a.configType].serverResp].tr,
                editionResult: {combination: void 0, suite: void 0, color: void 0, winners: []}, betsHistory: new Y([])
            });
            I = new K(V);
            I.drawEditions();
            c && c()
        })
    }, B = {}, Ca = function (b, c, d, m, k, u) {
        b && (B[c] && (B[c].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), B[c] = (new TWEEN.Tween(b)).to({alpha: 0}, k).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            B[c] = null;
            d && (b.texture = d);
            m && (b.children[0].style = m);
            u && u();
            a.mainRenderer.renderManager.animationTweenInc();
            B[c] = (new TWEEN.Tween(b)).to({alpha: 1}, k).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                B[c] = null
            }).start()
        }).start())
    };
    this.clickAnimationFunc = function (b, c) {
        b && (B[c] && (B[c].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), B[c] = (new TWEEN.Tween(b)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            B[c] = null;
            a.mainRenderer.renderManager.animationTweenInc();
            B[c] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                B[c] = null
            }).start()
        }).start())
    };
    var G = function (b, c, d, m) {
            if (b && 1 != b.alpha) switch (B[c] && (B[c].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), d) {
                case "grow":
                    B[c] = (new TWEEN.Tween(b.scale)).to({
                        x: 1.2,
                        y: 1.2
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        B[c] = null
                    }).start();
                    break;
                default:
                    B[c] = (new TWEEN.Tween(b)).to({alpha: m ? m : .6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        B[c] = null
                    }).start()
            }
        }, H = function (b, c, d) {
            B[c] && (B[c].stop(), a.mainRenderer.renderManager.animationTweenDec());
            if (b && 0 != b.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(), d) {
                case "grow":
                    B[c] = (new TWEEN.Tween(b.scale)).to({
                        x: 1,
                        y: 1
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        B[c] = null
                    }).start();
                    break;
                default:
                    B[c] = (new TWEEN.Tween(b)).to({alpha: 0}, 500).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        B[c] = null
                    }).start()
            }
        }, da = function (b, c, d, m, k) {
            b && (B[c] && B[c].stop(), a.mainRenderer.renderManager.animationTweenInc(), B[c] = (new TWEEN.Tween(b.scale)).to({x: 0}, 330).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                B[c] = null;
                b.scale.y = 1;
                b.texture = d;
                b.children[0].text = m;
                b.children[0].style = k
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                B[c] = null;
                b.texture = d;
                b.children[0].text = m;
                b.children[0].style = k;
                a.mainRenderer.renderManager.animationTweenInc();
                B[c] = (new TWEEN.Tween(b.scale)).to({x: 1}, 330).easing(TWEEN.Easing.Exponential.InOut).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    B[c] = null
                }).start()
            }).start())
        }, Ma = function (b, c, d) {
            if (b.container) {
                B[d] && B[d].stop();
                if (b.onStartClose) b.onStartClose();
                a.mainRenderer.renderManager.animationTweenInc();
                B[d] = (new TWEEN.Tween(b.container.scale)).to({y: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                    if (b.onStopClose) b.onStopClose();
                    if (c.onStopOpen) c.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    B[d] = null;
                    b.container.scale.y = 0;
                    c.container.scale.y = 1
                }).onComplete(function () {
                    if (b.onStopClose) b.onStopClose();
                    a.mainRenderer.renderManager.animationTweenDec();
                    B[d] = null;
                    if (c.onStartOpen) c.onStartOpen();
                    a.mainRenderer.renderManager.animationTweenInc();
                    B[d] = (new TWEEN.Tween(c.container.scale)).to({y: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                        if (b.onStopClose) b.onStopClose();
                        if (c.onStopOpen) c.onStopOpen();
                        a.mainRenderer.renderManager.animationTweenDec();
                        B[d] = null;
                        b.container.scale.y = 0;
                        c.container.scale.y = 1
                    }).onComplete(function () {
                        if (c.onStopOpen) c.onStopOpen();
                        a.mainRenderer.renderManager.animationTweenDec();
                        B[d] = null
                    }).start()
                }).start()
            }
        },
        qa = [["BG_Blue", a.gameDir + "BG-Blue.jpg"], ["BG_Green", a.gameDir + "BG-Green.jpg"], ["BG_Red", a.gameDir + "BG-Red.jpg"], ["BG_Grey", a.gameDir + "BG-Grey.jpg"], ["table_Green", a.gameDir + "table-Green.png"], ["table_Blue", a.gameDir + "table-Blue.png"], ["table_Red", a.gameDir + "table-Red.png"],
            ["roundline_Red", a.gameDir + "roundline-Red2.png"], ["roundline_Green", a.gameDir + "roundline-Green2.png"], ["roundline_Blue", a.gameDir + "roundline-Blue2.png"], ["WIN_BLUE", a.gameDir + "WinJP/Win-Blue-min.png"], ["WIN_GREEN", a.gameDir + "WinJP/Win-Green-min.png"], ["WIN_RED", a.gameDir + "WinJP/Win-Red-min.png"], ["JP_BLUE", a.gameDir + "WinJP/Jackpot-Blue-min.png"], ["JP_GREEN", a.gameDir + "WinJP/Jackpot-Green-min.png"], ["JP_RED", a.gameDir + "WinJP/Jackpot-Red-min.png"], ["jp_name", a.gameDir + "jackpotNG/JackPot.png"], ["jp_num_bot",
                a.gameDir + "jackpotNG/num-bot.png"], ["jp_num_top", a.gameDir + "jackpotNG/num-top.png"], ["footer", a.gameDir + "footer.png"], ["video_frame", a.gameDir + "video-frame.png"], ["timeline_bg", a.gameDir + "timeline-bg.png"], ["timeline", a.gameDir + "timeline.png"], ["chip_selected", a.gameDir + "icons-chip-selected.png"], ["chip_disabled", a.gameDir + "icons-chip-disabled3.png"], ["chip_3d_disabled", a.gameDir + "icons-chip-3d-disabled3.png"], ["chip_1", a.gameDir + "icons_chip_1.png"], ["chip_2", a.gameDir + "icons_chip_2.png"], ["chip_3",
                a.gameDir + "icons_chip_3.png"], ["chip_4", a.gameDir + "icons_chip_4.png"], ["chip_5", a.gameDir + "icons_chip_5.png"], ["chip_6", a.gameDir + "icons_chip_6.png"], ["chip_3d_1", a.gameDir + "icons-chip-3d-1.png"], ["chip_3d_2", a.gameDir + "icons-chip-3d-2.png"], ["chip_3d_3", a.gameDir + "icons-chip-3d-3.png"], ["chip_3d_4", a.gameDir + "icons-chip-3d-4.png"], ["chip_3d_5", a.gameDir + "icons-chip-3d-5.png"], ["chip_3d_6", a.gameDir + "icons-chip-3d-6.png"], ["cards_shirt_Blue", a.gameDir + "cards-shirt-Blue.png"], ["cards_shirt_Green",
                a.gameDir + "cards-shirt-Green.png"], ["cards_shirt_Red", a.gameDir + "cards-shirt-Red.png"], ["combinations_frame", a.gameDir + "combinations-frame.png"], ["cards_frame", a.gameDir + "cards-highlight1.png"], ["cards_frame_mode_selected", a.gameDir + "cards-highlight2.png"], ["cards_bu", a.gameDir + "cards-table-bu.png"], ["cards_ch", a.gameDir + "cards-table-ch.png"], ["cards_tr", a.gameDir + "cards-table-tr.png"], ["cards_pi", a.gameDir + "cards-table-pi.png"], ["btn_clear", a.gameDir + "btn-clear.png"], ["btn_clear_mode_selected", a.gameDir +
            "btn-clear-mode-selected.png"], ["btn_undo", a.gameDir + "btn-undo.png"], ["btn_undo_mode_selected", a.gameDir + "btn-undo-mode-selected.png"], ["btn_home", a.gameDir + "btn-home.png"], ["btn_home_mode_selected", a.gameDir + "btn-home-mode-selected.png"], ["btn_info", a.gameDir + "btn-info.png"], ["btn_info_mode_pressed", a.gameDir + "btn-info-mode-pressed2.png"], ["btn_double", a.gameDir + "btn-double.png"], ["btn_double_mode_selected", a.gameDir + "btn-double-mode-selected.png"], ["btn_bets", a.gameDir + "btn-my-bets.png"], ["btn_bets_mode_pressed",
                a.gameDir + "btn-my-bets-selected.png"], ["btn_game", a.gameDir + "btn-my-bets.png"], ["btn_game_mode_pressed", a.gameDir + "btn-my-bets-selected.png"], ["btn_bet", a.gameDir + "btn-bet.png"], ["btn_bet_mode_selected", a.gameDir + "btn-bet-mode-selected.png"], ["btn_bet_mode_pressed", a.gameDir + "btn-bet-mode-pressed.png"], ["btn_done", a.gameDir + "btn-done.png"], ["btn_done_mode_selected", a.gameDir + "btn-done-mode-selected.png"], ["btn_done_mode_pressed", a.gameDir + "btn-done-mode-pressed.png"], ["btn_xbet", a.gameDir + "btn-xbet.png"],
            ["btn_xbet_mode_selected", a.gameDir + "btn-xbet-mode-selected.png"], ["btn_xbet_mode_pressed", a.gameDir + "btn-xbet-mode-pressed.png"], ["btn_game_4", a.gameDir + "btn-game-4.png"], ["btn_game_6", a.gameDir + "btn-game-6.png"], ["btn_game_8", a.gameDir + "btn-game-8.png"], ["btn_game_4_mode_selected", a.gameDir + "btn-game-4-mode-selected.png"], ["btn_game_6_mode_selected", a.gameDir + "btn-game-6-mode-selected.png"], ["btn_game_8_mode_selected", a.gameDir + "btn-game-8-mode-selected.png"], ["zone_transp", a.gameDir + "zone_transp.png"],
            ["zone_suit_black", a.gameDir + "zone_suit_black.png"], ["zone_suit_red", a.gameDir + "zone_suit_red.png"], ["zone_suit_bu", a.gameDir + "zone_suit_bu.png"], ["zone_suit_ch", a.gameDir + "zone_suit_ch.png"], ["zone_suit_pi", a.gameDir + "zone_suit_pi.png"], ["zone_suit_tr", a.gameDir + "zone_suit_tr.png"], ["zone_transp_win", a.gameDir + "zone_combination_win.png"], ["zone_suit_black_win", a.gameDir + "zone_suit_black_win.png"], ["zone_suit_red_win", a.gameDir + "zone_suit_red_win.png"], ["zone_suit_bu_win", a.gameDir + "zone_suit_bu_win.png"],
            ["zone_suit_ch_win", a.gameDir + "zone_suit_ch_win.png"], ["zone_suit_pi_win", a.gameDir + "zone_suit_pi_win.png"], ["zone_suit_tr_win", a.gameDir + "zone_suit_tr_win.png"], ["zone_suit_bu_history", a.gameDir + "zone_suit_bu_history.png"], ["zone_suit_ch_history", a.gameDir + "zone_suit_ch_history.png"], ["zone_suit_pi_history", a.gameDir + "zone_suit_pi_history.png"], ["zone_suit_tr_history", a.gameDir + "zone_suit_tr_history.png"], ["zone_suit_black_history", a.gameDir + "zone_suit_black_history.png"], ["zone_suit_red_history",
                a.gameDir + "zone_suit_red_history.png"], ["player_hand", a.gameDir + "player.png"], ["zone_table", a.gameDir + "zone_table.png"], ["zone_table_win", a.gameDir + "zone_table_win.png"], ["win_table", a.gameDir + "winTbl.png"], ["win_chip_table", a.gameDir + "win-chip-table2.png"], ["win_chip_combinations", a.gameDir + "win-chip-combinations2.png"], ["history_bg", a.gameDir + "history.png"], ["history_bg2", a.gameDir + "history2.png"], ["btn_close", a.gameDir + "btn-close.png"], ["btn_close_selected", a.gameDir + "btn-close-selected.png"],
            ["bet_arrow", a.gameDir + "arrow.png"], ["bet_arrow_selected", a.gameDir + "arrow-selected.png"], ["tab_history_row", a.gameDir + "tab-history-row.png"], ["tab_history_row_short", a.gameDir + "tab-history-row-short.png"], ["tab_bg", a.gameDir + "tab-bg.png"]],
        ka = {
            main: {x: 503, y: 169, width: 914, height: 655},
            top: {x: 1445, y: 93, width: 914, height: 655},
            bottom: {x: 1445, y: 524, width: 914, height: 655}
        }, T = {width: 116, height: 78, xOffset: 33, yOffset: 42}, Ka = {
            red: [{
                cardPosX1: 550, cardPosX2: 633, cardPosY: 65, cardTexture: "cards_shirt_Red", zonePosX: 492,
                zonePosY: 126, zoneW: 198, zoneH: 69, text: 1, servN: 15, texture: "zone_table"
            }, {
                cardPosX1: 550,
                cardPosX2: 633,
                cardPosY: 531,
                cardTexture: "cards_shirt_Red",
                zonePosX: 492,
                zonePosY: 592,
                zoneW: 198,
                zoneH: 69,
                text: 2,
                servN: 16,
                texture: "zone_table"
            }, {
                cardPosX1: 288,
                cardPosX2: 371,
                cardPosY: 531,
                cardTexture: "cards_shirt_Red",
                zonePosX: 230,
                zonePosY: 592,
                zoneW: 198,
                zoneH: 69,
                text: 3,
                servN: 17,
                texture: "zone_table"
            }, {
                cardPosX1: 288,
                cardPosX2: 371,
                cardPosY: 65,
                cardTexture: "cards_shirt_Red",
                zonePosX: 230,
                zonePosY: 126,
                zoneW: 198,
                zoneH: 69,
                text: 4,
                servN: 18,
                texture: "zone_table"
            }],
            green: [{
                cardPosX1: 550,
                cardPosX2: 633,
                cardPosY: 65,
                cardTexture: "cards_shirt_Green",
                zonePosX: 492,
                zonePosY: 126,
                zoneW: 198,
                zoneH: 69,
                text: 1,
                servN: 15,
                texture: "zone_table"
            }, {
                cardPosX1: 774,
                cardPosX2: 857,
                cardPosY: 265,
                cardTexture: "cards_shirt_Green",
                zonePosX: 716,
                zonePosY: 325,
                zoneW: 198,
                zoneH: 69,
                text: 2,
                servN: 16,
                texture: "zone_table"
            }, {
                cardPosX1: 550,
                cardPosX2: 633,
                cardPosY: 531,
                cardTexture: "cards_shirt_Green",
                zonePosX: 492,
                zonePosY: 592,
                zoneW: 198,
                zoneH: 69,
                text: 3,
                servN: 17,
                texture: "zone_table"
            },
                {
                    cardPosX1: 288,
                    cardPosX2: 371,
                    cardPosY: 531,
                    cardTexture: "cards_shirt_Green",
                    zonePosX: 230,
                    zonePosY: 592,
                    zoneW: 198,
                    zoneH: 69,
                    text: 4,
                    servN: 18,
                    texture: "zone_table"
                }, {
                    cardPosX1: 58,
                    cardPosX2: 141,
                    cardPosY: 265,
                    cardTexture: "cards_shirt_Green",
                    zonePosX: 0,
                    zonePosY: 325,
                    zoneW: 198,
                    zoneH: 69,
                    text: 5,
                    servN: 19,
                    texture: "zone_table"
                }, {
                    cardPosX1: 288,
                    cardPosX2: 371,
                    cardPosY: 65,
                    cardTexture: "cards_shirt_Green",
                    zonePosX: 230,
                    zonePosY: 126,
                    zoneW: 198,
                    zoneH: 69,
                    text: 6,
                    servN: 20,
                    texture: "zone_table"
                }],
            blue: [{
                cardPosX1: 550,
                cardPosX2: 633,
                cardPosY: 65,
                cardTexture: "cards_shirt_Blue",
                zonePosX: 492,
                zonePosY: 126,
                zoneW: 198,
                zoneH: 69,
                text: 1,
                servN: 15,
                texture: "zone_table"
            }, {
                cardPosX1: 774,
                cardPosX2: 857,
                cardPosY: 152,
                cardTexture: "cards_shirt_Blue",
                zonePosX: 716,
                zonePosY: 212,
                zoneW: 198,
                zoneH: 69,
                text: 2,
                servN: 16,
                texture: "zone_table"
            }, {
                cardPosX1: 774,
                cardPosX2: 857,
                cardPosY: 405,
                cardTexture: "cards_shirt_Blue",
                zonePosX: 716,
                zonePosY: 466,
                zoneW: 198,
                zoneH: 69,
                text: 3,
                servN: 17,
                texture: "zone_table"
            }, {
                cardPosX1: 550, cardPosX2: 633, cardPosY: 531, cardTexture: "cards_shirt_Blue",
                zonePosX: 492, zonePosY: 592, zoneW: 198, zoneH: 69, text: 4, servN: 18, texture: "zone_table"
            }, {
                cardPosX1: 288,
                cardPosX2: 371,
                cardPosY: 531,
                cardTexture: "cards_shirt_Blue",
                zonePosX: 230,
                zonePosY: 592,
                zoneW: 198,
                zoneH: 69,
                text: 5,
                servN: 19,
                texture: "zone_table"
            }, {
                cardPosX1: 58,
                cardPosX2: 141,
                cardPosY: 405,
                cardTexture: "cards_shirt_Blue",
                zonePosX: 0,
                zonePosY: 466,
                zoneW: 198,
                zoneH: 69,
                text: 6,
                servN: 20,
                texture: "zone_table"
            }, {
                cardPosX1: 58,
                cardPosX2: 141,
                cardPosY: 152,
                cardTexture: "cards_shirt_Blue",
                zonePosX: 0,
                zonePosY: 212,
                zoneW: 198,
                zoneH: 69,
                text: 7,
                servN: 21,
                texture: "zone_table"
            }, {
                cardPosX1: 288,
                cardPosX2: 371,
                cardPosY: 65,
                cardTexture: "cards_shirt_Blue",
                zonePosX: 230,
                zonePosY: 126,
                zoneW: 198,
                zoneH: 69,
                text: 8,
                servN: 22,
                texture: "zone_table"
            }]
        }, ma = {cardPosY: 325, cardPosX0: 275, cardPosX1: 366, cardPosX2: 457, cardPosX3: 548, cardPosX4: 639},
        P = [{text: "SF", info: "St. Flush", servN: 8}, {text: "FK", info: "4 of a Kind", servN: 7}, {
            text: "FH",
            info: "Full House",
            servN: 6
        }, {text: "Fl", info: "Flush", servN: 5}, {text: "St", info: "Straight", servN: 4}, {
            text: "TK",
            info: "3 of a Kind",
            servN: 3
        },
            {text: "TP", info: "Two Pairs", servN: 2}, {text: "OP", info: "One Pair", servN: 1}, {
                text: "HC",
                info: "High Card",
                servN: 0
            }], ia = [{texture: "zone_suit_pi", info: "Spade", servN: 9}, {
            texture: "zone_suit_ch",
            info: "Heart",
            servN: 10
        }, {texture: "zone_suit_bu", info: "Diamond", servN: 11}, {
            texture: "zone_suit_tr",
            info: "Club",
            servN: 12
        }, {texture: "zone_suit_black", info: "Black", servN: 13}, {texture: "zone_suit_red", info: "Red", servN: 14}],
        pa = {font: "bold 33px Arial Narrow", fill: "#ffffff", align: "bottom-center"}, Ba = {
            font: "bold 40px Arial Narrow",
            fill: "#ffffff", align: "right"
        }, va = {font: "bold 33px Arial Narrow", fill: "#000", align: "bottom-center"},
        La = {font: "bold 40px Arial Narrow", fill: "#000", align: "right"}, Ja = {w: 90, h: 130},
        Aa = {0: "Undefined", 12: "Flop", 13: "Turn", 14: "River"}, S = {
            0: {text: "HC", info: "High Card", gridNumber: 9},
            1: {text: "OP", info: "One Pair", gridNumber: 8},
            2: {text: "TP", info: "Two Pairs", gridNumber: 7},
            3: {text: "TK", info: "3 of a Kind", gridNumber: 6},
            4: {text: "St", info: "Straight", gridNumber: 5},
            5: {text: "Fl", info: "Flush", gridNumber: 4},
            6: {
                text: "FH",
                info: "Full House", gridNumber: 3
            },
            7: {text: "FK", info: "4 of a Kind", gridNumber: 2},
            8: {text: "SF", info: "Street Flush", gridNumber: 1},
            9: {texture: "zone_suit_pi_history", info: "Spade", gridNumber: 1},
            10: {texture: "zone_suit_ch_history", info: "Heart", gridNumber: 2},
            11: {texture: "zone_suit_bu_history", info: "Diamond", gridNumber: 3},
            12: {texture: "zone_suit_tr_history", info: "Club", gridNumber: 4},
            13: {texture: "zone_suit_black_history", info: "Black", gridNumber: 5},
            14: {texture: "zone_suit_red_history", info: "Red", gridNumber: 6},
            15: {
                texture: "player_hand",
                info: "1", gridNumber: 1
            },
            16: {texture: "player_hand", info: "2", gridNumber: 2},
            17: {texture: "player_hand", info: "3", gridNumber: 3},
            18: {texture: "player_hand", info: "4", gridNumber: 4},
            19: {texture: "player_hand", info: "5", gridNumber: 5},
            20: {texture: "player_hand", info: "6", gridNumber: 6},
            21: {texture: "player_hand", info: "7", gridNumber: 7},
            22: {texture: "player_hand", info: "8", gridNumber: 8}
        };
    qa = qa.concat(a.mainFLGAccount.resources);
    qa = qa.concat(ha.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, "images/logo.json",
        qa, function (b, c, d) {
            function m(e, v) {
                if ("main" != a.mainGrid[e + "GridContainerTable"].gridPosition) {
                    a.mainSoundManager.playSound("buttonClick");
                    a.mainGrid[M + "GridContainerTable"].position.x = ka[a.mainGrid[e + "GridContainerTable"].gridPosition].x;
                    a.mainGrid[M + "GridContainerTable"].position.y = ka[a.mainGrid[e + "GridContainerTable"].gridPosition].y - 486;
                    a.mainGrid[M + "GridContainerTable"].scale.set(.5, .5);
                    a.mainGrid[M + "GridContainerTable"].gridPosition = a.mainGrid[e + "GridContainerTable"].gridPosition;
                    a.mainGrid[e +
                    "GridContainerTable"].position.x = ka.main.x;
                    a.mainGrid[e + "GridContainerTable"].position.y = ka.main.y - 486;
                    a.mainGrid[e + "GridContainerTable"].scale.set(1, 1);
                    a.mainGrid[e + "GridContainerTable"].gridPosition = "main";
                    a.mainGrid.activeTable(e + "GridContainerTable");
                    M = e;
                    Ca(a.mainRenderer.stage.getChildByName("BG"), "changeTable", b.resources["BG_" + M.substr(0, 1).toUpperCase() + M.substr(1)].texture, null, 450);
                    Ca(w.game.container.getChildByName("roundline"), "changeRoundline", b.resources["roundline_" + M.substr(0, 1).toUpperCase() +
                    M.substr(1)].texture, null, 500, function () {
                        for (var h = 0; h < w.game.container.getChildByName("roundline").children.length; h++) 0 <= w.game.container.getChildByName("roundline").children[h].name.indexOf("phase") && (w.game.container.getChildByName("roundline").children[h].children[0].style = {
                            font: "bold 30px Arial",
                            fill: a.gameConfig[M].roundTxtColor
                        })
                    });
                    a.mainRenderer.stage.getChildByName("winAnimationSprite") && (a.mainRenderer.stage.getChildByName("winAnimationSprite").texture = a.mainRenderer.resourceLoader.resources["WIN_" +
                    M.toUpperCase()].texture);
                    for (var g in PokerObjectsArr) a.mainGrid[g + "GridContainerCombinations"].visible = g == M ? 1 : 0, a.mainGrid[g + "GridContainerSuites"].visible = g == M ? 1 : 0, a.mainGrid[g + "GridContainerCombinations"].interactive = g == M ? !0 : !1, a.mainGrid[g + "GridContainerSuites"].interactive = g == M ? !0 : !1;
                    a.mainGrid.activeCombinationsGrid(M + "GridContainerCombinations");
                    a.mainGrid.activeSuitesGrid(M + "GridContainerSuites");
                    x.getChildByName("btn_game_4").texture = a.mainRenderer.resourceLoader.resources.btn_game_4.texture;
                    x.getChildByName("btn_game_6").texture = a.mainRenderer.resourceLoader.resources.btn_game_6.texture;
                    x.getChildByName("btn_game_8").texture = a.mainRenderer.resourceLoader.resources.btn_game_8.texture;
                    x.getChildByName("btn_game_4").children[0].style = {font: "30px Arial Narrow", fill: "#d2d2d4"};
                    x.getChildByName("btn_game_6").children[0].style = {font: "30px Arial Narrow", fill: "#d2d2d4"};
                    x.getChildByName("btn_game_8").children[0].style = {font: "30px Arial Narrow", fill: "#d2d2d4"};
                    x.getChildByName("btn_game_4").getChildByName("btn_game_4_mode_selected").visible =
                        !0;
                    x.getChildByName("btn_game_6").getChildByName("btn_game_6_mode_selected").visible = !0;
                    x.getChildByName("btn_game_8").getChildByName("btn_game_8_mode_selected").visible = !0;
                    x.getChildByName("btn_game_" + v).texture = a.mainRenderer.resourceLoader.resources["btn_game_" + v + "_mode_selected"].texture;
                    x.getChildByName("btn_game_" + v).children[0].style = {font: "30px Arial Narrow", fill: "#000000"};
                    x.getChildByName("btn_game_" + v).getChildByName("btn_game_" + v + "_mode_selected").visible = !1;
                    x.getChildByName("btn_game_" +
                        v).getChildByName("btn_game_" + v + "_mode_selected").alpha = 0;
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }

            a.mainRenderer.createButton(void 0, 0, 0, "BG_Grey");
            a.mainRenderer.createButton(void 0, 0, 0, "BG_" + a.gameConfig[a.configType].gameType).name = "BG";
            c = a.mainRenderer.createButton(x, 46, 962, "btn_home");
            a.mainRenderer.createButton(c, 0, 0, "btn_home_mode_selected", void 0, function (e, v) {
                a.mainSoundManager.playSound("buttonClick");
                v.stopped = !0;
                N.clickAnimationFunc(e, "btn_home");
                a.mainFLGAccount.closeGame();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (e) {
                G(e, "btn_home")
            }, function (e) {
                H(e, "btn_home")
            }).alpha = 0;
            APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && c && (c.visible = clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl);
            c = a.mainRenderer.createButton(x, 520, 962, "btn_double");
            a.mainRenderer.createButton(c, 0, 0, "btn_double_mode_selected", void 0, function (e, v) {
                a.mainSoundManager.playSound("stackChip");
                v.stopped = !0;
                w.game.button.emit("mousedown");
                N.clickAnimationFunc(e,
                    "btn_double");
                ea.doubleCurrentBets();
                ua();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (e) {
                G(e, "btn_double")
            }, function (e) {
                H(e, "btn_double")
            }).alpha = 0;
            a.mainRenderer.createButton(x, 555, 1027, void 0, {
                text: mainLocalizationTable.double,
                align: "center",
                style: {font: "20px Arial Narrow", fill: "#d2d2d4"}
            }).name = "btn_double_text";
            c = a.mainRenderer.createButton(x, 426, 962, "btn_undo");
            a.mainRenderer.createButton(c, 0, 0, "btn_undo_mode_selected", void 0, function (e, v) {
                a.mainSoundManager.playSound("buttonClick");
                v.stopped = !0;
                w.game.button.emit("mousedown");
                N.clickAnimationFunc(e, "btn_undo");
                ea.undoGridState();
                ua();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (e) {
                G(e, "btn_undo")
            }, function (e) {
                H(e, "btn_undo")
            }).alpha = 0;
            a.mainRenderer.createButton(x, 453, 1027, void 0, {
                text: mainLocalizationTable.undo,
                align: "center",
                style: {font: "20px Arial Narrow", fill: "#d2d2d4"}
            }).name = "btn_undo_text";
            a.mainRenderer.createButton(x, 1402, 1027, void 0, {
                text: mainLocalizationTable.myBets, align: "center", style: {
                    font: "20px Arial Narrow",
                    fill: "#d2d2d4"
                }
            }).visible = "DEMO" != clientInfoGlobal.hall;
            for (var k in w) {
                switch (k) {
                    case "game":
                        c = a.mainRenderer.createButton(xa, 0, 486, void 0);
                        break;
                    case "bets":
                        c = a.mainRenderer.createButton(xa, 0, 486, void 0);
                        break;
                    case "info":
                        c = a.mainRenderer.createButton(xa, 0, 486, void 0)
                }
                c.name = k;
                c.anchor.set(.5, .5);
                c.scale.y = 0;
                w[k].container = c;
                c = a.mainRenderer.createButton(x, w[k].posX, w[k].posY, "btn_" + k, void 0, function (e, v) {
                    if ("bets" === e.name && FLGUtils && FLGUtils.showGamerHistory) FLGUtils.showGamerHistory(); else if (e.pressed) 1 !=
                    w.game.button.pressed && w.game.button.emit("mousedown"); else {
                        a.mainSoundManager.playSound("buttonClick");
                        e.texture = a.mainRenderer.resourceLoader.resources["btn_" + e.name + "_mode_pressed"].texture;
                        "bets" == e.name && I.betsTable().editionInd != I.editions[a.configType].length - 1 && I.drawDetailEditionHistoryFunc(I.betsTable(), I.editions[a.configType].length - 1);
                        for (var g in w) w[g].button.pressed && (w[g].button.pressed = !1, w[g].button.texture = a.mainRenderer.resourceLoader.resources["btn_" + g].texture, Ma(w[g], w[e.name],
                            "flipContainer"));
                        e.pressed = !0;
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }
                });
                c.name = k;
                c.anchor.set(.5, .5);
                w[k].button = c;
                c.visible = !("bets" == k && "DEMO" == clientInfoGlobal.hall);
                w[k].pressedDefault && (w[k].button.pressed = !0, w[k].container.scale.y = 1)
            }
            a.mainRenderer.createButton(w.game.container, 592, -426, "roundline_" + a.gameConfig[a.configType].gameType).name = "roundline";
            a.mainRenderer.createButton(w.game.container.getChildByName("roundline"), 295, 25, void 0, {
                text: "FLOP", align: "center", style: {
                    font: "bold 30px Arial",
                    fill: a.gameConfig[a.configType].roundTxtColor
                }
            }).name = "phaseFlop";
            a.mainRenderer.createButton(w.game.container.getChildByName("roundline"), 295, 25, void 0, {
                text: "FLOP",
                align: "center",
                style: {font: "bold 30px Arial", fill: "#fff"}
            }).name = "highlightFlop";
            w.game.container.getChildByName("roundline").getChildByName("highlightFlop").alpha = 0;
            a.mainRenderer.createButton(w.game.container.getChildByName("roundline"), 475, 25, void 0, {
                text: "TURN",
                align: "center",
                style: {font: "bold 30px Arial", fill: a.gameConfig[a.configType].roundTxtColor}
            }).name =
                "phaseTurn";
            a.mainRenderer.createButton(w.game.container.getChildByName("roundline"), 475, 25, void 0, {
                text: "TURN",
                align: "center",
                style: {font: "bold 30px Arial", fill: "#fff"}
            }).name = "highlightTurn";
            w.game.container.getChildByName("roundline").getChildByName("highlightTurn").alpha = 0;
            a.mainRenderer.createButton(w.game.container.getChildByName("roundline"), 645, 25, void 0, {
                text: "RIVER",
                align: "center",
                style: {font: "bold 30px Arial", fill: a.gameConfig[a.configType].roundTxtColor}
            }).name = "phaseRiver";
            a.mainRenderer.createButton(w.game.container.getChildByName("roundline"),
                645, 25, void 0, {
                    text: "RIVER",
                    align: "center",
                    style: {font: "bold 30px Arial", fill: "#fff"}
                }).name = "highlightRiver";
            w.game.container.getChildByName("roundline").getChildByName("highlightRiver").alpha = 0;
            a.mainRenderer.createButton(void 0, 0, 944, "footer");
            a.mainFLGAccount.drawAccount(0, 0, a.gameConfig[a.configType], !0);
            A = new PIXI.Graphics;
            A.position.y = 0;
            A.beginFill(0);
            A.drawRect(0, 0, 1920, 28);
            A.endFill;
            c = a.mainRenderer.createButton(A, 960, 14, void 0, {
                text: mainLocalizationTable.placeBets.toUpperCase(), align: "center",
                style: {font: "18px Arial", fill: "#efefef", align: "center"}
            });
            c.anchor.set(.5, .5);
            c = a.mainRenderer.createButton(A, 1838, 14, void 0, {
                text: "00:00",
                align: "center",
                style: {font: "24px Arial", fill: "#efefef", align: "center"}
            });
            c.anchor.set(.5, .5);
            c = a.mainRenderer.createButton(A, 100, 14, void 0, {
                text: "POKER LIVE",
                align: "center",
                style: {font: "18px Arial", fill: "#efefef", align: "center"}
            });
            c.anchor.set(.5, .5);
            A.addChild(new PIXI.Graphics);
            A.children[3].beginFill(42577);
            A.children[3].drawRect(3, 3, 1914, 22);
            A.children[3].endFill;
            c = a.mainRenderer.createButton(A.children[3], 960, 14, void 0, {
                text: mainLocalizationTable.placeBets.toUpperCase(),
                align: "center",
                style: {font: "18px Arial", fill: "#000000", align: "center"}
            });
            c.anchor.set(.5, .5);
            c = a.mainRenderer.createButton(A.children[3], 1838, 14, void 0, {
                text: "00:00",
                align: "center",
                style: {font: "24px Arial", fill: "#000000", align: "center"}
            });
            c.anchor.set(.5, .5);
            c = a.mainRenderer.createButton(A.children[3], 100, 14, void 0, {
                text: "POKER LIVE", align: "center", style: {
                    font: "18px Arial", fill: "#000000",
                    align: "center"
                }
            });
            c.anchor.set(.5, .5);
            c = new PIXI.Graphics;
            c.beginFill();
            c.drawRect(3, 0, 1914, 28);
            c.endFill;
            A.children[3].mask = c;
            A.children[3].parent.addChild(c);
            c = null;
            a.mainRenderer.stage.addChild(A);
            c = a.mainRenderer.createButton(x, 650, 945, "btn_bet", void 0, function (e, v) {
                a.mainSoundManager.playSound("chipSelector");
                v.stopped = !0;
                w.game.button.emit("mousedown");
                e.texture = a.mainRenderer.resourceLoader.resources[e.name + "_mode_pressed"].texture;
                O.incrementBet();
                e.getChildByName("betValue").children[0].text =
                    O.isMaxBet() ? "MAX\n" + O.currentBet() : O.currentBet();
                e.getChildByName("betValue").children[0].scale.set(O.isMaxBet() ? .6 : 1, O.isMaxBet() ? .6 : 1);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (e) {
                e.texture = a.mainRenderer.resourceLoader.resources[e.name + "_mode_selected"].texture;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, function (e) {
                e.texture = a.mainRenderer.resourceLoader.resources[e.name + "_mode_selected"].texture;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, function (e) {
                e.texture =
                    a.mainRenderer.resourceLoader.resources[e.name].texture;
                a.mainRenderer.renderManager.needUpdateRender = !0
            });
            c.hitArea = new PIXI.Rectangle(0, 0, 237, 100);
            a.mainRenderer.createButton(c, 129, 32, void 0, {
                text: O.currentBet(),
                align: "center",
                style: {font: "45px Arial Bold", fill: "#292929", align: "center"}
            }).name = "betValue";
            a.mainRenderer.createButton(c, 129, 75, void 0, {
                text: mainLocalizationTable.bet,
                align: "center",
                style: {font: "30px Arial Narrow", fill: "#000000"}
            });
            c = a.mainRenderer.createButton(x, 960, 945, "btn_xbet_mode_pressed");
            c = a.mainRenderer.createButton(x, 960, 972, "btn_done", void 0, function (e, v) {
                a.mainSoundManager.playSound("buttonClick");
                v && (v.stopped = !0);
                w.game.button.emit("mousedown");
                0 != Object.keys(a.mainGrid.pressedZones).length && (e.interactive = !1, x.getChildByName("btn_clear").children[0].interactive = !1, x.getChildByName("btn_undo").children[0].interactive = !1, x.getChildByName("btn_double").children[0].interactive = !1, a.mainUIManager.sendBets("blue", function () {
                    0 != Object.keys(a.mainGrid.pressedZones).length ? a.mainUIManager.sendBets("green",
                        function () {
                            0 != Object.keys(a.mainGrid.pressedZones).length ? a.mainUIManager.sendBets("red", function () {
                                e.interactive = !0;
                                x.getChildByName("btn_clear").children[0].interactive = !0;
                                x.getChildByName("btn_undo").children[0].interactive = !0;
                                x.getChildByName("btn_double").children[0].interactive = !0;
                                e.texture = a.mainRenderer.resourceLoader.resources[e.name + "_mode_pressed"].texture;
                                a.mainRenderer.renderManager.needUpdateRender = !0
                            }) : (e.interactive = !0, x.getChildByName("btn_clear").children[0].interactive = !0, x.getChildByName("btn_undo").children[0].interactive =
                                !0, x.getChildByName("btn_double").children[0].interactive = !0, e.texture = a.mainRenderer.resourceLoader.resources[e.name + "_mode_pressed"].texture, a.mainRenderer.renderManager.needUpdateRender = !0)
                        }) : (e.interactive = !0, x.getChildByName("btn_clear").children[0].interactive = !0, x.getChildByName("btn_undo").children[0].interactive = !0, x.getChildByName("btn_double").children[0].interactive = !0, e.texture = a.mainRenderer.resourceLoader.resources[e.name + "_mode_pressed"].texture, a.mainRenderer.renderManager.needUpdateRender =
                        !0)
                }));
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (e) {
                e.texture = a.mainRenderer.resourceLoader.resources[e.name + "_mode_selected"].texture;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, function (e) {
                e.texture = a.mainRenderer.resourceLoader.resources[e.name + "_mode_selected"].texture;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, function (e) {
                e.texture = a.mainRenderer.resourceLoader.resources[e.name].texture;
                a.mainRenderer.renderManager.needUpdateRender = !0
            });
            c.anchor.set(.5, .5);
            c = a.mainRenderer.createButton(x, 340, 956, "btn_clear");
            a.mainRenderer.createButton(c, 0, 0, "btn_clear_mode_selected", void 0, function (e, v) {
                a.mainSoundManager.playSound("clearBet");
                v.stopped = !0;
                w.game.button.emit("mousedown");
                N.clickAnimationFunc(e, "btn_clear");
                a.mainFLGAccount.maxWin(0);
                a.mainGrid.removeCurrentBets(!1);
                ea.addGridState();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (e) {
                G(e, "btn_clear")
            }, function (e) {
                H(e, "btn_clear")
            }).alpha = 0;
            a.mainRenderer.createButton(x, 362,
                1027, void 0, {
                    text: mainLocalizationTable.delete,
                    align: "center",
                    style: {font: "20px Arial Narrow", fill: "#d2d2d4"}
                }).name = "btn_clear_text";
            a.mainRenderer.stage.addChild(za);
            a.mainRenderer.stage.addChild(x);
            a.mainRenderer.stage.addChild(xa);
            a.setMainGrid(new PokerGrid(a.gameConfig.combinationsGridPos, a.gameConfig.suitesGridPos, w.game.container, a.mainRenderer));
            var u = function (e, v, g, h) {
                v || (a.mainGrid[h].down = !0);
                if (v && a.mainGrid[h].down || !v && !g || g && (e.name != ta || void 0 == ta)) v = a.mainUIManager.createSmallChip(e,
                    O.currentBet()), e.selected ? (a.mainSoundManager.playSound("stackChip"), a.mainGrid.pressedZones[e.name].bet = v) : (a.mainSoundManager.playSound("firstChip"), e.selected = !0, a.mainGrid.pressedZones[e.name] = {
                    zone: a.mainGrid[h].getChildByName(e.name),
                    bet: v,
                    coef: a.mainGrid[h].getChildByName(e.name).coef,
                    servN: a.mainGrid[h].getChildByName(e.name).servN
                }), ua();
                g && (ta = e.name);
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, r = function (e, v) {
                a.mainGrid[v].down && ea.addGridState();
                a.mainGrid[v].down = !1;
                ta = void 0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            };
            c = function (e, v, g) {
                u(e, v, g, e.parent.name)
            };
            k = function (e) {
                r(e, e.parent.name)
            };
            var f = function (e, v, g) {
                u(e, v, g, e.parent.name)
            }, n = function (e) {
                r(e, e.parent.name)
            }, C = function (e, v, g) {
                u(e, v, g, e.parent.name)
            }, q = function (e) {
                r(e, e.parent.name)
            }, y;
            for (y in PokerObjectsArr) a.mainGrid.createZonesCombinations(116, 78, {
                x: 33,
                y: 42
            }, {
                font: "bold 38px Arial Narrow",
                fill: a.gameConfig[y].numColor,
                align: "top-center"
            }, P, pa, y, a.gameConfig[y].tableNum, function (e) {
                e.name = y + "GridContainerCombinations";
                e.visible = "blue" != y ? 0 : 1;
                e.interactive = "blue" != y ? !1 : !0
            }, c, k, function (e) {
                G(e.getChildByName("frameSprite"), "frameSprite" + e.name)
            }, function (e) {
                H(e.getChildByName("frameSprite"), "frameSprite" + e.name)
            }), a.mainGrid.createZonesSuites(116, 78, {
                x: 33,
                y: 42
            }, {}, ia, pa, y, a.gameConfig[y].tableNum, function (e) {
                e.name = y + "GridContainerSuites";
                e.visible = "blue" != y ? 0 : 1;
                e.interactive = "blue" != y ? !1 : !0;
                var v = e.children[0].position.x, g = e.children[0].position.y;
                e.children[0].position.set(e.children[4].position.x, e.children[4].position.y);
                e.children[4].position.set(e.children[5].position.x, e.children[5].position.y);
                e.children[5].position.set(e.children[2].position.x, e.children[2].position.y);
                e.children[2].position.set(v, g)
            }, f, n, function (e) {
                G(e.getChildByName("frameSprite"), "frameSprite" + e.name)
            }, function (e) {
                H(e.getChildByName("frameSprite"), "frameSprite" + e.name)
            }), a.mainGrid.createTable(Ka[y], {
                    font: "bold 45px Arial Narrow",
                    fill: a.gameConfig[y].numColor,
                    align: "left"
                }, Ba, y, a.gameConfig[y].tableNum, Ja, function (e) {
                    switch (y) {
                        case "blue":
                            e.gridPosition =
                                "main";
                            e.playersCount = 8;
                            M = e.tableColor = "blue";
                            break;
                        case "green":
                            e.gridPosition = "top";
                            e.playersCount = 6;
                            e.tableColor = "green";
                            break;
                        case "red":
                            e.gridPosition = "bottom", e.playersCount = 4, e.tableColor = "red"
                    }
                    e.position.x = ka[e.gridPosition].x;
                    e.position.y = ka[e.gridPosition].y - 486;
                    e.width = ka[e.gridPosition].width;
                    e.height = ka[e.gridPosition].height;
                    e.name = y + "GridContainerTable";
                    var v = a.mainRenderer.createButton(e, 90, 162, "table_" + a.gameConfig[y].gameType, void 0, function (h) {
                        -1 == h.name.toLowerCase().indexOf(M) &&
                        m(e.tableColor, e.playersCount)
                    }), g = a.mainRenderer.createButton(e, 213, 213, "win_table", {
                        text: "",
                        align: "center",
                        style: {font: "bold 30px Arial Narrow", fill: a.gameConfig[y].numColor}
                    });
                    g.alpha = 0;
                    g.getChildByName("textwin_table").position.y = 22;
                    a.mainRenderer.createButton(v, 188, 160, void 0, {
                        text: "FLOP",
                        align: "center",
                        style: {font: "bold 30px Arial Narrow", fill: "#ffffff"}
                    }).alpha = .3;
                    a.mainRenderer.createButton(v, 278, 160, void 0, {
                        text: "FLOP",
                        align: "center",
                        style: {font: "bold 30px Arial Narrow", fill: "#ffffff"}
                    }).alpha =
                        .3;
                    a.mainRenderer.createButton(v, 368, 160, void 0, {
                        text: "FLOP",
                        align: "center",
                        style: {font: "bold 30px Arial Narrow", fill: "#ffffff"}
                    }).alpha = .3;
                    a.mainRenderer.createButton(v, 458, 160, void 0, {
                        text: "TURN",
                        align: "center",
                        style: {font: "bold 30px Arial Narrow", fill: "#ffffff"}
                    }).alpha = .3;
                    a.mainRenderer.createButton(v, 549, 160, void 0, {
                        text: "RIVER",
                        align: "center",
                        style: {font: "bold 30px Arial Narrow", fill: "#ffffff"}
                    }).alpha = .3;
                    v = null;
                    y != a.configType && e.scale.set(.5, .5)
                }, C, q, function (e) {
                    G(e, "enter_cards_frame" + e.name)
                },
                function (e) {
                    H(e, "leave_cards_frame" + e.name)
                });
            c = a.mainRenderer.createButton(x, 1521, 962, "btn_game_4", {
                text: "1",
                align: "center",
                style: {font: "30px Arial Narrow", fill: "#d2d2d4"}
            }, function () {
                1 != w.game.button.pressed && w.game.button.emit("mousedown")
            });
            a.mainRenderer.createButton(c, 0, 0, "btn_game_4_mode_selected", {
                    text: "1",
                    align: "center",
                    style: {font: "30px Arial Narrow", fill: "#d2d2d4"}
                }, function (e, v) {
                    w.game.button.emit("mousedown");
                    v.stopped = !0;
                    m("red", 4);
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0,
                void 0, function (e) {
                    G(e, "btn_game_4_enter")
                }, function (e) {
                    H(e, "btn_game_4_leave")
                }).alpha = 0;
            c = a.mainRenderer.createButton(x, 1625, 962, "btn_game_6", {
                text: "2",
                align: "center",
                style: {font: "30px Arial Narrow", fill: "#d2d2d4"}
            }, function () {
                1 != w.game.button.pressed && w.game.button.emit("mousedown")
            });
            a.mainRenderer.createButton(c, 0, 0, "btn_game_6_mode_selected", {
                text: "2",
                align: "center",
                style: {font: "30px Arial Narrow", fill: "#d2d2d4"}
            }, function (e, v) {
                w.game.button.emit("mousedown");
                v.stopped = !0;
                m("green", 6);
                a.mainRenderer.renderManager.needUpdateRender =
                    !0
            }, void 0, void 0, function (e) {
                G(e, "btn_game_6_enter")
            }, function (e) {
                H(e, "btn_game_6_leave")
            }).alpha = 0;
            a.mainRenderer.createButton(x, 1674, 1027, void 0, {
                text: mainLocalizationTable.tables,
                align: "center",
                style: {font: "20px Arial Narrow", fill: "#ffffff"}
            }).name = "btn_tables_text";
            c = a.mainRenderer.createButton(x, 1726, 962, "btn_game_8", {
                text: "3",
                align: "center",
                style: {font: "30px Arial Narrow", fill: "#d2d2d4"}
            }, function () {
                1 != w.game.button.pressed && w.game.button.emit("mousedown")
            });
            a.mainRenderer.createButton(c, 0,
                0, "btn_game_8_mode_selected", {
                    text: "3",
                    align: "center",
                    style: {font: "30px Arial Narrow", fill: "#d2d2d4"}
                }, function (e, v) {
                    w.game.button.emit("mousedown");
                    v.stopped = !0;
                    m("blue", 8);
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, void 0, function (e) {
                    G(e, "btn_game_8_enter")
                }, function (e) {
                    H(e, "btn_game_8_leave")
                }).alpha = 0;
            x.getChildByName("btn_game_8").texture = a.mainRenderer.resourceLoader.resources.btn_game_8_mode_selected.texture;
            x.getChildByName("btn_game_8").children[0].style = {
                font: "30px Arial Narrow",
                fill: "#000000"
            };
            x.getChildByName("btn_game_8").getChildByName("btn_game_8_mode_selected").visible = !1;
            c = a.mainRenderer.createButton(w.info.container, 36, -451, "tab_bg");
            c.scale.set(1.2, 1);
            a.mainRenderer.createButton(w.info.container, 281, -331, void 0, {
                text: mainLocalizationTable.info,
                align: "center",
                style: {font: "bold 40px Arial", fill: "#ffffff", align: "center"}
            });
            k = ia.slice();
            k.splice(0, 0, k[2]);
            k.splice(4, 0, k[6]);
            k.splice(6, 0, k[1]);
            k.splice(1, 1);
            k.splice(2, 1);
            k.splice(6, 1);
            f = a.gameConfig.suitesGridPos.x + .5 *
                T.width;
            n = a.gameConfig.suitesGridPos.y + .3 * T.height;
            for (y = 0; y < a.gameConfig.suitesGridPos.rows; y++) {
                for (C = 0; C < a.gameConfig.suitesGridPos.cols; C++) c = a.mainRenderer.createButton(na, f, n, k[y * a.gameConfig.suitesGridPos.cols + C].texture + "_history"), c.scale.set(.65, .65), c.anchor.set(.5, .5), a.mainRenderer.createButton(na, f, n + .5 * T.height, null, {
                    text: k[y * a.gameConfig.suitesGridPos.cols + C].info,
                    align: "center",
                    style: {font: "32px Arial Narrow", fill: "#ffffff"}
                }), f += T.width + T.xOffset;
                n += T.height + T.yOffset;
                f = a.gameConfig.suitesGridPos.x +
                    .5 * T.width
            }
            for (y = 0; y < a.gameConfig.combinationsGridPos.rows; y++) {
                for (C = 0; C < a.gameConfig.combinationsGridPos.cols; C++) a.mainRenderer.createButton(na, f, n, null, {
                    text: P[y * a.gameConfig.combinationsGridPos.cols + C].text,
                    align: "center",
                    style: {font: "bold 40px Arial Narrow", fill: "#ffb100", align: "top-center"}
                }), a.mainRenderer.createButton(na, f, n + .5 * T.height, null, {
                    text: P[y * a.gameConfig.combinationsGridPos.cols + C].info,
                    align: "center",
                    style: {font: "32px Arial Narrow", fill: "#ffffff"}
                }), f += T.width + T.xOffset;
                n += T.height +
                    T.yOffset;
                f = a.gameConfig.combinationsGridPos.x + .5 * T.width
            }
            k = null;
            na.position.set(50, 0);
            w.info.container.addChild(na);
            c = null;
            a.mainRenderer.stage.on("changeLang", wa);
            a.mainGameManager.gameStateAsync(function (e) {
                Ia(e, function () {
                    ea = new F(a);
                    for (var v in PokerObjectsArr) a.mainGrid.drawTableCards(e[a.gameConfig[v].serverResp].p, v), e[a.gameConfig[v].serverResp].dk && a.mainGrid.drawZonesCoefs(e[a.gameConfig[v].serverResp].dk.split(" "), e[a.gameConfig[v].serverResp].p, v), e[a.gameConfig[v].serverResp].d && a.mainGrid.drawTableDeeler(ma,
                        e[a.gameConfig[v].serverResp].d.split(" "), v, da, G, H);
                    ha.drawCustomJackpot(function (g, h) {
                        var t = w.game.container.getChildByName("JackpotContainer"),
                            l = formatFLGNums(h.toFixed(2), !0);
                        if (t) {
                            var D = t.children[1];
                            t = t.children[2]
                        } else t = a.mainRenderer.createButton(w.game.container, 88, -428), t.name = "JackpotContainer", t.anchor.set(.5, .5), a.mainRenderer.createButton(t, 48, 24, "jp_name").anchor.set(0, .5), D = a.mainRenderer.createButton(t, 0, 56), D.anchor.set(0, .5), t = a.mainRenderer.createButton(t, 0, 118), t.anchor.set(0,
                            .5);
                        for (var z = 0; z < D.children.length; z++) D.children[z].visible = !1;
                        h = 0;
                        z = l.length - 1;
                        for (var ja = 0; 0 <= z; z--, ja++) {
                            var p = D.children[ja];
                            var E = "." !== l[z] && " " !== l[z];
                            if (p) p.visible = !0, p.position.x = h, E || (p.position.x = p.position.x + D.children[0].width - 1), E && p.children[0].children[0].text !== l[z] && (p.children[0].children[1].text = l[z], a.mainRenderer.renderManager.animationTweenInc(), (new TWEEN.Tween({
                                firstPosY: p.children[0].children[0].position.y,
                                secondPosY: p.children[0].children[1].position.y,
                                numberSprite: D.children[ja]
                            })).to({
                                firstPosY: p.children[0].children[0].position.y -
                                    p.height, secondPosY: p.children[0].children[1].position.y - p.height
                            }, 865).onUpdate(function () {
                                this.numberSprite.children[0].children[0].position.y = this.firstPosY;
                                this.numberSprite.children[0].children[1].position.y = this.secondPosY
                            }).onComplete(function () {
                                this.numberSprite.children[0].children[0].text = this.numberSprite.children[0].children[1].text;
                                this.numberSprite.children[0].children[0].position.y = 0;
                                this.numberSprite.children[0].children[1].position.y = this.numberSprite.height;
                                a.mainRenderer.renderManager.animationTweenDec()
                            }).start());
                            else if (E) {
                                p = a.mainRenderer.createButton(D, h, 0, "jp_num_bot");
                                E = a.mainRenderer.createButton(p, p.width / 2, p.height / 2);
                                E.anchor.set(.5, .5);
                                var Q = new PIXI.Text(l[z], {
                                    font: "bold 38px Arial",
                                    fill: "#000000",
                                    align: "center"
                                });
                                Q.anchor.set(.5, .5);
                                E.addChild(Q);
                                Q = new PIXI.Text(l[z], {font: "bold 38px Arial", fill: "#000000", align: "center"});
                                Q.position.y = p.height;
                                Q.anchor.set(.5, .5);
                                E.addChild(Q);
                                Q = new PIXI.Graphics;
                                Q.beginFill();
                                Q.drawRect(0, 0, p.width, p.height);
                                Q.endFill;
                                E.mask = Q;
                                E.parent.addChild(Q);
                                Q = null;
                                a.mainRenderer.createButton(p,
                                    0, 0, "jp_num_top");
                                Q = E = null
                            } else p = a.mainRenderer.createButton(D, h + D.children[0].width - 1, 36, void 0, {
                                text: " " === l[z] ? "," : l[z],
                                align: "center",
                                style: {font: "bold 38px Arial", fill: "#fefefe", align: "center"}
                            });
                            ja !== l.length - 1 && (h -= p.width, h -= 6, D.position.x = -h)
                        }
                        h = 0;
                        z = D.position.x + D.children[0].width;
                        D = .8 * z / 10;
                        l = .2 * z / 9;
                        for (z = 0; 10 > z; z++) {
                            p = t.children[z];
                            switch (z) {
                                case 0:
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                    var L = 65280;
                                    break;
                                case 7:
                                case 8:
                                    L = 15973429;
                                    break;
                                case 9:
                                    L = 15352834
                            }
                            p ? (p.clear(), p.beginFill(L), p.drawRect(h,
                                0, D, 4), p.endFill) : (p = new PIXI.Graphics, p.beginFill(L), p.drawRect(h, 0, D, 4), p.endFill, t.addChild(p));
                            h += D + l;
                            p.visible = z <= parseInt(g)
                        }
                        p = null;
                        a.mainRenderer.renderManager.needUpdateRender = !0;
                        t = t = null
                    });
                    ha.updateJackpotData(e);
                    for (v in PokerObjectsArr) a.mainUIManager.setInteraction(!1, v);
                    la(e);
                    d && d()
                })
            })
        }, function () {
            a.mainRenderer.renderManager.needUpdateRender = !0;
            a.mainSoundManager.playRandomBackSound()
        });
    var wa = function () {
        a.mainFLGAccount.updateAccountText();
        a.mainRenderer.stage.getChildByName("btn_clear_text").text =
            mainLocalizationTable.delete;
        a.mainRenderer.stage.getChildByName("btn_undo_text").text = mainLocalizationTable.undo;
        a.mainRenderer.stage.getChildByName("btn_double_text").text = mainLocalizationTable.double;
        a.mainRenderer.stage.getChildByName("btn_tables_text").text = mainLocalizationTable.tables;
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.onLanguageChange = wa;
    var Da = function (b) {
        a.mainRenderer.stage.visible && (13 == b.keyCode || 32 == b.keyCode) && x && (b = x.getChildByName("btn_done")) && b.interactive && (b.emit("mousedown"),
            b.emit("mouseup"))
    };
    window.addEventListener("keydown", Da);
    this.setInteraction = function (b, c) {
        x.getChildByName("btn_clear").children[0].interactive = b;
        x.getChildByName("btn_undo").children[0].interactive = b;
        x.getChildByName("btn_double").children[0].interactive = b;
        x.getChildByName("btn_done").interactive = b;
        A.children[3].children[0].visible = b;
        a.mainUIManager.setInteractionTable(c, b);
        a.mainGrid[c + "GridContainerCombinations"].interactive = b;
        a.mainGrid[c + "GridContainerSuites"].interactive = b;
        for (var d in a.mainGrid[c +
        "GridContainerCombinations"].children) a.mainGrid[c + "GridContainerCombinations"].children[d].interactive = b, a.mainGrid[c + "GridContainerCombinations"].children[d].buttonMode = b, a.mainGrid[c + "GridContainerCombinations"].children[d].getChildByName("frameSprite").visible = b;
        for (d in a.mainGrid[c + "GridContainerSuites"].children) a.mainGrid[c + "GridContainerSuites"].children[d].interactive = b, a.mainGrid[c + "GridContainerSuites"].children[d].buttonMode = b, a.mainGrid[c + "GridContainerSuites"].children[d].getChildByName("frameSprite").visible =
            b;
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.setInteractionTable = function (b, c) {
        a.mainGrid[b + "GridContainerTable"].interactive = c;
        for (var d in a.mainGrid[b + "GridContainerTable"].children) -1 != a.mainGrid[b + "GridContainerTable"].children[d].name.indexOf("cards_frame") ? (a.mainGrid[b + "GridContainerTable"].children[d].children[0].interactive = c, a.mainGrid[b + "GridContainerTable"].children[d].children[0].buttonMode = c, a.mainGrid[b + "GridContainerTable"].children[d].children[0].visible = c) : -1 != a.mainGrid[b +
        "GridContainerTable"].children[d].name.indexOf(b + "GridContainerTable") && (a.mainGrid[b + "GridContainerTable"].children[d].interactive = c, a.mainGrid[b + "GridContainerTable"].children[d].buttonMode = c)
    };
    this.sendBets = function (b, c) {
        var d = a.mainUIManager.getFortuneObjectsByGrid(b);
        d.length ? I.getActedOutEdition(b).betsHistory.addBet({
            fortuneBetObjArr: d,
            code: void 0
        }, I.getActedOutEdition(b).round, function (m) {
            if (m) {
                for (var k in a.mainGrid.pressedZones) if (-1 != k.indexOf(b)) {
                    a.mainGrid.selectedZones[k] = {};
                    for (var u in a.mainGrid.pressedZones[k]) a.mainGrid.selectedZones[k][u] =
                        a.mainGrid.pressedZones[k][u];
                    m = a.mainGrid.selectedZones[k].zone;
                    for (var r = -1, f = 0; f < m.children.length; f++) if ("spriteDisabled" == m.children[f].name && !m.children[f].visible) {
                        m.children[f].disabled = !0;
                        m.children[f].visible = !0;
                        r = f;
                        break
                    }
                    if (0 > r) {
                        for (f = m.children.length - 1; 0 <= f && "smallChipText" != m.children[f].name; f--) ;
                        r = f + 1;
                        f = -1 != k.indexOf("GridContainerTable") ? !0 : !1;
                        m.addChildAt(new PIXI.Sprite(a.mainRenderer.resourceLoader.resources[f ? "chip_3d_disabled" : "chip_disabled"].texture), r);
                        m.children[r].position.y =
                            m.children[r - 2].position.y;
                        m.children[r].position.x = m.children[r - 2].position.x;
                        m.children[r].anchor.x = .5;
                        m.children[r].anchor.y = .5;
                        m.children[r].name = "spriteDisabled";
                        m.children[r].disabled = !0
                    }
                    m.children[r - 2].disabled = !0;
                    m.children[r - 1].disabled = !0
                }
                I.drawDetailEditionHistoryFunc(I.betsTable(), I.editions[a.configType].length - 1);
                k = a.mainGrid.removeCurrentBets(b, !0);
                0 != k && a.mainFLGAccount.totalBet(k, !0);
                a.mainFLGAccount.maxWin(0);
                ea.clearGridStates()
            }
            c && c()
        }) : Ga = setTimeout(c, 100)
    };
    this.getZoneNameByCombinationCode =
        function (b, c) {
            if (!c) switch (parseInt(b.toString().substr(0, 1))) {
                case 1:
                    c = "red";
                    break;
                case 2:
                    c = "green";
                    break;
                default:
                    c = "blue"
            }
            b = parseInt(b.toString().substr(1));
            return 15 <= b ? S[b].gridNumber + c + "GridContainerTable" : 9 <= b ? S[b].gridNumber + c + "GridContainerSuites" : S[b].gridNumber + c + "GridContainerCombinations"
        };
    this.getChipTextureByBet = function (b, c) {
        var d;
        for (d = O.possibleBets.length - 1; 0 <= d; d--) if (O.possibleBets[d].toString().replace(/\D+/, "") <= b) return a.mainRenderer.resourceLoader.resources[(c ? "chip_3d_" :
            "chip_") + (d + 1)].texture;
        return a.mainRenderer.resourceLoader.resources[c ? "chip_3d_1" : "chip_1"].texture
    };
    this.createSmallChip = function (b, c) {
        for (var d = null != b.parent.name && -1 != b.parent.name.indexOf("GridContainerTable") ? !0 : !1, m = -1, k = 0; k < b.children.length; k++) if (!("smallChip" != b.children[k].name || b.children[k].visible && b.children[k].disabled)) {
            if (parseFloat(b.children[k + 1].text) + c <= W) b.children[k + 1].text = +parseFloat(parseFloat(b.children[k + 1].text) + c).toFixed(10), N.setTextScale(b.children[k + 1], d ? 1.2 :
                1, d ? .75 : 1), b.children[k].visible = !0, b.children[k + 1].visible = !0, b.children[k].disabled = !1, b.children[k + 1].disabled = !1, b.children[k].texture = a.mainUIManager.getChipTextureByBet(parseFloat(b.children[k + 1].text), d); else return a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet), +parseFloat(b.children[k + 1].text).toFixed(10);
            m = k;
            break
        }
        if (0 > m) {
            var u = new PIXI.Sprite(a.mainUIManager.getChipTextureByBet(c, d));
            c = new PIXI.Text(c, {font: "bold 27px Myriad Pro", fill: "#000000"});
            c.name = "smallChipText";
            u.name = "smallChip";
            if (b.getChildByName("spriteDisabled")) {
                for (k = b.children.length - 1; 0 <= k && ("spriteDisabled" != b.children[k].name || !b.children[k].disabled || !b.children[k].visible); k--) ;
                m = k + 1
            } else m = d ? 2 : 0;
            b.addChildAt(u, m);
            b.addChildAt(c, m + 1);
            b.children[m].anchor.x = .5;
            b.children[m].anchor.y = .5;
            b.children[m + 1].anchor.x = .5;
            b.children[m + 1].anchor.y = d ? .65 : .6;
            N.setTextScale(b.children[m + 1], d ? 1.2 : 1, d ? .75 : 1);
            b.children[m].position.y = d ? b.getChildByName("zoneBg").height / 2 - 2 * m : -b.getChildByName("zoneBg").height /
                10;
            b.children[m].position.x = d ? b.getChildByName("zoneBg").width / 4 : b.getChildByName("zoneBg").width / 2 - 2 * m;
            b.children[m + 1].position.y = d ? b.getChildByName("zoneBg").height / 2 - 2 * (m + 1) : -b.getChildByName("zoneBg").height / 10;
            b.children[m + 1].position.x = d ? b.getChildByName("zoneBg").width / 4 : b.getChildByName("zoneBg").width / 2 - 2 * m
        }
        return +parseFloat(b.children[m + 1].text).toFixed(10)
    };
    this.setTextScale = function (b, c, d) {
        if (0 <= b.text.indexOf("MAX")) b.scale.set(.5, .5); else switch (c ||= 1, d ||= 1, b.text.length) {
            case 5:
                b.scale.set(.5 *
                    c, .5 * c * d);
                break;
            case 4:
                b.scale.set(.6 * c, .6 * c * d);
                break;
            case 3:
                "MAX" == b.text ? b.scale.set(.65 * c, .65 * c * d) : b.scale.set(.75 * c, .75 * c * d);
                break;
            default:
                b.scale.set(1 * c, 1 * c * d)
        }
    };
    var ua = function () {
        var b = {
            redGridContainerTable: 0,
            redGridContainerCombinations: 0,
            redGridContainerSuites: 0,
            redGridContainerColors: 0,
            greenGridContainerTable: 0,
            greenGridContainerCombinations: 0,
            greenGridContainerSuites: 0,
            greenGridContainerColors: 0,
            blueGridContainerTable: 0,
            blueGridContainerCombinations: 0,
            blueGridContainerSuites: 0,
            blueGridContainerColors: 0
        };
        if (0 != Object.keys(a.mainGrid.pressedZones).length) for (var c in a.mainGrid.pressedZones) for (var d in b) if (0 <= c.indexOf(d)) if (0 <= c.indexOf("GridContainerSuites") && (0 <= c.indexOf("5") || 0 <= c.indexOf("6"))) {
            var m = a.mainGrid.pressedZones[c].zone.parent.name.replace("Suites", "Colors");
            b[m] < a.mainGrid.pressedZones[c].bet * a.mainGrid.pressedZones[c].coef && (b[m] = a.mainGrid.pressedZones[c].bet * a.mainGrid.pressedZones[c].coef)
        } else b[d] < a.mainGrid.pressedZones[c].bet * a.mainGrid.pressedZones[c].coef && (b[d] = a.mainGrid.pressedZones[c].bet *
            a.mainGrid.pressedZones[c].coef);
        m = 0;
        for (c in b) m += b[c];
        a.mainFLGAccount.maxWin(m)
    };
    this.getFortuneObjectsByGrid = function (b) {
        var c = [], d;
        for (d in a.mainGrid.pressedZones) (0 == b || b && -1 != d.indexOf(b)) && c.push({
            comb: a.mainGrid.pressedZones[d].servN,
            coef: a.mainGrid.pressedZones[d].coef,
            summ: parseFloat(a.mainGrid.pressedZones[d].bet),
            name: a.mainGrid.pressedZones[d].zone.name
        });
        return c
    };
    this.getTotalSumByGrid = function () {
        var b = 0, c;
        for (c in a.mainGrid.pressedZones) b += +parseFloat(a.mainGrid.pressedZones[c].bet).toFixed(10);
        return b
    };
    this.isAllowBet = function (b, c, d) {
        return parseFloat(c) > W ? (d ? (d.betErrorCount++, d.betErrorFunc || (d.betErrorFunc = function () {
            a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet)
        })) : a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet), !1) : N.getTotalSumByGrid() + parseFloat(b.summ) > clientInfoGlobal.cfstolmax / 100 ? (a.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBetGame), !1) : !0
    };
    this.sortNumeric = function (b, c) {
        if (b > c) return 1;
        if (b < c) return -1
    };
    var sa = 0, Ea = 0, Fa =
        0, Ga = 0, X, ca, ba, aa, oa, Z, ya, la = function (b) {
        function c(r) {
            a.mainGameManager && (A.children[3].mask.clear(), A.children[3].mask.beginFill(), A.children[3].mask.drawRect(3, 0, 1914 * r, 28), A.children[3].mask.endFill, r = fa.getTimerText(), r !== u && (A.children[3].children[1].children[0].text = r, u = A.children[1].children[0].text = r), a.mainRenderer.renderManager.needUpdateRender = !0)
        }

        function d(r) {
            if (a.mainGameManager) {
                A.children[3].clear();
                A.children[3].beginFill(42577);
                A.children[3].drawRect(3, 3, 1914, 22);
                A.children[3].endFill;
                for (var f in PokerObjectsArr) a.mainUIManager.setInteraction(!0, f);
                fa.start({minutes: 0, seconds: r.t2 - r[a.gameConfig[a.configType].serverResp].t1}, {
                        minutes: 0,
                        seconds: a.gameConfig[a.configType]["tirTimeSt" + r[a.gameConfig[a.configType].serverResp].st]
                    }, c, function () {
                        for (var n in PokerObjectsArr) a.mainUIManager.setInteraction(!1, n);
                        a.mainGrid.removeCurrentBets(!1);
                        a.mainFLGAccount.maxWin(0);
                        ea.clearGridStates();
                        A.children[3].clear();
                        A.children[3].beginFill(12531501);
                        A.children[3].drawRect(3, 3, 1914, 22);
                        A.children[3].endFill
                    },
                    5, la);
                switch (r[a.gameConfig[a.configType].serverResp].st) {
                    case 12:
                        a.mainFLGAccount.setWinTextVisible(!0);
                        a.mainGrid.removeSelectedBets();
                        a.mainGrid.removeCurrentBets(!1);
                        I.addEdition(r[a.gameConfig[a.configType].serverResp].tr);
                        I.drawDetailEditionHistoryFunc(I.betsTable(), I.editions[a.configType].length - 1);
                        w.game.container.getChildByName("roundline").getChildByName("roundText").children[0].text = "#" + r[a.gameConfig[a.configType].serverResp].tr;
                        G(w.game.container.getChildByName("roundline").getChildByName("highlightFlop"),
                            "highlightFlop", void 0, 1);
                        for (f in PokerObjectsArr) a.mainGrid.drawTableCards(r[a.gameConfig[f].serverResp].p, f, da), r[a.gameConfig[f].serverResp].dk && a.mainGrid.drawZonesCoefs(r[a.gameConfig[f].serverResp].dk.split(" "), r[a.gameConfig[f].serverResp].p, f);
                        break;
                    case 13:
                        H(w.game.container.getChildByName("roundline").getChildByName("highlightFlop"), "highlightFlop");
                        G(w.game.container.getChildByName("roundline").getChildByName("highlightTurn"), "highlightTurn", void 0, 1);
                        for (f in PokerObjectsArr) r[a.gameConfig[f].serverResp].d &&
                        a.mainGrid.drawTableDeeler(ma, r[a.gameConfig[f].serverResp].d.split(" "), f, da, G, H), r[a.gameConfig[f].serverResp].dk && a.mainGrid.drawZonesCoefs(r[a.gameConfig[f].serverResp].dk.split(" "), r[a.gameConfig[f].serverResp].p, f);
                        break;
                    case 14:
                        for (f in H(w.game.container.getChildByName("roundline").getChildByName("highlightTurn"), "highlightTurn"), G(w.game.container.getChildByName("roundline").getChildByName("highlightRiver"), "highlightRiver", void 0, 1), PokerObjectsArr) r[a.gameConfig[f].serverResp].d && a.mainGrid.drawTableDeeler(ma,
                            r[a.gameConfig[f].serverResp].d.split(" "), f, da, G, H), r[a.gameConfig[f].serverResp].dk && a.mainGrid.drawZonesCoefs(r[a.gameConfig[f].serverResp].dk.split(" "), r[a.gameConfig[f].serverResp].p, f)
                }
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }

        function m() {
            function r(f) {
                if (a.mainGameManager) switch (f[a.gameConfig[a.configType].serverResp].st) {
                    case 12:
                        for (var n in PokerObjectsArr) a.mainGrid.drawTableDeeler(ma, f[a.gameConfig[n].serverResp].d.split(" "), n, da, G, H);
                        a.mainRenderer.renderManager.needUpdateRender =
                            !0;
                        sa = setTimeout(la, 300);
                        break;
                    case 13:
                        for (n in PokerObjectsArr) a.mainGrid.drawTableDeeler(ma, f[a.gameConfig[n].serverResp].d.split(" "), n, da, G, H);
                        a.mainRenderer.renderManager.needUpdateRender = !0;
                        sa = setTimeout(la, 300);
                        break;
                    case 14:
                        sa = setTimeout(la, 300);
                        break;
                    case 5:
                        H(w.game.container.getChildByName("roundline").getChildByName("highlightRiver"), "highlightRiver");
                        for (n in PokerObjectsArr) f[a.gameConfig[n].serverResp].d && a.mainGrid.drawTableDeeler(ma, f[a.gameConfig[n].serverResp].d.split(" "), n, da,
                            G, H);
                        a.mainRenderer.renderManager.needUpdateRender = !0;
                        if (f["history_stol_" + a.gameConfig[a.configType].tableNum][0].tir == f[a.gameConfig[a.configType].serverResp].tr) {
                            if (a.mainFLGAccount) {
                                for (n in PokerObjectsArr) {
                                    a.mainGrid[n + "GridContainerTable"].getChildByName("win_table").children[0].text = P[8 - f[a.gameConfig[n].serverResp].w].text + " - " + P[8 - f[a.gameConfig[n].serverResp].w].info;
                                    G(a.mainGrid[n + "GridContainerTable"].getChildByName("win_table"), n + "win_table", void 0, 1);
                                    aa = parseInt(f["history_stol_" +
                                    a.gameConfig[n].tableNum][0].comb.trim());
                                    G(a.mainGrid[n + "GridContainerCombinations"].getChildByName(9 - aa + n + "GridContainerCombinations").getChildByName("zoneBg").getChildByName("winSprite"), 9 - aa + n + "GridContainerCombinationsWin", void 0, 1);
                                    a.mainGrid[n + "GridContainerCombinations"].getChildByName(9 - aa + n + "GridContainerCombinations").getChildByName("zoneBg").getChildByName("zoneCoef").style = va;
                                    X = f["history_stol_" + a.gameConfig[n].tableNum][0].wpl.trim().split(" ");
                                    for (var C = 0; C < X.length; C++) G(a.mainGrid[n +
                                    "GridContainerTable"].getChildByName(X[C].substr(-1) + n + "GridContainerTable").getChildByName("zoneBg").getChildByName("winSprite"), X[C].substr(-1) + n + "GridContainerTableWin", void 0, 1), a.mainGrid[n + "GridContainerTable"].getChildByName(X[C].substr(-1) + n + "GridContainerTable").getChildByName("zoneBg").getChildByName("zoneCoef").style = La;
                                    ba = parseInt(f["history_stol_" + a.gameConfig[n].tableNum][0].mast.trim());
                                    G(a.mainGrid[n + "GridContainerSuites"].getChildByName(ba - 8 + n + "GridContainerSuites").getChildByName("zoneBg").getChildByName("winSprite"),
                                        ba - 8 + n + "GridContainerSuitesWin", void 0, 1);
                                    a.mainGrid[n + "GridContainerSuites"].getChildByName(ba - 8 + n + "GridContainerSuites").getChildByName("zoneBg").getChildByName("zoneCoef").style = va;
                                    ca = parseInt(f["history_stol_" + a.gameConfig[n].tableNum][0].col.trim());
                                    G(a.mainGrid[n + "GridContainerSuites"].getChildByName((13 == ca ? 5 : 6) + n + "GridContainerSuites").getChildByName("zoneBg").getChildByName("winSprite"), (14 == ca ? 5 : 6) + n + "GridContainerSuitesWin", void 0, 1);
                                    a.mainGrid[n + "GridContainerSuites"].getChildByName((13 ==
                                    ca ? 5 : 6) + n + "GridContainerSuites").getChildByName("zoneBg").getChildByName("zoneCoef").style = va;
                                    oa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                    oa[ca] = 1;
                                    oa[ba] = 1;
                                    oa[aa] = 1;
                                    a.mainGrid.drawZonesCoefs(oa, f[a.gameConfig[n].serverResp].p, n, !0);
                                    a.mainRenderer.renderManager.needUpdateRender = !0
                                }
                                ya = {red: void 0, green: void 0, blue: void 0};
                                for (n in PokerObjectsArr) ya[n] = {
                                    combination: f[a.gameConfig[n].editionsHistory][0].comb,
                                    suite: f[a.gameConfig[n].editionsHistory][0].mast,
                                    color: f[a.gameConfig[n].editionsHistory][0].col,
                                    winners: f[a.gameConfig[n].editionsHistory][0].wpl.trim().split(" ")
                                };
                                a.mainGrid.removeSelectedBets();
                                a.mainGrid.removeCurrentBets(!1);
                                Z = 1E3 * (a.gameConfig[a.configType].tirTimeSt5 - f.t2 + f[a.gameConfig[a.configType].serverResp].t1);
                                Z = 3E3 < Z ? Z : 3E3;
                                Fa = setTimeout(function () {
                                    for (var q in PokerObjectsArr) {
                                        H(a.mainGrid[q + "GridContainerTable"].getChildByName("win_table"), q + "win_table");
                                        aa = parseInt(f["history_stol_" + a.gameConfig[q].tableNum][0].comb.trim());
                                        H(a.mainGrid[q + "GridContainerCombinations"].getChildByName(9 - aa + q + "GridContainerCombinations").getChildByName("zoneBg").getChildByName("winSprite"),
                                            9 - aa + q + "GridContainerCombinationsWin");
                                        a.mainGrid[q + "GridContainerCombinations"].getChildByName(9 - aa + q + "GridContainerCombinations").getChildByName("zoneBg").getChildByName("zoneCoef").style = pa;
                                        X = f["history_stol_" + a.gameConfig[q].tableNum][0].wpl.trim().split(" ");
                                        for (var y = 0; y < X.length; y++) H(a.mainGrid[q + "GridContainerTable"].getChildByName(X[y].substr(-1) + q + "GridContainerTable").getChildByName("zoneBg").getChildByName("winSprite"), X[y].substr(-1) + q + "GridContainerTableWin"), a.mainGrid[q + "GridContainerTable"].getChildByName(X[y].substr(-1) +
                                            q + "GridContainerTable").getChildByName("zoneBg").getChildByName("zoneCoef").style = Ba;
                                        ba = parseInt(f["history_stol_" + a.gameConfig[q].tableNum][0].mast.trim());
                                        H(a.mainGrid[q + "GridContainerSuites"].getChildByName(ba - 8 + q + "GridContainerSuites").getChildByName("zoneBg").getChildByName("winSprite"), parseInt(ba) - 8 + q + "GridContainerSuitesWin");
                                        a.mainGrid[q + "GridContainerSuites"].getChildByName(ba - 8 + q + "GridContainerSuites").getChildByName("zoneBg").getChildByName("zoneCoef").style = pa;
                                        ca = f["history_stol_" + a.gameConfig[q].tableNum][0].col.trim();
                                        H(a.mainGrid[q + "GridContainerSuites"].getChildByName((13 == ca ? 5 : 6) + q + "GridContainerSuites").getChildByName("zoneBg").getChildByName("winSprite"), (14 == ca ? 5 : 6) + q + "GridContainerSuitesWin");
                                        a.mainGrid[q + "GridContainerSuites"].getChildByName((13 == ca ? 5 : 6) + q + "GridContainerSuites").getChildByName("zoneBg").getChildByName("zoneCoef").style = pa;
                                        a.mainGrid.drawTableCards(a.gameConfig[q].emptyP, q, da);
                                        a.mainGrid.drawZonesCoefs([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], a.gameConfig[q].emptyP, q);
                                        a.mainGrid.drawTableDeeler(ma,
                                            [55, 55, 55, 55, 55], q, da, G, H);
                                        a.mainRenderer.renderManager.needUpdateRender = !0
                                    }
                                    I.highlightWinBets(0)
                                }, Z - 3E3);
                                a.mainFLGAccount.calculateWin(I.getActedOutEdition("blue").betsHistory.bets.concat(I.getActedOutEdition("green").betsHistory.bets.concat(I.getActedOutEdition("red").betsHistory.bets)), a.gameConfig.appName, function (q) {
                                    ha.updateJackpotData(f);
                                    ha.drawJackpotWin(2E4, {
                                        x: 420,
                                        y: 760
                                    }, a.mainRenderer.resourceLoader.resources["JP_" + M.toUpperCase()].texture);
                                    I.cancelLastEdition(ya);
                                    I.calculateWinBets(ya);
                                    I.highlightWinBets(1);
                                    I.drawDetailEditionHistoryFunc(I.betsTable(), I.editions[a.configType].length - 1);
                                    a.mainFLGAccount.winToBalanceAnimation(8E3 < Z ? Z - 8E3 : Z, 2E3, {
                                        x: 420,
                                        y: 760
                                    }, a.mainRenderer.resourceLoader.resources["WIN_" + M.toUpperCase()].texture, {
                                        font: "bold 70px Arial",
                                        fill: "#bcbcbc"
                                    }, ha.jpWin())
                                }, a.gameConfig);
                                a.mainFLGAccount.setWinTextVisible(!1);
                                a.mainFLGAccount.totalBet(0);
                                sa = setTimeout(la, Z)
                            }
                        } else Ea = setTimeout(la, 300)
                }
            }

            a.mainGameManager && (A.children[3].clear(), A.children[3].beginFill(0), A.children[3].drawRect(3,
                3, 1914, 22), A.children[3].endFill, a.mainGameManager && (a.mainGameManager.gameStateAsync(r), a.mainRenderer.renderManager.needUpdateRender = !0))
        }

        function k(r) {
            1 == r[a.gameConfig[a.configType].serverResp].bt ? m() : d(r)
        }

        let u;
        void 0 != a.mainGameManager && (b ? k(b) : a.mainGameManager.gameStateAsync(k))
    }
};
