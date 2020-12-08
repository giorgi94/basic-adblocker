const style = document.createElement("style");
style.id = "mystyle";

document.head.appendChild(style);

style.innerHTML = `
    .ytp-ad-image-overlay,
    .video-overlay-banner {
        display: none;
    }
`;

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
}
