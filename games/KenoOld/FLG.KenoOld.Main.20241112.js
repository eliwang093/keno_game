registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_2_min",
    image: "games/KenoOld/resources/icons/keno-2-min-classic.png",
    imageBack: "games/KenoOld/resources/icons/keno-2-min-classic-back.png",
    caption: "Keno 2 min",
    runConfig: "KenoOld",
    gameType: "red",
    playInDemo: !0
});
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_4_min",
    image: "games/KenoOld/resources/icons/keno-4-min-classic.png",
    imageBack: "games/KenoOld/resources/icons/keno-4-min-classic-back.png",
    caption: "Keno 4 min",
    runConfig: "KenoOld",
    gameType: "green",
    playInDemo: !0
});
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_2_min",
    image: "games/KenoOld/resources/icons/keno-2-min-classic.png",
    imageBack: "games/KenoOld/resources/icons/keno-2-min-classic-back.png",
    caption: "Keno X 2 min v2",
    runConfig: "KenoOld",
    gameType: "x2",
    playInDemo: !0,
    sid: 28
});
var configsOld = {
    green: {
        serverName: "srv48",
        serverNum: "s48",
        tirTime: 171,
        appName: "bets_48",
        resources: "green/",
        coefTable: [[0, 0, 0, 0, 0, 0, 1, 1, 2, 2], [3.5, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 2, 1, 1, 0, 0, 0, 0, 0], [0, 0, 50, 10, 3, 2, 2, 0, 0, 0], [0, 0, 0, 100, 20, 15, 4, 5, 1, 0], [0, 0, 0, 0, 150, 60, 20, 15, 10, 5], [0, 0, 0, 0, 0, 500, 80, 50, 25, 30], [0, 0, 0, 0, 0, 0, 1E3, 200, 125, 100], [0, 0, 0, 0, 0, 0, 0, 2E3, 1E3, 300], [0, 0, 0, 0, 0, 0, 0, 0, 5E3, 2E3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1E4]],
        numColor: "#7d0200",
        tipsColor: "#f8d95d",
        editionsTable: {yPos: 897, yOffset: 29},
        coefOffsetY: 37.7,
        coefHeader: {
            textObj: {
                text: "",
                align: "left", style: {font: "38px Arial Bold", fill: "#f8da50"}
            }, xPos: 50, yPos: 15
        },
        gridPos: [3, 3],
        gridOffset: {x: 3, y: 3},
        zoneSize: [92, 64],
        gridTextStyle: {font: "50px Trebuchet MS", fill: "#ffffff", align: "top-left"},
        smallGridTextStyle: {font: "22px Arial Bold", fill: "#014e16"},
        gridTextStylePressed: {font: "50px Trebuchet MS", fill: "#7d0200", align: "top-left"},
        balls: {
            xPos: 80,
            yPos: 84,
            yOffset: 82,
            textStyle: {font: "65px Trebuchet MS", fill: "#7d0200", align: "center"}
        },
        videoURL: "rtmp://w1.flg10.bet:1935/Keno4v2&Video0=myStream&amp",
        videoMobileURL: "https://w1.flg10.bet/keno/myStream/playlist.m3u8",
        videoPos: {x: 176, y: 372},
        videoSize: {w: 751, h: 461},
        canvasId: "",
        runconfig: "KenoOldGreen",
        gameType: "Green",
        gameKind: "Keno",
        gameVariant: "Old",
        caption: "Keno 4 min classic",
        rTime: -20
    }, gold: {
        serverName: "srv10",
        serverNum: "s10",
        tirTime: 56,
        appName: "kenog",
        resources: "gold/",
        coefTable: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3.5, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 2, 1, 1, 0, 0, 0, 0, 0], [0, 0, 50, 10, 3, 2, 2, 0, 0, 0], [0, 0, 0, 100, 20, 15, 4, 5, 2, 0], [0, 0, 0, 0, 150, 60, 20, 15, 10, 5], [0, 0, 0, 0, 0, 500, 80,
            50, 25, 30], [0, 0, 0, 0, 0, 0, 1E3, 200, 125, 100], [0, 0, 0, 0, 0, 0, 0, 2E3, 1E3, 300], [0, 0, 0, 0, 0, 0, 0, 0, 5E3, 2E3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1E4]],
        numColor: "#000000",
        tipsColor: "#000000",
        editionsTable: {yPos: 907, yOffset: 28},
        coefOffsetY: 40,
        coefHeader: {
            textObj: {text: "", align: "center", style: {font: "bold 70px Arial Black", fill: "#c48f22"}},
            xPos: 470,
            yPos: 35
        },
        gridPos: [7.5, 3.5],
        gridOffset: {x: 5, y: 5},
        zoneSize: [89, 65],
        gridTextStyle: {font: "50px Arial Bold", fill: "#696969", align: "center"},
        gridTextStylePressed: {
            font: "50px Arial Bold", fill: "#ffffff",
            align: "center"
        },
        balls: {
            xPos: 105,
            yPos: 74,
            yOffset: 86,
            textStyle: {font: "58px Arial Bold", fill: "#000000", align: "center"}
        },
        videoURL: "rtmp://w1.flg10.bet:1935/kenoGold&amp;Video0=stream3:180&amp",
        videoMobileURL: "https://w1.flg10.bet/kenoGold/stream2/playlist.m3u8",
        videoPos: {x: 172, y: 391},
        videoSize: {w: 757, h: 461},
        canvasId: "",
        runconfig: "KenoOldGold",
        gameType: "Gold",
        gameKind: "Keno",
        gameVariant: "Old",
        rTime: -37
    }, red: {
        serverName: "srv11",
        serverNum: "s11",
        tirTime: 116,
        appName: "bets_11",
        resources: "red/",
        coefTable: [[0,
            0, 0, 0, 0, 0, 1, 1, 2, 2], [3.5, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 2, 1, 1, 0, 0, 0, 0, 0], [0, 0, 50, 10, 3, 2, 2, 0, 0, 0], [0, 0, 0, 100, 20, 15, 4, 5, 1, 0], [0, 0, 0, 0, 150, 60, 20, 15, 10, 5], [0, 0, 0, 0, 0, 500, 80, 50, 25, 30], [0, 0, 0, 0, 0, 0, 1E3, 200, 125, 100], [0, 0, 0, 0, 0, 0, 0, 2E3, 1E3, 300], [0, 0, 0, 0, 0, 0, 0, 0, 5E3, 2E3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1E4]],
        numColor: "#7d0200",
        tipsColor: "#f8d95d",
        editionsTable: {yPos: 897, yOffset: 29},
        coefOffsetY: 37.7,
        coefHeader: {
            textObj: {text: "", align: "left", style: {font: "38px Arial Bold", fill: "#f8da50"}},
            xPos: 50,
            yPos: 15
        },
        gridPos: [3, 3],
        gridOffset: {
            x: 3,
            y: 3
        },
        zoneSize: [92, 64],
        gridTextStyle: {font: "50px Trebuchet MS", fill: "#ffffff", align: "top-left"},
        smallGridTextStyle: {font: "22px Arial Bold", fill: "#4A000A"},
        gridTextStylePressed: {font: "50px Trebuchet MS", fill: "#7d0200", align: "top-left"},
        balls: {
            xPos: 80,
            yPos: 84,
            yOffset: 82,
            textStyle: {font: "65px Trebuchet MS", fill: "#7d0200", align: "center"}
        },
        videoURL: "rtmp://w1.flg10.bet:1935/keno-fast&amp;Video0=myStream:150&amp",
        videoMobileURL: "https://w1.flg10.bet/keno-fast/myStream/playlist.m3u8",
        videoPos: {x: 173, y: 375},
        videoSize: {w: 757, h: 459},
        canvasId: "",
        runconfig: "KenoOldRed",
        gameType: "Red",
        gameKind: "Keno",
        gameVariant: "Old",
        caption: "Keno 2 min classic",
        rTime: -20
    }, blue: {
        serverName: "srv30",
        serverNum: "s30",
        tirTime: 56,
        appName: "bets_30",
        resources: "blue/",
        coefTable: [[0, 0, 0, 0, 0, 0, 1, 1, 2, 2], [3.5, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 2, 1, 1, 0, 0, 0, 0, 0], [0, 0, 50, 10, 3, 2, 2, 0, 0, 0], [0, 0, 0, 100, 20, 15, 4, 5, 1, 0], [0, 0, 0, 0, 150, 60, 20, 15, 10, 5], [0, 0, 0, 0, 0, 500, 80, 50, 25, 30], [0, 0, 0, 0, 0, 0, 1E3, 200, 125, 100], [0, 0, 0, 0, 0, 0, 0, 2E3, 1E3, 300], [0, 0, 0, 0, 0, 0, 0, 0, 5E3,
            2E3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1E4]],
        numColor: "#7d0200",
        tipsColor: "#f8d95d",
        editionsTable: {yPos: 897, yOffset: 29},
        coefOffsetY: 37.7,
        coefHeader: {
            textObj: {text: "", align: "left", style: {font: "38px Arial Bold", fill: "#f8da50"}},
            xPos: 50,
            yPos: 15
        },
        gridPos: [3, 3],
        gridOffset: {x: 3, y: 3},
        zoneSize: [92, 64],
        gridTextStyle: {font: "50px Trebuchet MS", fill: "#ffffff", align: "top-left"},
        smallGridTextStyle: {font: "22px Arial Bold", fill: "#4A000A"},
        gridTextStylePressed: {font: "50px Trebuchet MS", fill: "#7d0200", align: "top-left"},
        balls: {
            xPos: 80,
            yPos: 84, yOffset: 82, textStyle: {font: "65px Trebuchet MS", fill: "#7d0200", align: "center"}
        },
        videoURL: "rtmp://w2.flg10.bet:1935/keno-fast1min&amp;Video0=stream:150&amp",
        videoMobileURL: "https://w2.flg10.bet/keno-fast1min/stream/playlist.m3u8",
        videoPos: {x: 173, y: 375},
        videoSize: {w: 757, h: 459},
        canvasId: "",
        runconfig: "KenoOldBlue",
        gameType: "Blue",
        gameKind: "Keno",
        gameVariant: "Old",
        rTime: -20
    }, x2: {
        serverName: "srv96",
        serverNum: "s96",
        tirTime: 116,
        appName: "bets_96",
        resources: "red/",
        coefTable: [[0, 0, 0, 0, 0, 0, 1, 1, 2, 2], [3.5,
            1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 2, 1, 1, 0, 0, 0, 0, 0], [0, 0, 50, 10, 3, 2, 2, 0, 0, 0], [0, 0, 0, 100, 20, 15, 4, 5, 1, 0], [0, 0, 0, 0, 150, 60, 20, 15, 10, 5], [0, 0, 0, 0, 0, 500, 80, 50, 25, 30], [0, 0, 0, 0, 0, 0, 1E3, 200, 125, 100], [0, 0, 0, 0, 0, 0, 0, 2E3, 1E3, 300], [0, 0, 0, 0, 0, 0, 0, 0, 5E3, 2E3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1E4]],
        numColor: "#7d0200",
        tipsColor: "#f8d95d",
        editionsTable: {yPos: 897, yOffset: 29},
        coefOffsetY: 37.7,
        coefHeader: {
            textObj: {text: "", align: "left", style: {font: "38px Arial Bold", fill: "#f8da50"}},
            xPos: 50,
            yPos: 15
        },
        gridPos: [3, 3],
        gridOffset: {x: 3, y: 3},
        zoneSize: [92,
            64],
        gridTextStyle: {font: "50px Trebuchet MS", fill: "#ffffff", align: "top-left"},
        smallGridTextStyle: {font: "22px Arial Bold", fill: "#4A000A"},
        gridTextStylePressed: {font: "50px Trebuchet MS", fill: "#7d0200", align: "top-left"},
        balls: {
            xPos: 80,
            yPos: 84,
            yOffset: 82,
            textStyle: {font: "65px Trebuchet MS", fill: "#7d0200", align: "center"}
        },
        videoURL: "rtmp://w1.flg10.bet:1935/keno-fast&amp;Video0=myStream:150&amp",
        videoMobileURL: "https://w1.flg10.bet/keno-fast/myStream/playlist.m3u8",
        videoPos: {x: 173, y: 375},
        videoSize: {
            w: 757,
            h: 459
        },
        canvasId: "",
        runconfig: "KenoOldRed",
        gameType: "Red",
        gameKind: "Keno",
        gameVariant: "Old",
        caption: "Keno 2 min classic",
        rTime: -20,
        needRtc: !0,
        videoRtcUrl: "wss://keno-stream.flg10.bet/webrtc-session.json",
        videoRtcApp: "keno 2x",
        videoRtcStream: "myStream"
    }
}, kenoOldObjectsArr = {green: void 0, gold: void 0, red: void 0, blue: void 0};

function emitEventKenoOld(a, v) {
    void 0 != kenoOldObjectsArr.green && kenoOldObjectsArr.green.mainRenderer.stage.emit(a, v);
    void 0 != kenoOldObjectsArr.gold && kenoOldObjectsArr.gold.mainRenderer.stage.emit(a, v);
    void 0 != kenoOldObjectsArr.red && kenoOldObjectsArr.red.mainRenderer.stage.emit(a, v);
    void 0 != kenoOldObjectsArr.blue && kenoOldObjectsArr.blue.mainRenderer.stage.emit(a, v);
    void 0 != kenoOldObjectsArr.x2 && kenoOldObjectsArr.x2.mainRenderer.stage.emit(a, v)
}

function removeKenoOldObject(a, v) {
    if (void 0 != kenoOldObjectsArr[v]) {
        kenoOldObjectsArr[v].destroy();
        for (var I in kenoOldObjectsArr[v]) kenoOldObjectsArr[v][I] = null;
        kenoOldObjectsArr[v] = null
    }
    $("#" + a + " canvas").remove();
    $("#" + a + " div").remove();
    rtcVideo.destroy()
}

function initKenoOldObject(a, v) {
    switch (v) {
        case "green":
            configsOld.green.canvasId = a;
            kenoOldObjectsArr.green = new KenoAppObjOld(configsOld.green);
            break;
        case "gold":
            configsOld.gold.canvasId = a;
            kenoOldObjectsArr.gold = new KenoAppObjOld(configsOld.gold);
            break;
        case "red":
            configsOld.red.canvasId = a;
            kenoOldObjectsArr.red = new KenoAppObjOld(configsOld.red);
            break;
        case "blue":
            configsOld.blue.canvasId = a;
            kenoOldObjectsArr.blue = new KenoAppObjOld(configsOld.blue);
            break;
        case "x2":
            configsOld.x2.canvasId = a, kenoOldObjectsArr.x2 =
                new KenoAppObjOld(configsOld.x2)
    }
}

function refreshKenoOldObject(a, v) {
    removeKenoOldObject(a, v.toLowerCase());
    initKenoOldObject(a, v.toLowerCase())
}

function gameManagerOld(a) {
    this.destroy = function () {
        V = I = null;
        for (var J in v) v[J] = null;
        v = null
    };
    var v = this;
    this.coefficients = a.kenoConfig.coefTable;
    var I = {};
    this.gameStateAsync = function (J) {
        V(J)
    };
    var V = function (J) {
        var L = a.kenoConfig.srvParams ? a.kenoConfig.srvParams() : clientInfoGlobal[a.kenoConfig.serverName];
        L = getUrl(a.kenoConfig.serverNum, gamePostfix) + "?" + L + "&viewall=1";
        var R = {};
        switch (a.kenoConfig.serverNum) {
            case "s7":
            case "s48":
            case "s30":
            case "s96":
            case "s11":
                L = getUrl(), R = {
                    oper: "getgameinfo", id_srv: a.kenoConfig.serverName.slice(3,
                        a.kenoConfig.serverName.length)
                }
        }
        $.ajax({
            type: "get", url: L, data: R, dataType: "json", success: function (z, ca, W) {
                try {
                    v && (I = z, I.tOrig = I.t2, void 0 != J && J(I))
                } catch (M) {
                    console.log(M), a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
                }
            }, error: function (z, ca, W) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
            }
        })
    };
    this.gameHistory = async function () {
        function J(M, T) {
            var ba = 0;
            T && (ba = T);
            T = [];
            for (var ha = ba + 20; ba < ha; ba++) T.push(M["b" + ba]);
            return T
        }

        if (v && I) {
            var L = [], R = 4;
            0 < parseInt(I.tOrig, 10) && (L.push({tir: I.tir, balls: J(I, 1)}), --R);
            var z, ca = "kenog" === a.kenoConfig.appName ? I : I.history;
            for (z = 0; z < R; z++) {
                var W = ca["tirid" + z];
                L.push({tir: W.tirnum, balls: J(W)})
            }
            return L
        }
        console.log("History and gameState not ok.")
    };
    this.sortNumeric = function (J, L) {
        if (J > L) return 1;
        if (J < L) return -1
    }
}

function KenoAppObjOld(a) {
    this.destroy = function () {
        L.destroy();
        L = null;
        R.destroy();
        R = null;
        V.destroy();
        V = null;
        J.destroy();
        J = null;
        I.destroy();
        I = null;
        v.mainSoundManager.destroy();
        for (var z in v) v[z] = null;
        v = null
    };
    var v = this;
    this.gameDir = "games/KenoOld/resources/";
    if ("s11" === a.serverNum) {
        let z = document.createElement("div");
        z.innerHTML = '\x3c!-- Yandex.Metrika counter  KENO 2 MIN v2 --\x3e\n\t\t<script type="text/javascript" >\n\t\t   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n\t\t   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n\t\t   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n\n\t\t   ym(84903163, "init", {\n\t\t\t\tclickmap:true,\n\t\t\t\ttrackLinks:true,\n\t\t\t\taccurateTrackBounce:true,\n\t\t\t\twebvisor:true\n\t\t   });\n\t\t\x3c/script>\n\t\t<noscript><div><img src="https://mc.yandex.ru/watch/84903163" style="position:absolute; left:-9999px;" alt="" /></div></noscript>\n\t\t\x3c!-- /Yandex.Metrika counter --\x3e';
        document.body.appendChild(z);
        this.metrika = z
    }
    this.kenoConfig = a;
    var I = new FLGRenderer(1920, 1080, a.canvasId, "center");
    this.mainRenderer = I;
    this.mainSoundManager = new SoundManager(v.kenoConfig.gameKind, v.kenoConfig.gameType, v.kenoConfig.gameVariant);
    var V = new FLGAccount(null, v.mainSoundManager, v.mainRenderer);
    this.mainFLGAccount = V;
    var J = new gameManagerOld(this);
    this.mainGameManager = J;
    var L = new UIManagerOld(this);
    this.mainUIManager = L;
    var R;
    this.setMainGrid = function (z) {
        R = z;
        v.mainGrid = R
    }
}

function UIManagerOld(a) {
    function v(d, c, e) {
        this.destroy = function () {
            G = l = m = w = null;
            clearTimeout(B);
            clearTimeout(D);
            h = k = null;
            for (var n in r) r[n] = null;
            r = null
        };
        var r = this, w = a.kenoConfig.balls.textStyle, m = 0, B, D, l = new PIXI.Container;
        a.mainRenderer.stage.addChild(l);
        var G = function (n, g, q, u, A) {
            l.children[A] ? (l.children[A].visible = !0, l.children[A].children[0].text = u) : a.mainRenderer.createButton(l, n, g, "balls", {
                text: u,
                align: "center",
                style: w
            }).scale.set(q, q)
        }, k = function (n, g, q) {
            function u() {
                G(d + e * m, c, g, n[m], m);
                m++;
                m < n.length ? 0 == q || void 0 == q ? u() : B = setTimeout(u, q) : m = 0
            }

            void 0 != n && n.length && u()
        };
        this.startDrawBalls = k;
        var h = function () {
            for (var n = 0; n < l.children.length; n++) l.children[n].visible = !1
        };
        this.removeBalls = h
    }

    function I(d) {
        this.destroy = function () {
            c.clearBetsHistory();
            for (var k = 0; k < e.length; k++) {
                for (var h in e[k]) e[k][h] = null;
                e[k] = null
            }
            G = B = l = m = w = r = e = null;
            for (k in c) c[k] = null;
            c = null
        };
        var c = this, e = [];
        this.bets = e;
        var r = 0, w = 0;
        this.setTotalWin = function (k) {
            if (!arguments.length) return w;
            k && (w = k)
        };
        var m = null;
        this.parentEditions =
            function (k) {
                if (!arguments.length) return m;
                m = k;
                m.betsTable().addChild(l)
            };
        var B = 1;
        if (d.length) for (var D = 0; D < d.length; D++) d[D].summ && (r += d[D].summ), d[D].win && (w += d[D].win), e.push({
            summ: d[D].summ,
            bet: d[D].bet,
            winBets: d[D].winBets,
            countWin: d[D].countWin,
            win: d[D].win,
            code: d[D].code,
            id: d[D].id
        });
        this.addBet = function (k, h, n) {
            100 <= e.length ? (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), n && n(void 0)) : (k.length && 100 < e.length + k.length && (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g,
                100)), k = k.slice(0, k.length - (e.length + k.length - 100))), a.mainFLGAccount.placeBet(k, h, a.kenoConfig, function (g, q, u) {
                if (void 0 == g) n && n(void 0); else {
                    if (u) {
                        u.notAll && a.mainRenderer.logService.log(mainLocalizationTable.betError);
                        for (g = 0; g < u.srvBets.length; g++) e.push({
                            summ: u.srvBets[g].summ,
                            bet: u.srvBets[g].bet,
                            winBets: u.srvBets[g].winBets,
                            countWin: u.srvBets[g].countWin,
                            code: u.srvBets[g].code,
                            id: u.srvBets[g].id
                        });
                        n && (n(u.srvBets), m.events.emit("EDITIONS_CHANGE"))
                    } else e.push({
                        summ: k.summ, bet: k.bet, winBets: k.winBets,
                        countWin: k.countWin, win: k.win, code: g, id: q
                    }), n && (n(e[e.length - 1]), m.events.emit("EDITIONS_CHANGE"));
                    r = a.mainFLGAccount.totalBet();
                    B = 1;
                    G();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }))
        };
        var l = new PIXI.Container, G = function () {
            if (m && !(0 >= e.length)) {
                var k = 1, h, n = 0 != l.children.length;
                n ? (l.getChildByName("TB").children[0].text = 0 !== r ? formatFLGNums(r, !1) : "", l.getChildByName("TW").children[0].text = 0 !== w ? formatFLGNums(w, !1) : "") : (a.mainRenderer.createButton(l, 470, 323, void 0, {
                    text: formatFLGNums(r, !1), align: "center",
                    style: m.tableHeaderFont
                }).name = "TB", a.mainRenderer.createButton(l, 671, 323, void 0, {
                    text: formatFLGNums(w, !1),
                    align: "center",
                    style: m.tableHeaderFont
                }).name = "TW");
                for (var g = 1; 11 > g; g++) {
                    for (h = 0; n && l.getChildByName("circle" + g + "_" + h); h++) l.getChildByName("circle" + g + "_" + h).visible = !1, l.getChildByName("sortedBet" + g + "_" + h).visible = !1;
                    n && l.getChildByName("summ" + g) && (l.getChildByName("summ" + g).visible = !1, l.getChildByName("count" + g).visible = !1, l.getChildByName("win" + g).visible = !1)
                }
                for (g = e.length - 1 - 10 * B + 10; g >=
                Math.max(e.length - 10 * B, 0); g--) {
                    var q = e[g].bet.slice();
                    q.sort(a.mainGameManager.sortNumeric);
                    var u = -12;
                    for (h = 0; h < q.length; h++) {
                        u += 39;
                        var A = -1 < e[g].winBets.indexOf(q[h]);
                        if (n && l.getChildByName("circle" + k + "_" + h)) {
                            var y = l.getChildByName("circle" + k + "_" + h);
                            var N = l.getChildByName("sortedBet" + k + "_" + h);
                            N.children[0].text = q[h];
                            N.visible = !0
                        } else y = new PIXI.Graphics, y.lineStyle(0), y.beginFill("gold/" != a.kenoConfig.resources ? 16773632 : 16754688, 1), y.drawCircle(u, 16 + 28 * k, 14), y.endFill(), y.name = "circle" + k + "_" + h, l.addChild(y),
                            a.mainRenderer.createButton(l, u, 16 + 28 * k, void 0, {
                                text: q[h],
                                align: "center",
                                style: A ? m.tableHighlightFont : m.tableHistoryFont
                            }).name = "sortedBet" + k + "_" + h;
                        y.visible = A;
                        y = null
                    }
                    h = e[g].win ? formatFLGNums(e[g].win, !1) : "";
                    n && l.getChildByName("summ" + k) ? (y = l.getChildByName("summ" + k), y.children[0].text = formatFLGNums(e[g].summ, !1), y.visible = !0, y = l.getChildByName("count" + k), y.children[0].text = e[g].countWin + "/" + e[g].bet.length, y.visible = !0, y = l.getChildByName("win" + k), y.children[0].text = h, y.visible = !0) : (a.mainRenderer.createButton(l,
                        470, 16 + 28 * k, void 0, {
                            text: formatFLGNums(e[g].summ, !1),
                            align: "center",
                            style: m.tableHistoryFont
                        }).name = "summ" + k, a.mainRenderer.createButton(l, 565, 16 + 28 * k, void 0, {
                        text: e[g].countWin + "/" + e[g].bet.length,
                        align: "center",
                        style: m.tableHistoryFont
                    }).name = "count" + k, a.mainRenderer.createButton(l, 671, 16 + 28 * k, void 0, {
                        text: h,
                        align: "center",
                        style: m.tableHistoryFont
                    }).name = "win" + k);
                    k++
                }
                n ? l.getChildByName("pageCount").children[0].text = B + "/" + Math.ceil(e.length / 10) : (a.mainRenderer.createButton(l, -3, 310, "choiceTable").scale.set(1.1),
                    a.mainRenderer.createButton(l, 161, 328, void 0, {
                        text: B + "/" + Math.ceil(e.length / 10),
                        align: "center",
                        style: {font: "bold 27px Arial", fill: "#c4c4c4"}
                    }).name = "pageCount", a.mainRenderer.createButton(l, 14, 315, "betsLeft", void 0, function (b) {
                    b.tint = 12369084;
                    B = limit(B - 1, 1, Math.ceil(e.length / 10));
                    G();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, function (b) {
                    b.tint = 16777215;
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }).scale.set(1.2), a.mainRenderer.createButton(l, 269, 315, "betsRight", void 0, function (b) {
                    b.tint =
                        12369084;
                    B = limit(B + 1, 1, Math.ceil(e.length / 10));
                    G();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }, void 0, function (b) {
                    b.tint = 16777215;
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }).scale.set(1.2));
                l.visible = !0;
                y = y = y = N = y = q = null
            }
        };
        this.redrawBetsHistory = G;
        this.clearBetsHistory = function () {
            l.visible = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        };
        this.calculateWin = function (k, h) {
            for (var n, g = 0; g < e.length; g++) {
                n = e[g].bet;
                for (var q = [], u = 0; u < n.length; u++) -1 < k.indexOf(n[u]) && q.push(n[u]);
                n = q;
                e[g].winBets =
                    n;
                e[g].countWin = n.length;
                h && (e[g].win = e[g].summ * a.mainGameManager.coefficients[e[g].countWin][e[g].bet.length - 1], w += e[g].win)
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        }
    }

    this.destroy = function () {
        clearTimeout(ya);
        clearTimeout(Aa);
        M = z = null;
        T.destroy();
        ra = ha = ba = T = null;
        O && (O.destroy(), O = null);
        for (var d in S) S[d] = null;
        S = null;
        X.destroy();
        X = null;
        ka.destroy();
        sa = ta = ua = ia = la = da = Y = ea = Z = K = F = ka = null;
        a.mainRenderer.stage.off("changeLang", va);
        va = null;
        J.off("visibleChange", L);
        window.removeEventListener("keydown",
            R);
        R = L = J = null;
        ma.destroy();
        ma = null;
        C.destroy();
        C = null;
        for (d in V) V[d] = null;
        V = null
    };
    var V = this, J = $("#" + a.kenoConfig.canvasId).parent(), L = function (d, c) {
        a.mainRenderer.stage.visible = c == a.kenoConfig.canvasId;
        a.mainRenderer.StartStopAnimation(a.mainRenderer.stage.visible)
    };
    J.on("visibleChange", L);
    var R = function (d) {
        a.mainRenderer.stage.visible && (13 == d.keyCode || 32 == d.keyCode) && F && (d = F.getChildByName("done")) && d.interactive && (d.emit("mousedown"), d.emit("mouseup"))
    };
    window.addEventListener("keydown", R);
    var z =
        clientInfoGlobal.coin7.split("-");
    5 < z.length && (z = z.slice(0, 5));
    for (var ca = 0; ca < z.length; ca++) z[ca] /= 100;
    var W = 2 * parseInt(z[z.length - 1], 10);
    z.push("MAX\n" + W);
    var M = new betsControls(z[0], z[z.length - 1], z[1], z, function (d) {
        a.mainFLGAccount.balance() < W && (W = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return W
    });
    this.betsControls = M;
    var T = new FLGTimer, ba, ha, ra, O, S = {}, X = new FLGJackpot(a.mainRenderer), ka, F = new PIXI.Container,
        K = new PIXI.Container;
    K.name = "keyboardRandomContainer";
    var Z = new PIXI.Container, ea = new PIXI.Container, da, la, ja = !1, na = !0, ma, C = new function () {
            this.destroy = function () {
                for (var f = 0; f < c.length; f++) c[f].round = null, c[f].editionResult = null, c[f].betsHistory.destroy && c[f].betsHistory.destroy(), c[f].betsHistory = null, c[f] = null;
                k = h = N = G = l = D = B = m = w = r = e = c = null;
                n.destroy();
                x = b = y = A = u = q = g = n = null;
                d.events.removeAllListeners();
                for (f in d) d[f] = null;
                d = null
            };
            var d = this, c = [], e;
            this.editions = c;
            var r, w, m, B, D, l = new PIXI.Container, G = new PIXI.Container;
            this.historyTable = function () {
                return B
            };
            this.betsTable = function () {
                D ||= a.mainRenderer.createButton(void 0, 1104, 485);
                return D
            };
            var k = .45, h = 83 * k, n, g = {font: "20px Arial", fill: "#3f3e3e"};
            this.tableHistoryFont = g;
            var q = {font: "bold 20px Arial", fill: a.kenoConfig.numColor};
            this.tableHeaderFont = q;
            var u = {font: "20px Arial", fill: "#3f3e3e"};
            this.tableHighlightFont = u;
            this.getActedOutEdition = function () {
                for (var f = c.length - 1; 0 <= f; f--) if (void 0 == c[f].editionResult) return A(f), c[f];
                A(c.length - 1);
                return c[c.length - 1]
            };
            var A = function (f) {
                0 > f || f >= c.length || (void 0 !=
                e && e < c.length && c[e].betsHistory.clearBetsHistory(), e = f, void 0 != r && (r.getChildByName("text" + r.name).text = c[c.length - 1].round, w.getChildByName("text" + r.name).text = "ROUND: " + c[e].round), void 0 != m && (m.getChildByName("text" + m.name).text = mainLocalizationTable.descRound + c[c.length - 1].round + " "), void 0 != n && (n.removeBalls(), void 0 != c[e].editionResult && n.startDrawBalls(c[e].editionResult, k, 0)), void 0 != B && c[e].betsHistory.redrawBetsHistory(), a.mainRenderer.renderManager.needUpdateRender = !0)
            };
            A(c.length - 1);
            this.drawEditions =
                function () {
                    r = a.mainRenderer.createButton(void 0, 145, "gold/" != a.kenoConfig.resources ? 67 + a.kenoConfig.editionsTable.yPos : 67 + a.kenoConfig.editionsTable.yPos + 12, void 0, {
                        text: c[c.length - 1].round,
                        align: "center",
                        style: {font: "30px Arial Bold", fill: a.kenoConfig.numColor}
                    });
                    m = a.mainRenderer.createButton(void 0, 1105, 270, void 0, {
                        text: mainLocalizationTable.descRound + c[c.length - 1].round + " ",
                        align: "left",
                        style: {font: "italic 20px Arial", fill: a.kenoConfig.tipsColor}
                    });
                    var f = {};
                    f = "gold/" != a.kenoConfig.resources ? {
                        font: "43px Arial Bold",
                        fill: "#ffffff"
                    } : {font: "43px Arial Bold", fill: "#715333"};
                    w = a.mainRenderer.createButton(void 0, 1477, 384, void 0, {
                        text: "ROUND: " + c[e].round,
                        align: "center",
                        style: f
                    });
                    a.mainRenderer.createButton(void 0, 1232, 365, "roundLeft", void 0, function (p) {
                        a.mainSoundManager.playSound("buttonClick");
                        p.tint = 12369084;
                        A(limit(e - 1, 0, 6));
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }, void 0, function (p) {
                        p.tint = 16777215;
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }).scale.set(1.7);
                    a.mainRenderer.createButton(void 0, 1682,
                        365, "roundRight", void 0, function (p) {
                            a.mainSoundManager.playSound("buttonClick");
                            p.tint = 12369084;
                            A(e + 1);
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        }, void 0, function (p) {
                            p.tint = 16777215;
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        }).scale.set(1.7);
                    n = new v(1105, 420, h);
                    B = a.mainRenderer.createButton(void 0, 216, a.kenoConfig.editionsTable.yPos);
                    for (f = 0; f < c.length; f++) c[f].betsHistory.parentEditions(d);
                    b();
                    y();
                    x();
                    B.addChild(l);
                    B.addChild(G);
                    D.addChild(N)
                };
            var y = function () {
                G.children[0] ? G.children[0].children[0].text =
                    mainLocalizationTable.round.toUpperCase() + ":" : a.mainRenderer.createButton(G, -71, "gold/" != a.kenoConfig.resources ? 35 : 47, void 0, {
                    text: mainLocalizationTable.round.toUpperCase() + ":",
                    align: "center",
                    style: {font: "24px Arial Bold", fill: a.kenoConfig.numColor}
                });
                m.getChildByName("text" + m.name).text = mainLocalizationTable.descRound + c[c.length - 1].round + " "
            };
            this.redrawEditionHeader = y;
            var N = new PIXI.Container, b = function () {
                N.children[0] ? (N.children[0].children[0].text = mainLocalizationTable.combination, N.children[1].children[0].text =
                    mainLocalizationTable.sum, N.children[2].children[0].text = mainLocalizationTable.matches, N.children[3].children[0].text = mainLocalizationTable.win, N.children[4].children[0].text = mainLocalizationTable.total.toUpperCase()) : (a.mainRenderer.createButton(N, 20, "gold/" != a.kenoConfig.resources ? 14 : 16, void 0, {
                    text: mainLocalizationTable.combination,
                    align: "left",
                    style: q
                }), a.mainRenderer.createButton(N, 470, "gold/" != a.kenoConfig.resources ? 14 : 16, void 0, {
                    text: mainLocalizationTable.sum,
                    align: "center",
                    style: q
                }), a.mainRenderer.createButton(N,
                    565, "gold/" != a.kenoConfig.resources ? 14 : 16, void 0, {
                        text: mainLocalizationTable.matches,
                        align: "center",
                        style: q
                    }), a.mainRenderer.createButton(N, 671, "gold/" != a.kenoConfig.resources ? 14 : 16, void 0, {
                    text: mainLocalizationTable.win,
                    align: "center",
                    style: q
                }), a.mainRenderer.createButton(N, 360, 323, void 0, {
                    text: mainLocalizationTable.total.toUpperCase() + ":",
                    align: "center",
                    style: q
                }))
            };
            this.drawBetsHeader = b;
            var x = async function () {
                for (var f = await a.mainGameManager.gameHistory(), p = 0 != l.children.length, t = 0; t < f.length; t++) {
                    var E =
                        f[t].balls.slice();
                    E.sort(a.mainGameManager.sortNumeric);
                    if (p && l.children[t]) {
                        var H = l.children[t];
                        H.getChildByName("round" + t).children[0].text = f[t].tir;
                        for (var P = 0; P < E.length; P++) H.getChildByName("result" + P).children[0].text = E[P]
                    } else {
                        H = new PIXI.Container;
                        a.mainRenderer.createButton(H, 45, 10 + a.kenoConfig.editionsTable.yOffset * (t + 1), void 0, {
                            text: f[t].tir,
                            align: "center",
                            style: g
                        }).name = "round" + t;
                        var aa = 100;
                        for (P = 0; P < E.length; P++) a.mainRenderer.createButton(H, aa += 34, 10 + a.kenoConfig.editionsTable.yOffset *
                            (t + 1), void 0, {
                            text: E[P],
                            align: "center",
                            style: {font: "19.5px Arial", fill: "#2a2a2a"}
                        }).name = "result" + P;
                        l.addChild(H)
                    }
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            };
            this.cancelLastEdition = function (f) {
                c.length && (c[c.length - 1].editionResult = f, c[c.length - 1].betsHistory.calculateWin(f), A(c.length - 1))
            };
            this.addEdition = function (f) {
                c.length && !c[c.length - 1].betsHistory.bets.length ? (c[c.length - 1].round = f, c[c.length - 1].editionResult = void 0) : c.length && c[c.length - 1].round === f || (c.push({
                    round: f, editionResult: void 0,
                    betsHistory: new I([])
                }), c[c.length - 1].betsHistory.parentEditions(d), void 0 != e && c[e].betsHistory.clearBetsHistory());
                6 <= c.length && (c[0].betsHistory.destroy && c[0].betsHistory.destroy(), c[0].betsHistory = null, c.shift());
                A(c.length - 1)
            };
            this.saveToStorage = async function () {
                localStorage.setItem("curUser", JSON.stringify({hall: clientInfoGlobal.hall, nick: clientInfoGlobal.lgn}));
                var f = [], p;
                for (p = 0; p < c.length; p++) f.push({
                    round: c[p].round,
                    editionResult: c[p].editionResult,
                    bets: c[p].betsHistory.bets
                });
                localStorage.setItem(a.kenoConfig.gameKind +
                    a.kenoConfig.gameType + "editions", JSON.stringify(f))
            };
            this.loadFromStorage = function () {
                function f(E) {
                    $.ajax({
                        type: "get",
                        url: getUrl(),
                        data: {
                            gethistory: parseInt(a.kenoConfig.serverName.slice(3, a.kenoConfig.serverName.length)),
                            round: E.round
                        },
                        dataType: "json",
                        async: !1,
                        success: function (H, P, aa) {
                            if (d && H && H.tirid0) {
                                P = [];
                                aa = H.tirid0;
                                for (H = 0; 20 > H; H++) {
                                    if (99 === aa["b" + H]) return;
                                    P.push(aa["b" + H])
                                }
                                E.editionResult = P;
                                E.betsHistory.calculateWin(E.editionResult, !0)
                            }
                        }
                    })
                }

                if (localStorage.getItem("curUser")) {
                    var p = JSON.parse(localStorage.getItem("curUser"));
                    if (p.hall !== clientInfoGlobal.hall && p.nick !== clientInfoGlobal.lgn) return
                }
                p = a.kenoConfig.gameKind + a.kenoConfig.gameType + "editions";
                if (localStorage.getItem(p)) {
                    var t = JSON.parse(localStorage.getItem(p));
                    for (p = 0; p < t.length; p++) c.push({
                        round: t[p].round,
                        editionResult: t[p].editionResult,
                        betsHistory: new I(t[p].bets)
                    }), (!c[p].editionResult || 20 > c[p].editionResult.length) && f(c[p])
                }
            };
            d.loadFromStorage();
            A(c.length - 1);
            this.events = new PIXI.utils.EventEmitter;
            d.events.on("EDITIONS_CHANGE", function () {
                d.saveToStorage()
            });
            d.events.on("RESULT_TIME", x);
            d.events.on("BET_TIME", x)
        }, oa = !1,
        ia = [["nameImage", a.gameDir + a.kenoConfig.resources + "name.png"], ["BG", a.gameDir + a.kenoConfig.resources + "BG.jpg"], ["head_ball_history", a.gameDir + a.kenoConfig.resources + "line-history.png"], ["time_line_bg", a.gameDir + a.kenoConfig.resources + "time-line-bg.png"], ["info", a.gameDir + a.kenoConfig.resources + "info-button.png"], ["JP", a.gameDir + "WinJP/Jackpot-" + a.kenoConfig.gameType + "-min.png"], ["WIN", a.gameDir + "WinJP/Win-" + a.kenoConfig.gameType + "-min.png"],
            ["time_line", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "time-line.png" : a.gameDir + "time-line.png"], ["table_bets_bg", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "table-bets.png" : a.gameDir + "table-bets.png"], ["table_history_bg", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "table-history.png" : a.gameDir + "table-history.png"], ["on_off_bg", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "button-on-off-bg.png" : a.gameDir + "button-on-off-bg.png"],
            ["on_off", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "button-on-off.png" : a.gameDir + "button-on-off.png"], ["balls", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "ball-history.png" : a.gameDir + "ball-history.png"], ["choose_coef", a.gameDir + a.kenoConfig.resources + "icon-choose-coef-bordered.png"], ["choose_numbers", a.gameDir + a.kenoConfig.resources + "icon-choose-numbers-bordered.png"], ["choose_video", a.gameDir + a.kenoConfig.resources + "icon-choose-video-bordered.png"], ["bg_video",
                a.gameDir + a.kenoConfig.resources + "img-bg-video.png"], ["bg_numbers", a.gameDir + a.kenoConfig.resources + "img-bg-numbers.png"], ["table_coefficients", a.gameDir + a.kenoConfig.resources + "coef_table1.png"], ["keyboard", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-keyboard-0.png" : a.gameDir + "icon-button-keyboard-0.png"], ["keyboard_pressed", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-keyboard-1.png" : a.gameDir + "icon-button-keyboard-1.png"], ["keyboard_disabled",
                "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-keyboard-lock.png" : a.gameDir + "icon-button-keyboard-lock.png"], ["keyboard_selected", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-keyboard-selected.png" : a.gameDir + "icon-button-keyboard-selected.png"], ["delete", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-delete-0.png" : a.gameDir + "icon-button-delete-0.png"], ["delete_pressed", "gold/" == a.kenoConfig.resources ? a.gameDir +
                a.kenoConfig.resources + "icon-button-delete-1.png" : a.gameDir + "icon-button-delete-1.png"], ["done", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-game-0.png" : a.gameDir + "icon-button-game-0.png"], ["done_pressed", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-game-1.png" : a.gameDir + "icon-button-game-1.png"], ["done_disabled", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-game-lock.png" : a.gameDir + "icon-button-game-lock.png"],
            ["random_num", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-info-numbers.png" : a.gameDir + "icon-button-info-numbers.png"], ["minus", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-small-minus-0.png" : a.gameDir + "icon-button-small-minus-0.png"], ["minus_pressed", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-small-minus-1.png" : a.gameDir + "icon-button-small-minus-1.png"], ["minus_disabled", "gold/" == a.kenoConfig.resources ?
                a.gameDir + a.kenoConfig.resources + "icon-button-small-minus-lock.png" : a.gameDir + "icon-button-small-minus-lock.png"], ["plus", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-small-plus-0.png" : a.gameDir + "icon-button-small-plus-0.png"], ["plus_pressed", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-small-plus-1.png" : a.gameDir + "icon-button-small-plus-1.png"], ["plus_disabled", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-small-plus-lock.png" :
                a.gameDir + "icon-button-small-plus-lock.png"], ["repeat", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-repeat-0.png" : a.gameDir + "icon-button-repeat-0.png"], ["repeat_pressed", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "icon-button-repeat-1.png" : a.gameDir + "icon-button-repeat-1.png"], ["zone_transp", a.gameDir + "img-table-icon-transp.png"], ["zone_pressed", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "img-table-icon-pressed.png" : a.gameDir +
                "img-table-icon-pressed.png"], ["zone_selected", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "img-table-icon-selected.png" : a.gameDir + "img-table-icon-dark.png"], ["zone_win", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "img-table-icon-pressed2.png" : a.gameDir + "img-table-icon-selected.png"], ["roundLeft", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "arow-yell-left.png" : a.gameDir + "arow-yell-left.png"], ["roundRight", "gold/" == a.kenoConfig.resources ?
                a.gameDir + a.kenoConfig.resources + "arow-yell-right.png" : a.gameDir + "arow-yell-right.png"], ["betsRight", a.gameDir + "arow-gray-right.png"], ["betsLeft", a.gameDir + "arow-gray-left.png"], ["choiceTable", a.gameDir + "choice-table.png"], ["tableHotCold", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "table-hot-cold.png" : a.gameDir + "table-hot-cold.png"], ["tableColdNum", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "Table-cold-numbers-cold.png" : a.gameDir + "Table-cold-numbers-cold.png"],
            ["tableHotNum", "gold/" == a.kenoConfig.resources ? a.gameDir + a.kenoConfig.resources + "Table-cold-numbers-hot.png" : a.gameDir + "Table-cold-numbers-hot.png"], ["btn_video_load", a.gameDir + "/btn-video-load.png"]];
    ia = ia.concat(a.mainFLGAccount.resources);
    ia = ia.concat(X.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, "images/logo.json", ia, function (d, c, e) {
        const {kenoConfig: r, mainSoundManager: w} = a, {
            videoPos: m,
            videoSize: B,
            canvasId: D,
            videoMobileURL: l,
            needRtc: G,
            videoRtcUrl: k,
            videoRtcApp: h,
            videoRtcStream: n
        } =
            r;
        "";
        a.mainRenderer.createButton(void 0, 0, 0, "BG");
        a.mainFLGAccount.drawAccount(0, 0, a.kenoConfig);
        a.mainRenderer.createButton(void 0, "gold/" != a.kenoConfig.resources ? 80 : 77, "gold/" != a.kenoConfig.resources ? 84 : 70, "head_ball_history");
        a.mainRenderer.createButton(void 0, 1101, "gold/" != a.kenoConfig.resources ? 292 : 291, "time_line_bg");
        a.mainRenderer.createButton(void 0, 1104, 485, "table_bets_bg");
        a.mainRenderer.createButton(void 0, "gold/" != a.kenoConfig.resources ? 77 : 73, "gold/" != a.kenoConfig.resources ? 894 : 930, "table_history_bg");
        "gold/" == a.kenoConfig.resources ? a.mainRenderer.createButton(void 0, 1300, 97, "nameImage") : a.mainRenderer.createButton(void 0, 1300, 106, "nameImage");
        ka = new v(a.kenoConfig.balls.xPos, a.kenoConfig.balls.yPos, a.kenoConfig.balls.yOffset);
        a.mainRenderer.createButton(void 0, 596, 182, "choose_video", void 0, function () {
            O && (O.destroy && O.destroy(), O = null);
            a.mainSoundManager.playSound("buttonClick");
            a.mainRenderer.stage.getChildByName("bg_numbers").visible = !1;
            a.mainRenderer.stage.getChildByName("table_coefficients").visible =
                !1;
            a.mainRenderer.stage.getChildByName("bg_video").visible = !0;
            a.mainRenderer.stage.getChildByName("choose_video").visible = !1;
            a.mainRenderer.stage.getChildByName("choose_numbers").visible = !0;
            a.mainRenderer.stage.getChildByName("choose_coef").visible = !0;
            var b = "vip1001.de" === location.host || "test.flg.bet" === location.host ? "cover-video " + a.kenoConfig.gameType.toLowerCase() : void 0;
            G ? rtcVideo.prepareVideo({
                videoRtcUrl: k, videoRtcApp: h, videoRtcStream: n, videoId: "innerVideo" + D, parentId: D, styleObj: {
                    posX: m.x,
                    posY: m.y,
                    sizeW: B.w,
                    sizeH: B.h,
                    borderURL: void 0,
                    paddings: 0,
                    noVideoIcons: !0,
                    videoMaxScale: 1,
                    clipPath: "none",
                    fullscreenPosY: -45
                }, onReady() {
                    S.video_rotate && S.video_rotate.stop();
                    rtcVideo.showVideo()
                }
            }) : O = new FLGVideo(m.x, m.y, B.w, B.h, D, null, '<video id="innerVideo' + D + '" autoplay muted playsinline preload="metadata" style="height:100%;width:100%;position:relative;"><source src="' + l + '" type="application/x-mpegURL"></video>', void 0, w, !0, b);
            S.video_rotate && S.video_rotate.stop();
            b = a.mainRenderer.stage;
            var x = a.mainRenderer.stage.getChildByName("video_loader");
            x ? (x = b.children[0], x.visible = !0) : (x = a.mainRenderer.createButton(b, a.kenoConfig.videoPos.x + a.kenoConfig.videoSize.w / 2, a.kenoConfig.videoPos.y + a.kenoConfig.videoSize.h / 2, "btn_video_load"), x.anchor.set(.5, .5), x.scale.set(1.75, 1.75));
            x && (a.mainRenderer.renderManager.animationTweenInc(), S.video_rotate = (new TWEEN.Tween(x)).to({rotation: 6 * Math.PI}, 3E3).easing(TWEEN.Easing.Linear.None).onStop(function () {
                x.rotation = 0;
                x.visible = !1;
                a.mainRenderer.renderManager.animationTweenDec();
                S.video_rotate = null
            }).onComplete(function () {
                O &&
                O.setVisible && O.setVisible(!0);
                x.rotation = 0;
                x.visible = !1;
                a.mainRenderer.renderManager.animationTweenDec();
                S.video_rotate = null
            }).start(), a.mainRenderer.renderManager.needUpdateRender = !0)
        });
        a.mainRenderer.createButton(void 0, 596, 182, "choose_numbers", void 0, function () {
            a.mainSoundManager.playSound("buttonClick");
            a.mainRenderer.stage.getChildByName("bg_numbers").visible = !0;
            a.mainRenderer.stage.getChildByName("table_coefficients").visible = !1;
            a.mainRenderer.stage.getChildByName("bg_video").visible = !1;
            a.mainRenderer.stage.getChildByName("choose_video").position.x =
                596;
            a.mainRenderer.stage.getChildByName("choose_video").position.y = 182;
            a.mainRenderer.stage.getChildByName("choose_video").visible = !0;
            a.mainRenderer.stage.getChildByName("choose_numbers").visible = !1;
            a.mainRenderer.stage.getChildByName("choose_coef").visible = !0;
            S.video_rotate && S.video_rotate.stop();
            G && rtcVideo.hideVideo();
            O && (O.destroy && O.destroy(), O = null);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).visible = !1;
        a.mainRenderer.createButton(void 0, 823, 182, "choose_coef", void 0, function () {
            a.mainSoundManager.playSound("buttonClick");
            a.mainRenderer.stage.getChildByName("bg_numbers").visible = !1;
            a.mainRenderer.stage.getChildByName("table_coefficients").visible = !0;
            a.mainRenderer.stage.getChildByName("bg_video").visible = !1;
            a.mainRenderer.stage.getChildByName("choose_video").position.x = 823;
            a.mainRenderer.stage.getChildByName("choose_video").position.y = 182;
            a.mainRenderer.stage.getChildByName("choose_video").visible = !0;
            a.mainRenderer.stage.getChildByName("choose_numbers").visible = !0;
            a.mainRenderer.stage.getChildByName("choose_coef").visible =
                !1;
            G && rtcVideo.hideVideo();
            S.video_rotate && S.video_rotate.stop();
            O && (O.destroy && O.destroy(), rtcVideo.destroy && rtcVideo.destroy(), O = null);
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        a.mainRenderer.createButton(void 0, 75, 333, "bg_numbers");
        a.setMainGrid(new Grid(a.kenoConfig.gridPos[0], a.kenoConfig.gridPos[1], 10, 8, 10, a.mainRenderer.stage.getChildByName("bg_numbers"), a.mainRenderer));
        a.mainRenderer.createButton(void 0, 75, 333, "bg_video").visible = !1;
        a.mainRenderer.createButton(void 0, 75, 333, "table_coefficients").visible =
            !1;
        a.mainRenderer.createButton(a.mainRenderer.stage.getChildByName("table_coefficients"), a.kenoConfig.coefHeader.xPos - 2, a.kenoConfig.coefHeader.yPos - 8, void 0, a.kenoConfig.coefHeader.textObj).name = "coefHeader";
        a.mainUIManager.localizeCoefHeader();
        c = 128;
        var g = 138, q = {font: "bold 30px Arial Narrow", fill: "#ffffff"},
            u = {font: "bold 30px Arial Narrow", fill: "#7d0200"};
        for (d = 0; d < a.mainGameManager.coefficients.length; d++) {
            for (var A = 0; A < a.mainGameManager.coefficients[d].length; A++) {
                if (0 != a.mainGameManager.coefficients[d][A]) {
                    var y =
                        new PIXI.Text(a.mainGameManager.coefficients[d][A], q);
                    0 == d % 2 && 0 != d && "gold/" != a.kenoConfig.resources && (y = new PIXI.Text(a.mainGameManager.coefficients[d][A], u));
                    y.position.x = c;
                    y.position.y = g;
                    y.anchor.set(.5, .5);
                    a.mainRenderer.stage.getChildByName("table_coefficients").addChild(y);
                    y = null
                }
                c = 8 == A ? c + 111.5 : 5 <= A ? c + (5 == A ? 92.5 : 98) : 2 <= A ? c + (2 == A ? 72 : 87) : c + 57
            }
            c = 128;
            g += a.kenoConfig.coefOffsetY
        }
        d = "gold/" == a.kenoConfig.resources ? parseFloat(clientInfoGlobal.cfkenogmin) / 100 : parseFloat(clientInfoGlobal.cfkenomin) / 100;
        a.mainRenderer.createButton(ea, 1557, 877, "info", {
            text: numberFormat(d, {
                thousands_sep: " ",
                decimals: (d ^ 0) === d ? 0 : 2
            }), align: "center", style: {font: "bold 28px Arial", fill: "#e0e0e0"}
        });
        a.mainRenderer.createButton(ea, 1628, 863, void 0, {
            text: mainLocalizationTable.minBet,
            align: "center",
            style: {font: "italic 20px Arial", fill: a.kenoConfig.tipsColor}
        }).name = "minBet";
        d = "gold/" == a.kenoConfig.resources ? parseFloat(clientInfoGlobal.cfkenogmax) / 100 : parseFloat(clientInfoGlobal.cfkenomax) / 100;
        a.mainRenderer.createButton(ea,
            1709, 877, "info", {
                text: numberFormat(d, {thousands_sep: " ", decimals: (d ^ 0) === d ? 0 : 2}),
                align: "center",
                style: {font: "bold 28px Arial", fill: "#e0e0e0"}
            });
        a.mainRenderer.createButton(ea, 1780, 863, void 0, {
            text: mainLocalizationTable.maxBet,
            align: "center",
            style: {font: "italic 20px Arial", fill: a.kenoConfig.tipsColor}
        }).name = "maxBet";
        a.mainRenderer.stage.addChild(ea);
        a.mainRenderer.createButton(K, 1101, 181, "random_num", {
            text: "1",
            align: "center",
            style: {font: "bold 40px Arial Narrow", fill: "#424344"}
        }, function (b) {
            b.texture =
                a.mainRenderer.resourceLoader.resources.keyboard_pressed.texture;
            b.getChildByName("text" + b.name).style = {font: "bold 40px Arial Narrow", fill: "#ffffff"};
            a.mainGrid.removeCurrentBets();
            a.mainGrid.createRandomBets();
            (b = F.getChildByName("done")) && b.interactive && (b.emit("mousedown"), b.emit("mouseup"));
            ua();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources.random_num.texture;
            b.getChildByName("text" + b.name).style = {
                font: "bold 40px Arial Narrow",
                fill: "#424344"
            };
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).on("mouseover", function () {
            K.getChildByName("random_num").getChildByName("keyboard_selected").visible = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }).on("mouseout", function () {
            K.getChildByName("random_num").getChildByName("keyboard_selected").visible = !1;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        a.mainRenderer.createButton(K.getChildByName("random_num"), 0, 0, "keyboard_selected").visible = !1;
        a.mainRenderer.createButton(K,
            1100, 181, "minus", void 0, function (b) {
                a.mainSoundManager.playSound("buttonClick");
                b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
                b = parseInt(K.getChildByName("random_num").getChildByName("textrandom_num").text);
                b = limit(b - 1, 1, 10);
                a.mainGrid.setRandomBetsCount(b);
                K.getChildByName("random_num").getChildByName("textrandom_num").text = b;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, function (b) {
                b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
                a.mainRenderer.renderManager.needUpdateRender =
                    !0
            });
        a.mainRenderer.createButton(K, 1202, 181, "plus", void 0, function (b) {
            a.mainSoundManager.playSound("buttonClick");
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            b = parseInt(K.getChildByName("random_num").getChildByName("textrandom_num").text);
            b = limit(b + 1, 1, 10);
            a.mainGrid.setRandomBetsCount(b);
            K.getChildByName("random_num").getChildByName("textrandom_num").text = b;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        a.mainRenderer.stage.addChild(K);
        var N = "gold/" != a.kenoConfig.resources ? TWEEN.Easing.Back.InOut : TWEEN.Easing.Exponential.Out;
        a.mainRenderer.createButton(Z, 1101, 876, "on_off_bg", void 0, function (b) {
            a.mainSoundManager.playSound("buttonClick");
            na && (ta(), na = !1);
            ja = !ja;
            Z.getChildByName("AutoplayState0").children[0].style = ja ? {
                font: "26px Arial Bold",
                fill: "#a6a9ab"
            } : {font: "26px Arial Bold", fill: "#ffffff"};
            Z.getChildByName("AutoplayState1").children[0].style =
                ja ? {font: "26px Arial Bold", fill: "#ffffff"} : {font: "26px Arial Bold", fill: "#a6a9ab"};
            b.interactive = !1;
            var x = ja ? "gold/" != a.kenoConfig.resources ? 1173 : 1178 : "gold/" != a.kenoConfig.resources ? 1101 : 1104;
            a.mainRenderer.renderManager.animationTweenInc();
            (new TWEEN.Tween(Z.getChildByName("on_off").position)).to({x}, 400).easing(N).onComplete(function () {
                b.interactive = !0;
                a.mainRenderer.renderManager.animationTweenDec()
            }).start();
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        a.mainRenderer.createButton(Z, "gold/" !=
        a.kenoConfig.resources ? 1101 : 1104, "gold/" != a.kenoConfig.resources ? 876 : 880, "on_off");
        a.mainRenderer.createButton(Z, 1137, 900, void 0, {
            text: "OFF",
            align: "center",
            style: {font: "26px Arial Bold", fill: "#ffffff"}
        }).name = "AutoplayState0";
        a.mainRenderer.createButton(Z, 1209, 900, void 0, {
            text: "ON",
            align: "center",
            style: {font: "26px Arial Bold", fill: "#a6a9ab"}
        }).name = "AutoplayState1";
        a.mainRenderer.stage.addChild(Z);
        a.mainRenderer.createButton(F, 1101, 935, "delete", {
            text: mainLocalizationTable.delete, align: "center", style: {
                font: "25px Arial Bold",
                fill: "#a6a9ab"
            }
        }, function (b) {
            a.mainSoundManager.playSound("clearBet");
            b.texture = a.mainRenderer.resourceLoader.resources.delete_pressed.texture;
            b.getChildByName("text" + b.name).style = {font: "25px Arial Bold", fill: "#ffffff"};
            a.mainGrid.removeCurrentBets();
            a.mainFLGAccount.maxWin(0);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources["delete"].texture;
            b.getChildByName("text" + b.name).style = {font: "25px Arial Bold", fill: "#a6a9ab"};
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        });
        c = 1557;
        g = 992;
        for (d = 0; d < M.possibleBets.length; d++) q = a.mainRenderer.createButton(F, c, g, "keyboard", {
            text: M.possibleBets[d],
            align: "center",
            style: {font: "bold 40px Arial Narrow", fill: "#a6a9ab", align: "center"}
        }, function (b) {
            a.mainSoundManager.playSound("chipSelector");
            b.texture = a.mainRenderer.resourceLoader.resources.keyboard_pressed.texture;
            b.getChildByName("text" + b.name).style = {
                font: "bold 40px Arial Narrow",
                fill: "#ffffff",
                align: "center"
            };
            M.setBet(b.getChildByName("text" + b.name).text);
            ua();
            b = b.getChildByName("keyboard_selected");
            b != da && (da.visible = !1, da = b, da.visible = !0);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources.keyboard.texture;
            b.getChildByName("text" + b.name).style = {
                font: "bold 40px Arial Narrow",
                fill: "#a6a9ab",
                align: "center"
            };
            a.mainRenderer.renderManager.needUpdateRender = !0
        }), M.possibleBets[d] == "MAX\n" + W && q.getChildByName("text" + q.name).scale.set(.54, .45), 2 > d ? c -= 152 : 2 < d && (c += 152), 2 == d && (g -= 57), q = a.mainRenderer.createButton(q, 0, 0, "keyboard_selected"),
            q.visible = !da && M.currentBet() == M.possibleBets[d], da || M.currentBet() != M.possibleBets[d] || (da = q);
        q = q = null;
        a.mainRenderer.createButton(F, 1101, 992, "repeat", {
            text: mainLocalizationTable.repeat,
            align: "center",
            style: {font: "25px Arial Bold", fill: "#a6a9ab"}
        }, function (b) {
            a.mainSoundManager.playSound("buttonClick");
            b.texture = a.mainRenderer.resourceLoader.resources.repeat_pressed.texture;
            b.getChildByName("text" + b.name).style = {font: "25px Arial Bold", fill: "#ffffff"};
            na && (ta(), na = !1);
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources.repeat.texture;
            b.getChildByName("text" + b.name).style = {font: "25px Arial Bold", fill: "#a6a9ab"};
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        a.mainRenderer.createButton(F, 1709, 935, "done", {
            text: mainLocalizationTable.done.toUpperCase() + "\n",
            align: "center",
            style: {font: "32px Arial Bold", fill: "#a6a9ab", align: "center"}
        }, function (b) {
            a.mainSoundManager.playSound("buttonClick");
            b.texture = a.mainRenderer.resourceLoader.resources.done_pressed.texture;
            b.getChildByName("text" + b.name).style = {font: "32px Arial Bold", fill: "#ffffff", align: "center"};
            a.mainRenderer.renderManager.needUpdateRender = !0;
            0 < a.mainGrid.pressedZones.length && (b.interactive = !1, C.getActedOutEdition().betsHistory.addBet({
                summ: M.currentBet(),
                bet: a.mainGrid.getIntArrayOfPressedZones(),
                winBets: [],
                countWin: 0,
                win: void 0
            }, C.getActedOutEdition().round, function (x) {
                x && (a.mainFLGAccount.maxWin(0), a.mainGrid.selectZones(function (f) {
                    f.emit("mousedown");
                    f.emit("mouseup");
                    f.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture;
                    if (-1 == a.mainGrid.selectedZones.indexOf(f)) {
                        var p = new PIXI.Text(M.currentBet(), a.kenoConfig.smallGridTextStyle);
                        p.anchor.x = 1;
                        p.anchor.y = .9;
                        p.position.y = f.height;
                        p.position.x = f.width;
                        p.name = "smallchip" + f.name;
                        p.visible = "gold/" != a.kenoConfig.resources;
                        f.addChild(p)
                    } else f.getChildByName("smallchip" + f.name).text = +parseFloat(parseFloat(f.getChildByName("smallchip" + f.name).text) + M.currentBet()).toFixed(10)
                }), b.getChildByName("text" + b.name).style = {
                    font: "32px Arial Bold",
                    fill: "#a6a9ab",
                    align: "center"
                });
                b.interactive = !0;
                b.texture = a.mainRenderer.resourceLoader.resources.done.texture;
                C.getActedOutEdition();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }))
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources.done.texture;
            b.getChildByName("text" + b.name).style = {font: "32px Arial Bold", fill: "#a6a9ab", align: "center"};
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        F.position.y = 150;
        a.mainRenderer.stage.addChild(F);
        a.mainRenderer.createButton(Y, 1260, 195, void 0, {
            text: mainLocalizationTable.descRandom[0],
            align: "left", style: {font: "italic 20px Arial", fill: a.kenoConfig.tipsColor}
        });
        a.mainRenderer.createButton(Y, 1260, 215, void 0, {
            text: mainLocalizationTable.descRandom[1],
            align: "left",
            style: {font: "italic 20px Arial", fill: a.kenoConfig.tipsColor}
        });
        a.mainRenderer.createButton(Y, 1260, 888, void 0, {
            text: mainLocalizationTable.descAutoRepeat[0],
            align: "left",
            style: {font: "italic 22px Arial", fill: a.kenoConfig.tipsColor}
        });
        a.mainRenderer.createButton(Y, 1260, 912, void 0, {
            text: mainLocalizationTable.descAutoRepeat[1], align: "left",
            style: {font: "italic 22px Arial", fill: a.kenoConfig.tipsColor}
        });
        a.mainRenderer.stage.addChild(Y);
        ba = a.mainRenderer.createButton(void 0, 1104, 295, "time_line");
        ha = a.mainRenderer.createButton(void 0, 145, 112 + a.kenoConfig.editionsTable.yPos, void 0, {
            text: "00:00",
            align: "center",
            style: {font: "30px Arial Bold", fill: a.kenoConfig.numColor}
        });
        d = {};
        d = "gold/" != a.kenoConfig.resources ? {
            font: "bold 50px Trebuchet MS",
            fill: a.kenoConfig.tipsColor
        } : {font: "50px Arial Bold", fill: "#715333"};
        ra = a.mainRenderer.createButton(void 0,
            1795, 303, void 0, {text: "00:00 ", align: "center", style: d});
        a.mainGrid.createZones(a.kenoConfig.zoneSize[0], a.kenoConfig.zoneSize[1], a.kenoConfig.gridOffset, a.kenoConfig.gridTextStyle, function (b, x, f) {
            if (b.selected || !(a.mainGrid.pressedZones.length >= a.mainGrid.maxPreessedZones)) {
                x ? b.selected || (b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture) : a.mainGrid.gridContainer.down = !0;
                if (x && a.mainGrid.gridContainer.down || !x && !f || f && (b.name != la || void 0 == la)) b.selected ? (-1 != a.mainGrid.selectedZones.indexOf(b) ?
                    b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture : b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture, "gold/" == a.kenoConfig.resources && (b.getChildByName("text" + b.name).style = a.kenoConfig.gridTextStyle), b.selected = !1, a.mainGrid.pressedZones.splice(a.mainGrid.pressedZones.indexOf(b), 1)) : (b.texture = a.mainRenderer.resourceLoader.resources.zone_pressed.texture, "gold/" == a.kenoConfig.resources && (b.getChildByName("text" + b.name).style = a.kenoConfig.gridTextStylePressed),
                    b.selected = !0, a.mainSoundManager.playSound("firstChip"), a.mainGrid.pressedZones.push(b));
                f && (la = b.name);
                a.mainGrid.gridContainer.down && ua();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }, function (b, x) {
            x ? b.selected || a.mainGrid.gridContainer.down || b.getChildByName("smallchip" + b.name) || (b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture) : (a.mainGrid.gridContainer.down = !1, la = void 0);
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        a.mainRenderer.stage.on("changeLang", va);
        a.mainGameManager.gameStateAsync(function (b) {
            var x =
                0 >= b.t2 ? b.tir : b.tir + 1;
            C.editions.length && C.editions[C.editions.length - 1].round === x || C.addEdition(x);
            if (C.editions.length && C.editions[C.editions.length - 1].round === x) {
                for (var f = C.editions[C.editions.length - 1].betsHistory.bets, p = x = 0; p < f.length; p++) x += f[p].summ, a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_selected.texture, void 0, {
                    childName: void 0, childTexture: void 0, addZoneChild: function (t) {
                        if (-1 == a.mainGrid.selectedZones.indexOf(t)) {
                            var E = new PIXI.Text(f[p].summ, a.kenoConfig.smallGridTextStyle);
                            E.anchor.x = 1;
                            E.anchor.y = .9;
                            E.position.y = t.height;
                            E.position.x = t.width;
                            E.name = "smallchip" + t.name;
                            E.visible = "gold/" != a.kenoConfig.resources;
                            t.addChild(E)
                        } else t.getChildByName("smallchip" + t.name).text = +parseFloat(parseFloat(t.getChildByName("smallchip" + t.name).text) + f[p].summ).toFixed(10);
                        a.mainGrid.selectedZones.push(t)
                    }
                }, f[p].bet);
                a.mainFLGAccount.totalBet(x, !0);
                oa = !0
            }
            C.drawEditions();
            ma = new hotcoldComponent(b, a.mainRenderer.stage, 77, 182, a.mainRenderer.resourceLoader.resources.tableHotCold.texture,
                {font: "36px Arial", fill: "#c4c4c4"}, {
                    hot: {
                        0: {y: 33, x: 52, w: 74, h: 37},
                        1: {y: 33, x: 129, w: 74, h: 37},
                        2: {y: 33, x: 206, w: 74, h: 37},
                        3: {y: 33, x: 283, w: 74, h: 37},
                        4: {y: 33, x: 360, w: 74, h: 37},
                        5: {y: 33, x: 437, w: 74, h: 37}
                    },
                    cold: {
                        0: {y: 108, x: 52, w: 74, h: 37},
                        1: {y: 108, x: 129, w: 74, h: 37},
                        2: {y: 108, x: 206, w: 74, h: 37},
                        3: {y: 108, x: 283, w: 74, h: 37},
                        4: {y: 108, x: 360, w: 74, h: 37},
                        5: {y: 108, x: 437, w: 74, h: 37}
                    }
                }, function (t, E) {
                    var H = null, P = null, aa = null, Q = null;
                    for (P in E.cold) if (!(5 < parseInt(P))) {
                        var fa = E.cold[P][0] - 1;
                        H = a.mainGrid.zones[fa];
                        (Q = H.getChildByName("hotcold" +
                            fa)) ? (Q.alpha = t ? 0 : 1, Q.texture = a.mainRenderer.resourceLoader.resources.tableColdNum.texture, Q.visible = !0) : (Q = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.tableColdNum.texture), Q.name = "hotcold" + fa, Q.alpha = t ? 0 : 1, H.addChild(Q))
                    }
                    for (aa in E.hot) 5 < parseInt(aa) || (fa = E.hot[aa][0] - 1, H = a.mainGrid.zones[fa], (Q = H.getChildByName("hotcold" + fa)) ? (Q.alpha = t ? 0 : 1, Q.texture = a.mainRenderer.resourceLoader.resources.tableHotNum.texture, Q.visible = !0) : (Q = new PIXI.Sprite(a.mainRenderer.resourceLoader.resources.tableHotNum.texture),
                        Q.name = "hotcold" + fa, Q.alpha = t ? 0 : 1, H.addChild(Q)));
                    t && (a.mainRenderer.renderManager.animationTweenInc(), (new TWEEN.Tween({alpha: 1})).to({alpha: 0}, 400).onUpdate(function () {
                        var pa;
                        for (pa in t.cold) {
                            var U = parseInt(t.cold[pa]) - 1;
                            a.mainGrid.zones[U].getChildByName("hotcold" + U).alpha = this.alpha
                        }
                        for (var wa in t.hot) U = parseInt(t.hot[wa]) - 1, a.mainGrid.zones[U].getChildByName("hotcold" + U).alpha = this.alpha
                    }).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        var pa;
                        for (pa in t.cold) {
                            var U =
                                parseInt(t.cold[pa]) - 1;
                            a.mainGrid.zones[U].getChildByName("hotcold" + U).vizible = !1
                        }
                        for (var wa in t.hot) U = parseInt(t.hot[wa]) - 1, a.mainGrid.zones[U].getChildByName("hotcold" + U).vizible = !1;
                        a.mainRenderer.renderManager.animationTweenInc();
                        (new TWEEN.Tween({alpha: 0})).to({alpha: 1}, 400).onUpdate(function () {
                            var xa;
                            for (xa in E.cold) if (!(5 < parseInt(xa))) {
                                var qa = parseInt(E.cold[xa]) - 1;
                                a.mainGrid.zones[qa].getChildByName("hotcold" + qa).alpha = this.alpha
                            }
                            for (var za in E.hot) 5 < parseInt(za) || (qa = parseInt(E.hot[za]) -
                                1, a.mainGrid.zones[qa].getChildByName("hotcold" + qa).alpha = this.alpha)
                        }).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec()
                        }).start()
                    }).start());
                    Q = aa = P = H = null
                }, a.mainRenderer.renderManager);
            X.updateJackpotData(b);
            switch (a.kenoConfig.runconfig) {
                case "KenoOldGreen":
                case "KenoOldRed":
                case "KenoOldBlue":
                    X.drawJackpot(647, 880);
                    break;
                case "KenoOldGold":
                    X.drawJackpot(648, 898)
            }
            sa(b);
            e && e()
        })
    }, function () {
        a.mainSoundManager.playRandomBackSound()
    });
    var va = function () {
        mainLocalizationTable =
            mainLocalizator.getLocalizationTable();
        a.mainFLGAccount.updateAccountText();
        C.redrawEditionHeader();
        C.drawBetsHeader();
        F.getChildByName("done").getChildByName("textdone").text = mainLocalizationTable.done + "\n";
        a.mainUIManager.localizeButtons(["delete", "repeat"]);
        a.mainUIManager.drawDescs();
        a.mainUIManager.localizeCoefHeader();
        ea.getChildByName("minBet").children[0].text = mainLocalizationTable.minBet;
        ea.getChildByName("maxBet").children[0].text = mainLocalizationTable.maxBet;
        a.mainRenderer.renderManager.needUpdateRender =
            !0
    };
    this.onLanguageChange = va;
    this.localizeCoefHeader = function () {
        a.mainRenderer.stage.getChildByName("table_coefficients").getChildByName("coefHeader").getChildByName("textundefined").text = mainLocalizationTable.coefHeader
    };
    this.localizeButtons = function (d) {
        for (var c = 0; c < d.length; c++) F.getChildByName(d[c]).getChildByName("text" + d[c]).text = mainLocalizationTable[d[c]]
    };
    var Y = new PIXI.Container;
    this.drawDescs = function () {
        Y.children[0].children[0].text = mainLocalizationTable.descRandom[0];
        Y.children[1].children[0].text =
            mainLocalizationTable.descRandom[1];
        Y.children[2].children[0].text = mainLocalizationTable.descAutoRepeat[0];
        Y.children[3].children[0].text = mainLocalizationTable.descAutoRepeat[1]
    };
    this.setInteraction = function (d) {
        Z.getChildByName("on_off_bg").interactive = d;
        F.getChildByName("done").interactive = d;
        F.getChildByName("done").texture = a.mainRenderer.resourceLoader.resources[1 == d ? "done" : "done_disabled"].texture;
        a.mainGrid.setZoneInteraction(d);
        F.getChildByName("delete").interactive = d;
        F.getChildByName("delete").texture =
            a.mainRenderer.resourceLoader.resources[1 == d ? "delete" : "keyboard_disabled"].texture;
        F.getChildByName("repeat").interactive = d;
        F.getChildByName("repeat").texture = a.mainRenderer.resourceLoader.resources[1 == d ? "repeat" : "keyboard_disabled"].texture;
        for (var c in K.children) K.children[c].interactive = d, K.children[c].texture = "random_num" == K.children[c].name ? a.mainRenderer.resourceLoader.resources[1 == d ? K.children[c].name : "keyboard_disabled"].texture : a.mainRenderer.resourceLoader.resources[1 == d ? K.children[c].name :
            K.children[c].name + "_disabled"].texture;
        for (c in F.children) "keyboard" == F.children[c].name && (F.children[c].interactive = d, F.children[c].texture = a.mainRenderer.resourceLoader.resources[1 == d ? "keyboard" : "keyboard_disabled"].texture);
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.setTextScale = function (d) {
        switch (d.text.length) {
            case 4:
                d.scale.set(.75, .75);
                break;
            case 3:
                "MAX" == d.text ? d.scale.set(.7, .7) : d.scale.set(.9, .9);
                break;
            default:
                d.scale.set(1, 1)
        }
    };
    var ta = function () {
        if (a.mainGameManager && !(2 >
            C.editions.length)) {
            var d = C.editions[C.editions.length - 2].betsHistory.bets;
            d.length && C.getActedOutEdition().betsHistory.addBet(d, C.getActedOutEdition().round, function (c) {
                if (c && c.length) {
                    var e;
                    for (e = 0; e < c.length; e++) a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_selected.texture, void 0, {
                        childName: void 0, childTexture: void 0, addZoneChild: function (r) {
                            if (-1 == a.mainGrid.selectedZones.indexOf(r)) {
                                var w = new PIXI.Text(c[e].summ, a.kenoConfig.smallGridTextStyle);
                                w.anchor.x = 1;
                                w.anchor.y =
                                    .9;
                                w.position.y = r.height;
                                w.position.x = r.width;
                                w.name = "smallchip" + r.name;
                                w.visible = "gold/" != a.kenoConfig.resources;
                                r.addChild(w)
                            } else r.getChildByName("smallchip" + r.name).text = +parseFloat(parseFloat(r.getChildByName("smallchip" + r.name).text) + c[e].summ).toFixed(10);
                            a.mainGrid.selectedZones.push(r)
                        }
                    }, c[e].bet)
                } else c && a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_selected.texture, void 0, {
                    childName: void 0, childTexture: void 0, addZoneChild: function (r) {
                        if (-1 == a.mainGrid.selectedZones.indexOf(r)) {
                            var w =
                                new PIXI.Text(c.summ, a.kenoConfig.smallGridTextStyle);
                            w.anchor.x = 1;
                            w.anchor.y = .9;
                            w.position.y = r.height;
                            w.position.x = r.width;
                            w.name = "smallchip" + r.name;
                            w.visible = "gold/" != a.kenoConfig.resources;
                            r.addChild(w)
                        } else r.getChildByName("smallchip" + r.name).text = +parseFloat(parseFloat(r.getChildByName("smallchip" + r.name).text) + c.summ).toFixed(10);
                        a.mainGrid.selectedZones.push(r)
                    }
                }, c.bet)
            })
        }
    }, ua = function () {
        var d = 0;
        0 < a.mainGrid.pressedZones.length && 0 < M.currentBet() && (d = M.currentBet() * a.mainGameManager.coefficients[a.mainGrid.pressedZones.length][a.mainGrid.pressedZones.length -
        1]);
        a.mainFLGAccount.maxWin(d)
    }, ya = 0, Aa = 0, sa = function (d) {
        function c(m) {
            a.mainGameManager && (ba.scale.x = m, ha.getChildByName("text" + ha.name).text = T.getTimerText(), ra.getChildByName("text" + ra.name).text = T.getTimerText() + " ", a.mainRenderer.renderManager.needUpdateRender = !0)
        }

        function e(m) {
            a.mainGameManager && ($(window).trigger("restartHls"), C.events.emit("BET_TIME"), X.updateJackpotData(m), a.mainRenderer.renderManager.animationTweenInc(), (new TWEEN.Tween(F.position)).to({y: 0}, 900).easing(TWEEN.Easing.Back.Out).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec()
            }).start(),
                oa ? oa = !1 : (a.mainFLGAccount.setWinTextVisible(!0), a.mainGrid.removeSelectedBets(), a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_transp.texture, a.kenoConfig.gridTextStyle, void 0, a.mainGrid.getIntArrayOfZones())), ma && ma.update(m), a.mainUIManager.setInteraction(!0), ka.removeBalls(), C.addEdition(m.tir + 1), ja ? ta() : na = !0, T.start({
                minutes: 0,
                seconds: a.kenoConfig.tirTime - m.t2
            }, {minutes: 0, seconds: a.kenoConfig.tirTime}, c, function () {
                a.mainGameManager && (a.mainGrid.removeCurrentBets(), a.mainUIManager.setInteraction(!1),
                    a.mainSoundManager.playSound("endBet"), a.mainRenderer.renderManager.animationTweenInc(), (new TWEEN.Tween(F.position)).to({y: 150}, 900).easing(TWEEN.Easing.Back.In).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec()
                }).start())
            }, .1, sa))
        }

        function r(m) {
            function B() {
                a.mainGameManager && (a.mainGameManager.gameStateAsync(D), a.mainRenderer.renderManager.needUpdateRender = !0)
            }

            function D(h) {
                function n(u) {
                    if (a.mainGrid && a.mainGameManager) if (q >= g.length) u(); else {
                        var A = g.slice(0, q + 1);
                        a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_win.texture,
                            a.kenoConfig.gridTextStylePressed, void 0, [g[q]], 0);
                        a.mainSoundManager.playSound("ball");
                        ka.startDrawBalls(A, 1, 0);
                        C.cancelLastEdition(A);
                        q += 1;
                        setTimeout(function () {
                            n(u)
                        }, 900)
                    }
                }

                if (a.mainGameManager) if (99 === h.b1) setTimeout(B, 2E3); else {
                    var g = [h.b1, h.b2, h.b3, h.b4, h.b5, h.b6, h.b7, h.b8, h.b9, h.b10, h.b11, h.b12, h.b13, h.b14, h.b15, h.b16, h.b17, h.b18, h.b19, h.b20],
                        q = limit(G, 0, 19);
                    if (0 !== q) for (h = 0; h <= q; h++) a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_win.texture, a.kenoConfig.gridTextStylePressed,
                        void 0, [g[h]], 0);
                    n(function () {
                        a.mainFLGAccount.calculateWin(C.getActedOutEdition().betsHistory.bets, a.kenoConfig.appName, function () {
                            X.updateJackpotData(m);
                            X.drawJackpotWin(2E4, {
                                x: 1484,
                                y: 664
                            }, a.mainRenderer.resourceLoader.resources.JP.texture);
                            C.getActedOutEdition().betsHistory.setTotalWin(a.mainFLGAccount.totalWin());
                            C.getActedOutEdition().betsHistory.redrawBetsHistory();
                            var u = a.kenoConfig.winShowTime ? a.kenoConfig.winShowTime : 6E3;
                            ya = setTimeout(sa, u);
                            a.mainFLGAccount.winToBalanceAnimation(u, 2E3, {
                                x: 558,
                                y: 622
                            }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                font: "bold 70px Arial",
                                fill: "#bcbcbc"
                            }, X.jpWin())
                        }, a.kenoConfig);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    });
                    l()
                }
            }

            if (a.mainGameManager) {
                C.events.emit("RESULT_TIME");
                var l = function () {
                    if ("bets_11" == a.kenoConfig.appName) {
                        var h = "Login: " + clientInfoGlobal.lgn + " || Club: " + clientInfoGlobal.hallid;
                        h += " || Jackpot: " + (1 == m.myjp ? "YES" : "NO") + " || GameInfo: " + JSON.stringify(m);
                        a.mainRenderer.logService.setStats(h, a.kenoConfig.appName)
                    }
                }, G = a.kenoConfig.rTime -
                    parseInt(m.tOrig, 10) - 1;
                0 > G ? (a.kenoConfig.needRtc && (G += 7), setTimeout(B, 1E3 * -G)) : B();
                a.mainUIManager.setInteraction(!1);
                if (oa) {
                    var k = a.mainFLGAccount.totalBet();
                    a.mainFLGAccount.setWinTextVisible(!1);
                    a.mainFLGAccount.totalBet(k, !0);
                    oa = !1
                } else a.mainFLGAccount.setWinTextVisible(!1)
            }
        }

        function w(m) {
            0 >= m.t2 ? r(m) : e(m)
        }

        void 0 != a.mainGameManager && (d ? w(d) : a.mainGameManager.gameStateAsync(w))
    }
};
