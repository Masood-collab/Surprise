/* ==========================================
   PREMIUM MYSTERY EXPERIENCE
   ========================================== */


/* ==========================================
   EASY CUSTOMIZATION
   ========================================== */

const PERSON_NAME = "Ayesha";

const photos = [
    "IMG-20260814-WA0005.jpg",
    "IMG-20260814-WA0003.jpg",
    "IMG-20260814-WA0004.jpg"
];


/* ==========================================
   STATE
   ========================================== */

let poppedBalloons = 0;
let collectedStars = 0;
let currentMemory = 0;

const memoryData = [

    {
        title: "A moment worth remembering",
        text:
            "Some moments quietly become memories we never want to lose."
    },

    {
        title: "Another beautiful chapter",
        text:
            "Life becomes special because of the little moments we collect along the way."
    },

    {
        title: "One more memory",
        text:
            "And some memories deserve to stay a little longer."
    }

];


/* ==========================================
   ELEMENTS
========================================== */

const music =
    document.getElementById("bgMusic");


/* ==========================================
   START
========================================== */

function startExperience() {

    music.volume = 0.35;

    music.play().catch(() => {});

    createParticles(30);

    goTo("boxStage");

}


/* ==========================================
   SCREEN NAVIGATION
========================================== */

function goTo(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

    const target =
        document.getElementById(id);

    if (target) {

        setTimeout(() => {

            target.classList.add("active");

        }, 80);

    }

}


/* ==========================================
   MYSTERY BOX
========================================== */

function openBox() {

    const box =
        document.querySelector(".mystery-box");

    if (box.classList.contains("opened"))
        return;

    box.classList.add("opened");

    createParticles(35);

    document.getElementById("boxHint")
        .style.opacity = "0";

    setTimeout(() => {

        document
            .getElementById("boxMessage")
            .classList.add("show");

        createBalloons();

    }, 900);

    setTimeout(() => {

        goTo("balloonStage");

    }, 2200);

}


/* ==========================================
   BALLOONS
========================================== */

function createBalloons() {

    const area =
        document.getElementById("balloonArea");

    area.innerHTML = "";

    poppedBalloons = 0;

    const positions = [

        [8, 18],
        [28, 5],
        [52, 20],
        [72, 2],
        [17, 55],
        [45, 62],
        [73, 55]

    ];

    positions.forEach((pos, index) => {

        const balloon =
            document.createElement("div");

        balloon.className =
            "balloon";

        balloon.style.left =
            pos[0] + "%";

        balloon.style.top =
            pos[1] + "%";

        balloon.style.background =
            balloonGradient(index);

        balloon.style.animationDelay =
            (index * .18) + "s";

        balloon.addEventListener(
            "click",
            () => popBalloon(balloon)
        );

        area.appendChild(balloon);

    });

    updateBalloonCount();

}


function balloonGradient(index) {

    const colors = [

        "linear-gradient(135deg,#c99552,#6d3a54)",
        "linear-gradient(135deg,#87527d,#321d3e)",
        "linear-gradient(135deg,#e0b76d,#704047)",
        "linear-gradient(135deg,#70416c,#26182f)",
        "linear-gradient(135deg,#b77a4e,#3d243e)",
        "linear-gradient(135deg,#cba45e,#542f50)",
        "linear-gradient(135deg,#8c5678,#38203f)"

    ];

    return colors[index];

}


function popBalloon(balloon) {

    if (balloon.classList.contains("pop"))
        return;

    balloon.classList.add("pop");

    poppedBalloons++;

    createParticles(12);

    updateBalloonCount();

    setTimeout(() => {

        balloon.remove();

    }, 450);

    if (poppedBalloons === 7) {

        setTimeout(() => {

            balloonFinished();

        }, 900);

    }

}


function updateBalloonCount() {

    document.getElementById("balloonCount")
        .textContent = poppedBalloons;

}


function balloonFinished() {

    createConfetti(40);

    setTimeout(() => {

        goTo("starStage");

        createStars();

    }, 1000);

}


/* ==========================================
   STAR COLLECTION
========================================== */

function createStars() {

    const area =
        document.getElementById("starArea");

    area.innerHTML = "";

    collectedStars = 0;

    updateStarCount();

    const positions = [

        [10,15],
        [75,12],
        [42,35],
        [18,70],
        [78,65]

    ];

    positions.forEach((pos, index) => {

        const star =
            document.createElement("div");

        star.className =
            "collect-star";

        star.textContent =
            "✦";

        star.style.left =
            pos[0] + "%";

        star.style.top =
            pos[1] + "%";

        star.style.animationDelay =
            (index * .2) + "s";

        star.addEventListener(
            "click",
            () => collectStar(star)
        );

        area.appendChild(star);

    });

}


function collectStar(star) {

    if (star.classList.contains("collected"))
        return;

    star.classList.add("collected");

    collectedStars++;

    createParticles(8);

    updateStarCount();

    if (collectedStars === 5) {

        document.getElementById("unlockText")
            .textContent =
            "The secret has been unlocked ✦";

        setTimeout(() => {

            goTo("envelopeStage");

        }, 1000);

    }

}


function updateStarCount() {

    document.getElementById("starCount")
        .textContent = collectedStars;

}


/* ==========================================
   ENVELOPE
========================================== */

function openEnvelope() {

    const envelope =
        document.querySelector(".envelope");

    if (envelope.classList.contains("opened"))
        return;

    envelope.classList.add("opened");

    document.getElementById("envelopeHint")
        .style.opacity = "0";

    createParticles(35);

    setTimeout(() => {

        showEnvelopeMessage();

    }, 900);

}


function showEnvelopeMessage() {

    const message =
        document.createElement("div");

    message.className =
        "temporary-message";

    message.innerHTML =
        "Ayesha,<br><br>" +
        "Some surprises are not about the gift...<br>" +
        "they are about making a moment memorable. ✦";

    Object.assign(message.style, {

        position: "fixed",
        zIndex: "300",
        maxWidth: "320px",
        padding: "25px",
        borderRadius: "18px",
        background: "rgba(20,12,24,.94)",
        border: "1px solid rgba(215,174,96,.35)",
        color: "#e7dccb",
        fontFamily: "Georgia,serif",
        lineHeight: "1.7",
        boxShadow: "0 30px 80px rgba(0,0,0,.7)"

    });

    document.body.appendChild(message);

    setTimeout(() => {

        message.remove();

        goTo("memoryIntro");

    }, 3000);

}


/* ==========================================
   MEMORIES
========================================== */

function startMemories() {

    currentMemory = 0;

    loadMemory();

    goTo("memoryStage");

}


function loadMemory() {

    const image =
        document.getElementById("memoryImage");

    const title =
        document.getElementById("memoryTitle");

    const text =
        document.getElementById("memoryText");

    const number =
        document.getElementById("memoryNumber");

    const button =
        document.getElementById("memoryButton");

    image.classList.add("fade");

    setTimeout(() => {

        image.src =
            photos[currentMemory];

        title.textContent =
            memoryData[currentMemory].title;

        text.textContent =
            memoryData[currentMemory].text;

        number.textContent =
            "0" + (currentMemory + 1);

        image.onload = () => {

            image.classList.remove("fade");

        };

    }, 450);

    if (currentMemory === 2) {

        button.textContent =
            "Reveal the final surprise ✦";

    } else {

        button.textContent =
            "Reveal the next memory →";

    }

}


function nextMemory() {

    if (currentMemory < 2) {

        currentMemory++;

        createParticles(15);

        loadMemory();

    } else {

        createConfetti(30);

        setTimeout(() => {

            goTo("finalStage");

            finalCelebration();

        }, 600);

    }

}


/* ==========================================
   FINAL CELEBRATION
========================================== */

function finalCelebration() {

    document.getElementById("finalName")
        .textContent = PERSON_NAME;

    createParticles(80);

    createConfetti(100);

    createFireworks();

}


function createFireworks() {

    const area =
        document.getElementById("fireworks");

    for (let i = 0; i < 12; i++) {

        const firework =
            document.createElement("div");

        firework.textContent =
            ["✦","✧","⋆","♡"][i % 4];

        Object.assign(firework.style, {

            position: "fixed",

            left:
                Math.random() * 100 + "vw",

            top:
                15 + Math.random() * 50 + "vh",

            color: "#d7ae60",

            fontSize:
                20 + Math.random() * 35 + "px",

            textShadow:
                "0 0 20px rgba(215,174,96,.8)",

            animation:
                "fireworkBurst 1.5s ease-out forwards",

            zIndex: "150"

        });

        area.appendChild(firework);

    }

}


/* ==========================================
   PARTICLES
========================================== */

function createParticles(amount) {

    const symbols = [
        "✦",
        "✧",
        "⋆",
        "♡"
    ];

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.fontSize =
            10 + Math.random() * 18 + "px";

        particle.style.animationDuration =
            3 + Math.random() * 4 + "s";

        particle.style.animationDelay =
            Math.random() * 1.5 + "s";

        document
            .getElementById("particles")
            .appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 8000);

    }

}


/* ==========================================
   CONFETTI
========================================== */

function createConfetti(amount) {

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        piece.style.transform =
            `rotate(${Math.random()*360}deg)`;

        piece.style.background =
            [
                "#d7ae60",
                "#eee0c5",
                "#8b5b82",
                "#6f3d64"
            ][
                Math.floor(Math.random()*4)
            ];

        document.body.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 6000);

    }

}


/* ==========================================
   FIREWORK ANIMATION
========================================== */

const style =
    document.createElement("style");

style.innerHTML = `

@keyframes fireworkBurst {

    0% {
        transform:
            scale(.2)
            translateY(0);

        opacity: 0;
    }

    30% {
        opacity: 1;
    }

    100% {
        transform:
            scale(2.5)
            translateY(-40px);

        opacity: 0;
    }

}

`;

document.head.appendChild(style);


/* ==========================================
   INITIAL
========================================== */

window.addEventListener(
    "load",
    () => {

        createParticles(20);

    }
);
