(function () {
    "use strict";
    const GamesList = [
        {
            category: 'Slot',
            catalog: 'Slot',
            image: 'games/Slot/resources/quickspin_live.png',
            imageBack: 'games/Slot/resources/quickspin_live.png',
            caption: 'QuickSpin Live',
            runConfig: 'QuickSpinLive',
            gameType: 'normal',
            playInDemo: false,
            sid: 86,
            options: {
                gameDir: '/Gamer_games/mobile-lobby',
                urlParams: {
                    srv: 86,
                    srv_list: [86],
                    intgr: 1,
                },
                orientation: 'v'
            },
        },
        {
            category: 'Slot',
            catalog: 'Slot',
            image: 'games/Slot/resources/spinlive_go.png',
            imageBack: 'games/Slot/resources/spinlive_go.png',
            caption: 'SpinLive Go',
            runConfig: 'SpinLiveGo',
            gameType: 'normal',
            playInDemo: false,
            sid: 93,
            options: {
                gameDir: '/Gamer_games/s2w_live_fast_v2',
                urlParams: {SkinId: 93}
            },
        }
    ]
    GamesList.forEach((game) => {
        const {runConfig, options} = game;
        registrationAppOnPlatform(game)
        window['emitEvent' + runConfig] = () => {
        }
        window['init' + runConfig + 'Object'] =
            (form, type, isLobby) => {
                S2WLiveApp(form, isLobby, options);
            }
    })

    window.S2WLiveApp = (form, isLobby, options = {}) => {
        const {gameDir, urlParams, orientation} = options;

        function closeApp() {
            $('#sportgame_wrap').animate({
                opacity: 0,
            }, 500, "linear", function () {
                goToForm('backward', undefined, function ($form) {
                    $('#sportgame_wrap').remove();
                    // Удаляем настройки игры на главной игровой форме
                    $form.find('#game-form1').attr({runConfig: '', gameType: ''});
                });
            });
        }

        let iframe;
        if (window.FLG !== 'object') window.FLG = {};
        window.FLG.closeApp = closeApp;

        async function updateBalance() {
            let result = false;
            let url = `${getUrl()}?oper=getbalance`;
            let data = await fetchData(url);
            if (!data || data.err) result = false;
            else if (data.st === 'ok') result = true;
            return result;
        }

        function resizeHandler() {
            if (!iframe) return;
            iframe.style.height = window.innerHeight + 'px';
        }

        function getGameURL() {
            if (!(clientInfoGlobal && clientInfoGlobal.id)) {
                console.error('clientInfoGlobal error');
                return false;
            }
            const
                lang = localStorage.getItem('language') || "en",
                backURL = localStorage.getItem('backURL') || "",
                crdn = btoa(`${clientInfoGlobal.id} ${(clientInfoGlobal.pwd || "password")}`),
                defaultParams = {
                    lang, crdn,
                    lobby: Number(isLobby),
                },
                p = Object.assign({}, defaultParams, urlParams);
            if (backURL) p.home = backURL;
            const params = Object.entries(p).map(n => n[0] + '=' + n[1]).join('&')
            return `${gameDir}/index.html?${params}`;
        }

        function buildFrame() {
            const iframeStyles = {
                width: '100vw',
                height: `${1080 * 100 / 1920}vw`,
                maxHeight: '100vh',
                border: 'none',
            }
            const wrapStyles = {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
            }
            if (orientation === 'v') iframeStyles.height = '100vh';
            iframe = document.createElement('iframe')
            iframe.src = getGameURL();
            Object.entries(iframeStyles)
                .forEach(n => iframe.style[n[0]] = n[1])
            iframe.allowFullscreen = true;

            let gf1 = document.getElementById((form || 'game-form1')),
                wrap = document.createElement('div');
            wrap.id = 'sportgame_wrap';
            Object.entries(wrapStyles)
                .forEach(n => wrap.style[n[0]] = n[1])
            if (!gf1) return console.log('Unexpected error');
            let index = [].indexOf.call(gf1.parentNode.parentNode.children, gf1.parentNode);
            if (index && index < 0) return console.log('Unexpected error');
            wrap.appendChild(iframe);
            gf1.appendChild(wrap);

            const loaderElem = document.getElementById('loader');
            if (loaderElem) loaderElem.classList.remove('loader-loading');

            window.addEventListener('resize', resizeHandler);
            if (iframe.contentWindow) iframe.contentWindow.addEventListener('message', e => {
                if (e.data == 'toLobby') FLGUtils.goToLobby();
            })
        }

        function destroyFrame() {
            if (iframe) iframe.parentNode.removeChild(iframe);
            window.removeEventListener('resize', resizeHandler)
        }

        async function AppInit() {
            buildFrame();
        }

        AppInit();
        return {}
    }
})()
