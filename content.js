const style = document.createElement("style");
style.id = "mystyle";

document.body.appendChild(style);

style.innerHTML = `
    .ytp-ad-image-overlay,
    .video-overlay-banner {
        display: none;
    }
`;

if (window.location.host.endsWith("youtube.com")) {
    setInterval(() => {
        const btn = document.querySelector(".ytp-ad-skip-button");
        if (btn) {
            btn.click();
            console.log("skipped");
        }
    }, 1000);
}
