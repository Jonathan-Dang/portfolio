const realm = document.getElementById("realm-of-personality");
const portalImg = realm.querySelector("img");

function raisePortalOpacity() {
    if (portalImg.style.getPropertyValue("opacity") < 1) {
        portalImg.style.setProperty("opacity", Number(portalImg.style.getPropertyValue("opacity")) + 0.01);
    }
}

setInterval(raisePortalOpacity, 1250);