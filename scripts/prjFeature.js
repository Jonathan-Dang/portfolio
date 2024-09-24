const dark = document.getElementById("worldDarkener");

function onDark() {
    dark.style.setProperty("opacity", "45%");
}

prj_items.forEach((elm) => {
    elm.onclick = onDark;
});