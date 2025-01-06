var loginURL = "", protocol = "", srvPrefix = "", srvHostname = "", srvPostfix = "/srvloto.php",
    gamePostfix = "/clnt.ashx", historyPostfix = "/history.ashx", srvPathName = "";

function getUrl(a, c) {
    a = a ? a + "." : "" !== srvPrefix ? srvPrefix + "." : srvPrefix;
    c = c ? c : srvPostfix;
    const b = localStorage.getItem("user-token") || localStorage.getItem("pltoken");
    return b ? protocol + "//" + a + srvHostname + c.replace(srvPostfix, "/" + b + srvPostfix) : protocol + "//" + a + srvHostname + c
}

function setPrefixAndHostName(a, c) {
    var b = a.split(".");
    ("srv.flg.bet" === a || "test.flg.bet" === a) && 2 < b.length && (srvPrefix = b[b.length - 3],
        b.splice(0, b.length - 2));
    srvHostname = b.join(".");
    srvPathName = a + c
}

function redirectByLoginUrl() {
    loginURL && "" !== loginURL && ("closeframe" === loginURL ? window.parent.postMessage({
        type: "game",
        act: "exit"
    }) : document.location.href = loginURL)
}

function redirectToRootURL() {
    srvPathName && "" !== srvPathName && (document.location.href = protocol + "//" + srvPathName)
};
