if (document.head) {
    const style = document.createElement("style");

    style.id = "mystyle";

    document.head.appendChild(style);

    style.innerHTML = `
        .ytp-ad-image-overlay,
        .video-overlay-banner {
            display: none;
        }

        .ytp-ce-covering-overlay:not(:hover),
        .ytp-ce-element:not(:hover) {
            opacity: 0.2!important
        }
    
    `;
}


function hideFBConversations(names) {

    if(names.length == 0) {
        return
    }

    const style = document.querySelector("style#mystyle");

    let selector = names.map((name) => {
        return `[aria-label*="conversation with " i][aria-label*="${name}" i]`;
    }).join(",");

    style.innerHTML += `
            ${selector} {
                display: none;
            }
        `;
}

function getElementByXpath(path) {
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

if (window.location.host.endsWith("youtube.com")) {
    const clickSkip = () => {
        const btn = document.querySelector(".ytp-ad-skip-button");

        if (btn) {
            btn.click();
            console.log("skipped");
        }
    };

    setTimeout(clickSkip, 500);

    document.ontransitionend = () => {
        setTimeout(clickSkip, 500);
    };
} else if (window.location.host.endsWith("facebook.com")) {
    const popup_messenger_xpth = "/html/body/div[1]/div/div[1]/div/div[5]";

    const el = getElementByXpath(popup_messenger_xpth);

    if (el) {
        el.id = "popup_chat";
        el.style.display = "none";
    }


    const hide_names_key = "fb-hide-names"

    // chrome.storage.local.set({"fb-hide-names": JSON.stringify(["john doe"])},()=>{console.log("data set")})

    chrome.storage.local.get([hide_names_key], function(result) {
        names = JSON.parse(result[hide_names_key]);

        if (Array.isArray(names)) {
            hideFBConversations(names)
        }
    
    });

    

}
