// Регистрируем игру на платформе
// Скачки
registrationAppOnPlatform({
    category: 'casino',
    catalog: 'Horses & dogs racing',
    image: 'games/Intracing/resources/icons/Intracing.png',
    imageBack: 'games/Intracing/resources/icons/Intracing-back.png',
    caption: 'Horses & dogs racing',
    runConfig: 'Intracing',
    gameType: 'green',
    playInDemo: false,
    sid: 71
});

var intracingObjectsArr = {green: undefined, gold: undefined, red: undefined};

function emitEventIntracing(eventName, eventData) {
    //Генерируем событие
    /* if (intracingObjectsArr.green != undefined) {
        intracingObjectsArr.green.mainRenderer.stage.emit(eventName, eventData);
    }
    if (intracingObjectsArr.gold != undefined) {
        intracingObjectsArr.gold.mainRenderer.stage.emit(eventName, eventData);
    }
    if (intracingObjectsArr.red != undefined) {
        intracingObjectsArr.red.mainRenderer.stage.emit(eventName, eventData);
    }
    if (intracingObjectsArr.blue != undefined) {
        intracingObjectsArr.blue.mainRenderer.stage.emit(eventName, eventData);
    } */
}

function initIntracingObject(form, type) {
    console.log('initIntracingObject', form, type);
    window.flgStopRotate = true;
    IntracingApp(form);
}

function IntracingApp(form) {

    let iframe;

    async function fetchData(url) {
        let result;
        try {
            let response = await fetch(url);
            if (response.ok) {
                let json = await response.json();
                result = json;
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
        } catch (err) {
            console.error(err)
        }
        return result;
    }

    async function updateBalance() {
        let result = false;
        let url = `${getUrl()}?oper=getbalance`;
        let data = await fetchData(url);
        if (!data || data.err) result = false;
        else if (data.st === 'ok') result = true;
        return result;
    }

    async function getOnlineHash() {
        if (!(clientInfoGlobal && clientInfoGlobal.id)) return console.error('clientInfoGlobal error');
        let result,
            uid = clientInfoGlobal.id,
            prm = clientInfoGlobal.backurl ? `&prm=${clientInfoGlobal.backurl}` : ``,//location.href,
            url = `${getUrl()}?oper=race&lg=${uid}&vgm=flg_dogs_6${prm}`;
        result = await fetchData(url);
        result = (result && result.data && result.data.onlineHash)
            ? result.data.onlineHash
            : false;
        return result;
    }

    function resizeHandler() {
        if (!iframe) return;
        iframe.style.height = window.innerHeight + 'px';
    }

    async function AppInit() {
        //updateBalance()
        //    .then(async update=>{
        // console.log('update', update);
        let hash = await getOnlineHash();
        let lang = localStorage.getItem('language');
        lang = lang ? lang : 'en';
        // console.log('hash', hash)
        let url = `https://online.hd-races.com?oh=${hash}&lang=${lang}`;
        iframe = document.createElement('iframe')
        iframe.src = url;
        iframe.style = `width:100vw;height:${window.innerHeight}px`;
        iframe.setAttribute('mozallowfullscreen', "true");
        iframe.setAttribute('webkitallowfullscreen', "true");
        iframe.allowFullscreen = true;

        let gf1 = document.getElementById((form || 'game-form1')),
            wrap = document.createElement('div');
        wrap.id = 'intracing_wrap';
        wrap.style = 'position: fixed;top:0;left:0;width:100vw;height:100vh;z-index:1000;';
        if (!gf1) return console.log('Unexpected error');
        let index = [].indexOf.call(gf1.parentNode.parentNode.children, gf1.parentNode);
        if (index && index < 0) return console.log('Unexpected error');
        wrap.appendChild(iframe);
        gf1.parentNode.parentNode.insertBefore(wrap, gf1.parentNode.parentNode.children[index + 1])

        // document.getElementById((form||'game-form1')).appendChild(iframe);
        window.addEventListener('resize', resizeHandler);

        // })
        // .catch(e=>{
        // console.log('update balance failed');
        // });
    }

    AppInit();
    return {}
}