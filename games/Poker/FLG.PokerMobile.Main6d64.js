/**
 * Модуль игры Poker мобильная версия
 */
// Создаём объект нового Poker
function PokerAppMobile(gameConfig, configType) {

    // Деструктор
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

        // Удаляем все внешние свойства и ф-ии
        for (var i in selfLocal) {
            selfLocal[i] = null;
        }
        selfLocal = null;
    };

    // Указатель на самого себя
    var selfLocal = this;

    this.gameDir = 'games/Poker/resources/';
    this.gameDirMobile = 'games/Poker/resources/mobile/';
    this.gameConfig = gameConfig;
    this.configType = configType;
    // Создаём главный рендерер
    var mainRendererLocal = new FLGRenderer(1920, 1080, gameConfig[configType].canvasId, 'center');
    this.mainRenderer = mainRendererLocal;
    // Менеджер для проигрывания звуков
    this.mainSoundManager = new SoundManager(selfLocal.gameConfig[selfLocal.configType].gameKind, selfLocal.gameConfig[selfLocal.configType].gameType, selfLocal.gameConfig[selfLocal.configType].gameVariant);
    // Данные аккаунта в заголовке
    var mainFLGAccountLocal = new FLGAccount(undefined, selfLocal.mainSoundManager, selfLocal.mainRenderer);
    this.mainFLGAccount = mainFLGAccountLocal;
    // Объявляем глобального гейм менеджера
    var mainGameManagerLocal = new gameManagerPoker(this);
    this.mainGameManager = mainGameManagerLocal;
    // Объявляем глобального менеджера пользовательского интерфейса
    var mainUIManagerLocal = new UIManagerPokerMobile(this);
    this.mainUIManager = mainUIManagerLocal;
    // Сетка с интерактивными зонами
    var mainGridLocal;
    this.setMainGrid = function (value) {
        mainGridLocal = value;
        selfLocal.mainGrid = mainGridLocal;
    };
}

// Класс-управленец ползовательским интерфейсом
function UIManagerPokerMobile(gameObj) {
    this.destroy = function () {
        clearTimeout(betTimeoutId);
        clearTimeout(animateResultTimeoutId);
        clearTimeout(animateWinTimeoutId);
        clearTimeout(sendBetsTimeoutId);

        coinArr = null;
        maxValServer = null;
        maxVal = null;
        needAutoplay = null;

        betsControlsLocal.destroy();
        betsControlsLocal = null;

        mainFLGTimer.destroy();
        mainFLGTimer = null;

        timerRect = null;

        //mainVideo.destroy();
        //mainVideo = null;

        Jackpot.destroy();
        Jackpot = null;

        buttonsContainer = null;
        menuContainer = null;
        tabsContainer = null;
        bgContainer = null;
        chipContainer = null;
        infoTable = null;
        roundContainer = null;
        for (var i in tabs) {
            for (var j in tabs[i]) {
                tabs[i][j] = null;
            }
            tabs[i] = null;
        }
        tabs = null;

        lastTouchedZoneName = null;
        activeGameColor = null;

        winPlayers = null;
        winColor = null;
        winSuite = null;
        winComb = null;
        dkRiver = null;
        winStateTime = null;

        nameContainer = null;
        clearTimeout(nameRotateID);
        rotateNameFunc = null;

        getBetsArrByBetsHistoryFunc = null;

        for (var i in initEditionObjArr) {
            for (var j = 0; j < initEditionObjArr[i].length; j++) {
                initEditionObjArr[i][j].round = null;
                initEditionObjArr[i][j].editionResult = null;
                if (initEditionObjArr[i][j].betsHistory.destroy) {
                    initEditionObjArr[i][j].betsHistory.destroy();
                }
                initEditionObjArr[i][j].betsHistory = null;
            }
            initEditionObjArr[i] = null;
        }
        initEditionObjArr = null;
        initEditionsFunc = null;

        for (var i in animatedTweens) {
            animatedTweens[i] = null;
        }
        animatedTweens = null;
        // clickAnimationFunc = null;
        mainAnimationFunc = null;
        hoverEnterAnimationFunc = null;
        hoverLeaveAnimationFunc = null;
        flipAnimationFunc = null;
        flipTabAnimationFunc = null;
        simpleFlipXFunc = null;
        slideAnimationFunc = null;

        //zoneDownFunc = null;

        resources = null;

        combinationsCoefStyle = null;
        combinationsCoefWinStyle = null;
        tableCoefStyle - null;
        tableCoefWinStyle = null;

        tablesPos = null;
        zonesSizeInfo = null;
        tableInfo = null;
        deelerInfo = null;
        combinationsArr = null;
        suitesArr = null;
        cardSize = null;
        phaseNames = null;
        possibleBetNames = null;

        // showMaxPossibleWinFunc = null;
        startGameFunc = null;

        gameObj.mainFLGAccount.events.off('onBet', onBetChangeFunc);
        gameObj.mainFLGAccount.events.off('onBalance', onBalanceChangeFunc);
        onBetChangeFunc = null;
        onBalanceChangeFunc = null;

        gameObj.mainRenderer.stage.off('changeLang', onLanguageChangeFunc);
        onLanguageChangeFunc = null;

        // window.removeEventListener('keydown', enterPressFunc);
        // enterPressFunc = null;

        mainEditions.destroy();
        mainEditions = null;
        mainFortuneBetManager.destroy();
        mainFortuneBetManager = null;

        //mainFortuneModeManager.destroy();
        //mainFortuneModeManager = null;

        // Удаляем все внешние свойства и ф-ии
        for (var i in selfLocal) {
            selfLocal[i] = null;
        }
        selfLocal = null;
    }
    // Указатель на самого себя
    var selfLocal = this;

    // Логика кнопок ставок
    var coinArr = clientInfoGlobal.coin234.split('-');
    // избавляемся от копеек
    for (var i = 0; i < coinArr.length; i++) {
        coinArr[i] = coinArr[i] / 100;
    }
    // Добавляем MAX
    // var maxVal = parseInt(clientInfoGlobal.cfpokmax)/100;
    var maxVal = parseInt(coinArr[coinArr.length - 1], 10) * 2;

    var maxValServer = maxVal;
    coinArr.push('MAX\n' + maxVal);

    var betsControlsLocal = new betsControls(coinArr[0], coinArr[coinArr.length - 1], coinArr[1], coinArr,
        function () {
            // Если меньше баланса, то ставим всё
            if (gameObj.mainFLGAccount.balance() < maxVal && gameObj.mainFLGAccount.balance() > 0) {
                maxVal = gameObj.mainFLGAccount.balance();
            }
            gameObj.mainRenderer.renderManager.needUpdateRender = true;
            return maxVal;
        }
    );
    this.betsControls = betsControlsLocal;

    // Таймера для ввода ставок и и времени подсчёта результатов тиража
    var mainFLGTimer = new FLGTimer();
    var timerRect;

    // Джекпот
    var Jackpot = new FLGJackpot(gameObj.mainRenderer, {tirTimeOffset: 0.1, updateInterval: 900});

    // Контейнер для кнопок
    var buttonsContainer = new PIXI.Container();
    // Контейнер для меню
    var menuContainer = new PIXI.Container();
    // Контейнер для табов
    var tabsContainer = new PIXI.Container();
    var bgContainer = new PIXI.Container();
    var roundContainer = new PIXI.Container();
    // Контейнер для инфо таблицы
    var infoTable = new PIXI.Container();
    // Контейнер для истории таблицы
    // var historyTable = new PIXI.Container();
    var tabs = {
        info: {
            text: mainLocalizationTable.info.toUpperCase(),
            posX: 22,
            posY: 331,
        },
        bets: {
            text: mainLocalizationTable.bets.toUpperCase(),
            posX: 22,
            posY: 174,
        },
        game: {
            text: mainLocalizationTable.game.toUpperCase(),
            posX: 22,
            posY: 802,
            pressedDefault: true,
        }
    };
    // Текущий цвет игры
    var activeGameColor;
    // Контейнер для фишек
    var chipContainer = new PIXI.Container();

    var lastTouchedZoneName;
    // Авто повтор ставок
    var needAutoplay = false;

    // Тиражи
    var mainEditions;
    // Менеджер по ставкам
    var mainFortuneBetManager;
    this.betManager = function () {
        return mainFortuneBetManager;
    };
    // Менеджер режимов
    //var mainFortuneModeManager;

    // Получить массив ставок
    var getBetsArrByBetsHistoryFunc = function (betsHstr, tableNum) {

        var i = 0;
        var betsArr = [];
        if (!betsHstr || !tableNum) {
            return betsArr;
        }
        while (betsHstr[parseInt(i)] != undefined) {
            var betH = betsHstr[parseInt(i)];
            if (betH['e1'].toString().substr(0, 1) == tableNum) {
                betsArr.push({
                    comb: betH['e1'],
                    coef: betH.koef / 100,
                    summ: betH.bet / 100,
                    win: betH.win / 100,
                    code: betH.code,
                    state: betH.state,
                    phase: betH['e2'],
                    nm: 'p' + parseInt(betH['e1'].toString().substr(1)).toString(),
                });
            }
            i++;
        }
        return betsArr;
    };

    var initEditionObjArr = {red: [], green: [], blue: []};

    // Инициализируем историю тиражей
    var initEditionsFunc = function (gmState, succesFunc) {
        // Получить массив с результатами
        //function getResArr(gmState) {
        //    var resArr = [];

//            var ball = gmState['ball'];
//            if (ball != 99) {
//                resArr.push(ball);
//            }
//            return resArr;
//        }

        gameObj.mainGameManager.gameHistory(function (gmHistory) {
            // Формируем массив объектов истории
            for (var i in PokerObjectsArr) {
                for (var j in gmState[gameObj.gameConfig[i].editionsHistory]) {
                    initEditionObjArr[i].push({
                        round: gmState[gameObj.gameConfig[i].editionsHistory][j].tir,
                        editionResult: {
                            combination: gmState[gameObj.gameConfig[i].editionsHistory][j].comb,
                            suite: gmState[gameObj.gameConfig[i].editionsHistory][j].mast,
                            color: gmState[gameObj.gameConfig[i].editionsHistory][j].col,
                            winners: gmState[gameObj.gameConfig[i].editionsHistory][j].wpl.trim().split(' '),
                        },
                        betsHistory: new bets(getBetsArrByBetsHistoryFunc(gmHistory['history_stol_' + gameObj.gameConfig[gameObj.configType].tableNum][j].betsHistory, gameObj.gameConfig[i].tableNum) || []),
                    })
                }
            }
            // Пушем ещё текущий, если мы не в режиме розыгрыша
            if (!(gmState[gameObj.gameConfig[gameObj.configType].serverResp]['bt'] == 1 && gmState[gameObj.gameConfig[gameObj.configType].serverResp]['st'] == 5)) {
                for (var i in PokerObjectsArr) {
                    initEditionObjArr[i].unshift({
                        round: gmState[gameObj.gameConfig[gameObj.configType].serverResp]['tr'],
                        editionResult: {
                            combination: undefined,
                            suite: undefined,
                            color: undefined,
                            winners: [],
                        },
                        betsHistory: new bets([])
                    });
                }
            }

            mainEditions = new editions(initEditionObjArr);
            mainEditions.drawEditions();
            if (succesFunc) {
                succesFunc();
            }

        });
    };

    var animatedTweens = {};
    // Анимация на смену фона стола
    var mainAnimationFunc = function (obj, ID, texture, textStyle, msOffset, changeFunc) {
        if (!obj) {
            return;
        }

        // Если есть уже такая анимация, останавливаем
        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
            gameObj.mainRenderer.renderManager.animationTweenDec();
        }

        gameObj.mainRenderer.renderManager.animationTweenInc();
        animatedTweens[ID] = new TWEEN.Tween(obj).to({alpha: 0}, msOffset)
            // .easing(TWEEN.Easing.Exponential.Out)
            .onComplete(function () {
                gameObj.mainRenderer.renderManager.animationTweenDec();
                animatedTweens[ID] = null;

                if (texture) {
                    obj.texture = texture;
                }
                if (textStyle) {
                    obj.children[0].style = textStyle;
                }
                if (changeFunc) {
                    changeFunc();
                }

                // Начинаем другую анимацию
                gameObj.mainRenderer.renderManager.animationTweenInc();
                animatedTweens[ID] = new TWEEN.Tween(obj).to({alpha: 1}, msOffset)
                    .onComplete(function () {
                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        animatedTweens[ID] = null;
                    })
                    .start();
            })
            .start();
    };
    this.clickAnimationFunc = function (obj, ID) {
        if (!obj) {
            return;
        }

        // Если есть уже такая анимация, останавливаем
        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
            gameObj.mainRenderer.renderManager.animationTweenDec();
        }

        gameObj.mainRenderer.renderManager.animationTweenInc();
        animatedTweens[ID] = new TWEEN.Tween(obj).to({alpha: 1}, 110)
            .easing(TWEEN.Easing.Exponential.Out)
            .onComplete(function () {
                gameObj.mainRenderer.renderManager.animationTweenDec();
                animatedTweens[ID] = null;
                // Начинаем другую анимацию
                gameObj.mainRenderer.renderManager.animationTweenInc();
                animatedTweens[ID] = new TWEEN.Tween(obj).to({alpha: 0}, 500)
                    .onComplete(function () {
                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        animatedTweens[ID] = null;
                    })
                    .start();
            })
            .start();
    };
    var hoverEnterAnimationFunc = function (obj, ID, animType, alphaValue) {
        if (!obj || obj.alpha == 1) {
            return;
        }

        // Если есть уже такая анимация, останавливаем
        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
            gameObj.mainRenderer.renderManager.animationTweenDec();
        }

        gameObj.mainRenderer.renderManager.animationTweenInc();
        switch (animType) {
            case 'grow':
                animatedTweens[ID] = new TWEEN.Tween(obj.scale).to({x: 1.2, y: 1.2}, 330)
                    .easing(TWEEN.Easing.Exponential.Out)
                    .onComplete(function () {
                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        animatedTweens[ID] = null;
                    })
                    .start();
                break;
            default:
                animatedTweens[ID] = new TWEEN.Tween(obj).to({alpha: alphaValue ? alphaValue : 0.6}, 110)
                    .easing(TWEEN.Easing.Exponential.Out)
                    .onComplete(function () {
                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        animatedTweens[ID] = null;
                    })
                    .start();
        }
    };
    var hoverLeaveAnimationFunc = function (obj, ID, animType) {
        // Если есть уже такая анимация, останавливаем
        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
            gameObj.mainRenderer.renderManager.animationTweenDec();
        }

        if (!obj || obj.alpha == 0) {
            return;
        }

        gameObj.mainRenderer.renderManager.animationTweenInc();
        switch (animType) {
            case 'grow':
                animatedTweens[ID] = new TWEEN.Tween(obj.scale).to({x: 1, y: 1}, 330)
                    .easing(TWEEN.Easing.Exponential.Out)
                    .onComplete(function () {
                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        animatedTweens[ID] = null;
                    })
                    .start();
                break;
            default:
                animatedTweens[ID] = new TWEEN.Tween(obj).to({alpha: 0}, 500)
                    .onComplete(function () {
                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        animatedTweens[ID] = null;
                    })
                    .start();
        }
    };

    // Анимация на вращение
    var flipAnimationFunc = function (obj, ID, texture, text, textStyle) {
        if (!obj) {
            return;
        }

        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
        }

        gameObj.mainRenderer.renderManager.animationTweenInc();
        animatedTweens[ID] = new TWEEN.Tween(obj.scale).to({x: 0}, 330)
            .easing(TWEEN.Easing.Exponential.InOut)
            .onStop(function () {
                gameObj.mainRenderer.renderManager.animationTweenDec();
                animatedTweens[ID] = null;
                obj.scale.y = 1;
                obj.texture = texture;
                obj.children[0].text = text;
                obj.children[0].style = textStyle;
            })
            .onComplete(function () {
                gameObj.mainRenderer.renderManager.animationTweenDec();
                animatedTweens[ID] = null;

                obj.texture = texture;
                obj.children[0].text = text;
                obj.children[0].style = textStyle;

                // Начинаем другую анимацию
                gameObj.mainRenderer.renderManager.animationTweenInc();
                animatedTweens[ID] = new TWEEN.Tween(obj.scale).to({x: 1}, 330)
                    .easing(TWEEN.Easing.Exponential.InOut)
                    .onComplete(function () {
                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        animatedTweens[ID] = null;
                    })
                    .start();
            })
            .start();
    };

    var flipTabAnimationFunc = function (obj, obj2, ID) {
        if (!obj.container) {
            return;
        }

        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
            // obj.scale.y = 0;
        }

        // Триггерим событие на закрывание
        if (obj.onStartClose) {
            obj.onStartClose();
        }

        gameObj.mainRenderer.renderManager.animationTweenInc();
        animatedTweens[ID] = new TWEEN.Tween(obj.container.scale).to({y: 0}, 165)
            .easing(TWEEN.Easing.Exponential.InOut)
            .onStop(function () {
                // Триггерим событие на закрывание
                if (obj.onStopClose) {
                    obj.onStopClose();
                }
                // Триггерим событие на открывание
                if (obj2.onStopOpen) {
                    obj2.onStopOpen();
                }

                gameObj.mainRenderer.renderManager.animationTweenDec();
                animatedTweens[ID] = null;
                obj.container.scale.y = 0;
                obj2.container.scale.y = 1;
            })
            .onComplete(function () {
                // Триггерим событие на закрывание
                if (obj.onStopClose) {
                    obj.onStopClose();
                }

                gameObj.mainRenderer.renderManager.animationTweenDec();
                animatedTweens[ID] = null;

                // Триггерим событие на открывание
                if (obj2.onStartOpen) {
                    obj2.onStartOpen();
                }

                gameObj.mainRenderer.renderManager.animationTweenInc();
                animatedTweens[ID] = new TWEEN.Tween(obj2.container.scale).to({y: 1}, 330)
                    .easing(TWEEN.Easing.Exponential.Out)
                    .onStop(function () {
                        // Триггерим событие на закрывание
                        if (obj.onStopClose) {
                            obj.onStopClose();
                        }
                        // Триггерим событие на открывание
                        if (obj2.onStopOpen) {
                            obj2.onStopOpen();
                        }

                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        animatedTweens[ID] = null;
                        obj.container.scale.y = 0;
                        obj2.container.scale.y = 1;
                    })
                    .onComplete(function () {
                        // Триггерим событие на открывание
                        if (obj2.onStopOpen) {
                            obj2.onStopOpen();
                        }

                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        animatedTweens[ID] = null;
                    })
                    .start();
            })
            .start();
    };

    var slideAnimationFunc = function (obj, ID, value) {
        if (!obj) {
            return;
        }

        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
            return;
        }
        gameObj.mainRenderer.renderManager.animationTweenInc();

        animatedTweens[ID] = new TWEEN.Tween(obj.position).to({x: value}, 330)
            .easing(TWEEN.Easing.Exponential.Out)
            .onStop(function () {
                gameObj.mainRenderer.renderManager.animationTweenDec();
                animatedTweens[ID] = null;
            })
            .onComplete(function () {
                gameObj.mainRenderer.renderManager.animationTweenDec();
                animatedTweens[ID] = null;
            })
            .start();
    };

    // Анимация переворота простая
    var simpleFlipXFunc = function (obj, ID, time1, time2, onHalfFlipFunc, onCompleteFunc) {
        if (animatedTweens[ID]) {
            animatedTweens[ID].stop();
        }

        var initVal = obj.scale.x;
        gameObj.mainRenderer.renderManager.animationTweenInc();
        animatedTweens[ID] = new TWEEN.Tween(obj.scale).to({x: 0}, time1)
            // .easing(TWEEN.Easing.Exponential.InOut)
            .onStop(function () {
                gameObj.mainRenderer.renderManager.animationTweenDec();
                animatedTweens[ID] = null;
                obj.scale.x = initVal;
            })
            .onComplete(function () {
                gameObj.mainRenderer.renderManager.animationTweenDec();
                animatedTweens[ID] = null;

                if (onHalfFlipFunc) {
                    onHalfFlipFunc(obj);
                }

                gameObj.mainRenderer.renderManager.animationTweenInc();
                animatedTweens[ID] = new TWEEN.Tween(obj.scale).to({x: initVal}, time2)
                    // .easing(TWEEN.Easing.Exponential.Out)
                    .onStop(function () {
                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        animatedTweens[ID] = null;
                        obj.scale.x = initVal;
                        if (onCompleteFunc) {
                            onCompleteFunc(obj);
                        }
                    })
                    .onComplete(function () {
                        gameObj.mainRenderer.renderManager.animationTweenDec();
                        animatedTweens[ID] = null;
                        if (onCompleteFunc) {
                            onCompleteFunc(obj);
                        }
                    })
                    .start();
            })
            .start();
    };

    // Контейнер для вращяющихся букв
    var nameContainer;
    var nameRotateID = 0;
    var rotateNameFunc = function () {
        if (gameObj.mainGameManager === undefined) {
            return;
        }

        simpleFlipXFunc(nameContainer.children[0], 'charRotate0', 130, 130, undefined, function () {
            simpleFlipXFunc(nameContainer.children[1], 'charRotate1', 130, 130, undefined, function () {
                simpleFlipXFunc(nameContainer.children[2], 'charRotate2', 130, 130, undefined, function () {
                    simpleFlipXFunc(nameContainer.children[3], 'charRotate3', 130, 130, undefined, function () {
                        simpleFlipXFunc(nameContainer.children[4], 'charRotate4', 130, 130);
                    });
                });
            });
        });
    };

    var onBetChangeFunc;
    var onBalanceChangeFunc;

    var resources = [
        ['gmName_P', gameObj.gameDirMobile + 'P.png'],
        ['gmName_O', gameObj.gameDirMobile + 'O_.png'],
        ['gmName_K', gameObj.gameDirMobile + 'K_.png'],
        ['gmName_E', gameObj.gameDirMobile + 'E_.png'],
        ['gmName_R', gameObj.gameDirMobile + 'R.png'],
        ['BG_Blue', gameObj.gameDir + 'BG-Blue.jpg'],
        ['BG_Green', gameObj.gameDir + 'BG-Green.jpg'],
        ['BG_Red', gameObj.gameDir + 'BG-Red.jpg'],
        ['BG_Grey', gameObj.gameDir + 'BG-Grey.jpg'],
        ['table_Green', gameObj.gameDirMobile + 'table-Green.png'],
        ['table_Blue', gameObj.gameDirMobile + 'table-Blue.png'],
        ['table_Red', gameObj.gameDirMobile + 'table-Red.png'],
        ['roundline_Red', gameObj.gameDir + 'roundline-Red2.png'],
        ['roundline_Green', gameObj.gameDir + 'roundline-Green2.png'],
        ['roundline_Blue', gameObj.gameDir + 'roundline-Blue2.png'],
        ['WIN_BLUE', gameObj.gameDir + 'WinJP/Win-Blue-min.png'],
        ['WIN_GREEN', gameObj.gameDir + 'WinJP/Win-Green-min.png'],
        ['WIN_RED', gameObj.gameDir + 'WinJP/Win-Red-min.png'],

        ['JP_BLUE', gameObj.gameDir + 'WinJP/Jackpot-Blue-min.png'],
        ['JP_GREEN', gameObj.gameDir + 'WinJP/Jackpot-Green-min.png'],
        ['JP_RED', gameObj.gameDir + 'WinJP/Jackpot-Red-min.png'],
        ['jp_name', gameObj.gameDir + 'jackpotNG/JackPot.png'],
        ['jp_num_bot', gameObj.gameDir + 'jackpotNG/num-bot.png'],
        ['jp_num_top', gameObj.gameDir + 'jackpotNG/num-top.png'],

        ['footer', gameObj.gameDirMobile + 'footer.png'],

        ['video_frame', gameObj.gameDir + 'video-frame.png'],

        // ['timeline_bg', gameObj.gameDir+'timeline-bg.png'],
        // ['timeline', gameObj.gameDir+'timeline.png'],

        ['chip_1', gameObj.gameDirMobile + 'icons_chip_1.png'],
        ['chip_2', gameObj.gameDirMobile + 'icons_chip_2.png'],
        ['chip_3', gameObj.gameDirMobile + 'icons_chip_3.png'],
        ['chip_4', gameObj.gameDirMobile + 'icons_chip_4.png'],
        ['chip_5', gameObj.gameDirMobile + 'icons_chip_5.png'],
        ['chip_6', gameObj.gameDirMobile + 'icons_chip_6.png'],
        // ['chip_selected', gameObj.gameDir+'icons-chip-selected.png'],
        ['chip_disabled', gameObj.gameDirMobile + 'icons-chip-disabled3.png'],

        ['chip_3d_1', gameObj.gameDir + 'icons-chip-3d-1.png'],
        ['chip_3d_2', gameObj.gameDir + 'icons-chip-3d-2.png'],
        ['chip_3d_3', gameObj.gameDir + 'icons-chip-3d-3.png'],
        ['chip_3d_4', gameObj.gameDir + 'icons-chip-3d-4.png'],
        ['chip_3d_5', gameObj.gameDir + 'icons-chip-3d-5.png'],
        ['chip_3d_6', gameObj.gameDir + 'icons-chip-3d-6.png'],
        ['chip_3d_disabled', gameObj.gameDir + 'icons-chip-3d-disabled3.png'],

        ['cards_shirt_Blue', gameObj.gameDirMobile + 'cards-shirt-Blue.png'],
        ['cards_shirt_Green', gameObj.gameDirMobile + 'cards-shirt-Green.png'],
        ['cards_shirt_Red', gameObj.gameDirMobile + 'cards-shirt-Red.png'],
        ['combinations_frame', gameObj.gameDirMobile + 'combinations-frame.png'],
        ['cards_frame', gameObj.gameDirMobile + 'cards-highlight1.png'],
        ['cards_frame_mode_selected', gameObj.gameDirMobile + 'cards-highlight2.png'],
        ['cards_bu', gameObj.gameDirMobile + 'cards-table-bu.png'],
        ['cards_ch', gameObj.gameDirMobile + 'cards-table-ch.png'],
        ['cards_tr', gameObj.gameDirMobile + 'cards-table-tr.png'],
        ['cards_pi', gameObj.gameDirMobile + 'cards-table-pi.png'],

        // ['btn_clear', gameObj.gameDir+'btn-clear.png'],
        // ['btn_clear_mode_selected', gameObj.gameDir+'btn-clear-mode-selected.png'],
        // ['btn_undo', gameObj.gameDir+'btn-undo.png'],
        // ['btn_undo_mode_selected', gameObj.gameDir+'btn-undo-mode-selected.png'],
        // ['btn_home', gameObj.gameDir+'btn-home.png'],
        // ['btn_home_mode_selected', gameObj.gameDir+'btn-home-mode-selected.png'],
        // ['btn_info', gameObj.gameDir+'btn-info.png'],
        // ['btn_info_mode_selected', gameObj.gameDir+'btn-info-mode-selected.png'],
        // ['btn_info_mode_pressed', gameObj.gameDir+'btn-info-mode-pressed.png'],
        ['btn_double', gameObj.gameDirMobile + 'btn-double.png'],
        ['btn_double_mode_selected', gameObj.gameDirMobile + 'btn-double-pressed.png'],

        ['btn', gameObj.gameDirMobile + 'btn.png'],
        ['btn_mode_selected', gameObj.gameDirMobile + 'btn-pressed.png'],
        // ['btn_mode_pressed', gameObj.gameDirMobile+'btn-pressed.png'],

        ['btn_balance', gameObj.gameDirMobile + 'button-balance.png'],
        ['btn_bet', gameObj.gameDirMobile + 'btn_bet.png'],
        ['btn_bet_mode_selected', gameObj.gameDirMobile + 'btn-bet-pressed.png'],
        // ['btn_bet_mode_pressed', gameObj.gameDirMobile+'btn-bet-pressed.png'],

        ['btn_done', gameObj.gameDirMobile + 'btn-done.png'],
        ['btn_done_mode_selected', gameObj.gameDirMobile + 'btn-done-pressed.png'],
        // ['btn_done_mode_pressed', gameObj.gameDirMobile+'btn-done.png'],

        // ['btn_xbet', gameObj.gameDir+'btn-xbet.png'],
        // ['btn_xbet_mode_selected', gameObj.gameDir+'btn-xbet-mode-selected.png'],
        // ['btn_xbet_mode_pressed', gameObj.gameDir+'btn-xbet-mode-pressed.png'],

        ['btn_game_4', gameObj.gameDirMobile + 'btn-game-4.png'],
        ['btn_game_6', gameObj.gameDirMobile + 'btn-game-6.png'],
        ['btn_game_8', gameObj.gameDirMobile + 'btn-game-8.png'],

        ['btn_game_4_mode_selected', gameObj.gameDirMobile + 'btn-game-4-mode-selected.png'],
        ['btn_game_6_mode_selected', gameObj.gameDirMobile + 'btn-game-6-mode-selected.png'],
        ['btn_game_8_mode_selected', gameObj.gameDirMobile + 'btn-game-8-mode-selected.png'],

        ['zone_transp', gameObj.gameDirMobile + 'zone_transp.png'],
        ['zone_suit_black', gameObj.gameDirMobile + 'zone_suit_black.png'],
        ['zone_suit_red', gameObj.gameDirMobile + 'zone_suit_red.png'],
        ['zone_suit_bu', gameObj.gameDirMobile + 'zone_suit_bu.png'],
        ['zone_suit_ch', gameObj.gameDirMobile + 'zone_suit_ch.png'],
        ['zone_suit_pi', gameObj.gameDirMobile + 'zone_suit_pi.png'],
        ['zone_suit_tr', gameObj.gameDirMobile + 'zone_suit_tr.png'],
        ['zone_table', gameObj.gameDirMobile + 'zone_table.png'],

        ['zone_table_win', gameObj.gameDirMobile + 'zone_table_win.png'],
        ['zone_transp_win', gameObj.gameDirMobile + 'zone_combination_win.png'],
        ['zone_suit_black_win', gameObj.gameDirMobile + 'zone_suit_black_win.png'],
        ['zone_suit_red_win', gameObj.gameDirMobile + 'zone_suit_red_win.png'],
        ['zone_suit_bu_win', gameObj.gameDirMobile + 'zone_suit_bu_win.png'],
        ['zone_suit_ch_win', gameObj.gameDirMobile + 'zone_suit_ch_win.png'],
        ['zone_suit_pi_win', gameObj.gameDirMobile + 'zone_suit_pi_win.png'],
        ['zone_suit_tr_win', gameObj.gameDirMobile + 'zone_suit_tr_win.png'],
        ['zone_suit_bu_history', gameObj.gameDir + 'zone_suit_bu_history.png'],//?
        ['zone_suit_ch_history', gameObj.gameDir + 'zone_suit_ch_history.png'],//?
        ['zone_suit_pi_history', gameObj.gameDir + 'zone_suit_pi_history.png'],//?
        ['zone_suit_tr_history', gameObj.gameDir + 'zone_suit_tr_history.png'],//?
        ['zone_suit_black_history', gameObj.gameDir + 'zone_suit_black_history.png'],//?
        ['zone_suit_red_history', gameObj.gameDir + 'zone_suit_red_history.png'],//?
        ['player_hand', gameObj.gameDir + 'player.png'],

        ['win_table', gameObj.gameDirMobile + 'winTbl.png'],
        ['win_chip_table', gameObj.gameDirMobile + 'win-chip-table2.png'],
        ['win_chip_combinations', gameObj.gameDirMobile + 'win-chip-combinations2.png'],

        ['history_bg', gameObj.gameDir + 'history.png'],
        ['history_bg2', gameObj.gameDir + 'history2.png'],
        ['btn_close', gameObj.gameDir + 'btn-close.png'],
        ['btn_close_selected', gameObj.gameDir + 'btn-close-selected.png'],
        ['bet_arrow', gameObj.gameDir + 'arrow.png'],
        ['bet_arrow_selected', gameObj.gameDir + 'arrow-selected.png'],
        ['tab_history_row', gameObj.gameDir + 'tab-history-row.png'],
        ['tab_history_row_short', gameObj.gameDirMobile + 'tab-history-row-short.png'],
        ['tab_bg', gameObj.gameDir + 'tab-bg.png'],

        ['menu_bg', gameObj.gameDirMobile + 'menu-bg.png'],
        ['volume_sign', gameObj.gameDirMobile + 'volume-sign.png'],
        ['home_sign', gameObj.gameDirMobile + 'home-sign.png'],
        ['mute_sign', gameObj.gameDirMobile + 'mute-sign.png'],
    ];
    // Координаты столов
    var tablesPos = {
        main: {x: 503, y: 169, width: 914, height: 655},
        top: {x: 1445, y: 93, width: 914, height: 655},
        bottom: {x: 1445, y: 524, width: 914, height: 655}
    };
    // Размеры зон
    var zonesSizeInfo = {width: 116, height: 78, xOffset: 33, yOffset: 42};
    // Инфо о координатах игроков на столах
    var tableInfo = {
        red: [{
            cardPosX1: 532 + 49 - 2,
            cardPosX2: 619 + 49 + 2,
            cardPosY: -6 + 71,
            cardTexture: 'cards_shirt_Red',
            zonePosX: 519,
            zonePosY: 132,
            zoneW: 211,
            zoneH: 73,
            text: 1,
            servN: 15,
            texture: 'zone_table'
        },
            {
                cardPosX1: 532 + 49 - 2,
                cardPosX2: 619 + 49 + 2,
                cardPosY: 491 + 71,
                cardTexture: 'cards_shirt_Red',
                zonePosX: 519,
                zonePosY: 629,
                zoneW: 211,
                zoneH: 73,
                text: 2,
                servN: 16,
                texture: 'zone_table'
            },
            {
                cardPosX1: 252 + 49 - 2,
                cardPosX2: 339 + 49 + 2,
                cardPosY: 491 + 71,
                cardTexture: 'cards_shirt_Red',
                zonePosX: 239,
                zonePosY: 629,
                zoneW: 211,
                zoneH: 73,
                text: 3,
                servN: 17,
                texture: 'zone_table'
            },
            {
                cardPosX1: 252 + 49 - 2,
                cardPosX2: 339 + 49 + 2,
                cardPosY: -6 + 71,
                cardTexture: 'cards_shirt_Red',
                zonePosX: 239,
                zonePosY: 132,
                zoneW: 211,
                zoneH: 73,
                text: 4,
                servN: 18,
                texture: 'zone_table'
            }],
        green: [{
            cardPosX1: 532 + 49 - 2,
            cardPosX2: 619 + 49 + 2,
            cardPosY: -6 + 71,
            cardTexture: 'cards_shirt_Green',
            zonePosX: 519,
            zonePosY: 132,
            zoneW: 211,
            zoneH: 73,
            text: 1,
            servN: 15,
            texture: 'zone_table'
        },
            {
                cardPosX1: 771 + 49 - 2,
                cardPosX2: 858 + 49 + 2,
                cardPosY: 207 + 71,
                cardTexture: 'cards_shirt_Green',
                zonePosX: 758,
                zonePosY: 345,
                zoneW: 211,
                zoneH: 73,
                text: 2,
                servN: 16,
                texture: 'zone_table'
            },
            {
                cardPosX1: 532 + 49 - 2,
                cardPosX2: 619 + 49 + 2,
                cardPosY: 491 + 71,
                cardTexture: 'cards_shirt_Green',
                zonePosX: 519,
                zonePosY: 629,
                zoneW: 211,
                zoneH: 73,
                text: 3,
                servN: 17,
                texture: 'zone_table'
            },
            {
                cardPosX1: 252 + 49 - 2,
                cardPosX2: 339 + 49 + 2,
                cardPosY: 491 + 71,
                cardTexture: 'cards_shirt_Green',
                zonePosX: 239,
                zonePosY: 629,
                zoneW: 211,
                zoneH: 73,
                text: 4,
                servN: 18,
                texture: 'zone_table'
            },
            {
                cardPosX1: 13 + 49 - 2,
                cardPosX2: 100 + 49 + 2,
                cardPosY: 207 + 71,
                cardTexture: 'cards_shirt_Green',
                zonePosX: 0,
                zonePosY: 345,
                zoneW: 211,
                zoneH: 73,
                text: 5,
                servN: 19,
                texture: 'zone_table'
            },
            {
                cardPosX1: 252 + 49 - 2,
                cardPosX2: 339 + 49 + 2,
                cardPosY: -6 + 71,
                cardTexture: 'cards_shirt_Green',
                zonePosX: 239,
                zonePosY: 132,
                zoneW: 211,
                zoneH: 73,
                text: 6,
                servN: 20,
                texture: 'zone_table'
            }],
        blue: [{
            cardPosX1: 532 + 49 - 2,
            cardPosX2: 619 + 49 + 2,
            cardPosY: -6 + 71,
            cardTexture: 'cards_shirt_Blue',
            zonePosX: 519,
            zonePosY: 132,
            zoneW: 211,
            zoneH: 73,
            text: 1,
            servN: 15,
            texture: 'zone_table'
        },
            {
                cardPosX1: 771 + 49 - 2,
                cardPosX2: 858 + 49 + 2,
                cardPosY: 87 + 71,
                cardTexture: 'cards_shirt_Blue',
                zonePosX: 758,
                zonePosY: 225,
                zoneW: 211,
                zoneH: 73,
                text: 2,
                servN: 16,
                texture: 'zone_table'
            },
            {
                cardPosX1: 771 + 49 - 2,
                cardPosX2: 858 + 49 + 2,
                cardPosY: 358 + 71,
                cardTexture: 'cards_shirt_Blue',
                zonePosX: 758,
                zonePosY: 496,
                zoneW: 211,
                zoneH: 73,
                text: 3,
                servN: 17,
                texture: 'zone_table'
            },
            {
                cardPosX1: 532 + 49 - 2,
                cardPosX2: 619 + 49 + 2,
                cardPosY: 491 + 71,
                cardTexture: 'cards_shirt_Blue',
                zonePosX: 519,
                zonePosY: 629,
                zoneW: 211,
                zoneH: 73,
                text: 4,
                servN: 18,
                texture: 'zone_table'
            },
            {
                cardPosX1: 252 + 49 - 2,
                cardPosX2: 339 + 49 + 2,
                cardPosY: 491 + 71,
                cardTexture: 'cards_shirt_Blue',
                zonePosX: 239,
                zonePosY: 629,
                zoneW: 211,
                zoneH: 73,
                text: 5,
                servN: 19,
                texture: 'zone_table'
            },
            {
                cardPosX1: 13 + 49 - 2,
                cardPosX2: 100 + 49 + 2,
                cardPosY: 358 + 71,
                cardTexture: 'cards_shirt_Blue',
                zonePosX: 0,
                zonePosY: 496,
                zoneW: 211,
                zoneH: 73,
                text: 6,
                servN: 20,
                texture: 'zone_table'
            },
            {
                cardPosX1: 13 + 49 - 2,
                cardPosX2: 100 + 49 + 2,
                cardPosY: 87 + 71,
                cardTexture: 'cards_shirt_Blue',
                zonePosX: 0,
                zonePosY: 225,
                zoneW: 211,
                zoneH: 73,
                text: 7,
                servN: 21,
                texture: 'zone_table'
            },
            {
                cardPosX1: 252 + 49 - 2,
                cardPosX2: 339 + 49 + 2,
                cardPosY: -6 + 71,
                cardTexture: 'cards_shirt_Blue',
                zonePosX: 239,
                zonePosY: 132,
                zoneW: 211,
                zoneH: 73,
                text: 8,
                servN: 22,
                texture: 'zone_table'
            }]
    };
    var deelerInfo = {
        cardPosY: 267 + 71,
        cardPosX0: 244 + 49,
        cardPosX1: 341 + 49,
        cardPosX2: 438 + 49,
        cardPosX3: 535 + 49,
        cardPosX4: 632 + 49
    };
    // Инфо для рисования зон с комбинациями
    var combinationsArr = [{text: 'SF', info: 'St. Flush', servN: 8}, {
        text: 'FK',
        info: '4 of a Kind',
        servN: 7
    }, {text: 'FH', info: 'Full House', servN: 6}, {text: 'Fl', info: 'Flush', servN: 5}, {
        text: 'St',
        info: 'Straight',
        servN: 4
    }, {text: 'TK', info: '3 of a Kind', servN: 3}, {text: 'TP', info: 'Two Pairs', servN: 2}, {
        text: 'OP',
        info: 'One Pair',
        servN: 1
    }, {text: 'HC', info: 'High Card', servN: 0}];
    // Инфо для рисования зон с мастями
    var suitesArr = [{texture: 'zone_suit_pi', info: 'Spade', servN: 9}, {
        texture: 'zone_suit_ch',
        info: 'Heart',
        servN: 10
    }, {texture: 'zone_suit_bu', info: 'Diamond', servN: 11}, {
        texture: 'zone_suit_tr',
        info: 'Club',
        servN: 12
    }, {texture: 'zone_suit_black', info: 'Black', servN: 13}, {texture: 'zone_suit_red', info: 'Red', servN: 14}];
    var combinationsCoefStyle = {font: 'bold 48px Arial Narrow', fill: '#ffffff', align: 'bottom-center'};
    var tableCoefStyle = {font: 'bold 48px Arial Narrow', fill: '#ffffff', align: 'right'};
    var combinationsCoefWinStyle = {font: 'bold 48px Arial Narrow', fill: '#000', align: 'bottom-center'};
    var tableCoefWinStyle = {font: 'bold 48px Arial Narrow', fill: '#000', align: 'right'};
    var cardSize = {w: 100, h: 144};
    var phaseNames = {0: 'Undefined', 12: 'Flop', 13: 'Turn', 14: 'River'};
    var possibleBetNames = {
        0: {text: 'HC', info: 'High Card', gridNumber: 9},
        1: {text: 'OP', info: 'One Pair', gridNumber: 8},
        2: {text: 'TP', info: 'Two Pairs', gridNumber: 7},
        3: {text: 'TK', info: '3 of a Kind', gridNumber: 6},
        4: {text: 'St', info: 'Straight', gridNumber: 5},
        5: {text: 'Fl', info: 'Flush', gridNumber: 4},
        6: {text: 'FH', info: 'Full House', gridNumber: 3},
        7: {text: 'FK', info: '4 of a Kind', gridNumber: 2},
        8: {text: 'SF', info: 'Street Flush', gridNumber: 1},
        9: {texture: 'zone_suit_pi_history', info: 'Spade', gridNumber: 1},
        10: {texture: 'zone_suit_ch_history', info: 'Heart', gridNumber: 2},
        11: {texture: 'zone_suit_bu_history', info: 'Diamond', gridNumber: 3},
        12: {texture: 'zone_suit_tr_history', info: 'Club', gridNumber: 4},
        13: {texture: 'zone_suit_black_history', info: 'Black', gridNumber: 5},
        14: {texture: 'zone_suit_red_history', info: 'Red', gridNumber: 6},
        15: {texture: 'player_hand', info: '1', gridNumber: 1},
        16: {texture: 'player_hand', info: '2', gridNumber: 2},
        17: {texture: 'player_hand', info: '3', gridNumber: 3},
        18: {texture: 'player_hand', info: '4', gridNumber: 4},
        19: {texture: 'player_hand', info: '5', gridNumber: 5},
        20: {texture: 'player_hand', info: '6', gridNumber: 6},
        21: {texture: 'player_hand', info: '7', gridNumber: 7},
        22: {texture: 'player_hand', info: '8', gridNumber: 8}
    };
    // Добавляем ресурсы аккаунта
    resources = resources.concat(gameObj.mainFLGAccount.resources);
    // Добавляем ресурсы джекпота
    resources = resources.concat(Jackpot.resources);

    // Загружаем ресурсы
    gameObj.mainRenderer.loadResources(gameObj.mainRenderer.stage, 'images/logo.json', resources,

        function onLoad(loader, loadedResource, closeBGFunc) {
            // Рисуем игровой бэкграунд
            gameObj.mainRenderer.createButton(undefined, 0, 0, 'BG_Grey');
            gameObj.mainRenderer.createButton(undefined, 0, 0, 'BG_' + gameObj.gameConfig[gameObj.configType].gameType).name = 'BG';

            // Бэкграунд контейнера с кнопками
            gameObj.mainRenderer.createButton(undefined, 0, 0, 'footer');

            // Рисуем название игры
            // Отображаем подпись названия игры по буквенно и вращеям с интервалом в 20 сек
            nameContainer = gameObj.mainRenderer.createButton(undefined, 123, 42);
            nameContainer.anchor.set(0.5, 0.5);
            // P
            gameObj.mainRenderer.createButton(nameContainer, -120 * 0.65, 0, 'gmName_P');
            nameContainer.children[0].anchor.set(0.5, 0.5);
            nameContainer.children[0].scale.set(0.65, 0.65);
            // O
            gameObj.mainRenderer.createButton(nameContainer, -60 * 0.65, 0, 'gmName_O');
            nameContainer.children[1].anchor.set(0.5, 0.5);
            nameContainer.children[1].scale.set(0.65, 0.65);
            // K
            gameObj.mainRenderer.createButton(nameContainer, 0 * 0.65, 0, 'gmName_K');
            nameContainer.children[2].anchor.set(0.5, 0.5);
            nameContainer.children[2].scale.set(0.65, 0.65);
            // E
            gameObj.mainRenderer.createButton(nameContainer, 60 * 0.65, 0, 'gmName_E');
            nameContainer.children[3].anchor.set(0.5, 0.5);
            nameContainer.children[3].scale.set(0.65, 0.65);
            // R
            gameObj.mainRenderer.createButton(nameContainer, 120 * 0.65, 0, 'gmName_R');
            nameContainer.children[4].anchor.set(0.5, 0.5);
            nameContainer.children[4].scale.set(0.65, 0.65);
            // Запускаем по интервалу функуцию вращения
            nameRotateID = setInterval(rotateNameFunc, 10000);


            var btnSprite;
            // Создаем меню контейнер с кнопками
            gameObj.mainRenderer.createButton(menuContainer, 1920, 120, 'menu_bg');
            menuContainer.interactive = true;

            // Home
            btnSprite = gameObj.mainRenderer.createButton(menuContainer.getChildByName('menu_bg'), 22, 488, 'btn');
            btnSprite.name = 'btn_home';
            gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_mode_selected', undefined,
                function (icon, event) {
                    gameObj.mainSoundManager.playSound('buttonClick');
                    // Останавливаем делегирование нажатий клавиш
                    event.stopped = true;
                    selfLocal.clickAnimationFunc(icon, 'btn_home');

                    gameObj.mainFLGAccount.closeGame();

                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                },
                undefined,
                undefined,
                function (icon) {
                    hoverEnterAnimationFunc(icon, 'btn_home');
                },
                function (icon) {
                    hoverLeaveAnimationFunc(icon, 'btn_home');
                }
            ).alpha = 0;
            gameObj.mainRenderer.createButton(btnSprite, 129, 71, 'home_sign');
            btnSprite.getChildByName('home_sign').anchor.set(0.5, 0.5);
            // Видимость для возврата убераем для одной игры в апи
            if (APIManager.isAPIUser() && !APIManager.isAPIUserMenuMode() && btnSprite) {
                btnSprite.visible = (clientInfoGlobal.backurl && clientInfoGlobal.backurl != '');
            }

            // Volume
            btnSprite = gameObj.mainRenderer.createButton(menuContainer.getChildByName('menu_bg'), 22, 645, 'btn');
            btnSprite.name = 'btn_volume';
            gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_mode_selected', undefined,
                function (icon, event) {
                    gameObj.mainSoundManager.playSound('buttonClick');
                    // Останавливаем делегирование нажатий клавиш
                    event.stopped = true;
                    selfLocal.clickAnimationFunc(icon, 'btn_volume');

                    gameObj.mainSoundManager.muteSound(!gameObj.mainSoundManager.isMuted());
                    icon.parent.getChildByName('volume_sign').texture = gameObj.mainRenderer.resourceLoader.resources[gameObj.mainSoundManager.isMuted() ? 'mute_sign' : 'volume_sign'].texture;

                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                },
                undefined,
                undefined,
                function (icon) {
                    hoverEnterAnimationFunc(icon, 'btn_volume');
                },
                function (icon) {
                    hoverLeaveAnimationFunc(icon, 'btn_volume');
                }
            ).alpha = 0;
            gameObj.mainRenderer.createButton(btnSprite, 129, 71, 'volume_sign');
            btnSprite.getChildByName('volume_sign').anchor.set(0.5, 0.5);

            // Закрыть меню
            btnSprite = gameObj.mainRenderer.createButton(menuContainer.getChildByName('menu_bg'), 22, 17, 'btn');
            btnSprite.name = 'btn_close';
            gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_mode_selected', undefined,
                function (icon, event) {
                    gameObj.mainSoundManager.playSound('buttonClick');
                    // Останавливаем делегирование нажатий клавиш
                    event.stopped = true;
                    selfLocal.clickAnimationFunc(icon, 'btn_close');

                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                }, undefined,
                function (icon, event) {
                    // slideAnimationFunc(menuContainer.getChildByName('menu_bg'), 'menuContainer', 1920);
                    tabs['game'].button.emit('mousedown');
                    // menuContainer.visible = false;
                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                },
                function (icon) {
                    hoverEnterAnimationFunc(icon, 'btn_volume');
                },
                function (icon) {
                    hoverLeaveAnimationFunc(icon, 'btn_volume');
                }
            ).alpha = 0;
            // Подпись для кнопки Close
            gameObj.mainRenderer.createButton(btnSprite, 129, 70, undefined, {
                text: mainLocalizationTable.close.toUpperCase(),
                align: 'center',
                style: {font: 'bold 50px Arial Narrow', fill: '#292929'}
            });

            // Создаём контейнеры для табов
            for (var tb in tabs) {
                // Создаём контейнеры для табов
                switch (tb) {
                    case 'game':
                        btnSprite = gameObj.mainRenderer.createButton(tabsContainer, 0, 597, undefined);
                        break;
                    case 'bets':
                        btnSprite = gameObj.mainRenderer.createButton(tabsContainer, 0, 597, undefined);
                        break;
                    // case 'stats':
                    //     btnSprite = gameObj.mainRenderer.createButton(tabsContainer, 586, 625, 'tab_bg');
                    //     break;
                    // case 'video':
                    //     btnSprite = gameObj.mainRenderer.createButton(tabsContainer, 586, 625, undefined);
                    //     break;
                    case 'info':
                        btnSprite = gameObj.mainRenderer.createButton(tabsContainer, 0, 597, undefined);
                        break;
                }
                btnSprite.name = tb;
                btnSprite.anchor.set(0.5, 0.5);
                btnSprite.scale.y = 0;
                tabs[tb].container = btnSprite;
                // tabs[tb].container.position.set(0, -597);

                // Создаём кнопки для табов и назначаем им анимации на поворот
                btnSprite = gameObj.mainRenderer.createButton(menuContainer.getChildByName('menu_bg'), tabs[tb].posX, tabs[tb].posY, 'btn', {
                        text: tabs[tb].text,
                        align: 'center',
                        style: {font: 'bold 50px Arial Narrow', fill: '#292929'}
                    },
                    function (icon, event) {

                        if (icon.name == 'game') {
                            slideAnimationFunc(menuContainer.getChildByName('menu_bg'), 'menuContainer', 1920);
                        }

                        if (icon.pressed) return;

                        gameObj.mainSoundManager.playSound('buttonClick');

                        icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_mode_selected'].texture;
                        icon.children[0].style = {font: 'bold 50px Arial Narrow', fill: '#ffffff'};

                        if (icon.name == 'bets') {
                            if (mainEditions.betsTable().editionInd != (mainEditions.editions[gameObj.configType].length - 1)) {
                                // Рисуем детальную историю тиражей
                                mainEditions.drawDetailEditionHistoryFunc(mainEditions.betsTable(), mainEditions.editions[gameObj.configType].length - 1);
                            }
                        }

                        // Выключаем все табы
                        for (var tb2 in tabs) {
                            if (tabs[tb2].button.pressed) {
                                tabs[tb2].button.pressed = false;
                                tabs[tb2].button.texture = gameObj.mainRenderer.resourceLoader.resources['btn'].texture;
                                tabs[tb2].button.children[0].style = {font: 'bold 50px Arial Narrow', fill: '#292929'};
                                // Можем начинать анимацию
                                flipTabAnimationFunc(tabs[tb2], tabs[icon.name], 'flipContainer');
                                // tabs[tb2].container.scale.y = 0;
                                // tabs[icon.name].container.scale.y = 1;

                            }
                        }
                        // А текущий включаем
                        icon.pressed = true;

                        // event.stopped = true;
                        gameObj.mainRenderer.renderManager.needUpdateRender = true;
                    }
                );
                btnSprite.name = tb;
                tabs[tb].button = btnSprite;

                // Включаем по умолчанию первую вкладку
                if (tabs[tb].pressedDefault) {
                    tabs[tb].button.pressed = true;
                    tabs[tb].button.texture = gameObj.mainRenderer.resourceLoader.resources['btn_mode_selected'].texture;
                    tabs[tb].button.children[0].style = {font: 'bold 50px Arial Narrow', fill: '#ffffff'};
                    tabs[tb].container.scale.y = 1;
                }
            }

            // Рисуем линию раунда
            gameObj.mainRenderer.createButton(tabs['game'].container, 748, 120 - 597, 'roundline_' + gameObj.gameConfig[gameObj.configType].gameType).name = 'roundline';
            // gameObj.mainRenderer.createButton(roundContainer, 730, 146, undefined, {
            //     text: 'PRE-FLOP', align: 'center', style: {font: 'bold 34px Arial', fill: gameObj.gameConfig[gameObj.configType].roundTxtColor}});
            gameObj.mainRenderer.createButton(tabs['game'].container.getChildByName('roundline'), 165, 25, undefined, {
                text: 'FLOP',
                align: 'center',
                style: {font: 'bold 34px Arial', fill: gameObj.gameConfig[gameObj.configType].roundTxtColor}
            }).name = 'phaseFlop';
            gameObj.mainRenderer.createButton(tabs['game'].container.getChildByName('roundline'), 165, 25, undefined, {
                text: 'FLOP', align: 'center', style: {font: 'bold 34px Arial', fill: '#fff'}
            }).name = 'highlightFlop';
            tabs['game'].container.getChildByName('roundline').getChildByName('highlightFlop').alpha = 0;
            gameObj.mainRenderer.createButton(tabs['game'].container.getChildByName('roundline'), 368, 25, undefined, {
                text: 'TURN',
                align: 'center',
                style: {font: 'bold 34px Arial', fill: gameObj.gameConfig[gameObj.configType].roundTxtColor}
            }).name = 'phaseTurn';
            gameObj.mainRenderer.createButton(tabs['game'].container.getChildByName('roundline'), 368, 25, undefined, {
                text: 'TURN', align: 'center', style: {font: 'bold 34px Arial', fill: '#fff'}
            }).name = 'highlightTurn';
            tabs['game'].container.getChildByName('roundline').getChildByName('highlightTurn').alpha = 0;
            gameObj.mainRenderer.createButton(tabs['game'].container.getChildByName('roundline'), 571, 25, undefined, {
                text: 'RIVER',
                align: 'center',
                style: {font: 'bold 34px Arial', fill: gameObj.gameConfig[gameObj.configType].roundTxtColor}
            }).name = 'phaseRiver';
            gameObj.mainRenderer.createButton(tabs['game'].container.getChildByName('roundline'), 571, 25, undefined, {
                text: 'RIVER', align: 'center', style: {font: 'bold 34px Arial', fill: '#fff'}
            }).name = 'highlightRiver';
            tabs['game'].container.getChildByName('roundline').getChildByName('highlightRiver').alpha = 0;

            // Создаём менеджер режимов
            //mainFortuneModeManager = new fortuneModeManager(gameObj);

            // Создаём таймер
            timerRect = new PIXI.Graphics();
            timerRect.position.x = 249;
            timerRect.position.y = 21;
            timerRect.beginFill(0x000000);
            timerRect.drawRoundedRect(0, 0, 392, 40, 11);
            timerRect.endFill;

            // Подпись времени низ
            btnSprite = gameObj.mainRenderer.createButton(timerRect, 275, 20, undefined,
                {text: '00:00', align: 'left', style: {font: '40px Arial Bold', fill: '#e8a023'}});
            btnSprite.anchor.set(0.5, 0.5);

            // Создаём зел полоску внутри
            timerRect.addChild(new PIXI.Graphics());
            timerRect.children[1].beginFill(0x00a651);
            timerRect.children[1].drawRoundedRect(3, 3, 386, 34, 9);
            timerRect.children[1].endFill;

            // Подпись времени верх
            btnSprite = gameObj.mainRenderer.createButton(timerRect.children[1], 275, 20, undefined,
                {text: '00:00', align: 'left', style: {font: '40px Arial Bold', fill: '#000000'}});
            btnSprite.anchor.set(0.5, 0.5);

            // Добавляем маску для бегунка
            var timerMask = new PIXI.Graphics();
            timerMask.beginFill();
            timerMask.drawRoundedRect(3, 3, 386, 34, 9);
            timerMask.endFill;
            timerRect.children[1].mask = timerMask;
            timerRect.children[1].parent.addChild(timerMask);
            timerMask = null;

            gameObj.mainRenderer.stage.addChild(timerRect);

            // Ставка
            gameObj.mainRenderer.createButton(undefined, 1100, 41, undefined, {
                text: mainLocalizationTable.totalBet.toUpperCase() + ':',
                align: 'right',
                style: {font: 'bold 34px Arial', fill: '#c7c7c7'}
            }).name = 'betSprite';
            gameObj.mainRenderer.stage.getChildByName('betSprite').alpha = 0;
            gameObj.mainRenderer.createButton(undefined, 1120, 41, undefined, {
                text: formatFLGNums(gameObj.mainFLGAccount.totalBet()),
                align: 'left',
                style: {font: 'bold 45px Arial', fill: '#e8a023'}
            }).name = 'betTxt';
            gameObj.mainRenderer.stage.getChildByName('betTxt').alpha = 0;
            // Подписываем событе на обновление ставки
            onBetChangeFunc = function (bal) {
                // берём текст с ставки
                gameObj.mainRenderer.stage.getChildByName('betTxt').children[0].text = formatFLGNums(bal);
                gameObj.mainUIManager.setTextHeaderScale(gameObj.mainRenderer.stage.getChildByName('betTxt').children[0]);

                gameObj.mainRenderer.stage.getChildByName('betSprite').alpha = bal > 0 ? 1 : 0;
                gameObj.mainRenderer.stage.getChildByName('betTxt').alpha = bal > 0 ? 1 : 0;
            };
            gameObj.mainFLGAccount.events.on('onBet', onBetChangeFunc);

            // // Макс Выигрыш
            // gameObj.mainRenderer.createButton(undefined, 1320, 41, undefined, {text: mainLocalizationTable.maxWin.toUpperCase() + ':', align: 'right', style: {font: 'bold 26px Arial', fill: '#c7c7c7'}});
            // gameObj.mainRenderer.createButton(undefined, 1340, 41, undefined, {text: formatFLGNums(gameObj.mainFLGAccount.maxWin()), align: 'left', style: {font: 'bold 44px Arial', fill: '#e8a023'}}).name = 'maxWinTxt';
            // // Подписываем событе на обновление ставки
            // gameObj.mainFLGAccount.events.on('onMaxWin', function (bal) {
            //     // берём текст с ставки
            //     gameObj.mainRenderer.stage.getChildByName('maxWinTxt').children[0].text = formatFLGNums(bal);
            //     gameObj.mainUIManager.setTextHeaderScale(gameObj.mainRenderer.stage.getChildByName('maxWinTxt').children[0]);
            // });

            // Рисуем баланс
            btnSprite = gameObj.mainRenderer.createButton(undefined, 1645, 18, 'btn_balance', {
                text: (clientInfoGlobal.hall == 'DEMO') ? 'DEMO' : formatFLGNums(gameObj.mainFLGAccount.balance()),
                align: 'center',
                style: {font: 'bold 65px Arial', fill: '#e8a023'}
            });
            btnSprite.name = 'balanceTxt';
            btnSprite.children[0].anchor.y = 0.73;
            gameObj.mainUIManager.setTextHeaderScale(gameObj.mainRenderer.stage.getChildByName('balanceTxt').children[0]);
            gameObj.mainRenderer.createButton(btnSprite, btnSprite.width / 2, btnSprite.height * 0.8, undefined, {
                text: mainLocalizationTable.balance.toUpperCase(),
                align: 'center',
                style: {font: 'bold 28px Arial Narrow', fill: '#292929'}
            });
            // Подписываем событе на обновление баланса
            onBalanceChangeFunc = function (bal) {
                // берём текст с баланса
                gameObj.mainRenderer.stage.getChildByName('balanceTxt').children[0].text = (clientInfoGlobal.hall == 'DEMO') ? 'DEMO' : formatFLGNums(bal);
                gameObj.mainUIManager.setTextHeaderScale(gameObj.mainRenderer.stage.getChildByName('balanceTxt').children[0]);
            };
            gameObj.mainFLGAccount.events.on('onBalance', onBalanceChangeFunc);

            // MENU
            btnSprite = gameObj.mainRenderer.createButton(buttonsContainer, 1645, 129, 'btn');
            btnSprite.name = 'btn_menu';
            gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_mode_selected', undefined,
                function (icon, event) {
                    gameObj.mainSoundManager.playSound('buttonClick');
                    //icon.alpha = 1;
                    // Останавливаем делегирование нажатий клавиш
                    event.stopped = true;
                    selfLocal.clickAnimationFunc(icon, 'btn_menu');

                    // gameObj.mainFLGAccount.closeGame();

                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                },
                undefined,
                function () {
                    // menuContainer.visible = true;
                    slideAnimationFunc(menuContainer.getChildByName('menu_bg'), 'menuContainer', 1620);
                },
                function (icon) {
                    hoverEnterAnimationFunc(icon, 'btn_menu');
                },
                function (icon) {
                    hoverLeaveAnimationFunc(icon, 'btn_menu');
                }
            ).alpha = 0;
            // Подпись для кнопки Menu
            gameObj.mainRenderer.createButton(btnSprite, 129, 70, undefined, {
                text: mainLocalizationTable.menu.toUpperCase(),
                align: 'center',
                style: {font: 'bold 50px Arial Narrow', fill: '#292929'}
            });
            // INFO
            // btnSprite = gameObj.mainRenderer.createButton(buttonsContainer, 162, 962, 'btn_info');
            // buttonsContainer.getChildByName('btn_info').selected = false;
            // gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_info_mode_selected', undefined,
            //     function (icon, event) {
            //         gameObj.mainSoundManager.playSound('buttonClick');
            //         // Останавливаем делегирование нажатий клавиш
            //         event.stopped = true;
            //         // clickAnimationFunc(icon, 'btn_info');
            //
            //         buttonsContainer.getChildByName('btn_info').selected = !buttonsContainer.getChildByName('btn_info').selected;
            //
            //         if (buttonsContainer.getChildByName('btn_info').selected) {
            //             icon.alpha = 1;
            //             icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_info_mode_pressed'].texture;
            //         } else {
            //             icon.alpha = 0;
            //             icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_info_mode_selected'].texture;
            //         }
            //
            //         gameObj.mainUIManager.setInfoVisible(buttonsContainer.getChildByName('btn_info').selected);
            //
            //         renderManager.needUpdateRender = true;
            //     }, undefined, undefined,
            //     function (icon) { if (!buttonsContainer.getChildByName('btn_info').selected) { hoverEnterAnimationFunc(icon, 'btn_info');} },
            //     function (icon) { if (!buttonsContainer.getChildByName('btn_info').selected) { hoverLeaveAnimationFunc(icon, 'btn_info');} }
            // ).alpha = 0;

            // Double
            btnSprite = gameObj.mainRenderer.createButton(buttonsContainer, 1645, 447, 'btn_double');
            gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_double_mode_selected', undefined,
                function (icon, event) {
                    gameObj.mainSoundManager.playSound('stackChip');
                    //icon.alpha = 1;
                    // Останавливаем делегирование нажатий клавиш
                    event.stopped = true;
                    selfLocal.clickAnimationFunc(icon, 'btn_double');
                    // Удваиваем значения текущих ставок
                    mainFortuneBetManager.doubleCurrentBets();

                    // showMaxPossibleWinFunc();

                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                },
                undefined, undefined,
                function (icon) {
                    hoverEnterAnimationFunc(icon, 'btn_double');
                },
                function (icon) {
                    hoverLeaveAnimationFunc(icon, 'btn_double');
                }
            ).alpha = 0;
            // gameObj.mainRenderer.createButton(buttonsContainer, 555, 1027, undefined, {text: mainLocalizationTable.double, align: 'center', style: {font: '20px Arial Narrow', fill: '#ffffff'}}).name = 'btn_double_text';
            // UNDO
            btnSprite = gameObj.mainRenderer.createButton(buttonsContainer, 1645, 288, 'btn');
            btnSprite.name = 'btn_undo';
            gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_mode_selected', undefined,
                function (icon, event) {
                    gameObj.mainSoundManager.playSound('buttonClick');
                    //icon.alpha = 1;
                    // Останавливаем делегирование нажатий клавиш
                    event.stopped = true;
                    selfLocal.clickAnimationFunc(icon, 'btn_undo');

                    mainFortuneBetManager.undoGridState();

                    // showMaxPossibleWinFunc();

                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                },
                undefined, undefined,
                function (icon) {
                    hoverEnterAnimationFunc(icon, 'btn_undo');
                },
                function (icon) {
                    hoverLeaveAnimationFunc(icon, 'btn_undo');
                }
            ).alpha = 0;
            // Подпись для кнопки Undo
            gameObj.mainRenderer.createButton(btnSprite, 129, 70, undefined, {
                text: mainLocalizationTable.undo.toUpperCase(),
                align: 'center',
                style: {font: 'bold 50px Arial Narrow', fill: '#292929'}
            });

            // Номинал ставки
            btnSprite = gameObj.mainRenderer.createButton(buttonsContainer, 1645, 923, 'btn_bet');
            gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_bet_mode_selected', undefined,
                function (icon, event) {
                    // icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_bet_mode_pressed'].texture;
                    gameObj.mainSoundManager.playSound('chipSelector');

                    event.stopped = true;
                    selfLocal.clickAnimationFunc(icon, 'btn_bet');

                    betsControlsLocal.incrementBet();
                    icon.parent.getChildByName('betValue').children[0].text = (betsControlsLocal.isMaxBet()) ? 'MAX\n' + betsControlsLocal.currentBet() : betsControlsLocal.currentBet();
                    icon.parent.getChildByName('betValue').children[0].scale.set(betsControlsLocal.isMaxBet() ? 0.6 : 1, betsControlsLocal.isMaxBet() ? 0.6 : 1);

                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                },
                undefined,
                // function (icon) {
                //     icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_bet_mode_selected'].texture;
                //     gameObj.mainRenderer.renderManager.needUpdateRender = true;
                // },
                // function (icon) {
                //     icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_bet_mode_selected'].texture;
                //     gameObj.mainRenderer.renderManager.needUpdateRender = true;
                // },
                // function (icon) {
                //     icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_bet'].texture;
                //     gameObj.mainRenderer.renderManager.needUpdateRender = true;
                // }
                undefined,
                function (icon) {
                    hoverEnterAnimationFunc(icon, 'btn_bet');
                },
                function (icon) {
                    hoverLeaveAnimationFunc(icon, 'btn_bet');
                }
            ).alpha = 0;
            // btnSprite.hitArea = new PIXI.Rectangle(0, 0, 237, 100);
            // Подпись для кнопки Номинал ставки
            gameObj.mainRenderer.createButton(btnSprite, 129, 45, undefined, {
                text: betsControlsLocal.currentBet(),
                align: 'center',
                style: {font: '47px Arial Bold', fill: '#e8a023', align: 'center'}
            }).name = 'betValue';
            gameObj.mainRenderer.createButton(btnSprite, 129, 105, undefined, {
                text: mainLocalizationTable.bet.toUpperCase(),
                align: 'center',
                style: {font: 'bold 28px Arial Narrow', fill: '#292929'}
            });

            // Экспресс ставка
            btnSprite = gameObj.mainRenderer.createButton(buttonsContainer, 1645, 765, 'btn_bet_mode_selected', undefined
                // function (icon, event) {
                //     icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_bet_mode_pressed'].texture;
                //
                //     event.stopped = true;
                //     gameObj.mainRenderer.renderManager.needUpdateRender = true;
                // },
                // undefined,
                // function (icon) {
                //     icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_bet_mode_selected'].texture;
                //     gameObj.mainRenderer.renderManager.needUpdateRender = true;
                // },
                // function (icon) {
                //     icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_bet_mode_selected'].texture;
                //     gameObj.mainRenderer.renderManager.needUpdateRender = true;
                // },
                // function (icon) {
                //     icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_bet'].texture;
                //     gameObj.mainRenderer.renderManager.needUpdateRender = true;
                // }
            );
            // btnSprite.hitArea = new PIXI.Rectangle(73, 0, 237, 100);
            // Подпись для кнопки Экспресс ставка
            gameObj.mainRenderer.createButton(btnSprite, 129, 105, undefined, {
                text: mainLocalizationTable.express.toUpperCase().split(' ')[0],
                align: 'center',
                style: {font: 'bold 28px Arial Narrow', fill: '#292929'}
            });

            // DONE
            btnSprite = gameObj.mainRenderer.createButton(buttonsContainer, 1645, 607, 'btn_done');
            gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_done_mode_selected', undefined,
                function (icon, event) {
                    gameObj.mainSoundManager.playSound('buttonClick');

                    if (event) {
                        event.stopped = true;
                    }
                    selfLocal.clickAnimationFunc(icon, 'btn_done');

                    if (Object.keys(gameObj.mainGrid.pressedZones).length != 0) {
                        // Закрываем Нажатие пока не примутся ставки
                        icon.interactive = false;
                        // И кнопку Clear, Undo, X2, переключение столов
                        // buttonsContainer.getChildByName('btn_clear').children[0].interactive = false;
                        buttonsContainer.getChildByName('btn_undo').children[0].interactive = false;
                        buttonsContainer.getChildByName('btn_double').children[0].interactive = false;

                        gameObj.mainUIManager.sendBets('blue', function () {
                            if (Object.keys(gameObj.mainGrid.pressedZones).length != 0) {
                                gameObj.mainUIManager.sendBets('green', function () {
                                    if (Object.keys(gameObj.mainGrid.pressedZones).length != 0) {
                                        gameObj.mainUIManager.sendBets('red', function () {

                                            // // Максимальный выигрыш обнуляем
                                            // gameObj.mainFLGAccount.maxWin(0);
                                            //
                                            // mainFortuneBetManager.clearGridStates();

                                            // Разлочиваем Нажатие
                                            icon.interactive = true;
                                            // И кнопку Clear, Undo, X2, переключение столов
                                            // buttonsContainer.getChildByName('btn_clear').children[0].interactive = true;
                                            buttonsContainer.getChildByName('btn_undo').children[0].interactive = true;
                                            buttonsContainer.getChildByName('btn_double').children[0].interactive = true;

                                            // icon.texture = gameObj.mainRenderer.resourceLoader.resources[icon.name + '_mode_pressed'].texture;
                                            gameObj.mainRenderer.renderManager.needUpdateRender = true;
                                        });
                                    } else {
                                        // // Максимальный выигрыш обнуляем
                                        // gameObj.mainFLGAccount.maxWin(0);
                                        //
                                        // mainFortuneBetManager.clearGridStates();

                                        // Разлочиваем Нажатие
                                        icon.interactive = true;
                                        // И кнопку Clear, Undo, X2, переключение столов
                                        // buttonsContainer.getChildByName('btn_clear').children[0].interactive = true;
                                        buttonsContainer.getChildByName('btn_undo').children[0].interactive = true;
                                        buttonsContainer.getChildByName('btn_double').children[0].interactive = true;

                                        // icon.texture = gameObj.mainRenderer.resourceLoader.resources[icon.name + '_mode_pressed'].texture;
                                        gameObj.mainRenderer.renderManager.needUpdateRender = true;
                                    }
                                });
                            } else {
                                // // Максимальный выигрыш обнуляем
                                // gameObj.mainFLGAccount.maxWin(0);
                                //
                                // mainFortuneBetManager.clearGridStates();

                                // Разлочиваем Нажатие
                                icon.interactive = true;
                                // И кнопку Clear, Undo, X2, переключение столов
                                // buttonsContainer.getChildByName('btn_clear').children[0].interactive = true;
                                buttonsContainer.getChildByName('btn_undo').children[0].interactive = true;
                                buttonsContainer.getChildByName('btn_double').children[0].interactive = true;

                                // icon.texture = gameObj.mainRenderer.resourceLoader.resources[icon.name + '_mode_pressed'].texture;
                                gameObj.mainRenderer.renderManager.needUpdateRender = true;
                            }
                        });
                    }
                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                },
                undefined,
                // function (icon) {
                //     icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_done_mode_selected'].texture;
                //     gameObj.mainRenderer.renderManager.needUpdateRender = true;
                // },
                // function (icon) {
                //     icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_done_mode_selected'].texture;
                //     gameObj.mainRenderer.renderManager.needUpdateRender = true;
                // },
                // function (icon) {
                //     icon.texture = gameObj.mainRenderer.resourceLoader.resources['btn_done'].texture;
                //     gameObj.mainRenderer.renderManager.needUpdateRender = true;
                // }
                undefined,
                function (icon) {
                    hoverEnterAnimationFunc(icon, 'btn_done');
                },
                function (icon) {
                    hoverLeaveAnimationFunc(icon, 'btn_done');
                }
            ).alpha = 0;
            // btnSprite.anchor.set(0.5, 0.5);
            // Подпись для кнопки +
            gameObj.mainRenderer.createButton(btnSprite, 129, 120, undefined, {
                text: mainLocalizationTable.addToCoupon.toUpperCase(),
                align: 'center',
                style: {font: 'bold 22px Arial Narrow', fill: '#292929'}
            });

            // Clear
            // btnSprite = gameObj.mainRenderer.createButton(buttonsContainer, 340, 956, 'btn_clear');
            // gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_clear_mode_selected', undefined,
            //     function (icon, event) {
            //         gameObj.mainSoundManager.playSound('clearBet');
            //         //icon.alpha = 1;
            //         // Останавливаем делегирование нажатий клавиш
            //         event.stopped = true;
            //         clickAnimationFunc(icon, 'btn_clear');
            //
            //         // Удаляем текущие ставки
            //         // Сбрасываем тотал бет на удаленную ставку
            //         var removedSum = gameObj.mainGrid.removeCurrentBets();
            //         if (removedSum != 0) {
            //             console.log('clear ',-removedSum);
            //             gameObj.mainFLGAccount.totalBet(-removedSum);
            //         }
            //         removedSum = null;
            //
            //         mainFortuneBetManager.addGridState();
            //
            //         gameObj.mainRenderer.renderManager.needUpdateRender = true;
            //     },
            //     undefined, undefined,
            //     function (icon) { hoverEnterAnimationFunc(icon, 'btn_clear'); },
            //     function (icon) { hoverLeaveAnimationFunc(icon, 'btn_clear'); }
            // ).alpha = 0;
            // gameObj.mainRenderer.createButton(buttonsContainer, 362, 1027, undefined, {text: mainLocalizationTable.delete, align: 'center', style: {font: '20px Arial Narrow', fill: '#ffffff'}}).name = 'btn_clear_text';

            // Смещаем невидимый контейнер за игровое поле
            //buttonsContainer.position.y = 60;
            //buttonsContainer.alpha = 0;
            gameObj.mainRenderer.stage.addChild(bgContainer);
            gameObj.mainRenderer.stage.addChild(buttonsContainer);
            gameObj.mainRenderer.stage.addChild(menuContainer);
            gameObj.mainRenderer.stage.addChild(tabsContainer);
            gameObj.mainRenderer.stage.addChild(roundContainer);

            // Таймер
            // Бэкграунд
            // timeLineSpriteBg = gameObj.mainRenderer.createButton(undefined, 0, 0, 'timeline_bg');
            // Полоска
            // timeLineSprite = gameObj.mainRenderer.createButton(undefined, 0, 0, 'timeline');
            // Время
            // timeText = gameObj.mainRenderer.createButton(timeLineSprite, 5, 10, undefined, {text: '00:00', align: 'left', style: {font: '14px Arial', fill: '#000000'}});
            // gameObj.mainRenderer.createButton(timeLineSprite, 960, 10, undefined, {text: 'Place your bets', align: 'center', style: {font: '14px Arial', fill: '#000000'}});
            // gameObj.mainRenderer.createButton(timeLineSprite, 1915, 10, undefined, {text: 'Live Poker', align: 'right', style: {font: '14px Arial', fill: '#000000'}});

            // Создаём подпись для ограничения макс мин ставки на стол
            // var maxMin = gameObj.mainRenderer.createButton(buttonsContainer, 960, 1027, undefined, {
            //     text: mainLocalizationTable.minBetLower+': '+numberFormat(parseInt(clientInfoGlobal['cfstolmin'])/100, {thousands_sep: " ", decimals: 0})+
            //     '   '+mainLocalizationTable.maxBetLower+': '+numberFormat(parseInt(clientInfoGlobal['cfstolmax'])/100, {thousands_sep: " ", decimals: 0}), align: 'center', style: {font: '20px Arial Narrow', fill: '#ffffff'}
            // });
            // maxMin.name = 'max_min';
            // maxMin = null;

            // gameObj.mainRenderer.createButton(undefined, 14, 44, 'video_frame'); // убрать
            //gameObj.mainRenderer.createButton(undefined, 184, 1002, 'history_bg'); // убрать

            // Создаем сетку с интерактивными зонами 549 345
            gameObj.setMainGrid(new PokerGrid({x: 25, y: 560 - 597, cols: 3, rows: 3}, {
                x: 25,
                y: 175 - 597,
                cols: 3,
                rows: 2
            }, tabs['game'].container, gameObj.mainRenderer));

            var zoneDownFunc = function (zone, isOver, isTouchMove, gridContainer) {
                if (isOver) {
                    //if (!gameObj.mainGrid.gridContainer.down) {
                    //mainSoundManager.playSound('hover');
                    //}
                    // Имитируем mouseout для всех зон
                    //gameObj.mainGrid.zonesOut(hoverLeaveAnimationFunc);
                    // Определяем и подсвечиваем все зоны,которые дб выделены при наведении на текущую зону
                    //gameObj.mainUIManager.defineZonesForBet(zone, 0.35);
                }

                if (!isOver) {
                    gameObj.mainGrid[gridContainer].down = true;
                }
                // Если произошло нажатие (mousedown/touchstart)
                if ((isOver && gameObj.mainGrid[gridContainer].down) || (!isOver && !isTouchMove) || (isTouchMove && (zone.name != lastTouchedZoneName || lastTouchedZoneName == undefined))) {

                    // Если находимся в режиме ластика
                    //if (mainFortuneModeManager.currentMode().modeName=='eraser') {
                    //    mainSoundManager.playSound('unbet');
                    //    // Уменьшаем баланс
                    //    if (gameObj.mainGrid.pressedZones[zone.name]) {
                    //        gameObj.mainFLGAccount.totalBet(-parseFloat(gameObj.mainGrid.pressedZones[zone.name].bet));
                    //        gameObj.mainUIManager.defineZonesForBet(zone, 0.35, showPossibleWinFunc, -parseInt(gameObj.mainGrid.pressedZones[zone.name]['bet'])*parseInt(gameObj.mainGrid.pressedZones[zone.name]['coef']));
                    //        gameObj.mainGrid.removeCurrentBets([parseInt(zone.name)]);
                    //    }
                    //}
                    //else {
                    //     var curSumm = (gameObj.mainGrid[gridContainer].getChildByName(zone.name).getChildByName('smallChipText')) ? parseInt(gameObj.mainGrid[gridContainer].getChildByName(zone.name).getChildByName('smallChipText').text) : 0;
                    //     var afterBetSumm = parseInt(betsControlsLocal.currentBet({
                    //         comb: zone.name,
                    //         curSumm: curSumm
                    //     }));
                    //     // Проверяем возможность поставить ставку на стол
                    //     if (!selfLocal.isAllowBet(
                    //             {
                    //                 comb: zone.name,
                    //                 coef: undefined,
                    //                 summ: afterBetSumm
                    //             },
                    //             (gameObj.mainGrid.pressedZones[zone.name]) ? gameObj.mainGrid.pressedZones[zone.name]['bet']+afterBetSumm : afterBetSumm)) {
                    //         return;
                    //     }
                    //     // Увеличиваем общую ставку, если можем
                    //     if (afterBetSumm==0 || gameObj.mainFLGAccount.totalBet(afterBetSumm)==-1) { return; }
                    //     // Рисуем фишку
                    //     gameObj.mainUIManager.createSmallChip(zone, afterBetSumm);
                    var afterBetValue = gameObj.mainUIManager.createSmallChip(zone, betsControlsLocal.currentBet());
                    // Если зона уже выбрана, то повышаем ставку
                    if (zone.selected) {
                        gameObj.mainSoundManager.playSound('stackChip');
                        gameObj.mainGrid.pressedZones[zone.name]['bet'] = afterBetValue; //parseInt(gameObj.mainGrid[gridContainer].getChildByName(zone.name).getChildByName('smallChipText').text);
                        // Если зона еще не выбрана, то выбираем её и рисуем фишку
                    } else {
                        gameObj.mainSoundManager.playSound('firstChip');
                        zone.selected = true;
                        // Добавляем зону в массив выбранных зон
                        gameObj.mainGrid.pressedZones[zone.name] = {
                            zone: gameObj.mainGrid[gridContainer].getChildByName(zone.name),
                            bet: afterBetValue/*afterBetSumm*/,
                            coef: gameObj.mainGrid[gridContainer].getChildByName(zone.name).coef,
                            servN: gameObj.mainGrid[gridContainer].getChildByName(zone.name).servN
                        };
                    }
                    afterBetValue = null;
                    //// Показываем возможный выигрыш на зонах
                    //gameObj.mainUIManager.defineZonesForBet(zone, 0.35, showPossibleWinFunc, afterBetSumm*parseInt(gameObj.mainGrid.pressedZones[zone.name]['coef']));
                    //}
                    // showMaxPossibleWinFunc();
                }

                if (isTouchMove) {
                    //    // Если тачмув не внутри одной зоны а тачмув с зоны на зону
                    //    if (zone.name != lastTouchedZoneName || lastTouchedZoneName == undefined) {
                    //        if (lastTouchedZoneName != undefined) {
                    //            // Имитируем mouseout для всех зон
                    //            gameObj.mainGrid.zonesOut(hoverLeaveAnimationFunc);
                    //        }
                    //        // Определяем и подсвечиваем все зоны,которые дб выделены при наведении на текущую зону
                    //        gameObj.mainUIManager.defineZonesForBet(zone, 0.35);
                    //
                    //    }
                    // Запоминаем зону
                    lastTouchedZoneName = zone.name;
                }

                gameObj.mainRenderer.renderManager.needUpdateRender = true;
            };
            var zoneUpFunc = function (zone, gridContainer) {
                // Если зона нажата и нет режима ластика
                if (gameObj.mainGrid[gridContainer].down) {
                    mainFortuneBetManager.addGridState();
                }

                gameObj.mainGrid[gridContainer].down = false;
                //gameObj.mainGrid.zonesOut(hoverLeaveAnimationFunc);
                lastTouchedZoneName = undefined;
                gameObj.mainRenderer.renderManager.needUpdateRender = true;
            }

            var zoneDownCombinationsFunc = function (zone, isOver, isTouchMove) {
                zoneDownFunc(zone, isOver, isTouchMove, zone.parent.name);
                selfLocal.clickAnimationFunc(zone.getChildByName('frameSprite'), 'frameSprite' + zone.name);
            }
            var zoneUpCombinationsFunc = function (zone) {
                zoneUpFunc(zone, zone.parent.name);
            }
            var zoneDownSuitesFunc = function (zone, isOver, isTouchMove) {
                zoneDownFunc(zone, isOver, isTouchMove, zone.parent.name);
                selfLocal.clickAnimationFunc(zone.getChildByName('frameSprite'), 'frameSprite' + zone.name);
            }
            var zoneUpSuitesFunc = function (zone) {
                zoneUpFunc(zone, zone.parent.name);
            }
            var zoneDownTableFunc = function (zone, isOver, isTouchMove) {
                zoneDownFunc(zone, isOver, isTouchMove, zone.parent.name);
                if (!isOver) {
                    selfLocal.clickAnimationFunc(zone.parent.getChildByName('cards_frame' + zone.number).children[0], 'enter_cards_frame' + zone.name);
                }
            }
            var zoneUpTableFunc = function (zone) {
                zoneUpFunc(zone, zone.parent.name);
            }

            for (var i in PokerObjectsArr) {

                //Создаем зоны(ширина, высота, смещение, стиль текста, действие на down и на up)
                gameObj.mainGrid.createZonesCombinations(166, 112, {x: 27, y: 80}, {
                        font: 'bold 54px Arial Narrow',
                        fill: gameObj.gameConfig[i].numColor,
                        align: 'top-center'
                    },
                    combinationsArr,
                    combinationsCoefStyle, i, gameObj.gameConfig[i].tableNum, function (gridContainer) {
                        gridContainer.name = i + 'GridContainerCombinations';
                        gridContainer.visible = (i != 'blue') ? 0 : 1;
                        gridContainer.interactive = (i != 'blue') ? false : true;
                        // gridContainer.scale.set(1.4, 1.4);
                    },
                    zoneDownCombinationsFunc,
                    zoneUpCombinationsFunc,
                    function (icon) {
                    },
                    function (icon) {
                    });
                gameObj.mainGrid.createZonesSuites(166, 112, {x: 27, y: 80}, {},
                    suitesArr,
                    combinationsCoefStyle, i, gameObj.gameConfig[i].tableNum, function (gridContainer) {
                        gridContainer.name = i + 'GridContainerSuites';
                        gridContainer.visible = (i != 'blue') ? 0 : 1;
                        gridContainer.interactive = (i != 'blue') ? false : true;

                        // Меняем местами зоны, чтобы красные и черные были в разных рядах
                        var switchX = gridContainer.children[0].position.x;
                        var switchY = gridContainer.children[0].position.y;
                        gridContainer.children[0].position.set(gridContainer.children[4].position.x, gridContainer.children[4].position.y);
                        gridContainer.children[4].position.set(gridContainer.children[5].position.x, gridContainer.children[5].position.y);
                        gridContainer.children[5].position.set(gridContainer.children[2].position.x, gridContainer.children[2].position.y);
                        gridContainer.children[2].position.set(switchX, switchY);
                        switchX = null;
                        switchY = null;
                    },
                    zoneDownSuitesFunc,
                    zoneUpSuitesFunc,
                    function (icon) {
                    },
                    function (icon) {
                    });

                gameObj.mainGrid.createTable(tableInfo[i], {
                        font: 'bold 50px Arial Narrow',
                        fill: gameObj.gameConfig[i].numColor,
                        align: 'left'
                    },
                    tableCoefStyle, i, gameObj.gameConfig[i].tableNum, cardSize, function (gridContainer) {

                        switch (i) {
                            case 'blue':
                                gridContainer.gridPosition = 'main';
                                gridContainer.playersCount = 8;
                                gridContainer.tableColor = 'blue';
                                activeGameColor = 'blue';
                                break;
                            case 'green':
                                gridContainer.gridPosition = 'top';
                                gridContainer.playersCount = 6;
                                gridContainer.tableColor = 'green';
                                break;
                            case 'red':
                                gridContainer.gridPosition = 'bottom';
                                gridContainer.playersCount = 4;
                                gridContainer.tableColor = 'red';
                                break;
                        }
                        gridContainer.position.x = 630; //gameObj.gameConfig.tablesPos[gridContainer.gridPosition].x;
                        gridContainer.position.y = 250 - 597; //gameObj.gameConfig.tablesPos[gridContainer.gridPosition].y;
                        gridContainer.width = tablesPos[gridContainer.gridPosition].width;
                        gridContainer.height = tablesPos[gridContainer.gridPosition].height;
                        gridContainer.name = i + 'GridContainerTable';

                        // Бэкграунд для активного стола
                        var tableBg = gameObj.mainRenderer.createButton(gridContainer, 90, 162, 'table_' + gameObj.gameConfig[i].gameType, undefined,
                            function (icon) {
                                if (icon.name.toLowerCase().indexOf(activeGameColor) != -1) {
                                    return;
                                }
                                changeTable(gridContainer.tableColor, gridContainer.playersCount);
                            });
                        // Рисуем спрайт для показа выйгрышной уомбинации
                        var winTable = gameObj.mainRenderer.createButton(gridContainer, 228, 223, 'win_table', {
                            text: '',
                            align: 'center',
                            style: {font: 'bold 30px Arial Narrow', fill: gameObj.gameConfig[i].numColor}
                        });
                        winTable.alpha = 0;
                        winTable.getChildByName('textwin_table').position.y = 22;

                        // Надписи TURN, FLOP, RIVER
                        gameObj.mainRenderer.createButton(tableBg, 202, 170, undefined, {
                            text: 'FLOP', align: 'center', style: {font: 'bold 34px Arial Narrow', fill: '#ffffff'}
                        }).alpha = 0.3;
                        gameObj.mainRenderer.createButton(tableBg, 299, 170, undefined, {
                            text: 'FLOP', align: 'center', style: {font: 'bold 34px Arial Narrow', fill: '#ffffff'}
                        }).alpha = 0.3;
                        gameObj.mainRenderer.createButton(tableBg, 396, 170, undefined, {
                            text: 'FLOP', align: 'center', style: {font: 'bold 34px Arial Narrow', fill: '#ffffff'}
                        }).alpha = 0.3;
                        gameObj.mainRenderer.createButton(tableBg, 493, 170, undefined, {
                            text: 'TURN', align: 'center', style: {font: 'bold 34px Arial Narrow', fill: '#ffffff'}
                        }).alpha = 0.3;
                        gameObj.mainRenderer.createButton(tableBg, 591, 170, undefined, {
                            text: 'RIVER', align: 'center', style: {font: 'bold 34px Arial Narrow', fill: '#ffffff'}
                        }).alpha = 0.3;

                        tableBg = null;
                        if (i != gameObj.configType) {
                            // gridContainer.scale.set(0.5, 0.5);
                            gridContainer.visible = false;
                        }
                    },
                    zoneDownTableFunc, zoneUpTableFunc);
            }

            // function setInteractionTable(tableColor, interactionValue) {
            //     gameObj.mainGrid[tableColor+'GridContainerTable'].interactive = interactionValue;
            //     for (var i in gameObj.mainGrid[tableColor+'GridContainerTable'].children) {
            //         // console.log(gameObj.mainGrid[tableColor+'GridContainerTable'].children[i]);
            //         if (gameObj.mainGrid[tableColor+'GridContainerTable'].children[i].name.indexOf('cards_frame') != -1) {
            //             gameObj.mainGrid[tableColor+'GridContainerTable'].children[i].children[0].interactive = interactionValue; // спрайт карты
            //             gameObj.mainGrid[tableColor+'GridContainerTable'].children[i].children[0].buttonMode = interactionValue;
            //         } else if (gameObj.mainGrid[tableColor+'GridContainerTable'].children[i].name.indexOf(tableColor+'GridContainerTable') != -1) {
            //             gameObj.mainGrid[tableColor + 'GridContainerTable'].children[i].interactive = interactionValue; // спрайт зоны
            //             gameObj.mainGrid[tableColor + 'GridContainerTable'].children[i].buttonMode = interactionValue;
            //         }
            //     }
            // }

            function changeTable(tableColor, tableNum) {
                if (gameObj.mainGrid[tableColor + 'GridContainerTable'].gridPosition == 'main') {
                    return;
                }
                gameObj.mainSoundManager.playSound('buttonClick');

                // gameObj.mainGrid[activeGameColor+'GridContainerTable'].position.x = gameObj.gameConfig.tablesPos[gameObj.mainGrid[tableColor+'GridContainerTable'].gridPosition].x;
                // gameObj.mainGrid[activeGameColor+'GridContainerTable'].position.y = gameObj.gameConfig.tablesPos[gameObj.mainGrid[tableColor+'GridContainerTable'].gridPosition].y;
                // gameObj.mainGrid[activeGameColor+'GridContainerTable'].scale.set(0.5, 0.5);
                gameObj.mainGrid[activeGameColor + 'GridContainerTable'].visible = false;
                gameObj.mainGrid[activeGameColor + 'GridContainerTable'].gridPosition = gameObj.mainGrid[tableColor + 'GridContainerTable'].gridPosition;
                // setInteractionTable(activeGameColor, false);

                // gameObj.mainGrid[tableColor+'GridContainerTable'].position.x = gameObj.gameConfig.tablesPos.main.x;
                // gameObj.mainGrid[tableColor+'GridContainerTable'].position.y = gameObj.gameConfig.tablesPos.main.y;
                // gameObj.mainGrid[tableColor+'GridContainerTable'].scale.set(1, 1);
                gameObj.mainGrid[tableColor + 'GridContainerTable'].visible = true;
                gameObj.mainGrid[tableColor + 'GridContainerTable'].gridPosition = 'main';
                // Задаем текущий активный стол
                gameObj.mainGrid.activeTable(tableColor + 'GridContainerTable');
                // setInteractionTable(tableColor, true);

                activeGameColor = tableColor;
                // Меняем цвет фона
                mainAnimationFunc(gameObj.mainRenderer.stage.getChildByName('BG'), 'changeTable', loader.resources['BG_' + activeGameColor.substr(0, 1).toUpperCase() + activeGameColor.substr(1)].texture, null, 450);
                // mainAnimationFunc(gameObj.mainRenderer.stage.getChildByName('winAnimationSprite'), 'changeWinSprite', loader.resources['WIN_'+activeGameColor.toUpperCase()].texture, null, 450);
                // Меняем цвет раунда
                mainAnimationFunc(tabs['game'].container.getChildByName('roundline'), 'changeRoundline', loader.resources['roundline_' + activeGameColor.substr(0, 1).toUpperCase() + activeGameColor.substr(1)].texture, null, 500,
                    function () {
                        for (var i = 0; i < tabs['game'].container.getChildByName('roundline').children.length; i++) {
                            if (tabs['game'].container.getChildByName('roundline').children[i].name.indexOf('phase') >= 0) {
                                tabs['game'].container.getChildByName('roundline').children[i].children[0].style = {
                                    font: 'bold 34px Arial',
                                    fill: gameObj.gameConfig[activeGameColor].roundTxtColor
                                };
                            }
                        }
                    });
                if (gameObj.mainRenderer.stage.getChildByName('winAnimationSprite')) {
                    gameObj.mainRenderer.stage.getChildByName('winAnimationSprite').texture = gameObj.mainRenderer.resourceLoader.resources['WIN_' + activeGameColor.toUpperCase()].texture;
                }
                // Меняем зоны с комбинациями и мастями
                for (var i in PokerObjectsArr) {
                    gameObj.mainGrid[i + 'GridContainerCombinations'].visible = (i == activeGameColor) ? 1 : 0;
                    gameObj.mainGrid[i + 'GridContainerSuites'].visible = (i == activeGameColor) ? 1 : 0;
                    gameObj.mainGrid[i + 'GridContainerCombinations'].interactive = (i == activeGameColor) ? true : false;
                    gameObj.mainGrid[i + 'GridContainerSuites'].interactive = (i == activeGameColor) ? true : false;
                }
                // Задаем текущий активный грид с комбинациями и мастями
                gameObj.mainGrid.activeCombinationsGrid(activeGameColor + 'GridContainerCombinations');
                gameObj.mainGrid.activeSuitesGrid(activeGameColor + 'GridContainerSuites');
                // Подсвечиваем нужную кнопку стола
                tabs['game'].container.getChildByName('btn_game_4').texture = gameObj.mainRenderer.resourceLoader.resources['btn_game_4'].texture;
                tabs['game'].container.getChildByName('btn_game_6').texture = gameObj.mainRenderer.resourceLoader.resources['btn_game_6'].texture;
                tabs['game'].container.getChildByName('btn_game_8').texture = gameObj.mainRenderer.resourceLoader.resources['btn_game_8'].texture;
                tabs['game'].container.getChildByName('btn_game_4').children[0].style = {
                    font: '54px Arial',
                    fill: '#d2d2d4'
                };
                tabs['game'].container.getChildByName('btn_game_6').children[0].style = {
                    font: '54px Arial',
                    fill: '#d2d2d4'
                };
                tabs['game'].container.getChildByName('btn_game_8').children[0].style = {
                    font: '54px Arial',
                    fill: '#d2d2d4'
                };
                tabs['game'].container.getChildByName('btn_game_4').getChildByName('btn_game_4_mode_selected').visible = true;
                tabs['game'].container.getChildByName('btn_game_6').getChildByName('btn_game_6_mode_selected').visible = true;
                tabs['game'].container.getChildByName('btn_game_8').getChildByName('btn_game_8_mode_selected').visible = true;


                tabs['game'].container.getChildByName('btn_game_' + tableNum).texture = gameObj.mainRenderer.resourceLoader.resources['btn_game_' + tableNum + '_mode_selected'].texture;
                tabs['game'].container.getChildByName('btn_game_' + tableNum).children[0].style = {
                    font: '54px Arial',
                    fill: '#000000'
                };
                tabs['game'].container.getChildByName('btn_game_' + tableNum).getChildByName('btn_game_' + tableNum + '_mode_selected').visible = false;
                tabs['game'].container.getChildByName('btn_game_' + tableNum).getChildByName('btn_game_' + tableNum + '_mode_selected').alpha = 0;

                gameObj.mainRenderer.renderManager.needUpdateRender = true;
            }

            // GAME-4
            btnSprite = gameObj.mainRenderer.createButton(tabs['game'].container, 730, 975 - 597, 'btn_game_4', {
                text: '1',
                align: 'center',
                style: {font: '54px Arial', fill: '#d2d2d4'}
            });
            gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_game_4_mode_selected', {
                    text: '1',
                    align: 'center',
                    style: {font: '54px Arial', fill: '#d2d2d4'}
                },
                function (icon, event) {
                    // Останавливаем делегирование нажатий клавиш
                    event.stopped = true;
                    // clickAnimationFunc(icon, 'btn_game_4');

                    changeTable('red', 4);

                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                },
                undefined, undefined,
                function (icon) {
                    hoverEnterAnimationFunc(icon, 'btn_game_4');
                },
                function (icon) {
                    hoverLeaveAnimationFunc(icon, 'btn_game_4');
                }
            ).alpha = 0;

            // GAME-6
            btnSprite = gameObj.mainRenderer.createButton(tabs['game'].container, 990, 975 - 597, 'btn_game_6', {
                text: '2',
                align: 'center',
                style: {font: '54px Arial', fill: '#d2d2d4'}
            });
            gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_game_6_mode_selected', {
                    text: '2',
                    align: 'center',
                    style: {font: '54px Arial', fill: '#d2d2d4'}
                },
                function (icon, event) {
                    // Останавливаем делегирование нажатий клавиш
                    event.stopped = true;
                    // clickAnimationFunc(icon, 'btn_game_6');

                    changeTable('green', 6);

                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                },
                undefined, undefined,
                function (icon) {
                    hoverEnterAnimationFunc(icon, 'btn_game_6');
                },
                function (icon) {
                    hoverLeaveAnimationFunc(icon, 'btn_game_6');
                }
            ).alpha = 0;
            // gameObj.mainRenderer.createButton(buttonsContainer, 1274, 1027, undefined, {text: mainLocalizationTable.tables, align: 'center', style: {font: '20px Arial Narrow', fill: '#ffffff'}}).name = 'btn_tables_text';
            // GAME-8
            btnSprite = gameObj.mainRenderer.createButton(tabs['game'].container, 1250, 975 - 597, 'btn_game_8', {
                text: '3',
                align: 'center',
                style: {font: '54px Arial', fill: '#d2d2d4'}
            });
            gameObj.mainRenderer.createButton(btnSprite, 0, 0, 'btn_game_8_mode_selected', {
                    text: '3',
                    align: 'center',
                    style: {font: '54px Arial', fill: '#d2d2d4'}
                },
                function (icon, event) {
                    // Останавливаем делегирование нажатий клавиш
                    event.stopped = true;
                    // clickAnimationFunc(icon, 'btn_game_8');

                    changeTable('blue', 8);

                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                },
                undefined, undefined,
                function (icon) {
                    hoverEnterAnimationFunc(icon, 'btn_game_8');
                },
                function (icon) {
                    hoverLeaveAnimationFunc(icon, 'btn_game_8');
                }
            ).alpha = 0;

            // Подсвечиваем текущий выбранный стол
            tabs['game'].container.getChildByName('btn_game_8').texture = gameObj.mainRenderer.resourceLoader.resources['btn_game_8_mode_selected'].texture;
            tabs['game'].container.getChildByName('btn_game_8').children[0].style = {
                font: '54px Arial',
                fill: '#000000'
            };
            tabs['game'].container.getChildByName('btn_game_8').getChildByName('btn_game_8_mode_selected').visible = false;
            // Задаем неактивным столам интерактивность false
            // setInteractionTable('green', false);
            // setInteractionTable('red', false);

            // Рисуем инфо таблицу
            // Рисуем фон
            btnSprite = gameObj.mainRenderer.createButton(tabs['info'].container, 17, 152 - 597, 'tab_bg');
            btnSprite.scale.set(1.03, 1);

            gameObj.mainRenderer.createButton(tabs['info'].container, 240, 292 - 597, undefined, {
                text: mainLocalizationTable.info,
                align: 'center',
                style: {font: 'bold 40px Arial', fill: '#ffffff', align: 'center'}
            });

            // Меняем местами зоны, чтобы красные и черные были в разных рядах
            var suitesArrSwitched = suitesArr.slice();
            suitesArrSwitched.splice(0, 0, suitesArrSwitched[2]);
            suitesArrSwitched.splice(4, 0, suitesArrSwitched[6]);
            suitesArrSwitched.splice(6, 0, suitesArrSwitched[1]);
            suitesArrSwitched.splice(1, 1);
            suitesArrSwitched.splice(2, 1);
            suitesArrSwitched.splice(6, 1);
            var posX = gameObj.gameConfig.suitesGridPos.x + zonesSizeInfo.width * 0.4;
            var posY = gameObj.gameConfig.suitesGridPos.y + zonesSizeInfo.height * 0.3 + 50;
            for (var i = 0; i < gameObj.gameConfig.suitesGridPos.rows; i++) {
                for (var k = 0; k < gameObj.gameConfig.suitesGridPos.cols; k++) {
                    gameObj.mainRenderer.createButton(infoTable, posX, posY, suitesArrSwitched[i * gameObj.gameConfig.suitesGridPos.cols + k].texture + '_history').anchor.set(0.5, 0.5);
                    gameObj.mainRenderer.createButton(infoTable, posX, posY + zonesSizeInfo.height * 0.5 + 10, null, {
                        text: suitesArrSwitched[i * gameObj.gameConfig.suitesGridPos.cols + k].info,
                        align: 'center',
                        style: {font: 'bold 32px Arial Narrow', fill: '#ffffff'}
                    });
                    posX += zonesSizeInfo.width + zonesSizeInfo.xOffset;
                }
                posY += zonesSizeInfo.height + zonesSizeInfo.yOffset + 7;
                posX = gameObj.gameConfig.suitesGridPos.x + zonesSizeInfo.width * 0.4;
            }
            for (var i = 0; i < gameObj.gameConfig.combinationsGridPos.rows; i++) {
                for (var k = 0; k < gameObj.gameConfig.combinationsGridPos.cols; k++) {
                    gameObj.mainRenderer.createButton(infoTable, posX, posY, null, {
                        text: combinationsArr[i * gameObj.gameConfig.combinationsGridPos.cols + k].text,
                        align: 'center',
                        style: {font: 'bold 46px Arial Narrow', fill: '#e8a023', align: 'top-center'}
                    });
                    gameObj.mainRenderer.createButton(infoTable, posX, posY + zonesSizeInfo.height * 0.5 + 5, null, {
                        text: combinationsArr[i * gameObj.gameConfig.combinationsGridPos.cols + k].info,
                        align: 'center',
                        style: {font: 'bold 29px Arial Narrow', fill: '#ffffff'}
                    });
                    posX += zonesSizeInfo.width + zonesSizeInfo.xOffset;
                }
                posY += zonesSizeInfo.height + zonesSizeInfo.yOffset + 7;
                posX = gameObj.gameConfig.combinationsGridPos.x + zonesSizeInfo.width * 0.4;
            }

            suitesArrSwitched = null;

            infoTable.position.set(20, -37);
            tabs['info'].container.addChild(infoTable);

            btnSprite = null;

            // Отлавливаем событие изменения языка
            gameObj.mainRenderer.stage.on('changeLang', onLanguageChangeFunc);

            gameObj.mainGameManager.gameStateAsync(function (gmState) {
                initEditionsFunc(gmState, function () {
                    //        // Добавляем драг спрайт чтобы он был выше всего
                    //        mainFortuneModeManager.addDragSprite();

                    mainFortuneBetManager = new fortuneBetManager(gameObj);

                    for (var i in PokerObjectsArr) {
                        gameObj.mainGrid.drawTableCards(gmState[gameObj.gameConfig[i].serverResp].p, i);
                        if (gmState[gameObj.gameConfig[i].serverResp].dk) {
                            gameObj.mainGrid.drawZonesCoefs(gmState[gameObj.gameConfig[i].serverResp].dk.split(' '), gmState[gameObj.gameConfig[i].serverResp].p, i);
                        }
                        if (gmState[gameObj.gameConfig[i].serverResp].d) {
                            gameObj.mainGrid.drawTableDeeler(deelerInfo, gmState[gameObj.gameConfig[i].serverResp].d.split(' '), i, flipAnimationFunc, hoverEnterAnimationFunc, hoverLeaveAnimationFunc);
                        }
                    }

                    // #getbets
                    // Добавляем историю ставок
                    // $.ajax({
                    //     type: 'get',
                    //     url: getUrl(),
                    //     data: {
                    //         'getbets': parseInt(gameObj.gameConfig.serverNum.substr(1)),
                    //         'round': gmState[gameObj.gameConfig[gameObj.configType].serverResp]['tr']
                    //     },
                    //     dataType: 'json',
                    //     // Выполняем синхронный запрос т.к. бет тайм проходит раз  в 1 - 3 минуты
                    //     //async: false,
                    //     success: function (data, status, jqXHR) {
                    //         if (!gameObj.mainGameManager) { return; }
                    //
                    //         for (var gmCol in PokerObjectsArr) {
                    //
                    //             // Добавляем уже сделанные ставки
                    //             var btsHistoryArr = getBetsArrByBetsHistoryFunc(data.bet, gameObj.gameConfig[gmCol].tableNum);
                    //             for (var i = 0; i < btsHistoryArr.length; i++) {
                    //                 mainEditions.getActedOutEdition(gmCol).betsHistory.addBet(
                    //                     {
                    //                         fortuneBetObjArr: [{
                    //                             comb: btsHistoryArr[i].comb,
                    //                             coef: btsHistoryArr[i].coef,
                    //                             summ: btsHistoryArr[i].summ,
                    //                         }],
                    //                         phase: btsHistoryArr[i].phase.toString(),
                    //                         code: btsHistoryArr[i].code
                    //                     },
                    //                     gmState[gameObj.gameConfig[gameObj.configType].serverResp]['tr']
                    //                 );
                    //             }
                    //             // Рисуем ставки, подтянутые с сервера, на гриде
                    //             for (var i = 0; i < mainEditions.getActedOutEdition(gmCol).betsHistory.bets.length; i ++) {
                    //
                    //                 var zoneName = gameObj.mainUIManager.getZoneNameByCombinationCode(mainEditions.getActedOutEdition(gmCol).betsHistory.bets[i].comb, gmCol);
                    //
                    //                 // Копируем объект в selectedZones
                    //                 gameObj.mainGrid.selectedZones[zoneName] = {};
                    //
                    //                 for (var key in mainEditions.getActedOutEdition(gmCol).betsHistory.bets[i]) {
                    //                     gameObj.mainGrid.selectedZones[zoneName][key] = mainEditions.getActedOutEdition(gmCol).betsHistory.bets[i][key];
                    //                 }
                    //                 // console.log(gameObj.mainGrid.selectedZones);
                    //
                    //                 var zone = gameObj.mainGrid[zoneName.substr(1)].getChildByName(zoneName);
                    //                 gameObj.mainGrid.selectedZones[zoneName]['zone'] = zone;
                    //
                    //                 // Сначала рисуем саму фишку
                    //                 gameObj.mainUIManager.createSmallChip(zone, mainEditions.getActedOutEdition(gmCol).betsHistory.bets[i].summ);
                    //
                    //                 var indexToAdd = -1;
                    //
                    //                 // Смотрим создан ли disabledSprite  в нужной нам позиции
                    //                 for (var j = 0; j < zone.children.length; j++) {
                    //                     if (zone.children[j].name == 'spriteDisabled' /*&& zone.children[j].disabled*/ && !zone.children[j].visible) {
                    //                         zone.children[j].disabled = true;
                    //                         zone.children[j].visible = true;
                    //                         indexToAdd = j;
                    //                         break;
                    //                     }
                    //                 }
                    //
                    //                 // Если disabledSprite не создан в нужной нам позиции то создаем
                    //                 if (indexToAdd < 0) {
                    //                     for (var j = zone.children.length - 1; j >= 0; j--) {
                    //                         if (zone.children[j].name == 'smallChipText') {
                    //                             break;
                    //                         }
                    //                     }
                    //                     indexToAdd = j + 1;
                    //
                    //                     var isTableChip = (zoneName.indexOf('GridContainerTable') != -1) ? true : false;
                    //                     zone.addChildAt(new PIXI.Sprite(gameObj.mainRenderer.resourceLoader.resources[isTableChip ? 'chip_3d_disabled' : 'chip_disabled'].texture), indexToAdd);
                    //
                    //                     zone.children[indexToAdd].position.y = zone.children[indexToAdd - 2].position.y;
                    //                     zone.children[indexToAdd].position.x = zone.children[indexToAdd - 2].position.x;
                    //                     zone.children[indexToAdd].anchor.x = 0.5;
                    //                     zone.children[indexToAdd].anchor.y = 0.5;
                    //                     zone.children[indexToAdd].name = 'spriteDisabled';
                    //                     zone.children[indexToAdd].disabled = true;
                    //
                    //                     isTableChip = null;
                    //                 }
                    //
                    //                 zone.children[indexToAdd - 2].disabled = true;
                    //                 zone.children[indexToAdd - 1].disabled = true;
                    //
                    //                 zoneName = null;
                    //                 zone = null;
                    //                 indexToAdd = null;
                    //             }
                    //             // Рисуем более детелизированую историю тиражей
                    //             mainEditions.drawDetailEditionHistoryFunc(mainEditions.betsTable(), mainEditions.editions[gameObj.configType].length-1);
                    //
                    //             gameObj.mainRenderer.renderManager.needUpdateRender = true;
                    //         }
                    //     },
                    //     error: function(data, status, jqXHR) {
                    //         if (!gameObj.mainGameManager) { return; }
                    //
                    //         data = JSON.parse(data.responseText.substr(0, data.responseText.length-1));
                    //
                    //         for (var gmCol in PokerObjectsArr) {
                    //
                    //             // Добавляем уже сделанные ставки
                    //             var btsHistoryArr = getBetsArrByBetsHistoryFunc(data.bet, gameObj.gameConfig[gmCol].tableNum);
                    //             for (var i = 0; i < btsHistoryArr.length; i++) {
                    //                 mainEditions.getActedOutEdition(gmCol).betsHistory.addBet(
                    //                     {
                    //                         fortuneBetObjArr: [{
                    //                             comb: btsHistoryArr[i].comb,
                    //                             coef: btsHistoryArr[i].coef,
                    //                             summ: btsHistoryArr[i].summ,
                    //                         }],
                    //                         phase: btsHistoryArr[i].phase.toString(),
                    //                         code: btsHistoryArr[i].code
                    //                     },
                    //                     gmState[gameObj.gameConfig[gameObj.configType].serverResp]['tr']
                    //                 );
                    //             }
                    //             // Рисуем ставки, подтянутые с сервера, на гриде
                    //             for (var i = 0; i < mainEditions.getActedOutEdition(gmCol).betsHistory.bets.length; i ++) {
                    //
                    //                 var zoneName = gameObj.mainUIManager.getZoneNameByCombinationCode(mainEditions.getActedOutEdition(gmCol).betsHistory.bets[i].comb, gmCol);
                    //
                    //                 // Копируем объект в selectedZones
                    //                 gameObj.mainGrid.selectedZones[zoneName] = {};
                    //
                    //                 for (var key in mainEditions.getActedOutEdition(gmCol).betsHistory.bets[i]) {
                    //                     gameObj.mainGrid.selectedZones[zoneName][key] = mainEditions.getActedOutEdition(gmCol).betsHistory.bets[i][key];
                    //                 }
                    //                 // console.log(gameObj.mainGrid.selectedZones);
                    //
                    //                 var zone = gameObj.mainGrid[zoneName.substr(1)].getChildByName(zoneName);
                    //                 gameObj.mainGrid.selectedZones[zoneName]['zone'] = zone;
                    //
                    //                 // Сначала рисуем саму фишку
                    //                 gameObj.mainUIManager.createSmallChip(zone, mainEditions.getActedOutEdition(gmCol).betsHistory.bets[i].summ);
                    //
                    //                 var indexToAdd = -1;
                    //
                    //                 // Смотрим создан ли disabledSprite  в нужной нам позиции
                    //                 for (var j = 0; j < zone.children.length; j++) {
                    //                     if (zone.children[j].name == 'spriteDisabled' /*&& zone.children[j].disabled*/ && !zone.children[j].visible) {
                    //                         zone.children[j].disabled = true;
                    //                         zone.children[j].visible = true;
                    //                         indexToAdd = j;
                    //                         break;
                    //                     }
                    //                 }
                    //
                    //                 // Если disabledSprite не создан в нужной нам позиции то создаем
                    //                 if (indexToAdd < 0) {
                    //                     for (var j = zone.children.length - 1; j >= 0; j--) {
                    //                         if (zone.children[j].name == 'smallChipText') {
                    //                             break;
                    //                         }
                    //                     }
                    //                     indexToAdd = j + 1;
                    //
                    //                     var isTableChip = (zoneName.indexOf('GridContainerTable') != -1) ? true : false;
                    //                     zone.addChildAt(new PIXI.Sprite(gameObj.mainRenderer.resourceLoader.resources[isTableChip ? 'chip_3d_disabled' : 'chip_disabled'].texture), indexToAdd);
                    //
                    //                     zone.children[indexToAdd].position.y = zone.children[indexToAdd - 2].position.y;
                    //                     zone.children[indexToAdd].position.x = zone.children[indexToAdd - 2].position.x;
                    //                     zone.children[indexToAdd].anchor.x = 0.5;
                    //                     zone.children[indexToAdd].anchor.y = 0.5;
                    //                     zone.children[indexToAdd].name = 'spriteDisabled';
                    //                     zone.children[indexToAdd].disabled = true;
                    //
                    //                     isTableChip = null;
                    //                 }
                    //
                    //                 zone.children[indexToAdd - 2].disabled = true;
                    //                 zone.children[indexToAdd - 1].disabled = true;
                    //
                    //                 zoneName = null;
                    //                 zone = null;
                    //                 indexToAdd = null;
                    //             }
                    //             // Рисуем более детелизированую историю тиражей
                    //             mainEditions.drawDetailEditionHistoryFunc(mainEditions.betsTable(), mainEditions.editions[gameObj.configType].length-1);
                    //
                    //             gameObj.mainRenderer.renderManager.needUpdateRender = true;
                    //         }
                    //     }
                    // });

                    // инициализируем функцию отрисовки джекпота
                    Jackpot.drawCustomJackpot(
                        function (status, jpValue) {
                            // Получаем контейнер для джек пота если нет то создаём
                            var jpCntnr = tabs['game'].container.getChildByName('JackpotContainer');
                            var jpNumsCntnr;
                            var jpStatusCntnr;
                            // var jpNums;
                            var jpValueText = formatFLGNums(jpValue.toFixed(2), true);

                            // Если нет такого то создаём
                            if (!jpCntnr) {
                                // Добавляем в него бэграунд в зависимости от статуса (золотой, серебрянный или бронзовый)
                                jpCntnr = gameObj.mainRenderer.createButton(tabs['game'].container, 30, -500);
                                jpCntnr.name = 'JackpotContainer';

                                // Добавляем название
                                gameObj.mainRenderer.createButton(jpCntnr, 485, 36, 'jp_name').anchor.set(0.5, 0.5);
                                // Добавляем конетейнер для чисел
                                jpNumsCntnr = gameObj.mainRenderer.createButton(jpCntnr, 3, 3);
                                // Добавляем конетейнер для статуса заполнения джекпота
                                jpStatusCntnr = gameObj.mainRenderer.createButton(jpCntnr, 0, 68);
                            }
                            // Если есть инициалищируем данные
                            else {
                                // Добавляем конетейнер для чисел
                                jpNumsCntnr = jpCntnr.children[1];
                                // Добавляем конетейнер для статуса заполнения джекпота
                                jpStatusCntnr = jpCntnr.children[2];
                            }

                            // Выключаем все старые спрайты цифер если длина символов не совпадает
                            for (var i = 0; i < jpNumsCntnr.children.length; i++) {
                                jpNumsCntnr.children[i].visible = false;
                            }

                            // Смещение символов
                            var posXOffset = 0;
                            var numSprt;
                            // Делаем цикл по всему тексту
                            for (var i = jpValueText.length - 1, numInd = 0; i >= 0; i--, numInd++) {
                                numSprt = jpNumsCntnr.children[numInd];
                                var isNum = (jpValueText[i] !== '.') && (jpValueText[i] !== ' ');
                                // Если спрайта нет создаём иначе идём по логике
                                if (!numSprt) {
                                    // Далее если у нас не . и не пробел
                                    if (isNum) {
                                        numSprt = gameObj.mainRenderer.createButton(jpNumsCntnr, posXOffset, 0, 'jp_num_bot');
                                        // Создаём контейнер для подмены текста
                                        var textCntnr = gameObj.mainRenderer.createButton(numSprt, numSprt.width / 2, numSprt.height / 2);
                                        textCntnr.anchor.set(0.5, 0.5);

                                        // Создаём первый текст для подмены
                                        var secondText = new PIXI.Text(jpValueText[i], {
                                            font: 'bold 38px Arial',
                                            fill: '#000000',
                                            align: 'center'
                                        });
                                        secondText.anchor.set(0.5, 0.5);
                                        textCntnr.addChild(secondText);

                                        // Создаём второй текст для подмены
                                        secondText = new PIXI.Text(jpValueText[i], {
                                            font: 'bold 38px Arial',
                                            fill: '#000000',
                                            align: 'center'
                                        });
                                        // Смещаем на ширину спрайта
                                        secondText.position.y = numSprt.height;
                                        secondText.anchor.set(0.5, 0.5);
                                        textCntnr.addChild(secondText);

                                        // Создаём маску видимости
                                        var scrollMask = new PIXI.Graphics();
                                        scrollMask.beginFill();
                                        scrollMask.drawRect(0, 0, numSprt.width, numSprt.height);
                                        scrollMask.endFill;
                                        textCntnr.mask = scrollMask;
                                        textCntnr.parent.addChild(scrollMask);
                                        scrollMask = null;

                                        // Создаём накладку
                                        gameObj.mainRenderer.createButton(numSprt, 0, 0, 'jp_num_top');

                                        textCntnr = null;
                                        secondText = null;
                                    } else {
                                        numSprt = gameObj.mainRenderer.createButton(jpNumsCntnr, posXOffset + jpNumsCntnr.children[0].width - 1, 36, undefined,
                                            {
                                                text: (jpValueText[i] === ' ') ? ',' : jpValueText[i],
                                                align: 'center',
                                                style: {font: 'bold 38px Arial', fill: '#fefefe', align: 'center'}
                                            });
                                    }

                                }
                                // Если спрайт уже есть начинам анимацию для цифер
                                else {
                                    // включаем видимость спрайта
                                    numSprt.visible = true;
                                    numSprt.position.x = posXOffset;
                                    // Если номер добовляем смещениее ещё
                                    if (!isNum) {
                                        numSprt.position.x = numSprt.position.x + jpNumsCntnr.children[0].width - 1;
                                    }

                                    // Если цифра и буква отличается то анимируем
                                    if (isNum && (numSprt.children[0].children[0].text !== jpValueText[i])) {
                                        // назначаем тексту ниже нужное значение
                                        numSprt.children[0].children[1].text = jpValueText[i];

                                        // Если мы тут то требуется анимация
                                        gameObj.mainRenderer.renderManager.animationTweenInc();
                                        new TWEEN.Tween({
                                            firstPosY: numSprt.children[0].children[0].position.y,
                                            secondPosY: numSprt.children[0].children[1].position.y,
                                            numberSprite: jpNumsCntnr.children[numInd]
                                        })
                                            .to({
                                                firstPosY: numSprt.children[0].children[0].position.y - numSprt.height,
                                                secondPosY: numSprt.children[0].children[1].position.y - numSprt.height
                                            }, 865)
                                            // .easing(TWEEN.Easing.Elastic.Out)
                                            .onUpdate(function () {
                                                this.numberSprite.children[0].children[0].position.y = this.firstPosY;
                                                this.numberSprite.children[0].children[1].position.y = this.secondPosY;
                                            })
                                            // .onStop(function () {
                                            //     renderManager.animationTweenDec();
                                            //     // animatedTweens[ID] = null;
                                            //     // obj.scale.x = initVal;
                                            // })
                                            .onComplete(function () {
                                                // Меняем местами и запоминаем значения
                                                this.numberSprite.children[0].children[0].text = this.numberSprite.children[0].children[1].text;

                                                this.numberSprite.children[0].children[0].position.y = 0;
                                                this.numberSprite.children[0].children[1].position.y = this.numberSprite.height;

                                                gameObj.mainRenderer.renderManager.animationTweenDec();
                                            })
                                            .start();

                                    }
                                }

                                // И промежуток
                                if (numInd !== jpValueText.length - 1) {
                                    // Увеличиваем оффсет
                                    posXOffset -= numSprt.width;
                                    posXOffset -= 6;
                                    // Смещаем контейнер
                                    jpNumsCntnr.position.x = -posXOffset;
                                }
                            }

                            posXOffset = 0;
                            var totalNumWidth = jpNumsCntnr.position.x + jpNumsCntnr.children[0].width;
                            var stWidth = totalNumWidth * 0.8 / 10;
                            var stOffset = totalNumWidth * 0.2 / 9;
                            // Начинаем работу со статусами (всего их 10)
                            for (var i = 0; i < 10; i++) {
                                numSprt = jpStatusCntnr.children[i];
                                // Инициализируем цвет
                                var color;
                                switch (i) {
                                    case 0:
                                    case 1:
                                    case 2:
                                    case 3:
                                    case 4:
                                    case 5:
                                    case 6:
                                        color = 0x00ff00;
                                        break;
                                    case 7:
                                    case 8:
                                        color = 0xf3bc35;
                                        break;
                                    case 9:
                                        color = 0xea4402;
                                        break;
                                }

                                if (!numSprt) {
                                    numSprt = new PIXI.Graphics();

                                    numSprt.beginFill(color);
                                    numSprt.drawRect(posXOffset, 0, stWidth, 4);
                                    numSprt.endFill;
                                    jpStatusCntnr.addChild(numSprt);
                                } else {
                                    numSprt.clear();
                                    numSprt.beginFill(color);
                                    numSprt.drawRect(posXOffset, 0, stWidth, 4);
                                    numSprt.endFill;
                                }
                                posXOffset += stWidth + stOffset;
                                // Показываем если меньше или равен текущему статусу
                                numSprt.visible = i <= parseInt(status);
                            }
                            numSprt = null;

                            gameObj.mainRenderer.renderManager.needUpdateRender = true;

                            jpCntnr = null;
                            // не нулем потому что используется в твине
                            // jpNumsCntnr = null;
                            jpStatusCntnr = null;
                        });
                    // Инициализируем джекпот
                    Jackpot.updateJackpotData(gmState);

                    // Блокируем кнопки и интерактивные зоны
                    for (var i in PokerObjectsArr) {
                        gameObj.mainUIManager.setInteraction(false, i);
                    }

                    startGameFunc(gmState);

                    // Закрываем анимацию
                    if (closeBGFunc) {
                        closeBGFunc();
                    }
                    //        mainVideo.setVisible(true);
                    //        mainVideo.setAppearance(true);

                });
            });
        },
        function afterLoad() {
            // console.log('loaded!');
            gameObj.mainRenderer.renderManager.needUpdateRender = true;
            gameObj.mainSoundManager.playRandomBackSound();
        }
    );
    // Обработка события изменения языка
    var onLanguageChangeFunc = function () {
        // Получаем актуальную таблицу для локализации
        // Локализируем шапку игры
        gameObj.mainFLGAccount.updateAccountText();
        // gameObj.mainRenderer.stage.getChildByName('btn_clear_text').text = mainLocalizationTable.delete;
        gameObj.mainRenderer.stage.getChildByName('btn_undo_text').text = mainLocalizationTable.undo;
        gameObj.mainRenderer.stage.getChildByName('btn_double_text').text = mainLocalizationTable.double;
        gameObj.mainRenderer.stage.getChildByName('btn_tables_text').text = mainLocalizationTable.tables;
        // Локализируем макс мин ставку
        // gameObj.mainRenderer.stage.getChildByName('max_min').text = mainLocalizationTable.minBetLower+': '+numberFormat(parseInt(clientInfoGlobal['cfstolmin'])/100, {thousands_sep: " ", decimals: 0})+
        // '   '+mainLocalizationTable.maxBetLower+': '+numberFormat(parseInt(clientInfoGlobal['cfstolmax'])/100, {thousands_sep: " ", decimals: 0});
        gameObj.mainRenderer.renderManager.needUpdateRender = true;
    };
    this.onLanguageChange = onLanguageChangeFunc;

    // Подписываем приложение на Enter нажатие клавиши (принять ставку)
    // var enterPressFunc = function (e) {
    //     if (gameObj.mainRenderer.stage.visible && (e.keyCode == 13 ||  e.keyCode == 32) && buttonsContainer) {
    //         var done = buttonsContainer.getChildByName('btn_done');
    //         if (done && done.interactive ) {
    //             done.emit('mousedown');
    //             done.emit('mouseup');
    //         }
    //         done = null;
    //     }
    // };
    // // Узкое место для прилажух мульти игры
    // window.addEventListener('keydown', enterPressFunc);

    // Функция для отображения/скрытия таблицы ставок и инфо таблицы
    // this.setInfoVisible = function (value, tableView) {
    //     gameObj.mainGrid[activeGameColor + 'GridContainerCombinations'].visible = !value;
    //     gameObj.mainGrid[activeGameColor + 'GridContainerSuites'].visible = !value;
    //     for (var i in PokerObjectsArr) {
    //         gameObj.mainGrid[i + 'GridContainerTable'].visible = !value;
    //     }
    //     // gameObj.mainRenderer.stage.getChildByName('roundline').visible = !value;
    //
    //     switch (tableView) {
    //         case 'editions':
    //             infoTable.visible = value;
    //             mainEditions.setHistoryVisibility(value);
    //             // buttonsContainer.getChildByName('btn_my_bets').children[0].interactive = !value;
    //             break;
    //         case 'bets':
    //             buttonsContainer.getChildByName('btn_info').children[0].interactive = !value;
    //             break;
    //     }
    //
    //     buttonsContainer.getChildByName('btn_game_4').getChildByName('btn_game_4_mode_selected').interactive = !value;
    //     buttonsContainer.getChildByName('btn_game_6').getChildByName('btn_game_6_mode_selected').interactive = !value;
    //     buttonsContainer.getChildByName('btn_game_8').getChildByName('btn_game_8_mode_selected').interactive = !value;
    //
    //     for (var i in PokerObjectsArr) {
    //         gameObj.mainUIManager.setInteraction(!value, i);
    //     }
    // }

    // Функция для назначения интерактивности кнопкам и зонам
    // Метод для блокировки/разблокировки кнопок и интерактивных зон
    this.setInteraction = function (interactionValue, gameColor) {

        // buttonsContainer.getChildByName('btn_clear').children[0].interactive = interactionValue;
        buttonsContainer.getChildByName('btn_undo').children[0].interactive = interactionValue;
        buttonsContainer.getChildByName('btn_double').children[0].interactive = interactionValue;
        // buttonsContainer.getChildByName('btn_game_4').getChildByName('btn_game_4_mode_selected').interactive = interactionValue;
        // buttonsContainer.getChildByName('btn_game_6').getChildByName('btn_game_6_mode_selected').interactive = interactionValue;
        // buttonsContainer.getChildByName('btn_game_8').getChildByName('btn_game_8_mode_selected').interactive = interactionValue;
        // buttonsContainer.getChildByName('btn_bet').interactive = interactionValue;
        // buttonsContainer.getChildByName('btn_xbet').interactive = interactionValue;
        buttonsContainer.getChildByName('btn_done').children[0].interactive = interactionValue;
        // gameObj.mainGrid.setZoneInteraction(interactionValue);

        gameObj.mainUIManager.setInteractionTable(gameColor, interactionValue);
        gameObj.mainGrid[gameColor + 'GridContainerCombinations'].interactive = interactionValue;
        gameObj.mainGrid[gameColor + 'GridContainerSuites'].interactive = interactionValue;
        for (var i in gameObj.mainGrid[gameColor + 'GridContainerCombinations'].children) {
            // if ((gameObj.mainGrid[gameColor + 'GridContainerCombinations'].children[i].coef > 0 && interactionValue) || (gameObj.mainGrid[gameColor + 'GridContainerCombinations'].children[i].coef <= 0 && !interactionValue)) {
            gameObj.mainGrid[gameColor + 'GridContainerCombinations'].children[i].interactive = interactionValue;
            gameObj.mainGrid[gameColor + 'GridContainerCombinations'].children[i].buttonMode = interactionValue;
            gameObj.mainGrid[gameColor + 'GridContainerCombinations'].children[i].getChildByName('frameSprite').visible = interactionValue;
            // }
        }
        for (var i in gameObj.mainGrid[gameColor + 'GridContainerSuites'].children) {
            // if ((gameObj.mainGrid[gameColor + 'GridContainerSuites'].children[i].coef > 0 && interactionValue) || (gameObj.mainGrid[gameColor + 'GridContainerSuites'].children[i].coef <= 0 && !interactionValue)) {
            gameObj.mainGrid[gameColor + 'GridContainerSuites'].children[i].interactive = interactionValue;
            gameObj.mainGrid[gameColor + 'GridContainerSuites'].children[i].buttonMode = interactionValue;
            gameObj.mainGrid[gameColor + 'GridContainerSuites'].children[i].getChildByName('frameSprite').visible = interactionValue;
            // }
        }

        gameObj.mainRenderer.renderManager.needUpdateRender = true;
    };

    this.setInteractionTable = function (tableColor, interactionValue) {
        gameObj.mainGrid[tableColor + 'GridContainerTable'].interactive = interactionValue;
        for (var i in gameObj.mainGrid[tableColor + 'GridContainerTable'].children) {
            // console.log(gameObj.mainGrid[tableColor+'GridContainerTable'].children[i]);
            // if ((gameObj.mainGrid[tableColor + 'GridContainerTable'].children[i].coef > 0 && interactionValue) || (gameObj.mainGrid[tableColor + 'GridContainerTable'].children[i].coef <= 0 && !interactionValue)) {
            if (gameObj.mainGrid[tableColor + 'GridContainerTable'].children[i].name.indexOf('cards_frame') != -1) {
                gameObj.mainGrid[tableColor + 'GridContainerTable'].children[i].children[0].interactive = interactionValue; // спрайт карты
                gameObj.mainGrid[tableColor + 'GridContainerTable'].children[i].children[0].buttonMode = interactionValue;
                gameObj.mainGrid[tableColor + 'GridContainerTable'].children[i].children[0].visible = interactionValue;
            } else if (gameObj.mainGrid[tableColor + 'GridContainerTable'].children[i].name.indexOf(tableColor + 'GridContainerTable') != -1) {
                gameObj.mainGrid[tableColor + 'GridContainerTable'].children[i].interactive = interactionValue; // спрайт зоны
                gameObj.mainGrid[tableColor + 'GridContainerTable'].children[i].buttonMode = interactionValue;
            }
            // }
        }
    };

    this.sendBets = function (gameColor, sendBetsFunc) {
        var objArr = gameObj.mainUIManager.getFortuneObjectsByGrid(gameColor);

        if (!objArr.length) {
            sendBetsTimeoutId = setTimeout(sendBetsFunc, 100);
            return;
        }

        mainEditions.getActedOutEdition(gameColor).betsHistory.addBet(
            {
                fortuneBetObjArr: objArr,
                code: undefined
            }, mainEditions.getActedOutEdition(gameColor).round,
            function (addedBet) {
                if (!addedBet) {
                    // //Удаляем текущие ставки
                    // gameObj.mainGrid.removeCurrentBets(false);
                    // // Сбрасывае тотал бет общую ставку
                    // gameObj.mainFLGAccount.totalBet(-gameObj.mainFLGAccount.totalBet());
                } else {

                    // console.log('pressedzones', gameObj.mainGrid.pressedZones);
                    for (var i in gameObj.mainGrid.pressedZones) {
                        if (i.indexOf(gameColor) != -1) {

                            // Копируем объект из pressedZones в selectedZones
                            gameObj.mainGrid.selectedZones[i] = {};
                            for (var key in gameObj.mainGrid.pressedZones[i]) {
                                gameObj.mainGrid.selectedZones[i][key] = gameObj.mainGrid.pressedZones[i][key];
                            }

                            var zone = gameObj.mainGrid.selectedZones[i].zone;
                            var indexToAdd = -1;

                            // Смотрим создан ли disabledSprite  в нужной нам позиции
                            for (var j = 0; j < zone.children.length; j++) {
                                if (zone.children[j].name == 'spriteDisabled' /*&& zone.children[j].disabled*/ && !zone.children[j].visible) {
                                    zone.children[j].disabled = true;
                                    zone.children[j].visible = true;
                                    indexToAdd = j;
                                    break;
                                }
                            }

                            // Если disabledSprite не создан в нужной нам позиции то создаем
                            if (indexToAdd < 0) {
                                for (var j = zone.children.length - 1; j >= 0; j--) {
                                    if (zone.children[j].name == 'smallChipText') {
                                        break;
                                    }
                                }
                                indexToAdd = j + 1;

                                var isTableChip = (i.indexOf('GridContainerTable') != -1) ? true : false;
                                zone.addChildAt(new PIXI.Sprite(gameObj.mainRenderer.resourceLoader.resources[isTableChip ? 'chip_3d_disabled' : 'chip_disabled'].texture), indexToAdd);

                                zone.children[indexToAdd].position.y = zone.children[indexToAdd - 2].position.y;
                                zone.children[indexToAdd].position.x = zone.children[indexToAdd - 2].position.x;
                                zone.children[indexToAdd].anchor.x = 0.5;
                                zone.children[indexToAdd].anchor.y = 0.5;
                                zone.children[indexToAdd].name = 'spriteDisabled';
                                zone.children[indexToAdd].disabled = true;

                                isTableChip = null;
                            }

                            zone.children[indexToAdd - 2].disabled = true;
                            zone.children[indexToAdd - 1].disabled = true;

                            zone = null;
                            indexToAdd = null;
                        }
                    }

                    // console.log('selectedzones', gameObj.mainGrid.selectedZones);

                    // Рисуем детальную историю тиражей
                    mainEditions.drawDetailEditionHistoryFunc(mainEditions.betsTable(), mainEditions.editions[gameObj.configType].length - 1);

                    // Удаляем текущие ставки
                    // Сбрасываем тотал бет на удаленную ставку
                    var removedSum = gameObj.mainGrid.removeCurrentBets(gameColor, true);
                    if (removedSum != 0) {
                        // console.log('done ',-removedSum);
                        gameObj.mainFLGAccount.totalBet(removedSum, true);
                    }
                    removedSum = null;

                    // Максимальный выигрыш обнуляем
                    gameObj.mainFLGAccount.maxWin(0);

                    mainFortuneBetManager.clearGridStates();
                }
                if (sendBetsFunc) {
                    sendBetsFunc();
                }
            });
    };

    // Получаем имя зоны по коду комбинации
    this.getZoneNameByCombinationCode = function (combinationCode, gmColor) {
        if (!gmColor) {
            switch (parseInt(combinationCode.toString().substr(0, 1))) {
                case 1:
                    gmColor = 'red';
                    break;
                case 2:
                    gmColor = 'green';
                    break;
                default:
                    gmColor = 'blue';
                    break;
            }
        }
        combinationCode = parseInt(combinationCode.toString().substr(1));
        if (combinationCode >= 15) {
            return possibleBetNames[combinationCode].gridNumber + gmColor + 'GridContainerTable';
        } else if (combinationCode >= 9) {
            return possibleBetNames[combinationCode].gridNumber + gmColor + 'GridContainerSuites';
        } else {
            return possibleBetNames[combinationCode].gridNumber + gmColor + 'GridContainerCombinations';
        }
    }


    // Получаем текстуру для смены в зависимости от ставки
    this.getChipTextureByBet = function (betTxt, is3d) {
        var i;
        for (i = betsControlsLocal.possibleBets.length - 1; i >= 0; i--) {
            // console.log(betsControlsLocal.possibleBets[i], betTxt);
            if (betsControlsLocal.possibleBets[i].toString().replace(/\D+/, '') <= betTxt) return gameObj.mainRenderer.resourceLoader.resources[(is3d ? 'chip_3d_' : 'chip_') + (i + 1)].texture;
        }
        return gameObj.mainRenderer.resourceLoader.resources[is3d ? 'chip_3d_1' : 'chip_1'].texture;
    }


    this.createSmallChip = function (zone, bet) {

        var isTableChip = (zone.parent.name != null && zone.parent.name.indexOf('GridContainerTable') != -1) ? true : false;

        var indexToAdd = -1;

        // console.log('createchip', zone.name, bet);

        // Смотрим создан ли smallChip в нужной нам позиции
        for (var j = 0; j < zone.children.length; j++) {
            // Если создан, то меняем текст на фишке
            if (zone.children[j].name == 'smallChip' && !(zone.children[j].visible && zone.children[j].disabled)) {
                // console.log('only change text');
                if (parseFloat(zone.children[j + 1].text) + bet <= maxValServer) {
                    zone.children[j + 1].text = +parseFloat(parseFloat(zone.children[j + 1].text) + bet).toFixed(10);
                    // Масштабирум в зависимости от длины текста и от размера фишки
                    selfLocal.setTextScale(zone.children[j + 1], isTableChip ? 1.2 : 1.3, isTableChip ? 0.75 : 1);

                    zone.children[j].visible = true;
                    zone.children[j + 1].visible = true;
                    zone.children[j].disabled = false;
                    zone.children[j + 1].disabled = false;
                    zone.children[j].texture = gameObj.mainUIManager.getChipTextureByBet(parseFloat(zone.children[j + 1].text), isTableChip);
                } else {
                    // Показываем сообщение о достижении предела и выходим
                    gameObj.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet);
                    return +parseFloat(zone.children[j + 1].text).toFixed(10);
                }
                indexToAdd = j;
                break;
            }
        }

        // Если smallChip не создан в нужной нам позиции то создаем
        if (indexToAdd < 0) {
            // Рисуем фишку
            var smallChip = new PIXI.Sprite(gameObj.mainUIManager.getChipTextureByBet(bet, isTableChip));
            var smallChipText = new PIXI.Text(bet, {font: 'bold 27px Myriad Pro', fill: '#000000'});
            smallChipText.name = 'smallChipText';
            smallChip.name = 'smallChip';

            // console.log('create chip texture');

            if (zone.getChildByName('spriteDisabled')) {
                for (var j = zone.children.length - 1; j >= 0; j--) {
                    if (zone.children[j].name == 'spriteDisabled' && zone.children[j].disabled && zone.children[j].visible) {
                        break;
                    }
                }
                indexToAdd = j + 1;
                // console.log(indexToAdd, indexToAdd+1);
                zone.addChildAt(smallChip, indexToAdd);
                zone.addChildAt(smallChipText, indexToAdd + 1);
            } else {
                indexToAdd = isTableChip ? 2 : 0;
                zone.addChildAt(smallChip, indexToAdd);
                zone.addChildAt(smallChipText, indexToAdd + 1);
            }

            // Задаем позицию и масштаб для фишки и текста фишки
            zone.children[indexToAdd].anchor.x = 0.5;
            zone.children[indexToAdd].anchor.y = 0.5;
            zone.children[indexToAdd + 1].anchor.x = 0.5;
            zone.children[indexToAdd + 1].anchor.y = isTableChip ? 0.65 : 0.6;

            selfLocal.setTextScale(zone.children[indexToAdd + 1], isTableChip ? 1.2 : 1.3, isTableChip ? 0.75 : 1);


            zone.children[indexToAdd].position.y = isTableChip ? (zone.getChildByName('zoneBg').height / 2) - indexToAdd * 2 : (-zone.getChildByName('zoneBg').height / 10);
            zone.children[indexToAdd].position.x = isTableChip ? (zone.getChildByName('zoneBg').width / 4.4) : ((zone.getChildByName('zoneBg').width / 2) - indexToAdd * 2);

            zone.children[indexToAdd + 1].position.y = isTableChip ? (zone.getChildByName('zoneBg').height / 2) - (indexToAdd + 1) * 2 : (-zone.getChildByName('zoneBg').height / 10);
            zone.children[indexToAdd + 1].position.x = isTableChip ? (zone.getChildByName('zoneBg').width / 4.4) : ((zone.getChildByName('zoneBg').width / 2) - indexToAdd * 2);

            smallChipText = null;
            smallChip = null;
        }

        isTableChip = null;

        return +parseFloat(zone.children[indexToAdd + 1].text).toFixed(10);
    };

    // Метод изменения масштаба текста PIXI.Text объекта в зависимости от длины текста
    this.setTextHeaderScale = function (pixiText) {
        if (pixiText.text.length > 12) {
            pixiText.scale.set(0.5, 0.5);
        } else if (pixiText.text.length > 9) {
            pixiText.scale.set(0.6, 0.6);
        } else {
            pixiText.scale.set(0.85, 0.85);
        }
    };

    // Метод изменения масштаба текста PIXI.Text объекта в зависимости от длины текста
    this.setTextScale = function (pixiText, saveProportion, is3d) {
        if (pixiText.text.indexOf('MAX\n') >= 0) {
            pixiText.scale.set(0.5, 0.5);
            return;
        }
        if (!saveProportion) {
            saveProportion = 1.0;
        }
        if (!is3d) {
            is3d = 1.0;
        }
        switch (pixiText.text.length) {
            case 5:
                pixiText.scale.set(0.5 * saveProportion, 0.5 * saveProportion * is3d);
                break;
            case 4:
                pixiText.scale.set(0.6 * saveProportion, 0.6 * saveProportion * is3d);
                break;
            case 3:
                if (pixiText.text == 'MAX') {
                    pixiText.scale.set(0.65 * saveProportion, 0.65 * saveProportion * is3d);
                } else {
                    pixiText.scale.set(0.75 * saveProportion, 0.75 * saveProportion * is3d);
                }
                break;
            default:
                pixiText.scale.set(1.0 * saveProportion, 1.0 * saveProportion * is3d);
                break;
        }
    };

    // Максимально возможный выигрыш
    // var showMaxPossibleWinFunc = function () {
    //     var maxWinObj = {redGridContainerTable: 0, redGridContainerCombinations: 0, redGridContainerSuites: 0, redGridContainerColors: 0,
    //         greenGridContainerTable: 0, greenGridContainerCombinations: 0, greenGridContainerSuites: 0, greenGridContainerColors: 0,
    //         blueGridContainerTable: 0, blueGridContainerCombinations: 0, blueGridContainerSuites: 0, blueGridContainerColors: 0,};
    //     var k;
    //     // Считаем максимально возможный выигрыш для текущей ставки
    //     if (Object.keys(gameObj.mainGrid.pressedZones).length != 0) {
    //         for (var i in gameObj.mainGrid.pressedZones) {
    //             for (var j in maxWinObj) {
    //                 if (i.indexOf(j) >= 0) {
    //                     // console.log(i, j, gameObj.mainGrid.pressedZones[i].bet, gameObj.mainGrid.pressedZones[i].coef);
    //                     if (i.indexOf('GridContainerSuites') >= 0 && (i.indexOf('5') >= 0 || i.indexOf('6') >= 0)) {
    //                         k = gameObj.mainGrid.pressedZones[i].zone.parent.name.replace('Suites', 'Colors');
    //                         if (maxWinObj[k] < gameObj.mainGrid.pressedZones[i].bet * gameObj.mainGrid.pressedZones[i].coef) {
    //                             maxWinObj[k] = gameObj.mainGrid.pressedZones[i].bet * gameObj.mainGrid.pressedZones[i].coef;
    //                         }
    //                     } else {
    //                         if (maxWinObj[j] < gameObj.mainGrid.pressedZones[i].bet * gameObj.mainGrid.pressedZones[i].coef) {
    //                             maxWinObj[j] = gameObj.mainGrid.pressedZones[i].bet * gameObj.mainGrid.pressedZones[i].coef;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     var maxWin = 0;
    //     for (i in maxWinObj) {
    //         maxWin += maxWinObj[i];
    //     }
    //     // Показываем максимыльно возможный выигрыш, если не залочен счетчик
    //     gameObj.mainFLGAccount.maxWin(maxWin);
    //
    //     maxWinObj = null, maxWin = null, k = null;
    // };

    // Собираем массив объектов
    this.getFortuneObjectsByGrid = function (tableColor) {
        var ObjArray = [];
        for (var i in gameObj.mainGrid.pressedZones) {
            if ((tableColor == false) || (tableColor && i.indexOf(tableColor) != -1)) {
                ObjArray.push({
                    // Номер комбинации
                    comb: gameObj.mainGrid.pressedZones[i].servN,
                    // Коэфициент
                    coef: gameObj.mainGrid.pressedZones[i].coef,
                    // Сумма ставки
                    summ: parseFloat(gameObj.mainGrid.pressedZones[i].bet),
                    name: gameObj.mainGrid.pressedZones[i].zone.name,
                });
            }
        }
        // console.log(tableColor, ObjArray);
        return ObjArray;
    };

    //Возвращает сумму всех ставок
    this.getTotalSumByGrid = function () {
        var totalSum = 0;
        for (var i in gameObj.mainGrid.pressedZones) {
            totalSum += +parseFloat(gameObj.mainGrid.pressedZones[i].bet).toFixed(10);
        }
        return totalSum;

    };

    //Проверяет разрешена ли ставка (общая ставка стола не привышает максимум стола и ставка на зоне не превышает максимальную)
    this.isAllowBet = function (incBetObj, betValueAfter, silenceObj) {
        if (parseFloat(betValueAfter) > maxValServer) {
            // Если передан объект тихой обработки исключений
            if (silenceObj) {
                silenceObj.betErrorCount++;
                if (!silenceObj.betErrorFunc) {
                    silenceObj.betErrorFunc = function () {
                        gameObj.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet);
                    }
                }
            } else {
                // Показываем сообщение о достижении предела и выходим
                gameObj.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBet);
            }
            return false;
        }
        if (selfLocal.getTotalSumByGrid() + parseFloat(incBetObj.summ) > clientInfoGlobal['cfstolmax'] / 100) {
            // Показываем сообщение о достижении предела и выходим
            gameObj.mainRenderer.logService.log(mainLocalizationTable.exceedMaxBetGame);
            return false;
        }
        return true;
    };

    var betTimeoutId = 0;
    var animateResultTimeoutId = 0;
    var animateWinTimeoutId = 0;
    var sendBetsTimeoutId = 0;
    var winPlayers;
    var winColor;
    var winSuite;
    var winComb;
    var dkRiver;
    var winStateTime;
    var editionResult;

    // Начало игры
    var startGameFunc = function (gmSt) {
        // Запускаем таймеры, устанавливаем настройки игры
        function setTimerUI(progress) {
            if (!gameObj.mainGameManager) {
                return;
            }

            // Обновляем зел. прямоугольник в соответсвии с прогрессом
            timerRect.children[1].mask.clear();
            timerRect.children[1].mask.beginFill();
            timerRect.children[1].mask.drawRoundedRect(3, 3, progress * 386, 34, 9);
            timerRect.children[1].mask.endFill;

            // Обновляем подпись времени верха и низа
            timerRect.children[1].children[0].children[0].text = mainFLGTimer.getTimerText();
            timerRect.children[0].children[0].text = mainFLGTimer.getTimerText();

            gameObj.mainRenderer.renderManager.needUpdateRender = true;
        }

        function startBetTime(gmState) {
            if (!gameObj.mainGameManager) {
                return;
            }

            // Перекашиваем полоску в зелёный
            timerRect.children[1].clear();
            timerRect.children[1].beginFill(0x00a651);
            timerRect.children[1].drawRoundedRect(3, 3, 386, 34, 9);
            timerRect.children[1].endFill;

            // Разблокируем кнопки и интерактивные зоны
            for (var i in PokerObjectsArr) {
                gameObj.mainUIManager.setInteraction(true, i);
            }

            mainFLGTimer.start({
                    minutes: 0,
                    seconds: gmState.t2 - gmState[gameObj.gameConfig[gameObj.configType].serverResp].t1
                }, {
                    minutes: 0,
                    seconds: gameObj.gameConfig[gameObj.configType]['tirTimeSt' + gmState[gameObj.gameConfig[gameObj.configType].serverResp].st],
                }, setTimerUI,
                function () {

                    // Блокируем кнопки и интерактивные зоны
                    for (var i in PokerObjectsArr) {
                        gameObj.mainUIManager.setInteraction(false, i);
                    }

                    // Удаляем все текущие ставки
                    gameObj.mainGrid.removeCurrentBets(false);

                    // Максимальный выигрыш обнуляем
                    gameObj.mainFLGAccount.maxWin(0);

                    mainFortuneBetManager.clearGridStates();

                    // Перекашиваем полоску в красный
                    timerRect.children[1].clear();
                    timerRect.children[1].beginFill(0xbf372d);
                    timerRect.children[1].drawRoundedRect(3, 3, 386, 34, 9);
                    timerRect.children[1].endFill;

                }, 5, startGameFunc);

            switch (gmState[gameObj.gameConfig[gameObj.configType].serverResp].st) {
                case 12: //PRE-FLOP
                    gameObj.mainFLGAccount.setWinTextVisible(true);
                    // Удаляем все ставки, сделанные в прошлом тираже
                    gameObj.mainGrid.removeSelectedBets();
                    gameObj.mainGrid.removeCurrentBets(false);
                    // Создаём новый тираж
                    mainEditions.addEdition(gmState[gameObj.gameConfig[gameObj.configType].serverResp]['tr']);
                    // Рисуем более детелизированую историю тиражей
                    mainEditions.drawDetailEditionHistoryFunc(mainEditions.betsTable(), mainEditions.editions[gameObj.configType].length - 1);

                    // Меняем текст раунда
                    gameObj.mainRenderer.stage.getChildByName('roundText').children[0].text = '#' + gmState[gameObj.gameConfig[gameObj.configType].serverResp]['tr'];
                    // Меняем текст состояния игры
                    hoverEnterAnimationFunc(tabs['game'].container.getChildByName('roundline').getChildByName('highlightFlop'), 'highlightFlop', undefined, 1);
                    // Рисуем карты и коэфициенты на столах
                    for (var i in PokerObjectsArr) {
                        gameObj.mainGrid.drawTableCards(gmState[gameObj.gameConfig[i].serverResp].p, i, flipAnimationFunc);
                        if (gmState[gameObj.gameConfig[i].serverResp].dk) {
                            gameObj.mainGrid.drawZonesCoefs(gmState[gameObj.gameConfig[i].serverResp].dk.split(' '), gmState[gameObj.gameConfig[i].serverResp].p, i);
                        }
                    }
                    break;
                case 13: //FLOP
                    hoverLeaveAnimationFunc(tabs['game'].container.getChildByName('roundline').getChildByName('highlightFlop'), 'highlightFlop');
                    hoverEnterAnimationFunc(tabs['game'].container.getChildByName('roundline').getChildByName('highlightTurn'), 'highlightTurn', undefined, 1);
                    for (var i in PokerObjectsArr) {
                        if (gmState[gameObj.gameConfig[i].serverResp].d) {
                            gameObj.mainGrid.drawTableDeeler(deelerInfo, gmState[gameObj.gameConfig[i].serverResp].d.split(' '), i, flipAnimationFunc, hoverEnterAnimationFunc, hoverLeaveAnimationFunc);
                        }
                        if (gmState[gameObj.gameConfig[i].serverResp].dk) {
                            gameObj.mainGrid.drawZonesCoefs(gmState[gameObj.gameConfig[i].serverResp].dk.split(' '), gmState[gameObj.gameConfig[i].serverResp].p, i);
                        }
                    }
                    break;
                case 14: //TURN
                    hoverLeaveAnimationFunc(tabs['game'].container.getChildByName('roundline').getChildByName('highlightTurn'), 'highlightTurn');
                    hoverEnterAnimationFunc(tabs['game'].container.getChildByName('roundline').getChildByName('highlightRiver'), 'highlightRiver', undefined, 1);
                    for (var i in PokerObjectsArr) {
                        if (gmState[gameObj.gameConfig[i].serverResp].d) {
                            gameObj.mainGrid.drawTableDeeler(deelerInfo, gmState[gameObj.gameConfig[i].serverResp].d.split(' '), i, flipAnimationFunc, hoverEnterAnimationFunc, hoverLeaveAnimationFunc);
                        }
                        if (gmState[gameObj.gameConfig[i].serverResp].dk) {
                            gameObj.mainGrid.drawZonesCoefs(gmState[gameObj.gameConfig[i].serverResp].dk.split(' '), gmState[gameObj.gameConfig[i].serverResp].p, i);
                        }
                    }
                    break;
            }
            gameObj.mainRenderer.renderManager.needUpdateRender = true;
            //gameObj.mainGrid.drawTable();
        }

        // Запускаем режим подчсчёта результатов
        function startResultTime() {
            if (!gameObj.mainGameManager) {
                return;
            }

            // Перекрашиваем в чёрный
            timerRect.children[1].clear();
            timerRect.children[1].beginFill(0x000000);
            timerRect.children[1].drawRoundedRect(3, 3, 386, 34, 9);
            timerRect.children[1].endFill;

            // Начинаем анимацию выпадения шаров
            function startAnimateResult() {
                if (gameObj.mainGameManager) {
                    gameObj.mainGameManager.gameStateAsync(animateResult);
                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                }
            }

            // Рисуем шары пока они равны 99
            function animateResult(gmState) {
                if (!gameObj.mainGameManager) {
                    return;
                }

                switch (gmState[gameObj.gameConfig[gameObj.configType].serverResp].st) {
                    case 12:
                        //AFTER PRE-FLOP
                        for (var i in PokerObjectsArr) {
                            gameObj.mainGrid.drawTableDeeler(deelerInfo, gmState[gameObj.gameConfig[i].serverResp].d.split(' '), i, flipAnimationFunc, hoverEnterAnimationFunc, hoverLeaveAnimationFunc);
                        }
                        gameObj.mainRenderer.renderManager.needUpdateRender = true;
                        betTimeoutId = setTimeout(startGameFunc, 300);
                        break;
                    case 13:
                        //AFTER FLOP
                        for (var i in PokerObjectsArr) {
                            gameObj.mainGrid.drawTableDeeler(deelerInfo, gmState[gameObj.gameConfig[i].serverResp].d.split(' '), i, flipAnimationFunc, hoverEnterAnimationFunc, hoverLeaveAnimationFunc);
                        }
                        gameObj.mainRenderer.renderManager.needUpdateRender = true;
                        betTimeoutId = setTimeout(startGameFunc, 300);
                        break;
                    case 14:
                        betTimeoutId = setTimeout(startGameFunc, 300);
                        break;
                    case 5: //RIVER, winner
                        hoverLeaveAnimationFunc(tabs['game'].container.getChildByName('roundline').getChildByName('highlightRiver'), 'highlightRiver');
                        for (var i in PokerObjectsArr) {
                            if (gmState[gameObj.gameConfig[i].serverResp].d) {
                                gameObj.mainGrid.drawTableDeeler(deelerInfo, gmState[gameObj.gameConfig[i].serverResp].d.split(' '), i, flipAnimationFunc, hoverEnterAnimationFunc, hoverLeaveAnimationFunc);
                            }
                        }
                        gameObj.mainRenderer.renderManager.needUpdateRender = true;

                        if (gmState['history_stol_' + gameObj.gameConfig[gameObj.configType].tableNum][0].tir == gmState[gameObj.gameConfig[gameObj.configType].serverResp]['tr']) {
                            if (!gameObj.mainFLGAccount) {
                                return;
                            }

                            for (i in PokerObjectsArr) {
                                // Показываем выигрышную рамку на столе
                                gameObj.mainGrid[i + 'GridContainerTable'].getChildByName('win_table').children[0].text = combinationsArr[(8 - gmState[gameObj.gameConfig[i].serverResp].w)].text + ' - ' + combinationsArr[(8 - gmState[gameObj.gameConfig[i].serverResp].w)].info;
                                hoverEnterAnimationFunc(gameObj.mainGrid[i + 'GridContainerTable'].getChildByName('win_table'), i + 'win_table', undefined, 1);

                                // Показываем выигрышную комбинацию на гриде с комбинациями
                                winComb = parseInt(gmState['history_stol_' + gameObj.gameConfig[i].tableNum][0].comb.trim());
                                hoverEnterAnimationFunc(gameObj.mainGrid[i + 'GridContainerCombinations'].getChildByName((9 - winComb) + i + 'GridContainerCombinations').getChildByName('zoneBg').getChildByName('winSprite'), ((9 - winComb) + i + 'GridContainerCombinationsWin'), undefined, 1);
                                gameObj.mainGrid[i + 'GridContainerCombinations'].getChildByName((9 - winComb) + i + 'GridContainerCombinations').getChildByName('zoneBg').getChildByName('zoneCoef').style = combinationsCoefWinStyle;

                                // Показываем игроков которые выйграли
                                winPlayers = gmState['history_stol_' + gameObj.gameConfig[i].tableNum][0].wpl.trim().split(' ');
                                for (var j = 0; j < winPlayers.length; j++) {
                                    hoverEnterAnimationFunc(gameObj.mainGrid[i + 'GridContainerTable'].getChildByName(winPlayers[j].substr(-1) + i + 'GridContainerTable').getChildByName('zoneBg').getChildByName('winSprite'), (winPlayers[j].substr(-1) + i + 'GridContainerTableWin'), undefined, 1);
                                    gameObj.mainGrid[i + 'GridContainerTable'].getChildByName(winPlayers[j].substr(-1) + i + 'GridContainerTable').getChildByName('zoneBg').getChildByName('zoneCoef').style = tableCoefWinStyle;
                                }
                                // Показываем выйгрышную масть
                                winSuite = parseInt(gmState['history_stol_' + gameObj.gameConfig[i].tableNum][0].mast.trim());
                                hoverEnterAnimationFunc(gameObj.mainGrid[i + 'GridContainerSuites'].getChildByName((winSuite - 8) + i + 'GridContainerSuites').getChildByName('zoneBg').getChildByName('winSprite'), ((winSuite - 8) + i + 'GridContainerSuitesWin'), undefined, 1);
                                gameObj.mainGrid[i + 'GridContainerSuites'].getChildByName((winSuite - 8) + i + 'GridContainerSuites').getChildByName('zoneBg').getChildByName('zoneCoef').style = combinationsCoefWinStyle;

                                // Показываем выйгрышный цвет
                                winColor = parseInt(gmState['history_stol_' + gameObj.gameConfig[i].tableNum][0].col.trim());// 14-red, 13-black
                                hoverEnterAnimationFunc(gameObj.mainGrid[i + 'GridContainerSuites'].getChildByName(((winColor == 13) ? 5 : 6) + i + 'GridContainerSuites').getChildByName('zoneBg').getChildByName('winSprite'), (((winColor == 14) ? 5 : 6) + i + 'GridContainerSuitesWin'), undefined, 1);
                                gameObj.mainGrid[i + 'GridContainerSuites'].getChildByName(((winColor == 13) ? 5 : 6) + i + 'GridContainerSuites').getChildByName('zoneBg').getChildByName('zoneCoef').style = combinationsCoefWinStyle;

                                // Меняем коэффициенты на надписи LOST или WON
                                dkRiver = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                dkRiver[winColor] = 1;
                                dkRiver[winSuite] = 1;
                                dkRiver[winComb] = 1;
                                gameObj.mainGrid.drawZonesCoefs(dkRiver, gmState[gameObj.gameConfig[i].serverResp].p, i, true);

                                gameObj.mainRenderer.renderManager.needUpdateRender = true;
                            }

                            // Подсчитываем выигрышные ставки
                            editionResult = {red: undefined, green: undefined, blue: undefined};
                            for (var i in PokerObjectsArr) {
                                editionResult[i] = {
                                    combination: gmState[gameObj.gameConfig[i].editionsHistory][0].comb,
                                    suite: gmState[gameObj.gameConfig[i].editionsHistory][0].mast,
                                    color: gmState[gameObj.gameConfig[i].editionsHistory][0].col,
                                    winners: gmState[gameObj.gameConfig[i].editionsHistory][0].wpl.trim().split(' '),
                                };
                            }
                            // mainEditions.calculateWinBets(editionResult);
                            // // Подсвечиваем выйгрышные зоны, на которых были ставки
                            // mainEditions.highlightWinBets(1);


                            // Удаляем все ставки, сделанные в прошлом тираже
                            gameObj.mainGrid.removeSelectedBets();
                            gameObj.mainGrid.removeCurrentBets(false);

                            winStateTime = (gameObj.gameConfig[gameObj.configType]['tirTimeSt5'] - gmState.t2 + gmState[gameObj.gameConfig[gameObj.configType].serverResp].t1) * 1000;
                            winStateTime = (winStateTime > 3000) ? winStateTime : 3000;

                            animateWinTimeoutId = setTimeout(function () {
                                for (var i in PokerObjectsArr) {
                                    // Скрываем выйгрышную рамку
                                    hoverLeaveAnimationFunc(gameObj.mainGrid[i + 'GridContainerTable'].getChildByName('win_table'), i + 'win_table');

                                    // Скрываем выйгрышную комбинацию
                                    winComb = parseInt(gmState['history_stol_' + gameObj.gameConfig[i].tableNum][0].comb.trim());
                                    hoverLeaveAnimationFunc(gameObj.mainGrid[i + 'GridContainerCombinations'].getChildByName((9 - winComb) + i + 'GridContainerCombinations').getChildByName('zoneBg').getChildByName('winSprite'), ((9 - winComb) + i + 'GridContainerCombinationsWin'));
                                    gameObj.mainGrid[i + 'GridContainerCombinations'].getChildByName((9 - winComb) + i + 'GridContainerCombinations').getChildByName('zoneBg').getChildByName('zoneCoef').style = combinationsCoefStyle;

                                    // Скрываем игроков, которые выйграли
                                    winPlayers = gmState['history_stol_' + gameObj.gameConfig[i].tableNum][0].wpl.trim().split(' ');
                                    for (var j = 0; j < winPlayers.length; j++) {
                                        hoverLeaveAnimationFunc(gameObj.mainGrid[i + 'GridContainerTable'].getChildByName(winPlayers[j].substr(-1) + i + 'GridContainerTable').getChildByName('zoneBg').getChildByName('winSprite'), (winPlayers[j].substr(-1) + i + 'GridContainerTableWin'));
                                        gameObj.mainGrid[i + 'GridContainerTable'].getChildByName(winPlayers[j].substr(-1) + i + 'GridContainerTable').getChildByName('zoneBg').getChildByName('zoneCoef').style = tableCoefStyle;
                                    }

                                    // Скрываем выйгрышную масть
                                    winSuite = parseInt(gmState['history_stol_' + gameObj.gameConfig[i].tableNum][0].mast.trim());
                                    hoverLeaveAnimationFunc(gameObj.mainGrid[i + 'GridContainerSuites'].getChildByName((winSuite - 8) + i + 'GridContainerSuites').getChildByName('zoneBg').getChildByName('winSprite'), ((parseInt(winSuite) - 8) + i + 'GridContainerSuitesWin'));
                                    gameObj.mainGrid[i + 'GridContainerSuites'].getChildByName((winSuite - 8) + i + 'GridContainerSuites').getChildByName('zoneBg').getChildByName('zoneCoef').style = combinationsCoefStyle;

                                    // Скрываем выйгрышный цвет
                                    winColor = gmState['history_stol_' + gameObj.gameConfig[i].tableNum][0].col.trim();
                                    hoverLeaveAnimationFunc(gameObj.mainGrid[i + 'GridContainerSuites'].getChildByName(((winColor == 13) ? 5 : 6) + i + 'GridContainerSuites').getChildByName('zoneBg').getChildByName('winSprite'), (((winColor == 14) ? 5 : 6) + i + 'GridContainerSuitesWin'));
                                    gameObj.mainGrid[i + 'GridContainerSuites'].getChildByName(((winColor == 13) ? 5 : 6) + i + 'GridContainerSuites').getChildByName('zoneBg').getChildByName('zoneCoef').style = combinationsCoefStyle;

                                    // Показываем анимацию смены карт
                                    gameObj.mainGrid.drawTableCards(gameObj.gameConfig[i].emptyP, i, flipAnimationFunc);
                                    gameObj.mainGrid.drawZonesCoefs([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], gameObj.gameConfig[i].emptyP, i);
                                    gameObj.mainGrid.drawTableDeeler(deelerInfo, [55, 55, 55, 55, 55], i, flipAnimationFunc, hoverEnterAnimationFunc, hoverLeaveAnimationFunc);

                                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                                }
                                // Убираем подсветку у выйгрышных зон, на которых были ставки
                                mainEditions.highlightWinBets(0);
                            }, (winStateTime - 3000));

                            // Считаем результат
                            gameObj.mainFLGAccount.calculateWin(mainEditions.getActedOutEdition('blue').betsHistory.bets.concat(mainEditions.getActedOutEdition('green').betsHistory.bets.concat(mainEditions.getActedOutEdition('red').betsHistory.bets)), gameObj.gameConfig.appName,
                                // Коллбэк для выделения выигрышных комбинаций
                                function (winBetsArr) {
                                    // console.log('activeGameColor', activeGameColor);

                                    // Обновляем данные джекпота чтобы проверить выигрышь
                                    // gmState.jp1sw = 1;
                                    // gmState.winjp1 = 100000;
                                    // gmState.jp1ll = [{lgn: '618883'}];
                                    Jackpot.updateJackpotData(gmState);
                                    // Рисуем выигрыш если есть
                                    Jackpot.drawJackpotWin(20000, {
                                        x: 420,
                                        y: 860
                                    }, gameObj.mainRenderer.resourceLoader.resources['JP_' + activeGameColor.toUpperCase()].texture);

                                    // Закрываем тираж
                                    mainEditions.cancelLastEdition(editionResult);
                                    mainEditions.calculateWinBets(editionResult);
                                    // Подсвечиваем выйгрышные зоны, на которых были ставки
                                    mainEditions.highlightWinBets(1);
                                    // Рисуем более детелизированую историю тиражей
                                    mainEditions.drawDetailEditionHistoryFunc(mainEditions.betsTable(), mainEditions.editions[gameObj.configType].length - 1);

                                    gameObj.mainFLGAccount.winToBalanceAnimation(((winStateTime > 8000) ? winStateTime - 8000 : winStateTime), 2000, {
                                            x: 1125,
                                            y: 615
                                        }, gameObj.mainRenderer.resourceLoader.resources['WIN_' + activeGameColor.toUpperCase()].texture,
                                        {font: 'bold 70px Arial', fill: '#bcbcbc'}, Jackpot.jpWin());
                                }, gameObj.gameConfig);

                            gameObj.mainFLGAccount.setWinTextVisible(false);
                            gameObj.mainFLGAccount.totalBet(0);

                            betTimeoutId = setTimeout(startGameFunc, winStateTime);
                        } else {
                            animateResultTimeoutId = setTimeout(startGameFunc, 300);
                        }
                        break;
                }
            }

            startAnimateResult();
        }

        if (gameObj.mainGameManager == undefined) {
            return;
        }
        // Если идёт розыгрыш на сервере, то запускаем время розыгрыша
        // внутри эти режимы друг на друга замыкаются
        function gamePhase(gmState) {
            if (gmState[gameObj.gameConfig[gameObj.configType].serverResp]['bt'] == 1) {
                startResultTime();
            } else {
                startBetTime(gmState);
            }
        }

        if (gmSt) {
            gamePhase(gmSt);
        } else {
            gameObj.mainGameManager.gameStateAsync(gamePhase);
        }
    }

    // Менеджер которые сохраняет ставки в локал сторедж и управляет отменами и повторами ставок
    function fortuneBetManager(gameObject) {
        this.destroy = function () {
            for (var i = 0; i < gridStates.length; i++) {
                for (var j in gridStates[i]) {
                    // возвращаем баланс
                    if ((gridStates.length - 1 == i) && gridStates[i][j].summ) {
                        gameObject.mainFLGAccount.totalBet(-gridStates[i][j].summ);
                    }
                    gridStates[i][j] = null;
                }
                gridStates[i] = null;
            }
            gridStates = null;
            lastRoundGridState = null;

            //getUniqueNameUserPrefixFunc = null;
            selectGridByStatesFunc = null;

            // Удаляем все внешние свойства и ф-ии
            for (var i in selfLocal) {
                selfLocal[i] = null;
            }
            selfLocal = null;
        };

        // Указатель на самого себя
        var selfLocal = this;

        // массив состояний стола
        var gridStates = []; //{red: [], green: [], blue: []};
        this.states = function () {
            return gridStates;
        };
        // Последнее состояние предыдущего тиража {round: , stateArr: []}
        var lastRoundGridState = [];

        // Сохраняем состояния стола в локал сторедж
        this.saveGridStateInStorage = function () {
            //    localStorage.setItem('curUser', JSON.stringify({
            //        hall: clientInfoGlobal.hall,
            //        nick: clientInfoGlobal.nick
            //    }));
            //    if (gridStates) {
            //        localStorage.setItem('gridStates' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType, JSON.stringify(gridStates));
            //    }
            //    if (lastRoundGridState) {
            //        localStorage.setItem('lastRoundGridState' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType, JSON.stringify(lastRoundGridState));
            //    }
        };
        // Востанавливаем состояния стола из локал сторедж
        this.loadGridStateFromStorage = function () {
            //    if (localStorage.getItem('curUser')) {
            //        var curUser = JSON.parse(localStorage.getItem('curUser'));
            //        // Если не тот пользователь то выходим
            //        if ((curUser.hall!=clientInfoGlobal.hall) && (curUser.nick!=clientInfoGlobal.nick)) { return; }
            //    }
            //    if (localStorage.getItem('gridStates' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType)) {
            //        gridStates = JSON.parse(localStorage.getItem('gridStates' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType));
            //    }
            //    if (localStorage.getItem('lastRoundGridState' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType)) {
            //        lastRoundGridState = JSON.parse(localStorage.getItem('lastRoundGridState' + gameObj.gameConfig.gameKind + gameObj.gameConfig.gameType));
            //    }
        };

        // Добавить состояние
        this.addGridState = function () {
            var arr = gameObject.mainUIManager.getFortuneObjectsByGrid(false);
            // Если пытаемся писать пустоту несклько раз
            if (gridStates.length && !arr.length && !gridStates[gridStates.length - 1].length) {
                return;
            }
            gridStates.push(arr);
            selfLocal.saveGridStateInStorage();
        };
        // Удвоить текущие ставки
        this.doubleCurrentBets = function () {
            var silenceErrorObj = {betErrorCount: 0, betErrorFunc: null};
            var totPressCount = 0;
            for (var i in gameObj.mainGrid.pressedZones) {
                // if ((i.indexOf(gameObj.mainGrid.activeTable().name) != -1) || (i.indexOf(gameObj.mainGrid.activeCombinationsGrid().name) != -1) || (i.indexOf(gameObj.mainGrid.activeSuitesGrid().name) != -1)) {
                totPressCount++;
                // Проверяем возможность поставить ставку на стол
                if (!gameObj.mainUIManager.isAllowBet({
                    comb: gameObj.mainGrid.pressedZones[i]['servN'],
                    coef: gameObj.mainGrid.pressedZones[i]['coef'],
                    summ: gameObj.mainGrid.pressedZones[i]['bet']
                },
                    gameObj.mainGrid.pressedZones[i]['bet'] * 2, silenceErrorObj)) {
                    continue;
                }
                // Увеличиваем общую ставку, если можем
                // if (gameObj.mainFLGAccount.totalBet(parseFloat(gameObj.mainGrid.pressedZones[i]['bet'])) == -1) {
                //     return;
                // };

                // Показываем возможный выигрыш на зонах
                //gameObj.mainUIManager.defineZonesForBet(gameObj.mainGrid.pressedZones[i]['zone'], 0.35,
                //    showPossibleWinFunc, parseInt(gameObj.mainGrid.pressedZones[i]['bet'])*parseInt(gameObj.mainGrid.pressedZones[i]['coef']));

                gameObject.mainUIManager.createSmallChip(gameObj.mainGrid.pressedZones[i]['zone'],
                    gameObj.mainGrid.pressedZones[i]['bet']);
                gameObj.mainGrid.pressedZones[i]['bet'] *= 2;
                // }
            }

            // Если в режиме тишины были ошибки выводим
            if (silenceErrorObj.betErrorCount > 0) {
                silenceErrorObj.betErrorFunc();
            }
            if (silenceErrorObj.betErrorCount != totPressCount) {
                selfLocal.addGridState();
            }
            silenceErrorObj.betErrorCount = null;
            silenceErrorObj.betErrorFunc = null;
            silenceErrorObj = null;
        };
        // Отменить последнее состояние
        this.undoGridState = function () {
            if (!gridStates.length) {
                return;
            }
            // удаляем с конца
            gridStates.pop();
            // Сохраняем состояние и заводим на стол ставки
            selfLocal.saveGridStateInStorage();
            gameObject.mainGrid.removeCurrentBets(false);
            // Сбрасывае тотал бет общую ставку
            // gameObj.mainFLGAccount.totalBet(-gameObj.mainFLGAccount.totalBet());
            //gameObject.mainFLGAccount.totalBet(0);

            selectGridByStatesFunc();
        };
        // Отчистить состояния
        this.clearGridStates = function () {
            // Очищаем последние поставл ставки, если они есть
            if (lastRoundGridState && lastRoundGridState.length) {
                for (var j in lastRoundGridState) {
                    lastRoundGridState[j] = null;
                }
                lastRoundGridState = [];
            }
            // Если поле было не пустое то выходим
            if (gridStates && gridStates.length) {
                // Сохраняем последний элемент остальное чистим
                lastRoundGridState = gridStates[gridStates.length - 1].slice();

                for (var i = 0; i < gridStates.length; i++) {
                    for (var j in gridStates[i]) {
                        gridStates[i][j] = null;
                    }
                    gridStates[i] = null;
                }
                gridStates = [];
            }

            selfLocal.saveGridStateInStorage();
        };
        // Повторяем состояния предыдущее на стол
        //this.repeatLastRoundGridState = function () {
        //    if (!lastRoundGridState || !lastRoundGridState.length) { return; }
        //
        //    gridStates.push(lastRoundGridState.slice());
        //    selfLocal.saveGridStateInStorage();
        //    selectGridByStatesFunc();
        //};
        // Показываем выигрышные комбинации
        //this.showWinCombinations = function (fortuneObjArr) {
        //    gameObject.mainGrid.removeCurrentBets();
        //    selectGridByStatesFunc(fortuneObjArr, true);
        //};

        // Ф-ия выставления состояний на стол
        var selectGridByStatesFunc = function (pressObjArray, needShowWin) {
            var objArrLocal = (pressObjArray) ? pressObjArray : gridStates[gridStates.length - 1];
            var isWinPressed = (pressObjArray);
            var showWin = (needShowWin != undefined) ? needShowWin : false;
            var silenceErrorObj = {betErrorCount: 0, betErrorFunc: null};

            if (!objArrLocal || !objArrLocal.length) {
                return;
            }

            gameObject.mainGrid.pressZonesByObjectArr(objArrLocal,
                function (zoneObj) {
                    // Проверяем возможность поставить ставку на стол
                    if (!gameObject.mainUIManager.isAllowBet(
                        {
                            comb: zoneObj.zone.name,
                            coef: zoneObj.coef,
                            summ: zoneObj.bet
                        },
                        (gameObject.mainGrid.pressedZones[zoneObj.zone.name]) ? gameObject.mainGrid.pressedZones[zoneObj.zone.name]['bet'] + zoneObj.bet
                            : zoneObj.bet, silenceErrorObj)) {
                        return;
                    }
                    // Если не в режиме розыгрыша, то высчитываем totalBet
                    if (!isWinPressed && !showWin) {
                        // Увеличиваем общую ставку, если можем
                        // if (parseFloat(zoneObj.bet) > 0 || parseFloat(zoneObj.bet) < 0) {
                        //     if (gameObject.mainFLGAccount.totalBet(parseFloat(zoneObj.bet)) == -1) {
                        //         return;
                        //     }
                        // }

                        var afterBetValue = gameObject.mainUIManager.createSmallChip(zoneObj.zone, zoneObj.bet);
                        if (zoneObj.zone.selected) {
                            gameObject.mainGrid.pressedZones[zoneObj.zone.name]['bet'] = afterBetValue; //parseInt(gameObject.mainGrid[zoneObj.zone.name.substr(1)].getChildByName(zoneObj.zone.name).getChildByName('smallChipText').text);
                            // Если зона еще не выбрана, то выбираем её и рисуем фишку
                        } else {
                            zoneObj.zone.selected = true;

                            // Добавляем зону в массив выбранных зон
                            gameObject.mainGrid.pressedZones[zoneObj.zone.name] = {
                                zone: gameObject.mainGrid[zoneObj.zone.name.substr(1)].getChildByName(zoneObj.zone.name),
                                bet: zoneObj.bet,
                                coef: zoneObj.coef,
                                servN: zoneObj.servN
                            };
                        }
                        // console.log('after restore grid state',gameObject.mainGrid.pressedZones);
                        afterBetValue = null;
                        // Показываем возможный выигрыш на зонах
                        //gameObject.mainUIManager.defineZonesForBet(zoneObj.zone, 0.35, gameObject.mainUIManager.showPossibleWin, parseInt(zoneObj.bet)*parseInt(gameObject.mainGrid.pressedZones[zoneObj.zone.name]['coef']));
                    } else if (isWinPressed && pressObjArray.length) {
                        // Если не выигр зона то рисуем фишку
                        if (parseInt(objArrLocal[0].winBet) != parseInt(zoneObj.zone.name)) {
                            gameObject.mainUIManager.createSmallChip(zoneObj.zone, zoneObj.bet);
                        }
                        gameObject.mainGrid.pressedZones[zoneObj.zone.name] = {
                            zone: gameObject.mainGrid[zoneObj.zone.name.substr(1)].getChildByName(zoneObj.zone.name),
                            bet: zoneObj.bet,
                            coef: zoneObj.coef,
                            servN: zoneObj.servN
                        };
                        //gameObject.mainUIManager.defineZonesForBet(zoneObj.zone, 0.35, gameObject.mainUIManager.showPossibleWin, parseInt(zoneObj.bet)*parseInt(gameObject.mainGrid.pressedZones[zoneObj.zone.name]['coef']), false);

                        //gameObject.mainGrid.uiGridContainer.getChildByName(parseInt(objArrLocal[0].winBet)).getChildByName('possibleWinText').visible = true;
                        //gameObject.mainGrid.uiGridContainer.getChildByName(parseInt(objArrLocal[0].winBet)).getChildByName('possibleWinInfo').visible = true;
                    }
                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                }
            );
            // Имитируем mouseout для всех зон
            //gameObject.mainGrid.zonesOut(hoverLeaveAnimationFunc);

            // Если в режиме тишины были ошибки выводим
            if (silenceErrorObj.betErrorCount > 0) {
                silenceErrorObj.betErrorFunc();
            }
            silenceErrorObj.betErrorCount = null;
            silenceErrorObj.betErrorFunc = null;
            silenceErrorObj = null;
        };
        this.selectGridByStates = selectGridByStatesFunc;

        // Делаем загрузку как всё объявили
        //selfLocal.loadGridStateFromStorage();
    }

    // Тиражи (раунды)
    function editions(lastEditions) {

        // Деструктор
        this.destroy = function () {
            for (var i in editionsLocal) {
                for (var j = 0; j < editionsLocal[i].length; j++) {
                    editionsLocal[i][j].round = null;
                    editionsLocal[i][j].editionResult = null;
                    if (editionsLocal[i][j].betsHistory.destroy) {
                        editionsLocal[i][j].betsHistory.destroy();
                    }
                    editionsLocal[i][j] = null;
                }
                editionsLocal[i] = null;
            }
            editionsLocal = null;
            currentEditionIndex = null;

            RoundText = null;
            historyTableLocal = null;
            betsTableLocal = null;
            //editionsHistoryContainer = null;
            betsHeaderContainer = null;

            // ballScale = null;

            detailBetContainer.destroy();
            detailBetContainer = null;

            setCurrentEditionIndexFunc = null;
            drawEditionHeaderFunc = null;
            drawBetsHeaderFunc = null;
            drawEditionHistoryFunc = null;

            // Удаляем все внешние свойства и ф-ии
            for (var i in selfLocal) {
                selfLocal[i] = null;
            }
            selfLocal = null;
        };

        // Указатель на самого себя
        var selfLocal = this;

        // Тиражи
        var editionsLocal = {red: [], green: [], blue: []};
        var currentEditionIndex;
        this.editions = editionsLocal;
        // UI переменные
        var RoundText, historyTableLocal, betsTableLocal;
        // this.historyTable = function () {return historyTableLocal};

        this.betsTable = function () {
            return betsTableLocal;
        }

        // this.setHistoryVisibility = function(value) {
        //     historyTableLocal.visible = value;
        // };
        //
        // this.setDetailedHistoryVisibility = function(value) {
        //     betsTableLocal.visible = value;
        // };

        // Текущий разыгрываемый тираж
        this.getActedOutEdition = function (i) {
            for (var j = editionsLocal[i].length - 1; j >= 0; j--) {
                if (editionsLocal[i][j].editionResult == undefined) {
                    setCurrentEditionIndexFunc(j);
                    return editionsLocal[i][j];
                }
            }
            // Если не чего не нашли возвращаем последний
            setCurrentEditionIndexFunc(editionsLocal[i].length - 1);
            return editionsLocal[i][editionsLocal[i].length - 1]
        };

        // Инициализируем историю
        for (var i in lastEditions) {
            for (var j = lastEditions[i].length - 1; j >= 0; j--) {
                editionsLocal[i].push({
                    round: lastEditions[i][j].round,
                    editionResult: {
                        combination: lastEditions[i][j].editionResult.combination,
                        suite: lastEditions[i][j].editionResult.suite,
                        color: lastEditions[i][j].editionResult.color,
                        winners: lastEditions[i][j].editionResult.winners
                    },
                    betsHistory: lastEditions[i][j].betsHistory
                });
                // editionsLocal[i].betsHistory.setRoundResult(editionsLocal[i].editionResult);
            }
        }

        // console.log('init ', editionsLocal);

        // Выставляем текущий тираж
        var setCurrentEditionIndexFunc = function (editionIndex) {
            if ((editionIndex < 0) || (editionIndex >= editionsLocal[gameObj.configType].length)) {
                return
            }

            // Чистим предыдущие ставки
            if (currentEditionIndex != undefined) {
            }

            currentEditionIndex = editionIndex;
            // Номер раунда
            if (RoundText != undefined) {
                RoundText.children[0].text = '#' + editionsLocal[gameObj.configType][currentEditionIndex].round;
            }

            // изменения в истории
            if (historyTableLocal && historyTableLocal.children.length > 0) {
                drawEditionHistoryFunc();
            }

            // рисуем ставки
            // if (historyTableLocal!=undefined) {
            // }
            gameObj.mainRenderer.renderManager.needUpdateRender = true;
        };

        setCurrentEditionIndexFunc(editionsLocal[gameObj.configType].length - 1);
        // console.log('current', editionsLocal[gameObj.configType][editionsLocal[gameObj.configType].length-1].round);

        // Отрисовать тиражи, ставки и их историю
        this.drawEditions = function () {
            // Номер тиража
            RoundText = gameObj.mainRenderer.createButton(undefined, 123, 75, undefined, {
                text: '#' + editionsLocal[gameObj.configType][currentEditionIndex].round,
                align: 'center',
                style: {font: '26px Arial', fill: '#e8a023'}
            });
            RoundText.name = 'roundText';
            // История ставок и тиражей
            // История ставок
            betsTableLocal = new PIXI.Container();
            betsTableLocal.position.set(-150, -480);
            // gameObj.mainRenderer.stage.addChild(betsTableLocal);
            // betsTableLocal.visible = false;
            tabs['bets'].container.addChild(betsTableLocal);
            // История тиражей
            historyTableLocal = new PIXI.Container();
            historyTableLocal.position.set(0, -597);
            // gameObj.mainRenderer.stage.addChild(historyTableLocal);
            // historyTableLocal.visible = false;
            tabs['info'].container.addChild(historyTableLocal);

            // Назначаем родителя
            for (var i in editionsLocal) {
                for (var j = 0; j < editionsLocal[i].length; j++) {
                    editionsLocal[i][j].betsHistory.parentEditions(selfLocal[i]);
                }
            }

            // История тиражей
            drawEditionHeaderFunc();
            // Рисуем историю тиражей
            drawEditionHistoryFunc();
            // Рисуем детальную историю тиражей
            selfLocal.drawDetailEditionHistoryFunc(selfLocal.betsTable(), editionsLocal[gameObj.configType].length - 1);
        };
        // Рисуем заголовок
        var drawEditionHeaderFunc = function () {
        };
        this.redrawEditionHeader = drawEditionHeaderFunc;

        var betsHeaderContainer = new PIXI.Container();
        var drawBetsHeaderFunc = function () {
        };
        // Отрисовываем ставки
        this.drawBetsHeader = drawBetsHeaderFunc;

        var drawEditionHistoryFunc = function () {

            // Рисуем таблицу истории
            var historyBg = historyTableLocal.getChildByName('historyLine0');
            var suiteSprite;
            var yPos;
            var xPos;
            var historyColumns = [mainLocalizationTable.round, mainLocalizationTable.winners, 'red', 'green', 'blue'];
            var winnersTxt;

            if (!historyBg) {
                // Рисуем заголовки
                xPos = 105;
                for (var j = 0; j < 5; j++) {
                    gameObj.mainRenderer.createButton(historyTableLocal, 480 + xPos, 292, null, {
                        text: (j < 2) ? historyColumns[j] : gameObj.gameConfig[historyColumns[j]].tableNum/*tableInfo[historyColumns[j]].length*/,
                        align: 'center',
                        style: (j < 2) ? {
                            font: 'bold 40px Arial',
                            fill: '#ffffff',
                            align: 'center'
                        } : {
                            font: 'bold 48px Arial',
                            fill: gameObj.gameConfig[historyColumns[j]].numColor,
                            align: 'center'
                        }
                    });
                    xPos += (j < 2) ? 235 : 210;
                }
                yPos = 54 + 7;
                for (var i = 9; i >= 0; i--) {
                    // рисуем строки таблицы
                    historyBg = gameObj.mainRenderer.createButton(historyTableLocal, 480, 266 + yPos, 'tab_history_row_short');
                    // historyBg = new PIXI.Graphics();
                    // historyBg.position.set(480, 140 + yPos);
                    // historyBg.beginFill((i % 2 == 0) ? 0x000000 : 0xFFFFFF, (i == 10) ? 0 : ((i % 2 == 0) ? 0.3 : 0.1));
                    // historyBg.drawRect(0, 0, 1100, 71);
                    // historyBg.endFill;
                    historyBg.name = 'historyLine' + i;
                    // historyTableLocal.addChild(historyBg);

                    // Рисуем столбцы таблицы

                    if (editionsLocal.red[i].editionResult.combination) {
                        // if (combinationsArr[combinationsArr.length-1-editionsLocal.green[i].editionResult.combination] == undefined) {
                        //     continue;
                        // }
                        winnersTxt = editionsLocal.red[i].editionResult.winners.concat(editionsLocal.green[i].editionResult.winners.concat(editionsLocal.blue[i].editionResult.winners));

                        gameObj.mainRenderer.createButton(historyBg, 105, 27, null, {
                            text: editionsLocal[gameObj.configType][i].round,
                            align: 'center',
                            style: {font: 'bold 38px Arial Narrow', fill: '#ffffff', align: 'center'}
                        });
                        gameObj.mainRenderer.createButton(historyBg, 340, 27, null, {
                            text: winnersTxt.join(' '),
                            align: 'center',
                            style: {
                                font: 'bold 38px Arial Narrow',
                                fill: '#ffffff',
                                align: 'center',
                                wordWrap: true,
                                wordWrapWidth: 260,
                                lineHeight: 38
                            }
                        });
                        gameObj.mainRenderer.createButton(historyBg, 540, 27, null, {
                            text: combinationsArr[combinationsArr.length - 1 - editionsLocal.red[i].editionResult.combination].text || '',
                            align: 'center',
                            style: {font: 'bold 40px Arial Narrow', fill: '#ffffff', align: 'center'}
                        });
                        suiteSprite = gameObj.mainRenderer.createButton(historyBg, 610, 27, suitesArr[editionsLocal.red[i].editionResult.suite - 9].texture + '_history');
                        suiteSprite.anchor.set(0.5, 0.5);
                        suiteSprite.scale.set(0.65, 0.65);
                        gameObj.mainRenderer.createButton(historyBg, 750, 27, null, {
                            text: combinationsArr[combinationsArr.length - 1 - editionsLocal.green[i].editionResult.combination].text || '',
                            align: 'center',
                            style: {font: 'bold 40px Arial Narrow', fill: '#ffffff', align: 'center'}
                        });
                        suiteSprite = gameObj.mainRenderer.createButton(historyBg, 820, 27, suitesArr[editionsLocal.green[i].editionResult.suite - 9].texture + '_history');
                        suiteSprite.anchor.set(0.65, 0.65);
                        suiteSprite.scale.set(0.65, 0.65);
                        gameObj.mainRenderer.createButton(historyBg, 960, 27, null, {
                            text: combinationsArr[combinationsArr.length - 1 - editionsLocal.blue[i].editionResult.combination].text || '',
                            align: 'center',
                            style: {font: 'bold 40px Arial Narrow', fill: '#ffffff', align: 'center'}
                        });
                        suiteSprite = gameObj.mainRenderer.createButton(historyBg, 1030, 27, suitesArr[editionsLocal.blue[i].editionResult.suite - 9].texture + '_history');
                        suiteSprite.anchor.set(0.5, 0.5);
                        suiteSprite.scale.set(0.65, 0.65);
                    }

                    yPos += 54 + 7;
                }
                // Рисуем заголовок
                gameObj.mainRenderer.createButton(historyTableLocal, 810, 207, null, {
                    text: mainLocalizationTable.history.toUpperCase(),
                    align: 'center',
                    style: {font: 'bold 48px Arial', fill: '#e8a023', align: 'top-center'}
                });
                // Закрыть историю тиражей
                historyBg = gameObj.mainRenderer.createButton(historyTableLocal, 1543, 207, 'btn_close');
                gameObj.mainRenderer.createButton(historyBg, 0, 0, 'btn_close_selected', undefined,
                    function (icon, event) {
                        gameObj.mainSoundManager.playSound('buttonClick');

                        tabs['game'].button.emit('mousedown');

                        event.stopped = true;
                        gameObj.mainUIManager.clickAnimationFunc(icon, 'btn_close_info');
                        gameObj.mainRenderer.renderManager.needUpdateRender = true;
                    },
                    undefined, undefined,
                    function (icon) {
                        hoverEnterAnimationFunc(icon, 'btn_close_info');
                    },
                    function (icon) {
                        hoverLeaveAnimationFunc(icon, 'btn_close_info');
                    }
                ).alpha = 0;
                historyBg.anchor.set(0.5, 0.5);
                historyBg.children[0].anchor.set(0.5, 0.5);
                historyBg.scale.set(0.7, 0.7);
            } else {
                for (var i = 9; i >= 0; i--) {
                    historyBg = historyTableLocal.getChildByName('historyLine' + i);

                    if (editionsLocal.red[i].editionResult.combination) {
                        // if (combinationsArr[combinationsArr.length-1-editionsLocal.green[i].editionResult.combination] == undefined) {
                        //     continue;
                        // }

                        winnersTxt = editionsLocal.red[i].editionResult.winners.concat(editionsLocal.green[i].editionResult.winners.concat(editionsLocal.blue[i].editionResult.winners));

                        historyBg.children[0].children[0].text = editionsLocal[gameObj.configType][i].round;
                        historyBg.children[1].children[0].text = winnersTxt.join(' ');
                        historyBg.children[2].children[0].text = combinationsArr[combinationsArr.length - 1 - editionsLocal.red[i].editionResult.combination].text || '';
                        historyBg.children[3].texture = gameObj.mainRenderer.resourceLoader.resources[suitesArr[editionsLocal.red[i].editionResult.suite - 9].texture + '_history'].texture;
                        historyBg.children[4].children[0].text = combinationsArr[combinationsArr.length - 1 - editionsLocal.green[i].editionResult.combination].text || '';
                        historyBg.children[5].texture = gameObj.mainRenderer.resourceLoader.resources[suitesArr[editionsLocal.green[i].editionResult.suite - 9].texture + '_history'].texture;
                        historyBg.children[6].children[0].text = combinationsArr[combinationsArr.length - 1 - editionsLocal.blue[i].editionResult.combination].text || '';
                        historyBg.children[7].texture = gameObj.mainRenderer.resourceLoader.resources[suitesArr[editionsLocal.blue[i].editionResult.suite - 9].texture + '_history'].texture;
                    }
                }
            }
            historyBg = null;
            xPos = null;
            yPos = null;
            historyColumns = null;
            winnersTxt = null;
        };

        this.detailEditionsFont = {font: '40px Arial', fill: '#ffffff'};
        this.detailEditionsHeaderFont = {font: '26px Arial', fill: '#b1b1b1'};
        this.detailEditionsRowFont = {font: '33px Arial', fill: '#ffffff'};
        var detailBetContainer;
        // Рисуем более детализированую историю тиражей
        this.drawDetailEditionHistoryFunc = function (parent, editionInd) {
            var notEmpty = parent.children.length != 0;
            parent.editionInd = editionInd;

            if (notEmpty) {
                // Номер тиража
                parent.children[1].children[0].text = editionsLocal[gameObj.configType][editionInd].round; //mainLocalizationTable.round + ': ' +

            } else {
                // Номер тиража
                gameObj.mainRenderer.createButton(parent, 192, 35, 'tab_bg');
                gameObj.mainRenderer.createButton(parent, 960, 90, undefined, {
                    text: editionsLocal[gameObj.configType][editionInd].round,
                    align: 'center',
                    style: {font: 'bold 50px Arial', fill: '#e8a023', align: 'top-center'}
                }); //mainLocalizationTable.round + ': ' +

                // Уменьшить тираж
                var dummySprt = gameObj.mainRenderer.createButton(parent, 773, 90, 'bet_arrow');
                gameObj.mainRenderer.createButton(dummySprt, 0, 0, 'bet_arrow_selected', undefined,
                    function (icon, event) {
                        gameObj.mainSoundManager.playSound('buttonClick');
                        parent.editionInd = limit(parent.editionInd - 1, 0, editionsLocal[gameObj.configType].length - 1);
                        selfLocal.drawDetailEditionHistoryFunc(parent, parent.editionInd);

                        event.stopped = true;
                        gameObj.mainUIManager.clickAnimationFunc(icon, 'bet_arrow_History');
                        gameObj.mainRenderer.renderManager.needUpdateRender = true;
                    },
                    undefined, undefined,
                    function (icon) {
                        hoverEnterAnimationFunc(icon, 'bet_arrow_History');
                    },
                    function (icon) {
                        hoverLeaveAnimationFunc(icon, 'bet_arrow_History');
                    }
                ).alpha = 0;
                dummySprt.scale.set(1.5, 1.5);
                dummySprt.anchor.set(0.5, 0.5);
                dummySprt.children[0].anchor.set(0.5, 0.5);

                // Увеличить тираж
                dummySprt = gameObj.mainRenderer.createButton(parent, 1146, 88, 'bet_arrow');
                gameObj.mainRenderer.createButton(dummySprt, 0, 0, 'bet_arrow_selected', undefined,
                    function (icon, event) {
                        gameObj.mainSoundManager.playSound('buttonClick');
                        parent.editionInd = limit(parent.editionInd + 1, 0, editionsLocal[gameObj.configType].length - 1);
                        selfLocal.drawDetailEditionHistoryFunc(parent, parent.editionInd);

                        event.stopped = true;
                        gameObj.mainUIManager.clickAnimationFunc(icon, 'bet_arrow_History2');
                        gameObj.mainRenderer.renderManager.needUpdateRender = true;
                    },
                    undefined, undefined,
                    function (icon) {
                        hoverEnterAnimationFunc(icon, 'bet_arrow_History2');
                    },
                    function (icon) {
                        hoverLeaveAnimationFunc(icon, 'bet_arrow_History2');
                    }
                ).alpha = 0;
                dummySprt.scale.set(1.5, 1.5);
                dummySprt.anchor.set(0.5, 0.5);
                dummySprt.children[0].anchor.set(0.5, 0.5);
                dummySprt.rotation = Math.PI;

                // Заголовок таблицы
                // Стол
                dummySprt = gameObj.mainRenderer.createButton(parent, 335, 155, undefined, {
                    text: mainLocalizationTable.table,
                    align: 'center',
                    style: {font: 'bold 40px Arial', fill: '#ffffff', align: 'center'}
                });
                dummySprt.anchor.set(0.5, 0.5);
                // Комбинация
                dummySprt = gameObj.mainRenderer.createButton(parent, 585, 155, undefined, {
                    text: mainLocalizationTable.combination,
                    align: 'center',
                    style: {font: 'bold 40px Arial', fill: '#ffffff', align: 'center'}
                });
                dummySprt.anchor.set(0.5, 0.5);
                // Фаза
                dummySprt = gameObj.mainRenderer.createButton(parent, 835, 155, undefined, {
                    text: mainLocalizationTable.phase,
                    align: 'center',
                    style: {font: 'bold 40px Arial', fill: '#ffffff', align: 'center'}
                });
                dummySprt.anchor.set(0.5, 0.5);
                // Сумма
                dummySprt = gameObj.mainRenderer.createButton(parent, 1085, 155, undefined, {
                    text: mainLocalizationTable.sum,
                    align: 'center',
                    style: {font: 'bold 40px Arial', fill: '#ffffff', align: 'center'}
                });
                dummySprt.anchor.set(0.5, 0.5);
                // Коэффициент
                dummySprt = gameObj.mainRenderer.createButton(parent, 1335, 155, undefined, {
                    text: mainLocalizationTable.coef,
                    align: 'center',
                    style: {font: 'bold 40px Arial', fill: '#ffffff', align: 'center'}
                });
                dummySprt.anchor.set(0.5, 0.5);
                // ВЫигрыш
                dummySprt = gameObj.mainRenderer.createButton(parent, 1585, 155, undefined, {
                    text: mainLocalizationTable.win,
                    align: 'center',
                    style: {font: 'bold 40px Arial', fill: '#ffffff', align: 'center'}
                });
                dummySprt.anchor.set(0.5, 0.5);

                // Закрыть историю ставок
                dummySprt = gameObj.mainRenderer.createButton(parent, 1675, 90, 'btn_close');
                gameObj.mainRenderer.createButton(dummySprt, 0, 0, 'btn_close_selected', undefined,
                    function (icon, event) {
                        gameObj.mainSoundManager.playSound('buttonClick');

                        tabs['game'].button.emit('mousedown');

                        event.stopped = true;
                        gameObj.mainUIManager.clickAnimationFunc(icon, 'btn_close_bets');
                        gameObj.mainRenderer.renderManager.needUpdateRender = true;
                    },
                    undefined, undefined,
                    function (icon) {
                        hoverEnterAnimationFunc(icon, 'btn_close_bets');
                    },
                    function (icon) {
                        hoverLeaveAnimationFunc(icon, 'btn_close_bets');
                    }
                ).alpha = 0;
                dummySprt.anchor.set(0.5, 0.5);
                dummySprt.children[0].anchor.set(0.5, 0.5);
                dummySprt.scale.set(0.7, 0.7);

                dummySprt = null;

                // Создаём контейнер в котором будут добавляться строки по истории
                var scrollContainer = new PIXI.Container();
                // Контейнер для показа ставок
                detailBetContainer = new MaskedSprite(gameObj.mainRenderer.createButton(parent, 0, 190), {
                    mask: {
                        x: 210,
                        y: 190,
                        width: 1500,
                        height: 671,
                    },
                    // Пустой объект чтобы включить скролл
                    needScrolling: {
                        container: scrollContainer,
                    }
                }, gameObj.mainRenderer.renderManager);
                detailBetContainer.srcSprite.addChildAt(scrollContainer, 0);
                detailBetContainer.srcSprite.interactive = true;
                detailBetContainer.srcSprite.hitArea = new PIXI.Rectangle(220, 188, 1491, 677);
            }

            scrollContainer = null;
            // Очищаем массив
            // sortEditionResult = [];

            var offsetYRow = 54 + 7, rowCntnr, btCntnr = detailBetContainer.containerForScroll,
                summSprt, winSprt, coefSprt, phaseSprt, tblNumSprt, tblColor, highlightRectSprt, highlightRectText,
                winTmp;
            // Дальше добавляем ставки
            // Чистим историю ставок, чтобы рисовать новый тираж
            for (var i = 0; (btCntnr.getChildByName('row_' + i)); i++) {
                // Получаем контейнер куда будем добавлять инфу по ставкам
                rowCntnr = btCntnr.getChildByName('row_' + i);
                // Если есть то скрываем всех его детей
                if (rowCntnr) {
                    rowCntnr.visible = false;
                    highlightRectSprt = rowCntnr.getChildByName('rect' + i);
                    highlightRectSprt.visible = false;
                    highlightRectSprt.getChildByName('textBet' + i).visible = false;
                    if (rowCntnr.getChildByName('icon' + i)) {
                        rowCntnr.getChildByName('icon' + i).visible = false;
                    }
                    if (rowCntnr.getChildByName('combTxt' + i)) {
                        rowCntnr.getChildByName('combTxt' + i).visible = false;
                    }
                    summSprt = rowCntnr.getChildByName('summ' + i);
                    if (summSprt) {
                        summSprt.visible = false;
                        rowCntnr.getChildByName('win' + i).visible = false;
                        rowCntnr.getChildByName('coef' + i).visible = false;
                        rowCntnr.getChildByName('phase' + i).visible = false;
                        rowCntnr.getChildByName('tblNum' + i).visible = false;
                    }
                }
            }

            // Выключаем стрелки
            parent.children[2].visible = parent.editionInd !== 0;
            parent.children[3].visible = parent.editionInd !== editionsLocal[gameObj.configType].length - 1;

            var allBets = editionsLocal['blue'][editionInd].betsHistory.bets.concat(editionsLocal['green'][editionInd].betsHistory.bets.concat(editionsLocal['red'][editionInd].betsHistory.bets));
            // ВЫключаем заголовки если ставок нет
            parent.children[8].visible = allBets.length > 0;
            parent.children[9].visible = allBets.length > 0;
            parent.children[4].visible = allBets.length > 0;
            parent.children[5].visible = allBets.length > 0;
            parent.children[6].visible = allBets.length > 0;
            parent.children[7].visible = allBets.length > 0;

            // Выходим если ставок нет
            if (allBets.length <= 0) {
                btCntnr.emit('updateHeight');
                return;
            }

            for (var i = 0, reversI = allBets.length - 1; i < allBets.length; i++, reversI--) {

                // Получаем контейнер куда будем добавлять инфу по ставкам
                rowCntnr = btCntnr.getChildByName('row_' + i);
                // Если нет такого то создаём
                if (!rowCntnr) {
                    rowCntnr = new gameObj.mainRenderer.createButton(btCntnr, 218, 27 + offsetYRow * i, 'tab_history_row');
                    rowCntnr.anchor.y = 0.5;
                    rowCntnr.name = 'row_' + i;
                } else {
                    rowCntnr.visible = true;
                }

                // если прешли первый раз то рисуем всё, если нет просто меняем данные
                highlightRectSprt = rowCntnr.getChildByName('rect' + i);

                if (highlightRectSprt) {
                    highlightRectSprt.visible = true;
                    highlightRectText = highlightRectSprt.getChildByName('textBet' + i);
                    highlightRectText.text = (parseInt(allBets[reversI].comb.toString().substr(1)) >= 15) ? (mainLocalizationTable.player + ' ' + allBets[reversI].comb.toString().substr(0, 1) + possibleBetNames[parseInt(allBets[reversI].comb.toString().substr(1))].info) : (possibleBetNames[parseInt(allBets[reversI].comb.toString().substr(1))].info);
                    highlightRectText.visible = true;
                } else {
                    highlightRectSprt = gameObj.mainRenderer.createButton(rowCntnr, 320, 0, undefined,
                        {
                            text: (parseInt(allBets[reversI].comb.toString().substr(1)) >= 15) ? (mainLocalizationTable.player + ' ' + allBets[reversI].comb.toString().substr(0, 1) + possibleBetNames[parseInt(allBets[reversI].comb.toString().substr(1))].info) : (possibleBetNames[parseInt(allBets[reversI].comb.toString().substr(1))].info),
                            align: 'left',
                            style: {font: '33px Arial', fill: '#ffffff', align: 'left'}
                        });
                    highlightRectSprt.anchor.set(0.5, 0.5);
                    highlightRectSprt.name = 'rect' + i;
                    highlightRectSprt.children[0].name = 'textBet' + i;
                }

                if (possibleBetNames[parseInt(allBets[reversI].comb.toString().substr(1))].texture) {
                    if (rowCntnr.getChildByName('icon' + i)) {
                        rowCntnr.getChildByName('icon' + i).texture = gameObj.mainRenderer.resourceLoader.resources[possibleBetNames[parseInt(allBets[reversI].comb.toString().substr(1))].texture].texture;
                        rowCntnr.getChildByName('icon' + i).visible = true;
                    } else {
                        gameObj.mainRenderer.createButton(rowCntnr, 280, 0, possibleBetNames[parseInt(allBets[reversI].comb.toString().substr(1))].texture).name = 'icon' + i;
                        rowCntnr.getChildByName('icon' + i).anchor.set(0.5, 0.5);
                        rowCntnr.getChildByName('icon' + i).scale.set(0.65, 0.65);
                    }
                }

                if (possibleBetNames[parseInt(allBets[reversI].comb.toString().substr(1))].text) {
                    if (rowCntnr.getChildByName('combTxt' + i)) {
                        rowCntnr.getChildByName('combTxt' + i).children[0].text = possibleBetNames[parseInt(allBets[reversI].comb.toString().substr(1))].text;
                        rowCntnr.getChildByName('combTxt' + i).visible = true;
                    } else {
                        gameObj.mainRenderer.createButton(rowCntnr, 280, 0, undefined, {
                            text: possibleBetNames[parseInt(allBets[reversI].comb.toString().substr(1))].text,
                            align: 'center',
                            style: {font: 'bold 38px Arial Narrow', fill: '#e8a023', align: 'center'}
                        }).name = 'combTxt' + i;
                    }
                }

                winTmp = (allBets[reversI].win != undefined) ? formatFLGNums(allBets[reversI].win, false) : '';
                summSprt = rowCntnr.getChildByName('summ' + i);
                for (var j in PokerObjectsArr) {
                    if (gameObj.gameConfig[j].tableNum == allBets[reversI].comb.toString().substr(0, 1)) {
                        tblColor = gameObj.gameConfig[j].numColor;
                        break;
                    }
                }

                if (summSprt) {
                    summSprt.children[0].text = formatFLGNums(allBets[reversI].summ, false);
                    summSprt.visible = true;
                    coefSprt = rowCntnr.getChildByName('coef' + i);
                    coefSprt.children[0].text = 'X ' + formatFLGNums(allBets[reversI].coef);
                    coefSprt.visible = true;
                    winSprt = rowCntnr.getChildByName('win' + i);
                    winSprt.children[0].text = winTmp;
                    winSprt.visible = true;
                    phaseSprt = rowCntnr.getChildByName('phase' + i);
                    phaseSprt.children[0].text = phaseNames[allBets[reversI].phase];
                    phaseSprt.visible = true;
                    tblNumSprt = rowCntnr.getChildByName('tblNum' + i);
                    tblNumSprt.children[0].text = allBets[reversI].comb.toString().substr(0, 1);
                    tblNumSprt.children[0].style = {font: 'bold 38px Arial', fill: tblColor};
                    tblNumSprt.visible = true;
                } else {
                    gameObj.mainRenderer.createButton(rowCntnr, 125, 0, undefined, {
                        text: allBets[reversI].comb.toString().substr(0, 1),
                        align: 'center',
                        style: {font: 'bold 38px Arial', fill: tblColor}
                    })
                        .name = 'tblNum' + i;
                    gameObj.mainRenderer.createButton(rowCntnr, 625, 0, undefined, {
                        text: phaseNames[allBets[reversI].phase],
                        align: 'center',
                        style: selfLocal.detailEditionsRowFont
                    })
                        .name = 'phase' + i;
                    gameObj.mainRenderer.createButton(rowCntnr, 875, 0, undefined, {
                        text: formatFLGNums(allBets[reversI].summ, false),
                        align: 'center',
                        style: selfLocal.detailEditionsRowFont
                    })
                        .name = 'summ' + i;
                    gameObj.mainRenderer.createButton(rowCntnr, 1125, 0, undefined, {
                        text: 'X ' + formatFLGNums(allBets[reversI].coef),
                        align: 'center', style: selfLocal.detailEditionsRowFont
                    })
                        .name = 'coef' + i;
                    gameObj.mainRenderer.createButton(rowCntnr, 1375, 0, undefined, {
                        text: winTmp,
                        align: 'center',
                        style: selfLocal.detailEditionsRowFont
                    })
                        .name = 'win' + i;
                }
            }
            // Обновляем высоту скрола
            btCntnr.emit('updateHeight');

            btCntnr = null;
            rowCntnr = null;
            summSprt = null;
            winSprt = null;
            coefSprt = null;
            phaseSprt = null;
            tblNumSprt = null;
            tblColor = null;
            highlightRectSprt = null;
            highlightRectText = null;
            winTmp = null;
            allBets = null;
        }

        // Заканчиваем предыдущий
        this.cancelLastEdition = function (lastResBalls) {
            for (var i in PokerObjectsArr) {
                editionsLocal[i][editionsLocal[i].length - 1].editionResult = lastResBalls[i];
                editionsLocal[i][editionsLocal[i].length - 1].betsHistory.setRoundResult(lastResBalls[i]);
                // editionsLocal[i][editionsLocal[i].length - 1].betsHistory.calculateWin(lastResBalls[i]);
            }
            // console.log('cancel ', editionsLocal[gameObj.configType][editionsLocal[gameObj.configType].length-1].round, editionsLocal[gameObj.configType][editionsLocal[gameObj.configType].length-1].betsHistory);
        };

        this.calculateWinBets = function (lastResBalls) {
            for (var i in PokerObjectsArr) {
                editionsLocal[i][editionsLocal[i].length - 1].betsHistory.calculateWin(lastResBalls[i]);
            }
        };

        this.highlightWinBets = function (value) {
            for (var i in PokerObjectsArr) {
                editionsLocal[i][editionsLocal[i].length - 1].betsHistory.highlightWin(value);
            }
        };

        // Добавляем новый тираж
        this.addEdition = function (NewRound) {
            for (var i in PokerObjectsArr) {

                if (editionsLocal[i][editionsLocal[i].length - 1].round != NewRound) {
                    // Удаляем первый элемент
                    if (editionsLocal[i][0].betsHistory.destroy) {
                        editionsLocal[i][0].betsHistory.destroy();
                    }
                    editionsLocal[i][0].betsHistory = null;

                    editionsLocal[i].shift();
                    editionsLocal[i].push({
                        round: NewRound,
                        editionResult: {
                            combination: undefined,
                            suite: undefined,
                            color: undefined,
                            winners: [],
                        },
                        betsHistory: new bets([]),
                    });
                }
            }
            // console.log('add ', editionsLocal[gameObj.configType][editionsLocal[gameObj.configType].length-1].round);
            setCurrentEditionIndexFunc(editionsLocal[gameObj.configType].length - 1);
        }
    }

    // Ставки рулетки
    function bets(lastBets) {

        // Деструктор
        this.destroy = function () {
            for (var i = 0; i < betsLocal.length; i++) {
                betsLocal[i].comb = null;
                betsLocal[i].coef = null;
                betsLocal[i].summ = null;
                betsLocal[i].win = null;
                betsLocal[i].code = null;
                betsLocal[i].state = null;
                betsLocal[i].phase = null;
                betsLocal[i].nm = null;
                betsLocal[i].winBets = null;
                // betsLocal[i].countWin = null;
                betsLocal[i] = null;
            }
            betsLocal = null;
            totalBetLocal = null;
            totalWinLocal = null;
            parentEditionsLocal = null;

            //if (betsContainer) { betsContainer.destroy(); }
            betsContainer = null;
            // // showPart = null;

            drawCurrentBetsFunc = null;

            // Удаляем все внешние свойства и ф-ии
            for (var i in selfLocal) {
                selfLocal[i] = null;
            }
            selfLocal = null;
        };

        // Указатель на самого себя
        var selfLocal = this;

        // Массив ставок
        var betsLocal = [];
        this.bets = betsLocal;
        // Общая сумма ставки и выигрыша
        var totalBetLocal = 0, totalWinLocal = 0;
        this.setTotalWin = function (value) {
            if (!arguments.length) {
                return totalWinLocal;
            }
            if (!value) {
                return;
            }
            totalWinLocal = value;
        };
        // Родительский тираж
        var parentEditionsLocal = null;
        this.parentEditions = function (parent) {
            // вызов без параметра, значит режим геттера, возвращаем свойство
            if (!arguments.length) {
                return parentEditionsLocal;
            }
            parentEditionsLocal = parent;
            // Добавляем контейнер заголовка в таблицу истории
            // betsContainer = parentEditionsLocal.betsHistoryContainer();
        };

        // Показываемая часть ставок
        // var showPart = 1;

        // Инициализируем историю ставок
        if (lastBets.length) {
            for (var i = 0; i < lastBets.length; i++) {

                // // Инкрементируем сумму ставки и выигрыш
                // if (lastBets[i].summ) { totalBetLocal += lastBets[i].summ; }
                // if (lastBets[i].win) { totalWinLocal += lastBets[i].win; }

                betsLocal.push(
                    {
                        comb: lastBets[i].comb,
                        coef: lastBets[i].coef,
                        summ: lastBets[i].summ,
                        win: lastBets[i].win,
                        code: lastBets[i].code,
                        state: lastBets[i].state,
                        phase: lastBets[i].phase,
                        nm: lastBets[i].nm,
                    }
                );
            }
        }

        // Добавить ставку
        this.addBet = function (fortuneBet, editionNum, betApplyFunc) {
            // // Выдём сообщение о том что привышен лимит
            // if (betsLocal.length>=100) {
            //     gameObj.mainRenderer.logService.log(mainLocalizationTable.betLimitInfo.replace(/%s/g, 100));
            //     if (betApplyFunc) { betApplyFunc(undefined); }
            //     return;
            // }

            gameObj.mainFLGAccount.placePokerBet(fortuneBet,
                editionNum, gameObj.gameConfig,
                function (betCode, phaseCode) {

                    // если пусто или ставок больше 500, то выходим
                    if ((betCode == undefined) || (betsLocal.length >= 500) || betCode == -1) {
                        if (betApplyFunc) {
                            betApplyFunc(false);
                        }
                        return;
                    }

                    for (var i in fortuneBet.fortuneBetObjArr) {
                        // console.log(phaseCode);
                        betsLocal.push(
                            {
                                comb: fortuneBet.fortuneBetObjArr[i].comb,
                                coef: fortuneBet.fortuneBetObjArr[i].coef,
                                summ: fortuneBet.fortuneBetObjArr[i].summ,
                                win: undefined,
                                code: betCode,
                                state: undefined,
                                nm: 'p' + parseInt(fortuneBet.fortuneBetObjArr[i].comb.toString().substr(1)).toString(),
                                phase: (phaseCode != undefined) ? phaseCode.substr(0, 2) : 0
                            }
                        );
                    }

                    // Функция если ставка прошла
                    if (betApplyFunc) {
                        betApplyFunc(true);
                    }
                    gameObj.mainRenderer.renderManager.needUpdateRender = true;
                });
        };

        // Сетим результат
        this.setRoundResult = function (result) {
            for (var i = 0; i < betsLocal.length; i++) {
                // betsLocal[i].winBet = result;
            }
        }

        var betsContainer;

        // Отрисовать зону ставок с делением на количество выводимых строк
        var drawCurrentBetsFunc = function () {

        };
        // Перерисовать ставки
        this.redrawCurrentBets = drawCurrentBetsFunc;

        this.highlightWin = function (value) {
            for (var i = 0; i < betsLocal.length; i++) {
                for (var j in betsLocal[i].winBets) {
                    var zoneName = gameObj.mainUIManager.getZoneNameByCombinationCode(betsLocal[i].winBets[j].comb);
                    gameObj.mainGrid[zoneName.substr(1)].getChildByName(zoneName).getChildByName('winLightSprite').alpha = value;
                    zoneName = null;
                }
            }
        };

        // Рассчитать результат
        this.calculateWin = function (editionResult) {

            function getResMatches(betArr) {
                var matchBetsArr = [];
                var combinationCode = parseInt(betArr.comb.toString().substr(1));

                if (combinationCode >= 15) {
                    // На столе
                    if (editionResult.winners.indexOf(betArr.comb.toString().substr(0, 1).concat(possibleBetNames[combinationCode].gridNumber)) >= 0) {
                        matchBetsArr.push(betArr);

                    }
                } else if (combinationCode >= 13) {
                    if (parseInt(editionResult.color) == combinationCode) {
                        matchBetsArr.push(betArr);
                    }
                } else if (combinationCode >= 9) {
                    // В мастях
                    if (parseInt(editionResult.suite) == combinationCode) {
                        matchBetsArr.push(betArr);
                    }
                } else {
                    // В комбинациях
                    if (parseInt(editionResult.combination) == combinationCode) {
                        matchBetsArr.push(betArr);
                    }
                }
                combinationCode = null;
                return matchBetsArr;
            }

            // var matchBets;
            for (var i = 0; i < betsLocal.length; i++) {
                // matchBets = getResMatches(betsLocal[i]);
                betsLocal[i].winBets = getResMatches(betsLocal[i]);
                // betsLocal[i].countWin = matchBets.length;
            }
        }

    }

}