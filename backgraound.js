const block_patterns = [
    "open5.myvideo.ge",
    "ankunding.biz",
    "nogravitycdn",
    ".agency",
    "banner",
    "fcdn.net",
    "mc.yandex",
    "exoclick",
    "adskeeper",
    "juicyads",
    "europebet",
    "popcash",
    "preroll.",
    "eskimi",
    "/ado",
    /^ado.*/,
    "/ad_",
    "openx",
    "2mdnsys",
    "cpmstar",
    "steepto",
    "agorov",
    "rec.imedi.ge",
    "googleads",
    "googlesyndication",
    ".com/get_video_info",
    ".com/get_midroll_info",
    "preroll",
    "protovid",
    "porn",
    "adclick.",
    "doubleclick.",
    "/ads.",
    ".adfox.",
    "syndicate",
    "girlsdivine",
    "exdynsrv",
    "splash.php",
    ".life",
    ".cummerata.",
    "v.strosin.biz",
];

const check = (x, y) => {
    if (typeof x == "string") {
        return y.indexOf(x) !== -1;
    }
    return x.test(y);
};

const blockUrl = (url) => {
    if (!url) {
        return false;
    }

    for (let item of block_patterns) {
        if (check(item, url)) {
            return true;
        }
    }

    return false;
};

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const initiator = details.initiator;

        // console.log(initiator);

        const url = details.url;

        let cancel;

        try {
            cancel = blockUrl(url);
        } catch (e) {
            console.log(e);
            cancel = false;
        }

        return { cancel: cancel };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

// chrome.webRequest.onBeforeSendHeaders.addListener(
//     function (details) {
//         let cancel = false;

//         let url = details.url;
//         let headers = details.requestHeaders;

//         return { cancel: cancel };
//     },
//     { urls: ["<all_urls>"] },
//     ["requestHeaders", "blocking"]
// );
