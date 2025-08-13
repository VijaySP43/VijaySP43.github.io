AOS.init({ duration: 1000 });

const taglines = [
    "Engineer",
    "Innovator",
    "Problem Solver"
];
let index = 0;
const taglineElement = document.querySelector(".tagline");

function changeTagline() {
    taglineElement.textContent = taglines[index];
    index = (index + 1) % taglines.length;
}
changeTagline();
setInterval(changeTagline, 3000);
