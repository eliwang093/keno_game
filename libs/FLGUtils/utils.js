const utils = (function () {
    const UTILS = {
        formatNumber: function formatNumber(num) {
            try {
                num = num.replace(/\s+/g, '');
            } catch (err) {
            }

            var service = "";
            var check = UTILS.isInteger(num);
            var b = 2;

            if (check) {
                b = 0;
            } else {
                b = 2;
            }

            if (parseInt(num) > 100) b = 1;
            if (parseInt(num) > 1000) b = 0;
            service = (b == 0) ? Math.trunc(parseFloat(num)) : parseFloat(num).toFixed(b);
            return service.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            ;
        },
        isInteger: function isInteger(num) {
            if (num % 1) {
                return false;
            } else {
                return true;
            }
        },
        displayTextFromTextures: function displayTextFromTextures(renderer, parentCont, text) {
            var i, sizeSumm = 0;

            function addSprt(textureName, isDot) {
                var NumSprite = new PIXI.Sprite(renderer.resourceLoader.resources[textureName].texture);
                NumSprite.anchor.y = 0.5;
                NumSprite.position.x = sizeSumm;
                if (isDot) {
                    NumSprite.position.y = 26;
                }
                parentCont.addChild(NumSprite);
                sizeSumm += NumSprite.width + 6;
                NumSprite = null;
            }

            parentCont.removeChildren();
            for (i = 0; i < text.length; i++) {
                switch (text[i]) {
                    case '.':
                        addSprt('dot_g', true);
                        break;
                    case ' ':
                        sizeSumm += 40;
                        break;
                    default:
                        addSprt(text[i] + '_g');
                        break;
                }
            }
            parentCont.position.x = -sizeSumm / 2 - 6;
        },
        getCurrentLang() {
            if (localStorage.language) {
                return localStorage.language;
            }
            // Определяем язык устройства, системы
            var userLang = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase();
            return detectLanguage(userLang, mainLocalizator.getLangs());

        },
        setCurrentLang(lang) {
            localStorage.setItem('language', lang);
            clientInfoGlobal.lang = lang;
        },
        loadingNum: 0,
        loadingMessageTimer: 0,
        postLoading(timeParam) {
            if (!timeParam) {
                // console.log('postLoading()')
                clearTimeout(UTILS.loadingMessageTimer);
                UTILS.loadingNum = 0;
            }
            const time = timeParam || 300
            const {getRand, loadingNum, postLoading} = UTILS;
            if (loadingNum >= 97) return clearTimeout(UTILS.loadingMessageTimer)
            UTILS.loadingMessageTimer = setTimeout(() => {
                LoadingPostMessage(loadingNum);
                UTILS.loadingNum = getRand(loadingNum + 3, loadingNum + 9)
                postLoading(getRand(100, 300))
            }, time)
        },
        completeLoading() {
            clearTimeout(UTILS.loadingMessageTimer);
            UTILS.loadingNum = '0';
            LoadingPostMessage('completed')
        },
        getRand(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); // Максимум и минимум включаются
        },
        format1000toK(value) {
            return value >= 1000 ? parseInt(value) / 1000 + 'K' : +parseFloat(value).toFixed(10);
        },
        formatKto1000(value) {
            // return parseFloat((''+value).replace('k','000'))
            if (value.toString().match(/[\d]+K/)) {
                return parseFloat(value.replace('K', '')) * 1000;
            }
            return value;
        },
        numFormat(num, divide_off = true, comma) {
            if (!divide_off) num = num / 100
            let fractionDigits = 0
            if (num < 1000) fractionDigits = 2
            else if (num < 10000) fractionDigits = 1;
            num = num.toFixed(fractionDigits)
            const int = num.split('.')[0];
            num = num.replace(int, Intl.NumberFormat('ru-Ru').format(int));
            //let result =  Intl.NumberFormat('ru-Ru').format(num);
            let result = num.toString();
            if (!comma) result = result.replace(',', '.');
            return result;
        },
    };

    function LoadingPostMessage(value) {
        const data = value === 'completed' ? {completed: true} : {percent: value};
        /** data format is {percent:10} or {completed: true} **/
        const message = {name: "loading", type: "flg.event", data: data};
        if (window.parent) window.parent.postMessage(message, "*");
        else postMessage(message, '*')
    }

    function detectLanguage(inputLang, existLangs) {
        // Если язык есть среди списка существующих выбираем его, иначе применяем сегментирование
        for (let lang in existLangs) {
            if (existLangs[lang] == inputLang) return inputLang;
        }
        switch (inputLang) {
            // Для казахских
            case 'kz':
                return 'kz';
                break;
            case 'fr':
                return 'fr';
                break;
            // Для стран СНГ ставим русский язык
            case 'az':
            case 'by':
            case 'kg':
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

    return UTILS;
})();
const UTILS = utils;