// Глобальный инфо по игроку
var clientInfoGlobal = null;
// Глобальная настройка для разработки
// var mobileMode = isMobile.any;
var mobileMode = true;
// Parse uri
var params = getAllUrlParams();


document.addEventListener("DOMContentLoaded", function(event) {
    // Устанавливаем служебные параметры
    protocol = window.location.protocol;
    setPrefixAndHostName(window.location.host, window.location.pathname);

	// If demo
	if (params.isdemo && params.isdemo.toLowerCase() == 'true') {
		loginUser(2430, 3934, '', function() {
			// updateUser(startGame);
			updateUser(preload);
		});
	}
	else {
        updateUser(preload);		
	}

    // Resize once
    if (isMobile.any) {
        $('body').css('height', document.documentElement.clientHeight*4+'px');
    }

    //resize();
});

// Логиним данные пользователя
function loginUser(login, password, card, succesFunc, isTerminal) {

    function authError() {
        redirectByLoginUrl();
    }

    $.ajax({
        type: 'get',
        url: getUrl(),
        data: { 'oper': 'autz', 'login': login, 'password': password, 'crd': card, istrm: isTerminal },
        success: function (data, status, jqXHR) {
            if ((data != "success1") && (data != "success3")) { authError(); }
            else {
                localKey(data.key);
                // Если всё удачно запускаем функцию
                if (succesFunc) { succesFunc(); }

            }
        },
        error: function (data, status, jqXHR) { authError(); }
    });
}

// Выход из логина пользователя
function logout(sucessFunc) {
    redirectByLoginUrl();
}

// Ключ операций
function localKey(value) {
    if (!arguments.length) { return localStorage.clientKey; }
    else if (parseFloat(value) > 9) { localStorage.setItem('clientKey', value); }
}

// Обновляем данные пользователя
function updateUser(succesFunc) {
    // Если уже был за авторизованный, то не логинем
    $.ajax({
        type: 'get',
        url: getUrl(),
        data: { 'oper': 'update' },
        dataType: 'json',
        success: function (data, status, jqXHR) {
            // Инициализируем глобальные данные инфо по пользователю
            clientInfoGlobal = data;
            // Сессия протухла, обновляем
            if (data.st=='critical') {
                redirectByLoginUrl();
                return;
            }
            // Пытается зайти параллельно
            else if ((data.key==2) && (localKey()==undefined)) {
                console.log('Параллельный вход');
            }
            else if (data.hall=='DEMO'){ localKey(data.key); }
            else {
                // Если ключа нет записываем новый, если есть то его
                localKey(data.key);
            }
            if (succesFunc) { succesFunc();}
        },
        error: function (data, status, jqXHR) {
            console.log('Ошибка соединения с сервером');
            redirectByLoginUrl();
        }
    });
}

// Регистрируем приложение в системе (заглушка)
function registrationAppOnPlatform(regAppConf) {
}

// Показываем ставки (заглушка)
function showCashFlowDlg() {
}

let 
	vKenoNg = 		'20231113';
	vKenoNgMob = 	'20231112';

// Games resolver
var games = {
    // Keno 1 min (blue)
    '0': {
        js: [
            'games/Keno/FLG.KenoNG.Main.js?d='+vKenoNg,
            'games/Keno/FLG.KenoNGMobile.Main.js?d='+vKenoNgMob
        ],
        runMethodName: 'initKenoNGObject',
        type: 'blue'
    },
    // Keno 2 min (red)
    '1': {
        js: [
            'games/Keno/FLG.KenoNG.Main.js?d='+vKenoNg,
            'games/Keno/FLG.KenoNGMobile.Main.js?d='+vKenoNgMob
        ],
        runMethodName: 'initKenoNGObject',
        type: 'red'
    },
    // Keno 4 min (green)
    '2': {
        js: [
            'games/Keno/FLG.KenoNG.Main.js?d='+vKenoNg,
            'games/Keno/FLG.KenoNGMobile.Main.js?d='+vKenoNgMob
        ],
        runMethodName: 'initKenoNGObject',
        type: 'green'
    },
	// Keno 4 min (V)
    '21': {
        js: [
            'games/Keno/FLG.KenoNG.Main.js?d='+vKenoNg,
            'games/Keno/FLG.KenoNGMobile.Main.js?d='+vKenoNgMob
        ],
        runMethodName: 'initKenoNGObject',
        type: 'v'
    },
    // Keno Gold
    '3': {
        js: [
            'games/Keno/FLG.KenoNG.Main.js?d=02022023',
            'games/Keno/FLG.KenoNGMobile.Main.js?d='+vKenoNgMob
        ],
        runMethodName: 'initKenoNGObject',
        type: 'gold'
    },
    // Keno Red 2 min classic
    '5': {
        js: [
            'games/KenoOld/FLG.KenoOld.Main.js?d=31012022',
            'games/KenoOld/FLG.KenoOld.Main.js?d=31012022'
        ],
        runMethodName: 'initKenoOldObject',
        type: 'red'
    },
    // Keno Green 4 min classic
    '6': {
        js: [
            'games/KenoOld/FLG.KenoOld.Main.js?d=31012022',
            'games/KenoOld/FLG.KenoOld.Main.js?d=31012022'
        ],
        runMethodName: 'initKenoOldObject',
        type: 'green'
    },

    // Red Lottery 1.5 min
    '8': {
        js: [
            'games/RedLottery/FLG.RedLottery.Main.js?d=25112019',
        ],
        runMethodName: 'initRedLotteryObject',
        type: 'red'
    },
    // Roulette Red 1.5 min
    '9': {
        js: [
            'games/Roulette/FLG.Roulette.Main.js?d=25112019',
        ],
        runMethodName: 'initRouletteObject',
        type: 'red'
    },

    // Poker TH (texas hold 'em)
    '13': {
        js: [
            'games/Poker/FLG.Poker.Main.js?d=25112019',
            'games/Poker/FLG.PokerMobile.Main.js?d=25112019',
        ],
        runMethodName: 'initPokerObject',
        type: 'blue'

    },
	// Black Roulette E-table
    '15': {
        css: ['games/BlackRoulette/css/main.css'],
        js: [
            'games/BlackRoulette/FLG.BlackRoulette.Main.js?d=21062022',
            'games/BlackRoulette/FLG.BlackRouletteMobile.Main.js?d=20062022',
            'games/BlackRoulette/js/chips.js',
        ],
		runMethodName: 'initBlackRouletteObject',
        type: 'black2'
    },

    // Black Roulette
    '16': {
        css: ['games/BlackRoulette/css/main.css'],
        js: [
            'games/BlackRoulette/FLG.BlackRoulette.Main.js?d=16042021',
            'games/BlackRoulette/FLG.BlackRouletteMobile.Main.js?d=16042021',
            'games/BlackRoulette/js/chips.js',
        ],
	fonts: [
	],
        runMethodName: 'initBlackRouletteObject',
        type: 'black'
    },

    // Black - red Roulette
    '17': {
        css: ['games/BlackRoulette/css/main.css'],
        js: [
            'games/BlackRoulette/FLG.BlackRoulette.Main.js?d=16042021',
            'games/BlackRoulette/FLG.BlackRouletteMobile.Main.js?d=16042021',
            'games/BlackRoulette/js/chips.js',
        ],
	fonts: [
	],
        runMethodName: 'initBlackRouletteObject',
        type: 'red'
    },

    // Roulette lotto
    '18': {
        css: ['games/BlackRoulette4Sasha/css/main.css'],
        js: [
            'games/BlackRoulette4Sasha/FLG.BlackRoulette4Sasha.Main.js?d=11042021',
            'games/BlackRoulette4Sasha/FLG.BlackRouletteMobile4Sasha.Main.js?d=11042021',
            'games/BlackRoulette/js/chips.js',
        ],
	fonts: [
	],
        runMethodName: 'initBlackRoulette4SashaObject',
        type: 'red'
    },

    // Roulette green
    '19': {
        css: ['games/BlackRoulette4Sasha/css/main.css'],
        js: [
            'games/BlackRoulette4Sasha/FLG.BlackRoulette4Sasha.Main.js?d=11042021',
            'games/BlackRoulette4Sasha/FLG.BlackRouletteMobile4Sasha.Main.js?d=11042021',
            'games/BlackRoulette/js/chips.js',
        ],
	fonts: [
	],
        runMethodName: 'initBlackRoulette4SashaObject',
        type: 'green'
    },

    // Keno JX
    '20': {
        js: [
            'games/Keno/FLG.KenoJX.Main.js?d=20230424',
            'games/Keno/FLG.KenoJXMobile.Main.js?d=10012022'
        ],
	fonts: [
	],
        runMethodName: 'initKenoJXObject',
        type: 'green'
    },
	
	// Roulette auto
    '22': {
        css: ['games/BlackRoulette4Sasha/css/main.css'],
        js: [
            'games/BlackRoulette4Sasha/FLG.RouletteAuto.Main.js?d=20221201',
            'games/BlackRoulette4Sasha/FLG.RouletteAutoMobile.Main.js?d=20221201',
            'games/BlackRoulette/js/chips.js',
        ],
	fonts: [
	],
        runMethodName: 'initRouletteAutoObject',
        type: 'normal'
    },

    // Lotto
    '42': {
        js: [
            'games/Lotto/FLG.Lotto.Main.js?d=0',
            'games/Lotto/FLG.LottoMobile.Main.js?d=0'
        ],
	fonts: [
	],
        runMethodName: 'initLottoObject',
        type: 'red'
    },

    // LottoNew
    '72': {
        js: [
            'games/Lotto/FLG.LottoSeparate.Main.js?d=20230207_1',
            'games/Lotto/FLG.LottoSeparateMobile.Main.js?d=20230207_1'
        ],
        fonts: [
        ],
        runMethodName: 'initLottoNewObject',
        type: 'blue'
    },

    // LottoNew
    '73': {
        js: [
            'games/Lotto/FLG.LottoSeparate.Main.js?d=20230207_1',
            'games/Lotto/FLG.LottoSeparateMobile.Main.js?d=20230207_1'
        ],
        fonts: [
        ],
        runMethodName: 'initLottoNewObject',
        type: 'red'
    },

    // LottoNew
    '74': {
        js: [
            'games/Lotto/FLG.LottoSeparate.Main.js?d=20230207_1',
            'games/Lotto/FLG.LottoSeparateMobile.Main.js?d=20230207_1'
        ],
        fonts: [
        ],
        runMethodName: 'initLottoNewObject',
        type: 'green'
    },

    // Covid
    '100': {
        js: [
            'games/Covid/FLG.Covid.js',
        ],
        runMethodName: 'initCovidObject',
        type: 'normal'
    },
};

var preload = function () {
    // Language
    if (params.lang) {
        var lang = 'en';
        switch (params.lang.toUpperCase()) {
            case 'RUS':
            case 'RU':
                lang = 'ru'; break;
            case 'ENG':
            case 'EN':
                lang = 'en'; break;
            case 'FRA':
            case 'FR':
                lang = 'fr'; break;
            case 'SPA':
            case 'ESP':
            case 'ES':
                lang = 'es'; break;
            case 'KUR':
            case 'KU':
                lang = 'ku'; break;
            case 'ARA':
            case 'AR':
                lang = 'ar'; break;
            case 'KAZ':
            case 'KZ':
                lang = 'kz'; break;
            case 'PRT':
            case 'PT':
                lang = 'pt'; break;
        }
        mainLocalizator.currentLang(lang);
		utils.setCurrentLang(lang)
    }

    // Back Url
    if (params.backurl) {
        loginURL = params.backurl;
        clientInfoGlobal.backurl = params.backurl;
    }

    // Game ID
    if (params.gameid) {
        // Load realative resources and launch game

        var gm = games[params.gameid];

        if (!gm) return;

        // Load css
        var i = 0;
        if (gm.css && gm.css.length) {
            var link = document.createElement('link'),
                head = document.getElementsByTagName('head')[0],
                tmp;
            link.rel = 'stylesheet';

            for (i = 0; i < gm.css.length; i++) {
                tmp = link.cloneNode(true);
                tmp.href = (FLGUtils.staticRootPath||'') + gm.css[i];
                head.appendChild(tmp);
            }
        }

        i = 0;
        if (gm.js && gm.js.length) {

            function loadScript() {
                if (i >= gm.js.length) {
                    // Start game
                    startGame(gm.runMethodName, gm.type);
                    return;
                }

                var script = document.createElement('script');
                script.onload = loadScript;

                script.src =  (FLGUtils.staticRootPath||'') + gm.js[i];
                i++;

                document.head.appendChild(script); //or something of the likes
            }

            loadScript();
        }
    }

    APIManager.isAPIUser(true);
	// Clear params dispose memory
	params = null;
};

function startGame(runName, type) {
    window[runName]('game', type);
    //resize();
}

function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}

function resize () {

    // I only want to redirect iPhones, Android phones and a handful of 7" devices
    // Если портрайт перещитываем сетку игр
    var isPortrait = ($(window).width()<$(window).height()) && (isMobile.any);
    if (isPortrait && !window.flgStopRotate) {
        if ($('#rotate_device').css('display')!=='block') {
            $('#rotate_device').css('display', 'block');
            $('html').css('overflow', 'hidden');
            $('body').css('overflow', 'hidden');
        }
    }
    else {
        if ($('#rotate_device').css('display')==='block') {
            $('#rotate_device').css('display', 'none');
            $('html').css('overflow', '');
            $('body').css('overflow', '');
        }
    }
}

//$(window).resize(resize);

// Глобальный диалог входа в систему
function showAgreeDlg(seccessCb, closeCb) {
	// Выходим если не надо показывать
    if (localStorage.maxBetAgree) {
        seccessCb();
        return;
	}

    var agree = false;

	window.flgsShowAgreeDlgCb = seccessCb;
    window.flgsShowAgreeDlgNotShow = function () {
        agree = !agree;
        var $noMore = $('#no-more');
        if (agree) { $noMore.css('background-image', 'url("libs/FLGUtils/resources/autoplay/check-btn.png")'); }
        else { $noMore.css('background-image', 'url("libs/FLGUtils/resources/autoplay/uncheck-btn.png")'); }
	};

    window.flgsShowAgreeDlgNotShowSave = function () {
        if (agree) { localStorage.setItem('maxBetAgree', true); }
    };


        // Получаем контент диалога
    function getContent() {
        var $dlg = $('<div style="padding: 8px;">'+
            '<div style="text-align: center;margin-bottom: 16px;margin-top: 8px;font-size: 20px;">'+
            mainLocalizationTable.confirmMaxBet+
            '</div>'+
            '<div style="display: flex;align-items: center;justify-content: center;flex-direction: row;flex-wrap: nowrap;margin-bottom: 16px;">'+
				'<div style="border: 2px solid #000;-webkit-tap-highlight-color: transparent;text-decoration: none;padding: 8px 24px;font-weight: 600;text-transform: uppercase;text-align: center;cursor: pointer;" onclick="window.flgsShowAgreeDlgCb();window.flgsShowAgreeDlgNotShowSave();$.fancybox.close();">'+
	            mainLocalizationTable.confirmYes+
				'</div>'+
				'<div style="margin-left: 30px;border: 2px solid #000;-webkit-tap-highlight-color: transparent;text-decoration: none;padding: 8px 24px;font-weight: 600;text-transform: uppercase;text-align: center;cursor: pointer;" onclick="window.flgsShowAgreeDlgNotShowSave();$.fancybox.close();">'+
            	mainLocalizationTable.confirmNo+
				'</div>'+
			'</div>'+
            '<div style="position: relative; display: inline-block;cursor: pointer;" onclick="window.flgsShowAgreeDlgNotShow();">'+
				'<div id="no-more" style="border: 2px solid #000;display: inline-block;top: 2px;position: absolute;left: 0px;width: 24px;height: 24px;background-image: url("libs/FLGUtils/resources/autoplay/uncheck-btn.png"); background-size: contain;"></div>'+
				'<div style="display: inline-block;margin: 1px 36px;">'+
				mainLocalizationTable.confirmDontShow+
				'</div>'+
            '</div>'+
        '</div>');
        return $dlg[0].outerHTML;
    }

    $.fancybox({
        content: getContent(),
        autoCenter: true,
        autoHeight: true,
        height: '95%',
        maxHeight: "200px",
        autoSize: false,
        padding: 0,
        width: "95%",
        maxWidth: '400px',
        type: 'html',
        beforeClose: function () {
            window.flgsShowAgreeDlgCb = null;
            delete window.flgsShowAgreeDlgCb;
            window.flgsShowAgreeDlgNotShow = null;
            delete window.flgsShowAgreeDlgNotShow;
            window.flgsShowAgreeDlgNotShowSave = null;
            delete window.flgsShowAgreeDlgNotShowSave;

            if (closeCb) { closeCb(); }
        }
    });
}
