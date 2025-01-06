registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_1_min",
    image: "games/Keno/resources/NG/icons/keno-NG-1-min.png",
    imageBack: "games/Keno/resources/NG/icons/keno-NG-1-min-back.png",
    caption: "Keno 1 min",
    runConfig: "KenoNG",
    gameType: "blue",
    playInDemo: !0,
    gameBG: "images/games-bg/game-bg-blue.jpg"
});
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_2_min",
    image: "games/Keno/resources/NG/icons/keno-NG-2-min.png",
    imageBack: "games/Keno/resources/NG/icons/keno-NG-2-min-back.png",
    caption: "Keno 2 min",
    runConfig: "KenoNG",
    gameType: "red",
    playInDemo: !0,
    gameBG: "images/games-bg/game-bg-red.jpg"
});
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_4_min",
    image: "games/Keno/resources/NG/icons/keno-NG-4-min.png",
    imageBack: "games/Keno/resources/NG/icons/keno-NG-4-min-back.png",
    caption: "Keno 4 min",
    runConfig: "KenoNG",
    gameType: "green",
    playInDemo: !0,
    gameBG: "images/games-bg/game-bg-green.jpg"
});
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_4_min",
    image: "games/Keno/resources/NG/icons/keno-v1.png",
    imageBack: "games/Keno/resources/NG/icons/keno-NG-4-min-back.png",
    caption: "Keno V",
    runConfig: "KenoNG",
    gameType: "v",
    playInDemo: !0,
    gameBG: "images/games-bg/game-bg-green.jpg"
});
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_Gold",
    image: "games/Keno/resources/NG/icons/keno-NG-gold.png",
    imageBack: "games/Keno/resources/NG/icons/keno-NG-gold-back.png",
    caption: "Keno Gold",
    runConfig: "KenoNG",
    gameType: "gold",
    playInDemo: !0,
    gameBG: "images/games-bg/game-bg-gold.jpg"
});
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_1_min",
    image: "games/Keno/resources/NG/icons/keno-NG-1-min.png",
    imageBack: "games/Keno/resources/NG/icons/keno-NG-1-min-back.png",
    caption: "Keno X 1 min",
    runConfig: "KenoNG",
    gameType: "x1",
    playInDemo: !0,
    gameBG: "images/games-bg/game-bg-blue.jpg",
    sid: 26
});
registrationAppOnPlatform({
    category: "keno",
    catalog: "Keno_2_min",
    image: "games/Keno/resources/NG/icons/keno-NG-2-min.png",
    imageBack: "games/Keno/resources/NG/icons/keno-NG-2-min-back.png",
    caption: "Keno X 2 min",
    runConfig: "KenoNG",
    gameType: "x2",
    playInDemo: !0,
    gameBG: "images/games-bg/game-bg-red.jpg",
    sid: 27
});
const KenoNg = {defaultCoefTable: [[0, 0, 0, 0, 0, 0, 1, 1, 2, 2], [3.5, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 2, 1, 1, 0, 0, 0, 0, 0], [0, 0, 50, 10, 3, 2, 2, 0, 0, 0], [0, 0, 0, 100, 20, 15, 4, 5, 1, 0], [0, 0, 0, 0, 150, 60, 20, 15, 10, 5], [0, 0, 0, 0, 0, 500, 80, 50, 25, 30], [0, 0, 0, 0, 0, 0, 1E3, 200, 125, 100], [0, 0, 0, 0, 0, 0, 0, 2E3, 1E3, 300], [0, 0, 0, 0, 0, 0, 0, 0, 5E3, 2E3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1E4]]};
var configsNG = {
    green: {
        serverName: "srv48",
        appName: "bets_48",
        serverNum: "s48",
        nameImage: ["K", "E", "N", "O", "4min"],
        BG: "bg-green",
        coefTable: KenoNg.defaultCoefTable,
        videoURL: "rtmp://w1.flg10.bet:1935/Keno4v2c&Video0=myStream&amp",
        videoMobileURL: "https://w1.flg10.bet/keno/myStream/playlist.m3u8",
        videoPos: {x: 54, y: 192},
        videoSize: {w: 1089, h: 663},
        menuBgColor: "0x2aaf30",
        tirTime: 180,
        canvasId: "",
        runconfig: "KenoNGGreen",
        gameType: "Green",
        gameKind: "Keno",
        gameVariant: "NG",
        caption: "Keno 4 min",
        rTime: -20,
        timerOffset: 21,
        theme: "green"
    },
    v: {
        serverName: "srv58",
        appName: "bets_58",
        serverNum: "s40",
        nameImage: ["K", "E", "N", "O", "v"],
        BG: "bg-green",
        coefTable: [[0, 0, 0, 0, 0, 0, 1, 1, 2, 2], [3.5, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 2, 1, 1, 0, 0, 0, 0, 0], [0, 0, 50, 10, 3, 2, 2, 0, 0, 0], [0, 0, 0, 100, 20, 15, 4, 5, 1, 0], [0, 0, 0, 0, 150, 60, 20, 15, 10, 5], [0, 0, 0, 0, 0, 500, 80, 50, 35, 30], [0, 0, 0, 0, 0, 0, 1E3, 200, 125, 100], [0, 0, 0, 0, 0, 0, 0, 2E3, 1E3, 300], [0, 0, 0, 0, 0, 0, 0, 0, 5E3, 2E3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1E4]],
        videoURL: "rtmp://w1.flg10.bet:1935/Keno4v2c&Video0=myStream&amp",
        videoMobileURL: "https://w1.flg10.bet/KenoV/myStream/playlist.m3u8",
        videoPos: {x: 54, y: 192},
        videoSize: {w: 1089, h: 663},
        menuBgColor: "0x2aaf30",
        tirTime: 180,
        canvasId: "",
        runconfig: "KenoNGV",
        gameType: "V",
        gameKind: "Keno",
        gameVariant: "NG",
        caption: "Keno 4 min",
        rTime: -20,
        timerOffset: 21,
        autoplay: "off",
        theme: "green"
    },
    gold: {
        serverName: "srv85",
        appName: "bets_85",
        serverNum: "s10",
        nameImage: ["Kg", "Eg", "Ng", "Og", "gold"],
        BG: "bg-gold",
        coefTable: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3.5, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 2, 1, 1, 0, 0, 0, 0, 0], [0, 0, 50, 10, 3, 2, 2, 0, 0, 0], [0, 0, 0, 100, 20, 15, 4, 5, 2, 1], [0, 0, 0, 0, 150, 60, 20, 15, 10,
            5], [0, 0, 0, 0, 0, 500, 80, 50, 25, 30], [0, 0, 0, 0, 0, 0, 1E3, 200, 125, 100], [0, 0, 0, 0, 0, 0, 0, 2E3, 1E3, 300], [0, 0, 0, 0, 0, 0, 0, 0, 5E3, 2E3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1E4]],
        videoURL: "rtmp://w1.flg10.bet:1935/kenoGold&amp;Video0=stream3:180&amp",
        videoMobileURL: "https://w1.flg10.bet/kenoGold/myStream/playlist.m3u8",
        videoPos: {x: 54, y: 192},
        videoSize: {w: 1089, h: 663},
        menuBgColor: "0xb9902c",
        tirTime: 80,
        canvasId: "",
        runconfig: "KenoNGGold",
        gameType: "Gold",
        gameKind: "Keno",
        gameVariant: "NG",
        caption: "Keno Gold",
        rTime: -20,
        timerOffset: 28,
        theme: "gold"
    },
    red: {
        serverName: "srv11",
        appName: "bets_11",
        serverNum: "s11",
        nameImage: ["K", "E", "N", "O", "2min"],
        BG: "bg-red",
        coefTable: KenoNg.defaultCoefTable,
        videoURL: "rtmp://w1.flg10.bet:1935/keno-fast&amp;Video0=myStream:150&amp",
        videoMobileURL: "https://w1.flg10.bet/keno-fast/myStream/playlist.m3u8",
        videoPos: {x: 54, y: 192},
        videoSize: {w: 1089, h: 663},
        menuBgColor: "0xaf0f17",
        tirTime: 125,
        canvasId: "",
        runconfig: "KenoNGRed",
        gameType: "Red",
        gameKind: "Keno",
        gameVariant: "NG",
        caption: "Keno 2 min",
        rTime: -20,
        timerOffset: 22,
        theme: "red"
    },
    blue: {
        serverName: "srv30",
        appName: "bets_30",
        serverNum: "s30",
        nameImage: ["K", "E", "N", "O", "1min"],
        BG: "bg-blue",
        coefTable: KenoNg.defaultCoefTable,
        videoURL: "rtmp://w1.flg10.bet:1935/keno-fast1min&amp;Video0=myStream:150&amp",
        videoMobileURL: "https://w1.flg10.bet/keno-fast1min/myStream/playlist.m3u8",
        videoPos: {x: 54, y: 192},
        videoSize: {w: 1089, h: 663},
        menuBgColor: "0x1d59c7",
        tirTime: 65,
        canvasId: "",
        runconfig: "KenoNGBlue",
        gameType: "Blue",
        gameKind: "Keno",
        gameVariant: "NG",
        caption: "Keno 1 min",
        rTime: -20,
        timerOffset: 23,
        theme: "blue"
    },
    x2: {
        serverName: "srv96",
        appName: "bets_96",
        serverNum: "s96",
        nameImage: ["K", "E", "N", "O", "2min"],
        BG: "bg-red",
        coefTable: KenoNg.defaultCoefTable,
        videoPos: {x: 54, y: 192},
        videoSize: {w: 1089, h: 663},
        menuBgColor: "0xaf0f17",
        tirTime: 125,
        canvasId: "",
        runconfig: "KenoNGRed",
        gameType: "x2",
        gameKind: "Keno",
        gameVariant: "NG",
        caption: "Keno 2 min",
        rTime: -20,
        timerOffset: 22,
        theme: "red",
        needRtc: !0,
        videoRtcUrl: "wss://keno-stream.flg10.bet/webrtc-session.json",
        videoRtcApp: "keno 2x",
        videoRtcStream: "myStream"
    },
    x1: {
        serverName: "srv95",
        appName: "bets_95",
        serverNum: "s95",
        nameImage: ["K", "E", "N", "O", "1min"],
        BG: "bg-blue",
        coefTable: KenoNg.defaultCoefTable,
        videoURL: "rtmp://w1.flg10.bet:1935/keno-fast1min&amp;Video0=myStream:150&amp",
        videoMobileURL: "https://w1.flg10.bet/keno-fast1min/myStream/playlist.m3u8",
        videoPos: {x: 54, y: 192},
        videoSize: {w: 1089, h: 663},
        menuBgColor: "0x1d59c7",
        tirTime: 65,
        canvasId: "",
        runconfig: "KenoNGBlue",
        gameType: "x1",
        gameKind: "Keno",
        gameVariant: "NG",
        caption: "Keno X 1 min",
        rTime: -20,
        timerOffset: 23,
        theme: "blue",
        needRtc: !0,
        videoRtcUrl: "wss://keno-stream.flg10.bet/webrtc-session.json",
        videoRtcApp: "keno 1x",
        videoRtcStream: "myStream"
    }
}, kenoNGObjectsArr = {green: void 0, gold: void 0, red: void 0, v: void 0, x1: void 0, x2: void 0};

function emitEventKenoNG(a, u) {
    void 0 != kenoNGObjectsArr.green && kenoNGObjectsArr.green.mainRenderer.stage.emit(a, u);
    void 0 != kenoNGObjectsArr.gold && kenoNGObjectsArr.gold.mainRenderer.stage.emit(a, u);
    void 0 != kenoNGObjectsArr.red && kenoNGObjectsArr.red.mainRenderer.stage.emit(a, u);
    void 0 != kenoNGObjectsArr.blue && kenoNGObjectsArr.blue.mainRenderer.stage.emit(a, u);
    void 0 != kenoNGObjectsArr.v && kenoNGObjectsArr.v.mainRenderer.stage.emit(a, u);
    void 0 != kenoNGObjectsArr.x1 && kenoNGObjectsArr.x1.mainRenderer.stage.emit(a,
        u);
    void 0 != kenoNGObjectsArr.x2 && kenoNGObjectsArr.x2.mainRenderer.stage.emit(a, u)
}

function removeKenoNGObject(a, u) {
    if (void 0 != kenoNGObjectsArr[u]) {
        kenoNGObjectsArr[u].destroy();
        for (var U in kenoNGObjectsArr[u]) kenoNGObjectsArr[u][U] = null;
        kenoNGObjectsArr[u] = null
    }
    $("#" + a + " canvas").remove();
    $("#" + a + " div").remove()
}

function initKenoNGObject(a, u, U) {
    configsNG[u].isLobby = U;
    switch (u) {
        case "green":
            configsNG.green.canvasId = a;
            kenoNGObjectsArr.green = mobileMode ? new KenoAppObjNGMobile(configsNG.green) : new KenoAppObjNG(configsNG.green);
            break;
        case "v":
            configsNG.v.canvasId = a;
            kenoNGObjectsArr.v = mobileMode ? new KenoAppObjNGMobile(configsNG.v) : new KenoAppObjNG(configsNG.v);
            break;
        case "gold":
            configsNG.gold.canvasId = a;
            kenoNGObjectsArr.gold = mobileMode ? new KenoAppObjNGMobile(configsNG.gold) : new KenoAppObjNG(configsNG.gold);
            break;
        case "red":
            configsNG.red.canvasId = a;
            kenoNGObjectsArr.red = mobileMode ? new KenoAppObjNGMobile(configsNG.red) : new KenoAppObjNG(configsNG.red);
            break;
        case "blue":
            configsNG.blue.canvasId = a;
            kenoNGObjectsArr.blue = mobileMode ? new KenoAppObjNGMobile(configsNG.blue) : new KenoAppObjNG(configsNG.blue);
            break;
        case "x1":
            configsNG.x1.canvasId = a;
            kenoNGObjectsArr.x1 = mobileMode ? new KenoAppObjNGMobile(configsNG.x1) : new KenoAppObjNG(configsNG.x1);
            break;
        case "x2":
            configsNG.x2.canvasId = a, kenoNGObjectsArr.x2 = mobileMode ? new KenoAppObjNGMobile(configsNG.x2) :
                new KenoAppObjNG(configsNG.x2)
    }
    u = document.createElement("div");
    u.id = "vers";
    u.className = "versbox";
    u.innerText = "v1.0.3";
    (a = document.getElementById(a)) && a.appendChild(u)
}

function refreshKenoNGObject(a, u) {
    removeKenoNGObject(a, u.toLowerCase());
    initKenoNGObject(a, u.toLowerCase())
}

function gameManagerNG(a) {
    this.destroy = function () {
        fa = U = null;
        for (var w in u) u[w] = null;
        u = null
    };
    var u = this;
    this.coefficients = a.kenoConfig.coefTable;
    var U = {};
    this.gameState = function () {
        return U
    };
    this.gameStateAsync = function (w) {
        fa(w)
    };
    var fa = function (w) {
        var P = clientInfoGlobal[a.kenoConfig.serverName];
        P = getUrl(a.kenoConfig.serverNum, gamePostfix) + "?" + P + "&viewall=1";
        var V = {};
        switch (a.kenoConfig.serverNum) {
            case "s40":
            case "s48":
            case "s30":
            case "s11":
            case "s10":
            case "s95":
            case "s96":
                P = getUrl(), V = {
                    oper: "getgameinfo",
                    id_srv: a.kenoConfig.serverName.slice(3, a.kenoConfig.serverName.length)
                }
        }
        $.ajax({
            type: "get", url: P, data: V, dataType: "json", success: function (K, v, X) {
                try {
                    u && (U = K, U.tOrig = U.t2, void 0 != w && w(U))
                } catch (R) {
                    console.log(R), a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
                }
            }, error: function (K, v, X) {
                a.mainRenderer.logService.log(mainLocalizationTable.connError, redirectToRootURL, "critical")
            }
        })
    };
    this.gameHistory = function () {
        function w(R, I) {
            var aa = 0;
            I && (aa = I);
            I = [];
            for (var A = aa +
                20; aa < A; aa++) I.push(R["b" + aa]);
            return I
        }

        if (!u || !U) return console.log("History and gameState not ok."), [];
        var P = [], V = 5;
        0 < parseInt(U.tOrig, 10) && (P.push({tir: U.tir, balls: w(U, 1)}), --V);
        var K, v = "kenog" === a.kenoConfig.appName ? U : U.history;
        if (!v || v === {}) return console.log("History and gameState not ok."), [];
        for (K = 0; K < V; K++) {
            var X = v["tirid" + K];
            P.push({tir: X.tirnum, balls: w(X)})
        }
        return P
    };
    this.sortNumeric = function (w, P) {
        if (w > P) return 1;
        if (w < P) return -1
    }
}

function KenoAppObjNG(a) {
    this.destroy = function () {
        P.destroy();
        P = null;
        V.destroy();
        V = null;
        fa.destroy();
        fa = null;
        w.destroy();
        w = null;
        U.destroy();
        U = null;
        u.mainSoundManager.destroy();
        for (var K in u) u[K] = null;
        u = null;
        rtcVideo.destroy()
    };
    var u = this;
    this.gameDir = FLGUtils.staticRootPath + "games/Keno/resources/";
    // if ("s11" === a.serverNum) {
    //     eval(function (v, X, R, I, aa, A, O) {
    //         v[aa] = v[aa] || function () {
    //             (v[aa].a = v[aa].a || []).push(arguments)
    //         };
    //         v[aa].l = 1 * new Date;
    //         A = X.createElement(R);
    //         O = X.getElementsByTagName(R)[0];
    //         A.async = 1;
    //         A.src =
    //             I;
    //         O.parentNode.insertBefore(A, O)
    //     }(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"));
    //     eval(ym(84903145, "init", {clickmap: !0, trackLinks: !0, accurateTrackBounce: !0, webvisor: !0}));
    //     let K = document.createElement("div");
    //     for (K.innerHTML = '<noscript><div><img src="https://mc.yandex.ru/watch/84903145" style="position:absolute; left:-9999px;" alt="" /></div></noscript>'; K.children.length;) document.body.appendChild(K.firstElementChild)
    // }
    this.kenoConfig = a;
    var U = new FLGRenderer(1920, 1080, a.canvasId,
        "center");
    this.mainRenderer = U;
    this.mainSoundManager = new SoundManager(u.kenoConfig.gameKind, u.kenoConfig.gameType, u.kenoConfig.gameVariant);
    var fa = new FLGAccount(a.canvasId, u.mainSoundManager, u.mainRenderer);
    this.mainFLGAccount = fa;
    var w = new gameManagerNG(this);
    this.mainGameManager = w;
    var P = new UIManagerNG(this);
    this.mainUIManager = P;
    var V;
    this.setMainGrid = function (K) {
        V = K;
        u.mainGrid = V
    }
}

function UIManagerNG(a) {
    function u(d, c, p, f, F) {
        this.destroy = function () {
            t = g = B = E = null;
            clearTimeout(C);
            clearTimeout(n);
            k = b = null;
            for (var h in m) m[h] = null;
            m = null
        };
        var m = this, E = {font: "bold 35px Arial", fill: "#000000", align: "center"}, B = 0, C, n,
            g = new PIXI.Container;
        f ? f.addChild(g) : a.mainRenderer.stage.addChild(g);
        var t = function (h, L, S, W, D) {
            g.children[D] ? (g.children[D].visible = !0, g.children[D].children[0].text = W) : a.mainRenderer.createButton(g, h, L, "ball", {
                text: W,
                align: "center",
                style: E
            }).scale.set(S, S);
            F && !g.children[D].isRotated &&
            (g.children[D].position.x = h + 1714, g.children[D].children[0].rotation = 14 * Math.PI, g.children[D].isRotated = !0, a.mainUIManager.animations()["rotation_ball" + D] && (a.mainUIManager.animations()["rotation_ball" + D].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["rotation_ball" + D] = (new TWEEN.Tween({
                rotation: g.children[D].children[0].rotation,
                position: g.children[D].position.x
            })).to({rotation: 0, position: h}, 990).easing(TWEEN.Easing.Cubic.Out).onUpdate(function () {
                g.children[D].children[0].rotation =
                    this.rotation;
                g.children[D].position.x = this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["rotation_ball" + D] = null;
                a.mainSoundManager.playSound("ball")
            }).start())
        }, b = function (h, L, S, W) {
            function D() {
                t(d + p * B, c, L, h[B], B);
                B++;
                B < h.length ? 0 == S || void 0 == S ? D() : C = setTimeout(D, S) : B = 0
            }

            void 0 != h && h.length && (W ? t(d + p * W, c, L, h[W], W) : D())
        };
        this.startDrawBalls = b;
        var k = function () {
            for (var h = 0; h < g.children.length; h++) F ? (g.children[h].isRotated = !1, a.mainUIManager.animations()["remove_ball" +
            h] && (a.mainUIManager.animations()["remove_ball" + h].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), a.mainUIManager.animations()["remove_ball" + h] = (new TWEEN.Tween({
                rotation: g.children[h].children[0].rotation,
                position: g.children[h].position.x,
                index: h
            })).to({
                rotation: 14 * Math.PI,
                position: g.children[h].position.x + 1714
            }, 990).easing(TWEEN.Easing.Cubic.In).onUpdate(function () {
                g.children[this.index].children[0].rotation = this.rotation;
                g.children[this.index].position.x =
                    this.position
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                a.mainUIManager.animations()["remove_ball" + this.index] = null;
                g.children[this.index].visible = !1
            }).start()) : g.children[h].visible = !1
        };
        this.removeBalls = k
    }

    function U(d) {
        this.destroy = function () {
            for (var n = 0; n < p.length; n++) {
                for (var g in p[n]) p[n][g] = null;
                p[n] = null
            }
            C = B = m = F = f = p = null;
            for (n in c) c[n] = null;
            c = null
        };
        var c = this, p = [];
        this.bets = p;
        var f = 0, F = 0;
        this.setTotalWin = function (n) {
            if (!arguments.length) return F;
            n && (F = n)
        };
        this.getTotalBet =
            function () {
                return f
            };
        var m = null;
        this.parentEditions = function (n) {
            if (!arguments.length) return m;
            m = n;
            B = m.betsHistoryContainer()
        };
        if (d.length) for (var E = 0; E < d.length; E++) d[E].summ && (f += d[E].summ), d[E].win && (F += d[E].win), p.push({
            summ: d[E].summ,
            bet: d[E].bet,
            winBets: d[E].winBets,
            countWin: d[E].countWin,
            win: d[E].win,
            code: d[E].code,
            id: d[E].id
        });
        this.addBet = function (n, g, t) {
            100 <= p.length ? (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), t && t(void 0)) : (n.length && 100 < p.length +
            n.length && (a.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100)), n = n.slice(0, n.length - (p.length + n.length - 100))), a.mainFLGAccount.placeBet(n, g, a.kenoConfig, function (b, k, h) {
                if (void 0 == b) t && t(void 0); else {
                    if (h) {
                        h.notAll && a.mainRenderer.logService.log(mainLocalizationTable.betError);
                        for (b = 0; b < h.srvBets.length; b++) p.push({
                            summ: h.srvBets[b].summ,
                            bet: h.srvBets[b].bet,
                            winBets: h.srvBets[b].winBets,
                            countWin: h.srvBets[b].countWin,
                            code: h.srvBets[b].code,
                            id: h.srvBets[b].id
                        });
                        t &&
                        (t(h.srvBets), m.events.emit("EDITIONS_CHANGE"))
                    } else p.push({
                        summ: n.summ,
                        bet: n.bet,
                        winBets: n.winBets,
                        countWin: n.countWin,
                        win: n.win,
                        code: b,
                        id: k
                    }), t && (t(p[p.length - 1]), m.events.emit("EDITIONS_CHANGE"));
                    f = a.mainFLGAccount.totalBet();
                    C();
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            }))
        };
        var B, C = function () {
            var n = 0 != B.children.length;
            B.parent.children[7].children[0].children[0].text = 0 < p.length ? mainLocalizationTable.coupon.toUpperCase() + " (" + p.length + ")" : mainLocalizationTable.coupon.toUpperCase();
            if (n) B.parent.children[2].children[1].children[0].text =
                0 !== f ? formatFLGNums(f, !1) : "", B.parent.children[2].children[2].children[0].text = 0 !== F ? formatFLGNums(F, !1) : ""; else for (n = 0; 10 > n; n++) {
                var g = n & 1 ? "table_line_odd" : "table_line_even";
                g = new a.mainRenderer.createButton(B, 0, 98 + 35 * n, g);
                g.anchor.y = .5;
                g.name = "row_" + n
            }
            for (n = 0; B.getChildByName("row_" + n); n++) if (g = B.getChildByName("row_" + n)) {
                for (var t = 0; g.getChildByName("rect" + n + "_" + t); t++) {
                    var b = g.getChildByName("rect" + n + "_" + t);
                    b.visible = !1;
                    b.getChildByName("sortedBet" + n + "_" + t).visible = !1
                }
                if (b = g.getChildByName("summ" +
                    n)) b.visible = !1, g.getChildByName("win" + n).visible = !1, g.getChildByName("coef" + n).visible = !1;
                9 < n && (g.visible = !1)
            }
            if (!(0 >= p.length)) {
                n = 0;
                for (var k = p.length - 1; n < p.length; n++, k--) {
                    var h = p[k].bet.slice();
                    h.sort(a.mainGameManager.sortNumeric);
                    (g = B.getChildByName("row_" + n)) ? g.visible = !0 : (g = n & 1 ? "table_line_odd" : "table_line_even", g = new a.mainRenderer.createButton(B, 0, 98 + 35 * n, g), g.anchor.y = .5, g.name = "row_" + n);
                    for (t = 0; t < h.length; t++) {
                        var L = -1 < p[k].winBets.indexOf(h[t]), S = L ? 16773632 : 0;
                        (b = g.getChildByName("rect" +
                            n + "_" + t)) ? (b.clear(), b.beginFill(S), b.drawRoundedRect(6 + 29 * t, -12, 25, 25, 4), b.endFill(), b.visible = !0, b = b.getChildByName("sortedBet" + n + "_" + t), b.children[0].style = L ? m.tableHistoryFont : m.tableHighlightFont, b.children[0].text = h[t], b.visible = !0) : (b = new PIXI.Graphics, b.beginFill(S), b.drawRoundedRect(6 + 29 * t, -12, 25, 25, 4), b.endFill(), b.name = "rect" + n + "_" + t, g.addChild(b), a.mainRenderer.createButton(b, 18.5 + 29 * t, 0, void 0, {
                            text: h[t],
                            align: "center",
                            style: L ? m.tableHistoryFont : m.tableHighlightFont
                        }).name = "sortedBet" +
                            n + "_" + t)
                    }
                    h = void 0 != p[k].win ? formatFLGNums(p[k].win, !1) : "";
                    t = void 0 != p[k].win && 0 != p[k].win ? m.tableBoldFont : m.tableBetFont;
                    b = g.getChildByName("summ" + n);
                    L = a.mainGameManager.coefficients[p[k].countWin][p[k].bet.length - 1];
                    L = 0 != L ? L : "";
                    b ? (b.children[0].style = t, b.children[0].text = formatFLGNums(p[k].summ, !1), b.visible = !0, b = g.getChildByName("win" + n), b.children[0].style = t, b.children[0].text = h, b.visible = !0, b = g.getChildByName("coef" + n), b.children[0].style = t, b.children[0].text = L, b.visible = !0) : (a.mainRenderer.createButton(g,
                        312, 0, void 0, {
                            text: formatFLGNums(p[k].summ, !1),
                            align: "left",
                            style: t
                        }).name = "summ" + n, a.mainRenderer.createButton(g, 465, 0, void 0, {
                        text: h,
                        align: "left",
                        style: t
                    }).name = "win" + n, a.mainRenderer.createButton(g, 420, 0, void 0, {
                        text: L,
                        align: "center",
                        style: {font: t.font, fill: t.fill, align: "center"}
                    }).name = "coef" + n)
                }
            }
            B.emit("updateHeight")
        };
        this.redrawCurrentBets = C;
        this.calculateWin = function (n, g) {
            for (var t, b = 0; b < p.length; b++) {
                t = p[b].bet;
                for (var k = [], h = 0; h < t.length; h++) -1 < n.indexOf(t[h]) && k.push(t[h]);
                t = k;
                p[b].winBets =
                    t;
                p[b].countWin = t.length;
                g && (p[b].win = p[b].summ * a.mainGameManager.coefficients[p[b].countWin][p[b].bet.length - 1], F += p[b].win)
            }
            a.mainRenderer.renderManager.needUpdateRender = !0
        }
    }

    this.destroy = function () {
        clearTimeout(Ha);
        clearTimeout(Ma);
        v = null;
        I.destroy();
        I = null;
        aa.destroy();
        A = aa = null;
        O && O.destroy();
        O = null;
        na.destroy();
        na = null;
        pa.destroy();
        oa = ka = Q = pa = null;
        for (var d in x) {
            for (var c in x[d]) x[d][c] = null;
            x[d] = null
        }
        ba = x = null;
        clearTimeout(Ia);
        ra = Ja = null;
        for (d in q) q[d] = null;
        va = sa = qa = Ca = Da = wa = ha = ia = q = null;
        a.mainRenderer.stage.off("changeLang", xa);
        xa = null;
        P.off("visibleChange", V);
        window.removeEventListener("keydown", K);
        K = V = P = null;
        ta.destroy();
        ja = ta = null;
        y.destroy();
        y = null;
        Ea && (Ea.destroy(), Ea = null);
        for (d in w) w[d] = null;
        w = null
    };
    const {isLobby: fa} = a.kenoConfig;
    var w = this, P = $("#" + a.kenoConfig.canvasId).parent(), V = function (d, c) {
        a.mainRenderer.stage.visible = c == a.kenoConfig.canvasId;
        a.mainRenderer.StartStopAnimation(a.mainRenderer.stage.visible)
    };
    P.on("visibleChange", V);
    var K = function (d) {
        "input" !== event.srcElement.localName &&
        a.mainRenderer.stage.visible && (13 == d.keyCode || 32 == d.keyCode) && Q && (d = Q.getChildByName("plus")) && d.interactive && (d.emit("mousedown"), d.emit("mouseup"))
    };
    window.addEventListener("keydown", K);
    for (var v = clientInfoGlobal.coin7.split("-"), X = 0; X < v.length; X++) v[X] /= 100;
    var R = 2 * parseInt(v[v.length - 1], 10);
    v.push("MAX\n" + R);
    X = (X = localStorage.getItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "defaultBet")) && 0 <= v.indexOf(parseInt(X)) ? JSON.parse(X) : v[1];
    var I = new betsControls(v[0], v[v.length - 1], X, v, function (d) {
        a.mainFLGAccount.balance() <
        R && (R = a.mainFLGAccount.balance());
        a.mainRenderer.renderManager.needUpdateRender = !0;
        return R
    });
    this.betsControls = I;
    var aa = new FLGTimer, A, O;
    const {kenoConfig: Ka} = a, {
        canvasId: ya,
        needRtc: za,
        videoPos: Aa,
        videoSize: Ba,
        videoRtcUrl: Na,
        videoRtcApp: Oa,
        videoRtcStream: Pa
    } = Ka;
    var na = new FLGJackpot(a.mainRenderer, {tirTimeOffset: .1, updateInterval: 900}), pa, Q = new PIXI.Container,
        ka = new PIXI.Container, oa = new PIXI.Container, x = {
            game: {
                text: mainLocalizationTable.game.toUpperCase(),
                posX: 1160,
                posY: 347,
                pressedDefault: !0,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            video: {
                text: mainLocalizationTable.video.toUpperCase(), posX: 1160, posY: 521, onStartOpen: function () {
                    O && (O.destroy(), O = null);
                    q.scale_video && q.scale_video.stop();
                    q.scale_video_open && q.scale_video_open.stop();
                    var d = {};
                    let c = "vip1001.de" === location.host || "test.flg.bet" === location.host ? "cover-video " + a.kenoConfig.gameType.toLowerCase() : void 0;
                    za ? rtcVideo.prepareVideo({
                        videoRtcUrl: Na, videoRtcApp: Oa, videoRtcStream: Pa, videoId: "innerVideo" + ya, parentId: ya,
                        styleObj: {
                            posX: Aa.x,
                            posY: Aa.y,
                            sizeW: Ba.w,
                            sizeH: Ba.h,
                            borderURL: void 0,
                            paddings: 0,
                            noVideoIcons: !0,
                            videoMaxScale: 1,
                            clipPath: "none",
                            fullscreenPosY: -45
                        }, onReady() {
                            q.video_rotate && q.video_rotate.stop();
                            rtcVideo.showVideo()
                        }
                    }) : O = new FLGVideo(Aa.x, Aa.y, Ba.w, Ba.h, ya, null, '<video class="video-el" id="innerVideo' + ya + '" autoplay muted playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + Ka.videoMobileURL + '" type="application/x-mpegURL"></video>', void 0, a.mainSoundManager, !0, c, d);
                    q.scale_video_open =
                        (new TWEEN.Tween({scale: 0})).to({scale: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                            q.scale_video_open = null;
                            O && O.setScale && O.setScale(1)
                        }).onUpdate(function () {
                            O && O.setScale && O.setScale(this.scale)
                        }).onComplete(function () {
                            q.scale_video_open = null
                        }).start();
                    q.video_rotate && q.video_rotate.stop();
                    d = oa.getChildByName("video");
                    if (d.children.length) {
                        var p = d.children[0];
                        p.visible = !0
                    } else p = a.mainRenderer.createButton(d, 0, 0, "btn_video_load"), p.anchor.set(.5, .5), p.scale.set(1.75, 1.75);
                    p && (a.mainRenderer.renderManager.animationTweenInc(),
                        q.video_rotate = (new TWEEN.Tween(p)).to({rotation: 6 * Math.PI}, 3E3).easing(TWEEN.Easing.Linear.None).onStart(function () {
                        }).onStop(function () {
                            p.rotation = 0;
                            p.visible = !1;
                            a.mainRenderer.renderManager.animationTweenDec();
                            q.video_rotate = null
                        }).onComplete(function () {
                            O && O.setVisible && O.setVisible(!0);
                            p.rotation = 0;
                            p.visible = !1;
                            a.mainRenderer.renderManager.animationTweenDec();
                            q.video_rotate = null
                        }).start())
                }, onStopOpen: void 0, onStartClose: function () {
                    za && rtcVideo.hideVideo();
                    O && (q.scale_video_open && q.scale_video_open.stop(),
                    q.scale_video && q.scale_video.stop(), q.video_rotate && q.video_rotate.stop(), q.scale_video = (new TWEEN.Tween({scale: 1})).to({scale: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                        q.scale_video = null;
                        O && (O.setScale && O.setScale(0), O.destroy && O.destroy(), O = null)
                    }).onUpdate(function () {
                        O && O.setScale && O.setScale(this.scale)
                    }).onComplete(function () {
                        O && (O.setScale && O.setScale(0), O.destroy && O.destroy(), za && rtcVideo.destroy && rtcVideo.destroy(), O = null);
                        q.scale_video = null
                    }).start())
                }, onStopClose: void 0
            },
            history: {
                text: mainLocalizationTable.history.toUpperCase(),
                posX: 1160,
                posY: 695,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            stats: {
                text: mainLocalizationTable.stats.toUpperCase(),
                posX: 1160,
                posY: 869,
                onStartOpen: void 0,
                onStopOpen: void 0,
                onStartClose: void 0,
                onStopClose: void 0
            },
            info: {}
        }, ba, Ia = 0, Ja = function () {
            void 0 !== a.mainGameManager && w.simpleFlipXFunc(ba.children[0], "charRotate0", 130, 130, void 0, function () {
                w.simpleFlipXFunc(ba.children[1], "charRotate1", 130, 130, void 0, function () {
                    w.simpleFlipXFunc(ba.children[2],
                        "charRotate2", 130, 130, void 0, function () {
                            w.simpleFlipXFunc(ba.children[3], "charRotate3", 130, 130, void 0, function () {
                                w.simpleFlipXFunc(ba.children[4], "charRotate4", 130, 130)
                            })
                        })
                })
            })
        }, ra, Fa = !1, ta, ja = {needShow: !0}, y = new function () {
            this.destroy = function () {
                for (var e = 0; e < c.length; e++) c[e].round = null, c[e].editionResult = null, c[e].betsHistory.destroy && c[e].betsHistory.destroy(), c[e].betsHistory = null, c[e] = null;
                E = F = f = p = c = null;
                m.destroy();
                g = n = B = m = null;
                C.destroy();
                C = null;
                Y && (Y.destroy(), Y = null);
                t = null;
                b && (b.destroy(),
                    b = null);
                M = G = Z = z = H = D = W = S = h = k = L = null;
                d.events.removeAllListeners();
                for (e in d) d[e] = null;
                d = null
            };
            var d = this, c = [], p;
            this.editions = c;
            var f, F, m, E = new PIXI.Container, B = new PIXI.Container, C, n = new PIXI.Container, g = new PIXI.Container;
            g.name = "betCntnr";
            this.historyTable = function () {
                return F
            };
            this.betBGContainer = function () {
                return C.srcSprite
            };
            this.betsHistoryContainer = function () {
                return g
            };
            var t = .653, b, k = {font: "bold 30px Arial", fill: "#313131"};
            this.tableHeaderFont = k;
            var h = {font: "22px Arial", fill: "#403f3f"}, L = {
                font: "20px Arial Narrow",
                fill: "#000000"
            };
            this.tableHistoryFont = L;
            var S = {font: "20px Arial Narrow", fill: "#ffffff"};
            this.tableHighlightFont = S;
            var W = {font: "bold 22px Arial", fill: "#000000"};
            this.tableBoldFont = W;
            var D = {font: "20px Arial", fill: "#000000"};
            this.tableBetFont = D;
            this.getActedOutEdition = function () {
                for (var e = c.length - 1; 0 <= e; e--) if (Object.assign({}, c[e].editionResult), void 0 == c[e].editionResult) return H(e), c[e];
                H(c.length - 1);
                return c[c.length - 1]
            };
            var H = function (e) {
                0 > e || e >= c.length || (p = e, void 0 != f && (f.children[0].text = "#" +
                    c[c.length - 1].round), void 0 != F && c[p].betsHistory.redrawCurrentBets(), a.mainRenderer.renderManager.needUpdateRender = !0)
            }, z = function () {
                f = a.mainRenderer.createButton(void 0, 123, 92, void 0, {
                    text: "",
                    align: "center",
                    style: {font: "bold 46px Arial", fill: "#fa9a00"}
                });
                f.anchor.set(.5, .5);
                f.scale.set(.6, .6);
                f.name = "roundText";
                F = a.mainRenderer.createButton(void 0, 1294, 275);
                m = new MaskedSprite(a.mainRenderer.createButton(F, 1, 0, "table_bg"), {
                    mask: {
                        x: 1,
                        y: 0,
                        width: 579,
                        height: 116,
                        radius: 9
                    }
                }, a.mainRenderer.renderManager);
                a.mainRenderer.createButton(m.srcSprite, 0, 0, "table_header");
                Z();
                M();
                var e = new PIXI.Graphics;
                e.beginFill(16777215);
                e.drawRect(98, 46, 2, 214);
                e.alpha = .5;
                e.endFill;
                m.srcSprite.addChild(e);
                e = null;
                e = a.mainRenderer.createButton(m.srcSprite, 0, 0, void 0, void 0, function (l, r) {
                    a.mainSoundManager.playSound("buttonClick");
                    a.mainUIManager.animations().rotate_editions && (a.mainUIManager.animations().rotate_editions.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().rotate_editions =
                        null);
                    l.pressed = !l.pressed;
                    var N = l.pressed ? Math.PI / 2 : 0;
                    a.mainRenderer.renderManager.animationTweenInc();
                    a.mainUIManager.animations().rotate_editions = (new TWEEN.Tween(l.children[0])).to({rotation: N}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        a.mainUIManager.animations().rotate_editions = null
                    }).start();
                    a.mainUIManager.animations().resize_editions && (a.mainUIManager.animations().resize_editions.stop(), a.mainRenderer.renderManager.animationTweenDec(),
                        a.mainUIManager.animations().resize_editions = null);
                    l = l.pressed ? 260 : 116;
                    a.mainRenderer.renderManager.animationTweenInc();
                    a.mainUIManager.animations().resize_editions = (new TWEEN.Tween({fHeight: m.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: l}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                        m.srcSprite.mask.clear();
                        m.srcSprite.mask.beginFill(14922837);
                        m.srcSprite.mask.drawRoundedRect(1, 0, 579, this.fHeight, 9);
                        m.srcSprite.mask.endFill
                    }).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        a.mainUIManager.animations().resize_editions = null
                    }).start();
                    r && (C.srcSprite.getChildByName("exp2").emit("mousedown"), r.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                });
                e.hitArea = new PIXI.Rectangle(0, 0, 579, 43);
                e.name = "exp1";
                e = a.mainRenderer.createButton(e, 552, 21, "expand");
                e.anchor.set(.5, .5);
                e = null;
                for (e = 0; e < c.length; e++) c[e].betsHistory.parentEditions(d);
                G();
                c.length && c[p].betsHistory.redrawCurrentBets();
                m.srcSprite.addChild(B);
                m.srcSprite.addChild(E)
            };
            this.drawEditions = z;
            var Z = function () {
                B.children[0] &&
                B.children[1] ? (B.children[0].children[0].text = "#", B.children[1].children[0].text = mainLocalizationTable.balls) : (a.mainRenderer.createButton(B, 19, 22, void 0, {
                    text: mainLocalizationTable.history.toUpperCase(),
                    align: "left",
                    style: k
                }), a.mainRenderer.createButton(B, 50, 62, void 0, {
                    text: "#",
                    align: "center",
                    style: h
                }), a.mainRenderer.createButton(B, 114, 62, void 0, {
                    text: mainLocalizationTable.balls,
                    align: "left",
                    style: h
                }))
            };
            this.redrawEditionHeader = Z;
            var G = function () {
                if (n.children[0]) n.children[0].children[0].text = mainLocalizationTable.coupon.toUpperCase(),
                    n.children[1].children[0].text = mainLocalizationTable.balls, n.children[2].children[0].text = mainLocalizationTable.totalBet, n.children[3].children[0].text = mainLocalizationTable.win, C.srcSprite.children[2].children[0].text = mainLocalizationTable.total.toUpperCase() + ":"; else {
                    C = new MaskedSprite(a.mainRenderer.createButton(F, 1, 125, "table_bg"), {
                        mask: {
                            x: 1,
                            y: 125,
                            width: 579,
                            height: 465,
                            radius: 9
                        }, needScrolling: {container: g, scrollbar: {topOffset: 85, botOffset: 38}}
                    }, a.mainRenderer.renderManager);
                    C.srcSprite.addChildAt(g,
                        0);
                    a.mainRenderer.createButton(C.srcSprite, -4, 425, "bet_bot");
                    a.mainRenderer.createButton(C.srcSprite.children[2], 291, 24, void 0, {
                        text: mainLocalizationTable.total.toUpperCase() + ":",
                        align: "right",
                        style: {font: "22px Arial", fill: "#000000", align: "center"}
                    });
                    a.mainRenderer.createButton(C.srcSprite.children[2], 312, 24, void 0, {
                        text: "",
                        align: "left",
                        style: {font: "22px Arial", fill: "#000000", align: "center"}
                    });
                    a.mainRenderer.createButton(C.srcSprite.children[2], 458, 24, void 0, {
                        text: "", align: "left", style: {
                            font: "22px Arial",
                            fill: "#000000", align: "center"
                        }
                    });
                    var e = new PIXI.Graphics;
                    e.beginFill(16777215);
                    e.drawRect(299, 46, 2, 419);
                    e.alpha = .5;
                    e.name = "ballsSep";
                    e.endFill;
                    C.srcSprite.addChild(e);
                    e = new PIXI.Graphics;
                    e.beginFill(16777215);
                    e.drawRect(445, 46, 2, 419);
                    e.alpha = .5;
                    e.name = "winsSep";
                    e.endFill;
                    C.srcSprite.addChild(e);
                    C.srcSprite.interactive = !0;
                    C.srcSprite.hitArea = new PIXI.Rectangle(0, 0, 579, 465);
                    a.mainRenderer.createButton(C.srcSprite, 0, 0, "table_header");
                    e = a.mainRenderer.createButton(C.srcSprite, 0, 0, void 0, void 0, function (l,
                                                                                                 r) {
                        a.mainUIManager.animations().rotate_bets && (a.mainUIManager.animations().rotate_bets.stop(), a.mainRenderer.renderManager.animationTweenDec());
                        l.pressed = !l.pressed;
                        var N = l.pressed ? 0 : Math.PI / 2;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().rotate_bets = (new TWEEN.Tween(l.children[0])).to({rotation: N}, 165).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().rotate_bets = null
                        }).start();
                        a.mainUIManager.animations().resize_bets &&
                        (a.mainUIManager.animations().resize_bets.stop(), a.mainRenderer.renderManager.animationTweenDec(), a.mainUIManager.animations().resize_bets = null);
                        l = l.pressed ? 320 : 465;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations().resize_bets = (new TWEEN.Tween({fHeight: C.srcSprite.mask.graphicsData[0].shape.height})).to({fHeight: l}, 165).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                            C.srcSprite.position.y = 590 - this.fHeight;
                            C.srcSprite.children[2].position.y = 425 + this.fHeight - 465;
                            C.srcSprite.mask.clear();
                            C.srcSprite.mask.beginFill(14922837);
                            C.srcSprite.mask.drawRoundedRect(1, C.srcSprite.position.y, 579, this.fHeight, 9);
                            C.srcSprite.mask.endFill;
                            C.srcSprite.hitArea.height = this.fHeight;
                            g.emit("updateHeight")
                        }).onComplete(function () {
                            a.mainRenderer.renderManager.animationTweenDec();
                            a.mainUIManager.animations().resize_bets = null
                        }).start();
                        r && (m.srcSprite.getChildByName("exp1").emit("mousedown"), r.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    e.hitArea = new PIXI.Rectangle(0, 0, 579, 43);
                    e.name =
                        "exp2";
                    e = a.mainRenderer.createButton(e, 552, 21, "expand");
                    e.anchor.set(.5, .5);
                    e.rotation = Math.PI / 2;
                    e = null;
                    C.srcSprite.addChild(n);
                    a.mainRenderer.createButton(n, 19, 22, void 0, {
                        text: mainLocalizationTable.coupon.toUpperCase(),
                        align: "left",
                        style: k
                    });
                    a.mainRenderer.createButton(n, 19, 62, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "left",
                        style: h
                    });
                    a.mainRenderer.createButton(n, 312, 62, void 0, {
                        text: mainLocalizationTable.totalBet,
                        align: "left",
                        style: h
                    });
                    a.mainRenderer.createButton(n, 465, 62, void 0, {
                        text: mainLocalizationTable.win,
                        align: "left", style: h
                    });
                    a.mainRenderer.createButton(n, 420, 62, void 0, {
                        text: "X",
                        align: "center",
                        style: {font: h.font, fill: h.fill, align: "center"}
                    });
                    e = new PIXI.Graphics;
                    e.beginFill(16777215);
                    e.drawRect(394, 46, 2, 419);
                    e.alpha = .5;
                    e.name = "xSep";
                    e.endFill;
                    C.srcSprite.addChild(e);
                    e = null;
                    e = a.mainRenderer.createButton(C.srcSprite, 0, 0, void 0, void 0, function (l, r) {
                        a.mainSoundManager.playSound("buttonClick");
                        ja.needShow = !ja.needShow;
                        d.events.emit("GRID_STATS");
                        l.children[0].texture = a.mainRenderer.resourceLoader.resources[ja.needShow ?
                            "eye_icon" : "eye_closed_icon"].texture;
                        Q.getChildByName("btn_eye").texture = a.mainRenderer.resourceLoader.resources[ja.needShow ? "btn_eye" : "btn_eye_closed"].texture;
                        Q.getChildByName("btn_eye").children[0].texture = a.mainRenderer.resourceLoader.resources[ja.needShow ? "btn_eye_mode_selected" : "btn_eye_closed_mode_selected"].texture;
                        r && (r.stopped = !0, a.mainRenderer.renderManager.needUpdateRender = !0)
                    });
                    e.hitArea = new PIXI.Rectangle(299, 0, 95, 43);
                    e.name = "eye_icon";
                    a.mainRenderer.createButton(e, 347, 21, "eye_icon").anchor.set(.5,
                        .5);
                    e = null
                }
            };
            this.drawBetsHeader = G;
            var M = function () {
                var e = 0 !== E.children.length;
                if (!e) for (var l = 0; 5 > l; l++) {
                    var r = new a.mainRenderer.createButton(E, 0, 98 + 36 * l, l & 1 ? "table_line_odd" : "table_line_even");
                    r.anchor.y = .5
                }
                var N = a.mainGameManager.gameHistory();
                for (l = 0; l < N.length; l++) {
                    var J = N[l].balls.slice();
                    J.sort(a.mainGameManager.sortNumeric);
                    r = E.children[l];
                    if (e = 0 !== r.children.length) for (r.getChildByName("round" + l).children[0].text = N[l].tir, e = 0; e < J.length; e++) r.getChildByName("result" + e).children[0].text =
                        J[e]; else {
                        a.mainRenderer.createButton(r, 50, 0, void 0, {
                            text: N[l].tir,
                            align: "center",
                            style: L
                        }).name = "round" + l;
                        var T = 96;
                        for (e = 0; e < J.length; e++) a.mainRenderer.createButton(r, T += 23, 0, void 0, {
                            text: J[e],
                            align: "center",
                            style: L
                        }).name = "result" + e
                    }
                }
            };
            this.detailEditionsFont = {font: "40px Arial", fill: "#ffffff"};
            this.detailEditionsHeaderFont = {font: "26px Arial", fill: "#b1b1b1"};
            this.detailEditionsRowFont = {font: "26px Arial", fill: "#ffffff"};
            var Y;
            this.drawDetailEditionHistory = function (e, l) {
                if (c[l].editionResult) {
                    var r =
                        0 != e.children.length;
                    e.editionInd = l;
                    var N = {x: 599, y: 524}, J = c[l].editionResult.slice();
                    J.sort(a.mainGameManager.sortNumeric);
                    r ? (b.removeBalls(), b.startDrawBalls(J, t, 0), e.children[0].children[0].text = "# " + c[l].round, J = e.getChildByName("totalBox"), J.getChildByName("tBet").children[0].text = formatFLGNums(c[l].betsHistory.getTotalBet(), !1), J.getChildByName("tWin").children[0].text = formatFLGNums(c[l].betsHistory.setTotalWin(), !1), J = null) : (r = a.mainRenderer.createButton(e, 598 - N.x, 226 - N.y, void 0, {
                        text: "# " +
                            c[l].round, align: "center", style: d.detailEditionsFont
                    }), b = new u(69 - N.x, 262 - N.y, 53, e), b.startDrawBalls(J, t, 0), r = a.mainRenderer.createButton(e, 408 - N.x, 226 - N.y, "bet_arrow"), a.mainRenderer.createButton(r, 0, 0, "bet_arrow_selected", void 0, function (ma, Ga) {
                        a.mainSoundManager.playSound("buttonClick");
                        e.editionInd = limit(e.editionInd - 1, 0, c.length - 2);
                        d.drawDetailEditionHistory(e, e.editionInd);
                        Ga.stopped = !0;
                        a.mainUIManager.clickAnimationFunc(ma, "bet_arrow_History");
                        a.mainRenderer.renderManager.needUpdateRender =
                            !0
                    }, void 0, void 0, function (ma) {
                        ia(ma, "bet_arrow_History")
                    }, function (ma) {
                        ha(ma, "bet_arrow_History")
                    }).alpha = 0, r.anchor.set(.5, .5), r.children[0].anchor.set(.5, .5), r = a.mainRenderer.createButton(e, 781 - N.x, 224 - N.y, "bet_arrow"), a.mainRenderer.createButton(r, 0, 0, "bet_arrow_selected", void 0, function (ma, Ga) {
                        a.mainSoundManager.playSound("buttonClick");
                        e.editionInd = limit(e.editionInd + 1, 0, c.length - 2);
                        d.drawDetailEditionHistory(e, e.editionInd);
                        Ga.stopped = !0;
                        a.mainUIManager.clickAnimationFunc(ma, "bet_arrow_History2");
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    }, void 0, void 0, function (ma) {
                        ia(ma, "bet_arrow_History2")
                    }, function (ma) {
                        ha(ma, "bet_arrow_History2")
                    }).alpha = 0, r.anchor.set(.5, .5), r.children[0].anchor.set(.5, .5), r.rotation = Math.PI, r = a.mainRenderer.createButton(e, 742 - N.x, 342 - N.y, void 0, {
                        text: mainLocalizationTable.bet,
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), r.anchor.set(.5, .5), r = a.mainRenderer.createButton(e, 350 - N.x, 342 - N.y, void 0, {
                        text: mainLocalizationTable.balls,
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }),
                        r.anchor.set(.5, .5), r = a.mainRenderer.createButton(e, 886 - N.x, 342 - N.y, void 0, {
                        text: mainLocalizationTable.coef,
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), r.anchor.set(.5, .5), r = a.mainRenderer.createButton(e, 1027 - N.x, 342 - N.y, void 0, {
                        text: mainLocalizationTable.win,
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), r.anchor.set(.5, .5), Y = new MaskedSprite(a.mainRenderer.createButton(e, 0, 0), {
                        mask: {
                            x: 60 - N.x,
                            y: 364 - N.y,
                            width: 1070,
                            height: 426
                        }, needScrolling: {}
                    }, a.mainRenderer.renderManager), Y.srcSprite.interactive =
                        !0, Y.srcSprite.hitArea = new PIXI.Rectangle(70 - N.x, 362 - N.y, 1061, 432), J = a.mainRenderer.createButton(e, 68 - N.x, 826 - N.y, void 0), J.name = "totalBox", J.anchor.y = .5, a.mainRenderer.createButton(J, 56, 0, void 0, {
                        text: mainLocalizationTable.total.toUpperCase(),
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), a.mainRenderer.createButton(J, 368, 0, void 0, {
                        text: mainLocalizationTable.bet + ":",
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), r = a.mainRenderer.createButton(J, 540, 0, "tab_history_row"), r.anchor.set(.5, .5), r.scale.x =
                        .17, a.mainRenderer.createButton(J, 540, 0, void 0, {
                        text: formatFLGNums(c[l].betsHistory.getTotalBet(), !1),
                        align: "center",
                        style: d.detailEditionsRowFont
                    }).name = "tBet", a.mainRenderer.createButton(J, 768, 0, void 0, {
                        text: mainLocalizationTable.win + ":",
                        align: "center",
                        style: d.detailEditionsHeaderFont
                    }), r = a.mainRenderer.createButton(J, 960, 0, "tab_history_row"), r.anchor.set(.5, .5), r.scale.x = .17, a.mainRenderer.createButton(J, 960, 0, void 0, {
                        text: formatFLGNums(c[l].betsHistory.setTotalWin(), !1),
                        align: "center",
                        style: d.detailEditionsRowFont
                    }).name =
                        "tWin", r = J = null);
                    J = [];
                    var T;
                    J = Y.containerForScroll;
                    var ca, da;
                    for (r = 0; J.getChildByName("row_" + r); r++) if (T = J.getChildByName("row_" + r)) {
                        T.visible = !1;
                        for (da = 0; T.getChildByName("rect" + r + "_" + da); da++) {
                            var ea = T.getChildByName("rect" + r + "_" + da);
                            ea.visible = !1;
                            ea.getChildByName("textBet" + r + "_" + da).visible = !1
                        }
                        if (ca = T.getChildByName("summ" + r)) ca.visible = !1, T.getChildByName("win" + r).visible = !1, T.getChildByName("coef" + r).visible = !1
                    }
                    e.children[2].visible = 0 !== e.editionInd;
                    e.children[3].visible = e.editionInd !== c.length -
                        2;
                    e.children[4].visible = 0 < c[l].betsHistory.bets.length;
                    e.children[5].visible = 0 < c[l].betsHistory.bets.length;
                    e.children[6].visible = 0 < c[l].betsHistory.bets.length;
                    e.children[7].visible = 0 < c[l].betsHistory.bets.length;
                    if (0 >= c[l].betsHistory.bets.length) J.emit("updateHeight"); else {
                        ca = [];
                        r = 0;
                        for (var la = c[l].betsHistory.bets.length - 1; r < c[l].betsHistory.bets.length; r++, la--) {
                            (T = J.getChildByName("row_" + r)) ? T.visible = !0 : (T = new a.mainRenderer.createButton(J, 68 - N.x, 391 + 61 * r - N.y, "tab_history_row"), T.anchor.y =
                                .5, T.name = "row_" + r);
                            for (da = 0; da < c[l].betsHistory.bets[la].bet.length; da++) {
                                ca = c[l].betsHistory.bets[la].bet.slice();
                                ca.sort(a.mainGameManager.sortNumeric);
                                var La = -1 < c[l].betsHistory.bets[la].winBets.indexOf(ca[da]) ? "zone_pressed" : "zone_transp";
                                (ea = T.getChildByName("rect" + r + "_" + da)) ? (ea.texture = a.mainRenderer.resourceLoader.resources[La].texture, ea.visible = !0, ea = ea.getChildByName("textBet" + r + "_" + da), ea.children[0].text = ca[da], ea.visible = !0) : (ea = a.mainRenderer.createButton(T, 32 + 56 * da, 0, La), ea.scale.set(.465,
                                    .465), ea.anchor.set(.5, .5), ea.name = "rect" + r + "_" + da, ea = a.mainRenderer.createButton(ea, 0, 0, void 0, {
                                    text: ca[da],
                                    align: "center",
                                    style: {
                                        font: "bold 45px Arial Narrow",
                                        fill: "#e0e0e0",
                                        stroke: "#000000",
                                        strokeThickness: 4,
                                        align: "center"
                                    }
                                }), ea.anchor.set(.5, .5), ea.name = "textBet" + r + "_" + da)
                            }
                            da = void 0 != c[l].betsHistory.bets[la].win ? formatFLGNums(c[l].betsHistory.bets[la].win, !1) : "";
                            (ca = T.getChildByName("summ" + r)) ? (ca.children[0].text = formatFLGNums(c[l].betsHistory.bets[la].summ, !1), ca.visible = !0, ca = T.getChildByName("coef" +
                                r), ca.children[0].text = "X " + a.mainGameManager.coefficients[c[l].betsHistory.bets[la].countWin][c[l].betsHistory.bets[la].bet.length - 1], ca.visible = !0, T = T.getChildByName("win" + r), T.children[0].text = da, T.visible = !0) : (a.mainRenderer.createButton(T, 676, 0, void 0, {
                                text: formatFLGNums(c[l].betsHistory.bets[la].summ, !1),
                                align: "center",
                                style: d.detailEditionsRowFont
                            }).name = "summ" + r, a.mainRenderer.createButton(T, 821, 0, void 0, {
                                text: "X " + a.mainGameManager.coefficients[c[l].betsHistory.bets[la].countWin][c[l].betsHistory.bets[la].bet.length -
                                1], align: "center", style: d.detailEditionsRowFont
                            }).name = "coef" + r, a.mainRenderer.createButton(T, 960, 0, void 0, {
                                text: da,
                                align: "center",
                                style: d.detailEditionsRowFont
                            }).name = "win" + r)
                        }
                        ca = [];
                        J.emit("updateHeight");
                        da = ea = ea = ca = T = ca = T = J = N = null
                    }
                }
            };
            this.cancelLastEdition = function (e) {
                c.length && (c[c.length - 1].editionResult = e, c[c.length - 1].betsHistory.calculateWin(e), H(c.length - 1))
            };
            this.addEdition = function (e) {
                6 <= c.length && (c[0].betsHistory.destroy && c[0].betsHistory.destroy(), c[0].betsHistory = null, c.shift());
                c.length &&
                !c[c.length - 1].betsHistory.bets.length ? (c[c.length - 1].round = e, c[c.length - 1].editionResult = void 0) : c.length && c[c.length - 1].round === e || (c.push({
                    round: e,
                    editionResult: void 0,
                    betsHistory: new U([])
                }), c[c.length - 1].betsHistory.parentEditions(d));
                H(c.length - 1)
            };
            this.saveToStorage = async function () {
                localStorage.setItem("curUser", JSON.stringify({hall: clientInfoGlobal.hall, nick: clientInfoGlobal.lgn}));
                var e = [], l;
                for (l = 0; l < c.length; l++) e.push({
                    round: c[l].round,
                    editionResult: c[l].editionResult,
                    bets: c[l].betsHistory.bets
                });
                localStorage.setItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "editions", JSON.stringify(e))
            };
            this.loadFromStorage = function () {
                function e(N) {
                    $.ajax({
                        type: "get",
                        url: getUrl(),
                        data: {
                            gethistory: parseInt(a.kenoConfig.serverName.slice(3, a.kenoConfig.serverName.length)),
                            round: N.round
                        },
                        dataType: "json",
                        async: !1,
                        success: function (J, T, ca) {
                            if (d) if (J && J.tirid0) {
                                T = [];
                                ca = J.tirid0;
                                for (J = 0; 20 > J; J++) {
                                    if (99 === ca["b" + J]) return;
                                    T.push(ca["b" + J])
                                }
                                N.editionResult = T;
                                N.betsHistory.calculateWin(N.editionResult, !0)
                            } else N.editionResult =
                                []
                        }
                    })
                }

                if (localStorage.getItem("curUser")) {
                    var l = JSON.parse(localStorage.getItem("curUser"));
                    if (l.hall !== clientInfoGlobal.hall && l.nick !== clientInfoGlobal.lgn) return
                }
                l = a.kenoConfig.gameKind + a.kenoConfig.gameType + "editions";
                if (localStorage.getItem(l)) {
                    var r = JSON.parse(localStorage.getItem(l));
                    for (l = 0; l < r.length; l++) c.push({
                        round: r[l].round,
                        editionResult: r[l].editionResult,
                        betsHistory: new U(r[l].bets)
                    }), (!c[l].editionResult || 20 > c[l].editionResult.length) && e(c[l])
                }
            };
            d.loadFromStorage();
            H(c.length - 1);
            this.events =
                new PIXI.utils.EventEmitter;
            d.events.on("EDITIONS_CHANGE", function () {
                d.saveToStorage()
            });
            d.events.on("RESULT_TIME", M);
            d.events.on("BET_TIME", M)
        }, Ea, q = {};
    this.animations = function () {
        return q
    };
    this.clickAnimationFunc = function (d, c) {
        d && (q[c] && (q[c].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), q[c] = (new TWEEN.Tween(d)).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            q[c] = null;
            a.mainRenderer.renderManager.animationTweenInc();
            q[c] = (new TWEEN.Tween(d)).to({alpha: 0}, 500).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                q[c] = null
            }).start()
        }).start())
    };
    var ia = function (d, c, p) {
            if (d) switch (q[c] && (q[c].stop(), a.mainRenderer.renderManager.animationTweenDec()), a.mainRenderer.renderManager.animationTweenInc(), p) {
                case "grow":
                    q[c] = (new TWEEN.Tween(d.scale)).to({
                        x: 1.2,
                        y: 1.2
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        q[c] = null
                    }).start();
                    break;
                default:
                    q[c] = (new TWEEN.Tween(d)).to({alpha: .6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        q[c] = null
                    }).start()
            }
        }, ha = function (d, c, p) {
            q[c] && (q[c].stop(), a.mainRenderer.renderManager.animationTweenDec());
            if (d && 0 != d.alpha) switch (a.mainRenderer.renderManager.animationTweenInc(), p) {
                case "grow":
                    q[c] = (new TWEEN.Tween(d.scale)).to({
                        x: 1,
                        y: 1
                    }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        q[c] = null
                    }).start();
                    break;
                default:
                    q[c] = (new TWEEN.Tween(d)).to({alpha: 0}, 500).onComplete(function () {
                        a.mainRenderer.renderManager.animationTweenDec();
                        q[c] = null
                    }).start()
            }
        }, wa = function (d, c, p) {
            if (d.container) {
                q[p] && q[p].stop();
                if (d.onStartClose) d.onStartClose();
                a.mainRenderer.renderManager.animationTweenInc();
                q[p] = (new TWEEN.Tween(d.container.scale)).to({y: 0}, 165).easing(TWEEN.Easing.Exponential.InOut).onStop(function () {
                    if (d.onStopClose) d.onStopClose();
                    if (c.onStopOpen) c.onStopOpen();
                    a.mainRenderer.renderManager.animationTweenDec();
                    q[p] = null;
                    d.container.scale.y = 0;
                    c.container.scale.y = 1
                }).onComplete(function () {
                    if (d.onStopClose) d.onStopClose();
                    a.mainRenderer.renderManager.animationTweenDec();
                    q[p] = null;
                    if (c.onStartOpen) c.onStartOpen();
                    a.mainRenderer.renderManager.animationTweenInc();
                    q[p] = (new TWEEN.Tween(c.container.scale)).to({y: 1}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                        if (d.onStopClose) d.onStopClose();
                        if (c.onStopOpen) c.onStopOpen();
                        a.mainRenderer.renderManager.animationTweenDec();
                        q[p] = null;
                        d.container.scale.y =
                            0;
                        c.container.scale.y = 1
                    }).onComplete(function () {
                        if (c.onStopOpen) c.onStopOpen();
                        a.mainRenderer.renderManager.animationTweenDec();
                        q[p] = null
                    }).start()
                }).start()
            }
        }, Ca = function (d, c, p) {
            d && (q[c] ? q[c].stop() : (a.mainRenderer.renderManager.animationTweenInc(), q[c] = (new TWEEN.Tween(d.position)).to({x: p}, 330).easing(TWEEN.Easing.Exponential.Out).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                q[c] = null
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                q[c] = null
            }).start()))
        },
        Da = function (d, c, p) {
            d && (p ? (q[c].stop(), q[c + "chain"] && (TWEEN.remove(q[c + "chain"]), a.mainRenderer.renderManager.animationTweenDec(), q[c + "chain"] = null)) : (a.mainRenderer.renderManager.animationTweenInc(), q[c] = (new TWEEN.Tween(d)).to({rotation: Math.PI / 24}, 330).easing(TWEEN.Easing.Linear.None).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                q[c] = null;
                d.rotation = 0
            }), a.mainRenderer.renderManager.animationTweenInc(), q[c + "chain"] = (new TWEEN.Tween(d)).to({rotation: -Math.PI / 24}, 330).easing(TWEEN.Easing.Linear.None).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                q[c + "chain"] = null;
                d.rotation = 0
            }), q[c].chain(q[c + "chain"]), q[c + "chain"].chain(q[c]), q[c].start()))
        };
    this.simpleFlipXFunc = function (d, c, p, f, F, m) {
        q[c] && q[c].stop();
        var E = d.scale.x;
        a.mainRenderer.renderManager.animationTweenInc();
        q[c] = (new TWEEN.Tween(d.scale)).to({x: 0}, p).onStop(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            q[c] = null;
            d.scale.x = E
        }).onComplete(function () {
            a.mainRenderer.renderManager.animationTweenDec();
            q[c] = null;
            F && F(d);
            a.mainRenderer.renderManager.animationTweenInc();
            q[c] =
                (new TWEEN.Tween(d.scale)).to({x: E}, f).onStop(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    q[c] = null;
                    d.scale.x = E;
                    m && m(d)
                }).onComplete(function () {
                    a.mainRenderer.renderManager.animationTweenDec();
                    q[c] = null;
                    m && m(d)
                }).start()
        }).start()
    };
    this.growCircleAnimationFunc = function (d, c) {
        if (d) {
            q[c] && q[c].stop();
            var p = {x: d.scale.x, y: d.scale.y};
            a.mainRenderer.renderManager.animationTweenInc();
            q[c] = (new TWEEN.Tween(d.scale)).to({
                x: p.x,
                y: p.y
            }, 2E3).easing(TWEEN.Easing.Elastic.OutStr).onStop(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                q[c] = null;
                d.scale = p
            }).onComplete(function () {
                a.mainRenderer.renderManager.animationTweenDec();
                q[c] = null
            }).start()
        }
    };
    var ua = !1;
    X = function (d) {
        "v" === d && "es" === localLanguage() && (d = "v_es");
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
    }(a.kenoConfig.gameType.toLowerCase());
    var qa = [["gmName_K", a.gameDir + "NG/gmNames/" + a.kenoConfig.nameImage[0] + ".png"], ["gmName_E", a.gameDir + "NG/gmNames/" + a.kenoConfig.nameImage[1] + ".png"], ["gmName_N",
        a.gameDir + "NG/gmNames/" + a.kenoConfig.nameImage[2] + ".png"], ["gmName_O", a.gameDir + "NG/gmNames/" + a.kenoConfig.nameImage[3] + ".png"], ["gmName_min", a.gameDir + "NG/gmNames/" + a.kenoConfig.nameImage[4] + ".png"], [a.kenoConfig.BG, a.gameDir + "NG/" + a.kenoConfig.BG + ".jpg"], ["JP", a.gameDir + "WinJP/jp-jackpot-win.png"], ["jp_only", a.gameDir + "WinJP/jp-jackpot-only.png"], ["WIN", a.gameDir + "WinJP/jp-bigwin.png"], ["header", a.gameDir + "NG/header.png"], ["footer", a.gameDir + "NG/footer.png"], ["jp_name", a.gameDir + "NG/jackpotNG/JackPot.png"],
        ["jp_num_bot", a.gameDir + "NG/jackpotNG/num-bot.png"], ["jp_num_top", a.gameDir + "NG/jackpotNG/num-top.png"], ["table_coef", a.gameDir + "table_coefficients_" + X + ".png"], ["btn_clear", a.gameDir + "NG/btn-undo.png"], ["btn_clear_mode_selected", a.gameDir + "NG/btn-undo-mode-selected.png"], ["btn_home", a.gameDir + "NG/btn-home.png"], ["btn_home_mode_selected", a.gameDir + "NG/btn-home-mode-selected.png"], ["btn_info", a.gameDir + "NG/btn-info.png"], ["btn_info_mode_selected", a.gameDir + "NG/btn-info-mode-selected.png"], ["btn_my_bets",
            a.gameDir + "NG/btn-my-bets.png"], ["btn_my_bets_mode_selected", a.gameDir + "NG/btn-my-bets-selected.png"], ["btn_rebet", a.gameDir + "NG/btn-rebet-min.png"], ["btn_rebet_mode_selected", a.gameDir + "NG/btn-rebet-mode-selected-min.png"], ["btn_rebetx2", a.gameDir + "NG/btn-rebetx2-min.png"], ["btn_rebetx2_mode_selected", a.gameDir + "NG/btn-rebetx2-mode-selected-min.png"], ["btn_eye", a.gameDir + "NG/btn-eye-min.png"], ["btn_eye_mode_selected", a.gameDir + "NG/btn-eye-mode-selected2-min.png"], ["btn_eye_closed", a.gameDir + "NG/btn-eye-closed-min.png"],
        ["btn_eye_closed_mode_selected", a.gameDir + "NG/btn-eye-closed-mode-selected-min.png"], ["eye_icon", a.gameDir + "NG/eye-icon-min.png"], ["eye_closed_icon", a.gameDir + "NG/eye-closed-icon-min.png"], ["bet_arrow", a.gameDir + "NG/arrow.png"], ["bet_arrow_selected", a.gameDir + "NG/arrow-selected.png"], ["autoplay", a.gameDir + "NG/autoplay.png"], ["autoplay_selected", a.gameDir + "NG/autoplay-selected.png"], ["autoplay_pressed", a.gameDir + "NG/autoplay-pressed.png"], ["plus", a.gameDir + "NG/plus.png"], ["plus_selected", a.gameDir +
        "NG/plus-selected.png"], ["plus_pressed", a.gameDir + "NG/plus-pressed.png"], ["random", a.gameDir + "NG/random.png"], ["random_selected", a.gameDir + "NG/random-selected.png"], ["random_pressed", a.gameDir + "NG/random-pressed.png"], ["random_num", a.gameDir + "NG/random-num.png"], ["random_num_selected", a.gameDir + "NG/random-num-selected.png"], ["random_num_pressed", a.gameDir + "NG/random-num-pressed.png"], ["tab", a.gameDir + "NG/tab.png"], ["tab_selected", a.gameDir + "NG/tab-selected.png"], ["tab_pressed", a.gameDir + "NG/tab-pressed.png"],
        ["tab_bg", a.gameDir + "NG/tab-bg.png"], ["bet_bot", a.gameDir + "NG/bet-bot.png"], ["zone_transp", a.gameDir + "NG/zone.png"], ["zone_selected", a.gameDir + "NG/zone-selected.png"], ["zone_pressed", a.gameDir + "NG/zone-action.png"], ["zone_win", a.gameDir + "NG/zone-win.png"], ["zone_lock", a.gameDir + "NG/zone-lock.png"], ["zone_lock2", a.gameDir + "NG/zone-lock2.png"], ["table_header", a.gameDir + "NG/table-header.png"], ["table_bg", a.gameDir + "NG/table-bg.png"], ["table_line_odd", a.gameDir + "NG/table-odd-line.png"], ["table_line_even",
            a.gameDir + "NG/table-even-line.png"], ["expand", a.gameDir + "NG/expand.png"], ["tab_history_row", a.gameDir + "NG/tab-history-row.png"], ["hotcold_bg", a.gameDir + "NG/hotcold-bg" + ("es" === localLanguage() ? "_sp" : "") + ".png"], ["ball", a.gameDir + "NG/ball.png"], ["btn_video_load", a.gameDir + "NG/mobile/btn-video-load.png"], ["btn_menu", a.gameDir + "NG/btn-menu2-min.png"], ["btn_menu_selected", a.gameDir + "NG/btn-menu2-selected-min.png"], ["btn_cross", a.gameDir + "NG/btn-cross-min.png"], ["btn_cross_selected", a.gameDir + "NG/btn-cross-selected-min.png"]];
    qa = qa.concat(a.mainFLGAccount.resources);
    qa = qa.concat(na.resources);
    a.mainRenderer.loadResources(a.mainRenderer.stage, FLGUtils.staticRootPath + "images/logo.json", qa, function (d, c, p) {
        a.mainRenderer.createButton(void 0, 0, 0, a.kenoConfig.BG);
        a.mainRenderer.createButton(void 0, 0, 944, "footer");
        a.mainFLGAccount.drawAccount(0, 0, a.kenoConfig, !0);
        a.mainRenderer.createButton(void 0, 0, 0, "header");
        ba = a.mainRenderer.createButton(void 0, 123, 42);
        ba.anchor.set(.5, .5);
        a.mainRenderer.createButton(ba, -87.75, 0, "gmName_K",
            void 0, function () {
                var b = a.kenoConfig.canvasId, k = ["red", "blue", "green", "gold"][Math.floor(4 * Math.random())];
                $("#" + b).attr("gameType", k);
                removeKenoNGObject(b, a.kenoConfig.gameType.toLowerCase());
                initKenoNGObject(b, k)
            });
        ba.children[0].anchor.set(.5, .5);
        ba.children[0].scale.set(.65, .65);
        a.mainRenderer.createButton(ba, -82 * .65, 0, "gmName_E");
        ba.children[1].anchor.set(.5, .5);
        ba.children[1].scale.set(.65, .65);
        a.mainRenderer.createButton(ba, -18.2, 0, "gmName_N");
        ba.children[2].anchor.set(.5, .5);
        ba.children[2].scale.set(.65,
            .65);
        a.mainRenderer.createButton(ba, 24.7, 0, "gmName_O");
        ba.children[3].anchor.set(.5, .5);
        ba.children[3].scale.set(.65, .65);
        a.mainRenderer.createButton(ba, 82.55, 0, "gmName_min");
        ba.children[4].anchor.set(.5, .5);
        ba.children[4].scale.set(.65, .65);
        Ia = setInterval(Ja, 1E4);
        var f = new PIXI.Graphics;
        f.beginFill(0, .5);
        f.drawRect(0, 0, 136, 932);
        f.endFill;
        f.name = "menu_container";
        ka.addChild(f);
        f.position.set(-136, 148);
        ka.interactive = !0;
        A = new PIXI.Graphics;
        A.position.y = 120;
        A.beginFill(0);
        A.drawRect(0, 0, 1920, 28);
        A.endFill;
        f = a.mainRenderer.createButton(A, 960, 14, void 0, {
            text: mainLocalizationTable.placeBets.toUpperCase(),
            align: "center",
            style: {font: "18px Arial", fill: "#efefef", align: "center"}
        });
        f.anchor.set(.5, .5);
        f = a.mainRenderer.createButton(A, 1838, 14, void 0, {
            text: "00:00",
            align: "center",
            style: {font: "24px Arial", fill: "#efefef", align: "center"}
        });
        f.anchor.set(.5, .5);
        A.addChild(new PIXI.Graphics);
        A.children[2].beginFill(42577);
        A.children[2].drawRect(3, 3, 1914, 22);
        A.children[2].endFill;
        f = a.mainRenderer.createButton(A.children[2],
            960, 14, void 0, {
                text: mainLocalizationTable.placeBets.toUpperCase(),
                align: "center",
                style: {font: "18px Arial", fill: "#000000", align: "center"}
            });
        f.anchor.set(.5, .5);
        f = a.mainRenderer.createButton(A.children[2], 1838, 14, void 0, {
            text: "00:00",
            align: "center",
            style: {font: "24px Arial", fill: "#000000", align: "center"}
        });
        f.anchor.set(.5, .5);
        d = new PIXI.Graphics;
        d.beginFill();
        d.drawRect(3, 0, 1914, 28);
        d.endFill;
        A.children[2].mask = d;
        A.children[2].parent.addChild(d);
        d = null;
        a.mainRenderer.stage.addChild(A);
        window.FLGIntgrt ?
            FLGUtils.isIntegrator && fa && (f = a.mainRenderer.createButton(Q, 43, 962, "btn_home"), a.mainRenderer.createButton(f, 0, 0, "btn_home_mode_selected", void 0, function (b, k) {
                a.mainSoundManager.playSound("buttonClick");
                k.stopped = !0;
                w.clickAnimationFunc(b, "btn_home");
                a.mainFLGAccount.closeGame();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                ia(b, "btn_home")
            }, function (b) {
                ha(b, "btn_home")
            }).alpha = 0) : (f = a.mainRenderer.createButton(Q, 43, 977, "btn_menu"), a.mainRenderer.createButton(f, 0, 0, "btn_menu_selected",
            void 0, function (b, k) {
                a.mainSoundManager.playSound("buttonClick");
                k.stopped = !0;
                w.clickAnimationFunc(b, "btn_menu");
                Ca(ka.getChildByName("menu_container"), "menuContainer", 0);
                Q.getChildByName("btn_menu").visible = !1;
                ka.getChildByName("menu_container").getChildByName("btn_cross").visible = !0;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                ia(b, "btn_menu")
            }, function (b) {
                ha(b, "btn_menu")
            }).alpha = 0, f = a.mainRenderer.createButton(ka.getChildByName("menu_container"), 49, 826, "btn_cross"),
            a.mainRenderer.createButton(f, 0, 0, "btn_cross_selected", void 0, function (b, k) {
                a.mainSoundManager.playSound("buttonClick");
                k.stopped = !0;
                w.clickAnimationFunc(b, "btn_cross");
                Ca(ka.getChildByName("menu_container"), "menuContainer", -136);
                Q.getChildByName("btn_menu").visible = !0;
                ka.getChildByName("menu_container").getChildByName("btn_cross").visible = !1;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                ia(b, "btn_cross")
            }, function (b) {
                ha(b, "btn_cross")
            }).alpha = 0, f = a.mainRenderer.createButton(ka.getChildByName("menu_container"),
            32, 710, "btn_home"), a.mainRenderer.createButton(f, 0, 0, "btn_home_mode_selected", void 0, function (b, k) {
            a.mainSoundManager.playSound("buttonClick");
            k.stopped = !0;
            w.clickAnimationFunc(b, "btn_home");
            a.mainFLGAccount.closeGame();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            ia(b, "btn_home")
        }, function (b) {
            ha(b, "btn_home")
        }).alpha = 0, APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && f && (f.visible = clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl), d = "srv58" !== a.kenoConfig.serverName ?
            533 : 600, f = a.mainRenderer.createButton(ka.getChildByName("menu_container"), 68, d, "btn_eye"), a.mainRenderer.createButton(f, 0, 0, "btn_eye_mode_selected", void 0, function (b, k) {
            a.mainSoundManager.playSound("buttonClick");
            k.stopped = !0;
            w.clickAnimationFunc(b, "btn_eye");
            ja.needShow = !ja.needShow;
            y.events.emit("GRID_STATS");
            b.parent.texture = a.mainRenderer.resourceLoader.resources[ja.needShow ? "btn_eye" : "btn_eye_closed"].texture;
            b.texture = a.mainRenderer.resourceLoader.resources[ja.needShow ? "btn_eye_mode_selected" :
                "btn_eye_closed_mode_selected"].texture;
            y.betBGContainer().getChildByName("eye_icon").children[0].texture = a.mainRenderer.resourceLoader.resources[ja.needShow ? "eye_icon" : "eye_closed_icon"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            ia(b, "btn_eye")
        }, function (b) {
            ha(b, "btn_eye")
        }).alpha = 0, f.anchor.set(.5, .5), f.children[0].anchor.set(.5, .5), "srv58" !== a.kenoConfig.serverName && (f = a.mainRenderer.createButton(ka.getChildByName("menu_container"), 46, 600, "btn_my_bets"),
            a.mainRenderer.createButton(f, 0, 0, "btn_my_bets_mode_selected", void 0, function (b, k) {
                a.mainSoundManager.playSound("buttonClick");
                FLGUtils && FLGUtils.showGamerHistory ? FLGUtils.showGamerHistory() : (showCashFlowDlg(), k.stopped = !0, w.clickAnimationFunc(b, "btn_my_bets"), a.mainRenderer.renderManager.needUpdateRender = !0)
            }, void 0, void 0, function (b) {
                ia(b, "btn_my_bets")
            }, function (b) {
                ha(b, "btn_my_bets")
            }).alpha = 0, f.visible = "DEMO" != clientInfoGlobal.hall), a.mainRenderer.createButton(ka.getChildByName("menu_container"),
            68, 670, void 0, {
                text: mainLocalizationTable.myBets,
                align: "center",
                style: {font: "20px Arial Narrow", fill: "#ffffff"}
            }).visible = "DEMO" != clientInfoGlobal.hall);
        f = a.mainRenderer.createButton(Q, 172, 962, "btn_info");
        a.mainRenderer.createButton(f, 0, 0, "btn_info_mode_selected", void 0, function (b, k) {
            if (b.pressed) w.clickAnimationFunc(b, "btn_info"), x.info.lastTab.button.emit("mousedown"), b.pressed = !1; else {
                for (var h in x) "info" !== h && x[h].button && x[h].button.pressed && (x[h].button.pressed = !1, x[h].button.texture = a.mainRenderer.resourceLoader.resources.tab.texture,
                    x[h].button.getChildByName("texttab").style = {
                        font: "bold 30px Arial Narrow",
                        fill: "#292929"
                    }, x.info.lastTab = x[h], wa(x[h], x.info, "flipContainer"));
                b.alpha = .67;
                b.pressed = !0
            }
            a.mainSoundManager.playSound("buttonClick");
            k && (k.stopped = !0);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            b.pressed || ia(b, "btn_info")
        }, function (b) {
            b.pressed || ha(b, "btn_info")
        }).alpha = 0;
        f = a.mainRenderer.createButton(Q, 292, 967, "btn_clear");
        a.mainRenderer.createButton(f, 0, 0, "btn_clear_mode_selected", void 0,
            function (b, k) {
                a.mainSoundManager.playSound("clearBet");
                a.mainGrid.removeCurrentBets();
                a.mainFLGAccount.maxWin(0);
                a.mainRenderer.renderManager.needUpdateRender = !0;
                k.stopped = !0;
                w.clickAnimationFunc(b, "btn_clear");
                a.mainRenderer.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (b) {
                ia(b, "btn_clear")
            }, function (b) {
                ha(b, "btn_clear")
            }).alpha = 0;
        a.mainRenderer.createButton(Q, 318, 1027, void 0, {
            text: mainLocalizationTable.undo,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        });
        f = a.mainRenderer.createButton(Q,
            1360, 957, "btn_rebet");
        a.mainRenderer.createButton(f, 0, 0, "btn_rebet_mode_selected", void 0, function (b, k) {
            a.mainSoundManager.playSound("buttonClick");
            k.stopped = !0;
            w.clickAnimationFunc(b, "btn_rebet");
            a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            y && 1 < y.editions.length && ia(b, "btn_rebet")
        }, function (b) {
            ha(b, "btn_rebet")
        }).alpha = 0;
        a.mainRenderer.createButton(Q, 1386, 1027, void 0, {
            text: mainLocalizationTable.repeat,
            align: "center", style: {font: "20px Arial Narrow", fill: "#ffffff"}
        });
        "V" !== a.kenoConfig.gameType && (f = a.mainRenderer.createButton(Q, 1480, 957, "btn_rebetx2"), a.mainRenderer.createButton(f, 0, 0, "btn_rebetx2_mode_selected", void 0, function (b, k) {
            a.mainSoundManager.playSound("buttonClick");
            k.stopped = !0;
            w.clickAnimationFunc(b, "btn_rebetx2");
            Fa = !0;
            a.mainFLGAccount.autoplayManager.updateCallback("repeatLastBet");
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            y && 1 < y.editions.length && ia(b,
                "btn_rebetx2")
        }, function (b) {
            ha(b, "btn_rebetx2")
        }).alpha = 0, a.mainRenderer.createButton(Q, 1515, 1027, void 0, {
            text: mainLocalizationTable.repeatx2,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        }));
        f = a.mainRenderer.createButton(Q, 418, 993, "bet_arrow");
        a.mainRenderer.createButton(f, 0, 0, "bet_arrow_selected", void 0, function (b, k) {
            a.mainSoundManager.playSound("chipSelector");
            I.decrementBet();
            var h = Q.getChildByName("betText").children[0];
            I.isMaxBet() ? h.text = "MAX\n" + R : h.text = I.currentBet();
            localStorage.setItem(a.kenoConfig.gameKind +
                a.kenoConfig.gameType + "defaultBet", JSON.stringify(I.currentBet()));
            a.mainUIManager.setTextScale(h);
            sa();
            k.stopped = !0;
            w.clickAnimationFunc(b, "bet_arrow");
            b.parent.visible = 0 !== I.possibleBets.indexOf(I.currentBet());
            b.parent.parent.getChildByName("bet_arrow2").visible = !I.isMaxBet();
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            ia(b, "bet_arrow")
        }, function (b) {
            ha(b, "bet_arrow")
        }).alpha = 0;
        f.anchor.set(.5, .5);
        f.children[0].anchor.set(.5, .5);
        a.mainRenderer.createButton(Q, 496,
            992, void 0, {
                text: I.currentBet(),
                align: "center",
                style: {font: "40px Arial Black", fill: "#ffffff", align: "center"}
            }).name = "betText";
        a.mainUIManager.setTextScale(Q.getChildByName("betText").children[0]);
        f = a.mainRenderer.createButton(Q, 574, 991, "bet_arrow");
        a.mainRenderer.createButton(f, 0, 0, "bet_arrow_selected", void 0, function (b, k) {
            a.mainSoundManager.playSound("chipSelector");
            I.incrementBet();
            var h = Q.getChildByName("betText").children[0];
            I.isMaxBet() ? h.text = "MAX\n" + R : h.text = I.currentBet();
            localStorage.setItem(a.kenoConfig.gameKind +
                a.kenoConfig.gameType + "defaultBet", JSON.stringify(I.currentBet()));
            a.mainUIManager.setTextScale(h);
            sa();
            k.stopped = !0;
            w.clickAnimationFunc(b, "bet_arrow2");
            b.parent.visible = !I.isMaxBet();
            b.parent.parent.getChildByName("bet_arrow").visible = 0 !== I.possibleBets.indexOf(I.currentBet());
            "srv58" === a.kenoConfig.serverName && (b.parent.visible = I.possibleBets[4] !== I.currentBet());
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, void 0, function (b) {
            ia(b, "bet_arrow2")
        }, function (b) {
            ha(b, "bet_arrow2")
        }).alpha =
            0;
        f.anchor.set(.5, .5);
        f.children[0].anchor.set(.5, .5);
        f.rotation = Math.PI;
        f.name += "2";
        a.mainRenderer.createButton(Q, 496, 1027, void 0, {
            text: mainLocalizationTable.bet,
            align: "center",
            style: {font: "20px Arial Narrow", fill: "#ffffff"}
        });
        "srv58" !== a.kenoConfig.serverName && (f = a.mainRenderer.createButton(Q, 650, 945, "autoplay", void 0, function (b, k) {
            a.mainSoundManager.playSound("buttonClick");
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            a.mainFLGAccount.autoplayManager.changeVisible();
            k.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }), f.hitArea = new PIXI.Rectangle(0,
            0, 237, 100), a.mainRenderer.createButton(f, 129, 50, void 0, {
            text: mainLocalizationTable.autoPlay.toUpperCase(),
            align: "center",
            style: {font: "bold 30px Arial Narrow", fill: "#292929"}
        }));
        f = a.mainRenderer.createButton(Q, 960, 945, "random", void 0, function (b, k) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            a.mainGrid.removeCurrentBets();
            a.mainGrid.createRandomBets();
            (b = Q.getChildByName("plus")) && b.interactive && (b.emit("mousedown"), b.emit("mouseup"));
            sa();
            k.stopped = !0;
            a.mainRenderer.renderManager.needUpdateRender =
                !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        f.hitArea = new PIXI.Rectangle(73, 0, 237, 100);
        a.mainRenderer.createButton(f, 164, 50, void 0,
            {
                text: mainLocalizationTable.random.toUpperCase(),
                align: "center",
                style: {font: "bold 30px Arial Narrow", fill: "#292929"}
            });
        d = localStorage.getItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "randomCount") ? JSON.parse(localStorage.getItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "randomCount")) : 1;
        a.mainRenderer.createButton(Q, 1206, 945, "random_num", {
            text: d,
            align: "center",
            style: {font: "bold 30px Arial Narrow", fill: "#292929"}
        }, function (b, k) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            a.mainSoundManager.playSound("buttonClick");
            b.getChildByName("text" + b.name).text = a.mainGrid.incrementRandomCount(parseInt(b.getChildByName("text" + b.name).text));
            localStorage.setItem(a.kenoConfig.gameKind + a.kenoConfig.gameType + "randomCount", JSON.stringify(parseInt(b.getChildByName("text" + b.name).text)));
            k.stopped = !0;
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
        f = a.mainRenderer.createButton(Q, 960, 972, "plus", void 0, function (b, k) {
            a.mainSoundManager.playSound("buttonClick");
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_pressed"].texture;
            if (0 < a.mainGrid.pressedZones.length) {
                b.interactive =
                    !1;
                b.parent.getChildByName("random").interactive = !1;
                var h = a.mainGrid.getIntArrayOfPressedZones(), L = function () {
                    y.getActedOutEdition().betsHistory.addBet({
                        summ: I.currentBet(),
                        bet: h,
                        winBets: [],
                        countWin: 0,
                        win: void 0
                    }, y.getActedOutEdition().round, function (S) {
                        if (S) {
                            a.mainFLGAccount.maxWin(0);
                            for (var W in h) switch (S = a.mainGrid.zones[h[W] - 1], S.emit("mousedown"), S.emit("mouseup"), S.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, S.isLock ? S.isLock++ : S.isLock = 1, S.isLock) {
                                case 1:
                                    S.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                    break;
                                default:
                                    S.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                            }
                        }
                        b.interactive = !0;
                        b.parent.getChildByName("random").interactive = !0;
                        b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    })
                };
                I.isMaxBet() ? showAgreeDlg(L, function () {
                    b.interactive = !0;
                    b.parent.getChildByName("random").interactive = !0;
                    b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }) : L()
            }
            k && (k.stopped =
                !0);
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, void 0, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name + "_selected"].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, function (b) {
            b.texture = a.mainRenderer.resourceLoader.resources[b.name].texture;
            a.mainRenderer.renderManager.needUpdateRender = !0
        });
        f.anchor.set(.5, .5);
        for (var F in x) {
            switch (F) {
                case "game":
                    f =
                        a.mainRenderer.createButton(oa, 599, 524, void 0);
                    break;
                case "history":
                    f = a.mainRenderer.createButton(oa, 599, 524, "tab_bg");
                    break;
                case "stats":
                    f = a.mainRenderer.createButton(oa, 599, 524, "tab_bg");
                    break;
                case "video":
                    f = a.mainRenderer.createButton(oa, 599, 524);
                    break;
                case "info":
                    f = a.mainRenderer.createButton(oa, 599, 524, "tab_bg");
                    f.name = F;
                    f.anchor.set(.5, .5);
                    f.scale.y = 0;
                    x[F].container = f;
                    x[F].button = Q.getChildByName("btn_info").children[0];
                    continue
            }
            f.name = F;
            f.anchor.set(.5, .5);
            f.scale.y = 0;
            x[F].container = f;
            if ("V" !==
                a.kenoConfig.gameType || "stats" !== F) (function (b) {
                f = a.mainRenderer.createButton(oa, x[F].posX, x[F].posY, "tab", {
                        text: x[F].text,
                        align: "center",
                        style: {font: "bold 30px Arial Narrow", fill: "#292929"}
                    }, function (k, h) {
                        if (!k.pressed) if ("history" === b && FLGUtils && FLGUtils.showGamerHistory) FLGUtils.showGamerHistory(); else {
                            k.texture = a.mainRenderer.resourceLoader.resources.tab_pressed.texture;
                            k.getChildByName("texttab").style = {font: "bold 30px Arial Narrow", fill: "#ffffff"};
                            a.mainSoundManager.playSound("buttonClick");
                            for (var L in x) "info" !== L && x[L].button && x[L].button.pressed ? (x[L].button.pressed = !1, x[L].button.texture = a.mainRenderer.resourceLoader.resources.tab.texture, x[L].button.getChildByName("texttab").style = {
                                font: "bold 30px Arial Narrow",
                                fill: "#292929"
                            }, wa(x[L], x[k.name], "flipContainer")) : "info" === L && x[L].button.pressed && (x[L].button.pressed = !1, w.clickAnimationFunc(x[L].button, "btn_info"), wa(x[L], x[k.name], "flipContainer"));
                            k.pressed = !0;
                            h && (h.stopped = !0);
                            a.mainRenderer.renderManager.needUpdateRender = !0
                        }
                    },
                    void 0, void 0, function (k) {
                        k.pressed || (k.texture = a.mainRenderer.resourceLoader.resources.tab_selected.texture, a.mainRenderer.renderManager.needUpdateRender = !0)
                    }, function (k) {
                        k.pressed || (k.texture = a.mainRenderer.resourceLoader.resources.tab.texture, a.mainRenderer.renderManager.needUpdateRender = !0)
                    })
            })(F), f.rotation = -Math.PI / 2, f.name = F, x[F].button = f, x[F].pressedDefault && (x[F].button.pressed = !0, x[F].button.texture = a.mainRenderer.resourceLoader.resources.tab_pressed.texture, x[F].button.getChildByName("texttab").style =
                {font: "bold 30px Arial Narrow", fill: "#ffffff"}, x[F].container.scale.y = 1)
        }
        c = {x: 599, y: 524};
        if ("srv58" === a.kenoConfig.serverName && "es" === localLanguage()) {
            var m = new MaskedSprite(a.mainRenderer.createButton(x.info.container, 0, 0), {
                mask: {
                    x: 60 - c.x,
                    y: -330,
                    width: 1070,
                    height: 630
                }, needScrolling: {}
            }, a.mainRenderer.renderManager);
            m.srcSprite.interactive = !0;
            m.srcSprite.hitArea = new PIXI.Rectangle(70 - c.x, 240 - c.y, 1061, 500);
            c = m.containerForScroll;
            f = a.mainRenderer.createButton(c, 0, 300, "table_coef");
            f.anchor.set(.5, .5);
            c.emit("updateHeight")
        } else f = a.mainRenderer.createButton(x.info.container, 598 - c.x, 214 - c.y + 10, void 0, {
            text: mainLocalizationTable.coefHeader.toUpperCase(),
            align: "center",
            style: {font: "bold 34px Arial", fill: "#ffffff", align: "center"}
        }), f.anchor.set(.5, .5), f = a.mainRenderer.createButton(x.info.container, -518, -263, "table_coef");
        f.scale.set(1, 1);
        if ("srv58" !== a.kenoConfig.serverName || "es" !== localLanguage()) {
            var E = {font: "bold 30px Arial", fill: "#313131"};
            m = new PIXI.Text(mainLocalizationTable.selectedBalls.toUpperCase(),
                E);
            m.position.set(571, 23);
            m.anchor.set(.5, .5);
            f.addChild(m);
            c = 3;
            var B = 108, C = 70;
            for (m = 1; 11 > m; m++) {
                var n = 9 < m ? 134 : 7 < m ? 105 : 7 == m ? 106 : 3 < m ? 90 : 60;
                B += n;
                var g = new PIXI.Text(m, E);
                g.position.set(B - Math.round(n / 2), C);
                g.anchor.set(.5, .5);
                f.addChild(g);
                B += c
            }
            m = new PIXI.Text(mainLocalizationTable.guessedBalls.toUpperCase(), E);
            m.position.set(22, 335);
            m.anchor.set(.5, .5);
            m.rotation = -Math.PI / 2;
            f.addChild(m);
            B = 76;
            C = 115;
            n = 41;
            for (m = 0; 11 > m; m++) g = new PIXI.Text(m, E), g.position.set(B, C), g.anchor.set(.5, .5), f.addChild(g), C +=
                n + c;
            E = {font: "bold 30px Arial", fill: "#dbdbdb"};
            var t;
            B = 109;
            C = 94;
            c = 4;
            for (m = 0; m < a.mainGameManager.coefficients.length; m++) {
                C += 40;
                for (t = 0; t < a.mainGameManager.coefficients[m].length; t++) n = 8 < t ? 133 : 6 == t ? 103 : 5 < t ? 105 : 2 < t ? 89 : 0 == t ? 58 : 59, B += n, 0 != a.mainGameManager.coefficients[m][t] && (g = new PIXI.Text(a.mainGameManager.coefficients[m][t], E), g.position.set(B - Math.round(n / 2), C - 20), g.anchor.set(.5, .5), f.addChild(g)), B += c;
                B = 110;
                C += c
            }
        }
        f = c = g = m = E = E = null;
        pa = new u(250, 24, 82, void 0, !0);
        a.mainRenderer.stage.addChild(Q);
        a.mainRenderer.stage.addChild(oa);
        a.mainRenderer.stage.addChild(ka);
        a.setMainGrid(new Grid(-549, -345, 10, 8, 10, x.game.container, a.mainRenderer));
        a.mainGrid.setRandomBetsCount(parseInt(d));
        a.mainGrid.createZones(110, 86, {x: 0, y: 0}, {
            font: "bold 45px Arial Narrow",
            fill: "#e0e0e0",
            stroke: "#000000",
            strokeThickness: 4,
            align: "center"
        }, function (b, k, h) {
            if (b.selected || !(a.mainGrid.pressedZones.length >= a.mainGrid.maxPreessedZones)) {
                k ? b.selected || (b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture) : a.mainGrid.gridContainer.down =
                    !0;
                if (k && a.mainGrid.gridContainer.down || !k && !h || h && (b.name != ra || void 0 == ra)) if (b.selected) {
                    if (-1 != a.mainGrid.selectedZones.indexOf(b)) if (b.isLock) switch (b.isLock) {
                        case 1:
                            b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                            break;
                        default:
                            b.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                    } else b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture; else b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture;
                    b.selected = !1;
                    a.mainGrid.pressedZones.splice(a.mainGrid.pressedZones.indexOf(b),
                        1);
                    Da(b, "rotate" + b.children[0].text, !0)
                } else b.texture = a.mainRenderer.resourceLoader.resources.zone_selected.texture, Da(b, "rotate" + b.children[0].text), b.selected = !0, a.mainSoundManager.playSound("firstChip"), a.mainGrid.pressedZones.push(b);
                h && (ra = b.name);
                a.mainGrid.gridContainer.down && sa();
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }, function (b, k) {
            if (k) {
                if (!b.selected && !a.mainGrid.gridContainer.down) if (b.isLock) switch (b.isLock) {
                    case 1:
                        b.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                        break;
                    default:
                        b.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                } else b.texture = a.mainRenderer.resourceLoader.resources.zone_transp.texture
            } else a.mainGrid.gridContainer.down = !1, ra = void 0;
            a.mainRenderer.renderManager.needUpdateRender = !0
        }, !0);
        a.mainRenderer.stage.on("changeLang", xa);
        a.mainGameManager.gameStateAsync(function (b) {
            var k = 0 >= b.t2 ? b.tir : b.tir + 1;
            y.editions.length && y.editions[y.editions.length - 1].round === k || y.addEdition(k);
            if (y.editions.length && y.editions[y.editions.length -
            1].round === k) {
                k = y.editions[y.editions.length - 1].betsHistory.bets;
                for (var h, L = 0, S = 0; S < k.length; S++) {
                    L += k[S].summ;
                    for (var W = 0; W < k[S].bet.length; W++) switch (h = a.mainGrid.zones[k[S].bet[W] - 1], h.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, h.isLock ? h.isLock++ : h.isLock = 1, h.isLock) {
                        case 1:
                            h.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                            break;
                        default:
                            h.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                    }
                    h = null
                }
                a.mainFLGAccount.totalBet(L, !0);
                ua = !0
            }
            y.drawEditions();
            ta = new hotcoldGraphsKeno(b, x.stats, function (D, H) {
                var z = 0, Z = 9;
                if (0 === H.children.length) {
                    var G = a.mainRenderer.createButton(H, -1, -310, void 0, {
                        text: mainLocalizationTable.hotcoldRating.replace(/%s/g, 100).toUpperCase(),
                        align: "center",
                        style: {font: "bold 34px Arial", fill: "#ffffff", align: "center"}
                    });
                    G.anchor.set(.5, .5);
                    H = a.mainRenderer.createButton(H, -531, -284, "hotcold_bg");
                    var M = new PIXI.Container;
                    H.addChild(M);
                    var Y = new PIXI.Container;
                    H.addChild(Y);
                    for (var e in D.cold) {
                        if (5 < z) break;
                        G = new PIXI.Graphics;
                        G.position.set(93 +
                            163 * z, 188);
                        M.addChild(G);
                        G = new PIXI.Graphics;
                        G.position.set(93 + 163 * z, 499);
                        Y.addChild(G);
                        G = a.mainRenderer.createButton(H, 169 + 163 * z, 156, void 0, {
                            text: D.hot[z][1] + "%",
                            align: "center",
                            style: {font: "bold 50px Arial", fill: "#fe801b", align: "center"}
                        });
                        G.anchor.set(.5, .5);
                        G = a.mainRenderer.createButton(H, 169 + 163 * z, 246, void 0, {
                            text: D.hot[z][0],
                            align: "center",
                            style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                        });
                        G.anchor.set(.5, .5);
                        G = a.mainRenderer.createButton(H, 169 + 163 * z, 472, void 0, {
                            text: D.cold[Z][1] +
                                "%", align: "center", style: {font: "bold 50px Arial", fill: "#9bccff", align: "center"}
                        });
                        G.anchor.set(.5, .5);
                        G = a.mainRenderer.createButton(H, 169 + 163 * z, 558, void 0, {
                            text: D.cold[Z][0],
                            align: "center",
                            style: {font: "bold 60px Arial", fill: "#ffffff", align: "center"}
                        });
                        G.anchor.set(.5, .5);
                        z++;
                        Z--
                    }
                } else for (e in H = H.children[1], M = H.children[0], Y = H.children[1], D.cold) {
                    if (5 < z) break;
                    a.mainUIManager.animations()["anim_graph_hot" + z] && a.mainUIManager.animations()["anim_graph_hot" + z].stop();
                    a.mainUIManager.animations()["anim_graph_cold" +
                    z] && a.mainUIManager.animations()["anim_graph_cold" + z].stop();
                    M.children[z].clear();
                    Y.children[z].clear();
                    H.children[4 * z + 2].children[0].text = "0%";
                    H.children[4 * z + 3].children[0].text = D.hot[z][0];
                    H.children[4 * z + 4].children[0].text = "0%";
                    H.children[4 * z + 5].children[0].text = D.cold[Z][0];
                    z++;
                    Z--
                }
            }, function (D, H) {
                if (0 !== H.children.length) {
                    var z = H.children[1].children[0], Z = H.children[1].children[1], G = 0, M = 9, Y;
                    for (Y in D.cold) {
                        if (5 < G) break;
                        a.mainRenderer.renderManager.animationTweenInc();
                        a.mainUIManager.animations()["anim_graph_hot" +
                        G] = (new TWEEN.Tween({
                            percentage: 0,
                            data: {rect: z.children[G], iteration: G, percentText: H.children[1].children[4 * G + 2]}
                        })).to({percentage: D.hot[G][1]}, 990).easing(TWEEN.Easing.Back.Out).onStop(function () {
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
                        a.mainUIManager.animations()["anim_graph_cold" + G] = (new TWEEN.Tween({
                            percentage: 0,
                            data: {rect: Z.children[G], iteration: G, percentText: H.children[1].children[4 * G + 4]}
                        })).to({percentage: D.cold[M][1]}, 990).easing(TWEEN.Easing.Back.Out).onStop(function () {
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
                        G++;
                        M--
                    }
                }
            });
            ta.draw();
            y.events.emit("GRID_STATS", b);
            na.drawCustomJackpot(function (D, H) {
                if (H) {
                    var z = a.mainRenderer.stage.getChildByName("JackpotContainer"), Z = utils.formatNumber(H);
                    if (z) {
                        var G = z.children[1];
                        H = z.children[2];
                        var M = z.children[3];
                        M.children[0].text = Z
                    } else z = a.mainRenderer.createButton(void 0, 1296, 179), z.name = "JackpotContainer", a.mainRenderer.createButton(z, 0, 45, "jp_name").anchor.y = .5, z.children[0].scale.set(1.25, 1.25), G = a.mainRenderer.createButton(z, 3, 3), H = a.mainRenderer.createButton(z,
                        0, 75), G.visible = !1, M = a.mainRenderer.createButton(z, 280, 45, void 0, {
                        text: Z,
                        style: {font: "bold 54px Arial", fill: "#d6d6d6", align: "left"}
                    });
                    z = 0;
                    M = G.position.x + M.children[0].width;
                    G = .8 * M / 10;
                    Z = .2 * M / 9;
                    for (var Y = 0; 10 > Y; Y++) {
                        M = H.children[Y];
                        switch (Y) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                var e = 65280;
                                break;
                            case 7:
                            case 8:
                                e = 15973429;
                                break;
                            case 9:
                                e = 15352834
                        }
                        M ? (M.clear(), M.beginFill(e), M.drawRect(z, 0, G, 4), M.endFill) : (M = new PIXI.Graphics, M.beginFill(e), M.drawRect(z, 0, G, 4), M.endFill, H.addChild(M));
                        z += G +
                            Z;
                        M.visible = Y <= parseInt(D)
                    }
                    a.mainRenderer.renderManager.needUpdateRender = !0
                }
            });
            na.updateJackpotData(b);
            a.mainFLGAccount.autoplayManager.updateCallback = function (D) {
                if ("repeatLastBet" === D && 2 > y.editions.length) a.mainRenderer.logService.log(mainLocalizationTable.emptyRebet); else if (!(2 > y.editions.length)) {
                    switch (D) {
                        case "repeatLastBet":
                            var H = D = -1;
                            var z = y.editions.length - 2;
                            break;
                        case "getOnlyBets":
                            H = D = void 0;
                            z = y.editions.length - 1;
                            break;
                        default:
                            D = y.editions[y.editions.length - 2].betsHistory.setTotalWin(),
                                H = a.mainFLGAccount.balance(), z = y.editions.length - 2
                    }
                    a.mainFLGAccount.autoplayManager.update(y.editions[z].betsHistory.bets, D, H, function (Z) {
                            if (a.mainGameManager) {
                                if (Fa) {
                                    for (var G = 0; G < Z.length; G++) Z[G].summ *= 2;
                                    Fa = !1
                                }
                                0 < Z.length && y.getActedOutEdition().betsHistory.addBet(Z, y.getActedOutEdition().round, function (M) {
                                    if (M && M.length) {
                                        var Y;
                                        for (Y = 0; Y < M.length; Y++) for (var e = 0; e < M[Y].bet.length; e++) {
                                            var l = a.mainGrid.zones[M[Y].bet[e] - 1];
                                            l.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                            l.isLock ?
                                                l.isLock++ : l.isLock = 1;
                                            switch (l.isLock) {
                                                case 1:
                                                    l.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                                    break;
                                                default:
                                                    l.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                                            }
                                        }
                                    } else if (M) for (e = 0; e < M.bet.length; e++) switch (l = a.mainGrid.zones[M.bet[e] - 1], l.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture, l.isLock ? l.isLock++ : l.isLock = 1, l.isLock) {
                                        case 1:
                                            l.texture = a.mainRenderer.resourceLoader.resources.zone_lock.texture;
                                            break;
                                        default:
                                            l.texture = a.mainRenderer.resourceLoader.resources.zone_lock2.texture
                                    }
                                })
                            }
                        },
                        y.editions[z].round)
                }
            };
            va(b);
            p && p()
        })
    }, function () {
        a.mainSoundManager.playRandomBackSound()
    });
    var xa = function () {
        a.mainFLGAccount.updateAccountText();
        y.redrawEditionHeader();
        y.drawBetsHeader();
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.onLanguageChange = xa;
    this.setInteraction = function (d) {
        Q.getChildByName("btn_clear").children[0].interactive = d;
        a.mainGrid.setZoneInteraction(d);
        Q.getChildByName("random").interactive = d;
        Q.getChildByName("plus").interactive = d;
        A.children[2].children[0].visible =
            d;
        a.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.setTextScale = function (d) {
        d.text.match(/MAX\n/) ? d.scale.set(.6, .6) : d.scale.set(1, 1)
    };
    var sa = function () {
        var d = 0;
        0 < a.mainGrid.pressedZones.length && 0 < I.currentBet() && (d = I.currentBet() * a.mainGameManager.coefficients[a.mainGrid.pressedZones.length][a.mainGrid.pressedZones.length - 1]);
        a.mainFLGAccount.maxWin(d)
    }, Ha = 0, Ma = 0, va = function (d) {
        function c(m) {
            a.mainGameManager && (A.children[2].mask.clear(), A.children[2].mask.beginFill(), A.children[2].mask.drawRect(3,
                0, 1914 * m, 28), A.children[2].mask.endFill, A.children[2].children[1].children[0].text = aa.getTimerText(), A.children[1].children[0].text = aa.getTimerText(), a.mainRenderer.renderManager.needUpdateRender = !0)
        }

        function p(m) {
            if (a.mainGameManager) {
                $(window).trigger("restartHls");
                A.children[2].clear();
                A.children[2].beginFill(42577);
                A.children[2].drawRect(3, 3, 1914, 22);
                A.children[2].endFill;
                ua ? ua = !1 : (a.mainFLGAccount.setWinTextVisible(!0), a.mainGrid.removeSelectedBets(), a.mainGrid.highlightZones(a.mainRenderer.resourceLoader.resources.zone_transp.texture,
                    {
                        font: "bold 45px Arial Narrow",
                        fill: "#e0e0e0",
                        stroke: "#000000",
                        strokeThickness: 4,
                        align: "center"
                    }, void 0, a.mainGrid.getIntArrayOfZones()));
                ta.update(m);
                a.mainUIManager.setInteraction(!0);
                y.addEdition(m.tir + 1);
                a.mainFLGAccount.autoplayManager.updateCallback();
                na.updateJackpotData(m);
                var E = [], B;
                for (B = 1; 21 > B; B++) E.push(m["b" + B]);
                pa.startDrawBalls(E, 1, 0);
                E = a.mainRenderer.stage.getChildByName("roundText").children[0];
                E.text = "#" + m.tir;
                E = null;
                1 < y.editions.length && y.drawDetailEditionHistory(x.history.container,
                    y.editions.length - 2);
                aa.start({
                        minutes: 0,
                        seconds: (m.time_round ? m.time_round : a.kenoConfig.tirTime) - a.kenoConfig.timerOffset - m.t2
                    }, {
                        minutes: 0,
                        seconds: (m.time_round ? m.time_round : a.kenoConfig.tirTime) - a.kenoConfig.timerOffset
                    }, c, function () {
                        a.mainGameManager && (a.mainGrid.removeCurrentBets(), a.mainGrid.removeFuckingHoverTexture(), pa.removeBalls(), a.mainRenderer.stage.getChildByName("roundText").children[0].text = "#" + y.editions[y.editions.length - 1].round, a.mainUIManager.setInteraction(!1), a.mainSoundManager.playSound("endBet"))
                    },
                    .1, va);
                y.events.emit("BET_TIME", m)
            }
        }

        function f(m) {
            function E() {
                a.mainGameManager && (a.mainGameManager.gameStateAsync(B), a.mainRenderer.renderManager.needUpdateRender = !0)
            }

            function B(g) {
                function t(W) {
                    if (a.mainGrid && a.mainGameManager) if (k >= b.length) W(); else {
                        var D = b.slice(0, k + 1), H = "resultBalls" + k, z = a.mainGrid.zones[parseInt(b[k]) - 1];
                        a.mainUIManager.simpleFlipXFunc(z, H, 450, 450, function (Z) {
                            Z.texture = Z.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture : a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                        });
                        pa.startDrawBalls(D, 1, 0);
                        y.cancelLastEdition(D);
                        k += 1;
                        setTimeout(function () {
                            t(W)
                        }, 900)
                    }
                }

                if (a.mainGameManager) if (99 === g.b1) setTimeout(E, 2E3); else {
                    var b = [g.b1, g.b2, g.b3, g.b4, g.b5, g.b6, g.b7, g.b8, g.b9, g.b10, g.b11, g.b12, g.b13, g.b14, g.b15, g.b16, g.b17, g.b18, g.b19, g.b20],
                        k = limit(n, 0, 19);
                    if (0 !== k) {
                        var h;
                        for (h = 0; h <= k; h++) {
                            var L = "resultBalls" + h, S = a.mainGrid.zones[parseInt(b[h]) - 1];
                            a.mainUIManager.simpleFlipXFunc(S, L, 450, 450, function (W) {
                                W.texture = W.isLock ? a.mainRenderer.resourceLoader.resources.zone_win.texture :
                                    a.mainRenderer.resourceLoader.resources.zone_pressed.texture
                            })
                        }
                    }
                    t(function () {
                        a.mainFLGAccount.calculateWin(y.getActedOutEdition().betsHistory.bets, a.kenoConfig.appName, function () {
                            y.getActedOutEdition().betsHistory.setTotalWin(a.mainFLGAccount.totalWin());
                            y.getActedOutEdition().betsHistory.redrawCurrentBets();
                            A.children[2].clear();
                            A.children[2].beginFill(0);
                            A.children[2].drawRect(3, 3, 1914, 22);
                            A.children[2].endFill;
                            var W = a.kenoConfig.winShowTime ? a.kenoConfig.winShowTime : 8E3;
                            Ha = setTimeout(va, W);
                            na.updateJackpotData(g);
                            na.drawJackpotWin(2E4, {
                                x: 602,
                                y: 527
                            }, a.mainRenderer.resourceLoader.resources.JP.texture, a.mainFLGAccount.totalWin(), a.mainRenderer.resourceLoader.resources.jp_only.texture);
                            x.video.button.pressed ? setTimeout(function () {
                                x.game.button.emit("mousedown");
                                a.mainFLGAccount.winToBalanceAnimation(W - 2E3, 2E3, {
                                    x: 602,
                                    y: 527
                                }, a.mainRenderer.resourceLoader.resources.WIN.texture, {
                                    font: "bold 70px Arial",
                                    fill: "#bcbcbc",
                                    withImages: !0
                                }, na.jpWin())
                            }, 2E3) : a.mainFLGAccount.winToBalanceAnimation(W, 2E3, {
                                    x: 602,
                                    y: 527
                                }, a.mainRenderer.resourceLoader.resources.WIN.texture,
                                {font: "bold 70px Arial", fill: "#bcbcbc", withImages: !0}, na.jpWin())
                        }, a.kenoConfig);
                        a.mainRenderer.renderManager.needUpdateRender = !0
                    });
                    (function () {
                        if ("bets_11" == a.kenoConfig.appName) {
                            var W = "Login: " + clientInfoGlobal.lgn + " || Club: " + clientInfoGlobal.hallid;
                            W += " || Jackpot: " + (1 == g.myjp ? "YES" : "NO") + " || GameInfo: " + JSON.stringify(g);
                            a.mainRenderer.logService.setStats(W, a.kenoConfig.appName)
                        }
                    })()
                }
            }

            if (a.mainGameManager) {
                y.events.emit("RESULT_TIME");
                A.children[2].clear();
                A.children[2].beginFill(12531501);
                A.children[2].drawRect(3, 3, 1914, 22);
                A.children[2].endFill;
                1 < y.editions.length && y.drawDetailEditionHistory(x.history.container, y.editions.length - 2);
                var C = a.mainRenderer.stage.getChildByName("roundText").children[0];
                C.text = "#" + m.tir;
                C = null;
                var n = m.time_wait - parseInt(m.tOrig, 10) - 1;
                0 > n ? (za && (n += 7), setTimeout(E, 1E3 * -n)) : E();
                a.mainUIManager.setInteraction(!1);
                ua ? (m = a.mainFLGAccount.totalBet(), a.mainFLGAccount.setWinTextVisible(!1), a.mainFLGAccount.totalBet(m, !0), ua = !1) : a.mainFLGAccount.setWinTextVisible(!1)
            }
        }

        function F(m) {
            0 >= m.t2 ? f(m) : p(m)
        }

        void 0 != a.mainGameManager && (d ? F(d) : a.mainGameManager.gameStateAsync(F))
    };
    this.drawGridHotCold = function (d) {
        if (ja.prevGmState || d) {
            var c = ja.prevGmState;
            d && (c = d, ja.prevGmState = d);
            var p = {
                font: "bold 45px Arial Narrow",
                fill: "#e0e0e0",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center"
            };
            d = 0;
            for (var f = 9; 6 > d; d++, f--) a.mainGrid.zones[parseInt(c.hot[d][0], 10) - 1].children[0].style = p, a.mainGrid.zones[parseInt(c.cold[f][0], 10) - 1].children[0].style = p;
            a.mainRenderer.renderManager.needUpdateRender =
                !0;
            if (ja.needShow) {
                p = {
                    font: "bold 45px Arial Narrow",
                    fill: "#41a0ff",
                    stroke: "#000000",
                    strokeThickness: 4,
                    align: "center"
                };
                var F = {
                    font: "bold 45px Arial Narrow",
                    fill: "#ff5050",
                    stroke: "#000000",
                    strokeThickness: 4,
                    align: "center"
                };
                d = 0;
                for (f = 9; 6 > d; d++, f--) a.mainGrid.zones[parseInt(c.hot[d][0], 10) - 1].children[0].style = F, a.mainGrid.zones[parseInt(c.cold[f][0], 10) - 1].children[0].style = p;
                a.mainRenderer.renderManager.needUpdateRender = !0
            }
        }
    };
    y.events.on("GRID_STATS", w.drawGridHotCold);
    y.events.on("BET_TIME", w.drawGridHotCold)
}

function hotcoldGraphsKeno(a, u, U, fa) {
    this.destroy = function () {
        P = V = null;
        u.onStartOpen = null;
        u.onStopOpen = null;
        for (var K in w) w[K] = null;
        w = null
    };
    var w = this, P = function () {
        for (var K = [], v = 0; 6 > v; v++) K.push([V.hot[v][0], V.hot[v][1]]);
        K.sort(function (R, I) {
            if (R[0] > I[0]) return 1;
            if (R[0] < I[0]) return -1
        });
        for (v = 0; v < K.length; v++) V.hot[v][0] = K[v][0], V.hot[v][1] = K[v][1];
        K = [];
        for (v = 9; 4 <= v; v--) K.push([V.cold[v][0], V.cold[v][1]]);
        K.sort(function (R, I) {
            if (R[0] > I[0]) return 1;
            if (R[0] < I[0]) return -1
        });
        v = 0;
        for (var X = 9; v < K.length; v++,
            X--) V.cold[X][0] = K[v][0], V.cold[X][1] = K[v][1];
        K = null
    }, V = a;
    P();
    this.update = function (K) {
        V = K;
        P();
        w.draw();
        w.drawGraphs()
    };
    this.draw = function () {
        U && U(V, u.container)
    };
    this.drawGraphs = function () {
        fa && fa(V, u.container)
    };
    u.onStartOpen = w.draw;
    u.onStopOpen = w.drawGraphs
}

function StatisticsManager(a, u) {
    this.destroy = function () {
        clearTimeout(X);
        P = V = K = w = fa = null;
        for (var R in U) U[R] = null;
        U = null
    };
    var U = this, fa = {}, w = function (R) {
        for (R = 0; R < a; R++) fa[R + ""] = Math.floor(4 * Math.random())
    }, P, V = function () {
        var R = 100 * (1 - P.curCount / P.totalCount);
        R = Math.round(R) / 100;
        for (var I = {}, aa, A = 0; A < a; A++) aa = Math.round(fa[A + ""] * R), P.prevStats && P.prevStats[A + ""] === aa || (I[A + ""] = aa);
        return P.prevStats = I
    }, K = function () {
        u(V());
        --P.curCount;
        0 > P.curCount || (X = setTimeout(K, v))
    }, v = 5E3, X = 0;
    this.update = function (R,
                            I, aa) {
        clearTimeout(X);
        w(parseInt(R, 1));
        aa < 2 * v ? u(fa, !0) : (P = {curCount: Math.floor(aa / v), totalCount: Math.floor(I / v)}, K())
    }
};
