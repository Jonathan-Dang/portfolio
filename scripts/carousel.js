const LbuttonPrj = document.getElementById("L-prj");
const RbuttonPrj = document.getElementById("R-prj");
const skills = document.getElementById("skills");
const prj_carousel = document.getElementById("projects");
const skills_items = skills.querySelectorAll('.item');
const prj_items = prj_carousel.querySelectorAll('.item');
const stylesheet = document.styleSheets[0];

prj_carousel.style.setProperty("--position", Math.ceil(prj_carousel.childElementCount / 2));

skills.style.setProperty("--items", skills.childElementCount+1);
skills.style.setProperty("--position", 3);

prj_items.forEach((elm, index) => {
    elm.style.setProperty("--offset", index+1);
})

skills_items.forEach((elm, index) => {
    stylesheet.insertRule(`.item:nth-of-type(${index+1}) {--offset: ${index+1};}`, stylesheet.cssRules.length);
})

function LrotatePrj() {
    if (prj_carousel.style.getPropertyValue("--position") > 1) {
        prj_carousel.style.setProperty("--position", Number(prj_carousel.style.getPropertyValue("--position")) - Number(1));
    } else {
        prj_carousel.style.setProperty("--position", 5);
    }
}

function RrotatePrj() {
    if (prj_carousel.style.getPropertyValue("--position") < prj_carousel.childElementCount) {
        prj_carousel.style.setProperty("--position", Number(prj_carousel.style.getPropertyValue("--position")) + Number(1));
    } else {
        prj_carousel.style.setProperty("--position", 1);
    }
}

function autoCarousel() {
    const childToMove = skills.removeChild(skills.children[0]);
    skills.appendChild(childToMove);
}

LbuttonPrj.onclick = LrotatePrj;
RbuttonPrj.onclick = RrotatePrj;

setInterval(autoCarousel, 1500);