var mainDemoLockManager = new demoLockManager;
APIManager = new APIManager;

function FLGRenderer(r, E, q, w, e) {
    this.destroy = function () {
        a(!1);
        h = a = null;
        v.logService.destroy();
        v.renderManager.reset();
        v.renderManager.destroy();
        I.destroy(!0);
        c = null;
        u.plugins.interaction.destroy();
        u.destroy();
        D = n = u = null;
        $("#hand-touch").css("display", "none");
        b = g = null;
        window.removeEventListener("resize", k);
        B.unbind("parentResized", k);
        document.removeEventListener("changeZIndex" + q, F);
        window.removeEventListener("blur", p);
        window.removeEventListener("focus", t);
        f = l = A = k = d = y = F = B = p = t = null;
        for (var m in PIXI.utils.BaseTextureCache) delete PIXI.utils.BaseTextureCache[m];
        for (m in PIXI.utils.TextureCache) delete PIXI.utils.TextureCache[m];
        G.reset();
        G = null;
        TWEEN.removeAll();
        for (var z in v) v[z] = null;
        v = null
    };
    var v = this, b = {width: r, height: E};
    this.canvasSize = b;
    var g = b.width / b.height, c = new PIXI.Container, I = new PIXI.Container;
    I.addChild(c);
    this.stage = c;
    var G = new PIXI.loaders.Loader;
    this.resourceLoader = G;
    var u;
    r = -1;
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        var x = navigator.userAgent.toLowerCase();
        E = x.match(/cpu iphone os (.*?) like mac os/);
        x = x.match(/cpu os (.*?) like mac os/);
        (E = E || x) && 1 < E.length && (r = parseInt(E[1].replace(/_/g, ".")))
    }
    this.PIXIrenderer = u = isMobile.android.phone || isMobile.android.tablet || isMobile.android.device || 15 <= r ? new PIXI.CanvasRenderer(b.width, b.height) : new PIXI.WebGLRenderer(b.width, b.height);
    this.logService = new FLGLog(20, q);
    this.renderManager = new renderManager;
    var h = 0, B, y = function (m) {
        var z = 0, C = 0;
        switch (w) {
            case "center":
                C = z = 50;
                break;
            case "top":
                z = 0;
                C = 50;
                break;
            case "bottom":
                z = 100;
                C = 50;
                break;
            case "top-left":
                C = z = 0;
                break;
            case "top-right":
                z = 0;
                C = 100;
                break;
            case "bottom-left":
                z = 100;
                C = 0;
                break;
            case "bottom-right":
                C = z = 100
        }
        B = m;
        B.append(u.view);
        u.view.style.position = "absolute";
        u.view.style.left = C + "%";
        u.view.style.top = z + "%";
        u.view.style.transform = "translate(-" + C + "%, -" + z + "%)";
        u.view.style.msTransform = "translate(-" + C + "%, -" + z + "%)";
        u.view.style.webkitTransform = "translate(-" + C + "%, -" + z + "%)";
        u.view.style.mozTransform = "translate(-" + C + "%, -" + z + "%)";
        u.view.style.oTransform = "translate(-" + C + "%, -" + z + "%)";
        u.view.style.zIndex = B.css("z-index")
    };
    y($("#" + q));
    var F = function (m) {
        u.view.style.zIndex =
            $("#" + m.detail).css("z-index")
    };
    document.addEventListener("changeZIndex" + q, F);
    var a = function (m, z) {
        function C() {
            a && c.visible && (void 0 !== z ? h = setTimeout(C, z) : requestAnimationFrame ? h = requestAnimationFrame(C) : msRequestAnimationFrame ? h = msRequestAnimationFrame(C) : webkitRequestAnimationFrame ? h = webkitRequestAnimationFrame(C) : mozRequestAnimationFrame ? h = window.mozRequestAnimationFrame(C) : oRequestAnimationFrame && (h = oRequestAnimationFrame(C)), v.renderManager.animationClipPlaying || v.renderManager.needUpdateRender ||
            v.renderManager.animationTweenPlaying()) && (TWEEN.update(), u.render(I), v.renderManager.needUpdateRender = !1)
        }

        m ? C() : (void 0 !== z ? clearTimeout(h) : requestAnimationFrame ? cancelAnimationFrame(h) : msRequestAnimationFrame ? msCancelAnimationFrame(h) : webkitRequestAnimationFrame ? webkitCancelAnimationFrame(h) : mozRequestAnimationFrame ? mozCancelAnimationFrame(h) : oRequestAnimationFrame && oCancelAnimationFrame(h), h = 0)
    };
    this.StartStopAnimation = a;
    var d = function () {
    };
    this.resizeApp = d;
    var k = function () {
        d();
        "fixed" == B.css("position") ?
            isMobile.any && v.gameIsStarted && window.innerHeight + 5 < parseInt(u.view.style.height) ? ($("#hand-touch").css("display", "block"), setTimeout(function () {
                $("#hand-touch").css("display", "none")
            }, 2E3)) : $("#hand-touch").css("display", "none") : $(window).height() != window.innerHeight ? ($(window).height(), topOffset = 0, v.gameIsStarted && !localStorage.isTerminal && isMobile.any && !(isMobile.android.phone || isMobile.android.tablet || isMobile.android.device) && $(window).width() > $(window).height() && ($("#hand-touch").css("display",
                "block"), setTimeout(function () {
                $("#hand-touch").css("display", "none")
            }, 2E3))) : (B.css({"padding-bottom": ""}), v.gameIsStarted && $("#hand-touch").css("display", "none"));
        window.scrollTo(0, 0);
        if (B.width() / B.height() >= g) {
            var m = B.height() * g;
            var z = B.height()
        } else m = B.width(), z = B.width() / g;
        mobileMode || APIManager.isAPIUser() || (m *= .85, z *= .85);
        u.view.style.width = m + "px";
        u.view.style.height = z + "px"
    };
    window.addEventListener("resize", k, !1);
    B.bind("parentResized", k);
    var t = function () {
        a(!1);
        a(!0, e)
    }, p = function () {
        a(!1);
        a(!0, 1E3)
    };
    window.addEventListener("blur", p, !1);
    window.addEventListener("focus", t, !1);
    k();
    var n = null, D = null;
    this.gameIsStarted = !1;
    var A = function (m, z, C, M, J, K, S) {
        if (void 0 != m) {
            (document.getElementById("loader") || document.createElement("div")).classList.remove("loader-loading");
            if (z) {
                var N, U = [], P = new PIXI.loaders.Loader;
                c.renderable = !1;
                D = new PIXI.Graphics;
                D.beginFill(0);
                D.drawRect(0, 0, b.width, b.height);
                D.endFill;
                D.interactive = !0;
                I.addChild(D);
                var ea = function () {
                    for (var X in P.resources[z].textures) U.push(P.resources[z].textures[X]);
                    N = new PIXI.extras.MovieClip(U);
                    N.anchor.set(.5, .5);
                    N.position.set(b.width / 2, b.height / 2);
                    X = b.width / 1920;
                    N.scale.set(1.7 * X, 1.7 * X);
                    N.animationSpeed = .2;
                    N.play();
                    v.renderManager.animationClipPlaying = !0;
                    I.addChild(N)
                };
                "vip1001.de" !== location.host ? P.add(z).load(ea) : (m = new PIXI.loaders.Loader, m.add("image", "images/spinner-1s-200px.png").load(), m = l(m.resources.image.texture), I.addChild(m));
                n = new PIXI.Graphics;
                n.position.set(b.width / 4, b.height / 4 * 3);
                n.beginFill(14922837);
                n.drawRoundedRect(0, 0, b.width / 2, 10, 5);
                n.endFill;
                n.scale.x = 0;
                var L = new PIXI.Graphics;
                L.position.set(b.width / 4, b.height / 4 * 3);
                L.beginFill(14922837);
                L.drawRoundedRect(0, 0, b.width / 2, 10, 5);
                L.endFill;
                L.alpha = .3;
                I.addChild(n);
                I.addChild(L);
                a(!0, e)
            }
            for (m = 0; m < C.length; m++) G.add(C[m][0], C[m][1]);
            G.on("progress", function (X, ja) {
                void 0 != K ? K(X, ja) : n.scale.x = X.progress / 100
            }).once("complete", function (X, ja) {
                void 0 != S ? S(X, ja) : n.scale.x = 1
            }).load(function (X, ja) {
                M(X, ja, function () {
                    c.renderable = !0;
                    P && (I.removeChild(N), U = N = null, P.reset(), ea = P = null, v.renderManager.animationClipPlaying =
                        !1);
                    I.removeChild(n);
                    I.removeChild(L);
                    I.removeChild(D);
                    v.gameIsStarted = !0;
                    k();
                    J();
                    UTILS.completeLoading()
                })
            })
        }
    };
    this.loadResources = A;
    r = new PIXI.Graphics;
    r.beginFill(16777215, 0);
    r.drawRect(0, 0, 1, 1);
    r.endFill();
    var f = r.generateTexture(!1);
    r.destroy();
    r = null;
    var l = function (m, z, C, M, J, K, S, N, U, P) {
        var ea = M;
        void 0 != M ? /%J/g.test(M) ? (ea = M.split("%J"), M = G.resources[ea[0]].textures[ea[1]], ea = ea[1]) : M = G.resources[M].texture : M = f;
        var L = new PIXI.Sprite(M);
        L.position.x = z;
        L.position.y = C;
        L.interactive = void 0 != K || void 0 !=
            S || void 0 != N || void 0 != U || void 0 != P;
        L.buttonMode = L.interactive;
        L.name = ea;
        if (void 0 != J) {
            z = new PIXI.Text(J.text, J.style);
            C = J.style.strokeThickness ? J.style.strokeThickness / 2 : 0;
            z.position.y = L.height / 2;
            z.position.x = L.width / 2 + C;
            switch (J.align) {
                case "center":
                    z.anchor.x = .5;
                    z.anchor.y = .5;
                    break;
                case "right":
                    z.anchor.x = 1;
                    z.anchor.y = .5;
                    break;
                case "half-right":
                    z.anchor.x = .75;
                    z.anchor.y = .5;
                    break;
                case "half-left":
                    z.anchor.x = .25;
                    z.anchor.y = .5;
                    break;
                case "half-bottom":
                    z.anchor.x = .5;
                    z.anchor.y = 0;
                    break;
                case "half-top":
                    z.anchor.x =
                        .5;
                    z.anchor.y = 1;
                    break;
                case "top-left":
                    break;
                default:
                    z.anchor.y = .5
            }
            z.name = "text" + L.name;
            L.addChild(z);
            z = null
        }
        if (void 0 != K) L.on("mousedown", function (X) {
            K(L, X)
        }).on("touchstart", function (X) {
            K(L, X)
        });
        void 0 != S ? (L.moveable = !0, L.on("mousemove", function (X) {
            S(L, X)
        }).on("touchmove", function (X) {
            S(L, X)
        })) : L.moveable = !1;
        if (void 0 != N) L.on("mouseup", function () {
            setTimeout(function () {
                N(L)
            }, 20)
        }).on("touchend", function () {
            setTimeout(function () {
                N(L)
            }, 20)
        }).on("mouseupoutside", function () {
            setTimeout(function () {
                    N(L)
                },
                20)
        }).on("touchendoutside", function () {
            setTimeout(function () {
                N(L)
            }, 20)
        });
        if (void 0 != U) L.on("mouseover", function (X) {
            U(L, X)
        });
        if (void 0 != P) L.on("mouseout", function (X) {
            P(L, X)
        });
        void 0 != m ? m.addChild(L) : c.addChild(L);
        M = null;
        return L
    };
    this.createButton = l;
    FLGUtils && FLGUtils.showStartBtn && FLGUtils.showStartBtn()
}

function Grid(r, E, q, w, e, v, b) {
    this.destroy = function () {
        u = G = c = null;
        for (var x in g) g[x] = null;
        g = null
    };
    var g = this;
    this.zones = [];
    this.maxPreessedZones = e;
    this.pressedZones = [];
    this.selectedZones = [];
    var c = new PIXI.Container;
    this.gridContainer = c;
    var I = 1, G = function (x, h, B, y, F, a, d) {
        g.gridContainer.position.x = r;
        g.gridContainer.position.y = E;
        g.gridContainer.width = x * q;
        g.gridContainer.height = h * w;
        void 0 != v ? v.addChild(g.gridContainer) : b.stage.addChild(g.gridContainer);
        for (var k = 0, t = 0, p = 1; p <= w; p++) {
            for (var n = 1; n <= q; n++) {
                var D =
                    u(x, h, t, k, g.zones.length + 1, y, F, a);
                g.zones.push(D);
                d && (D.anchor.set(.5, .5), D.children[0].position.set(4, 2), D.position.set(t + x / 2, k + h / 2));
                t += x + B.x;
                g.gridContainer.addChild(D)
            }
            t = 0;
            k += h + B.y
        }
    };
    this.createZones = G;
    var u = function (x, h, B, y, F, a, d, k) {
        var t = new PIXI.Sprite(b.resourceLoader.resources.zone_transp.texture);
        t.width = x;
        t.height = h;
        t.position.x = B;
        t.position.y = y;
        t.name = F;
        x = new PIXI.Text(F, a);
        x.position.y = t.height / 2;
        x.position.x = t.width / 2;
        switch (a.align) {
            case "top-left":
                x.anchor.x = .75;
                x.anchor.y = .65;
                break;
            case "center":
                x.anchor.x = .5;
                x.anchor.y = .5;
                break;
            default:
                x.anchor.x = 1, x.anchor.y = .5
        }
        x.name = "text" + t.name;
        t.addChild(x);
        x = null;
        if (void 0 != d || void 0 != k) t.interactive = !0, t.buttonMode = !0, t.on("mousedown", function () {
            d(t)
        }).on("touchstart", function () {
            d(t, void 0, !0)
        }).on("mouseup", function () {
            k(t)
        }).on("touchend", function () {
            k(t)
        }).on("mouseupoutside", function () {
            k(t)
        }).on("touchendoutside", function () {
            k(t)
        }).on("mouseover", function () {
            d(t, !0)
        }).on("mouseout", function () {
            k(t, !0)
        }).on("touchmove", function () {
            d(t,
                void 0, !0)
        });
        return t
    };
    this.getIntArrayOfPressedZones = function () {
        for (var x = [], h = 0; h < g.pressedZones.length; h++) x.push(parseInt(g.pressedZones[h].name));
        return x
    };
    this.getIntArrayOfSelectedZones = function () {
        for (var x = [], h = 0; h < g.selectedZones.length; h++) x.push(parseInt(g.selectedZones[h].name));
        return x
    };
    this.getIntArrayOfZones = function () {
        for (var x = [], h = 0; h < g.zones.length; h++) x.push(parseInt(g.zones[h].name));
        return x
    };
    this.removeCurrentBets = function () {
        for (var x = g.pressedZones.slice(), h = 0; h < x.length; h++) x[h].emit("mousedown"),
            x[h].emit("mouseup");
        b.renderManager.needUpdateRender = !0
    };
    this.removeFuckingHoverTexture = function () {
        for (var x = 0; x < g.zones.length; x++) if (g.zones[x].texture === b.resourceLoader.resources.zone_selected.texture) if (g.zones[x].isLock) switch (g.zones[x].isLock) {
            case 1:
                g.zones[x].texture = b.resourceLoader.resources.zone_lock.texture;
                break;
            default:
                g.zones[x].texture = b.resourceLoader.resources.zone_lock2.texture
        } else g.zones[x].texture = b.resourceLoader.resources.zone_transp.texture;
        b.renderManager.needUpdateRender =
            !0
    };
    this.removeSelectedBets = function () {
        for (var x = 0; x < g.zones.length; x++) g.zones[x].removeChild(g.zones[x].getChildByName("smallchip" + g.zones[x].name)), g.zones[x].texture = b.resourceLoader.resources.zone_transp.texture, delete g.zones[x].isLock;
        g.selectedZones = [];
        b.renderManager.needUpdateRender = !0
    };
    this.incrementRandomCount = function (x) {
        I = x;
        I = 10 > I ? I + 1 : 1;
        b.renderManager.needUpdateRender = !0;
        return I
    };
    this.setRandomBetsCount = function (x) {
        I = x;
        b.renderManager.needUpdateRender = !0
    };
    this.createRandomBets = function () {
        for (var x =
            g.zones.slice(), h, B = 0; B < I; B++) h = x[Math.floor(Math.random() * x.length)], g.zones[g.zones.indexOf(h)].emit("mousedown"), g.zones[g.zones.indexOf(h)].emit("mouseup"), x.splice(x.indexOf(h), 1);
        b.renderManager.needUpdateRender = !0
    };
    this.selectZones = function (x) {
        if (void 0 != x) for (var h = g.pressedZones.slice(), B = 0; B < h.length; B++) x(h[B]), g.selectedZones.push(h[B]);
        b.renderManager.needUpdateRender = !0
    };
    this.setZoneInteraction = function (x) {
        for (var h = 0; h < g.zones.length; h++) g.zones[h].interactive = x;
        b.renderManager.needUpdateRender =
            !0
    };
    this.highlightZones = function (x, h, B, y, F) {
        function a() {
            d(k);
            k++;
            k < t.length && (void 0 != F && -1 != y.indexOf(parseInt(t[k - 1].name)) ? 0 != F ? setTimeout(function () {
                a()
            }, F) : a() : a())
        }

        function d(p) {
            -1 != y.indexOf(parseInt(t[p].name)) && (void 0 != x && (t[p].texture = x), void 0 != h && (t[p].getChildByName("text" + t[p].name).style = h), void 0 != B && (void 0 != B.childName && void 0 != B.childTexture ? void 0 != t[p].getChildByName(B.childName + t[p].name) && (t[p].getChildByName(B.childName + t[p].name).texture = B.childTexture) : B.addZoneChild(t[p])))
        }

        var k = 0, t = g.zones;
        a();
        b.renderManager.needUpdateRender = !0
    }
}

function LottoGrid(r, E, q, w, e, v, b) {
    this.destroy = function () {
        x = u = I = null;
        for (var h in g) g[h] = null;
        g = null
    };
    var g = this, c = Math.ceil(w / q);
    this.zones = [];
    this.maxPreessedZones = e;
    this.pressedZones = [];
    this.selectedZones = [];
    var I = new PIXI.Container;
    this.gridContainer = I;
    var G = 1, u = function (h, B, y, F, a, d, k) {
        g.gridContainer.position.x = r;
        g.gridContainer.position.y = E;
        g.gridContainer.width = h * q;
        g.gridContainer.height = B * c;
        void 0 != v ? v.addChild(g.gridContainer) : b.stage.addChild(g.gridContainer);
        for (var t = 0, p = 0, n = 1; n <= c; n++) {
            for (var D =
                1; D <= q; D++) if (g.zones.length + 1 <= w) {
                var A = x(h, B, p, t, g.zones.length + 1, F, a, d);
                g.zones.push(A);
                k && (A.anchor.set(.5, .5), A.children[0].position.set(4, 2), A.position.set(p + h / 2, t + B / 2));
                p += h + y.x;
                g.gridContainer.addChild(A)
            }
            p = 0;
            t += B + y.y
        }
    };
    this.createZones = u;
    var x = function (h, B, y, F, a, d, k, t) {
        var p = new PIXI.Sprite(b.resourceLoader.resources.zone_transp.texture);
        p.position.x = y;
        p.position.y = F;
        p.name = a;
        h = new PIXI.Text(a, d);
        h.position.y = p.height / 2;
        h.position.x = p.width / 2;
        switch (d.align) {
            case "top-left":
                h.anchor.x = .75;
                h.anchor.y = .65;
                break;
            case "center":
                h.anchor.x = .5;
                h.anchor.y = .5;
                break;
            default:
                h.anchor.x = 1, h.anchor.y = .5
        }
        h.name = "text" + p.name;
        p.addChild(h);
        h = null;
        if (void 0 != k || void 0 != t) p.interactive = !0, p.buttonMode = !0, p.on("mousedown", function () {
            k(p)
        }).on("touchstart", function () {
            k(p, void 0, !0)
        }).on("mouseup", function () {
            t(p)
        }).on("touchend", function () {
            t(p)
        }).on("mouseupoutside", function () {
            t(p)
        }).on("touchendoutside", function () {
            t(p)
        }).on("mouseover", function () {
            k(p, !0)
        }).on("mouseout", function () {
            t(p, !0)
        }).on("touchmove",
            function () {
                k(p, void 0, !0)
            });
        return p
    };
    this.getIntArrayOfPressedZones = function () {
        for (var h = [], B = 0; B < g.pressedZones.length; B++) h.push(parseInt(g.pressedZones[B].name));
        return h
    };
    this.getIntArrayOfSelectedZones = function () {
        for (var h = [], B = 0; B < g.selectedZones.length; B++) h.push(parseInt(g.selectedZones[B].name));
        return h
    };
    this.getIntArrayOfZones = function () {
        for (var h = [], B = 0; B < g.zones.length; B++) h.push(parseInt(g.zones[B].name));
        return h
    };
    this.removeCurrentBets = function () {
        for (var h = g.pressedZones.slice(),
                 B = 0; B < h.length; B++) h[B].emit("mousedown"), h[B].emit("mouseup");
        b.renderManager.needUpdateRender = !0
    };
    this.removeFuckingHoverTexture = function () {
        for (var h = 0; h < g.zones.length; h++) if (g.zones[h].texture === b.resourceLoader.resources.zone_selected.texture) if (g.zones[h].isLock) switch (g.zones[h].isLock) {
            case 1:
                g.zones[h].texture = b.resourceLoader.resources.zone_lock.texture;
                break;
            default:
                g.zones[h].texture = b.resourceLoader.resources.zone_lock2.texture
        } else g.zones[h].texture = b.resourceLoader.resources.zone_transp.texture;
        b.renderManager.needUpdateRender = !0
    };
    this.removeSelectedBets = function () {
        for (var h = 0; h < g.zones.length; h++) g.zones[h].removeChild(g.zones[h].getChildByName("smallchip" + g.zones[h].name)), g.zones[h].texture = b.resourceLoader.resources.zone_transp.texture, delete g.zones[h].isLock;
        g.selectedZones = [];
        b.renderManager.needUpdateRender = !0
    };
    this.incrementRandomCount = function (h) {
        G = h;
        G = 10 > G ? G + 1 : 1;
        b.renderManager.needUpdateRender = !0;
        return G
    };
    this.setRandomBetsCount = function (h) {
        G = h;
        b.renderManager.needUpdateRender =
            !0
    };
    this.createRandomBets = function () {
        for (var h = g.zones.slice(), B, y = 0; y < G; y++) B = h[Math.floor(Math.random() * h.length)], g.zones[g.zones.indexOf(B)].emit("mousedown"), g.zones[g.zones.indexOf(B)].emit("mouseup"), h.splice(h.indexOf(B), 1);
        b.renderManager.needUpdateRender = !0
    };
    this.selectZones = function (h) {
        if (void 0 != h) for (var B = g.pressedZones.slice(), y = 0; y < B.length; y++) h(B[y]), g.selectedZones.push(B[y]);
        b.renderManager.needUpdateRender = !0
    };
    this.setZoneInteraction = function (h) {
        for (var B = 0; B < g.zones.length; B++) g.zones[B].interactive =
            h;
        b.renderManager.needUpdateRender = !0
    };
    this.highlightZones = function (h, B, y, F, a) {
        function d() {
            k(t);
            t++;
            t < p.length && (void 0 != a && -1 != F.indexOf(parseInt(p[t - 1].name)) ? 0 != a ? setTimeout(function () {
                d()
            }, a) : d() : d())
        }

        function k(n) {
            -1 != F.indexOf(parseInt(p[n].name)) && (void 0 != h && (p[n].texture = h), void 0 != B && (p[n].getChildByName("text" + p[n].name).style = B), void 0 != y && (void 0 != y.childName && void 0 != y.childTexture ? void 0 != p[n].getChildByName(y.childName + p[n].name) && (p[n].getChildByName(y.childName + p[n].name).texture =
                y.childTexture) : y.addZoneChild(p[n])))
        }

        var t = 0, p = g.zones;
        d();
        b.renderManager.needUpdateRender = !0
    }
}

var fortunaCombinations = {
    comb: [[0, 3], [3, 6], [6, 9], [9, 12], [12, 15], [15, 18], [18, 21], [21, 24], [24, 27], [27, 30], [30, 33], [33, 36], [0, 2], [2, 5], [5, 8], [8, 11], [11, 14], [14, 17], [17, 20], [20, 23], [23, 26], [26, 29], [29, 32], [32, 35], [0, 1], [1, 4], [4, 7], [7, 10], [10, 13], [13, 16], [16, 19], [19, 22], [22, 25], [25, 28], [28, 31], [31, 34], [0, 2, 3], [0, 1, 2], [0, 1, 2, 3], [2, 3, 5, 6], [1, 2, 4, 5], [1, 2, 3, 4, 5, 6], [5, 6, 8, 9], [4, 5, 7, 8], [4, 5, 6, 7, 8, 9], [8, 9, 11, 12], [7, 8, 10, 11], [7, 8, 9, 10, 11, 12], [11, 12, 14, 15], [10, 11, 13, 14], [10, 11, 12, 13, 14, 15], [14, 15, 17, 18], [13, 14,
        16, 17], [13, 14, 15, 16, 17, 18], [17, 18, 20, 21], [16, 17, 19, 20], [16, 17, 18, 19, 20, 21], [20, 21, 23, 24], [19, 20, 22, 23], [19, 20, 21, 22, 23, 24], [23, 24, 26, 27], [22, 23, 25, 26], [22, 23, 24, 25, 26, 27], [26, 27, 29, 30], [25, 26, 28, 29], [25, 26, 27, 28, 29, 30], [29, 30, 32, 33], [28, 29, 31, 32], [28, 29, 30, 31, 32, 33], [32, 33, 35, 36], [31, 32, 34, 35], [31, 32, 33, 34, 35, 36], [2, 3], [5, 6], [8, 9], [11, 12], [14, 15], [17, 18], [20, 21], [23, 24], [26, 27], [29, 30], [32, 33], [35, 36], [1, 2], [4, 5], [7, 8], [10, 11], [13, 14], [16, 17], [19, 20], [22, 23], [25, 26], [28, 29], [31, 32], [34, 35], [1, 2, 3],
        [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15], [16, 17, 18], [19, 20, 21], [22, 23, 24], [25, 26, 27], [28, 29, 30], [31, 32, 33], [34, 35, 36]],
    btnComb: {
        37: {zones: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34], caption: "2-1"},
        38: {zones: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35], caption: "2-1"},
        39: {zones: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36], caption: "2-1"},
        40: {zones: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], caption: "1-12"},
        41: {zones: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], caption: "13-24"},
        42: {zones: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], caption: "25-36"},
        43: {
            zones: [1,
                2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], caption: "1-18"
        },
        44: {zones: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], caption: "19-36"},
        45: {zones: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36], caption: "EVEN"},
        46: {zones: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35], caption: "ODD"},
        47: {zones: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36], caption: "RED"},
        48: {zones: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35], caption: "BLACK"}
    }
}, sectorFortunaCombinations = {
    comb: [[3, 26, 0, 32, 15],
        [16, 33, 1, 20, 14], [4, 21, 2, 25, 17], [12, 35, 3, 26, 0], [15, 19, 4, 21, 2], [23, 10, 5, 24, 16], [17, 34, 6, 27, 13], [18, 29, 7, 28, 12], [11, 30, 8, 23, 10], [14, 31, 9, 22, 18], [8, 23, 10, 5, 24], [13, 36, 11, 30, 8], [7, 28, 12, 35, 3], [6, 27, 13, 36, 11], [1, 20, 14, 31, 9], [0, 32, 15, 19, 4], [5, 24, 16, 33, 1], [2, 25, 17, 34, 6], [9, 22, 18, 29, 7], [32, 15, 19, 4, 21], [33, 1, 20, 14, 31], [19, 4, 21, 2, 25], [31, 9, 22, 18, 29], [30, 8, 23, 10, 5], [10, 5, 24, 16, 33], [21, 2, 25, 17, 34], [35, 3, 26, 0, 32], [34, 6, 27, 13, 36], [29, 7, 28, 12, 35], [22, 18, 29, 7, 28], [36, 11, 30, 8, 23], [20, 14, 31, 9, 22], [26, 0, 32, 15, 19], [24,
            16, 33, 1, 20], [25, 17, 34, 6, 27], [28, 12, 35, 3, 26], [27, 13, 36, 11, 30]], btnComb: {
        49: {
            zones: [109, 111, 114, 129, 179, 187],
            caption: "",
            sectorZones: [250, 251, 276, 277, 278, 279, 280, 281, 263, 264, 265, 266],
            zonesToHighlight: [33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27]
        },
        50: {
            zones: [1, 102, 117, 118, 135],
            caption: "",
            sectorZones: [252, 253, 254, 255, 256, 267, 268, 269],
            zonesToHighlight: [1, 20, 14, 31, 9, 6, 34, 17]
        },
        51: {
            zones: [104, 106, 121, 123, 126, 131, 133, 136],
            caption: "",
            sectorZones: [257, 258, 259, 260, 261, 262, 270, 271, 272, 273, 274, 275, 282, 283, 284, 285, 286],
            zonesToHighlight: [25,
                2, 21, 4, 19, 3, 26, 0, 32, 15, 35, 12, 28, 7, 29, 18, 22]
        },
        52: {
            zones: [26, 100, 104, 123],
            caption: "",
            sectorZones: [262, 275, 282, 283, 284, 285, 286],
            zonesToHighlight: [3, 26, 0, 32, 15, 35, 12]
        }
    }
};

function getBetNameByCombinationCode(r) {
    if (-1 < parseInt(r) && 37 > parseInt(r)) return r;
    if (36 < parseInt(r) && 43 > parseInt(r)) return fortunaCombinations.btnComb[r].zones.join(", ");
    if (42 < parseInt(r) && 49 > parseInt(r)) return fortunaCombinations.btnComb[r].caption;
    if (99 < parseInt(r) && 208 > parseInt(r)) return fortunaCombinations.comb[parseInt(r) - 100].join(", ")
}

function PokerGrid(r, E, q, w) {
    this.destroy = function () {
        A = D = n = p = t = d = a = h = x = u = G = g = I = b = c = v = null;
        for (var f in e) e[f] = null;
        e = null
    };
    var e = this;
    this.zones = [];
    this.pressedZones = {};
    this.selectedZones = {};
    var v = new PIXI.Container;
    this.blueGridContainerCombinations = v;
    var b = new PIXI.Container;
    this.redGridContainerCombinations = b;
    var g = new PIXI.Container;
    this.greenGridContainerCombinations = g;
    var c = new PIXI.Container;
    this.blueGridContainerSuites = c;
    var I = new PIXI.Container;
    this.redGridContainerSuites = I;
    var G = new PIXI.Container;
    this.greenGridContainerSuites = G;
    var u = new PIXI.Container;
    this.blueGridContainerTable = u;
    var x = new PIXI.Container;
    this.greenGridContainerTable = x;
    var h = new PIXI.Container;
    this.redGridContainerTable = h;
    var B = e.blueGridContainerTable, y = e.blueGridContainerCombinations, F = e.blueGridContainerSuites;
    this.activeTable = function (f) {
        if (!arguments.length) return B;
        B = e[f]
    };
    this.activeCombinationsGrid = function (f) {
        if (!arguments.length) return y;
        y = e[f]
    };
    this.activeSuitesGrid = function (f) {
        if (!arguments.length) return F;
        F =
            e[f]
    };
    this.cardNumbers = [{value: "A", suite: "cards_pi", color: "#000000"}, {
        value: "A",
        suite: "cards_ch",
        color: "#ff0000"
    }, {value: "A", suite: "cards_bu", color: "#ff0000"}, {
        value: "A",
        suite: "cards_tr",
        color: "#000000"
    }, {value: "K", suite: "cards_pi", color: "#000000"}, {
        value: "K",
        suite: "cards_ch",
        color: "#ff0000"
    }, {value: "K", suite: "cards_bu", color: "#ff0000"}, {
        value: "K",
        suite: "cards_tr",
        color: "#000000"
    }, {value: "Q", suite: "cards_pi", color: "#000000"}, {value: "Q", suite: "cards_ch", color: "#ff0000"}, {
        value: "Q", suite: "cards_bu",
        color: "#ff0000"
    }, {value: "Q", suite: "cards_tr", color: "#000000"}, {
        value: "J",
        suite: "cards_pi",
        color: "#000000"
    }, {value: "J", suite: "cards_ch", color: "#ff0000"}, {
        value: "J",
        suite: "cards_bu",
        color: "#ff0000"
    }, {value: "J", suite: "cards_tr", color: "#000000"}, {
        value: "10",
        suite: "cards_pi",
        color: "#000000"
    }, {value: "10", suite: "cards_ch", color: "#ff0000"}, {
        value: "10",
        suite: "cards_bu",
        color: "#ff0000"
    }, {value: "10", suite: "cards_tr", color: "#000000"}, {
        value: "9",
        suite: "cards_pi",
        color: "#000000"
    }, {value: "9", suite: "cards_ch", color: "#ff0000"},
        {value: "9", suite: "cards_bu", color: "#ff0000"}, {
            value: "9",
            suite: "cards_tr",
            color: "#000000"
        }, {value: "8", suite: "cards_pi", color: "#000000"}, {
            value: "8",
            suite: "cards_ch",
            color: "#ff0000"
        }, {value: "8", suite: "cards_bu", color: "#ff0000"}, {
            value: "8",
            suite: "cards_tr",
            color: "#000000"
        }, {value: "7", suite: "cards_pi", color: "#000000"}, {
            value: "7",
            suite: "cards_ch",
            color: "#ff0000"
        }, {value: "7", suite: "cards_bu", color: "#ff0000"}, {
            value: "7",
            suite: "cards_tr",
            color: "#000000"
        }, {value: "6", suite: "cards_pi", color: "#000000"}, {
            value: "6",
            suite: "cards_ch", color: "#ff0000"
        }, {value: "6", suite: "cards_bu", color: "#ff0000"}, {
            value: "6",
            suite: "cards_tr",
            color: "#000000"
        }, {value: "5", suite: "cards_pi", color: "#000000"}, {
            value: "5",
            suite: "cards_ch",
            color: "#ff0000"
        }, {value: "5", suite: "cards_bu", color: "#ff0000"}, {
            value: "5",
            suite: "cards_tr",
            color: "#000000"
        }, {value: "4", suite: "cards_pi", color: "#000000"}, {
            value: "4",
            suite: "cards_ch",
            color: "#ff0000"
        }, {value: "4", suite: "cards_bu", color: "#ff0000"}, {value: "4", suite: "cards_tr", color: "#000000"}, {
            value: "3", suite: "cards_pi",
            color: "#000000"
        }, {value: "3", suite: "cards_ch", color: "#ff0000"}, {
            value: "3",
            suite: "cards_bu",
            color: "#ff0000"
        }, {value: "3", suite: "cards_tr", color: "#000000"}, {
            value: "2",
            suite: "cards_pi",
            color: "#000000"
        }, {value: "2", suite: "cards_ch", color: "#ff0000"}, {
            value: "2",
            suite: "cards_bu",
            color: "#ff0000"
        }, {value: "2", suite: "cards_tr", color: "#000000"}, {}, {}, {}, {
            value: "",
            suite: "cards_shirt_",
            color: "#000"
        }];
    var a = function (f, l, m, z, C, M, J, K, S, N, U, P, ea) {
        D(f, l, m, z, C, M, J + "GridContainerCombinations", K, r, N, U, P, ea);
        S(e[J + "GridContainerCombinations"])
    };
    this.createZonesCombinations = a;
    var d = function (f, l, m, z, C, M, J, K, S, N, U, P, ea) {
        D(f, l, m, z, C, M, J + "GridContainerSuites", K, E, N, U, P, ea);
        S(e[J + "GridContainerSuites"])
    };
    this.createZonesSuites = d;
    var k = function (f, l, m, z) {
        -1 != f.name.indexOf("cards_frame") ? (f.children[0].interactive = z ? !1 : l, f.children[0].buttonMode = z ? !1 : l, f.children[0].visible = l, m ? (f.parent.getChildByName((parseInt(f.name.substr(-1)) - 1).toString() + "_0").alpha = 0 < f.parent.getChildByName(f.name.substr(-1) + f.parent.name).coef ? 1 : .4, f.parent.getChildByName((parseInt(f.name.substr(-1)) -
            1).toString() + "_1").alpha = 0 < f.parent.getChildByName(f.name.substr(-1) + f.parent.name).coef ? 1 : .4) : (f.parent.getChildByName((parseInt(f.name.substr(-1)) - 1).toString() + "_0").alpha = l ? 1 : .4, f.parent.getChildByName((parseInt(f.name.substr(-1)) - 1).toString() + "_1").alpha = l ? 1 : .4)) : (f.alpha = m ? 0 < f.coef ? 1 : .4 : l ? 1 : .4, f.interactive = z ? !1 : l, f.buttonMode = z ? !1 : l, f.getChildByName("frameSprite") && (f.getChildByName("frameSprite").visible = l))
    }, t = function (f, l, m, z, C) {
        for (var M = 0; M < e[m + "GridContainerCombinations"].children.length; M++) e[m +
        "GridContainerCombinations"].children[e[m + "GridContainerCombinations"].children.length - 1 - M].getChildByName("zoneBg").getChildByName("zoneCoef").text = 0 < f[M] ? z ? "WON" : (f[M] / 100).toFixed(2) : z ? "LOST" : " ", e[m + "GridContainerCombinations"].children[e[m + "GridContainerCombinations"].children.length - 1 - M].coef = (f[M] / 100).toFixed(2), k(e[m + "GridContainerCombinations"].children[e[m + "GridContainerCombinations"].children.length - 1 - M], z ? !1 : 0 < f[M], z, 100 == f[M]);
        for (M = e[m + "GridContainerCombinations"].children.length; M <
        e[m + "GridContainerCombinations"].children.length + e[m + "GridContainerSuites"].children.length; M++) e[m + "GridContainerSuites"].children[M - e[m + "GridContainerCombinations"].children.length].getChildByName("zoneBg").getChildByName("zoneCoef").text = 0 < f[M] ? z ? "WON" : (f[M] / 100).toFixed(2) : z ? "LOST" : " ", e[m + "GridContainerSuites"].children[M - e[m + "GridContainerCombinations"].children.length].coef = (f[M] / 100).toFixed(2), k(e[m + "GridContainerSuites"].children[M - e[m + "GridContainerCombinations"].children.length], z ? !1 :
            0 < f[M], z, 100 == f[M]);
        f = 0;
        for (M = 0; M < e[m + "GridContainerTable"].children.length; M++) if (e[m + "GridContainerTable"].children[M].getChildByName("zoneBg")) {
            e[m + "GridContainerTable"].children[M].getChildByName("zoneBg").getChildByName("zoneCoef").text = 0 < l[f].k ? z ? "WON" : (l[f].k / 100).toFixed(2) : z ? "LOST" : " ";
            e[m + "GridContainerTable"].children[M].coef = (l[f].k / 100).toFixed(2);
            var J = C ? !0 : z ? !1 : 0 < l[f].k;
            k(e[m + "GridContainerTable"].children[M], z ? !1 : 0 < l[f].k, z, 100 == l[f].k || C);
            k(e[m + "GridContainerTable"].getChildByName("cards_frame" +
                e[m + "GridContainerTable"].children[M].name.substr(0, 1)), J, z, 100 == l[f].k || C);
            f++
        }
    };
    this.drawZonesCoefs = t;
    var p = function (f, l, m) {
        for (var z in f) try {
            var C = f[z].c.split(" ");
            e.cardNumbers[parseInt(C[0])] && e[l + "GridContainerTable"].getChildByName(z + "_0").children[0].text.trim() != e.cardNumbers[parseInt(C[0])].value && (e[l + "GridContainerTable"].getChildByName(z + "_0").children[0].anchor.set(0, 0), e[l + "GridContainerTable"].getChildByName(z + "_0").children[0].position.x = -30, e[l + "GridContainerTable"].getChildByName(z +
                "_0").children[0].position.y = -61, m ? m(e[l + "GridContainerTable"].getChildByName(z + "_0"), l + z + "_0", w.resourceLoader.resources[55 == C[0] ? e.cardNumbers[55].suite + l.substr(0, 1).toUpperCase() + l.substr(1) : e.cardNumbers[parseInt(C[0])].suite].texture, e.cardNumbers[parseInt(C[0])].value, {
                font: "bold 34px Book Antiqua",
                fill: e.cardNumbers[parseInt(C[0])].color
            }) : (e[l + "GridContainerTable"].getChildByName(z + "_0").texture = w.resourceLoader.resources[55 == C[0] ? e.cardNumbers[55].suite + l.substr(0, 1).toUpperCase() + l.substr(1) :
                e.cardNumbers[parseInt(C[0])].suite].texture, e[l + "GridContainerTable"].getChildByName(z + "_0").children[0].text = e.cardNumbers[parseInt(C[0])].value, e[l + "GridContainerTable"].getChildByName(z + "_0").children[0].style = {
                font: "bold 34px Book Antiqua",
                fill: e.cardNumbers[parseInt(C[0])].color
            }));
            e.cardNumbers[parseInt(C[1])] && e[l + "GridContainerTable"].getChildByName(z + "_1").children[0].text.trim() != e.cardNumbers[parseInt(C[1])].value && (e[l + "GridContainerTable"].getChildByName(z + "_1").children[0].anchor.set(0,
                0), e[l + "GridContainerTable"].getChildByName(z + "_1").children[0].position.x = -30, e[l + "GridContainerTable"].getChildByName(z + "_1").children[0].position.y = -61, m ? m(e[l + "GridContainerTable"].getChildByName(z + "_1"), l + z + "_1", w.resourceLoader.resources[55 == C[1] ? e.cardNumbers[55].suite + l.substr(0, 1).toUpperCase() + l.substr(1) : e.cardNumbers[parseInt(C[1])].suite].texture, e.cardNumbers[parseInt(C[1])].value, {
                font: "bold 34px Book Antiqua",
                fill: e.cardNumbers[parseInt(C[1])].color
            }) : (e[l + "GridContainerTable"].getChildByName(z +
                "_1").texture = w.resourceLoader.resources[55 == C[1] ? e.cardNumbers[55].suite + l.substr(0, 1).toUpperCase() + l.substr(1) : e.cardNumbers[parseInt(C[1])].suite].texture, e[l + "GridContainerTable"].getChildByName(z + "_1").children[0].text = e.cardNumbers[parseInt(C[1])].value, e[l + "GridContainerTable"].getChildByName(z + "_1").children[0].style = {
                font: "bold 34px Book Antiqua",
                fill: e.cardNumbers[parseInt(C[1])].color
            }))
        } catch (M) {
            console.log("error draw cards")
        }
    };
    this.drawTableCards = p;
    this.drawTableDeeler = function (f, l,
                                     m, z, C, M) {
        for (C = 0; C < l.length; C++) try {
            55 != parseInt(l[C]) ? e[m + "GridContainerTable"].getChildByName("deelerCard" + C) ? 0 == e[m + "GridContainerTable"].getChildByName("deelerCard" + C).alpha && (e[m + "GridContainerTable"].getChildByName("deelerCard" + C).texture = w.resourceLoader.resources[e.cardNumbers[55].suite + m.substr(0, 1).toUpperCase() + m.substr(1)].texture, e[m + "GridContainerTable"].getChildByName("deelerCard" + C).children[0].text = "", e[m + "GridContainerTable"].getChildByName("deelerCard" + C).children[0].style = {
                font: "bold 34px Book Antiqua",
                fill: e.cardNumbers[parseInt(l[C])].color
            }, e[m + "GridContainerTable"].getChildByName("deelerCard" + C).alpha = 1, z(e[m + "GridContainerTable"].getChildByName("deelerCard" + C), m + "GridContainerTabledeelerCardFlip" + C, w.resourceLoader.resources[e.cardNumbers[parseInt(l[C])].suite].texture, e.cardNumbers[parseInt(l[C])].value, {
                font: "bold 34px Book Antiqua",
                fill: e.cardNumbers[parseInt(l[C])].color
            })) : (w.createButton(e[m + "GridContainerTable"], f["cardPosX" + C], f.cardPosY, e.cardNumbers[55].suite + m.substr(0, 1).toUpperCase() +
                m.substr(1), {
                text: "",
                align: "center",
                style: {font: "bold 34px Book Antiqua", fill: e.cardNumbers[parseInt(l[C])].color}
            }).name = "deelerCard" + C, e[m + "GridContainerTable"].getChildByName("deelerCard" + C).alpha = 0, e[m + "GridContainerTable"].getChildByName("deelerCard" + C).anchor.set(.5, .5), e[m + "GridContainerTable"].getChildByName("deelerCard" + C).children[0].anchor.set(0, 0), e[m + "GridContainerTable"].getChildByName("deelerCard" + C).children[0].position.x = -30, e[m + "GridContainerTable"].getChildByName("deelerCard" + C).children[0].position.y =
                -61, e[m + "GridContainerTable"].getChildByName("deelerCard" + C).alpha = 1, z(e[m + "GridContainerTable"].getChildByName("deelerCard" + C), m + "GridContainerTabledeelerCardFlip" + C, w.resourceLoader.resources[e.cardNumbers[parseInt(l[C])].suite].texture, e.cardNumbers[parseInt(l[C])].value, {
                font: "bold 34px Book Antiqua",
                fill: e.cardNumbers[parseInt(l[C])].color
            })) : e[m + "GridContainerTable"].getChildByName("deelerCard" + C) && M(e[m + "GridContainerTable"].getChildByName("deelerCard" + C), m + "GridContainerTabledeelerCard" + C)
        } catch (J) {
            console.log("error draw deeler cards")
        }
    };
    var n = function (f, l, m, z, C, M, J, K, S, N, U) {
        void 0 != q ? q.addChild(e[z + "GridContainerTable"]) : w.stage.addChild(e[z + "GridContainerTable"]);
        J(e[z + "GridContainerTable"]);
        for (J = 0; J < f.length; J++) {
            var P = w.createButton(e[z + "GridContainerTable"], f[J].cardPosX1 - 9, f[J].cardPosY - 12, "cards_frame");
            P.anchor.set(.5, .5);
            P.name = "cards_frame" + (J + 1);
            w.createButton(P, -.5 * M.w - 2, -.5 * M.h, "cards_frame_mode_selected", void 0, function (ea) {
                    e[z + "GridContainerTable"].getChildByName(ea.name + "GridContainerTable").emit("mousedown")
                }, void 0,
                function (ea) {
                    e[z + "GridContainerTable"].getChildByName(ea.name + "GridContainerTable").emit("mouseup")
                }, N, U).name = J + 1 + z;
            P.getChildByName(J + 1 + z).alpha = 0;
            P = A(f[J].zoneW, f[J].zoneH, f[J].zonePosX, f[J].zonePosY, J + 1 + z + "GridContainerTable", C, f, l, m, K, S);
            e.zones.push(P);
            w.createButton(e[z + "GridContainerTable"], f[J].cardPosX1, f[J].cardPosY, f[J].cardTexture, {
                text: "",
                align: "top-left",
                style: {}
            }).name = J + "_0";
            e[z + "GridContainerTable"].getChildByName(J + "_0").anchor.set(.5, .5);
            w.createButton(e[z + "GridContainerTable"],
                f[J].cardPosX2, f[J].cardPosY, f[J].cardTexture, {
                    text: "",
                    align: "top-left",
                    style: {}
                }).name = J + "_1";
            e[z + "GridContainerTable"].getChildByName(J + "_1").anchor.set(.5, .5);
            e[z + "GridContainerTable"].addChild(P)
        }
        P = P = null
    };
    this.createTable = n;
    var D = function (f, l, m, z, C, M, J, K, S, N, U, P, ea) {
        e[J].position.x = S.x;
        e[J].position.y = S.y;
        e[J].width = f * S.cols;
        e[J].height = l * S.rows;
        void 0 != q ? q.addChild(e[J]) : w.stage.addChild(e[J]);
        for (var L = 0, X = 0, ja = 1; ja <= S.rows; ja++) {
            for (var ma = 1; ma <= S.cols; ma++) {
                var H = A(f, l, X, L, e[J].children.length +
                    1 + J, K, C, z, M, N, U, P, ea);
                e.zones.push(H);
                e[J].addChild(H);
                X += f + m.x
            }
            X = 0;
            L += l + m.y
        }
    }, A = function (f, l, m, z, C, M, J, K, S, N, U, P, ea) {
        var L = new PIXI.Container,
            X = new PIXI.Sprite(w.resourceLoader.resources[J[C.substr(0, 1) - 1].texture ? J[C.substr(0, 1) - 1].texture : "zone_transp"].texture),
            ja = new PIXI.Sprite(w.resourceLoader.resources[J[C.substr(0, 1) - 1].texture ? J[C.substr(0, 1) - 1].texture + "_win" : "zone_transp_win"].texture);
        ja.alpha = 0;
        var ma = new PIXI.Sprite(w.resourceLoader.resources[0 <= C.indexOf("Table") ? "win_chip_table" :
            "win_chip_combinations"].texture);
        ma.alpha = 0;
        X.width = f;
        X.height = l;
        L.position.x = m;
        L.position.y = z;
        L.name = C;
        L.servN = 100 * parseInt(M) + parseInt(J[C.substr(0, 1) - 1].servN);
        L.number = L.name.substr(0, 1);
        L.gridType = 0 <= L.name.indexOf("Combinations") ? "Combinations" : 0 <= L.name.indexOf("Table") ? "Table" : "Suites";
        switch (J.length) {
            case 8:
            case 6:
            case 4:
                f = M;
                break;
            default:
                f = ""
        }
        J = new PIXI.Text(J[C.substr(0, 1) - 1].text ? f.toString() + J[C.substr(0, 1) - 1].text : "", K);
        f = new PIXI.Text("", S);
        J.position.y = f.position.y = X.height / 2;
        J.position.x =
            f.position.x = X.width / 2;
        switch (K.align) {
            case "top-center":
                J.anchor.x = .5;
                J.anchor.y = .9;
                break;
            case "left":
                J.position.x = 20, J.anchor.y = .5
        }
        switch (S.align) {
            case "bottom-center":
                f.anchor.x = .5;
                f.anchor.y = .1;
                break;
            case "right":
                f.position.x = X.width - 8, f.anchor.x = 1, f.anchor.y = .5
        }
        K = new PIXI.Graphics;
        K.position.set(X.position.x, X.position.y);
        K.beginFill(0, .5);
        K.drawRect(0, 0, X.width, X.height);
        K.endFill;
        K.alpha = 0;
        J.name = "text";
        f.name = "zoneCoef";
        X.name = "zoneBg";
        ja.name = "winSprite";
        K.name = "disableSprite";
        ma.name = "winLightSprite";
        P && ea && -1 == C.indexOf("Table") && (C = new PIXI.Sprite(w.resourceLoader.resources.combinations_frame.texture), C.alpha = 0, C.name = "frameSprite", L.addChild(C), C.position.set(-13, -13));
        L.addChild(ma);
        L.addChild(X);
        X.addChild(ja);
        X.addChild(J);
        X.addChild(f);
        L.addChild(K);
        ma.position.set(-13, -13);
        ma = ja = f = X = f = J = null;
        if (void 0 != N || void 0 != U) L.interactive = !0, L.buttonMode = !0, L.on("mousedown", function () {
            N(L)
        }).on("touchstart", function () {
            N(L, void 0, !0)
        }).on("mouseup", function () {
            U(L)
        }).on("touchend", function () {
            U(L)
        }).on("mouseupoutside",
            function () {
                U(L)
            }).on("touchendoutside", function () {
            U(L)
        }).on("mouseover", function () {
            P ? P(L) : N(L, !0)
        }).on("mouseout", function () {
            ea ? ea(L) : U(L, !0)
        }).on("touchmove", function () {
            N(L, void 0, !0)
        });
        return L
    };
    this.removeCurrentBets = function (f, l, m) {
        for (var z in e.pressedZones) if (0 == f || f && -1 != z.indexOf(f)) if (e[e.pressedZones[z].zone.name.substr(1)].getChildByName(e.pressedZones[z].zone.name).selected = !1, !l) for (var C = 0; C < e.pressedZones[z].zone.children.length; C++) "smallChip" != e.pressedZones[z].zone.children[C].name &&
        "smallChipText" != e.pressedZones[z].zone.children[C].name || e.pressedZones[z].zone.children[C].disabled || (e.pressedZones[z].zone.children[C].visible = !1, "smallChipText" == e.pressedZones[z].zone.children[C].name && (e.pressedZones[z].zone.children[C].text = 0));
        l = 0;
        for (z in e.pressedZones) if (0 == f || f && -1 != z.indexOf(f)) {
            l += e.pressedZones[z].bet;
            for (C in e.pressedZones[z]) e.pressedZones[z][C] = null;
            e.pressedZones[z] = null;
            delete e.pressedZones[z]
        }
        0 == f && (e.pressedZones = {});
        w.renderManager.needUpdateRender = !0;
        return l
    };
    this.removeSelectedBets = function () {
        for (var f in e.selectedZones) for (var l = 0; l < e.selectedZones[f].zone.children.length; l++) "smallChip" != e.selectedZones[f].zone.children[l].name && "smallChipText" != e.selectedZones[f].zone.children[l].name && "spriteDisabled" != e.selectedZones[f].zone.children[l].name || !e.selectedZones[f].zone.children[l].disabled || (e.selectedZones[f].zone.children[l].visible = !1, e.selectedZones[f].zone.children[l].disabled = !1, "smallChipText" == e.selectedZones[f].zone.children[l].name && (e.selectedZones[f].zone.children[l].text =
            0));
        for (f in e.selectedZones) {
            for (l in e.selectedZones[f]) e.selectedZones[f][l] = null;
            e.selectedZones[f] = null;
            delete e.selectedZones[f]
        }
        e.selectedZones = {};
        w.renderManager.needUpdateRender = !0
    };
    this.pressZonesByObjectArr = function (f, l) {
        for (var m in f) l({
            zone: e[f[m].name.substr(1)].getChildByName(f[m].name),
            bet: f[m].summ,
            coef: f[m].coef,
            servN: f[m].comb
        });
        w.renderManager.needUpdateRender = !0
    }
}

function RacingGrid(r, E, q, w, e) {
    this.destroy = function () {
        I = g = b = null;
        for (var G in v) v[G] = null;
        v = null
    };
    var v = this;
    this.zones = [];
    this.pressedZones = [];
    this.selectedZones = [];
    var b = new PIXI.Container;
    this.gridContainerAwards = b;
    this.gridContainerOrder = new PIXI.Container;
    this.gridContainerOddEven = new PIXI.Container;
    var g = function (G, u, x, h, B, y, F) {
        c(G, u, x, h, B, "gridContainerAwards", r, y, F)
    };
    this.createZonesAwards = g;
    this.createZonesOrder = function (G, u, x, h, B, y, F) {
        c(G, u, x, h, B, "gridContainerOrder", E, y, F)
    };
    this.createZonesOddEven =
        function (G, u, x, h, B, y, F) {
            c(G, u, x, h, B, "gridContainerOddEven", q, y, F)
        };
    var c = function (G, u, x, h, B, y, F, a, d) {
        v[y].position.x = F.x;
        v[y].position.y = F.y;
        v[y].width = G * F.cols;
        v[y].height = u * F.rows;
        void 0 != w ? w.addChild(v[y]) : e.stage.addChild(v[y]);
        for (var k = 0, t = 0, p = 1; p <= F.rows; p++) {
            for (var n = 1; n <= F.cols; n++) {
                if ("gridContainerOrder" != y || p != n) {
                    var D = I(G, u, t, k, v.zones.length + 1, B, h, a, d);
                    v.zones.push(D);
                    v[y].addChild(D)
                }
                t += G + x.x
            }
            t = 0;
            k += u + x.y
        }
    }, I = function (G, u, x, h, B, y, F, a, d) {
        var k = new PIXI.Sprite(e.resourceLoader.resources.zone_transp.texture);
        k.width = G;
        k.height = u;
        k.position.x = x;
        k.position.y = h;
        k.name = B;
        G = new PIXI.Text(y[B] || "", F);
        G.position.y = k.height / 2;
        G.position.x = k.width / 2;
        switch (F.align) {
            case "top-center":
                G.anchor.x = .5;
                G.anchor.y = .85;
                break;
            case "bottom-center":
                G.anchor.x = .5, G.anchor.y = .15
        }
        G.name = "text" + k.name;
        k.addChild(G);
        G = null;
        if (void 0 != a || void 0 != d) k.interactive = !0, k.buttonMode = !0, k.on("mousedown", function () {
            a(k)
        }).on("touchstart", function () {
            a(k, void 0, !0)
        }).on("mouseup", function () {
            d(k)
        }).on("touchend", function () {
            d(k)
        }).on("mouseupoutside",
            function () {
                d(k)
            }).on("touchendoutside", function () {
            d(k)
        }).on("mouseover", function () {
            a(k, !0)
        }).on("mouseout", function () {
            d(k, !0)
        }).on("touchmove", function () {
            a(k, void 0, !0)
        });
        return k
    }
}

function FortuneGrid(r, E, q, w, e, v) {
    this.destroy = function () {
        g = F = y = B = u = G = h = x = I = c = null;
        for (var a in b) b[a] = null;
        b = null
    };
    var b = this;
    this.zones = [];
    this.buttons = [];
    this.sectors = [];
    this.pressedZones = {};
    this.selectedZones = [];
    this.combinations = fortunaCombinations.comb;
    this.sectorCombinations = sectorFortunaCombinations.comb;
    var g = fortunaCombinations.btnComb;
    this.buttonCombinations = g;
    this.sectorButtonCombinations = sectorFortunaCombinations.btnComb;
    this.getBetNameByCombinationCode = function (a) {
        if (-1 < parseInt(a) ||
            37 > parseInt(a)) return a;
        if (36 < parseInt(a) || 43 > parseInt(a)) return g[a].zones.join(", ");
        if (42 < parseInt(a) || 49 > parseInt(a)) return g[a].caption;
        if (99 < parseInt(a) || 208 > parseInt(a)) return combinations[parseInt(a) - 100].join(", ")
    };
    var c = new PIXI.Container;
    c.name = "gridContainer";
    var I = new PIXI.Container;
    I.name = "uiGridContainer";
    var G = new PIXI.Container;
    G.name = "sectorsContainer";
    var u = new PIXI.Container;
    u.name = "uiSectorsContainer";
    var x = new PIXI.Container;
    x.name = "buttonsContainer";
    var h = new PIXI.Container;
    h.name = "uiButtonsContainer";
    this.gridContainer = c;
    this.uiGridContainer = I;
    this.sectorsContainer = G;
    this.uiSectorsContainer = u;
    this.buttonsContainer = x;
    this.uiButtonsContainer = h;
    this.createSectors = function (a, d, k, t, p) {
        b.sectorsContainer.position.x = a.posX;
        b.sectorsContainer.position.y = a.posY;
        b.uiSectorsContainer.position.x = a.posX;
        b.uiSectorsContainer.position.y = a.posY;
        void 0 != e ? (e.addChild(b.sectorsContainer), e.addChild(b.uiSectorsContainer)) : (v.stage.addChild(b.sectorsContainer), v.stage.addChild(b.uiSectorsContainer));
        var n;
        for (n in d) {
            a = y(d[n].size, d[n].pos.zonePosX, d[n].pos.zonePosY, parseInt(n), void 0, {
                text: "",
                align: "center",
                style: {}
            });
            var D = v.createButton(b.uiSectorsContainer, d[n].pos.zonePosX + a.width / 2, d[n].pos.zonePosY + a.height / 2, void 0, {
                text: n,
                align: "center",
                style: {font: "48px Century725", fill: "#cfaf80", align: "center"}
            });
            D.name = "textZone" + n;
            D.anchor.x = .5;
            D.anchor.y = .5;
            D = v.createButton(b.uiSectorsContainer, d[n].pos.zonePosX, d[n].pos.zonePosY, d[n].hoverTexture);
            D.name = a.name + "innerZone";
            D.alpha = 0;
            b.sectors.push(a);
            a = y(d[n].size, d[n].pos.zonePosX, d[n].pos.zonePosY, parseInt(n), void 0, void 0, t, p);
            b.sectorsContainer.addChild(a)
        }
        for (n in k) a = y(k[n].size, k[n].pos.zonePosX, k[n].pos.zonePosY, parseInt(n), void 0, void 0), D = v.createButton(b.uiSectorsContainer, k[n].pos.zonePosX, k[n].pos.zonePosY), D.name = a.name + "innerZone", D.alpha = 0, b.sectors.push(a), a = y(k[n].size, k[n].pos.zonePosX, k[n].pos.zonePosY, parseInt(n), void 0, void 0, t, p), b.sectorsContainer.addChild(a);
        for (n = 0; n < b.sectors.length; n++) b.uiSectorsContainer.addChild(b.sectors[n]);
        a = y({w: 75, h: 75}, 0, 0, "winZone", void 0, {text: "win", align: "center", style: {}});
        a.getChildByName("textwinZone").visible = !1;
        a.visible = !1;
        b.uiSectorsContainer.addChild(a)
    };
    this.createFooter = function (a, d, k, t, p) {
        b.buttonsContainer.position.x = a.posX;
        b.buttonsContainer.position.y = a.posY;
        b.uiButtonsContainer.position.x = a.posX;
        b.uiButtonsContainer.position.y = a.posY;
        void 0 != d && (d.addChild(b.buttonsContainer), d.addChild(b.uiButtonsContainer));
        var n;
        var D = n = 0;
        for (var A = 1; A <= w; A++) d = y({w: 468, h: 90}, n, D, 39 + A, void 0,
            void 0), a = v.createButton(b.uiButtonsContainer, n, D), a.name = d.name + "innerZone", a.alpha = 0, b.zones[39 + A] = d, d = y({
            w: 468,
            h: 90
        }, n, D, 39 + A, void 0, void 0, t, p), b.buttonsContainer.addChild(d), n += 4 * (115 + k.x);
        n = 0;
        D += 90 + k.y;
        for (A = 43; 47 >= A; A += 2) d = y({
            w: 233,
            h: 88
        }, n, D, A), a = v.createButton(b.uiButtonsContainer, n, D), a.name = d.name + "innerZone", a.alpha = 0, b.zones[A] = d, d = y({
            w: 233,
            h: 88
        }, n, D, A, void 0, void 0, t, p), b.buttonsContainer.addChild(d), n += 2 * (115 + k.x);
        for (A = 48; 44 <= A; A -= 2) d = y({w: 233, h: 88}, n, D, A), a = v.createButton(b.uiButtonsContainer,
            n, D), a.name = d.name + "innerZone", a.alpha = 0, b.zones[A] = d, d = y({
            w: 233,
            h: 88
        }, n, D, A, void 0, void 0, t, p), b.buttonsContainer.addChild(d), n += 2 * (115 + k.x);
        for (A = 40; 48 >= A; A++) b.uiButtonsContainer.addChild(b.zones[A])
    };
    var B = function (a, d, k, t, p, n, D, A) {
        b.gridContainer.position.x = r;
        b.gridContainer.position.y = E;
        b.uiGridContainer.position.x = r;
        b.uiGridContainer.position.y = E;
        v.stage.addChild(b.uiGridContainer);
        v.stage.addChild(b.gridContainer);
        p = y(d, 603, -225, 0, void 0, {text: "", align: "center", style: {}});
        n = v.createButton(b.uiGridContainer,
            603 + p.width / 2, -222 + p.height / 2, void 0, {
                text: mainLocalizationTable.bingo.toUpperCase() + " 37",
                align: "center",
                style: {font: "bold 90px Baltica", fill: "#8b0005", align: "center"}
            });
        n.anchor.x = .5;
        n.anchor.y = .5;
        n = v.createButton(b.uiGridContainer, 603, -225, "zone_pressed_big");
        n.name = p.name + "innerZone";
        n.alpha = 0;
        b.zones.push(p);
        p = y(d, 603, -225, 0, void 0, void 0, D, A);
        b.gridContainer.addChild(p);
        d = 2 * (a.h + k.y);
        var f = 0;
        for (var l = 1; l <= q; l++) {
            for (var m = 1; m <= w; m++) p = y(a, f, d, b.zones.length, void 0), n = v.createButton(b.uiGridContainer,
                f + p.width / 2, d + p.height / 2, void 0, {
                    text: b.zones.length,
                    align: "center",
                    style: t
                }), n.anchor.x = .5, n.anchor.y = .5, n = v.createButton(b.uiGridContainer, f, d, "zone_pressed"), n.name = p.name + "innerZone", n.alpha = 0, b.zones.push(p), p = y(a, f, d, b.zones.length - 1, void 0, void 0, D, A), b.gridContainer.addChild(p), d -= a.h + k.y;
            f += a.w + k.x;
            if (4 == l || 8 == l) f += 83;
            d = (a.h + k.y) * (w - 1)
        }
        p = y(a, 0, 0, "winZone", void 0, {text: "win", align: "center", style: {}});
        p.visible = !1;
        b.uiGridContainer.addChild(p);
        f = k.x + 12 * (a.w + k.x) + 166;
        d = (a.h + k.y) * (w - 1);
        for (m =
                 1; m <= w; m++) p = y({
            w: 100,
            h: 136
        }, f, d, w * q + m, void 0, void 0), b.zones.push(p), b.uiGridContainer.addChild(p), p = y({
            w: 100,
            h: 136
        }, f, d, w * q + m, void 0, void 0, D, A), p.isGridButton = !0, b.gridContainer.addChild(p), d -= a.h + k.y;
        f = 0;
        d = -60;
        for (m = 1; m <= w; m++) p = y({
            w: 520,
            h: 60
        }, f, d, 39 + m, void 0, void 0), b.zones.push(p), b.uiGridContainer.addChild(p), p = y({
            w: 520,
            h: 60
        }, f, d, 39 + m, void 0, void 0, D, A), p.isGridButton = !0, b.gridContainer.addChild(p), f += 4 * (a.w + k.x) + 83;
        f = k.x - .3 * a.w / 2;
        d = 0;
        for (l = 1; l <= w; l++) {
            for (m = 1; m <= q; m++) if (p = y({
                w: 5 == m || 9 == m ?
                    .3 * a.w + 83 : .3 * a.w, h: 1 == l ? .85 * a.h : .7 * a.h
            }, f, d, 100 + (q * (l - 1) + m - 1), void 0, void 0), b.zones.push(p), b.uiGridContainer.addChild(p), p = y({
                w: 5 == m || 9 == m ? .3 * a.w + 83 : .3 * a.w,
                h: 1 == l ? .85 * a.h : .7 * a.h
            }, f, d, 100 + (q * (l - 1) + m - 1), void 0, void 0, D, A), p.isSplit = !0, b.gridContainer.addChild(p), f += a.w + k.x, 5 == m || 9 == m) f += 83;
            f = k.x - .3 * a.w / 2;
            d = (a.h + k.y) * l + .3 * a.h / 2
        }
        f = 0;
        d = .85 * (a.h + k.y);
        for (l = 1; l <= w; l++) {
            for (m = 1; m <= q; m++) {
                p = y({
                    w: m == q || 1 == m ? .85 * a.w : .7 * a.w,
                    h: .3 * a.h
                }, f, d, 172 + (q * (l - 1) + m - 1), void 0, void 0);
                b.zones.push(p);
                b.uiGridContainer.addChild(p);
                p = y({
                    w: m == q || 1 == m ? .85 * a.w : .7 * a.w,
                    h: .3 * a.h
                }, f, d, 172 + (q * (l - 1) + m - 1), void 0, void 0, D, A);
                p.isSplit = !0;
                b.gridContainer.addChild(p);
                f += a.w + k.x;
                if (4 == m || 8 == m) f += 83;
                1 == m && (f += k.x + .3 * a.w / 2)
            }
            f = 0;
            d += a.h + k.y
        }
        f = k.x - .3 * a.w / 2;
        d = .85 * (a.h + k.y);
        for (l = 1; l <= q; l++) {
            for (m = 1; m <= w; m++) p = y({
                w: 5 == l || 9 == l ? .3 * a.w + 83 : .3 * a.w,
                h: .3 * a.h
            }, f, d, 136 + (w * (l - 1) + m - 1), void 0, void 0), b.zones.push(p), b.uiGridContainer.addChild(p), p = y({
                w: 5 == l || 9 == l ? .3 * a.w + 83 : .3 * a.w,
                h: .3 * a.h
            }, f, d, 136 + (w * (l - 1) + m - 1), void 0, void 0, D, A), p.isSplit = !0, b.gridContainer.addChild(p),
                d += a.h + k.y;
            d = .85 * (a.h + k.y);
            f += a.w + k.x;
            if (5 == l || 9 == l) f += 83
        }
        for (m = 0; 36 >= m; m++) b.uiGridContainer.addChild(b.zones[m])
    };
    this.createZonesRedLottery = B;
    this.createZonesRoulette = function (a, d, k, t, p, n, D, A) {
        b.gridContainer.position.x = r;
        b.gridContainer.position.y = E;
        b.uiGridContainer.position.x = r;
        b.uiGridContainer.position.y = E;
        v.stage.addChild(b.uiGridContainer);
        v.stage.addChild(b.gridContainer);
        var f, l;
        t = y(d, -113, -1, 0, void 0, {text: "", align: "center", style: {}});
        v.createButton(b.uiGridContainer, -113, -1);
        p = v.createButton(b.uiGridContainer,
            -113, -1, "zone_pressed_big");
        p.name = t.name + "innerZone";
        p.alpha = 0;
        b.zones.push(t);
        t = y(d, -113, -1, 0, void 0, void 0, D, A);
        b.gridContainer.addChild(t);
        d = 2 * (a.h + k.y);
        n = 0;
        for (f = 1; f <= q; f++) {
            for (l = 1; l <= w; l++) t = y(a, n, d, b.zones.length, void 0), p = v.createButton(b.uiGridContainer, n + t.width / 2, d + t.height / 2), p.anchor.x = .5, p.anchor.y = .5, p = v.createButton(b.uiGridContainer, n, d, "zone_pressed"), p.name = t.name + "innerZone", p.alpha = 0, b.zones.push(t), t = y(a, n, d, b.zones.length - 1, void 0, void 0, D, A), b.gridContainer.addChild(t), d -=
                a.h + k.y;
            n += a.w + k.x;
            d = (a.h + k.y) * (w - 1)
        }
        t = y(a, 0, 0, "winZone", void 0, {text: "win", align: "center", style: {}});
        t.getChildByName("textwinZone").visible = !1;
        t.visible = !1;
        b.uiGridContainer.addChild(t);
        n = 12 * (a.w + k.x);
        d = (a.h + k.y) * (w - 1);
        for (l = 1; l <= w; l++) t = y(a, n, d, w * q + l, void 0, void 0), p = v.createButton(b.uiGridContainer, n, d, "zone_pressed"), p.name = t.name + "innerZone", p.alpha = 0, b.zones.push(t), t = y(a, n, d, w * q + l, void 0, void 0, D, A), b.gridContainer.addChild(t), d -= a.h + k.y;
        n = 0;
        d = -82;
        for (l = 1; l <= w; l++) t = y({w: 448, h: 79}, n, d, 39 +
            l, void 0, void 0), p = v.createButton(b.uiGridContainer, n, d, "zone_pressed_large"), p.name = t.name + "innerZone", p.alpha = 0, b.zones.push(t), t = y({
            w: 448,
            h: 79
        }, n, d, 39 + l, void 0, void 0, D, A), b.gridContainer.addChild(t), n += 4 * (a.w + k.x);
        n = 0;
        d = (a.h + k.y) * w;
        for (l = 43; 47 >= l; l += 2) t = y({
            w: 223,
            h: 79
        }, n, d, l, void 0, void 0), p = v.createButton(b.uiGridContainer, n, d, "zone_pressed_medium"), p.name = t.name + "innerZone", p.alpha = 0, b.zones.push(t), t = y({
            w: 223,
            h: 79
        }, n, d, l, void 0, void 0, D, A), b.gridContainer.addChild(t), n += 2 * (a.w + k.x);
        for (l = 48; 44 <=
        l; l -= 2) t = y({
            w: 223,
            h: 79
        }, n, d, l, void 0, void 0), p = v.createButton(b.uiGridContainer, n, d, "zone_pressed_medium"), p.name = t.name + "innerZone", p.alpha = 0, b.zones.push(t), t = y({
            w: 223,
            h: 79
        }, n, d, l, void 0, void 0, D, A), b.gridContainer.addChild(t), n += 2 * (a.w + k.x);
        n = .3 * -a.w / 2;
        d = 0;
        for (f = 1; f <= w; f++) {
            for (l = 1; l <= q; l++) t = y({
                w: .3 * a.w,
                h: 1 == f ? .85 * a.h : .7 * a.h
            }, n, d, 100 + (q * (f - 1) + l - 1), void 0, void 0), b.zones.push(t), b.uiGridContainer.addChild(t), t = y({
                w: .3 * a.w,
                h: 1 == f ? .85 * a.h : .7 * a.h
            }, n, d, 100 + (q * (f - 1) + l - 1), void 0, void 0, D, A), t.isSplit =
                !0, b.gridContainer.addChild(t), n += a.w + k.x;
            n = .3 * -a.w / 2;
            d = (a.h + k.y) * f + .3 * a.h / 2
        }
        n = 0;
        d = .85 * a.h;
        for (f = 1; f <= w; f++) {
            for (l = 1; l <= q; l++) t = y({
                w: l == q || 1 == l ? .85 * a.w : .7 * a.w,
                h: .3 * a.h
            }, n, d, 172 + (q * (f - 1) + l - 1), void 0, void 0), b.zones.push(t), b.uiGridContainer.addChild(t), t = y({
                w: l == q || 1 == l ? .85 * a.w : .7 * a.w,
                h: .3 * a.h
            }, n, d, 172 + (q * (f - 1) + l - 1), void 0, void 0, D, A), t.isSplit = !0, b.gridContainer.addChild(t), n += a.w + k.x, 1 == l && (n += k.x + .3 * a.w / 2);
            n = 0;
            d += a.h + k.y
        }
        n = .36 * -a.w / 2;
        d = .83 * a.h;
        for (f = 1; f <= q; f++) {
            for (l = 1; l <= w; l++) t = y({
                w: .36 * a.w, h: .36 *
                    a.h
            }, n, d, 136 + (w * (f - 1) + l - 1), void 0, void 0), b.zones.push(t), b.uiGridContainer.addChild(t), t = y({
                w: .36 * a.w,
                h: .36 * a.h
            }, n, d, 136 + (w * (f - 1) + l - 1), void 0, void 0, D, A), t.isSplit = !0, b.gridContainer.addChild(t), d += a.h + k.y;
            d = .83 * (a.h + k.y);
            n += a.w + k.x
        }
        for (l = 0; 48 >= l; l++) b.uiGridContainer.addChild(b.zones[l])
    };
    this.createZonesRoulette4K = function (a, d, k, t, p, n) {
        b.gridContainer.position.x = r;
        b.gridContainer.position.y = E;
        b.uiGridContainer.position.x = r;
        b.uiGridContainer.position.y = E;
        void 0 != e ? (e.addChild(b.uiGridContainer),
            e.addChild(b.gridContainer)) : (v.stage.addChild(b.uiGridContainer), v.stage.addChild(b.gridContainer));
        var D, A;
        var f = y(d, -k.x - d.w, 4 * -k.y, 0, void 0, {text: "", align: "center", style: {}});
        var l = v.createButton(b.uiGridContainer, -k.x - d.w + d.w / 1.8, 4 * -k.y + d.h / 2, void 0, {
            text: "0",
            align: "center",
            style: n ? n : {font: "57px Century725", fill: "#cfaf80", align: "center"}
        });
        l.name = "textZone0";
        l.anchor.x = .5;
        l.anchor.y = .5;
        l = v.createButton(b.uiGridContainer, -k.x - d.w, 4 * -k.y, "inner_zone_zero");
        l.name = f.name + "innerZone";
        l.alpha = 0;
        b.zones.push(f);
        f = y(d, -k.x - d.w, 4 * -k.y, 0, void 0, void 0, t, p);
        b.gridContainer.addChild(f);
        d = 2 * (a.h + k.y);
        var m = 0;
        for (D = 1; D <= q; D++) {
            for (A = 1; A <= w; A++) f = y(a, m, d, b.zones.length, void 0), l = v.createButton(b.uiGridContainer, m + f.width / 2, d + f.height / 2, void 0, {
                text: b.zones.length,
                align: "center",
                style: n ? n : {font: "57px Century725", fill: "#cfaf80", align: "center"}
            }), l.name = "textZone" + b.zones.length, l.anchor.x = .5, l.anchor.y = .5, l = v.createButton(b.uiGridContainer, m, d, "inner_zone"), l.name = f.name + "innerZone", l.alpha = 0, b.zones.push(f), f = y(a,
                m, d, b.zones.length - 1, void 0, void 0, t, p), b.gridContainer.addChild(f), d -= a.h + k.y;
            m += a.w + k.x;
            d = (a.h + k.y) * (w - 1)
        }
        m = 12 * (a.w + k.x);
        d = (a.h + k.y) * (w - 1);
        for (A = 1; A <= w; A++) f = y({
            w: 100,
            h: a.h
        }, m, d, w * q + A, void 0, void 0), l = v.createButton(b.uiGridContainer, m, d), l.name = f.name + "innerZone", l.alpha = 0, b.zones.push(f), f = y({
            w: 100,
            h: a.h
        }, m, d, w * q + A, void 0, void 0, t, p), b.gridContainer.addChild(f), d -= a.h + k.y;
        for (A = 40; 48 >= A; A++) b.zones.push({});
        m = -k.x - .3 * a.w / 2;
        d = 0;
        for (D = 1; D <= w; D++) {
            for (A = 1; A <= q; A++) f = y({
                w: .3 * a.w + k.x, h: 1 == D ? .85 * a.h :
                    .7 * a.h
            }, m, d, 100 + (q * (D - 1) + A - 1), void 0, void 0), b.zones.push(f), b.uiGridContainer.addChild(f), f = y({
                w: .3 * a.w + k.x,
                h: 1 == D ? .85 * a.h : .7 * a.h
            }, m, d, 100 + (q * (D - 1) + A - 1), void 0, void 0, t, p), f.isSplit = !0, b.gridContainer.addChild(f), m += a.w + k.x;
            m = -k.x - .3 * a.w / 2;
            d = (a.h + k.y) * D + .3 * a.h / 2
        }
        m = .3 * a.w / 2;
        d = .85 * a.h;
        for (D = 1; D <= w; D++) {
            for (A = 1; A <= q; A++) f = y({
                w: A == q ? .85 * a.w : .7 * a.w,
                h: .3 * a.h + k.y
            }, m, d, 172 + (q * (D - 1) + A - 1), void 0, void 0), b.zones.push(f), b.uiGridContainer.addChild(f), f = y({
                w: A == q ? .85 * a.w : .7 * a.w,
                h: .3 * a.h + k.y
            }, m, d, 172 + (q * (D - 1) +
                A - 1), void 0, void 0, t, p), f.isSplit = !0, b.gridContainer.addChild(f), m += a.w + k.x;
            m = .3 * a.w / 2;
            d += a.h + k.y
        }
        m = -k.x - .3 * a.w / 2;
        d = .85 * a.h;
        for (D = 1; D <= q; D++) {
            for (A = 1; A <= w; A++) f = y({
                w: .3 * a.w + k.x,
                h: .3 * a.h + k.y
            }, m, d, 136 + (w * (D - 1) + A - 1), void 0, void 0), b.zones.push(f), b.uiGridContainer.addChild(f), f = y({
                w: .3 * a.w + k.x,
                h: .3 * a.h + k.y
            }, m, d, 136 + (w * (D - 1) + A - 1), void 0, void 0, t, p), f.isSplit = !0, b.gridContainer.addChild(f), d += a.h + k.y;
            d = .85 * a.h;
            m += a.w + k.x
        }
        for (A = 0; 39 >= A; A++) b.uiGridContainer.addChild(b.zones[A]);
        f = y(a, 0, 0, "winZone", void 0,
            {text: "win", align: "center", style: {}});
        f.getChildByName("textwinZone").visible = !1;
        f.visible = !1;
        b.uiGridContainer.addChild(f)
    };
    var y = function (a, d, k, t, p, n, D, A) {
        if (void 0 != p) var f = new PIXI.Sprite(v.resourceLoader.resources[p].texture); else p = new PIXI.Graphics, p.beginFill(16777215, 0), p.drawRect(0, 0, a.w, a.h), p.endFill(), f = new PIXI.Sprite(p.generateTexture(!1));
        void 0 != a && (f.width = a.w, f.height = a.h, f.hitArea = new PIXI.Rectangle(0, 0, f.width, f.height));
        f.position.x = d;
        f.position.y = k;
        f.name = t;
        if (void 0 != n) {
            a =
                new PIXI.Text(n.text, n.style);
            a.position.y = f.height / 2;
            a.position.x = f.width / 2;
            switch (n.align) {
                case "right":
                    a.anchor.x = 1;
                    a.anchor.y = .5;
                    break;
                case "left":
                    a.anchor.x = 0;
                    a.anchor.y = .5;
                    break;
                case "half-right":
                    a.anchor.x = .75;
                    a.anchor.y = .5;
                    break;
                case "half-left":
                    a.anchor.x = .25;
                    a.anchor.y = .5;
                    break;
                case "half-bottom":
                    a.anchor.x = .5;
                    a.anchor.y = 0;
                    break;
                case "half-top":
                    a.anchor.x = .5;
                    a.anchor.y = 1;
                    break;
                default:
                    a.anchor.x = .5, a.anchor.y = .5
            }
            a.name = "text" + f.name;
            f.addChild(a);
            a = null
        }
        if (void 0 != D || void 0 != A) f.interactive =
            !0, f.buttonMode = !0, f.on("mousedown", function (l) {
            D(f, void 0, void 0, l)
        }).on("touchstart", function (l) {
            D(f, void 0, !0, l)
        }).on("mouseup", function () {
            A(f)
        }).on("touchend", function () {
            A(f)
        }).on("mouseupoutside", function () {
            A(f)
        }).on("touchendoutside", function () {
            A(f)
        }).on("mouseover", function (l) {
            D(f, !0, void 0, l)
        }).on("touchmove", function (l) {
            D(f, void 0, !0, l)
        });
        return f
    };
    this.zonesOut = function (a) {
        for (var d = 0; d < b.gridContainer.children.length; d++) -1 != String(b.uiGridContainer.children[d].name).indexOf("innerZone") &&
        (a ? a(b.uiGridContainer.children[d], b.uiGridContainer.children[d].name.replace(/innerZone/g, "")) : b.uiGridContainer.children[d].alpha = 0);
        for (d = 0; d < b.sectorsContainer.children.length; d++) b.uiSectorsContainer.getChildByName(d + "innerZone") && (a ? a(b.uiSectorsContainer.getChildByName(d + "innerZone"), d + "sector") : b.uiSectorsContainer.getChildByName(d + "innerZone").alpha = 0);
        v.renderManager.needUpdateRender = !0
    };
    this.switchHover = function (a) {
        for (var d = 0; 36 >= d; d++) b.uiGridContainer.getChildByName(d + "innerZone").visible =
            a, b.uiSectorsContainer.getChildByName(d + "innerZone").visible = a;
        v.renderManager.needUpdateRender = !0
    };
    this.removeCurrentBets = function (a) {
        if (a && a.length) for (var d in b.pressedZones) {
            if (-1 < a.indexOf(parseInt(b.pressedZones[d].zone.name))) {
                b.buttonsContainer.children.length && 40 <= d && 48 >= d ? b.buttonsContainer.getChildByName(parseInt(d)).selected = !1 : b.gridContainer.getChildByName(parseInt(d)).selected = !1;
                b.pressedZones[d].zone.getChildByName("smallChip").visible = !1;
                b.pressedZones[d].zone.getChildByName("smallChipText").visible =
                    !1;
                b.pressedZones[d].zone.getChildByName("smallChipText").text = 0;
                b.uiSectorsContainer.children.length && b.uiSectorsContainer.getChildByName(parseInt(d)) && b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("smallChip") && (b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("smallChip").visible = !1, b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("smallChipText").visible = !1, b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("smallChipText").text = 0);
                for (var k in b.pressedZones[d]) b.pressedZones[d][k] = null;
                b.pressedZones[d] = null;
                delete b.pressedZones[d]
            }
        } else {
            for (d in b.pressedZones) b.buttonsContainer.children.length && 40 <= d && 48 >= d ? b.buttonsContainer.getChildByName(parseInt(d)).selected = !1 : b.gridContainer.getChildByName(parseInt(d)).selected = !1, b.pressedZones[d].zone.getChildByName("smallChip").visible = !1, b.pressedZones[d].zone.getChildByName("smallChipText").visible = !1, b.pressedZones[d].zone.getChildByName("smallChipText").text = 0, b.uiSectorsContainer.children.length &&
            b.uiSectorsContainer.getChildByName(parseInt(d)) && b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("smallChip") && (b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("smallChip").visible = !1, b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("smallChipText").visible = !1, b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("smallChipText").text = 0);
            for (d = 0; 36 >= d; d++) b.uiGridContainer.getChildByName(d).getChildByName("possibleWinInfo") && (b.uiGridContainer.getChildByName(d).getChildByName("possibleWinInfo").visible =
                !1, b.uiGridContainer.getChildByName(d).getChildByName("possibleWinText").visible = !1, b.uiGridContainer.getChildByName(d).getChildByName("possibleWinText").text = 0), b.uiSectorsContainer.children.length && b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("possibleWinInfo") && (b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("possibleWinInfo").visible = !1, b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("possibleWinText").visible = !1, b.uiSectorsContainer.getChildByName(parseInt(d)).getChildByName("possibleWinText").text =
                0);
            if (b.uiSectorsContainer.children.length) for (d = 49; 52 >= d; d++) b.uiSectorsContainer.getChildByName(d).getChildByName("smallChip") && (b.uiSectorsContainer.getChildByName(d).getChildByName("smallChip").visible = !1, b.uiSectorsContainer.getChildByName(d).getChildByName("smallChipText").visible = !1, b.uiSectorsContainer.getChildByName(d).getChildByName("smallChipText").text = 0);
            for (d in b.pressedZones) {
                for (k in b.pressedZones[d]) b.pressedZones[d][k] = null;
                b.pressedZones[d] = null;
                delete b.pressedZones[d]
            }
            b.pressedZones =
                []
        }
        v.renderManager.needUpdateRender = !0
    };
    this.pressZonesByObjectArr = function (a, d) {
        for (var k in a) d({
            zone: b.buttonsContainer.children.length && 40 <= a[k].comb && 48 >= a[k].comb ? b.buttonsContainer.getChildByName(a[k].comb) : b.gridContainer.getChildByName(a[k].comb),
            bet: a[k].summ,
            isInSectorsComb: a[k].isInSectorsComb,
            spread: a[k].spread ? {sectors: Object.assign({}, a[k].spread.sectors), main: a[k].spread.main} : void 0
        });
        v.renderManager.needUpdateRender = !0
    };
    this.setZoneInteraction = function (a) {
        a || b.zonesOut();
        for (var d =
            0; d < b.gridContainer.children.length; d++) b.gridContainer.children[d].interactive = a;
        for (d = 0; d < b.buttonsContainer.children.length; d++) b.buttonsContainer.children[d].interactive = a;
        for (d = 0; d < b.sectorsContainer.children.length; d++) b.sectorsContainer.children[d].interactive = a;
        v.renderManager.needUpdateRender = !0
    };
    this.getColorByCombCode = function (a) {
        return -1 != fortunaCombinations.btnComb["47"].zones.indexOf(parseInt(a)) ? "Red" : -1 != fortunaCombinations.btnComb["48"].zones.indexOf(parseInt(a)) ? "Black" : "Zero"
    };
    this.showWinZone = function (a, d, k) {
        if (!(36 < parseInt(a) && 0 > parseInt(a))) {
            var t = b.uiGridContainer.getChildByName("winZone"), p = b.uiGridContainer.getChildByName(a);
            F(t, p, a, d, k);
            b.uiSectorsContainer.children.length && b.uiSectorsContainer.getChildByName("winZone") && (t = b.uiSectorsContainer.getChildByName("winZone"), p = b.uiSectorsContainer.getChildByName(a), F(t, p, a, d, k))
        }
    };
    var F = function (a, d, k, t, p) {
        a.position.x = d.position.x;
        a.position.y = d.position.y;
        a.texture = d.texture;
        a.width = d.width;
        a.height = d.height;
        a.getChildByName("textwinZone").text =
            k;
        a.getChildByName("textwinZone").position.set(a.width / 2, a.height / 2);
        if (d.getChildByName("smallChip") && d.getChildByName("smallChip").visible) {
            if (a.getChildByName("smallChip")) a.getChildByName("smallChipText").text = d.getChildByName("smallChipText").text; else {
                var n = new PIXI.Sprite(d.getChildByName("smallChip").texture);
                n.name = "smallChip";
                n.anchor.x = .5;
                n.anchor.y = .555;
                n.position.y = a.height / 2;
                n.position.x = a.width / 2;
                n.scale.set(.48, .48);
                var D = new PIXI.Text(d.getChildByName("smallChipText").text, d.getChildByName("smallChipText").style);
                D.name = "smallChipText";
                D.anchor.x = .5;
                D.anchor.y = .5;
                D.position.y = a.height / 2;
                D.position.x = a.width / 2;
                a.addChildAt(n, limit(a.children.length - 1, 0, a.children.length - 1));
                a.addChildAt(D, limit(a.children.length - 1, 0, a.children.length - 1))
            }
            a.getChildByName("smallChip").visible = !0;
            a.getChildByName("smallChipText").visible = !0;
            d.getChildByName("smallChip").visible = !1;
            d.getChildByName("smallChipText").visible = !1
        } else a.getChildByName("smallChip") && (a.getChildByName("smallChip").visible = !1, a.getChildByName("smallChipText").visible =
            !1);
        if (d.getChildByName("possibleWinInfo") && d.getChildByName("possibleWinInfo").visible) {
            if (a.getChildByName("possibleWinInfo")) a.getChildByName("possibleWinText").text = d.getChildByName("possibleWinText").text; else {
                k = new PIXI.Sprite(d.getChildByName("possibleWinInfo").texture);
                var A = new PIXI.Text(d.getChildByName("possibleWinText").text, d.getChildByName("possibleWinText").style);
                A.name = "possibleWinText";
                k.name = "possibleWinInfo";
                a.addChildAt(A, a.children.length);
                a.addChildAt(k, a.children.length - 1);
                for (A = 0; A < a.children.length; A++) if ("possibleWinInfo" == a.children[A].name || "possibleWinText" == a.children[A].name) a.children[A].anchor.x = .5, a.children[A].anchor.y = .5, k = "possibleWinText" == a.children[A].name ? Math.ceil(a.height - a.children[A].height / 2) - 6 : Math.ceil(a.height - a.children[A].height / 2) - 3, a.children[A].position.y = k, a.children[A].position.x = a.width / 2
            }
            a.getChildByName("possibleWinInfo").visible = !0;
            a.getChildByName("possibleWinText").visible = !0;
            d.getChildByName("possibleWinInfo").visible = !1;
            d.getChildByName("possibleWinText").visible =
                !1
        } else a.getChildByName("possibleWinInfo") && (a.getChildByName("possibleWinInfo").visible = !1, a.getChildByName("possibleWinText").visible = !1);
        t(a);
        a.visible = !0;
        setTimeout(function () {
            D = n = d = a = null
        }, p)
    }
}

function betsControls(r, E, q, w, e) {
    this.destroy = function () {
        b = g = null;
        for (var c in v) v[c] = null;
        v = null
    };
    var v = this, b = q;
    this.currentBet = function (c) {
        return v.isMaxBet() && -1 != E.toString().indexOf("MAX") && e ? parseFloat(e(c)) : parseFloat(b)
    };
    this.possibleBets = w;
    this.maxBet = function (c) {
        return -1 != E.toString().indexOf("MAX") && e ? e(c) : E
    };
    this.minBet = r;
    this.isMaxBet = function () {
        return b == w[w.length - 1]
    };
    var g;
    this.incrementBet = function () {
        b = v.isMaxBet() ? w[0] : (g = w.indexOf(b) + 1) <= w.length - 1 ? w[g] : w[w.length - 1]
    };
    this.decrementBet =
        function () {
            b = v.isMaxBet() ? w[w.length - 2] : 0 <= (g = w.indexOf(b) - 1) ? w[g] : w[w.length - 1]
        };
    this.setBet = function (c) {
        if (c && -1 != c.toString().indexOf("MAX")) b = c; else {
            var I = w.indexOf(parseFloat(c));
            !c || 0 > I || (b = c)
        }
    }
}

function FLGLog(r, E) {
    this.destroy = function () {
        e = w = null;
        for (var v in q) q[v] = null;
        q = null
    };
    var q = this;
    this.messages = [];
    this.limit = r;
    this.log = function (v, b, g) {
        this.messages.length == this.limit && this.messages.shift();
        this.messages.push({text: v, type: g});
        w(v, g, b)
    };
    var w = function (v, b, g) {
        $.fancybox({
            content: '<div style="font-family: Arial Bold;text-align: center;display: table-cell;vertical-align: middle;">' + v + "</div>",
            autoCenter: !0,
            autoSize: !0,
            maxWidth: "320px",
            maxHeight: "120px",
            minHeight: "50px",
            scrolling: "auto",
            type: "html",
            afterClose: function () {
                g && g()
            }
        })
    }, e = function (v, b) {
        mainLocalizator.currentLang();
        v = localStorage.getItem("randomID");
        v || (v = Math.floor(999999999999 * Math.random()), localStorage.setItem("randomID", v))
    };
    this.setStats = e;
    this.sendRouletteStat = v => {
        JSON.stringify(v)
    }
}

function FLGAccount(r, E, q) {
    this.destroy = function () {
        q.stage.off("changeBalance", v);
        v = null;
        w.events.removeAllListeners();
        ja = X = k = d = L = ea = P = U = N = S = K = J = M = C = z = m = l = f = A = D = n = a = F = y = B = h = x = u = G = I = c = g = null;
        ma.destroy();
        b = ma = null;
        for (var H in w) w[H] = null;
        w = null
    };
    var w = this, e, v = function (H) {
        p || (H /= 100, c = H == c + G ? H - G : H, m && (e ? m.getChildByName("text" + m.name).text = mainLocalizationTable.cash + ": " + formatFLGNums(c) : (m.getChildByName("text" + m.name).text = formatFLGNums(c), z.position.x = m.getChildByName("text" + m.name).width + 10),
            z.getChildByName("text" + z.name).text = APIManager.getAPICurrency(clientInfoGlobal.name_en + ""), q.renderManager.needUpdateRender = !0), w.events.emit("onBalance", c))
    };
    q.stage.on("changeBalance", v);
    var b = FLGUtils.staticRootPath + "libs/FLGUtils/resources/";
    this.resources = [["acc_back", b + "Account/acc-back.png"], ["acc_back_pressed", b + "Account/acc-back2.png"], ["acc_refresh", b + "Account/acc-refresh.png"], ["acc_refresh_pressed", b + "Account/acc-refresh2.png"], ["acc_stake", b + "Account/acc-stake.png"], ["acc_stake_pressed",
        b + "Account/acc-stake2.png"], ["acc_bg", b + "Account/bottom/bg-acc.png"], ["acc_settings", b + "Account/bottom/settings-acc.png"], ["vid_expand", b + "Video/ExpandW.png"], ["vid_collapse", b + "Video/CollapseW.png"], ["vid_sound", b + "audio/sound_icon.png"], ["vid_mute", b + "audio/mute_icon.png"]];
    var g = function () {
        I(clientInfoGlobal.balance)
    };
    this.events = new PIXI.utils.EventEmitter;
    var c, I = function (H) {
        if (!arguments.length) return c;
        c = H / 100;
        w.events.emit("onBalance", c);
        void 0 != m && (e ? m.getChildByName("text" + m.name).text =
            mainLocalizationTable.cash + ": " + formatFLGNums(c) : (m.getChildByName("text" + m.name).text = formatFLGNums(c), z.position.x = m.getChildByName("text" + m.name).width + 10), z.getChildByName("text" + z.name).text = APIManager.getAPICurrency(clientInfoGlobal.name_en + ""));
        q.renderManager.needUpdateRender = !0
    };
    this.balance = function () {
        return c
    };
    var G = 0, u = function (H, R) {
        if (!arguments.length) return G;
        if (0 > c - H && !R) return q.logService.log(mainLocalizationTable.balanceError), -1;
        G = 0 == H ? 0 : G + H;
        w.events.emit("onBet", G);
        void 0 != M &&
        (e ? M.getChildByName("text" + M.name).text = mainLocalizationTable.totalBet + ": " + formatFLGNums(G) : (M.getChildByName("text" + M.name).text = formatFLGNums(G), C.visible = 0 != G, M.visible = 0 != G));
        R || I(100 * (c - H));
        q.renderManager.needUpdateRender = !0
    };
    this.totalBet = u;
    var x = 0, h = function (H) {
        if (!arguments.length) return x;
        x = H;
        void 0 != K && (K.getChildByName("text" + K.name).text = formatFLGNums(x), J.visible = !1, K.visible = !1);
        q.renderManager.needUpdateRender = !0
    };
    this.lastWin = h;
    var B = 0, y = function (H) {
        if (!arguments.length) return B;
        B = H;
        w.events.emit("onWin", B);
        void 0 != n && (e ? n.children[0].getChildByName("text" + n.name).text = mainLocalizationTable.win + ": " + formatFLGNums(B) : n.children[1].getChildByName("text" + n.name).text = formatFLGNums(B), n.visible = 0 != H);
        q.renderManager.needUpdateRender = !0
    };
    this.totalWin = y;
    var F = 0, a = function (H) {
        if (!arguments.length) return F;
        F = H;
        w.events.emit("onMaxWin", F);
        void 0 != A && (e ? A.children[0].getChildByName("text" + A.name).text = mainLocalizationTable.maxWin + ": " + formatFLGNums(F, !0) : (A.children[1].getChildByName("text" +
            A.name).text = formatFLGNums(F), A.visible = 0 != H));
        q.renderManager.needUpdateRender = !0
    };
    this.maxWin = a;
    this.setWinTextVisible = function (H) {
        H ? (u(0), y(0)) : (a(0), 0 != G && h(0));
        e && (A.visible = H);
        p = !H;
        q.renderManager.needUpdateRender = !0
    };
    var d, k, t, p = !1;
    this.winToBalanceAnimation = function (H, R, Q, W, ca, da, Y) {
        da = da ? da : 0;
        if (0 == da && 0 != B && 0 != B - da) {
            var V = ca.scale ? ca.scale : 1;
            d ? (ca.withImages || (k.text = formatFLGNums(B - da)), d.texture = W, Y && (t.text = formatFLGNums(G))) : (d = new PIXI.Sprite(W), d.name = "winAnimationSprite", d.position.set(Q.x,
                Q.y), d.anchor.set(.5, .5), d.alpha = 0, ca.withImages ? k = new PIXI.Container : (k = new PIXI.Text(formatFLGNums(B - da), ca), k.position.y = 36, k.anchor.set(.5, .5), "customize" == ca.align && (k.position.y = ca.posY)), d.addChild(k), Y && (t = new PIXI.Text(formatFLGNums(G), Y), t.position.y = -40, t.anchor.set(.5, .5), d.addChild(t)), q.stage.addChild(d));
            ca.withImages && utils.displayTextFromTextures(q, k, formatFLGNums(B - da));
            d.scale.set(.67 * V, .67 * V);
            q.renderManager.animationTweenInc();
            E.playSound("achievement");
            (new TWEEN.Tween({
                startScaleX: d.scale.x,
                startScaleY: d.scale.y, startOpacity: d.alpha
            })).to({
                startScaleX: V,
                startScaleY: V,
                startOpacity: 1
            }, 400).easing(TWEEN.Easing.Exponential.Out).onStart(function () {
                E.playSound("coins")
            }).onUpdate(function () {
                d && (d.scale.set(this.startScaleX, this.startScaleY), d.alpha = this.startOpacity)
            }).onComplete(function () {
                d && (q.renderManager.animationTweenDec(), setTimeout(function () {
                    d && (q.renderManager.animationTweenInc(), (new TWEEN.Tween({
                        startWin: B,
                        startBalance: c
                    })).to({startWin: 0, startBalance: c + B}, R).onUpdate(function () {
                        void 0 !=
                        n && (e ? n.children[0].getChildByName("text" + n.name).text = mainLocalizationTable.win + ": " + formatFLGNums(this.startWin) : n.children[1].getChildByName("text" + n.name).text = formatFLGNums(this.startWin));
                        void 0 != m && (e ? m.getChildByName("text" + m.name).text = mainLocalizationTable.cash + ": " + formatFLGNums(this.startBalance) : (m.getChildByName("text" + m.name).text = formatFLGNums(this.startBalance), z.position.x = m.getChildByName("text" + m.name).width + 10), z.getChildByName("text" + z.name).text = APIManager.getAPICurrency(clientInfoGlobal.name_en +
                            ""));
                        w.events.emit("onBalance", this.startBalance);
                        w.events.emit("onWin", this.startWin)
                    }).onComplete(function () {
                        d && (I(100 * (c + B)), h(B), q.renderManager.animationTweenDec())
                    }).start())
                }, H - R - 400), setTimeout(function () {
                    d && (q.renderManager.animationTweenInc(), (new TWEEN.Tween({
                        startScaleX: d.scale.x,
                        startScaleY: d.scale.y,
                        startOpacity: d.alpha
                    })).to({
                        startScaleX: 1.3 * V,
                        startScaleY: 1.3 * V,
                        startOpacity: 0
                    }, 400).easing(TWEEN.Easing.Exponential.Out).onUpdate(function () {
                        d && (d.scale.set(this.startScaleX, this.startScaleY),
                            d.alpha = this.startOpacity)
                    }).onComplete(function () {
                        d && q.renderManager.animationTweenDec()
                    }).start())
                }, H - 400))
            }).start()
        }
    };
    var n, D, A, f, l, m, z, C, M, J, K, S, N, U, P, ea, L;
    this.updateAccountText = function () {
        l.getChildByName("text" + l.name).text = mainLocalizationTable.balance + ":";
        e ? (m.getChildByName("text" + m.name).text = mainLocalizationTable.cash + ": " + formatFLGNums(c), A.children[0].getChildByName("text" + A.name).text = mainLocalizationTable.maxWin + ": " + formatFLGNums(F), n.children[0].getChildByName("text" + n.name).text =
            mainLocalizationTable.win + ": " + formatFLGNums(B), M.getChildByName("text" + M.name).text = mainLocalizationTable.totalBet + ": " + formatFLGNums(G)) : (m.position.x = l.position.x + l.getChildByName("text" + l.name).width + 5, z.position.x = m.getChildByName("text" + m.name).width + 10, A.getChildByName("text" + A.name).text = mainLocalizationTable.maxWin + ":", f.position.x = A.getChildByName("text" + A.name).width + 5, n.getChildByName("text" + n.name).text = mainLocalizationTable.win + ":", D.position.x = n.getChildByName("text" + n.name).width +
            5, C.getChildByName("text" + C.name).text = mainLocalizationTable.totalBet + ":", M.position.x = C.position.x + C.getChildByName("text" + C.name).width + 5, J.getChildByName("text" + J.name).text = mainLocalizationTable.lastWin + ":", J.position.x = C.position.x + C.getChildByName("text" + C.name).width, K.position.x = J.position.x + 5, N.getChildByName("text" + N.name).text = mainLocalizationTable.myBets);
        q.renderManager.needUpdateRender = !0
    };
    this.drawAccount = function (H, R, Q, W, ca) {
        function da() {
            P = q.createButton(ca ? ca : q.stage, 0, q.canvasSize.height,
                "acc_bg");
            P.anchor.set(0, 1);
            var V = {font: "bold 24px Arial Narrow", fill: "#cccccc"};
            m = q.createButton(P, 770, -18, void 0, {text: "", align: "right", style: V}, function (O, fa) {
                O.interactive = !1;
                O.children[0].style = {font: V.font, fill: "#ffffff"};
                O.children[1].children[0].style = {font: V.font, fill: "#ffffff", align: "center"};
                updateBalance(function () {
                    O.interactive = !0;
                    O.children[0].style = V;
                    O.children[1].children[0].style = {font: V.font, fill: V.fill, align: "center"};
                    q.renderManager.needUpdateRender = !0
                });
                fa.stopped = !0;
                E.playSound("buttonClick");
                q.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (O) {
                O.children[0].style = {font: V.font, fill: "#ffffff"};
                O.children[1].children[0].style = {font: V.font, fill: "#ffffff", align: "center"};
                q.renderManager.needUpdateRender = !0
            }, function (O) {
                O.children[0].style = V;
                O.children[1].children[0].style = {font: V.font, fill: V.fill, align: "center"};
                q.renderManager.needUpdateRender = !0
            });
            z = q.createButton(m, 6, 0, void 0, {
                text: "",
                align: "left",
                style: {font: V.font, fill: V.fill, align: "center"}
            });
            APIManager.isAPIUser() && z.scale.set(.5,
                .5);
            I(100 * c);
            A = q.createButton(P, 1106, -18);
            f = q.createButton(A, 0, 0, void 0, {text: "", align: "left", style: V});
            a(0);
            n = q.createButton(P, 1106, -18);
            D = q.createButton(n, 0, 0, void 0, {text: "", align: "left", style: V});
            y(0);
            M = q.createButton(P, 960, -18, void 0, {text: "", align: "center", style: V});
            u(0);
            Q && "Poker" === Q.gameKind || (ea = q.createButton(P, 92, -18, void 0, {
                text: mainLocalizationTable.autoPlay.toUpperCase(),
                align: "left",
                style: V
            }, function (O, fa) {
                O.children[0].style = {font: V.font, fill: "#ffffff"};
                fa.stopped = !0;
                E.playSound("buttonClick");
                ma.changeVisible();
                q.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (O) {
                O.children[0].style = {font: V.font, fill: "#ffffff"};
                q.renderManager.needUpdateRender = !0
            }, function (O) {
                O.children[0].style = V;
                q.renderManager.needUpdateRender = !0
            }));
            if ("Roulette" == Q.gameKind || "Roulette4Sasha" == Q.gameKind || "RedLottery" == Q.gameKind || "off" === Q.autoplay) ea.visible = !1;
            L = q.createButton(P, 20, -18, "vid_sound", void 0, function (O, fa) {
                O.alpha = 1;
                fa.stopped = !0;
                E.playSound("buttonClick");
                E.isMuted() ? (O.texture = q.resourceLoader.resources.vid_sound.texture,
                    E.muteSound(!1)) : (O.texture = q.resourceLoader.resources.vid_mute.texture, E.muteSound(!0));
                q.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (O) {
                O.alpha = 1;
                q.renderManager.needUpdateRender = !0
            }, function (O) {
                O.alpha = .75;
                q.renderManager.needUpdateRender = !0
            });
            L.alpha = .75;
            L.anchor.set(.5, .5);
            L.scale.set(.42, .42)
        }

        if (W) e = W, da(); else {
            P = new PIXI.Graphics;
            P.beginFill(0);
            P.endFill;
            P.drawRoundedRect(H, R, q.canvasSize.width, 70, 1);
            q.stage.addChild(P);
            H = {font: "40px Arial", fill: "#bcbcbc"};
            var Y = {
                font: "36px Arial",
                fill: "#d99400"
            };
            l = q.createButton(P, 120, 35, void 0, {
                text: mainLocalizationTable.balance + ":",
                align: "left",
                style: H
            });
            m = q.createButton(P, 120 + l.getChildByName("text" + l.name).width + 5, 35, void 0, {
                text: "",
                align: "left",
                style: Y
            }, function (O, fa) {
                O.interactive = !1;
                O.children[0].style = {font: Y.font, fill: "#ffffff"};
                O.children[1].children[0].style = {font: Y.font, fill: "#ffffff", align: "center"};
                updateBalance(function () {
                    O.interactive = !0;
                    O.children[0].style = Y;
                    O.children[1].children[0].style = {font: Y.font, fill: Y.fill, align: "center"};
                    q.renderManager.needUpdateRender = !0
                });
                fa.stopped = !0;
                q.renderManager.needUpdateRender = !0
            }, void 0, void 0, function (O) {
                O.children[0].style = {font: Y.font, fill: "#d9b870"};
                O.children[1].children[0].style = {font: Y.font, fill: "#d9b870", align: "center"};
                q.renderManager.needUpdateRender = !0
            }, function (O) {
                O.children[0].style = Y;
                O.children[1].children[0].style = {font: Y.font, fill: Y.fill, align: "center"};
                q.renderManager.needUpdateRender = !0
            });
            z = q.createButton(m, 0, 0, void 0, {
                text: "", align: "left", style: {
                    font: Y.font, fill: Y.fill,
                    align: "center"
                }
            });
            APIManager.isAPIUser() && z.scale.set(.5, .5);
            I(100 * c);
            A = q.createButton(P, 600, 35, void 0, {text: mainLocalizationTable.maxWin + ":", align: "left", style: H});
            f = q.createButton(A, A.getChildByName("text" + A.name).width + 5, 0, void 0, {
                text: "",
                align: "left",
                style: Y
            });
            A.visible = !1;
            n = q.createButton(P, 715, 35, void 0, {text: mainLocalizationTable.win + ":", align: "left", style: H});
            D = q.createButton(n, n.getChildByName("text" + n.name).width + 5, 0, void 0, {
                text: formatFLGNums(y()),
                align: "left",
                style: Y
            });
            y(0);
            C = q.createButton(P,
                1165, 35, void 0, {text: mainLocalizationTable.totalBet + ":", align: "left", style: H});
            M = q.createButton(P, 1165 + C.getChildByName("text" + C.name).width + 5, 35, void 0, {
                text: formatFLGNums(u()),
                align: "left",
                style: Y
            });
            u(0);
            J = q.createButton(P, C.position.x + C.getChildByName("text" + C.name).width, 50, void 0, {
                text: mainLocalizationTable.lastWin + ":",
                align: "right",
                style: H
            });
            K = q.createButton(P, J.position.x + 5, 50, void 0, {text: formatFLGNums(h()), align: "left", style: Y});
            J.scale.set(.7, .7);
            K.scale.set(.7, .7);
            h(0);

            function V() {
                if (FLGUtils &&
                    FLGUtils.showGamerHistory) FLGUtils.showGamerHistory(); else if (GamerHistory) {
                    let O = document.getElementById("histWrap");
                    GamerHistory.setConfig({lg: clientInfoGlobal.lgn, lang: clientInfoGlobal.lang});
                    O.parentNode.classList.add("seen")
                }
            }

            (function () {
                function O(ha, ia, ka, na, pa) {
                    var la = new PIXI.Graphics;
                    la.lineStyle(na, "0x" + ha);
                    la.drawRoundedRect(0, 0, ia, ka, pa);
                    la.endFill();
                    return la.generateTexture(!1)
                }

                const fa = {fill: "#9B9B9B", font: "14pt Arial"}, ba = new PIXI.Text(mainLocalizationTable.myBets, fa),
                    Z = ba.width +
                        40;
                var aa = O("9B9B9B", Z, 46, 4, 3);
                aa = new PIXI.Sprite(aa);
                const T = (ha, ia, ka) => {
                    ha.setTexture(O(ia, Z, 46, 4, 3));
                    ha.children[0].setStyle(Object.assign({}, fa, {fill: ka}));
                    q.renderManager.needUpdateRender = !0
                };
                ba.position = {x: (aa.width - ba.width) / 2, y: (aa.height - ba.height) / 2};
                aa.alpha = .5;
                aa.buttonMode = !0;
                aa.interactive = !0;
                aa.position.x = 1820 - (Z + 40);
                aa.position.y = 10;
                aa.on("mouseover", ha => {
                    T(ha.target, "FFFFFF", "#ffffff")
                }).on("mouseout", ha => {
                    T(ha.target, "9B9B9B", "#9B9B9B")
                }).on("touchstart", function (ha) {
                    V();
                    T(ha.target,
                        "FFFFFF", "#ffffff")
                }).on("touchend", ha => {
                    T(ha.target, "9B9B9B", "#9B9B9B")
                }).on("click", ha => {
                    V()
                });
                aa.addChild(ba);
                P.addChild(aa)
            })();
            S = q.createButton(P, 1820, 12, "acc_refresh", void 0, function (O, fa) {
                O.texture = q.resourceLoader.resources[O.name + "_pressed"].texture;
                S.alpha = 1;
                fa.stopped = !0;
                q.renderManager.needUpdateRender = !0
            }, void 0, function (O) {
                O.texture = q.resourceLoader.resources[O.name].texture;
                O = new CustomEvent("refreshApp", {
                    detail: {
                        runConfig: Q.canvasId,
                        gameKind: Q.gameKind,
                        gameVariant: Q.gameVariant,
                        gameType: Q.gameType
                    }
                });
                document.dispatchEvent(O);
                q.renderManager && (q.renderManager.needUpdateRender = !0)
            });
            S.on("mouseover", function () {
                S.texture = q.resourceLoader.resources[S.name + "_pressed"].texture;
                S.alpha = .5;
                q.renderManager.needUpdateRender = !0
            }).on("mouseout", function () {
                S.texture = q.resourceLoader.resources[S.name].texture;
                S.alpha = 1;
                q.renderManager.needUpdateRender = !0
            });
            U = q.createButton(P, 14, 8, "acc_back", void 0, function (O, fa) {
                O.texture = q.resourceLoader.resources[O.name + "_pressed"].texture;
                U.alpha = 1;
                q.gameIsStarted = !1;
                APIManager.isAPIUser() &&
                !APIManager.isAPIUserMenuMode() ? logout() : fullscreenFormFunc($("#game-form"), function () {
                    goToForm("backward", void 0, function (ba) {
                        window["remove" + ba.find("#game-form1").attr("runConfig") + "Object"]("game-form1", ba.find("#game-form1").attr("gameType"));
                        ba.find("#game-form1").attr({runConfig: "", gameType: ""})
                    })
                });
                fa.stopped = !0;
                q.renderManager.needUpdateRender = !0
            }, void 0, function (O) {
                O.texture = q.resourceLoader.resources[O.name].texture;
                q.renderManager.needUpdateRender = !0
            });
            U.on("mouseover", function () {
                U.texture =
                    q.resourceLoader.resources[U.name + "_pressed"].texture;
                U.alpha = .5;
                q.renderManager.needUpdateRender = !0
            }).on("mouseout", function () {
                U.texture = q.resourceLoader.resources[U.name].texture;
                U.alpha = 1;
                q.renderManager.needUpdateRender = !0
            })
        }
        APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && U && (U.visible = clientInfoGlobal.backurl && "" != clientInfoGlobal.backurl);
        "DEMO" == clientInfoGlobal.hall && 132 !== clientInfoGlobal.id_cur && (console.log("isBottom:", e, clientInfoGlobal.id_cur, 132 !== clientInfoGlobal.id_cur), e ||
        (l.visible = !1, N.visible = !1), m.visible = !1)
    };
    this.closeGame = function () {
        q.gameIsStarted = !1;
        APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() ? logout() : fullscreenFormFunc($("#game-form"), function () {
            goToForm("backward", void 0, function (H) {
                window["remove" + H.find("#game-form1").attr("runConfig") + "Object"]("game-form1", H.find("#game-form1").attr("gameType"));
                H.find("#game-form1").attr({runConfig: "", gameType: ""})
            })
        })
    };
    var X = null, ja = null;
    this.calculateWin = function (H, R, Q, W) {
        var ca = 0, da = 0, Y = 0, V = [];
        X = function () {
            if (ca <
                H.length) setTimeout(X, 500); else {
                y(da);
                if (H.length) {
                    var T, ha = [];
                    for (T = 0; T < V.length; T++) {
                        var ia = parseFloat(V[T].cf).toFixed(10) / 100;
                        36 <= ia && ha.push(ia)
                    }
                }
                Q && (Q(V), V = null)
            }
        };
        var O = {ul: "", up: "", oper: "info", payel: "allwin"}, fa = [], ba = {}, Z = 0, aa;
        for (aa = 0; aa < H.length; aa++) fa.push(H[aa].code), H[aa].id ? ba[H[aa].id.toString()] = H[aa] : ba[H[aa].code] = H[aa];
        ja = function () {
            O.key = localKey();
            O.codes = fa.join(",");
            $.ajax({
                type: "get", url: getUrl(), data: O, dataType: "json", success: function (T, ha, ia) {
                    Z++;
                    40 < Z && (q.logService.log(mainLocalizationTable.betError),
                        Y++);
                    T.key && 9 < parseFloat(T.key) && localKey(T.key);
                    if ("success" != T.status) "critical" == T.status ? q.logService.log(mainLocalizationTable.userInfoError, function () {
                        logout()
                    }, "critical") : "critical" == T.st || "doh8" == T.st ? 0 == Y && (q.logService.log(mainLocalizationTable.userInfoError, function () {
                        logout()
                    }, "critical"), Y++) : 0 == Y && (q.logService.log(mainLocalizationTable.betError), Y++); else if (T[R] && T[R].bet) {
                        fa = [];
                        for (var ka in T[R].bet) 1 < parseInt(T[R].bet[ka].st, 10) ? (ha = H[0].id ? ba[T[R].bet[ka].id.toString()] : ba[T[R].bet[ka].code.toString()],
                            "poker" == R ? (ia = ha.nm.toString(), ia == T[R].bet[ka].nm.substr(T[R].bet[ka].nm.length - ia.length) && (ha.win = parseInt(T[R].bet[ka].wn) / 100, da += ha.win, 0 < ha.win && V.push(T[R].bet[ka]))) : (ha.win = parseInt(T[R].bet[ka].wn) / 100, da += ha.win, 0 < ha.win && V.push(T[R].bet[ka])), ca++) : fa.push(T[R].bet[ka].code);
                        fa.length && setTimeout(ja, 1E3)
                    }
                }, error: function (T, ha, ia) {
                    0 == Y && (T = new FLGLog(20, W.canvasId), "function" === typeof relogin ? relogin(function () {
                        ja()
                    }) : T.log(mainLocalizationTable.connError, null, "critical"), Y++)
                }
            })
        };
        setTimeout(function () {
            H.length &&
            ja();
            X()
        }, 1E3)
    };
    this.placeBet = function (H, R, Q, W, ca) {
        if (W) if (H.code || H.id) u(H.summ, !0), W(H.code); else if ("DEMO" == clientInfoGlobal.hall && 132 !== clientInfoGlobal.id_cur && mainDemoLockManager.addGameToLock({
            game: Q.runconfig,
            tir: parseInt(R)
        })) W(void 0); else {
            if (H.length) {
                for (var da = [], Y = [], V = [], O = [], fa = [], ba = [], Z = parseInt(Q.serverName.slice(3, Q.serverName.length)), aa = 0; aa < H.length; aa++) da.push(H[aa].bet.join(";")), Y.push(H[aa].coef ? H[aa].coef : 0), V.push(100 * H[aa].summ), O.push(R), fa.push(Z), ca && ba.push(ca);
                R = {
                    ul: "",
                    up: "",
                    oper: "bet",
                    stp: 1,
                    stv: da.join("_"),
                    coe: Y.join("_"),
                    sum: V.join("_"),
                    itr: O.join("_"),
                    tri: 1,
                    sid: fa.join("_"),
                    che: "",
                    key: localKey()
                };
                R = APIManager.addApiDetailInfo(Q, R, H);
                ca && (R.game = ba.join("_"));
                ba = fa = O = V = Y = da = null
            } else R = {
                ul: "",
                up: "",
                oper: "bet",
                stp: 1,
                stv: H.bet.join(";"),
                coe: H.coef ? H.coef : 0,
                sum: 100 * H.summ,
                itr: R,
                tri: 1,
                sid: parseInt(Q.serverName.slice(3, Q.serverName.length)),
                che: "",
                key: localKey()
            }, R = APIManager.addApiDetailInfo(Q, R, H), ca && (R.game = ca);
            $.ajax({
                type: H.length ? "post" : "get", url: getUrl(),
                data: R, dataType: "json", success: function (T, ha, ia) {
                    if ("success" != T.status) "critical" == T.status ? updateUser() : "critical" == T.st || "doh8" == T.st ? q.logService.log(mainLocalizationTable.userInfoError, function () {
                        logout()
                    }, "critical") : q.logService.log(mainLocalizationTable.betError), W(void 0); else if (localKey(T.key), I(T.cltbal), H.length) {
                        ha = {srvBets: []};
                        T.tb && T.mb && parseInt(T.tb, 10) !== parseInt(T.mb, 10) && (ha.notAll = !0);
                        var ka = 0, na;
                        ia = parseInt(T[Q.appName].max, 10) - 1;
                        for (na = 0; 0 <= ia; ia--, na++) if (T[Q.appName].bet[ia +
                        ""]) {
                            var pa = parseInt(T[Q.appName].bet[ia + ""].sm, 10);
                            var la = T[Q.appName].bet[ia + ""].nm.split(";");
                            "" == la[la.length - 1] && la.pop();
                            var oa;
                            for (oa = 0; oa < la.length; oa++) la[oa] = parseInt(la[oa], 10);
                            la = {
                                summ: pa / 100,
                                bet: la,
                                winBets: [],
                                countWin: 0,
                                code: T.code,
                                id: T[Q.appName].bet[ia + ""].id
                            };
                            H[na].coef && (la.coef = H[na].coef);
                            ha.srvBets.push(la);
                            ka += pa
                        }
                        u(ka / 100, !0);
                        W(T.code, void 0, ha)
                    } else u(H.summ, !0), W(T.code, parseInt(T[Q.appName].bet[0].id, 10))
                }, error: function (T, ha, ia) {
                    '"st":"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0431\u0430\u043b\u0430\u043d\u0441\u0430"' ===
                    T.responseText || "\u041e\u0448\u0438\u0431\u043a\u0430#2.3 Reserv error" === T.responseText || '"error_id":10,"st":"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0431\u0430\u043b\u0430\u043d\u0441\u0430"' === T.responseText ? q.logService.log(mainLocalizationTable.balanceError) : q.logService.log(mainLocalizationTable.betError, redirectByLoginUrl, "critical");
                    W(void 0)
                }
            })
        }
    };
    this.placeFortuneBet = function (H, R, Q, W) {
        if (H && H.fortuneBetObjArr.length) if ("DEMO" == clientInfoGlobal.hall && mainDemoLockManager.addGameToLock({
            game: Q.runconfig,
            tir: parseInt(R)
        })) W(void 0); else if (H.code) u(H.fortuneBetObjArr.reduce(function (Z, aa) {
            return Z + aa.summ
        }, 0), !0), W(H.code); else {
            for (var ca = [], da = [], Y = [], V = [], O = [], fa = parseInt(Q.serverName.slice(3, Q.serverName.length)), ba = 0; ba < H.fortuneBetObjArr.length; ba++) ca.push(H.fortuneBetObjArr[ba].comb), da.push(Math.round(100 * H.fortuneBetObjArr[ba].coef)), Y.push(100 * H.fortuneBetObjArr[ba].summ), V.push(R), O.push(fa);
            R = {
                ul: "",
                up: "",
                oper: "bet",
                stp: 1,
                stv: ca.join(Q.betSeparator),
                coe: da.join(Q.betSeparator),
                sum: Y.join(Q.betSeparator),
                itr: V.join(Q.betSeparator),
                tri: 1,
                sid: O.join(Q.betSeparator),
                che: "",
                key: localKey()
            };
            R = APIManager.addApiDetailInfo(Q, R, H.fortuneBetObjArr);
            q.logService.sendRouletteStat({state: "send", stv: R.stv, coe: R.coe, sum: R.sum, apiBts: R.apiBts});
            $.ajax({
                type: "post", url: getUrl(), data: R, dataType: "json", success: function (Z, aa, T) {
                    if ("success" != Z.status) "critical" == Z.status ? updateUser() : "critical" == Z.st || "doh8" == Z.st ? q.logService.log(mainLocalizationTable.userInfoError, function () {
                        logout()
                    }, "critical") : (q.logService.log(mainLocalizationTable.betError),
                        W(-1)); else {
                        if (aa = Z["bets_" + Z.srv]) T = Object.entries(aa.bet || {}).reduce((ha, ia) => ha + Number(ia[1].sm), 0), q.logService.sendRouletteStat({
                            state: "receive",
                            bets: aa.max,
                            sum: T
                        });
                        localKey(Z.key);
                        I(Z.cltbal);
                        W && W(Z.code)
                    }
                }, error: function (Z, aa, T) {
                    '"st":"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0431\u0430\u043b\u0430\u043d\u0441\u0430"' === Z.responseText || "\u041e\u0448\u0438\u0431\u043a\u0430#2.3 Reserv error" === Z.responseText || '"error_id":10,"st":"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0431\u0430\u043b\u0430\u043d\u0441\u0430"' ===
                    Z.responseText ? q.logService.log(mainLocalizationTable.balanceError) : q.logService.log(mainLocalizationTable.betError, redirectByLoginUrl, "critical");
                    W(void 0)
                }
            });
            O = V = Y = da = ca = null
        }
    };
    this.placePokerBet = function (H, R, Q, W) {
        if (H && H.fortuneBetObjArr.length) if ("DEMO" == clientInfoGlobal.hall && mainDemoLockManager.addGameToLock({
            game: Q.runconfig,
            tir: parseInt(R)
        })) W(void 0, void 0); else if (H.code) u(H.fortuneBetObjArr.reduce(function (Z, aa) {
            return Z + aa.summ
        }, 0), !0), W(H.code, H.phase); else {
            for (var ca = [], da = [], Y = [], V =
                [], O = [], fa = parseInt(Q.serverName.slice(3, Q.serverName.length)), ba = 0; ba < H.fortuneBetObjArr.length; ba++) ca.push(H.fortuneBetObjArr[ba].comb), da.push(Math.round(100 * H.fortuneBetObjArr[ba].coef)), Y.push(Math.round(100 * H.fortuneBetObjArr[ba].summ)), V.push(R), O.push(fa);
            R = {
                ul: "",
                up: "",
                oper: "bet",
                stp: 1,
                stv: ca.join(Q.betSeparator),
                coe: da.join(Q.betSeparator),
                sum: Y.join(Q.betSeparator),
                itr: V.join(Q.betSeparator),
                tri: 1,
                sid: O.join(Q.betSeparator),
                che: "",
                key: localKey()
            };
            R = APIManager.addApiDetailInfo(Q, R, H.fortuneBetObjArr);
            $.ajax({
                type: "post", url: getUrl(), data: R, dataType: "json", success: function (Z, aa, T) {
                    if ("success" != Z.status) if ("critical" == Z.status) updateUser(); else if ("critical" == Z.st || "doh8" == Z.st) q.logService.log(mainLocalizationTable.userInfoError, function () {
                        logout()
                    }, "critical"); else if (Z.error_id) {
                        aa = mainLocalizationTable.errorTitle;
                        switch (Z.error_id) {
                            case 5:
                                aa = mainLocalizationTable.balanceError
                        }
                        q.logService.log(aa)
                    } else q.logService.log(mainLocalizationTable.betError), W(-1); else localKey(Z.key), I(Z.cltbal), W &&
                    W(Z.code, Z[Q.appName].bet[0].nm)
                }, error: function (Z, aa, T) {
                    '"st":"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0431\u0430\u043b\u0430\u043d\u0441\u0430"' === Z.responseText || "\u041e\u0448\u0438\u0431\u043a\u0430#2.3 Reserv error" === Z.responseText || '"error_id":10,"st":"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0431\u0430\u043b\u0430\u043d\u0441\u0430"' === Z.responseText ? q.logService.log(mainLocalizationTable.balanceError) : q.logService.log(mainLocalizationTable.betError,
                        redirectByLoginUrl, "critical");
                    W(void 0, void 0)
                }
            });
            O = V = Y = da = ca = null
        }
    };
    this.placeRoulette4kBet = function (H, R, Q, W) {
        if (H && H.fortuneBetObjArr.length) if (H.code) u(H.fortuneBetObjArr.reduce(function (ba, Z) {
            return ba + Z.summ
        }, 0), !0), W(H.code); else {
            var ca = [], da = [], Y = [], V = [], O = [];
            parseInt(Q.serverName.slice(3, Q.serverName.length));
            for (var fa = 0; fa < H.fortuneBetObjArr.length; fa++) ca.push(H.fortuneBetObjArr[fa].comb), da.push(100 * H.fortuneBetObjArr[fa].coef), Y.push(100 * H.fortuneBetObjArr[fa].summ), V.push(R), O.push(33);
            $.ajax({
                type: "post",
                url: getUrl(),
                data: {
                    ul: "",
                    up: "",
                    oper: "bet",
                    stp: 1,
                    stv: ca.join(Q.betSeparator),
                    coe: da.join(Q.betSeparator),
                    sum: Y.join(Q.betSeparator),
                    itr: V.join(Q.betSeparator),
                    tri: 1,
                    sid: O.join(Q.betSeparator),
                    che: "",
                    key: 1,
                    player: Q.gameType.slice(Q.gameType.length - 1, Q.gameType.length)
                },
                dataType: "json",
                success: function (ba, Z, aa) {
                    "success" != ba.status ? "critical" == ba.status ? relogin(function () {
                        w.placeRoulette4kBet(H, R, Q, W)
                    }) : "critical" == ba.st || "doh8" == ba.st ? relogin(function () {
                        w.placeRoulette4kBet(H, R,
                            Q, W)
                    }) : W(-1) : (localKey(ba.key), W && W(ba.code))
                },
                error: function (ba, Z, aa) {
                    '"st":"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0431\u0430\u043b\u0430\u043d\u0441\u0430"' === ba.responseText || "\u041e\u0448\u0438\u0431\u043a\u0430#2.3 Reserv error" === ba.responseText || '"error_id":10,"st":"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0431\u0430\u043b\u0430\u043d\u0441\u0430"' === ba.responseText ? q.logService.log(mainLocalizationTable.balanceError) : relogin(function () {
                        w.placeRoulette4kBet(H,
                            R, Q, W)
                    });
                    W(void 0)
                }
            });
            O = V = Y = da = ca = null
        }
    };
    this.removeRoulette4kBet = function (H, R, Q) {
        H && $.ajax({
            type: "get",
            url: getUrl(),
            data: {che: H, oper: "pay", player: R.gameType.slice(R.gameType.length - 1, R.gameType.length)},
            dataType: "json",
            success: function (W, ca, da) {
                if ("success" != W.status) "critical" == W.status ? relogin(function () {
                    w.removeRoulette4kBet(H, R, Q)
                }) : "critical" == W.st || "doh8" == W.st ? relogin(function () {
                    w.removeRoulette4kBet(H, R, Q)
                }) : Q(-1); else {
                    localKey(W.key);
                    I(W.cltbal);
                    for (da = ca = 0; da < parseInt(W[R.appName].max); da++) ca +=
                        parseInt(W[R.appName].bet[da + ""].sm);
                    Q && Q(W.code)
                }
            },
            error: function (W, ca, da) {
                '"st":"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0431\u0430\u043b\u0430\u043d\u0441\u0430"' === W.responseText || "\u041e\u0448\u0438\u0431\u043a\u0430#2.3 Reserv error" === W.responseText || '"error_id":10,"st":"\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0431\u0430\u043b\u0430\u043d\u0441\u0430"' === W.responseText ? q.logService.log(mainLocalizationTable.balanceError) :
                    relogin(function () {
                        w.removeRoulette4kBet(H, R, Q)
                    });
                Q(void 0)
            }
        })
    };
    g();
    var ma = new autoplayManager($("#" + r), E, function (H) {
        ea && (ea.children[0].text = H, q.renderManager.needUpdateRender = !0)
    });
    this.autoplayManager = ma;
    w.resources = w.resources.concat(ma.resources)
}

function FLGTimer() {
    var r, E, q, w, e, v = 0, b = 0;
    this.destroy = function () {
        e = w = q = E = r = null;
        clearTimeout(v);
        clearTimeout(b);
        c = I = G = b = v = null;
        for (var u in g) g[u] = null;
        g = null
    };
    var g = this, c = null;
    this.start = function (u, x, h, B, y, F) {
        c = function () {
            w = r - Date.now();
            w = Math.max(0, w);
            e = new Date(w);
            E = e.getUTCHours();
            q = e.getUTCMinutes();
            h(limit(1 - (w - 50) / I(x), 0, 1));
            100 > w ? (y && F && (b = setTimeout(F, w + 1E3 * y)), B && (v = setTimeout(B, w))) : v = setTimeout(c, 50)
        };
        y && (x.seconds = Math.max(0, x.seconds - y));
        r = Date.now() - I(u) + I(x) + 50;
        c()
    };
    var I = function (u) {
        return 1E3 *
            (60 * u.minutes + u.seconds)
    }, G = function (u) {
        return 9 >= u ? "0" + u : u
    };
    this.getTimerText = function () {
        return (E ? G(E) + ":" + G(q) : G(q)) + ":" + G(e.getUTCSeconds())
    };
    this.getLastSeconds = function () {
        return E ? 3600 * E + 60 * q + e.getUTCSeconds() : 60 * q + e.getUTCSeconds()
    }
}

function FLGVideo(r, E, q, w, e, v, b, g, c, I, G) {
    this.destroy = function () {
        D.remove();
        A.remove();
        f.remove();
        a.remove();
        a = f = A = D = null;
        I && ($(window).unbind("restartHls"), $(window).trigger("destroyHls"), $(window).unbind("destroyHls"));
        F = h = t = null;
        window.removeEventListener("resize", M);
        x.unbind("parentResized", M);
        J = M = C = z = m = l = x = null;
        for (var K in u) u[K] = null;
        u = null
    };
    var u = this, x = $("#" + e), h = {
        height: w,
        width: q,
        clientPosX: void 0,
        clientPosY: void 0,
        clientHeight: void 0,
        clientWidth: void 0,
        padding: void 0
    }, B = !1, y = parseInt($("#" +
        e + " canvas").css("z-index")), F = navigator.userAgent || navigator.vendor || window.opera;
    x.append('<div id="video' + e + '" style="z-index:' + (y + 1) + ';position:absolute;visible:hidden;" ' + (G ? 'class="' + G + '"' : "") + "></div>");
    var a = $("#video" + e), d = !1, k = isMobile.any ? createCloseButton(a) : !1;
    if (F.match(/iPad/i) || F.match(/iPhone/i) || F.match(/iPod/i)) {
        var t = $(b);
        d = !0
    } else F.match(/Android/i) ? (t = $(b), d = !0) : t = I ? $(b) : $(v);
    a.append(t);
    if (I) {
        var p = document.getElementById($(b).attr("id")), n = p.getElementsByTagName("source")[0].getAttribute("src");

        function K() {
            if (Hls.isSupported()) {
                $(window).unbind("restartHls");
                $(window).unbind("destroyHls");
                var S = new Hls;
                S.attachMedia(p);
                S.loadSource(n);
                S.on(Hls.Events.MANIFEST_PARSED, function (N, U) {
                    p.play();
                    u.setVisible(!0)
                });
                S.on(Hls.Events.ERROR, function (N, U) {
                    switch (U.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.log("network error");
                            setTimeout(function () {
                                $(window).trigger("destroyHls");
                                K()
                            }, 8E3);
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.log("MEDIA error");
                            S.recoverMediaError();
                            break;
                        default:
                            console.log("other error"),
                                $(window).trigger("destroyHls"), K()
                    }
                    return !1
                });
                $(window).bind("restartHls", function () {
                    console.log("RESTART");
                    p.currentTime += 100
                });
                $(window).bind("destroyHls", function () {
                    console.log("DESTROY");
                    S.destroy();
                    S = null
                })
            } else p.canPlayType("application/vnd.apple.mpegurl") && (p.src = n, p.addEventListener("loadedmetadata", function () {
                p.play();
                u.setVisible(!0)
            }))
        }

        K()
    }
    if (g && g.noVideoIcons) {
        var D = $("<div></div>");
        a.append(D);
        var A = $("<div></div>");
        a.append(A);
        var f = $("<div></div>")
    } else D = $('<div style="position:absolute; background: url(libs/FLGUtils/resources/Account/refresh.png) no-repeat 100% 100%; background-size: contain;opacity:0.6;"></div>'),
        D.hover(function () {
            $(this).css("opacity", 1)
        }, function () {
            $(this).css("opacity", .6)
        }), a.append(D), A = $('<div style="position:absolute; background: url(libs/FLGUtils/resources/Video/ExpandW.png) no-repeat 100% 100%; background-size: contain;opacity:0.6;"></div>'), A.hover(function () {
        $(this).css("opacity", 1)
    }, function () {
        $(this).css("opacity", .6)
    }), a.append(A), G = c.isMuted() ? "url(libs/FLGUtils/resources/audio/mute_icon.png)" : "url(libs/FLGUtils/resources/audio/sound_icon.png)", f = $('<div style="position:absolute; background: ' +
        G + ' no-repeat 100% 100%; background-size: contain;opacity:0.6;"></div>'), f.hover(function () {
        $(this).css("opacity", 1)
    }, function () {
        $(this).css("opacity", .6)
    });
    a.append(f);
    g && (g.borderURL && a.css({
        "background-image": "url(" + g.borderURL + ")",
        "background-repeat": "no-repeat",
        "background-position-x": "100%",
        "background-position-y": "100%",
        "background-size": "contain"
    }), g.clipPath && a.css({"-webkit-clip-path": g.clipPath, "clip-path": g.clipPath}));
    var l = function (K) {
        if (D) {
            A.stop();
            D.stop();
            f.stop();
            var S = h.clientHeight /
                w, N = 46 * S, U = 6 * S + N, P = 10 * S + N;
            S = (S * q - h.clientWidth) / 2;
            K ? (A.animate({
                left: S + h.clientWidth - h.padding - P + "px",
                top: h.clientHeight - h.padding - U + "px",
                height: N + "px",
                width: N + "px"
            }, 500, "easeOutExpo"), D.animate({
                left: S + h.clientWidth - h.padding - 2 * P + "px",
                top: h.clientHeight - h.padding - U + "px",
                height: N + "px",
                width: N + "px"
            }, 500, "easeOutExpo"), f.animate({
                right: S + h.clientWidth - h.padding - P + "px",
                top: h.clientHeight - h.padding - U + "px",
                height: N + "px",
                width: N + "px"
            }, 500, "easeOutExpo")) : (A.css({
                left: S + h.clientWidth - h.padding - P + "px", top: h.clientHeight -
                    h.padding - U + "px", height: N + "px", width: N + "px"
            }), D.css({
                left: S + h.clientWidth - h.padding - 2 * P + "px",
                top: h.clientHeight - h.padding - U + "px",
                height: N + "px",
                width: N + "px"
            }), f.css({
                right: S + h.clientWidth - h.padding - P + "px",
                top: h.clientHeight - h.padding - U + "px",
                height: N + "px",
                width: N + "px"
            }))
        }
    }, m = function () {
        c.playSound("buttonClick");
        D.remove();
        A.remove();
        f.remove();
        a.remove();
        a = f = A = D = null;
        I && ($(window).unbind("restartHls"), $(window).trigger("destroyHls"), $(window).unbind("destroyHls"));
        x.append('<div id="video' + e + '" style="z-index:' +
            (y + 1) + ';position:absolute;"></div>');
        a = $("#video" + e);
        if (F.match(/iPad/i) || F.match(/iPhone/i) || F.match(/iPod/i)) a.append(b); else if (F.match(/Android/i)) a.append(b); else if (I) {
            a.append(b);
            var K = document.getElementById($(b).attr("id")),
                S = K.getElementsByTagName("source")[0].getAttribute("src");

            function U() {
                if (Hls.isSupported()) {
                    $(window).unbind("restartHls");
                    $(window).unbind("destroyHls");
                    var P = new Hls;
                    P.attachMedia(K);
                    P.loadSource(S);
                    P.on(Hls.Events.MANIFEST_PARSED, function (ea, L) {
                        K.play()
                    });
                    P.on(Hls.Events.ERROR,
                        function (ea, L) {
                            switch (L.type) {
                                case Hls.ErrorTypes.NETWORK_ERROR:
                                    console.log("network error");
                                    setTimeout(function () {
                                        $(window).trigger("destroyHls");
                                        U()
                                    }, 8E3);
                                    break;
                                case Hls.ErrorTypes.MEDIA_ERROR:
                                    console.log("MEDIA error");
                                    P.recoverMediaError();
                                    break;
                                default:
                                    console.log("other error"), $(window).trigger("destroyHls"), U()
                            }
                            return !1
                        });
                    $(window).bind("restartHls", function () {
                        console.log("RESTART");
                        K.currentTime += 100
                    });
                    $(window).bind("destroyHls", function () {
                        console.log("DESTROY");
                        P.destroy();
                        P = null
                    })
                } else K.canPlayType("application/vnd.apple.mpegurl") &&
                (K.src = S, K.bind("loadedmetadata", function () {
                    K.play()
                }))
            }

            U()
        } else a.append(v);
        if (g && g.noVideoIcons) D = $("<div></div>"), a.append(D), A = $("<div></div>"), a.append(A), f = $("<div></div>"); else {
            D = $('<div style="position:absolute; background: url(libs/FLGUtils/resources/Account/refresh.png) no-repeat 100% 100%; background-size: contain;opacity:0.6;"></div>');
            D.hover(function () {
                $(this).css("opacity", 1)
            }, function () {
                $(this).css("opacity", .6)
            });
            D.click(m);
            a.append(D);
            var N = B ? "url(libs/FLGUtils/resources/Video/CollapseW.png)" :
                "url(libs/FLGUtils/resources/Video/ExpandW.png)";
            A = $('<div style="position:absolute; background: ' + N + ' no-repeat 100% 100%; background-size: contain;opacity:0.6;"></div>');
            N = null;
            A.hover(function () {
                $(this).css("opacity", 1)
            }, function () {
                $(this).css("opacity", .6)
            });
            a.append(A);
            N = c.isMuted() ? "url(libs/FLGUtils/resources/audio/mute_icon.png)" : "url(libs/FLGUtils/resources/audio/sound_icon.png)";
            f = $('<div style="position:absolute; background: ' + N + ' no-repeat 100% 100%; background-size: contain;opacity:0.6;"></div>');
            N = null;
            f.hover(function () {
                $(this).css("opacity", 1)
            }, function () {
                $(this).css("opacity", .6)
            });
            f.click(z)
        }
        a.append(f);
        g && (g.borderURL && a.css({
            "background-image": "url(" + g.borderURL + ")",
            "background-repeat": "no-repeat",
            "background-position-x": "100%",
            "background-position-y": "100%",
            "background-size": "contain"
        }), B ? g.fullscreenClipPath && a.css({
            "-webkit-clip-path": g.fullscreenClipPath,
            "clip-path": g.fullscreenClipPath
        }) : g.clipPath && a.css({"-webkit-clip-path": g.clipPath, "clip-path": g.clipPath}), g.maskPath && a.css({
            "-webkit-mask": g.maskPath,
            mask: g.maskPath
        }));
        g && g.noVideoIcons || (a.click(function () {
            B = !B;
            a.stop();
            C();
            var U = {
                left: h.clientPosX,
                top: h.clientPosY,
                width: h.clientWidth,
                height: h.clientHeight,
                padding: h.padding
            };
            k && (k.css("visibility", B ? "visible" : "hidden"), U.backgroundColor = B ? "#000" : "transparent", a.css("background-color", B ? "#000" : "transparent"));
            a.animate(U, 500, "easeOutExpo");
            g && g.noVideoIcons || (A.css("background-image", B ? "url(libs/FLGUtils/resources/Video/CollapseW.png)" : "url(libs/FLGUtils/resources/Video/ExpandW.png)"), l(!0))
        }),
            a.hover(function () {
                $(this).css("cursor", "pointer")
            }, function () {
                $(this).css("cursor", "default")
            }));
        M();
        return !1
    };
    D.click(m);
    var z = function (K) {
        if (K && !K.type) {
            if (document.getElementById("innerVideo" + e)) return document.getElementById("innerVideo" + e).muted ? document.getElementById("innerVideo" + e).muted = !1 : document.getElementById("innerVideo" + e).muted = !0, document.getElementById("innerVideo" + e).muted;
            if (document.getElementById("swfobj")) return document.getElementById("swfobj").muted ? document.getElementById("swfobj").muted =
                !1 : document.getElementById("swfobj").muted = !0, document.getElementById("swfobj").muted
        } else return c.playSound("buttonClick"), K = !c.isMuted(), f.css("background-image", K ? "url(libs/FLGUtils/resources/audio/mute_icon.png)" : "url(libs/FLGUtils/resources/audio/sound_icon.png"), c.muteSound(K), !1
    };
    this.muteAudio = z;
    f.click(z);
    var C = function () {
        var K = $("#" + e + " canvas");
        var S = 0 == parseInt(K.css("top")) ? "top" : "center";
        var N = K.attr("width"), U = parseFloat(K.css("width")), P = parseFloat(K.css("height"));
        N = U / N;
        g && B && (U =
            h.width * g.videoMaxScale * N, P = h.height * g.videoMaxScale * N);
        switch (S) {
            case "center":
                var ea = (x.width() - U) / 2;
                var L = (x.height() - P) / 2;
                break;
            case "top":
                ea = (x.width() - U) / 2, L = 0
        }
        B ? (h.clientPosX = ea - 1, h.clientPosY = L + parseInt(K.parent().css("padding-top")), h.clientHeight = P, h.clientWidth = U + 1, h.padding = g ? g.paddings * g.videoMaxScale * N : 0, g && g.fullscreenPosY && (h.clientPosY = g.fullscreenPosY * N + (x.height() - parseFloat(K.css("height"))) / 2 + parseInt(K.parent().css("padding-top"))), g && g.addOffsetX && (h.clientPosX += g.addOffsetX),
        g && g.fullscreenClipPath && a.css({
            "-webkit-clip-path": g.fullscreenClipPath,
            "clip-path": g.fullscreenClipPath
        })) : (h.clientPosX = r * N + ea, h.clientPosY = E * N + L + parseInt(K.parent().css("padding-top")), h.clientHeight = h.height * N, h.clientWidth = h.width * N, h.padding = g ? g.paddings * N : 0, g && g.clipPath && a.css({
            "-webkit-clip-path": g.clipPath,
            "clip-path": g.clipPath
        }));
        g && g.maskPath && a.css({"-webkit-mask": g.maskPath, mask: g.maskPath})
    }, M = function () {
        a.stop();
        C();
        a.css({
            left: h.clientPosX + "px", top: h.clientPosY + "px", height: h.clientHeight +
                "px", width: h.clientWidth + "px", padding: h.padding + "px"
        });
        l()
    };
    window.addEventListener("resize", M, !1);
    x.bind("parentResized", M);
    g && g.noVideoIcons || (a.click(function () {
        c.playSound("buttonClick");
        B = !B;
        a.stop();
        C();
        var K = {
            left: h.clientPosX,
            top: h.clientPosY,
            width: h.clientWidth,
            height: h.clientHeight,
            padding: h.padding
        };
        k && (k.css("visibility", B ? "visible" : "hidden"), K.backgroundColor = B ? "#000" : "transparent", a.css("background-color", B ? "#000" : "transparent"));
        a.animate(K, 500, "easeOutExpo");
        l(!0);
        A.css("background-image",
            B ? "url(libs/FLGUtils/resources/Video/CollapseW.png)" : "url(libs/FLGUtils/resources/Video/ExpandW.png)")
    }), a.hover(function () {
        $(this).css("cursor", "pointer")
    }, function () {
        $(this).css("cursor", "default")
    }));
    M();
    var J = function (K) {
        K ? a.css("visibility", "visible") : a.css("visibility", "hidden")
    };
    J(!1);
    this.setVisible = J;
    this.setFullscreenMode = function (K) {
        B = K;
        a.stop();
        C();
        g && (g.clipPath || g.fullscreenClipPath) && (K ? a.css({
                transition: "clip-path .55s cubic-bezier(0.645, 0.045, 0.355, 1)",
                "-webkit-transition": "-webkit-clip-path .55s cubic-bezier(0.645, 0.045, 0.355, 1)"
            }) :
            a.css({
                transition: "clip-path .5s cubic-bezier(0.645, 0.045, 0.355, 1)",
                "-webkit-transition": "-webkit-clip-path .5s cubic-bezier(0.645, 0.045, 0.355, 1)"
            }));
        a.animate({
            left: h.clientPosX,
            top: h.clientPosY,
            width: h.clientWidth,
            height: h.clientHeight,
            padding: h.padding
        }, 500, "easeInOutCubic")
    };
    this.setZIndex = function (K) {
        a.css("z-index", K ? 10001 : -1)
    };
    this.play = function () {
        d && t[0].play()
    };
    this.stop = function () {
        d && t[0].pause()
    };
    this.setScale = function (K) {
        a.css("-webkit-transform", "scaleY(" + K + ")");
        a.css("-moz-transform",
            "scaleY(" + K + ")");
        a.css("-ms-transform", "scaleY(" + K + ")");
        a.css("-o-transform", "scaleY(" + K + ")");
        a.css("transform", "scaleY(" + K + ")")
    }
}

function FLGJackpot(r, E) {
    this.destroy = function () {
        clearTimeout(v);
        null != x && (x = null);
        a = F = y = u = G = I = c = B = h = e = w = null;
        for (var k in q) q[k] = null;
        q = null
    };
    var q = this, w = FLGUtils.staticRootPath + "libs/FLGUtils/resources/";
    this.resources = [["jp_st_1_2", w + "Jackpot/jackpot-bg-1.png"], ["jp_st_3_4", w + "Jackpot/jackpot-bg-2.png"], ["jp_st_5_6", w + "Jackpot/jackpot-bg-3.png"], ["jp_st_7_8", w + "Jackpot/jackpot-bg-4.png"], ["jp_st_9_10", w + "Jackpot/jackpot-bg-5.png"], ["0_g", w + "GoldNums/number-0-min.png"], ["1_g", w + "GoldNums/number-1-min.png"],
        ["2_g", w + "GoldNums/number-2-min.png"], ["3_g", w + "GoldNums/number-3-min.png"], ["4_g", w + "GoldNums/number-4-min.png"], ["5_g", w + "GoldNums/number-5-min.png"], ["6_g", w + "GoldNums/number-6-min.png"], ["7_g", w + "GoldNums/number-7-min.png"], ["8_g", w + "GoldNums/number-8-min.png"], ["9_g", w + "GoldNums/number-9-min.png"], ["dot_g", w + "GoldNums/number-dot-min.png"]];
    var e = {}, v = 0, b, g = 0;
    this.updateJackpotData = function (k) {
        e && e.jp1 && (k.lastJP = e.jp1 / 100);
        e = k;
        c() && (y && (k = e.jp1 / 100, E && e.lastJP && e.lastJP < k && e.lastJP !== k ? (b = 1E3 *
            (e.t2 - E.tirTimeOffset) / E.updateInterval, b = parseInt(b), e.partOfDeltaJP = (k - e.lastJP) / b, y(11 > e.jps1 ? e.jps1 : 10, e.lastJP), v = setInterval(function () {
            try {
                g++, g > b ? (clearTimeout(v), g = 0) : y(11 > e.jps1 ? e.jps1 : 10, e.lastJP + e.partOfDeltaJP * g)
            } catch (t) {
                clearTimeout(v)
            }
        }, E.updateInterval)) : y(11 > e.jps1 ? e.jps1 : 10, k)), null != x && (G(), u()))
    };
    var c = function () {
        return e != {} && void 0 != e && void 0 != e.jp1
    }, I = function () {
        if (!c() || 0 == e.jp1sw || !e.jp1ll) return !1;
        if (1 === e.myjp) return !0;
        if (void 0 === e.myjp) for (var k in e.jp1ll) if (e.jp1ll[k].lgn ===
            clientInfoGlobal.lgn) return !0;
        return !1
    }, G = function () {
        B.children[0].text = formatFLGNums(e.jp1 / 100)
    }, u = function () {
        h.children[0].style = {
            font: "27px Arial Black", fill: function (k) {
                switch (k) {
                    case 0:
                    case 1:
                    case 2:
                        return x.texture = r.resourceLoader.resources.jp_st_1_2.texture, "#0048ff";
                    case 3:
                    case 4:
                        return x.texture = r.resourceLoader.resources.jp_st_3_4.texture, "#3c00ff";
                    case 5:
                    case 6:
                        return x.texture = r.resourceLoader.resources.jp_st_5_6.texture, "#7f00eb";
                    case 7:
                    case 8:
                        return x.texture = r.resourceLoader.resources.jp_st_7_8.texture,
                            "#dd00d5";
                    case 9:
                    case 10:
                        return x.texture = r.resourceLoader.resources.jp_st_9_10.texture, "#ff0000"
                }
            }(parseInt(11 > e.jps1 ? e.jps1 : 10))
        };
        B.children[0].style.fill = h.children[0].style.fill
    }, x = null, h = null, B = null;
    this.drawJackpot = function (k, t, p) {
        if (c()) {
            var n = void 0;
            p && (n = p);
            x = r.createButton(n, 14, 12);
            x.position.x = k;
            x.position.y = t;
            h = r.createButton(x, 16, 18, void 0, {
                text: "JACKPOT:",
                align: "left",
                style: {font: "27px Arial Black", fill: "#000000"}
            });
            B = r.createButton(x, 268, 18, void 0, {
                text: "", align: "center", style: {
                    font: "27px Arial Black",
                    fill: "#000000"
                }
            });
            G();
            u()
        }
    };
    var y;
    this.drawCustomJackpot = function (k) {
        y = k
    };
    var F, a, d;
    this.jpWin = function () {
        return I() ? parseInt(e.winjp1) / 100 : 0
    };
    this.drawJackpotWin = function (k, t, p, n, D) {
        function A(C, M) {
            function J(N, U) {
                N = new PIXI.Sprite(r.resourceLoader.resources[N].texture);
                N.anchor.y = .5;
                N.position.x = S;
                U && (N.position.y = 26);
                C.addChild(N);
                S += N.width + 6
            }

            var K, S = 0;
            C.removeChildren();
            for (K = 0; K < M.length; K++) switch (M[K]) {
                case "0":
                    J("0_g");
                    break;
                case "1":
                    J("1_g");
                    break;
                case "2":
                    J("2_g");
                    break;
                case "3":
                    J("3_g");
                    break;
                case "4":
                    J("4_g");
                    break;
                case "5":
                    J("5_g");
                    break;
                case "6":
                    J("6_g");
                    break;
                case "7":
                    J("7_g");
                    break;
                case "8":
                    J("8_g");
                    break;
                case "9":
                    J("9_g");
                    break;
                case ".":
                    J("dot_g", !0);
                    break;
                case " ":
                    S += 40
            }
            C.position.x = -S / 2 - 6
        }

        if (I()) {
            var f = parseInt(e.winjp1) / 100, l = utils.formatNumber(n ? n - f : 0);
            f = utils.formatNumber(f);
            var m = new PIXI.Text(mainLocalizationTable.youWin, {font: "bold 80px Arial", fill: "#ffffff"}),
                z = (n = !n && D ? !0 : !1) ? 35 : 220;
            F ? (F.texture = n ? D : p, a.position.y = z) : (F = new PIXI.Sprite(n ? D : p), F.position.set(t.x, t.y),
                F.anchor.set(.5, .5), F.alpha = 0, a = new PIXI.Container, a.position.y = z, a.scale.set(.7, .7), F.addChild(a), d = new PIXI.Container, d.position.y = 10, d.scale.set(.8, .8), F.addChild(d), r.stage.addChild(F), m.name = "winLabel", F.addChild(m), m.anchor.set(.5, .5), m.position.y = -100);
            d.visible = n ? !1 : !0;
            F.getChildByName("winLabel").text = n ? "" : mainLocalizationTable.youWin;
            F.scale.set(.67, .67);
            A(a, f);
            A(d, l);
            d.position.x = -d.width / 2;
            a.position.x = -a.width / 2 + 10;
            r.renderManager.animationTweenInc();
            (new TWEEN.Tween({
                startScaleX: F.scale.x,
                startScaleY: F.scale.y, startOpacity: F.alpha
            })).to({
                startScaleX: 1,
                startScaleY: 1,
                startOpacity: 1
            }, 400).easing(TWEEN.Easing.Exponential.Out).onUpdate(function () {
                F && (F.scale.set(this.startScaleX, this.startScaleY), F.alpha = this.startOpacity)
            }).onComplete(function () {
                F && (r.renderManager.animationTweenDec(), setTimeout(function () {
                    F && (r.renderManager.animationTweenInc(), (new TWEEN.Tween({
                        startScaleX: F.scale.x,
                        startScaleY: F.scale.y,
                        startOpacity: F.alpha
                    })).to({
                        startScaleX: 1.33,
                        startScaleY: 1.33,
                        startOpacity: 0
                    }, 400).easing(TWEEN.Easing.Exponential.Out).onUpdate(function () {
                        F &&
                        (F.scale.set(this.startScaleX, this.startScaleY), F.alpha = this.startOpacity)
                    }).onComplete(function () {
                        F && r.renderManager.animationTweenDec()
                    }).start())
                }, k - 400))
            }).start()
        }
    }
}

function hexToRgb(r) {
    return (r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r)) ? {
        r: parseInt(r[1], 16),
        g: parseInt(r[2], 16),
        b: parseInt(r[3], 16)
    } : null
}

function rgbToHex(r, E, q) {
    return "#" + (16777216 + (r << 16) + (E << 8) + q).toString(16).slice(1)
}

function limit(r, E, q) {
    return Math.min(q, Math.max(E, r))
}

function formatFLGNums(r, E) {
    return numberFormat(r, {thousands_sep: " ", dec_point: ".", needZeros: E, decimals: 2})
}

function numberFormat(r, E) {
    function q(v, b) {
        var g = {}, c;
        for (c in v) g[c] = "undefined" !== typeof b[c] ? b[c] : v[c];
        return g
    }

    function w(v, b) {
        if (3 >= v.length) return v;
        for (var g = "", c = 0, I = v.length - 1; 0 <= I; I--) {
            var G = v.substr(I, 1);
            0 != c % 3 || 0 == c || isNaN(parseFloat(G)) || (g = b + g);
            g = G + g;
            c++
        }
        return g
    }

    if ("number" !== typeof r && (r = parseFloat(r), isNaN(r))) return !1;
    var e = {before: "", after: "", decimals: 2, dec_point: ".", thousands_sep: ",", needZeros: !0};
    E = E && "object" === typeof E ? q(e, E) : e;
    r = r.toFixed(E.decimals);
    -1 != r.indexOf(".") ? (r =
        r.split("."), r[1] = E.needZeros || "00" != r[1] ? E.dec_point + r[1] : "", r = w(r[0], E.thousands_sep) + r[1]) : r = w(r, E.thousands_sep);
    return E.before + r + E.after
}

function swapElements(r, E) {
    var q = r.parentNode;
    var w = r.nextSibling;
    var e = E.parentNode;
    var v = E.nextSibling;
    q.insertBefore(E, w);
    e.insertBefore(r, v)
}

function demoLockManager() {
    function r() {
        localStorage.setItem("LG", JSON.stringify(e))
    }

    this.destroy = function () {
        w = q = null;
        for (var v = 0; v < e.length; v++) e[v] = null;
        e = null;
        for (v in E) E[v] = null;
        E = null
    };
    var E = this, q = 10, w = 0, e = [];
    localStorage.LG && (e = JSON.parse(localStorage.LG));
    this.addGameToLock = function (v) {
        function b() {
            $.fancybox({
                content: '<div style="font-family: Arial Bold;text-align: center;display: table-cell;vertical-align: middle;">' + mainLocalizationTable.demoBetError + "</div>",
                autoCenter: !0,
                autoSize: !0,
                maxWidth: "320px",
                maxHeight: "120px",
                minHeight: "50px",
                scrolling: "auto",
                type: "html"
            })
        }

        for (var g = 0; g < e.length; g++) if (e[g].game == v.game) {
            void 0 != e[g].betCount ? 5 >= e[g].betCount && (e[g].betCount += 1) : e[g].betCount = 1;
            r();
            if (v.tir == e[g].tir) return 5 < e[g].betCount ? (b(), !0) : !1;
            if (v.tir - e[g].tir <= w) return e[g].betCount = 1, r(), !1;
            if (v.tir - e[g].tir > q + w) return e[g].tir = v.tir, e[g].betCount = 1, r(), !1;
            b();
            return !0
        }
        e.push(v);
        e[e.length - 1].betCount = 1;
        r();
        return !1
    };
    this.clearLockedGames = function () {
        for (var v = 0; v < e.length; v++) e[v] =
            null;
        e = null;
        localStorage.removeItem("LG");
        e = []
    }
}

function renderManager() {
    this.destroy = function () {
        E = null;
        for (var q in r) r[q] = null;
        r = null
    };
    var r = this;
    this.needUpdateRender = this.animationClipPlaying = !1;
    var E = 0;
    this.animationTweenInc = function () {
        E++
    };
    this.animationTweenDec = function () {
        E--;
        0 > E && (E = 0)
    };
    this.animationTweenPlaying = function () {
        return 0 < E
    };
    this.reset = function () {
        r.animationClipPlaying = !1;
        r.needUpdateRender = !1;
        E = 0
    }
}

function getAndroidVersion(r) {
    r = (r || navigator.userAgent).toLowerCase();
    return (r = r.match(/android\s([0-9\.]*)/)) ? r[1] : !1
}

function isEmptyObj(r) {
    for (var E in r) return !1;
    return !0
}

function hotcoldComponent(r, E, q, w, e, v, b, g, c) {
    this.destroy = function () {
        B = h = x = u = null;
        for (var a in G.hot) G.hot[a] = null;
        G.hot = null;
        for (a in G.cold) G.cold[a] = null;
        G = G.cold = null;
        for (a in I) I[a] = null;
        I = null
    };
    var I = this, G = {hot: {}, cold: {}}, u = new PIXI.Sprite(e);
    this.hotcoldContainer = u;
    var x = new PIXI.Container;
    u.addChild(x);
    var h = new PIXI.Container;
    u.addChild(h);
    var B = function (a, d, k, t) {
        var p = new PIXI.Text(t["0"], v);
        t = new PIXI.Text(t["1"], v);
        var n = new PIXI.Text("X", v);
        t.scale.set(.5, .5);
        n.scale.set(.5, .5);
        p.addChild(t);
        p.addChild(n);
        p.anchor.x = .5;
        p.anchor.y = .5;
        t.anchor.x = .5;
        t.anchor.y = .5;
        n.anchor.x = .5;
        n.anchor.y = .5;
        k.w > k.h ? (p.position.x = k.x - k.w / 6 + 2, p.position.y = k.y, t.position.x = k.w / 2 - 2, t.position.y = -k.h / 4 + 1, n.position.x = k.w / 2 - 2, n.position.y = k.h / 4 - 1) : (p.position.x = k.x, p.position.y = k.y - k.h / 6, t.position.x = -k.w / 4, t.position.y = k.h / 2, n.position.x = k.w / 4, n.position.y = k.h / 2);
        p.name = d;
        a.addChild(p);
        return p
    };
    u.position.x = q;
    u.position.y = w;
    u.interactive = !1;
    u.name = "HotCold";
    E.addChild(u);
    for (var y in r.cold) {
        if (!b.cold[y]) break;
        G.cold[y] = B(h, "cold" + parseInt(y), b.cold[y], r.cold[y])
    }
    for (var F in r.hot) {
        if (!b.hot[F]) break;
        G.hot[F] = B(x, "hot" + parseInt(F), b.hot[F], r.hot[F])
    }
    g && g(null, r);
    c.needUpdateRender = !0;
    this.update = function (a) {
        var d = {cold: {}, hot: {}}, k = {}, t = {}, p;
        for (p in G.cold) if (d.cold[p] = G.cold[p].text, a.cold[p]["0"] != G.cold[p].text || a.cold[p]["1"] != G.cold[p].children[0].text) k[p] = {
            0: void 0,
            1: void 0
        }, k[p]["0"] = a.cold[p]["0"], k[p]["1"] = a.cold[p]["1"];
        for (var n in G.hot) if (d.hot[n] = G.hot[n].text, a.hot[n]["0"] != G.hot[n].text ||
        a.hot[n]["1"] != G.hot[n].children[0].text) t[n] = {
            0: void 0,
            1: void 0
        }, t[n]["0"] = a.hot[n]["0"], t[n]["1"] = a.hot[n]["1"];
        isEmptyObj(k) || (c.animationTweenInc(), (new TWEEN.Tween(h)).to({alpha: 0}, 400).onComplete(function () {
            if (I) {
                c.animationTweenDec();
                for (var f in k) if (k[f]["0"] != G.cold[f].text || k[f]["1"] != G.cold[f].children[0].text) G.cold[f].text = a.cold[f]["0"], G.cold[f].children[0].text = a.cold[f]["1"];
                c.animationTweenInc();
                (new TWEEN.Tween(h)).to({alpha: 1}, 400).onComplete(function () {
                    c.animationTweenDec()
                }).start()
            }
        }).start());
        isEmptyObj(t) || (c.animationTweenInc(), (new TWEEN.Tween(x)).to({alpha: 0}, 400).onComplete(function () {
            if (I) {
                c.animationTweenDec();
                for (var f in t) if (t[f]["0"] != G.hot[f].text || t[f]["1"] != G.hot[f].children[0].text) G.hot[f].text = a.hot[f]["0"], G.hot[f].children[0].text = a.hot[f]["1"];
                c.animationTweenInc();
                (new TWEEN.Tween(x)).to({alpha: 1}, 400).onComplete(function () {
                    c.animationTweenDec()
                }).start()
            }
        }).start());
        if (!g || isEmptyObj(k) && isEmptyObj(t)) {
            for (var D in d.cold) d[D] = null;
            d.cold = null;
            for (var A in d.hot) d[A] =
                null;
            d = d.hot = null
        } else g(d, a)
    }
}

function autoplayManager(r, E, q) {
    this.destroy = function () {
        for (var u in c) c[u].remove(), c[u] = null;
        I = c = null;
        window.removeEventListener("resize", G);
        r.unbind("parentResized", G);
        G = null;
        for (u in e) e[u] = null;
        v = b = e = null;
        g.destroy();
        g = null;
        for (u in w) w[u] = null;
        w = null
    };
    var w = this, e = {bets: []};
    this.updateCallback = function () {
    };
    this.update = function (u, x, h, B, y) {
        -1 === x && -1 === h && !g.isStarted() && u.length && g.repeatRoundNum() !== y && (g.repeatRoundNum(y), B(u));
        !g.isStarted() && g.repeatRoundNum() !== y && u.length ? c.$autoplayRepeatButton.css({
            opacity: 1,
            cursor: "pointer"
        }) : c.$autoplayRepeatButton.css({opacity: .5, cursor: ""});
        if (g.isStarted()) {
            y = [];
            for (var F = 0; F < u.length; F++) u[F].coef ? y.push({
                summ: u[F].summ,
                bet: u[F].bet.slice(),
                coef: u[F].coef
            }) : y.push({summ: u[F].summ, bet: u[F].bet.slice()});
            for (F = 0; F < e.bets.length; F++) for (var a = y.length - 1; 0 <= a; a--) if (u = !1, y[a].bet.length === e.bets[F].bet.length && y[a].summ === e.bets[F].summ) {
                for (var d = y[a].bet.length - 1; 0 <= d; d--) if (y[a].bet[d] !== e.bets[F].bet[d]) {
                    u = !1;
                    break
                } else u = !0;
                u && y.splice(a, 1)
            }
            for (F = 0; F < y.length; F++) y[F].coef ?
                e.bets.push({summ: y[F].summ, bet: y[F].bet.slice(), coef: y[F].coef}) : e.bets.push({
                    summ: y[F].summ,
                    bet: y[F].bet.slice()
                });
            for (F = 0; F < y.length; F++) y[F].bet = null, y[F] = null;
            c.$autoplayStopDOMHeader.text("Number of round remaining (" + e.bets.length + " bets)");
            if (x || h) if (g.oneAnyWin() && 0 < x || g.ifCashIncMoreBool() && "" !== g.ifCashIncMoreValue() && parseFloat(g.ifCashIncMoreValue()) <= parseFloat(h) || g.ifCashDecLessBool() && "" !== g.ifCashDecLessValue() && parseFloat(g.ifCashDecLessValue()) >= parseFloat(h)) v(); else if (g.count(g.count() -
                1), 0 === g.count()) {
                x = [];
                for (h = 0; h < e.bets.length; h++) e.bets[h].coef ? x.push({
                    summ: e.bets[h].summ,
                    bet: e.bets[h].bet.slice(),
                    coef: e.bets[h].coef
                }) : x.push({summ: e.bets[h].summ, bet: e.bets[h].bet.slice()});
                B(x);
                v();
                c.$autoplayRepeatButton.css({opacity: .5, cursor: ""})
            } else q("AUTO " + g.count()), c.$autoplayStopDOMCounter.text(g.count() + ""), B(e.bets)
        }
    };
    var v = function () {
        c.$autoplayRepeatButton.css({opacity: 1, cursor: "pointer"});
        c.$autoplayCountDOM.css("display", "");
        c.$autoplayStopDOM.css("display", "none");
        g.isStarted(!1);
        g.count(0);
        q("AUTO");
        c.$autoplayStopDOMHeader.text("Number of round remaining");
        for (var u = 0; u < e.bets.length; u++) e.bets[u].bet = null, e.bets[u] = null;
        e.bets = []
    };
    this.stop = v;
    var b = (FLGUtils.staticRootPath || "") + "libs/FLGUtils/resources/autoplay/";
    this.resources = [["auto_check_btn", b + "check-btn.png"], ["auto_close", b + "close.png"], ["auto_collapse", b + "collapse.png"], ["auto_expand", b + "expand.png"], ["auto_input_bg", b + "input-bg.png"], ["auto_uncheck_btn", b + "uncheck-btn.png"], ["auto_bottom_arrow", b + "bottom-arrow.png"],
        ["auto_selector_left", b + "ap-selector-left.png"], ["auto_selector_right", b + "ap-selector-right.png"], ["auto_value", b + "ap-value.png"], ["auto_value_sel", b + "ap-value-sel.png"], ["auto_reset", b + "ap-reset.png"], ["auto_reset_hov", b + "ap-reset-hov.png"], ["auto_reset_down", b + "ap-reset-down.png"], ["auto_repeat_last_bet", b + "repeat-last-bet.png"], ["auto_repeat_last_bet_sel", b + "repeat-last-bet-sel.png"]];
    var g = new function () {
        this.destroy = function () {
            for (var h in x) x[h] = null;
            x = null;
            for (h in u) u[h] = null;
            u = null
        };
        var u =
            this, x = {
            oneAnyWin: !1,
            ifCashIncMoreBool: !1,
            ifCashIncMoreValue: "",
            ifCashDecLessBool: !1,
            ifCashDecLessValue: "",
            counts: [1, 5, 10, 50, 100, 500],
            isStarted: !1,
            count: 0,
            repeatRoundNum: void 0
        };
        this.reset = function () {
            u.oneAnyWin(!1);
            u.ifCashIncMoreBool(!1);
            u.ifCashIncMoreValue("");
            u.ifCashDecLessBool(!1);
            u.ifCashDecLessValue("");
            u.isStarted(!1);
            u.count(0)
        };
        this.isDefaultSettings = function () {
            return !u.oneAnyWin() && !u.ifCashIncMoreBool() && !u.ifCashDecLessBool()
        };
        this.oneAnyWin = function (h) {
            if (!arguments.length) return x.oneAnyWin;
            x.oneAnyWin = h
        };
        this.ifCashIncMoreBool = function (h) {
            if (!arguments.length) return x.ifCashIncMoreBool;
            x.ifCashIncMoreBool = h
        };
        this.ifCashIncMoreValue = function (h) {
            if (!arguments.length) return x.ifCashIncMoreValue;
            x.ifCashIncMoreValue = h.replace(/\D/g, "");
            u.ifCashIncMoreBool("" !== h)
        };
        this.ifCashDecLessBool = function (h) {
            if (!arguments.length) return x.ifCashDecLessBool;
            x.ifCashDecLessBool = h
        };
        this.ifCashDecLessValue = function (h) {
            if (!arguments.length) return x.ifCashDecLessValue;
            x.ifCashDecLessValue = h.replace(/\D/g,
                "");
            u.ifCashDecLessBool("" !== h)
        };
        this.counts = function (h) {
            return x.counts
        };
        this.isStarted = function (h) {
            if (!arguments.length) return x.isStarted;
            x.isStarted = h
        };
        this.count = function (h) {
            if (!arguments.length) return x.count;
            x.count = h
        };
        this.repeatRoundNum = function (h) {
            if (!arguments.length) return x.repeatRoundNum;
            x.repeatRoundNum = h
        }
    };
    this.settings = g;
    var c = {}, I = function () {
        c.$autoplayDOM = $('<div id="autoplaySettings" style="display: none; position: absolute; bottom: 50px; left: 0; width: 513px; z-index: ' + (parseInt(r.css("z-index")) +
            5) + "; color: #fff; font-size: 18px; background-color: black; font-family: 'Arial', sans-serif; transform-origin : 50% 100%;\"></div>");
        c.$autoplayTopDOM = $('<div style="width: 100%; height: 31px;"><div style="height: 51px; line-height: 51px; margin-left: 10px;">' + mainLocalizationTable.autoPlay + "</div></div>");
        c.$autoplayDOM.append(c.$autoplayTopDOM);
        c.$closeBtnWrapper = $('<div style="position: absolute; top: 0; right: 0; width: 66px; height: 42px; cursor: pointer;"></div>');
        c.$autoplayTopDOM.append(c.$closeBtnWrapper);
        c.$closeBtnWrapper.click(function () {
            E.playSound("buttonClick");
            c.$autoplayDOM.css("display", "none")
        });
        c.$closeBtnWrapper.hover(function () {
            c.$closeBtn.css("opacity", 1)
        }, function () {
            c.$closeBtn.css("opacity", .6)
        });
        c.$closeBtn = $('<div style="position: absolute;top: 16px; right: 20px; width: 24px; height: 8px; background: url(' + b + 'close.png) no-repeat 100% 100%; background-size: contain; opacity:0.6;"></div>');
        c.$closeBtnWrapper.append(c.$closeBtn);
        c.$autoplayMiddleDOM = $('<div style="padding: 10px 0;"></div>');
        c.$autoplayDOM.append(c.$autoplayMiddleDOM);
        c.$autoplayAdvancedDOM = $('<div style="position: relative;"></div>');
        c.$autoplayMiddleDOM.append(c.$autoplayAdvancedDOM);
        c.$autoplayAdvancedToggleDOM = $('<div style="line-height: 56px; top: 0; right: 0; height: 100%; width: 100%; z-index: 229;"></div>');
        c.$autoplayAdvancedDOM.append(c.$autoplayAdvancedToggleDOM);
        c.$autoplayAdvancedToggleHeaderDOM = $('<div style="margin: 0 48px;display: inline-block;">' + mainLocalizationTable.autoplayAdvancedSettings + "</div>");
        c.$autoplayAdvancedToggleDOM.append(c.$autoplayAdvancedToggleHeaderDOM);
        c.$autoplayAdvancedToggleWrapperDOM = $('<div style="display: inline-block; position: absolute; left: 0; width: 100%; cursor: pointer;"></div>');
        c.$autoplayAdvancedToggleDOM.append(c.$autoplayAdvancedToggleWrapperDOM);
        c.$autoplayAdvancedToggleWrapperDOM.click(function () {
            E.playSound("buttonClick");
            "none" === c.$autoplayAdvancedSettingsDOM.css("display") ? (c.$autoplayAdvancedToggleWrapperButtonDOM.css("background-image", "url(" + b + "expand.png)"),
                c.$autoplayAdvancedSettingsDOM.css("display", "block")) : (c.$autoplayAdvancedToggleWrapperButtonDOM.css("background-image", "url(" + b + "collapse.png)"), c.$autoplayAdvancedSettingsDOM.css("display", "none"))
        });
        c.$autoplayAdvancedToggleWrapperDOM.hover(function () {
            c.$autoplayAdvancedToggleWrapperButtonDOM.css("opacity", 1)
        }, function () {
            c.$autoplayAdvancedToggleWrapperButtonDOM.css("opacity", .6)
        });
        c.$autoplayAdvancedToggleWrapperButtonDOM = $('<div style="display: inline-block; margin-top: 16px; margin-left: 12px; width: 22px; height: 22px;background: url(' +
            b + 'collapse.png) no-repeat 100% 100%; background-size: contain; opacity:0.6;"></div>');
        c.$autoplayAdvancedToggleWrapperDOM.append(c.$autoplayAdvancedToggleWrapperButtonDOM);
        c.$autoplayAdvancedResetDOM = $('<div style="text-align: center;font-size: 24px;line-height: 56px;padding: 0 20px 0 20px;cursor: pointer;background: url(' + b + 'ap-reset.png) no-repeat center; background-size: cover;position: absolute;right: 20px;top: 0; display: none;opacity:0.6">Reset</div>');
        c.$autoplayAdvancedDOM.append(c.$autoplayAdvancedResetDOM);
        c.$autoplayAdvancedResetDOM.click(function () {
            E.playSound("buttonClick");
            g.reset();
            v();
            g.oneAnyWin() ? c.$autoplayAdvancedSettingsStopListWinCheckBoxDOM.css("background-image", "url(" + b + "check-btn.png)") : c.$autoplayAdvancedSettingsStopListWinCheckBoxDOM.css("background-image", "url(" + b + "uncheck-btn.png)");
            g.ifCashIncMoreBool() ? c.$autoplayAdvancedSettingsStopMoreCheckBoxButtonDOM.css("background-image", "url(" + b + "check-btn.png)") : c.$autoplayAdvancedSettingsStopMoreCheckBoxButtonDOM.css("background-image",
                "url(" + b + "uncheck-btn.png)");
            c.$autoplayAdvancedSettingsStopListMoreInputWrapperInputDOM.val(g.ifCashIncMoreValue());
            g.ifCashDecLessBool() ? c.$autoplayAdvancedSettingsStopLessCheckBoxButtonDOM.css("background-image", "url(" + b + "check-btn.png)") : c.$autoplayAdvancedSettingsStopLessCheckBoxButtonDOM.css("background-image", "url(" + b + "uncheck-btn.png)");
            c.$autoplayAdvancedSettingsStopListLessInputWrapperInputDOM.val(g.ifCashDecLessValue());
            c.$autoplayAdvancedToggleHeaderDOM.css("color", "#ffffff");
            c.$autoplayAdvancedResetDOM.css("display",
                "none");
            c.$autoplayCountDOM.css("display", "");
            c.$autoplayStopDOM.css("display", "none")
        });
        c.$autoplayAdvancedResetDOM.hover(function () {
            c.$autoplayAdvancedResetDOM.css("opacity", 1)
        }, function () {
            c.$autoplayAdvancedResetDOM.css("opacity", .6)
        });
        c.$autoplayAdvancedSettingsDOM = $('<div style="display: none;"></div>');
        c.$autoplayAdvancedDOM.append(c.$autoplayAdvancedSettingsDOM);
        c.$autoplayAdvancedSettingsHeaderDOM = $('<div style="margin: 0 0 4px 20px;">' + mainLocalizationTable.autoplayStopAutoplay + "</div>");
        c.$autoplayAdvancedSettingsDOM.append(c.$autoplayAdvancedSettingsHeaderDOM);
        c.$autoplayAdvancedSettingsStopListDOM = $('<ul style="list-style-type: none;margin: 0 0 0 20px;padding: 0;"></ul>');
        c.$autoplayAdvancedSettingsDOM.append(c.$autoplayAdvancedSettingsStopListDOM);
        c.$autoplayAdvancedSettingsStopListWinDOM = $('<li style="position: relative;display: inline-block;text-align: right;cursor: pointer;"></li>');
        c.$autoplayAdvancedSettingsStopListDOM.append(c.$autoplayAdvancedSettingsStopListWinDOM);
        c.$autoplayAdvancedSettingsStopListWinDOM.click(function () {
            E.playSound("buttonClick");
            g.oneAnyWin(!g.oneAnyWin());
            g.oneAnyWin() ? c.$autoplayAdvancedSettingsStopListWinCheckBoxDOM.css("background-image", "url(" + b + "check-btn.png)") : c.$autoplayAdvancedSettingsStopListWinCheckBoxDOM.css("background-image", "url(" + b + "uncheck-btn.png)");
            g.isDefaultSettings() ? (c.$autoplayAdvancedToggleHeaderDOM.css("color", "#ffffff"), c.$autoplayAdvancedResetDOM.css("display", "none")) : (c.$autoplayAdvancedToggleHeaderDOM.css("color", "#76ad1c"), c.$autoplayAdvancedResetDOM.css("display", ""))
        });
        c.$autoplayAdvancedSettingsStopListWinHeaderDOM =
            $('<div style="display: inline-block;margin: 6px 36px;">' + mainLocalizationTable.autoplayOnWin + "</div>");
        c.$autoplayAdvancedSettingsStopListWinDOM.append(c.$autoplayAdvancedSettingsStopListWinHeaderDOM);
        c.$autoplayAdvancedSettingsStopListWinCheckBoxDOM = $('<div style="display: inline-block;top: 2px;position: absolute; left: 0;width: 30px;height: 30px;background: url(' + b + 'uncheck-btn.png) no-repeat 100% 100%; background-size: contain;"></div>');
        c.$autoplayAdvancedSettingsStopListWinDOM.append(c.$autoplayAdvancedSettingsStopListWinCheckBoxDOM);
        c.$autoplayAdvancedSettingsStopListMoreDOM = $("<li></li>");
        c.$autoplayAdvancedSettingsStopListDOM.append(c.$autoplayAdvancedSettingsStopListMoreDOM);
        c.$autoplayAdvancedSettingsStopListMoreCheckBoxDOM = $('<div style="position: relative;display: inline-block;text-align: right;cursor: pointer;"></div>');
        c.$autoplayAdvancedSettingsStopListMoreDOM.append(c.$autoplayAdvancedSettingsStopListMoreCheckBoxDOM);
        c.$autoplayAdvancedSettingsStopListMoreCheckBoxDOM.click(function () {
            E.playSound("buttonClick");
            g.ifCashIncMoreBool(!g.ifCashIncMoreBool());
            g.ifCashIncMoreBool() ? (c.$autoplayAdvancedSettingsStopMoreCheckBoxButtonDOM.css("background-image", "url(" + b + "check-btn.png)"), c.$autoplayAdvancedSettingsStopListMoreInputWrapperInputDOM.focus()) : c.$autoplayAdvancedSettingsStopMoreCheckBoxButtonDOM.css("background-image", "url(" + b + "uncheck-btn.png)");
            g.isDefaultSettings() ? (c.$autoplayAdvancedToggleHeaderDOM.css("color", "#ffffff"), c.$autoplayAdvancedResetDOM.css("display", "none")) : (c.$autoplayAdvancedToggleHeaderDOM.css("color", "#76ad1c"), c.$autoplayAdvancedResetDOM.css("display",
                ""))
        });
        c.$autoplayAdvancedSettingsStopListMoreCheckBoxHeaderDOM = $('<div style="display: inline-block;margin: 6px 36px;">' + mainLocalizationTable.autoplayOnIncreases + "</div>");
        c.$autoplayAdvancedSettingsStopListMoreCheckBoxDOM.append(c.$autoplayAdvancedSettingsStopListMoreCheckBoxHeaderDOM);
        c.$autoplayAdvancedSettingsStopMoreCheckBoxButtonDOM = $('<div style="display: inline-block;top: 2px;position: absolute; left: 0;width: 30px;height: 30px;background: url(' + b + 'uncheck-btn.png) no-repeat 100% 100%; background-size: contain;"></div>');
        c.$autoplayAdvancedSettingsStopListMoreCheckBoxDOM.append(c.$autoplayAdvancedSettingsStopMoreCheckBoxButtonDOM);
        c.$autoplayAdvancedSettingsStopListMoreInputWrapperDOM = $('<div style="display: inline-block;position: absolute;right: 16px;width: 189px;height: 40px;"></div>');
        c.$autoplayAdvancedSettingsStopListMoreDOM.append(c.$autoplayAdvancedSettingsStopListMoreInputWrapperDOM);
        c.$autoplayAdvancedSettingsStopListMoreInputWrapperInputDOM = $('<input style="display: inline-block;border: 0; padding: 0 8px;color: #000;text-align: center;width: 147px;height: 40px;background: 0;background: url(' +
            b + 'input-bg.png) no-repeat 100% 100%; background-size: contain;"onkeypress="var charCode = (event.which) ? event.which : event.keyCsode; return (charCode >= 48) && (charCode <= 57);">');
        c.$autoplayAdvancedSettingsStopListMoreInputWrapperDOM.append(c.$autoplayAdvancedSettingsStopListMoreInputWrapperInputDOM);
        c.$autoplayAdvancedSettingsStopListMoreInputWrapperInputDOM.keyup(function () {
            g.ifCashIncMoreValue($(this).val());
            g.ifCashIncMoreBool() ? c.$autoplayAdvancedSettingsStopMoreCheckBoxButtonDOM.css("background-image",
                "url(" + b + "check-btn.png)") : c.$autoplayAdvancedSettingsStopMoreCheckBoxButtonDOM.css("background-image", "url(" + b + "uncheck-btn.png)");
            g.isDefaultSettings() ? (c.$autoplayAdvancedToggleHeaderDOM.css("color", "#ffffff"), c.$autoplayAdvancedResetDOM.css("display", "none")) : (c.$autoplayAdvancedToggleHeaderDOM.css("color", "#76ad1c"), c.$autoplayAdvancedResetDOM.css("display", ""))
        });
        c.$autoplayAdvancedSettingsStopListMoreInputWrapperInputDOM.focus(function () {
            var h = c.$autoplayAdvancedSettingsStopListMoreInputWrapperInputDOM.val();
            "" !== h && c.$autoplayAdvancedSettingsStopListMoreInputWrapperInputDOM.val(parseFloat(h.replace(/\s+/g, "")))
        });
        c.$autoplayAdvancedSettingsStopListMoreInputWrapperInputDOM.blur(function () {
            var h = c.$autoplayAdvancedSettingsStopListMoreInputWrapperInputDOM.val();
            "" !== h && c.$autoplayAdvancedSettingsStopListMoreInputWrapperInputDOM.val(formatFLGNums(h))
        });
        c.$autoplayAdvancedSettingsStopListMoreInputWrapperCurrencyDOM = $('<div style="display: inline-block;">' + clientInfoGlobal.name_en + "</div>");
        c.$autoplayAdvancedSettingsStopListMoreInputWrapperDOM.append(c.$autoplayAdvancedSettingsStopListMoreInputWrapperCurrencyDOM);
        c.$autoplayAdvancedSettingsStopListLessDOM = $("<li></li>");
        c.$autoplayAdvancedSettingsStopListDOM.append(c.$autoplayAdvancedSettingsStopListLessDOM);
        c.$autoplayAdvancedSettingsStopListLessCheckBoxDOM = $('<div style="position: relative;display: inline-block;text-align: right;cursor: pointer;"></div>');
        c.$autoplayAdvancedSettingsStopListLessDOM.append(c.$autoplayAdvancedSettingsStopListLessCheckBoxDOM);
        c.$autoplayAdvancedSettingsStopListLessCheckBoxDOM.click(function () {
            E.playSound("buttonClick");
            g.ifCashDecLessBool(!g.ifCashDecLessBool());
            g.ifCashDecLessBool() ? (c.$autoplayAdvancedSettingsStopLessCheckBoxButtonDOM.css("background-image", "url(" + b + "check-btn.png)"), c.$autoplayAdvancedSettingsStopListLessInputWrapperInputDOM.focus()) : c.$autoplayAdvancedSettingsStopLessCheckBoxButtonDOM.css("background-image", "url(" + b + "uncheck-btn.png)");
            g.isDefaultSettings() ? (c.$autoplayAdvancedToggleHeaderDOM.css("color", "#ffffff"), c.$autoplayAdvancedResetDOM.css("display", "none")) : (c.$autoplayAdvancedToggleHeaderDOM.css("color", "#76ad1c"), c.$autoplayAdvancedResetDOM.css("display",
                ""))
        });
        c.$autoplayAdvancedSettingsStopListLessCheckBoxHeaderDOM = $('<div style="display: inline-block;margin: 6px 36px;">' + mainLocalizationTable.autoplayOnDecreases + "</div>");
        c.$autoplayAdvancedSettingsStopListLessCheckBoxDOM.append(c.$autoplayAdvancedSettingsStopListLessCheckBoxHeaderDOM);
        c.$autoplayAdvancedSettingsStopLessCheckBoxButtonDOM = $('<div style="display: inline-block;top: 2px;position: absolute; left: 0;width: 30px;height: 30px;background: url(' + b + 'uncheck-btn.png) no-repeat 100% 100%; background-size: contain;"></div>');
        c.$autoplayAdvancedSettingsStopListLessCheckBoxDOM.append(c.$autoplayAdvancedSettingsStopLessCheckBoxButtonDOM);
        c.$autoplayAdvancedSettingsStopListLessInputWrapperDOM = $('<div style="display: inline-block;position: absolute;right: 16px;width: 189px;height: 40px;"></div>');
        c.$autoplayAdvancedSettingsStopListLessDOM.append(c.$autoplayAdvancedSettingsStopListLessInputWrapperDOM);
        c.$autoplayAdvancedSettingsStopListLessInputWrapperInputDOM = $('<input style="display: inline-block;border: 0; padding: 0 8px;color: #000;text-align: center;width: 147px;height: 40px;background: 0;background: url(' +
            b + 'input-bg.png) no-repeat 100% 100%; background-size: contain;"onkeypress="var charCode = (event.which) ? event.which : event.keyCsode; return (charCode >= 48) && (charCode <= 57);">');
        c.$autoplayAdvancedSettingsStopListLessInputWrapperDOM.append(c.$autoplayAdvancedSettingsStopListLessInputWrapperInputDOM);
        c.$autoplayAdvancedSettingsStopListLessInputWrapperInputDOM.keyup(function () {
            g.ifCashDecLessValue($(this).val());
            g.ifCashDecLessBool() ? c.$autoplayAdvancedSettingsStopLessCheckBoxButtonDOM.css("background-image",
                "url(" + b + "check-btn.png)") : c.$autoplayAdvancedSettingsStopLessCheckBoxButtonDOM.css("background-image", "url(" + b + "uncheck-btn.png)");
            g.isDefaultSettings() ? (c.$autoplayAdvancedToggleHeaderDOM.css("color", "#ffffff"), c.$autoplayAdvancedResetDOM.css("display", "none")) : (c.$autoplayAdvancedToggleHeaderDOM.css("color", "#76ad1c"), c.$autoplayAdvancedResetDOM.css("display", ""))
        });
        c.$autoplayAdvancedSettingsStopListLessInputWrapperInputDOM.focus(function () {
            var h = c.$autoplayAdvancedSettingsStopListLessInputWrapperInputDOM.val();
            "" !== h && c.$autoplayAdvancedSettingsStopListLessInputWrapperInputDOM.val(parseFloat(h.replace(/\s+/g, "")))
        });
        c.$autoplayAdvancedSettingsStopListLessInputWrapperInputDOM.blur(function () {
            var h = c.$autoplayAdvancedSettingsStopListLessInputWrapperInputDOM.val();
            "" !== h && c.$autoplayAdvancedSettingsStopListLessInputWrapperInputDOM.val(formatFLGNums(h))
        });
        c.$autoplayAdvancedSettingsStopListLessInputWrapperCurrencyDOM = $('<div style="display: inline-block;">' + clientInfoGlobal.name_en + "</div>");
        c.$autoplayAdvancedSettingsStopListLessInputWrapperDOM.append(c.$autoplayAdvancedSettingsStopListLessInputWrapperCurrencyDOM);
        c.$autoplayAdvancedSeporatorDOM = $('<div style="height: 2px; width: 100%; margin: 10px 0 10px 0; background-color: rgba(255,255,255,0.4)"></div>');
        c.$autoplayAdvancedDOM.append(c.$autoplayAdvancedSeporatorDOM);
        c.$autoplayCountDOM = $("<div></div>");
        c.$autoplayMiddleDOM.append(c.$autoplayCountDOM);
        c.$autoplayCountDOMWrapper = $('<div style="position: relative;width: 100%;height: 130px;"></div>');
        c.$autoplayCountDOM.append(c.$autoplayCountDOMWrapper);
        c.$autoplayCountDOMWrapperTop = $('<div style="width: 100%; text-align: center;">' +
            mainLocalizationTable.autoplayRoundNumber + "</div>");
        c.$autoplayCountDOMWrapper.append(c.$autoplayCountDOMWrapperTop);
        c.$autoplayCountDOMWrapperSelector = $('<div style="position: relative;width: 100%;height: 60px;text-align: center;margin: 10px 0 10px 0;"></div>');
        c.$autoplayCountDOMWrapper.append(c.$autoplayCountDOMWrapperSelector);
        c.$autoplayCountDOMWrapperSelectorLeft = $('<div style="width: 38px; height: 100%; display: inline-block; cursor: pointer; opacity: .2; background: url(' + b + 'ap-selector-left.png) no-repeat 100% 100%; background-size: contain;"></div>');
        c.$autoplayCountDOMWrapperSelector.append(c.$autoplayCountDOMWrapperSelectorLeft);
        c.$autoplayCountDOMWrapperSelectorLeft.click(function () {
            0 !== c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal && (E.playSound("buttonClick"), c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal--, c.$autoplayCountDOMWrapperSelectorValuesScroller.css("transform", "translateX(" + -300 * c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal + "px)"), 0 === c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal &&
            c.$autoplayCountDOMWrapperSelectorLeft.css("opacity", .2), c.$autoplayCountDOMWrapperSelectorRight.css("opacity", .6))
        });
        c.$autoplayCountDOMWrapperSelectorLeft.hover(function () {
            0 !== c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal && c.$autoplayCountDOMWrapperSelectorLeft.css("opacity", 1)
        }, function () {
            0 !== c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal && c.$autoplayCountDOMWrapperSelectorLeft.css("opacity", .6)
        });
        c.$autoplayCountDOMWrapperSelectorValues = $('<div style="height: 100%; width: 300px; display: inline-block; overflow: hidden; position: relative; margin: 0 8px;"></div>');
        c.$autoplayCountDOMWrapperSelector.append(c.$autoplayCountDOMWrapperSelectorValues);
        c.$autoplayCountDOMWrapperSelectorValuesScroller = $('<div style="position: absolute; height: 100%; white-space: nowrap; transition: transform 300ms; transform: translateX(0px)"></div>');
        c.$autoplayCountDOMWrapperSelectorValues.append(c.$autoplayCountDOMWrapperSelectorValuesScroller);
        c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal = 0;
        for (var u = g.counts(), x = 0; x < u.length; x++) c.$autoplayCountDOMWrapperSelectorValuesScrollerValue =
            $('<div style="width: 84px; height: 100%; display: inline-block; cursor: pointer; color: black; font-size: 36px; line-height: 64px; text-align: center; margin-right: 8px; margin-left: 8px; background: url(' + b + 'ap-value.png) no-repeat 100% 100%; background-size: contain;">' + u[x] + "</div>"), c.$autoplayCountDOMWrapperSelectorValuesScroller.append(c.$autoplayCountDOMWrapperSelectorValuesScrollerValue), c.$autoplayCountDOMWrapperSelectorValuesScrollerValue.click(function () {
            E.playSound("buttonClick");
            c.$autoplayCountDOM.css("display",
                "none");
            c.$autoplayStopDOM.css("display", "");
            g.isStarted(!0);
            g.count(parseInt($(this).text()));
            c.$autoplayStopDOMCounter.text(g.count() + "");
            q("AUTO " + g.count());
            w.updateCallback("getOnlyBets")
        }), c.$autoplayCountDOMWrapperSelectorValuesScrollerValue.hover(function () {
            $(this).css("background-image", "url(" + b + "ap-value-sel.png)")
        }, function () {
            $(this).css("background-image", "url(" + b + "ap-value.png)")
        });
        u = null;
        c.$autoplayCountDOMWrapperSelectorRight = $('<div style="width: 38px; height: 100%; opacity: 0.6; display: inline-block; cursor: pointer; background: url(' +
            b + 'ap-selector-right.png) no-repeat 100% 100%; background-size: contain;"></div>');
        c.$autoplayCountDOMWrapperSelector.append(c.$autoplayCountDOMWrapperSelectorRight);
        c.$autoplayCountDOMWrapperSelectorRight.click(function () {
            c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal !== g.counts().length / 3 - 1 && (E.playSound("buttonClick"), c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal++, c.$autoplayCountDOMWrapperSelectorValuesScroller.css("transform", "translateX(" + -300 * c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal +
                "px)"), c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal === g.counts().length / 3 - 1 && c.$autoplayCountDOMWrapperSelectorRight.css("opacity", .2), c.$autoplayCountDOMWrapperSelectorLeft.css("opacity", .6))
        });
        c.$autoplayCountDOMWrapperSelectorRight.hover(function () {
            c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal !== g.counts().length / 3 - 1 && c.$autoplayCountDOMWrapperSelectorRight.css("opacity", 1)
        }, function () {
            c.$autoplayCountDOMWrapperSelectorValuesScroller.scrollVal !== g.counts().length / 3 - 1 &&
            c.$autoplayCountDOMWrapperSelectorRight.css("opacity", .6)
        });
        c.$autoplayCountDOMWrapperBottom = $('<div style="width: 100%; text-align: center;">' + mainLocalizationTable.autoplayStart + "</div>");
        c.$autoplayCountDOMWrapper.append(c.$autoplayCountDOMWrapperBottom);
        c.$autoplayStopDOM = $('<div style="display: none; position: relative;width: 100%;height: 130px;"></div>');
        c.$autoplayMiddleDOM.append(c.$autoplayStopDOM);
        c.$autoplayStopDOMHeader = $('<div style="margin: 0; text-align: center;">' + mainLocalizationTable.autoplayRemainingNumber +
            "</div>");
        c.$autoplayStopDOM.append(c.$autoplayStopDOMHeader);
        c.$autoplayStopDOMBody = $('<div style="position: relative; width: 100%; height: 60px; text-align: center; margin: 24px 0;"></div>');
        c.$autoplayStopDOM.append(c.$autoplayStopDOMBody);
        c.$autoplayStopDOMCounter = $('<div style="width: 84px; height: 100%; display: inline-block; color: black; font-size: 36px; line-height: 64px; text-align: center; margin-right: 10px; margin-left: 8px; background: url(' + b + 'ap-value-sel.png) no-repeat center; background-size: cover;"></div>');
        c.$autoplayStopDOMBody.append(c.$autoplayStopDOMCounter);
        c.$autoplayStopDOMStopButton = $('<div style="padding: 1px 20px; cursor: pointer; height: 56px; display: inline-block; text-align: center; font-size: 28px; line-height: 60px; background: url(' + b + 'ap-reset.png) no-repeat center; background-size: cover;opacity:0.6">' + mainLocalizationTable.autoplayStop + "</div>");
        c.$autoplayStopDOMBody.append(c.$autoplayStopDOMStopButton);
        c.$autoplayStopDOMStopButton.click(function () {
            E.playSound("buttonClick");
            v()
        });
        c.$autoplayStopDOMStopButton.hover(function () {
            c.$autoplayStopDOMStopButton.css("opacity", 1)
        }, function () {
            c.$autoplayStopDOMStopButton.css("opacity", .6)
        });
        c.$autoplayRepeatDOM = $('<div style="position: relative;width: 100%;height: 40px;text-align: center;margin: 10px 0 10px 0;"></div>');
        c.$autoplayMiddleDOM.append(c.$autoplayRepeatDOM);
        c.$autoplayRepeatButton = $('<div style="width: 232px; height: 39px; display: inline-block; cursor: pointer; color: black; line-height: 39px; text-align: center; background: url(' +
            b + 'repeat-last-bet.png) no-repeat center; background-size: cover;">' + mainLocalizationTable.autoplayRepeatLastBet + "</div>");
        c.$autoplayRepeatDOM.append(c.$autoplayRepeatButton);
        c.$autoplayRepeatButton.click(function () {
            "1" === c.$autoplayRepeatButton.css("opacity") && (E.playSound("buttonClick"), w.updateCallback("repeatLastBet"))
        });
        c.$autoplayRepeatButton.hover(function () {
            "1" === c.$autoplayRepeatButton.css("opacity") && $(this).css("background-image", "url(" + b + "repeat-last-bet-sel.png)")
        }, function () {
            $(this).css("background-image",
                "url(" + b + "repeat-last-bet.png)")
        });
        c.$autoplayBottomDOM = $('<div style="width: 100%;height: 6px;"><div style="width: 30px; height: 15px; position: absolute; bottom: -12px; left: 170px; background: url(' + b + 'bottom-arrow.png) no-repeat 100% 100%; background-size: contain;"></div></div>');
        c.$autoplayDOM.append(c.$autoplayBottomDOM);
        r.append(c.$autoplayDOM)
    };
    I();
    this.changeVisible = function () {
        "none" === c.$autoplayDOM.css("display") ? c.$autoplayDOM.css("display", "") : c.$autoplayDOM.css("display", "none")
    };
    var G =
        function () {
            var u = r.find("canvas"), x = u.attr("width"), h = parseFloat(u.css("width"));
            u = parseFloat(u.css("height"));
            x = h / x;
            var B = (c.$autoplayDOM.width() - c.$autoplayDOM.width() * x) / 2;
            h = (r.width() - h) / 2;
            u = (r.height() - u) / 2;
            c.$autoplayDOM.css({left: -B + h + "px", bottom: u + 48 * x + "px", transform: "scale(" + x + ")"})
        };
    window.addEventListener("resize", G, !1);
    r.bind("parentResized", G);
    G()
}

function MaskedSprite(r, E, q) {
    this.destroy = function () {
        E.needScrolling && (requestAnimationFrame ? cancelAnimationFrame(f) : msRequestAnimationFrame ? msCancelAnimationFrame(f) : webkitRequestAnimationFrame ? webkitCancelAnimationFrame(f) : mozRequestAnimationFrame ? mozCancelAnimationFrame(f) : oRequestAnimationFrame && oCancelAnimationFrame(f), r.data = null, r.kineticData && (r.kineticData.fistTouchCoords = null, r.kineticData.lastTouchCoords = null), r.kineticData = null, v.removeListener("updateHeight", d), d = v = null, window.removeEventListener("mousewheel",
            k), window.removeEventListener("DOMMouseScroll", k), a = k = null, r.removeListener("mousedown", t), r.removeListener("touchstart", t), r.removeListener("mousemove", n), r.removeListener("touchmove", n), r.removeListener("mouseup", p), r.removeListener("touchend", p), r.removeListener("mouseupoutside", p), r.removeListener("touchendoutside", p), r.removeListener("mouseover", D), r.removeListener("mouseout", A), A = D = n = p = t = r = null, u.data = null, u.kineticData && (u.kineticData.fistTouchCoords = null, u.kineticData.lastTouchCoords = null),
            u.kineticData = null, u.removeListener("mousedown", x), u.removeListener("touchstart", x), u.removeListener("mousemove", B), u.removeListener("touchmove", B), u.removeListener("mouseup", h), u.removeListener("touchend", h), u.removeListener("mouseupoutside", h), u.removeListener("touchendoutside", h), u.removeListener("mouseover", y), u.removeListener("mouseout", F), F = y = B = h = x = u = null);
        for (var l in w) w[l] = null;
        w = null
    };
    var w = this;
    this.srcSprite = r;
    var e = new PIXI.Graphics;
    e.beginFill(E.mask.color);
    E.mask.radius ? e.drawRoundedRect(E.mask.x,
        E.mask.y, E.mask.width, E.mask.height, E.mask.radius) : e.drawRect(E.mask.x, E.mask.y, E.mask.width, E.mask.height);
    e.endFill;
    r.mask = e;
    r.parent.addChild(e);
    e = null;
    if (E.needScrolling) {
        if (E.needScrolling.container) var v = E.needScrolling.container; else v = new PIXI.Container, v.position.y = E.mask.y, r.addChild(v);
        this.containerForScroll = v;
        var b = 0, g = E.needScrolling.scrollbar ? E.needScrolling.scrollbar.topOffset : 4,
            c = E.needScrolling.scrollbar ? E.needScrolling.scrollbar.botOffset : 4,
            I = limit(E.mask.height - c + 4, 0, E.mask.height),
            G = I - 52 - 8 - 4 - g, u = new PIXI.Container;
        e = new PIXI.Graphics;
        e.beginFill(0);
        e.drawRoundedRect(0, v.position.y, 18, 60, 9);
        e.endFill;
        u.addChild(e);
        e = null;
        u.visible = b <= I;
        u.name = "scroll";
        u.alpha = .85;
        u.interactive = !0;
        u.hitArea = new PIXI.Rectangle(-12, -10 + v.position.y, 38, 76);
        u.buttonMode = !0;
        u.position.set(E.mask.x + E.mask.width - 12 - 8 - 2, g);
        r.addChild(u);
        var x = function (l) {
            u.data = l.data;
            u.dragging = !0;
            u.kineticData = {
                velocity: 0,
                amplitude: 0,
                timestamp: Date.now(),
                fistTouchCoords: u.data.getLocalPosition(u.parent),
                firstPosY: u.position.y,
                offsetPlusAmplitude: 0,
                snap: 200
            };
            u.alpha = 1;
            l.stopped = !0;
            requestAnimationFrame ? cancelAnimationFrame(f) : msRequestAnimationFrame ? msCancelAnimationFrame(f) : webkitRequestAnimationFrame ? webkitCancelAnimationFrame(f) : mozRequestAnimationFrame ? mozCancelAnimationFrame(f) : oRequestAnimationFrame && oCancelAnimationFrame(f);
            q.needUpdateRender = !0
        }, h = function (l) {
            u.dragging = !1;
            u.alpha = .6;
            l.stopped = !0;
            q.needUpdateRender = !0
        }, B = function (l) {
            if (u.dragging) {
                var m = u.data.getLocalPosition(u.parent);
                m = 100 * (limit(m.y - u.kineticData.fistTouchCoords.y +
                    u.kineticData.firstPosY, g, G + g) - g) / G;
                a(m * -(b - I) / 100);
                l.stopped = !0;
                q.needUpdateRender = !0
            }
        }, y = function () {
            u.alpha = 1;
            q.needUpdateRender = !0
        }, F = function () {
            u.alpha = .6;
            q.needUpdateRender = !0
        };
        u.on("mousedown", x).on("touchstart", x).on("mousemove", B).on("touchmove", B).on("mouseup", h).on("touchend", h).on("mouseupoutside", h).on("touchendoutside", h).on("mouseover", y).on("mouseout", F);
        var a = function (l) {
            v.position.y = limit(l, -(b - I), 0);
            u.position.y = 100 * v.position.y / -(b - I) * G / 100 + g
        }, d = function () {
            for (var l, m = b = 0; m < v.children.length; m++) v.children[m].visible &&
            (l = v.children[m].position.y + (v.children[m].anchor ? v.children[m].height * (1 - v.children[m].anchor.y) : v.children[m].height), l > b && (b = l));
            0 > E.mask.y && (b -= E.mask.y);
            I = limit(r.mask.graphicsData[0].shape.height - c + 4, 0, r.mask.graphicsData[0].shape.height);
            G = I - 52 - 8 - 4 - g;
            a(v.position.y);
            u.visible = b > I
        };
        v.on("updateHeight", d);
        v.emit("updateHeight");
        var k = function (l) {
            if (l && (l.deltaY || l.detail) && !(b <= I) && r.isHovered) return requestAnimationFrame ? cancelAnimationFrame(f) : msRequestAnimationFrame ? msCancelAnimationFrame(f) :
                webkitRequestAnimationFrame ? webkitCancelAnimationFrame(f) : mozRequestAnimationFrame ? mozCancelAnimationFrame(f) : oRequestAnimationFrame && oCancelAnimationFrame(f), a(v.position.y + (l.deltaY ? 0 < l.deltaY ? -40 : 40 : 0 < l.detail ? -40 : 40)), q.needUpdateRender = !0, !1
        };
        window.addEventListener("mousewheel", k, !1);
        window.addEventListener("DOMMouseScroll", k, !1);
        var t = function (l) {
            r.data = l.data;
            r.dragging = !0;
            r.kineticData = {
                velocity: 0,
                amplitude: 0,
                timestamp: Date.now(),
                fistTouchCoords: r.data.getLocalPosition(r.parent),
                firstPosY: v.position.y,
                offsetPlusAmplitude: 0,
                snap: 200
            };
            requestAnimationFrame ? cancelAnimationFrame(f) : msRequestAnimationFrame ? msCancelAnimationFrame(f) : webkitRequestAnimationFrame ? webkitCancelAnimationFrame(f) : mozRequestAnimationFrame ? mozCancelAnimationFrame(f) : oRequestAnimationFrame && oCancelAnimationFrame(f)
        }, p = function () {
            r.dragging = !1;
            r.data && (r.kineticData.lastTouchCoords = r.data.getLocalPosition(r.parent), w.trackInertia())
        }, n = function () {
            if (!(b <= I) && r.dragging) {
                var l = r.data.getLocalPosition(r.parent);
                a(l.y - r.kineticData.fistTouchCoords.y +
                    r.kineticData.firstPosY);
                q.needUpdateRender = !0
            }
        }, D = function () {
            r.isHovered = !0
        }, A = function () {
            r.isHovered = !1
        };
        r.on("mousedown", t).on("touchstart", t).on("mousemove", n).on("touchmove", n).on("mouseup", p).on("touchend", p).on("mouseupoutside", p).on("touchendoutside", p).on("mouseover", D).on("mouseout", A)
    }
    var f = 0;
    this.scrollInertia = function () {
        if (r.kineticData.amplitude && v.position.y > -(b - I) && 0 > v.position.y) {
            var l = Date.now() - r.kineticData.timestamp;
            l = -r.kineticData.amplitude * Math.exp(-l / 325);
            .5 < l || -.5 > l ? (a(r.kineticData.offsetPlusAmplitude +
                l + r.kineticData.firstPosY), requestAnimationFrame ? f = requestAnimationFrame(w.scrollInertia) : msRequestAnimationFrame ? f = msRequestAnimationFrame(w.scrollInertia) : webkitRequestAnimationFrame ? f = webkitRequestAnimationFrame(w.scrollInertia) : mozRequestAnimationFrame ? f = window.mozRequestAnimationFrame(w.scrollInertia) : oRequestAnimationFrame && (f = oRequestAnimationFrame(w.scrollInertia))) : (a(r.kineticData.offsetPlusAmplitude + r.kineticData.firstPosY), requestAnimationFrame ? cancelAnimationFrame(f) : msRequestAnimationFrame ?
                msCancelAnimationFrame(f) : webkitRequestAnimationFrame ? webkitCancelAnimationFrame(f) : mozRequestAnimationFrame ? mozCancelAnimationFrame(f) : oRequestAnimationFrame && oCancelAnimationFrame(f));
            q.needUpdateRender = !0
        }
    };
    this.trackInertia = function () {
        var l = Date.now() - r.kineticData.timestamp;
        if (!(300 < l)) {
            var m = v.position.y - r.kineticData.firstPosY;
            r.kineticData.firstPosY = v.position.y;
            r.kineticData.velocity = 1E3 * m / (1 + l) * .8 + .2 * r.kineticData.velocity;
            if (10 < r.kineticData.velocity || -10 > r.kineticData.velocity) r.kineticData.amplitude =
                .5 * r.kineticData.velocity, r.kineticData.offsetPlusAmplitude = Math.round(v.position.y - r.kineticData.firstPosY + r.kineticData.amplitude), r.kineticData.timestamp = Date.now(), w.scrollInertia()
        }
    }
}

function APIManager() {
    this.destroy = function () {
        for (var w in r) r[w] = null;
        r = null
    };
    var r = this, E = !1;
    this.isAPIUser = function (w) {
        if (!arguments.length) return E;
        E = w
    };
    var q = !1;
    this.isAPIUserMenuMode = function () {
        return q
    };
    this.startAPILogic = function (w) {
        var e = clientInfoGlobal.cgame.split(",");
        if (1 == e.length) {
            var v = $("#loader");
            v.css({
                "background-image": "url(" + FLGUtils.staticRootPath + "images/games-bg/keno-bg.jpg)",
                "background-repeat": "no-repeat",
                "background-position": "center top",
                "background-size": "cover"
            });

            function c(I) {
                v.css("background-image",
                    "url(" + FLGUtils.staticRootPath + I + ")")
            }

            switch (e[0]) {
                case "0":
                case "30":
                    window.initKenoNGObject("loader", "blue");
                    c("images/games-bg/game-bg-blue.jpg");
                    break;
                case "1":
                    window.initKenoNGObject("loader", "red");
                    c("images/games-bg/game-bg-red.jpg");
                    break;
                case "2":
                    window.initKenoNGObject("loader", "green");
                    c("images/games-bg/game-bg-green.jpg");
                    break;
                case "3":
                    window.initKenoNGObject("loader", "gold");
                    c("images/games-bg/game-bg-gold.jpg");
                    break;
                case "4":
                    window.initKenoNGObject("loader", "blue");
                    break;
                case "5":
                    window.initKenoOldObject("loader",
                        "red");
                    c("images/games-bg/game-bg-red.jpg");
                    break;
                case "6":
                    window.initKenoOldObject("loader", "green");
                    c("images/games-bg/game-bg-green.jpg");
                    break;
                case "7":
                    window.initKenoNGObject("loader", "gold");
                    break;
                case "8":
                    window.initRedLotteryObject("loader", "red");
                    c("images/games-bg/game-bg-red.jpg");
                    break;
                case "9":
                    window.initRouletteObject("loader", "red");
                    c("images/games-bg/game-bg-red.jpg");
                    break;
                case "11":
                    window.initSicboObject("loader", "green");
                    break;
                case "12":
                    window.initRacingObject("loader", "green");
                    break;
                case "13":
                    window.initPokerObject("loader", "blue");
                    break;
                case "15":
                    window.initBlackRouletteObject("loader", "black2");
                    break;
                case "16":
                    window.initBlackRouletteObject("loader", "black");
                    break;
                case "17":
                    window.initBlackRouletteObject("loader", "red");
                    break;
                case "18":
                    window.initBlackRoulette4SashaObject("loader", "red");
                    break;
                case "19":
                    window.initBlackRoulette4SashaObject("loader", "green");
                    break;
                case "20":
                    window.initKenoJXObject("loader", "green");
                    break;
                case "21":
                    window.initKenoNGObject("loader", "v");
                    break;
                case "22":
                    window.initRouletteAutoObject("loader", "normal");
                    break;
                case "23":
                    window.initLottoMBKObject("loader", "blue");
                    break;
                case "24":
                    window.initLottoMBKObject("loader", "red");
                    break;
                case "25":
                    window.initLottoMBKObject("loader", "green");
                    break;
                case "26":
                    window.initKenoNGObject("loader", "x1");
                    c("images/games-bg/game-bg-blue.jpg");
                    break;
                case "27":
                    window.initKenoNGObject("loader", "x2");
                    c("images/games-bg/game-bg-red.jpg");
                    break;
                case "28":
                    window.initKenoOldObject("loader", "x2");
                    c("images/games-bg/game-bg-red.jpg");
                    break;
                case "37":
                    window.initPenaltyObject("loader", "normal");
                    break;
                case "38":
                case "416":
                case "1016":
                    window.initDog6Object("loader", "normal");
                    break;
                case "39":
                case "417":
                case "1017":
                    window.initHorse6Object("loader", "normal");
                    break;
                case "40":
                    window.initSoccerObject("loader", "normal");
                    break;
                case "42":
                    window.initLottoObject("loader", "red");
                    break;
                case "71":
                    window.initIntracingObject("loader", "normal");
                    break;
                case "72":
                    window.initLottoNewObject("loader", "blue");
                    break;
                case "73":
                    window.initLottoNewObject("loader",
                        "red");
                    break;
                case "74":
                    window.initLottoNewObject("loader", "green");
                    break;
                case "75":
                    window.initRoulette00Object("loader", "green");
                    break;
                case "76":
                    window.initS2wOrionObject("loader", "green");
                    break;
                case "86":
                    window.initQuickSpinLiveObject("loader", "normal");
                    break;
                case "93":
                    window.initSpinLiveGoObject("loader", "normal");
                    break;
                case "100":
                    window.initCovidObject("loader", "normal");
                    break;
                case "248":
                    window.initSpin2WinObject("loader", "normal");
                    break;
                default:
                    q = !0, w()
            }
        } else {
            function c(I) {
                switch (I.runConfig) {
                    case "KenoNG":
                        switch (I.gameType) {
                            case "blue":
                                return "0";
                            case "red":
                                return "1";
                            case "green":
                                return "2";
                            case "gold":
                                return "3";
                            case "v":
                                return "21"
                        }
                    case "KenoOld":
                        switch (I.gameType) {
                            case "blue":
                                return "0";
                            case "red":
                                return "5";
                            case "green":
                                return "6";
                            case "gold":
                                return "3"
                        }
                    case "KenoJXGreen":
                        return "20";
                    case "RedLottery":
                        return "8";
                    case "Roulette":
                        switch (I.gameType) {
                            case "red":
                                return "9";
                            case "green":
                                return "10"
                        }
                    case "BlackRoulette":
                        switch (I.gameType) {
                            case "black":
                                return "16";
                            case "red":
                                return "17";
                            case "black2":
                                return "15"
                        }
                    case "BlackRoulette4Sasha":
                        switch (I.gameType) {
                            case "red":
                                return "18";
                            case "green":
                                return "19"
                        }
                    case "Roulette00":
                        switch (I.gameType) {
                            case "green":
                                return "75"
                        }
                    case "Poker":
                        return "13";
                    case "Lotto":
                        return "42";
                    case "LottoNew":
                        switch (I.gameType) {
                            case "blue":
                                return "72";
                            case "red":
                                return "73";
                            case "green":
                                return "74"
                        }
                    case "Covid":
                        switch (I.gameType) {
                            case "normal":
                                return "100"
                        }
                }
            }

            var b;
            for (b = globalContentItems.length - 1; 0 <= b; b--) {
                var g = e.indexOf(c(globalContentItems[b]));
                -1 == g ? globalContentItems.splice(b, 1) : e.splice(g, 1)
            }
            q = !0;
            w()
        }
    };
    this.getAPICurrency = function (w) {
        return r.isAPIUser() ?
            "" == clientInfoGlobal.currencyname ? clientInfoGlobal.currency : clientInfoGlobal.currency + "\n(" + clientInfoGlobal.currencyname.toLowerCase() + ")" : w
    };
    this.addApiDetailInfo = function (w, e, v) {
        e.SkinId = function (b) {
            switch (b) {
                case "KenoNGBlue":
                    return "0";
                case "KenoNGRed":
                    return "1";
                case "KenoNGGreen":
                    return "2";
                case "KenoNGGold":
                    return "3";
                case "KenoNGV":
                    return "21";
                case "KenoOldBlue":
                    return "0";
                case "KenoOldRed":
                    return "5";
                case "KenoOldGreen":
                    return "6";
                case "KenoOldGold":
                    return "3";
                case "RedLottery":
                    return "8";
                case "Roulette":
                    return "9";
                case "Poker":
                    return "13";
                case "BlackRouletteBlack":
                    return "16";
                case "BlackRouletteRed":
                    return "17";
                case "BlackRoulette4SashaRed":
                    return "18";
                case "BlackRoulette4SashaGreen":
                    return "19";
                case "Roulette00Green":
                    return "75";
                case "Lotto":
                    return "42";
                case "LottoBlue":
                    return "72";
                case "LottoRed":
                    return "73";
                case "LottoGreen":
                    return "74";
                case "KenoJXGreen":
                    return "20";
                default:
                    return "-1"
            }
        }(w.runconfig);
        e.apiBts = function (b, g) {
            var c = [];
            switch (g) {
                case "21":
                    Array.isArray(b) ? c.push({
                        code: b.map(I => I.bet.join(";")).join("_"),
                        coef: b.map(I => w.coefTable[I.bet.length][I.bet.length - 1]).join("_"),
                        sum: b.reduce((I, G) => I + G.summ, 0)
                    }) : c.push({code: b.bet.join(";"), coef: w.coefTable[b.bet.length][b.bet.length - 1], sum: b.summ})
            }
            g = "";
            for (b = 0; b < c.length; b++) 0 !== b && (g += ","), g = g + c[b].code + "-" + Math.round(100 * c[b].coef) + "-" + 100 * c[b].sum;
            return g
        }(v, e.SkinId);
        return e
    }
}

function addCloseVideoButton(r) {
    if (!r) return !1
}

function removeCloseVideButton(r) {
    if (!r) return !1;
    r.css("visibility", "hidden")
}

function createCloseButton(r) {
    let E = document.createElement("button");
    E.style = "border:none;background:url(./libs/FLGUtils/resources/close.svg) no-repeat center center/42px 42px #fff;visibility:hidden;border-radius:50%;width: 40px;height:40px;position:absolute;top:20px;right:20px;cursor:pointer;background-size:42px 42px;box-shadow: 0 0 4px 0 #fff;";
    r.append(E);
    return $(E)
};
