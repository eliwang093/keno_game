function BlackRoulette4SashaAppMobile(gameConfig) {
    this.destroy = function () {
        mainUIManagerLocal.destroy();
        mainUIManagerLocal = null;
        mainGridLocal.destroy();
        mainGridLocal = null;
        mainFLGAccountLocal.destroy();
        mainFLGAccountLocal = null;
        mainGameManagerLocal.destroy();
        mainGameManagerLocal = null;
        mainRendererLocal.destroy();
        mainRendererLocal = null;
        selfLocal.mainSoundManager.destroy();
        for (var i in selfLocal) {
            selfLocal[i] = null
        }
        selfLocal = null
    };
    var selfLocal = this;
    this.gameDir = 'games/BlackRoulette4Sasha/resources/';
    this.gameDirMobile = 'games/BlackRoulette4Sasha/resources/mobile/';
    this.gameConfig = gameConfig;
    var mainRendererLocal = new FLGRenderer(1920, 1080, gameConfig.canvasId, 'center');
    this.mainRenderer = mainRendererLocal;
    this.mainSoundManager = new SoundManager(selfLocal.gameConfig.gameKind, selfLocal.gameConfig.gameType, selfLocal.gameConfig.gameVariant);
    var mainFLGAccountLocal = new FLGAccount(null, selfLocal.mainSoundManager, selfLocal.mainRenderer);
    this.mainFLGAccount = mainFLGAccountLocal;
    var mainGameManagerLocal = new gameManagerBlackRoulette4Sasha(this);
    this.mainGameManager = mainGameManagerLocal;
    var mainUIManagerLocal = new UIManagerBlackRoulette4SashaMobile(this);
    this.mainUIManager = mainUIManagerLocal;
    var mainGridLocal;
    this.setMainGrid = function (value) {
        mainGridLocal = value;
        selfLocal.mainGrid = mainGridLocal
    }
}

function UIManagerBlackRoulette4SashaMobile(gameObj) {
    this.destroy = function () {
        clearTimeout(betTimeoutId);
        clearTimeout(animateResultTimeoutId);
        selfLocal.events.removeAllListeners();
        coinArr = null;
        progressPixels = null;
        betsControlsLocal.destroy();
        betsControlsLocal = null;
        mainFLGTimer.destroy();
        mainFLGTimer = null;
        htmlControlsMngrLocal.destroy();
        htmlControlsMngrLocal = null;
        if (mainVideo) {
            if (gameObj.gameConfig.needHls) {
                mainVideo.destroy()
            } else if (gameObj.gameConfig.needRtc) {
                rtcVideo.destroy()
            }
        }
        mainVideo = null;
        bgContainer = null;
        mainGridContainer = null;
        videoContainer = null;
        maskGridContainer = null;
        switchGridContainer = null;
        accountContainer = null;
        lastTouchedZoneName = null;
        getBetsArrByBetsHistoryFunc = null;
        getMAXByCombFunc = null;
        for (var i = 0; i < initEditionObjArr.length; i++) {
            initEditionObjArr[i].round = null;
            initEditionObjArr[i].editionResult = null;
            if (initEditionObjArr[i].betsHistory.destroy) {
                initEditionObjArr[i].betsHistory.destroy()
            }
            initEditionObjArr[i].betsHistory = null;
            initEditionObjArr[i] = null
        }
        initEditionObjArr = null;
        initEditionsFunc = null;
        for (var i in animatedTweens) {
            animatedTweens[i] = null
        }
        animatedTweens = null;
        slideAnimationFunc = null;
        clickAnimationFunc = null;
        hoverEnterAnimationFunc = null;
        hoverLeaveAnimationFunc = null;
        repeatInNextRound = null;
        repeatInNextRoundx2 = null;
        onHomeFunc = null;
        onVideoFunc = null;
        onRebetFunc = null;
        onRebetx2Func = null;
        onWinRebetFunc = null;
        onWinRebetx2Func = null;
        onDoubleFunc = null;
        onClearFunc = null;
        onUndoFunc = null;
        onMyBetsFunc = null;
        onChipSelectFunc = null;
        showPossibleWinFunc = null;
        resources = null;
        sectorButtonsInfo = null;
        cubeSectorsInfo = null;
        startGameFunc = null;
        gameObj.mainFLGAccount.events.off('onBet', onBetChangeFunc);
        gameObj.mainFLGAccount.events.off('onBalance', onBalanceChangeFunc);
        onBetChangeFunc = null;
        onBalanceChangeFunc = null;
        mainEditions.destroy();
        mainEditions = null;
        mainFortuneBetManager.destroy();
        mainFortuneBetManager = null;
        mainFortuneModeManager.destroy();
        mainFortuneModeManager = null;
        for (var i in selfLocal) {
            selfLocal[i] = null
        }
        selfLocal = null
    };
    var selfLocal = this;
    this.events = new PIXI.utils.EventEmitter();
    var getMAXByCombFunc = function (comb) {
        var cmbVal = parseInt(comb);
        if (parseInt(clientInfoGlobal.hall) == 'DEMO') {
            return 1
        }
        if (cmbVal <= 36) {
            return parseInt(clientInfoGlobal.cf36max) / 100
        } else if (cmbVal <= 42) {
            return parseInt(clientInfoGlobal.cf3max) / 100
        } else if (cmbVal <= 48) {
            return parseInt(clientInfoGlobal.cf2max) / 100
        } else if ((cmbVal <= 135) || (cmbVal >= 172 && cmbVal <= 195)) {
            return parseInt(clientInfoGlobal.cf18max) / 100
        } else if (cmbVal == 136 || cmbVal == 137 || (cmbVal >= 196 && cmbVal <= 207)) {
            return parseInt(clientInfoGlobal.cf12max) / 100
        } else if ([141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171].indexOf(cmbVal) != -1) {
            return parseInt(clientInfoGlobal.cf6max) / 100
        } else if (cmbVal < 250) {
            return parseInt(clientInfoGlobal.cf9max) / 100
        }
    };
    var coinArr = clientInfoGlobal.coin6.split('-');
    for (var i = 0; i < coinArr.length; i++) {
        coinArr[i] = coinArr[i] / 100
    }
    coinArr.push('MAX');
    var betsControlsLocal = new betsControls(coinArr[0], coinArr[coinArr.length - 1], coinArr[1], coinArr, function (combObj) {
        var val = getMAXByCombFunc(combObj.comb) - combObj.curSumm;
        if (gameObj.mainFLGAccount.balance() < val) {
            val = gameObj.mainFLGAccount.balance()
        }
        gameObj.mainRenderer.renderManager.needUpdateRender = !0;
        return val
    });
    this.betsControls = betsControlsLocal;
    var htmlControlsMngrLocal;
    var mainFLGTimer = new FLGTimer();
    var mainVideo;
    var bgContainer = new PIXI.Container();
    var mainGridContainer = new PIXI.Container();
    var videoContainer = new PIXI.Container();
    var maskGridContainer = new PIXI.Container();
    var switchGridContainer = new PIXI.Container();
    var accountContainer = new PIXI.Container();
    var lastTouchedZoneName;
    var mainEditions;
    var mainFortuneBetManager;
    this.betManager = function () {
        return mainFortuneBetManager
    };
    var mainFortuneModeManager;
    var getBetsArrByBetsHistoryFunc = function (betsHstr) {
        var betsArr = [], betCode = 0;
        if (!betsHstr) {
            return betsArr
        }
        for (var bet in betsHstr) {
            if (betCode != betsHstr[bet].code) {
                betsArr.push({
                    fortuneBetObjArr: [{
                        comb: betsHstr[bet].e1,
                        coef: betsHstr[bet].koef,
                        summ: betsHstr[bet].bet / 100
                    }], win: betsHstr[bet].win / 100, code: betsHstr[bet].code
                })
            } else {
                betsArr[betsArr.length - 1].fortuneBetObjArr.push({
                    comb: betsHstr[bet].e1,
                    coef: betsHstr[bet].koef,
                    summ: betsHstr[bet].bet / 100
                })
            }
        }
        return betsArr
    };
    var initEditionObjArr = [];
    var initEditionsFunc = function (gmState, succesFunc) {
        function getResArr(gmState) {
            var resArr = [];
            var ball = gmState.ball;
            if (ball != 99) {
                resArr.push(ball)
            }
            return resArr
        }

        gameObj.mainGameManager.gameHistory(function (gmHistory) {
            for (var i = 21; i >= 0; i--) {
                initEditionObjArr.push({
                    round: gmHistory['' + i].tir,
                    editionResult: [gmHistory['' + i].ball],
                    betsHistory: new fortuneBets([])
                })
            }
            initEditionObjArr.push({
                round: gmState.tir,
                editionResult: getResArr(gmState),
                betsHistory: new fortuneBets(gmState.t2 > 0 ? getBetsArrByBetsHistoryFunc(gmState.rulbet) : [])
            });
            mainEditions = new editions(initEditionObjArr);
            mainEditions.drawEditions();
            if (succesFunc) {
                succesFunc()
            }
        })
    };
    var animatedTweens = {};
    var slideAnimationFunc = function (obj, ID, valueX, valueY, callbackFunc) {
        if (!obj) {
            return
        }
        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
            return
        }
        gameObj.mainRenderer.renderManager.animationTweenInc();
        animatedTweens[ID] = new TWEEN.Tween(obj.position).to({
            x: valueX,
            y: valueY
        }, 500).easing(TWEEN.Easing.Cubic.InOut).onStop(function () {
            gameObj.mainRenderer.renderManager.animationTweenDec();
            animatedTweens[ID] = null
        }).onComplete(function () {
            gameObj.mainRenderer.renderManager.animationTweenDec();
            animatedTweens[ID] = null;
            if (callbackFunc) {
                callbackFunc()
            }
        }).start()
    };
    var clickAnimationFunc = function (obj, ID) {
        if (!obj) {
            return
        }
        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
            gameObj.mainRenderer.renderManager.animationTweenDec()
        }
        gameObj.mainRenderer.renderManager.animationTweenInc();
        animatedTweens[ID] = new TWEEN.Tween(obj).to({alpha: 1}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
            gameObj.mainRenderer.renderManager.animationTweenDec();
            animatedTweens[ID] = null;
            gameObj.mainRenderer.renderManager.animationTweenInc();
            animatedTweens[ID] = new TWEEN.Tween(obj).to({alpha: 0}, 500).onComplete(function () {
                gameObj.mainRenderer.renderManager.animationTweenDec();
                animatedTweens[ID] = null
            }).start()
        }).start()
    };
    var hoverEnterAnimationFunc = function (obj, ID, animType) {
        if (!obj) {
            return
        }
        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
            gameObj.mainRenderer.renderManager.animationTweenDec()
        }
        gameObj.mainRenderer.renderManager.animationTweenInc();
        switch (animType) {
            case 'grow':
                animatedTweens[ID] = new TWEEN.Tween(obj.scale).to({
                    x: 1.2,
                    y: 1.2
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    gameObj.mainRenderer.renderManager.animationTweenDec();
                    animatedTweens[ID] = null
                }).start();
                break;
            default:
                animatedTweens[ID] = new TWEEN.Tween(obj).to({alpha: 0.6}, 110).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    gameObj.mainRenderer.renderManager.animationTweenDec();
                    animatedTweens[ID] = null
                }).start()
        }
    };
    var hoverLeaveAnimationFunc = function (obj, ID, animType) {
        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
            gameObj.mainRenderer.renderManager.animationTweenDec()
        }
        if (!obj || obj.alpha == 0) {
            return
        }
        gameObj.mainRenderer.renderManager.animationTweenInc();
        switch (animType) {
            case 'grow':
                animatedTweens[ID] = new TWEEN.Tween(obj.scale).to({
                    x: 0.9,
                    y: 0.9
                }, 330).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                    gameObj.mainRenderer.renderManager.animationTweenDec();
                    animatedTweens[ID] = null
                }).start();
                break;
            default:
                animatedTweens[ID] = new TWEEN.Tween(obj).to({alpha: 0}, 500).onComplete(function () {
                    gameObj.mainRenderer.renderManager.animationTweenDec();
                    animatedTweens[ID] = null
                }).start()
        }
    };
    var onHomeFunc = function () {
        gameObj.mainSoundManager.playSound('buttonClick');
        gameObj.mainFLGAccount.closeGame()
    };
    var onVideoFunc = function (value) {
        if (videoContainer.position.x > 0 && videoContainer.position.x < 1920) {
            return
        }
        gameObj.mainSoundManager.playSound('buttonClick');
        gameObj.mainUIManager.setVideoVisibility(value);
        htmlControlsMngrLocal.setVideoBtnsVisibility(value)
    };
    var repeatInNextRound = !1;
    var repeatInNextRoundx2 = !1;
    var onWinRebetFunc = function () {
        gameObj.mainSoundManager.playSound('stackChip');
        repeatInNextRound = !0;
        htmlControlsMngrLocal.setRebetInteraction(!1)
    };
    var onWinRebetx2Func = function () {
        gameObj.mainSoundManager.playSound('stackChip');
        repeatInNextRoundx2 = !0;
        htmlControlsMngrLocal.setRebetInteraction(!1)
    };
    var onRebetFunc = function () {
        if ($(this).hasClass('btn_disabled')) {
            return
        }
        gameObj.mainSoundManager.playSound('stackChip');
        mainFortuneBetManager.repeatLastRoundGridState();
        htmlControlsMngrLocal.setRebetInteraction(!1)
    };
    var onRebetx2Func = function () {
        if ($(this).hasClass('btn_disabled')) {
            return
        }
        gameObj.mainSoundManager.playSound('stackChip');
        mainFortuneBetManager.repeatLastRoundGridState();
        mainFortuneBetManager.doubleCurrentBets();
        htmlControlsMngrLocal.setRebetInteraction(!1)
    };
    var onDoubleFunc = function () {
        if ($(this).hasClass('btn_disabled')) {
            return
        }
        if (gameObj.mainGrid.pressedZones.length == 0) {
            return
        }
        gameObj.mainSoundManager.playSound('stackChip');
        mainFortuneBetManager.doubleCurrentBets()
    };
    var onClearFunc = function () {
        if ($(this).hasClass('btn_disabled')) {
            return
        }
        if (gameObj.mainGrid.pressedZones.length == 0) {
            return
        }
        gameObj.mainSoundManager.playSound('clearBet');
        gameObj.mainGrid.removeCurrentBets();
        gameObj.mainFLGAccount.maxWin(0);
        gameObj.mainFLGAccount.totalBet(-gameObj.mainFLGAccount.totalBet());
        mainFortuneBetManager.addGridState()
    };
    var onUndoFunc = function () {
        if ($(this).hasClass('btn_disabled')) {
            return
        }
        gameObj.mainSoundManager.playSound('buttonClick');
        mainFortuneBetManager.undoGridState()
    };
    var onMyBetsFunc = function () {
        gameObj.mainSoundManager.playSound('buttonClick');
        showCashFlowDlg()
    };
    var onChipSelectFunc = function (value, divId) {
        gameObj.mainSoundManager.playSound('chipSelector');
        betsControlsLocal.setBet(value);
        mainFortuneModeManager.setMode({modeName: value, modeSprite: {name: divId}})
    };
    var onBetChangeFunc;
    var onBalanceChangeFunc;
    var resources = [[gameObj.gameConfig.BG, gameObj.gameDirMobile + gameObj.gameConfig.BG + '2-' + gameObj.gameConfig.gameType.toLowerCase() + '.jpg'], ['WIN', gameObj.gameDir + 'WIN2.png'], ['table_bg_main', gameObj.gameDir + 'table-bg-main.png'], ['table_bg_sectors', gameObj.gameDir + 'table-bg-sectors.png'], ['table_bg_footer', gameObj.gameDir + 'table-bg-footer.png'], ['table_disable_main', gameObj.gameDir + 'disable-table-main.png'], ['table_disable_sectors', gameObj.gameDir + 'disable-table-sectors.png'], ['table_disable_footer', gameObj.gameDir + 'disable-table-footer.png'], ['btn_switch_sectors', gameObj.gameDir + 'btn-switch-sectors.png'], ['btn_switch_sectors_mode_selected', gameObj.gameDir + 'btn-switch-sectors-mode-selected.png'], ['btn_switch_grid', gameObj.gameDir + 'btn-switch-grid.png'], ['btn_switch_grid_mode_selected', gameObj.gameDir + 'btn-switch-grid-mode-selected.png'], ['btn_clear', gameObj.gameDirMobile + 'btn-clear.png'], ['btn_clear_mode_selected', gameObj.gameDirMobile + 'btn-clear-mode-selected.png'], ['btn_undo', gameObj.gameDirMobile + 'btn-undo4.png'], ['btn_undo_mode_selected', gameObj.gameDirMobile + 'btn-undo-mode-selected4.png'], ['btn_home', gameObj.gameDirMobile + 'btn-home.png'], ['btn_home_mode_selected', gameObj.gameDirMobile + 'btn-home-mode-selected.png'], ['btn_double', gameObj.gameDirMobile + 'btn-double.png'], ['btn_double_mode_selected', gameObj.gameDirMobile + 'btn-double-mode-selected.png'], ['btn_bets', gameObj.gameDirMobile + 'btn-my-bets.png'], ['btn_bets_mode_selected', gameObj.gameDirMobile + 'btn-my-bets-selected.png'], ['btn_video', gameObj.gameDirMobile + 'btn-video1.png'], ['btn_video_mode_selected', gameObj.gameDirMobile + 'btn-video-mode-selected1.png'], ['btn_video_return', gameObj.gameDirMobile + 'btn-video-return-main.png'], ['btn_video_return_mode_selected', gameObj.gameDirMobile + 'btn-video-return-main-mode-selected.png'], ['btn_video_return_sectors', gameObj.gameDirMobile + 'btn-video-return-sectors.png'], ['btn_video_return_sectors_mode_selected', gameObj.gameDirMobile + 'btn-video-return-sectors-mode-selected.png'], ['btn_sound', gameObj.gameDirMobile + 'btn-sound.png'], ['btn_sound_mode_selected', gameObj.gameDirMobile + 'btn-sound-mode-selected.png'], ['mute_sign', gameObj.gameDirMobile + 'mute-sign2.png'], ['video_img', gameObj.gameDirMobile + 'video-img3.jpg'], ['video_frame', gameObj.gameDirMobile + 'video-frame2.png'], ['btn_video_load', gameObj.gameDir + 'btn-video-load.png'], ['inner_zone', gameObj.gameDir + 'inner-zone6.png'], ['inner_zone_zero', gameObj.gameDir + 'inner-zone-zero3.png'], ['inner_sector_cube', gameObj.gameDir + 'inner-sector-cube3.png'], ['inner_sector_11', gameObj.gameDir + 'inner-sector-11_3.png'], ['inner_sector_16', gameObj.gameDir + 'inner-sector-16_3.png'], ['inner_sector_30', gameObj.gameDir + 'inner-sector-30_3.png'], ['inner_sector_24', gameObj.gameDir + 'inner-sector-24_3.png'], ['inner_sector_8', gameObj.gameDir + 'inner-sector-8_3.png'], ['inner_sector_5', gameObj.gameDir + 'inner-sector-5_3.png'], ['inner_sector_23', gameObj.gameDir + 'inner-sector-23_3.png'], ['inner_sector_10', gameObj.gameDir + 'inner-sector-10_3.png'], ['inner_sector_15', gameObj.gameDir + 'inner-sector-15_3.png'], ['inner_sector_12', gameObj.gameDir + 'inner-sector-12_3.png'], ['inner_sector_32', gameObj.gameDir + 'inner-sector-32_3.png'], ['inner_sector_35', gameObj.gameDir + 'inner-sector-35_3.png'], ['inner_sector_0', gameObj.gameDir + 'inner-sector-0_3.png'], ['inner_sector_3', gameObj.gameDir + 'inner-sector-3_3.png'], ['inner_sector_26', gameObj.gameDir + 'inner-sector-26_3.png'], ['chip_1', gameObj.gameDir + 'icons_chip_1.png'], ['chip_2', gameObj.gameDir + 'icons_chip_2.png'], ['chip_3', gameObj.gameDir + 'icons_chip_3.png'], ['chip_4', gameObj.gameDir + 'icons_chip_4.png'], ['chip_5', gameObj.gameDir + 'icons_chip_5.png'], ['chip_6', gameObj.gameDir + 'icons_chip_6.png'], ['zone_win_chip', gameObj.gameDir + 'ring.png'], ['possible_win_bg', gameObj.gameDir + 'icon-possible-win.png']];
    var sectorButtonsInfo = {
        49: {size: {w: 253, h: 212}, pos: {zonePosX: 165, zonePosY: 80}, hoverTexture: ''},
        50: {size: {w: 332, h: 212}, pos: {zonePosX: 418, zonePosY: 80}, hoverTexture: ''},
        51: {size: {w: 404, h: 212}, pos: {zonePosX: 750, zonePosY: 80}, hoverTexture: ''},
        52: {size: {w: 125, h: 212}, pos: {zonePosX: 1154, zonePosY: 80}, hoverTexture: ''}
    };
    var cubeSectorsInfo = {
        10: {size: {w: 92, h: 71}, pos: {zonePosX: 9, zonePosY: 115}, hoverTexture: 'inner_sector_10'},
        5: {size: {w: 108, h: 88}, pos: {zonePosX: 27, zonePosY: 50}, hoverTexture: 'inner_sector_5'},
        24: {size: {w: 102, h: 92}, pos: {zonePosX: 84, zonePosY: 12}, hoverTexture: 'inner_sector_24'},
        16: {size: {w: 83, h: 71}, pos: {zonePosX: 169, zonePosY: 8}, hoverTexture: 'inner_sector_16'},
        33: {size: {w: 77, h: 71}, pos: {zonePosX: 254, zonePosY: 8}, hoverTexture: 'inner_sector_cube'},
        1: {size: {w: 77, h: 71}, pos: {zonePosX: 347, zonePosY: 8}, hoverTexture: 'inner_sector_cube'},
        20: {size: {w: 77, h: 71}, pos: {zonePosX: 427, zonePosY: 8}, hoverTexture: 'inner_sector_cube'},
        14: {size: {w: 77, h: 71}, pos: {zonePosX: 506, zonePosY: 8}, hoverTexture: 'inner_sector_cube'},
        31: {size: {w: 77, h: 71}, pos: {zonePosX: 586, zonePosY: 8}, hoverTexture: 'inner_sector_cube'},
        9: {size: {w: 77, h: 71}, pos: {zonePosX: 665, zonePosY: 8}, hoverTexture: 'inner_sector_cube'},
        22: {size: {w: 77, h: 71}, pos: {zonePosX: 758, zonePosY: 8}, hoverTexture: 'inner_sector_cube'},
        18: {size: {w: 77, h: 71}, pos: {zonePosX: 838, zonePosY: 8}, hoverTexture: 'inner_sector_cube'},
        29: {size: {w: 77, h: 71}, pos: {zonePosX: 917, zonePosY: 8}, hoverTexture: 'inner_sector_cube'},
        7: {size: {w: 77, h: 71}, pos: {zonePosX: 997, zonePosY: 8}, hoverTexture: 'inner_sector_cube'},
        28: {size: {w: 77, h: 71}, pos: {zonePosX: 1076, zonePosY: 8}, hoverTexture: 'inner_sector_cube'},
        12: {size: {w: 83, h: 71}, pos: {zonePosX: 1162, zonePosY: 8}, hoverTexture: 'inner_sector_12'},
        35: {size: {w: 102, h: 92}, pos: {zonePosX: 1235, zonePosY: 14}, hoverTexture: 'inner_sector_35'},
        3: {size: {w: 109, h: 93}, pos: {zonePosX: 1288, zonePosY: 61}, hoverTexture: 'inner_sector_3'},
        26: {size: {w: 87, h: 97}, pos: {zonePosX: 1318, zonePosY: 138}, hoverTexture: 'inner_sector_26'},
        0: {size: {w: 109, h: 93}, pos: {zonePosX: 1288, zonePosY: 218}, hoverTexture: 'inner_sector_0'},
        32: {size: {w: 102, h: 92}, pos: {zonePosX: 1235, zonePosY: 262}, hoverTexture: 'inner_sector_32'},
        15: {size: {w: 83, h: 71}, pos: {zonePosX: 1162, zonePosY: 292}, hoverTexture: 'inner_sector_15'},
        19: {size: {w: 77, h: 71}, pos: {zonePosX: 1076, zonePosY: 295}, hoverTexture: 'inner_sector_cube'},
        4: {size: {w: 77, h: 71}, pos: {zonePosX: 997, zonePosY: 295}, hoverTexture: 'inner_sector_cube'},
        21: {size: {w: 77, h: 71}, pos: {zonePosX: 917, zonePosY: 295}, hoverTexture: 'inner_sector_cube'},
        2: {size: {w: 77, h: 71}, pos: {zonePosX: 838, zonePosY: 295}, hoverTexture: 'inner_sector_cube'},
        25: {size: {w: 77, h: 71}, pos: {zonePosX: 758, zonePosY: 295}, hoverTexture: 'inner_sector_cube'},
        17: {size: {w: 77, h: 71}, pos: {zonePosX: 665, zonePosY: 295}, hoverTexture: 'inner_sector_cube'},
        34: {size: {w: 77, h: 71}, pos: {zonePosX: 586, zonePosY: 295}, hoverTexture: 'inner_sector_cube'},
        6: {size: {w: 77, h: 71}, pos: {zonePosX: 506, zonePosY: 295}, hoverTexture: 'inner_sector_cube'},
        27: {size: {w: 77, h: 71}, pos: {zonePosX: 413, zonePosY: 295}, hoverTexture: 'inner_sector_cube'},
        13: {size: {w: 77, h: 71}, pos: {zonePosX: 333, zonePosY: 295}, hoverTexture: 'inner_sector_cube'},
        36: {size: {w: 77, h: 71}, pos: {zonePosX: 254, zonePosY: 295}, hoverTexture: 'inner_sector_cube'},
        11: {size: {w: 82, h: 73}, pos: {zonePosX: 170, zonePosY: 293}, hoverTexture: 'inner_sector_11'},
        30: {size: {w: 102, h: 92}, pos: {zonePosX: 84, zonePosY: 270}, hoverTexture: 'inner_sector_30'},
        8: {size: {w: 108, h: 88}, pos: {zonePosX: 27, zonePosY: 230}, hoverTexture: 'inner_sector_8'},
        23: {size: {w: 92, h: 71}, pos: {zonePosX: 9, zonePosY: 188}, hoverTexture: 'inner_sector_23'}
    };
    resources = resources.concat(gameObj.mainFLGAccount.resources);
    gameObj.mainRenderer.loadResources(gameObj.mainRenderer.stage, 'images/logo.json', resources, function onLoad(loader, loadedResource, closeBGFunc) {
        gameObj.mainRenderer.createButton(undefined, 0, 0, gameObj.gameConfig.BG);
        mainFortuneModeManager = new fortuneModeManager(gameObj);
        var dummySprt = gameObj.mainRenderer.createButton(videoContainer, -960, 490, 'btn_video_load');
        dummySprt.anchor.set(0.5, 0.5);
        dummySprt.scale.set(1.75, 1.75);
        dummySprt = gameObj.mainRenderer.createButton(videoContainer, -910, 490, 'video_frame');
        dummySprt.anchor.set(0.5, 0.5);
        dummySprt.scale.set(0.95, 1);
        dummySprt.visible = !1;
        gameObj.mainRenderer.createButton(videoContainer, -1800, 350, undefined, {
            text: '',
            align: 'center',
            style: {font: '36px Arial Narrow', fill: '#fe0000', align: 'center'}
        });
        dummySprt = gameObj.mainRenderer.createButton(videoContainer, -1920, 400, 'btn_video_return');
        gameObj.mainRenderer.createButton(dummySprt, 0, 0, 'btn_video_return_mode_selected', undefined, function (icon, event) {
            gameObj.mainSoundManager.playSound('buttonClick');
            event.stopped = !0;
            clickAnimationFunc(icon, 'btn_video_return');
            gameObj.mainUIManager.setVideoVisibility(!1);
            htmlControlsMngrLocal.setVideoBtnsVisibility(!1);
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        }, undefined, undefined, function (icon) {
            hoverEnterAnimationFunc(icon, 'btn_video_return')
        }, function (icon) {
            hoverLeaveAnimationFunc(icon, 'btn_video_return')
        }).alpha = 0;
        dummySprt = gameObj.mainRenderer.createButton(videoContainer, -1920, 400, 'btn_video_return_sectors');
        gameObj.mainRenderer.createButton(dummySprt, 0, 0, 'btn_video_return_sectors_mode_selected', undefined, function (icon, event) {
            gameObj.mainSoundManager.playSound('buttonClick');
            event.stopped = !0;
            clickAnimationFunc(icon, 'btn_video_return');
            gameObj.mainUIManager.setVideoVisibility(!1);
            htmlControlsMngrLocal.setVideoBtnsVisibility(!1);
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        }, undefined, undefined, function (icon) {
            hoverEnterAnimationFunc(icon, 'btn_video_return')
        }, function (icon) {
            hoverLeaveAnimationFunc(icon, 'btn_video_return')
        }).alpha = 0;
        dummySprt.visible = !1;
        maskGridContainer.addChild(switchGridContainer);
        gameObj.mainRenderer.createButton(switchGridContainer, 40, 178, 'table_bg_main');
        switchGridContainer.getChildByName('table_bg_main').scale.set(1.13, 1.13);
        gameObj.mainRenderer.createButton(switchGridContainer, 40, 178, 'table_disable_main').visible = !1;
        switchGridContainer.getChildByName('table_disable_main').scale.set(1.13, 1.13);
        gameObj.mainRenderer.createButton(maskGridContainer, 167, 610, 'table_bg_footer');
        maskGridContainer.getChildByName('table_bg_footer').scale.set(1.13, 1.13);
        gameObj.mainRenderer.createButton(maskGridContainer, 167, 610, 'table_disable_footer').visible = !1;
        maskGridContainer.getChildByName('table_disable_footer').scale.set(1.13, 1.13);
        dummySprt = gameObj.mainRenderer.createButton(switchGridContainer, 1780, 680, 'btn_switch_sectors');
        gameObj.mainRenderer.createButton(dummySprt, 0, 0, 'btn_switch_sectors_mode_selected', undefined, function (icon, event) {
            gameObj.mainSoundManager.playSound('buttonClick');
            event.stopped = !0;
            clickAnimationFunc(icon, 'btn_switch_sectors');
            gameObj.mainUIManager.switchGridMode(!0);
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        }, undefined, undefined, function (icon) {
            hoverEnterAnimationFunc(icon, 'btn_switch_sectors')
        }, function (icon) {
            hoverLeaveAnimationFunc(icon, 'btn_switch_sectors')
        }).alpha = 0;
        gameObj.mainRenderer.createButton(switchGridContainer, 164, -721, 'table_bg_sectors');
        switchGridContainer.getChildByName('table_bg_sectors').scale.set(1.13, 1.13);
        gameObj.mainRenderer.createButton(switchGridContainer, 164, -721, 'table_disable_sectors').visible = !1;
        switchGridContainer.getChildByName('table_disable_sectors').scale.set(1.13, 1.13);
        dummySprt = gameObj.mainRenderer.createButton(switchGridContainer, 1780, -226, 'btn_switch_grid');
        gameObj.mainRenderer.createButton(dummySprt, 0, 0, 'btn_switch_grid_mode_selected', undefined, function (icon, event) {
            gameObj.mainSoundManager.playSound('buttonClick');
            event.stopped = !0;
            clickAnimationFunc(icon, 'btn_switch_grid');
            gameObj.mainUIManager.switchGridMode(!1);
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        }, undefined, undefined, function (icon) {
            hoverEnterAnimationFunc(icon, 'btn_switch_grid')
        }, function (icon) {
            hoverLeaveAnimationFunc(icon, 'btn_switch_grid')
        }).alpha = 0;
        var gridMask = new PIXI.Graphics();
        gridMask.position.set(0, 0);
        gridMask.beginFill(0x000000);
        gridMask.drawRect(0, 150, 1920, 1080);
        gridMask.endFill;
        maskGridContainer.mask = gridMask;
        gridMask = null;
        var htmlControlsManager = function ($parentDOM) {
            this.destroy = function () {
                gameObj.mainFLGAccount.events.off('onBalance', onWinBalanceChangeFunc);
                onWinBalanceChangeFunc = null;
                winDOMElements.$winRebet.unbind('click', onWinRebetFunc);
                winDOMElements.$winRebetx2.unbind('click', onWinRebetx2Func);
                winDOMElements.$winDOM.off('click', '.btn-control-selected-mobile');
                for (var i in winDOMElements) {
                    winDOMElements[i].remove();
                    winDOMElements[i] = null
                }
                winDOMElements = null;
                for (var i in historyDOMElements) {
                    historyDOMElements[i].remove();
                    historyDOMElements[i] = null
                }
                historyDOMElements = null;
                for (var i in timerDOMElements) {
                    timerDOMElements[i].remove();
                    timerDOMElements[i] = null
                }
                timerDOMElements = null;
                for (var i in videoFrameDOMElements) {
                    videoFrameDOMElements[i].remove();
                    videoFrameDOMElements[i] = null
                }
                videoFrameDOMElements = null;
                btnControlsDOMElements.$btnControlsHome.unbind('click', onHomeFunc);
                btnControlsDOMElements.$btnControlsVideo.unbind('click', onVideoFunc);
                btnControlsDOMElements.$btnControlsNoVideo.unbind('click', onVideoFunc);
                btnControlsDOMElements.$btnControlsRebet.unbind('click', onRebetFunc);
                btnControlsDOMElements.$btnControlsRebetx2.unbind('click', onRebetx2Func);
                btnControlsDOMElements.$btnControlsDouble.unbind('click', onDoubleFunc);
                btnControlsDOMElements.$btnControlsClear.unbind('click', onClearFunc);
                btnControlsDOMElements.$btnControlsUndo.unbind('click', onUndoFunc);
                btnControlsDOMElements.$btnControlsMyBets.unbind('click', onMyBetsFunc);
                btnControlsDOMElements.$btnControlsChips.off('click', '.Chip_component_2UVTI', clickChip).off('mouseenter', '.Chip_component_2UVTI', enterChip).off('mouseleave', '.Chip_component_2UVTI', leaveChip);
                btnControlsDOMElements.$btnControlsDOM.off('click', '.btn-control-selected-mobile');
                for (var i in btnControlsDOMElements) {
                    btnControlsDOMElements[i].remove();
                    btnControlsDOMElements[i] = null
                }
                btnControlsDOMElements = null;
                drawWinDOM = null;
                drawTimerFunc = null;
                drawHistoryFunc = null;
                drawBtnControlsFunc = null;
                setDOMUnselectable = null;
                window.removeEventListener('resize', resizeFunc);
                $parentDOM.unbind('parentResized', resizeFunc);
                resizeFunc = null;
                for (var i in selfLocal) {
                    selfLocal[i] = null
                }
                selfLocal = null
            }
            var selfLocal = this;
            var winDOMElements = {};
            var onWinBalanceChangeFunc;
            var drawWinDOM = function () {
                winDOMElements.$winDOM = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; line-height: 1.4285em; top: 0; left: 0; width: 1920px; height: 1080px; z-index: 60000; visibility: hidden; transform-origin : 50% 0%;"></div>');
                $parentDOM.append(winDOMElements.$winDOM);
                winDOMElements.$winBG = $('<div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-color: black;opacity: 0.65;"></div>');
                winDOMElements.$winDOM.append(winDOMElements.$winBG);
                winDOMElements.$winBall = $('<div class="win-ball-red" style="position: absolute;display: flex; justify-content:center; align-items: center;left: 13%;top: 23%;width: 512px; height: 507px;"></div>');
                winDOMElements.$winDOM.append(winDOMElements.$winBall);
                winDOMElements.$winBallTxt = $('<div style="position: absolute; top: 42%;font-size: 266px; color: #9e9e9e; font-family: Century725 Bold;">16</div>');
                winDOMElements.$winBall.append(winDOMElements.$winBallTxt);
                winDOMElements.$winBallWinTxt = $('<div style="position: absolute;bottom: 19%;font-size: 54px;color: #fb130d;font-family: Arial;">WIN</div>');
                winDOMElements.$winBall.append(winDOMElements.$winBallWinTxt);
                winDOMElements.$winTicket = $('<div style="position: absolute;display: flex; justify-content:center; align-items: center;left: 55%;width: 660px; height: 499px; background: url(' + gameObj.gameDirMobile + 'win-ticket.png) no-repeat 100% 100%;"></div>');
                winDOMElements.$winDOM.append(winDOMElements.$winTicket);
                winDOMElements.$winDOMBet = $('<div style="position: absolute; top: 37px; font-size: 40px; color: #9e9e9e; font-family: Arial Narrow;">' + mainLocalizationTable.bet.toUpperCase() + '</div>');
                winDOMElements.$winTicket.append(winDOMElements.$winDOMBet);
                winDOMElements.$winDOMBetTxt = $('<div style="position: absolute; top: 100px; font-size: 60px; color: #9e9e9e; font-family: Arial Narrow;">500.00</div>');
                winDOMElements.$winTicket.append(winDOMElements.$winDOMBetTxt);
                winDOMElements.$winDOMWinTxt = $('<div style="position: absolute; bottom: 260px; font-size: 108px; color: #c4c3c1; font-family: Arial Narrow;">200.00</div>');
                winDOMElements.$winTicket.append(winDOMElements.$winDOMWinTxt);
                winDOMElements.$winDOMWin = $('<div style="position: absolute; bottom: 175px; font-size: 40px; color: #c4c3c1; font-family: Arial Narrow;">' + mainLocalizationTable.win.toUpperCase() + '</div>');
                winDOMElements.$winTicket.append(winDOMElements.$winDOMWin);
                winDOMElements.$winDOMBalanceTxt = $('<div style="position: absolute; bottom: 76px; font-size: 50px; color: #9e9e9e; font-family: Arial Narrow;"></div>');
                winDOMElements.$winTicket.append(winDOMElements.$winDOMBalanceTxt);
                winDOMElements.$winDOMBalance = $('<div style="position: absolute; bottom: 17px; font-size: 40px; color: #9e9e9e; font-family: Arial Narrow;">' + mainLocalizationTable.balance + '</div>');
                winDOMElements.$winTicket.append(winDOMElements.$winDOMBalance);
                onWinBalanceChangeFunc = function (bal) {
                    winDOMElements.$winDOMBalanceTxt.text((clientInfoGlobal.hall == 'DEMO') ? '' : formatFLGNums(bal))
                };
                gameObj.mainFLGAccount.events.on('onBalance', onWinBalanceChangeFunc);
                winDOMElements.$winRebet = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; bottom: 180px; left: 895px; width: 78px; height: 69px; transform: scale(1.3);">' + '<div style="width: 78px; height: 69px; background: url(' + gameObj.gameDirMobile + 'btn-rebet.png) no-repeat 100% 100%; transform: translateZ(0);"></div>' + '<div class="btn-control-selected-mobile" style="position: absolute; width: 78px; height: 69px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + gameObj.gameDirMobile + 'btn-rebet-mode-selected.png) no-repeat 100% 100%;"></div>' + '</div>');
                winDOMElements.$winRebet.bind('click', onWinRebetFunc);
                winDOMElements.$winDOM.append(winDOMElements.$winRebet);
                winDOMElements.$winRebetDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; bottom: 115px; left: 839px; width: 200px; color: #73787c; font-family: Arial Narrow; font-size: 40px; transform: translateZ(0);"><span>' + mainLocalizationTable.repeat + '</span></div>');
                winDOMElements.$winDOM.append(winDOMElements.$winRebetDesc);
                winDOMElements.$winRebetx2 = $('<div id="winRebetx2" style="position: absolute; display: flex; justify-content:center; align-items: center; bottom: 180px; left: 1075px; width: 98px; height: 65px; transform: scale(1.3);">' + '<div style="width: 98px; height: 65px; background: url(' + gameObj.gameDirMobile + 'btn-rebetx2.png) no-repeat 100% 100%; transform: translateZ(0);"></div>' + '<div class="btn-control-selected-mobile" style="position: absolute; width: 98px; height: 65px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + gameObj.gameDirMobile + 'btn-rebetx2-mode-selected.png) no-repeat 100% 100%;"></div>' + '</div>');
                winDOMElements.$winRebetx2.bind('click', onWinRebetx2Func);
                winDOMElements.$winDOM.append(winDOMElements.$winRebetx2);
                winDOMElements.$winRebetx2Desc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; bottom: 115px; left: 994px; width: 260px; color: #73787c; font-family: Arial Narrow; font-size: 40px; transform: translateZ(0);"><span>' + mainLocalizationTable.repeatx2 + '</span></div>');
                winDOMElements.$winDOM.append(winDOMElements.$winRebetx2Desc);
                winDOMElements.$winDOM.on('click', '.btn-control-selected-mobile', function () {
                    if ($(this).hasClass('btn-control-selected-mobile-active')) {
                        return
                    }
                    $(this).addClass('btn-control-selected-mobile-active');
                    var refToThis = this;
                    setTimeout(function () {
                        $(refToThis).removeClass('btn-control-selected-mobile-active')
                    }, 350)
                })
            };
            drawWinDOM();
            var timerDOMElements = {};
            var drawTimerFunc = function () {
                timerDOMElements.$timerDOM = $('<div id="timerContainer" style="visibility: hidden; position: absolute; display: flex; justify-content: center; align-items: center; top: 0; left: 0; width: 1920px; height: 51px; z-index: 70000; background-color: black; transform-origin : 50% 0%;">' + '<span class="timerSec timerBlack" style="color: #bcbcbc; font-size: 36px; font-family: Arial Narrow, sans-serif; margin-left: 35px; flex-basis: 20%;">00:00</span>' + '<span class="timerDesc timerBlack" style="color: #bcbcbc; font-size: 36px; font-family: Arial Narrow, sans-serif; flex: 3 1 auto; text-align: center;"></span>' + '<span class="timerBlack" style="color: #bcbcbc; font-size: 36px; font-family: Arial Narrow, sans-serif; margin-right: 35px; flex-basis: 20%; text-align: right;">Live Roulette</span>' + '<div id="timerRow" style="position: absolute; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background-color: #4da362; clip-path: inset(0px 1920px 0px 0px); -webkit-clip-path: inset(0px 1920px 0px 0px); opacity: 1;">' + '<span class="timerSec" style="color: #000000; font-size: 36px; font-family: Arial Narrow, sans-serif; margin-left: 35px; flex-basis: 20%;">00:00</span>' + '<span class="timerDesc" style="color: #000000; font-size: 36px; font-family: Arial Narrow, sans-serif; flex: 3 1 auto; text-align: center;"></span>' + '<span style="color: #000000; font-size: 36px; font-family: Arial Narrow, sans-serif; margin-right: 35px; flex-basis: 20%; text-align: right;">Live Roulette</span>' + '</div>' + '</div>');
                $parentDOM.append(timerDOMElements.$timerDOM)
            };
            drawTimerFunc();
            var videoFrameDOMElements = {};
            var drawVideoFrameFunc = function () {
                videoFrameDOMElements.$videoFrameDOM = $('<div id="videoFrameSep" style="visibility: hidden; position: absolute; background: url(' + gameObj.gameDirMobile + 'video-frame2.png) no-repeat 100% 100%; background-size: contain; z-index: 10005; width:' + 797 * 0.83 * 1.65 * 1.053 + 'px;height:' + 531 * 0.83 * 1.65 + 'px;top:0;left:0;transform-origin : 50% 0%;"></div>');
                $parentDOM.append(videoFrameDOMElements.$videoFrameDOM)
            };
            drawVideoFrameFunc();
            var historyDOMElements = {};
            var drawHistoryFunc = function () {
                historyDOMElements.$historyDOM = $('<div id="historyContainer" style="visibility: hidden; position:absolute; display: flex; justify-content: center; align-items: center; top: 50px; left: 0px; width: 1920px; height: 100px; z-index: 50000; transform-origin : 50% 0%;"></div>');
                for (var i = 22; i > 7; i--) {
                    if (i == 22) {
                        historyDOMElements.$historyItem22 = $('<div style="flex-basis: 87px;display: flex;align-items: center;justify-content: center;width: 87px; height: 87px;">' + '<div class="shistory-ball-black-mobile" id="historyBall' + i + '" style="transform: scale(1.35); width: 59px; height: 59px; position: absolute;"></div>' + '<div id="historyBallText' + i + '" style="font-size: 56px; font-weight: bold; font-family: Avenir Next Medium; color: #ffffff; position:absolute;"></div>' + '</div>')
                    } else {
                        historyDOMElements['$historyItem' + i] = $('<div style="flex-basis: 74px;display: flex;align-items: center;justify-content: center; width: 74px; height: 74px;">' + '<div class="shistory-ball-black-mobile" id="historyBall' + i + '" style="transform: scale(1.15); width: 59px; height: 59px; position: absolute;"></div>' + '<div id="historyBallText' + i + '" style="font-size: 46px; font-weight: bold; font-family: Avenir Next Medium; color: #ffffff; position: absolute;"></div>' + '</div>')
                    }
                    historyDOMElements.$historyDOM.append(historyDOMElements['$historyItem' + i])
                }
                $parentDOM.append(historyDOMElements.$historyDOM)
            };
            drawHistoryFunc();
            this.setHistoryItem = function (itemId, textValue, colorValue) {
                if (textValue != undefined) {
                    historyDOMElements['$historyItem' + itemId].find('#historyBallText' + itemId).text(textValue);
                    historyDOMElements['$historyItem' + itemId].find('#historyBall' + itemId).attr('class', 'shistory-ball-' + colorValue + '-mobile');
                    historyDOMElements['$historyItem' + itemId].css('visibility', 'visible')
                } else {
                    historyDOMElements['$historyItem' + itemId].css('visibility', 'hidden')
                }
            };
            var btnControlsDOMElements = {};
            var drawBtnControlsFunc = function () {
                btnControlsDOMElements.$btnControlsDOM = $('<div id="btnControls" ' + 'style="visibility: hidden; position: absolute; line-height: 1.4285em; bottom: 0; left: 0; width: 1920px; height: 242px; z-index: 50000; transform-origin : 50% 100%;">' + '</div>');
                btnControlsDOMElements.$btnControlsBackground = $('<div class="unselectable" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.45; background-color: black;"></div>');
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsBackground);
                btnControlsDOMElements.$btnControlsHome = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 41px; left: 40px; width: 103px; height: 80px; cursor: pointer;">' + '<div style="width: 103px; height: 80px; background: url(' + gameObj.gameDirMobile + 'btn-home.png) no-repeat 100% 100%; transform: translateZ(0);"></div>' + '<div class="btn-control-selected-mobile" style="position: absolute; width: 103px; height: 80px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + gameObj.gameDirMobile + 'btn-home-mode-selected.png) no-repeat 100% 100%;"></div>' + '</div>');
                if (APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && btnControlsDOMElements.$btnControlsHome) {
                    btnControlsDOMElements.$btnControlsHome.css('visibility', (clientInfoGlobal.backurl && clientInfoGlobal.backurl != '') ? 'visible' : 'hidden')
                }
                btnControlsDOMElements.$btnControlsHome.bind('click', onHomeFunc);
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsHome);
                btnControlsDOMElements.$btnControlsVideo = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 52px; left: 205px; width: 90px; height: 66px; cursor: pointer;">' + '<div style="width: 90px; height: 66px; background: url(' + gameObj.gameDirMobile + 'btn-video1.png) no-repeat 100% 100%; transform: translateZ(0);"></div>' + '<div class="btn-control-selected-mobile" style="position: absolute; width: 90px; height: 66px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + gameObj.gameDirMobile + 'btn-video-mode-selected1.png) no-repeat 100% 100%;"></div>' + '</div>');
                btnControlsDOMElements.$btnControlsVideo.bind('click', function () {
                    onVideoFunc(!0)
                });
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsVideo);
                btnControlsDOMElements.$btnControlsVideoDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 200px; width: 100px; color: #73787c; font-family: Arial Narrow; font-size: 34px; transform: translateZ(0);"><span>Live</span></div>');
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsVideoDesc);
                btnControlsDOMElements.$btnControlsNoVideo = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 52px; left: 205px; width: 90px; height: 66px; cursor: pointer;visibility: hidden">' + '<div style="width: 90px; height: 66px; background: url(' + gameObj.gameDirMobile + 'btn-novideo.png) no-repeat 100% 100%; transform: translateZ(0);"></div>' + '<div class="btn-control-selected-mobile" style="position: absolute; width: 90px; height: 66px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + gameObj.gameDirMobile + 'btn-novideo-mode-selected.png) no-repeat 100% 100%;"></div>' + '</div>');
                btnControlsDOMElements.$btnControlsNoVideo.bind('click', function () {
                    onVideoFunc(!1)
                });
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsNoVideo);
                if (clientInfoGlobal.hall != 'DEMO') {
                    btnControlsDOMElements.$btnControlsMyBets = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 42px; left: 210px;/*392*/ width: 66px; height: 75px; cursor: pointer;">' + '<div style="width: 66px; height: 75px; background: url(' + gameObj.gameDirMobile + 'btn-my-bets.png) no-repeat 100% 100%; transform: translateZ(0);"></div>' + '<div class="btn-control-selected-mobile" style="position: absolute; width: 66px; height: 75px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + gameObj.gameDirMobile + 'btn-my-bets-selected.png) no-repeat 100% 100%;"></div>' + '</div>');
                    btnControlsDOMElements.$btnControlsMyBets.bind('click', onMyBetsFunc);
                    btnControlsDOMElements.$btnControlsMyBetsDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 155px;/*342*/ width: 176px; color: #73787c; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' + mainLocalizationTable.myBets + '</span></div>')
                }
                btnControlsDOMElements.$btnControlsRebet = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 45px; left: 1485px; width: 78px; height: 69px; cursor: pointer;">' + '<div style="width: 78px; height: 69px; background: url(' + gameObj.gameDirMobile + 'btn-rebet.png) no-repeat 100% 100%; transform: translateZ(0);"></div>' + '<div class="btn-control-selected-mobile" style="position: absolute; width: 78px; height: 69px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + gameObj.gameDirMobile + 'btn-rebet-mode-selected.png) no-repeat 100% 100%;"></div>' + '</div>');
                btnControlsDOMElements.$btnControlsRebet.bind('click', onRebetFunc);
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsRebet);
                btnControlsDOMElements.$btnControlsRebetDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 1474px; width: 100px; color: #73787c; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' + mainLocalizationTable.repeat + '</span></div>');
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsRebetDesc);
                btnControlsDOMElements.$btnControlsRebetx2 = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 45px; left: 1632px; width: 98px; height: 65px; cursor: pointer;">' + '<div style="width: 98px; height: 65px; background: url(' + gameObj.gameDirMobile + 'btn-rebetx2.png) no-repeat 100% 100%; transform: translateZ(0);"></div>' + '<div class="btn-control-selected-mobile" style="position: absolute; width: 98px; height: 65px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + gameObj.gameDirMobile + 'btn-rebetx2-mode-selected.png) no-repeat 100% 100%;"></div>' + '</div>');
                btnControlsDOMElements.$btnControlsRebetx2.bind('click', onRebetx2Func);
                btnControlsDOMElements.$btnControlsRebetx2Desc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 1610px; width: 142px; color: #73787c; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' + mainLocalizationTable.repeatx2 + '</span></div>');
                btnControlsDOMElements.$btnControlsDouble = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 48px; left: 1632px; width: 100px; height: 63px; cursor: pointer;">' + '<div style="width: 100px; height: 63px; background: url(' + gameObj.gameDirMobile + 'btn-rebetx2.png) no-repeat 100% 100%; transform: translateZ(0);"></div>' + '<div class="btn-control-selected-mobile" style="position: absolute; width: 100px; height: 63px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + gameObj.gameDirMobile + 'btn-rebetx2-mode-selected.png) no-repeat 100% 100%;"></div>' + '</div>');
                btnControlsDOMElements.$btnControlsDouble.bind('click', onDoubleFunc);
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsDouble);
                btnControlsDOMElements.$btnControlsDoubleDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 1627px; width: 110px; color: #73787c; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' + mainLocalizationTable.double + '</span></div>');
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsDoubleDesc);
                btnControlsDOMElements.$btnControlsUndo = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 50px; left: 490px; width: 82px; height: 59px; cursor: pointer;">' + '<div style="width: 82px; height: 59px; background: url(' + gameObj.gameDirMobile + 'btn-undo4.png) no-repeat 100% 100%; transform: translateZ(0);"></div>' + '<div class="btn-control-selected-mobile" style="position: absolute; width: 82px; height: 59px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + gameObj.gameDirMobile + 'btn-undo-mode-selected4.png) no-repeat 100% 100%;"></div>' + '</div>');
                btnControlsDOMElements.$btnControlsUndo.bind('click', onUndoFunc);
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsUndo);
                btnControlsDOMElements.$btnControlsUndoDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 481px; width: 100px; color: #73787c; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' + mainLocalizationTable.undo + '</span></div>');
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsUndoDesc);
                btnControlsDOMElements.$btnControlsClear = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 42px; left: 360px; width: 66px; height: 75px; cursor: pointer;">' + '<div style="width: 66px; height: 75px; background: url(' + gameObj.gameDirMobile + 'btn-clear.png) no-repeat 100% 100%; transform: translateZ(0);"></div>' + '<div class="btn-control-selected-mobile" style="position: absolute; width: 66px; height: 75px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: url(' + gameObj.gameDirMobile + 'btn-clear-mode-selected.png) no-repeat 100% 100%;"></div>' + '</div>');
                btnControlsDOMElements.$btnControlsClear.bind('click', onClearFunc);
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsClear);
                btnControlsDOMElements.$btnControlsClearDesc = $('<div style="position: absolute; display: flex; justify-content:center; align-items: center; top: 147px; left: 343px; width: 100px; color: #73787c; font-family: Arial Narrow; font-size: 32px; transform: translateZ(0);"><span>' + mainLocalizationTable.delete + '</span></div>');
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsClearDesc);
                btnControlsDOMElements.$btnControlsChips = $('<div class="ChipTray_chips_3E1bN" style="position: absolute; display: flex; justify-content:center; align-items: center; top: 40px; left: 585px; width: 900px; font-family: Book Antiqua, sans-serif;"><div style="display: flex;">' + '<div data-automation-id="chip-yellow" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">' + '<div id="chip_1" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_yellow_3DAOA">' + '<div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE">' + '<svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg>' + '<svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg>' + '<div class="Chip_label_2--9m Chip_label_2--9m_MOBILE">' + betsControlsLocal.possibleBets[0] + '</div>' + '</div>' + '</div>' + '</div>' + '<div data-automation-id="chip-orange" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">' + '<div id="chip_2" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_orange_2sdQr chip_active Chip_isSelected_1qLig">' + '<div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE">' + '<svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg>' + '<svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg>' + '<div class="Chip_label_2--9m Chip_label_2--9m_MOBILE">' + betsControlsLocal.possibleBets[1] + '</div>' + '</div>' + '</div>' + '</div>' + '<div data-automation-id="chip-blue" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">' + '<div id="chip_3" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_grey_2sdQr">' + '<div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE">' + '<svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg>' + '<svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg>' + '<div class="Chip_label_2--9m Chip_label_2--9m_MOBILE">' + betsControlsLocal.possibleBets[2] + '</div>' + '</div>' + '</div>' + '</div>' + '<div data-automation-id="chip-red" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">' + '<div id="chip_4" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_red_2PdQZ">' + '<div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE">' + '<svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg>' + '<svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg>' + '<div class="Chip_label_2--9m Chip_label_2--9m_MOBILE">' + betsControlsLocal.possibleBets[3] + '</div>' + '</div>' + '</div>' + '</div>' + ((betsControlsLocal.possibleBets[4]) ? ('<div data-automation-id="chip-green" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">' + '<div id="chip_5" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_green_l17VV">' + '<div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE">' + '<svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg>' + '<svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg>' + '<div class="Chip_label_2--9m Chip_label_2--9m_MOBILE">' + betsControlsLocal.possibleBets[4] + '</div>' + '</div>' + '</div>' + '</div>') : '') + ((betsControlsLocal.possibleBets[5]) ? ('<div data-automation-id="chip-purple" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">' + '<div id="chip_6" class="Chip_component_2UVTI Chip_component_2UVTI_MOBILE Chip_blue_2zyvu">' + '<div class="Chip_contents_32dLH Chip_contents_32dLH_MOBILE"><svg class="Chip_background_1hZNb Chip_background_1hZNb_MOBILE" viewBox="0 0 110 101"><path class="Chip_darkPath_1zzqe" d="M0.5,45.75 C0.5,76.126 24.9001455,100.75 55,100.75 C85.0998545,100.75 109.5,76.126 109.5,45.75 C109.5,15.374 85.0998545,0.75 55,0.75 C24.9001455,0.75 0.5,15.374 0.5,45.75 Z"></path><path class="Chip_shadowPath_2avsW" d="M45.5375118,99.9067 C48.6123027,100.4497 51.77033,100.7497 54.9997027,100.7497 C58.2290755,100.7497 61.3871027,100.4497 64.4628845,99.9067 L64.4628849,69.1445687 C61.3871031,69.6875687 48.6123027,69.5139551 45.5375118,68.9709551 L45.5375118,99.9067 Z M96.74373,53.0977 L96.74373,81.0977 C100.793575,76.2317 104.028894,70.6517 106.224748,64.5657 L106.224748,46 C101.484239,46 102.770564,50.4369643 96.74373,50.4369643 L96.74373,53.0977 Z M3.77465727,64.5657 C5.97051182,70.6517 9.20583,76.2317 13.2566664,81.0977 L13.2566662,46.0000001 C8.51566174,46.0000001 13.2566662,46.0000001 3.77465727,43.1656855 L3.77465727,64.5657 Z"></path></svg>' + '<svg class="Chip_icon_2_33B" viewBox="0 0 110 110"><path fill="#FFFFFF" d="M55.0141465,98.8691167 C28.5621253,98.8691167 7.04246513,78.1612005 7.04246513,52.706977 C7.04246513,27.2527535 28.5621253,6.54483724 55.0141465,6.54483724 C81.4661677,6.54483724 102.985828,27.2527535 102.985828,52.706977 C102.985828,78.1612005 81.4661677,98.8691167 55.0141465,98.8691167"></path><path class="Chip_mainPath_KUWHt" d="M55.0132743,0.25 C24.9066832,0.25 0.5,23.7360377 0.5,52.706977 C0.5,81.6779162 24.9066832,105.163954 55.0132743,105.163954 C85.1198654,105.163954 109.526549,81.6779162 109.526549,52.706977 C109.526549,23.7360377 85.1198654,0.25 55.0132743,0.25 M55.0132743,12.8396745 C77.8586973,12.8396745 96.4433627,30.7233071 96.4433627,52.706977 C96.4433627,74.6906469 77.8586973,92.5742795 55.0132743,92.5742795 C32.1678513,92.5742795 13.5831858,74.6906469 13.5831858,52.706977 C13.5831858,30.7233071 32.1678513,12.8396745 55.0132743,12.8396745"></path><path fill="#FFFFFF" d="M99.8460813,68.4092386 C97.9250335,73.4891723 95.0925238,78.1452536 91.5469804,82.2054236 L96.7671716,86.4208663 C100.818598,81.7794729 104.054506,76.4582372 106.250301,70.652299 L99.8460813,68.4092386 Z M55.0143645,98.6076712 C52.1862159,98.6076712 49.4234831,98.3558777 46.7305274,97.9026494 L45.5486796,104.359054 C48.6232283,104.877329 51.7828176,105.164793 55.0143645,105.164793 C58.2437309,105.164793 61.4033203,104.877329 64.477869,104.359054 L63.2960212,97.9026494 C60.6030654,98.3558777 57.8403327,98.6076712 55.0143645,98.6076712 L55.0143645,98.6076712 Z M106.250301,34.7612353 C104.054506,28.9573954 100.818598,23.6340614 96.7671716,18.992668 L91.5469804,23.2081107 C95.0925238,27.2682807 97.9250335,31.924362 99.8460813,37.0042957 L106.250301,34.7612353 Z M3.77624778,34.7612353 L10.1804672,37.0042957 C12.101515,31.924362 14.9340248,27.2682807 18.4795681,23.2081107 L13.259377,18.992668 C9.20795043,23.6340614 5.97204247,28.9573954 3.77624778,34.7612353 L3.77624778,34.7612353 Z M3.77624778,70.652299 C5.97204247,76.4582372 9.20795043,81.7794729 13.259377,86.4208663 L18.4795681,82.2054236 C14.9340248,78.1452536 12.101515,73.4891723 10.1804672,68.4092386 L3.77624778,70.652299 Z M55.0143645,6.80796143 C57.8403327,6.80796143 60.6030654,7.05765665 63.2960212,7.51088493 L64.477869,1.0544802 C61.4033203,0.536205266 58.2437309,0.250839312 55.0143645,0.250839312 C51.7828176,0.250839312 48.6232283,0.536205266 45.5486796,1.0544802 L46.7327079,7.51088493 C49.4234831,7.05765665 52.1862159,6.80796143 55.0143645,6.80796143 L55.0143645,6.80796143 Z"></path></svg>' + '<div class="Chip_label_2--9m Chip_label_2--9m_MOBILE" style="font-size: 24px;">' + betsControlsLocal.possibleBets[5] + '</div>' + '</div>' + '</div>' + '</div>') : '') + '</div></div>');
                btnControlsDOMElements.$btnControlsChips.on('click', '.Chip_component_2UVTI', function () {
                    if (!$(this).hasClass('Chip_isDisabled_2RK_o') && !$(this).hasClass('chip_active')) {
                        clickChip(this);
                        onChipSelectFunc($(this).find('.Chip_label_2--9m').text(), $(this).attr('id'))
                    }
                }).on('mouseenter', '.Chip_component_2UVTI', function () {
                    if (!$(this).hasClass('Chip_isDisabled_2RK_o') && !$(this).hasClass('chip_active')) {
                        enterChip(this)
                    }
                }).on('mouseleave', '.Chip_component_2UVTI', function () {
                    if (!$(this).hasClass('Chip_isDisabled_2RK_o') && !$(this).hasClass('chip_active')) {
                        leaveChip(this)
                    }
                });
                btnControlsDOMElements.$btnControlsDOM.on('click', '.btn-control-selected-mobile', function () {
                    if ($(this).hasClass('btn-control-selected-mobile-active')) {
                        return
                    }
                    $(this).addClass('btn-control-selected-mobile-active');
                    var refToThis = this;
                    setTimeout(function () {
                        $(refToThis).removeClass('btn-control-selected-mobile-active')
                    }, 130)
                });
                mainFortuneModeManager.setMode({
                    modeName: betsControlsLocal.possibleBets[1],
                    modeSprite: {name: 'chip_2'}
                });
                btnControlsDOMElements.$btnControlsDOM.append(btnControlsDOMElements.$btnControlsChips);
                $parentDOM.append(btnControlsDOMElements.$btnControlsDOM)
            };
            drawBtnControlsFunc();
            this.setChipsInteraction = function (interactionValue) {
                $('.Chip_component_2UVTI').each(function () {
                    if (interactionValue) {
                        $(this).removeClass('Chip_isDisabled_2RK_o');
                        if ($(this).hasClass('chip_active')) {
                            $(this).addClass('Chip_isSelected_1qLig')
                        }
                    } else {
                        $(this).addClass('Chip_isDisabled_2RK_o');
                        if ($(this).hasClass('chip_active')) {
                            $(this).removeClass('Chip_isSelected_1qLig')
                        }
                    }
                })
            };
            this.setBtnControlsInteraction = function (interactionValue) {
                if (interactionValue) {
                    btnControlsDOMElements.$btnControlsRebet.removeClass('btn_disabled');
                    btnControlsDOMElements.$btnControlsRebetx2.removeClass('btn_disabled');
                    btnControlsDOMElements.$btnControlsDouble.removeClass('btn_disabled');
                    btnControlsDOMElements.$btnControlsUndo.removeClass('btn_disabled');
                    btnControlsDOMElements.$btnControlsClear.removeClass('btn_disabled');
                    winDOMElements.$winRebetx2.removeClass('btn_disabled');
                    winDOMElements.$winRebet.removeClass('btn_disabled')
                } else {
                    btnControlsDOMElements.$btnControlsRebet.addClass('btn_disabled');
                    btnControlsDOMElements.$btnControlsRebetx2.addClass('btn_disabled');
                    btnControlsDOMElements.$btnControlsDouble.addClass('btn_disabled');
                    btnControlsDOMElements.$btnControlsUndo.addClass('btn_disabled');
                    btnControlsDOMElements.$btnControlsClear.addClass('btn_disabled');
                    winDOMElements.$winRebetx2.addClass('btn_disabled');
                    winDOMElements.$winRebet.addClass('btn_disabled')
                }
            };
            this.setRebetInteraction = function (interactionValue) {
                if (interactionValue) {
                    btnControlsDOMElements.$btnControlsRebet.removeClass('btn_disabled');
                    btnControlsDOMElements.$btnControlsRebetx2.removeClass('btn_disabled');
                    winDOMElements.$winRebetx2.removeClass('btn_disabled');
                    winDOMElements.$winRebet.removeClass('btn_disabled')
                } else {
                    btnControlsDOMElements.$btnControlsRebet.addClass('btn_disabled');
                    btnControlsDOMElements.$btnControlsRebetx2.addClass('btn_disabled');
                    winDOMElements.$winRebetx2.addClass('btn_disabled');
                    winDOMElements.$winRebet.addClass('btn_disabled')
                }
            };
            this.setVideoBtnsVisibility = function (value) {
                btnControlsDOMElements.$btnControlsNoVideo.css('visibility', value ? 'visible' : 'hidden');
                btnControlsDOMElements.$btnControlsVideo.css('visibility', value ? 'hidden' : 'visible')
            }
            this.slideBtnControls = function (toBottom) {
                btnControlsDOMElements.$btnControlsDOM.attr('toBottom', toBottom);
                resizeFunc(!0)
            };
            this.setWinVisibility = function (value, delay, ballNum, colorValue) {
                if (value && gameObj.mainFLGAccount.totalWin() > 0) {
                    winDOMElements.$winDOMBetTxt.text(formatFLGNums(gameObj.mainFLGAccount.totalBet()));
                    winDOMElements.$winDOMWinTxt.text(formatFLGNums(gameObj.mainFLGAccount.totalWin()));
                    winDOMElements.$winBallTxt.text(ballNum);
                    winDOMElements.$winBall.attr('class', 'win-ball-' + colorValue);
                    setTimeout(function () {
                        winDOMElements.$winDOM.css('visibility', 'visible')
                    }, delay)
                } else {
                    winDOMElements.$winDOM.css('visibility', 'hidden')
                }
            };
            this.setDOMVisibility = function (value) {
                btnControlsDOMElements.$btnControlsDOM.css('visibility', value ? 'visible' : 'hidden');
                timerDOMElements.$timerDOM.css('visibility', value ? 'visible' : 'hidden');
                historyDOMElements.$historyDOM.css('visibility', value ? 'visible' : 'hidden')
            };
            this.setVideoFrameVisibility = function (value) {
                videoFrameDOMElements.$videoFrameDOM.css('visibility', value ? 'visible' : 'hidden')
            };
            this.slideWin = function (toBottom) {
                winDOMElements.$winDOM.attr('toBottom', toBottom);
                resizeFunc(!0)
            };
            var setDOMUnselectable = function ($target) {
                $target.addClass('unselectable').attr('unselectable', 'on').attr('draggable', 'false').on('dragstart', function (e) {
                    e.preventDefault()
                }).on('touchmove', function (e) {
                    e.preventDefault()
                });
                $target.find('*').attr('draggable', 'false').attr('unselectable', 'on')
            };
            setDOMUnselectable(winDOMElements.$winDOM);
            setDOMUnselectable(btnControlsDOMElements.$btnControlsDOM);
            setDOMUnselectable(timerDOMElements.$timerDOM);
            setDOMUnselectable(videoFrameDOMElements.$videoFrameDOM);
            setDOMUnselectable(historyDOMElements.$historyDOM);
            var resizeFunc = function (isAnimate) {
                var $parentDOMCanvas = $parentDOM.find('canvas');
                var canvasW = $parentDOMCanvas.attr('width');
                var canvasRealW = parseFloat($parentDOMCanvas.css('width'));
                var canvasRealH = parseFloat($parentDOMCanvas.css('height'));
                var canvasScale = canvasRealW / canvasW;
                var compensatingScaleOffsetLeft = (btnControlsDOMElements.$btnControlsDOM.width() - btnControlsDOMElements.$btnControlsDOM.width() * canvasScale) / 2;
                var compensatingScaleOffsetLeftWin = (winDOMElements.$winDOM.width() - winDOMElements.$winDOM.width() * canvasScale) / 2;
                var compensatingScaleOffsetLeftVideo = (videoFrameDOMElements.$videoFrameDOM.width() - videoFrameDOMElements.$videoFrameDOM.width() * canvasScale) / 2;
                var offsetX, offsetY;
                offsetX = ($parentDOM.width() - canvasRealW) / 2;
                offsetY = ($parentDOM.height() - canvasRealH) / 2;
                btnControlsDOMElements.$btnControlsDOM.css({
                    'left': -compensatingScaleOffsetLeft + offsetX + 'px',
                    'bottom': offsetY + ((btnControlsDOMElements.$btnControlsDOM.attr('toBottom') == 'true') ? -1 : 0) + 'px',
                    'transition': ((isAnimate == !0) ? 'bottom .2s cubic-bezier(0.645, 0.045, 0.355, 1)' : ''),
                    '-webkit-transition': ((isAnimate == !0) ? 'bottom .2s cubic-bezier(0.645, 0.045, 0.355, 1)' : ''),
                    'transform': 'scale(' + canvasScale + ')'
                });
                timerDOMElements.$timerDOM.css({
                    'left': -compensatingScaleOffsetLeft + offsetX + 'px',
                    'top': offsetY + 'px',
                    'transform': 'scale(' + canvasScale + ')'
                });
                historyDOMElements.$historyDOM.css({
                    'left': -compensatingScaleOffsetLeft + offsetX + 'px',
                    'top': offsetY + 51 * canvasScale + 'px',
                    'transform': 'scale(' + canvasScale + ')'
                });
                winDOMElements.$winDOM.css({
                    'left': -compensatingScaleOffsetLeftWin + offsetX + 'px',
                    'top': offsetY + ((winDOMElements.$winDOM.attr('toBottom') == 'true') ? 195 * canvasScale : 0) + 'px',
                    'transition': ((isAnimate == !0) ? 'top .5s cubic-bezier(0.645, 0.045, 0.355, 1)' : ''),
                    '-webkit-transition': ((isAnimate == !0) ? 'top .5s cubic-bezier(0.645, 0.045, 0.355, 1)' : ''),
                    'transform': 'scale(' + canvasScale + ')'
                });
                var canvasRealWVideo = 797 * 0.83 * 1.65 * canvasScale * 1.053;
                var offsetXVideo = ($parentDOM.width() - canvasRealWVideo) / 2;
                videoFrameDOMElements.$videoFrameDOM.css({
                    'left': -compensatingScaleOffsetLeftVideo + offsetXVideo - 1 + 'px',
                    'top': (125 - 33) * canvasScale + offsetY + 'px',
                    'transform': 'scale(' + canvasScale + ')'
                })
            };
            window.addEventListener('resize', resizeFunc, !1);
            $parentDOM.bind('parentResized', resizeFunc);
            resizeFunc()
        }
        htmlControlsMngrLocal = new htmlControlsManager($('#' + gameObj.gameConfig.canvasId));
        gameObj.mainRenderer.createButton(mainGridContainer, 1886, 88, undefined, {
            text: mainLocalizationTable.totalBet,
            align: 'right',
            style: {
                font: '40px Avenir Next Medium',
                fill: '#b0a49b',
                dropShadow: !0,
                dropShadowAlpha: 0.3,
                dropShadowAngle: Math.PI / 2,
                dropShadowBlur: 2
            }
        }).name = 'betSprite';
        gameObj.mainRenderer.createButton(mainGridContainer, 1886, 143, undefined, {
            text: formatFLGNums(gameObj.mainFLGAccount.totalBet()),
            align: 'right',
            style: {
                font: '50px Avenir Next Medium',
                fill: '#b0a49b',
                dropShadow: !0,
                dropShadowAlpha: 0.3,
                dropShadowAngle: Math.PI / 2,
                dropShadowBlur: 2
            }
        }).name = 'betTxt';
        onBetChangeFunc = function (bal) {
            mainGridContainer.getChildByName('betTxt').children[0].text = formatFLGNums(bal)
        };
        gameObj.mainFLGAccount.events.on('onBet', onBetChangeFunc);
        gameObj.mainRenderer.createButton(mainGridContainer, 33, 88, undefined, {
            text: mainLocalizationTable.balance,
            align: 'left',
            style: {
                font: '40px Avenir Next Medium',
                fill: '#b0a49b',
                dropShadow: !0,
                dropShadowAlpha: 0.3,
                dropShadowAngle: Math.PI / 2,
                dropShadowBlur: 2
            }
        }).name = 'balanceSprite';
        gameObj.mainRenderer.createButton(mainGridContainer, 33, 143, undefined, {
            text: (clientInfoGlobal.hall == 'DEMO') ? mainLocalizationTable.demo : formatFLGNums(gameObj.mainFLGAccount.balance()),
            align: 'left',
            style: {
                font: '50px Avenir Next Medium',
                fill: '#b0a49b',
                dropShadow: !0,
                dropShadowAlpha: 0.3,
                dropShadowAngle: Math.PI / 2,
                dropShadowBlur: 2
            }
        }).name = 'balanceTxt';
        onBalanceChangeFunc = function (bal) {
            mainGridContainer.getChildByName('balanceTxt').children[0].text = (clientInfoGlobal.hall == 'DEMO') ? mainLocalizationTable.demo : formatFLGNums(bal)
        };
        gameObj.mainFLGAccount.events.on('onBalance', onBalanceChangeFunc);
        gameObj.mainRenderer.stage.addChild(bgContainer);
        mainGridContainer.addChild(videoContainer);
        mainGridContainer.addChild(maskGridContainer);
        gameObj.mainRenderer.stage.addChild(mainGridContainer);
        mainFortuneModeManager.addDragSprite();
        gameObj.mainRenderer.stage.addChild(accountContainer);
        gameObj.setMainGrid(new FortuneGrid(170, 198, 12, 3, switchGridContainer, gameObj.mainRenderer));
        var zoneDownFunc = function (zone, isOver, isTouchMove) {
            if (!isOver) {
                gameObj.mainGrid.gridContainer.down = !0
            }
            if ((isOver && gameObj.mainGrid.gridContainer.down) || (!isOver && !isTouchMove) || (isTouchMove && (zone.name != lastTouchedZoneName || lastTouchedZoneName == undefined))) {
                if (zone.name >= 40 && zone.name <= 48) {
                    var curSumm = (gameObj.mainGrid.uiButtonsContainer.getChildByName(zone.name).getChildByName('smallChipText')) ? parseFloat(gameObj.mainGrid.uiButtonsContainer.getChildByName(zone.name).getChildByName('smallChipText').text) : 0
                } else {
                    var curSumm = (gameObj.mainGrid.uiGridContainer.getChildByName(zone.name).getChildByName('smallChipText')) ? parseFloat(gameObj.mainGrid.uiGridContainer.getChildByName(zone.name).getChildByName('smallChipText').text) : 0
                }
                var afterBetSumm = parseFloat(betsControlsLocal.currentBet({comb: zone.name, curSumm: curSumm}));
                if (!selfLocal.isAllowBet({
                    comb: parseInt(zone.name),
                    coef: undefined,
                    summ: afterBetSumm
                }, (gameObj.mainGrid.pressedZones[zone.name]) ? gameObj.mainGrid.pressedZones[zone.name].bet + afterBetSumm : afterBetSumm)) {
                    return
                }
                if (afterBetSumm == 0 || gameObj.mainFLGAccount.totalBet(afterBetSumm) == -1) {
                    return
                }
                if (zone.name >= 40 && zone.name <= 48) {
                    gameObj.mainUIManager.createSmallChip(gameObj.mainGrid.uiButtonsContainer.getChildByName(zone.name), afterBetSumm)
                } else {
                    gameObj.mainUIManager.createSmallChip(gameObj.mainGrid.uiGridContainer.getChildByName(zone.name), afterBetSumm);
                    if (zone.name <= 36) {
                        gameObj.mainUIManager.createSmallChip(gameObj.mainGrid.uiSectorsContainer.getChildByName(zone.name), afterBetSumm)
                    }
                }
                if ((zone.name >= 40 && zone.name <= 48 && gameObj.mainGrid.buttonsContainer.getChildByName(zone.name).selected) || ((zone.name < 40 || zone.name > 48) && gameObj.mainGrid.gridContainer.getChildByName(zone.name).selected)) {
                    gameObj.mainSoundManager.playSound('stackChip');
                    gameObj.mainGrid.pressedZones[zone.name].bet = (zone.name >= 40 && zone.name <= 48) ? parseFloat(gameObj.mainGrid.uiButtonsContainer.getChildByName(zone.name).getChildByName('smallChipText').text) : parseFloat(gameObj.mainGrid.uiGridContainer.getChildByName(zone.name).getChildByName('smallChipText').text);
                    gameObj.mainGrid.pressedZones[zone.name].spread.main += afterBetSumm
                } else {
                    gameObj.mainSoundManager.playSound('firstChip');
                    if (zone.name >= 40 && zone.name <= 48) {
                        gameObj.mainGrid.buttonsContainer.getChildByName(zone.name).selected = !0
                    } else {
                        gameObj.mainGrid.gridContainer.getChildByName(zone.name).selected = !0
                    }
                    gameObj.mainGrid.pressedZones[zone.name] = {
                        zone: (zone.name >= 40 && zone.name <= 48) ? gameObj.mainGrid.uiButtonsContainer.getChildByName(zone.name) : gameObj.mainGrid.uiGridContainer.getChildByName(zone.name),
                        bet: afterBetSumm,
                        coef: gameObj.mainUIManager.defineCoefForBet(zone),
                        spread: {sectors: {}, main: afterBetSumm}
                    }
                }
                gameObj.mainUIManager.defineZonesForBet(zone, 0.35, showPossibleWinFunc, afterBetSumm * parseFloat(gameObj.mainGrid.pressedZones[zone.name].coef))
            }
            if (isTouchMove) {
                lastTouchedZoneName = zone.name
            }
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        };
        var zoneUpFunc = function (zone) {
            if (gameObj.mainGrid.gridContainer.down) {
                mainFortuneBetManager.addGridState()
            }
            gameObj.mainGrid.gridContainer.down = !1;
            gameObj.mainGrid.zonesOut();
            lastTouchedZoneName = undefined;
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        };
        var sectorDownFunc = function (zone, isOver, isTouchMove) {
            if (!isOver) {
                gameObj.mainGrid.gridContainer.down = !0
            }
            if ((isOver && gameObj.mainGrid.gridContainer.down) || (!isOver && !isTouchMove) || (isTouchMove && (zone.name != lastTouchedZoneName || lastTouchedZoneName == undefined))) {
                var dependentZones = (gameObj.mainGrid.sectorCombinations[zone.name]) ? gameObj.mainGrid.sectorCombinations[zone.name] : gameObj.mainGrid.sectorButtonCombinations[zone.name].zones;
                for (var i = 0; i < dependentZones.length; i++) {
                    var curSumm = (gameObj.mainGrid.uiGridContainer.getChildByName(dependentZones[i]).getChildByName('smallChipText')) ? parseFloat(gameObj.mainGrid.uiGridContainer.getChildByName(dependentZones[i]).getChildByName('smallChipText').text) : 0;
                    var afterBetSumm = parseFloat(betsControlsLocal.currentBet({
                        comb: dependentZones[i],
                        curSumm: curSumm
                    }));
                    if (!selfLocal.isAllowBet({
                        comb: parseInt(dependentZones[i]),
                        coef: undefined,
                        summ: afterBetSumm
                    }, (gameObj.mainGrid.pressedZones[dependentZones[i]]) ? gameObj.mainGrid.pressedZones[dependentZones[i]].bet + afterBetSumm : afterBetSumm)) {
                        return
                    }
                    if (afterBetSumm == 0 || gameObj.mainFLGAccount.totalBet(afterBetSumm) == -1) {
                        return
                    }
                    gameObj.mainUIManager.createSmallChip(gameObj.mainGrid.uiGridContainer.getChildByName(dependentZones[i]), afterBetSumm);
                    if (zone.name >= 49 && zone.name <= 52) {
                        gameObj.mainUIManager.createSmallChip(gameObj.mainGrid.uiSectorsContainer.getChildByName(zone.name), afterBetSumm)
                    } else {
                        gameObj.mainUIManager.createSmallChip(gameObj.mainGrid.uiSectorsContainer.getChildByName(dependentZones[i]), afterBetSumm)
                    }
                    if (gameObj.mainGrid.gridContainer.getChildByName(dependentZones[i]).selected) {
                        gameObj.mainSoundManager.playSound('stackChip');
                        gameObj.mainGrid.pressedZones[dependentZones[i]].bet = parseFloat(gameObj.mainGrid.uiGridContainer.getChildByName(dependentZones[i]).getChildByName('smallChipText').text);
                        if (gameObj.mainGrid.sectorCombinations[zone.name]) {
                            gameObj.mainGrid.pressedZones[dependentZones[i]].spread.main += afterBetSumm
                        } else {
                            if (gameObj.mainGrid.pressedZones[dependentZones[i]].spread.sectors[zone.name]) {
                                gameObj.mainGrid.pressedZones[dependentZones[i]].spread.sectors[zone.name] += afterBetSumm
                            } else {
                                gameObj.mainGrid.pressedZones[dependentZones[i]].spread.sectors[zone.name] = afterBetSumm
                            }
                        }
                    } else {
                        gameObj.mainSoundManager.playSound('firstChip');
                        gameObj.mainGrid.gridContainer.getChildByName(dependentZones[i]).selected = !0;
                        var betSummSpread = {};
                        if (!gameObj.mainGrid.sectorCombinations[zone.name]) {
                            betSummSpread[zone.name] = afterBetSumm
                        }
                        gameObj.mainGrid.pressedZones[dependentZones[i]] = {
                            zone: gameObj.mainGrid.uiGridContainer.getChildByName(dependentZones[i]),
                            bet: afterBetSumm,
                            coef: gameObj.mainUIManager.defineCoefForBet(gameObj.mainGrid.gridContainer.getChildByName(dependentZones[i])),
                            spread: ((gameObj.mainGrid.sectorCombinations[zone.name]) ? {
                                sectors: betSummSpread,
                                main: afterBetSumm
                            } : {sectors: betSummSpread, main: 0})
                        }
                    }
                    gameObj.mainUIManager.defineZonesForBet(gameObj.mainGrid.gridContainer.getChildByName(dependentZones[i]), 0.35, showPossibleWinFunc, afterBetSumm * parseFloat(gameObj.mainGrid.pressedZones[dependentZones[i]].coef))
                }
            }
            if (isTouchMove) {
                lastTouchedZoneName = zone.name
            }
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        };
        var sectorUpFunc = function (zone) {
            if (gameObj.mainGrid.gridContainer.down) {
                mainFortuneBetManager.addGridState()
            }
            gameObj.mainGrid.gridContainer.down = !1;
            gameObj.mainGrid.zonesOut();
            lastTouchedZoneName = undefined;
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        };
        gameObj.mainGrid.createZonesRoulette4K({w: 115, h: 115}, {w: 110, h: 364}, {
            x: 2.6,
            y: 2
        }, zoneDownFunc, zoneUpFunc, {font: '52px Avenir Next Demi', fill: '#ffffff', align: 'center'});
        gameObj.mainGrid.createFooter({posX: 168, posY: 598}, maskGridContainer, {
            x: 2.6,
            y: 2
        }, zoneDownFunc, zoneUpFunc);
        gameObj.mainGrid.createSectors({
            posX: 164,
            posY: -721
        }, cubeSectorsInfo, sectorButtonsInfo, sectorDownFunc, sectorUpFunc);
        gameObj.mainGrid.gridContainer.scale.set(1.13, 1.13);
        gameObj.mainGrid.uiGridContainer.scale.set(1.13, 1.13);
        gameObj.mainGrid.uiSectorsContainer.scale.set(1.13, 1.13);
        gameObj.mainGrid.sectorsContainer.scale.set(1.13, 1.13);
        gameObj.mainGrid.buttonsContainer.scale.set(1.13, 1.13);
        gameObj.mainGrid.uiButtonsContainer.scale.set(1.13, 1.13);
        dummySprt = null;
        gameObj.mainGameManager.gameStateAsync(function (gmState) {
            initEditionsFunc(gmState, function () {
                mainFortuneBetManager = new fortuneBetManager(gameObj);
                mainEditions.drawEditionHistory(gmState);
                startGameFunc(gmState);
                if (closeBGFunc) {
                    closeBGFunc()
                }
                gameObj.mainRenderer.renderManager.needUpdateRender = !0
            })
        })
    }, function afterLoad() {
        gameObj.mainGrid.zonesOut();
        htmlControlsMngrLocal.setDOMVisibility(!0)
    });
    this.createSmallChip = function (uiZone, bet) {
        function getChipTextureByBet(betTxt) {
            var i;
            for (i = betsControlsLocal.possibleBets.length - 1; i >= 0; i--) {
                if (betsControlsLocal.possibleBets[i] <= betTxt) return gameObj.mainRenderer.resourceLoader.resources['chip_' + (i + 1)].texture
            }
        }

        if (uiZone.getChildByName('smallChip')) {
            if (parseFloat(uiZone.getChildByName('smallChipText').text) + bet <= getMAXByCombFunc(parseInt(uiZone.name))) {
                uiZone.getChildByName('smallChipText').text = parseFloat(uiZone.getChildByName('smallChipText').text) + bet;
                uiZone.getChildByName('smallChipText').text = +parseFloat(uiZone.getChildByName('smallChipText').text).toFixed(10);
                selfLocal.setTextScale(uiZone.getChildByName('smallChipText'));
                uiZone.getChildByName('smallChipText').visible = !0;
                uiZone.getChildByName('smallChip').visible = !0;
                uiZone.getChildByName('smallChip').texture = getChipTextureByBet(parseFloat(uiZone.getChildByName('smallChipText').text))
            }
        } else {
            var smallChip = new PIXI.Sprite(getChipTextureByBet(bet));
            var smallChipText = new PIXI.Text(bet, {
                font: (uiZone.parent.name == 'uiSectorsContainer' && uiZone.name <= 36) ? 'bold 24px Book Antiqua' : 'bold 30px Book Antiqua',
                fill: '#000000',
                align: 'center'
            });
            smallChipText.name = 'smallChipText';
            selfLocal.setTextScale(smallChipText);
            smallChip.name = 'smallChip';
            uiZone.addChildAt(smallChip, (uiZone.name == 0) ? 1 : 0);
            uiZone.addChildAt(smallChipText, (uiZone.name == 0) ? 2 : 1);
            for (var i = 0; i < uiZone.children.length; i++) {
                if (uiZone.children[i].name == 'smallChip' || uiZone.children[i].name == 'smallChipText') {
                    uiZone.children[i].anchor.x = 0.5;
                    uiZone.children[i].anchor.y = 0.5;
                    uiZone.children[i].position.y = uiZone.height / 2;
                    uiZone.children[i].position.x = uiZone.width / 2;
                    if (uiZone.children[i].name == 'smallChip') {
                        uiZone.children[i].scale.set((uiZone.parent.name == 'uiSectorsContainer' && uiZone.name <= 36) ? 0.8 : 0.93, (uiZone.parent.name == 'uiSectorsContainer' && uiZone.name <= 36) ? 0.8 : 0.93)
                    } else {
                        uiZone.children[i].anchor.y = 0.515
                    }
                }
            }
            smallChipText = null;
            smallChip = null
        }
        uiZone = null
    };
    this.setVideoVisibility = function (value, type) {
        if (value) {
            if (!mainVideo) {
                if (gameObj.gameConfig.needHls) {
                    mainVideo = new FLGVideo(gameObj.gameConfig.videoPos.x, gameObj.gameConfig.videoPos.y, gameObj.gameConfig.videoSize.w * 0.83, gameObj.gameConfig.videoSize.h * 0.83, gameObj.gameConfig.canvasId, '<object id = "swfobj" class="swfelement" style="height:100%;width:100%;" type="application/x-shockwave-flash" quality="best" wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" data="images/videoplayer.swf">  <param name="FlashVars" value="show=0&amp;BufferTime=2&amp;URL=' + gameObj.gameConfig.videoURL + ';"> <param name="movie" value="videoplayer.swf"></object>', '<video id="innerVideo' + gameObj.gameConfig.canvasId + '" autoplay playsinline preload="metadata" style="height:100%;width:100%;"><source src="' + gameObj.gameConfig.videoMobileURL + '" type="application/x-mpegURL"></video>', {
                        borderURL: undefined,
                        paddings: 0,
                        noVideoIcons: !0,
                        videoMaxScale: 1.65,
                        fullscreenPosY: 125,
                        addOffsetX: 2,
                        clipPath: 'inset(7% 0%)',
                    }, gameObj.mainSoundManager);
                    mainVideo.setZIndex(!1);
                    mainVideo.setVisible(!0)
                } else if (gameObj.gameConfig.needRtc) {
                    mainVideo = rtcVideo.init({
                        videoId: "innerVideo" + gameObj.gameConfig.canvasId,
                        parentId: gameObj.gameConfig.canvasId,
                        videoString: '<video id="innerVideo' + gameObj.gameConfig.canvasId + '" autoplay playsinline preload="metadata" style="height:100%;width:100%;"></video>',
                        styleObj: {
                            posX: gameObj.gameConfig.videoPos.x,
                            posY: gameObj.gameConfig.videoPos.y,
                            sizeW: gameObj.gameConfig.videoSize.w * 0.83,
                            sizeH: gameObj.gameConfig.videoSize.h * 0.83,
                            borderURL: undefined,
                            paddings: 0,
                            noVideoIcons: !0,
                            videoMaxScale: 1.65,
                            addOffsetX: 2,
                            clipPath: 'inset(7% 0%)',
                            fullscreenPosY: 125,
                        }
                    });
                    rtcVideo.setSrc(gameObj.gameConfig.videoRtcUrl, gameObj.gameConfig.videoRtcApp, gameObj.gameConfig.videoRtcStream)
                }
                slideAnimationFunc(maskGridContainer, 'maskGridContainer', 1920, 0);
                slideAnimationFunc(videoContainer, 'videoContainer', 1920, 0, function () {
                    if (gameObj.gameConfig.needHls) {
                        mainVideo.setZIndex(!0)
                    } else if (gameObj.gameConfig.needRtc) {
                        rtcVideo.playFirst()
                    }
                    htmlControlsMngrLocal.setVideoFrameVisibility(!0);
                    gameObj.mainRenderer.renderManager.animationTweenInc();
                    new TWEEN.Tween(videoContainer.getChildByName('btn_video_load')).to({rotation: Math.PI * 6}, 3000).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        videoContainer.getChildByName('btn_video_load').rotation = 0
                    }).start()
                })
            } else {
            }
            if (gameObj.gameConfig.needHls) {
                mainVideo.setFullscreenMode(!0)
            } else if (gameObj.gameConfig.needRtc) {
                rtcVideo.setFullscreenMode(!0)
            }
        } else {
            htmlControlsMngrLocal.setVideoFrameVisibility(!1);
            slideAnimationFunc(videoContainer, 'videoContainer', 0, 0);
            slideAnimationFunc(maskGridContainer, 'maskGridContainer', 0, 0);
            if (!mainVideo) {
                return
            }
            if (gameObj.gameConfig.needHls) {
                mainVideo.destroy()
            } else if (gameObj.gameConfig.needRtc) {
                rtcVideo.destroy()
            }
            mainVideo = null
        }
    };
    this.switchGridMode = function (sectorMode) {
        slideAnimationFunc(switchGridContainer, 'switchGridContainer', 0, sectorMode ? 902 : 0);
        videoContainer.getChildByName('btn_video_return').visible = sectorMode ? !1 : !0;
        videoContainer.getChildByName('btn_video_return_sectors').visible = sectorMode ? !0 : !1
    };
    this.getBallColorByCode = function (textValue) {
        if (fortunaCombinations.btnComb['47'].zones.indexOf(parseInt(textValue)) != -1) {
            return 'red'
        } else if (fortunaCombinations.btnComb['48'].zones.indexOf(parseInt(textValue)) != -1) {
            return 'black'
        } else {
            return 'green'
        }
    };
    this.defineCoefForBet = function (zone) {
        if (zone.name <= 36) {
            return '36'
        } else if (zone.name <= 42) {
            return '3'
        } else if (zone.name <= 48) {
            return '2'
        } else if ((zone.name <= 135) || (zone.name >= 172 && zone.name <= 195)) {
            return '18'
        } else if (zone.name == 136 || zone.name == 137 || (zone.name >= 196 && zone.name <= 207)) {
            return '12'
        } else if ([141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171].indexOf(zone.name) != -1) {
            return '6'
        } else if (zone.name < 250) {
            return '9'
        }
    };
    this.defineZonesForBet = function (zone, alphaValue, showPossblWin, possibleWinText, needVisiblePosWin) {
        var zonesToHighlight;
        if (zone.name <= 36) {
            clickAnimationFunc(gameObj.mainGrid.uiGridContainer.getChildByName(zone.name + 'innerZone'), zone.name);
            clickAnimationFunc(gameObj.mainGrid.uiSectorsContainer.getChildByName(zone.name + 'innerZone'), zone.name + 'sector');
            showPossibleWinFunc(gameObj.mainGrid.uiSectorsContainer.getChildByName(zone.name), possibleWinText);
            showPossibleWinFunc(gameObj.mainGrid.uiGridContainer.getChildByName(zone.name), possibleWinText);
            return
        } else if (zone.name <= 48) {
            zonesToHighlight = gameObj.mainGrid.buttonCombinations[zone.name].zones;
            clickAnimationFunc(zone.name >= 40 ? gameObj.mainGrid.uiButtonsContainer.getChildByName(zone.name + 'innerZone') : gameObj.mainGrid.uiGridContainer.getChildByName(zone.name + 'innerZone'), zone.name)
        } else if (zone.name <= 52) {
            zonesToHighlight = gameObj.mainGrid.sectorButtonCombinations[zone.name].zones
        } else if (zone.name < 250) {
            zonesToHighlight = gameObj.mainGrid.combinations[zone.name - 100]
        }
        for (var i = 0; i < zonesToHighlight.length; i++) {
            clickAnimationFunc(gameObj.mainGrid.uiGridContainer.getChildByName(zonesToHighlight[i] + 'innerZone'), zonesToHighlight[i]);
            clickAnimationFunc(gameObj.mainGrid.uiSectorsContainer.getChildByName(zonesToHighlight[i] + 'innerZone'), zonesToHighlight[i] + 'sector');
            showPossibleWinFunc(gameObj.mainGrid.uiSectorsContainer.getChildByName(zonesToHighlight[i]), possibleWinText, needVisiblePosWin);
            showPossibleWinFunc(gameObj.mainGrid.uiGridContainer.getChildByName(zonesToHighlight[i]), possibleWinText, needVisiblePosWin)
        }
        zonesToHighlight = null
    };
    var showPossibleWinFunc = function (zone, possibleWinText, needVisiblePosWin) {
        var needVis = (needVisiblePosWin != undefined) ? needVisiblePosWin : !0;
        if (zone.getChildByName('possibleWinInfo')) {
            zone.getChildByName('possibleWinText').text = possibleWinText + parseFloat(zone.getChildByName('possibleWinText').text);
            zone.getChildByName('possibleWinText').text = +parseFloat(zone.getChildByName('possibleWinText').text).toFixed(10);
            zone.getChildByName('possibleWinText').visible = (parseFloat(zone.getChildByName('possibleWinText').text) > 0) && needVis;
            zone.getChildByName('possibleWinInfo').visible = (parseFloat(zone.getChildByName('possibleWinText').text) > 0) && needVis
        } else {
            if (parseFloat(possibleWinText) < 0) {
                return
            }
            var possibWinBg = new PIXI.Sprite(gameObj.mainRenderer.resourceLoader.resources.possible_win_bg.texture);
            var possibWinText = new PIXI.Text(+possibleWinText.toFixed(10), {font: '19px Arial', fill: '#bdbdbd'});
            possibWinText.name = 'possibleWinText';
            possibWinBg.name = 'possibleWinInfo';
            zone.addChildAt(possibWinText, zone.children.length);
            zone.addChildAt(possibWinBg, zone.children.length - 1);
            var correctY;
            for (var i = 0; i < zone.children.length; i++) {
                if (zone.children[i].name == 'possibleWinInfo' || zone.children[i].name == 'possibleWinText') {
                    zone.children[i].anchor.x = 0.5;
                    zone.children[i].anchor.y = 0.5;
                    if (zone.children[i].name == 'possibleWinText') {
                        correctY = (zone.parent.name == 'uiSectorsContainer') ? (Math.ceil(zone.height - zone.children[i].height / 4) - 3) : (Math.ceil(zone.height - zone.children[i].height / 2) - 6)
                    } else {
                        correctY = (zone.parent.name == 'uiSectorsContainer') ? Math.ceil(zone.height - zone.children[i].height / 4) : (Math.ceil(zone.height - zone.children[i].height / 2) - 3)
                    }
                    zone.children[i].position.y = correctY;
                    zone.children[i].position.x = zone.width / 2
                }
            }
            possibWinBg = null;
            possibWinText = null
        }
    };
    this.showPossibleWin = showPossibleWinFunc;
    this.setInteraction = function (interactionValue) {
        gameObj.mainGrid.setZoneInteraction(interactionValue);
        htmlControlsMngrLocal.setChipsInteraction(interactionValue);
        htmlControlsMngrLocal.setBtnControlsInteraction(interactionValue);
        mainFortuneModeManager.setInteraction(interactionValue);
        switchGridContainer.getChildByName('table_disable_main').visible = !interactionValue;
        switchGridContainer.getChildByName('table_disable_sectors').visible = !interactionValue;
        maskGridContainer.getChildByName('table_disable_footer').visible = !interactionValue;
        for (var i = 0; i <= 36; i++) {
            gameObj.mainGrid.uiGridContainer.getChildByName('textZone' + i).children[0].style = interactionValue ? {
                font: '52px Avenir Next Demi',
                fill: '#ffffff',
                align: 'center'
            } : {font: '52px Avenir Next Demi', fill: '#6b7579', align: 'center'};
            gameObj.mainGrid.uiSectorsContainer.getChildByName('textZone' + i).children[0].style = interactionValue ? {
                font: '42px Avenir Next Demi',
                fill: '#ffffff',
                align: 'center'
            } : {font: '42px Avenir Next Demi', fill: '#6b7579', align: 'center'}
        }
        gameObj.mainRenderer.renderManager.needUpdateRender = !0
    };
    this.setTextScale = function (pixiText) {
        switch (pixiText.text.length) {
            case 5:
                pixiText.scale.set(0.5, 0.5);
                break;
            case 4:
                pixiText.scale.set(0.6, 0.6);
                break;
            case 3:
                if (pixiText.text == 'MAX') {
                    pixiText.scale.set(0.65, 0.65)
                } else {
                    pixiText.scale.set(0.75, 0.75)
                }
                break;
            default:
                pixiText.scale.set(1.0, 1.0);
                break
        }
    };
    this.setTextHeaderScale = function (pixiText) {
        if (pixiText.text.length > 12) {
            pixiText.scale.set(0.65, 0.65)
        } else if (pixiText.text.length > 9) {
            pixiText.scale.set(0.75, 0.75)
        } else {
            pixiText.scale.set(1.0, 1.0)
        }
    };
    this.getFortuneObjectsByGrid = function () {
        var ObjArray = [];
        for (var i in gameObj.mainGrid.pressedZones) {
            ObjArray.push({
                comb: parseInt(gameObj.mainGrid.pressedZones[i].zone.name),
                coef: parseFloat(gameObj.mainUIManager.defineCoefForBet(gameObj.mainGrid.pressedZones[i].zone)),
                summ: gameObj.mainGrid.pressedZones[i].bet,
                spread: {
                    sectors: Object.assign({}, gameObj.mainGrid.pressedZones[i].spread.sectors),
                    main: gameObj.mainGrid.pressedZones[i].spread.main
                },
            })
        }
        return ObjArray
    };
    this.getTotalSumByGrid = function () {
        var totalSum = 0;
        for (var i in gameObj.mainGrid.pressedZones) {
            totalSum += parseFloat(gameObj.mainGrid.pressedZones[i].bet).toFixed(10)
        }
        return totalSum
    };
    this.isAllowBet = function (incBetObj, betValueAfter, silenceObj) {
        if (parseFloat(betValueAfter).toFixed(10) > getMAXByCombFunc(incBetObj.comb)) {
            if (silenceObj) {
                silenceObj.betErrorCount++;
                if (!silenceObj.betErrorFunc) {
                    silenceObj.betErrorFunc = function () {
                        gameObj.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet)
                    }
                }
            } else {
                gameObj.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet)
            }
            return !1
        }
        if (selfLocal.getTotalSumByGrid() + parseFloat(incBetObj.summ).toFixed(10) > clientInfoGlobal.cfstolmax / 100) {
            gameObj.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBetGame);
            return !1
        }
        return !0
    };
    var betTimeoutId = 0;
    var animateResultTimeoutId = 0;
    var progressPixels;
    var startGameFunc = function (gmSt) {
        function setTimerUI(progress) {
            $('#' + gameObj.gameConfig.canvasId + ' div#timerContainer span.timerSec').each(function () {
                if ($(this)[0].textContent !== mainFLGTimer.getTimerText()) {
                    $(this)[0].childNodes[0].nodeValue = mainFLGTimer.getTimerText()
                }
            });
            progressPixels = 1920 * (1 - progress);
            $('#' + gameObj.gameConfig.canvasId + ' div#timerContainer div#timerRow').css({
                'clip-path': 'inset(0px ' + progressPixels + 'px 0px 0px)',
                '-webkit-clip-path': 'inset(0px ' + progressPixels + 'px 0px 0px)'
            })
        }

        function startBetTime(gmState) {
            if (!gameObj.mainGameManager) {
                return
            }
            $('#' + gameObj.gameConfig.canvasId + ' div#timerContainer span.timerDesc').each(function () {
                $(this).text(mainLocalizationTable.placeBets)
            });
            $('#' + gameObj.gameConfig.canvasId + ' div#timerContainer div#timerRow').css({
                visibility: 'visible',
                'background-color': '#4da362'
            });
            gameObj.mainFLGAccount.setWinTextVisible(!0);
            gameObj.mainGrid.removeCurrentBets();
            gameObj.mainFLGAccount.totalBet(0);
            mainFortuneBetManager.selectGridByStates();
            gameObj.mainUIManager.setInteraction(!0);
            mainEditions.addEdition(gmState.tir + 1);
            if (repeatInNextRound) {
                mainFortuneBetManager.repeatLastRoundGridState()
            }
            if (repeatInNextRoundx2) {
                mainFortuneBetManager.repeatLastRoundGridState();
                mainFortuneBetManager.doubleCurrentBets()
            }
            repeatInNextRound = !1;
            repeatInNextRoundx2 = !1;
            mainFLGTimer.start({
                minutes: 0,
                seconds: gmState.time_round - gameObj.gameConfig.timerOffset - gmState.t2
            }, {minutes: 0, seconds: gmState.time_round - gameObj.gameConfig.timerOffset}, setTimerUI, function () {
                gameObj.mainUIManager.setInteraction(!1);
                $('#' + gameObj.gameConfig.canvasId + ' div#timerContainer span.timerDesc').each(function () {
                    $(this).text(mainLocalizationTable.noMoreBets)
                });
                $('#' + gameObj.gameConfig.canvasId + ' div#timerContainer span.timerBlack').each(function () {
                    $(this).css('visibility', 'hidden')
                });
                $('#' + gameObj.gameConfig.canvasId + ' div#timerContainer div#timerRow').css('animation', 'changeTimerOpacity 0.5s 6 alternate linear');
                mainEditions.getActedOutEdition().betsHistory.addBet({
                    fortuneBetObjArr: gameObj.mainUIManager.getFortuneObjectsByGrid(),
                    winBet: undefined,
                    win: undefined,
                    code: undefined
                }, mainEditions.getActedOutEdition().round, function (betsAreApplyed) {
                    if (!betsAreApplyed) {
                        gameObj.mainGrid.removeCurrentBets();
                        gameObj.mainFLGAccount.totalBet(0)
                    }
                });
                mainFortuneBetManager.clearGridStates()
            }, 3, startGameFunc)
        }

        function startResultTime() {
            if (!gameObj.mainGameManager) {
                return
            }
            $('#' + gameObj.gameConfig.canvasId + ' div#timerContainer div#timerRow').css({
                animation: '',
                opacity: 1,
                'background-color': '#c0372d'
            });

            function startAnimateResult() {
                if (gameObj.mainGameManager) {
                    gameObj.mainGameManager.gameStateAsync(animateResult);
                    gameObj.mainRenderer.renderManager.needUpdateRender = !0
                }
            }

            function animateResult(gmStateArr) {
                if (!gameObj.mainGameManager) {
                    return
                }
                if (gmStateArr.ball != 99) {
                    if (!gameObj.mainFLGAccount) {
                        return
                    }
                    gameObj.mainFLGAccount.calculateWin(mainEditions.getActedOutEdition().betsHistory.bets, gameObj.gameConfig.appName, function (winBetsArr) {
                        var offsetResultSec = (gmStateArr.t2 >= 0) ? 17000 : ((gmStateArr.t2 < -17) ? 0 : ((21 + gmStateArr.t2) * 1000 - 4000));
                        if (gameObj.mainGrid.pressedZones.length) {
                            offsetResultSec = 2000
                        }
                        if (gameObj.gameConfig.offset4Result) {
                            offsetResultSec += gameObj.gameConfig.offset4Result
                        }
                        setTimeout(function () {
                            gameObj.mainGrid.showWinZone(parseInt(gmStateArr.ball), function (winZone) {
                                var winChip = winZone.getChildByName('zone_win_chip');
                                if (!winChip) {
                                    winChip = new PIXI.Sprite(gameObj.mainRenderer.resourceLoader.resources.zone_win_chip.texture);
                                    winChip.name = 'zone_win_chip';
                                    if (winZone.parent.name == 'uiSectorsContainer' || gmStateArr.ball == 0) {
                                        winChip.scale.set(0.8, 0.8)
                                    } else {
                                        winChip.scale.set(1, 1)
                                    }
                                    winChip.anchor.set(0.5, 0.5);
                                    winChip.alpha = 0;
                                    winZone.addChildAt(winChip, 0);
                                    winChip.rotation = 0;
                                    winZone.getChildByName('textwinZone').style = {
                                        font: (winZone.parent.name == 'uiSectorsContainer') ? '48px Avenir Next Demi' : '58px Avenir Next Demi',
                                        fill: '#ffffff',
                                        align: 'center'
                                    }
                                }
                                winChip.position.set(winZone.width / 2, winZone.height / 2);
                                if (winZone.getChildByName('smallChip')) {
                                    winZone.getChildByName('smallChipText').visible = !1;
                                    winZone.getChildByName('smallChip').visible = !1
                                }
                                gameObj.mainRenderer.renderManager.animationTweenInc();
                                new TWEEN.Tween(winChip).to({alpha: 1}, 500).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                    gameObj.mainRenderer.renderManager.animationTweenDec()
                                }).start();
                                gameObj.mainGrid[winZone.parent.name].getChildByName('textZone' + gmStateArr.ball).visible = !1;
                                winZone.getChildByName('textwinZone').visible = !0;
                                gameObj.mainRenderer.renderManager.animationTweenInc();
                                new TWEEN.Tween(winChip).to({rotation: Math.PI * 2}, 9000).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                                    gameObj.mainRenderer.renderManager.animationTweenDec();
                                    winChip.rotation = 0
                                }).start();
                                setTimeout(function () {
                                    if (winZone.getChildByName('possibleWinInfo')) {
                                        winZone.getChildByName('possibleWinInfo').visible = !1;
                                        winZone.getChildByName('possibleWinText').visible = !1
                                    }
                                    gameObj.mainRenderer.renderManager.animationTweenInc();
                                    new TWEEN.Tween(winChip).to({alpha: 0}, 500).easing(TWEEN.Easing.Exponential.Out).onComplete(function () {
                                        gameObj.mainRenderer.renderManager.animationTweenDec()
                                    }).start();
                                    winZone.getChildByName('textwinZone').visible = !1;
                                    gameObj.mainGrid[winZone.parent.name].getChildByName('textZone' + gmStateArr.ball).visible = !0;
                                    gameObj.mainRenderer.renderManager.animationTweenInc();
                                    new TWEEN.Tween(winChip).to({rotation: 0}, 500).onComplete(function () {
                                        gameObj.mainRenderer.renderManager.animationTweenDec();
                                        winZone.visible = !1;
                                        winChip = null
                                    }).start()
                                }, 8500)
                            }, 9000);
                            if (winBetsArr && winBetsArr.length) {
                                var fortuneObjArr = [];
                                for (var i = 0; i < winBetsArr.length; i++) {
                                    fortuneObjArr.push({
                                        comb: parseInt(winBetsArr[i].nm),
                                        coef: parseFloat(winBetsArr[i].cf).toFixed(10) / 100,
                                        summ: parseFloat(winBetsArr[i].sm).toFixed(10) / 100,
                                        winBet: gmStateArr.ball
                                    })
                                }
                                mainFortuneBetManager.showWinCombinations(fortuneObjArr);
                                fortuneObjArr = null
                            }
                            mainEditions.drawEditionHistory(gmStateArr);
                            $('#' + gameObj.gameConfig.canvasId + ' div#timerContainer span.timerBlack').each(function () {
                                $(this).css('visibility', 'visible')
                            });
                            $('#' + gameObj.gameConfig.canvasId + ' div#timerContainer div#timerRow').css('visibility', 'hidden');
                            $('#' + gameObj.gameConfig.canvasId + ' div#timerContainer span.timerDesc').each(function () {
                                $(this).text(gmStateArr.ball + ' ' + gameObj.mainGrid.getColorByCombCode(gmStateArr.ball))
                            });
                            var showTime = 9000;
                            betTimeoutId = setTimeout(startGameFunc, showTime);
                            gameObj.mainFLGAccount.winToBalanceAnimation(showTime, 2000, {
                                x: 4000,
                                y: 2000
                            }, gameObj.mainRenderer.resourceLoader.resources.WIN.texture, {
                                font: '72px Arial Narrow',
                                fill: '#e0c59d',
                                align: 'customize',
                                posY: 45
                            }, undefined, {font: '44px Arial Narrow', fill: '#be9e6f'});
                            htmlControlsMngrLocal.setWinVisibility(!0, 2500, gmStateArr.ball, gameObj.mainUIManager.getBallColorByCode(gmStateArr.ball));
                            setTimeout(function () {
                                htmlControlsMngrLocal.setWinVisibility(!1);
                                gameObj.mainGrid.removeCurrentBets();
                                gameObj.mainFLGAccount.totalBet(0)
                            }, 8000)
                        }, offsetResultSec)
                    }, gameObj.gameConfig);
                    mainEditions.cancelLastEdition([gmStateArr.ball]);
                    gameObj.mainRenderer.renderManager.needUpdateRender = !0
                } else {
                    animateResultTimeoutId = setTimeout(startAnimateResult, 500)
                }
            }

            gameObj.mainUIManager.setInteraction(!1);
            gameObj.mainFLGAccount.setWinTextVisible(!1);
            startAnimateResult()
        }

        if (gameObj.mainGameManager == undefined) {
            return
        }

        function gamePhase(gmState) {
            if (gmState.t2 <= 0) {
                startResultTime()
            } else {
                startBetTime(gmState)
            }
        }

        if (gmSt) {
            gamePhase(gmSt)
        } else {
            gameObj.mainGameManager.gameStateAsync(gamePhase)
        }
    };

    function fortuneBetManager(gameObject) {
        this.destroy = function () {
            for (var i = 0; i < gridStates.length; i++) {
                for (var j in gridStates[i]) {
                    if ((gridStates.length - 1 == i) && gridStates[i][j].summ) {
                        gameObject.mainFLGAccount.totalBet(-gridStates[i][j].summ)
                    }
                    gridStates[i][j] = null
                }
                gridStates[i] = null
            }
            gridStates = null;
            lastRoundGridState = null;
            selectGridByStatesFunc = null;
            for (var i in selfLocal) {
                selfLocal[i] = null
            }
            selfLocal = null
        };
        var selfLocal = this;
        var gridStates = [];
        this.states = function () {
            return gridStates
        };
        var lastRoundGridState = [];
        this.saveGridStateInStorage = function () {
            localStorage.setItem('curUser', JSON.stringify({hall: clientInfoGlobal.hall, nick: clientInfoGlobal.nick}));
            if (gridStates) {
                localStorage.setItem('gridStates' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType, JSON.stringify(gridStates))
            }
            if (lastRoundGridState) {
                localStorage.setItem('lastRoundGridState' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType, JSON.stringify(lastRoundGridState))
            }
        };
        this.loadGridStateFromStorage = function () {
            if (localStorage.getItem('curUser')) {
                var curUser = JSON.parse(localStorage.getItem('curUser'));
                if ((curUser.hall != clientInfoGlobal.hall) && (curUser.nick != clientInfoGlobal.nick)) {
                    return
                }
            }
            if (localStorage.getItem('gridStates' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType)) {
                gridStates = JSON.parse(localStorage.getItem('gridStates' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType))
            }
            if (localStorage.getItem('lastRoundGridState' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType)) {
                lastRoundGridState = JSON.parse(localStorage.getItem('lastRoundGridState' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType))
            }
        };
        this.addGridState = function (inputState, isInSectorsComb) {
            var arr;
            if (inputState) {
                arr = inputState
            } else {
                arr = gameObject.mainUIManager.getFortuneObjectsByGrid()
            }
            if (gridStates.length && !arr.length && !gridStates[gridStates.length - 1].length) {
                return
            }
            gridStates.push(arr);
            selfLocal.saveGridStateInStorage();
            if (inputState) {
                selectGridByStatesFunc()
            }
        };
        this.doubleCurrentBets = function () {
            var silenceErrorObj = {betErrorCount: 0, betErrorFunc: null};
            var totPressCount = 0;
            for (var i in gameObj.mainGrid.pressedZones) {
                totPressCount++;
                if (!gameObj.mainUIManager.isAllowBet({
                    comb: parseInt(i),
                    coef: undefined,
                    summ: gameObj.mainGrid.pressedZones[i].bet
                }, gameObj.mainGrid.pressedZones[i].bet * 2, silenceErrorObj)) {
                    continue
                }
                if (gameObj.mainFLGAccount.totalBet(parseFloat(gameObj.mainGrid.pressedZones[i].bet)) == -1) {
                    return
                }
                ;gameObj.mainUIManager.defineZonesForBet(gameObj.mainGrid.pressedZones[i].zone, 0.35, showPossibleWinFunc, parseFloat(gameObj.mainGrid.pressedZones[i].bet).toFixed(10) * parseFloat(gameObj.mainGrid.pressedZones[i].coef).toFixed(10));
                gameObj.mainGrid.pressedZones[i].bet *= 2;
                gameObj.mainGrid.pressedZones[i].spread.main *= 2;
                for (var betSummSpread in gameObj.mainGrid.pressedZones[i].spread.sectors) {
                    gameObj.mainGrid.pressedZones[i].spread.sectors[betSummSpread] *= 2
                }
                var afterBetSumm = gameObj.mainGrid.pressedZones[i].bet - parseFloat(gameObj.mainGrid.pressedZones[i].zone.getChildByName('smallChipText').text).toFixed(10);
                if (gameObj.mainGrid.pressedZones[i].zone.name >= 40 && gameObj.mainGrid.pressedZones[i].zone.name <= 48) {
                    gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.uiButtonsContainer.getChildByName(gameObj.mainGrid.pressedZones[i].zone.name), afterBetSumm)
                } else {
                    gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.uiGridContainer.getChildByName(gameObj.mainGrid.pressedZones[i].zone.name), afterBetSumm);
                    if ((gameObj.mainGrid.pressedZones[i].zone.name >= 100 && gameObj.mainGrid.pressedZones[i].zone.name <= 136) || gameObj.mainGrid.pressedZones[i].zone.name == 179 || gameObj.mainGrid.pressedZones[i].zone.name == 187 || gameObj.mainGrid.pressedZones[i].zone.name == 1 || gameObj.mainGrid.pressedZones[i].zone.name == 26) {
                        for (var k = 49; k <= 52; k++) {
                            if (gameObj.mainGrid.pressedZones[i].spread.sectors[k]) {
                                if (gameObj.mainGrid.pressedZones[i].spread.sectors[k] > 0) {
                                    gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.uiSectorsContainer.getChildByName(k), gameObj.mainGrid.pressedZones[i].spread.sectors[k] / 2)
                                }
                            }
                        }
                    }
                    if (gameObj.mainGrid.pressedZones[i].zone.name <= 36) {
                        if (gameObj.mainGrid.pressedZones[i].spread.main > 0) {
                            gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.uiSectorsContainer.getChildByName(gameObj.mainGrid.pressedZones[i].zone.name), gameObj.mainGrid.pressedZones[i].spread.main / 2)
                        }
                    }
                }
            }
            if (silenceErrorObj.betErrorCount > 0) {
                silenceErrorObj.betErrorFunc()
            }
            if (silenceErrorObj.betErrorCount != totPressCount) {
                selfLocal.addGridState()
            }
            silenceErrorObj.betErrorCount = null;
            silenceErrorObj.betErrorFunc = null;
            silenceErrorObj = null
        };
        this.undoGridState = function () {
            if (!gridStates.length) {
                return
            }
            gridStates.pop();
            selfLocal.saveGridStateInStorage();
            gameObject.mainGrid.removeCurrentBets();
            gameObj.mainFLGAccount.totalBet(-gameObj.mainFLGAccount.totalBet());
            selectGridByStatesFunc()
        };
        this.clearGridStates = function () {
            if (gridStates && gridStates.length) {
                if (lastRoundGridState && lastRoundGridState.length && gridStates[gridStates.length - 1].length) {
                    for (var j in lastRoundGridState) {
                        lastRoundGridState[j] = null
                    }
                    lastRoundGridState = []
                }
                if (gridStates[gridStates.length - 1].length) {
                    lastRoundGridState = gridStates[gridStates.length - 1].slice()
                }
                for (var i = 0; i < gridStates.length; i++) {
                    for (var j in gridStates[i]) {
                        gridStates[i][j] = null
                    }
                    gridStates[i] = null
                }
                gridStates = []
            }
            selfLocal.saveGridStateInStorage()
        };
        this.repeatLastRoundGridState = function () {
            if (!lastRoundGridState || !lastRoundGridState.length) {
                return
            }
            selfLocal.addGridState(lastRoundGridState.slice())
        };
        this.showWinCombinations = function (fortuneObjArr) {
            gameObject.mainGrid.removeCurrentBets();
            selectGridByStatesFunc(fortuneObjArr, !0)
        };
        var selectGridByStatesFunc = function (pressObjArray, needShowWin) {
            var objArrLocal = (pressObjArray) ? pressObjArray : gridStates[gridStates.length - 1];
            var isWinPressed = (pressObjArray);
            var showWin = (needShowWin != undefined) ? needShowWin : !1;
            var silenceErrorObj = {betErrorCount: 0, betErrorFunc: null};
            if (!objArrLocal || !objArrLocal.length) {
                return
            }
            gameObject.mainGrid.pressZonesByObjectArr(objArrLocal, function (zoneObj) {
                if (!gameObject.mainUIManager.isAllowBet({
                    comb: parseInt(zoneObj.zone.name),
                    coef: undefined,
                    summ: zoneObj.bet
                }, (gameObject.mainGrid.pressedZones[zoneObj.zone.name]) ? gameObject.mainGrid.pressedZones[zoneObj.zone.name].bet + zoneObj.bet : zoneObj.bet, silenceErrorObj)) {
                    return
                }
                if (!isWinPressed && !showWin) {
                    if (gameObject.mainFLGAccount.totalBet(parseFloat(zoneObj.bet)) == -1) {
                        return
                    }
                    if (zoneObj.zone.name >= 40 && zoneObj.zone.name <= 48) {
                        gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.uiButtonsContainer.getChildByName(zoneObj.zone.name), zoneObj.bet)
                    } else {
                        gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.uiGridContainer.getChildByName(zoneObj.zone.name), zoneObj.bet);
                        if ((zoneObj.zone.name >= 100 && zoneObj.zone.name <= 136) || zoneObj.zone.name == 179 || zoneObj.zone.name == 187 || zoneObj.zone.name == 1 || zoneObj.zone.name == 26) {
                            for (var k = 49; k <= 52; k++) {
                                if (zoneObj.spread.sectors[k]) {
                                    if (zoneObj.spread.sectors[k] > 0) {
                                        gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.uiSectorsContainer.getChildByName(k), zoneObj.spread.sectors[k])
                                    }
                                }
                            }
                        }
                        if (zoneObj.zone.name <= 36) {
                            if (zoneObj.spread.main > 0) {
                                gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.uiSectorsContainer.getChildByName(zoneObj.zone.name), zoneObj.spread.main)
                            }
                        }
                    }
                    if (zoneObj.zone.selected) {
                        if (zoneObj.zone.name >= 40 && zoneObj.zone.name <= 48) {
                            gameObject.mainGrid.pressedZones[zoneObj.zone.name].bet = parseFloat(gameObject.mainGrid.uiButtonsContainer.getChildByName(zoneObj.zone.name).getChildByName('smallChipText').text).toFixed(10)
                        } else {
                            gameObject.mainGrid.pressedZones[zoneObj.zone.name].bet = parseFloat(gameObject.mainGrid.uiGridContainer.getChildByName(zoneObj.zone.name).getChildByName('smallChipText').text).toFixed(10)
                        }
                        gameObject.mainGrid.pressedZones[zoneObj.zone.name].spread.main += zoneObj.spread.main;
                        if (gameObject.mainGrid.pressedZones[zoneObj.zone.name].spread.sectors[zoneObj.zone.name]) {
                            gameObject.mainGrid.pressedZones[zoneObj.zone.name].spread.sectors[zoneObj.zone.name] += zoneObj.spread.sectors[zoneObj.zone.name]
                        } else {
                            gameObject.mainGrid.pressedZones[zoneObj.zone.name].spread.sectors[zoneObj.zone.name] = zoneObj.spread.sectors[zoneObj.zone.name]
                        }
                    } else {
                        zoneObj.zone.selected = !0;
                        gameObject.mainGrid.pressedZones[zoneObj.zone.name] = {
                            zone: (zoneObj.zone.name >= 40 && zoneObj.zone.name <= 48) ? gameObject.mainGrid.uiButtonsContainer.getChildByName(zoneObj.zone.name) : gameObject.mainGrid.uiGridContainer.getChildByName(zoneObj.zone.name),
                            bet: zoneObj.bet,
                            coef: gameObject.mainUIManager.defineCoefForBet(zoneObj.zone),
                            spread: {sectors: Object.assign({}, zoneObj.spread.sectors), main: zoneObj.spread.main}
                        }
                    }
                    gameObject.mainUIManager.defineZonesForBet(zoneObj.zone, 0.35, gameObject.mainUIManager.showPossibleWin, parseFloat(zoneObj.bet).toFixed(10) * parseFloat(gameObject.mainGrid.pressedZones[zoneObj.zone.name].coef).toFixed(10))
                } else if (isWinPressed && pressObjArray.length) {
                    if (parseInt(objArrLocal[0].winBet) != parseInt(zoneObj.zone.name)) {
                        if (zoneObj.zone.name >= 40 && zoneObj.zone.name <= 48) {
                            gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.uiButtonsContainer.getChildByName(zoneObj.zone.name), zoneObj.bet)
                        } else {
                            gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.uiGridContainer.getChildByName(zoneObj.zone.name), zoneObj.bet);
                            if (zoneObj.zone.name <= 36) {
                                gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.uiSectorsContainer.getChildByName(zoneObj.zone.name), zoneObj.bet)
                            }
                        }
                    }
                    gameObject.mainGrid.pressedZones[zoneObj.zone.name] = {
                        zone: (zoneObj.zone.name >= 40 && zoneObj.zone.name <= 48) ? gameObject.mainGrid.uiButtonsContainer.getChildByName(zoneObj.zone.name) : gameObject.mainGrid.uiGridContainer.getChildByName(zoneObj.zone.name),
                        bet: zoneObj.bet,
                        coef: gameObject.mainUIManager.defineCoefForBet(zoneObj.zone)
                    };
                    gameObject.mainUIManager.defineZonesForBet(zoneObj.zone, 0.35, gameObject.mainUIManager.showPossibleWin, parseFloat(zoneObj.bet).toFixed(10) * parseFloat(gameObject.mainGrid.pressedZones[zoneObj.zone.name].coef).toFixed(10), !1)
                }
                gameObj.mainRenderer.renderManager.needUpdateRender = !0
            });
            gameObject.mainGrid.zonesOut();
            if (silenceErrorObj.betErrorCount > 0 && !showWin) {
                silenceErrorObj.betErrorFunc()
            }
            silenceErrorObj.betErrorCount = null;
            silenceErrorObj.betErrorFunc = null;
            silenceErrorObj = null
        };
        this.selectGridByStates = selectGridByStatesFunc;
        selfLocal.loadGridStateFromStorage()
    }

    function fortuneModeManager(gameObject) {
        this.destroy = function () {
            transpRect.destroy();
            transpRect = null;
            interactionBG = null;
            modeDragSprite = null;
            downFunc = null;
            upFunc = null;
            moveFunc = null;
            for (var i = 0; i < modesObjArr.length; i++) {
                for (var j in modesObjArr[i]) {
                    modesObjArr[i][j] = null
                }
                modesObjArr[i] = null
            }
            modesObjArr = null;
            currentModeLocal = null;
            setCurrenModeSpriteFunc = null;
            for (var i in selfLocal) {
                selfLocal[i] = null
            }
            selfLocal = null
        };
        var selfLocal = this;
        var transpRect = new PIXI.Graphics();
        transpRect.beginFill(0xFFFFFF, 0);
        transpRect.drawRect(0, 0, gameObject.mainRenderer.canvasSize.width, gameObject.mainRenderer.canvasSize.height);
        transpRect.endFill();
        var interactionBG = new PIXI.Sprite(transpRect.generateTexture(!1));
        interactionBG.width = interactionBG.texture.width;
        interactionBG.height = interactionBG.texture.height;
        interactionBG.interactive = !0;
        interactionBG.hitArea = new PIXI.Rectangle(0, 0, interactionBG.width, interactionBG.texture.height);
        var downFunc = function (event) {
            modeDragSprite.data = event.data;
            modeDragSprite.dragging = !0;
            var newPosition = modeDragSprite.data.getLocalPosition(modeDragSprite.parent);
            modeDragSprite.position.x = newPosition.x;
            modeDragSprite.position.y = newPosition.y;
            newPosition = null;
            modeDragSprite.visible = !0;
            gameObject.mainGrid.gridContainer.down = !0;
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        };
        var upFunc = function () {
            modeDragSprite.dragging = !1;
            modeDragSprite.data = null;
            modeDragSprite.visible = !1;
            gameObject.mainGrid.gridContainer.down = !1;
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        };
        var moveFunc = function () {
            if (modeDragSprite.dragging) {
                var newPosition = modeDragSprite.data.getLocalPosition(modeDragSprite.parent);
                modeDragSprite.position.x = newPosition.x;
                modeDragSprite.position.y = newPosition.y;
                newPosition = null
            }
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        };
        interactionBG.on('mousedown', downFunc).on('touchstart', downFunc).on('mousemove', moveFunc).on('touchmove', moveFunc).on('mouseup', upFunc).on('touchend', upFunc).on('mouseupoutside', upFunc).on('touchendoutside', upFunc);
        gameObject.mainRenderer.stage.addChildAt(interactionBG, 0);
        var modeDragSprite = gameObject.mainRenderer.createButton(interactionBG, 0, 0, undefined, undefined);
        modeDragSprite.anchor.set(0.5, 0.5);
        modeDragSprite.visible = !1;
        this.addDragSprite = function (parent) {
            gameObject.mainRenderer.stage.addChild(modeDragSprite)
        };
        this.setInteraction = function (interactionValue) {
            interactionBG.interactive = interactionValue;
            modeDragSprite.visible = !1;
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        };
        var modesObjArr = [], currentModeLocal = {};
        this.currentMode = function () {
            return currentModeLocal
        };
        var setCurrenModeSpriteFunc = function (modeObj) {
            currentModeLocal = modeObj;
            modeDragSprite.texture = gameObject.mainRenderer.resourceLoader.resources[currentModeLocal.modeSprite.name].texture;
            modeDragSprite.width = modeDragSprite.texture.width;
            modeDragSprite.height = modeDragSprite.texture.height;
            modeDragSprite.scale.set(0.65, 0.65);
            var txtSprite = modeDragSprite.getChildByName('modeDragSpriteText');
            if (currentModeLocal.modeSprite.text) {
                if (!txtSprite) {
                    txtSprite = new PIXI.Text(currentModeLocal.modeSprite.text, currentModeLocal.modeSprite.style);
                    txtSprite.style.align = 'center';
                    txtSprite.name = 'modeDragSpriteText';
                    modeDragSprite.addChild(txtSprite)
                } else {
                    txtSprite.text = currentModeLocal.modeSprite.text;
                    txtSprite.visible = !0
                }
            } else {
                if (txtSprite) {
                    txtSprite.visible = !1
                }
            }
            txtSprite = null;
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        };
        this.setMode = function (modeObj) {
            if (!modeObj || modeObj.modeName == currentModeLocal.modeName) {
                return
            }
            for (var i = 0; i < modesObjArr.length; i++) {
                if (modeObj.modeName == modesObjArr[i].modeName) {
                    setCurrenModeSpriteFunc(modesObjArr[i]);
                    return
                }
            }
            modesObjArr.push(modeObj);
            setCurrenModeSpriteFunc(modesObjArr[modesObjArr.length - 1])
        }
    }

    function editions(lastEditions) {
        this.destroy = function () {
            for (var i = 0; i < editionsLocal.length; i++) {
                editionsLocal[i].round = null;
                editionsLocal[i].editionResult = null;
                if (editionsLocal[i].betsHistory.destroy) {
                    editionsLocal[i].betsHistory.destroy()
                }
                editionsLocal[i] = null
            }
            editionsLocal = null;
            currentEditionIndex = null;
            RoundText = null;
            historyTableLocal = null;
            betsHeaderContainer = null;
            ballScale = null;
            setCurrentEditionIndexFunc = null;
            drawEditionHeaderFunc = null;
            drawBetsHeaderFunc = null;
            drawEditionHistoryFunc = null;
            for (var i in selfLocal) {
                selfLocal[i] = null
            }
            selfLocal = null
        };
        var selfLocal = this;
        var editionsLocal = [], currentEditionIndex;
        this.editions = editionsLocal;
        var historyTableLocal;
        this.historyTable = function () {
            return historyTableLocal
        };
        var ballScale = 0.53;
        this.getActedOutEdition = function () {
            for (var i = editionsLocal.length - 1; i >= 0; i--) {
                if (editionsLocal[i].editionResult == undefined) {
                    setCurrentEditionIndexFunc(i);
                    return editionsLocal[i]
                }
            }
            setCurrentEditionIndexFunc(editionsLocal.length - 1);
            return editionsLocal[editionsLocal.length - 1]
        };
        for (var i = 0; i < lastEditions.length; i++) {
            editionsLocal.push({
                round: lastEditions[i].round,
                editionResult: lastEditions[i].editionResult,
                betsHistory: lastEditions[i].betsHistory
            });
            editionsLocal[i].betsHistory.setRoundResult(editionsLocal[i].editionResult)
        }
        var setCurrentEditionIndexFunc = function (editionIndex) {
            if ((editionIndex < 0) || (editionIndex >= editionsLocal.length)) {
                return
            }
            if (currentEditionIndex != undefined) {
            }
            currentEditionIndex = editionIndex;
            if (historyTableLocal != undefined) {
            }
            gameObj.mainRenderer.renderManager.needUpdateRender = !0
        };
        setCurrentEditionIndexFunc(editionsLocal.length - 1);
        this.drawEditions = function () {
            historyTableLocal = new PIXI.Container();
            mainGridContainer.addChild(historyTableLocal)
        };
        var drawEditionHeaderFunc = function () {
        };
        this.redrawEditionHeader = drawEditionHeaderFunc;
        var betsHeaderContainer = new PIXI.Container();
        var drawBetsHeaderFunc = function () {
        };
        this.drawBetsHeader = drawBetsHeaderFunc;
        var drawEditionHistoryFunc = function (gameState) {
            var i;
            for (i = 22; i > 7; i--) {
                htmlControlsMngrLocal.setHistoryItem(i, editionsLocal[i].editionResult[0], (editionsLocal[i].editionResult[0] != undefined) ? gameObj.mainUIManager.getBallColorByCode(editionsLocal[i].editionResult[0]) : '')
            }
        };
        this.drawEditionHistory = drawEditionHistoryFunc;
        this.cancelLastEdition = function (lastResBalls) {
            editionsLocal[editionsLocal.length - 1].editionResult = lastResBalls;
            editionsLocal[editionsLocal.length - 1].betsHistory.setRoundResult(lastResBalls);
            setCurrentEditionIndexFunc(editionsLocal.length - 1)
        };
        this.addEdition = function (NewRound) {
            if (editionsLocal[0].betsHistory.destroy) {
                editionsLocal[0].betsHistory.destroy()
            }
            editionsLocal[0].betsHistory = null;
            editionsLocal.shift();
            editionsLocal.push({round: NewRound, editionResult: undefined, betsHistory: new fortuneBets([])});
            setCurrentEditionIndexFunc(editionsLocal.length - 1)
        }
    }

    function fortuneBets(lastBets) {
        this.destroy = function () {
            for (var i = 0; i < betsLocal.length; i++) {
                for (var j = 0; j < betsLocal[i].fortuneBetObjArr.length; j++) {
                    betsLocal[i].fortuneBetObjArr[j].comb = null;
                    betsLocal[i].fortuneBetObjArr[j].coef = null;
                    betsLocal[i].fortuneBetObjArr[j].summ = null;
                    betsLocal[i].fortuneBetObjArr[j] = null
                }
                betsLocal[i].fortuneBetObjArr = null;
                betsLocal[i].winBet = null;
                betsLocal[i].win = null;
                betsLocal[i].code = null;
                betsLocal[i] = null
            }
            betsLocal = null;
            for (var i in selfLocal) {
                selfLocal[i] = null
            }
            selfLocal = null
        };
        var selfLocal = this;
        var betsLocal = [];
        this.bets = betsLocal;
        if (lastBets.length) {
            for (var i = 0; i < lastBets.length; i++) {
                betsLocal.push({
                    fortuneBetObjArr: lastBets[i].fortuneBetObjArr.slice(),
                    winBet: lastBets[i].winBet,
                    win: lastBets[i].win,
                    code: lastBets[i].code
                })
            }
        }
        this.addBet = function (fortuneBet, editionNum, betApplyFunc) {
            gameObj.mainFLGAccount.placeFortuneBet(fortuneBet, editionNum, gameObj.gameConfig, function (betCode) {
                if ((betCode == undefined) || (betsLocal.length >= 500) || betCode == -1) {
                    if (betApplyFunc) {
                        betApplyFunc(!1)
                    }
                    return
                }
                betsLocal.push({
                    fortuneBetObjArr: fortuneBet.fortuneBetObjArr.slice(),
                    winBet: fortuneBet.winBet,
                    win: fortuneBet.win,
                    code: betCode
                });
                if (betApplyFunc) {
                    betApplyFunc(!0)
                }
                gameObj.mainRenderer.renderManager.needUpdateRender = !0
            })
        };
        this.removeLasBet = function (betApplyFunc) {
            if (!betsLocal.length) {
                return
            }
            gameObj.mainFLGAccount.removeRoulette4kBet(betsLocal[betsLocal.length - 1].code, gameObj.gameConfig, function (betCode) {
                if ((betCode == undefined) || betCode == -1) {
                    if (betApplyFunc) {
                        betApplyFunc(!1)
                    }
                    return
                }
                betsLocal.pop();
                if (betApplyFunc) {
                    betApplyFunc(!0)
                }
                gameObj.mainRenderer.renderManager.needUpdateRender = !0
            })
        };
        this.setRoundResult = function (resBall) {
            for (var i = 0; i < betsLocal.length; i++) {
                betsLocal[i].winBet = resBall
            }
        }
    }
}