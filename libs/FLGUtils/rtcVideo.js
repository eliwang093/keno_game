let rtcVideo = function () {
    function m() {
        a.onReady()
    }

    function n(b) {
        b.preventDefault();
        a.actFullscreen(!a.isFullScreen)
    }

    let a = {
        videoDom: null,
        parentId: null,
        styleObj: null,
        isFullscreen: !1,
        isFullScreen: !1,
        videoSize: {
            height: void 0,
            width: void 0,
            clientPosX: void 0,
            clientPosY: void 0,
            clientHeight: void 0,
            clientWidth: void 0,
            padding: void 0
        },
        player: null,
        src: null,
        rtcAppName: null,
        rtcStreamName: null,
        state: !1,
        init: function (b) {
            const {parentId: f, videoString: c, extraClass: e, videoId: k, parentClassName: g, onReady: d} = b;
            var h = ["video-wrap"];
            const l = c || '<video class="video-el" id="' + k + '" autoplay playsinline preload="metadata"></video>';
            e && h.push(e);
            g && h.push(g);
            e || "vip1001.de" !== location.host || h.push("cover-video", "blue");
            h = h.join(" ");
            let p = parseInt($(`#${f} canvas`).css("z-index"));
            a.wrapEl = $('<div class="' + h + '" id="video' + f + '" style="z-index:' + (p + 1) + ';" ' + h + "></div>")[0];
            a.videoEl = $(l)[0];
            a.fullscreenBtn = document.createElement("button");
            a.fullscreenBtn.id = "videoFullscreenBtn";
            a.fullscreenBtn.className = "btn-fullscreen";
            a.fullscreenBtn.addEventListener("click",
                n);
            $(a.wrapEl).append(a.videoEl);
            a.wrapEl.appendChild(a.fullscreenBtn);
            $(`#${f}`).append(a.wrapEl);
            a.onReady = d || a.onReadyDefault;
            a.videoEl.addEventListener("play", m);
            a.videoDom = b.videoId;
            a.parentId = b.parentId;
            a.styleObj = b.styleObj;
            a.videoSize.height = a.styleObj.sizeH;
            a.videoSize.width = a.styleObj.sizeW;
            a.setStyle(b.styleObj);
            a.resizeVideo();
            ({WowzaWebRTCPlayer: b} = window["wowza-webrtc-player"]);
            a.player = new b(document.getElementById(a.videoDom));
            window.addEventListener("resize", a.resizeVideo, !1);
            $(`#${a.parentId}`).bind("parentResized",
                a.resizeVideo);
            a.state = 1;
            return a.player
        },
        setSrc: function (b, f, c) {
            a.src = b;
            a.rtcAppName = f;
            a.rtcStreamName = c
        },
        setStyle: function (b) {
            b.borderURL && $(`#video${a.parentId}`).css({
                "background-image": "url(" + b.borderURL + ")",
                "background-repeat": "no-repeat",
                "background-position-x": "100%",
                "background-position-y": "100%",
                "background-size": "contain"
            });
            b.clipPath && $(`#video${a.parentId}`).css({"-webkit-clip-path": b.clipPath, "clip-path": b.clipPath})
        },
        prepareVideo(b) {
            if (a.state) a.showVideo(); else {
                b.parentClassName = "hiding";
                const {videoRtcUrl: f, videoRtcApp: c, videoRtcStream: e} = b;
                a.init(b);
                a.setSrc(f, c, e);
                a.playFirst();
                a.fullscreenBtn && (a.fullscreenBtn.style.visibility = "hidden;")
            }
        },
        onReadyDefault() {
        },
        playFirst: function () {
            a.player.setConfigurations({sdpUrl: a.src, applicationName: a.rtcAppName, streamName: a.rtcStreamName});
            a.play()
        },
        showVideo() {
            a.abilityTimer && clearTimeout(a.abilityTimer);
            a.wrapEl.classList.add("seen")
        },
        hideVideo() {
            a.state && (a.wrapEl.classList.remove("seen"), a.abilityTimer && clearTimeout(a.abilityTimer), a.abilityTimer =
                setTimeout(() => {
                    a.destroy()
                }, 18E4))
        },
        play: async function () {
            try {
                await a.player.playRemote(), a.state = 2
            } catch (b) {
                console.log("play err")
            }
        },
        stop: function () {
            if (!a.player) return console.error("player is not defined");
            a.player.stop()
        },
        calcVideoSize: function () {
            let b = $(`#${a.parentId} canvas`), f;
            f = 0 == parseInt(b.css("top")) ? "top" : "center";
            var c = b.attr("width"), e = parseFloat(b.css("width")), k = parseFloat(b.css("height"));
            c = e / c;
            a.styleObj && a.isFullscreen && (e = a.videoSize.width * a.styleObj.videoMaxScale * c, k = a.videoSize.height *
                a.styleObj.videoMaxScale * c);
            switch (f) {
                case "center":
                    var g = ($(`#${a.parentId}`).width() - e) / 2;
                    var d = ($(`#${a.parentId}`).height() - k) / 2;
                    break;
                case "top":
                    g = ($(`#${a.parentId}`).width() - e) / 2, d = 0
            }
            a.isFullscreen ? (a.videoSize.clientPosX = g - 1, a.videoSize.clientPosY = d + parseInt(b.parent().css("padding-top")), a.videoSize.clientHeight = k, a.videoSize.clientWidth = e + 1, a.videoSize.padding = a.styleObj ? a.styleObj.paddings * a.styleObj.videoMaxScale * c : 0, a.styleObj && a.styleObj.fullscreenPosY && (a.videoSize.clientPosY = a.styleObj.fullscreenPosY *
                c + ($(`#${a.parentId}`).height() - parseFloat(b.css("height"))) / 2 + parseInt(b.parent().css("padding-top"))), a.styleObj && a.styleObj.addOffsetX && (a.videoSize.clientPosX += a.styleObj.addOffsetX), a.styleObj && a.styleObj.fullscreenClipPath && $(`#video${a.parentId}`).css({
                "-webkit-clip-path": a.styleObj.fullscreenClipPath,
                "clip-path": a.styleObj.fullscreenClipPath
            })) : (a.videoSize.clientPosX = a.styleObj.posX * c + g, a.videoSize.clientPosY = a.styleObj.posY * c + d + parseInt(b.parent().css("padding-top")), a.videoSize.clientHeight =
                a.videoSize.height * c, a.videoSize.clientWidth = a.videoSize.width * c, a.videoSize.padding = a.styleObj ? a.styleObj.paddings * c : 0, a.styleObj && a.styleObj.clipPath && $(`#video${a.parentId}`).css({
                "-webkit-clip-path": a.styleObj.clipPath,
                "clip-path": a.styleObj.clipPath
            }));
            a.styleObj && a.styleObj.maskPath && $(`#video${a.parentId}`).css({
                "-webkit-mask": a.styleObj.maskPath,
                mask: a.styleObj.maskPath
            })
        },
        resizeVideo: function (b) {
            a.videoDom && ($(`#video${a.parentId}`).stop(), a.calcVideoSize(), $(`#video${a.parentId}`).css({
                left: a.videoSize.clientPosX +
                    "px",
                top: a.videoSize.clientPosY + "px",
                height: a.videoSize.clientHeight + "px",
                width: a.videoSize.clientWidth + "px",
                padding: a.videoSize.padding + "px"
            }))
        },
        setFullscreenMode: function (b) {
            a.isFullscreen = b;
            $(`#video${a.parentId}`).stop();
            a.calcVideoSize();
            a.styleObj && (a.styleObj.clipPath || a.styleObj.fullscreenClipPath) && (b ? $(`#video${a.parentId}`).css({
                transition: "clip-path .55s cubic-bezier(0.645, 0.045, 0.355, 1)",
                "-webkit-transition": "-webkit-clip-path .55s cubic-bezier(0.645, 0.045, 0.355, 1)"
            }) : $(`#video${a.parentId}`).css({
                transition: "clip-path .5s cubic-bezier(0.645, 0.045, 0.355, 1)",
                "-webkit-transition": "-webkit-clip-path .5s cubic-bezier(0.645, 0.045, 0.355, 1)"
            }));
            $(`#video${a.parentId}`).animate({
                left: a.videoSize.clientPosX,
                top: a.videoSize.clientPosY,
                width: a.videoSize.clientWidth,
                height: a.videoSize.clientHeight,
                padding: a.videoSize.padding
            }, 500, "easeInOutCubic")
        },
        actFullscreen: function (b = !0) {
            const {clientPosX: f, clientPosY: c} = a.videoSize, {sizeW: e, sizeH: k} = a.styleObj;
            if (!a.wrapEl) return console.error("Element is not defined");
            const g = document.querySelector(`#${a.parentId} canvas`);
            if (!g) return console.error("PARENT element is not defined");
            var d = parseInt(g.getAttribute("width"));
            d = parseInt(g.clientWidth / d * 100) / 100;
            d = {width: e * d + "px", height: k * d + "px", left: f + "px", top: c + "px"};
            b && (d.width = "100%", d.height = parseInt(g.clientHeight + 3) + "px", d.top = (innerHeight - g.clientHeight) / 2 + "px", d.left = 0);
            Object.entries(d).forEach(([h, l]) => {
                a.wrapEl.style[h] = l
            });
            a.isFullScreen = b
        },
        destroy: function () {
            a.state && (a.stop(), window.removeEventListener("resize", a.resizeVideo), $(`#${a.parentId}`).unbind("parentResized",
                a.resizeVideo), a.videoEl && a.videoEl.removeEventListener("play", m), a.fullscreenBtn && a.fullscreenBtn.removeEventListener("click", n), $(a.wrapEl).remove(), $(`#video${a.parentId}`).remove(), a.videoDom = null, a.parentId = null, a.styleObj = null, a.isFullscreen = !1, a.videoSize = {
                height: void 0,
                width: void 0,
                clientPosX: void 0,
                clientPosY: void 0,
                clientHeight: void 0,
                clientWidth: void 0,
                padding: void 0
            }, a.player = null, a.src = null, a.state = 0, a.wrapEl = null, a.videoEl = null, a.onReady = null, a.isFullScreen = !1)
        }
    };
    return a
}();
