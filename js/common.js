'use strict';
// Последний выделяемый инпут
var lastFocusedInput = null;
// Если зашли с карты
var fromCardEnter = false;

// Глобальный метод смены языка (инициализируется когда документ полностью готов)
var changeLangGlobalFunc = null;
// Глобальный метод смены баланса (инициализируется когда документ полностью готов)
var changeBalanceGlobalFunc = null;
// Глобальный инфо по игроку
var clientInfoGlobal = null;

// Глобальный масштаб сайта
var siteScale = 1;
// Флаг для фиксации перехода с Portrait в landscape
var prevIsPortrait = undefined;
// Относительная ширина контента для масшатбирования
var relativeWidth = 1980;
// Список объектов для масштабирования
var needToScaleElements = [
    {name: '.tool-button'},
    {name: '.logo'},
    //{ name: '#games-form-header' },
    {name: '.lang-buttons'},
    {name: '.msg-button'},
    {name: '.msg-button__ticket-count'},
    {name: '.msg-button__X'},
    {name: '.msg-button__label'},
    {name: '.stake-buttons'},
    {name: '.signin-buttons'},
    {name: '.reg-buttons'},
    {name: '.info-label'},
    {name: '#games-form .game'},
    {name: '#games-form .game-label'},

    {name: '.min-tool-button'},
    {name: '.info'},
    {name: '#change-password-form-bg'},
    {name: '#change-password-form input'},
    {name: '#change-password-form .buttons'},
    {name: '#change-password-form .num-buttons'},
    {name: '#change-password-form .min-num-buttons'},
    {name: '#sign-in-dlg'}
];
var needToScaleOffsetElements = null;

// Глобальный список настроек всех игр
var globalContentItems = [];

// Глобальная настройка для разработки
var mobileMode = isMobile.any;

// eliwang093: remove after test!
//    ?isFrame=true&lang=eng&show_gamelink=1&gameID=1&isDemo=true
localStorage.setItem('show_gamelink', 1);
localStorage.setItem('isFrame', true);
localStorage.setItem('language', 'eng');
localStorage.setItem('language', 'eng');
localStorage.setItem('gameID', 1);


// Регистрируем приложение в системе
function registrationAppOnPlatform(regAppConf) {
    // Проверяем на валидность
    if (!regAppConf || !regAppConf.category || !regAppConf.runConfig) {
        return;
    }
    globalContentItems.push(regAppConf);
}

$(document).ready(function () {
    // Инициализируем глобальную переменную смены баланса
    changeBalanceGlobalFunc = function (newBalance) {
        clientInfoGlobal.balance = newBalance;

        setDOMBalance(newBalance);
        // Рассылаем уведомления всем запущенным играм
        for (var i = 0; i < globalContentItems.length; i++) {
            window['emitEvent' + globalContentItems[i].runConfig]('changeBalance', newBalance);
        }
    };
    FLGUtils.showGamerHistory = () => {
    };
    //Getting session key from URL
    (() => {
        const p = location.pathname.split('/');
        if (p[1].match(/\(['\S']+\)/))
            localStorage.setItem('pltoken', p[1]);
    })()
    // Делаем предобработку
    preprocessing(readyLogic);
});

function readyLogic(IsLogged) {
    // Создаём предзагрузчик
    var imagesUrls =
        [
            'images/space-bg.jpg',

            'images/ChangePass/login-form.png',
            'images/ChangePass/input.png',
            'images/ChangePass/0.png',
            'images/ChangePass/0-a.png',
            'images/ChangePass/1.png',
            'images/ChangePass/1-a.png',
            'images/ChangePass/2.png',
            'images/ChangePass/2-a.png',
            'images/ChangePass/3.png',
            'images/ChangePass/3-a.png',
            'images/ChangePass/4.png',
            'images/ChangePass/4-a.png',
            'images/ChangePass/5.png',
            'images/ChangePass/5-a.png',
            'images/ChangePass/6.png',
            'images/ChangePass/6-a.png',
            'images/ChangePass/7.png',
            'images/ChangePass/7-a.png',
            'images/ChangePass/8.png',
            'images/ChangePass/8-a.png',
            'images/ChangePass/9.png',
            'images/ChangePass/9-a.png',
            'images/ChangePass/back-del.png',
            'images/ChangePass/back-del-a.png',
            'images/ChangePass/cancel.png',
            'images/ChangePass/cancel-a.png',

            'images/changePassAdd/0-123-keyboard-1.png',
            'images/changePassAdd/0-123-keyboard-2.png',
            'images/changePassAdd/0-abc-keyboard-1.png',
            'images/changePassAdd/0-abc-keyboard-2.png',
            'images/changePassAdd/0-cancel-keyboard-1.png',
            'images/changePassAdd/0-cancel-keyboard-2.png',
            'images/changePassAdd/0-delete-keyboard-1.png',
            'images/changePassAdd/0-delete-keyboard-2.png',
            'images/changePassAdd/a-keyboard-1.png',
            'images/changePassAdd/a-keyboard-2.png',
            'images/changePassAdd/b-keyboard-1.png',
            'images/changePassAdd/b-keyboard-2.png',
            'images/changePassAdd/c-keyboard-1.png',
            'images/changePassAdd/c-keyboard-2.png',
            'images/changePassAdd/d-keyboard-1.png',
            'images/changePassAdd/d-keyboard-2.png',
            'images/changePassAdd/e-keyboard-1.png',
            'images/changePassAdd/e-keyboard-2.png',
            'images/changePassAdd/f-keyboard-1.png',
            'images/changePassAdd/f-keyboard-2.png',
            'images/changePassAdd/g-keyboard-1.png',
            'images/changePassAdd/g-keyboard-2.png',
            'images/changePassAdd/h-keyboard-1.png',
            'images/changePassAdd/h-keyboard-2.png',
            'images/changePassAdd/i-keyboard-1.png',
            'images/changePassAdd/i-keyboard-2.png',
            'images/changePassAdd/j-keyboard-1.png',
            'images/changePassAdd/j-keyboard-2.png',
            'images/changePassAdd/k-keyboard-1.png',
            'images/changePassAdd/k-keyboard-2.png',
            'images/changePassAdd/l-keyboard-1.png',
            'images/changePassAdd/l-keyboard-2.png',
            'images/changePassAdd/m-keyboard-1.png',
            'images/changePassAdd/m-keyboard-2.png',
            'images/changePassAdd/n-keyboard-1.png',
            'images/changePassAdd/n-keyboard-2.png',
            'images/changePassAdd/o-keyboard-1.png',
            'images/changePassAdd/o-keyboard-2.png',
            'images/changePassAdd/p-keyboard-1.png',
            'images/changePassAdd/p-keyboard-2.png',
            'images/changePassAdd/q-keyboard-1.png',
            'images/changePassAdd/q-keyboard-2.png',
            'images/changePassAdd/r-keyboard-1.png',
            'images/changePassAdd/r-keyboard-2.png',
            'images/changePassAdd/s-keyboard-1.png',
            'images/changePassAdd/s-keyboard-2.png',
            'images/changePassAdd/t-keyboard-1.png',
            'images/changePassAdd/t-keyboard-2.png',
            'images/changePassAdd/u-keyboard-1.png',
            'images/changePassAdd/u-keyboard-2.png',
            'images/changePassAdd/v-keyboard-1.png',
            'images/changePassAdd/v-keyboard-2.png',
            'images/changePassAdd/w-keyboard-1.png',
            'images/changePassAdd/w-keyboard-2.png',
            'images/changePassAdd/x-keyboard-1.png',
            'images/changePassAdd/x-keyboard-2.png',
            'images/changePassAdd/y-keyboard-1.png',
            'images/changePassAdd/y-keyboard-2.png',
            'images/changePassAdd/z-keyboard-1.png',
            'images/changePassAdd/z-keyboard-2.png',

            'images/ChangePass/change-En-a.png',
            'images/ChangePass/change-En-b.png',
            'images/ChangePass/change-Ru-a.png',
            'images/ChangePass/change-Ru-b.png',
            'images/ChangePass/change-pass-icon-blue.png',
            'images/ChangePass/change-pass-icon-white.png',

            'images/details_close.png',
            'images/details_open.png',
            'images/back2.png',
            'images/back.png',
            'images/logo-flg.png',
            'images/lang2.png',
            'images/lang.png',
            'images/stake2.png',
            'images/stake.png',
            'images/ru.png',
            'images/ru2.png',
            'images/kz.png',
            'images/kz2.png',
            'images/en.png',
            'images/en2.png',
            'images/es.png',
            'images/es2.png',
            'images/kur.png',
            'images/kur2.png',
            'images/ara.png',
            'images/ara2.png',
            'images/fullscreen-swipe.gif',
            'images/games-bg/keno-bg.jpg',
            // 'images/promo/stavkabet.png'
        ];
    // засовываем урлы иконок
    for (var i = 0; i < globalContentItems.length; i++) {
        imagesUrls.push(globalContentItems[i].image);
        imagesUrls.push(globalContentItems[i].imageBack);
        // Если есть бэкграунды для игр дабовляем и их, по умолчанию keno-bg
        if (globalContentItems[i].gameBG) {
            imagesUrls.push(globalContentItems[i].gameBG)
        }
    }
    new preloader('loader', 'preload',
        // Image
        imagesUrls,
        // Fonts
        [
            'Baltica',
            //'Georgia',
            'Arial Narrow',
            'Myriad Pro',
            // 'Arial Bold',
            'Book Antiqua',
            'Calibri',
            'Arial',
            'Arial Black',
            'Trebuchet MS',
            'Myriad Pro Cond',
            'Swiss721-CondensedBold',
            'Century725',
            'Century725 Bold',
            'Avenir Next Medium',
            'Avenir Next Demi'
        ]
    );

    // Подключаем паралельный скрол за мышкой
    if (!isMobile.any) {
        $('#space-bg').parallax();
    }

    //$('#space-bg .space-img').height($(window).height()*1.10);

    // Эта секция будет посвещена обновления кеша локал сториджа
    if (IsLogged) {
        // Если даты нет то локл сторедж чистим и пишем
        if (!localStorage.ver) {
            // Удаляем ставки по кено
            localStorage.removeItem('KenoGreeneditions');
            localStorage.removeItem('KenoGoldeditions');
            localStorage.removeItem('KenoBlueeditions');
            localStorage.removeItem('KenoRededitions');

            localStorage.setItem('ver', JSON.stringify({date: Date.now(), v: 18}));
        }
        // Иначе просто выходим чтобы не писать дважды тут будет логика обработки версий
        else {
        }
    }

    // Инициализируем глобальную переменную смены языка
    changeLangGlobalFunc = function (lang) {
        mainLocalizator.currentLang(lang);
        mainLocalizationTable = mainLocalizator.getLocalizationTable();

        // Меняем кнопки логина
        //$('#demo-game').css('background-image', 'url(images/demo-'+lang+'.png)');
        //$('#demo-game-selected').css('background-image', 'url(images/demo-'+lang+'2.png)');
        //$('#enter').css('background-image', 'url(images/enter-'+lang+'.png)');
        //$('#enter-selected').css('background-image', 'url(images/enter-'+lang+'2.png)');

        $('.stake-buttons').text(mainLocalizationTable.myBets.toUpperCase());
        //$('.signin-buttons').html('<i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;' + mainLocalizationTable.signIn.toUpperCase());
        //$('.reg-buttons').html('<i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;' + mainLocalizationTable.registration.toUpperCase());
        $('.signin-buttons').text(mainLocalizationTable.signIn.toUpperCase());
        $('.reg-buttons').text(mainLocalizationTable.registration.toUpperCase());
        $('#account-label').text(mainLocalizationTable.account.toUpperCase());
        $('#balance-label').text(mainLocalizationTable.balance.toUpperCase());
        $('#msgInfo .msg-button__label').text(mainLocalizationTable.rafflePrizes);

        // Форма смены пароля
        var $cpfInputs = $('#change-password-form .login, #change-password-form .password');
        $($cpfInputs[0]).attr('placeholder', mainLocalizationTable.login);
        $($cpfInputs[1]).attr('placeholder', mainLocalizationTable.password);
        $($cpfInputs[2]).attr('placeholder', mainLocalizationTable.newPassword);
        $($cpfInputs[3]).attr('placeholder', mainLocalizationTable.repeatNewPassword);
        $cpfInputs = null;
        switch (lang) {
            case 'en':
                $('#change-pwd').css('background-image', 'url(images/ChangePass/change-En-a.png)');
                $('#change-pwd-selected').css('background-image', 'url(images/ChangePass/change-En-b.png)');
                break;
            case 'ru':
                $('#change-pwd').css('background-image', 'url(images/ChangePass/change-Ru-a.png)');
                $('#change-pwd-selected').css('background-image', 'url(images/ChangePass/change-Ru-b.png)');
                break;
            case 'es':
                $('#change-pwd').css('background-image', 'url(images/ChangePass/change-Ru-a.png)');
                $('#change-pwd-selected').css('background-image', 'url(images/ChangePass/change-Ru-b.png)');
                break;
        }
        // Рассылаем уведомления всем запущенным играм
        for (var i = 0; i < globalContentItems.length; i++) {
            window['emitEvent' + globalContentItems[i].runConfig]('changeLang', lang);
        }
    };

    // анимация для кнопок
    var selectedAnimFunc = function ($Obj, onComplete) {
        if (!$Obj || !onComplete) {
            return;
        }
        //if (!$Obj || !onComplete || $Obj.is(':animated')) { return; }
        $Obj.stop();
        $Obj.fadeTo(110, 1, 'easeOutExpo', function () {
            $Obj.fadeTo(500, 0, 'linear');
        });
        onComplete($Obj);
    };
    // анимация для кнопок на наведение мышки
    var hoverEnterAnimFunc = function ($Obj) {
        if (!$Obj) {
            return;
        }
        $Obj.stop();
        $Obj.fadeTo(110, 0.6, 'easeOutExpo');
    };
    var hoverLeaveAnimFunc = function ($Obj) {
        $Obj.stop();
        if (!$Obj || ($Obj.css('opacity') == 0)) {
            return;
        }
        $Obj.fadeTo(500, 0, 'linear');
    };

    //Выставляем ширину хедера
    //$('#games-form #games-form-header').width($(window).width());
    // Выставляем текущий запомненый язык
    localLanguage(localLanguage());
    // Обработка на смену языка
    var $langDD = $('#lang-button-dropdown');
    var $langB = $('.lang-button-selected');
    $langB.hover(function () {
            $langB.stop();
            $langB.fadeTo(110, 1, 'easeOutExpo');
            $langB.css('pointer-events', '');
            $langDD.stop();
            $langDD.fadeTo(110, 1, 'easeOutExpo');
            $langDD.css('display', 'block');
            $langDD.css('pointer-events', '');
        }, function () {
        }
    );
    $langDD.hover(function () {
        }, function () {
            $langDD.css('pointer-events', 'none');
            $langB.css('pointer-events', 'none');
            $langB.fadeTo(250, 0, 'linear', function () {
                $langB.css('pointer-events', '');
            });
            $langDD.fadeTo(250, 0, 'linear', function () {
                $langDD.css('display', 'none');
                $langDD.css('pointer-events', '');
            });
        }
    );
    $('.lang-item').click(function () {
        var $curLang = $(this);
        selectedAnimFunc($curLang,
            function () {
                if (!$curLang.attr('lang')) {
                    return;
                }

                $langDD.css('pointer-events', 'none');
                $langB.css('pointer-events', 'none');
                $langB.fadeTo(250, 0, 'linear', function () {
                    $langB.css('pointer-events', '');
                });
                $langDD.fadeTo(250, 0, 'linear', function () {
                    localLanguage($curLang.attr('lang'));
                    $langDD.css('display', 'none');
                    $langDD.css('pointer-events', '');
                });
            });
    });

    // Логика работы для акции
    if (clientInfoGlobal.hallid && (clientInfoGlobal.hallid == 2278)) {
        var $msg = $('#msgInfo');
        $msg.css('display', '');
        $msg.find('.msg-button__label').text(mainLocalizator.getLocalizationTable().rafflePrizes);
        var $msgBtn = $msg.find('.msg-button');
        // var impulseIntervalID = 0;

        // function startImpulse() {
        //     impulseIntervalID = setInterval(function () {
        //         $msgSel.fadeTo(110, 0.6, 'easeOutExpo', function () {
        //             $msgSel.fadeTo(500, 0, 'linear');
        //         });
        //     }, 1250);
        // }
        // startImpulse();

        // Получить дробную часть
        function getDecimal(num) {
            var str = num.toFixed(2);
            var zeroPos = str.indexOf('.');
            if ((zeroPos == -1) || (str.indexOf('.00') != -1)) return 0;
            str = str.slice(zeroPos + 1);
            return +str;
        }

        function setInfo() {
            getUserTurnover(function (uto) {
                var ticketCnt = uto / 100 / 100000;
                var decimal = getDecimal(ticketCnt);
                $msg.find('.msg-button__ticket-count').text(Math.trunc(ticketCnt));
                $msg.find('.msg-button__svg__full').css('width', decimal + '%');
            });
        }

        // Запускаем в асинхрон выполнение подсчёта каждую минуту
        setInterval(setInfo, 60000);
        setInfo();

        // Получить разметку и вёрстку для акции
        function getPromoContent() {
            return '<div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap;margin: 40px 40px 30px 40px;">' +
                '<div style="font-size: 28px; line-height: 38px; text-align: center; margin-bottom: 30px;">Выиграй автомобиль от <img src="images/promo/stavkabet.png" style="height: 30px;padding-bottom: 8px;">!</div>' +
                '<div style="font-size: 28px; line-height: 38px; text-align: center; margin-bottom: 20px;">Играй с нами! Пополняй свой логин и получай купоны для участия в акции. Больше пополнений – больше шансов выиграть Главный приз – АВТОМОБИЛЬ!</div>' +
                '<div style="font-size: 18px; line-height: 22px; flex-basis: 100%; text-align: center;">Перед участием в акции, пожалуйста, ознакомьтесь с подробными <a href="#" class="flg-hover">условиями</a>.</div>' +
                '<div style="font-size: 18px; line-height: 22px; text-align: center;">Желаем Вам приятной игры!</div>' +
                '</div>';
        }

        $msgBtn.click(function () {
            // clearInterval(impulseIntervalID);

            $.fancybox({
                //title: (type == 'alert') ? mainLocalizationTable.errorTitle : mainLocalizationTable.infoTitle,
                content: getPromoContent(),
                autoCenter: true,
                width: "95%",
                autoHeight: true,
                maxHeight: "95%",
                autoSize: false,
                padding: 0,
                maxWidth: '965px',
                type: 'html',
                beforeShow: function () {
                    // $.fancybox.showLoading();
                    // // Делаем запрос на данные и формируем таблицу
                    // getDataForTable(createDataTable);
                },
                afterShow: function () {
                    // clearInterval(impulseIntervalID);
                    // // Делаем запрос на данные и формируем таблицу
                    // getDataForTable(createDataTable);
                },
                onUpdate: function () {
                    // if (fancyboxInner && (fancyboxInner.scrollTop!=undefined)) {
                    //     fancyboxInner.scrollTop = scrollTop;
                    // }
                },
                beforeClose: function () {
                    // $('#cash_flow_table tbody').off('click');
                    // // Отписываем события на сортировку результатов
                    // offSortEvents('#cash_flow_table tbody .results-details-sort');
                    // // Отписываем события на сортировку результатов
                    // offSortEvents('#cash_flow_table tbody .results-sort');
                    // offSortEvents('#showmore');
                    //
                    // // Удаляем все внешние свойства и дочерней таблицы
                    // for (var i in childTable) {
                    //     if (childTable[i]!=null) {
                    //         childTable[i].destroy();
                    //         $(i).remove();
                    //     }
                    //     childTable[i] = null;
                    // }
                    // childTable = null;
                    //
                    // if (mainTable) { mainTable.destroy(); }
                    // mainTable = null;
                    // $('#cash_flow_table').remove();
                    //
                    // $.fancybox.hideLoading();

                    // startImpulse();
                }
            });

        });
        $msgBtn.hover(function () {
                // clearInterval(impulseIntervalID);
                $msgBtn.find('.msg-button__label').css('text-decoration', 'underline');
            },
            function () {
                $msgBtn.find('.msg-button__label').css('text-decoration', '');
                // startImpulse();
            });
    }

    // Обработка на мои ставки
    $('.stake-button-selected.stake-buttons').click(function () {
        FLGUtils.showGamerHistory()
        /*selectedAnimFunc($(this),
			function () {
				showCashFlowDlg();
			}
		);*/
    }).hover(function () {
        hoverEnterAnimFunc($(this));
    }, function () {
        hoverLeaveAnimFunc($(this));
    });
    // Обработка на "вход"
    $('.stake-button-selected.signin-buttons').click(function () {
        selectedAnimFunc($(this),
            function () {
                showSignInDlg();
            }
        );
    }).hover(function () {
        hoverEnterAnimFunc($(this));
    }, function () {
        hoverLeaveAnimFunc($(this));
    });
    // Обработка на "регистрацию"
    $('.stake-button-selected.reg-buttons').click(function () {
        selectedAnimFunc($(this),
            function () {
                showRegistrationDlg();
            }
        );
    }).hover(function () {
        hoverEnterAnimFunc($(this));
    }, function () {
        hoverLeaveAnimFunc($(this));
    });


    $('#logout').click(function () {
        selectedAnimFunc($(this), function () {
            logout();
        });
    }).hover(function () {
        hoverEnterAnimFunc($(this));
    }, function () {
        hoverLeaveAnimFunc($(this));
    });

    var refreshBalanceFunc = function () {
        gameClickEnableFunc($('#refresh-balance'), false);
        gameClickEnableFunc($('#balance'), false);
        updateBalance(function () {
            gameClickEnableFunc($('#refresh-balance'), true);
            gameClickEnableFunc($('#balance'), true);
        });

    };
    // Работа на кнопку рефреша баланса
    $('#refresh-balance').click(refreshBalanceFunc);
    $('#balance').click(refreshBalanceFunc);

    // Обновляем баланс каждые 0.5 минуты, если авторизованы
    if (IsLogged) {
        setInterval(function () {
            updateBalance();
        }, 30000);
    }

    // Инпуты и циферблат
    var loginButtonsLogicFunc = function ($animObj) {
        switch ($animObj[0].textContent) {
            case '':
                //lastFocusedInput.value.length = lastFocusedInput.value.length-1;
                lastFocusedInput.value = lastFocusedInput.value.slice(0, -1);
                break;
            case 'C':
                lastFocusedInput.value = '';
                break;
            // Меняем на буквы
            case '%':
                if ($animObj.attr('NeedNums') && $animObj.attr('NeedNums') == 'true') {
                    $animObj.parent().parent().parent().find('.min-num-buttons').css('display', 'none');
                    $animObj.parent().parent().parent().find('.num-buttons').css('display', '');
                    $animObj.attr('NeedNums', false);
                    // Включаем сам инпут
                    $animObj.css({'background-image': 'url(images/changePassAdd/0-abc-keyboard-2.png)', 'display': ''});
                    $animObj.parent().find(':first-child').css({
                        'background-image': 'url(images/changePassAdd/0-abc-keyboard-1.png)',
                        'display': ''
                    });
                } else {
                    $animObj.css('background-image', 'url(images/changePassAdd/0-123-keyboard-2.png)');
                    $animObj.parent().find(':first-child').css('background-image', 'url(images/changePassAdd/0-123-keyboard-1.png)');
                    $animObj.parent().parent().parent().find('.min-num-buttons').css('display', '');
                    $animObj.parent().parent().parent().find('.num-buttons').css('display', 'none');
                    $animObj.attr('NeedNums', true);
                }
                break;
            default:
                lastFocusedInput.value = lastFocusedInput.value + $animObj[0].textContent;
        }
    };
    $('.login, .password').focus(function () {
        lastFocusedInput = this;
    });
    $('.num-buttons-selected').click(function () {
        selectedAnimFunc($(this), loginButtonsLogicFunc);
    }).hover(function () {
        hoverEnterAnimFunc($(this));
    }, function () {
        hoverLeaveAnimFunc($(this));
    });

    // конопка смены пароля
    // Обработка на переход назад
    $('#change-pass-back').click(function () {
        selectedAnimFunc($(this),
            function () {
                goToForm('backward');
            }
        );
    }).hover(function () {
        hoverEnterAnimFunc($(this));
    }, function () {
        hoverLeaveAnimFunc($(this));
    });
    $("#change-password-form").on('keydown', function (e) {
        if (e.keyCode == 13) {
            $('#change-pwd-selected').click();
        }
    });
    $('.change-pass-button-selected').click(function () {
        selectedAnimFunc($(this), function () {
            goToForm('forward2');
            if (lastFocusedInput && ($(lastFocusedInput).parent()[0] == $('#change-password-form')[0])) {
                $(lastFocusedInput).focus();
            } else {
                $('#change-password-form .login').focus();
            }
        });
    }).hover(function () {
        hoverEnterAnimFunc($(this));
    }, function () {
        hoverLeaveAnimFunc($(this));
    });

    // На аккаунте тоже переходим
    if (fromCardEnter || APIManager.isAPIUser() || localStorage.isTerminal) {
        $('.change-pass-button-selected').css('display', 'none');
        $('.change-pass-button').css('display', 'none');
    } else {
        $('#account').click(function () {
            goToForm('forward2');
            if (lastFocusedInput && ($(lastFocusedInput).parent()[0] == $('#change-password-form')[0])) {
                $(lastFocusedInput).focus();
            } else {
                $('#change-password-form .login').focus();
            }
        });
    }

    $('#change-pwd-selected').click(function () {
        selectedAnimFunc($(this), function () {
            var $cpfInputs = $('#change-password-form .login, #change-password-form .password');
            changeUserPassword(
                $($cpfInputs[0]).val(),
                $($cpfInputs[1]).val(),
                $($cpfInputs[2]).val(),
                $($cpfInputs[3]).val(),
                function () {
                    loginUser($($cpfInputs[0]).val(), $($cpfInputs[2]).val(), '', function () {
                        updateUser();
                        $($cpfInputs[0]).val('');
                        $($cpfInputs[1]).val('');
                        $($cpfInputs[2]).val('');
                        $($cpfInputs[3]).val('');
                    });
                    //goToForm('backward');
                }
            );
            //goToForm('forward');
        });
    }).hover(function () {
        hoverEnterAnimFunc($(this));
    }, function () {
        hoverLeaveAnimFunc($(this));
    });


    // Обновления состояний пользователя в системе
    function updateUserStates(Logged) {
        if (Logged) {
            $('.not_logged').hide();
        } else {
            // Показываем кнопки
            $('.already_logged').hide();
            $('.not_logged').show();
            return;
        }
        if (clientInfoGlobal.hall != 'DEMO') {
            // Не показываем кнопки
            $('.already_logged').show();
        } else {
            $('.already_logged').hide();
        }
    }

    // Обновляем состояние показа кнопок на сайте
    updateUserStates(IsLogged);

    // Получить HTML строку элемента контента
    // Деление на цело
    function div(val, by) {
        return parseFloat((val - val % by) / by);
    }

    var leftConst = -813;
    var gameStep = 324;
    var topConst = 65;
    var gameHalfHeight = 150;
    var needCol = 4;

    // Обработчик на клик игры
    var gameOnClickFunc = function (event) {
        // We collect Google analytics on game launches
        //ga('send', 'event', 'Игры', $(this).attr('runConfig')+' '+$(this).attr('gameType'));

        console.log('clicked!');
        goToForm('forward', fullscreenFormFunc);
        // In the game form, we set up the game settings that are in it, so that we can delete them later.
        var $gmForm = $('#game-form1');
        var gmGlob = globalContentItems[parseInt($(this).attr('gmGlobInd'))];
        $gmForm.attr({runConfig: gmGlob.runConfig, gameType: gmGlob.gameType});

        // Выставляем мобильный режим
        if (event.altKey && event.shiftKey) {
            mobileMode = true;
        } else {
            mobileMode = isMobile.any;
        }

        // Назначаем бэкграунд если он есть для игры
        const gameBG = FLGUtils.staticRootPath + (gmGlob.gameBG ? gmGlob.gameBG : 'images/games-bg/keno-bg.jpg');
        $gmForm.css('background-image', 'url(' + gameBG + ')');
        // if (gmGlob.gameBG) {$gmForm.css('background-image', 'url(' + gmGlob.gameBG + ')'); }
        // else { $gmForm.css('background-image', 'url(images/games-bg/keno-bg.jpg)'); }

        // стоит мрежим мобилки Выключаем бг
        if (mobileMode) {
            $gmForm.css('background-image', 'none');
        }

        window['init' + gmGlob.runConfig + 'Object']('game-form1', gmGlob.gameType, true);
        // ВЫполняем ресайз чтобы корректно отработали блокировка на портрайт
        resize();
    };

    // Генерируем объект игры
    function getMainContentItemHTML(mainContentItem, iteration) {
        let excludeSid = [71, 21, 15, 22, 23, 24, 25, 26, 27, 28];
        if (FLGUtils.isDev) excludeSid = [42, 71]
        if (mainContentItem.sid && excludeSid.includes(parseInt(mainContentItem.sid))) return;

        function getPosByIteration() {
            return 'top: ' + parseFloat(topConst * (div(iteration, needCol) + 1) + gameHalfHeight * div(iteration, needCol)) +
                'px;left: ' + parseFloat(leftConst + (gameStep * (iteration + 1) - gameStep * needCol * div(iteration, needCol))) +
                'px';
        }

        function addContentItem() {
            var $posItem = $('<div class="top-align scalable-offsets" style="' + getPosByIteration() + '"></div>');
            var $game = $('<div class="game top-align" gmGlobInd="' + iteration + '">' +
                '<div class="front" style="background: url(' + FLGUtils.staticRootPath + mainContentItem.image + ') no-repeat 100% 100%; background-size: contain;"></div>' +
                '<div class="back" style="background: url(' + FLGUtils.staticRootPath + mainContentItem.imageBack + ') no-repeat 100% 100%; background-size: contain;"></div>' +
                '</div>');
            // var $game = $('<div class="game scalable-offsets" runConfig="'+mainContentItem.runConfig+'" gameType="'+mainContentItem.gameType+'">'+
            // 	'<div class="front" style="background: url('+mainContentItem.image+') no-repeat 100% 100%; background-size: contain;"></div>'+
            // 	'<div class="back" style="background: url('+mainContentItem.imageBack+') no-repeat 100% 100%; background-size: contain;"></div>'+
            // 	'</div>');
            $game.append('<div class="game-label top-align scalable-offsets" style="font-size: 20px">' + mainContentItem.caption + '</div>');
            $game.flip({
                axis: 'y',
                trigger: 'hover',
                speed: 300,
                reverse: true
            });
            // Если игра не разрешена в демо то назначаем ей стиль и обработчик на клик
            if ((!IsLogged || clientInfoGlobal.hall == 'DEMO') && !mainContentItem.playInDemo) {
                $game.addClass('disable-game');
            } else {
                // Назначаем обработчик на клик
                $game.click(gameOnClickFunc);
            }
            $posItem.append($game);
            return $posItem;
        }

        return addContentItem();
    }

    // Добавляем элементы контента
    var $gmContent = $('#games-container'), i;
    for (i = 0; i < globalContentItems.length; i++) {
        $gmContent.append(getMainContentItemHTML(globalContentItems[i], i));
    }

    // Собираем элементы которым надо масштабировать смещения
    var scalableOffsets = $('.scalable-offsets');
    needToScaleOffsetElements = [];
    for (i = 0; i < scalableOffsets.length; i++) {
        needToScaleOffsetElements.push({
            jqueryObj: $(scalableOffsets[i]),
            origOffset: {
                top: parseInt($(scalableOffsets[i]).css('top')),
                left: parseInt($(scalableOffsets[i]).css('left'))
            }
        });
    }

    // обработка высоты контента
    function resize() {
        // var setIphoneHeightFunc = function ($gameForm) {
        //     var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        //     // Проверяем размер для устройств
        //     // if ( userAgent.match( /iPhone/i) && (userAgent.match(/Version\/[\d\.]+.*Safari/))) {
        //     // 	// IPhone 4
        //     // 	if (window.screen.height <= 480) {
        //     // 		$gameForm.css({ 'padding-top': 55+'px', 'padding-bottom': 55+'px' });
        //     // 	}
        //     // 	// IPhone 5
        //     // 	else if (window.screen.height <= 568) {
        //     // 		$gameForm.css({ 'padding-top': 45+'px', 'padding-bottom': 45+'px' });
        //     // 	}
        //     // 	// IPhone 6,7
        //     // 	else if (window.screen.height <= 667) {
        //     // 		$gameForm.css({ 'padding-top': 45+'px', 'padding-bottom': 45+'px' });
        //     // 	}
        //     // 	// IPhone 6+,7+
        //     // 	else if (window.screen.height <= 736) {
        //     // 		$gameForm.css({ 'padding-top': 45+'px', 'padding-bottom': 45+'px' });
        //     // 	}
        //     // }
        // };

        // I only want to redirect iPhones, Android phones and a handful of 7" devices
        if (isMobile.any) {
            $('body').css('height', document.documentElement.clientHeight + document.documentElement.clientHeight / 2 + 'px');
        }
        //$("#space-bg .space-img").height($(window).height()*1.10);
        //$('#games-form #games-form-header').width($(window).width());
        // Масштабируем элементы управления в зависимости от ширины экрана
        var localSiteScale;
        var winWidth = $(window).width();
        var winHeight = $(window).height();

        // setTimeout(function () {alert("Hit resize!");}, 1000);
        // var winHeight = Math.max(
        //     document.body.scrollHeight, document.documentElement.scrollHeight,
        //     document.body.offsetHeight, document.documentElement.offsetHeight,
        //     document.body.clientHeight, document.documentElement.clientHeight
        // );

        // Если портрайт перещитываем сетку игр
        var isPortrait = (winWidth < winHeight) && (isMobile.any);
        // calcGamesGrid((isPortrait) ? -489 : -813, 324, 65, 150, (isPortrait) ? 2 : 4);

        // Пишем свои медиа запросы
        if (winWidth >= 1470) {
            localSiteScale = 1;
        } else if (winWidth < 1470 && winWidth >= 1200) {
            localSiteScale = 1470 / relativeWidth;
        } else if (winWidth < 1200 && winWidth >= 992) {
            localSiteScale = 1200 / relativeWidth;
        } else if (winWidth < 992 && winWidth >= 768) {
            localSiteScale = 992 / relativeWidth;
        } else if (winWidth < 768 && winWidth >= 480) {
            localSiteScale = 768 / relativeWidth;
        } else if (winWidth < 480 && winWidth >= 320) {
            localSiteScale = 480 / relativeWidth;
        } else {
            localSiteScale = 320 / relativeWidth;
        }


        // Влючаем загораживалку экрана при портрайт положении мобилки
        if ($('#game-form').css('display') == 'block') {
            if (isPortrait && !window.flgStopRotate) {
                if ($('#rotate_device').css('display') !== 'block') {
                    $('#rotate_device').css('display', 'block');
                    $('html').css('overflow', 'hidden');
                    $('body').css('overflow', 'hidden');
                }
            } else {
                if ($('#rotate_device').css('display') === 'block') {
                    $('#rotate_device').css('display', 'none');
                    $('html').css('overflow', '');
                    $('body').css('overflow', '');
                }
            }
        } else {
            if ($('#rotate_device').css('display') === 'block') {
                $('#rotate_device').css('display', 'none');
                $('html').css('overflow', '');
                $('body').css('overflow', '');
            }
        }

        // Если уже находимся в этом масштабе выходим
        if ((localSiteScale == siteScale) && (prevIsPortrait == isPortrait)) {
            return;
        }
        siteScale = localSiteScale;
        prevIsPortrait = isPortrait;

        // Если портрайт перещитываем сетку игр
        calcGamesGrid((isPortrait) ? -489 * 2 : -813,
            (isPortrait) ? 324 * 2 : 324,
            (isPortrait) ? 65 * 2 : 65,
            (isPortrait) ? 150 * 2 : 150, (isPortrait) ? 2 : 4, isPortrait, localSiteScale);

        // Масштабируем все элементы в списке
        // if (isPortrait) {}
        for (var i = 0; i < needToScaleElements.length; i++) {
            if (!needToScaleElements[i].jqueryObj) {
                needToScaleElements[i].jqueryObj = $(needToScaleElements[i].name);
                needToScaleElements[i].origSize = {
                    w: needToScaleElements[i].jqueryObj.width(),
                    h: needToScaleElements[i].jqueryObj.height()
                };
                needToScaleElements[i].origFontSize = parseInt(needToScaleElements[i].jqueryObj.css('font-size'));
                needToScaleElements[i].origLineHeight = parseInt(needToScaleElements[i].jqueryObj.css('line-height'));

            }

            var tmpScale = (isPortrait && (needToScaleElements[i].jqueryObj.hasClass('game') || needToScaleElements[i].jqueryObj.hasClass('game-label'))) ? siteScale * 2 : siteScale;
            needToScaleElements[i].jqueryObj.css({
                'width': needToScaleElements[i].origSize.w * tmpScale + 'px',
                'height': needToScaleElements[i].origSize.h * tmpScale + 'px',
                'background-size': 'contain',
                'font-size': needToScaleElements[i].origFontSize * tmpScale + 'px',
                'line-height': needToScaleElements[i].origLineHeight * tmpScale + 'px'
            });
        }
        for (var i = 0; i < needToScaleOffsetElements.length; i++) {
            var tmpScale = (isPortrait && (needToScaleOffsetElements[i].jqueryObj.hasClass('game') || needToScaleOffsetElements[i].jqueryObj.hasClass('game-label'))) ? siteScale * 2 : siteScale;
            needToScaleOffsetElements[i].jqueryObj.css({
                'top': needToScaleOffsetElements[i].origOffset.top * tmpScale + 'px',
                'left': needToScaleOffsetElements[i].origOffset.left * tmpScale + 'px'
            });
        }
        // Обрабатываем индивидуальные случаи масштаба
        // Высота хедера
        if (isMobile.any) {
            var $gameFormHeader = $('#games-form-header');
            $gameFormHeader.css('height', 92 * siteScale * 2 + 'px');
            $gameFormHeader.children().each(
                function (i, elem) {
                    if ($(elem).hasClass('logo')) {
                        $(elem).css('top', 30 + '%');
                    } else {
                        $(elem).css('top', 70 + '%');
                    }
                }
            );
            // Игровой контейнер
            $('#games-container').css('top', 92 * siteScale * 2 + 'px');
        } else {
            $('#games-form-header').css('height', 92 * siteScale + 'px');
            // Игровой контейнер
            $('#games-container').css('top', 92 * siteScale + 'px');
        }
        // Вып. список языков
        $('#lang-button-dropdown').css({'padding-top': 66 * siteScale + 'px', 'top': -33 * siteScale + 'px'});
        // Подписи баланса
        $('.value-label').css({
            'font-size': 24 * siteScale + 'px',
            'height': 33 * siteScale + 'px',
            'line-height': 33 * siteScale + 'px'
        });
        // Кнопка обновления
        $('#refresh-balance').css({'width': 22 * siteScale + 'px', 'height': 22 * siteScale + 'px'});
        $('#refresh-balance').css('left', (parseInt($('#balance').css('width')) + 10 * siteScale) + 'px');

        $('#hand-touch-gif img').css({'width': 240 * siteScale + 'px', 'height': 400 * siteScale + 'px'});

    }

    resize();
    // Обрабатываем событие изменения размеров окна (перевычисляем размеры контейнера в соответстивии с окном)
    $(window).resize(resize);
    // function toggleFullScreen() {
    //     var doc = window.document;
    //     var docEl = doc.documentElement;
    //
    //     var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    //     var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    //
    //     if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    //         requestFullScreen.call(docEl);
    //     }
    //     else {
    //         cancelFullScreen.call(doc);
    //     }
    // }
    // toggleFullScreen();
}

// Выставляем баланс на сайте
function setDOMBalance(newBalance) {
    $('#balance').text(numberFormat(newBalance / 100, {thousands_sep: " ", dec_point: ".", needZeros: false}));
    $('#refresh-balance').css('left', (parseInt($('#balance').css('width')) + 10 * siteScale) + 'px');
}

// Проверяем наличие сессии
function checkSession(succesFunc) {
    $.ajax({
        type: 'get',
        url: getUrl(),
        data: {'oper': 'getbalance'},
        dataType: 'json',
        success: function (data, status, jqXHR) {
            succesFunc(data.st == 'ok');
        },
        error: function (data, status, jqXHR) {
            succesFunc(false);
        }
    });
}

// Обновляем данные пользователя
function updateUser(succesFunc) {
    window.FLGIntgrt = null;
    // Если уже был за авторизованный, то не логинем
    $.ajax({
        type: 'get',
        url: getUrl(),
        data: {'oper': 'update'},
        dataType: 'json',
        success: function (data, status, jqXHR) {
            var needToDemoLogin = true;
            // Инициализируем глобальные данные инфо по пользователю
            clientInfoGlobal = data;
            // Сессия протухла, обновляем
            if (data.st == 'critical') {
                redirectByLoginUrl();
                return;
            }
            // Пытается зайти параллельно
            else if ((data.key == 2) && (localKey() == undefined)) {
                console.log('Параллельный вход');
            } else if (data.hall == 'DEMO') {
                localKey(data.key);
            } else {
                // Если ключа нет записываем новый, если есть то его
                localKey(data.key);
                //changeBalanceGlobalFunc(data.balance);
                $('#account').text(data.lgn);
                needToDemoLogin = false;
                if (data.KeySess) {
                    window.FLGIntgrt = 1;
                    FLGUtils.isIntegrator = true;
                    UTILS.postLoading();
                }
            }
            if (succesFunc) {
                updateBalance(function () {
                    succesFunc(needToDemoLogin)
                });
            }
            //if (succesFunc) { succesFunc(needToDemoLogin); }
        },
        error: function (data, status, jqXHR) {
            console.log('Ошибка соединения с сервером');
            redirectByLoginUrl();
        }
    });
}

// Обновляем данные пользователя
function updateBalance(succesFunc) {
    // Если уже был за авторизованный, то не логинем
    $.ajax({
        type: 'get',
        url: getUrl(),
        data: {'oper': 'getbalance'},
        dataType: 'json',
        success: function (data, status, jqXHR) {
            if (data.st != 'ok') {
                redirectByLoginUrl();
                return;
            }
            changeBalanceGlobalFunc(parseInt(data.balance));
            if (succesFunc) {
                succesFunc();
            }
        },
        error: function (data, status, jqXHR) {
            console.log('Ошибка соединения с сервером');
            redirectByLoginUrl();
        }
    });
}

// Логиним данные пользователя
function loginUser(login, password, card, succesFunc, isTerminal) {

    function authError() {
        redirectByLoginUrl();
    }

    $.ajax({
        type: 'get',
        url: getUrl(),
        data: {'oper': 'autz', 'login': login, 'password': password, 'crd': card, istrm: isTerminal},
        success: function (data, status, jqXHR) {
            if ((data != "success1") && (data != "success3")) {
                authError();
            } else {
                // Если вошли по карте
                fromCardEnter = card != '';
                localKey(data.key);
                // Если всё удачно запускаем функцию
                if (succesFunc) {
                    succesFunc();
                }

                $('#login').val('');
                $('#password').val('');
            }
        },
        error: function (data, status, jqXHR) {
            authError();
        }
    });
}

// Логиним данные пользователя
function changeUserPassword(login, password, newPassword1, newPassword2, succesFunc) {

    var $info = $('.info');

    function changePassInfo(text) {
        $info.text(text);
        $info.stop();
        $info.fadeTo(110, 1, 'easeOutExpo', function () {
            setTimeout(function () {
                $info.fadeTo(500, 0, 'linear');
            }, 4000);
        });
    }

    if (newPassword1 != newPassword2) {
        changePassInfo(mainLocalizationTable.changePassErrorDifferent);
        return;
    }
    if ((newPassword1.length < 4) || newPassword1.length > 64) {
        changePassInfo(mainLocalizationTable.changePassErrorLess);
        return;
    }

    $.ajax({
        type: 'get',
        url: getUrl(),
        data: {'oper': 'changepass', 'lgn': login, 'pwd': password, 'npwd': newPassword1},
        success: function (data, status, jqXHR) {
            var jsData = JSON.parse(data);
            if (parseInt(jsData.ErrorID) != 0) {
                changePassInfo(mainLocalizationTable.authError);
            } else {
                // Если всё удачно запускаем функцию
                changePassInfo(mainLocalizationTable.changePassSuccess.replace(/%s/g, login));
                if (succesFunc) {
                    succesFunc();
                }
                //localPath({l:login, p:password, c:card});
            }
            jsData = null;
        },
        error: function (data, status, jqXHR) {
            changePassInfo(mainLocalizationTable.authError);
        }
    });
}

// Выход из логина пользователя
function logout(sucessFunc) {
    if (window.LJS) {
        window.LJS.flgexit();
        return;
    }
    // Если с нашего фрейма зашли и не демо, то не делаем логаут
    if (localStorage.isFrame && mobileMode && (clientInfoGlobal.lgn !== '2430')) {
        if (sucessFunc) {
            sucessFunc();
        }
        redirectByLoginUrl();
        return;
    }
    $.ajax({
        type: 'get',
        url: getUrl(),
        data: {'oper': 'logout'},
        dataType: 'json',
        success: function (data, status, jqXHR) {
            if (sucessFunc) {
                sucessFunc();
            }
            redirectByLoginUrl();
        },
        error: function (data, status, jqXHR) {
            if (sucessFunc) {
                sucessFunc();
            }
            redirectByLoginUrl();
        }
    });
}

// // Ручная ф-ция просчёта для акции чисел с оборота на указанный порог и выставление корректных данных в UI
// // divider - делитель с оборота (для выевления билетов например с оборота 25 и делителем в 10 будет 2.5 билета)
// // возвращает объект с полями, ticketCount - cколько с оборота целого делённого на divider,
// // progress - сколько в процентах до следующего билета
// function KZTPromotions(divider) {
//
// }

// Ф-ция подсчёта оборота с игрока по истории ставок, с последующий кэшированием в localStorage
// Возвращает в серверном формате (в коллбек) int где посдении два числа дробная часть, то есть надо делить на 100
function getUserTurnover(cb) {
    // Айдишник ставки с который начинаем запрос
    var betID = 0;
    // Подготавливаем урл для запроса
    var newServerUrl = getUrl();
    newServerUrl = newServerUrl.replace(/\bsrvloto.php\b/g, '');
    // Общее кол-во ставок
    var totalBetsTurnover = 0;
    // Номер тиража и кешированное на него сумма
    var cachedBetId = null;
    var cachedBetsTurnover = 0;
    var needToCacheBetId = null;
    // Флаг если надо остановить запрос
    var needToStop = false;

    // Проверяем кэш данных (кэшем выступает пара ID ставки и сумма всех предыдущих до неё)
    if (localStorage.prom) {
        try {
            var prom = JSON.parse(localStorage.prom);
            cachedBetId = parseInt(prom.betId);
            cachedBetsTurnover = parseInt(prom.turnover);
        } catch (e) {
            console.log('Ошибка парса прома');
        }
    }

    function fetchHistory() {
        // Запрос на данные
        $.ajax({
            type: 'get',
            url: newServerUrl + 'gamerhistory.ashx',
            data: {'bet': betID},
            dataType: 'json', //тип возвращаемого ответа text либо xml
            success: function (data, status, jqXHR) {//возвращаемый результат от сервера
                // Если ошибка соединения выходим
                if (data.er == 3 || data.er == 1) {
                    console.log('Ошибка соединения с сервером');
                    return;
                }
                // Начинаем работу по созданию таблицы
                if (data.er == 0) {
                    // Сохраняем id следующей ставки
                    betID = data.next;

                    var i, objTypeArray;
                    for (i = 0; i < data.res.length; i++) {
                        // Парсим строку с записью (столбцы)
                        objTypeArray = data.res[i].ev.split('-');
                        // Если внос или снятие или нерасчитан тираж, то идём дальше не учавствует в ротации
                        if (objTypeArray[0] == 0 && objTypeArray[1] == 0) continue;

                        // Пробегаемся по всем ставкам в тираже
                        var j, betsArr = data.res[i].bts.split('|'), betArr;
                        for (j = 0; j < betsArr.length; j++) {
                            betArr = betsArr[j].split('`');
                            // Проверяем статус ставки
                            if (parseInt(betArr[2]) !== 1) {
                                // Запоминаем номер тиража который надо закешировать, если его ещё не записали
                                if (!needToCacheBetId) {
                                    needToCacheBetId = betArr[0];
                                }

                                // Если есть кэш
                                // Проверяем есть совпадает номер тиража с кешированным, то прибавляем сумму кэша к текущему и выходим
                                if (cachedBetId && (cachedBetId == betArr[0])) {
                                    totalBetsTurnover = totalBetsTurnover + cachedBetsTurnover;
                                    needToStop = true;
                                    break;
                                }

                                // Если всё ок добавляем ставки
                                totalBetsTurnover = totalBetsTurnover + parseInt(betArr[4]);
                            }
                        }

                        if (needToStop) break;
                    }

                    // Если надо вызываем рекурсию дальше
                    if (!needToStop && (!data.end || data.end != 1)) {
                        fetchHistory();
                    } else {
                        // После сбора сохраняем данные в кэш (если есть что сохранять)
                        if (needToCacheBetId != cachedBetId) {
                            localStorage.setItem('prom', JSON.stringify({
                                betId: needToCacheBetId,
                                turnover: totalBetsTurnover
                            }));
                        }
                        // Вызывае коллбек
                        cb(totalBetsTurnover);
                    }
                }
                if (data.end && data.end == 1) {
                    $('#showmore').css('visibility', 'hidden');
                }
            },
            error: function (data, status, jqXHR) {//возвращаемый результат от сервера
                console.log('Ошибка соединения с сервером');
            }
        });
    }

    fetchHistory();
}

// Глобальный диалог движения средств
function showCashFlowDlg() {
    // Заварачиваем в обновление юаланса
    updateBalance(function () {
        // Айдишник ставки с который начинаем запрос
        var betID = 0;
        var newServerUrl = getUrl();
        newServerUrl = newServerUrl.replace(/\bsrvloto.php\b/g, '');
        // Локальный баланс
        var balanceLocal = parseFloat(clientInfoGlobal.balance / 100);
        // Таблица локализации
        mainLocalizationTable = mainLocalizator.getLocalizationTable();
        // Словарь названвания игр
        var serviceDict = {};
        // Переменная главной таблицы
        var mainTable, childTable = {};
        // Общее кол-во ставок
        var $amountBetsDOM, totalAmountBets = 0;
        // Скролл
        //var fancyboxInner = $('.fancybox-inner')[0],scrollTop = fancyboxInner.scrollTop;
        var fancyboxInner, scrollTop;

        //2;"Poker T.H._4"
        //3;"Poker T.H._6"
        //4;"Poker T.H._8"
        //6;"Fortuna 3min"
        //7;"Keno 4min"
        //8;"Fortuna-Bet"
        //9;"Keno Bet"
        //10;"Keno Gold"
        //11;"Keno 2min"
        //12;"Fortuna Loto"
        //13;"Fortuna 1,5min"
        //14;"Dog Race 8"
        //15;"Horse Race 8"
        //16;"Dog Race 6"
        //17;"Horse Race 6"
        //19;"JX Keno"
        //20;"inbet keno"
        //21;"inbet xkeno"
        //22;"inbet fortuna"
        //25;"SicBo 3min"
        //26;"SicBo 1,5min"
        //27;"SicBo 1min"
        //30;"Keno 1min"
        //31;"Keno 22"

        // Получить корректный баланс
        function getCorrectBalance(bets, wins) {
            if (bets && bets != '') {
                balanceLocal = balanceLocal + parseFloat(bets.split(' ').join(''));
            }
            if (wins && wins != '') {
                balanceLocal = balanceLocal - parseFloat(wins.split(' ').join(''));
            }
            return balanceLocal;
        }

        // выставляем корректные данные по выигишу и проч (использовать везде)
        function getCorrect(value) {
            // Если значения нет или undefined то возвращяем пустоту
            if (!value) {
                return '';
            }
            return numberFormat(+(parseInt(value) / 100).toFixed(2), {
                thousands_sep: " ",
                dec_point: ".",
                needZeros: false
            });
        }

        // Увеличиваем общий счётчик ставок
        function incTotalAmountBets(value) {
            if (value == '') return;
            totalAmountBets = totalAmountBets + parseInt(value);
            if ($amountBetsDOM) {
                $amountBetsDOM.text(mainLocalizationTable.lastXBets.replace(/%s/g, totalAmountBets));
            }
        }

        // Получаем данные для обновления таблицы
        function getDataForTable(initTableFunc) {

            // Приготовить данные для построения таблицы
            function getCorrectDataForTable(betsData) {

                // Получаем объект операции
                function getTypeObj(operData) {

                    // Тип записи тираж, съём или пополнение
                    // Парсим например "0-0-50958"
                    var objTypeArray = operData.ev.split('-');
                    // objTypeArray[0] и objTypeArray[1]- это 0 (значит снятие или пополнение)
                    // иначе objTypeArray[0] - это тип игры в справочнике, а objTypeArray[1] - 1 это просто так
                    // Флаг является ли взносом или снятием
                    var isPaidOrSpl = (objTypeArray[0] == 0 && objTypeArray[1] == 0);

                    // получить тип приложения по ключу в справочнике
                    function getTypeByKey(key) {

                        if (isPaidOrSpl) {
                            if (parseInt(key.st) > -1) {
                                return mainLocalizationTable.added;
                            } else {
                                return mainLocalizationTable.withdrew;
                            }
                        }

                        // если пусто то возвращаем что есть
                        if (serviceDict == {}) {
                            return objTypeArray[0]
                        }
                        var returnVal = serviceDict[objTypeArray[0]];
                        // Если ошибка в словаре, то также возвращаем то что пришло
                        if (!returnVal) {
                            returnVal = objTypeArray[0];
                        }
                        return returnVal;
                    }

                    // получаем детализацию на уровне ставок в раунде игры
                    function getRoundDetails() {
                        // Если пополнение снятие то не чего не возвращаем
                        if (isPaidOrSpl) {
                            var returnArr = [];
                            returnArr.push({
                                date: operData.dt.replace(/\b \b/g, '&nbsp&nbsp'),
                                state: '',
                                betName: '',
                                summ: '',
                                coef: '',
                                win: ''
                            });
                            return returnArr;
                        }

                        // получить состояние по ставке
                        function getStateByBet(state, betWin, JPWin) {

                            function getStateWithJP(st) {
                                if (JPWin != '0') {
                                    return mainLocalizationTable.Jackpot + '/' + st;
                                } else {
                                    return st;
                                }
                            }

                            switch (state) {
                                case 1:
                                    return mainLocalizationTable.inProcessing;
                                    break;
                                case 2:
                                    return getStateWithJP(mainLocalizationTable.loss);
                                    break;
                                case 5:
                                    if (betWin == JPWin) {
                                        return getStateWithJP(mainLocalizationTable.loss);
                                    } else {
                                        return getStateWithJP(mainLocalizationTable.won);
                                    }
                                    break;
                                case 6:
                                    if (betWin > 0) {
                                        return getStateWithJP(mainLocalizationTable.waitingForPay);
                                    } else {
                                        return getStateWithJP(mainLocalizationTable.loss);
                                    }
                                    break;
                                case 7:
                                    if (betWin > 0) {
                                        return getStateWithJP(mainLocalizationTable.won);
                                    } else {
                                        return getStateWithJP(mainLocalizationTable.loss);
                                    }
                                    break;
                                default:
                                    return '';
                            }
                        }

                        // Получить имя ставки (актуально для рулетки)
                        function getBetName(betPropsArray) {
                            // var combStr = betPropsArray.slice(7).join(' ');
                            var combStr = betPropsArray.slice(7).join(' ');
                            // Проверяем номера сервисов
                            if (objTypeArray[0] == 13 || objTypeArray[0] == 6 || objTypeArray[0] == 34 || objTypeArray[0] == 12 || objTypeArray[0] == 38 || objTypeArray[0] == 53
                                || objTypeArray[0] == 54 || objTypeArray[0] == 57 || objTypeArray[0] == 63) {
                                return getBetNameByCombinationCode(combStr, mainLocalizator.currentLang());
                            }
                            // Если это пинальти
                            else if (objTypeArray[0] == 35) {
                                return getPenaltyNameByCode(combStr, mainLocalizator.currentLang());
                            }
                            // Если это скачки собак и лошадей
                            else if (objTypeArray[0] == 15 || objTypeArray[0] == 14) {
                                return getRaceNameByCode(combStr, mainLocalizator.currentLang());
                            } else if (objTypeArray[0] == 7 || objTypeArray[0] == 10 || objTypeArray[0] == 11 || objTypeArray[0] == 30 || objTypeArray[0] == 31 || objTypeArray[0] == 49 || objTypeArray[0] == 19) {
                                // Если нет результатов то не чего в этом случае и не пишем
                                if (!operData.rs || operData.rs == '') return '';

                                var betArr = combStr.split(' ');
                                var i, rsCombStr = '';
                                var rsArr = operData.rs.split('|');
                                for (i = 0; i < betArr.length; i++) {
                                    if (rsArr.indexOf(betArr[i]) > -1) {
                                        rsCombStr = rsCombStr + '<div class="history__keno-ball win" data-ind="' + i + '">' + betArr[i] + '</div>';
                                    } else {
                                        rsCombStr = rsCombStr + '<div class="history__keno-ball lose" data-ind="' + i + '">' + betArr[i] + '</div>';
                                    }
                                }

                                if (betArr.length > 1) {
                                    return '<div class="results-details-sort sort-button-in-cashflow">&gt;</div><span class="result">' + rsCombStr + '</span>';
                                } else {
                                    return rsCombStr;
                                }
                            }
                            // Lotto bets
                            else if (objTypeArray[0] == 42) {
                                // Если нет результатов то не чего в этом случае и не пишем
                                if (!operData.rs || operData.rs == '') return '';


                                var lttResults = operData.rs.split(';');
                                lttResults = lttResults[0].split('|');
                                var lttResArr = [
                                    lttResults.slice(0, 5),
                                    lttResults.slice(5, 11),
                                    lttResults.slice(11, 18)
                                ];


                                var betArr = combStr.split(';');
                                // 0 - game num, 1 - coef table
                                var betOpt = betArr[1].split(' ');
                                var gameNum = parseInt(betOpt[0], 10) - 1;
                                var gmColor;
                                switch (gameNum) {
                                    case 0:
                                        gmColor = '#1d5fff';
                                        break;
                                    case 1:
                                        gmColor = '#e11b22';
                                        break;
                                    case 2:
                                        gmColor = '#12a500';
                                        break;
                                }

                                betArr = betArr[0].split(' ');
                                var i, rsCombStr = '';
                                // Get res by game
                                var rsArr = lttResArr[gameNum];
                                for (i = 0; i < betArr.length; i++) {
                                    if (rsArr.indexOf(betArr[i]) > -1) {
                                        rsCombStr = rsCombStr + '<div class="history__keno-ball win" data-ind="' + i + '">' + betArr[i] + '</div>';
                                    } else {
                                        rsCombStr = rsCombStr + '<div class="history__keno-ball lose" data-ind="' + i + '">' + betArr[i] + '</div>';
                                    }
                                }

                                if (betArr.length > 1) {
                                    return '<div class="results-details-sort sort-button-in-cashflow">&gt;</div><span style="color:' + gmColor + '">#' + betOpt[1] + '</span> <span class="result">' + rsCombStr + '</span>';
                                } else {
                                    return rsCombStr;
                                }
                            } else return combStr;
                        }

                        // Получаем дату в нужном формате
                        function getDate(date) {

                            function formatZero(num) {
                                return ((num < 10) && (num >= 0)) ? '0' + num : num;
                            }

                            // 04-07-2018 10:46:31
                            // Разделяем по пробелу отдельно дату и отдельно время
                            var tmpArr = date.split(' ');
                            // Разделяем для даты и времени соответсвенно
                            var dateTmp = tmpArr[0].split('-');
                            var timeTmp = tmpArr[1].split(':');
                            // Смещаем по заданному в клубе времени (- 3 это смещение от москвы)
                            timeTmp[0] = parseInt(timeTmp[0]) + parseInt(clientInfoGlobal.tmz) - 3;
                            var offsetDate = new Date(parseInt(dateTmp[2]), parseInt(dateTmp[1]) - 1, parseInt(dateTmp[0]), timeTmp[0], parseInt(timeTmp[1]), parseInt(timeTmp[2]));
                            // Обратно форматируем в нужный нам формат
                            dateTmp = [formatZero(offsetDate.getDate()), formatZero(offsetDate.getMonth() + 1), formatZero(offsetDate.getFullYear())];
                            timeTmp = [formatZero(offsetDate.getHours()), formatZero(offsetDate.getMinutes()), formatZero(offsetDate.getSeconds())];

                            return dateTmp.join('-') + ' ' + timeTmp.join(':');
                        }

                        // Сплитим ставки по |
                        var betsArr = operData.bts.split('|'), i, returnArr = [];
                        var curBetArr = [];
                        // В текущей ставки такая нотация
                        //curBetArr[0] - это индитификатор ставки (её код)
                        //curBetArr[1] - это дата ставки
                        //curBetArr[2] - состояние (1 в процессе, 2 проигрышь, 5 выигрыш, 6 если положительный выигрыш то ожиидает выплаты иначе проигрыш, 7 если выигрыш>0 то выигрыш иначе проигрыш)
                        //curBetArr[3] - это коэфициент делить на 100
                        //curBetArr[4] - это сумма ставки
                        //curBetArr[5] - это сумма выигрыша
                        //curBetArr[6] - это сумма джек пота (если надо)
                        //curBetArr[7-17] - это сама ставки на игру (лоттерея 1 число, кено 10)

                        for (i = 0; i < betsArr.length; i++) {
                            curBetArr = betsArr[i].split('`');

                            // Если это покер
                            if (objTypeArray[0] == 18) {
                                // Разбираем коды для информаци по покеру
                                var combStr = curBetArr.slice(7).join(' ');
                                // Номер стола 1 - красный #e11b22, 2 - зелёный #12a500, 3 - синий #1d5fff
                                var tableNum = combStr[0];
                                var tableColor;
                                // Получаем цвет для цифры стола
                                switch (tableNum) {
                                    case '1':
                                        tableColor = '#e11b22';
                                        break;
                                    case '2':
                                        tableColor = '#12a500';
                                        break;
                                    case '3':
                                        tableColor = '#1d5fff';
                                        break;
                                    default:
                                        tableColor = '#e11b22';
                                }

                                // Получаем этап, фазу игры
                                // Для покера она в 8-м элементом массива ставок идёт
                                var phase;
                                switch (curBetArr[8]) {
                                    case '12':
                                        phase = 'Flop';
                                        break;
                                    case '13':
                                        phase = 'Turn';
                                        break;
                                    case '14':
                                        phase = 'River';
                                        break;
                                }

                                // Получаем данные по коду ставки покера
                                var pokerBetCode = combStr[1] + combStr[2];
                                var pokerBetObj = {};
                                var pokerResPath = 'games/Poker/resources/';
                                switch (pokerBetCode) {
                                    case '00':
                                        pokerBetObj.combName = 'High Card';
                                        pokerBetObj.lable = 'HC';
                                        break;
                                    case '01':
                                        pokerBetObj.combName = 'One Pair';
                                        pokerBetObj.lable = 'OP';
                                        break;
                                    case '02':
                                        pokerBetObj.combName = 'Two Pairs';
                                        pokerBetObj.lable = 'TP';
                                        break;
                                    case '03':
                                        pokerBetObj.combName = '3 of a Kind';
                                        pokerBetObj.lable = 'TK';
                                        break;
                                    case '04':
                                        pokerBetObj.combName = 'Straight';
                                        pokerBetObj.lable = 'St';
                                        break;
                                    case '05':
                                        pokerBetObj.combName = 'Flush';
                                        pokerBetObj.lable = 'Fl';
                                        break;
                                    case '06':
                                        pokerBetObj.combName = 'Full House';
                                        pokerBetObj.lable = 'FH';
                                        break;
                                    case '07':
                                        pokerBetObj.combName = '4 of a Kind';
                                        pokerBetObj.lable = 'FK';
                                        break;
                                    case '08':
                                        pokerBetObj.combName = 'Street Flush';
                                        pokerBetObj.lable = 'SF';
                                        break;
                                    case '09':
                                        pokerBetObj.combName = 'Spade';
                                        pokerBetObj.imgUrl = pokerResPath + 'zone_suit_pi_history.png';
                                        break;
                                    case '10':
                                        pokerBetObj.combName = 'Heart';
                                        pokerBetObj.imgUrl = pokerResPath + 'zone_suit_ch_history.png';
                                        break;
                                    case '11':
                                        pokerBetObj.combName = 'Diamond';
                                        pokerBetObj.imgUrl = pokerResPath + 'zone_suit_bu_history.png';
                                        break;
                                    case '12':
                                        pokerBetObj.combName = 'Club';
                                        pokerBetObj.imgUrl = pokerResPath + 'zone_suit_tr_history.png';
                                        break;
                                    case '13':
                                        pokerBetObj.combName = 'Black';
                                        pokerBetObj.imgUrl = pokerResPath + 'zone_suit_black_history.png';
                                        break;
                                    case '14':
                                        pokerBetObj.combName = 'Red';
                                        pokerBetObj.imgUrl = pokerResPath + 'zone_suit_red_history.png';
                                        break;
                                    case '15':
                                        pokerBetObj.combName = tableNum + '1';
                                        pokerBetObj.imgUrl = pokerResPath + 'player-black.png';
                                        pokerBetObj.lable = mainLocalizationTable.player;
                                        break;
                                    case '16':
                                        pokerBetObj.combName = tableNum + '2';
                                        pokerBetObj.imgUrl = pokerResPath + 'player-black.png';
                                        pokerBetObj.lable = mainLocalizationTable.player;
                                        break;
                                    case '17':
                                        pokerBetObj.combName = tableNum + '3';
                                        pokerBetObj.imgUrl = pokerResPath + 'player-black.png';
                                        pokerBetObj.lable = mainLocalizationTable.player;
                                        break;
                                    case '18':
                                        pokerBetObj.combName = tableNum + '4';
                                        pokerBetObj.imgUrl = pokerResPath + 'player-black.png';
                                        pokerBetObj.lable = mainLocalizationTable.player;
                                        break;
                                    case '19':
                                        pokerBetObj.combName = tableNum + '5';
                                        pokerBetObj.imgUrl = pokerResPath + 'player-black.png';
                                        pokerBetObj.lable = mainLocalizationTable.player;
                                        break;
                                    case '20':
                                        pokerBetObj.combName = tableNum + '6';
                                        pokerBetObj.imgUrl = pokerResPath + 'player-black.png';
                                        pokerBetObj.lable = mainLocalizationTable.player;
                                        break;
                                    case '21':
                                        pokerBetObj.combName = tableNum + '7';
                                        pokerBetObj.imgUrl = pokerResPath + 'player-black.png';
                                        pokerBetObj.lable = mainLocalizationTable.player;
                                        break;
                                    case '22':
                                        pokerBetObj.combName = tableNum + '8';
                                        pokerBetObj.imgUrl = pokerResPath + 'player-black.png';
                                        pokerBetObj.lable = mainLocalizationTable.player;
                                        break;
                                }

                                // генерируем строку для вставки в комбинацию
                                var pokerBetStr = '<div style="display: flex; justify-content: center; align-items: center;">';
                                // Потом подпись если "рука" игрока
                                if (pokerBetObj.imgUrl && pokerBetObj.lable) {
                                    pokerBetStr = pokerBetStr + '<img src="' + pokerBetObj.imgUrl + '" style="height: 26px; width: 26px;">&nbsp&nbsp';
                                    pokerBetStr = pokerBetStr + pokerBetObj.lable + '&nbsp&nbsp';

                                } else if (pokerBetObj.imgUrl) {
                                    // Сначала добавляем рисунок
                                    pokerBetStr = pokerBetStr + '<img src="' + pokerBetObj.imgUrl + '" style="height: 26px; width: 26px;">&nbsp&nbsp';
                                } else if (pokerBetObj.lable) {
                                    // Иначе это две буквы сокращение комбинации
                                    pokerBetStr = pokerBetStr + '<span style="color: ' + tableColor + '"><b>' + pokerBetObj.lable + '</b></span>&nbsp&nbsp';
                                }
                                // И обычное название комбинации
                                if (pokerBetObj.combName) {
                                    pokerBetStr = pokerBetStr + pokerBetObj.combName;
                                }

                                // Если есть данные для комбинации руки и это рука игрока
                                if (typeObj.pokerData && (pokerBetObj.imgUrl && (pokerBetObj.lable == mainLocalizationTable.player))) {
                                    // Get second char from comb index
                                    var comb = typeObj.pokerData[(parseInt(tableNum, 10) - 1)][parseInt(pokerBetObj.combName[1], 10) - 1];
                                    pokerBetStr = pokerBetStr + '<div style="display: flex; justify-content: center; align-items: center;">' +
                                        comb.firstCard + comb.secondCard +
                                        '</div>';
                                }

                                pokerBetObj = null;
                                pokerBetStr = pokerBetStr + '</div>';

                                // Заполняем ставку
                                returnArr.push({
                                    date: getDate(curBetArr[1]).replace(/\b \b/g, '&nbsp&nbsp'),
                                    state: getStateByBet(parseInt(curBetArr[2]), parseInt(curBetArr[5]), parseInt(curBetArr[6])),
                                    table: '<span style="color: ' + tableColor + '">' + tableNum + '</span>',
                                    comb: pokerBetStr,
                                    phase: phase,
                                    summ: getCorrect(curBetArr[4]),
                                    coef: 'X ' + getCorrect(curBetArr[3]),
                                    win: getCorrect(curBetArr[5])
                                });
                            } else {
                                // Заполняем ставку
                                returnArr.push({
                                    date: getDate(curBetArr[1]).replace(/\b \b/g, '&nbsp&nbsp'),
                                    state: getStateByBet(parseInt(curBetArr[2]), parseInt(curBetArr[5]), parseInt(curBetArr[6])),
                                    betName: getBetName(curBetArr),
                                    summ: getCorrect(curBetArr[4]),
                                    coef: 'X ' + getCorrect(curBetArr[3]),
                                    win: getCorrect(curBetArr[5])
                                });
                            }
                        }
                        return returnArr;
                    }

                    // Получить строку результата (с кнопочкой или без)
                    function getResults(value) {
                        // If it is Poker game, get spec result for this (cards and player comb)
                        if (objTypeArray[0] == 18) {
                            if (value === '') return value;

                            function getCardById(id) {
                                var intId = parseInt(id, 10);
                                var returnVal = {};
                                // Get suit for card by id
                                var remOfDiv = intId % 4;
                                switch (remOfDiv + 1) {
                                    case 4:
                                        returnVal.suit = 'club';
                                        returnVal.color = 'black';
                                        break;
                                    case 1:
                                        returnVal.suit = 'spade';
                                        returnVal.color = 'black';
                                        break;
                                    case 2:
                                        returnVal.suit = 'heart';
                                        returnVal.color = 'red';
                                        break;
                                    case 3:
                                        returnVal.suit = 'diamond';
                                        returnVal.color = 'red';
                                        break;
                                }
                                // Get card name by id
                                switch ((intId - remOfDiv) / 4) {
                                    case 0:
                                        returnVal.name = 'A';
                                        break;
                                    case 1:
                                        returnVal.name = 'K';
                                        break;
                                    case 2:
                                        returnVal.name = 'Q';
                                        break;
                                    case 3:
                                        returnVal.name = 'J';
                                        break;
                                    case 4:
                                        returnVal.name = '10';
                                        break;
                                    case 5:
                                        returnVal.name = '9';
                                        break;
                                    case 6:
                                        returnVal.name = '8';
                                        break;
                                    case 7:
                                        returnVal.name = '7';
                                        break;
                                    case 8:
                                        returnVal.name = '6';
                                        break;
                                    case 9:
                                        returnVal.name = '5';
                                        break;
                                    case 10:
                                        returnVal.name = '4';
                                        break;
                                    case 11:
                                        returnVal.name = '3';
                                        break;
                                    case 12:
                                        returnVal.name = '2';
                                        break;
                                }

                                return returnVal;
                            }

                            function getPokerCombById(id) {
                                switch (parseInt(id, 10)) {
                                    case 0:
                                        return 'High Card';
                                    case 1:
                                        return 'One Pair';
                                    case 2:
                                        return 'Two Pairs';
                                    case 3:
                                        return '3 of a Kind';
                                    case 4:
                                        return 'Straight';
                                    case 5:
                                        return 'Flush';
                                    case 6:
                                        return 'Full House';
                                    case 7:
                                        return '4 of a Kind';
                                    case 8:
                                        return 'Straight Flush';
                                }
                            }

                            function getDomCardByCard(card, needShadow) {
                                var suitImg, crdColor;
                                switch (card.suit) {
                                    case 'spade':
                                        suitImg = 'games/Poker/resources/cards-table-pi.png';
                                        break;
                                    case 'heart':
                                        suitImg = 'games/Poker/resources/cards-table-ch.png';
                                        break;
                                    case 'diamond':
                                        suitImg = 'games/Poker/resources/cards-table-bu.png';
                                        break;
                                    case 'club':
                                        suitImg = 'games/Poker/resources/cards-table-tr.png';
                                        break;
                                }
                                // Set color
                                if (card.color == 'red') {
                                    crdColor = '#e11b22';
                                } else {
                                    crdColor = '#000000';
                                }

                                var classes = (needShadow) ? 'poker-card poker-card-shadow' : 'poker-card';
                                return '<div style="position: relative;">' +
                                    '<img src="' + suitImg + '" class="' + classes + '">' +
                                    '<span style="font-size: 12px; color: ' + crdColor + '; position: absolute; left: 8px; top: -4px; font-weight: 600;">' + card.name + '</span>' +
                                    '</div>';
                            }

                            // 0 - red table 4 players
                            // 1 - green table 6 players
                            // 2 - green table 8 players
                            var tables = value.split(' ');

                            var pokerDomStr = '', i, tbColor;
                            // Poker data to store information by players combs
                            var pokerData = [];
                            pokerDomStr = pokerDomStr + '<div style="display: flex; align-items: center; justify-content: flex-start; flex-wrap: wrap;">';

                            for (i = 0; i < tables.length; i++) {

                                switch (i) {
                                    case 0:
                                        tbColor = '#e11b22';
                                        break;
                                    case 1:
                                        tbColor = '#12a500';
                                        break;
                                    case 2:
                                        tbColor = '#1d5fff';
                                        break;
                                }
                                // Every table has array where
                                // 0 - win poker comb
                                // 1 - 5 result cards
                                // 6 - n-1 players pair
                                // n - mask for win players
                                tables[i] = tables[i].split('`');

                                // Add player comb
                                var j, playerCombs = [], winPlayerCombs = [];
                                // Get count for pow mask
                                var powInd = ((tables[i].length - 1 - 6) / 2) - 1;
                                for (j = 6; j < tables[i].length - 1; j += 2) {
                                    var isWin = (parseInt(tables[i][tables[i].length - 1], 10) & ((powInd === 0) ? 1 : Math.pow(2, powInd))) > 0;

                                    var playerComb = {
                                        firstCard: getDomCardByCard(getCardById(tables[i][j]), isWin),
                                        secondCard: getDomCardByCard(getCardById(tables[i][j + 1]), isWin),
                                        // Check win mask for player
                                        isWin: isWin,
                                        playerNum: (i + 1) * 10 + ((j - 6) / 2 + 1),
                                    };

                                    playerCombs.push(playerComb);
                                    // Add win player(s)
                                    if (playerComb.isWin) {
                                        winPlayerCombs.push(playerComb);
                                    }
                                    powInd--;
                                }
                                pokerData.push(playerCombs);
                                // box-shadow: 0 0 10px rgba(254,241,96,0.5);
                                // rgba(254, 241, 96, 1)rgba(rgba(240, 255, 0, 1))
                                // Dom for win comb label
                                pokerDomStr = pokerDomStr + '<div style="flex-basis: 100%; display: flex; justify-content: flex-start; align-items: center; margin-bottom: 4px;">';
                                pokerDomStr = pokerDomStr + '<span style="color: ' + tbColor + '; margin-right: 4px; font-weight: 600; text-align: center; flex-basis: 16%">' + getPokerCombById(tables[i][0]) + '</span>';
                                // Flop, Turn, River, results,
                                for (j = 1; j < 6; j++) {
                                    pokerDomStr = pokerDomStr + getDomCardByCard(getCardById(tables[i][j]), true);
                                }
                                // Add win combs
                                for (var plComb in winPlayerCombs) {

                                    pokerDomStr = pokerDomStr + '<div style="display: flex; justify-content: center; align-items: center;">' +
                                        '<div style="display: flex; justify-content: center; align-items: center;">' +
                                        '<img src="games/Poker/resources/player-black.png" style="height: 26px; width: 26px; margin-left: 8px">' +
                                        '<span style="color: ' + tbColor + '; margin-right: 4px; font-weight: 600; text-align: center; margin-left: 8px">' + winPlayerCombs[plComb].playerNum + '</span>' +
                                        '</div>' +
                                        winPlayerCombs[plComb].firstCard + winPlayerCombs[plComb].secondCard +
                                        '</div>';
                                }

                                pokerDomStr = pokerDomStr + '</div>';
                            }
                            pokerDomStr = pokerDomStr + '</div>';

                            // Set dict comb players
                            typeObj.pokerData = pokerData;
                            getCorrect(operData.wn);

                            return pokerDomStr;
                        }
                        // Lotto results
                        else if (objTypeArray[0] == 42) {
                            if (value === '') return value;
                            // 0 - 4 - lotto 5/36
                            // 5 - 10 - lotto 6/42
                            // 11 - 17 - lotto 7/49
                            var lttResults = value.split(';');
                            lttResults = lttResults[0].split(' ');
                            var lttResArr = [
                                {
                                    name: '5/36:',
                                    res: lttResults.slice(0, 5),
                                },
                                {
                                    name: '6/42:',
                                    res: lttResults.slice(5, 11),
                                },
                                {
                                    name: '7/49:',
                                    res: lttResults.slice(11, 18),
                                }
                            ];

                            var lttDomStr = '', i, j, tbColor;
                            // Root flexbox
                            lttDomStr = lttDomStr + '<div style="display: flex; align-items: center; justify-content: flex-start; flex-wrap: wrap;">';

                            for (i = 0; i < 3; i++) {

                                switch (i) {
                                    case 0:
                                        tbColor = '#1d5fff';
                                        break;
                                    case 1:
                                        tbColor = '#e11b22';
                                        break;
                                    case 2:
                                        tbColor = '#12a500';
                                        break;
                                }
                                // Parent for row
                                lttDomStr = lttDomStr + '<div style="flex-basis: 100%; display: flex; justify-content: flex-start; align-items: center; margin-bottom: 4px;">';
                                lttDomStr = lttDomStr + '<span style="color: ' + tbColor + '; margin-right: 4px; font-weight: 600; text-align: center;">' + lttResArr[i].name + '</span>';
                                // Result
                                lttDomStr = lttDomStr + '<div class="results-sort sort-button-in-cashflow">&gt;</div><span class="result">';
                                for (j = 0; j < lttResArr[i].res.length; j++) {
                                    lttDomStr = lttDomStr + '<div class="history__keno-ball" data-ind="' + j + '">' + lttResArr[i].res[j] + '</div>';
                                }
                                lttDomStr = lttDomStr + '</span>';

                                lttDomStr = lttDomStr + '</div>';
                            }
                            lttDomStr = lttDomStr + '</div>';

                            return lttDomStr;
                        } else if (value.split(' ').length > 1) {
                            var rsArr = value.split(' ');
                            var i, rsStr = '';
                            for (i = 0; i < rsArr.length; i++) {
                                rsStr = rsStr + '<div class="history__keno-ball" data-ind="' + i + '">' + rsArr[i] + '</div>';
                            }
                            return '<div class="results-sort sort-button-in-cashflow">&gt;</div><span class="result">' + rsStr + '</span>';
                        }
                        // Roulette
                        else if (objTypeArray[0] == 13 || objTypeArray[0] == 6 || objTypeArray[0] == 34 || objTypeArray[0] == 12 || objTypeArray[0] == 38 || objTypeArray[0] == 53 || objTypeArray[0] == 54 || objTypeArray[0] == 57 || objTypeArray[0] == 63) {
                            var classNameRB = 'rounded-bg-green';
                            // Red
                            if (fortunaCombinations.btnComb['47'].zones.indexOf(parseInt(value, 10)) != -1) {
                                classNameRB = 'rounded-bg-red';
                            } else if (fortunaCombinations.btnComb['48'].zones.indexOf(parseInt(value, 10)) != -1) {
                                classNameRB = 'rounded-bg-black';
                            }

                            return '<div class="rounded-bg ' + classNameRB + '">' + value + '</div>';
                        } else {
                            return value;
                        }
                    }

                    //var betValue, winValue;
                    var tableData = (mainTable) ? mainTable.data() : undefined;
                    var typeObj = {};
                    // Get results before bet detail becouse in result calc spec data for bets
                    typeObj.results = getResults((!operData.rs || parseInt(operData.st) == 10) ? '' : operData.rs.split('|').join(' '));

                    typeObj.details = getRoundDetails();

                    // Если пополненеие или ставка
                    if (isPaidOrSpl) {
                        if (parseInt(operData.st) > -1) {
                            operData.wn = operData.st;
                        } else {
                            operData.bt = -parseInt(operData.st);
                        }
                    }
                        // Обрабатываем случай склейки тиражей и пересчёта баланса
                        // Оба стыка не пополнение и не снятие и их раунды равны
                    // Сбрасываем баланс
                    else if ((tableData && tableData[tableData.length - 1].details) && (objTypeArray[2] == tableData[tableData.length - 1].round)) {
                        balanceLocal = parseFloat(tableData[tableData.length - 1].balance.split(' ').join(''));
                        //console.log('Попался стык ставок! Проверить суммы в стыковочном тираже!');
                        // Складываем bets wins
                        var bts = (tableData[tableData.length - 1].bets == '') ? '0' : tableData[tableData.length - 1].bets;
                        var wns = (tableData[tableData.length - 1].wins == '') ? '0' : tableData[tableData.length - 1].wins;
                        operData.bt = operData.bt + parseFloat(bts.split(' ').join('')) * (-100);
                        operData.wn = operData.wn + parseFloat(wns.split(' ').join('')) * (100);
                        // Начинаем склеивать ставки
                        // Копируем полностью массив
                        var tdDetail = tableData[tableData.length - 1].details.concat(typeObj.details);
                        typeObj.details = tdDetail;
                        incTotalAmountBets(-tableData[tableData.length - 1].amountBets);
                    }

                    typeObj.round = (isPaidOrSpl) ? '' : objTypeArray[2];
                    typeObj.amountBets = (isPaidOrSpl) ? '' : typeObj.details.length;
                    typeObj.game = getTypeByKey(operData);
                    typeObj.bets = getCorrect(-operData.bt);
                    typeObj.wins = getCorrect(operData.wn);
                    typeObj.balance = numberFormat(balanceLocal, {
                        thousands_sep: " ",
                        dec_point: ".",
                        needZeros: false
                    });
                    // Далее вычисляем баланс
                    getCorrectBalance(getCorrect(operData.bt), getCorrect(operData.wn));
                    // Увеличиваем общее кол-во ставок
                    incTotalAmountBets(typeObj.amountBets);
                    tableData = null;
                    return typeObj;
                }

                var dataForTable = [], i;
                for (i = 0; i < betsData.length; i++) {
                    dataForTable.push(getTypeObj(betsData[i]));
                }
                return dataForTable;
            }

            // Показываем загрузочку
            $.fancybox.showLoading();

            // Запрос на данные
            $.ajax({
                type: 'get',
                //url: iSystemID==1?'srvloto.ashx':'srvlotoSys.ashx',
                url: newServerUrl + 'gamerhistory.ashx',
                data: {'bet': betID},
                dataType: 'json', //тип возвращаемого ответа text либо xml
                success: function (data, status, jqXHR) {//возвращаемый результат от сервера
                    // Если ошибка соединения выходим
                    if (data.er == 3 || data.er == 1) {
                        //document.location.href = loginURL;
                        console.log('Ошибка соединения с сервером');
                        $.fancybox.hideLoading();
                        return;
                    }
                    // Если есть справочник, то парсим его
                    if (data.srv) {
                        var srvArr = data.srv.split('|'), i;
                        // Чистим старый справочник
                        for (i in serviceDict) {
                            serviceDict[i] = null;
                        }
                        serviceDict = null;
                        serviceDict = {};

                        var keyValueArr = [];
                        for (i = 0; i < srvArr.length; i++) {
                            // Парсим например 7`Keno blue
                            keyValueArr = srvArr[i].split('`');
                            // keyValueArr[0] - это 7, а keyValueArr[0] - это Keno blue
                            serviceDict[keyValueArr[0]] = keyValueArr[1];
                        }
                    }
                    // Начинаем работу по созданию таблицы
                    if (data.er == 0) {
                        // Сохраняем id следующей ставки
                        betID = data.next;
                        var dataForTable = getCorrectDataForTable(data.res);
                        //dataForTable.totalBalance = data.cltbal;
                        // Отправляем данные на подготовку
                        initTableFunc(dataForTable);
                        dataForTable = null;
                    }
                    // Если данных нет скрываем кнопку
                    if (data.end && data.end == 1) {
                        $('#showmore').css('visibility', 'hidden');
                    }
                    //else {
                    //	initTableFunc({timeRange: TimeRange, totalBalance: 0});
                    //}
                    $.fancybox.hideLoading();
                },
                error: function (data, status, jqXHR) {//возвращаемый результат от сервера
                    console.log('Ошибка соединения с сервером');
                    $.fancybox.hideLoading();
                }
            });
        }

        // Получаем контент для заполнения диолога
        function getCashFlowContent() {
            var $table = $('<table id="cash_flow_table" class="ui celled table compact order-column hover stripe" cellspacing="0" width="100%" style="user-select: text;">' +
                '<thead><tr>' +
                '<th colspan="1"></th>' +
                //'<th colspan="2" style="text-align: center;">02.09.16 19:46:40   Balance: 10 000</th>'+
                '<th id="mainTableHeader" colspan="7" style="text-align: left;"></th>' +
                '</tr>' +
                '<tr>' +
                '<th></th>' +
                '<th>' + mainLocalizationTable.round + '</th>' +
                '<th>' + mainLocalizationTable.amountBets + '</th>' +
                '<th>' + mainLocalizationTable.game + '</th>' +
                '<th>' + mainLocalizationTable.results + '</th>' +
                '<th>' + mainLocalizationTable.bet + '</th>' +
                '<th>' + mainLocalizationTable.win + '</th>' +
                '<th>' + mainLocalizationTable.balance + '</th>' +
                //'<th>BALANCE on DATA1<br>10 000</th>'+
                '</tr></thead>' +
                '<tfoot><tr>' +
                '<th colspan="1"></th>' +
                //'<th colspan="2" style="text-align: center;">01.09.16 19:46:40 Balance: 0</th>'+
                '<th id="mainTableFooter" colspan="7" style="text-align: center;"></th>' +
                '</tr></tfoot>' +
                '</table>'
            );

            return $table[0].outerHTML;
        }

        /* Formatting function for row details - modify as you need */
        function getDetailContent(idName, fields) {
            function getFields() {
                var fieldsStr = '';
                for (var i = 0; i < fields.length; i++) {
                    fieldsStr = fieldsStr + '<th>' + fields[i] + '</th>';
                }
                return fieldsStr;
            }

            // `d` is the original data object for the row
            return '<table id="' + idName + '" class="ui celled table compact order-column hover stripe" cellpadding="0" width="100%">' +
                '<thead>' +
                '<tr>' +
                //'<th></th>'+
                getFields() +
                //'<th>ROUND</th>'+
                //'<th>OUT</th>'+
                //'<th>IN</th>'+
                '</tr>' +
                '</thead>' +

                '<tfoot style="display: none">' +
                '<tr>' +
                '</tr>' +
                '</tfoot>' +

                '</table>';
        }

        // Добавляем события на сортировку
        function onSortEvents(selector, table) {
            var $resSorts = $(selector);
            $resSorts.hover(function () {
                    $(this).css({'background-color': '#d4d4d4'});
                },
                function () {
                    if (!$(this).hasClass('just-sorted')) {
                        $(this).css({'background-color': '#e2e2e2'});
                    }
                });
            $resSorts.on('click', function () {
                var resultsParent = $(this).parent()[0].getElementsByClassName('result')[0];

                if (!$(this).hasClass('just-sorted')) {
                    $(this).css({'text-decoration': 'underline', 'background-color': '#d4d4d4'});

                    var elems = resultsParent.getElementsByClassName('history__keno-ball');
                    // convert nodelist to array
                    var array = [];
                    for (var i = elems.length >>> 0; i--;) {
                        array[i] = elems[i];
                    }
                    // perform sort
                    array.sort(function (a, b) {
                        return Number(a.innerHTML) - Number(b.innerHTML);
                    });
                    // join the array back into HTML
                    var output = "";
                    for (var i = 0; i < array.length; i++) {
                        output += array[i].outerHTML;
                    }
                    // append output to div
                    resultsParent.innerHTML = output;

                    $(this).addClass('just-sorted');
                } else {
                    $(this).css({'text-decoration': 'none', 'background-color': '#e2e2e2'});

                    // Сплитим по кнопке и переписываем
                    var elems = resultsParent.getElementsByClassName('history__keno-ball');
                    // convert nodelist to array
                    var array = [];
                    for (var i = elems.length >>> 0; i--;) {
                        array[i] = elems[i];
                    }

                    array.sort(function (a, b) {
                        return Number(a.getAttribute('data-ind')) - Number(b.getAttribute('data-ind'));
                    });

                    // join the array back into HTML
                    var output = "";
                    for (var i = 0; i < array.length; i++) {
                        output += array[i].outerHTML;
                    }
                    // append output to div
                    resultsParent.innerHTML = output;

                    // resultsParent.innerHTML = $(table.cell($(this).parent()).data())[1].innerHTML;

                    $(this).removeClass('just-sorted');
                }
            });
        }

        // Удаляем события на сортировку
        function offSortEvents(selector) {
            var $resSorts = $(selector);
            $resSorts.unbind('mouseenter mouseleave');
            $resSorts.off('click');
        }

        // Обновляем таблицу
        function updateDataTable(preparedData) {
            // Отписываем события на сортировку результатов
            offSortEvents('#cash_flow_table tbody .results-details-sort');
            // Отписываем события на сортировку результатов
            offSortEvents('#cash_flow_table tbody .results-sort');

            var tableData = mainTable.data(), i;
            // Обрабатываем случай склейки тиражей и пересчёта баланса
            // Оба стыка не пополнение и не снятие и их раунды равны
            if ((preparedData[0].details && tableData[tableData.length - 1].details) && (preparedData[0].round == tableData[tableData.length - 1].round)) {
                // Удаляем последнюю запись
                tableData.pop();
            }
            // Объеденяем данные
            for (i = 0; i < preparedData.length; i++) {
                tableData.push(preparedData[i]);
            }
            // Обновляем таблицу
            mainTable.clear();
            mainTable.rows.add(tableData);
            mainTable.draw();
            tableData = null;
            // Событие на сортировку результатов
            onSortEvents('#cash_flow_table tbody .results-sort', mainTable);
            // Скролл
            scrollTop = fancyboxInner.scrollTop;
            $.fancybox.update();
            // Переустанваливаем размеры колонок в таблице
            mainTable.columns.adjust().draw();
        }

        // Создаём таблицу
        function createDataTable(preparedData) {
            mainTable = $('#cash_flow_table').DataTable({
                columns: [
                    {
                        className: 'main',
                        orderable: false,
                        data: null,
                        defaultContent: ''
                    },
                    {data: "round"},
                    {data: "amountBets"},
                    {data: "game"},
                    {data: "results"},
                    {data: "bets"},
                    {data: "wins"},
                    {data: "balance"}
                    //{ data: "balance"}
                ],
                columnDefs: [
                    {className: "dt-body-center dt-head-center", targets: [1, 2, 3]},
                    {className: "dt-body-left dt-head-center", targets: [4]},
                    {className: "dt-body-right dt-head-center", targets: [5, 6, 7]},
                    //{ className: "dt-center", targets: [4] },
                    {width: 8.4, targets: [0]},
                    //{ width: 19, targets: [2] },
                    {orderable: false, targets: [0, 1, 2, 3, 4, 5, 6, 7]},
                    // Видимость колонки баланса убераем если фреймовый игрок
                    {
                        targets: [7],
                        visible: !APIManager.isAPIUser()
                    }
                    //{ defaultContent: '<i class="fa fa-sort-numeric-asc" aria-hidden="true"></i>', targets: [2] }
                ],
                data: preparedData,
                paging: false,
                info: false,
                searching: false,
                //order: [[ 1, "desc" ]],
                order: false,
                createdRow: function (row, data, dataIndex) {
                    if (data.details) {
                        $(row).children().first().addClass('details-control');
                    }
                }
            });

            // Добавляем общее количество ставок
            $amountBetsDOM = $('<div class="top-align" style="font-size: 1.2em !important;"></div>');
            $amountBetsDOM.text(mainLocalizationTable.lastXBets.replace(/%s/g, totalAmountBets));

            var idUser;
            if (clientInfoGlobal.id) {
                idUser = '<div style="float: right; color: #c7c7c7;">' + clientInfoGlobal.id + '</div>';
            }

            $('#mainTableHeader').append($amountBetsDOM, idUser);

            // Заполняем баланс и дату в заголовке диалога
            var nowYear = new Date();

            // получить с нулём число
            function getZeroNum(num) {
                return ('0' + num).slice(-2);
            }

            var nowISODate = getZeroNum(nowYear.getDate()) + '.' + getZeroNum(nowYear.getMonth() + 1) + '.' + nowYear.getFullYear() + '  ' + getZeroNum(nowYear.getHours()) + ':' + getZeroNum(nowYear.getMinutes()) + ':' + getZeroNum(nowYear.getSeconds());
            $('#mainTableHeader').append($('<div">' + nowISODate + '</div>'));

            // Заполняем футер кнопкой "показать ещё 100 ставок"
            var $showMore = $('<div id="showmore" style="cursor: pointer;color: #5c8dbc;background-color: #e2e2e2;display: inline-block;padding:0px 20px;">' + mainLocalizationTable.showMoreBets + '</div>');
            $showMore.click(function () {
                getDataForTable(updateDataTable);
            });
            $showMore.hover(function () {
                $(this).css({'text-decoration': 'underline', 'background-color': '#d4d4d4'});
            }, function () {
                $(this).css({'text-decoration': 'none', 'background-color': '#e2e2e2'});
            });
            $('#mainTableFooter').append($showMore);

            // Слушатель на главную раскрывашку
            $('#cash_flow_table tbody').on('click', 'td.main.details-control', function () {
                var tr = $(this).closest('tr');
                var row = mainTable.row(tr);
                var uniqueName = 'detailTable' + row.index();
                var rowData = row.data();
                // если нет данных которые нам нужны выходим
                if (!rowData.details) {
                    return;
                }

                if (row.child.isShown()) {
                    // Отписываем события на сортировку результатов
                    offSortEvents('#cash_flow_table tbody .results-details-sort');

                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                    // Удаляем таблицу
                    childTable[uniqueName].destroy();
                    childTable[uniqueName] = null;
                    $('#' + uniqueName).remove();
                    //tr.parent().removeClass('highlight');
                } else {
                    var domTable;
                    // Если это покер меняем структуру таблицы немного
                    if (serviceDict[18] == rowData.game) {
                        domTable = getDetailContent(uniqueName, [mainLocalizationTable.date,
                            mainLocalizationTable.state,

                            mainLocalizationTable.table,
                            mainLocalizationTable.combination,
                            mainLocalizationTable.phase,

                            mainLocalizationTable.sum,
                            mainLocalizationTable.coef,
                            mainLocalizationTable.win]);

                        row.child(domTable).show();
                        childTable[uniqueName] = $('#' + uniqueName).DataTable({
                            columns: [
                                {data: "date"},
                                {data: "state"},

                                {data: "table"},
                                {data: "comb"},
                                {data: "phase"},

                                {data: "summ"},
                                {data: "coef."},
                                {data: "win"}
                                //{ data: "balance"}
                            ],
                            columnDefs: [
                                {className: "dt-head-center", targets: [0, 1, 6, 3]},
                                {className: "dt-body-center dt-head-center", targets: [2, 4]},
                                {className: "dt-body-right dt-head-center ", targets: [5, 7]}
                            ],

                            data: rowData.details,

                            paging: false,
                            info: false,
                            searching: false,
                            order: [[0, "desc"]]
                        });

                    } else {
                        domTable = getDetailContent(uniqueName, [mainLocalizationTable.date,
                            mainLocalizationTable.state,
                            mainLocalizationTable.betName,
                            mainLocalizationTable.sum,
                            mainLocalizationTable.coef,
                            mainLocalizationTable.win]);

                        row.child(domTable).show();
                        childTable[uniqueName] = $('#' + uniqueName).DataTable({
                            columns: [
                                {data: "date"},
                                {data: "state"},
                                {data: "betName"},
                                {data: "summ"},
                                {data: "coef."},
                                {data: "win"}
                                //{ data: "balance"}
                            ],
                            columnDefs: [
                                {className: "dt-head-center", targets: [0, 1, 2, 4]},
                                {className: "dt-head-center dt-body-right", targets: [3, 5]}
                            ],

                            data: rowData.details,

                            paging: false,
                            info: false,
                            searching: false,
                            order: [[0, "desc"]]
                        });
                    }
                    // Open this row
                    //var dataSet = ;

                    $('#' + uniqueName + '_wrapper').css('margin-left', '28px');
                    tr.addClass('shown');
                    // Событие на сортировку результатов
                    onSortEvents('#cash_flow_table tbody .results-details-sort', childTable[uniqueName]);
                }
                // Скролл
                scrollTop = fancyboxInner.scrollTop;
                $.fancybox.update();
            });

            // Событие на сортировку результатов
            onSortEvents('#cash_flow_table tbody .results-sort', mainTable);

            $('#cash_flow_table_wrapper').css('margin', '16px 14px 14px 42px');
            // Скролл
            fancyboxInner = $('.fancybox-inner')[0];
            scrollTop = fancyboxInner.scrollTop;
            $.fancybox.update();
        }

        $.fancybox({
            //title: (type == 'alert') ? mainLocalizationTable.errorTitle : mainLocalizationTable.infoTitle,
            content: getCashFlowContent(),
            //titlePosition: 'over',
            autoCenter: true,
            //autoSize: true,
            width: "95%",
            autoHeight: true,
            maxHeight: "95%",
            autoSize: false,
            //scrolling: false,
            padding: 0,
            maxWidth: '1165px',
            //maxHeight: '100px',
            //minHeight: '50px',
            //modal: true,
            //scrolling: 'auto',
            type: 'html',
            beforeShow: function () {
                // Делаем запрос на данные и формируем таблицу
                getDataForTable(createDataTable);
            },
            onUpdate: function () {
                if (fancyboxInner && (fancyboxInner.scrollTop != undefined)) {
                    fancyboxInner.scrollTop = scrollTop;
                }
            },
            beforeClose: function () {
                $('#cash_flow_table tbody').off('click');
                // Отписываем события на сортировку результатов
                offSortEvents('#cash_flow_table tbody .results-details-sort');
                // Отписываем события на сортировку результатов
                offSortEvents('#cash_flow_table tbody .results-sort');
                offSortEvents('#showmore');

                // Удаляем все внешние свойства и дочерней таблицы
                for (var i in childTable) {
                    if (childTable[i] != null) {
                        childTable[i].destroy();
                        $(i).remove();
                    }
                    childTable[i] = null;
                }
                childTable = null;

                if (mainTable) {
                    mainTable.destroy();
                }
                mainTable = null;
                $('#cash_flow_table').remove();

                $.fancybox.hideLoading();
            }
        });
    });
}

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
        if (agree) {
            $noMore.css('background-image', 'url("libs/FLGUtils/resources/autoplay/check-btn.png")');
        } else {
            $noMore.css('background-image', 'url("libs/FLGUtils/resources/autoplay/uncheck-btn.png")');
        }
    };

    window.flgsShowAgreeDlgNotShowSave = function () {
        if (agree) {
            localStorage.setItem('maxBetAgree', true);
        }
    };


    // Получаем контент диалога
    function getContent() {
        var $dlg = $('<div style="padding: 8px;">' +
            '<div style="text-align: center;margin-bottom: 16px;margin-top: 8px;font-size: 20px;">' +
            mainLocalizationTable.confirmMaxBet +
            '</div>' +
            '<div style="display: flex;align-items: center;justify-content: center;flex-direction: row;flex-wrap: nowrap;margin-bottom: 16px;">' +
            '<div style="border: 2px solid #000;-webkit-tap-highlight-color: transparent;text-decoration: none;padding: 8px 24px;font-weight: 600;text-transform: uppercase;text-align: center;cursor: pointer;" onclick="window.flgsShowAgreeDlgCb();window.flgsShowAgreeDlgNotShowSave();$.fancybox.close();">' +
            mainLocalizationTable.confirmYes +
            '</div>' +
            '<div style="margin-left: 30px;border: 2px solid #000;-webkit-tap-highlight-color: transparent;text-decoration: none;padding: 8px 24px;font-weight: 600;text-transform: uppercase;text-align: center;cursor: pointer;" onclick="window.flgsShowAgreeDlgNotShowSave();$.fancybox.close();">' +
            mainLocalizationTable.confirmNo +
            '</div>' +
            '</div>' +
            '<div style="position: relative; display: inline-block;cursor: pointer;" onclick="window.flgsShowAgreeDlgNotShow();">' +
            '<div id="no-more" style="border: 2px solid #000;display: inline-block;top: 2px;position: absolute;left: 0px;width: 24px;height: 24px;background-image: url("libs/FLGUtils/resources/autoplay/uncheck-btn.png"); background-size: contain;"></div>' +
            '<div style="display: inline-block;margin: 1px 36px;">' +
            mainLocalizationTable.confirmDontShow +
            '</div>' +
            '</div>' +
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

            if (closeCb) {
                closeCb();
            }
        }
    });
}

// Глобальный диалог входа в систему
function showSignInDlg() {

    // Получаем контент диалога
    function getContent() {
        var $dlg = $('<div id="sign-in-dlg" class="auth-dlg" style="">' +
            '<div class="" style="">' +
            '<input class="login" style="display: block; margin: 10px auto;" placeholder="login" onfocus="placeholder=\'\'";" onblur="setTimeout(function () {placeholder=mainLocalizationTable.login;}, 100);" onkeypress="return isNumberKey(event)" type="text">' +
            '<input class="password" style="display: block; margin: 10px auto;" placeholder="password" onfocus="placeholder=\'\';" onblur="setTimeout(function () {placeholder=mainLocalizationTable.password;}, 100);" onkeypress="return isNumberKey(event)" type="password">' +
            '</div>' +
            '<div class="dlg-label" style="">Forgot your password?</div>' +
            //'<div class="dlg-big-btn" style="">SIGN IN</div>'+
            '<div class="" style="margin: 10px auto; width: 360px">' +
            '<div class="dlg-btn" style="display: inline-block; margin-right: 10px">DEMO</div>' +
            '<div class="dlg-btn" style="display: inline-block;">SIGN IN</div>' +
            '</div>' +
            //'<div class="dlg-big-btn" style="">DEMO</div>'+
            '</div>'
        );
        //$dlg.show();
        return $dlg[0].outerHTML;
    }

    $.fancybox({
        content: getContent(),
        autoCenter: true,
        width: "95%",
        autoHeight: true,
        //height: '400px',
        maxHeight: "95%",
        autoSize: false,
        padding: 0,
        maxWidth: '400px',
        type: 'html',
        beforeShow: function () {
            // Делаем запрос на данные и формируем таблицу
            //getDataForTable(createDataTable);
        },
        onUpdate: function () {
            //if (fancyboxInner && (fancyboxInner.scrollTop!=undefined)) {
            //	fancyboxInner.scrollTop = scrollTop;
            //}
        },
        beforeClose: function () {
            //$('#cash_flow_table tbody').off('click');
            //// Отписываем события на сортировку результатов
            //offSortEvents('#cash_flow_table tbody .results-details-sort');
            //// Отписываем события на сортировку результатов
            //offSortEvents('#cash_flow_table tbody .results-sort');
            //offSortEvents('#showmore');
            //
            //// Удаляем все внешние свойства и дочерней таблицы
            //for (var i in childTable) {
            //	if (childTable[i]!=null) {
            //		childTable[i].destroy();
            //		$(i).remove();
            //	}
            //	childTable[i] = null;
            //}
            //childTable = null;
            //
            //if (mainTable) { mainTable.destroy(); }
            //mainTable = null;
            //$('#cash_flow_table').remove();
            //
            //$.fancybox.hideLoading();
        }
    });
}

// Глобальный диалог регистрации
function showRegistrationDlg() {

    // Получаем контент диалога
    function getContent() {
        var $dlg = $('<div id="sign-in-dlg" class="auth-dlg" style="">' +
            '<div class="" style="margin: 10px auto; width: 360px">' +
            '<div class="dlg-btn" style="display: inline-block; margin-right: 10px">E-MAIL</div>' +
            '<div class="dlg-btn" style="display: inline-block;">PHONE</div>' +
            '</div>' +
            '<div class="" style="">' +
            '<input class="e-mail" style="display: block; margin: 10px auto;" placeholder="e-mail" onfocus="placeholder=\'\'";" onblur="setTimeout(function () {placeholder=\'e-mail\';}, 100);" onkeypress="return isNumberKey(event)" type="text">' +
            '<input class="password" style="display: block; margin: 10px auto;" placeholder="password" onfocus="placeholder=\'\';" onblur="setTimeout(function () {placeholder=mainLocalizationTable.password;}, 100);" onkeypress="return isNumberKey(event)" type="password">' +
            '<input class="password" style="display: block; margin: 10px auto;" placeholder="repeat password" onfocus="placeholder=\'\';" onblur="setTimeout(function () {placeholder=\'repeat password\';}, 100);" onkeypress="return isNumberKey(event)" type="password">' +
            '<input class="currency" style="display: block; margin: 10px auto;" placeholder="currency" onfocus="placeholder=\'\';" onblur="setTimeout(function () {placeholder=\'currency\';}, 100);" onkeypress="return isNumberKey(event)" type="text">' +
            '</div>' +
            '<div class="dlg-label" style="">By clicking this button you agree with the Terms and Conditions of the company and confirm that you are of legal age</div>' +
            '<div class="dlg-big-btn" style="">REGISTRATION</div>' +
            //'<div class="g-recaptcha" data-sitekey="6Lf3XTkUAAAAAORTvq27GcLzZ1Xa6FiSIl9H2KRs"></div>'+
            //'<div class="dlg-big-btn" style="">SIGN IN</div>'+
            //'<div class="dlg-big-btn" style="">DEMO</div>'+
            '</div>'
        );
        //$dlg.show();
        return $dlg[0].outerHTML;
    }

    $.fancybox({
        content: getContent(),
        autoCenter: true,
        width: "95%",
        autoHeight: true,
        maxHeight: "95%",
        autoSize: false,
        padding: 0,
        maxWidth: '400px',
        type: 'html',
        helpers: {
            overlay: {closeClick: false} // prevents closing when clicking OUTSIDE fancybox
        },
        beforeShow: function () {
            // Делаем запрос на данные и формируем таблицу
            //getDataForTable(createDataTable);
        },
        onUpdate: function () {
            //if (fancyboxInner && (fancyboxInner.scrollTop!=undefined)) {
            //	fancyboxInner.scrollTop = scrollTop;
            //}
        },
        beforeClose: function () {
            //$('#cash_flow_table tbody').off('click');
            //// Отписываем события на сортировку результатов
            //offSortEvents('#cash_flow_table tbody .results-details-sort');
            //// Отписываем события на сортировку результатов
            //offSortEvents('#cash_flow_table tbody .results-sort');
            //offSortEvents('#showmore');
            //
            //// Удаляем все внешние свойства и дочерней таблицы
            //for (var i in childTable) {
            //	if (childTable[i]!=null) {
            //		childTable[i].destroy();
            //		$(i).remove();
            //	}
            //	childTable[i] = null;
            //}
            //childTable = null;
            //
            //if (mainTable) { mainTable.destroy(); }
            //mainTable = null;
            //$('#cash_flow_table').remove();
            //
            //$.fancybox.hideLoading();
        }
    });
}

// Ключ операций
function localKey(value) {
    if (!arguments.length) {
        return localStorage.clientKey;
    } else if (parseFloat(value) > 9) {
        localStorage.setItem('clientKey', value);
    }
}

// Шифровать\дешифровать логин пароль время
//function localPath(path) {
//	if (!arguments.length) {
//		return localStorage.pathLocal;
//	}
//	else { localStorage.setItem('pathLocal', path); }
//}
// Определяем язык устройства, системы
function detectLang(inputLang, existLangs) {
    // Если язык есть среди списка существующих выбираем его, иначе применяем сегментирование
    for (var lang in existLangs) {
        if (existLangs[lang] == inputLang) return inputLang;
    }
    switch (inputLang) {
        // Для стран СНГ ставим русский язык
        case 'az':
        case 'by':
        case 'kg':
        // Для казахских
        case 'kz':
            return 'kz';
            break;
        case 'fr':
            return 'fr';
            break;
        case 'md':
        case 'ru':
        case 'uz':
        case 'tj':
        case 'ua':
            return 'ru';
            break;
        // Для арабских
        case 'ar':
            return 'ar';
            break;
        // Для курдских
        case 'ku':
            return 'ku';
            break;
        // Для латинских испанский
        case 'bo':
        case 'cl':
        case 'co':
        case 'ec':
        case 'sv':
        case 'gq':
        case 'gt':
        case 'hn':
        case 'mx':
        case 'ni':
        case 'es':
        case 'pa':
        case 'py':
        case 'pe':
        case 've':
        case 'uy':
            return 'es';
            break;
        case 'pt':
            return 'pt';
            break;
        // Всем остальным английский
        default:
            return 'en';
    }
}

// Сохраняем локально язык
function localLanguage(lang) {
    // Получить имя текста по индексу
    function getLangName(l) {
        switch (l) {
            case 'ru':
                return 'RUS';
                break;
            case 'en':
                return 'ENG';
                break;
            case 'kz':
                return 'KAZ';
                break;
            case 'es':
                return 'ESP';
                break;
            case 'ku':
                return 'KUR';
                break;
            case 'ar':
                return 'ARA';
                break;
            case 'fr':
                return 'FRA';
                break;
            case 'pt':
                return 'PRT';
                break;
        }
    }

    if (!arguments.length) {
        if (localStorage.language) {
            return localStorage.language;
        } else {
            // Определяем язык устройства, системы
            var userLang = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase();
            return detectLang(userLang, mainLocalizator.getLangs());
        }
    } else {
        //if (localStorage.language==lang) { return; }
        var $curLangItem = $('.lang-item[lang="' + lang + '"]');
        $curLangItem.parent().parent().children().css('display', 'block');
        $curLangItem.parent().css('display', 'none');
        var langN = getLangName(lang);
        $('.lang-button').text(langN);
        $('.lang-button-selected').text(langN);
        localStorage.setItem('language', lang);
        if (changeLangGlobalFunc) {
            changeLangGlobalFunc(lang);
        }
    }
}

// Ф-ия запрешения нажатия на игры
var gameClickEnableFunc = function ($elem, enable) {
    if (enable) {
        $elem.css('pointer-events', '');
    } else {
        $elem.css('pointer-events', 'none');
    }
};
// Функция анимации развёртывания
var fullscreenFormFunc = function ($form, afterMinFunc) {
    if (!$form || $form.attr('id') != 'game-form') {
        return;
    }

    var setIphoneHeightFunc = function ($gameForm) {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Проверяем размер для устройств
        // if ( userAgent.match( /iPhone/i) && (userAgent.match(/Version\/[\d\.]+.*Safari/))) {
        // 	// IPhone 4
        // 	if (window.screen.height <= 480) {
        // 		$gameForm.css({ 'padding-top': 55+'px', 'padding-bottom': 55+'px' });
        // 	}
        // 	// IPhone 5
        // 	else if (window.screen.height <= 568) {
        // 		$gameForm.css({ 'padding-top': 45+'px', 'padding-bottom': 45+'px' });
        // 	}
        // 	// IPhone 6,7
        // 	else if (window.screen.height <= 667) {
        // 		$gameForm.css({ 'padding-top': 45+'px', 'padding-bottom': 45+'px' });
        // 	}
        // 	// IPhone 6+,7+
        // 	else if (window.screen.height <= 736) {
        // 		$gameForm.css({ 'padding-top': 45+'px', 'padding-bottom': 45+'px' });
        // 	}
        // }
    };

    var resizeFunc = function () {
        $form.find('#game-form1').outerWidth($(window).width());
        $form.find('#game-form1').outerHeight($(window).height() + 3);
        $form.find('#game-form1').trigger('parentResized');
    };
    //window.dispatchEvent(new Event('resize'));

    if (afterMinFunc) {
        var $gm = $('.game');
        window.removeEventListener('resize', resizeFunc);
        gameClickEnableFunc($form, false);
        gameClickEnableFunc($gm, false);

        //alert($form.attr('id')+' '+$form.css('left'));
        $form.find('#game-form1').animate({
            'width': 768 * siteScale, 'height': 432 * siteScale,
            'padding-top': 0, 'padding-bottom': 0
        }, {
            duration: 600,
            easing: 'easeOutExpo',
            progress: function () {
                $form.find('#game-form1').trigger('parentResized');
            },
            complete: function () {
                //alert($form.attr('id')+' '+$form.css('left'));
                afterMinFunc();
                gameClickEnableFunc($form, true);
                // Перерасчитываем длину баланса
                setDOMBalance(clientInfoGlobal.balance);
                setTimeout(function () {
                    gameClickEnableFunc($gm, true);
                }, 650);
            }
        });

    } else {
        gameClickEnableFunc($form, false);
        //var devHeight = $(window).height();
        //var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        //// Проверяем размер для устройств
        //if ( userAgent.match( /iPhone/i) && (userAgent.match(/Version\/[\d\.]+.*Safari/))) {
        //	// IPhone 4
        //	if (window.screen.height <= 480) {
        //		devHeight -= 110;
        //	}
        //	// IPhone 5
        //	else if (window.screen.height <= 568) {
        //		devHeight -= 90;
        //	}
        //	// IPhone 6,7
        //	else if (window.screen.height <= 667) {
        //		devHeight -= 90;
        //	}
        //	// IPhone 6+,7+
        //	//else if (window.screen.height <= 736) {
        //	//	devHeight -= 90;
        //	//}
        //}
        setIphoneHeightFunc($form.find('#game-form1'));
        $form.find('#game-form1').animate({
            'width': $(window).width(),
            'height': $(window).height() + 3,
            'padding-top': parseInt($form.find('#game-form1').css('padding-top')),
            'padding-bottom': parseInt($form.find('#game-form1').css('padding-bottom'))
        }, {
            duration: 600,
            easing: 'easeOutExpo',
            progress: function () {
                $form.find('#game-form1').trigger('parentResized');
            },
            complete: function () {
                //alert($form.attr('id')+' '+$form.css('left'));
                window.addEventListener('resize', resizeFunc);
                gameClickEnableFunc($form, true);
            }
        });
    }
};
// Функция анимации перехода
var selectFormFunc = function ($curForm, $nextForm, direction, onAfterNextFormAnim, onAfterCurFormAnim) {
    if (!$curForm || !$nextForm || !direction) {
        return;
    }

    var dirStep = (-1 < direction.indexOf('forward')) ? '-=75%' : '+=75%';
    $nextForm.css('display', 'block');
    gameClickEnableFunc($curForm, false);
    gameClickEnableFunc($nextForm, false);

    //alert($(window).width());
    //alert($curForm.attr('id')+' '+$curForm.css('left'));
    $curForm.animate({'left': dirStep, 'opacity': 0}, 600, 'easeOutExpo', function () {
        //alert($curForm.attr('id')+' '+$curForm.css('left'));
        if (!$(this).hasClass('active-form')) {
            $(this).css('display', 'none');
        }
        gameClickEnableFunc($curForm, true);
        if (onAfterCurFormAnim) {
            onAfterCurFormAnim($curForm);
        }
    });
    // Делаем видимым след форму
    //alert($nextForm.attr('id')+' '+$nextForm.css('left'));
    $nextForm.animate({'left': dirStep, 'opacity': 1}, 600, 'easeOutExpo', function () {
        //alert($nextForm.attr('id')+' '+$nextForm.css('left'));
        gameClickEnableFunc($nextForm, true);
        if (onAfterNextFormAnim) {
            onAfterNextFormAnim($nextForm);
        }
    });
};

// Функция перехода к форме
function goToForm(direction, onBeforNextFormAnim, onAfterCurFormAnim) {
    //if (!form || $('#'+form).hasClass('active-form')) { return; }
    if (!direction) {
        return;
    }

    var $curActiveForm = $('.active-form');
    $curActiveForm.removeClass('active-form');
    var $nextActiveForm;

    switch ($curActiveForm.attr('id')) {
        case 'games-form':
            if (direction == 'forward') {
                $nextActiveForm = $('#game-form');
                // Выставляем 70% от экрана
                $nextActiveForm.find('#game-form1').outerHeight(432 * siteScale);
                $nextActiveForm.find('#game-form1').outerWidth(768 * siteScale);
            } else if (direction == 'forward2') {
                $nextActiveForm = $('#change-password-form');
            } else {
            }
            break;
        case 'game-form':
            if (direction == 'forward') {
            } else {
                $nextActiveForm = $('#games-form');
            }
            break;
        case 'change-password-form':
            if (direction == 'forward') {
            } else {
                $nextActiveForm = $('#games-form');
                // чистим данные когда уходим с формы
                var $cpfInputs = $('#change-password-form .login, #change-password-form .password');
                $($cpfInputs[0]).val('');
                $($cpfInputs[1]).val('');
                $($cpfInputs[2]).val('');
                $($cpfInputs[3]).val('');
                $cpfInputs = null;
            }
            break;
    }
    $nextActiveForm.addClass('active-form');
    selectFormFunc($curActiveForm, $nextActiveForm, direction, onBeforNextFormAnim, onAfterCurFormAnim);
}

FLGUtils.goToLobby = () => {
    fullscreenFormFunc($('#game-form'), function () {
        goToForm('backward', undefined, function ($form) {
            const removeFunc = window['remove' + $form.find('#game-form1').attr('runConfig') + 'Object'];
            if (removeFunc) removeFunc('game-form1', $form.find('#game-form1').attr('gameType'))
            // window['remove' + $form.find('#game-form1').attr('runConfig') + 'Object']('game-form1', $form.find('#game-form1').attr('gameType'));
            // Удаляем настройки игры на главной игровой форме
            $form.find('#game-form1').attr({runConfig: '', gameType: ''});
        });
    });
}
window.addEventListener('message', e => {
    if (e.data == 'toLobby') FLGUtils.goToLobby();
})

// Проверка на число в инпутах
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 97 || charCode > 122)) {
        var $info = $('.info');
        $info.text('Please, enter only a-z, 0-9 characters');
        $info.stop();
        $info.fadeTo(110, 1, 'easeOutExpo', function () {
            $info.stop();
            setTimeout(function () {
                $info.stop();
                $info.fadeTo(500, 0, 'linear');
            }, 4000);
        });

        return false;
    }
    return true;
}

function calcGamesGrid(leftConst, gameStep, topConst, gameHalfHeight, needCol, isPortrait, locSiteScale) {
    // Получить HTML строку элемента контента
    // Деление на цело
    function div(val, by) {
        return parseFloat((val - val % by) / by);
    }

    // пересчитываем элементы контента
    var $cotainerGames = $('#games-container .game');
    $cotainerGames.each(
        function (it, elem) {
            var nTop = parseFloat(topConst * (div(it, needCol) + 1) + gameHalfHeight * div(it, needCol));
            var nLeft = parseFloat(leftConst + (gameStep * (it + 1) - gameStep * needCol * div(it, needCol)));

            for (var i = 0; i < needToScaleOffsetElements.length; i++) {
                if ($(elem).parent().is(needToScaleOffsetElements[i].jqueryObj)) {
                    needToScaleOffsetElements[i].origOffset.top = nTop;
                    needToScaleOffsetElements[i].origOffset.left = nLeft;
                }
            }

            // for(var i = 0; i<needToScaleElements.length; i++) {
            // 	if (needToScaleElements[i].name==="#games-form .game" || needToScaleElements[i].name==="#games-form .game-label") {
            // 		if (isPortrait) {
            // 			needToScaleElements[i].needScaleFactor = siteScale*2;
            // 		}
            // 		else {
            //            needToScaleElements[i].needScaleFactor = undefined;
            // 		}
            // 	}
            // }

            $(elem).parent().css({'top': nTop + 'px', 'left': nLeft + 'px'});
        }
    );
    // Переинициализируем оригинальные смещения
    for (var i = 0; i < needToScaleOffsetElements.length; i++) {
        needToScaleOffsetElements[i].jqueryObj.css({
            'top': needToScaleOffsetElements[i].origOffset.top * siteScale + 'px',
            'left': needToScaleOffsetElements[i].origOffset.left * siteScale + 'px'
        });
    }
}

// Предзагрузчик с анимацией на канвасе
function preloader(parentDOMId, preloadDOMId, imgURLArr, fontNameArr) {
    // Деструктор
    this.destroy = function () {
        //imagesLoaded = null;
        //fontsLoaded = null;

        mainRendererLocal.renderManager.animationClipPlaying = false;
        movie = null;
        frames = null;
        animationLoader.reset();
        animationLoader = null;
        backgroundJson = null;
        jsonOnLoadFunc = null;

        mainRendererLocal.destroy();
        mainRendererLocal = null;

        innerHTMLText = null;
        loadedFunc = null;

        // Удаляем канвас
        $('#' + parentDOMId + ' canvas').remove();

        // Удаляем все внешние свойства и ф-ии
        for (var i in selfLocal) {
            selfLocal[i] = null;
        }
        selfLocal = null;
    };

    // Указатель на самого себя
    var selfLocal = this;
    // флаги на загрузку контента
    //var imagesLoaded = false, fontsLoaded = false;
    // Создаём пикси канвас
    var mainRendererLocal = new FLGRenderer(1920, 1080, parentDOMId, 'center');

    // Загружаем и создаём клип
    var movie, frames = [];
    var animationLoader = new PIXI.loaders.Loader();
    var backgroundJson = FLGUtils.staticRootPath + 'images/logo.json';

    // Функция на загрузку спрайтов
    var jsonOnLoadFunc = function () {
        for (var texture in animationLoader.resources[backgroundJson].textures) {
            // magically works since the spritesheet was loaded with the pixi loader
            frames.push(animationLoader.resources[backgroundJson].textures[texture]);
        }
        movie = new PIXI.extras.MovieClip(frames);
        movie.anchor.set(0.5, 0.5);
        movie.position.set(mainRendererLocal.canvasSize.width / 2, mainRendererLocal.canvasSize.height / 2);
        movie.scale.set(1.7, 1.7);
        movie.animationSpeed = 0.20;
        movie.play();
        mainRendererLocal.renderManager.animationClipPlaying = true;
        mainRendererLocal.stage.addChild(movie);
    };
    // Загружаем в лоадер разметку для анимации
    animationLoader
        .add(backgroundJson)
        .load(jsonOnLoadFunc);
    // Начинаем анимацию
    mainRendererLocal.StartStopAnimation(true);

    // Загружаем картинки и шрифты
    var innerHTMLText = '';
    for (var i = 0; i < imgURLArr.length; i++) {
        innerHTMLText += '<img style="display: none;" src="' + FLGUtils.staticRootPath + imgURLArr[i] + '">';
    }
    innerHTMLText += '<div class="font_preload" style="opacity: 0">';
    for (var i = 0; i < fontNameArr.length; i++) {
        innerHTMLText += '<span style="font-family: ' + fontNameArr[i] + ';"></span>';
    }
    innerHTMLText += '</div>';

    var loadedFunc = function () {
        //console.log('all images loaded');
        // Когда всё загрузилось выключаем лоудер и уничтажаем сами себя
        $('body').addClass('loaded');

        // Логика работы диалога при открытии
        // Список iD Клубов для проверик
        var promotionClubsID = [
            1146,
            1150,
            1829,
            2486,
            2657,
            2658,
            2659,
            2660,
            4221,

            4167,
            5961,

            1948,
        ];
        // Если игрок из этих клубов показываем ему промо акцию
        if (promotionClubsID.indexOf(clientInfoGlobal.hallid) > -1) {
            // Получить разметку и вёрстку для акции
            function getPromoCashbackContent() {
                return '<div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap;margin: 60px;user-select: text;">' +
                    '<div style="font-size: 34px; line-height: 1.3; text-align: center; margin-bottom: 30px;">Играй с нами и получай CASHBACK!</div>' +
                    '<div style="font-size: 22px; line-height: 22px; flex-basis: 100%; text-align: center;">Все подробности у оператора.</div>' +
                    '</div>';
            }

            $.fancybox({
                //title: (type == 'alert') ? mainLocalizationTable.errorTitle : mainLocalizationTable.infoTitle,
                content: getPromoCashbackContent(),
                autoCenter: true,
                width: "95%",
                autoHeight: true,
                maxHeight: "95%",
                autoSize: false,
                padding: 0,
                maxWidth: '500px',
                type: 'html',
            });
        }

        selfLocal.destroy();
    };
    //Disabled because disabled stat server
    // sendLog('Integrator Domain - Lobby' + clientInfoGlobal.hosturl);

    /*(function(){

		var logLgn = (clientInfoGlobal.lgn=='2430') ? 'DEMO' : clientInfoGlobal.lgn ;
		var logType = (logLgn=='DEMO') ? 3 : 1 ;
		// Метод для отправки данных лога на сервер
		var reqParams = JSON.stringify({
			name: logLgn,
			log: 'Host: ' + window.location.hostname + '. HostURL: ' + clientInfoGlobal.hosturl,
			date: 0,
			type: logType,
			game: 0,
			lang: 'undef',
			cur: '0'
		});
		$.ajax({
			type: "POST",
			url: 'https://stat.flg.bet/savelogsgamer',
			data: reqParams,
			crossDomain: true,
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			success: function (data) {
				// if (callback) { callback(data); }
			},
		   error: function (data, status, jqXHR) {
			   // if (callback) { callback(data); }
			}
		});
	})();*/
    // sendLog('Integrator Domain - Lobby' + clientInfoGlobal.hosturl);
    //console.log('Integrator Domain - Lobby' + clientInfoGlobal.hosturl, window.parent.location);
    $('#' + preloadDOMId).append(innerHTMLText).imagesLoaded().always(loadedFunc);
}

function getBetNameByCombinationCode(numer, lang) {
    var LangID = 3;

    if (lang == "ru") LangID = 0;
    if (lang == "en") LangID = 1;
    if (lang == "fr") LangID = 2;
    if (lang == "es") LangID = 3;
    if (lang == "it") LangID = 4;
    if (lang == "pt") LangID = 5;

    var rowNums = [' (1-4-7-10-13-16-19-22-25-28-31-34)', ' (2-5-8-11-14-17-20-23-26-29-32-35)', ' (3-6-9-12-15-18-21-24-27-30-33-36)'];
    var rulnames = [["", ""], ["1 ряд", "1row", "1séries", "1 linea", "1 linea"], ["2 ряд", "2row", "2séries", '2 linea', '2 linea'], ["3 ряд", "3row", "3séries", "3 linea", "3 linea"], ["1 часть", "1st 12", "1st 12", "1 docena", "1 dozzina"], ["2 часть", "2nd 12", "2nd 12", "2 docena", "2 dozzina"], ["3 часть", "3rd 12", "3rd 12", "3 docena", "3 dozzina"], ["1-18", "1-18", "1-18", "1-18", "1-18"], ["19-36", "19-36", "19-36", "19-36", "19-36"], ["четное", "even", "pair", "par", "pari"], ["нечетное", "odd", "impair", "impar", "inpari"], ["красный", "Red", "Red", "Rojo", "Rosso"], ["черный", "black", "Noir", "Negro", "Nero"]];
    var rulCombnamesCapt = [["Пара", "Split", "Couple", "Pareja", "Diviso"], ["Тройка", "Triple", "Trio", "Triple", "Triplicare"], ["Четвёрка", "Square", "Quatre", "Сuádruple", "Piazza"], ["Шестёрка", "Six", "Six", "Six", "Six"]];
    var rulCombnames = ["0,3", "3,6", "6,9", "9,12", "12,15", "15,18", "18,21", "21,24", "24,27", "27,30", "30,33", "33,36", "0,2", "2,5", "5,8", "8,11", "11,14", "14,17", "17,20", "20,23", "23,26", "26,29", "29,32", "32,35", "0,1", "1,4", "4,7", "7,10", "10,13", "13,16", "16,19", "19,22", "22,25", "25,28", "28,31", "31,34", "0,2,3", "0,1,2", "0,1,2,3", "2,3,5,6", "1,2,4,5", "1,2,3,4,5,6", "5,6,8,9", "4,5,7,8", "4,5,6,7,8,9", "8,9,11,12", "7,8,10,11", "7,8,9,10,11,12", "11,12,14,15", "10,11,13,14", "10,11,12,13,14,15", "14,15,17,18", "13,14,16,17", "13,14,15,16,17,18", "17,18,20,21", "16,17,19,20", "16,17,18,19,20,21", "20,21,23,24", "19,20,22,23", "19,20,21,22,23,24", "23,24,26,27", "22,23,25,26", "22,23,24,25,26,27", "26,27,29,30", "25,26,28,29", "25,26,27,28,29,30", "29,30,32,33", "28,29,31,32", "28,29,30,31,32,33", "32,33,35,36", "31,32,34,35", "31,32,33,34,35,36", "2,3", "5,6", "8,9", "11,12", "14,15", "17,18", "20,21", "23,24", "26,27", "29,30", "32,33", "35,36", "1,2", "4,5", "7,8", "10,11", "13,14", "16,17", "19,20", "22,23", "25,26", "28,29", "31,32", "34,35", "1,2,3", "4,5,6", "7,8,9", "10,11,12", "13,14,15", "16,17,18", "19,20,21", "22,23,24", "25,26,27", "28,29,30", "31,32,33", "34,35,36"];


    var e1 = parseFloat(numer);


    if (e1 < 37) {
        // Roulette
        var classNameRB = 'rounded-bg-green';
        // Red
        if (fortunaCombinations.btnComb['47'].zones.indexOf(parseInt(numer, 10)) != -1) {
            classNameRB = 'rounded-bg-red';
        }
        // Black
        else if (fortunaCombinations.btnComb['48'].zones.indexOf(parseInt(numer, 10)) != -1) {
            classNameRB = 'rounded-bg-black';
        }

        return '<div class="rounded-bg ' + classNameRB + '">' + numer + '</div>';
    }
    if (e1 >= 37 && e1 <= 39) return rulnames[e1 - 36][LangID] + rowNums[e1 - 37];
    if (e1 >= 40 && e1 <= 42) return rulnames[3 + (e1 - 39)][LangID];
    if (e1 == 43) return rulnames[7][LangID];
    if (e1 == 44) return rulnames[8][LangID];
    if (e1 == 45) return rulnames[9][LangID];
    if (e1 == 46) return rulnames[10][LangID];
    if (e1 == 47) return rulnames[11][LangID];
    if (e1 == 48) return rulnames[12][LangID];
    var len = rulCombnames[e1 - 100].split(',').length;
    if (e1 > 48) return rulCombnamesCapt[len == 2 ? 0 : len == 3 ? 1 : len == 4 ? 2 : 3][LangID] + " " + rulCombnames[e1 - 100];
}

function getPenaltyNameByCode(numer, lang) {

    var Dict = {
        ru: {
            missBeatOff: "ПРОМАХ/ОТОБЬЕТ",
            BARBELL: "ШТАНГА",
            under: "ПОД ПЕРЕКЛАДИНУ",
            middle: "ПОСЕРЕДИНЕ",
            below: "ПОНИЗУ",
            green: "ЦВЕТ ЗЕЛЕНЫЙ",
            yellow: "ЦВЕТ ЖЕЛТЫЙ",
        },
        en: {
            missBeatOff: "MISS/BEAT OFF",
            BARBELL: "BARBELL",
            under: "UNDER THE CROSSBEAM",
            middle: "IN THE MIDDLE",
            below: "BELOW",
            green: "GREEN COLOUR",
            yellow: "YELLOW COLOR",
        },
        es: {
            missBeatOff: "FA",
            BARBELL: "POSTE",
            under: "PDL",
            middle: "AL MEDIO",
            below: "TIRO RASO",
            green: "VERDE",
            yellow: "AMARILLO",
        },
        it: {
            missBeatOff: "FUORI/PRESA",
            BARBELL: "PALO",
            under: "SOTTO IL PALO",
            middle: "NELLA METА",
            below: "TIRO AL RASO",
            green: "VERDE",
            yellow: "GIALLO",
        },
        pt: {
            missBeatOff: "MISS/BEAT OFF" - "PERDER/BATER FORA",
            BARBELL: "BARBELL" - "HALTERE",
            under: "UNDER THE CROSSBEAM" - "DEBAIXO DA TRAVE",
            middle: "IN THE MIDDLE" - "NO MEIO",
            below: "BELOW" - "ABAIXO",
            green: "GREEN COLOUR" - "COR VERDE",
            yellow: "YELLOW COLOR" - "COR AMARELA"
        }
    };

    var e1 = parseInt(numer);

    // Штанга
    if (e1 === 25) return Dict[lang].BARBELL;
    // Промах
    if (e1 === 26) return Dict[lang].missBeatOff;
    // Под перекладину
    if (e1 === 27) return Dict[lang].under;
    // По середине
    if (e1 === 28) return Dict[lang].middle;
    // По низу
    if (e1 === 29) return Dict[lang].below;
    // Цвет зелёный
    if (e1 === 30) return Dict[lang].green;
    // Цвет жёлтый
    if (e1 === 31) return Dict[lang].yellow;

    return e1;
}

// Получить название комбинации для скачек по коду
function getRaceNameByCode(codesStr, lang) {

    var codesArr = codesStr.split(' ');

    // Словарь соответствий кода и текущего выбранного языка
    var Dict = {
        // Русский
        ru: {
            plc1: "1 место",
            plc2: "1-2 место",
            plc3: "1-3 место",
            hNch: "НЕЧЕТ",
            hCh: "ЧЕТ",
            h1prt: "МЕНЬШЕ",
            h2prt: "БОЛЬШЕ",
            hPair: "Двойка",
            Place1No: "НЕ 1 место",
            Place2No: "НЕ 1-2 место",
            Place3No: "НЕ 1-3 место",
        },
        // Английски
        en: {
            plc1: "1 place",
            plc2: "1-2 place",
            plc3: "1-3 place",
            hNch: "ODD",
            hCh: "EVEN",
            h1prt: "UNDER",
            h2prt: "OVER",
            hPair: "EXACTA",
            Place1No: "NO 1 Place",
            Place2No: "NO 1-2 Place",
            Place3No: "NO 1-3 Place",
        },
        // Турецкий
        tr: {
            plc1: "1. sıra",
            plc2: "1-2. Sıra",
            plc3: "1-3. Sıra",
            hNch: "TEK",
            hCh: "ÇİFT",
            h1prt: "DAHA AZ",
            h2prt: "DAHA FAZLA",
            hPair: "Çift",
            Place1No: "1. Sıra DEĞİL",
            Place2No: "1-2. Sıra DEĞİL",
            Place3No: "1-3. Sıra DEĞİL",
        },
        // Португальский
        pt: {
            plc1: "1 lugar",
            plc2: "1-2 lugar",
            plc3: "1-3 lugar",
            hNch: "ÍMPAR",
            hCh: "PAR",
            h1prt: "MENOS",
            h2prt: "MAIS",
            hPair: "Um par",
            Place1No: "NÃO 1 Lugar",
            Place2No: "NÃO 1-2 Lugar",
            Place3No: "NÃO 1-3 Lugar",
        },
        // Итальянский
        it: {
            plc1: "1 posto",
            plc2: "1-2 posto",
            plc3: "1-3 posto",
            hNch: "INPARI",
            hCh: "PARI",
            h1prt: "MENO",
            h2prt: "PIÙ",
            hPair: "Doppio",
            Place1No: "NON 1 Posto",
            Place2No: "NON 1-2 Posto",
            Place3No: "NON 1-3 Posto",
        },
        // Испансикй
        es: {
            plc1: "1 lugar",
            plc2: "1-2 lugar",
            plc3: "1-3 lugar",
            hNch: "IMPAR",
            hCh: "PAR",
            h1prt: "MENOS",
            h2prt: "MAS",
            hPair: "1 y 2 lugar",
            Place1No: "No 1 lugar",
            Place2No: "No 1 y 2 lugar",
            Place3No: "No 1-3 lugar",
        },
    };

    switch (parseInt(codesArr[0])) {
        // Группы мест добавляем к коду номер лошади
        // 1 место
        case 0:
            return Dict[lang].plc1 + ' ' + codesArr[1];
            break;
        // 1-2 место
        case 3:
            return Dict[lang].plc2 + ' ' + codesArr[1];
            break;
        // 1-3 место
        case 4:
            return Dict[lang].plc3 + ' ' + codesArr[1];
            break;

        // Не 1 место
        case 12:
            return Dict[lang].Place1No + ' ' + codesArr[1];
            break;
        // Не 1-2 место
        case 13:
            return Dict[lang].Place2No + ' ' + codesArr[1];
            break;
        // Не 1-3 место
        case 11:
            return Dict[lang].Place3No + ' ' + codesArr[1];
            break;

        // Группы Пары пишем 2 числа через /
        case 5:
            return Dict[lang].hPair + ' ' + codesArr[1] + '/' + codesArr[2];
            break;

        // Группы тройки пишем только название комбинации
        // Не чётные номера бегунов
        case 8:
            return Dict[lang].hNch;
            break;
        // Чётные номера бегунов
        case 7:
            return Dict[lang].hCh;
            break;
        // Меньшие номера бегунов
        case 9:
            return Dict[lang].h1prt;
            break;
        // Большие номера бегунов
        case 10:
            return Dict[lang].h2prt;
            break;

        default:
            return codesArr[0];
    }
}

// Предобработка сайта
function preprocessing(readyLogicFunc) {
    // Получить все параметры урла в виде объекта
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

                // in case params look like: list[]=thing1&list[]=thing2
                var paramNum = undefined;
                var paramName = a[0].replace(/\[\d*\]/, function (v) {
                    paramNum = v.slice(1, -1);
                    return '';
                });

                // set parameter value (use 'true' if empty)
                var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                // (optional) keep case consistent
                //paramName = paramName.toLowerCase();
                //paramValue = paramValue.toLowerCase();

                // if parameter name already exists
                if (obj[paramName]) {
                    // convert value to array (if still string)
                    if (typeof obj[paramName] === 'string') {
                        obj[paramName] = [obj[paramName]];
                    }
                    // if no array index number specified...
                    if (typeof paramNum === 'undefined') {
                        // put the value on the end of the array
                        obj[paramName].push(paramValue);
                    }
                    // if array index number specified...
                    else {
                        // put the value at that index number
                        obj[paramName][paramNum] = paramValue;
                    }
                }
                // if param name doesn't exist yet, set it
                else {
                    obj[paramName] = paramValue;
                }
            }
        }

        return obj;
    }

    // Шифровать\дешифровать логин пароль время
    function getPath(pathObj) {
        //var savedPath = localPath();
        //if (!savedPath) {
        //	localPath(pathObj);
        //	savedPath = pathObj;
        //}
        var path = new JSEncrypt();
        path.setPrivateKey('MIIBPAIBAAJBAJ/tOqppGY/W2Wznx4mKlFUMBUcArWTKfkU1Ui6h9iGqDjcHfT4i' +
            'msE7Tiol3S8Zk2kdeKiAT3ThmurAyTPd6QcCAwEAAQJAB/joesRAfPYl4pLvVIDv' +
            'AgpWXQLAogyiHMsarK5wOZ9O8/4NU2efbd2czEviG2zV7KnfFLPtoemxMj1dlVU3' +
            'OQIhAPnxvvpoyVmnCNkDHxQky9uMOyvKLizxuWXPKr/VjM+bAiEAo80ob+m54mft' +
            'Is3M2JwOdG9GdqrWiSzvs6nXtzFuwQUCIQDrVWzlxYffu+AexEuc4dB31R9ZabH0' +
            'a1yOuXKc0OsWBQIhAKJDqB1FMglg3n8t1BF4drFNUkZX8nKtez9FrxYg+BBpAiEA' +
            '9wYRsQRoAm/6DFE9eZTfEPrC+rWEJiOKPFbedPcSmF8=');
        var returnArr = path.decrypt(pathObj).split(' ');
        // Сравниваем дату с текущей
        var d = new Date();
        var nowArr = [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()];
        d = null;
        for (var i = 0; i < nowArr.length; i++) {
            if (nowArr[i] != returnArr[i + 3]) {
                return undefined;
            }
        }
        // Если прошли проверку то возвращаем объек логина
        return {lgn: returnArr[0], pwd: returnArr[1], crd: returnArr[2]};
    }

    kgzCoverRule();

    var parser = document.createElement('a');
    parser.href = document.location.href;
    var params = getAllUrlParams(parser.href);

    // Устанавливаем служебные параметры
    protocol = parser.protocol;
    setPrefixAndHostName(parser.host, parser.pathname);

    if (!params.pth && !params.trm && !params.isFrame) {
        if (localStorage.favURL) {
            $('#favicon').attr('href', localStorage.favURL);
        } else {
            $('#favicon').attr('href', 'images/favico-flg.png');
        }
        if (localStorage.title) {
            document.title = localStorage.title;
        } else {
            document.title = 'Fast Live Games';
        }
        if (localStorage.backURL) {
            loginURL = localStorage.backURL;
        }

        checkSession(function (hasSession) {
            // if (hasSession) {
            if (localStorage.logoURL) {
                $('.logo').css('background-image', 'url(' + localStorage.logoURL + ')');
            }

            updateUser(function () {
                //Disabled because disabled stat server
                // sendLog('Integrator Domain - Game: ' + clientInfoGlobal.hosturl);
                switch (clientInfoGlobal.hall) {
                    case '118':
                    case '119':
                    case '135':
                    case '136':
                    case '137':
                    case '1248':
                        document.location.href = getUrl() + '/Fortuna_loto.html';
                        break;
                    default:
                        // Вешаем событие на обновление приложения
                        document.addEventListener('refreshApp', function (e) {
                            //console.log(e.detail);
                            //alert('REFRESH!');
                            if (e.detail.refreshObjects != undefined) {
                                for (var i = 0; i < e.detail.refreshObjects.length; i++) {
                                    window['refresh' + e.detail.refreshObjects[i].gameKind + e.detail.refreshObjects[i].gameVariant + 'Object'](e.detail.refreshObjects[i].runConfig, e.detail.refreshObjects[i].gameType);
                                }
                            } else {
                                window['refresh' + e.detail.gameKind + e.detail.gameVariant + 'Object'](e.detail.runConfig, e.detail.gameType);
                            }
                        });
                        // Если терминал
                        if (localStorage.isTerminal) {
                            // отключаем разлогин логин
                            $('#logout').parent().css('display', 'none');
                            // Если терминал Прописываем недостающие коэфы для рулеток
                            clientInfoGlobal.cfstolmin = clientInfoGlobal.cfrulmin;
                            clientInfoGlobal.cfstolmax = clientInfoGlobal.cfrulmax;
                            clientInfoGlobal.cf36max = clientInfoGlobal.cfrulmax;
                            clientInfoGlobal.cf18max = clientInfoGlobal.cfrulmax;
                            clientInfoGlobal.cf12max = clientInfoGlobal.cfrulmax;
                            clientInfoGlobal.cf9max = clientInfoGlobal.cfrulmax;
                            clientInfoGlobal.cf6max = clientInfoGlobal.cfrulmax;
                            clientInfoGlobal.cf3max = clientInfoGlobal.cfrulmax;
                            clientInfoGlobal.cf2max = clientInfoGlobal.cfrulmax;
                        }

                        if (window.LJS) {
                            var logLang = (clientInfoGlobal.lang) ? clientInfoGlobal.lang : 'undef';
                            var logLgn = (clientInfoGlobal.lgn == '2430') ? 'DEMO' : clientInfoGlobal.lgn;
                            var logType = (logLgn == 'DEMO') ? 3 : 1;
                            // Метод для отправки данных лога на сервер
                            var reqParams = JSON.stringify({
                                name: logLgn,
                                log: 'Host: ' + window.location.hostname + '. Version: ' + LJS.version(),
                                date: 0,
                                type: logType,
                                game: 0,
                                lang: logLang,
                                cur: '0'
                            });
                            $.ajax({
                                type: "POST",
                                url: 'https://stat.flg.bet/savelogsgamer',
                                data: reqParams,
                                crossDomain: true,
                                contentType: "application/json; charset=utf-8",
                                dataType: 'json',
                                success: function (data) {
                                    // if (callback) { callback(data); }
                                },
                                error: function (data, status, jqXHR) {
                                    // if (callback) { callback(data); }
                                }
                            });
                        }

                        APIManager.isAPIUser(clientInfoGlobal.sys && parseInt(clientInfoGlobal.sys) != 1);

                        // Если наш фрейм
                        if ((!clientInfoGlobal.sys || parseInt(clientInfoGlobal.sys) == 1) && localStorage.isFrame) {
                            if (localStorage.gameID) {
                                // выставляем гаейм айди
                                clientInfoGlobal.cgame = localStorage.gameID;
                                clientInfoGlobal.locklang = true;
                                clientInfoGlobal.lang = localStorage.language;
                                clientInfoGlobal.backurl = localStorage.backURL;

                                clientInfoGlobal.currency = clientInfoGlobal.name_en;
                                // И запускаем игру одиночную
                                APIManager.isAPIUser(true);
                            }
                        }

                        // Проверяем зашёл фремовый игрок или нет
                        if (APIManager.isAPIUser()) {
                            // if (true) {
                            // Загружаем шрифты
                            var fonts =
                                [
                                    'Baltica',
                                    //'Georgia',
                                    'Arial Narrow',
                                    'Myriad Pro',
                                    // 'Arial Bold',
                                    'Book Antiqua',
                                    'Calibri',
                                    'Arial',
                                    'Arial Black',
                                    'Trebuchet MS',
                                    'Myriad Pro Cond',
                                    // 'Swiss721-CondensedBold'
                                ];

                            var innerHTMLText = '<div class="font_preload" style="opacity: 0">';
                            for (var i = 0; i < fonts.length; i++) {
                                innerHTMLText += '<span style="font-family: ' + fonts[i] + ';"></span>';
                            }
                            innerHTMLText += '</div>';

                            // Назначаем на ресайз событие если мобилки
                            if (isMobile.any && !window.isMobile.android.tablet && !window.isMobile.windows.tablet) {
                                var resFunc = function () {
                                    // Паренту в явном виде задаём ширину и высоту
                                    $('#loader').css({
                                        height: $(window).height() + 'px',
                                        width: $(window).width() + 'px'
                                    });
                                    $('body').css('height', document.documentElement.clientHeight + document.documentElement.clientHeight / 2 + 'px');
                                    const {cgame} = clientInfoGlobal || {};
                                    if (cgame === '40' || cgame === '86') return;
                                    if (($(window).width() < $(window).height()) && !window.flgStopRotate) {
                                        if ($('#rotate_device').css('display') !== 'block') {
                                            $('#rotate_device').css('display', 'block');
                                            $('html').css('overflow', 'hidden');
                                            $('body').css('overflow', 'hidden');
                                        }
                                    } else {
                                        if ($('#rotate_device').css('display') === 'block') {
                                            $('#rotate_device').css('display', 'none');
                                            $('html').css('overflow', '');
                                            $('body').css('overflow', '');
                                        }
                                    }
                                };
                                $(window).resize(resFunc);
                                resFunc();
                            }

                            // Обрабатываем логику backurl
                            // Если есть то назначаем его
                            if (clientInfoGlobal.backurl && clientInfoGlobal.backurl != '') {
                                loginURL = decodeURI(clientInfoGlobal.backurl);
                            }
                            // Если его нет скрываем кнопку выхода
                            else {
                                $('#logout').parent().css('display', 'none');
                            }

                            // Обрабатываем логику locklang и языка в целом
                            // Выставляем язык для API (по умолчанию английский)
                            if (clientInfoGlobal.lang.toUpperCase() == 'RUS' || clientInfoGlobal.lang.toUpperCase() == 'RU') {
                                // Если его нет скрываем кнопку выхода
                                if (clientInfoGlobal.locklang && clientInfoGlobal.locklang != '') {
                                    $('.lang-button').css('display', 'none');
                                    $('.lang-button-selected').css('display', 'none');
                                }
                                // Проставляем язык
                                localLanguage('ru');
                                mainLocalizator.currentLang('ru');
                            }
                            // Английский
                            else if (clientInfoGlobal.lang.toUpperCase() == 'ENG' || clientInfoGlobal.lang.toUpperCase() == 'EN') {
                                // Если его нет скрываем кнопку выхода
                                if (clientInfoGlobal.locklang && clientInfoGlobal.locklang != '') {
                                    $('.lang-button').css('display', 'none');
                                    $('.lang-button-selected').css('display', 'none');
                                }
                                // Проставляем язык
                                localLanguage('en');
                                mainLocalizator.currentLang('en');
                            }
                            // Французский
                            else if (clientInfoGlobal.lang.toUpperCase() == 'FRA' || clientInfoGlobal.lang.toUpperCase() == 'FR') {
                                // Если его нет скрываем кнопку выхода
                                if (clientInfoGlobal.locklang && clientInfoGlobal.locklang != '') {
                                    $('.lang-button').css('display', 'none');
                                    $('.lang-button-selected').css('display', 'none');
                                }
                                // Проставляем язык
                                localLanguage('fr');
                                mainLocalizator.currentLang('fr');
                            }
                            // Испанский
                            else if (clientInfoGlobal.lang.toUpperCase() == 'ESP' || clientInfoGlobal.lang.toUpperCase() == 'ES' || clientInfoGlobal.lang.toUpperCase() == 'SPA') {
                                // Если его нет скрываем кнопку выхода
                                if (clientInfoGlobal.locklang && clientInfoGlobal.locklang != '') {
                                    $('.lang-button').css('display', 'none');
                                    $('.lang-button-selected').css('display', 'none');
                                }
                                // Проставляем язык
                                localLanguage('es');
                                mainLocalizator.currentLang('es');
                            }
                            // Курдский
                            else if (clientInfoGlobal.lang.toUpperCase() == 'KUR' || clientInfoGlobal.lang.toUpperCase() == 'KU') {
                                // Если его нет скрываем кнопку выхода
                                if (clientInfoGlobal.locklang && clientInfoGlobal.locklang != '') {
                                    $('.lang-button').css('display', 'none');
                                    $('.lang-button-selected').css('display', 'none');
                                }
                                // Проставляем язык
                                localLanguage('ku');
                                mainLocalizator.currentLang('ku');
                            }
                            // Арабский
                            else if (clientInfoGlobal.lang.toUpperCase() == 'ARA' || clientInfoGlobal.lang.toUpperCase() == 'AR') {
                                // Если его нет скрываем кнопку выхода
                                if (clientInfoGlobal.locklang && clientInfoGlobal.locklang != '') {
                                    $('.lang-button').css('display', 'none');
                                    $('.lang-button-selected').css('display', 'none');
                                }
                                // Проставляем язык
                                localLanguage('ar');
                                mainLocalizator.currentLang('ar');
                            }
                            // Казахский
                            else if (clientInfoGlobal.lang.toUpperCase() == 'KAZ' || clientInfoGlobal.lang.toUpperCase() == 'KZ') {
                                // Если его нет скрываем кнопку выхода
                                if (clientInfoGlobal.locklang && clientInfoGlobal.locklang != '') {
                                    $('.lang-button').css('display', 'none');
                                    $('.lang-button-selected').css('display', 'none');
                                }
                                // Проставляем язык
                                localLanguage('kz');
                                mainLocalizator.currentLang('kz');
                            }
                            // Португальский
                            else if (clientInfoGlobal.lang.toUpperCase() == 'PRT' || clientInfoGlobal.lang.toUpperCase() == 'PT') {
                                // Если его нет скрываем кнопку выхода
                                if (clientInfoGlobal.locklang && clientInfoGlobal.locklang != '') {
                                    $('.lang-button').css('display', 'none');
                                    $('.lang-button-selected').css('display', 'none');
                                }
                                // Проставляем язык
                                localLanguage('pt');
                                mainLocalizator.currentLang('pt');
                            }
                            // Если нет совподений
                            else {
                                localLanguage('en');
                                mainLocalizator.currentLang('en');
                            }

                            $('#preload').append(innerHTMLText).imagesLoaded().always(APIManager.startAPILogic(function () {
                                readyLogicFunc(hasSession);
                            }));
                        } else {
                            readyLogicFunc(hasSession);
                        }
                }
            });
            // }
            // Если сессии нет
            // else {
            // // Убираем стрелку назад
            // $('#logout').parent().css('display', 'none');
            // // Сохраняем текущй урл на выход
            // localStorage.setItem('backURL', document.location.href);
            // readyLogicFunc(hasSession);
            // }
        });
    } else {
        // Сохраняем лого если есть
        if (params.logoUrl) {
            localStorage.setItem('logoURL', params.adr + params.logoUrl);
        } else {
            localStorage.removeItem('logoURL');
        }
        if (params.favUrl) {
            localStorage.setItem('favURL', params.adr + params.favUrl);
        } else {
            localStorage.removeItem('favURL');
        }
        if (params.title) {
            localStorage.setItem('title', params.title.replace(/%20/g, ' '));
        } else {
            localStorage.removeItem('title');
        }

        localStorage.removeItem('show_gamelink');
        const urlParams = new URLSearchParams(location.search);

        console.log('eliwang093: ');
        console.log(urlParams);
        const show_gamelink = urlParams.get('show_gamelink');

        console.log('eliwang093: show_gamelink');
        console.log(show_gamelink);
        if (show_gamelink && show_gamelink === "1")
            localStorage.setItem('show_gamelink', 1);
        if (params.token && !localStorage.getItem('user-token'))
            localStorage.setItem('pltoken', params.token);
        // Если заходим с нашего iFrame, то логиним с параметром от терминала
        if (params.isFrame) {
            // Записываем флаг в локал сторедж что зашли через терминал и язык
            if (params.lang) {
                localStorage.setItem('language', params.lang);
            }
            if (params.gameID) {
                localStorage.setItem('gameID', params.gameID);
            } else {
                localStorage.setItem('gameID', '');
            }
            if (params.backUrl || params.backurl) {
                localStorage.setItem('backURL', (params.backUrl) ? params.backUrl : params.backurl);
            } else {
                localStorage.setItem('backURL', '');
            }

            localStorage.setItem('isFrame', params.isFrame);
            // Логиним если это демо игрок
            if (params.isDemo) {
                loginUser(2430, 3934, '', function () {
                    document.location.href = parser.protocol + '//' + parser.host + parser.pathname;
                });
            } else {
                document.location.href = parser.protocol + '//' + parser.host + parser.pathname;
            }
        }
        // Если заходим с терминала, то логиним с параметром от терминала
        else if (params.trm) {
            // Записываем флаг в локал сторедж что зашли через терминал и язык
            if (params.lang) {
                localStorage.setItem('language', params.lang);
            }
            localStorage.setItem('isTerminal', params.trm);
            document.location.href = parser.protocol + '//' + parser.host + parser.pathname;
        } else {
            // Удаляем сыллку на терминал
            localStorage.removeItem('isTerminal');
            // Удаляем флаг на фрейм
            localStorage.removeItem('isFrame');
            localStorage.removeItem('gameID');

            // Устанавливаем бэк урл если надо
            if (params.adr) {
                localStorage.setItem('backURL', params.adr);
                loginURL = params.adr;
            }

            var pathObjLocal = getPath(params.pth);
            if (pathObjLocal) {
                loginUser(pathObjLocal.lgn, pathObjLocal.pwd, pathObjLocal.crd, function () {
                    updateUser(function () {
                        switch (clientInfoGlobal.hall) {
                            case '118':
                            case '119':
                            case '135':
                            case '136':
                            case '137':
                            case '1248':
                                document.location.href = parser.protocol + '//' + parser.host + '/login.aspx?lgn=' + pathObjLocal.lgn + '&pwd=' + pathObjLocal.pwd + '&crd=' + pathObjLocal.crd + "&adr='http://game-kg.glive.cc/'";
                                break;
                            default:
                                document.location.href = parser.protocol + '//' + parser.host + parser.pathname;
                        }
                    });
                });
            } else {
                redirectByLoginUrl();
            }
        }
    }

    //parser.href = "http://example.com:3000/pathname/?search=test#hash";
    //parser.protocol; // => "http:"
    //parser.hostname; // => "example.com"
    //parser.port;     // => "3000"
    //parser.pathname; // => "/pathname/"
    //parser.search;   // => "?search=test"
    //parser.hash;     // => "#hash"
    //parser.host;     // => "example.com:3000"
}

function sendLog(msg) {
    var logLgn = (clientInfoGlobal.lgn == '2430') ? 'DEMO' : clientInfoGlobal.lgn;
    var logType = (logLgn == 'DEMO') ? 3 : 1;
    var reqParams = JSON.stringify({
        name: logLgn,
        log: msg,
        date: 0,
        type: logType,
        game: 0,
        lang: 'undef',
        cur: '0'
    });

    $.ajax({
        type: "POST",
        url: 'https://stat.flg.bet/savelogsgamer',
        data: reqParams,
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            //console.log(`Log: ${msg}`)
            // if (callback) { callback(data); }
        },
        error: function (data, status, jqXHR) {
            // if (callback) { callback(data); }
        }
    });
}

function kgzCoverRule() {
    if (document.head.querySelector('style#kgzCoverRule')) return;
    let cssText = '.cover-video::after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:url(games/Keno/resources/NG/video_logo.png) no-repeat center / 100% auto;}';
    //cssText+='.cover-video.blue::after{background-image: url(games/Keno/resources/NG/Keno-1min-gamer.png)}';
    //cssText+='.cover-video.red::after{background-image: url(games/Keno/resources/NG/Keno-2min-gamer.png)}';
    //cssText+='.cover-video.green::after{background-image: url(games/Keno/resources/NG/Keno-4min-gamer.png)}';
    //cssText+='.cover-video.gold::after{background-image: url(games/Keno/resources/NG/Keno-Gold-gamer.png)}';
    let style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'kgzCoverRule';
    if (style.styleSheet) style.styleSheet.cssText = cssText;
    else style.appendChild(document.createTextNode(cssText)); // add to document
    document.head.appendChild(style);
};