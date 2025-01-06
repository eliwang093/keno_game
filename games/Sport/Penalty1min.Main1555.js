// Регистрируем игру на платформе
// Penalty
registrationAppOnPlatform({
    category: 'Sport',
    catalog: 'Penalty 1 min',
    image: 'games/Sport/resources/icons/penalty.png',
    imageBack: 'games/Sport/resources/icons/penalty-2.png',
    caption: 'Penalty 1 min',
    runConfig: 'Penalty',
    gameType: 'normal',
    playInDemo: false,
    sid: 37
});


function emitEventPenalty(eventName, eventData) {
    // console.log('emitEventIntracing');
}

function initPenaltyObject(form, type) {
    console.log('initPenaltyObject', form, type);
    window.flgStopRotate = true;
    PenaltyApp(form);
}

function PenaltyApp(form) {
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
        console.log('CIG', clientInfoGlobal);
        //'https://pixel-1-d08c7045.de/';
        let lang = 'en';
        let backURL = '';
        try {
            lang = localStorage.getItem('language') || lang;
            backURL = localStorage.getItem('backURL') || backURL;
        } catch (e) {
            console.log('Attention', e.message)
        }
        let crdn = btoa(`${clientInfoGlobal.id} ${(clientInfoGlobal.pwd || "password")}`)
        let url = `/Gamer_games/penalty/index.html?crdn=${crdn}&lang=${lang}&home=${backURL}`;

        return url;
    }

    function buildFrame() {
        let url = getGameURL();
        iframe = document.createElement('iframe')
        iframe.src = url;
        iframe.style = `width:100vw;height:${1080 * 100 / 1920}vw;max-height:100vh`;
        iframe.setAttribute('mozallowfullscreen', "true");
        iframe.setAttribute('webkitallowfullscreen', "true");
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

        // document.getElementById((form||'game-form1')).appendChild(iframe);
        window.addEventListener('resize', resizeHandler);
    }

    function destroyFrame() {
        if (iframe) iframe.parentNode.removeChild(iframe);
        window.removeEventListener('resize', resizeHandler)
    }

    async function AppInit() {
        /*//updateBalance()
        //    .then(async update=>{
                // console.log('update', update);
                let hash = await getOnlineHash();
                let lang = localStorage.getItem('language');
                lang = lang?lang:'en';
                // console.log('hash', hash)


                let gf1 = document.getElementById((form||'game-form1')),
                    wrap = document.createElement('div');
                wrap.id = 'intracing_wrap';
                wrap.style = 'position: fixed;top:0;left:0;width:100vw;height:100vh;z-index:1000;';
                if(!gf1) return console.log('Unexpected error');
                let index = [].indexOf.call(gf1.parentNode.parentNode.children,gf1.parentNode);
                if(index && index<0) return console.log('Unexpected error');
                wrap.appendChild(iframe);
                gf1.parentNode.parentNode.insertBefore(wrap, gf1.parentNode.parentNode.children[index+1])

                // document.getElementById((form||'game-form1')).appendChild(iframe);
                window.addEventListener('resize', resizeHandler);

            // })
            // .catch(e=>{
                // console.log('update balance failed');
            // });*/
        buildFrame();
    }

    AppInit();
    return {}
}