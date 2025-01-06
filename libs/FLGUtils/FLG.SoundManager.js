function SoundManager(e, h, g) {
    var f = this;
    switch (e) {
        case "Poker":
        case "Roulette":
        case "RedLottery":
            var b = {
                clearBet: new Howl({src: ["libs/FLGUtils/resources/audio/clearBet.mp3"]}),
                chipSelector: new Howl({src: ["libs/FLGUtils/resources/audio/chipSelector.mp3"]}),
                firstChip: new Howl({src: ["libs/FLGUtils/resources/audio/firstChip.mp3"]}),
                stackChip: new Howl({src: ["libs/FLGUtils/resources/audio/stackChip.mp3"]}),
                buttonClick: new Howl({src: ["libs/FLGUtils/resources/audio/buttonClick.mp3"]}),
                winZone: new Howl({src: ["libs/FLGUtils/resources/audio/smallWin.mp3"]}),
                endBet: new Howl({src: ["libs/FLGUtils/resources/audio/endBet.mp3"]}),
                achievement: new Howl({src: ["libs/FLGUtils/resources/audio/achievement.mp3"]}),
                coins: new Howl({src: ["libs/FLGUtils/resources/audio/coins.mp3"]})
            };
            break;
        case "Keno":
        case "Lotto":
        case "LottoSeparate":
            b = {
                clearBet: new Howl({src: ["libs/FLGUtils/resources/audio/clearBet.mp3"]}),
                chipSelector: new Howl({src: ["libs/FLGUtils/resources/audio/chipSelector.mp3"]}),
                firstChip: new Howl({src: ["libs/FLGUtils/resources/audio/firstChip.mp3"]}),
                buttonClick: new Howl({src: ["libs/FLGUtils/resources/audio/buttonClick.mp3"]}),
                endBet: new Howl({src: ["libs/FLGUtils/resources/audio/endBet.mp3"]}),
                ball: new Howl({src: ["NG" == g || "Lotto" == e ? "libs/FLGUtils/resources/audio/ballCollision.mp3" : "libs/FLGUtils/resources/audio/tik2.wav"]}),
                ballQuiet: new Howl({src: ["NG" == g || "Lotto" == e ? "libs/FLGUtils/resources/audio/ballCollisionQuiet.mp3" : ""]}),
                achievement: new Howl({src: ["libs/FLGUtils/resources/audio/achievement.mp3"]}),
                coins: new Howl({src: ["libs/FLGUtils/resources/audio/coins.mp3"]})
            };
            break;
        default:
            b = {
                clearBet: new Howl({src: ["libs/FLGUtils/resources/audio/clearBet.mp3"]}),
                chipSelector: new Howl({src: ["libs/FLGUtils/resources/audio/chipSelector.mp3"]}),
                firstChip: new Howl({src: ["libs/FLGUtils/resources/audio/firstChip.mp3"]}),
                stackChip: new Howl({src: ["libs/FLGUtils/resources/audio/stackChip.mp3"]}),
                buttonClick: new Howl({src: ["libs/FLGUtils/resources/audio/buttonClick.mp3"]}),
                winZone: new Howl({src: ["libs/FLGUtils/resources/audio/smallWin.mp3"]}),
                endBet: new Howl({src: ["libs/FLGUtils/resources/audio/endBet.mp3"]}),
                achievement: new Howl({src: ["libs/FLGUtils/resources/audio/achievement.mp3"]}),
                coins: new Howl({src: ["libs/FLGUtils/resources/audio/coins.mp3"]})
            }
    }
    var c = !1, d = .8;
    this.playSound = function (a) {
        if (void 0 != a && void 0 != b[a]) return c ? b[a].mute() : (b[a].volume(d), b[a].play()), !0;
        b.default.play();
        return !1
    };
    this.playRandomBackSound = function () {
    };
    this.muteSound = function (a) {
        c = a
    };
    this.isMuted = function () {
        return c
    };
    this.volumeSound = function (a) {
        if (!arguments.length) return d;
        d = a
    };
    this.destroy = function () {
        var a;
        d = c = b = null;
        for (a in f) f[a] = null;
        f = null
    }
};
