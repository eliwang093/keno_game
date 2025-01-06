(async () => {
    const {staticRootPath} = FLGUtils;
    const path = new URL(staticRootPath || 'https://static1.lootik.de');
    const stamp = (() => {
        const d = new Date();
        const f = d => String(d).length === 1 ? '0' + d : d;
        return d.getFullYear() + "" + f(d.getMonth() + 1) + 'v01';
    })();
    let url = `https://${path.hostname}/History_project/js/GamerHistory.min.js?v=$a{stamp}`;
    if (!url) return console.error('History is unavailable');

    let script = document.createElement('script');
    script.src = url;
    script.onload = e => {
        let wrapper = document.getElementById('histWrap');
        if (!wrapper) {
            /*start style block*/
            const styleId = 'histStyle';
            if (document.head.querySelector('style#' + styleId)) return;
            let cssText = '.ghist{box-sizing: border-box;position:fixed;top:0;left:0;width:100%;height:100vh;background: rgba(0,0,0,0.4);padding:10px 20px;z-index:2;opacity:0;visibility:hidden;}';
            cssText += '.ghist.seen{opacity:1;visibility:visible;z-index:9999;}';
            cssText += '.ghist__wrap{height:100%;}';
            let style = document.createElement('style');
            style.type = 'text/css';
            style.id = styleId;
            if (style.styleSheet) style.styleSheet.cssText = cssText;
            else style.appendChild(document.createTextNode(cssText)); // add to document
            document.head.appendChild(style);
            /*end style block*/

            const wrap0 = document.createElement('div');
            wrap0.classList.add('ghist');
            wrapper = document.createElement('div');
            wrapper.id = 'histWrap';
            wrapper.classList.add('ghist__wrap');

            wrap0.appendChild(wrapper);
            document.body.appendChild(wrap0);
        }
        GamerHistory.init('#histWrap');
        GamerHistory.closeHistory = function () {
            wrapper.parentNode.classList.remove('seen');
        }
        // if(GamerHistory && document.getElementById('histWrap')){}
        if (FLGUtils) FLGUtils.showGamerHistory = (params) => {
            let wrap = document.getElementById('histWrap');
            if (!wrap) return console.error('History container is lost');
            GamerHistory.setConfig({
                lg: clientInfoGlobal.lgn,
                lang: clientInfoGlobal.lang,
                timezone: (new Date().getTimezoneOffset() / 60) * -1
            });
            wrap.parentNode.classList.add('seen');
        }
    }
    document.body.appendChild(script);
})();