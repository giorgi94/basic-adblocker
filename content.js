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
}
