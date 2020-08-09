const style = document.createElement("style");
style.id = "mystyle";

document.head.appendChild(style);

style.innerHTML = `
    .ytp-ad-image-overlay,
    .video-overlay-banner {
        display: none;
    }
`;
