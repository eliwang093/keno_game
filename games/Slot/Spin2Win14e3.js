const GamesList = [
    {
        category: 'Slot',
        catalog: 'Slot',
        image: 'games/Slot/resources/spin2win-fast.png',
        imageBack: 'games/Slot/resources/spin2win-fast.png',
        caption: 'Spin2Win',
        runConfig: 'Spin2Win',
        gameType: 'normal',
        playInDemo: false,
        sid: 248,
        gameDir: '/Gamer_games/spin2win_fast',
    },
    {
        category: 'Slot',
        catalog: 'Slot',
        image: 'games/Slot/resources/s2w-orion.png',
        imageBack: 'games/Slot/resources/s2w-orion.png',
        caption: 'Spin2Win Orion',
        runConfig: 'S2wOrion',
        gameType: 'normal',
        playInDemo: false,
        sid: 76,
        gameDir: '/Gamer_games/s2w_orion',
    }
]
GamesList.forEach((game) => {
    registrationAppOnPlatform(game)
    window['emitEvent' + game.runConfig] = () => {
    }
    window['init' + game.runConfig + 'Object'] =
        (form, type, isLobby) => {
            Spin2WinApp(form, isLobby, game.gameDir);
        }
})
/*registrationAppOnPlatform({
    category: 'Slot',
    catalog: 'Slot',
    image: 'games/Slot/resources/spin2win-fast.png',
    imageBack: 'games/Slot/resources/spin2win-fast.png',
    caption: 'Spin2Win',
    runConfig: 'Spin2Win',
    gameType: 'normal',
    playInDemo: false,
	sid: 248
});
registrationAppOnPlatform({
    category: 'Slot',
    catalog: 'Slot',
    image: 'games/Slot/resources/s2w-orion.png',
    imageBack: 'games/Slot/resources/s2w-orion.png',
    caption: 'Spin2Win Orion',
    runConfig: 'S2wOrion',
    gameType: 'normal',
    playInDemo: false,
    sid: 76
});*/


// function emitEventSpin2Win(eventName, eventData) {}
/*function initSpin2WinObject(form, type, isLobby){
    // console.log('initSpin2winObject', form, type);
    Spin2WinApp(form, isLobby);
}
function initS2wOrionObject(form, type, isLobby){
    // console.log('initSpin2winObject', form, type);
    Spin2WinApp(form, isLobby);
}*/
function removeSpin2WinObject(canvasId, type) {
}

function Spin2WinApp(form, isLobby, dir) {
    // const game = {};
    window.flgStopRotate = true;
    const {gmtyp} = clientInfoGlobal;
    // const domain = location.host === 'test.flg.bet'?'pixel-1-d08c7045.de':location.host;
    const domain = 'pixel-1-d08c7045.de';
    let ws, ErrorBox = new createErrorBox('#game-form');

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
        ws?.close();
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

    function getGameURL(st) {
        if (!(clientInfoGlobal && clientInfoGlobal.id)) {
            console.error('clientInfoGlobal error');
            return false;
        }
        let lang = 'en';
        let backURL = '';
        try {
            lang = localStorage.getItem('language') || lang;
            backURL = localStorage.getItem('backURL') || backURL;
        } catch (e) {
            console.log('Attention', e.message)
        }
        const urlParams = {
            key: st,
            srv: 'm.pixel-1-d08c7045.de',
            lang,
            lobby: Number(isLobby),
            home: backURL,
        }
        const params = Object.entries(urlParams).map(n => n[0] + '=' + n[1]).join('&')
        // const srv = location.host === 'test.flg.bet'?'bet1000.de':location.host;
        // const srv = location.host;
        // const lobby = isLobby?'&lobby=1':'';
        // let url = `${dir}/index.html?key=${st}&lang=${lang}&home=${backURL}&srv=m.${srv}${lobby}`;
        return `${dir}/index.html?${params}`;
    }

    function buildFrame(st) {
        let url = getGameURL(st);
        iframe = document.createElement('iframe')
        iframe.src = url;
        iframe.style = `width:100vw;height:100%;max-height:100vh;border:none;`;
        iframe.allowFullscreen = true;

        let gf1 = document.getElementById((form || 'game-form1')),
            wrap = document.createElement('div');
        wrap.id = 'sportgame_wrap';
        wrap.style = 'position: fixed;top:0;left:0;width:100vw;height:100vh;z-index:1000;display:flex;align-items:center;';
        if (!gf1) return console.log('Unexpected error');
        let index = [].indexOf.call(gf1.parentNode.parentNode.children, gf1.parentNode);
        if (index && index < 0) return console.log('Unexpected error');

        wrap.appendChild(iframe);
        gf1.appendChild(wrap)

        let vers = document.createElement('div');
        vers.textContent = 'v.1.0.2';
        vers.style = "position:fixed;bottom:5px;right:5px;color:#fff;font-size:11px;z-index:99999";
        wrap.appendChild(vers);

        ErrorBox.destroy();
        ErrorBox = new createErrorBox('#sportgame_wrap');

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

    class GameSocket {
        /***
         0-default,closed, 1-initialised, 2-connection open, 3-login, 4 - game opened*/
        state = 0;
        waitResponse = false;
        responseState = true;
        authRequest = false;
        isAuth = false;
        gameReady = false;
        callBack = [];

        constructor() {
            // this.init()
        }

        connect() {
            return new Promise((resolve, reject) => {
                let timeout = 100;
                this.init();
                const interval = setInterval(() => {
                    let {state, game_st} = this;
                    if (timeout >= 5000 || state === 0 || state === 4) {
                        if (timeout >= 5000) reject(`Timeout on state=${state}`)
                        if (state === 0) reject('Connection closed')
                        if (state === 4) resolve(game_st);
                        clearInterval(interval)
                    }
                    timeout += 100;
                }, 100)
            })
        }

        init() {
            this.state = 1;

            this.socket = new WebSocket(`wss://w.${domain}/wallet.ashx`);
            this.socket.onopen = e => this.onOpen(e);
            this.socket.onclose = e => this.onClose(e);
            this.socket.onmessage = e => this.onMessage(e)
            this.socket.onerror = e => this.onError(e);
        }

        auth() {
            return new Promise((resolve, reject) => {

                const {sys, lgn, id, KeySess, name_en, start_bal, start_crc} = clientInfoGlobal;
                this.authRequest = true;
                this.isAuth = false;
                // if (location.host === 'test.flg.bet')
                this.send({
                    "ac": 0,
                    "sid": sys,
                    "uid": lgn,
                    "id": id,
                    "ks": KeySess,
                    "cr": name_en,
                    "bl": start_bal,
                    "crc": start_crc
                }, 'auth')

                let time = 100;
                const n = setInterval(() => {
                    // console.log('interval', this.waitResponse);
                    if (!this.waitResponse) {
                        if (this.isAuth) this.state = 3;
                        this.isAuth ? resolve() : reject();
                        clearInterval(n);
                        // console.log('end interval',this.waitResponse);
                    }
                    if (time > 5000) clearInterval(n);
                    time += 100;
                }, 100)
            })
        }

        startGame() {
            this.send({
                ac: 1,
                gm: 248
            }, 'open')
        }

        stopGame() {
            this.send({ac: 2}, 'close');
            this.socket.close();

        }

        onOpen(e) {
            // console.log('onOpen',e);
            this.state = 2;
            this.auth()
                .then(e => {
                    // console.log('Auth Success');
                    this.state = 3;
                    this.startGame();
                    this.startPing();
                })
                .catch(e => console.log('Auth Fail'));

        }

        onClose(e) {
            // console.log('onClose',e)
            this.state = 0;
            // this.responseState = false;
            this.waitResponse = false;
            this.gameReady = false;
            this.stopPing();
            const reason = this.responseParser(e.reason);
            // if(reason) console.error('Socket Error:',reason?.er);
            switch (reason.er) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    console.error('Socket Error:', reason.er);
                    break;
                case 10:
                default:
                    this.connect();
            }
            const EventErrorHandler = e => console.error('Call socket event before initialization', e.type)
            this.socket.onopen = EventErrorHandler;
            this.socket.onclose = EventErrorHandler;
            this.socket.onmessage = EventErrorHandler;
            this.socket.onerror = EventErrorHandler;

        }

        onMessage(e) {
            // console.log('onMessage',e.data, this.waitResponseType, e);
            const {callBack, waitResponseType} = this;
            // this.responseState = true;
            const data = this.responseParser(e.data);
            switch (this.waitResponseType) {
                case 'auth':
                    this.isAuth = data?.er === 0;
                    if (this.isAuth) this.state = 3;
                    break;
                case 'open':
                    this.gameReady = true;
                    this.state = 4;
                    this.game_st = data.st
                    break;
                case 'close':
                    break;
                case 'ping':
                    break;
            }
            if (callBack[waitResponseType]) callBack[waitResponseType]();
            this.waitResponse = false;
            if (data?.er !== 0) {
                setTimeout(() => {
                    this.send(this.lastRequest, this.waitResponseType)
                }, 2000)
            }
            this.lastRequest = null;
            this.waitResponseType = null;
        }

        onError(e) {
            console.log('onError', e)
        }

        disconnect() {
            if (this.state) this.socket.close();
        }

        send(data, type) {
            if (this.waitResponse) return console.log('Try to request out of queue');
            this.waitResponse = true;
            if (type) this.waitResponseType = type;
            if (data) this.lastRequest = data;
            this.socket.send(JSON.stringify(data))
        }

        sendAsync(data, type) {
            if (this.waitResponse) return console.log('Try to request out of queue');
            return new Promise((resolve, reject) => {
                this.waitResponse = true;
                if (type) this.waitResponseType = type;
                if (data) this.lastRequest = data;
                this.socket.send(JSON.stringify(data))
                /*let timeout = 100;
                const n = setInterval(()=>{
                    timeout+=100;
                    if(timeout>=5000) reject('Response timeout');
                    if(!this.waitResponse) {}

                })*/
                const timeout = setTimeout(() => {

                }, 5000)
                this.callBack[type] = (data) => {
                    if (timeout) clearTimeout(timeout);
                    resolve(data);
                };
            })
        }

        responseParser(data) {
            let result = {};
            try {
                result = JSON.parse(data)
            } catch (e) {
                console.log(e)
            }
            return result;
        }

        startPing() {
            this.pingInteval = setInterval(() => {
                this.sendEmptyMessage()
            }, 75000)
        }

        stopPing() {
            if (this.pingInteval) clearInterval(this.pingInteval);
        }

        sendEmptyMessage() {
            this.send(null, 'ping');
        }

        сheckSocketConnection() {
        }

        getFrameLink(data) {
            const {frameUrl, st, iso, home} = obj;
            return `${frameUrl}?sid=${st}&lang=${iso}&home=${home}`
        }
    }

    if (gmtyp === 1) {
        ws = new GameSocket();
        ws.connect()
            .then(r => {
                buildFrame(r)
            })
            .catch(err => {
                console.error('Server Connection Error', err)
            })
    } else {
        GameAuth()
            .then((st => buildFrame(st)))
            .catch(err => {
                ErrorBox.showError('Unexpected error. Please reopen the game.');
                console.error('Server Start Game Error', err)
            })
    }

    async function GameAuth() {
        const data = getGameAuthData();
        data.gm = 248;
        let params = [];
        for (let key in data) {
            params.push(`${key}=${data[key]}`);
        }

        return await fetch(`https://w.${domain}/start.ashx?${params.join('&')}`)
            .then(r => r.json())
            .then(r => {
                // console.log('response', r);
                if (r.er) throw new Error(r.er);
                return r.st
            })
        /*.catch(err=> {
            ErrorBox.showError('Unexpected error. Please open the game again.')
            console.error('Game Auth Err:', err);
            throw new Error(err);
        })*/
    }

    function getGameAuthData() {
        const {sys, lgn, id, KeySess, name_en, start_bal, start_crc} = clientInfoGlobal;
        return {
            sid: sys,
            id: id,
            uid: lgn,
            ks: KeySess,
            cr: name_en,
            bl: start_bal,
            crc: start_crc,
        }
    }

    function createErrorBox(container_id) {
        const wrap = document.createElement('div'),
            box = document.createElement('div'),
            content = document.createElement('div'),
            btn = document.createElement('button');
        let style = document.createElement('style'),
            cssText = '.error-box,.error-box--content{box-sizing:border-box;margin:0;padding:0;}.' +
                'error-box {display:flex;align-items:center;justify-content:center;position:fixed;top:0;left:0;' +
                'width:100%;height:0;background-color:rgba(0, 0, 0, 0.6);visibility:hidden;transition:300ms ease;}' +
                '.error-box.seen {opacity:1;visibility:visible;height:100%;z-index:99999;}' +
                '.error-box--content {padding:30px 40px;background:#fff;border:1px solid #999;' +
                'box-shadow:0 0 5px 0 #666;max-width:500px;text-align:center;}.error-box--btn{margin-top: 20px;' +
                'display: inline-block;padding: 5px 10px;border-radius: 6px;border: 1px solid #1e1e1e;background: #333;color: #fff;}';
        style.appendChild(document.createTextNode(cssText));
        document.head.appendChild(style);
        wrap.classList.add('error-box');
        box.classList.add('error-box--content');
        content.classList.add('error-box--message');
        btn.className = 'error-box--btn';
        btn.textContent = "Back to lobby";
        btn.style.marginTop = '20px';
        btn.style.display = isLobby ? 'inline-block' : 'none';
        btn.addEventListener('click', e => {
            e.preventDefault();
            FLGUtils.goToLobby();
            ErrorBox.destroy();
        })
        box.appendChild(content)
        box.appendChild(btn)
        wrap.appendChild(box)
        $(container_id).append(wrap);
        return {
            wrap, box, content,
            showError(message) {
                isLobby ? `<div>${message}</div><button` : message;
                content.innerHTML = message;
                wrap.classList.add('seen')
            },
            hideError() {
                wrap.classList.remove('seen');
                content.innerHTML = "";
            },
            destroy() {
                box.removeChild(content);
                wrap.removeChild(box);
                document.head.removeChild(style);
                $(wrap).remove();
                this.wrap = null;
                this.box = null;
                this.content = null;
                style = null;
            }
        }
    }

    return {}
}