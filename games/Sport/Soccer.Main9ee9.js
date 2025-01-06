// Регистрируем игру на платформе
// Футбол
registrationAppOnPlatform({
    category: 'Sport',
    catalog: 'Soccer',
    image: 'games/Sport/resources/icons/soccer.png',
    imageBack: 'games/Sport/resources/icons/soccer.png',
    caption: 'Football',
    runConfig: 'Soccer',
    gameType: 'normal',
    playInDemo: false,
    sid: 40
});


function emitEventSoccer(eventName, eventData) {
}

function initSoccerObject(form, type) {
    console.log('initSoccerObject', form, type);
    window.flgStopRotate = true;
    SoccerApp(form);
}

function SoccerApp(form) {
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
        const {backurl} = clientInfoGlobal;

        let lang = 'en';
        let backURL = backurl ? `&home=${backurl}` : '';
        try {
            lang = localStorage.getItem('language') || lang;
        } catch (e) {
            console.log('Attention', e.message)
        }
        let crdn = btoa(`${clientInfoGlobal.id} ${(clientInfoGlobal.pwd || "1111")}`)
        let url = `/Gamer_games/mobile-lobby/index.html?crdn=${crdn}&lang=${lang}&intgr=1`;

        return url;
    }

    function buildFrame() {
        let url = getGameURL();
        iframe = document.createElement('iframe')
        iframe.src = url;
        // iframe.style = `width:100vw;height:${1080 * 100/1920}vw;max-height:100vh;border:none;`;
        iframe.style = `width:100vw;height:100vh;max-height:100vh;border:none;`;
        iframe.allowFullscreen = true;

        let gf1 = document.getElementById((form || 'game-form1')),
            wrap = document.createElement('div');
        wrap.id = 'sportgame_wrap';
        wrap.style = 'position: fixed;top:0;left:0;width:100vw;height:100vh;z-index:1000;display:flex;align-items:center;';
        if (!gf1) return console.log('Unexpected error');
        let index = [].indexOf.call(gf1.parentNode.parentNode.children, gf1.parentNode);
        if (index && index < 0) return console.log('Unexpected error');
        wrap.appendChild(iframe);
        gf1.parentNode.parentNode.insertBefore(wrap, gf1.parentNode.parentNode.children[index + 1])

        window.addEventListener('resize', resizeHandler);
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