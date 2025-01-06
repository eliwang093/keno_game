(function () {
    isMobile.isAndroid = () => isMobile.android.phone || isMobile.android.tablet || isMobile.android.device;
    const start_screen = {
        curtain: $("#startGameBox"),
        startButton: $("#startScreen_startBtn_android"),
        display: true,
        // menuButton: $("#startScreen_menuBtn"),
        handTouchTimeout: null,

        startGame() {
            window.removeEventListener("click", start_screen.startGame);
        },

        showHandTouch() {
            if (isMobile.isAndroid()) return;
            if ((window.innerHeight < window.outerHeight && isMobile.any) /*|| (window.innerHeight < screen.height && isMobile.Android())*/) {
                // let dt = new Date();
                let dt = Date.now();
                $('.hand-touch img').attr('src', 'images/hand-touch.png?d=' + dt.toString());
                $('.hand-touch').removeClass('d-none');
                if (start_screen.handTouchTimeout)
                    clearTimeout(start_screen.handTouchTimeout);
                start_screen.handTouchTimeout = setTimeout(function () {
                    $('.hand-touch').addClass('d-none');
                }, 4000);
            } else {
                $('.hand-touch').addClass('d-none');
            }
        },
        showStartAndroidScreen() {
            if (isMobile.isAndroid()) return;
            start_screen.curtain.removeClass('d-none');
        },

        hideStartAndroidScreen(e) {
            start_screen.curtain.addClass('d-none');
            start_screen.GoInFullscreen();
            start_screen.setStartScreenText();
        },
        setStartScreenText(isStart) {
            $('#startScreen_startBtn_txt').html(isStart ? mainLocalizationTable.startGame : mainLocalizationTable.returnGame);
        },

        androidFullScreenBtn() {
            if (isMobile.isAndroid() && window.innerHeight < screen.height) {
                start_screen.curtain.removeClass('d-none');
            }
        },
        GoInFullscreen() {
            // let element = document.getElementsByClassName('wrapper-outer')[0];
            let el = document.documentElement;
            if (!(document.fullscreenEnabled
                || document.webkitFullscreenEnabled
                || document.mozFullScreenEnabled
                || document.msFullscreenEnabled)
            ) return console.log('Error: FullScreen disabled');
            if (el.requestFullscreen)
                el.requestFullscreen();
            else if (el.mozRequestFullScreen)
                el.mozRequestFullScreen();
            else if (el.webkitRequestFullscreen)
                el.webkitRequestFullscreen();
            else if (el.msRequestFullscreen)
                el.msRequestFullscreen();
        },
        showStartButton() {
            start_screen.setStartScreenText(true);
            start_screen.androidFullScreenBtn();
            start_screen.showHandTouch();
        }

    }

    $('#startScreen_startBtn_txt').html(mainLocalizationTable.startGame);
    start_screen.startButton.on("click", start_screen.hideStartAndroidScreen);
    // window.addEventListener("click", start_screen.startGame);
    window.addEventListener("resize", start_screen.showHandTouch, false);
    window.addEventListener("resize", start_screen.androidFullScreenBtn, false);
    if (!window.FLGUtils) window.FLGUtils = {};
    FLGUtils.showStartBtn = start_screen.showStartButton;
})();
